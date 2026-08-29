import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Building, Phone, Mail, ArrowRight, ChevronRight,
  CheckCircle2, X, Eye, BookOpen, User, Send, Heart, Share2, Home,
  ArrowLeft, Clock, Award, ShieldCheck, Check, DollarSign, Calendar, Tag,
  SlidersHorizontal, Sparkles
} from 'lucide-react';

export interface HomeoMultiThumbnailTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const NEW_PROJECTS = [
  {
    id: 'p1',
    slug: 'du-an-vinhomes-riverside-long-bien',
    title: 'Khu Đô Thị Vinhomes Riverside Long Biên',
    loc: 'Long Biên, Hà Nội',
    price: '35 - 65 Tỷ',
    area: '300 - 500m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
    ]
  },
  {
    id: 'p2',
    slug: 'ecopark-grand-the-island-hung-yen',
    title: 'Ecopark Grand The Island Văn Giang',
    loc: 'Văn Giang, Hưng Yên',
    price: '28 - 50 Tỷ',
    area: '270 - 450m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
    ]
  },
  {
    id: 'p3',
    slug: 'masteri-west-heights-smart-city',
    title: 'Tổ Hợp Masteri West Heights Tây Mỗ',
    loc: 'Nam Từ Liêm, Hà Nội',
    price: '2.5 - 6.2 Tỷ',
    area: '55 - 90m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'
    ]
  },
  {
    id: 'p4',
    slug: 'vinhomes-ocean-park-gia-lam',
    title: 'Thành Phố Biển Hồ Vinhomes Ocean Park',
    loc: 'Gia Lâm, Hà Nội',
    price: '1.8 - 15 Tỷ',
    area: '45 - 200m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
    ]
  },
  {
    id: 'p5',
    slug: 'grand-world-ha-noi-mega-complex',
    title: 'Tổ Hợp Shophouse Grand World Hà Nội',
    loc: 'Văn Giang, Hưng Yên',
    price: '9.8 - 18 Tỷ',
    area: '90 - 150m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
    ]
  },
  {
    id: 'p6',
    slug: 'the-matrix-one-me-tri',
    title: 'Căn Hộ Hạng Sang The Matrix One Mễ Trì',
    loc: 'Lê Quang Đạo, Nam Từ Liêm',
    price: '4.9 - 11 Tỷ',
    area: '86 - 145m²',
    tag: 'Mở Bán Đợt 1',
    mainImg: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
    ]
  }
];

const SALE_HOUSES = [
  {
    id: 'h1',
    slug: 'can-ho-goldmark-city-136-ho-tung-mau',
    title: 'Căn Hộ Cao Cấp Goldmark City Hồ Tùng Mậu',
    loc: '136 Hồ Tùng Mậu, Bắc Từ Liêm',
    price: '3.65 Tỷ',
    area: '74m²',
    tag: 'Cần Bán Gấp',
    mainImg: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
    ]
  },
  {
    id: 'h2',
    slug: 'can-ho-flc-complex-36-pham-hung',
    title: 'Căn Hộ FLC Complex 36 Phạm Hùng',
    loc: '36 Phạm Hùng, Nam Từ Liêm',
    price: '3.2 Tỷ',
    area: '66m²',
    tag: 'Cần Bán Gấp',
    mainImg: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
    ]
  },
  {
    id: 'h3',
    slug: 'can-ho-imperia-garden-nguyen-huy-tuong',
    title: 'Căn Hộ Imperia Garden Nguyễn Huy Tưởng',
    loc: '203 Nguyễn Huy Tưởng, Thanh Xuân',
    price: '4.2 Tỷ',
    area: '80m²',
    tag: 'Cần Bán Gấp',
    mainImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
    ]
  }
];

