import { prisma, TemplateRegistry } from '@repo/database';
import { TEMPLATE_CONFIGS } from '@repo/utils';
import { BUSINESS_CONFIG } from '@repo/config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { vercelDomainService } from './vercel-domain.service';
import { resolveTemplateAlias } from '../utils/template-aliases';
import { logger } from '../index';

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
  /** Amount paid for the order; persisted for subscription billing/audit. */
  amount?: number;
  /** Set only by the approved order workflow. Used for traceability. */
  orderId?: string;
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
      amount = 0,
    } = input;

    const normalizedTemplateId = templateId.replace(/^template-/, '').toLowerCase();
    const resolvedTemplateSlug = resolveTemplateAlias(templateId);

    // 1. Flexible lookup for template by id, current portal slug, or legacy slug
    let template = await prisma.template.findFirst({
      where: {
        OR: [
          { id: templateId },
          { slug: templateId },
          { slug: normalizedTemplateId },
          { slug: resolvedTemplateSlug },
          { id: `template-${normalizedTemplateId}` },
          { id: `template-${resolvedTemplateSlug}` },
        ]
      },
      select: { id: true, slug: true, isActive: true },
    });

    if (!template) {
      throw new Error(`Không tìm thấy template khả dụng cho mã "${templateId}".`);
    }

    const actualTemplateId = template.id;
    const templateSlug = template.slug;

    // Resolve template config with complete alias mappings
    const aliasMap: Record<string, string> = {
      'eco-living': 'eco-green',
      'eco-green': 'eco-green',
      'template-eco-living': 'eco-green',
      'template-eco-green': 'eco-green',
      'luxury-villa': 'villa-premium',
      'premium-villa': 'villa-premium',
      'villa-premium': 'villa-premium',
      'template-luxury-villa': 'villa-premium',
      'modern-corporate': 'modern-corporate',
      'corporate-tower': 'modern-corporate',
      'template-modern-corporate': 'modern-corporate',
      'urban-city': 'urban-city',
      'smart-urban': 'urban-city',
      'template-urban-city': 'urban-city',
      'industrial-estate': 'industrial-estate',
      'industrial-park': 'industrial-estate',
      'template-industrial-estate': 'industrial-estate',
      'investment-pro': 'investment-pro',
      'invest-pro': 'investment-pro',
      'template-investment-pro': 'investment-pro',
      'classic-heritage': 'classic-heritage',
      'classic-elegant': 'classic-heritage',
      'template-classic-heritage': 'classic-heritage',
      'agency-onepage': 'landing-high-convert',
      'landing-high-convert': 'landing-high-convert',
      'template-agency-onepage': 'landing-high-convert',
      'retail-commercial': 'retail-shophouse',
      'retail-shophouse': 'retail-shophouse',
      'template-retail-commercial': 'retail-shophouse',
      'listing-portal': 'mega-portal',
      'mega-portal': 'mega-portal',
      'template-listing-portal': 'mega-portal',
      'personal-agent': 'personal-agent',
      'template-personal-agent': 'personal-agent',
      'auction-bds': 'auction-platform',
      'auction-platform': 'auction-platform',
      'template-auction-bds': 'auction-platform',
      'land-plot': 'land-plot',
      'template-land-plot': 'land-plot',
      'minimal-white': 'minimal-white',
      'template-minimal-white': 'minimal-white',
      'luxury-gold': 'luxury-gold',
      'template-luxury-gold': 'luxury-gold',
      'resort-paradise': 'resort-paradise',
      'template-resort-paradise': 'resort-paradise',
      'apple-minimal': 'apple-minimal',
      // BDS slugs → legacy config keys
      'bds-01': 'luxury-gold',
      'bds-02': 'minimal-white',
      'bds-03': 'modern-corporate',
      'bds-04': 'resort-paradise',
      'bds-05': 'urban-city',
      'bds-06': 'industrial-estate',
      'bds-07': 'villa-premium',
      'bds-08': 'eco-green',
      'bds-09': 'classic-heritage',
      'bds-10': 'investment-pro',
      'bds-11': 'landing-high-convert',
      'bds-12': 'mega-portal',
      'bds-13': 'auction-platform',
      'bds-14': 'land-plot',
      'bds-15': 'retail-shophouse',
      'bds-16': 'personal-agent',
      'bds-17': 'mega-portal',
      'bds-18': 'mega-portal',
      'bds-19': 'mega-portal',
      'bds-20': 'luxury-gold',
      'bds-21': 'mega-portal',
      'bds-22': 'resort-paradise',
      'bds-23': 'landing-high-convert',
      'bds-24': 'mega-portal',
      'lp-01': 'luxury-gold',
      'lp-02': 'villa-premium',
      'lp-03': 'land-plot',
      'lp-04': 'personal-agent',
      'lp-05': 'resort-paradise',
      'lp-06': 'urban-city',
      'lp-07': 'eco-green',
    };

    const resolvedConfigKey = aliasMap[templateSlug] || aliasMap[templateId] || templateSlug;
    const templateConfig = TEMPLATE_CONFIGS[resolvedConfigKey] || TEMPLATE_CONFIGS['luxury-gold'] || TEMPLATE_CONFIGS['minimal-white'] || ({} as any);
    const registryTemplate = TemplateRegistry.get(actualTemplateId) || TemplateRegistry.get(templateSlug) || TemplateRegistry.get(resolvedConfigKey);

    // Resolve template version
    let resolvedVersionId = templateVersionId;
    if (!resolvedVersionId) {
      const latestVersion = await prisma.templateVersion.findFirst({
        where: { templateId: actualTemplateId, status: 'PUBLISHED' },
        orderBy: { version: 'desc' },
      });
      if (latestVersion) {
        resolvedVersionId = latestVersion.id;
      }
    }

    // Cấp mật khẩu mặc định tự động từ phần trước @ của email khách hàng cho user mới
    const defaultPassword = customerEmail.split('@')[0] || '123456';
    const cmsPassword = defaultPassword;
    const newPasswordHash = await bcrypt.hash(cmsPassword, 12);

    const result = await prisma.$transaction(async (tx: any) => {
      // a. Create Tenant
      const isTrial = plan === 'TRIAL';
      const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const tenant = await tx.tenant.create({
        data: {
          name: websiteName,
          slug,
          templateId: actualTemplateId,
          templateVersionId: resolvedVersionId,
          status: 'ACTIVE',
          version: 10,
          activatedAt: new Date(),
          trialStatus: isTrial ? 'ACTIVE' : null,
          trialStartAt: isTrial ? new Date() : null,
          trialEndAt: isTrial ? sevenDaysLater : null,
          trialSaveLimit: isTrial ? 3 : 999999,
          trialSaveCount: 0,
        },
      });

      // b. Create/Update User
      let user;
      let isNewUser = false;
      if (customerId) {
        user = await tx.user.update({
          where: { id: customerId },
          data: {
            role: 'TENANT_OWNER',
            tenantId: tenant.id,
            isActive: true,
            status: 'ACTIVE',
            emailVerified: new Date(),
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
              status: 'ACTIVE',
              emailVerified: existingUser.emailVerified || new Date(),
            },
          });
        } else {
          isNewUser = true;
          user = await tx.user.create({
            data: {
              email: customerEmail,
              passwordHash: newPasswordHash,
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

      // d. Clone ThemeSettings
      const defaultTheme = registryTemplate?.defaultConfig?.themeConfig || {
        primaryColor: templateConfig?.theme?.primaryBg || '#0B132B',
        secondaryColor: templateConfig?.theme?.secondaryBg || '#1C2541',
        accentColor: templateConfig?.theme?.accentBtn || '#D4AF37',
        backgroundColor: templateConfig?.theme?.cardBg || '#FFFFFF',
        textColor: templateConfig?.theme?.primaryText || '#1A1A2E',
        fontHeading: 'Playfair Display, serif',
        fontBody: 'Plus Jakarta Sans, sans-serif',
        borderRadius: '8px',
        shadow: 'lg',
      };

      await tx.tenantThemeSettings.create({
        data: {
          tenantId: tenant.id,
          primaryColor: defaultTheme.primaryColor || '#0B132B',
          secondaryColor: defaultTheme.secondaryColor || '#1C2541',
          accentColor: defaultTheme.accentColor || '#D4AF37',
          backgroundColor: defaultTheme.backgroundColor || '#FFFFFF',
          surfaceColor: defaultTheme.surfaceColor || '#F8FAFC',
          textColor: defaultTheme.textColor || '#1A1A2E',
          textMutedColor: defaultTheme.textMutedColor || '#64748B',
          borderColor: defaultTheme.borderColor || '#E2E8F0',
          fontHeading: defaultTheme.fontHeading || 'Plus Jakarta Sans',
          fontBody: defaultTheme.fontBody || 'Inter',
          fontSizeBase: defaultTheme.fontSizeBase || '16px',
          lineHeight: defaultTheme.lineHeight || '1.6',
          containerWidth: defaultTheme.containerWidth || '1280px',
          borderRadius: defaultTheme.borderRadius || '8px',
          shadowStyle: defaultTheme.shadowStyle || 'soft',
          darkMode: defaultTheme.darkMode ?? false,
          buttonStyle: defaultTheme.buttonStyle || 'rounded',
          animationsEnabled: defaultTheme.animationsEnabled ?? true,
        },
      });

      // e. Clone CompanyInfo defaults
      await tx.companyInfo.create({
        data: {
          tenantId: tenant.id,
          name: websiteName,
          email: customerEmail,
          phone: customerPhone,
          slogan: templateConfig?.tagline || 'Bất Động Sản Cao Cấp & Đầu Tư Thông Minh',
          description: templateConfig?.heroSubtitle || 'Hệ thống website bất động sản phân phối dự án chuyên nghiệp.',
          address: templateConfig?.location?.highlights?.[0] || 'Tầng 15, Tòa nhà Landmark, TP. HCM',
          workingHours: '8h00 - 20h00',
          aboutContent: templateConfig?.location?.desc || 'Đơn vị phân phối và phát triển bất động sản uy tín hàng đầu.',
        },
      });

      // f. Clone TenantPages + TenantSections (Full 13 sections for rich real-estate websites)
      const homeSections = [
        {
          id: 'hero',
          name: 'Hero Banner (Tiêu Đề & Ảnh Lớn)',
          content: {
            badge: templateConfig?.tagline || 'BẤT ĐỘNG SẢN CAO CẤP',
            heading: templateConfig?.heroTitle || 'Không Gian Sống Thượng Lưu',
            headingAccent: 'Đỉnh Cao',
            subtitle: templateConfig?.heroSubtitle || 'Kiến trúc hiện đại, tiện ích chuẩn quốc tế, hòa mình cùng thiên nhiên xanh mát.',
            ctaText: 'Nhận Bảng Giá & Ưu Đãi',
            ctaUrl: '#contact',
            backgroundImage: templateConfig?.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
            quickStats: [
              { label: 'Quy mô', value: '45 Hecta' },
              { label: 'Mật độ xanh', value: '82%' },
              { label: 'Bàn giao', value: 'Quý 4/2026' }
            ]
          }
        },
        {
          id: 'stats',
          name: 'Thống Kê Nổi Bật (Chỉ Số)',
          content: {
            items: [
              { value: '50+', label: 'Dự Án Đã Bàn Giao', iconName: 'Building2' },
              { value: '10.000+', label: 'Cư Dân Hài Lòng', iconName: 'Users' },
              { value: '15+', label: 'Năm Kinh Nghiệm', iconName: 'Award' },
              { value: '100%', label: 'Pháp Lý Minh Bạch', iconName: 'ShieldCheck' }
            ]
          }
        },
        {
          id: 'overview',
          name: 'Loại Hình BĐS Phân Phối',
          content: {
            heading: 'Loại Hình Bất Động Sản',
            headingAccent: 'Phân Phối',
            description: 'Đa dạng loại hình sản phẩm từ căn hộ hạng sang, shophouse thương mại đến dinh thự ven sông biệt lập.',
            items: [
              { label: 'Biệt Thự Nghỉ Dưỡng', value: '24 Căn VIP', desc: 'Không gian riêng tư biệt lập, sân vườn và hồ bơi riêng' },
              { label: 'Căn Hộ Panorama', value: '150 Căn Hộ', desc: 'Tầm nhìn 360 độ view hồ sinh thái và sông tự nhiên' },
              { label: 'Shophouse Thương Mại', value: '35 Căn', desc: 'Mặt tiền đại lộ sầm uất, tiềm năng kinh doanh vượt trội' }
            ]
          }
        },
        {
          id: 'featured_projects',
          name: 'Dự Án Nổi Bật (VIP)',
          content: {
            heading: 'Dự Án Bất Động Sản',
            headingAccent: 'Tiêu Biểu',
            sectionLabel: 'BỘ SƯU TẬP ĐỘC BẢN',
            maxItems: 6
          }
        },
        {
          id: 'about',
          name: 'Giới Thiệu Doanh Nghiệp',
          content: {
            heading: 'Về Chúng Tôi',
            headingAccent: 'Kiến Tạo Giá Trị',
            description: templateConfig?.location?.desc || 'Đơn vị phát triển và phân phối bất động sản cao cấp hàng đầu Việt Nam.',
            quote: 'Đẳng cấp được định hình qua từng đường nét kiến trúc và chất lượng dịch vụ.',
            quoteAccent: 'Cam Kết Vững Bền'
          }
        },
        {
          id: 'amenities',
          name: 'Tiện Ích Đặc Quyền',
          content: {
            heading: 'Hệ Tiện Ích',
            headingAccent: 'Đặc Quyền 5 Sao',
            sectionLabel: 'CHUẨN MỰC THƯỢNG LƯU',
            items: [
              { icon: 'Waves', title: 'Hồ Bơi Vô Cực', desc: 'Hồ bơi tràn viền tầm nhìn chân mây tuyệt đẹp' },
              { icon: 'Trees', title: 'Công Viên Xanh', desc: 'Hệ sinh thái cây xanh nhiều tầng lọc không khí' },
              { icon: 'Shield', title: 'An Ninh Đa Lớp 24/7', desc: 'Hệ thống camera AI và đội ngũ bảo vệ chuyên nghiệp' },
              { icon: 'Sparkles', title: 'Clubhouse Đẳng Cấp', desc: 'Phòng gym chuẩn quốc tế, spa & sauna thư giãn' }
            ]
          }
        },
        {
          id: 'floor_plans',
          name: 'Mặt Bằng Chi Tiết & Phân Khu',
          content: {
            heading: 'Mặt Bằng Thiết Kế',
            headingAccent: 'Tối Ưu Công Năng',
            sectionLabel: 'KIẾN TRÚC HIỆN ĐẠI',
            items: templateConfig?.floorPlans || [
              { id: 'type-a', label: 'Villa Đơn Lập 350m²', desc: 'Bố cục 4 phòng ngủ master, sân vườn và gara ô tô', bedrooms: 4, bathrooms: 4, price: 'Liên hệ', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
              { id: 'type-b', label: 'Villa Song Lập 220m²', desc: 'Bố cục 3 phòng ngủ tiện nghi, ban công view hồ', bedrooms: 3, bathrooms: 3, price: 'Liên hệ', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }
            ]
          }
        },
        {
          id: 'policies',
          name: 'Chính Sách & Tiến Độ Thanh Toán',
          content: {
            heading: 'Chính Sách Bán Hàng',
            headingAccent: 'Ưu Đãi Đặc Biệt',
            sectionLabel: 'TIẾN ĐỘ & PHÁP LÝ',
            items: [
              { title: 'Chiết Khấu Thanh Toán Sớm', desc: 'Chiết khấu ngay 8.5% khi thanh toán sớm 95% giá trị hợp đồng.', tag: 'Ưu Đãi 8.5%' },
              { title: 'Hỗ Trợ Lãi Suất 0%', desc: 'Ngân hàng hỗ trợ vay 70%, ân hạn nợ gốc và 0% lãi suất trong 24 tháng.', tag: 'Hỗ Trợ 0% Lãi' },
              { title: 'Tặng Gói Nội Thất Cao Cấp', desc: 'Tặng gói hoàn thiện nội thất trị giá 200 triệu đồng cho 10 khách hàng đầu tiên.', tag: 'Quà Tặng 200Tr' }
            ]
          }
        },
        {
          id: 'gallery',
          name: 'Thư Viện Hình Ảnh Thực Tế',
          content: {
            heading: 'Thư Viện Ảnh',
            headingAccent: 'Thực Tế',
            sectionLabel: 'KHÔNG GIAN HOÀN HẢO',
            items: (templateConfig?.gallery || [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800'
            ]).map((url: string, idx: number) => ({ url, category: idx % 2 === 0 ? 'Ngoại Thất' : 'Nội Thất', title: `Không gian hoàn mỹ ${idx + 1}` }))
          }
        },
        {
          id: 'testimonials',
          name: 'Cảm Nhận Khách Hàng & Cư Dân',
          content: {
            heading: 'Cảm Nhận Khách Hàng',
            headingAccent: 'Đã Đồng Hành',
            sectionLabel: 'UY TÍN HÀNG ĐẦU',
            items: [
              { name: 'Nguyễn Thành Nam', title: 'Doanh Nhân / Nhà Đầu Tư', text: 'Tôi rất ấn tượng với sự chuyên nghiệp, tính minh bạch pháp lý và chất lượng bàn giao vượt xa mong đợi.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', rating: 5 },
              { name: 'Trần Thu Trang', title: 'Chủ Nhân Căn Hộ Penthouse', text: 'Không gian sống xanh mát, dịch vụ quản lý tòa nhà cực kỳ chu đáo, con cái tôi rất thích công viên vui chơi.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', rating: 5 }
            ]
          }
        },
        {
          id: 'faq',
          name: 'Câu Hỏi Thường Gặp (FAQ)',
          content: {
            heading: 'Câu Hỏi Thường Gặp',
            headingAccent: 'FAQ',
            sectionLabel: 'GIẢI ĐÁP THẮC MẮC',
            items: [
              { q: 'Dự án có sổ hồng sở hữu lâu dài không?', a: 'Toàn bộ các sản phẩm đều có pháp lý hoàn chỉnh, sở hữu lâu dài đối với người Việt Nam và 50 năm đối với người nước ngoài.' },
              { q: 'Ngân hàng nào bảo lãnh và hỗ trợ cho vay?', a: 'Các ngân hàng Vietcombank, Techcombank, MB Bank cam kết bảo lãnh tiến độ và hỗ trợ vay đến 70% giá trị hợp đồng.' },
              { q: 'Quy trình đặt cọc và thanh toán như thế nào?', a: 'Khách hàng đặt cọc giữ chỗ 100 triệu, sau 7 ngày tiến hành ký HĐMB và thanh toán theo từng đợt tiến độ.' }
            ]
          }
        },
        {
          id: 'contact',
          name: 'Form Liên Hệ & Đăng Ký Tư Vấn',
          content: {
            heading: 'Đăng Ký Nhận Bảng Giá',
            headingAccent: 'Trực Tiếp',
            description: 'Để lại thông tin liên hệ để nhận trọn bộ tài liệu quy hoạch, bảng giá chi tiết và chính sách chiết khấu mới nhất.'
          }
        }
      ];

      const defaultPages = [
        {
          slug: 'home',
          name: 'Trang chủ & Banner',
          sections: homeSections
        },
        {
          slug: 'about',
          name: 'Giới thiệu Doanh nghiệp',
          sections: [
            { id: 'hero', name: 'Hero Banner', content: { title: 'Về Chúng Tôi', subtitle: 'Hành trình kiến tạo không gian sống đỉnh cao cho mọi gia đình.' } },
            { id: 'about', name: 'Câu Chuyện Doanh Nghiệp', content: { heading: 'Tầm Nhìn & Sứ Mệnh', description: 'Chúng tôi cam kết mang lại những giá trị bất động sản bền vững nhất.' } },
            { id: 'stats', name: 'Năng Lực Doanh Nghiệp', content: { items: [
              { value: '15+', label: 'Năm kinh nghiệm' },
              { value: '50+', label: 'Dự án đã triển khai' },
              { value: '10.000+', label: 'Khách hàng tin tưởng' }
            ] } }
          ]
        },
        {
          slug: 'projects',
          name: 'Dự án Bất động sản',
          sections: [
            { id: 'hero', name: 'Hero Dự Án', content: { title: 'Danh Mục Dự Án', subtitle: 'Khám phá các sản phẩm đã được thẩm định về vị trí, pháp lý và tiềm năng.' } },
            { id: 'featured_projects', name: 'Danh Sách Dự Án', content: { heading: 'Tất Cả Dự Án', maxItems: 12 } },
            { id: 'cta', name: 'Tư Vấn Chọn Dự Án', content: { heading: 'Chưa biết nên chọn dự án nào?', subtitle: 'Chuyên viên sẽ phân tích theo ngân sách và mục tiêu đầu tư.', ctaText: 'Nhận tư vấn' } }
          ]
        },
        {
          slug: 'contact',
          name: 'Liên hệ & Bản đồ Vị trí',
          sections: [
            { id: 'hero', name: 'Hero Liên Hệ', content: { title: 'Kết Nối Cùng Chúng Tôi', subtitle: 'Nhận thông tin chính xác và lịch hẹn tham quan phù hợp.' } },
            { id: 'contact', name: 'Thông Tin Liên Hệ', content: { heading: 'Kết Nối Cùng Chuyên Viên Tư Vấn 24/7' } },
            { id: 'faq', name: 'Giải Đáp Trước Khi Liên Hệ', content: { items: [
              { q: 'Tôi có thể đặt lịch xem nhà mẫu không?', a: 'Có. Chuyên viên sẽ xác nhận lịch hẹn phù hợp trong thời gian sớm nhất.' },
              { q: 'Bảng giá có được cập nhật không?', a: 'Bảng giá và chính sách ưu đãi được đối chiếu theo đợt mở bán hiện hành.' },
              { q: 'Thông tin của tôi được bảo mật thế nào?', a: 'Thông tin chỉ được dùng cho mục đích tư vấn và được quản lý trong CRM riêng của doanh nghiệp.' }
            ] } }
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
                settings: (sec as any).settings || {}
              }
            });
          }
        }
      }

      // g. Clone Default Projects
      const demoProjs = templateConfig?.demoProjects || [];
      if (demoProjs.length > 0) {
        for (let k = 0; k < demoProjs.length; k++) {
          const dp = demoProjs[k];
          const typeStr = (dp.type || '').toLowerCase();
          const projType = typeStr.includes('villa') || typeStr.includes('biệt') || typeStr.includes('mansion') ? 'VILLA' : 'APARTMENT';
          
          const rawDesc = dp.desc || dp.description || dp.specs || '';
          const descStr = Array.isArray(rawDesc) ? rawDesc.join(' · ') : (typeof rawDesc === 'object' ? JSON.stringify(rawDesc) : String(rawDesc));
          
          const rawShort = dp.specs || dp.type || '';
          const shortStr = Array.isArray(rawShort) ? rawShort.join(' · ') : (typeof rawShort === 'object' ? JSON.stringify(rawShort) : String(rawShort));
          
          const priceStr = typeof dp.price === 'number' ? `${dp.price} Tỷ VNĐ` : String(dp.price || dp.priceStr || 'Liên hệ');
          
          let priceFromBigInt = BigInt(0);
          if (typeof dp.priceVal === 'number' && !isNaN(dp.priceVal)) {
            priceFromBigInt = BigInt(Math.round(dp.priceVal * 1_000_000_000));
          } else if (typeof dp.priceNum === 'number' && !isNaN(dp.priceNum)) {
            const multiplier = dp.priceNum < 1000 ? 1_000_000_000 : 1;
            priceFromBigInt = BigInt(Math.round(dp.priceNum * multiplier));
          } else if (typeof dp.price === 'number' && !isNaN(dp.price)) {
            const multiplier = dp.price < 1000 ? 1_000_000_000 : 1;
            priceFromBigInt = BigInt(Math.round(dp.price * multiplier));
          }

          await tx.project.create({
            data: {
              tenantId: tenant.id,
              title: dp.name || dp.title || `Dự án mẫu ${k + 1}`,
              slug: `${actualTemplateId}-project-${k}`,
              description: descStr,
              shortDescription: shortStr,
              type: projType,
              status: 'SELLING',
              price: priceStr,
              priceFrom: priceFromBigInt,
              area: String(dp.area || '—'),
              address: dp.location || dp.loc || 'Thành phố Hồ Chí Minh',
              thumbnail: dp.img || dp.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
              published: true,
              sortOrder: k,
            }
          });
        }
      } else if (templateConfig?.floorPlans && templateConfig.floorPlans.length > 0) {
        for (let k = 0; k < templateConfig.floorPlans.length; k++) {
          const plan = templateConfig.floorPlans[k];
          const rawSpecs = plan.specs || '';
          const specsStr = Array.isArray(rawSpecs) ? rawSpecs.join(' · ') : String(rawSpecs);

          await tx.project.create({
            data: {
              tenantId: tenant.id,
              title: plan.name || `Phân khu mẫu ${k + 1}`,
              slug: `${actualTemplateId}-project-${k}`,
              description: specsStr,
              shortDescription: String(plan.floor || ''),
              type: (plan.floor || '').includes('Villas') || (plan.floor || '').includes('Biệt') ? 'VILLA' : 'APARTMENT',
              status: 'SELLING',
              price: String(plan.price || 'Liên hệ'),
              priceFrom: BigInt(0),
              area: String(plan.area || '—'),
              address: templateConfig?.overview?.[1]?.value || 'Thành phố Hồ Chí Minh',
              thumbnail: templateConfig?.gallery?.[k % (templateConfig?.gallery?.length || 1)] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
              published: true,
              sortOrder: k,
            }
          });
        }
      }

      // Every delivered website starts with enough real content to exercise
      // cards, filters and detail navigation. Existing registry data is kept;
      // generic records only fill a short catalog up to the minimum of three.
      const seededProjectCount = await tx.project.count({ where: { tenantId: tenant.id } });
      const projectFallbacks = [
        { title: 'Căn Hộ Panorama Trung Tâm', type: 'APARTMENT', price: 'Từ 4,8 Tỷ VNĐ', area: '82m²', address: 'Trung tâm TP. Hồ Chí Minh', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
        { title: 'Biệt Thự Compound Ven Sông', type: 'VILLA', price: 'Từ 18 Tỷ VNĐ', area: '320m²', address: 'TP. Thủ Đức', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
        { title: 'Shophouse Đại Lộ Thương Mại', type: 'SHOPHOUSE', price: 'Từ 12 Tỷ VNĐ', area: '150m²', address: 'Khu đô thị mới', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' },
      ];
      for (let k = seededProjectCount; k < 3; k++) {
        const fallback = projectFallbacks[k];
        await tx.project.create({
          data: {
            tenantId: tenant.id,
            title: fallback.title,
            slug: `${actualTemplateId}-project-default-${k + 1}`,
            description: `${fallback.title} với pháp lý minh bạch, tiện ích đồng bộ và chính sách thanh toán linh hoạt.`,
            shortDescription: 'Sản phẩm bất động sản tiêu biểu',
            type: fallback.type as any,
            status: 'SELLING',
            price: fallback.price,
            priceFrom: BigInt(0),
            area: fallback.area,
            address: fallback.address,
            thumbnail: fallback.image,
            published: true,
            sortOrder: k,
          },
        });
      }

      // h. Clone Default Posts
      // Seed content belongs to the immutable template package/registry, not
      // to provisioning code. A template may intentionally start with no posts.
      const samplePosts = registryTemplate?.defaultPosts || [];

      for (let k = 0; k < samplePosts.length; k++) {
        const sp = samplePosts[k];
        await tx.post.create({
          data: {
            tenantId: tenant.id,
            title: sp.title,
          slug: sp.slug || `${templateId}-post-${k + 1}`,
            summary: sp.summary,
            content: sp.content,
            thumbnail: sp.thumbnail,
            published: true,
            publishedAt: new Date(),
          }
        });
      }

      const seededPostCount = await tx.post.count({ where: { tenantId: tenant.id } });
      const postFallbacks = [
        ['Cập nhật thị trường bất động sản 2026', 'Phân tích nguồn cung, mặt bằng giá và cơ hội đầu tư đáng chú ý trong năm 2026.'],
        ['Cẩm nang kiểm tra pháp lý trước khi xuống tiền', 'Danh sách hồ sơ và các bước thẩm định giúp người mua hạn chế rủi ro trong giao dịch.'],
        ['Kinh nghiệm chọn sản phẩm phù hợp dòng tiền', 'Cách so sánh vị trí, tiện ích, tiến độ thanh toán và khả năng khai thác cho thuê.'],
      ];
      for (let k = seededPostCount; k < 3; k++) {
        const [title, summary] = postFallbacks[k];
        await tx.post.create({
          data: {
            tenantId: tenant.id,
            title,
            slug: `${actualTemplateId}-news-default-${k + 1}`,
            summary,
            content: `<p>${summary}</p><p>Liên hệ đội ngũ chuyên viên để nhận báo cáo chi tiết và dữ liệu cập nhật.</p>`,
            thumbnail: projectFallbacks[k].image,
            published: true,
            publishedAt: new Date(),
          },
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
          platformDomain: process.env.PLATFORM_DOMAIN || 'templates.aireviewbds.com',
          customDomain: null,
          dnsVerified: true,
          sslStatus: 'ACTIVE'
        }
      });

      // m. Create exactly one subscription per tenant.
      const PLAN_DURATION_DAYS: Record<string, number> = {
        BASIC: 30,
        STARTER: 30,
        PRO: 30,
        PROFESSIONAL: 365,
        BUSINESS: 365,
        ENTERPRISE: 365,
      };
      const isLifetime = plan === 'LIFETIME' || plan === 'BUY_SOURCE' || plan === 'STARTER';
      const durationDays = PLAN_DURATION_DAYS[plan] ?? 30;
      const startDate = new Date();
      const endDate = new Date();
      if (isLifetime) endDate.setFullYear(2125, 0, 1);
      else endDate.setDate(endDate.getDate() + durationDays);

      await tx.subscription.create({
        data: {
          tenant: { connect: { id: tenant.id } },
          orderId: input.orderId,
          plan: plan,
          status: 'ACTIVE',
          amount,
          startDate,
          endDate,
        },
      });

      return { tenant, user, isNewUser };
    }, {
      maxWait: 15000,
      timeout: 60000,
    });

    // n. Tự động đăng ký domain của khách vào Vercel Project qua Vercel API (background non-blocking)
    const platformDomain = process.env.PLATFORM_DOMAIN || 'templates.aireviewbds.com';
    const targetDomain = `${slug.toLowerCase()}.${platformDomain}`;
    vercelDomainService.addDomainToVercel(targetDomain).catch((err: any) => {
      logger.warn(`[Vercel Domain] Auto-add domain background error: ${err?.message || err}`);
    });

    return {
      tenant: result.tenant,
      user: result.user,
      credentials: {
        tempPassword: cmsPassword,
        cmsPassword: cmsPassword,
      },
    };
  }
}

export const websiteProvisioningService = new WebsiteProvisioningService();
