'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Square, Sun, Wind, Compass, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Layers, LayoutGrid
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

// ── COLOR PALETTE: SCANDINAVIAN SLATE & PURE MINIMAL ─────────────────────────
const NORDIC_SLATE = '#334155';
const DARK_SLATE = '#0F172A';
const MUTED_ACCENT = '#64748B';

export default function Portal21NordicMinimalTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-21';

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
    return PORTAL_PROPERTIES.filter(item => {
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
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
  }, [filterCategory, filterType, filterCity, searchKeyword, sortBy]);

  // ── HEADER ─────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
      <div className={`${MAX_W} mx-auto px-6 py-4 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 border border-slate-900 flex items-center justify-center text-slate-900 font-bold">
            N
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 tracking-widest uppercase">
              NORDIC<span className="font-light text-slate-400">ESTATE</span>
            </div>
            <div className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">Scandinavian & Minimal Spaces</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 font-medium text-xs text-slate-600">
          <button onClick={() => navigate('home')} className={`transition ${currentPage === 'home' ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`transition ${currentPage === 'sale' ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Mua Nhà Tối Giản</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`transition ${currentPage === 'rent' ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Căn Hộ Cho Thuê</button>
          <button onClick={() => navigate('projects')} className={`transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Dự Án Kiến Trúc</button>
          <button onClick={() => navigate('news')} className={`transition ${['news', 'news-detail'].includes(currentPage) ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Triết Lý Sống</button>
          <button onClick={() => navigate('about')} className={`transition ${currentPage === 'about' ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`transition ${currentPage === 'contact' ? 'text-slate-900 font-bold border-b border-slate-900 pb-0.5' : 'hover:text-slate-900'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-none shadow-xs tracking-wider uppercase">
            Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1 text-slate-900">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-2 text-xs font-medium uppercase tracking-wider text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 hover:text-slate-900">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 hover:text-slate-900">Mua Nhà Tối Giản</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 hover:text-slate-900">Căn Hộ Cho Thuê</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 hover:text-slate-900">Dự Án Kiến Trúc</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 hover:text-slate-900">Triết Lý Sống</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 hover:text-slate-900">Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 hover:text-slate-900">Liên Hệ</button>
        </div>
      )}
    </header>
  );

  // ── NORDIC MINIMAL CARD (SIGNATURE OF TEMPLATE 21) ───────────────────────────
  const renderMinimalCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white border border-slate-200 hover:border-slate-900 transition duration-300 shadow-2xs hover:shadow-md cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-56 relative overflow-hidden bg-slate-100">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-102 transition duration-700" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-semibold tracking-wider uppercase">
              Ánh Sáng 850 Lux • Thông Gió Tự Nhiên
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-slate-900 text-white text-xs font-bold tracking-wider">
            {item.price}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phong cách {item.type}</span>
          <h3 className="font-semibold text-sm md:text-base text-slate-900 group-hover:text-slate-600 transition line-clamp-2 leading-relaxed">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={12} className="text-slate-400" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-4 pt-3 text-xs text-slate-500 border-t border-slate-100">
            <span>DT Thông thủy: {item.area} m²</span>
            <span>•</span>
            <span>{item.bedrooms} Phòng ngủ</span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-900 font-bold uppercase tracking-wider">
        <span>Xem chi tiết không gian</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#FAFBFD] space-y-20 pb-20">
      {/* Hero Minimal Section */}
      <section className="relative pt-20 pb-32 px-6 bg-white border-b border-slate-200">
        <div className={`${MAX_W} mx-auto text-center max-w-2xl mb-12`}>
          <span className="inline-block text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-4">
            Scandinavian & Japandi Architecture
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 leading-tight mb-4 tracking-tight">
            Không Gian Sống Tối Giản Đón Nắng Tự Nhiên
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-normal max-w-lg mx-auto leading-relaxed">
            Tuyển chọn hơn 2.000 căn hộ studio, duplex và nhà phố phong cách Bắc Âu tinh tế, ngập tràn ánh sáng và gió trời.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-40 relative z-10 max-w-4xl`}>
          <div className="bg-white p-6 shadow-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo Studio, Duplex, ánh sáng tự nhiên..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
                />
              </div>
              <div className="md:col-span-4">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <option value="all">Tất cả loại hình tối giản</option>
                  <option value="Căn hộ chung cư">Căn Hộ Studio & Duplex</option>
                  <option value="Nhà phố">Nhà Phố Warm Minimalist</option>
                  <option value="Biệt thự">Biệt Thự Kính Scandinavian</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-wider shadow-xs">
                  Tìm Kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Minimal Listings */}
      <section className={`${MAX_W} mx-auto px-6 pt-16`}>
        <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tuyển chọn</span>
            <h2 className="text-xl md:text-2xl font-light text-slate-900">Không Gian Tối Giản Tiêu Biểu</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-slate-900 hover:underline uppercase tracking-wider flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderMinimalCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-12 bg-[#FAFBFD] min-h-screen">
      <div className={`${MAX_W} mx-auto px-6 space-y-8`}>
        <h1 className="text-2xl font-light text-slate-900 tracking-tight">Danh Mục Bất Động Sản Tối Giản</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderMinimalCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-12 bg-[#FAFBFD] min-h-screen">
        <div className={`${MAX_W} mx-auto px-6 space-y-8 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-slate-900 font-bold uppercase tracking-wider flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-10 border border-slate-200 space-y-8 shadow-2xs">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover" />
            <div className="space-y-4">
              <span className="px-3 py-1 bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                {selectedProperty.type} • Đón Ánh Sáng Tự Nhiên
              </span>
              <h1 className="text-3xl font-light text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-bold text-slate-900">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-light">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-12 bg-[#FAFBFD] min-h-screen">
      <div className={`${MAX_W} mx-auto px-6 space-y-8`}>
        <h1 className="text-3xl font-light text-slate-900">Dự Án Kiến Trúc Tối Giản Đạt Giải Thưởng</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white border border-slate-200 p-6 cursor-pointer hover:border-slate-900 transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover mb-4" />
              <h3 className="font-semibold text-base text-slate-900">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-12 bg-[#FAFBFD] min-h-screen">
        <div className={`${MAX_W} mx-auto px-6 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-slate-900 font-bold uppercase">← Dự án</button>
          <div className="bg-white p-10 border border-slate-200 space-y-4">
            <h1 className="text-3xl font-light text-slate-900">{selectedProject.title}</h1>
            <p className="text-sm text-slate-600 leading-relaxed font-light">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-12 bg-[#FAFBFD] min-h-screen">
      <div className={`${MAX_W} mx-auto px-6 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-light text-slate-900">Triết Lý Sống & Bố Trí Không Gian Bắc Âu</h1>
        <div className="space-y-6">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-6 border border-slate-200 cursor-pointer flex gap-6 hover:border-slate-900 transition">
              <img src={n.img} alt="" className="w-44 h-32 object-cover" />
              <div>
                <h3 className="font-semibold text-base text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-light leading-relaxed">{n.summary}</p>
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
      <div className="py-12 bg-[#FAFBFD] min-h-screen">
        <div className={`${MAX_W} mx-auto px-6 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-slate-900 font-bold uppercase">← Triết lý</button>
          <article className="bg-white p-10 border border-slate-200 space-y-6">
            <h1 className="text-3xl font-light text-slate-900">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover" />
            <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed font-light">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-12 bg-[#FAFBFD] min-h-screen">
      <div className={`${MAX_W} mx-auto px-6 max-w-3xl text-center bg-white p-12 border border-slate-200 space-y-4`}>
        <h1 className="text-3xl font-light text-slate-900">Về NordicEstate</h1>
        <p className="text-sm text-slate-600 leading-relaxed font-light">Mang phong cách sống tối giản Bắc Âu và triết lý kiến trúc bền vững đến với từng ngôi nhà Việt.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-12 bg-[#FAFBFD] min-h-screen">
      <div className={`${MAX_W} mx-auto px-6 max-w-2xl bg-white p-10 border border-slate-200 space-y-6`}>
        <h1 className="text-2xl font-light text-slate-900">Liên Hệ & Ký Gửi Nhà Tối Giản</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4 text-xs">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-3 border border-slate-300 rounded-none focus:outline-none focus:border-slate-900" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border border-slate-300 rounded-none focus:outline-none focus:border-slate-900" />
          <textarea rows={4} required placeholder="Thông tin không gian nhà bạn muốn bán/thuê..." className="w-full p-3 border border-slate-300 rounded-none focus:outline-none focus:border-slate-900" />
          <button type="submit" className="w-full py-3 bg-slate-900 text-white font-medium uppercase tracking-wider">Gửi Thông Tin</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white max-w-md w-full p-8 border border-slate-200 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-light text-center mb-4 text-slate-900 uppercase tracking-wider">Tài Khoản NordicEstate</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-4 text-xs">
            <input type="text" required placeholder="Email" className="w-full p-3 border border-slate-300 rounded-none" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border border-slate-300 rounded-none" />
            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-medium uppercase tracking-wider">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-white text-slate-500 pt-10 pb-8 border-t border-slate-200 text-xs">
      <div className={`${MAX_W} mx-auto px-6 text-center space-y-3`}>
        <div className="font-bold text-slate-900 uppercase tracking-widest">NORDICESTATE — SCANDINAVIAN & MINIMAL REAL ESTATE PORTAL</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #21 Clean Minimal Scandinavian Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#FAFBFD] text-slate-900 flex flex-col justify-between">
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
