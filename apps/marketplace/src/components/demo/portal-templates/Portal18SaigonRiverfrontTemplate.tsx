'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Building, Waves, Sparkles, Train, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle,
  TrendingUp, Sunrise
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

// ── COLOR PALETTE: DYNAMIC SAIGON COBALT & SUNSET ORANGE ─────────────────────
const SAIGON_BLUE = '#1D4ED8';
const DARK_BLUE = '#1E40AF';
const SUNSET_ORANGE = '#F59E0B';

export default function Portal18SaigonRiverfrontTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-18';

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
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
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
    const list = PORTAL_PROPERTIES.filter(item => {
      if (item.city !== 'TP. Hồ Chí Minh' && item.region !== 'saigon') return false;
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (searchKeyword && searchKeyword.trim()) {
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

    if (list.length > 0) return list;
    if (filterCategory !== 'all') {
      const catList = PORTAL_PROPERTIES.filter(p => (p.city === 'TP. Hồ Chí Minh' || p.region === 'saigon') && p.category === filterCategory);
      if (catList.length > 0) return catList;
    }
    return PORTAL_PROPERTIES.filter(p => p.city === 'TP. Hồ Chí Minh' || p.region === 'saigon');
  }, [filterCategory, filterType, searchKeyword, sortBy]);

  // ── HEADER ─────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40 shadow-sm">
      <div className="bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] text-white text-xs py-2 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span className="flex items-center gap-1.5">
            <Waves size={14} className="text-cyan-300 animate-pulse" />
            CỔNG BẤT ĐỘNG SẢN SÔNG SÀI GÒN & TRUNG TÂM TÀI CHÍNH THỦ THIÊM TP.HCM
          </span>
          <div className="flex items-center gap-4">
            <span>Hotline Sài Gòn: <strong className="text-amber-300 font-mono font-bold">0903 666 888</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Thành Viên</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3.5 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-[#06B6D4] flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Building size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              SAIGON<span className="text-[#1D4ED8]">ESTATE</span>
            </div>
            <div className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest">Dynamic Riverfront Portal</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 font-bold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'home' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'sale' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'rent' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Cho Thuê Q.1/Q.2</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'transfer' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className={`px-3.5 py-2 rounded-xl transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Tháp Thủ Thiêm</button>
          <button onClick={() => navigate('news')} className={`px-3.5 py-2 rounded-xl transition ${['news', 'news-detail'].includes(currentPage) ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Quy Hoạch TP.HCM</button>
          <button onClick={() => navigate('about')} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'about' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3.5 py-2 rounded-xl transition ${currentPage === 'contact' ? 'text-white bg-[#1D4ED8] shadow-md shadow-blue-500/20' : 'hover:bg-blue-50 hover:text-[#1D4ED8]'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg items-center gap-1.5 transition">
            <Building size={14} /> Ký Gửi Nhanh
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:bg-blue-50 rounded-xl">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );

  // ── SAIGON 4-COLUMN MODERN CARD (SIGNATURE OF TEMPLATE 18) ──────────────────
  const renderSaigonCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#1D4ED8] overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-48 relative overflow-hidden bg-slate-100">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-blue-900/90 text-cyan-200 backdrop-blur-md font-bold text-[10px] rounded-md flex items-center gap-1">
              <Waves size={11} className="text-cyan-300" /> Sông Sài Gòn
            </span>
          </div>
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg shadow-lg font-black text-xs text-[#1D4ED8]">
            {item.price}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
            <span className="text-[#1D4ED8]">🌆 {item.type}</span>
            <span>{item.legal}</span>
          </div>
          
          <h3 className="font-bold text-xs md:text-sm text-slate-900 group-hover:text-[#1D4ED8] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          
          <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
            <MapPin size={12} className="text-[#1D4ED8] shrink-0" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-600 border-t border-slate-100">
            <span>📐 {item.area} m²</span>
            <span>🛏️ {item.bedrooms} PN</span>
            <span className="text-emerald-600 font-bold">✓ Còn hàng</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between text-[11px] text-[#1D4ED8] font-bold border-t border-slate-50 mt-1">
        <span>Xem chi tiết & Vị trí</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#F8FAFC] space-y-12 pb-16">
      {/* Hero Saigon Section */}
      <section className="relative pt-16 pb-24 px-4 bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#1D4ED8] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp size={14} /> Thị Trường Sài Gòn Năng Động · Thủ Thiêm & Quận 1
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Bất Động Sản Ven Sông Sài Gòn
          </h1>
          <p className="text-blue-100 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 5.000 căn hộ cao cấp Grand Marina, Thủ Thiêm River và biệt thự ven sông Thảo Điền cập nhật giá tốt nhất hôm nay.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-32 relative z-10`}>
          <div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-blue-600" size={18} />
                <input
                  type="text"
                  placeholder="Tìm căn hộ Thủ Thiêm, Thảo Điền, view sông..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Tất cả loại hình BĐS TP.HCM</option>
                  <option value="Căn hộ chung cư">Căn Hộ View Sông</option>
                  <option value="Biệt thự">Biệt Thự Thảo Điền</option>
                  <option value="Nhà phố">Nhà Phố Mặt Tiền</option>
                  <option value="Văn phòng">Văn Phòng Hạng A</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value as any)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-700">
                  <option value="all">Tất cả Nhu cầu (Bán/Thuê/Sang nhượng)</option>
                  <option value="ban">Nhà Đất Bán</option>
                  <option value="thue">Cho Thuê Căn Hộ/Nhà</option>
                  <option value="sang-nhuong">Sang Nhượng Mặt Bằng</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs uppercase rounded-xl shadow-lg transition">
                  Tìm Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Saigon Listings - 4 COLUMNS MODERN GRID */}
      <section className={`${MAX_W} mx-auto px-4 pt-14`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">Thị Trường Sôi Động</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Bất Động Sản TP.HCM Mới Nhất</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProperties.slice(0, 8).map(renderSaigonCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">TP. Hồ Chí Minh Database</span>
            <h1 className="text-2xl font-black text-slate-900">
              {filterCategory === 'ban' ? 'Danh Mục Nhà Đất Bán TP.HCM' : filterCategory === 'thue' ? 'Danh Mục Cho Thuê TP.HCM' : filterCategory === 'sang-nhuong' ? 'Danh Mục Sang Nhượng TP.HCM' : 'Bất Động Sản TP. Hồ Chí Minh'}
            </h1>
          </div>
          <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full font-bold">
            Hiển thị {filteredProperties.length} bất động sản Sài Gòn
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProperties.map(renderSaigonCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#1D4ED8] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-2xl border border-blue-100 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-50 text-[#1D4ED8] text-xs font-bold rounded-full">
                🌆 {selectedProperty.type} • View Sông Sài Gòn
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#1D4ED8]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#1E40AF]">Tháp Căn Hộ Biểu Tượng & KĐT Mới TP.HCM</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-2xl border border-blue-100 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-[#1E40AF]">{p.title}</h3>
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
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#1D4ED8] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-2xl border border-blue-100 space-y-4">
            <h1 className="text-3xl font-black text-[#1E40AF]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#1E40AF]">Kinh Tế & Bản Đồ Quy Hoạch TP.HCM</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-2xl border border-blue-100 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded-xl" />
              <div>
                <h3 className="font-bold text-base text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.summary}</p>
              </div>
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
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#1D4ED8] font-bold">← Tin quy hoạch</button>
          <article className="bg-white p-8 rounded-2xl border border-blue-100 space-y-4">
            <h1 className="text-3xl font-black text-[#1E40AF]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-2xl border border-blue-100 space-y-4`}>
        <h1 className="text-3xl font-black text-[#1E40AF]">Về SaigonEstate</h1>
        <p className="text-sm text-slate-600">Đơn vị tư vấn và phân phối các dự án căn hộ cao cấp ven sông Sài Gòn, trung tâm tài chính Thủ Thiêm và biệt thự Quận 7.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-2xl border border-blue-100 space-y-4`}>
        <h1 className="text-2xl font-black text-[#1E40AF]">Liên Hệ & Ký Gửi BĐS Sài Gòn</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên quý khách..." className="w-full p-3 border rounded-xl" />
          <input type="tel" required placeholder="Số điện thoại liên hệ..." className="w-full p-3 border rounded-xl" />
          <textarea rows={4} required placeholder="Căn hộ hoặc nhà đất bạn quan tâm tại TP.HCM..." className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-[#1D4ED8] text-white font-bold rounded-xl">Gửi Yêu Cầu</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-bold text-center mb-4 text-[#1E40AF]">Tài Khoản SaigonEstate</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#1D4ED8] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#1E40AF] text-white pt-8 pb-6 border-t border-blue-900 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-blue-200`}>
        <div className="font-bold text-white uppercase tracking-wider">SAIGONESTATE — CỔNG BẤT ĐỘNG SẢN SÔNG SÀI GÒN & THỦ THIÊM TP.HCM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #18 Saigon Dynamic Riverfront Portal.</p>
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
    </div>
  );
}
