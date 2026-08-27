/**
 * CMS Builder Controller
 *
 * Handles all visual builder operations:
 *   - Theme settings (colors, fonts, layout)
 *   - Page management (create, update, delete, list)
 *   - Section management (CRUD, reorder, toggle visibility)
 *   - Version history (snapshot, restore)
 *   - Domain settings (subdomain, custom domain, SSL)
 */

import { Request, Response, NextFunction } from 'express';
import { prisma, Prisma, TemplateRegistry } from '@repo/database';
import { TEMPLATE_CONFIGS } from '@repo/utils';
import { z } from 'zod';
import { logger } from '../index';
import dns from 'dns';

// ─── Validation Schemas ───────────────────────────────────────────────────────

const themeSchema = z.object({
  primaryColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  secondaryColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  accentColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  backgroundColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  surfaceColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  textColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  textMutedColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  borderColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, 'Invalid hex color').optional(),
  fontHeading: z.string().max(100).optional(),
  fontBody: z.string().max(100).optional(),
  fontSizeBase: z.string().max(10).optional(),
  lineHeight: z.string().max(10).optional(),
  containerWidth: z.string().max(20).optional(),
  borderRadius: z.string().max(20).optional(),
  shadowStyle: z.enum(['soft', 'hard', 'none']).optional(),
  darkMode: z.boolean().optional(),
  buttonStyle: z.enum(['rounded', 'square', 'pill']).optional(),
  animationsEnabled: z.boolean().optional(),
  customCss: z.string().max(50000).optional().nullable(),
});

const pageCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang.'),
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  published: z.boolean().optional().default(false),
  seoTitle: z.string().max(200).optional(),
  seoDesc: z.string().max(500).optional(),
  seoKeywords: z.string().max(300).optional(),
  ogImage: z.string().url().optional().or(z.literal('')),
});

const pageUpdateSchema = pageCreateSchema.partial();

const sectionCreateSchema = z.object({
  sectionKey: z.string().min(1).max(50),
  label: z.string().max(100).optional(),
  sortOrder: z.number().int().min(0).optional().default(0),
  isVisible: z.boolean().optional().default(true),
  content: z.record(z.unknown()),
  settings: z.record(z.unknown()).optional(),
});

const sectionUpdateSchema = z.object({
  label: z.string().max(100).optional(),
  content: z.record(z.unknown()).optional(),
  settings: z.record(z.unknown()).optional(),
  isVisible: z.boolean().optional(),
});

const reorderSchema = z.object({
  pageId: z.string().cuid(),
  orderedIds: z.array(z.string().cuid()).min(1),
});

