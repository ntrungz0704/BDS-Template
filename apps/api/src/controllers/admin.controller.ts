import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma, TemplateRegistry } from '@repo/database';
import { TEMPLATE_CONFIGS } from '@repo/utils';
import { logger } from '../index';
import bcrypt from 'bcrypt';
import { sendWelcomeEmail } from '../utils/mailer';
import { BUSINESS_CONFIG } from '@repo/config';
import { websiteProvisioningService } from '../services/website-provisioning.service';
import { vercelDomainService } from '../services/vercel-domain.service';

export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
  try {
    const totalTenants = await prisma.tenant.count({ where: { deletedAt: null } });
    const activeTenants = await prisma.tenant.count({ where: { status: 'ACTIVE', deletedAt: null } });
    const activeTrials = await prisma.tenant.count({ where: { trialStatus: 'ACTIVE', deletedAt: null } });
    const expiringTrials = await prisma.tenant.count({
      where: {
        trialStatus: { in: ['ACTIVE', 'EXPIRING'] },
        trialEndAt: { lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
        deletedAt: null,
      },
    });
    const expiredTrials = await prisma.tenant.count({ where: { trialStatus: 'EXPIRED', deletedAt: null } });
    const activeSubscriptions = await prisma.subscription.count({ where: { status: 'ACTIVE', tenant: { deletedAt: null } } });
    const totalUsers = await prisma.user.count({ where: { deletedAt: null, role: { not: 'SUPER_ADMIN' } } });
    const totalOrders = await prisma.order.count();
    
    // Tính tổng doanh thu từ các đơn hàng đã thành công (COMPLETED)
    const revenueSum = await prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: {
        totalTenants,
        activeTenants,
        activeTrials,
        expiringTrials,
        expiredTrials,
        activeSubscriptions,
        totalUsers,
        totalOrders,
        totalRevenue: revenueSum._sum.amount || 0,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as any;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
    };

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          template: {
            select: { name: true, slug: true, thumbnail: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function approveOrder(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    // 1. Kiểm tra đơn hàng tồn tại
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Đơn hàng duyệt không tồn tại.',
        },
      });
    }

    const isPending = order.status === 'WAITING_CONFIRM' || order.status === 'PENDING';
    const isUnprovisionedCompleted = order.status === 'COMPLETED' && !order.tenantId && order.type !== 'BUY_SOURCE';

    if (!isPending && !isUnprovisionedCompleted) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_WAITING',
          message: 'Đơn hàng này không còn ở trạng thái chờ xác nhận thanh toán hoặc đã được kích hoạt hoàn tất.',
        },
      });
    }

    // 2. Nếu là thuê (RENT), kiểm tra xem Subdomain đã bị ai đăng ký trước đó chưa và validate định dạng
    if (order.type === 'RENT' && order.subdomain) {
      const subdomain = order.subdomain.toLowerCase().trim();

      // Chặn slug hệ thống
      const reservedSlugs = ['www', 'admin', 'cms', 'api', 'app', 'marketplace', 'templates', 'template', 'themes', 'mail', 'static', 'assets', 'support'];
      if (reservedSlugs.includes(subdomain)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'RESERVED_SUBDOMAIN',
            message: 'Tên miền con này thuộc hệ thống, không thể đăng ký.',
          },
        });
      }

      // Kiểm tra ký tự hợp lệ
      const subdomainRegex = /^[a-z0-9](-?[a-z0-9])*$/;
      if (!subdomainRegex.test(subdomain)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_SUBDOMAIN_FORMAT',
            message: 'Tên miền con không hợp lệ. Chỉ cho phép chữ thường, số và dấu gạch ngang ở giữa.',
          },
        });
      }

      const existingTenant = await prisma.tenant.findUnique({
        where: { slug: subdomain },
      });

      // GIẢI QUYẾT SUBDOMAIN CONFLICT (ĐIỂM 4 BẢN VÁ): Chuyển đơn sang chờ xử lý đổi slug
      if (existingTenant) {
        const conflictOrder = await prisma.order.update({
          where: { id, version: order.version },
          data: {
            status: 'PENDING_SUBDOMAIN_CONFLICT',
            adminNotes: `Duyệt thất bại do trùng lặp subdomain [${order.subdomain}]. Chờ liên hệ khách hàng đổi tên.`,
            version: { increment: 1 },
          },
        });

        logger.warn(`Duyệt đơn hàng ${order.orderNumber} thất bại: Subdomain conflict [${order.subdomain}]. Đơn hàng chuyển sang PENDING_SUBDOMAIN_CONFLICT.`);

        return res.status(200).json({
          success: true,
          data: conflictOrder,
          meta: {
            conflict: true,
            message: 'Phát hiện trùng lặp subdomain. Đơn hàng chuyển sang hàng chờ liên hệ thay đổi.',
          },
        });
      }
    }

    // 3. THỰC HIỆN KÍCH HOẠT DỊCH VỤ TRONG TRANSACTION
    let tenantId: string | null = null;
    let isNewUser = false;
    let tempPassword = '';
    let completedOrder: any = null;

    // Atomically claim approval before provisioning
    const claim = await prisma.order.updateMany({
      where: { id, version: order.version },
      data: { status: 'COMPLETED', paidAt: order.paidAt || new Date(), version: { increment: 1 } },
    });
    if (claim.count !== 1 && !isUnprovisionedCompleted) {
      return res.status(409).json({
        success: false,
        error: { code: 'ORDER_ALREADY_PROCESSED', message: 'Đơn hàng đang được xử lý hoặc đã được duyệt.' },
      });
    }
    completedOrder = await prisma.order.findUnique({ where: { id } });

    // A source-code purchase grants a download entitlement only.
    if (order.type === 'BUY_SOURCE') {
      return res.status(200).json({
        success: true,
        data: completedOrder,
        meta: { entitlement: 'SOURCE_DOWNLOAD' },
      });
    }

    // 4. PROVISION WEBSITE cho khách hàng (cả BUY và RENT)
    const slugifyBrand = (text: string) => {
      return (text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    };

    let candidateSubdomain = order.subdomain;
    if (!candidateSubdomain || candidateSubdomain.trim() === '') {
      const brandSlug = slugifyBrand(order.fullName || '');
      candidateSubdomain = brandSlug ? `${brandSlug}-land` : `bds-${Date.now().toString().slice(-6)}`;
    }

    const cleanSubdomain = candidateSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
    
    let finalSubdomain = cleanSubdomain;
    const existingSubdomain = await prisma.tenant.findUnique({ where: { slug: finalSubdomain } });
    if (existingSubdomain) {
      const crypto = require('crypto');
      finalSubdomain = `${cleanSubdomain}-${crypto.randomBytes(2).toString('hex').toLowerCase()}`;
    }

    let cmsPassword = order.email ? order.email.split('@')[0] : '123456';

    const existingUser = await prisma.user.findUnique({
      where: { email: order.email },
    });
    isNewUser = !existingUser;

    const provResult = await websiteProvisioningService.createWebsiteFromTemplate({
      templateId: order.templateId,
      customerId: order.userId || undefined,
      customerEmail: order.email,
      customerFullName: order.fullName,
      customerPhone: order.phone,
      websiteName: order.fullName + ' Real Estate',
      slug: finalSubdomain,
      plan: order.plan || 'STARTER',
      orderId: order.id,
    });
    
    tenantId = provResult.tenant.id;
    tempPassword = provResult.credentials.tempPassword;
    cmsPassword = provResult.credentials.cmsPassword || cmsPassword;

    await prisma.order.update({
      where: { id },
      data: { tenantId, subdomain: finalSubdomain },
    });

    // Gửi email chào mừng ngoài block transaction
    if (tenantId) {
      try {
        await sendWelcomeEmail(order.email, order.fullName, finalSubdomain, tempPassword);
      } catch (mailErr) {
        logger.warn(`Không gửi được email chào mừng: ${(mailErr as Error).message}`);
      }
    }

    logger.info(`Duyệt thành công đơn hàng: ${order.orderNumber}. Kích hoạt Tenant ID: ${tenantId || 'N/A'}`);

    res.status(200).json({
      success: true,
      data: {
        ...completedOrder,
        tenantId,
        subdomain: finalSubdomain,
        credentials: {
          email: order.email,
          password: cmsPassword,
          subdomain: finalSubdomain,
          tenantSlug: finalSubdomain,
          isNewUser
        }
      },
    });



  } catch (error) {
    next(error);
  }
}

