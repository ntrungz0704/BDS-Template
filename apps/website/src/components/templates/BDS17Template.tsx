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
  Camera, Map, Sun, Navigation, Volume2, Globe, Flame
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
  type: string; // 'Studio', '1 Phòng Ngủ', '2 Phòng Ngủ', '3 Phòng Ngủ', 'Biệt Thự Đơn Lập'
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
  planImage: string;
  hot?: boolean;
  featured?: boolean;
  description: string;
  specs: string[];
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
// BDS-17 MOCK DATA: {company?.name || 'TEMPLATESBDS'} (ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS17_UNITS: UnitItem[] = [
  {
    id: 'can-studio-view-vinh',
    title: 'Căn Hộ Studio Nghỉ Dưỡng View Trực Diện Vịnh Hạ Long',
    code: 'BH-ST08',
    slug: 'can-ho-studio-nghi-duong-view-vinh-ha-long',
    type: 'Căn Hộ Studio',
    floor: 'Tầng 08 - 12',
    price: '1.65 Tỷ VNĐ',
    priceNum: 1.65,
    area: '42 m²',
    areaNum: 42,
    beds: 1,
    baths: 1,
    view: 'View Vịnh Hạ Long & Cầu Bãi Cháy',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn hộ khách sạn Condotel đầy đủ nội thất 5 sao, ban công kính tràn ngắm trọn vẹn cảnh bình minh trên Vịnh di sản thế giới.',
    specs: ['Bàn giao full nội thất 5 sao', 'Cam kết thuê lại 12%/năm', 'Sở hữu lâu dài', 'Tặng 15 đêm nghỉ dưỡng/năm']
  },
  {
    id: 'can-1pn-view-sunwheel',
    title: 'Căn Hộ 1 Phòng Ngủ View Vòng Quay Mặt Trời Sun Wheel',
    code: 'BH-1P15',
    slug: 'can-ho-1-phong-ngu-view-vong-quay-mat-troi',
    type: '1 Phòng Ngủ',
    floor: 'Tầng 14 - 18',
    price: '2.35 Tỷ VNĐ',
    priceNum: 2.35,
    area: '58 m²',
    areaNum: 58,
    beds: 1,
    baths: 1,
    view: 'View Sun Wheel & Công Viên Rồng',
    direction: 'Hướng Đông Bắc',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Thiết kế thông minh tối ưu công năng, phòng khách liên thông bếp hiện đại, ngắm pháo hoa lễ hội rực rỡ quanh năm.',
    specs: ['Nội thất gỗ óc chó cao cấp', 'Kính Low-E cách âm cách nhiệt', 'Khóa từ vân tay Hafele', 'Hỗ trợ vay 70%']
  },
  {
    id: 'can-2pn-panorama-goc',
    title: 'Căn Hộ Góc 2 Phòng Ngủ Panorama 2 Mặt Thoáng Hướng Biển',
    code: 'BH-2P09',
    slug: 'can-ho-goc-2-phong-ngu-panorama-huong-bien',
    type: '2 Phòng Ngủ',
    floor: 'Tầng 09 - 16',
    price: '3.60 Tỷ VNĐ',
    priceNum: 3.6,
    area: '82 m²',
    areaNum: 82,
    beds: 2,
    baths: 2,
    view: 'View Panorama 270 độ Vịnh Hạ Long',
    direction: 'Hướng Nam - Đông Nam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn hộ góc đẳng cấp với 2 ban công rộng lớn, phòng ngủ Master có bồn tắm kính ngắm vịnh biển thơ mộng.',
    specs: ['Căn góc 2 mặt thoáng', 'Bồn tắm view biển Master', 'Miễn phí quản lý 2 năm', 'Sổ đỏ trao tay']
  },
  {
    id: 'can-3pn-tong-thong',
    title: 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Suite Tầng Cao VIP',
    code: 'BH-3P19',
    slug: 'can-ho-3-phong-ngu-hoang-gia-suite-tang-cao',
    type: '3 Phòng Ngủ',
    floor: 'Tầng 18 - 19',
    price: '5.20 Tỷ VNĐ',
    priceNum: 5.2,
    area: '115 m²',
    areaNum: 115,
    beds: 3,
    baths: 3,
    view: 'Trọn vẹn Vịnh Kỳ Quan & Cảng Tàu Quốc Tế',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Dành riêng cho những chủ nhân danh giá, không gian sinh hoạt chung rộng hơn 50m² cùng tiêu chuẩn hoàn thiện siêu sang.',
    specs: ['Thang máy riêng bảo mật', 'Trần cao 3.6m', 'Hệ thống Smart Home Kohler', 'Tặng voucher nội thất 200 Tr']
  },
  {
    id: 'biet-thu-doi-beverly-hills',
    title: 'Dinh Thự Đồi Beverly Hills Đơn Lập Có Bể Bơi Riêng Biệt',
    code: 'BH-VILLA03',
    slug: 'dinh-thu-doi-beverly-hills-don-lap-be-boi-rieng',
    type: 'Biệt Thự Đơn Lập',
    floor: 'Khu Dinh Thự Đồi',
    price: '18.5 Tỷ VNĐ',
    priceNum: 18.5,
    area: '320 m²',
    areaNum: 320,
    beds: 5,
    baths: 6,
    view: 'Tọa sơn hướng hải ngắm toàn cảnh Vịnh',
    direction: 'Hướng Nam',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Biệt thự đơn lập 3 tầng theo phong cách Địa Trung Hải quý phái, khuôn viên sân vườn 150m² và hồ bơi vô cực view biển.',
    specs: ['Bể bơi vô cực riêng', 'Gara 2 ô tô', 'Sân vườn nhiệt đới', 'Sổ hồng vĩnh viễn']
  },
  {
    id: 'penthouse-duplex-dinh-thap',
    title: 'Penthouse Duplex Đỉnh Tháp Beverly Hills Sky Palace',
    code: 'BH-PH01',
    slug: 'penthouse-duplex-dinh-thap-beverly-hills-sky-palace',
    type: 'Penthouse Duplex',
    floor: 'Tầng 19 - 20',
    price: '9.80 Tỷ VNĐ',
    priceNum: 9.8,
    area: '210 m²',
    areaNum: 210,
    beds: 4,
    baths: 4,
    view: 'Đỉnh cao ngắm Vịnh 360 độ',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    planImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Tuyệt tác thông tầng xa hoa bậc nhất Quảng Ninh với sân vườn Sky Garden và bể sục Jacuzzi ngoài trời.',
    specs: ['Thông tầng cao 7m', 'Bể Jacuzzi ngoài trời', 'Sky Garden ngắm sao', 'Dịch vụ quản gia Butler 24/7']
  }
];

