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
  Trees, Leaf, Droplets, Sun, Wind, Navigation
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
  block: string; // 'Block A - Park View', 'Block B - Lake View', 'Block C - Garden View', 'Block D - Sky Palace'
  type: string; // '1 Phòng Ngủ', '2 Phòng Ngủ', '3 Phòng Ngủ', 'Duplex View Hồ', 'Penthouse Eco'
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
// BDS-20 MOCK DATA: {company?.name || 'TEMPLATESBDS'} (KHU ĐÔ THỊ CÔNG VIÊN XANH & HỒ ĐIỀU HÒA)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS20_UNITS: UnitItem[] = [
  {
    id: 'can-1pn-block-a-parkview',
    title: 'Căn Hộ 1 Phòng Ngủ Eco Suite Block A View Công Viên Trung Tâm',
    code: 'MPV-A0805',
    slug: 'can-ho-1-phong-ngu-block-a-view-cong-vien',
    block: 'Block A - Park View',
    type: '1 Phòng Ngủ',
    floor: 'Tầng 08',
    price: '2.45 Tỷ VNĐ',
    priceNum: 2.45,
    area: '48 m²',
    areaNum: 48,
    beds: 1,
    baths: 1,
    view: 'Trực diện công viên cây xanh 100ha',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Thiết kế thông minh đón gió tự nhiên 100%, ban công kính rộng ngắm trọn vẹn cảnh quan xanh mát lành.',
    specs: ['Ban công ngắm công viên', 'Thiết bị Toto cao cấp', 'Kính Low-E cách âm', 'Sở hữu lâu dài']
  },
  {
    id: 'can-2pn-block-b-lakeview',
    title: 'Căn Hộ Góc 2 Phòng Ngủ Block B View Trực Diện Hồ Điều Hòa Sinh Thái',
    code: 'MPV-B1502',
    slug: 'can-ho-goc-2-phong-ngu-block-b-view-ho',
    block: 'Block B - Lake View',
    type: '2 Phòng Ngủ',
    floor: 'Tầng 15',
    price: '3.85 Tỷ VNĐ',
    priceNum: 3.85,
    area: '72 m²',
    areaNum: 72,
    beds: 2,
    baths: 2,
    view: 'View mặt nước hồ điều hòa & Thác tràn',
    direction: 'Hướng Nam - Đông Nam',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn góc 2 mặt thoáng view trọn vẹn mặt hồ gợn sóng trong lành, không gian thoáng đãng nuôi dưỡng sức khỏe gia đình.',
    specs: ['Căn góc 2 mặt thoáng', 'Phòng ngủ Master view hồ', 'Bàn giao sàn gỗ An Cường', 'Tặng gói Smart Home']
  },
  {
    id: 'can-3pn-block-c-gardenview',
    title: 'Căn Hộ 3 Phòng Ngủ Gia Đình Block C View Vườn Thiền Nhật Bản',
    code: 'MPV-C2008',
    slug: 'can-ho-3-phong-ngu-block-c-view-vuon-thien',
    block: 'Block C - Garden View',
    type: '3 Phòng Ngủ',
    floor: 'Tầng 20',
    price: '5.20 Tỷ VNĐ',
    priceNum: 5.2,
    area: '98 m²',
    areaNum: 98,
    beds: 3,
    baths: 2,
    view: 'View vườn thiền Zen Garden & Đồi cỏ hoa',
    direction: 'Hướng Đông Bắc',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Không gian sống lý tưởng cho gia đình 3 thế hệ, phòng khách rộng hơn 40m² nối liền khu vực bếp và ban công ngắm hoa.',
    specs: ['Bếp đảo phong cách châu Âu', 'Hệ thống lọc nước sạch', 'Miễn phí 2 năm phí dịch vụ', 'Hỗ trợ vay 70%']
  },
  {
    id: 'duplex-block-d-skypalace',
    title: 'Căn Hộ Duplex Thông Tầng Block D Sky Palace View Triệu Đô',
    code: 'MPV-D2801',
    slug: 'can-ho-duplex-thong-tang-block-d-sky-palace',
    block: 'Block D - Sky Palace',
    type: 'Duplex View Hồ',
    floor: 'Tầng 28 - 29',
    price: '9.50 Tỷ VNĐ',
    priceNum: 9.5,
    area: '168 m²',
    areaNum: 168,
    beds: 4,
    baths: 4,
    view: 'View 360 độ công viên hồ điều hòa và thành phố',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Tuyệt tác duplex thông tầng cao 6m xa hoa bậc nhất, sở hữu ban công vườn treo riêng biệt ngắm trọn vẹn cảnh sắc thiên nhiên.',
    specs: ['Thông tầng cao 6.2m', 'Sân vườn ban công 35m²', 'Thang máy riêng bảo mật', 'Sổ hồng vĩnh viễn']
  },
  {
    id: 'can-2pn-block-a-parkview',
    title: 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Block A Park View',
    code: 'MPV-A1203',
    slug: 'can-ho-2-phong-ngu-tieu-chuan-block-a',
    block: 'Block A - Park View',
    type: '2 Phòng Ngủ',
    floor: 'Tầng 12',
    price: '3.35 Tỷ VNĐ',
    priceNum: 3.35,
    area: '65 m²',
    areaNum: 65,
    beds: 2,
    baths: 2,
    view: 'Nội khu hồ bơi sinh thái & Vườn hoa rực rỡ',
    direction: 'Hướng Tây Nam',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Bố cục vuông vắn tối ưu công năng, phù hợp cho gia đình trẻ tìm kiếm chốn an cư trong lành cân bằng cuộc sống.',
    specs: ['View hồ bơi sinh thái', 'Khóa từ vân tay 4 chức năng', 'Chiết khấu thanh toán 8%', 'Nhận nhà ở ngay']
  },
  {
    id: 'penthouse-eco-block-b',
    title: 'Penthouse Eco Resort Đỉnh Tháp Block B Mona Park View',
    code: 'MPV-PH02',
    slug: 'penthouse-eco-resort-dinh-thap-block-b',
    block: 'Block B - Lake View',
    type: 'Penthouse Eco',
    floor: 'Tầng 30',
    price: '14.8 Tỷ VNĐ',
    priceNum: 14.8,
    area: '220 m²',
    areaNum: 220,
    beds: 4,
    baths: 4,
    view: 'View đỉnh cao bao quát toàn bộ thung lũng xanh',
    direction: 'Hướng Đông Nam',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Dinh thự trên mây với hồ bơi vô cực ngoài trời, quầy bar BBQ sân thượng và tầm nhìn ngút ngàn xanh mướt.',
    specs: ['Bể bơi tràn bờ trên mái', 'Vườn nướng BBQ riêng', 'Nội thất nhập khẩu Ý', 'Dịch vụ quản gia 24/7']
  }
];

