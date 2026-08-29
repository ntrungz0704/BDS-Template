import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

try {
  const possiblePaths = [path.join(process.cwd(), '.env'), path.join(process.cwd(), '../../.env')];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      fs.readFileSync(p, 'utf-8').split('\n').forEach((line) => {
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
          if (key && !key.startsWith('#')) process.env[key] = value;
        }
      });
      console.log('Loaded .env from:', p);
      break;
    }
  }
} catch (e) { console.error('Cannot load .env:', e); }

import { PrismaClient, ProjectType, ProjectStatus } from '../generated/client/index.js';
const prisma = new PrismaClient();

const LUXURY_THEME = {
  primaryColor: '#C5A572', secondaryColor: '#1A1A2E', accentColor: '#D4AF37',
  backgroundColor: '#070C1E', surfaceColor: '#0B132B', textColor: '#F3F4F6',
  textMutedColor: '#9CA3AF', borderColor: '#2D3250',
  fontHeading: 'Playfair Display, serif', fontBody: 'Plus Jakarta Sans, sans-serif',
  fontSizeBase: '16px', lineHeight: '1.6', containerWidth: '1280px',
  borderRadius: '4px', shadowStyle: 'hard', darkMode: true, buttonStyle: 'rounded', animationsEnabled: true,
};
const GREEN_THEME = { ...LUXURY_THEME, primaryColor: '#16A34A', accentColor: '#22C55E', backgroundColor: '#F0FDF4', surfaceColor: '#DCFCE7', textColor: '#14532D', textMutedColor: '#166534', borderColor: '#BBF7D0', darkMode: false };

