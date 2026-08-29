import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Building, Phone, Mail, ArrowRight, ChevronRight,
  CheckCircle2, X, Eye, Sparkles, Send, Tag, Layers, Home, ArrowLeft,
  Clock, Award, Calendar, Star, ShieldCheck, Check, Coffee, Utensils, Waves
} from 'lucide-react';

export interface HappyLandResortTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const RESORT_UNITS = [
  {
    id: 'hl1',
    slug: 'condotel-view-bien-chinh-dien-nha-trang',
    title: 'Condotel Studio View Biển Trực Diện',
    loc: 'Trần Phú, TP. Nha Trang, Khánh Hòa',
    price: '1.65 Tỷ',
    promo: 'Ưu đãi 50% Giai Đoạn 1',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
    area: '42m²',
    beds: '1 PN King',
    baths: '1 WC Jacuzzi',
    roi: 'Cam kết chia sẻ 85/15 lợi nhuận khai thác',
    desc: 'Căn hộ khách sạn nghỉ dưỡng sát mặt biển Trần Phú. Ban công tràn kính ngắm trọn vịnh biển Nha Trang và cáp treo Vinpearl.',
    amenities: ['Bể bơi vô cực tràn bờ', 'Sky Bar tầng 38', 'Nhà hàng buffet Á - Âu', 'Khu Spa & Sauna thảo dược']
  },
  {
    id: 'hl2',
    slug: 'condotel-suite-2pn-panorama-nha-trang',
    title: 'Condotel Suite 2PN Panorama Biển',
    loc: 'Trần Phú, TP. Nha Trang, Khánh Hòa',
    price: '2.85 Tỷ',
    promo: 'Tặng Gói Nội Thất 5 Sao 150 Triệu',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    area: '78m²',
    beds: '2 PN',
    baths: '2 WC',
    roi: 'Tặng 15 đêm nghỉ dưỡng miễn phí/năm',
    desc: 'Căn Suite đẳng cấp dành cho gia đình hoặc khách du lịch cao cấp. Thiết kế mở đón trọn gió biển, nội thất gỗ tự nhiên sang trọng.',
    amenities: ['Phòng khách rộng view biển', 'Bếp tiện nghi', 'Bồn tắm nằm hướng vịnh', 'Dịch vụ dọn phòng 24/7']
  },
  {
    id: 'hl3',
    slug: 'biet-thu-bien-san-vuon-happy-land',
    title: 'Biệt Thự Biển Sân Vườn Happy Land',
    loc: 'Bãi Dài, Cam Ranh, Khánh Hòa',
    price: '12.5 Tỷ',
    promo: 'Chiết Khấu 8% Khi Thanh Toán Sớm',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
    area: '320m²',
    beds: '3 PN',
    baths: '4 WC',
    roi: 'Quản lý vận hành bởi tập đoàn 5 sao',
    desc: 'Biệt thự đơn lập 1 tầng phong cách nhiệt đới với bể bơi riêng biệt và khu vườn dừa rợp bóng mát ngay trước biển.',
    amenities: ['Bể bơi riêng 45m²', 'Lối đi thẳng ra bãi biển', 'Khu tiệc BBQ sân vườn', 'Xe điện đưa đón nội khu']
  }
];

const RESORT_SERVICES = [
  { id: 's1', title: 'Bể Bơi Vô Cực Chân Mây', desc: 'Bể bơi nước ấm tầng 38 ngắm trọn bình minh vịnh Nha Trang.', icon: '🏊' },
  { id: 's2', title: 'Sky Bar & Cigar Lounge', desc: 'Cocktail thượng hạng và không gian âm nhạc acoustic mỗi tối.', icon: '🍸' },
  { id: 's3', title: 'Nhà Hàng Biển Ocean Buffet', desc: 'Ẩm thực hải sản tươi sống và món ngon chuẩn Michelin.', icon: '🦞' },
  { id: 's4', title: 'Spa & Trị Liệu Thảo Dược', desc: 'Massage đá nóng và xông hơi khoáng thảo dược thư giãn.', icon: '🌿' }
];

