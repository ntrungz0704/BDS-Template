'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Crown,
  Compass, Eye
} from 'lucide-react';

export interface LP04TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
  pageContent?: any;
}

export default function LP04Template({
  template,
  company,
  projects,
  pageContent
}: LP04TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  // Brand & Company info fallback from CMS
  const firstProject = (projects && Array.isArray(projects) && projects.length > 0) ? projects[0] : null;
  const brandName = firstProject?.title || firstProject?.name || company?.name || template?.name || 'DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP';
  const companyGroup = 'TẬP ĐOÀN VẠN PHÚC GROUP';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Bán Đảo Vạn Phúc, Quốc Lộ 13, TP. Thủ Đức, TP. Hồ Chí Minh & Hà Nội';

  // Hero Lead Form State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroProductType, setHeroProductType] = useState('Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Bottom VIP Arch Form State
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipEmail, setVipEmail] = useState('');
  const [vipProduct, setVipProduct] = useState('Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)');
  const [isVipSubmitted, setIsVipSubmitted] = useState(false);

  // Master Plan Active Tab State
  const [activeZoneTab, setActiveZoneTab] = useState<'tongthe' | 'bietthu' | 'shophouse' | 'dinhthu'>('bietthu');

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX: Automatically pre-select product and scroll to Hero Form
  const handleSelectProduct = (productName: string) => {
    setHeroProductType(productName);
    setVipProduct(productName);
    const element = document.getElementById('hero-lead-box');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-product-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-4', 'ring-amber-400', 'border-amber-400');
          setTimeout(() => selectEl.classList.remove('ring-4', 'ring-amber-400', 'border-amber-400'), 2000);
        }
      }, 350);
    }
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPhone.trim()) return;
    setIsHeroSubmitted(true);
    setTimeout(() => setIsHeroSubmitted(false), 6000);
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipPhone.trim()) return;
    setIsVipSubmitted(true);
    setTimeout(() => setIsVipSubmitted(false), 6000);
  };

  // Master Plan Data
  const masterPlanData = {
    'tongthe': {
      title: 'Quy Hoạch Tổng Thể Đại Đô Thị 198 Hécta',
      desc: '3 mặt giáp sông Sài Gòn thơ mộng, hồ cảnh quan Đại Nhật 16ha và công viên giải trí chuẩn quốc tế.',
      specs: '198ha · 3 Mặt Sông · Mật độ xây dựng 35% · 10 Phân khu chức năng',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
    },
    'bietthu': {
      title: 'Phân Khu Biệt Thự Hoàng Gia (Mansion Villas)',
      desc: 'Kiến trúc Tân Cổ Điển Châu Âu quý phái, hồ bơi riêng, hầm rượu vang và sân vườn chân mây rộng lớn.',
      specs: 'Diện tích 250m² - 500m² · 1 Hầm 4 Tầng · Bàn giao hoàn thiện cao cấp',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    },
    'shophouse': {
      title: 'Phân Khu Shophouse Phố Đi Bộ Châu Âu (Commercial Avenue)',
      desc: 'Tọa lạc mặt tiền đại lộ ánh sáng, tối ưu vừa kinh doanh thương mại xa hoa vừa để ở tiện nghi.',
      specs: 'Diện tích 140m² - 220m² · Mặt tiền rộng 7m - 9m · Hầm để xe riêng',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    },
    'dinhthu': {
      title: 'Dinh Thự Đảo Ngọc Ven Hồ (Royal Lakefront Mansions)',
      desc: 'Bộ sưu tập giới hạn 36 căn dinh thự độc bản dành riêng cho giới tinh hoa thượng lưu.',
      specs: 'Diện tích 600m² - 1200m² · Bến du thuyền riêng · Hồ bơi vô cực tràn bờ',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    },
  };

  // 6 Highlights Amenities
  const amenitiesList = [
    { title: 'Quảng Trường Nhạc Nước & Pháo Hoa', desc: 'Quy mô lớn nhất Đông Nam Á, trình diễn nghệ thuật ánh sáng và âm thanh đỉnh cao.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { title: 'Bến Du Thuyền Hoàng Gia 5 Sao', desc: 'Nơi neo đậu du thuyền siêu sang cùng các dịch vụ party riêng tư trên sông nước.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
    { title: 'Công Viên Cảnh Quan Ven Hồ 16ha', desc: 'Lá phổi xanh điều hòa không khí trong lành quanh năm cho toàn khu đô thị.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
    { title: 'Tuyến Phố Đi Bộ Mua Sắm Châu Âu', desc: 'Hội tụ hàng trăm thương hiệu thời trang, ẩm thực Michelin và giải trí thượng đỉnh.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { title: 'Clubhouse & Hồ Bơi Vô Cực Nước Mặn', desc: 'Không gian thư giãn đẳng cấp quốc tế với hệ thống lọc nước điện phân ion muối.', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80' },
    { title: 'Bệnh Viện & Trường Học Quốc Tế', desc: 'Hệ thống giáo dục liên cấp từ Mầm non đến Đại học chuẩn quốc tế Cambridge.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
  ];

  // 4 News / Updates
  const projectNews = [
    { title: 'Lễ Khởi Công Phân Khu Dinh Thự Đảo Ngọc', date: '28/08/2026', desc: 'Đón nhận sự tham gia của hơn 1000 khách hàng VIP và nhà đầu tư chiến lược.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80' },
    { title: 'Khai Trương Tuyến Phố Đi Bộ Royal Avenue', date: '15/08/2026', desc: 'Thu hút hơn 50.000 lượt khách tham quan, thưởng thức ẩm thực và lễ hội ánh sáng.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
    { title: 'Hợp Tác Chiến Lược Với Tập Đoàn Savills', date: '02/08/2026', desc: 'Chính thức ký kết hợp đồng quản lý vận hành khu đô thị theo tiêu chuẩn 5 sao.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80' },
    { title: 'Bàn Giao 200 Căn Biệt Thự Đợt 1', date: '20/07/2026', desc: 'Khách hàng nhận nhà vượt tiến độ cam kết 3 tháng với sổ hồng trao tay.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#5C0612] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* ════════════════ 1. TOP ROYAL NAVBAR ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#42040C]/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-lg px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Royal Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-amber-300 tracking-wider uppercase block leading-none">
                {(company as any)?.logoText || "LP BDS04"}
              </span>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest block mt-0.5 font-semibold">
                ĐẠI ĐÔ THỊ NGHỈ DƯỠNG HOÀNG GIA
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a href="#tong-quan" className="hover:text-amber-300 transition-colors">Tổng Quan</a>
            <a href="#video-gioi-thieu" className="hover:text-amber-300 transition-colors">Video Dự Án</a>
            <a href="#tien-ich" className="hover:text-amber-300 transition-colors">Tiện Ích</a>
            <a href="#vi-tri" className="hover:text-amber-300 transition-colors">Vị Trí</a>
            <a href="#mat-bang" className="hover:text-amber-300 transition-colors">Mặt Bằng</a>
            <a href="#chinh-sach" className="hover:text-amber-300 transition-colors">Chính Sách</a>
          </nav>

          {/* Header Contact */}
          <div className="flex items-center gap-4">
            <a href={`tel:${hotline}`} className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#hero-lead-box"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Đăng Ký VIP
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO BANNER & CENTER LEAD BOX ════════════════ */}
      <section className="relative min-h-[560px] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
        {/* Background Full Width Luxury Panoramic Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"
            alt="Hero Panoramic View"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#42040C]/80 via-[#5C0612]/70 to-[#5C0612]" />
        </div>

        {/* Center Floating Red Luxury Lead Box */}
        <div id="hero-lead-box" className="relative z-10 max-w-4xl w-full mx-auto bg-gradient-to-b from-[#8C0E1F] to-[#630914] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 text-center space-y-6">
          
          <div className="space-y-2">
            <span className="inline-block px-4 py-1 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">
              ★ ĐẠI ĐÔ THỊ ĐẸP NHẤT VIỆT NAM 2026 ★
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              {brandName}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mx-auto leading-relaxed">
              Biểu tượng thịnh vượng mới bên sông Sài Gòn — Đẳng cấp sống vương giả dành riêng cho 1% giới thượng lưu tinh hoa.
            </p>
          </div>

          {/* Form Lead Box inside Hero */}
          {isHeroSubmitted ? (
            <div className="bg-emerald-950/80 border border-emerald-400 p-6 rounded-2xl text-center space-y-2 max-w-lg mx-auto animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-black text-sm text-emerald-300 uppercase">TIẾP NHẬN ĐĂNG KÝ VIP THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-200">
                Chuyên viên Giám đốc khối sẽ trực tiếp liên hệ lại qua số <strong>{heroPhone}</strong> trong vòng 3 phút và gửi bộ tài liệu bảng giá qua Zalo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleHeroSubmit} className="max-w-2xl mx-auto space-y-3.5 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="Họ và tên của Quý Khách *"
                  className="px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-amber-300/60 focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                  className="px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-amber-300/60 focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="Email nhận hồ sơ VIP"
                  className="px-4 py-3 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-500 border border-amber-300/60 focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <select
                  id="hero-product-select"
                  value={heroProductType}
                  onChange={(e) => setHeroProductType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-black border border-amber-300/60 focus:ring-2 focus:ring-amber-400 outline-none transition-all duration-300"
                >
                  <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)">Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Song Lập Vườn (200m² - 280m²)">Biệt Thự Song Lập Vườn (200m² - 280m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Shophouse Phố Đi Bộ Châu Âu (140m² - 220m²)">Shophouse Phố Đi Bộ Châu Âu (140m² - 220m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)">Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>NHẬN TRỌN BỘ BẢNG GIÁ & CHÍNH SÁCH VIP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 text-white text-xs font-bold">
                  <a href={`https://zalo.me/${zalo}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 shadow-md">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a href={`tel:${hotline}`} className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 3. TỔNG QUAN DỰ ÁN (GOLD FRAME ON BURGUNDY) ════════════════ */}
      <section id="tong-quan" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              QUY MÔ & TẦM VÓC
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              TỔNG QUAN DỰ ÁN HOÀNG GIA
            </h2>
          </div>

          {/* Gold Framed Card */}
          <div className="bg-[#FFFDF9] text-slate-900 border-4 border-[#D4AF37] rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black rounded-lg uppercase">
                Đại Đô Thị Biểu Tượng Mới
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#5C0612]">
                {brandName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Tọa lạc trên bán đảo tuyệt đẹp được ôm trọn bởi 3 mặt sông Sài Gòn, dự án được kiến tạo như một thành phố thu nhỏ chuẩn resort thượng lưu với đầy đủ tiện ích thương mại, giáo dục, y tế và giải trí đỉnh cao.
              </p>
              <div className="pt-2">
                <a
                  href="#hero-lead-box"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5C0612] hover:bg-[#8C0E1F] text-amber-300 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <span>TẢI TÀI LIỆU QUY HOẠCH 1/500</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3 text-xs text-slate-800 font-bold">
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="text-slate-500 font-normal">• Chủ đầu tư:</span>
                <span className="text-right text-[#5C0612]">{companyGroup}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="text-slate-500 font-normal">• Vị trí:</span>
                <span className="text-right max-w-[220px]">{address}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="text-slate-500 font-normal">• Tổng diện tích:</span>
                <span className="text-right">198 hécta (Mật độ xây dựng 35%)</span>
              </div>
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="text-slate-500 font-normal">• Loại hình:</span>
                <span className="text-right">Biệt thự, Shophouse, Dinh thự đảo</span>
              </div>
              <div className="flex justify-between border-b border-amber-200 pb-2">
                <span className="text-slate-500 font-normal">• Pháp lý:</span>
                <span className="text-right text-emerald-700">Sổ hồng lâu dài từng căn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-normal">• Bàn giao:</span>
                <span className="text-right">Quý IV / 2026 (Hoàn thiện cao cấp)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 4. VIDEO CLIP GIỚI THIỆU OFFICIAL (16:9) ════════════════ */}
      <section id="video-gioi-thieu" className="py-16 bg-[#42040C] text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              THƯỚC PHIM TOÀN CẢNH 3D FLYCAM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              VIDEO GIỚI THIỆU DỰ ÁN OFFICIAL
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Trải nghiệm không gian sống thượng lưu, hệ sinh thái hồ cảnh quan 16ha và bến du thuyền 5 sao chuẩn phong cách Châu Âu.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/80 bg-slate-950 aspect-video group">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
              alt="Video Poster Dự Án"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center p-6">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80')}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-8 ring-amber-400/30 cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-4 text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                Bấm để xem phim giới thiệu đại đô thị (4:30s)
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 5. HỆ THỐNG TIỆN ÍCH THƯỢNG LƯU (MOSAIC GALLERY) ════════════════ */}
      <section id="tien-ich" className="py-16 bg-[#5C0612] px-4 sm:px-6 lg:px-8 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ĐẶC QUYỀN SỐNG XA HOA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP HOÀNG GIA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hơn 50+ tiện ích đặc quyền phục vụ chuẩn khách sạn 5 sao mang lại trải nghiệm sống vương giả không giới hạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenitiesList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="group relative bg-[#FFFDF9] text-slate-900 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#5C0612] text-amber-300 font-bold text-[10px] uppercase rounded-lg border border-amber-400/40">
                    Tiện Ích #{idx + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2.5 bg-amber-400 text-slate-950 rounded-full shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-black text-base text-[#5C0612] group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed break-words">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 6. BANNER PANORAMA PHÁO HOA RỰC RỠ ════════════════ */}
      <section className="relative py-20 px-4 sm:px-6 text-center overflow-hidden border-y-2 border-amber-400/50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"
            alt="Fireworks Panorama"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#42040C]/90 via-transparent to-[#42040C]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
            VỊ THẾ TÂM ĐIỂM — KHỞI NGUỒN PHỒN VINH
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            NƠI TỎA SÁNG ĐẲNG CẤP THƯỢNG LƯU
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Mỗi ngày sống tại {brandName} là một bản giao hưởng ngọt ngào giữa thiên nhiên sinh thái và sự phồn hoa thịnh vượng.
          </p>
        </div>
      </section>

      {/* ════════════════ 7. VỊ TRÍ & SƠ ĐỒ KẾT NỐI VÙNG ════════════════ */}
      <section id="vi-tri" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#42040C]">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              VỊ TRÍ KIM CƯƠNG HIẾM CÓ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              SƠ ĐỒ VỊ TRÍ & KẾT NỐI VÙNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tọa lạc tại tâm điểm giao thương vàng, kết nối trực tiếp Quốc Lộ 13, Đại lộ Phạm Văn Đồng và tuyến Metro 3B.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Map Image with Red Border */}
            <div className="lg:col-span-7">
              <div 
                className="relative rounded-3xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-slate-900 aspect-[16/10] group cursor-pointer"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
              >
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                  alt="Sơ đồ vị trí kết nối"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="flex items-center justify-between w-full text-white">
                    <span className="text-xs font-bold text-amber-300">{address}</span>
                    <span className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Xem Bản Đồ Quy Hoạch
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linkage Badges */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#5C0612] border border-amber-400/40 space-y-1">
                <span className="font-black text-amber-300 block">5 PHÚT DI CHUYỂN</span>
                <p className="text-slate-300 text-[11px]">Đại lộ Phạm Văn Đồng, Cầu Bình Triệu, Gigamall.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#5C0612] border border-amber-400/40 space-y-1">
                <span className="font-black text-amber-300 block">10 PHÚT DI CHUYỂN</span>
                <p className="text-slate-300 text-[11px]">Sân bay Quốc tế Tân Sơn Nhất, Quận 1, Landmark 81.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#5C0612] border border-amber-400/40 space-y-1">
                <span className="font-black text-amber-300 block">15 PHÚT DI CHUYỂN</span>
                <p className="text-slate-300 text-[11px]">Khu Công Nghệ Cao TP.HCM, Làng Đại Học Quốc Gia.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#5C0612] border border-amber-400/40 space-y-1">
                <span className="font-black text-amber-300 block">25 PHÚT DI CHUYỂN</span>
                <p className="text-slate-300 text-[11px]">Thành phố Mới Bình Dương & Cao tốc Long Thành.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 8. MẶT BẰNG PHÂN KHU & SẢN PHẨM (UX AUTO-SELECT) ════════════════ */}
      <section id="mat-bang" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#5C0612]">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              SƠ ĐỒ PHÂN LÔ 1/500
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              MẶT BẰNG PHÂN KHU & CHI TIẾT SẢN PHẨM
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Chọn từng phân khu dưới đây để xem chi tiết thông số và bản vẽ quy hoạch
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center flex-wrap gap-3">
            {[
              { id: 'tongthe', label: 'TỔNG THỂ ĐẠI ĐÔ THỊ 198HA' },
              { id: 'bietthu', label: 'BIỆT THỰ HOÀNG GIA (250M² - 500M²)' },
              { id: 'shophouse', label: 'SHOPHOUSE PHỐ ĐI BỘ (140M² - 220M²)' },
              { id: 'dinhthu', label: 'DINH THỰ ĐẢO NGỌC (600M² - 1200M²)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveZoneTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  activeZoneTab === tab.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xl scale-105 font-black'
                    : 'bg-[#42040C] text-slate-200 border-amber-500/40 hover:bg-[#8C0E1F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Zone Card */}
          <div className="bg-[#FFFDF9] text-slate-900 border-4 border-[#D4AF37] rounded-3xl p-6 sm:p-10 shadow-2xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black rounded-lg uppercase">
                Bản Vẽ Phân Lô Chi Tiết
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#5C0612]">
                {masterPlanData[activeZoneTab].title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {masterPlanData[activeZoneTab].desc}
              </p>
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-900 font-bold space-y-1">
                <span className="text-[10px] uppercase text-[#5C0612] block">Thông Số Phân Khu:</span>
                <p>{masterPlanData[activeZoneTab].specs}</p>
              </div>

              <div className="pt-2">
                {/* UX Auto-Select */}
                <button
                  type="button"
                  onClick={() => handleSelectProduct(masterPlanData[activeZoneTab].title)}
                  className="px-6 py-3 bg-[#5C0612] hover:bg-[#8C0E1F] text-amber-300 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>NHẬN BÁO GIÁ PHÂN KHU NÀY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/11] relative group cursor-pointer"
              onClick={() => setZoomImage(masterPlanData[activeZoneTab].image)}
            >
              <img
                src={masterPlanData[activeZoneTab].image}
                alt={masterPlanData[activeZoneTab].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="px-4 py-2 bg-slate-950/80 backdrop-blur text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Bấm để phóng to xem sơ đồ 3D</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 9. CHÍNH SÁCH BÁN HÀNG HOÀNG GIA (GOLD LUXURY BANNER) ════════════════ */}
      <section id="chinh-sach" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 border-t-2 border-amber-400/50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Mansion Backdrop"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
              CHÍNH SÁCH BÁN HÀNG NGOẠI GIAO ĐỢT 1
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ƯU ĐÃI ĐẶC QUYỀN HOÀNG GIA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Giải pháp tài chính linh hoạt giúp chủ nhân tối ưu dòng tiền đầu tư sinh lời
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-[#5C0612]/90 border border-amber-400/60 space-y-2 shadow-2xl">
              <span className="text-2xl font-black text-amber-300 block">15%</span>
              <h4 className="font-bold text-xs text-white uppercase">Chiết Khấu Thanh Toán Sớm</h4>
              <p className="text-[11px] text-slate-200">Trừ trực tiếp vào giá trị hợp đồng khi thanh toán 95%.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#5C0612]/90 border border-amber-400/60 space-y-2 shadow-2xl">
              <span className="text-2xl font-black text-amber-300 block">36 Tháng</span>
              <h4 className="font-bold text-xs text-white uppercase">Lãi Suất 0% Ngân Hàng</h4>
              <p className="text-[11px] text-slate-200">Ân hạn nợ gốc và miễn phí trả nợ trước hạn trong 3 năm.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#5C0612]/90 border border-amber-400/60 space-y-2 shadow-2xl">
              <span className="text-2xl font-black text-amber-300 block">200 Triệu</span>
              <h4 className="font-bold text-xs text-white uppercase">Tặng Kim Cương 1 Carat</h4>
              <p className="text-[11px] text-slate-200">Dành tặng cho 10 khách hàng đặt cọc biệt thự đầu tiên.</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#5C0612]/90 border border-amber-400/60 space-y-2 shadow-2xl">
              <span className="text-2xl font-black text-amber-300 block">5 Năm</span>
              <h4 className="font-bold text-xs text-white uppercase">Miễn Phí Quản Lý Savills</h4>
              <p className="text-[11px] text-slate-200">Trải nghiệm dịch vụ quản gia và an ninh 24/7 tiêu chuẩn quốc tế.</p>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="#hero-lead-box"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>TẢI BẢNG TÍNH LÃI VAY & TIẾN ĐỘ THANH TOÁN (PDF)</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 10. TIN TỨC & SỰ KIỆN NỔI BẬT ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#42040C]">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              DÒNG CHẢY SỰ KIỆN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              TIN TỨC & TIẾN ĐỘ DỰ ÁN
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {projectNews.map((news, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(news.image)}
                className="bg-[#FFFDF9] text-slate-900 rounded-3xl overflow-hidden shadow-xl border border-amber-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 text-white font-bold text-[9px] rounded-lg">
                    {news.date}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-xs text-[#5C0612] group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {news.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 11. FORM ĐĂNG KÝ VÒM VÀNG HOÀNG GIA & CỔNG KHẢI HOÀN MÔN ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#5C0612] border-t border-amber-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Golden Arch Form */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#8C0E1F] to-[#5C0612] border-4 border-amber-400 rounded-t-[100px] rounded-b-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
              <Crown className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                ĐẶC QUYỀN ĐÓN TIẾP VIP
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                ĐĂNG KÝ THAM QUAN BẰNG XE LIMOUSINE / DU THUYỀN
              </h3>
            </div>

            {isVipSubmitted ? (
              <div className="bg-emerald-950/80 border border-emerald-400 p-6 rounded-2xl text-center space-y-2 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-xs text-emerald-300 uppercase">ĐÃ XÁC NHẬN LỊCH ĐÓN TIẾP!</h4>
                <p className="text-[11px] text-slate-200">
                  Phòng lễ tân VIP sẽ liên hệ qua số <strong>{vipPhone}</strong> để xếp xe đón Quý Khách.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVipSubmit} className="space-y-3 text-xs text-left">
                <input
                  type="text"
                  required
                  value={vipName}
                  onChange={(e) => setVipName(e.target.value)}
                  placeholder="Họ và tên của Quý Khách *"
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-amber-300 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={vipPhone}
                  onChange={(e) => setVipPhone(e.target.value)}
                  placeholder="Số điện thoại nhận xác nhận (Zalo) *"
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-amber-300 outline-none"
                />
                <input
                  type="email"
                  value={vipEmail}
                  onChange={(e) => setVipEmail(e.target.value)}
                  placeholder="Email nhận thư mời điện tử"
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-500 border border-amber-300 outline-none"
                />
                <select
                  value={vipProduct}
                  onChange={(e) => setVipProduct(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-black border border-amber-300 outline-none"
                >
                  <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)">Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Song Lập Vườn (200m² - 280m²)">Biệt Thự Song Lập Vườn (200m² - 280m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Shophouse Phố Đi Bộ Châu Âu (140m² - 220m²)">Shophouse Phố Đi Bộ Châu Âu (140m² - 220m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)">Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer mt-2"
                >
                  XÁC NHẬN ĐĂNG KÝ VIP
                </button>
              </form>
            )}
          </div>

          {/* Right: Royal Arch Landmark Photo */}
          <div className="lg:col-span-7">
            <div 
              className="relative rounded-3xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-slate-900 aspect-[4/3] group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
                alt="Cổng Chào Khải Hoàn Môn Hoàng Gia"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-left">
                  <span className="text-xs font-bold text-amber-300 block">CỔNG CHÀO KHẢI HOÀN MÔN BIỂU TƯỢNG</span>
                  <span className="text-sm font-black uppercase">Đỉnh Cao Kiến Trúc Cổ Điển Châu Âu</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 12. FOOTER ════════════════ */}
      <footer className="bg-[#2E0208] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-amber-500/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-black text-sm text-amber-300 uppercase tracking-wider">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Trực thuộc {companyGroup}. Đại đô thị sinh thái bên sông biểu tượng thịnh vượng hàng đầu Việt Nam.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-300 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG & NHÀ MẪU HOÀNG GIA</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hotline VIP 24/7: <strong>{hotline}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: {email}</span>
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-400">
            <h4 className="font-bold text-amber-300 text-xs uppercase mb-1">CHỨNG NHẬN PHÁP LÝ</h4>
            <p>✓ Phê duyệt quy hoạch 1/500 & Quyết định giao đất hoàn thiện.</p>
            <p>✓ Sở Tài Nguyên Môi Trường cấp sổ hồng sở hữu lâu dài.</p>
            <p>✓ Ngân hàng Vietcombank & MBBank tài trợ vốn và bảo lãnh.</p>
            <p className="text-[10px] text-slate-500 pt-2">© 2026 {brandName}. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ════════════════ 13. LIGHTBOX ZOOM MODAL ════════════════ */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomImage}
              alt="Phóng to chi tiết"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* ════════════════ 14. FLOATING CONTACT BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 animate-bounce text-amber-300" />
          <span className="hidden sm:inline">Hotline VIP: {hotline}</span>
          <span className="sm:hidden">Gọi VIP</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo VIP</span>
        </a>
      </div>

    </div>
  );
}
