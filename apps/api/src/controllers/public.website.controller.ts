import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự.'),
  email: z.string().email('Định dạng email không hợp lệ.').optional().or(z.literal('')),
  phone: z.string().min(10, 'Số điện thoại tối thiểu 10 số.'),
  message: z.string().min(5, 'Lời nhắn tối thiểu từ 5 ký tự.'),
  source: z.string().optional(),
  formId: z.string().max(100).optional(),
  sourcePage: z.string().max(500).optional(),
  sourceUrl: z.string().url().max(2000).optional(),
  projectId: z.string().max(100).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
});

export async function getCompanyInfo(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const company = await prisma.companyInfo.findUnique({
      where: { tenantId },
      include: {
        tenant: {
          select: {
            themeOverrides: true,
            templateId: true,
            status: true,
            template: { select: { slug: true } },
          },
        },
      },
    });

    if (!company) {
      // Tenant chưa hoàn thành onboarding — trả về object rỗng để frontend hiển thị placeholder
      return res.status(200).json({
        success: true,
        data: null,
        meta: { onboardingRequired: true },
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicProjects(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.q as string || '';
    const type = req.query.type as any;
    const status = req.query.status as any;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      published: true, // Bắt buộc phải là dự án đã xuất bản
      deletedAt: null,  // Không lấy dự án đã xóa mềm
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(type && { type }),
      ...(status && { status }),
    };

    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: projects,
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

export async function getPublicProjectDetail(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const tenantId = req.tenantId;

  try {
    const project = await prisma.project.findFirst({
      where: { tenantId, slug, published: true, deletedAt: null },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: 'Không tìm thấy hoặc dự án chưa được xuất bản.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicPosts(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const where = {
      tenantId,
      published: true,
      deletedAt: null,
    };

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.post.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: posts,
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

export async function getPublicPostDetail(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const tenantId = req.tenantId;

  try {
    const post = await prisma.post.findFirst({
      where: { tenantId, slug, published: true, deletedAt: null },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Bài viết không tồn tại hoặc đã bị ẩn.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitContactForm(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const data = contactFormSchema.parse(req.body);
    // Identified public forms receive a short duplicate window. Generic contact
    // forms keep the route-level IP limiter only, so a visitor is not blocked
    // because another person reuses a family/business phone number.
    if (data.formId) {
      const duplicateAfter = new Date(Date.now() - 10 * 60 * 1000);
      const duplicate = await prisma.contactFormSubmission.findFirst({
        where: { tenantId, phone: data.phone, formId: data.formId, createdAt: { gte: duplicateAfter } },
        select: { id: true },
      });
      if (duplicate) {
        return res.status(429).json({ success: false, error: { code: 'DUPLICATE_SUBMISSION', message: 'Yêu cầu này đã được ghi nhận. Vui lòng chờ tư vấn viên liên hệ.' } });
      }
    }

    const [submission] = await prisma.$transaction([
      prisma.contactFormSubmission.create({
        data: {
          tenantId,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message,
          source: data.source || 'website_contact_page',
          formId: data.formId || null,
          sourcePage: data.sourcePage || null,
          sourceUrl: data.sourceUrl || null,
          projectId: data.projectId || null,
          utmSource: data.utm_source || null,
          utmMedium: data.utm_medium || null,
          utmCampaign: data.utm_campaign || null,
          ipAddress: req.ip || null,
          userAgent: req.get('user-agent') || null,
        },
      }),
      prisma.lead.create({
        data: {
          tenantId,
          fullName: data.fullName,
          email: data.email || null,
          phone: data.phone,
          source: 'FORM',
          status: 'NEW',
          note: data.message ? `Yêu cầu từ Form Website: ${data.message}` : 'Khách hàng liên hệ qua Form Website',
          projectId: data.projectId || null,
          tags: ['Website Lead', 'Tư vấn', ...(data.formId ? [`form:${data.formId}`] : [])],
        },
      }),
    ]);

    logger.info(`Nhận form liên hệ mới từ khách hàng ${data.fullName} tại Website Tenant ID ${tenantId}`);

    res.status(201).json({
      success: true,
      data: {
        id: submission.id,
        message: 'Gửi thông tin đăng ký tư vấn thành công. Chúng tôi sẽ liên hệ lại sớm nhất!',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu gửi lên không đúng định dạng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

/**
 * GET /:tenantSlug/theme
 * Returns tenant's active theme settings for SSR injection.
 * Used by the website runtime to inject CSS variables into <head>.
 */
export async function getThemeSettings(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  const slug = req.params.tenantSlug;

  try {
    if (!tenantId) {
      return res.status(404).json({ success: false, error: { code: 'TENANT_NOT_FOUND', message: 'Website không tồn tại.' } });
    }
    const theme = await prisma.tenantThemeSettings.findUnique({ where: { tenantId } });
    if (!theme) {
      return res.status(409).json({ success: false, error: { code: 'TENANT_NOT_PROVISIONED', message: 'Website chưa hoàn tất khởi tạo.' } });
    }
    return res.json({ success: true, data: theme });
  } catch (error) {
    logger.error(`[getThemeSettings] failed for tenant ${slug}: ${(error as Error).message}`);
    next(error);
  }
}

/**
 * GET /:tenantSlug/pages/:pageSlug
 * Returns a page with all its sections for server-side rendering.
 * Only returns published sections and pages.
 */
export async function getPageContent(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  const { pageSlug } = req.params;

  try {
    if (!tenantId) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });
    }

    const page = await prisma.tenantPage.findFirst({
      where: {
        tenantId,
        slug: pageSlug,
        published: true,
        deletedAt: null,
      },
      include: {
        sections: {
          where: { isVisible: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        error: { code: 'PAGE_NOT_FOUND', message: 'Trang chưa được xuất bản hoặc chưa được cấu hình.' },
      });
    }

    return res.json({ success: true, data: page });

  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/website/resolve-domain?domain=www.mysite.vn
 * Internal endpoint called by the Next.js Edge Middleware.
 * Looks up a custom domain in TenantDomainSettings and returns the tenantSlug.
 * Protected by x-internal-token header (set in env).
 */
export async function resolveDomain(req: Request, res: Response, next: NextFunction) {
  const internalToken = req.headers['x-internal-token'];
  const expectedToken = process.env.INTERNAL_API_TOKEN;

  // Only enforce token in production to simplify local development
  if (process.env.NODE_ENV === 'production' && internalToken !== expectedToken) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid internal token.' } });
  }

  const domain = req.query.domain as string;
  if (!domain) {
    return res.status(400).json({ success: false, error: { code: 'MISSING_DOMAIN', message: 'domain query param is required.' } });
  }

  try {
    const domainSettings = await prisma.tenantDomainSettings.findFirst({
      where: {
        customDomain: domain.toLowerCase().trim(),
        sslStatus: { not: 'ERROR' },
        dnsVerified: true,
      },
      include: {
        tenant: {
          select: { slug: true, status: true },
        },
      },
    });

    if (!domainSettings || !domainSettings.tenant || domainSettings.tenant.status !== 'ACTIVE') {
      return res.status(404).json({
        success: false,
        error: { code: 'DOMAIN_NOT_FOUND', message: `Domain '${domain}' không được đăng ký hoặc chưa xác thực DNS.` },
      });
    }

    return res.json({
      success: true,
      data: {
        tenantSlug: domainSettings.tenant.slug,
        tenantId: domainSettings.tenantId,
        sslStatus: domainSettings.sslStatus,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTenantStatus(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) {
    return res.status(404).json({ success: false, error: { message: 'Tenant not found.' } });
  }

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        status: true,
        trialStatus: true,
        trialEndAt: true,
        subscription: {
          select: {
            status: true,
            endDate: true,
          },
        },
      },
    });

    if (!tenant) {
      return res.status(404).json({ success: false, error: { message: 'Tenant not found.' } });
    }

    const now = new Date();
    const hasActiveSubscription = tenant.subscription?.status === 'ACTIVE' 
      && new Date(tenant.subscription.endDate) > now;
    const trialExpired = tenant.trialStatus === 'EXPIRED' 
      || (tenant.trialEndAt && new Date(tenant.trialEndAt) < now);
    const isSuspended = tenant.status === 'SUSPENDED' || tenant.trialStatus === 'SUSPENDED';

    const isAccessible = hasActiveSubscription || (!trialExpired && !isSuspended && tenant.trialStatus === 'ACTIVE');

    return res.json({
      success: true,
      data: {
        isAccessible,
        status: tenant.status,
        trialStatus: tenant.trialStatus,
        trialEndAt: tenant.trialEndAt,
        hasActiveSubscription,
        isSuspended,
      },
    });
  } catch (error) {
    next(error);
  }
}

