'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info,
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare
} from 'lucide-react';
import { MAX_W } from '../lib/design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../lib/demo';

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

export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: 'ban' | 'thue';
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number; // in m2
  beds: number;
  baths: number;
  location: string;
  city: string;
  district: string;
  date: string;
  image: string;
  featured?: boolean;
  hot?: boolean;
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
// BDS-14 MOCK DATA: WINTLAND REAL ESTATE (WINTLAND.VN)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS14_PROPERTIES: PropertyItem[] = [
  {
    id: 'nha-pho-quan-1',
    title: 'Bán Nhà Phố Hiện Đại Mặt Tiền Nguyễn Trãi Quận 1',
    slug: 'ban-nha-pho-hien-dai-mat-tien-nguyen-trai-quan-1',
    type: 'Nhà Phố Mặt Tiền',
    category: 'ban',
    price: '8.50 Tỷ VNĐ',
    priceNum: 8.5,
    area: '95 m²',
    areaNum: 95,
    beds: 4,
    baths: 4,
    location: 'Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    date: '28/08/2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: true,
    hot: true,
    description: 'Nhà phố 1 trệt 3 lầu phong cách Bắc Âu hiện đại, đường trước nhà 10m, thích hợp vừa ở vừa mở văn phòng công ty.',
    specs: ['Sổ hồng chính chủ', 'Nội thất nhập khẩu', 'Gần chợ Bến Thành', 'Có chỗ đậu ô tô']
  },
  {
    id: 'can-ho-the-sang-da-nang',
    title: 'Căn Hộ Nghỉ Dưỡng View Biển Mỹ Khê The Sang Residence',
    slug: 'can-ho-nghi-duong-view-bien-my-khe-the-sang-residence',
    type: 'Căn Hộ Cao Cấp',
    category: 'ban',
    price: '3.45 Tỷ VNĐ',
    priceNum: 3.45,
    area: '72 m²',
    areaNum: 72,
    beds: 2,
    baths: 2,
    location: 'Đường Võ Nguyên Giáp, Quận Ngũ Hành Sơn, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    date: '27/08/2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    featured: true,
    hot: false,
    description: 'Căn hộ 2 phòng ngủ tầng cao view trực diện bãi biển Mỹ Khê Đà Nẵng, ban công rộng đón gió biển mát lành quanh năm.',
    specs: ['Sổ hồng vĩnh viễn', 'Full nội thất 5 sao', 'Hồ bơi vô cực', 'Đang cho thuê 18 Triệu/tháng']
  },
  {
    id: 'biet-thu-san-vuon-hue',
    title: 'Biệt Thự Vườn Sinh Thái Ven Sông Hương Cố Đô Huế',
    slug: 'biet-thu-vuon-sinh-thai-ven-song-huong-co-do-hue',
    type: 'Biệt Thự Nhà Vườn',
    category: 'ban',
    price: '6.20 Tỷ VNĐ',
    priceNum: 6.2,
    area: '280 m²',
    areaNum: 280,
    beds: 5,
    baths: 4,
    location: 'Đường Kim Long, Phường Kim Long, TP. Huế',
    city: 'Huế',
    district: 'Kim Long',
    date: '26/08/2026',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    featured: true,
    hot: true,
    description: 'Biệt thự sân vườn mang đậm nét thanh lịch kiến trúc Cố Đô kết hợp tiện nghi đương đại, khuôn viên trồng nhiều cây ăn trái và hoa quý.',
    specs: ['Khuôn viên 280m²', 'Sổ đỏ trao tay', 'Bến thuyền riêng', 'Không gian yên bình nghỉ dưỡng']
  },
  {
    id: 'penthouse-nha-trang',
    title: 'Penthouse Duplex Đẳng Cấp Biển Nha Trang Đường Trần Phú',
    slug: 'penthouse-duplex-dang-cap-bien-nha-trang-duong-tran-phu',
    type: 'Penthouse Duplex',
    category: 'ban',
    price: '11.50 Tỷ VNĐ',
    priceNum: 11.5,
    area: '185 m²',
    areaNum: 185,
    beds: 3,
    baths: 3,
    location: 'Đại lộ Trần Phú, Phường Lộc Thọ, TP. Nha Trang',
    city: 'Nha Trang',
    district: 'Lộc Thọ',
    date: '25/08/2026',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: false,
    hot: true,
    description: 'Căn hộ thông tầng cao cấp nhất tòa tháp ngắm trọn vẹn vịnh biển Nha Trang và bến du thuyền quốc tế.',
    specs: ['Hồ bơi Jacuzzi riêng', 'Trần cao 6m', 'Nội thất da cao cấp Ý', 'Thang máy thẻ từ riêng']
  },
  {
    id: 'nha-pho-ho-tay-ha-noi',
    title: 'Bán Nhà Phố Phân Lô Ô Tô Vào Nhà Ngay Gần Hồ Tây',
    slug: 'ban-nha-pho-phan-lo-o-to-vao-nha-ngay-gan-ho-tay',
    type: 'Nhà Phố Liền Kề',
    category: 'ban',
    price: '9.80 Tỷ VNĐ',
    priceNum: 9.8,
    area: '65 m²',
    areaNum: 65,
    beds: 4,
    baths: 4,
    location: 'Đường Lạc Long Quân, Quận Tây Hồ, TP. Hà Nội',
    city: 'Hà Nội',
    district: 'Tây Hồ',
    date: '24/08/2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: false,
    hot: false,
    description: 'Nhà xây mới 5 tầng có thang máy kính, ngõ thông ô tô tránh nhau, cách mặt hồ Tây chỉ 200m đi bộ.',
    specs: ['Thang máy nhập khẩu', 'Gần Hồ Tây thoáng mát', 'Khu dân trí cao', 'Sổ đỏ vuông vắn']
  },
  {
    id: 'cho-thue-can-ho-vinhomes-central-park',
    title: 'Cho Thuê Căn Hộ 2PN Landmark 81 Full Nội Thất Sang Trọng',
    slug: 'cho-thue-can-ho-2pn-landmark-81-full-noi-that',
    type: 'Căn Hộ Cho Thuê',
    category: 'thue',
    price: '22 Triệu / Tháng',
    priceNum: 0.022,
    area: '79 m²',
    areaNum: 79,
    beds: 2,
    baths: 2,
    location: 'Vinhomes Central Park, Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM',
    city: 'Hồ Chí Minh',
    district: 'Bình Thạnh',
    date: '23/08/2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    featured: false,
    hot: false,
    description: 'Căn hộ view trực diện công viên ven sông 14ha và tòa tháp Landmark 81, trang bị đầy đủ tiện nghi chỉ xách vali vào ở.',
    specs: ['Bao phí quản lý', 'Hồ bơi & Gym miễn phí', 'Ban công đón gió', 'Hợp đồng linh hoạt']
  }
];

