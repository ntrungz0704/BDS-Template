import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { logger } from '../index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import crypto from 'crypto';

// Định nghĩa schemas Zod validation
const registerSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  fullName: z.string().min(2, 'Họ và tên tối thiểu phải có 2 ký tự.'),
  password: z.string().min(6, 'Mật khẩu tối thiểu phải từ 6 ký tự trở lên.'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, 'SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.').optional(),
});


const loginSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  password: z.string().min(1, 'Mật khẩu không được để trống.'),
});

const ACCESS_TOKEN_EXPIRY = '7d';
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

// Helper sinh Access Token
function generateAccessToken(payload: { userId: string; email: string; role: string; tenantId: string | null }): string {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Helper sinh Refresh Token ngẫu nhiên
function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

async function writeAuthAudit(
  req: Request,
  action: string,
  entityId: string,
  userId?: string,
  newValues?: Record<string, unknown>,
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        entityType: 'User',
        entityId,
        newValues: newValues as any,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    });
  } catch (error) {
    logger.warn(`[AuthAudit] Unable to record ${action}: ${(error as Error).message}`);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerSchema.parse(req.body);
    const normalizedEmail = data.email.trim().toLowerCase();

    // Kiểm tra chủ động xem Email hoặc Phone đã tồn tại chưa
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          ...(data.phone ? [{ phone: data.phone }] : []),
        ],
      },
    });

    if (existingUser) {
      const field = existingUser.email === normalizedEmail ? 'Email' : 'Số điện thoại';
      return res.status(409).json({
        success: false,
        error: {
          code: 'DUPLICATE_ENTRY',
          message: `${field} đã tồn tại trong hệ thống. Vui lòng sử dụng thông tin khác.`,
        },
      });
    }

    // Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Lưu User mới
    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        fullName: data.fullName,
        phone: data.phone,
        role: 'CUSTOMER', // Default role. Tự động chuyển thành TENANT_OWNER sau khi mua/thuê.
        isActive: true,
      },
    });

    // Tạo Audit Log
    try {
      await prisma.auditLog.create({
        data: {
          userId: newUser.id,
          action: 'REGISTER_USER',
          entityType: 'User',
          entityId: newUser.id,
          newValues: { email: newUser.email, fullName: newUser.fullName },
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });

    } catch (_) {}

    res.status(201).json({
      success: true,
      data: {
        userId: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        isMock: false,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu đầu vào không hợp lệ.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginSchema.parse(req.body);
    const normalizedEmail = data.email.trim().toLowerCase();
    
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      await writeAuthAudit(req, 'LOGIN_FAILED', normalizedEmail, undefined, { reason: 'INVALID_CREDENTIALS' });
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tài khoản không tồn tại hoặc sai thông tin.',
        },
      });
    }

    // Verify Password
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!isValidPassword) {
      await writeAuthAudit(req, 'LOGIN_FAILED', user.id, user.id, { reason: 'INVALID_CREDENTIALS' });
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Sai mật khẩu. Vui lòng thử lại.',
        },
      });
    }

    if (!user.isActive || user.deletedAt || user.status !== 'ACTIVE') {
      await writeAuthAudit(req, 'LOGIN_BLOCKED', user.id, user.id, { reason: 'ACCOUNT_INACTIVE' });
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tài khoản đã bị khóa hoạt động.',
        },
      });
    }

    // Resolve a tenant only from a verified active membership. If a user has
    // multiple memberships and no current selection, the signed session stays
    // tenant-less until /switch-tenant validates an explicit selection.
    let activeTenantId: string | null = null;
    let tenantInfo = null;

    if (user.role !== 'SUPER_ADMIN') {
      const memberships = await prisma.tenantMembership.findMany({
        where: {
          userId: user.id,
          status: 'ACTIVE',
          tenant: { deletedAt: null },
        },
        include: {
          tenant: {
            select: {
              id: true,
              name: true,
              slug: true,
              status: true,
              domain: true,
              trialStatus: true,
              trialEndAt: true,
              trialSaveLimit: true,
              trialSaveCount: true,
            },
          },
        },
        take: 2,
      });

      const selectedMembership = memberships.find((membership: any) => membership.tenantId === user.tenantId)
        || (memberships.length === 1 ? memberships[0] : null);

      if (selectedMembership) {
        activeTenantId = selectedMembership.tenantId;
        tenantInfo = selectedMembership.tenant;
        if (user.tenantId !== activeTenantId) {
          await prisma.user.update({ where: { id: user.id }, data: { tenantId: activeTenantId } });
        }
      }
    } else if (user.tenantId) {
      tenantInfo = await prisma.tenant.findUnique({
        where: { id: user.tenantId, deletedAt: null },
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          domain: true,
          trialStatus: true,
          trialEndAt: true,
          trialSaveLimit: true,
          trialSaveCount: true,
        },
      });
      activeTenantId = tenantInfo?.id || null;
    }

    // Tạo Access & Refresh Tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      tenantId: activeTenantId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshTokenString = generateRefreshToken();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
    await prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        userId: user.id,
        expiresAt,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
      },
    });

    // Tạo CSRF Token chống giả mạo
    const csrfToken = crypto.randomBytes(32).toString('hex');

    // Cài đặt cookie HttpOnly an toàn
    const isProd = process.env.NODE_ENV === 'production';
    const sameSiteMode = isProd ? 'none' as const : 'lax' as const;
    const cookieDomain = process.env.COOKIE_DOMAIN || undefined;

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: sameSiteMode,
      domain: cookieDomain,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshTokenString, {
      httpOnly: true,
      secure: isProd,
      sameSite: sameSiteMode,
      domain: cookieDomain,
      path: '/api/auth',
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    });

    // Cookie CSRF không httpOnly để client đối chiếu
    res.cookie('csrf_token', csrfToken, {
      secure: isProd,
      sameSite: sameSiteMode,
      domain: cookieDomain,
      maxAge: 12 * 60 * 60 * 1000,
    });

    // Cookie is_logged_in không httpOnly giúp client-side JS nhận biết trạng thái đăng nhập tức thì
    res.cookie('is_logged_in', 'true', {
      secure: isProd,
      sameSite: sameSiteMode,
      domain: cookieDomain,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await Promise.all([
      prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
      writeAuthAudit(req, 'LOGIN_SUCCESS', user.id, user.id, { tenantId: activeTenantId }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          tenantId: activeTenantId,
          tenant: tenantInfo,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu đăng nhập không đúng cấu trúc.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const refreshTokenString = req.cookies?.refresh_token;

  if (!refreshTokenString) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_REFRESH_TOKEN',
        message: 'Không tìm thấy session khôi phục. Vui lòng đăng nhập lại.',
      },
    });
  }

  try {
    // Truy vấn Refresh Token
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshTokenString },
      include: { user: true },
    });

    // PHÁT HIỆN TẤN CÔNG GIẢ MẠO REPLAY ATTACK (Refresh Token đã bị thu hồi trước đó)
    if (!dbToken || dbToken.revokedAt) {
      if (dbToken) {
        logger.error(`CẢNH BÁO BẢO MẬT: Phát hiện Replay Attack sử dụng Refresh Token cũ của User ${dbToken.userId}`);
        // Xóa sạch mọi session đang hoạt động của user này để bảo vệ tài khoản
        await prisma.refreshToken.updateMany({
          where: { userId: dbToken.userId },
          data: { revokedAt: new Date() },
        });
      }
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_BREACH_REVOCATION',
          message: 'Phiên đăng nhập không an toàn. Vui lòng thực hiện đăng nhập lại.',
        },
      });
    }

    if (!dbToken.user.isActive || dbToken.user.deletedAt || dbToken.user.status !== 'ACTIVE') {
      await prisma.refreshToken.updateMany({
        where: { userId: dbToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return res.status(401).json({
        success: false,
        error: { code: 'ACCOUNT_INACTIVE', message: 'Tài khoản không còn hoạt động.' },
      });
    }

    // Kiểm tra hết hạn Refresh Token
    if (dbToken.expiresAt < new Date()) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_EXPIRED',
          message: 'Phiên hoạt động đã hết hạn. Vui lòng đăng nhập lại.',
        },
      });
    }

    // THỰC HIỆN XOAY VÒNG TOKEN (Refresh Token Rotation)
    const newRefreshTokenString = generateRefreshToken();
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    // Cập nhật trạng thái thu hồi của token cũ và tạo mới token mới trong transaction
    await prisma.$transaction([
      prisma.refreshToken.update({
        where: { id: dbToken.id },
        data: {
          revokedAt: new Date(),
          replacedByToken: newRefreshTokenString,
        },
      }),
      prisma.refreshToken.create({
        data: {
          token: newRefreshTokenString,
          userId: dbToken.userId,
          expiresAt: newExpiresAt,
          userAgent: req.headers['user-agent'],
          ipAddress: req.ip,
        },
      }),
    ]);

    // Tạo Access Token mới
    const payload = {
      userId: dbToken.user.id,
      email: dbToken.user.email,
      role: dbToken.user.role,
      tenantId: dbToken.user.tenantId,
    };
    const newAccessToken = generateAccessToken(payload);

    // Gửi trả cookie mới đè cookie cũ
    const isProdRefresh = process.env.NODE_ENV === 'production';
    const sameSiteModeRefresh = isProdRefresh ? ('none' as const) : ('lax' as const);
    const cookieDomainRefresh = process.env.COOKIE_DOMAIN || undefined;

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: isProdRefresh,
      sameSite: sameSiteModeRefresh,
      domain: cookieDomainRefresh,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', newRefreshTokenString, {
      httpOnly: true,
      secure: isProdRefresh,
      sameSite: sameSiteModeRefresh,
      domain: cookieDomainRefresh,
      path: '/api/auth',
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: { refreshed: true } });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  const refreshTokenString = req.cookies?.refresh_token;

  try {
    if (refreshTokenString) {
      // Thu hồi Refresh Token trong DB
      await prisma.refreshToken.update({
        where: { token: refreshTokenString },
        data: { revokedAt: new Date() },
      }).catch(() => {}); // Bỏ qua lỗi nếu không tìm thấy bản ghi
    }

    // Clear with the exact domain/path attributes used when cookies were set.
    const isProd = process.env.NODE_ENV === 'production';
    const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
    const cookieOptions = {
      secure: isProd,
      sameSite: isProd ? ('none' as const) : ('lax' as const),
      domain: cookieDomain,
    };
    res.clearCookie('access_token', { ...cookieOptions, path: '/' });
    res.clearCookie('refresh_token', { ...cookieOptions, path: '/api/auth' });
    res.clearCookie('csrf_token', { ...cookieOptions, path: '/' });
    res.clearCookie('is_logged_in', { ...cookieOptions, path: '/' });

    res.status(200).json({
      success: true,
      data: {
        message: 'Đăng xuất tài khoản thành công.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Yêu cầu đăng nhập để truy cập thông tin này.',
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        tenantId: true,
        isActive: true,
        status: true,
        customerProfile: true,
        wishlists: {
          include: {
            template: {
              select: {
                id: true,
                name: true,
                slug: true,
                shortDescription: true,
                thumbnail: true,
                priceBuy: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive || user.status !== 'ACTIVE') {
      return res.status(401).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'Không tìm thấy phiên tài khoản đang hoạt động.' },
      });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        template: { select: { id: true, name: true, slug: true, thumbnail: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.status(200).json({
      success: true,
      data: {
        user,
        orders
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserTenants(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            status: true,
            templateId: true,
            template: { select: { slug: true } },
          },
        },
      },
    });

    const memberships = await prisma.tenantMembership.findMany({
      where: { userId, status: 'ACTIVE' },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            status: true,
            templateId: true,
            template: {
              select: {
                slug: true,
              }
            }
          }
        }
      }
    });

    const tenantsMap = new Map<string, any>();

    if (user?.tenant) {
      tenantsMap.set(user.tenant.id, {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug,
        domain: user.tenant.domain,
        status: user.tenant.status,
        role: 'OWNER',
        templateSlug: user.tenant.template?.slug || user.tenant.templateId || 'luxury-gold',
      });
    }

    memberships.forEach((m: any) => {
      if (m.tenant && !tenantsMap.has(m.tenant.id)) {
        tenantsMap.set(m.tenant.id, {
          id: m.tenant.id,
          name: m.tenant.name,
          slug: m.tenant.slug,
          domain: m.tenant.domain,
          status: m.tenant.status,
          role: m.role,
          templateSlug: m.tenant.template?.slug || m.tenant.templateId || 'luxury-gold',
        });
      }
    });

    return res.status(200).json({
      success: true,
      data: Array.from(tenantsMap.values()),
    });
  } catch (error) {
    next(error);
  }
}

export async function switchTenant(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const { tenantId } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    }

    if (!tenantId) {
      return res.status(400).json({ success: false, error: { message: 'Thiếu tenantId' } });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId, deletedAt: null },
      select: { id: true },
    });
    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Website không tồn tại.' },
      });
    }

    if (req.user?.role !== 'SUPER_ADMIN') {
      const membership = await prisma.tenantMembership.findFirst({
        where: { userId, tenantId, status: 'ACTIVE' },
      });
      if (!membership) {
        await writeAuthAudit(req, 'TENANT_SWITCH_DENIED', tenantId, userId, { requestedTenantId: tenantId });
        return res.status(403).json({
          success: false,
          error: { code: 'TENANT_ACCESS_DENIED', message: 'Bạn không có quyền truy cập website này.' },
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { tenantId },
    });

    const payload = {
      userId: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      tenantId: updatedUser.tenantId,
    };
    const newAccessToken = generateAccessToken(payload);

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: process.env.COOKIE_DOMAIN || undefined,
      maxAge: 15 * 60 * 1000,
    });

    await writeAuthAudit(req, 'TENANT_SWITCHED', tenantId, userId, { tenantId });

    return res.status(200).json({
      success: true,
      message: 'Chuyển website thành công.',
      data: {
        activeTenantId: tenantId,
      }
    });
  } catch (error) {
    next(error);
  }
}

const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự.').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
  taxCode: z.string().optional(),
});

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập.' }
      });
    }

    const data = updateProfileSchema.parse(req.body);

    const updatedUser = await prisma.$transaction(async (tx: any) => {
      const u = await tx.user.update({
        where: { id: userId },
        data: {
          ...(data.fullName && { fullName: data.fullName }),
          ...(data.phone !== undefined && { phone: data.phone }),
        }
      });

      const profile = await tx.customerProfile.upsert({
        where: { userId },
        create: {
          userId,
          address: data.address || null,
          companyName: data.companyName || null,
          taxCode: data.taxCode || null,
        },
        update: {
          address: data.address !== undefined ? data.address : undefined,
          companyName: data.companyName !== undefined ? data.companyName : undefined,
          taxCode: data.taxCode !== undefined ? data.taxCode : undefined,
        }
      });

      return {
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        phone: u.phone,
        role: u.role,
        tenantId: u.tenantId,
        customerProfile: profile,
      };
    });

    res.status(200).json({
      success: true,
      data: { user: updatedUser }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu không hợp lệ.',
          details: error.errors
        }
      });
    }
    next(error);
  }
}

