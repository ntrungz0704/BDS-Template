'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Building2, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles,
  Zap, Flame, Bookmark
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

// ── COLOR PALETTE: DENSITY EMERALD & CONCRETE GRAY ───────────────────────────
const EMERALD = '#059669';
const EMERALD_DARK = '#065F46';
const RED_PRICE = '#DC2626';

export default function Portal04DensityRaoVatTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-04';

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
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
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
    <header className="bg-white border-b border-slate-300 sticky top-0 z-40 shadow-xs">
      <div className="bg-[#059669] text-white text-[11px] py-1.5 px-4 font-semibold">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <span>🔥 Cổng tin rao vặt nhà đất chính chủ nhanh số 1 Việt Nam</span>
          <div className="flex items-center gap-3">
            <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:underline">Đăng nhập</button>
            <span>|</span>
            <button onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }} className="hover:underline">Đăng ký</button>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 bg-[#059669] text-white flex items-center justify-center font-black rounded text-lg">
            RAO
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-none">
              NHADATSO<span className="text-[#059669]">.PRO</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Mạng Rao Vặt BĐS Mật Độ Cao</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 font-bold text-xs uppercase text-slate-700">
          <button onClick={() => navigate('home')} className={`px-2.5 py-1.5 rounded ${currentPage === 'home' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-2.5 py-1.5 rounded ${currentPage === 'sale' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-2.5 py-1.5 rounded ${currentPage === 'rent' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className={`px-2.5 py-1.5 rounded ${currentPage === 'transfer' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className={`px-2.5 py-1.5 rounded ${['projects', 'project-detail'].includes(currentPage) ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Dự Án</button>
          <button onClick={() => navigate('news')} className={`px-2.5 py-1.5 rounded ${['news', 'news-detail'].includes(currentPage) ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Tin Tức</button>
          <button onClick={() => navigate('about')} className={`px-2.5 py-1.5 rounded ${currentPage === 'about' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className={`px-2.5 py-1.5 rounded ${currentPage === 'contact' ? 'bg-[#059669] text-white' : 'hover:bg-slate-100'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-3.5 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs uppercase rounded items-center gap-1 shadow-xs">
            <Plus size={14} /> Đăng Tin
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1.5 text-xs font-bold uppercase text-slate-700 shadow-lg">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Nhà Đất Bán</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Cho Thuê</button>
          <button onClick={() => { setFilterCategory('sang-nhuong'); navigate('transfer'); }} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Sang Nhượng</button>
          <button onClick={() => navigate('projects')} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Dự Án</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Tin Tức</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Giới Thiệu</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-100 rounded">Liên Hệ & Ký Gửi</button>
        </div>
      )}
    </header>
  );

  // ── ULTRA COMPACT DENSE ROW (SIGNATURE OF TEMPLATE 04) ──────────────────────
  const renderDenseRow = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white border-b border-slate-200 hover:bg-emerald-50/40 p-3 flex flex-col sm:flex-row gap-3 cursor-pointer transition"
    >
      <div className="sm:w-36 h-24 shrink-0 rounded overflow-hidden bg-slate-100 relative">
        <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
        {item.isHot && <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-black rounded">VIP</span>}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-xs md:text-sm text-slate-900 hover:text-[#059669] transition line-clamp-2 leading-snug">
            {item.title}
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-xs mt-1">
            <span className="font-black text-[#DC2626] text-sm">{item.price}</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-slate-700">{item.area} m²</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 truncate">📍 {item.ward}, {item.district}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-100">
          <span>Người đăng: <strong className="text-slate-600">{item.author.name}</strong></span>
          <span>🕒 {item.date}</span>
        </div>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW (3-COLUMN DENSITY LAYOUT) ────────────────────────────
  const renderHomePage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        {/* Compact Search */}
        <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Tìm tin rao nhà đất, căn hộ..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border rounded text-xs"
          />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2 border rounded text-xs text-slate-700">
            <option value="all">Tất cả loại BĐS</option>
            <option value="Căn hộ chung cư">Căn hộ</option>
            <option value="Nhà phố">Nhà phố</option>
            <option value="Đất nền thổ cư">Đất nền</option>
          </select>
          <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="p-2 border rounded text-xs text-slate-700">
            <option value="all">Tỉnh thành</option>
            <option value="TP. Hồ Chí Minh">TP.HCM</option>
            <option value="Hà Nội">Hà Nội</option>
          </select>
          <button onClick={() => navigate('sale')} className="px-4 py-2 bg-[#059669] text-white font-bold text-xs uppercase rounded">
            Tìm Kiếm
          </button>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Filter Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-slate-300">
              <h4 className="font-bold text-xs uppercase text-slate-800 pb-2 border-b mb-2">Loại Bất Động Sản</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {['Căn hộ chung cư', 'Nhà phố', 'Biệt thự', 'Đất nền thổ cư', 'Mặt bằng kinh doanh'].map((t, i) => (
                  <li key={i}>
                    <button onClick={() => { setFilterType(t); navigate('sale'); }} className="hover:text-[#059669] text-left w-full py-1">
                      › {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-300">
              <h4 className="font-bold text-xs uppercase text-slate-800 pb-2 border-b mb-2">BĐS Theo Quận Huyện</h4>
              <ul className="space-y-1 text-xs text-slate-600">
                {['Quận 1', 'Quận 7', 'Bình Thạnh', 'Cầu Giấy', 'Hà Đông'].map((d, i) => (
                  <li key={i}>
                    <button onClick={() => { setSearchKeyword(d); navigate('sale'); }} className="hover:text-[#059669] py-1">
                      📍 {d} (Hơn 1.200 tin)
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center Main Listings (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-slate-300 shadow-xs overflow-hidden">
            <div className="bg-slate-800 text-white p-3 font-bold text-xs uppercase flex justify-between items-center">
              <span>Danh Sách Tin Rao Vặt Mới Nhất</span>
              <span className="text-emerald-400 font-normal">Cập nhật 1 phút trước</span>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredProperties.map(renderDenseRow)}
            </div>
          </div>

          {/* Right Ads & Consign Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-[#065F46] text-white p-4 rounded-lg space-y-2">
              <h4 className="font-bold text-xs uppercase text-amber-300">Ký Gửi Nhà Đất Miễn Phí</h4>
              <p className="text-[11px] text-emerald-100">Tiếp cận 30.000 lượt xem mỗi ngày trên hệ thống RaoVat Pro.</p>
              <button onClick={() => navigate('contact')} className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs uppercase rounded">
                Gửi Tin Ngay
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-300">
              <h4 className="font-bold text-xs uppercase text-slate-800 pb-2 border-b mb-2">Tin Tức Nhà Đất</h4>
              <div className="space-y-3">
                {PORTAL_NEWS.slice(0, 3).map(n => (
                  <div key={n.id} onClick={() => handleOpenNews(n)} className="cursor-pointer group">
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-[#059669] line-clamp-2 leading-tight">{n.title}</h5>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <h1 className="text-xl font-black text-slate-900">Danh Mục Tin Rao Vặt Bất Động Sản</h1>
        <div className="bg-white rounded-lg border border-slate-300 divide-y divide-slate-200">
          {filteredProperties.map(renderDenseRow)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-6 bg-[#F3F4F6] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs text-[#059669] font-bold">← Quay lại danh sách tin</button>
          <div className="bg-white p-6 rounded-lg border border-slate-300 space-y-4">
            <h1 className="text-xl font-black text-slate-900">{selectedProperty.title}</h1>
            <div className="text-lg font-black text-[#DC2626]">{selectedProperty.price} • {selectedProperty.area} m²</div>
            <img src={selectedProperty.images[0]} alt="" className="w-full h-80 object-cover rounded" />
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{selectedProperty.description}</p>
            <div className="p-4 bg-slate-50 border rounded flex justify-between items-center">
              <div>
                <strong className="block text-sm">{selectedProperty.author.name}</strong>
                <span className="text-xs text-slate-500">{selectedProperty.author.phone}</span>
              </div>
              <a href={`tel:${selectedProperty.author.phone.replace(/\s+/g, '')}`} className="px-4 py-2 bg-[#DC2626] text-white font-bold text-xs rounded">
                Gọi Ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <h1 className="text-xl font-black">Dự Án Bất Động Sản</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-white border p-3 rounded cursor-pointer">
              <img src={p.thumbnail} alt="" className="w-full h-44 object-cover rounded mb-2" />
              <h3 className="font-bold text-sm">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-6 bg-[#F3F4F6] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs text-[#059669] font-bold">← Dự án</button>
          <div className="bg-white p-6 border rounded space-y-4">
            <h1 className="text-xl font-black">{selectedProject.title}</h1>
            <p className="text-xs text-slate-700">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
        <h1 className="text-xl font-black">Tin Tức Thị Trường</h1>
        <div className="space-y-3">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-white p-4 border rounded cursor-pointer flex gap-4">
              <img src={n.img} alt="" className="w-32 h-20 object-cover rounded" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                <span className="text-[11px] text-slate-400">{n.date}</span>
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
      <div className="py-6 bg-[#F3F4F6] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs text-[#059669] font-bold">← Tin tức</button>
          <article className="bg-white p-6 border rounded space-y-4">
            <h1 className="text-xl font-black">{selectedNews.title}</h1>
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl bg-white p-6 border rounded space-y-3 text-center`}>
        <h1 className="text-xl font-black">Về RaoVat Pro</h1>
        <p className="text-xs text-slate-600">Kênh đăng tin và tra cứu nhà đất mật độ cao hàng đầu Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-6 bg-[#F3F4F6] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-white p-6 border rounded space-y-4`}>
        <h1 className="text-xl font-black">Liên Hệ Đăng Tin</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-2.5 border rounded" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-2.5 border rounded" />
          <textarea rows={4} required placeholder="Nội dung cần đăng..." className="w-full p-2.5 border rounded" />
          <button type="submit" className="w-full py-2.5 bg-[#059669] text-white font-bold rounded">Gửi Tin</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-white rounded-lg max-w-sm w-full p-6 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-3 right-3 text-slate-400"><X size={18} /></button>
          <h3 className="text-base font-bold text-center mb-3">Tài Khoản RaoVat Pro</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs">
            <input type="text" required placeholder="Số điện thoại / Email" className="w-full p-2.5 border rounded" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-2.5 border rounded" />
            <button type="submit" className="w-full py-2.5 bg-[#059669] text-white font-bold rounded">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-slate-900 text-white pt-8 pb-6 border-t border-slate-800 text-xs">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2 text-slate-400`}>
        <div className="font-bold text-white uppercase">NHADATSO.PRO — MẠNG RAO VẶT BẤT ĐỘNG SẢN MẬT ĐỘ CAO</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #04 Density RaoVat Pro.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#F3F4F6] text-slate-800 flex flex-col justify-between text-xs md:text-sm">
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
