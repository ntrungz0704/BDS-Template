'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Star, Check
} from 'lucide-react';
import { PropertyImageGallery } from './PropertyImageGallery';

export interface LP04TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP04Template({
  template,
  company,
  projects,
}: LP04TemplateProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [budget, setBudget] = useState('Từ 3 - 5 Tỷ');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const galleryImages = [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white pb-16">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-md">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" alt="Chuyên viên BĐS" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-black text-slate-900 text-sm tracking-tight block">NGUYỄN THANH TÙNG</span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">Chuyên Viên BĐS Cao Cấp • 10 Năm Kinh Nghiệm</span>
          </div>
        </div>

        <a 
          href="tel:0905560000" 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>0905.560.000</span>
        </a>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white py-14 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-blue-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Top 1 Broker Phân Phối BĐS Trung Tâm 2025</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              TƯ VẤN ĐẦU TƯ BĐS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                AN TOÀN & SINH LỜI CAO
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Nắm giữ <strong>150+ căn hộ & nhà phố độc quyền</strong> giá cắt lỗ 15% - 25% so với thị trường. Hỗ trợ pháp lý, thương lượng giá tốt nhất và dẫn xem nhà trực tiếp 24/7.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-blue-400 font-mono">10+ Năm</span>
                <span className="block text-[11px] text-slate-300 font-medium">Kinh nghiệm thực chiến</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-blue-400 font-mono">500+</span>
                <span className="block text-[11px] text-slate-300 font-medium">Giao dịch thành công</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="text-xl font-black text-blue-400 font-mono">100%</span>
                <span className="block text-[11px] text-slate-300 font-medium">Hài lòng & Uy tín</span>
              </div>
            </div>
          </div>

          {/* Form Tìm Nhà Theo Yêu Cầu */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100 text-left">
            <h3 className="text-lg font-black text-slate-900">GỬI YÊU CẦU TÌM BĐS NHANH</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tôi sẽ gửi danh sách 3 căn giá tốt nhất qua Zalo của bạn.</p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-2 mt-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Đã Gửi Thành Công!</h4>
                <p className="text-xs text-emerald-700">Tùng sẽ chọn lọc giỏ hàng và gửi ngay thông tin chi tiết đến bạn.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-xs mt-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Anh / Chị Hoàng"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0905 560 000"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Khoảng tài chính dự kiến</label>
                  <select
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option value="Dưới 3 Tỷ">Dưới 3 Tỷ</option>
                    <option value="Từ 3 - 5 Tỷ">Từ 3 - 5 Tỷ</option>
                    <option value="Từ 5 - 10 Tỷ">Từ 5 - 10 Tỷ</option>
                    <option value="Trên 10 Tỷ">Trên 10 Tỷ (Biệt thự / Nhà phố VIP)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  📩 NHẬN DANH SÁCH CĂN CẮT LỖ NGAY
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 3. GALLERY SHOWCASE */}
      <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto text-left space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Giỏ Hàng Độc Quyền</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">MỘT SỐ CĂN GIÁ TỐT NỔI BẬT</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <PropertyImageGallery
            images={galleryImages}
            badge1="Cắt Lỗ 15%"
            badge2="Sẵn Sổ Đỏ"
            themeColor="blue"
          />
        </div>
      </section>

      {/* 4. FLOATING QUICK CONTACT BAR */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0905560000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white"
          title="Chat Zalo ngay"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:0905560000"
          className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white animate-bounce"
          title="Gọi Hotline ngay"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}