const RENTALS = [
  {
    id: 'r1',
    slug: 'phong-tro-full-noi-that-cau-giay',
    title: 'Phòng Studio Full Nội Thất Cầu Giấy',
    loc: 'Dịch Vọng Hậu, Cầu Giấy',
    price: '5.5 Tr/tháng',
    area: '35m²',
    tag: 'Cho Thuê',
    mainImg: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
    ]
  },
  {
    id: 'r2',
    slug: 'can-ho-dich-vu-nam-tu-liem',
    title: 'Căn Hộ Dịch Vụ Cao Cấp Nam Từ Liêm',
    loc: 'Mỹ Đình 2, Nam Từ Liêm',
    price: '8.5 Tr/tháng',
    area: '50m²',
    tag: 'Cho Thuê',
    mainImg: 'https://images.unsplash.com/photo-1502005229762-ee1b2da97327?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
    ]
  },
  {
    id: 'r3',
    slug: 'chung-cu-mini-thanh-xuan',
    title: 'Chung Cư Mini Ban Công Thoáng Thanh Xuân',
    loc: 'Nguyễn Trãi, Thanh Xuân',
    price: '6.0 Tr/tháng',
    area: '40m²',
    tag: 'Cho Thuê',
    mainImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    thumbs: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
    ]
  }
];

const SMART_BUYER_ARTICLES = [
  {
    id: 'a1',
    slug: '7-luu-y-khi-mua-ban-nha-dat-chua-cong-chung',
    title: '7 lưu ý khi mua bán nhà đất chưa công chứng sổ đỏ',
    date: '15/05/2026',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    summary: 'Những rủi ro pháp lý cần phòng tránh và các bước lập vi bằng an toàn khi giao dịch nhà đất giấy tờ tay.'
  },
  {
    id: 'a2',
    slug: 'huong-dan-kiem-tra-tinh-phap-ly-so-hong',
    title: 'Hướng dẫn kiểm tra tính pháp lý sổ hồng và quy hoạch',
    date: '12/05/2026',
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
    summary: 'Cách tra cứu thông tin quy hoạch tại văn phòng đăng ký đất đai và nhận biết sổ đỏ giả.'
  },
  {
    id: 'a3',
    slug: 'meo-vay-von-ngan-hang-mua-nha-lai-suat-thap',
    title: 'Mẹo vay vốn ngân hàng mua nhà với lãi suất ưu đãi nhất',
    date: '10/05/2026',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80',
    summary: 'So sánh các gói vay ân hạn nợ gốc và cách tính toán dòng tiền trả góp hàng tháng an toàn.'
  },
  {
    id: 'a4',
    slug: 'quy-trinh-sang-ten-so-do-nhanh-chong',
    title: 'Quy trình sang tên sổ đỏ và nộp thuế trước bạ 2026',
    date: '08/05/2026',
    img: 'https://images.unsplash.com/photo-1556742049-0a67c55c065f?w=600&q=80',
    summary: 'Các bước chuẩn bị hồ sơ công chứng và thủ tục nộp thuế thu nhập cá nhân đúng quy định.'
  },
  {
    id: 'a5',
    slug: '5-sai-lam-khi-thue-nha-nguyen-can',
    title: '5 sai lầm cần tránh khi thuê nhà nguyên căn lần đầu',
    date: '05/05/2026',
    img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80',
    summary: 'Kinh nghiệm kiểm tra hiện trạng bàn giao nội thất, đồng hồ điện nước và tiền cọc.'
  },
  {
    id: 'a6',
    slug: 'bi-quyet-dam-phan-gia-nha-tot-nhat',
    title: 'Bí quyết đàm phán giá nhà đất tiết kiệm hàng trăm triệu',
    date: '01/05/2026',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    summary: 'Nắm bắt tâm lý chủ nhà cần bán gấp để thương lượng mức giá chiết khấu tối ưu.'
  }
];