export async function rejectOrder(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { adminNotes } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Đơn hàng từ chối không tồn tại.',
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id, version: order.version },
      data: {
        status: 'REJECTED',
        adminNotes: adminNotes || 'Giao dịch chuyển tiền không hợp lệ hoặc sai số tiền.',
        version: { increment: 1 },
      },
    });

    logger.info(`Đã từ chối đơn hàng: ${order.orderNumber} - Lý do: ${adminNotes}`);

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTenantManually(req: Request, res: Response, next: NextFunction) {
  const { fullName, email, phone, subdomain, templateId, plan } = req.body;

  if (!fullName || !email || !phone || !subdomain) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ Họ tên, Email, SĐT và Subdomain.' });
  }

  try {
    // Check subdomain availability
    const existingTenant = await prisma.tenant.findFirst({
      where: { slug: subdomain.toLowerCase() },
    });

    if (existingTenant) {
      return res.status(400).json({ success: false, message: `Subdomain [${subdomain}] đã được đăng ký bởi văn phòng khác.` });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    const isNewUser = !existingUser;

    const provResult = await websiteProvisioningService.createWebsiteFromTemplate({
      templateId: templateId || 'luxury-gold',
      customerEmail: email,
      customerFullName: fullName,
      customerPhone: phone,
      websiteName: fullName + ' Office',
      slug: subdomain.toLowerCase(),
      plan: plan || 'STARTER',
    });

    // Cập nhật trial parameters nếu là gói TRIAL
    const isTrial = plan === 'TRIAL';
    if (isTrial) {
      const now = new Date();
      const trialDurationDays = BUSINESS_CONFIG.TRIAL_DURATION_DAYS || 7;
      const trialEndAt = new Date(now.getTime() + trialDurationDays * 24 * 60 * 60 * 1000);
      
      await prisma.tenant.update({
        where: { id: provResult.tenant.id },
        data: {
          trialStartAt: now,
          trialEndAt: trialEndAt,
          trialSaveLimit: BUSINESS_CONFIG.TRIAL_SAVE_LIMIT || 3,
          trialSaveCount: 0,
          trialStatus: 'ACTIVE',
        }
      });
    }

    const tempPassword = provResult.credentials.tempPassword;

    // Send Welcome Email
    await sendWelcomeEmail(email, fullName, subdomain, tempPassword);

    res.status(201).json({
      success: true,
      data: {
        tenant: provResult.tenant,
        credentials: {
          email,
          password: tempPassword,
          subdomain,
          isNewUser
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

// 1. Quản lý Tenants (Danh sách Website khách thuê)
export async function getTenants(req: Request, res: Response, next: NextFunction) {
  try {
    const tenants = await prisma.tenant.findMany({
      where: { deletedAt: null },
      include: {
        template: {
          select: { name: true, slug: true }
        },
        subscription: {
          select: { plan: true, status: true, endDate: true }
        },
        users: {
          select: { id: true, fullName: true, email: true, phone: true }
        },
        memberships: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true, phone: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: tenants
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTenant(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id } });
    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Website không tồn tại.' },
      });
    }

    await prisma.$transaction([
      prisma.lead.deleteMany({ where: { tenantId: id } }),
      prisma.project.deleteMany({ where: { tenantId: id } }),
      prisma.post.deleteMany({ where: { tenantId: id } }),
      prisma.companyInfo.deleteMany({ where: { tenantId: id } }),
      prisma.tenantSection.deleteMany({ where: { tenantId: id } }),
      prisma.tenantPage.deleteMany({ where: { tenantId: id } }),
      prisma.tenantThemeSettings.deleteMany({ where: { tenantId: id } }),
      prisma.domain.deleteMany({ where: { tenantId: id } }),
      prisma.subscription.deleteMany({ where: { tenantId: id } }),
      prisma.tenantMembership.deleteMany({ where: { tenantId: id } }),
      prisma.user.updateMany({ where: { tenantId: id }, data: { tenantId: null } }),
      prisma.tenant.delete({ where: { id } }),
    ]);

    // Tự động xóa domain khỏi Vercel Project
    const platformDomain = process.env.PLATFORM_DOMAIN || 'templates.aireviewbds.com';
    await vercelDomainService.removeDomainFromVercel(`${tenant.slug}.${platformDomain}`);

    logger.info(`Admin đã xóa vĩnh viễn website tenant ${tenant.name} (${tenant.slug})`);

    res.status(200).json({
      success: true,
      message: 'Đã xóa website thành công.',
    });
  } catch (error) {
    next(error);
  }
}

const updateTenantStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'DELETED', 'PENDING', 'EXPIRED']),
});

