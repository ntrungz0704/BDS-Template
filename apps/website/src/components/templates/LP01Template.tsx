'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle
} from 'lucide-react';
import { PropertyImageGallery } from './PropertyImageGallery';

export interface LP01TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP01Template({
  template,
  company,
  projects,
}: LP01TemplateProps) {
  // Form lead state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [interestType, setInterestType] = useState('2PN (75m² - 85m²)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFloorTab, setActiveFloorTab] = useState<'1pn' | '2pn' | '3pn' | 'penthouse'>('2pn');

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(3000); // triệu
  const [loanMonths, setLoanMonths] = useState<number>(240); // tháng
  const [interestRate, setInterestRate] = useState<number>(7.5); // %

  const monthlyPayment = Math.round(
    (loanAmount * 1000000) / loanMonths + ((loanAmount * 1000000 * (interestRate / 100)) / 12)
  );

  // Countdown timer: 3 ngày đếm ngược ưu đãi đợt 1
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 35, seconds: 12 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-white pb-16">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Đếm ngược ưu đãi) */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs py-2.5 px-4 font-bold text-center flex items-center justify-center gap-3 shadow-md">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">🔥 ƯU ĐÃI ĐỢT 1</span>
        <span>Chiết khấu 10% + Tặng 1 Cây Vàng 9999 cho 20 khách hàng cọc sớm nhất</span>
        <div className="flex items-center gap-1 font-mono bg-black/40 px-2.5 py-0.5 rounded-md text-amber-300">
          <Clock className="w-3.5 h-3.5" />
          <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black shadow-md">
            MC
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block">METROPOLIS CONDOS</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tuyệt tác căn hộ bên hồ</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <a href="#tong-quan" className="hover:text-blue-600">Tổng Quan</a>
          <a href="#vi-tri" className="hover:text-blue-600">Vị Trí Vàng</a>
          <a href="#mat-bang" className="hover:text-blue-600">Mặt Bằng Căn</a>
          <a href="#thu-vien-anh" className="hover:text-blue-600">Thư Viện Ảnh</a>
          <a href="#chinh-sach" className="hover:text-blue-600">Chính Sách Bán Hàng</a>
        </div>

        <a 
          href="tel:0905568888" 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Phone className="w-3.5 h-3.5 animate-bounce" />
          <span>0905.568.888</span>
        </a>
      </header>

      {/* 3. HERO SECTION WITH LEAD CAPTURE FORM */}
      <section className="relative min-h-[580px] bg-slate-900 text-white overflow-hidden py-12 px-4 sm:px-8 flex items-center">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Value Propositions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chính Thức Nhận Booking Đợt 1 — Giá Gốc Chủ Đầu Tư</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              CĂN HỘ CAO CẤP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
                VIEW TRỌN MẶT HỒ
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Sở hữu căn hộ hạng sang trung tâm Ba Đình chỉ từ <strong>3.2 Tỷ/căn</strong>. Thanh toán 15% nhận nhà ngay, ngân hàng hỗ trợ vay 70% ân hạn nợ gốc 24 tháng.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-amber-400 font-mono">15%</span>
                <span className="block text-[11px] text-slate-300 font-medium">Nhận nhà ở ngay</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-amber-400 font-mono">0%</span>
                <span className="block text-[11px] text-slate-300 font-medium">Lãi suất 24 tháng</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-amber-400 font-mono">10%</span>
                <span className="block text-[11px] text-slate-300 font-medium">Chiết khấu mở bán</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Lead Form */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100 text-left">
            <div className="mb-4">
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase">
                Cam kết bảo mật 100%
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">ĐĂNG KÝ NHẬN BẢNG GIÁ & ƯU ĐÃI</h3>
              <p className="text-xs text-slate-500 mt-0.5">Chuyên viên trực tiếp chủ đầu tư gửi tài liệu trong 2 phút.</p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Đăng Ký Thành Công!</h4>
                <p className="text-xs text-emerald-700">Chuyên viên tư vấn sẽ liên hệ gửi trọn bộ Bảng Giá & Mặt Bằng qua Zalo của bạn ngay.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên của bạn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại / Zalo nhận tài liệu *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912 345 678"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Loại căn hộ quan tâm</label>
                  <select
                    value={interestType}
                    onChange={e => setInterestType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option value="1PN (48m² - 55m²)">1 Phòng Ngủ (48m² - 55m²)</option>
                    <option value="2PN (75m² - 85m²)">2 Phòng Ngủ (75m² - 85m²)</option>
                    <option value="3PN (110m² - 135m²)">3 Phòng Ngủ (110m² - 135m²)</option>
                    <option value="Duplex & Penthouse VIP">Duplex & Penthouse VIP</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  📥 NHẬN TRỌN BỘ BẢNG GIÁ & CHÍNH SÁCH VIP
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. GALLERY & HÌNH ẢNH THỰC TẾ (MULTI-IMAGES GALLERY WITH 3S AUTO-SLIDE & ZOOM) */}
      <section id="thu-vien-anh" className="py-12 px-4 sm:px-8 max-w-6xl mx-auto text-left space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Không Gian Thực Tế</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">THƯ VIỆN HÌNH ẢNH DỰ ÁN</h2>
          <p className="text-xs text-slate-500">Chiêm ngưỡng thực tế từng góc không gian sống thượng lưu đạt chuẩn 5 sao.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <PropertyImageGallery
            images={galleryImages}
            badge1="Căn Hộ Mẫu 5 Sao"
            badge2="View Hồ Tuyệt Đẹp"
            themeColor="blue"
          />
        </div>
      </section>

      {/* 5. MẶT BẰNG & THIẾT KẾ CĂN HỘ */}
      <section id="mat-bang" className="py-12 px-4 sm:px-8 bg-white border-y border-slate-200 text-left">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mặt Bằng Điển Hình</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">LAYOUT THIẾT KẾ CĂN HỘ</h2>
            <p className="text-xs text-slate-500">Tối ưu 100% công năng sử dụng, mọi phòng ngủ đều đón ánh sáng tự nhiên.</p>
          </div>

          {/* Floor tabs */}
          <div className="flex justify-center gap-2">
            {[
              { key: '1pn', label: 'Căn 1PN (52m²)' },
              { key: '2pn', label: 'Căn 2PN (82m²)' },
              { key: '3pn', label: 'Căn 3PN (120m²)' },
              { key: 'penthouse', label: 'Penthouse (280m²)' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFloorTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeFloorTab === tab.key
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="lg:col-span-7 rounded-xl overflow-hidden bg-white border border-slate-200 p-4 shadow-sm">
              <img
                src={
                  activeFloorTab === '1pn' ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80' :
                  activeFloorTab === '2pn' ? 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80' :
                  activeFloorTab === '3pn' ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80' :
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80'
                }
                alt="Mặt bằng căn hộ"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                {activeFloorTab.toUpperCase()} MASTER SUITE
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {activeFloorTab === '1pn' ? 'Căn Hộ Studio & 1 Phòng Ngủ' :
                 activeFloorTab === '2pn' ? 'Căn Hộ 2 Phòng Ngủ 2WC View Hồ' :
                 activeFloorTab === '3pn' ? 'Căn Hộ 3 Phòng Ngủ Panorama Góc' :
                 'Dinh Thự Trên Không Sky Penthouse'}
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ban công kính tràn viền 100% kính Low-E</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Thiết bị vệ sinh Kohler nhập khẩu Đức</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hệ thống Smarthome điều khiển giọng nói</li>
              </ul>
              <a
                href="tel:0905568888"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <span>Xem Nhà Mẫu Thực Tế</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BẢNG TÍNH LÃI VAY NGÂN HÀNG TRỰC TIẾP */}
      <section id="chinh-sach" className="py-12 px-4 sm:px-8 max-w-5xl mx-auto text-left">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Công Cụ Tài Chính Thông Minh</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">DỰ TÍNH KHOẢN VAY MUA NHÀ</h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Lãi suất ưu đãi 7.5%/năm</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Số tiền cần vay (Triệu đồng)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold font-mono focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Thời gian vay (Tháng)</label>
              <input
                type="number"
                value={loanMonths}
                onChange={e => setLoanMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold font-mono focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">Lãi suất hàng năm (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold font-mono focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-4 border border-white/10">
            <div>
              <span className="text-xs text-slate-300">Số tiền gốc + lãi trả hàng tháng ước tính:</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                {monthlyPayment.toLocaleString('vi-VN')} VNĐ / tháng
              </div>
            </div>
            <a
              href="tel:0905568888"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>NHẬN LỊCH TRẢ NỢ CHI TIẾT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FLOATING QUICK CONTACT BAR (Nút rung lắc gọi & chat Zalo góc màn hình) */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0905568888"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white"
          title="Chat Zalo ngay"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:0905568888"
          className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white animate-bounce"
          title="Gọi Hotline ngay"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}
