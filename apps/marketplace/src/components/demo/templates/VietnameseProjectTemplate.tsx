import React, { useState } from 'react';
import { 
  ArrowRight, Building2, CalendarDays, ChevronRight, MapPin, Menu, Phone, 
  Search, ShieldCheck, X, CheckCircle2, MessageCircle, Star, Sparkles, 
  TrendingUp, Award, Calculator, DollarSign, Download, Users, Zap
} from 'lucide-react';
import { Template } from '../../../data/templatesData';

type Props = { template: Template; viewport?: 'desktop' | 'tablet' | 'mobile'; initialPage?: string };

const VARIANTS: Record<string, {
  brand: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImg: string;
  featureImg: string;
  palette: { ink: string; accent: string; paper: string; dark: string };
  stats: { value: string; label: string }[];
  projects: { name: string; type: string; price: string; area: string; img: string; desc: string }[];
  amenities: { icon: string; title: string; desc: string }[];
  highlights: string[];
}> = {
  'bds-17': {
    brand: 'SÀN PHÂN PHỐI DỰ ÁN QUỐC GIA',
    badge: 'ĐỐI TÁC CHIẾN LƯỢC F1',
    heroTitle: 'Sàn Phân Phối Dự Án — Đối Tác Tin Cậy',
    heroSubtitle: 'Đơn vị phân phối độc quyền và chiến lược của Vinhomes, Masterise Homes, Novaland và Ecopark trên toàn quốc với giỏ hàng hơn 50 dự án.',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
    featureImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=85',
    palette: { ink: '#0f4c81', accent: '#38bdf8', paper: '#f8fafc', dark: '#0a2540' },
    stats: [
      { value: '50+ Dự Án', label: 'Phân phối độc quyền F1' },
      { value: '1.200+', label: 'Chuyên viên tư vấn chính thức' },
      { value: '18.000+', label: 'Giao dịch thành công' },
      { value: 'Top 1', label: 'Sàn phân phối xuất sắc' },
    ],
    projects: [
      { name: 'Vinhomes Royal Island Hải Phòng', type: 'Đại Đô Thị Đảo', price: 'Từ 8.5 Tỷ', area: '120 - 450 m²', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', desc: 'Đảo Vũ Yên biệt lập, bến du thuyền và sân golf 36 hố.' },
      { name: 'Masteri Centre Point Q9', type: 'Căn Hộ Hạng Sang', price: 'Từ 3.8 Tỷ', area: '54 - 98 m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', desc: 'Trung tâm Vinhomes Grand Park, nhận nhà ở ngay sổ hồng trao tay.' },
      { name: 'Eaton Park Gamuda Land', type: 'Căn Hộ Xanh Cao Cấp', price: 'Từ 6.8 Tỷ', area: '65 - 120 m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: 'Mặt tiền Mai Chí Thọ TP. Thủ Đức, chính sách thanh toán 5%/năm.' },
    ],
    amenities: [
      { icon: '🏆', title: 'Đại Lý F1 Phân Phối Trực Tiếp', desc: 'Nhận giỏ hàng gốc từ chủ đầu tư không qua trung gian.' },
      { icon: '📑', title: 'Hồ Sơ Pháp Lý Minh Bạch', desc: 'Cung cấp giấy phép xây dựng, phê duyệt 1/500 và sổ hồng mẫu.' },
      { icon: '🚗', title: 'Xe Maybach Đưa Đón Xem Nhà', desc: 'Đội xe phục vụ khách VIP tham quan sa bàn và căn hộ thực tế.' },
      { icon: '💳', title: 'Gói Tài Chính Ưu Đãi 0% Lãi', desc: 'Liên kết ngân hàng Vietcombank, Techcombank, BIDV ân hạn 36 tháng.' },
    ],
    highlights: ['Đối tác chiến lược Vinhomes & Masterise', 'Giỏ hàng độc quyền quỹ căn tầng đẹp', 'Chiết khấu bổ sung 1-2% từ đại lý F1', 'Tư vấn pháp lý công chứng trọn gói'],
  },

  'bds-18': {
    brand: 'ECO GREEN LIVING CONDOS',
    badge: 'CĂN HỘ XANH CHUẨN EDGE',
    heroTitle: 'Căn Hộ Sống Xanh — Sống Khỏe Mỗi Ngày',
    heroSubtitle: 'Không gian sống sinh thái giữa lòng đô thị với vườn treo thẳng đứng, hệ thống lọc không khí PM2.5 và năng lượng xanh tái tạo.',
    heroImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    featureImg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1100&q=85',
    palette: { ink: '#0f766e', accent: '#10b981', paper: '#f0fdfa', dark: '#134e4a' },
    stats: [
      { value: '70%', label: 'Mật độ cảnh quan xanh' },
      { value: 'AQI < 15', label: 'Không khí trong lành chuẩn Âu' },
      { value: 'Tiết kiệm 30%', label: 'Điện năng & Nước sinh hoạt' },
      { value: 'Sổ hồng', label: 'Sở hữu lâu dài vĩnh viễn' },
    ],
    projects: [
      { name: 'Căn Hộ 1PN Vườn Treo', type: '1PN Eco Green', price: '2.85 Tỷ', area: '56 m²', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', desc: 'Ban công vườn hoa ngát hương, kính Low-E cản nhiệt 99%.' },
      { name: 'Căn Hộ 2PN Góc 2 Mặt Thoáng', type: '2PN Eco Family', price: '4.35 Tỷ', area: '78 m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: 'Bếp mở thông thoáng tự nhiên, hệ thống cấp khí tươi lọc PM2.5.' },
      { name: 'Sky Villa Onsen Tầng Mái', type: 'Penthouse Onsen', price: '9.2 Tỷ', area: '145 m²', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', desc: 'Bồn tắm khoáng nóng ngoài trời ngắm trọn công viên 50 ha.' },
    ],
    amenities: [
      { icon: '🌿', title: 'Vườn Treo Nhiệt Đới Thẳng Đứng', desc: 'Phủ xanh 100% ban công và mặt ngoài tòa tháp giúp giảm nhiệt 3°C.' },
      { icon: '🏊‍♂️', title: 'Hồ Bơi Vô Cực Nước Khoáng', desc: 'Khử khuẩn điện phân muối không clo an toàn cho da và mắt trẻ nhỏ.' },
      { icon: '🌬️', title: 'Hệ Khí Tươi Lọc Bụi Mịn', desc: 'Cung cấp oxy tươi giàu ion âm vào từng phòng ngủ 24/24.' },
      { icon: '⚡', title: 'Năng Lượng Mặt Trời Áp Mái', desc: 'Tiết kiệm chi phí điện chiếu sáng và dịch vụ công cộng.' },
    ],
    highlights: ['Chứng chỉ công trình xanh EDGE Quốc Tế', 'Công viên nội khu 3 hecta hồ cảnh quan', 'Trường mầm non quốc tế ngay tầng trệt', 'Chính sách vay 0% lãi suất trong 24 tháng'],
  },

  'bds-19': {
    brand: 'GARDEN URBAN TOWNSHIP',
    badge: 'KHU ĐÔ THỊ VƯỜN SINH THÁI',
    heroTitle: 'Khu Đô Thị Vườn — An Trú Giữa Thiên Nhiên',
    heroSubtitle: 'Quy hoạch chuẩn mực theo mô hình phố vườn châu Âu, nơi trẻ nhỏ tự do vui đùa trên thảm cỏ và ông bà an hưởng tuổi già thanh bình.',
    heroImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85',
    featureImg: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=85',
    palette: { ink: '#166534', accent: '#84cc16', paper: '#f0fdf4', dark: '#14532d' },
    stats: [
      { value: '150 Ha', label: 'Quy mô đại đô thị vườn' },
      { value: '5 Đại Công Viên', label: 'Chủ đề sinh thái đa dạng' },
      { value: '1/500', label: 'Quy hoạch pháp lý hoàn chỉnh' },
      { value: 'Nhận Nhà 2026', label: 'Tiến độ xây dựng vượt chuẩn' },
    ],
    projects: [
      { name: 'Nhà Phố Liền Kề Vườn Hoa', type: 'Nhà Phố Vườn', price: '4.8 Tỷ', area: '100m² (Sàn 250m²)', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', desc: 'Sân trước 3m để ô tô, sân sau 2m làm vườn rau hữu cơ.' },
      { name: 'Biệt Thự Song Lập Hồ Cảnh Quan', type: 'Song Lập Vườn', price: '8.5 Tỷ', area: '200m² (Sàn 320m²)', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80', desc: '3 Mặt sân vườn thoáng đãng view hồ điều hòa rộng 10 ha.' },
      { name: 'Shophouse Phố Vườn Đi Bộ', type: 'Shophouse Vườn', price: '7.2 Tỷ', area: '120m² (Sàn 350m²)', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', desc: 'Trục đường chính 24m vừa ở vừa kinh doanh sinh lời cao.' },
    ],
    amenities: [
      { icon: '🌳', title: '5 Đại Công Viên Chủ Đề', desc: 'Công viên Rừng Cọ, Vườn Bướm, Đảo Cắm Trại BBQ và Khu Thể Thao.' },
      { icon: '🚲', title: 'Đường Chạy Bộ Ven Kênh 10km', desc: 'Tuyến đường rợp bóng cây cổ thụ dành cho đạp xe và đi bộ mỗi sáng.' },
      { icon: '🏫', title: 'Trường Liên Cấp Chuẩn Quốc Tế', desc: 'Hệ thống giáo dục từ Mầm non đến THPT ngay trong nội khu đô thị.' },
      { icon: '🛡️', title: 'An Ninh Tuần Tra Khép Kín 24/7', desc: 'Đảm bảo môi trường sống an toàn tuyệt đối cho trẻ nhỏ và người cao tuổi.' },
    ],
    highlights: ['Sơ đồ phân lô 1/500 minh bạch', 'Thanh toán giãn tiến độ 36 tháng không lãi', 'Hạ tầng điện nước ngầm hoàn chỉnh 100%', 'Sổ đỏ trao tay từng căn khi bàn giao'],
  },

  'bds-20': {
    brand: 'CHUYÊN VIÊN TƯ VẤN BĐS ZALO PRO',
    badge: 'TƯ VẤN 1-1 QUA ZALO 24/7',
    heroTitle: 'Tư Vấn BĐS Qua Zalo — Hỗ Trợ 24/7',
    heroSubtitle: 'Kết nối trực tiếp chuyên viên tư vấn cao cấp qua Zalo. Nhận ngay trọn bộ bảng giá gốc CĐT, sơ đồ mặt bằng và chính sách chiết khấu chỉ sau 2 phút.',
    heroImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=85',
    featureImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1100&q=85',
    palette: { ink: '#0068ff', accent: '#0052cc', paper: '#eff6ff', dark: '#073b5c' },
    stats: [
      { value: '2 Phút', label: 'Phản hồi gửi bảng giá Zalo' },
      { value: '500+ Khách', label: 'Đã tư vấn mua nhà thành công' },
      { value: '100% Free', label: 'Hỗ trợ xem sa bàn & xe đưa đón' },
      { value: 'Top Performer', label: 'Chuyên viên xuất sắc 5 năm' },
    ],
    projects: [
      { name: 'Quỹ Căn Vinhomes Ngoại Giao Giá Tốt', type: 'Suất Ngoại Giao', price: 'Từ 2.6 Tỷ', area: '50 - 110 m²', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', desc: 'Chiết khấu thêm 3% cho khách kết nối trực tiếp qua Zalo.' },
      { name: 'Biệt Thự Chuyển Nhượng Cắt Lỗ Sâu', type: 'Chuyển Nhượng VIP', price: 'Từ 12.5 Tỷ', area: '250 m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', desc: 'Chủ nhà kẹt tiền gửi bán gấp, rẻ hơn thị trường 2 Tỷ, sổ hồng sẵn.' },
      { name: 'Shophouse Dòng Tiền Đang Cho Thuê', type: 'BĐS Dòng Tiền', price: 'Từ 8.2 Tỷ', area: '120 m²', img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80', desc: 'Đang có sẵn hợp đồng thuê 35 Tr/tháng với chuỗi thuốc Long Châu.' },
    ],
    amenities: [
      { icon: '💬', title: 'Tư Vấn Zalo 1 Chạm Nhanh Chóng', desc: 'Nhận thông tin quỹ căn mới nhất trực tiếp trên điện thoại không làm phiền.' },
      { icon: '📊', title: 'So Sánh & Đánh Giá Pháp Lý', desc: 'Phân tích ưu nhược điểm từng dự án một cách khách quan, minh bạch.' },
      { icon: '🚗', title: 'Đưa Đón Xem Nhà Miễn Phí', desc: 'Hỗ trợ xe riêng đưa đón khách tham quan thực tế tất cả các ngày trong tuần.' },
      { icon: '💰', title: 'Đàm Phán Giá Tốt Nhất', desc: 'Hỗ trợ khách hàng thương lượng giá tốt nhất trực tiếp với chủ nhà/CĐT.' },
    ],
    highlights: ['Chat Zalo trực tiếp nhận file PDF trong 2 phút', 'Tư vấn giải pháp vay ngân hàng lãi suất thấp nhất', 'Hỗ trợ thủ tục công chứng sang tên trọn gói', 'Cam kết bảo mật thông tin khách hàng tuyệt đối'],
  },
};

export default function VietnameseProjectTemplate({ template, initialPage = 'home' }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const cfg = VARIANTS[template.slug] || VARIANTS['bds-17'];
  const palette = cfg.palette;
  const isSubpage = initialPage !== 'home';
  const demoUrl = (page = 'home') => page === 'home' ? `/demo/${template.slug}` : `/demo/${template.slug}/${page}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone) return alert('Vui lòng nhập số điện thoại hoặc Zalo!');
    setSubmitted(true);
    alert(`🎉 Đã tiếp nhận đăng ký của ${leadName || 'quý khách'} (${leadPhone}). Chuyên viên sẽ liên hệ gửi bảng giá qua Zalo trong 2 phút!`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans transition-colors">
      {/* Top Banner */}
      <div className="bg-slate-950 text-slate-200 text-[10px] sm:text-xs">
        <div className="mx-auto max-w-7xl px-5 py-2 flex justify-between items-center">
          <span>👑 Hệ thống giao diện độc quyền — {template.name}</span>
          <div className="flex items-center gap-4">
            <span>Hotline: <strong>0919 006 030</strong></span>
            <span className="hidden sm:inline">Zalo: <strong>0919 006 030</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-5 h-20 flex items-center justify-between gap-5">
          <a href={demoUrl()} className="font-black leading-tight tracking-tight" style={{ color: palette.ink }}>
            <span className="block text-xl sm:text-2xl">{cfg.brand}</span>
            <span className="text-[10px] tracking-[.2em] uppercase opacity-70 block">{cfg.badge}</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider">
            <a href="#hero" className="hover:opacity-75 transition">Trang chủ</a>
            <a href="#du-an" className="hover:opacity-75 transition">Quỹ căn</a>
            <a href="#gioi-thieu" className="hover:opacity-75 transition">Giới thiệu</a>
            <a href="#tien-ich" className="hover:opacity-75 transition">Tiện ích</a>
            <a href="#vi-tri" className="hover:opacity-75 transition">Vị trí</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a href="tel:0919006030" className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-slate-200 rounded-sm hover:bg-slate-50">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> 0919 006 030
            </a>
            <a href="#lien-he" className="px-5 py-2.5 text-xs font-black text-white rounded-sm shadow-md transition hover:brightness-110" style={{ background: palette.ink }}>
              Tải Bảng Giá VIP
            </a>
          </div>

          <button className="md:hidden p-2.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden px-5 pb-6 grid gap-3 text-sm font-bold bg-white border-t">
            <a href="#hero">Trang chủ</a>
            <a href="#du-an">Quỹ căn</a>
            <a href="#gioi-thieu">Giới thiệu</a>
            <a href="#tien-ich">Tiện ích</a>
            <a href="#vi-tri">Vị trí</a>
            <a href="#lien-he" className="py-3 text-center text-white rounded-sm font-bold mt-2" style={{ background: palette.ink }}>
              Đăng Ký Tư Vấn Zalo
            </a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-[580px] md:min-h-[660px] grid place-items-center overflow-hidden">
          <img src={cfg.heroImg} alt={cfg.heroTitle} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/20" />
          
          <div className="relative max-w-7xl w-full px-5 py-24 text-white grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-sm text-[11px] font-black tracking-[.2em] uppercase border border-white/30 bg-white/10 backdrop-blur">
                ★ {cfg.badge} ★
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight">
                {cfg.heroTitle}
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {cfg.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#du-an" className="inline-flex items-center gap-2 px-8 py-4 text-xs font-black text-white rounded-sm shadow-2xl hover:scale-105 transition" style={{ background: palette.ink }}>
                  Xem Giỏ Hàng Mở Bán <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://zalo.me/0919006030" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-4 text-xs font-black bg-white text-slate-900 rounded-sm shadow-xl hover:bg-slate-100 transition">
                  <MessageCircle className="w-4 h-4 text-blue-500" /> Chat Zalo Nhận Báo Giá
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="p-8 rounded-md bg-white/90 backdrop-blur-xl text-slate-900 shadow-2xl border border-white/50 space-y-4">
                <span className="text-xs font-black text-rose-600 uppercase tracking-wider block text-center">
                  🔥 NHẬN BẢNG GIÁ & CHỌN CĂN ĐẸP
                </span>
                <h4 className="text-xl font-black text-center">Tư Vấn Trực Tiếp 1-1</h4>
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <input required placeholder="Họ và tên quý khách..." value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full p-3 rounded-sm border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-500" />
                  <input required type="tel" placeholder="Số điện thoại / Zalo..." value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full p-3 rounded-sm border border-slate-300 text-xs font-bold text-blue-600 focus:outline-none focus:border-blue-500" />
                  <button type="submit" className="w-full py-3.5 text-xs font-black text-white rounded-sm shadow-lg transition hover:brightness-110 cursor-pointer" style={{ background: palette.ink }}>
                    GỬI QUA ZALO NGAY 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y border-slate-200 bg-white py-6">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
            {cfg.stats.map((st, i) => (
              <div key={i}>
                <strong className="text-2xl sm:text-3xl font-black block" style={{ color: palette.ink }}>{st.value}</strong>
                <p className="mt-1 text-xs text-slate-500 font-bold uppercase tracking-wider">{st.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Listings */}
        <section id="du-an" className="py-20 sm:py-28 max-w-7xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-14">
            <div>
              <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: palette.accent }}>
                ★ DANH MỤC SẢN PHẨM NỔI BẬT ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">Giỏ Hàng Quỹ Căn Ưu Tiên</h2>
            </div>
            <a href="#lien-he" className="inline-flex items-center gap-1.5 text-xs font-black hover:underline" style={{ color: palette.ink }}>
              <span>Xem toàn bộ 45+ căn</span> <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cfg.projects.map((proj, idx) => (
              <article key={idx} className="group rounded-md overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-sm text-[10px] font-black uppercase text-white shadow" style={{ background: palette.ink }}>
                      {proj.type}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-xs opacity-60 font-bold">
                      <span>Mã Căn: #SP-0{idx + 1}</span>
                      <span>Diện tích: {proj.area}</span>
                    </div>
                    <h3 className="text-xl font-black group-hover:text-blue-600 transition-colors">{proj.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase opacity-50 block">Giá niêm yết</span>
                    <strong className="text-lg font-black" style={{ color: palette.ink }}>{proj.price}</strong>
                  </div>
                  <a href="#lien-he" className="px-4 py-2 rounded-sm bg-slate-100 hover:bg-slate-900 hover:text-white transition text-xs font-bold">
                    Nhận Báo Giá →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Story / About Section */}
        <section id="gioi-thieu" className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black tracking-[.2em] uppercase block" style={{ color: palette.accent }}>
                ★ VỀ CHÚNG TÔI & NĂNG LỰC ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: palette.ink }}>
                Đồng Hành Chuyên Nghiệp — Minh Bạch Pháp Lý
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                Với hơn 10 năm kinh nghiệm trên thị trường bất động sản Việt Nam, chúng tôi tự hào là cầu nối tin cậy giữa khách hàng và các chủ đầu tư danh tiếng hàng đầu.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {cfg.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-sm bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span className="text-xs font-bold leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
              <img src={cfg.featureImg} alt="Giới thiệu" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
          </div>
        </section>

        {/* Amenities / Features */}
        <section id="tien-ich" className="py-20 sm:py-28 max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: palette.accent }}>
              ★ TIỆN ÍCH & DỊCH VỤ ĐỈNH CAO ★
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">Hệ Thống Tiện Ích Trọn Vẹn</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cfg.amenities.map((am, i) => (
              <div key={i} className="p-8 rounded-md bg-white border border-slate-200 shadow-sm hover:shadow-xl transition space-y-3">
                <span className="text-4xl block">{am.icon}</span>
                <h4 className="text-lg font-black">{am.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{am.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section id="vi-tri" className="py-20 sm:py-28 text-white" style={{ background: palette.dark }}>
          <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black tracking-[.2em] uppercase block text-white/70">
                ★ VỊ TRÍ CHIẾN LƯỢC ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Mạng Lưới Phân Phối Trọng Điểm Toàn Quốc
              </h2>
              <p className="text-sm opacity-80 leading-7">
                Hiện diện tại các cực tăng trưởng kinh tế hàng đầu Việt Nam: TP. Hồ Chí Minh, Hà Nội, Đà Nẵng, Hải Phòng và Bình Dương. Bấm chọn chi nhánh bên dưới để hiển thị bản đồ trực tiếp.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { name: 'Trụ sở chính TP. Hồ Chí Minh', address: 'Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM' },
                  { name: 'Chi nhánh Hà Nội', address: 'Tòa tháp Keangnam Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội' },
                  { name: 'Chi nhánh Đà Nẵng', address: 'Tòa nhà Indochina Riverside, 74 Bạch Đằng, Hải Châu, Đà Nẵng' },
                  { name: 'Chi nhánh Hải Phòng', address: 'Vincom Plaza Lê Thánh Tông, Ngô Quyền, Hải Phòng' }
                ].map((loc, idx) => {
                  const isActive = activeLocationIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveLocationIdx(idx)}
                      className={`w-full flex items-center justify-between p-4 rounded-sm border text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-white/25 border-white shadow-xl backdrop-blur-md translate-x-2'
                          : 'bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-sm flex items-center justify-center transition-transform ${isActive ? 'bg-amber-400 text-slate-900 scale-110 shadow' : 'bg-white/10 text-white'}`}>
                          <MapPin className="w-4 h-4" />
                        </span>
                        <div>
                          <strong className={`block text-sm ${isActive ? 'text-white font-black' : 'text-white/90'}`}>{loc.name}</strong>
                          <span className="text-[11px] text-white/70 block mt-0.5">{loc.address}</span>
                        </div>
                      </div>
                      {isActive && <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-ping shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {(() => {
              const locations = [
                { name: 'Trụ sở chính TP. Hồ Chí Minh', address: 'Landmark 81, Vinhomes Central Park, TP. Hồ Chí Minh' },
                { name: 'Chi nhánh Hà Nội', address: 'Keangnam Landmark 72, Phạm Hùng, Hà Nội' },
                { name: 'Chi nhánh Đà Nẵng', address: 'Indochina Riverside, Bạch Đằng, Hải Châu, Đà Nẵng' },
                { name: 'Chi nhánh Hải Phòng', address: 'Vincom Plaza Lê Thánh Tông, Hải Phòng' }
              ];
              const cur = locations[activeLocationIdx] || locations[0];
              const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(cur.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
              const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cur.address)}`;
              return (
                <div className="overflow-hidden rounded-md border border-white/20 bg-slate-950/90 shadow-2xl backdrop-blur flex flex-col h-[460px]">
                  <div className="px-5 py-3.5 bg-white/10 border-b border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 font-bold truncate">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-pulse shrink-0" />
                      <span className="truncate">Đang xem: <strong className="text-white font-black">{cur.name}</strong></span>
                    </div>
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-transform hover:scale-105 shadow-md shrink-0"
                    >
                      <span>Mở Google Maps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="flex-1 w-full h-full relative bg-slate-900">
                    <iframe
                      key={cur.address}
                      title={`Google Map - ${cur.name}`}
                      src={mapUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="lien-he" className="py-20 sm:py-28 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-5 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: palette.accent }}>
                ★ ĐĂNG KÝ TƯ VẤN VIP ★
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Nhận Bảng Giá Chi Tiết & Ưu Đãi Độc Quyền
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Chuyên viên tư vấn sẽ liên hệ gửi trọn bộ file PDF qua Zalo và hỗ trợ đặt xe đưa đón xem nhà mẫu miễn phí.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm font-bold">
                <div className="p-3 rounded-sm bg-blue-50 text-blue-600">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Hotline phục vụ 24/7</span>
                  <strong className="text-lg">0919 006 030</strong>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-md bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-800">Tiếp Nhận Thành Công!</h4>
                <p className="text-xs text-emerald-700">Tài liệu dự án đang được gửi qua Zalo cho quý khách.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-md bg-slate-50 border border-slate-200 shadow-xl space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Họ và tên (*)</label>
                  <input required value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full border border-slate-200 bg-white rounded-sm p-3.5 text-xs font-medium focus:outline-none focus:border-blue-500" placeholder="Ví dụ: Nguyễn Văn A..." />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Số điện thoại / Zalo (*)</label>
                  <input required type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full border border-slate-200 bg-white rounded-sm p-3.5 text-xs font-bold text-blue-600 focus:outline-none focus:border-blue-500" placeholder="Ví dụ: 0919 006 030..." />
                </div>
                <button type="submit" className="w-full py-4 text-xs font-black text-white rounded-sm shadow-lg transition hover:brightness-110 mt-2 cursor-pointer" style={{ background: palette.ink }}>
                  🚀 GỬI YÊU CẦU NHẬN BẢNG GIÁ VIP
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-5 text-xs">
        <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8">
          <div>
            <strong className="text-white text-xl block mb-2 font-black">{cfg.brand}</strong>
            <p className="opacity-60 leading-6">Website demo bất động sản phân phối chính thức F1 chuẩn mực.</p>
          </div>
          <div className="leading-6">
            <strong className="text-slate-200 block mb-2 uppercase tracking-wider">Thông Tin Liên Hệ</strong>
            <p>Hotline: 0919 006 030</p>
            <p>Zalo: 0919 006 030</p>
            <p>Email: contact@templatesbds.vn</p>
          </div>
          <div className="leading-6">
            <strong className="text-slate-200 block mb-2 uppercase tracking-wider">Trụ Sở Sàn Giao Dịch</strong>
            <p>Tòa nhà Landmark Tower, Quận 1, TP.HCM</p>
            <p>Chi nhánh: Ba Đình, Hà Nội</p>
          </div>
          <div className="leading-6">
            <strong className="text-slate-200 block mb-2 uppercase tracking-wider">Bản Quyền</strong>
            <p>© 2026 {cfg.brand}. Bản quyền kho giao diện TEMPLATES BDS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