export const BDS14_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Xu Hướng Dòng Tiền Đầu Tư Bất Động Sản Nghỉ Dưỡng Ven Biển Cuối Năm 2026',
    slug: 'xu-huong-dong-tien-dau-tu-bds-nghi-duong-2026',
    date: '28/08/2026',
    author: 'WintLand Research',
    category: 'Thị Trường',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Phân khúc bất động sản biển sở hữu lâu dài tại Đà Nẵng, Nha Trang và Phú Quốc đang hút mạnh dòng vốn đầu tư an toàn.',
    content: [
      'Thị trường bất động sản nghỉ dưỡng biển đang chứng kiến sự hồi phục mạnh mẽ nhờ sự bùng nổ của khách du lịch quốc tế và các chuyến bay thẳng.',
      'Các sản phẩm căn hộ và biệt thự có pháp lý hoàn chỉnh, quản lý vận hành chuyên nghiệp mang lại tỷ suất khai thác cho thuê ổn định 10-12%/năm.'
    ],
    views: 1950
  },
  {
    id: 2,
    title: 'Kinh Nghiệm Thẩm Định Pháp Lý Sổ Đỏ Và Quy Hoạch Khi Mua Nhà Đất',
    slug: 'kinh-nghiem-tham-dinh-phap-ly-so-do-quy-hoach',
    date: '25/08/2026',
    author: 'Luật Sư BĐS WintLand',
    category: 'Pháp Lý',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    excerpt: 'Những bước quan trọng cần kiểm tra trước khi đặt cọc để tránh rủi ro vướng quy hoạch treo hoặc tranh chấp ranh giới.',
    content: [
      'Kiểm tra trích lục địa chính tại Văn phòng Đăng ký Đất đai là bước tiên quyết để xác nhận hiện trạng sử dụng đất thực tế.',
      'WintLand hỗ trợ khách hàng kiểm tra quy hoạch 1/500 và công chứng hợp đồng mua bán hoàn toàn miễn phí.'
    ],
    views: 2400
  },
  {
    id: 3,
    title: 'Bí Quyết Thiết Kế Nội Thất Tối Ưu Diện Tích Cho Căn Hộ Chung Cư Nhỏ',
    slug: 'bi-quyet-thiet-ke-noi-that-toi-uu-dien-tich',
    date: '22/08/2026',
    author: 'Kiến Trúc Sư WintLand',
    category: 'Không Gian Sống',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    excerpt: 'Ứng dụng nội thất thông minh đa năng và tone màu sáng giúp nhân đôi không gian sống cho căn hộ từ 45m2 đến 70m2.',
    content: [
      'Sử dụng vách kính ngăn không gian và giường ngủ kết hợp tủ chứa đồ là giải pháp hoàn hảo cho lối sống hiện đại tinh gọn.'
    ],
    views: 1420
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
  if (clean === 'gioi-thieu' || clean === 'about') return { page: 'about', propSlug: '', artSlug: '' };
  if (clean === 'bat-dong-san-ban' || clean === 'for-sale') return { page: 'for-sale', propSlug: '', artSlug: '' };
  if (clean === 'cho-thue' || clean === 'for-rent') return { page: 'for-rent', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'dang-tin' || clean === 'post-listing') return { page: 'post-listing', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS14Template({
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

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS14_PROPERTIES.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS14_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS14_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS14_NEWS[0];
  });

  // Dynamic Options for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS14_PROPERTIES.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableCities = useMemo(() => {
    const set = new Set(BDS14_PROPERTIES.map(p => p.city).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Search Filter States
  const [activeSearchTab, setActiveSearchTab] = useState<'all' | 'ban' | 'thue'>('all');
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterArea, setFilterArea] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Forms
  const [postForm, setPostForm] = useState({ name: '', phone: '', title: '', type: 'Nhà Phố', city: 'Hà Nội', price: '', area: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-14';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS14_PROPERTIES.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS14_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'for-sale') urlSlug = 'bat-dong-san-ban';
    else if (page === 'for-rent') urlSlug = 'cho-thue';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'post-listing') urlSlug = 'dang-tin';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (prop: PropertyItem) => {
    setSelectedProperty(prop);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.name || !postForm.phone || !postForm.title) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và tiêu đề tin đăng!');
      return;
    }
    showToast(`🎉 Tiếp nhận tin đăng thành công từ ${postForm.name}! Ban biên tập WintLand sẽ duyệt tin trong vòng 15 phút.`);
    setPostForm({ name: '', phone: '', title: '', type: 'Nhà Phố', city: 'Hà Nội', price: '', area: '' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`🎉 Đã đăng ký nhận bản tin BĐS thành công với email: ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return BDS14_PROPERTIES.filter(p => {
      if (activeSearchTab !== 'all' && p.category !== activeSearchTab) return false;
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }
      if (filterCity !== 'all') {
        const c = filterCity.toLowerCase();
        const loc = ((p.city || '') + ' ' + (p.location || '')).toLowerCase();
        if (!loc.includes(c) && !c.includes((p.city || '').toLowerCase())) return false;
      }

      if (filterPrice === 'under-4' && p.priceNum >= 4) return false;
      if (filterPrice === '4-8' && (p.priceNum < 4 || p.priceNum > 8)) return false;
      if (filterPrice === 'above-8' && p.priceNum <= 8) return false;

      if (filterArea === 'under-80' && p.areaNum >= 80) return false;
      if (filterArea === '80-150' && (p.areaNum < 80 || p.areaNum > 150)) return false;
      if (filterArea === 'above-150' && p.areaNum <= 150) return false;

      return true;
    });
  }, [activeSearchTab, filterType, filterCity, filterPrice, filterArea]);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. HEADER & TOP MICROBAR
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      
      {/* Top Microbar Lime */}
      <div className="bg-[#4D7C0F] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between text-[11px]`}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-[#BEF264]" /> info@wintland.vn
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5 font-bold">
              <Phone size={13} className="text-[#BEF264] animate-pulse" /> Hotline: 0919 006 030
            </span>
          </div>
          <div className="text-lime-100 font-bold uppercase tracking-wider">
            SÀN GIAO DỊCH VÀ PHÂN PHỐI BẤT ĐỘNG SẢN TOÀN QUỐC WINTLAND
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo WintLand */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#84CC16] via-[#65A30D] to-[#4D7C0F] rounded-sm flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shrink-0">
            <Home size={18} className="text-white" />
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-black text-[#4D7C0F] tracking-tight block leading-none truncate">
              WINT<span className="text-slate-900">LAND</span>
            </span>
            <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5 truncate">
              REAL ESTATE PLATFORM
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'about' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('for-sale')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'for-sale' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Bất Động Sản Bán
          </button>
          <button 
            onClick={() => navigate('for-rent')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'for-rent' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Cho Thuê
          </button>
          <button 
            onClick={() => navigate('projects')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Dự Án
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#65A30D] font-extrabold border-b-2 border-[#65A30D]' : 'hover:text-[#65A30D]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA Button Đăng Tin */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => navigate('post-listing')}
            className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-[#84CC16] to-[#65A30D] hover:from-[#65A30D] text-white text-xs font-black rounded-sm shadow-md uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 transition cursor-pointer items-center gap-1.5"
          >
            <PlusCircle size={14} />
            <span>ĐĂNG TIN</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-sm bg-slate-100 text-slate-800 xl:hidden hover:bg-slate-200 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Giới Thiệu</button>
            <button onClick={() => navigate('for-sale')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Nhà Đất Bán</button>
            <button onClick={() => navigate('for-rent')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Cho Thuê</button>
            <button onClick={() => navigate('projects')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Dự Án</button>
            <button onClick={() => navigate('post-listing')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Đăng Tin</button>
            <button onClick={() => navigate('news')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-lime-50 hover:text-lime-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO BANNER & SEARCH BAR (LIME BACKGROUND)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroAndSearch = () => (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
          alt="WintLand Hero"
          onError={handleImgError}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className={`relative z-20 ${MAX_W} mx-auto px-4 w-full text-center space-y-4`}>
          <span className="px-4 py-1 rounded-sm bg-white/20 text-[#BEF264] text-xs font-bold uppercase tracking-widest inline-block border border-white/30 backdrop-blur-sm">
            NỀN TẢNG BẤT ĐỘNG SẢN THÔNG MINH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight drop-shadow-lg">
            TÌM KIẾM BẤT ĐỘNG SẢN MƠ ƯỚC
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-medium">
            Hàng ngàn sản phẩm nhà phố, biệt thự, căn hộ cao cấp và đất nền sinh lời được kiểm duyệt pháp lý minh bạch 100%.
          </p>
        </div>
      </div>

      {/* Lime Green Filter Container */}
      <div className="bg-[#65A30D] py-6 px-4">
        <div className={`${MAX_W} mx-auto space-y-4`}>
          
          {/* Tabs Bán / Thuê */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveSearchTab('all')}
              className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'all' ? 'bg-white text-[#4D7C0F] shadow-md font-extrabold' : 'bg-black/20 text-white hover:bg-black/30'}`}
            >
              TẤT CẢ ({BDS14_PROPERTIES.length})
            </button>
            <button
              onClick={() => setActiveSearchTab('ban')}
              className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'ban' ? 'bg-white text-[#4D7C0F] shadow-md font-extrabold' : 'bg-black/20 text-white hover:bg-black/30'}`}
            >
              BẤT ĐỘNG SẢN BÁN
            </button>
            <button
              onClick={() => setActiveSearchTab('thue')}
              className={`px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'thue' ? 'bg-white text-[#4D7C0F] shadow-md font-extrabold' : 'bg-black/20 text-white hover:bg-black/30'}`}
            >
              CHO THUÊ
            </button>
          </div>

          {/* 4 Select Dropdowns + Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-sm focus:outline-none font-medium shadow-sm"
            >
              <option value="all">Loại Bất Động Sản (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-sm focus:outline-none font-medium shadow-sm"
            >
              <option value="all">Tỉnh / Thành Phố (Tất cả)</option>
              {availableCities.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
              className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-sm focus:outline-none font-medium shadow-sm"
            >
              <option value="all">Mức Giá (Tất cả)</option>
              <option value="under-4">Dưới 4 Tỷ</option>
              <option value="4-8">4 - 8 Tỷ</option>
              <option value="above-8">Trên 8 Tỷ</option>
            </select>

            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-sm focus:outline-none font-medium shadow-sm"
            >
              <option value="all">Diện Tích (Tất cả)</option>
              <option value="under-80">Dưới 80 m²</option>
              <option value="80-150">80 - 150 m²</option>
              <option value="above-150">Trên 150 m²</option>
            </select>

            <button
              onClick={() => showToast(`🔍 Đã tìm thấy ${filteredProperties.length} bất động sản phù hợp!`)}
              className="w-full py-2.5 bg-slate-950 hover:bg-black text-white font-black uppercase rounded-sm shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search size={14} />
              <span>TÌM KIẾM</span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: NHÀ ĐẤT BÁN (6 CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderForSaleSection = () => (
    <section className="py-14 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-1.5 h-6 bg-[#65A30D] rounded-sm" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            NHÀ ĐẤT BÁN
          </h2>
        </div>

        {/* 6 Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.slice(0, 6).map(prop => (
            <div key={prop.id} className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#4D7C0F] text-[10px] font-black uppercase rounded-lg shadow">
                  {prop.type}
                </span>
                <span className="absolute bottom-3 right-3 px-3 py-1 bg-[#65A30D] text-white text-xs font-black rounded-lg shadow">
                  {prop.price}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 
                  onClick={() => handleOpenProperty(prop)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#65A30D] cursor-pointer min-h-[34px]"
                >
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} className="text-[#65A30D]" /> {prop.location}</p>
                <div className="pt-2 border-t flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>🛏️ {prop.beds} PN</span>
                  <span>🚿 {prop.baths} WC</span>
                  <span>📐 {prop.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('for-sale')}
            className="px-6 py-2.5 bg-[#65A30D] hover:bg-[#4D7C0F] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow transition"
          >
            XEM THÊM NHÀ ĐẤT BÁN ›
          </button>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: GIỚI THIỆU VỀ WINTLAND (4 PILLARS & VIDEO)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAboutWintland = () => (
    <section className="py-16 bg-[#F8FAFC] border-y border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Intro Text + 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-[#65A30D] uppercase tracking-wider block">CHÀO MỪNG ĐẾN VỚI WINTLAND</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                SÀN GIAO DỊCH BẤT ĐỘNG SẢN UY TÍN HÀNG ĐẦU
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                WintLand là nền tảng công nghệ bất động sản tiên phong kết nối người mua và người bán trực tiếp, đem lại giải pháp thanh khoản nhanh chóng và an toàn tuyệt đối.
              </p>
            </div>

            {/* 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <span className="text-sm font-black text-[#4D7C0F] flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#65A30D]" /> Đa Dạng Nguồn Hàng
                </span>
                <p className="text-xs text-slate-500">Hàng ngàn sản phẩm nhà đất chính chủ cập nhật mới hàng ngày.</p>
              </div>

              <div className="p-4 rounded-sm bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <span className="text-sm font-black text-[#4D7C0F] flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#65A30D]" /> Pháp Lý Minh Bạch
                </span>
                <p className="text-xs text-slate-500">100% tin đăng đều được kiểm tra sổ đỏ và quy hoạch chuẩn xác.</p>
              </div>

              <div className="p-4 rounded-sm bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <span className="text-sm font-black text-[#4D7C0F] flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#65A30D]" /> Tư Vấn Tài Chính
                </span>
                <p className="text-xs text-slate-500">Hỗ trợ gói vay lãi suất ưu đãi từ các ngân hàng lớn.</p>
              </div>

              <div className="p-4 rounded-sm bg-white border border-slate-200 space-y-1.5 shadow-sm">
                <span className="text-sm font-black text-[#4D7C0F] flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#65A30D]" /> Hỗ Trợ 24/7
                </span>
                <p className="text-xs text-slate-500">Đội ngũ chuyên viên tư vấn tận tâm đồng hành suốt quá trình.</p>
              </div>
            </div>

            <button
              onClick={() => navigate('about')}
              className="px-6 py-2.5 bg-[#65A30D] hover:bg-[#4D7C0F] text-white font-black text-xs uppercase rounded-sm shadow transition"
            >
              XEM CHI TIẾT VỀ CHÚNG TÔI ›
            </button>
          </div>

          {/* Right Graphic / Video */}
          <div 
            onClick={() => setVideoModalOpen(true)}
            className="lg:col-span-5 relative aspect-square rounded-md overflow-hidden shadow-2xl bg-slate-900 border-4 border-white group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
              alt="WintLand Video"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-sm bg-[#65A30D] group-hover:bg-[#4D7C0F] text-white flex items-center justify-center shadow-2xl transition group-hover:scale-110">
                <Play size={24} className="ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-sm text-xs font-bold text-white text-center">
              ▶ Giới Thiệu Nền Tảng Bất Động Sản WintLand
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: NHÀ ĐẤT NỔI BẬT (6 HOT CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedSection = () => (
    <section className="py-14 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-1.5 h-6 bg-[#65A30D] rounded-sm" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            NHÀ ĐẤT NỔI BẬT
          </h2>
        </div>

        {/* 6 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS14_PROPERTIES.map(prop => (
            <div key={prop.id} className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#65A30D] text-white text-[10px] font-black uppercase rounded-lg shadow">
                  NỔI BẬT
                </span>
                <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-xs font-black rounded-lg">
                  {prop.price}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 
                  onClick={() => handleOpenProperty(prop)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#65A30D] cursor-pointer min-h-[34px]"
                >
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} className="text-[#65A30D]" /> {prop.location}</p>
                <div className="pt-2 border-t flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>🛏️ {prop.beds} PN</span>
                  <span>🚿 {prop.baths} WC</span>
                  <span>📐 {prop.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: THỊ TRƯỜNG NỔI BẬT NHẤT (5 CITIES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedMarkets = () => (
    <section className="py-14 bg-slate-50 border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-1.5 h-6 bg-[#65A30D] rounded-sm" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            THỊ TRƯỜNG NỔI BẬT NHẤT
          </h2>
        </div>

        {/* 5 City Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { city: 'Cố Đô Huế', count: '140+ Bất động sản', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
            { city: 'Đà Nẵng', count: '320+ Bất động sản', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
            { city: 'Nha Trang', count: '210+ Bất động sản', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80' },
            { city: 'Hà Nội', count: '580+ Bất động sản', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80' },
            { city: 'TP. Hồ Chí Minh', count: '650+ Bất động sản', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setFilterCity(item.city.includes('Huế') ? 'Huế' : item.city.includes('Đà Nẵng') ? 'Đà Nẵng' : item.city.includes('Nha Trang') ? 'Nha Trang' : item.city.includes('Hà Nội') ? 'Hà Nội' : 'Hồ Chí Minh');
                showToast(`📍 Đang hiển thị danh sách BĐS tại ${item.city}`);
              }}
              className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-md group cursor-pointer border border-slate-200 hover:border-[#65A30D]"
            >
              <img src={item.img} alt={item.city} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="font-black text-sm uppercase">{item.city}</span>
                <span className="text-[11px] text-lime-300 font-medium">{item.count}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: TIN TỨC BẤT ĐỘNG SẢN (3 CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-14 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-1.5 h-6 bg-[#65A30D] rounded-sm" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            TIN TỨC BẤT ĐỘNG SẢN
          </h2>
        </div>

        {/* 3 News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS14_NEWS.map(n => (
            <div key={n.id} className="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 flex flex-col justify-between group">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#65A30D] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#65A30D] cursor-pointer min-h-[34px]"
                >
                  {n.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: FOOTER 4 CỘT WINTLAND
  // ─────────────────────────────────────────────────────────────────────────
  const renderWintlandFooter = () => (
    <section id="lien-he" className="bg-[#0F172A] text-slate-300 text-xs border-t border-slate-800">
      
      {/* 3 Top Micro-Strip */}
      <div className="border-b border-slate-800 py-4 px-4 bg-[#1E293B]">
        <div className={`${MAX_W} mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs`}>
          <div className="flex items-center justify-center gap-2">
            <Phone size={14} className="text-[#84CC16]" /> Hotline: <strong className="text-white">0919 006 030</strong>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin size={14} className="text-[#84CC16]" /> 320 Đường 2/9, Hải Châu, Đà Nẵng
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail size={14} className="text-[#84CC16]" /> Email: <strong className="text-white">info@wintland.vn</strong>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-12`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <span className="text-lg font-black text-white block">WINTLAND REAL ESTATE</span>
            <p className="text-slate-400 leading-relaxed">
              Nền tảng công nghệ môi giới bất động sản uy tín, đem đến trải nghiệm giao dịch an toàn và tối ưu lợi nhuận.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">VỀ CHÚNG TÔI</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigate('about')} className="hover:text-[#84CC16]">Giới thiệu</button></li>
              <li><button onClick={() => navigate('projects')} className="hover:text-[#84CC16]">Dự án phân phối</button></li>
              <li><button onClick={() => navigate('news')} className="hover:text-[#84CC16]">Tin tức thị trường</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#84CC16]">Liên hệ</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">DỊCH VỤ</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigate('for-sale')} className="hover:text-[#84CC16]">Mua bán nhà đất</button></li>
              <li><button onClick={() => navigate('for-rent')} className="hover:text-[#84CC16]">Cho thuê căn hộ</button></li>
              <li><button onClick={() => navigate('post-listing')} className="hover:text-[#84CC16]">Đăng tin miễn phí</button></li>
              <li>Thẩm định giá bất động sản</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">ĐĂNG KÝ NHẬN TIN</h4>
            <p className="text-slate-400">Nhận thông tin các dự án mới và biến động giá thị trường hàng tuần.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn..."
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#65A30D] hover:bg-[#4D7C0F] text-white font-bold rounded-lg shrink-0"
              >
                GỬI
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#65A30D] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0F172A] text-white border border-[#84CC16] px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-[#84CC16]" /> {toastMessage}
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black rounded-md overflow-hidden max-w-3xl w-full aspect-video relative shadow-2xl border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-sm bg-white/20 text-white hover:bg-white/40"
            >
              <X size={18} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="WintLand Introduction"
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
            {renderHeroAndSearch()}
            {renderForSaleSection()}
            {renderAboutWintland()}
            {renderFeaturedSection()}
            {renderFeaturedMarkets()}
            {renderNewsSection()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderAboutWintland()}
            {renderFeaturedMarkets()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'for-sale' && (
          <main>
            {renderHeroAndSearch()}
            {renderForSaleSection()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'for-rent' && (
          <main>
            {renderHeroAndSearch()}
            {renderForSaleSection()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderFeaturedSection()}
            {renderFeaturedMarkets()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'post-listing' && (
          <main className="py-14 bg-slate-50">
            <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-md border shadow-xl space-y-4`}>
              <h1 className="text-xl font-black text-[#4D7C0F] uppercase text-center">ĐĂNG TIN BẤT ĐỘNG SẢN WINTLAND</h1>
              <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
                <input type="text" placeholder="Họ và tên..." required value={postForm.name} onChange={e => setPostForm({ ...postForm, name: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                <input type="tel" placeholder="Số điện thoại (*)..." required value={postForm.phone} onChange={e => setPostForm({ ...postForm, phone: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50 font-bold" />
                <input type="text" placeholder="Tiêu đề tin đăng..." required value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Giá mong muốn..." value={postForm.price} onChange={e => setPostForm({ ...postForm, price: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                  <input type="text" placeholder="Diện tích (m²)..." value={postForm.area} onChange={e => setPostForm({ ...postForm, area: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-[#65A30D] text-white font-black rounded-sm uppercase tracking-wider shadow">ĐĂNG TIN MIỄN PHÍ NGAY</button>
              </form>
            </div>
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderAboutWintland()}
            {renderWintlandFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('home')} className="text-xs font-bold text-lime-700">‹ Quay lại danh sách</button>
              <h1 className="text-2xl font-black text-slate-900 uppercase">{selectedProperty.title}</h1>
              <p className="text-sm font-black text-[#65A30D]">{selectedProperty.price} — Diện tích: {selectedProperty.area}</p>
              <img src={selectedProperty.image} alt="" className="w-full h-96 object-cover rounded-md shadow-xl" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-14 (WintLand — Real Estate Platform)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
