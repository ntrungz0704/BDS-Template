'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../utils/cmsSectionHelper';
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
  Cpu, Smartphone, Wifi, Lock, Zap, ShieldCheck, Waves, Coffee, Dumbbell,
  Compass as DraftingCompass
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

export interface UnitItem {
  gallery?: string[];
  images?: string[];
  id: string;
  title: string;
  code: string;
  slug: string;
  tower: string; // 'Tòa S1 - Venus', 'Tòa S2 - Mars', 'Tòa S4 - Mercury', 'Tòa S7 - Jupiter', 'Tòa S9 - King'
  type: string; // '1 Phòng Ngủ', '2 Phòng Ngủ', '3 Phòng Ngủ', 'Penthouse Dát Vàng', 'Sky Villa'
  floor: string;
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number; // in m2
  beds: number;
  baths: number;
  view: string;
  direction: string;
  image: string;
  hot?: boolean;
  featured?: boolean;
  description: string;
  smartFeatures: string[];
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
// BDS-19 MOCK DATA: {company?.name || 'TEMPLATESBDS'} (CĂN HỘ 4.0 DÁT VÀNG BÊN SÔNG QUẬN 7)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS19_UNITS: UnitItem[] = [
  {
    id: 'can-1pn-s1-venus',
    title: 'Căn Hộ Thông Minh 1 Phòng Ngủ Tòa S1 Venus View Sông Cả Cấm',
    code: 'S1-0812',
    slug: 'can-ho-1-phong-ngu-s1-venus-view-song',
    tower: 'Tòa S1 - Venus',
    type: '1 Phòng Ngủ',
    floor: 'Tầng 12',
    price: '3.45 Tỷ VNĐ',
    priceNum: 3.45,
    area: '52 m²',
    areaNum: 52,
    beds: 1,
    baths: 1,
    view: 'Trực diện sông Cả Cấm & Công viên ven sông',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn hộ ứng dụng công nghệ Smart Home 4.0 toàn diện, thiết bị vệ sinh Kohler dát vàng, kính Low-E tràn viền chống tia cực tím.',
    smartFeatures: ['Khóa cửa nhận diện khuôn mặt FaceID', 'Điều khiển SmartHome qua Sunshine App', 'Kính Low-E 3 lớp cách nhiệt', 'Hệ thống lọc khí tươi chuyên dụng']
  },
  {
    id: 'can-2pn-s4-mercury',
    title: 'Căn Hộ Góc 2 Phòng Ngủ Tòa S4 Mercury View Toàn Cảnh Phú Mỹ Hưng',
    code: 'S4-1806',
    slug: 'can-ho-goc-2-phong-ngu-s4-mercury-view-pmh',
    tower: 'Tòa S4 - Mercury',
    type: '2 Phòng Ngủ',
    floor: 'Tầng 18',
    price: '4.85 Tỷ VNĐ',
    priceNum: 4.85,
    area: '76 m²',
    areaNum: 76,
    beds: 2,
    baths: 2,
    view: 'View Panorama Phú Mỹ Hưng & Crescent Mall',
    direction: 'Hướng Nam - Đông Nam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn góc 2 mặt thoáng ngập tràn ánh sáng tự nhiên, phòng khách ban công kính nối dài tạo cảm giác không gian mở vô tận.',
    smartFeatures: ['Bãi đỗ xe thông minh tự định vị chỗ', 'Hệ thống rèm & đèn tự động theo ngữ cảnh', 'Nội thất nhập khẩu từ Ý', 'Tặng gói Smarthome trị giá 100Tr']
  },
  {
    id: 'can-3pn-s7-jupiter',
    title: 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Tòa S7 Jupiter Suite VIP',
    code: 'S7-2802',
    slug: 'can-ho-3-phong-ngu-s7-jupiter-suite-vip',
    tower: 'Tòa S7 - Jupiter',
    type: '3 Phòng Ngủ',
    floor: 'Tầng 28',
    price: '6.90 Tỷ VNĐ',
    priceNum: 6.9,
    area: '105 m²',
    areaNum: 105,
    beds: 3,
    baths: 2,
    view: 'View sông Sài Gòn & Tháp Bitexco Quận 1',
    direction: 'Hướng Đông Bắc',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Không gian sống xứng tầm chủ nhân danh giá, phòng ngủ Master có bồn tắm kính nhìn ra đường chân trời thành phố lung linh về đêm.',
    smartFeatures: ['Thang máy nhận diện thẻ VIP & FaceID', 'Bình nước nóng trung tâm thái dương năng', 'Chuông hình kỹ thuật số liên lạc sảnh', 'Bảo hiểm căn hộ 5 năm']
  },
  {
    id: 'penthouse-s9-king',
    title: 'Penthouse Duplex Dát Vàng Đỉnh Tháp S9 King View Triệu Đô',
    code: 'S9-PH01',
    slug: 'penthouse-duplex-dat-vang-dinh-thap-s9-king',
    tower: 'Tòa S9 - King',
    type: 'Penthouse Dát Vàng',
    floor: 'Tầng 36 - 37',
    price: '18.5 Tỷ VNĐ',
    priceNum: 18.5,
    area: '235 m²',
    areaNum: 235,
    beds: 4,
    baths: 4,
    view: 'View 360 độ sông Sài Gòn & Trung tâm tài chính Q1',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Tuyệt phẩm độc bản trên đỉnh mây trời với sân vườn Sky Garden riêng biệt, bể bơi vô cực và nội thất dát vàng thủ công.',
    smartFeatures: ['Hồ bơi Sky Pool riêng biệt', 'Sảnh thang máy riêng cho gia chủ', 'Hệ thống an ninh 4 lớp tích hợp AI', 'Dịch vụ quản gia cao cấp']
  },
  {
    id: 'can-2pn-s2-mars',
    title: 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Tòa S2 Mars',
    code: 'S2-1405',
    slug: 'can-ho-2-phong-ngu-s2-mars',
    tower: 'Tòa S2 - Mars',
    type: '2 Phòng Ngủ',
    floor: 'Tầng 14',
    price: '4.35 Tỷ VNĐ',
    priceNum: 4.35,
    area: '69 m²',
    areaNum: 69,
    beds: 2,
    baths: 2,
    view: 'Nội khu thác nước tràn nghệ thuật & Hồ bơi bốn mùa',
    direction: 'Hướng Tây Nam',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Thiết kế vuông vắn tối đa diện tích sử dụng, tầm nhìn xanh mát hướng hồ cảnh quan và vườn thiền thư giãn.',
    smartFeatures: ['Công nghệ Smart Lock 5 trong 1', 'Điều hòa âm trần Daikin Inverter', 'Chiết khấu thanh toán sớm 10%', 'Hỗ trợ lãi suất 0% trong 24 tháng']
  },
  {
    id: 'sky-villa-s1-venus',
    title: 'Sky Villa Thông Tầng View Sông Sài Gòn Đẳng Cấp Thượng Lưu',
    code: 'S1-SV02',
    slug: 'sky-villa-thong-tang-view-song-sai-gon',
    tower: 'Tòa S1 - Venus',
    type: 'Sky Villa',
    floor: 'Tầng 32 - 33',
    price: '26.0 Tỷ VNĐ',
    priceNum: 26.0,
    area: '310 m²',
    areaNum: 310,
    beds: 5,
    baths: 5,
    view: 'Trọn vẹn 3 mặt sông Sài Gòn & Cầu Phú Mỹ',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Biệt thự trên không với trần cao 7m, phòng chiếu phim gia đình, hầm rượu cá nhân và sân tắm nắng phong cách resort.',
    smartFeatures: ['Bãi đỗ trực thăng trên nóc tòa nhà', 'Nội thất may đo thủ công Versace Home', 'Hệ thống lọc nước uống tại vòi chuẩn Mỹ', 'Đặc quyền câu lạc bộ du thuyền VIP']
  }
];