export const BDS17_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Bất Động Sản Nghỉ Dưỡng Bãi Cháy Bứt Phá Mạnh Mẽ Nhờ Hạ Tầng Cao Tốc',
    slug: 'bds-nghi-duong-bai-chay-but-pha-manh-me',
    date: '28/08/2026',
    author: 'Beverly Hills Research',
    category: 'Thị Trường',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Tuyến cao tốc Vân Đồn - Móng Cái và Cảng hàng không quốc tế kéo lượng lớn du khách thượng lưu về với thủ phủ du lịch Hạ Long.',
    content: [
      'Hạ Long đang vươn mình trở thành trung tâm du lịch 4 mùa hàng đầu khu vực Đông Nam Á với hàng loạt siêu dự án nghỉ dưỡng.',
      'Beverly Hills Hạ Long là dự án hiếm hoi tọa lạc tại đồi Hải Quân với vị thế phong thủy tọa sơn hướng hải đắc địa bậc nhất.'
    ],
    views: 4520
  },
  {
    id: 2,
    title: 'Lễ Trao Sổ Đỏ Từng Căn Cho Những Cư Dân Đầu Tiên Tại Beverly Hills',
    slug: 'le-trao-so-do-cu-dan-beverly-hills',
    date: '26/08/2026',
    author: 'Đức Dương Group',
    category: 'Pháp Lý',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    excerpt: 'Chủ đầu tư Đức Dương Group chính thức bàn giao giấy chứng nhận quyền sở hữu nhà ở lâu dài cho các chủ nhân danh giá.',
    content: [
      'Pháp lý hoàn thiện và sổ đỏ trao tay là bảo chứng vàng cho giá trị gia tăng bền vững của dự án Beverly Hills Hạ Long.'
    ],
    views: 3890
  },
  {
    id: 3,
    title: 'Khám Phá Chuỗi Tiện Ích Đỉnh Cao: Sky Bar Tầng 19 & Bể Bơi Vô Cực Ngắm Vịnh',
    slug: 'kham-pha-chuoi-tien-ich-sky-bar-be-boi-vo-cuc',
    date: '24/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiện Ích',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    excerpt: 'Không gian ẩm thực quốc tế 5 sao và bể bơi nước mặn vô cực lưng chừng đồi mang lại trải nghiệm nghỉ dưỡng xứng tầm tỷ phú.',
    content: [
      'Cư dân và khách lưu trú được tận hưởng trọn vẹn những dịch vụ đẳng cấp nhất như Casino, Sân tập Golf và Spa thư giãn.'
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
  if (clean === 'mat-bang' || clean === 'floor-plans') return { page: 'floor-plans', propSlug: '', artSlug: '' };
  if (clean === 'can-ho-mau' || clean === 'showroom') return { page: 'showroom', propSlug: '', artSlug: '' };
  if (clean === 'chinh-sach' || clean === 'policy') return { page: 'policy', propSlug: '', artSlug: '' };
  if (clean === 'tien-do' || clean === 'progress') return { page: 'progress', propSlug: '', artSlug: '' };
  if (clean === 'video' || clean === 'media') return { page: 'video', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS17Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
}: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS17_UNITS.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS17_UNITS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS17_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS17_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS17_UNITS.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableFloors = useMemo(() => {
    const set = new Set(BDS17_UNITS.map(p => p.floor).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterType, setFilterType] = useState('all');
  const [filterFloor, setFilterFloor] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');

  // Interactive Modals & Lightbox
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [currentPlanImg, setCurrentPlanImg] = useState('');

  // Forms
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', unitType: 'Căn Hộ Studio' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-17';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS17_UNITS.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = BDS17_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'showroom') urlSlug = 'can-ho-mau';
    else if (page === 'policy') urlSlug = 'chinh-sach';
    else if (page === 'progress') urlSlug = 'tien-do';
    else if (page === 'video') urlSlug = 'video';
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
      alert('Vui lòng nhập họ tên và số điện thoại đăng ký nhận bảng giá!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu nhận bảng giá & voucher 100Tr từ ${bookingForm.name} (${bookingForm.phone}). Giám đốc dự án Beverly Hills sẽ liên hệ ngay!`);
    setBookingForm({ name: '', phone: '', email: '', unitType: 'Căn Hộ Studio' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  const openVideo = (url: string) => {
    setCurrentVideoUrl(url);
    setVideoModalOpen(true);
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredUnits = useMemo(() => {
    return BDS17_UNITS.filter(p => {
      // Type matching
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }

      // Floor matching
      if (filterFloor !== 'all' && p.floor !== filterFloor) return false;

      // Price matching
      if (filterPrice === 'under-3' && p.priceNum >= 3) return false;
      if (filterPrice === '3-6' && (p.priceNum < 3 || p.priceNum > 6)) return false;
      if (filterPrice === 'above-6' && p.priceNum <= 6) return false;

      return true;
    });
  }, [filterType, filterFloor, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'floor-plans') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredUnits.length;
    showToast(`🔍 Tìm thấy ${count} căn hộ & biệt thự phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('bang-hang-can-ho');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVIGATION BAR (LUXURY ANTIQUE BRONZE & GOLD)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-[#C5A880]/30">
      
      {/* Top Banner with Gold Crown Logo */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo Beverly Hills */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#C5A880] via-[#9A7B4F] to-[#855828] flex items-center justify-center text-white font-serif font-black text-base sm:text-xl shadow-md border border-amber-200 shrink-0">
            👑
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-serif font-black text-[#855828] tracking-wider block leading-none truncate">
              BEVERLY HILLS <span className="text-slate-900">HẠ LONG</span>
            </span>
            <span className="text-[7px] sm:text-[8.5px] font-bold text-amber-700 uppercase tracking-widest block mt-0.5 truncate">
              ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU — BÃI CHÁY
            </span>
          </div>
        </div>

        {/* Hotline CTA Right */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Hotline Phòng Kinh Doanh</span>
            <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-sm font-black text-[#E11D48] tracking-wider block">
              0919 006 030
            </a>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('dang-ky-bang-gia');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#C5A880] to-[#9A7B4F] hover:from-[#9A7B4F] text-white text-xs font-black uppercase tracking-wider shadow cursor-pointer"
          >
            Nhận Bảng Giá Ngoại Giao
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 sm:p-2 text-slate-800 xl:hidden hover:bg-slate-100 shrink-0 flex items-center justify-center ml-auto"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Main Bronze/Gold Navbar */}
      <div className="bg-[#9A7B4F] text-white border-t border-amber-200/20">
        <div className={`${MAX_W} mx-auto px-4 flex items-center justify-between`}>
          <nav className="hidden xl:flex items-center gap-0 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            <button 
              onClick={() => navigate('home')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'home' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => navigate('overview')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'overview' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Tổng Quan
            </button>
            <button 
              onClick={() => navigate('location')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'location' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Vị Trí
            </button>
            <button 
              onClick={() => navigate('amenities')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'amenities' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Tiện Ích
            </button>
            <button 
              onClick={() => navigate('floor-plans')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'floor-plans' || currentPage === 'property-detail' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Mặt Bằng
            </button>
            <button 
              onClick={() => navigate('showroom')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'showroom' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Căn Hộ Mẫu
            </button>
            <button 
              onClick={() => navigate('policy')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'policy' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Chính Sách
            </button>
            <button 
              onClick={() => navigate('progress')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'progress' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Tiến Độ
            </button>
            <button 
              onClick={() => navigate('video')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'video' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Video / Media
            </button>
            <button 
              onClick={() => navigate('news')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Tin Tức
            </button>
            <button 
              onClick={() => navigate('contact')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'contact' ? 'bg-[#855828] text-amber-200 font-extrabold shadow-inner' : 'hover:bg-[#855828]'}`}
            >
              Liên Hệ
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Trang Chủ</button>
            <button onClick={() => navigate('overview')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Vị Trí</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Tiện Ích</button>
            <button onClick={() => navigate('floor-plans')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Mặt Bằng</button>
            <button onClick={() => navigate('showroom')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Căn Hộ Mẫu</button>
            <button onClick={() => navigate('policy')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Chính Sách</button>
            <button onClick={() => navigate('progress')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Tiến Độ</button>
            <button onClick={() => navigate('video')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Video</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-slate-50 hover:bg-amber-50">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER FLYCAM VỊNH HẠ LONG
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroBanner = () => (
    <section className="relative bg-slate-950 text-white min-h-[420px] sm:min-h-[520px] flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
        alt="Vịnh Hạ Long Hero"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <div className="relative z-20 text-center space-y-4 max-w-3xl mx-auto px-4">
        <span className="px-4 py-1.5 bg-[#9A7B4F]/90 text-amber-200 text-xs font-bold uppercase tracking-widest inline-block border border-amber-200/40">
          TUYỆT TÁC NGHỈ DƯỠNG TRÊN ĐỈNH KỲ QUAN
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-black uppercase text-white tracking-wider drop-shadow-2xl">
          {company?.name || 'TEMPLATESBDS'}
        </h1>
        <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-medium">
          Dự án căn hộ khách sạn 5 sao & Dinh thự đồi Hải Quân Bãi Cháy ngắm trọn vẹn di sản thiên nhiên thế giới Vịnh Hạ Long.
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('dang-ky-bang-gia');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#9A7B4F] hover:bg-[#855828] text-white font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            Đăng Ký Tham Quan Căn Hộ Mẫu ›
          </button>
          <button
            onClick={() => openVideo('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs uppercase tracking-wider border border-white/40 flex items-center gap-2 cursor-pointer"
          >
            <Play size={14} className="fill-white" /> Xem Video Flycam
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION: TỔNG QUAN DỰ ÁN (OVERVIEW)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="tong-quan" className="py-14 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase text-[#9A7B4F] tracking-widest block">
              KIẾN TRÚC ĐẲNG CẤP HOÀNG GIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              TỔNG QUAN DỰ ÁN {company?.name || 'TEMPLATESBDS'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Tọa lạc trên đỉnh đồi Hải Quân cao hơn 100m so với mực nước biển, Beverly Hills Hạ Long tự hào là quần thể nghỉ dưỡng thượng lưu có tầm nhìn Panorama đắt giá nhất Vịnh Bắc Bộ.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Dự án bao gồm 1 tòa tháp căn hộ khách sạn 19 tầng tiêu chuẩn 5 sao quốc tế và 138 căn biệt thự đơn lập, song lập lưng tựa núi, mặt hướng biển, đón trọn luồng sinh khí thịnh vượng.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200 text-xs">
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">TỔNG DIỆN TÍCH</span>
                <strong className="text-slate-900 text-sm font-black">10.8 Hecta</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">QUY MÔ THÁP</span>
                <strong className="text-slate-900 text-sm font-black">19 Tầng Nổi</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">PHÁP LÝ</span>
                <strong className="text-slate-900 text-sm font-black">Sổ Đỏ Lâu Dài</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
              alt="Beverly Hills Tháp Cao Tầng"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION: VỊ TRÍ KIM CƯƠNG ĐẮC ĐỊA (LOCATION - BRONZE BANNER)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="vi-tri" className="py-14 bg-[#9A7B4F] text-white">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Left */}
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-white/40 shadow-2xl bg-slate-900">
            <iframe
              src="https://maps.google.com/maps?q=Bai+Chay+Ha+Long&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Location Content Right */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-200 tracking-widest block">
              TÂM ĐIỂM KẾT NỐI VÀNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-wide text-white">
              VỊ TRÍ KIM CƯƠNG TRÊN ĐỒI HẢI QUÂN BÃI CHÁY
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Tọa lạc tại vị trí đắc địa nhất khu du lịch Bãi Cháy, Beverly Hills sở hữu khả năng siêu kết nối tới tất cả các địa danh giải trí và thắng cảnh biểu tượng của Quảng Ninh:
            </p>

            <ul className="space-y-2.5 text-xs text-white">
              <li className="flex items-center gap-2">📍 <strong>Cầu Bãi Cháy & Vòng quay Sun Wheel:</strong> Cách 1.0 km (3 phút di chuyển)</li>
              <li className="flex items-center gap-2">📍 <strong>Cáp treo Nữ Hoàng & Công viên Sun World:</strong> Cách 1.5 km (4 phút)</li>
              <li className="flex items-center gap-2">📍 <strong>Bãi tắm Bãi Cháy & Phố cổ Hạ Long:</strong> Cách 2.0 km (5 phút)</li>
              <li className="flex items-center gap-2">📍 <strong>Cảng tàu khách quốc tế Tuần Châu:</strong> Cách 9.0 km (10 phút)</li>
              <li className="flex items-center gap-2">📍 <strong>Sân bay quốc tế Vân Đồn:</strong> Cách 45 km (35 phút theo cao tốc)</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION: TIỆN ÍCH ĐẲNG CẤP 5 SAO (AMENITIES - BRONZE BOXES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenitiesSection = () => (
    <section id="tien-ich" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-[#9A7B4F] tracking-widest">
            HỆ SINH THÁI ĐẶC QUYỀN
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
            TIỆN ÍCH ĐẲNG CẤP NGHỈ DƯỠNG 5 SAO
          </h2>
          <p className="text-xs text-slate-600">
            Hơn 30 tiện ích nội khu chuẩn quốc tế phục vụ trọn vẹn nhu cầu nghỉ dưỡng và tái tạo năng lượng của cộng đồng cư dân thượng lưu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-[#9A7B4F] text-white flex items-center justify-center text-xl font-bold">
              🏊
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase">Bể Bơi Vô Cực View Vịnh</h3>
            <p className="text-xs text-slate-600 leading-relaxed break-words">
              Bể bơi tràn bờ trên lưng chừng đồi nước mặn bốn mùa, mang lại cảm giác bơi lội giữa không trung ngắm trọn kỳ quan.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-[#9A7B4F] text-white flex items-center justify-center text-xl font-bold">
              🍸
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase">Sky Bar & Lounge Tầng 19</h3>
            <p className="text-xs text-slate-600 leading-relaxed break-words">
              Điểm hẹn thượng lưu ngắm hoàng hôn buông xuống Vịnh Hạ Long, thưởng thức cocktail tinh tế và âm nhạc acoustic lãng mạn.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-[#9A7B4F] text-white flex items-center justify-center text-xl font-bold">
              ⛳
            </div>
            <h3 className="font-bold text-sm text-slate-900 uppercase">Sân Tập Golf & Casino Quốc Tế</h3>
            <p className="text-xs text-slate-600 leading-relaxed break-words">
              Trải nghiệm các bộ môn thể thao quý tộc và câu lạc bộ giải trí có thưởng chuẩn quốc tế ngay trong khuôn viên dự án.
            </p>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION: MẶT BẰNG & DANH SÁCH CĂN HỘ (FLOOR PLANS & INVENTORY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFloorPlansSection = () => (
    <section id="bang-hang-can-ho" className="py-14 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#9A7B4F] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#9A7B4F] tracking-widest block">
              MẶT BẰNG TẦNG ĐIỂN HÌNH & BẢNG HÀNG
            </span>
            <h2 className="text-2xl font-serif font-black text-slate-900 uppercase">
              DANH SÁCH CĂN HỘ & BIỆT THỰ ĐANG MỞ BÁN ({filteredUnits.length})
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-300 px-3 py-1.5 focus:outline-none"
            >
              <option value="all">Loại Căn Hộ (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
              className="bg-slate-50 border border-slate-300 px-3 py-1.5 focus:outline-none"
            >
              <option value="all">Mức Giá (Tất cả)</option>
              <option value="under-3">Dưới 3 Tỷ</option>
              <option value="3-6">3 - 6 Tỷ</option>
              <option value="above-6">Trên 6 Tỷ</option>
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-1.5 bg-[#9A7B4F] hover:bg-[#855828] text-white font-bold uppercase shadow cursor-pointer"
            >
              Lọc
            </button>
          </div>
        </div>

        {/* Units Grid (Lưới 3 Cột Sắc Nét) */}
        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy căn hộ nào khớp hoàn toàn với tiêu chí này.</p>
            <button
              onClick={() => {
                setFilterType('all');
                setFilterFloor('all');
                setFilterPrice('all');
              }}
              className="px-5 py-2 bg-[#9A7B4F] text-white font-bold text-xs uppercase shadow"
            >
              Xem Toàn Bộ Bảng Hàng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map(unit => (
              <div 
                key={unit.id}
                className="bg-white border border-slate-300 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#9A7B4F] text-white text-[9px] font-black uppercase">
                    {unit.code}
                  </span>
                  {unit.hot && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">
                      HOT
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 
                    onClick={() => handleOpenUnit(unit)}
                    className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#9A7B4F] cursor-pointer min-h-[34px]"
                  >
                    {unit.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                    <div>📐 Diện tích: <strong>{unit.area}</strong></div>
                    <div>🏢 Tầng: <strong>{unit.floor}</strong></div>
                    <div>🧭 Hướng: <strong>{unit.direction}</strong></div>
                    <div>🛏 Phòng: <strong>{unit.beds} PN • {unit.baths} WC</strong></div>
                  </div>

                  <p className="text-[11px] text-amber-800 font-medium truncate">
                    🌊 {unit.view}
                  </p>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-sm font-black text-[#E11D48]">{unit.price}</span>
                    <button
                      onClick={() => handleOpenUnit(unit)}
                      className="px-3 py-1 bg-[#9A7B4F] hover:bg-[#855828] text-white font-bold text-xs uppercase transition cursor-pointer"
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
  // 7. SECTION: THỰC TẾ CĂN HỘ MẪU (SHOWROOM GALLERY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderShowroomSection = () => (
    <section id="can-ho-mau" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-[#9A7B4F] tracking-widest">
            TRẢI NGHIỆM KHÔNG GIAN THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
            HÌNH ẢNH CĂN HỘ MẪU HOÀN THIỆN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Phòng Tắm Đá Hoa Cương VIP', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80' },
            { title: 'Phòng Khách Ban Công Kính Tràn', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
            { title: 'Phòng Ngủ Master View Vịnh', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80' },
            { title: 'Phòng Ngủ Trẻ Em Thông Minh', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
          ].map((item, idx) => (
            <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-slate-300 group shadow-sm">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <span className="text-xs font-bold text-white drop-shadow">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION: VIDEO / MEDIA THỰC TẾ DỰ ÁN
  // ─────────────────────────────────────────────────────────────────────────
  const renderVideoSection = () => (
    <section id="video" className="py-14 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-[#9A7B4F] tracking-widest">
            MEDIA & TRUYỀN HÌNH
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
            VIDEO GIỚI THIỆU & PHIM DỰ ÁN
          </h2>
        </div>

        {/* 2 Main Big Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div 
            onClick={() => openVideo('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1')}
            className="relative aspect-video overflow-hidden border-2 border-[#9A7B4F] shadow-xl group cursor-pointer bg-slate-900"
          >
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Video TVC" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#E11D48] text-white flex items-center justify-center shadow-2xl">
                <Play size={26} className="ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-xs font-bold text-white text-center">
              ▶ TVC Giới Thiệu Không Gian Sống Thượng Lưu Tại Beverly Hills Hạ Long
            </div>
          </div>

          <div 
            onClick={() => openVideo('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1')}
            className="relative aspect-video overflow-hidden border-2 border-[#9A7B4F] shadow-xl group cursor-pointer bg-slate-900"
          >
            <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" alt="Video Ký kết" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#E11D48] text-white flex items-center justify-center shadow-2xl">
                <Play size={26} className="ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-xs font-bold text-white text-center">
              ▶ Lễ Ký Kết Hợp Tác Quản Lý Vận Hành Quốc Tế 5 Sao
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION: FORM ĐĂNG KÝ NHẬN BẢNG GIÁ & VOUCHER 100 TRIỆU
  // ─────────────────────────────────────────────────────────────────────────
  const renderBookingFormSection = () => (
    <section id="dang-ky-bang-gia" className="relative py-16 bg-slate-950 text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      
      <div className={`relative z-20 ${MAX_W} mx-auto px-4 max-w-xl text-center space-y-6`}>
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
            CHƯƠNG TRÌNH TRI ÂN ĐẶC BIỆT
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
            ĐĂNG KÝ NHẬN BẢNG GIÁ & VOUCHER 100 TRIỆU
          </h2>
          <p className="text-xs text-slate-300">
            Tặng ngay chuyến du lịch Dubai 5 ngày 4 đêm và chiết khấu lên đến 8% cho 10 khách hàng đặt cọc sớm nhất trong tháng.
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="bg-white/95 backdrop-blur-md p-6 border border-amber-200 text-slate-900 space-y-3 text-xs shadow-2xl text-left">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Họ và tên quý khách *</label>
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
            <label className="block font-bold text-slate-800 mb-1">Số điện thoại nhận bảng giá *</label>
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
            <label className="block font-bold text-slate-800 mb-1">Loại hình quan tâm</label>
            <select
              value={bookingForm.unitType}
              onChange={e => setBookingForm({ ...bookingForm, unitType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            >
              <option value="Căn Hộ Studio">Căn Hộ Studio (42 m²)</option>
              <option value="1 Phòng Ngủ">Căn Hộ 1 Phòng Ngủ (58 m²)</option>
              <option value="2 Phòng Ngủ">Căn Hộ 2 Phòng Ngủ (82 m²)</option>
              <option value="3 Phòng Ngủ">Căn Hộ 3 Phòng Ngủ (115 m²)</option>
              <option value="Biệt Thự Đơn Lập">Dinh Thự Đồi Đơn Lập (320 m²)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9A7B4F] hover:bg-[#855828] text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
          >
            Gửi Yêu Cầu Nhận Bảng Giá Gốc CĐT
          </button>
        </form>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION: TIN TỨC BẤT ĐỘNG SẢN
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="border-b-2 border-[#9A7B4F] pb-2 flex items-center justify-between">
          <h2 className="text-xl font-serif font-black text-slate-900 uppercase">
            TIN TỨC & TIẾN ĐỘ DỰ ÁN
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#9A7B4F] hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS17_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group">
              <img src={n.image} alt={n.title} className="w-full h-40 object-cover group-hover:scale-105 transition" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#9A7B4F] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#9A7B4F] cursor-pointer"
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
  // 11. FOOTER: ĐỨC DƯƠNG GROUP & BEVERLY HILLS
  // ─────────────────────────────────────────────────────────────────────────
  const renderBeverlyFooter = () => (
    <footer id="lien-he" className="bg-[#1A1612] text-slate-300 text-xs border-t border-amber-900/40">
      <div className={`${MAX_W} mx-auto px-4 py-12`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <span className="text-lg font-serif font-black text-amber-200 block">{company?.name || 'TEMPLATESBDS'}</span>
            <p className="text-slate-400 leading-relaxed">
              Quần thể căn hộ khách sạn và dinh thự đồi sang trọng bậc nhất Bãi Cháy, Quảng Ninh.
            </p>
            <p>Văn phòng: <strong className="text-white">Đồi Hải Quân, Bãi Cháy, TP. Hạ Long</strong></p>
            <p>Hotline: <strong className="text-[#E11D48]">0919 006 030</strong></p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-amber-900/60 pb-2">DANH MỤC DỰ ÁN</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigate('overview')} className="hover:text-amber-200">Tổng quan dự án</button></li>
              <li><button onClick={() => navigate('location')} className="hover:text-amber-200">Vị trí kết nối</button></li>
              <li><button onClick={() => navigate('amenities')} className="hover:text-amber-200">Tiện ích 5 sao</button></li>
              <li><button onClick={() => navigate('floor-plans')} className="hover:text-amber-200">Mặt bằng căn hộ</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-amber-900/60 pb-2">HỖ TRỢ KHÁCH HÀNG</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Chính sách bán hàng</li>
              <li>Hợp đồng mua bán mẫu</li>
              <li>Tiến độ thi công thực tế</li>
              <li>Đăng ký lái thử du thuyền</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-amber-900/60 pb-2">CHỦ ĐẦU TƯ</h4>
            <p className="text-slate-400">TẬP ĐOÀN ĐỨC DƯƠNG (DUC DUONG GROUP)</p>
            <p className="text-slate-400">Đơn vị quản lý vận hành tiêu chuẩn 5 sao quốc tế.</p>
          </div>

        </div>
      </div>
    </footer>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#9A7B4F] selection:text-white">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#1A1612] text-white border border-[#9A7B4F] px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black overflow-hidden max-w-3xl w-full aspect-video relative shadow-2xl border border-amber-300/30">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/20 text-white hover:bg-white/40"
            >
              <X size={18} />
            </button>
            <iframe
              className="w-full h-full"
              src={currentVideoUrl}
              title="Beverly Hills Video"
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
            {renderHeroBanner()}
            {renderOverviewSection()}
            {renderLocationSection()}
            {renderAmenitiesSection()}
            {renderFloorPlansSection()}
            {renderShowroomSection()}
            {renderVideoSection()}
            {renderBookingFormSection()}
            {renderNewsSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverviewSection()}
            {renderAmenitiesSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocationSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderAmenitiesSection()}
            {renderShowroomSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'floor-plans' && (
          <main>
            {renderFloorPlansSection()}
            {renderBookingFormSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'showroom' && (
          <main>
            {renderShowroomSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'policy' && (
          <main>
            {renderBookingFormSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'progress' && (
          <main>
            {renderNewsSection()}
            {renderVideoSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'video' && (
          <main>
            {renderVideoSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderLocationSection()}
            {renderBookingFormSection()}
            {renderBeverlyFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('floor-plans')} className="text-xs font-bold text-amber-800">
                ‹ Quay lại bảng hàng
              </button>
              <h1 className="text-2xl font-serif font-black text-slate-900 uppercase">
                {selectedUnit.title} ({selectedUnit.code})
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Giá bán: {selectedUnit.price} — Diện tích: {selectedUnit.area} — Tầng: {selectedUnit.floor}
              </p>
              <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-amber-800">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-slate-900 uppercase">
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
        templateName="BDS-17 (Beverly Hills Hạ Long — Đỉnh Cao Nghỉ Dưỡng Thượng Lưu)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