const domainSchema = z.object({
  customDomain: z
    .string()
    .max(253)
    .regex(/^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/, 'Tên miền không hợp lệ.')
    .optional()
    .nullable(),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTenantId(req: Request): string | null {
  return req.tenantId || req.user?.tenantId || null;
}

const PROTECTED_FIELDS = [
  'platformCopyright',
  'platformLicense',
  'platformBranding',
  'systemFooter',
  'systemConfig',
  'systemStatus',
  'subscriptionStatus',
  'trialStatus',
  'trialStartAt',
  'trialEndAt',
  'trialSaveLimit',
  'trialSaveCount',
  'saveCount',
  'templateMaster',
  'templateId',
  'templateVersion',
  'ownerId',
  'customerId',
  'systemLinks',
  'isLocked',
];

export function checkProtectedFields(body: any, role?: string): { violated: boolean; field?: string } {
  if (role === 'SUPER_ADMIN') return { violated: false };
  if (!body || typeof body !== 'object') return { violated: false };

  // Recursive check for protected fields
  function checkObject(obj: any): { violated: boolean; field?: string } {
    if (!obj || typeof obj !== 'object') return { violated: false };
    for (const key of Object.keys(obj)) {
      if (PROTECTED_FIELDS.includes(key)) {
        return { violated: true, field: key };
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const nested = checkObject(obj[key]);
        if (nested.violated) return nested;
      }
    }
    return { violated: false };
  }

  return checkObject(body);
}

function getUserId(req: Request): string {
  return (req as any).user?.id || 'system';
}

function validateNoCodeInjection(data: any): boolean {
  if (!data) return true;
  const str = JSON.stringify(data).toLowerCase();
  // Chặn script, iframe, javascript expressions, inline events, react components, html tags
  if (
    str.includes('<script') || 
    str.includes('javascript:') || 
    str.includes('onload=') || 
    str.includes('onerror=') ||
    str.includes('<iframe') ||
    str.includes('dangerouslysetinnerhtml')
  ) {
    return false;
  }
  return true;
}

async function saveVersion(
  tenantId: string,
  entityType: string,
  entityId: string,
  snapshot: object,
  description: string,
  createdBy: string,
  isAutoSave = false
) {
  await prisma.contentVersion.create({
    data: {
      tenantId,
      entityType,
      entityId,
      snapshot,
      description,
      isAutoSave,
      createdBy,
    },
  });
}

/**
 * Atomically increments the trial save counter for a tenant.
 * Returns the updated count. Should be called after every successful CMS save operation.
 * Only increments when the tenant is on an active trial (not when on a paid subscription).
 */
async function incrementTrialSaveCount(req: Request): Promise<{ newCount: number; limit: number } | null> {
  const trialInfo = req.trialInfo;
  
  // Skip if not on trial or has active subscription
  if (!trialInfo || !trialInfo.isOnTrial || trialInfo.hasActiveSubscription) {
    return null;
  }

  const tenantId = getTenantId(req);
  if (!tenantId) return null;

  // Atomic increment to prevent race conditions
  const updated = await prisma.tenant.update({
    where: { id: tenantId },
    data: { trialSaveCount: { increment: 1 } },
    select: { trialSaveCount: true, trialSaveLimit: true },
  });

  return { newCount: updated.trialSaveCount, limit: updated.trialSaveLimit };
}

// ─── Theme Controllers ────────────────────────────────────────────────────────

export async function getTheme(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const theme = await prisma.tenantThemeSettings.findUnique({ where: { tenantId } });
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { template: true }
    });
    return res.json({ 
      success: true, 
      data: theme,
      templateSlug: tenant?.template?.slug || 'luxury-gold'
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTheme(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  if (!validateNoCodeInjection(req.body)) {
    return res.status(400).json({
      success: false,
      error: { code: 'SECURITY_VIOLATION', message: 'Dữ liệu chứa mã code hoặc script không hợp lệ.' }
    });
  }

  const protectedCheck = checkProtectedFields(req.body, req.user?.role);
  if (protectedCheck.violated) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'PROTECTED_FIELD_MODIFICATION_FORBIDDEN',
        message: `Không được phép chỉnh sửa trường dữ liệu hệ thống (${protectedCheck.field}).`,
      },
    });
  }

  const parsed = themeSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error('[CMS Builder] theme validation failed:', JSON.stringify(parsed.error.flatten(), null, 2));
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu theme không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    // Save version snapshot first
    const existing = await prisma.tenantThemeSettings.findUnique({ where: { tenantId } });
    if (existing) {
      await saveVersion(tenantId, 'theme', existing.id, existing as any, 'Cập nhật theme', getUserId(req), false);
    }

    const theme = await prisma.tenantThemeSettings.upsert({
      where: { tenantId },
      create: { tenantId, ...parsed.data },
      update: { ...parsed.data },
    });

    // Increment trial save counter if on trial
    const saveResult = await incrementTrialSaveCount(req);
    
    logger.info(`[CMS Builder] Theme updated for tenant: ${tenantId}`);
    return res.json({ 
      success: true, 
      data: theme,
      ...(saveResult && {
        trialSave: {
          saveCount: saveResult.newCount,
          saveLimit: saveResult.limit,
          remaining: Math.max(0, saveResult.limit - saveResult.newCount),
        }
      })
    });
  } catch (err) {
    next(err);
  }
}

