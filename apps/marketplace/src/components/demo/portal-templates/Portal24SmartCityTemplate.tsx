'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Cpu, Zap, Wifi, Sun, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle,
  Radio, BatteryCharging, Sparkles
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

// ── COLOR PALETTE: CYBER BLUE & FUTURISTIC DEEP SPACE ────────────────────────
const CYBER_BLUE = '#06B6D4';
const DARK_CYBER = '#0891B2';
const DEEP_BG = '#0B0F19';

export default function Portal24SmartCityTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-24';

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
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
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
      const catList = PORTAL_PROPERTIES.filter(p => p.category === filterCategory);
      if (catList.length > 0) return catList;
    }
    return PORTAL_PROPERTIES.slice(0, 6);
  }, [filterCategory, filterType, filterCity, searchKeyword, sortBy]);

  // ── HEADER ─────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="bg-[#0B0F19] border-b border-cyan-950/80 sticky top-0 z-40 shadow-xs text-white">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06B6D4] to-[#0284C7] flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 font-black">
            <Cpu size={22} />
          </div>
          <div>
            <div className="text-xl font-black tracking-wider flex items-center gap-1">
              SMARTCITY<span className="text-[#06B6D4]">HUB</span>
            </div>
            <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Future Living & AI PropTech</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-300">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-full transition ${currentPage === 'home' ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Căn Hộ AI Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Thuê Smart Living</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Đại Đô Thị Smart City</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Công Nghệ PropTech</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-full transition ${currentPage === 'about' ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-slate-950 bg-[#06B6D4]' : 'hover:text-white'}`}>Trải Nghiệm Smart Home</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#0284C7] text-slate-950 font-bold text-xs rounded-full shadow-lg shadow-cyan-500/20 items-center gap-1.5">
            <Zap size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-cyan-400 hover:bg-slate-800 rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111827] border-t border-cyan-950 px-4 py-3 space-y-1 text-xs font-bold text-slate-300 shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Căn Hộ AI Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Thuê Smart Living</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Đại Đô Thị Smart City</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Công Nghệ PropTech</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Trải Nghiệm Smart Home</button>
        </div>
      )}
    </header>
  );

  // ── FUTURE SMART HOME CARD (SIGNATURE OF TEMPLATE 24) ───────────────────────
  const renderSmartCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-[#111827] rounded-2xl border border-cyan-950/80 hover:border-[#06B6D4] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer group flex flex-col justify-between text-white"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-slate-900">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-gradient-to-r from-[#06B6D4] to-[#0284C7] text-slate-950 font-black text-[10px] rounded-full flex items-center gap-1 shadow-md">
              <Zap size={12} /> AI Smart Home • Trạm Sạc EV
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-xs border border-cyan-500/30 rounded-lg shadow font-black text-sm text-cyan-400">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-cyan-400 uppercase block">⚡ Smart City Grade A+ • {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-white group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 truncate flex items-center gap-1">
            <MapPin size={13} className="text-cyan-400" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>Điều khiển bằng AI</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">Chuẩn xanh LEED Gold</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-cyan-400 font-bold">
        <span>Xem thông số hệ sinh thái IoT</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#0B0F19] text-slate-200 space-y-16 pb-16">
      {/* Hero Smart City Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#111827] to-[#0B0F19] border-b border-cyan-950/40">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu size={14} /> Kỷ Nguyên Đại Đô Thị Thông Minh & Sống Xanh Bền Vững
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Cổng Bất Động Sản Đô Thị Thông Minh AI & Net-Zero
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Tổng hợp hơn 4.200 căn hộ thông minh điều khiển giọng nói, biệt thự năng lượng mặt trời và shophouse công nghệ cao tại các đại đô thị thông minh tiên phong.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-[#161F32] rounded-2xl p-6 shadow-2xl border border-cyan-900/40 text-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-cyan-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm Smart Home AI, trạm sạc EV, LEED Gold..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-xs text-slate-200">
                  <option value="all">Tất cả chuẩn công nghệ</option>
                  <option value="Căn hộ chung cư">Căn Hộ AI Voice Control</option>
                  <option value="Biệt thự">Biệt Thự Net-Zero Solar</option>
                  <option value="Nhà phố">Shophouse Công Nghệ Cao</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-xs text-slate-200">
                  <option value="all">Đại đô thị thông minh</option>
                  <option value="Hà Nội">Hà Nội (Vinhomes Smart City)</option>
                  <option value="TP. Hồ Chí Minh">TP.HCM (Thủ Thiêm Smart Hub)</option>
                  <option value="Đà Nẵng">Đà Nẵng & Bình Dương Smart City</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#0284C7] hover:opacity-90 text-slate-950 font-bold text-xs uppercase rounded-xl shadow-lg shadow-cyan-500/20">
                  Tìm Nhà Thông Minh
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Smart Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Chuẩn sống tương lai</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Bất Động Sản Smart Home Tiêu Biểu</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderSmartCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-white">Danh Mục Bất Động Sản Smart City & AI Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderSmartCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-cyan-400 font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-[#111827] p-8 rounded-2xl border border-cyan-900/40 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                ⚡ {selectedProperty.type} • AI Smart Home • LEED Gold
              </span>
              <h1 className="text-3xl font-black text-white">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-cyan-400">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-white">Đại Đô Thị Thông Minh & AI PropTech Tiên Phong</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-[#111827] rounded-2xl border border-cyan-900/40 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-cyan-400">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-cyan-400 font-bold">← Dự án</button>
          <div className="bg-[#111827] p-8 rounded-2xl border border-cyan-900/40 space-y-4">
            <h1 className="text-3xl font-black text-white">{selectedProject.title}</h1>
            <p className="text-sm text-slate-300">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-white">Kỷ Nguyên AI & Công Nghệ Bất Động Sản PropTech</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-[#111827] p-5 rounded-2xl border border-cyan-900/40 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded-xl" />
              <div>
                <h3 className="font-bold text-base text-white">{n.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{n.summary}</p>
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
      <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-cyan-400 font-bold">← Cẩm nang</button>
          <article className="bg-[#111827] p-8 rounded-2xl border border-cyan-900/40 space-y-4">
            <h1 className="text-3xl font-black text-white">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-[#111827] p-8 rounded-2xl border border-cyan-900/40 space-y-4`}>
        <h1 className="text-3xl font-black text-white">Về SmartCityHub</h1>
        <p className="text-sm text-slate-300">Nền tảng công nghệ bất động sản số 1 tiên phong phổ cập không gian sống thông minh và tiêu chuẩn Net-Zero cho người Việt.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#0B0F19] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-[#111827] p-8 rounded-2xl border border-cyan-900/40 space-y-4`}>
        <h1 className="text-2xl font-black text-white">Đăng Ký Trải Nghiệm Smart Home Mẫu</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white" />
          <textarea rows={4} required placeholder="Dự án Smart City bạn muốn trải nghiệm căn hộ mẫu..." className="w-full p-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white" />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#0284C7] text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20">Đăng Ký Ngay</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-[#161F32] rounded-2xl max-w-md w-full p-8 border border-cyan-900/50 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-bold text-center mb-4 text-white">Cổng Cư Dân Thông Minh</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Mã căn hộ / Email" className="w-full p-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 bg-[#0B0F19] border border-slate-700 rounded-xl text-white" />
            <button type="submit" className="w-full py-3 bg-[#06B6D4] text-slate-950 font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#0B0F19] text-slate-400 pt-8 pb-6 border-t border-cyan-950/40 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2`}>
        <div className="font-bold text-white uppercase tracking-wider">SMARTCITYHUB — NỀN TẢNG BẤT ĐỘNG SẢN ĐÔ THỊ THÔNG MINH & PROPTECH TƯƠNG LAI</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #24 Smart City & Future Living Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#0B0F19] text-slate-200 flex flex-col justify-between">
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