export async function updateTenantStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const validated = updateTenantStatusSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Trạng thái tenant không hợp lệ',
          details: validated.error.flatten(),
        },
      });
    }

    const { status } = validated.data;
    const updated = await prisma.tenant.update({
      where: { id },
      data: { status },
    });

    logger.info(`Admin đã cập nhật trạng thái Tenant ${updated.name} (Slug: ${updated.slug}) thành: ${status}`);

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

// 2. Quản lý Người dùng (Users)
export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        isActive: true,
        status: true,
        createdAt: true,
        tenant: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

const updateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'BANNED', 'SUSPENDED', 'INACTIVE']).optional(),
  isActive: z.boolean().optional(),
});

export async function updateUserStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const validated = updateUserStatusSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Trạng thái người dùng không hợp lệ',
          details: validated.error.flatten(),
        },
      });
    }

    const { status, isActive } = validated.data;
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    logger.info(`Admin đã cập nhật trạng thái người dùng ${updated.email} thành: status=${status}, isActive=${isActive}`);

    res.status(200).json({
      success: true,
      data: {
        id: updated.id,
        email: updated.email,
        status: updated.status,
        isActive: updated.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy đơn hàng.' } });
    }

    await prisma.order.delete({ where: { id } });
    logger.info(`Admin đã xóa đơn hàng ${order.orderNumber} (${id})`);

    res.status(200).json({
      success: true,
      message: 'Đã xóa đơn hàng thành công.',
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy người dùng.' } });
    }

    if (user.email === 'admin@aireviewbds.com') {
      return res.status(400).json({ success: false, error: { message: 'Không thể xóa tài khoản Super Admin chính.' } });
    }

    // Xóa liên kết hoặc xóa user
    await prisma.user.delete({ where: { id } });
    logger.info(`Admin đã xóa người dùng ${user.email} (${id})`);

    res.status(200).json({
      success: true,
      message: 'Đã xóa người dùng thành công.',
    });
  } catch (error) {
    next(error);
  }
}

// 3. Quản lý Mẫu giao diện (Templates)
export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const templates = await prisma.template.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' }
    });

    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTemplateStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { isActive } = req.body; // true / false

  try {
    const updated = await prisma.template.update({
      where: { id },
      data: { isActive }
    });

    logger.info(`Admin đã cập nhật trạng thái hoạt động của mẫu ${updated.name} thành: ${isActive}`);

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTemplatePrice(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { priceBuy, priceBuySource, priceRentMonthly } = req.body;

  try {
    const updated = await prisma.template.update({
      where: { id },
      data: {
        priceBuy: priceBuy !== undefined ? Number(priceBuy) : undefined,
        priceBuySource: priceBuySource !== undefined ? Number(priceBuySource) : undefined,
        priceRentMonthly: priceRentMonthly !== undefined ? Number(priceRentMonthly) : undefined,
      }
    });

    logger.info(`Admin đã cập nhật giá của mẫu ${updated.name}: Bán ${priceBuy}, Gốc ${priceBuySource}`);

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

// 4. Template Studio Handlers
export async function getTemplateDraft(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.userId || '' }
    });
    const fullName = user?.fullName || 'Super Admin';

    // 1. Tìm bản nháp hiện tại
    let draft = await prisma.templateDraft.findUnique({
      where: { templateId: id }
    });

    // 2. Nếu chưa có nháp, tự động tạo từ cấu hình gốc TemplateConfig
    if (!draft) {
      const originalConfig = await prisma.templateConfig.findUnique({
        where: { templateId: id }
      });

      const themeConfig = originalConfig?.themeConfig || {
        primaryColor: '#2563EB',
        secondaryColor: '#64748B',
        accentColor: '#F59E0B',
        backgroundColor: '#FFFFFF',
        textColor: '#0F172A',
        fontHeading: 'Plus Jakarta Sans',
        fontBody: 'Inter',
        borderRadius: '8px',
        shadow: 'md'
      };

      const layoutConfig = originalConfig?.layoutConfig || {
        pages: [
          {
            slug: 'home',
            name: 'Trang chủ',
            sections: [
              { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'Tìm Kiếm Không Gian Sống Mơ Ước', subtitle: 'Hơn 10,000+ bất động sản cao cấp đang chờ bạn khám phá.' } },
              { id: 'stats', name: 'Thống kê nổi bật', type: 'stats', content: { title: 'Thống kê', items: [] } },
              { id: 'projects', name: 'Dự án nổi bật', type: 'projects', content: { title: 'Dự án tiêu biểu' } },
              { id: 'contact', name: 'Liên hệ', type: 'contact', content: { title: 'Đặt lịch tư vấn' } }
            ]
          },
          {
            slug: 'about',
            name: 'Giới thiệu',
            sections: [
              { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'Về chúng tôi' } }
            ]
          }
        ]
      };

      const featureFlags = originalConfig?.featureFlags || {
        enableCrm: true,
        enableBlog: true,
        enableProjects: true
      };

      const components = originalConfig?.layoutConfig || {};

      draft = await prisma.templateDraft.create({
        data: {
          templateId: id,
          themeConfig: themeConfig as any,
          layoutConfig: layoutConfig as any,
          featureFlags: featureFlags as any,
          components: components as any,
          savedBy: fullName
        }
      });
    }

    res.status(200).json({
      success: true,
      data: draft
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTemplateDraft(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { themeConfig, layoutConfig, featureFlags, components } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.userId || '' }
    });
    const fullName = user?.fullName || 'Super Admin';

    const updatedDraft = await prisma.templateDraft.upsert({
      where: { templateId: id },
      update: {
        themeConfig,
        layoutConfig,
        featureFlags,
        components,
        lastSavedAt: new Date(),
        savedBy: fullName
      },
      create: {
        templateId: id,
        themeConfig,
        layoutConfig,
        featureFlags,
        components,
        savedBy: fullName
      }
    });

    res.status(200).json({
      success: true,
      data: updatedDraft
    });
  } catch (error) {
    next(error);
  }
}

