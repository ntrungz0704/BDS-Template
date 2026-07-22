/**
 * Tenant Onboarding Controller
 *
 * Handles the first-time setup flow for new tenants.
 * Called by the onboarding wizard in the CMS.
 *
 * POST /api/tenants/onboard
 *   - Creates CompanyInfo record
 *   - Sets templateId on tenant
 *   - Creates TenantDomainSettings (subdomain)
 *   - Creates default TenantPages (home, about, contact, projects, blog)
 *   - Creates default TenantThemeSettings matching the chosen template
 *   - Sets tenant.onboardingCompletedAt
 *
 * GET /api/tenants/onboard/status
 *   - Returns onboarding completion status + next step
 */

import { Request, Response, NextFunction } from 'express';
import { prisma, Prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';

// ─── Validation Schemas ───────────────────────────────────────────────────────

const onboardingSchema = z.object({
  companyName: z.string().min(2, 'Tên công ty tối thiểu 2 ký tự.'),
  slogan: z.string().optional(),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ.'),
  email: z.string().email('Email không hợp lệ.'),
  address: z.string().optional(),
  templateId: z.string().min(1, 'Vui lòng chọn template.'),
  subdomain: z.string()
    .min(3, 'Tên miền tối thiểu 3 ký tự.')
    .max(30, 'Tên miền tối đa 30 ký tự.')
    .regex(/^[a-z0-9-]+$/, 'Chỉ dùng chữ thường, số và dấu gạch ngang.'),
});

// ─── Default Theme per Template ───────────────────────────────────────────────

const TEMPLATE_THEMES: Record<string, Partial<{
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontHeading: string;
  fontBody: string;
}>> = {
  'luxury-gold': { primaryColor: '#C9A66B', secondaryColor: '#1A1A2E', accentColor: '#E8D5A0', backgroundColor: '#FDFBF7', fontHeading: 'Playfair Display', fontBody: 'Lato' },
  'minimal-white': { primaryColor: '#2563EB', secondaryColor: '#64748B', accentColor: '#F59E0B', backgroundColor: '#FFFFFF', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
  'resort-paradise': { primaryColor: '#0891B2', secondaryColor: '#0E7490', accentColor: '#F97316', backgroundColor: '#F0FDFF', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
  'apartment-modern': { primaryColor: '#4F46E5', secondaryColor: '#6366F1', accentColor: '#EC4899', backgroundColor: '#F8FAFF', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
  'green-eco': { primaryColor: '#059669', secondaryColor: '#065F46', accentColor: '#84CC16', backgroundColor: '#F0FDF4', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
  'urban-loft': { primaryColor: '#EA580C', secondaryColor: '#9A3412', accentColor: '#FCD34D', backgroundColor: '#FFFAF7', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
};

// ─── Default System Pages ─────────────────────────────────────────────────────

const DEFAULT_PAGES = [
  { slug: 'home', title: 'Trang Chủ', description: 'Trang chủ website', isSystem: true, published: true, sortOrder: 0 },
  { slug: 'projects', title: 'Dự Án', description: 'Danh sách dự án bất động sản', isSystem: true, published: true, sortOrder: 1 },
  { slug: 'about', title: 'Giới Thiệu', description: 'Giới thiệu về công ty', isSystem: true, published: true, sortOrder: 2 },
  { slug: 'blog', title: 'Bài Viết', description: 'Bài viết và tin tức', isSystem: true, published: true, sortOrder: 3 },
  { slug: 'contact', title: 'Liên Hệ', description: 'Liên hệ tư vấn', isSystem: true, published: true, sortOrder: 4 },
];

// ─── Controller ───────────────────────────────────────────────────────────────

/**
 * POST /api/tenants/onboard
 * Complete first-time onboarding: creates company info, pages, theme, and domain settings.
 */
export async function completeTenantOnboarding(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập.' } });
  }

  const parsed = onboardingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  const { companyName, slogan, phone, email, address, templateId, subdomain } = parsed.data;

  try {
    // 1. Check subdomain availability
    const existingDomain = await prisma.tenantDomainSettings.findFirst({
      where: { subdomain: subdomain.toLowerCase() },
    });
    if (existingDomain && existingDomain.tenantId !== tenantId) {
      return res.status(409).json({
        success: false,
        error: { code: 'SUBDOMAIN_TAKEN', message: `Tên miền '${subdomain}.platformbds.vn' đã được sử dụng. Vui lòng chọn tên khác.` },
      });
    }

    const platformDomain = process.env.PLATFORM_DOMAIN || 'platformbds.vn';

    // Run all setup in a transaction for atomicity
    await prisma.$transaction(async (tx: any) => {
      // 2. Create or update CompanyInfo
      await tx.companyInfo.upsert({
        where: { tenantId },
        create: {
          tenantId,
          name: companyName,
          slogan: slogan || '',
          phone,
          email,
          address: address || '',
          description: `${companyName} - Đơn vị phân phối bất động sản cao cấp tại Việt Nam.`,
          workingHours: '8h00 - 18h00',
        },
        update: {
          name: companyName,
          slogan: slogan || undefined,
          phone,
          email,
          address: address || undefined,
        },
      });

      // 3. Update tenant: set templateId, mark onboarding complete
      await tx.tenant.update({
        where: { id: tenantId },
        data: {
          templateId,
          onboardingCompletedAt: new Date(),
        },
      });

      // 4. Create/upsert TenantDomainSettings
      await tx.tenantDomainSettings.upsert({
        where: { tenantId },
        create: {
          tenantId,
          subdomain: subdomain.toLowerCase(),
          platformDomain,
          customDomain: null,
          dnsVerified: false,
          sslStatus: 'PENDING',
        },
        update: {
          subdomain: subdomain.toLowerCase(),
        },
      });

      // 5. Create default TenantThemeSettings from template defaults
      const templateTheme = TEMPLATE_THEMES[templateId] || TEMPLATE_THEMES['minimal-white'];
      await tx.tenantThemeSettings.upsert({
        where: { tenantId },
        create: {
          tenantId,
          ...templateTheme,
          containerWidth: '1280px',
          borderRadius: '8px',
          shadowStyle: 'soft',
          darkMode: false,
          buttonStyle: 'rounded',
          animationsEnabled: true,
        },
        update: {
          ...templateTheme,
        },
      });

      // 6. Create default system pages (skip if already exist)
      for (const page of DEFAULT_PAGES) {
        const exists = await tx.tenantPage.findFirst({ where: { tenantId, slug: page.slug } });
        if (!exists) {
          await tx.tenantPage.create({
            data: {
              tenantId,
              slug: page.slug,
              title: page.title,
              description: page.description,
              isSystem: page.isSystem,
              published: page.published,
              sortOrder: page.sortOrder,
            },
          });
        }
      }
    });

    logger.info(`[Onboarding] Tenant ${tenantId} completed onboarding. Template: ${templateId}, Subdomain: ${subdomain}.${platformDomain}`);

    return res.status(200).json({
      success: true,
      data: {
        message: 'Website của bạn đã được khởi tạo thành công!',
        websiteUrl: `https://${subdomain}.${platformDomain}`,
        cmsUrl: `https://${subdomain}-cms.${platformDomain}`,
        templateId,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/tenants/onboard/status
 * Returns onboarding completion status and what's missing.
 */
export async function getOnboardingStatus(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập.' } });
  }

  try {
    const [tenant, company, domain, theme, pagesCount] = await Promise.all([
      prisma.tenant.findUnique({ where: { id: tenantId }, select: { templateId: true, onboardingCompletedAt: true } }),
      prisma.companyInfo.findUnique({ where: { tenantId }, select: { id: true, name: true } }),
      prisma.tenantDomainSettings.findUnique({ where: { tenantId }, select: { subdomain: true, customDomain: true, sslStatus: true } }),
      prisma.tenantThemeSettings.findUnique({ where: { tenantId }, select: { id: true } }),
      prisma.tenantPage.count({ where: { tenantId } }),
    ]);

    const steps = {
      company: !!company,
      template: !!(tenant?.templateId),
      domain: !!domain,
      theme: !!theme,
      pages: pagesCount >= 3,
    };

    const isComplete = Object.values(steps).every(Boolean) || !!tenant?.onboardingCompletedAt;

    return res.json({
      success: true,
      data: {
        isComplete,
        completedAt: tenant?.onboardingCompletedAt || null,
        steps,
        subdomain: domain?.subdomain || null,
        templateId: tenant?.templateId || null,
        pagesCount,
      },
    });
  } catch (error) {
    next(error);
  }
}
