'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Map, MapPin, Navigation, Compass, Layers, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Zap, LocateFixed, Crosshair
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

// ── COLOR PALETTE: INDIGO & MAP CYAN ─────────────────────────────────────────
const INDIGO = '#4F46E5';
const INDIGO_DARK = '#3730A3';
const CYAN = '#06B6D4';

export default function Portal05MapCentricTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-05';

  const [currentPage, setCurrentPageState] = useState<string>(() => {
    if (!initialPage || initialPage === 'home') return 'home';
    return initialPage;
  });

  const [selectedProperty, setSelectedProperty] = useState<PortalProperty | null>(() => PORTAL_PROPERTIES[0]);
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(() => PORTAL_PROJECTS[0]);
  const [selectedNews, setSelectedNews] = useState<PortalNews | null>(() => PORTAL_NEWS[0]);

  const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null);
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white shadow-md">
            <Map size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">
              MAP<span className="text-[#4F46E5]">ESTATE</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Interactive Map Portal</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'home' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Trang Chủ Bản Đồ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'sale' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'rent' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'transfer' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-lg transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Dự Án Bản Đồ</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-lg transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Quy Hoạch</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'about' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'contact' ? 'text-[#4F46E5] bg-indigo-50 font-bold' : 'hover:bg-slate-50'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-md items-center gap-1.5">
            <Plus size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 text-xs font-semibold text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Trang Chủ Bản Đồ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Dự Án Bản Đồ</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Quy Hoạch</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded">Liên Hệ</button>
        </div>
      )}
    </header>
  );

  // ── SPLIT MAP CARD COMPONENT ───────────────────────────────────────────────
  const renderSplitCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onMouseEnter={() => setHoveredPropertyId(item.id)}
      onMouseLeave={() => setHoveredPropertyId(null)}
      onClick={() => handleOpenProperty(item)}
      className={`bg-white rounded-2xl border p-3 flex gap-3 cursor-pointer transition duration-300 shadow-xs hover:shadow-md ${
        hoveredPropertyId === item.id ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20' : 'border-slate-200'
      }`}
    >
      <div className="w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
        <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded">
          {item.area} m²
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-[#4F46E5] uppercase">{item.type}</span>
          <h4 className="font-bold text-xs md:text-sm text-slate-900 line-clamp-2 leading-snug">
            {item.title}
          </h4>
          <p className="text-[11px] text-slate-500 truncate flex items-center gap-0.5 mt-0.5">
            <MapPin size={12} className="text-[#06B6D4] shrink-0" /> {item.ward}, {item.district}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <strong className="text-sm font-black text-[#4F46E5]">{item.price}</strong>
          <span className="text-[11px] font-bold text-slate-600 hover:text-[#4F46E5] flex items-center gap-0.5">
            Tọa độ →
          </span>
        </div>
      </div>
    </div>
  );

  // ── 1. HOME / SPLIT VIEW ───────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="h-[calc(100vh-65px)] flex flex-col lg:flex-row bg-[#F8FAFC] overflow-hidden">
      {/* Left Scrollable Listings Column (50% Desktop) */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 md:p-6 space-y-4 border-r border-slate-200">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-black text-slate-900">Bất Động Sản Theo Bản Đồ</h1>
            <span className="text-xs font-bold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full">
              {filteredProperties.length} Tọa độ
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm theo khu vực, đường phố, quận..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="flex-1 p-2.5 border rounded-xl text-xs"
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2.5 border rounded-xl text-xs text-slate-700">
              <option value="all">Tất cả loại BĐS</option>
              <option value="Căn hộ chung cư">Căn hộ</option>
              <option value="Nhà phố">Nhà phố</option>
              <option value="Biệt thự">Biệt thự</option>
            </select>
          </div>
        </div>

        {/* Listings List */}
        <div className="space-y-3">
          {filteredProperties.map(renderSplitCard)}
        </div>
      </div>

      {/* Right Interactive Map Column (50% Desktop) */}
      <div className="hidden lg:block w-1/2 h-full relative bg-slate-100">
        <iframe
          title="Interactive Map"
          src="https://maps.google.com/maps?q=Ho+Chi+Minh+City&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
        {/* Floating Controls */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 space-y-2 text-xs">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Layers size={15} className="text-[#4F46E5]" /> Lớp Bản Đồ
          </div>
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#4F46E5]" /> Tuyến Metro
          </label>
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#4F46E5]" /> Trường học & Bệnh viện
          </label>
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[#4F46E5]" /> Quy hoạch 1/500
          </label>
        </div>
      </div>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => renderHomePage();

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-5xl`}>
          <button onClick={() => navigate('home')} className="text-xs text-[#4F46E5] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại bản đồ
          </button>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-2xl" />
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#4F46E5]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
            {/* Map Frame */}
            <div className="h-80 rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Google Map Detail"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-slate-900">Dự Án Quy Hoạch Bản Đồ</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-2xl border p-4 shadow-xs hover:shadow-lg transition cursor-pointer">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-slate-900">{p.title}</h3>
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
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#4F46E5] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-3xl font-black">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black">Tin Tức Quy Hoạch & Bản Đồ</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-2xl border cursor-pointer flex gap-4">
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
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#4F46E5] font-bold">← Tin tức</button>
          <article className="bg-white p-8 rounded-3xl border space-y-4">
            <h1 className="text-3xl font-black">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-2xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-3xl border space-y-4`}>
        <h1 className="text-3xl font-black text-slate-900">Về MapEstate</h1>
        <p className="text-sm text-slate-600">Nền tảng tìm kiếm và tra cứu bất động sản tương tác bản đồ thông minh hàng đầu Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-3xl border space-y-4`}>
        <h1 className="text-2xl font-black text-slate-900">Liên Hệ & Tra Cứu Tọa Độ</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-3 border rounded-xl" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-xl" />
          <textarea rows={4} required placeholder="Tọa độ hoặc thửa đất cần kiểm tra..." className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-[#4F46E5] text-white font-bold rounded-xl">Gửi Yêu Cầu</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white rounded-3xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-bold text-center mb-4">Tài Khoản MapEstate</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#4F46E5] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-slate-900 text-white pt-8 pb-6 border-t border-slate-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-slate-400`}>
        <div className="font-bold text-white uppercase">MAPESTATE — CỔNG BẤT ĐỘNG SẢN TƯƠNG TÁC BẢN ĐỒ</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #05 Map-Centric Interactive Portal.</p>
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
