'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Flame
} from 'lucide-react';

export interface LP03TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP03Template({
  template,
  company,
  projects,
}: LP03TemplateProps) {
  // Brand & Company Info Fallback
  const brandName = company?.name || 'DỰ ÁN CĂN HỘ SIMPLE PAGE';
  const companyGroup = 'TẬP ĐOÀN ĐẦU TƯ BẤT ĐỘNG SẢN';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM';

  // Hero Lead Form State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroUnitType, setHeroUnitType] = useState('Căn Hộ 2 Phòng Ngủ (68m² - 75m²)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Bottom Weekend Viewing Form State
  const [viewName, setViewName] = useState('');
  const [viewPhone, setViewPhone] = useState('');
  const [viewDate, setViewDate] = useState('Thứ 7 tuần này (Sáng 09:00 - 11:30)');
  const [viewUnit, setViewUnit] = useState('Căn Hộ 2 Phòng Ngủ (68m² - 75m²)');
  const [isViewSubmitted, setIsViewSubmitted] = useState(false);

  // Floor Plan Tab State
  const [activeFloorTab, setActiveFloorTab] = useState<'1pn' | '2pn' | '3pn'>('2pn');

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX: Automatically pre-select the unit type when clicking "Nhận Báo Giá Căn Này" or "Đặt Chỗ"
  const handleSelectUnit = (unitTitle: string) => {
    setHeroUnitType(unitTitle);
    setViewUnit(unitTitle);
    const element = document.getElementById('hero-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-unit-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-4', 'ring-red-600', 'border-red-600');
          setTimeout(() => selectEl.classList.remove('ring-4', 'ring-red-600', 'border-red-600'), 2000);
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

  const handleViewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewPhone.trim()) return;
    setIsViewSubmitted(true);
    setTimeout(() => setIsViewSubmitted(false), 6000);
  };

  // Floor Plan Data
  const floorPlanData = {
    '1pn': {
      title: 'Căn Hộ 1 Phòng Ngủ (48.5 m²)',
      desc: 'Thiết kế thông minh, tối ưu công năng từng góc nhỏ, phù hợp cho người độc thân hoặc cặp vợ chồng trẻ.',
      rooms: '1 Phòng Ngủ · 1 WC · 1 Ban Công Thoáng · 1 Bếp Mở',
      price: 'Chỉ từ 1.85 Tỷ/căn',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    },
    '2pn': {
      title: 'Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)',
      desc: 'Căn hộ tiêu chuẩn bán chạy nhất với 2 phòng ngủ ngập tràn ánh sáng, phòng khách ban công view công viên.',
      rooms: '2 Phòng Ngủ · 2 WC · 2 Ban Công & Logia · Phòng Khách Rộng',
      price: 'Chỉ từ 2.65 Tỷ/căn',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    },
    '3pn': {
      title: 'Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)',
      desc: 'Căn góc 3 mặt thoáng dành cho gia đình đa thế hệ, tầm view panorama triệu đô ôm trọn thành phố.',
      rooms: '3 Phòng Ngủ · 2 WC · 1 Phòng Đa Năng · Phòng Bếp Riêng',
      price: 'Chỉ từ 3.55 Tỷ/căn',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    },
  };

  // 4 Featured Units in Red Product Showcase
  const featuredUnits = [
    {
      type: 'Căn 1 Phòng Ngủ',
      size: '48.5 m²',
      price: '1.85 Tỷ',
      promo: 'Chiết khấu ngay 5% + Tặng 2 chỉ vàng',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      fullName: 'Căn Hộ 1 Phòng Ngủ (48.5 m²)',
    },
    {
      type: 'Căn 2 Phòng Ngủ',
      size: '68.0 m²',
      price: '2.65 Tỷ',
      promo: 'Tặng gói hoàn thiện nội thất 50 triệu',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      fullName: 'Căn Hộ 2 Phòng Ngủ (68m² - 75m²)',
    },
    {
      type: 'Căn 3 Phòng Ngủ',
      size: '95.0 m²',
      price: '3.55 Tỷ',
      promo: 'Hỗ trợ vay 70% lãi suất 0% trong 24 tháng',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      fullName: 'Căn Hộ 3 Phòng Ngủ Master (92m² - 110m²)',
    },
    {
      type: 'Sky Villa & Penthouse',
      size: '145.0 m²',
      price: '6.80 Tỷ',
      promo: 'Tặng chuyến du lịch Châu Âu 5 sao 2 người',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      fullName: 'Penthouse & Sky Villa (145m²)',
    },
  ];

  // 6 Showroom Interior Photos
  const showroomPhotos = [
    { title: 'Hành lang & Cửa vào bảo mật vân tay 5 lớp', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80' },
    { title: 'Khu vực bếp mở & Quầy bar mini hiện đại', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80' },
    { title: 'Phòng khách chuẩn sang trọng nối liền ban công', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80' },
    { title: 'Phòng ngủ phụ ngập tràn ánh sáng tự nhiên', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80' },
    { title: 'Phòng ngủ Master phong cách nghỉ dưỡng cao cấp', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&q=80' },
    { title: 'Phòng tắm đứng ốp đá cẩm thạch sang trọng', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80' },
  ];

  // 8 Real Project / Site Gallery Photos
  const projectGallery = [
    { title: 'Sảnh Lễ Tân Sang Trọng 5 Sao', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
    { title: 'Khu Hòm Thư Cư Dân Hiện Đại', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
    { title: 'Thang Máy Tốc Độ Cao Schindler', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80' },
    { title: 'Vườn Nhiệt Đới & Lối Đi Dạo Bộ', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
    { title: 'Khu Vui Chơi Trẻ Em Trong Nhà', image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80' },
    { title: 'Tòa Tháp Hoàn Thiện Lung Linh Ban Đêm', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80' },
    { title: 'Mặt Tiền Tòa Nhà Hiện Đại Chuẩn A', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { title: 'Quảng Trường Nhạc Nước Về Đêm', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#9B1C1C] selection:text-white">
      
      {/* ════════════════ 1. TOP HEADER ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#1E2530] text-white py-2.5 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1C1C] text-white flex items-center justify-center font-black shadow-sm">
              <span className="text-sm tracking-tighter">SP</span>
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wide uppercase block leading-none">
                SIMPLE PAGE
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block mt-0.5">
                BẤT ĐỘNG SẢN CAO CẤP
              </span>
            </div>
          </div>

          {/* Slogan */}
          <div className="hidden lg:block text-slate-300 text-xs italic">
            "Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu"
          </div>

          {/* Contact Fast Info */}
          <div className="flex items-center gap-4">
            <a href={`tel:${hotline}`} className="flex items-center gap-1.5 font-black text-amber-400 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#hero-form"
              className="px-4 py-1.5 rounded-lg bg-[#9B1C1C] hover:bg-[#801616] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Đăng Ký Ngay
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO BANNER & HERO LEAD FORM ════════════════ */}
      <section className="relative bg-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80"
            alt="Hero Backdrop"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Dark Gray Glass Box with Golden Title */}
          <div className="lg:col-span-7 bg-slate-950/70 backdrop-blur-md border border-slate-700/60 rounded-3xl p-6 sm:p-10 text-left space-y-5 shadow-2xl">
            <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-400 text-[10px] font-bold uppercase tracking-widest">
              ⚡ SỰ KIỆN MỞ BÁN ĐỢT 1 — CHIẾT KHẤU 5%
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black text-amber-400 uppercase tracking-tight leading-tight">
                {brandName}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                Tổ hợp căn hộ cao cấp sở hữu vị trí vàng trung tâm, không gian sống xanh chuẩn sinh thái cùng hệ thống tiện ích đẳng cấp 5 sao.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Giá từ <strong>1.85 Tỷ/căn</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hỗ trợ vay <strong>70% LS 0%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bàn giao full nội thất cao cấp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sổ hồng lâu dài vĩnh viễn</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <span>ĐĂNG KÝ NHẬN BÁO GIÁ & THAM QUAN</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Lead Form (Lưới lọc phễu số 1) */}
          <div id="hero-form" className="lg:col-span-5">
            <div className="bg-white border-2 border-[#9B1C1C] rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative">
              <div className="text-center mb-5">
                <span className="text-[11px] font-black text-[#9B1C1C] uppercase tracking-widest block mb-1">
                  BẢNG GIÁ & CHÍNH SÁCH NGOẠI GIAO
                </span>
                <h3 className="text-xl font-black text-slate-900 uppercase">
                  NHẬN THÔNG TIN BÁO GIÁ
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Điền thông tin để chuyên viên dự án gửi file PDF mặt bằng & báo giá chi tiết
                </p>
              </div>

              {isHeroSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-800">ĐÃ GỬI YÊU CẦU THÀNH CÔNG!</h4>
                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                    Chuyên viên sẽ liên hệ lại qua số <strong>{heroPhone}</strong> và gửi file PDF báo giá căn <strong>{heroUnitType}</strong> qua Zalo cho bạn trong 3 phút.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Số điện thoại nhận bảng giá (Zalo) *</label>
                    <input
                      type="tel"
                      required
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Email nhận tài liệu phân tích</label>
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="email@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Loại căn hộ bạn đang quan tâm</label>
                    <select
                      id="hero-unit-select"
                      value={heroUnitType}
                      onChange={(e) => setHeroUnitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all duration-300"
                    >
                      <option value="Căn Hộ 1 Phòng Ngủ (48.5 m²)">Căn Hộ 1 Phòng Ngủ (48.5 m²)</option>
                      <option value="Căn Hộ 2 Phòng Ngủ (68m² - 75m²)">Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)</option>
                      <option value="Căn Hộ 3 Phòng Ngủ Master (92m² - 110m²)">Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)</option>
                      <option value="Penthouse & Sky Villa (145m²)">Penthouse & Sky Villa (145.0 m²)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-900/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>ĐĂNG KÝ NGAY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bảo mật thông tin 100% · Tư vấn trực tiếp miễn phí</span>
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 3. RED FEATURE BAR (4 ICON QUYỀN LỢI ĐỎ ĐÔ) ════════════════ */}
      <section className="bg-[#9B1C1C] text-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-xs uppercase block text-amber-300">Vị Trí Đắc Địa</span>
              <span className="text-[11px] text-slate-200">Trung tâm kết nối thuận tiện</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-xs uppercase block text-amber-300">Tiện Ích 5 Sao</span>
              <span className="text-[11px] text-slate-200">Chuẩn resort nghỉ dưỡng cao cấp</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-xs uppercase block text-amber-300">Pháp Lý Hoàn Chỉnh</span>
              <span className="text-[11px] text-slate-200">Sổ hồng lâu dài trao tay</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Key className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-xs uppercase block text-amber-300">Bàn Giao Full Nội Thất</span>
              <span className="text-[11px] text-slate-200">Tiêu chuẩn nhập khẩu Châu Âu</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 4. TỔNG QUAN DỰ ÁN & BOX THÔNG SỐ ĐỎ ĐÔ ════════════════ */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
              QUY HOẠCH ĐỒNG BỘ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              TỔNG QUAN DỰ ÁN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dự án là khu phức hợp căn hộ, thương mại và dịch vụ cao cấp được quy hoạch bài bản với mật độ xây dựng chỉ 32%, đem lại không gian sống trong lành, bình yên giữa lòng phố thị náo nhiệt.
            </p>
          </div>

          {/* Banner Phối Cảnh & Thông Số Tổng Quan */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 min-h-[420px] sm:min-h-[460px] flex flex-col justify-end p-4 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
              alt="Phối Cảnh Tổng Quan"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-none" />
            
            {/* Red Box on bottom-right on desktop, full-width responsive on mobile */}
            <div className="relative z-10 sm:absolute sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-[#9B1C1C]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl w-full sm:max-w-sm text-left shadow-2xl border border-red-400/40">
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-amber-300 mb-3 border-b border-white/20 pb-2">
                HỒ SƠ TỔNG QUAN DỰ ÁN
              </h4>
              <div className="space-y-2 text-xs text-slate-100 font-medium leading-relaxed">
                <p>• <strong>Chủ đầu tư:</strong> {companyGroup}</p>
                <p className="break-words">• <strong>Vị trí:</strong> {address}</p>
                <p>• <strong>Tổng diện tích:</strong> 25.000 m² (Mật độ 32%)</p>
                <p>• <strong>Quy mô:</strong> 2 Tòa tháp cao 35 tầng (850 căn hộ)</p>
                <p>• <strong>Diện tích căn:</strong> 48.5m² – 145m² (1PN - 3PN)</p>
                <p>• <strong>Pháp lý:</strong> Sổ hồng lâu dài từng căn</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 5. VỊ TRÍ & KẾT NỐI GIAO THÔNG ════════════════ */}
      <section className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Position Description */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div>
              <span className="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest block mb-1">
                TỌA ĐỘ VÀNG KẾT NỐI
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                VỊ TRÍ CHIẾN LƯỢC
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Tọa lạc tại vị trí độc tôn ngay mặt tiền đại lộ huyết mạch, kết nối trực tiếp với các trục đường vành đai và trạm dừng Metro, cư dân dễ dàng tiếp cận mọi tiện ích ngoại khu hiện đại bậc nhất.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 font-medium">
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <span>Trường Quốc tế & Bệnh viện đa khoa</span>
                <span className="font-bold text-[#9B1C1C]">3 Phút (500m)</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <span>Trung tâm thương mại & Đại siêu thị</span>
                <span className="font-bold text-[#9B1C1C]">5 Phút (1.2km)</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <span>Trung tâm hành chính quận & Công viên hồ</span>
                <span className="font-bold text-[#9B1C1C]">10 Phút (3.5km)</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <span>Sân bay Quốc tế & Các tỉnh lân cận</span>
                <span className="font-bold text-[#9B1C1C]">20 Phút (18km)</span>
              </div>
            </div>
          </div>

          {/* Right: Map Graphic preview */}
          <div className="lg:col-span-7">
            <div 
              className="relative rounded-3xl overflow-hidden border-2 border-slate-300 shadow-xl bg-slate-900 aspect-[16/10] group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                alt="Sơ đồ vị trí kết nối"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="flex items-center justify-between w-full text-white">
                  <span className="text-xs font-bold">{address}</span>
                  <span className="px-3 py-1.5 bg-[#9B1C1C] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow">
                    <ZoomIn className="w-3.5 h-3.5" /> Phóng To Bản Đồ
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 6. BLUE DIVIDER BANNER (TIỆN ÍCH DỰ ÁN) ════════════════ */}
      <section className="bg-gradient-to-r from-[#7B9EBE] via-[#5C85AD] to-[#7B9EBE] text-white py-12 px-4 sm:px-6 text-center shadow-inner">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
            CHUẨN MỰC SỐNG MỚI
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            TIỆN ÍCH DỰ ÁN ĐẲNG CẤP
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed">
            Hệ sinh thái tiện ích nội khu khép kín đáp ứng trọn vẹn mọi nhu cầu vui chơi, rèn luyện sức khỏe và tận hưởng cuộc sống của từng thành viên trong gia đình.
          </p>
        </div>
      </section>

      {/* ════════════════ 7. 3 CỘT THỐNG SỐ NỔI BẬT & TIỆN ÍCH ════════════════ */}
      <section className="py-14 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-3xl font-black text-[#9B1C1C] block">100%</span>
              <span className="text-xs font-bold text-slate-900 uppercase">Căn Hộ Đón Gió Tự Nhiên</span>
              <p className="text-[11px] text-slate-500">Thiết kế mở đối lưu không khí tối đa</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-3xl font-black text-[#9B1C1C] block">25+</span>
              <span className="text-xs font-bold text-slate-900 uppercase">Tiện Ích 5 Sao Khép Kín</span>
              <p className="text-[11px] text-slate-500">Hồ bơi tràn, Gym, Spa, Sky Bar, BBQ</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-3xl font-black text-[#9B1C1C] block">15 Phút</span>
              <span className="text-xs font-bold text-slate-900 uppercase">Kết Nối Trung Tâm</span>
              <p className="text-[11px] text-slate-500">Giao thông thông suốt qua các đại lộ lớn</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 8. MẶT BẰNG CĂN HỘ CHI TIẾT (TABS + AUTO SELECT UX) ════════════════ */}
      <section className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
              THIẾT KẾ HIỆN ĐẠI
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              MẶT BẰNG CĂN HỘ CHI TIẾT
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Chọn từng loại căn hộ dưới đây để xem bản vẽ kỹ thuật chi tiết 2D/3D
            </p>
          </div>

          {/* Interactive Floor Tabs */}
          <div className="flex justify-center flex-wrap gap-3">
            {[
              { id: '1pn', label: 'CĂN 1 PHÒNG NGỦ (48.5 M²)' },
              { id: '2pn', label: 'CĂN 2 PHÒNG NGỦ (68M² - 75M²)' },
              { id: '3pn', label: 'CĂN 3 PHÒNG NGỦ MASTER (92M² - 110M²)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFloorTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  activeFloorTab === tab.id
                    ? 'bg-[#9B1C1C] text-white border-[#9B1C1C] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Floor Plan Card */}
          <div className="bg-white rounded-3xl border border-slate-300 p-6 sm:p-8 shadow-xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-red-100 text-[#9B1C1C] text-[10px] font-black rounded-lg uppercase">
                Bản Vẽ Kỹ Thuật 2D/3D
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {floorPlanData[activeFloorTab].title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {floorPlanData[activeFloorTab].desc}
              </p>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold space-y-1">
                <span className="text-[10px] uppercase text-[#9B1C1C] block">Cơ Cấu Phòng:</span>
                <p>{floorPlanData[activeFloorTab].rooms}</p>
                <p className="text-[#9B1C1C] font-black pt-1">{floorPlanData[activeFloorTab].price}</p>
              </div>

              <div className="pt-2">
                {/* Seamless UX: Automatically selects this unit and scrolls to Hero Form */}
                <button
                  type="button"
                  onClick={() => handleSelectUnit(floorPlanData[activeFloorTab].title)}
                  className="px-6 py-3 bg-[#9B1C1C] hover:bg-[#801616] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>NHẬN BÁO GIÁ CĂN NÀY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/11] relative group cursor-pointer"
              onClick={() => setZoomImage(floorPlanData[activeFloorTab].image)}
            >
              <img
                src={floorPlanData[activeFloorTab].image}
                alt={floorPlanData[activeFloorTab].title}
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

      {/* ════════════════ 9. CĂN HỘ MẪU THỰC TẾ (SHOWROOM GALLERY) ════════════════ */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
              TRẢI NGHIỆM KHÔNG GIAN THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              BỘ SƯU TẬP CĂN HỘ MẪU
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Từng chi tiết được chăm chút tỉ mỉ với vật liệu nội thất cao cấp mang lại cảm giác ấm cúng và tiện nghi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showroomPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(photo.image)}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white text-left leading-tight">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 10. GIỎ HÀNG MỞ BÁN ĐỢT 1 (RED BAR PRODUCTS SHOWCASE) ════════════════ */}
      <section className="py-16 bg-[#9B1C1C] text-white px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              GIỎ HÀNG NGOẠI GIAO GIÁ GỐC
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              DANH MỤC CĂN HỘ MỞ BÁN ĐỢT 1
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Ưu tiên giữ chỗ các căn tầng đẹp, hướng view thoáng không bị che chắn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredUnits.map((u, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-xl border border-red-300 flex flex-col justify-between text-left group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={u.image}
                    alt={u.type}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#9B1C1C] text-white text-[10px] font-black rounded-lg uppercase">
                    {u.size}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-black text-base text-slate-900 group-hover:text-[#9B1C1C] transition-colors">
                      {u.type}
                    </h4>
                    <p className="text-lg font-black text-[#9B1C1C]">
                      {u.price}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg">
                      ✓ {u.promo}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectUnit(u.fullName)}
                    className="w-full py-2.5 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>ĐẶT CHỖ CĂN NÀY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 11. HÌNH ẢNH THỰC TẾ HOẠT ĐỘNG DỰ ÁN (8 ẢNH GRID) ════════════════ */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
              TIẾN ĐỘ THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              HÌNH ẢNH THỰC TẾ DỰ ÁN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Cập nhật tiến độ xây dựng và không gian hoàn thiện thực tế tại công trường
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {projectGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 12. FORM ĐẶT LỊCH XEM NHÀ MẪU (Lưới lọc phễu số 2) ════════════════ */}
      <section className="py-16 bg-[#F8E8E8] px-4 sm:px-6 lg:px-8 border-b border-red-200">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-red-300 shadow-2xl text-center space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-black text-[#9B1C1C] uppercase tracking-widest">
              XE Ô TÔ ĐÓN TẬN NHÀ MIỄN PHÍ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              ĐĂNG KÝ XEM NHÀ MẪU CUỐI TUẦN
            </h3>
            <p className="text-xs text-slate-600">
              Trải nghiệm thực tế không gian sống và nhận quà tặng voucher nội thất khi tham quan
            </p>
          </div>

          {isViewSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-bold text-base text-emerald-800">ĐÃ ĐẶT LỊCH THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-700 leading-relaxed break-words">
                Phòng kinh doanh đã xác nhận lịch hẹn của <strong>{viewName || 'bạn'}</strong> vào <strong>{viewDate}</strong>. Chuyên viên sẽ gọi qua số <strong>{viewPhone}</strong> để sắp xếp xe đón.
              </p>
            </div>
          ) : (
            <form onSubmit={handleViewSubmit} className="space-y-4 text-xs text-left max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={viewName}
                    onChange={(e) => setViewName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Số điện thoại (Zalo) *</label>
                  <input
                    type="tel"
                    required
                    value={viewPhone}
                    onChange={(e) => setViewPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Căn hộ muốn xem</label>
                  <select
                    value={viewUnit}
                    onChange={(e) => setViewUnit(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
                  >
                    <option value="Căn Hộ 1 Phòng Ngủ (48.5 m²)">Căn Hộ 1 Phòng Ngủ (48.5 m²)</option>
                    <option value="Căn Hộ 2 Phòng Ngủ (68m² - 75m²)">Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)</option>
                    <option value="Căn Hộ 3 Phòng Ngủ Master (92m² - 110m²)">Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)</option>
                    <option value="Penthouse & Sky Villa (145m²)">Penthouse & Sky Villa (145.0 m²)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Thời gian thuận tiện</label>
                  <select
                    value={viewDate}
                    onChange={(e) => setViewDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
                  >
                    <option value="Thứ 7 tuần này (Sáng 09:00 - 11:30)">Thứ 7 tuần này (Sáng 09:00 - 11:30)</option>
                    <option value="Thứ 7 tuần này (Chiều 14:30 - 17:00)">Thứ 7 tuần này (Chiều 14:30 - 17:00)</option>
                    <option value="Chủ Nhật tuần này (Sáng 09:00 - 11:30)">Chủ Nhật tuần này (Sáng 09:00 - 11:30)</option>
                    <option value="Chủ Nhật tuần này (Chiều 14:30 - 17:00)">Chủ Nhật tuần này (Chiều 14:30 - 17:00)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer mt-2"
              >
                XÁC NHẬN ĐĂNG KÝ XEM NHÀ MẪU
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 13. FOOTER ════════════════ */}
      <footer className="bg-[#1E2530] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#9B1C1C] text-white flex items-center justify-center font-black">
                SP
              </div>
              <span className="font-black text-sm text-white uppercase tracking-wider">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Dự án căn hộ tiêu chuẩn resort nghỉ dưỡng hàng đầu. Khẳng định đẳng cấp sống thượng lưu đích thực.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG & NHÀ MẪU</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span>Hotline 24/7: <strong>{hotline}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>Email: {email}</span>
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-400">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">QUY CHUẨN PHÁP LÝ</h4>
            <p>✓ Quy hoạch chi tiết 1/500 phê duyệt bởi UBND thành phố.</p>
            <p>✓ Giấy phép xây dựng và nghiệm thu móng hoàn thành 100%.</p>
            <p>✓ Ngân hàng bảo lãnh tiến độ và hỗ trợ giải ngân 70%.</p>
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

      {/* ════════════════ 15. FLOATING BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 rounded-full bg-[#9B1C1C] hover:bg-[#801616] text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">Tư Vấn: {hotline}</span>
          <span className="sm:hidden">Gọi Hotline</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo Báo Giá</span>
        </a>
      </div>

    </div>
  );
}
