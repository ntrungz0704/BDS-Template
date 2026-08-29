'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Palmtree, Waves, Sun, Compass, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Percent, Umbrella
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

// ── COLOR PALETTE: SCENIC OCEAN BLUE & CORAL GOLD ────────────────────────────
const SCENIC_BLUE = '#0284C7';
const DARK_BLUE = '#0369A1';
const CORAL_GOLD = '#F59E0B';

export default function Portal19CentralCoastTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-19';

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
    <header className="bg-white border-b border-sky-100 sticky top-0 z-40 shadow-xs">
      <div className="bg-[#0369A1] text-white text-xs py-1.5 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>🏖️ Cổng Bất Động Sản Duyên Hải Miền Trung — Đà Nẵng, Nha Trang, Quy Nhơn & Phú Yên</span>
          <div className="flex items-center gap-4">
            <span>Tư vấn vịnh biển: <strong className="text-amber-300">0935 999 777</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Thành Viên</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#F59E0B] flex items-center justify-center text-white shadow-md">
            <Palmtree size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              CENTRAL<span className="text-[#0284C7]">COAST</span>
            </div>
            <div className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Scenic Coastal Living</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-full transition ${currentPage === 'home' ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Villa View Vịnh Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Thuê Nghỉ Dưỡng</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Quần Thể Resort</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Kinh Tế Du Lịch</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-full transition ${currentPage === 'about' ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-[#0284C7] bg-sky-50 font-black' : 'hover:text-[#0284C7]'}`}>Tour Vịnh Biển</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs rounded-full shadow items-center gap-1.5">
            <Palmtree size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-sky-50 rounded-full">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-sky-100 px-4 py-3 space-y-1 text-xs font-bold text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Villa View Vịnh Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Thuê Nghỉ Dưỡng</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Quần Thể Resort</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Kinh Tế Du Lịch</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-sky-50 rounded-lg">Tour Vịnh Biển</button>
        </div>
      )}
    </header>
  );

  // ── BAY VIEW RESORT CARD (SIGNATURE OF TEMPLATE 19) ─────────────────────────
  const renderBayViewCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-3xl border border-sky-100 hover:border-[#0284C7] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-sky-50">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-3 py-1 bg-sky-900/90 text-sky-200 text-[10px] font-bold uppercase rounded-full flex items-center gap-1">
              <Waves size={11} className="text-sky-300" /> View Vịnh Biển • Cách Bãi Tắm 50m
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 rounded-2xl shadow font-black text-sm text-[#0284C7]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-[#F59E0B] uppercase block">🏖️ {item.type} • Vịnh Biển</span>
          <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-[#0284C7] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#0284C7]" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 border-t border-sky-50">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>🛏️ {item.bedrooms} PN</span>
            <span>•</span>
            <span className="text-sky-700 font-bold">Chia sẻ DT 85/15</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#0284C7] font-bold">
        <span>Xem bài toán khai thác du lịch</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#F0F9FF]/50 space-y-16 pb-16">
      {/* Hero Coastal Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#0369A1] to-[#0284C7] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Palmtree size={14} /> Tuyệt Tác Vịnh Biển Đẹp Nhất Hành Tinh
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Bất Động Sản Duyên Hải Miền Trung Tuyệt Mỹ
          </h1>
          <p className="text-sky-100 text-sm md:text-base font-light max-w-xl mx-auto">
            Khám phá hơn 6.000 biệt thự biển, condotel 5 sao và shophouse phố đêm du lịch tại Đà Nẵng, Nha Trang, Quy Nhơn.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-sky-600" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo Đà Nẵng, Nha Trang, Quy Nhơn, view biển..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-200 rounded-2xl text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-sky-50/50 border border-sky-200 rounded-2xl text-xs">
                  <option value="all">Tất cả loại hình nghỉ dưỡng</option>
                  <option value="Biệt thự">Biệt Thự Mặt Biển Panorama</option>
                  <option value="Căn hộ chung cư">Condotel 5 Sao Quản Lý Quốc Tế</option>
                  <option value="Nhà phố">Shophouse Phố Đi Bộ Biển</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-sky-50/50 border border-sky-200 rounded-2xl text-xs">
                  <option value="all">Thủ phủ du lịch miền Trung</option>
                  <option value="Đà Nẵng">Đà Nẵng & Hội An</option>
                  <option value="Đà Nẵng">Nha Trang & Cam Ranh</option>
                  <option value="Đà Nẵng">Quy Nhơn & Phú Yên</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase rounded-2xl shadow">
                  Tìm Villa Biển
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scenic Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider">Vịnh ngọc thiên đường</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0369A1]">Bất Động Sản Miền Trung Tiêu Biểu</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderBayViewCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-[#0369A1]">Danh Mục Bất Động Sản Duyên Hải Miền Trung</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderBayViewCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#0284C7] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-3xl border border-sky-100 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-2xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-sky-50 text-[#0284C7] text-xs font-bold rounded-full">
                🏖️ {selectedProperty.type} • View Vịnh Biển
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#0284C7]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#0369A1]">Quần Thể Nghỉ Dưỡng & Sân Golf Miền Trung</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-3xl border border-sky-100 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-2xl mb-3" />
              <h3 className="font-bold text-base text-[#0369A1]">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#0284C7] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-3xl border border-sky-100 space-y-4">
            <h1 className="text-3xl font-black text-[#0369A1]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#0369A1]">Kinh Tế Du Lịch & Tiềm Năng Duyên Hải</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-3xl border border-sky-100 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded-2xl" />
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
      <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#0284C7] font-bold">← Cẩm nang</button>
          <article className="bg-white p-8 rounded-3xl border border-sky-100 space-y-4">
            <h1 className="text-3xl font-black text-[#0369A1]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-2xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-3xl border border-sky-100 space-y-4`}>
        <h1 className="text-3xl font-black text-[#0369A1]">Về CentralCoast Estate</h1>
        <p className="text-sm text-slate-600">Hệ thống phân phối và tư vấn chuyên sâu các dòng sản phẩm bất động sản nghỉ dưỡng ven biển hàng đầu miền Trung.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F0F9FF]/50 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-3xl border border-sky-100 space-y-4`}>
        <h1 className="text-2xl font-black text-[#0369A1]">Đăng Ký Tour Trải Nghiệm Nghỉ Dưỡng Vịnh Biển</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên quý khách..." className="w-full p-3 border rounded-2xl" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-2xl" />
          <textarea rows={4} required placeholder="Thành phố biển bạn muốn tham quan (Đà Nẵng, Nha Trang, Quy Nhơn...)" className="w-full p-3 border rounded-2xl" />
          <button type="submit" className="w-full py-3 bg-[#0284C7] text-white font-bold rounded-2xl">Đăng Ký Tour</button>
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
          <h3 className="text-lg font-bold text-center mb-4 text-[#0369A1]">Tài Khoản CentralCoast</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded-2xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-2xl" />
            <button type="submit" className="w-full py-3 bg-[#0284C7] text-white font-bold rounded-2xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#0369A1] text-white pt-8 pb-6 border-t border-sky-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-sky-100`}>
        <div className="font-bold text-white uppercase tracking-wider">CENTRALCOAST — CỔNG BẤT ĐỘNG SẢN NGHỈ DƯỠNG DUYÊN HẢI MIỀN TRUNG</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #19 Central Coast Scenic Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#F0F9FF]/40 text-slate-800 flex flex-col justify-between">
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
