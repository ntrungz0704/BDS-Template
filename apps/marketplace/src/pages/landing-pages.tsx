import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Sparkles, Eye, ShoppingCart, CheckCircle2, ArrowRight, 
  Flame, Zap, Target, Smartphone, ShieldCheck, Download, 
  Calculator, Clock, MessageCircle, Phone, Star, Layers, HelpCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LANDING_TEMPLATES } from '../data/templatesData';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function LandingPagesPage() {
  const router = useRouter();
  const { addToCart, showToast } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const landingTemplates = LANDING_TEMPLATES;

  const categories = [
    { id: 'all', label: 'Tất Cả Mẫu' },
    { id: 'lp-01', label: 'Bán Căn Hộ Chung Cư' },
    { id: 'lp-02', label: 'Biệt Thự & Nghỉ Dưỡng VIP' },
    { id: 'lp-03', label: 'Đất Nền Phân Lô F0' },
    { id: 'lp-04', label: 'Sale Môi Giới BĐS Cá Nhân' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? landingTemplates 
    : landingTemplates.filter(t => t.id === selectedCategory);

  const handleBuyTemplate = (tpl: any) => {
    addToCart(tpl, 'BUY');
    showToast(`Đã thêm ${tpl.name} vào giỏ hàng!`, 'success');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Head>
        <title>Kho Mẫu Landing Page Chuyên Sale BĐS Chuyển Đổi Cao | PlatformBDS</title>
        <meta name="description" content="Kho mẫu landing page 1 trang chuyên biệt cho môi giới và sale bất động sản chạy ads Google, Facebook, TikTok đạt tỷ lệ chuyển đổi cao nhất." />
      </Head>

      <Header />

      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider shadow-inner">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Chuyên Biệt Dành Riêng Cho Sale BĐS Chạy Ads Chuyển Đổi Cao</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              KHO MẪU LANDING PAGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-teal-300">
                CHUYÊN DỤNG CHO SALE BẤT ĐỘNG SẢN
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Thiết kế chuẩn cấu trúc <strong>Single-Page Sales Funnel</strong> (1 Trang duy nhất). Không có menu dẫn ra ngoài gây mất khách, tập trung 100% vào việc thu hút khách để lại số điện thoại nhận Bảng Giá, Mặt Bằng và Đặt Lịch Xem Nhà.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl mx-auto text-xs">
              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col items-center gap-1.5">
                <Target className="w-5 h-5 text-red-400" />
                <span className="font-bold text-white">Tối Ưu Lead Ads 400%</span>
                <span className="text-[11px] text-slate-400">Không bị phân tán click</span>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col items-center gap-1.5">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-white">Countdown Đếm Ngược</span>
                <span className="text-[11px] text-slate-400">Thúc giục khách cọc sớm</span>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col items-center gap-1.5">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white">Bảng Tính Vay Ngân Hàng</span>
                <span className="text-[11px] text-slate-400">Tính lãi trả góp tự động</span>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col items-center gap-1.5">
                <Smartphone className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white">Nút Zalo & Gọi 1 Chạm</span>
                <span className="text-[11px] text-slate-400">Rung lắc nổi bật góc màn hình</span>
              </div>
            </div>

          </div>
        </section>

        {/* 2. FILTER TABS */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* 3. TEMPLATES GRID */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTemplates.map((tpl, index) => (
              <div
                key={tpl.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-md"
                      style={{ backgroundColor: tpl.badgeBg || '#2563EB' }}
                    >
                      {tpl.badge}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-lg font-black text-white drop-shadow-md">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                      {tpl.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
                  
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tpl.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Đặc điểm nổi bật dành cho Sale:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {tpl.features.slice(0, 4).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Giá sở hữu trọn đời:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-blue-600 font-mono">
                          {tpl.priceBuy.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono">
                          990.000 đ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/demo/${tpl.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Xem Demo</span>
                      </Link>

                      <button
                        onClick={() => handleBuyTemplate(tpl)}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 hover:scale-105 active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Mua Mẫu Này</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COMPARISON: LANDING PAGE VS MULTI-PAGE WEBSITE */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200 text-left">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Chiến Lược Kinh Doanh BĐS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                VÌ SAO SALE BĐS PHẢI DÙNG LANDING PAGE KHI CHẠY ADS?
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                Sự khác biệt rõ rệt giữa Website công ty và Landing Page chuyên dụng chạy chiến dịch bán hàng.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  <span>Website Công Ty Đa Trang (Multi-Pages)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">❌ Quá nhiều menu, link phụ làm khách bị phân tâm bấm lung tung.</li>
                  <li className="flex items-start gap-2">❌ Không có form đăng ký đập ngay vào mắt khi vừa vào trang.</li>
                  <li className="flex items-start gap-2">❌ Chi phí quảng cáo bị lãng phí vì tỷ lệ thoát trang cao.</li>
                  <li className="flex items-start gap-2">👉 <em>Phù hợp xây dựng uy tín thương hiệu lâu dài, làm SEO Google.</em></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
                  <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
                  <span>Landing Page Chuyên Dụng (Single-Page Funnel)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 1 Trang duy nhất dẫn dắt cảm xúc từ A-Z đến quyết định để lại SĐT.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Form thu Lead VIP kèm đồng hồ Countdown thúc giục khách cọc sớm.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Tối ưu chi phí mỗi lead quảng cáo rẻ hơn 3 - 5 lần.</li>
                  <li className="flex items-start gap-2">👉 <strong>Vũ khí bắt buộc phải có cho Sale BĐS khi chạy Ads Facebook / Google!</strong></li>
                </ul>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