export async function resetThemeToDefault(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    // 1. Tìm thông tin Tenant để lấy templateId
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Không tìm thấy thông tin website.' }
      });
    }

    // 2. Lấy cấu hình mặc định từ TEMPLATE_CONFIGS và TemplateRegistry
    const templateId = tenant.templateId || 'luxury-gold';
    const templateConfig = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS['luxury-gold'];
    const registryTemplate = TemplateRegistry.get(templateId) || TemplateRegistry.get('luxury-gold');

    const defaultTheme = registryTemplate?.defaultConfig?.themeConfig || {
      primaryColor: '#0B132B',
      secondaryColor: '#1C2541',
      accentColor: '#D4AF37',
      backgroundColor: '#070C1E',
      textColor: '#F3F4F6',
      fontHeading: 'Playfair Display, serif',
      fontBody: 'Plus Jakarta Sans, sans-serif',
      borderRadius: '0px',
      shadow: 'lg'
    };
    
    const defaultPages = registryTemplate?.defaultConfig?.layoutConfig?.pages || [];

    // 3. Thực hiện khôi phục trong transaction
    await prisma.$transaction(async (tx: any) => {
      // a. Cập nhật / Upsert Theme Settings
      await tx.tenantThemeSettings.upsert({
        where: { tenantId },
        create: {
          tenantId,
          primaryColor: defaultTheme.primaryColor,
          secondaryColor: defaultTheme.secondaryColor,
          accentColor: defaultTheme.accentColor,
          backgroundColor: defaultTheme.backgroundColor,
          surfaceColor: defaultTheme.surfaceColor || '#F8FAFC',
          textColor: defaultTheme.textColor || '#0F172A',
          textMutedColor: defaultTheme.textMutedColor || '#64748B',
          borderColor: defaultTheme.borderColor || '#E2E8F0',
          fontHeading: defaultTheme.fontHeading,
          fontBody: defaultTheme.fontBody,
          borderRadius: defaultTheme.borderRadius || '0px',
          shadowStyle: defaultTheme.shadow === 'lg' ? 'hard' : 'soft',
          darkMode: false,
          buttonStyle: 'rounded',
          animationsEnabled: true,
        },
        update: {
          primaryColor: defaultTheme.primaryColor,
          secondaryColor: defaultTheme.secondaryColor,
          accentColor: defaultTheme.accentColor,
          backgroundColor: defaultTheme.backgroundColor,
          surfaceColor: defaultTheme.surfaceColor || '#F8FAFC',
          textColor: defaultTheme.textColor || '#0F172A',
          textMutedColor: defaultTheme.textMutedColor || '#64748B',
          borderColor: defaultTheme.borderColor || '#E2E8F0',
          fontHeading: defaultTheme.fontHeading,
          fontBody: defaultTheme.fontBody,
          borderRadius: defaultTheme.borderRadius || '0px',
          shadowStyle: defaultTheme.shadow === 'lg' ? 'hard' : 'soft',
        }
      });

      // b. Cập nhật lại Company Info về mặc định theo templateConfig
      await tx.companyInfo.upsert({
        where: { tenantId },
        create: {
          tenantId,
          name: templateConfig.projectName || tenant.name,
          email: 'contact@' + (tenant.subdomain || 'platformbds') + '.vn',
          phone: '1900 6888',
          slogan: templateConfig.tagline || '',
          description: templateConfig.heroSubtitle || '',
          address: templateConfig.location?.highlights?.[0] || '68 Nguyễn Huệ, Quận 1, TP. HCM',
          workingHours: '8h00 - 20h00',
          aboutContent: templateConfig.location?.desc || '',
        },
        update: {
          name: templateConfig.projectName || tenant.name,
          slogan: templateConfig.tagline || '',
          description: templateConfig.heroSubtitle || '',
          address: templateConfig.location?.highlights?.[0] || '68 Nguyễn Huệ, Quận 1, TP. HCM',
          workingHours: '8h00 - 20h00',
          aboutContent: templateConfig.location?.desc || '',
        }
      });

      // c. Xóa sạch các Sections và Pages hiện tại của Tenant để nạp lại bản gốc sạch sẽ
      const tenantPages = await tx.tenantPage.findMany({ where: { tenantId } });
      const pageIds = tenantPages.map((p: any) => p.id);

      await tx.tenantSection.deleteMany({
        where: { pageId: { in: pageIds } }
      });

      await tx.tenantPage.deleteMany({
        where: { tenantId }
      });

      // d. Nạp lại default Pages & Sections bản gốc
      for (let i = 0; i < defaultPages.length; i++) {
        const pageData = defaultPages[i];
        const page = await tx.tenantPage.create({
          data: {
            tenantId,
            slug: pageData.slug,
            title: pageData.name,
            description: `Trang ${pageData.name} của website bất động sản`,
            isSystem: true,
            published: true,
            sortOrder: i
          }
        });

        if (pageData.sections) {
          for (let j = 0; j < pageData.sections.length; j++) {
            const sec = pageData.sections[j];
            await tx.tenantSection.create({
              data: {
                tenantId,
                pageId: page.id,
                sectionKey: sec.id,
                label: sec.name,
                sortOrder: j,
                isVisible: true,
                content: sec.content || {},
                settings: sec.settings || {}
              }
            });
          }
        }
      }

      // e. Xóa sạch các Projects hiện tại và nạp lại default Projects bản gốc từ demoProjects hoặc fallback về floorPlans
      await tx.project.deleteMany({ where: { tenantId } });
      const demoProjs = templateConfig.demoProjects || [];
      if (demoProjs.length > 0) {
        for (let k = 0; k < demoProjs.length; k++) {
          const dp = demoProjs[k];
          const typeStr = (dp.type || '').toLowerCase();
          const projType = typeStr.includes('villa') || typeStr.includes('biệt') || typeStr.includes('mansion') ? 'VILLA' : 'APARTMENT';
          
          const priceValRaw = dp.priceVal || dp.priceNum || 0;
          const priceFromVal = priceValRaw ? Math.round(priceValRaw * (priceValRaw < 1000 ? 1000 : 1)) : 0;

          await tx.project.create({
            data: {
              tenantId,
              title: dp.name || dp.title,
              slug: `${templateId}-project-${k}`,
              description: dp.desc || dp.description || dp.specs || '',
              shortDescription: dp.specs || dp.type || '',
              type: projType,
              status: 'SELLING',
              price: dp.price || dp.priceStr || 'Liên hệ',
              priceFrom: priceFromVal ? BigInt(priceFromVal) : null,
              area: dp.area || '—',
              address: dp.location || dp.loc || 'Thành phố Hồ Chí Minh',
              thumbnail: dp.img || dp.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
              published: true,
              sortOrder: k,
            }
          });
        }
      } else if (templateConfig.floorPlans && templateConfig.floorPlans.length > 0) {
        for (let k = 0; k < templateConfig.floorPlans.length; k++) {
          const plan = templateConfig.floorPlans[k];
          await tx.project.create({
            data: {
              tenantId,
              title: plan.name,
              slug: `${templateId}-project-${k}`,
              description: plan.specs,
              shortDescription: plan.floor,
              type: plan.floor.includes('Villas') || plan.floor.includes('Biệt') ? 'VILLA' : 'APARTMENT',
              status: 'SELLING',
              price: plan.price,
              area: plan.area,
              address: templateConfig.overview?.[1]?.value || 'Thành phố Hồ Chí Minh',
              thumbnail: templateConfig.gallery?.[k % templateConfig.gallery.length] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
              published: true,
              sortOrder: k,
            }
          });
        }
      }
    });

    logger.info(`[CMS Builder] Tenant reset to default template successfully: ${tenantId}`);
    return res.json({
      success: true,
      message: 'Khôi phục cấu hình và giao diện mẫu bản gốc thành công!'
    });
  } catch (err) {
    next(err);
  }
}

