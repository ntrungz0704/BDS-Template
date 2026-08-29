import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, MapPin, Building, Phone, Mail, ArrowRight, ChevronRight, ChevronLeft,
  CheckCircle2, Calendar, X, Share2, Heart, Eye, Clock, Award, Users, Plus, Minus,
  MessageCircle, Star, Sparkles, Send, Facebook, Home, ArrowLeft, ShieldCheck,
  Check, FileText, Download, Calculator, Compass, Briefcase, Filter
} from 'lucide-react';

export interface MinhKhaiApartmentTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const APARTMENT_PROJECTS = [
  { 
    id: 'mk1', 
    slug: 'vinhomes-times-city-458-minh-khai',
    title: 'Vinhomes Times City', 
    loc: '458 Minh Khai, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 3.8 Tỷ', 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 
    status: 'Đang bàn giao', 
    district: 'Hai Bà Trưng',
    specs: '1-4 Phòng ngủ · 53 - 160m²',
    developer: 'Tập đoàn Vingroup',
    handover: 'Đã bàn giao sổ đỏ',
    scale: 'Khu đô thị phức hợp 36ha gồm 23 tòa tháp căn hộ',
    desc: 'Vinhomes Times City là biểu tượng sống thịnh vượng bậc nhất cửa ngõ Đông Nam thủ đô. Sở hữu hệ sinh thái khép kín all-in-one gồm Bệnh viện Vinmec, Trường Vinschool, TTTM Vincom Mega Mall.',
    highlights: ['TTTM Vincom Mega Mall 230.000m²', 'Bệnh viện Đa khoa Quốc tế Vinmec', 'Trường liên cấp Vinschool', 'Quảng trường nhạc nước Times Square', 'Bể bơi 4 mùa 4000m²']
  },
  { 
    id: 'mk2', 
    slug: 'green-pearl-city-378-minh-khai',
    title: 'Green Pearl City', 
    loc: '378 Minh Khai, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 3.2 Tỷ', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 
    status: 'Sổ hồng lâu dài', 
    district: 'Hai Bà Trưng',
    specs: '2-3 Phòng ngủ · 71 - 115m²',
    developer: 'Phong Phú - Daewon - Thủ Đức',
    handover: 'Ở ngay',
    scale: '2 tòa chung cư 21 tầng + 69 căn liền kề biệt thự',
    desc: 'Green Pearl City mang phong cách kiến trúc sinh thái Singapore với mật độ xây dựng chỉ 37%. Dự án sở hữu khuôn viên cây xanh nội khu rộng lớn và cụm bể bơi ngoài trời ngắm trọn sông Hồng.',
    highlights: ['Mật độ xây dựng xanh chuẩn Singapore', 'Bể bơi tràn bờ view sông Hồng', 'Trường mầm non quốc tế khối đế', '2 tầng hầm đỗ xe thông minh']
  },
  { 
    id: 'mk3', 
    slug: 'imperia-sky-garden-423-minh-khai',
    title: 'Imperia Sky Garden', 
    loc: '423 Minh Khai, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 3.5 Tỷ', 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 
    status: 'Căn hộ sân vườn', 
    district: 'Hai Bà Trưng',
    specs: '2-3 Phòng ngủ · 58 - 105m²',
    developer: 'MIK Group',
    handover: 'Bàn giao đầy đủ nội thất',
    scale: '4 tòa tháp cao 27 tầng với 68 tiện ích đỉnh cao',
    desc: 'Imperia Sky Garden là tổ hợp căn hộ cao cấp sở hữu chuỗi 68 tiện ích đỉnh cao, bao gồm khu vườn chân mây Sky Garden trên tầng thượng và bể bơi vô cực ngắm trọn pháo hoa.',
    highlights: ['Khu vườn chân mây Sky Garden tầng 27', 'Bể bơi vô cực tầng thượng', 'Camera AI nhận diện khuôn mặt', 'Kính Low-E cách âm cản nhiệt']
  },
  { 
    id: 'mk4', 
    slug: 'hoa-binh-green-city-505-minh-khai',
    title: 'Hòa Bình Green City', 
    loc: '505 Minh Khai, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 2.9 Tỷ', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 
    status: 'Dát vàng 24K', 
    district: 'Hai Bà Trưng',
    specs: '2-3 Phòng ngủ · 65 - 126m²',
    developer: 'Công ty TNHH Hòa Bình',
    handover: 'Sổ hồng vĩnh viễn',
    scale: '2 tòa tháp 27 tầng tiêu chuẩn 6 sao',
    desc: 'Dự án độc bản tại Hà Nội với phào chỉ, lan can và thiết bị vệ sinh mạ vàng 24K. Kết cấu bê tông cốt thép dày 350mm chống động đất cấp 8.',
    highlights: ['Thiết bị vệ sinh Toto mạ vàng 24K', 'Tường xây 3 lớp cách nhiệt', 'Sân golf mini tầng thượng', 'Trung tâm thương mại V+']
  },
  { 
    id: 'mk5', 
    slug: 'sunshine-garden-vinh-tuy',
    title: 'Sunshine Garden', 
    loc: 'Vĩnh Tuy, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 3.1 Tỷ', 
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', 
    status: 'Sinh thái xanh', 
    district: 'Hai Bà Trưng',
    specs: '1-3 Phòng ngủ · 47 - 102m²',
    developer: 'Sunshine Group',
    handover: 'Full nội thất SmartHome',
    scale: '3 tòa tháp cao 31 tầng liền kề Times City',
    desc: 'Căn hộ kiến trúc Tân cổ điển Châu Âu quý phái kết hợp công nghệ Smart Home 4.0 điều khiển bằng giọng nói và điện thoại thông minh.',
    highlights: ['Smart Home Sunshine Tech 4.0', 'Vườn sinh thái dạo bộ Châu Âu', 'Sát trục Minh Khai - Vĩnh Tuy mở rộng']
  },
  { 
    id: 'mk6', 
    slug: 'udic-riverside-122-vinh-tuy',
    title: 'UDIC Riverside', 
    loc: '122 Vĩnh Tuy, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 2.8 Tỷ', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 
    status: 'View sông Hồng', 
    district: 'Hai Bà Trưng',
    specs: '2-3 Phòng ngủ · 62 - 134m²',
    developer: 'Tổng công ty UDIC',
    handover: 'Sổ hồng trao tay',
    scale: 'Tổ hợp thương mại dịch vụ 22 tầng',
    desc: 'Tọa lạc sát chân cầu Vĩnh Tuy, UDIC Riverside hưởng trọn không gian sống thoáng đãng và không khí trong lành mát mẻ từ dòng sông Hồng.',
    highlights: ['Tầm nhìn Panorama ra sông Hồng', 'Chủ đầu tư UDIC uy tín hàng đầu', 'Phí quản lý hợp lý nhất Hai Bà Trưng']
  },
  { 
    id: 'mk7', 
    slug: 'hinode-city-201-minh-khai',
    title: 'Hinode City', 
    loc: '201 Minh Khai, Hai Bà Trưng, Hà Nội', 
    price: 'Từ 4.5 Tỷ', 
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 
    status: 'Phong cách Nhật', 
    district: 'Hai Bà Trưng',
    specs: '2-4 Phòng ngủ · 76 - 128m²',
    developer: 'Vietracimex (WTO)',
    handover: 'Nội thất nhập khẩu Nhật Bản',
    scale: '3 tòa tháp 26 tầng biểu tượng Ngũ Hành',
    desc: 'Hinode City là tuyệt tác kiến trúc mang đậm triết lý sống Zen Nhật Bản với khu vườn ngũ hành, Onsen khoáng nóng và rạp CGV nội khu.',
    highlights: ['Khu tắm khoáng nóng Onsen Nhật Bản', 'Vườn thiền Zen Garden tầng thượng', 'Khóa cửa vân tay tĩnh mạch thông minh']
  },
  { 
    id: 'mk8', 
    slug: 'sunshine-palace-linh-nam',
    title: 'Sunshine Palace', 
    loc: 'Ngõ 13 Lĩnh Nam, Hoàng Mai, Hà Nội', 
    price: 'Từ 2.6 Tỷ', 
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 
    status: 'Sẵn sàng ở ngay', 
    district: 'Hoàng Mai',
    specs: '2-3 Phòng ngủ · 75 - 110m²',
    developer: 'Sunshine Group',
    handover: 'Đã có sổ đỏ',
    scale: 'Tòa tháp 28 tầng phong cách Tân cổ điển',
    desc: 'Vị trí giáp ranh Times City, thừa hưởng toàn bộ tiện ích đại đô thị với mức giá vô cùng dễ tiếp cận cho các gia đình trẻ an cư.',
    highlights: ['Sát vách Times City hưởng trọn tiện ích', 'Nội thất Kohler, sàn gỗ nhập khẩu', 'Sổ hồng chính chủ sẵn sàng sang tên']
  }
];

