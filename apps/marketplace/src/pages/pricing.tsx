import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ArrowLeft, Check, Star, Zap, Building, ArrowRight, CheckCircle2, 
  HelpCircle, Sparkles, ShieldCheck, Globe, Mail, Layout, BarChart, 
  Database, Server, Award, Clock, HeartHandshake, PhoneCall, ChevronDown, ChevronUp,
  Settings, DatabaseZap, Cloud
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PricingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAddons, setShowAddons] = useState(false);

  const faqs = [
    {
      q: "Website sau khi thiết kế tôi có được sở hữu vĩnh viễn không?",
      a: "Có! Với gói Thiết kế Website Chuyên Nghiệp 499.000đ, bạn sở hữu vĩnh viễn 100% giao diện và mã nguồn đã chọn. Bạn có toàn quyền cấu hình, đăng bài và vận hành lâu dài."
    },
    {
      q: "Hosting và Domain có bắt đầu sử dụng ngay được không?",
      a: "Hoàn toàn được! Đội ngũ PlatformBDS hỗ trợ kích hoạt Hosting tốc độ cao và cấu hình trỏ tên miền riêng thương hiệu (.com, .vn) của bạn chỉ trong vòng 10-15 phút làm việc."
    },
    {
      q: "Gói bảo trì website 299.000đ/năm hỗ trợ những gì?",
      a: "Đội ngũ kỹ thuật sẽ thực hiện kiểm tra bảo mật định kỳ, tự động sao lưu dữ liệu toàn bộ tin đăng hàng tuần, xử lý nhanh mọi lỗi phát sinh khi vận hành và tối ưu hóa tốc độ tải trang giúp website của bạn luôn chạy mượt mà trong suốt 12 tháng."
    },
    {
      q: "Tôi đã có sẵn Hosting và Tên miền riêng, tôi có thể chỉ mua gói thiết kế không?",
      a: "Được chứ! Bạn chỉ cần chọn gói Thiết kế giao diện 499.000đ, chúng tôi hỗ trợ đóng gói và chuyển giao toàn bộ mã nguồn ZIP hoặc hỗ trợ cài đặt thẳng lên máy chủ/hosting hiện có của bạn hoàn toàn miễn phí."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      <Head>
        <title>Bảng Giá Dịch Vụ Website Bất Động Sản - TEMPLATES BDS</title>
        <meta name="description" content="Sở hữu website bất động sản chuyên nghiệp giúp bạn thu hút khách hàng tiềm năng và chốt giao dịch mỗi ngày." />
      </Head>

      <Header 
        onSearch={() => {}} 
        onOpenConsultation={() => router.push('/contact')} 
        onOpenAuth={() => router.push('/login')}
      />

      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-[80px] sm:py-[100px]">
        {/* Header Section */}
        <div className="max-w-[760px] mx-auto mb-12 text-center space-y-4 animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang chủ</span>
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 inline-block mb-3">
              BẢNG GIÁ DỊCH VỤ WEBSITE BĐS
            </span>
          </div>
          <h1 className="text-slate-900 tracking-tight leading-[1.15] text-[36px] sm:text-[48px] lg:text-[56px] font-bold">
            Giải Pháp Trọn Gói <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-blue-600 to-cyan-500">
              Vận Hành Ổn Định - Hỗ Trợ Lâu Dài
            </span>
          </h1>
          <p className="text-slate-600 text-[16px] sm:text-[17px] font-medium leading-[1.7] max-w-2xl mx-auto">
            Giải pháp toàn diện tối ưu chi phí cho môi giới và sàn giao dịch. Thiết kế chuẩn SEO, bảo trì ổn định và hosting tốc độ cao.
          </p>
        </div>

        {/* CORE COMMERCIAL SOLUTIONS (2 COLS LAYOUT: DESIGN VS SERVICES BOX) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 animate-fade-up">
          
          {/* LEFT: 1. WEBSITE CHUYÊN NGHIỆP (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white border-2 border-blue-500 rounded-[28px] p-8 sm:p-9 flex flex-col justify-between shadow-xl shadow-blue-500/5 relative hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-widest shadow-md whitespace-nowrap flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GÓI THIẾT KẾ</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-sm font-black uppercase tracking-wider text-blue-600">WEBSITE CHUYÊN NGHIỆP</span>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">499.000đ</span>
                  <span className="text-xs font-bold text-blue-600 ml-1">/ TRỌN GÓI</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 mt-1">🎁 Bàn giao nhanh – Hỗ trợ tận tâm</div>
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed border-b border-slate-100 pb-5 mb-6">
                Thiết kế chuẩn chỉnh, tối ưu hiển thị, sẵn sàng kết nối dự án và giới thiệu thông tin của bạn chuyên nghiệp.
              </p>
              <div className="space-y-3.5 mb-8">
                <ul className="space-y-3 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Thiết kế giao diện theo yêu cầu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Tương thích mọi thiết bị (Mobile, Tablet, PC)</span>
                  </li>
                  <li className="flex items-start gap-3 font-semibold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Chuẩn SEO – Tốc độ tối ưu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Tích hợp liên hệ, bản đồ, mạng xã hội</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Dễ dàng quản trị – Hướng dẫn sử dụng</span>
                  </li>
                  <li className="flex items-start gap-3 font-semibold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                    <span>Bảo hành lỗi giao diện 30 ngày</span>
                  </li>
                </ul>
              </div>
            </div>
            <button 
              onClick={() => router.push('/templates')}
              className="mt-auto w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <span>Xem mẫu & Thiết kế ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: SHARED OPERATIONS SERVICES CONTAINER (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-slate-200/40 border border-slate-200/80 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Header inside Box */}
              <div className="text-[11px] font-black text-indigo-700 uppercase tracking-widest mb-6 text-center bg-indigo-50 border border-indigo-100 rounded-full py-2">
                ✨ CÁC GÓI DỊCH VỤ VẬN HÀNH & DUY TRÌ WEBSITE (TÙY CHỌN ĐÍNH KÈM)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* 2. BẢO TRÌ WEBSITE */}
                <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200">
                  <div>
                    <span className="text-[10px] font-black text-white bg-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                      GÓI DỊCH VỤ 01
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2">BẢO TRÌ WEBSITE</h3>
                    <div className="mb-4">
                      <span className="text-2xl font-black text-slate-900">299.000đ</span>
                      <span className="text-[10px] font-bold text-emerald-600 ml-1">/ NĂM</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-650 font-medium mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Cập nhật, kiểm tra định kỳ</span>
                      </li>
                      <li className="flex items-start gap-2 font-bold text-slate-800">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Sao lưu dữ liệu hàng tuần</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Xử lý lỗi phát sinh lập tức</span>
                      </li>
                      <li className="flex items-start gap-2 font-bold text-slate-800">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Tối ưu tốc độ & bảo mật</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => router.push('/contact')}
                    className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Đăng ký bảo trì</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. HOSTING & DOMAIN */}
                <div className="bg-white border-2 border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200">
                  <div>
                    <span className="text-[10px] font-black text-white bg-purple-600 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
                      GÓI DỊCH VỤ 02
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2">HOSTING & DOMAIN</h3>
                    <div className="mb-4">
                      <span className="text-2xl font-black text-slate-900">799.000đ</span>
                      <span className="text-[10px] font-bold text-purple-600 ml-1">/ NĂM</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-655 font-medium mb-6">
                      <li className="flex items-start gap-2 font-bold text-slate-800">
                        <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span>Hosting tốc độ cao 99.9%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span>Băng thông & dung lượng lớn</span>
                      </li>
                      <li className="flex items-start gap-2 font-bold text-slate-800">
                        <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span>Tên miền thương hiệu riêng</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                        <span>SSL bảo mật HTTPS miễn phí</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => router.push('/contact')}
                    className="w-full h-10 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Đăng ký hạ tầng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ACCORDION ADD-ON SERVICES */}
        <div className="max-w-[900px] mx-auto mb-16 animate-fade-up">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md">
            <button 
              onClick={() => setShowAddons(!showAddons)}
              className="w-full px-8 py-5 flex items-center justify-between font-bold text-base text-slate-900 hover:bg-slate-55 transition-all text-left"
            >
              <span className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-blue-605" />
                <span>Xem danh sách Dịch vụ nâng cấp thêm (Add-On Services)</span>
              </span>
              {showAddons ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {showAddons && (
              <div className="px-8 pb-8 pt-2 border-t border-slate-100 divide-y divide-slate-105">
                {[
                  { name: "Email doanh nghiệp chuyên nghiệp (VD: contact@brand.vn)", price: "199.000đ / năm" },
                  { name: "Thiết kế Landing Page dự án mới để chạy Ads", price: "699.000đ / trang" },
                  { name: "Thiết kế thêm mẫu Template riêng theo yêu cầu", price: "499.000đ / mẫu" },
                  { name: "Cài đặt đo lường Google Analytics 4 & GTM", price: "199.000đ / lần" },
                  { name: "Cài đặt Facebook Pixel & Conversion API", price: "199.000đ / lần" },
                  { name: "Hỗ trợ nhập liệu 20-50 dự án mẫu chuẩn SEO", price: "299.000đ / lần" },
                  { name: "Triển khai hệ thống trên máy chủ VPS riêng biệt", price: "699.000đ / lần" },
                  { name: "Khóa đào tạo trực tiếp quản trị CMS & SEO cho đội ngũ", price: "499.000đ / buổi" }
                ].map((item, idx) => (
                  <div key={idx} className="py-3.5 flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="text-blue-600 font-bold shrink-0 ml-4">{item.price}</span>
                  </div>
                ))}
                <div className="pt-6 text-center">
                  <button 
                    onClick={() => alert("Vui lòng gọi hotline 0919 006 030 để đăng ký thêm các dịch vụ nâng cấp!")}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-500/20"
                  >
                    Liên hệ để thêm dịch vụ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COMPARISON TABLE SECTION */}
        <div className="mb-24 animate-fade-up max-w-[1200px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-slate-900">
            Tại sao 90% Môi giới chọn PlatformBDS để phát triển thương hiệu trực tuyến?
          </h2>
          <div className="overflow-x-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-4 font-bold text-base w-1/3">Tiêu chí so sánh</th>
                  <th className="pb-4 font-bold text-base text-[#2563EB] w-1/3">Giải pháp PlatformBDS</th>
                  <th className="pb-4 font-bold text-base text-slate-500 w-1/3">Tự thuê ngoài truyền thống</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Thời gian triển khai</td>
                  <td className="py-4 text-emerald-600 font-bold">⚡ Cực nhanh (Bàn giao sau vài giờ)</td>
                  <td className="py-4 text-slate-500">2 - 5 ngày làm việc với kỹ thuật bên ngoài</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Cấu hình Server & Tối ưu</td>
                  <td className="py-4 text-slate-800 font-semibold">Được tối ưu riêng cho BĐS, tải hình ảnh siêu nhanh</td>
                  <td className="py-4 text-slate-500">Cấu hình chung, tự cài đặt cache, dễ chậm trễ</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Chi phí lập trình viên bảo trì</td>
                  <td className="py-4 text-emerald-600 font-bold">Giá cực rẻ — Đội ngũ IT chuyên biệt chăm sóc</td>
                  <td className="py-4 text-slate-500">Từ 2.000.000đ - 5.000.000đ / lần khi web gặp sự cố</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Cập nhật tính năng mới</td>
                  <td className="py-4 text-slate-800 font-semibold">Tự động nâng cấp miễn phí theo hệ thống</td>
                  <td className="py-4 text-slate-500">Mã nguồn cũ, phải bỏ chi phí thuê làm tính năng mới</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Bảo mật & Chống hacker</td>
                  <td className="py-4 text-emerald-600 font-bold">🛡️ Tường lửa đám mây & Backup mỗi tuần</td>
                  <td className="py-4 text-slate-500">Tự quản lý rủi ro, dính mã độc mất toàn bộ tin đăng</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION: BẠN SẼ NHẬN ĐƯỢC GÌ? */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 sm:p-12 mb-24 shadow-md max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-55 px-3.5 py-1 rounded-full border border-emerald-202 inline-block mb-3">
              GIẢI PHÁP TRỌN GÓI 100%
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-slate-900 leading-tight">
              Cam Kết Hài Lòng Tuyệt Đối Khi Đồng Hành
            </h2>
            <p className="text-slate-650 text-[15px] mt-2 font-normal">
              Chúng tôi mang đến giải pháp tối ưu từ hạ tầng đến chất lượng giao diện giúp bạn bức phá doanh số.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Zap, title: "Khởi tạo nhanh chóng", desc: "Không chờ đợi, website lên sóng và hoạt động mượt mà sau khi hoàn tất thiết kế." },
              { icon: Globe, title: "Thương hiệu chuyên nghiệp", desc: "Dễ dàng chia sẻ đường link dự án chuẩn SEO và ấn tượng cho khách hàng." },
              { icon: Layout, title: "Chuẩn hiển thị tuyệt đối", desc: "Tối ưu hiển thị mượt mà trên mọi màn hình điện thoại, máy tính bảng và laptop." },
              { icon: Database, title: "Tự đăng bán dễ dàng", desc: "Giao diện quản trị CMS siêu trực quan, đăng tin tức, hình ảnh chỉ với thao tác kéo thả." },
              { icon: Award, title: "Hình ảnh sắc nét", desc: "Hệ thống tự động tối ưu hóa sơ đồ dự án và mặt bằng căn hộ chất lượng cao." },
              { icon: HeartHandshake, title: "Quản lý khách hàng lead", desc: "Thông tin khách gửi tư vấn đều được lưu trữ trực quan và an toàn tuyệt đối." },
              { icon: BarChart, title: "Chuẩn SEO Google", desc: "Cấu trúc tối ưu thẻ heading, sitemap giúp dự án dễ dàng lên Top tìm kiếm Google." },
              { icon: Server, title: "Sao lưu mỗi tuần", desc: "Dữ liệu được sao lưu định kỳ hàng tuần giúp bạn không lo mất mát tin đăng." },
              { icon: ShieldCheck, title: "Bảo mật HTTPS SSL", desc: "Mã hóa SSL cao cấp bảo vệ dữ liệu khách hàng tuyệt đối và nâng cao uy tín." },
              { icon: PhoneCall, title: "Hỗ trợ kỹ thuật 24/7", desc: "Đội ngũ chuyên gia kỹ thuật tận tâm hỗ trợ xử lý nhanh mọi sự cố phát sinh." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-[20px] hover:bg-blue-50/50 hover:border-blue-500/30 transition-all duration-200 flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: FAQ (GIẢI TỎA THẮC MẮC TÂM LÝ KHÁCH HÀNG) */}
        <div id="faq" className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3.5 py-1 rounded-full inline-block mb-3 border border-slate-200">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-slate-900 leading-tight">
              Giải Đáp Mọi Thắc Mắc Trước Khi Bắt Đầu
            </h2>
            <p className="text-slate-655 text-[15px] mt-2 font-normal">
              Chúng tôi luôn sẵn sàng lắng nghe và giải đáp chi tiết nhất để bạn an tâm sở hữu website BĐS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-[20px] overflow-hidden transition-all duration-200 shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[16px] text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-blue-650 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-500 text-[14px] leading-[1.7] font-normal border-t border-slate-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
