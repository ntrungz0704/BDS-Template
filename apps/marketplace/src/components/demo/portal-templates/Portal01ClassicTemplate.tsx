'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Building2, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, InstagramIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';
import { 
  PORTAL_PROPERTIES, PORTAL_PROJECTS, PORTAL_NEWS, PORTAL_CITIES,
  PortalProperty, PortalProject, PortalNews 
} from './portalData';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// ── COLOR PALETTE: BATDONGSAN CLASSIC RED & NAVY ──────────────────────────────
const COLORS = {
  primary: '#D8232A',      // Classic BĐS Red
  primaryHover: '#B91C1C',
  primaryLight: '#FEE2E2',
  navy: '#002B49',         // Trust Navy
  navyDark: '#001A2C',
  accentGold: '#EAB308',
  bgGray: '#F4F5F7',
  border: '#E5E7EB',
  textDark: '#1E293B',
  textMuted: '#64748B',
};

export default function Portal01ClassicTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'bds-01';

  // ── ROUTING STATE ──
  const [currentPage, setCurrentPageState] = useState<string>(() => {
    if (!initialPage || initialPage === 'home') return 'home';
    return initialPage;
  });

  // Selected Detail States
  const [selectedProperty, setSelectedProperty] = useState<PortalProperty | null>(() => PORTAL_PROPERTIES[0]);
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(() => PORTAL_PROJECTS[0]);
  const [selectedNews, setSelectedNews] = useState<PortalNews | null>(() => PORTAL_NEWS[0]);

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Filter States
  const [filterCategory, setFilterCategory] = useState<'all' | 'ban' | 'thue' | 'sang-nhuong'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterDirection, setFilterDirection] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'area-desc'>('newest');

  // Interactive Lightbox / Modals
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [consignSubmitted, setConsignSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [savedPropertyIds, setSavedPropertyIds] = useState<number[]>([]);

  // Navigation Handler with URL Sync
  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'sale') urlSlug = 'nha-dat-ban';
    else if (page === 'rent') urlSlug = 'cho-thue';
    else if (page === 'transfer') urlSlug = 'sang-nhuong';
    else if (page === 'property-detail' && selectedProperty) urlSlug = `chi-tiet/${slug || selectedProperty.slug}`;
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'project-detail' && selectedProject) urlSlug = `du-an/${slug || selectedProject.slug}`;
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'news-detail' && selectedNews) urlSlug = `tin-tuc/${slug || selectedNews.slug}`;
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = slug || page;

    syncDemoUrl(urlSlug, tSlug);
  };

  // Direct Item Select Handlers
  const handleOpenProperty = (prop: PortalProperty) => {
    setSelectedProperty(prop);
    navigate('property-detail', prop.slug);
  };

  const handleOpenProject = (proj: PortalProject) => {
    setSelectedProject(proj);
    navigate('project-detail', proj.slug);
  };

  const handleOpenNews = (news: PortalNews) => {
    setSelectedNews(news);
    navigate('news-detail', news.slug);
  };

  const toggleSaveProperty = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Browser Popstate Back/Forward Sync
  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts.slice(2).join('/') : (parts[1] !== tSlug ? parts[1] : 'home');

      if (!sub || sub === 'home') {
        setCurrentPageState('home');
      } else if (sub === 'nha-dat-ban' || sub === 'sale') {
        setFilterCategory('ban');
        setCurrentPageState('sale');
      } else if (sub === 'cho-thue' || sub === 'rent') {
        setFilterCategory('thue');
        setCurrentPageState('rent');
      } else if (sub === 'sang-nhuong' || sub === 'transfer') {
        setFilterCategory('sang-nhuong');
        setCurrentPageState('transfer');
      } else if (sub.startsWith('chi-tiet/')) {
        const itemSlug = sub.replace('chi-tiet/', '');
        const found = PORTAL_PROPERTIES.find(p => p.slug === itemSlug || String(p.id) === itemSlug) || PORTAL_PROPERTIES[0];
        setSelectedProperty(found);
        setCurrentPageState('property-detail');
      } else if (sub === 'du-an' || sub === 'projects') {
        setCurrentPageState('projects');
      } else if (sub.startsWith('du-an/')) {
        const projSlug = sub.replace('du-an/', '');
        const found = PORTAL_PROJECTS.find(p => p.slug === projSlug || String(p.id) === projSlug) || PORTAL_PROJECTS[0];
        setSelectedProject(found);
        setCurrentPageState('project-detail');
      } else if (sub === 'tin-tuc' || sub === 'news') {
        setCurrentPageState('news');
      } else if (sub.startsWith('tin-tuc/')) {
        const newsSlug = sub.replace('tin-tuc/', '');
        const found = PORTAL_NEWS.find(n => n.slug === newsSlug || String(n.id) === newsSlug) || PORTAL_NEWS[0];
        setSelectedNews(found);
        setCurrentPageState('news-detail');
      } else if (sub === 'gioi-thieu' || sub === 'about') {
        setCurrentPageState('about');
      } else if (sub === 'lien-he' || sub === 'contact') {
        setCurrentPageState('contact');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tSlug]);

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return PORTAL_PROPERTIES.filter(item => {
      // Category filter
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      // Type filter
      if (filterType !== 'all' && item.type !== filterType) return false;
      // City filter
      if (filterCity !== 'all' && item.city !== filterCity) return false;
      // Direction filter
      if (filterDirection !== 'all' && item.direction !== filterDirection) return false;
      // Price range
      if (filterPrice === '<2' && item.priceNum >= 2) return false;
      if (filterPrice === '2-5' && (item.priceNum < 2 || item.priceNum > 5)) return false;
      if (filterPrice === '5-10' && (item.priceNum < 5 || item.priceNum > 10)) return false;
      if (filterPrice === '>10' && item.priceNum <= 10) return false;
      // Area range
      if (filterArea === '<50' && item.area >= 50) return false;
      if (filterArea === '50-100' && (item.area < 50 || item.area > 100)) return false;
      if (filterArea === '>100' && item.area <= 100) return false;
      // Keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        return item.title.toLowerCase().includes(q) || 
               item.address.toLowerCase().includes(q) || 
               item.district.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      if (sortBy === 'area-desc') return b.area - a.area;
      return b.id - a.id;
    });
  }, [filterCategory, filterType, filterCity, filterPrice, filterArea, filterDirection, searchKeyword, sortBy]);

  // ── HEADER COMPONENT ───────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#002B49] text-white text-xs py-2 px-4 border-b border-slate-700">
        <div className={`${MAX_W} mx-auto flex flex-wrap justify-between items-center gap-2`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Phone size={13} className="text-[#EAB308]" /> Hotline: <strong className="text-white hover:text-[#EAB308] cursor-pointer">1900 6868</strong> (08:00 - 21:00)
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Mail size={13} className="text-[#EAB308]" /> contact@batdongsan-classic.vn
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
              className="text-slate-200 hover:text-white transition font-medium"
            >
              Đăng nhập
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
              className="text-slate-200 hover:text-white transition font-medium"
            >
              Đăng ký
            </button>
            <button 
              onClick={() => navigate('contact')}
              className="px-3 py-1 bg-[#D8232A] hover:bg-[#B91C1C] text-white rounded font-bold text-xs flex items-center gap-1 transition shadow-xs"
            >
              <Plus size={13} /> Đăng Tin Miễn Phí
            </button>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className={`${MAX_W} mx-auto px-4 py-3.5 flex items-center justify-between`}>
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#D8232A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Building2 size={24} />
          </div>
          <div>
            <div className="text-xl font-black text-[#002B49] tracking-tight leading-none uppercase">
              BATDONGSAN<span className="text-[#D8232A]">.VN</span>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
              Cổng Thông Tin BĐS Số 1 Việt Nam
            </div>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm text-slate-700">
          <button 
            onClick={() => navigate('home')} 
            className={`px-3 py-2 rounded transition ${currentPage === 'home' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => { setFilterCategory('ban'); navigate('sale'); }} 
            className={`px-3 py-2 rounded transition ${currentPage === 'sale' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Nhà Đất Bán
          </button>
          <button 
            onClick={() => { setFilterCategory('thue'); navigate('rent'); }} 
            className={`px-3 py-2 rounded transition ${currentPage === 'rent' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Nhà Đất Cho Thuê
          </button>
          <button 
            onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} 
            className={`px-3 py-2 rounded transition ${currentPage === 'transfer' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Sang Nhượng
          </button>
          <button 
            onClick={() => navigate('projects')} 
            className={`px-3 py-2 rounded transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Dự Án
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`px-3 py-2 rounded transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`px-3 py-2 rounded transition ${currentPage === 'about' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`px-3 py-2 rounded transition ${currentPage === 'contact' ? 'text-[#D8232A] bg-red-50 font-bold' : 'hover:text-[#D8232A] hover:bg-slate-50'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* Saved Count & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('sale')}
            className="relative p-2 text-slate-600 hover:text-[#D8232A] transition"
            title="Tin đã lưu"
          >
            <Heart size={20} className={savedPropertyIds.length > 0 ? "fill-red-500 text-red-500" : ""} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D8232A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedPropertyIds.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2 text-sm font-semibold shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Nhà Đất Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Dự Án</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Tin Tức</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Liên Hệ & Ký Gửi</button>
          <div className="pt-2 border-t flex gap-2">
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="w-1/2 py-2 text-center bg-slate-100 rounded font-bold">Đăng Nhập</button>
            <button onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }} className="w-1/2 py-2 text-center bg-[#D8232A] text-white rounded font-bold">Đăng Ký</button>
          </div>
        </div>
      )}
    </header>
  );

  // ── SEARCH FILTER COMPONENT ─────────────────────────────────────────────────
  const renderSearchBar = () => (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 md:p-6">
      {/* Category Tabs */}
      <div className="flex border-b border-gray-200 mb-4 gap-2">
        {[
          { id: 'all', label: 'Tất Cả Nhà Đất' },
          { id: 'ban', label: 'Nhà Đất Bán' },
          { id: 'thue', label: 'Nhà Đất Cho Thuê' },
          { id: 'sang-nhuong', label: 'Sang Nhượng' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id as any)}
            className={`pb-2.5 px-3 text-xs md:text-sm font-bold border-b-2 transition -mb-[2px] ${
              filterCategory === tab.id
                ? 'border-[#D8232A] text-[#D8232A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Primary Search Input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo địa điểm, tên dự án, đường phố..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-[#D8232A] text-slate-800"
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="md:col-span-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D8232A]"
          >
            <option value="all">Loại bất động sản</option>
            <option value="Căn hộ chung cư">Căn hộ chung cư</option>
            <option value="Nhà phố">Nhà phố</option>
            <option value="Biệt thự">Biệt thự</option>
            <option value="Đất nền thổ cư">Đất nền thổ cư</option>
            <option value="Văn phòng">Văn phòng</option>
            <option value="Mặt bằng kinh doanh">Mặt bằng kinh doanh</option>
          </select>
        </div>

        {/* City Dropdown */}
        <div className="md:col-span-2">
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D8232A]"
          >
            <option value="all">Tỉnh / Thành phố</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Bình Dương">Bình Dương</option>
            <option value="Đồng Nai">Đồng Nai</option>
            <option value="Hải Phòng">Hải Phòng</option>
          </select>
        </div>

        {/* Price Dropdown */}
        <div className="md:col-span-2">
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#D8232A]"
          >
            <option value="all">Khoảng giá</option>
            <option value="<2">Dưới 2 tỷ</option>
            <option value="2-5">2 - 5 tỷ</option>
            <option value="5-10">5 - 10 tỷ</option>
            <option value=">10">Trên 10 tỷ</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            onClick={() => {
              if (currentPage === 'home') navigate('sale');
            }}
            className="w-full py-2.5 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-sm rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Search size={16} /> Tìm Kiếm
          </button>
        </div>
      </div>

      {/* Secondary Fast Filters */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-800">Lọc nhanh:</span>
          {['Tất cả', 'Căn hộ Quận 1', 'Nhà phố Quận 7', 'Vinhomes Hà Nội', 'Đất nền giá rẻ'].map((tag, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === 1) { setFilterCity('TP. Hồ Chí Minh'); setFilterType('Căn hộ chung cư'); }
                if (i === 2) { setFilterCity('TP. Hồ Chí Minh'); setFilterType('Nhà phố'); }
                if (i === 3) { setSearchKeyword('Vinhomes'); }
                if (i === 4) { setFilterType('Đất nền thổ cư'); setFilterPrice('<2'); }
                if (currentPage === 'home') navigate('sale');
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded transition"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterType('all');
              setFilterCity('all');
              setFilterPrice('all');
              setFilterArea('all');
              setFilterDirection('all');
              setSearchKeyword('');
            }}
            className="text-slate-400 hover:text-slate-700 underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  );

  // ── HORIZONTAL DENSE LISTING CARD (SIGNATURE OF TEMPLATE 01) ────────────────
  const renderHorizontalCard = (item: PortalProperty) => {
    const isSaved = savedPropertyIds.includes(item.id);
    return (
      <div
        key={item.id}
        onClick={() => handleOpenProperty(item)}
        className="bg-white rounded-lg border border-slate-200 hover:border-[#D8232A] p-3.5 flex flex-col sm:flex-row gap-4 cursor-pointer transition shadow-xs hover:shadow-md group relative"
      >
        {/* Left Thumbnail (4:3 ratio) */}
        <div className="sm:w-56 h-44 shrink-0 relative rounded-md overflow-hidden bg-slate-100">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.isHot && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#D8232A] text-white text-[10px] font-black uppercase rounded shadow-xs">
              HOT
            </span>
          )}
          {item.isVerified && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded flex items-center gap-0.5 shadow-xs">
              <CheckCircle2 size={10} /> Đã xác thực
            </span>
          )}
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium">
            📷 {item.images.length}
          </span>
        </div>

        {/* Right Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm md:text-base text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-2 leading-snug mb-2">
              {item.title}
            </h3>

            {/* Price & Area Specs */}
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <span className="text-lg font-black text-[#D8232A]">
                {item.price}
              </span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-slate-800 text-sm">
                {item.area} m²
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                {item.pricePerM2}
              </span>
            </div>

            {/* Location & Meta */}
            <div className="flex items-center text-xs text-slate-600 gap-1 mb-2">
              <MapPin size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{item.ward}, {item.district}, {item.city}</span>
            </div>

            {/* Room Specs & Direction */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              {item.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed size={13} className="text-slate-400" /> {item.bedrooms} PN
                </span>
              )}
              {item.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bath size={13} className="text-slate-400" /> {item.bathrooms} WC
                </span>
              )}
              <span className="flex items-center gap-1">
                <Compass size={13} className="text-slate-400" /> Hướng: {item.direction}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                <Shield size={11} /> {item.legal}
              </span>
            </div>
          </div>

          {/* Bottom Broker Card & Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
            <div className="flex items-center gap-2">
              <img src={item.author.avatar} alt={item.author.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="font-medium text-slate-700">{item.author.name}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">{item.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => toggleSaveProperty(item.id, e)}
                className={`p-1.5 rounded hover:bg-slate-100 transition ${isSaved ? 'text-red-500' : 'text-slate-400'}`}
                title={isSaved ? "Bỏ lưu" : "Lưu tin"}
              >
                <Heart size={16} className={isSaved ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── SIDEBAR COMPONENT (DENSE RIGHT SIDEBAR) ────────────────────────────────
  const renderSidebar = () => (
    <aside className="space-y-6">
      {/* 1. CTA KÝ GỬI NHÀ ĐẤT NHANH */}
      <div className="bg-gradient-to-br from-[#002B49] to-[#001A2C] text-white p-5 rounded-xl shadow-md border border-slate-700">
        <div className="flex items-center gap-2 text-[#EAB308] font-bold text-xs uppercase tracking-wider mb-2">
          <Award size={14} /> Dịch Vụ Môi Giới Chuyên Nghiệp
        </div>
        <h4 className="text-lg font-black text-white mb-2 leading-snug">
          Bạn Cần Bán Hoặc Cho Thuê BĐS Nhanh Chóng?
        </h4>
        <p className="text-slate-300 text-xs mb-4 leading-relaxed">
          Đăng ký ký gửi ngay để tiếp cận hơn 500.000+ khách hàng tiềm năng trên toàn quốc.
        </p>
        <button
          onClick={() => navigate('contact')}
          className="w-full py-2.5 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase rounded transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Send size={14} /> Ký Gửi Nhà Đất Ngay
        </button>
      </div>

      {/* 2. LỌC THEO KHU VỰC SÔI ĐỘNG */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h4 className="font-bold text-sm text-[#002B49] pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Khu Vực Nhiều Tin Đăng</span>
          <MapPin size={14} className="text-[#D8232A]" />
        </h4>
        <ul className="divide-y divide-slate-100 text-xs">
          {[
            { name: 'Quận 1, TP.HCM', count: '3,450 tin' },
            { name: 'Quận 7, TP.HCM', count: '4,890 tin' },
            { name: 'TP. Thủ Đức, TP.HCM', count: '8,120 tin' },
            { name: 'Cầu Giấy, Hà Nội', count: '5,230 tin' },
            { name: 'Nam Từ Liêm, Hà Nội', count: '4,100 tin' },
            { name: 'Sơn Trà, Đà Nẵng', count: '1,850 tin' },
            { name: 'Thuận An, Bình Dương', count: '2,900 tin' },
          ].map((loc, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  setSearchKeyword(loc.name.split(',')[0]);
                  navigate('sale');
                }}
                className="w-full py-2 flex justify-between items-center text-slate-600 hover:text-[#D8232A] transition group text-left"
              >
                <span className="group-hover:translate-x-1 transition-transform">📍 {loc.name}</span>
                <span className="text-slate-400 font-medium">{loc.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. DỰ ÁN TÀI TRỢ NỔI BẬT */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h4 className="font-bold text-sm text-[#002B49] pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Dự Án Nổi Bật</span>
          <Star size={14} className="text-[#EAB308]" />
        </h4>
        <div className="space-y-4 mt-3">
          {PORTAL_PROJECTS.slice(0, 2).map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className="cursor-pointer group"
            >
              <div className="h-32 rounded-lg overflow-hidden relative mb-2">
                <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                  {proj.priceRange}
                </span>
              </div>
              <h5 className="font-bold text-xs text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-1">
                {proj.title}
              </h5>
              <p className="text-[11px] text-slate-500 truncate">{proj.developer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BANNER QUẢNG CÁO MÔI GIỚI */}
      <div className="rounded-xl overflow-hidden relative shadow-sm border border-slate-200 bg-amber-500 text-white p-6 text-center">
        <div className="text-2xl font-black mb-1">VAY MUA NHÀ 0%</div>
        <p className="text-xs text-amber-100 mb-3">Lãi suất ưu đãi cố định 2 năm từ đối tác ngân hàng Techcombank & VPBank.</p>
        <button
          onClick={() => navigate('contact')}
          className="px-4 py-2 bg-white text-amber-900 font-bold text-xs rounded uppercase hover:bg-amber-100 transition shadow-xs"
        >
          Tính Lãi Suất Ngay
        </button>
      </div>
    </aside>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="space-y-10 pb-16 bg-[#F4F5F7]">
      {/* Hero & Search Header */}
      <section className="bg-gradient-to-b from-[#002B49] to-[#001A2C] text-white pt-8 pb-14 px-4">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-block px-3 py-1 bg-[#D8232A]/90 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-xs">
            Hơn 100.000+ Bất Động Sản Chính Chủ
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Tìm Kiếm Ngôi Nhà Mơ Ước Của Bạn
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-light">
            Mua bán, cho thuê nhà đất, căn hộ cao cấp, biệt thự, dự án quy hoạch chính xác nhất.
          </p>
        </div>

        {/* Floating Search Bar */}
        <div className={`${MAX_W} mx-auto -mb-20 relative z-10`}>
          {renderSearchBar()}
        </div>
      </section>

      {/* Quick Category Icons */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { icon: Building2, label: 'Căn Hộ Chung Cư', count: '12,450 tin', type: 'Căn hộ chung cư' },
            { icon: Home, label: 'Nhà Phố Mặt Tiền', count: '8,900 tin', type: 'Nhà phố' },
            { icon: Trees, label: 'Biệt Thự / Villa', count: '3,200 tin', type: 'Biệt thự' },
            { icon: MapPin, label: 'Đất Nền Thổ Cư', count: '15,600 tin', type: 'Đất nền thổ cư' },
            { icon: Coffee, label: 'Mặt Bằng Kinh Doanh', count: '4,100 tin', type: 'Mặt bằng kinh doanh' },
            { icon: Users, label: 'Văn Phòng Cho Thuê', count: '2,850 tin', type: 'Văn phòng' },
          ].map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                onClick={() => {
                  setFilterType(cat.type);
                  navigate('sale');
                }}
                className="bg-white border border-slate-200 hover:border-[#D8232A] p-4 rounded-xl text-center cursor-pointer transition shadow-xs hover:shadow-md group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-[#D8232A] group-hover:bg-[#D8232A] group-hover:text-white flex items-center justify-center mb-2 transition">
                  <Icon size={22} />
                </div>
                <h4 className="font-bold text-xs text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-1">{cat.label}</h4>
                <span className="text-[10px] text-slate-400">{cat.count}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content Area: Left Listings + Right Dense Sidebar */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Listings Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b-2 border-[#D8232A] pb-2">
              <h2 className="text-lg md:text-xl font-black text-[#002B49] flex items-center gap-2 uppercase tracking-tight">
                <span className="w-2.5 h-2.5 bg-[#D8232A] rounded-full inline-block"></span>
                Bất Động Sản Nổi Bật Toàn Quốc
              </h2>
              <button
                onClick={() => navigate('sale')}
                className="text-xs font-bold text-[#D8232A] hover:underline flex items-center gap-1"
              >
                Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
              </button>
            </div>

            {/* List of Horizontal Cards */}
            <div className="space-y-4">
              {filteredProperties.slice(0, 6).map(renderHorizontalCard)}
            </div>

            {/* Load More Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => navigate('sale')}
                className="px-8 py-3 bg-white border border-slate-300 hover:border-[#D8232A] text-slate-700 hover:text-[#D8232A] font-bold text-xs uppercase rounded-lg transition shadow-xs inline-flex items-center gap-2"
              >
                Xem Thêm Tin Đăng Khác <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <div className="lg:col-span-4">
            {renderSidebar()}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel / Grid Block */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black text-[#D8232A] uppercase tracking-wider">Khám phá đại đô thị</span>
              <h2 className="text-xl md:text-2xl font-black text-[#002B49]">Dự Án Bất Động Sản Tiêu Biểu</h2>
            </div>
            <button
              onClick={() => navigate('projects')}
              className="text-xs font-bold text-[#D8232A] hover:underline flex items-center gap-1"
            >
              Tất cả dự án <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTAL_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenProject(proj)}
                className="rounded-xl overflow-hidden border border-slate-200 hover:border-[#D8232A] bg-white transition shadow-xs hover:shadow-lg cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#D8232A] text-white font-black text-xs rounded shadow-xs">
                      {proj.status}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 text-white font-bold text-xs rounded">
                      {proj.priceRange}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{proj.developer}</span>
                    <h3 className="font-bold text-base text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-1 mb-2">
                      {proj.title}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 gap-1 mb-3">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                      {proj.overview}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-3">
                  <span>Quy mô: <strong>{proj.scale.split('-')[0]}</strong></span>
                  <span className="text-[#D8232A] font-bold flex items-center gap-0.5">Chi tiết →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Location Showcase Block */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black text-[#D8232A] uppercase tracking-wider">Khu vực sôi động</span>
            <h2 className="text-xl md:text-2xl font-black text-[#002B49]">Bất Động Sản Theo Tỉnh Thành Lớn</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PORTAL_CITIES.map((city) => (
            <div
              key={city.id}
              onClick={() => {
                setFilterCity(city.name as any);
                navigate('sale');
              }}
              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-md"
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3.5 text-white">
                <h4 className="font-bold text-sm group-hover:text-[#EAB308] transition leading-tight">{city.name}</h4>
                <span className="text-[11px] text-slate-300 mt-0.5">{city.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News & Market Analysis Block + Ad Banner */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#D8232A] pb-2">
              <h2 className="text-lg md:text-xl font-black text-[#002B49] uppercase tracking-tight">
                Tin Tức & Cẩm Nang Bất Động Sản
              </h2>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#D8232A] hover:underline flex items-center gap-1">
                Xem tất cả tin <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PORTAL_NEWS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenNews(item)}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 hover:border-[#D8232A] cursor-pointer transition shadow-xs hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-36 rounded-lg overflow-hidden mb-3 bg-slate-100">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <span className="text-[10px] font-bold text-[#D8232A] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs md:text-sm text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light mb-3">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>🕒 {item.date}</span>
                    <span className="text-slate-600 font-medium">👁️ {item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Subscribe Box */}
          <div className="lg:col-span-4 bg-[#002B49] text-white p-6 rounded-2xl shadow-lg border border-slate-700 space-y-4">
            <span className="px-2.5 py-0.5 bg-[#EAB308] text-slate-900 font-bold text-[10px] uppercase rounded">
              Bản Tin BĐS 24/7
            </span>
            <h3 className="text-xl font-black text-white leading-snug">
              Nhận Báo Cáo Giá Nhà Đất & Dự Án Mới Nhất
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Đăng ký để nhận phân tích biến động giá thị trường, bảng hàng độc quyền và thông tin quy hoạch mới nhất mỗi sáng thứ Hai.
            </p>

            {newsletterSubmitted ? (
              <div className="p-4 bg-emerald-900/50 border border-emerald-500 rounded-lg text-center text-emerald-200 text-xs">
                ✓ Đăng ký thành công! Bạn sẽ nhận bản tin vào hòm thư sớm nhất.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubmitted(true);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Nhập địa chỉ email của bạn..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D8232A]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase rounded-lg transition shadow-md"
                >
                  Đăng Ký Miễn Phí
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  // ── 2. SUBPAGE 1: LISTING CATALOG (SALE / RENT / TRANSFER) ─────────────────
  const renderListingCatalogPage = () => {
    const pageTitle = filterCategory === 'thue' 
      ? 'Nhà Đất Cho Thuê Toàn Quốc' 
      : filterCategory === 'sang-nhuong' 
        ? 'Sang Nhượng Mặt Bằng & Cơ Sở Kinh Doanh' 
        : 'Nhà Đất Bán Toàn Quốc';

    return (
      <div className="py-8 bg-[#F4F5F7] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
            <span>/</span>
            <span className="text-[#002B49] font-bold">{pageTitle}</span>
          </nav>

          {/* Search Bar on Catalog */}
          {renderSearchBar()}

          {/* Filter Bar & Sort Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="text-sm font-bold text-[#002B49]">
              Tìm thấy <span className="text-[#D8232A]">{filteredProperties.length}</span> bất động sản phù hợp
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sắp xếp theo:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#D8232A]"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="area-desc">Diện tích lớn nhất</option>
              </select>
            </div>
          </div>

          {/* Grid of Results + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {filteredProperties.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center border border-slate-200 space-y-3">
                  <AlertCircle size={40} className="mx-auto text-slate-400" />
                  <h3 className="text-base font-bold text-slate-700">Không tìm thấy bất động sản phù hợp</h3>
                  <p className="text-xs text-slate-500">Vui lòng thử lại với các tiêu chí tìm kiếm hoặc khoảng giá khác.</p>
                  <button
                    onClick={() => {
                      setFilterCategory('all');
                      setFilterType('all');
                      setFilterCity('all');
                      setFilterPrice('all');
                      setSearchKeyword('');
                    }}
                    className="px-4 py-2 bg-[#D8232A] text-white text-xs font-bold rounded"
                  >
                    Xóa Toàn Bộ Bộ Lọc
                  </button>
                </div>
              ) : (
                filteredProperties.map(renderHorizontalCard)
              )}

              {/* Pagination */}
              {filteredProperties.length > 0 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-600 hover:border-[#D8232A] disabled:opacity-50">← Trước</button>
                  <button className="px-3.5 py-1.5 bg-[#D8232A] text-white rounded text-xs font-bold">1</button>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-700 hover:border-[#D8232A]">2</button>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-700 hover:border-[#D8232A]">3</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-600 hover:border-[#D8232A]">Sau →</button>
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              {renderSidebar()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── 3. SUBPAGE 2: PROPERTY DETAIL VIEW ─────────────────────────────────────
  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    const isSaved = savedPropertyIds.includes(selectedProperty.id);

    return (
      <div className="py-8 bg-[#F4F5F7] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs text-slate-500">
            <nav className="flex items-center gap-1.5">
              <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
              <span>/</span>
              <button onClick={() => navigate('sale')} className="hover:text-[#D8232A]">{selectedProperty.type}</button>
              <span>/</span>
              <span className="text-[#002B49] font-bold truncate max-w-md">{selectedProperty.title}</span>
            </nav>
            <button
              onClick={() => navigate('sale')}
              className="text-[#D8232A] hover:underline font-bold flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Quay lại danh sách
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Details (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Main Info Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                {/* Photo Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
                  <div 
                    onClick={() => setLightboxImg(selectedProperty.images[0])}
                    className="md:col-span-3 h-80 bg-slate-100 cursor-pointer overflow-hidden relative group"
                  >
                    <img src={selectedProperty.images[0]} alt={selectedProperty.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 text-white text-xs rounded font-medium flex items-center gap-1">
                      <Maximize size={13} /> Phóng to ({selectedProperty.images.length} ảnh)
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col gap-2">
                    {selectedProperty.images.slice(1, 4).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setLightboxImg(img)}
                        className="h-[102px] bg-slate-100 cursor-pointer overflow-hidden group"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title & Location Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-red-100 text-[#D8232A] font-bold text-xs rounded uppercase">
                      {selectedProperty.category === 'thue' ? 'Cho Thuê' : 'Bán'}
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded">
                      {selectedProperty.legal}
                    </span>
                    {selectedProperty.isHot && (
                      <span className="px-2 py-0.5 bg-[#D8232A] text-white font-black text-xs rounded">
                        HOT
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl md:text-2xl font-black text-[#002B49] leading-snug mb-2">
                    {selectedProperty.title}
                  </h1>
                  <div className="flex items-center text-xs text-slate-600 gap-1.5">
                    <MapPin size={15} className="text-[#D8232A] shrink-0" />
                    <span>{selectedProperty.address}</span>
                  </div>
                </div>

                {/* Main Key Highlights Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Mức giá</span>
                    <strong className="text-xl font-black text-[#D8232A]">{selectedProperty.price}</strong>
                    <span className="text-[10px] text-slate-500 block">{selectedProperty.pricePerM2}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Diện tích</span>
                    <strong className="text-xl font-black text-slate-800">{selectedProperty.area} m²</strong>
                    <span className="text-[10px] text-slate-500 block">Sử dụng thực tế</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Phòng ngủ</span>
                    <strong className="text-xl font-black text-slate-800">{selectedProperty.bedrooms} PN</strong>
                    <span className="text-[10px] text-slate-500 block">{selectedProperty.bathrooms} WC</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Hướng nhà</span>
                    <strong className="text-xl font-black text-slate-800">{selectedProperty.direction}</strong>
                    <span className="text-[10px] text-slate-500 block">Phong thủy tốt</span>
                  </div>
                </div>

                {/* Description Text */}
                <div className="space-y-3">
                  <h3 className="font-bold text-base text-[#002B49] pb-2 border-b border-slate-100">
                    Thông Tin Chi Tiết & Mô Tả
                  </h3>
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light">
                    {selectedProperty.description}
                  </div>
                </div>

                {/* Features & Amenities List */}
                <div className="space-y-3">
                  <h3 className="font-bold text-base text-[#002B49] pb-2 border-b border-slate-100">
                    Đặc Điểm & Tiện Ích Nổi Bật
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProperty.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 font-medium">
                        <Check size={14} className="text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="space-y-3">
                  <h3 className="font-bold text-base text-[#002B49] pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>Vị Trí Trên Bản Đồ</span>
                    <span className="text-xs text-slate-400 font-normal">{selectedProperty.district}, {selectedProperty.city}</span>
                  </h3>
                  <div className="h-64 rounded-xl overflow-hidden border border-slate-200 shadow-xs relative">
                    <iframe
                      title="Google Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Related Properties */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-[#002B49] border-b-2 border-[#D8232A] pb-2">
                  Bất Động Sản Tương Tự Cùng Khu Vực
                </h3>
                <div className="space-y-4">
                  {PORTAL_PROPERTIES.filter(p => p.id !== selectedProperty.id).slice(0, 3).map(renderHorizontalCard)}
                </div>
              </div>
            </div>

            {/* Right Sticky Broker Profile & Quick Contact Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <img
                    src={selectedProperty.author.avatar}
                    alt={selectedProperty.author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D8232A]"
                  />
                  <div>
                    <h4 className="font-bold text-base text-[#002B49] flex items-center gap-1">
                      {selectedProperty.author.name}
                      {selectedProperty.author.verified && <CheckCircle size={14} className="text-blue-600" />}
                    </h4>
                    <p className="text-xs text-slate-500">{selectedProperty.author.role}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                      <span>★ {selectedProperty.author.rating}</span>
                      <span className="text-slate-400 font-normal">({selectedProperty.author.ratingCount} đánh giá)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <a
                    href={`tel:${selectedProperty.author.phone.replace(/\s+/g, '')}`}
                    className="w-full py-3 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-black text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Phone size={16} /> {selectedProperty.author.phone}
                  </a>
                  <a
                    href={`https://zalo.me/${selectedProperty.author.zalo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#0068FF] hover:bg-[#0054cc] text-white font-black text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <ZaloIcon className="w-5 h-5" /> Chat Zalo Ngay
                  </a>
                  <button
                    onClick={(e) => toggleSaveProperty(selectedProperty.id, e)}
                    className={`w-full py-2.5 border rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                      isSaved 
                        ? 'border-red-300 bg-red-50 text-red-600' 
                        : 'border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Heart size={15} className={isSaved ? "fill-red-500 text-red-500" : ""} />
                    {isSaved ? "Đã Lưu Tin Đăng Này" : "Lưu Tin Đăng"}
                  </button>
                </div>

                {/* Quick Consultation Form */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Gửi Yêu Cầu Xem Nhà Trực Tiếp
                  </h5>
                  {contactSubmitted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded text-center">
                      ✓ Yêu cầu của bạn đã được gửi tới chuyên viên!
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSubmitted(true);
                      }}
                      className="space-y-2.5 text-xs"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Họ và tên của bạn..."
                        className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#D8232A]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại liên hệ..."
                        className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#D8232A]"
                      />
                      <textarea
                        rows={2}
                        defaultValue={`Tôi muốn đặt lịch xem căn ${selectedProperty.title} vào cuối tuần này.`}
                        className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#D8232A]"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#002B49] hover:bg-[#001A2C] text-white font-bold text-xs uppercase rounded transition"
                      >
                        Đặt Lịch Xem Nhà Ngay
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── 4. SUBPAGE 3: PROJECTS LIST VIEW ───────────────────────────────────────
  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F4F5F7] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
          <span>/</span>
          <span className="text-[#002B49] font-bold">Danh Sách Dự Án Bất Động Sản</span>
        </nav>

        {/* Page Banner */}
        <div className="bg-[#002B49] text-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-xs font-black text-[#EAB308] uppercase tracking-wider">Tổng Hợp Quy Hoạch 2026</span>
            <h1 className="text-2xl md:text-4xl font-black text-white mt-1">Đại Đô Thị & Dự Án Trọng Điểm</h1>
            <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-xl font-light">
              Khám phá giỏ hàng độc quyền từ các chủ đầu tư danh tiếng Vingroup, Masterise Homes, Ecopark, Novaland.
            </p>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="px-6 py-3 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase rounded-lg shrink-0 shadow-sm transition"
          >
            Đăng Ký Nhận Bảng Hàng F1
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#D8232A] overflow-hidden shadow-xs hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative bg-slate-100 overflow-hidden">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#D8232A] text-white text-xs font-black rounded uppercase">
                    {proj.status}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 text-white font-black text-xs rounded">
                    {proj.priceRange}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{proj.developer}</span>
                  <h3 className="text-lg font-bold text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-1">
                    {proj.title}
                  </h3>
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <MapPin size={14} className="text-[#D8232A] shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                    {proj.overview}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                <span>Quy mô: <strong>{proj.scale.split('-')[0]}</strong></span>
                <span className="text-[#D8232A] font-bold">Xem Chi Tiết →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── 5. SUBPAGE 4: PROJECT MINI LANDING DETAIL ──────────────────────────────
  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#F4F5F7] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
          {/* Breadcrumb */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
            <nav className="flex items-center gap-1.5">
              <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
              <span>/</span>
              <button onClick={() => navigate('projects')} className="hover:text-[#D8232A]">Dự án</button>
              <span>/</span>
              <span className="text-[#002B49] font-bold">{selectedProject.title}</span>
            </nav>
            <button
              onClick={() => navigate('projects')}
              className="text-[#D8232A] hover:underline font-bold flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Tất cả dự án
            </button>
          </div>

          {/* Project Hero Banner */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-900">
            <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001A2C] via-[#002B49]/40 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              <span className="px-3 py-1 bg-[#D8232A] text-white font-black text-xs uppercase rounded w-fit mb-2 shadow-xs">
                Chủ đầu tư: {selectedProject.developer}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-2">
                {selectedProject.title}
              </h1>
              <p className="text-slate-200 text-xs md:text-sm max-w-2xl font-light">
                {selectedProject.location} • Quy mô: {selectedProject.scale}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Overview & Legal */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#002B49] pb-3 border-b border-slate-100">
                  Tổng Quan Dự Án
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-light">
                  {selectedProject.overview}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Trạng thái:</span>
                    <strong className="text-slate-800 text-sm">{selectedProject.status}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Bàn giao:</span>
                    <strong className="text-slate-800 text-sm">{selectedProject.handoverDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Pháp lý:</span>
                    <strong className="text-emerald-700 text-sm">{selectedProject.legal}</strong>
                  </div>
                </div>
              </div>

              {/* 6-Star Amenities */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#002B49] pb-3 border-b border-slate-100">
                  Hệ Thống Tiện Ích Đẳng Cấp
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.amenities.map((amen, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-[#D8232A] flex items-center justify-center shrink-0">
                        <Star size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#002B49] mb-1">{amen.title}</h4>
                        <p className="text-xs text-slate-500 font-light leading-relaxed">{amen.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Masterplan & Units Table */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-[#002B49] pb-3 border-b border-slate-100">
                  Mặt Bằng & Bảng Hàng Sản Phẩm
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="p-3 font-bold">Loại Căn</th>
                        <th className="p-3 font-bold">Diện Tích</th>
                        <th className="p-3 font-bold">Thiết Kế</th>
                        <th className="p-3 font-bold">Mức Giá</th>
                        <th className="p-3 font-bold text-center">Tình Trạng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {selectedProject.units.map((unit, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-bold text-[#002B49]">{unit.type}</td>
                          <td className="p-3">{unit.area}</td>
                          <td className="p-3">{unit.bedrooms} / {unit.bathrooms}</td>
                          <td className="p-3 font-bold text-[#D8232A]">{unit.price}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Project Lead Form */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5 lg:sticky lg:top-24">
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-black text-[#D8232A] uppercase tracking-wider">Phân Phối F1 Chính Thức</span>
                <h4 className="text-lg font-black text-[#002B49] mt-1">Nhận Bảng Giá & Chính Sách Chiết Khấu</h4>
              </div>

              {contactSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded text-center">
                  ✓ Bạn đã đăng ký nhận tài liệu dự án thành công!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn..."
                    className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#D8232A]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại nhận Zalo/Brochure..."
                    className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#D8232A]"
                  />
                  <select className="w-full p-2.5 border border-slate-300 rounded text-slate-700 focus:outline-none focus:border-[#D8232A]">
                    <option>Chọn loại căn quan tâm</option>
                    <option>Căn hộ 2 Phòng ngủ</option>
                    <option>Căn hộ 3 Phòng ngủ</option>
                    <option>Shophouse / Nhà phố</option>
                    <option>Biệt thự</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-black text-xs uppercase rounded-lg transition shadow-sm"
                  >
                    Tải Trọn Bộ Bảng Giá & Mặt Bằng PDF
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── 6. SUBPAGE 5 & 6: NEWS LIST & NEWS DETAIL ─────────────────────────────
  const renderNewsPage = () => (
    <div className="py-8 bg-[#F4F5F7] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
          <span>/</span>
          <span className="text-[#002B49] font-bold">Tin Tức Thị Trường & Pháp Lý BĐS</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="border-b-2 border-[#D8232A] pb-2">
              <h1 className="text-xl md:text-2xl font-black text-[#002B49] uppercase tracking-tight">
                Cẩm Nang Mua Bán & Phân Tích Chuyên Sâu
              </h1>
            </div>

            <div className="space-y-6">
              {PORTAL_NEWS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenNews(item)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#D8232A] cursor-pointer transition shadow-xs hover:shadow-md flex flex-col sm:flex-row gap-5 group"
                >
                  <div className="sm:w-60 h-40 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#D8232A] uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-[#002B49] group-hover:text-[#D8232A] transition line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light">
                        {item.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-2">
                      <span>✍️ {item.author}</span>
                      <span>🕒 {item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            {renderSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsDetailPage = () => {
    if (!selectedNews) return null;
    return (
      <div className="py-8 bg-[#F4F5F7] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
            <nav className="flex items-center gap-1.5">
              <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
              <span>/</span>
              <button onClick={() => navigate('news')} className="hover:text-[#D8232A]">Tin tức</button>
              <span>/</span>
              <span className="text-[#002B49] font-bold truncate max-w-md">{selectedNews.title}</span>
            </nav>
            <button
              onClick={() => navigate('news')}
              className="text-[#D8232A] hover:underline font-bold flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Tất cả tin tức
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <article className="lg:col-span-8 bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-red-100 text-[#D8232A] font-bold text-xs rounded uppercase">
                  {selectedNews.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#002B49] leading-tight">
                  {selectedNews.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
                  <span>✍️ Tác giả: <strong>{selectedNews.author}</strong></span>
                  <span>🕒 {selectedNews.date}</span>
                  <span>👁️ {selectedNews.views} lượt xem</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-l-4 border-[#D8232A] text-sm font-semibold text-slate-800 leading-relaxed">
                {selectedNews.summary}
              </div>

              <div className="h-80 rounded-xl overflow-hidden bg-slate-100">
                <img src={selectedNews.img} alt={selectedNews.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-light">
                {selectedNews.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Từ khóa:</span>
                {selectedNews.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>

            <div className="lg:col-span-4">
              {renderSidebar()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── 7. SUBPAGE 7: ABOUT US ────────────────────────────────────────────────
  const renderAboutPage = () => (
    <div className="py-8 bg-[#F4F5F7] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
          <span>/</span>
          <span className="text-[#002B49] font-bold">Giới Thiệu Về Chúng Tôi</span>
        </nav>

        {/* Hero About */}
        <div className="bg-[#002B49] text-white p-8 md:p-12 rounded-2xl shadow-xl text-center max-w-4xl mx-auto space-y-4">
          <span className="px-3 py-1 bg-[#D8232A] text-white font-bold text-xs uppercase rounded-full">
            Thương Hiệu BĐS Uy Tín Hàng Đầu
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Kết Nối Hàng Triệu Khách Hàng Với Bất Động Sản Hoàn Hảo
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Thành lập từ năm 2015, chúng tôi tự hào là sàn giao dịch và cổng thông tin bất động sản minh bạch, chuyên nghiệp và hiệu quả nhất Việt Nam.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: '10+', label: 'Năm Phát Triển' },
            { num: '500.000+', label: 'Tin Đăng Mỗi Năm' },
            { num: '15.000+', label: 'Giao Dịch Thành Công' },
            { num: '98%', label: 'Khách Hàng Hài Lòng' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-3xl font-black text-[#D8232A] mb-1">{stat.num}</div>
              <div className="text-xs font-semibold text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xl font-bold text-[#002B49]">Tầm Nhìn Chiến Lược</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
              Trở thành hệ sinh thái công nghệ Bất Động Sản toàn diện hàng đầu Đông Nam Á, nơi mọi giao dịch mua bán, thuê và đầu tư đều được bảo đảm bằng dữ liệu quy hoạch minh bạch và sự tận tâm tuyệt đối.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xl font-bold text-[#002B49]">Sứ Mệnh Phục Vụ</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
              Đồng hành cùng khách hàng tìm kiếm chốn an cư lạc nghiệp vững bền, gia tăng tối đa giá trị tài sản cho nhà đầu tư và xây dựng môi trường hành nghề chuẩn mực cho hàng ngàn chuyên viên môi giới.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ── 8. SUBPAGE 8: CONTACT & CONSIGNMENT ─────────────────────────────────────
  const renderContactPage = () => (
    <div className="py-8 bg-[#F4F5F7] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-[#D8232A]">Trang chủ</button>
          <span>/</span>
          <span className="text-[#002B49] font-bold">Liên Hệ & Ký Gửi Nhà Đất</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Ký Gửi & Liên Hệ */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-black text-[#D8232A] uppercase tracking-wider">Hỗ Trợ 24/7</span>
              <h1 className="text-2xl font-black text-[#002B49] mt-1">Gửi Yêu Cầu Tư Vấn / Ký Gửi Nhà Đất</h1>
              <p className="text-xs text-slate-500 mt-1">Chuyên viên của chúng tôi sẽ liên hệ lại bạn trong vòng 15 phút.</p>
            </div>

            {consignSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-center space-y-2">
                <div className="text-lg font-bold">✓ Gửi Thông Tin Thành Công!</div>
                <p className="text-xs">Bộ phận tư vấn đã nhận được thông tin và sẽ gọi hỗ trợ bạn ngay.</p>
                <button onClick={() => setConsignSubmitted(false)} className="text-xs font-bold text-[#D8232A] underline mt-3">Gửi yêu cầu khác</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsignSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Họ và tên *</label>
                    <input type="text" required placeholder="Nguyễn Văn A" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Số điện thoại *</label>
                    <input type="tel" required placeholder="0908 123 456" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email</label>
                    <input type="email" placeholder="email@gmail.com" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nhu cầu</label>
                    <select className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none">
                      <option>Cần bán nhà đất</option>
                      <option>Cần cho thuê</option>
                      <option>Cần mua để ở / đầu tư</option>
                      <option>Tư vấn pháp lý & quy hoạch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nội dung chi tiết (Vị trí, diện tích, giá kỳ vọng...)</label>
                  <textarea rows={4} required placeholder="Ví dụ: Tôi có căn hộ 2PN tại Landmark 81 muốn gửi bán giá 7.5 tỷ..." className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase rounded-lg transition shadow-md"
                >
                  Gửi Yêu Cầu Ký Gửi Ngay
                </button>
              </form>
            )}
          </div>

          {/* Right Info: Company Branches & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#002B49] text-white p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="font-bold text-base text-[#EAB308]">TRỤ SỞ & VĂN PHÒNG ĐẠI DIỆN</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#D8232A] shrink-0 mt-0.5" />
                  <span><strong>Hội sở TP.HCM:</strong> Tầng 18, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Q.1, TP.HCM</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#D8232A] shrink-0 mt-0.5" />
                  <span><strong>Chi nhánh Hà Nội:</strong> Tầng 12, Tòa nhà Keangnam Landmark 72, Phạm Hùng, Q. Nam Từ Liêm, Hà Nội</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#EAB308] shrink-0" />
                  <span>Hotline CSKH: <strong>1900 6868</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[#EAB308] shrink-0" />
                  <span>contact@batdongsan-classic.vn</span>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Bản đồ công ty"
                src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── 9. AUTH MODAL: LOGIN / REGISTER ────────────────────────────────────────
  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in"
        onClick={() => setIsAuthModalOpen(false)}
      >
        <div 
          className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
          >
            <X size={20} />
          </button>

          {/* Toggle Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`w-1/2 pb-3 font-bold text-sm text-center border-b-2 transition ${
                authMode === 'login' ? 'border-[#D8232A] text-[#D8232A]' : 'border-transparent text-slate-400'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`w-1/2 pb-3 font-bold text-sm text-center border-b-2 transition ${
                authMode === 'register' ? 'border-[#D8232A] text-[#D8232A]' : 'border-transparent text-slate-400'
              }`}
            >
              Đăng Ký Mới
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthModalOpen(false);
              alert(authMode === 'login' ? 'Đăng nhập thành công!' : 'Đăng ký tài khoản thành công!');
            }}
            className="space-y-4 text-xs"
          >
            {authMode === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ và tên của bạn</label>
                <input type="text" required placeholder="Nguyễn Văn A" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
              </div>
            )}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Số điện thoại hoặc Email</label>
              <input type="text" required placeholder="0908123456 hoặc email@gmail.com" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Mật khẩu</label>
              <input type="password" required placeholder="••••••••" className="w-full p-2.5 border rounded focus:border-[#D8232A] focus:outline-none" />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase rounded-lg transition shadow-md mt-2"
            >
              {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Môi Giới'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ── FOOTER COMPONENT ───────────────────────────────────────────────────────
  const renderFooter = () => (
    <footer className="bg-[#001A2C] text-white pt-12 pb-8 border-t-4 border-[#D8232A]">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#D8232A] flex items-center justify-center text-white">
                <Building2 size={18} />
              </div>
              <span className="text-lg font-black tracking-tight uppercase">
                BATDONGSAN<span className="text-[#D8232A]">.VN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Cổng thông tin & sàn giao dịch BĐS hàng đầu Việt Nam. Cung cấp dữ liệu nhà đất, giá bán, pháp lý và kết nối môi giới chuyên nghiệp.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center cursor-pointer transition">
                <FacebookIcon className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#0068FF] flex items-center justify-center cursor-pointer transition">
                <ZaloIcon className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center cursor-pointer transition">
                <YoutubeIcon className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Nhà đất bán */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#EAB308] uppercase tracking-wider">Nhà Đất Bán</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li><button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="hover:text-white transition">Bán căn hộ chung cư</button></li>
              <li><button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="hover:text-white transition">Bán nhà phố, biệt thự</button></li>
              <li><button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="hover:text-white transition">Bán đất nền dự án</button></li>
              <li><button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="hover:text-white transition">Bán shophouse thương mại</button></li>
              <li><button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="hover:text-white transition">Bán kho xưởng công nghiệp</button></li>
            </ul>
          </div>

          {/* Col 3: Nhà đất cho thuê */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#EAB308] uppercase tracking-wider">Nhà Đất Cho Thuê</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li><button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="hover:text-white transition">Cho thuê chung cư</button></li>
              <li><button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="hover:text-white transition">Cho thuê nhà nguyên căn</button></li>
              <li><button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="hover:text-white transition">Cho thuê mặt bằng kinh doanh</button></li>
              <li><button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="hover:text-white transition">Cho thuê văn phòng trọn gói</button></li>
              <li><button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className="hover:text-white transition">Sang nhượng quán cafe, spa</button></li>
            </ul>
          </div>

          {/* Col 4: Liên hệ & Hỗ trợ */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="font-bold text-sm text-[#EAB308] uppercase tracking-wider">Tổng Đài CSKH</h4>
            <p>Hotline: <strong className="text-white">1900 6868</strong></p>
            <p>Email: contact@batdongsan-classic.vn</p>
            <p>Thời gian làm việc: 08:00 - 21:00 (Tất cả các ngày trong tuần)</p>
            <p className="text-[11px] text-slate-500">Giấy phép sàn TMĐT số 031489201 do Sở Công Thương TP.HCM cấp.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 CloneCraft PlatformBDS — Template #01 BatDongSan Classic Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );

  // ── MAIN RENDERER ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-sans bg-[#F4F5F7] text-slate-800 flex flex-col justify-between">
      {renderHeader()}

      <main className="flex-1">
        {currentPage === 'home' && renderHomePage()}
        {['sale', 'rent', 'transfer', 'nha-dat-ban', 'cho-thue', 'sang-nhuong'].includes(currentPage) && renderListingCatalogPage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {['projects', 'du-an'].includes(currentPage) && renderProjectsPage()}
        {currentPage === 'project-detail' && renderProjectDetailPage()}
        {['news', 'tin-tuc'].includes(currentPage) && renderNewsPage()}
        {currentPage === 'news-detail' && renderNewsDetailPage()}
        {['about', 'gioi-thieu'].includes(currentPage) && renderAboutPage()}
        {['contact', 'lien-he'].includes(currentPage) && renderContactPage()}
        {!['home', 'sale', 'rent', 'transfer', 'nha-dat-ban', 'cho-thue', 'sang-nhuong', 'property-detail', 'projects', 'du-an', 'project-detail', 'news', 'tin-tuc', 'news-detail', 'about', 'gioi-thieu', 'contact', 'lien-he'].includes(currentPage) && renderHomePage()}
      </main>

      {renderFooter()}
      {renderAuthModal()}

      {/* Fullscreen Photo Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/20 rounded-full"
          >
            <X size={28} />
          </button>
          <img src={lightboxImg} alt="" className="max-w-5xl max-h-[85vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
}
