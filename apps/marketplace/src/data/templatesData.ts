export interface TemplateThemeConfig {
  fontHeading: string;
  fontBody: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  radiusToken: string;
  shadowToken: string;
}

export interface TemplateLayoutConfig {
  heroStyle: string;
  navigationStyle: string;
  cardStyle: string;
  galleryStyle: string;
  ctaStyle: string;
  spacingScale: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  screenshots: string[];
  features: string[];
  priceBuy: number;
  priceBuySource?: number;
  priceRentMonthly: number;
  isActive: boolean;
  sortOrder: number;
  collectionSlug: string;
  collectionName: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  accentColor: string;
  targetAudience: string[];
  highlights: string[];
  availablePages: string[];
  modules: string[];
  benefits: string[];
  themeConfig: TemplateThemeConfig;
  layoutConfig: TemplateLayoutConfig;
  wireframe: string[];
  sectionConfig: Record<string, any>;
}

export const ALL_TEMPLATES: Template[] = [
  // ─── 01. LUXURY GOLD ────────────────────────────────────────────────────────
  {
    id: "bds-01",
    name: "BĐS 01 — Biệt Thự Hoàng Gia",
    slug: "bds-01",
    collectionSlug: "luxury",
    collectionName: "Luxury Villa Collection",
    badge: "MẪU 01",
    badgeBg: "#0F172A",
    badgeColor: "#D4AF37",
    accentColor: "#D4AF37",
    description: "Hero Fullscreen tràn viền sang trọng, tông màu gold đen hoàng gia. Parallax scrolling, Gallery Masonry, Dark Mode. Thiết kế hoàn hảo cho biệt thự Vinhomes, lâu đài, dinh thự ven sông.",
    shortDescription: "Biệt thự · Penthouse · Dinh thự dát vàng",
    thumbnail: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hero Parallax Fullscreen Video", "Gallery Masonry Gold cao cấp", "Form đăng ký VIP Lounge", "Dark Luxury Mode"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 1,
    targetAudience: ["Chủ đầu tư biệt thự", "Penthouse hạng S", "Lâu đài dinh thự", "VIP Real Estate Agency"],
    highlights: ["Hero Video Fullscreen", "Parallax Scrolling", "Gallery Masonry Gold", "Dark Mode Luxury", "Floor Plan 3D", "VIP Lounge Contact"],
    availablePages: ["Trang chủ VIP", "Bộ sưu tập biệt thự", "Chi tiết dinh thự", "Gallery Masonry", "Liên hệ Concierge"],
    modules: ["VIP Lead Form", "Google Maps Dark", "3D Matterport Tour", "Zalo VIP", "SEO Enterprise"],
    benefits: ["Nâng tầm đẳng cấp thương hiệu lập tức", "Thu hút giới siêu giàu (UHNWI)", "Trải nghiệm hình ảnh 4K mượt mà", "Bảo mật & Tốc độ tải < 1s"],
    themeConfig: {
      fontHeading: "Playfair Display, serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#0B132B",
      secondaryColor: "#1C2541",
      accentColor: "#D4AF37",
      bgColor: "#070C1E",
      cardBgColor: "#111831",
      textColor: "#F3F4F6",
      radiusToken: "0px",
      shadowToken: "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
    },
    layoutConfig: {
      heroStyle: "Fullscreen Video Parallax với Serif Gold Heading",
      navigationStyle: "Transparent Dark Navbar với Gold Border",
      cardStyle: "Glassmorphism Dark Navy viền chỉ Gold 1px",
      galleryStyle: "Masonry Asymmetric Grid với Hover Zoom",
      ctaStyle: "Floating Gold VIP Concierge Button",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: ["HeroFullscreenVideo", "VIPLoungeIntro", "GalleryMasonryGold", "AmenitiesPremiumCard", "FloorPlanInteractive3D", "PrivateTourBooking"],
    sectionConfig: {
      sourceSlug: "luxury-gold",
      heroTitle: "DINH THỰ HOÀNG GIA — VINHOMES RIVERSIDE",
      heroSubtitle: "Kiệt tác kiến trúc Ý bên dòng sông ngọc, nơi hội tụ tinh hoa sống đẳng cấp dành cho 18 vị chủ nhân độc tôn.",
      heroPrice: "Từ 120 Tỷ VNĐ / Căn"
    }
  },

  // ─── 02. MINIMAL WHITE ──────────────────────────────────────────────────────
  {
    id: "bds-02",
    name: "BĐS 02 — Căn Hộ Tối Giản",
    slug: "bds-02",
    collectionSlug: "minimal",
    collectionName: "Minimalist Living",
    badge: "MẪU 02",
    badgeBg: "#EFF6FF",
    badgeColor: "#2563EB",
    accentColor: "#2563EB",
    description: "Phong cách Apple Minimalist tinh tế, không gian trắng thoáng đãng, bố cục cân đối. Phù hợp cho môi giới cá nhân, căn hộ cao cấp và văn phòng BĐS trẻ.",
    shortDescription: "Môi giới cá nhân · Căn hộ cao cấp · Tinh tế",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hero Split Typography Apple", "White Space tối ưu UX", "Card sạch bo góc lớn", "Sticky header tinh tế"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 2,
    targetAudience: ["Môi giới cá nhân Top Performer", "Căn hộ cao cấp hiện đại", "Studio BĐS trẻ", "Chuyên gia bán hàng"],
    highlights: ["Hero Split Layout Apple", "Inter Variable Typography", "Whitespace Chuẩn UX", "Card Bo Góc 24px", "Sticky Header Glass"],
    availablePages: ["Trang chủ Minimal", "Danh sách Căn hộ", "Giới thiệu Môi giới", "Tin tức thị trường", "Liên hệ & Đặt lịch"],
    modules: ["Lead Booking Form", "Google Maps Clean", "Zalo 1-Touch", "SEO Score 100", "Google Analytics 4"],
    benefits: ["Tải trang siêu nhanh, điểm Lighthouse tuyệt đối", "Giao diện tinh tế, thân thiện, tạo thiện cảm ngay từ đầu", "Tập trung tối đa vào thông điệp và hình ảnh dự án"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#FFFFFF",
      secondaryColor: "#F8FAFC",
      accentColor: "#2563EB",
      bgColor: "#FFFFFF",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "24px",
      shadowToken: "0 20px 40px -15px rgba(0,0,0,0.07)"
    },
    layoutConfig: {
      heroStyle: "Hero Split Layout — Typography Apple Bold bên trái, Hình ảnh lớn bên phải",
      navigationStyle: "Sticky Glassmorphism Header màu trắng nhạt bo góc",
      cardStyle: "White Card bo tròn 24px với viền border mờ 1px và shadow nhẹ",
      galleryStyle: "Clean Horizontal Grid với khoảng trắng 32px",
      ctaStyle: "Solid Blue Pill Button với mũi tên ArrowRight",
      spacingScale: "8pt Grid — Section Padding 100px Desktop"
    },
    wireframe: ["HeroSplitApple", "PropertyGridRounded", "SmartFilterPill", "MinimalSpecsTable", "AgentBioCard"],
    sectionConfig: {
      sourceSlug: "minimal-white",
      heroTitle: "Không Gian Sống Thuần Khiết",
      heroSubtitle: "Tuyển tập căn hộ cao cấp tại trung tâm, được thiết kế tối ưu ánh sáng tự nhiên và tầm nhìn thoáng đãng."
    }
  },

  // ─── 03. MODERN CORPORATE ───────────────────────────────────────────────────
  {
    id: "bds-03",
    name: "BĐS 03 — Sàn Giao Dịch Chuyên Nghiệp",
    slug: "bds-03",
    collectionSlug: "corporate",
    collectionName: "Corporate Real Estate",
    badge: "MẪU 03",
    badgeBg: "#0F4C81",
    badgeColor: "#FFFFFF",
    accentColor: "#0F4C81",
    description: "Grid layout doanh nghiệp chuyên nghiệp. Mega Menu, trang Đối tác chiến lược, trang Tuyển dụng hoàn chỉnh. Dành cho sàn BĐS phân phối F1 và tổng công ty.",
    shortDescription: "Tổng công ty · Sàn phân phối F1 · Tập đoàn",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Mega Menu chuyên nghiệp", "Grid dự án phân phối F1", "Trang Đối tác & Tuyển dụng", "Timeline Doanh nghiệp"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 799000,
    isActive: true,
    sortOrder: 3,
    targetAudience: ["Tổng công ty BĐS", "Sàn giao dịch quy mô 100+ nhân sự", "Tập đoàn phân phối F1", "Agency nhiều chi nhánh"],
    highlights: ["Grid Dự án phân phối", "Mega Menu Đa Tầng", "Khu vực Đối tác Chiến lược", "Trang Tuyển Dụng & Career", "Timeline Phát triển"],
    availablePages: ["Trang chủ Corporate", "Danh sách Dự án Phân phối", "Về chúng tôi & Lịch sử", "Đối tác & Ngân hàng", "Tuyển dụng nhân tài", "Liên hệ"],
    modules: ["Corporate CRM Connector", "Lead Distribution System", "SEO Multi-Project", "Zalo OA Integration", "Google Maps Multi-Branch"],
    benefits: ["Tạo dựng uy tín vững chắc với đối tác và chủ đầu tư lớn", "Quản lý và phân phối hàng chục dự án cùng lúc khoa học", "Cấu trúc chuẩn SEO sàn phân phối"],
    themeConfig: {
      fontHeading: "Manrope, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#0F4C81",
      secondaryColor: "#1E293B",
      accentColor: "#38BDF8",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "12px",
      shadowToken: "0 10px 30px -10px rgba(15, 76, 129, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero Corporate Grid 12 cột kèm Thanh chỉ số thị trường realtime",
      navigationStyle: "Corporate Navy Header với Mega Dropdown Menu",
      cardStyle: "Solid White Card bo góc 12px viền xám nhạt với Tag tình trạng phân phối",
      galleryStyle: "Grid 3 cột sắc sảo có bộ lọc Tab trạng thái dự án",
      ctaStyle: "Navy Corporate Button với đường viền sắc nét",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroCorporateGrid", "RealtimeMarketStats", "MultiProjectGrid", "CorporateTimeline", "PartnerLogoShowcase"],
    sectionConfig: {
      sourceSlug: "modern-corporate",
      heroTitle: "SÀN GIAO DỊCH & PHÂN PHỐI BẤT ĐỘNG SẢN HÀNG ĐẦU",
      heroSubtitle: "Đối tác chiến lược tin cậy của các chủ đầu tư hàng đầu, phân phối các dự án trọng điểm toàn quốc."
    }
  },

  // ─── 04. RESORT PARADISE ────────────────────────────────────────────────────
  {
    id: "bds-04",
    name: "BĐS 04 — Nghỉ Dưỡng Ven Biển",
    slug: "bds-04",
    collectionSlug: "resort",
    collectionName: "Coastal & Resort",
    badge: "MẪU 04",
    badgeBg: "#E0F2FE",
    badgeColor: "#0369A1",
    accentColor: "#0369A1",
    description: "Bố cục sinh thái tối ưu cho bất động sản nghỉ dưỡng, biệt thự ven biển và condotel. Video Hero cuốn hút, bảng tính ROI cho thuê và bộ sưu tập ảnh 4K.",
    shortDescription: "BĐS nghỉ dưỡng · Villa biển · Condotel",
    thumbnail: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Banner video cuốn hút", "Lưới ảnh tiện ích nghỉ dưỡng", "Bảng tính ROI lợi nhuận tự động", "Tối ưu giữ chân khách"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 4,
    targetAudience: ["BĐS Nghỉ dưỡng ven biển", "Biệt thự đảo & Resort", "Condotel đầu tư", "Second Home nghỉ dưỡng"],
    highlights: ["Video Hero Biển Trời", "Wave Divider Uốn Lượn", "Bảng tính ROI cho thuê", "Tiện ích Spa & Bến thuyền"],
    availablePages: ["Trang chủ Resort", "Bộ sưu tập biệt thự biển", "Tiện ích 5 sao", "Bảng tính lợi nhuận ROI", "Liên hệ Booking"],
    modules: ["Booking Consultation Form", "ROI Simulator Tool", "Video Background Player", "Google Maps Resort", "Zalo VIP Chat"],
    benefits: ["Khơi gợi cảm xúc nghỉ dưỡng xa hoa từ cái nhìn đầu tiên", "Công cụ ROI minh bạch giúp thuyết phục bài toán dòng tiền", "Hình ảnh sắc nét tốc độ cao"],
    themeConfig: {
      fontHeading: "Outfit, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#0284C7",
      secondaryColor: "#0369A1",
      accentColor: "#38BDF8",
      bgColor: "#F0F9FF",
      cardBgColor: "#FFFFFF",
      textColor: "#0C4A6E",
      radiusToken: "20px",
      shadowToken: "0 25px 50px -12px rgba(2, 132, 199, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero Video Background Biển kết hợp Wave Divider",
      navigationStyle: "Transparent Cyan Header có Blur nhẹ",
      cardStyle: "Card bo tròn 20px với hiệu ứng Hover bay bổng",
      galleryStyle: "Masonry Resort Gallery với nút mở Fullscreen Modal",
      ctaStyle: "Gradient Ocean Blue Pill Button",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: ["HeroWaveVideo", "ResortBookingBar", "BeachInfinityGallery", "LuxurySpaAmenities", "ROISecondHomeCalc"],
    sectionConfig: {
      sourceSlug: "resort-paradise",
      heroTitle: "THIÊN ĐƯỜNG NGHỈ DƯỠNG — GRAN MELIÁ",
      heroSubtitle: "Dinh thự đảo san hô độc bản bên bờ biển ngọc, vận hành bởi các thương hiệu khách sạn 5-6 sao quốc tế."
    }
  },

  // ─── 05. URBAN CITY ─────────────────────────────────────────────────────────
  {
    id: "bds-05",
    name: "BĐS 05 — Đại Đô Thị Thông Minh",
    slug: "bds-05",
    collectionSlug: "apartment",
    collectionName: "Smart Urban & Apartment",
    badge: "MẪU 05",
    badgeBg: "#F5F3FF",
    badgeColor: "#7C3AED",
    accentColor: "#7C3AED",
    description: "Thiết kế tìm kiếm thông minh kết hợp bản đồ kết nối giao thông và tiện ích. Dành riêng cho căn hộ chung cư thành phố lớn, tích hợp công cụ tính lãi vay mua nhà.",
    shortDescription: "Căn hộ chung cư · Đại đô thị · Máy tính vay",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Bản đồ vị trí dự án trực quan", "Bảng tính lãi vay ngân hàng", "Bộ lọc tìm kiếm theo khu vực", "Tối ưu phễu thu thập lead"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 5,
    targetAudience: ["Dự án căn hộ nội đô", "Chung cư Smart City", "Khách mua ở thực gia đình trẻ", "Nhà đầu tư cho thuê"],
    highlights: ["Hero Smart Search theo Khu vực/Giá", "Bản đồ Metro & Giao thông", "Máy tính Lãi vay ngân hàng tự động", "So sánh layouts 1PN/2PN/3PN"],
    availablePages: ["Trang chủ Urban", "Tìm kiếm Căn hộ", "Bản đồ Vị trí & Metro", "Mặt bằng tầng", "Tính lãi vay Ngân hàng", "Liên hệ"],
    modules: ["Bank Mortgage Calculator", "Smart Interactive Map", "Lead CRM Connector", "Zalo Quick Contact", "SEO Tech"],
    benefits: ["Giúp khách hàng tự tính toán tiền trả góp hàng tháng dễ dàng", "Tìm kiếm căn hộ nhanh chóng theo số phòng ngủ và ngân sách", "Giao diện trẻ trung hiện đại"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#6D28D9",
      secondaryColor: "#4C1D95",
      accentColor: "#A78BFA",
      bgColor: "#F5F3FF",
      cardBgColor: "#FFFFFF",
      textColor: "#2E1065",
      radiusToken: "16px",
      shadowToken: "0 20px 40px -15px rgba(109, 40, 217, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero Smart Search Box đặt nổi trên nền hình ảnh thành phố",
      navigationStyle: "Purple Accent Header kèm nút Tìm kiếm nhanh",
      cardStyle: "Card trắng bo góc 16px với chỉ số Giá/m2 và khoảng cách Metro",
      galleryStyle: "Layout Tab phân chia căn hộ 1PN / 2PN / 3PN rõ ràng",
      ctaStyle: "Solid Purple Button với icon tia sét",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroSmartSearchMap", "ApartmentLayoutSelector", "MetroConnectMap", "BankMortgageCalculator", "SmartHomeTechSpecs"],
    sectionConfig: {
      sourceSlug: "urban-city",
      heroTitle: "CĂN HỘ THÔNG MINH — TRUNG TÂM SÁNG TẠO",
      heroSubtitle: "Sở hữu không gian sống công nghệ Smart Home đỉnh cao kế bên tuyến Metro với chính sách thanh toán linh hoạt."
    }
  },

  // ─── 06. INDUSTRIAL ESTATE ──────────────────────────────────────────────────
  {
    id: "bds-06",
    name: "BĐS 06 — Khu Công Nghiệp Hiện Đại",
    slug: "bds-06",
    collectionSlug: "industrial",
    collectionName: "Industrial & Logistics",
    badge: "MẪU 06",
    badgeBg: "#1E293B",
    badgeColor: "#F59E0B",
    accentColor: "#F59E0B",
    description: "Cấu trúc giao diện vững chãi, hiện đại dành cho khu công nghiệp, nhà xưởng và kho bãi lớn. Nhấn mạnh vào hạ tầng kỹ thuật, kết nối cảng biển và pháp lý FDI.",
    shortDescription: "Khu công nghiệp · Nhà xưởng · Kho vận B2B",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Lưới danh sách nhà xưởng thuê", "Bản đồ liên kết giao thông cảng", "Mục thông tin hạ tầng chi tiết", "Pháp lý đầu tư rõ ràng"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 6,
    targetAudience: ["Khu công nghiệp (KCN)", "Nhà xưởng cho thuê logistics", "Kho bãi tự động", "Chủ đầu tư thu hút vốn FDI"],
    highlights: ["Blueprint Grid Layout", "Thông số Kỹ thuật Hạ tầng", "Bản đồ kết nối Cảng biển & Sân bay", "Quy trình Đầu tư FDI 5 bước", "Brochure PDF Tải về"],
    availablePages: ["Trang chủ Industrial", "Hạ tầng Kỹ thuật", "Danh sách Nhà xưởng", "Quy trình FDI & Pháp lý", "Bản đồ Giao thông", "Liên hệ B2B"],
    modules: ["B2B Inquiry Lead Form", "PDF Brochure Download Engine", "Interactive Port Connectivity Map", "Zalo & Email B2B"],
    benefits: ["Thuyết phục các tập đoàn sản xuất và logistics trong & ngoài nước", "Trình bày rõ ràng công suất điện kVA, tải trọng sàn, chiều cao trần", "Uy tín và minh bạch pháp lý B2B"],
    themeConfig: {
      fontHeading: "Manrope, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#1E293B",
      secondaryColor: "#334155",
      accentColor: "#F59E0B",
      bgColor: "#0F172A",
      cardBgColor: "#1E293B",
      textColor: "#F8FAFC",
      radiusToken: "8px",
      shadowToken: "0 20px 30px -10px rgba(0, 0, 0, 0.6)"
    },
    layoutConfig: {
      heroStyle: "Dark Industrial Blueprint với thông số diện tích đất sẵn sàng bàn giao",
      navigationStyle: "Dark Steel Header với điểm nhấn màu vàng hổ phách Amber",
      cardStyle: "Dark Steel Card viền nhôm có thông số tải trọng và chiều cao trần",
      galleryStyle: "Structured Table & Blueprint Grid",
      ctaStyle: "Amber B2B Button với chữ in hoa sắc sảo",
      spacingScale: "8pt Grid — Section Padding 100px Desktop"
    },
    wireframe: ["HeroIndustrialBlueprint", "InfrastructureSpecsGrid", "LogisticsPortConnection", "FactoryWarehouseCatalog", "FDIInvestmentLegal"],
    sectionConfig: {
      sourceSlug: "industrial-estate",
      heroTitle: "TỔ HỢP CÔNG NGHIỆP & KHO VẬN LOGISTICS HIỆN ĐẠI",
      heroSubtitle: "Quỹ đất công nghiệp sạch sẵn sàng bàn giao với hạ tầng cảng biển nước sâu và trạm biến áp công suất lớn."
    }
  },

  // ─── 07. VILLA PREMIUM ──────────────────────────────────────────────────────
  {
    id: "bds-07",
    name: "BĐS 07 — Biệt Thự Compound 3D",
    slug: "bds-07",
    collectionSlug: "villa",
    collectionName: "Villa & Compound",
    badge: "MẪU 07",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
    accentColor: "#F59E0B",
    description: "Website giới thiệu biệt thự đơn lập, song lập compound khép kín. Tích hợp sẵn sơ đồ mặt bằng chi tiết từng tầng (Floor Plans) và video tour 3D thực tế ảo.",
    shortDescription: "Biệt thự cao cấp · Mặt bằng tầng · Tour 3D",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Tab sơ đồ mặt bằng chi tiết", "Hỗ trợ nhúng Tour 3D thực tế", "Giao diện sáng sủa thanh lịch", "Đầy đủ khối thông tin tiện ích"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 7,
    targetAudience: ["Dự án biệt thự cao cấp", "Shophouse thương mại", "Biệt thự sân vườn biệt lập", "Khách hàng VIP yêu cầu cao"],
    highlights: ["Tour Ảo 3D Matterport Interactive", "Tab Sơ đồ mặt bằng Tầng 1/2/3", "Biểu đồ hướng nắng Sun Orientation", "Gallery Fullscreen chất lượng 4K", "Form đặt lịch tham quan"],
    availablePages: ["Trang chủ Villa 3D", "Bộ sưu tập Biệt thự", "Sơ đồ mặt bằng chi tiết", "Trải nghiệm Tour 360°", "Đặt lịch xem nhà"],
    modules: ["3D Virtual Tour Embed Engine", "Interactive Floor Plan Viewer", "Private Booking CRM", "Zalo VIP"],
    benefits: ["Khách hàng có thể tham quan từng ngóc ngách biệt thự từ xa", "Thuyết phục bằng sự chỉn chu của sơ đồ mặt bằng", "Tăng tỷ lệ đặt lịch tham quan thực tế"],
    themeConfig: {
      fontHeading: "Outfit, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#B45309",
      secondaryColor: "#78350F",
      accentColor: "#F59E0B",
      bgColor: "#FFFBEB",
      cardBgColor: "#FFFFFF",
      textColor: "#451A03",
      radiusToken: "16px",
      shadowToken: "0 20px 40px -15px rgba(180, 83, 9, 0.12)"
    },
    layoutConfig: {
      heroStyle: "Hero 3D Tour Embed ngay từ màn hình đầu kèm nút bật toàn màn hình",
      navigationStyle: "Warm Amber Header với phong cách quý phái",
      cardStyle: "Card bo tròn 16px nền trắng ấm áp viền vàng nhạt",
      galleryStyle: "Interactive Tabs chuyển đổi Tầng / Loại hình biệt thự mượt mà",
      ctaStyle: "Amber Gold Gradient Button với hiệu ứng phát sáng nhẹ",
      spacingScale: "8pt Grid — Section Padding 110px Desktop"
    },
    wireframe: ["Hero3DVirtualTour", "FloorPlanInteractiveTabs", "SunOrientationChart", "VillaMasterplanShowcase", "PrivateClubhouseAmenities"],
    sectionConfig: {
      sourceSlug: "villa-premium",
      heroTitle: "BIỆT THỰ ĐẢO COMPOUND SINH THÁI",
      heroSubtitle: "Kiệt tác biệt thự đảo sinh thái vươn mình giữa những dòng sông xanh, sở hữu đặc quyền cảnh quan thiên nhiên vô giá."
    }
  },

  // ─── 08. ECO GREEN ──────────────────────────────────────────────────────────
  {
    id: "bds-08",
    name: "BĐS 08 — Đô Thị Sinh Thái",
    slug: "bds-08",
    collectionSlug: "eco",
    collectionName: "Eco & Sustainable",
    badge: "MẪU 08",
    badgeBg: "#DCFCE7",
    badgeColor: "#16A34A",
    accentColor: "#4ADE80",
    description: "Tông màu lục bảo tự nhiên tươi sáng, tôn vinh lối sống xanh bền vững và tiện ích thiên nhiên. Hoàn hảo cho các dự án khu đô thị xanh sinh thái, nhà vườn ven hồ.",
    shortDescription: "Dự án xanh · Sinh thái · Ecopark",
    thumbnail: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Khối tiện ích xanh nội khu", "Tông xanh lục bảo sinh thái", "Tích hợp Zalo chat nhanh", "Tốc độ tải trang tối ưu"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 8,
    targetAudience: ["Khu đô thị sinh thái xanh", "Ecopark & Vinhomes sinh thái", "Khách gia đình yêu thiên nhiên", "Dự án nghỉ dưỡng chữa lành"],
    highlights: ["Hero Green Nature bo góc chiếc lá", "Timeline Cảnh quan Cây xanh", "Showcase Công viên & Tiện ích ngoài trời", "Chỉ số Bền vững & Không khí sạch"],
    availablePages: ["Trang chủ Eco", "Cảnh quan & Mảng xanh", "Hệ thống Tiện ích nội khu", "Kiến trúc xanh bền vững", "Liên hệ & Trải nghiệm"],
    modules: ["Eco Lead Capture", "Google Maps Green Park", "Zalo Green Connect", "SEO Ecology"],
    benefits: ["Truyền tải cảm giác bình yên, trong lành, khơi gợi khát khao chuyển đến sống ngay", "Thiết kế bo góc mềm mại tự nhiên thân thiện với mọi đối tượng", "Tối ưu cảm giác nhẹ nhàng, dễ chịu"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#15803D",
      secondaryColor: "#166534",
      accentColor: "#4ADE80",
      bgColor: "#F0FDF4",
      cardBgColor: "#FFFFFF",
      textColor: "#14532D",
      radiusToken: "28px",
      shadowToken: "0 20px 40px -15px rgba(21, 128, 61, 0.12)"
    },
    layoutConfig: {
      heroStyle: "Hero Eco bo góc hình chiếc lá mềm mại với ảnh công viên ngập tràn ánh nắng",
      navigationStyle: "Green Pastel Header tươi mới",
      cardStyle: "Card bo tròn lớn 28px kết hợp icon thiên nhiên màu lục bảo",
      galleryStyle: "Nature Grid với hiệu ứng fade nhẹ khi cuộn",
      ctaStyle: "Emerald Green Pill Button tự nhiên",
      spacingScale: "8pt Grid — Section Padding 110px Desktop"
    },
    wireframe: ["HeroEcoGreenHero", "NatureTimelineShowcase", "OutdoorFacilitiesGrid", "EcoSustainabilityMetrics", "CommunityEventShowcase"],
    sectionConfig: {
      sourceSlug: "eco-green",
      heroTitle: "SỐNG XANH CHUẨN MỰC GIỮA LÒNG THÀNH PHỐ",
      heroSubtitle: "Hàng chục hecta công viên cây xanh và hồ điều hòa tạo nên hệ sinh thái vi khí hậu trong lành quanh năm."
    }
  },

  // ─── 09. CLASSIC ELEGANT ────────────────────────────────────────────────────
  {
    id: "bds-09",
    name: "BĐS 09 — Dinh Thự Di Sản",
    slug: "bds-09",
    collectionSlug: "classic",
    collectionName: "Classic & Heritage",
    badge: "MẪU 09",
    badgeBg: "#FFF1F2",
    badgeColor: "#9F1239",
    accentColor: "#FB7185",
    description: "Phong cách thiết kế trang nhã thanh lịch phong cách Tân cổ điển Châu Âu, Indochine. Tông màu trầm ấm kết hợp bố cục dòng sự kiện sắc sảo.",
    shortDescription: "Tân cổ điển · Di sản · Lâu đài quý phái",
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Thiết kế trang nhã ấm áp", "Tin tức phong thủy nhà đất", "Khối ý kiến khách hàng nổi bật", "Đầy đủ biểu mẫu nhận thông tin"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 9,
    targetAudience: ["Khách hàng trung niên thành đạt", "Doanh nghiệp BĐS lâu đời", "Dự án truyền thống có sổ đỏ ngay", "Sàn giao dịch uy tín"],
    highlights: ["Editorial Magazine Layout cổ điển", "Serif Typography trang nhã", "Timeline Lịch sử & Di sản thương hiệu", "Góc tư vấn Phong thủy & Hướng nhà"],
    availablePages: ["Trang chủ Classic", "Lịch sử & Di sản", "Danh sách Dinh thự", "Góc nhìn Phong thủy", "Liên hệ Ban lãnh đạo"],
    modules: ["Classic Lead Form", "Google Maps Heritage", "Zalo Connect", "SEO Editorial"],
    benefits: ["Tạo dựng sự an tâm tuyệt đối cho phân khúc khách hàng nhiều tài sản tích lũy", "Bố cục giống một cuốn tạp chí kiến trúc đẳng cấp", "Tôn vinh giá trị trường tồn"],
    themeConfig: {
      fontHeading: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#881337",
      secondaryColor: "#4C0519",
      accentColor: "#FB7185",
      bgColor: "#FFF1F2",
      cardBgColor: "#FFFFFF",
      textColor: "#4C0519",
      radiusToken: "6px",
      shadowToken: "0 15px 30px -10px rgba(136, 19, 55, 0.12)"
    },
    layoutConfig: {
      heroStyle: "Hero Editorial Magazine 3 cột trang nhã với Serif Heading",
      navigationStyle: "Beige Classic Header với đường kẻ viền màu rượu vang Burgundy",
      cardStyle: "Card viền đỏ đô mỏng bo góc nhẹ chuẩn tạp chí",
      galleryStyle: "Classic Grid với tỷ lệ ảnh 4:3 chuẩn mực",
      ctaStyle: "Burgundy Wine Solid Button với phông chữ Lora",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: ["HeroClassicEditorial", "HeritageTimelineHistory", "AwardsRecognitionShowcase", "FengShuiOrientationAdvice", "ClassicTestimonialQuotation"],
    sectionConfig: {
      sourceSlug: "classic-elegant",
      heroTitle: "DI SẢN KIẾN TRÚC TRƯỜNG TỒN VỚI THỜI GIAN",
      heroSubtitle: "Hơn 25 năm kiến tạo những không gian sống trường tồn, nơi lưu giữ tinh hoa và gia tài cho muôn đời sau."
    }
  },

  // ─── 10. INVESTMENT PRO ─────────────────────────────────────────────────────
  {
    id: "bds-10",
    name: "BĐS 10 — Đầu Tư Bất Động Sản",
    slug: "bds-10",
    collectionSlug: "investment",
    collectionName: "Financial & Investment",
    badge: "MẪU 10",
    badgeBg: "#1E40AF",
    badgeColor: "#FFFFFF",
    accentColor: "#60A5FA",
    description: "Giao diện định hướng tài chính và đầu tư. Tập trung làm nổi bật các con số tăng trưởng tài sản, biểu đồ dao động giá thị trường và phân tích ROI sinh lời.",
    shortDescription: "Nhà đầu tư · Biểu đồ giá · Tỷ suất ROI",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Bảng so sánh tỷ suất sinh lời", "Mô phỏng biểu đồ giá đất", "Tài liệu quy hoạch tải về", "Tối ưu hóa độ tin cậy"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 10,
    targetAudience: ["Nhà đầu tư cá nhân sành sỏi", "Quỹ đầu tư BĐS (REITs)", "Chuyên gia phân tích thị trường", "Sàn bán đất nền & Shophouse"],
    highlights: ["Biểu đồ Tăng trưởng Giá Đất Realtime", "Máy tính ROI Tỷ suất Sinh lời", "Bảng Phân tích Dòng tiền Cashflow", "Tải trọn bộ Hồ sơ Pháp lý & Quy hoạch 1/500"],
    availablePages: ["Trang chủ Investment", "Biểu đồ Phân tích Thị trường", "Máy tính ROI Sinh lời", "Tải Hồ sơ Quy hoạch", "Liên hệ Chuyên gia"],
    modules: ["ROI Financial Calculator", "Interactive Chart Engine", "Legal Document Download Gate", "CRM Lead Capture", "Zalo VIP Advisor"],
    benefits: ["Thuyết phục nhà đầu tư bằng những con số biết nói và biểu đồ tăng trưởng thực tế", "Giao diện phong cách Terminal tài chính chuyên nghiệp", "Thu thập Lead chất lượng cao dễ dàng"],
    themeConfig: {
      fontHeading: "Inter, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#1E40AF",
      secondaryColor: "#1E3A8A",
      accentColor: "#60A5FA",
      bgColor: "#EFF6FF",
      cardBgColor: "#FFFFFF",
      textColor: "#1E3A8A",
      radiusToken: "12px",
      shadowToken: "0 20px 40px -15px rgba(30, 64, 175, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero Investment Dashboard với bảng tỷ suất lợi nhuận kỳ vọng nổi bật",
      navigationStyle: "Blue Tech Financial Header",
      cardStyle: "Card trắng bo góc 12px viền xanh dương kèm mũi tên tăng trưởng",
      galleryStyle: "Data-driven Comparison Grid & Charts",
      ctaStyle: "Blue Solid Button với icon biểu đồ tăng trưởng",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroInvestmentDashboard", "ROICalculatorSimulator", "PriceGrowthChartShowcase", "CashflowAnalysisGrid", "PlanningDocumentDownload"],
    sectionConfig: {
      sourceSlug: "investment-pro",
      heroTitle: "CƠ HỘI ĐẦU TƯ SINH LỜI BỀN VỮNG",
      heroSubtitle: "Dự án sở hữu tiềm năng tăng giá đột phá nhờ quy hoạch hạ tầng giao thông và trung tâm tài chính mới."
    }
  },

  // ─── 11. AGENCY MARKETING ONEPAGE ───────────────────────────────────────────
  {
    id: "bds-011",
    name: "BĐS 11 — Landing Mở Bán",
    slug: "bds-11",
    collectionSlug: "agency",
    collectionName: "Agency & Ads Landing",
    badge: "MẪU 11",
    badgeBg: "#FDF2F8",
    badgeColor: "#DB2777",
    accentColor: "#F43F5E",
    description: "Landing page một trang siêu chuyển đổi, tối ưu tuyệt đối cho chiến dịch quảng cáo Facebook/Google Ads. Đồng hồ đếm ngược mở bán, popup thu lead thông minh và sticky CTA.",
    shortDescription: "Landing mở bán · Tối ưu chạy Ads · Chốt cọc",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["One Page Scroll mượt", "Sticky CTA nổi bật", "Popup Lead tỷ lệ cao", "Countdown Timer đếm ngược"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 349000,
    isActive: true,
    sortOrder: 11,
    targetAudience: ["Agency chạy quảng cáo Facebook/Google Ads", "Chiến dịch mở bán giai đoạn 1", "Môi giới cần thu lead nóng", "Sự kiện ra mắt dự án"],
    highlights: ["Countdown Timer Đếm ngược mở bán", "Sticky CTA luôn hiển thị dưới màn hình điện thoại", "Popup Thu lead tự động", "Bảng giá & Chính sách chiết khấu F1"],
    availablePages: ["One Page Landing Page Siêu Chuyển Đổi (Tất cả trong 1 trang)"],
    modules: ["Exit-Intent Lead Popup", "Urgency Countdown Engine", "Sticky Mobile CTA Bar", "Facebook Pixel Ready", "Google Ads Conversion Tracking"],
    benefits: ["Tối ưu chi phí chạy quảng cáo với tỷ lệ chốt form cao", "Tải trang dưới 0.8s giúp không bị rớt khách khi nhấp từ Ads", "Dẫn dắt khách thẳng đến hành động đăng ký"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#BE185D",
      secondaryColor: "#831843",
      accentColor: "#F43F5E",
      bgColor: "#FDF2F8",
      cardBgColor: "#FFFFFF",
      textColor: "#500724",
      radiusToken: "16px",
      shadowToken: "0 25px 50px -12px rgba(190, 24, 93, 0.25)"
    },
    layoutConfig: {
      heroStyle: "Hero Landing với Form thu lead ngay bên phải và Countdown đếm ngược bên trái",
      navigationStyle: "Sticky Sales Header với nút Nhận Báo Giá Đỏ rực",
      cardStyle: "High contrast Card với viền hồng phấn và thông điệp chiết khấu",
      galleryStyle: "Single Page Smooth Scroll Anchors",
      ctaStyle: "Vibrant Pink/Rose Pulsing Button",
      spacingScale: "8pt Grid — Section Padding 88px Desktop"
    },
    wireframe: ["HeroLandingLeadCapture", "CountdownUrgencyBar", "ProblemSolutionGrid", "SpecialDiscountTable", "InstantPopupLeadForm"],
    sectionConfig: {
      sourceSlug: "agency-onepage",
      heroTitle: "MỞ BÁN ĐỘC QUYỀN GIAI ĐOẠN 1 — CHÍNH SÁCH GỐC",
      heroSubtitle: "Đăng ký nhận bảng giá gốc từ chủ đầu tư & Ưu đãi chiết khấu ngay cho khách hàng đầu tiên trong tuần này."
    }
  },

  // ─── 12. MEGA DEVELOPER PORTAL ──────────────────────────────────────────────
  {
    id: "bds-12",
    name: "BĐS 12 — Cổng Thông Tin Dự Án",
    slug: "bds-12",
    collectionSlug: "developer",
    collectionName: "Mega Portal & Developer",
    badge: "MẪU 12",
    badgeBg: "#0F172A",
    badgeColor: "#38BDF8",
    accentColor: "#38BDF8",
    description: "Cổng thông tin đa dự án quy mô tập đoàn hoặc sàn giao dịch Listing Marketplace. Quản lý phân vùng dự án Bắc - Trung - Nam, quan hệ cổ đông và trung tâm báo chí.",
    shortDescription: "Tập đoàn · Cổng đa dự án · Quan hệ cổ đông",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Mega Portal Slider đa tầng", "Phân loại dự án theo khu vực", "Khu vực Báo chí & Quan hệ cổ đông", "Cổng thông tin tuyển dụng"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 1490000,
    isActive: true,
    sortOrder: 12,
    targetAudience: ["Tập đoàn phát triển BĐS hàng đầu", "Công ty niêm yết trên sàn chứng khoán", "Chủ đầu tư sở hữu nhiều quỹ đất", "Sàn giao dịch đa tỉnh thành"],
    highlights: ["Mega Menu Portal Đa Dự Án", "Khu vực Investor Relations", "Media Center & Thông cáo báo chí", "Trang Trách nhiệm Xã hội CSR", "Cổng Tuyển dụng Tập đoàn"],
    availablePages: ["Trang chủ Mega Portal", "Hệ sinh thái Dự án", "Quan hệ Cổ đông (IR)", "Truyền thông & Báo chí", "Liên hệ Trụ sở"],
    modules: ["Stock Ticker Bar", "Multi-Project Categorization CMS", "IR Document Vault", "Enterprise Lead Router", "Zalo & Email Portal"],
    benefits: ["Định hình quy mô và tầm vóc quốc gia cho các chủ đầu tư và sàn lớn", "Minh bạch thông tin tài chính và năng lực triển khai", "Quản lý tập trung toàn bộ danh mục dự án"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Plus Jakarta Sans, sans-serif",
      primaryColor: "#0F172A",
      secondaryColor: "#1E293B",
      accentColor: "#38BDF8",
      bgColor: "#020617",
      cardBgColor: "#0F172A",
      textColor: "#F8FAFC",
      radiusToken: "12px",
      shadowToken: "0 25px 50px -12px rgba(2, 6, 23, 0.8)"
    },
    layoutConfig: {
      heroStyle: "Hero Mega Portal Slider tràn viền với thanh chỉ số phân phối phía trên",
      navigationStyle: "Enterprise Dark Header với Mega Dropdown đa tầng",
      cardStyle: "Dark Slate Card với Tag phân loại: Đang bàn giao / Đang triển khai / Sắp mở bán",
      galleryStyle: "Multi-tab Enterprise Grid với bộ lọc khu vực Bắc/Trung/Nam",
      ctaStyle: "Cyan Glow Button chuyên nghiệp",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: ["HeroMegaPortalSlider", "MultiProjectFilterGrid", "InvestorStockTickerBar", "CSRCommunityImpact", "MediaNewsroomCenter"],
    sectionConfig: {
      sourceSlug: "mega-developer",
      heroTitle: "KIẾN TẠO BIỂU TƯỢNG — NÂNG TẦM VỊ THẾ",
      heroSubtitle: "Tập đoàn Phát triển Đô thị và Phân phối Bất động sản hàng đầu với quỹ dự án trải dài trên các tỉnh thành trọng điểm."
    }
  },

  // ─── 13. AUCTION TEMPLATE ───────────────────────────────────────────────────
  {
    id: "bds-13",
    name: "BĐS 13 — Sàn Đấu Giá Bất Động Sản",
    slug: "bds-13",
    collectionSlug: "commercial",
    collectionName: "Auction & Public Bidding",
    badge: "MẪU 13",
    badgeBg: "#FEE2E2",
    badgeColor: "#EF4444",
    accentColor: "#EF4444",
    description: "Sàn giao dịch đấu giá và tài sản phát mãi ngân hàng minh bạch. Đồng hồ đếm ngược phiên đấu giá, tra cứu hồ sơ pháp lý công chứng và bảng đặt giá khởi điểm trực tuyến.",
    shortDescription: "Sàn đấu giá · Tài sản phát mãi · Giá khởi điểm",
    thumbnail: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hệ thống đấu giá trực tuyến", "Đồng hồ đếm ngược bước giá", "Hồ sơ pháp lý kiểm duyệt", "Đặt cọc tham gia đấu giá"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 699000,
    isActive: true,
    sortOrder: 13,
    targetAudience: ["Sàn đấu giá BĐS", "Tài sản phát mãi ngân hàng", "Sàn thanh lý nhà đất công ty chứng khoán", "Đơn vị ủy thác xử lý nợ"],
    highlights: ["Sàn đấu giá trực tuyến", "Đồng hồ đếm ngược phiên đấu", "Pháp lý tài sản minh bạch", "Tra cứu giá khởi điểm"],
    availablePages: ["Trang chủ Đấu giá", "Danh sách Tài sản đang đấu", "Quy chế & Thể lệ", "Hồ sơ pháp lý", "Liên hệ"],
    modules: ["Auction Bidding Engine", "Live Timer Countdown", "Legal Document Download", "Zalo & Hotline Đấu Giá"],
    benefits: ["Minh bạch thông tin tài sản đấu giá", "Tạo sự tin tưởng tuyệt đối cho người tham gia đấu giá", "Quy trình đăng ký đấu giá nhanh chóng"],
    themeConfig: {
      fontHeading: "Inter, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#DC2626",
      secondaryColor: "#991B1B",
      accentColor: "#EF4444",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "10px",
      shadowToken: "0 10px 25px -5px rgba(220, 38, 38, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Search box nổi bật kèm thẻ đếm ngược phiên đấu giá trực tiếp",
      navigationStyle: "Sticky Dark Header với điểm nhấn đỏ cảnh báo",
      cardStyle: "Grid card kèm đồng hồ đếm ngược và bước giá khởi điểm",
      galleryStyle: "Grid tài sản theo tình trạng: Đang đấu / Sắp đấu / Đã chốt",
      ctaStyle: "Bold Red Button tạo cảm giác khẩn trương",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroAuctionSearch", "LiveBiddingCountdowns", "VerifiedLegalShowcase", "HowToBidGuide", "AuctionContactFooter"],
    sectionConfig: {
      sourceSlug: "auction-template",
      heroTitle: "SÀN ĐẤU GIÁ BẤT ĐỘNG SẢN & TÀI SẢN PHÁT MÃI",
      heroSubtitle: "Tra cứu danh mục tài sản đấu giá minh bạch pháp lý với mức giá khởi điểm hấp dẫn nhất thị trường."
    }
  },

  // ─── 14. LAND PLOT TEMPLATE ─────────────────────────────────────────────────
  {
    id: "bds-14",
    name: "BĐS 14 — Đất Nền Quy Hoạch",
    slug: "bds-14",
    collectionSlug: "project",
    collectionName: "Land Plot & Subdivision",
    badge: "MẪU 14",
    badgeBg: "#FEF3C7",
    badgeColor: "#D97706",
    accentColor: "#D4A373",
    description: "Landing page chuyên dụng cho dự án đất nền phân lô, khu đô thị quy hoạch 1/500, đất sổ đỏ thổ cư. Bản đồ phân lô trực quan, tra cứu vị trí lô đất và báo giá F1.",
    shortDescription: "Đất nền phân lô · Quy hoạch 1/500 · Sổ đỏ",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Mặt bằng phân lô trực quan", "Bản đồ liên kết vùng hạ tầng", "Báo giá từng lô đất nền", "Hồ sơ pháp lý quy hoạch 1/500"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 14,
    targetAudience: ["Chủ đầu tư dự án đất nền", "Đại lý phân phối đất nền địa phương", "Sàn bán đất thổ cư có sổ", "Khu dân cư mới quy hoạch"],
    highlights: ["Sơ đồ phân lô 1/500 tương tác", "Bản đồ kết nối cao tốc & hạ tầng", "Tra cứu pháp lý sổ đỏ từng nền", "Form chọn vị trí lô đẹp"],
    availablePages: ["Trang chủ Đất Nền", "Sơ đồ Phân lô", "Vị trí & Hạ tầng", "Pháp lý 1/500", "Bảng giá & Liên hệ"],
    modules: ["Interactive Masterplan Map", "Plot Availability Checker", "Price Sheet Download", "Zalo Sales Router"],
    benefits: ["Khách hàng dễ dàng hình dung quy hoạch và vị trí lô đất", "Tăng tỷ lệ khách đặt cọc giữ chỗ lô đẹp", "Minh bạch pháp lý tạo niềm tin"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#D97706",
      secondaryColor: "#92400E",
      accentColor: "#F59E0B",
      bgColor: "#FEFCE8",
      cardBgColor: "#FFFFFF",
      textColor: "#451A03",
      radiusToken: "12px",
      shadowToken: "0 15px 30px rgba(217, 119, 6, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Split Layout kết hợp Sơ đồ phân lô 1/500 và Form chọn lô",
      navigationStyle: "Earthy Warm Header với thanh menu tinh gọn",
      cardStyle: "Card bo góc 12px viền vàng đất ấm áp với thông số diện tích m2",
      galleryStyle: "Map Grid kết hợp hình ảnh hạ tầng thực tế",
      ctaStyle: "Amber Solid Button với icon vị trí",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroSplitLandPlot", "SubdivisionMasterplan", "InfrastructureConnections", "LegalCertificateShowcase", "PlotBookingForm"],
    sectionConfig: {
      sourceSlug: "landplot-template",
      heroTitle: "DỰ ÁN ĐẤT NỀN KHU ĐÔ THỊ MỚI",
      heroSubtitle: "Sở hữu quỹ đất vàng sổ đỏ từng nền, hạ tầng điện âm nước máy hoàn thiện 100% cùng pháp lý quy hoạch 1/500 hoàn chỉnh."
    }
  },

  // ─── 15. RETAIL PODIUM ──────────────────────────────────────────────────────
  {
    id: "bds-15",
    name: "BĐS 15 — Shophouse Thương Mại",
    slug: "bds-15",
    collectionSlug: "retail",
    collectionName: "Retail & Commercial",
    badge: "MẪU 15",
    badgeBg: "#FFF7ED",
    badgeColor: "#EA580C",
    accentColor: "#EA580C",
    description: "Template chuyên dụng cho Shophouse khối đế, Mặt bằng kinh doanh, Trung tâm thương mại và Nhà phố thương mại sầm uất. Sơ đồ gian hàng 3D và form đăng ký thuê/mua.",
    shortDescription: "Shophouse khối đế · Mặt bằng TTTM · Kinh doanh",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519567281023-eb3e9b1390d4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Sơ đồ gian hàng kinh doanh 3D", "Bộ lọc diện tích & vị trí mặt bằng", "Phân tích lưu lượng khách mua sắm", "Form đăng ký thuê / mua nhanh"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 599000,
    isActive: true,
    sortOrder: 15,
    targetAudience: ["Chủ đầu tư trung tâm thương mại", "Shophouse khối đế chung cư", "Chuỗi bán lẻ & F&B tìm mặt bằng", "Nhà phố thương mại kinh doanh"],
    highlights: ["Sơ đồ gian hàng Retail 3D", "Phân tích lưu lượng khách Foot-Traffic", "Danh mục mặt bằng cho thuê & chuyển nhượng", "Biểu phí thuê & tiến độ thanh toán"],
    availablePages: ["Trang chủ Retail", "Danh sách Mặt bằng", "Sơ đồ TTTM", "Chính sách Cho thuê", "Liên hệ Đặt chỗ"],
    modules: ["Store Locator Interactive", "Leasing Booking Form", "Foot Traffic Analytics Widget", "Zalo Commercial"],
    benefits: ["Hiển thị trực quan vị trí mặt tiền, lưu lượng người qua lại", "Thu hút các thương hiệu F&B và bán lẻ lớn", "Tối ưu công suất cho thuê gian hàng"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#EA580C",
      secondaryColor: "#C2410C",
      accentColor: "#F97316",
      bgColor: "#FFF7ED",
      cardBgColor: "#FFFFFF",
      textColor: "#431407",
      radiusToken: "12px",
      shadowToken: "0 15px 30px rgba(234, 88, 12, 0.12)"
    },
    layoutConfig: {
      heroStyle: "Vibrant Hero Grid với chỉ số lưu lượng cư dân và hình ảnh phố đi bộ sầm uất",
      navigationStyle: "Warm Orange Header năng động",
      cardStyle: "Modern Retail Card với Tag loại hình: Ẩm thực / Thời trang / Dịch vụ",
      galleryStyle: "Masonry Retail Showcase",
      ctaStyle: "Orange Bold Button với icon mặt bằng",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroRetailShowcase", "MallFloorplanNavigator", "FootTrafficMetrics", "AvailableUnitsGrid", "CommercialLeaseCTA"],
    sectionConfig: {
      sourceSlug: "retail-podium",
      heroTitle: "MẶT BẰNG KINH DOANH & SHOPHOUSE KHỐI ĐẾ",
      heroSubtitle: "Tọa lạc tại vị trí trung tâm đại đô thị với lưu lượng hơn 50.000 cư dân sẵn có, cơ hội đầu tư sinh lời vượt trội."
    }
  },

  // ─── 16. PERSONAL AGENT ─────────────────────────────────────────────────────
  {
    id: "bds-16",
    name: "BĐS 16 — Môi Giới Nhà Đất",
    slug: "bds-16",
    collectionSlug: "agent",
    collectionName: "Personal Broker & Consultant",
    badge: "MẪU 16",
    badgeBg: "#EEF2FF",
    badgeColor: "#4F46E5",
    accentColor: "#4F46E5",
    description: "Template xây dựng thương hiệu cá nhân đỉnh cao dành cho chuyên viên tư vấn BĐS triệu đô. Giới thiệu hồ sơ năng lực, giỏ hàng độc quyền, đánh giá khách hàng và nút Zalo một chạm.",
    shortDescription: "Môi giới cá nhân · Top Broker · Zalo 1 chạm",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Profile chuyên nghiệp Top Broker", "Slider dự án đang nắm giữ", "Đánh giá khách hàng 5 sao", "Đặt lịch tư vấn 1-1 qua Zalo"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 399000,
    isActive: true,
    sortOrder: 16,
    targetAudience: ["Môi giới cá nhân độc lập", "Top Performer sàn BĐS", "Chuyên gia tư vấn đầu tư", "Trưởng nhóm kinh doanh"],
    highlights: ["Profile Chuyên Nghiệp Top Broker", "Slider Giỏ hàng Độc quyền", "Đánh giá & Lời chứng thực 5 sao", "Form Đặt lịch tư vấn riêng tư"],
    availablePages: ["Trang chủ Cá Nhân (One Page Tối Ưu)"],
    modules: ["Personal Booking Calendar", "Client Testimonials Carousel", "Zalo 1-Touch Call", "Listing Portfolio Showcase"],
    benefits: ["Xây dựng thương hiệu cá nhân uy tín, chuyên nghiệp vượt trội", "Khách hàng tin tưởng và dễ dàng liên hệ tư vấn qua Zalo", "Trình bày danh mục dự án cá nhân khoa học"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#4F46E5",
      secondaryColor: "#6366F1",
      accentColor: "#4F46E5",
      bgColor: "#FFFFFF",
      cardBgColor: "#F9FAFB",
      textColor: "#1F2937",
      radiusToken: "16px",
      shadowToken: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Hero Portrait sang trọng của chuyên viên kết hợp các con số thành tích",
      navigationStyle: "Floating Pill Glass Header",
      cardStyle: "Soft Shadow Card với hình ảnh chân dung và huy hiệu Top Performer",
      galleryStyle: "Listing Carousel mượt mà",
      ctaStyle: "Indigo Gradient Button với hiệu ứng phát sáng",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroBrokerPortrait", "AchievementStatsBar", "ExclusiveListingCarousel", "ClientTestimonialsSlider", "BookPrivateConsultation"],
    sectionConfig: {
      sourceSlug: "personal-agent",
      heroTitle: "CHUYÊN VIÊN TƯ VẤN BẤT ĐỘNG SẢN CAO CẤP",
      heroSubtitle: "Đồng hành cùng quý khách hàng tìm kiếm không gian sống lý tưởng và giải pháp đầu tư sinh lời an toàn, bền vững."
    }
  },

  // ─── 17. CỔNG THÔNG TIN BẤT ĐỘNG SẢN SỐ 1 (HOT PORTAL) ──────────────────────
  {
    id: "bds-17",
    name: "BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1",
    slug: "bds-17",
    collectionSlug: "portal",
    collectionName: "Cổng Tin BĐS & Sàn Thương Mại",
    badge: "MẪU 17",
    badgeBg: "#EFF6FF",
    badgeColor: "#2563EB",
    accentColor: "#2563EB",
    description: "Template Cổng thông tin & Sàn niêm yết BĐS quy mô lớn số 1 Việt Nam. Đầy đủ bộ lọc đa năng tìm kiếm theo khu vực/tỉnh thành, danh mục mua bán, cho thuê, dự án tiêu điểm, công cụ tính lãi vay ngân hàng và form ký gửi trực tuyến.",
    shortDescription: "Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hero Search đa năng theo danh mục", "Lưới 8 BĐS Mua bán & 8 BĐS Cho thuê", "Spotlight Dự án đại đô thị nổi bật", "Bản đồ phân vùng các thành phố lớn", "Máy tính lãi vay mua nhà ngân hàng", "Form đăng ký ký gửi trực tuyến"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 17,
    targetAudience: ["Sàn giao dịch BĐS quy mô lớn", "Cổng thông tin & niêm yết nhà đất", "Tập đoàn môi giới đa tỉnh thành", "Chủ đầu tư phân phối nhiều dự án"],
    highlights: ["Bộ lọc thông minh theo Tỉnh/Thành & Loại hình", "Dự án Spotlight Slider với thông số chi tiết", "Phân khúc Nhà đất bán & Cho thuê tách biệt", "Công cụ Bank Loan Calculator tính lãi vay tự động", "Chuyên mục Tin tức & Cẩm nang thị trường"],
    availablePages: ["Trang chủ Cổng thông tin", "Nhà đất bán", "Nhà đất cho thuê", "Dự án BĐS", "Chi tiết tin đăng BĐS", "Tin tức thị trường", "Liên hệ & Ký gửi"],
    modules: ["Omni-Search Engine", "Bank Loan Calculator", "City Directory Cards", "Rental Split Cards", "Property Booking Modal", "Online Listing Submission"],
    benefits: ["Giao diện chuẩn cổng thông tin số 1 tạo uy tín vượt trội", "Khách hàng dễ dàng tìm kiếm BĐS theo nhu cầu bán hoặc thuê", "Tự động thu thập khách hàng tiềm năng qua form ký gửi và tính lãi vay"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#2563EB",
      secondaryColor: "#1E40AF",
      accentColor: "#3B82F6",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "16px",
      shadowToken: "0 20px 25px -5px rgba(37, 99, 235, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Hero Blue Gradient với thanh tìm kiếm đa năng và hàng icon danh mục BĐS",
      navigationStyle: "Navy Topbar kết hợp White Navbar dính",
      cardStyle: "Card trắng bo góc 16px bóng mờ viền xanh công nghệ",
      galleryStyle: "4x2 Grid bán và 2x4 Horizontal Grid cho thuê",
      ctaStyle: "Blue Vibrant Button kèm icon",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: ["HeroSearchPortal", "FeaturedSaleGrid", "SpotlightProjectCarousel", "RentalHorizontalGrid", "TopCitiesShowcase", "MarketNewsGrid", "NewsletterSubscription"],
    sectionConfig: {
      sourceSlug: "portal-listing",
      heroTitle: "TRANG TIN BẤT ĐỘNG SẢN SỐ 1 VIỆT NAM",
      heroSubtitle: "Hàng ngàn sản phẩm nhà đất, căn hộ, biệt thự và dự án sinh lời được cập nhật liên tục mỗi ngày."
    }
  },

  // ─── 18. BẮT ĐỘNG SẢN 123 BẾN THÀNH PORTAL ───────────────────────────────
  {
    id: "bds-18",
    name: "BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành",
    slug: "bds-18",
    collectionSlug: "portal",
    collectionName: "Portal & Đấu Giá",
    badge: "HOT 🔥",
    badgeBg: "#DBEAFE",
    badgeColor: "#1E40AF",
    accentColor: "#0072BC",
    description: "Cổng thông tin bất động sản & sàn dịch vụ đấu giá Bến Thành. Tìm kiếm đa năng theo khu vực, dự án mở bán, tin bán & cho thuê 4 cột, chủ đầu tư và hotline tổng đài.",
    shortDescription: "Sàn Đấu Giá Bến Thành · Phân tầng khu vực · Lưới 4 cột",
    thumbnail: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509030450996-93781297593c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Bất động sản theo 6 tỉnh thành", "Slider dự án nổi bật", "Lưới tin bán & cho thuê 4 cột", "Tổng đài CSKH 24/7"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 18,
    targetAudience: ["Sàn giao dịch BĐS", "Cổng thông tin đấu giá", "Đại lý phân phối dự án toàn quốc", "Công ty địa ốc quy mô lớn"],
    highlights: ["Bộ lọc tìm kiếm 2 tab Mua/Thuê", "Grid 6 Vùng kinh tế trọng điểm", "Showcase Chủ đầu tư uy tín", "Bản đồ Google Maps tương tác"],
    availablePages: ["Trang chủ Bến Thành", "Nhà đất bán", "Nhà đất cho thuê", "Dự án mở bán", "Chi tiết BĐS", "Liên hệ & Trụ sở"],
    modules: ["Search Box Phân Tầng", "Region Cards Grid", "Developer Showcase", "Call Center Strip", "Interactive Google Maps", "Zalo Booking"],
    benefits: ["Đầy đủ module cho sàn giao dịch chuyên nghiệp", "Khách hàng dễ tra cứu bất động sản theo tỉnh thành", "Tích hợp tổng đài hỗ trợ 24/7"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#0072BC",
      secondaryColor: "#0F172A",
      accentColor: "#DC2626",
      bgColor: "#F4F6F9",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "16px",
      shadowToken: "0 10px 15px -3px rgba(0, 114, 188, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Thanh tìm kiếm phân tầng theo danh mục và khu vực",
      navigationStyle: "Blue Topbar kết hợp White Navbar dính",
      cardStyle: "Card trắng 4 cột hiện đại có tag VIP và giá đỏ",
      galleryStyle: "4-column Responsive Grid",
      ctaStyle: "Red Đăng Tin Button & Blue Search Button",
      spacingScale: "8pt Grid — Section Padding 80px Desktop"
    },
    wireframe: ["HeroSearchBds123", "RegionsGridShowcase", "FeaturedProjectsCarousel", "SaleListings4Col", "RentListings4Col", "DevelopersShowcase", "HotlineStripBanner"],
    sectionConfig: {
      sourceSlug: "bds123-portal",
      heroTitle: "TÌM KIẾM BẤT ĐỘNG SẢN GIÁ TỐT",
      heroSubtitle: "Kênh thông tin mua bán, cho thuê nhà đất số 1 Việt Nam với hàng ngàn tin đăng được xác thực mỗi ngày."
    }
  },

  // ─── 19. NHÀ ĐẤT SỐ HIGH-DENSITY LISTING PORTAL ─────────────────────────
  {
    id: "bds-19",
    name: "BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số",
    slug: "bds-19",
    collectionSlug: "portal",
    collectionName: "Sàn Rao Vặt BĐS",
    badge: "CHUẨN VIỆT NAM",
    badgeBg: "#D1FAE5",
    badgeColor: "#065F46",
    accentColor: "#1E8449",
    description: "Giao diện sàn niêm yết mật độ cao Nhà Đất Số. Bộ lọc 6 tiêu chí nhanh, tin nóng tiêu điểm, danh sách tin bán/thuê có badge giá xanh, sidebar tỉnh thành & cẩm nang phong thủy.",
    shortDescription: "Mật độ cao · Lọc 6 tiêu chí · Phong thủy nhà đất",
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Bộ lọc 6 tiêu chí (Tỉnh/Quận/Phường/Hướng/Giá)", "Danh sách tin dạng List View mật độ cao", "Sidebar tra cứu tỉnh thành & phong thủy", "Đăng tin & bản đồ Google Maps"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 19,
    targetAudience: ["Sàn giao dịch rao vặt BĐS", "Cộng đồng môi giới nhà đất tự do", "Báo mạng điện tử bất động sản", "Trung tâm môi giới thổ cư"],
    highlights: ["Layout 2 Cột chuẩn báo mạng BĐS", "Thanh lọc nhanh 6 tiêu chí", "Tra cứu phong thủy & hướng nhà", "Banner quảng cáo chuyên nghiệp"],
    availablePages: ["Trang chủ Nhà Đất Số", "Nhà đất bán", "Nhà đất cho thuê", "Nhà đất sang nhượng", "Tin tức & Phong thủy", "Liên hệ sàn"],
    modules: ["Multi-Criteria Filter Bar", "High-Density Listing List", "Fengshui Calculator", "Sidebar Province Directory", "Facebook Fanpage Widget"],
    benefits: ["Mật độ thông tin cao, trải nghiệm xem nhiều tin nhanh chóng", "Phù hợp thói quen người dùng Việt Nam", "Dễ dàng đăng tin miễn phí"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#1E8449",
      secondaryColor: "#1C2833",
      accentColor: "#48C774",
      bgColor: "#F0F2F5",
      cardBgColor: "#FFFFFF",
      textColor: "#1C2833",
      radiusToken: "6px",
      shadowToken: "0 2px 4px rgba(0, 0, 0, 0.05)"
    },
    layoutConfig: {
      heroStyle: "Thanh tìm kiếm ngang đa tiêu chí với số lượng tin trực tuyến",
      navigationStyle: "Dark Topbar kết hợp Green Menu Bar",
      cardStyle: "Card danh sách ngang mật độ cao có badge giá xanh lá",
      galleryStyle: "2-Column Portal Layout (Main Content + Sidebar Widgets)",
      ctaStyle: "Emerald Green Search & Post Button",
      spacingScale: "6pt Grid — High Density Newspaper Style"
    },
    wireframe: ["HeaderNhadatso", "MultiCriteriaFilterBar", "MainNewsHeadline", "VIPCarousel3Col", "SaleHorizontalList", "RentHorizontalList", "SidebarProvincesFengshui", "FooterNhadatso"],
    sectionConfig: {
      sourceSlug: "nhadatso-density",
      heroTitle: "KÊNH THÔNG TIN BẤT ĐỘNG SẢN VIỆT NAM",
      heroSubtitle: "Đăng tin rao vặt bất động sản, tra cứu giá nhà đất và cẩm nang phong thủy chính xác nhất."
    }
  }
,
  // ─── 20. MINH KHAI APARTMENT LUXURY ───────────────────────────────────────
  {
    id: "bds-20",
    name: "BĐS 20 — Chung Cư Minh Khai & Times City",
    slug: "bds-20",
    collectionSlug: "luxury",
    collectionName: "Căn Hộ Thượng Lưu",
    badge: "MỚI 🔥",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
    accentColor: "#D97706",
    description: "Giao diện chung cư Minh Khai phong cách Hoàng gia đẳng cấp thượng lưu. Lưới 8 dự án căn hộ, Accordion FAQ giải đáp nhanh kèm form tư vấn bảng giá đợt 1 và đối tác lớn.",
    shortDescription: "Chung cư Minh Khai · Times City · FAQ Accordion",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Lưới 8 dự án căn hộ cao cấp Minh Khai", "FAQ Accordion giải đáp pháp lý/vay vốn", "Form đăng ký nhận bảng giá đợt 1", "Logo đối tác chiến lược Vingroup/Sun Group"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 20,
    targetAudience: ["Đại lý phân phối dự án căn hộ", "Sàn F1 chuyên chung cư cao cấp", "Chủ đầu tư tòa nhà cao tầng", "Chuyên viên môi giới Times City"],
    highlights: ["Hero Fullscreen Đẳng Cấp Thượng Lưu", "8 Card dự án căn hộ có specs chi tiết", "Accordion câu hỏi thường gặp tương tác", "Form thu thập lead tích hợp Zalo"],
    availablePages: ["Trang chủ", "Giới thiệu", "Dự án căn hộ", "Tin tức", "Thư viện", "Kiến thức", "Tuyển dụng", "Liên hệ & Bản đồ"],
    modules: ["Apartment Grid Showcase", "FAQ Accordion System", "Lead Consultation Box", "Strategic Partners Carousel", "Floating Contact Bar"],
    benefits: ["Tăng uy tín và tỷ lệ chốt khách căn hộ cao cấp", "Khách hàng dễ dàng tra cứu câu hỏi và giá từng dự án", "Tối ưu thu lead tự động qua Zalo"],
    themeConfig: {
      fontHeading: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#D97706",
      secondaryColor: "#0E131F",
      accentColor: "#F59E0B",
      bgColor: "#FDFBF7",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(217, 119, 6, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero tối màu sang trọng với hồ bơi resort ánh hoàng hôn",
      navigationStyle: "White Navbar với Logo Đại Bàng Vàng ở chính giữa",
      cardStyle: "Card trắng bo góc 16px viền vàng kim cao cấp",
      galleryStyle: "4-column Project Grid",
      ctaStyle: "Gold Gradient Button",
      spacingScale: "8pt Grid — Spacing 80px Desktop"
    },
    wireframe: ["HeaderEagleLogo", "HeroLuxuryPool", "Apartment8Grid", "FaqAccordionLeadForm", "StrategicPartners", "FooterMinhKhai"],
    sectionConfig: {
      sourceSlug: "minhkhai-apartment",
      heroTitle: "DỰ ÁN CHUNG CƯ MINH KHAI",
      heroSubtitle: "Kiến tạo không gian sống hoàn mỹ, nâng tầm giá trị cho cuộc sống thượng lưu."
    }
  },

  // ─── 21. CHỢ THUÊ CHUNG CƯ HÀ NỘI ──────────────────────────────────────────
  {
    id: "bds-21",
    name: "BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội",
    slug: "bds-21",
    collectionSlug: "portal",
    collectionName: "Cổng Cho Thuê BĐS",
    badge: "MỚI 🔥",
    badgeBg: "#DBEAFE",
    badgeColor: "#1D4ED8",
    accentColor: "#0066B2",
    description: "Cổng thông tin chuyên biệt cho thuê và mua bán căn hộ chung cư tại Hà Nội. Thanh tìm kiếm 5 quận trọng điểm, Visual District Cards và lưới tin giá tốt cập nhật mỗi giờ.",
    shortDescription: "Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt",
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Pills lọc nhanh 5 quận (Nam Từ Liêm, Cầu Giấy...)", "Visual District Cards đếm số lượng tin", "Lưới 8 căn hộ cho thuê & 4 căn hộ bán", "Google Maps tích hợp ở chân trang"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 21,
    targetAudience: ["Môi giới chuyên cho thuê chung cư", "Văn phòng nhà đất khu vực Hà Nội", "Sàn giao dịch căn hộ thứ cấp", "Hệ thống quản lý căn hộ dịch vụ"],
    highlights: ["Tone xanh dương tin cậy #0066B2", "Bộ lọc 6 trường thông số chính xác", "Khối quận huyện trực quan có ảnh đại diện", "Form đăng ký nhận báo giá nhanh"],
    availablePages: ["Trang chủ", "Chung cư cho thuê", "Chung cư bán", "Dự án Hà Nội", "Cần mua - Cần thuê", "Đăng tin", "Liên hệ"],
    modules: ["District Visual Directory", "Hanoi Rental 8-Grid", "Hanoi Sale 4-Grid", "Footer Google Maps Embed", "Quick Quote Request"],
    benefits: ["Khách thuê tìm nhà nhanh chóng theo đúng quận mong muốn", "Giao diện thân thiện, chuẩn văn hóa tìm nhà tại Hà Nội", "Tỷ lệ chuyển đổi liên hệ thuê nhà rất cao"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#0066B2",
      secondaryColor: "#0D3B66",
      accentColor: "#F59E0B",
      bgColor: "#F4F6F9",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "12px",
      shadowToken: "0 4px 6px -1px rgba(0, 102, 178, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Thanh tìm kiếm ngang kèm hàng nút chọn quận huyện nổi bật",
      navigationStyle: "Blue Header dính kèm nút Đăng Tin cam",
      cardStyle: "Card trắng nhỏ gọn hiển thị mức giá thuê/tháng nổi bật",
      galleryStyle: "District Asymmetrical Grid + 4-column Product Grid",
      ctaStyle: "Blue Solid Button & Amber Post Button",
      spacingScale: "6pt Grid — Spacing 64px Desktop"
    },
    wireframe: ["HeaderHanoiRental", "HeroDistrictFilterBar", "VisualDistrictCards", "RentalGrid8", "SaleGrid4", "FooterHanoiMap"],
    sectionConfig: {
      sourceSlug: "hanoi-rental",
      heroTitle: "CHO THUÊ CHUNG CƯ TẠI HÀ NỘI",
      heroSubtitle: "Hàng ngàn căn hộ cho thuê giá tốt nhất từ chính chủ tại Nam Từ Liêm, Cầu Giấy, Thanh Xuân..."
    }
  },

  // ─── 22. HAPPY LAND NHA TRANG (ZoHotels Resort) ───────────────────────────
  {
    id: "bds-22",
    name: "BĐS 22 — ZoHotels & Happy Land Nha Trang",
    slug: "bds-22",
    collectionSlug: "resort",
    collectionName: "Condotel & Biển",
    badge: "MỚI 🔥",
    badgeBg: "#FFEDD5",
    badgeColor: "#C2410C",
    accentColor: "#EA580C",
    description: "Giao diện khách sạn căn hộ nghỉ dưỡng ven biển Happy Land Nha Trang. 6 phân hạng phòng view biển, Tab tiện ích nội/ngoại khu, Video feedback và banner ưu đãi 50% Grand Opening.",
    shortDescription: "Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%",
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hệ thống 6 phân hạng căn hộ nghỉ dưỡng view biển", "Tab tiện ích Nội Khu / Ngoại Khu trực quan", "Banner khuyến mãi Grand Opening 50% OFF", "Dải đăng ký nhận ưu đãi màu cam nổi bật"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 22,
    targetAudience: ["Khách sạn căn hộ Condotel biển", "Chủ chuỗi căn hộ Homestay du lịch", "Resort nghỉ dưỡng ven biển", "Công ty vận hành khai thác căn hộ du lịch"],
    highlights: ["Tone màu cam nhiệt huyết #EA580C", "Hero Facade kiến trúc mặt kính hiện đại", "Video review trải nghiệm khách hàng", "Cẩm nang du lịch & ẩm thực địa phương"],
    availablePages: ["Trang chủ", "Giới thiệu", "Căn hộ nghỉ dưỡng", "Dịch vụ", "Thư viện ảnh", "Tin tức", "Liên hệ & Đặt phòng"],
    modules: ["Room Showcase Grid", "Tabbed Amenities System", "Customer Review Videos", "Promo 50% Banner Box", "Orange Newsletter Strip"],
    benefits: ["Thu hút khách du lịch đặt phòng trực tiếp", "Tôn vinh vẻ đẹp cảnh quan và tiện ích 5 sao", "Tích hợp hotline & Zalo đặt phòng nhanh"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#EA580C",
      secondaryColor: "#1C1814",
      accentColor: "#F97316",
      bgColor: "#FAF9F5",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(234, 88, 12, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero toà nhà kính sang trọng với lời chào đón nồng ấm",
      navigationStyle: "White Navbar với Logo ZoHotels và Hotline cam nổi bật",
      cardStyle: "Card trắng bo góc 16px có tag loại phòng và giá theo đêm",
      galleryStyle: "3-column Room Cards Grid",
      ctaStyle: "Vibrant Orange Rounded Button",
      spacingScale: "8pt Grid — Spacing 80px Desktop"
    },
    wireframe: ["HeaderZoHotels", "HeroFacadeWelcome", "RoomsGrid6", "TabbedAmenitiesSection", "GrandOpening50Promo", "NewsletterOrangeStrip", "FooterZoHotels"],
    sectionConfig: {
      sourceSlug: "happyland-resort",
      heroTitle: "HAPPY LAND NHA TRANG",
      heroSubtitle: "Tổ hợp căn hộ khách sạn dịch vụ cao cấp bậc nhất vịnh biển Nha Trang."
    }
  },

  // ─── 23. HOMEO MULTI-THUMBNAIL PROPERTY CARDS ────────────────────────────
  {
    id: "bds-23",
    name: "BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo",
    slug: "bds-23",
    collectionSlug: "agency",
    collectionName: "Sàn Nhà Phố",
    badge: "MỚI 🔥",
    badgeBg: "#FFE4E6",
    badgeColor: "#9F1239",
    accentColor: "#881337",
    description: "Giao diện sàn giao dịch Homeo với card sản phẩm đặc biệt: 1 ảnh lớn kết hợp 3 ảnh phụ bên dưới giúp khách hàng xem trọn vẹn mọi góc nhà. Kèm chuyên mục Người mua hàng thông minh.",
    shortDescription: "Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Card sản phẩm 1 ảnh to + 3 ảnh nhỏ chi tiết", "Tabs tìm kiếm Mua Bán / Cho Thuê / Dự Án", "Khối Người mua hàng thông minh (6 cẩm nang)", "Nút Đăng Tin Miễn Phí tone đỏ rượu vang"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 23,
    targetAudience: ["Công ty môi giới nhà phố thổ cư", "Sàn phân phối biệt thự liền kề", "Đội ngũ chuyên viên tư vấn BĐS", "Nền tảng đăng tin nhà đất"],
    highlights: ["Tone màu Burgundy quý phái #881337", "Trình bày đa ảnh trực quan ngay trên card", "Chuyên mục chia sẻ kinh nghiệm tránh bẫy mua nhà", "Tìm kiếm nhanh theo địa điểm"],
    availablePages: ["Trang chủ", "Dự án mới", "Bán nhà", "Cho thuê", "Cẩm nang người mua", "Đăng tin", "Liên hệ"],
    modules: ["Multi-Thumbnail Card Component", "Smart Buyer Knowledge Grid", "Search Tabs Engine", "Lead Capture Modal"],
    benefits: ["Khách hàng xem được nhiều ảnh nhà mà không cần bấm mở nhiều trang", "Xây dựng hình ảnh chuyên nghiệp và đáng tin cậy", "Tối ưu hóa chuyển đổi liên hệ trực tiếp"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#881337",
      secondaryColor: "#1C1D21",
      accentColor: "#BE123C",
      bgColor: "#FDFDFD",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "16px",
      shadowToken: "0 10px 20px -5px rgba(136, 19, 55, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Hero tối màu ấm cúng với ô tìm kiếm dạng Tab",
      navigationStyle: "Dark Header dính kết hợp nút Đăng Tin Burgundy",
      cardStyle: "Card đa ảnh (1 lớn + 3 nhỏ) hiện đại và chuyên nghiệp",
      galleryStyle: "3-column Multi-Thumbnail Grid",
      ctaStyle: "Burgundy Wine Solid Button",
      spacingScale: "8pt Grid — Spacing 80px Desktop"
    },
    wireframe: ["HeaderHomeo", "HeroSearchTabs", "NewProjectsMultiThumbGrid", "SmartBuyerGuide6", "FooterHomeo"],
    sectionConfig: {
      sourceSlug: "homeo-multithumb",
      heroTitle: "TÌM KIẾM NGÔI NHÀ BẠN YÊU THÍCH",
      heroSubtitle: "Hàng ngàn sản phẩm nhà phố, biệt thự và căn hộ chính chủ cập nhật liên tục."
    }
  },

  // ─── 24. REALTYBUILD TECH REAL ESTATE PORTAL ──────────────────────────────
  {
    id: "bds-24",
    name: "BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam",
    slug: "bds-24",
    collectionSlug: "portal",
    collectionName: "Cổng Thông Tin Công Nghệ",
    badge: "MỚI 🔥",
    badgeBg: "#E0F2FE",
    badgeColor: "#0369A1",
    accentColor: "#0284C7",
    description: "Cổng thông tin BĐS phong cách công nghệ cao RealtyBuild. Thanh tìm kiếm icon pills (Đất thổ, Đất nền, Chung cư...), Spotlight dự án lớn, 6 thành phố trọng điểm và tin tức thị trường.",
    shortDescription: "RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509030450996-93781297593c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: ["Hero Search kèm Icon Pills loại hình BĐS", "Spotlight dự án nổi bật Vinhomes Green Bay", "Grid 6 thành phố lớn toàn quốc", "Lưới 8 BĐS Đang Bán chuẩn công nghệ"],
    priceBuy: 499000,
    priceBuySource: 799000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 24,
    targetAudience: ["Tập đoàn công nghệ bất động sản PropTech", "Cổng thông tin tin đăng niêm yết", "Sàn giao dịch BĐS đa tỉnh thành", "Chủ đầu tư phân phối nhiều dự án lớn"],
    highlights: ["Tone màu Ocean Blue & Cyan Tech #0284C7", "Thanh tìm kiếm icon pills tương tác mượt mà", "Spotlight Card với thông số dự án chi tiết", "Trang tin tức thị trường & cẩm nang đầu tư"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Dự án tiêu điểm", "Tin tức", "Liên hệ & Bản đồ"],
    modules: ["Icon Pills Search Engine", "Spotlight Project Banner", "City Directory Cards", "Realty Tech 8-Grid", "Newsletter Subscription"],
    benefits: ["Giao diện hiện đại công nghệ tạo uy tín vượt bậc", "Khách hàng dễ dàng tìm kiếm theo loại hình và tỉnh thành", "Tối ưu trải nghiệm trên mọi thiết bị"],
    themeConfig: {
      fontHeading: "Plus Jakarta Sans, sans-serif",
      fontBody: "Inter, sans-serif",
      primaryColor: "#0284C7",
      secondaryColor: "#0F284E",
      accentColor: "#38BDF8",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(2, 132, 199, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Hero xanh đậm công nghệ với hàng icon pills loại hình BĐS",
      navigationStyle: "White Navbar dính với nút hotline màu xanh dương",
      cardStyle: "Card trắng 4 cột hiện đại có nút Xem Ngay xanh nổi bật",
      galleryStyle: "4-column Tech Grid",
      ctaStyle: "Cyan Tech Button",
      spacingScale: "8pt Grid — Spacing 80px Desktop"
    },
    wireframe: ["HeaderRealtyBuild", "HeroIconPillsSearch", "SaleListings8Grid", "SpotlightProjectBanner", "CityCards6Grid", "FooterRealtyBuild"],
    sectionConfig: {
      sourceSlug: "realtybuild-tech",
      heroTitle: "TRANG TIN BẤT ĐỘNG SẢN SỐ 1 VIỆT NAM",
      heroSubtitle: "Tìm kiếm bất động sản, dự án đầu tư và căn hộ cho thuê hàng đầu Việt Nam."
    }
  },
  // ─── PORTAL 01. BATDONGSAN CLASSIC PORTAL ──────────────────────────────────
  {
    id: "portal-01",
    name: "Template #01 - BatDongSan Classic Portal",
    slug: "portal-01",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #01",
    badgeBg: "#D8232A",
    badgeColor: "#FFFFFF",
    accentColor: "#D8232A",
    description: "Cổng thông tin & sàn giao dịch BĐS kinh điển phong cách Batdongsan.com.vn. Bố cục 2 cột với sidebar phải dày đặc, bộ lọc đa tiêu chí thời gian thực, thẻ tin đăng dạng hàng ngang (Horizontal Dense Card), đầy đủ 9 trang con nghiệp vụ.",
    shortDescription: "Sàn giao dịch BĐS · Rao vặt kinh điển · Sidebar dày đặc",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Trang chủ 11 khối chuẩn phong cách Batdongsan",
      "Bộ lọc tìm kiếm đa tiêu chí: Tỉnh/Huyện, Loại BĐS, Khoảng giá, Diện tích",
      "Card tin đăng dạng hàng ngang Horizontal Dense kèm Badge HOT & Đã xác thực",
      "Chi tiết tin đăng kèm Gallery Lightbox, Card môi giới gọi/Zalo, Bản đồ vị trí",
      "Trang Dự án, Tin tức, Giới thiệu, Liên hệ & Ký gửi, Modal Đăng nhập/Đăng ký",
      "Đồng bộ URL Slug mượt mà, hỗ trợ popstate trình duyệt 100%"
    ],
    priceBuy: 699000,
    priceBuySource: 1990000,
    priceRentMonthly: 149000,
    isActive: true,
    sortOrder: 25,
    targetAudience: ["Sàn giao dịch BĐS tổng hợp", "Công ty môi giới nhà đất", "Đội nhóm sale phân phối nhiều dự án", "Cổng thông tin rao vặt địa phương"],
    highlights: ["Horizontal Dense Listing", "Sidebar Phải Dày Đặc", "Bộ Lọc Đa Tiêu Chí Realtime", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["RealtimeFilterModule", "HorizontalDenseCardModule", "ProjectMiniLandingModule", "LeadCaptureModule", "BrokerCardModule", "InteractiveMapModule"],
    benefits: ["Tăng 350% tỷ lệ chuyển đổi khách hàng", "Tiếp cận chuẩn giao diện quen thuộc của người dùng Việt Nam", "Dễ dàng quản lý hàng ngàn tin đăng và dự án"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#D8232A",
      secondaryColor: "#002B49",
      accentColor: "#EAB308",
      bgColor: "#F4F5F7",
      cardBgColor: "#FFFFFF",
      textColor: "#1E293B",
      radiusToken: "0.5rem",
      shadowToken: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Classic Red/Navy Hero với Search Bar nổi trung tâm",
      navigationStyle: "White Navbar với Topbar tiện ích đỏ navy",
      cardStyle: "Horizontal Dense Card (Ảnh trái 4:3, thông số phải)",
      galleryStyle: "4-column Lightbox Grid",
      ctaStyle: "Classic Red Button with Shadow",
      spacingScale: "Classic Dense Layout"
    },
    wireframe: ["HeaderClassic", "HeroSearchBar", "CategoryIcons6Grid", "MainListingWithSidebar", "FeaturedProjects3Grid", "CityLocations6Grid", "NewsAndNewsletter", "FooterClassic"],
    sectionConfig: {
      sourceSlug: "portal-01",
      heroTitle: "TÌM KIẾM NGÔI NHÀ MƠ ƯỚC CỦA BẠN",
      heroSubtitle: "Hơn 100.000+ bất động sản chính chủ, giá tốt, pháp lý minh bạch."
    }
  },
  // ─── PORTAL 02. MODERN METRO PORTAL ───────────────────────────────────────
  {
    id: "portal-02",
    name: "Template #02 - Modern Metro Portal",
    slug: "portal-02",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #02",
    badgeBg: "#1E40AF",
    badgeColor: "#FFFFFF",
    accentColor: "#06B6D4",
    description: "Sàn giao dịch bất động sản đô thị thông minh hiện đại. Bố cục Fullwidth tràn viền, thanh tìm kiếm Glassmorphism nổi bật, lưới thẻ listing 3 cột hiện đại tỉ lệ 16:10, tối ưu cho căn hộ cao cấp và smart city.",
    shortDescription: "Sàn BĐS đô thị hiện đại · Grid 3 cột · Fullwidth thoáng đãng",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Fullwidth hiện đại không dùng sidebar cố định",
      "Thanh tìm kiếm Glassmorphism với bộ lọc đa tiêu chí linh hoạt",
      "Lưới thẻ listing 3 cột (Modern Grid 16:10) hiển thị rõ nét",
      "Trang chi tiết căn hộ với thông số kỹ thuật và bản đồ tích hợp",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án, Tin tức, Giới thiệu, Liên hệ",
      "Tối ưu 100% trải nghiệm chạm lướt trên thiết bị di động"
    ],
    priceBuy: 699000,
    priceBuySource: 1990000,
    priceRentMonthly: 149000,
    isActive: true,
    sortOrder: 26,
    targetAudience: ["Sàn phân phối căn hộ chung cư", "Công ty BĐS công nghệ (PropTech)", "Đội ngũ môi giới dự án đô thị mới", "Sàn cho thuê căn hộ dịch vụ cao cấp"],
    highlights: ["Modern 3-Column Grid", "Glassmorphism Hero Filter", "Fullwidth Clean Layout", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["GlassmorphismSearchModule", "ModernGridCardModule", "UrbanProjectModule", "SmartAmenityModule", "InteractiveMapModule"],
    benefits: ["Tăng 280% thời gian on-site của khách hàng trẻ", "Thiết kế hiện đại chuẩn quốc tế", "Đồng bộ URL slug chuẩn SEO"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#1E40AF",
      secondaryColor: "#06B6D4",
      accentColor: "#0F172A",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Modern Skyline Hero với Search Bar Glassmorphism nổi",
      navigationStyle: "White Floating Glass Navbar",
      cardStyle: "Modern Grid Card 3 Cột (Tỉ lệ 16:10, góc bo tròn mềm)",
      galleryStyle: "Modern Fullwidth Slider",
      ctaStyle: "Gradient Coban to Cyan Button",
      spacingScale: "Spacious Modern Grid"
    },
    wireframe: ["HeaderMetro", "HeroGlassSearch", "UrbanCategoryPills", "Featured3GridListings", "SmartProjectsPanorama", "CityCards4Grid", "NewsGridAndNewsletter", "FooterMetro"],
    sectionConfig: {
      sourceSlug: "portal-02",
      heroTitle: "KHÔNG GIAN SỐNG CHUẨN MỰC CHO GIA ĐÌNH HIỆN ĐẠI",
      heroSubtitle: "Hơn 25.000 căn hộ cao cấp, duplex, penthouse và nhà phố đô thị."
    }
  }
];

export const TEMPLATE_LOOKUP_MAP: Record<string, Template> = ALL_TEMPLATES.reduce((acc, tpl) => {
  acc[tpl.slug] = tpl;
  acc[tpl.id] = tpl;
  if (tpl.sectionConfig?.sourceSlug) {
    acc[tpl.sectionConfig.sourceSlug] = tpl;
  }
  return acc;
}, {} as Record<string, Template>);

// Legacy aliases mapping to ensure backwards compatibility
const LEGACY_ALIASES: Record<string, string> = {
  'minhkhai-apartment': 'bds-20',
  'minhkhai-luxury': 'bds-20',
  'hanoi-rental': 'bds-21',
  'chothue-hanoi': 'bds-21',
  'happyland-resort': 'bds-22',
  'zohotels-resort': 'bds-22',
  'homeo-multithumb': 'bds-23',
  'homeo-agency': 'bds-23',
  'realtybuild-tech': 'bds-24',
  'realtybuild-portal': 'bds-24',
  'portal-01': 'portal-01',
  'portal-classic': 'portal-01',
  'batdongsan-classic': 'portal-01',
  'portal-02': 'portal-02',
  'portal-modern': 'portal-02',
  'metro-estate': 'portal-02',

  'luxury-gold': 'bds-01',
  'minimal-white': 'bds-02',
  'minimal-zen': 'bds-02',
  'modern-corporate': 'bds-03',
  'resort-paradise': 'bds-04',
  'ocean-view': 'bds-04',
  'ocean-blue': 'bds-04',
  'urban-city': 'bds-05',
  'smart-urban': 'bds-05',
  'high-rise': 'bds-05',
  'industrial-estate': 'bds-06',
  'industrial-logistics': 'bds-06',
  'villa-premium': 'bds-07',
  'modern-villa': 'bds-07',
  'luxury-villa': 'bds-07',
  'eco-green': 'bds-08',
  'eco-living': 'bds-08',
  'green-eco': 'bds-08',
  'classic-elegant': 'bds-09',
  'heritage-classic': 'bds-09',
  'classic-heritage': 'bds-09',
  'investment-pro': 'bds-10',
  'tech-hub': 'bds-10',
  'agency-onepage': 'bds-11',
  'suburban-family': 'bds-11',
  'mega-developer': 'bds-12',
  'riverside-mansion': 'bds-12',
  'listing-portal': 'bds-12',
  'auction-template': 'bds-13',
  'auction-bds': 'bds-13',
  'lake-sanctuary': 'bds-13',
  'landplot-template': 'bds-14',
  'land-plot': 'bds-14',
  'mountain-retreat': 'bds-14',
  'retail-podium': 'bds-15',
  'retail-commercial': 'bds-15',
  'commercial-plaza': 'bds-15',
  'personal-agent': 'bds-16',
  'golf-residences': 'bds-16',
  'portal-listing': 'bds-17',
  'vietnam-portal': 'bds-17',
  'bds123-portal': 'bds-18',
  'benthanh-portal': 'bds-18',
  'nhadatso-density': 'bds-19',
  'nhadatso-portal': 'bds-19',
};

export function findTemplateBySlugOrId(slugOrId: string): Template | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId.toLowerCase().trim();
  const mappedSlug = LEGACY_ALIASES[clean] || clean;
  return TEMPLATE_LOOKUP_MAP[mappedSlug] || TEMPLATE_LOOKUP_MAP[clean] || ALL_TEMPLATES.find(t => t.slug === mappedSlug || t.id === clean || t.slug === clean);
}
