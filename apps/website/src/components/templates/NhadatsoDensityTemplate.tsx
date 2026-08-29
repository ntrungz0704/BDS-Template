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
  Home,
  Tag,
  Compass,
  FileText,
  User,
  Facebook,
  ExternalLink,
  Menu
} from 'lucide-react';

interface NhadatsoDensityTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const VIP_PROPERTIES = [
  { id: 'v1', title: 'Bán đất vị trí Cầu Xáng, Đường 11M DT: 5x26 = 130m2 nở hậu', loc: 'Huyện Bình Chánh', price: 'Giá: 2.24 Tỷ', area: '130m²', time: '6 năm trước', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', tag: 'HUYỆN BÌNH CHÁNH' },
  { id: 'v2', title: 'Căn hộ Melody Âu Cơ, 68m2 view công viên hướng đông nam, Sang nhượng 1.95 tỷ bao thuế phí', loc: 'Quận Tân Phú', price: 'Giá: 1.95 Tỷ', area: '68m²', time: '6 năm trước', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', tag: 'QUẬN TÂN PHÚ' },
  { id: 'v3', title: 'Bán nhà phố giá rẻ 2 mặt tiền (khách sạn 14 phòng) khu Trung Sơn, Bình Chánh', loc: 'Huyện Bình Chánh', price: 'Giá: 12 Tỷ', area: '95m²', time: '6 năm trước', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', tag: 'HUYỆN BÌNH CHÁNH' },
];

const SALE_LISTINGS = [
  { id: 'nl1', title: 'Căn hộ 2 phòng ngủ 2 WC giá từ 1,2 tỷ/căn tiến độ 3 trường đợt hao, chiết khấu 3%', loc: 'Huyện Bình Chánh, TP.HCM', type: 'Nhà đất bán', area: '56m²', time: '6 năm trước', price: 'Giá: Thỏa thuận', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' },
  { id: 'nl2', title: 'Cần bán nhanh lô đất 100m2 mặt tiền An Phú Tây – Hưng Long, chỉ 150 triệu, sổ hồng riêng, xây tự do', loc: 'Huyện Bình Chánh, TP.HCM', type: 'Nhà đất bán', area: '100m²', time: '6 năm trước', price: 'Giá: 15 triệu/m²', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { id: 'nl3', title: 'Bán Đất Mặt Tiền Đường 11M DT 5mx26m nở hậu', loc: 'Huyện Bình Chánh, TP.HCM', type: 'Nhà đất bán', area: '130m²', time: '6 năm trước', price: 'Giá: 2.38 Tỷ', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=600&q=80' },
  { id: 'nl4', title: 'Căn hộ Melody Âu Cơ, 68m2 view công viên hướng đông nam, Sang nhượng 1.95 tỷ full thuế phí', loc: 'Quận Tân Phú, TP.HCM', type: 'Nhà đất bán', area: '68m²', time: '6 năm trước', price: 'Giá: 1.95 Tỷ', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
  { id: 'nl5', title: 'Bán nhà phố giá rẻ 2 mặt tiền (khách sạn 14 phòng) khu Trung Sơn, Bình Chánh', loc: 'Huyện Bình Chánh, TP.HCM', type: 'Nhà đất bán', area: '95m²', time: '6 năm trước', price: 'Giá: 12 Tỷ', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80' },
];

const RENT_LISTINGS = [
  { id: 'rl1', title: 'Cho thuê mặt tiền nền Phạm Hùng kinh doanh mở xưởng', loc: 'Huyện Bình Chánh, TP.HCM', type: 'Nhà đất cho thuê', area: '180m²', time: '6 năm trước', price: 'Giá: 45 triệu/tháng', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
  { id: 'rl2', title: 'Cho thuê nhà nguyên căn, Phường Bình Chiểu, Quận Thủ Đức trong C/x An Review', loc: 'Quận Thủ Đức, TP.HCM', type: 'Nhà đất cho thuê', area: '120m²', time: '6 năm trước', price: 'Giá: 20 triệu/tháng', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 'rl3', title: 'Cho thuê chung cư Carillon – Tân Bình – 65 m2 – 12tr/ tháng', loc: 'Quận Tân Bình, TP.HCM', type: 'Nhà đất cho thuê', area: '65m²', time: '6 năm trước', price: 'Giá: 12 triệu/tháng', priceBadge: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' },
];

const PROVINCES = [
  'Thành phố Hồ Chí Minh',
  'Thành phố Hà Nội',
  'Tỉnh Đồng Nai',
  'Tỉnh Bình Dương',
  'Tỉnh Lâm Đồng',
  'Thành phố Đà Nẵng',
  'Thành phố Cần Thơ',
  'Tỉnh Thừa Thiên Huế',
  'Tỉnh Bà Rịa - Vũng Tàu',
  'Tỉnh Long An'
];

const ADVICE_ARTICLES = [
  { title: 'Cách bắt mạch bong bóng bất động sản năm 2026 đã vượt qua', date: 'Mới nhất', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80' },
  { title: 'Mua chung cư cuối năm, người mua nhà cần quan tâm điều gì?', date: 'Mới nhất', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80' },
  { title: 'Bất động sản 2026: Thị trường nóng sốt dự báo giá tăng loạt tầng', date: 'Mới nhất', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80' },
  { title: 'Đầu tư bất động sản 2026: Trả tiền vào đâu hiệu quả nhất?', date: 'Mới nhất', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80' },
];

export const NhadatsoDensityTemplate: React.FC<NhadatsoDensityTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [filterTab, setFilterTab] = useState<'sale' | 'rent' | 'transfer'>('sale');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [consultSubmitted, setConsultSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultContent, setConsultContent] = useState<string>('');

  const currentList = useMemo(() => {
    const list = filterTab === 'sale' ? SALE_LISTINGS : filterTab === 'rent' ? RENT_LISTINGS : SALE_LISTINGS;
    return list.filter(item => {
      const matchKey = !searchKeyword || item.title.toLowerCase().includes(searchKeyword.toLowerCase()) || item.loc.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchCity = selectedCity === 'all' || item.loc.includes(selectedCity);
      return matchKey && matchCity;
    });
  }, [filterTab, searchKeyword, selectedCity]);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultPhone) return;
    setConsultSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-800 flex flex-col selection:bg-emerald-600 selection:text-white text-xs">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER NHADATSO STYLE (Ảnh 5)
      ───────────────────────────────────────────────────────────── */}
      {/* Top bar */}
      <div className="bg-[#1C2833] text-white py-2 px-4 border-b border-slate-700">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div 
            onClick={() => { setCurrentPage('home'); setSelectedProperty(null); }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
              🏠
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                Nhà Đất <span className="text-emerald-400">Số</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Kênh thông tin bất động sản Việt Nam</span>
            </div>
          </div>

          {/* Search bar in header */}
          <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>📝 Đăng tin miễn phí</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 bg-slate-700 rounded text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Green Navigation Bar (Ảnh 5) */}
      <nav className="bg-[#1E8449] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="hidden md:flex items-center text-xs font-bold uppercase tracking-wide">
            {[
              { key: 'home', label: 'Trang chủ', icon: Home },
              { key: 'sale', label: 'Nhà đất bán' },
              { key: 'rent', label: 'Nhà đất cho thuê' },
              { key: 'transfer', label: 'Nhà đất sang nhượng' },
              { key: 'news', label: 'Tin bất động sản' },
              { key: 'fengshui', label: 'Xem tuổi xây - hướng nhà' },
              { key: 'contact', label: 'Liên hệ' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  if (item.key === 'sale') setFilterTab('sale');
                  if (item.key === 'rent') setFilterTab('rent');
                  if (item.key === 'transfer') setFilterTab('transfer');
                  setSelectedProperty(null);
                }}
                className={`px-3.5 py-3 border-r border-emerald-700 hover:bg-emerald-700 flex items-center gap-1.5 transition-colors ${
                  currentPage === item.key ? 'bg-emerald-800 font-black' : ''
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] font-semibold text-emerald-100 py-2.5">
            Hotline: <strong className="text-white font-mono">0919 006 030</strong>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-800 px-4 py-2 space-y-1">
            {[
              { key: 'home', label: 'Trang chủ' },
              { key: 'sale', label: 'Nhà đất bán' },
              { key: 'rent', label: 'Nhà đất cho thuê' },
              { key: 'transfer', label: 'Nhà đất sang nhượng' },
              { key: 'news', label: 'Tin bất động sản' },
              { key: 'fengshui', label: 'Xem tuổi xây - hướng nhà' },
              { key: 'contact', label: 'Liên hệ' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setSelectedProperty(null);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-1.5 text-xs text-white hover:text-amber-300 font-bold"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. MULTI-CRITERIA SEARCH BAR (Ảnh 5)
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'home' && !selectedProperty && (
        <section className="bg-white border-b border-slate-300 py-3 shadow-xs">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Top search bar tabs & stats */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-1">
                {[
                  { key: 'sale', label: 'Nhà đất bán' },
                  { key: 'rent', label: 'Nhà đất cho thuê' },
                  { key: 'transfer', label: 'Nhà đất sang nhượng' }
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setFilterTab(t.key as any)}
                    className={`px-3 py-1 text-xs font-bold rounded-t ${
                      filterTab === t.key
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Hiện có <strong className="text-emerald-700">85</strong> thành viên, <strong className="text-red-600">8.420</strong> tin đăng trực tuyến
              </div>
            </div>

            {/* Form controls row (6 selects + button) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              <div className="col-span-2 sm:col-span-2">
                <input
                  type="text"
                  placeholder="Từ khóa tìm kiếm..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Chọn loại nhà đất</option>
                  <option value="Chung cư">Căn hộ chung cư</option>
                  <option value="Nhà phố">Nhà riêng / Nhà phố</option>
                  <option value="Đất nền">Đất nền dự án</option>
                  <option value="Biệt thự">Biệt thự</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Chọn Tỉnh/Thành</option>
                  <option value="TP.HCM">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
              <div>
                <select className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-700 focus:outline-none">
                  <option value="all">Chọn Quận/Huyện</option>
                  <option value="bc">Bình Chánh</option>
                  <option value="tp">Tân Phú</option>
                  <option value="q1">Quận 1</option>
                  <option value="q7">Quận 7</option>
                </select>
              </div>
              <div>
                <select className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-700 focus:outline-none">
                  <option value="all">Chọn Hướng nhà</option>
                  <option value="dn">Đông Nam</option>
                  <option value="d">Đông</option>
                  <option value="n">Nam</option>
                  <option value="t">Tây</option>
                  <option value="b">Bắc</option>
                </select>
              </div>
              <div>
                <select className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs text-slate-700 focus:outline-none">
                  <option value="all">Giá thấp nhất</option>
                  <option value="500">Từ 500 Triệu</option>
                  <option value="1000">Từ 1 Tỷ</option>
                  <option value="2000">Từ 2 Tỷ</option>
                  <option value="5000">Từ 5 Tỷ</option>
                </select>
              </div>
              <div>
                <button
                  onClick={() => setCurrentPage('sale')}
                  className="w-full bg-[#1E8449] hover:bg-emerald-800 text-white font-bold py-1.5 rounded text-xs uppercase flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <Search className="w-3 h-3" />
                  <span>TÌM KIẾM</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. TWO-COLUMN MAIN CONTENT (Ảnh 5 High Density)
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'home' && !selectedProperty && (
        <main className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* ════════════════════ LEFT COLUMN (MAIN - 8.5/12) ════════════════════ */}
            <div className="lg:col-span-8 space-y-6">
              {/* BLOCK 1: TIN BẤT ĐỘNG SẢN TIÊU ĐIỂM (Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
                <h2 className="bg-[#1C2833] text-white font-black text-xs uppercase px-3 py-1.5 -mx-4 -mt-4 mb-4 rounded-t flex items-center justify-between">
                  <span>TIN BẤT ĐỘNG SẢN</span>
                  <span className="text-[10px] font-normal text-slate-300">Cập nhật 24/7</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Big Featured News */}
                  <div className="sm:col-span-7 cursor-pointer group" onClick={() => setCurrentPage('news')}>
                    <div className="aspect-[16/10] overflow-hidden rounded bg-slate-100 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
                        alt="Bong bóng BĐS"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 leading-snug mb-1">
                      Cách bắt mạch bong bóng bất động sản năm 2026 đã vượt qua
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                      Triệu chứng và nguy cơ tự vấn đề đất đai khi thanh khoản tăng cao. Nhận diện chu kỳ thị trường bất động sản ngay thời điểm hiện nay để đón chu kỳ tăng trưởng mới.
                    </p>
                  </div>

                  {/* 4 Side News Thumbnails */}
                  <div className="sm:col-span-5 space-y-3">
                    {ADVICE_ARTICLES.map((art, idx) => (
                      <div
                        key={idx}
                        onClick={() => setCurrentPage('news')}
                        className="flex items-start gap-2 cursor-pointer group border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                      >
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-16 h-12 rounded object-cover shrink-0 group-hover:opacity-90"
                        />
                        <div>
                          <h4 className="font-semibold text-[11px] text-slate-800 group-hover:text-emerald-700 line-clamp-2 leading-tight">
                            {art.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">{art.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BLOCK 2: VIP PROPERTIES ROW (Ảnh 5 3 Boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {VIP_PROPERTIES.map((vip) => (
                  <div
                    key={vip.id}
                    onClick={() => setSelectedProperty(vip)}
                    className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img
                        src={vip.image}
                        alt={vip.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                        📍 {vip.tag}
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 bg-emerald-700 text-white font-bold text-[10px] px-1.5 py-0.5 rounded">
                        {vip.price}
                      </span>
                    </div>

                    <div className="p-2.5">
                      <h4 className="font-bold text-[11px] text-slate-900 line-clamp-2 leading-snug hover:text-emerald-700 mb-2">
                        {vip.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                        <span>📐 {vip.area}</span>
                        <span className="text-emerald-700 font-bold">Chi tiết &gt;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* BLOCK 3: NHÀ ĐẤT BÁN (Horizontal List View - Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
                <div className="bg-[#1E8449] text-white font-black text-xs uppercase px-3 py-1.5 -mx-4 -mt-4 mb-4 rounded-t flex items-center justify-between">
                  <span>NHÀ ĐẤT BÁN</span>
                  <button onClick={() => setCurrentPage('sale')} className="text-[10px] font-normal text-emerald-100 hover:underline">
                    Xem thêm &gt;&gt;
                  </button>
                </div>

                <div className="space-y-3">
                  {SALE_LISTINGS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedProperty(item)}
                      className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50 p-2 rounded transition-colors cursor-pointer group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-36 h-24 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-xs text-blue-800 group-hover:text-emerald-700 leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-[#48C774] text-white font-bold text-[10px] whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{item.loc}</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                          <span>📐 Diện tích: <strong>{item.area}</strong></span>
                          <span>🕒 {item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLOCK 4: NHÀ ĐẤT CHO THUÊ (Horizontal List View - Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
                <div className="bg-[#1C2833] text-white font-black text-xs uppercase px-3 py-1.5 -mx-4 -mt-4 mb-4 rounded-t flex items-center justify-between">
                  <span>NHÀ ĐẤT CHO THUÊ</span>
                  <button onClick={() => setCurrentPage('rent')} className="text-[10px] font-normal text-slate-300 hover:underline">
                    Xem thêm &gt;&gt;
                  </button>
                </div>

                <div className="space-y-3">
                  {RENT_LISTINGS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedProperty(item)}
                      className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50 p-2 rounded transition-colors cursor-pointer group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-36 h-24 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-xs text-blue-800 group-hover:text-emerald-700 leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-[#48C774] text-white font-bold text-[10px] whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{item.loc}</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                          <span>📐 Diện tích: <strong>{item.area}</strong></span>
                          <span>🕒 {item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ════════════════════ RIGHT COLUMN (SIDEBAR - 3.5/12) ════════════════════ */}
            <div className="lg:col-span-4 space-y-5">
              {/* WIDGET 1: TỈNH THÀNH (Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-3 shadow-xs">
                <h3 className="bg-[#1C2833] text-white font-black text-xs uppercase px-3 py-1.5 -mx-3 -mt-3 mb-3 rounded-t">
                  TỈNH THÀNH
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {PROVINCES.map((prov, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => { setSelectedCity(prov); setCurrentPage('sale'); }}
                        className="w-full text-left py-1 px-1.5 hover:bg-emerald-50 hover:text-emerald-700 rounded flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="text-emerald-600">›</span> {prov}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WIDGET 2: TƯ VẤN (Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-3 shadow-xs">
                <h3 className="bg-[#1C2833] text-white font-black text-xs uppercase px-3 py-1.5 -mx-3 -mt-3 mb-3 rounded-t">
                  TƯ VẤN BẤT ĐỘNG SẢN
                </h3>
                <div className="space-y-2">
                  {ADVICE_ARTICLES.slice(0, 3).map((art, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentPage('news')}
                      className="flex items-center gap-2 cursor-pointer group border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                    >
                      <img src={art.image} alt={art.title} className="w-12 h-10 rounded object-cover shrink-0" />
                      <h4 className="font-medium text-[11px] text-slate-800 group-hover:text-emerald-700 line-clamp-2 leading-tight">
                        {art.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* WIDGET 3: PHONG THỦY (Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-3 shadow-xs">
                <h3 className="bg-[#1E8449] text-white font-black text-xs uppercase px-3 py-1.5 -mx-3 -mt-3 mb-3 rounded-t">
                  PHONG THỦY NHÀ ĐẤT
                </h3>
                <ul className="space-y-2 text-[11px] text-slate-700">
                  <li onClick={() => setCurrentPage('fengshui')} className="hover:text-emerald-700 cursor-pointer flex items-start gap-1.5">
                    <span>🧭</span> <span>Cách chọn hướng nhà đón tài lộc cho gia chủ tuổi Tý, Sửu, Dần</span>
                  </li>
                  <li onClick={() => setCurrentPage('fengshui')} className="hover:text-emerald-700 cursor-pointer flex items-start gap-1.5">
                    <span>🧭</span> <span>Bố trí phòng khách và cửa chính hợp phong thủy năm 2026</span>
                  </li>
                  <li onClick={() => setCurrentPage('fengshui')} className="hover:text-emerald-700 cursor-pointer flex items-start gap-1.5">
                    <span>🧭</span> <span>Những điều đại kỵ cần tránh khi mua đất nền, nhà phố</span>
                  </li>
                </ul>
              </div>

              {/* WIDGET 4: BANNER QUẢNG CÁO (Ảnh 5) */}
              <div className="rounded overflow-hidden border border-slate-300 shadow-xs relative">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
                  alt="Thiên đường nghỉ dưỡng"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded inline-block w-max uppercase mb-1">
                    Dự án tiêu điểm
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Thiên Đường Nghỉ Dưỡng Tương Lai</h4>
                  <p className="text-[10px] text-emerald-300 font-medium">Hấp dẫn nhất - Vàng đắc địa</p>
                </div>
              </div>

              {/* WIDGET 5: THEO DÕI FACEBOOK (Ảnh 5) */}
              <div className="bg-white border border-slate-300 rounded p-3 shadow-xs">
                <h3 className="bg-[#1C2833] text-white font-black text-xs uppercase px-3 py-1.5 -mx-3 -mt-3 mb-3 rounded-t flex items-center justify-between">
                  <span>THEO DÕI FACEBOOK</span>
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                </h3>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">f</div>
                    <div className="text-left">
                      <strong className="block text-xs text-blue-900">Nhà Đất Số Fanpage</strong>
                      <span className="text-[10px] text-slate-500">854.718 người theo dõi</span>
                    </div>
                  </div>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1 rounded"
                  >
                    + Theo dõi Trang
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: NHÀ ĐẤT BÁN / CHO THUÊ / SANG NHƯỢNG
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'sale' || currentPage === 'rent' || currentPage === 'transfer') && !selectedProperty && (
        <main className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="bg-white border border-slate-300 rounded p-4 mb-4 shadow-xs flex items-center justify-between">
            <div>
              <h1 className="text-base font-black text-slate-900 uppercase">
                {currentPage === 'sale' ? 'Nhà Đất Bán Toàn Quốc' : currentPage === 'rent' ? 'Nhà Đất Cho Thuê' : 'Nhà Đất Sang Nhượng'}
              </h1>
              <p className="text-[11px] text-slate-500">Danh sách tin đăng cập nhật liên tục</p>
            </div>
            <button onClick={() => setCurrentPage('home')} className="text-xs font-bold text-emerald-700 hover:underline">
              ← Quay lại Trang Chủ
            </button>
          </div>

          <div className="bg-white border border-slate-300 rounded p-4 space-y-3">
            {currentList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProperty(item)}
                className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50 p-2 rounded cursor-pointer group"
              >
                <img src={item.image} alt={item.title} className="w-full sm:w-36 h-24 object-cover rounded shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-xs text-blue-800 group-hover:text-emerald-700 leading-snug">{item.title}</h3>
                      <span className="px-2 py-0.5 rounded bg-[#48C774] text-white font-bold text-[10px] whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {item.loc}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>📐 {item.area}</span>
                    <span className="text-emerald-700 font-bold">Xem chi tiết tin đăng →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: XEM PHONG THỦY - HƯỚNG NHÀ
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'fengshui' && !selectedProperty && (
        <main className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="bg-white border border-slate-300 rounded p-6 shadow-xs">
            <h1 className="text-lg font-black text-slate-900 uppercase border-b border-slate-200 pb-3 mb-4">
              🧭 Tra Cứu Hướng Nhà & Tuổi Làm Nhà Chuẩn Phong Thủy 2026
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded">
                <h3 className="font-bold text-emerald-900 mb-1">Tuổi Hợp Xây Nhà 2026</h3>
                <p className="text-xs text-emerald-800">Các tuổi không phạm Kim Lâu, Hoang Ốc, Tam Tai: 1968 (Mậu Thân), 1974 (Giáp Dần), 1983 (Quý Hợi), 1992 (Nhâm Thân)...</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-bold text-blue-900 mb-1">Hướng Nhà Đông Tứ Trạch</h3>
                <p className="text-xs text-blue-800">Hợp các hướng: Đông, Đông Nam, Nam, Bắc. Đón gió mát lành và sinh khí vượng cát.</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded">
                <h3 className="font-bold text-amber-900 mb-1">Hướng Nhà Tây Tứ Trạch</h3>
                <p className="text-xs text-amber-800">Hợp các hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc. Gia đạo bình an, kinh doanh hưng thịnh.</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('home')} className="text-xs font-bold text-emerald-700 underline">
              ← Quay lại trang chủ
            </button>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: LIÊN HỆ & BẢN ĐỒ
      ───────────────────────────────────────────────────────────── */}
      {currentPage === 'contact' && !selectedProperty && (
        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="bg-white border border-slate-300 rounded p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <h2 className="text-base font-black text-slate-900 uppercase mb-4">Gửi Yêu Cầu Liên Hệ & Ký Gửi</h2>
              {consultSubmitted ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <strong className="block text-emerald-900 font-bold">Gửi thông tin thành công!</strong>
                  <p className="text-emerald-700 text-xs mt-1">Chúng tôi sẽ liên hệ lại qua số {consultPhone} trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold block mb-1">Họ tên của bạn</label>
                    <input
                      type="text"
                      placeholder="Họ tên..."
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Số điện thoại liên hệ *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0919 006 030"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Nội dung tin nhắn / Nhu cầu</label>
                    <textarea
                      rows={3}
                      placeholder="Cần mua đất Bình Chánh, ngân sách 2 tỷ..."
                      value={consultContent}
                      onChange={(e) => setConsultContent(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded uppercase text-xs">
                    Gửi Liên Hệ
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Văn Phòng Sàn Giao Dịch Nhà Đất Số</h3>
              <p>📍 Địa chỉ: <strong>{company?.address || '123 Đường Số 1, KĐT Nam Sài Gòn, Bình Chánh, TP.HCM'}</strong></p>
              <p>📞 Hotline: <strong>0919 006 030</strong></p>
              <p>✉️ Email: <strong>{company?.email || 'contact@nhadatso.com.vn'}</strong></p>

              {/* Real Google Map iframe */}
              <div className="w-full h-56 rounded border border-slate-300 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-10">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=B%C3%ACnh+Ch%C3%A1nh,+TP.HCM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold rounded shadow-sm"
                  >
                    Mở Google Maps
                  </a>
                </div>
                <iframe
                  title="Bản đồ Nhà Đất Số"
                  src="https://maps.google.com/maps?q=B%C3%ACnh+Ch%C3%A1nh,+TP.HCM&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PROPERTY DETAILS MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full overflow-hidden my-8">
            <div className="relative h-60 bg-slate-900">
              <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white hover:bg-red-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-emerald-700 text-white text-xs font-black px-2.5 py-1 rounded">
                {selectedProperty.price}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">{selectedProperty.type || 'Nhà đất chính chủ'}</span>
                <h2 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">{selectedProperty.title}</h2>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {selectedProperty.loc}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded border border-slate-200 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Diện tích</span>
                  <strong className="text-slate-900">{selectedProperty.area}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Pháp lý</span>
                  <strong className="text-slate-900">Sổ đỏ / Sổ hồng</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Thời gian</span>
                  <strong className="text-slate-900">{selectedProperty.time || 'Vừa đăng'}</strong>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded overflow-hidden border border-slate-200 h-40">
                <iframe
                  title="Vị trí BĐS"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.loc + ', Việt Nam')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                <a
                  href="tel:0919006030"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded text-center text-xs uppercase"
                >
                  📞 Gọi 0919 006 030
                </a>
                <a
                  href="https://zalo.me/0919006030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1C2833] hover:bg-slate-800 text-white font-bold py-2.5 rounded text-center text-xs uppercase"
                >
                  Chat Zalo Trực Tiếp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. FOOTER NHADATSO STYLE (Ảnh 5)
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1C2833] text-slate-300 text-xs mt-auto border-t border-slate-700">
        <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">NHÀ ĐẤT BÁN</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => { setSelectedCity('TP.HCM'); setCurrentPage('sale'); }} className="hover:text-white">Hồ Chí Minh</button></li>
              <li><button onClick={() => { setSelectedCity('Hà Nội'); setCurrentPage('sale'); }} className="hover:text-white">Hà Nội</button></li>
              <li><button onClick={() => { setSelectedCity('Đà Nẵng'); setCurrentPage('sale'); }} className="hover:text-white">Đà Nẵng</button></li>
              <li><button onClick={() => { setSelectedCity('Hải Phòng'); setCurrentPage('sale'); }} className="hover:text-white">Hải Phòng</button></li>
              <li><button onClick={() => { setSelectedCity('Bình Dương'); setCurrentPage('sale'); }} className="hover:text-white">Bình Dương</button></li>
              <li><button onClick={() => { setSelectedCity('Đồng Nai'); setCurrentPage('sale'); }} className="hover:text-white">Đồng Nai</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">NHÀ ĐẤT CHO THUÊ</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => { setSelectedCity('TP.HCM'); setCurrentPage('rent'); }} className="hover:text-white">Hồ Chí Minh</button></li>
              <li><button onClick={() => { setSelectedCity('Hà Nội'); setCurrentPage('rent'); }} className="hover:text-white">Hà Nội</button></li>
              <li><button onClick={() => { setSelectedCity('Đà Nẵng'); setCurrentPage('rent'); }} className="hover:text-white">Đà Nẵng</button></li>
              <li><button onClick={() => { setSelectedCity('Hải Phòng'); setCurrentPage('rent'); }} className="hover:text-white">Hải Phòng</button></li>
              <li><button onClick={() => { setSelectedCity('Bình Dương'); setCurrentPage('rent'); }} className="hover:text-white">Bình Dương</button></li>
              <li><button onClick={() => { setSelectedCity('Đồng Nai'); setCurrentPage('rent'); }} className="hover:text-white">Đồng Nai</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">THÔNG TIN CHUNG</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#rule" className="hover:text-white">Quy chế hoạt động</a></li>
              <li><a href="#privacy" className="hover:text-white">Quy định sử dụng</a></li>
              <li><a href="#policy" className="hover:text-white">Quy trình đăng tin</a></li>
              <li><button onClick={() => setCurrentPage('fengshui')} className="hover:text-white">Cẩm nang phong thủy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">THEO DÕI FACEBOOK</h4>
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <strong className="block text-white text-[11px] mb-1">Fanpage Nhà Đất Số</strong>
              <span className="text-[10px] text-slate-400 block mb-2">Cộng đồng môi giới & nhà đầu tư BĐS</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                → Like & Theo Dõi Trang
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#141D26] py-3 text-center text-slate-400 text-[11px] border-t border-slate-800">
          <p>Nhà Đất Số - Đăng tin rao vặt bất động sản - Mua bán nhà đất toàn quốc</p>
          <p className="mt-0.5">Hotline: <strong className="text-white font-mono">0919 006 030</strong> - Email: <strong className="text-white">contact@nhadatso.com.vn</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default NhadatsoDensityTemplate;