export const BDS19_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Sunshine Group Được Vinh Danh Là Nhà Phát Triển Bất Động Sản Công Nghệ Tốt Nhất 2026',
    slug: 'sunshine-group-nha-phat-trien-bds-cong-nghe-tot-nhat',
    date: '28/08/2026',
    author: 'Vietnam Property Awards',
    category: 'Giải Thưởng',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Hệ sinh thái Smart Living 4.0 và giải pháp thanh toán số Sunshine Pay tạo bước đột phá trong quản lý vận hành đô thị thông minh.',
    content: [
      'Sunshine City Saigon là dự án tiên phong áp dụng công nghệ vạn vật kết nối IoT và nhận diện khuôn mặt FaceID tại TP.HCM.',
      'Dự án nhận được sự đánh giá cao từ hội đồng giám khảo quốc tế về giải pháp kiến trúc kính Low-E mạ vàng phủ kín toàn bộ mặt ngoài.'
    ],
    views: 6120
  },
  {
    id: 2,
    title: 'Chính Thức Bàn Giao Tháp S1 Venus & Cất Nóc Tháp S4 Mercury Vượt Tiến Độ',
    slug: 'ban-giao-thap-s1-venus-cat-noc-thap-s4-mercury',
    date: '26/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiến Độ',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Hơn 400 cư dân đầu tiên chính thức nhận chìa khóa tổ ấm và tận hưởng chuỗi tiện ích 5 sao vận hành thực tế.',
    content: [
      'Công trường thi công 3 ca liên tục với sự giám sát chặt chẽ từ tổng thầu SCG và đơn vị tư vấn giám sát quốc tế Apave.'
    ],
    views: 4780
  },
  {
    id: 3,
    title: 'Trải Nghiệm Hệ Sinh Thái Sunshine: Thẻ Cư Dân Đa Năng & Mua Sắm Không Tiền Mặt',
    slug: 'trai-nghiem-he-sinh-thai-sunshine-4-0',
    date: '24/08/2026',
    author: 'Công Nghệ Sunshine Tech',
    category: 'Công Nghệ 4.0',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Chỉ với một chiếc smartphone, cư dân có thể điều khiển toàn bộ thiết bị trong nhà, gọi thang máy, đặt chỗ tiện ích và thanh toán hóa đơn.',
    content: [
      'Ứng dụng Sunshine App kết nối toàn diện hơn 50 tiện ích và dịch vụ ẩm thực, giáo dục Sunshine School, chăm sóc y tế tại gia.'
    ],
    views: 5310
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
  if (clean === 'mat-bang' || clean === 'floor-plans') return { page: 'floor-plans', propSlug: '', artSlug: '' };
  if (clean === 'can-ho-40' || clean === 'smart-living') return { page: 'smart-living', propSlug: '', artSlug: '' };
  if (clean === 'he-sinh-thai' || clean === 'ecosystem') return { page: 'ecosystem', propSlug: '', artSlug: '' };
  if (clean === 'bang-gia' || clean === 'pricing') return { page: 'pricing', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS19Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
, pageContent }: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS19_UNITS.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS19_UNITS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS19_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS19_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableTowers = useMemo(() => {
    const set = new Set(BDS19_UNITS.map(p => p.tower).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableTypes = useMemo(() => {
    const set = new Set(BDS19_UNITS.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterTower, setFilterTower] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Forms
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', email: '', towerInterested: 'Tòa S1 - Venus' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-19';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS19_UNITS.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = BDS19_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'floor-plans') urlSlug = 'mat-bang';
    else if (page === 'smart-living') urlSlug = 'can-ho-40';
    else if (page === 'ecosystem') urlSlug = 'he-sinh-thai';
    else if (page === 'pricing') urlSlug = 'bang-gia';
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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại nhận bảng giá ngoại giao!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu nhận bảng giá từ ${inquiryForm.name} (${inquiryForm.phone}). Giám đốc kinh doanh Sunshine City Saigon sẽ liên hệ ngay!`);
    setInquiryForm({ name: '', phone: '', email: '', towerInterested: 'Tòa S1 - Venus' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredUnits = useMemo(() => {
    return BDS19_UNITS.filter(p => {
      // Tower
      if (filterTower !== 'all' && p.tower !== filterTower) return false;

      // Type matching: fuzzy
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }

      // Price matching
      if (filterPrice === 'under-4' && p.priceNum >= 4) return false;
      if (filterPrice === '4-8' && (p.priceNum < 4 || p.priceNum > 8)) return false;
      if (filterPrice === 'above-8' && p.priceNum <= 8) return false;

      return true;
    });
  }, [filterTower, filterType, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'floor-plans') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredUnits.length;
    showToast(`🔍 Tìm thấy ${count} căn hộ thông minh 4.0 phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-can-ho');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & STICKY ROYAL NAV (NAVY BLUE & GOLD ACCENTS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0F1E36] text-white shadow-xl border-b border-amber-500/30">
      
      {/* Top Banner Center Gold Logo */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Left Brand */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E5B869] via-[#D4AF37] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-base sm:text-xl shadow-md border border-amber-200 shrink-0">
            ☀️
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-serif font-black tracking-wider text-amber-300 block leading-none truncate">
              SUNSHINE CITY <span className="text-white">SAIGON</span>
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-amber-200/80 uppercase tracking-widest block mt-0.5 truncate">
              CĂN HỘ NGHỈ DƯỠNG THÔNG MINH 4.0 — QUẬN 7
            </span>
          </div>
        </div>

        {/* Center/Right Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('overview')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'overview' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Tổng Quan</button>
          <button onClick={() => navigate('location')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'location' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Vị Trí</button>
          <button onClick={() => navigate('amenities')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'amenities' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Tiện Ích</button>
          <button onClick={() => navigate('floor-plans')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'floor-plans' || currentPage === 'property-detail' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Mặt Bằng</button>
          <button onClick={() => navigate('smart-living')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'smart-living' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Căn Hộ 4.0</button>
          <button onClick={() => navigate('ecosystem')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'ecosystem' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Hệ Sinh Thái</button>
          <button onClick={() => navigate('pricing')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'pricing' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Bảng Giá</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'text-amber-300 font-extrabold bg-[#14294D]' : 'hover:text-amber-300'}`}>Liên Hệ</button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('dang-ky-bang-gia');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Nhận Bảng Giá 4.0
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
        <div className="xl:hidden bg-[#0A1324] border-t border-amber-500/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Trang Chủ</button>
            <button onClick={() => navigate('overview')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Vị Trí</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tiện Ích</button>
            <button onClick={() => navigate('floor-plans')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Mặt Bằng</button>
            <button onClick={() => navigate('smart-living')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Căn Hộ 4.0</button>
            <button onClick={() => navigate('ecosystem')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Hệ Sinh Thái</button>
            <button onClick={() => navigate('pricing')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Bảng Giá</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER FLYCAM QUẦN THỂ 9 TÒA THÁP KÍNH MẠ VÀNG
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden border-b border-amber-500/30">
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
        alt="Sunshine City Saigon Flycam"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-black/40 to-transparent" />

      <div className="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-2xl shadow-2xl border-2 border-amber-200">
          ☀️
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-2xl">
          {company?.name || 'TEMPLATESBDS'}
        </h1>
        <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-medium">
          Nơi hội tụ tinh hoa đẳng cấp thượng lưu — Quần thể 9 tòa tháp căn hộ thông minh 4.0 dát vàng bên sông Cả Cấm Quận 7.
        </p>

        {/* 2 Circle Play Buttons */}
        <div className="pt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => setVideoModalOpen(true)}
            className="w-14 h-14 bg-gradient-to-tr from-[#E5B869] to-[#D4AF37] text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer"
            title="Xem Video TVC 360"
          >
            <Play size={20} className="fill-slate-950 ml-0.5" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('danh-sach-can-ho');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-14 h-14 bg-[#14294D] border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer"
            title="Khám phá bảng hàng"
          >
            <Building2 size={20} />
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TỔNG QUAN DỰ ÁN (OVERVIEW BOX)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="tong-quan" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0F1E36]">
            TỔNG QUAN <span className="text-[#D4AF37]">{company?.name || 'TEMPLATESBDS'}</span>
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="bg-[#0F1E36] text-white p-6 sm:p-10 border border-amber-500/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border-2 border-amber-300/40 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                alt="Phối cảnh Sunshine City Saigon"
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
                GIỚI THIỆU DỰ ÁN
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tọa lạc tại vị trí vàng trung tâm Quận 7, liền kề khu đô thị kiểu mẫu Phú Mỹ Hưng, Sunshine City Saigon là tổ hợp căn hộ cao cấp chuẩn khách sạn 5 sao ứng dụng công nghệ 4.0 đầu tiên tại TP.HCM.
              </p>
              
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
                <div className="bg-[#14294D] p-3 border border-amber-500/20">
                  <span className="text-slate-400 block text-[10px]">TỔNG DIỆN TÍCH</span>
                  <strong className="text-amber-300 text-sm font-black">9.9 Hecta</strong>
                </div>
                <div className="bg-[#14294D] p-3 border border-amber-500/20">
                  <span className="text-slate-400 block text-[10px]">QUY MÔ DỰ ÁN</span>
                  <strong className="text-amber-300 text-sm font-black">9 Tháp (26 - 38 Tầng)</strong>
                </div>
                <div className="bg-[#14294D] p-3 border border-amber-500/20">
                  <span className="text-slate-400 block text-[10px]">SỐ LƯỢNG CĂN HỘ</span>
                  <strong className="text-amber-300 text-sm font-black">3.748 Căn Hộ VIP</strong>
                </div>
                <div className="bg-[#14294D] p-3 border border-amber-500/20">
                  <span className="text-slate-400 block text-[10px]">HÌNH THỨC SỞ HỮU</span>
                  <strong className="text-amber-300 text-sm font-black">Sổ Hồng Lâu Dài</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ TRUNG TÂM ĐẮC ĐỊA (LOCATION - NAVY MAP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="vi-tri" className="py-16 bg-[#0F1E36] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
              VỊ TRÍ KIM CƯƠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
              TRUNG TÂM ĐẮC ĐỊA BÊN SÔNG CẢ CẤM
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tọa lạc tại ngã ba sông Cả Cấm thơ mộng thuộc đường Phú Thuận, Phường Tân Phú, Quận 7. Dự án hưởng trọn không gian sinh thái trong lành và khả năng liên kết hoàn hảo với trung tâm hành chính tài chính:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">📍 <strong>Liền kề Phú Mỹ Hưng:</strong> 3 phút tới Trung tâm Hội chợ SECC & Crescent Mall</li>
              <li className="flex items-center gap-2">📍 <strong>Hệ thống Y tế Quốc tế:</strong> 5 phút tới Bệnh viện FV & Bệnh viện Tim Tâm Đức</li>
              <li className="flex items-center gap-2">📍 <strong>Giáo dục Quốc tế:</strong> 8 phút tới Trường Quốc tế Canada, SSIS & Đại học RMIT</li>
              <li className="flex items-center gap-2">📍 <strong>Trung tâm Quận 1 & Thủ Thiêm:</strong> 15 phút di chuyển theo tuyến Nguyễn Lương Bằng & Huỳnh Tấn Phát</li>
            </ul>
          </div>

          {/* Map Right */}
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-slate-900">
            <iframe
              src="https://maps.google.com/maps?q=Phu+Thuan+Tan+Phu+Quan+7+Ho+Chi+Minh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* 6 Icons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-center text-xs">
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">Hành Chính Q7</span>
            <span className="text-[10px] text-slate-400">Cách 1.0 km</span>
          </div>
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">SECC & Crescent</span>
            <span className="text-[10px] text-slate-400">Cách 1.5 km</span>
          </div>
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">BV FV & Tâm Đức</span>
            <span className="text-[10px] text-slate-400">Cách 2.0 km</span>
          </div>
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">Đại học RMIT</span>
            <span className="text-[10px] text-slate-400">Cách 3.5 km</span>
          </div>
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">SC VivoCity</span>
            <span className="text-[10px] text-slate-400">Cách 3.0 km</span>
          </div>
          <div className="bg-[#14294D] p-3 border border-amber-500/20">
            <span className="text-amber-300 font-bold block">Chợ Bến Thành Q1</span>
            <span className="text-[10px] text-slate-400">Cách 6.0 km</span>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: GIÁ TRỊ VÀNG (GOLDEN VALUES SHOWCASE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderGoldenValuesSection = () => (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-amber-500/30">
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
        alt="Nội thất dát vàng"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className={`${MAX_W} mx-auto px-4 relative z-20`}>
        <div className="max-w-2xl space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider">
            GIÁ TRỊ VÀNG CỦA {company?.name || 'TEMPLATESBDS'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
            Nội Thất Mạ Vàng & Kính Low-E Tràn Viền Đẳng Cấp
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Toàn bộ 9 tòa tháp được bao bọc 100% bằng hệ thống kính Low-E đổi màu cách âm cách nhiệt và thiết bị nội thất nhập khẩu trực tiếp từ các thương hiệu danh tiếng của Ý mạ vàng tinh xảo.
          </p>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: CHUỖI TIỆN ÍCH ĐỈNH CAO (WORLD-CLASS AMENITIES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenitiesSection = () => (
    <section id="tien-ich" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              ĐẶC QUYỀN CƯ DÂN
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0F1E36]">
              CHUỖI TIỆN ÍCH ĐỈNH CAO CHUẨN 5 SAO
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hơn 50 tiện ích nội khu đỉnh cao mang lại phong cách sống nghỉ dưỡng trọn vẹn mỗi ngày cho mọi thế hệ trong gia đình:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">🏊 <strong>Bể bơi vô cực chân mây</strong></div>
              <div className="flex items-center gap-2">🍸 <strong>Sky Bar & Rooftop Lounge</strong></div>
              <div className="flex items-center gap-2">🚁 <strong>Sân đỗ trực thăng nóc tháp</strong></div>
              <div className="flex items-center gap-2">💆 <strong>Trung tâm Spa & Massage VIP</strong></div>
              <div className="flex items-center gap-2">🏋 <strong>Phòng Gym hiện đại 1000m²</strong></div>
              <div className="flex items-center gap-2">🌊 <strong>Thác tràn nghệ thuật liên hoàn</strong></div>
              <div className="flex items-center gap-2">🌳 <strong>Vườn dạo bộ lưng chừng trời</strong></div>
              <div className="flex items-center gap-2">🎬 <strong>Rạp chiếu phim công nghệ 4D</strong></div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
              alt="Spa nghỉ dưỡng"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: HỆ SINH THÁI SUNSHINE 4.0 (SMART LIVING ECO-SYSTEM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderSmartLivingSection = () => (
    <section id="can-ho-40" className="py-16 bg-[#0F1E36] text-white border-b border-amber-500/30">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border-2 border-amber-300/40 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
              alt="Hệ sinh thái Sunshine 4.0"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
              CÔNG NGHỆ TIÊN PHONG
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
              HỆ SINH THÁI SUNSHINE 4.0 THÔNG MINH
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sunshine Group tiên phong kiến tạo cuộc sống số với giải pháp quản lý đô thị bằng trí tuệ nhân tạo AI và mạng lưới vạn vật kết nối IoT:
            </p>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">📱 <strong>Sunshine App:</strong> Điều khiển hệ thống chiếu sáng, rèm cửa, máy lạnh từ xa.</div>
              <div className="flex items-center gap-2">🔐 <strong>FaceID An Ninh:</strong> Tự động mở cửa sảnh và gọi thang máy đến đúng tầng căn hộ.</div>
              <div className="flex items-center gap-2">🚗 <strong>Smart Parking:</strong> Hướng dẫn đỗ xe thông minh và báo trước vị trí còn trống.</div>
              <div className="flex items-center gap-2">💳 <strong>Sunshine Pay:</strong> Ví điện tử thanh toán mọi hóa đơn dịch vụ tích tắc không tiền mặt.</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: MẶT BẰNG & BẢNG HÀNG CĂN HỘ (INVENTORY GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFloorPlansSection = () => (
    <section id="danh-sach-can-ho" className="py-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0F1E36] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              BẢNG HÀNG NGOẠI GIAO TRỰC TIẾP CHỦ ĐẦU TƯ
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              DANH SÁCH CĂN HỘ ĐANG MỞ BÁN ({filteredUnits.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterTower}
              onChange={e => setFilterTower(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Tòa Tháp (Tất cả)</option>
              {availableTowers.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Loại Căn Hộ (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-[#0F1E36] hover:bg-[#14294D] text-white font-bold uppercase shadow cursor-pointer"
            >
              Lọc
            </button>
          </div>
        </div>

        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy căn hộ nào khớp với tiêu chí lọc.</p>
            <button
              onClick={() => {
                setFilterTower('all');
                setFilterType('all');
                setFilterPrice('all');
              }}
              className="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase shadow"
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
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0F1E36] text-amber-300 text-[10px] font-black uppercase">
                    {unit.code} • {unit.tower}
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
                    className="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#D4AF37] cursor-pointer min-h-[34px]"
                  >
                    {unit.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                    <div>📐 Diện tích: <strong>{unit.area}</strong></div>
                    <div>🏢 Tầng: <strong>{unit.floor}</strong></div>
                    <div>🧭 Hướng: <strong>{unit.direction}</strong></div>
                    <div>🛏 Phòng: <strong>{unit.beds} PN • {unit.baths} WC</strong></div>
                  </div>

                  <p className="text-[11px] text-amber-700 font-medium truncate">
                    🌊 {unit.view}
                  </p>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-sm font-black text-[#E11D48]">{unit.price}</span>
                    <button
                      onClick={() => handleOpenUnit(unit)}
                      className="px-3 py-1.5 bg-[#0F1E36] hover:bg-[#14294D] text-amber-300 font-bold text-xs uppercase transition cursor-pointer"
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
  // 9. SECTION 7: TIN TỨC & TIẾN ĐỘ DỰ ÁN
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#D4AF37] pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-[#0F1E36]">
            TIN TỨC {company?.name || 'TEMPLATESBDS'}
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#D4AF37] hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS19_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#D4AF37] cursor-pointer"
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
  // 10. SECTION 8: DẢI ICON VÀNG & FORM ĐĂNG KÝ BẢNG GIÁ NGOẠI GIAO
  // ─────────────────────────────────────────────────────────────────────────
  const renderInquirySection = () => (
    <div>
      {/* Gold Bar with 5 Icons */}
      <div className="bg-[#D4AF37] text-slate-950 py-4 px-4">
        <div className={`${MAX_W} mx-auto grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-xs font-black uppercase`}>
          <div className="flex items-center justify-center gap-2">📞 Hotline: 0919 006 030</div>
          <div className="flex items-center justify-center gap-2">📐 Mặt Bằng 3D 4.0</div>
          <div className="flex items-center justify-center gap-2">📥 Tải Trọn Bộ Brochure</div>
          <div className="flex items-center justify-center gap-2">💰 Bảng Giá Ngoại Giao</div>
          <div className="flex items-center justify-center gap-2">🏠 Xem Nhà Mẫu 24/7</div>
        </div>
      </div>

      {/* Dark Navy Form */}
      <section id="dang-ky-bang-gia" className="py-16 bg-[#0F1E36] text-white">
        <div className={`${MAX_W} mx-auto px-4 max-w-xl text-center space-y-6`}>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
              CHÍNH SÁCH BÁN HÀNG ƯU ĐÃI ĐẶC BIỆT
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
              ĐĂNG KÝ NHẬN BẢNG GIÁ NGOẠI GIAO
            </h2>
            <p className="text-xs text-slate-300">
              Chiết khấu lên đến 10% giá trị căn hộ và miễn phí 2 năm phí quản lý dịch vụ tiêu chuẩn 5 sao.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="bg-[#14294D] p-6 border border-amber-500/30 text-left text-xs space-y-3 shadow-2xl">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Họ và tên quý khách *</label>
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Số điện thoại nhận bảng giá *</label>
              <input
                type="tel"
                required
                value={inquiryForm.phone}
                onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                placeholder="0919 006 030"
                className="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Tòa tháp quan tâm</label>
              <select
                value={inquiryForm.towerInterested}
                onChange={e => setInquiryForm({ ...inquiryForm, towerInterested: e.target.value })}
                className="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option className="text-slate-900 bg-white font-medium" value="Tòa S1 - Venus">Tòa S1 - Venus (Mở bán đợt 1)</option>
                <option className="text-slate-900 bg-white font-medium" value="Tòa S2 - Mars">Tòa S2 - Mars (View hồ bơi)</option>
                <option className="text-slate-900 bg-white font-medium" value="Tòa S4 - Mercury">Tòa S4 - Mercury (View Phú Mỹ Hưng)</option>
                <option className="text-slate-900 bg-white font-medium" value="Tòa S7 - Jupiter">Tòa S7 - Jupiter (View sông Sài Gòn)</option>
                <option className="text-slate-900 bg-white font-medium" value="Tòa S9 - King">Tòa S9 - King (Penthouse độc bản)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
            >
              Gửi Yêu Cầu Nhận Bảng Giá Gốc CĐT
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#D4AF37] selection:text-slate-950">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0F1E36] text-white border border-[#D4AF37] px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black max-w-3xl w-full aspect-video relative shadow-2xl border border-amber-300/40">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/20 text-white hover:bg-white/40"
            >
              <X size={18} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Sunshine City Saigon Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderOverviewSection()}
            {renderLocationSection()}
            {renderGoldenValuesSection()}
            {renderAmenitiesSection()}
            {renderSmartLivingSection()}
            {renderFloorPlansSection()}
            {renderNewsSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverviewSection()}
            {renderGoldenValuesSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocationSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderAmenitiesSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'floor-plans' && (
          <main>
            {renderFloorPlansSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'smart-living' && (
          <main>
            {renderSmartLivingSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'ecosystem' && (
          <main>
            {renderSmartLivingSection()}
            {renderAmenitiesSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'pricing' && (
          <main>
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderLocationSection()}
            {renderInquirySection()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('floor-plans')} className="text-xs font-bold text-[#0F1E36] hover:underline">
                ‹ Quay lại bảng hàng căn hộ
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0F1E36] uppercase">
                {selectedUnit.title} ({selectedUnit.code})
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Giá bán: {selectedUnit.price} — Tòa: {selectedUnit.tower} — Diện tích: {selectedUnit.area}
              </p>
              <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
              <div className="p-4 bg-[#0F1E36] text-white space-y-2 border border-amber-500/30">
                <h4 className="font-bold text-xs uppercase text-amber-300">Công nghệ Smart Living 4.0 tích hợp:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedUnit.smartFeatures.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">⚡ {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0F1E36] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-[#0F1E36] uppercase">
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
        templateName="BDS-19 (Sunshine City Saigon — Căn Hộ Nghỉ Dưỡng Thông Minh 4.0)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
