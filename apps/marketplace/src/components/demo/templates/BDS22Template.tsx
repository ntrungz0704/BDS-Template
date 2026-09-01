'use client';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info,
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare, Sparkle, Video,
  Waves, Sun, Palmtree, Anchor, Compass as DraftingCompass, Coffee
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../../../utils/demo';

interface TemplateProps {
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
}

export interface UnitItem {
  gallery?: string[];
  images?: string[];
  id: string;
  title: string;
  code: string;
  slug: string;
  zone: string; // 'Phân Khu Biệt Thự Biển', 'Tháp Condotel ZoHotels', 'Shophouse Bến Du Thuyền', 'Sky Villa Đỉnh Đồi'
  type: string; // 'Condotel Studio 1PN', 'Condotel 2PN', 'Biệt Thự Song Lập Biển', 'Biệt Thự Đơn Lập Ghềnh Đá', 'Sky Villa Hồ Bơi Vô Cực'
  floor: string;
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number;
  beds: number;
  baths: number;
  view: string;
  direction: string;
  image: string;
  hot?: boolean;
  featured?: boolean;
  commitment: string; // e.g., 'Cam kết lợi nhuận 12%/năm trong 5 năm'
  description: string;
  amenities: string[];
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
// BDS-22 MOCK DATA: HAPPYLAND RESORT & CONDOTEL NHA TRANG (ZOHOTELS)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS22_UNITS: UnitItem[] = [
  {
    id: 'condotel-1pn-zohotels',
    title: 'Condotel Studio 1PN View Trực Diện Vịnh Biển Nha Trang',
    code: 'HLR-C0812',
    slug: 'condotel-studio-1pn-view-vinh-bien-nha-trang',
    zone: 'Tháp Condotel ZoHotels',
    type: 'Condotel Studio 1PN',
    floor: 'Tầng 08',
    price: '2.35 Tỷ VNĐ',
    priceNum: 2.35,
    area: '45 m²',
    areaNum: 45,
    beds: 1,
    baths: 1,
    view: 'Trực diện bãi biển cát trắng & Vịnh Nha Trang',
    direction: 'Hướng Đông',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    hot: true,
    featured: true,
    commitment: 'Cam kết lợi nhuận 10%/năm trong 5 năm đầu',
    description: 'Căn hộ khách sạn bàn giao full nội thất 5 sao chuẩn ZoHotels International, quyền lợi 15 đêm nghỉ dưỡng miễn phí mỗi năm.',
    amenities: ['Full nội thất chuẩn 5 sao', 'Bể bơi tràn bờ tầng mái', 'Dịch vụ buồng phòng 24/7', 'Tặng 15 đêm nghỉ/năm']
  },
  {
    id: 'biet-thu-bien-song-lap',
    title: 'Biệt Thự Biển Song Lập Vườn Dừa HappyLand Oceanfront',
    code: 'HLR-V05',
    slug: 'biet-thu-bien-song-lap-vuon-dua',
    zone: 'Phân Khu Biệt Thự Biển',
    type: 'Biệt Thự Song Lập Biển',
    floor: '2 Tầng + Sân Thượng',
    price: '16.8 Tỷ VNĐ',
    priceNum: 16.8,
    area: '240 m²',
    areaNum: 240,
    beds: 3,
    baths: 4,
    view: 'Cách mép nước biển 30m ngắm hoàng hôn',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    featured: true,
    commitment: 'Chia sẻ doanh thu cho thuê 85/15 trọn đời',
    description: 'Tuyệt tác biệt thự nghỉ dưỡng bước chân chạm cát trắng, hồ bơi điện phân muối riêng biệt và sân tắm nắng ngoài trời.',
    amenities: ['Hồ bơi riêng biệt', 'Sân vườn nhiệt đới', 'Bãi biển riêng tư', 'Sở hữu lâu dài']
  },
  {
    id: 'condotel-2pn-corner',
    title: 'Căn Hộ Condotel Góc 2PN ZoHotels Panorama Sea Suite',
    code: 'HLR-C1802',
    slug: 'condotel-goc-2pn-panorama-sea-suite',
    zone: 'Tháp Condotel ZoHotels',
    type: 'Condotel 2PN',
    floor: 'Tầng 18',
    price: '4.20 Tỷ VNĐ',
    priceNum: 4.2,
    area: '78 m²',
    areaNum: 78,
    beds: 2,
    baths: 2,
    view: 'View 2 mặt biển ngắm trọn vẹn bình minh & hoàng hôn',
    direction: 'Hướng Đông - Đông Nam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    featured: true,
    commitment: 'Cam kết lợi nhuận 12%/năm trong 3 năm',
    description: 'Căn góc 2 mặt thoáng với ban công kính bo tròn ôm trọn đường chân trời biển khơi trong xanh mát lành.',
    amenities: ['Bồn tắm kính view biển', 'Smart Keyless Check-in', 'Bữa sáng buffet chuẩn 5 sao', 'Chiết khấu thanh toán 8%']
  },
  {
    id: 'biet-thu-ghenh-da-vip',
    title: 'Biệt Thự Đơn Lập Ghềnh Đá Tuyệt Tác Độc Bản Cliffside Villa',
    code: 'HLR-CV01',
    slug: 'biet-thu-don-lap-ghenh-da-cliffside-villa',
    zone: 'Phân Khu Biệt Thự Biển',
    type: 'Biệt Thự Đơn Lập Ghềnh Đá',
    floor: '3 Tầng',
    price: '38.0 Tỷ VNĐ',
    priceNum: 38.0,
    area: '420 m²',
    areaNum: 420,
    beds: 5,
    baths: 6,
    view: 'Tọa độ ghềnh đá nhô ra biển 270 độ view vịnh',
    direction: 'Hướng Đông',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: true,
    featured: true,
    commitment: 'Chính sách quản gia riêng 24/7 & Bến đỗ du thuyền',
    description: 'Dinh thự độc bản tọa lạc trên ghềnh đá tự nhiên, sở hữu lối đi riêng xuống bãi tắm san hô và hầm rượu ngầm.',
    amenities: ['Lối đi riêng bãi san hô', 'Bến đỗ du thuyền VIP', 'Hầm rượu vang nhiệt độ chuẩn', 'Quản gia cao cấp']
  },
  {
    id: 'shophouse-marina',
    title: 'Shophouse Bến Du Thuyền Mặt Tiền Đại Lộ Hoa Biển HappyLand',
    code: 'HLR-SH10',
    slug: 'shophouse-ben-du-thuyen-dai-lo-hoa-bien',
    zone: 'Shophouse Bến Du Thuyền',
    type: 'Shophouse Bến Du Thuyền',
    floor: '4 Tầng + Tum',
    price: '14.5 Tỷ VNĐ',
    priceNum: 14.5,
    area: '135 m²',
    areaNum: 135,
    beds: 4,
    baths: 5,
    view: 'Mặt tiền đại lộ du lịch & Bến du thuyền 5 sao',
    direction: 'Hướng Nam',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: false,
    featured: true,
    commitment: 'Hỗ trợ tiền thuê 50 Triệu/tháng trong 12 tháng đầu',
    description: 'Phù hợp khai thác chuỗi nhà hàng hải sản, quán cafe lounge ngắm du thuyền và spa trị liệu cao cấp.',
    amenities: ['Mặt tiền đường 24m', 'Kinh doanh ngay', 'Được phép lưu trú khách sạn', 'Sổ hồng từng căn']
  },
  {
    id: 'sky-villa-dinh-doi',
    title: 'Sky Villa Thông Tầng Đỉnh Đồi Vườn Treo View Vịnh Nha Trang',
    code: 'HLR-SV03',
    slug: 'sky-villa-thong-tang-dinh-doi-vuon-treo',
    zone: 'Sky Villa Đỉnh Đồi',
    type: 'Sky Villa Hồ Bơi Vô Cực',
    floor: 'Tầng 25 - 26',
    price: '22.0 Tỷ VNĐ',
    priceNum: 22.0,
    area: '280 m²',
    areaNum: 280,
    beds: 4,
    baths: 4,
    view: 'View 360 độ từ đỉnh đồi nhìn trọn vịnh Nha Trang',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    featured: true,
    commitment: 'Tặng thẻ hội viên du thuyền & Golf 10 năm',
    description: 'Biệt thự trên không với trần cao 6.5m ngập tràn ánh nắng, hồ bơi đáy kính vươn ra không trung độc nhất vô nhị.',
    amenities: ['Hồ bơi đáy kính trên mây', 'Sân golf mini trên mái', 'Thang máy riêng biệt', 'Nội thất nhập khẩu Ý']
  }
];

