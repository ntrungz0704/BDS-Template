'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Crown, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Gem, Key, Lock, Navigation
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

// ── COLOR PALETTE: ROYAL GOLD & MIDNIGHT LUXURY ──────────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C97E';
const DARK = '#0A0A0F';
const DARK_CARD = '#12121A';
const DARK_BORDER = 'rgba(201,168,76,0.2)';
const MUTED = '#9A9AA8';

export default function Portal03LuxuryPrestigeTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-03';

  // ── ROUTING STATE ──
  const [currentPage, setCurrentPageState] = useState<string>(() => {
    if (!initialPage || initialPage === 'home') return 'home';
    return initialPage;
  });

  const [selectedProperty, setSelectedProperty] = useState<PortalProperty | null>(() => PORTAL_PROPERTIES[0]);
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(() => PORTAL_PROJECTS[0]);
  const [selectedNews, setSelectedNews] = useState<PortalNews | null>(() => PORTAL_NEWS[0]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [filterCategory, setFilterCategory] = useState<'all' | 'ban' | 'thue' | 'sang-nhuong'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-desc' | 'price-asc'>('price-desc');

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [savedPropertyIds, setSavedPropertyIds] = useState<number[]>([]);

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

  const filteredProperties = useMemo(() => {
    return PORTAL_PROPERTIES.filter(item => {
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
      if (filterPrice === '<5' && item.priceNum >= 5) return false;
      if (filterPrice === '5-15' && (item.priceNum < 5 || item.priceNum > 15)) return false;
      if (filterPrice === '>15' && item.priceNum <= 15) return false;
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
      return b.id - a.id;
    });
  }, [filterCategory, filterType, filterCity, filterPrice, searchKeyword, sortBy]);

  // ── HEADER COMPONENT ───────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#C9A84C]/20 sticky top-0 z-40 text-white shadow-xl">
      {/* Top VIP Bar */}
      <div className="border-b border-white/10 text-xs py-2 px-4 text-slate-400">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <Crown size={14} className="text-[#C9A84C]" /> VIP Concierge: <strong className="text-[#C9A84C]">0908 888 999</strong>
            </span>
            <span className="hidden md:inline text-white/50">•</span>
            <span className="hidden md:inline text-white/70">Dịch vụ đưa đón tư vấn bằng du thuyền & xe Maybach riêng</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:text-[#C9A84C] transition">VIP Member Login</button>
            <button onClick={() => navigate('contact')} className="px-3 py-1 bg-[#C9A84C] text-black font-bold text-xs rounded hover:bg-[#E8C97E] transition">
              Ký Gửi Dinh Thự
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`${MAX_W} mx-auto px-4 py-4 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 border border-[#C9A84C] flex items-center justify-center text-[#C9A84C]">
            <Crown size={22} />
          </div>
          <div>
            <div className="text-xl font-serif tracking-widest text-[#C9A84C] uppercase">PRESTIGE<span className="text-white">REALTY</span></div>
            <div className="text-[9px] text-slate-400 tracking-widest uppercase">The Sovereign of Luxury Estates</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 font-medium text-xs tracking-wider uppercase text-slate-300">
          <button onClick={() => navigate('home')} className={`px-3 py-2 transition ${currentPage === 'home' ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 transition ${currentPage === 'sale' ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Bộ Sưu Tập Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 transition ${currentPage === 'rent' ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Thuê Thượng Lưu</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Kiệt Tác Dự Án</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Tạp Chí VIP</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 transition ${currentPage === 'about' ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Đặc Quyền</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 transition ${currentPage === 'contact' ? 'text-[#C9A84C] font-bold' : 'hover:text-[#C9A84C]'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-300">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12121A] border-t border-[#C9A84C]/30 px-4 py-4 space-y-2 text-xs font-serif uppercase tracking-wider text-slate-300 shadow-2xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Bộ Sưu Tập Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Thuê Thượng Lưu</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Kiệt Tác Dự Án</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Tạp Chí VIP</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Đặc Quyền</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:text-[#C9A84C]">Liên Hệ</button>
        </div>
      )}
    </header>
  );

  // ── LUXURY FLOATING SEARCH BAR ─────────────────────────────────────────────
  const renderSearchBar = () => (
    <div className="bg-[#12121A]/95 backdrop-blur-md p-6 rounded-none border border-[#C9A84C]/30 text-white shadow-2xl">
      <div className="flex gap-4 border-b border-white/10 pb-3 mb-4 text-xs tracking-widest uppercase">
        {['all', 'ban', 'thue'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterCategory(tab as any)}
            className={`pb-2 border-b-2 transition ${filterCategory === tab ? 'border-[#C9A84C] text-[#C9A84C] font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            {tab === 'all' ? 'Toàn Bộ Dinh Thự' : tab === 'ban' ? 'Chuyển Nhượng Độc Tôn' : 'Cho Thuê Cao Cấp'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-3.5 text-[#C9A84C]" size={18} />
          <input
            type="text"
            placeholder="Tìm theo phân khu, dinh thự, vị trí độc tôn..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#C9A84C]/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="w-full py-3 px-3 bg-black/50 border border-[#C9A84C]/30 text-xs text-slate-300 focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="all">Tất cả loại dinh thự</option>
            <option value="Biệt thự">Biệt Thự Đảo & Ven Sông</option>
            <option value="Căn hộ chung cư">Penthouse & Sky Villa</option>
            <option value="Nhà phố">Dinh Thự Phố Thương Mại</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
            className="w-full py-3 px-3 bg-black/50 border border-[#C9A84C]/30 text-xs text-slate-300 focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="all">Khu vực độc tôn</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (Quận 1, Thảo Điền, Q.7)</option>
            <option value="Hà Nội">Hà Nội (Tây Hồ, Ciputra, Ocean Park)</option>
            <option value="Đà Nẵng">Đà Nẵng (Bán Đảo Sơn Trà)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            onClick={() => { if (currentPage === 'home') navigate('sale'); }}
            className="w-full py-3 bg-gradient-to-r from-[#C9A84C] to-[#E8C97E] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg hover:opacity-95"
          >
            <Crown size={14} /> Khám Phá
          </button>
        </div>
      </div>
    </div>
  );

  // ── EDITORIAL CARD (SIGNATURE OF TEMPLATE 03) ──────────────────────────────
  const renderEditorialCard = (item: PortalProperty) => {
    const isSaved = savedPropertyIds.includes(item.id);
    return (
      <div
        key={item.id}
        onClick={() => handleOpenProperty(item)}
        className="bg-[#12121A] border border-[#C9A84C]/25 hover:border-[#C9A84C] transition duration-500 overflow-hidden cursor-pointer group flex flex-col justify-between shadow-2xl"
      >
        <div>
          {/* Card Image Banner */}
          <div className="h-64 relative overflow-hidden bg-black">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-3 py-1 bg-black/80 border border-[#C9A84C] text-[#C9A84C] font-serif text-[11px] uppercase tracking-widest">
                EXCLUSIVE
              </span>
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/80 border border-[#C9A84C]/40 text-white font-serif text-base tracking-wider">
              <span className="text-[#C9A84C] font-bold">{item.price}</span>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">
              📍 {item.ward}, {item.district}
            </span>
            <h3 className="font-serif text-lg text-white group-hover:text-[#C9A84C] transition line-clamp-2 leading-snug">
              {item.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-white/10 py-3">
              <span>📐 {item.area} m²</span>
              <span>•</span>
              <span>🛏️ {item.bedrooms} Phòng ngủ</span>
              <span>•</span>
              <span>📜 {item.legal}</span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex items-center justify-between text-xs text-[#C9A84C] font-medium tracking-widest uppercase">
          <span>Khám phá chi tiết</span>
          <span className="group-hover:translate-x-1.5 transition-transform">→</span>
        </div>
      </div>
    );
  };

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#0A0A0F] text-white space-y-20 pb-20">
      {/* Hero Fullscreen Banner */}
      <section className="relative pt-20 pb-32 px-4 border-b border-[#C9A84C]/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1A24] via-[#0A0A0F] to-[#0A0A0F]">
        <div className={`${MAX_W} mx-auto text-center max-w-4xl mb-12`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/40 text-[#C9A84C] text-xs uppercase tracking-widest font-serif mb-4">
            ★ The Sovereign Collection 2026 ★
          </span>
          <h1 className="text-3xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-6">
            Tuyệt Tác Dinh Thự Dành Cho Giới Tinh Hoa
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Tuyển chọn độc quyền những bất động sản sở hữu vị thế độc tôn, tầm nhìn triệu đô và chuẩn mực sống vương giả.
          </p>
        </div>

        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          {renderSearchBar()}
        </div>
      </section>

      {/* Limited Edition Grid */}
      <section className={`${MAX_W} mx-auto px-4 pt-20`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 border-b border-[#C9A84C]/30 pb-4">
          <div>
            <span className="text-xs text-[#C9A84C] uppercase tracking-widest font-serif">Giới hạn đặc quyền</span>
            <h2 className="text-2xl md:text-4xl font-serif text-white mt-1">Bộ Sưu Tập Bất Động Sản Nghìn Tỷ</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-serif uppercase tracking-widest text-[#C9A84C] hover:underline">
            Xem trọn bộ danh mục →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderEditorialCard)}
        </div>
      </section>

      {/* Featured Masterpiece Projects */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-[#12121A] border border-[#C9A84C]/30 p-8 md:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#C9A84C] uppercase tracking-widest font-serif">Biểu tượng kiến trúc</span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Kiệt Tác Đại Đô Thị Thượng Lưu</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTAL_PROJECTS.map(proj => (
              <div key={proj.id} onClick={() => handleOpenProject(proj)} className="bg-black/60 border border-white/10 hover:border-[#C9A84C] transition cursor-pointer group">
                <div className="h-56 relative overflow-hidden">
                  <img src={proj.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 text-[#C9A84C] font-serif text-xs border border-[#C9A84C]/30">
                    {proj.priceRange}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] text-[#C9A84C] tracking-widest uppercase">{proj.developer}</span>
                  <h4 className="font-serif text-base text-white group-hover:text-[#C9A84C] transition line-clamp-1">{proj.title}</h4>
                  <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">{proj.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES: SALE, DETAIL, PROJECTS, NEWS, ABOUT, CONTACT ─────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-serif text-white">Bộ Sưu Tập Dinh Thự Triệu Đô</h1>
          <p className="text-xs text-slate-400">Hiển thị {filteredProperties.length} bất động sản độc tôn</p>
        </div>
        {renderSearchBar()}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderEditorialCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#C9A84C] uppercase tracking-widest flex items-center gap-1 font-serif">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-[#12121A] border border-[#C9A84C]/30 p-8 md:p-12 space-y-8">
            <div className="h-96 relative overflow-hidden">
              <img src={selectedProperty.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <span className="text-xs text-[#C9A84C] uppercase font-serif tracking-widest">{selectedProperty.type}</span>
              <h1 className="text-3xl md:text-4xl font-serif text-white">{selectedProperty.title}</h1>
              <div className="text-2xl font-serif text-[#C9A84C]">{selectedProperty.price}</div>
              <p className="text-slate-300 text-sm leading-relaxed font-light whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-serif text-center">Kiệt Tác Đại Đô Thị Thượng Lưu</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-[#12121A] border border-[#C9A84C]/30 p-4 cursor-pointer">
              <img src={p.thumbnail} alt="" className="w-full h-52 object-cover mb-4" />
              <h3 className="font-serif text-lg text-white">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#C9A84C] font-serif uppercase">← Quay lại</button>
          <div className="bg-[#12121A] p-8 border border-[#C9A84C]/30 space-y-4">
            <h1 className="text-3xl font-serif">{selectedProject.title}</h1>
            <p className="text-slate-300 text-sm">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-serif text-center">Tạp Chí Phong Cách Sống Thượng Lưu</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-[#12121A] border border-[#C9A84C]/25 p-5 cursor-pointer">
              <img src={n.img} alt="" className="w-full h-44 object-cover mb-3" />
              <h3 className="font-serif text-base text-white">{n.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsDetailPage = () => {
    if (!selectedNews) return null;
    return (
      <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#C9A84C] font-serif">← Quay lại tạp chí</button>
          <article className="bg-[#12121A] p-8 border border-[#C9A84C]/30 space-y-6">
            <h1 className="text-3xl font-serif">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover" />
            <p className="text-slate-300 text-sm whitespace-pre-line">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 text-center max-w-3xl space-y-4`}>
        <h1 className="text-4xl font-serif text-[#C9A84C]">Về Prestige Realty</h1>
        <p className="text-slate-400 text-sm leading-relaxed">Đơn vị tư vấn và phân phối độc quyền các tuyệt tác bất động sản thượng lưu hàng đầu Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#0A0A0F] text-white min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl`}>
        <div className="bg-[#12121A] p-8 border border-[#C9A84C]/30 space-y-4">
          <h1 className="text-2xl font-serif text-[#C9A84C]">Liên Hệ VIP Concierge</h1>
          <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4 text-xs">
            <input type="text" required placeholder="Họ và tên..." className="w-full p-3 bg-black/60 border border-[#C9A84C]/30 text-white" />
            <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 bg-black/60 border border-[#C9A84C]/30 text-white" />
            <textarea rows={4} required placeholder="Yêu cầu riêng tư..." className="w-full p-3 bg-black/60 border border-[#C9A84C]/30 text-white" />
            <button type="submit" className="w-full py-3 bg-[#C9A84C] text-black font-bold uppercase tracking-widest font-serif">Gửi Yêu Cầu Riêng Tư</button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-[#12121A] border border-[#C9A84C] max-w-md w-full p-8 relative text-white" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-xl font-serif text-center text-[#C9A84C] mb-4">VIP Member Portal</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Đăng nhập VIP thành công!'); }} className="space-y-4 text-xs">
            <input type="text" required placeholder="Tài khoản VIP / Email" className="w-full p-3 bg-black/60 border border-[#C9A84C]/30 text-white" />
            <input type="password" required placeholder="Mã bảo mật" className="w-full p-3 bg-black/60 border border-[#C9A84C]/30 text-white" />
            <button type="submit" className="w-full py-3 bg-[#C9A84C] text-black font-bold uppercase font-serif">Xác Thực Danh Tính</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-black text-white pt-12 pb-8 border-t border-[#C9A84C]/20">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-4`}>
        <div className="text-xl font-serif text-[#C9A84C]">PRESTIGE REALTY</div>
        <p className="text-xs text-slate-500">© 2026 CloneCraft PlatformBDS — Template #03 Luxury Realty Prestige.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#0A0A0F] text-white flex flex-col justify-between">
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
    </div>
  );
}
