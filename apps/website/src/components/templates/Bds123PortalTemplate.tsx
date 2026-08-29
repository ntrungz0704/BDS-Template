import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Building,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  X,
  Share2,
  Heart,
  Eye,
  Clock,
  Layers,
  Sparkles,
  Award,
  Users,
  Compass,
  DollarSign,
  TrendingUp,
  HelpCircle,
  Menu
} from 'lucide-react';

interface Bds123PortalTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const REGIONS = [
  { id: 'hn', name: 'Hà Nội', count: '14.250', image: 'https://images.unsplash.com/photo-1509030450996-93781297593c?w=600&q=80', span: 'col-span-2' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', count: '28.910', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80', span: 'col-span-2' },
  { id: 'dn', name: 'Đà Nẵng', count: '5.420', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80', span: 'col-span-1' },
  { id: 'bd', name: 'Bình Dương', count: '7.830', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', span: 'col-span-1' },
  { id: 'hp', name: 'Hải Phòng', count: '3.610', image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&q=80', span: 'col-span-1' },
  { id: 'ct', name: 'Cần Thơ', count: '2.190', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', span: 'col-span-1' },
];

const FEATURED_PROJECTS = [
  { id: 'p1', title: 'Vinhomes Grand Park', loc: 'TP. Thủ Đức, TP.HCM', price: 'Từ 2.1 Tỷ', tag: 'Đang mở bán', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', developer: 'Vingroup' },
  { id: 'p2', title: 'Masteri Centre Point', loc: 'Quận 9, TP.HCM', price: 'Từ 3.5 Tỷ', tag: 'Sắp bàn giao', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', developer: 'Masterise Homes' },
  { id: 'p3', title: 'Aqua City Riverside', loc: 'Biên Hòa, Đồng Nai', price: 'Từ 6.8 Tỷ', tag: 'Khu đô thị sinh thái', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', developer: 'Novaland' },
  { id: 'p4', title: 'Eco Green Saigon', loc: 'Quận 7, TP.HCM', price: 'Từ 4.2 Tỷ', tag: 'Căn hộ xanh', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', developer: 'Xuân Mai Corp' },
  { id: 'p5', title: 'The Matrix One', loc: 'Mễ Trì, Nam Từ Liêm, Hà Nội', price: 'Từ 5.5 Tỷ', tag: 'Hạng sang A+', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', developer: 'MIK Group' }
];

const SALE_PROPERTIES = [
  { id: 's1', title: 'Bán biệt thự song lập Ecopark full nội thất gỗ cao cấp', price: '18.5 Tỷ', area: '180 m²', loc: 'Văn Giang, Hưng Yên', type: 'Biệt thự', date: 'Hôm nay', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', vip: true },
  { id: 's2', title: 'Căn hộ 2PN Vinhomes Central Park view trực diện sông Sài Gòn', price: '5.2 Tỷ', area: '78 m²', loc: 'Bình Thạnh, TP.HCM', type: 'Chung cư', date: '2 giờ trước', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', vip: true },
  { id: 's3', title: 'Bán nhà mặt phố Nguyễn Trãi, vị trí kinh doanh đỉnh cao', price: '24 Tỷ', area: '95 m²', loc: 'Thanh Xuân, Hà Nội', type: 'Nhà phố', date: '4 giờ trước', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', vip: false },
  { id: 's4', title: 'Đất nền thổ cư sổ đỏ sẵn công chứng ngay, gần KCN VSIP 2', price: '1.45 Tỷ', area: '120 m²', loc: 'Bến Cát, Bình Dương', type: 'Đất nền', date: 'Hôm qua', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', vip: false },
  { id: 's5', title: 'Shophouse chân đế The Landmark 81 hợp đồng thuê 80tr/tháng', price: '16.8 Tỷ', area: '110 m²', loc: 'Bình Thạnh, TP.HCM', type: 'Shophouse', date: 'Hôm qua', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', vip: true },
  { id: 's6', title: 'Căn hộ duplex The River Thủ Thiêm view cầu Ba Son cực đẹp', price: '29 Tỷ', area: '215 m²', loc: 'Thủ Thiêm, TP. Thủ Đức', type: 'Chung cư', date: '3 ngày trước', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', vip: true },
  { id: 's7', title: 'Nhà riêng hẻm xe hơi tránh Nguyễn Văn Linh, P. Tân Phong', price: '8.9 Tỷ', area: '85 m²', loc: 'Quận 7, TP.HCM', type: 'Nhà phố', date: '4 ngày trước', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', vip: false },
  { id: 's8', title: 'Lô góc 2 mặt tiền đường 30m KĐT Nam Hòa Xuân gần sông', price: '4.8 Tỷ', area: '150 m²', loc: 'Ngũ Hành Sơn, Đà Nẵng', type: 'Đất nền', date: '5 ngày trước', image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=600&q=80', vip: false },
];

const RENT_PROPERTIES = [
  { id: 'r1', title: 'Cho thuê căn hộ Studio Vinhomes Smart City full đồ chỉ việc ở', price: '7 Triệu/tháng', area: '32 m²', loc: 'Nam Từ Liêm, Hà Nội', type: 'Chung cư', date: 'Vừa xong', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' },
  { id: 'r2', title: 'Cho thuê văn phòng trọn gói Tòa nhà Bitexco Financial Tower', price: '45 Triệu/tháng', area: '120 m²', loc: 'Quận 1, TP.HCM', type: 'Văn phòng', date: '1 giờ trước', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { id: 'r3', title: 'Cho thuê biệt thự Thảo Điền có hồ bơi riêng làm văn phòng hoặc ở', price: '85 Triệu/tháng', area: '350 m²', loc: 'Thảo Điền, TP. Thủ Đức', type: 'Biệt thự', date: '3 giờ trước', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
  { id: 'r4', title: 'Mặt bằng kinh doanh góc 2 mặt tiền đường Hai Bà Trưng', price: '60 Triệu/tháng', area: '160 m²', loc: 'Quận 3, TP.HCM', type: 'Mặt bằng', date: 'Hôm nay', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
];

const DEVELOPERS = [
  { name: 'Tập đoàn Vingroup', logo: '🏛️', projects: '48+ Dự án' },
  { name: 'Novaland Group', logo: '🏢', projects: '35+ Dự án' },
  { name: 'Masterise Homes', logo: '💎', projects: '22+ Dự án' },
  { name: 'Sun Group', logo: '☀️', projects: '30+ Dự án' },
  { name: 'Ecopark Corporation', logo: '🌿', projects: '15+ Dự án' },
  { name: 'Hưng Thịnh Corp', logo: '🏗️', projects: '28+ Dự án' }
];

export const Bds123PortalTemplate: React.FC<Bds123PortalTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [searchTab, setSearchTab] = useState<'sale' | 'rent'>('sale');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Form states
  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultNote, setConsultNote] = useState<string>('');

  const filteredSales = useMemo(() => {
    return SALE_PROPERTIES.filter(item => {
      const matchKeyword = !keyword || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.loc.toLowerCase().includes(keyword.toLowerCase());
      const matchType = selectedType === 'all' || item.type === selectedType;
      return matchKeyword && matchType;
    });
  }, [keyword, selectedType]);

  const filteredRents = useMemo(() => {
    return RENT_PROPERTIES.filter(item => {
      const matchKeyword = !keyword || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.loc.toLowerCase().includes(keyword.toLowerCase());
      return matchKeyword;
    });
  }, [keyword]);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultPhone) {
      alert('Vui lòng nhập số điện thoại để chúng tôi liên hệ!');
      return;
    }
    setContactSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR & BRAND HEADER (Ảnh 4 Style)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#0072bc] text-white py-1.5 px-4 text-xs font-semibold border-b border-blue-600/30">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">🏢 <span>{company?.name || 'CÔNG TY CỔ PHẦN DỊCH VỤ ĐẤU GIÁ BẾN THÀNH'}</span></span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline">Tổng đài CSKH: <strong>1900 6868</strong></span>
            <a href="tel:0919006030" className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] hover:bg-amber-300">
              Hotline: 0919 006 030
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div 
              onClick={() => { setCurrentPage('home'); setSelectedProperty(null); }}
              className="cursor-pointer flex items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0072bc] flex items-center justify-center text-white font-black text-base shadow-sm">
                B
              </div>
              <span className="text-xl font-black tracking-tight text-[#0072bc]">
                bds<span className="text-red-600">123</span><span className="text-slate-400 text-xs">.vn</span>
              </span>
            </div>

            {/* Desktop Navbar */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
              {[
                { key: 'home', label: 'Trang chủ' },
                { key: 'sale', label: 'Nhà đất bán' },
                { key: 'rent', label: 'Nhà đất cho thuê' },
                { key: 'projects', label: 'Dự án' },
                { key: 'news', label: 'Tin tức' },
                { key: 'contact', label: 'Liên hệ & Bản đồ' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => { setCurrentPage(tab.key); setSelectedProperty(null); }}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === tab.key
                      ? 'text-[#0072bc] bg-blue-50'
                      : 'text-slate-700 hover:text-[#0072bc] hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>+ Đăng Tin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
            {[
              { key: 'home', label: 'Trang chủ' },
              { key: 'sale', label: 'Nhà đất bán' },
              { key: 'rent', label: 'Nhà đất cho thuê' },
              { key: 'projects', label: 'Dự án' },
              { key: 'news', label: 'Tin tức' },
              { key: 'contact', label: 'Liên hệ & Bản đồ' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setCurrentPage(tab.key);
                  setSelectedProperty(null);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0072bc]"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SEARCH BOX (Ảnh 4)
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'home' && !selectedProperty && (
        <section className="bg-white border-b border-slate-200 py-8 px-4">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Tìm kiếm bất động sản giá tốt
            </h1>
            <p className="text-xs text-slate-500 max-w-xl mx-auto mb-6">
              Kênh thông tin mua bán, cho thuê nhà đất số 1 Việt Nam. Hàng ngàn tin đăng được xác thực mỗi ngày.
            </p>

            {/* Search Box Tabs */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setSearchTab('sale')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    searchTab === 'sale'
                      ? 'bg-[#0072bc] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Mua bán nhà đất
                </button>
                <button
                  onClick={() => setSearchTab('rent')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    searchTab === 'rent'
                      ? 'bg-[#0072bc] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Cho thuê nhà đất
                </button>
              </div>

              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Tìm theo khu vực, đường, dự án hoặc từ khóa..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="all">Tất cả loại hình</option>
                  <option value="Chung cư">Căn hộ chung cư</option>
                  <option value="Nhà phố">Nhà riêng / Nhà phố</option>
                  <option value="Biệt thự">Biệt thự liền kề</option>
                  <option value="Đất nền">Đất nền dự án</option>
                </select>
                <button
                  onClick={() => setCurrentPage(searchTab)}
                  className="bg-[#0072bc] hover:bg-[#005c99] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Tìm Kiếm</span>
                </button>
              </div>

              {/* Quick links Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-bold text-slate-400">Gợi ý nhanh:</span>
                {['Căn hộ Hà Nội', 'Nhà phố TP.HCM', 'Biệt thự Ecopark', 'Đất nền Đà Nẵng', 'Nhà thuê Quận 1'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setKeyword(tag); setCurrentPage(searchTab); }}
                    className="bg-white hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT (HOME)
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'home' && !selectedProperty && (
        <main className="max-w-[1240px] mx-auto px-4 py-8 space-y-10">
          {/* SECTION 1: BẤT ĐỘNG SẢN THEO KHU VỰC */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Bất Động Sản Theo Khu Vực</span>
              </h2>
              <button onClick={() => setCurrentPage('sale')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {REGIONS.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => { setKeyword(reg.name); setCurrentPage('sale'); }}
                  className="group relative h-40 rounded-xl overflow-hidden cursor-pointer border border-slate-100 shadow-xs"
                >
                  <img
                    src={reg.image}
                    alt={reg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-sm leading-tight group-hover:text-amber-300 transition-colors">{reg.name}</h3>
                    <p className="text-[11px] text-white/80 font-medium">{reg.count} tin đăng</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: DỰ ÁN NỔI BẬT */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>Dự Án Nổi Bật</span>
              </h2>
              <button onClick={() => setCurrentPage('projects')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {FEATURED_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setCurrentPage('projects')}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                      {proj.tag}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-slate-400 font-bold block mb-0.5">{proj.developer}</span>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mb-2">{proj.loc}</p>
                    <div className="text-xs font-black text-red-600 font-mono">{proj.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: BẤT ĐỘNG SẢN ĐANG BÁN (4 COLUMNS) */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Bất Động Sản Đang Bán</span>
                </h2>
                <p className="text-xs text-slate-500">Tin đăng mới nhất có sổ đỏ chính chủ</p>
              </div>
              <button onClick={() => setCurrentPage('sale')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Xem thêm tin bán <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SALE_PROPERTIES.slice(0, 8).map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prop.vip && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-sm">
                        VIP
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {prop.area}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                        <span>{prop.type}</span>
                        <span>{prop.date}</span>
                      </div>
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate mb-3">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{prop.loc}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-black text-red-600 font-mono">{prop.price}</span>
                      <button className="text-[11px] font-bold text-blue-600 group-hover:underline flex items-center gap-0.5">
                        Chi tiết <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: BẤT ĐỘNG SẢN CHO THUÊ */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Bất Động Sản Cho Thuê</span>
                </h2>
                <p className="text-xs text-slate-500">Căn hộ, văn phòng và mặt bằng kinh doanh sinh lời</p>
              </div>
              <button onClick={() => setCurrentPage('rent')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Xem thêm tin thuê <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {RENT_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-2 right-2 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {prop.area}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                        <span>{prop.type}</span>
                        <span>{prop.date}</span>
                      </div>
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate mb-3">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{prop.loc}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-black text-emerald-600 font-mono">{prop.price}</span>
                      <button className="text-[11px] font-bold text-blue-600 group-hover:underline flex items-center gap-0.5">
                        Chi tiết <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CHỦ ĐẦU TƯ UY TÍN */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Chủ Đầu Tư Tiêu Biểu</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {DEVELOPERS.map((dev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer">
                  <div className="text-2xl mb-1">{dev.logo}</div>
                  <h3 className="font-bold text-xs text-slate-800 line-clamp-1">{dev.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{dev.projects}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: HOTLINE CALL CENTER STRIP (Ảnh 4) */}
          <section className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                📞
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight mb-1">Cần Hỗ Trợ Đăng Tin Hoặc Tìm Nhà?</h3>
                <p className="text-xs text-slate-300">Đội ngũ chuyên viên BĐS123 luôn sẵn sàng giải đáp 24/7 kể cả ngày lễ.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-amber-400 font-bold block uppercase">Hotline Hà Nội & Miền Bắc</span>
                <strong className="text-base font-mono">0919 006 030</strong>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="text-right">
                <span className="text-[10px] text-amber-400 font-bold block uppercase">Hotline TP.HCM & Miền Nam</span>
                <strong className="text-base font-mono">1900 6868</strong>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: NHÀ ĐẤT BÁN / CHO THUÊ
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'sale' || currentPage === 'rent') && !selectedProperty && (
        <main className="max-w-[1240px] mx-auto px-4 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                {currentPage === 'sale' ? 'Danh Sách Nhà Đất Bán' : 'Danh Sách Nhà Đất Cho Thuê'}
              </h1>
              <p className="text-xs text-slate-500">Tìm thấy {(currentPage === 'sale' ? filteredSales : filteredRents).length} kết quả phù hợp</p>
            </div>
            <button
              onClick={() => { setCurrentPage('home'); setKeyword(''); }}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Quay lại trang chủ
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(currentPage === 'sale' ? filteredSales : filteredRents).map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 right-2 bg-slate-950/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    {prop.area}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-600">
                      {prop.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mb-3">{prop.loc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-black text-red-600 font-mono">{prop.price}</span>
                    <span className="text-[11px] font-bold text-blue-600">Xem ngay →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: LIÊN HỆ & BẢN ĐỒ GOOGLE MAPS
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'contact' && !selectedProperty && (
        <main className="max-w-[1240px] mx-auto px-4 py-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Liên Hệ & Trung Tâm Giao Dịch</h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">Vui lòng gửi thông tin hoặc ghé thăm trực tiếp trụ sở công ty để được chuyên viên hỗ trợ pháp lý và xem nhà.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-base font-black text-slate-900 mb-4">Gửi Yêu Cầu Tư Vấn</h2>
              {contactSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-emerald-900 text-sm">Gửi Thông Tin Thành Công!</h4>
                  <p className="text-xs text-emerald-700 mt-1">Chuyên viên tư vấn sẽ liên hệ lại với bạn qua số điện thoại <strong>{consultPhone}</strong> trong 15 phút.</p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-4 text-xs font-bold text-emerald-800 underline"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Họ và tên của bạn</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0919 006 030"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nhu cầu tư vấn / Ghi chú</label>
                    <textarea
                      rows={3}
                      placeholder="Cần tìm căn hộ 2PN, ngân sách 3 tỷ tại TP.HCM..."
                      value={consultNote}
                      onChange={(e) => setConsultNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0072bc] hover:bg-[#005c99] text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all"
                  >
                    Gửi Yêu Cầu Ngay
                  </button>
                </form>
              )}
            </div>

            {/* Map & Addresses */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="font-black text-slate-900 text-sm mb-3">Trụ Sở Chính Đấu Giá Bến Thành</h3>
                <div className="text-xs text-slate-600 space-y-2 mb-4">
                  <p>📍 Địa chỉ: <strong>{company?.address || 'Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Q.1, TP.HCM'}</strong></p>
                  <p>📞 Hotline CSKH: <strong>0919 006 030 - 1900 6868</strong></p>
                  <p>✉️ Email tiếp nhận: <strong>{company?.email || 'contact@bds123.vn'}</strong></p>
                </div>

                {/* Real Google Map iframe */}
                <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-200 relative">
                  <div className="absolute top-2 right-2 z-10">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+Qu%E1%BA%ADn+1,+TP.HCM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#0072bc] hover:bg-blue-800 text-white text-[10px] font-bold shadow-md inline-block"
                    >
                      Mở Google Maps
                    </a>
                  </div>
                  <iframe
                    title="Bản đồ Bitexco"
                    src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PROPERTY DETAIL MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden my-8">
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 text-white hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-md uppercase">
                {selectedProperty.price}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs text-blue-600 font-extrabold uppercase tracking-wider">{selectedProperty.type} · {selectedProperty.date || 'Hôm nay'}</span>
                <h2 className="text-xl font-black text-slate-900 mt-1 mb-2 leading-snug">{selectedProperty.title}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{selectedProperty.loc}</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Diện tích</span>
                  <strong className="text-sm font-black text-slate-900">{selectedProperty.area || '100 m²'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Pháp lý</span>
                  <strong className="text-sm font-black text-slate-900">Sổ hồng riêng</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Hướng nhà</span>
                  <strong className="text-sm font-black text-slate-900">Đông Nam</strong>
                </div>
              </div>

              {/* Map embed in modal */}
              <div className="rounded-xl overflow-hidden border border-slate-200 h-44">
                <iframe
                  title="Vị trí BĐS"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.loc + ', Việt Nam')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  href="tel:0919006030"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-center text-xs uppercase flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi 0919 006 030</span>
                </a>
                <a
                  href="https://zalo.me/0919006030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#0072bc] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center text-xs uppercase flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Chat Zalo Tư Vấn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-7 h-7 rounded bg-[#0072bc] text-white flex items-center justify-center font-bold">B</div>
              <span className="text-lg font-black text-white">bds<span className="text-red-500">123</span>.vn</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Cổng thông tin & Sàn đấu giá BĐS uy tín số 1 Việt Nam. Hợp tác cùng các tập đoàn địa ốc hàng đầu.
            </p>
            <p className="text-[11px] text-slate-500">© 2026 BDS123 Bến Thành. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Trang chủ</button></li>
              <li><button onClick={() => setCurrentPage('sale')} className="hover:text-white">Nhà đất bán</button></li>
              <li><button onClick={() => setCurrentPage('rent')} className="hover:text-white">Nhà đất cho thuê</button></li>
              <li><button onClick={() => setCurrentPage('projects')} className="hover:text-white">Dự án bất động sản</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Quy Định & Chính Sách</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#rules" className="hover:text-white">Quy chế hoạt động</a></li>
              <li><a href="#privacy" className="hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#dispute" className="hover:text-white">Giải quyết tranh chấp</a></li>
              <li><a href="#pricing" className="hover:text-white">Bảng giá dịch vụ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Thông Tin Liên Hệ</h4>
            <p className="text-slate-400 mb-1">📍 Bitexco Financial Tower, Q.1, TP.HCM</p>
            <p className="text-slate-400 mb-1">📞 Hotline: <strong className="text-white font-mono">0919 006 030</strong></p>
            <p className="text-slate-400">✉️ Email: <strong className="text-white">contact@bds123.vn</strong></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Bds123PortalTemplate;
