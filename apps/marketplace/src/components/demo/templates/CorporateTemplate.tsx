import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import Link from 'next/link';
import { 
  Menu, X, Phone, Mail, MapPin, Search, ChevronRight, 
  ArrowRight, Building2, TrendingUp, Users, Shield, 
  CheckCircle2, Clock, Globe, Briefcase, Award, Star,
  ChevronDown, ChevronUp, Facebook, Twitter, Linkedin,
  Play, Building, Home, Map, Calendar, Quote, Check,
  Instagram, Youtube, ChevronLeft
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, LinkedinIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

const CORPORATE_NEWS = [
  {
    id: 1,
    slug: 'vinacorp-ky-ket-hop-tac-marriott',
    title: 'VinaCorp Ký Kết Hợp Tác Cùng Marriott International',
    date: '15 Tháng 10, 2026',
    category: 'Hợp Tác Quốc Tế',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    excerpt: 'Lễ ký kết hợp tác chiến lược mở rộng chuỗi khách sạn và căn hộ dịch vụ cao cấp chuẩn quốc tế tại Việt Nam.',
    content: 'Tập đoàn VinaCorp chính thức ký kết thỏa thuận hợp tác chiến lược toàn diện với Marriott International nhằm quản lý và vận hành chuỗi tổ hợp khách sạn 5 sao và căn hộ dịch vụ cao cấp tại 3 thành phố lớn: Hà Nội, TP. Hồ Chí Minh và Đà Nẵng. Sự hợp tác này đánh dấu bước tiến quan trọng trong chiến lược nâng tầm chuẩn mực dịch vụ và gia tăng giá trị tài sản bền vững cho các nhà đầu tư.'
  },
  {
    id: 2,
    slug: 'cat-noc-toa-thap-tai-chinh-vinacorp-center',
    title: 'Cất Nóc Dự Án Tòa Tháp Tài Chính VinaCorp Center',
    date: '02 Tháng 10, 2026',
    category: 'Tiến Độ Dự Án',
    img: 'https://images.unsplash.com/photo-1590240562544-a141b2c4e511?w=800&q=80',
    excerpt: 'Tòa tháp tài chính biểu tượng cao 45 tầng tại trung tâm Quận 1 chính thức cất nóc vượt tiến độ 15 ngày.',
    content: 'Sáng ngày 02/10/2026, VinaCorp cùng liên danh nhà thầu đã tổ chức thành công lễ cất nóc tòa tháp tài chính VinaCorp Center. Dự án sở hữu kiến trúc hiện đại đạt chuẩn LEED Gold, trang bị hệ thống lọc khí trung tâm và thang máy tốc độ cao 8m/s. Tòa nhà dự kiến sẽ đi vào vận hành từ Quý 2/2027, cung cấp hơn 60.000m² sàn văn phòng hạng A.'
  },
  {
    id: 3,
    slug: 'bao-cao-tai-chinh-quy-3-2026',
    title: 'Báo Cáo Tài Chính Quý 3/2026: Lợi Nhuận Vượt Kế Hoạch 120%',
    date: '28 Tháng 09, 2026',
    category: 'Quan Hệ Cổ Đông',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    excerpt: 'Doanh thu thuần và lợi nhuận sau thuế của VinaCorp tiếp tục tăng trưởng ấn tượng trong 9 tháng đầu năm 2026.',
    content: 'HĐQT VinaCorp vừa công bố báo cáo kết quả kinh doanh hợp nhất Quý 3/2026. Tổng doanh thu thuần đạt 4.850 tỷ đồng, tăng 38% so với cùng kỳ năm ngoái. Động lực tăng trưởng chính đến từ việc bàn giao các dự án khu đô thị sinh thái và mảng kinh doanh văn phòng cho thuê duy trì tỷ lệ lấp đầy trên 95%.'
  },
  {
    id: 4,
    slug: 'vinacorp-nhan-giai-thuong-chu-dau-tu-xuat-sac',
    title: 'VinaCorp Nhận Cúp "Chủ Đầu Tư Xuất Sắc Nhất Châu Á 2026"',
    date: '15 Tháng 09, 2026',
    category: 'Giải Thưởng',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    excerpt: 'Vinh danh những đóng góp bền bỉ của tập đoàn trong việc phát triển các dự án bất động sản xanh và bền vững.',
    content: 'Tại lễ trao giải Asia Property Awards 2026 được tổ chức tại Singapore, VinaCorp vinh dự được xướng tên ở hạng mục "Chủ đầu tư xuất sắc nhất Châu Á". Đây là sự khẳng định cho uy tín thương hiệu, năng lực tài chính vững mạnh và triết lý kiến tạo giá trị thực cho cộng đồng của tập đoàn.'
  },
  {
    id: 5,
    slug: 'phat-dong-chien-dich-xanh-2026',
    title: 'Phát Động Chiến Dịch Xanh: Giảm 50% Phát Thải Carbon Đến Năm 2030',
    date: '01 Tháng 09, 2026',
    category: 'Phát Triển Bền Vững',
    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    excerpt: 'Cam kết áp dụng tiêu chuẩn ESG cho 100% các công trình bất động sản phát triển mới.',
    content: 'VinaCorp chính thức công bố lộ trình phát triển bền vững theo tiêu chuẩn ESG (Môi trường - Xã hội - Quản trị). Tập đoàn cam kết sử dụng 100% vật liệu thân thiện môi trường trong các dự án mới, lắp đặt hệ thống điện mặt trời mái nhà và tái sử dụng nước mưa tưới tiêu toàn khu đô thị.'
  }
];

const normalizeCorporatePage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function CorporateTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const resolveInitialArticle = () => {
    if (initialPage && (initialPage.startsWith('tin-tuc/') || initialPage.startsWith('news/') || initialPage.startsWith('bai-viet/'))) {
      const sub = initialPage.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
      return CORPORATE_NEWS.find(n => n.slug === sub || String(n.id) === sub) || CORPORATE_NEWS[0];
    }
    return null;
  };

  const initialArticle = resolveInitialArticle();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialArticle);
  const [activePage, setActivePageState] = useState(initialArticle ? 'news-detail' : normalizeCorporatePage(initialPage));

  useEffect(() => {
    if (initialPage && (initialPage.startsWith('tin-tuc/') || initialPage.startsWith('news/') || initialPage.startsWith('bai-viet/'))) {
      const sub = initialPage.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
      const found = CORPORATE_NEWS.find(n => n.slug === sub || String(n.id) === sub) || CORPORATE_NEWS[0];
      setSelectedArticle(found);
      setActivePageState('news-detail');
    } else {
      setSelectedArticle(null);
      setActivePageState(normalizeCorporatePage(initialPage));
    }
  }, [initialPage]);

  const setActivePage = (p: string, customSlug?: string) => {
    if (p !== 'news-detail') {
      setSelectedArticle(null);
    }
    setActivePageState(p);
    const tSlug = template?.slug || 'bds-03';
    syncDemoUrl(customSlug || (p === 'home' ? '' : p), tSlug);
  };

  const handleOpenArticle = (item: any) => {
    setSelectedArticle(item);
    setActivePageState('news-detail');
    setIsMobileMenuOpen(false);
    const tSlug = template?.slug || 'bds-03';
    syncDemoUrl(`tin-tuc/${item.slug || item.id}`, tSlug);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts.slice(2).join('/') : (parts[1] !== (template?.slug || 'bds-03') ? parts[1] : 'home');
      if (sub) {
        if (sub.startsWith('tin-tuc/') || sub.startsWith('news/') || sub.startsWith('bai-viet/')) {
          const artSlug = sub.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
          const found = CORPORATE_NEWS.find(n => n.slug === artSlug || String(n.id) === artSlug) || CORPORATE_NEWS[0];
          setSelectedArticle(found);
          setActivePageState('news-detail');
        } else {
          setSelectedArticle(null);
          setActivePageState(normalizeCorporatePage(sub));
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [template?.slug]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [homeSubmitted, setHomeSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isMobile = viewport === 'mobile';
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const colors = {
    header: '#0B1D3A',
    body: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#0F4C81',
    accent: '#E8C547',
    text: '#1E293B',
    muted: '#64748B',
    border: '#E2E8F0',
  };

  const fonts = {
    heading: "'IBM Plex Serif', serif",
    body: "'IBM Plex Sans', sans-serif",
  };

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'about', label: 'Về Chúng Tôi' },
    { id: 'gallery', label: 'Thư Viện' },
    { id: 'news', label: 'Tin Tức' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  const renderTopBar = () => (
    <div style={{ backgroundColor: colors.header, color: 'white', fontSize: '0.875rem' }} className="py-2 border-b border-white/10 hidden md:block">
      <div className={`${MAX_W} mx-auto px-4 flex justify-between items-center`}>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Phone size={14} style={{ color: colors.accent }} />
            <span>+84 (0) 24 3828 9999</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={14} style={{ color: colors.accent }} />
            <span>contact@vinacorporate.vn</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={14} style={{ color: colors.accent }} />
            <span>Thứ 2 - Thứ 6: 08:00 - 17:30</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Facebook size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
          <Linkedin size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
          <Twitter size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
          <Instagram size={16} className="cursor-pointer hover:text-white/80 transition-colors" />
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: colors.surface }}>
      {renderTopBar()}
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <Building2 size={32} style={{ color: colors.primary }} className="mr-2" />
            <div>
              <h1 className="font-bold text-2xl tracking-tight leading-none" style={{ color: colors.primary, fontFamily: fonts.heading }}>VINACORP</h1>
              <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: colors.accent }}>Real Estate Group</p>
            </div>
          </div>
          
          {!isSmall && (
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="font-medium text-sm uppercase tracking-wide transition-colors relative group"
                  style={{ color: activePage === item.id ? colors.primary : colors.text }}
                >
                  {item.label}
                  <span 
                    className="absolute -bottom-2 left-0 h-0.5 bg-current transition-all duration-300" 
                    style={{ 
                      width: activePage === item.id ? '100%' : '0%',
                      backgroundColor: colors.accent 
                    }}
                  ></span>
                </button>
              ))}
            </nav>
          )}

          {!isSmall && (
            <button 
              onClick={() => handleNavClick('contact')} 
              className="px-6 py-2.5 font-medium text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90 flex items-center cursor-pointer shadow-md" 
              style={{ backgroundColor: colors.primary }}
            >
              Nhận Báo Giá <ArrowRight size={16} className="ml-2" />
            </button>
          )}

          {isSmall && (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: colors.primary }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isSmall && isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full shadow-lg border-t" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-6 py-4 border-b uppercase font-medium text-sm"
                style={{ 
                  color: activePage === item.id ? colors.primary : colors.text,
                  borderColor: colors.border
                }}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="mx-6 mt-6 py-3 font-medium text-sm uppercase text-white flex justify-center items-center cursor-pointer" 
              style={{ backgroundColor: colors.primary }}
            >
              Nhận Báo Giá
            </button>
          </div>
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      {/* 3. HERO SLIDER */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="Corporate Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className={`${MAX_W} mx-auto px-4 relative z-10 w-full`}>
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 mb-6 text-sm font-semibold uppercase tracking-wider text-white border-l-4" style={{ borderColor: colors.accent, backgroundColor: 'rgba(255,255,255,0.1)' }}>
              Tập Đoàn Bất Động Sản Hàng Đầu
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: fonts.heading }}>
              Kiến Tạo<br />
              <span style={{ color: colors.accent }}>Tương Lai</span>
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light">
              Hơn hai thập kỷ tiên phong định hình không gian sống và không gian làm việc chuẩn quốc tế tại Việt Nam.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleNavClick('projects')}
                className="px-8 py-4 text-white font-medium uppercase tracking-wide transition-colors hover:bg-opacity-90 flex items-center cursor-pointer shadow-lg" 
                style={{ backgroundColor: colors.primary }}
              >
                Khám Phá Dự Án <ChevronRight size={20} className="ml-2" />
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="px-8 py-4 font-medium uppercase tracking-wide transition-colors bg-white hover:bg-gray-100 flex items-center cursor-pointer shadow" 
                style={{ color: colors.primary }}
              >
                Hồ Sơ Năng Lực
              </button>
            </div>
          </div>
        </div>
        {/* Stats Overlay on Hero */}
        <div className="absolute bottom-0 right-0 hidden lg:flex bg-white shadow-2xl z-20">
          <div className="p-8 border-r" style={{ borderColor: colors.border }}>
            <p className="text-4xl font-bold" style={{ color: colors.primary }}>150+</p>
            <p className="text-sm uppercase font-semibold mt-2" style={{ color: colors.muted }}>Dự án hoàn thành</p>
          </div>
          <div className="p-8 border-r" style={{ borderColor: colors.border }}>
            <p className="text-4xl font-bold" style={{ color: colors.primary }}>25<span style={{ color: colors.accent }}>.</span></p>
            <p className="text-sm uppercase font-semibold mt-2" style={{ color: colors.muted }}>Năm kinh nghiệm</p>
          </div>
          <div className="p-8">
            <p className="text-4xl font-bold" style={{ color: colors.primary }}>$5B+</p>
            <p className="text-sm uppercase font-semibold mt-2" style={{ color: colors.muted }}>Tổng giá trị đầu tư</p>
          </div>
        </div>
      </section>

      {/* 4. QUICK SEARCH */}
      <section className="py-8 relative z-30 -mt-8" style={{ padding: isSmall ? '1rem' : '0' }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: colors.primary }}>
            <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full">
                <label className="text-white/80 text-xs uppercase font-semibold mb-2 block">Loại Bất Động Sản</label>
                <select className="w-full bg-transparent border-b border-white/30 text-white py-2 focus:outline-none focus:border-white">
                  <option className="text-gray-900">Tất cả loại hình</option>
                  <option className="text-gray-900">Văn phòng hạng A</option>
                  <option className="text-gray-900">Khu công nghiệp</option>
                  <option className="text-gray-900">Khu đô thị phức hợp</option>
                </select>
              </div>
              <div className="w-full">
                <label className="text-white/80 text-xs uppercase font-semibold mb-2 block">Vị Trí</label>
                <select className="w-full bg-transparent border-b border-white/30 text-white py-2 focus:outline-none focus:border-white">
                  <option className="text-gray-900">Tất cả khu vực</option>
                  <option className="text-gray-900">Hà Nội</option>
                  <option className="text-gray-900">TP. Hồ Chí Minh</option>
                  <option className="text-gray-900">Đà Nẵng</option>
                </select>
              </div>
              <div className="w-full">
                <label className="text-white/80 text-xs uppercase font-semibold mb-2 block">Từ Khóa</label>
                <input type="text" placeholder="Tên dự án..." className="w-full bg-transparent border-b border-white/30 text-white py-2 placeholder-white/50 focus:outline-none focus:border-white" />
              </div>
            </div>
            <button 
              onClick={() => handleNavClick('projects')}
              className="px-10 py-6 md:py-0 flex items-center justify-center transition-colors hover:bg-opacity-90 text-white font-bold uppercase tracking-wider h-auto cursor-pointer" 
              style={{ backgroundColor: colors.accent }}
            >
              <Search className="mr-2" />
              Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-20" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-0.5" style={{ backgroundColor: colors.accent }}></div>
                <span className="uppercase text-sm font-bold tracking-widest" style={{ color: colors.primary }}>Danh mục đầu tư</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Dự Án Trọng Điểm
              </h3>
            </div>
            <button 
              onClick={() => handleNavClick('projects')}
              className="mt-4 md:mt-0 font-medium uppercase tracking-wide text-sm flex items-center hover:underline cursor-pointer" 
              style={{ color: colors.primary }}
            >
              Xem tất cả dự án <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'VinaCorp Financial Tower',
                type: 'Văn phòng hạng A',
                location: 'Quận 1, TP. HCM',
                status: 'Đang mở bán',
                img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
              },
              {
                title: 'EcoTech Industrial Park',
                type: 'Khu công nghiệp xanh',
                location: 'Bình Dương',
                status: 'Đã hoàn thiện',
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
              },
              {
                title: 'Grand Marina Complex',
                type: 'Đô thị phức hợp',
                location: 'Hà Nội',
                status: 'Đang triển khai',
                img: 'https://images.unsplash.com/photo-1600607687920-4e2a09c15ffa?w=800&q=80'
              }
            ].map((project, idx) => (
              <div key={idx} className="group relative bg-white shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: colors.accent }}>
                    {project.status}
                  </span>
                </div>
                <div className="overflow-hidden h-64">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase font-semibold mb-2" style={{ color: colors.muted }}>{project.type}</p>
                  <h4 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>{project.title}</h4>
                  <div className="flex items-center text-sm mb-4" style={{ color: colors.muted }}>
                    <MapPin size={16} className="mr-1" /> {project.location}
                  </div>
                  <div className="w-full h-px mb-4" style={{ backgroundColor: colors.border }}></div>
                  <button 
                    onClick={() => handleNavClick('projects')}
                    className="text-sm font-semibold uppercase flex items-center transition-colors group-hover:text-amber-500 cursor-pointer" 
                    style={{ color: colors.primary }}
                  >
                    Chi tiết dự án <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT COMPANY */}
      <section className="py-20" style={{ backgroundColor: colors.surface }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32" style={{ backgroundColor: colors.accent, zIndex: 0 }}></div>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80" alt="Về chúng tôi" className="relative z-10 w-full h-[500px] object-cover shadow-2xl" />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl z-20 hidden md:block border-t-4" style={{ borderColor: colors.primary }}>
                <p className="text-5xl font-bold mb-1" style={{ color: colors.primary, fontFamily: fonts.heading }}>25</p>
                <p className="text-sm uppercase font-bold text-gray-500">Năm Phát Triển</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-0.5" style={{ backgroundColor: colors.accent }}></div>
                <span className="uppercase text-sm font-bold tracking-widest" style={{ color: colors.primary }}>Giới Thiệu Doanh Nghiệp</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Tầm Nhìn Xuyên Quốc Gia, <br/>Giá Trị Bền Vững
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: colors.muted }}>
                VinaCorp tự hào là một trong những tập đoàn phát triển bất động sản hàng đầu khu vực, chuyên tâm kiến tạo những công trình biểu tượng, nâng tầm chất lượng sống và làm việc cho hàng triệu người.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: colors.muted }}>
                Chúng tôi không chỉ xây dựng những tòa nhà, chúng tôi phát triển hệ sinh thái toàn diện với chuẩn mực khắt khe nhất về chất lượng, an toàn và phát triển xanh.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-blue-50" style={{ color: colors.primary }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Mục tiêu</h5>
                    <p className="text-sm" style={{ color: colors.muted }}>Top 5 Châu Á 2030</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-blue-50" style={{ color: colors.primary }}>
                    <Shield size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Cam kết</h5>
                    <p className="text-sm" style={{ color: colors.muted }}>Chất lượng & Uy tín</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleNavClick('about')}
                className="px-8 py-4 text-white font-medium uppercase tracking-wide transition-all hover:-translate-y-1 shadow-lg flex items-center cursor-pointer" 
                style={{ backgroundColor: colors.primary }}
              >
                Đọc Thêm Về Chúng Tôi <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STATS COUNTER */}
      <section className="py-16 relative" style={{ backgroundColor: colors.header }}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')] bg-cover bg-center"></div>
        <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'Chuyên gia & Nhân sự', icon: <Users size={32} /> },
              { num: '3.2', label: 'Triệu m2 Sàn Xây Dựng', icon: <Building size={32} /> },
              { num: '100%', label: 'Tỷ lệ bàn giao đúng hạn', icon: <CheckCircle2 size={32} /> },
              { num: '20+', label: 'Giải thưởng quốc tế', icon: <Award size={32} /> },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-6">
                <div className="mb-4" style={{ color: colors.accent }}>{stat.icon}</div>
                <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.num}</h4>
                <p className="text-sm uppercase font-semibold text-gray-300 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INVESTMENT REASONS */}
      <section className="py-20" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-0.5" style={{ backgroundColor: colors.accent }}></div>
              <span className="uppercase text-sm font-bold tracking-widest" style={{ color: colors.primary }}>Tại Sao Chọn VinaCorp</span>
              <div className="w-8 h-0.5" style={{ backgroundColor: colors.accent }}></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Lợi Thế Cạnh Tranh Cốt Lõi
            </h3>
            <p className="text-lg" style={{ color: colors.muted }}>
              Chiến lược phát triển bài bản và tiềm lực tài chính vững mạnh mang lại giá trị gia tăng không ngừng cho các nhà đầu tư.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Vị Trí Chiến Lược', desc: '100% quỹ đất tọa lạc tại các vị trí kim cương, trung tâm kết nối giao thương huyết mạch.', icon: <MapPin size={40} /> },
              { title: 'Pháp Lý Minh Bạch', desc: 'Sở hữu quy trình thẩm định nghiêm ngặt, đảm bảo an toàn tuyệt đối cho dòng vốn đầu tư.', icon: <Shield size={40} /> },
              { title: 'Quản Lý Vận Hành', desc: 'Đội ngũ chuyên gia quốc tế quản lý theo tiêu chuẩn khách sạn 5 sao toàn cầu.', icon: <Briefcase size={40} /> },
              { title: 'Tiềm Năng Sinh Lời', desc: 'Tỷ suất lợi nhuận trung bình đạt 12-15%/năm trong vòng 5 năm gần nhất.', icon: <TrendingUp size={40} /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 border-t-4 shadow-sm hover:shadow-xl transition-all group" style={{ borderColor: colors.primary }}>
                <div className="mb-6 p-4 inline-block bg-gray-50 rounded-lg group-hover:scale-110 transition-transform" style={{ color: colors.primary }}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4" style={{ color: colors.text }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AMENITIES */}
      <section className="py-20" style={{ backgroundColor: colors.surface }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Hạ Tầng Hiện Đại & <br/>Tiện Ích Đẳng Cấp
              </h3>
              <p className="text-lg mb-8" style={{ color: colors.muted }}>
                Kiến tạo một hệ sinh thái khép kín với đầy đủ các tiện ích đáp ứng chuẩn mực sống và làm việc quốc tế khắt khe nhất.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Hệ thống an ninh đa lớp 24/7 kiểm soát bằng AI',
                  'Trung tâm hội nghị và triển lãm quy mô quốc tế',
                  'Hệ thống quản lý tòa nhà thông minh BMS',
                  'Khu vực đỗ xe tự động, trạm sạc xe điện EV',
                  'Không gian xanh và công viên cảnh quan chuẩn LEED'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 size={20} style={{ color: colors.accent }} />
                    <span style={{ color: colors.text }} className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleNavClick('about')}
                className="px-6 py-3 border-2 font-medium uppercase tracking-wide transition-colors cursor-pointer" 
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Khám phá hệ sinh thái
              </button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Tiện ích 1" className="w-full h-64 object-cover rounded shadow-md mt-8" />
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80" alt="Tiện ích 2" className="w-full h-64 object-cover rounded shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. GALLERY MASONRY */}
      <section className="py-20" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Thư Viện Hình Ảnh
            </h3>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.muted }}>
              Chiêm ngưỡng các kiệt tác kiến trúc và không gian tiêu biểu do VinaCorp kiến tạo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
            <div className="space-y-4">
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
            <div className="space-y-4">
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687920-4e2a09c15ffa?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onClick={() => handleNavClick('gallery')} onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => handleNavClick('gallery')}
              className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 shadow cursor-pointer" 
              style={{ backgroundColor: colors.primary }}
            >
              Xem Toàn Bộ Thư Viện
            </button>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="py-20" style={{ backgroundColor: colors.header, color: 'white' }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center mb-16">
            <Quote size={48} style={{ color: colors.accent }} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: fonts.heading }}>
              Đối Tác Nói Gì Về Chúng Tôi
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Robert Chen', role: 'CEO, TechAsia Holdings', text: 'Chất lượng văn phòng hạng A tại VinaCorp Financial Tower thực sự đáp ứng được những tiêu chuẩn khắt khe nhất của tập đoàn chúng tôi. Không gian làm việc hoàn hảo.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
              { name: 'Lê Ngọc Phương', role: 'Giám đốc Vận hành, V-Logistics', text: 'Khu công nghiệp EcoTech sở hữu vị trí và hạ tầng vượt trội. Quá trình làm việc với VinaCorp rất chuyên nghiệp, thủ tục pháp lý nhanh gọn, minh bạch.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
              { name: 'Michael Smith', role: 'Giám đốc Đầu tư, Global Fund', text: 'Tỷ suất lợi nhuận từ các dự án phức hợp của VinaCorp luôn duy trì ở mức cao và ổn định. Họ là một trong những đối tác chiến lược tin cậy nhất của chúng tôi.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }
            ].map((t, i) => (
              <div key={i} className="bg-white/10 p-8 border border-white/20 relative">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-8 text-lg">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: colors.accent }} />
                  <div>
                    <h5 className="font-bold text-white">{t.name}</h5>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TIMELINE */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: colors.surface }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text, fontFamily: fonts.heading }}>
              Chặng Đường Phát Triển
            </h3>
            <p className="text-lg" style={{ color: colors.muted }}>Hơn hai thập kỷ kiên định với sứ mệnh kiến tạo những giá trị vượt thời gian.</p>
          </div>
          
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden md:block" style={{ backgroundColor: colors.border }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { year: '2004', title: 'Thành Lập', desc: 'VinaCorp chính thức ra mắt thị trường.' },
                { year: '2010', title: 'Mở Rộng Quy Mô', desc: 'Khánh thành dự án tổ hợp thương mại đầu tiên.' },
                { year: '2018', title: 'Vươn Tầm Quốc Tế', desc: 'Niêm yết thành công, nhận quỹ đầu tư ngoại.' },
                { year: '2026', title: 'Tương Lai Xanh', desc: 'Cam kết 100% dự án mới đạt chuẩn xanh quốc tế.' },
              ].map((milestone, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg border-4 bg-white" style={{ borderColor: colors.primary, color: colors.primary }}>
                    {milestone.year}
                  </div>
                  <h4 className="font-bold text-xl mb-2" style={{ color: colors.text }}>{milestone.title}</h4>
                  <p className="text-sm" style={{ color: colors.muted }}>{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. LATEST NEWS */}
      <section className="py-20" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text, fontFamily: fonts.heading }}>
                Tin Tức & Sự Kiện
              </h3>
            </div>
            <button 
              onClick={() => handleNavClick('news')}
              className="mt-4 md:mt-0 font-medium uppercase tracking-wide text-sm flex items-center hover:underline cursor-pointer" 
              style={{ color: colors.primary }}
            >
              Xem tất cả bài viết <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORPORATE_NEWS.slice(0, 3).map((news) => (
              <div key={news.id} onClick={() => handleOpenArticle(news)} className="bg-white shadow-md overflow-hidden group cursor-pointer flex flex-col justify-between">
                <div>
                  <div className="overflow-hidden h-56 relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: colors.accent }}>
                      <Calendar size={14} className="mr-2" /> {news.date}
                    </div>
                    <h4 
                      className="font-bold text-xl mb-4 leading-snug group-hover:text-blue-700 transition-colors" 
                      style={{ color: colors.text, fontFamily: fonts.heading }}
                    >
                      {news.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-light">{news.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span 
                    className="text-sm font-semibold uppercase flex items-center transition-colors group-hover:text-blue-700" 
                    style={{ color: colors.primary }}
                  >
                    Đọc tiếp <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. PARTNERS */}
      <section className="py-12 border-t border-b" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <p className="text-center text-sm font-bold uppercase tracking-widest mb-8" style={{ color: colors.muted }}>Đối Tác Chiến Lược</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
            {['CBRE', 'SAVILLS', 'MARRIOTT', 'COTECCONS', 'TECHCOMBANK'].map((partner, idx) => (
              <div key={idx} className="text-2xl font-black tracking-tighter" style={{ color: colors.header, fontFamily: fonts.heading }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="py-20" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4 max-w-3xl`}>
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>
            Câu Hỏi Thường Gặp
          </h3>
          <div className="space-y-4">
            {[
              { q: 'Quy trình đầu tư vào các dự án của VinaCorp như thế nào?', a: 'Nhà đầu tư sẽ trải qua 4 bước cơ bản: Tư vấn chuyên sâu -> Ký thỏa thuận đặt cọc -> Ký hợp đồng mua bán/thuê -> Nhận bàn giao và sổ hồng. Đội ngũ tư vấn pháp lý của chúng tôi sẽ hỗ trợ toàn bộ quy trình.' },
              { q: 'Pháp lý của các dự án hiện tại ra sao?', a: '100% dự án của VinaCorp đều có đầy đủ Giấy phép xây dựng, quy hoạch 1/500 và văn bản đủ điều kiện huy động vốn theo luật định trước khi mở bán.' },
              { q: 'Chính sách hỗ trợ tài chính từ ngân hàng?', a: 'Chúng tôi liên kết với các ngân hàng lớn (Vietcombank, Techcombank, MB) hỗ trợ vay lên đến 70% giá trị hợp đồng, ân hạn nợ gốc và miễn lãi suất trong 12-24 tháng đầu.' },
              { q: 'Người nước ngoài có được sở hữu dự án của VinaCorp không?', a: 'Có. Các dự án của chúng tôi đều dành tối đa 30% quỹ căn hộ cho người nước ngoài sở hữu theo quy định của pháp luật Việt Nam, thời hạn 50 năm.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white border shadow-sm" style={{ borderColor: colors.border }}>
                <button 
                  className="w-full text-left p-6 font-bold flex justify-between items-center text-lg" 
                  style={{ color: colors.text }}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  {faq.q}
                  {activeFaq === i ? <ChevronUp style={{ color: colors.primary }} /> : <ChevronDown style={{ color: colors.muted }} />}
                </button>
                {activeFaq === i && (
                  <div className="p-6 pt-0 text-base leading-relaxed" style={{ color: colors.muted }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. CONTACT CTA */}
      <section className="py-20 relative text-white" style={{ backgroundColor: colors.primary }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"/></svg>
        </div>
        <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
          <div className="flex flex-col md:flex-row gap-12 items-center bg-white/10 p-8 md:p-12 backdrop-blur-sm border border-white/20">
            <div className="flex-1">
              <h3 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>Sẵn Sàng Hợp Tác Cùng Chúng Tôi?</h3>
              <p className="text-lg text-blue-100 mb-8">
                Để lại thông tin, đội ngũ chuyên gia tư vấn cấp cao của chúng tôi sẽ liên hệ với quý khách trong vòng 24 giờ làm việc.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full"><Phone size={20} /></div>
                  <span className="font-bold text-xl">+84 24 3828 9999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full"><Mail size={20} /></div>
                  <span className="font-bold text-xl">invest@vinacorporate.vn</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full bg-white p-8 rounded shadow-2xl">
              <h4 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Gửi Yêu Cầu</h4>
              {homeSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center text-emerald-800">
                  <div className="font-bold text-lg mb-1">✓ Đã Gửi Yêu Cầu Thành Công!</div>
                  <p className="text-xs text-emerald-600">Đội ngũ chuyên viên của VinaCorp sẽ liên hệ lại qua SĐT trong vòng 15 phút.</p>
                  <button onClick={() => setHomeSubmitted(false)} className="mt-4 text-xs font-bold text-blue-800 underline">Gửi yêu cầu khác</button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements[0] as HTMLInputElement).value;
                    const phone = (form.elements[1] as HTMLInputElement).value;
                    const email = (form.elements[2] as HTMLInputElement).value;
                    const interest = (form.elements[3] as HTMLSelectElement).value;
                    
                    const phoneClean = phone.replace(/\s/g, '');
                    if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
                      alert('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
                      return;
                    }
                    try {
                      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
                      await fetch(`${API_URL}/api/marketplace/contact`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          fullName: name.trim() || 'Doanh nghiệp',
                          phone: phoneClean,
                          email: email.trim(),
                          selectedTemplate: 'modern-corporate',
                          packageInterest: interest || 'Tư vấn Corporate',
                          message: 'Đăng ký tư vấn từ trang chủ Modern Corporate',
                        }),
                      });
                    } catch (err) {}
                    setHomeSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <input required type="text" placeholder="Họ và tên / Doanh nghiệp *" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="tel" placeholder="Số điện thoại *" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                    <input required type="email" placeholder="Email *" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                  </div>
                  <div>
                    <select className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }}>
                      <option>Quan tâm: Mua Dự án Thương mại</option>
                      <option>Quan tâm: Thuê Văn phòng</option>
                      <option>Quan tâm: Hợp tác Đầu tư</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-90 rounded" style={{ backgroundColor: colors.header }}>
                    Gửi Thông Tin
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4`}>
        <h2 className="text-4xl font-bold mb-10" style={{ color: colors.text, fontFamily: fonts.heading }}>Dự Án Đầu Tư</h2>
        <p className="text-xl mb-12" style={{ color: colors.muted }}>Khám phá danh mục các dự án bất động sản đẳng cấp của VinaCorp.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
             <div key={i} className="bg-white shadow-lg overflow-hidden border" style={{ borderColor: colors.border }}>
               <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={`https://images.unsplash.com/photo-1600607687920-4e2a09c15ffa?w=800&q=80&sig=${i}`} alt="Project" className="w-full h-64 object-cover" />
               <div className="p-6">
                 <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Dự án tiêu biểu #{i}</h4>
                 <p className="text-sm mb-4" style={{ color: colors.muted }}>Hà Nội, Việt Nam</p>
                 <button onClick={() => handleNavClick('contact')} className="text-sm font-bold uppercase text-blue-600 hover:underline cursor-pointer">Xem Chi Tiết</button>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4`}>
        <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>Về VinaCorp</h2>
        <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
          <p className="mb-6">Được thành lập vào năm 2004, VinaCorp đã phát triển từ một công ty bất động sản quy mô vừa trở thành một trong những tập đoàn phát triển bất động sản uy tín và lớn mạnh nhất tại Việt Nam.</p>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80" alt="Team" className="w-full h-96 object-cover mb-8 shadow-xl" />
          <p className="mb-6">Sứ mệnh của chúng tôi là kiến tạo những không gian sống và làm việc hiện đại, thân thiện với môi trường, góp phần thay đổi diện mạo đô thị Việt Nam.</p>
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4`}>
        <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>Thư Viện Ảnh</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} key={i} src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&sig=${i}`} alt="Gallery item" className="w-full h-64 object-cover hover:opacity-75 transition-opacity cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text, fontFamily: fonts.heading }}>Tin Tức & Thông Cáo Báo Chí</h2>
          <p className="text-gray-600">Cập nhật những hoạt động chiến lược, kết quả kinh doanh và tiến độ các dự án bất động sản trọng điểm của VinaCorp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORPORATE_NEWS.map(item => (
            <div 
              key={item.id} 
              onClick={() => handleOpenArticle(item)}
              className="flex flex-col justify-between bg-white rounded shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
            >
              <div>
                <div className="overflow-hidden h-52 relative">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
                    <Calendar size={14} className="mr-1.5" /> {item.date}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-800 transition leading-snug line-clamp-2" style={{ color: colors.primary, fontFamily: fonts.heading }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 font-light leading-relaxed">{item.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="font-bold text-blue-800 uppercase text-xs flex items-center group-hover:underline">
                  Đọc tiếp <ChevronRight size={14} className="ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsDetailPage = () => {
    if (!selectedArticle) return null;
    return (
      <div className="py-24 animate-in fade-in" style={{ backgroundColor: colors.body }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          {/* Breadcrumbs & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-12">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-medium">
              <button onClick={() => handleNavClick('home')} className="hover:text-blue-800 transition">Trang chủ</button>
              <span>/</span>
              <button onClick={() => handleNavClick('news')} className="hover:text-blue-800 transition">Tin tức doanh nghiệp</button>
              <span>/</span>
              <span className="text-gray-900 font-bold truncate max-w-xs sm:max-w-md">{selectedArticle.title}</span>
            </nav>
            <button
              onClick={() => handleNavClick('news')}
              className="text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-800 hover:bg-white transition shadow-sm"
            >
              <ChevronLeft size={16} /> Quay lại tin tức
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <article className="lg:col-span-8 space-y-8 bg-white p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-semibold" style={{ color: colors.accent }}>
                <span>{selectedArticle.category || 'Tin Doanh Nghiệp'}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: colors.text, fontFamily: fonts.heading }}>
                {selectedArticle.title}
              </h1>

              <div className="aspect-[16/9] w-full overflow-hidden shadow-md">
                <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 bg-slate-50 border-l-4 text-lg font-medium text-gray-800 leading-relaxed" style={{ borderColor: colors.primary }}>
                {selectedArticle.excerpt}
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed text-base">
                <p>{selectedArticle.content}</p>
                <p>Với tôn chỉ phát triển bền vững và đặt lợi ích của khách hàng làm trọng tâm, Tập đoàn VinaCorp cam kết tiếp tục mang lại những giá trị vượt trội thông qua các công trình chất lượng và dịch vụ quản lý vận hành chuyên nghiệp.</p>
                <p>Mọi thắc mắc hoặc yêu cầu cung cấp thêm thông tin báo chí, vui lòng liên hệ phòng Quan hệ Cổ đông & Truyền thông của chúng tôi.</p>
              </div>

              <div className="p-8 text-white mt-12 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ backgroundColor: colors.primary }}>
                <div>
                  <h4 className="text-2xl font-bold mb-1" style={{ fontFamily: fonts.heading }}>Đăng Ký Nhận Bản Tin Cổ Đông</h4>
                  <p className="text-blue-100 text-xs">Cập nhật nhanh nhất báo cáo phân tích và thông cáo báo chí định kỳ.</p>
                </div>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase tracking-widest text-xs shrink-0 transition"
                >
                  Liên Hệ Ngay
                </button>
              </div>
            </article>

            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold pb-4 border-b border-gray-100 uppercase tracking-wider" style={{ color: colors.text, fontFamily: fonts.heading }}>
                  Tin Tức Liên Quan
                </h3>
                <div className="space-y-6">
                  {CORPORATE_NEWS.filter(n => n.id !== selectedArticle.id).slice(0, 4).map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenArticle(item)}
                      className="flex gap-4 items-start group cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-24 h-16 object-cover flex-shrink-0 group-hover:opacity-80 transition"
                      />
                      <div>
                        <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider block mb-1">{item.date}</span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-800 transition line-clamp-2 leading-snug" style={{ fontFamily: fonts.heading }}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4`}>
        <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>Liên Hệ Với Chúng Tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Trụ Sở Chính</h3>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-800 mt-1" />
                <p>Tòa nhà VinaCorp Center, 72 Lê Thánh Tôn,<br/> Phường Bến Nghé, Quận 1, TP. HCM</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-800" />
                <p>+84 (0) 24 3828 9999</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-800" />
                <p>contact@vinacorporate.vn</p>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col h-60">
              <div className="px-4 py-2 bg-slate-900 text-white flex items-center justify-between text-xs">
                <span className="font-bold truncate">VinaCorp Center, Quận 1, TP.HCM</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=72+L%C3%AA+Th%C3%A1nh+T%C3%B4n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+TP.+HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-blue-800 hover:bg-blue-700 text-white text-[10px] font-bold shrink-0"
                >
                  Xem Bản Đồ
                </a>
              </div>
              <iframe
                title="Bản đồ VinaCorp Center"
                src="https://maps.google.com/maps?q=72+L%C3%AA+Th%C3%A1nh+T%C3%B4n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+TP.+HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded border">
            <h3 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h3>
            {contactSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center text-emerald-800">
                <div className="font-bold text-lg mb-1">✓ Tin Nhắn Đã Được Gửi!</div>
                <p className="text-xs text-emerald-600">Chúng tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.</p>
                <button onClick={() => setContactSubmitted(false)} className="mt-4 text-xs font-bold text-blue-800 underline">Gửi tin nhắn khác</button>
              </div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (form.elements[0] as HTMLInputElement).value;
                  const phone = (form.elements[1] as HTMLInputElement).value;
                  const email = (form.elements[2] as HTMLInputElement).value;
                  const msg = (form.elements[3] as HTMLTextAreaElement).value;

                  const phoneClean = phone.replace(/\s/g, '');
                  if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
                    alert('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
                    return;
                  }
                  try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
                    await fetch(`${API_URL}/api/marketplace/contact`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fullName: name.trim() || 'Khách liên hệ',
                        phone: phoneClean,
                        email: email.trim(),
                        selectedTemplate: 'modern-corporate',
                        packageInterest: 'Liên hệ từ trang Contact Modern Corporate',
                        message: msg?.trim() || 'Tin nhắn liên hệ',
                      }),
                    });
                  } catch (err) {}
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <input required type="text" placeholder="Họ Tên *" className="w-full p-3 border rounded focus:outline-none focus:border-blue-800" />
                <input required type="tel" placeholder="Số điện thoại *" className="w-full p-3 border rounded focus:outline-none focus:border-blue-800" />
                <input required type="email" placeholder="Email *" className="w-full p-3 border rounded focus:outline-none focus:border-blue-800" />
                <textarea placeholder="Nội dung" rows={4} className="w-full p-3 border rounded focus:outline-none focus:border-blue-800"></textarea>
                <button type="submit" className="px-8 py-3 bg-blue-900 text-white font-bold w-full rounded hover:bg-blue-800 transition-colors cursor-pointer">GỬI LIÊN HỆ</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer style={{ backgroundColor: colors.header, color: 'white' }}>
      {/* 17. NEWSLETTER */}
      <div className="border-b border-white/10">
        <div className={`${MAX_W} mx-auto px-4 py-12`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-2xl font-bold mb-2">Đăng Ký Nhận Bản Tin Đầu Tư</h4>
              <p className="text-gray-400">Cập nhật những thông tin mới nhất về thị trường và dự án của VinaCorp.</p>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Cảm ơn bạn đã đăng ký nhận bản tin đầu tư từ VinaCorp!');
                (e.currentTarget.elements[0] as HTMLInputElement).value = '';
              }}
              className="flex w-full md:w-auto"
            >
              <input required type="email" placeholder="Địa chỉ email của bạn" className="px-4 py-3 text-gray-900 w-full md:w-80 focus:outline-none bg-white" />
              <button type="submit" className="px-6 py-3 font-bold uppercase cursor-pointer" style={{ backgroundColor: colors.accent, color: colors.header }}>Đăng Ký</button>
            </form>
          </div>
        </div>
      </div>

      {/* 18. FULL FOOTER */}
      <div className={`${MAX_W} mx-auto px-4 py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Building2 size={32} style={{ color: colors.accent }} className="mr-2" />
              <div>
                <h1 className="font-bold text-2xl tracking-tight leading-none">VINACORP</h1>
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: colors.accent }}>Real Estate Group</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              VinaCorp - Khẳng định vị thế nhà phát triển bất động sản thương mại và công nghiệp hàng đầu khu vực, mang lại giá trị bền vững cho đối tác và cộng đồng.
            </p>
            <div className="flex items-center space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-2.5 bg-white/5 rounded-full hover:bg-blue-600 text-white transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="p-2 bg-white/5 rounded-full hover:bg-[#0068FF] text-white transition-colors">
                <ZaloIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2.5 bg-white/5 rounded-full hover:bg-blue-700 text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="p-2.5 bg-white/5 rounded-full hover:bg-red-600 text-white transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">Về Chúng Tôi</button></li>
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors cursor-pointer">Dự Án Tiêu Biểu</button></li>
              <li><button onClick={() => handleNavClick('news')} className="hover:text-white transition-colors cursor-pointer">Quan Hệ Nhà Đầu Tư</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">Phát Triển Bền Vững (ESG)</button></li>
              <li><button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors cursor-pointer">Tuyển Dụng</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Lĩnh Vực Hoạt Động</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors cursor-pointer">Bất Động Sản Thương Mại</button></li>
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors cursor-pointer">Bất Động Sản Công Nghiệp</button></li>
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors cursor-pointer">Khu Đô Thị Phức Hợp</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">Quản Lý Vận Hành Tòa Nhà</button></li>
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors cursor-pointer">Đầu Tư Tài Chính BĐS</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Liên Hệ Trụ Sở</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <a href="https://maps.google.com/?q=72+Le+Thanh+Ton+Ben+Nghe+Quan+1+TPHCM" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 hover:text-white transition-colors">
                  <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: colors.accent }} />
                  <span>Tòa nhà VinaCorp Center, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. HCM</span>
                </a>
              </li>
              <li>
                <a href="tel:0919006030" className="flex items-center space-x-3 hover:text-white transition-colors">
                  <Phone size={18} className="shrink-0" style={{ color: colors.accent }} />
                  <span className="whitespace-nowrap">0919 006 030 (Tổng Đài)</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@vinacorporate.vn" className="flex items-center space-x-3 hover:text-white transition-colors">
                  <Mail size={18} className="shrink-0" style={{ color: colors.accent }} />
                  <span>contact@vinacorporate.vn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        <p>© 2026 VinaCorp Real Estate Group. Bảo lưu mọi quyền. | <span className="hover:text-gray-300 cursor-pointer">Chính sách bảo mật</span> | <span className="hover:text-gray-300 cursor-pointer">Điều khoản sử dụng</span></p>
      </div>
    </footer>
  );

  return (
    <div style={{ backgroundColor: colors.body, color: colors.text, fontFamily: fonts.body, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {renderHeader()}
      <main style={{ flex: 1 }}>
        {['home'].includes(activePage) && renderHome()}
        {['projects', 'du-an', 'san-pham'].includes(activePage) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(activePage) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(activePage) && renderGallery()}
        {['contact', 'lien-he', 'tu-van'].includes(activePage) && renderContact()}
        {['news', 'tin-tuc', 'bai-viet'].includes(activePage) && renderNews()}
        {['news-detail'].includes(activePage) && renderNewsDetailPage()}
        {!['home', 'projects', 'du-an', 'san-pham', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'contact', 'lien-he', 'tu-van', 'news', 'tin-tuc', 'bai-viet', 'news-detail'].includes(activePage) && renderHome()}
      </main>
      {renderFooter()}
    </div>
  );
}

