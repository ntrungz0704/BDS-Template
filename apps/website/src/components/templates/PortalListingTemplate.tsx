import React, { useState, useMemo, useEffect } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import {
  Search, MapPin, Building, ChevronRight, ChevronLeft, Menu, X,
  Phone, Mail, ArrowRight, Star, TrendingUp, Shield, Clock, Home,
  CheckCircle2, Filter, PlayCircle, Maximize2, Download, Globe,
  Briefcase, Users, Leaf, ArrowUpRight, BarChart2, Calendar,
  FileText, ChevronDown, Check, Eye, Heart, Share2, Calculator,
  Compass, Award, Bed, Bath, Move, Tag, Sparkles, Send, DollarSign
} from 'lucide-react';

interface TemplateProps {
  template?: { name?: string; slug?: string; collectionSlug?: string; sectionConfig?: Record<string, any> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

// ── Mock Data for BĐS Cho Bán (8 items) ──
const SALE_PROPERTIES = [
  {
    id: 's-1',
    title: 'Chung cư Vinhomes Ocean Park 2PN',
    location: 'Đa Tốn, Gia Lâm, Hà Nội',
    city: 'Hà Nội',
    type: 'Chung cư',
    price: 3500000000,
    priceDisplay: '3.500.000.000 Đồng',
    beds: 2,
    baths: 2,
    area: 75,
    tag: 'HOT',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Căn hộ view biển hồ nước mặn, đầy đủ nội thất cao cấp nhập khẩu, pháp lý sổ hồng lâu dài.'
  },
  {
    id: 's-2',
    title: 'Khu biệt thự Vinhomes Riverside Đơn Lập',
    location: 'Phúc Lợi, Long Biên, Hà Nội',
    city: 'Hà Nội',
    type: 'Biệt thự',
    price: 18500000000,
    priceDisplay: '18.500.000.000 Đồng',
    beds: 5,
    baths: 5,
    area: 320,
    tag: 'SỔ ĐỎ',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Biệt thự đơn lập ven sông phong cách Venice Ý, sân vườn rộng thoáng, an ninh compound 24/7.'
  },
  {
    id: 's-3',
    title: 'Chung cư Masteri Centre Point Q.9',
    location: 'Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM',
    city: 'TP.HCM',
    type: 'Chung cư',
    price: 4200000000,
    priceDisplay: '4.200.000.000 Đồng',
    beds: 2,
    baths: 2,
    area: 72,
    tag: 'GIÁ TỐT',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Căn hộ cao cấp chuẩn quốc tế, hồ bơi phi thuyền, tiện ích resort 5 sao ngay cửa nhà.'
  },
  {
    id: 's-4',
    title: 'Dinh thự sinh thái EcoPark Grand Island',
    location: 'Văn Giang, Hưng Yên (Cận Hà Nội)',
    city: 'Hưng Yên',
    type: 'Biệt thự',
    price: 25000000000,
    priceDisplay: '25.000.000.000 Đồng',
    beds: 4,
    baths: 5,
    area: 450,
    tag: 'VIP',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    description: 'Không gian sống xanh chuẩn resort, 100% biệt thự vươn mình ra mặt nước xanh ngọc bích.'
  },
  {
    id: 's-5',
    title: 'Nhà phố thương mại Shophouse Ba Đình',
    location: 'Kim Mã, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    type: 'Nhà phố',
    price: 12800000000,
    priceDisplay: '12.800.000.000 Đồng',
    beds: 4,
    baths: 4,
    area: 110,
    tag: 'MẶT TIỀN',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Mặt tiền 6m đường 2 chiều, đang cho thuê kinh doanh 45 triệu/tháng, sổ đỏ chính chủ giao ngay.'
  },
  {
    id: 's-6',
    title: 'Căn hộ cao cấp The Landmark 81 Penthouse',
    location: 'Bình Thạnh, TP. Hồ Chí Minh',
    city: 'TP.HCM',
    type: 'Chung cư',
    price: 14500000000,
    priceDisplay: '14.500.000.000 Đồng',
    beds: 3,
    baths: 3,
    area: 160,
    tag: 'SIÊU SANG',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    description: 'Tầm nhìn 360 độ ngắm trọn sông Sài Gòn và trung tâm Quận 1, thang máy riêng biệt lập.'
  },
  {
    id: 's-7',
    title: 'Đất nền phân lô quy hoạch 1/500 Sân Bay',
    location: 'Long Thành, Đồng Nai',
    city: 'Đồng Nai',
    type: 'Đất nền',
    price: 2650000000,
    priceDisplay: '2.650.000.000 Đồng',
    beds: 0,
    baths: 0,
    area: 125,
    tag: 'ĐẦU TƯ',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Cách cổng sân bay Long Thành 3km, hạ tầng đường nhựa 16m điện âm, sổ hồng thổ cư 100%.'
  },
  {
    id: 's-8',
    title: 'Tòa nhà văn phòng mặt phố Cầu Giấy',
    location: 'Duy Tân, Cầu Giấy, Hà Nội',
    city: 'Hà Nội',
    type: 'Văn phòng',
    price: 32000000000,
    priceDisplay: '32.000.000.000 Đồng',
    beds: 6,
    baths: 6,
    area: 180,
    tag: 'DÒNG TIỀN',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'Tòa nhà 8 tầng thang máy, dòng tiền khai thác cho thuê 120 triệu/tháng, PCCC chuẩn thẩm duyệt.'
  },
];

// ── Mock Data for BĐS Cho Thuê (8 horizontal items) ──
const RENT_PROPERTIES = [
  {
    id: 'r-1',
    title: 'Cho thuê Căn hộ The Sun Avenue 2PN',
    location: 'Mai Chí Thọ, TP. Thủ Đức, TP.HCM',
    city: 'TP.HCM',
    price: 15000000,
    priceDisplay: '15.000.000 Đồng/tháng',
    beds: 2,
    baths: 2,
    area: 75,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    description: 'Full nội thất hiện đại, view thoáng mát, miễn phí gym và hồ bơi vô cực.'
  },
  {
    id: 'r-2',
    title: 'Cho thuê Shophouse chân đế Vinhomes Smart City',
    location: 'Tây Mỗ, Nam Từ Liêm, Hà Nội',
    city: 'Hà Nội',
    price: 35000000,
    priceDisplay: '35.000.000 Đồng/tháng',
    beds: 1,
    baths: 1,
    area: 85,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'Vị trí ngã tư sầm uất, phù hợp kinh doanh F&B, nhà thuốc, siêu thị mini.'
  },
  {
    id: 'r-3',
    title: 'Cho thuê Biệt thự sân vườn Thảo Điền Q.2',
    location: 'Thảo Điền, Quận 2, TP.HCM',
    city: 'TP.HCM',
    price: 65000000,
    priceDisplay: '65.000.000 Đồng/tháng',
    beds: 4,
    baths: 4,
    area: 300,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
    description: 'Có hồ bơi riêng, sân vườn nhiều cây xanh, khu người nước ngoài sinh sống văn minh.'
  },
  {
    id: 'r-4',
    title: 'Cho thuê Căn hộ Duplex Vinhomes Metropolis Liễu Giai',
    location: 'Liễu Giai, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    price: 45000000,
    priceDisplay: '45.000.000 Đồng/tháng',
    beds: 3,
    baths: 3,
    area: 140,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'Tầng cao ngắm trọn Hồ Tây, nội thất nhập khẩu Ý, bảo vệ 24/7.'
  },
  {
    id: 'r-5',
    title: 'Cho thuê Nhà phố nguyên căn đường Nguyễn Trãi',
    location: 'Nguyễn Trãi, Thanh Xuân, Hà Nội',
    city: 'Hà Nội',
    price: 28000000,
    priceDisplay: '28.000.000 Đồng/tháng',
    beds: 4,
    baths: 3,
    area: 65,
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80',
    description: 'Nhà 4 tầng mới xây, mặt tiền ô tô đỗ cửa, tiện làm văn phòng công ty kết hợp ở.'
  },
  {
    id: 'r-6',
    title: 'Cho thuê Studio hiện đại gần Phố Đi Bộ',
    location: 'Bến Nghé, Quận 1, TP.HCM',
    city: 'TP.HCM',
    price: 12000000,
    priceDisplay: '12.000.000 Đồng/tháng',
    beds: 1,
    baths: 1,
    area: 38,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    description: 'Thiết kế trẻ trung, đầy đủ bếp nấu, máy giặt, ban công ngắm phố sầm uất.'
  },
  {
    id: 'r-7',
    title: 'Cho thuê Sàn văn phòng chuyên nghiệp Hạng B',
    location: 'Tô Hiệu, Cầu Giấy, Hà Nội',
    city: 'Hà Nội',
    price: 55000000,
    priceDisplay: '55.000.000 Đồng/tháng',
    beds: 0,
    baths: 2,
    area: 210,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    description: 'Đã ngăn vách kính, điều hòa trung tâm Daikin, bàn giao sàn thảm hoàn thiện.'
  },
  {
    id: 'r-8',
    title: 'Cho thuê Căn hộ biển Peninsula Đà Nẵng',
    location: 'Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
    city: 'Đà Nẵng',
    price: 18000000,
    priceDisplay: '18.000.000 Đồng/tháng',
    beds: 2,
    baths: 2,
    area: 80,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Bước 50m ra bãi tắm Mỹ Khê, ban công kính view trực diện đại dương.'
  },
];

// ── Top Cities Cards ──
const TOP_CITIES = [
  { name: 'HÀ NỘI', count: 125, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80' },
  { name: 'ĐÀ NẴNG', count: 95, image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80' },
  { name: 'TP. HỒ CHÍ MINH', count: 210, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80' },
  { name: 'NGHỆ AN', count: 45, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80' },
  { name: 'HẢI PHÒNG', count: 78, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
  { name: 'NHA TRANG', count: 62, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80' },
];

// ── News Mock ──
const NEWS_LIST = [
  {
    id: 1,
    title: 'Xu hướng dòng tiền dịch chuyển mạnh sang BĐS thực tế & pháp lý minh bạch cuối 2026',
    date: '28/08/2026',
    tag: 'Thị trường',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    summary: 'Thị trường ghi nhận sức cầu ấn tượng tại các dự án có sổ hồng trao tay và hạ tầng kết nối đồng bộ giữa các vùng kinh tế trọng điểm.'
  },
  {
    id: 2,
    title: 'Khởi công tuyến đường sắt đô thị kết nối sân bay quốc tế và trung tâm',
    date: '26/08/2026',
    tag: 'Quy hoạch',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Bí quyết đầu tư shophouse khối đế đạt tỷ suất sinh lời vượt 12%/năm',
    date: '25/08/2026',
    tag: 'Kinh nghiệm',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Ngân hàng công bố gói tín dụng ưu đãi lãi suất cố định 5.5% cho người mua nhà lần đầu',
    date: '22/08/2026',
    tag: 'Tài chính',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80'
  },
];

export default function PortalListingTemplate({ template, viewport = 'desktop', initialPage = 'home', company }: TemplateProps) {
  const [currentPage, setCurrentPage] = useState<string>(initialPage || 'home');
  const isHome = useMemo(() => {
    return currentPage === 'home' || !['sale', 'rent', 'projects', 'du-an', 'detail', 'chi-tiet', 'news', 'tin-tuc', 'about', 'gioi-thieu', 'contact', 'lien-he'].includes(currentPage);
  }, [currentPage]);
  const [selectedProperty, setSelectedProperty] = useState<any>(SALE_PROPERTIES[0]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [leadModalProject, setLeadModalProject] = useState<any>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  
  const navigateTo = (page: string, customSlug?: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    syncDemoUrl(customSlug || page, 'bds-17');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts[2] : (parts[1] !== 'bds-17' ? parts[1] : 'home');
      if (sub) {
        setCurrentPage(sub);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Spotlight project carousel index
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const SPOTLIGHT_PROJECTS = [
    {
      title: 'Chung cư Vinhomes Green Bay Mễ Trì',
      location: 'Mễ Trì, Nam Từ Liêm, Hà Nội',
      specs: '3 Tòa tháp cao 38 tầng · 1.500 Căn hộ · Bàn giao Q4/2026',
      price: '3.200.000.000 Đồng',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      tag: 'DỰ ÁN TIÊU BIỂU',
      highlights: ['Vịnh biển sinh thái 8ha trong lòng phố', 'Trường liên cấp Vinschool chuẩn quốc tế', 'Trung tâm thương mại Vincom Mega Mall', 'Hệ thống an ninh 5 lớp trí tuệ nhân tạo']
    },
    {
      title: 'Đại đô thị Vinhomes Grand Park Sài Gòn',
      location: 'Nguyễn Xiển, Long Thạnh Mỹ, TP. Thủ Đức',
      specs: 'Đại đô thị thông minh 271ha · 44.000 Căn hộ & Biệt thự',
      price: '2.800.000.000 Đồng',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      tag: 'ĐẠI ĐÔ THỊ THÔNG MINH',
      highlights: ['Đại công viên 36ha quy mô hàng đầu Đông Nam Á', 'Bến thuyền cao cấp The Manhattan Glory', 'Bệnh viện đa khoa quốc tế Vinmec', 'Tuyến xe buýt điện thông minh VinBus kết nối toàn thành phố']
    },
  ];

  // Bank Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(2500000000);
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);

  const monthlyPayment = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfMonths = loanTermYears * 12;
    if (monthlyRate === 0) return Math.round(loanAmount / numberOfMonths);
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    return Math.round(payment);
  }, [loanAmount, loanTermYears, interestRate]);

  const handleOpenDetail = (prop: any) => {
    setSelectedProperty(prop);
    navigateTo('detail', prop.id);
  };

  const navItems = [
    { id: 'home', slug: '', label: 'Trang chủ' },
    { id: 'sale', slug: 'nha-dat-ban', label: 'Nhà đất bán' },
    { id: 'rent', slug: 'cho-thue', label: 'Cho thuê' },
    { id: 'projects', slug: 'du-an', label: 'Dự án' },
    { id: 'news', slug: 'tin-tuc', label: 'Tin tức' },
    { id: 'about', slug: 'gioi-thieu', label: 'Giới thiệu' },
    { id: 'contact', slug: 'lien-he', label: 'Liên hệ & Ký gửi' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* ════════════════════════ TOPBAR ════════════════════════ */}
      <div className="w-full bg-[#0F172A] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-[1360px] mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Compass className="w-3.5 h-3.5 text-blue-400" /> Cổng Thông Tin Bất Động Sản Số 1 Việt Nam
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="tel:0919006030" className="hidden sm:flex items-center gap-1 hover:text-amber-400 font-bold font-mono text-slate-200">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Hotline: 0919 006 030
            </a>
          </div>
          <div className="flex items-center gap-3 font-semibold">
            <button onClick={() => navigateTo('contact', 'lien-he')} className="hover:text-blue-400 transition-colors">
              Đăng tin BĐS
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('contact', 'lien-he')} className="hover:text-blue-400 transition-colors">
              Đăng nhập / Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════ MAIN NAVBAR ════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home', '')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                BDS<span className="text-blue-600">PORTAL</span>
              </span>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider -mt-1">Kênh BĐS Toàn Quốc</p>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm text-slate-700">
            {navItems.map((item) => {
              const active = currentPage === item.id || (item.id === 'sale' && currentPage === 'sale');
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id, item.slug)}
                  className={`px-3.5 py-2 rounded-sm text-xs xl:text-sm font-bold transition-all ${
                    active
                      ? 'text-blue-600 bg-blue-50/80 shadow-xs'
                      : 'hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigateTo('contact', 'lien-he')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-102"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ký gửi BĐS</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id, item.slug)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => navigateTo('contact', 'lien-he')}
                className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-sm text-center text-xs"
              >
                Đăng tin ký gửi nhà đất
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ════════════════════════ BODY CONTENT ════════════════════════ */}
      <main className="flex-1">
        {/* ─────────────────────────────────────────────────────────────
            PAGE 1: TRANG CHỦ (HOME PAGE EXACTLY LIKE THE SCREENSHOT)
        ───────────────────────────────────────────────────────────── */}
        {isHome && (
          <div>
            {/* 1. HERO SECTION WITH BLUE GRADIENT & SEARCH FILTER */}
            <section className="relative bg-gradient-to-r from-[#0F284E] via-[#0F3875] to-[#1E40AF] text-white py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
              {/* Background decorative skyline overlay */}
              <div 
                className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity pointer-events-none"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent pointer-events-none" />

              <div className="relative max-w-[1100px] mx-auto text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-sm bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-extrabold uppercase tracking-widest mb-4 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Nền tảng giao dịch BĐS hàng đầu
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase text-white mb-8 drop-shadow-md">
                  TRANG TIN BẤT ĐỘNG SẢN SỐ <span className="text-amber-400">1</span> VIỆT NAM
                </h1>

                {/* Search Bar Container */}
                <div className="bg-white/95 backdrop-blur-md rounded-sm p-3 sm:p-4 shadow-2xl border border-white/40 max-w-4xl mx-auto text-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                    {/* Keyword Input */}
                    <div className="sm:col-span-6 relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Nhập từ khóa, dự án, khu vực cần tìm..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full bg-slate-100 border border-slate-200 rounded-sm pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                      />
                    </div>

                    {/* Category Select */}
                    <div className="sm:col-span-3">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full bg-slate-100 border border-slate-200 rounded-sm px-3.5 py-3 text-xs sm:text-sm text-slate-700 font-bold focus:outline-none focus:border-blue-500"
                      >
                        <option value="all">Loại hình BĐS (Tất cả)</option>
                        <option value="Chung cư">Chung cư cao cấp</option>
                        <option value="Biệt thự">Biệt thự & Villa</option>
                        <option value="Nhà phố">Nhà phố thương mại</option>
                        <option value="Đất nền">Đất nền dự án</option>
                        <option value="Văn phòng">Văn phòng / Shophouse</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-3">
                      <button
                        onClick={() => {
                          setCurrentPage('sale');
                          if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-5 rounded-sm text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        <span>Tìm kiếm</span>
                      </button>
                    </div>
                  </div>

                  {/* Category Icon Row (5 Quick Filter Buttons) */}
                  <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-slate-700">
                    {[
                      { label: 'Nhà phố', icon: '🏠', type: 'Nhà phố' },
                      { label: 'Biệt thự', icon: '🏡', type: 'Biệt thự' },
                      { label: 'Chung cư', icon: '🏙️', type: 'Chung cư' },
                      { label: 'Đất nền', icon: '🌄', type: 'Đất nền' },
                      { label: 'Văn phòng', icon: '🏢', type: 'Văn phòng' },
                    ].map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => {
                          setSelectedType(cat.type);
                          navigateTo('sale', 'nha-dat-ban');
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-sm hover:bg-blue-50 hover:text-blue-600 transition-all group"
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. SECTION 1: BẤT ĐỘNG SẢN CHO BÁN (8 CARDS GRID) */}
            <section className="py-12 sm:py-16 max-w-[1360px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-extrabold uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4 animate-spin-slow" />
                  <span>Sản phẩm giao dịch độc quyền</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Bất Động Sản <span className="text-blue-600">Cho Bán</span>
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-sm mt-2" />
              </div>

              {/* 4x2 Grid of Property Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SALE_PROPERTIES.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => handleOpenDetail(prop)}
                    className="group bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider bg-red-600 text-white shadow-md">
                          {prop.tag}
                        </span>
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                          {prop.type}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                          {prop.title}
                        </h3>
                        <p className="flex items-center gap-1 text-[11px] text-slate-500 truncate mb-3">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{prop.location}</span>
                        </p>

                        {/* Specs row */}
                        <div className="flex items-center justify-between text-[11px] text-slate-600 py-2 border-y border-slate-100 bg-slate-50/50 px-2 rounded-lg mb-3">
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-slate-400" /> {prop.beds > 0 ? `${prop.beds} PN` : 'Thổ cư'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5 text-slate-400" /> {prop.baths > 0 ? `${prop.baths} WC` : 'Sổ đỏ'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Move className="w-3.5 h-3.5 text-slate-400" /> {prop.area} m²
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Giá bán</span>
                        <span className="text-xs sm:text-sm font-black text-blue-600 font-mono">{prop.priceDisplay}</span>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all text-xs font-bold flex items-center gap-1">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => navigateTo('sale', 'nha-dat-ban')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-white border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 text-xs font-bold shadow-xs hover:shadow-md transition-all"
                >
                  <span>Xem tất cả bất động sản cho bán</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* 3. SECTION 2: DỰ ÁN NỔI BẬT (SPOTLIGHT CAROUSEL & SPLIT CARD) */}
            <section className="py-12 bg-gradient-to-b from-slate-100 to-slate-50 border-y border-slate-200">
              <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">Tâm điểm đầu tư 2026</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dự Án Nổi BẬt</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSpotlightIdx((prev) => (prev === 0 ? SPOTLIGHT_PROJECTS.length - 1 : prev - 1))}
                      className="w-9 h-9 rounded-sm bg-white border border-slate-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSpotlightIdx((prev) => (prev === SPOTLIGHT_PROJECTS.length - 1 ? 0 : prev + 1))}
                      className="w-9 h-9 rounded-sm bg-white border border-slate-300 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spotlight Banner Card */}
                {(() => {
                  const proj = SPOTLIGHT_PROJECTS[spotlightIdx];
                  return (
                    <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      {/* Left: Wide Image */}
                      <div className="lg:col-span-6 relative h-[320px] sm:h-[380px] lg:h-[400px] bg-slate-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                          {proj.tag}
                        </div>
                      </div>

                      {/* Right: Project Details Box */}
                      <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{proj.location}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2.5 leading-snug">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium mb-3.5 bg-slate-50 p-2.5 rounded-sm border border-slate-100">
                            {proj.specs}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {proj.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-semibold bg-slate-50/70 px-2.5 py-1.5 rounded-lg border border-slate-100">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{h}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium mb-2">
                            <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-bold">✓ Sổ hồng lâu dài</span>
                            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">✓ Hỗ trợ vay 70%</span>
                            <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 font-bold">✓ Bàn giao Q4/2026</span>
                          </div>
                        </div>

                        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">Giá từ</span>
                            <span className="text-xl font-black text-blue-600 font-mono">{proj.price}</span>
                          </div>
                          <button
                            onClick={() => navigateTo('projects', 'du-an')}
                            className="px-6 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 shrink-0"
                          >
                            <span>Xem ngay</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* 4. SECTION 3: BẤT ĐỘNG SẢN CHO THUÊ (8 HORIZONTAL CARDS, 2 COLUMNS) */}
            <section className="py-12 sm:py-16 max-w-[1360px] mx-auto px-4 sm:px-8">
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-extrabold uppercase tracking-wider mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Dòng tiền sinh lời đều đặn</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Bất Động Sản <span className="text-blue-600">Cho Thuê</span>
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-sm mt-2" />
              </div>

              {/* 2-Column Grid of Horizontal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {RENT_PROPERTIES.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => handleOpenDetail(prop)}
                    className="group bg-white rounded-sm border border-slate-200 p-3 sm:p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-4"
                  >
                    {/* Left Thumbnail */}
                    <div className="relative w-full sm:w-44 h-40 rounded-sm overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                        CHO THUÊ
                      </span>
                    </div>

                    {/* Right Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                          {prop.title}
                        </h3>
                        <p className="flex items-center gap-1 text-[11px] text-slate-500 truncate mb-2">
                          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{prop.location}</span>
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-600 mb-2">
                          <span>🛏️ {prop.beds > 0 ? `${prop.beds} PN` : 'Văn phòng'}</span>
                          <span>🚿 {prop.baths > 0 ? `${prop.baths} WC` : '2 WC'}</span>
                          <span>📐 {prop.area} m²</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-black text-blue-600 font-mono">{prop.priceDisplay}</span>
                        <button className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                          <span>Xem ngay</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => navigateTo('rent', 'cho-thue')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-white border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 text-xs font-bold shadow-xs hover:shadow-md transition-all"
                >
                  <span>Xem tất cả bất động sản cho thuê</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* 5. SECTION 4: CÁC DỰ ÁN TẠI CÁC THÀNH PHỐ LỚN (CITY CARDS) */}
            <section className="py-12 sm:py-16 bg-slate-900 text-white">
              <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
                <div className="flex flex-col items-center justify-center text-center mb-10">
                  <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">Phân bổ vùng kinh tế trọng điểm</span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                    Các Dự Án Tại <span className="text-blue-400">Các Thành Phố Lớn</span>
                  </h2>
                  <div className="w-16 h-1 bg-amber-400 rounded-sm mt-2" />
                </div>

                {/* 6 City Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TOP_CITIES.map((city, idx) => (
                    <div
                      key={city.name}
                      onClick={() => {
                        setSelectedCity(city.name);
                        navigateTo('sale', 'nha-dat-ban');
                      }}
                      className="group relative h-48 sm:h-56 rounded-sm overflow-hidden border border-white/10 shadow-lg cursor-pointer"
                    >
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider mb-1 inline-block">
                            {city.count}+ Dự Án
                          </span>
                          <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-wide">
                            {city.name}
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-sm bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. SECTION 5: TIN TỨC & BANNER ƯU ĐÃI (3-COLUMN LAYOUT) */}
            <section className="py-12 sm:py-16 max-w-[1360px] mx-auto px-4 sm:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">Thông tin & Phân tích chuyên sâu</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Tin Tức Thị Trường</h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(NEWS_LIST[0])}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Xem thêm tin tức</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Column 1: Featured Big News */}
                <div 
                  onClick={() => navigateTo('news', 'tin-tuc')}
                  className="lg:col-span-6 bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={NEWS_LIST[0].image}
                      alt={NEWS_LIST[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {NEWS_LIST[0].tag}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-2">
                        <span>{NEWS_LIST[0].date}</span>
                        <span>•</span>
                        <span className="text-blue-600 font-semibold">Thị trường BĐS 2026</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                        {NEWS_LIST[0].title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {NEWS_LIST[0].summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Đọc toàn bộ bài viết</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Column 2: 3 Balanced News Cards (Height matching left card) */}
                <div className="lg:col-span-6 grid grid-rows-3 gap-4">
                  {NEWS_LIST.slice(1).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedArticle(item)}
                      className="bg-white rounded-sm border border-slate-200 p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-32 sm:w-36 h-24 rounded-sm object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1">
                            <span className="text-blue-600 font-black">{item.date}</span>
                            <span>•</span>
                            <span className="text-slate-500 font-medium">{item.tag}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1 mt-1 group-hover:underline">
                          Chi tiết <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. SECTION 6: NEWSLETTER SUBSCRIPTION STRIP */}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-10 px-4 sm:px-8">
              <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-1">Đăng Ký Nhận Bảng Giá & Dự Án Mới Nhất</h3>
                  <p className="text-xs text-blue-200">Nhận phân tích thị trường BĐS và cơ hội đầu tư sinh lời hàng tuần qua email.</p>
                </div>
                <div className="flex w-full md:w-auto max-w-md gap-2">
                  <input
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn..."
                    className="bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs px-4 py-2.5 rounded-sm focus:outline-none focus:bg-white focus:text-slate-900 flex-1"
                  />
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-sm shrink-0 transition-colors shadow-md">
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 2: NHÀ ĐẤT BÁN (SALE LISTING PAGE)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'sale' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Nhà Đất Bán Toàn Quốc</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Khám phá hàng ngàn bất động sản sổ đỏ chính chủ, căn hộ, biệt thự và đất nền sinh lời cao.</p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-sm p-4 border border-slate-200 mb-8 shadow-xs flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Lọc theo tên, quận huyện, dự án..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2 text-xs text-slate-900 font-medium"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs font-bold text-slate-700"
              >
                <option value="all">Tất cả loại hình</option>
                <option value="Chung cư">Chung cư</option>
                <option value="Biệt thự">Biệt thự</option>
                <option value="Nhà phố">Nhà phố</option>
                <option value="Đất nền">Đất nền</option>
                <option value="Văn phòng">Văn phòng</option>
              </select>
            </div>

            {/* Grid of Sales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SALE_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => handleOpenDetail(prop)}
                  className="group bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded bg-red-600 text-white uppercase">{prop.tag}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">{prop.title}</h3>
                      <p className="flex items-center gap-1 text-[11px] text-slate-500 truncate mb-3"><MapPin className="w-3.5 h-3.5 text-blue-600" />{prop.location}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-600 py-1.5 bg-slate-50 px-2 rounded-lg mb-3">
                        <span>🛏️ {prop.beds} PN</span>
                        <span>🚿 {prop.baths} WC</span>
                        <span>📐 {prop.area} m²</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-black text-blue-600 font-mono">{prop.priceDisplay}</span>
                    <button className="text-xs font-bold text-blue-600">Chi tiết →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 3: NHÀ ĐẤT CHO THUÊ (RENT LISTING PAGE)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'rent' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Nhà Đất Cho Thuê Giá Tốt</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Tổng hợp căn hộ chung cư, shophouse mặt bằng kinh doanh, biệt thự cho thuê dài hạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {RENT_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => handleOpenDetail(prop)}
                  className="group bg-white rounded-sm border border-slate-200 p-4 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row gap-4"
                >
                  <div className="relative w-full sm:w-44 h-40 rounded-sm overflow-hidden bg-slate-100 shrink-0">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">CHO THUÊ</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{prop.title}</h3>
                      <p className="flex items-center gap-1 text-[11px] text-slate-500 truncate mb-2"><MapPin className="w-3.5 h-3.5 text-blue-600" />{prop.location}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{prop.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-black text-blue-600 font-mono">{prop.priceDisplay}</span>
                      <button className="text-xs font-bold text-slate-700 group-hover:text-blue-600">Xem ngay →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 4: DỰ ÁN BĐS (PROJECTS SHOWCASE)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'projects' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Dự Án Bất Động Sản Trọng Điểm</h1>
              <p className="text-xs sm:text-sm text-slate-500">Cổng thông tin các đại dự án, quy hoạch 1/500, tiến độ thi công và chính sách chiết khấu trực tiếp từ chủ đầu tư.</p>
            </div>

            <div className="space-y-8">
              {SPOTLIGHT_PROJECTS.map((proj, idx) => (
                <div key={idx} className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-6 relative bg-slate-900 overflow-hidden group min-h-[260px] max-h-[360px]">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      {proj.tag}
                    </span>
                  </div>
                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{proj.location}</span>
                      <h2 className="text-xl font-black text-slate-900 mt-1 mb-2">{proj.title}</h2>
                      <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-sm border border-slate-100 font-medium">{proj.specs}</p>
                      <div className="space-y-2 mb-6">
                        {proj.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-black text-blue-600 font-mono">{proj.price}</span>
                      <button onClick={() => setLeadModalProject(proj)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-105">
                        Đăng ký nhận bảng giá F1
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 5: CHI TIẾT TIN BĐS (PROPERTY DETAIL WITH LOAN CALCULATOR)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'detail' && selectedProperty && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
            <button
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 mb-6"
            >
              <ChevronLeft className="w-4 h-4" /> Quay lại danh sách
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Gallery & Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs">
                  <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-slate-900 mb-4">
                    <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-md">
                      {selectedProperty.tag || 'BÁN GẤP'}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">{selectedProperty.title}</h1>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-4">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{selectedProperty.location}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-sm border border-slate-100 text-center mb-6">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Phòng ngủ</span>
                      <span className="text-sm font-black text-slate-800">{selectedProperty.beds || 2} PN</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Phòng tắm</span>
                      <span className="text-sm font-black text-slate-800">{selectedProperty.baths || 2} WC</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Diện tích</span>
                      <span className="text-sm font-black text-slate-800">{selectedProperty.area || 75} m²</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    <h3 className="text-sm font-bold text-slate-900">Mô tả chi tiết bất động sản</h3>
                    <p>{selectedProperty.description || 'Bất động sản vị trí đắc địa, giao thông kết nối hoàn hảo, pháp lý minh bạch sẵn sàng sang tên ngay trong ngày.'}</p>
                    <p>Tiện ích nội khu đẳng cấp: Công viên cây xanh, hồ bơi tràn bờ, phòng gym tiêu chuẩn quốc tế, hầm để xe thông minh và bảo vệ 24/7.</p>
                  </div>

                  {/* Property Map */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>Vị trí trên bản đồ Google Maps</span>
                      </h4>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProperty.location + ', Việt Nam')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span>Mở bản đồ lớn</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="w-full h-64 rounded-sm overflow-hidden border border-slate-200 shadow-inner">
                      <iframe
                        title={`Bản đồ ${selectedProperty.title}`}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedProperty.location + ', Việt Nam')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Loan Calculator Widget */}
                <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-black text-slate-900">Công Cụ Tính Lãi Vay Mua Nhà Ngân Hàng</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Số tiền vay (VNĐ)</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        step="100000000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs font-bold text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Thời gian vay (Năm)</label>
                      <select
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs font-bold text-slate-900"
                      >
                        <option value={5}>5 Năm (60 tháng)</option>
                        <option value={10}>10 Năm (120 tháng)</option>
                        <option value={15}>15 Năm (180 tháng)</option>
                        <option value={20}>20 Năm (240 tháng)</option>
                        <option value={25}>25 Năm (300 tháng)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Lãi suất (%/năm)</label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        step="0.1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs font-bold text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-sm p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-blue-700 font-bold block">Ước tính số tiền cần trả hàng tháng:</span>
                      <span className="text-xl font-black text-blue-600 font-mono">
                        {monthlyPayment.toLocaleString('vi-VN')} VNĐ / tháng
                      </span>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold"
                    >
                      Tư vấn gói vay 0%
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Contact & Booking */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-md border border-slate-200 p-6 shadow-md sticky top-24">
                  <div className="mb-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Giá niêm yết</span>
                    <span className="text-2xl font-black text-blue-600 font-mono">{selectedProperty.priceDisplay}</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-sm border border-slate-100 mb-6">
                    <div className="w-12 h-12 rounded-sm bg-blue-600 text-white font-black flex items-center justify-center text-sm shrink-0">
                      VIP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Phòng Kinh Doanh BĐS</h4>
                      <p className="text-[10px] text-slate-500">Hỗ trợ thủ tục pháp lý trọn gói</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <a
                      href="tel:0919006030"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Gọi ngay: 0919 006 030</span>
                    </a>
                    <a
                      href="https://zalo.me/0919006030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                    >
                      <span>Chat Zalo tư vấn 1-1</span>
                    </a>
                  </div>

                  {/* Booking viewing form */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 mb-2">Đăng ký xem nhà thực tế</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Chuyên viên BĐS sẽ liên hệ xếp lịch xem nhà trong 15 phút.'); }} className="space-y-2">
                      <input type="text" placeholder="Họ và tên của bạn" required className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs" />
                      <input type="tel" placeholder="Số điện thoại Zalo" required className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs" />
                      <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm text-xs">
                        Xác nhận đặt lịch
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 6: TIN TỨC & THỊ TRƯỜNG (NEWS PAGE)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'news' && (
          <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Tin Tức Thị Trường & Cẩm Nang BĐS</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Cập nhật liên tục biến động giá đất, chính sách pháp lý quy hoạch và cẩm nang mua bán nhà đất an toàn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NEWS_LIST.concat([
                {
                  id: 5,
                  title: 'Phân tích quy hoạch phân khu đô thị sông Hồng đến năm 2030',
                  date: '20/08/2026',
                  tag: 'Quy hoạch',
                  image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
                  summary: 'Những cơ hội vàng và lưu ý pháp lý cần nắm rõ khi đầu tư đất nền ven đê sông Hồng.'
                },
                {
                  id: 6,
                  title: '5 nguyên tắc phong thủy phòng khách giúp gia chủ chiêu tài đón lộc',
                  date: '18/08/2026',
                  tag: 'Phong thủy',
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                  summary: 'Cách bố trí hướng sofa, ánh sáng tự nhiên và cây cảnh phong thủy hợp mệnh gia chủ.'
                }
              ]).map((item) => (
                <div key={item.id} className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-blue-600 font-bold mb-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[9px] font-black uppercase">{item.tag}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{item.summary || 'Thông tin chi tiết bài viết phân tích từ các chuyên gia kinh tế BĐS hàng đầu.'}</p>
                  </div>
                  <div className="p-5 pt-0">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedArticle(item); }} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"><span>Đọc toàn bộ bài viết</span> <ArrowRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 6B: GIỚI THIỆU (ABOUT)
        ───────────────────────────────────────────────────────────── */}
        {(currentPage === 'about' || currentPage === 'gioi-thieu') && (
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 space-y-10">
            <div className="bg-white rounded-md border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
              <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">VỀ CHÚNG TÔI</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Cổng Thông Tin Giao Dịch BĐS Toàn Diện</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Cổng thông tin cung cấp cơ sở dữ liệu bất động sản khổng lồ với hơn 50.000+ tin đăng mua bán và cho thuê được kiểm duyệt pháp lý nghiêm ngặt tại các thành phố lớn trên cả nước.
                  </p>
                  <p>
                    Ứng dụng công nghệ bản đồ số, tra cứu phong thủy và thẩm định giá trực tuyến, chúng tôi giúp khách hàng đưa ra quyết định an cư và đầu tư chính xác, an toàn và tối ưu tài chính nhất.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-sm">
                      <strong className="text-xl font-black text-blue-700 block">50.000+</strong>
                      <span className="text-[11px] text-slate-500">Tin đăng xác thực</span>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-sm">
                      <strong className="text-xl font-black text-emerald-700 block">99.2%</strong>
                      <span className="text-[11px] text-slate-500">Pháp lý chuẩn</span>
                    </div>
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-sm">
                      <strong className="text-xl font-black text-indigo-700 block">100+</strong>
                      <span className="text-[11px] text-slate-500">Chuyên gia đồng hành</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" alt="About portal" className="w-full h-64 object-cover rounded-sm border border-slate-200 shadow-sm" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button onClick={() => setCurrentPage('home')} className="text-xs font-bold text-blue-600 hover:underline">
                  ← Quay lại trang chủ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            PAGE 7: LIÊN HỆ & KÝ GỬI (CONTACT & LISTING SUBMISSION)
        ───────────────────────────────────────────────────────────── */}
        {currentPage === 'contact' && (
          <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-10">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Liên Hệ & Ký Gửi Bất Động Sản</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Đội ngũ chuyên viên tư vấn sẽ thẩm định giá và kết nối người mua/thuê trong thời gian nhanh nhất.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form */}
              <div className="lg:col-span-7 bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="text-base font-black text-slate-900 mb-4">Gửi Yêu Cầu Ký Gửi Mua Bán / Cho Thuê</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Yêu cầu ký gửi của bạn đã được tiếp nhận thành công! Chúng tôi sẽ liên hệ trong 30 phút.'); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Họ và tên *</label>
                      <input type="text" required placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 text-xs font-medium" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Số điện thoại / Zalo *</label>
                      <input type="tel" required placeholder="0919 006 030" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 text-xs font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Hình thức giao dịch</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2.5 text-xs font-bold text-slate-700">
                        <option value="ban">Cần Bán Bất Động Sản</option>
                        <option value="cho-thue">Cho Thuê Bất Động Sản</option>
                        <option value="can-mua">Cần Tìm Mua Nhà Đất</option>
                        <option value="can-thue">Cần Tìm Thuê Mặt Bằng/Căn Hộ</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Loại hình BĐS</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2.5 text-xs font-bold text-slate-700">
                        <option value="chung-cu">Căn hộ chung cư</option>
                        <option value="biet-thu">Biệt thự / Villa</option>
                        <option value="nha-pho">Nhà phố thương mại</option>
                        <option value="dat-nen">Đất nền phân lô</option>
                        <option value="van-phong">Tòa nhà / Văn phòng</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Địa chỉ BĐS & Mức giá mong muốn</label>
                    <input type="text" placeholder="Ví dụ: Tòa S2.05 Vinhomes Ocean Park, giá mong muốn 3.5 tỷ" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 text-xs font-medium" />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Ghi chú thêm thông tin</label>
                    <textarea rows={3} placeholder="Thông tin chi tiết về diện tích, số phòng ngủ, hướng nhà, tình trạng sổ đỏ..." className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 text-xs font-medium" />
                  </div>

                  <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-sm text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all">
                    Gửi thông tin ký gửi ngay
                  </button>
                </form>
              </div>

              {/* Contact Info Box */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0F172A] text-white rounded-md p-6 sm:p-8 shadow-lg">
                  <h3 className="text-base font-black mb-4">Hệ Thống Trụ Sở & Hotline</h3>
                  
                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white mb-0.5">Trụ sở chính:</strong>
                        <span className="text-slate-300">Tầng 18, Tòa nhà Keangnam Landmark 72, Phạm Hùng, Nam Từ Liêm, Hà Nội</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white mb-0.5">Tổng đài CSKH (24/7):</strong>
                        <span className="text-slate-300 font-mono font-bold">0919 006 030 · 0983 312 219</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white mb-0.5">Email tiếp nhận:</strong>
                        <span className="text-slate-300">ntrungz0704@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Cam kết dịch vụ:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">✓ Bảo mật 100% thông tin khách hàng</li>
                      <li className="flex items-center gap-2">✓ Thẩm định giá thị trường miễn phí</li>
                      <li className="flex items-center gap-2">✓ Hỗ trợ công chứng sang tên tận nơi</li>
                    </ul>
                  </div>
                </div>

                {/* Interactive Map Box */}
                <div className="bg-white rounded-md border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Bản đồ chỉ đường đến Trụ sở</span>
                    </h4>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Keangnam+Landmark+72,+Ph%E1%BA%A1m+H%C3%B9ng,+H%C3%A0+N%E1%BB%99i"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Mở Google Maps</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="w-full h-56 rounded-sm overflow-hidden border border-slate-200">
                    <iframe
                      title="Bản đồ Trụ sở Keangnam"
                      src="https://maps.google.com/maps?q=Keangnam+Landmark+72,+Ph%E1%BA%A1m+H%C3%B9ng,+H%C3%A0+N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="bg-[#0A1628] text-white border-t border-slate-800 text-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Col 1 */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight">BDS<span className="text-blue-400">PORTAL</span></span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
                Cổng thông tin & Sàn niêm yết Bất Động Sản số 1 Việt Nam. Đồng hành cùng hàng triệu khách hàng tìm kiếm tổ ấm an cư và cơ hội đầu tư sinh lời bền vững.
              </p>
              <div className="text-slate-400 space-y-1 text-xs">
                <p>📍 Trụ sở: Nam Từ Liêm, Hà Nội</p>
                <p>📞 Hotline: <strong className="text-white font-mono">0919 006 030</strong></p>
                <p>✉️ Email: <strong className="text-white">ntrungz0704@gmail.com</strong></p>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">BĐS Mua Bán</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigateTo('sale', 'nha-dat-ban')} className="hover:text-white transition-colors">Căn hộ chung cư</button></li>
                <li><button onClick={() => navigateTo('sale', 'nha-dat-ban')} className="hover:text-white transition-colors">Biệt thự nhà vườn</button></li>
                <li><button onClick={() => navigateTo('sale', 'nha-dat-ban')} className="hover:text-white transition-colors">Nhà phố mặt tiền</button></li>
                <li><button onClick={() => navigateTo('sale', 'nha-dat-ban')} className="hover:text-white transition-colors">Đất nền dự án</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">BĐS Cho Thuê</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigateTo('rent', 'cho-thue')} className="hover:text-white transition-colors">Căn hộ dịch vụ</button></li>
                <li><button onClick={() => navigateTo('rent', 'cho-thue')} className="hover:text-white transition-colors">Shophouse thương mại</button></li>
                <li><button onClick={() => navigateTo('rent', 'cho-thue')} className="hover:text-white transition-colors">Mặt bằng văn phòng</button></li>
                <li><button onClick={() => navigateTo('rent', 'cho-thue')} className="hover:text-white transition-colors">Kho xưởng KCN</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Liên Kết Nhanh</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigateTo('projects', 'du-an')} className="hover:text-white transition-colors">Dự án mới 2026</button></li>
                <li><button onClick={() => navigateTo('news', 'tin-tuc')} className="hover:text-white transition-colors">Tin tức thị trường</button></li>
                <li><button onClick={() => navigateTo('contact', 'lien-he')} className="hover:text-white transition-colors">Gửi ký gửi nhà đất</button></li>
                <li><button onClick={() => navigateTo('contact', 'lien-he')} className="hover:text-white transition-colors">Tư vấn vay ngân hàng</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>© 2026 BDSPORTAL. Bản quyền thuộc về Hệ Thống Cổng Thông Tin BĐS Việt Nam.</p>
            <p className="flex items-center gap-2">
              <span>Bảo mật 256-Bit</span> • <span>Uptime 99.9%</span> • <span>Hỗ trợ 24/7</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          ARTICLE READER MODAL (CHI TIẾT TOÀN BỘ BÀI VIẾT)
      ───────────────────────────────────────────────────────────── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header image & Close */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-sm bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all z-10"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                  {selectedArticle.tag || 'Thị trường'}
                </span>
                <span className="px-3 py-1 rounded-md bg-black/60 text-white text-xs font-semibold backdrop-blur">
                  {selectedArticle.date}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-sm border border-slate-100 text-xs text-slate-600">
                <div className="w-8 h-8 rounded-sm bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                  BĐS
                </div>
                <div>
                  <p className="font-bold text-slate-900">Ban Biên Tập BDS Portal</p>
                  <p className="text-[11px] text-slate-400">Chuyên mục phân tích tài chính & quy hoạch bất động sản</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 bg-blue-50/60 p-4 rounded-sm border-l-4 border-blue-600">
                  {selectedArticle.summary || 'Theo dữ liệu nghiên cứu thị trường mới nhất từ Hội đồng Bất động sản Việt Nam, bức tranh thị trường nửa cuối năm 2026 ghi nhận những bước chuyển mình mạnh mẽ nhờ chính sách tháo gỡ pháp lý và lãi suất vay mua nhà ổn định.'}
                </p>

                <h2 className="text-base font-bold text-slate-900 pt-2">1. Tổng quan chuyển động dòng vốn đầu tư</h2>
                <p>
                  Khác với giai đoạn đầu cơ trước đây, dòng tiền của các nhà đầu tư cá nhân và tổ chức hiện nay đang tập trung mạnh mẽ vào các phân khúc tạo ra dòng tiền thực tế: căn hộ cho thuê trung tâm, shophouse khối đế tại các khu đô thị đông dân cư và nhà phố có sổ đỏ hoàn chỉnh.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                  <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-100 text-center">
                    <span className="text-xl font-black text-blue-600 font-mono">+18.5%</span>
                    <span className="block text-[11px] text-slate-500 font-medium mt-0.5">Sức cầu căn hộ</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-100 text-center">
                    <span className="text-xl font-black text-emerald-600 font-mono">6.2 - 8.5%</span>
                    <span className="block text-[11px] text-slate-500 font-medium mt-0.5">Lợi suất cho thuê/năm</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-100 text-center col-span-2 sm:col-span-1">
                    <span className="text-xl font-black text-amber-600 font-mono">100% Sổ Hồng</span>
                    <span className="block text-[11px] text-slate-500 font-medium mt-0.5">Tiêu chí hàng đầu</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-slate-900 pt-2">2. Khuyến nghị cho người mua nhà để ở và tích sản</h2>
                <p>
                  Các chuyên gia khuyến nghị khách hàng nên ưu tiên lựa chọn các dự án được phát triển bởi các chủ đầu tư uy tín có pháp lý minh bạch, tiến độ thi công đúng cam kết và có chính sách bảo lãnh ngân hàng rõ ràng.
                </p>
              </div>

              {/* Consultation Strip */}
              <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-sm text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm">Nhận Báo Cáo Phân Tích Quy Hoạch & Giá Đất</h4>
                  <p className="text-xs text-blue-100 mt-0.5">Tải tài liệu PDF phân tích 63 tỉnh thành cập nhật tháng 8/2026</p>
                </div>
                <button
                  onClick={() => { alert('Đăng ký nhận báo cáo thành công! Bản tin đã được gửi tới email của bạn.'); setSelectedArticle(null); }}
                  className="px-5 py-2.5 bg-white text-blue-700 font-black rounded-sm text-xs shrink-0 hover:bg-blue-50 transition-colors shadow-md"
                >
                  Tải Báo Cáo Miễn Phí
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PROJECT LEAD MODAL (ĐĂNG KÝ NHẬN BẢNG GIÁ F1)
      ───────────────────────────────────────────────────────────── */}
      {leadModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => { setLeadModalProject(null); setLeadSubmitted(false); }}
              className="absolute top-4 right-4 w-9 h-9 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {!leadSubmitted ? (
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">ĐĂNG KÝ TƯ VẤN DỰ ÁN</span>
                  <h3 className="text-lg font-black text-slate-900">{leadModalProject.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{leadModalProject.location} • {leadModalProject.price}</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLeadSubmitted(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Họ và tên của bạn *</label>
                    <input type="text" required placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 text-xs font-semibold text-slate-800" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Số điện thoại / Zalo *</label>
                    <input type="tel" required placeholder="0919 006 030" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 text-xs font-semibold text-slate-800" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Nhu cầu quan tâm</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2.5 text-xs font-bold text-slate-700">
                      <option>Nhận Bảng Giá Đợt 1 & Chính Sách Chiết Khấu</option>
                      <option>Đăng Ký Tham Quan Căn Hộ Mẫu Trực Tiếp</option>
                      <option>Tư Vấn Gói Vay Ngân Hàng 0% Lãi Suất</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-sm text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
                  >
                    Gửi Yêu Cầu Nhận Báo Giá Ngay
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-sm flex items-center justify-center mx-auto mb-3 text-2xl font-black">
                  ✓
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Đã Tiếp Nhận Thông Tin!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-5">
                  Chuyên viên phụ trách dự án <strong>{leadModalProject.title}</strong> sẽ liên hệ gửi bảng giá chi tiết qua Zalo trong ít phút.
                </p>
                <button
                  onClick={() => { setLeadModalProject(null); setLeadSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-sm text-xs font-bold hover:bg-slate-800"
                >
                  Đóng cửa sổ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