export async function publishTemplateDraft(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { updateNotes } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.userId || '' }
    });
    const fullName = user?.fullName || 'Super Admin';

    // 1. Đọc bản nháp hiện tại
    const draft = await prisma.templateDraft.findUnique({
      where: { templateId: id }
    });

    if (!draft) {
      res.status(404).json({
        success: false,
        error: { message: 'Không tìm thấy bản nháp nào để xuất bản. Vui lòng bấm lưu nháp trước.' }
      });
      return;
    }

    // 2. Lấy số version hiện tại cao nhất
    const lastVersion = await prisma.templateVersion.findFirst({
      where: { templateId: id },
      orderBy: { version: 'desc' }
    });

    const nextVer = (lastVersion?.version || 10) + 1; // v1.0 -> 10, v1.1 -> 11

    // 3. Thực hiện lưu vào Database bằng transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // 3.1. Tạo bản ghi TemplateVersion
      const templateVersion = await tx.templateVersion.create({
        data: {
          templateId: id,
          version: nextVer,
          themeConfig: draft.themeConfig || {},
          layoutConfig: draft.layoutConfig || {},
          featureFlags: draft.featureFlags || {},
          components: draft.components || {},
          updateNotes: updateNotes || null,
          status: 'PUBLISHED',
          publishedBy: fullName
        }
      });

      // 3.2. Cập nhật cấu hình gốc TemplateConfig để dùng làm mặc định cho các khách hàng tạo mới
      await tx.templateConfig.upsert({
        where: { templateId: id },
        update: {
          themeConfig: draft.themeConfig || {},
          layoutConfig: draft.layoutConfig || {},
          featureFlags: draft.featureFlags || {},
        },
        create: {
          templateId: id,
          themeConfig: draft.themeConfig || {},
          layoutConfig: draft.layoutConfig || {},
          featureFlags: draft.featureFlags || {},
        }
      });

      return templateVersion;
    });

    logger.info(`Admin đã xuất bản phiên bản mới v${result.version / 10} cho template ${id}`);

    res.status(200).json({
      success: true,
      message: `Xuất bản thành công phiên bản v${result.version / 10}`,
      data: result
    });
  } catch (error) {
    next(error);
  }
}