const DEFAULT_PAGES = [
  { slug: 'home', title: 'Trang chủ', isSystem: true, sortOrder: 0, sections: [
    { key: 'hero', label: 'Hero Banner', order: 0, content: {
      badge: 'Lumière Grand Palace — Vinhomes Riverside',
      heading: 'Kiệt Tác\nĐỉnh Cao\nSống Thượng Lưu',
      headingAccent: 'Đỉnh Cao',
      subtitle: '18 dinh thự độc bản được kiến trúc sư người Ý thiết kế riêng cho 18 vị chủ nhân tinh hoa. Tọa lạc bên dòng sông ngọc Hà Nội.',
      ctaText: 'Khám phá dự án', ctaUrl: 'projects',
      backgroundImage: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=90',
      quickStats: [
        { label: 'Diện tích', value: 'Từ 280m²' },
        { label: 'Giá từ', value: '28 Tỷ VNĐ' },
        { label: 'Pháp lý', value: 'Sổ đỏ vĩnh viễn' },
        { label: 'Bàn giao', value: 'Q2 / 2027' },
      ],
    }, settings: { fullHeight: true } },
    { key: 'intro', label: 'Giới thiệu ngắn', order: 1, content: {
      quote: 'Chúng tôi không xây những ngôi nhà. Chúng tôi kiến tạo những di sản trường tồn theo năm tháng.',
      quoteAccent: 'di sản trường tồn',
      description: 'Lumière Group — 18 năm kiến tạo những không gian sống đỉnh cao chỉ dành cho 2.800+ vị chủ nhân tinh hoa nhất Việt Nam và khu vực.',
    }, settings: {} },
    { key: 'stats', label: 'Số liệu nổi bật', order: 2, content: {
      items: [
        { value: '18+', label: 'Năm kinh nghiệm', iconName: 'Clock' },
        { value: '350+', label: 'Dinh thự đã bàn giao', iconName: 'Building2' },
        { value: '2,800+', label: 'Chủ nhân tinh hoa', iconName: 'Users' },
        { value: '98%', label: 'Hài lòng tuyệt đối', iconName: 'Star' },
      ],
    }, settings: {} },
    { key: 'featured_projects', label: 'Dự án nổi bật', order: 3, content: { maxItems: 6, heading: 'Bộ Sưu Tập Đỉnh Cao', headingAccent: 'Đỉnh Cao', sectionLabel: 'Dự án nổi bật' }, settings: {} },
    { key: 'amenities', label: 'Tiện ích', order: 4, content: {
      heading: 'Chuẩn Mực 6 Sao Quốc Tế', headingAccent: '6 Sao', sectionLabel: 'Đặc quyền & tiện ích',
      items: [
        { icon: '🏊', title: 'Hồ bơi vô cực tầng 50', desc: 'Tầm nhìn panorama 360° toàn cảnh thành phố và sông Sài Gòn' },
        { icon: '🍷', title: 'Wine Cellar & Cigar Lounge', desc: 'Hầm rượu kiểm soát nhiệt độ chuẩn Ý, 5000 chai phục vụ 24/7' },
        { icon: '🚁', title: 'Sân đáp trực thăng riêng', desc: 'Kết nối nhanh đến sân bay Tân Sơn Nhất trong 8 phút' },
        { icon: '🧘', title: 'Spa & Wellness Center', desc: '4000m² trung tâm chăm sóc sức khỏe đẳng cấp 6 sao quốc tế' },
        { icon: '🎾', title: 'Tennis & Golf Simulator', desc: 'Sân tennis trong nhà và hệ thống golf mô phỏng 3D hiện đại nhất' },
        { icon: '🚤', title: 'Bến du thuyền riêng', desc: 'Cầu cảng độc quyền, kết nối trực tiếp sông Sài Gòn và vịnh biển' },
      ],
    }, settings: {} },
    { key: 'testimonials', label: 'Đánh giá khách hàng', order: 5, content: {
      heading: 'Tiếng Nói Từ Giới Tinh Hoa', headingAccent: 'Giới Tinh Hoa', sectionLabel: 'Chủ nhân nói gì',
      items: [
        { name: 'Ông Nguyễn Minh Tuấn', title: 'CEO — Tập đoàn Sao Bắc Holdings', text: 'Đây không đơn thuần là nơi ở, đây là tuyên ngôn về vị thế của tôi.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', rating: 5 },
        { name: 'Bà Phạm Lan Anh', title: 'Chủ tịch HĐQT — Goldmark City Group', text: 'Kiến trúc đỉnh cao, nội thất sang trọng đến từng chi tiết nhỏ nhất.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', rating: 5 },
        { name: 'Ông David Chen', title: 'Country Director — CapitaLand Vietnam', text: 'This project set a completely new standard. Absolutely world-class.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80', rating: 5 },
      ],
    }, settings: {} },
    { key: 'timeline', label: 'Lịch sử phát triển', order: 6, content: {
      heading: '18 Năm Kiến Tạo Di Sản', headingAccent: 'Kiến Tạo Di Sản', sectionLabel: 'Hành trình phát triển',
      items: [
        { year: '2008', title: 'Thành lập Lumière Group', desc: 'Ra đời với tầm nhìn kiến tạo không gian sống đỉnh cao.' },
        { year: '2012', title: 'Dự án đầu tiên Quận 1', desc: 'Bàn giao 24 penthouse siêu sang đầu tiên tại TP.HCM.' },
        { year: '2016', title: 'Mở rộng ra Hà Nội', desc: 'Khai trương 18 biệt thự ven Hồ Tây.' },
        { year: '2020', title: 'Giải thưởng Quốc tế', desc: 'Nhận giải "Best Luxury Developer Vietnam" từ Asia Property Awards.' },
        { year: '2024', title: 'Lumière Grand Palace', desc: 'Ra mắt dinh thự đắt giá nhất lịch sử BĐS Việt Nam.' },
      ],
    }, settings: {} },
    { key: 'faq', label: 'Câu hỏi thường gặp', order: 7, content: {
      heading: 'Câu Hỏi Thường Gặp', headingAccent: 'Thường Gặp', sectionLabel: 'Giải đáp thắc mắc',
      items: [
        { q: 'Chính sách pháp lý của các dự án như thế nào?', a: 'Toàn bộ dự án đều được cấp Sổ đỏ / Sổ hồng lâu dài, đã qua kiểm định pháp lý 3 lớp.' },
        { q: 'Có hỗ trợ vay ngân hàng không?', a: 'Hợp tác với 5 ngân hàng hàng đầu với lãi suất ưu đãi từ 0% trong 24 tháng đầu.' },
        { q: 'Quy trình đặt mua diễn ra thế nào?', a: 'Tư vấn 1:1 → Tham quan thực tế → Ký thỏa thuận đặt cọc → Ký hợp đồng. Hoàn tất trong 48 giờ.' },
        { q: 'Dịch vụ sau bàn giao bao gồm những gì?', a: 'Concierge 24/7, quản gia riêng, bảo trì miễn phí 5 năm, quản lý tài sản toàn diện.' },
      ],
    }, settings: {} },
    { key: 'cta', label: 'CTA Banner', order: 8, content: {
      heading: 'Bắt Đầu Hành Trình\nSống Đỉnh Cao Của Bạn',
      headingAccent: 'Sống Đỉnh Cao',
      description: 'Quản gia cá nhân của chúng tôi sẽ thiết kế riêng một buổi thưởng lãm dành cho quý vị. Tuyệt đối bảo mật.',
      ctaText: 'Yêu Cầu Tư Vấn VIP',
    }, settings: {} },
    { key: 'partners', label: 'Đối tác chiến lược', order: 9, content: {
      items: ['VINHOMES', 'MASTERISE', 'SUN GROUP', 'CAPITALAND', 'KNIGHT FRANK'],
    }, settings: {} },
    { key: 'floor_plans', label: 'Mặt bằng dự án', order: 10, content: {
      heading: 'Bản Giao Hưởng Kiến Trúc', headingAccent: 'Kiến Trúc', sectionLabel: 'Mặt bằng dự án',
      items: [
        { id: 'penthouse', label: 'Penthouse · 650m²', desc: 'Tầng 50-51, Tầm nhìn 360°, Bể bơi riêng', bedrooms: 5, bathrooms: 6, price: '85 Tỷ', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80' },
        { id: 'villa', label: 'Grand Villa · 450m²', desc: 'Biệt thự đơn lập, Hồ bơi, Sân vườn 200m²', bedrooms: 4, bathrooms: 5, price: '65 Tỷ', img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=80' },
        { id: 'duplex', label: 'Duplex Sky · 320m²', desc: 'Thông tầng 2 lớp, Ban công đôi, View sông', bedrooms: 3, bathrooms: 4, price: '42 Tỷ', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80' },
      ],
    }, settings: {} },
    { key: 'gallery', label: 'Thư viện hình ảnh', order: 11, content: {
      heading: 'Nghệ Thuật Của Sự Hoàn Mỹ', headingAccent: 'Của Sự Hoàn Mỹ', sectionLabel: 'Thư viện hình ảnh',
      items: [
        { url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80', category: 'Ngoại thất', title: 'Mặt đứng dinh thự Grand Villa' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', category: 'Nội thất', title: 'Phòng khách Penthouse Sky Residences' },
        { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', category: 'Ngoại thất', title: 'Bể bơi tràn bờ The Manor' },
      ],
    }, settings: {} },
  ]},
  { slug: 'projects', title: 'Dự án', isSystem: true, sortOrder: 1, sections: [{ key: 'projects_list', label: 'Danh sách dự án', order: 0, content: { perPage: 12 }, settings: {} }] },
  { slug: 'posts', title: 'Tin tức', isSystem: true, sortOrder: 2, sections: [{ key: 'posts_list', label: 'Danh sách bài viết', order: 0, content: { perPage: 10 }, settings: {} }] },
  { slug: 'contact', title: 'Liên hệ', isSystem: true, sortOrder: 3, sections: [{ key: 'contact_full', label: 'Form liên hệ', order: 0, content: { showForm: true, heading: 'Tư Vấn 1:1 Riêng Tư', headingAccent: '1:1 Riêng Tư' }, settings: {} }] },
];


async function provisionTenant(opts: { userId: string; name: string; slug: string; subdomain: string; templateId: string; companyData: Record<string, any>; theme: Record<string, any>; isPrimary: boolean; }) {
  const { userId, name, slug, subdomain, templateId, companyData, theme, isPrimary } = opts;
  const tenant = await prisma.tenant.create({ data: { name, slug, templateId, status: 'ACTIVE', activatedAt: new Date(), version: 10 } });
  
  await prisma.tenantMembership.create({
    data: {
      userId,
      tenantId: tenant.id,
      role: 'OWNER',
      status: 'ACTIVE',
    }
  });

  if (isPrimary) { await prisma.user.update({ where: { id: userId }, data: { tenantId: tenant.id } }); }
  await prisma.tenantThemeSettings.create({ data: { tenantId: tenant.id, ...theme } });
  for (const pd of DEFAULT_PAGES) {
    const page = await prisma.tenantPage.create({ data: { tenantId: tenant.id, slug: pd.slug, title: pd.title, isSystem: pd.isSystem, published: true, sortOrder: pd.sortOrder } });
    for (const sec of pd.sections) {
      await prisma.tenantSection.create({ data: { tenantId: tenant.id, pageId: page.id, sectionKey: sec.key, label: sec.label, sortOrder: sec.order, isVisible: true, content: sec.content, settings: sec.settings } });
    }
  }
  const menu = await prisma.menu.create({ data: { tenantId: tenant.id, name: 'Menu Chinh', location: 'header', isActive: true } });
  for (const item of [['Trang chu', '/'], ['Du an', '/projects'], ['Tin tuc', '/posts'], ['Lien he', '/contact']]) {
    await prisma.menuItem.create({ data: { menuId: menu.id, label: item[0], url: item[1], sortOrder: 1, isActive: true } });
  }
  await prisma.companyInfo.create({ data: { tenantId: tenant.id, name: companyData.name, description: companyData.description, slogan: companyData.slogan, logo: companyData.logo, phone: companyData.phone, email: companyData.email, address: companyData.address, facebook: companyData.facebook, youtube: companyData.youtube, zalo: companyData.zalo } });
  await prisma.seoConfig.create({ data: { tenantId: tenant.id, metaTitle: companyData.name + ' -- Bat Dong San', metaDescription: companyData.description, enableSitemap: true } });
  const rootFolder = await prisma.mediaFolder.create({ data: { tenantId: tenant.id, name: 'Thu vien anh', slug: 'root', sortOrder: 0 } });
  await prisma.mediaFolder.create({ data: { tenantId: tenant.id, parentId: rootFolder.id, name: 'Du an', slug: 'projects', sortOrder: 1 } });
  const now = new Date(); const end = new Date(now); end.setFullYear(end.getFullYear() + 1);
  await prisma.subscription.create({ data: { tenantId: tenant.id, plan: 'PRO', status: 'ACTIVE', amount: 399000, startDate: now, endDate: end } });
  await prisma.tenantDomainSettings.create({ data: { tenantId: tenant.id, subdomain, platformDomain: 'platformbds.vn', customDomain: null, dnsVerified: true, sslStatus: 'ACTIVE' } });
  await prisma.banner.create({ data: { tenantId: tenant.id, title: companyData.slogan, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', actionUrl: '/projects', actionText: 'Xem du an', sortOrder: 1, isActive: true } });
  await prisma.lead.create({ data: { tenantId: tenant.id, fullName: 'Nguyen Minh Tu', phone: '0901234567', source: 'FORM', status: 'NEW', note: 'Quan tam can ho 3PN' } });
  await prisma.lead.create({ data: { tenantId: tenant.id, fullName: 'Tran Thi Lan', phone: '0987654321', source: 'FORM', status: 'CONTACTED' } });
  console.log('  [OK] Tenant "' + name + '" (' + subdomain + '.platformbds.vn) ACTIVE');
  return tenant;
}

async function main() {
  console.log('\nPlatformBDS -- Developer Seed\n');
  console.log('Xoa du lieu cu...');
  await prisma.webhookDelivery.deleteMany({});
  await prisma.tenantWebhook.deleteMany({});
  await prisma.tenantApiKey.deleteMany({});
  await prisma.leadActivity.deleteMany({});
  await prisma.leadNote.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.contentVersion.deleteMany({});
  await prisma.tenantSection.deleteMany({});
  await prisma.tenantPage.deleteMany({});
  await prisma.tenantThemeSettings.deleteMany({});
  await prisma.tenantDomainSettings.deleteMany({});
  await prisma.mediaRecycleBin.deleteMany({});
  await prisma.mediaUsage.deleteMany({});
  await prisma.mediaAsset.deleteMany({});
  await prisma.mediaFolder.deleteMany({});
  await prisma.tenantMembership.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.demoSession.deleteMany({});
  await prisma.contactFormSubmission.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.customerProfile.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.companyInfo.deleteMany({});
  await prisma.seoConfig.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.templateDraft.deleteMany({});
  await prisma.templateVersion.deleteMany({});
  await prisma.templateConfig.deleteMany({});
  await prisma.template.deleteMany({});
  console.log('  [OK] Xoa xong\n');

  console.log('Tao Templates (17 mau)...');
  const ALL_SEED_TEMPLATES = [
    { id: 'template-luxury-gold', slug: 'luxury-gold', name: 'Luxury Gold Style', desc: 'Giao diện phong cách hoàng gia, dinh thự và penthouse siêu sang' },
    { id: 'template-minimal-white', slug: 'minimal-white', name: 'Minimal White Style', desc: 'Phong cách tối giản Bắc Âu, chung cư cao cấp và duplex hiện đại' },
    { id: 'template-modern-corporate', slug: 'modern-corporate', name: 'Modern Corporate Style', desc: 'Doanh nghiệp bất động sản và tập đoàn chuyên nghiệp' },
    { id: 'template-resort-paradise', slug: 'resort-paradise', name: 'Resort Paradise Style', desc: 'Bất động sản nghỉ dưỡng, condotel ven biển và villa sinh thái' },
    { id: 'template-urban-city', slug: 'urban-city', name: 'Urban City Style', desc: 'Căn hộ chung cư đô thị, nhà phố và shophouse sôi động' },
    { id: 'template-industrial-estate', slug: 'industrial-estate', name: 'Industrial Estate Style', desc: 'Bất động sản công nghiệp, kho bãi và nhà xưởng cho thuê' },
    { id: 'template-luxury-villa', slug: 'luxury-villa', name: 'Luxury Villa Style', desc: 'Biệt thự đơn lập, song lập phong cách thượng lưu' },
    { id: 'template-eco-living', slug: 'eco-living', name: 'Eco Living Style', desc: 'Không gian sống xanh, bất động sản sinh thái và vườn nghỉ dưỡng' },
    { id: 'template-classic-heritage', slug: 'classic-heritage', name: 'Classic Heritage Style', desc: 'Kiến trúc tân cổ điển Pháp, lâu đài và biệt thự di sản' },
    { id: 'template-classic-elegant', slug: 'classic-elegant', name: 'Classic Elegant Style', desc: 'Phong cách thanh lịch sang trọng vượt thời gian' },
    { id: 'template-investment-pro', slug: 'investment-pro', name: 'Investment Pro Style', desc: 'Dành cho nhà đầu tư, chuyên gia tài chính và môi giới chuyên sâu' },
    { id: 'template-agency-onepage', slug: 'agency-onepage', name: 'Agency Onepage Style', desc: 'Landing page giới thiệu sàn môi giới và phân phối dự án' },
    { id: 'template-retail-commercial', slug: 'retail-commercial', name: 'Retail Commercial Style', desc: 'Mặt bằng bán lẻ, trung tâm thương mại và shophouse kinh doanh' },
    { id: 'template-listing-portal', slug: 'listing-portal', name: 'Listing Portal Style', desc: 'Cổng thông tin rao vặt và sàn giao dịch BĐS đa phân khúc' },
    { id: 'template-personal-agent', slug: 'personal-agent', name: 'Personal Agent Style', desc: 'Thương hiệu cá nhân cho môi giới BĐS triệu đô' },
    { id: 'template-auction-bds', slug: 'auction-bds', name: 'Auction BĐS Style', desc: 'Đấu giá bất động sản, phát mại và cơ hội đầu tư độc quyền' },
    { id: 'template-land-plot', slug: 'land-plot', name: 'Land Plot Style', desc: 'Đất nền phân lô, đất thổ cư và đất nông nghiệp' },
  ];

  let primaryTemplate: any = null;
  for (let i = 0; i < ALL_SEED_TEMPLATES.length; i++) {
    const t = ALL_SEED_TEMPLATES[i];
    const createdTpl = await prisma.template.create({
      data: {
        id: t.id,
        name: t.name,
        slug: t.slug,
        description: t.desc,
        shortDescription: t.name,
        priceBuy: 499000,
        priceBuySource: 799000,
        priceRentMonthly: 199000,
        isActive: true,
        sortOrder: i + 1,
      },
    });
    await prisma.templateConfig.create({
      data: {
        templateId: createdTpl.id,
        themeConfig: { colorPrimary: '#C5A572', colorSecondary: '#1A1A2E', fontHeading: 'Playfair Display', fontBody: 'Plus Jakarta Sans' },
        layoutConfig: { header: 'sticky', homeSections: ['hero', 'featured_projects', 'about', 'stats', 'cta', 'contact'] },
        featureFlags: { enableBlog: true, enableLeadCRM: true },
      },
    });
    await prisma.templateVersion.create({
      data: {
        templateId: createdTpl.id,
        version: 1,
        updateNotes: `${t.name} v1.0`,
        themeConfig: {},
        layoutConfig: {},
        featureFlags: {},
      },
    });
    if (i === 0) primaryTemplate = createdTpl;
  }
  const template = primaryTemplate;
  console.log(`  [OK] Da tao thanh cong ${ALL_SEED_TEMPLATES.length} templates trong Database!\n`);


  console.log('Tao tai khoan...');
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const customerPassword = process.env.SEED_CUSTOMER_PASSWORD;
  if (!adminPassword || adminPassword.length < 12 || !customerPassword || customerPassword.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD and SEED_CUSTOMER_PASSWORD must each contain at least 12 characters.');
  }
  const adminPw = await bcrypt.hash(adminPassword, 12);
  const customerPw = await bcrypt.hash(customerPassword, 12);
  await prisma.user.create({ data: { email: 'admin@platformbds.vn', passwordHash: adminPw, fullName: 'Admin PlatformBDS', role: 'SUPER_ADMIN', isActive: true } });
  const customer = await prisma.user.create({ data: { email: 'customer@platformbds.vn', passwordHash: customerPw, fullName: 'Nguyen Van Khach', phone: '0983312219', role: 'TENANT_OWNER', isActive: true } });
  console.log('  [OK] admin@platformbds.vn (SUPER_ADMIN)');
  console.log('  [OK] customer@platformbds.vn (TENANT_OWNER)\n');

  console.log('Provision Tenant 1: Hoang Gia Land...');
  const hglTenant = await provisionTenant({ userId: customer.id, name: 'Hoang Gia Land', slug: 'hoanggialand', subdomain: 'hoanggialand', templateId: template.id, isPrimary: true, theme: LUXURY_THEME, companyData: { name: 'Hoang Gia Land', slogan: 'Nang Tam Khong Gian Song Thuong Luu', description: 'Don vi moi gioi bat dong san hang sang tai Viet Nam.', logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/hoanggia-logo.png', phone: '0901234567', email: 'info@hoanggialand.vn', address: 'Diamond Plaza, 34 Le Duan, Q1, TP.HCM', facebook: 'https://facebook.com/hoanggialand', youtube: 'https://youtube.com/hoanggialand', zalo: '0901234567' } });

  const possibleSeedDirs = [
    path.resolve(process.cwd(), 'seed'),
    path.resolve(process.cwd(), '../seed'),
    path.resolve(process.cwd(), '../../seed'),
    path.resolve(process.cwd(), '../../../seed'),
  ];
  const seedDir = possibleSeedDirs.find(d => fs.existsSync(d)) || path.resolve(process.cwd(), 'seed');

  if (fs.existsSync(path.join(seedDir, 'projects.json'))) {
    const projectsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'projects.json'), 'utf-8'));
    const hglProjects = projectsData.filter((p: any) => p.tenant_id === 'tenant-1' || p.companySlug === 'hoanggialand');
    for (const proj of hglProjects) {
      await prisma.project.create({
        data: {
          tenantId: hglTenant.id,
          title: proj.title,
          slug: proj.slug,
          description: proj.description || '',
          shortDescription: proj.short_description || proj.shortDescription || '',
          type: (proj.type as ProjectType) || 'APARTMENT',
          status: (proj.status as ProjectStatus) || 'SELLING',
          price: proj.price,
          area: proj.area,
          address: proj.address,
          ward: proj.ward,
          district: proj.district,
          city: proj.city,
          latitude: proj.lat || proj.latitude,
          longitude: proj.lng || proj.longitude,
          amenities: proj.amenities || [],
          images: proj.gallery || proj.images || [],
          thumbnail: proj.thumbnail || '',
          featured: proj.featured || false,
          published: true,
          publishedAt: new Date(),
        },
      });
    }
    const postsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'posts.json'), 'utf-8'));
    const catP = await prisma.category.create({ data: { tenantId: hglTenant.id, name: 'Tin Tuc Du An', slug: 'tin-tuc-du-an', sortOrder: 1 } });
    const catM = await prisma.category.create({ data: { tenantId: hglTenant.id, name: 'Thi Truong BDS', slug: 'thi-truong-bds', sortOrder: 2 } });
    const hglPosts = postsData.filter((p: any) => p.tenant_id === 'tenant-1' || p.companySlug === 'hoanggialand');
    for (let i = 0; i < hglPosts.length; i++) {
      const post = hglPosts[i];
      await prisma.post.create({ data: { tenantId: hglTenant.id, title: post.title, slug: post.slug, summary: post.summary, content: post.content, thumbnail: post.thumbnail, categoryId: i % 2 === 0 ? catP.id : catM.id, published: true, publishedAt: new Date() } });
    }
    console.log('  [OK] ' + hglProjects.length + ' projects, ' + hglPosts.length + ' posts\n');
  }

  console.log('Provision Tenant 2: Green Home...');
  const ghTenant = await provisionTenant({ userId: customer.id, name: 'Green Home', slug: 'greenhome', subdomain: 'greenhome', templateId: template.id, isPrimary: false, theme: GREEN_THEME, companyData: { name: 'Green Home', slogan: 'Khong Gian Song Xanh', description: 'Green Home mang den khong gian song xanh sach hien dai.', logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/greenhome-logo.png', phone: '0908888999', email: 'info@greenhome.vn', address: 'SH-05 Vinhomes Grand Park, Q9, TP.HCM', facebook: 'https://facebook.com/greenhome', youtube: 'https://youtube.com/greenhome', zalo: '0908888999' } });
  if (fs.existsSync(path.join(seedDir, 'projects.json'))) {
    const projectsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'projects.json'), 'utf-8'));
    const ghProjects = projectsData.filter((p: any) => p.tenant_id === 'tenant-2' || p.companySlug === 'greenhome');
    for (const proj of ghProjects) {
      await prisma.project.create({
        data: {
          tenantId: ghTenant.id,
          title: proj.title,
          slug: proj.slug,
          description: proj.description || '',
          shortDescription: proj.short_description || proj.shortDescription || '',
          type: (proj.type as ProjectType) || 'APARTMENT',
          status: (proj.status as ProjectStatus) || 'SELLING',
          price: proj.price,
          area: proj.area,
          address: proj.address,
          ward: proj.ward,
          district: proj.district,
          city: proj.city,
          latitude: proj.lat || proj.latitude,
          longitude: proj.lng || proj.longitude,
          amenities: proj.amenities || [],
          images: proj.gallery || proj.images || [],
          thumbnail: proj.thumbnail || '',
          published: true,
          publishedAt: new Date(),
        },
      });
    }
    console.log('  [OK] ' + ghProjects.length + ' projects\n');
  }

  console.log('='.repeat(60));
  console.log('DEVELOPER SEED HOAN THANH');
  console.log('Tai khoan test da duoc tao tu bien moi truong SEED_*_PASSWORD.');
  console.log('Websites: hoanggialand.platformbds.vn + greenhome.platformbds.vn');
  console.log('Database: Theme/Pages/Sections/Menu/SEO/Subscription/MediaFolder/Leads READY');
  console.log('='.repeat(60));
}

main()
  .catch((e) => { console.error('Loi seed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

