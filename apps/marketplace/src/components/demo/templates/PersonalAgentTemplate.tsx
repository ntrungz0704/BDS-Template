import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, CheckCircle2, 
  Search, Star, TrendingUp, Award, Clock, ArrowRight,
  Shield, Building, Home, Briefcase, Key, ChevronDown, ChevronUp,
  Instagram, Facebook, Linkedin, Twitter, Quote, ArrowUpRight,
  Calendar
} from 'lucide-react';
import { MAX_W } from '../design-system';

const mockListings = [
  {
    id: 1,
    title: 'The River Thủ Thiêm',
    loc: 'Quận 2, TP.Thủ Đức',
    region: 'Quận 2',
    priceNum: 28.5,
    priceStr: '28.5 Tỷ',
    specs: '4 PN • 3 WC • 210m²',
    type: 'Penthouse',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true,
    desc: 'Căn hộ Penthouse đẳng cấp tại The River Thủ Thiêm với tầm nhìn triệu đô trực diện sông Sài Gòn và trung tâm Quận 1. Thiết kế sang trọng với thang máy riêng và hồ bơi tràn bờ.'
  },
  {
    id: 2,
    title: 'Holm Villas Thảo Điền',
    loc: 'Thảo Điền, TP.Thủ Đức',
    region: 'Quận 2',
    priceNum: 115,
    priceStr: '115 Tỷ',
    specs: '5 PN • 6 WC • 400m²',
    type: 'Biệt Thự',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    featured: true,
    desc: 'Biệt thự compound khép kín ven sông Thảo Điền cao cấp bậc nhất. Không gian yên tĩnh, an ninh bảo vệ 24/7, có bến du thuyền riêng và sân vườn rộng rãi.'
  },
  {
    id: 3,
    title: 'Grand Marina Saigon',
    loc: 'Quận 1, TP.HCM',
    region: 'Quận 1',
    priceNum: 45,
    priceStr: '45 Tỷ',
    specs: '3 PN • 3 WC • 165m²',
    type: 'Căn Hộ Hạng Sang',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    featured: true,
    desc: 'Căn hộ hàng hiệu Marriott lớn nhất thế giới tọa lạc tại vị trí vàng Ba Son Quận 1. Đầy đủ các tiện ích chuẩn khách sạn 5 sao cao cấp nhất.'
  },
  {
    id: 4,
    title: 'Vinhomes Golden River',
    loc: 'Quận 1, TP.HCM',
    region: 'Quận 1',
    priceNum: 18.2,
    priceStr: '18.2 Tỷ',
    specs: '2 PN • 2 WC • 85m²',
    type: 'Căn Hộ Hạng Sang',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: false,
    desc: 'Căn hộ view sông và công viên tuyệt đẹp tại Vinhomes Golden River. Đầy đủ nội thất cao cấp nhập khẩu từ Đức, ban công rộng rãi đón gió tự nhiên.'
  },
  {
    id: 5,
    title: 'Chateau Villa Phú Mỹ Hưng',
    loc: 'Quận 7, TP.HCM',
    region: 'Quận 7',
    priceNum: 160,
    priceStr: '160 Tỷ',
    specs: '6 PN • 7 WC • 520m²',
    type: 'Biệt Thự',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: true,
    desc: 'Biệt thự lâu đài lâu đời Chateau Phú Mỹ Hưng. Kiến trúc bán cổ điển Châu Âu quý phái, vị trí góc ven sông biệt lập, khẳng định vị thế chủ nhân.'
  },
  {
    id: 6,
    title: 'Empire City Tilia',
    loc: 'Thủ Thiêm, TP.Thủ Đức',
    region: 'Quận 2',
    priceNum: 12.5,
    priceStr: '12.5 Tỷ',
    specs: '2 PN • 2 WC • 98m²',
    type: 'Căn Hộ Hạng Sang',
    img: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    featured: false,
    desc: 'Căn hộ Tilia Residences tại Empire City Thủ Thiêm. Thiết kế hiện đại tối ưu công năng, ban công hướng sông Sài Gòn, giao thông kết nối Quận 1 chỉ 5 phút.'
  },
  {
    id: 7,
    title: 'Shophouse Metropole Thủ Thiêm',
    loc: 'Thủ Thiêm, TP.Thủ Đức',
    region: 'Quận 2',
    priceNum: 68,
    priceStr: '68 Tỷ',
    specs: '1 Trệt 1 Lầu • 280m²',
    type: 'Đầu Tư Thương Mại',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    featured: false,
    desc: 'Căn Shophouse vị trí cực đẹp ngay chân cầu Thủ Thiêm 2, tiện làm showroom, ngân hàng hoặc cho chuỗi cafe thương hiệu thuê dòng tiền ổn định.'
  }
];

