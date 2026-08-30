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
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 1,
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
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 2,
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
  },
  // ─── PORTAL 03. LUXURY REALTY PRESTIGE ─────────────────────────────────────
  {
    id: "portal-03",
    name: "Template #03 - Luxury Realty Prestige",
    slug: "portal-03",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #03",
    badgeBg: "#C9A84C",
    badgeColor: "#000000",
    accentColor: "#C9A84C",
    description: "Sàn phân phối bất động sản cao cấp, dinh thự triệu đô, biệt thự ven sông và penthouse thượng lưu. Bố cục Editorial sang trọng với tông đen Midnight & vàng Gold hoàng gia, card listing 16:9 tinh tế.",
    shortDescription: "Dinh thự triệu đô · Biệt thự đảo · Penthouse thượng lưu",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Editorial sang trọng với viền vàng Gold hoàng gia",
      "Thanh tìm kiếm VIP Concierge tối giản",
      "Thẻ listing Editorial 16:9 với font Serif cổ điển",
      "Trang chi tiết dinh thự với Gallery Fullscreen và thông số bảo mật",
      "Đầy đủ 9 trang con nghiệp vụ: Bán, Thuê, Dự án, Tạp chí VIP, Giới thiệu, Liên hệ",
      "Tích hợp tính năng đặt lịch xem nhà riêng tư bằng xe Maybach & du thuyền"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 3,
    targetAudience: ["Sàn phân phối BĐS cao cấp & siêu sang", "Đại lý F1 biệt thự Vinhomes / Masterise / Ecopark", "Văn phòng Family Office & Quản lý gia sản"],
    highlights: ["Royal Gold & Midnight Luxury", "Editorial 16:9 Cards", "VIP Concierge Integration", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["VipConciergeModule", "EditorialCardModule", "MasterpieceProjectModule", "LuxuryLifestyleModule", "PrivateTourModule"],
    benefits: ["Nâng tầm thương hiệu sàn môi giới lên phân khúc High-End", "Tăng 420% sự tin cậy đối với giới siêu giàu", "Đầy đủ 100% chức năng portal"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#C9A84C",
      secondaryColor: "#0A0A0F",
      accentColor: "#E8C97E",
      bgColor: "#0A0A0F",
      cardBgColor: "#12121A",
      textColor: "#FFFFFF",
      radiusToken: "0.25rem",
      shadowToken: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
    },
    layoutConfig: {
      heroStyle: "Luxury Midnight Hero với thanh tìm kiếm nổi viền Gold",
      navigationStyle: "Midnight Gold Glass Navbar",
      cardStyle: "Editorial 16:9 Card viền Gold mảnh",
      galleryStyle: "Fullscreen Luxury Gallery",
      ctaStyle: "Royal Gold Button with Glow",
      spacingScale: "Generous Luxury Spacing"
    },
    wireframe: ["HeaderPrestige", "HeroLuxurySearch", "LimitedEditionEditorial", "MasterpieceProjects", "HighEndLocations", "LifestyleMagazine", "FooterPrestige"],
    sectionConfig: {
      sourceSlug: "portal-03",
      heroTitle: "TUYỆT TÁC DINH THỰ DÀNH CHO GIỚI TINH HOA",
      heroSubtitle: "Bộ sưu tập bất động sản triệu đô sở hữu vị thế độc tôn."
    }
  },
  // ─── PORTAL 04. DENSITY RAOVAT PRO ─────────────────────────────────────────
  {
    id: "portal-04",
    name: "Template #04 - Density RaoVat Pro",
    slug: "portal-04",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #04",
    badgeBg: "#059669",
    badgeColor: "#FFFFFF",
    accentColor: "#059669",
    description: "Cổng thông tin rao vặt nhà đất mật độ cao kinh điển. Bố cục 3 cột (2 Sidebar hai bên), hiển thị hàng chục tin đăng trên một màn hình với mức giá đỏ nổi bật, thông số tóm tắt trực quan và bộ lọc chuyên sâu.",
    shortDescription: "Cổng rao vặt mật độ cao · Bố cục 3 cột · Tối ưu hiển thị",
    thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục 3 cột cổ điển (Sidebar Trái + Danh sách + Sidebar Phải)",
      "Thẻ tin dạng Ultra-Compact Rows hiển thị dày đặc",
      "Mức giá đỏ đậm nổi bật kèm thời gian đăng theo phút",
      "Sidebar ký gửi nhanh và danh sách BĐS theo quận huyện sôi động",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án, Tin tức, Giới thiệu, Liên hệ",
      "Tối ưu tốc độ tải trang cực nhanh với mật độ thông tin cao"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 4,
    targetAudience: ["Cổng thông tin rao vặt nhà đất địa phương", "Sàn BĐS bình dân & thứ cấp", "Môi giới nhà trọ & căn hộ cho thuê sinh viên", "Đội ngũ sale nhà phố riêng lẻ"],
    highlights: ["3-Column Density Layout", "Ultra-Compact Rows", "Dual Sidebars Integration", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["DensityRowModule", "DualSidebarModule", "QuickConsignModule", "CompactFilterModule"],
    benefits: ["Hiển thị nhiều tin đăng nhất trên mỗi lượt xem", "Tăng 300% lượng click xem tin vãng lai", "Giao diện quen thuộc, dễ sử dụng cho mọi lứa tuổi"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#059669",
      secondaryColor: "#065F46",
      accentColor: "#DC2626",
      bgColor: "#F3F4F6",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "0.375rem",
      shadowToken: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Compact Search Bar Top Header",
      navigationStyle: "Classic Green Navigation Bar",
      cardStyle: "Ultra-Compact Dense Row (Ảnh trái nhỏ, thông số phải)",
      galleryStyle: "Compact Gallery Grid",
      ctaStyle: "Red Fast Action Button",
      spacingScale: "Tight Density Spacing"
    },
    wireframe: ["HeaderRaoVat", "SearchCompact", "ThreeColumnDensityLayout", "FooterRaoVat"],
    sectionConfig: {
      sourceSlug: "portal-04",
      heroTitle: "MẠNG RAO VẶT BẤT ĐỘNG SẢN CHÍNH CHỦ SỐ 1 VIỆT NAM",
      heroSubtitle: "Hàng ngàn tin đăng nhà đất mới mỗi ngày, kết nối người mua và người bán trực tiếp."
    }
  },
  // ─── PORTAL 05. MAP-CENTRIC INTERACTIVE PORTAL ─────────────────────────────
  {
    id: "portal-05",
    name: "Template #05 - Map-Centric Interactive Portal",
    slug: "portal-05",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #05",
    badgeBg: "#4F46E5",
    badgeColor: "#FFFFFF",
    accentColor: "#4F46E5",
    description: "Cổng tìm kiếm và tra cứu bất động sản tương tác bản đồ thông minh (Split View 50/50 Map & Listing tương tự Airbnb / Compass). Đồng bộ tức thì giữa thẻ tin đăng và ghim vị trí trên bản đồ vệ tinh.",
    shortDescription: "Bản đồ tương tác Split View · Tra cứu theo tọa độ · Bản đồ quy hoạch",
    thumbnail: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Split View 50/50: Bản đồ tương tác trực quan bên phải + Danh sách cuộn bên trái",
      "Đồng bộ hóa hover giữa thẻ tin và vị trí ghim trên bản đồ",
      "Lớp bản đồ chuyên sâu: Tuyến Metro, Trường học, Bệnh viện, Quy hoạch 1/500",
      "Trang chi tiết BĐS kèm bản đồ vệ tinh và cự ly tiện ích lân cận",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án, Tin quy hoạch, Giới thiệu, Liên hệ",
      "Tương thích hoàn hảo cả trên giao diện màn hình cảm ứng di động"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 5,
    targetAudience: ["Sàn BĐS ứng dụng công nghệ bản đồ (GIS)", "Công ty tư vấn quy hoạch & dự án hạ tầng", "Môi giới BĐS gần tuyến Metro và đường vành đai"],
    highlights: ["Split Map View 50/50", "Interactive Google Map", "Infrastructure Layers", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["SplitMapModule", "InteractiveGISModule", "MapCardSyncModule", "InfrastructureLayerModule"],
    benefits: ["Tăng 380% trải nghiệm tương tác vị trí của người mua", "Định vị chính xác từng lô đất, dự án và tiện ích", "Chuẩn SEO địa điểm địa lý"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#4F46E5",
      secondaryColor: "#06B6D4",
      accentColor: "#3730A3",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 4px 6px -1px rgba(79, 70, 229, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Interactive Split Map Screen",
      navigationStyle: "Map Centric Clean Navbar",
      cardStyle: "Map Synchronized Card (Góc bo mềm, hover sáng viền)",
      galleryStyle: "Split Screen Gallery Slider",
      ctaStyle: "Indigo Gradient Action Button",
      spacingScale: "Fluid Screen Spacing"
    },
    wireframe: ["HeaderMapEstate", "SplitMapContainer", "InteractiveMapViewer", "FooterMapEstate"],
    sectionConfig: {
      sourceSlug: "portal-05",
      heroTitle: "CỔNG BẤT ĐỘNG SẢN TƯƠNG TÁC BẢN ĐỒ THÔNG MINH",
      heroSubtitle: "Khám phá hàng ngàn bất động sản chính xác theo tọa độ và quy hoạch hạ tầng."
    }
  },
  // ─── PORTAL 06. GRAND RIVERSIDE ECO-TOWNSHIP & RESIDENTIAL RESORT ──────────
  {
    id: "portal-06",
    name: "Template #06 - Grand Riverside Eco-Township",
    slug: "portal-06",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #06",
    badgeBg: "#D8232A",
    badgeColor: "#FFFFFF",
    accentColor: "#D8232A",
    description: "Cổng thông tin và Landing Page đại đô thị sinh thái phức hợp cao cấp 120ha. Tông màu Đỏ Ruby thể thao sang trọng phối Deep Slate Obsidian & Vàng Ánh Kim, tích hợp đầy đủ sơ đồ Masterplan 1/500, catalog căn hộ 1-3PN & Penthouse Duplex, dãy Shophouse đại lộ 30m, 6 cụm tiện ích 5 sao và bảng tính lãi vay ngân hàng thời gian thực.",
    shortDescription: "Đại đô thị sinh thái 120ha · Căn hộ & Shophouse · Hồ cảnh quan 12ha",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Hero Banner Flycam toàn cảnh đại đô thị 120ha kèm Video Modal 3D sắc nét",
      "Bảng thông số tổng quan dự án & hồ sơ pháp lý minh bạch chuẩn CĐT",
      "Sơ đồ liên kết vùng kim cương với 5 cột mốc cự ly di chuyển chi tiết",
      "Sơ đồ quy hoạch phân khu Masterplan CAD & Catalog 4 dòng căn hộ điển hình",
      "Dãy Shophouse đại lộ 30m sầm uất & Biệt thự đảo ven hồ sinh thái 12ha",
      "Hệ thống 6 tiện ích đặc quyền 5 sao (Hồ bơi tràn, Sân Golf 3D, TTTM, Bệnh viện)",
      "Chính sách bán hàng ưu đãi đợt 1 & Bảng tính lãi suất vay ngân hàng tương tác",
      "Đầy đủ 100% các trang con: Căn hộ, Shophouse, Biệt thự, Tiện ích, Chính sách, Thư viện, Tin tức, Ký gửi, Liên hệ"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 6,
    targetAudience: ["Chủ đầu tư & Sàn F1 phân phối đại đô thị quy mô lớn", "Đại lý bán căn hộ chung cư cao cấp & Shophouse khối đế", "Đơn vị phân phối biệt thự sinh thái ven hồ & nhà phố thương mại"],
    highlights: ["Ruby Red & Obsidian Slate Theme", "Masterplan CAD 1/500", "Realtime Mortgage Calculator", "Đầy đủ 100% Trang Con"],
    availablePages: ["Trang chủ", "Căn hộ cao cấp", "Shophouse thương mại", "Nhà phố liền kề", "Biệt thự sinh thái", "Chi tiết BĐS", "Hệ thống tiện ích", "Chính sách & Bảng giá", "Thư viện ảnh", "Tin tức dự án", "Chi tiết tin tức", "Ký gửi nhà đất", "Giới thiệu", "Liên hệ"],
    modules: ["MasterplanViewerModule", "ApartmentCatalogModule", "ShophouseBoulevardModule", "MortgageCalculatorModule", "AmenityShowcaseModule", "UniversalFooterModule"],
    benefits: ["Nâng tầm thương hiệu dự án đại đô thị chuẩn quốc tế", "Tăng 450% tỷ lệ chuyển đổi khách hàng đăng ký nhận bảng giá VIP", "Hỗ trợ khách hàng tính toán phương án tài chính vay ngân hàng tức thì"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#D8232A",
      secondaryColor: "#0F172A",
      accentColor: "#F59E0B",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(216, 35, 42, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Mega Township Aerial Hero với Flycam Video Preview",
      navigationStyle: "Obsidian Slate Sticky Navbar với Red Micro Topbar",
      cardStyle: "Modern High-End Card (Viền mảnh, badge trạng thái đỏ, giá vàng amber)",
      galleryStyle: "6-Column Interactive Lightbox Grid",
      ctaStyle: "Ruby Red Action Button with Shadow",
      spacingScale: "Generous Modern Spacing"
    },
    wireframe: ["HeaderMegaTownship", "HeroTownshipSearch", "ProjectOverviewTable", "LocationMilestones5Grid", "MasterplanApartmentCatalog", "LowRiseBoulevardGrid", "Amenities6Grid", "PolicyAndMortgageCalculator", "GalleryAndProgress", "NewsArticlesGrid", "FooterMegaTownship"],
    sectionConfig: {
      sourceSlug: "portal-06",
      heroTitle: "KHU ĐÔ THỊ SINH THÁI PHỨC HỢP GRAND RIVERSIDE PARK",
      heroSubtitle: "Tuyệt tác không gian sống xanh chuẩn quốc tế quy mô 120ha bên hồ cảnh quan, tích hợp hơn 100+ tiện ích 5 sao đặc quyền."
    }
  },
  // ─── PORTAL 07. PANNAMERA ECO VILLAGE & CLOUD HUNTING RESORT ──────────────
  {
    id: "portal-07",
    name: "Template #07 - Pannamera Eco-Village Bảo Lộc",
    slug: "portal-07",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #07",
    badgeBg: "#047857",
    badgeColor: "#FFFFFF",
    accentColor: "#047857",
    description: "Cổng thông tin và Landing Page làng sinh thái nghỉ dưỡng săn mây PANNAMERA Bảo Lộc (Lâm Đồng). Tông màu Xanh Rừng Thông Nhiệt Đới phối Vàng Ánh Kim, tích hợp đầy đủ sơ đồ phân lô 3D đất vườn 250m² - 1000m², cối xay gió Hà Lan & đồi hoa cẩm tú cầu, mẫu nhà bungalow gỗ Bắc Âu và bảng tính vay ngân hàng thời gian thực.",
    shortDescription: "Làng sinh thái 900m biển · Đất vườn săn mây · Sổ đỏ thổ cư có sẵn",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Hero Banner Săn Mây bình minh trên đồi chè kèm Video Flycam 3D",
      "Bảng thông số tổng quan dự án & hồ sơ trích lục địa chính minh bạch",
      "Bản đồ liên kết vùng cao tốc Dầu Giây - Tân Phú - Bảo Lộc - Liên Khương",
      "Biểu tượng Cối Xay Gió & Vườn hoa cẩm tú cầu check-in rực rỡ",
      "Mặt bằng phân lô 3D đất vườn biệt thự từ 250m² - 1.000m²",
      "Giới thiệu mẫu nhà vườn Bungalow gỗ 2 tầng phong cách Nordic",
      "6 Giá trị cốt lõi & Tiềm năng tăng giá X2-X3 đón sóng cao tốc",
      "Đầy đủ 100% các trang con: Đất vườn, Bungalow, Biệt thự đồi, Farmstay, Tiện ích, Thư viện, Tin tức, Ký gửi, Liên hệ"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 7,
    targetAudience: ["Chủ đầu tư & Sàn phân phối đất nền nghỉ dưỡng Bảo Lộc / Lâm Đồng", "Môi giới Farmstay, Đất vườn sinh thái & Second Home Tây Nguyên", "Đơn vị vận hành homestay nghỉ dưỡng và du lịch sinh thái"],
    highlights: ["Pine Forest Emerald Theme", "Cloud Hunting 3D View", "Nordic Wooden Bungalow", "Đầy đủ 100% Trang Con"],
    availablePages: ["Trang chủ", "Đất vườn săn mây", "Bungalow nghỉ dưỡng", "Biệt thự đồi", "Farmstay 1000m²", "Chi tiết BĐS", "Hệ thống tiện ích", "Thư viện ảnh", "Tin tức du lịch", "Chi tiết tin tức", "Ký gửi nhà đất", "Giới thiệu", "Liên hệ"],
    modules: ["CloudHuntingModule", "EcoMasterplanModule", "WindmillShowcaseModule", "NordicBungalowModule", "MortgageCalculatorModule", "UniversalFooterModule"],
    benefits: ["Thu hút mạnh mẽ khách hàng tìm kiếm Second Home nghỉ dưỡng", "Tăng 520% lượng đăng ký nhận bảng giá F1 qua Zalo", "Hỗ trợ khách hàng thẩm định giá và tính toán phương án vay vốn tức thì"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#047857",
      secondaryColor: "#064E3B",
      accentColor: "#F59E0B",
      bgColor: "#F0FDF4",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(4, 120, 87, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Highland Forest Mist Hero với Săn Mây View",
      navigationStyle: "Emerald Pine Sticky Navbar với Top Microbar",
      cardStyle: "Eco Highland Card (Viền mỏng, badge xanh lục, giá vàng hổ phách)",
      galleryStyle: "Day-Night Showcase & 6-Thumbnail Grid",
      ctaStyle: "Amber Gold Action Button with Shadow",
      spacingScale: "Comfortable Natural Spacing"
    },
    wireframe: ["HeaderEcoVillage", "HeroCloudHunting", "OverviewTeaHills", "LocationExpresswayMap", "WindmillAmenities", "MasterplanPhanLoGrid", "CoreValues6Grid", "GalleryAndVideoFlycam", "NordicBungalowModel", "NewsAndMortgageCalc", "FooterEcoVillage"],
    sectionConfig: {
      sourceSlug: "portal-07",
      heroTitle: "PANNAMERA — NƠI DỪNG CHÂN LÝ TƯỞNG BẢO LỘC",
      heroSubtitle: "Làng sinh thái đồi chè nghỉ dưỡng độ cao 900m, mát lạnh 18-22°C quanh năm, sổ đỏ trao tay từng nền."
    }
  },
  // ─── PORTAL 08. INDUSTRIAL & LOGISTICS HUB ─────────────────────────────────
  {
    id: "portal-08",
    name: "Template #08 - Industrial & Logistics Hub",
    slug: "portal-08",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #08",
    badgeBg: "#0F172A",
    badgeColor: "#EA580C",
    accentColor: "#EA580C",
    description: "Cổng thông tin xúc tiến đầu tư FDI và sàn giao dịch bất động sản công nghiệp. Chuyên đất KCN thuê 50 năm, nhà xưởng xây sẵn RBF và kho bãi logistics RBW, hiển thị đầy đủ thông số kỹ thuật (PCCC, trần cao, tải trọng sàn, trạm điện KVA).",
    shortDescription: "Đất KCN · Nhà xưởng RBF · Kho bãi Logistics RBW · Tư vấn FDI",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục B2B chuẩn công nghiệp với tông Xanh Than & Cam An Toàn Lao Động",
      "Thẻ tin Technical Spec Card với thông số PCCC, tải trọng sàn, trần cao m",
      "Bộ lọc BĐS công nghiệp theo cự ly cảng biển & trạm biến áp KVA",
      "Trang chi tiết nhà xưởng kèm sơ đồ tải trọng và ngành nghề ưu đãi thuế",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án KCN, Báo cáo FDI, Giới thiệu, Liên hệ",
      "Tích hợp form gửi yêu cầu RFP tìm đất KCN & nhà xưởng quy mô lớn"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 8,
    targetAudience: ["Chủ đầu tư phát triển KCN (VSIP, Amata, BW Industrial, Deep C)", "Công ty tư vấn xúc tiến đầu tư FDI và chuỗi cung ứng", "Sàn môi giới kho bãi logistics & xưởng công nghiệp"],
    highlights: ["Technical Spec Grid Cards", "FDI Advisory & RFP Forms", "Infrastructure Distance Filters", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["TechnicalSpecCardModule", "RfpFormModule", "IndustrialProjectModule", "FdiReportModule"],
    benefits: ["Nâng tầm chuyển đổi B2B đối với các tập đoàn FDI đa quốc gia", "Trình bày thông số kỹ thuật chuẩn công nghiệp", "Dễ dàng quản lý hàng triệu m² kho bãi"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0F172A",
      secondaryColor: "#1E293B",
      accentColor: "#EA580C",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "0.5rem",
      shadowToken: "0 4px 6px -1px rgba(15, 23, 42, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Industrial Slate Hero với Search Bar thông số kỹ thuật",
      navigationStyle: "B2B Professional Dark Navbar",
      cardStyle: "Technical Spec Card (Grid thông số m², trần cao, KVA)",
      galleryStyle: "Industrial Warehouse Slider",
      ctaStyle: "Safety Orange Action Button",
      spacingScale: "Rigid Industrial Grid"
    },
    wireframe: ["HeaderIndustrialPro", "HeroIndustrialSearch", "IndustrialListingsGrid", "TopIndustrialParks", "FooterIndustrialPro"],
    sectionConfig: {
      sourceSlug: "portal-08",
      heroTitle: "HẠ TẦNG NHÀ XƯỞNG & ĐẤT KHU CÔNG NGHIỆP CHUẨN QUỐC TẾ",
      heroSubtitle: "Hơn 5.000.000 m² đất KCN, kho bãi logistics RBW và xưởng xây sẵn RBF sẵn sàng bàn giao."
    }
  },
  // ─── PORTAL 09. HERITAGE & COLONIAL PORTAL ─────────────────────────────────
  {
    id: "portal-09",
    name: "Template #09 - Heritage & Colonial Portal",
    slug: "portal-09",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #09",
    badgeBg: "#78350F",
    badgeColor: "#FEF3C7",
    accentColor: "#D97706",
    description: "Cổng thông tin bảo tồn và giao dịch bất động sản di sản, biệt thự kiến trúc Pháp cổ (French Colonial), nhà phố cổ Hà Nội / Hội An và khuôn viên nhà rường Cố Đô. Phong cách cổ điển trang nhã với thẻ Vintage Heritage Cards.",
    shortDescription: "Biệt thự Pháp cổ · Nhà phố di sản · Nhà rường Cố Đô Huế",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục mang đậm giá trị văn hóa với tông Vàng Hoàng Thành & Nâu Gỗ Trầm",
      "Thẻ tin Vintage Heritage Card hiển thị năm xây dựng & trường phái kiến trúc",
      "Bộ lọc BĐS di sản theo vùng đất: Phố cổ Hà Nội, Sài Gòn xưa, Cố Đô Huế, Hội An",
      "Trang chi tiết BĐS kèm hồ sơ bảo tồn lịch sử và vật liệu gỗ quý nguyên bản",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án bảo tồn, Văn hóa, Giới thiệu, Liên hệ",
      "Kết nối mạng lưới chuyên gia phục dựng di sản kiến trúc hàng đầu"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 9,
    targetAudience: ["Nhà sưu tầm di sản & biệt thự cổ điển", "Công ty phục dựng & bảo tồn kiến trúc xưa", "Sàn môi giới BĐS khu vực phố cổ Hoàn Kiếm / Ba Đình / Quận 3"],
    highlights: ["Imperial Ochre & Antique Wood", "Vintage Heritage 4:3 Cards", "Heritage Preservation Dossier", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["VintageCardModule", "HeritageHistoryModule", "RestorationProjectModule", "CulturalMagazineModule"],
    benefits: ["Nâng tầm giá trị di sản và thu hút giới tinh hoa sưu tầm nhà cổ", "Hiển thị hồ sơ kiến trúc chuẩn mực", "Bố cục đậm chất hoài niệm độc nhất"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Lora', serif",
      primaryColor: "#78350F",
      secondaryColor: "#D97706",
      accentColor: "#451A03",
      bgColor: "#FFFBEB",
      cardBgColor: "#FEF3C7",
      textColor: "#451A03",
      radiusToken: "1rem",
      shadowToken: "0 4px 6px -1px rgba(120, 53, 15, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Vintage Heritage Hero với Search Bar viền gỗ trầm",
      navigationStyle: "Antique Paper Navbar",
      cardStyle: "Vintage Heritage Card (Ảnh sepia, viền đôi cổ điển)",
      galleryStyle: "Vintage Classic Slider",
      ctaStyle: "Imperial Ochre Action Button",
      spacingScale: "Elegant Classical Spacing"
    },
    wireframe: ["HeaderHeritageEstate", "HeroVintageSearch", "HeritageListingsGrid", "RestorationProjects", "FooterHeritageEstate"],
    sectionConfig: {
      sourceSlug: "portal-09",
      heroTitle: "BẢO TỒN & CHUYỂN NHƯỢNG DINH THỰ PHÁP CỔ",
      heroSubtitle: "Tuyển chọn những bất động sản mang giá trị lịch sử, nhà rường Cố Đô và biệt thự Đông Dương."
    }
  },
  // ─── PORTAL 10. INVESTMENT & HIGH YIELD PORTAL ─────────────────────────────
  {
    id: "portal-10",
    name: "Template #10 - Investment & High Yield Portal",
    slug: "portal-10",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #10",
    badgeBg: "#0D9488",
    badgeColor: "#FFFFFF",
    accentColor: "#0D9488",
    description: "Cổng thông tin và sàn giao dịch bất động sản đầu tư dòng tiền, căn hộ dịch vụ (CHDV), tòa nhà văn phòng và shophouse cho thuê sẵn hợp đồng. Hiển thị tỷ suất sinh lời ROI %, dòng tiền ròng hàng tháng và tiềm năng tăng vốn.",
    shortDescription: "BĐS dòng tiền · Tòa CHDV · Tỷ suất ROI 8% - 15%/năm · Lãi vốn cao",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục tài chính chuyên sâu với tông Xanh Ngọc Bích & Vàng Gold Kim Tiền",
      "Thẻ tin Financial Metrics Card hiển thị ROI %, Dòng tiền ròng Tr/tháng, Tỷ lệ lấp đầy",
      "Bộ lọc BĐS theo mức ROI mong muốn (8% - 15%/năm) và số vốn đầu tư",
      "Trang chi tiết BĐS kèm bảng tính phân tích đòn bẩy ngân hàng và bài toán hoàn vốn",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án ROI cao, Báo cáo tài chính, Giới thiệu, Liên hệ",
      "Tích hợp form đăng ký nhận danh sách BĐS ngộp thanh lý dưới giá thị trường"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 10,
    targetAudience: ["Nhà đầu tư cá nhân tìm kiếm dòng tiền thụ động", "Sàn chuyên phân phối tòa căn hộ dịch vụ (CHDV) & văn phòng mini", "Quỹ đầu tư BĐS tư nhân"],
    highlights: ["Financial Metrics Cards", "ROI & Cap Rate Calculator", "High Yield Filters", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["FinancialCardModule", "RoiCalculatorModule", "CashflowAnalysisModule", "LiquidationAlertModule"],
    benefits: ["Thuyết phục 100% các nhà đầu tư sành sỏi dựa trên con số thực tế", "Gia tăng 350% tỷ lệ chốt deal các sản phẩm dòng tiền giá trị lớn", "Tối ưu hóa phễu khách hàng VIP"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0D9488",
      secondaryColor: "#0F766E",
      accentColor: "#EAB308",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(13, 148, 136, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Financial Analytics Hero với Search Bar khoảng ROI",
      navigationStyle: "Modern Teal Rounded Navbar",
      cardStyle: "Financial Metrics Card (Grid chỉ số dòng tiền & ROI %)",
      galleryStyle: "Financial Investment Slider",
      ctaStyle: "Teal Gradient Investment Button",
      spacingScale: "Analytical Structured Spacing"
    },
    wireframe: ["HeaderInvestPro", "HeroFinancialSearch", "YieldListingsGrid", "HighRoiProjects", "FooterInvestPro"],
    sectionConfig: {
      sourceSlug: "portal-10",
      heroTitle: "ĐẦU TƯ BẤT ĐỘNG SẢN DÒNG TIỀN THU NHẬP 8% - 15%/NĂM",
      heroSubtitle: "Hơn 3.500 tòa nhà căn hộ dịch vụ (CHDV), shophouse khối đế và văn phòng cho thuê sẵn hợp đồng."
    }
  },
  // ─── PORTAL 11. MODERN VILLA & WATERFRONT ESTATE ───────────────────────────
  {
    id: "portal-11",
    name: "Template #11 - Modern Villa & Waterfront Estate",
    slug: "portal-11",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #11",
    badgeBg: "#0F766E",
    badgeColor: "#FFFFFF",
    accentColor: "#0F766E",
    description: "Sàn phân phối biệt thự ven sông, dinh thự compound khép kín và bến du thuyền riêng biệt. Bố cục Waterfront góc rộng 16:9 với tông Xanh Ngọc Ven Sông & Xanh Marine, hiển thị chiều dài mặt sông m và bến đỗ cano.",
    shortDescription: "Biệt thự ven sông · Bến du thuyền riêng · Compound an ninh khép kín",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Panorama thoáng đãng với tông Xanh Ngọc Ven Sông & Xanh Marine",
      "Thẻ tin Waterfront Panorama Card hiển thị chiều dài mặt sông (20m - 50m)",
      "Bộ lọc BĐS theo cự ly lưu vực sông: Sông Sài Gòn, Sông Đồng Nai, Sông Hồng",
      "Trang chi tiết dinh thự kèm sơ đồ bến du thuyền và cảnh quan hồ bơi vô cực",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án ven sông, Tin tức, Giới thiệu, Liên hệ",
      "Tích hợp form đặt lịch cano & du thuyền riêng khảo sát vị trí mặt nước"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 11,
    targetAudience: ["Sàn phân phối dinh thự ven sông & compound cao cấp", "Đại lý F1 biệt thự The Rivus / SwanBay / Aqua City / Eco Village", "Khách hàng siêu giàu yêu thích phong cách sống bến thuyền"],
    highlights: ["Waterfront 16:9 Panorama Cards", "Private Marina & River Frontage", "Cano Survey Booking", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["WaterfrontCardModule", "MarinaBookingModule", "RiverfrontProjectModule", "WaterfrontLifestyleModule"],
    benefits: ["Định vị phân khúc dinh thự ven sông siêu sang", "Tăng 360% lượt đăng ký trải nghiệm cano thực tế", "Giao diện tràn viền sang trọng đỉnh cao"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0F766E",
      secondaryColor: "#115E59",
      accentColor: "#0369A1",
      bgColor: "#F0FDFA",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1.5rem",
      shadowToken: "0 10px 15px -3px rgba(15, 118, 110, 0.1)"
    },
    layoutConfig: {
      heroStyle: "Waterfront River Hero với Search Bar bến du thuyền",
      navigationStyle: "Teal Marine Rounded Navbar",
      cardStyle: "Waterfront Panorama Card (Ảnh 16:9, badge mặt sông m)",
      galleryStyle: "Riverfront Landscape Slider",
      ctaStyle: "Waterfront Teal Action Button",
      spacingScale: "Expansive River Spacing"
    },
    wireframe: ["HeaderWaterfrontVilla", "HeroWaterfrontSearch", "WaterfrontListingsGrid", "TopRiverfrontEstates", "FooterWaterfrontVilla"],
    sectionConfig: {
      sourceSlug: "portal-11",
      heroTitle: "TUYỆT TÁC BIỆT THỰ & DINH THỰ VEN SÔNG BIỂU TƯỢNG",
      heroSubtitle: "Bộ sưu tập dinh thự có bến đỗ du thuyền riêng, view panorama sông lớn và an ninh compound."
    }
  },
  // ─── PORTAL 12. MEGA DEVELOPER ECOSYSTEM PORTAL ────────────────────────────
  {
    id: "portal-12",
    name: "Template #12 - Mega Developer Ecosystem Portal",
    slug: "portal-12",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #12",
    badgeBg: "#1E3A8A",
    badgeColor: "#FFFFFF",
    accentColor: "#D97706",
    description: "Cổng thông tin hệ sinh thái đại đô thị trực tiếp từ chủ đầu tư tập đoàn lớn (Vingroup, Masterise Homes, Sun Group, Novaland). Tổng hợp giỏ hàng F1 phân khu mở bán, chính sách chiết khấu 15% đợt 1, ân hạn lãi gốc và quà tặng độc quyền.",
    shortDescription: "Giỏ hàng F1 đại đô thị · Chiết khấu 15% đợt 1 · Trực tiếp chủ đầu tư",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục tập đoàn hùng hậu với tông Xanh Navy Hoàng Gia & Vàng Gold Kim Cương",
      "Thẻ tin Sub-Division Card hiển thị phân khu, tiến độ thi công và chính sách chiết khấu F1",
      "Bộ lọc BĐS theo phân khu cao tầng / thấp tầng / thương mại giải trí",
      "Trang chi tiết BĐS kèm bảng tiến độ thanh toán chuẩn & thanh toán sớm",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Đại đô thị, Tiến độ, Giới thiệu, Liên hệ",
      "Tích hợp nút tải trọn bộ hồ sơ pháp lý 1/500 và bảng giá gốc F1"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 12,
    targetAudience: ["Đại lý phân phối F1 chiến lược của các chủ đầu tư lớn", "Công ty sàn giao dịch BĐS tổng hợp đa dự án", "Đội ngũ sales chuyên bán dự án quy mô đại đô thị"],
    highlights: ["Master Plan Sub-Division Cards", "F1 Direct Developer Pricing", "Discount & Payment Policy", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["SubDivisionCardModule", "DeveloperDiscountModule", "MegaProjectModule", "ConstructionProgressModule"],
    benefits: ["Tạo dựng uy tín tuyệt đối với tư cách đại lý F1 chiến lược", "Cung cấp đầy đủ thông tin chính sách bán hàng mới nhất", "Tăng 380% tỷ lệ đăng ký nhận bảng giá F1"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#1E3A8A",
      secondaryColor: "#172554",
      accentColor: "#D97706",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(30, 58, 138, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Mega Developer Hero với Search Bar phân khu F1",
      navigationStyle: "Corporate Navy Rounded Navbar",
      cardStyle: "Sub-Division Master Card (Grid chiết khấu % & quà tặng)",
      galleryStyle: "Mega Masterplan Slider",
      ctaStyle: "Royal Navy Corporate Button",
      spacingScale: "Grand Masterplan Spacing"
    },
    wireframe: ["HeaderMegaDeveloper", "HeroMegaSearch", "SubDivisionListingsGrid", "TopMegaProjects", "FooterMegaDeveloper"],
    sectionConfig: {
      sourceSlug: "portal-12",
      heroTitle: "GIỎ HÀNG GỐC TRỰC TIẾP TỪ CHỦ ĐẦU TƯ",
      heroSubtitle: "Khám phá các đại đô thị quy mô hàng trăm hecta với chính sách chiết khấu đợt 1 và quà tặng đặc quyền."
    }
  },
  // ─── PORTAL 13. REAL ESTATE AUCTION & LIQUIDATION PORTAL ───────────────────
  {
    id: "portal-13",
    name: "Template #13 - Real Estate Auction & Liquidation Portal",
    slug: "portal-13",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #13",
    badgeBg: "#991B1B",
    badgeColor: "#FFFFFF",
    accentColor: "#991B1B",
    description: "Cổng thông tin và sàn đấu giá bất động sản trực tuyến, chuyên tài sản phát mãi ngân hàng, quỹ đất công đấu giá nhà nước và thi hành án dân sự. Hiển thị đồng hồ đếm ngược phiên đấu giá, giá khởi điểm, bước giá và tỷ lệ cọc 10%.",
    shortDescription: "Sàn đấu giá trực tuyến · BĐS phát mãi ngân hàng · Dưới giá thị trường 20-35%",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục pháp lý nghiêm ngặt với tông Đỏ Rượu Búa Đấu Giá & Vàng Hổ Phách",
      "Thẻ tin Live Auction Countdown Card hiển thị thời gian đếm ngược giờ:phút",
      "Bộ lọc BĐS theo ngân hàng thanh lý: Vietcombank, BIDV, Agribank, VietinBank",
      "Trang chi tiết tài sản kèm biên bản thẩm định giá & quy chế tham gia đấu giá",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Gói thanh lý, Quy chế, Giới thiệu, Liên hệ",
      "Tích hợp hệ thống đăng ký nộp hồ sơ cọc và phòng đấu giá trực tuyến"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 13,
    targetAudience: ["Công ty đấu giá hợp danh & trung tâm dịch vụ đấu giá tài sản", "Phòng xử lý nợ & thu hồi tài sản ngân hàng thương mại", "Nhà đầu tư săn BĐS ngộp thanh lý giá tốt"],
    highlights: ["Live Auction Countdown Cards", "Bank Liquidation Filters", "Legal Appraisal Dossiers", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["AuctionCardModule", "AuctionCountdownModule", "BankLiquidationModule", "AuctionLegalModule"],
    benefits: ["Tăng 420% số lượng hồ sơ đăng ký tham gia các phiên đấu giá công khai", "Xây dựng niềm tin pháp lý vững chắc với người mua", "Bố cục khẩn trương kích thích ra quyết định"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#991B1B",
      secondaryColor: "#7F1D1D",
      accentColor: "#D97706",
      bgColor: "#FEF2F2",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(153, 27, 27, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Auction Live Hero với Search Bar tài sản phát mãi",
      navigationStyle: "Wine Red Rounded Navbar",
      cardStyle: "Live Auction Countdown Card (Đồng hồ đếm ngược, bước giá)",
      galleryStyle: "Legal Evidence Slider",
      ctaStyle: "Auction Wine Red Button",
      spacingScale: "Strict Legal Spacing"
    },
    wireframe: ["HeaderAuctionPro", "HeroAuctionSearch", "AuctionListingsGrid", "TopBankPortfolios", "FooterAuctionPro"],
    sectionConfig: {
      sourceSlug: "portal-13",
      heroTitle: "CỔNG ĐẤU GIÁ & THANH LÝ BẤT ĐỘNG SẢN PHÁT MÃI",
      heroSubtitle: "Hơn 1.800 tài sản phát mãi ngân hàng, bất động sản thi hành án và quỹ đất công đấu giá trên toàn quốc."
    }
  },
  // ─── PORTAL 14. LANDPLOT & FARMLAND EXCHANGE PORTAL ────────────────────────
  {
    id: "portal-14",
    name: "Template #14 - Landplot & Farmland Exchange Portal",
    slug: "portal-14",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #14",
    badgeBg: "#854D0E",
    badgeColor: "#FFFFFF",
    accentColor: "#854D0E",
    description: "Sàn giao dịch đất nền phân lô sổ đỏ sẵn, đất vườn nghỉ dưỡng ven suối và farmstay nông nghiệp sinh thái. Hiển thị chi tiết trích lục địa chính, diện tích thổ cư ONT/ODT, mặt tiền m và đường ô tô vào tận nơi.",
    shortDescription: "Đất nền sổ sẵn · Đất vườn ven suối · Farmstay nghỉ dưỡng sinh thái",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục sinh thái điền viên với tông Đất Nâu Trù Phú & Xanh Đồng Quê",
      "Thẻ tin Cadastral Survey Card hiển thị diện tích thổ cư ONT và đường ô tô m",
      "Bộ lọc đất theo địa bàn: Bảo Lộc, Củ Chi, Đồng Nai, Bình Phước, Tây Ninh",
      "Trang chi tiết lô đất kèm trích lục địa chính & quy hoạch chuyển mục đích",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Làng sinh thái, Cẩm nang, Giới thiệu, Liên hệ",
      "Tích hợp form đăng ký tham gia tour xe đưa đón săn đất cuối tuần miễn phí"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 14,
    targetAudience: ["Sàn giao dịch đất nền vùng ven & bất động sản sinh thái", "Đội ngũ sales chuyên đất sào mẫu Bảo Lộc, Long An, Củ Chi", "Chủ đầu tư phát triển cụm làng sinh thái & farmstay"],
    highlights: ["Cadastral Survey Cards", "Farmland & Farmstay Filters", "Weekend Land Tour Booking", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["CadastralCardModule", "LandTourModule", "EcoVillageModule", "CadastralLegalModule"],
    benefits: ["Đánh trúng xu hướng bỏ phố về vườn và săn đất đón sóng hạ tầng", "Cung cấp trích lục địa chính minh bạch 100%", "Thu hút hàng ngàn khách tham gia tour săn đất"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#854D0E",
      secondaryColor: "#713F12",
      accentColor: "#15803D",
      bgColor: "#FEFCE8",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(133, 77, 14, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Farmland Eco Hero với Search Bar diện tích sào mẫu",
      navigationStyle: "Earth Brown Rounded Navbar",
      cardStyle: "Cadastral Survey Card (Grid diện tích thổ cư ONT, mặt tiền)",
      galleryStyle: "Countryside Landscape Slider",
      ctaStyle: "Fertile Soil Action Button",
      spacingScale: "Expansive Farm Spacing"
    },
    wireframe: ["HeaderDatVuonPro", "HeroFarmlandSearch", "CadastralListingsGrid", "TopEcoVillages", "FooterDatVuonPro"],
    sectionConfig: {
      sourceSlug: "portal-14",
      heroTitle: "SÀN ĐẤT NỀN PHÂN LÔ, ĐẤT VƯỜN & FARMSTAY",
      heroSubtitle: "Hơn 4.000 lô đất có sẵn thổ cư, đất vườn sầu riêng ven suối và trang trại nghỉ dưỡng sổ hồng riêng."
    }
  },
  // ─── PORTAL 15. COMMERCIAL & RETAIL PODIUM PORTAL ──────────────────────────
  {
    id: "portal-15",
    name: "Template #15 - Commercial & Retail Podium Portal",
    slug: "portal-15",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #15",
    badgeBg: "#EA580C",
    badgeColor: "#FFFFFF",
    accentColor: "#EA580C",
    description: "Sàn giao dịch shophouse khối đế chung cư, mặt bằng bán lẻ trung tâm thương mại và nhà phố góc 2 mặt tiền sầm uất. Hiển thị thông số lưu lượng người qua lại Footfall lượt/ngày, bề rộng vỉa hè m và ngành nghề kinh doanh tối ưu.",
    shortDescription: "Shophouse khối đế · Mặt bằng bán lẻ TTTM · Footfall 45.000 lượt/ngày",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục thương mại bán lẻ năng động với tông Đỏ Cam & Xanh Tím Hiện Đại",
      "Thẻ tin Commercial Retail Card hiển thị lưu lượng khách Footfall & vỉa hè m",
      "Bộ lọc mặt bằng theo ngành nghề: F&B, Ngân hàng, Spa, Siêu thị, Thời trang",
      "Trang chi tiết mặt bằng kèm thông số kỹ thuật điện 3 pha & bãi đỗ xe",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án TTTM, Tin tức, Giới thiệu, Liên hệ",
      "Tích hợp form gửi yêu cầu tìm kiếm mặt bằng mở chuỗi trên toàn quốc"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 15,
    targetAudience: ["Chuỗi thương hiệu F&B, thời trang & bán lẻ mở rộng chuỗi", "Sàn môi giới chuyên shophouse khối đế chung cư & TTTM", "Chủ sở hữu nhà phố mặt tiền kinh doanh"],
    highlights: ["Footfall & Traffic Metrics", "Retail Chain Request Forms", "Sidewalk & Parking Specs", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["RetailCardModule", "FootfallTrackerModule", "RetailProjectModule", "RetailInsightModule"],
    benefits: ["Tối ưu hóa khả năng tìm kiếm mặt bằng cho các chuỗi nhượng quyền lớn", "Định lượng giá trị mặt bằng bằng dữ liệu lưu lượng thực tế", "Gia tăng 340% tỷ lệ kết nối chủ nhà với chuỗi bán lẻ"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#EA580C",
      secondaryColor: "#C2410C",
      accentColor: "#4F46E5",
      bgColor: "#FFF7ED",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(234, 88, 12, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Retail Commercial Hero với Search Bar ngành nghề F&B",
      navigationStyle: "Orange Dynamic Rounded Navbar",
      cardStyle: "Commercial Retail Card (Grid footfall khách/ngày, vỉa hè)",
      galleryStyle: "Commercial Streetview Slider",
      ctaStyle: "Commercial Orange Action Button",
      spacingScale: "Dynamic Commercial Spacing"
    },
    wireframe: ["HeaderRetailPodium", "HeroRetailSearch", "RetailListingsGrid", "TopCommercialHubs", "FooterRetailPodium"],
    sectionConfig: {
      sourceSlug: "portal-15",
      heroTitle: "SÀN SHOPHOUSE KHỐI ĐẾ & MẶT BẰNG THƯƠNG MẠI",
      heroSubtitle: "Hơn 2.500 mặt bằng khối đế chung cư cư dân đông đúc, nhà phố ngã tư góc 2 mặt tiền và TTTM sầm uất."
    }
  },
  // ─── PORTAL 16. ELITE PERSONAL BROKER PORTAL ───────────────────────────────
  {
    id: "portal-16",
    name: "Template #16 - Elite Personal Broker Portal",
    slug: "portal-16",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #16",
    badgeBg: "#090A0F",
    badgeColor: "#FB7185",
    accentColor: "#E11D48",
    description: "Cổng thông tin và sàn giao dịch xây dựng thương hiệu cá nhân của môi giới ngôi sao (Top Star Broker / Private Broker). Giới thiệu hồ sơ năng lực 10+ năm kinh nghiệm, giỏ hàng ủy quyền độc quyền, đàm phán trực tiếp 1-1 và bảo mật thông tin tuyệt đối.",
    shortDescription: "Thương hiệu Top Broker · Giỏ hàng VIP độc quyền · Tư vấn 1-1 kín đáo",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Private Advisor đẳng cấp với tông Đen Midnight & Vàng Hồng Rose Gold",
      "Thẻ tin Exclusive Agent Card hiển thị dấu ấn thẩm định và cam kết đàm phán 1-1",
      "Bộ lọc giỏ hàng độc quyền cá nhân: Penthouse áp mái, Biệt thự compound, Đất trung tâm",
      "Trang chi tiết BĐS kèm video review thực tế và góc nhìn nhận định của Broker",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án đại sứ, Góc nhìn, Hồ sơ, Tư vấn",
      "Tích hợp form đặt lịch hẹn tư vấn riêng tư (Private Meeting) tại Lounge sang trọng"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 16,
    targetAudience: ["Môi giới ngôi sao (Top Producer / Star Broker) xây dựng thương hiệu cá nhân", "Chuyên gia cố vấn BĐS cho giới siêu giàu (Family Office)", "Trưởng phòng / Giám đốc sàn muốn sở hữu website cá nhân chuyên nghiệp"],
    highlights: ["Exclusive Agent Portfolio Cards", "Private Broker Profile", "Confidential 1-on-1 Consultation", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["PersonalBrokerCardModule", "ExclusiveDossierModule", "PrivateMeetingModule", "MarketInsightModule"],
    benefits: ["Xây dựng vị thế chuyên gia cố vấn hàng đầu trong mắt khách hàng VIP", "Gia tăng 400% số lượng BĐS giá trị cao được chủ nhà ủy quyền độc quyền", "Tối ưu hóa hình ảnh cá nhân"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#090A0F",
      secondaryColor: "#12131A",
      accentColor: "#E11D48",
      bgColor: "#090A0F",
      cardBgColor: "#12131A",
      textColor: "#F1F5F9",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(225, 29, 72, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Elite Broker Portrait Hero với Search Bar giỏ hàng kín",
      navigationStyle: "Midnight Rose Gold Navbar",
      cardStyle: "Exclusive Agent Portfolio Card (Viền Rose Gold, badge độc quyền)",
      galleryStyle: "Private Wealth Slider",
      ctaStyle: "Rose Gold Gradient Button",
      spacingScale: "VIP Bespoke Spacing"
    },
    wireframe: ["HeaderAlexanderEstate", "HeroEliteBrokerSearch", "ExclusiveListingsGrid", "BrandAmbassadorProjects", "FooterAlexanderEstate"],
    sectionConfig: {
      sourceSlug: "portal-16",
      heroTitle: "CỐ VẤN BẤT ĐỘNG SẢN CAO CẤP RIÊNG BIỆT",
      heroSubtitle: "Hơn 10 năm kinh nghiệm đồng hành cùng 500+ gia tộc thượng lưu và nhà đầu tư cá nhân VIP tại Việt Nam."
    }
  },
  // ─── PORTAL 17. NORTHERN CAPITAL HERITAGE PORTAL ───────────────────────────
  {
    id: "portal-17",
    name: "Template #17 - Northern Capital Heritage Portal",
    slug: "portal-17",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #17",
    badgeBg: "#B91C1C",
    badgeColor: "#FEF3C7",
    accentColor: "#B91C1C",
    description: "Cổng thông tin bất động sản kinh kỳ thủ đô Hà Nội. Chuyên nhà mặt phố cổ Hoàn Kiếm, biệt thự Pháp cổ Ba Đình, căn hộ cao cấp view trọn Hồ Tây và nhà ngõ nông nội thành. Hiển thị cự ly ra Hồ Gươm m, bề rộng ngõ ô tô và sổ đỏ chính chủ.",
    shortDescription: "Nhà phố cổ Hoàn Kiếm · Biệt thự Ba Đình · Căn hộ view Hồ Tây",
    thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục đậm chất văn hóa kinh kỳ với tông Đỏ Thăng Long & Nâu Trầm Cổ Kính",
      "Thẻ tin Hanoi Old Quarter Card hiển thị cự ly ra Hồ Gươm & bề rộng ngõ ô tô",
      "Bộ lọc nhà đất 12 quận nội thành: Hoàn Kiếm, Ba Đình, Tây Hồ, Cầu Giấy, Đống Đa",
      "Trang chi tiết BĐS kèm trích lục sổ đỏ chính chủ lâu năm và hồ sơ quy hoạch nội đô",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Dự án Hồ Tây, Cẩm nang, Giới thiệu, Liên hệ",
      "Kết nối mạng lưới môi giới thổ địa Hà Thành am hiểu từng ngõ phố"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 17,
    targetAudience: ["Sàn môi giới nhà phố & thổ cư tại Hà Nội", "Đội ngũ sale chuyên biệt thự Ba Đình / Tây Hồ / Hoàn Kiếm", "Khách hàng tìm mua nhà đất giữ tiền tại trung tâm thủ đô"],
    highlights: ["Hanoi Old Quarter Cards", "12 Hanoi Urban District Filters", "Thang Long Heritage Theme", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["HanoiCardModule", "DistrictNavigatorModule", "WestLakeProjectModule", "HanoiHeritageModule"],
    benefits: ["Tạo sự đồng cảm sâu sắc với khách hàng mua nhà đất tại Hà Nội", "Cung cấp đầy đủ thông tin ngõ phố, mặt tiền đặc thù của thủ đô", "Tăng 350% tỷ lệ liên hệ"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Lora', serif",
      primaryColor: "#B91C1C",
      secondaryColor: "#991B1B",
      accentColor: "#78350F",
      bgColor: "#FEF9EE",
      cardBgColor: "#FFFDF7",
      textColor: "#451A03",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(185, 28, 28, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Thang Long Heritage Hero với Search Bar quận nội thành",
      navigationStyle: "Capital Red Traditional Navbar",
      cardStyle: "Hanoi Old Quarter Card (Khung viền truyền thống, badge Hồ Gươm)",
      galleryStyle: "Hanoi Ancient Slider",
      ctaStyle: "Capital Red Action Button",
      spacingScale: "Classic Urban Spacing"
    },
    wireframe: ["HeaderHanoiEstate", "HeroThangLongSearch", "HanoiListingsGrid", "TopWestLakeProjects", "FooterHanoiEstate"],
    sectionConfig: {
      sourceSlug: "portal-17",
      heroTitle: "CỔNG BẤT ĐỘNG SẢN THỦ ĐÔ HÀ NỘI",
      heroSubtitle: "Tổng hợp hơn 5.000 căn nhà phố cổ Hoàn Kiếm, biệt thự Pháp cổ Ba Đình và căn hộ cao cấp view trọn Hồ Tây."
    }
  },
  // ─── PORTAL 18. SAIGON DYNAMIC RIVERFRONT PORTAL ───────────────────────────
  {
    id: "portal-18",
    name: "Template #18 - Saigon Dynamic Riverfront Portal",
    slug: "portal-18",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #18",
    badgeBg: "#1D4ED8",
    badgeColor: "#FFFFFF",
    accentColor: "#1D4ED8",
    description: "Cổng thông tin bất động sản TP. Hồ Chí Minh năng động, trung tâm tài chính mới Thủ Thiêm và dòng sông Sài Gòn phồn hoa. Chuyên căn hộ cao cấp view sông, shophouse trung tâm Quận 1 và biệt thự ven sông Thảo Điền / Phú Mỹ Hưng.",
    shortDescription: "Căn hộ cao cấp Thủ Thiêm · Biệt thự Thảo Điền · View sông Sài Gòn",
    thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục đô thị sông nước rực rỡ với tông Xanh Coban Sài Gòn & Vàng Cam Sunset",
      "Thẻ tin Saigon Skyline Card hiển thị view sông trực diện & cự ly ga Metro m",
      "Bộ lọc BĐS trọng điểm: Thủ Thiêm TP. Thủ Đức, Quận 1 Bến Nghé, Thảo Điền, Q.7",
      "Trang chi tiết BĐS kèm bản đồ quy hoạch kết nối cầu Thủ Thiêm 1-4 & Metro số 1",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Tháp biểu tượng, Tin tức, Giới thiệu, Liên hệ",
      "Tích hợp giỏ hàng chuyển nhượng giá tốt khu đô thị mới Thủ Thiêm"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 18,
    targetAudience: ["Sàn phân phối căn hộ & shophouse tại TP. Hồ Chí Minh", "Đại lý chiến lược F1 khu vực Thủ Thiêm, Quận 1, Quận 2", "Chuyên viên môi giới BĐS cao cấp khu Đông & Nam Sài Gòn"],
    highlights: ["Saigon Skyline River Cards", "Thu Thiem Financial Hub Filters", "Metro Line 1 Proximity", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["SaigonCardModule", "MetroProximityModule", "ThuThiemProjectModule", "SaigonEconomyModule"],
    benefits: ["Nắm bắt trọn vẹn sức hút của trung tâm kinh tế sôi động nhất Việt Nam", "Hình ảnh lung linh hiện đại nâng tầm giá trị BĐS", "Tăng 380% tỷ lệ chuyển đổi"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#1D4ED8",
      secondaryColor: "#1E40AF",
      accentColor: "#F59E0B",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(29, 78, 216, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Saigon Riverfront Skyline Hero với Search Bar trung tâm TP.HCM",
      navigationStyle: "Cobalt Blue Dynamic Navbar",
      cardStyle: "Saigon Skyline River Card (Grid view sông, cự ly Metro m)",
      galleryStyle: "Saigon Nightlife Panorama Slider",
      ctaStyle: "Cobalt Dynamic Action Button",
      spacingScale: "Dynamic Metropolis Spacing"
    },
    wireframe: ["HeaderSaigonEstate", "HeroSaigonSearch", "SaigonListingsGrid", "TopThuThiemTowers", "FooterSaigonEstate"],
    sectionConfig: {
      sourceSlug: "portal-18",
      heroTitle: "BẤT ĐỘNG SẢN VEN SÔNG & TRUNG TÂM SÀI GÒN",
      heroSubtitle: "Khám phá hơn 8.000 căn hộ cao cấp Thủ Thiêm, shophouse trung tâm Quận 1 và biệt thự ven sông Thảo Điền."
    }
  },
  // ─── PORTAL 19. CENTRAL COAST SCENIC PORTAL ────────────────────────────────
  {
    id: "portal-19",
    name: "Template #19 - Central Coast Scenic Portal",
    slug: "portal-19",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #19",
    badgeBg: "#0284C7",
    badgeColor: "#FFFFFF",
    accentColor: "#0284C7",
    description: "Cổng thông tin bất động sản duyên hải miền Trung (Đà Nẵng, Nha Trang, Quy Nhơn, Phú Yên, Phan Thiết). Chuyên biệt thự mặt biển trực diện, condotel 5 sao vận hành quốc tế, shophouse phố đi bộ biển và đất nền ven biển có sổ.",
    shortDescription: "Villa view vịnh biển · Condotel 5 sao · BĐS duyên hải miền Trung",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục duyên hải phóng khoáng với tông Xanh Ngọc Vịnh Biển & Vàng San Hô",
      "Thẻ tin Bay View Resort Card hiển thị view vịnh biển & chia sẻ doanh thu 85/15",
      "Bộ lọc BĐS 5 thiên đường biển: Đà Nẵng, Nha Trang, Cam Ranh, Quy Nhơn, Phú Yên",
      "Trang chi tiết BĐS kèm bài toán khai thác cho thuê phòng & đêm nghỉ dưỡng miễn phí",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Quần thể Resort, Cẩm nang, Giới thiệu, Liên hệ",
      "Tích hợp form đăng ký tour trải nghiệm nghỉ dưỡng vịnh biển miễn phí"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 19,
    targetAudience: ["Sàn phân phối BĐS nghỉ dưỡng ven biển miền Trung", "Đại lý chiến lược các quần thể resort Đà Nẵng / Nha Trang / Quy Nhơn", "Nhà đầu tư second-home & dòng tiền khai thác du lịch"],
    highlights: ["Bay View Resort Cards", "Central Coast 5 Beach Cities", "Rental Profit Sharing Specs", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["BayViewCardModule", "BeachCityNavigatorModule", "ResortProjectModule", "TourismEconomyModule"],
    benefits: ["Nâng tầm xúc tiến bán hàng các siêu phẩm resort vịnh biển miền Trung", "Định lượng bài toán sinh lời du lịch minh bạch", "Tăng 370% lượng khách đăng ký tour trải nghiệm"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0284C7",
      secondaryColor: "#0369A1",
      accentColor: "#F59E0B",
      bgColor: "#F0F9FF",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "1.5rem",
      shadowToken: "0 10px 15px -3px rgba(2, 132, 199, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Central Coast Scenic Hero với Search Bar thành phố biển",
      navigationStyle: "Sky Ocean Rounded Navbar",
      cardStyle: "Bay View Resort Card (Ảnh 16:9, badge view vịnh biển m)",
      galleryStyle: "Scenic Coastal Landscape Slider",
      ctaStyle: "Scenic Ocean Blue Action Button",
      spacingScale: "Tropical Coastal Spacing"
    },
    wireframe: ["HeaderCentralCoast", "HeroCoastalSearch", "BayViewListingsGrid", "TopResortComplexes", "FooterCentralCoast"],
    sectionConfig: {
      sourceSlug: "portal-19",
      heroTitle: "BẤT ĐỘNG SẢN DUYÊN HẢI MIỀN TRUNG TUYỆT MỸ",
      heroSubtitle: "Khám phá hơn 6.000 biệt thự biển, condotel 5 sao và shophouse phố đêm du lịch tại Đà Nẵng, Nha Trang, Quy Nhơn."
    }
  },
  // ─── PORTAL 20. MOUNTAIN & HIGHLAND RETREAT PORTAL ─────────────────────────
  {
    id: "portal-20",
    name: "Template #20 - Mountain & Highland Retreat Portal",
    slug: "portal-20",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #20",
    badgeBg: "#166534",
    badgeColor: "#FEFCE8",
    accentColor: "#166534",
    description: "Cổng thông tin bất động sản nghỉ dưỡng cao nguyên sương mờ và chữa lành (Đà Lạt, Bảo Lộc, Măng Đen, Sa Pa, Tam Đảo). Chuyên biệt thự đồi thông săn mây cao 1.500m, bungalow suối rừng, đồi chè sinh thái và khuôn viên homestay kinh doanh.",
    shortDescription: "Biệt thự đồi thông · View săn mây cao nguyên · Nghỉ dưỡng chữa lành",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục đồi thông mộc mạc Rustic với tông Xanh Thông Rừng Rậm & Nâu Gỗ Cedar",
      "Thẻ tin Highland Mist Card hiển thị độ cao 1.500m & nhiệt độ bình quân 18°C",
      "Bộ lọc 5 thủ phủ nghỉ dưỡng sương mù: Đà Lạt, Bảo Lộc, Măng Đen, Sa Pa, Tam Đảo",
      "Trang chi tiết BĐS kèm thông tin thổ nhưỡng, nguồn nước suối tự nhiên & giấy phép xây dựng homestay",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Làng thông, Cẩm nang, Giới thiệu, Liên hệ",
      "Tích hợp tour săn mây cao nguyên cuối tuần trải nghiệm khí hậu trong lành"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 20,
    targetAudience: ["Sàn môi giới BĐS nghỉ dưỡng Đà Lạt, Lâm Đồng, Tây Nguyên, Tây Bắc", "Chủ đầu tư các cụm làng sinh thái & farmstay đồi thông", "Khách hàng tìm kiếm ngôi nhà thứ 2 để tĩnh dưỡng và chữa lành"],
    highlights: ["Highland Mist Retreat Cards", "1500m Altitude & Cloud Hunting Specs", "Rustic Eco-Chalet Design", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["HighlandMistCardModule", "AltitudeClimateNavigatorModule", "PineVillageProjectModule", "WellnessRetreatModule"],
    benefits: ["Đánh trúng thị hiếu bất động sản nghỉ dưỡng núi rừng và xu hướng chữa lành", "Gia tăng 350% tỷ lệ giữ chân người xem với trải nghiệm hình ảnh mộng mơ", "Khẳng định vị thế chuyên gia cao nguyên"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#166534",
      secondaryColor: "#14532D",
      accentColor: "#854D0E",
      bgColor: "#F0FDF4",
      cardBgColor: "#FFFDF7",
      textColor: "#052E16",
      radiusToken: "1.5rem",
      shadowToken: "0 10px 15px -3px rgba(22, 101, 52, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Highland Mist Cloud Hunting Hero với Search Bar độ cao & view đồi",
      navigationStyle: "Pine Forest Green Rounded Navbar",
      cardStyle: "Highland Mist Retreat Card (Viền xanh thông, badge săn mây)",
      galleryStyle: "Mist Forest Panorama Slider",
      ctaStyle: "Pine Forest Green Action Button",
      spacingScale: "Rustic Mountain Spacing"
    },
    wireframe: ["HeaderHighlandRetreat", "HeroHighlandSearch", "HighlandListingsGrid", "TopPineEcoVillages", "FooterHighlandRetreat"],
    sectionConfig: {
      sourceSlug: "portal-20",
      heroTitle: "BẤT ĐỘNG SẢN NGHỈ DƯỠNG CAO NGUYÊN SƯƠNG MỜ",
      heroSubtitle: "Hơn 3.500 biệt thự đồi săn mây, bungalow suối rừng và homestay sinh thái tại Đà Lạt, Bảo Lộc, Măng Đen, Sa Pa."
    }
  },
  // ─── PORTAL 21. CLEAN MINIMAL SCANDINAVIAN PORTAL ──────────────────────────
  {
    id: "portal-21",
    name: "Template #21 - Clean Minimal Scandinavian Portal",
    slug: "portal-21",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #21",
    badgeBg: "#0F172A",
    badgeColor: "#F8FAFC",
    accentColor: "#334155",
    description: "Cổng thông tin bất động sản phong cách Bắc Âu (Scandinavian / Japandi / Warm Minimalist). Chuyên căn hộ studio tinh gọn, duplex tối giản, nhà phố phong cách Muji và biệt thự kính đón nắng ngập tràn. Tối ưu hóa thông số ánh sáng và diện tích thông thủy.",
    shortDescription: "Phong cách Bắc Âu · Ánh sáng tự nhiên · Căn hộ & Nhà phố tối giản",
    thumbnail: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục tinh gọn hiện đại với tông Xám Bê Tông Tối Giản & Đen Carbon Tinh Tế",
      "Thẻ tin Nordic Minimal Card hiển thị độ đón sáng Lux & thông gió chéo",
      "Bộ lọc phong cách kiến trúc: Studio Japandi, Duplex thông tầng, Warm Minimalist",
      "Trang chi tiết BĐS kèm sơ đồ bố trí công năng đón nắng & vật liệu gỗ sồi tự nhiên",
      "Đầy đủ 9 trang con: Mua bán, Thuê, Sang nhượng, Dự án kiến trúc, Triết lý, Giới thiệu, Liên hệ",
      "Lookbook tuyển tập 50+ mẫu không gian tối giản đẹp nhất 2026"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 21,
    targetAudience: ["Sàn BĐS và công ty thiết kế nội thất bán kèm sản phẩm hoàn thiện", "Đơn vị môi giới căn hộ dịch vụ cao cấp cho chuyên gia nước ngoài", "Khách hàng trẻ yêu thích phong cách sống tối giản tinh gọn"],
    highlights: ["Nordic Minimal Clean Cards", "Natural Light Lux & Cross-Ventilation", "Japandi & Scandinavian Design", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["NordicCardModule", "MinimalLayoutModule", "ArchitecturalProjectModule", "MinimalPhilosophyModule"],
    benefits: ["Thu hút tệp khách hàng trẻ có gu thẩm mỹ cao và tài chính tốt", "Trải nghiệm duyệt web thanh lịch không bị rối mắt", "Tăng 320% thời gian xem trang"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0F172A",
      secondaryColor: "#334155",
      accentColor: "#64748B",
      bgColor: "#FAFBFD",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "0px",
      shadowToken: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
    },
    layoutConfig: {
      heroStyle: "Nordic Minimal Clean Hero với Clean Search Box",
      navigationStyle: "Clean Minimalist Border Navbar",
      cardStyle: "Nordic Minimal Clean Card (Khung viền sắc nét, badge ánh sáng Lux)",
      galleryStyle: "Minimalist Lightbox Slider",
      ctaStyle: "Clean Carbon Minimal Button",
      spacingScale: "Generous Breathing Spacing"
    },
    wireframe: ["HeaderNordicEstate", "HeroMinimalSearch", "NordicListingsGrid", "TopAwardWinningProjects", "FooterNordicEstate"],
    sectionConfig: {
      sourceSlug: "portal-21",
      heroTitle: "KHÔNG GIAN SỐNG TỐI GIẢN ĐÓN NẮNG TỰ NHIÊN",
      heroSubtitle: "Tuyển chọn hơn 2.000 căn hộ studio, duplex và nhà phố phong cách Bắc Âu tinh tế, ngập tràn ánh sáng và gió trời."
    }
  },
  // ─── PORTAL 22. NIGHT LIFE & COMMERCIAL STRIP PORTAL ───────────────────────
  {
    id: "portal-22",
    name: "Template #22 - Night Life & Commercial Strip Portal",
    slug: "portal-22",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #22",
    badgeBg: "#090A0F",
    badgeColor: "#EC4899",
    accentColor: "#EC4899",
    description: "Cổng thông tin bất động sản kinh tế đêm, phố đi bộ sầm uất và tuyến phố thương mại giải trí (Bùi Viện, Tạ Hiện, Grand World). Chuyên shophouse phố đêm 24/7, sang nhượng Pub & Lounge, nhà hàng F&B đêm với đầy đủ giấy phép PCCC và lưu lượng khách khủng.",
    shortDescription: "Phố đi bộ 24/7 · Sang nhượng Bar & Lounge · BĐS kinh tế đêm",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục phố đêm rực rỡ với tông Đen Neon & Hồng Tím Rực Rỡ",
      "Thẻ tin Neon Night Strip Card hiển thị lưu lượng khách đêm 25.000 lượt & chuẩn PCCC",
      "Bộ lọc 5 thủ phủ kinh tế đêm: Bùi Viện, Tạ Hiện, Grand World, Bạch Đằng, Phố Tây",
      "Trang chi tiết BĐS kèm báo cáo doanh thu đêm, danh mục thiết bị âm thanh ánh sáng sang nhượng",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Đại lộ thương mại, Cẩm nang, Giới thiệu, Liên hệ",
      "Tích hợp kết nối các chuỗi F&B và dịch vụ giải trí lớn tại Việt Nam"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 22,
    targetAudience: ["Sàn giao dịch và môi giới chuyên sâu ngành F&B, Nightlife & Giải trí", "Chủ thương hiệu chuỗi Bar, Pub, Lounge, Club, Karaoke, Nhà hàng đêm", "Chủ sở hữu nhà phố ngã tư và shophouse trục phố đi bộ"],
    highlights: ["Neon Night Strip Cards", "24/7 Night Life Footfall Specs", "Entertainment License & Fire Safety", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["NeonStripCardModule", "NightFootfallNavigatorModule", "CommercialAvenueModule", "NightEconomyModule"],
    benefits: ["Độc quyền khai thác phân khúc bất động sản kinh tế đêm siêu lợi nhuận", "Thu hút hàng nghìn nhà đầu tư F&B và giải trí", "Tăng 400% giao dịch sang nhượng mặt bằng"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#090A0F",
      secondaryColor: "#151722",
      accentColor: "#EC4899",
      bgColor: "#090A0F",
      cardBgColor: "#151722",
      textColor: "#F1F5F9",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(236, 72, 153, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Neon Night Strip Hero với Search Bar dịch vụ giải trí",
      navigationStyle: "Midnight Neon Pink Navbar",
      cardStyle: "Neon Night Strip Card (Viền dạ quang neon, badge hoạt động 24/7)",
      galleryStyle: "Nightlife Strip Panorama Slider",
      ctaStyle: "Neon Gradient Glow Action Button",
      spacingScale: "Electric Urban Spacing"
    },
    wireframe: ["HeaderNightStrip", "HeroNightSearch", "NeonStripListingsGrid", "TopCommercialAvenues", "FooterNightStrip"],
    sectionConfig: {
      sourceSlug: "portal-22",
      heroTitle: "MẶT BẰNG PHỐ ĐI BỘ & SANG NHƯỢNG BAR LOUNGE 24/7",
      heroSubtitle: "Tổng hợp hơn 1.800 shophouse phố đi bộ, mặt bằng F&B đêm và quán pub/lounge kinh doanh sầm uất tại Bùi Viện, Tạ Hiện, Grand World."
    }
  },
  // ─── PORTAL 23. LUXURY PENTHOUSE & SKY VILLA PORTAL ────────────────────────
  {
    id: "portal-23",
    name: "Template #23 - Luxury Penthouse & Sky Villa Portal",
    slug: "portal-23",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #23",
    badgeBg: "#05060A",
    badgeColor: "#FACC15",
    accentColor: "#FACC15",
    description: "Cổng thông tin chuyên biệt cho dòng bất động sản đỉnh cao trên nóc các tòa tháp chọc trời (Penthouse áp mái, Sky Villa hồ bơi riêng, Duplex thông tầng trần cao 7m) phục vụ giới siêu giàu UHNWIs và các gia tộc tài phiệt. Tiêu chuẩn bảo mật thông tin tuyệt đối.",
    shortDescription: "Penthouse áp mái · Sky Villa hồ bơi riêng · Tháp chọc trời",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Deep Space sang trọng với tông Đen Vũ Trụ & Vàng Bạch Kim Platinum",
      "Thẻ tin Sky High Penthouse Card hiển thị tầng 45+, Private Sky Pool & Private Lift",
      "Bộ lọc phân khúc đỉnh cao: Grand Penthouse 1.000m², Sky Villa hồ bơi vô cực, Duplex 7m",
      "Trang chi tiết BĐS kèm tầm nhìn 360 độ Panorama và hồ sơ thẩm định giá trị độc bản",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Tháp biểu tượng, Góc nhìn, Hồ sơ, Viewing",
      "Cổng đăng nhập Private Client bảo mật OTP dành riêng cho thành viên VIP"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 23,
    targetAudience: ["Đơn vị môi giới Private Client & Family Office phục vụ giới siêu giàu", "Chủ đầu tư phân phối các căn Penthouse phiên bản giới hạn tại các tòa tháp", "Nhà môi giới triệu đô chuyên dòng Sky Villa"],
    highlights: ["Sky High Penthouse Cards", "Private Lift & Infinity Sky Pool Specs", "Deep Space & Platinum Gold Theme", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["SkyHighCardModule", "PrivateViewingModule", "SkyscraperProjectModule", "UltraLuxuryModule"],
    benefits: ["Xác lập vị thế đỉnh cao không đối thủ trong phân khúc BĐS siêu sang", "Tạo sự tin cậy tuyệt đối cho khách hàng VIP nhờ tính năng bảo mật kín đáo", "Tối ưu hóa hình ảnh thương hiệu xa xỉ"],
    themeConfig: {
      fontHeading: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#05060A",
      secondaryColor: "#0C0E14",
      accentColor: "#FACC15",
      bgColor: "#05060A",
      cardBgColor: "#0C0E14",
      textColor: "#F1F5F9",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(250, 204, 21, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Sky Horizon Sunset Hero với Search Bar tầng không",
      navigationStyle: "Deep Space Platinum Gold Navbar",
      cardStyle: "Sky High Penthouse Card (Viền ánh kim vàng Platinum, badge hồ bơi riêng)",
      galleryStyle: "Panorama 360 Sky Horizon Slider",
      ctaStyle: "Platinum Gold Luxury Button",
      spacingScale: "Pinnacle Space Spacing"
    },
    wireframe: ["HeaderSkyVillaEstate", "HeroSkyHorizonSearch", "SkyHighListingsGrid", "TopIconicSkyscrapers", "FooterSkyVillaEstate"],
    sectionConfig: {
      sourceSlug: "portal-23",
      heroTitle: "TUYỆT TÁC PENTHOUSE & SKY VILLA TẦNG KHÔNG",
      heroSubtitle: "Bộ sưu tập độc quyền các căn dinh thự trên đỉnh những tòa tháp biểu tượng đắt giá nhất Việt Nam."
    }
  },
  // ─── PORTAL 24. SMART CITY & FUTURE LIVING PORTAL ──────────────────────────
  {
    id: "portal-24",
    name: "Template #24 - Smart City & Future Living Portal",
    slug: "portal-24",
    collectionSlug: "portal",
    collectionName: "Listing Portal Collection",
    badge: "DÒNG A #24",
    badgeBg: "#0B0F19",
    badgeColor: "#06B6D4",
    accentColor: "#06B6D4",
    description: "Cổng thông tin bất động sản đô thị thông minh, thành phố tương lai (Smart City, AI Home, IoT, xe điện EV Charging, năng lượng tái tạo mặt trời Solar Roof). Chuyên căn hộ thông minh điều khiển bằng giọng nói, biệt thự sinh thái tự cung tự cấp năng lượng Net-Zero.",
    shortDescription: "Đô thị thông minh · AI Smart Home · Trạm sạc EV & Net-Zero",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Bố cục Cybernetic Futuristic với tông Xanh Điện Tử Cyber Blue & Đen Công Nghệ",
      "Thẻ tin Future Smart Home Card hiển thị AI Smart Home, Trạm sạc EV & Chứng chỉ LEED",
      "Bộ lọc chuẩn công nghệ tiên phong: Căn hộ AI Voice Control, Biệt thự Net-Zero, Smart Hub",
      "Trang chi tiết BĐS kèm thông số hệ sinh thái IoT, mức tiết kiệm năng lượng 40% và bản đồ trạm sạc",
      "Đầy đủ 9 trang con: Bán, Thuê, Sang nhượng, Đại đô thị Smart City, PropTech, Giới thiệu, Trải nghiệm",
      "Cổng cư dân thông minh tích hợp điều khiển thiết bị mẫu trực tiếp trên website"
    ],
    priceBuy: 499000,
    priceBuySource: 1490000,
    priceRentMonthly: 169000,
    isActive: true,
    sortOrder: 24,
    targetAudience: ["Chủ đầu tư các đại đô thị thông minh và công trình xanh Net-Zero", "Sàn phân phối tiên phong công nghệ PropTech và smart living", "Cư dân thế hệ mới (Gen Z, Millennials, chuyên gia công nghệ)"],
    highlights: ["Future Smart Home Cards", "IoT Smart Living & EV Charging Specs", "LEED Gold & Net-Zero Certified", "Đầy đủ 9 Trang Con"],
    availablePages: ["Trang chủ", "Nhà đất bán", "Nhà đất cho thuê", "Sang nhượng", "Chi tiết tin đăng", "Danh sách dự án", "Chi tiết dự án", "Tin tức BĐS", "Chi tiết tin tức", "Giới thiệu", "Liên hệ & Ký gửi", "Đăng ký / Đăng nhập"],
    modules: ["SmartCardModule", "PropTechModule", "SmartCityProjectModule", "NetZeroLivingModule"],
    benefits: ["Đón đầu làn sóng chuyển đổi số và công nghệ xanh trong bất động sản", "Khác biệt hóa 100% so với các sàn môi giới truyền thống", "Tăng 450% lượng khách hàng trẻ tiềm năng"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#0B0F19",
      secondaryColor: "#111827",
      accentColor: "#06B6D4",
      bgColor: "#0B0F19",
      cardBgColor: "#111827",
      textColor: "#F1F5F9",
      radiusToken: "1rem",
      shadowToken: "0 10px 15px -3px rgba(6, 182, 212, 0.15)"
    },
    layoutConfig: {
      heroStyle: "Cybernetic Smart City Hero với Search Bar chuẩn công nghệ",
      navigationStyle: "Deep Space Cyber Blue Navbar",
      cardStyle: "Future Smart Home Card (Viền dạ quang Cyber Blue, badge AI Smart Home)",
      galleryStyle: "Futuristic Hologram Slider",
      ctaStyle: "Cyber Blue Glowing Button",
      spacingScale: "Futuristic Matrix Spacing"
    },
    wireframe: ["HeaderSmartCityHub", "HeroSmartSearch", "SmartListingsGrid", "TopSmartCityProjects", "FooterSmartCityHub"],
    sectionConfig: {
      sourceSlug: "portal-24",
      heroTitle: "CỔNG BẤT ĐỘNG SẢN ĐÔ THỊ THÔNG MINH AI & NET-ZERO",
      heroSubtitle: "Tổng hợp hơn 4.200 căn hộ thông minh điều khiển giọng nói, biệt thự năng lượng mặt trời và shophouse công nghệ cao tại các đại đô thị thông minh tiên phong."
    }
  },

// ─── LP 01. LANDING PAGE CĂN HỘ CAO CẤP LAUNCH FUNNEL ──────────────────────
  {
    id: "lp-01",
    name: "LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel",
    slug: "lp-01",
    collectionSlug: "landing-page",
    collectionName: "Kho Landing Page Sale BĐS",
    badge: "LANDING PAGE #01",
    badgeBg: "#2563EB",
    badgeColor: "#FFFFFF",
    accentColor: "#2563EB",
    description: "Landing Page chuyên biệt 1 trang tối ưu chuyển đổi cao cho chiến dịch chạy quảng cáo Facebook/Google Ads bán căn hộ chung cư cao cấp. Tích hợp Countdown Timer đếm ngược ưu đãi, Form nhận bảng giá VIP, Mặt bằng điển hình 1PN-2PN-3PN, Gallery thực tế kèm Lightbox Zoom và Bảng tính lãi vay trực quan.",
    shortDescription: "Landing Page 1 trang · Bán Căn Hộ · Thu Lead Chạy Ads Siêu Tốc",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Cấu trúc 1 trang Single-Page Sales Funnel chuyên chạy quảng cáo Ads chuyển đổi cao",
      "Thanh thông báo đếm ngược Countdown Timer ưu đãi chiết khấu 10% đợt 1",
      "Form nhận Bảng Giá & Mặt Bằng VIP thu lead trực tiếp về CMS và Zalo",
      "Layout Mặt bằng điển hình 1PN, 2PN, 3PN, Penthouse tab mượt mà",
      "Công cụ dự tính khoản vay ngân hàng & Lịch trả góp hàng tháng tự động",
      "Thư viện ảnh thực tế tích hợp Lightbox phóng to và tự chuyển động 3s",
      "Nút Hotline rung lắc và Chat Zalo 1 chạm bám theo góc màn hình"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 25,
    targetAudience: ["Sale BĐS chuyên chạy Ads bán căn hộ", "Phòng kinh doanh phân phối dự án chung cư", "Môi giới BĐS độc lập", "Đại lý phân phối F1"],
    highlights: ["Single-Page Sales Funnel", "Lead Capture VIP Form", "Loan Calculator", "Countdown Urgency Bar"],
    availablePages: ["Trang chủ Single Page Landing"],
    modules: ["UrgencyTimerModule", "SalesLeadFormModule", "FloorPlanInteractiveModule", "LoanCalculatorModule", "StickyContactModule"],
    benefits: ["Tăng 400% tỷ lệ để lại số điện thoại", "Tối ưu chi phí mỗi lead chạy quảng cáo Facebook/Google", "Chuyên nghiệp hóa hình ảnh chuyên viên bán hàng"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#2563EB",
      secondaryColor: "#1E293B",
      accentColor: "#F59E0B",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(0,0,0,0.1)"
    },
    layoutConfig: {
      heroStyle: "High-Converting Split Hero with Floating VIP Lead Form",
      navigationStyle: "Clean Sticky Single-Page Nav",
      cardStyle: "Modern Glassmorphism Card",
      galleryStyle: "Interactive 3s Autoplay Gallery with Lightbox Zoom",
      ctaStyle: "Glowing Urgent Sales CTA Button",
      spacingScale: "Comfortable Conversion Spacing"
    },
    wireframe: ["TopUrgencyBar", "HeaderSticky", "HeroSplitLeadForm", "GalleryShowcase", "FloorPlanLayouts", "LoanCalculator", "FloatingContactBar"],
    sectionConfig: {
      sourceSlug: "lp-01",
      heroTitle: "CĂN HỘ CAO CẤP VIEW TRỌN MẶT HỒ",
      heroSubtitle: "Sở hữu căn hộ hạng sang trung tâm chỉ từ 3.2 Tỷ/căn. Thanh toán 15% nhận nhà ngay, ngân hàng hỗ trợ 70% ân hạn 24 tháng."
    }
  },

// ─── LP 02. LANDING PAGE BIỆT THỰ & NGHỈ DƯỠNG HOÀNG GIA VIP ────────────────
  {
    id: "lp-02",
    name: "LP #02 - Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP",
    slug: "lp-02",
    collectionSlug: "landing-page",
    collectionName: "Kho Landing Page Sale BĐS",
    badge: "LANDING PAGE #02",
    badgeBg: "#D97706",
    badgeColor: "#FFFFFF",
    accentColor: "#D97706",
    description: "Landing Page phong cách Hoàng Gia Thượng Lưu chuyên phân phối Biệt thự đơn lập, Dinh thự ven sông, Penthouse và BĐS nghỉ dưỡng triệu đô. Form đăng ký nhận hồ sơ pháp lý bảo mật & đặt lịch xe VIP/trực thăng đưa đón.",
    shortDescription: "Landing Page 1 trang · Biệt Thự & Dinh Thự · Sang Trọng Đẳng Cấp",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Tone màu Đen Hoàng Gia (Dark Luxury) & Vàng Kim (Royal Gold) sang trọng bậc nhất",
      "Form đăng ký bảo mật dành riêng cho giới thượng lưu và nhà đầu tư VIP",
      "Trình diễn bộ sưu tập dinh thự ven sông giới hạn với Video & Gallery sắc nét",
      "Tích hợp nút đặt lịch đưa đón bằng xe Limousine / Trực thăng xem thực tế",
      "Bảng phân tích cam kết sinh lời và tiềm năng tăng giá bền vững"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 26,
    targetAudience: ["Chuyên viên môi giới BĐS triệu đô", "Đơn vị phân phối Biệt thự & Dinh thự VIP", "Chủ đầu tư BĐS Nghỉ dưỡng 5 sao"],
    highlights: ["Royal Dark Luxury Theme", "VIP Limousine Booking", "High Net Worth Funnel", "Exclusive Collection"],
    availablePages: ["Trang chủ Single Page Landing"],
    modules: ["DarkLuxuryHeroModule", "PrivateAuditLeadModule", "ExclusiveGalleryModule", "VIPBookingModule"],
    benefits: ["Nâng tầm đẳng cấp giỏ hàng BĐS triệu đô", "Thu hút đúng tệp khách hàng thượng lưu nhiều tiền", "Gia tăng tỷ lệ chốt cọc bất động sản cao cấp"],
    themeConfig: {
      fontHeading: "'Cinzel', 'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#D97706",
      secondaryColor: "#0B0F19",
      accentColor: "#F59E0B",
      bgColor: "#0B0F19",
      cardBgColor: "#141A29",
      textColor: "#F1F5F9",
      radiusToken: "20px",
      shadowToken: "0 20px 40px -15px rgba(217,119,6,0.2)"
    },
    layoutConfig: {
      heroStyle: "Cinematic Dark Hero with Golden Highlights",
      navigationStyle: "Dark Frosted Glass Navbar",
      cardStyle: "Royal Gold Bordered Card",
      galleryStyle: "Fullwidth Luxury Lightbox Carousel",
      ctaStyle: "Gold Gradient Metallic Button",
      spacingScale: "Spacious Luxury Spacing"
    },
    wireframe: ["RoyalAnnouncementBar", "DarkNavbar", "CinematicHeroLeadForm", "LuxuryGallery", "PrivateBookingCTA"],
    sectionConfig: {
      sourceSlug: "lp-02",
      heroTitle: "DINH THỰ VEN SÔNG CHUẨN RESORT 6 SAO",
      heroSubtitle: "Không gian sống riêng tư biệt lập, diện tích 450m² - 1200m², hầm rượu riêng, bến đỗ du thuyền cá nhân."
    }
  },

// ─── LP 03. LANDING PAGE ĐẤT NỀN PHÂN LÔ F0 SỔ ĐỎ TRAO TAY ──────────────────
  {
    id: "lp-03",
    name: "LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay",
    slug: "lp-03",
    collectionSlug: "landing-page",
    collectionName: "Kho Landing Page Sale BĐS",
    badge: "LANDING PAGE #03",
    badgeBg: "#059669",
    badgeColor: "#FFFFFF",
    accentColor: "#059669",
    description: "Landing Page chuyên đánh hàng mở bán Đất Nền Phân Lô F0, Đô thị sinh thái ven đô. Tối ưu thu hút nhà đầu tư F0 với chính sách chiết khấu vàng, sổ hồng trao tay từng nền, form đặt lịch xe đón xem đất miễn phí cuối tuần.",
    shortDescription: "Landing Page 1 trang · Đất Nền F0 · Bùng Nổ Doanh Số Mở Bán",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Cấu trúc bùng nổ chuyển đổi dành riêng cho sự kiện mở bán Đất Nền đợt 1",
      "Tập trung nhấn mạnh Pháp lý 1/500 hoàn thiện & Sổ đỏ trao tay công chứng ngay",
      "Form đăng ký xe ô tô đưa đón tận nhà xem dự án miễn phí sáng Thứ 7 & Chủ Nhật",
      "Trình diễn bản đồ quy hoạch phân lô, vị trí vàng đón đầu hạ tầng cao tốc",
      "Cam kết chiết khấu khủng và tặng vàng 9999 cho khách hàng cọc sớm"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 27,
    targetAudience: ["Đội nhóm sale chuyên đánh đất nền tỉnh & ven đô", "Công ty bất động sản phân lô bán nền", "Môi giới đất nền F0"],
    highlights: ["F0 Launch Funnel", "Sổ Đỏ 100% Cam Kết", "Xe Đưa Đón Miễn Phí", "Chiết Khấu Vàng"],
    availablePages: ["Trang chủ Single Page Landing"],
    modules: ["F0UrgencyModule", "LandPlotLeadModule", "MasterPlanViewerModule", "BusBookingModule"],
    benefits: ["Bùng nổ lượng đăng ký xe xem đất cuối tuần", "Thuyết phục nhà đầu tư bằng pháp lý minh bạch", "Chốt cọc nhanh chóng trong ngày mở bán"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#059669",
      secondaryColor: "#0F172A",
      accentColor: "#10B981",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(5,150,105,0.15)"
    },
    layoutConfig: {
      heroStyle: "High Energy Green Emerald Hero with Fast Lead Form",
      navigationStyle: "Clean Trust Navbar",
      cardStyle: "Eco Clean Solid Card",
      galleryStyle: "Site Progress Autoplay Slider",
      ctaStyle: "Emerald Action Button",
      spacingScale: "Tight Conversion Spacing"
    },
    wireframe: ["F0LaunchBar", "TrustNavbar", "HeroLeadForm", "MasterPlanGallery", "BusBookingCTA"],
    sectionConfig: {
      sourceSlug: "lp-03",
      heroTitle: "ĐẤT NỀN TRUNG TÂM GIÁ GỐC F0 CHỈ 890 TRIỆU",
      heroSubtitle: "Hạ tầng hoàn thiện đường nhựa 12m - 24m, điện âm nước máy. Sổ đỏ trao tay công chứng ngay."
    }
  },

// ─── LP 04. LANDING PAGE SALE MÔI GIỚI BĐS TRIỆU ĐÔ AUTHORITY ────────────────
  {
    id: "lp-04",
    name: "LP #04 - Sale Môi Giới BĐS Triệu Đô Authority",
    slug: "lp-04",
    collectionSlug: "landing-page",
    collectionName: "Kho Landing Page Sale BĐS",
    badge: "LANDING PAGE #04",
    badgeBg: "#1D4ED8",
    badgeColor: "#FFFFFF",
    accentColor: "#1D4ED8",
    description: "Landing Page xây dựng thương hiệu cá nhân uy tín số 1 cho Chuyên viên môi giới BĐS / Top Broker. Trưng bày giỏ hàng độc quyền cắt lỗ 15-25%, hồ sơ năng lực 10 năm kinh nghiệm, form gửi yêu cầu tìm nhà nhanh theo ngân sách.",
    shortDescription: "Landing Page 1 trang · Sale Cá Nhân · Khẳng Định Uy Tín Broker VIP",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
    ],
    features: [
      "Tối ưu 100% định vị thương hiệu Chuyên Gia BĐS Uy Tín & Đáng Tin Cậy",
      "Khung giới thiệu Profile thành tích 10+ năm kinh nghiệm & 500+ giao dịch thành công",
      "Bộ sưu tập giỏ hàng 150+ căn độc quyền giá cắt lỗ 15% - 25% thị trường",
      "Form khảo sát nhu cầu tìm nhà theo ngân sách cá nhân hóa",
      "Nút kết nối Zalo & Hotline trực tiếp luôn hiện diện ở mọi góc nhìn"
    ],
    priceBuy: 399000,
    priceBuySource: 1290000,
    priceRentMonthly: 129000,
    isActive: true,
    sortOrder: 28,
    targetAudience: ["Môi giới BĐS chuyên nghiệp", "Top Sales cá nhân các sàn lớn", "Nhà môi giới tự do (Freelance Broker)", "Trưởng phòng kinh doanh BĐS"],
    highlights: ["Personal Branding 100%", "Exclusive Discount Listings", "Fast Lead Survey Form", "Instant Zalo Touch"],
    availablePages: ["Trang chủ Single Page Landing"],
    modules: ["BrokerProfileHeroModule", "DiscountInventoryModule", "CustomSurveyFormModule", "SocialProofModule"],
    benefits: ["Xây dựng niềm tin vững chắc với khách hàng mua nhà", "Khách tự động để lại thông tin nhu cầu & ngân sách", "Tăng 500% cuộc gọi và tin nhắn Zalo tư vấn"],
    themeConfig: {
      fontHeading: "'Inter', sans-serif",
      fontBody: "'Inter', sans-serif",
      primaryColor: "#1D4ED8",
      secondaryColor: "#0F172A",
      accentColor: "#0284C7",
      bgColor: "#F8FAFC",
      cardBgColor: "#FFFFFF",
      textColor: "#0F172A",
      radiusToken: "16px",
      shadowToken: "0 10px 25px -5px rgba(29,78,216,0.15)"
    },
    layoutConfig: {
      heroStyle: "Professional Broker Profile Hero with Instant Request Form",
      navigationStyle: "Personal Header with Avatar",
      cardStyle: "Clean Property Card with Cut-loss Badge",
      galleryStyle: "Exclusive Inventory Carousel",
      ctaStyle: "Blue Royal Action Button",
      spacingScale: "Clean Direct Spacing"
    },
    wireframe: ["BrokerHeader", "HeroProfileForm", "ExclusiveInventory", "ClientTestimonials", "FloatingContact"],
    sectionConfig: {
      sourceSlug: "lp-04",
      heroTitle: "TƯ VẤN ĐẦU TƯ BĐS AN TOÀN & SINH LỜI CAO",
      heroSubtitle: "Nắm giữ 150+ căn hộ & nhà phố độc quyền giá cắt lỗ 15% - 25% so với thị trường. Hỗ trợ pháp lý & xem nhà 24/7."
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
  'bds-01': 'portal-01',
  'bds-1': 'portal-01',
  'bds-02': 'portal-02',
  'bds-2': 'portal-02',
  'bds-03': 'portal-03',
  'bds-3': 'portal-03',
  'bds-04': 'portal-04',
  'bds-4': 'portal-04',
  'bds-05': 'portal-05',
  'bds-5': 'portal-05',
  'bds-06': 'portal-06',
  'bds-6': 'portal-06',
  'bds-07': 'portal-07',
  'bds-7': 'portal-07',
  'bds-08': 'portal-08',
  'bds-8': 'portal-08',
  'bds-09': 'portal-09',
  'bds-9': 'portal-09',
  'bds-10': 'portal-10',
  'bds-11': 'portal-11',
  'bds-12': 'portal-12',
  'bds-13': 'portal-13',
  'bds-14': 'portal-14',
  'bds-15': 'portal-15',
  'bds-16': 'portal-16',
  'bds-17': 'portal-17',
  'bds-18': 'portal-18',
  'bds-19': 'portal-19',
  'bds-20': 'portal-20',
  'bds-21': 'portal-21',
  'bds-22': 'portal-22',
  'bds-23': 'portal-23',
  'bds-24': 'portal-24',
  'portal-01': 'portal-01',
  'portal-classic': 'portal-01',
  'batdongsan-classic': 'portal-01',
  'portal-02': 'portal-02',
  'portal-modern': 'portal-02',
  'metro-estate': 'portal-02',
  'portal-03': 'portal-03',
  'portal-luxury': 'portal-03',
  'prestige-realty': 'portal-03',
  'portal-04': 'portal-04',
  'portal-density': 'portal-04',
  'nhadatso-pro': 'portal-04',
  'portal-05': 'portal-05',
  'portal-map': 'portal-05',
  'map-estate': 'portal-05',
  'portal-06': 'portal-06',
  'portal-eco': 'portal-06',
  'eco-estate': 'portal-06',
  'portal-07': 'portal-07',
  'portal-coastal': 'portal-07',
  'ocean-estate': 'portal-07',
  'portal-08': 'portal-08',
  'portal-industrial': 'portal-08',
  'industrial-pro': 'portal-08',
  'portal-09': 'portal-09',
  'portal-heritage': 'portal-09',
  'heritage-estate': 'portal-09',
  'portal-10': 'portal-10',
  'portal-investment': 'portal-10',
  'invest-pro': 'portal-10',
  'portal-11': 'portal-11',
  'portal-waterfront': 'portal-11',
  'waterfront-villa': 'portal-11',
  'portal-12': 'portal-12',
  'portal-mega': 'portal-12',
  'mega-ecosystem': 'portal-12',
  'portal-13': 'portal-13',
  'portal-auction': 'portal-13',
  'auction-pro': 'portal-13',
  'portal-14': 'portal-14',
  'portal-landplot': 'portal-14',
  'datvuon-pro': 'portal-14',
  'portal-15': 'portal-15',
  'portal-commercial': 'portal-15',
  'retail-podium-portal': 'portal-15',
  'portal-16': 'portal-16',
  'portal-broker': 'portal-16',
  'elite-broker': 'portal-16',
  'portal-17': 'portal-17',
  'portal-hanoi': 'portal-17',
  'hanoi-estate': 'portal-17',
  'portal-18': 'portal-18',
  'portal-saigon': 'portal-18',
  'saigon-estate': 'portal-18',
  'portal-19': 'portal-19',
  'portal-central-coast': 'portal-19',
  'central-coast': 'portal-19',
  'portal-20': 'portal-20',
  'portal-highland': 'portal-20',
  'highland-retreat': 'portal-20',
  'portal-21': 'portal-21',
  'portal-nordic': 'portal-21',
  'nordic-minimal': 'portal-21',
  'portal-22': 'portal-22',
  'portal-nightlife': 'portal-22',
  'nightlife-strip': 'portal-22',
  'portal-23': 'portal-23',
  'portal-penthouse': 'portal-23',
  'skyvilla-estate': 'portal-23',
  'portal-24': 'portal-24',
  'portal-smartcity': 'portal-24',
  'smartcity-hub': 'portal-24',

  'luxury-gold': 'portal-01',
  'minimal-white': 'portal-02',
  'minimal-zen': 'portal-02',
  'modern-corporate': 'portal-03',
  'resort-paradise': 'portal-07',
  'ocean-view': 'portal-07',
  'ocean-blue': 'portal-07',
  'urban-city': 'portal-02',
  'smart-urban': 'portal-02',
  'high-rise': 'portal-02',
  'industrial-estate': 'portal-08',
  'industrial-logistics': 'portal-08',
  'villa-premium': 'portal-11',
  'modern-villa': 'portal-11',
  'luxury-villa': 'portal-11',
  'eco-green': 'portal-06',
  'eco-living': 'portal-06',
  'green-eco': 'portal-06',
  'classic-elegant': 'portal-09',
  'heritage-classic': 'portal-09',
  'classic-heritage': 'portal-09',
  'investment-pro': 'portal-10',
  'tech-hub': 'portal-10',
  'agency-onepage': 'portal-16',
  'suburban-family': 'portal-16',
  'mega-developer': 'portal-12',
  'riverside-mansion': 'portal-12',
  'listing-portal': 'portal-12',
  'auction-template': 'portal-13',
  'auction-bds': 'portal-13',
  'lake-sanctuary': 'portal-13',
  'landplot-template': 'portal-14',
  'land-plot': 'portal-14',
  'mountain-retreat': 'portal-14',
  'retail-podium': 'portal-15',
  'retail-commercial': 'portal-15',
  'commercial-plaza': 'portal-15',
  'personal-agent': 'portal-16',
  'golf-residences': 'portal-16',
  'portal-listing': 'portal-17',
  'vietnam-portal': 'portal-17',
  'bds123-portal': 'portal-18',
  'benthanh-portal': 'portal-18',
  'nhadatso-density': 'portal-04',
  'nhadatso-portal': 'portal-04',
  'minhkhai-apartment': 'portal-12',
  'minhkhai-luxury': 'portal-12',
  'hanoi-rental': 'portal-17',
  'chothue-hanoi': 'portal-17',
  'happyland-resort': 'portal-19',
  'zohotels-resort': 'portal-19',
  'homeo-multithumb': 'portal-22',
  'homeo-agency': 'portal-22',
  'realtybuild-tech': 'portal-24',
  'realtybuild-portal': 'portal-24',
};

export function findTemplateBySlugOrId(slugOrId: string): Template | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId.toLowerCase().trim();
  const mappedSlug = LEGACY_ALIASES[clean] || clean;
  return TEMPLATE_LOOKUP_MAP[mappedSlug] || TEMPLATE_LOOKUP_MAP[clean] || ALL_TEMPLATES.find(t => t.slug === mappedSlug || t.id === clean || t.slug === clean);
}
