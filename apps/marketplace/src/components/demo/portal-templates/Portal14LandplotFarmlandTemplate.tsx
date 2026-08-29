'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Tractor, Sprout, Trees, Mountain, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Sun, Bus
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

// ── COLOR PALETTE: FERTILE SOIL BROWN & COUNTRYSIDE GREEN ────────────────────
const EARTH_BROWN = '#854D0E';
const DARK_EARTH = '#713F12';
const FARM_GREEN = '#15803D';

export default function Portal14LandplotFarmlandTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-14';

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
    <header className="bg-white border-b border-amber-200 sticky top-0 z-40 shadow-xs">
      <div className="bg-[#713F12] text-amber-100 text-xs py-1.5 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>🌱 Sàn Giao Dịch Đất Nền Phân Lô, Đất Vườn Nghỉ Dưỡng & Farmstay Sinh Thái</span>
          <div className="flex items-center gap-4">
            <span>Tư vấn đất sào: <strong className="text-amber-300">0938 111 222</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Đăng Ký Môi Giới</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#854D0E] to-[#15803D] flex items-center justify-center text-white shadow-md">
            <Sprout size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-[#713F12] tracking-tight flex items-center gap-1">
              DATVUON<span className="text-[#15803D]">PRO</span>
            </div>
            <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Đất Vườn & Farmstay Sinh Thái</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'home' ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'sale' ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Đất Nền Thổ Cư</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'rent' ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Thuê Farmstay</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-lg transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Làng Sinh Thái</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-lg transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Quy Hoạch & Lên Thổ</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'about' ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'contact' ? 'text-[#854D0E] bg-amber-50 font-black' : 'hover:text-[#854D0E]'}`}>Tour Săn Đất</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#854D0E] hover:bg-[#713F12] text-white font-bold text-xs rounded-xl shadow items-center gap-1.5">
            <Tractor size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-amber-50 rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-amber-100 px-4 py-3 space-y-1 text-xs font-bold text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Đất Nền Thổ Cư</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Thuê Farmstay</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Làng Sinh Thái</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Quy Hoạch & Lên Thổ</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-amber-50 rounded-lg">Tour Săn Đất</button>
        </div>
      )}
    </header>
  );

  // ── CADASTRAL SURVEY CARD (SIGNATURE OF TEMPLATE 14) ────────────────────────
  const renderCadastralCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-2xl border border-amber-200 hover:border-[#854D0E] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-amber-50">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-emerald-800 text-white font-bold text-[10px] rounded flex items-center gap-1">
              <Trees size={12} /> Sẵn 100m² Thổ Cư ONT
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 rounded-lg shadow font-black text-sm text-[#713F12]">
            {item.price} ({Math.round(item.priceNum / item.area * 1000)} Tr/m²)
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-[#15803D] uppercase block">🌱 Đất sổ hồng • {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-[#854D0E] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#854D0E]" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <span>📐 Tổng: {item.area} m²</span>
            <span>•</span>
            <span>Mặt tiền: 12m</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Đường ô tô</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#854D0E] font-bold">
        <span>Xem trích lục địa chính</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#FEFCE8]/40 space-y-16 pb-16">
      {/* Hero Farmland Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#713F12] to-[#854D0E] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sprout size={14} /> Điền Viên Nghỉ Dưỡng & Đón Đầu Sóng Hạ Tầng Cao Tốc
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Sàn Đất Nền Phân Lô, Đất Vườn & Farmstay
          </h1>
          <p className="text-amber-100 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 4.000 lô đất có sẵn thổ cư, đất vườn sầu riêng ven suối và trang trại nghỉ dưỡng sổ hồng riêng.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-200 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-amber-800" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo đất vườn, Bảo Lộc, Củ Chi, ven suối..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Tất cả loại đất</option>
                  <option value="Đất nền thổ cư">Đất Nền Sổ Sẵn Thổ Cư</option>
                  <option value="Biệt thự">Khuôn Viên Farmstay Sinh Thái</option>
                  <option value="Nhà phố">Nhà Vườn Nghỉ Dưỡng Ven Đô</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Địa bàn săn đất</option>
                  <option value="TP. Hồ Chí Minh">Ven TP.HCM (Củ Chi, Cần Giờ, Long An)</option>
                  <option value="Đà Nẵng">Tây Nguyên (Lâm Đồng - Bảo Lộc, Đắk Lắk)</option>
                  <option value="Hà Nội">Ven Hà Nội (Hòa Bình, Ba Vì, Sóc Sơn)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#854D0E] hover:bg-[#713F12] text-white font-bold text-xs uppercase rounded-xl shadow">
                  Tìm Đất Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Land Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#854D0E] uppercase tracking-wider">Sổ hồng trao tay</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#713F12]">Đất Nền & Đất Vườn Nổi Bật</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#854D0E] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderCadastralCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-[#713F12]">Danh Mục Đất Nền, Đất Vườn & Farmstay</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderCadastralCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#854D0E] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-2xl border border-amber-200 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-50 text-[#854D0E] text-xs font-bold rounded-full">
                🌱 {selectedProperty.type} • Sẵn 100m² Thổ Cư
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#854D0E]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#713F12]">Làng Sinh Thái & Quần Thể Farmstay Nghỉ Dưỡng</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-2xl border border-amber-200 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-[#713F12]">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#854D0E] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-2xl border border-amber-200 space-y-4">
            <h1 className="text-3xl font-black text-[#713F12]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#713F12]">Cẩm Nang Quy Hoạch, Tách Thửa & Lên Thổ Cư</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-2xl border border-amber-200 cursor-pointer flex gap-4 shadow-xs">
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
      <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#854D0E] font-bold">← Cẩm nang</button>
          <article className="bg-white p-8 rounded-2xl border border-amber-200 space-y-4">
            <h1 className="text-3xl font-black text-[#713F12]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-2xl border border-amber-200 space-y-4`}>
        <h1 className="text-3xl font-black text-[#713F12]">Về DatVuonPro</h1>
        <p className="text-sm text-slate-600">Sàn giao dịch và phân phối chuyên sâu các dòng sản phẩm đất nền sổ đỏ, đất sào mẫu và farmstay sinh thái ven đô.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#FEFCE8]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-2xl border border-amber-200 space-y-4`}>
        <h1 className="text-2xl font-black text-[#713F12]">Đăng Ký Tour Săn Đất Cuối Tuần Miễn Phí</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-3 border rounded-xl" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-xl" />
          <textarea rows={4} required placeholder="Khu vực bạn muốn tham gia tour (Bảo Lộc, Củ Chi, Long An...)" className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-[#854D0E] text-white font-bold rounded-xl">Đăng Ký Ngay</button>
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
          <h3 className="text-lg font-bold text-center mb-4 text-[#713F12]">Tài Khoản DatVuonPro</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#854D0E] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#713F12] text-white pt-8 pb-6 border-t border-amber-900 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-amber-200`}>
        <div className="font-bold text-white uppercase tracking-wider">DATVUONPRO — SÀN ĐẤT NỀN, ĐẤT VƯỜN & FARMSTAY VIỆT NAM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #14 Landplot & Farmland Exchange Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#FEFCE8]/30 text-slate-800 flex flex-col justify-between">
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