// ─── Page Controllers ─────────────────────────────────────────────────────────

export async function getPages(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const pages = await prisma.tenantPage.findMany({
      where: { tenantId, deletedAt: null },
      orderBy: [{ isSystem: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        published: true,
        isSystem: true,
        sortOrder: true,
        seoTitle: true,
        seoDesc: true,
        ogImage: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { sections: true } },
      },
    });
    return res.json({ success: true, data: pages });
  } catch (err) {
    next(err);
  }
}

export async function createPage(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const protectedCheck = checkProtectedFields(req.body, req.user?.role);
  if (protectedCheck.violated) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'PROTECTED_FIELD_MODIFICATION_FORBIDDEN',
        message: `Không được phép chỉnh sửa trường dữ liệu hệ thống (${protectedCheck.field}).`,
      },
    });
  }

  const parsed = pageCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const page = await prisma.tenantPage.create({
      data: { tenantId, ...parsed.data, isSystem: false },
    });
    logger.info(`[CMS Builder] Page created: ${page.slug} for tenant: ${tenantId}`);
    return res.status(201).json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

export async function getPage(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const page = await prisma.tenantPage.findFirst({
      where: { tenantId, slug: req.params.slug, deletedAt: null },
      include: {
        sections: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (!page) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });
    return res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

export async function updatePage(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const protectedCheck = checkProtectedFields(req.body, req.user?.role);
  if (protectedCheck.violated) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'PROTECTED_FIELD_MODIFICATION_FORBIDDEN',
        message: `Không được phép chỉnh sửa trường dữ liệu hệ thống (${protectedCheck.field}).`,
      },
    });
  }

  const parsed = pageUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const page = await prisma.tenantPage.findFirst({
      where: { tenantId, slug: req.params.slug, deletedAt: null },
    });
    if (!page) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });

    const updated = await prisma.tenantPage.update({
      where: { id: page.id },
      data: { ...parsed.data },
    });
    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deletePage(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const page = await prisma.tenantPage.findFirst({
      where: { tenantId, slug: req.params.slug, deletedAt: null },
    });
    if (!page) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });
    if (page.isSystem) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Không thể xóa trang hệ thống (Home, About, Contact...).' } });
    }

    // Soft delete
    await prisma.tenantPage.update({ where: { id: page.id }, data: { deletedAt: new Date() } });
    logger.info(`[CMS Builder] Page soft-deleted: ${page.slug} for tenant: ${tenantId}`);
    return res.json({ success: true, message: 'Đã xóa trang thành công.' });
  } catch (err) {
    next(err);
  }
}

// ─── Section Controllers ──────────────────────────────────────────────────────

export async function getPageSections(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const page = await prisma.tenantPage.findFirst({
      where: { tenantId, slug: req.params.slug, deletedAt: null },
    });
    if (!page) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });

    const sections = await prisma.tenantSection.findMany({
      where: { tenantId, pageId: page.id },
      orderBy: { sortOrder: 'asc' },
    });
    return res.json({ success: true, data: sections });
  } catch (err) {
    next(err);
  }
}

export async function createSection(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  if (!validateNoCodeInjection(req.body)) {
    return res.status(400).json({
      success: false,
      error: { code: 'SECURITY_VIOLATION', message: 'Dữ liệu chứa mã code hoặc script không hợp lệ.' }
    });
  }

  const parsed = sectionCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const page = await prisma.tenantPage.findFirst({
      where: { tenantId, slug: req.params.slug, deletedAt: null },
    });
    if (!page) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trang không tồn tại.' } });

    const section = await prisma.tenantSection.create({
      data: {
        tenantId,
        pageId: page.id,
        sectionKey: parsed.data.sectionKey,
        label: parsed.data.label,
        sortOrder: parsed.data.sortOrder ?? 0,
        isVisible: parsed.data.isVisible ?? true,
        content: parsed.data.content as Prisma.InputJsonValue,
        settings: parsed.data.settings ? parsed.data.settings as Prisma.InputJsonValue : Prisma.JsonNull,
      },
    });
    return res.status(201).json({ success: true, data: section });
  } catch (err) {
    next(err);
  }
}

