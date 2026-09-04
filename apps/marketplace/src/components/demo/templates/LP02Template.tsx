'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, Clock, 
  Sparkles, ShieldCheck, ChevronRight, Calculator, 
  Download, User, Building, Heart, Share2, Award, 
  TrendingUp, Calendar, ArrowRight, MessageCircle, Play, 
  Check, Layers, Star, ExternalLink, X, ZoomIn, Users,
  Briefcase, DollarSign, Gift, Target, GraduationCap,
  BookOpen, HelpCircle
} from 'lucide-react';

export interface LP02TemplateProps {
  template?: any;
  viewport?: string;
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any;
  posts?: any;
  pageContent?: any;
}

export default function LP02Template({
  template,
  company,
  projects,
  pageContent
}: LP02TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  // Brand & Company info fallback from CMS
  const firstProject = (projects && Array.isArray(projects) && projects.length > 0) ? projects[0] : null;
  const brandName = firstProject?.title || firstProject?.name || company?.name || template?.name || 'DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP';
  const companyGroup = 'CÁT TƯỜNG LAND GROUP';
  const hotline = company?.phone || '0919 006 030';
  const zalo = company?.zalo || hotline;
  const email = company?.email || 'admin@templatesbds.com';
  const address = company?.address || 'Tòa nhà Cát Tường Building, 259 Trần Hưng Đạo, Quận 1, TP.HCM & Hà Nội';

  // Lead Form States (Hero Application Form)
  const [heroFullName, setHeroFullName] = useState('');
  const [heroBirthYear, setHeroBirthYear] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [heroPosition, setHeroPosition] = useState('Chuyên Viên Kinh Doanh BĐS (Thu nhập 30-100tr)');
  const [heroExperience, setHeroExperience] = useState('Chưa có kinh nghiệm (Cần đào tạo từ đầu)');
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  // Quick Bottom Form State
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [isQuickSubmitted, setIsQuickSubmitted] = useState(false);

  // Lightbox Zoom Modal State
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Video State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPhone.trim()) return;
    setIsHeroSubmitted(true);
    setTimeout(() => setIsHeroSubmitted(false), 6000);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    setIsQuickSubmitted(true);
    setTimeout(() => setIsQuickSubmitted(false), 6000);
  };

  // Seamless UX: Automatically pre-select the position when clicking CTA buttons across the page
  const handleSelectPosition = (posName: string) => {
    setHeroPosition(posName);
    const element = document.getElementById('ung-tuyen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const selectEl = document.getElementById('hero-position-select') as HTMLSelectElement | null;
        if (selectEl) {
          selectEl.focus();
          selectEl.classList.add('ring-4', 'ring-amber-500', 'border-amber-500');
          setTimeout(() => selectEl.classList.remove('ring-4', 'ring-amber-500', 'border-amber-500'), 2000);
        }
      }, 350);
    }
  };

  // 12 Buổi Đào Tạo Thực Chiến BĐS Thiên Khôi / Cát Tường
  const trainingCurriculum = [
    { session: 'Buổi 1', title: 'Tổng quan thị trường BĐS & Luật Đất Đai mới 2026', tag: 'Nền tảng' },
    { session: 'Buổi 2', title: 'Kỹ năng định giá sản phẩm & Phân tích tiềm năng vị trí', tag: 'Kỹ năng' },
    { session: 'Buổi 3', title: 'Tìm kiếm khách hàng nét qua Facebook / Google / TikTok Ads', tag: 'Marketing' },
    { session: 'Buổi 4', title: 'Kỹ năng giao tiếp đỉnh cao & Thiết lập cuộc hẹn xem nhà', tag: 'Telesale' },
    { session: 'Buổi 5', title: 'Phong thủy ứng dụng & Đọc vị tâm lý khách hàng VIP', tag: 'Phong thủy' },
    { session: 'Buổi 6', title: 'Khảo sát thực địa dự án & Quy trình pháp lý mua bán', tag: 'Thực địa' },
    { session: 'Buổi 7', title: 'Nghệ thuật xử lý từ chối & Đàm phán giá không khoan nhượng', tag: 'Đàm phán' },
    { session: 'Buổi 8', title: 'Kỹ thuật chốt cọc thần tốc & Giữ chỗ ưu tiên', tag: 'Chốt Sale' },
    { session: 'Buổi 9', title: 'Tư vấn gói vay ngân hàng & Giải bài toán dòng tiền', tag: 'Tài chính' },
    { session: 'Buổi 10', title: 'Xây dựng thương hiệu cá nhân Triệu Đô trên MXH', tag: 'Branding' },
    { session: 'Buổi 11', title: 'Chăm sóc khách hàng sau bán & Khai thác mối quan hệ', tag: 'Quan hệ' },
    { session: 'Buổi 12', title: 'Thực chiến dẫn khách chốt deal cùng Giám Đốc Khối', tag: 'Thực chiến' },
  ];

  // 6 Quyền lợi nổi bật
  const benefitsList = [
    {
      icon: DollarSign,
      title: 'Hoa Hồng Tới 70%',
      desc: 'Mức hoa hồng cao nhất thị trường, thanh toán liền tay sau khi hoàn tất cọc hợp đồng.'
    },
    {
      icon: Briefcase,
      title: 'Lương Cứng Ổn Định',
      desc: 'Lương cứng từ 6.000.000đ - 15.000.000đ/tháng không áp chỉ tiêu doanh số tháng đầu.'
    },
    {
      icon: GraduationCap,
      title: 'Đào Tạo Từ A - Z',
      desc: 'Giáo trình BĐS thực chiến bài bản 1 kèm 1, không yêu cầu kinh nghiệm ban đầu.'
    },
    {
      icon: Gift,
      title: 'Thưởng Nóng & Du Lịch',
      desc: 'Thưởng xe SH, vàng 9999 và các chuyến du lịch nghỉ dưỡng 5 sao trong & ngoài nước.'
    },
    {
      icon: Layers,
      title: 'Giỏ Hàng 10.000+ Căn',
      desc: 'Nguồn hàng độc quyền phân phối chính thức từ các chủ đầu tư lớn pháp lý hoàn chỉnh.'
    },
    {
      icon: Award,
      title: 'Lộ Trình Thăng Tiến',
      desc: 'Xét duyệt lên Trưởng Phòng Kinh Doanh / Giám Đốc Chi Nhánh chỉ sau 6 tháng cống hiến.'
    },
  ];

  // 4 Ảnh hoạt động doanh nghiệp
  const companyGallery = [
    {
      title: 'Trụ sở văn phòng làm việc hiện đại chuẩn A',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    },
    {
      title: 'Khu vực tiếp khách và đàm phán VIP',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    },
    {
      title: 'Lễ vinh danh và trao thưởng Best Seller',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    },
    {
      title: 'Team Building gắn kết đại gia đình chiến binh',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-red-600 selection:text-white">
      
      {/* ════════════════ 1. TOP BAR ════════════════ */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C1121F] text-white flex items-center justify-center font-black shadow-md">
              <span className="text-base tracking-tighter">{(company as any)?.brandShort || "LP"}</span>
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-[#C1121F] tracking-wide uppercase block leading-none">
                {(company as any)?.logoText || "LP BDS02"}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                {brandName}
              </span>
            </div>
          </div>

          {/* Contact Fast Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href={`mailto:${email}`} className="hidden md:flex items-center gap-1.5 text-slate-600 hover:text-red-600 transition-colors">
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>{email}</span>
            </a>
            <a href={`tel:${hotline}`} className="flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 transition-colors">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Hotline: {hotline}</span>
            </a>
            <a
              href="#ung-tuyen"
              className="px-4 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#B38A1F] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Nộp Hồ Sơ
            </a>
          </div>

        </div>
      </div>

      {/* ════════════════ 2. SUB-NAVBAR CHUYÊN NGHIỆP ════════════════ */}
      <nav className="sticky top-0 z-40 bg-[#C1121F] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar whitespace-nowrap py-1">
            <a href="#tong-quan" className="hover:text-amber-300 transition-colors">Tổng Quan</a>
            <a href="#ve-chung-toi" className="hover:text-amber-300 transition-colors">Về Chúng Tôi</a>
            <a href="#quyen-loi" className="hover:text-amber-300 transition-colors">Quyền Lợi Sale</a>
            <a href="#dao-tao" className="hover:text-amber-300 transition-colors">Giáo Trình Đào Tạo</a>
            <a href="#clip-tuyen-dung" className="hover:text-amber-300 transition-colors">Clip Tuyển Dụng</a>
            <a href="#yeu-cau" className="hover:text-amber-300 transition-colors">Yêu Cầu</a>
          </div>

          <a
            href="#ung-tuyen"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-amber-300 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>Ứng Tuyển Nhanh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* ════════════════ 3. HERO SECTION & APPLICATION LEAD FORM (Lưới lọc phễu số 1) ════════════════ */}
      <section id="tong-quan" className="relative bg-gradient-to-b from-[#FFF9F2] via-[#FBF5ED] to-[#F3ECE0] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-amber-900/10 overflow-hidden">
        {/* Subtle Luxury Pattern Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#C1121F_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
          
          {/* Left Column: Big Recruitment Headline Banner & Value Pillars */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-300 text-red-700 text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>ĐỢT TUYỂN DỤNG QUY MÔ LỚN NHẤT NĂM 2026</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-amber-600 font-black text-2xl sm:text-3xl tracking-tight uppercase">
                TUYỂN DỤNG
              </h2>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#C1121F] tracking-tight leading-tight uppercase">
                300 <span className="text-2xl sm:text-4xl text-slate-900 font-extrabold">CHUYÊN VIÊN</span> <br />
                <span className="text-2xl sm:text-4xl text-[#C1121F]">KINH DOANH BẤT ĐỘNG SẢN</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Bạn đang tìm kiếm cơ hội <strong>đột phá thu nhập từ 30 - 100 triệu/tháng</strong>? Gia nhập ngay <strong>{brandName}</strong> — Nơi biến những người chưa có kinh nghiệm trở thành những Best Seller BĐS hàng đầu với giáo trình thực chiến và giỏ hàng hoa hồng cao nhất thị trường!
            </p>

            {/* Quick 3 Value Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-red-200 shadow-xs flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hoa hồng tới 70%</span>
              </div>
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-red-200 shadow-xs flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không cần kinh nghiệm</span>
              </div>
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-red-200 shadow-xs flex items-center gap-2 font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Phỏng vấn đi làm ngay</span>
              </div>
            </div>

            {/* 4 Impact Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-xs text-center">
                <span className="text-xl sm:text-2xl font-black text-[#C1121F] block">500+</span>
                <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Chiến Binh Sale</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-xs text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-600 block">30-100Tr</span>
                <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Thu Nhập/Tháng</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-xs text-center">
                <span className="text-xl sm:text-2xl font-black text-[#C1121F] block">10.000+</span>
                <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Giỏ Hàng F1</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/80 shadow-xs text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 block">100%</span>
                <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Kèm Cặp 1-1</span>
              </div>
            </div>

            {/* Social Proof & Video Fast Link */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 p-3.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-amber-900/10">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Sale 1" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Sale 2" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" alt="Sale 3" />
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Hơn <strong>128 ứng viên</strong> vừa phỏng vấn và chốt deal trong tháng!
                </p>
              </div>

              <a
                href="#clip-tuyen-dung"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 underline decoration-red-400/60 underline-offset-4"
              >
                <Play className="w-3.5 h-3.5 text-red-600 fill-current" />
                <span>Xem Video Văn Hóa</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Application Form (Lưới Lọc Lead Phễu Số 1) */}
          <div id="ung-tuyen" className="lg:col-span-5">
            <div className="bg-white border-2 border-red-500 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-900/10 text-left relative overflow-hidden">
              
              <div className="text-center mb-5">
                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest block mb-1">
                  ĐĂNG KÝ HÔM NAY — NHẬN LỊCH HẸN 24H
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#C1121F] uppercase tracking-tight">
                  ĐĂNG KÝ ỨNG TUYỂN
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Điền thông tin để phòng nhân sự liên hệ phỏng vấn trực tiếp
                </p>
              </div>

              {isHeroSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-800">ĐÃ GỬI HỒ SƠ THÀNH CÔNG!</h4>
                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                    Phòng Nhân Sự <strong>{brandName}</strong> đã tiếp nhận hồ sơ của <strong>{heroFullName || 'bạn'}</strong>. Chúng tôi sẽ gọi lại qua số điện thoại <strong>{heroPhone}</strong> trong vòng 24 giờ làm việc.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Họ và tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={heroFullName}
                      onChange={(e) => setHeroFullName(e.target.value)}
                      placeholder="Ví dụ: Trần Văn Nam"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-[11px]">Năm sinh *</label>
                      <input
                        type="number"
                        required
                        value={heroBirthYear}
                        onChange={(e) => setHeroBirthYear(e.target.value)}
                        placeholder="Ví dụ: 1998"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 text-[11px]">Số điện thoại (Zalo) *</label>
                      <input
                        type="tel"
                        required
                        value={heroPhone}
                        onChange={(e) => setHeroPhone(e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Email nhận thư mời phỏng vấn</label>
                    <input
                      type="email"
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="email@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Vị trí bạn muốn ứng tuyển</label>
                    <select
                      id="hero-position-select"
                      value={heroPosition}
                      onChange={(e) => setHeroPosition(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all duration-300"
                    >
                      <option className="text-slate-900 bg-white font-medium" value="Chuyên Viên Kinh Doanh BĐS">Chuyên Viên Kinh Doanh BĐS (Toàn thời gian)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Trưởng Nhóm Kinh Doanh">Trưởng Nhóm / Trưởng Phòng Kinh Doanh</option>
                      <option className="text-slate-900 bg-white font-medium" value="Chuyên Viên Pháp Lý & Định Giá">Chuyên Viên Pháp Lý & Thủ Tục BĐS</option>
                      <option className="text-slate-900 bg-white font-medium" value="Cộng Tác Viên Bán Hàng Tự Do">Cộng Tác Viên Bán Hàng (Bán thời gian)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 text-[11px]">Kinh nghiệm BĐS hiện tại</label>
                    <select
                      value={heroExperience}
                      onChange={(e) => setHeroExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium border border-slate-300 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
                    >
                      <option className="text-slate-900 bg-white font-medium" value="Chưa có kinh nghiệm">Chưa có kinh nghiệm (Cần đào tạo 1 kèm 1)</option>
                      <option className="text-slate-900 bg-white font-medium" value="Dưới 1 năm kinh nghiệm">Dưới 1 năm kinh nghiệm BĐS / Sales</option>
                      <option className="text-slate-900 bg-white font-medium" value="Từ 1 - 3 năm kinh nghiệm">Từ 1 - 3 năm kinh nghiệm thực chiến</option>
                      <option className="text-slate-900 bg-white font-medium" value="Trên 3 năm kinh nghiệm">Trên 3 năm kinh nghiệm (Ứng tuyển Quản lý)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] via-amber-500 to-[#C59B27] hover:from-amber-600 hover:to-amber-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-600/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>ĐĂNG KÝ ỨNG TUYỂN NGAY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bảo mật thông tin ứng viên tuyệt đối · Phỏng vấn miễn phí 100%</span>
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 4. VỀ CHÚNG TÔI - BẤT ĐỘNG SẢN KIM TINH ════════════════ */}
      <section id="ve-chung-toi" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Team Leadership Image */}
          <div className="lg:col-span-6">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
                alt="Ban Lãnh Đạo & Đội Ngũ BĐS Kim Tinh"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-left">
                  <span className="text-xs font-bold text-amber-300 block">ĐẠI GIA ĐÌNH BĐS KIM TINH</span>
                  <span className="text-sm font-black uppercase">Chuyên Nghiệp — Tận Tâm — Bứt Phá</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold text-[#C1121F] uppercase tracking-widest block mb-1">
                VỀ CHÚNG TÔI
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                {brandName}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Được thành lập với sứ mệnh mang đến môi trường làm việc nhân văn, chuyên nghiệp và tạo cơ hội làm giàu chân chính cho thế hệ trẻ, <strong>{brandName}</strong> trực thuộc <strong>{companyGroup}</strong> tự hào là đối tác chiến lược phân phối hàng đầu của các tập đoàn BĐS lớn tại Việt Nam.
            </p>

            {/* 4 Key Milestones */}
            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
                <CheckCircle2 className="w-5 h-5 text-[#C1121F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Top 5 Đơn Vị Phân Phối BĐS Xuất Sắc Nhất:</span>
                  <span>Được vinh danh bởi Hiệp hội Bất Động Sản Việt Nam 3 năm liên tiếp.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
                <CheckCircle2 className="w-5 h-5 text-[#C1121F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Quy Mô 500+ Nhân Sự & 8 Chi Nhánh:</span>
                  <span>Trụ sở chính tại TP.HCM, Hà Nội, Đà Nẵng, Bình Dương và các tỉnh thành trọng điểm.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
                <CheckCircle2 className="w-5 h-5 text-[#C1121F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Đã Phân Phối Hơn 50+ Đại Dự Án:</span>
                  <span>Tổng giá trị giao dịch thành công vượt mốc 15.000 tỷ đồng.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#ung-tuyen"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C1121F] hover:bg-red-800 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>GIA NHẬP ĐỘI NGŨ NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 5. QUYỀN LỢI CỦA CHUYÊN VIÊN BĐS ════════════════ */}
      <section id="quyen-loi" className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C1121F] uppercase tracking-widest">
              CHẾ ĐỘ ĐÃI NGỘ CAO NHẤT THỊ TRƯỜNG
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              QUYỀN LỢI CỦA CHUYÊN VIÊN KINH DOANH
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chúng tôi cam kết mang lại mức thu nhập xứng đáng nhất cho từng nỗ lực cống hiến của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsList.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-red-400 transition-all duration-300 text-left space-y-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-black text-base text-slate-900 group-hover:text-[#C1121F] transition-colors">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed break-words">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ════════════════ 6. NỘI DUNG ĐÀO TẠO THIÊN KHÔI (12 BUỔI THỰC CHIẾN) ════════════════ */}
      <section id="dao-tao" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C1121F] uppercase tracking-widest">
              GIÁO TRÌNH BÀI BẢN CHUẨN QUỐC TẾ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              NỘI DUNG ĐÀO TẠO BĐS THỰC CHIẾN
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              12 buổi đào tạo chuyên sâu giúp một người hoàn toàn chưa biết gì về BĐS trở thành một Best Seller tự tin chốt giao dịch tiền tỷ.
            </p>
          </div>

          {/* Grid 12 Training Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {trainingCurriculum.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FDFBF7] border border-amber-200/80 flex items-center justify-between gap-4 text-left hover:bg-red-50/60 hover:border-red-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#C1121F] text-white font-black text-xs shrink-0">
                    {item.session}
                  </span>
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => handleSelectPosition('Chuyên Viên Kinh Doanh BĐS')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C59B27] hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>ĐĂNG KÝ THAM GIA KHÓA ĐÀO TẠO MIỄN PHÍ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ════════════════ 7. CLIP TUYỂN DỤNG OFFICIAL ════════════════ */}
      <section id="clip-tuyen-dung" className="py-16 bg-[#0B0F19] text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#C1121F] text-white flex items-center justify-center font-black mx-auto shadow-md">
              CT
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              TRẢI NGHIỆM KHÔNG KHÍ LÀM VIỆC THỰC TẾ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              CLIP TUYỂN DỤNG OFFICIAL
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Lắng nghe chia sẻ thực tế từ các bạn trẻ 9x, 2k đã đổi đời, sở hữu nhà và xe hơi chỉ sau 1 năm gia nhập {brandName}.
            </p>
          </div>

          {/* Video Mockup Frame */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-950 aspect-video group">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
              alt="Video Clip Tuyển Dụng"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center p-6">
              <button
                onClick={() => setZoomImage('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80')}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-8 ring-red-500/30"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <span className="mt-4 text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                Bấm để xem video phóng sự tuyển dụng (4:12s)
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════ 8. YÊU CẦU TUYỂN DỤNG ════════════════ */}
      <section id="yeu-cau" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-square group cursor-pointer"
              onClick={() => setZoomImage('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                alt="Tinh thần đồng đội gắn kết"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold text-[#C1121F] uppercase tracking-widest block mb-1">
                TIÊU CHÍ ỨNG VIÊN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                YÊU CẦU TUYỂN DỤNG ĐƠN GIẢN
              </h2>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDFBF7] border border-amber-200">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Độ tuổi & Thái độ:</span>
                  <span>Nam/Nữ từ 18 – 35 tuổi, có tinh thần cầu tiến, ham học hỏi và đam mê làm giàu.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDFBF7] border border-amber-200">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Kỹ năng giao tiếp:</span>
                  <span>Giao tiếp tự tin, có tinh thần trách nhiệm, kiên trì và không ngại khó.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDFBF7] border border-amber-200">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Công cụ làm việc:</span>
                  <span>Có phương tiện đi lại (xe máy) và thiết bị làm việc (Smartphone / Laptop cá nhân).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDFBF7] border border-amber-200">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Kinh nghiệm:</span>
                  <span className="text-red-700 font-bold">KHÔNG YÊU CẦU KINH NGHIỆM — Được đào tạo bài bản từ đầu!</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════ 9. HÌNH ẢNH GIA ĐÌNH BĐS KIM TINH ════════════════ */}
      <section className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10 text-center">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C1121F] uppercase tracking-widest">
              MÔI TRƯỜNG LÀM VIỆC ĐÁNG MƠ ƯỚC
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              HÌNH ẢNH GIA ĐÌNH BĐS KIM TINH
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Những khoảnh khắc làm việc hăng say, vinh danh rực rỡ và những chuyến du lịch tràn ngập tiếng cười của đại gia đình chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companyGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setZoomImage(item.image)}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-amber-200"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-bold text-white text-left leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════ 10. FORM NỘP HỒ SƠ NHANH (Lưới lọc phễu số 2) ════════════════ */}
      <section className="py-12 bg-gradient-to-r from-red-700 via-[#C1121F] to-rose-700 text-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
              SỐ LƯỢNG CHỈ CÒN 45 CHỈ TIÊU TRONG THÁNG
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-amber-300">
              NỘP HỒ SƠ NHẬN LỊCH PHỎNG VẤN TRONG 24H
            </h3>
            <p className="text-xs text-slate-100 font-medium">
              Chỉ cần để lại số điện thoại, chuyên viên nhân sự sẽ gọi điện tư vấn và xếp lịch hẹn thuận tiện nhất cho bạn.
            </p>
          </div>

          {isQuickSubmitted ? (
            <div className="bg-slate-950 text-amber-300 px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>Đã tiếp nhận! Nhân sự sẽ liên hệ bạn ngay trong ngày.</span>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                required
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder="Họ và tên"
                className="px-4 py-3 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-400 text-xs w-full sm:w-40 border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none"
              />
              <input
                type="tel"
                required
                value={quickPhone}
                onChange={(e) => setQuickPhone(e.target.value)}
                placeholder="Số điện thoại (Zalo)"
                className="px-4 py-3 rounded-xl bg-white text-slate-900 font-bold placeholder:text-slate-400 text-xs w-full sm:w-44 border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C59B27] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 w-full sm:w-auto cursor-pointer"
              >
                NỘP HỒ SƠ
              </button>
            </form>
          )}

        </div>
      </section>

      {/* ════════════════ 11. FOOTER & TRỤ SỞ LIÊN HỆ ════════════════ */}
      <footer className="bg-[#181C26] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C1121F] text-white flex items-center justify-center font-black">
                CT
              </div>
              <span className="font-black text-sm text-white uppercase tracking-wider">
                {brandName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Trực thuộc Tập đoàn {companyGroup}. Hệ thống phân phối bất động sản chuyên nghiệp uy tín hàng đầu Việt Nam.
            </p>
          </div>

          <div className="space-y-2 text-[11px] text-slate-300">
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">PHÒNG NHÂN SỰ & TUYỂN DỤNG</h4>
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
            <h4 className="font-bold text-amber-400 text-xs uppercase mb-1">THỜI GIAN LÀM VIỆC</h4>
            <p>✓ Thứ 2 – Thứ 7: 08:00 – 17:30</p>
            <p>✓ Tiếp nhận hồ sơ trực tuyến: 24/7</p>
            <p>✓ Hỗ trợ ứng viên tỉnh xa sắp xếp chỗ ở ban đầu.</p>
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

      {/* ════════════════ 13. FLOATING BUTTONS ════════════════ */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a
          href={`tel:${hotline}`}
          className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline">Hotline Nhân Sự: {hotline}</span>
          <span className="sm:hidden">Gọi Nhân Sự</span>
        </a>

        <a
          href={`https://zalo.me/${zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Zalo Nhân Sự</span>
        </a>
      </div>

    </div>
  );
}
