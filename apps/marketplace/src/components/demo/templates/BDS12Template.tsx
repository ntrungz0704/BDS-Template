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
  Anchor, Waves, Sun, Sparkle, Trophy, Gem, Video, Image as ImageIcon
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

export interface UnitTypeItem {
  id: string;
  type: string;
  category: 'shophouse' | 'wyndham' | 'silkpath' | 'villa';
  name: string;
  area: string;
  landArea: string;
  constructionArea: string;
  frontage: string;
  floors: string;
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
// BDS-12 MOCK DATA: {company?.name || 'TEMPLATESBDS'} HARBOR CITY (CEO GROUP)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS12_UNITS: UnitTypeItem[] = [
  {
    id: 'singapore-shophouse',
    type: 'Singapore Shophouse Đa Năng',
    category: 'shophouse',
    name: 'Singapore Shophouse Mặt Tiền Đại Lộ 30m',
    area: '480 m² (Xây dựng 5.5 tầng)',
    landArea: '120 m² (6m x 20m)',
    constructionArea: '480 m²',
    frontage: '6.0 m',
    floors: '5 tầng + 1 tum',
    price: '7.85 Tỷ VNĐ',
    view: 'Trực diện Đại lộ Ánh Sáng & Vịnh Bái Tử Long',
    handover: 'Hoàn thiện mặt ngoài sang trọng, thô bên trong',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
    specs: ['Thiết kế 2 mặt tiền thông thoáng', 'Tối ưu kinh doanh nhà hàng, khách sạn mini boutique', 'Tích hợp thang máy kính hiện đại'],
    description: 'Dòng sản phẩm Shophouse phong cách Singapore tối ưu hóa công năng vừa ở vừa kinh doanh sinh lời vượt trội tại trung tâm khu kinh tế Vân Đồn.',
    highlights: ['Chiết khấu thanh toán sớm 10%', 'Hỗ trợ lãi suất 0% trong 24 tháng', 'Cam kết thuê lại 35 Triệu/tháng']
  },
  {
    id: 'wyndham-garden',
    type: 'Condotel 5 Sao Wyndham Garden',
    category: 'wyndham',
    name: 'Căn Hộ Khách Sạn Wyndham Garden Sonasea',
    area: '45.5 m² - 88.0 m²',
    landArea: '45.5 m²',
    constructionArea: '45.5 m²',
    frontage: '4.5 m',
    floors: 'Tòa tháp 14 tầng',
    price: '2.15 Tỷ VNĐ',
    view: '100% căn hộ view biển Vịnh Bái Tử Long',
    handover: 'Full nội thất tiêu chuẩn 5 sao quốc tế Wyndham',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
    specs: ['Quản lý vận hành bởi tập đoàn Wyndham Hotel Group', 'Hệ thống Smart Room điều khiển thông minh', 'Ban công kính ngắm trọn bình minh trên biển'],
    description: 'Tổ hợp condotel mặt biển đầu tiên tại Vân Đồn được quản lý bởi thương hiệu khách sạn hàng đầu thế giới, cam kết chia sẻ doanh thu bền vững.',
    highlights: ['Chia sẻ lợi nhuận 85/15 trọn đời', 'Tặng 15 đêm nghỉ dưỡng miễn phí/năm trên toàn hệ thống CEO Group']
  },
  {
    id: 'sonasea-silkpath',
    type: 'Shophouse Phố Đi Bộ Sonasea Silk Path',
    category: 'silkpath',
    name: 'Nhà Phố Thương Mại Silk Path Vân Đồn',
    area: '360 m² (Xây dựng 4 tầng)',
    landArea: '100 m² (5m x 20m)',
    constructionArea: '360 m²',
    frontage: '5.0 m',
    floors: '4 tầng + 1 tum',
    price: '6.20 Tỷ VNĐ',
    view: 'Tuyến phố đi bộ rực rỡ sắc màu & Công viên biển',
    handover: 'Hoàn thiện mặt ngoài đồng bộ phong cách Địa Trung Hải',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
    specs: ['Mặt tiền phố đi bộ không ngủ 24/7', 'Vỉa hè lát đá rộng 5m', 'Hệ thống phòng cháy chữa cháy tự động'],
    description: 'Nơi quy tụ hàng trăm thương hiệu ẩm thực, thời trang và giải trí hàng đầu, tạo nên tâm điểm mua sắm sầm uất bậc nhất miền Bắc.',
    highlights: ['Ân hạn nợ gốc 24 tháng', 'Tặng chuyến du lịch Dubai 50 Triệu đồng']
  },
  {
    id: 'villa-ocean',
    type: 'Biệt Thự Biển Đảo Cọ Palm Island',
    category: 'villa',
    name: 'Biệt Thự Đơn Lập Sonasea Ocean Villa',
    area: '320 m² - 500 m²',
    landArea: '350 m²',
    constructionArea: '420 m²',
    frontage: '15.0 m',
    floors: '3 tầng',
    price: '16.50 Tỷ VNĐ',
    view: 'Mặt tiền bãi tắm riêng 2.2km vịnh Bái Tử Long',
    handover: 'Full nội thất cao cấp dát vàng hoặc thô tùy chọn',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    specs: ['Bến đỗ du thuyền riêng tại gia', 'Hồ bơi sục Jacuzzi vô cực', 'Sân vườn nhiệt đới rộng 150m²'],
    description: 'Dinh thự nghỉ dưỡng biệt lập trên đảo cọ kỳ vĩ dành riêng cho các chủ nhân danh giá khao khát phong cách sống thượng lưu giữa lòng kỳ quan.',
    highlights: ['Sổ đỏ sở hữu lâu dài', 'Tặng thẻ hội viên Sonasea Golf Club trọn đời']
  }
];