export async function updateSection(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  if (!validateNoCodeInjection(req.body)) {
    return res.status(400).json({
      success: false,
      error: { code: 'SECURITY_VIOLATION', message: 'Dữ liệu chứa mã code hoặc script không hợp lệ.' }
    });
  }

  const protectedCheck = checkProtectedFields(req.body, req.user?.role);
  if (protectedCheck.violated) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'PROTECTED_FIELD_MODIFICATION_FORBIDDEN',
        message: `Không được phép chỉnh sửa trường dữ liệu hệ thống (${protectedCheck.field}).`,
      },
    });
  }

  const parsed = sectionUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const section = await prisma.tenantSection.findFirst({
      where: { id: req.params.id, tenantId },
    });
    if (!section) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Section không tồn tại.' } });

    // Save version before overwriting
    await saveVersion(tenantId, 'section', section.id, section as any, `Cập nhật section: ${section.sectionKey}`, getUserId(req), false);

    const updated = await prisma.tenantSection.update({
      where: { id: req.params.id },
      data: {
        ...(parsed.data.label !== undefined && { label: parsed.data.label }),
        ...(parsed.data.isVisible !== undefined && { isVisible: parsed.data.isVisible }),
        ...(parsed.data.content !== undefined && { content: parsed.data.content as Prisma.InputJsonValue }),
        ...(parsed.data.settings !== undefined && { settings: parsed.data.settings as Prisma.InputJsonValue }),
        version: { increment: 1 },
      },
    });
    // Increment trial save counter if on trial
    const saveResult = await incrementTrialSaveCount(req);
    
    return res.json({ 
      success: true, 
      data: updated,
      ...(saveResult && {
        trialSave: {
          saveCount: saveResult.newCount,
          saveLimit: saveResult.limit,
          remaining: Math.max(0, saveResult.limit - saveResult.newCount),
        }
      })
    });
  } catch (err) {
    next(err);
  }
}

export async function toggleSectionVisibility(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const section = await prisma.tenantSection.findFirst({ where: { id: req.params.id, tenantId } });
    if (!section) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Section không tồn tại.' } });

    const updated = await prisma.tenantSection.update({
      where: { id: req.params.id },
      data: { isVisible: !section.isVisible },
    });
    return res.json({ success: true, data: { id: updated.id, isVisible: updated.isVisible } });
  } catch (err) {
    next(err);
  }
}

export async function reorderSections(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const parsed = reorderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const { pageId, orderedIds } = parsed.data;

    // Verify all sections belong to this tenant and page
    const sections = await prisma.tenantSection.findMany({
      where: { id: { in: orderedIds }, tenantId, pageId },
      select: { id: true },
    });

    if (sections.length !== orderedIds.length) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Một hoặc nhiều section không thuộc tenant/page này.' } });
    }

    // Batch update sort orders in a transaction
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.tenantSection.update({ where: { id }, data: { sortOrder: index } })
      )
    );

    return res.json({ success: true, message: 'Đã sắp xếp lại các section.' });
  } catch (err) {
    next(err);
  }
}

export async function deleteSection(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const section = await prisma.tenantSection.findFirst({ where: { id: req.params.id, tenantId } });
    if (!section) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Section không tồn tại.' } });

    await prisma.tenantSection.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: 'Đã xóa section.' });
  } catch (err) {
    next(err);
  }
}

// ─── Version History Controllers ──────────────────────────────────────────────

export async function getVersionHistory(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const { entityType, entityId } = req.params;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    const versions = await prisma.contentVersion.findMany({
      where: { tenantId, entityType, entityId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        description: true,
        isAutoSave: true,
        createdAt: true,
        createdBy: true,
      },
    });
    return res.json({ success: true, data: versions });
  } catch (err) {
    next(err);
  }
}

export async function restoreVersion(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const { versionId } = req.body;
  if (!versionId) {
    return res.status(422).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'versionId là bắt buộc.' } });
  }

  try {
    const version = await prisma.contentVersion.findFirst({
      where: { id: versionId, tenantId },
    });
    if (!version) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Phiên bản không tồn tại.' } });

    const snapshot = version.snapshot as Record<string, any>;

    if (version.entityType === 'section') {
      await prisma.tenantSection.update({
        where: { id: version.entityId },
        data: {
          content: snapshot.content,
          settings: snapshot.settings,
          isVisible: snapshot.isVisible,
          version: { increment: 1 },
        },
      });
    } else if (version.entityType === 'theme') {
      const { id: _id, tenantId: _tenantId, createdAt: _ca, updatedAt: _ua, ...themeData } = snapshot;
      await prisma.tenantThemeSettings.update({
        where: { tenantId },
        data: themeData,
      });
    }

    logger.info(`[CMS Builder] Version restored: ${versionId} for tenant: ${tenantId}`);
    return res.json({ success: true, message: 'Đã khôi phục phiên bản thành công.' });
  } catch (err) {
    next(err);
  }
}

// ─── Domain Settings Controllers ──────────────────────────────────────────────

