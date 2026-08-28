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
  priceRentMonthly: number;
  isActive: boolean;
  sortOrder: number;
  // Phase 2 Architecture & Commercial Extensions
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

const BASE_TEMPLATES: Template[] = [
  {
    id: "mock-1",
    name: "Luxury Gold",
    slug: "luxury-gold",
    collectionSlug: "luxury",
    collectionName: "Luxury Collection",
    badge: "LUXURY VIP",
    badgeBg: "#0F172A",
    badgeColor: "#D4AF37",
    accentColor: "#D4AF37",
    description: "Hero Fullscreen tràn viền sang trọng, tông màu gold đen hoàng gia. Parallax scrolling, Gallery Masonry, Dark Mode. Thiết kế hoàn toàn cho biệt thự Vinhomes, lâu đài, penthouse siêu sang.",
    shortDescription: "Biệt thự · Penthouse · Villa siêu sang",
    thumbnail: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200"
    ],
    features: ["Hero Parallax Fullscreen Video", "Gallery Masonry cao cấp", "Form đăng ký VIP Lounge", "Dark Luxury Mode"],
    priceBuy: 499000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 1,
    targetAudience: ["Chủ đầu tư biệt thự", "Penthouse hạng S", "Lâu đài dinh thự", "VIP Real Estate Agency"],
    highlights: ["Hero Video Fullscreen", "Parallax Scrolling", "Gallery Masonry Gold", "Dark Mode Luxury", "Floor Plan 3D", "VIP Lounge Contact"],
    availablePages: ["Trang chủ VIP", "Bộ sưu tập biệt thự", 'Chi tiết dinh thự', "Gallery Masonry", "Liên hệ Concierge", "404 Gold"],
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
    wireframe: [
      "HeroFullscreenVideo",
      "VIPLoungeIntro",
      "GalleryMasonryGold",
      "AmenitiesPremiumCard",
      "FloorPlanInteractive3D",
      "PrivateTourBooking",
      "LuxuryConciergeFooter"
    ],
    sectionConfig: {
      heroTitle: "DINH THỰ HOÀNG GIA — VINHOMES RIVERSIDE",
      heroSubtitle: "Kiệt tác kiến trúc Ý bên dòng sông ngọc, nơi hội tụ tinh hoa sống đẳng cấp dành cho 18 vị chủ nhân độc tôn.",
      heroPrice: "Từ 120 Tỷ VNĐ / Căn",
      heroStats: [
        { label: "Tổng diện tích", value: "850 m²" },
        { label: "Mặt tiền sông", value: "25 m" },
        { label: "Bể bơi vô cực", value: "Riêng biệt" },
        { label: "Pháp lý", value: "Sổ đỏ vĩnh viễn" }
      ],
      amenities: [
        { title: "Bến Du Thuyền Riêng", desc: "Kết nối trực tiếp ra sông lớn với cầu cảng riêng biệt cho mỗi biệt thự." },
        { title: "Hầm Rượu & Cigar Lounge", desc: "Không gian tiếp khách cách âm, kiểm soát nhiệt độ và độ ẩm tiêu chuẩn Ý." },
        { title: "Hồ Bơi Vô Cực Nước Mặn", desc: "Công nghệ điện phân muối tự nhiên, tầm nhìn panorama toàn cảnh dòng sông." }
      ]
    }
  },
  {
    id: "mock-2",
    name: "Minimal White",
    slug: "minimal-white",
    collectionSlug: "minimal",
    collectionName: "Minimal Collection",
    badge: "APPLE STYLE",
    badgeBg: "#EFF6FF",
    badgeColor: "#2563EB",
    accentColor: "#2563EB",
    description: "Apple-style typography, whitespace cực nhiều, Hero Split layout sạch. Thiết kế tập trung cho môi giới cá nhân và dự án chung cư hiện đại.",
    shortDescription: "Môi giới cá nhân · Chung cư · Startup",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200"
    ],
    features: ["Hero Split Typography Apple", "White Space tối ưu UX", "Card sạch bo góc lớn", "Sticky header tinh tế"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 2,
    targetAudience: ["Môi giới cá nhân Top Performer", "Căn hộ cao cấp hiện đại", "Studio BĐS trẻ", "Chuyên gia bán hàng"],
    highlights: ["Hero Split Layout Apple", "Inter Variable Typography", "Whitespace Chuẩn UX", "Card Bo Góc 24px", "Sticky Header Glass", "Lazy Loading 100/100"],
    availablePages: ["Trang chủ Minimal", "Danh sách Căn hộ", "Giới thiệu Môi giới", "Tin tức thị trường", "Liên hệ & Form đặt lịch", "FAQ"],
    modules: ["Lead Booking Form", "Google Maps Clean", "Zalo 1-Touch", "SEO Score 100", "Google Analytics 4"],
    benefits: ["Tải trang siêu nhanh, điểm Lighthouse tuyệt đối", "Giao diện tinh tế, thân thiện, tạo thiện cảm ngay từ đầu", "Tập trung tối đa vào thông điệp và hình ảnh dự án", "Tối ưu hiển thị tuyệt đối trên iPhone & iPad"],
    themeConfig: {
      fontHeading: "Inter, sans-serif",
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
    wireframe: [
      "HeroSplitApple",
      "PropertyGridRounded",
      "SmartFilterPill",
      "MinimalSpecsTable",
      "AgentBioCard",
      "CleanTestimonialSlider",
      "MinimalStickyFooter"
    ],
    sectionConfig: {
      heroTitle: "Không Gian Sống Tối Giản Cho Người Tinh Tế.",
      heroSubtitle: "Tuyển tập 12 căn hộ cao cấp nhất tại trung tâm quận 1, được thiết kế tối ưu ánh sáng tự nhiên và tầm nhìn toàn cảnh thành phố.",
      heroAgentName: "Nguyễn Minh Tuấn — Senior Real Estate Advisor",
      properties: [
        { title: "Lumière Riverside 3PN", price: "8.5 Tỷ", location: "Thảo Điền, Quận 2", area: "102 m²", beds: 3, baths: 2, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" },
        { title: "The Metropole Thủ Thiêm 2PN", price: "14.2 Tỷ", location: "Thủ Thiêm, TP. Thủ Đức", area: "88 m²", beds: 2, baths: 2, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" },
        { title: "Zenity Capital Land Penthouse", price: "35.0 Tỷ", location: "Quận 1, TP.HCM", area: "210 m²", beds: 4, baths: 4, img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600" }
      ]
    }
  },
  {
    id: "mock-3",
    name: "Modern Corporate",
    slug: "modern-corporate",
    collectionSlug: "corporate",
    collectionName: "Corporate Collection",
    badge: "CORPORATE PRO",
    badgeBg: "#0F4C81",
    badgeColor: "#FFFFFF",
    accentColor: "#0F4C81",
    description: "Grid layout doanh nghiệp chuyên nghiệp. Mega Menu, trang Đối tác, trang Tuyển dụng hoàn chỉnh. Phù hợp cho tổng công ty và sàn BĐS quy mô lớn.",
    shortDescription: "Tổng công ty · Sàn lớn · Tập đoàn",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200"
    ],
    features: ["Mega Menu chuyên nghiệp", "Grid dự án phân phối", "Trang Đối tác & Tuyển dụng", "Timeline công ty"],
    priceBuy: 499000,
    priceRentMonthly: 799000,
    isActive: true,
    sortOrder: 3,
    targetAudience: ["Tổng công ty BĐS", "Sàn giao dịch quy mô 100+ nhân sự", "Tập đoàn phân phối", "Agency nhiều chi nhánh"],
    highlights: ["Grid Dự án phân phối", "Mega Menu Đa Tầng", "Khu vực Đối tác Chiến lược", "Trang Tuyển Dụng & Career", "Timeline Phát triển", "Chỉ số Tài chính Trust"],
    availablePages: ["Trang chủ Corporate", "Danh sách Dự án Phân phối", "Về chúng tôi & Lịch sử", "Đối tác & Ngân hàng", "Tuyển dụng nhân tài", "Tin tức BĐS", "Liên hệ Trụ sở"],
    modules: ["Corporate CRM Connector", "Lead Distribution System", "SEO Multi-Project", "Zalo OA Integration", "Google Maps Multi-Branch"],
    benefits: ["Tạo dựng uy tín vững chắc với đối tác và chủ đầu tư lớn", "Quản lý và phân phối hàng chục dự án cùng lúc khoa học", "Hỗ trợ tuyển dụng chuyên viên kinh doanh liên tục", "Cấu trúc chuẩn SEO giúp lên top từ khóa sàn phân phối"],
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
    wireframe: [
      "HeroCorporateGrid",
      "RealtimeMarketStats",
      "MultiProjectGrid",
      "CorporateTimeline",
      "PartnerLogoShowcase",
      "InvestorRelationsHub",
      "CorporateMegaFooter"
    ],
    sectionConfig: {
      heroTitle: "SÀN GIAO DỊCH & PHÂN PHỐI BẤT ĐỘNG SẢN HÀNG ĐẦU",
      heroSubtitle: "Đối tác chiến lược tin cậy của Vinhomes, Masterise Homes, Sun Group và Novaland. Phân phối hơn 45 dự án trọng điểm toàn quốc.",
      stats: [
        { value: "45+", label: "Dự án phân phối độc quyền" },
        { value: "1.200+", label: "Chuyên viên tư vấn chính thức" },
        { value: "15.000+", label: "Khách hàng đầu tư thành công" },
        { value: "10 Năm", label: "Kinh nghiệm thực chiến thị trường" }
      ],
      projects: [
        { name: "Vinhomes Ocean Park 3", type: "Đại đô thị biển", price: "Từ 6.8 Tỷ", status: "Đang mở bán F1", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600" },
        { name: "Masteri Centre Point", type: "Chung cư hạng sang", price: "Từ 4.2 Tỷ", status: "Nhận nhà ngay", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600" },
        { name: "Eaton Park Thủ Đức", type: "Căn hộ cao cấp Gamuda", price: "Từ 6.5 Tỷ", status: "Booking giữ chỗ F1", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" }
      ]
    }
  },
  {
    id: "mock-4",
    name: "Resort Paradise Style",
    slug: "resort-paradise",
    collectionSlug: "resort",
    collectionName: "Resort Collection",
    badge: "RESORT PARADISE",
    badgeBg: "#E0F2FE",
    badgeColor: "#0369A1",
    accentColor: "#0369A1",
    description: "Bố cục sinh thái tối ưu cho bất động sản nghỉ dưỡng, biệt thự ven biển và condotel. Sử dụng Video Hero lôi cuốn và bộ sưu tập ảnh nghỉ dưỡng phong phú.",
    shortDescription: "BĐS nghỉ dưỡng, condotel cao cấp",
    thumbnail: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200"
    ],
    features: ["Banner video cuốn hút", "Lưới ảnh tiện ích nghỉ dưỡng", "Bảng tính ROI lợi nhuận tự động", "Tối ưu tốc độ giữ chân khách"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 4,
    targetAudience: ["BĐS Nghỉ dưỡng ven biển", "Biệt thự đảo & Resort", "Condotel đầu tư", "Second Home nghỉ dưỡng"],
    highlights: ["Video Hero Autoplay Biển Trời", "Wave Divider Uốn Lượn", "Bảng tính ROI cho thuê nghỉ dưỡng", "Tiện ích Spa & Bến thuyền", "Bản đồ liên kết sân bay"],
    availablePages: ["Trang chủ Resort", "Bộ sưu tập biệt thự biển", "Tiện ích 5 sao", "Bảng tính lợi nhuận ROI", "Vị trí & Kết nối bay", "Liên hệ Booking"],
    modules: ["Booking Consultation Form", "ROI Simulator Tool", "Video Background Player", "Google Maps Resort", "Zalo VIP Chat"],
    benefits: ["Khơi gợi cảm xúc nghỉ dưỡng xa hoa cho khách hàng từ cái nhìn đầu tiên", "Công cụ ROI minh bạch giúp thuyết phục bài toán dòng tiền cho thuê", "Hình ảnh sắc nét không bị vỡ trên màn hình Retina, tốc độ cao"],
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
      heroStyle: "Hero Video Background Biển lãng mạn kết hợp Wave Divider phía dưới",
      navigationStyle: "Transparent Cyan Header có Blur nhẹ",
      cardStyle: "Card bo tròn 20px với hiệu ứng Hover bay bổng tựa sóng biển",
      galleryStyle: "Masonry Resort Gallery với nút mở Fullscreen Modal",
      ctaStyle: "Gradient Ocean Blue Pill Button",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: [
      "HeroWaveVideo",
      "ResortBookingBar",
      "BeachInfinityGallery",
      "LuxurySpaAmenities",
      "ROISecondHomeCalc",
      "ResortVirtualTour",
      "ResortRelaxFooter"
    ],
    sectionConfig: {
      heroTitle: "THIÊN ĐƯỜNG NGHỈ DƯỠNG — GRAN MELIÁ NHA TRANG",
      heroSubtitle: "Dinh thự đảo san hô độc bản 6 sao đầu tiên tại Việt Nam, vận hành bởi tập đoàn Meliá Hotels International.",
      heroVideoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      amenities: [
        { name: "Bãi Biển Độc Quyền 2KM", desc: "Thưởng thức bình minh và hoàng hôn tuyệt mỹ bên bờ biển riêng không bóng người." },
        { name: "Nhà Hàng Michelin Star", desc: "Ẩm thực thượng hạng chế biến bởi siêu đầu bếp danh tiếng từ Tây Ban Nha." },
        { name: "Onsen & Spa Trị Liệu", desc: "Suối khoáng nóng tự nhiên kết hợp liệu pháp phục hồi sức khỏe Thụy Sĩ." }
      ],
      roiExample: {
        price: 45000000000,
        rentPerNight: 28000000,
        occupancyRate: 65,
        yearlyProfit: 4648000000
      }
    }
  },
  {
    id: "mock-5",
    name: "Urban City Style",
    slug: "urban-city",
    collectionSlug: "apartment",
    collectionName: "Apartment Collection",
    badge: "SMART URBAN",
    badgeBg: "#F5F3FF",
    badgeColor: "#7C3AED",
    accentColor: "#7C3AED",
    description: "Thiết kế tìm kiếm thông minh kết hợp bản đồ vệ tinh tương tác. Dành riêng cho các căn hộ chung cư thành phố lớn với công cụ tính lãi vay ngân hàng tích hợp sẵn.",
    shortDescription: "Căn hộ chung cư, bản đồ quy hoạch",
    thumbnail: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200",
      "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1200"
    ],
    features: ["Bản đồ vị trí dự án trực quan", "Bảng tính lãi vay ngân hàng", "Bộ lọc tìm kiếm theo quận huyện", "Tối ưu hóa phễu thu thập lead"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 5,
    targetAudience: ["Dự án căn hộ nội đô", "Chung cư Smart City", "Khách mua ở thực gia đình trẻ", "Nhà đầu tư cho thuê"],
    highlights: ["Hero Smart Search theo Quận/Giá", "Bản đồ Metro & Giao thông", "Máy tính Lãi vay ngân hàng tự động", "So sánh layouts 1PN/2PN/3PN", "Tiện ích Smart Home"],
    availablePages: ["Trang chủ Urban", "Tìm kiếm Căn hộ", "Bản đồ Vị trí & Metro", "Mặt bằng tầng & Căn hộ", "Tính lãi vay Ngân hàng", "Liên hệ Booking"],
    modules: ["Bank Mortgage Calculator", "Smart Interactive Map", "Lead CRM Connector", "Zalo Quick Contact", "SEO Tech"],
    benefits: ["Giúp khách hàng tự tính toán được tiền trả góp hàng tháng, dễ quyết định xuống cọc", "Tìm kiếm căn hộ nhanh chóng theo số phòng ngủ và ngân sách", "Giao diện trẻ trung hiện đại chuẩn Smart City"],
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
      heroStyle: "Hero Smart Search Box đặt nổi trên nền hình ảnh thành phố nhộn nhịp",
      navigationStyle: "Purple Accent Header kèm nút Tìm kiếm nhanh",
      cardStyle: "Card trắng bo góc 16px với chỉ số Giá/m2 và khoảng cách Metro",
      galleryStyle: "Layout Tab phân chia căn hộ 1PN / 2PN / 3PN / Duplex rõ ràng",
      ctaStyle: "Solid Purple Button với icon tia sét",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: [
      "HeroSmartSearchMap",
      "ApartmentLayoutSelector",
      "MetroConnectMap",
      "BankMortgageCalculator",
      "SmartHomeTechSpecs",
      "NearbyUtilitiesGrid",
      "ApartmentLeadCTA"
    ],
    sectionConfig: {
      heroTitle: "CĂN HỘ THÔNG MINH — TRUNG TÂM ĐỔI MỚI SÁNG TẠO",
      heroSubtitle: "Sở hữu không gian sống công nghệ Smart Home đỉnh cao kế bên tuyến Metro Bến Thành - Suối Tiên với chỉ từ 650 Triệu vốn tự có.",
      layouts: [
        { name: "Căn hộ 1 Phòng ngủ + 1", area: "54 m²", price: "Từ 3.6 Tỷ", idealFor: "Người độc thân, cặp đôi trẻ, đầu tư cho thuê", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600" },
        { name: "Căn hộ 2 Phòng ngủ Góc", area: "78 m²", price: "Từ 5.2 Tỷ", idealFor: "Gia đình 1-2 con nhỏ, không gian vừa đủ ấm cúng", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" },
        { name: "Căn hộ 3 Phòng ngủ Panorama", area: "108 m²", price: "Từ 7.8 Tỷ", idealFor: "Gia đình đa thế hệ, tầm nhìn rộng mở 3 hướng", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600" }
      ],
      mortgageDefaults: {
        loanAmount: 3500000000,
        interestRate: 7.5,
        loanTenureYears: 20
      }
    }
  },
  {
    id: "mock-6",
    name: "Industrial Estate Style",
    slug: "industrial-estate",
    collectionSlug: "industrial",
    collectionName: "Industrial Collection",
    badge: "INDUSTRIAL B2B",
    badgeBg: "#374151",
    badgeColor: "#FFFFFF",
    accentColor: "#F59E0B",
    description: "Cấu trúc giao diện vững chãi, hiện đại dành cho khu công nghiệp, nhà xưởng và kho bãi lớn. Nhấn mạnh vào hạ tầng, kết nối giao thông và pháp lý đầu tư.",
    shortDescription: "Khu công nghiệp, nhà xưởng, kho bãi",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200"
    ],
    features: ["Lưới danh sách nhà xưởng thuê", "Bản đồ liên kết giao thông", "Mục thông tin hạ tầng chi tiết", "Pháp lý đầu tư rõ ràng"],
    priceBuy: 499000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 6,
    targetAudience: ["Khu công nghiệp (KCN)", "Nhà xưởng cho thuê logistics", "Kho bãi tự động", "Chủ đầu tư thu hút vốn FDI"],
    highlights: ["Blueprint Grid Layout", "Thông số Kỹ thuật Hạ tầng", "Bản đồ kết nối Cảng biển & Sân bay", "Quy trình Đầu tư FDI 5 bước", "Brochure PDF Tải về"],
    availablePages: ["Trang chủ Industrial", "Hạ tầng Kỹ thuật", "Danh sách Nhà xưởng", "Quy trình FDI & Pháp lý", "Bản đồ Giao thông Cảng", "Liên hệ B2B"],
    modules: ["B2B Inquiry Lead Form", "PDF Brochure Download Engine", "Interactive Port Connectivity Map", "Zalo & Email B2B"],
    benefits: ["Thuyết phục tuyệt đối các tập đoàn sản xuất nước ngoài (Hàn Quốc, Nhật Bản, Đài Loan)", "Trình bày rõ ràng công suất điện kVA, tải trọng sàn kg/m2, chiều cao trần", "Uy tín và minh bạch pháp lý B2B"],
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
      heroStyle: "Dark Industrial Blueprint với thông số diện tích đất sẵn sàng cho thuê",
      navigationStyle: "Dark Steel Header với điểm nhấn màu vàng hổ phách Amber",
      cardStyle: "Dark Steel Card viền nhôm 1px có thông số tải trọng và chiều cao trần",
      galleryStyle: "Structured Table & Blueprint Grid",
      ctaStyle: "Amber B2B Button với chữ in hoa sắc sảo",
      spacingScale: "8pt Grid — Section Padding 100px Desktop"
    },
    wireframe: [
      "HeroIndustrialBlueprint",
      "InfrastructureSpecsGrid",
      "LogisticsPortConnection",
      "FactoryWarehouseCatalog",
      "FDIInvestmentLegal",
      "IndustrialTimelineHub",
      "B2BInquiryFormFooter"
    ],
    sectionConfig: {
      heroTitle: "KHU CÔNG NGHIỆP CÔNG NGHỆ CAO — DEEP C QUẢNG NINH",
      heroSubtitle: "Quỹ đất công nghiệp sạch sẵn sàng bàn giao với hạ tầng cảng biển nước sâu tích hợp, trạm biến áp 110kV và thuế suất ưu đãi đặc biệt cho doanh nghiệp FDI.",
      specs: [
        { title: "Trạm Biến Áp Điện", value: "110kV / 2x63 MVA", desc: "Đảm bảo cung cấp nguồn điện liên tục không gián đoạn cho dây chuyền công nghiệp nặng." },
        { title: "Nhà Máy Xử Lý Nước", value: "15.000 m³/ngày", desc: "Hệ thống xử lý nước thải đạt tiêu chuẩn A cao nhất của bộ tài nguyên môi trường." },
        { title: "Tải Trọng Sàn Nhà Xưởng", value: "3 - 5 Tấn / m²", desc: "Nền bê tông cốt thép gia cường sẵn sàng lắp đặt máy móc dập nặng." },
        { title: "Kết Nối Cảng Lạch Huyện", value: "Chỉ 15 KM", desc: "Tuyến cao tốc nối thẳng cảng nước sâu quốc tế, tối ưu chi phí vận chuyển container." }
      ],
      warehouses: [
        { name: "Nhà xưởng xây sẵn Block A1", area: "5.000 m²", ceiling: "12 mét", price: "$4.5 / m² / tháng", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600" },
        { name: "Nhà xưởng song lập Block B2", area: "8.500 m²", ceiling: "14 mét", price: "$4.8 / m² / tháng", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600" }
      ]
    }
  },
  {
    id: "mock-7",
    name: "Villa Premium Style",
    slug: "villa-premium",
    collectionSlug: "villa",
    collectionName: "Villa Collection",
    badge: "VILLA 3D TOUR",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
    accentColor: "#F59E0B",
    description: "Website giới thiệu biệt thự đơn lập, song lập cao cấp. Tích hợp sẵn sơ đồ mặt bằng chi tiết (Floor Plans) và video tour 3D thực tế ảo.",
    shortDescription: "Biệt thự cao cấp, sơ đồ mặt bằng, tour 3D",
    thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1200"
    ],
    features: ["Tab sơ đồ mặt bằng chi tiết", "Hỗ trợ nhúng Tour 3D thực tế", "Giao diện sáng sủa thanh lịch", "Đầy đủ khối thông tin tiện ích"],
    priceBuy: 499000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 7,
    targetAudience: ["Dự án biệt thự cao cấp", "Shophouse thương mại", "Biệt thự sân vườn biệt lập", "Khách hàng VIP yêu cầu cao"],
    highlights: ["Tour Ảo 3D Matterport Interactive", "Tab Sơ đồ mặt bằng Tầng 1/2/3/Mái", "Biểu đồ hướng nắng Sun Orientation", "Gallery Fullscreen chất lượng 4K", "Form đặt lịch tham quan riêng tư"],
    availablePages: ["Trang chủ Villa 3D", "Bộ sưu tập Biệt thự Đơn lập/Song lập", "Sơ đồ mặt bằng chi tiết", "Trải nghiệm Tour 360°", "Tiện ích Clubhouse", "Đặt lịch xem nhà thực tế"],
    modules: ["3D Virtual Tour Embed Engine", "Interactive Floor Plan Viewer", "Private Booking CRM", "Zalo VIP"],
    benefits: ["Khách hàng có thể tham quan từng ngóc ngách biệt thự từ xa, tiết kiệm thời gian", "Thuyết phục bằng sự chỉn chu của sơ đồ mặt bằng và hướng nắng phong thủy", "Tăng 300% tỷ lệ đặt lịch tham quan thực tế"],
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
    wireframe: [
      "Hero3DVirtualTour",
      "FloorPlanInteractiveTabs",
      "SunOrientationChart",
      "VillaMasterplanShowcase",
      "PrivateClubhouseAmenities",
      "BookPrivateTourForm",
      "VillaLuxuryFooter"
    ],
    sectionConfig: {
      heroTitle: "BIỆT THỰ ĐẢO NGỌC — ECOPARK GRAND THE ISLAND",
      heroSubtitle: "Kiệt tác biệt thự đảo sinh thái vươn mình giữa những dòng sông xanh, sở hữu đặc quyền cảnh quan thiên nhiên vô giá.",
      floorPlans: [
        { tab: "Biệt thự Đơn lập Orchid (500m²)", floors: ["Tầng 1: Phòng khách lớn 120m² & Hồ bơi riêng", "Tầng 2: 3 Phòng ngủ Master có Ban công view sông", "Tầng 3: Phòng gia đình & Sân vườn BBQ trên cao"] },
        { tab: "Biệt thự Song lập Marine (300m²)", floors: ["Tầng 1: Sân vườn mặt tiền 15m & Gara 2 xe sang", "Tầng 2: 2 Phòng ngủ Master & Phòng làm việc riêng", "Tầng 3: Sân thượng ngắm hoàng hôn"] }
      ],
      tourUrl: "https://my.matterport.com/show/?m=sample3Dtour"
    }
  },
  {
    id: "mock-8",
    name: "Eco Green Style",
    slug: "eco-green",
    collectionSlug: "eco",
    collectionName: "Eco Collection",
    badge: "ECO LIVING",
    badgeBg: "#DCFCE7",
    badgeColor: "#16A34A",
    accentColor: "#4ADE80",
    description: "Tông màu lục bảo tự nhiên tươi sáng, tôn vinh lối sống xanh bền vững và tiện ích thiên nhiên. Hoàn hảo cho các dự án khu đô thị xanh sinh thái.",
    shortDescription: "Dự án xanh, sinh thái bền vững",
    thumbnail: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200",
      "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1200",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200"
    ],
    features: ["Khối tiện ích xanh nội khu", "Tông xanh lục bảo sinh thái", "Tích hợp Zalo chat nhanh", "Tốc độ tải trang tối ưu"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 8,
    targetAudience: ["Khu đô thị sinh thái xanh", "Ecopark & Vinhomes sinh thái", "Khách gia đình yêu thiên nhiên", "Dự án nghỉ dưỡng chữa lành"],
    highlights: ["Hero Green Nature bo góc chiếc lá", "Timeline Cảnh quan Cây xanh", "Showcase Công viên & Tiện ích ngoài trời", "Chỉ số Bền vững & Không khí sạch", "Cộng đồng gia đình gắn kết"],
    availablePages: ["Trang chủ Eco", "Cảnh quan & Mảng xanh", "Hệ thống Tiện ích nội khu", "Kiến trúc xanh bền vững", "Cộng đồng cư dân", "Liên hệ & Trải nghiệm"],
    modules: ["Eco Lead Capture", "Google Maps Green Park", "Zalo Green Connect", "SEO Ecology"],
    benefits: ["Truyền tải cảm giác bình yên, trong lành, khơi gợi khát khao chuyển đến sống ngay", "Thiết kế bo góc mềm mại tự nhiên thân thiện với mọi đối tượng", "Tối ưu cảm giác nhẹ nhàng, dễ chịu cho mắt khi xem dự án lâu"],
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
      heroStyle: "Hero Eco bo góc hình chiếc lá mềm mại với ảnh công viên tràn ngập ánh nắng",
      navigationStyle: "Green Pastel Header tươi mới",
      cardStyle: "Card bo tròn lớn 28px kết hợp icon thiên nhiên màu lục bảo",
      galleryStyle: "Nature Grid với hiệu ứng fade nhẹ khi cuộn",
      ctaStyle: "Emerald Green Pill Button tự nhiên",
      spacingScale: "8pt Grid — Section Padding 110px Desktop"
    },
    wireframe: [
      "HeroEcoGreenHero",
      "NatureTimelineShowcase",
      "OutdoorFacilitiesGrid",
      "EcoSustainabilityMetrics",
      "CommunityEventShowcase",
      "GreenFamilyTestimonial",
      "EcoFooterContact"
    ],
    sectionConfig: {
      heroTitle: "SỐNG XANH CHUẨN MỰC GiỮA LÒNG THÀNH PHỐ",
      heroSubtitle: "Hơn 100 hecta công viên cây xanh và hồ điều hòa tạo nên hệ sinh thái vi khí hậu mát mẻ quanh năm cho gia đình bạn.",
      ecoStats: [
        { number: "100 Ha", label: "Diện tích cây xanh & mặt nước" },
        { number: "70%", label: "Mật độ cảnh quan thiên nhiên" },
        { number: "15 KM", label: "Đường dạo bộ & đạp xe ven hồ" },
        { number: "PM 2.5 < 15", label: "Chỉ số không khí sạch chuẩn Âu" }
      ],
      parks: [
        { title: "Công Viên Hồ Thiên Nga", desc: "Nơi cư ngụ của hàng ngàn chú thiên nga và chim hoang dã giữa trung tâm đại đô thị." },
        { title: "Vườn Thiền & Yoga Trầm Hương", desc: "Không gian tĩnh lặng bao bọc bởi rừng trúc xanh mướt dành cho buổi sáng thư thái." },
        { title: "Khu Vui Chơi Thám Hiểm Rừng Xanh", desc: "Sân chơi gỗ tự nhiên kích thích sự phát triển vận động và sáng tạo cho trẻ nhỏ." }
      ]
    }
  },
  {
    id: "mock-9",
    name: "Classic Elegant Style",
    slug: "classic-elegant",
    collectionSlug: "classic",
    collectionName: "Classic Collection",
    badge: "CLASSIC HERITAGE",
    badgeBg: "#FFF1F2",
    badgeColor: "#9F1239",
    accentColor: "#FB7185",
    description: "Phong cách thiết kế trang nhã thanh lịch hướng tới đối tượng khách hàng trung niên thành đạt. Tông màu trầm ấm kết hợp bố cục dòng sự kiện sắc sảo.",
    shortDescription: "Cổ điển sang trọng, khách hàng trung niên",
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
    ],
    features: ["Thiết kế trang nhã ấm áp", "Tin tức phong thủy nhà đất", "Khối ý kiến khách hàng nổi bật", "Đầy đủ biểu mẫu nhận thông tin"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 9,
    targetAudience: ["Khách hàng trung niên thành đạt", "Doanh nghiệp BĐS lâu đời", "Dự án truyền thống có sổ đỏ ngay", "Sàn giao dịch uy tín lâu năm"],
    highlights: ["Editorial Magazine Layout cổ điển", "Serif Typography trang nhã", "Timeline Lịch sử & Uy tín thương hiệu", "Góc tư vấn Phong thủy & Hướng nhà", "Testimonials từ doanh nhân thành đạt"],
    availablePages: ["Trang chủ Classic", "Lịch sử & Di sản", "Danh sách Dinh thự", "Góc nhìn Phong thủy", "Giải thưởng & Uy tín", "Liên hệ Ban lãnh đạo"],
    modules: ["Classic Lead Form", "Google Maps Heritage", "Zalo Connect", "SEO Editorial"],
    benefits: ["Tạo dựng sự an tâm tuyệt đối cho lớp khách hàng lớn tuổi, nhiều tài sản tích lũy", "Bố cục giống một cuốn tạp chí kiến trúc đẳng cấp", "Tôn vinh giá trị truyền thống và tính pháp lý minh bạch"],
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
      cardStyle: "Card viền đỏ đô mỏng 1px bo góc nhẹ 6px chuẩn tạp chí",
      galleryStyle: "Classic Grid với tỷ lệ ảnh 4:3 chuẩn mực",
      ctaStyle: "Burgundy Wine Solid Button với phông chữ Lora",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: [
      "HeroClassicEditorial",
      "HeritageTimelineHistory",
      "AwardsRecognitionShowcase",
      "FengShuiOrientationAdvice",
      "ClassicTestimonialQuotation",
      "ExecutiveBoardBio",
      "ClassicElegantFooter"
    ],
    sectionConfig: {
      heroTitle: "DI SẢN KIẾN TRÚC TRƯỜNG TỒN VỚI THỜI GIAN",
      heroSubtitle: " Hơn 25 năm kiến tạo những không gian sống trường tồn, nơi lưu giữ tinh hoa và gia tài cho muôn đời sau.",
      heritageMilestones: [
        { year: "1999", event: "Thành lập văn phòng kiến trúc & phân phối BĐS hạng sang đầu tiên tại Hà Nội." },
        { year: "2010", event: "Bàn giao thành công khu biệt thự ngoại giao đoàn cho hơn 200 đại sứ quốc tế." },
        { year: "2024", event: "Tiếp tục vinh danh thương hiệu BĐS uy tín nhất do Hiệp hội BĐS Việt Nam bình chọn." }
      ],
      fengShuiTips: [
        { title: "Tọa Bắc Hướng Nam — Vượng Khí Sinh Tài", desc: "Toàn bộ khu biệt thự được quy hoạch chuẩn hướng Nam đón gió mát và ánh sáng dịu nhẹ." },
        { title: "Minh Đường Tụ Thủy", desc: "Hồ cảnh quan rộng 5 ha trước mặt dự án đóng vai trò như hồ tụ khí mang lại tài lộc dồi dào." }
      ]
    }
  },
  {
    id: "mock-10",
    name: "Investment Pro Style",
    slug: "investment-pro",
    collectionSlug: "investment",
    collectionName: "Investment Collection",
    badge: "INVESTMENT PRO",
    badgeBg: "#1E40AF",
    badgeColor: "#FFFFFF",
    accentColor: "#60A5FA",
    description: "Giao diện định hướng tài chính và đầu tư. Tập trung làm nổi bật các con số tăng trưởng tài sản, biểu đồ dao động giá thị trường và phân tích ROI sinh lời.",
    shortDescription: "Nhà đầu tư, biểu đồ giá đất, tỷ suất ROI",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"
    ],
    features: ["Bảng so sánh tỷ suất sinh lời", "Mô phỏng biểu đồ giá đất", "Tài liệu quy hoạch tải về", "Tối ưu hóa độ tin cậy"],
    priceBuy: 499000,
    priceRentMonthly: 899000,
    isActive: true,
    sortOrder: 10,
    targetAudience: ["Nhà đầu tư cá nhân sành sỏi", "Quỹ đầu tư BĐS (REITs)", "Chuyên gia phân tích thị trường", "Sàn bán đất nền & Shophouse"],
    highlights: ["Biểu đồ Tăng trưởng Giá Đất Realtime", "Máy tính ROI Tỷ suất Sinh lời", "Bảng Phân tích Dòng tiền Cashflow", "Tải trọn bộ Hồ sơ Pháp lý & Quy hoạch 1/500", "So sánh Lợi nhuận BĐS vs Vàng/Chứng khoán"],
    availablePages: ["Trang chủ Investment Dashboard", "Biểu đồ Phân tích Thị trường", "Máy tính ROI Sinh lời", "Tải Hồ sơ Quy hoạch", "Phân tích Dòng tiền", "Liên hệ Chuyên gia Tài chính"],
    modules: ["ROI Financial Calculator", "Interactive Chart Engine", "Legal Document Download Gate", "CRM Lead Capture", "Zalo VIP Advisor"],
    benefits: ["Thuyết phục nhà đầu tư bằng những con số biết nói và biểu đồ tăng trưởng thực tế", "Giao diện giống một Terminal tài chính chuyên nghiệp như Bloomberg/TradingView", "Tải tài liệu quy hoạch giúp thu thập Lead chất lượng cao dễ dàng"],
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
      cardStyle: "Card trắng bo góc 12px viền xanh dương kèm mũi tên tăng trưởng xanh lá +18.5%",
      galleryStyle: "Data-driven Comparison Grid & Charts",
      ctaStyle: "Blue Solid Button với icon biểu đồ tăng trưởng",
      spacingScale: "8pt Grid — Section Padding 96px Desktop"
    },
    wireframe: [
      "HeroInvestmentDashboard",
      "ROICalculatorSimulator",
      "PriceGrowthChartShowcase",
      "CashflowAnalysisGrid",
      "PlanningDocumentDownload",
      "InvestorComparisonTable",
      "InvestmentAdvisoryFooter"
    ],
    sectionConfig: {
      heroTitle: "CƠ HỘI ĐẦU TƯ SINH LỜI BỀN VỮNG TẠI THỦ THIÊM",
      heroSubtitle: "Dự án sở hữu tiềm năng tăng giá đột phá nhờ quy hoạch cầu Thủ Thiêm 4 và trung tâm tài chính quốc tế mới của Sài Gòn.",
      investmentMetrics: [
        { label: "Tỷ suất lợi nhuận kỳ vọng", value: "+18.5% / Năm", trend: "up" },
        { label: "Lợi nhuận cho thuê trung bình", value: "6.8% / Năm", trend: "up" },
        { label: "Thời gian hoàn vốn dự kiến", value: "8.5 Năm", trend: "neutral" },
        { label: "Tăng giá từ giai đoạn 1", value: "+42.0%", trend: "up" }
      ],
      comparisonTable: [
        { asset: "BĐS Thủ Thiêm giai đoạn 1", roi: "18.5%", risk: "Thấp (Có sổ đỏ)", liquidity: "Cao" },
        { asset: "Gửi tiết kiệm Ngân hàng", roi: "4.8%", risk: "Rất thấp", liquidity: "Rất cao" },
        { asset: "Đầu tư Vàng miếng SJC", roi: "9.2%", risk: "Trung bình", liquidity: "Cao" },
        { asset: "Thị trường Chứng khoán", roi: "12.0%", risk: "Cao (Biến động mạnh)", liquidity: "Rất cao" }
      ]
    }
  },
  {
    id: "mock-11",
    name: "Personal Agent",
    slug: "agency-onepage",
    collectionSlug: "agency",
    collectionName: "Agency Collection",
    badge: "MÔI GIỚI CÁ NHÂN",
    badgeBg: "#FDF2F8",
    badgeColor: "#DB2777",
    accentColor: "#F43F5E",
    description: "Trang cá nhân của một chuyên viên môi giới chuyên nghiệp. Giới thiệu bản thân, kỹ năng và các dự án đang nắm giữ.",
    shortDescription: "Môi giới cá nhân · Chuyên viên tư vấn",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200"
    ],
    features: ["One Page Scroll mượt", "Sticky CTA nổi bật", "Popup Lead tỷ lệ cao", "Countdown Timer"],
    priceBuy: 499000,
    priceRentMonthly: 349000,
    isActive: true,
    sortOrder: 11,
    targetAudience: ["Agency chạy quảng cáo Facebook/Google Ads", "Chiến dịch mở bán giai đoạn 1", "Môi giới cần thu lead nóng", "Sự kiện ra mắt dự án"],
    highlights: ["Countdown Timer Đếm ngược mở bán", "Sticky CTA luôn hiển thị dưới màn hình điện thoại", "Popup Thu lead tự động khi có ý định thoát trang (Exit Intent)", "Bố cục thúc giục tâm lý Fear-of-Missing-Out (FOMO)", "Bảng giá & Chính sách chiết khấu khủng"],
    availablePages: ["One Page Landing Page Siêu Chuyển Đổi (Tất cả trong 1 trang cuộn)"],
    modules: ["Exit-Intent Lead Popup", "Urgency Countdown Engine", "Sticky Mobile CTA Bar", "Facebook Pixel & CAPI Ready", "Google Ads Conversion Tracking"],
    benefits: ["Tối ưu chi phí chạy quảng cáo với tỷ lệ chốt form (Conversion Rate) trên 12%", "Tải trang dưới 0.8s giúp không bị rớt khách khi nhấp từ Facebook Ads", "Không gây phân tâm, dẫn dắt khách thẳng đến hành động đăng ký cọc"],
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
      heroStyle: "Hero Landing với Form thu lead cọc ngay bên phải và Countdown đếm ngược bên trái",
      navigationStyle: "Sticky Sales Header với nút Nhận Báo Giá Đỏ rực",
      cardStyle: "High contrast Card với viền hồng phấn và thông điệp chiết khấu",
      galleryStyle: "Single Page Smooth Scroll Anchors",
      ctaStyle: "Vibrant Pink/Rose Pulsing Button",
      spacingScale: "8pt Grid — Section Padding 88px Desktop"
    },
    wireframe: [
      "HeroLandingLeadCapture",
      "CountdownUrgencyBar",
      "ProblemSolutionGrid",
      "SpecialDiscountTable",
      "InstantPopupLeadForm",
      "SalesAgentDirectCall",
      "AgencyStickyFooterCTA"
    ],
    sectionConfig: {
      heroTitle: "MỞ BÁN ĐỘC QUYỀN GIAI ĐOẠN 1 — THE BEVERLY SOLARI",
      heroSubtitle: "Đăng ký nhận bảng giá gốc từ chủ đầu tư & Ưu đãi chiết khấu ngay 10% cho 50 khách hàng đầu tiên trong tuần này.",
      countdownTarget: "2026-08-15T00:00:00Z",
      discounts: [
        { badge: "QUÀ TẶNG F1", title: "Tặng ngay Gói nội thất 200 Triệu VNĐ", desc: "Dành riêng cho khách hàng ký hợp đồng mua bán trước ngày 15/08." },
        { badge: "CHIẾT KHẤU", title: "Giảm 10% khi thanh toán sớm 95%", desc: "Trừ trực tiếp vào giá trị hợp đồng mua bán (CHƯA bao gồm VAT)." },
        { badge: "HỖ TRỢ LÃI SUẤT", title: "Lãi suất 0% & Ân hạn nợ gốc 24 tháng", desc: "Ngân hàng Techcombank và Vietcombank hỗ trợ giải ngân 70% giá trị căn hộ." }
      ]
    }
  },
  {
    id: "mock-12",
    name: "Listing Marketplace",
    slug: "mega-developer",
    collectionSlug: "developer",
    collectionName: "Developer Collection",
    badge: "SÀN GIAO DỊCH",
    badgeBg: "#0F172A",
    badgeColor: "#38BDF8",
    accentColor: "#38BDF8",
    description: "Sàn giao dịch bất động sản với bộ lọc tìm kiếm chi tiết. Thích hợp cho mô hình Listing Marketplace như Batdongsan.com.vn hay Zillow.",
    shortDescription: "Sàn giao dịch · Tìm kiếm · Mua bán",
    thumbnail: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800",
    screenshots: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
    ],
    features: ["Advanced Filters", "Grid/List Layout", "Agent Directory", "Property Posting Form"],
    priceBuy: 499000,
    priceRentMonthly: 1490000,
    isActive: true,
    sortOrder: 12,
    targetAudience: ["Tập đoàn phát triển BĐS hàng đầu (Developer)", "Công ty niêm yết trên sàn chứng khoán (HOSE/HNX)", "Chủ đầu tư sở hữu nhiều quỹ đất", "Tổng công ty cổ phần đầu tư"],
    highlights: ["Mega Menu Portal Đa Dự Án", "Khu vực Investor Relations (Quan hệ cổ đông) với mã chứng khoán", "Media Center & Thông cáo báo chí", "Trang Trách nhiệm Xã hội (CSR & Sustainable)", "Cổng Tuyển dụng Tập đoàn"],
    availablePages: ["Trang chủ Mega Portal", "Hệ sinh thái Dự án", "Quan hệ Cổ đông (IR)", "Truyền thông & Báo chí", "Trách nhiệm Xã hội CSR", "Cổng Tuyển dụng", "Liên hệ Trụ sở chính"],
    modules: ["Stock Ticker Realtime Bar", "Multi-Project Categorization CMS", "IR Document Vault", "Enterprise Lead Router", "Zalo & Email Portal"],
    benefits: ["Định hình quy mô và tầm vóc quốc gia cho các chủ đầu tư và tập đoàn hàng đầu", "Minh bạch thông tin tài chính và cổ đông theo chuẩn mực quản trị quốc tế", "Quản lý tập trung toàn bộ danh mục hàng chục dự án trên 1 cổng duy nhất"],
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
      heroStyle: "Hero Mega Portal Slider tràn viền với thanh chỉ số cổ phiếu Tập đoàn phía trên",
      navigationStyle: "Enterprise Dark Header với Mega Dropdown đa tầng",
      cardStyle: "Dark Slate Card với Tag phân loại: Đang bàn giao / Đang triển khai / Quỹ đất tương lai",
      galleryStyle: "Multi-tab Enterprise Grid với bộ lọc khu vực Bắc/Trung/Nam",
      ctaStyle: "Cyan Glow Button chuyên nghiệp",
      spacingScale: "8pt Grid — Section Padding 120px Desktop"
    },
    wireframe: [
      "HeroMegaPortalSlider",
      "MultiProjectFilterGrid",
      "InvestorStockTickerBar",
      "CSRCommunityImpact",
      "MediaNewsroomCenter",
      "CareerOpportunitiesHub",
      "DeveloperEnterpriseFooter"
    ],
    sectionConfig: {
      heroTitle: "KIẾN TẠO BIỂU TƯỢNG — NÂNG TẦM VỊ THẾ QUỐC GIA",
      heroSubtitle: "Tập đoàn Phát triển Đô thị và Nghỉ dưỡng hàng đầu Việt Nam với quỹ đất hơn 5.000 Hecta trải dài trên 12 tỉnh thành trọng điểm.",
      stockInfo: {
        ticker: "PDR",
        price: "28.650 VNĐ",
        change: "+1.250 (+4.56%)",
        volume: "14.5M cổ phiếu"
      },
      megaProjects: [
        { name: "Mega City Bình Dương", category: "Khu đô thị công nghiệp", scale: "150 Ha", status: "Đang bàn giao sổ đỏ", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600" },
        { name: "Grand Marina Saigon", category: "Căn hộ hàng hiệu Branded Residences", scale: "10 Ha", status: "Đang xây dựng", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600" },
        { name: "NovaWorld Phan Thiết", category: "Siêu thành phố nghỉ dưỡng biển", scale: "1.000 Ha", status: "Vận hành giai đoạn 1", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" }
      ]
    }
  },
  {
    id: "mock-new-1",
    name: "Sàn Đấu Giá",
    slug: "auction-template",
    collectionSlug: "commercial",
    collectionName: "Commercial Collection",
    badge: "AUCTION",
    badgeBg: "#FEE2E2",
    badgeColor: "#EF4444",
    accentColor: "#EF4444",
    description: "Sàn giao dịch đấu giá bất động sản minh bạch với các tính năng đấu giá trực tuyến, giá khởi điểm hấp dẫn.",
    shortDescription: "Đấu giá · Mua bán giá tốt",
    thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
    screenshots: [],
    features: ["Bidding System", "Timer Countdown", "Verified Listings"],
    priceBuy: 499000,
    priceRentMonthly: 699000,
    isActive: true,
    sortOrder: 15,
    targetAudience: ["Sàn đấu giá", "Sàn môi giới lớn"],
    highlights: ["Sàn đấu giá trực tuyến", "Pháp lý minh bạch"],
    availablePages: ["Trang chủ", "Đang đấu giá", "Liên hệ"],
    modules: [],
    benefits: [],
    themeConfig: {
      fontHeading: "var(--font-inter), sans-serif",
      fontBody: "var(--font-roboto), sans-serif",
      primaryColor: "#1d4ed8",
      secondaryColor: "#1e3a8a",
      accentColor: "#ef4444",
      bgColor: "#f8fafc",
      cardBgColor: "#ffffff",
      textColor: "#334155",
      radiusToken: "8px",
      shadowToken: "0 10px 20px rgba(0,0,0,0.1)"
    },
    layoutConfig: {
      heroStyle: "Search box with dark overlay",
      navigationStyle: "Sticky Dark",
      cardStyle: "Grid with countdown",
      galleryStyle: "Grid",
      ctaStyle: "Bold Red Button",
      spacingScale: "8pt"
    },
    wireframe: [],
    sectionConfig: {}
  },
  {
    id: "mock-new-2",
    name: "Dự Án Đất Nền",
    slug: "landplot-template",
    collectionSlug: "project",
    collectionName: "Project Collection",
    badge: "LAND PLOT",
    badgeBg: "#FEF3C7",
    badgeColor: "#D97706",
    accentColor: "#D4A373",
    description: "Landing page chuyên dụng cho dự án đất nền, phân lô bán nền, quy hoạch đô thị với bản đồ phân lô chi tiết.",
    shortDescription: "Đất nền · Khu đô thị",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    screenshots: [],
    features: ["Mặt bằng phân lô", "Vị trí địa lý", "Báo giá"],
    priceBuy: 499000,
    priceRentMonthly: 499000,
    isActive: true,
    sortOrder: 16,
    targetAudience: ["Chủ đầu tư đất nền", "Đại lý phân phối"],
    highlights: ["Bản đồ phân lô trực quan", "Vị trí tiềm năng"],
    availablePages: ["Trang chủ", "Mặt bằng", "Liên hệ"],
    modules: [],
    benefits: [],
    themeConfig: {
      fontHeading: "var(--font-roboto), sans-serif",
      fontBody: "var(--font-inter), sans-serif",
      primaryColor: "#2d6a4f",
      secondaryColor: "#1b4332",
      accentColor: "#d4a373",
      bgColor: "#fcfcfc",
      cardBgColor: "#ffffff",
      textColor: "#334155",
      radiusToken: "12px",
      shadowToken: "0 15px 30px rgba(0,0,0,0.05)"
    },
    layoutConfig: {
      heroStyle: "Split with Map",
      navigationStyle: "Light with borders",
      cardStyle: "Earthy borders",
      galleryStyle: "Map Grid",
      ctaStyle: "Solid Green Button",
      spacingScale: "8pt"
    },
    wireframe: [],
    sectionConfig: {}
  },
  {
    id: "mock-15",
    name: "Retail Podium",
    slug: "retail-podium",
    collectionSlug: "retail",
    collectionName: "Retail Collection",
    badge: "RETAIL & SHOPHOUSE",
    badgeBg: "#fef3c7",
    badgeColor: "#d97706",
    accentColor: "#d97706",
    description: "Template chuyên dụng cho Shophouse, Mặt bằng kinh doanh, Trung tâm thương mại.",
    shortDescription: "Shophouse · Retail · Mặt bằng",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    screenshots: [],
    features: ["Bản đồ gian hàng 3D", "Booking mặt bằng kinh doanh"],
    priceBuy: 499000,
    priceRentMonthly: 599000,
    isActive: true,
    sortOrder: 15,
    targetAudience: ["Chủ đầu tư trung tâm thương mại", "Shophouse khối đế"],
    highlights: ["Sơ đồ mặt bằng Retail", "Pop-up Leasing"],
    availablePages: ["Trang chủ", "Gian hàng", "Liên hệ"],
    modules: [],
    benefits: [],
    themeConfig: {
      fontHeading: "var(--font-roboto), sans-serif",
      fontBody: "var(--font-inter), sans-serif",
      primaryColor: "#0f172a",
      secondaryColor: "#334155",
      accentColor: "#d97706",
      bgColor: "#f8fafc",
      cardBgColor: "#ffffff",
      textColor: "#334155",
      radiusToken: "8px",
      shadowToken: "0 10px 15px rgba(0,0,0,0.1)"
    },
    layoutConfig: {
      heroStyle: "Vibrant with Grid",
      navigationStyle: "Sticky Dark",
      cardStyle: "Modern Retail",
      galleryStyle: "Masonry",
      ctaStyle: "Amber Button",
      spacingScale: "8pt"
    },
    wireframe: [],
    sectionConfig: {}
  },
  {
    id: "mock-16",
    name: "Personal Agent",
    slug: "personal-agent",
    collectionSlug: "agent",
    collectionName: "Agent Collection",
    badge: "TOP PERFORMER",
    badgeBg: "#e0e7ff",
    badgeColor: "#4f46e5",
    accentColor: "#4f46e5",
    description: "Template One-page tập trung vào thương hiệu cá nhân của môi giới xuất sắc.",
    shortDescription: "Môi giới cá nhân · One page",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
    screenshots: [],
    features: ["Profile chuyên nghiệp", "Slider dự án", "Booking tư vấn"],
    priceBuy: 499000,
    priceRentMonthly: 399000,
    isActive: true,
    sortOrder: 16,
    targetAudience: ["Môi giới cá nhân", "Chuyên viên tư vấn độc lập"],
    highlights: ["Tập trung Personal Branding", "Review từ khách hàng"],
    availablePages: ["Trang chủ (One Page)"],
    modules: [],
    benefits: [],
    themeConfig: {
      fontHeading: "var(--font-inter), sans-serif",
      fontBody: "var(--font-inter), sans-serif",
      primaryColor: "#4f46e5",
      secondaryColor: "#6366f1",
      accentColor: "#4f46e5",
      bgColor: "#ffffff",
      cardBgColor: "#f9fafb",
      textColor: "#1f2937",
      radiusToken: "16px",
      shadowToken: "0 20px 25px -5px rgba(0,0,0,0.1)"
    },
    layoutConfig: {
      heroStyle: "Personal Portrait",
      navigationStyle: "Floating Pill",
      cardStyle: "Soft Shadow",
      galleryStyle: "Carousel",
      ctaStyle: "Indigo Gradient",
      spacingScale: "8pt"
    },
    wireframe: [],
    sectionConfig: {}
  }
];

/**
 * Bốn mẫu bổ sung, xây dựng trên renderer gốc nhưng có định hướng và nội dung
 * Việt Nam riêng. Giữ module chung giúp CMS, mobile và checkout hoạt động
 * thống nhất thay vì nhân bản một codebase cho mỗi mẫu.
 */
const VIETNAMESE_VARIANTS: Template[] = [
  {
    source: 'mock-3', id: 'vn-bds-01', slug: 'bds-01', name: 'BĐS 01 — Sàn Giao Dịch Việt',
    collectionSlug: 'corporate', collectionName: 'Sàn BĐS Việt Nam', badge: 'SÀN GIAO DỊCH',
    shortDescription: 'Sàn môi giới · Dự án sơ cấp · Phân phối F1', accentColor: '#075985',
    description: 'Giao diện doanh nghiệp cho sàn giao dịch bất động sản tại Việt Nam, tối ưu giỏ hàng dự án, đội ngũ môi giới, Zalo và form nhận bảng giá.',
    targetAudience: ['Sàn giao dịch tại Hà Nội, TP.HCM và tỉnh thành'],
    features: ['Bộ lọc tỉnh/thành · quận/huyện', 'Lịch hẹn xem nhà qua Zalo', 'Danh sách dự án & bảng giá PDF'], sortOrder: 17,
    thumbnail: '/images/template-previews/bds-01-ui-v1.png',
  },
  {
    source: 'mock-5', id: 'vn-bds-02', slug: 'bds-02', name: 'BĐS 02 — Căn Hộ Sống Xanh',
    collectionSlug: 'apartment', collectionName: 'Căn Hộ Việt Nam', badge: 'MỞ BÁN CĂN HỘ',
    shortDescription: 'Căn hộ · Nhà mẫu · Chính sách vay ngân hàng', accentColor: '#0f766e',
    description: 'Landing dự án căn hộ Việt Nam có mặt bằng, tiến độ, chính sách ngân hàng và biểu mẫu đăng ký nhận thông tin.',
    targetAudience: ['Chủ đầu tư, đại lý F1 và đội kinh doanh căn hộ'],
    features: ['Bảng giá theo toà', 'Mặt bằng căn hộ', 'Đăng ký xem nhà mẫu'], sortOrder: 18,
    thumbnail: '/images/template-previews/bds-02-ui-v1.png',
  },
  {
    source: 'mock-new-2', id: 'vn-bds-03', slug: 'bds-03', name: 'BĐS 03 — Khu Đô Thị Vườn',
    collectionSlug: 'project', collectionName: 'Đất Nền & Khu Đô Thị', badge: 'ĐẤT NỀN 1/500',
    shortDescription: 'Đất nền · Khu đô thị · Pháp lý minh bạch', accentColor: '#a16207',
    description: 'Mẫu giới thiệu khu đô thị và đất nền Việt Nam, làm rõ pháp lý, vị trí, sơ đồ phân lô, tiện ích và phương thức thanh toán.',
    targetAudience: ['Chủ đầu tư đất nền, khu đô thị và môi giới địa phương'],
    features: ['Sơ đồ phân lô', 'Hồ sơ pháp lý', 'Đăng ký chọn vị trí'], sortOrder: 19,
    thumbnail: '/images/template-previews/bds-03-ui-v1.png',
  },
  {
    source: 'mock-16', id: 'vn-bds-04', slug: 'bds-04', name: 'BĐS 04 — Môi Giới Zalo Pro',
    collectionSlug: 'agent', collectionName: 'Môi Giới Cá Nhân', badge: 'MÔI GIỚI CHUYÊN NGHIỆP',
    shortDescription: 'Thương hiệu cá nhân · Zalo · Đặt lịch xem nhà', accentColor: '#0f766e',
    description: 'One-page cho chuyên viên tư vấn Việt Nam, tập trung hồ sơ cá nhân, listing nổi bật, nhận ký gửi và liên hệ Zalo một chạm.',
    targetAudience: ['Môi giới độc lập, đội nhóm sale và chuyên viên tư vấn'],
    features: ['Zalo một chạm', 'Đặt lịch xem nhà', 'Form nhận ký gửi'], sortOrder: 20,
    thumbnail: '/images/template-previews/bds-04-ui-v1.png',
  },
].map(({ source, ...variant }) => {
  const base = BASE_TEMPLATES.find((template) => template.id === source);
  if (!base) throw new Error(`Thiếu template nền: ${source}`);
  return { ...base, ...variant, screenshots: base.screenshots.slice(), highlights: variant.features, availablePages: [...base.availablePages] };
});

/**
 * URL công khai cho khách xem demo luôn là bds-01 ... bds-20.  Các mẫu bên
 * dưới kế thừa component đã có thay vì copy mã giao diện; vì vậy mỗi số vẫn
 * là một website chạy độc lập, responsive và có trang con.
 */
const NUMBERED_DEMO_VARIANTS: Template[] = [
  ['mock-1', 'bds-05', 'BĐS 05 — Biệt Thự Vàng'],
  ['mock-2', 'bds-06', 'BĐS 06 — Tối Giản Đô Thị'],
  ['mock-4', 'bds-07', 'BĐS 07 — Nghỉ Dưỡng Biển'],
  ['mock-6', 'bds-08', 'BĐS 08 — Khu Công Nghiệp'],
  ['mock-7', 'bds-09', 'BĐS 09 — Villa Compound'],
  ['mock-8', 'bds-10', 'BĐS 10 — Đô Thị Sinh Thái'],
  ['mock-9', 'bds-11', 'BĐS 11 — Phong Cách Di Sản'],
  ['mock-10', 'bds-12', 'BĐS 12 — Đầu Tư Thông Minh'],
  ['mock-11', 'bds-13', 'BĐS 13 — Landing Mở Bán'],
  ['mock-12', 'bds-14', 'BĐS 14 — Cổng Dự Án'],
  ['mock-new-1', 'bds-15', 'BĐS 15 — Sàn Đấu Giá'],
  ['mock-15', 'bds-16', 'BĐS 16 — Shophouse Thương Mại'],
].map(([source, slug, name], index) => {
  const base = BASE_TEMPLATES.find((template) => template.id === source);
  if (!base) throw new Error(`Thiếu template nền: ${source}`);
  return {
    ...base,
    id: `vn-${slug}`,
    slug,
    name,
    badge: `MẪU ${String(index + 5).padStart(2, '0')}`,
    sortOrder: index + 21,
    screenshots: base.screenshots.slice(),
    highlights: [...base.highlights],
    availablePages: [...base.availablePages],
  };
});

const VIETNAMESE_TEMPLATE_NAMES: Record<string, string> = {
  'luxury-gold': 'Biệt Thự Hoàng Gia', 'minimal-white': 'Căn Hộ Tối Giản', 'modern-corporate': 'Sàn Giao Dịch Chuyên Nghiệp',
  'resort-paradise': 'Nghỉ Dưỡng Ven Biển', 'urban-city': 'Đại Đô Thị Thông Minh', 'industrial-estate': 'Khu Công Nghiệp Hiện Đại',
  'villa-premium': 'Biệt Thự Compound', 'eco-green': 'Đô Thị Sinh Thái', 'classic-elegant': 'Dinh Thự Di Sản',
  'investment-pro': 'Đầu Tư Bất Động Sản', 'agency-onepage': 'Landing Mở Bán', 'mega-developer': 'Cổng Thông Tin Dự Án',
  'auction-template': 'Sàn Đấu Giá Bất Động Sản', 'landplot-template': 'Đất Nền Quy Hoạch', 'retail-podium': 'Shophouse Thương Mại', 'personal-agent': 'Môi Giới Nhà Đất',
};

const VIETNAMESE_SEQUENCE_NAMES = [
  'Biệt Thự Hoàng Gia', 'Căn Hộ Tối Giản', 'Sàn Giao Dịch Việt', 'Nghỉ Dưỡng Ven Biển',
  'Đại Đô Thị Thông Minh', 'Khu Công Nghiệp Việt', 'Biệt Thự Compound', 'Đô Thị Sinh Thái',
  'Dinh Thự Di Sản', 'Đầu Tư Bất Động Sản', 'Landing Mở Bán', 'Cổng Thông Tin Dự Án',
  'Sàn Đấu Giá Nhà Đất', 'Đất Nền Quy Hoạch', 'Shophouse Thương Mại', 'Môi Giới Nhà Đất',
  'Sàn Phân Phối Dự Án', 'Căn Hộ Sống Xanh', 'Khu Đô Thị Vườn', 'Chuyên Viên Tư Vấn Zalo',
  'Biệt Thự Ven Sông', 'Căn Hộ Phong Cách Việt', 'Resort Biển Miền Trung', 'Kho Xưởng Và Logistics',
  'Khu Villa Khép Kín', 'Nhà Vườn Sinh Thái', 'Nhà Phố Tân Cổ Điển', 'Tư Vấn Đầu Tư Sinh Lời',
  'Trang Mở Bán Dự Án', 'Tập Đoàn Phát Triển Đô Thị', 'Tài Sản Phát Mãi', 'Phố Thương Mại Trung Tâm',
];

/** Danh mục công khai chỉ có một chuẩn URL bds-01 → bds-32. */
export const ALL_TEMPLATES: Template[] = [...BASE_TEMPLATES, ...VIETNAMESE_VARIANTS, ...NUMBERED_DEMO_VARIANTS].map((template, index) => {
  const number = String(index + 1).padStart(2, '0');
  const sourceSlug = template.slug;
  return {
    ...template,
    id: `vn-bds-${number}`,
    slug: `bds-${number}`,
    name: `BĐS ${number} — ${VIETNAMESE_SEQUENCE_NAMES[index]}`,
    badge: `MẪU ${number}`,
    sortOrder: index + 1,
    thumbnail: `/images/template-previews/bds-${number}-live.png`,
    screenshots: [
      `/images/template-fullpages/bds-${number}-full.png`,
      `/images/template-previews/bds-${number}-live.png`,
    ],
    sectionConfig: { ...template.sectionConfig, sourceSlug },
  };
});