const mockArticles = [
  {
    id: 1,
    title: 'Nhận định thị trường BĐS Thủ Thiêm Quý 4/2026',
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    date: '15/10/2026',
    cat: 'Thị Trường',
    desc: 'Phân tích xu hướng biến động giá căn hộ và đất nền tại bán đảo Thủ Thiêm trong giai đoạn cuối năm 2026 khi hạ tầng giao thông tiếp tục hoàn thiện.',
    content: 'Trong quý 4/2026, thị trường bất động sản Thủ Thiêm ghi nhận sự tăng trưởng ổn định nhờ sự kết nối đồng bộ của các tuyến đường chính. Giá căn hộ hạng sang tiếp tục thiết lập mặt bằng giá mới với sự xuất hiện của các phân khúc cao cấp từ các chủ đầu tư ngoại...\n\nSự gia tăng nhu cầu sở hữu bất động sản tại đây không chỉ xuất phát từ người mua ở thực mà còn từ các nhà đầu tư tổ chức nước ngoài. Điều này đảm bảo tính thanh khoản cực cao cho phân khúc cao cấp trong vòng 3-5 năm tới.'
  },
  {
    id: 2,
    title: 'Kinh nghiệm chọn mua Penthouse để không "tiền mất tật mang"',
    img: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80',
    date: '02/10/2026',
    cat: 'Đầu Tư',
    desc: 'Những lưu ý quan trọng về pháp lý, chiều cao trần, thang máy chuyên biệt và hệ thống phòng cháy chữa cháy khi chọn mua Penthouse cao cấp.',
    content: 'Sở hữu một căn penthouse là niềm mơ ước của nhiều người, thể hiện đẳng cấp thượng lưu. Tuy nhiên, để tránh những rủi ro đáng tiếc, người mua cần chú trọng đến các yếu tố kỹ thuật như hệ thống cách âm, khả năng chống thấm dột tầng mái, và quyền sử dụng khoảng sân vườn ngoài trời...\n\nĐặc biệt, pháp lý của phần không gian sân vườn này cần được làm rõ trong hợp đồng mua bán để tránh tranh chấp với ban quản trị hoặc các cư dân khác sau này.'
  },
  {
    id: 3,
    title: 'Xuuyên thế sống xanh trong các dự án hạng sang 2027',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    date: '28/09/2026',
    cat: 'Phong Cách Sống',
    desc: 'Sự dịch chuyển của giới thượng lưu hướng đến không gian sống sinh thái, tiết kiệm năng lượng và chăm sóc sức khỏe toàn diện ngay tại nhà.',
    content: 'Không còn chỉ chú trọng vào sự xa hoa lộng lẫy, người mua bất động sản cao cấp hiện nay đòi hỏi sự kết hợp hài hòa với thiên nhiên. Các tiêu chuẩn công trình xanh như LEED hay EDGE ngày càng được ưa chuộng, tích hợp không gian lọc không khí, hồ bơi điện phân muối...\n\nMột ngôi nhà đạt chuẩn xanh không chỉ giúp nâng cao sức khỏe cho cả gia đình mà còn giúp tiết kiệm đáng kể chi phí vận hành và làm gia tăng giá trị tài sản bền vững theo thời gian.'
  },
  {
    id: 4,
    title: 'Lại suất vay mua nhà giảm: Có nên đầu tư BĐS lúc này?',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    date: '12/09/2026',
    cat: 'Tài Chính',
    desc: 'Bối cảnh lãi suất vay mua nhà tại các ngân hàng thương mại đang ở mức hấp dẫn nhất trong vòng 5 năm qua. Cơ hội cho người mua ở thực.',
    content: 'Các ngân hàng quốc doanh và tư nhân đồng loạt đưa ra các gói hỗ trợ vay mua nhà với mức lãi suất ưu đãi cố định lên đến 2-3 năm. Đây là thời cơ tốt cho những ai có nguồn thu nhập ổn định và mong muốn tích lũy tài sản dài hạn trước khi thị trường bước vào chu kỳ tăng giá mới.\n\nTuy nhiên, chuyên gia khuyên bạn nên giữ tỷ lệ đòn bẩy tài chính ở mức an toàn dưới 50% giá trị tài sản để phòng ngừa các biến động lãi suất thả nổi trong tương lai.'
  },
  {
    id: 5,
    title: 'Quy hoạch TP.Thủ Đức đến năm 2030 và tác động đến giá trị BĐS',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    date: '05/09/2026',
    cat: 'Quy Hoạch',
    desc: 'Tìm hiểu các trung tâm đô thị sáng tạo mới tại Thủ Đức và hướng dịch chuyển làn sóng đầu tư hạ tầng trong 5 năm tới.',
    content: 'Thủ Đức định hướng phát triển thành trung tâm tài chính và công nghệ cao của khu vực. Việc thành lập các phân khu đô thị chức năng như Trường Thọ, Linh Trung và kết nối metro số 1 hứa hẹn tạo nên đợt bùng nổ nhu cầu nhà ở chất lượng cao cho chuyên gia trong và ngoài nước.\n\nCác dự án bất động sản dọc trục xa lộ Hà Nội và khu vực Thạnh Mỹ Lợi được dự báo sẽ hưởng lợi trực tiếp từ làn sóng hạ tầng này.'
  },
  {
    id: 6,
    title: 'Bí quyết thiết kế nội thất tối giản hiện đại cho căn hộ cao cấp',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    date: '20/08/2026',
    cat: 'Thiết Kế',
    desc: 'Làm thế nào để tạo dựng một không gian sống thanh lịch, tinh tế nhưng vẫn đầy đủ tiện nghi đẳng cấp theo phong cách Japandi và Minimalist.',
    content: 'Thiết kế tối giản không có nghĩa là đơn điệu mà là sự chắt lọc tinh tế nhất từ chất liệu gỗ tự nhiên, đá marble, và ánh sáng. Bằng cách lược bỏ những chi tiết rườm rà, căn hộ của bạn sẽ trở nên thoáng đãng hơn, tôn vinh các tác phẩm nghệ thuật và tầm nhìn rộng mở bên ngoài.\n\nSử dụng nội thất thông minh tích hợp và gam màu trung tính ấm áp (warm neutrals) là chìa khóa để tạo nên một không gian sống vừa tối giản vừa ấm cúng sang trọng.'
  }
];

