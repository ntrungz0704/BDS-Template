'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import { 
  Landmark, Scroll, Feather, History, MapPin, Phone, Mail, Search, ChevronRight, ChevronLeft, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Shield, Coffee, Car, Calendar, Plus, Minus,
  Filter, Tag, Share2, Heart, Award, Eye, ExternalLink, SlidersHorizontal,
  Compass, Check, AlertCircle, FileText, Send, UserCheck, CheckCircle, Sparkles
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

// ── COLOR PALETTE: IMPERIAL OCHRE & ANTIQUE WOOD ─────────────────────────────
const OCHRE = '#D97706';
const WOOD = '#78350F';
const DARK_WOOD = '#451A03';

export default function Portal09HeritageColonialTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'portal-09';

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
    <header className="bg-[#FFFBEB] border-b border-amber-200 sticky top-0 z-40 shadow-xs text-amber-950">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-[#78350F] flex items-center justify-center text-amber-100 shadow-md">
            <Landmark size={22} />
          </div>
          <div>
            <div className="text-xl font-serif font-black tracking-widest text-[#78350F]">
              HERITAGE<span className="text-[#D97706]">ESTATE</span>
            </div>
            <div className="text-[9px] text-amber-800 font-bold uppercase tracking-widest">Kiến Trúc Pháp Cổ & Di Sản</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 font-serif font-semibold text-xs text-amber-900">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded transition ${currentPage === 'home' ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Trang Chủ</button>
          <button onClick={() => { setFilterCategory('ban'); navigate('sale'); }} className={`px-3 py-2 rounded transition ${currentPage === 'sale' ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Biệt Thự Pháp Cổ</button>
          <button onClick={() => { setFilterCategory('thue'); navigate('rent'); }} className={`px-3 py-2 rounded transition ${currentPage === 'rent' ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Thuê Di Sản</button>
          <button onClick={() => navigate('projects')} className={`px-3 py-2 rounded transition ${['projects', 'project-detail'].includes(currentPage) ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Dự Án Bảo Tồn</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded transition ${['news', 'news-detail'].includes(currentPage) ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Văn Hóa Kiến Trúc</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded transition ${currentPage === 'about' ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Về Chúng Tôi</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded transition ${currentPage === 'contact' ? 'text-amber-100 bg-[#78350F]' : 'hover:bg-amber-100'}`}>Liên Hệ</button>
        </nav>

        <button onClick={() => navigate('contact')} className="px-4 py-2 bg-[#78350F] hover:bg-[#451A03] text-amber-100 font-serif font-bold text-xs uppercase rounded shadow flex items-center gap-1.5">
          <Scroll size={14} /> Ký Gửi Nhà Cổ
        </button>
      </div>
    </header>
  );

  // ── VINTAGE HERITAGE CARD (SIGNATURE OF TEMPLATE 09) ────────────────────────
  const renderHeritageCard = (item: PortalProperty) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-[#FFFBEB] rounded-2xl border-2 border-amber-200 hover:border-[#78350F] overflow-hidden transition duration-300 shadow-xs hover:shadow-xl cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="h-56 relative overflow-hidden bg-amber-100">
          <img src={item.images[0]} alt="" className="w-full h-full object-cover sepia-25 group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-3 py-1 bg-[#451A03]/90 text-amber-200 font-serif text-[10px] uppercase rounded">
              Kiến Trúc Pháp • Niên Đại 1930
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#FFFBEB] border border-amber-300 rounded shadow font-serif font-bold text-sm text-[#78350F]">
            {item.price}
          </div>
        </div>

        <div className="p-5 space-y-2.5">
          <span className="text-[11px] font-serif font-bold text-[#D97706] uppercase block">🏛️ {item.type}</span>
          <h3 className="font-serif font-bold text-base text-amber-950 group-hover:text-[#78350F] transition line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-amber-800 truncate flex items-center gap-1">
            <MapPin size={13} className="text-[#D97706]" /> {item.ward}, {item.district}
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs font-serif text-amber-900 border-t border-amber-200">
            <span>📐 {item.area} m²</span>
            <span>•</span>
            <span>🛏️ {item.bedrooms} PN</span>
            <span>•</span>
            <span>📜 {item.legal}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between text-xs font-serif text-[#78350F] font-bold uppercase tracking-wider">
        <span>Xem hồ sơ di sản</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  // ── 1. HOME PAGE VIEW ──────────────────────────────────────────────────────
  const renderHomePage = () => (
    <div className="bg-[#FEF3C7]/40 space-y-16 pb-16">
      {/* Hero Vintage Section */}
      <section className="relative pt-16 pb-28 px-4 bg-[#78350F] text-amber-100">
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded bg-[#451A03] border border-amber-600 text-amber-300 font-serif text-xs uppercase tracking-widest mb-4">
            <Landmark size={14} /> Tôn Vinh Giá Trị Văn Hóa & Kiến Trúc Di Sản Nghìn Năm
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-amber-100 leading-tight mb-4">
            Bảo Tồn & Chuyển Nhượng Dinh Thự Pháp Cổ
          </h1>
          <p className="text-amber-200 text-sm md:text-base font-light max-w-xl mx-auto font-serif">
            Tuyển chọn những bất động sản mang giá trị lịch sử, nhà rường Cố Đô và biệt thự Đông Dương cổ điển.
          </p>
        </div>

        {/* Floating Search */}
        <div className={`${MAX_W} mx-auto -mb-36 relative z-10`}>
          <div className="bg-[#FFFBEB] rounded-2xl p-6 shadow-xl border-2 border-amber-300 text-amber-950">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3.5 top-3.5 text-amber-700" size={18} />
                <input
                  type="text"
                  placeholder="Tìm theo phố cổ, kiến trúc Pháp, dinh thự..."
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-amber-50 border border-amber-300 rounded text-xs font-serif focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full py-3 px-3 bg-amber-50 border border-amber-300 rounded text-xs font-serif">
                  <option value="all">Tất cả phong cách kiến trúc</option>
                  <option value="Biệt thự">Biệt Thự Pháp Cổ</option>
                  <option value="Nhà phố">Nhà Phố Cổ Hà Nội / Hội An</option>
                  <option value="Đất nền thổ cư">Khuôn Viên Nhà Rường Cố Đô</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full py-3 px-3 bg-amber-50 border border-amber-300 rounded text-xs font-serif">
                  <option value="all">Vùng đất di sản</option>
                  <option value="Hà Nội">Hà Nội (Ba Đình, Hoàn Kiếm)</option>
                  <option value="TP. Hồ Chí Minh">Sài Gòn Xưa (Quận 1, Quận 3)</option>
                  <option value="Đà Nẵng">Cố Đô Huế & Phố Cổ Hội An</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button onClick={() => navigate('sale')} className="w-full py-3 bg-[#78350F] hover:bg-[#451A03] text-amber-100 font-serif font-bold text-xs uppercase rounded shadow">
                  Tra Cứu Di Sản
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Heritage Listings */}
      <section className={`${MAX_W} mx-auto px-4 pt-16`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-serif font-bold text-[#D97706] uppercase tracking-wider">Bộ sưu tập thời gian</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#78350F]">Kiệt Tác Di Sản Nổi Bật</h2>
          </div>
          <button onClick={() => navigate('sale')} className="text-xs font-serif font-bold text-[#78350F] hover:underline flex items-center gap-1">
            Xem toàn bộ ({filteredProperties.length}) <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map(renderHeritageCard)}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGES ───────────────────────────────────────────────────────────────
  const renderListingCatalogPage = () => (
    <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <h1 className="text-2xl font-serif font-black text-[#78350F]">Danh Mục Bất Động Sản Di Sản & Pháp Cổ</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map(renderHeritageCard)}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <button onClick={() => navigate('sale')} className="text-xs font-serif text-[#78350F] font-bold flex items-center gap-1">
            <ChevronLeft size={14} /> Quay lại danh mục
          </button>
          <div className="bg-[#FFFBEB] p-8 rounded-2xl border-2 border-amber-300 space-y-6 shadow-sm">
            <img src={selectedProperty.images[0]} alt="" className="w-full h-96 object-cover rounded" />
            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-200 text-[#78350F] font-serif text-xs font-bold rounded">
                🏛️ {selectedProperty.type}
              </span>
              <h1 className="text-3xl font-serif font-black text-amber-950">{selectedProperty.title}</h1>
              <div className="text-2xl font-serif font-black text-[#78350F]">{selectedProperty.price} • {selectedProperty.area} m²</div>
              <p className="text-sm font-serif text-amber-900 leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectsPage = () => (
    <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <h1 className="text-3xl font-serif font-black text-[#78350F]">Công Trình Phục Dựng & Bảo Tồn</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTAL_PROJECTS.map(p => (
            <div key={p.id} onClick={() => handleOpenProject(p)} className="bg-[#FFFBEB] rounded-2xl border-2 border-amber-200 p-4 cursor-pointer shadow-xs hover:shadow-lg transition">
              <img src={p.thumbnail} alt="" className="w-full h-48 object-cover rounded mb-3" />
              <h3 className="font-serif font-bold text-base text-[#78350F]">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetailPage = () => {
    if (!selectedProject) return null;
    return (
      <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('projects')} className="text-xs font-serif text-[#78350F] font-bold">← Dự án</button>
          <div className="bg-[#FFFBEB] p-8 rounded-2xl border-2 border-amber-300 space-y-4">
            <h1 className="text-3xl font-serif font-black text-[#78350F]">{selectedProject.title}</h1>
            <p className="text-sm font-serif text-amber-900">{selectedProject.overview}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => (
    <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8 max-w-4xl`}>
        <h1 className="text-3xl font-serif font-black text-[#78350F]">Văn Hóa Kiến Trúc & Di Sản</h1>
        <div className="space-y-4">
          {PORTAL_NEWS.map(n => (
            <div key={n.id} onClick={() => handleOpenNews(n)} className="bg-[#FFFBEB] p-5 rounded-2xl border-2 border-amber-200 cursor-pointer flex gap-4 shadow-xs">
              <img src={n.img} alt="" className="w-40 h-28 object-cover rounded" />
              <div>
                <h3 className="font-serif font-bold text-base text-amber-950">{n.title}</h3>
                <p className="text-xs font-serif text-amber-800 mt-1 line-clamp-2">{n.summary}</p>
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
      <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4 max-w-4xl`}>
          <button onClick={() => navigate('news')} className="text-xs font-serif text-[#78350F] font-bold">← Văn hóa</button>
          <article className="bg-[#FFFBEB] p-8 rounded-2xl border-2 border-amber-300 space-y-4">
            <h1 className="text-3xl font-serif font-black text-[#78350F]">{selectedNews.title}</h1>
            <img src={selectedNews.img} alt="" className="w-full h-80 object-cover rounded" />
            <p className="text-sm font-serif text-amber-900 whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
          </article>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl text-center bg-[#FFFBEB] p-8 rounded-2xl border-2 border-amber-300 space-y-4`}>
        <h1 className="text-3xl font-serif font-black text-[#78350F]">Về HeritageEstate</h1>
        <p className="text-sm font-serif text-amber-900">Sứ mệnh bảo tồn, gìn giữ và chuyển nhượng các công trình kiến trúc cổ điển, di sản quý báu của Việt Nam.</p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#FEF3C7]/40 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl bg-[#FFFBEB] p-8 rounded-2xl border-2 border-amber-300 space-y-4`}>
        <h1 className="text-2xl font-serif font-black text-[#78350F]">Liên Hệ & Ký Gửi Dinh Thự Cổ</h1>
        <form onSubmit={e => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3 text-xs font-serif">
          <input type="text" required placeholder="Họ và tên..." className="w-full p-3 border rounded" />
          <input type="tel" required placeholder="Số điện thoại..." className="w-full p-3 border rounded" />
          <textarea rows={4} required placeholder="Thông tin công trình kiến trúc cần bảo tồn hoặc chuyển nhượng..." className="w-full p-3 border rounded" />
          <button type="submit" className="w-full py-3 bg-[#78350F] text-amber-100 font-bold rounded">Gửi Yêu Cầu</button>
        </form>
      </div>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setIsAuthModalOpen(false)}>
        <div className="bg-[#FFFBEB] rounded-2xl max-w-md w-full p-8 border-2 border-amber-300 relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-amber-800"><X size={20} /></button>
          <h3 className="text-lg font-serif font-bold text-center mb-4 text-[#78350F]">Tài Khoản HeritageEstate</h3>
          <form onSubmit={e => { e.preventDefault(); setIsAuthModalOpen(false); alert('Thành công!'); }} className="space-y-3 text-xs font-serif">
            <input type="text" required placeholder="Email / Số điện thoại" className="w-full p-3 border rounded" />
            <input type="password" required placeholder="Mật khẩu" className="w-full p-3 border rounded" />
            <button type="submit" className="w-full py-3 bg-[#78350F] text-amber-100 font-bold rounded">Đăng Nhập</button>
          </form>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-[#451A03] text-amber-200 pt-8 pb-6 border-t border-amber-800 text-xs font-serif">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-2`}>
        <div className="font-bold text-amber-100 uppercase tracking-widest">HERITAGEESTATE — BẢO TỒN VÀ KẾ THỪA DI SẢN KIẾN TRÚC VIỆT NAM</div>
        <p>© 2026 CloneCraft PlatformBDS — Template #09 Heritage & Colonial Portal.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen font-serif bg-[#FEF3C7]/30 text-amber-950 flex flex-col justify-between">
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