const RESORT_POSTS = [
  {
    id: 'rn1',
    slug: 'co-hoi-dau-tu-condotel-bien-nha-trang-2026',
    title: 'Cơ hội đầu tư Condotel nghỉ dưỡng biển Nha Trang 2026: Dòng tiền kép từ du lịch phục hồi',
    date: '22/05/2026',
    cat: 'Đầu tư Nghỉ Dưỡng',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    summary: 'Lượng khách quốc tế quay trở lại Việt Nam đạt kỷ lục mới, tạo đòn bẩy lớn cho tỷ lệ lấp đầy phòng khách sạn tại Nha Trang lên tới 88%.',
    body: [
      'Nha Trang tiếp tục khẳng định vị thế thủ phủ du lịch biển hàng đầu Đông Nam Á với hơn 300 ngày nắng ấm trong năm.',
      'Sở hữu một căn hộ khách sạn Condotel view biển không chỉ mang lại tài sản gia tăng giá trị theo thời gian mà còn đem lại dòng thu nhập thụ động đều đặn hàng tháng từ chương trình cho thuê ủy thác.',
      'Dự án Happy Land sở hữu pháp lý minh bạch và đơn vị vận hành chuẩn quốc tế, mang đến sự an tâm tuyệt đối cho các nhà đầu tư.'
    ]
  },
  {
    id: 'rn2',
    slug: 'chinh-sach-chia-se-loi-nhuan-85-15-happy-land',
    title: 'Phân tích chính sách cam kết chia sẻ lợi nhuận 85/15 tại Happy Land Nha Trang',
    date: '18/05/2026',
    cat: 'Chính sách tài chính',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    summary: 'Khách hàng nhận 85% lợi nhuận sau thuế từ việc cho thuê phòng, kiểm toán định kỳ bởi Big4 minh bạch.',
    body: [
      'Mô hình chia sẻ lợi nhuận thực tế 85/15 đảm bảo quyền lợi tối đa cho chủ sở hữu khi lượng khách du lịch tại Nha Trang tăng trưởng mạnh.',
      'Đặc biệt, khách hàng còn được tặng 15 đêm nghỉ dưỡng miễn phí mỗi năm trên toàn hệ thống resort liên kết.'
    ]
  }
];

