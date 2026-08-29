import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Building, Phone, Mail, ArrowRight, ChevronRight,
  CheckCircle2, X, Eye, Sparkles, Send, Tag, Layers, Home, ArrowLeft,
  Clock, Award, ShieldCheck, Check, Filter, Compass
} from 'lucide-react';

export interface RealtyBuildTechTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const SALE_LISTINGS = [
  { id: 'rb1', slug: 'can-ho-view-bien-the-sailing-quy-nhon', title: 'Căn hộ view biển The Sailing Quy Nhơn', loc: 'Lê Duẩn, TP. Quy Nhơn', price: '2.8 Tỷ', area: '65m²', beds: '2 PN', baths: '2 WC', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80', desc: 'Tháp đôi biểu tượng trung tâm TP. Quy Nhơn. 100% căn hộ view biển trực diện, bàn giao full nội thất cao cấp.' },
  { id: 'rb2', slug: 'biet-thu-sinh-thai-eco-central-park-vinh', title: 'Biệt thự sinh thái Eco Central Park Vinh', loc: 'Hưng Hòa, TP. Vinh', price: '6.5 Tỷ', area: '160m²', beds: '3 PN', baths: '3 WC', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', desc: 'Đại đô thị xanh 200ha lớn nhất miền Trung. Hồ cảnh quan Swan Lake và công viên dạo bộ 4 mùa rực rỡ.' },
  { id: 'rb3', slug: 'shophouse-grand-world-phu-quoc', title: 'Shophouse thương mại Grand World Phú Quốc', loc: 'Gành Dầu, Phú Quốc', price: '9.2 Tỷ', area: '120m²', beds: '4 PN', baths: '4 WC', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80', desc: 'Thành phố không ngủ 24/7. Tọa độ vàng kinh doanh ẩm thực, thời trang và lưu trú cho hàng triệu lượt du khách.' },
  { id: 'rb4', slug: 'dinh-thu-dao-swanbay-marina-villa', title: 'Dinh thự đảo SwanBay Marina Villa', loc: 'Đại Phước, Nhơn Trạch', price: '18 Tỷ', area: '320m²', beds: '4 PN', baths: '5 WC', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80', desc: 'Dinh thự đảo biệt lập bốn bề sông nước. Chuẩn sống nghỉ dưỡng thượng lưu liền kề TP. Thủ Đức.' }
];

const CITIES = [
  { name: 'Hà Nội', count: '1.250 Dự án', img: 'https://images.unsplash.com/photo-1509030450996-93781297593c?w=600&q=80' },
  { name: 'Đà Nẵng', count: '680 Dự án', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80' },
  { name: 'TP. Hồ Chí Minh', count: '2.140 Dự án', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80' },
  { name: 'Nghệ An', count: '320 Dự án', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
  { name: 'Hải Phòng', count: '450 Dự án', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' }
];

export const RealtyBuildTechTemplate: React.FC<RealtyBuildTechTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const resolveRoute = (raw: string) => {
    if (!raw || raw === 'home') return { page: 'home', prop: null };
    const parts = raw.split('/');
    if (parts[0] === 'chi-tiet' || parts[0] === 'prop-detail') {
      const slug = parts.slice(1).join('/');
      const match = SALE_LISTINGS.find(p => p.slug === slug || p.id === slug) || SALE_LISTINGS[0];
      return { page: 'prop-detail', prop: match };
    }
    return { page: parts[0], prop: null };
  };

  const initialResolved = resolveRoute(initialPage);
  const [currentPage, setCurrentPage] = useState<string>(initialResolved.page);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(initialResolved.prop || SALE_LISTINGS[0]);
  const [searchKw, setSearchKw] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('all');

  useEffect(() => {
    if (initialPage) {
      const r = resolveRoute(initialPage);
      setCurrentPage(r.page);
      if (r.prop) setSelectedProperty(r.prop);
    }
  }, [initialPage]);


  const navigate = (page: string, slugParam?: string) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const basePath = window.location.pathname.split('/').slice(0, 3).join('/');
      let newUrl = basePath;
      if (page !== 'home') {
        newUrl += slugParam ? `/${page}/${slugParam}` : `/${page}`;
      }
      window.history.pushState(null, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProp = (prop: any) => {
    setSelectedProperty(prop);
    navigate('chi-tiet', prop.slug || prop.id);
  };

  const isHome = currentPage === 'home' || (!['listings', 'cities', 'contact', 'prop-detail', 'chi-tiet', 'about', 'gioi-thieu', 'news', 'tin-tuc', 'projects', 'du-an'].includes(currentPage) && !currentPage.startsWith('chi-tiet'));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div 
            onClick={() => navigate('home')}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xs bg-[#0284C7] text-white flex items-center justify-center font-black text-sm">
              🏢
            </div>
            <span className="text-xl font-black tracking-tight text-[#0284C7]">
              REALTYBUILD
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-700">
            <button onClick={() => navigate('home')} className={`hover:text-[#0284C7] ${currentPage === 'home' ? 'text-[#0284C7] font-black' : ''}`}>Trang Chủ</button>
            <button onClick={() => navigate('listings')} className={`hover:text-[#0284C7] ${currentPage === 'listings' || currentPage === 'prop-detail' ? 'text-[#0284C7] font-black' : ''}`}>Bất Động Sản</button>
            <button onClick={() => navigate('cities')} className={`hover:text-[#0284C7] ${currentPage === 'cities' ? 'text-[#0284C7] font-black' : ''}`}>Tỉnh Thành</button>
            <button onClick={() => navigate('contact')} className={`hover:text-[#0284C7] ${currentPage === 'contact' ? 'text-[#0284C7] font-black' : ''}`}>Liên Hệ</button>
          </nav>

          <a href="tel:0919006030" className="bg-[#0284C7] hover:bg-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xs shadow-xs uppercase">
            Hotline: 0919 006 030
          </a>
        </div>
      </header>

      {/* HERO */}
      {isHome && (
        <section className="relative h-[520px] bg-slate-950 overflow-hidden flex items-center justify-center text-center text-white">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" alt="Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="relative z-10 max-w-2xl px-4 space-y-3">
            <span className="text-sky-400 text-xs font-bold tracking-widest uppercase block">NỀN TẢNG BẤT ĐỘNG SẢN CÔNG NGHỆ</span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase">Khám Phá Hơn 10.000+ Dự Án Xác Thực</h1>
            <p className="text-xs sm:text-sm text-slate-200">Tra cứu thông tin quy hoạch, giá bán và chính sách chiết khấu trực tiếp</p>
          </div>
        </section>
      )}

      {/* HOME VIEW */}
      {isHome && (
        <main className="max-w-[1360px] mx-auto px-4 py-12 space-y-16 flex-1">
          {/* CITIES */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 uppercase">Khám Phá Theo Tỉnh Thành</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CITIES.map((c, i) => (
                <div key={i} onClick={() => navigate('listings')} className="relative overflow-hidden aspect-[16/11] cursor-pointer group shadow-2xs border border-slate-200">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-sm font-bold group-hover:text-sky-300 transition-colors">{c.name}</h3>
                    <span className="text-[11px] text-slate-300">{c.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LISTINGS */}
          <section>
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase">Bất Động Sản Nổi Bật</h2>
              <button onClick={() => navigate('listings')} className="text-xs font-bold text-[#0284C7] hover:underline">Xem tất cả →</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SALE_LISTINGS.map((p) => (
                <div key={p.id} onClick={() => handleSelectProp(p)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-[#0284C7] text-white text-[10px] font-bold px-2 py-0.5">Xác thực 100%</div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0284C7] line-clamp-2 mb-1">{p.title}</h3>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{p.loc}</span></p>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <strong className="text-xs font-black text-rose-600 font-mono">{p.price}</strong>
                    <span className="text-xs font-bold text-[#0284C7]">Chi tiết →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* FULL PROPERTY DETAIL PAGE */}
      {(currentPage === 'prop-detail' || currentPage === 'chi-tiet' || currentPage.startsWith('chi-tiet')) && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#0284C7] flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('listings')} className="hover:text-[#0284C7]">Bất động sản</button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-md">{selectedProperty.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => navigate('listings')} className="px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách
            </button>
            <span className="text-xs bg-sky-100 text-[#0284C7] font-bold px-2.5 py-1">Mã BĐS: #{selectedProperty.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-900 relative">
                  <img src={selectedProperty.img} alt={selectedProperty.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1">{selectedProperty.price}</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                <h1 className="text-xl sm:text-3xl font-black text-slate-900">{selectedProperty.title}</h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#0284C7]" /><span>{selectedProperty.loc}</span></p>

                <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Diện tích</span><strong>{selectedProperty.area}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Phòng ngủ</span><strong>{selectedProperty.beds}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Phòng tắm</span><strong>{selectedProperty.baths}</strong></div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Thông tin chi tiết</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedProperty.desc}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 p-6 shadow-xs sticky top-24 space-y-4">
                <div className="text-center pb-4 border-b border-slate-100">
                  <strong className="block text-sm font-bold text-slate-900">Chuyên Viên Tư Vấn Dự Án</strong>
                  <span className="text-[11px] text-slate-500">Hỗ trợ pháp lý & thủ tục sang tên</span>
                </div>
                <a href="tel:0919006030" className="w-full py-3 bg-[#0284C7] hover:bg-sky-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-xs transition-colors">
                  <Phone className="w-4 h-4" /> Gọi 0919 006 030
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* SUBPAGES (LISTINGS / CITIES / CONTACT) */}
      {currentPage === 'listings' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Danh Sách Bất Động Sản Toàn Quốc</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0284C7] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALE_LISTINGS.map((p) => (
              <div key={p.id} onClick={() => handleSelectProp(p)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0284C7] line-clamp-2 mb-1">{p.title}</h3>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{p.loc}</span></p>
                  </div>
                </div>
                <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <strong className="text-xs font-black text-rose-600 font-mono">{p.price}</strong>
                  <span className="text-xs font-bold text-[#0284C7]">Xem ngay →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'cities' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Bất Động Sản Theo Tỉnh Thành Trọng Điểm</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0284C7] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CITIES.map((c, i) => (
              <div key={i} onClick={() => navigate('listings')} className="relative overflow-hidden aspect-[16/11] cursor-pointer group shadow-2xs border border-slate-200">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-sm font-bold group-hover:text-sky-300 transition-colors">{c.name}</h3>
                  <span className="text-[11px] text-slate-300">{c.count}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: GIỚI THIỆU (ABOUT)
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'about' || currentPage === 'gioi-thieu') && (
        <main className="max-w-[1200px] mx-auto px-4 py-10 space-y-8 flex-1 w-full">
          <div className="bg-white p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-widest block mb-1">VỀ NỀN TẢNG</span>
              <h1 className="text-2xl font-black text-slate-900 uppercase">RealtyBuild Tech Portal</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>RealtyBuild</strong> là nền tảng PropTech tiên phong kết hợp dữ liệu lớn và thuật toán định giá thông minh, cung cấp cho các nhà đầu tư cái nhìn toàn diện và chính xác nhất về tiềm năng tăng trưởng của từng khu vực.
                </p>
                <p>
                  Chúng tôi xây dựng hệ thống bản đồ số hóa quy hoạch 1/500, theo dõi tiến độ thi công thực tế và chỉ số biến động giá đất tại các vùng kinh tế trọng điểm phía Bắc và phía Nam.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded">
                    <strong className="text-lg font-black text-[#0284C7] block">10.000+</strong>
                    <span className="text-[10px] text-slate-500">Dự án số hóa</span>
                  </div>
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded">
                    <strong className="text-lg font-black text-[#0284C7] block">100%</strong>
                    <span className="text-[10px] text-slate-500">Quy hoạch chuẩn</span>
                  </div>
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded">
                    <strong className="text-lg font-black text-[#0284C7] block">AI Hub</strong>
                    <span className="text-[10px] text-slate-500">Định giá thời gian thực</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="RealtyBuild Portal" className="w-full h-56 object-cover border border-slate-200 shadow-sm" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0284C7] hover:underline">
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: TIN TỨC & PHÂN TÍCH (NEWS)
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'news' || currentPage === 'tin-tuc' || currentPage.startsWith('tin-tuc')) && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Tin Tức Thị Trường & Công Nghệ Bất Động Sản</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0284C7] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Chỉ số giá đất đô thị quý mới nhất: Đà tăng mạnh tại khu Đông', cat: 'Phân tích dữ liệu', date: 'Hôm nay', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', desc: 'Báo cáo chi tiết về biến động giá đất ở và căn hộ tại 15 quận huyện trung tâm.' },
              { title: 'Ứng dụng AI trong thẩm định giá bất động sản tự động', cat: 'Công nghệ BĐS', date: 'Hôm qua', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', desc: 'Mô hình học máy dự báo biên độ tăng giá dựa trên 200 tham số vị trí và hạ tầng.' },
              { title: 'Tiến độ các tuyến cao tốc trọng điểm kết nối vùng năm 2026', cat: 'Quy hoạch hạ tầng', date: '2 ngày trước', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', desc: 'Cập nhật tiến độ giải phóng mặt bằng và thi công thực tế tại các dự án trọng điểm.' },
            ].map((art, idx) => (
              <div key={idx} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all p-4 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-3">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0284C7] uppercase">{art.cat} · {art.date}</span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1 mb-2 leading-snug">{art.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{art.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3">
                  <span className="text-xs font-bold text-[#0284C7]">Đọc tiếp →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="max-w-[700px] mx-auto px-4 py-8 space-y-6 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Liên Hệ Sàn RealtyBuild</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0284C7] hover:underline">← Về trang chủ</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Chúng tôi đã nhận được thông tin liên hệ.'); navigate('home'); }} className="bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 text-xs">
            <input type="text" placeholder="Họ và tên..." required className="w-full p-2.5 border border-slate-200" />
            <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2.5 border border-slate-200" />
            <textarea rows={4} placeholder="Nội dung cần hỗ trợ..." required className="w-full p-2.5 border border-slate-200" />
            <button type="submit" className="w-full py-3 bg-[#0284C7] hover:bg-sky-700 text-white font-bold uppercase">GỬI LIÊN HỆ</button>
          </form>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white text-sm font-black">REALTYBUILD TECH PORTAL</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">Nền tảng công nghệ bất động sản</p>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            <p>Hotline: <strong className="text-amber-400 font-mono">0919 006 030</strong></p>
            <p>© 2026 RealtyBuild. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RealtyBuildTechTemplate;