export async function getTemplateVersions(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const versions = await prisma.templateVersion.findMany({
      where: { templateId: id },
      orderBy: { version: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: versions
    });
  } catch (error) {
    next(error);
  }
}

export async function archiveTemplateVersion(req: Request, res: Response, next: NextFunction) {
  const { versionId } = req.params;

  try {
    const updated = await prisma.templateVersion.update({
      where: { id: versionId },
      data: { status: 'ARCHIVED' }
    });

    logger.info(`Admin đã lưu trữ phiên bản v${updated.version / 10} của template ${updated.templateId}`);

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

export async function rollbackTemplateVersion(req: Request, res: Response, next: NextFunction) {
  const { id, versionId } = req.params;

  try {
    const versionRecord = await prisma.templateVersion.findUnique({
      where: { id: versionId }
    });

    if (!versionRecord) {
      res.status(404).json({
        success: false,
        error: { message: 'Không tìm thấy phiên bản này.' }
      });
      return;
    }

    // Thực hiện rollback: Cập nhật TemplateConfig gốc và TemplateDraft hiện tại về phiên bản lịch sử
    await prisma.$transaction(async (tx: any) => {
      await tx.templateConfig.upsert({
        where: { templateId: id },
        update: {
          themeConfig: versionRecord.themeConfig || {},
          layoutConfig: versionRecord.layoutConfig || {},
          featureFlags: versionRecord.featureFlags || {}
        },
        create: {
          templateId: id,
          themeConfig: versionRecord.themeConfig || {},
          layoutConfig: versionRecord.layoutConfig || {},
          featureFlags: versionRecord.featureFlags || {}
        }
      });

      await tx.templateDraft.upsert({
        where: { templateId: id },
        update: {
          themeConfig: versionRecord.themeConfig || {},
          layoutConfig: versionRecord.layoutConfig || {},
          featureFlags: versionRecord.featureFlags || {},
          components: versionRecord.components || {}
        },
        create: {
          templateId: id,
          themeConfig: versionRecord.themeConfig || {},
          layoutConfig: versionRecord.layoutConfig || {},
          featureFlags: versionRecord.featureFlags || {},
          components: versionRecord.components || {}
        }
      });
    });

    logger.info(`Admin đã rollback template ${id} về phiên bản v${versionRecord.version / 10}`);

    res.status(200).json({
      success: true,
      message: `Đã khôi phục thiết kế về phiên bản v${versionRecord.version / 10}`
    });
  } catch (error) {
    next(error);
  }
}

export async function compareTemplateVersions(req: Request, res: Response, next: NextFunction) {
  const { v1, v2 } = req.query;

  try {
    const version1 = await prisma.templateVersion.findUnique({
      where: { id: String(v1) }
    });

    const version2 = await prisma.templateVersion.findUnique({
      where: { id: String(v2) }
    });

    if (!version1 || !version2) {
      res.status(404).json({
        success: false,
        error: { message: 'Một hoặc cả hai phiên bản không tồn tại.' }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        v1: version1,
        v2: version2
      }
    });
  } catch (error) {
    next(error);
  }
}


export async function migrateTenantsToLatest(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { targetVersion } = req.body; // e.g. 11 (v1.1)

  try {
    const template = await prisma.template.findUnique({
      where: { id },
      include: { templateConfig: true }
    });

    if (!template) {
      res.status(404).json({
        success: false,
        error: { message: 'Template không tồn tại.' }
      });
      return;
    }

    const registryTemplate = TemplateRegistry.get(template.slug);
    if (!registryTemplate) {
      res.status(400).json({
        success: false,
        error: { message: 'Template chưa được đăng ký trong TemplateRegistry.' }
      });
      return;
    }

    // Lấy danh sách Tenant đang dùng mẫu này
    const tenants = await prisma.tenant.findMany({
      where: { templateId: id, deletedAt: null }
    });

    let migratedCount = 0;

    await prisma.$transaction(async (tx: any) => {
      for (const tenant of tenants) {
        const currentVersion = tenant.version || 10;
        if (currentVersion >= targetVersion) continue; // Đã ở phiên bản đích hoặc cao hơn

        // 1. Lấy và di cư Theme Settings
        const themeSettings = await tx.tenantThemeSettings.findUnique({
          where: { tenantId: tenant.id }
        });
        
        if (themeSettings) {
          // Áp dụng luật di cư từ Registry
          const migratedTheme = TemplateRegistry.migrate(
            template.slug,
            currentVersion,
            targetVersion,
            themeSettings
          );
          
          await tx.tenantThemeSettings.update({
            where: { tenantId: tenant.id },
            data: {
              primaryColor: migratedTheme.primaryColor,
              secondaryColor: migratedTheme.secondaryColor,
              accentColor: migratedTheme.accentColor,
              backgroundColor: migratedTheme.backgroundColor,
              fontHeading: migratedTheme.fontHeading,
              fontBody: migratedTheme.fontBody,
              borderRadius: migratedTheme.borderRadius,
            }
          });
        }

        // 2. Di cư Pages & Sections
        const pages = await tx.tenantPage.findMany({
          where: { tenantId: tenant.id },
          include: { sections: true }
        });

        for (const page of pages) {
          // Áp dụng luật di cư cho từng section của page
          for (const section of page.sections) {
            const migratedSection = TemplateRegistry.migrate(
              template.slug,
              currentVersion,
              targetVersion,
              section
            );

            await tx.tenantSection.update({
              where: { id: section.id },
              data: {
                content: migratedSection.content || {},
                settings: migratedSection.settings || {}
              }
            });
          }
        }

        // 3. Cập nhật số version của Tenant
        await tx.tenant.update({
          where: { id: tenant.id },
          data: { version: targetVersion }
        });

        migratedCount++;
      }
    });

    logger.info(`Đã nâng cấp thành công ${migratedCount} Tenants sử dụng mẫu ${template.name} lên phiên bản v${targetVersion / 10}`);

    res.status(200).json({
      success: true,
      message: `Đã nâng cấp thành công ${migratedCount} Tenants lên phiên bản v${targetVersion / 10}`,
      data: { migratedCount }
    });
  } catch (error) {
    next(error);
  }
}

// ─── Repair: Gắn lại tenantId và role TENANT_OWNER cho các user có đơn COMPLETED ─
export async function repairUserTenants(req: Request, res: Response, next: NextFunction) {
  try {
    // Tìm tất cả đơn hàng COMPLETED có tenantId
    const completedOrders = await prisma.order.findMany({
      where: {
        status: 'COMPLETED',
        tenantId: { not: null },
        type: 'RENT',
      },
      select: { id: true, email: true, tenantId: true, orderNumber: true },
    });

    const results: any[] = [];

    for (const order of completedOrders) {
      if (!order.email || !order.tenantId) continue;

      // Tìm user theo email
      const user = await prisma.user.findUnique({
        where: { email: order.email },
        select: { id: true, email: true, role: true, tenantId: true },
      });

      if (!user) {
        results.push({ email: order.email, status: 'NOT_FOUND', orderNumber: order.orderNumber });
        continue;
      }

      // Nếu user đã là TENANT_OWNER và tenantId khớp → skip
      if (user.role === 'TENANT_OWNER' && user.tenantId === order.tenantId) {
        results.push({ email: order.email, status: 'ALREADY_OK', orderNumber: order.orderNumber });
        continue;
      }

      // Cập nhật role và tenantId
      await prisma.user.update({
        where: { email: order.email },
        data: {
          role: 'TENANT_OWNER',
          tenantId: order.tenantId,
          isActive: true,
        },
      });

      results.push({
        email: order.email,
        status: 'REPAIRED',
        oldRole: user.role,
        oldTenantId: user.tenantId,
        newTenantId: order.tenantId,
        orderNumber: order.orderNumber,
      });
    }

    logger.info(`[Repair] Kiểm tra ${completedOrders.length} đơn hàng, kết quả: ${JSON.stringify(results)}`);

    res.status(200).json({
      success: true,
      message: `Đã kiểm tra ${completedOrders.length} đơn hàng COMPLETED.`,
      data: { results },
    });
  } catch (error) {
    next(error);
  }
}

// ── Customer Management (V2) ──────────────────────────────────────────────────

export async function getCustomerDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // Find user
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        tenantId: true,
        isActive: true,
        status: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        customerProfile: true,
        memberships: {
          include: {
            tenant: {
              select: {
                id: true,
                name: true,
                slug: true,
                status: true,
                templateId: true,
                trialStartAt: true,
                trialEndAt: true,
                trialSaveLimit: true,
                trialSaveCount: true,
                trialStatus: true,
                activatedAt: true,
                onboardingCompletedAt: true,
                subscription: {
                  select: {
                    id: true,
                    plan: true,
                    status: true,
                    startDate: true,
                    endDate: true,
                    amount: true,
                    billingPeriod: true,
                  },
                },
                domainSettings: {
                  select: {
                    subdomain: true,
                    customDomain: true,
                    sslStatus: true,
                    dnsVerified: true,
                    plan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng.' },
      });
    }

    // Extract tenants from memberships into a flat array
    const tenants = (user.memberships || [])
      .map((m: any) => m.tenant)
      .filter(Boolean);

    // Get orders for this customer
    const orders = await prisma.order.findMany({
      where: { email: user.email },
      include: {
        template: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: {
        customer: user,
        tenants,
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function extendTrial(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // This is User ID from /customers/:id/extend-trial
    const { days, extraDays, extraSaves = 0 } = req.body;
    const daysToAdd = days || extraDays || 7;

    // Find tenant via user's membership (since route uses User ID)
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        tenantId: true,
        memberships: {
          select: { tenantId: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng.' },
      });
    }

    const tenantId = user.tenantId || user.memberships?.[0]?.tenantId;
    if (!tenantId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NO_TENANT', message: 'Người dùng chưa có website nào.' },
      });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        id: true,
        trialEndAt: true,
        trialSaveLimit: true,
        trialStatus: true,
      },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy website.' },
      });
    }

    const now = new Date();
    const currentEnd = tenant.trialEndAt ? new Date(tenant.trialEndAt) : now;
    const baseDate = currentEnd > now ? currentEnd : now;
    const newEndAt = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const updated = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        trialEndAt: newEndAt,
        trialSaveLimit: { increment: extraSaves },
        trialStatus: 'ACTIVE',
      },
      select: {
        id: true,
        trialStartAt: true,
        trialEndAt: true,
        trialSaveLimit: true,
        trialSaveCount: true,
        trialStatus: true,
      },
    });

    logger.info(`[Admin] Trial extended for tenant ${tenantId} (user ${id}): +${daysToAdd} days, +${extraSaves} saves`);

    return res.json({
      success: true,
      message: `Đã gia hạn thêm ${daysToAdd} ngày${extraSaves > 0 ? ` và ${extraSaves} lượt lưu` : ''}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function resetCustomerPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, fullName: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng.' },
      });
    }

    // Generate a random temporary password
    const tempPassword = Math.random().toString(36).slice(-10) + 'A1!';
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    await prisma.user.update({
      where: { id },
      data: { passwordHash },
    });

    // Revoke all refresh tokens for safety
    await prisma.refreshToken.updateMany({
      where: { userId: id, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    logger.info(`[Admin] Password reset for user ${id} (${user.email})`);

    return res.json({
      success: true,
      message: 'Mật khẩu đã được đặt lại.',
      data: {
        email: user.email,
        temporaryPassword: tempPassword, // Only shown once in response
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function activateSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // User ID from /customers/:id/activate-subscription
    const { plan = 'STARTER', amount = 0, orderId, months = 12 } = req.body;

    // Find tenant via user's membership
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        tenantId: true,
        memberships: {
          select: { tenantId: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng.' },
      });
    }

    const tenantId = user.tenantId || user.memberships?.[0]?.tenantId;
    if (!tenantId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NO_TENANT', message: 'Người dùng chưa có website nào.' },
      });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { id: true, slug: true },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy website.' },
      });
    }

    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth() + months, now.getDate());

    // Upsert subscription (one per tenant)
    const subscription = await prisma.subscription.upsert({
      where: { tenantId },
      create: {
        tenantId,
        orderId: orderId || null,
        plan,
        status: 'ACTIVE',
        amount,
        startDate: now,
        endDate,
        billingPeriod: 'YEARLY',
      },
      update: {
        orderId: orderId || undefined,
        plan,
        status: 'ACTIVE',
        amount,
        startDate: now,
        endDate,
        billingPeriod: 'YEARLY',
        cancelledAt: null,
      },
    });

    // Update tenant: clear trial status since subscription is now active
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        status: 'ACTIVE',
        trialStatus: null,
      },
    });

    logger.info(`[Admin] Subscription activated for tenant ${tenantId} (user ${id}): plan=${plan}, months=${months}`);

    return res.json({
      success: true,
      message: `Đã kích hoạt gói ${plan} cho website ${tenant.slug}.`,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function suspendCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // User ID from /customers/:id/suspend
    const { suspended, reason } = req.body;

    // Find user and their tenant
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        status: true,
        tenantId: true,
        memberships: {
          select: { tenantId: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy người dùng.' },
      });
    }

    const tenantId = user.tenantId || user.memberships?.[0]?.tenantId;
    const isSuspending = suspended !== false; // default to suspend

    // Update user status
    await prisma.user.update({
      where: { id },
      data: {
        status: isSuspending ? 'BANNED' : 'ACTIVE',
        isActive: !isSuspending,
      },
    });

    // Update tenant status if exists
    if (tenantId) {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: {
          status: isSuspending ? 'SUSPENDED' : 'ACTIVE',
          trialStatus: isSuspending ? 'SUSPENDED' : 'ACTIVE',
        },
      });
    }

    logger.info(`[Admin] User ${id} (${user.email}) ${isSuspending ? 'suspended' : 'unsuspended'}. Reason: ${reason || 'N/A'}`);

    return res.json({
      success: true,
      message: isSuspending
        ? `Đã tạm khóa tài khoản ${user.email} và website.`
        : `Đã mở khóa tài khoản ${user.email} và website.`,
    });
  } catch (error) {
    next(error);
  }
}