export const BDS22_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Ký Kết Hợp Tác Vận Hành Quốc Tế Giữa HappyLand & Tập Đoàn Khách Sạn ZoHotels',
    slug: 'ky-ket-hop-tac-van-hanh-zohotels-nha-trang',
    date: '28/08/2026',
    author: 'Ban Quản Lý HappyLand',
    category: 'Hợp Tác',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    excerpt: 'Thương hiệu quản lý khách sạn danh tiếng ZoHotels chính thức tiếp quản vận hành tháp condotel và chuỗi biệt thự biển tại Nha Trang.',
    content: [
      'ZoHotels mang đến tiêu chuẩn quản lý 5 sao quốc tế và mạng lưới hội viên hơn 12 triệu khách du lịch toàn cầu.',
      'Dự án đảm bảo tỷ lệ lấp đầy phòng luôn đạt trên 85% quanh năm nhờ liên kết tour du thuyền cao cấp.'
    ],
    views: 5780
  },
  {
    id: 2,
    title: 'Khánh Thành Bến Du Thuyền Quốc Tế & Quảng Trường Ánh Sáng Vịnh Biển',
    slug: 'khanh-thanh-ben-du-thuyen-quoc-te-happyland',
    date: '26/08/2026',
    author: 'Sở Du Lịch Khánh Hòa',
    category: 'Sự Kiện',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    excerpt: 'Bến du thuyền sức chứa hơn 50 du thuyền hạng sang chính thức đón những chuyến tàu du lịch đầu tiên cập bến.',
    content: [
      'Quảng trường ánh sáng tổ chức lễ hội âm nhạc biển hàng tuần thu hút hàng ngàn du khách thập phương.'
    ],
    views: 4620
  },
  {
    id: 3,
    title: 'Chính Sách Chia Sẻ Lợi Nhuận 85/15 — Tặng 15 Đêm Nghỉ Dưỡng Thượng Lưu',
    slug: 'chinh-sach-chia-se-loi-nhuan-85-15-happyland',
    date: '24/08/2026',
    author: 'Phòng Đầu Tư BĐS Nghỉ Dưỡng',
    category: 'Chính Sách',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Nhận ngay lợi nhuận cam kết 10-12%/năm được ngân hàng bảo lãnh thanh toán định kỳ mỗi 6 tháng.',
    content: [
      'Chủ sở hữu có thể trao đổi kỳ nghỉ trong hệ thống hơn 150 resort cao cấp liên kết toàn thế giới.'
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
  if (clean === 'tien-ich' || clean === 'amenities') return { page: 'amenities', propSlug: '', artSlug: '' };
  if (clean === 'biet-thu-bien' || clean === 'villas') return { page: 'villas', propSlug: '', artSlug: '' };
  if (clean === 'condotel' || clean === 'condos') return { page: 'condos', propSlug: '', artSlug: '' };
  if (clean === 'chinh-sach' || clean === 'policy') return { page: 'policy', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS22Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
}: TemplateProps) {
  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const activeUnits = useMemo<UnitItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      return projects.map((p: any, idx: number): UnitItem => ({
        id: p.slug || `unit-${idx + 1}`,
        title: p.title || p.name || 'Căn hộ nghỉ dưỡng & biệt thự biển',
        code: `RESORT-${(idx + 1).toString().padStart(2, '0')}`,
        slug: p.slug || `can-ho-${idx + 1}`,
        zone: p.zone || 'Phân Khu Biệt Thự Biển',
        type: p.type || 'Biệt Thự Song Lập Biển',
        floor: p.floor || '2 Tầng',
        price: p.price || (p.priceFrom ? `Từ ${p.priceFrom} Tỷ` : 'Liên hệ'),
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 5.5),
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '150 m²'),
        areaNum: typeof p.area === 'number' ? p.area : 150,
        beds: p.beds || p.bedrooms || 3,
        baths: p.baths || p.bathrooms || 3,
        view: p.view || 'View Trực Diện Biển & Bến Du Thuyền',
        direction: p.direction || 'Đông Nam',
        image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        hot: Boolean(idx === 0),
        featured: Boolean(idx < 4),
        commitment: p.commitment || 'Chia sẻ doanh thu 85/15 - Cam kết lợi nhuận',
        description: p.description || p.desc || 'Thiên đường nghỉ dưỡng biển nhiệt đới chuẩn quốc tế.',
        amenities: Array.isArray(p.amenities) ? p.amenities : ['Hồ bơi vô cực', 'Bến du thuyền', 'Spa 5 sao'],
      }));
    }
    return BDS22_UNITS;
  }, [projects]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      return posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức bất động sản nghỉ dưỡng',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Thị Trường',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tin tức thị trường BĐS mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
    }
    return BDS22_NEWS;
  }, [posts, company]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeUnits.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeUnits[0] || BDS22_UNITS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS22_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableZones = useMemo(() => {
    const set = new Set(activeUnits.map(p => p.zone).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [activeUnits]);

  const availableTypes = useMemo(() => {
    const set = new Set(activeUnits.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [activeUnits]);

  // Filter States
  const [filterZone, setFilterZone] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Forms
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', zoneInterested: 'Phân Khu Biệt Thự Biển' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-22';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS22_UNITS.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = BDS22_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'overview') urlSlug = 'tong-quan';
    else if (page === 'location') urlSlug = 'vi-tri';
    else if (page === 'amenities') urlSlug = 'tien-ich';
    else if (page === 'villas') urlSlug = 'biet-thu-bien';
    else if (page === 'condos') urlSlug = 'condotel';
    else if (page === 'policy') urlSlug = 'chinh-sach';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenUnit = (unit: UnitItem) => {
    setSelectedUnit(unit);
    navigate('property-detail', unit.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại nhận bảng giá resort!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn từ ${bookingForm.name} (${bookingForm.phone}). Giám đốc kinh doanh HappyLand Resort sẽ liên hệ trong 5 phút!`);
    setBookingForm({ name: '', phone: '', email: '', zoneInterested: 'Phân Khu Biệt Thự Biển' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredUnits = useMemo(() => {
    return activeUnits.filter(p => {
      // Zone
      if (filterZone !== 'all' && p.zone !== filterZone) return false;

      // Type matching: fuzzy
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }

      // Price matching
      if (filterPrice === 'under-5' && p.priceNum >= 5) return false;
      if (filterPrice === '5-20' && (p.priceNum < 5 || p.priceNum > 20)) return false;
      if (filterPrice === 'above-20' && p.priceNum <= 20) return false;

      return true;
    });
  }, [filterZone, filterType, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'villas' && currentPage !== 'condos') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredUnits.length;
    showToast(`🔍 Tìm thấy ${count} sản phẩm nghỉ dưỡng phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('bang-hang-nghi-duong');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (TROPICAL OCEAN TEAL & CORAL ORANGE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0E7490] text-white shadow-xl border-b border-cyan-300/30">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white font-black text-base sm:text-xl shadow shrink-0">
            🌴
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-serif font-black tracking-wider text-white block leading-none truncate">
              {company?.name || 'TEMPLATESBDS'}
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-cyan-200 uppercase tracking-widest block mt-0.5 truncate">
              TỔ HỢP RESORT & CONDOTEL QUỐC TẾ ZOHOTELS
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('overview')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'overview' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Tổng Quan</button>
          <button onClick={() => navigate('location')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'location' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Vị Trí</button>
          <button onClick={() => navigate('amenities')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'amenities' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Tiện Ích</button>
          <button onClick={() => navigate('villas')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'villas' || (currentPage === 'property-detail' && selectedUnit.zone.includes('Biệt Thự')) ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Biệt Thự Biển</button>
          <button onClick={() => navigate('condos')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'condos' || (currentPage === 'property-detail' && selectedUnit.zone.includes('Condotel')) ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Condotel</button>
          <button onClick={() => navigate('policy')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'policy' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Chính Sách</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'bg-[#155E75] text-amber-300 font-extrabold' : 'hover:text-amber-300'}`}>Liên Hệ</button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('form-dat-cho');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-block px-4 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Nhận Bảng Giá Gốc
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 rounded-md shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#155E75] border-t border-cyan-300/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Trang Chủ</button>
            <button onClick={() => navigate('overview')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Vị Trí</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Tiện Ích</button>
            <button onClick={() => navigate('villas')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Biệt Thự Biển</button>
            <button onClick={() => navigate('condos')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Condotel</button>
            <button onClick={() => navigate('policy')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Chính Sách</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#0E7490] hover:text-amber-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER FLYCAM RESORT MẶT BIỂN & BẾN DU THUYỀN
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden border-b border-cyan-300/30">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
        alt="HappyLand Nha Trang Flycam"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E7490] via-black/40 to-transparent" />

      <div className="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 bg-[#0E7490]/90 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-widest">
          THIÊN ĐƯỜNG NGHỈ DƯỠNG MẶT BIỂN VỊNH NHA TRANG
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-2xl">
          HAPPYLAND RESORT & CONDOTEL
        </h1>
        <p className="text-xs sm:text-base text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed">
          Tổ hợp nghỉ dưỡng 5 sao quốc tế vận hành bởi ZoHotels — Cam kết chia sẻ lợi nhuận 85/15 & 15 đêm nghỉ dưỡng thượng lưu mỗi năm.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('bang-hang-nghi-duong');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#F97316] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            Khám Phá Bảng Hàng ›
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('form-dat-cho');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 cursor-pointer"
          >
            Đăng Ký Tham Quan 3D
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TỔNG QUAN HAPPYLAND RESORT (OVERVIEW)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="tong-quan" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-[#F97316] tracking-widest block">
              QUẦN THỂ NGHỈ DƯỠNG ĐỈNH CAO
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0E7490] leading-tight">
              HappyLand Resort — Viên Ngọc Quý Của Vịnh Biển Nha Trang
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trải dài trên 1.5km đường bờ biển tuyệt đẹp với bãi cát trắng mịn màng và làn nước biển trong vắt nhìn thấy đáy san hô, HappyLand Resort là điểm đến nghỉ dưỡng số 1 dành cho du khách quốc tế.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dự án tích hợp hơn 60 tiện ích giải trí biển, bến du thuyền quốc tế và chuỗi nhà hàng ẩm thực Michelin bên bờ sóng.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">TỔNG DIỆN TÍCH</span>
                <strong className="text-[#0E7490] text-sm font-black">28.5 Hecta</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">QUẢN LÝ VẬN HÀNH</span>
                <strong className="text-[#0E7490] text-sm font-black">ZoHotels 5★</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">HÌNH THỨC SỞ HỮU</span>
                <strong className="text-[#0E7490] text-sm font-black">Sổ Hồng Lâu Dài</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
              alt="Hồ bơi resort"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ CHIẾN LƯỢC MẶT BIỂN (LOCATION)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="vi-tri" className="py-16 bg-[#0E7490] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Left */}
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-cyan-200/40 shadow-2xl bg-slate-900">
            <iframe
              src="https://maps.google.com/maps?q=Bai+Dai+Cam+Ranh+Nha+Trang&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
              TỌA ĐỘ VÀNG NGHỈ DƯỠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
              MẶT TIỀN ĐẠI LỘ NGUYỄN TẤT THÀNH & BÃI DÀI NHA TRANG
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Vị trí độc tôn kết nối thẳng Sân bay Quốc tế Cam Ranh và trung tâm thành phố biển Nha Trang chỉ trong ít phút di chuyển:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">📍 <strong>Sân bay Quốc tế Cam Ranh:</strong> Cách 10 phút di chuyển (9 km)</li>
              <li className="flex items-center gap-2">📍 <strong>Trung tâm TP. Nha Trang / Tháp Trầm Hương:</strong> Cách 20 phút (18 km)</li>
              <li className="flex items-center gap-2">📍 <strong>Sân Golf KN Golf Links 27 lỗ:</strong> Cách 5 phút (4 km)</li>
              <li className="flex items-center gap-2">📍 <strong>Cảng Quốc tế Vinpearl & Cáp treo biển:</strong> Cách 15 phút</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: TIỆN ÍCH NGHỈ DƯỠNG 5 SAO (AMENITIES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenitiesSection = () => (
    <section id="tien-ich" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-[#F97316] tracking-widest">
            HỆ THỐNG ĐẶC QUYỀN THƯỢNG LƯU
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0E7490] uppercase">
            CHUỖI TIỆN ÍCH NGHỈ DƯỠNG CHUẨN QUỐC TẾ
          </h2>
          <p className="text-xs text-slate-600">
            Tận hưởng kỳ nghỉ dưỡng thiên đường với dịch vụ quản gia cao cấp và bến du thuyền 5 sao riêng biệt.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-xs">
          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0E7490] text-amber-300 flex items-center justify-center text-xl font-bold">⚓</div>
            <strong className="block text-slate-900 font-bold">Bến Du Thuyền 5★</strong>
            <span className="text-[10px] text-slate-500">Sức chứa 50 du thuyền</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0E7490] text-amber-300 flex items-center justify-center text-xl font-bold">🏊</div>
            <strong className="block text-slate-900 font-bold">Bể Bơi Vô Cực</strong>
            <span className="text-[10px] text-slate-500">Tràn biển 2.500m²</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0E7490] text-amber-300 flex items-center justify-center text-xl font-bold">🍹</div>
            <strong className="block text-slate-900 font-bold">Beach Club & Bar</strong>
            <span className="text-[10px] text-slate-500">Âm nhạc biển sôi động</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0E7490] text-amber-300 flex items-center justify-center text-xl font-bold">💆</div>
            <strong className="block text-slate-900 font-bold">Spa Khoáng Nóng</strong>
            <span className="text-[10px] text-slate-500">Trị liệu Onsen Nhật Bản</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0E7490] text-amber-300 flex items-center justify-center text-xl font-bold">🍽</div>
            <strong className="block text-slate-900 font-bold">Nhà Hàng Michelin</strong>
            <span className="text-[10px] text-slate-500">Ẩm thực Á - Âu thượng hạng</span>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: BẢNG HÀNG NGHỈ DƯỠNG (CONDOTEL & BIỆT THỰ BIỂN)
  // ─────────────────────────────────────────────────────────────────────────
  const renderInventorySection = () => (
    <section id="bang-hang-nghi-duong" className="py-16 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0E7490] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#F97316] tracking-widest block">
              BẢNG HÀNG NGOẠI GIAO TRỰC TIẾP CHỦ ĐẦU TƯ
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              DANH SÁCH BĐS NGHỈ DƯỠNG ({filteredUnits.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterZone}
              onChange={e => setFilterZone(e.target.value)}
              className="bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Phân Khu (Tất cả)</option>
              {availableZones.filter(z => z !== 'all').map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Loại Hình (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-[#0E7490] hover:bg-[#155E75] text-white font-bold uppercase shadow cursor-pointer"
            >
              Lọc
            </button>
          </div>
        </div>

        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy sản phẩm nào khớp với tiêu chí lọc.</p>
            <button
              onClick={() => {
                setFilterZone('all');
                setFilterType('all');
                setFilterPrice('all');
              }}
              className="px-5 py-2 bg-[#F97316] text-white font-bold text-xs uppercase shadow"
            >
              Xem Toàn Bộ Bảng Hàng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map(unit => (
              <div 
                key={unit.id}
                className="bg-white text-slate-900 border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden font-medium"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0E7490] text-amber-300 text-[10px] font-black uppercase">
                    {unit.code} • {unit.zone}
                  </span>
                  {unit.hot && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">
                      HOT
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 
                    onClick={() => handleOpenUnit(unit)}
                    className="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0E7490] cursor-pointer min-h-[34px]"
                  >
                    {unit.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                    <div>📐 Diện tích: <strong>{unit.area}</strong></div>
                    <div>🏢 Tầng: <strong>{unit.floor}</strong></div>
                    <div>🧭 Hướng: <strong>{unit.direction}</strong></div>
                    <div>🛏 Phòng: <strong>{unit.beds} PN • {unit.baths} WC</strong></div>
                  </div>

                  <p className="text-[11px] text-cyan-800 font-medium truncate">
                    🌊 {unit.view}
                  </p>

                  <p className="text-[10.5px] font-bold text-amber-700 bg-amber-50 p-1.5 border border-amber-200">
                    💰 {unit.commitment}
                  </p>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-sm font-black text-[#E11D48]">{unit.price}</span>
                    <button
                      onClick={() => handleOpenUnit(unit)}
                      className="px-3 py-1.5 bg-[#0E7490] hover:bg-[#155E75] text-amber-300 font-bold text-xs uppercase transition cursor-pointer"
                    >
                      Chi Tiết ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: CHÍNH SÁCH CAM KẾT LỢI NHUẬN (POLICY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPolicySection = () => (
    <section id="chinh-sach" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-[#F97316] tracking-widest">
            GIẢI PHÁP ĐẦU TƯ AN TOÀN & SINH LỜI BỀN VỮNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0E7490] uppercase">
            CHÍNH SÁCH BÁN HÀNG & CAM KẾT LỢI NHUẬN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-3">
            <span className="text-2xl font-black text-[#0E7490] block">01</span>
            <h3 className="font-bold text-sm text-slate-900 uppercase">Cam Kết Lợi Nhuận 10-12%/Năm</h3>
            <p className="text-slate-600 leading-relaxed">
              Chủ đầu tư và ngân hàng bảo lãnh chi trả lợi nhuận cố định định kỳ 6 tháng/lần trong 3-5 năm đầu tiên.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-3">
            <span className="text-2xl font-black text-[#F97316] block">02</span>
            <h3 className="font-bold text-sm text-slate-900 uppercase">Chia Sẻ Doanh Thu 85/15</h3>
            <p className="text-slate-600 leading-relaxed">
              Sau thời gian cam kết, chủ sở hữu nhận 85% lợi nhuận sau thuế từ chương trình cho thuê vận hành bởi ZoHotels.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-3">
            <span className="text-2xl font-black text-[#0E7490] block">03</span>
            <h3 className="font-bold text-sm text-slate-900 uppercase">15 Đêm Nghỉ Dưỡng Miễn Phí</h3>
            <p className="text-slate-600 leading-relaxed">
              Tận hưởng kỳ nghỉ 5 sao miễn phí cho cả gia đình hoặc trao đổi kỳ nghỉ trên hệ thống hơn 150 resort quốc tế.
            </p>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: TIN TỨC HAPPYLAND
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#0E7490] pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-[#0E7490]">
            TIN TỨC {company?.name || 'TEMPLATESBDS'}
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#F97316] hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeNews.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#F97316] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0E7490] cursor-pointer"
                >
                  {n.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: FORM ĐẶT CHỖ & TƯ VẤN ĐẦU TƯ
  // ─────────────────────────────────────────────────────────────────────────
  const renderBookingSection = () => (
    <section id="form-dat-cho" className="py-16 bg-[#0E7490] text-white text-center">
      <div className={`${MAX_W} mx-auto px-4 max-w-xl space-y-6`}>
        
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
            SUẤT NGOẠI GIAO ĐỢT 1
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
            ĐĂNG KÝ NHẬN BẢNG GIÁ GỐC CĐT
          </h2>
          <p className="text-xs text-slate-200">
            Tặng ngay chuyến du lịch trải nghiệm 3 ngày 2 đêm tại Nha Trang và vé máy bay khứ hồi cho 2 người khi đặt cọc thành công!
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="bg-white text-slate-900 p-6 shadow-2xl text-left text-xs space-y-3">
          <div>
            <label className="block font-bold mb-1">Họ và tên quý khách *</label>
            <input
              type="text"
              required
              value={bookingForm.name}
              onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={bookingForm.phone}
              onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
              placeholder="0919 006 030"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Phân khu quan tâm</label>
            <select
              value={bookingForm.zoneInterested}
              onChange={e => setBookingForm({ ...bookingForm, zoneInterested: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none font-bold"
            >
              <option className="text-slate-900 bg-white font-medium" value="Phân Khu Biệt Thự Biển">Phân Khu Biệt Thự Biển (Sở Hữu Lâu Dài)</option>
              <option className="text-slate-900 bg-white font-medium" value="Tháp Condotel ZoHotels">Tháp Condotel ZoHotels (Từ 2.35 Tỷ)</option>
              <option className="text-slate-900 bg-white font-medium" value="Shophouse Bến Du Thuyền">Shophouse Bến Du Thuyền (Kinh Doanh Ngay)</option>
              <option className="text-slate-900 bg-white font-medium" value="Sky Villa Đỉnh Đồi">Sky Villa Đỉnh Đồi (View 360 Độ Vịnh)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F97316] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
          >
            Gửi Yêu Cầu Nhận Bảng Giá Gốc CĐT
          </button>
        </form>

      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0E7490] selection:text-white">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0E7490] text-white border border-amber-400 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderOverviewSection()}
            {renderLocationSection()}
            {renderAmenitiesSection()}
            {renderInventorySection()}
            {renderPolicySection()}
            {renderNewsSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverviewSection()}
            {renderAmenitiesSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocationSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderAmenitiesSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'villas' && (
          <main>
            {renderInventorySection()}
            {renderPolicySection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'condos' && (
          <main>
            {renderInventorySection()}
            {renderPolicySection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'policy' && (
          <main>
            {renderPolicySection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderLocationSection()}
            {renderBookingSection()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('villas')} className="text-xs font-bold text-[#0E7490] hover:underline">
                ‹ Quay lại bảng hàng nghỉ dưỡng
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0E7490] uppercase">
                {selectedUnit.title} ({selectedUnit.code})
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Giá bán: {selectedUnit.price} — Phân khu: {selectedUnit.zone} — Diện tích: {selectedUnit.area}
              </p>
              <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
              <div className="p-4 bg-[#0E7490] text-white space-y-2">
                <h4 className="font-bold text-xs uppercase text-amber-300">Đặc quyền nghỉ dưỡng & tiện ích bàn giao:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedUnit.amenities.map((a, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">🌴 {a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0E7490] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-[#0E7490] uppercase">
                {selectedArticle.title}
              </h1>
              <div className="text-[11px] text-slate-400 border-b pb-2">
                🕒 {selectedArticle.date} • Tác giả: {selectedArticle.author} • {selectedArticle.views} lượt xem
              </div>
              <img src={selectedArticle.image} alt="" className="w-full h-80 object-cover border" />
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-22 (HappyLand Resort & Condotel Nha Trang — ZoHotels International)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