export const BDS20_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Khánh Thành Công Viên Sinh Thái Trung Tâm 100ha & Hồ Điều Hòa Mona Park',
    slug: 'khanh-thanh-cong-vien-sinh-thai-100ha',
    date: '28/08/2026',
    author: 'Ban Quản Lý Mona Park View',
    category: 'Sự Kiện',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Lá phổi xanh khổng lồ chính thức đi vào hoạt động, mang lại không gian vui chơi, tập luyện thể thao và tái tạo năng lượng cho cư dân.',
    content: [
      'Công viên Mona Park View sở hữu đường chạy bộ ven hồ dài 5km, vườn thiền Nhật Bản và hồ cảnh quan sinh thái trong lành.',
      'Dự án đạt giải thưởng Khu đô thị có cảnh quan sinh thái xuất sắc nhất năm 2026.'
    ],
    views: 4890
  },
  {
    id: 2,
    title: 'Lễ Cất Nóc Block A & Block B Vượt Tiến Độ 45 Ngày',
    slug: 'le-cat-noc-block-a-b-vuot-tien-do',
    date: '26/08/2026',
    author: 'Tổng Thầu Xây Dựng',
    category: 'Tiến Độ',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Chủ đầu tư cam kết bàn giao nhà đúng tiêu chuẩn chất lượng cao cấp và trao sổ hồng tận tay khách hàng.',
    content: [
      'Toàn bộ công tác hoàn thiện mặt ngoài và ốp đá khối sảnh lễ tân đang được triển khai khẩn trương.'
    ],
    views: 3950
  },
  {
    id: 3,
    title: 'Chính Sách Thanh Toán Nhẹ Nhàng 8 Đợt — Hỗ Trợ Lãi Suất 0% Trong 24 Tháng',
    slug: 'chinh-sach-thanh-toan-8-dot-uu-dai',
    date: '24/08/2026',
    author: 'Phòng Kinh Doanh',
    category: 'Chính Sách',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Khách hàng chỉ cần thanh toán 15% đợt đầu là có thể ký hợp đồng mua bán và nhận nhà vào quý 4/2026.',
    content: [
      'Ngân hàng đối tác chiến lược hỗ trợ giải ngân lên đến 70% giá trị căn hộ với thời hạn vay tối đa 25 năm.'
    ],
    views: 5210
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
  if (clean === 'khong-gian-xanh' || clean === 'eco-park') return { page: 'eco-park', propSlug: '', artSlug: '' };
  if (clean === 'mat-bang' || clean === 'floor-plans') return { page: 'floor-plans', propSlug: '', artSlug: '' };
  if (clean === 'can-ho-mau' || clean === 'showroom') return { page: 'showroom', propSlug: '', artSlug: '' };
  if (clean === 'chinh-sach' || clean === 'policy') return { page: 'policy', propSlug: '', artSlug: '' };
  if (clean === 'tien-do' || clean === 'progress') return { page: 'progress', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS20Template({
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
      const found = BDS20_UNITS.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS20_UNITS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS20_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS20_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableBlocks = useMemo(() => {
    const set = new Set(BDS20_UNITS.map(p => p.block).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableTypes = useMemo(() => {
    const set = new Set(BDS20_UNITS.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterBlock, setFilterBlock] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Forms
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', blockInterested: 'Block A - Park View', note: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-20';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS20_UNITS.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = BDS20_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'eco-park') urlSlug = 'khong-gian-xanh';
    else if (page === 'floor-plans') urlSlug = 'mat-bang';
    else if (page === 'showroom') urlSlug = 'can-ho-mau';
    else if (page === 'policy') urlSlug = 'chinh-sach';
    else if (page === 'progress') urlSlug = 'tien-do';
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại đăng ký nhận thông tin!');
      return;
    }
    showToast(`🎉 Tiếp nhận thông tin từ ${contactForm.name} (${contactForm.phone}). Chuyên viên Mona Park View sẽ liên hệ trong 10 phút!`);
    setContactForm({ name: '', phone: '', email: '', blockInterested: 'Block A - Park View', note: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredUnits = useMemo(() => {
    return BDS20_UNITS.filter(p => {
      // Block
      if (filterBlock !== 'all' && p.block !== filterBlock) return false;

      // Type matching: fuzzy
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }

      // Price matching
      if (filterPrice === 'under-3' && p.priceNum >= 3) return false;
      if (filterPrice === '3-6' && (p.priceNum < 3 || p.priceNum > 6)) return false;
      if (filterPrice === 'above-6' && p.priceNum <= 6) return false;

      return true;
    });
  }, [filterBlock, filterType, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'floor-plans') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredUnits.length;
    showToast(`🔍 Tìm thấy ${count} căn hộ sinh thái phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('bang-hang-can-ho');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (EMERALD GREEN & GOLD ACCENTS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0B4635] text-white shadow-xl border-b border-amber-400/30">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-base sm:text-xl shadow border border-amber-200 shrink-0">
            🌿
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-serif font-black tracking-wider text-amber-300 block leading-none truncate">
              {company?.name || 'TEMPLATESBDS'}
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-amber-200/80 uppercase tracking-widest block mt-0.5 truncate">
              KHU ĐÔ THỊ CÔNG VIÊN & HỒ ĐIỀU HÒA SINH THÁI
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('overview')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'overview' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Tổng Quan</button>
          <button onClick={() => navigate('location')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'location' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Vị Trí</button>
          <button onClick={() => navigate('amenities')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'amenities' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Tiện Ích</button>
          <button onClick={() => navigate('eco-park')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'eco-park' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Không Gian Xanh</button>
          <button onClick={() => navigate('floor-plans')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'floor-plans' || currentPage === 'property-detail' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Mặt Bằng</button>
          <button onClick={() => navigate('showroom')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'showroom' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Căn Hộ Mẫu</button>
          <button onClick={() => navigate('policy')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'policy' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Chính Sách</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'}`}>Liên Hệ</button>
        </nav>

        {/* CTA Right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('form-dang-ky');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer"
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
        <div className="xl:hidden bg-[#072C21] border-t border-amber-400/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Trang Chủ</button>
            <button onClick={() => navigate('overview')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Vị Trí</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tiện Ích</button>
            <button onClick={() => navigate('eco-park')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Không Gian Xanh</button>
            <button onClick={() => navigate('floor-plans')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Mặt Bằng</button>
            <button onClick={() => navigate('showroom')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Căn Hộ Mẫu</button>
            <button onClick={() => navigate('policy')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Chính Sách</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER FLYCAM CÔNG VIÊN 100HA & THÁP CĂN HỘ
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden border-b border-amber-400/30">
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
        alt="Mona Park View Flycam"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B4635] via-black/30 to-transparent" />

      <div className="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 bg-[#0B4635]/90 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-widest">
          KHU ĐÔ THỊ SINH THÁI XANH TRUNG TÂM
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-2xl">
          {company?.name || 'TEMPLATESBDS'}
        </h1>
        <p className="text-xs sm:text-base text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed">
          Chốn an cư lý tưởng giữa miền xanh thiên nhiên — Hưởng trọn tầm nhìn Panorama ôm trọn đại công viên 100ha và hồ cảnh quan sinh thái.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('bang-hang-can-ho');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            Khám Phá Bảng Hàng ›
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('form-dang-ky');
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
  // 3. SECTION 1: GIỚI THIỆU {company?.name || 'TEMPLATESBDS'} (ECO CITY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="tong-quan" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              MÔ HÌNH ĐÔ THỊ NGHỈ DƯỠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0B4635] leading-tight">
              Mona Park View — Thành Phố Sinh Thái Trong Lòng Đô Thị
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Với mật độ xây dựng kỷ lục chỉ 19%, Mona Park View dành trọn 81% quỹ đất cho hệ sinh thái công viên cây xanh, mặt nước hồ điều hòa và chuỗi tiện ích chăm sóc sức khỏe toàn diện.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dự án là sự kết tinh hoàn hảo giữa lối sống xanh bền vững và tiện nghi thông minh hiện đại, mang lại không gian sống thanh khiết cho cộng đồng cư dân tinh hoa.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">MẬT ĐỘ XÂY DỰNG</span>
                <strong className="text-[#0B4635] text-sm font-black">19.2 %</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">DIỆN TÍCH CÔNG VIÊN</span>
                <strong className="text-[#0B4635] text-sm font-black">100 Hecta</strong>
              </div>
              <div className="bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">HÌNH THỨC SỞ HỮU</span>
                <strong className="text-[#0B4635] text-sm font-black">Lâu Dài</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
              alt="Hồ điều hòa sinh thái"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ ĐẮC ĐỊA & KẾT NỐI VÙNG (LOCATION)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="vi-tri" className="py-16 bg-[#0B4635] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Left */}
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-slate-900">
            <iframe
              src="https://maps.google.com/maps?q=Ecopark+Van+Giang+Hung+Yen&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
              VỊ TRÍ CHIẾN LƯỢC
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
              TÂM ĐIỂM KẾT NỐI VÙNG ĐÔ THỊ VỆ TINH
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Nằm tại vị trí giao thoa của các trục giao thông huyết mạch, Mona Park View kết nối nhanh chóng tới các trung tâm hành chính, giáo dục và giải trí:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">📍 <strong>Hệ thống Trường học Quốc tế:</strong> Cách 500m (2 phút đi bộ)</li>
              <li className="flex items-center gap-2">📍 <strong>Bệnh viện Đa khoa Quốc tế:</strong> Cách 1.2 km (4 phút)</li>
              <li className="flex items-center gap-2">📍 <strong>Trung tâm Thương mại Vincom Mega Mall:</strong> Cách 2.0 km (5 phút)</li>
              <li className="flex items-center gap-2">📍 <strong>Trung tâm Hoàn Kiếm / Phố Cổ:</strong> 25 phút qua cầu Thanh Trì & Vĩnh Tuy</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: KHÔNG GIAN SỐNG XANH & TIỆN ÍCH RESORT
  // ─────────────────────────────────────────────────────────────────────────
  const renderEcoParkSection = () => (
    <section id="khong-gian-xanh" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-amber-600 tracking-widest">
            HỆ SINH THÁI 365 NGÀY NGHỈ DƯỠNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
            TIỆN ÍCH ĐẶC QUYỀN CHUẨN RESORT
          </h2>
          <p className="text-xs text-slate-600">
            Tận hưởng chuỗi tiện ích đa tầng đan xen giữa không gian mặt nước và bóng mát đại thụ xanh tươi.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-xs">
          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">🏊</div>
            <strong className="block text-slate-900 font-bold">Hồ Bơi Sinh Thái</strong>
            <span className="text-[10px] text-slate-500">Nước mặn bốn mùa</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">🌳</div>
            <strong className="block text-slate-900 font-bold">Đường Dạo Bộ 5km</strong>
            <span className="text-[10px] text-slate-500">Ven hồ điều hòa</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">🍖</div>
            <strong className="block text-slate-900 font-bold">Vườn Nướng BBQ</strong>
            <span className="text-[10px] text-slate-500">Khu picnic gia đình</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">🎾</div>
            <strong className="block text-slate-900 font-bold">Sân Tennis & Gym</strong>
            <span className="text-[10px] text-slate-500">Thể thao đa năng</span>
          </div>

          <div className="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
            <div className="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">🧘</div>
            <strong className="block text-slate-900 font-bold">Vườn Thiền Yoga</strong>
            <span className="text-[10px] text-slate-500">Tái tạo năng lượng</span>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: MẶT BẰNG & BẢNG HÀNG CĂN HỘ (FLOOR PLANS & INVENTORY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFloorPlansSection = () => (
    <section id="bang-hang-can-ho" className="py-16 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0B4635] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              MẶT BẰNG TẦNG ĐIỂN HÌNH & BẢNG HÀNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              DANH SÁCH CĂN HỘ ĐANG MỞ BÁN ({filteredUnits.length})
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs w-full lg:w-auto">
            <select
              value={filterBlock}
              onChange={e => setFilterBlock(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none"
            >
              <option value="all">Tòa Block (Tất cả)</option>
              {availableBlocks.filter(b => b !== 'all').map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none"
            >
              <option value="all">Loại Căn Hộ (Tất cả)</option>
              {availableTypes.filter(t => t !== 'all').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-[#0B4635] hover:bg-[#072C21] text-white font-bold uppercase shadow text-center cursor-pointer transition text-xs"
            >
              Lọc
            </button>
          </div>
        </div>

        {filteredUnits.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy căn hộ nào khớp với tiêu chí lọc.</p>
            <button
              onClick={() => {
                setFilterBlock('all');
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
                className="bg-white border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0B4635] text-amber-300 text-[10px] font-black uppercase">
                    {unit.code} • {unit.block}
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
                    className="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0B4635] cursor-pointer min-h-[34px]"
                  >
                    {unit.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                    <div>📐 Diện tích: <strong>{unit.area}</strong></div>
                    <div>🏢 Tầng: <strong>{unit.floor}</strong></div>
                    <div>🧭 Hướng: <strong>{unit.direction}</strong></div>
                    <div>🛏 Phòng: <strong>{unit.beds} PN • {unit.baths} WC</strong></div>
                  </div>

                  <p className="text-[11px] text-emerald-800 font-medium truncate">
                    🌿 {unit.view}
                  </p>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-sm font-black text-[#E11D48]">{unit.price}</span>
                    <button
                      onClick={() => handleOpenUnit(unit)}
                      className="px-3 py-1.5 bg-[#0B4635] hover:bg-[#072C21] text-amber-300 font-bold text-xs uppercase transition cursor-pointer"
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
  // 7. SECTION 5: TIẾN ĐỘ THANH TOÁN 8 ĐỢT (PAYMENT SCHEDULE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPaymentSchedule = () => (
    <section id="chinh-sach" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-amber-600 tracking-widest">
            PHƯƠNG THỨC THANH TOÁN LINH HOẠT
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
            TIẾN ĐỘ THANH TOÁN 8 ĐỢT CHUẨN CĐT
          </h2>
        </div>

        <div className="bg-white p-6 border border-slate-300 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 1 (KÝ HĐMB)</strong>
              <p className="text-sm font-black text-slate-900">15% Giá Trị Căn Hộ</p>
              <span className="text-[10px] text-slate-500">Trong 7 ngày đặt cọc</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 2 (XÂY TẦNG 5)</strong>
              <p className="text-sm font-black text-slate-900">10% Giá Trị Căn Hộ</p>
              <span className="text-[10px] text-slate-500">Sau 60 ngày đợt 1</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 3 (XÂY TẦNG 15)</strong>
              <p className="text-sm font-black text-slate-900">10% Giá Trị Căn Hộ</p>
              <span className="text-[10px] text-slate-500">Sau 60 ngày đợt 2</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 4 (CẤT NÓC)</strong>
              <p className="text-sm font-black text-slate-900">15% Giá Trị Căn Hộ</p>
              <span className="text-[10px] text-slate-500">Hoàn thành cất nóc</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 5 (HOÀN THIỆN)</strong>
              <p className="text-sm font-black text-slate-900">10% Giá Trị Căn Hộ</p>
              <span className="text-[10px] text-slate-500">Hoàn thiện nội thất</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 6 (BÀN GIAO)</strong>
              <p className="text-sm font-black text-slate-900">25% + 2% KPBT</p>
              <span className="text-[10px] text-slate-500">Nhận chìa khóa nhà</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-[#0B4635] block">ĐỢT 7 & 8 (SỔ HỒNG)</strong>
              <p className="text-sm font-black text-slate-900">5% Cuối Cùng</p>
              <span className="text-[10px] text-slate-500">Nhận giấy chứng nhận</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-300 space-y-1">
              <strong className="text-emerald-800 block">ƯU ĐÃI ĐẶC BIỆT</strong>
              <p className="text-sm font-black text-emerald-900">Chiết khấu 8%</p>
              <span className="text-[10px] text-emerald-700">Khi thanh toán sớm 95%</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: THỰC TẾ CĂN HỘ MẪU (SHOWROOM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderShowroomSection = () => (
    <section id="can-ho-mau" className="py-16 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-amber-600 tracking-widest">
            TRẢI NGHIỆM THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
            HÌNH ẢNH CĂN HỘ MẪU HOÀN THIỆN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Phòng Khách Ban Công Kính Tràn', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
            { title: 'Phòng Ngủ Master View Hồ Nước', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
            { title: 'Khu Vực Bếp Đảo Hiện Đại', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
            { title: 'Phòng Tắm Ốp Đá Tự Nhiên VIP', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80' },
          ].map((item, idx) => (
            <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-sm group">
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
  // 9. SECTION 7: TIN TỨC & TIẾN ĐỘ DỰ ÁN
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#0B4635] pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-[#0B4635]">
            TIN TỨC {company?.name || 'TEMPLATESBDS'}
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-emerald-800 hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS20_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0B4635] cursor-pointer"
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
  // 10. SECTION 8: FORM ĐĂNG KÝ BẢNG GIÁ NGOẠI GIAO (CONTACT FORM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderContactSection = () => (
    <section id="form-dang-ky" className="py-16 bg-[#0B4635] text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-xl text-center space-y-6`}>
        
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-amber-300 tracking-widest block">
            CHƯƠNG TRÌNH MỞ BÁN ĐỢT 1
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
            ĐĂNG KÝ NHẬN BẢNG GIÁ GỐC & VOUCHER 100 TRIỆU
          </h2>
          <p className="text-xs text-slate-200">
            Ưu tiên chọn căn góc đẹp nhất và hưởng chính sách hỗ trợ lãi suất 0% trong 24 tháng.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="bg-white text-slate-900 p-6 shadow-2xl text-left text-xs space-y-3">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Họ và tên quý khách *</label>
            <input
              type="text"
              required
              value={contactForm.name}
              onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={contactForm.phone}
              onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
              placeholder="0919 006 030"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tòa Block quan tâm</label>
            <select
              value={contactForm.blockInterested}
              onChange={e => setContactForm({ ...contactForm, blockInterested: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            >
              <option value="Block A - Park View">Block A - Park View (View Công Viên)</option>
              <option value="Block B - Lake View">Block B - Lake View (View Hồ Sinh Thái)</option>
              <option value="Block C - Garden View">Block C - Garden View (View Vườn Thiền)</option>
              <option value="Block D - Sky Palace">Block D - Sky Palace (Duplex Đỉnh Cao)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0B4635] hover:bg-[#072C21] text-amber-300 font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
          >
            Gửi Yêu Cầu Nhận Bảng Giá Gốc CĐT
          </button>
        </form>

      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0B4635] selection:text-amber-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B4635] text-white border border-amber-400 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
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
            {renderEcoParkSection()}
            {renderFloorPlansSection()}
            {renderPaymentSchedule()}
            {renderShowroomSection()}
            {renderNewsSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverviewSection()}
            {renderEcoParkSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocationSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderEcoParkSection()}
            {renderShowroomSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'eco-park' && (
          <main>
            {renderEcoParkSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'floor-plans' && (
          <main>
            {renderFloorPlansSection()}
            {renderPaymentSchedule()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'showroom' && (
          <main>
            {renderShowroomSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'policy' && (
          <main>
            {renderPaymentSchedule()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderLocationSection()}
            {renderContactSection()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('floor-plans')} className="text-xs font-bold text-[#0B4635] hover:underline">
                ‹ Quay lại bảng hàng căn hộ
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
                {selectedUnit.title} ({selectedUnit.code})
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Giá bán: {selectedUnit.price} — Tòa: {selectedUnit.block} — Diện tích: {selectedUnit.area}
              </p>
              <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
              <div className="p-4 bg-[#0B4635] text-white space-y-2">
                <h4 className="font-bold text-xs uppercase text-amber-300">Tiêu chuẩn bàn giao & tiện ích:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedUnit.specs.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">🌿 {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0B4635] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-[#0B4635] uppercase">
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
        templateName="BDS-20 (Mona Park View — Khu Đô Thị Công Viên Xanh & Hồ Sinh Thái)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