export async function getDomainSettings(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const [domain, tenant] = await Promise.all([
      prisma.tenantDomainSettings.findUnique({ where: { tenantId } }),
      prisma.tenant.findUnique({ where: { id: tenantId }, select: { slug: true, name: true } })
    ]);
    return res.json({
      success: true,
      data: {
        ...(domain || {}),
        subdomain: tenant?.slug || '',
        tenantName: tenant?.name || '',
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function updateDomainSettings(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const parsed = domainSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Tên miền không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    // 1. If subdomain update requested, validate and update tenant slug
    const requestedSubdomain = (req.body.subdomain as string | undefined)?.toLowerCase().trim();
    if (requestedSubdomain) {
      const subdomainRegex = /^[a-z0-9](-?[a-z0-9])*$/;
      if (!subdomainRegex.test(requestedSubdomain)) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_SUBDOMAIN', message: 'Subdomain chỉ được chứa chữ cái thường, số và dấu gạch ngang (không có khoảng trắng).' },
        });
      }

      const reserved = ['www', 'admin', 'cms', 'api', 'app', 'marketplace', 'templates', 'template', 'themes', 'mail', 'static', 'assets', 'support'];
      if (reserved.includes(requestedSubdomain)) {
        return res.status(400).json({
          success: false,
          error: { code: 'RESERVED_SUBDOMAIN', message: 'Tên subdomain này thuộc danh mục bảo lưu của hệ thống.' },
        });
      }

      const existingTenant = await prisma.tenant.findFirst({
        where: { slug: requestedSubdomain, id: { not: tenantId } },
      });
      if (existingTenant) {
        return res.status(409).json({
          success: false,
          error: { code: 'SUBDOMAIN_TAKEN', message: 'Subdomain này đã có người đăng ký, vui lòng chọn tên khác.' },
        });
      }

      await prisma.tenant.update({
        where: { id: tenantId },
        data: { slug: requestedSubdomain },
      });
    }

    // 2. Check if custom domain is already taken by another tenant
    if (parsed.data.customDomain) {
      const existing = await prisma.tenantDomainSettings.findFirst({
        where: { customDomain: parsed.data.customDomain, tenantId: { not: tenantId } },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          error: { code: 'DOMAIN_TAKEN', message: 'Tên miền này đã được sử dụng bởi một tenant khác.' },
        });
      }
    }

    const domain = await prisma.tenantDomainSettings.upsert({
      where: { tenantId },
      create: {
        tenantId,
        customDomain: parsed.data.customDomain || null,
        sslStatus: parsed.data.customDomain ? 'PENDING' : 'ACTIVE',
        dnsVerified: false,
      },
      update: {
        customDomain: parsed.data.customDomain || null,
        sslStatus: parsed.data.customDomain ? 'PENDING' : 'ACTIVE',
        dnsVerified: false,
        dnsVerifiedAt: null,
      },
    });

    logger.info(`[CMS Builder] Domain settings updated for tenant: ${tenantId}`);
    return res.json({ success: true, data: { ...domain, subdomain: requestedSubdomain } });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/cms/subscription
 * Trả về thông tin gói đăng ký hiện tại của tenant.
 */
export async function getSubscription(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId!;
  try {
    // Fetch subscription and trial info together
    const [subscription, tenant] = await Promise.all([
      prisma.subscription.findFirst({
        where: { tenantId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          plan: true,
          status: true,
          startDate: true,
          endDate: true,
          amount: true,
          billingPeriod: true,
        },
      }),
      prisma.tenant.findUnique({
        where: { id: tenantId },
        select: {
          trialStartAt: true,
          trialEndAt: true,
          trialSaveLimit: true,
          trialSaveCount: true,
          trialStatus: true,
        },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        subscription: subscription || null,
        trial: tenant ? {
          status: tenant.trialStatus,
          startAt: tenant.trialStartAt,
          endAt: tenant.trialEndAt,
          saveCount: tenant.trialSaveCount,
          saveLimit: tenant.trialSaveLimit,
          remainingSaves: Math.max(0, tenant.trialSaveLimit - tenant.trialSaveCount),
        } : null,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyDomainDns(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const domainSettings = await prisma.tenantDomainSettings.findUnique({ where: { tenantId } });
    if (!domainSettings || !domainSettings.customDomain) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy cấu hình tên miền riêng.' } });
    }

    const domain = domainSettings.customDomain;
    let dnsVerified = false;

    try {
      // Thực hiện phân giải DNS thực tế
      const addresses = await dns.promises.resolve(domain, 'A').catch(() => []);
      const cnameRecords = await dns.promises.resolveCname(domain).catch(() => []);
      
      if (addresses.length > 0 || cnameRecords.length > 0 || domain.endsWith('.local') || process.env.NODE_ENV === 'development') {
        dnsVerified = true;
      }
    } catch (dnsErr) {
      // Trong môi trường dev, tự động verify thành công
      if (process.env.NODE_ENV === 'development') {
        dnsVerified = true;
      }
    }

    if (dnsVerified) {
      await prisma.tenantDomainSettings.update({
        where: { tenantId },
        data: { dnsVerified: true, dnsVerifiedAt: new Date() }
      });
    }

    return res.json({
      success: true,
      data: {
        dnsVerified,
        message: dnsVerified ? 'Xác thực DNS thành công!' : 'Chưa tìm thấy bản ghi DNS phù hợp. Hãy trỏ CNAME về subdomain của bạn hoặc A record về IP hệ thống.'
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function provisionDomainSsl(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const domainSettings = await prisma.tenantDomainSettings.findUnique({ where: { tenantId } });
    if (!domainSettings || !domainSettings.customDomain) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy cấu hình tên miền riêng.' } });
    }

    if (!domainSettings.dnsVerified) {
      return res.status(400).json({ success: false, error: { message: 'Vui lòng xác thực DNS trước khi cấp phát SSL.' } });
    }

    // Giả lập cuộc gọi API tới Cloudflare Edge Certificates
    logger.info(`[Cloudflare SSL] Đang gửi yêu cầu khởi tạo SSL cho domain: ${domainSettings.customDomain}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // simulate api latency

    const updated = await prisma.tenantDomainSettings.update({
      where: { tenantId },
      data: { sslStatus: 'ACTIVE' }
    });

    return res.json({
      success: true,
      data: updated,
      message: 'Khởi tạo chứng chỉ SSL qua Cloudflare thành công!'
    });
  } catch (err) {
    next(err);
  }
}

export async function checkTenantUpdate(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant || !tenant.templateId) {
      return res.status(404).json({ success: false, error: { message: 'Tenant hoặc template tương ứng không tồn tại.' } });
    }

    const latestVersion = await prisma.templateVersion.findFirst({
      where: { templateId: tenant.templateId },
      orderBy: { version: 'desc' }
    });

    const currentVer = tenant.version || 10;
    const updateAvailable = latestVersion ? latestVersion.version > currentVer : false;

    return res.json({
      success: true,
      data: {
        updateAvailable,
        currentVersion: currentVer,
        latestVersion: latestVersion ? latestVersion.version : currentVer,
        updateNotes: latestVersion ? latestVersion.updateNotes : null
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function previewTenantUpdate(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant || !tenant.templateId) {
      return res.status(404).json({ success: false, error: { message: 'Tenant hoặc template tương ứng không tồn tại.' } });
    }

    const latestVersion = await prisma.templateVersion.findFirst({
      where: { templateId: tenant.templateId },
      orderBy: { version: 'desc' }
    });

    if (!latestVersion) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy cấu hình phiên bản mới.' } });
    }

    return res.json({
      success: true,
      data: {
        themeConfig: latestVersion.themeConfig,
        layoutConfig: latestVersion.layoutConfig,
        featureFlags: latestVersion.featureFlags
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function applyTenantUpdate(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant || !tenant.templateId) {
      return res.status(404).json({ success: false, error: { message: 'Tenant hoặc template tương ứng không tồn tại.' } });
    }

    const template = await prisma.template.findUnique({ where: { id: tenant.templateId } });
    if (!template) return res.status(404).json({ success: false, error: { message: 'Template không tồn tại.' } });

    const latestVersion = await prisma.templateVersion.findFirst({
      where: { templateId: tenant.templateId },
      orderBy: { version: 'desc' }
    });

    if (!latestVersion) {
      return res.status(400).json({ success: false, error: { message: 'Template chưa có phiên bản nào được xuất bản.' } });
    }

    const currentVer = tenant.version || 10;
    const targetVer = latestVersion.version;
    if (currentVer >= targetVer) {
      return res.status(400).json({ success: false, error: { message: 'Bạn đang ở phiên bản mới nhất.' } });
    }

    // Lưu lại phiên bản lịch sử của tenant để phục vụ Rollback nếu cần
    const existingTheme = await prisma.tenantThemeSettings.findUnique({ where: { tenantId } });
    if (existingTheme) {
      await saveVersion(tenantId, 'theme', existingTheme.id, existingTheme as any, `Lưu nháp trước khi nâng cấp v${targetVer / 10}`, getUserId(req), false);
    }

    // Áp dụng di cư cấu hình qua Registry
    await prisma.$transaction(async (tx: any) => {
      // 1. Migrate Theme
      if (existingTheme) {
        const migratedTheme = TemplateRegistry.migrate(
          template.slug,
          currentVer,
          targetVer,
          existingTheme
        );

        await tx.tenantThemeSettings.update({
          where: { tenantId },
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

      // 2. Migrate Pages & Sections (chỉ cập nhật cấu hình thiết kế cấu trúc, không đụng tới Content nhập tay)
      const pages = await tx.tenantPage.findMany({
        where: { tenantId },
        include: { sections: true }
      });

      for (const page of pages) {
        for (const section of page.sections) {
          const migratedSection = TemplateRegistry.migrate(
            template.slug,
            currentVer,
            targetVer,
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

      // 3. Update Tenant Version
      await tx.tenant.update({
        where: { id: tenantId },
        data: { version: targetVer }
      });
    });

    logger.info(`[Upgrade] Tenant ${tenantId} đã tự nâng cấp lên v${targetVer / 10}`);

    return res.json({
      success: true,
      message: `Nâng cấp thành công lên phiên bản v${targetVer / 10}!`
    });
  } catch (err) {
    next(err);
  }
}

export async function rollbackTenantUpdate(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) return res.status(404).json({ success: false, error: { message: 'Tenant không tồn tại.' } });

    const lastVersion = await prisma.contentVersion.findFirst({
      where: { tenantId, entityType: 'theme' },
      orderBy: { createdAt: 'desc' }
    });

    if (!lastVersion) {
      return res.status(400).json({ success: false, error: { message: 'Không tìm thấy lịch sử lưu trữ để khôi phục.' } });
    }

    const snapshot = lastVersion.snapshot as Record<string, any>;

    await prisma.$transaction(async (tx: any) => {
      // Khôi phục Theme settings
      await tx.tenantThemeSettings.update({
        where: { tenantId },
        data: {
          primaryColor: snapshot.primaryColor,
          secondaryColor: snapshot.secondaryColor,
          accentColor: snapshot.accentColor,
          backgroundColor: snapshot.backgroundColor,
          fontHeading: snapshot.fontHeading,
          fontBody: snapshot.fontBody,
          borderRadius: snapshot.borderRadius,
        }
      });

      // Hạ cấp số phiên bản
      const newVer = Math.max(10, (tenant.version || 10) - 1);
      await tx.tenant.update({
        where: { id: tenantId },
        data: { version: newVer }
      });
    });

    return res.json({
      success: true,
      message: 'Khôi phục thiết kế về phiên bản trước thành công!'
    });
  } catch (err) {
    next(err);
  }
}

// ─── Company Info Controllers ────────────────────────────────────────────────

const companyInfoSchema = z.object({
  name: z.string().max(200).optional(),
  slogan: z.string().max(300).optional(),
  description: z.string().max(2000).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().max(200).optional().or(z.literal('')),
  address: z.string().max(500).optional(),
  ward: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  workingHours: z.string().max(100).optional(),
  facebookUrl: z.string().max(2000).optional().or(z.literal('')),
  youtubeUrl: z.string().max(2000).optional().or(z.literal('')),
  zaloNumber: z.string().max(20).optional(),
  mapEmbedUrl: z.string().max(2000).optional(),
  logo: z.string().max(2000).optional(),
});

// Map frontend field names → Prisma schema field names
function mapToDbFields(data: Record<string, any>) {
  const { facebookUrl, youtubeUrl, zaloNumber, mapEmbedUrl, ward, district, city, address, ...rest } = data;
  // Gộp địa chỉ chi tiết vào một field address
  const fullAddress = [address, ward, district, city].filter(Boolean).join(', ') || address;
  return {
    ...rest,
    ...(fullAddress !== undefined && { address: fullAddress }),
    ...(facebookUrl !== undefined && { facebook: facebookUrl }),
    ...(youtubeUrl !== undefined && { youtube: youtubeUrl }),
    ...(zaloNumber !== undefined && { zalo: zaloNumber }),
    ...(mapEmbedUrl !== undefined && { googleMapsEmbed: mapEmbedUrl }),
  };
}

// Map DB fields → frontend field names
function mapToFrontendFields(info: any) {
  if (!info) return null;
  return {
    ...info,
    facebookUrl: info.facebook || '',
    youtubeUrl: info.youtube || '',
    zaloNumber: info.zalo || '',
    mapEmbedUrl: info.googleMapsEmbed || '',
  };
}

export async function getCompanyInfo(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const info = await prisma.companyInfo.findUnique({ where: { tenantId } });
    return res.json({ success: true, data: mapToFrontendFields(info) });
  } catch (err) {
    next(err);
  }
}

export async function updateCompanyInfo(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const protectedCheck = checkProtectedFields(req.body, req.user?.role);
  if (protectedCheck.violated) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'PROTECTED_FIELD_MODIFICATION_FORBIDDEN',
        message: `Không được phép chỉnh sửa trường dữ liệu hệ thống (${protectedCheck.field}).`,
      },
    });
  }

  const parsed = companyInfoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const dbData = mapToDbFields(parsed.data);
    const info = await prisma.companyInfo.upsert({
      where: { tenantId },
      create: { tenantId, ...dbData },
      update: { ...dbData },
    });

    logger.info(`[CMS Builder] CompanyInfo updated for tenant: ${tenantId}`);
    return res.json({ success: true, data: mapToFrontendFields(info) });
  } catch (err) {
    next(err);
  }
}

// ─── SEO Controllers ─────────────────────────────────────────────────────────

const seoSchema = z.object({
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  googleAnalyticsId: z.string().optional().nullable(),
  googleSearchConsole: z.string().optional().nullable(),
  robotsTxt: z.string().optional().nullable(),
  enableSitemap: z.boolean().optional(),
});

export async function getSeoConfig(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  try {
    const seo = await prisma.seoConfig.findUnique({ where: { tenantId } });
    return res.json({ success: true, data: seo || {} });
  } catch (err) {
    next(err);
  }
}

export async function updateSeoConfig(req: Request, res: Response, next: NextFunction) {
  const tenantId = getTenantId(req);
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy Tenant.' } });

  const parsed = seoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: parsed.error.flatten() },
    });
  }

  try {
    const seo = await prisma.seoConfig.upsert({
      where: { tenantId },
      create: { tenantId, ...parsed.data },
      update: { ...parsed.data },
    });
    return res.json({ success: true, data: seo });
  } catch (err) {
    next(err);
  }
}
