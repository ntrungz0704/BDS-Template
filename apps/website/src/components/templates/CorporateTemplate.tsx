import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Phone, Mail, MapPin, Search, ChevronRight, 
  ArrowRight, Building2, TrendingUp, Users, Shield, 
  CheckCircle2, Clock, Globe, Briefcase, Award, Star,
  ChevronDown, ChevronUp, Facebook, Twitter, Linkedin,
  Play, Building, Home, Map, Calendar, Quote, Check,
  Instagram, Youtube
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, any> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

export default function CorporateTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
  // Dynamic Projects Override & Shadowing Variable via globalThis reference
  const activeProjects = projects && projects.length > 0
    ? projects.map((p, index) => ({
        id: p.id || String(index),
        name: p.title,
        title: p.title,
        location: p.address || 'Hệ thống',
        price: p.price,
        priceLabel: p.price,
        area: p.area || '—',
        type: p.type || 'Dự Án',
        status: p.status || 'SELLING',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        tag: index === 0 ? 'EXCLUSIVE' : 'HOT',
        desc: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        description: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        shortDescription: p.shortDescription || '',
        specs: p.shortDescription || `${p.area} · ${p.type}`,
        priceVal: parseFloat(p.price) || 0,
        loc: p.address || 'Hệ thống',
        size: parseFloat(p.area) || 0,
        bedrooms: 3,
        bathrooms: 2,
        features: [p.type],
        style: 'Modern',
        delivery: '2026',
        scale: '1 block'
      }))
    : ((globalThis as any).__portfolio_projects_ref || []);

  // Shadowing variables
  const PORTFOLIO_PROJECTS: any = activeProjects;

  const [activePage, setActivePageState] = useState(initialPage);

  useEffect(() => {
    setActivePageState(initialPage);
  }, [initialPage]);
  const setActivePage = (p: string) => {
    setActivePageState(p);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', `/demo/${templateSlug}/${p}`);
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
            <button className="px-6 py-2.5 font-medium text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90 flex items-center" style={{ backgroundColor: colors.primary }}>
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
            <button className="mx-6 mt-6 py-3 font-medium text-sm uppercase text-white flex justify-center items-center" style={{ backgroundColor: colors.primary }}>
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
              <button className="px-8 py-4 text-white font-medium uppercase tracking-wide transition-colors hover:bg-opacity-90 flex items-center" style={{ backgroundColor: colors.primary }}>
                Khám Phá Dự Án <ChevronRight size={20} className="ml-2" />
              </button>
              <button className="px-8 py-4 font-medium uppercase tracking-wide transition-colors bg-white hover:bg-gray-100 flex items-center" style={{ color: colors.primary }}>
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
            <button className="px-10 py-6 md:py-0 flex items-center justify-center transition-colors hover:bg-opacity-90 text-white font-bold uppercase tracking-wider h-auto" style={{ backgroundColor: colors.accent }}>
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
            <button className="mt-4 md:mt-0 font-medium uppercase tracking-wide text-sm flex items-center hover:underline" style={{ color: colors.primary }}>
              Xem tất cả dự án <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.slice(0, 3).map((news, i) => (
              <div key={i} className="bg-white shadow-md overflow-hidden group">
                <div className="overflow-hidden h-56 relative">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: colors.accent }}>
                    <Calendar size={14} className="mr-2" /> {news.date}
                  </div>
                  <h4 className="font-bold text-xl mb-4 leading-snug group-hover:text-blue-700 transition-colors cursor-pointer" style={{ color: colors.text, fontFamily: fonts.heading }}>
                    {news.title}
                  </h4>
                  <button className="text-sm font-semibold uppercase flex items-center transition-colors hover:opacity-70" style={{ color: colors.primary }}>
                    Đọc tiếp <ArrowRight size={14} className="ml-1" />
                  </button>
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
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Họ và tên / Doanh nghiệp" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Số điện thoại" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                  <input type="email" placeholder="Email" className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }} />
                </div>
                <div>
                  <select className="w-full border p-3 rounded focus:outline-none focus:border-blue-800" style={{ borderColor: colors.border, color: colors.text }}>
                    <option>Quan tâm: Mua Dự án Thương mại</option>
                    <option>Quan tâm: Thuê Văn phòng</option>
                    <option>Quan tâm: Hợp tác Đầu tư</option>
                  </select>
                </div>
                <button type="button" className="w-full py-4 font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-90" style={{ backgroundColor: colors.header }}>
                  Gửi Thông Tin
                </button>
              </form>
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
                 <button className="text-sm font-bold uppercase text-blue-600 hover:underline">Xem Chi Tiết</button>
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
        <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>Tin Tức Doanh Nghiệp</h2>
        <div className="max-w-5xl mx-auto space-y-12">
          {[1,2,3].map(i => (
            <div key={i} className="flex flex-col md:flex-row gap-8 bg-white p-6 shadow-sm border border-gray-100">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={`https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&sig=${i}`} className="w-full md:w-1/3 h-48 object-cover" alt="News" />
              <div>
                <p className="text-sm font-bold text-amber-500 mb-2">15 Tháng 10, 2026</p>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>Thông cáo báo chí: Khai trương dự án mới #{i}</h3>
                <p className="text-gray-600 mb-4">Buổi lễ khai trương đã diễn ra thành công tốt đẹp với sự góp mặt của hàng trăm quan khách và nhà đầu tư chiến lược...</p>
                <button className="font-bold text-blue-800 uppercase text-sm hover:underline">Đọc tiếp</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="py-20 animate-in fade-in">
      <div className={`${MAX_W} mx-auto px-4 max-w-5xl`}>
        <h2 className="text-4xl font-bold mb-10 text-center" style={{ color: colors.text, fontFamily: fonts.heading }}>Liên Hệ Với Chúng Tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
          </div>
          <div className="bg-gray-50 p-8 rounded border">
            <h3 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Họ Tên" className="w-full p-3 border rounded" />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
              <textarea placeholder="Nội dung" rows={4} className="w-full p-3 border rounded"></textarea>
              <button className="px-8 py-3 bg-blue-900 text-white font-bold w-full rounded">GỬI LIÊN HỆ</button>
            </form>
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
            <div className="flex w-full md:w-auto">
              <input type="email" placeholder="Địa chỉ email của bạn" className="px-4 py-3 text-gray-900 w-full md:w-80 focus:outline-none" />
              <button className="px-6 py-3 font-bold uppercase" style={{ backgroundColor: colors.accent, color: colors.header }}>Đăng Ký</button>
            </div>
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
            <div className="flex space-x-4">
              <div className="p-2 bg-white/5 rounded-full hover:bg-white/20 cursor-pointer transition-colors"><Facebook size={18} /></div>
              <div className="p-2 bg-white/5 rounded-full hover:bg-white/20 cursor-pointer transition-colors"><Linkedin size={18} /></div>
              <div className="p-2 bg-white/5 rounded-full hover:bg-white/20 cursor-pointer transition-colors"><Twitter size={18} /></div>
              <div className="p-2 bg-white/5 rounded-full hover:bg-white/20 cursor-pointer transition-colors"><Youtube size={18} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">Về Chúng Tôi</button></li>
              <li><button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors">Dự Án Tiêu Biểu</button></li>
              <li><button onClick={() => handleNavClick('news')} className="hover:text-white transition-colors">Quan Hệ Nhà Đầu Tư</button></li>
              <li><button className="hover:text-white transition-colors">Phát Triển Bền Vững (ESG)</button></li>
              <li><button className="hover:text-white transition-colors">Tuyển Dụng</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Lĩnh Vực Hoạt Động</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><button className="hover:text-white transition-colors">Bất Động Sản Thương Mại</button></li>
              <li><button className="hover:text-white transition-colors">Bất Động Sản Công Nghiệp</button></li>
              <li><button className="hover:text-white transition-colors">Khu Đô Thị Phức Hợp</button></li>
              <li><button className="hover:text-white transition-colors">Quản Lý Vận Hành Tòa Nhà</button></li>
              <li><button className="hover:text-white transition-colors">Đầu Tư Tài Chính BĐS</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: colors.surface }}>Liên Hệ Trụ Sở</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: colors.accent }} />
                <span>Tòa nhà VinaCorp Center, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. HCM</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="shrink-0" style={{ color: colors.accent }} />
                <span>+84 (0) 24 3828 9999</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="shrink-0" style={{ color: colors.accent }} />
                <span>contact@vinacorporate.vn</span>
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
        {activePage === 'home' && renderHome()}
        {activePage === 'projects' && renderProjects()}
        {activePage === 'about' && renderAbout()}
        {activePage === 'gallery' && renderGallery()}
        {activePage === 'contact' && renderContact()}
        {activePage === 'news' && renderNews()}
      </main>
      {renderFooter()}
    </div>
  );
}

const MOCK_NEWS = [
  { id: '1', title: 'VinaCorp Ký Kết Hợp Tác Cùng Marriott International', date: '15/10/2026', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', excerpt: 'Buổi lễ ký kết hợp tác chiến lược giữa VinaCorp và tập đoàn Marriott International...' },
  { id: '2', title: 'Cất Nóc Dự Án Tòa Tháp Tài Chính VinaCorp Center', date: '02/10/2026', img: 'https://images.unsplash.com/photo-1590240562544-a141b2c4e511?w=800&q=80', excerpt: 'Dự án tháp tài chính chính thức hoàn thành phần thô vượt tiến độ 30 ngày...' },
  { id: '3', title: 'Báo Cáo Tài Chính Quý 3/2026: Lợi Nhuận Vượt Kế Hoạch 120%', date: '28/09/2026', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', excerpt: 'Kết quả kinh doanh tăng trưởng ấn tượng nhờ đóng góp lớn từ mảng bất động sản...' }
];
