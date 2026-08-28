import bcrypt from 'bcrypt';
import { prisma } from '@repo/database';

const DEFAULT_TEMPLATES = [
  {
    slug: 'luxury-gold',
    name: 'Luxury Gold Style',
    shortDescription: 'Biệt thự · Penthouse · Dinh thự dát vàng hoàng gia',
    thumbnail: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800',
    features: ['Hero Parallax Fullscreen Video', 'Gallery Masonry Gold cao cấp', 'Form VIP Lounge Concierge', 'Dark Mode Hoàng Gia'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 1,
  },
  {
    slug: 'minimal-white',
    name: 'Minimal White Style',
    shortDescription: 'Apple Minimalist · Căn hộ cao cấp Bắc Âu · Tinh tế',
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    features: ['Typography Apple phong cách', 'Whitespace chuẩn UX', 'Card sạch bo tròn 24px', 'Sticky Glass Navbar'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 2,
  },
  {
    slug: 'modern-corporate',
    name: 'Modern Corporate Pro',
    shortDescription: 'Tập đoàn BĐS · Tổng công ty · Sàn lớn 100+ nhân sự',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    features: ['Mega Menu Đa Tầng', 'Grid Dự Án Phân Phối', 'Trang Đối Tác & Tuyển Dụng', 'Timeline Doanh Nghiệp'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 799000,
    sortOrder: 3,
  },
  {
    slug: 'resort-paradise',
    name: 'Resort Paradise Style',
    shortDescription: 'BĐS biển · Biệt thự đảo · Condotel · Second Home',
    thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
    features: ['Video Hero Biển Lãng Mạn', 'Bảng tính ROI Cho Thuê Nghỉ Dưỡng', 'Bản Đồ Kết Nối Sân Bay', 'Wave Section Divider'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 4,
  },
  {
    slug: 'urban-city',
    name: 'Smart Urban City',
    shortDescription: 'Căn hộ chung cư · Đại đô thị thông minh · Metro',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: ['Tìm Kiếm Căn Hộ Theo Quận/Giá', 'Bảng Tính Lãi Vay Ngân Hàng', 'Bản Đồ Tuyến Metro', 'Layout So Sánh 1PN/2PN/3PN'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 5,
  },
  {
    slug: 'industrial-estate',
    name: 'Industrial & Logistics Park',
    shortDescription: 'Khu công nghiệp · Nhà xưởng xây sẵn · Kho vận B2B',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    features: ['Thông Số Kỹ Thuật Hạ Tầng 110kV', 'Bản Đồ Kết Nối Cảng Nước Sâu', 'Quy Trình Đầu Tư FDI 5 Bước', 'Tải Brochure PDF B2B'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 6,
  },
  {
    slug: 'villa-premium',
    name: 'Villa Royal Garden',
    shortDescription: 'Biệt thự đơn lập sân vườn · Sơ đồ mặt bằng · 3D Tour',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    features: ['Tour 3D Matterport Thực Tế Ảo', 'Tab Sơ Đồ Mặt Bằng Từng Tầng', 'Biểu Đồ Hướng Nắng Phong Thủy', 'Booking Private Tour'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 7,
  },
  {
    slug: 'eco-green',
    name: 'Green Eco Living',
    shortDescription: 'Đô thị sinh thái xanh · Ecopark · Chuẩn Xanh ESG',
    thumbnail: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
    features: ['Timeline Cảnh Quan Cây Xanh', 'Chỉ Số Bền Vững & Không Khí Sạch', 'Showcase Tiện Ích Ngoài Trời', 'Giao Diện Chiếc Lá Mềm Mại'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 8,
  },
  {
    slug: 'classic-elegant',
    name: 'Classic Heritage Architecture',
    shortDescription: 'Tân cổ điển Châu Âu · Lâu đài quý phái · Indochine',
    thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    features: ['Bố Cục Tạp Chí Kiến Trúc Sang Trọng', 'Tư Vấn Phong Thủy & Tụ Khí', 'Timeline 25 Năm Uy Tín', 'Serif Typography Trang Nhã'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 9,
  },
  {
    slug: 'investment-pro',
    name: 'Investment Pro Hub',
    shortDescription: 'Phân tích tài chính BĐS · Biểu đồ giá · Máy tính ROI',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    features: ['Biểu Đồ Tăng Trưởng Giá Đất Realtime', 'Máy Tính ROI Lợi Nhuận Cho Thuê', 'Bảng So Sánh BĐS vs Vàng/CK', 'Tải Hồ Sơ Pháp Lý 1/500'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 10,
  },
  {
    slug: 'agency-onepage',
    name: 'Agency Marketing OnePage',
    shortDescription: 'Landing page 1 trang · Tối ưu chạy Ads · Chuyển đổi cao',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    features: ['Countdown Timer Đếm Ngược Mở Bán', 'Sticky Mobile CTA Bar', 'Popup Thu Lead Tỷ Lệ Cao', 'Bảng Giá & Chiết Khấu Khủng F1'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 349000,
    sortOrder: 11,
  },
  {
    slug: 'mega-developer',
    name: 'Mega Developer Portal',
    shortDescription: 'Cổng thông tin Đa dự án · Quan hệ cổ đông Tập đoàn',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    features: ['Thanh Chỉ Số Cổ Phiếu Realtime', 'Danh Mục Đa Dự Án Phân Vùng', 'IR Portal Báo Cáo Cổ Đông', 'Media Newsroom & CSR'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 1490000,
    sortOrder: 12,
  },
  {
    slug: 'auction-template',
    name: 'Sàn Đấu Giá BĐS',
    shortDescription: 'Đấu giá trực tuyến · Countdown · Tài sản phát mãi ngân hàng',
    thumbnail: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800',
    features: ['Hệ Thống Đấu Giá Trực Tuyến', 'Đồng Hồ Đếm Ngược Bước Giá', 'Hồ Sơ Pháp Lý Đã Kiểm Duyệt', 'Đặt Cọc Tham Gia Đấu Giá'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 699000,
    sortOrder: 13,
  },
  {
    slug: 'landplot-template',
    name: 'Dự Án Đất Nền Phân Lô',
    shortDescription: 'Đất nền phân lô · Sơ đồ quy hoạch 1/500 · Báo giá F1',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    features: ['Bản Đồ Phân Lô Tương Tác 1/500', 'Tra Cứu Tình Trạng Lô Đất Trực Tiếp', 'Bảng Giá & Tiến Độ Hạ Tầng', 'Đăng Ký Giữ Chỗ Lô Đẹp'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 14,
  },
  {
    slug: 'retail-podium',
    name: 'Retail & Shophouse Podium',
    shortDescription: 'Shophouse khối đế · Mặt bằng kinh doanh · TTTM',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    features: ['Sơ Đồ Gian Hàng 3D Trung Tâm Thương Mại', 'Booking Mặt Bằng Kinh Doanh', 'Thống Kê Lưu Lượng Khách Mua Sắm', 'Biểu Phí Thuê & Đặt Cọc'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 599000,
    sortOrder: 15,
  },
  {
    slug: 'personal-agent',
    name: 'Top Personal Broker',
    shortDescription: 'Profile thương hiệu cá nhân · Môi giới triệu đô · One Page',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    features: ['Profile Chuyên Nghiệp Top Broker', 'Slider Dự Án Đang Nắm Giữ', 'Đánh Giá Khách Hàng 5 Sao', 'Đặt Lịch Tư Vấn 1-1'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 399000,
    sortOrder: 16,
  },
];

export async function autoSeedDatabase() {
  try {
    console.log('🌱 Đang đồng bộ hóa dữ liệu 16+ Mẫu Templates & Super Admin...');

    // 1. Đồng bộ 16+ Templates với ảnh 4K và thông tin đầy đủ
    for (const t of DEFAULT_TEMPLATES) {
      await prisma.template.upsert({
        where: { slug: t.slug },
        update: {
          name: t.name,
          shortDescription: t.shortDescription,
          thumbnail: t.thumbnail,
          features: t.features,
          priceBuy: t.priceBuy,
          priceBuySource: t.priceBuySource,
          priceRentMonthly: t.priceRentMonthly,
          isActive: true,
          sortOrder: t.sortOrder,
        },
        create: {
          name: t.name,
          slug: t.slug,
          description: `Giao diện bất động sản cao cấp phong cách ${t.name}, tối ưu SEO, chuẩn di động, tích hợp CMS quản trị.`,
          shortDescription: t.shortDescription,
          thumbnail: t.thumbnail,
          features: t.features,
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

    // Cập nhật các alias cũ nếu có trong DB để có ảnh đại diện đẹp
    const aliasThumbnails: Record<string, string> = {
      'modern-villa': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'smart-urban': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'green-eco': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'ocean-view': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      'minimal-zen': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'high-rise': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'heritage-classic': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'suburban-family': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      'tech-hub': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
      'lake-sanctuary': 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800',
      'mountain-retreat': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'commercial-plaza': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'riverside-mansion': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'golf-residences': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
      'industrial-logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    };

    for (const [slug, thumb] of Object.entries(aliasThumbnails)) {
      await prisma.template.updateMany({
        where: { slug, thumbnail: null },
        data: { thumbnail: thumb },
      });
    }

    // 2. Tạo DUY NHẤT 1 Super Admin tài khoản chính thức
    const adminPasswordHash = await bcrypt.hash('adminsuper@123456', 10);
    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@aireviewbds.com' },
      update: { role: 'SUPER_ADMIN', isActive: true, fullName: 'Super Admin AI Review BDS' },
      create: {
        email: 'admin@aireviewbds.com',
        passwordHash: adminPasswordHash,
        fullName: 'Super Admin AI Review BDS',
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });

    // 3. Reset toàn bộ tài khoản rác/khách thử nghiệm & đơn hàng để Admin test lại từ đầu
    try {
      await prisma.order.deleteMany({});
      await prisma.refreshToken.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.passwordResetToken.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.emailVerificationToken.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.customerProfile.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.cart.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.wishlist.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.review.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.tenantMembership.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.auditLog.deleteMany({
        where: { userId: { not: superAdmin.id } },
      });
      await prisma.user.deleteMany({
        where: { id: { not: superAdmin.id } },
      });
    } catch (cleanupErr: any) {
      console.warn('Lỗi phụ khi dọn dẹp data rác:', cleanupErr.message);
    }

    console.log('✅ Đã đồng bộ thành công 16+ Templates và duy nhất 1 tài khoản Super Admin (admin@aireviewbds.com) vào Database!');
  } catch (err: any) {
    console.warn('⚠️ Gặp lỗi khi tự động seed database (bỏ qua):', err.message);
  }
}

