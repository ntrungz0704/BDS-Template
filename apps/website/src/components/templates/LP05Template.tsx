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

export interface LP05TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP05Template({
  template,
  company,
  projects,
}: LP05TemplateProps) {
  // Brand & Company info fallback from CMS
  const brandName = company?.name || 'GOLDEN PARK TOWER CẦU GIẤY';
  const companyGroup = 'TẬP ĐOÀN ĐẦU TƯ & PHÁT TRIỂN ĐÔ THỊ TÂY ĐÔ';
  const hotline = company?.phone || '0988.353.998';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'sales@goldenparktower.vn';
  const address = company?.address || 'Ngã tư Dương Đình Nghệ & Phạm Văn Bạch, KĐT Cầu Giấy, Yên Hòa, Cầu Giấy, Hà Nội';

  // Hero Lead Form State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroUnitType, setHeroUnitType] = useState('Căn Hộ 2 Phòng Ngủ (82.6m²)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Bottom Lead Form State
  const [bottomName, setBottomName] = useState('');
  const [bottomPhone, setBottomPhone] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');
  const [bottomUnit, setBottomUnit] = useState('Căn Hộ 2 Phòng Ngủ (82.6m²)');
  const [isBottomSubmitted, setIsBottomSubmitted] = useState(false);

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX Auto-Select Function
  const handleSelectUnit = (unitTitle: string) => {
    setHeroUnitType(unitTitle);
    setBottomUnit(unitTitle);
    const element = document.getElementById('hero-lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-unit-select') as HTMLSelectElement | null;
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

  // 9 Distinct Unit Designs with 3D Floor Layouts
  const unitList = [
    { code: 'CĂN SỐ 01', type: 'Căn Hộ 2 Phòng Ngủ', size: '82.6 m²', rooms: '2PN · 2WC · 2 Logia', price: 'Từ 3.4 Tỷ', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', fullName: 'Căn Hộ 2 Phòng Ngủ (82.6m²)' },
    { code: 'CĂN SỐ 02', type: 'Căn Hộ 2PN + 1 Đa Năng', size: '91.8 m²', rooms: '2PN + 1 · 2WC · Ban công lớn', price: 'Từ 3.8 Tỷ', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', fullName: 'Căn Hộ 2PN + 1 Đa Năng (91.8m²)' },
    { code: 'CĂN SỐ 03', type: 'Căn Hộ 3 Phòng Ngủ', size: '100.2 m²', rooms: '3PN · 2WC · Bếp riêng', price: 'Từ 4.2 Tỷ', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', fullName: 'Căn Hộ 3 Phòng Ngủ (100.2m²)' },
    { code: 'CĂN SỐ 04', type: 'Căn Hộ 3PN Góc Thoáng', size: '105.6 m²', rooms: '3PN · 2WC · 2 Mặt thoáng', price: 'Từ 4.5 Tỷ', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', fullName: 'Căn Hộ 3PN Góc Thoáng (105.6m²)' },
    { code: 'CĂN SỐ 05', type: 'Căn Hộ 3PN Master VIP', size: '116.0 m²', rooms: '3PN · 3WC · Phòng thay đồ', price: 'Từ 5.1 Tỷ', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', fullName: 'Căn Hộ 3PN Master VIP (116.0m²)' },
    { code: 'CĂN SỐ 06', type: 'Căn Hộ 3PN Panorama', size: '125.4 m²', rooms: '3PN · 3WC · View công viên', price: 'Từ 5.6 Tỷ', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', fullName: 'Căn Hộ 3PN Panorama (125.4m²)' },
    { code: 'CĂN SỐ 07', type: 'Căn Hộ 4 Phòng Ngủ Luxury', size: '132.5 m²', rooms: '4PN · 3WC · 3 Ban công', price: 'Từ 6.2 Tỷ', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', fullName: 'Căn Hộ 4 Phòng Ngủ Luxury (132.5m²)' },
    { code: 'CĂN SỐ 08', type: 'Duplex Thông Tầng', size: '185.0 m²', rooms: '4PN · 4WC · Sân vườn riêng', price: 'Từ 8.9 Tỷ', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80', fullName: 'Duplex Thông Tầng (185.0m²)' },
    { code: 'CĂN SỐ 09', type: 'Penthouse Hoàng Gia', size: '235.0 m²', rooms: '5PN · 5WC · Bể bơi chân mây', price: 'Từ 12.5 Tỷ', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', fullName: 'Penthouse Hoàng Gia (235.0m²)' },
  ];

  // Payment Schedule Breakdown (7 Stages)
  const paymentSchedule = [
    { stage: 'Đợt 1', percent: '30% GTCH', timeline: 'Ký Hợp đồng Mua bán chính thức (Sau khi cọc 100tr)' },
    { stage: 'Đợt 2', percent: '10% GTCH', timeline: 'Sau 45 ngày kể từ ngày ký HĐMB' },
    { stage: 'Đợt 3', percent: '10% GTCH', timeline: 'Sau 90 ngày kể từ ngày ký HĐMB (Đổ sàn tầng 20)' },
    { stage: 'Đợt 4', percent: '10% GTCH', timeline: 'Sau 135 ngày kể từ ngày ký HĐMB (Cất nóc tòa tháp)' },
    { stage: 'Đợt 5', percent: '10% GTCH', timeline: 'Sau 180 ngày kể từ ngày ký HĐMB (Hoàn thiện mặt ngoài)' },
    { stage: 'Đợt 6', percent: '25% GTCH + 2% KPBT', timeline: 'Nhận thông báo Bàn giao nhà & Khóa vân tay' },
    { stage: 'Đợt 7', percent: '5% GTCH', timeline: 'Nhận Giấy chứng nhận quyền sở hữu nhà (Sổ đỏ)' },
  ];

  // 6 Outstanding Amenities
  const amenitiesList = [
    { title: 'Bể Bơi Vô Cực 4 Mùa Trên Cao', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80' },
    { title: 'Sky Bar & Đài Quan Sát Tầng Thượng', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80' },
    { title: 'Bể Bơi Tràn Bờ Khối Đế Chuẩn A', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { title: 'Công Viên Cây Xanh & Lối Dạo Bộ', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
    { title: 'Trung Tâm Fitness & Yoga Quốc Tế', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
    { title: 'TTTM Khối Đế & Chuỗi Nhà Hàng VIP', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0A2E28] selection:text-amber-300">
      
      {/* ════════════════ 1. TOP NAVBAR (SHARP CRISP BORDERS) ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#0A2E28] text-white border-b border-[#C59B27]/40 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#C59B27] to-amber-300 text-[#0A2E28] flex items-center justify-center font-black">
              GP
            </div>
            <div>
              <span className="font-black text-sm tracking-wide text-amber-400 uppercase block leading-none">
                GOLDEN PARK TOWER
              </span>
              <span className="text-[9px] text-slate-300 uppercase tracking-wider block mt-0.5">
                TỔ HỢP CĂN HỘ CAO CẤP & KHÁCH SẠN 5 SAO CẦU GIẤY
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a href="#tong-quan" className="hover:text-amber-400 transition-colors">Tổng Quan</a>
            <a href="#chinh-sach" className="hover:text-amber-400 transition-colors">Chính Sách</a>
            <a href="#tien-do" className="hover:text-amber-400 transition-colors">Tiến Độ</a>
            <a href="#vi-tri" className="hover:text-amber-400 transition-colors">Vị Trí</a>
            <a href="#mat-bang" className="hover:text-amber-400 transition-colors">Mặt Bằng</a>
            <a href="#can-ho" className="hover:text-amber-400 transition-colors">Căn Hộ</a>
            <a href="#tien-ich" className="hover:text-amber-400 transition-colors">Tiện Ích</a>
          </nav>

          {/* Contact Fast */}
          <div className="flex items-center gap-4">
            <a href={`tel:${hotline}`} className="flex items-center gap-1.5 font-black text-amber-400 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#hero-lead-form"
              className="px-4 py-1.5 bg-[#C59B27] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
            >
              Đăng Ký
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & RED LEAD BOX ════════════════ */}
      <section className="relative bg-[#0C3832] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27] overflow-hidden">
        {/* Geometric Luxury Pattern Overlay */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Golden Park Headline & Box Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-widest">
                TÂM ĐIỂM KẾT NỐI VÀNG QUẬN CẦU GIẤY
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight uppercase leading-tight">
                GOLDEN PARK TOWER
              </h1>
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl">
                Căn hộ khách sạn tiêu chuẩn 5 sao sở hữu 4 mặt tiền trung tâm hành chính mới Cầu Giấy — Nơi an cư lý tưởng và đầu tư sinh lời vượt trội.
              </p>
            </div>

            {/* Sharp Architectural Specs Table */}
            <div className="bg-[#0A2E28]/90 border border-amber-400/40 p-5 text-xs text-slate-200 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">• Vị trí:</span>
                <span className="font-bold text-amber-300">{address}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">• Quy mô:</span>
                <span className="font-bold">1 Tòa tháp cao 45 tầng + 4 tầng hầm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">• Căn hộ:</span>
                <span className="font-bold">360 Căn hộ cao cấp & 240 Phòng khách sạn 5 sao</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">• Pháp lý:</span>
                <span className="font-bold text-emerald-400">Sổ hồng sở hữu lâu dài vĩnh viễn</span>
              </div>
            </div>
          </div>

          {/* Right: Red Box Direct Lead Form (Lưới Lọc Phễu Chuyển Đổi Số 1) */}
          <div id="hero-lead-form" className="lg:col-span-5">
            <div className="bg-[#C53030] border-2 border-amber-300 p-6 sm:p-8 shadow-2xl text-left relative">
              <div className="text-center mb-4 pb-3 border-b border-red-400/60">
                <span className="text-[11px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                  ƯU ĐÃI TRỰC TIẾP CHỦ ĐẦU TƯ
                </span>
                <h3 className="text-xl font-black text-white uppercase">
                  NHẬN BẢNG GIÁ GỐC ĐỢT 1
                </h3>
              </div>

              {isHeroSubmitted ? (
                <div className="bg-white text-slate-900 p-5 text-center space-y-2 animate-fadeIn border-2 border-amber-400">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-sm text-[#0C3832]">ĐÃ TIẾP NHẬN YÊU CẦU!</h4>
                  <p className="text-xs text-slate-600">
                    Phòng kinh doanh sẽ gọi lại qua số <strong>{heroPhone}</strong> và gửi file PDF bảng giá qua Zalo trong 3 phút.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-3 text-xs">
                  <div>
                    <input
                      type="text"
                      required
                      value={heroName}
                      onChange={(e) => setHeroName(e.target.value)}
                      placeholder="Họ và tên của Quý Khách *"
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={heroPhone}
                      onChange={(e) => setHeroPhone(e.target.value)}
                      placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black placeholder:text-slate-500 border border-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="Email nhận mặt bằng chi tiết"
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium placeholder:text-slate-500 border border-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <select
                      id="hero-unit-select"
                      value={heroUnitType}
                      onChange={(e) => setHeroUnitType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none transition-all duration-300"
                    >
                      {unitList.map((u, idx) => (
                        <option key={idx} value={u.fullName}>
                          {u.code}: {u.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C59B27] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mt-1"
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

        </div>
      </section>

      {/* ════════════════ 3. TỔNG QUAN DỰ ÁN & CHÍNH SÁCH BÁN HÀNG ════════════════ */}
      <section id="tong-quan" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Structured Specs Table */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase border-l-4 border-[#C59B27] pl-3">
              TỔNG QUAN DỰ ÁN
            </h2>

            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 w-1/3 border-r border-slate-200">• Tên dự án:</td>
                  <td className="p-3 font-black text-[#0A2E28]">GOLDEN PARK TOWER CẦU GIẤY</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Chủ đầu tư:</td>
                  <td className="p-3 font-medium">{companyGroup}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Vị trí tọa lạc:</td>
                  <td className="p-3 font-medium">{address}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Tổng diện tích:</td>
                  <td className="p-3 font-medium">4.576 m² (Mật độ xây dựng 45%)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Quy mô xây dựng:</td>
                  <td className="p-3 font-medium">45 Tầng nổi + 4 Tầng hầm để xe thông minh</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Cơ cấu diện tích:</td>
                  <td className="p-3 font-medium">82.6m² – 132.5m² (2PN - 4PN & Duplex, Penthouse)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Hình thức sở hữu:</td>
                  <td className="p-3 font-bold text-emerald-700">Sổ hồng lâu dài vĩnh viễn</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Thời gian bàn giao:</td>
                  <td className="p-3 font-medium">Đang bàn giao nhà hoàn thiện ngay</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column: Tower Photo & Policy Box */}
          <div id="chinh-sach" className="lg:col-span-5 space-y-4">
            <div 
              className="relative border-2 border-slate-300 aspect-[4/3] bg-slate-900 group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
                alt="Phối Cảnh Golden Park Tower"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
                <span className="text-xs font-bold text-amber-400">Hình ảnh phối cảnh thực tế Golden Park Tower</span>
              </div>
            </div>

            {/* Sharp Policy Box */}
            <div className="bg-[#FFFDF9] border-2 border-[#C59B27] p-5 text-left space-y-3">
              <h4 className="font-black text-sm text-[#0A2E28] uppercase border-b border-[#C59B27]/40 pb-2">
                CHÍNH SÁCH BÁN HÀNG THÁNG MỚI NHẤT
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <p>✓ <strong>Chiết khấu ngay 8.5%</strong> giá trị căn hộ khi thanh toán sớm 95%.</p>
                <p>✓ <strong>Hỗ trợ vay 70%</strong> lãi suất 0% và ân hạn nợ gốc trong 18 tháng.</p>
                <p>✓ <strong>Tặng gói nội thất Smart Home</strong> trị giá 80.000.000đ.</p>
                <p>✓ <strong>Miễn phí 2 năm</strong> phí quản lý dịch vụ khách sạn cao cấp.</p>
              </div>

              <div className="pt-2">
                <a
                  href="#hero-lead-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A2E28] hover:bg-[#0C3832] text-amber-300 font-bold text-xs uppercase transition-all"
                >
                  <span>TẢI BẢNG TÍNH DÒNG TIỀN VAY</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 4. TIẾN ĐỘ THANH TOÁN THÔNG THƯỜNG (BẢNG KẺ CHUẨN) ════════════════ */}
      <section id="tien-do" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
              LỘ TRÌNH TÀI CHÍNH LINH HOẠT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">
              TIẾN ĐỘ THANH TOÁN THÔNG THƯỜNG
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-xs text-left bg-white shadow-sm">
              <thead className="bg-[#0A2E28] text-white">
                <tr>
                  <th className="p-3 border border-slate-300 w-24 text-center">ĐỢT</th>
                  <th className="p-3 border border-slate-300 w-36 text-center">TỶ LỆ (%)</th>
                  <th className="p-3 border border-slate-300">THỜI HẠN THANH TOÁN</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">{item.stage}</td>
                    <td className="p-3 border border-slate-300 text-center font-black text-[#C53030]">{item.percent}</td>
                    <td className="p-3 border border-slate-300 font-medium text-slate-700">{item.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <a
              href="#hero-lead-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C59B27] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow"
            >
              <span>ĐĂNG KÝ TƯ VẤN GÓI VAY NGÂN HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 5. VỊ TRÍ DỰ ÁN THUẬN LỢI GIAO THÔNG ════════════════ */}
      <section id="vi-tri" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
              TRUNG TÂM HÀNH CHÍNH MỚI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">
              VỊ TRÍ DỰ ÁN THUẬN LỢI GIAO THÔNG
            </h2>
          </div>

          <div 
            className="relative border-4 border-[#0A2E28] aspect-[16/9] max-h-[460px] bg-slate-900 group cursor-pointer"
            onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
          >
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
              alt="Bản đồ giao thông Golden Park Tower"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-[#0A2E28] text-amber-300 px-3 py-1 text-xs font-bold flex items-center gap-1 border border-amber-400">
              <ZoomIn className="w-3.5 h-3.5" /> Bấm xem phóng to sơ đồ
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs text-slate-700 leading-relaxed font-medium">
            <div className="p-4 bg-slate-50 border border-slate-200">
              <p>• Tọa lạc ngay ngã tư đường Dương Đình Nghệ và Phạm Văn Bạch, đối diện Tổng Cục Hải Quan và tòa nhà Viettel Group, cách Công viên Cầu Giấy chỉ 300m.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200">
              <p>• Kết nối trực thông trục đường Vành Đai 3, Phạm Hùng, Trung Kính, chỉ 5 phút tới Keangnam Landmark 72, Bệnh viện Huyết Học TW và Đại học Quốc Gia Hà Nội.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 6. MẶT BẰNG TẦNG ĐIỂN HÌNH ════════════════ */}
      <section id="mat-bang" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8 text-center">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
              QUY HOẠCH KHÔNG GIAN THÔNG MINH
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">
              MẶT BẰNG TẦNG ĐIỂN HÌNH
            </h2>
          </div>

          {/* Master Floor Layout Graphic */}
          <div 
            className="border-4 border-[#0C3832] bg-white p-4 group cursor-pointer shadow-md"
            onClick={() => setZoomImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
              alt="Mặt bằng tầng điển hình Golden Park"
              className="w-full object-cover max-h-[500px]"
            />
            <div className="pt-3 flex justify-between items-center text-xs border-t border-slate-200 mt-3 text-slate-600">
              <span>Sơ đồ bố trí 16 căn hộ / sàn với 6 thang máy tốc độ cao Schindler</span>
              <span className="text-[#C59B27] font-bold flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Phóng to chi tiết
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 7. THIẾT KẾ CĂN HỘ (LƯỚI 9 CĂN + UX AUTO-SELECT) ════════════════ */}
      <section id="can-ho" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
              BỘ SƯU TẬP KHÔNG GIAN SỐNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A2E28] uppercase">
              THIẾT KẾ CĂN HỘ GOLDEN PARK TOWER
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Bấm vào từng căn hộ dưới đây để chọn trực tiếp và nhận báo giá chi tiết từ CĐT
            </p>
          </div>

          {/* 9 Units Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitList.map((u, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-slate-200 hover:border-[#C59B27] transition-all flex flex-col justify-between text-left group shadow-xs hover:shadow-lg"
              >
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setZoomImage(u.image)}
                >
                  <img
                    src={u.image}
                    alt={u.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#0A2E28] text-amber-300 font-bold text-[10px]">
                    {u.code}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#C53030] text-white font-bold text-[10px]">
                    {u.size}
                  </div>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-[#0A2E28] group-hover:text-red-700 transition-colors">
                      {u.type}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      {u.rooms}
                    </p>
                    <p className="text-sm font-black text-[#C53030]">
                      Giá: {u.price}
                    </p>
                  </div>

                  {/* UX Auto-Select Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectUnit(u.fullName)}
                    className="w-full py-2 bg-[#0A2E28] hover:bg-[#C59B27] hover:text-slate-950 text-amber-300 font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>NHẬN BÁO GIÁ CĂN NÀY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 8. THƯ VIỆN ẢNH & TIỆN ÍCH VƯỢT TRỘI ════════════════ */}
      <section id="tien-ich" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-widest">
              ĐẶC QUYỀN NGHỈ DƯỠNG TẠI GIA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A2E28] uppercase">
              TIỆN ÍCH VƯỢT TRỘI 5 SAO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenitiesList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 9. VIDEO GIỚI THIỆU DỰ ÁN ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A2E28] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              THỰC TẾ TRẢI NGHIỆM
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">
              VIDEO GIỚI THIỆU DỰ ÁN
            </h2>
          </div>

          <div className="relative border-4 border-[#C59B27] bg-slate-950 aspect-video group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
              alt="Video Poster Golden Park"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80')}
                className="w-16 h-16 bg-[#C59B27] text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider bg-black/70 px-3 py-1 border border-white/20">
                Xem video phóng sự thực tế Golden Park Tower
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 10. FORM NHẬN BÁNG GIÁ CUỐI TRANG (Lưới Lọc Phễu Số 2) ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0C3832] border-t-4 border-[#C59B27]">
        <div className="max-w-4xl mx-auto bg-[#0A2E28] border-2 border-[#C59B27] p-8 sm:p-10 text-center space-y-6">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              ĐĂNG KÝ TRỰC TIẾP TỪ CHỦ ĐẦU TƯ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
              NHẬN BẢNG GIÁ & CHÍNH SÁCH ƯU ĐÃI
            </h3>
            <p className="text-xs text-slate-300">
              Cam kết thông tin chính xác 100% từ phòng kinh doanh Golden Park Tower
            </p>
          </div>

          {isBottomSubmitted ? (
            <div className="bg-white text-slate-900 p-6 text-center space-y-2 border-2 border-amber-400">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-[#0A2E28]">GỬI YÊU CẦU THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-600">
                Chuyên viên sẽ liên hệ lại qua số <strong>{bottomPhone}</strong> trong vòng 3 phút làm việc.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBottomSubmit} className="max-w-xl mx-auto space-y-3.5 text-xs text-left">
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
                  value={bottomUnit}
                  onChange={(e) => setBottomUnit(e.target.value)}
                  className="px-4 py-3 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                >
                  {unitList.map((u, idx) => (
                    <option key={idx} value={u.fullName}>
                      {u.code}: {u.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C59B27] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
              >
                GỬI YÊU CẦU NHẬN BẢNG GIÁ
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 11. FOOTER ════════════════ */}
      <footer className="bg-[#051C18] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C59B27] text-slate-950 flex items-center justify-center font-black">
                GP
              </div>
              <span className="font-black text-sm text-amber-400 uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Trực thuộc {companyGroup}. Tổ hợp khách sạn và căn hộ cao cấp 5 sao chuẩn mực tại trung tâm Cầu Giấy.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">PHÒNG KINH DOANH DỰ ÁN</h4>
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
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">QUY CHUẨN PHÁP LÝ</h4>
            <p>✓ Giấy phép xây dựng số 78/GPXD cấp bởi Sở Xây Dựng Hà Nội.</p>
            <p>✓ Cục Giám Định Nhà Nước nghiệm thu đưa vào sử dụng.</p>
            <p>✓ Ngân hàng Vietcombank bảo lãnh và hỗ trợ vay 70%.</p>
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
          className="px-4 py-2.5 bg-[#C53030] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition"
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
