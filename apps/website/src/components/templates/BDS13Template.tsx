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
  Key, Tag, RefreshCw, PhoneCall, CheckSquare
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

export interface PropertyItem {
  gallery?: string[];
  images?: string[];
  id: string;
  title: string;
  slug: string;
  type: string;
  category: 'ban' | 'thue' | 'du-an';
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number; // in m2
  location: string;
  district: string;
  direction: string;
  image: string;
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
// BDS-13 MOCK DATA: {company?.name || 'TEMPLATESBDS'} - BẤT ĐỘNG SẢN THỦY NGUYÊN HẢI PHÒNG
// ─────────────────────────────────────────────────────────────────────────────

export const BDS13_PROPERTIES: PropertyItem[] = [
  {
    id: 'hoang-huy-new-city',
    title: 'Khu Đô Thị Hoàng Huy New City Bắc Sông Cấm Thủy Nguyên',
    slug: 'khu-do-thi-hoang-huy-new-city-bac-song-cam-thuy-nguyen',
    type: 'Khu Đô Thị Kiểu Mẫu',
    category: 'du-an',
    price: '3.85 Tỷ / Lô',
    priceNum: 3.85,
    area: '90 m²',
    areaNum: 90,
    location: 'Xã Tân Dương, TP. Thủy Nguyên, Hải Phòng',
    district: 'Tân Dương',
    direction: 'Đông Nam',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Đại dự án đô thị thông minh bậc nhất Thủy Nguyên ngay cạnh Trung tâm hành chính mới Bắc Sông Cấm và cầu Hoàng Văn Thụ.',
    specs: ['Sổ đỏ từng lô', 'Đường rộng 13.5m', 'Hạ tầng ngầm đồng bộ', 'Gần TTHC mới Hải Phòng']
  },
  {
    id: 'belhomes-vsip',
    title: 'Khu Đô Thị Belhomes Vsip Thủy Nguyên Hải Phòng',
    slug: 'khu-do-thi-belhomes-vsip-thuy-nguyen-hai-phong',
    type: 'Nhà Phố Xanh Singapore',
    category: 'du-an',
    price: '3.20 Tỷ / Căn',
    priceNum: 3.2,
    area: '75 m²',
    areaNum: 75,
    location: 'Đô thị Vsip Hải Phòng, Xã An Lư, Thủy Nguyên',
    district: 'An Lư',
    direction: 'Nam',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Khu đô thị sinh thái xanh chuẩn Singapore ngay trong lòng đại đô thị VSIP Hải Phòng với công viên hồ điều hòa 6ha.',
    specs: ['Nhà 3 tầng hoàn thiện mặt ngoài', 'An ninh 3 lớp 24/7', 'Công viên ven sông', 'Pháp lý chuẩn 100%']
  },
  {
    id: 'shophouse-hoang-huy-grand',
    title: 'Nhà Phố Thương Mại Shophouse Hoàng Huy Grand Tower',
    slug: 'nha-pho-thuong-mai-shophouse-hoang-huy-grand-tower',
    type: 'Shophouse Khối Đế',
    category: 'ban',
    price: '4.80 Tỷ / Căn',
    priceNum: 4.8,
    area: '100 m²',
    areaNum: 100,
    location: 'Đại lộ Hùng Vương, Sở Dầu, Hồng Bàng (Liền kề Thủy Nguyên)',
    district: 'Sở Dầu',
    direction: 'Đông Bắc',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Dãy shophouse thương mại sầm uất kinh doanh mọi ngành nghề ngay cửa ngõ kết nối trung tâm Hải Phòng sang Thủy Nguyên.',
    specs: ['Mặt tiền 6m', 'Vỉa hè 8m', 'Đang cho thuê 25 Tr/tháng', 'Sổ hồng lâu dài']
  },
  {
    id: 'dat-nen-bac-song-cam',
    title: 'Đất Tái Định Cư Bắc Sông Cấm Phân Lô Sổ Đỏ',
    slug: 'dat-tai-dinh-cu-bac-song-cam-phan-lo-so-do',
    type: 'Đất Nền Tái Định Cư',
    category: 'ban',
    price: '2.85 Tỷ / Lô',
    priceNum: 2.85,
    area: '60 m²',
    areaNum: 60,
    location: 'Khu TĐC Bắc Sông Cấm, Xã Dương Quan, Thủy Nguyên',
    district: 'Dương Quan',
    direction: 'Đông',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Lô đất vuông vắn tại khu tái định cư đắc địa nhất Thủy Nguyên, cách trung tâm chính trị Hải Phòng chỉ 300m.',
    specs: ['Sổ đỏ trao tay', 'Đường 12m trải nhựa', 'Khu dân trí cao', 'Xây tự do']
  },
  {
    id: 'nha-pho-thuy-duong',
    title: 'Nhà Phố Mặt Tiền Đường 359 Xã Thủy Đường Thủy Nguyên',
    slug: 'nha-pho-mat-tien-duong-359-xa-thuy-duong-thuy-nguyen',
    type: 'Nhà Mặt Phố',
    category: 'ban',
    price: '5.60 Tỷ / Căn',
    priceNum: 5.6,
    area: '110 m²',
    areaNum: 110,
    location: 'Mặt đường 359, Xã Thủy Đường, TP. Thủy Nguyên',
    district: 'Thủy Đường',
    direction: 'Tây Nam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Nhà 4 tầng kiên cố mặt phố kinh doanh đông đúc gần chợ Núi Đèo và siêu thị Lan Chi.',
    specs: ['Mặt tiền 5m', 'Kinh doanh tốt', 'Full nội thất gỗ', 'Sổ đỏ chính chủ']
  },
  {
    id: 'cho-thue-mat-bang-nui-deo',
    title: 'Cho Thuê Mặt Bằng Kinh Doanh Trung Tâm Thị Trấn Núi Đèo',
    slug: 'cho-thue-mat-bang-kinh-doanh-trung-tam-thi-tran-nui-deo',
    type: 'Mặt Bằng Cho Thuê',
    category: 'thue',
    price: '18 Triệu / Tháng',
    priceNum: 0.018,
    area: '150 m²',
    areaNum: 150,
    location: 'Đường Bạch Đằng, Thị trấn Núi Đèo, Thủy Nguyên',
    district: 'Núi Đèo',
    direction: 'Đông',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Mặt bằng thông sàn rộng 150m2 cực đẹp thích hợp mở văn phòng công chứng, showroom, phòng khám, ngân hàng.',
    specs: ['Mặt tiền 8m', 'Chỗ đỗ xe ô tô thoải mái', 'Hợp đồng dài hạn', 'Bàn giao ngay']
  }
];

export const BDS13_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Thành Phố Thủy Nguyên Chính Thức Thành Lập: Đòn Bẩy Tăng Giá BĐS Vượt Bậc',
    slug: 'thanh-pho-thuy-nguyen-chinh-thuc-thanh-lap-don-bay-tang-gia-bds',
    date: '28/08/2026',
    author: 'Đại Phát Land',
    category: 'Quy Hoạch',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Hải Phòng công bố lộ trình phát triển TP Thủy Nguyên thành trung tâm kinh tế, hành chính mới với hạ tầng nghìn tỷ.',
    content: [
      'Thành phố Thủy Nguyên trực thuộc TP Hải Phòng được định hướng là đô thị loại 3, hướng tới đô thị loại 2 và là trung tâm hành chính - chính trị mới của toàn thành phố.',
      'Sự xuất hiện của các đại đô thị như Hoàng Huy New City, Belhomes Vsip, Centa City đã tạo cú hích mạnh mẽ cho thị trường bất động sản khu vực Bắc Sông Cấm.'
    ],
    views: 1840
  },
  {
    id: 2,
    title: 'Tiến Độ Thông Xe Cầu Nguyễn Trãi Nối Trung Tâm Hải Phòng Sang Thủy Nguyên',
    slug: 'tien-do-thong-xe-cau-nguyen-trai-noi-trung-tam-sang-thuy-nguyen',
    date: '25/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Hạ Tầng',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    excerpt: 'Cây cầu dây văng quy mô hơn 6.000 tỷ đồng sắp về đích, rút ngắn thời gian di chuyển từ nội đô cũ sang Thủy Nguyên chỉ còn 5 phút.',
    content: [
      'Cầu Nguyễn Trãi cùng với cầu Hoàng Văn Thụ và cầu Bính tạo nên tam giác giao thông hoàn hảo, thúc đẩy giá trị bất động sản ven bờ sông Cấm bứt phá không ngừng.'
    ],
    views: 2450
  },
  {
    id: 3,
    title: 'Phân Tích Dòng Tiền Đầu Tư Đất Nền Tái Định Cư Bắc Sông Cấm 2026',
    slug: 'phan-tich-dong-tien-dau-tu-dat-nen-tdc-bac-song-cam',
    date: '20/08/2026',
    author: 'Chuyên Gia BĐS Hải Phòng',
    category: 'Đầu Tư',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    excerpt: 'Lý do vì sao các nhà đầu tư sành sỏi từ Hà Nội và Hải Phòng đang đổ dồn dòng tiền về khu tái định cư Dương Quan, Tân Dương.',
    content: [
      'Với biên độ tăng giá ổn định 20-30%/năm cùng tính thanh khoản cao và sổ đỏ sở hữu lâu dài, phân khúc đất nền TĐC tiếp tục là kênh trú ẩn dòng tiền an toàn nhất.'
    ],
    views: 1290
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
  if (clean === 'nha-dat-ban' || clean === 'for-sale') return { page: 'for-sale', propSlug: '', artSlug: '' };
  if (clean === 'nha-dat-cho-thue' || clean === 'for-rent') return { page: 'for-rent', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'ky-gui' || clean === 'consignment') return { page: 'consignment', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS13Template({
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
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS13_PROPERTIES.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS13_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS13_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS13_NEWS[0];
  });

  // Dynamic Options for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS13_PROPERTIES.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableDistricts = useMemo(() => {
    const set = new Set(BDS13_PROPERTIES.map(p => p.district).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // UI Interactive States
  const [activeSearchTab, setActiveSearchTab] = useState<'all' | 'ban' | 'thue' | 'du-an'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterArea, setFilterArea] = useState('all');
  const [filterDirection, setFilterDirection] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Forms
  const [consignmentForm, setConsignmentForm] = useState({ name: '', phone: '', address: '', type: 'Nhà Đất Bán', price: '', note: '' });
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-13';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS13_PROPERTIES.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS13_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'for-sale') urlSlug = 'nha-dat-ban';
    else if (page === 'for-rent') urlSlug = 'nha-dat-cho-thue';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'consignment') urlSlug = 'ky-gui';
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

  const handleConsignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consignmentForm.name || !consignmentForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ ký gửi!');
      return;
    }
    showToast(`🎉 Tiếp nhận hồ sơ ký gửi thành công từ ${consignmentForm.name} (${consignmentForm.phone}). Chuyên viên Đại Phát Land sẽ liên hệ thẩm định ngay!`);
    setConsignmentForm({ name: '', phone: '', address: '', type: 'Nhà Đất Bán', price: '', note: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert('Vui lòng điền họ tên và số điện thoại!');
      return;
    }
    showToast(`🎉 Cảm ơn ${contactForm.name}. Yêu cầu tư vấn bất động sản Thủy Nguyên đã được chuyển đến ban chuyên môn.`);
    setContactForm({ name: '', phone: '', email: '', message: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return BDS13_PROPERTIES.filter(p => {
      if (activeSearchTab !== 'all' && p.category !== activeSearchTab) return false;
      if (searchKeyword && !p.title.toLowerCase().includes(searchKeyword.toLowerCase()) && !p.location.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }
      if (filterDistrict !== 'all') {
        const d = filterDistrict.toLowerCase();
        const loc = ((p.district || '') + ' ' + (p.location || '')).toLowerCase();
        if (!loc.includes(d) && !d.includes((p.district || '').toLowerCase())) return false;
      }
      if (filterDirection !== 'all' && p.direction !== filterDirection) return false;
      
      if (filterPrice === 'under-3' && p.priceNum >= 3) return false;
      if (filterPrice === '3-5' && (p.priceNum < 3 || p.priceNum > 5)) return false;
      if (filterPrice === 'above-5' && p.priceNum <= 5) return false;

      if (filterArea === 'under-80' && p.areaNum >= 80) return false;
      if (filterArea === '80-120' && (p.areaNum < 80 || p.areaNum > 120)) return false;
      if (filterArea === 'above-120' && p.areaNum <= 120) return false;

      return true;
    });
  }, [activeSearchTab, searchKeyword, filterType, filterDistrict, filterPrice, filterArea, filterDirection]);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP MICROBAR & HEADER
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      
      {/* Top Microbar Navy */}
      <div className="bg-[#0B3056] text-white text-xs py-1.5 px-4 hidden md:block border-b border-white/10">
        <div className={`${MAX_W} mx-auto flex items-center justify-between text-[11px]`}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Mail size={13} className="text-[#F97316]" /> info@templatebds.com
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Phone size={13} className="text-[#F97316] animate-pulse" /> Hotline 24/7: 0917.85.88.85 — 0919 006 030
            </span>
          </div>
          <div className="text-amber-300 font-bold uppercase tracking-wider">
            SÀN GIAO DỊCH BẤT ĐỘNG SẢN {company?.name || 'TEMPLATESBDS'} — THÀNH PHỐ THỦY NGUYÊN HẢI PHÒNG
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo Đại Phát Land */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0284C7] via-[#0F4C81] to-[#0B3056] rounded-sm flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shrink-0">
            <Building2 size={20} className="text-[#F97316]" />
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-black text-[#0F4C81] tracking-tight block leading-none truncate">
              ĐẠI PHÁT <span className="text-[#F97316]">LAND</span>
            </span>
            <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5 truncate">
              BẤT ĐỘNG SẢN THỦY NGUYÊN HẢI PHÒNG
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'about' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('for-sale')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'for-sale' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Nhà Đất Bán
          </button>
          <button 
            onClick={() => navigate('for-rent')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'for-rent' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Nhà Đất Cho Thuê
          </button>
          <button 
            onClick={() => navigate('projects')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Dự Án
          </button>
          <button 
            onClick={() => navigate('consignment')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'consignment' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Ký Gửi
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#0F4C81] font-extrabold border-b-2 border-[#0F4C81]' : 'hover:text-[#0F4C81]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-orange-50 border border-orange-200 text-[#EA580C] text-xs font-black whitespace-nowrap shrink-0 hover:bg-orange-100 transition"
          >
            <Phone size={13} className="text-[#EA580C] animate-bounce shrink-0" />
            <span>0917.85.88.85</span>
          </a>
          <button
            onClick={() => navigate('consignment')}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] text-white text-xs font-black rounded-sm shadow-md uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 transition cursor-pointer"
          >
            Ký Gửi Nhà Đất ›
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
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Giới Thiệu</button>
            <button onClick={() => navigate('for-sale')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Nhà Đất Bán</button>
            <button onClick={() => navigate('for-rent')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Cho Thuê</button>
            <button onClick={() => navigate('projects')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Dự Án</button>
            <button onClick={() => navigate('consignment')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Ký Gửi</button>
            <button onClick={() => navigate('news')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO BANNER & SLOGAN
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24 px-4">
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
        alt="Hai Phong Skyline"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3056] via-[#0F4C81]/80 to-black/60" />

      <div className={`relative z-20 ${MAX_W} mx-auto text-center space-y-4`}>
        <span className="px-4 py-1 rounded-sm bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest inline-block border border-white/20">
          HỆ THỐNG PHÂN PHỐI BẤT ĐỘNG SẢN CHUYÊN NGHIỆP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#F97316] tracking-tight drop-shadow-md">
          BẤT ĐỘNG SẢN THỦY NGUYÊN
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-medium">
          PHÂN PHỐI DỰ ÁN ĐẤT NỀN, NHÀ PHỐ & TÁI ĐỊNH CƯ TRỌNG ĐIỂM THÀNH PHỐ THỦY NGUYÊN HẢI PHÒNG
        </p>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. HERO SEARCH FILTER BAR (6 CRITERIA)
  // ─────────────────────────────────────────────────────────────────────────
  const renderSearchFilter = () => (
    <section className="relative z-30 -mt-8 px-4">
      <div className={`${MAX_W} mx-auto bg-[#0B3056] p-6 sm:p-8 rounded-md shadow-2xl border border-white/15 text-white space-y-4`}>
        
        {/* Search Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSearchTab('all')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'all' ? 'bg-[#F97316] text-white shadow' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            TẤT CẢ
          </button>
          <button
            onClick={() => setActiveSearchTab('ban')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'ban' ? 'bg-[#F97316] text-white shadow' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            NHÀ ĐẤT BÁN
          </button>
          <button
            onClick={() => setActiveSearchTab('thue')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'thue' ? 'bg-[#F97316] text-white shadow' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            CHO THUÊ
          </button>
          <button
            onClick={() => setActiveSearchTab('du-an')}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeSearchTab === 'du-an' ? 'bg-[#F97316] text-white shadow' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
          >
            DỰ ÁN NỔI BẬT
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Keyword */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Nhập tên dự án, khu vực..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="w-full bg-white text-slate-900 pl-9 pr-3 py-2.5 rounded-sm focus:outline-none font-medium"
            />
          </div>

          {/* District / Ward */}
          <select
            value={filterDistrict}
            onChange={e => setFilterDistrict(e.target.value)}
            className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-sm focus:outline-none font-medium"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Khu Vực (Tất Cả)</option>
            <option className="text-slate-900 bg-white font-medium" value="Tân Dương">Xã Tân Dương</option>
            <option className="text-slate-900 bg-white font-medium" value="An Lư">Xã An Lư (Vsip)</option>
            <option className="text-slate-900 bg-white font-medium" value="Dương Quan">Xã Dương Quan (Bắc Sông Cấm)</option>
            <option className="text-slate-900 bg-white font-medium" value="Thủy Đường">Xã Thủy Đường</option>
            <option className="text-slate-900 bg-white font-medium" value="Núi Đèo">Thị Trấn Núi Đèo</option>
            <option className="text-slate-900 bg-white font-medium" value="Sở Dầu">Quận Hồng Bàng</option>
          </select>

          {/* Price Range */}
          <select
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
            className="w-full bg-white text-slate-900 px-3 py-2.5 rounded-sm focus:outline-none font-medium"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Mức Giá (Tất Cả)</option>
            <option className="text-slate-900 bg-white font-medium" value="under-3">Dưới 3 Tỷ</option>
            <option className="text-slate-900 bg-white font-medium" value="3-5">3 - 5 Tỷ</option>
            <option className="text-slate-900 bg-white font-medium" value="above-5">Trên 5 Tỷ</option>
          </select>

          {/* Search Action */}
          <button
            onClick={() => showToast(`🔍 Tìm thấy ${filteredProperties.length} bất động sản phù hợp tiêu chí!`)}
            className="w-full py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-black uppercase rounded-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search size={15} />
            <span>TÌM KIẾM ({filteredProperties.length})</span>
          </button>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 1: GIỚI THIỆU DỰ ÁN TRỌNG ĐIỂM (2 BLOCKS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedProjects = () => (
    <section className="py-16 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-block p-2 rounded-sm bg-blue-50 text-[#0F4C81] mb-1">
            <Building2 size={24} />
          </div>
          <h2 className="text-2xl font-black text-[#0F4C81] uppercase tracking-wider">
            GIỚI THIỆU DỰ ÁN TRỌNG ĐIỂM
          </h2>
          <p className="text-xs text-slate-500">
            Đại Phát Land tự hào là đơn vị phân phối F1 các đại dự án quy mô biểu tượng tại Thành phố Thủy Nguyên.
          </p>
        </div>

        {/* 2 Big Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div 
            onClick={() => handleOpenProperty(BDS13_PROPERTIES[0])}
            className="relative rounded-md overflow-hidden shadow-xl group cursor-pointer border border-slate-200"
          >
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80" alt="Hoang Huy" className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[10px] font-black uppercase text-[#F97316] bg-black/50 px-2.5 py-1 rounded-md inline-block w-max">DỰ ÁN TIÊU BIỂU</span>
              <h3 className="text-base sm:text-lg font-black uppercase">ĐẠI ĐÔ THỊ HOÀNG HUY NEW CITY BẮC SÔNG CẤM</h3>
              <p className="text-xs text-slate-300">Quy mô 65ha liền kề Trung tâm chính trị - hành chính mới Hải Phòng.</p>
            </div>
          </div>

          <div 
            onClick={() => handleOpenProperty(BDS13_PROPERTIES[1])}
            className="relative rounded-md overflow-hidden shadow-xl group cursor-pointer border border-slate-200"
          >
            <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80" alt="Belhomes" className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[10px] font-black uppercase text-[#F97316] bg-black/50 px-2.5 py-1 rounded-md inline-block w-max">DỰ ÁN XANH SINGAPORE</span>
              <h3 className="text-base sm:text-lg font-black uppercase">KHU ĐÔ THỊ BELHOMES VSIP HẢI PHÒNG</h3>
              <p className="text-xs text-slate-300">Khu đô thị sinh thái xanh chuẩn Singapore công viên ven sông 6ha.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 2: DỰ ÁN MỚI NỔI BẬT (3 HOT CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHotProjects = () => (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-[#0F4C81] uppercase tracking-wider">
            DỰ ÁN MỚI NỔI BẬT
          </h2>
          <p className="text-xs text-slate-500">
            Tổng hợp danh sách các dự án bất động sản có tiềm năng tăng trưởng sinh lời cao nhất Thủy Nguyên.
          </p>
        </div>

        {/* 3 Hot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS13_PROPERTIES.slice(0, 3).map(prop => (
            <div key={prop.id} className="bg-white rounded-md overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 right-3 px-3 py-1 bg-[#EA580C] text-white text-[10px] font-black uppercase rounded-sm shadow">
                  HOT
                </span>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#F97316] uppercase">{prop.type}</span>
                <h3 
                  onClick={() => handleOpenProperty(prop)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0F4C81] cursor-pointer min-h-[34px]"
                >
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} className="text-[#0F4C81]" /> {prop.location}</p>
                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm font-black text-[#EA580C]">{prop.price}</span>
                  <button
                    onClick={() => handleOpenProperty(prop)}
                    className="px-3 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition"
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 3: BANNER QUẢNG CÁO TÀI TRỢ BẮC SÔNG CẤM
  // ─────────────────────────────────────────────────────────────────────────
  const renderPromoBanner = () => (
    <section className="py-8 bg-white px-4">
      <div className={`${MAX_W} mx-auto bg-gradient-to-r from-[#0F4C81] via-[#0284C7] to-[#0F4C81] text-white p-6 sm:p-8 rounded-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20`}>
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest bg-black/20 px-3 py-1 rounded-sm inline-block">
            CƠ HỘI ĐẦU TƯ ĐỢT 1
          </span>
          <h3 className="text-lg sm:text-2xl font-black uppercase">
            SỞ HỮU NGAY PHÂN LÔ TÁI ĐỊNH CƯ BẮC SÔNG CẤM
          </h3>
          <p className="text-xs text-slate-200">
            Vị trí đắc địa cách trung tâm hành chính Hải Phòng 300m — Sổ đỏ từng lô — Giá chỉ từ <strong>30 Triệu/m²</strong>.
          </p>
        </div>
        <a
          href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
          className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition hover:scale-105 shrink-0 whitespace-nowrap"
        >
          Hotline: 0917.85.88.85
        </a>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 4: BẤT ĐỘNG SẢN THỦY NGUYÊN (4-CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderThuyNguyenListings = () => (
    <section className="py-12 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-black text-[#0F4C81] uppercase tracking-wider">
            BẤT ĐỘNG SẢN THỦY NGUYÊN
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"><ChevronLeft size={16} /></button>
            <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BDS13_PROPERTIES.map(prop => (
            <div key={prop.id} className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <img src={prop.image} alt={prop.title} className="w-full h-40 object-cover group-hover:scale-105 transition" />
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-[#F97316] uppercase">{prop.type}</span>
                <h3 
                  onClick={() => handleOpenProperty(prop)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0F4C81] cursor-pointer min-h-[34px]"
                >
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-500">{prop.location}</p>
                <div className="pt-2 border-t flex justify-between items-center text-xs">
                  <span className="font-black text-[#EA580C]">{prop.price}</span>
                  <button onClick={() => handleOpenProperty(prop)} className="px-2.5 py-1 bg-blue-50 text-[#0F4C81] font-bold rounded hover:bg-blue-100">
                    Xem ›
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 5: VÌ SAO CHỌN BĐS THỦY NGUYÊN (6 ADVANTAGES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderWhyChooseUs = () => (
    <section className="py-16 bg-[#0B3056] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-black uppercase text-amber-300 tracking-wider">
            VÌ SAO CHỌN BĐS THỦY NGUYÊN — {company?.name || 'TEMPLATESBDS'}
          </h2>
          <p className="text-xs text-slate-300">
            Chúng tôi cam kết mang lại giá trị bền vững và lợi nhuận tối đa cho mọi khách hàng và đối tác đầu tư.
          </p>
        </div>

        {/* 6 Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'ĐẤT LÀNH VƯỢNG KHÍ', desc: 'Thành phố mới Thủy Nguyên quy hoạch trung tâm hành chính mới của TP Hải Phòng.' },
            { title: 'THÔNG TIN MINH BẠCH 100%', desc: 'Toàn bộ bất động sản đều có trích lục bản đồ địa chính và quy hoạch chuẩn.' },
            { title: 'KẾT NỐI GIAO THÔNG VÀNG', desc: 'Hạ tầng đồng bộ với 5 cây cầu lớn nối thẳng sang trung tâm nội đô Hải Phòng.' },
            { title: 'HỖ TRỢ PHÁP LÝ TỐI ĐA', desc: 'Hỗ trợ thủ tục công chứng, sang tên sổ đỏ và đo đạc miễn phí cho khách hàng.' },
            { title: 'DỊCH VỤ KÝ GỬI NHANH CHÓNG', desc: 'Thanh khoản cực nhanh nhờ mạng lưới hơn 50.000 khách hàng tiềm năng.' },
            { title: 'TƯ VẤN TẬN TÂM 24/7', desc: 'Đội ngũ chuyên viên am hiểu sâu sắc thị trường Thủy Nguyên đồng hành trọn đời.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-md bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition">
              <span className="w-8 h-8 rounded-sm bg-[#F97316] text-white font-black text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <h3 className="text-sm font-black text-white uppercase">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed break-words">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 6: TIN TỨC & SỰ KIỆN (NEWS & AD POSTER)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsAndPoster = () => (
    <section id="tin-tuc" className="py-14 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Heading */}
        <div className="border-b pb-3">
          <h2 className="text-lg font-black text-[#0F4C81] uppercase tracking-wider">
            TIN TỨC & SỰ KIỆN THỊ TRƯỜNG THỦY NGUYÊN
          </h2>
        </div>

        {/* 3 Columns: 2 News Col + 1 Ad Poster Col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {BDS13_NEWS.map(n => (
              <div key={n.id} className="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 flex flex-col justify-between group">
                <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition" />
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase">{n.category} • {n.date}</span>
                  <h3 
                    onClick={() => handleOpenArticle(n)}
                    className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0F4C81] cursor-pointer"
                  >
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{n.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ad Poster */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#0F4C81] to-[#0B3056] text-white p-6 rounded-md flex flex-col justify-between space-y-4 text-center">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-[#F97316] bg-white/10 px-3 py-1 rounded-sm inline-block">
                DỰ ÁN ĐẶC QUYỀN
              </span>
              <h3 className="text-xl font-black uppercase text-amber-300">HOÀNG HUY NEW CITY</h3>
              <p className="text-xs text-slate-300">Biểu tượng phồn hoa tại Trung tâm hành chính mới Bắc Sông Cấm.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Hoang Huy Ad" className="w-full h-40 object-cover rounded-sm border border-white/20" />
            <a
              href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
              className="py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs uppercase rounded-sm shadow transition"
            >
              HOTLINE: 0917.85.88.85
            </a>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 7: FOOTER 5 CỘT {company?.name || 'TEMPLATESBDS'}
  // ─────────────────────────────────────────────────────────────────────────
  const renderDaiPhatFooter = () => (
    <section id="lien-he" className="py-14 bg-[#0B3056] text-slate-300 text-xs border-t border-white/10">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
            <p className="text-slate-400">Sàn BĐS Đại Phát Land chuyên phân phối nhà đất và dự án trọng điểm tại Thủy Nguyên Hải Phòng.</p>
            <p>Hotline: <strong className="text-[#F97316]">0917.85.88.85</strong></p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">CHÍNH SÁCH</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Quy định giao dịch</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản dịch vụ</li>
              <li>Quy trình ký gửi</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">NHÀ ĐẤT BÁN</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Đất nền Thủy Nguyên</li>
              <li>Nhà phố Tân Dương</li>
              <li>TĐC Bắc Sông Cấm</li>
              <li>Đất vườn Thủy Đường</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">CHO THUÊ</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Mặt bằng Núi Đèo</li>
              <li>Kho xưởng Thủy Nguyên</li>
              <li>Nhà nguyên căn Vsip</li>
              <li>Văn phòng đại diện</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">DỰ ÁN NỔI BẬT</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Hoàng Huy New City</li>
              <li>Belhomes Vsip</li>
              <li>Centa City Hải Phòng</li>
              <li>Sakura Garden</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0F4C81] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B3056] text-white border border-[#F97316] px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-[#F97316]" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHero()}
            {renderSearchFilter()}
            {renderFeaturedProjects()}
            {renderHotProjects()}
            {renderPromoBanner()}
            {renderThuyNguyenListings()}
            {renderWhyChooseUs()}
            {renderNewsAndPoster()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderHero()}
            {renderWhyChooseUs()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'for-sale' && (
          <main>
            {renderSearchFilter()}
            {renderThuyNguyenListings()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'for-rent' && (
          <main>
            {renderSearchFilter()}
            {renderThuyNguyenListings()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderFeaturedProjects()}
            {renderHotProjects()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'consignment' && (
          <main className="py-14 bg-slate-50">
            <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-md border shadow-xl space-y-4`}>
              <h1 className="text-xl font-black text-[#0F4C81] uppercase text-center">KÝ GỬI BẤT ĐỘNG SẢN THỦY NGUYÊN</h1>
              <form onSubmit={handleConsignmentSubmit} className="space-y-3 text-xs">
                <input type="text" placeholder="Họ và tên chủ sở hữu..." required value={consignmentForm.name} onChange={e => setConsignmentForm({ ...consignmentForm, name: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                <input type="tel" placeholder="Số điện thoại (*)..." required value={consignmentForm.phone} onChange={e => setConsignmentForm({ ...consignmentForm, phone: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50 font-bold" />
                <input type="text" placeholder="Địa chỉ bất động sản..." value={consignmentForm.address} onChange={e => setConsignmentForm({ ...consignmentForm, address: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                <input type="text" placeholder="Giá mong muốn bán / cho thuê..." value={consignmentForm.price} onChange={e => setConsignmentForm({ ...consignmentForm, price: e.target.value })} className="w-full p-3 rounded-sm border bg-slate-50" />
                <button type="submit" className="w-full py-3.5 bg-[#F97316] text-white font-black rounded-sm uppercase tracking-wider shadow">GỬI YÊU CẦU KÝ GỬI</button>
              </form>
            </div>
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsAndPoster()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderWhyChooseUs()}
            {renderDaiPhatFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('home')} className="text-xs font-bold text-blue-600">‹ Quay lại danh sách</button>
              <h1 className="text-2xl font-black text-[#0F4C81] uppercase">{selectedProperty.title}</h1>
              <p className="text-sm font-black text-[#EA580C]">{selectedProperty.price} — Diện tích: {selectedProperty.area}</p>
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-13 (Đại Phát Land — BĐS Thủy Nguyên Hải Phòng)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
