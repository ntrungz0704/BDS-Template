import { prisma, Prisma } from '@repo/database';
import { BUSINESS_CONFIG } from '@repo/config';
import { hash } from 'bcrypt';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface OnboardingInput {
  tenantName: string;
  tenantSlug: string;
  templateId: string;
  subdomain: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerFullName: string;
  plan?: 'STARTER' | 'PRO' | 'BUSINESS';
  orderId?: string;
}

export interface OnboardingResult {
  tenantId: string;
  tenantSlug: string;
  ownerId: string;
  cmsUrl: string;
  subdomain: string;
  websiteUrl: string;
}

// ─── Default Content Templates ─────────────────────────────────────────────

const DEFAULT_PAGES = [
  { slug: 'home',     title: 'Trang chủ',    isSystem: true,  sortOrder: 1 },
  { slug: 'about',    title: 'Giới thiệu',   isSystem: true,  sortOrder: 2 },
  { slug: 'projects', title: 'Dự án',        isSystem: true,  sortOrder: 3 },
  { slug: 'blog',     title: 'Tin tức',      isSystem: true,  sortOrder: 4 },
  { slug: 'contact',  title: 'Liên hệ',      isSystem: true,  sortOrder: 5 },
];

const DEFAULT_SECTIONS: Record<string, Array<{ sectionKey: string; label: string; sortOrder: number; content: object; settings: object }>> = {
  home: [
    {
      sectionKey: 'hero',
      label: 'Banner Hero',
      sortOrder: 1,
      content: {
        heading: 'Tìm kiếm ngôi nhà mơ ước của bạn',
        subheading: 'Chúng tôi cung cấp hàng nghìn bất động sản chất lượng cao trên toàn quốc',
        ctaText: 'Xem dự án',
        ctaUrl: '/projects',
        backgroundType: 'gradient',
      },
      settings: { paddingY: 'xl', backgroundColor: 'brand', textAlign: 'center', animationsEnabled: true },
    },
    {
      sectionKey: 'stats',
      label: 'Thống kê',
      sortOrder: 2,
      content: {
        items: [
          { label: 'Dự án đã bàn giao', value: '500+' },
          { label: 'Khách hàng tin tưởng', value: '10.000+' },
          { label: 'Năm kinh nghiệm', value: '15+' },
          { label: 'Tỉnh thành', value: '63' },
        ],
      },
      settings: { paddingY: 'lg', backgroundColor: 'surface' },
    },
    {
      sectionKey: 'featured_projects',
      label: 'Dự án nổi bật',
      sortOrder: 3,
      content: { heading: 'Dự án nổi bật', subheading: 'Khám phá những bất động sản tiêu biểu', limit: 6 },
      settings: { paddingY: 'xl', backgroundColor: 'white' },
    },
    {
      sectionKey: 'cta',
      label: 'Kêu gọi hành động',
      sortOrder: 4,
      content: {
        heading: 'Bạn đang tìm kiếm bất động sản?',
        subheading: 'Để lại thông tin, chúng tôi sẽ tư vấn miễn phí',
        ctaText: 'Liên hệ ngay',
        ctaUrl: '/contact',
      },
      settings: { paddingY: 'xl', backgroundColor: 'brand', textAlign: 'center' },
    },
    {
      sectionKey: 'contact_form',
      label: 'Form liên hệ nhanh',
      sortOrder: 5,
      content: { heading: 'Nhận tư vấn miễn phí', fields: ['fullName', 'phone', 'email', 'message'] },
      settings: { paddingY: 'xl', backgroundColor: 'surface' },
    },
  ],
  about: [
    {
      sectionKey: 'about_hero',
      label: 'Tiêu đề trang giới thiệu',
      sortOrder: 1,
      content: { heading: 'Về chúng tôi', subheading: 'Đơn vị phát triển bất động sản uy tín hàng đầu' },
      settings: { paddingY: 'lg', backgroundColor: 'brand' },
    },
    {
      sectionKey: 'about_content',
      label: 'Nội dung giới thiệu',
      sortOrder: 2,
      content: { body: '<p>Chúng tôi là đơn vị phát triển bất động sản với hơn 15 năm kinh nghiệm trong ngành...</p>' },
      settings: { paddingY: 'xl', backgroundColor: 'white' },
    },
  ],
  contact: [
    {
      sectionKey: 'contact_hero',
      label: 'Tiêu đề trang liên hệ',
      sortOrder: 1,
      content: { heading: 'Liên hệ với chúng tôi', subheading: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn' },
      settings: { paddingY: 'lg', backgroundColor: 'brand' },
    },
    {
      sectionKey: 'contact_form',
      label: 'Form liên hệ',
      sortOrder: 2,
      content: { heading: 'Gửi tin nhắn', fields: ['fullName', 'phone', 'email', 'message'] },
      settings: { paddingY: 'xl', backgroundColor: 'white' },
    },
    {
      sectionKey: 'map',
      label: 'Bản đồ Google Maps',
      sortOrder: 3,
      content: { embedUrl: '' },
      settings: { paddingY: 'none', backgroundColor: 'white' },
    },
  ],
};

const DEFAULT_MENUS = [
  {
    name: 'Menu chính',
    location: 'header',
    items: [
      { label: 'Trang chủ', url: '/', sortOrder: 1 },
      { label: 'Dự án', url: '/projects', sortOrder: 2 },
      { label: 'Tin tức', url: '/blog', sortOrder: 3 },
      { label: 'Giới thiệu', url: '/about', sortOrder: 4 },
      { label: 'Liên hệ', url: '/contact', sortOrder: 5 },
    ],
  },
  {
    name: 'Menu footer',
    location: 'footer',
    items: [
      { label: 'Dự án', url: '/projects', sortOrder: 1 },
      { label: 'Tin tức', url: '/blog', sortOrder: 2 },
      { label: 'Liên hệ', url: '/contact', sortOrder: 3 },
    ],
  },
];

// ─── Onboarding Service ─────────────────────────────────────────────────────

export class OnboardingService {
  /**
   * Full atomic onboarding — creates everything needed for a new tenant in one
   * Prisma transaction. If any step fails, the entire operation is rolled back.
   */
  async provisionTenant(input: OnboardingInput): Promise<OnboardingResult> {
    const {
      tenantName, tenantSlug, templateId, subdomain,
      ownerEmail, ownerPassword, ownerFullName, plan = 'STARTER', orderId,
    } = input;

    // Validate: slug and subdomain uniqueness
    const [existingSlug, existingSubdomain, existingOwner] = await Promise.all([
      prisma.tenant.findFirst({ where: { slug: tenantSlug } }),
      prisma.tenantDomainSettings.findFirst({ where: { subdomain } }),
      prisma.user.findFirst({ where: { email: ownerEmail } }),
    ]);

    if (existingSlug) throw new Error(`SLUG_TAKEN: Slug "${tenantSlug}" đã được sử dụng.`);
    if (existingSubdomain) throw new Error(`SUBDOMAIN_TAKEN: Subdomain "${subdomain}" đã được sử dụng.`);
    if (existingOwner) throw new Error(`EMAIL_TAKEN: Email "${ownerEmail}" đã có tài khoản.`);

    const template = await prisma.template.findFirst({ where: { id: templateId, isActive: true } });
    if (!template) throw new Error(`TEMPLATE_NOT_FOUND: Template "${templateId}" không tồn tại.`);

    const passwordHash = await hash(ownerPassword, 12);

    // Run full provisioning in a single Prisma transaction
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: tenantName,
          slug: tenantSlug,
          templateId,
          status: 'ACTIVE',
          activatedAt: new Date(),
        },
      });

      // 2. Create Owner User
      const owner = await tx.user.create({
        data: {
          email: ownerEmail,
          passwordHash,
          fullName: ownerFullName,
          role: 'TENANT_OWNER',
          tenantId: tenant.id,
          isActive: true,
          status: 'ACTIVE',
          emailVerified: new Date(),
        },
      });

      // 3. Create Default Theme from Template config (or defaults)
      const templateConfig = await tx.templateConfig.findUnique({ where: { templateId } });
      const tc = templateConfig?.themeConfig as any;
      await tx.tenantThemeSettings.create({
        data: {
          tenantId: tenant.id,
          primaryColor: tc?.primaryColor ?? '#2563EB',
          secondaryColor: tc?.secondaryColor ?? '#64748B',
          accentColor: tc?.accentColor ?? '#F59E0B',
          backgroundColor: tc?.backgroundColor ?? '#FFFFFF',
          surfaceColor: tc?.surfaceColor ?? '#F8FAFC',
          textColor: tc?.textColor ?? '#0F172A',
          textMutedColor: tc?.textMutedColor ?? '#64748B',
          borderColor: tc?.borderColor ?? '#E2E8F0',
          fontHeading: tc?.fontHeading ?? 'Plus Jakarta Sans',
          fontBody: tc?.fontBody ?? 'Inter',
          fontSizeBase: tc?.fontSizeBase ?? '16px',
          lineHeight: tc?.lineHeight ?? '1.6',
          containerWidth: tc?.containerWidth ?? '1280px',
          borderRadius: tc?.borderRadius ?? '8px',
          shadowStyle: tc?.shadowStyle ?? 'soft',
          darkMode: tc?.darkMode ?? false,
          buttonStyle: tc?.buttonStyle ?? 'rounded',
          animationsEnabled: tc?.animationsEnabled ?? true,
        },
      });

      // 4. Create Domain Settings
      await tx.tenantDomainSettings.create({
        data: {
          tenantId: tenant.id,
          subdomain,
          plan,
          dnsVerified: true,
          sslStatus: 'PENDING',
        },
      });

      // 5. Create default Company Info (blank placeholders)
      await tx.companyInfo.create({
        data: {
          tenantId: tenant.id,
          name: tenantName,
        },
      });

      // 6. Create default SEO Config
      await tx.seoConfig.create({
        data: {
          tenantId: tenant.id,
          metaTitle: `${tenantName} - Bất động sản uy tín`,
          metaDescription: `${tenantName} chuyên cung cấp các giải pháp bất động sản chất lượng cao.`,
          enableSitemap: true,
        },
      });

      // 7. Create default Pages + Sections
      for (const pageDef of DEFAULT_PAGES) {
        const page = await tx.tenantPage.create({
          data: {
            tenantId: tenant.id,
            slug: pageDef.slug,
            title: pageDef.title,
            isSystem: pageDef.isSystem,
            sortOrder: pageDef.sortOrder,
            published: true,
          },
        });

        const sectionDefs = DEFAULT_SECTIONS[pageDef.slug] ?? [];
        for (const sec of sectionDefs) {
          await tx.tenantSection.create({
            data: {
              tenantId: tenant.id,
              pageId: page.id,
              sectionKey: sec.sectionKey,
              label: sec.label,
              sortOrder: sec.sortOrder,
              content: sec.content,
              settings: sec.settings,
              isVisible: true,
            },
          });
        }
      }

      // 8. Create default Menus
      for (const menuDef of DEFAULT_MENUS) {
        const menu = await tx.menu.create({
          data: {
            tenantId: tenant.id,
            name: menuDef.name,
            location: menuDef.location,
            isActive: true,
          },
        });

        for (const item of menuDef.items) {
          await tx.menuItem.create({
            data: {
              menuId: menu.id,
              label: item.label,
              url: item.url,
              sortOrder: item.sortOrder,
              isActive: true,
            },
          });
        }
      }

      // 9. Create root Media Folder
      await tx.mediaFolder.create({
        data: {
          tenantId: tenant.id,
          name: 'Thư viện ảnh',
          slug: 'root',
          sortOrder: 0,
        },
      });

      // 10. Activate Trial (NOT subscription — subscription is created after payment)
      const now = new Date();
      const trialEndAt = new Date(now.getTime() + BUSINESS_CONFIG.TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);
      await tx.tenant.update({
        where: { id: tenant.id },
        data: {
          trialStartAt: now,
          trialEndAt,
          trialSaveLimit: BUSINESS_CONFIG.TRIAL_SAVE_LIMIT,
          trialSaveCount: 0,
          trialStatus: BUSINESS_CONFIG.TRIAL_STATUS.ACTIVE,
          onboardingCompletedAt: new Date(),
        },
      });

      // 11. Create TenantMembership for owner
      await tx.tenantMembership.create({
        data: {
          userId: owner.id,
          tenantId: tenant.id,
          role: 'OWNER',
          status: 'ACTIVE',
          inviteStatus: 'ACTIVE',
        },
      });

      return { tenant, owner };
    });

    const platformDomain = process.env.PLATFORM_DOMAIN || 'platformbds.vn';

    return {
      tenantId: result.tenant.id,
      tenantSlug: result.tenant.slug,
      ownerId: result.owner.id,
      cmsUrl: `https://${subdomain}.${platformDomain}/cms`,
      subdomain,
      websiteUrl: `https://${subdomain}.${platformDomain}`,
    };
  }
}

export const onboardingService = new OnboardingService();
