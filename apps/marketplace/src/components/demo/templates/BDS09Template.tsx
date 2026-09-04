'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  Anchor, Waves, Sun, Sparkle, Trophy, Gem, CheckCircle, Info, ExternalLink
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../../../utils/demo';

export interface TemplateProps {
  template: { name: string; slug: string; collectionSlug?: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: {
    name?: string;
    slogan?: string;
    phone?: string;
    email?: string;
    address?: string;
    logo?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      tiktok?: string;
      zalo?: string;
    };
    footerColumns?: Array<{
      title: string;
      links: Array<{ label: string; url?: string; page?: string }>;
    }>;
  };
  theme?: Record<string, string>;
  projects?: Array<Record<string, unknown>>;
  posts?: Array<Record<string, unknown>>;
  pageContent?: any;
}

export interface UnitTypeItem {
  id: string;
  type: string;
  category: 'all' | 'studio' | '1pn' | '2pn' | '3pn' | 'skyvilla' | 'dualkey';
  name: string;
  area: string;
  areaNum: number;
  bedrooms: number;
  bathrooms: number;
  price: string;
  view: string;
  handover: string;
  image: string;
  specs: string[];
  description: string;
  highlights: string[];
}

export interface AmenityItem {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  icon: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  views: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// BDS-09 MOCK DATA: AN VIÊN YACHT & SKY RESIDENCE NHA TRANG
// ─────────────────────────────────────────────────────────────────────────────

export const BDS09_UNITS: UnitTypeItem[] = [
  {
    id: 'studio-ocean',
    type: 'Studio Nghỉ Dưỡng Hướng Biển',
    category: 'studio',
    name: 'Studio Suite Panorama #ST-1808',
    area: '45.5 m²',
    areaNum: 45.5,
    bedrooms: 1,
    bathrooms: 1,
    price: '2.35 Tỷ VNĐ',
    view: 'Trực diện Vịnh Nha Trang & Đảo Hòn Tre',
    handover: 'Full nội thất tiêu chuẩn khách sạn 5 sao',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80',
    specs: ['Ban công kính Low-E tràn viền', 'Bồn tắm nằm hướng biển', 'Hệ thống Smart Home điều khiển giọng nói'],
    description: 'Căn hộ Studio thiết kế mở tối ưu ánh sáng tự nhiên và gió biển, thích hợp cho khách du lịch lưu trú cao cấp hoặc đầu tư khai thác dòng tiền Airbnb/Booking.',
    highlights: ['Lợi nhuận cho thuê ước tính: 15-22 Triệu/tháng', 'Cam kết lợi nhuận tối thiểu 10%/năm trong 3 năm đầu']
  },
  {
    id: '1pn-deluxe',
    type: 'Căn Hộ 1 Phòng Ngủ Deluxe',
    category: '1pn',
    name: 'Executive 1BR Oceanview #EX-2205',
    area: '58.2 m²',
    areaNum: 58.2,
    bedrooms: 1,
    bathrooms: 1,
    price: '3.10 Tỷ VNĐ',
    view: 'Vịnh Biển & Bến Du Thuyền Quốc Tế Marina',
    handover: 'Full nội thất nhập khẩu Châu Âu (Kohler, Hafele)',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&q=80',
    specs: ['Phòng khách và phòng ngủ riêng biệt', 'Bếp âm đảo hiện đại', 'Cửa khóa từ 4 chức năng cao cấp'],
    description: 'Không gian sống lý tưởng dành cho các cặp đôi hoặc chuyên gia nước ngoài làm việc tại Nha Trang. Phòng khách rộng rãi nối liền ban công ngắm trọn cảnh hoàng hôn trên biển.',
    highlights: ['Thanh toán đợt 1 chỉ 10% (310 Triệu)', 'Ngân hàng BIDV hỗ trợ vay 70% ân hạn gốc lãi 24 tháng']
  },
  {
    id: '2pn-signature',
    type: 'Căn Hộ 2 Phòng Ngủ Signature',
    category: '2pn',
    name: 'Signature 2BR Grand Corner #SG-2802',
    area: '78.6 m²',
    areaNum: 78.6,
    bedrooms: 2,
    bathrooms: 2,
    price: '4.45 Tỷ VNĐ',
    view: 'Căn góc 2 mặt tiền biển & Cáp treo Vinpearl',
    handover: 'Full nội thất cao cấp dát vàng tinh tế',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    specs: ['2 Phòng ngủ Master view biển', 'Phòng khách thông tầng rộng 32m²', 'Logia giặt phơi riêng biệt'],
    description: 'Dòng sản phẩm căn góc Signature sở hữu tầm nhìn panorama 270 độ bao trọn vịnh Nha Trang. Thiết kế sang trọng với sàn đá Marble và nội thất gỗ tự nhiên.',
    highlights: ['Tặng thẻ VIP du thuyền Marina Club 3 năm', 'Chiết khấu thanh toán sớm lên đến 9.5%']
  },
  {
    id: '3pn-royal',
    type: 'Căn Hộ 3 Phòng Ngủ Royal Suite',
    category: '3pn',
    name: 'Royal Ocean Suite #RY-3501',
    area: '115.8 m²',
    areaNum: 115.8,
    bedrooms: 3,
    bathrooms: 3,
    price: '6.85 Tỷ VNĐ',
    view: 'Trực diện Vịnh Nha Trang & Đồi Cảnh Quan An Viên',
    handover: 'Full nội thất siêu sang tiêu chuẩn Tổng thống',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
    specs: ['3 Phòng ngủ khép kín', 'Phòng ăn 8 người phong cách quý tộc', 'Hệ thống máy lạnh âm trần Daikin VRV'],
    description: 'Tuyệt tác không gian sống dành cho đại gia đình thượng lưu. Từng chi tiết nội thất được trau chuốt tỉ mỉ mang lại trải nghiệm nghỉ dưỡng 6 sao ngay tại nhà.',
    highlights: ['Đặc quyền quản gia riêng 24/7', 'Miễn phí phí quản lý dịch vụ 5 sao trong 5 năm']
  },
  {
    id: 'skyvilla-penthouse',
    type: 'Sky Villa Penthouse Hoàng Gia',
    category: 'skyvilla',
    name: 'Imperial Penthouse #PH-3901 (Đỉnh Tháp)',
    area: '268.0 m²',
    areaNum: 268.0,
    bedrooms: 4,
    bathrooms: 5,
    price: '18.50 Tỷ VNĐ',
    view: 'Toàn cảnh 360 độ Vịnh Biển & Thành Phố Nha Trang',
    handover: 'Bàn giao thô hoặc thiết kế đo ni đóng giày riêng',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    specs: ['Hồ bơi sục Jacuzzi vô cực trên không', 'Sân vườn riêng biệt rộng 60m²', 'Thang máy riêng bảo mật sinh trắc học'],
    description: 'Dinh thự trên không độc bản duy nhất tại đỉnh tháp An Viên. Nơi hội tụ tinh hoa kiến trúc thế giới dành riêng cho các chủ nhân danh giá bậc nhất Việt Nam.',
    highlights: ['Tặng chỗ neo đậu du thuyền riêng trọn đời tại Marina Club', 'Hưởng đặc quyền du lịch trực thăng ngắm vịnh biển']
  },
  {
    id: 'dualkey-invest',
    type: 'Căn Hộ Kép Dual Key Đa Năng',
    category: 'dualkey',
    name: 'Dual Key Harmony #DK-1604',
    area: '92.5 m²',
    areaNum: 92.5,
    bedrooms: 2,
    bathrooms: 2,
    price: '5.20 Tỷ VNĐ',
    view: 'Biển Nha Trang & Hồ Bơi Vô Cực Khối Đế',
    handover: 'Full nội thất hoàn thiện 2 chìa khóa độc lập',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
    specs: ['1 Căn hộ 1PN + 1 Studio khép kín có lối đi riêng', '2 Không gian bếp và WC tách biệt hoàn toàn'],
    description: 'Giải pháp hoàn hảo "Vừa ở vừa cho thuê". Chủ nhân có thể ở một căn và cho thuê căn còn lại để tạo dòng tiền thu nhập thụ động bền vững hàng tháng.',
    highlights: ['Tối ưu hóa công suất khai thác lưu trú 200%', 'Lợi nhuận kép vừa tăng giá trị tài sản vừa có dòng tiền ngoại tệ']
  }
];

export const BDS09_AMENITIES: AmenityItem[] = [
  {
    id: 1,
    title: 'Sảnh Đón 5 Sao Grand Lobby',
    subtitle: 'TRẦN CAO 9M DÁT VÀNG HOÀNG GIA',
    desc: 'Không gian đón tiếp quý tộc sang trọng với đèn chùm pha lê Tiệp Khắc, dịch vụ quản gia phục vụ 24/7 và sảnh chờ VIP riêng tư.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    icon: '👑'
  },
  {
    id: 2,
    title: 'Sky Bar & Nhà Hàng Á - Âu',
    subtitle: 'ẨM THỰC CHUẨN MICHELIN TRÊN CAO',
    desc: 'Thưởng thức ẩm thực tinh hoa do các đầu bếp quốc tế chuẩn bị và thưởng lãm trọn vẹn cảnh vịnh biển lung linh ánh đèn về đêm từ tầng 39.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    icon: '🍷'
  },
  {
    id: 3,
    title: 'Hồ Bơi Vô Cực Nối Liền 2 Tháp',
    subtitle: 'BỂ BƠI NƯỚC ẤM TRÀN CHÂN MÂY',
    desc: 'Hồ bơi vô cực trên không nối liền hai tòa tháp ngắm toàn cảnh 360 độ vịnh biển Nha Trang với hệ thống sục khoáng và quầy bar chìm.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
    icon: '🏊‍♂️'
  },
  {
    id: 4,
    title: 'Bến Du Thuyền Quốc Tế Marina',
    subtitle: 'ĐẶC QUYỀN DU THUYỀN SIÊU SANG',
    desc: 'Bến đỗ tiêu chuẩn quốc tế phục vụ hơn 50 du thuyền hạng sang ngay trước thềm căn hộ, nơi khởi đầu những hải trình khám phá biển đảo.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    icon: '⚓'
  }
];

export const BDS09_INVEST_REASONS = [
  {
    id: 1,
    icon: '🏛️',
    title: 'Vị Trí Kim Cương Độc Tôn',
    desc: 'Tọa lạc tại bán đảo An Viên khép kín, sở hữu vị thế tựa sơn hướng hải, là quỹ đất ven biển sở hữu lâu dài cuối cùng tại TP. Nha Trang.'
  },
  {
    id: 2,
    icon: '💎',
    title: 'Biểu Tượng Kiến Trúc Quốc Tế',
    desc: 'Tòa tháp đôi kiệt tác vươn cao 39 tầng bên vịnh biển, khẳng định vị thế và đẳng cấp thượng lưu không thể thay thế của gia chủ.'
  },
  {
    id: 3,
    icon: '📈',
    title: 'Tiềm Năng Khai Thác Du Lịch',
    desc: 'Nha Trang đón hơn 8.5 triệu lượt khách quốc tế/năm. Công suất phòng nghỉ dưỡng biển luôn đạt mức kỷ lục 80 - 90% quanh năm.'
  },
  {
    id: 4,
    icon: '⚖️',
    title: 'Pháp Lý Minh Bạch Sổ Lâu Dài',
    desc: '100% căn hộ có sổ hồng sở hữu lâu dài. Ngân hàng BIDV bảo lãnh tiến độ xây dựng và hỗ trợ giải ngân lãi suất 0%.'
  },
  {
    id: 5,
    icon: '🛋️',
    title: 'Bàn Giao Full Nội Thất 5 Sao',
    desc: 'Nhận nhà hoàn thiện đầy đủ nội thất nhập khẩu Châu Âu, sẵn sàng đưa vào vận hành cho thuê sinh lời dòng tiền ngoại tệ ngay lập tức.'
  }
];

export const BDS09_INTERIOR_GALLERY = [
  { title: 'Phòng Khách View Biển Panorama', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { title: 'Phòng Ngủ Master Đón Bình Minh', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80' },
  { title: 'Phòng Ăn Quý Tộc Sang Trọng', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
  { title: 'Phòng Tắm Dát Vàng Hướng Vịnh', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
  { title: 'Ban Công Sunset Lounge Thư Giãn', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { title: 'Sky Lounge VIP Tầng Thượng', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80' }
];

export const BDS09_NEWS_LIST: NewsItem[] = [
  {
    id: 1,
    title: 'Nha Trang bứt phá trở thành đô thị du lịch biển tầm cỡ thế giới',
    slug: 'nha-trang-but-pha-tro-thanh-do-thi-du-lich-bien-tam-co-the-gioi',
    date: '28 Tháng Tám, 2026',
    author: 'Chuyên Gia Kinh Tế BĐS',
    category: 'Thị Trường Nha Trang',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    excerpt: 'Hạ tầng cao tốc Buôn Ma Thuột - Nha Trang và nâng cấp Cảng hàng không quốc tế Cam Ranh tạo đòn bẩy bùng nổ...',
    content: [
      'Nha Trang đang chứng kiến sự chuyển mình mạnh mẽ với hàng loạt dự án hạ tầng tỷ đô.',
      'Sự xuất hiện của các bến du thuyền quốc tế và các dòng căn hộ branded residences thu hút dòng tiền kiều hối và nhà đầu tư quốc tế.'
    ],
    views: 4520
  },
  {
    id: 2,
    title: 'Chính sách chiết khấu 9.5% và cam kết thuê lại căn hộ An Viên Residence',
    slug: 'chinh-sach-chiet-khau-va-cam-ket-thue-lai-an-vien-residence',
    date: '24 Tháng Tám, 2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Chính Sách Bán Hàng',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    excerpt: 'Cơ hội sở hữu căn hộ nghỉ dưỡng biển với số vốn ban đầu chỉ từ 300 triệu đồng cùng lịch thanh toán nhẹ nhàng...',
    content: [
      'Khách hàng đăng ký sớm trong tháng được tặng kỳ nghỉ dưỡng 15 đêm tại các resort 5 sao liên kết.',
      'Hỗ trợ vay ngân hàng BIDV lên đến 70% giá trị hợp đồng, ân hạn nợ gốc và miễn lãi 24 tháng.'
    ],
    views: 3890
  },
  {
    id: 3,
    title: 'Lễ cất nóc tòa tháp Sky Tower vượt tiến độ 45 ngày cam kết',
    slug: 'le-cat-noc-toa-thap-sky-tower-vuot-tien-do-45-ngay',
    date: '18 Tháng Tám, 2026',
    author: 'Tổng Thầu TAKCO',
    category: 'Tiến Độ Dự Án',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    excerpt: 'Tập đoàn An Viên cùng tổng thầu TAKCO chính thức làm lễ cất nóc tầng 39 trong sự hân hoan của cư dân tương lai...',
    content: [
      'Dự án áp dụng công nghệ thi công Gangform và kính cản nhiệt Low-E 3 lớp tiêu chuẩn quốc tế.',
      'Công tác hoàn thiện nội thất căn hộ đang được gấp rút triển khai đúng tiến độ bàn giao quý 1/2027.'
    ],
    views: 5120
  }
];

export const resolvePageAndDetail = (p?: string) => {
  if (!p || p === 'home') return { page: 'home', propSlug: '', artSlug: '' };
  const clean = p.replace(/^\//, '').trim();
  if (clean.startsWith('tin-tuc/') || clean.startsWith('news/')) {
    return { page: 'news-detail', propSlug: '', artSlug: clean.replace(/^(tin-tuc\/|news\/)/, '') };
  }
  if (clean === 'tin-tuc' || clean === 'news') return { page: 'news', propSlug: '', artSlug: '' };
  if (clean.startsWith('chi-tiet/') || clean.startsWith('property/')) {
    return { page: 'property-detail', propSlug: clean.replace(/^(chi-tiet\/|property\/)/, ''), artSlug: '' };
  }
  if (clean === 'tong-quan' || clean === 'overview') return { page: 'overview', propSlug: '', artSlug: '' };
  if (clean === 'vi-tri' || clean === 'location') return { page: 'location', propSlug: '', artSlug: '' };
  if (clean === 'mat-bang' || clean === 'masterplan') return { page: 'masterplan', propSlug: '', artSlug: '' };
  if (clean === 'san-pham' || clean === 'products') return { page: 'products', propSlug: '', artSlug: '' };
  if (clean === 'tien-ich' || clean === 'amenities') return { page: 'amenities', propSlug: '', artSlug: '' };
  if (clean === 'ly-do-dau-tu' || clean === 'invest-reasons') return { page: 'invest-reasons', propSlug: '', artSlug: '' };
  if (clean === 'thu-vien' || clean === 'gallery') return { page: 'gallery', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS09Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts, pageContent
}: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const activeUnits = useMemo<UnitTypeItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): UnitTypeItem => ({
        id: p.slug || `unit-${idx + 1}`,
        type: p.type || 'Căn Hộ 2 Phòng Ngủ',
        category: (p.type?.toLowerCase().includes('sky') || p.type?.toLowerCase().includes('penthouse') || p.type === 'SKYVILLA')
          ? 'skyvilla'
          : (p.type?.toLowerCase().includes('3') ? '3pn' : (p.type?.toLowerCase().includes('1') ? '1pn' : '2pn')),
        name: p.title || p.name || 'Căn Hộ Biển Cao Cấp',
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '75 m²'),
        areaNum: typeof p.area === 'number' ? p.area : 75,
        bedrooms: p.bedrooms || 2,
        bathrooms: p.bathrooms || 2,
        price: p.price || (p.priceFrom ? `Từ ${p.priceFrom} Tỷ` : 'Liên hệ'),
        view: p.view || 'View Sông Hàn & Thành Phố',
        handover: p.handover || 'Năm 2026',
        image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        specs: Array.isArray(p.specs) ? p.specs : ['Thiết kế thông minh', 'Ban công rộng thoáng', 'Full nội thất cao cấp'],
        description: p.description || p.desc || 'Không gian sống chuẩn mực dành cho gia đình hiện đại.',
        highlights: Array.isArray(p.highlights) ? p.highlights : ['Vị trí kim cương', 'Tiện ích 5 sao'],
      }));
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS09_UNITS).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS09_UNITS;
  }, [projects]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức thị trường bất động sản',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Thị Trường',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tin tức thị trường BĐS mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
      const customSlugs = new Set(customNews.map((cn: any) => cn.slug));
      const remainingDefaults = (BDS09_NEWS_LIST).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS09_NEWS_LIST;
  }, [posts, company]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitTypeItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeUnits.find(u => u.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeUnits[0] || BDS09_UNITS[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS09_NEWS_LIST[0];
  });

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeMasterplanView, setActiveMasterplanView] = useState<string>('tong-the');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', unitType: 'Căn Hộ 2 Phòng Ngủ Signature' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-09';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS09_UNITS.find(u => u.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = activeNews.find(a => a.slug === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'overview') urlSlug = 'tong-quan';
    else if (page === 'location') urlSlug = 'vi-tri';
    else if (page === 'masterplan') urlSlug = 'mat-bang';
    else if (page === 'products') urlSlug = 'san-pham';
    else if (page === 'amenities') urlSlug = 'tien-ich';
    else if (page === 'invest-reasons') urlSlug = 'ly-do-dau-tu';
    else if (page === 'gallery') urlSlug = 'thu-vien';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenUnitDetail = (unit: UnitTypeItem) => {
    setSelectedUnit(unit);
    navigate('property-detail', unit.id);
  };

  const handleOpenNewsDetail = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone || !leadForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại để chuyên viên tư vấn gửi bảng giá!');
      return;
    }
    showToast(`🎉 Cảm ơn quý khách ${leadForm.name} (${leadForm.phone}). Bảng giá gốc và chính sách chiết khấu 9.5% cho ${leadForm.unitType} đã được gửi qua Zalo!`);
    setLeadForm({ name: '', phone: '', email: '', unitType: 'Căn Hộ 2 Phòng Ngủ Signature' });
    setLeadModalOpen(false);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  const filteredUnits = useMemo(() => {
    if (activeTab === 'all') return BDS09_UNITS;
    return activeUnits.filter(u => u.category === activeTab);
  }, [activeTab]);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & STICKY MIDNIGHT-GOLD NAVBAR
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-2xl transition-all">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo & Luxury Crest */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#92400E] p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0B132B] rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
              <Anchor size={18} className="text-[#D4AF37] animate-pulse" />
            </div>
          </div>
          <div className="min-w-0 truncate">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-base sm:text-xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#F59E0B] truncate">
                {(company as any)?.logoText || "TL BDS09"}
              </span>
            </div>
            <span className="text-[7.5px] sm:text-[9px] tracking-widest text-[#D4AF37] block uppercase font-extrabold truncate">
              BIỂU TƯỢNG NHA TRANG HIỆN ĐẠI
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('overview')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'overview' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Tổng Quan
          </button>
          <button 
            onClick={() => navigate('location')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'location' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Vị Trí
          </button>
          <button 
            onClick={() => navigate('masterplan')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'masterplan' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Mặt Bằng
          </button>
          <button 
            onClick={() => navigate('products')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'products' || currentPage === 'property-detail' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Sản Phẩm
          </button>
          <button 
            onClick={() => navigate('amenities')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'amenities' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Tiện Ích
          </button>
          <button 
            onClick={() => navigate('invest-reasons')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'invest-reasons' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Lý Do Đầu Tư
          </button>
          <button 
            onClick={() => navigate('gallery')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'gallery' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Thư Viện
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#FDE047] font-extrabold border-b-2 border-[#D4AF37]' : 'hover:text-[#FDE047]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-amber-500/10 border border-amber-500/40 text-[#FDE047] text-xs font-black whitespace-nowrap shrink-0 hover:bg-amber-500/20 transition"
          >
            <Phone size={13} className="text-amber-400 animate-pulse shrink-0" />
            <span>0919 006 030</span>
          </a>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] hover:to-[#B45309] text-slate-950 text-xs font-black rounded-sm shadow-lg shadow-amber-500/20 transition uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Tải Bảng Giá VIP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-sm bg-slate-800 text-white xl:hidden hover:bg-slate-700 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B132B] border-b border-amber-500/30 px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Trang Chủ</button>
            <button onClick={() => navigate('overview')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Vị Trí</button>
            <button onClick={() => navigate('masterplan')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Mặt Bằng</button>
            <button onClick={() => navigate('products')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Sản Phẩm</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Tiện Ích</button>
            <button onClick={() => navigate('invest-reasons')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Lý Do Đầu Tư</button>
            <button onClick={() => navigate('gallery')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Thư Viện</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO PANORAMA VỊNH BIỂN NHA TRANG & BÁN ĐẢO AN VIÊN (EXACT MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[720px] flex items-center justify-center text-white overflow-hidden bg-[#070D1E]">
      {/* High-res Panorama Flycam of Nha Trang Bay and Island Marina */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
        alt="Nha Trang Bay Aerial"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 animate-pulse-slow"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#070D1E]/40 to-transparent" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />

      {/* Hero Content Center */}
      <div className={`relative z-20 ${MAX_W} mx-auto px-4 py-16 text-center space-y-6 max-w-4xl`}>
        
        {/* Gold Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-slate-950/80 text-[#FDE047] text-xs font-bold uppercase tracking-widest border border-amber-500/40 shadow-xl backdrop-blur-md">
          <Sparkle size={14} className="text-amber-400" /> DỰ ÁN CĂN HỘ CAO CẤP NHA TRANG <Sparkle size={14} className="text-amber-400" />
        </div>

        {/* Master Headline matching mockup */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white uppercase tracking-wider leading-[1.15] drop-shadow-2xl">
          BIỂU TƯỢNG CỦA<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFBEB] via-[#FDE047] to-[#F59E0B]">
            NHA TRANG HIỆN ĐẠI
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
          Tổ hợp căn hộ nghỉ dưỡng và bến du thuyền 5 sao đẳng cấp quốc tế tọa lạc tại bán đảo An Viên, sở hữu 100% tầm nhìn trực diện vịnh biển đẹp nhất hành tinh.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('masterplan')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] hover:to-[#B45309] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-2xl transition hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            Khám Phá Dự Án <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="px-8 py-3.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-400/50 text-[#FDE047] font-black text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-xl transition hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <Download size={16} /> Nhận Trọn Bộ Bảng Giá
          </button>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW & RENDERING)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverview = () => (
    <section id="tong-quan" className="py-16 bg-[#FDFBF7] text-slate-800 border-b border-amber-200/60">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Section Heading with Gold Divider */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">
            TỔNG QUAN DỰ ÁN
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Gem size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An Viên Yacht & Sky Residence Nha Trang là kiệt tác tháp đôi biểu tượng 39 tầng tọa lạc trên bán đảo sinh thái triệu đô, mang lại chuẩn mực sống xa hoa bậc nhất miền Trung.
          </p>
        </div>

        {/* Large 3D Rendering of Twin Towers and Ocean Marina */}
        <div className="relative rounded-md overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 group">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
            alt="An Vien Twin Towers Rendering"
            onError={handleImgError}
            className="w-full h-[360px] sm:h-[480px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Phối Cảnh Tổng Thể 3D</span>
              <h3 className="text-lg sm:text-2xl font-serif font-black">
                Tổ hợp tháp đôi căn hộ nghỉ dưỡng và bến du thuyền quốc tế An Viên
              </h3>
            </div>
          </div>
        </div>

        {/* 6 Key Specs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tên Dự Án</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">An Viên Residence</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chủ Đầu Tư</span>
            <p className="text-xs sm:text-sm font-black text-[#B45309]">Tập Đoàn An Viên</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vị Trí</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">Bán Đảo An Viên, Nha Trang</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quy Mô</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">2 Tháp 39 Tầng</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sản Phẩm</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">1.200 Căn 5 Sao</p>
          </div>
          <div className="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pháp Lý</span>
            <p className="text-xs sm:text-sm font-black text-emerald-700">Sổ Hồng Lâu Dài</p>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ ĐẮC ĐỊA & LIÊN KẾT VÙNG (LOCATION & MAP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocation = () => (
    <section id="vi-tri" className="py-16 bg-[#0B132B] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] uppercase tracking-wider">
            VỊ TRÍ KIM CƯƠNG & LIÊN KẾT VÀNG
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Compass size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Tọa lạc tại vị trí độc tôn của bán đảo An Viên, liền kề tuyến cáp treo vượt biển Vinpearl và trục đại lộ ven biển Trần Phú hoa lệ.
          </p>
        </div>

        {/* 2-Column: Left 4 Milestone Cards + Right Map Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left 4 Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
              <span className="text-xs font-black text-[#FDE047]">01. CẢNG CÁP TREO VINPEARL</span>
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                Chỉ 2 phút di chuyển sang quần thể vui chơi giải trí hàng đầu Đông Nam Á VinWonders & Sân Golf 18 hố.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
              <span className="text-xs font-black text-[#FDE047]">02. TRUNG TÂM NHA TRANG</span>
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                5 phút lái xe dọc cung đường Trần Phú đến Quảng trường 2/4, Tháp Trầm Hương và các TTTM sầm uất.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
              <span className="text-xs font-black text-[#FDE047]">03. SÂN BAY QUỐC TẾ CAM RANH</span>
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                30 phút di chuyển êm ái trên đại lộ ven biển Nguyễn Tất Thành kết nối thẳng tới sân bay quốc tế.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
              <span className="text-xs font-black text-[#FDE047]">04. BẾN DU THUYỀN AN VIÊN</span>
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                Liền kề ngay dưới chân tòa tháp, thuận tiện đón tiếp du thuyền quốc tế và trải nghiệm lặn biển ngắm san hô.
              </p>
            </div>
          </div>

          {/* Right Map Image */}
          <div className="lg:col-span-6 rounded-md overflow-hidden shadow-2xl border-2 border-amber-500/40 bg-slate-950 p-2">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Nha Trang Location Map"
              onError={handleImgError}
              className="w-full h-80 sm:h-96 object-cover rounded-sm"
            />
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: MẶT BẰNG TỔNG THỂ & THIẾT KẾ QUY HOẠCH (MASTERPLAN)
  // ─────────────────────────────────────────────────────────────────────────
  const renderMasterplan = () => (
    <section id="mat-bang" className="py-16 bg-white text-slate-800 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">
            MẶT BẰNG TỔNG THỂ & THIẾT KẾ
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Layers size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Quy hoạch tổng thể đồng bộ thông minh với 2 khối tháp đón gió vịnh biển, kết nối bằng cầu bộ hành kính và hồ bơi vô cực trên không.
          </p>
        </div>

        {/* Masterplan CAD Image Overhead */}
        <div className="rounded-md overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 relative">
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80"
            alt="Masterplan CAD Topdown"
            onError={handleImgError}
            className="w-full h-[320px] sm:h-[460px] lg:h-[520px] object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-sm text-white text-xs font-bold border border-amber-400/40">
            📐 Sơ đồ phân khu 1/500 đã được phê duyệt
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: DANH MỤC SẢN PHẨM & CĂN HỘ MẪU (PRODUCT TABS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderProducts = () => (
    <section id="san-pham" className="py-16 bg-[#FDFBF7] text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">
            DÒNG SẢN PHẨM CĂN HỘ
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Home size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Khám phá bộ sưu tập căn hộ nghỉ dưỡng biển cao cấp với đa dạng diện tích từ Studio, 1PN, 2PN, 3PN đến Sky Villa Penthouse.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-black uppercase tracking-wider">
          {[
            { id: 'all', label: 'TẤT CẢ' },
            { id: 'studio', label: 'STUDIO 45M²' },
            { id: '1pn', label: '1 PHÒNG NGỦ' },
            { id: '2pn', label: '2 PHÒNG NGỦ' },
            { id: '3pn', label: '3 PHÒNG NGỦ' },
            { id: 'skyvilla', label: 'SKY VILLA PENTHOUSE' },
            { id: 'dualkey', label: 'DUAL KEY' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-sm transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md shadow-amber-900/20 font-black'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map(unit => (
            <div
              key={unit.id}
              onClick={() => handleOpenUnitDetail(unit)}
              className="bg-white rounded-md overflow-hidden border border-slate-200 hover:border-[#D4AF37] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0B132B] text-[#FDE047] text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                    {unit.type}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-extrabold">
                    {unit.area}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#B45309] transition-colors leading-snug line-clamp-2 uppercase">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {unit.description}
                  </p>

                  <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Compass size={13} className="text-amber-600 shrink-0" />
                      <span className="truncate">{unit.view}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield size={13} className="text-amber-600 shrink-0" />
                      <span className="truncate">{unit.handover}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Giá bán ưu đãi:</span>
                  <span className="text-base font-black text-[#B45309]">{unit.price}</span>
                </div>
                <button className="px-3.5 py-1.5 rounded-sm bg-amber-50 text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white font-bold text-xs transition flex items-center gap-1">
                  Xem Chi Tiết <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: HỆ THỐNG TIỆN ÍCH SANG TRỌNG 5 SAO (4-CARD GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenities = () => (
    <section id="tien-ich" className="py-16 bg-white text-slate-800 border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">
            TIỆN ÍCH SANG TRỌNG
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Sparkles size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Hơn 25+ tiện ích đặc quyền 5 sao quốc tế đem đến trải nghiệm nghỉ dưỡng xa hoa, thượng lưu suốt 365 ngày trong năm.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BDS09_AMENITIES.map(item => (
            <div key={item.id} className="bg-slate-50 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-sm bg-black/70 backdrop-blur-md flex items-center justify-center text-sm">
                    {item.icon}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black text-[#B45309] uppercase tracking-wider block">{item.subtitle}</span>
                  <h3 className="text-sm font-black text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed break-words">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: 5 LÝ DO NÊN ĐẦU TƯ TẠI NHA TRANG (5 PILLARS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderInvestReasons = () => (
    <section id="ly-do-dau-tu" className="py-16 bg-[#0B132B] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] uppercase tracking-wider">
            LÝ DO NÊN ĐẦU TƯ TẠI NHA TRANG
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Trophy size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            5 bảo chứng vàng khẳng định tiềm năng tăng giá vượt trội và giá trị khai thác dòng tiền thụ động tại An Viên Residence.
          </p>
        </div>

        {/* 5 Icons Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {BDS09_INVEST_REASONS.map(r => (
            <div key={r.id} className="bg-slate-900/90 p-6 rounded-md border border-amber-500/30 text-center space-y-3 shadow-xl hover:border-[#D4AF37] transition hover:scale-105">
              <span className="text-3xl block">{r.icon}</span>
              <h3 className="text-xs sm:text-sm font-black text-[#FDE047] uppercase tracking-wide leading-snug">
                {r.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: NỘI THẤT CĂN HỘ CAO CẤP (GALLERY 6-GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderInteriorGallery = () => (
    <section id="thu-vien" className="py-16 bg-[#FDFBF7] text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">
            NỘI THẤT CĂN HỘ CAO CẤP
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Eye size={14} className="text-[#D4AF37]" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Không gian sống chuẩn quý tộc được bài trí hoàn mỹ với các thương hiệu nội thất hàng đầu thế giới.
          </p>
        </div>

        {/* 6 Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {BDS09_INTERIOR_GALLERY.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImg(item.img)}
              className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md group cursor-pointer border border-slate-200 hover:border-amber-400"
            >
              <img
                src={item.img}
                alt={item.title}
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 8: FORM ĐĂNG KÝ NHẬN BÁO GIÁ (EXACT MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLeadFormSection = () => (
    <section id="dang-ky" className="py-16 bg-[#F8F6F0] text-slate-800 border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl`}>
        
        {/* Luxury Card Box */}
        <div className="bg-white rounded-md p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 space-y-6 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-black text-[#B45309] uppercase tracking-widest block">
              ★ ĐĂNG KÝ NHẬN TRỌN BỘ TÀI LIỆU DỰ ÁN ★
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900 uppercase">
              BẢNG GIÁ & CHÍNH SÁCH ƯU ĐÃI ĐỢT 1
            </h3>
            <p className="text-xs text-slate-500">
              Vui lòng nhập thông tin để nhận bảng tính lãi suất vay và mặt bằng căn hộ nét 4K qua Zalo.
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs">
            <input
              type="text"
              placeholder="Họ và tên của quý khách..."
              required
              value={leadForm.name}
              onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              placeholder="Số điện thoại / Zalo (*)..."
              required
              value={leadForm.phone}
              onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500 font-bold"
            />
            <input
              type="email"
              placeholder="Địa chỉ Email nhận tài liệu..."
              value={leadForm.email}
              onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500"
            />
            <select
              value={leadForm.unitType}
              onChange={e => setLeadForm({ ...leadForm, unitType: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500 font-medium"
            >
              {activeUnits.map(u => (
                <option key={u.id} value={u.name}>{u.type} ({u.area} - {u.price})</option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#9F1239] hover:from-[#BE123C] hover:to-[#881337] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-sm shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              NHẬN BÁO GIÁ NGAY
            </button>
          </form>

          <p className="text-[10px] text-slate-400">
            🔒 Cam kết bảo mật thông tin khách hàng 100% theo tiêu chuẩn chủ đầu tư.
          </p>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 11. SECTION 9: ĐỐI TÁC PHÁT TRIỂN & BẢO TRỢ TÀI CHÍNH
  // ─────────────────────────────────────────────────────────────────────────
  const renderPartnersBanner = () => (
    <section className="relative py-14 bg-slate-950 text-white overflow-hidden border-t border-amber-500/30">
      <img
        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80"
        alt="Handshake Partners"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[#0B132B]/85" />

      <div className={`relative z-20 ${MAX_W} mx-auto px-4 text-center space-y-6`}>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#FDE047]">
          ★ ĐỐI TÁC PHÁT TRIỂN & BẢO TRỢ TÀI CHÍNH CHIẾN LƯỢC ★
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center max-w-4xl mx-auto pt-2">
          <div className="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 block">Đơn vị phát triển</span>
            <span className="text-sm font-black text-amber-300">AN VIÊN GROUP</span>
          </div>
          <div className="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 block">Ngân hàng bảo lãnh</span>
            <span className="text-sm font-black text-emerald-400">BIDV BANK</span>
          </div>
          <div className="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 block">Tổng thầu xây dựng</span>
            <span className="text-sm font-black text-cyan-300">TAKCO CORP</span>
          </div>
          <div className="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 block">Quản lý vận hành</span>
            <span className="text-sm font-black text-amber-300">SAVILLS 5★</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 12. SUBPAGES: PROPERTY DETAIL, NEWS DETAIL, FULL NEWS
  // ─────────────────────────────────────────────────────────────────────────

  const renderPropertyDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-amber-600">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('products')} className="hover:text-amber-600">Sản phẩm</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedUnit.name}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#B45309] text-white text-xs font-bold mb-2">
              {selectedUnit.type}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">{selectedUnit.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <Compass size={14} className="text-[#B45309]" /> {selectedUnit.view}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold">Giá bán chính thức:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#B45309]">{selectedUnit.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
            <div className="bg-slate-50 p-6 rounded-md border space-y-4">
              <h3 className="text-base font-black text-[#B45309] uppercase">Đặc Điểm & Thông Số Kỹ Thuật</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedUnit.specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
                {selectedUnit.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold text-[#B45309]">
                    <Sparkles size={16} className="text-amber-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-md border border-amber-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase">Nhận Bảng Giá Chi Tiết</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full p-3 rounded-sm border bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full p-3 rounded-sm border bg-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-sm uppercase tracking-wider shadow"
              >
                Đăng Ký Tư Vấn Căn Này
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B132B] text-[#FDE047] border border-amber-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      {/* Lightbox Preview */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)} 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <img src={lightboxImg} alt="Preview" className="max-w-4xl max-h-[85vh] object-contain rounded-sm" />
        </div>
      )}

      {/* LEAD MODAL POPUP */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-md p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-amber-300 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm hover:bg-slate-100 text-slate-500"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-[#B45309] uppercase tracking-wider">ĐĂNG KÝ NHẬN BẢNG GIÁ VIP</span>
              <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900">An Viên Residence Nha Trang</h3>
              <p className="text-xs text-slate-500">Chuyên viên tư vấn senior sẽ gửi bảng tính chiết khấu qua Zalo trong 3 phút.</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên quý khách..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại / Zalo (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none font-bold text-[#B45309]"
              />
              <select
                value={leadForm.unitType}
                onChange={e => setLeadForm({ ...leadForm, unitType: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none font-medium"
              >
                {activeUnits.map(u => (
                  <option key={u.id} value={u.name}>{u.type} ({u.price})</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white font-black rounded-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Gửi Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Pages Rendering */}
      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHero()}
            {renderOverview()}
            {renderLocation()}
            {renderMasterplan()}
            {renderProducts()}
            {renderAmenities()}
            {renderInvestReasons()}
            {renderInteriorGallery()}
            {renderLeadFormSection()}
            {renderPartnersBanner()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverview()}
            {renderLocation()}
            {renderLeadFormSection()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocation()}
            {renderOverview()}
          </main>
        )}

        {currentPage === 'masterplan' && (
          <main>
            {renderMasterplan()}
            {renderProducts()}
            {renderLeadFormSection()}
          </main>
        )}

        {currentPage === 'products' && (
          <main>
            {renderProducts()}
            {renderInteriorGallery()}
            {renderLeadFormSection()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderAmenities()}
            {renderInteriorGallery()}
          </main>
        )}

        {currentPage === 'invest-reasons' && (
          <main>
            {renderInvestReasons()}
            {renderProducts()}
            {renderLeadFormSection()}
          </main>
        )}

        {currentPage === 'gallery' && (
          <main>
            {renderInteriorGallery()}
            {renderAmenities()}
          </main>
        )}

        {currentPage === 'property-detail' && renderPropertyDetail()}

        {currentPage === 'contact' && (
          <main>
            {renderLeadFormSection()}
            {renderPartnersBanner()}
          </main>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-09 (An Viên Yacht & Sky Residence Nha Trang)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
