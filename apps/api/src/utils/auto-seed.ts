import bcrypt from 'bcrypt';
import { prisma, ProductType } from '@repo/database';

// Source records retained here only as the content source for the 24 approved
// products. Public/product slugs must never use these historic aliases.
const LEGACY_TEMPLATE_CONTENT = [
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
  {
    slug: 'portal-listing',
    name: 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1',
    shortDescription: 'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: ['Hero Search Đa Năng Theo Danh Mục', '8 Tin Bán & 8 Tin Thuê Chi Tiết', 'Spotlight Dự Án Tiêu Điểm', 'Máy Tính Lãi Vay Ngân Hàng Tự Động'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    sortOrder: 17,
  },
  {
    slug: 'bds123-portal',
    name: 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành',
    shortDescription: 'Sàn Đấu Giá Bến Thành · Phân tầng khu vực · Lưới 4 cột',
    thumbnail: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    features: ['Bất động sản theo 6 tỉnh thành', 'Slider dự án nổi bật', 'Lưới tin bán & cho thuê 4 cột', 'Tổng đài CSKH 24/7'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 18,
  },
  {
    slug: 'nhadatso-density',
    name: 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số',
    shortDescription: 'Mật độ cao · Lọc 6 tiêu chí · Phong thủy nhà đất',
    thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    features: ['Bộ lọc 6 tiêu chí (Tỉnh/Quận/Phường/Hướng/Giá)', 'Danh sách tin dạng List View mật độ cao', 'Sidebar tra cứu tỉnh thành & phong thủy', 'Đăng tin & bản đồ Google Maps'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 19,
  },
  {
    slug: 'minhkhai-apartment',
    name: 'BĐS 20 — Chung Cư Minh Khai & Times City',
    shortDescription: 'Chung cư Minh Khai · Times City · FAQ Accordion',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: ['Lưới 8 dự án căn hộ cao cấp Minh Khai', 'FAQ Accordion giải đáp pháp lý/vay vốn', 'Form đăng ký nhận bảng giá đợt 1', 'Logo đối tác chiến lược Vingroup/Sun Group'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 20,
  },
  {
    slug: 'hanoi-rental',
    name: 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội',
    shortDescription: 'Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt',
    thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    features: ['Pills lọc nhanh 5 quận (Nam Từ Liêm, Cầu Giấy...)', 'Visual District Cards đếm số lượng tin', 'Lưới 8 căn hộ cho thuê & 4 căn hộ bán', 'Google Maps tích hợp ở chân trang'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 21,
  },
  {
    slug: 'happyland-resort',
    name: 'BĐS 22 — ZoHotels & Happy Land Nha Trang',
    shortDescription: 'Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    features: ['Hệ thống 6 phân hạng căn hộ nghỉ dưỡng view biển', 'Tab tiện ích Nội Khu / Ngoại Khu trực quan', 'Banner khuyến mãi Grand Opening 50% OFF', 'Dải đăng ký nhận ưu đãi màu cam nổi bật'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 22,
  },
  {
    slug: 'homeo-multithumb',
    name: 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo',
    shortDescription: 'Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    features: ['Card sản phẩm 1 ảnh to + 3 ảnh nhỏ chi tiết', 'Tabs tìm kiếm Mua Bán / Cho Thuê / Dự Án', 'Khối Người mua hàng thông minh (6 cẩm nang)', 'Nút Đăng Tin Miễn Phí tone đỏ rượu vang'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 23,
  },
  {
    slug: 'realtybuild-tech',
    name: 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam',
    shortDescription: 'RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: ['Hero Search kèm Icon Pills loại hình BĐS', 'Spotlight dự án nổi bật Vinhomes Green Bay', 'Grid 6 thành phố lớn toàn quốc', 'Lưới 8 BĐS Đang Bán chuẩn công nghệ'],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    sortOrder: 24,
  },
];

const LANDING_PAGE_TEMPLATES = [
  { slug: 'lp-01', name: 'LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel', category: 'CAN_HO_CHUNG_CU', shortDescription: 'Landing Page 1 trang · Bán Căn Hộ · Thu Lead Chạy Ads Siêu Tốc', thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80', features: ['Sales funnel một trang cho chiến dịch Ads', 'Form nhận bảng giá và mặt bằng VIP', 'Countdown ưu đãi', 'Bảng tính khoản vay'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 25 },
  { slug: 'lp-02', name: 'LP #02 - Tuyển Dụng 300 Chuyên Viên Kinh Doanh BĐS', category: 'TUYEN_DUNG', shortDescription: 'Landing Page 1 trang · Tuyển Dụng Sale BĐS · Đột Phá Thu Nhập Trăm Triệu', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80', features: ['Form ứng tuyển nhanh', 'Trình bày chương trình đào tạo', 'Bảng quyền lợi và hoa hồng', 'Gallery văn hóa doanh nghiệp'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 26 },
  { slug: 'lp-03', name: 'LP #03 - Tổ Hợp Căn Hộ Cao Cấp Simple Page', category: 'CAN_HO_CAO_CAP', shortDescription: 'Landing Page 1 trang · Căn Hộ Nghỉ Dưỡng 5 Sao · Mở Bán Đợt 1', thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80', features: ['Form báo giá hero', 'Mặt bằng tương tác', 'Giỏ hàng mở bán', 'Đặt lịch xe xem nhà mẫu'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 27 },
  { slug: 'lp-04', name: 'LP #04 - Sale Môi Giới BĐS Triệu Đô Authority', category: 'THUONG_HIEU_CA_NHAN', shortDescription: 'Landing Page 1 trang · Sale Cá Nhân · Khẳng Định Uy Tín Broker VIP', thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80', features: ['Profile thành tích', 'Giỏ hàng độc quyền', 'Khảo sát nhu cầu', 'Kết nối Zalo và hotline'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 28 },
  { slug: 'lp-05', name: 'LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park Tower', category: 'CAN_HO_NGHI_DUONG', shortDescription: 'Landing Page 1 trang · Căn Hộ Khách Sạn 5 Sao · Tâm Điểm Cầu Giấy', thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80', features: ['Bảng tiến độ thanh toán', 'Mặt bằng tầng', 'Lưới mẫu căn hộ', 'Form nhận bảng giá'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 29 },
  { slug: 'lp-06', name: 'LP #06 - Đại Đô Thị Sân Bay Stella Mega City Cần Thơ', category: 'DO_THI', shortDescription: 'Landing Page 1 trang · Đại Đô Thị Sân Bay 150ha · Sổ Đỏ Trao Tay', thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80', features: ['Lead box nổi bật', 'Bản đồ vị trí', 'Lý do đầu tư', 'Form nhận bảng giá đợt 1'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 30 },
  { slug: 'lp-07', name: 'LP #07 - Siêu Thành Phố Biển NovaWorld Phan Thiết 1.000ha', category: 'NGHI_DUONG_BIEN', shortDescription: 'Landing Page 1 trang · Siêu Thành Phố Biển 1.000ha · Chiết Khấu 1.6 Tỷ', thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80', features: ['Phân khu tương tác', 'Phân tích đầu tư', 'Video giới thiệu', 'Form nhận brochure và bảng giá'], priceBuy: 399000, priceBuySource: null, priceRentMonthly: 129000, sortOrder: 31 },
];

const DEFAULT_TEMPLATE_CONFIG = {
  themeConfig: { colorPrimary: '#2563EB', colorSecondary: '#1E293B', fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter' },
  layoutConfig: { header: 'sticky', footer: 'simple-4-columns', homeSections: ['hero', 'stats', 'featured-projects', 'amenities', 'about', 'posts', 'contact'] },
  featureFlags: { enableBlog: true, enableMap: true, enableVirtualTour: true },
};

const CANONICAL_BDS_NAMES = [
  'BĐS 01 — Biệt Thự Hoàng Gia',
  'BĐS 02 — Căn Hộ Tối Giản',
  'BĐS 03 — Sàn Giao Dịch Chuyên Nghiệp',
  'BĐS 04 — Nghỉ Dưỡng Ven Biển',
  'BĐS 05 — Đại Đô Thị Thông Minh',
  'BĐS 06 — Khu Công Nghiệp Hiện Đại',
  'BĐS 07 — Biệt Thự Compound 3D',
  'BĐS 08 — Đô Thị Sinh Thái',
  'BĐS 09 — Dinh Thự Di Sản',
  'BĐS 10 — Đầu Tư Bất Động Sản',
  'BĐS 11 — Landing Mở Bán',
  'BĐS 12 — Cổng Thông Tin Dự Án',
  'BĐS 13 — Sàn Đấu Giá Bất Động Sản',
  'BĐS 14 — Đất Nền Quy Hoạch',
  'BĐS 15 — Shophouse Thương Mại',
  'BĐS 16 — Môi Giới Nhà Đất',
  'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1',
  'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành',
  'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số',
  'BĐS 20 — Chung Cư Minh Khai & Times City',
  'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội',
  'BĐS 22 — ZoHotels & Happy Land Nha Trang',
  'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo',
  'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam',
] as const;

const WEBSITE_TEMPLATES = LEGACY_TEMPLATE_CONTENT.map((template, index) => ({
  ...template,
  slug: `bds-${String(index + 1).padStart(2, '0')}`,
  name: CANONICAL_BDS_NAMES[index],
  category: 'WEBSITE',
  productType: ProductType.WEBSITE_TEMPLATE,
}));

const CATALOG_TEMPLATES = [
  ...WEBSITE_TEMPLATES,
  ...LANDING_PAGE_TEMPLATES.map((template) => ({ ...template, productType: ProductType.LANDING_PAGE })),
];

/**
 * Makes the sellable catalog an explicit business invariant: 24 BDS products
 * and 7 landing pages. Old rows are retired (not deleted) so historical
 * orders and tenants remain referentially intact.
 */
export async function syncCatalog() {
  for (const t of CATALOG_TEMPLATES) {
      const template = await prisma.template.upsert({
        where: { slug: t.slug },
        update: {
          name: t.name,
          shortDescription: t.shortDescription,
          thumbnail: t.thumbnail,
          features: t.features,
          priceBuy: t.priceBuy,
          priceBuySource: t.priceBuySource,
          priceRentMonthly: t.priceRentMonthly,
          productType: t.productType,
          category: t.category,
          salePrice: null,
          supportedCmsModules: ['LEADS', 'MEDIA', 'SEO', 'FORMS'],
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
          productType: t.productType,
          category: t.category,
          supportedCmsModules: ['LEADS', 'MEDIA', 'SEO', 'FORMS'],
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
      await prisma.templateVersion.upsert({
        where: { templateId_version: { templateId: template.id, version: 1 } },
        update: { ...DEFAULT_TEMPLATE_CONFIG, components: { runtime: t.slug }, status: 'PUBLISHED' },
        create: {
          templateId: template.id,
          version: 1,
          ...DEFAULT_TEMPLATE_CONFIG,
          components: { runtime: t.slug },
          status: 'PUBLISHED',
        },
      });
  }

  const canonicalSlugs = CATALOG_TEMPLATES.map((template) => template.slug);
  const retired = await prisma.template.updateMany({
    where: {
      slug: { notIn: canonicalSlugs },
      isActive: true,
    },
    data: { isActive: false },
  });

  return { websiteTemplates: WEBSITE_TEMPLATES.length, landingPages: LANDING_PAGE_TEMPLATES.length, retired: retired.count };
}

export async function autoSeedDatabase() {
  try {
    console.log('🌱 Đang đồng bộ catalog chuẩn: 24 BĐS + 7 Landing Page...');

    // 1. Đồng bộ catalog chuẩn và ẩn an toàn mọi catalog legacy.
    await syncCatalog();

    // 2. Bootstrap Super Admin chỉ khi chưa có; không bao giờ ghi đè mật khẩu hiện hữu.
    const adminEmail = 'admin@aireviewbds.com';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (existingAdmin) {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: 'SUPER_ADMIN', isActive: true, fullName: 'Super Admin AI Review BDS' },
      });
    } else {
      const bootstrapPassword = process.env.SEED_ADMIN_PASSWORD;
      if (!bootstrapPassword || bootstrapPassword.length < 12) {
        throw new Error('SEED_ADMIN_PASSWORD with at least 12 characters is required to bootstrap the first Super Admin.');
      }
      await prisma.user.create({
        data: {
          email: adminEmail,
          passwordHash: await bcrypt.hash(bootstrapPassword, 12),
          fullName: 'Super Admin AI Review BDS',
          role: 'SUPER_ADMIN',
          isActive: true,
        },
      });
    }

    console.log('✅ Đã đồng bộ thành công các Templates và tài khoản Super Admin vào Database!');
  } catch (err: any) {
    console.warn('⚠️ Gặp lỗi khi tự động seed database (bỏ qua):', err.message);
  }
}

