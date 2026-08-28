import bcrypt from 'bcrypt';
import { prisma } from '@repo/database';

const DEFAULT_TEMPLATES = [
  { slug: 'luxury-gold', name: 'Luxury Gold Style', shortDescription: 'Phong cách Luxury Gold hoàng gia', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 1 },
  { slug: 'modern-villa', name: 'Modern Villa & Resort', shortDescription: 'Kiến trúc biệt thự nghỉ dưỡng hiện đại', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 2 },
  { slug: 'smart-urban', name: 'Smart Urban City', shortDescription: 'Căn hộ chung cư & đại đô thị thông minh', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 3 },
  { slug: 'green-eco', name: 'Green Eco Nature', shortDescription: 'Khu đô thị sinh thái xanh chuẩn ESG', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 4 },
  { slug: 'ocean-view', name: 'Ocean View Panorama', shortDescription: 'Bất động sản biển & biệt thự view vịnh', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 5 },
  { slug: 'minimal-zen', name: 'Minimalist Zen Style', shortDescription: 'Phong cách tối giản tinh tế Nhật Bản', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 6 },
  { slug: 'high-rise', name: 'High-Rise Skyscraper', shortDescription: 'Tòa tháp phức hợp chọc trời biểu tượng', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 7 },
  { slug: 'heritage-classic', name: 'Heritage Classic Architecture', shortDescription: 'Kiến trúc cổ điển Châu Âu sang trọng', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 8 },
  { slug: 'suburban-family', name: 'Suburban Family Living', shortDescription: 'Khu đô thị ven đô ấm cúng gia đình', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 9 },
  { slug: 'tech-hub', name: 'Future Tech City Hub', shortDescription: 'Đô thị công nghệ thông minh AI', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 10 },
  { slug: 'lake-sanctuary', name: 'Lake Sanctuary Living', shortDescription: 'Khu nghỉ dưỡng biệt lập ven hồ ngọc', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 11 },
  { slug: 'mountain-retreat', name: 'Highland Mountain Retreat', shortDescription: 'Biệt thự trên đồi thông mây mù', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 12 },
  { slug: 'commercial-plaza', name: 'Commercial & Shopping Plaza', shortDescription: 'Trung tâm thương mại & Shophouse phố đi bộ', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 13 },
  { slug: 'riverside-mansion', name: 'Riverside Grand Mansion', shortDescription: 'Dinh thự ven sông với bến du thuyền riêng', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 14 },
  { slug: 'golf-residences', name: 'Elite Golf Residences', shortDescription: 'Quần thể biệt thự liền kề sân Golf 18 hố', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 15 },
  { slug: 'industrial-logistics', name: 'Industrial & Logistics Park', shortDescription: 'Khu công nghiệp xanh & kho vận Logistics hiện đại', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, sortOrder: 16 },
];

export async function autoSeedDatabase() {
  try {
    const templateCount = await prisma.template.count();
    if (templateCount > 0) {
      return; // Database already seeded
    }

    console.log('🌱 Database trống, bắt đầu tự động khởi tạo dữ liệu mẫu (16 Templates & Super Admin)...');

    // 1. Tạo 16 Templates
    for (const t of DEFAULT_TEMPLATES) {
      await prisma.template.upsert({
        where: { slug: t.slug },
        update: {},
        create: {
          name: t.name,
          slug: t.slug,
          description: `Giao diện bất động sản cao cấp phong cách ${t.name}, tối ưu SEO, chuẩn di động, tích hợp CMS quản trị.`,
          shortDescription: t.shortDescription,
          priceBuy: t.priceBuy,
          priceBuySource: t.priceBuySource,
          priceRentMonthly: t.priceRentMonthly,
          isActive: true,
          sortOrder: t.sortOrder,
          templateConfig: {
            create: {
              themeConfig: {
                colorPrimary: '#2563EB',
                colorSecondary: '#1E293B',
                fontHeading: 'Plus Jakarta Sans',
                fontBody: 'Inter',
              },
              layoutConfig: {
                header: 'sticky',
                footer: 'simple-4-columns',
                homeSections: ['hero', 'stats', 'featured-projects', 'amenities', 'about', 'posts', 'contact'],
              },
              featureFlags: {
                enableBlog: true,
                enableMap: true,
                enableVirtualTour: true,
              },
            },
          },
        },
      });
    }

    // 2. Tạo Super Admin tài khoản mặc định
    const adminPasswordHash = await bcrypt.hash('adminsuper@123456', 10);
    await prisma.user.upsert({
      where: { email: 'admin@platformbds.vn' },
      update: {},
      create: {
        email: 'admin@platformbds.vn',
        passwordHash: adminPasswordHash,
        fullName: 'Admin PlatformBDS',
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });

    console.log('✅ Đã tự động nạp thành công 16 Templates và tài khoản Super Admin vào Database!');
  } catch (err: any) {
    console.warn('⚠️ Gặp lỗi khi tự động seed database (bỏ qua):', err.message);
  }
}

