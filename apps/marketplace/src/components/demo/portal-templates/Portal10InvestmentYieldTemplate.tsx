'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  TrendingUp, DollarSign, Calculator, Percent, PieChart, LineChart, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  BarChart3, Landmark, Wallet
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

// ── COLOR PALETTE: FINANCIAL TEAL & INVESTMENT GOLD ──────────────────────────
const TEAL = '#0D9488';
const TEAL_DARK = '#0F766E';
const GOLD = '#EAB308';

export default function Portal10InvestmentYieldTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-10';

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
    <header className="bg-white border-b border-teal-100 sticky top-0 z-40 shadow-xs">
      <div className="bg-[#0F766E] text-white text-xs py-1.5 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>📈 Sàn Giao Dịch Bất Động Sản Dòng Tiền & Tỷ Suất Sinh Lời Cao</span>
          <div className="flex items-center gap-4">
            <span>Cố vấn ROI: <strong className="text-amber-300">0988 777 666</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Investor Portal</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#EAB308] flex items-center justify-center text-white shadow-md">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              INVEST<span className="text-[#0D9488]">PRO</span>
            </div>
            <div className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">High Yield Real Estate</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-full transition ${currentPage === 'home' ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Trang Chủ Dòng Tiền</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'sale' ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>BĐS Sinh Lời Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-full transition ${currentPage === 'rent' ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Cho Thuê Thương Mại</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-full transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Dự Án ROI Cao</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-full transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Phân Tích Dòng Tiền</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-full transition ${currentPage === 'about' ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Về InvestPro</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-full transition ${currentPage === 'contact' ? 'text-[#0D9488] bg-teal-50' : 'hover:text-[#0D9488]'}`}>Tư Vấn Đầu Tư</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs rounded-full shadow items-center gap-1.5">
            <Plus size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-teal-50 rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-teal-100 px-4 py-3 space-y-1 text-xs font-bold text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Trang Chủ Dòng Tiền</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">BĐS Sinh Lời Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Cho Thuê Thương Mại</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Dự Án ROI Cao</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Phân Tích Dòng Tiền</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Về InvestPro</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-teal-50 rounded-lg">Tư Vấn Đầu Tư</button>
        </div>
      )}
    </header>
  );

  // ── FINANCIAL METRICS CARD (SIGNATURE OF TEMPLATE 10) ───────────────────────
  const renderInvestCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-2xl border border-slate-200 hover:border-[#0D9488] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-slate-100">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-emerald-700 text-white font-bold text-[10px] rounded-md flex items-center gap-1">
              <Percent size={12} /> ROI 12.5%/Năm
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 rounded-lg shadow font-black text-sm text-[#0F766E]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <span className="text-[11px] font-bold text-[#0D9488] uppercase block">🏢 {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-[#0D9488] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#0D9488]" /> {item.ward}, {item.district}
          </p>

          {/* Financial Yield Grid */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-teal-50/60 rounded-xl border border-teal-100 text-center text-xs text-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 block">Dòng tiền</span>
              <strong className="text-emerald-700">55 Tr/Tháng</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Lấp đầy</span>
              <strong>100%</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Tăng vốn</span>
              <strong>+15%/Năm</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#0D9488] font-bold">
        <span>Xem bài toán tài chính</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#F8FAFC] space-y-16 pb-16">
      {/* Hero Financial Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#0F766E] to-[#0D9488] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BarChart3 size={14} /> Chiến Lược Tối Ưu Hóa Dòng Tiền & Lãi Vốn BĐS
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Đầu Tư Bất Động Sản Dòng Tiền Thu Nhập 8% - 15%/Năm
          </h1>
          <p className="text-teal-100 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 3.500 tòa nhà căn hộ dịch vụ (CHDV), shophouse khối đế và văn phòng cho thuê sẵn có hợp đồng.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-teal-100 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-teal-600" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo tòa CHDV, văn phòng, shophouse dòng tiền..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Tất cả loại hình đầu tư</option>
                  <option value="Căn hộ chung cư">Tòa Căn Hộ Dịch Vụ (CHDV)</option>
                  <option value="Văn phòng">Tòa Nhà Văn Phòng Cho Thuê</option>
                  <option value="Mặt bằng kinh doanh">Shophouse Cho Thuê Sẵn HĐ</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Khu vực khai thác dòng tiền</option>
                  <option value="TP. Hồ Chí Minh">TP.HCM (Quận 1, Bình Thạnh, Q.7)</option>
                  <option value="Hà Nội">Hà Nội (Cầu Giấy, Tây Hồ, Đống Đa)</option>
                  <option value="Đà Nẵng">Đà Nẵng (Sơn Trà, Ngũ Hành Sơn)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase rounded-xl shadow">
                  Tìm BĐS Dòng Tiền
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Yield Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">Cơ hội sinh lời vượt trội</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F766E]">Bất Động Sản Dòng Tiền Tiêu Biểu</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderInvestCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-[#0F766E]">Danh Mục Bất Động Sản Dòng Tiền Sinh Lời</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderInvestCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#0D9488] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-teal-50 text-[#0D9488] text-xs font-bold rounded-full">
                📈 {selectedProperty.type} • ROI 12%/Năm
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#0D9488]">{selectedProperty.price} • {selectedProperty.area} m²</div>
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
        <h1 className="text-3xl font-black text-[#0F766E]">Dự Án Tăng Trưởng Vốn & ROI Cao</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-2xl border border-slate-200 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-[#0F766E]">{p.title}</h3>
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
          <button onClick={() => navigate('projects')} className="text-xs text-[#0D9488] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
            <h1 className="text-3xl font-black text-[#0F766E]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#0F766E]">Báo Cáo Tài Chính & Phân Tích Dòng Tiền</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-2xl border border-slate-200 cursor-pointer flex gap-4 shadow-xs">
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
          <button onClick={() => navigate('news')} className="text-xs text-[#0D9488] font-bold">← Phân tích</button>
          <article className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
            <h1 className="text-3xl font-black text-[#0F766E]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-2xl border border-slate-200 space-y-4`}>
        <h1 className="text-3xl font-black text-[#0F766E]">Về InvestPro</h1>
        <p className="text-sm text-slate-600">Đơn vị tư vấn danh mục đầu tư bất động sản dòng tiền, khai thác lợi nhuận cho thuê chuyên nghiệp hàng đầu Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 space-y-4`}>
        <h1 className="text-2xl font-black text-[#0F766E]">Tư Vấn Danh Mục Đầu Tư BĐS Dòng Tiền</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên nhà đầu tư..." className="w-full p-3 border rounded-xl" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-xl" />
          <textarea rows={4} required placeholder="Mức vốn đầu tư dự kiến, tỷ suất ROI mong muốn..." className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-[#0D9488] text-white font-bold rounded-xl">Gửi Yêu Cầu Tư Vấn</button>
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
          <h3 className="text-lg font-bold text-center mb-4 text-[#0F766E]">Cổng Nhà Đầu Tư InvestPro</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#0D9488] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#0F766E] text-white pt-8 pb-6 border-t border-teal-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-teal-100`}>
        <div className="font-bold text-white uppercase tracking-wider">INVESTPRO — CỔNG ĐẦU TƯ BẤT ĐỘNG SẢN DÒNG TIỀN VIỆT NAM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #10 Investment & High Yield Portal.</p>
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
