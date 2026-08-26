import { prisma, TemplateRegistry } from '@repo/database';
import { TEMPLATE_CONFIGS } from '@repo/utils';
import { BUSINESS_CONFIG } from '@repo/config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface ProvisionWebsiteInput {
  templateId: string;
  templateVersionId?: string;
  customerId?: string;
  customerEmail: string;
  customerFullName: string;
  customerPhone: string;
  websiteName: string;
  slug: string;
  plan?: string;
}

export class WebsiteProvisioningService {
  async createWebsiteFromTemplate(input: ProvisionWebsiteInput) {
    const {
      templateId,
      templateVersionId,
      customerId,
      customerEmail,
      customerFullName,
      customerPhone,
      websiteName,
      slug,
      plan = 'STARTER',
    } = input;

    // Resolve template version
    let resolvedVersionId = templateVersionId;
    if (!resolvedVersionId) {
      const latestVersion = await prisma.templateVersion.findFirst({
        where: { templateId, status: 'PUBLISHED' },
        orderBy: { version: 'desc' },
      });
      if (latestVersion) {
        resolvedVersionId = latestVersion.id;
      }
    }

    const tempPassword = crypto.randomBytes(12).toString('hex');
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const result = await prisma.$transaction(async (tx: any) => {
      // a. Create Tenant
      const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      const tenant = await tx.tenant.create({
        data: {
          name: websiteName,
          slug,
          templateId,
          templateVersionId: resolvedVersionId,
          status: 'ACTIVE',
          version: 10,
          activatedAt: new Date(),
          trialStatus: 'ACTIVE',
          trialStartAt: new Date(),
          trialEndAt: oneYearLater,
          trialSaveLimit: 999999,
          trialSaveCount: 0,
        },
      });

      // Create Active Subscription
      await tx.subscription.create({
        data: {
          tenantId: tenant.id,
          plan: plan || 'PRO',
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: oneYearLater,
          autoRenew: true,
        },
      });

      // b. Create/Update User as TENANT_OWNER
      let user;
      if (customerId) {
        user = await tx.user.update({
          where: { id: customerId },
          data: {
            role: 'TENANT_OWNER',
            tenantId: tenant.id,
            isActive: true,
          },
        });
      } else {
        const existingUser = await tx.user.findUnique({
          where: { email: customerEmail },
        });

        if (existingUser) {
          user = await tx.user.update({
            where: { email: customerEmail },
            data: {
              role: 'TENANT_OWNER',
              tenantId: tenant.id,
              isActive: true,
              emailVerified: existingUser.emailVerified || new Date(),
            },
          });
        } else {
          user = await tx.user.create({
            data: {
              email: customerEmail,
              passwordHash,
              fullName: customerFullName,
              role: 'TENANT_OWNER',
              isActive: true,
              tenantId: tenant.id,
              emailVerified: new Date(),
            },
          });
        }
      }

      // c. Create TenantMembership
      await tx.tenantMembership.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          role: 'OWNER',
          status: 'ACTIVE',
        },
      });

      // Template configs
      const templateConfig = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS['luxury-gold'] || {};
      const registryTemplate = TemplateRegistry.get(templateId) || TemplateRegistry.get('luxury-gold');

      // d. Clone ThemeSettings
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

      await tx.tenantThemeSettings.create({
        data: {
          tenantId: tenant.id,
          primaryColor: defaultTheme.primaryColor,
          secondaryColor: defaultTheme.secondaryColor,
          accentColor: defaultTheme.accentColor,
          backgroundColor: defaultTheme.backgroundColor,
          textColor: defaultTheme.textColor || '#F3F4F6',
          fontHeading: defaultTheme.fontHeading,
          fontBody: defaultTheme.fontBody,
          borderRadius: defaultTheme.borderRadius || '0px',
          shadowStyle: defaultTheme.shadow === 'lg' ? 'hard' : 'soft',
          darkMode: false,
          buttonStyle: 'rounded',
          animationsEnabled: true,
        },
      });

      // e. Clone CompanyInfo defaults
      await tx.companyInfo.create({
        data: {
          tenantId: tenant.id,
          name: websiteName,
          email: customerEmail,
          phone: customerPhone,
          slogan: templateConfig.tagline || '',
          description: templateConfig.heroSubtitle || '',
          address: templateConfig.location?.highlights?.[0] || '68 Nguyễn Huệ, Quận 1, TP. HCM',
          workingHours: '8h00 - 20h00',
          aboutContent: templateConfig.location?.desc || '',
        },
      });

