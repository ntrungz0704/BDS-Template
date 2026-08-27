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
import { FacebookIcon, LinkedinIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

export default function CorporateTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
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
                  <button className="text-sm font-semibold uppercase flex items-center transition-colors group-hover:text-amber-500" style={{ color: colors.primary }}>
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
              <button className="px-8 py-4 text-white font-medium uppercase tracking-wide transition-all hover:-translate-y-1 shadow-lg flex items-center" style={{ backgroundColor: colors.primary }}>
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
              <button className="px-6 py-3 border-2 font-medium uppercase tracking-wide transition-colors" style={{ borderColor: colors.primary, color: colors.primary }}>
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
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
            <div className="space-y-4">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
            <div className="space-y-4">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687920-4e2a09c15ffa?w=800&q=80" alt="Gallery" className="w-full h-80 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Gallery" className="w-full h-48 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer" />
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 shadow" style={{ backgroundColor: colors.primary }}>
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
            <button className="mt-4 md:mt-0 font-medium uppercase tracking-wide text-sm flex items-center hover:underline" style={{ color: colors.primary }}>
              Xem tất cả bài viết <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'VinaCorp Ký Kết Hợp Tác Cùng Marriott International', date: '15 Tháng 10, 2026', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80' },
              { title: 'Cất Nóc Dự Án Tòa Tháp Tài Chính VinaCorp Center', date: '02 Tháng 10, 2026', img: 'https://images.unsplash.com/photo-1590240562544-a141b2c4e511?w=800&q=80' },
              { title: 'Báo Cáo Tài Chính Quý 3/2026: Lợi Nhuận Vượt Kế Hoạch 120%', date: '28 Tháng 9, 2026', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' }
            ].map((news, i) => (
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
                      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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
                <button type="submit" className="px-8 py-3 bg-blue-900 text-white font-bold w-full rounded hover:bg-blue-800 transition-colors">GỬI LIÊN HỆ</button>
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
