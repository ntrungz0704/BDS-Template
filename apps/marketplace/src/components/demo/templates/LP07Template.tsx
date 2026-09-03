'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, Home, Key, Flame,
  Compass, Plane, Sun, Waves, FileText, ChevronDown, CheckSquare,
  Globe
} from 'lucide-react';

export interface LP07TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
  pageContent?: any;
}

export default function LP07Template({
  template,
  company,
  projects,
  pageContent
}: LP07TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  // Brand & Company Info Fallback from CMS
  const firstProject = (projects && Array.isArray(projects) && projects.length > 0) ? projects[0] : null;
  const brandName = firstProject?.title || firstProject?.name || company?.name || template?.name || 'DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP';
  const companyGroup = 'TẬP ĐOÀN NOVALAND';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Tiến Thành, TP. Phan Thiết, Tỉnh Bình Thuận';

  // State for all Lead Forms
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formDoc, setFormDoc] = useState('chinh-sach-uu-dai-moi-nhat.pdf');
  const [formProduct, setFormProduct] = useState('PGA GOLF VILLAS (Sân Golf 36 Hố)');
  const [submittedFormId, setSubmittedFormId] = useState<string | null>(null);

  // Gallery active slide state for Novotel overview
  const [activeSlide, setActiveSlide] = useState(0);
  const overviewSlides = [
    { title: 'Khách Sạn Novotel & Hồ Bơi Resort 5 Sao', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1000&q=80' },
    { title: 'Tuyến Phố Thương Mại Shophouse Biển Sầm Uất', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80' },
    { title: 'Quảng Trường Nhạc Nước & Pháo Hoa Về Đêm', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80' },
    { title: 'Công Viên Nghỉ Dưỡng Xanh Giữa Lòng Đô Thị', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80' },
    { title: 'Bãi Biển Bikini Beach 16ha Nước Xanh Trong Vắt', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=80' },
  ];

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Seamless UX Auto-Select Function
  const handleSelectProduct = (productTitle: string) => {
    setFormProduct(productTitle);
    const element = document.getElementById('consultation-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('consultation-product-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-2', 'ring-amber-400', 'border-amber-400');
          setTimeout(() => selectEl.classList.remove('ring-2', 'ring-amber-400', 'border-amber-400'), 2000);
        }
      }, 350);
    }
  };

  const handleFormSubmit = (e: React.FormEvent, formId: string) => {
    e.preventDefault();
    if (!formPhone.trim()) return;
    setSubmittedFormId(formId);
    setTimeout(() => setSubmittedFormId(null), 6000);
  };

  // 6 Main Product Cards
  const productCards = [
    {
      title: 'BIỆT THỰ BIỂN',
      type: 'Kiến trúc Địa Trung Hải',
      size: '300m² - 500m²',
      floors: '3 - 5 tầng',
      handover: 'T1/2023',
      status: 'Liên hệ',
      price: 'Từ 15 - 28 Tỷ',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      fullName: 'Biệt Thự Biển Đơn Lập (300m² - 500m²)',
    },
    {
      title: 'WAIKIKI',
      type: 'Kiến trúc Italia',
      size: '200m² - 275m²',
      floors: '2 tầng 1 sân thượng',
      handover: 'Cam kết thuê lại 5% lên đến 1 tỷ đồng',
      status: 'Còn hàng',
      price: 'Từ 18 - 25 Tỷ',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      fullName: 'Waikiki View Biển (200m² - 275m²)',
    },
    {
      title: 'SANTA MONICA',
      type: 'Kiến trúc Địa Trung Hải',
      size: '120m²',
      floors: '2 tầng 1 tum',
      handover: 'T9/2023',
      status: 'Còn hàng',
      price: 'Từ 16 - 22 Tỷ',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      fullName: 'Santa Monica Shophouse (120m²)',
    },
    {
      title: 'GOLF VILLAS',
      type: 'Kiến trúc Hiện đại',
      size: '175m² - 360m²',
      floors: '2 tầng + 1 sân thượng',
      handover: 'View trọn sân Golf PGA 36 Hố',
      status: 'Booking',
      price: '13 Tỷ - 23 Tỷ',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
      fullName: 'Golf Villas (175m² - 360m²)',
      desc: 'Biệt thự Golf Villas phong cách hiện đại, cảnh quan xanh, dịch vụ cao cấp mang lại sự đẳng cấp vượt trội cho giới thượng lưu và Golfer chuyên nghiệp.'
    },
    {
      title: 'BIỆT THỰ OCEAN RESIDENCE (HOT)',
      type: 'Kiến trúc San Diego Mission',
      size: '100m² - 120m²',
      floors: '2 tầng',
      handover: 'Bàn giao hoàn thiện T5/2024',
      status: 'Đang mở bán',
      price: 'Chỉ từ 6 Tỷ',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      fullName: 'Ocean Residence (100m² - 120m²)',
      desc: 'Ocean Residence sở hữu tiện ích nội khu tiện nghi, hài hoà cùng thiên nhiên như công viên trung tâm vành đai xanh, clubhouse, quảng trường văn hoá, trường học.'
    },
    {
      title: 'BOUTIQUE HOTEL',
      type: 'Kiến trúc Địa Trung Hải view biển',
      size: '161m² - 207m²',
      floors: 'Mặt tiền KHỦNG lên tới 7 - 9m',
      handover: 'Mini Hotel từ 10 - 100 phòng',
      status: 'Giới hạn',
      price: '17 Tỷ - 30 Tỷ',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      fullName: 'Boutique Hotel (161m² - 207m²)',
      desc: 'Boutique Hotel là loại hình khách sạn mini lưu trú nghỉ dưỡng, vị trí đẹp liền kề các tiện ích trung tâm giải trí sầm uất.'
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#14B8A6] selection:text-white">
      
      {/* ════════════════ 1. TOP NAVBAR (WHITE BG + CLEAN BRAND LOGO) ════════════════ */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-bold">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="text-xl font-black tracking-tight text-[#0F2942] uppercase flex items-center">
              <span>Nova</span>
              <span className="text-[#0D9488]">W</span>
              <span className="inline-block w-3.5 h-3.5 mx-0.5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border border-white" />
              <span>RLD</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium pl-1 border-l border-slate-300">
              PHAN THIET
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 uppercase tracking-wider text-slate-700">
            <a href="#trang-chu" className="text-[#0D9488] hover:text-[#0F2942] transition">TRANG CHỦ</a>
            <a href="#tong-quan" className="hover:text-[#0D9488] transition">TỔNG QUAN</a>
            <a href="#vi-tri" className="hover:text-[#0D9488] transition">VỊ TRÍ</a>
            <a href="#mat-bang" className="hover:text-[#0D9488] transition">MẶT BẰNG</a>
            <a href="#tien-ich" className="hover:text-[#0D9488] transition">TIỆN ÍCH</a>
            <a href="#thu-vien" className="hover:text-[#0D9488] transition">THƯ VIỆN</a>
            <a href="#lien-he" className="hover:text-[#0D9488] transition">LIÊN HỆ</a>
          </nav>

          {/* Fast Hotline Contact */}
          <div className="flex items-center gap-3">
            <a href={`tel:${hotline}`} className="hidden sm:flex items-center gap-1 text-[#D92D20] font-black text-xs">
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{hotline}</span>
            </a>
            <a
              href="#consultation-form-section"
              className="px-3 py-1.5 bg-[#D92D20] hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-wider transition"
            >
              Đăng Ký
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════ 2. HERO SECTION & 3 GOLDEN ROUND BADGES ════════════════ */}
      <section id="trang-chu" className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-900 border-b-4 border-[#0D9488]">
        {/* Background Sun Wheel & Resort Panoramic */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
            alt="NovaWorld Phan Thiết Panoramic"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        </div>

        {/* Center Glassmorphism Hero Box with White Border */}
        <div className="relative z-10 max-w-3xl w-full mx-auto bg-[#071F38]/85 border-4 border-white p-6 sm:p-10 text-center text-white shadow-2xl space-y-6">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-white uppercase">
              NOVAWORLD PHAN THIẾT
            </h1>
            <h2 className="text-sm sm:text-lg font-bold text-sky-300 uppercase tracking-wider">
              THỜI CƠ VÀNG ĐẦU TƯ BĐS PHAN THIẾT
            </h2>
            <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest pt-1">
              CÒN DUY NHẤT <span className="text-amber-400 font-black">10 SUẤT ĐỘC QUYỀN</span> KHÔNG Ở ĐÂU CÓ
            </p>
          </div>

          {/* 3 Golden Circular Glowing Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
            
            {/* Circle 1 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-amber-400 flex flex-col items-center justify-center text-slate-950 shadow-lg">
                <span className="text-lg sm:text-2xl font-black text-amber-600 leading-none">30%</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                TỶ SUẤT SINH LỜI/ NĂM
              </span>
            </div>

            {/* Circle 2 (Center Highlight) */}
            <div className="flex flex-col items-center space-y-1.5 -translate-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-4 border-amber-400 flex flex-col items-center justify-center text-slate-950 shadow-2xl">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 leading-none">3%</span>
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300">
                ƯU ĐÃI NỘI BỘ
              </span>
            </div>

            {/* Circle 3 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-amber-400 flex flex-col items-center justify-center text-slate-950 shadow-lg">
                <span className="text-base sm:text-xl font-black text-amber-600 leading-none">200</span>
                <span className="text-[10px] font-black text-slate-800">Triệu</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                VOUCHER
              </span>
            </div>

          </div>

          <div className="pt-2 flex flex-col items-center space-y-3">
            <ChevronDown className="w-6 h-6 text-white animate-bounce" />
            <a
              href="#consultation-form-section"
              className="inline-block px-8 py-3 bg-[#D92D20] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition shadow-xl"
            >
              Đăng ký nhận ngay ưu đãi T11/2026
            </a>
          </div>

        </div>
      </section>

      {/* ════════════════ 3. TỔNG QUAN DỰ ÁN (TEAL BG #14B8A6 + NOVOTEL SLIDER) ════════════════ */}
      <section id="tong-quan" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#14B8A6] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specs & Description */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] uppercase leading-tight">
                TỔNG QUAN DỰ ÁN
              </h2>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                NOVAWORLD PHAN THIẾT
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
              NovaWorld Phan Thiết có quy mô 1000 ha với đa dạng các sản phẩm như nhà phố, biệt thự nghỉ dưỡng (second-home), nhà phố thương mại với tầm nhìn hướng ra biển. Novaworld là dự án đầu tiên sở hữu tổ hợp hơn 1000 tiện ích nghỉ dưỡng đẳng cấp tại Phan Thiết. Sau khi hoàn thành NovaWorld sẽ là điểm đến hấp dẫn hàng đầu khu vực.
            </p>

            <div className="space-y-1.5 text-xs text-slate-950 font-medium">
              <p>✦ <strong>Đơn vị phát triển:</strong> Tập đoàn Novaland</p>
              <p>✦ <strong>Vị trí:</strong> Tiến Thành, Phan Thiết, Bình Thuận</p>
              <p>✦ <strong>Tổng diện tích dự án:</strong> 1000ha</p>
              <p>✦ <strong>Tổng sản phẩm giai đoạn 1:</strong> 2800 căn phát triển: Shophouse, Nhà phố liền kề, biệt thự, khách sạn 5 sao</p>
              <p>✦ <strong>Shophouse:</strong> Diện tích từ 72m2 đến 200m2</p>
              <p>✦ <strong>Nhà phố liền kề:</strong> Diện tích từ 100m2 đến 210m2</p>
              <p>✦ <strong>Biệt thự:</strong> Diện tích từ 150m2 đến 300m2</p>
              <p>✦ <strong>Điều kiện bàn giao:</strong> Thô hoàn thiện mặt ngoài</p>
              <p>✦ <strong>Thời gian dự kiến bàn giao:</strong> Đang bàn giao từng phân kỳ</p>
              <p>✦ <strong>Đường bờ biển dài:</strong> 7km bãi biển riêng</p>
              <p>✦ <strong>Kết nối thuận tiện, đa dạng tiện ích:</strong> Trường học, bệnh viện cao cấp, TTTM....</p>
            </div>

            <div className="pt-2">
              <a
                href="#download-brochure-banner"
                className="inline-block px-6 py-2.5 bg-[#D92D20] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition shadow-md"
              >
                DOWNLOAD BROCHURE +
              </a>
            </div>
          </div>

          {/* Right Column: Novotel Slider & Ocean Residence Launch Box */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Image Carousel */}
            <div className="space-y-2">
              <div 
                className="border-4 border-white aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setZoomImage(overviewSlides[activeSlide].img)}
              >
                <img
                  src={overviewSlides[activeSlide].img}
                  alt={overviewSlides[activeSlide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* 5 Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {overviewSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`border-2 aspect-video overflow-hidden transition ${
                      activeSlide === idx ? 'border-white scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Ra Mắt Phân Khu Ocean Residence Mới Box */}
            <div className="bg-[#E6FFFA] text-slate-900 border-2 border-white p-6 shadow-md text-left space-y-3">
              <h4 className="font-black text-base text-[#0D9488] uppercase border-b border-teal-300 pb-1.5">
                RA MẮT PHÂN KHU OCEAN RESIDENCE MỚI
              </h4>
              <div className="space-y-2 text-xs text-slate-800 font-medium">
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>DỄ DÀNG ĐẦU TƯ:</strong> Vốn ban đầu chỉ từ 785 triệu (15%), chỉ từ 5 tỷ/căn biệt thự view biển, xung quanh rất nhiều tiện ích dành cho nghỉ dưỡng, sức khỏe.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>KHÔNG ÁP LỰC TÀI CHÍNH:</strong> Hỗ trợ lãi suất 0% trong 24-48 tháng.</span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>TIỀM NĂNG X2 GIÁ TRỊ ĐẦU TƯ:</strong> Khi cao tốc & sân bay hoàn thiện, giá trị Bất động sản chắc chắn sẽ tăng phi mã.</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 4. ĐIỂM ĐẦU TƯ HẤP DẪN — NHÂN ĐÔI GIÁ TRỊ ĐẦU TƯ ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#E6FFFA] to-white border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest">
              ĐIỂM ĐẦU TƯ HẤP DẪN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] uppercase">
              NHÂN ĐÔI GIÁ TRỊ ĐẦU TƯ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Left: 10 Policy Points */}
            <div className="lg:col-span-6 bg-[#CCFBF1]/60 border-2 border-[#14B8A6] p-6 space-y-3">
              <h4 className="font-black text-sm text-[#0B2545] uppercase border-b border-teal-300 pb-2">
                CHÍNH SÁCH ƯU ĐÃI CẬP NHẬT MỚI NHẤT
              </h4>
              <div className="space-y-2 text-xs text-slate-800 font-medium">
                <p>✦ Cam kết mua lại <strong className="text-red-600">11%</strong> nếu khách hàng muốn bán.</p>
                <p>✦ Cam kết thuê lên tới <strong className="text-red-600">480 triệu/năm</strong>.</p>
                <p>✦ Ưu đãi cổ đông Novaland <strong className="text-red-600">220 triệu</strong>.</p>
                <p>✦ Ưu đãi Nova Collection: <strong className="text-red-600">2 - 5%</strong>.</p>
                <p>✦ Ưu đãi Novaloyalty: <strong className="text-red-600">1 - 5%</strong>.</p>
                <p>✦ Chiết khấu nếu KH không vay: <strong className="text-red-600">4 - 9%</strong>.</p>
                <p>✦ Chiết khấu với KH miền bắc: <strong className="text-red-600">2%</strong>.</p>
                <p>✦ Quà tặng Combo Gift Voucher lên tới <strong className="text-red-600">1 tỷ đồng</strong>.</p>
                <p>✦ Tặng gói member Golf trị giá <strong className="text-red-600">1,15 tỷ</strong>.</p>
                <p>✦ Hỗ trợ lãi suất 0% lên tới <strong className="text-red-600">36 tháng</strong>.</p>
              </div>
            </div>

            {/* Right: 3 Special Investor Advantages */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="font-black text-sm text-[#0B2545] uppercase border-b border-slate-300 pb-2">
                LỢI THẾ ĐẶC QUYỀN DÀNH CHO NHÀ ĐẦU TƯ
              </h4>

              <div className="p-4 bg-white border-2 border-slate-200 space-y-1.5 shadow-xs">
                <h5 className="font-bold text-xs text-[#0D9488] uppercase">
                  1. SỞ HỮU DỄ DÀNG CHỈ TỪ 15%
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed break-words">
                  Chỉ từ <strong>1,2 tỷ (15%)</strong> sở hữu biệt thự mặt biển đẳng cấp tại Phan Thiết. Cam kết mua lại, lợi nhuận tối thiểu <strong>6.5%/năm</strong>. Tiến độ thanh toán linh hoạt trong 3 năm. Miễn lãi suất lên tới 3 năm.
                </p>
              </div>

              <div className="p-4 bg-white border-2 border-slate-200 space-y-1.5 shadow-xs">
                <h5 className="font-bold text-xs text-[#0D9488] uppercase">
                  2. LỢI NHUẬN KHAI THÁC 10 - 12%/NĂM
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed break-words">
                  Không chỉ là một tài sản, một của để dành, mà NovaWorld Phan Thiết còn đem đến cho quý nhà đầu tư một khoản lợi nhuận luôn ổn định từ <strong>10-12%/năm</strong> từ việc khai thác vận hành, kinh doanh, cho thuê.
                </p>
              </div>

              <div className="p-4 bg-white border-2 border-slate-200 space-y-1.5 shadow-xs">
                <h5 className="font-bold text-xs text-[#0D9488] uppercase">
                  3. ĐÓN SÓNG HẠ TẦNG X2 GIÁ TRỊ
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed break-words">
                  Đón sóng hạ tầng với Cao tốc Phan Thiết – Dầu Giây – TP.HCM, Sân bay Phan Thiết, Sân bay quốc tế Long Thành... đem tới tiềm năng đột phá <strong>tăng giá X2</strong> trong những năm tới.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 5. LEAD CAPTURE FORM BANNER 1 (DARK NAVY) ════════════════ */}
      <section id="download-brochure-banner" className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B2545] text-white text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-xl font-black uppercase text-white">
              TẢI XUỐNG BẢNG GIÁ, CHÍNH SÁCH ƯU ĐÃI SIÊU HOT TỪ CHỦ ĐẦU TƯ
            </h3>
            <p className="text-xs text-slate-300">
              Hoặc liên hệ HOTLINE: <strong className="text-amber-400">{hotline}</strong> để cập nhật đầy đủ và chính xác chính sách bán hàng mới nhất.
            </p>
          </div>

          {submittedFormId === 'banner-1' ? (
            <div className="bg-white text-slate-900 p-4 max-w-xl mx-auto border-2 border-amber-400 animate-fadeIn">
              <p className="text-xs font-bold text-[#0D9488]">✓ ĐÃ TIẾP NHẬN YÊU CẦU! File bảng giá sẽ gửi qua Zalo trong 2 phút.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleFormSubmit(e, 'banner-1')} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-xs">
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Họ và tên *"
                className="px-3 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
              />
              <select
                value={formDoc}
                onChange={(e) => setFormDoc(e.target.value)}
                className="px-3 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="chinh-sach-uu-dai-moi-nhat.pdf">chinh-sach-uu-dai-moi-nhat.pdf</option>
                <option className="text-slate-900 bg-white font-medium" value="bang-gia-tong-the-novaworld.xlsx">bang-gia-tong-the-novaworld.xlsx</option>
                <option className="text-slate-900 bg-white font-medium" value="mat-bang-phan-khu-golf.pdf">mat-bang-phan-khu-golf.pdf</option>
              </select>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="Số điện thoại (Zalo) *"
                className="px-3 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
              />
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="Email (nếu có)"
                className="px-3 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
              />
              <button
                type="submit"
                className="py-2.5 bg-[#D92D20] hover:bg-red-700 text-white font-black uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                GỬI CHO TÔI NGAY
              </button>
            </form>
          )}

          <p className="text-[10px] text-slate-400">
            (*) Thông Tin Của Quý Khách Được Bảo Mật Tuyệt Đối Không Ảnh Hưởng Công Việc !
          </p>
        </div>
      </section>

      {/* ════════════════ 6. CÁC PHÂN KHU ĐANG MỞ BÁN (6 CARDS GRID + UX AUTO-SELECT) ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#14B8A6] text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              BỘ SƯU TẬP TUYỆT TÁC NGHỈ DƯỠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] uppercase">
              CÁC PHÂN KHU ĐANG MỞ BÁN
            </h2>
            <h3 className="text-xl font-black text-white uppercase">
              NOVAWORLD PHAN THIẾT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {productCards.map((p, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-900 border-2 border-white flex flex-col justify-between group shadow-md"
              >
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setZoomImage(p.image)}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#0B2545] text-white font-bold text-[10px]">
                    {p.status}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#D92D20] text-white font-bold text-[10px]">
                    {p.price}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h4 className="font-black text-sm text-[#0B2545] uppercase border-b border-slate-200 pb-1">
                      {p.title}
                    </h4>
                    {p.desc && (
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {p.desc}
                      </p>
                    )}
                    <div className="space-y-1 text-xs text-slate-700 pt-1 font-medium">
                      <p>✦ <strong>Kiến trúc:</strong> {p.type}</p>
                      <p>✦ <strong>Diện tích:</strong> {p.size}</p>
                      <p>✦ <strong>Thiết kế:</strong> {p.floors}</p>
                      <p>✦ <strong>Bàn giao:</strong> {p.handover}</p>
                    </div>
                  </div>

                  {/* UX Auto-Select Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectProduct(p.fullName)}
                    className="w-full py-2 bg-[#D92D20] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    XEM BẢNG GIÁ
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 7. LEAD CAPTURE FORM BANNER 2 (DARK NAVY) ════════════════ */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B2545] text-white text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-xl font-black uppercase text-white">
              NHẬN BÁO GIÁ 10 CĂN SINH LỜI TỐT NHẤT DỰ ÁN
            </h3>
            <p className="text-xs text-slate-300">
              Hoặc liên hệ HOTLINE: <strong className="text-amber-400">{hotline}</strong> để cập nhật quỹ căn ngoại giao chiết khấu sâu.
            </p>
          </div>

          {submittedFormId === 'banner-2' ? (
            <div className="bg-white text-slate-900 p-4 max-w-xl mx-auto border-2 border-amber-400 animate-fadeIn">
              <p className="text-xs font-bold text-[#0D9488]">✓ ĐÃ GỬI YÊU CẦU! Chuyên viên sẽ gọi điện tư vấn giỏ hàng 10 căn VIP.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleFormSubmit(e, 'banner-2')} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-xs">
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Họ và tên *"
                className="px-3 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
              />
              <select
                value={formDoc}
                onChange={(e) => setFormDoc(e.target.value)}
                className="px-3 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="chinh-sach-uu-dai-moi-nhat.pdf">chinh-sach-uu-dai-moi-nhat.pdf</option>
                <option className="text-slate-900 bg-white font-medium" value="bang-gia-tong-the-novaworld.xlsx">bang-gia-tong-the-novaworld.xlsx</option>
              </select>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="Số điện thoại (Zalo) *"
                className="px-3 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
              />
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="Email (nếu có)"
                className="px-3 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
              />
              <button
                type="submit"
                className="py-2.5 bg-[#D92D20] hover:bg-red-700 text-white font-black uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                GỬI CHO TÔI NGAY
              </button>
            </form>
          )}

          <p className="text-[10px] text-slate-400">
            (*) Thông Tin Của Quý Khách Được Bảo Mật Tuyệt Đối Không Ảnh Hưởng Công Việc !
          </p>
        </div>
      </section>

      {/* ════════════════ 8. HÌNH ẢNH THỰC TẾ ĐÓN HÀNG NGÀN KHÁCH HÀNG ════════════════ */}
      <section id="thu-vien" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="space-y-1">
            <h2 className="text-xl sm:text-3xl font-black text-[#0B2545] uppercase">
              NOVAWORLD PHAN THIẾT ĐÓN HÀNG NGÀN KHÁCH HÀNG
            </h2>
            <p className="text-sm font-bold text-[#0D9488] uppercase tracking-wider">
              ĐẦU TIÊN THAM QUAN DỰ ÁN
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Khách hàng tham quan sa bàn 1.000ha', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
              { title: 'Sự kiện mở bán rộn ràng tại Novaland Gallery', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80' },
              { title: 'Đông đảo nhà đầu tư trải nghiệm thực tế', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
              { title: 'Tư vấn chuyên sâu từng phân khu biệt thự', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' }
            ].map((pic, idx) => (
              <div 
                key={idx} 
                className="border-2 border-slate-300 aspect-[4/3] bg-slate-900 group cursor-pointer overflow-hidden shadow-sm"
                onClick={() => setZoomImage(pic.img)}
              >
                <img src={pic.img} alt={pic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 9. VỊ TRÍ KIM CƯƠNG THỦ PHỦ RESORT PHAN THIẾT ════════════════ */}
      <section id="vi-tri" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Image */}
          <div className="lg:col-span-6">
            <div 
              className="border-4 border-[#0D9488] aspect-[4/3] bg-slate-900 group cursor-pointer overflow-hidden shadow-md"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
                alt="Bản đồ vị trí NovaWorld Phan Thiết"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-[#0D9488] text-white px-3 py-1 text-xs font-bold flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Bấm xem phóng to bản đồ
              </div>
            </div>
          </div>

          {/* Location Bullets */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase leading-tight">
              VỊ TRÍ KIM CƯƠNG<br />
              <span className="text-[#0D9488]">THỦ PHỦ RESORT PHAN THIẾT</span>
            </h2>

            <div className="space-y-2.5 text-xs text-slate-700 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span><strong>20 phút</strong> từ Novaworld đến sân bay quốc tế Phan Thiết.</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span><strong>10 – 12 phút</strong> Novaworld kết nối trực tiếp đến Cao tốc Dầu Giây – Phan Thiết.</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span><strong>1h 30 phút</strong> kết nối tới thành phố HCM qua cao tốc.</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>NovaWorld Phan Thiết sở hữu vị trí phong thủy <strong>“Tựa Sơn Hướng Hải”</strong>, dựa lưng vào đồi cát có độ dốc thoai dần, 100% các Biệt thự có tầm nhìn thoáng, hướng đón gió biển.</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Với sự bứt phá các dự án hạ tầng: Sân Bay Quốc Tế Phan Thiết, Cao Tốc Phan Thiết – Dầu Giây, Cao Tốc Phan Thiết Vĩnh Hảo, Cao Tốc Phan Thiết – Nha Trang.</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 10. ĐỘT PHÁ HẠ TẦNG GIAO THÔNG (TEAL BG #14B8A6 3 COLUMNS) ════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#14B8A6] text-white text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              ĐÒN BẨY HẠ TẦNG KÉP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] uppercase">
              ĐỘT PHÁ HẠ TẦNG GIAO THÔNG NOVAWORLD PHAN THIẾT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* Col 1: Sân bay */}
            <div className="bg-white text-slate-900 p-5 space-y-3 shadow-md border-2 border-white">
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" alt="Sân bay Phan Thiết" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-black text-sm text-[#0B2545] uppercase">SÂN BAY QUỐC TẾ PHAN THIẾT</h4>
              <div className="space-y-1 text-xs text-slate-700 font-medium">
                <p>• Khởi công xây dựng từ 2015, dự kiến đi vào hoạt động <strong>năm 2025</strong>.</p>
                <p>• Tổng vốn đầu tư đến năm 2030 lên đến hơn <strong>10.000 tỷ đồng</strong>.</p>
                <p>• Nâng cấp điều chỉnh quy hoạch từ cấp 4C lên đến <strong>4E</strong>.</p>
                <p>• Đường bay tiêu biểu: Nội Bài - Phan Thiết, TP.HCM - Phan Thiết, Vân Đồn - Phan Thiết.</p>
                <p>• Nhà ga hành khách mở rộng đạt công suất <strong>2 triệu khách/năm</strong>.</p>
              </div>
            </div>

            {/* Col 2: Cao tốc & Tàu lửa */}
            <div className="bg-white text-slate-900 p-5 space-y-3 shadow-md border-2 border-white">
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Cao tốc Phan Thiết" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-black text-sm text-[#0B2545] uppercase">CAO TỐC DẦU GIÂY - PHAN THIẾT</h4>
              <div className="space-y-1 text-xs text-slate-700 font-medium">
                <p>• Cao tốc Dầu Giây – Phan Thiết được đầu tư trị giá <strong>18,000 tỷ đồng</strong>, hoàn thành trong 36 tháng theo tiêu chuẩn quốc tế.</p>
                <p>• Tuyến tàu lửa 5 sao Sài Gòn – Phan Thiết vận hành phục vụ khách du lịch cao cấp.</p>
                <p>• Dự án cải tạo nâng cấp quốc lộ 1A thông suốt toàn tuyến.</p>
              </div>
            </div>

            {/* Col 3: Báo chí chính thống */}
            <div className="bg-[#0B2545] text-white p-5 space-y-3 shadow-md border-2 border-white">
              <h4 className="font-black text-sm text-amber-300 uppercase border-b border-white/20 pb-2">
                BÁO CHÍ CHÍNH THỐNG ĐƯA TIN
              </h4>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-3 bg-white/10 border border-white/20">
                  <p className="font-bold text-amber-300">Báo Thanh Niên:</p>
                  <p className="text-[11px] text-slate-300">"Cao tốc Dầu Giây - Phan Thiết đúng tiến độ, khu vực nào hưởng lợi lớn nhất từ thị trường BĐS biển?"</p>
                </div>
                <div className="p-3 bg-white/10 border border-white/20">
                  <p className="font-bold text-amber-300">Báo Người Lao Động:</p>
                  <p className="text-[11px] text-slate-300">"Thiếu tướng Nguyễn Văn Đức khẳng định tiến độ giải ngân xây dựng Cảng Hàng Không Phan Thiết."</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 11. MẶT BẰNG TỔNG THỂ 1.000HA ════════════════ */}
      <section id="mat-bang" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest">
              QUY HOẠCH ĐẠI ĐÔ THỊ NGHỈ DƯỠNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] uppercase">
              MẶT BẰNG TỔNG THỂ NOVAWORLD PHAN THIẾT
            </h2>
          </div>

          <div 
            className="border-4 border-[#0B2545] bg-white p-4 shadow-lg cursor-pointer group"
            onClick={() => setZoomImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')}
          >
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
              alt="Mặt bằng quy hoạch tổng thể NovaWorld"
              className="w-full object-cover max-h-[500px]"
            />
            <div className="pt-3 flex justify-between items-center text-xs text-slate-600 border-t border-slate-200 mt-2">
              <span>Sơ đồ bố trí các phân kỳ chức năng thuộc Integrated Resort 1.000ha</span>
              <span className="text-[#D92D20] font-bold flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Bấm xem phóng to mặt bằng nét
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 12. TIỆN ÍCH ĐẲNG CẤP NOVAWORLD PHAN THIẾT ════════════════ */}
      <section id="tien-ich" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#071F38] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 uppercase">
              TIỆN ÍCH ĐẲNG CẤP NOVAWORLD PHAN THIẾT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Novaworld Phan Thiết có quy mô lên đến 1000 ha, cung cấp 1200 sản phẩm biệt thự. Dự án là một quần thể nghỉ dưỡng đa phức hợp hay còn được gọi là mô hình <strong>Integrated Resort</strong>. Đây là dạng khu đô thị nghỉ dưỡng mới, thông minh và đa dạng loại hình lưu trú, vui chơi giải trí.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-200 font-medium">
              <p>✦ Sân Golf PGA 36 Hố</p>
              <p>✦ Công viên nước Ocean Kingdom</p>
              <p>✦ Quảng trường Bikini Beach 16ha</p>
              <p>✦ Công viên chủ đề Circus Land</p>
              <p>✦ Phức hợp thể thao Sport Complex</p>
              <p>✦ Chuỗi nhà hàng & Beach Club</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div 
              className="border-4 border-amber-400 aspect-[16/10] bg-slate-900 group cursor-pointer overflow-hidden shadow-2xl"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80"
                alt="Tiện ích Novotel NovaWorld"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 13. NHẬN TƯ VẤN CHUYÊN SÂU SECTION ════════════════ */}
      <section id="consultation-form-section" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center overflow-hidden">
        {/* Background Villa Shot */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" alt="Villa Night" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-3xl font-black text-amber-300 uppercase">
              NHẬN TƯ VẤN CHUYÊN SÂU
            </h3>
            <p className="text-sm font-bold text-white uppercase tracking-wider">
              "Chiết Khấu Đến 1.6 Tỷ" GTCH trong Tháng 11/2026
            </p>
            <p className="text-xs text-slate-300">
              NovaWorld Phan Thiết chỉ liên hệ và tư vấn theo thời gian đã đăng ký để đảm bảo quý khách sẽ không bị làm phiền.
            </p>
          </div>

          {/* Social Proof Live Ticker */}
          <div className="inline-block px-3 py-1 bg-black/60 border border-white/20 text-[11px] text-amber-300">
            • Đinh Văn Long, 0835983xxx đã đăng ký 33 phút trước
          </div>

          {submittedFormId === 'consultation-form' ? (
            <div className="bg-white text-slate-900 p-6 border-2 border-amber-400 animate-fadeIn">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-[#0B2545]">ĐĂNG KÝ THÀNH CÔNG!</h4>
              <p className="text-xs text-slate-600">Ban tổ chức sẽ liên hệ đón Quý khách theo thời gian đã hẹn.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleFormSubmit(e, 'consultation-form')} className="space-y-3 text-xs text-left bg-black/70 p-6 border border-white/30">
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Họ và tên *"
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
              />

              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="Số điện thoại (Zalo) *"
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
              />

              <input
                type="text"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                placeholder="Đăng ký lịch tham quan và tư vấn (VD: 9h sáng thứ 7)"
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
              />

              <select
                id="consultation-product-select"
                value={formProduct}
                onChange={(e) => setFormProduct(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
              >
                {productCards.map((p, idx) => (
                  <option key={idx} value={p.fullName}>
                    {p.fullName} - {p.price}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full py-3 bg-[#D92D20] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
              >
                ĐĂNG KÝ NGAY
              </button>
            </form>
          )}

          <p className="text-[10px] text-slate-400">
            * Quý khách vui lòng điền chính xác thông tin. Ban tổ chức sẽ gọi điện xác nhận thời gian & địa điểm đón KH sau ít phút.
          </p>
        </div>
      </section>

      {/* ════════════════ 14. FOOTER 3 COLUMNS (DEEP NAVY) ════════════════ */}
      <footer id="lien-he" className="bg-[#07172B] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-xl font-black tracking-tight text-white uppercase flex items-center">
                <span>Nova</span>
                <span className="text-[#14B8A6]">W</span>
                <span className="inline-block w-3.5 h-3.5 mx-0.5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500" />
                <span>RLD</span>
              </div>
            </div>
            <p className="text-slate-300 text-[11px] uppercase tracking-wider font-bold">
              SIÊU THÀNH PHỐ BIỂN - DU LỊCH - SỨC KHỎE
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Trực thuộc {companyGroup}. Quần thể nghỉ dưỡng 1.000ha tiêu chuẩn quốc tế tại vịnh biển Tiến Thành, Phan Thiết.
            </p>
          </div>

          {/* Col 2: Info */}
          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-black text-amber-300 text-xs uppercase mb-1">NOVAWORLD PHAN THIẾT</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hotline (24/7): <strong>{hotline}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: {email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Website: https://www.novaworldphanthiet.vn</span>
            </p>
          </div>

          {/* Col 3: Mini Fast Form */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-black text-amber-300 text-xs uppercase mb-1">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</h4>
            
            {submittedFormId === 'footer-form' ? (
              <div className="bg-white text-slate-900 p-3 text-center border border-amber-400">
                <p className="font-bold text-xs text-emerald-600">✓ Đã nhận thông tin!</p>
              </div>
            ) : (
              <form onSubmit={(e) => handleFormSubmit(e, 'footer-form')} className="space-y-2">
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Họ và tên *"
                  className="w-full px-3 py-2 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="Số điện thoại (Zalo) *"
                  className="w-full px-3 py-2 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                />
                <input
                  type="text"
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  placeholder="Thời gian muốn nhận tư vấn? (VD: 19h)"
                  className="w-full px-3 py-2 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#D92D20] hover:bg-red-700 text-white font-black uppercase tracking-wider transition cursor-pointer"
                >
                  ĐĂNG KÝ NGAY
                </button>
              </form>
            )}
          </div>

        </div>
      </footer>

      {/* ════════════════ 15. LIGHTBOX ZOOM MODAL ════════════════ */}
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

      {/* ════════════════ 16. FLOATING CONTACT BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 bg-[#D92D20] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl rounded-full transition"
        >
          <Phone className="w-4 h-4 animate-bounce text-amber-300" />
          <span className="hidden sm:inline">Hotline: {hotline}</span>
          <span className="sm:hidden">Gọi Ngay</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl rounded-full transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo</span>
        </a>
      </div>

    </div>
  );
}