const mockGalleryPhotos = [
  { id: 1, category: 'Căn Hộ', title: 'Phòng khách The River Thủ Thiêm', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 2, category: 'Biệt Thự', title: 'Khuôn viên Holm Villas Thảo Điền', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80' },
  { id: 3, category: 'Căn Hộ', title: 'Ban công Grand Marina Saigon', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { id: 4, category: 'Bàn Giao', title: 'Bàn giao chìa khóa Vinhomes', img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' },
  { id: 5, category: 'Bàn Giao', title: 'Ký kết hợp đồng Empire City', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
  { id: 6, category: 'Biệt Thự', title: 'Bể bơi Chateau Phú Mỹ Hưng', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
  { id: 7, category: 'Căn Hộ', title: 'Thiết kế bếp hiện đại Tilia', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80' },
  { id: 8, category: 'Bàn Giao', title: 'Đại diện bàn giao Shophouse', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }
];

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

const normalizePersonalAgentPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van', 'dat-lich'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'bat-dong-san'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function PersonalAgentTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [currentPage, setCurrentPageState] = useState(normalizePersonalAgentPage(initialPage));

  useEffect(() => {
    setCurrentPageState(normalizePersonalAgentPage(initialPage));
  }, [initialPage]);
  const setCurrentPage = (p: string) => {
    if (typeof setSelectedProject === "function") setSelectedProject(null);
    if (typeof setSelectedArticle === "function") setSelectedArticle(null);

    setCurrentPageState(p);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', `/demo/${templateSlug}/${p}`);
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownFilters, setDropdownFilters] = useState({
    type: 'all',
    priceRange: 'all',
    region: 'all'
  });
  
  // Modals & Details
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  // Forms & Bookings
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', interest: 'Mua nhà/căn hộ để ở', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  
  const [activeAboutTab, setActiveAboutTab] = useState('Tầm Nhìn');

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // 1. Header
  const renderHeader = () => (
    <header className="sticky top-4 w-full z-50 px-4">
      <div className={`mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between ${MAX_W}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Trần Anh <span className="text-indigo-600">Tuấn</span></span>
        </div>

        {/* Desktop Nav */}
        {!isMobile && !isTablet && (
          <nav className="flex items-center gap-8">
            {[
              { id: 'home', label: 'Trang chủ' },
              { id: 'projects', label: 'Dự án' },
              { id: 'about', label: 'Về tôi' },
              { id: 'gallery', label: 'Thư viện' },
              { id: 'news', label: 'Tin tức' },
              { id: 'contact', label: 'Liên hệ' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {!isMobile && !isTablet && (
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Phone size={16} />
            090 123 4567
          </button>
        )}

        {(isMobile || isTablet) && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {(isMobile || isTablet) && isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4">
          {[
            { id: 'home', label: 'Trang chủ' },
            { id: 'projects', label: 'Dự án' },
            { id: 'about', label: 'Về tôi' },
            { id: 'gallery', label: 'Thư viện' },
            { id: 'news', label: 'Tin tức' },
            { id: 'contact', label: 'Liên hệ' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`text-left text-lg font-medium p-2 rounded-lg ${
                currentPage === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => navigateTo('contact')}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl text-base font-medium mt-2 flex justify-center items-center gap-2"
          >
            <Phone size={18} />
            Gọi ngay 090 123 4567
          </button>
        </div>
      )}
    </header>
  );

  // 16. Footer
  const renderFooter = () => (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className={`mx-auto px-4 ${MAX_W}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Trần Anh Tuấn</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Chuyên gia tư vấn bất động sản cao cấp, mang đến giải pháp an cư và đầu tư sinh lời vượt trội cho khách hàng tại thị trường TP.HCM.
            </p>
            <div className="flex gap-4">
              <button onClick={() => alert('Mở Facebook')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                <Facebook size={18} />
              </button>
              <button onClick={() => alert('Mở Instagram')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                <Instagram size={18} />
              </button>
              <button onClick={() => alert('Mở LinkedIn')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                <Linkedin size={18} />
              </button>
              <button onClick={() => alert('Mở Twitter')} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
              {['Trang chủ', 'Dự án nổi bật', 'Về tôi', 'Góc chuyên gia', 'Liên hệ'].map((item, i) => (
                <li key={i}>
                  <button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2">
                    <ChevronRight size={14} /> {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Khu Vực Phụ Trách</h4>
            <ul className="space-y-3">
              {['Quận 1 - Trung tâm', 'Quận 2 - Thủ Thiêm', 'Quận 7 - Phú Mỹ Hưng', 'Bình Thạnh - Riverside', 'TP Thủ Đức'].map((item, i) => (
                <li key={i}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <MapPin size={14} className="text-indigo-500" /> {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">Tầng 12, Tòa nhà Bitexco, Số 2 Hải Triều, Bến Nghé, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-indigo-500 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">090 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-indigo-500 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">tuan.tran@luxuryhomes.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-indigo-500 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">T2 - CN: 8:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; 2024 Trần Anh Tuấn Real Estate. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-500 text-sm hover:text-white cursor-pointer">Chính sách bảo mật</span>
            <span className="text-gray-500 text-sm hover:text-white cursor-pointer">Điều khoản dịch vụ</span>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderHomePage = () => (
    <div className="bg-white">
      {/* 2. Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-indigo-50 rounded-bl-[100px] transform translate-x-1/4"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        
        <div className={`mx-auto px-4 w-full relative z-10 ${MAX_W}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left mt-12 lg:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-6">
                <Star size={16} fill="currentColor" />
                Chuyên gia tư vấn BĐS cao cấp
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">tổ ấm</span>,<br />
                Đầu tư <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">tương lai</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Đồng hành cùng bạn trong mọi quyết định mua bán bất động sản. Từ những căn hộ sang trọng đến biệt thự đẳng cấp, tôi cam kết mang lại giá trị thực cho từng khách hàng.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <button onClick={() => navigateTo('projects')} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
                  Xem Dự Án <ArrowUpRight size={20} />
                </button>
                <button onClick={() => navigateTo('contact')} className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-indigo-600 transition-all flex items-center justify-center gap-2">
                  Liên Hệ Tư Vấn <Phone size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                  alt="Trần Anh Tuấn - Agent" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <p className="text-2xl font-bold mb-1">Trần Anh Tuấn</p>
                    <p className="text-indigo-300 font-medium text-sm">CEO & Founder tại Luxury Homes</p>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-xl hidden md:flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-xs text-gray-500 font-medium">Giao dịch thành công</p>
                </div>
              </div>
              
              <div className="absolute bottom-20 -right-10 bg-white p-4 rounded-xl shadow-xl hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-xs text-gray-500 font-medium">Đánh giá khách hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section className="bg-indigo-900 py-16 text-white relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { value: '10+', label: 'Năm Kinh Nghiệm' },
            { value: '500+', label: 'Giao Dịch Thành Công' },
            { value: '1.2T+', label: 'Tổng Giá Trị (VND)' },
            { value: '300+', label: 'Khách Hàng Thân Thiết' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white mb-2">{stat.value}</p>
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Specializations */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Chuyên Môn</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lĩnh Vực Trọng Tâm</h3>
            <p className="text-gray-600 text-lg">Tôi tập trung vào các phân khúc bất động sản cao cấp, mang lại trải nghiệm sống đỉnh cao và tiềm năng đầu tư sinh lời vượt trội.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Home size={40} className="text-indigo-600" />,
                title: 'Biệt Thự Hạng Sang',
                desc: 'Khám phá bộ sưu tập biệt thự ven sông, biệt thự compound với không gian sống biệt lập, an ninh tuyệt đối tại các khu vực đắc địa.',
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
              },
              {
                icon: <Building size={40} className="text-indigo-600" />,
                title: 'Căn Hộ Penthouse',
                desc: 'Tận hưởng tầm nhìn panorama ôm trọn thành phố với các siêu phẩm Penthouse, Duplex tại trung tâm tài chính và khu đô thị mới.',
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
              },
              {
                icon: <TrendingUp size={40} className="text-indigo-600" />,
                title: 'Đầu Tư Thương Mại',
                desc: 'Tư vấn chiến lược danh mục đầu tư bất động sản thương mại: Shophouse, tòa nhà văn phòng với tỷ suất sinh lời ổn định và tiềm năng tăng giá.',
                img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'
              }
            ].map((spec, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={spec.img} alt={spec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-10 left-8 bg-white p-3 rounded-xl shadow-md">
                    {spec.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mt-4 mb-3">{spec.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{spec.desc}</p>
                  <button onClick={() => navigateTo('projects')} className="text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Tìm hiểu thêm <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Listings */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Bất Động Sản Nổi Bật</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Danh Mục Đầu Tư Phân Bổ</h3>
            </div>
            <button onClick={() => navigateTo('projects')} className="px-6 py-3 border border-gray-200 rounded-full font-medium hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center gap-2">
              Xem tất cả <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockListings.slice(0, 3).map((listing, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={listing.img} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {listing.type}
                  </div>
                  {listing.featured && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Độc Quyền
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-2xl font-bold mb-1 drop-shadow-md">{listing.priceStr}</h4>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 truncate hover:text-indigo-600 cursor-pointer" onClick={() => setSelectedProject(listing)}>{listing.title}</h4>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                    <MapPin size={16} /> {listing.loc}
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-medium text-gray-700">
                    <span>{listing.specs}</span>
                    <button onClick={() => setSelectedProject(listing)} className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About Agent */}
      <section className="py-24 bg-indigo-50">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" 
                  alt="About Agent" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-8 lg:-right-12 bg-white p-6 rounded-2xl shadow-xl z-20">
                <p className="text-4xl font-extrabold text-indigo-600 mb-1">10+</p>
                <p className="text-gray-900 font-bold mb-2">Năm Kinh Nghiệm</p>
                <p className="text-sm text-gray-500">Trong thị trường BĐS hạng sang</p>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply opacity-50 z-0 blur-2xl"></div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Câu Chuyện Của Tôi</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Đam mê kiến tạo không gian sống hoàn mỹ</h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Chào bạn, tôi là Trần Anh Tuấn. Khởi nghiệp từ năm 2013 với niềm đam mê cháy bỏng dành cho kiến trúc và không gian sống, tôi đã có hơn một thập kỷ đắm mình trong phân khúc bất động sản hạng sang.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Triết lý của tôi rất đơn giản: <strong>"Bán nhà không chỉ là bán những bức tường, mà là bán phong cách sống và tầm nhìn tương lai."</strong> Tôi luôn đặt mình vào vị trí của khách hàng để tìm kiếm những tài sản phù hợp nhất với nhu cầu, sở thích và định hướng tài chính.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <Award size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Top 1% Agent</h5>
                    <p className="text-sm text-gray-500">Khu vực TP.HCM 2022, 2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Chứng Chỉ QTG</h5>
                    <p className="text-sm text-gray-500">Bất động sản quốc tế</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Services */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Dịch Vụ Toàn Diện</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Giải Pháp Bất Động Sản Từ A-Z</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Search size={32}/>, title: 'Tư Vấn Mua Nhà', desc: 'Đánh giá nhu cầu, ngân sách và sàng lọc các sản phẩm tốt nhất trên thị trường.' },
              { icon: <Key size={32}/>, title: 'Ký Gửi Bán/Cho Thuê', desc: 'Định giá chính xác, chiến lược marketing độc quyền tiếp cận đúng khách hàng mục tiêu.' },
              { icon: <Briefcase size={32}/>, title: 'Quản Lý Đầu Tư', desc: 'Phân tích thị trường, lập kế hoạch dòng tiền và tối ưu hóa lợi nhuận danh mục.' },
              { icon: <Shield size={32}/>, title: 'Hỗ Trợ Pháp Lý', desc: 'Kiểm tra quy hoạch, hợp đồng, hoàn thiện thủ tục công chứng sang tên nhanh chóng.' }
            ].map((srv, i) => (
              <div key={i} className="border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:border-indigo-100 transition-all bg-white group">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {srv.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{srv.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=20')] bg-cover bg-center"></div>
        <div className={`mx-auto px-4 relative z-10 ${MAX_W}`}>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase mb-2">Đánh Giá Khách Hàng</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Uy Tín Được Khẳng Định Bằng Niềm Tin</h3>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] snap-center bg-gray-800 p-8 rounded-2xl border border-gray-700">
                <Quote size={40} className="text-indigo-500 mb-6 opacity-50" />
                <p className="text-gray-300 mb-8 italic leading-relaxed">
                  "Tuấn không chỉ là một môi giới, mà là một cố vấn đích thực. Cậu ấy hiểu rõ gu của tôi và đã giúp gia đình tôi tìm được căn penthouse hoàn hảo tại Thủ Thiêm. Rất chuyên nghiệp và tận tâm!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Client" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Doanh Nhân H.T</h5>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Process */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Quy Trình Làm Việc</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Đơn Giản, Minh Bạch & Hiệu Quả</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Lắng Nghe Nhu Cầu', desc: 'Thảo luận sâu về mục tiêu, ngân sách và sở thích cá nhân của bạn.' },
              { step: '02', title: 'Nghiên Cứu & Đề Xuất', desc: 'Lọc ra những lựa chọn tốt nhất từ danh mục bất động sản hiện có và độc quyền.' },
              { step: '03', title: 'Tham Quan & Đánh Giá', desc: 'Tổ chức các buổi xem nhà chuyên nghiệp, phân tích ưu nhược điểm khách quan.' },
              { step: '04', title: 'Đàm Phán & Chốt Cọc', desc: 'Đại diện thương lượng giá tốt nhất và hỗ trợ mọi thủ tục pháp lý đến khi nhận nhà.' }
            ].map((p, i) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-extrabold text-gray-100 absolute -top-10 left-0 z-0 group-hover:text-indigo-50 transition-colors">{p.step}</div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-10 -right-4 w-8 h-px border-t-2 border-dashed border-gray-300"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Certifications & 11. Gallery */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Certs */}
          <div className="mb-24 text-center">
            <p className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-8">Đối tác & Chứng nhận</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-black">MASTERISE</div>
              <div className="text-2xl font-black">VINHOMES</div>
              <div className="text-2xl font-black">CAPITALAND</div>
              <div className="text-2xl font-black">KEPPEL LAND</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giao Dịch Gần Đây</h3>
            <p className="text-gray-600">Những bất động sản nổi bật đã được trao tay thành công</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
            <div className="col-span-2 row-span-2 relative group rounded-2xl overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80" alt="Gal 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-xl bg-indigo-600/90 px-6 py-2 rounded-full">Đã Bán - 45 Tỷ</span>
              </div>
            </div>
            <div className="relative group rounded-2xl overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80" alt="Gal 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="relative group rounded-2xl overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80" alt="Gal 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="col-span-2 relative group rounded-2xl overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80" alt="Gal 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-xl bg-indigo-600/90 px-6 py-2 rounded-full">Cho Thuê - $5,000/tháng</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigateTo('gallery')} className="text-indigo-600 font-bold hover:underline flex items-center gap-2 justify-center mx-auto">
              Xem toàn bộ thư viện ảnh <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 12. Latest News */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Góc Chuyên Gia</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Bài Viết & Phân Tích</h3>
            </div>
            <button onClick={() => navigateTo('news')} className="hidden md:flex items-center gap-2 text-indigo-600 font-medium hover:underline">
              Xem tất cả <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockArticles.slice(0, 3).map((news, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setSelectedArticle(news)}>
                <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                  <span className="text-indigo-600">{news.cat}</span>
                  <span>•</span>
                  <span>{news.date}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">{news.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-4 max-w-3xl`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu Hỏi Thường Gặp</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Anh Tuấn chuyên tư vấn khu vực nào?', a: 'Tôi chuyên tư vấn các sản phẩm bất động sản cao cấp, biệt thự, penthouse tại khu vực trung tâm TP.HCM, Thủ Thiêm (Quận 2), Phú Mỹ Hưng (Quận 7) và các khu vực lân cận.' },
              { q: 'Quy trình tư vấn mua nhà mất bao lâu?', a: 'Tuỳ thuộc vào nhu cầu cụ thể của bạn. Thông thường quá trình từ lúc tìm hiểu nhu cầu đến khi chọn được sản phẩm ưng ý kéo dài từ 2-4 tuần. Quá trình giao dịch pháp lý có thể mất thêm 1-2 tuần.' },
              { q: 'Phí dịch vụ của anh như thế nào?', a: 'Đối với khách mua/thuê, tôi hỗ trợ tư vấn hoàn toàn miễn phí (phí dịch vụ được chủ nhà/chủ đầu tư chi trả). Đối với khách ký gửi bán/cho thuê, phí môi giới áp dụng theo mức tiêu chuẩn của thị trường (1-2%).' },
              { q: 'Anh có hỗ trợ làm thủ tục vay ngân hàng không?', a: 'Có. Tôi có mạng lưới đối tác là các chuyên viên tín dụng cấp cao tại các ngân hàng lớn (Vietcombank, Techcombank, MB...), sẽ hỗ trợ bạn gói vay với lãi suất ưu đãi nhất và thủ tục nhanh gọn nhất.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 text-left font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  {openFaqIndex === i ? <ChevronUp size={20} className="text-indigo-600" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>
                {openFaqIndex === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Contact Form */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="w-full lg:w-5/12 relative z-10 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Bạn đã sẵn sàng để sở hữu BĐS trong mơ?</h2>
              <p className="text-indigo-100 text-lg mb-12">Hãy để lại thông tin, tôi sẽ liên hệ tư vấn cá nhân hóa theo đúng nhu cầu của bạn trong vòng 24 giờ.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-200">Gọi Trực Tiếp</p>
                    <p className="font-bold text-xl">090 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-200">Gửi Email</p>
                    <p className="font-bold text-lg">tuan.tran@luxuryhomes.vn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 relative z-10">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Đặt Lịch Tư Vấn</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" placeholder="090..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nhu cầu quan tâm</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent">
                      <option>Mua nhà/căn hộ để ở</option>
                      <option>Đầu tư dự án</option>
                      <option>Ký gửi bán/cho thuê</option>
                      <option>Tư vấn pháp lý</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent" placeholder="Bạn cần tôi hỗ trợ thêm điều gì?"></textarea>
                  </div>
                  <button 
                    type="submit" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Gửi yêu cầu tư vấn thành công! Tôi sẽ liên hệ lại sớm nhất.');
                    }}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-colors mt-4 cursor-pointer"
                  >
                    Gửi Yêu Cầu Tư Vấn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Newsletter */}
      <section className="py-16 border-t border-gray-100 bg-white">
        <div className={`mx-auto px-4 text-center max-w-2xl ${MAX_W}`}>
          <Mail size={40} className="mx-auto text-indigo-300 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Nhận Bản Tin Thị Trường BĐS</h3>
          <p className="text-gray-600 mb-8">Đăng ký email để nhận các báo cáo phân tích độc quyền và thông tin dự án mới nhất từ tôi.</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Đăng ký nhận bản tin thành công!');
              (e.currentTarget.elements[0] as HTMLInputElement).value = '';
            }}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input required type="email" placeholder="Địa chỉ email của bạn..." className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600" />
            <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">
              Đăng Ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  const renderProjectsPage = () => {
    const filteredProjects = mockListings.filter(item => {
      const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = dropdownFilters.type === 'all' || item.type === dropdownFilters.type;
      const matchRegion = dropdownFilters.region === 'all' || item.region === dropdownFilters.region;
      
      let matchPrice = true;
      if (dropdownFilters.priceRange === '<30') {
        matchPrice = item.priceNum < 30;
      } else if (dropdownFilters.priceRange === '30-80') {
        matchPrice = item.priceNum >= 30 && item.priceNum <= 80;
      } else if (dropdownFilters.priceRange === '>80') {
        matchPrice = item.priceNum > 80;
      }
      return matchQuery && matchType && matchRegion && matchPrice;
    });

    return (
      <div className="bg-gray-50 min-h-screen pt-28 pb-16">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Danh Mục Bất Động Sản</h1>
            <p className="text-gray-600 text-lg">Khám phá danh sách các dự án căn hộ, biệt thự và bất động sản thương mại cao cấp với thông tin chi tiết và chính xác nhất.</p>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án, địa điểm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={dropdownFilters.type}
                  onChange={(e) => setDropdownFilters({ ...dropdownFilters, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả loại hình</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Biệt Thự">Biệt Thự</option>
                  <option value="Căn Hộ Hạng Sang">Căn Hộ Hạng Sang</option>
                  <option value="Đầu Tư Thương Mại">Đầu Tư Thương Mại</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <select
                  value={dropdownFilters.priceRange}
                  onChange={(e) => setDropdownFilters({ ...dropdownFilters, priceRange: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả mức giá</option>
                  <option value="<30">Dưới 30 Tỷ</option>
                  <option value="30-80">Từ 30 - 80 Tỷ</option>
                  <option value=">80">Trên 80 Tỷ</option>
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <select
                  value={dropdownFilters.region}
                  onChange={(e) => setDropdownFilters({ ...dropdownFilters, region: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả khu vực</option>
                  <option value="Quận 1">Quận 1</option>
                  <option value="Quận 2">Quận 2 (Thủ Đức)</option>
                  <option value="Quận 7">Quận 7</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || dropdownFilters.type !== 'all' || dropdownFilters.priceRange !== 'all' || dropdownFilters.region !== 'all') && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDropdownFilters({ type: 'all', priceRange: 'all', region: 'all' });
                  }}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 font-medium">Tìm thấy {filteredProjects.length} bất động sản</p>
          </div>

          {/* Listings Grid */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <p className="text-gray-500 text-lg font-medium mb-4">Không tìm thấy bất động sản nào phù hợp với bộ lọc hiện tại.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDropdownFilters({ type: 'all', priceRange: 'all', region: 'all' });
                }}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((listing) => (
                <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={listing.img} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {listing.type}
                    </div>
                    {listing.featured && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Độc Quyền
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-2xl font-bold mb-1 drop-shadow-md">{listing.priceStr}</h4>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 truncate hover:text-indigo-600 cursor-pointer" onClick={() => setSelectedProject(listing)}>{listing.title}</h4>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                      <MapPin size={16} /> {listing.loc}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{listing.desc}</p>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-medium text-gray-700">
                      <span>{listing.specs}</span>
                      <button onClick={() => setSelectedProject(listing)} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors text-xs font-bold text-center">
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAboutPage = () => {
    const aboutTabs = [
      { id: 'Tầm Nhìn', label: 'Tầm Nhìn & Sứ Mệnh', content: 'Tầm nhìn của tôi là trở thành biểu tượng uy tín hàng đầu trong lĩnh vực tư vấn bất động sản cá nhân phân khúc cao cấp tại TP.HCM. Sứ mệnh của tôi là mang đến cho giới thượng lưu những giải pháp an cư đẳng cấp nhất, song hành cùng cơ hội đầu tư sinh lời bền vững thông qua sự thấu hiểu và phân tích thị trường chuyên sâu.' },
      { id: 'Triết Lý', label: 'Triết Lý Kinh Doanh', content: 'Tôi hoạt động với triết lý: "Bán nhà không chỉ là bán những bức tường, mà là bán phong cách sống và tầm nhìn tương lai." Tôi luôn đặt mình vào vị trí của khách hàng để lắng nghe, thấu cảm và tìm kiếm những sản phẩm không chỉ đẹp về kiến trúc mà còn trọn vẹn về giá trị sống và tiềm năng phát triển.' },
      { id: 'Cam Kết', label: 'Cam Kết Vàng', content: '1. Thông tin minh bạch, chính xác 100% từ chủ đầu tư.\n2. Bảo mật tuyệt đối thông tin khách hàng.\n3. Hỗ trợ pháp lý tận tình từ khâu đặt cọc đến khi nhận sổ hồng.\n4. Đồng hành trọn đời cùng khách hàng trong việc chuyển nhượng hoặc cho thuê tài sản.' }
    ];

    return (
      <div className="bg-white min-h-screen pt-28 pb-16">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Main profile section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                  alt="Trần Anh Tuấn" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-2">Về Tôi</h1>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Trần Anh Tuấn</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Chào bạn! Tôi là Trần Anh Tuấn, nhà sáng lập Luxury Homes và là chuyên gia tư vấn bất động sản cao cấp với hơn 10 năm kinh nghiệm tại thị trường TP.HCM.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Từ một người đam mê kiến trúc và thị trường bất động sản, tôi đã xây dựng sự nghiệp dựa trên giá trị cốt lõi: sự trung thực và tính chuyên nghiệp. Tôi không chỉ giúp khách hàng mua được một tài sản, mà là tìm thấy nơi dựng xây tổ ấm và tối ưu hóa danh mục đầu tư dài hạn.
              </p>

              {/* Core Values grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-indigo-50 rounded-2xl bg-indigo-50/30">
                  <h4 className="font-bold text-indigo-900 mb-1">Minh Bạch</h4>
                  <p className="text-xs text-gray-500">Mọi thông tin về quy hoạch, giá bán đều được công khai đầy đủ.</p>
                </div>
                <div className="p-4 border border-indigo-50 rounded-2xl bg-indigo-50/30">
                  <h4 className="font-bold text-indigo-900 mb-1">Tận Tâm</h4>
                  <p className="text-xs text-gray-500">Sẵn sàng tư vấn và đồng hành cùng khách hàng trong mọi giai đoạn.</p>
                </div>
                <div className="p-4 border border-indigo-50 rounded-2xl bg-indigo-50/30">
                  <h4 className="font-bold text-indigo-900 mb-1">Chuyên Nghiệp</h4>
                  <p className="text-xs text-gray-500">Quy trình làm việc rõ ràng, nhanh chóng và bảo mật thông tin.</p>
                </div>
                <div className="p-4 border border-indigo-50 rounded-2xl bg-indigo-50/30">
                  <h4 className="font-bold text-indigo-900 mb-1">Uy Tín</h4>
                  <p className="text-xs text-gray-500">Xây dựng mối quan hệ tin cậy bền vững cùng khách hàng.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Tabs Section */}
          <div className="mb-24 bg-gray-50 rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              {aboutTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAboutTab(tab.id)}
                  className={`pb-4 px-6 font-bold text-lg border-b-2 transition-all whitespace-nowrap ${
                    activeAboutTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {aboutTabs.find((t) => t.id === activeAboutTab)?.content}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="mb-24">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Hành Trình Phát Triển</h3>
            <div className="relative border-l border-indigo-200 ml-4 md:ml-32">
              {[
                { year: '2013', title: 'Khởi đầu sự nghiệp', desc: 'Bắt đầu với vai trò chuyên viên môi giới căn hộ cao cấp khu vực Quận 7. Nhanh chóng nắm bắt xu hướng thị trường.' },
                { year: '2016', title: 'Chuyên viên xuất sắc', desc: 'Gia nhập sàn giao dịch quốc tế lớn. Đạt danh hiệu Best Broker năm 2016 với doanh số giao dịch hơn 200 tỷ VND.' },
                { year: '2019', title: 'Sáng lập Luxury Homes', desc: 'Thành lập thương hiệu tư vấn cá nhân Luxury Homes, định hình phân khúc bất động sản cao cấp, biệt thự ven sông tại Thủ Thiêm.' },
                { year: '2023 - Nay', title: 'Top 1% Agent TP.HCM', desc: 'Đạt cột mốc 500+ giao dịch thành công. Trở thành đại lý phân phối chính thức của Masterise Homes, Capitaland, Vinhomes.' }
              ].map((milestone, idx) => (
                <div key={idx} className="mb-12 ml-6 md:ml-12 relative">
                  {/* Dot */}
                  <span className="absolute -left-[31px] md:-left-[55px] top-1.5 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-md ring-2 ring-indigo-100">
                    ✓
                  </span>
                  {/* Year badge on the left for medium screens */}
                  <span className="hidden md:block absolute -left-[140px] top-1 text-xl font-extrabold text-indigo-600">{milestone.year}</span>
                  {/* Content card */}
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block md:hidden text-indigo-600 font-extrabold text-lg mb-2">{milestone.year}</span>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership / Associates List */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Đội Ngũ Đồng Hành</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Trần Anh Tuấn', role: 'CEO & Founder', desc: 'Chuyên gia tư vấn BĐS cao cấp với hơn 10 năm kinh nghiệm.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
                { name: 'Lê Thị Minh Thư', role: 'Giám đốc Pháp lý', desc: 'Hơn 15 năm kinh nghiệm giải quyết hồ sơ pháp lý phức tạp.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
                { name: 'Nguyễn Hoàng Nam', role: 'Trưởng bộ phận Marketing', desc: 'Chuyên gia xây dựng hình ảnh và truyền thông dự án hạng sang.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group text-center hover:shadow-xl transition-all p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-indigo-50 group-hover:border-indigo-600 transition-colors">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGalleryPage = () => {
    const tabs = ['Tất cả', 'Căn Hộ', 'Biệt Thự', 'Bàn Giao'];
    const filteredPhotos = selectedGalleryTab === 'Tất cả'
      ? mockGalleryPhotos
      : mockGalleryPhotos.filter(photo => photo.category === selectedGalleryTab);

    return (
      <div className="bg-gray-50 min-h-screen pt-28 pb-16">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Thư Viện Ảnh Thực Tế</h1>
            <p className="text-gray-600 text-lg">Tổng hợp hình ảnh thực tế từ các căn hộ, biệt thự và khoảnh khắc bàn giao nhà thành công cho quý khách hàng thân yêu.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
                  selectedGalleryTab === tab
                    ? 'bg-indigo-600 text-white shadow-indigo-600/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                onClick={() => setSelectedGalleryImg(photo.img)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group relative aspect-square"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src={photo.img} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider mb-1 text-indigo-300">{photo.category}</span>
                  <h4 className="text-white font-bold text-lg leading-tight">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => {
    const filteredNews = mockArticles.filter(article => 
      article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      article.desc.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      article.cat.toLowerCase().includes(searchNewsQuery.toLowerCase())
    );

    return (
      <div className="bg-gray-50 min-h-screen pt-28 pb-16">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Góc Chuyên Gia & Tin Tức</h1>
            <p className="text-gray-600 text-lg">Cập nhật tin tức thị trường bất động sản mới nhất, phân tích chuyên sâu và cẩm nang hữu ích từ chuyên gia Trần Anh Tuấn.</p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm bài viết, chủ đề..."
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white shadow-sm border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
              />
            </div>
          </div>

          {/* News list */}
          {filteredNews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
              <p className="text-gray-500 text-lg font-medium mb-4">Không tìm thấy bài viết nào phù hợp.</p>
              <button
                onClick={() => setSearchNewsQuery('')}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
              >
                Tất cả bài viết
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full border border-gray-100"
                >
                  <div className="aspect-video overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                      src={article.img} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      <span className="text-indigo-600">{article.cat}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3 leading-snug">{article.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.desc}</p>
                    <span className="text-indigo-600 font-bold text-sm mt-auto inline-flex items-center gap-1.5 group-hover:underline">
                      Đọc tiếp <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContactPage = () => {
    const upcomingDays = [];
    const weekdayNames = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'Hôm nay' : weekdayNames[d.getDay()];
      const dateLabel = `${d.getDate()}/${d.getMonth() + 1}`;
      const value = d.toISOString().split('T')[0];
      upcomingDays.push({ dayName, dateLabel, value });
    }

    const timeSlots = [
      '09:00 - 10:00',
      '10:30 - 11:30',
      '14:00 - 15:00',
      '15:30 - 16:30',
      '17:00 - 18:00'
    ];

    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.phone) {
        alert('Vui lòng điền Họ tên và Số điện thoại!');
        return;
      }
      setContactSubmitted(true);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setBookingError('');
      if (!bookingDate) {
        setBookingError('Vui lòng chọn ngày đặt lịch tư vấn.');
        return;
      }
      if (!bookingTimeSlot) {
        setBookingError('Vui lòng chọn khung giờ trống.');
        return;
      }
      if (!bookingName.trim()) {
        setBookingError('Vui lòng điền họ và tên của bạn.');
        return;
      }
      if (!bookingPhone.trim()) {
        setBookingError('Vui lòng điền số điện thoại liên hệ.');
        return;
      }
      setBookingSubmitted(true);
    };

    return (
      <div className="bg-gray-50 min-h-screen pt-28 pb-16">
        <div className={`mx-auto px-4 ${MAX_W}`}>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Liên Hệ & Đặt Lịch Hẹn</h1>
            <p className="text-gray-600 text-lg">Bắt đầu hành trình an cư hoặc đầu tư của bạn ngay hôm nay bằng cách gửi yêu cầu hoặc đặt lịch hẹn tư vấn trực tiếp 1-1.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: General Contact info + General Contact Form */}
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi Yêu Cầu Liên Hệ</h3>
                
                {contactSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">Gửi Yêu Cầu Thành Công!</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">Cảm ơn {contactForm.name} đã tin tưởng. Trần Anh Tuấn sẽ trực tiếp gọi điện tư vấn cho bạn qua số {contactForm.phone} trong vòng 24 giờ tới.</p>
                    <button 
                      onClick={() => {
                        setContactForm({ name: '', phone: '', email: '', interest: 'Mua nhà/căn hộ để ở', message: '' });
                        setContactSubmitted(false);
                      }}
                      className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600" 
                        placeholder="Nguyễn Văn A" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600" 
                          placeholder="090..." 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600" 
                          placeholder="email@example.com" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nhu cầu quan tâm</label>
                      <select 
                        value={contactForm.interest}
                        onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option>Mua nhà/căn hộ để ở</option>
                        <option>Đầu tư dự án</option>
                        <option>Ký gửi bán/cho thuê</option>
                        <option>Tư vấn pháp lý</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                      <textarea 
                        rows={4} 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600" 
                        placeholder="Bạn cần tôi hỗ trợ thêm thông tin gì?"
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                      Gửi Yêu Cầu Tư Vấn
                    </button>
                  </form>
                )}
              </div>

              {/* General Contact Info Card */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-sm">
                <h4 className="text-xl font-bold mb-6">Thông Tin Văn Phòng</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-indigo-400 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-300 text-sm">Tầng 12, Tòa nhà Bitexco, Số 2 Hải Triều, Bến Nghé, Quận 1, TP.HCM</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-indigo-400 flex-shrink-0" size={20} />
                    <p className="text-gray-300 text-sm">090 123 4567 (Zalo, Viber, Whatsapp)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="text-indigo-400 flex-shrink-0" size={20} />
                    <p className="text-gray-300 text-sm">tuan.tran@luxuryhomes.vn</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="text-indigo-400 flex-shrink-0" size={20} />
                    <p className="text-gray-300 text-sm">Thứ 2 - Chủ Nhật: 8:00 - 20:00</p>
                  </div>
                </div>

                {/* Interactive Google Map */}
                <div className="mt-6 rounded-2xl overflow-hidden border border-slate-700 shadow-md flex flex-col h-48 bg-slate-800">
                  <div className="px-3.5 py-2 bg-slate-950 text-white flex items-center justify-between text-xs">
                    <span className="font-bold truncate">Bitexco Tower, Quận 1, TP.HCM</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+Qu%E1%BA%ADn+1,+TP.HCM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] shrink-0"
                    >
                      Mở Maps
                    </a>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <iframe
                      title="Bản đồ Bitexco Financial Tower"
                      src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Calendar */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Đặt Lịch Hẹn Trực Tuyến</h3>
              <p className="text-gray-500 text-sm mb-6">Chọn ngày và giờ phù hợp để nhận cuộc gọi tư vấn sâu qua Zoom/Meet hoặc gặp mặt trực tiếp.</p>

              {bookingSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Lịch Hẹn Đã Được Ghi Nhận!</h4>
                  <div className="bg-indigo-50/50 rounded-2xl p-6 text-left mb-6 border border-indigo-50">
                    <p className="text-gray-700 mb-2 font-medium">Chi tiết lịch đặt của bạn:</p>
                    <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Khách hàng:</span> {bookingName}</p>
                    <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Số điện thoại:</span> {bookingPhone}</p>
                    <p className="text-sm text-gray-600 mb-1"><span className="font-bold">Thời gian:</span> {bookingTimeSlot}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">Ngày hẹn:</span> {bookingDate}</p>
                  </div>
                  <p className="text-gray-600 mb-8">Một tin nhắn SMS và email xác nhận sẽ được gửi kèm liên kết phòng họp online. Trần Anh Tuấn sẽ gọi điện nhắc bạn 15 phút trước khi buổi họp diễn ra.</p>
                  <button 
                    onClick={() => {
                      setBookingDate('');
                      setBookingTimeSlot('');
                      setBookingName('');
                      setBookingPhone('');
                      setBookingNotes('');
                      setBookingSubmitted(false);
                    }}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Đặt lịch hẹn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Step 1: Select Date */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">1. Chọn ngày tư vấn *</label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {upcomingDays.map((day) => {
                        const isSelected = bookingDate === day.value;
                        return (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => setBookingDate(day.value)}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                                : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-tight opacity-80">{day.dayName}</span>
                            <span className="text-sm font-extrabold mt-1">{day.dateLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Time Slot */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">2. Chọn khung giờ trống *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = bookingTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingTimeSlot(slot)}
                            className={`px-3 py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                                : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Enter Details */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-sm font-bold text-gray-700">3. Thông tin cá nhân</label>
                    <div>
                      <input 
                        type="text" 
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm" 
                        placeholder="Họ và tên của bạn *" 
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm" 
                        placeholder="Số điện thoại liên hệ *" 
                      />
                    </div>
                    <div>
                      <textarea 
                        rows={2}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm" 
                        placeholder="Ghi chú thêm về nhu cầu của bạn (dự án muốn xem, hình thức tư vấn...)"
                      ></textarea>
                    </div>
                  </div>

                  {bookingError && (
                    <p className="text-red-500 text-sm font-bold">{bookingError}</p>
                  )}

                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/15">
                    Xác Nhận Đặt Lịch
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOtherPages = () => {
    switch (currentPage) {
      case 'projects':
      case 'du-an':
      case 'san-pham':
      case 'bat-dong-san':
        return renderProjectsPage();
      case 'about':
      case 'gioi-thieu':
      case 've-chung-toi':
        return renderAboutPage();
      case 'gallery':
      case 'thu-vien':
      case 'hinh-anh':
        return renderGalleryPage();
      case 'news':
      case 'tin-tuc':
      case 'bai-viet':
        return renderNewsPage();
      case 'contact':
      case 'lien-he':
      case 'tu-van':
      case 'dat-lich':
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen selection:bg-indigo-200 selection:text-indigo-900">
      {renderHeader()}
      <main>
        {currentPage === 'home' ? renderHomePage() : renderOtherPages()}
      </main>
      {renderFooter()}

      {/* Overlays & Modals */}
      {/* 1. Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow"
            >
              <X size={20} />
            </button>
            <div className="h-64 sm:h-80 overflow-hidden relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{selectedProject.type}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">{selectedProject.title}</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Giá bán / cho thuê</p>
                  <p className="text-3xl font-black text-indigo-600">{selectedProject.priceStr}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Vị trí</p>
                  <p className="font-bold text-gray-900">{selectedProject.loc}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Thông Số Chi Tiết</h4>
                <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 font-medium text-sm">
                  {selectedProject.specs}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-2">Mô Tả Dự Án</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{selectedProject.desc}</p>
              </div>

              {/* Inquiry form */}
              <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-50">
                <h4 className="font-bold text-indigo-900 mb-3">Yêu Cầu Tư Vấn Riêng</h4>
                <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Yêu cầu tư vấn đã được gửi đi. Tôi sẽ phản hồi ngay lập tức.'); setSelectedProject(null); }} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" required placeholder="Họ và tên *" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-white" />
                    <input type="tel" required placeholder="Số điện thoại *" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-white" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow">
                    Gửi yêu cầu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Gallery Lightbox Modal */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedGalleryImg(null)}>
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Gallery Full Screen" className="w-full h-full object-contain rounded-lg shadow-2xl mx-auto" />
          </div>
        </div>
      )}

      {/* 3. News Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow"
            >
              <X size={20} />
            </button>
            <div className="aspect-video overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                <span className="text-indigo-600">{selectedArticle.cat}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">{selectedArticle.title}</h3>
              <p className="text-gray-800 text-lg font-medium leading-relaxed mb-6 italic border-l-4 border-indigo-600 pl-4 bg-gray-50 py-3 pr-4 rounded-r-xl">
                {selectedArticle.desc}
              </p>
              <div className="text-gray-600 text-base leading-relaxed space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

