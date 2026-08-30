'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play
} from 'lucide-react';
import { PropertyImageGallery } from '../PropertyImageGallery';

export interface LP02TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP02Template({
  template,
  company,
  projects,
}: LP02TemplateProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  ];

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-900 pb-16">
      
      {/* 1. TOP LUXURY BAR */}
      <div className="bg-[#141A29] border-b border-amber-500/30 text-amber-300 text-xs py-2.5 px-4 font-bold text-center flex items-center justify-center gap-3">
        <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          👑 BỘ SƯU TẬP GIỚI HẠN
        </span>
        <span>Chỉ 18 Căn Biệt Thự Đơn Lập Ven Sông — Tặng Du Thuyền Mini Cho 3 Chủ Nhân Đầu Tiên</span>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black shadow-md">
            EV
          </div>
          <div>
            <span className="font-black text-white text-sm tracking-widest block uppercase">THE ELITE SANCTUARY</span>
            <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-widest block">Dinh Thự Triệu Đô Hoàng Gia</span>
          </div>
        </div>

        <a 
          href="tel:0919006030" 
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>0919 006 030</span>
        </a>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[620px] overflow-hidden py-16 px-4 sm:px-8 flex items-center">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Biểu Tượng Vị Thế Thượng Lưu 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
              DINH THỰ VEN SÔNG <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                CHUẨN RESORT 6 SAO
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Không gian sống riêng tư biệt lập, diện tích từ <strong>450m² - 1200m²</strong>, hầm rượu vang riêng, bến đỗ du thuyền cá nhân và hồ bơi vô cực điện phân muối.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="#thu-vien-anh"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                KHÁM PHÁ BỘ SƯU TẬP
              </a>
              <a
                href="tel:0919006030"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Đặt Lịch Đón Xe VIP</span>
              </a>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5 bg-[#141A29] border border-amber-500/40 p-6 sm:p-8 rounded-3xl shadow-2xl text-left">
            <h3 className="text-lg font-black text-amber-400">NHẬN HỒ SƠ PHÁP LÝ & BẢNG GIÁ VIP</h3>
            <p className="text-xs text-slate-400 mt-1">Hồ sơ bảo mật sẽ được gửi riêng qua Chuyên viên cấp cao.</p>

            {isSubmitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-2 mt-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-300">Đã Ghi Nhận Yêu Cầu</h4>
                <p className="text-xs text-emerald-400/80">Giám đốc kinh doanh dự án sẽ liên hệ trực tiếp đến Quý khách.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs mt-5">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Danh xưng & Họ tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Ông / Bà Nguyễn Tuấn Anh"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0919 006 030"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 mt-2"
                >
                  👑 ĐĂNG KÝ TRẢI NGHIỆM THỰC TẾ VIP
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SHOWCASE */}
      <section id="thu-vien-anh" className="py-14 px-4 sm:px-8 max-w-6xl mx-auto text-left space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Kiệt Tác Kiến Trúc</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">THƯ VIỆN ẢNH THỰC TẾ DINH THỰ</h2>
        </div>

        <div className="bg-[#141A29] p-6 rounded-3xl border border-slate-800 shadow-xl">
          <PropertyImageGallery
            images={galleryImages}
            badge1="Biệt Thự Đơn Lập VIP"
            badge2="Sở Hữu Lâu Dài"
            badge1Color="bg-amber-600"
            themeColor="gold"
          />
        </div>
      </section>

      {/* 5. FLOATING QUICK CONTACT BAR */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0919006030"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-amber-400"
          title="Chat Zalo ngay"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:0919006030"
          className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white animate-bounce"
          title="Gọi Hotline ngay"
        >
          <Phone className="w-6 h-6 fill-current" />
        </a>
      </div>

    </div>
  );
}
