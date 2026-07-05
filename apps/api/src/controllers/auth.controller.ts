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
  password: z.string().min(8, 'Mật khẩu tối thiểu phải từ 8 ký tự trở lên.'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  password: z.string().min(1, 'Mật khẩu không được để trống.'),
});

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

// Helper sinh Access Token
function generateAccessToken(payload: { userId: string; email: string; role: string; tenantId: string | null }): string {
  const secret = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Helper sinh Refresh Token ngẫu nhiên
function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerSchema.parse(req.body);
    
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'Tài khoản email này đã được sử dụng đăng ký.',
        },
      });
    }

    // Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Lưu User mới (Mặc định là TENANT_ADMIN khi đăng ký tự phục vụ)
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        phone: data.phone,
        role: 'TENANT_ADMIN',
        isActive: true,
      },
    });

    // Tạo Audit Log
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

    res.status(201).json({
      success: true,
      data: {
        userId: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
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
    
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.isActive) {
      logger.warn(`Đăng nhập thất bại: Tài khoản không tồn tại hoặc bị khóa: ${data.email}`);
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tài khoản email hoặc mật khẩu không chính xác.',
        },
      });
    }

    // So khớp mật khẩu
    const passwordMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordMatch) {
      logger.warn(`Đăng nhập thất bại: Sai mật khẩu cho tài khoản ${data.email}`);
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Tài khoản email hoặc mật khẩu không chính xác.',
        },
      });
    }

    // Tạo Access & Refresh Tokens
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    const accessToken = generateAccessToken(payload);
    const refreshTokenString = generateRefreshToken();

    // Lưu Refresh Token vào Database
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
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 phút
    });

    res.cookie('refresh_token', refreshTokenString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh', // Chỉ gửi cookie này đến endpoint làm mới session
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000, // 7 ngày
    });

    // Cookie CSRF không httpOnly để client đọc và gửi Header đối chiếu
    res.cookie('csrf_token', csrfToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 1000, // 12 giờ
    });

    // Ghi Audit Log đăng nhập thành công
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN_SUCCESS',
        entityType: 'User',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          tenantId: user.tenantId,
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
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', newRefreshTokenString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
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

    // Xóa sạch cookie ở Client
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/api/auth/refresh' });
    res.clearCookie('csrf_token');

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
