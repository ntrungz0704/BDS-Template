'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Factory, Truck, Warehouse, Container, Cpu, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Zap, Wrench, HardHat, Gauge, Anchor
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

// ── COLOR PALETTE: INDUSTRIAL SLATE & SAFETY ORANGE ──────────────────────────
const SLATE_DARK = '#0F172A';
const SLATE_NAVY = '#1E293B';
const ORANGE = '#EA580C';

export default function Portal08IndustrialHubTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-08';

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
    <header className="bg-[#0F172A] text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="bg-[#1E293B] text-slate-400 text-xs py-1.5 px-4 border-b border-slate-700">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>🏭 FDI & Industrial Real Estate Advisory Hub Vietnam</span>
          <div className="flex items-center gap-4">
            <span className="text-white">Hotline FDI: <strong className="text-[#EA580C]">0909 999 888</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:text-white">Enterprise Login</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-[#EA580C] flex items-center justify-center text-white shadow-md">
            <Factory size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-white tracking-tight flex items-center gap-1">
              INDUSTRIAL<span className="text-[#EA580C]">PRO</span>
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">KCN • Nhà Xưởng • Kho Bãi Logistics</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 font-bold text-xs uppercase tracking-wider text-slate-300">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded transition ${currentPage === 'home' ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded transition ${currentPage === 'sale' ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Đất KCN Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded transition ${currentPage === 'rent' ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Thuê Xưởng RBF</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Khu Công Nghiệp</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded transition ${['news', 'news-detail'].includes(currentPage) ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Báo Cáo FDI</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded transition ${currentPage === 'about' ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Năng Lực B2B</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded transition ${currentPage === 'contact' ? 'text-white bg-[#EA580C]' : 'hover:bg-slate-800'}`}>Gửi Yêu Cầu RFP</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs uppercase rounded shadow items-center gap-1.5">
            <Plus size={14} /> Ký Gửi Xưởng
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-300 hover:bg-slate-800 rounded">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t border-slate-700 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-300 shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Đất KCN Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Thuê Xưởng RBF</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Khu Công Nghiệp</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Báo Cáo FDI</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Năng Lực B2B</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-800 rounded">Gửi Yêu Cầu RFP</button>
        </div>
      )}
    </header>
  );

  // ── TECHNICAL SPEC CARD (SIGNATURE OF TEMPLATE 08) ─────────────────────────
  const renderIndustrialCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-xl border border-slate-300 hover:border-[#EA580C] overflow-hidden transition duration-200 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-slate-100">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-slate-900/90 text-amber-400 font-mono text-[10px] font-bold uppercase rounded">
              PCCC Tự Động • Tải Trọng 5T/m²
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 rounded shadow font-bold text-sm text-[#0F172A]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <span className="text-[11px] font-bold text-[#EA580C] uppercase block tracking-wider">🏭 {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-[#0F172A] group-hover:text-[#EA580C] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#EA580C]" /> {item.ward}, {item.district}
          </p>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded border border-slate-200 text-center text-xs font-mono text-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 block">Diện tích</span>
              <strong>{item.area} m²</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Trần cao</span>
              <strong>10.5 m</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Trạm điện</span>
              <strong>1.000 KVA</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#EA580C] font-bold uppercase tracking-wider">
        <span>Xem thông số kỹ thuật</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#F8FAFC] space-y-16 pb-16">
      {/* Hero Industrial Section */}
      <section className="relative pt-16 pb-28 px-4 bg-[#0F172A] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded bg-[#1E293B] border border-slate-700 text-[#EA580C] text-xs font-bold uppercase tracking-wider mb-4">
            <Factory size={14} /> Nền Tảng Kết Nối BĐS Công Nghiệp & Chuỗi Cung Ứng FDI
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Hạ Tầng Nhà Xưởng & Đất Khu Công Nghiệp Chuẩn Quốc Tế
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 5.000.000 m² đất KCN, kho bãi logistics RBW và xưởng xây sẵn RBF sẵn sàng bàn giao.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo KCN, cụm công nghiệp, cảng biển..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-300 rounded text-xs">
                  <option value="all">Tất cả loại hình KCN</option>
                  <option value="Đất nền thổ cư">Đất KCN Thuê 50 Năm</option>
                  <option value="Văn phòng">Nhà Xưởng Xây Sẵn RBF</option>
                  <option value="Mặt bằng kinh doanh">Kho Bãi Logistics RBW</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-300 rounded text-xs">
                  <option value="all">Khu vực trọng điểm FDI</option>
                  <option value="Bình Dương">Bình Dương & Đồng Nai</option>
                  <option value="Hải Phòng">Hải Phòng & Bắc Ninh</option>
                  <option value="TP. Hồ Chí Minh">Long An & Bà Rịa</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs uppercase rounded shadow">
                  Tìm Xưởng / Đất
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industrial Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">Hạ tầng sẵn sàng</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A]">Nhà Xưởng & Đất KCN Tiêu Biểu</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderIndustrialCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-[#0F172A]">Danh Mục Nhà Xưởng & Đất Khu Công Nghiệp</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderIndustrialCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#EA580C] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-xl border border-slate-300 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-slate-100 text-[#0F172A] text-xs font-bold rounded">
                🏭 {selectedProperty.type}
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#EA580C]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-mono">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#0F172A]">Khu Công Nghiệp Trọng Điểm</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-xl border border-slate-300 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded mb-3" />
              <h3 className="font-bold text-base text-[#0F172A]">{p.title}</h3>
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
          <button onClick={() => navigate('projects')} className="text-xs text-[#EA580C] font-bold">← KCN</button>
          <div className="bg-white p-8 rounded-xl border border-slate-300 space-y-4">
            <h1 className="text-3xl font-black text-[#0F172A]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#0F172A]">Báo Cáo FDI & Xu Hướng KCN</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-xl border border-slate-300 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded" />
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
          <button onClick={() => navigate('news')} className="text-xs text-[#EA580C] font-bold">← Báo cáo</button>
          <article className="bg-white p-8 rounded-xl border border-slate-300 space-y-4">
            <h1 className="text-3xl font-black text-[#0F172A]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-xl border border-slate-300 space-y-4`}>
        <h1 className="text-3xl font-black text-[#0F172A]">Về IndustrialPro</h1>
        <p className="text-sm text-slate-600">Đơn vị tư vấn xúc tiến đầu tư FDI và môi giới bất động sản công nghiệp hàng đầu Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-xl border border-slate-300 space-y-4`}>
        <h1 className="text-2xl font-black text-[#0F172A]">Gửi Yêu Cầu RFP Tìm Đất KCN & Xưởng</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Tên doanh nghiệp / Nhà đầu tư..." className="w-full p-3 border rounded" />
          <input type="tel" required placeholder="Số điện thoại liên hệ..." className="w-full p-3 border rounded" />
          <textarea rows={4} required placeholder="Diện tích yêu cầu, ngành nghề sản xuất, khu vực mong muốn..." className="w-full p-3 border rounded" />
          <button type="submit" className="w-full py-3 bg-[#EA580C] text-white font-bold rounded">Gửi Yêu Cầu RFP</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white rounded-xl max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-slate-400"><X size={20} /></button>
          <h3 className="text-lg font-bold text-center mb-4 text-[#0F172A]">Cổng Doanh Nghiệp FDI</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Mã số thuế / Email doanh nghiệp" className="w-full p-3 border rounded" />
            <input type="password" required placeholder="Mật khẩu bảo mật" className="w-full p-3 border rounded" />
            <button type="submit" className="w-full py-3 bg-[#EA580C] text-white font-bold rounded">Đăng Nhập Doanh Nghiệp</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#0F172A] text-white pt-8 pb-6 border-t border-slate-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-slate-400`}>
        <div className="font-bold text-white uppercase tracking-wider">INDUSTRIALPRO — CỔNG BẤT ĐỘNG SẢN CÔNG NGHIỆP VIỆT NAM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #08 Industrial & Logistics Hub.</p>
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
