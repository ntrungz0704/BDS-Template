'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn
} from 'lucide-react';
import { PropertyImageGallery } from '../PropertyImageGallery';
import { getCmsQuickStats, getCmsHero, getCmsPolicies } from '../../../utils/cmsSectionHelper';

export interface LP01TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
  pageContent?: any;
}

export default function LP01Template({
  template,
  viewport,
  initialPage,
  company,
  theme,
  projects,
  posts,
  pageContent,
}: LP01TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent, {
    badge: 'DỰ ÁN CĂN HỘ HẠNG A TRUNG TÂM THỦ ĐÔ',
    heading: 'SỐNG ĐỈNH PHỒN HOA',
    headingAccent: 'NGAY TRÁI TIM VIỆT NAM',
    subtitle: 'Tổ hợp căn hộ cao cấp chuẩn quốc tế sở hữu vị trí kim cương đắt giá, tầm nhìn panorama ôm trọn công viên hồ điều hòa 14ha và hệ thống tiện ích 5 sao đặc quyền dành riêng cho cộng đồng cư dân tinh hoa.',
    ctaText: 'Nhận Bảng Giá',
  });

  const defaultStats = [
    { value: '39.8 ha', label: 'Tổng Diện Tích Dự Án', desc: 'Bao gồm công viên & hồ 14ha' },
    { value: '30.0 %', label: 'Mật Độ Xây Dựng', desc: '70% cảnh quan cây xanh' },
    { value: '2 Tòa / 44 Tầng', label: 'Quy Mô Chiều Cao', desc: 'Biểu tượng kiến trúc tương lai' },
    { value: '54m² - 149m²', label: 'Diện Tích Căn Hộ', desc: 'Từ 1PN đến 3PN & Dual Key' },
  ];
  const activeStats = getCmsQuickStats(pageContent, defaultStats);

  const defaultPolicies = [
    { badge: '12%', title: 'Chiết Khấu Thanh Toán Sớm', desc: 'Chiết khấu trực tiếp tới 12% giá trị căn hộ khi khách hàng thanh toán sớm 95% giá trị hợp đồng.' },
    { badge: '0% Lãi Suất', title: 'Lãi Suất 0% Trong 24 Tháng', desc: 'Ngân hàng Vietcombank, Techcombank hỗ trợ vay 70%, ân hạn nợ gốc và miễn lãi tới 24 tháng.' },
    { badge: '150 Triệu', title: 'Tặng Gói Nội Thất Cao Cấp', desc: 'Tặng ngay gói quà tặng hoàn thiện nội thất trị giá 150.000.000 đồng trừ thẳng vào giá bán.' },
    { badge: '2 Năm', title: 'Miễn Phí Phí Quản Lý', desc: 'Miễn phí 24 tháng dịch vụ quản lý tòa nhà tiêu chuẩn quốc tế Savills / CBRE.' },
  ];
  const activePolicies = getCmsPolicies(pageContent, defaultPolicies);
  // Brand & Company info fallback from CMS
  const firstProject = (projects && Array.isArray(projects) && projects.length > 0) ? projects[0] : null;
  const brandName = firstProject?.title || firstProject?.name || company?.name || template?.name || 'DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Ngã tư Lê Quang Đạo - Mễ Trì, Quận Nam Từ Liêm, Hà Nội';

  // Lead Form States
  const [heroName, setHeroName] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroUnitType, setHeroUnitType] = useState('Căn Hộ 2 Phòng Ngủ (74m² - 86m²)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  const [midName, setMidName] = useState('');
  const [midPhone, setMidPhone] = useState('');
  const [isMidSubmitted, setIsMidSubmitted] = useState(false);

  // Floor Plan Tab
  const [activeFloorTab, setActiveFloorTab] = useState<'1pn' | '2pn' | '3pn' | 'dualkey'>('2pn');

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Video modal / playing state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Countdown timer state: 5 ngày 14 giờ 36 phút 20 giây
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 14,
    minutes: 36,
    seconds: 20
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPhone.trim()) return;
    setIsHeroSubmitted(true);
    setTimeout(() => setIsHeroSubmitted(false), 6000);
  };

  const handleMidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!midPhone.trim()) return;
    setIsMidSubmitted(true);
    setTimeout(() => setIsMidSubmitted(false), 6000);
  };

  // Seamless UX: Automatically pre-select the unit type when clicking "Nhận Báo Giá Căn Này"
  const handleSelectUnitType = (unitTitle: string) => {
    setHeroUnitType(unitTitle);
    const element = document.getElementById('dang-ky');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-unit-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-4', 'ring-amber-400', 'border-amber-500');
          setTimeout(() => selectEl.classList.remove('ring-4', 'ring-amber-400', 'border-amber-500'), 2000);
        }
      }, 350);
    }
  };

  // 6 Tiện ích thực tế chuẩn ảnh cho Gallery
  const amenitiesList = [
    {
      title: 'Công Viên Cây Xanh 14ha & Hồ Điều Hòa',
      desc: 'Lá phổi xanh điều hòa vi khí hậu mang lại không gian sống trong lành',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    },
    {
      title: 'Hồ Bơi Vô Cực 4 Mùa Trên Cao',
      desc: 'Thiết kế chuẩn resort 5 sao với tầm view panorama ôm trọn chân trời',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
    },
    {
      title: 'Khu Vui Chơi Trẻ Em Kid Paradise',
      desc: 'Không gian vận động sáng tạo, an toàn đa tầng cho cư dân nhí',
      image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=1200&q=80',
    },
    {
      title: 'Sảnh Đón Lounge Đại Sảnh Chuẩn 5 Sao',
      desc: 'Lễ tân phục vụ 24/7, không gian tiếp khách sang trọng và đẳng cấp',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    },
    {
      title: 'Quảng Trường Nhạc Nước Nghệ Thuật',
      desc: 'Điểm hẹn thư giãn cuối tuần lung linh ánh sáng và âm thanh',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
    },
    {
      title: 'Sky Lounge & Vườn Chân Mây',
      desc: 'Nơi ngắm hoàng hôn đắt giá và thưởng thức cocktail tầng thượng',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    },
  ];

  // Mặt bằng chi tiết căn hộ
  const floorPlans = {
    '1pn': {
      title: 'Căn Hộ 1 Phòng Ngủ (52.8 m²)',
      desc: 'Thiết kế tối ưu cho chuyên gia độc thân hoặc gia đình trẻ, đón trọn ánh sáng tự nhiên.',
      rooms: '1 Phòng Ngủ · 1 WC · 1 Ban Công Panorama · 1 Bếp Mở',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    },
    '2pn': {
      title: 'Căn Hộ 2 Phòng Ngủ (74.2 m² - 86.5 m²)',
      desc: 'Không gian sống lý tưởng với 2 phòng ngủ master rộng rãi, phòng khách nối liền ban công đón gió mát.',
      rooms: '2 Phòng Ngủ · 2 WC · 2 Ban Công & Logia · 1 Phòng Khách Lớn',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    },
    '3pn': {
      title: 'Căn Hộ 3 Phòng Ngủ Master (112.4 m²)',
      desc: 'Dành riêng cho gia đình đa thế hệ, tầm nhìn trực diện hồ điều hòa và công viên trung tâm.',
      rooms: '3 Phòng Ngủ · 2 WC · 1 Phòng Đa Năng · Phòng Bếp Riêng Biệt',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    },
    'dualkey': {
      title: 'Căn Hộ Dual Key & Sky Villa (149.0 m²)',
      desc: 'Giải pháp 2 trong 1: Vừa ở vừa cho thuê sinh lời dòng tiền đều đặn mỗi tháng.',
      rooms: '2 Lối Đi Riêng · 3 Phòng Ngủ · 3 WC · Sân Vườn Chân Mây',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* ════════════════ 1. TOP NAVBAR ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#082B27]/95 backdrop-blur-md text-white border-b border-emerald-900/50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#tong-quan" className="flex items-center gap-2 group min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-md shrink-0">
              <span className="text-sm sm:text-base tracking-tighter">{(company as any)?.brandShort || "LP"}</span>
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xs sm:text-base tracking-wider text-white uppercase block leading-none truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
                {(company as any)?.logoText || "LP BDS01"}
              </span>
              <span className="text-[9px] sm:text-[10px] text-amber-300 tracking-widest font-mono uppercase block mt-0.5">
                LUXURY APARTMENT
              </span>
            </div>
          </a>

          {/* Nav Anchor Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a href="#tong-quan" className="hover:text-amber-400 transition-colors">Tổng Quan</a>
            <a href="#vi-tri" className="hover:text-amber-400 transition-colors">Vị Trí</a>
            <a href="#tien-ich" className="hover:text-amber-400 transition-colors">Tiện Ích</a>
            <a href="#mat-bang" className="hover:text-amber-400 transition-colors">Mặt Bằng</a>
            <a href="#chinh-sach" className="hover:text-amber-400 transition-colors">Chính Sách</a>
          </nav>

          {/* Top CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#dang-ky"
              className="px-4 py-2 rounded-lg border border-amber-400/80 text-amber-300 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              Nhận Báo Giá
            </a>
            <a
              href={`tel:${hotline}`}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{hotline}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & HERO LEAD FORM ════════════════ */}
      <section id="tong-quan" className="relative bg-gradient-to-b from-[#082B27] via-[#0F3B38] to-[#0A2E2A] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Headlines & Hook */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{cmsHero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] uppercase text-white">
              {cmsHero.heading} <br />
              {cmsHero.headingAccent && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  {cmsHero.headingAccent}
                </span>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {cmsHero.subtitle}
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Chiết khấu mở bán lên tới <strong>12%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hỗ trợ vay <strong>70% - Lãi suất 0% 24 tháng</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bàn giao nội thất nhập khẩu Châu Âu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pháp lý minh bạch - Sổ hồng lâu dài</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#video-gioi-thieu"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 underline-offset-4"
              >
                <Play className="w-4 h-4 text-amber-400 fill-current" />
                <span>Xem Video Giới Thiệu Dự Án</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Lead Capture Form (Lưới lọc phễu số 1) */}
          <div id="dang-ky" className="lg:col-span-5">
            <div className="bg-[#05211E]/95 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 text-left relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-center mb-6">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
                  ƯU ĐÃI ĐỢT 1 TỪ CHỦ ĐẦU TƯ
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  ĐĂNG KÝ TƯ VẤN & NHẬN BẢNG GIÁ
                </h3>
                <p className="text-[11px] text-slate-300 mt-1">
                  Nhận trọn bộ mặt bằng 2D/3D & bảng tính lãi vay ngân hàng miễn phí
                </p>
              </div>

              {isHeroSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/60 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-300">ĐĂNG KÝ THÀNH CÔNG!</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Chuyên viên dự án sẽ liên hệ lại qua số điện thoại <strong>{heroPhone}</strong> và gửi file PDF Bảng Giá qua Zalo cho bạn trong 3 phút.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-[11px]">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-[11px]">Số điện thoại nhận bảng giá (Zalo) *</label>
                    <input
                      type="tel"
                      required
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="Ví dụ: 0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-[11px]">Email (tùy chọn nhận hợp đồng mẫu)</label>
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-[11px]">Loại căn hộ bạn đang quan tâm</label>
                    <select
                      id="hero-unit-select"
                      value={heroUnitType}
                      onChange={(e) => setHeroUnitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none transition-all duration-300"
                    >
                      <option className="text-slate-900 bg-white font-medium" value="Căn Hộ 1 Phòng Ngủ (52.8 m²)">Căn Hộ 1 Phòng Ngủ (52.8 m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Căn Hộ 2 Phòng Ngủ (74.2 m² - 86.5 m²)">Căn Hộ 2 Phòng Ngủ (74.2 m² - 86.5 m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Căn Hộ 3 Phòng Ngủ Master (112.4 m²)">Căn Hộ 3 Phòng Ngủ Master (112.4 m²)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Căn Hộ Dual Key & Sky Villa (149.0 m²)">Căn Hộ Dual Key & Sky Villa (149.0 m²)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-900/50 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>ĐĂNG KÝ NHẬN BÁO GIÁ NGAY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cam kết bảo mật thông tin 100% · Không làm phiền</span>
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 3. KEY STATS BAR (DYNAMIC CMS BINDING) ════════════════ */}
      <section className="bg-[#FDFBF7] py-10 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 ${activeStats.length > 4 ? 'lg:grid-cols-' + Math.min(activeStats.length, 6) : ''} gap-4 sm:gap-6 text-center`}>
            {activeStats.map((st: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0F3B38] font-mono block break-words">
                  {st.value || st.number || '0'}
                </span>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  {st.label || st.title || `Chỉ số #${idx + 1}`}
                </span>
                {st.desc && <span className="text-[11px] text-slate-500 block">{st.desc}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 4. VIDEO TEASER SHOWCASE ════════════════ */}
      <section id="video-gioi-thieu" className="py-14 bg-[#F5EFE6] text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              TRẢI NGHIỆM KHÔNG GIAN SỐNG THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B27] uppercase tracking-tight">
              ĐÓN ĐẦU CƠ HỘI ĐẦU TƯ SINH LỜI BỀN VỮNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Video flycam thực tế phân tích tiềm năng hạ tầng, cự ly di chuyển và thiết kế không gian căn hộ mẫu tiêu chuẩn khách sạn 5 sao.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 aspect-video group">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
              alt="Video Poster Dự Án"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center p-6">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-8 ring-amber-400/30"
                title="Bấm để xem video/hình ảnh thực tế"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-4 text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                Xem Phim Giới Thiệu Dự Án (3:45s)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 5. THÔNG TIN TỔNG QUAN & MẶT BẰNG QUY HOẠCH ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Spec Table */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                HỒ SƠ DỰ ÁN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#082B27] uppercase">
                THÔNG TIN TỔNG QUAN
              </h2>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Tên thương mại:</span>
                <span className="font-bold text-slate-900 text-right">{brandName}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Chủ đầu tư:</span>
                <span className="font-bold text-slate-900 text-right">Tập đoàn MIK Group</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Vị trí đắc địa:</span>
                <span className="font-bold text-slate-900 text-right max-w-[240px]">{address}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Tổng diện tích quy hoạch:</span>
                <span className="font-bold text-slate-900">39.8 ha (Công viên hồ 14ha)</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Quy mô xây dựng:</span>
                <span className="font-bold text-slate-900">2 Tòa tháp cao 44 tầng</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Loại hình sản phẩm:</span>
                <span className="font-bold text-slate-900">Căn hộ hạng A, Dual Key, Penthouse</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Hình thức sở hữu:</span>
                <span className="font-bold text-emerald-700">Sổ hồng lâu dài (Người Việt Nam)</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500 font-bold">Thời gian bàn giao:</span>
                <span className="font-bold text-slate-900">Quý IV / 2026</span>
              </div>
            </div>

            <a
              href="#dang-ky"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#082B27] hover:bg-[#0F3B38] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Tải Toàn Bộ Hồ Sơ Pháp Lý 1/500</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Master Plan Layout Image (with zoom) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200 bg-slate-100 shadow-xl group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Sơ Đồ Quy Hoạch Tổng Thể"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="px-4 py-2 bg-slate-950/80 backdrop-blur text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Bấm để phóng to xem chi tiết phân khu</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 6. VỊ TRÍ & TỌA ĐỘ VÀNG KẾT NỐI VÙNG ════════════════ */}
      <section id="vi-tri" className="py-16 bg-[#082B27] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              TÂM ĐIỂM GIAO THƯƠNG THỊNH VƯỢNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              VỊ TRÍ KIM CƯƠNG & KẾT NỐI VÀNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tọa lạc tại mặt đường huyết mạch trung tâm hành chính mới, dễ dàng kết nối tới các đại lộ vành đai và tuyến Metro số 5.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Map Graphic preview */}
            <div className="lg:col-span-7">
              <div 
                className="relative rounded-3xl overflow-hidden border-2 border-emerald-700/60 shadow-2xl bg-slate-900 aspect-[16/10] group cursor-pointer"
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
              >
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                  alt="Sơ đồ vị trí kết nối giao thông"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-sm font-bold text-amber-300 block">{address}</span>
                      <span className="text-xs text-slate-300">Vị trí đắc địa 2 mặt tiền đường lớn</span>
                    </div>
                    <span className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-black rounded-lg flex items-center gap-1 shadow">
                      <ZoomIn className="w-3.5 h-3.5" /> Xem Bản Đồ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Distance & Linkages */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">3 PHÚT DI CHUYỂN</span>
                  <span className="text-[10px] text-slate-400 font-mono">500m</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  Trường Quốc tế JIS, Khách sạn JW Marriott, Đại siêu thị Vincom Mega Mall.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">5 PHÚT DI CHUYỂN</span>
                  <span className="text-[10px] text-slate-400 font-mono">1.2km</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  Bệnh viện Quốc tế Hồng Ngọc, Công viên hồ điều hòa 14ha Mễ Trì.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">10 PHÚT DI CHUYỂN</span>
                  <span className="text-[10px] text-slate-400 font-mono">3.5km</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  Trung tâm Hội nghị Quốc Gia, Sân vận động Mỹ Đình, Tòa nhà Keangnam Landmark 72.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">20 PHÚT DI CHUYỂN</span>
                  <span className="text-[10px] text-slate-400 font-mono">22km</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  Sân bay Quốc tế Nội Bài qua cầu Nhật Tân và đường Võ Nguyên Giáp.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ 7. THIẾT KẾ KIẾN TRÚC & TẦM VIEW PANORAMA ════════════════ */}
      <section className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div 
              className="rounded-2xl overflow-hidden shadow-lg border border-amber-200 cursor-pointer group"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                alt="Kiến trúc hiện đại"
                className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div 
              className="rounded-2xl overflow-hidden shadow-lg border border-amber-200 cursor-pointer group"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Góc view panorama"
                className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#082B27] text-amber-400 flex items-center justify-center shadow-md">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#082B27] uppercase leading-tight">
              TẦM VIEW PANORAMA VÔ CỰC <br />
              <span className="text-amber-600">ĐẲNG CẤP VƯỢT TRỘI</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% căn hộ được trang bị hệ kính Low-E tràn viền chạm trần cách âm, cách nhiệt hoàn hảo. Mỗi căn nhà là một tác phẩm nghệ thuật đón trọn ánh sáng bình minh và ánh đèn rực rỡ của thủ đô về đêm.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#082B27]">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Kính Low-E 3 lớp</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Trần cao 3.4m</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Điều hòa âm trần Daikin</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 8. BỘ SƯU TẬP TIỆN ÍCH ĐẲNG CẤP 5 SAO ════════════════ */}
      <section id="tien-ich" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              ĐẶC QUYỀN SỐNG THƯỢNG LƯU
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#082B27] uppercase tracking-tight">
              HỆ SINH THÁI TIỆN ÍCH 5 SAO
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hơn 39+ tiện ích nội khu đỉnh cao đáp ứng trọn vẹn mọi nhu cầu nghỉ dưỡng, chăm sóc sức khỏe và giải trí của cư dân ngay ngưỡng cửa.
            </p>
          </div>

          {/* Grid 6 Amenities Cards with Lightbox Zoom & 3s auto animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenitiesList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="group relative bg-[#FDFBF7] rounded-3xl overflow-hidden border border-amber-200/80 shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white font-bold text-[10px] uppercase tracking-wider">
                    Tiện ích #{idx + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2.5 bg-amber-500 text-slate-950 rounded-full shadow-lg">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 9. MẶT BẰNG CHI TIẾT CĂN HỘ (TAB SWITCHER) ════════════════ */}
      <section id="mat-bang" className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              THIẾT KẾ CÔNG NĂNG HOÀN HẢO
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#082B27] uppercase tracking-tight">
              MẶT BẰNG CĂN HỘ ĐIỂN HÌNH
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tối ưu từng centimet diện tích, 100% các phòng đều có cửa sổ đón gió và ánh sáng tự nhiên.
            </p>
          </div>

          {/* Interactive Floor Tabs */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
            {[
              { id: '1pn', label: 'Căn 1 Phòng Ngủ (52.8 m²)' },
              { id: '2pn', label: 'Căn 2 Phòng Ngủ (74.2m² - 86.5m²)' },
              { id: '3pn', label: 'Căn 3 Phòng Ngủ Master (112.4 m²)' },
              { id: 'dualkey', label: 'Dual Key & Sky Villa (149.0 m²)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFloorTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${
                  activeFloorTab === tab.id
                    ? 'bg-[#082B27] text-amber-300 border-[#082B27] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-amber-200/80 hover:bg-amber-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Floor Plan Card */}
          <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-bold rounded-lg uppercase">
                Bản vẽ mặt bằng chi tiết
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#082B27]">
                {floorPlans[activeFloorTab].title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {floorPlans[activeFloorTab].desc}
              </p>
              
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-bold space-y-1">
                <span className="text-[10px] uppercase text-amber-700 block">Cơ cấu không gian:</span>
                <p>{floorPlans[activeFloorTab].rooms}</p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectUnitType(floorPlans[activeFloorTab].title)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Nhận Báo Giá Căn Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div 
              className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/11] relative group cursor-pointer"
              onClick={() => setZoomImage(floorPlans[activeFloorTab].image)}
            >
              <img
                src={floorPlans[activeFloorTab].image}
                alt={floorPlans[activeFloorTab].title}
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

      {/* ════════════════ 10. MID-PAGE LEAD CAPTURE BAR (Lưới lọc phễu số 2) ════════════════ */}
      <section className="py-12 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-widest bg-black/10 px-2.5 py-0.5 rounded-full">
              GIỎ HÀNG NGOẠI GIAO ĐỢT 1
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              NHẬN BẢNG GIÁ & CHÍNH SÁCH CHIẾT KHẤU 12%
            </h3>
            <p className="text-xs text-slate-800 font-medium">
              Chỉ áp dụng cho 20 khách hàng đầu tiên đăng ký nhận giỏ hàng trong tuần này.
            </p>
          </div>

          {isMidSubmitted ? (
            <div className="bg-slate-900 text-amber-300 px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>Đã tiếp nhận! Chuyên viên đang gửi bảng giá qua Zalo...</span>
            </div>
          ) : (
            <form onSubmit={handleMidSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                required
                value={midName}
                onChange={(e) => setMidName(e.target.value)}
                placeholder="Họ và tên"
                className="px-4 py-3 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-400 text-xs w-full sm:w-40 border border-amber-600/30 focus:ring-2 focus:ring-slate-900 outline-none"
              />
              <input
                type="tel"
                required
                value={midPhone}
                onChange={(e) => setMidPhone(e.target.value)}
                placeholder="Số điện thoại / Zalo"
                className="px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-400 text-xs w-full sm:w-44 border border-amber-600/30 focus:ring-2 focus:ring-slate-900 outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 w-full sm:w-auto"
              >
                GỬI CHO TÔI
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ════════════════ 11. CHÍNH SÁCH BÁN HÀNG & ƯU ĐÃI KHỦNG ════════════════ */}
      <section id="chinh-sach" className="py-16 bg-[#082B27] text-white px-4 sm:px-6 lg:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              ƯU ĐÃI DÀNH RIÊNG CHO KHÁCH MUA ĐỢT 1
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Giải pháp tài chính linh hoạt giúp bạn dễ dàng sở hữu căn hộ cao cấp với số vốn ban đầu chỉ từ 15%.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {activePolicies.map((pol: any, idx: number) => (
              <div key={idx} className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-700/50 space-y-3 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex min-w-[54px] h-10 px-3.5 rounded-xl bg-amber-500 text-slate-950 items-center justify-center font-black text-sm shadow-md whitespace-nowrap mb-3">
                    {pol.badge || pol.value || pol.tag || `${idx + 1}`}
                  </div>
                  <h4 className="font-bold text-sm text-amber-300 uppercase">{pol.title || pol.name || pol.label}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {pol.desc || pol.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href="#dang-ky"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all"
            >
              <span>TẢI BẢNG TÍNH LÃI VAY & TIẾN ĐỘ THANH TOÁN (PDF)</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 12. COUNTDOWN URGENCY BAR (Lưới lọc phễu số 3) ════════════════ */}
      <section className="py-12 bg-gradient-to-b from-[#374151] to-[#1F2937] text-white px-4 sm:px-6 text-center border-t border-slate-700">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
              SỐ LƯỢNG CĂN ĐẸP CÓ HẠN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              CHỈ CÒN 15 CĂN ĐẸP NHẤT - NHẬN BOOKING TRONG THÁNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đồng hồ đếm ngược thời gian áp dụng quà tặng vàng 9999 & chiết khấu đợt 1:
            </p>
          </div>

          {/* Countdown Clock Tiles */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 font-mono">
            <div className="bg-slate-900/90 border border-slate-600 p-3 sm:p-4 rounded-2xl min-w-[64px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">{String(countdown.days).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase font-sans">Ngày</span>
            </div>
            <span className="text-2xl font-bold text-amber-400">:</span>
            <div className="bg-slate-900/90 border border-slate-600 p-3 sm:p-4 rounded-2xl min-w-[64px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase font-sans">Giờ</span>
            </div>
            <span className="text-2xl font-bold text-amber-400">:</span>
            <div className="bg-slate-900/90 border border-slate-600 p-3 sm:p-4 rounded-2xl min-w-[64px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase font-sans">Phút</span>
            </div>
            <span className="text-2xl font-bold text-amber-400">:</span>
            <div className="bg-slate-900/90 border border-slate-600 p-3 sm:p-4 rounded-2xl min-w-[64px] sm:min-w-[80px]">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] text-slate-400 uppercase font-sans">Giây</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${hotline}`}
              className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>HOTLINE 24/7: {hotline}</span>
            </a>
            <a
              href={`https://zalo.me/${zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ZALO GIỮ CĂN ĐẸP</span>
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 13. FOOTER ════════════════ */}
      <footer className="bg-[#051A18] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-950 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black">
                M
              </div>
              <span className="font-extrabold text-sm text-white uppercase tracking-wider">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Dự án căn hộ cao cấp biểu tượng mới tại trung tâm thủ đô. Nơi khẳng định đẳng cấp sống thượng lưu và sinh lời bền vững.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG & NHÀ MẪU</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hotline 24/7: <strong>{hotline}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: {email}</span>
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-400">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">PHÁP LÝ & BẢO LÃNH DỰ ÁN</h4>
            <p>✓ Giấy phép xây dựng số 84/GPXD cấp bởi Sở Xây Dựng.</p>
            <p>✓ Phê duyệt quy hoạch chi tiết tỷ lệ 1/500 hoàn thiện.</p>
            <p>✓ Ngân hàng Vietcombank bảo lãnh tiến độ dự án.</p>
            <p className="text-[10px] text-slate-500 pt-2">© 2026 {brandName}. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ════════════════ 14. LIGHTBOX ZOOM MODAL ════════════════ */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
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

      {/* ════════════════ 15. FLOATING BOTTOM CONTACT BAR ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">Gọi Ngay: {hotline}</span>
          <span className="sm:hidden">Gọi Hotline</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo</span>
        </a>
      </div>

    </div>
  );
}