export const BDS12_AMENITIES: AmenityItem[] = [
  {
    id: 1,
    title: 'Bến Du Thuyền Quốc Tế Marina',
    subtitle: 'ĐẲNG CẤP THƯỢNG LƯU',
    desc: 'Bến đỗ tiêu chuẩn quốc tế phục vụ các du thuyền siêu sang khám phá kỳ quan Vịnh Bái Tử Long.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
  },
  {
    id: 2,
    title: 'Bãi Tắm Riêng Cát Trắng 2.2km',
    subtitle: 'BIỂN XANH NGỌC BÍCH',
    desc: 'Bờ cát trắng mịn tự nhiên trải dài 2.200m với làn nước trong vắt bốn mùa dành riêng cho cư dân.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
  },
  {
    id: 3,
    title: 'Sân Golf Quốc Tế 18 Hố',
    subtitle: 'THỬ THÁCH LINKCOURSE VEN BIỂN',
    desc: 'Sân golf hướng biển tuyệt mỹ do các huyền thoại thiết kế sân golf hàng đầu thế giới tạo dựng.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80'
  },
  {
    id: 4,
    title: 'Thủy Phi Cơ & Bãi Đáp Trực Thăng',
    subtitle: 'KẾT NỐI KHÔNG GIAN TRIỆU ĐÔ',
    desc: 'Dịch vụ bay ngắm cảnh vịnh từ trên cao và di chuyển nhanh chóng từ Hà Nội chỉ trong 30 phút.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'
  },
  {
    id: 5,
    title: 'Rạp Chiếu Phim Ngoài Trời',
    subtitle: 'TRẢI NGHIỆM ĐIỆN ẢNH BÊN BỜ BIỂN',
    desc: 'Thưởng thức các bộ phim bom tấn thế giới dưới bầu trời đầy sao và tiếng sóng biển rì rào.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80'
  },
  {
    id: 6,
    title: 'Nhà Hàng Nổi Vịnh Bái Tử Long',
    subtitle: 'ẨM THỰC HẢI SẢN 5 SAO',
    desc: 'Thưởng thức hải sản tươi ngon nức tiếng Quảng Ninh trong không gian nhà hàng nổi thơ mộng.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
  }
];

