export interface DesignFamily {
  id: string;
  name: string;
  collectionSlug: string;
  badge: string;
  description: string;
  targetMarket: string;
  designLanguage: {
    mood: string;
    spacingSystem: string;
    radiusToken: string;
    shadowToken: string;
    cardStyle: string;
  };
  typography: {
    fontHeading: string;
    fontBody: string;
    headingScale: string;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cardBg: string;
    text: string;
  };
  sectionLibrary: string[];
}

export const DESIGN_COLLECTIONS: DesignFamily[] = [
  {
    id: 'luxury',
    name: 'Luxury Collection',
    collectionSlug: 'luxury',
    badge: 'LUXURY VIP',
    description: 'Bộ sưu tập độc quyền dành cho Biệt thự siêu sang, Penthouse hạng S, Lâu đài và Dinh thự mang phong cách Hoàng gia Châu Âu & Modern Luxury.',
    targetMarket: 'Chủ đầu tư biệt thự, Penthouse, VIP Real Estate Agency',
    designLanguage: {
      mood: 'Sang trọng, quyền lực, tĩnh lặng và đẳng cấp vượt thời gian.',
      spacingSystem: '8pt Grid — Padding lớn 120px desktop, tạo không gian thở tối đa.',
      radiusToken: 'rounded-none hoặc rounded-sm (2px - 4px) sắc sảo chuẩn kiến trúc.',
      shadowToken: 'shadow-2xl shadow-black/60 (Sâu, tối, hoàng gia)',
      cardStyle: 'Glassmorphism nền tối kẹp viền Gold metallic mỏng.'
    },
    typography: {
      fontHeading: 'Playfair Display / Cormorant Garamond',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.333 — High contrast serif heading.'
    },
    palette: {
      primary: '#0B132B',
      secondary: '#1C2541',
      accent: '#D4AF37',
      background: '#070C1E',
      cardBg: '#111831',
      text: '#F3F4F6'
    },
    sectionLibrary: [
      'HeroFullscreenVideo',
      'VIPLoungeIntro',
      'GalleryMasonryGold',
      'AmenitiesPremiumCard',
      'FloorPlanInteractive3D',
      'PrivateTourBooking',
      'LuxuryConciergeFooter'
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal Collection',
    collectionSlug: 'minimal',
    badge: 'APPLE STYLE',
    description: 'Thiết kế Apple-style tối giản, nhiều khoảng trắng tinh tế, tập trung tối đa vào hình ảnh sắc nét và trải nghiệm mượt mà không góc chết.',
    targetMarket: 'Môi giới cá nhân Top Performer, Căn hộ chung cư hiện đại, Studio BĐS',
    designLanguage: {
      mood: 'Sạch sẽ, minh bạch, hiện đại và tập trung cao độ vào nội dung.',
      spacingSystem: '8pt Grid — Padding 100px desktop với whitespace chuẩn UX Apple.',
      radiusToken: 'rounded-3xl (24px - 32px) bo tròn mềm mại thân thiện.',
      shadowToken: 'shadow-xl shadow-slate-200/50 (Nhẹ nhàng, bay bổng)',
      cardStyle: 'Card trắng bo góc cực lớn, viền mờ border-slate-100 hover nổi 3D.'
    },
    typography: {
      fontHeading: 'Inter Variable / Outfit',
      fontBody: 'Inter Variable',
      headingScale: 'Scale 1.250 — Apple Typography Hierarchy.'
    },
    palette: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      accent: '#2563EB',
      background: '#FFFFFF',
      cardBg: '#FFFFFF',
      text: '#0F172A'
    },
    sectionLibrary: [
      'HeroSplitApple',
      'PropertyGridRounded',
      'SmartFilterPill',
      'MinimalSpecsTable',
      'AgentBioCard',
      'CleanTestimonialSlider',
      'MinimalStickyFooter'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Collection',
    collectionSlug: 'corporate',
    badge: 'CORPORATE PRO',
    description: 'Cấu trúc vững chãi, uy tín tuyệt đối dành cho Sàn giao dịch quy mô lớn, Tổng công ty phân phối và Tập đoàn đầu tư đa dự án.',
    targetMarket: 'Sàn giao dịch BĐS, Tổng công ty, Tập đoàn phân phối đa dự án',
    designLanguage: {
      mood: 'Chuyên nghiệp, tin cậy, chuẩn mực doanh nghiệp quốc tế.',
      spacingSystem: '8pt Grid — Padding 96px desktop với bốc cục lưới Grid 12 cột.',
      radiusToken: 'rounded-xl (12px) chuẩn mực doanh nghiệp.',
      shadowToken: 'shadow-lg shadow-blue-900/10 (Tiêu chuẩn corporate)',
      cardStyle: 'Card Navy/Gray khung viền chắc chắn kèm chỉ số phát triển.'
    },
    typography: {
      fontHeading: 'Manrope / Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.250 — Clean & Structured Corporate.'
    },
    palette: {
      primary: '#0F4C81',
      secondary: '#1E293B',
      accent: '#38BDF8',
      background: '#F8FAFC',
      cardBg: '#FFFFFF',
      text: '#1E293B'
    },
    sectionLibrary: [
      'HeroCorporateGrid',
      'RealtimeMarketStats',
      'MultiProjectGrid',
      'CorporateTimeline',
      'PartnerLogoShowcase',
      'InvestorRelationsHub',
      'CorporateMegaFooter'
    ]
  },
  {
    id: 'resort',
    name: 'Resort Collection',
    collectionSlug: 'resort',
    badge: 'RESORT PARADISE',
    description: 'Giao diện sinh thái biển đảo, mang lại cảm giác thư thái của những kỳ nghỉ xa hoa, tối ưu chốt cọc bất động sản nghỉ dưỡng & Condotel ven biển.',
    targetMarket: 'BĐS nghỉ dưỡng, Condotel biển, Biệt thự đồi, Second Home du lịch',
    designLanguage: {
      mood: 'Thư giãn, lãng mạn, hòa mình vào thiên nhiên biển trời.',
      spacingSystem: '8pt Grid — Padding 120px desktop kết hợp Wave Divider uốn lượn.',
      radiusToken: 'rounded-2xl (16px - 24px) tự nhiên.',
      shadowToken: 'shadow-2xl shadow-cyan-900/15 (Trong trẻo như nước biển)',
      cardStyle: 'Card tràn viền hình ảnh lớn kẹp thông tin tiện ích nghỉ dưỡng.'
    },
    typography: {
      fontHeading: 'Outfit / Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.300 — Airy & Relaxing.'
    },
    palette: {
      primary: '#0284C7',
      secondary: '#0369A1',
      accent: '#38BDF8',
      background: '#F0F9FF',
      cardBg: '#FFFFFF',
      text: '#0C4A6E'
    },
    sectionLibrary: [
      'HeroWaveVideo',
      'ResortBookingBar',
      'BeachInfinityGallery',
      'LuxurySpaAmenities',
      'ROISecondHomeCalc',
      'ResortVirtualTour',
      'ResortRelaxFooter'
    ]
  },
  {
    id: 'apartment',
    name: 'Apartment Collection',
    collectionSlug: 'apartment',
    badge: 'SMART URBAN',
    description: 'Thiết kế tối ưu cho căn hộ nội đô & Smart City, tích hợp sẵn Bản đồ quy hoạch tương tác, Bộ lọc tìm kiếm theo quận/trục Metro và Máy tính lãi vay.',
    targetMarket: 'Dự án căn hộ chung cư, Smart City, Khách mua ở thực & Đầu tư cho thuê',
    designLanguage: {
      mood: 'Năng động, thông minh, tiện nghi, kết nối giao thông nhịp sống đô thị.',
      spacingSystem: '8pt Grid — Padding 96px desktop tập trung vào bản đồ & tiện ích.',
      radiusToken: 'rounded-2xl (16px) hiện đại.',
      shadowToken: 'shadow-xl shadow-purple-900/10 (Hiện đại công nghệ)',
      cardStyle: 'Card compact tối ưu diện tích hiển thị giá/m2 và số phòng ngủ.'
    },
    typography: {
      fontHeading: 'Plus Jakarta Sans / Inter',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.250 — Tech & Urban UI.'
    },
    palette: {
      primary: '#6D28D9',
      secondary: '#4C1D95',
      accent: '#A78BFA',
      background: '#F5F3FF',
      cardBg: '#FFFFFF',
      text: '#2E1065'
    },
    sectionLibrary: [
      'HeroSmartSearchMap',
      'ApartmentLayoutSelector',
      'MetroConnectMap',
      'BankMortgageCalculator',
      'SmartHomeTechSpecs',
      'NearbyUtilitiesGrid',
      'ApartmentLeadCTA'
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial Collection',
    collectionSlug: 'industrial',
    badge: 'INDUSTRIAL B2B',
    description: 'Giao diện chuyên sâu cho BĐS công nghiệp, kho bãi Logistics và nhà xưởng B2B. Nhấn mạnh thông số hạ tầng điện/nước, pháp lý và kết nối cảng biển.',
    targetMarket: 'Khu công nghiệp (KCN), Nhà xưởng cho thuê, Logistics Park, Khách FDI',
    designLanguage: {
      mood: 'Vững chãi, kỹ thuật, minh bạch thông số hạ tầng.',
      spacingSystem: '8pt Grid — Padding 100px desktop bố cục kỹ thuật dạng Blueprint.',
      radiusToken: 'rounded-lg (8px) góc cạnh chuẩn công nghiệp.',
      shadowToken: 'shadow-lg shadow-slate-900/40 (Chắc chắn, mạnh mẽ)',
      cardStyle: 'Card Dark Theme khung viền xám thép hiển thị tải trọng/chiều cao.'
    },
    typography: {
      fontHeading: 'Manrope / Space Grotesk',
      fontBody: 'Inter Variable',
      headingScale: 'Scale 1.200 — Technical & Structured.'
    },
    palette: {
      primary: '#1E293B',
      secondary: '#334155',
      accent: '#F59E0B',
      background: '#0F172A',
      cardBg: '#1E293B',
      text: '#F8FAFC'
    },
    sectionLibrary: [
      'HeroIndustrialBlueprint',
      'InfrastructureSpecsGrid',
      'LogisticsPortConnection',
      'FactoryWarehouseCatalog',
      'FDIInvestmentLegal',
      'IndustrialTimelineHub',
      'B2BInquiryFormFooter'
    ]
  },
  {
    id: 'villa',
    name: 'Villa Collection',
    collectionSlug: 'villa',
    badge: 'VILLA 3D TOUR',
    description: 'Tập trung phô diễn không gian biệt thự đơn lập & song lập với sơ đồ mặt bằng tương tác từng phòng và nhúng trực tiếp Tour ảo 360° thực tế.',
    targetMarket: 'Dự án biệt thự phân khu, Shophouse thương mại, Khách hàng VIP xa xỉ',
    designLanguage: {
      mood: 'Thanh lịch, không gian mở, tập trung trải nghiệm thị giác 3D.',
      spacingSystem: '8pt Grid — Padding 110px desktop.',
      radiusToken: 'rounded-2xl (16px) sang trọng.',
      shadowToken: 'shadow-2xl shadow-amber-900/10',
      cardStyle: 'Card bo góc vừa phải kết hợp nút xoay 360 độ trực quan.'
    },
    typography: {
      fontHeading: 'Outfit / Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.300 — Elegant & Clean.'
    },
    palette: {
      primary: '#B45309',
      secondary: '#78350F',
      accent: '#F59E0B',
      background: '#FFFBEB',
      cardBg: '#FFFFFF',
      text: '#451A03'
    },
    sectionLibrary: [
      'Hero3DVirtualTour',
      'FloorPlanInteractiveTabs',
      'SunOrientationChart',
      'VillaMasterplanShowcase',
      'PrivateClubhouseAmenities',
      'BookPrivateTourForm',
      'VillaLuxuryFooter'
    ]
  },
  {
    id: 'eco',
    name: 'Eco Collection',
    collectionSlug: 'eco',
    badge: 'ECO LIVING',
    description: 'Tông xanh lục bảo tự nhiên tươi sáng, tôn vinh lối sống xanh bền vững, công viên nội khu và các tiện ích thiên nhiên cho gia đình đa thế hệ.',
    targetMarket: 'Khu đô thị sinh thái, Ecopark, Dự án xanh bền vững, Gia đình trẻ',
    designLanguage: {
      mood: 'Tươi mới, bình yên, tràn ngập năng lượng xanh tự nhiên.',
      spacingSystem: '8pt Grid — Padding 110px desktop với các đường bo tròn Leaf Shape.',
      radiusToken: 'rounded-3xl (24px - 32px) hình chiếc lá mềm mại.',
      shadowToken: 'shadow-xl shadow-emerald-900/10 (Thanh lọc, nhẹ nhàng)',
      cardStyle: 'Card xanh nhạt pastel kết hợp icon chiếc lá tự nhiên.'
    },
    typography: {
      fontHeading: 'Plus Jakarta Sans / Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.250 — Organic & Fresh.'
    },
    palette: {
      primary: '#15803D',
      secondary: '#166534',
      accent: '#4ADE80',
      background: '#F0FDF4',
      cardBg: '#FFFFFF',
      text: '#14532D'
    },
    sectionLibrary: [
      'HeroEcoGreenHero',
      'NatureTimelineShowcase',
      'OutdoorFacilitiesGrid',
      'EcoSustainabilityMetrics',
      'CommunityEventShowcase',
      'GreenFamilyTestimonial',
      'EcoFooterContact'
    ]
  },
  {
    id: 'classic',
    name: 'Classic Collection',
    collectionSlug: 'classic',
    badge: 'CLASSIC HERITAGE',
    description: 'Phong cách Editorial Magazine cổ điển trang nhã, tông màu trầm ấm kết hợp bố cục tạp chí sang trọng dành cho thương hiệu và dự án uy tín lâu đời.',
    targetMarket: 'Khách hàng trung niên thành đạt, Dự án truyền thống, Chủ đầu tư lâu năm',
    designLanguage: {
      mood: 'Trang nhã, chuẩn mực, sâu sắc, cổ điển sang trọng.',
      spacingSystem: '8pt Grid — Padding 120px desktop theo bố cục Editorial 3 cột.',
      radiusToken: 'rounded-md (6px) chuẩn mực tạp chí truyền thống.',
      shadowToken: 'shadow-lg shadow-rose-950/10',
      cardStyle: 'Card viền chỉ vàng mỏng trên nền màu Beige ấm áp.'
    },
    typography: {
      fontHeading: 'Playfair Display / Lora',
      fontBody: 'Inter Variable',
      headingScale: 'Scale 1.333 — Classic Editorial Hierarchy.'
    },
    palette: {
      primary: '#881337',
      secondary: '#4C0519',
      accent: '#FB7185',
      background: '#FFF1F2',
      cardBg: '#FFFFFF',
      text: '#4C0519'
    },
    sectionLibrary: [
      'HeroClassicEditorial',
      'HeritageTimelineHistory',
      'AwardsRecognitionShowcase',
      'FengShuiOrientationAdvice',
      'ClassicTestimonialQuotation',
      'ExecutiveBoardBio',
      'ClassicElegantFooter'
    ]
  },
  {
    id: 'investment',
    name: 'Investment Collection',
    collectionSlug: 'investment',
    badge: 'INVESTMENT PRO',
    description: 'Giao diện định hướng tài chính chuyên sâu, tập trung làm nổi bật các con số tăng trưởng tài sản, biểu đồ dao động giá và phân tích tỷ suất ROI.',
    targetMarket: 'Nhà đầu tư cá nhân, Quỹ BĐS (REITs), Chuyên gia phân tích thị trường',
    designLanguage: {
      mood: 'Sắc sảo, số liệu trực quan, thuyết phục bằng lý trí & biểu đồ.',
      spacingSystem: '8pt Grid — Padding 96px desktop dạng Dashboard tài chính.',
      radiusToken: 'rounded-xl (12px) gọn gàng.',
      shadowToken: 'shadow-xl shadow-blue-950/20',
      cardStyle: 'Card phân tích số liệu tài chính kèm mũi tên tăng trưởng xanh/đỏ.'
    },
    typography: {
      fontHeading: 'Inter / Plus Jakarta Sans',
      fontBody: 'Inter Variable',
      headingScale: 'Scale 1.250 — Data-Driven & Precise.'
    },
    palette: {
      primary: '#1E40AF',
      secondary: '#1E3A8A',
      accent: '#60A5FA',
      background: '#EFF6FF',
      cardBg: '#FFFFFF',
      text: '#1E3A8A'
    },
    sectionLibrary: [
      'HeroInvestmentDashboard',
      'ROICalculatorSimulator',
      'PriceGrowthChartShowcase',
      'CashflowAnalysisGrid',
      'PlanningDocumentDownload',
      'InvestorComparisonTable',
      'InvestmentAdvisoryFooter'
    ]
  },
  {
    id: 'agency',
    name: 'Agency Collection',
    collectionSlug: 'agency',
    badge: 'LANDING HIGH-CONVERT',
    description: 'Thiết kế Landing Page 1 trang cuộn mượt, sticky CTA nổi bật, đếm ngược thời gian mở bán và form thu thập Lead tỷ lệ chuyển đổi cực cao.',
    targetMarket: 'Chạy quảng cáo Facebook Ads, Google Ads, Chiến dịch mở bán giai đoạn 1',
    designLanguage: {
      mood: 'Thúc giục, hấp dẫn, kêu gọi hành động (CTA) liên tục không gián đoạn.',
      spacingSystem: '8pt Grid — Padding 88px desktop dồn nhịp độ chuyển đổi cao.',
      radiusToken: 'rounded-2xl (16px) nổi bật.',
      shadowToken: 'shadow-2xl shadow-pink-600/20 (Chú ý cực mạnh)',
      cardStyle: 'Card tương phản cao, nút CTA màu hồng/cam rực rỡ kêu gọi cọc ngay.'
    },
    typography: {
      fontHeading: 'Plus Jakarta Sans / Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.300 — High-Impact Headline.'
    },
    palette: {
      primary: '#BE185D',
      secondary: '#831843',
      accent: '#F43F5E',
      background: '#FDF2F8',
      cardBg: '#FFFFFF',
      text: '#500724'
    },
    sectionLibrary: [
      'HeroLandingLeadCapture',
      'CountdownUrgencyBar',
      'ProblemSolutionGrid',
      'SpecialDiscountTable',
      'InstantPopupLeadForm',
      'SalesAgentDirectCall',
      'AgencyStickyFooterCTA'
    ]
  },
  {
    id: 'developer',
    name: 'Developer Collection',
    collectionSlug: 'developer',
    badge: 'MEGA PORTAL',
    description: 'Cổng thông tin quy mô lớn cho Tập đoàn BĐS hàng đầu: Mega Menu đa dự án, Investor Relations, Media Center, CSR và Cổng thông tin Tuyển dụng.',
    targetMarket: 'Tập đoàn BĐS, Chủ đầu tư đa dự án, Cổng thông tin niêm yết sàn chứng khoán',
    designLanguage: {
      mood: 'Vĩ mô, tầm vóc quốc gia, uy tín tập đoàn niêm yết.',
      spacingSystem: '8pt Grid — Padding 110px desktop với cấu trúc Mega Portal đa tầng.',
      radiusToken: 'rounded-xl (12px) chuẩn mực.',
      shadowToken: 'shadow-2xl shadow-slate-950/50',
      cardStyle: 'Card dự án Mega với bộ lọc trạng thái: Sắp mở bán / Đang bàn giao.'
    },
    typography: {
      fontHeading: 'Plus Jakarta Sans / Manrope',
      fontBody: 'Plus Jakarta Sans',
      headingScale: 'Scale 1.250 — Enterprise & Portal Hierarchy.'
    },
    palette: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#38BDF8',
      background: '#020617',
      cardBg: '#0F172A',
      text: '#F8FAFC'
    },
    sectionLibrary: [
      'HeroMegaPortalSlider',
      'MultiProjectFilterGrid',
      'InvestorStockTickerBar',
      'CSRCommunityImpact',
      'MediaNewsroomCenter',
      'CareerOpportunitiesHub',
      'DeveloperEnterpriseFooter'
    ]
  }
];
