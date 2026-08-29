'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Store, ShoppingBag, UtensilsCrossed, Coffee, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Zap, Building, Footprints
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

// ── COLOR PALETTE: COMMERCIAL ORANGE & MODERN INDIGO ─────────────────────────
const COMMERCIAL_ORANGE = '#EA580C';
const DARK_ORANGE = '#C2410C';
const INDIGO_NAVY = '#4F46E5';

export default function Portal15RetailCommercialTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-15';

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
    <header className="bg-white border-b border-orange-200 sticky top-0 z-40 shadow-xs">
      <div className="bg-[#C2410C] text-white text-xs py-1.5 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>🏬 Sàn Giao Dịch Shophouse Khối Đế Chung Cư & Mặt Bằng Bán Lẻ Thương Mại</span>
          <div className="flex items-center gap-4">
            <span>Tìm mặt bằng chuỗi: <strong className="text-amber-300">0909 333 444</strong></span>
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Retail Partner</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#4F46E5] flex items-center justify-center text-white shadow-md">
            <Store size={22} />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              RETAIL<span className="text-[#EA580C]">PODIUM</span>
            </div>
            <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Shophouse & Commercial Hub</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1.5 font-bold text-xs text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'home' ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'sale' ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Shophouse Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded-lg transition ${currentPage === 'rent' ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Cho Thuê Khối Đế</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded-lg transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Tổ Hợp TTTM</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-lg transition ${['news', 'news-detail'].includes(currentPage) ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Thị Trường Bán Lẻ</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'about' ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'contact' ? 'text-[#EA580C] bg-orange-50 font-black' : 'hover:text-[#EA580C]'}`}>Tìm Mặt Bằng Chuỗi</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl shadow items-center gap-1.5">
            <Store size={14} /> Ký Gửi
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-orange-50 rounded-lg">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-orange-100 px-4 py-3 space-y-1 text-xs font-bold text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Shophouse Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Cho Thuê Khối Đế</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Tổ Hợp TTTM</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Thị Trường Bán Lẻ</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-orange-50 rounded-lg">Tìm Mặt Bằng Chuỗi</button>
        </div>
      )}
    </header>
  );

  // ── COMMERCIAL RETAIL CARD (SIGNATURE OF TEMPLATE 15) ───────────────────────
  const renderRetailCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-2xl border border-orange-200 hover:border-[#EA580C] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-52 relative overflow-hidden bg-orange-50">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 bg-[#EA580C] text-white font-bold text-[10px] rounded flex items-center gap-1">
              <Footprints size={12} /> 45.000 Lượt Khách/Ngày
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 rounded-lg shadow font-black text-sm text-[#C2410C]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-bold text-[#4F46E5] uppercase block">🛍️ Mặt tiền kinh doanh • {item.type}</span>
          <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-[#EA580C] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#EA580C]" /> {item.ward}, {item.district}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>Vỉa hè: 6m</span>
            <span>•</span>
            <span className="text-orange-600 font-bold">Phù hợp F&B / Spa</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs text-[#EA580C] font-bold">
        <span>Xem thông số lưu lượng</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#FFF7ED]/40 space-y-16 pb-16">
      {/* Hero Retail Section */}
      <section className="relative pt-16 pb-28 px-4 bg-gradient-to-b from-[#C2410C] to-[#EA580C] text-white">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Store size={14} /> Vị Trí Vàng Cho Mọi Chuỗi Nhượng Quyền Bán Lẻ & F&B
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Sàn Shophouse Khối Đế & Mặt Bằng Thương Mại
          </h1>
          <p className="text-orange-100 text-sm md:text-base font-light max-w-xl mx-auto">
            Hơn 2.500 mặt bằng khối đế chung cư cư dân đông đúc, nhà phố ngã tư góc 2 mặt tiền và TTTM sầm uất.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-200 text-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-orange-600" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo ngành F&B, cafe, shophouse khối đế..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Tất cả loại mặt bằng</option>
                  <option value="Mặt bằng kinh doanh">Shophouse Khối Đế Chung Cư</option>
                  <option value="Nhà phố">Nhà Phố Góc 2 Mặt Tiền</option>
                  <option value="Văn phòng">Mặt Sàn Trung Tâm Thương Mại</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <option value="all">Khu vực bán lẻ sôi động</option>
                  <option value="TP. Hồ Chí Minh">TP.HCM (Quận 1, Thảo Điền, Q.7)</option>
                  <option value="Hà Nội">Hà Nội (Hoàn Kiếm, Cầu Giấy, Đống Đa)</option>
                  <option value="Đà Nẵng">Đà Nẵng (Hải Châu, Ngũ Hành Sơn)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs uppercase rounded-xl shadow">
                  Tìm Mặt Bằng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Retail Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">Lưu lượng khách lớn</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#C2410C]">Mặt Bằng Thương Mại Đắc Địa</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1">
            Xem tất cả ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderRetailCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-black text-[#C2410C]">Danh Mục Shophouse & Mặt Bằng Bán Lẻ</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderRetailCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#EA580C] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-white p-8 rounded-2xl border border-orange-200 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded-xl" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-orange-50 text-[#EA580C] text-xs font-bold rounded-full">
                🛍️ {selectedProperty.type} • 45.000 lượt khách/ngày
              </span>
              <h1 className="text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
              <div className="text-2xl font-black text-[#EA580C]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-black text-[#C2410C]">Tổ Hợp Trung Tâm Thương Mại & Khối Đế</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white rounded-2xl border border-orange-200 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-base text-[#C2410C]">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#EA580C] font-bold">← Dự án</button>
          <div className="bg-white p-8 rounded-2xl border border-orange-200 space-y-4">
            <h1 className="text-3xl font-black text-[#C2410C]">{selectedProject.title}</h1>
            <p className="text-sm text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-black text-[#C2410C]">Xu Hướng Bán Lẻ & Báo Cáo Thị Trường</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-5 rounded-2xl border border-orange-200 cursor-pointer flex gap-4 shadow-xs">
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
      <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#EA580C] font-bold">← Tin thị trường</button>
          <article className="bg-white p-8 rounded-2xl border border-orange-200 space-y-4">
            <h1 className="text-3xl font-black text-[#C2410C]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded-xl" />
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-white p-8 rounded-2xl border border-orange-200 space-y-4`}>
        <h1 className="text-3xl font-black text-[#C2410C]">Về RetailPodium</h1>
        <p className="text-sm text-slate-600">Đơn vị tư vấn và phát triển mạng lưới mặt bằng bán lẻ, shophouse khối đế chung cư cho các chuỗi nhượng quyền hàng đầu.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#FFF7ED]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-8 rounded-2xl border border-orange-200 space-y-4`}>
        <h1 className="text-2xl font-black text-[#C2410C]">Gửi Yêu Cầu Tìm Mặt Bằng Mở Chuỗi</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Tên thương hiệu / Người liên hệ..." className="w-full p-3 border rounded-xl" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded-xl" />
          <textarea rows={4} required placeholder="Mô tả yêu cầu diện tích, ngân sách thuê và ngành nghề kinh doanh..." className="w-full p-3 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-[#EA580C] text-white font-bold rounded-xl">Gửi Yêu Cầu</button>
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
          <h3 className="text-lg font-bold text-center mb-4 text-[#C2410C]">Tài Khoản Retail Partner</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Email / Mã đối tác" className="w-full p-3 border rounded-xl" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded-xl" />
            <button type="submit" className="w-full py-3 bg-[#EA580C] text-white font-bold rounded-xl">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#C2410C] text-white pt-8 pb-6 border-t border-orange-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-orange-100`}>
        <div className="font-bold text-white uppercase tracking-wider">RETAILPODIUM — SÀN SHOPHOUSE KHỐI ĐẾ & MẶT BẰNG BÁN LẺ VIỆT NAM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #15 Commercial & Retail Podium Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#FFF7ED]/30 text-slate-800 flex flex-col justify-between">
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