export const BDS12_PROGRESS_IMAGES = [
  { title: 'Dãy Shophouse Singapore Hoàn Thiện', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { title: 'Đại Lộ Ánh Sáng 30m Trải Nhựa', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80' },
  { title: 'Cảnh Quan Bãi Tắm & Công Viên Cọ', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { title: 'Khách Sạn Wyndham Cất Nóc', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { title: 'Sảnh Đón Resort 5 Sao', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { title: 'Bến Du Thuyền Sonasea Về Đêm', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
  { title: 'Cầu Cảng Đón Khách Quốc Tế', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { title: 'Khu Biệt Thự Mẫu Đảo Cọ', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80' }
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
  if (clean === 'mat-bang' || clean === 'masterplan') return { page: 'masterplan', propSlug: '', artSlug: '' };
  if (clean === 'bang-gia' || clean === 'price-list') return { page: 'price-list', propSlug: '', artSlug: '' };
  if (clean === 'tien-do' || clean === 'progress') return { page: 'progress', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS12Template({
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

  const activeUnits = useMemo<UnitTypeItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      return projects.map((p: any, idx: number): UnitTypeItem => ({
        id: p.slug || `unit-${idx + 1}`,
        type: p.type || 'Shophouse & Villa',
        category: (p.type?.toLowerCase().includes('villa') ? 'villa' : (p.type?.toLowerCase().includes('wyndham') ? 'wyndham' : 'shophouse')),
        name: p.title || p.name || 'Shophouse Thương Mại Biển',
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '120 m²'),
        landArea: p.landArea || (typeof p.area === 'number' ? `${p.area} m²` : '120 m²'),
        constructionArea: p.constructionArea || '350 m²',
        frontage: p.frontage || '6.0 m',
        floors: p.floors || '4 tầng + 1 tum',
        price: p.price || (p.priceFrom ? `Từ ${p.priceFrom} Tỷ` : 'Liên hệ'),
        view: p.view || 'View Biển & Đại Lộ Thương Mại',
        handover: p.handover || 'Bàn giao hoàn thiện mặt ngoài',
        image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        specs: Array.isArray(p.specs) ? p.specs : ['Sổ hồng sở hữu lâu dài', 'Mặt tiền kinh doanh', 'Bàn giao cao cấp'],
        description: p.description || p.desc || 'Thiết kế tối ưu cho cả mục đích an cư lẫn kinh doanh sinh lời.',
        highlights: Array.isArray(p.highlights) ? p.highlights : ['Vị trí đắc địa ven biển', 'Tiềm năng tăng giá mạnh mẽ'],
      }));
    }
    return BDS12_UNITS;
  }, [projects]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitTypeItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeUnits.find(u => u.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeUnits[0] || BDS12_UNITS[0];
  });

  // UI Interactive States
  const [activeFloorplanTab, setActiveFloorplanTab] = useState<'shophouse' | 'wyndham' | 'silkpath' | 'villa'>('shophouse');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', unit: 'Singapore Shophouse 120m²' });
  const [roiForm, setRoiForm] = useState({ name: '', phone: '', email: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-12';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeUnits.find(u => u.id === res.propSlug);
      if (found) setSelectedUnit(found);
    }
  }, [initialPage, activeUnits]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'overview') urlSlug = 'tong-quan';
    else if (page === 'location') urlSlug = 'vi-tri';
    else if (page === 'amenities') urlSlug = 'tien-ich';
    else if (page === 'masterplan') urlSlug = 'mat-bang';
    else if (page === 'price-list') urlSlug = 'bang-gia';
    else if (page === 'progress') urlSlug = 'tien-do';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenUnitDetail = (unit: UnitTypeItem) => {
    setSelectedUnit(unit);
    navigate('property-detail', unit.id);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone || !leadForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại nhận bảng giá gốc!');
      return;
    }
    showToast(`🎉 Cảm ơn ${leadForm.name} (${leadForm.phone}). Bảng giá chính thức đợt 1 và chính sách chiết khấu 10% cho ${leadForm.unit} đã được gửi qua Zalo!`);
    setLeadForm({ name: '', phone: '', email: '', unit: 'Singapore Shophouse 120m²' });
  };

  const handleRoiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roiForm.phone || !roiForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại nhận bảng tính dòng tiền!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu thành công! Bảng tính phân tích dòng tiền ROI 12-15%/năm đã được gửi tới ${roiForm.phone}.`);
    setRoiForm({ name: '', phone: '', email: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  const currentTabUnit = useMemo(() => {
    return activeUnits.find(u => u.category === activeFloorplanTab) || activeUnits[0] || BDS12_UNITS[0];
  }, [activeFloorplanTab, activeUnits]);

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo Sonasea CEO Group */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0284C7] via-[#0369A1] to-[#0C4A6E] rounded-sm flex items-center justify-center text-[#FDE047] font-black text-base sm:text-xl shadow-md shrink-0">
            <Anchor size={18} className="animate-pulse" />
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-xl font-serif font-black text-[#0369A1] tracking-wider block leading-none truncate">
              SONASEA <span className="text-slate-900">VÂN ĐỒN</span>
            </span>
            <span className="text-[7.5px] sm:text-[9px] font-bold text-amber-600 uppercase tracking-widest block mt-0.5 truncate">
              HARBOR CITY — CEO GROUP
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('overview')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'overview' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Tổng Quan
          </button>
          <button 
            onClick={() => navigate('location')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'location' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Vị Trí
          </button>
          <button 
            onClick={() => navigate('amenities')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'amenities' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Tiện Ích
          </button>
          <button 
            onClick={() => navigate('masterplan')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'masterplan' || currentPage === 'property-detail' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Mặt Bằng
          </button>
          <button 
            onClick={() => navigate('price-list')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'price-list' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Bảng Giá
          </button>
          <button 
            onClick={() => navigate('progress')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'progress' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Tiến Độ
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* Hotline & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-black whitespace-nowrap shrink-0 hover:bg-blue-100 transition"
          >
            <Phone size={13} className="text-[#0284C7] animate-pulse shrink-0" />
            <span>0919 006 030</span>
          </a>
          <button
            onClick={() => navigate('price-list')}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] text-slate-950 text-xs font-black rounded-sm shadow-md uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 transition cursor-pointer"
          >
            Nhận Báo Giá ›
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
            <button onClick={() => navigate('overview')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Tổng Quan</button>
            <button onClick={() => navigate('location')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Vị Trí</button>
            <button onClick={() => navigate('amenities')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Tiện Ích</button>
            <button onClick={() => navigate('masterplan')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Mặt Bằng</button>
            <button onClick={() => navigate('price-list')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Bảng Giá</button>
            <button onClick={() => navigate('progress')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Tiến Độ</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO PANORAMA VỊNH BÁI TỬ LONG & 3 MICRO CARDS
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      {/* High-res Aerial Shot of Sonasea Palm Islands & Bay */}
      <div className="relative min-h-[440px] sm:min-h-[540px] lg:min-h-[620px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
          alt="Sonasea Van Don Aerial"
          onError={handleImgError}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A30] via-transparent to-black/40" />

        {/* Hero Floating 3-Column Info Cards */}
        <div className={`relative z-20 ${MAX_W} mx-auto px-4 w-full mt-auto pb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-12 rounded-md overflow-hidden shadow-2xl border border-white/20">
            
            {/* Card 1: Navy Primary */}
            <div className="md:col-span-4 bg-[#0369A1] p-6 text-white flex flex-col justify-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FDE047]">ĐẠI DỰ ÁN 358.5 HA</span>
              <h1 className="text-base sm:text-lg font-serif font-black uppercase leading-snug">
                THƯƠNG CẢNG QUỐC TẾ ĐẦU TIÊN VÀ DUY NHẤT TẠI VỊNH BÁI TỬ LONG
              </h1>
            </div>

            {/* Card 2: White Location */}
            <div className="md:col-span-4 bg-white text-slate-800 p-6 flex flex-col justify-center space-y-1.5">
              <span className="text-[10px] font-black uppercase text-[#0369A1] tracking-wider">VỊ TRÍ ĐỘC TÔN</span>
              <h2 className="text-sm font-black text-slate-900">Xã Hạ Long, Huyện Vân Đồn, Quảng Ninh</h2>
              <p className="text-xs text-slate-500 line-clamp-2">Sở hữu 2.2km đường bờ biển cát trắng mịn nhìn thẳng ra vịnh Bái Tử Long kỳ vĩ.</p>
            </div>

            {/* Card 3: White Amenities + Gold CTA */}
            <div className="md:col-span-4 bg-[#F8FAFC] text-slate-800 p-6 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#0369A1] tracking-wider">TIỆN ÍCH ALL-IN-ONE</span>
                <h3 className="text-sm font-black text-slate-900">Hệ Sinh Thái Nghỉ Dưỡng & Casino 5 Sao</h3>
              </div>
              <button
                onClick={() => navigate('price-list')}
                className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow transition hover:scale-105 cursor-pointer"
              >
                Nhận Báo Giá VIP ›
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW & VIDEO)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverview = () => (
    <section id="tong-quan" className="py-16 bg-[#0B1A30] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-12`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] uppercase tracking-wider">
            TỔNG QUAN DỰ ÁN {company?.name || 'TEMPLATESBDS'}
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
          <p className="text-xs sm:text-sm text-slate-300">
            Khu tổ hợp du lịch nghỉ dưỡng giải trí quy mô 358.5 ha mang tầm vóc quốc tế do Tập đoàn CEO kiến tạo tại trung tâm đặc khu kinh tế Vân Đồn.
          </p>
        </div>

        {/* 5 Big Numbers Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-4 rounded-sm bg-white/5 border border-white/10 space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] block">358.5 ha</span>
            <span className="text-[11px] text-slate-300 font-medium">Tổng diện tích quy hoạch</span>
          </div>
          <div className="p-4 rounded-sm bg-white/5 border border-white/10 space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] block">2.200 m</span>
            <span className="text-[11px] text-slate-300 font-medium">Bờ biển cát trắng tự nhiên</span>
          </div>
          <div className="p-4 rounded-sm bg-white/5 border border-white/10 space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] block">2.200 ha</span>
            <span className="text-[11px] text-slate-300 font-medium">Mặt biển khai thác du lịch</span>
          </div>
          <div className="p-4 rounded-sm bg-white/5 border border-white/10 space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] block">5 Phân Khu</span>
            <span className="text-[11px] text-slate-300 font-medium">Đô thị nghỉ dưỡng đỉnh cao</span>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 rounded-sm bg-white/5 border border-white/10 space-y-1">
            <span className="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] block">5.000+ Tỷ</span>
            <span className="text-[11px] text-slate-300 font-medium">Vốn đầu tư giai đoạn 1</span>
          </div>
        </div>

        {/* 2-Column: Video Player Left + Spec Sheet Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Video Placeholder */}
          <div 
            onClick={() => setVideoModalOpen(true)}
            className="lg:col-span-6 relative aspect-video rounded-md overflow-hidden bg-slate-900 border-2 border-amber-400/40 shadow-2xl group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000&q=80"
              alt="Video Thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-sm bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition group-hover:scale-110">
                <Play size={26} className="ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-sm text-xs font-bold text-white flex items-center justify-between">
              <span>▶ Xem Video Phối Cảnh 3D Sonasea Vân Đồn</span>
              <span className="text-amber-300 text-[10px]">4K Ultra HD</span>
            </div>
          </div>

          {/* Right Specs Sheet */}
          <div className="lg:col-span-6 bg-slate-900/90 p-6 sm:p-8 rounded-md border border-white/10 space-y-4">
            <h3 className="text-base font-black text-[#FDE047] uppercase tracking-wide border-b border-white/10 pb-3">
              THÔNG TIN QUY HOẠCH CHI TIẾT
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Tên dự án:</span>
                <span className="font-bold text-white text-right">Sonasea Vân Đồn Harbor City</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Chủ đầu tư:</span>
                <span className="font-bold text-[#FDE047] text-right">Tập đoàn CEO (CEO Group)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Vị trí:</span>
                <span className="font-bold text-white text-right">Xã Hạ Long, Vân Đồn, Quảng Ninh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Loại hình sản phẩm:</span>
                <span className="font-bold text-white text-right">Shophouse, Biệt Thự Biển, Condotel Wyndham</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Đơn vị thiết kế:</span>
                <span className="font-bold text-white text-right">Nihon Sekkei (Nhật Bản)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Pháp lý:</span>
                <span className="font-bold text-emerald-400 text-right">Sổ hồng sở hữu lâu dài</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ CHIẾN LƯỢC TÂM ĐIỂM KẾT NỐI (LOCATION & 8 MILESTONES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocation = () => (
    <section id="vi-tri" className="py-16 bg-white text-slate-800 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0369A1] uppercase tracking-wider">
            VỊ TRÍ CHIẾN LƯỢC TÂM ĐIỂM KẾT NỐI
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
          <p className="text-xs sm:text-sm text-slate-600">
            Tọa lạc tại vị trí độc tôn ôm trọn vịnh Bái Tử Long, kết nối trực tiếp với trục cao tốc huyết mạch Hà Nội - Hải Phòng - Hạ Long - Vân Đồn - Móng Cái.
          </p>
        </div>

        {/* 2-Column: Map Left + 8 Milestones Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Graphic Left */}
          <div className="lg:col-span-6 rounded-md overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Van Don Map"
              onError={handleImgError}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* 8 Connection Pills Right */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
            {[
              { label: 'Sân bay Quốc tế Vân Đồn', time: '7 Phút', icon: '✈️' },
              { label: 'Cao tốc Hạ Long - Vân Đồn', time: '5 Phút', icon: '🚗' },
              { label: 'Cảng tàu Quốc tế Ao Tiên', time: '10 Phút', icon: '🚢' },
              { label: 'Sân Golf Quốc Tế 18 Hố', time: '5 Phút', icon: '⛳' },
              { label: 'Chùa Cái Bầu Tâm Linh', time: '3 Phút', icon: '⛩️' },
              { label: 'Casino Quốc Tế Vân Đồn', time: '15 Phút', icon: '🎰' },
              { label: 'Thành Phố Cẩm Phả', time: '20 Phút', icon: '🏙️' },
              { label: 'Thành Phố Hạ Long', time: '40 Phút', icon: '🏖️' },
            ].map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 flex items-center gap-3 shadow-sm hover:border-[#0369A1] transition">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <span className="font-bold text-xs text-slate-800 block leading-tight">{m.label}</span>
                  <span className="text-[11px] font-black text-[#0369A1]">{m.time} di chuyển</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: LÝ DO NÊN ĐẦU TƯ & CHÍNH SÁCH BÁN HÀNG ĐỢT 1
  // ─────────────────────────────────────────────────────────────────────────
  const renderInvestAndPolicy = () => (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0369A1] uppercase tracking-wider">
            LÝ DO NÊN ĐẦU TƯ {company?.name || 'TEMPLATESBDS'}
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* 2-Column Split: Left Analysis & ROI Form + Right Hot Policy Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Analysis & Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-md border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h3 className="text-base font-black text-[#0369A1] uppercase">
                Tiềm Năng Sinh Lời Vượt Trội Tại Đặc Khu Kinh Tế
              </h3>
              <p>
                Vân Đồn đang chuyển mình mạnh mẽ thành trung tâm du lịch sinh thái biển đảo chất lượng cao và trung tâm công nghiệp giải trí có casino quy mô hàng tỷ USD.
              </p>
              <p>
                Sonasea Vân Đồn Harbor City là dự án hiếm hoi sở hữu bãi tắm cát trắng tự nhiên và bến du thuyền quốc tế, được quy hoạch đồng bộ bài bản bởi tập đoàn CEO Group.
              </p>
            </div>

            <form onSubmit={handleRoiSubmit} className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-800 block text-xs uppercase">Đăng ký nhận bảng tính phân tích dòng tiền ROI:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Họ và tên..."
                  required
                  value={roiForm.name}
                  onChange={e => setRoiForm({ ...roiForm, name: e.target.value })}
                  className="bg-slate-50 px-3 py-2.5 rounded-sm border focus:bg-white focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại (*)..."
                  required
                  value={roiForm.phone}
                  onChange={e => setRoiForm({ ...roiForm, phone: e.target.value })}
                  className="bg-slate-50 px-3 py-2.5 rounded-sm border focus:bg-white focus:outline-none font-bold"
                />
                <button
                  type="submit"
                  className="py-2.5 bg-[#0369A1] hover:bg-[#0284C7] text-white font-black uppercase rounded-sm shadow transition"
                >
                  GỬI YÊU CẦU
                </button>
              </div>
            </form>
          </div>

          {/* Right Red Promo Policy Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#BE123C] to-[#9F1239] text-white p-6 sm:p-8 rounded-md shadow-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-sm inline-block">
                CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT ĐỢT 1
              </span>
              <h3 className="text-xl font-black uppercase tracking-wide">
                ƯU ĐÃI KHỦNG DÀNH CHO 50 KHÁCH HÀNG ĐẦU TIÊN
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-rose-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#FDE047] shrink-0" />
                <span>Chiết khấu thanh toán sớm lên tới <strong>10%</strong> giá trị sản phẩm.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#FDE047] shrink-0" />
                <span>Hỗ trợ vay <strong>70%</strong> với lãi suất <strong>0% trong 24 tháng</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#FDE047] shrink-0" />
                <span>Ân hạn nợ gốc và miễn phí trả nợ trước hạn trong thời gian hỗ trợ lãi suất.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#FDE047] shrink-0" />
                <span>Tặng voucher nghỉ dưỡng <strong>50 Triệu</strong> tại Sonasea Villas & Resort Phú Quốc.</span>
              </li>
            </ul>

            <button
              onClick={() => navigate('price-list')}
              className="w-full py-3 bg-[#FDE047] hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition"
            >
              Nhận Trọn Bộ Bảng Giá Gốc CĐT
            </button>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP 5 SAO (6-GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenities = () => (
    <section id="tien-ich" className="py-16 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0369A1] uppercase tracking-wider">
            HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP 5 SAO
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
          <p className="text-xs sm:text-sm text-slate-600">
            Hơn 30+ tiện ích đặc quyền nghỉ dưỡng, giải trí, thể thao và chăm sóc sức khỏe khoáng nóng Onsen đáp ứng tiêu chuẩn sống xa hoa thượng lưu.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS12_AMENITIES.map(item => (
            <div key={item.id} className="bg-slate-50 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-black text-[#0369A1] uppercase tracking-wider block">{item.subtitle}</span>
                  <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
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
  // 7. SECTION 5: THIẾT KẾ MẶT BẰNG PHÂN KHU (FLOORPLAN TABS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderMasterplan = () => (
    <section id="mat-bang" className="py-16 bg-[#F8FAFC] border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0369A1] uppercase tracking-wider">
            THIẾT KẾ MẶT BẰNG PHÂN KHU
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => setActiveFloorplanTab('shophouse')}
            className={`px-5 py-2.5 rounded-sm transition ${activeFloorplanTab === 'shophouse' ? 'bg-[#0369A1] text-white shadow' : 'bg-white text-slate-700 border'}`}
          >
            SINGAPORE SHOPHOUSE
          </button>
          <button
            onClick={() => setActiveFloorplanTab('wyndham')}
            className={`px-5 py-2.5 rounded-sm transition ${activeFloorplanTab === 'wyndham' ? 'bg-[#0369A1] text-white shadow' : 'bg-white text-slate-700 border'}`}
          >
            WYNDHAM GARDEN
          </button>
          <button
            onClick={() => setActiveFloorplanTab('silkpath')}
            className={`px-5 py-2.5 rounded-sm transition ${activeFloorplanTab === 'silkpath' ? 'bg-[#0369A1] text-white shadow' : 'bg-white text-slate-700 border'}`}
          >
            SONASEA SILK PATH
          </button>
          <button
            onClick={() => setActiveFloorplanTab('villa')}
            className={`px-5 py-2.5 rounded-sm transition ${activeFloorplanTab === 'villa' ? 'bg-[#0369A1] text-white shadow' : 'bg-white text-slate-700 border'}`}
          >
            OCEAN VILLA ĐẢO CỌ
          </button>
        </div>

        {/* Layout Detail Box */}
        <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block px-3 py-1 rounded-sm bg-blue-50 text-[#0369A1] text-[10px] font-black uppercase">
              {currentTabUnit.type}
            </span>
            <h3 className="text-lg font-black text-slate-900 uppercase">{currentTabUnit.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed break-words">{currentTabUnit.description}</p>
            
            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t">
              <p>📐 <strong>Diện tích đất:</strong> {currentTabUnit.landArea}</p>
              <p>🏗️ <strong>Diện tích xây dựng:</strong> {currentTabUnit.area}</p>
              <p>🚪 <strong>Mặt tiền:</strong> {currentTabUnit.frontage}</p>
              <p>🏢 <strong>Số tầng:</strong> {currentTabUnit.floors}</p>
              <p>💰 <strong>Giá bán tham khảo:</strong> <span className="text-[#E11D48] font-black text-sm">{currentTabUnit.price}</span></p>
            </div>

            <button
              onClick={() => handleOpenUnitDetail(currentTabUnit)}
              className="px-6 py-2.5 bg-[#0369A1] hover:bg-[#0284C7] text-white font-black text-xs uppercase rounded-sm shadow transition"
            >
              Xem Chi Tiết Căn Hộ ›
            </button>
          </div>

          <div className="lg:col-span-7 rounded-sm overflow-hidden border bg-slate-900">
            <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: THỰC TẾ DỰ ÁN & TIẾN ĐỘ THI CÔNG (8-GRID GALLERY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderProgressGallery = () => (
    <section id="tien-do" className="py-16 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0369A1] uppercase tracking-wider">
            THỰC TẾ DỰ ÁN & TIẾN ĐỘ THI CÔNG
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto" />
          <p className="text-xs sm:text-sm text-slate-600">
            Cập nhật những hình ảnh thực tế mới nhất tại đại công trường Sonasea Vân Đồn Harbor City tháng 08/2026.
          </p>
        </div>

        {/* 8 Grid Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BDS12_PROGRESS_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImg(img.img)}
              className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md group cursor-pointer border border-slate-200 hover:border-[#0369A1]"
            >
              <img src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white group-hover:text-amber-300 transition">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: FOOTER & FORM ĐĂNG KÝ BẢNG GIÁ
  // ─────────────────────────────────────────────────────────────────────────
  const renderSonaseaFooter = () => (
    <section id="lien-he" className="py-14 bg-[#0B1A30] text-slate-300 text-xs border-t border-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-serif font-black text-white block">{company?.name || 'TEMPLATESBDS'} HARBOR CITY</span>
            <p className="text-slate-400 leading-relaxed">
              Tổ hợp thương cảng quốc tế và đại đô thị nghỉ dưỡng giải trí 5 sao quy mô 358.5 ha do Tập đoàn CEO phát triển tại Vịnh Bái Tử Long.
            </p>
            <div className="space-y-1 text-slate-400 pt-2">
              <p>📍 Văn phòng dự án: Xã Hạ Long, Huyện Vân Đồn, Quảng Ninh</p>
              <p>🏢 Trụ sở CĐT: Tòa nhà CEO Tower, Phạm Hùng, Nam Từ Liêm, Hà Nội</p>
              <p>📞 Hotline: <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-[#FDE047] font-bold">0919 006 030</a></p>
              <p>✉️ Email: info@templatebds.com</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">DANH MỤC DỰ ÁN</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigate('overview')} className="hover:text-[#FDE047]">Tổng quan dự án</button></li>
              <li><button onClick={() => navigate('location')} className="hover:text-[#FDE047]">Vị trí đắc địa</button></li>
              <li><button onClick={() => navigate('amenities')} className="hover:text-[#FDE047]">Tiện ích 5 sao</button></li>
              <li><button onClick={() => navigate('masterplan')} className="hover:text-[#FDE047]">Mặt bằng phân khu</button></li>
              <li><button onClick={() => navigate('progress')} className="hover:text-[#FDE047]">Tiến độ thi công</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">ĐĂNG KÝ NHẬN BẢNG GIÁ ĐỢT 1</h4>
            <form onSubmit={handleLeadSubmit} className="space-y-2.5">
              <input
                type="text"
                placeholder="Họ và tên..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-lg text-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-lg text-white focus:outline-none font-bold text-[#FDE047]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-yellow-500 text-slate-950 font-black rounded-lg uppercase tracking-wider shadow"
              >
                GỬI YÊU CẦU NGAY
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SUBPAGES: PROPERTY DETAIL
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-blue-600">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('masterplan')} className="hover:text-blue-600">Mặt bằng</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedUnit.name}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#0369A1] text-white text-xs font-bold mb-2">
              {selectedUnit.type}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">{selectedUnit.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <Compass size={14} className="text-[#0369A1]" /> {selectedUnit.view}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold">Giá bán chính thức:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#E11D48]">{selectedUnit.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <PropertyImageGallery images={(selectedUnit as any)?.gallery || (selectedUnit as any)?.images} image={(selectedUnit as any)?.image || (selectedUnit as any)?.thumbnail} badge1={(selectedUnit as any)?.type || (selectedUnit as any)?.badge} badge2={(selectedUnit as any)?.direction || (selectedUnit as any)?.zone} themeColor="blue" />
            <div className="bg-slate-50 p-6 rounded-md border space-y-4">
              <h3 className="text-base font-black text-[#0369A1] uppercase">Thông Số & Tiêu Chuẩn Bàn Giao</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedUnit.description}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedUnit.specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-sm bg-blue-50 border border-blue-200 text-xs text-blue-900 font-bold">
                📜 Tiêu chuẩn bàn giao: {selectedUnit.handover}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-md border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase">Nhận Bảng Giá Chi Tiết Căn Này</h3>
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
                className="w-full py-3.5 bg-[#0369A1] hover:bg-[#0284C7] text-white font-black rounded-sm uppercase tracking-wider shadow"
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
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0369A1] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B1A30] text-[#FDE047] border border-blue-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-400" /> {toastMessage}
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
              title="Sonasea Van Don Harbor City"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
            {renderInvestAndPolicy()}
            {renderAmenities()}
            {renderMasterplan()}
            {renderProgressGallery()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'overview' && (
          <main>
            {renderOverview()}
            {renderLocation()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'location' && (
          <main>
            {renderLocation()}
            {renderOverview()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'amenities' && (
          <main>
            {renderAmenities()}
            {renderOverview()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'masterplan' && (
          <main>
            {renderMasterplan()}
            {renderProgressGallery()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'price-list' && (
          <main>
            {renderInvestAndPolicy()}
            {renderMasterplan()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'progress' && (
          <main>
            {renderProgressGallery()}
            {renderSonaseaFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && renderPropertyDetail()}

        {currentPage === 'contact' && (
          <main>
            {renderInvestAndPolicy()}
            {renderSonaseaFooter()}
          </main>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-12 (Sonasea Vân Đồn Harbor City — CEO Group)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
