import React, { useState } from 'react';
import { Crown, Star, Phone, Mail, Clock, Building2, Users, ArrowRight, Menu, X, ChevronRight, Download } from 'lucide-react';

interface DynamicLuxuryTemplateProps {
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
}

// ── DESIGN TOKENS (Độc quyền Luxury Gold) ──────────────────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C97E';
const DARK = '#0A0A0F';
const DARK2 = '#12121A';
const DARK3 = '#1A1A24';
const WHITE = '#FFFFFF';
const MUTED = '#9A9AA8';
const MAX_W = 'max-w-7xl';

const FONT_HEADING = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: 'Penthouse Sky Residences',
    location: 'TP. Hồ Chí Minh',
    price: '85 Tỷ VNĐ',
    area: '650m²',
    type: 'Penthouse',
    status: 'Còn 3 căn',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    tag: 'HOT',
    desc: 'Penthouse thông tầng đẳng cấp bậc nhất Quận 1 với hồ bơi vô cực riêng và tầm nhìn bao quát toàn bộ sông Sài Gòn.',
    specs: '5 Phòng ngủ · 6 Phòng vệ sinh · Bể bơi riêng · Hầm rượu mini',
  },
  {
    id: 2,
    name: 'Grand Villa Riverside',
    location: 'Hà Nội',
    price: '45 Tỷ VNĐ',
    area: '420m²',
    type: 'Biệt Thự',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
    tag: 'NEW',
    desc: 'Biệt thự đơn lập ven sông phong cách Tân cổ điển lịch lãm tại Vinhomes Riverside.',
    specs: '4 Phòng ngủ · 5 Phòng vệ sinh · Sân vườn 200m² · Bể bơi tràn bờ',
  }
];

const AMENITIES = [
  { icon: '🏊', title: 'Hồ bơi vô cực tầng 50', desc: 'Tầm nhìn panorama 360° toàn cảnh thành phố và sông Sài Gòn' },
  { icon: '🍷', title: 'Wine Cellar & Cigar Lounge', desc: 'Hầm rượu kiểm soát nhiệt độ chuẩn Ý, phục vụ 24/7' },
  { icon: '🚁', title: 'Sân đáp trực thăng riêng', desc: 'Kết nối nhanh đến sân bay Tân Sơn Nhất trong 8 phút' },
  { icon: '🧘', title: 'Spa & Wellness Center', desc: '4000m² chăm sóc sức khỏe đẳng cấp 6 sao quốc tế' },
  { icon: '🚤', title: 'Bến du thuyền riêng', desc: 'Cầu cảng độc quyền, kết nối trực tiếp sông Sài Gòn' },
];

const STATS = [
  { value: '18+', label: 'Năm kinh nghiệm', icon: Clock },
  { value: '350+', label: 'Dinh thự bàn giao', icon: Building2 },
  { value: '2,800+', label: 'Chủ nhân tinh hoa', icon: Users },
  { value: '98%', label: 'Hài lòng tuyệt đối', icon: Star },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
    <span className="w-8 h-px" style={{ backgroundColor: GOLD }} />
    <span className="text-xs tracking-[0.25em] uppercase" style={{ color: GOLD, fontFamily: FONT_BODY }}>{children}</span>
    <span className="w-8 h-px" style={{ backgroundColor: GOLD }} />
  </div>
);

