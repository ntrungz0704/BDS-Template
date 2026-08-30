'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, FileCheck
} from 'lucide-react';
import { PropertyImageGallery } from '../PropertyImageGallery';

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
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [plotSize, setPlotSize] = useState('100m² (5x20m)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-600 selection:text-white pb-16">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white text-xs py-2.5 px-4 font-bold text-center flex items-center justify-center gap-3 shadow-sm">
        <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black text-[10px] uppercase">
          ⚡ MỞ BÁN F0 ĐỢT 1
        </span>
        <span>Sổ Đỏ Từng Lô Trao Tay — Giá Chỉ Từ 890 Triệu/Nền (Chiết khấu ngay 5 chỉ vàng)</span>
      </div>

      {/* 2. HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black shadow-md">
            LP
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block uppercase">PHÂN LÔ ECO LAND</span>
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Đô thị sinh thái ven đô</span>
          </div>
        </div>

        <a 
          href="tel:0983312219" 
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>0983 312 219</span>
        </a>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[560px] bg-slate-900 text-white overflow-hidden py-12 px-4 sm:px-8 flex items-center">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-bold">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Pháp Lý 1/500 Chuẩn Chỉnh — Sổ Đỏ Từng Lô</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              ĐẤT NỀN TRUNG TÂM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                GIÁ GỐC F0 CHỈ 890 TRIỆU
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Hạ tầng hoàn thiện đường nhựa 12m - 24m, điện âm nước máy, công viên cây xanh. Thanh toán linh hoạt chỉ 30% sang tên công chứng ngay.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-emerald-400 font-mono">100%</span>
                <span className="block text-[11px] text-slate-300 font-medium">Sổ hồng trao tay</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-emerald-400 font-mono">2X</span>
                <span className="block text-[11px] text-slate-300 font-medium">Biên độ tăng giá</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-emerald-400 font-mono">5 Chỉ</span>
                <span className="block text-[11px] text-slate-300 font-medium">Vàng 9999 khi cọc</span>
              </div>
            </div>
          </div>

          {/* Form Booking */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100 text-left">
            <h3 className="text-lg font-black text-slate-900">ĐĂNG KÝ XEM ĐẤT & NHẬN BẢN ĐỒ 1/500</h3>
            <p className="text-xs text-slate-500 mt-0.5">Xe đưa đón tận nơi miễn phí vào sáng Thứ 7 & Chủ Nhật.</p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-2 mt-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Đăng Ký Thành Công!</h4>
                <p className="text-xs text-emerald-700">Bộ phận điều xe sẽ liên hệ xác nhận giờ đón bạn đi xem thực tế.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs mt-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trần Quốc Tuấn"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0983 312 219"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Diện tích quan tâm</label>
                  <select
                    value={plotSize}
                    onChange={e => setPlotSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  >
                    <option value="100m² (5x20m)">Lô Nhà Phố: 100m² (5x20m)</option>
                    <option value="150m² (7.5x20m)">Lô Góc 2 Mặt Tiền: 150m² (7.5x20m)</option>
                    <option value="250m² (10x25m)">Lô Biệt Thự Vườn: 250m² (10x25m)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  🚗 ĐẶT LỊCH XE ĐÓN XEM ĐẤT MIỄN PHÍ
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto text-left space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Hạ Tầng Hoàn Thiện</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">HÌNH ẢNH THỰC TẾ DỰ ÁN</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <PropertyImageGallery
            images={galleryImages}
            badge1="Sổ Đỏ Riêng Từng Nền"
            badge2="Xây Dựng Tự Do"
            badge1Color="bg-emerald-600"
            themeColor="emerald"
          />
        </div>
      </section>

      {/* 5. FLOATING QUICK CONTACT BAR */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0983312219"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-emerald-400"
          title="Chat Zalo ngay"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:0983312219"
          className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white animate-bounce"
          title="Gọi Hotline ngay"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}
