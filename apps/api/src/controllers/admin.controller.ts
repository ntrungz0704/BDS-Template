import { Request, Response, NextFunction } from 'express';
import { prisma, TemplateRegistry } from '@repo/database';
import { TEMPLATE_CONFIGS } from '@repo/utils';
import { logger } from '../index';
import bcrypt from 'bcrypt';
import { sendWelcomeEmail } from '../utils/mailer';

export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
  try {
    const totalTenants = await prisma.tenant.count({ where: { deletedAt: null } });
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

    if (order.status !== 'WAITING_CONFIRM' && order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_WAITING',
          message: 'Đơn hàng này không còn ở trạng thái chờ xác nhận thanh toán hoặc chưa đặt hàng.',
        },
      });
    }

    // 2. Nếu là thuê (RENT), kiểm tra xem Subdomain đã bị ai đăng ký trước đó chưa và validate định dạng
    if (order.type === 'RENT' && order.subdomain) {
      const subdomain = order.subdomain.toLowerCase().trim();

      // Chặn slug hệ thống
      const reservedSlugs = ['www', 'admin', 'cms', 'api', 'app', 'marketplace', 'mail', 'static', 'assets', 'support'];
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

    // 3. THỰC HIỆN KÍCH HOẠT DỊCH VỤ TRONG TRANSACTION BÊ TÔNG
    const crypto = await import('crypto');
    const tempPassword = crypto.randomBytes(12).toString('hex'); // 24-char hex password
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const result = await prisma.$transaction(async (tx: any) => {
      // Cập nhật trạng thái đơn hàng thành COMPLETED
      const completedOrder = await tx.order.update({
        where: { id, version: order.version },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          version: { increment: 1 },
        },
      });

      let tenantId: string | null = null;
      let isNewUser = false;

      if (order.type === 'RENT' && order.subdomain) {
        // Tạo Tenant
        const tenant = await tx.tenant.create({
          data: {
            name: order.fullName + ' Office',
            slug: order.subdomain.toLowerCase(),
            templateId: order.templateId,
            status: 'ACTIVE',
            version: 10, // Default to version 1.0 (10)
            activatedAt: new Date(),
          },
        });

        tenantId = tenant.id;

        // ✅ SỬA LỖI: Tìm user đã đăng ký trước đó theo email
        // Không tạo User mới — chỉ UPDATE role và tenantId của user cũ
        const existingUser = await tx.user.findUnique({
          where: { email: order.email },
        });

        isNewUser = !existingUser;

        let tenantOwner;
        if (existingUser) {
          // User đã có tài khoản -> Cập nhật lên TENANT_OWNER và gắn vào Tenant
          tenantOwner = await tx.user.update({
            where: { email: order.email },
            data: {
              role: 'TENANT_OWNER',
              tenantId: tenant.id,
              isActive: true,
              emailVerified: existingUser.emailVerified || new Date(),
            },
          });
        } else {
          // Edge case: User chưa đăng ký (mua qua kênh khác) -> Tạo mới với temp password
          tenantOwner = await tx.user.create({
            data: {
              email: order.email,
              passwordHash,
              fullName: order.fullName,
              role: 'TENANT_OWNER',
              isActive: true,
              tenantId: tenant.id,
              emailVerified: new Date(),
            },
          });
        }

        // Tạo TenantMembership liên kết User và Tenant mới
        await tx.tenantMembership.create({
          data: {
            userId: tenantOwner.id,
            tenantId: tenant.id,
            role: 'OWNER',
            status: 'ACTIVE',
          },
        });

        // Đọc cấu hình mặc định từ TEMPLATE_CONFIGS dùng chung của 16 templates
        const templateId = order.templateId || 'luxury-gold';
        const templateConfig = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS['luxury-gold'];
        const registryTemplate = TemplateRegistry.get(templateId) || TemplateRegistry.get('luxury-gold');

        // Tạo CompanyInfo từ dữ liệu mẫu của template tương ứng
        await tx.companyInfo.create({
          data: {
            tenantId: tenant.id,
            name: templateConfig.projectName || tenant.name,
            email: order.email,
            phone: order.phone,
            slogan: templateConfig.tagline || '',
            description: templateConfig.heroSubtitle || '',
            address: templateConfig.location?.highlights?.[0] || '68 Nguyễn Huệ, Quận 1, TP. HCM',
            workingHours: '8h00 - 20h00',
            aboutContent: templateConfig.location?.desc || '',
          },
        });

        // Tạo các Projects mẫu đi kèm từ demoProjects hoặc fallback về floorPlans của template đó
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

        // Tạo các Tin tức/Bài viết mẫu tương thích với template để tránh bị trống phần Blog
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

        // Tạo Theme Settings từ mẫu mặc định
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

        // Tạo default Pages & default Sections
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

        // Tạo Menu mặc định cho Website Tenant
        const menu = await tx.menu.create({
          data: {
            tenantId: tenant.id,
            name: 'Menu Chính',
            location: 'header',
            isActive: true,
          },
        });

        await tx.menuItem.create({
          data: {
            menuId: menu.id,
            label: 'Trang chủ',
            url: '/',
            sortOrder: 1,
          },
        });

        // Tạo default Media Folder
        await tx.mediaFolder.create({
          data: {
            tenantId: tenant.id,
            name: 'Hình ảnh dự án',
            slug: 'root',
            sortOrder: 0
          }
        });

        // Tạo default SEO & Google Analytics
        await tx.seoConfig.create({
          data: {
            tenantId: tenant.id,
            metaTitle: tenant.name,
            metaDescription: `${tenant.name} - Hệ thống website bất động sản chuyên nghiệp.`,
            enableSitemap: true,
            googleAnalyticsId: 'G-XXXXXXXXXX', // Default analytics initialized
          }
        });

        // Tạo Subdomain Settings
        await tx.tenantDomainSettings.create({
          data: {
            tenantId: tenant.id,
            subdomain: order.subdomain.toLowerCase(),
            platformDomain: process.env.PLATFORM_DOMAIN || 'platformbds.vn',
            customDomain: null,
            dnsVerified: true, // Auto-verified for platform subdomain
            sslStatus: 'ACTIVE' // Auto-active for platform subdomain
          }
        });

        // Thời hạn subscription dựa trên plan được chọn
        const PLAN_DURATION_DAYS: Record<string, number> = {
          BASIC: 30,
          STARTER: 30,
          PRO: 30,
          PROFESSIONAL: 365,
          BUSINESS: 365,
          ENTERPRISE: 365,
        };
        const durationDays = PLAN_DURATION_DAYS[order.plan || 'STARTER'] ?? 30;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + durationDays);

        await tx.subscription.create({
          data: {
            tenantId: tenant.id,
            orderId: order.id,
            plan: order.plan || 'STARTER',
            status: 'ACTIVE',
            amount: order.amount,
            startDate,
            endDate,
          },
        });

        // Ghi nhận tenantId ngược lại vào Order để tham chiếu lịch sử
        await tx.order.update({
          where: { id },
          data: { tenantId: tenant.id },
        });
      }

      return { completedOrder, tenantId, isNewUser };
    });

    // Gửi email chào mừng ngoài block transaction để tránh rollback làm mất tính nhất quán email
    if (result.tenantId) {
      await sendWelcomeEmail(order.email, order.fullName, order.subdomain as string, tempPassword);
    }

    logger.info(`Duyệt thành công đơn hàng: ${order.orderNumber}. Kích hoạt Tenant ID: ${result.tenantId || 'N/A'}`);

    res.status(200).json({
      success: true,
      data: {
        ...result.completedOrder,
        credentials: {
          email: order.email,
          password: tempPassword,
          subdomain: order.subdomain,
          isNewUser: result.isNewUser
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

    const crypto = await import('crypto');
    const tempPassword = crypto.randomBytes(12).toString('hex');
    const bcrypt = await import('bcrypt');
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: fullName + ' Office',
          slug: subdomain.toLowerCase(),
          templateId: templateId || 'luxury-gold',
          status: 'ACTIVE',
          version: 10, // Default version 1.0 (10)
          activatedAt: new Date(),
        },
      });

      // 2. User Account (Update or Create)
      const existingUser = await tx.user.findUnique({
        where: { email },
      });

      let isNewUser = false;
      let tenantOwner;

      if (existingUser) {
        tenantOwner = await tx.user.update({
          where: { email },
          data: {
            role: 'TENANT_OWNER',
            tenantId: tenant.id,
            isActive: true,
          },
        });
      } else {
        isNewUser = true;
        tenantOwner = await tx.user.create({
          data: {
            email,
            passwordHash,
            fullName,
            role: 'TENANT_OWNER',
            isActive: true,
            tenantId: tenant.id,
            emailVerified: new Date(),
          },
        });
      }

      // 3. Company Info Setup
      const activeTemplateId = templateId || 'luxury-gold';
      const templateConfig = TEMPLATE_CONFIGS[activeTemplateId] || TEMPLATE_CONFIGS['luxury-gold'];
      const registryTemplate = TemplateRegistry.get(activeTemplateId) || TemplateRegistry.get('luxury-gold');

      await tx.companyInfo.create({
        data: {
          tenantId: tenant.id,
          name: templateConfig.projectName || tenant.name,
          email,
          phone,
          slogan: templateConfig.tagline || '',
          description: templateConfig.heroSubtitle || '',
          address: templateConfig.location?.highlights?.[0] || '68 Nguyễn Huệ, Quận 1, TP. HCM',
          workingHours: '8h00 - 20h00',
          aboutContent: templateConfig.location?.desc || '',
        },
      });

      // 4. Default Theme Settings
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

      // 5. Default Pages & Sections
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

      // 6. Menu Setup
      await tx.menu.create({
        data: {
          tenantId: tenant.id,
          name: 'Menu Chính',
          location: 'header',
          isActive: true,
        },
      });

      // 7. SEO Setup
      await tx.seoConfig.create({
        data: {
          tenantId: tenant.id,
          metaTitle: tenant.name,
          metaDescription: `${tenant.name} - Hệ thống website bất động sản chuyên nghiệp.`,
          enableSitemap: true,
          googleAnalyticsId: 'G-XXXXXXXXXX',
        }
      });

      // 8. Domain Settings Setup
      await tx.tenantDomainSettings.create({
        data: {
          tenantId: tenant.id,
          subdomain: subdomain.toLowerCase(),
          platformDomain: process.env.PLATFORM_DOMAIN || 'platformbds.vn',
          customDomain: null,
          dnsVerified: true,
          sslStatus: 'ACTIVE'
        }
      });

      // 9. Subscription Setup
      const PLAN_DURATION_DAYS: Record<string, number> = {
        BASIC: 30,
        STARTER: 30,
        PRO: 30,
        PROFESSIONAL: 365,
        BUSINESS: 365,
        ENTERPRISE: 365,
      };
      const durationDays = PLAN_DURATION_DAYS[plan || 'STARTER'] ?? 30;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + durationDays);

      await tx.subscription.create({
        data: {
          tenantId: tenant.id,
          plan: plan || 'STARTER',
          status: 'ACTIVE',
          amount: plan === 'PROFESSIONAL' || plan === 'BUSINESS' || plan === 'ENTERPRISE' ? 12000000 : 499000,
          startDate,
          endDate,
        },
      });

      // 10. Projects Setup Fallback
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
              slug: `${activeTemplateId}-project-${k}`,
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
      }

      return { tenant, isNewUser };
    });

    // Send Welcome Email
    await sendWelcomeEmail(email, fullName, subdomain, tempPassword);

    res.status(201).json({
      success: true,
      data: {
        tenant: result.tenant,
        credentials: {
          email,
          password: tempPassword,
          subdomain,
          isNewUser: result.isNewUser
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

export async function updateTenantStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { status } = req.body; // ACTIVE, SUSPENDED

  try {
    const updated = await prisma.tenant.update({
      where: { id },
      data: { status }
    });

    logger.info(`Admin đã cập nhật trạng thái Tenant ${updated.name} (Slug: ${updated.slug}) thành: ${status}`);

    res.status(200).json({
      success: true,
      data: updated
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
          select: { name: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { status, isActive } = req.body; // status: ACTIVE/BANNED, isActive: true/false

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: { 
        ...(status && { status }),
        ...(isActive !== undefined && { isActive })
      }
    });

    logger.info(`Admin đã cập nhật trạng thái người dùng ${updated.email} thành: status=${status}, isActive=${isActive}`);

    res.status(200).json({
      success: true,
      data: {
        id: updated.id,
        email: updated.email,
        status: updated.status,
        isActive: updated.isActive
      }
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