      // f. Clone TenantPages + TenantSections
      const defaultPages = registryTemplate?.defaultConfig?.layoutConfig?.pages || [
        {
          slug: 'home',
          name: 'Trang chủ',
          sections: [
            { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'Chào mừng quý khách', subtitle: 'Tìm kiếm không gian sống đẳng cấp.' } }
          ]
        }
      ];

      for (let i = 0; i < defaultPages.length; i++) {
        const pageData = defaultPages[i];
        const page = await tx.tenantPage.create({
          data: {
            tenantId: tenant.id,
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
                tenantId: tenant.id,
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

      // g. Clone Default Projects
      const demoProjs = templateConfig.demoProjects || [];
      if (demoProjs.length > 0) {
        for (let k = 0; k < demoProjs.length; k++) {
          const dp = demoProjs[k];
          const typeStr = (dp.type || '').toLowerCase();
          const projType = typeStr.includes('villa') || typeStr.includes('biệt') || typeStr.includes('mansion') ? 'VILLA' : 'APARTMENT';
          
          await tx.project.create({
            data: {
              tenantId: tenant.id,
              title: dp.name || dp.title,
              slug: `${templateId}-project-${k}`,
              description: dp.desc || dp.description || dp.specs || '',
              shortDescription: dp.specs || dp.type || '',
              type: projType,
              status: 'SELLING',
              price: dp.price || dp.priceStr || 'Liên hệ',
              priceFrom: dp.priceVal || dp.priceNum || 0,
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
              tenantId: tenant.id,
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

      // h. Clone Default Posts
      const samplePosts = [
        {
          title: "Xu Hướng Bất Động Sản Siêu Sang Năm 2026: Định Nghĩa Mới Về Đẳng Cấp",
          slug: `${templateId}-post-1`,
          summary: "Phân tích các tiêu chuẩn mới của bất động sản hàng hiệu (Branded Residences) và dinh thự đảo compound khép kín tại các đô thị lớn.",
          content: "<p>Thị trường bất động sản hạng sang và siêu sang tại Việt Nam đang ghi nhận những bước chuyển mình mạnh mẽ trong năm 2026. Khách hàng thuộc giới tinh hoa giờ đây không chỉ tìm kiếm một ngôi nhà có diện tích lớn, mà họ đòi hỏi những tiêu chuẩn sống khắt khe về sự riêng tư, công nghệ bảo mật và dịch vụ đặc quyền cá nhân hóa.</p>",
          thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        },
        {
          title: "Nghệ Thuật Thiết Kế Nội Thất Tân Cổ Điển Cho Căn Hộ Duplex Hoàng Gia",
          slug: `${templateId}-post-2`,
          summary: "Làm thế nào để phối hợp hài hòa giữa chất liệu đá Marble tự nhiên, kim loại dát vàng và ánh sáng pha lê phong cách châu Âu.",
          content: "<p>Thiết kế nội thất phong cách tân cổ điển (Neoclassical) luôn là sự lựa chọn hàng đầu cho các không gian sống thông tầng rộng lớn như Duplex hay Penthouse. Phong cách này mang đến vẻ đẹp kiêu sa, quyền quý nhưng không quá nặng nề như phong cách cổ điển thuần túy.</p>",
          thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
        }
      ];

      for (let k = 0; k < samplePosts.length; k++) {
        const sp = samplePosts[k];
        await tx.post.create({
          data: {
            tenantId: tenant.id,
            title: sp.title,
            slug: sp.slug,
            summary: sp.summary,
            content: sp.content,
            thumbnail: sp.thumbnail,
            published: true,
            publishedAt: new Date(),
          }
        });
      }

      // i. Create default Menu & MenuItems
      const menu = await tx.menu.create({
        data: {
          tenantId: tenant.id,
          name: 'Menu Chính',
          location: 'header',
          isActive: true,
        },
      });

      const menuItems = [
        { label: 'Trang chủ', url: '/' },
        { label: 'Dự Án', url: '/projects' },
        { label: 'Thiết Kế', url: '/design' },
        { label: 'Tiện Ích', url: '/utilities' },
        { label: 'Thư Viện', url: '/gallery' },
        { label: 'Tin Tức', url: '/news' },
        { label: 'Giới Thiệu', url: '/about' },
        { label: 'Liên Hệ', url: '/contact' }
      ];

      for (let i = 0; i < menuItems.length; i++) {
        await tx.menuItem.create({
          data: {
            menuId: menu.id,
            label: menuItems[i].label,
            url: menuItems[i].url,
            sortOrder: i + 1,
          }
        });
      }

      // j. Create MediaFolder root
      await tx.mediaFolder.create({
        data: {
          tenantId: tenant.id,
          name: 'Hình ảnh dự án',
          slug: 'root',
          sortOrder: 0
        }
      });

      // k. Create SeoConfig defaults
      await tx.seoConfig.create({
        data: {
          tenantId: tenant.id,
          metaTitle: tenant.name,
          metaDescription: `${tenant.name} - Hệ thống website bất động sản chuyên nghiệp.`,
          enableSitemap: true,
          googleAnalyticsId: 'G-XXXXXXXXXX',
        }
      });

      // l. Create TenantDomainSettings
      await tx.tenantDomainSettings.create({
        data: {
          tenantId: tenant.id,
          subdomain: slug.toLowerCase(),
          platformDomain: process.env.PLATFORM_DOMAIN || 'platformbds.vn',
          customDomain: null,
          dnsVerified: true,
          sslStatus: 'ACTIVE'
        }
      });

      // m. Create Subscription/Trial based on plan
      const PLAN_DURATION_DAYS: Record<string, number> = {
        BASIC: 30,
        STARTER: 30,
        PRO: 30,
        PROFESSIONAL: 365,
        BUSINESS: 365,
        ENTERPRISE: 365,
      };
      const durationDays = PLAN_DURATION_DAYS[plan] ?? 30;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + durationDays);

      await tx.subscription.create({
        data: {
          tenantId: tenant.id,
          plan: plan,
          status: 'ACTIVE',
          amount: 0,
          startDate,
          endDate,
        },
      });

      return { tenant, user };
    });

    return {
      tenant: result.tenant,
      user: result.user,
      credentials: { tempPassword },
    };
  }
}

export const websiteProvisioningService = new WebsiteProvisioningService();
