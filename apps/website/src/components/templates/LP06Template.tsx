'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../utils/cmsSectionHelper';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Flame,
  Compass, Plane, ChevronDown
} from 'lucide-react';

export interface LP06TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
  pageContent?: any;
}

export default function LP06Template({
  template,
  company,
  projects,
  pageContent
}: LP06TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  // Brand & Company Info Fallback from CMS
  const brandName = company?.name || 'STELLA MEGA CITY';
  const companyGroup = 'TẬP ĐOÀN KITA GROUP';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Đường Đặng Văn Dầy, P. Bình Thủy, Q. Bình Thủy, TP. Cần Thơ';

  // Hero Lead Form State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroProductType, setHeroProductType] = useState('Đất Nền Nhà Phố Liền Kề (100m² - 120m²)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Bottom Lead Form State
  const [bottomName, setBottomName] = useState('');
  const [bottomPhone, setBottomPhone] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');
  const [bottomProduct, setBottomProduct] = useState('Đất Nền Nhà Phố Liền Kề (100m² - 120m²)');
  const [isBottomSubmitted, setIsBottomSubmitted] = useState(false);

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX Auto-Select Function
  const handleSelectProduct = (productTitle: string) => {
    setHeroProductType(productTitle);
    setBottomProduct(productTitle);
    const element = document.getElementById('hero-lead-form-box');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-product-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-2', 'ring-amber-400', 'border-amber-400');
          setTimeout(() => selectEl.classList.remove('ring-2', 'ring-amber-400', 'border-amber-400'), 2000);
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

  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomPhone.trim()) return;
    setIsBottomSubmitted(true);
    setTimeout(() => setIsBottomSubmitted(false), 6000);
  };

  // 6 Satellite Amenities around the central wheel
  const satelliteList = [
    { num: '01', title: 'Đền Thờ Vua Hùng', desc: 'Biểu tượng văn hóa tâm linh 4ha lớn nhất ĐBSCL', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
    { num: '02', title: 'Đại Lộ Ánh Sáng', desc: 'Tuyến phố đi bộ sầm uất & nhạc nước nghệ thuật', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { num: '03', title: 'Trung Tâm Hành Chính', desc: 'Tọa lạc ngay trong lòng dự án, an ninh tuyệt đối', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { num: '04', title: 'Công Viên Zen Garden', desc: 'Không gian thiền tịnh phong cách Nhật Bản', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
    { num: '05', title: 'Trường Học Liên Cấp', desc: 'Hệ thống giáo dục chuẩn quốc tế Cambridge', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
    { num: '06', title: 'TTTM & Khách Sạn 5 Sao', desc: 'Tổ hợp thương mại khối đế sầm uất bậc nhất', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#061426] text-slate-100 font-sans selection:bg-[#E5A824] selection:text-slate-950">
      
      {/* ════════════════ 1. TOP HEADER (BRAND & HOTLINE) ════════════════ */}
      <header className="bg-[#030B17]/95 border-b border-amber-500/20 px-4 sm:px-8 py-2.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xs">
              ★
            </div>
            <span className="font-black text-sm text-amber-400 uppercase tracking-wider">
              {brandName}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a href="#tong-quan" className="hover:text-amber-400 transition">Tổng Quan</a>
            <a href="#anh-du-an" className="hover:text-amber-400 transition">Ảnh Dự Án</a>
            <a href="#video-du-an" className="hover:text-amber-400 transition">Video</a>
            <a href="#quy-mo" className="hover:text-amber-400 transition">Quy Mô</a>
            <a href="#ly-do" className="hover:text-amber-400 transition">Lý Do Đầu Tư</a>
            <a href="#vi-tri" className="hover:text-amber-400 transition">Vị Trí</a>
          </nav>

          {/* Contact Fast */}
          <div className="flex items-center gap-3">
            <a href={`tel:${hotline}`} className="flex items-center gap-1 font-bold text-amber-400 hover:text-white transition">
              <Phone className="w-3.5 h-3.5" />
              <span>{hotline}</span>
            </a>
            <a
              href="#hero-lead-form-box"
              className="px-3 py-1 bg-[#D92D20] hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-wider"
            >
              Đăng Ký
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & FLOATING RED LEAD BANNER ════════════════ */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-500/30 overflow-hidden bg-gradient-to-b from-[#030B17] via-[#061426] to-[#081B33]">
        
        {/* Background Urban Aerial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"
            alt="Stella Mega City Panoramic Night"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030B17]/80 via-[#061426]/70 to-[#061426]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 text-center">
          
          {/* Main Title */}
          <div className="space-y-1">
            <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              ĐẠI ĐÔ THỊ TRUNG TÂM THỦ PHỦ MIỀN TÂY
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase drop-shadow-md">
              STELLA MEGA CITY
            </h1>
          </div>

          {/* Floating Red Lead Gift Box (Lưới Lọc Phễu Chuyển Đổi Số 1) */}
          <div id="hero-lead-form-box" className="bg-[#D92D20] border-2 border-amber-300 shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Gift Visual & Special Promo */}
              <div className="md:col-span-5 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-red-400/50 pb-4 md:pb-0 md:pr-4">
                <div className="w-16 h-16 bg-white/10 border border-white/30 flex items-center justify-center mx-auto md:mx-0">
                  <Gift className="w-8 h-8 text-amber-300 animate-bounce" />
                </div>
                <h3 className="text-base font-black text-white uppercase leading-tight">
                  TRI ÂN KHÁCH HÀNG — CƠ HỘI ĐẦU TƯ F0
                </h3>
                <p className="text-[11px] text-amber-200 leading-relaxed">
                  ✓ Chiết khấu trực tiếp <strong>10%</strong> giá trị hợp đồng.
                  <br />✓ Tặng ngay <strong>1 cây vàng 9999</strong> khi đặt cọc.
                  <br />✓ Ân hạn nợ gốc & lãi suất 0% trong 12 tháng.
                </p>
              </div>

              {/* Right Column: Lead Form Input */}
              <div className="md:col-span-7">
                <div className="text-center mb-3">
                  <h4 className="text-sm font-black text-amber-300 uppercase">
                    ĐĂNG KÝ NHẬN BÁO GIÁ ĐỢT 1
                  </h4>
                  <p className="text-[10px] text-white">Ưu đãi trực tiếp từ Chủ đầu tư KITA Group</p>
                </div>

                {isHeroSubmitted ? (
                  <div className="bg-white text-slate-900 p-4 text-center space-y-1.5 border-2 border-amber-400">
                    <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                    <h5 className="font-bold text-xs text-[#061426]">ĐÃ TIẾP NHẬN YÊU CẦU!</h5>
                    <p className="text-[11px] text-slate-600">
                      Chuyên viên sẽ liên hệ lại qua số <strong>{heroPhone}</strong> và gửi file PDF qua Zalo trong 3 phút.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-2.5 text-xs">
                    <input
                      type="text"
                      required
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Họ và tên Quý Khách *"
                      className="w-full px-3 py-2 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                    />

                    <input
                      type="tel"
                      required
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                      className="w-full px-3 py-2 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                    />

                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="Email nhận hồ sơ pháp lý"
                      className="w-full px-3 py-2 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
                    />

                    <select
                      id="hero-product-select"
                      value={heroProductType}
                      onChange={(e) => setHeroProductType(e.target.value)}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                    >
                      <option className="text-slate-900 bg-white font-medium" value="Đất Nền Nhà Phố Liền Kề (100m² - 120m²)">Đất Nền Nhà Phố Liền Kề (100m² - 120m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)">Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Vườn Ven Hồ (200m² - 350m²)">Biệt Thự Vườn Ven Hồ (200m² - 350m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Dinh Thự Đảo Ngọc (500m² - 800m²)">Dinh Thự Đảo Ngọc (500m² - 800m²)</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                    >
                      ĐĂNG KÝ NHẬN BÁO GIÁ
                    </button>

                    <div className="flex items-center justify-center gap-3 pt-1 text-white text-xs">
                      <a href={`https://zalo.me/${zalo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-amber-300">
                        <MessageCircle className="w-3.5 h-3.5" /> Zalo
                      </a>
                      <span>•</span>
                      <a href={`tel:${hotline}`} className="flex items-center gap-1 hover:text-amber-300">
                        <Phone className="w-3.5 h-3.5" /> Hotline: {hotline}
                      </a>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 3. 3 CỘT GIÁ TRỊ CỐT LÕI (WHITE & HIGHLIGHT YELLOW CARD) ════════════════ */}
      <section id="tong-quan" className="py-14 px-4 sm:px-6 lg:px-8 bg-[#040D1A] border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: White Card */}
          <div className="bg-white text-slate-900 border-2 border-slate-300 p-6 space-y-3 shadow-md text-left">
            <div className="w-10 h-10 bg-[#061426] text-amber-400 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[#061426] uppercase border-b border-slate-200 pb-2">
              ĐẠI ĐÔ THỊ SÂN BAY ĐẲNG CẤP
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium">
              <li>• Tọa lạc tại trung tâm quận Bình Thủy, TP. Cần Thơ.</li>
              <li>• Chỉ cách sân bay Cần Thơ 3 phút di chuyển.</li>
              <li>• Liền kề Trung tâm hành chính quận và Công an quận.</li>
              <li>• Quy mô 150ha đẳng cấp bậc nhất miền Tây.</li>
            </ul>
          </div>

          {/* Card 2: Highlight Yellow/Gold Card */}
          <div className="bg-[#FFF8E6] text-slate-900 border-2 border-[#E5A824] p-6 space-y-3 shadow-lg text-left relative">
            <div className="absolute -top-3 right-3 px-2 py-0.5 bg-[#D92D20] text-white text-[10px] font-black uppercase">
              TIÊU CHUẨN A+
            </div>
            <div className="w-10 h-10 bg-[#E5A824] text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[#061426] uppercase border-b border-amber-300 pb-2">
              TIỆN ÍCH ĐẲNG CẤP QUỐC TẾ
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-800 leading-relaxed font-medium">
              <li>• Hơn 10.000 cây xanh rợp bóng mát quanh năm.</li>
              <li>• Đền thờ Vua Hùng biểu tượng tâm linh 4ha.</li>
              <li>• Đại lộ ánh sáng, nhạc nước nghệ thuật đẳng cấp.</li>
              <li>• Hệ thống trường học quốc tế, bệnh viện 5 sao.</li>
            </ul>
          </div>

          {/* Card 3: White Card */}
          <div className="bg-white text-slate-900 border-2 border-slate-300 p-6 space-y-3 shadow-md text-left">
            <div className="w-10 h-10 bg-[#061426] text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black text-[#061426] uppercase border-b border-slate-200 pb-2">
              PHÁP LÝ MINH BẠCH SỔ ĐỎ TRAO TAY
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium">
              <li>• 100% Sổ đỏ từng nền trao tay ngay khi thanh toán.</li>
              <li>• Hạ tầng hoàn thiện 100% điện âm, nước máy.</li>
              <li>• Ngân hàng VPBank tài trợ 70% hạn mức.</li>
              <li>• Chính sách thanh toán linh hoạt chỉ từ 1%/tháng.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ════════════════ 4. ẢNH DỰ ÁN — VÒNG TRÒN 6 TIỆN ÍCH VỆ TINH ════════════════ */}
      <section id="anh-du-an" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#061426] border-b border-amber-500/20 text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl font-black text-amber-400 uppercase">
              ẢNH DỰ ÁN
            </h2>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              STELLA MEGA CITY — HỆ THỐNG TIỆN ÍCH 6 CÁNH VỆ TINH
            </p>
          </div>

          {/* Central Circular Infographic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {satelliteList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="bg-[#030B17] border border-slate-700 hover:border-amber-400 transition-all p-3 space-y-3 cursor-pointer group shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#D92D20] text-white font-bold text-[10px]">
                    {item.num}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-amber-300 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 border border-amber-400/40">
                    <ZoomIn className="w-3 h-3" /> Phóng to
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">
                    {item.num}. {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 5. 4 KHỐI CAM KẾT ĐỘT PHÁ (2x2 GRID & CTA BUTTON) ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040D1A] border-b border-amber-500/20 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            
            {/* Box 1: White */}
            <div className="bg-white text-slate-900 border border-slate-300 p-4 flex gap-4 items-center">
              <div 
                className="w-28 h-20 bg-slate-900 shrink-0 overflow-hidden cursor-pointer border border-slate-200"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80')}
              >
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80" alt="Chủ đầu tư" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs text-[#061426] uppercase">CHỦ ĐẦU TƯ UY TÍN</h4>
                <p className="text-[11px] text-slate-600 leading-tight">Tập đoàn KITA Group tiềm lực tài chính vững mạnh hàng đầu Việt Nam.</p>
              </div>
            </div>

            {/* Box 2: Yellow Highlight */}
            <div className="bg-[#FFF8E6] text-slate-900 border-2 border-[#E5A824] p-4 flex gap-4 items-center">
              <div 
                className="w-28 h-20 bg-slate-900 shrink-0 overflow-hidden cursor-pointer border border-amber-300"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80')}
              >
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" alt="Pháp lý sổ đỏ" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs text-[#D92D20] uppercase">PHÁP LÝ SỔ ĐỎ 100%</h4>
                <p className="text-[11px] text-slate-800 leading-tight">Đã có sổ đỏ từng nền, sang tên công chứng ngay khi thanh toán.</p>
              </div>
            </div>

            {/* Box 3: White */}
            <div className="bg-white text-slate-900 border border-slate-300 p-4 flex gap-4 items-center">
              <div 
                className="w-28 h-20 bg-slate-900 shrink-0 overflow-hidden cursor-pointer border border-slate-200"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80')}
              >
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" alt="Thanh toán" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs text-[#061426] uppercase">THANH TOÁN LINH HOẠT</h4>
                <p className="text-[11px] text-slate-600 leading-tight">Tiến độ thanh toán dài hạn, ngân hàng hỗ trợ vay 70% ân hạn gốc lãi.</p>
              </div>
            </div>

            {/* Box 4: White */}
            <div className="bg-white text-slate-900 border border-slate-300 p-4 flex gap-4 items-center">
              <div 
                className="w-28 h-20 bg-slate-900 shrink-0 overflow-hidden cursor-pointer border border-slate-200"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')}
              >
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" alt="Hạ tầng" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs text-[#061426] uppercase">HẠ TẦNG HOÀN THIỆN 100%</h4>
                <p className="text-[11px] text-slate-600 leading-tight">Điện âm, nước máy, vỉa hè lát đá hoa cương và cây xanh rợp mát.</p>
              </div>
            </div>

          </div>

          {/* Yellow Action Pill Button */}
          <div>
            <a
              href="#hero-lead-form-box"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
            >
              <span>ĐĂNG KÝ XEM THỰC ĐỊA DỰ ÁN</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 6. VIDEO THÔNG TIN DỰ ÁN ════════════════ */}
      <section id="video-du-an" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#061426] border-b border-amber-500/20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase">
              VIDEO THÔNG TIN DỰ ÁN
            </h2>
            <p className="text-xs text-slate-300">Phóng sự trải nghiệm thực tế đại đô thị Stella Mega City Cần Thơ</p>
          </div>

          <div className="relative border-4 border-white bg-slate-950 aspect-video group overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
              alt="Video Poster Stella Mega City"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80')}
                className="w-16 h-16 bg-[#D92D20] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider bg-black/80 px-3 py-1 border border-white/20">
                Xem Video Giới Thiệu Dự Án Official
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 7. QUY MÔ DỰ ÁN (SPLIT LAYOUT) ════════════════ */}
      <section id="quy-mo" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040D1A] border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Specs Box */}
          <div className="lg:col-span-5 bg-[#061426] border-2 border-amber-400/40 p-6 space-y-3 text-left">
            <h2 className="text-xl font-black text-amber-400 uppercase border-b border-amber-500/30 pb-2">
              QUY MÔ DỰ ÁN
            </h2>

            <div className="space-y-2 text-xs text-slate-200 leading-relaxed font-medium">
              <p>• <strong>Tên dự án:</strong> Stella Mega City Cần Thơ</p>
              <p>• <strong>Chủ đầu tư:</strong> {companyGroup}</p>
              <p>• <strong>Vị trí:</strong> {address}</p>
              <p>• <strong>Tổng diện tích:</strong> 150 hécta</p>
              <p>• <strong>Tổng vốn đầu tư:</strong> Hơn 8.000 tỷ đồng</p>
              <p>• <strong>Loại hình:</strong> Đất nền, Shophouse, Biệt thự</p>
              <p>• <strong>Pháp lý:</strong> Sổ đỏ từng nền lâu dài vĩnh viễn</p>
            </div>
          </div>

          {/* Right Column: Boulevard Photo */}
          <div className="lg:col-span-7">
            <div 
              className="border-2 border-slate-600 aspect-[16/10] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Phối cảnh Shophouse Stella Mega City"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 8. LÝ DO ĐẦU TƯ DỰ ÁN ════════════════ */}
      <section id="ly-do" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#061426] border-b border-amber-500/20 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase">
              LÝ DO ĐẦU TƯ DỰ ÁN
            </h2>
            <p className="text-xs text-slate-300">5 lý do bảo chứng tiềm năng sinh lời vượt trội</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            
            <div className="bg-[#030B17] border border-amber-400/40 p-4 space-y-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                01
              </div>
              <h4 className="font-bold text-xs text-white uppercase">Vị Trí Kim Cương</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Trung tâm hành chính quận Bình Thủy, liền kề Sân bay Quốc Tế Cần Thơ.</p>
            </div>

            <div className="bg-[#030B17] border border-amber-400/40 p-4 space-y-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                02
              </div>
              <h4 className="font-bold text-xs text-white uppercase">Đô Thị Sân Bay Đẳng Cấp</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Hưởng lợi trực tiếp từ lượng khách du lịch và chuyên gia hàng không.</p>
            </div>

            <div className="bg-[#030B17] border border-amber-400/40 p-4 space-y-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                03
              </div>
              <h4 className="font-bold text-xs text-white uppercase">Pháp Lý Sổ Đỏ 100%</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Sở hữu lâu dài vĩnh viễn, công chứng sang tên ngay trong ngày.</p>
            </div>

            <div className="bg-[#030B17] border border-amber-400/40 p-4 space-y-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                04
              </div>
              <h4 className="font-bold text-xs text-white uppercase">Đón Sóng Cao Tốc</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Hưởng lợi trực tiếp từ tuyến cao tốc Trung Lương - Mỹ Thuận - Cần Thơ.</p>
            </div>

            <div className="bg-[#030B17] border border-amber-400/40 p-4 space-y-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                05
              </div>
              <h4 className="font-bold text-xs text-white uppercase">Thanh Khoản Sinh Lời</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Tiềm năng gia tăng giá trị kỳ vọng đạt từ 25% – 35%/năm.</p>
            </div>

            <div className="bg-[#D92D20] p-4 flex flex-col justify-between text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-300 uppercase">ƯU ĐÃI THÁNG</span>
                <h4 className="font-black text-xs text-white uppercase">TẶNG 1 CÂY VÀNG 9999</h4>
                <p className="text-[11px] text-slate-100">Áp dụng cho 20 khách hàng đầu tiên đặt cọc trong tuần.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectProduct('Đất Nền Nhà Phố Liền Kề (100m² - 120m²)')}
                className="mt-2 py-2 bg-white text-[#D92D20] font-black text-[11px] uppercase tracking-wider hover:bg-amber-300 hover:text-slate-950 transition cursor-pointer"
              >
                NHẬN ƯU ĐÃI NGAY
              </button>
            </div>

          </div>

          <div>
            <a
              href="#hero-lead-form-box"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
            >
              <span>NHẬN BÁO CÁO PHÂN TÍCH ĐẦU TƯ</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 9. VỊ TRÍ DỰ ÁN ════════════════ */}
      <section id="vi-tri" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040D1A] border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Map Graphic */}
          <div className="lg:col-span-7">
            <div 
              className="border-2 border-slate-600 aspect-[16/10] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
                alt="Bản đồ vị trí Stella Mega City"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Right: Location Bullet Points */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h2 className="text-2xl font-black text-amber-400 uppercase">
              VỊ TRÍ DỰ ÁN
            </h2>
            
            <div className="space-y-2 text-xs text-slate-200 leading-relaxed font-medium">
              <p className="p-2.5 bg-[#061426] border border-slate-700">• Tọa lạc mặt tiền đại lộ Đặng Văn Dầy & Võ Văn Kiệt.</p>
              <p className="p-2.5 bg-[#061426] border border-slate-700">• <strong>3 Phút:</strong> Sân bay Quốc Tế Cần Thơ.</p>
              <p className="p-2.5 bg-[#061426] border border-slate-700">• <strong>5 Phút:</strong> Trung tâm Hành chính quận Bình Thủy.</p>
              <p className="p-2.5 bg-[#061426] border border-slate-700">• <strong>10 Phút:</strong> Bến Ninh Kiều & Chợ nổi Cái Răng.</p>
              <p className="p-2.5 bg-[#061426] border border-slate-700">• <strong>15 Phút:</strong> Cầu Cần Thơ và Tuyến cao tốc liên vùng.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 10. FORM ĐĂNG KÝ NHẬN BẢNG GIÁ CUỐI TRANG ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#061426] border-t-2 border-amber-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Photo */}
          <div className="lg:col-span-6">
            <div 
              className="border-2 border-slate-600 aspect-[16/11] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
                alt="Toàn cảnh Stella Mega City"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Right Column: White Lead Form */}
          <div className="lg:col-span-6 bg-white text-slate-900 border-2 border-amber-400 p-6 sm:p-8 text-left shadow-2xl">
            <div className="text-center mb-4 pb-2 border-b border-slate-200">
              <span className="text-[11px] font-black text-[#D92D20] uppercase tracking-widest block mb-0.5">
                LIÊN HỆ PHÒNG KINH DOANH DỰ ÁN
              </span>
              <h3 className="text-base font-black text-[#061426] uppercase">
                ĐĂNG KÝ TƯ VẤN & NHẬN BẢNG GIÁ ĐỢT 1
              </h3>
            </div>

            {isBottomSubmitted ? (
              <div className="bg-[#FFF8E6] text-slate-900 p-5 text-center space-y-1.5 border border-amber-400">
                <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-xs text-[#061426]">GỬI THÔNG TIN THÀNH CÔNG!</h4>
                <p className="text-[11px] text-slate-600">
                  Chuyên viên sẽ liên hệ lại qua số <strong>{bottomPhone}</strong> trong vòng 3 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBottomSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={bottomName}
                  onChange={(e) => setBottomName(e.target.value)}
                  placeholder="Họ và tên Quý Khách *"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-bold border border-slate-300 outline-none"
                />

                <input
                  type="tel"
                  required
                  value={bottomPhone}
                  onChange={(e) => setBottomPhone(e.target.value)}
                  placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-black border border-slate-300 outline-none"
                />

                <input
                  type="email"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  placeholder="Email nhận tài liệu"
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-medium border border-slate-300 outline-none"
                />

                <select
                  value={bottomProduct}
                  onChange={(e) => setBottomProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 font-black border border-slate-300 outline-none"
                >
                  <option className="text-slate-900 bg-white font-medium" value="Đất Nền Nhà Phố Liền Kề (100m² - 120m²)">Đất Nền Nhà Phố Liền Kề (100m² - 120m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)">Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Biệt Thự Vườn Ven Hồ (200m² - 350m²)">Biệt Thự Vườn Ven Hồ (200m² - 350m²)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Dinh Thự Đảo Ngọc (500m² - 800m²)">Dinh Thự Đảo Ngọc (500m² - 800m²)</option>
                </select>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer mt-1"
                >
                  GỬI YÊU CẦU NGAY
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ════════════════ 11. FOOTER ════════════════ */}
      <footer className="bg-[#020710] text-white py-10 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800 text-center space-y-3">
        <div className="max-w-4xl mx-auto space-y-2">
          <h4 className="font-black text-amber-400 uppercase text-xs">
            VĂN PHÒNG BÁN HÀNG DỰ ÁN STELLA MEGA CITY
          </h4>
          <p className="text-slate-400 text-[11px]">
            Địa chỉ: {address}
          </p>
          <p className="text-slate-300 text-[11px]">
            Hotline VIP 24/7: <strong className="text-amber-400">{hotline}</strong> | Email: {email}
          </p>
          <p className="text-slate-500 text-[10px] pt-2">
            © 2026 {brandName} — {companyGroup}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ════════════════ 12. LIGHTBOX ZOOM MODAL ════════════════ */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-amber-400 transition"
              title="Đóng (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomImage}
              alt="Phóng to chi tiết"
              className="max-w-full max-h-[85vh] object-contain border border-amber-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* ════════════════ 13. FLOATING CONTACT BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2 bg-[#D92D20] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xl transition"
        >
          <Phone className="w-3.5 h-3.5 animate-bounce text-amber-300" />
          <span className="hidden sm:inline">Hotline: {hotline}</span>
          <span className="sm:hidden">Gọi Ngay</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xl transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat Zalo</span>
        </a>
      </div>

    </div>
  );
}