const FAQS = [
  { q: 'Làm thế nào để mua được căn hộ ưng ý và nhanh chóng?', a: 'Quý khách chỉ cần để lại nhu cầu hoặc gọi trực tiếp Hotline. Chuyên viên của chúng tôi sẽ gửi bảng hàng cập nhật trong 15 phút, tư vấn vị trí căn tầng đẹp nhất và hỗ trợ thủ tục pháp lý, ngân hàng trọn gói miễn phí.' },
  { q: 'Hỗ trợ vay ngân hàng mua chung cư Minh Khai như thế nào?', a: 'Chúng tôi liên kết với các ngân hàng lớn (Vietcombank, BIDV, Techcombank) hỗ trợ vay tới 70-80% giá trị căn hộ với lãi suất 0% và ân hạn nợ gốc từ 18-24 tháng.' },
  { q: 'Quy trình ký hợp đồng và nhận bàn giao nhà ra sao?', a: 'Quy trình gồm 3 bước: Đặt cọc giữ chỗ -> Ký Hợp đồng mua bán chính thức với CĐT -> Nhận bàn giao căn hộ và hồ sơ làm sổ hồng.' },
  { q: 'Tôi có được xem thực tế căn hộ mẫu trước khi mua không?', a: 'Hoàn toàn được! Đội ngũ tư vấn sẽ đón quý khách tham quan trực tiếp nhà mẫu và căn hộ thực tế tất cả các ngày trong tuần.' },
  { q: 'Chi phí dịch vụ và quản lý căn hộ khoảng bao nhiêu?', a: 'Tùy từng dự án, phí quản lý dao động từ 8.000đ - 16.000đ/m²/tháng với đầy đủ dịch vụ an ninh 24/7, bể bơi, phòng gym, vệ sinh công cộng.' }
];

