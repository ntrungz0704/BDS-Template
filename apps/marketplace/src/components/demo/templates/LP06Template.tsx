'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Flame,
  Compass, Plane
} from 'lucide-react';

export interface LP06TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP06Template({
  template,
  company,
  projects,
}: LP06TemplateProps) {
  // Brand & Company Info Fallback from CMS
  const brandName = company?.name || 'STELLA MEGA CITY CẦN THƠ';
  const companyGroup = 'TẬP ĐOÀN KITA GROUP VIỆT NAM';
  const hotline = company?.phone || '0901.339.889';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'sales@stellamegacity.vn';
  const address = company?.address || 'Đường Đặng Văn Dầy, KĐT Stella Mega City, P. Bình Thủy, Q. Bình Thủy, TP. Cần Thơ';

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
    const element = document.getElementById('hero-lead-box');
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

  // 6 Circular Satellite Amenities
  const satelliteAmenities = [
    { title: 'Đền Thờ Vua Hùng Biểu Tượng', desc: 'Công trình tâm linh văn hóa quy mô 4ha lớn nhất ĐBSCL.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
    { title: 'Đại Lộ Ánh Sáng & Nhạc Nước', desc: 'Quảng trường lễ hội phồn hoa thu hút hàng ngàn du khách.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { title: 'TT Hành Chính Quận Bình Thủy', desc: 'Tọa lạc ngay trong lòng dự án, an ninh tuyệt đối 24/7.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { title: 'Công Viên Zen Garden Nhật Bản', desc: 'Không gian thiền tịnh, hồ cá Koi và đồi cảnh quan thơ mộng.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
    { title: 'Trường Học Quốc Tế Liên Cấp', desc: 'Hệ thống giáo dục chuẩn Cambridge đào tạo thế hệ tinh anh.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
    { title: 'Trung Tâm Thương Mại & Khách Sạn', desc: 'Tổ hợp thương mại khối đế 5 sao quy tụ thương hiệu lớn.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  ];

  // 4 Core Pillars
  const corePillars = [
    {
      title: 'Chủ Đầu Tư',
      desc: 'Tập đoàn KITA Group với tiềm lực tài chính vững mạnh hàng đầu Việt Nam.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    },
    {
      title: 'Pháp Lý Chuẩn',
      desc: '100% Sổ đỏ từng nền trao tay ngay khi hoàn tất nghĩa vụ tài chính.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    },
    {
      title: 'Thanh Toán',
      desc: 'Tiến độ giãn linh hoạt 1% - 2%/tháng, ngân hàng tài trợ 70% ân hạn gốc lãi.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    },
    {
      title: 'Hạ Tầng 100%',
      desc: 'Điện âm, nước máy, vỉa hè lát đá hoa cương và 10.000 cây xanh rợp bóng.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    },
  ];

  // 5 Investment Reasons
  const investmentReasons = [
    { num: '01', title: 'Tọa Độ Kim Cương', desc: 'Trung tâm hành chính quận Bình Thủy & liền kề Sân bay Quốc Tế Cần Thơ.' },
    { num: '02', title: 'Sổ Đỏ Trao Tay 100%', desc: 'Pháp lý minh bạch hoàn chỉnh, sở hữu lâu dài vĩnh viễn từng nền.' },
    { num: '03', title: 'Hạ Tầng Hoàn Thiện', desc: 'Đường nhựa 14m - 44m, vỉa hè đá granite, điện âm nước máy đồng bộ.' },
    { num: '04', title: 'Hưởng Lợi Cao Tốc', desc: 'Đón đầu cao tốc Trung Lương - Mỹ Thuận - Cần Thơ tạo cú hích giá đất.' },
    { num: '05', title: 'Thanh Khoản Vượt Trội', desc: 'Tỷ lệ tăng trưởng lợi nhuận kỳ vọng đạt từ 25% – 35%/năm.' },
  ];

  return (
    <div className="min-h-screen bg-[#071326] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* ════════════════ 1. TOP NAVBAR (SHARP CRISP ARCHITECTURAL LINES) ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#040C1A]/95 backdrop-blur-md text-white border-b border-amber-500/30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black">
              ★
            </div>
            <div>
              <span className="font-black text-sm tracking-wide text-amber-400 uppercase block leading-none">
                {brandName}
              </span>
              <span className="text-[9px] text-slate-300 uppercase tracking-wider block mt-0.5">
                ĐẠI ĐÔ THỊ TRUNG TÂM THỦ PHỦ MIỀN TÂY
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a href="#tong-quan" className="hover:text-amber-400 transition-colors">Tổng Quan</a>
            <a href="#tien-ich" className="hover:text-amber-400 transition-colors">Tiện Ích 6 Cánh</a>
            <a href="#quy-mo" className="hover:text-amber-400 transition-colors">Quy Mô</a>
            <a href="#ly-do" className="hover:text-amber-400 transition-colors">Lý Do Đầu Tư</a>
            <a href="#vi-tri" className="hover:text-amber-400 transition-colors">Vị Trí</a>
            <a href="#video-du-an" className="hover:text-amber-400 transition-colors">Video Dự Án</a>
          </nav>

          {/* Fast Hotline Contact */}
          <div className="flex items-center gap-4">
            <a href={`tel:${hotline}`} className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#hero-lead-box"
              className="px-4 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all"
            >
              Đăng Ký Ngay
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & RED LEAD BOX ════════════════ */}
      <section className="relative min-h-[580px] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden border-b-2 border-amber-500/40">
        {/* Background Panoramic Urban Graphic */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80"
            alt="Stella Mega City Panoramic"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040C1A]/80 via-[#071326]/70 to-[#071326]" />
        </div>

        <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-6">
          
          <div className="space-y-2">
            <span className="inline-block px-4 py-1 bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest">
              ⚡ SỰ KIỆN MỞ BÁN ĐẶC BIỆT ĐỢT 1 — CHIẾT KHẤU 10% ⚡
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              {brandName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Đại đô thị sinh thái thông minh đẳng cấp quốc tế quy mô 150ha — Trái tim phồn vinh của thành phố Cần Thơ.
            </p>
          </div>

          {/* Center Red Lead Funnel Box (Lưới Lọc Phễu Chuyển Đổi Số 1) */}
          <div id="hero-lead-box" className="bg-[#DC2626] border-2 border-amber-400 p-6 sm:p-8 text-left max-w-2xl mx-auto shadow-2xl">
            <div className="text-center mb-4 pb-3 border-b border-red-400/50">
              <span className="text-[11px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                TRI ÂN KHÁCH HÀNG — CƠ HỘI ĐẦU TƯ F0
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase">
                NHẬN BẢNG GIÁ & CHÍNH SÁCH CHIẾT KHẤU TRỰC TIẾP
              </h3>
            </div>

            {isHeroSubmitted ? (
              <div className="bg-white text-slate-900 p-5 text-center space-y-2 animate-fadeIn border-2 border-amber-400">
                <Check className="w-8 h-8 text-emerald-600 mx-auto stroke-[3]" />
                <h4 className="font-bold text-sm text-[#040C1A]">ĐÃ GỬI YÊU CẦU THÀNH CÔNG!</h4>
                <p className="text-xs text-slate-600">
                  Chuyên viên tư vấn KITA Group sẽ liên hệ lại qua số <strong>{heroPhone}</strong> và gửi file PDF qua Zalo trong 3 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="Họ và tên Quý Khách *"
                    className="px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={heroPhone}
                    onChange={(e) => setHeroPhone(e.target.value)}
                    placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                    className="px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    placeholder="Email nhận hồ sơ pháp lý"
                    className="px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
                  />
                  <select
                    id="hero-product-select"
                    value={heroProductType}
                    onChange={(e) => setHeroProductType(e.target.value)}
                    className="px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                  >
                    <option value="Đất Nền Nhà Phố Liền Kề (100m² - 120m²)">Đất Nền Nhà Phố Liền Kề (100m² - 120m²)</option>
                    <option value="Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)">Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)</option>
                    <option value="Biệt Thự Vườn Ven Hồ (200m² - 350m²)">Biệt Thự Vườn Ven Hồ (200m² - 350m²)</option>
                    <option value="Dinh Thự Đảo Ngọc (500m² - 800m²)">Dinh Thự Đảo Ngọc (500m² - 800m²)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer mt-1"
                >
                  ĐĂNG KÝ NHẬN BÁO GIÁ NGAY
                </button>

                <div className="flex items-center justify-center gap-3 pt-2 text-white text-xs">
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
      </section>

      {/* ════════════════ 3. 3 CỘT GIÁ TRỊ CỐT LÕI (3 VALUE CARDS) ════════════════ */}
      <section id="tong-quan" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040C1A] border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ĐẲNG CẤP ĐÔ THỊ SÂN BAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
              3 GIÁ TRỊ VÀNG TẠO NÊN VỊ THẾ ĐỘC TÔN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="bg-[#071326] border-2 border-amber-400/60 p-6 space-y-3">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-amber-300 uppercase">
                Đại Đô Thị Sân Bay Đẳng Cấp
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• Quy mô 150ha tọa lạc tại trung tâm quận Bình Thủy.</li>
                <li>• Chỉ 3 phút di chuyển tới Sân bay Quốc Tế Cần Thơ.</li>
                <li>• Ôm trọn trung tâm hành chính quận và công an quận.</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-[#071326] border-2 border-amber-400/60 p-6 space-y-3">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-amber-300 uppercase">
                Tiện Ích Đẳng Cấp Quốc Tế
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• Hệ sinh thái 10.000 cây xanh rợp bóng mát quanh năm.</li>
                <li>• Đền thờ Vua Hùng biểu tượng tâm linh 4ha.</li>
                <li>• Đại lộ ánh sáng, nhạc nước và phố đi bộ ẩm thực.</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-[#071326] border-2 border-amber-400/60 p-6 space-y-3">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-amber-300 uppercase">
                Pháp Lý Minh Bạch 100%
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>• Sổ đỏ từng nền trao tay ngay khi hoàn tất hợp đồng.</li>
                <li>• Đã hoàn thiện 100% hạ tầng điện âm, nước máy.</li>
                <li>• Ngân hàng VPBank bảo lãnh và cho vay 70%.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 4. ẢNH DỰ ÁN (VÒNG TRÒN VỆ TINH TIỆN ÍCH 6 CÁNH) ════════════════ */}
      <section id="tien-ich" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#071326] border-b border-amber-500/20 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              HỆ SINH THÁI KHÉP KÍN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
              ẢNH DỰ ÁN — TIỆN ÍCH 6 CÁNH VỆ TINH
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Mọi nhu cầu học tập, giải trí, thể thao và chăm sóc sức khỏe của cư dân đều được đáp ứng trọn vẹn chỉ trong vài bước chân.
            </p>
          </div>

          {/* 6 Satellite Amenities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {satelliteAmenities.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="bg-[#040C1A] border-2 border-slate-700 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#DC2626] text-white font-bold text-[10px]">
                    Điểm Nhấn #{idx + 1}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#040C1A]/90 text-amber-300 px-2.5 py-1 text-[10px] font-bold flex items-center gap-1 border border-amber-400/40">
                    <ZoomIn className="w-3 h-3" /> Phóng to
                  </div>
                </div>

                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 5. 4 KHỐI CAM KẾT ĐỘT PHÁ ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040C1A] border-b border-amber-500/20 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              MINH BẠCH & AN TÂM TUYỆT ĐỐI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
              4 BẢO CHỨNG VỮNG CHẮC TẠI STELLA MEGA CITY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {corePillars.map((p, idx) => (
              <div key={idx} className="bg-[#071326] border-2 border-amber-400/50 p-5 space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border border-slate-700">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-base text-amber-400 uppercase">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#hero-lead-box"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
            >
              <span>ĐĂNG KÝ NHẬN VÉ MỜI SỰ KIỆN THỰC ĐỊA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 6. VIDEO THÔNG TIN DỰ ÁN ════════════════ */}
      <section id="video-du-an" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#071326] border-b border-amber-500/20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              TRẢI NGHIỆM THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              VIDEO THÔNG TIN DỰ ÁN OFFICIAL
            </h2>
          </div>

          <div className="relative border-4 border-amber-400 bg-slate-950 aspect-video group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
              alt="Video Poster Stella Mega City"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80')}
                className="w-16 h-16 bg-[#DC2626] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider bg-black/70 px-3 py-1 border border-white/20">
                Xem video phóng sự đại đô thị Stella Mega City
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 7. QUY MÔ DỰ ÁN (SPLIT LAYOUT) ════════════════ */}
      <section id="quy-mo" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040C1A] border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase border-l-4 border-[#DC2626] pl-3">
              QUY MÔ DỰ ÁN
            </h2>

            <div className="space-y-2.5 text-xs text-slate-200">
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Tên dự án:</strong> Stella Mega City Cần Thơ</p>
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Chủ đầu tư:</strong> {companyGroup}</p>
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Tổng diện tích:</strong> 150 hécta (Tổng vốn đầu tư 8.000 tỷ đồng)</p>
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Loại hình:</strong> Đất nền nhà phố liên kế, Shophouse, Biệt thự ven hồ</p>
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Diện tích phân lô:</strong> 100m² – 120m² – 250m² – 500m²</p>
              <p className="p-3 bg-[#071326] border border-slate-700">• <strong>Pháp lý:</strong> Sổ đỏ lâu dài từng nền, xây dựng tự do</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div 
              className="border-2 border-amber-400 aspect-[4/3] bg-slate-900 group cursor-pointer overflow-hidden"
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
      <section id="ly-do" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#071326] border-b border-amber-500/20 text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              LỰA CHỌN CỦA NHÀ ĐẦU TƯ THÔNG THÁI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
              5 LÝ DO NÊN ĐẦU TƯ VÀO STELLA MEGA CITY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {investmentReasons.map((r, idx) => (
              <div key={idx} className="bg-[#040C1A] border-2 border-amber-400/60 p-5 space-y-2">
                <span className="text-2xl font-black text-amber-400 block">{r.num}</span>
                <h4 className="font-bold text-sm text-white uppercase">{r.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{r.desc}</p>
              </div>
            ))}

            {/* CTA in the 6th slot */}
            <div className="bg-[#DC2626] border-2 border-amber-400 p-5 flex flex-col justify-between text-left">
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-300 uppercase">ƯU ĐÃI THÁNG</span>
                <h4 className="font-black text-base text-white uppercase">TẶNG NGAY 1 CÂY VÀNG 9999</h4>
                <p className="text-xs text-slate-100">Áp dụng cho 20 khách hàng đầu tiên đặt cọc trong tuần này.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectProduct('Đất Nền Nhà Phố Liền Kề (100m² - 120m²)')}
                className="mt-3 py-2.5 bg-white text-[#DC2626] font-black text-xs uppercase tracking-wider hover:bg-amber-300 hover:text-slate-950 transition cursor-pointer"
              >
                NHẬN ƯU ĐÃI NGAY
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 9. VỊ TRÍ DỰ ÁN ════════════════ */}
      <section id="vi-tri" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040C1A] border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7">
            <div 
              className="border-4 border-amber-400 aspect-[16/10] bg-slate-900 group cursor-pointer overflow-hidden"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
                alt="Bản đồ vị trí Stella Mega City"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase border-l-4 border-[#DC2626] pl-3">
              VỊ TRÍ DỰ ÁN
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Tọa lạc ngay mặt tiền đại lộ Đặng Văn Dầy và Võ Văn Kiệt, kết nối trực tiếp Sân bay Quốc Tế Cần Thơ và trung tâm quận Ninh Kiều.
            </p>

            <div className="space-y-2 text-xs text-slate-200">
              <p className="p-2.5 bg-[#071326] border border-slate-700">• <strong>3 Phút:</strong> Sân bay Quốc Tế Cần Thơ</p>
              <p className="p-2.5 bg-[#071326] border border-slate-700">• <strong>5 Phút:</strong> Trung tâm thương mại Lotte Mart, Vincom</p>
              <p className="p-2.5 bg-[#071326] border border-slate-700">• <strong>10 Phút:</strong> Bến Ninh Kiều & Chợ Nổi Cái Răng</p>
              <p className="p-2.5 bg-[#071326] border border-slate-700">• <strong>15 Phút:</strong> Cầu Cần Thơ & Cao tốc Trung Lương</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 10. FORM NHẬN BẢNG GIÁ CUỐI TRANG ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#071326] border-t-2 border-amber-400">
        <div className="max-w-4xl mx-auto bg-[#040C1A] border-2 border-amber-400 p-8 sm:p-10 text-center space-y-6">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ĐĂNG KÝ TRỰC TIẾP TỪ KITA GROUP
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
              NHẬN BẢNG GIÁ & CHÍNH SÁCH ĐỢT 1
            </h3>
            <p className="text-xs text-slate-300">
              Cam kết giỏ hàng ngoại giao giá gốc, hỗ trợ thủ tục công chứng sang tên nhanh chóng
            </p>
          </div>

          {isBottomSubmitted ? (
            <div className="bg-white text-slate-900 p-6 text-center space-y-2 border-2 border-amber-400">
              <Check className="w-8 h-8 text-emerald-600 mx-auto stroke-[3]" />
              <h4 className="font-bold text-sm text-[#040C1A]">GỬI THÔNG TIN THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-600">
                Chuyên viên sẽ liên hệ lại qua số <strong>{bottomPhone}</strong> trong vòng 3 phút.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBottomSubmit} className="max-w-xl mx-auto space-y-3 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={bottomName}
                  onChange={(e) => setBottomName(e.target.value)}
                  placeholder="Họ và tên *"
                  className="px-4 py-3 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={bottomPhone}
                  onChange={(e) => setBottomPhone(e.target.value)}
                  placeholder="Số điện thoại (Zalo) *"
                  className="px-4 py-3 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  placeholder="Email nhận tài liệu"
                  className="px-4 py-3 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
                />
                <select
                  value={bottomProduct}
                  onChange={(e) => setBottomProduct(e.target.value)}
                  className="px-4 py-3 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                >
                  <option value="Đất Nền Nhà Phố Liền Kề (100m² - 120m²)">Đất Nền Nhà Phố Liền Kề (100m² - 120m²)</option>
                  <option value="Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)">Shophouse Đại Lộ Ánh Sáng (110m² - 140m²)</option>
                  <option value="Biệt Thự Vườn Ven Hồ (200m² - 350m²)">Biệt Thự Vườn Ven Hồ (200m² - 350m²)</option>
                  <option value="Dinh Thự Đảo Ngọc (500m² - 800m²)">Dinh Thự Đảo Ngọc (500m² - 800m²)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer mt-1"
              >
                GỬI YÊU CẦU NHẬN BẢNG GIÁ
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 11. FOOTER ════════════════ */}
      <footer className="bg-[#030914] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                ★
              </div>
              <span className="font-black text-sm text-amber-400 uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Trực thuộc {companyGroup}. Đại đô thị sinh thái sân bay đẳng cấp quy mô 150ha tại trung tâm TP. Cần Thơ.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG DỰ ÁN</h4>
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
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">CHỨNG NHẬN PHÁP LÝ</h4>
            <p>✓ Quyết định phê duyệt 1/500 cấp bởi UBND Thành Phố Cần Thơ.</p>
            <p>✓ Sổ hồng từng nền, thời hạn sử dụng đất lâu dài vĩnh viễn.</p>
            <p>✓ Ngân hàng VPBank bảo lãnh tiến độ và hỗ trợ vay 70%.</p>
            <p className="text-[10px] text-slate-500 pt-2">© 2026 {brandName}. All rights reserved.</p>
          </div>

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
          className="px-4 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition"
        >
          <Phone className="w-4 h-4 animate-bounce text-amber-300" />
          <span className="hidden sm:inline">Hotline: {hotline}</span>
          <span className="sm:hidden">Gọi Ngay</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo</span>
        </a>
      </div>

    </div>
  );
}
