'use client';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Flame,
  Compass, Plane, Sun, Waves, FileText, CheckSquare
} from 'lucide-react';

export interface LP07TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
}

export default function LP07Template({
  template,
  company,
  projects,
}: LP07TemplateProps) {
  // Brand & Company Info Fallback from CMS
  const brandName = company?.name || 'NOVAWORLD PHAN THIẾT';
  const companyGroup = 'TẬP ĐOÀN NOVALAND VIỆT NAM';
  const hotline = company?.phone || '0964.246.888';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'sales@novaworldphanthiet.vn';
  const address = company?.address || 'Đường Lạc Long Quân, Xã Tiến Thành, TP. Phan Thiết, Tỉnh Bình Thuận';

  // Hero Lead Form State
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroProductType, setHeroProductType] = useState('Phân khu PGA Golf Villas (Sân Golf 36 Hố)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Bottom Lead Form State
  const [bottomName, setBottomName] = useState('');
  const [bottomPhone, setBottomPhone] = useState('');
  const [bottomEmail, setBottomEmail] = useState('');
  const [bottomProduct, setBottomProduct] = useState('Phân khu PGA Golf Villas (Sân Golf 36 Hố)');
  const [isBottomSubmitted, setIsBottomSubmitted] = useState(false);

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX Auto-Select Function
  const handleSelectProduct = (productTitle: string) => {
    setHeroProductType(productTitle);
    setBottomProduct(productTitle);
    const element = document.getElementById('hero-lead-form-box');
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

  // 4 Main Key Sub-divisions (Phân Khu Độc Quyền)
  const subDivisions = [
    {
      code: 'PHÂN KHU 01',
      title: 'PGA GOLF VILLAS',
      highlight: 'Biệt Thự Độc Quyền Trong Lòng Sân Golf 36 Hố',
      size: '150m² – 300m²',
      price: 'Từ 8.5 Tỷ',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
      fullName: 'Phân khu PGA Golf Villas (Sân Golf 36 Hố)',
      desc: 'Thiết kế bởi huyền thoại Greg Norman, 100% căn biệt thự có tầm view panorama toàn cảnh đồi cát và biển xanh.'
    },
    {
      code: 'PHÂN KHU 02',
      title: 'THE FLORIDA (PHASE 1 & 2)',
      highlight: 'Nhà Phố Biển Phong Cách Mỹ Rực Rỡ',
      size: '100m² – 140m²',
      price: 'Từ 5.8 Tỷ',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      fullName: 'Phân khu The Florida (Nhà Phố Phong Cách Mỹ)',
      desc: 'Tái hiện sắc màu sống động miền duyên hải Florida, liền kề công viên biển Bikini Beach 16ha sôi động.'
    },
    {
      code: 'PHÂN KHU 03',
      title: 'FESTIVAL STREET 4B',
      highlight: 'Tuyến Phố Thương Mại Lễ Hội Không Ngủ',
      size: '120m² – 160m²',
      price: 'Từ 6.2 Tỷ',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      fullName: 'Phân khu Festival Street 4B (Phố Thương Mại Lễ Hội)',
      desc: 'Trục đường thương mại sầm uất quy tụ hàng trăm thương hiệu ẩm thực, thời trang và quán bar giải trí ven biển.'
    },
    {
      code: 'PHÂN KHU 04',
      title: 'OCEAN RESIDENCE',
      highlight: 'Khu Đô Thị Sinh Thái San Diego Mission',
      size: '100m² – 120m²',
      price: 'Từ 6.0 Tỷ',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      fullName: 'Phân khu Ocean Residence (Kiến Trúc San Diego)',
      desc: 'Tọa lạc trên cao độ 60m so với mặt biển, view trọn vịnh Phan Thiết với hệ thống công viên và trường học riêng biệt.'
    },
  ];

  // 6 World-class Amenities
  const amenities = [
    { title: 'Sân Golf PGA 36 Hố Độc Quyền', desc: 'Đạt chuẩn giải đấu PGA Quốc tế thiết kế bởi Greg Norman.', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80' },
    { title: 'Công Viên Nước Ocean Kingdom 25ha', desc: 'Tổ hợp công viên giải trí biển quy mô hàng đầu Đông Nam Á.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { title: 'Quảng Trường Bikini Beach 16ha', desc: 'Quảng trường bãi biển sầm uất với chuỗi Beach Club, Lounge sang trọng.', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80' },
    { title: 'Công Viên Giải Trí Circus Land', desc: 'Hành trình lễ hội xiếc đa sắc màu phong cách Mỹ thu hút hàng triệu du khách.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' },
    { title: 'Trung Tâm Thể Thao Sport Complex', desc: 'Hệ thống sân tennis, bóng đá, học viện thể thao quy chuẩn Olympic.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
    { title: 'Trung Tâm Chăm Sóc Sức Khỏe Quốc Tế', desc: 'Bệnh viện & thẩm mỹ viện hợp tác với các tập đoàn y tế hàng đầu.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0369A1] selection:text-amber-200">
      
      {/* ════════════════ 1. TOP HEADER (BLUE TROPICAL & GOLD SHARP) ════════════════ */}
      <header className="sticky top-0 z-50 bg-[#0C4A6E] text-white border-b-2 border-amber-400 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-400 to-yellow-200 text-[#0C4A6E] flex items-center justify-center font-black">
              NW
            </div>
            <div>
              <span className="font-black text-sm tracking-wide text-amber-300 uppercase block leading-none">
                {brandName}
              </span>
              <span className="text-[9px] text-slate-200 uppercase tracking-wider block mt-0.5">
                SIÊU THÀNH PHỐ BIỂN — DU LỊCH — SỨC KHỎE 1.000HA
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-100">
            <a href="#tong-quan" className="hover:text-amber-300 transition">Tổng Quan</a>
            <a href="#phan-khu" className="hover:text-amber-300 transition">Phân Khu</a>
            <a href="#ha-tang" className="hover:text-amber-300 transition">Hạ Tầng Cao Tốc</a>
            <a href="#tien-ich" className="hover:text-amber-300 transition">Tiện Ích 5 Sao</a>
            <a href="#video-du-an" className="hover:text-amber-300 transition">Video</a>
            <a href="#tai-tai-lieu" className="hover:text-amber-300 transition">Tải Bảng Giá</a>
          </nav>

          {/* Fast Hotline Contact */}
          <div className="flex items-center gap-3">
            <a href={`tel:${hotline}`} className="flex items-center gap-1 font-bold text-amber-300 hover:text-white transition">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#hero-lead-form-box"
              className="px-4 py-1.5 bg-[#EA580C] hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider transition"
            >
              Nhận Báo Giá
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & ORANGE DIRECT LEAD FUNNEL BOX ════════════════ */}
      <section className="relative bg-gradient-to-b from-[#0C4A6E] via-[#0284C7] to-[#0369A1] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-400 overflow-hidden">
        {/* Panoramic Tropical Coast Background */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-widest">
                ☀ CÒN DUY NHẤT 10 SUẤT ĐỘC QUYỀN GIÁ GỐC NOVALAND ☀
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight uppercase leading-tight">
                THỜI CƠ VÀNG ĐẦU TƯ BĐS BIỂN PHAN THIẾT
              </h1>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed max-w-xl">
                Quy mô 1.000 ha với 7km bờ biển riêng tuyệt mỹ. Đón đầu làn sóng Cao tốc Dầu Giây - Phan Thiết & Sân bay Quốc Tế hoàn thành.
              </p>
            </div>

            {/* Sharp Architectural Specs Table */}
            <div className="bg-[#082F49]/90 border border-amber-300/50 p-5 text-xs text-slate-200 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-300">• Vị trí:</span>
                <span className="font-bold text-amber-300">{address}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-300">• Quy mô dự án:</span>
                <span className="font-bold">1.000 Hécta (Tổng vốn 5 Tỷ USD)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-300">• Chính sách thanh toán:</span>
                <span className="font-bold text-emerald-300">Chỉ 15% đến khi nhận nhà (Ân hạn gốc lãi)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">• Quà tặng mở bán:</span>
                <span className="font-bold text-amber-300">Chiết khấu trực tiếp đến 1.6 Tỷ đồng</span>
              </div>
            </div>
          </div>

          {/* Right Column: Red-Orange Direct Lead Form (Lưới Lọc Phễu Chuyển Đổi Số 1) */}
          <div id="hero-lead-form-box" className="lg:col-span-5">
            <div className="bg-[#EA580C] border-2 border-amber-300 p-6 sm:p-8 shadow-2xl text-left relative">
              <div className="text-center mb-4 pb-3 border-b border-orange-400/60">
                <span className="text-[11px] font-black text-amber-200 uppercase tracking-widest block mb-1">
                  ƯU ĐÃI TRỰC TIẾP TỪ NOVALAND
                </span>
                <h3 className="text-xl font-black text-white uppercase">
                  ĐĂNG KÝ NHẬN BÁO GIÁ ĐỢT 1
                </h3>
              </div>

              {isHeroSubmitted ? (
                <div className="bg-white text-slate-900 p-5 text-center space-y-2 animate-fadeIn border-2 border-amber-400">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto stroke-[3]" />
                  <h4 className="font-bold text-sm text-[#0C4A6E]">ĐÃ TIẾP NHẬN YÊU CẦU!</h4>
                  <p className="text-xs text-slate-600">
                    Phòng kinh doanh Novaland sẽ liên hệ lại qua số <strong>{heroPhone}</strong> và gửi file PDF bảng giá qua Zalo trong 3 phút.
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
                      placeholder="Họ và tên Quý Khách *"
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
                      id="hero-product-select"
                      value={heroProductType}
                      onChange={(e) => setHeroProductType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none transition-all duration-300"
                    >
                      {subDivisions.map((s, idx) => (
                        <option key={idx} value={s.fullName}>
                          {s.code}: {s.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer mt-1"
                  >
                    GỬI YÊU CẦU CHO TÔI NGAY
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

      {/* ════════════════ 3. 3 CỘT ĐIỂM ĐẦU TƯ HẤP DẪN ════════════════ */}
      <section id="tong-quan" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10 text-center">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
              ĐÒN BẨY SINH LỜI ĐỘT PHÁ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0C4A6E] uppercase">
              3 LỢI THẾ VÀNG KHÔNG THỂ BỎ LỠ TẠI NOVAWORLD
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Box 1 */}
            <div className="bg-white border-2 border-slate-300 p-6 space-y-3 shadow-sm hover:border-[#EA580C] transition">
              <div className="w-12 h-12 bg-[#0C4A6E] text-amber-300 flex items-center justify-center font-black">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0C4A6E] uppercase">
                Nhân Đôi Giá Trị Đầu Tư
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Cú hích hạ tầng kép: Cao tốc Dầu Giây - Phan Thiết rút ngắn thời gian di chuyển từ TP.HCM chỉ còn 1h30 phút và Sân bay Quốc tế Phan Thiết đi vào vận hành.
              </p>
            </div>

            {/* Box 2: Highlight Yellow Card */}
            <div className="bg-[#FFFBEB] border-2 border-amber-400 p-6 space-y-3 shadow-md">
              <div className="w-12 h-12 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#EA580C] uppercase">
                Không Áp Lực Tài Chính
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Khách hàng chỉ cần thanh toán <strong>15% đợt 1</strong>. Ngân hàng hỗ trợ vay 70% với lãi suất 0%, ân hạn nợ gốc và miễn phí trả nợ trước hạn đến khi nhận nhà.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white border-2 border-slate-300 p-6 space-y-3 shadow-sm hover:border-[#EA580C] transition">
              <div className="w-12 h-12 bg-[#0C4A6E] text-amber-300 flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#0C4A6E] uppercase">
                Tỷ Suất Sinh Lời 30%/Năm
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Hệ sinh thái tiện ích đẳng cấp quốc tế biến Phan Thiết thành tâm điểm du lịch toàn cầu, đảm bảo công suất khai thác phòng cho thuê quanh năm từ 75% – 90%.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 4. TỔNG QUAN DỰ ÁN (BẢNG THÔNG SỐ CHUẨN DOANH NGHIỆP) ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] uppercase border-l-4 border-[#EA580C] pl-3">
              TỔNG QUAN DỰ ÁN NOVAWORLD PHAN THIẾT
            </h2>

            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 w-1/3 border-r border-slate-200">• Tên dự án:</td>
                  <td className="p-3 font-black text-[#0C4A6E]">NOVAWORLD PHAN THIET</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Phát triển dự án:</td>
                  <td className="p-3 font-medium">{companyGroup}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Vị trí tọa lạc:</td>
                  <td className="p-3 font-medium">{address}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Tổng diện tích:</td>
                  <td className="p-3 font-medium">1.000 Hécta với 7km bờ biển riêng</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Tổng vốn đầu tư:</td>
                  <td className="p-3 font-medium">5 Tỷ USD</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Loại hình sản phẩm:</td>
                  <td className="p-3 font-medium">Golf Villas, Florida Townhouse, Shophouse, Boutique Hotel</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Pháp lý:</td>
                  <td className="p-3 font-bold text-emerald-700">Sổ hồng minh bạch, bàn giao đầy đủ nội thất cao cấp</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-600 border-r border-slate-200">• Tiến độ bàn giao:</td>
                  <td className="p-3 font-medium">Đang tiến hành bàn giao từng phân kỳ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div 
              className="relative border-2 border-slate-300 aspect-[4/3] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
                alt="Phối cảnh NovaWorld Phan Thiết"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
                <span className="text-xs font-bold text-amber-300">Thực tế đại công viên biển NovaWorld Phan Thiết</span>
              </div>
            </div>

            <div className="bg-[#FFFBEB] border-2 border-amber-400 p-5 text-left space-y-2.5">
              <h4 className="font-black text-sm text-[#0C4A6E] uppercase border-b border-amber-300 pb-2">
                CHÍNH SÁCH ƯU ĐÃI THÁNG MỚI NHẤT
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <p>✓ <strong>Chiết khấu ngay 10%</strong> cho khách hàng thanh toán sớm.</p>
                <p>✓ <strong>Tặng thẻ hội viên Golf PGA</strong> trị giá 1.15 Tỷ đồng.</p>
                <p>✓ <strong>Tặng gói nghỉ dưỡng</strong> 24 đêm/năm trong chuỗi resort Novaland.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 5. 4 PHÂN KHU TRỌNG ĐIỂM + UX AUTO-SELECT ════════════════ */}
      <section id="phan-khu" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
              BỘ SƯU TẬP TUYỆT TÁC NGHỈ DƯỠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0C4A6E] uppercase">
              CÁC PHÂN KHU ĐANG MỞ BÁN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Bấm vào từng phân khu dưới đây để nhận báo giá chi tiết và quỹ căn ngoại giao từ CĐT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {subDivisions.map((sub, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
              >
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setZoomImage(sub.image)}
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-3 py-1 bg-[#0C4A6E] text-amber-300 font-bold text-[11px]">
                    {sub.code}
                  </div>
                  <div className="absolute top-2 right-2 px-3 py-1 bg-[#EA580C] text-white font-bold text-[11px]">
                    {sub.size}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-1.5">
                    <h4 className="font-black text-base text-[#0C4A6E]">
                      {sub.title}
                    </h4>
                    <p className="text-xs font-bold text-[#EA580C]">
                      {sub.highlight}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.desc}
                    </p>
                    <p className="text-sm font-black text-[#0C4A6E] pt-1">
                      Giá tham chiếu: <span className="text-[#EA580C]">{sub.price}</span>
                    </p>
                  </div>

                  {/* UX Auto-Select Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectProduct(sub.fullName)}
                    className="w-full py-2.5 bg-[#0C4A6E] hover:bg-[#EA580C] text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>NHẬN BÁO GIÁ PHÂN KHU NÀY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 6. ĐỘT PHÁ HẠ TẦNG GIAO THÔNG ════════════════ */}
      <section id="ha-tang" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] uppercase border-l-4 border-[#EA580C] pl-3">
              ĐỘT PHÁ HẠ TẦNG GIAO THÔNG
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              NovaWorld Phan Thiết sở hữu vị trí phong thủy <strong>"Tựa Sơn Hướng Hải"</strong>, lưng dựa vào đồi cát thoải dần, 100% biệt thự có tầm nhìn thoáng hướng đón gió biển.
            </p>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200">
                <strong>• 1h30 Phút:</strong> Kết nối trực thông TP. Hồ Chí Minh qua Cao tốc Dầu Giây - Phan Thiết.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200">
                <strong>• 15 – 20 Phút:</strong> Di chuyển đến Sân bay Quốc Tế Phan Thiết.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200">
                <strong>• Kết nối liên vùng:</strong> Tuyến cao tốc Phan Thiết - Vĩnh Hảo và Phan Thiết - Nha Trang.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div 
              className="border-4 border-[#0C4A6E] aspect-[16/10] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
                alt="Sơ đồ kết nối giao thông NovaWorld"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-[#0C4A6E] text-amber-300 px-3 py-1 text-xs font-bold flex items-center gap-1 border border-amber-300">
                <ZoomIn className="w-3.5 h-3.5" /> Bấm xem phóng to sơ đồ
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 7. TIỆN ÍCH ĐẲNG CẤP QUỐC TẾ ════════════════ */}
      <section id="tien-ich" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
              HỆ SINH THÁI NGHỈ DƯỠNG KHÉP KÍN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0C4A6E] uppercase">
              TIỆN ÍCH ĐẲNG CẤP QUỐC TẾ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="bg-white border-2 border-slate-200 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-amber-300 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 border border-amber-400">
                    <ZoomIn className="w-3 h-3" /> Phóng to
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-black text-sm text-[#0C4A6E] group-hover:text-[#EA580C] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 8. VIDEO GIỚI THIỆU DỰ ÁN ════════════════ */}
      <section id="video-du-an" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0C4A6E] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              TRẢI NGHIỆM THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">
              VIDEO PHÓNG SỰ DỰ ÁN NOVAWORLD PHAN THIẾT
            </h2>
          </div>

          <div className="relative border-4 border-amber-400 bg-slate-950 aspect-video group overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
              alt="Video Poster NovaWorld"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80')}
                className="w-16 h-16 bg-[#EA580C] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider bg-black/80 px-3 py-1 border border-white/20">
                Xem Video Giới Thiệu Dự Án Official
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 9. TẢI FILE BROCHURE & BẢNG GIÁ CUỐI TRANG (Lưới Lọc Phễu Số 2) ════════════════ */}
      <section id="tai-tai-lieu" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 border-t-4 border-amber-400">
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#0C4A6E] p-8 sm:p-10 text-center space-y-6 shadow-xl">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
              TẢI XUỐNG BỘ TÀI LIỆU GỐC TỪ CHỦ ĐẦU TƯ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0C4A6E] uppercase">
              ĐĂNG KÝ NHẬN BROCHURE & BẢNG GIÁ (.PDF & .XLSX)
            </h3>
            <p className="text-xs text-slate-600">
              Hệ thống sẽ tự động gửi file qua Zalo & Email của Quý Khách sau 2 phút làm việc
            </p>
          </div>

          {/* Document Download Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left text-xs">
            <div className="p-3 bg-slate-50 border border-slate-300 flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-600 shrink-0" />
              <div>
                <p className="font-bold text-[#0C4A6E]">Brochure NovaWorld 1.000ha</p>
                <p className="text-[10px] text-slate-500">File: brochure-novaworld.pdf (18.4 MB)</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-300 flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-[#0C4A6E]">Bảng Giá & Dòng Tiền Vay</p>
                <p className="text-[10px] text-slate-500">File: bang-gia-chiet-khau.xlsx (3.2 MB)</p>
              </div>
            </div>
          </div>

          {isBottomSubmitted ? (
            <div className="bg-[#FFFBEB] text-slate-900 p-6 text-center space-y-2 border-2 border-amber-400">
              <Check className="w-8 h-8 text-emerald-600 mx-auto stroke-[3]" />
              <h4 className="font-bold text-sm text-[#0C4A6E]">ĐÃ GỬI TÀI LIỆU THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-600">
                Chuyên viên Novaland sẽ liên hệ lại qua số <strong>{bottomPhone}</strong> và gửi file qua Zalo trong ít phút.
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
                  placeholder="Họ và tên Quý Khách *"
                  className="px-4 py-3 bg-slate-50 text-slate-900 font-bold border border-slate-300 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={bottomPhone}
                  onChange={(e) => setBottomPhone(e.target.value)}
                  placeholder="Số điện thoại (Zalo) *"
                  className="px-4 py-3 bg-slate-50 text-slate-900 font-black border border-slate-300 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  placeholder="Email nhận tài liệu"
                  className="px-4 py-3 bg-slate-50 text-slate-900 font-medium border border-slate-300 outline-none"
                />
                <select
                  value={bottomProduct}
                  onChange={(e) => setBottomProduct(e.target.value)}
                  className="px-4 py-3 bg-slate-50 text-slate-900 font-bold border border-slate-300 outline-none"
                >
                  {subDivisions.map((s, idx) => (
                    <option key={idx} value={s.fullName}>
                      {s.code}: {s.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                GỬI CHO TÔI TRỌN BỘ TÀI LIỆU NGAY
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 10. FOOTER ════════════════ */}
      <footer className="bg-[#082F49] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                NW
              </div>
              <span className="font-black text-sm text-amber-300 uppercase">
                {brandName}
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Trực thuộc {companyGroup}. Siêu thành phố Biển - Du lịch - Sức khỏe quy mô 1.000ha tại thủ phủ Phan Thiết, Bình Thuận.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-200">
            <h4 className="font-bold text-amber-300 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG DỰ ÁN</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Hotline 24/7: <strong>{hotline}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Email: {email}</span>
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-300 text-xs uppercase mb-1">QUY CHUẨN PHÁP LÝ</h4>
            <p>✓ Đầy đủ phê duyệt quy hoạch 1/500 cấp bởi UBND Tỉnh Bình Thuận.</p>
            <p>✓ Ngân hàng MB Bank, VPBank bảo lãnh và tài trợ 70% hạn mức.</p>
            <p>✓ Giấy phép xây dựng hoàn chỉnh cho toàn bộ phân kỳ.</p>
            <p className="text-[10px] text-slate-400 pt-2">© 2026 {brandName}. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* ════════════════ 11. LIGHTBOX ZOOM MODAL ════════════════ */}
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

      {/* ════════════════ 12. FLOATING CONTACT BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition"
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
