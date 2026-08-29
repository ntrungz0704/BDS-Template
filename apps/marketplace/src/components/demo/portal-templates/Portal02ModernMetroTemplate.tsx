'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Building, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Zap, Smartphone, Key
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

// ── COLOR PALETTE: MODERN METRO BLUE & CYAN ──────────────────────────────────
const COLORS = {
  primary: '#1E40AF',      // Coban Blue
  primaryHover: '#1D4ED8',
  primaryLight: '#EFF6FF',
  cyan: '#06B6D4',
  dark: '#0F172A',
  bgSoft: '#F8FAFC',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
  textDark: '#0F172A',
  textMuted: '#64748B',
};

export default function Portal02ModernMetroTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-02';

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
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'area-desc'>('newest');

  // Interactive UI States
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
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
      if (filterPrice === '<2' && item.priceNum >= 2) return false;
      if (filterPrice === '2-5' && (item.priceNum < 2 || item.priceNum > 5)) return false;
      if (filterPrice === '5-10' && (item.priceNum < 5 || item.priceNum > 10)) return false;
      if (filterPrice === '>10' && item.priceNum <= 10) return false;
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
  }, [filterCategory, filterType, filterCity, filterPrice, searchKeyword, sortBy]);

  // ── HEADER COMPONENT ───────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 shadow-xs">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E40AF] to-[#06B6D4] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Building size={22} />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-[#0F172A] uppercase flex items-center gap-1">
              METRO<span className="text-[#06B6D4]">ESTATE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Smart Urban Living
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5 font-semibold text-sm text-slate-600">
          <button onClick={() => navigate('home')} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'home' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'transfer' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className={`px-3.5 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Dự Án</button>
          <button onClick={() => navigate('news')} className={`px-3.5 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Tin Tức</button>
          <button onClick={() => navigate('about')} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'about' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className={`px-3.5 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-[#1E40AF] bg-blue-50 font-bold' : 'hover:text-[#1E40AF] hover:bg-slate-50'}`}>Liên Hệ</button>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
            className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-[#1E40AF] px-3 py-2 rounded-full hover:bg-slate-100 transition"
          >
            Đăng Nhập
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="px-4 py-2 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition flex items-center gap-1.5"
          >
            <Plus size={14} /> Đăng Tin
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 text-sm font-semibold shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Dự Án Đô Thị</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Tin Tức BĐS</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Về Metro Estate</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Liên Hệ & Ký Gửi</button>
          <div className="pt-3 border-t flex gap-2">
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="w-1/2 py-2 text-center bg-slate-100 rounded-full font-bold">Đăng Nhập</button>
            <button onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }} className="w-1/2 py-2 text-center bg-[#1E40AF] text-white rounded-full font-bold">Đăng Ký</button>
          </div>
        </div>
      )}
    </header>
  );

  // ── SEARCH FILTER GLASSMORPHISM BAR ────────────────────────────────────────
  const renderSearchBar = () => (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-5 md:p-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'all', label: 'Tất Cả' },
          { id: 'ban', label: 'Căn Hộ & Nhà Đất Bán' },
          { id: 'thue', label: 'Cho Thuê Căn Hộ' },
          { id: 'sang-nhuong', label: 'Sang Nhượng Mặt Bằng' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              filterCategory === tab.id
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo khu đô thị, đường phố, quận..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-[#1E40AF] text-slate-800"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-[#1E40AF]"
          >
            <option value="all">Tất cả loại BĐS</option>
            <option value="Căn hộ chung cư">Căn hộ chung cư</option>
            <option value="Nhà phố">Nhà phố đô thị</option>
            <option value="Biệt thự">Biệt thự cao cấp</option>
            <option value="Văn phòng">Văn phòng / Officetel</option>
            <option value="Mặt bằng kinh doanh">Shophouse khối đế</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-[#1E40AF]"
          >
            <option value="all">Tất cả tỉnh thành</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Bình Dương">Bình Dương</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={() => {
              if (currentPage === 'home') navigate('sale');
            }}
            className="w-full py-2.5 bg-gradient-to-r from-[#1E40AF] to-[#06B6D4] hover:opacity-95 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition shadow-md"
          >
            <Search size={16} /> Tìm Ngay
          </button>
        </div>
      </div>
    </div>
  );

  // ── MODERN GRID 3-COLUMN CARD (SIGNATURE OF TEMPLATE 02) ───────────────────
  const renderModernGridCard = (item: PortalProperty) => {
    const isSaved = savedPropertyIds.includes(item.id);
    return (
      <div
        key={item.id}
        onClick={() => handleOpenProperty(item)}
        className="bg-white rounded-2xl border border-slate-200 hover:border-[#06B6D4] overflow-hidden transition shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
      >
        <div>
          {/* Card Image Banner (16:10 ratio) */}
          <div className="h-52 relative overflow-hidden bg-slate-100">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {item.isHot && (
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-[10px] uppercase rounded-full shadow-xs">
                  HOT
                </span>
              )}
              <span className="px-2.5 py-0.5 bg-[#1E40AF]/90 backdrop-blur-xs text-white font-semibold text-[10px] rounded-full">
                {item.type}
              </span>
            </div>

            {/* Price Tag Overlay */}
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-xs rounded-xl shadow-md flex items-baseline gap-1">
              <span className="text-base font-black text-[#1E40AF]">{item.price}</span>
              <span className="text-[10px] text-slate-500 font-medium">({item.pricePerM2})</span>
            </div>

            {/* Save Button */}
            <button
              onClick={(e) => toggleSaveProperty(item.id, e)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 hover:bg-white transition shadow-sm"
            >
              <Heart size={15} className={isSaved ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>

          {/* Card Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-center text-xs text-slate-500 gap-1">
              <MapPin size={13} className="text-[#06B6D4] shrink-0" />
              <span className="truncate">{item.ward}, {item.district}</span>
            </div>

            <h3 className="font-bold text-sm md:text-base text-[#0F172A] group-hover:text-[#1E40AF] transition line-clamp-2 leading-snug">
              {item.title}
            </h3>

            {/* Specs Row */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block">Diện tích</span>
                <strong>{item.area} m²</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Phòng ngủ</span>
                <strong>{item.bedrooms > 0 ? `${item.bedrooms} PN` : 'Studio'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Pháp lý</span>
                <strong className="text-emerald-700 truncate block">{item.legal.split(' ')[0]}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Broker Info */}
        <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
          <div className="flex items-center gap-2">
            <img src={item.author.avatar} alt={item.author.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="font-medium text-slate-700 truncate max-w-[120px]">{item.author.name}</span>
          </div>
          <span className="text-[#1E40AF] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
            Xem ngay →
          </span>
        </div>
      </div>
    );
  };

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="space-y-16 pb-16 bg-[#F8FAFC]">
      {/* Modern Skyline Hero Section */}
      <section className="relative pt-12 pb-24 px-4 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#F8FAFC]">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8 text-white`}>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#06B6D4]/20 border border-[#06B6D4]/40 text-[#06B6D4] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} /> Nền Tảng Tìm Kiếm Căn Hộ Đô Thị Thông Minh
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Không Gian Sống Chuẩn Mực Cho Gia Đình Hiện Đại
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 25.000 căn hộ cao cấp, duplex, penthouse và nhà phố quy hoạch chuẩn quốc tế.
          </p>
        </div>

        {/* Floating Glassmorphism Search Bar */}
        <div className={`${MAX_W} mx-auto -mb-28 relative z-10`}>
          {renderSearchBar()}
        </div>
      </section>

      {/* Fast Category Filter Pills */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Phân loại đô thị</span>
            <h2 className="text-xl md:text-2xl font-black text-[#0F172A]">Loại Hình Căn Hộ Phổ Biến</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: 'Căn Hộ 1-2 PN', count: '10.200 căn', type: 'Căn hộ chung cư' },
            { label: 'Căn Hộ 3 PN+', count: '5.800 căn', type: 'Căn hộ chung cư' },
            { label: 'Duplex & Penthouse', count: '850 căn', type: 'Căn hộ chung cư' },
            { label: 'Nhà Phố Đô Thị', count: '4.200 căn', type: 'Nhà phố' },
            { label: 'Biệt Thự Song Lập', count: '1.200 căn', type: 'Biệt thự' },
            { label: 'Shophouse Khối Đế', count: '1.600 căn', type: 'Mặt bằng kinh doanh' },
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                setFilterType(cat.type);
                navigate('sale');
              }}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#1E40AF] transition shadow-xs hover:shadow-md cursor-pointer text-center group"
            >
              <h4 className="font-bold text-xs md:text-sm text-[#0F172A] group-hover:text-[#1E40AF] transition mb-1">{cat.label}</h4>
              <span className="text-[11px] text-slate-400">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured 3-Column Modern Grid Listings */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Giỏ hàng F1 độc quyền</span>
            <h2 className="text-xl md:text-3xl font-black text-[#0F172A]">Căn Hộ & Nhà Đất Nổi Bật</h2>
          </div>
          <button
            onClick={() => navigate('sale')}
            className="text-xs font-bold text-[#1E40AF] hover:underline flex items-center gap-1"
          >
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.slice(0, 6).map(renderModernGridCard)}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigate('sale')}
            className="px-8 py-3.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase rounded-full transition shadow-md inline-flex items-center gap-2"
          >
            Khám Phá Toàn Bộ Danh Sách <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Featured Modern Urban Projects */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-gradient-to-tr from-[#0F172A] to-[#1E293B] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Đại đô thị tương lai</span>
              <h2 className="text-2xl md:text-4xl font-black text-white mt-1">Dự Án Đô Thị Thông Minh</h2>
            </div>
            <button
              onClick={() => navigate('projects')}
              className="px-5 py-2.5 bg-white text-slate-900 font-bold text-xs uppercase rounded-full hover:bg-slate-100 transition shadow-sm"
            >
              Xem Tất Cả Dự Án
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTAL_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenProject(proj)}
                className="bg-slate-800/80 backdrop-blur-xs rounded-2xl overflow-hidden border border-slate-700 hover:border-[#06B6D4] cursor-pointer group transition"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#06B6D4] text-slate-900 font-black text-[10px] uppercase rounded-full">
                    {proj.status}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider">{proj.developer}</span>
                  <h4 className="font-bold text-base text-white group-hover:text-[#06B6D4] transition line-clamp-1">{proj.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">{proj.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Location Cards */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Hạ tầng kết nối</span>
          <h2 className="text-2xl font-black text-[#0F172A]">Bất Động Sản Trọng Điểm</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTAL_CITIES.slice(0, 4).map((city) => (
            <div
              key={city.id}
              onClick={() => {
                setFilterCity(city.name as any);
                navigate('sale');
              }}
              className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent flex flex-col justify-end p-6 text-white">
                <h4 className="font-black text-xl group-hover:text-[#06B6D4] transition">{city.name}</h4>
                <span className="text-xs text-slate-300 mt-1">{city.count} • {city.projectCount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News & Lifestyle Section */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">Xu hướng & Phong cách sống</span>
            <h2 className="text-xl md:text-3xl font-black text-[#0F172A]">Tin Tức Thị Trường Đô Thị</h2>
          </div>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#1E40AF] hover:underline flex items-center gap-1">
            Xem tất cả tin <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_NEWS.map((news) => (
            <div
              key={news.id}
              onClick={() => handleOpenNews(news)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#1E40AF] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-100 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-wider">{news.category}</span>
                  <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1E40AF] transition line-clamp-2 leading-snug">{news.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">{news.summary}</p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>🕒 {news.date}</span>
                <span>👁️ {news.views}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ── 2. SUBPAGE 1: LISTING CATALOG (SALE / RENT / TRANSFER) ─────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('home')} className="hover:text-[#1E40AF]">Trang chủ</button>
          <span>/</span>
          <span className="text-[#0F172A] font-bold">Danh Mục Căn Hộ & Nhà Đất Đô Thị</span>
        </nav>

        {renderSearchBar()}

        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-slate-200 text-sm">
          <div className="font-bold text-[#0F172A]">
            Hiển thị <span className="text-[#1E40AF]">{filteredProperties.length}</span> bất động sản phù hợp
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-full text-xs font-semibold focus:outline-none"
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProperties.map(renderModernGridCard)}
        </div>
      </div>
    </div>
  );

  // ── 3. SUBPAGE 2: PROPERTY DETAIL ──────────────────────────────────────────
  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
            <nav className="flex items-center gap-1.5">
              <button onClick={() => navigate('home')} className="hover:text-[#1E40AF]">Trang chủ</button>
              <span>/</span>
              <button onClick={() => navigate('sale')} className="hover:text-[#1E40AF]">Căn hộ</button>
              <span>/</span>
              <span className="text-[#0F172A] font-bold truncate max-w-md">{selectedProperty.title}</span>
            </nav>
            <button onClick={() => navigate('sale')} className="text-[#1E40AF] font-bold flex items-center gap-1">
              <ChevronLeft size={14} /> Quay lại danh sách
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Photo Banner */}
              <div className="h-96 rounded-2xl overflow-hidden bg-slate-100 relative group cursor-pointer" onClick={() => setLightboxImg(selectedProperty.images[0])}>
                <img src={selectedProperty.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                  <Maximize size={13} /> Xem ảnh ({selectedProperty.images.length})
                </span>
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-blue-50 text-[#1E40AF] text-xs font-bold rounded-full uppercase">
                  {selectedProperty.type}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#0F172A] leading-tight">
                  {selectedProperty.title}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin size={14} className="text-[#06B6D4]" /> {selectedProperty.address}
                </p>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Giá niêm yết</span>
                  <strong className="text-xl font-black text-[#1E40AF]">{selectedProperty.price}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Diện tích</span>
                  <strong className="text-xl font-black text-slate-800">{selectedProperty.area} m²</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Thiết kế</span>
                  <strong className="text-xl font-black text-slate-800">{selectedProperty.bedrooms} PN / {selectedProperty.bathrooms} WC</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Pháp lý</span>
                  <strong className="text-xl font-black text-emerald-700 truncate block">{selectedProperty.legal}</strong>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-[#0F172A]">Mô Tả Căn Hộ</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Map */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-[#0F172A]">Vị Trí & Tiện Ích Lân Cận</h3>
                <div className="h-64 rounded-2xl overflow-hidden border border-slate-200">
                  <iframe
                    title="Google Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Broker Card */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img src={selectedProperty.author.avatar} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-[#1E40AF]" />
                <div>
                  <h4 className="font-bold text-base text-[#0F172A]">{selectedProperty.author.name}</h4>
                  <p className="text-xs text-slate-500">{selectedProperty.author.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${selectedProperty.author.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Phone size={16} /> {selectedProperty.author.phone}
                </a>
                <a
                  href={`https://zalo.me/${selectedProperty.author.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#0068FF] hover:bg-[#0054cc] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition"
                >
                  <ZaloIcon className="w-5 h-5" /> Chat Zalo Ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── 4. SUBPAGES 3, 4, 5, 6, 7, 8: PROJECTS, NEWS, ABOUT, CONTACT ──────────
  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#0F172A]">Dự Án Đô Thị Thông Minh</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(proj => (
            <div key={proj.id} onClick={() => handleOpenProject(proj)} className="bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition cursor-pointer">
              <img src={proj.thumbnail} alt="" className="w-full h-52 object-cover" />
              <div className="p-5 space-y-2">
                <span className="text-xs font-bold text-[#06B6D4] uppercase">{proj.developer}</span>
                <h3 className="font-bold text-lg text-[#0F172A]">{proj.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{proj.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <button onClick={() => navigate('projects')} className="text-xs font-bold text-[#1E40AF] flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh sách dự án
          </button>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <img src={selectedProject.thumbnail} alt="" className="w-full h-80 object-cover rounded-2xl" />
            <h1 className="text-3xl font-black text-[#0F172A]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700 leading-relaxed">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#0F172A]">Tin Tức & Xu Hướng Thị Trường</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition cursor-pointer">
              <img src={n.img} alt="" className="w-full h-44 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-sm text-[#0F172A] mb-2">{n.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{n.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsDetailPage = () => {
    if (!selectedNews) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#1E40AF] flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại tin tức
          </button>
          <article className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <h1 className="text-3xl font-black text-[#0F172A]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-2xl" />
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedNews.content}</div>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl text-center`}>
        <h1 className="text-4xl font-black text-[#0F172A]">Về Metro Estate</h1>
        <p className="text-slate-600 leading-relaxed">
          Chúng tôi mang đến giải pháp công nghệ tìm kiếm bất động sản và căn hộ đô thị thông minh chuẩn mực tại Việt Nam.
        </p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-3xl`}>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-black text-[#0F172A]">Liên Hệ & Ký Gửi Căn Hộ</h1>
          {contactSubmitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center">✓ Đã gửi thông tin thành công!</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4 text-xs">
              <input type="text" required placeholder="Họ và tên..." className="w-full p-3 border rounded-xl" />
              <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-xl" />
              <textarea rows={4} required placeholder="Nội dung yêu cầu..." className="w-full p-3 border rounded-xl" />
              <button type="submit" className="w-full py-3 bg-[#1E40AF] text-white font-bold rounded-xl">Gửi Yêu Cầu</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  // ── 9. AUTH MODAL ──────────────────────────────────────────────────────────
  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold text-center mb-4">{authMode === 'login' ? 'Đăng Nhập Metro Estate' : 'Tạo Tài Khoản Mới'}</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email hoặc Số điện thoại" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#1E40AF] text-white font-bold rounded-xl mt-2">
              {authMode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ── FOOTER COMPONENT ───────────────────────────────────────────────────────
  const renderFooter = () => (
    <footer className="bg-[#0F172A] text-white pt-12 pb-8 border-t border-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-400">
          <div>
            <span className="text-lg font-black text-white uppercase">METRO<span className="text-[#06B6D4]">ESTATE</span></span>
            <p className="mt-2 leading-relaxed">Nền tảng tìm kiếm căn hộ thông minh hàng đầu Việt Nam.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Bất Động Sản Bán</h4>
            <p>Căn hộ cao cấp • Penthouse • Shophouse</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Bất Động Sản Thuê</h4>
            <p>Thuê chung cư • Thuê officetel • Mặt bằng</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Liên Hệ</h4>
            <p>Hotline: 1900 8899 • contact@metroestate.vn</p>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 CloneCraft PlatformBDS — Template #02 Modern Metro Portal.
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] text-slate-800 flex flex-col justify-between">
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
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 text-white p-2">
            <X size={28} />
          </button>
          <img src={lightboxImg} alt="" className="max-w-5xl max-h-[85vh] object-contain rounded-xl" />
        </div>
      )}
    </div>
  );
}