export const HomeoMultiThumbnailTemplate: React.FC<HomeoMultiThumbnailTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const resolveRoute = (raw: string) => {
    if (!raw || raw === 'home') return { page: 'home', item: null, article: null };
    const parts = raw.split('/');
    if (parts[0] === 'du-an' || parts[0] === 'project-detail') {
      const slug = parts.slice(1).join('/');
      const match = [...NEW_PROJECTS, ...SALE_HOUSES, ...RENTALS].find(i => i.slug === slug || i.id === slug) || NEW_PROJECTS[0];
      return { page: 'project-detail', item: match, article: null };
    }
    if (parts[0] === 'tin-tuc' || parts[0] === 'news-detail') {
      const slug = parts.slice(1).join('/');
      const match = SMART_BUYER_ARTICLES.find(i => i.slug === slug || i.id === slug) || SMART_BUYER_ARTICLES[0];
      return { page: 'news-detail', item: null, article: match };
    }
    return { page: parts[0], item: null, article: null };
  };

  const initialResolved = resolveRoute(initialPage);
  const [currentPage, setCurrentPage] = useState<string>(initialResolved.page);
  const [selectedItem, setSelectedItem] = useState<any | null>(initialResolved.item || NEW_PROJECTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialResolved.article || SMART_BUYER_ARTICLES[0]);
  const [activeThumbImg, setActiveThumbImg] = useState<string>('');
  const [searchKw, setSearchKw] = useState<string>('');

  useEffect(() => {
    if (initialPage) {
      const r = resolveRoute(initialPage);
      setCurrentPage(r.page);
      if (r.item) { setSelectedItem(r.item); setActiveThumbImg(r.item.mainImg); }
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

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setActiveThumbImg(item.mainImg);
    navigate('du-an', item.slug || item.id);
  };

  const handleSelectArticle = (art: any) => {
    setSelectedArticle(art);
    navigate('tin-tuc', art.slug || art.id);
  };

  const isProjectDetail = currentPage === 'project-detail' || currentPage === 'du-an' || currentPage.startsWith('du-an');
  const isNewsDetail = currentPage === 'news-detail' || currentPage === 'tin-tuc' || currentPage.startsWith('tin-tuc');
  const isHome = currentPage === 'home' || (!['projects', 'sale', 'rent', 'news', 'contact', 'about', 'gioi-thieu', 'project-detail', 'news-detail', 'du-an', 'tin-tuc'].includes(currentPage) && !isProjectDetail && !isNewsDetail);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER HOMEO — RỘNG RÃI, ĐẲNG CẤP, CHUẨN XÁC THEO ẢNH */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* LOGO */}
          <div 
            onClick={() => navigate('home')}
            className="cursor-pointer flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 rounded-sm bg-[#881337] text-white flex items-center justify-center font-black text-xl shadow-xs">
              🏠
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-serif">
              Homeo
            </span>
          </div>

          {/* MAIN NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold tracking-wide text-slate-700">
            <button 
              onClick={() => navigate('home')} 
              className={`transition-colors py-2 ${currentPage === 'home' ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => navigate('rent')} 
              className={`transition-colors py-2 ${currentPage === 'rent' ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Cho thuê
            </button>
            <button 
              onClick={() => navigate('projects')} 
              className={`transition-colors py-2 ${currentPage === 'projects' || isProjectDetail ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Dự án mới
            </button>
            <button 
              onClick={() => navigate('sale')} 
              className={`transition-colors py-2 ${currentPage === 'sale' ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Bán nhà
            </button>
            <button 
              onClick={() => navigate('news')} 
              className={`transition-colors py-2 ${currentPage === 'news' || isNewsDetail ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Tin tức
            </button>
            <button 
              onClick={() => navigate('contact')} 
              className={`transition-colors py-2 ${currentPage === 'contact' ? 'text-[#881337] border-b-2 border-[#881337]' : 'hover:text-[#881337]'}`}
            >
              Ký gửi
            </button>
          </nav>

          {/* CTA BUTTON */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('contact')} 
              className="bg-[#881337] hover:bg-rose-950 text-white font-extrabold text-xs sm:text-sm px-6 py-3 uppercase tracking-wider transition-all shadow-sm rounded-xs shrink-0"
            >
              KÝ GỬI NHÀ ĐẤT
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SPLIT SECTION — KHỚP 100% ẢNH CHỤP BDS-23 */}
      {isHome && (
        <section className="relative w-full h-[480px] sm:h-[560px] bg-slate-950 overflow-hidden flex items-center justify-end text-white">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90"
            alt="Homeo Luxury Villa"
            className="absolute inset-0 w-full h-full object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/40 to-slate-950/90" />
          
          {/* SEARCH BOX TRÊN PHẢI HERO */}
          <div className="relative z-10 w-full max-w-xl mr-4 sm:mr-16 p-6 sm:p-10 bg-slate-950/85 backdrop-blur-md border border-white/15 shadow-2xl space-y-5 rounded-xs">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Tìm kiếm ngôi nhà bạn yêu thích
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Tra cứu thông tin hàng ngàn căn hộ, biệt thự và nhà phố xác thực chính chủ trên toàn quốc
            </p>
            <div className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 shadow-xl">
              <input
                type="text"
                value={searchKw}
                onChange={(e) => setSearchKw(e.target.value)}
                placeholder="Nhập địa điểm, khu vực hoặc tên dự án..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none"
              />
              <button 
                onClick={() => {
                  const el = document.getElementById('projects-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#881337] hover:bg-rose-950 text-white px-8 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors shrink-0"
              >
                TÌM KIẾM
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. HOME VIEW — 3 CỘT (DỰ ÁN MỚI, BÁN NHÀ, CHO THUÊ, CẨM NANG) */}
      {isHome && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-16 space-y-20 flex-1">
          {/* DỰ ÁN MỚI */}
          <section id="projects-grid">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-wide">
                DỰ ÁN MỚI
              </h2>
              <div className="w-16 h-1 bg-[#881337] mx-auto mt-2.5 mb-2.5" />
              <p className="text-xs sm:text-sm text-slate-500">Tổng hợp những dự án tiêu biểu mở bán đợt 1</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {NEW_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleSelectItem(proj)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Main Big Image */}
                    <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                      <img src={proj.mainImg} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-[#881337] text-white text-xs font-black px-3 py-1 shadow-md">
                        {proj.tag}
                      </div>
                    </div>

                    {/* 3 Small Thumbnails */}
                    <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-100 border-b border-slate-200">
                      {proj.thumbs.map((th, i) => (
                        <div key={i} className="aspect-[16/10] overflow-hidden bg-slate-200">
                          <img src={th} alt="sub" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{proj.loc}</span>
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                        <span className="text-slate-600 font-medium">{proj.area}</span>
                        <strong className="text-sm font-black text-[#881337] font-mono">{proj.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BÁN NHÀ */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-wide">
                BÁN NHÀ
              </h2>
              <div className="w-16 h-1 bg-[#881337] mx-auto mt-2.5 mb-2.5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SALE_HOUSES.map((h) => (
                <div
                  key={h.id}
                  onClick={() => handleSelectItem(h)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                      <img src={h.mainImg} alt={h.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-[#881337] text-white text-xs font-black px-3 py-1 shadow-md">
                        {h.tag}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-100 border-b border-slate-200">
                      {h.thumbs.map((th, i) => (
                        <div key={i} className="aspect-[16/10] overflow-hidden bg-slate-200">
                          <img src={th} alt="sub" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1 leading-snug">
                        {h.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{h.loc}</span>
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                        <span className="text-slate-600 font-medium">{h.area}</span>
                        <strong className="text-sm font-black text-[#881337] font-mono">{h.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CHO THUÊ */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-wide">
                CHO THUÊ
              </h2>
              <div className="w-16 h-1 bg-[#881337] mx-auto mt-2.5 mb-2.5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RENTALS.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectItem(r)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                      <img src={r.mainImg} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-[#881337] text-white text-xs font-black px-3 py-1 shadow-md">
                        {r.tag}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-100 border-b border-slate-200">
                      {r.thumbs.map((th, i) => (
                        <div key={i} className="aspect-[16/10] overflow-hidden bg-slate-200">
                          <img src={th} alt="sub" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1 leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{r.loc}</span>
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                        <span className="text-slate-600 font-medium">{r.area}</span>
                        <strong className="text-sm font-black text-[#881337] font-mono">{r.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NGƯỜI MUA HÀNG THÔNG MINH */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-wide">
                Người mua hàng thông minh
              </h2>
              <div className="w-16 h-1 bg-[#881337] mx-auto mt-2.5 mb-2.5" />
              <p className="text-xs sm:text-sm text-slate-500">Cẩm nang và kinh nghiệm mua bán bất động sản an toàn</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {SMART_BUYER_ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-bold block mb-1.5">{art.date}</span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-2 leading-snug mb-2">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">{art.summary}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#881337] mt-4 inline-flex items-center gap-1.5">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* 4. DETAIL VIEW CHO BĐS */}
      {isProjectDetail && selectedItem && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#881337] flex items-center gap-1"><Home className="w-4 h-4" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('projects')} className="hover:text-[#881337]">Bất động sản</button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-md">{selectedItem.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => navigate('projects')} className="px-4 py-2 bg-white border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs">
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
            </button>
            <span className="text-xs sm:text-sm bg-rose-100 text-[#881337] font-black px-3 py-1.5">Mã tin: #{selectedItem.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-900 relative">
                  <img src={activeThumbImg || selectedItem.mainImg} alt={selectedItem.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-[#881337] text-white text-sm font-black px-4 py-1.5 shadow-md">
                    {selectedItem.price}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 bg-slate-100 border-t border-slate-200">
                  {[selectedItem.mainImg, ...(selectedItem.thumbs || [])].map((img, i) => (
                    <div key={i} onClick={() => setActiveThumbImg(img)} className={`aspect-[16/10] cursor-pointer overflow-hidden border-2 ${activeThumbImg === img ? 'border-[#881337] ring-2 ring-rose-300' : 'border-transparent'}`}>
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-8 space-y-4 shadow-xs">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{selectedItem.title}</h1>
                <p className="text-sm text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#881337]" /><span>{selectedItem.loc}</span></p>
                <div className="p-4 bg-slate-50 border border-slate-200 text-sm">
                  <span className="text-slate-500">Diện tích khuôn viên: </span>
                  <strong className="text-slate-900">{selectedItem.area}</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 p-6 shadow-xs sticky top-24 space-y-4">
                <strong className="block text-base font-black text-slate-900">Ban Quản Lý Sàn Homeo</strong>
                <p className="text-xs text-slate-500">Tư vấn chọn căn và xem nhà trực tiếp 24/7</p>
                <a href="tel:0919006030" className="w-full py-3.5 bg-[#881337] hover:bg-rose-950 text-white font-extrabold text-sm uppercase flex items-center justify-center gap-2 shadow-xs transition-colors">
                  <Phone className="w-4 h-4" /> Gọi 0919 006 030
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 5. SUBPAGES */}
      {currentPage === 'projects' && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">Danh Sách Dự Án BĐS Tiêu Biểu</h1>
            <button onClick={() => navigate('home')} className="text-sm font-bold text-[#881337] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEW_PROJECTS.map((p) => (
              <div key={p.id} onClick={() => handleSelectItem(p)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={p.mainImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /><span>{p.loc}</span></p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                      <span className="text-slate-500">{p.area}</span>
                      <strong className="text-sm font-black text-[#881337] font-mono">{p.price}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'sale' && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">Bán Nhà Phố & Căn Hộ Chính Chủ</h1>
            <button onClick={() => navigate('home')} className="text-sm font-bold text-[#881337] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SALE_HOUSES.map((h) => (
              <div key={h.id} onClick={() => handleSelectItem(h)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={h.mainImg} alt={h.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1">{h.title}</h3>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /><span>{h.loc}</span></p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                      <span className="text-slate-500">{h.area}</span>
                      <strong className="text-sm font-black text-[#881337] font-mono">{h.price}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'rent' && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">Cho Thuê Nhà Phố & Phòng Trọ</h1>
            <button onClick={() => navigate('home')} className="text-sm font-bold text-[#881337] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RENTALS.map((r) => (
              <div key={r.id} onClick={() => handleSelectItem(r)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={r.mainImg} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-1">{r.title}</h3>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /><span>{r.loc}</span></p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                      <span className="text-slate-500">{r.area}</span>
                      <strong className="text-sm font-black text-[#881337] font-mono">{r.price}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'news' && (
        <main className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">Cẩm Nang Người Mua Hàng Thông Minh</h1>
            <button onClick={() => navigate('home')} className="text-sm font-bold text-[#881337] hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {SMART_BUYER_ARTICLES.map((art) => (
              <div key={art.id} onClick={() => handleSelectArticle(art)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-slate-400 font-bold block mb-1.5">{art.date}</span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#881337] line-clamp-2 leading-snug mb-2">{art.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">{art.summary}</p>
                  </div>
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
        <main className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 space-y-8 flex-1 w-full">
          <div className="bg-white p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[#881337] uppercase tracking-widest block mb-1">VỀ CHÚNG TÔI</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">Nền Tảng Bất Động Sản Cao Cấp Homeo</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Homeo</strong> là thương hiệu bất động sản uy tín, chuyên cung cấp các giải pháp giao dịch nhà phố, biệt thự, căn hộ cao cấp và bất động sản cho thuê tại các đô thị trọng điểm.
                </p>
                <p>
                  Với tôn chỉ minh bạch, chuyên nghiệp và tận tâm, Homeo mang đến trải nghiệm tìm kiếm bất động sản khác biệt với hình ảnh đa góc chụp, pháp lý rõ ràng và dịch vụ tư vấn tận nơi.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded">
                    <strong className="text-lg font-black text-[#881337] block">15.000+</strong>
                    <span className="text-[10px] text-slate-500">Khách hàng tin tưởng</span>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded">
                    <strong className="text-lg font-black text-[#881337] block">98%</strong>
                    <span className="text-[10px] text-slate-500">Hài lòng dịch vụ</span>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded">
                    <strong className="text-lg font-black text-[#881337] block">TOP 10</strong>
                    <span className="text-[10px] text-slate-500">Sàn phân phối BĐS</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Homeo team" className="w-full h-56 object-cover border border-slate-200 shadow-sm" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button onClick={() => navigate('home')} className="text-xs font-bold text-[#881337] hover:underline">
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="max-w-[860px] mx-auto px-4 sm:px-8 py-10 space-y-6 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">Ký Gửi Mua Bán & Cho Thuê Nhà Đất</h1>
            <button onClick={() => navigate('home')} className="text-sm font-bold text-[#881337] hover:underline">← Về trang chủ</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Tiếp nhận thông tin ký gửi thành công!'); navigate('home'); }} className="bg-white p-8 sm:p-10 border border-slate-200 shadow-sm space-y-5 text-sm">
            <div>
              <label className="block font-bold mb-1.5 text-slate-800">Họ và tên (*)</label>
              <input type="text" placeholder="Họ và tên..." required className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#881337]" />
            </div>
            <div>
              <label className="block font-bold mb-1.5 text-slate-800">Số điện thoại (*)</label>
              <input type="tel" placeholder="0919 006 030..." required className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#881337]" />
            </div>
            <div>
              <label className="block font-bold mb-1.5 text-slate-800">Địa chỉ bất động sản</label>
              <input type="text" placeholder="Địa chỉ chi tiết..." required className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#881337]" />
            </div>
            <div>
              <label className="block font-bold mb-1.5 text-slate-800">Mức giá mong muốn</label>
              <input type="text" placeholder="Ví dụ: 3.5 Tỷ" required className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#881337]" />
            </div>
            <button type="submit" className="w-full py-4 bg-[#881337] hover:bg-rose-950 text-white font-black uppercase tracking-wider transition-colors shadow-md">
              GỬI YÊU CẦU KÝ GỬI
            </button>
          </form>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-[#111827] text-slate-400 text-xs mt-auto">
        <div className="border-b border-slate-800 py-4 px-4 sm:px-8">
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span>📞 Hotline: <strong className="text-white font-mono text-sm">0919 006 030</strong></span>
              <span>✉️ Email: <strong className="text-white">contact@homeo.vn</strong></span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Facebook</span> • <span>YouTube</span> • <span>TikTok</span> • <span>Zalo</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#881337] text-white flex items-center justify-center font-bold text-xs">H</div>
              <strong className="text-white text-lg font-black font-serif">Homeo</strong>
            </div>
            <p className="leading-relaxed text-xs text-slate-400">
              Kênh thông tin và giao dịch bất động sản trực tuyến uy tín hàng đầu Việt Nam.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">PHƯƠNG CHÂM HOẠT ĐỘNG</h4>
            <ul className="space-y-2 text-xs">
              <li>• Minh bạch pháp lý 100%</li>
              <li>• Giá gốc trực tiếp chủ đầu tư</li>
              <li>• Hỗ trợ thủ tục trọn gói</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">HỖ TRỢ</h4>
            <ul className="space-y-2 text-xs">
              <li>• Hướng dẫn đăng tin</li>
              <li>• Bảng giá dịch vụ</li>
              <li>• Quy định đăng tin</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">QUY ĐỊNH</h4>
            <ul className="space-y-2 text-xs">
              <li>• Điều khoản sử dụng</li>
              <li>• Chính sách bảo mật</li>
              <li>• Giải quyết tranh chấp</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-4 text-center text-slate-500 text-xs">
          Copyright 2026 © Homeo. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeoMultiThumbnailTemplate;
