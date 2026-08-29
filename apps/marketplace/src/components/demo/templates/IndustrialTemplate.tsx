import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Search, MapPin, Phone, Mail, ArrowRight, CheckCircle2, 
  Building2, Factory, Warehouse, ChevronDown, Check, Globe, Shield, 
  Zap, Truck, Scale, ChevronRight, BarChart3, Filter, Award, Activity, Box, Maximize
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, LinkedinIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "KCN Nam Đình Vũ",
    loc: "Hải Phòng",
    region: "Miền Bắc",
    type: "Đất công nghiệp",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    tags: ["Khu phi thuế quan", "Cảng biển"],
    area: "1,329 ha",
    price: "Từ 110 USD/m2",
    desc: "Khu công nghiệp duy nhất tại Việt Nam sở hữu cảng biển quốc tế nội khu, ưu đãi thuế quan vượt trội của khu kinh tế Đình Vũ – Cát Hải.",
    specs: {
      power: "Trạm biến áp 110/22kV công suất 4x63 MVA",
      water: "Nhà máy cấp nước 30,000 m3/ngày",
      waste: "Nhà máy xử lý nước thải 20,000 m3/ngày",
      fire: "Hệ thống PCCC tự động đạt chuẩn NFPA"
    }
  },
  {
    id: 2,
    title: "KCN VSIP Bình Dương",
    loc: "Bình Dương",
    region: "Miền Nam",
    type: "Nhà xưởng",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    tags: ["Xưởng xây sẵn", "Điện 110kV"],
    area: "500 ha",
    price: "Từ 150 USD/m2",
    desc: "Mô hình khu công nghiệp xanh chuẩn mực Singapore với hạ tầng kết nối đồng bộ và dịch vụ một cửa hỗ trợ doanh nghiệp tối đa.",
    specs: {
      power: "Điện lưới quốc gia 110kV/22kV",
      water: "Cấp nước 20,000 m3/ngày",
      waste: "Xử lý nước thải 15,000 m3/ngày",
      fire: "PCCC Sprinkler tiêu chuẩn cao"
    }
  },
  {
    id: 3,
    title: "KCN Phú Mỹ 3",
    loc: "Bà Rịa - Vũng Tàu",
    region: "Miền Nam",
    type: "Đất công nghiệp",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80",
    tags: ["Công nghiệp nặng", "Khí tự nhiên"],
    area: "1,046 ha",
    price: "Từ 135 USD/m2",
    desc: "Vị trí đắc địa gần cảng Cái Mép, hạ tầng cung cấp trực tiếp khí tự nhiên và điện hơi nước cho các ngành công nghiệp nặng, hóa chất.",
    specs: {
      power: "Nguồn điện kép 110kV từ Phú Mỹ",
      water: "Nhà máy nước riêng 40,000 m3/ngày",
      waste: "Xử lý nước thải chuẩn cột A",
      fire: "Hệ thống cứu hỏa xe bồn túc trực"
    }
  },
  {
    id: 4,
    title: "Kho Logistics Bắc Ninh",
    loc: "Bắc Ninh",
    region: "Miền Bắc",
    type: "Kho bãi",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    tags: ["Kho mát", "Gần sân bay"],
    area: "100 ha",
    price: "Từ 5.5 USD/m2/tháng",
    desc: "Hệ thống kho vận Logistics hiện đại đạt chứng chỉ xanh LEED, trang bị dock leveler tự động, vị trí kế cận cao tốc đi sân bay Nội Bài.",
    specs: {
      power: "Trạm điện dự phòng 24/7",
      water: "Hệ thống cấp nước khép kín",
      waste: "Xử lý chất thải rắn công nghiệp",
      fire: "Hệ thống chữa cháy màng ngăn nước"
    }
  },
  {
    id: 5,
    title: "Khu CN AMATA",
    loc: "Đồng Nai",
    region: "Miền Nam",
    type: "Đất công nghiệp",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
    tags: ["Khu công nghệ cao"],
    area: "513 ha",
    price: "Từ 160 USD/m2",
    desc: "Khu công nghiệp công nghệ cao hiện đại nhất Đồng Nai, thu hút các tập đoàn công nghệ lớn từ Nhật Bản, Hàn Quốc.",
    specs: {
      power: "Trạm biến áp chuyên dùng AMATA",
      water: "Cấp nước chuẩn WHO 15,000 m3/ngày",
      waste: "Nhà máy xử lý sinh học hiện đại",
      fire: "Còi báo cháy nội khu tự động"
    }
  },
  {
    id: 6,
    title: "Nhà xưởng Tân Thuận",
    loc: "TP. Hồ Chí Minh",
    region: "Miền Nam",
    type: "Nhà xưởng",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80",
    tags: ["Xưởng cao tầng", "Nội thành"],
    area: "300 ha",
    price: "Từ 8 USD/m2/tháng",
    desc: "Nhà xưởng cao tầng hiện đại đầu tiên tại KCX Tân Thuận, tối ưu hóa diện tích sản xuất cho doanh nghiệp công nghệ thông tin, viễn thông ngay tại trung tâm TP.HCM.",
    specs: {
      power: "Trạm biến áp dự phòng ATS siêu tốc",
      water: "Đường nước Sawaco ổn định",
      waste: "Xử lý nước thải chuẩn KCN",
      fire: "Hệ thống PCCC thông minh nối mạng cảnh sát TP"
    }
  }
];