export const HappyLandResortTemplate: React.FC<HappyLandResortTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const resolveRoute = (raw: string) => {
    if (!raw || raw === 'home') return { page: 'home', unit: null, article: null };
    const parts = raw.split('/');
    if (parts[0] === 'can-ho' || parts[0] === 'unit-detail') {
      const slug = parts.slice(1).join('/');
      const match = RESORT_UNITS.find(i => i.slug === slug || i.id === slug) || RESORT_UNITS[0];
      return { page: 'unit-detail', unit: match, article: null };
    }
    if (parts[0] === 'tin-tuc' || parts[0] === 'news-detail') {
      const slug = parts.slice(1).join('/');
      const match = RESORT_POSTS.find(i => i.slug === slug || i.id === slug) || RESORT_POSTS[0];
      return { page: 'news-detail', unit: null, article: match };
    }
    return { page: parts[0], unit: null, article: null };
  };

  const initialResolved = resolveRoute(initialPage);
  const [currentPage, setCurrentPage] = useState<string>(initialResolved.page);
  const [selectedUnit, setSelectedUnit] = useState<any | null>(initialResolved.unit || RESORT_UNITS[0]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialResolved.article || RESORT_POSTS[0]);
  const [booked, setBooked] = useState<boolean>(false);

  useEffect(() => {
    if (initialPage) {
      const r = resolveRoute(initialPage);
      setCurrentPage(r.page);
      if (r.unit) setSelectedUnit(r.unit);
      if (r.article) setSelectedArticle(r.article);
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

  const handleSelectUnit = (u: any) => {
    setSelectedUnit(u);
    navigate('can-ho', u.slug || u.id);
  };

  const handleSelectArticle = (art: any) => {
    setSelectedArticle(art);
    navigate('tin-tuc', art.slug || art.id);
  };

  const isHome = currentPage === 'home' || (!['units', 'services', 'news', 'contact', 'unit-detail', 'news-detail', 'about', 'gioi-thieu', 'projects', 'du-an', 'gallery', 'thu-vien', 'can-ho', 'tin-tuc'].includes(currentPage) && !currentPage.startsWith('can-ho') && !currentPage.startsWith('tin-tuc'));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-cyan-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div 
            onClick={() => navigate('home')}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xs bg-[#0891B2] text-white flex items-center justify-center font-bold text-base">
              🏖️
            </div>
            <span className="text-lg font-black tracking-tight text-[#0891B2]">
              HAPPY LAND RESORT
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-700">
            <button onClick={() => navigate('home')} className={`hover:text-[#0891B2] ${currentPage === 'home' ? 'text-[#0891B2] font-black' : ''}`}>Trang Chủ</button>
            <button onClick={() => navigate('units')} className={`hover:text-[#0891B2] ${currentPage === 'units' || currentPage === 'unit-detail' ? 'text-[#0891B2] font-black' : ''}`}>Condotel & Villa</button>
            <button onClick={() => navigate('services')} className={`hover:text-[#0891B2] ${currentPage === 'services' ? 'text-[#0891B2] font-black' : ''}`}>Dịch Vụ & Tiện Ích</button>
            <button onClick={() => navigate('news')} className={`hover:text-[#0891B2] ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-[#0891B2] font-black' : ''}`}>Tin Tức</button>
            <button onClick={() => navigate('contact')} className={`hover:text-[#0891B2] ${currentPage === 'contact' ? 'text-[#0891B2] font-black' : ''}`}>Liên Hệ</button>
          </nav>

          <a href="tel:0919006030" className="bg-[#0891B2] hover:bg-cyan-700 text-white font-bold text-xs px-4 py-2 rounded-xs shadow-xs uppercase">
            Hotline: 0919 006 030
          </a>
        </div>
      </header>

      {/* 2. HERO */}
      {isHome && (
        <section className="relative h-[540px] bg-slate-950 overflow-hidden flex items-center justify-center text-center text-white">
          <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80" alt="Resort" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="relative z-10 max-w-2xl px-4 space-y-3">
            <span className="text-amber-300 text-xs font-bold tracking-widest uppercase block">ƯU ĐÃI NGHỈ DƯỠNG BIỂN 50% OFF</span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase">Quần Thể Căn Hộ Nghỉ Dưỡng Happy Land</h1>
            <p className="text-xs sm:text-sm text-slate-200">Sở hữu kỳ nghỉ trọn đời và cơ hội đầu tư sinh lời vượt trội tại vịnh biển đẹp nhất hành tinh</p>
          </div>
        </section>
      )}

      {/* 3. HOME VIEW */}
      {isHome && (
        <main className="max-w-[1360px] mx-auto px-4 py-12 space-y-16 flex-1">
          <section>
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900">BẢNG HÀNG CONDOTEL & BIỆT THỰ BIỂN</h2>
              <div className="w-12 h-0.5 bg-[#0891B2] mx-auto mt-2 mb-2" />
              <p className="text-xs text-slate-500">Các căn đẹp nhất trực diện biển Trần Phú - Nha Trang</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESORT_UNITS.map((u) => (
                <div key={u.id} onClick={() => handleSelectUnit(u)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={u.image} alt={u.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute top-2 left-2 bg-[#0891B2] text-white text-[10px] font-bold px-2 py-0.5">{u.promo}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0891B2] mb-1 leading-snug">{u.title}</h3>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mb-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{u.loc}</span></p>
                      <p className="text-xs text-slate-600 bg-cyan-50/60 p-2 border border-cyan-100">{u.roi}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <strong className="text-xs font-black text-rose-600 font-mono">{u.price}</strong>
                    <span className="text-xs font-bold text-[#0891B2]">Xem chi tiết →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DỊCH VỤ */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900">TIỆN ÍCH NGHỈ DƯỠNG 5 SAO</h2>
              <div className="w-12 h-0.5 bg-[#0891B2] mx-auto mt-2 mb-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {RESORT_SERVICES.map((s) => (
                <div key={s.id} className="bg-white p-5 border border-slate-200 shadow-2xs space-y-2 text-center">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEWS */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <h2 className="text-lg font-black text-slate-900 uppercase">Tin Tức Nghỉ Dưỡng</h2>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0891B2] hover:underline">Xem tất cả →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESORT_POSTS.map((art) => (
                <div key={art.id} onClick={() => handleSelectArticle(art)} className="bg-white p-4 border border-slate-200 flex gap-4 cursor-pointer hover:shadow-md transition-all group">
                  <div className="w-44 aspect-[16/10] overflow-hidden shrink-0">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#0891B2] uppercase">{art.cat} · {art.date}</span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0891B2] line-clamp-2 mt-1 mb-1">{art.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                    </div>
                    <span className="text-xs font-bold text-[#0891B2]">Đọc toàn bộ bài viết →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* 4. FULL UNIT DETAIL PAGE */}
      {(currentPage === 'unit-detail' || currentPage === 'can-ho' || currentPage.startsWith('can-ho')) && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#0891B2] flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('units')} className="hover:text-[#0891B2]">Condotel</button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-md">{selectedUnit.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => navigate('units')} className="px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách
            </button>
            <span className="text-xs bg-cyan-100 text-[#0891B2] font-bold px-2.5 py-1">Chính sách: {selectedUnit.promo}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-900 relative">
                  <img src={selectedUnit.image} alt={selectedUnit.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-3 py-1">{selectedUnit.price}</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                <h1 className="text-xl sm:text-3xl font-black text-slate-900">{selectedUnit.title}</h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#0891B2]" /><span>{selectedUnit.loc}</span></p>

                <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Diện tích</span><strong>{selectedUnit.area}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Phòng ngủ</span><strong>{selectedUnit.beds}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block font-bold">Lợi nhuận</span><strong>85/15</strong></div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Mô tả sản phẩm</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedUnit.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">Tiện ích đặc quyền</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedUnit.amenities?.map((am: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /><span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 p-6 shadow-xs sticky top-24 space-y-4">
                <div className="text-center pb-4 border-b border-slate-100">
                  <strong className="block text-sm font-bold text-slate-900">Ban Kinh Doanh Happy Land</strong>
                  <span className="text-[11px] text-slate-500">Tư vấn chính sách ưu đãi F1</span>
                </div>
                <a href="tel:0919006030" className="w-full py-3 bg-[#0891B2] hover:bg-cyan-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-xs transition-colors">
                  <Phone className="w-4 h-4" /> Gọi 0919 006 030
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 5. FULL ARTICLE DETAIL */}
      {(currentPage === 'news-detail' || currentPage === 'tin-tuc' || currentPage.startsWith('tin-tuc')) && (
        <main className="max-w-[900px] mx-auto px-4 py-8 space-y-6 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#0891B2] flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('news')} className="hover:text-[#0891B2]">Tin tức</button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-sm">{selectedArticle.title}</span>
          </div>

          <button onClick={() => navigate('news')} className="px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách tin
          </button>

          <article className="bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0891B2] bg-cyan-50 px-2.5 py-1 border border-cyan-200 inline-block">
              {selectedArticle.cat}
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">{selectedArticle.title}</h1>
            <div className="aspect-[16/9] bg-slate-900 overflow-hidden">
              <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-cyan-50/60 border-l-4 border-[#0891B2] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {selectedArticle.summary}
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle.body?.map((para: string, i: number) => <p key={i}>{para}</p>)}
            </div>
          </article>
        </main>
      )}

      {/* 6. SUBPAGES (UNITS / SERVICES / NEWS / CONTACT) */}
      {currentPage === 'units' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Bảng Hàng Nghỉ Dưỡng Condotel & Biệt Thự</h1>
              <p className="text-xs text-slate-500 mt-1">Căn hộ view biển trực diện Trần Phú Nha Trang</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESORT_UNITS.map((u) => (
              <div key={u.id} onClick={() => handleSelectUnit(u)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={u.image} alt={u.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 left-2 bg-[#0891B2] text-white text-[10px] font-bold px-2 py-0.5">{u.promo}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0891B2] mb-1 leading-snug">{u.title}</h3>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mb-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{u.loc}</span></p>
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <strong className="text-xs font-black text-rose-600 font-mono">{u.price}</strong>
                  <span className="text-xs font-bold text-[#0891B2]">Xem ngay →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'services' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Hệ Thống Tiện Ích & Dịch Vụ Nghỉ Dưỡng</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {RESORT_SERVICES.map((s) => (
              <div key={s.id} className="bg-white p-6 border border-slate-200 shadow-2xs space-y-3 text-center">
                <div className="text-4xl">{s.icon}</div>
                <h3 className="font-bold text-base text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'news' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Tin Tức Thị Trường Nghỉ Dưỡng Biển</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESORT_POSTS.map((art) => (
              <div key={art.id} onClick={() => handleSelectArticle(art)} className="bg-white p-4 border border-slate-200 flex gap-4 cursor-pointer hover:shadow-md transition-all group">
                <div className="w-44 aspect-[16/10] overflow-hidden shrink-0">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#0891B2] uppercase">{art.cat} · {art.date}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0891B2] line-clamp-2 mt-1 mb-1">{art.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0891B2]">Đọc toàn bộ bài viết →</span>
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
        <main className="max-w-[1360px] mx-auto px-4 py-10 space-y-8 flex-1 w-full">
          <div className="bg-white p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[#0891B2] uppercase tracking-widest block mb-1">VỀ QUẦN THỂ NGHỈ DƯỠNG</span>
              <h1 className="text-2xl font-black text-slate-900 uppercase">Happy Land Resort Nha Trang</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Happy Land Resort Nha Trang</strong> là tổ hợp nghỉ dưỡng và giải trí 5 sao tọa lạc tại vịnh ngọc Nha Trang, mang đến trải nghiệm sống thượng lưu cùng tiềm năng khai thác cho thuê sinh lời vượt bậc.
                </p>
                <p>
                  Với 100% căn hộ và biệt thự hướng biển, hệ sinh thái tiện ích All-in-One gồm công viên nước, bến du thuyền và chuỗi ẩm thực Á-Âu, Happy Land là điểm đến lý tưởng cho kỳ nghỉ của bạn.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="p-3 bg-cyan-50 border border-cyan-100 rounded">
                    <strong className="text-lg font-black text-[#0891B2] block">1.200+</strong>
                    <span className="text-[10px] text-slate-500">Căn Condotel & Villa</span>
                  </div>
                  <div className="p-3 bg-cyan-50 border border-cyan-100 rounded">
                    <strong className="text-lg font-black text-[#0891B2] block">5 Sao</strong>
                    <span className="text-[10px] text-slate-500">Tiêu chuẩn quốc tế</span>
                  </div>
                  <div className="p-3 bg-cyan-50 border border-cyan-100 rounded">
                    <strong className="text-lg font-black text-[#0891B2] block">10%/năm</strong>
                    <span className="text-[10px] text-slate-500">Cam kết lợi nhuận</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" alt="Resort view" className="w-full h-56 object-cover border border-slate-200 shadow-sm" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: THƯ VIỆN HÌNH ẢNH (GALLERY)
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'gallery' || currentPage === 'thu-vien') && (
        <main className="max-w-[1360px] mx-auto px-4 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Thư Viện Ảnh Happy Land Resort</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80',
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
              'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80',
            ].map((img, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden rounded border border-slate-200 group">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Liên Hệ Ban Quản Lý Happy Land</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0891B2] hover:underline">← Về trang chủ</button>
          </div>
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Liên hệ tư vấn và đặt lịch tham quan</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Chúng tôi đã nhận được thông tin.'); navigate('home'); }} className="space-y-3 text-xs">
              <input type="text" placeholder="Họ và tên..." required className="w-full p-2.5 border border-slate-200" />
              <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2.5 border border-slate-200" />
              <button type="submit" className="w-full py-3 bg-[#0891B2] hover:bg-cyan-700 text-white font-black uppercase shadow-xs">GỬI YÊU CẦU</button>
            </form>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white text-sm font-black">HAPPY LAND RESORT NHA TRANG</strong>
            <p className="text-[11px] text-slate-500 mt-0.5">Trần Phú, TP. Nha Trang, Khánh Hòa</p>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            <p>Hotline: <strong className="text-amber-400 font-mono">0919 006 030</strong></p>
            <p>© 2026 Happy Land Resort. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HappyLandResortTemplate;
