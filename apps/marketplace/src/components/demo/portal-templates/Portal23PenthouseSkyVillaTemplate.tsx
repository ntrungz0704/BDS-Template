'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Crown, Sparkles, Waves, Compass, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Check, AlertCircle, FileText, Send, UserCheck, CheckCircle,
  Gem, Key, EyeOff
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

// ── COLOR PALETTE: DEEP SPACE BLACK & PLATINUM GOLD ──────────────────────────
const SPACE_BLACK = '#05060A';
const CARD_BG = '#0C0E14';
const PLATINUM_GOLD = '#FACC15';

export default function Portal23PenthouseSkyVillaTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-23';

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
    <header className="bg-[#05060A] border-b border-amber-950/60 sticky top-0 z-40 shadow-xs text-white">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FACC15] to-[#EAB308] flex items-center justify-center text-slate-950 shadow-md font-serif font-black text-lg">
            <Crown size={20} />
          </div>
          <div>
            <div className="text-xl font-serif font-black tracking-widest flex items-center gap-1">
              SKYVILLA<span className="text-[#FACC15]">ESTATE</span>
            </div>
            <div className="text-[9px] text-amber-300 font-bold uppercase tracking-widest">Ultra-Luxury Penthouse & Mansions</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-300">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-full transition ${currentPage === 'home' ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Penthouse Áp Mái</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Thuê Sky Villa</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Tháp Biểu Tượng</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Ultra-Luxury Living</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-full transition ${currentPage === 'about' ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-slate-950 bg-[#FACC15]' : 'hover:text-white'}`}>Private Viewing</button>
        </nav>

        <button onClick={() => navigate('contact')} className="px-4 py-2 bg-gradient-to-r from-[#FACC15] to-[#CA8A04] text-slate-950 font-bold text-xs rounded-full shadow flex items-center gap-1.5 font-serif">
          <Key size={14} /> Private Concierge
        </button>
      </div>
    </header>
  );

  // ── SKY HIGH PENTHOUSE CARD (SIGNATURE OF TEMPLATE 23) ───────────────────────
  const renderPenthouseCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-[#0C0E14] rounded-2xl border border-amber-900/60 hover:border-[#FACC15] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer group flex flex-col justify-between text-white"
    >
      <div>
        <div className="h-56 relative overflow-hidden bg-slate-900">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-xs border border-amber-500/40 text-amber-300 font-serif font-bold text-[10px] rounded-full flex items-center gap-1">
              <Crown size={12} /> Tầng 48 • Hồ Bơi Vô Cực Riêng
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-xs border border-amber-500/40 rounded-lg shadow font-serif font-black text-sm text-[#FACC15]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-amber-400 uppercase block font-serif">👑 {item.type} • Tầng không</span>
          <h3 className="font-serif font-bold text-sm md:text-base text-white group-hover:text-amber-300 transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 truncate flex items-center gap-1">
            <MapPin size={13} className="text-amber-400" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-t border-slate-800 font-serif">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>Thang máy riêng</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">Panorama 360°</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-amber-400 font-bold font-serif">
        <span>Xem thông số kỹ thuật tầng không</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#05060A] text-slate-200 space-y-16 pb-16">
      {/* Hero Penthouse Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#0C0E14] to-[#05060A] border-b border-amber-950/40">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 font-serif">
            <Crown size={14} /> The Pinnacle of Ultra-Luxury Living
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 font-serif">
            Tuyệt Tác Penthouse & Sky Villa Tầng Không
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto font-serif">
            Bộ sưu tập độc quyền các căn dinh thự trên đỉnh những tòa tháp biểu tượng đắt giá nhất Việt Nam.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-[#10121B] rounded-2xl p-6 shadow-2xl border border-amber-900/40 text-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-amber-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm Penthouse, Sky Villa, hồ bơi riêng..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#07080D] border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-[#07080D] border border-slate-700 rounded-xl text-xs text-slate-200 font-serif">
                  <option value="all">Tất cả loại hình tầng không</option>
                  <option value="Căn hộ chung cư">Grand Penthouse Áp Mái</option>
                  <option value="Biệt thự">Sky Villa Hồ Bơi Vô Cực</option>
                  <option value="Nhà phố">Duplex Thông Tầng 7m</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-[#07080D] border border-slate-700 rounded-xl text-xs text-slate-200 font-serif">
                  <option value="all">Thủ đô & Thành phố lớn</option>
                  <option value="TP. Hồ Chí Minh">TP.HCM (Quận 1, Thủ Thiêm)</option>
                  <option value="Hà Nội">Hà Nội (Tây Hồ, Ba Đình)</option>
                  <option value="Đà Nẵng">Đà Nẵng (Sông Hàn)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-bold text-xs uppercase rounded-xl shadow font-serif">
                  Khám Phá Sky Villa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Penthouse Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif">Đỉnh cao thượng lưu</span>
            <h2 className="text-2xl md:text-3xl font-black text-white font-serif">Tuyển Tập Penthouse Độc Bản</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 font-serif">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderPenthouseCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#05060A] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-serif font-black text-white">Bộ Sưu Tập Penthouse & Sky Villa Tầng Không</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderPenthouseCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#05060A] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-amber-300 font-bold flex items-center gap-1 font-serif">
            <ChevronLeft size={14} /> Quay lại bộ sưu tập
          </button>
          <div className="bg-[#0C0E14] p-8 rounded-2xl border border-amber-900/40 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 text-xs font-serif font-bold rounded-full border border-amber-500/30">
                👑 {selectedProperty.type} • Tầng 48 • Private Lift
              </span>
              <h1 className="text-3xl font-serif font-black text-white">{selectedProperty.title}</h1>
              <div className="text-2xl font-serif font-black text-[#FACC15]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-serif">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#05060A] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-serif font-black text-white">Tháp Biểu Tượng Sở Hữu Sky Villa Đắt Giá</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-[#0C0E14] rounded-2xl border border-amber-900/40 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-serif font-bold text-base text-amber-300">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#05060A] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-amber-300 font-bold font-serif">← Dự án</button>
          <div className="bg-[#0C0E14] p-8 rounded-2xl border border-amber-900/40 space-y-4">
            <h1 className="text-3xl font-serif font-black text-white">{selectedProject.title}</h1>
            <p className="text-sm text-slate-300 font-serif">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#05060A] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-serif font-black text-white">Góc Nhìn Ultra-Luxury Living & Đầu Tư</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-[#0C0E14] p-5 rounded-2xl border border-amber-900/40 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded-xl" />
              <div>
                <h3 className="font-serif font-bold text-base text-white">{n.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-serif">{n.summary}</p>
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
      <div className="py-8 bg-[#05060A] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-amber-300 font-bold font-serif">← Cẩm nang</button>
          <article className="bg-[#0C0E14] p-8 rounded-2xl border border-amber-900/40 space-y-4">
            <h1 className="text-3xl font-serif font-black text-white">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed font-serif">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#05060A] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-[#0C0E14] p-8 rounded-2xl border border-amber-900/40 space-y-4`}>
        <h1 className="text-3xl font-serif font-black text-white">Về SkyVillaEstate</h1>
        <p className="text-sm text-slate-300 font-serif">Tổ chức tư vấn và ủy thác bất động sản đỉnh cao dành riêng cho giới thượng lưu và các gia tộc tài phiệt tại Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#05060A] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-[#0C0E14] p-8 rounded-2xl border border-amber-900/40 space-y-4`}>
        <h1 className="text-2xl font-serif font-black text-white">Đặt Lịch Private Viewing Riêng Tư</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs font-serif">
          <input type="text" required placeholder="Danh xưng & Họ tên..." className="w-full p-3 bg-[#07080D] border border-slate-700 rounded-xl text-white" />
          <input type="tel" required placeholder="Số điện thoại bảo mật..." className="w-full p-3 bg-[#07080D] border border-slate-700 rounded-xl text-white" />
          <textarea rows={4} required placeholder="Căn Penthouse bạn quan tâm hoặc nhu cầu ký gửi kín..." className="w-full p-3 bg-[#07080D] border border-slate-700 rounded-xl text-white" />
          <button type="submit" className="w-full py-3 bg-[#FACC15] text-slate-950 font-bold rounded-xl font-serif">Xác Nhận Lịch Xem Riêng</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-[#10121B] rounded-2xl max-w-md w-full p-8 border border-amber-900/50 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-serif font-bold text-center mb-4 text-amber-300">Cổng Private Client VIP</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs font-serif">
            <input type="text" required placeholder="Mã thành viên VIP" className="w-full p-3 bg-[#07080D] border border-slate-700 rounded-xl text-white" />
            <input type="password" required placeholder="Mã bảo mật OTP" className="w-full p-3 bg-[#07080D] border border-slate-700 rounded-xl text-white" />
            <button type="submit" className="w-full py-3 bg-[#FACC15] text-slate-950 font-bold rounded-xl font-serif">Đăng Nhập Kín</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#05060A] text-slate-400 pt-8 pb-6 border-t border-amber-950/40 text-xs font-serif">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2`}>
        <div className="font-bold text-white uppercase tracking-wider font-serif">SKYVILLAESTATE — ULTRA-LUXURY PENTHOUSE & SKY VILLA ADVISORY</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #23 Luxury Penthouse & Sky Villa Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#05060A] text-slate-200 flex flex-col justify-between">
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