export default function DynamicLuxuryTemplate({ company, theme, projects, posts }: DynamicLuxuryTemplateProps) {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map dự án từ database
  const mappedProjects = projects && projects.length > 0 
    ? projects.map((p, index) => ({
        id: p.id || index,
        name: p.title,
        location: p.address || 'Hệ thống',
        price: p.price,
        area: p.area || '—',
        type: p.type || 'Dự Án',
        status: p.status || 'Đang bán',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        tag: index === 0 ? 'EXCLUSIVE' : 'HOT',
        desc: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        specs: p.shortDescription || `${p.area} · ${p.type}`
      }))
    : DEFAULT_PROJECTS;

  const activeTheme = {
    primaryColor: theme?.primaryColor || GOLD,
    secondaryColor: theme?.secondaryColor || DARK,
    accentColor: theme?.accentColor || GOLD_LIGHT,
    backgroundColor: theme?.backgroundColor || '#070C1E',
  };

  const navItems = [
    { label: 'Trang Chủ', page: 'home' },
    { label: 'Dự Án', page: 'projects' },
    { label: 'Tiện Ích', page: 'amenities' },
    { label: 'Giới Thiệu', page: 'about' },
    { label: 'Liên Hệ', page: 'contact' },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: activeTheme.backgroundColor,
        color: '#FFFFFF',
        fontFamily: FONT_BODY,
      }}
    >
      {/* ─── Navigation Bar ────────────────────────────────────────── */}
      <nav className="sticky top-0 w-full z-50" style={{ backgroundColor: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 flex justify-between items-center h-20`}>
          {/* Logo / Tên công ty */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 text-left group">
            <Crown className="w-7 h-7 group-hover:scale-110 transition-transform" style={{ color: GOLD }} />
            <div>
              <div className="text-lg tracking-[0.25em] uppercase font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                {company?.name || 'Website Residence'}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                {company?.slogan || 'ROYAL RESIDENCE EXCLUSIVE'}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: '#9A9AA8' }}>
            {navItems.map(item => (
              <button 
                key={item.page} 
                onClick={() => setCurrentPage(item.page)}
                className={`hover:text-white transition-colors pb-1 ${currentPage === item.page ? 'text-white border-b' : ''}`}
                style={currentPage === item.page ? { borderColor: GOLD } : {}}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="ml-4 py-2.5 px-6 text-[10px] tracking-[0.15em] uppercase font-semibold transition-all duration-300"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              VIP Concierge
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-6 pt-2" style={{ backgroundColor: DARK2, borderTop: `1px solid rgba(201,168,76,0.2)` }}>
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { setMobileMenuOpen(false); setCurrentPage(item.page); }}
                className="block w-full text-left py-3 text-sm border-b border-white/5"
                style={{ color: currentPage === item.page ? GOLD : MUTED }}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { setMobileMenuOpen(false); setCurrentPage('contact'); }}
              className="mt-4 w-full justify-center py-3 text-center text-sm font-bold"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              VIP Concierge
            </button>
          </div>
        )}
      </nav>

      {/* ─── Render Page Contents ──────────────────────────────────── */}
      {currentPage === 'home' && (
        <main>
          {/* Hero Banner */}
          <section className="relative h-[85vh] min-h-[600px] flex items-end justify-start overflow-hidden" style={{ backgroundColor: DARK }}>
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=90"
                alt="Luxury Villa"
                className="w-full h-full object-cover"
                style={{ opacity: 0.55 }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.6) 100%)' }} />
            </div>

            <div className={`${MAX_W} mx-auto px-4 md:px-8 pb-20 relative z-10 w-full text-center md:text-left`}>
              <div className="max-w-3xl">
                <SectionLabel>{company?.slogan || 'ROYAL RESIDENCE EXCLUSIVE'}</SectionLabel>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6" style={{ fontFamily: FONT_HEADING }}>
                  Kiệt Tác <span className="italic" style={{ color: GOLD }}>Đỉnh Cao</span><br />
                  Sống Thượng Lưu
                </h1>
                <p className="text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl text-[#B0B0C0]" style={{ fontFamily: FONT_BODY }}>
                  {company?.description || 'Chúng tôi kiến tạo những không gian sống đẳng cấp dành riêng cho giới tinh hoa, được thiết kế bởi các kiến trúc sư danh tiếng.'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <button 
                    onClick={() => setCurrentPage('projects')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300"
                    style={{ backgroundColor: GOLD, color: DARK }}
                  >
                    <ArrowRight className="w-4 h-4" /> Khám phá dự án
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs tracking-[0.15em] uppercase font-medium border transition-all duration-300 hover:bg-white/5"
                    style={{ borderColor: GOLD, color: GOLD }}
                  >
                    Liên hệ tư vấn
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Intro block */}
          <section className="py-24 text-center relative overflow-hidden" style={{ backgroundColor: DARK }}>
            <div className="max-w-4xl mx-auto px-4">
              <Crown className="w-10 h-10 mx-auto mb-8 opacity-40" style={{ color: GOLD }} />
              <blockquote className="text-xl md:text-3xl font-light leading-relaxed mb-6 text-white" style={{ fontFamily: FONT_HEADING }}>
                &quot;Chúng tôi không xây những ngôi nhà. Chúng tôi kiến tạo những <span className="italic" style={{ color: GOLD }}>di sản trường tồn</span> theo năm tháng.&quot;
              </blockquote>
              <p className="text-sm font-light leading-loose text-slate-400">
                {company?.aboutContent || 'Đem lại không gian sống thượng lưu bậc nhất Việt Nam.'}
              </p>
            </div>
          </section>

          {/* Stats block */}
          <section className="py-16" style={{ backgroundColor: DARK3, borderTop: `1px solid rgba(201,168,76,0.1)`, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
            <div className={`${MAX_W} mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8`}>
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-light mb-2 text-white" style={{ fontFamily: FONT_HEADING }}>{s.value}</div>
                  <div className="text-xs uppercase tracking-widest text-[#9A9AA8]">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects Grid */}
          <section className="py-24" style={{ backgroundColor: DARK }}>
            <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
              <div className="text-center mb-16">
                <SectionLabel>Dự án nổi bật</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                  Bộ Sưu Tập <span className="italic" style={{ color: GOLD }}>Dự Án Độc Bản</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {mappedProjects.map(project => (
                  <div key={project.id} className="group relative overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img src={project.img} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                      <span className="absolute top-4 right-4 text-[9px] px-2.5 py-1 tracking-widest font-semibold text-black" style={{ backgroundColor: GOLD }}>
                        {project.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-[10px] uppercase tracking-widest mb-1 text-[#C9A84C]">{project.type} · {project.location}</div>
                      <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: FONT_HEADING }}>{project.name}</h3>
                      <p className="text-xs text-slate-300 mb-4 line-clamp-2">{project.desc}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-semibold" style={{ color: GOLD }}>{project.price}</div>
                          <div className="text-[10px] text-slate-400">{project.area} · {project.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Amenities Grid */}
          <section className="py-24" style={{ backgroundColor: DARK2 }}>
            <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
              <div className="text-center mb-16">
                <SectionLabel>Đặc quyền & Tiện ích</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                  Chuẩn Mực <span className="italic" style={{ color: GOLD }}>6 Sao</span> Quốc Tế
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AMENITIES.map((a, i) => (
                  <div key={i} className="p-6 transition-all border border-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <div className="text-3xl mb-4">{a.icon}</div>
                    <h3 className="text-base font-semibold text-white mb-2">{a.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24" style={{ backgroundColor: DARK }}>
            <div className="max-w-2xl mx-auto px-4 text-center">
              <SectionLabel>Liên hệ tư vấn</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6" style={{ fontFamily: FONT_HEADING }}>
                Đặt Lịch Hẹn <span className="italic" style={{ color: GOLD }}>Trải Nghiệm</span> VIP
              </h2>
              <p className="text-xs text-slate-400 mb-8">
                Để lại thông tin liên lạc, đội ngũ chuyên viên của chúng tôi sẽ gọi điện hỗ trợ tư vấn 1-1 trong 15 phút.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input type="text" placeholder="Họ và tên *" className="flex-1 bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
                  <input type="text" placeholder="Số điện thoại *" className="flex-1 bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
                </div>
                <button className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300" style={{ backgroundColor: GOLD, color: DARK }}>
                  Gửi yêu cầu đặt lịch
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Projects Page */}
      {currentPage === 'projects' && (
        <section className="py-24 flex-1">
          <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-12 text-center" style={{ fontFamily: FONT_HEADING }}>
              Danh Sách <span className="italic" style={{ color: GOLD }}>Dự Án Bất Động Sản</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mappedProjects.map(project => (
                <div key={project.id} className="border border-white/10 overflow-hidden" style={{ backgroundColor: DARK2 }}>
                  <img src={project.img} alt={project.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-widest mb-1 text-[#C9A84C]">{project.type} · {project.location}</div>
                    <h3 className="text-xl font-light text-white mb-3" style={{ fontFamily: FONT_HEADING }}>{project.name}</h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">{project.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold" style={{ color: GOLD }}>{project.price}</span>
                      <span className="text-xs text-slate-400">{project.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities Page */}
      {currentPage === 'amenities' && (
        <section className="py-24 flex-1">
          <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-12 text-center" style={{ fontFamily: FONT_HEADING }}>
              Đặc Quyền <span className="italic" style={{ color: GOLD }}>Tiện Ích Thượng Lưu</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {AMENITIES.map((a, i) => (
                <div key={i} className="p-8 border border-white/10 flex gap-6" style={{ backgroundColor: DARK2 }}>
                  <div className="text-5xl">{a.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Page */}
      {currentPage === 'about' && (
        <section className="py-24 flex-1">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8 text-center" style={{ fontFamily: FONT_HEADING }}>
              Giới Thiệu Về <span className="italic" style={{ color: GOLD }}>{company?.name || 'Website Residence'}</span>
            </h2>
            <p className="text-base font-light leading-loose text-slate-300 mb-6">
              {company?.description || 'Chúng tôi kiến tạo những không gian sống đẳng cấp dành riêng cho giới tinh hoa.'}
            </p>
            <p className="text-base font-light leading-loose text-slate-300 mb-6">
              {company?.aboutContent || 'Chúng tôi tin tưởng mỗi website và dự án bàn giao là một cam kết bền vững cho phong cách sống thời thượng.'}
            </p>
            <div className="mt-12 p-8 border border-white/10" style={{ backgroundColor: DARK2 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Thông Tin Liên Hệ</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <p>📍 Địa chỉ: {company?.address || 'Bán đảo Thảo Điền - Quận 2'}</p>
                <p>📞 Điện thoại: {company?.phone || '0983312219'}</p>
                <p>✉️ Email: {company?.email || 'royal@hoanggialand.platformbds.vn'}</p>
                <p>⏰ Giờ làm việc: {company?.workingHours || '8h00 - 20h00'}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Page */}
      {currentPage === 'contact' && (
        <section className="py-24 flex-1">
          <div className="max-w-lg mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4 text-center" style={{ fontFamily: FONT_HEADING }}>
              Liên Hệ <span className="italic" style={{ color: GOLD }}>Tư Vấn VIP</span>
            </h2>
            <p className="text-xs text-slate-400 mb-10 text-center">
              Nhập thông tin bên dưới, nhân viên hỗ trợ sẽ liên hệ quý khách ngay lập tức.
            </p>
            <div className="space-y-6">
              <input type="text" placeholder="Họ và tên *" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
              <input type="text" placeholder="Số điện thoại *" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
              <input type="email" placeholder="Email (nếu có)" className="w-full bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
              <textarea placeholder="Nội dung yêu cầu..." rows={3} className="w-full bg-transparent border-b border-white/20 py-3 text-white text-xs focus:outline-none focus:border-amber-500" />
              <button className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300" style={{ backgroundColor: GOLD, color: DARK }}>
                Gửi Đăng Ký Tư Vấn
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer ────────────────────────────────────────────────── */}
      <footer className="py-12 mt-auto" style={{ backgroundColor: '#070C1E', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6`}>
          <div>
            <div className="text-sm font-semibold text-white tracking-widest uppercase mb-1">{company?.name || 'Website Residence'}</div>
            <div className="text-[10px] text-slate-500">© 2026 PlatformBDS. Tất cả quyền lợi được bảo lưu.</div>
          </div>
          <div className="flex gap-4 text-xs text-slate-400">
            <span>Giờ làm việc: {company?.workingHours || '8h00 - 20h00'}</span>
            <span>|</span>
            <span>Hotline: {company?.phone || '0983312219'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