const LEADER_DATA = [
  { name: "Nguyễn Văn A", role: "Chủ tịch Hội đồng Quản trị", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80", bio: "Hơn 25 năm kinh nghiệm trong ngành quản lý & phát triển BĐS Công nghiệp." },
  { name: "Trần Thị B", role: "Tổng Giám đốc Điều hành (CEO)", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", bio: "Chuyên gia hoạch định chiến lược đầu tư FDI từ thị trường Đông Bắc Á." },
  { name: "John Smith", role: "Giám đốc Phát triển Bền vững", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80", bio: "Đưa các tiêu chuẩn ESG quốc tế vào vận hành hệ thống kho xưởng." }
];

const MILESTONE_DATA = [
  { year: "1998", title: "Thành lập Tập đoàn", desc: "Khởi đầu với dự án hạ tầng cụm công nghiệp nhỏ 50ha tại Đồng Nai." },
  { year: "2008", title: "Mở rộng quy mô", desc: "Đạt cột mốc 500ha quỹ đất sạch và chào đón đối tác FDI thứ 50." },
  { year: "2018", title: "Tiêu chuẩn Quốc tế", desc: "Nhận chứng chỉ ISO 9001:2015 và triển khai mô hình KCN sinh thái chuẩn ESG." },
  { year: "2026", title: "Số hóa & Phát triển xanh", desc: "Ứng dụng IoT vào quản lý vận hành kho bãi thông minh trên toàn quốc." }
];

const NEWS_DATA = [
  { id: 1, img: "https://images.unsplash.com/photo-1586528116493-a02822a94567?auto=format&fit=crop&w=800&q=80", title: "Báo cáo thị trường BĐS Công nghiệp Quý 3/2026: Vốn FDI đổ mạnh vào miền Bắc", date: "12 Thg 10, 2026", cat: "Báo Cáo", content: "Trong quý 3 năm 2026, dòng vốn FDI đầu tư vào các khu công nghiệp miền Bắc ghi nhận mức tăng trưởng kỷ lục 25% so với cùng kỳ năm ngoái. Các tỉnh thành trọng điểm như Bắc Ninh, Hải Phòng, Quảng Ninh tiếp tục là điểm sáng nhờ hạ tầng logistics kết nối tốt với Trung Quốc và hệ thống cảng biển nước sâu." },
  { id: 2, img: "https://images.unsplash.com/photo-1581091226033-d5c48150dba5?auto=format&fit=crop&w=800&q=80", title: "Khởi công giai đoạn 2 Cụm công nghiệp Nam Đình Vũ với quy mô 200ha", date: "05 Thg 10, 2026", cat: "Sự Kiện", content: "Chính thức động thổ phân khu phía Nam thuộc KCN Nam Đình Vũ với tổng vốn đầu tư hơn 120 triệu USD. Phân khu này tập trung phát triển hệ thống nhà xưởng xây sẵn (RBF) cao tầng và kho bãi thông minh tích hợp điện mặt trời mái nhà." },
  { id: 3, img: "https://images.unsplash.com/photo-1581092918056-0c4c3cb27c9f?auto=format&fit=crop&w=800&q=80", title: "Quy định mới về ưu đãi thuế Thu nhập Doanh nghiệp cho KCN sinh thái", date: "28 Thg 09, 2026", cat: "Chính Sách", content: "Nghị định mới ban hành bổ sung thêm các điều khoản miễn giảm thuế thu nhập doanh nghiệp kéo dài lên tới 6 năm đối với các dự án sản xuất đạt chuẩn ESG và hoạt động trong khu công nghiệp đạt tiêu chuẩn sinh thái quốc gia." },
  { id: 4, img: "https://images.unsplash.com/photo-1581092583537-20d7710c79ab?auto=format&fit=crop&w=800&q=80", title: "Ứng dụng công nghệ IoT vào việc tự động hóa giám sát năng lượng nhà máy", date: "15 Thg 09, 2026", cat: "Công Nghệ", content: "PlatformBDS triển khai thí điểm hệ thống cảm biến thông minh giúp đo lường lượng điện năng, lượng nước tiêu thụ và lượng phát thải khí carbon theo thời gian thực tại cụm nhà xưởng VSIP Bình Dương, hỗ trợ khách thuê đạt chuẩn Net-Zero." }
];

const GALLERY_DATA = [
  { img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", cat: "Nhà xưởng", title: "Dây chuyền lắp ráp hiện đại" },
  { img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80", cat: "Kho bãi", title: "Hệ thống kho kệ Selective" },
  { img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80", cat: "Hạ tầng", title: "Trạm biến áp nội khu" },
  { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", cat: "Kho bãi", title: "Khu vực xuất nhập hàng hóa" },
  { img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80", cat: "Hạ tầng", title: "Đường nội khu chịu tải container" },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", cat: "Nhà xưởng", title: "Mô hình nhà xưởng tiền chế tiêu chuẩn" },
  { img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80", cat: "Tiện ích", title: "Khu văn phòng điều hành" },
  { img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80", cat: "Tiện ích", title: "Nhà máy xử lý nước thải chuẩn A" }
];

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

const normalizeIndustrialPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'kho-xuong'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function IndustrialTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [activePage, setActivePageState] = useState(normalizeIndustrialPage(initialPage));

  useEffect(() => {
    setActivePageState(normalizeIndustrialPage(initialPage));
  }, [initialPage]);
  const setActivePage = (p: string) => {
    setActivePageState(p);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', `/demo/${templateSlug}/${p}`);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // States for interactive filters and modals
  const [searchProjectQuery, setSearchProjectQuery] = useState('');
  const [filterProjectType, setFilterProjectType] = useState('Tất cả loại hình');
  const [filterProjectRegion, setFilterProjectRegion] = useState('Mọi khu vực');
  
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof NEWS_DATA[0] | null>(null);
  
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isMobile = viewport === 'mobile';
  
  // Design system specific fonts and colors mapped to Tailwind for this B2B template
  const fontHeading = "'Space Grotesk', sans-serif";
  const fontBody = "'Manrope', sans-serif";
  
  const navLinks = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'projects', label: 'DỰ ÁN CÔNG NGHIỆP' },
    { id: 'about', label: 'VỀ CHÚNG TÔI' },
    { id: 'gallery', label: 'THƯ VIỆN' },
    { id: 'news', label: 'TIN TỨC B2B' },
    { id: 'contact', label: 'LIÊN HỆ' }
  ];

  const renderTopBar = () => (
    <div className="bg-[#0F172A] text-gray-300 py-2 border-b border-gray-800 text-sm hidden md:block">
      <div className={`${MAX_W} px-4 flex justify-between items-center`}>
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><Award className="w-4 h-4 mr-2 text-[#F59E0B]" /> ISO 9001:2015 Certified</span>
          <span className="flex items-center"><Globe className="w-4 h-4 mr-2 text-[#F59E0B]" /> Mạng lưới Toàn cầu</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="tel:0901234567" className="flex items-center hover:text-white transition-colors">
            <Phone className="w-4 h-4 mr-2 text-[#F59E0B]" /> +84 90 123 4567
          </a>
          <a href="mailto:b2b@platformbds.vn" className="flex items-center hover:text-white transition-colors">
            <Mail className="w-4 h-4 mr-2 text-[#F59E0B]" /> b2b@platformbds.vn
          </a>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header className="bg-[#0F172A] text-white sticky top-0 z-50 shadow-md">
      <div className={`${MAX_W} px-4 h-20 flex items-center justify-between`}>
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setActivePage('home')}
        >
          <Factory className="w-8 h-8 text-[#F59E0B] mr-3" />
          <div>
            <h1 className="text-xl font-bold tracking-wider" style={{ fontFamily: fontHeading }}>PLATFORM<span className="text-[#F59E0B]">BDS</span></h1>
            <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Industrial Real Estate</p>
          </div>
        </div>

        {!isMobile ? (
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`text-sm font-bold tracking-wider hover:text-[#F59E0B] transition-colors ${
                  activePage === link.id ? 'text-[#F59E0B]' : 'text-gray-200'
                }`}
                style={{ fontFamily: fontBody }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div className="bg-[#0F172A] border-t border-gray-800 p-4 absolute w-full">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-white font-bold border-b border-gray-800"
              style={{ fontFamily: fontBody }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div className="w-full">
      {/* 3. HERO */}
      <section className="relative h-[85vh] flex items-center bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" 
            alt="Khu công nghiệp" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        </div>
        <div className={`${MAX_W} px-4 relative z-10 text-white w-full`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded text-[#F59E0B] font-bold text-sm mb-6">
              <Zap className="w-4 h-4 mr-2" />
              BẤT ĐỘNG SẢN CÔNG NGHIỆP HÀNG ĐẦU VIỆT NAM
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: fontHeading }}
            >
              KIẾN TẠO HẠ TẦNG <br/><span className="text-[#1E40AF] drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">PHÁT TRIỂN BỀN VỮNG</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: fontBody }}>
              Cung cấp giải pháp không gian công nghiệp toàn diện: kho bãi, nhà xưởng xây sẵn và đất công nghiệp với vị trí chiến lược, kết nối giao thương quốc tế.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActivePage('projects')}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 font-bold transition-colors flex items-center uppercase tracking-wider cursor-pointer"
              >
                Tìm Hiểu Các Khu CN <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => setActivePage('contact')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0F172A] px-8 py-4 font-bold transition-all uppercase tracking-wider cursor-pointer"
              >
                Nhận Báo Giá Cụm Kho
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUICK SEARCH */}
      <section className="bg-gray-100 py-8 border-b border-gray-200">
        <div className={`${MAX_W} px-4`}>
          <div className="bg-white p-6 shadow-lg rounded-sm -mt-24 relative z-20 border-t-4 border-[#1E40AF]">
            <h3 className="font-bold text-[#0F172A] mb-4 text-lg flex items-center" style={{ fontFamily: fontHeading }}>
              <Filter className="w-5 h-5 mr-2 text-[#F59E0B]" /> BỘ LỌC TÌM KIẾM NHANH B2B
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50">
                <option>Loại hình BĐS</option>
                <option>Đất công nghiệp</option>
                <option>Nhà xưởng xây sẵn</option>
                <option>Kho vận logistics</option>
              </select>
              <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50">
                <option>Vùng kinh tế</option>
                <option>Miền Nam (Bình Dương, Đồng Nai)</option>
                <option>Miền Bắc (Bắc Ninh, Hải Phòng)</option>
              </select>
              <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50">
                <option>Diện tích</option>
                <option>Dưới 10,000 m2</option>
                <option>10,000 - 50,000 m2</option>
                <option>Trên 50,000 m2</option>
              </select>
              <button 
                onClick={() => setActivePage('projects')}
                className="w-full bg-[#0F172A] hover:bg-[#1e293b] text-white p-3 font-bold transition-colors flex items-center justify-center cursor-pointer"
              >
                <Search className="w-5 h-5 mr-2" /> TÌM KIẾM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATS BAR */}
      <section className="bg-[#1E40AF] text-white py-12">
        <div className={`${MAX_W} px-4`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#3B82F6]/50">
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#F59E0B] mb-2" style={{ fontFamily: fontHeading }}>15+</div>
              <div className="text-sm uppercase tracking-wider font-bold text-gray-200">Khu Công Nghiệp</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#F59E0B] mb-2" style={{ fontFamily: fontHeading }}>5M+</div>
              <div className="text-sm uppercase tracking-wider font-bold text-gray-200">m² Quỹ Đất</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#F59E0B] mb-2" style={{ fontFamily: fontHeading }}>200+</div>
              <div className="text-sm uppercase tracking-wider font-bold text-gray-200">Đối Tác FDI</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#F59E0B] mb-2" style={{ fontFamily: fontHeading }}>98%</div>
              <div className="text-sm uppercase tracking-wider font-bold text-gray-200">Tỷ Lệ Lấp Đầy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROPERTIES */}
      <section className="py-20 bg-gray-50">
        <div className={`${MAX_W} px-4`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-[#F59E0B] font-bold uppercase tracking-widest mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2" /> Dự Án Trọng Điểm
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]" style={{ fontFamily: fontHeading }}>
                CỤM CÔNG NGHIỆP NỔI BẬT
              </h2>
            </div>
            <button 
              onClick={() => setActivePage('projects')}
              className="hidden md:flex text-[#1E40AF] font-bold items-center hover:text-[#0F172A] transition-colors uppercase cursor-pointer"
            >
              Xem tất cả dự án <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "KCN Nam Đình Vũ", loc: "Hải Phòng", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
                tags: ["Khu phi thuế quan", "Cảng biển"], area: "1,329 ha"
              },
              {
                title: "KCN VSIP Bình Dương", loc: "Bình Dương", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
                tags: ["Xưởng xây sẵn", "Điện 110kV"], area: "500 ha"
              },
              {
                title: "KCN Phú Mỹ 3", loc: "Bà Rịa - Vũng Tàu", img: "https://images.unsplash.com/photo-1616423641403-bc970ec3725b?w=800&q=80",
                tags: ["Công nghiệp nặng", "Khí tự nhiên"], area: "1,046 ha"
              }
            ].map((prop, idx) => (
              <div key={idx} className="bg-white shadow-lg group overflow-hidden border border-gray-200 hover:border-[#1E40AF] transition-colors">
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#F59E0B] text-[#0F172A] text-xs font-black px-3 py-1 uppercase tracking-wider">
                    {prop.area}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#1E40AF] transition-colors" style={{ fontFamily: fontHeading }}>
                    {prop.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1 text-[#1E40AF]" /> {prop.loc}
                  </div>
                  <div className="flex gap-2 mb-6">
                    {prop.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 font-semibold border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <button 
                      onClick={() => setActivePage('projects')}
                      className="text-[#1E40AF] font-bold text-sm uppercase flex items-center hover:text-[#F59E0B] transition-colors w-full justify-between cursor-pointer"
                    >
                      Xem Chi Tiết Quy Hoạch <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROPERTY TYPES */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>
              LOẠI HÌNH BẤT ĐỘNG SẢN B2B
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Đa dạng các giải pháp không gian phù hợp với từng ngành nghề và quy mô sản xuất của doanh nghiệp FDI và nội địa.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Đất Công Nghiệp", desc: "Đã có hạ tầng hoàn chỉnh", icon: <MapPin className="w-8 h-8 text-[#1E40AF] mb-4" /> },
              { title: "Nhà Xưởng Xây Sẵn", desc: "RBF tiêu chuẩn quốc tế", icon: <Factory className="w-8 h-8 text-[#1E40AF] mb-4" /> },
              { title: "Kho Vận Logistics", desc: "Kết nối cảng biển, sân bay", icon: <Warehouse className="w-8 h-8 text-[#1E40AF] mb-4" /> },
              { title: "Văn Phòng Điều Hành", desc: "Tích hợp trong khu công nghiệp", icon: <Building2 className="w-8 h-8 text-[#1E40AF] mb-4" /> }
            ].map((type, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 p-8 text-center hover:bg-[#0F172A] hover:text-white group transition-all duration-300">
                <div className="flex justify-center group-hover:text-[#F59E0B] transition-colors">
                  {type.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white text-[#0F172A]" style={{ fontFamily: fontHeading }}>{type.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className={`${MAX_W} px-4`}>
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: fontHeading }}>
                LỢI THẾ CẠNH TRANH CHIẾN LƯỢC
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Chúng tôi cung cấp hệ sinh thái công nghiệp hoàn chỉnh, giúp doanh nghiệp tiết kiệm chi phí vận hành và tối ưu hóa chuỗi cung ứng.
              </p>
              <button 
                onClick={() => alert('Hồ sơ năng lực đang được tải xuống...')}
                className="bg-[#F59E0B] text-[#0F172A] px-6 py-3 font-bold uppercase hover:bg-white transition-colors cursor-pointer"
              >
                Tải Hồ Sơ Năng Lực (PDF)
              </button>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Hạ Tầng Điện 3 Pha", desc: "Trạm biến áp riêng biệt, đảm bảo nguồn điện ổn định 24/7.", icon: <Zap /> },
                { title: "Xử Lý Nước Thải", desc: "Hệ thống chuẩn A, công suất lớn cho ngành công nghiệp nặng.", icon: <Activity /> },
                { title: "Giao Thông Đồng Bộ", desc: "Đường nội khu rộng 30-40m, chịu tải trọng xe container 40 feet.", icon: <Truck /> },
                { title: "Pháp Lý Minh Bạch", desc: "Sổ hồng riêng từng lô, hỗ trợ thủ tục cấp phép đầu tư (IRC/ERC).", icon: <Scale /> },
                { title: "An Ninh 24/7", desc: "Hệ thống camera giám sát và đội tuần tra bảo vệ nhiều lớp.", icon: <Shield /> },
                { title: "Quy Hoạch Cụm", desc: "Phân khu chuyên biệt theo ngành nghề, tránh ô nhiễm chéo.", icon: <Box /> },
              ].map((adv, idx) => (
                <div key={idx} className="flex">
                  <div className="mr-4 mt-1 text-[#F59E0B]">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white" style={{ fontFamily: fontHeading }}>{adv.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. ABOUT */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" alt="About Us" className="w-full h-auto shadow-xl" />
                <div className="absolute -bottom-8 -right-8 bg-[#1E40AF] p-8 text-white hidden md:block">
                  <div className="text-4xl font-bold mb-2 text-[#F59E0B]" style={{ fontFamily: fontHeading }}>25+</div>
                  <div className="font-bold uppercase tracking-wider text-sm">Năm Kinh Nghiệm<br/>Phát Triển KCN</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <h4 className="text-[#F59E0B] font-bold uppercase tracking-widest mb-4">Câu Chuyện Của Chúng Tôi</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: fontHeading }}>
                ĐỐI TÁC TIN CẬY CỦA CÁC NHÀ ĐẦU TƯ TOÀN CẦU
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Được thành lập từ năm 1998, PlatformBDS đã vươn lên trở thành một trong những nhà phát triển bất động sản công nghiệp hàng đầu Việt Nam. Chúng tôi không chỉ bán đất hay cho thuê xưởng, chúng tôi xây dựng một môi trường sinh thái công nghiệp bền vững.
              </p>
              <ul className="space-y-4 mb-8">
                {["Tiêu chuẩn ESG quốc tế", "Dịch vụ hỗ trợ đầu tư trọn gói (One-stop service)", "Quản lý vận hành khu chuyên nghiệp"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#1E40AF] mr-3" /> {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setActivePage('about')}
                className="border-2 border-[#0F172A] text-[#0F172A] px-8 py-4 font-bold hover:bg-[#0F172A] hover:text-white transition-colors uppercase cursor-pointer"
              >
                Về Tập Đoàn Chúng Tôi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SPECIFICATIONS / MASTER PLAN */}
      <section className="py-20 bg-gray-100 border-y border-gray-200">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>
              BẢN ĐỒ QUY HOẠCH TỔNG THỂ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Sơ đồ phân lô chi tiết, hạ tầng kỹ thuật và tỷ lệ sử dụng đất tại KCN trọng điểm.</p>
          </div>
          
          <div className="bg-white p-4 shadow-md border border-gray-300">
            {/* Placeholder for Master plan image - using a schematic aesthetic */}
            <div className="bg-[#1e293b] w-full h-[500px] relative flex items-center justify-center overflow-hidden border border-gray-800">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="text-center z-10 p-8 bg-[#0F172A]/80 backdrop-blur border border-[#1E40AF]">
                <Maximize className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
                <h3 className="text-2xl text-white font-bold mb-2">MASTER PLAN INTERACTIVE VIEW</h3>
                <p className="text-gray-400 mb-6">Interactive GIS Map is available in the desktop version.</p>
                <button 
                  onClick={() => setActivePage('gallery')}
                  className="bg-[#1E40AF] text-white px-6 py-2 font-bold hover:bg-[#F59E0B] hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  VIEW FULL SCREEN
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center text-sm font-bold border-t border-gray-200 pt-4">
              <div><span className="text-[#1E40AF]">65%</span> Đất Công Nghiệp</div>
              <div><span className="text-green-600">15%</span> Cây Xanh Mặt Nước</div>
              <div><span className="text-gray-600">10%</span> Giao Thông</div>
              <div><span className="text-[#F59E0B]">10%</span> Dịch Vụ & Hạ Tầng</div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TENANTS/CLIENTS */}
      <section className="py-16 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-10">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">ĐỐI TÁC VÀ KHÁCH THUÊ HIỆN HỮU</h4>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos placeholder as text for B2B */}
            <h2 className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: fontHeading }}>SAMSUNG</h2>
            <h2 className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: fontHeading }}>FOXCONN</h2>
            <h2 className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: fontHeading }}>LEGO</h2>
            <h2 className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: fontHeading }}>PEGATRON</h2>
            <h2 className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: fontHeading }}>UNILEVER</h2>
          </div>
        </div>
      </section>

      {/* 12. GALLERY */}
      <section className="py-20 bg-[#0F172A]">
        <div className={`${MAX_W} px-4`}>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: fontHeading }}>
              THƯ VIỆN CƠ SỞ VẬT CHẤT
            </h2>
            <button 
              onClick={() => setActivePage('gallery')}
              className="text-[#F59E0B] font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
            >
              Xem Toàn Bộ Ảnh
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-48 md:h-64 object-cover hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </section>

      {/* 13. LATEST NEWS */}
      <section className="py-20 bg-gray-50">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-12">
            <h4 className="text-[#1E40AF] font-bold uppercase tracking-widest mb-2">Thị Trường BĐS Công Nghiệp</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]" style={{ fontFamily: fontHeading }}>
              TIN TỨC & BÁO CÁO MỚI NHẤT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1586528116493-a02822a94567?w=800&q=80",
                cat: "Báo Cáo", date: "12 Thg 10, 2023",
                title: "Báo cáo thị trường BĐS Công nghiệp Quý 3/2023: Vốn FDI đổ mạnh vào miền Bắc"
              },
              {
                img: "https://images.unsplash.com/photo-1581091226033-d5c48150dba5?w=800&q=80",
                cat: "Tin Tập Đoàn", date: "05 Thg 10, 2023",
                title: "Khởi công giai đoạn 2 Cụm công nghiệp Nam Đình Vũ với diện tích 200ha"
              },
              {
                img: "https://images.unsplash.com/photo-1581092918056-0c4c3cb27c9f?w=800&q=80",
                cat: "Chính Sách", date: "28 Thg 09, 2023",
                title: "Quy định mới về ưu đãi thuế Thu nhập Doanh nghiệp cho khu công nghiệp cao"
              }
            ].map((news, idx) => (
              <div key={idx} className="bg-white border border-gray-200 group">
                <div className="relative h-56 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-0 left-0 bg-[#1E40AF] text-white px-3 py-1 text-xs font-bold uppercase">
                    {news.cat}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-sm mb-3 font-medium">{news.date}</div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-4 group-hover:text-[#1E40AF] transition-colors leading-snug" style={{ fontFamily: fontHeading }}>
                    {news.title}
                  </h3>
                  <button 
                    onClick={() => setActivePage('news')}
                    className="text-[#0F172A] font-bold text-sm uppercase flex items-center hover:text-[#F59E0B] transition-colors cursor-pointer"
                  >
                    Đọc Bài Viết <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center" style={{ fontFamily: fontHeading }}>
              CÂU HỎI THƯỜNG GẶP (FAQ)
            </h2>
            <div className="space-y-4">
              {[
                { q: "Thời hạn thuê đất công nghiệp tại dự án là bao lâu?", a: "Thời hạn thuê đất là 50 năm tính từ ngày cấp Giấy chứng nhận đầu tư cho khu công nghiệp. Hiện tại, thời hạn còn lại là 45 năm." },
                { q: "Có những ưu đãi thuế nào khi đầu tư vào đây?", a: "Doanh nghiệp được miễn thuế TNDN 2 năm đầu và giảm 50% cho 4 năm tiếp theo. Ngoài ra còn có ưu đãi về thuế nhập khẩu máy móc tạo tài sản cố định." },
                { q: "Hệ thống xử lý nước thải đạt tiêu chuẩn nào?", a: "Hệ thống xử lý nước thải tập trung đạt tiêu chuẩn cột A theo QCVN 40:2011/BTNMT, công suất 10.000 m3/ngày đêm." },
                { q: "Quy định về chiều cao nhà xưởng tối đa?", a: "Tùy thuộc vào từng phân khu, nhưng thông thường chiều cao nhà xưởng được phép xây dựng tối đa từ 3 đến 5 tầng, mật độ xây dựng 60-70%." }
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-200">
                  <button 
                    className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors text-left font-bold text-[#0F172A]"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 py-4 text-gray-600 bg-white border-t border-gray-200 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. CONTACT CTA */}
      <section className="py-20 bg-[#1E40AF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0F172A] opacity-90 transform -skew-y-3 scale-110"></div>
        <div className={`${MAX_W} px-4 relative z-10`}>
          <div className="bg-white p-8 md:p-12 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: fontHeading }}>YÊU CẦU BÁO GIÁ DỰ ÁN</h2>
              <p className="text-gray-600 mb-8">Để lại thông tin, chuyên viên tư vấn B2B của chúng tôi sẽ liên hệ và gửi báo giá chi tiết, bản đồ quy hoạch trong vòng 24h.</p>
              
              <div className="space-y-6">
                <div className="flex items-center text-[#0F172A] font-bold">
                  <Phone className="w-6 h-6 mr-4 text-[#1E40AF]" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Hotline 24/7</div>
                    +84 90 123 4567
                  </div>
                </div>
                <div className="flex items-center text-[#0F172A] font-bold">
                  <Mail className="w-6 h-6 mr-4 text-[#1E40AF]" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Email</div>
                    b2b@platformbds.vn
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Gửi yêu cầu báo giá dự án thành công!');
                  e.currentTarget.reset();
                }}
                className="space-y-4"
              >
                <input required type="text" placeholder="Tên Doanh Nghiệp / Người liên hệ *" className="w-full p-4 border border-gray-300 focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Số điện thoại *" className="w-full p-4 border border-gray-300 focus:border-[#1E40AF] outline-none" />
                  <input required type="email" placeholder="Email *" className="w-full p-4 border border-gray-300 focus:border-[#1E40AF] outline-none" />
                </div>
                <select className="w-full p-4 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-600">
                  <option>Nhu cầu của bạn (Kho, Xưởng, Đất...)</option>
                  <option>Thuê đất công nghiệp</option>
                  <option>Thuê xưởng xây sẵn</option>
                  <option>Kho logistics</option>
                </select>
                <button type="submit" className="w-full bg-[#0F172A] text-white font-bold p-4 uppercase tracking-widest hover:bg-[#F59E0B] hover:text-[#0F172A] transition-colors cursor-pointer">
                  Gửi Yêu Cầu
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 16. NEWSLETTER */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className={`${MAX_W} px-4 text-center`}>
          <BarChart3 className="w-12 h-12 text-[#1E40AF] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: fontHeading }}>NHẬN BÁO CÁO THỊ TRƯỜNG</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">Đăng ký email để nhận báo cáo phân tích bất động sản công nghiệp hàng quý từ đội ngũ chuyên gia của chúng tôi.</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Đăng ký nhận báo cáo thị trường BĐS công nghiệp thành công!');
              (e.currentTarget.elements[0] as HTMLInputElement).value = '';
            }}
            className="flex flex-col sm:flex-row justify-center max-w-md mx-auto"
          >
            <input required type="email" placeholder="Nhập email doanh nghiệp..." className="px-4 py-3 border border-gray-300 w-full focus:outline-none focus:border-[#1E40AF]" />
            <button type="submit" className="bg-[#1E40AF] text-white px-6 py-3 font-bold uppercase whitespace-nowrap hover:bg-[#0F172A] transition-colors mt-2 sm:mt-0 cursor-pointer">
              Đăng Ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  const renderProjects = () => {
    // Filter logic
    const filtered = PROJECTS_DATA.filter(proj => {
      const matchesSearch = proj.title.toLowerCase().includes(searchProjectQuery.toLowerCase()) || 
                            proj.loc.toLowerCase().includes(searchProjectQuery.toLowerCase());
      const matchesType = filterProjectType === 'Tất cả loại hình' || proj.type === filterProjectType;
      const matchesRegion = filterProjectRegion === 'Mọi khu vực' || proj.region === filterProjectRegion;
      return matchesSearch && matchesType && matchesRegion;
    });

    return (
      <div className="py-20 bg-gray-50">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>TÌM KIẾM DỰ ÁN</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Khám phá các cụm công nghiệp, nhà xưởng và kho logistics với bộ lọc chi tiết thực tế.</p>
          </div>
          
          {/* SEARCH FILTER BOX */}
          <div className="bg-white p-6 shadow-md mb-8 border-t-4 border-[#1E40AF]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Tên dự án / Vị trí</label>
                <input 
                  type="text" 
                  value={searchProjectQuery}
                  onChange={(e) => setSearchProjectQuery(e.target.value)}
                  placeholder="Gõ từ khóa..." 
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50 text-gray-800 rounded-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Loại hình</label>
                <select 
                  value={filterProjectType}
                  onChange={(e) => setFilterProjectType(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50 text-gray-800 rounded-sm"
                >
                  <option>Tất cả loại hình</option>
                  <option>Đất công nghiệp</option>
                  <option>Nhà xưởng</option>
                  <option>Kho bãi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Khu vực</label>
                <select 
                  value={filterProjectRegion}
                  onChange={(e) => setFilterProjectRegion(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#1E40AF] bg-gray-50 text-gray-800 rounded-sm"
                >
                  <option>Mọi khu vực</option>
                  <option>Miền Bắc</option>
                  <option>Miền Nam</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    const el = document.getElementById('projects-list');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#1E40AF] text-white font-bold p-3.5 hover:bg-[#0F172A] transition-colors flex justify-center items-center rounded-sm cursor-pointer shadow-md"
                >
                  <Search className="w-5 h-5 mr-2" /> TÌM KIẾM ({filtered.length})
                </button>
              </div>
            </div>
          </div>

          {/* PROJECT LIST */}
          {filtered.length === 0 ? (
            <div className="bg-white p-12 text-center shadow border border-gray-200">
              <p className="text-gray-500 text-lg">Không tìm thấy dự án phù hợp với bộ lọc của bạn.</p>
              <button 
                onClick={() => {
                  setSearchProjectQuery('');
                  setFilterProjectType('Tất cả loại hình');
                  setFilterProjectRegion('Mọi khu vực');
                }}
                className="mt-4 text-[#1E40AF] font-bold hover:underline"
              >
                Reset bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map((prop) => (
                <div key={prop.id} className="bg-white shadow-lg group overflow-hidden border border-gray-200 hover:border-[#1E40AF] transition-all flex flex-col justify-between rounded-sm">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 bg-[#F59E0B] text-[#0F172A] text-xs font-black px-3 py-1 uppercase tracking-wider">
                        {prop.area}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#1E40AF] transition-colors" style={{ fontFamily: fontHeading }}>{prop.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-600 text-sm font-medium">
                          <MapPin className="w-4 h-4 mr-1 text-[#1E40AF]" /> {prop.loc} ({prop.region})
                        </div>
                        <div className="font-bold text-[#1E40AF]">{prop.price}</div>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-3 mb-6">{prop.desc}</p>
                      <div className="flex gap-2 mb-6 flex-wrap">
                        {prop.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 font-semibold border border-gray-200">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button 
                      onClick={() => setSelectedProject(prop)}
                      className="bg-[#0F172A] text-white font-bold text-sm uppercase px-4 py-3 w-full hover:bg-[#F59E0B] hover:text-[#0F172A] transition-colors"
                    >
                      Chi Tiết Dự Án
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="py-20 bg-white">
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>VỀ CHÚNG TÔI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Kiến tạo hạ tầng công nghiệp vững chắc cho tương lai.</p>
        </div>

        {/* Vision & Mission */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" alt="Corporate" className="w-full shadow-lg rounded" />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">TẦM NHÌN & SỨ MỆNH</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">Chúng tôi hướng đến việc trở thành nhà phát triển bất động sản công nghiệp hàng đầu khu vực, cung cấp các giải pháp không gian nhà máy thông minh, thân thiện với môi trường và tối ưu hóa chi phí.</p>
            <p className="text-gray-600 mb-6 leading-relaxed">Với hơn 25 năm kinh nghiệm, chúng tôi tự hào mang đến môi trường sinh thái công nghiệp hoàn thiện, giúp các doanh nghiệp tập trung tối đa vào sản xuất và kinh doanh.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 border-l-4 border-[#1E40AF]">
                <h4 className="font-bold text-xl text-[#0F172A]">25+</h4>
                <p className="text-sm text-gray-500">Năm Kinh Nghiệm</p>
              </div>
              <div className="p-4 bg-gray-50 border-l-4 border-[#F59E0B]">
                <h4 className="font-bold text-xl text-[#0F172A]">200+</h4>
                <p className="text-sm text-gray-500">Khách Hàng FDI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#0F172A] text-center mb-12" style={{ fontFamily: fontHeading }}>LỊCH SỬ PHÁT TRIỂN</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {MILESTONE_DATA.map((stone, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded border border-gray-200 relative">
                <div className="text-3xl font-black text-[#1E40AF] mb-2">{stone.year}</div>
                <h4 className="font-bold text-lg text-[#0F172A] mb-2">{stone.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{stone.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20 py-16 bg-gray-50 -mx-4 px-4 border-y border-gray-200">
          <div className={`${MAX_W} mx-auto`}>
            <h3 className="text-2xl font-bold text-[#0F172A] text-center mb-12" style={{ fontFamily: fontHeading }}>GIÁ TRỊ CỐT LÕI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Chất Lượng Quốc Tế", desc: "Tất cả công trình xây dựng và quy hoạch hạ tầng đều tuân thủ các quy chuẩn xây dựng và quản lý quốc tế nghiêm ngặt nhất." },
                { title: "Bền Vững ESG", desc: "Tiên phong ứng dụng năng lượng xanh, xử lý chất thải tuần hoàn và tối ưu hóa không gian xanh công nghiệp." },
                { title: "Hỗ Trợ Trọn Gói", desc: "Đồng hành cùng đối tác FDI từ khâu xin giấy phép đầu tư, xây dựng nhà xưởng đến tuyển dụng nhân sự vận hành." }
              ].map((val, idx) => (
                <div key={idx} className="bg-white p-8 rounded shadow-sm border border-gray-150">
                  <h4 className="font-bold text-lg text-[#0F172A] mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#F59E0B] mr-2" /> {val.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Leadership */}
        <div>
          <h3 className="text-2xl font-bold text-[#0F172A] text-center mb-12" style={{ fontFamily: fontHeading }}>BAN LÃNH ĐẠO CHỦ CHỐT</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADER_DATA.map((leader, idx) => (
              <div key={idx} className="text-center group bg-white border border-gray-200 p-6 rounded shadow-sm hover:shadow-md transition-shadow">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-32 h-32 rounded-full mx-auto object-cover mb-4 group-hover:scale-105 transition-transform" />
                <h4 className="font-bold text-lg text-[#0F172A]">{leader.name}</h4>
                <p className="text-sm text-[#1E40AF] font-semibold mb-2">{leader.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGallery = () => {
    const filteredImages = selectedGalleryTab === 'Tất cả' 
      ? GALLERY_DATA 
      : GALLERY_DATA.filter(img => img.cat === selectedGalleryTab);

    return (
      <div className="py-20 bg-gray-50">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>THƯ VIỆN HÌNH ẢNH</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hình ảnh thực tế về hệ thống nhà xưởng, kho bãi và hạ tầng tiện ích tại các dự án.</p>
            
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Tất cả', 'Nhà xưởng', 'Kho bãi', 'Hạ tầng', 'Tiện ích'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setSelectedGalleryTab(tab)}
                  className={`px-4 py-2 font-bold rounded text-sm transition-all ${
                    selectedGalleryTab === tab 
                      ? 'bg-[#1E40AF] text-white shadow' 
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredImages.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedGalleryImg(item.img)}
                className="relative aspect-square overflow-hidden group cursor-pointer border border-gray-200 rounded bg-white shadow-sm"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex flex-col justify-end p-4">
                  <Maximize className="text-white opacity-0 group-hover:opacity-100 w-6 h-6 absolute top-4 right-4" />
                  <span className="text-white font-bold text-xs uppercase bg-[#F59E0B] px-2 py-0.5 self-start mb-1 rounded">{item.cat}</span>
                  <h4 className="text-white font-bold text-sm truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = NEWS_DATA.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) || 
                            art.content.toLowerCase().includes(searchNewsQuery.toLowerCase());
      return matchesSearch;
    });

    return (
      <div className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: fontHeading }}>TIN TỨC B2B & BÁO CÁO</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Thông tin thị trường, chính sách đầu tư và các bài viết phân tích B2B từ chuyên gia.</p>
          </div>

          {/* Search bar for news */}
          <div className="max-w-md mx-auto mb-10 flex border border-gray-300 rounded overflow-hidden shadow-sm">
            <input 
              type="text" 
              value={searchNewsQuery}
              onChange={(e) => setSearchNewsQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..." 
              className="flex-1 px-4 py-2.5 focus:outline-none text-gray-800 text-sm" 
            />
            <div className="bg-gray-100 px-4 py-2 border-l border-gray-300 text-gray-500 flex items-center">
              <Search className="w-5 h-5" />
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Không tìm thấy bài viết nào phù hợp.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNews.map((news) => (
                <div key={news.id} className="flex flex-col sm:flex-row gap-6 border border-gray-200 p-4 hover:shadow-lg transition-shadow bg-gray-50 rounded">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full sm:w-48 h-48 sm:h-36 object-cover rounded flex-shrink-0" />
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#1E40AF] font-bold text-xs bg-blue-100 px-2.5 py-0.5 rounded">{news.cat}</span>
                        <span className="text-gray-500 text-xs font-semibold">{news.date}</span>
                      </div>
                      <h3 
                        onClick={() => setSelectedArticle(news)}
                        className="text-lg font-bold text-[#0F172A] hover:text-[#1E40AF] cursor-pointer line-clamp-2"
                      >
                        {news.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{news.content}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedArticle(news)}
                      className="text-[#1E40AF] font-bold text-sm uppercase flex items-center hover:text-[#F59E0B] transition-colors mt-4 self-start"
                    >
                      Đọc Bài Viết <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    return (
      <div className="py-20 bg-gray-50">
        <div className={`${MAX_W} px-4`}>
          <div className="bg-white shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden border border-gray-200 rounded">
            <div className="md:w-1/3 bg-[#0F172A] text-white p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 text-[#F59E0B]">THÔNG TIN LIÊN HỆ</h3>
              <p className="mb-8 text-gray-300 text-sm leading-relaxed">Hãy liên hệ với bộ phận CSKH B2B để nhận thông tin chi tiết và bản vẽ quy hoạch 1/500 dự án.</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Tầng 15, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Q.1, TP.HCM</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-[#F59E0B]" />
                  <span className="text-sm">+84 90 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-[#F59E0B]" />
                  <span className="text-sm">b2b@platformbds.vn</span>
                </div>
              </div>

              {/* Interactive Google Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-slate-700 shadow-md flex flex-col h-48 bg-slate-900">
                <div className="px-3 py-1.5 bg-slate-800 text-white flex items-center justify-between text-[11px]">
                  <span className="font-bold truncate">Bitexco Financial Tower, Q.1</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+Qu%E1%BA%ADn+1,+TP.HCM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-[#F59E0B] text-slate-900 font-black text-[10px] shrink-0"
                  >
                    Mở Maps
                  </a>
                </div>
                <div className="flex-1 w-full h-full">
                  <iframe
                    title="Bản đồ KCN Bitexco"
                    src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-10 bg-white">
              {contactSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">ĐÃ GỬI YÊU CẦU THÀNH CÔNG</h3>
                  <p className="text-gray-600 mb-6 font-medium">Chuyên viên tư vấn B2B sẽ phản hồi thông tin chi tiết đến bạn trong vòng 2 giờ làm việc.</p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="bg-[#1E40AF] text-white font-bold px-6 py-2.5 rounded hover:bg-[#0F172A] transition-colors"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-6">GỬI YÊU CẦU TƯ VẤN DỰ ÁN</h3>
                  <form 
                    className="space-y-4" 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      setContactSubmitted(true); 
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Họ và Tên *" required className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded" />
                      <input type="text" placeholder="Tên Doanh Nghiệp *" required className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="tel" placeholder="Số Điện Thoại *" required className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded" />
                      <input type="email" placeholder="Email *" required className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded" />
                    </div>
                    <select required className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded">
                      <option value="">Chọn loại hình bạn quan tâm *</option>
                      <option>Thuê xưởng xây sẵn (RBF)</option>
                      <option>Thuê đất công nghiệp có hạ tầng</option>
                      <option>Kho Logistics chuyên dụng</option>
                    </select>
                    <textarea placeholder="Nội dung yêu cầu chi tiết (vị trí cần thuê, diện tích, công suất điện mong muốn...)..." rows={4} className="w-full p-3 border border-gray-300 focus:border-[#1E40AF] outline-none text-gray-800 bg-gray-50 rounded"></textarea>
                    <button type="submit" className="bg-[#1E40AF] text-white px-8 py-3.5 font-bold hover:bg-[#F59E0B] hover:text-[#0F172A] transition-colors uppercase tracking-widest w-full md:w-auto rounded-sm">
                      Gửi Yêu Cầu
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" style={{ fontFamily: fontBody }}>
      {renderTopBar()}
      {renderHeader()}
      
      <main className="flex-grow">
        {['home'].includes(activePage) && renderHome()}
        {['projects', 'du-an', 'san-pham', 'kho-xuong'].includes(activePage) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(activePage) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(activePage) && renderGallery()}
        {['news', 'tin-tuc', 'bai-viet'].includes(activePage) && renderNews()}
        {['contact', 'lien-he', 'tu-van'].includes(activePage) && renderContact()}
        {!['home', 'projects', 'du-an', 'san-pham', 'kho-xuong', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(activePage) && renderHome()}
      </main>

      {/* 17. FOOTER */}
      <footer className="bg-[#020617] text-gray-400 py-16 text-sm">
        <div className={`${MAX_W} px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12`}>
          <div>
            <div className="flex items-center mb-6">
              <Factory className="w-8 h-8 text-[#F59E0B] mr-3" />
              <div>
                <h1 className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: fontHeading }}>PLATFORM<span className="text-[#F59E0B]">BDS</span></h1>
              </div>
            </div>
            <p className="mb-6 leading-relaxed">Nhà phát triển bất động sản công nghiệp uy tín, cung cấp giải pháp không gian tối ưu cho doanh nghiệp FDI tại Việt Nam.</p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-blue-600 text-white transition-colors cursor-pointer rounded-lg">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-[#0068FF] text-white transition-colors cursor-pointer rounded-lg p-2">
                <ZaloIcon className="w-full h-full" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-blue-700 text-white transition-colors cursor-pointer rounded-lg">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-red-600 text-white transition-colors cursor-pointer rounded-lg">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6" style={{ fontFamily: fontHeading }}>DỊCH VỤ B2B</h4>
            <ul className="space-y-3">
              <li><button onClick={() => { setActivePage('projects'); setFilterProjectType('Đất công nghiệp'); }} className="hover:text-[#F59E0B] transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Cho Thuê Đất Công Nghiệp</button></li>
              <li><button onClick={() => { setActivePage('projects'); setFilterProjectType('Nhà xưởng'); }} className="hover:text-[#F59E0B] transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Nhà Xưởng Xây Sẵn (RBF)</button></li>
              <li><button onClick={() => { setActivePage('projects'); setFilterProjectType('Kho bãi'); }} className="hover:text-[#F59E0B] transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Kho Vận Logistics</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#F59E0B] transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Dịch Vụ Tư Vấn Pháp Lý IRC/ERC</button></li>
              <li><button onClick={() => setActivePage('about')} className="hover:text-[#F59E0B] transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Quản Lý Hạ Tầng KCN</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6" style={{ fontFamily: fontHeading }}>DỰ ÁN NỔI BẬT</h4>
            <ul className="space-y-3">
              <li><button onClick={() => { setActivePage('projects'); setSearchProjectQuery('VSIP'); }} className="hover:text-[#F59E0B] transition-colors flex items-center text-left"><ChevronRight className="w-4 h-4 mr-2" /> VSIP Bình Dương</button></li>
              <li><button onClick={() => { setActivePage('projects'); setSearchProjectQuery('Nam Đình Vũ'); }} className="hover:text-[#F59E0B] transition-colors flex items-center text-left"><ChevronRight className="w-4 h-4 mr-2" /> KCN Nam Đình Vũ - Hải Phòng</button></li>
              <li><button onClick={() => { setActivePage('projects'); setSearchProjectQuery('Phú Mỹ'); }} className="hover:text-[#F59E0B] transition-colors flex items-center text-left"><ChevronRight className="w-4 h-4 mr-2" /> KCN Phú Mỹ - Vũng Tàu</button></li>
              <li><button onClick={() => { setActivePage('projects'); setSearchProjectQuery('AMATA'); }} className="hover:text-[#F59E0B] transition-colors flex items-center text-left"><ChevronRight className="w-4 h-4 mr-2" /> KCN AMATA - Đồng Nai</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6" style={{ fontFamily: fontHeading }}>LIÊN HỆ TRỤ SỞ</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com/?q=Bitexco+2+Hai+Trieu+Quan+1+TPHCM" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 mr-3 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span>Tầng 15, Tòa nhà Bitexco Financial Tower, Số 2 Hải Triều, Q.1, TP.HCM</span>
                </a>
              </li>
              <li>
                <a href="tel:0919006030" className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-[#F59E0B] flex-shrink-0" />
                  <span className="whitespace-nowrap">0919 006 030 (Hotline Đầu Tư)</span>
                </a>
              </li>
              <li>
                <a href="mailto:invest@aireviewbds.com" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-5 h-5 mr-3 text-[#F59E0B] flex-shrink-0" />
                  <span>invest@aireviewbds.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TEMPLATES BDS - Industrial Division. All rights reserved.</p>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white pr-10">
                <span className="bg-[#F59E0B] text-[#0F172A] text-xs font-black px-2.5 py-1 uppercase rounded mb-2 inline-block">
                  {selectedProject.type}
                </span>
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200 text-sm font-semibold text-gray-600">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-[#1E40AF]" /> {selectedProject.loc}</span>
                <span>Quy mô: {selectedProject.area}</span>
                <span className="text-[#1E40AF]">{selectedProject.price}</span>
              </div>

              <h4 className="font-bold text-lg mb-2 text-[#0F172A]">MÔ TẢ CHI TIẾT</h4>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{selectedProject.desc}</p>

              <h4 className="font-bold text-lg mb-3 text-[#0F172A]">THÔNG SỐ HẠ TẦNG KỸ THUẬT</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-bold text-gray-700 block">⚡ Trạm điện:</span>
                  <span className="text-gray-600">{selectedProject.specs.power}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-bold text-gray-700 block">💧 Nguồn nước:</span>
                  <span className="text-gray-600">{selectedProject.specs.water}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-bold text-gray-700 block">🌀 Xử lý nước thải:</span>
                  <span className="text-gray-600">{selectedProject.specs.waste}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-bold text-gray-700 block">🚒 Hệ thống PCCC:</span>
                  <span className="text-gray-600">{selectedProject.specs.fire}</span>
                </div>
              </div>

              <div className="bg-[#0F172A] text-white p-6 rounded text-center">
                <h4 className="font-bold text-lg mb-2 text-[#F59E0B]">ĐĂNG KÝ NHẬN BÁO GIÁ DỰ ÁN</h4>
                <p className="text-xs text-gray-400 mb-4">Để lại email, chúng tôi sẽ gửi tài liệu quy hoạch & bảng báo giá chi tiết trong vòng 1 giờ.</p>
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    alert('Yêu cầu báo giá đã gửi thành công!'); 
                    setSelectedProject(null); 
                  }} 
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input type="email" placeholder="Email doanh nghiệp của bạn..." required className="flex-grow p-3 rounded text-gray-800 text-sm focus:outline-none" />
                  <button type="submit" className="bg-[#1E40AF] px-6 py-3 font-bold text-sm uppercase hover:bg-[#F59E0B] hover:text-[#0F172A] transition-colors rounded">Đăng Ký</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {selectedGalleryImg && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[99999] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <button onClick={() => setSelectedGalleryImg(null)} className="absolute top-4 right-4 text-white hover:text-[#F59E0B] cursor-pointer">
            <X className="w-8 h-8" />
          </button>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Lightbox Preview" className="max-w-full max-h-[85vh] object-contain rounded" />
        </div>
      )}

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#1E40AF] font-bold text-xs bg-blue-100 px-2.5 py-0.5 rounded">{selectedArticle.cat}</span>
                <span className="text-gray-500 text-xs font-semibold">{selectedArticle.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6 leading-tight" style={{ fontFamily: fontHeading }}>{selectedArticle.title}</h2>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-80 object-cover rounded mb-6" />
              <div className="text-gray-700 leading-relaxed space-y-4 text-sm md:text-base">
                <p className="font-semibold text-gray-900">{selectedArticle.content}</p>
                <p>Hệ sinh thái công nghiệp đang chuyển dịch mạnh mẽ theo hướng bền vững. Việc các tập đoàn FDI lớn yêu cầu khắt khe về chứng chỉ xanh (LEED, Lotus, Edge) và sử dụng năng lượng tái chế đang thúc đẩy các chủ đầu tư Việt Nam phải cải tiến hạ tầng, chuyển đổi số toàn diện các khâu vận hành KCN.</p>
                <p>PlatformBDS cam kết đồng hành cùng các nhà đầu tư thứ cấp bằng việc cung cấp hạ tầng công nghệ và giải pháp tư vấn ưu đãi thuế tối đa, giúp doanh nghiệp thiết lập nhà máy nhanh chóng và đi vào sản xuất hiệu quả.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