const NEWS_LIST = [
  {
    id: 'n1',
    slug: 'ha-tang-duong-vanh-dai-2-minh-khai-hoan-thanh',
    title: 'Hạ tầng Vành Đai 2 trên cao Minh Khai - Vĩnh Tuy hoàn thiện: Giá trị BĐS bứt phá',
    date: '18/05/2026',
    cat: 'Quy hoạch hạ tầng',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    summary: 'Tuyến đường Vành Đai 2 trên cao đoạn Vĩnh Tuy - Ngã Tư Sở thông xe toàn tuyến đã rút ngắn thời gian di chuyển từ Minh Khai sang Cầu Giấy chỉ còn 10 phút.',
    content: [
      'Sau khi trục đường huyết mạch Vành đai 2 trên cao hoàn thành đồng bộ cùng cầu Vĩnh Tuy giai đoạn 2, khu vực Minh Khai - Hai Bà Trưng đã chính thức gỡ bỏ hoàn toàn nút thắt giao thông.',
      'Sự thay đổi ngoạn mục về hạ tầng đã thúc đẩy mạnh mẽ dòng tiền đầu tư đổ về các dự án căn hộ cao cấp như Times City, Imperia Sky Garden, Green Pearl City.',
      'Các chuyên gia dự báo trong giai đoạn 2026 - 2028, giá thuê và giá chuyển nhượng tại trục Minh Khai sẽ tiếp tục duy trì đà tăng trưởng bền vững từ 12 - 15%/năm.'
    ]
  },
  {
    id: 'n2',
    slug: 'kinh-nghiem-chon-huong-va-tang-can-ho-chung-cu',
    title: 'Kinh nghiệm chọn hướng ban công và khoảng tầng đẹp nhất khi mua chung cư',
    date: '14/05/2026',
    cat: 'Cẩm nang mua nhà',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    summary: 'Hướng dẫn chi tiết cách lựa chọn căn hộ Đông Nam đón gió mát mùa hè và các khoảng tầng trung 8 - 22 không lo bụi ồn.',
    content: [
      'Khi chọn mua căn hộ cao tầng, hướng ban công Đông Nam và Nam luôn là ưu tiên số một của các gia đình Việt nhờ đặc tính mát mẻ vào mùa hè và ấm áp vào mùa đông.',
      'Khoảng tầng vàng từ tầng 8 đến tầng 22 mang lại tầm nhìn thoáng đãng, đón gió trời tự nhiên và tránh được tiếng ồn từ giao thông đường bộ.',
      'Quý khách nên trực tiếp kiểm tra ánh sáng thực tế vào các khung giờ sáng và chiều trước khi quyết định đặt cọc.'
    ]
  },
  {
    id: 'n3',
    slug: 'bang-gia-chuyen-nhuong-chung-cu-minh-khai-2026',
    title: 'Cập nhật bảng giá chuyển nhượng và cho thuê căn hộ trục đường Minh Khai quý 2/2026',
    date: '10/05/2026',
    cat: 'Thị trường BĐS',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    summary: 'Tổng hợp chi tiết mặt bằng giá bán từ 45 - 75 triệu/m² và giá thuê từ 9 - 25 triệu/tháng tại Times City, Imperia Sky Garden, Green Pearl.',
    content: [
      'Thị trường căn hộ thứ cấp tại trục đường Minh Khai ghi nhận thanh khoản ấn tượng với hơn 350 giao dịch thành công trong quý vừa qua.',
      'Các căn hộ diện tích 2 phòng ngủ (70 - 85m²) tiếp tục là phân khúc được tìm kiếm nhiều nhất nhờ tính thanh khoản cao và khả năng cho thuê tạo dòng tiền ổn định.'
    ]
  }
];

