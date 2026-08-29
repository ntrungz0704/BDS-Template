'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  UserCheck, Award, Sparkles, Shield, Star, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, CheckCircle,
  Briefcase, MessageSquare, Gem
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

// ── COLOR PALETTE: MIDNIGHT BLACK & ROSE GOLD / RUBY ─────────────────────────
const MIDNIGHT = '#090A0F';
const ROSE_GOLD = '#E11D48';
const ROSE_ACCENT = '#FDA4AF';

export default function Portal16EliteBrokerTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-16';

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
    <header className="bg-[#090A0F] border-b border-rose-950/60 sticky top-0 z-40 shadow-xs text-white">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#FDA4AF] flex items-center justify-center text-white shadow-md font-serif font-black text-lg">
            A
          </div>
          <div>
            <div className="text-lg font-black tracking-wider flex items-center gap-1.5 font-serif">
              ALEXANDER<span className="text-[#E11D48]">ESTATE</span>
            </div>
            <div className="text-[9px] text-rose-400 font-bold uppercase tracking-widest">Private Real Estate Advisor</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 font-bold text-xs text-slate-300">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-full transition ${currentPage === 'home' ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Giỏ Hàng Độc Quyền</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Thuê VIP</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Dự Án Đại Sứ</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Góc Nhìn Thị Trường</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-full transition ${currentPage === 'about' ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Hồ Sơ Năng Lực</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-white bg-[#E11D48]' : 'hover:text-white'}`}>Tư Vấn 1-1</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white font-bold text-xs rounded-full shadow items-center gap-1.5">
            <Phone size={14} /> Tư Vấn 1-1
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-300 hover:bg-slate-800 rounded-full">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12131A] border-t border-rose-950 px-4 py-3 space-y-1 text-xs font-bold text-slate-300 shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Giỏ Hàng Độc Quyền</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Thuê VIP</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Dự Án Đại Sứ</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Góc Nhìn Thị Trường</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Hồ Sơ Năng Lực</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded-lg">Tư Vấn 1-1</button>
        </div>
      )}
    </header>
  );

  // ── EXCLUSIVE AGENT CARD (SIGNATURE OF TEMPLATE 16) ─────────────────────────
  const renderAgentCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-[#12131A] rounded-2xl border border-rose-950/80 hover:border-[#E11D48] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between text-white"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-slate-900">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-[#E11D48] text-white font-bold text-[10px] rounded-full flex items-center gap-1">
              <Gem size={12} /> Ủy Quyền Độc Quyền
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-xs border border-rose-500/30 rounded-lg shadow font-black text-sm text-rose-400 font-serif">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-rose-400 uppercase block">⭐ Phân khúc VIP • {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-white group-hover:text-rose-400 transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 truncate flex items-center gap-1">
            <MapPin size={13} className="text-rose-500" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>🛏️ {item.bedrooms} PN</span>
            <span>•</span>
            <span className="text-rose-300 font-bold">Hỗ trợ đàm phán 1-1</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-rose-400 font-bold">
        <span>Xem nhận định cá nhân của Broker</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#090A0F] text-slate-200 space-y-16 pb-16">
      {/* Hero Elite Broker Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#12131A] to-[#090A0F] border-b border-rose-950/40">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Award size={14} /> Top 1 Private Broker of The Year 2024-2025
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 font-serif">
            Cố Vấn Bất Động Sản Cao Cấp Riêng Biệt
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 10 năm kinh nghiệm đồng hành cùng 500+ gia tộc thượng lưu và nhà đầu tư cá nhân VIP tại Việt Nam.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-[#161822] rounded-2xl p-6 shadow-2xl border border-rose-900/40 text-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-rose-500" size={18} />
                <input
                  type="text"
                  placeholder="Tìm giỏ hàng kín, biệt thự, penthouse..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-xs text-slate-200">
                  <option value="all">Tất cả phân khúc VIP</option>
                  <option value="Biệt thự">Biệt Thự Đơn Lập Compound</option>
                  <option value="Căn hộ chung cư">Penthouse & Sky Villa Áp Mái</option>
                  <option value="Nhà phố">Nhà Phố Trung Tâm Triệu Đô</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-xs text-slate-200">
                  <option value="all">Khu vực cố vấn</option>
                  <option value="TP. Hồ Chí Minh">TP.HCM (Quận 1, Quận 2, Quận 7)</option>
                  <option value="Hà Nội">Hà Nội (Tây Hồ, Hoàn Kiếm, Ba Đình)</option>
                  <option value="Đà Nẵng">Đà Nẵng & Hội An</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs uppercase rounded-xl shadow">
                  Khám Phá Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exclusive Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Ủy thác độc quyền</span>
            <h2 className="text-2xl md:text-3xl font-black text-white font-serif">Giỏ Hàng VIP Tuyển Chọn</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-rose-400 hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderAgentCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#090A0F] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black font-serif text-white">Giỏ Hàng Bất Động Sản Ủy Thác Độc Quyền</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderAgentCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#090A0F] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-rose-400 font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại giỏ hàng
          </button>
          <div className="bg-[#12131A] p-8 rounded-2xl border border-rose-900/40 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-full border border-rose-500/30">
                ⭐ {selectedProperty.type} • Ủy thác độc quyền
              </span>
              <h1 className="text-3xl font-black text-white font-serif">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-rose-400 font-serif">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#090A0F] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black font-serif text-white">Dự Án Đại Sứ Thương Hiệu & F1</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-[#12131A] rounded-2xl border border-rose-900/40 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-rose-400">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#090A0F] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-rose-400 font-bold">← Dự án</button>
          <div className="bg-[#12131A] p-8 rounded-2xl border border-rose-900/40 space-y-4">
            <h1 className="text-3xl font-black text-white font-serif">{selectedProject.title}</h1>
            <p className="text-sm text-slate-300">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#090A0F] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black font-serif text-white">Góc Nhìn & Phân Tích Thị Trường BĐS</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-[#12131A] p-5 rounded-2xl border border-rose-900/40 cursor-pointer flex gap-4 shadow-xs">
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
      <div className="py-8 bg-[#090A0F] min-h-screen text-white">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-rose-400 font-bold">← Nhận định</button>
          <article className="bg-[#12131A] p-8 rounded-2xl border border-rose-900/40 space-y-4">
            <h1 className="text-3xl font-black text-white font-serif">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#090A0F] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-[#12131A] p-8 rounded-2xl border border-rose-900/40 space-y-4`}>
        <h1 className="text-3xl font-black font-serif text-white">Hồ Sơ Năng Lực Cố Vấn VIP</h1>
        <p className="text-sm text-slate-300">Tận tâm, bảo mật thông tin tuyệt đối và mang lại giá trị gia tăng bền vững cho từng danh mục bất động sản của khách hàng.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#090A0F] min-h-screen text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-[#12131A] p-8 rounded-2xl border border-rose-900/40 space-y-4`}>
        <h1 className="text-2xl font-black font-serif text-white">Đặt Lịch Tư Vấn 1-1 Riêng Biệt</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên quý khách..." className="w-full p-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-white" />
          <input type="tel" required placeholder="Số điện thoại / Zalo cá nhân..." className="w-full p-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-white" />
          <textarea rows={4} required placeholder="Nhu cầu đầu tư hoặc bất động sản cần ký gửi kín..." className="w-full p-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-white" />
          <button type="submit" className="w-full py-3 bg-[#E11D48] text-white font-bold rounded-xl">Xác Nhận Lịch Hẹn</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-[#161822] rounded-2xl max-w-md w-full p-8 border border-rose-900/50 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-bold text-center mb-4 text-white font-serif">Mạng Lưới Đối Tác Co-Broking</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Mã Broker / Email" className="w-full p-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-white" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 bg-[#0E0F17] border border-slate-700 rounded-xl text-white" />
            <button type="submit" className="w-full py-3 bg-[#E11D48] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#090A0F] text-slate-400 pt-8 pb-6 border-t border-rose-950/40 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2`}>
        <div className="font-bold text-white uppercase tracking-wider font-serif">ALEXANDERESTATE — PRIVATE REAL ESTATE WEALTH ADVISORY</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #16 Elite Personal Broker Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#090A0F] text-slate-200 flex flex-col justify-between">
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