const CAREERS = [
  { id: 'c1', title: 'Trưởng Phòng Kinh Doanh BĐS Cao Cấp', dept: 'Khối Kinh Doanh', exp: '2-3 năm kinh nghiệm', salary: '30 - 60 Triệu + Hoa hồng', loc: 'Minh Khai, Hai Bà Trưng' },
  { id: 'c2', title: 'Chuyên Viên Tư Vấn Dự Án Căn Hộ F1', dept: 'Phòng Bán Hàng', exp: 'Không yêu cầu (Đào tạo từ đầu)', salary: '15 - 40 Triệu + Thưởng nóng', loc: 'Hai Bà Trưng, Hà Nội' },
  { id: 'c3', title: 'Chuyên Viên Digital Marketing BĐS', dept: 'Khối Marketing', exp: '1 năm kinh nghiệm Ads', salary: '15 - 25 Triệu', loc: 'Hà Nội' }
];

export const MinhKhaiApartmentTemplate: React.FC<MinhKhaiApartmentTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const resolveRoute = (raw: string) => {
    if (!raw || raw === 'home') return { page: 'home', proj: null, article: null };
    const parts = raw.split('/');
    if (parts[0] === 'du-an' || parts[0] === 'project-detail') {
      const slug = parts.slice(1).join('/');
      const match = APARTMENT_PROJECTS.find(p => p.slug === slug || p.id === slug) || APARTMENT_PROJECTS[0];
      return { page: 'project-detail', proj: match, article: null };
    }
    if (parts[0] === 'tin-tuc' || parts[0] === 'news-detail') {
      const slug = parts.slice(1).join('/');
      const match = NEWS_LIST.find(a => a.slug === slug || a.id === slug) || NEWS_LIST[0];
      return { page: 'news-detail', proj: null, article: match };
    }
    return { page: parts[0], proj: null, article: null };
  };

  const initialResolved = resolveRoute(initialPage);
  const [currentPage, setCurrentPage] = useState<string>(initialResolved.page);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(initialResolved.proj || APARTMENT_PROJECTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialResolved.article || NEWS_LIST[0]);
  const [consultSubmitted, setConsultSubmitted] = useState<boolean>(false);
  const [searchKw, setSearchKw] = useState<string>('');

  const [districtFilter, setDistrictFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return APARTMENT_PROJECTS.filter(p => {
      if (districtFilter !== 'all' && p.district !== districtFilter) return false;
      if (searchKw && !p.title.toLowerCase().includes(searchKw.toLowerCase()) && !p.loc.toLowerCase().includes(searchKw.toLowerCase())) return false;
      return true;
    });
  }, [districtFilter, searchKw]);
  
  const [galleryTab, setGalleryTab] = useState<string>('all');

  useEffect(() => {
    if (initialPage) {
      const r = resolveRoute(initialPage);
      setCurrentPage(r.page);
      if (r.proj) setSelectedProject(r.proj);
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

  const handleSelectProject = (proj: any) => {
    setSelectedProject(proj);
    navigate('du-an', proj.slug || proj.id);
  };

  const handleSelectArticle = (art: any) => {
    setSelectedArticle(art);
    navigate('tin-tuc', art.slug || art.id);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER WITH GOLDEN EAGLE LOGO */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 h-22 flex items-center justify-between gap-4">
          <nav className="hidden lg:flex items-center gap-9 text-sm font-bold uppercase tracking-wider text-slate-700">
            <button onClick={() => navigate('home')} className={`hover:text-amber-600 ${currentPage === 'home' ? 'text-amber-600 font-black' : ''}`}>TRANG CHỦ</button>
            <button onClick={() => navigate('about')} className={`hover:text-amber-600 ${currentPage === 'about' ? 'text-amber-600 font-black' : ''}`}>GIỚI THIỆU</button>
            <button onClick={() => navigate('projects')} className={`hover:text-amber-600 ${currentPage === 'projects' || currentPage === 'project-detail' ? 'text-amber-600 font-black' : ''}`}>DỰ ÁN</button>
            <button onClick={() => navigate('news')} className={`hover:text-amber-600 ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-amber-600 font-black' : ''}`}>TIN TỨC</button>
          </nav>

          <div 
            onClick={() => navigate('home')}
            className="cursor-pointer flex flex-col items-center justify-center -my-2"
          >
            <div className="w-12 h-12 flex items-center justify-center text-amber-500 text-3xl font-serif">
              🦅
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 -mt-1">
              MINH KHAI LUXURY
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-bold uppercase tracking-wider text-slate-700">
            <button onClick={() => navigate('gallery')} className={`hover:text-amber-600 ${currentPage === 'gallery' ? 'text-amber-600 font-black' : ''}`}>THƯ VIỆN</button>
            <button onClick={() => navigate('knowledge')} className={`hover:text-amber-600 ${currentPage === 'knowledge' ? 'text-amber-600 font-black' : ''}`}>KIẾN THỨC</button>
            <button onClick={() => navigate('career')} className={`hover:text-amber-600 ${currentPage === 'career' ? 'text-amber-600 font-black' : ''}`}>TUYỂN DỤNG</button>
            <button onClick={() => navigate('contact')} className={`hover:text-amber-600 ${currentPage === 'contact' ? 'text-amber-600 font-black' : ''}`}>LIÊN HỆ</button>
          </nav>
        </div>
      </header>

      {/* 2. HERO (CHỈ Ở HOME) */}
      {currentPage === 'home' && (
        <section className="relative h-[520px] sm:h-[620px] bg-slate-950 overflow-hidden flex items-center justify-center text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80"
            alt="Đẳng Cấp Thượng Lưu"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl sm:text-6xl font-serif italic text-amber-300 mb-3 drop-shadow-lg">
              Đẳng Cấp Thượng Lưu
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xl mx-auto leading-relaxed">
              Kiến tạo những giá trị đỉnh cao, mang đến cho bạn một môi trường sống sang trọng, giàu tính nghệ thuật ngay tại trung tâm thủ đô.
            </p>
          </div>
        </section>
      )}

      {/* 3. HOME VIEW */}
      {currentPage === 'home' && (
        <main className="max-w-[1360px] mx-auto px-4 py-12 space-y-16 flex-1">
          {/* SECTION 1: 8 DỰ ÁN CĂN HỘ */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold uppercase text-slate-900 tracking-wide">
                DỰ ÁN CHUNG CƯ MINH KHAI
              </h2>
              <p className="text-xs text-slate-500 mt-1">Hội tụ những dự án bất động sản thương mại sáng giá nhất</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                >
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 text-center bg-slate-50 border-t border-slate-100">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate('projects')}
                className="px-8 py-2.5 bg-[#B48448] hover:bg-[#966b35] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                XEM TẤT CẢ CÁC DỰ ÁN
              </button>
            </div>
          </section>

          {/* SECTION 2: FAQ & LEAD FORM */}
          <section className="border-t border-slate-200 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-base font-bold uppercase text-slate-900 tracking-wide mb-4">
                  CÂU HỎI THƯỜNG GẶP
                </h3>
                <div className="space-y-2">
                  {FAQS.map((faq, index) => (
                    <div key={index} className="border border-slate-200">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full p-3.5 text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-amber-50/40 flex items-center justify-between gap-4 transition-colors"
                      >
                        <span className={openFaq === index ? 'text-amber-700' : ''}>^ {faq.q}</span>
                      </button>
                      {openFaq === index && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs uppercase text-slate-900 tracking-wider">ĐĂNG KÝ TƯ VẤN NHANH</h4>
                {consultSubmitted ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    ✓ Đã nhận thông tin! Chuyên viên sẽ gọi lại trong 10 phút.
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setConsultSubmitted(true); }} className="space-y-3 text-xs">
                    <input type="text" placeholder="Họ và tên của bạn..." required className="w-full p-2.5 bg-white border border-slate-300 focus:outline-none focus:border-amber-600" />
                    <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2.5 bg-white border border-slate-300 focus:outline-none focus:border-amber-600" />
                    <textarea rows={3} placeholder="Nội dung cần tư vấn..." className="w-full p-2.5 bg-white border border-slate-300 focus:outline-none focus:border-amber-600" />
                    <button type="submit" className="w-full py-2.5 bg-[#B48448] hover:bg-[#966b35] text-white font-bold uppercase tracking-wider transition-colors">
                      ĐĂNG KÝ NGAY
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 3: ĐỐI TÁC */}
          <section className="border-t border-slate-200 pt-10 text-center">
            <h3 className="text-base font-bold uppercase text-slate-900 tracking-wide mb-6">
              ĐỐI TÁC CỦA CHÚNG TÔI
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 py-4 opacity-80 grayscale hover:grayscale-0 transition-all">
              {['Vingroup', 'Masterise Homes', 'MIK Group', 'Sunshine Group', 'Hòa Bình Group', 'UDIC Corp'].map((partner, i) => (
                <div key={i} className="px-4 py-2 border border-slate-200 font-serif font-bold text-slate-700 text-sm">
                  {partner}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* 4. FULL DETAIL VIEW CHO DỰ ÁN */}
      {(currentPage === 'project-detail' || currentPage === 'du-an' || currentPage.startsWith('du-an')) && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-amber-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </button>
            <span>/</span>
            <button onClick={() => navigate('projects')} className="hover:text-amber-700">Dự án</button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-md">{selectedProject.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('projects')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách dự án
            </button>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1">Chủ đầu tư: {selectedProject.developer}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-900 relative">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-[#B48448] text-white text-xs font-black px-3 py-1 shadow-md">
                    {selectedProject.price}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                <h1 className="text-xl sm:text-3xl font-serif font-black text-slate-900">{selectedProject.title}</h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-600" /><span>{selectedProject.loc}</span></p>

                <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block uppercase font-bold">Quy mô</span><strong>{selectedProject.specs}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block uppercase font-bold">Chủ đầu tư</span><strong>{selectedProject.developer}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[10px] text-slate-400 block uppercase font-bold">Tình trạng</span><strong>{selectedProject.status}</strong></div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Giới thiệu tổng quan</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedProject.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">Đặc quyền & Tiện ích</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.highlights.map((hl: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 p-6 shadow-xs sticky top-24 space-y-4">
                <div className="text-center pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 text-amber-600 flex items-center justify-center font-serif text-2xl mx-auto mb-1">
                    🦅
                  </div>
                  <strong className="block text-sm font-bold text-slate-900">Phòng Kinh Doanh Minh Khai</strong>
                  <span className="text-[11px] text-slate-500">Tư vấn bảng giá & chính sách F1</span>
                </div>
                <a href="tel:0919006030" className="w-full py-3 bg-[#B48448] hover:bg-[#966b35] text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-xs transition-colors">
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
            <button onClick={() => navigate('home')} className="hover:text-amber-700 flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('news')} className="hover:text-amber-700">Tin tức</button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-sm">{selectedArticle.title}</span>
          </div>

          <button onClick={() => navigate('news')} className="px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách tin
          </button>

          <article className="bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 border border-amber-200 inline-block">
              {selectedArticle.cat}
            </span>
            <h1 className="text-xl sm:text-3xl font-serif font-black text-slate-900 leading-tight">{selectedArticle.title}</h1>
            <div className="aspect-[16/9] bg-slate-900 overflow-hidden">
              <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-amber-50/60 border-l-4 border-amber-600 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {selectedArticle.summary}
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle.content?.map((para: string, i: number) => <p key={i}>{para}</p>)}
            </div>
          </article>
        </main>
      )}

      {/* 6. SUBPAGES VỚI NỘI DUNG ĐẦY ĐỦ (KHÔNG BAO GIỜ BỊ TRỐNG) */}
      {/* ── PROJECTS SUBPAGE ── */}
      {currentPage === 'projects' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Danh Sách Dự Án Căn Hộ Chung Cư</h1>
              <p className="text-xs text-slate-500 mt-1">Cập nhật quỹ căn đẹp và bảng giá chính thức từ chủ đầu tư</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((proj) => (
              <div key={proj.id} onClick={() => handleSelectProject(proj)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100 relative">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5">{proj.price}</div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 mb-1">{proj.title}</h3>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{proj.loc}</span></p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
                  <span className="text-xs font-bold text-amber-700">Xem chi tiết dự án →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── NEWS SUBPAGE ── */}
      {currentPage === 'news' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Tin Tức Thị Trường & Quy Hoạch</h1>
              <p className="text-xs text-slate-500 mt-1">Phân tích chuyên sâu hạ tầng và biến động giá nhà đất</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_LIST.map((art) => (
              <div key={art.id} onClick={() => handleSelectArticle(art)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-amber-700 uppercase">{art.cat} · {art.date}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-700 line-clamp-2 mt-1 mb-2">{art.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <span className="text-xs font-bold text-amber-700">Đọc toàn bộ bài viết →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── ABOUT SUBPAGE ── */}
      {currentPage === 'about' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Về Chúng Tôi — Minh Khai Luxury</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="text-xs font-bold text-amber-700 uppercase">Hành trình 10 năm kiến tạo</span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900">Đơn Vị Phân Phối BĐS Cao Cấp Hàng Đầu</h2>
              <p>Minh Khai Luxury là đơn vị phân phối chiến lược F1 của các tập đoàn bất động sản hàng đầu tại Việt Nam như Vingroup, MIK Group, Masterise Homes, Sunshine Group.</p>
              <p>Chúng tôi tự hào đã đồng hành và mang đến tổ ấm thịnh vượng cho hơn 8.500 gia đình cư dân tại cửa ngõ Đông Nam thủ đô.</p>
            </div>
            <div className="aspect-[16/11] bg-slate-900 overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80" alt="Về chúng tôi" className="w-full h-full object-cover" />
            </div>
          </div>
        </main>
      )}

      {/* ── GALLERY SUBPAGE ── */}
      {currentPage === 'gallery' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Thư Viện Ảnh & Video Căn Hộ</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {APARTMENT_PROJECTS.map((p, i) => (
              <div key={i} className="aspect-[16/11] overflow-hidden border border-slate-200 group relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold p-2 text-center">
                  {p.title}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── KNOWLEDGE SUBPAGE ── */}
      {currentPage === 'knowledge' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Kiến Thức & Cẩm Nang Bất Động Sản</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">💡 {faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── CAREER SUBPAGE ── */}
      {currentPage === 'career' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Cơ Hội Nghề Nghiệp & Tuyển Dụng</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>
          <div className="space-y-4">
            {CAREERS.map((job) => (
              <div key={job.id} className="bg-white p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">{job.dept}</span>
                  <h3 className="font-bold text-sm text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">📍 {job.loc} · ⏱️ {job.exp}</p>
                </div>
                <div className="text-left sm:text-right">
                  <strong className="text-xs font-black text-rose-600 font-mono block mb-2">{job.salary}</strong>
                  <button onClick={() => alert('Vui lòng gửi CV về tuyendung@minhkhailuxury.com')} className="px-4 py-1.5 bg-[#B48448] text-white text-xs font-bold uppercase">Ứng Tuyển</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ── CONTACT SUBPAGE ── */}
      {currentPage === 'contact' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-slate-900">Liên Hệ Ban Quản Lý Minh Khai Luxury</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">← Về trang chủ</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-slate-200 space-y-4">
              <h2 className="font-bold text-sm text-slate-900 uppercase">Gửi Thông Điệp Trực Tiếp</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Chúng tôi đã nhận được thông tin liên hệ.'); navigate('home'); }} className="space-y-3 text-xs">
                <input type="text" placeholder="Họ và tên..." required className="w-full p-2.5 border border-slate-300" />
                <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2.5 border border-slate-300" />
                <input type="email" placeholder="Email..." className="w-full p-2.5 border border-slate-300" />
                <textarea rows={4} placeholder="Nội dung cần liên hệ..." className="w-full p-2.5 border border-slate-300" />
                <button type="submit" className="w-full py-2.5 bg-[#B48448] hover:bg-[#966b35] text-white font-bold uppercase">GỬI LIÊN HỆ</button>
              </form>
            </div>
            <div className="bg-slate-50 p-6 border border-slate-200 space-y-4 text-xs">
              <h2 className="font-bold text-sm text-slate-900 uppercase">Văn Phòng Điều Hành</h2>
              <p>📍 <strong>Địa chỉ:</strong> 458 Minh Khai, Q. Hai Bà Trưng, Hà Nội</p>
              <p>📞 <strong>Hotline 24/7:</strong> 0919 006 030</p>
              <p>✉️ <strong>Email:</strong> contact@minhkhailuxury.com</p>
              <p>⏱️ <strong>Giờ làm việc:</strong> 8:00 - 20:00 (Tất cả các ngày trong tuần)</p>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0E131F] text-slate-400 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">THÔNG TIN LIÊN HỆ</h4>
            <p className="mb-1">Hotline: <strong className="text-amber-400 font-mono">0919 006 030</strong></p>
            <p className="mb-1">Địa chỉ: 458 Minh Khai, Q. Hai Bà Trưng, Hà Nội</p>
            <p>Email: contact@minhkhailuxury.com</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</h4>
            <p className="text-[11px] mb-3">Nhập số điện thoại để nhận ngay bảng giá căn đẹp đợt 1</p>
            <div className="flex gap-2">
              <input type="tel" placeholder="Số điện thoại..." className="bg-slate-800 border border-slate-700 text-white px-3 py-1.5 text-xs flex-1" />
              <button className="bg-[#B48448] hover:bg-[#966b35] text-white font-bold px-4 py-1.5 text-xs">GỬI</button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">FANPAGE DỰ ÁN</h4>
            <div className="p-3 bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center font-bold">f</div>
              <div>
                <strong className="block text-white text-xs">Chung Cư Minh Khai Fanpage</strong>
                <span className="text-[10px] text-slate-500">42.500 người theo dõi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 py-4 text-center text-slate-500 text-[11px]">
          Copyright 2026 © MINH KHAI LUXURY. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default MinhKhaiApartmentTemplate;
