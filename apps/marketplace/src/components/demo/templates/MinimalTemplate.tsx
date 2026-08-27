import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Search, ChevronDown, ChevronRight, 
  MapPin, Phone, Mail, ArrowRight, Star, 
  Check, Calendar, Info, Shield, Layers, Home as HomeIcon,
  Wind, Droplets, Sun, Activity, Coffee, Maximize, Play, Plus, Minus
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, InstagramIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

const COLORS = {
  primary: '#1A1A2E',
  secondary: '#E8E8E8',
  gold: '#C8A96E',
  bg: '#FFFFFF',
  bgAlt: '#F9F9F9',
  text: '#111111',
  textLight: '#666666',
  border: '#EAEAEA'
};

const FONTS = {
  heading: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif"
};

// 1. ELEVATED PROJECTS (APARTMENTS) LIST (6+ items)
interface ApartmentProject {
  id: string;
  name: string;
  desc: string;
  img: string;
  price: number; // in billions
  priceLabel: string;
  loc: string;
  size: number; // in sqm
  style: 'Japandi' | 'Scandinavian' | 'Industrial';
  bedrooms: number;
  bathrooms: number;
  delivery: string;
  scale: string;
  features: string[];
  description: string;
}

const MINIMAL_APARTMENTS: ApartmentProject[] = [
  {
    id: 'm-riverside',
    name: 'The M - Riverside',
    desc: 'Sự hòa quyện tuyệt đẹp giữa kiến trúc đương đại và cảnh quan thiên nhiên ven sông.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    price: 5.2,
    priceLabel: 'Từ 5.2 Tỷ',
    loc: 'Quận 2, TP.HCM',
    size: 65,
    style: 'Japandi',
    bedrooms: 2,
    bathrooms: 2,
    delivery: 'Quý 4/2026',
    scale: '2 Tòa tháp, 500 căn',
    features: ['Ban công sông', 'Nội thất gỗ sồi', 'Hệ thống SmartHome', 'Kính Low-E cách âm'],
    description: 'The M - Riverside mang đến một không gian sống yên ả bên bờ sông Sài Gòn. Căn hộ được thiết kế tối giản theo phong cách Japandi, kết hợp sự tinh tế của Nhật Bản và nét ấm áp của Bắc Âu. Tất cả các phòng đều có cửa sổ lớn đón ánh sáng tự nhiên và gió trời.'
  },
  {
    id: 'lumiere-oasis',
    name: 'Lumiere Oasis',
    desc: 'Ốc đảo bình yên giữa lòng thành phố náo nhiệt, nổi bật với thiết kế ngập tràn ánh sáng.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    price: 8.5,
    priceLabel: 'Từ 8.5 Tỷ',
    loc: 'Quận 1, TP.HCM',
    size: 90,
    style: 'Scandinavian',
    bedrooms: 3,
    bathrooms: 2,
    delivery: 'Quý 2/2026',
    scale: '1 Tòa tháp, 180 căn',
    features: ['Thang máy riêng', 'Sàn gỗ tự nhiên', 'Thiết bị vệ sinh Kohler', 'Bếp bàn đá thạch anh'],
    description: 'Lumiere Oasis mang thiết kế Scandinavian tối giản đặc trưng với tông màu sáng và vật liệu tự nhiên. Nằm tại vị trí kim cương Quận 1, dự án mang đến trải nghiệm sống sang trọng nhưng không phô trương, tách biệt hoàn toàn khỏi sự xô bồ của đô thị.'
  },
  {
    id: 'zenith-heights',
    name: 'Zenith Heights',
    desc: 'Tầm nhìn panorama vô cực, định nghĩa lại chuẩn mực sống trên không.',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80',
    price: 4.8,
    priceLabel: 'Từ 4.8 Tỷ',
    loc: 'Quận 7, TP.HCM',
    size: 55,
    style: 'Industrial',
    bedrooms: 1,
    bathrooms: 1,
    delivery: 'Quý 3/2026',
    scale: '3 Tòa tháp, 700 căn',
    features: ['Trần cao 3.6m', 'Tường bê tông mài', 'Cửa kính sát trần', 'Hệ đèn ray từ tính'],
    description: 'Zenith Heights sở hữu phong cách Industrial độc đáo với các đường nét thô mộc, trần cao thoáng đãng và kính tràn viền. Dự án tọa lạc tại khu Nam Sài Gòn, mang lại tầm nhìn ôm trọn sông và cảnh quan thành phố lung linh về đêm.'
  },
  {
    id: 'wabi-sabi-residence',
    name: 'Wabi Sabi Residence',
    desc: 'Vẻ đẹp tinh tế từ sự không hoàn hảo, không gian sống đậm chất thiền.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    price: 6.7,
    priceLabel: 'Từ 6.7 Tỷ',
    loc: 'Bình Thạnh, TP.HCM',
    size: 80,
    style: 'Japandi',
    bedrooms: 2,
    bathrooms: 2,
    delivery: 'Quý 1/2027',
    scale: 'Boutique Complex, 80 căn',
    features: ['Sơn hiệu ứng đất sét', 'Bồn tắm đá tự nhiên', 'Vườn thiền ban công', 'Hệ điều hòa âm trần'],
    description: 'Wabi Sabi Residence được lấy cảm hứng từ triết lý sống của người Nhật, tôn vinh những vật liệu mộc mạc và thời gian. Căn hộ sử dụng sơn hiệu ứng, đồ gỗ thô và bố cục thông minh để mang lại cảm giác bình yên tuyệt đối cho gia chủ.'
  },
  {
    id: 'nordic-haven-studio',
    name: 'Nordic Haven Studio',
    desc: 'Không gian ấm cúng, tối ưu hóa công năng cho lối sống độc thân năng động.',
    img: 'https://images.unsplash.com/photo-160058515526-990dced4e56d?w=1200&q=80',
    price: 3.5,
    priceLabel: 'Từ 3.5 Tỷ',
    loc: 'Quận 4, TP.HCM',
    size: 45,
    style: 'Scandinavian',
    bedrooms: 1,
    bathrooms: 1,
    delivery: 'Quý 4/2026',
    scale: '1 Tòa tháp, 350 căn',
    features: ['Giường thông minh gập', 'Tủ âm tường kịch trần', 'Logia thông thoáng', 'Khóa cửa thông minh 4 chức năng'],
    description: 'Nordic Haven Studio chứng minh rằng không gian nhỏ vẫn có thể mang lại cuộc sống tiện nghi hàng đầu. Với lối thiết kế Scandinavian tối giản tinh gọn, mọi góc nhỏ trong căn hộ đều được khai thác tối đa công năng nhưng vẫn giữ được sự thoáng đãng.'
  },
  {
    id: 'the-loft-industrial',
    name: 'The Loft Industrial',
    desc: 'Căn hộ thông tầng mang phong cách loft New York cá tính và phóng khoáng.',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd394fc5?w=1200&q=80',
    price: 12.0,
    priceLabel: 'Từ 12.0 Tỷ',
    loc: 'Thủ Đức, TP.HCM',
    size: 150,
    style: 'Industrial',
    bedrooms: 3,
    bathrooms: 3,
    delivery: 'Quý 2/2027',
    scale: 'Biệt thự trên không, 45 căn',
    features: ['Thiết kế Duplex thông tầng', 'Thang xoắn ốc thép mộc', 'Sân vườn riêng 25m2', 'Hệ thống lọc nước tại vòi'],
    description: 'The Loft Industrial là biểu tượng của phong cách sống tự do và nghệ thuật. Với trần cao thông tầng và vách kính rộng lớn, căn hộ phản chiếu tinh thần của những căn loft công nghiệp tại New York, kết hợp giữa sắt, thép, bê tông và gỗ tự nhiên.'
  }
];

// 2. ELEVATED NEWS ARTICLES (6+ items)
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  img: string;
  cat: string;
  summary: string;
  content: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'wabi-sabi-modern',
    title: 'Nghệ thuật Wabi-Sabi trong không gian sống đô thị hiện đại',
    date: '15 Th08, 2026',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    cat: 'Góc Nhìn',
    summary: 'Khám phá cách ứng dụng triết lý tìm kiếm vẻ đẹp từ sự không hoàn hảo để tạo nên tổ ấm bình yên giữa lòng thành phố.',
    content: 'Triết lý Wabi-sabi xuất phát từ Nhật Bản, tôn vinh những nét đẹp tự nhiên, mộc mạc và có phần không hoàn hảo theo thời gian. Trong thiết kế nội thất hiện đại, Wabi-sabi được biến tấu nhẹ nhàng để phù hợp với căn hộ đô thị. Sự kết hợp giữa các tông màu đất ấm áp, chất liệu vải thô dệt tự nhiên, tường sơn hiệu ứng đất sét và những món đồ gỗ giữ nguyên vân nứt mang lại một chiều sâu cảm xúc đặc biệt, giúp cư dân rũ bỏ mọi ồn ào khi trở về nhà.'
  },
  {
    id: 'natural-light',
    title: 'Lợi ích của ánh sáng tự nhiên trong căn hộ',
    date: '05 Th08, 2026',
    img: 'https://images.unsplash.com/photo-1600607687931-cebf10cb7254?w=1000&q=80',
    cat: 'Kiến trúc',
    summary: 'Ánh sáng tự nhiên không chỉ giúp mở rộng không gian trực quan mà còn mang lại giá trị to lớn cho sức khỏe cư dân.',
    content: 'Trong kiến trúc tối giản, ánh sáng được coi là một vật liệu thiết kế đặc biệt. Việc thiết kế hệ cửa kính sát trần (floor-to-ceiling) giúp ánh sáng đi sâu vào từng ngóc ngách của căn hộ. Nghiên cứu chỉ ra rằng, sống trong môi trường tràn ngập ánh sáng tự nhiên giúp cải thiện nhịp sinh học, tăng cường sản sinh serotonin giúp giảm căng thẳng và nâng cao hiệu suất làm việc. Tại Minimal, mọi căn hộ đều được tính toán góc đón sáng tối ưu để đảm bảo sức khỏe tinh thần bền vững.'
  },
  {
    id: 'riverside-progress',
    title: 'Cập nhật tiến độ dự án The M - Riverside',
    date: '28 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    cat: 'Dự án',
    summary: 'Dự án The M - Riverside đang bám sát tiến độ đề ra, hoàn thành cất nóc tòa tháp B và tiếp tục hoàn thiện mặt ngoài.',
    content: 'Tính đến cuối tháng 7/2026, ban quản lý dự án The M - Riverside xin gửi tới quý khách hàng báo cáo tiến độ chi tiết. Tòa tháp B đã chính thức cất nóc thành công, vượt tiến độ dự kiến 10 ngày. Công tác lắp đặt hệ thống kính cách âm Low-E hai lớp mặt ngoài đang được triển khai đồng bộ từ tầng 5 đến tầng 15. Song song đó, đội ngũ nhà thầu nội thất cũng bắt đầu khảo sát và thi công căn hộ mẫu tiêu chuẩn bàn giao tại tòa tháp A. Chúng tôi tự tin bàn giao đúng hạn vào Quý 4/2026.'
  },
  {
    id: 'luxury-real-estate',
    title: 'Tại sao bất động sản siêu sang vẫn hút khách?',
    date: '12 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1000&q=80',
    cat: 'Thị trường',
    summary: 'Mặc dù thị trường có nhiều biến động, phân khúc bất động sản siêu sang vẫn ghi nhận lượng giao dịch ấn tượng nhờ giá trị độc bản.',
    content: 'Giới thượng lưu không chỉ mua một căn hộ, họ đang mua một phong cách sống và một tài sản lưu giữ giá trị lâu dài. Các bất động sản có thiết kế độc bản, số lượng giới hạn và sở hữu vị trí đắc địa luôn giữ giá hoặc tăng trưởng bền vững bất chấp chu kỳ kinh tế. Xu hướng tối giản tinh tế (quiet luxury) đang lên ngôi, khi giới tinh hoa ưu tiên những dự án chú trọng chiều sâu trải nghiệm, sự riêng tư tuyệt đối và chất lượng xây dựng chuẩn quốc tế thay vì những hào nhoáng bên ngoài.'
  },
  {
    id: 'sustainable-materials',
    title: 'Chọn vật liệu bền vững cho ngôi nhà tương lai',
    date: '01 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=1000&q=80',
    cat: 'Nội thất',
    summary: 'Sử dụng vật liệu xanh, thân thiện với môi trường là xu hướng tất yếu của kiến trúc bền vững thời đại mới.',
    content: 'Vật liệu bền vững không chỉ bảo vệ trái đất mà còn trực tiếp bảo vệ chất lượng không khí trong nhà bạn. Xu hướng hiện nay ưu tiên sàn gỗ đạt chuẩn phát thải thấp, sơn không chứa VOC (hợp chất hữu cơ dễ bay hơi), gạch đất nung tự nhiên và đá thạch anh tái chế. Những vật liệu này không chỉ có độ bền cao mà còn mang vẻ đẹp thô mộc đặc trưng, tạo nên cảm giác gần gũi với thiên nhiên cho căn hộ hiện đại.'
  },
  {
    id: 'kitchen-trends',
    title: 'Xu hướng thiết kế bếp mở năm 2027',
    date: '20 Th06, 2026',
    img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd394fc5?w=1000&q=80',
    cat: 'Nội thất',
    summary: 'Bếp mở kết hợp đảo bếp thông minh trở thành trung tâm kết nối các thành viên trong gia đình.',
    content: 'Nhà bếp không còn đơn thuần là nơi nấu nướng, mà đã biến thành trái tim của căn nhà, nơi tiếp khách và tụ họp gia đình. Xu hướng thiết kế bếp 2027 tập trung vào các hệ tủ bếp giấu tay nắm tinh giản, tích hợp thiết bị thông minh âm tủ. Mặt đá nhân tạo cao cấp liền mạch từ bàn bếp lên ốp tường giúp việc lau dọn trở nên dễ dàng. Đảo bếp đa năng đóng vai trò vừa là bàn ăn nhanh, vừa là vách ngăn ước lệ phân chia không gian sống.'
  }
];

// 3. ELEVATED GALLERY ITEMS
interface GalleryItem {
  id: string;
  img: string;
  cat: 'exterior' | 'interior' | 'amenities';
  title: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', cat: 'interior', title: 'Phòng khách phong cách Japandi' },
  { id: 'g2', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', cat: 'interior', title: 'Phòng ngủ ngập tràn ánh sáng' },
  { id: 'g3', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', cat: 'interior', title: 'Bàn ăn tối giản tinh tế' },
  { id: 'g4', img: 'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=800&q=80', cat: 'exterior', title: 'Ban công rộng nhìn ra sông' },
  { id: 'g5', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd394fc5?w=800&q=80', cat: 'exterior', title: 'Kiến trúc mặt ngoài tối giản' },
  { id: 'g6', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80', cat: 'amenities', title: 'Hồ bơi vô cực hoàng hôn' },
  { id: 'g7', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', cat: 'amenities', title: 'Công viên Zen tĩnh lặng' }
];

export default function MinimalTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  // Page state
  const [currentPage, setCurrentPageState] = useState(initialPage);

  useEffect(() => {
    setCurrentPageState(initialPage);
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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);

  // Search & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Modals & Detail Overlays
  const [selectedProject, setSelectedProject] = useState<ApartmentProject | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('all');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Contact States
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const isMobile = viewport === 'mobile';
  
  const navigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Trang chủ', id: 'home' },
    { name: 'Dự án', id: 'projects' },
    { name: 'Về chúng tôi', id: 'about' },
    { name: 'Thư viện', id: 'gallery' },
    { name: 'Tin tức', id: 'news' },
    { name: 'Liên hệ', id: 'contact' }
  ];

  // Filtering Logic for Projects
  const filteredProjects = MINIMAL_APARTMENTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = styleFilter === 'all' || project.style === styleFilter;
    
    let matchesSize = true;
    if (sizeFilter === 'under-60') {
      matchesSize = project.size < 60;
    } else if (sizeFilter === '60-100') {
      matchesSize = project.size >= 60 && project.size <= 100;
    } else if (sizeFilter === 'over-100') {
      matchesSize = project.size > 100;
    }
    
    let matchesPrice = true;
    if (priceFilter === 'under-5') {
      matchesPrice = project.price < 5;
    } else if (priceFilter === '5-8') {
      matchesPrice = project.price >= 5 && project.price <= 8;
    } else if (priceFilter === 'over-8') {
      matchesPrice = project.price > 8;
    }
    
    return matchesSearch && matchesStyle && matchesSize && matchesPrice;
  });

  // Handle Contact Form Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      setContactError('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
      return;
    }
    const phoneClean = contactPhone.replace(/\s/g, '');
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      setContactError('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
      return;
    }
    if (contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setContactError('Email không hợp lệ (VD: ten@gmail.com).');
      return;
    }
    setContactError('');
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API_URL}/api/marketplace/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName.trim(),
          phone: phoneClean,
          email: contactEmail.trim(),
          selectedTemplate: 'minimal-white',
          packageInterest: 'Mẫu Minimal White Style',
          message: contactMessage?.trim() || 'Khách liên hệ từ Demo Minimal White',
        }),
      });
    } catch (err) {}
    setContactSubmitted(true);
  };


  // Handle Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSubmitted(false);
    }, 4500);
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300" style={{ borderColor: COLORS.border }}>
      <div className={`mx-auto px-6 h-24 flex items-center justify-between ${MAX_W}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
          <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}>
            <span className="font-bold text-lg" style={{ fontFamily: FONTS.heading }}>M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
            MINIMAL<span style={{ color: COLORS.gold }}>.</span>
          </span>
        </div>
        
        {!isMobile ? (
          <nav className="flex items-center gap-8">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-[15px] tracking-wide transition-colors duration-200 ${currentPage === link.id ? 'font-medium' : 'hover:opacity-70'}`}
                style={{ color: currentPage === link.id ? COLORS.primary : COLORS.textLight }}
              >
                {link.name}
              </button>
            ))}
          </nav>
        ) : null}

        {!isMobile ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('projects')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} style={{ color: COLORS.primary }} />
            </button>
            <button 
              onClick={() => {
                setContactSubmitted(false);
                navigate('contact');
              }}
              className="px-6 py-2.5 text-sm uppercase tracking-widest transition-transform hover:scale-105"
              style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
            >
              Tư vấn ngay
            </button>
          </div>
        ) : (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-white shadow-xl border-t" style={{ borderColor: COLORS.border }}>
          <nav className="flex flex-col p-6">
            {navLinks.map(link => (
              <button 
                key={link.id}
                onClick={() => navigate(link.id)}
                className="text-left py-4 text-lg border-b last:border-none"
                style={{ 
                  color: currentPage === link.id ? COLORS.primary : COLORS.textLight,
                  borderColor: COLORS.border 
                }}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setContactSubmitted(false);
                navigate('contact');
              }}
              className="mt-6 py-4 text-center text-sm uppercase tracking-widest"
              style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}
            >
              Tư vấn ngay
            </button>
          </nav>
        </div>
      )}
    </header>
  );

  const renderFooter = () => (
    <footer className="pt-24 pb-12" style={{ backgroundColor: COLORS.bgAlt, color: COLORS.text }}>
      <div className={`mx-auto px-6 ${MAX_W}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}>
                <span className="font-bold text-lg" style={{ fontFamily: FONTS.heading }}>M</span>
              </div>
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
                MINIMAL<span style={{ color: COLORS.gold }}>.</span>
              </span>
            </div>
            <p className="leading-relaxed mb-6 font-light text-sm" style={{ color: COLORS.textLight }}>
              Tái định nghĩa không gian sống đô thị qua lăng kính tối giản, tinh khiết và tiện tiện nghi đẳng cấp.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors" style={{ borderColor: COLORS.border }}>
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-[#0068FF] hover:text-white hover:border-[#0068FF] transition-colors p-2" style={{ borderColor: COLORS.border }}>
                <ZaloIcon className="w-full h-full" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-colors" style={{ borderColor: COLORS.border }}>
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors" style={{ borderColor: COLORS.border }}>
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6" style={{ color: COLORS.primary }}>Khám phá</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><button onClick={() => navigate('projects')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.textLight }}>Dự án nổi bật</button></li>
              <li><button onClick={() => navigate('about')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.textLight }}>Về chúng tôi</button></li>
              <li><button onClick={() => navigate('gallery')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.textLight }}>Thư viện ảnh</button></li>
              <li><button onClick={() => navigate('news')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.textLight }}>Tin tức & Cẩm nang</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6" style={{ color: COLORS.primary }}>Dịch vụ</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="hover:opacity-70 transition-opacity cursor-pointer" style={{ color: COLORS.textLight }}>Tư vấn đầu tư</li>
              <li className="hover:opacity-70 transition-opacity cursor-pointer" style={{ color: COLORS.textLight }}>Quản lý bất động sản</li>
              <li className="hover:opacity-70 transition-opacity cursor-pointer" style={{ color: COLORS.textLight }}>Ký gửi mua bán</li>
              <li className="hover:opacity-70 transition-opacity cursor-pointer" style={{ color: COLORS.textLight }}>Thiết kế nội thất</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-6" style={{ color: COLORS.primary }}>Liên hệ</h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a href="https://maps.google.com/?q=123+Ton+Duc+Thang+Quan+1+TPHCM" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: COLORS.gold }} />
                  <span style={{ color: COLORS.textLight }}>Tầng 15, Tòa nhà Minimal, 123 Đường Tôn Đức Thắng, Quận 1, TP.HCM</span>
                </a>
              </li>
              <li>
                <a href="tel:0919006030" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Phone size={18} className="shrink-0" style={{ color: COLORS.gold }} />
                  <span className="whitespace-nowrap" style={{ color: COLORS.textLight }}>0919 006 030</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@minimal.vn" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Mail size={18} className="shrink-0" style={{ color: COLORS.gold }} />
                  <span style={{ color: COLORS.textLight }}>contact@minimal.vn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light" style={{ borderColor: COLORS.border }}>
          <p style={{ color: COLORS.textLight }}>&copy; 2026 Minimal BĐS. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:underline" style={{ color: COLORS.textLight }}>Điều khoản bảo mật</span>
            <span className="cursor-pointer hover:underline" style={{ color: COLORS.textLight }}>Chính sách sử dụng</span>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderHome = () => (
    <div className="flex flex-col min-h-screen">
      {/* 2. HERO: Split layout */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row bg-white">
        <div className="w-full md:w-5/12 flex items-center justify-center p-8 md:p-16 z-10">
          <div className="max-w-md w-full mt-10 md:mt-0">
            <h1 className="text-5xl md:text-7xl leading-[1.1] mb-6" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
              Không gian sống <br />
              <span className="italic" style={{ color: COLORS.textLight }}>Thuần khiết</span>
            </h1>
            <p className="text-lg mb-10 leading-relaxed font-light" style={{ color: COLORS.textLight }}>
              Khám phá bộ sưu tập căn hộ hạng sang được thiết kế với ngôn ngữ tối giản, nơi mỗi chi tiết đều tôn vinh sự tinh tế và tĩnh tại.
            </p>
            
            <div className="flex border-b-2 focus-within:border-gray-800 transition-colors pb-2" style={{ borderColor: COLORS.border }}>
              <input 
                type="text" 
                placeholder="Tìm kiếm dự án, khu vực..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate('projects');
                  }
                }}
                className="w-full bg-transparent outline-none text-lg placeholder-gray-400 font-light"
              />
              <button className="p-2" onClick={() => navigate('projects')}>
                <Search size={24} style={{ color: COLORS.primary }} />
              </button>
            </div>
            
            <div className="mt-12 flex gap-6 items-center">
              <button 
                onClick={() => navigate('projects')}
                className="group flex items-center gap-3 pb-1 border-b" 
                style={{ borderColor: COLORS.primary }}
              >
                <span className="text-sm uppercase tracking-widest font-medium" style={{ color: COLORS.primary }}>Khám phá ngay</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" style={{ color: COLORS.primary }} />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12 h-[50vh] md:h-auto relative">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" 
            alt="Minimal Living Space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 md:hidden"></div>
        </div>
      </section>

      {/* 3. STATS */}
      <section className="py-20 bg-white border-y" style={{ borderColor: COLORS.border }}>
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x-0 md:divide-x">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl mb-2 font-serif font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>500+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Dự án hoàn thành</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl mb-2 font-serif font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>98%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Khách hàng hài lòng</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl mb-2 font-serif font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>15</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Năm kinh nghiệm</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl mb-2 font-serif font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>2k+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Khách hàng tin chọn</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Loại hình Bất Động Sản</h2>
            <p className="max-w-2xl mx-auto text-lg font-light" style={{ color: COLORS.textLight }}>Lựa chọn không gian hoàn hảo phản chiếu phong cách sống của bạn.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: HomeIcon, name: 'Căn hộ Cao cấp', count: '124' },
              { icon: Star, name: 'Penthouse', count: '18' },
              { icon: Maximize, name: 'Duplex', count: '32' },
              { icon: Layers, name: 'Nhà phố Đô thị', count: '64' },
              { icon: Shield, name: 'Biệt thự Ven sông', count: '12' },
              { icon: Activity, name: 'Căn hộ Studio', count: '86' }
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-8 group hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200">
                <cat.icon size={32} className="mb-6 transition-colors duration-300" style={{ color: COLORS.gold }} />
                <h3 className="text-xl mb-2 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{cat.name}</h3>
                <p className="text-sm uppercase tracking-wider font-light" style={{ color: COLORS.textLight }}>{cat.count} Sản phẩm</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Dự án Nổi bật</h2>
              <p className="text-lg max-w-xl font-light" style={{ color: COLORS.textLight }}>Những kiệt tác kiến trúc được tuyển chọn kỹ lưỡng, mang đến trải nghiệm sống vượt thời gian.</p>
            </div>
            <button 
              onClick={() => navigate('projects')}
              className="group flex items-center gap-2 pb-1 border-b uppercase text-sm tracking-widest font-medium" 
              style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            >
              Xem tất cả <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {MINIMAL_APARTMENTS.slice(0, 3).map((proj) => (
              <div key={proj.id} className="group cursor-pointer" onClick={() => setSelectedProject(proj)}>
                <div className="relative h-80 overflow-hidden mb-6 bg-gray-100">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={proj.img} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider font-medium">Mới ra mắt</div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl mb-2 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{proj.name}</h3>
                    <p className="flex items-center gap-1.5 text-sm font-light" style={{ color: COLORS.textLight }}>
                      <MapPin size={14} /> {proj.loc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-medium" style={{ color: COLORS.gold }}>{proj.priceLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT PREVIEW */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
                Triết lý sống <br />
                <span className="italic font-light" style={{ color: COLORS.textLight }}>Less is More.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-6 font-light" style={{ color: COLORS.textLight }}>
                Chúng tôi tin rằng sự xa xỉ thực sự không nằm ở những chi tiết phô trương, mà ẩn giấu trong khoảng không gian trống, chất liệu nguyên bản và ánh sáng tự nhiên.
              </p>
              <p className="text-lg leading-relaxed mb-10 font-light" style={{ color: COLORS.textLight }}>
                Mỗi dự án tại Minimal là một bản giao hương tĩnh lặng giữa kiến trúc đương đại và nhịp sống đô thị, tạo nên chốn về bình yên giữa lòng phố thị.
              </p>
              <button 
                onClick={() => navigate('about')}
                className="px-8 py-3 text-sm uppercase tracking-widest border transition-colors hover:bg-gray-100 font-medium"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                Về Minimal
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative pt-[120%] md:pt-[100%] w-full bg-gray-200">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1600607687931-cebf10cb7254?w=800&q=80" 
                  alt="Minimal Architecture" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US / CORE VALUES */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Giá trị Cốt lõi</h2>
            <p className="max-w-2xl mx-auto text-lg font-light" style={{ color: COLORS.textLight }}>Sự khác biệt tạo nên đẳng cấp thực sự của Minimal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Thiết kế Độc bản', desc: 'Mỗi dự án là một tác phẩm nghệ thuật kiến trúc riêng biệt.' },
              { title: 'Chất liệu Tinh tế', desc: 'Sử dụng vật liệu tự nhiên, bền vững và thân thiện môi trường.' },
              { title: 'Vị trí Đắc địa', desc: 'Kết nối hoàn hảo, nằm tại những khu vực trung tâm sầm uất nhất.' },
              { title: 'Dịch vụ Đặc quyền', desc: 'Trải nghiệm sống đẳng cấp với tiện ích đo ni đóng giày.' }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-gray-100 hover:border-gray-300 transition-colors bg-gray-50/50">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-white border" style={{ borderColor: COLORS.border, color: COLORS.primary }}>
                  <span className="font-medium font-serif" style={{ fontFamily: FONTS.heading }}>0{idx + 1}</span>
                </div>
                <h3 className="text-xl mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{item.title}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: COLORS.textLight }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AMENITIES */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="flex flex-col md:flex-row justify-between mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 md:mb-0 max-w-lg font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Đặc quyền <br/>Tiện ích</h2>
            <p className="max-w-md text-lg font-light" style={{ color: COLORS.textLight }}>Tận hưởng hệ sinh thái tiện ích hoàn hảo, chăm sóc toàn diện thân - tâm - trí ngay thềm nhà.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            {[
              { icon: Wind, label: 'Công viên Zen' },
              { icon: Droplets, label: 'Hồ bơi Vô cực' },
              { icon: Sun, label: 'Sky Lounge' },
              { icon: Activity, label: 'Gym & Yoga' },
              { icon: Coffee, label: 'Café & Bistro' },
              { icon: Shield, label: 'An ninh 24/7' }
            ].map((amenity, idx) => (
              <div key={idx} className="bg-white p-6 flex flex-col items-center justify-center aspect-square transition-transform hover:-translate-y-2 cursor-pointer border hover:border-gray-300 border-transparent">
                <amenity.icon size={32} className="mb-4" style={{ color: COLORS.primary }} />
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-800">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MASTER PLAN / FLOOR PLANS */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Mặt Bằng Căn Hộ</h2>
            <p className="max-w-2xl mx-auto text-lg mb-10 font-light" style={{ color: COLORS.textLight }}>Tối ưu hóa không gian, đón ánh sáng tự nhiên tuyệt đối.</p>
            
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {['1 Phòng ngủ', '2 Phòng ngủ', '3 Phòng ngủ'].map((tab, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-2 border rounded-full text-sm font-medium transition-colors ${activeTab === idx ? 'bg-gray-900 text-white border-gray-900' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-16 border" style={{ borderColor: COLORS.border }}>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="aspect-square bg-white border flex items-center justify-center p-8" style={{ borderColor: COLORS.border }}>
                  <div className="w-full h-full border-2 border-gray-300 relative flex items-center justify-center bg-gray-55">
                    <span className="text-gray-400 font-mono tracking-widest text-sm uppercase">Layout {activeTab + 1}PN</span>
                    <div className="absolute top-1/2 left-0 w-full border-t border-gray-200"></div>
                    <div className="absolute left-1/2 top-0 h-full border-l border-gray-200"></div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Type {String.fromCharCode(65 + activeTab)}</h3>
                <div className="space-y-4 pt-4 border-t font-light text-sm" style={{ borderColor: COLORS.border }}>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textLight }}>Diện tích tim tường</span>
                    <span className="font-semibold text-gray-800">{55 + activeTab * 25} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textLight }}>Diện tích thông thủy</span>
                    <span className="font-semibold text-gray-800">{50 + activeTab * 23} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: COLORS.textLight }}>Hướng cửa</span>
                    <span className="font-medium text-gray-800">Đông Nam / Tây Bắc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GALLERY MASONRY */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-6 ${MAX_W}`}>
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Thư Viện Ảnh</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"; }}
                alt="Phòng khách tối giản" 
                className="w-full h-full object-cover min-h-[400px] hover:opacity-90 transition-opacity cursor-pointer bg-gray-200 group-hover:scale-105 transition-all duration-500" 
                onClick={() => setSelectedGalleryImg("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85")}
              />
            </div>
            <div className="relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"; }}
                alt="Phòng ngủ hiện đại" 
                className="w-full h-full object-cover h-[200px] hover:opacity-90 transition-opacity cursor-pointer bg-gray-200 group-hover:scale-105 transition-all duration-500" 
                onClick={() => setSelectedGalleryImg("https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80")}
              />
            </div>
            <div className="relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"; }}
                alt="Khu vực bàn ăn" 
                className="w-full h-full object-cover h-[200px] hover:opacity-90 transition-opacity cursor-pointer bg-gray-200 group-hover:scale-105 transition-all duration-500" 
                onClick={() => setSelectedGalleryImg("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80")}
              />
            </div>
            <div className="relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"; }}
                alt="Ban công rộng mở" 
                className="w-full h-full object-cover h-[200px] hover:opacity-90 transition-opacity cursor-pointer bg-gray-200 group-hover:scale-105 transition-all duration-500" 
                onClick={() => setSelectedGalleryImg("https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80")}
              />
            </div>
            <div className="col-span-2 relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=1200&q=85" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"; }}
                alt="Kiến trúc tổng thể" 
                className="w-full h-full object-cover h-[200px] hover:opacity-90 transition-opacity cursor-pointer bg-gray-200 group-hover:scale-105 transition-all duration-500" 
                onClick={() => setSelectedGalleryImg("https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=1200&q=85")}
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('gallery')} 
              className="uppercase text-sm tracking-widest border-b pb-1 font-medium hover:text-gray-500 transition-colors" 
              style={{ borderColor: COLORS.primary }}
            >
              Xem toàn bộ thư viện
            </button>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Câu Chuyện Khách Hàng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Nguyễn Văn A', role: 'CEO Tech Company', text: 'Sự tối giản trong thiết kế đã mang lại cho tôi một không gian sống thực sự bình yên sau những giờ làm việc căng thẳng.' },
              { name: 'Trần Thị B', role: 'Nhà thiết kế thời trang', text: 'Từng chi tiết vật liệu đều thể hiện sự tinh tế. Ánh sáng tự nhiên được tận dụng tối đa khiến căn hộ luôn tràn đầy năng lượng.' },
              { name: 'Lê Hoàng C', role: 'Nhà đầu tư', text: 'Giá trị bền vững và tính thẩm mỹ vượt thời gian là lý do tôi chọn đầu tư nhiều sản phẩm của Minimal.' }
            ].map((testi, idx) => (
              <div key={idx} className="p-10 bg-gray-50 border" style={{ borderColor: COLORS.border }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-current text-black" />)}
                </div>
                <p className="text-lg italic mb-8 leading-relaxed font-light" style={{ color: COLORS.textLight }}>"{testi.text}"</p>
                <div>
                  <h4 className="font-semibold mb-1 font-serif text-gray-800" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{testi.name}</h4>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">{testi.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TIMELINE */}
      <section className="py-24 bg-[#111111] text-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading }}>Tiến độ Dự án</h2>
            <p className="text-gray-400 font-light">Cam kết chất lượng và thời gian chuẩn xác.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-800 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { time: 'Q1 2024', title: 'Khởi công & Móng', status: 'completed' },
                { time: 'Q3 2024', title: 'Cất nóc', status: 'completed' },
                { time: 'Q1 2025', title: 'Hoàn thiện Nội thất', status: 'active' },
                { time: 'Q4 2025', title: 'Bàn giao', status: 'pending' }
              ].map((step, idx) => (
                <div key={idx} className="relative pt-8 md:pt-0">
                  <div className={`w-4 h-4 rounded-full mb-6 mx-auto md:mx-0 relative z-10 ${step.status === 'completed' ? 'bg-white' : step.status === 'active' ? 'bg-[#C8A96E]' : 'bg-gray-800'}`}></div>
                  <div className="text-center md:text-left">
                    <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2">{step.time}</span>
                    <h4 className="text-lg font-serif" style={{ fontFamily: FONTS.heading }}>{step.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. LATEST NEWS */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Góc Nhìn</h2>
            <button onClick={() => navigate('news')} className="uppercase text-sm tracking-widest border-b pb-1 hidden md:block font-medium">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.slice(0, 3).map((news) => (
              <div key={news.id} className="group cursor-pointer animate-in fade-in duration-300" onClick={() => setSelectedArticle(news)}>
                <div className="overflow-hidden mb-6 bg-gray-100 aspect-[4/3]">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block font-semibold">{news.date}</span>
                <h3 className="text-xl group-hover:text-gray-500 transition-colors leading-snug font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{news.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-6 max-w-4xl`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Câu Hỏi Thường Gặp</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Quy trình thanh toán như thế nào?', a: 'Khách hàng có thể thanh toán theo tiến độ xây dựng (10 đợt) hoặc thanh toán nhanh 95% để nhận chiết khấu 8%. Ngân hàng hỗ trợ vay 70%.' },
              { q: 'Pháp lý dự án đã hoàn thiện chưa?', a: 'Dự án đã có đầy đủ giấy phép xây dựng, phê duyệt 1/500 và văn bản đủ điều kiện huy động vốn từ Sở Xây dựng.' },
              { q: 'Tiêu chuẩn bàn giao bao gồm những gì?', a: 'Căn hộ được bàn giao hoàn thiện cơ bản với nội thất liền tường cao cấp từ các thương hiệu như Hafele, Kohler, Daikin.' },
              { q: 'Phí quản lý dự kiến là bao nhiêu?', a: 'Phí quản lý dự kiến là 25,000 VND/m2/tháng (chưa VAT), miễn phí năm đầu tiên cho cư dân.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200">
                <button 
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-semibold text-lg font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{faq.q}</span>
                  {activeFaq === idx ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-light text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. CONTACT CTA */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 max-w-3xl text-center`}>
          {contactSubmitted ? (
            <div className="py-12 bg-gray-50 border border-gray-200 rounded-sm px-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={36} />
              </div>
              <h2 className="text-3xl mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
                Gửi Yêu Cầu Thành Công!
              </h2>
              <p className="text-gray-500 mb-8 font-light max-w-md mx-auto">
                Cảm ơn {contactName || 'quý khách'}. Chuyên viên tư vấn của Minimal sẽ liên hệ lại qua số điện thoại <strong className="text-gray-800">{contactPhone}</strong> trong vòng 15 phút.
              </p>
              <button 
                onClick={() => {
                  setContactSubmitted(false);
                  setContactName('');
                  setContactPhone('');
                  setContactEmail('');
                  setContactMessage('');
                }}
                className="px-8 py-3 bg-gray-900 hover:bg-black text-white text-sm uppercase tracking-widest font-medium transition-colors"
              >
                Gửi lại yêu cầu khác
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Kết nối với Minimal</h2>
              <p className="text-lg text-gray-500 mb-12 font-light">Để lại thông tin, chuyên viên tư vấn của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              {contactError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm text-left">
                  {contactError}
                </div>
              )}
              <form className="space-y-6 text-left" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Họ và tên *" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                  />
                  <input 
                    type="text" 
                    placeholder="Số điện thoại *" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email *" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                />
                <textarea 
                  placeholder="Bạn quan tâm đến sản phẩm nào?" 
                  rows={4} 
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light"
                ></textarea>
                <button type="submit" className="w-full py-4 text-white uppercase tracking-widest font-semibold bg-gray-900 hover:bg-black transition-colors text-sm">Gửi Yêu Cầu</button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* 16. NEWSLETTER */}
      <section className="py-20 bg-[#111111] text-white">
        <div className={`mx-auto px-6 ${MAX_W} text-center`}>
          <h3 className="text-2xl mb-4 font-serif" style={{ fontFamily: FONTS.heading }}>Đăng ký nhận bản tin</h3>
          {newsletterSubmitted ? (
            <p className="text-[#C8A96E] font-medium animate-pulse mt-4">Cảm ơn bạn đã đăng ký nhận bản tin của Minimal!</p>
          ) : (
            <>
              <p className="text-gray-400 mb-8 max-w-md mx-auto font-light">Nhận thông tin cập nhật mới nhất về các dự án và xu hướng thiết kế nội thất.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto border-b border-gray-600 focus-within:border-white transition-colors pb-2">
                <input 
                  type="email" 
                  placeholder="Nhập địa chỉ email của bạn..." 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-500 font-light" 
                />
                <button type="submit" className="uppercase text-sm tracking-widest ml-4 hover:text-gray-300 whitespace-nowrap font-medium">Đăng ký</button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div className="py-24 bg-white min-h-screen">
      <div className={`mx-auto px-6 ${MAX_W}`}>
        <h1 className="text-5xl md:text-6xl mb-4 text-center font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Bộ Sưu Tập Dự Án</h1>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto font-light">
          Khám phá các kiệt tác không gian sống mang đậm phong cách tối giản.
        </p>

        {/* Filter bar */}
        <div className="bg-gray-50 p-6 mb-16 border flex flex-col lg:flex-row gap-4 items-center justify-between" style={{ borderColor: COLORS.border }}>
          {/* Search bar */}
          <div className="relative w-full lg:w-1/3">
            <input 
              type="text"
              placeholder="Tìm kiếm dự án, khu vực..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 outline-none text-sm focus:border-gray-900 transition-colors font-light"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-2/3">
            {/* Style Filter */}
            <div className="flex flex-col">
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 outline-none text-sm focus:border-gray-900 transition-colors font-light text-gray-700"
              >
                <option value="all">Tất cả phong cách</option>
                <option value="Japandi">Japandi</option>
                <option value="Scandinavian">Scandinavian</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            {/* Size Filter */}
            <div className="flex flex-col">
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 outline-none text-sm focus:border-gray-900 transition-colors font-light text-gray-700"
              >
                <option value="all">Tất cả diện tích</option>
                <option value="under-60">Dưới 60 m²</option>
                <option value="60-100">60 - 100 m²</option>
                <option value="over-100">Trên 100 m²</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 outline-none text-sm focus:border-gray-900 transition-colors font-light text-gray-700"
              >
                <option value="all">Tất cả giá</option>
                <option value="under-5">Dưới 5 Tỷ</option>
                <option value="5-8">5 - 8 Tỷ</option>
                <option value="over-8">Trên 8 Tỷ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-24">
            {filteredProjects.map((proj, idx) => (
              <div key={proj.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                <div 
                  className="w-full md:w-2/3 bg-gray-100 aspect-video relative overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProject(proj)}
                >
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                    src={proj.img} 
                    alt={proj.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                    {proj.style}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-2 font-medium">{proj.loc}</span>
                  <h3 className="text-4xl mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{proj.name}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed font-light">{proj.desc}</p>
                  <div className="space-y-3 mb-8 text-sm border-t border-b py-4 font-light" style={{ borderColor: COLORS.border }}>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Diện tích</span>
                      <span className="font-semibold text-gray-800">{proj.size} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Thiết kế</span>
                      <span className="font-semibold text-gray-800">{proj.bedrooms} PN / {proj.bathrooms} WC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Giá dự kiến</span>
                      <span className="font-bold" style={{ color: COLORS.gold }}>{proj.priceLabel}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(proj)}
                    className="uppercase text-sm tracking-widest border-b border-gray-900 pb-1 font-semibold hover:text-gray-500 transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 border border-dashed rounded-sm">
            <Info size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl mb-2 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Không tìm thấy dự án phù hợp</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto font-light">Vui lòng điều chỉnh hoặc xóa các bộ lọc để tìm thấy kết quả mong muốn.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setStyleFilter('all');
                setSizeFilter('all');
                setPriceFilter('all');
              }}
              className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Thiết lập lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gray-50">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-3 font-semibold">Về chúng tôi</span>
            <h1 className="text-5xl md:text-6xl mb-8 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Triết lý Minimal</h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-12 font-light">
              Chúng tôi không xây dựng những tòa nhà. Chúng tôi kiến tạo những không gian tĩnh lặng, nơi con người tìm thấy sự bình yên và kết nối lại với chính mình.
            </p>
            <div className="aspect-video bg-gray-200 w-full mb-16 relative overflow-hidden">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687931-cebf10cb7254?w=1200&q=80" alt="About Hero" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
            <div>
              <span className="text-sm uppercase tracking-widest font-semibold" style={{ color: COLORS.gold }}>01 / Tầm nhìn</span>
              <h2 className="text-3xl mt-2 mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Tầm nhìn</h2>
              <p className="text-gray-500 leading-relaxed font-light">
                Trở thành biểu tượng của phong cách sống tối giản và tinh tế tại Việt Nam. Minimal tiên phong mang đến những kiệt tác kiến trúc vượt thời gian, loại bỏ sự dư thừa, giữ lại tinh hoa để tôn vinh sự thư thái đích thực trong tâm hồn.
              </p>
            </div>
            <div>
              <span className="text-sm uppercase tracking-widest font-semibold" style={{ color: COLORS.gold }}>02 / Sứ mệnh</span>
              <h2 className="text-3xl mt-2 mb-6 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Sứ mệnh</h2>
              <p className="text-gray-500 leading-relaxed font-light">
                Định hình lại không gian sống đô thị thông qua thiết kế tối giản, vật liệu bền vững và sự kết nối hài hòa giữa con người - thiên nhiên - kiến trúc, mang đến giá trị sống vững bền cho các thế hệ cư dân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-3 font-semibold">Hệ giá trị</span>
            <h2 className="text-4xl md:text-5xl font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Giá Trị Cốt Lõi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Tối giản', subtitle: 'Minimalism', desc: 'Loại bỏ các chi tiết thừa thãi để tập trung vào những giá trị cốt lõi nhất của không gian.' },
              { title: 'Bền vững', subtitle: 'Sustainability', desc: 'Sử dụng vật liệu thân thiện môi trường và tối ưu hóa năng lượng tự nhiên.' },
              { title: 'Tinh tế', subtitle: 'Refinement', desc: 'Mọi đường nét, màu sắc và ánh sáng đều được thiết kế có chủ ý với sự chuẩn xác cao.' },
              { title: 'Chân thực', subtitle: 'Authenticity', desc: 'Kiến tạo chốn về trung thực với cảm xúc bản nguyên, nuôi dưỡng thân - tâm - trí.' }
            ].map((val, idx) => (
              <div key={idx} className="p-8 bg-gray-50 border border-gray-100 relative group hover:border-gray-900 transition-colors">
                <span className="absolute right-6 top-6 text-3xl font-serif text-gray-200 group-hover:text-gray-800 transition-colors duration-300 font-bold">0{idx + 1}</span>
                <h3 className="text-2xl mb-1 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{val.title}</h3>
                <span className="text-xs uppercase tracking-widest text-gray-450 block mb-4 font-semibold">{val.subtitle}</span>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-24 bg-gray-50 border-b" style={{ borderColor: COLORS.border }}>
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-3 font-semibold">Hành trình phát triển</span>
            <h2 className="text-4xl md:text-5xl font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Cột Mốc Lịch Sử</h2>
          </div>
          
          <div className="relative border-l border-gray-205 max-w-3xl mx-auto pl-8 space-y-12">
            {[
              { year: '2012', title: 'Thành lập thương hiệu', desc: 'Khởi đầu từ văn phòng thiết kế kiến trúc phong cách tối giản với 5 thành viên sáng lập.' },
              { year: '2015', title: 'Dự án đầu tay The M - Riverside', desc: 'Bàn giao tổ hợp căn hộ tối giản đầu tiên tại Quận 2, ghi nhận 100% tỷ lệ lấp đầy trong 3 tháng.' },
              { year: '2018', title: 'Giải thưởng Kiến trúc Quốc tế', desc: 'Được vinh danh tại hạng mục "Thiết kế Nội thất Tối giản xuất sắc nhất" khu vực Đông Nam Á.' },
              { year: '2021', title: 'Tiên phong Vật liệu Xanh', desc: 'Ứng dụng các giải pháp xây dựng tuần hoàn và sơn hiệu ứng đất sét tự nhiên cho 100% căn hộ.' },
              { year: '2024', title: 'Hệ sinh thái BĐS Quiet Luxury', desc: 'Mở rộng quy mô phát triển các dự án căn hộ cao cấp và dòng biệt thự ven sông độc bản.' },
              { year: '2026', title: 'Tái định vị thương hiệu', desc: 'Nâng tầm Minimal trở thành đơn vị tiên phong phát triển phong cách tối giản cao cấp tại Việt Nam.' }
            ].map((milestone, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-white bg-gray-900 flex items-center justify-center"></div>
                <span className="text-2xl font-serif font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.gold }}>{milestone.year}</span>
                <h4 className="text-xl font-medium mt-1 mb-2 text-gray-800">{milestone.title}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-3 font-semibold">Đội ngũ sáng lập</span>
            <h2 className="text-4xl text-center mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Ban Sáng Lập</h2>
            <p className="text-gray-500 max-w-md mx-auto font-light">Những người đặt nền móng và định hướng cho triết lý phát triển của Minimal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'David Nguyen', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', bio: 'Cựu kiến trúc sư trưởng tại Nhật Bản, 20 năm kinh nghiệm thiết kế quy hoạch đô thị tối giản.' },
              { name: 'Sarah Tran', role: 'Chief Architect', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', bio: 'Thạc sĩ Kiến trúc Đan Mạch, người thổi hồn phong cách Bắc Âu (Scandinavian) ấm áp vào từng dự án.' },
              { name: 'Michael Le', role: 'Design Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', bio: 'Nhà thiết kế nội thất đạt nhiều giải thưởng châu Á, chuyên gia về vật liệu tự nhiên và nghệ thuật ánh sáng.' }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-56 h-56 mx-auto rounded-full overflow-hidden mb-6 bg-gray-100 grayscale group-hover:grayscale-0 transition-all duration-500 border border-gray-200 p-1">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-2xl mb-1 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>{member.name}</h3>
                <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: COLORS.gold }}>{member.role}</p>
                <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed font-light">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderGallery = () => {
    const filteredGallery = GALLERY_ITEMS.filter(item => selectedGalleryTab === 'all' || item.cat === selectedGalleryTab);
    return (
      <div className="py-24 bg-white min-h-screen">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <h1 className="text-5xl md:text-6xl mb-4 text-center font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Thư Viện Ảnh</h1>
          <p className="text-center text-gray-500 mb-16 font-light max-w-md mx-auto">
            Chiêm ngưỡng những góc nhìn chân thực và tinh khiết nhất tại các dự án độc quyền của Minimal.
          </p>
          
          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-12 flex-wrap border-b pb-4" style={{ borderColor: COLORS.border }}>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'exterior', label: 'Ngoại thất' },
              { id: 'interior', label: 'Nội thất' },
              { id: 'amenities', label: 'Tiện ích' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id)}
                className={`uppercase text-sm tracking-widest pb-1 font-medium transition-all ${selectedGalleryTab === tab.id ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid list */}
          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredGallery.map((item, idx) => {
                const isWide = idx === 4 || idx === 5;
                return (
                  <div 
                    key={item.id} 
                    className={`relative group overflow-hidden bg-gray-100 cursor-pointer ${isWide ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}
                    onClick={() => setSelectedGalleryImg(item.img)}
                  >
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs uppercase tracking-widest text-white/70 block mb-1">{item.cat}</span>
                        <h4 className="text-white text-lg font-serif" style={{ fontFamily: FONTS.heading }}>{item.title}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 font-light">Không có hình ảnh nào trong chủ đề này.</div>
          )}
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = NEWS_ARTICLES.filter(article => {
      const matchSearch = article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
                          article.cat.toLowerCase().includes(searchNewsQuery.toLowerCase());
      return matchSearch;
    });

    const featuredArticle = filteredNews[0];
    const restArticles = filteredNews.slice(1);

    return (
      <div className="py-24 bg-gray-50 min-h-screen">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <h1 className="text-5xl md:text-6xl mb-4 text-center font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Tin tức & Cẩm nang</h1>
          <p className="text-center text-gray-500 mb-12 font-light max-w-md mx-auto">
            Nơi chia sẻ các bài viết về kiến trúc tối giản, triết lý thiết kế và cập nhật tiến độ dự án.
          </p>

          {/* Search News */}
          <div className="max-w-md mx-auto mb-16 relative">
            <input 
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchNewsQuery}
              onChange={(e) => setSearchNewsQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 outline-none text-sm focus:border-gray-900 transition-colors pl-10 font-light"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchNewsQuery && (
              <button 
                onClick={() => setSearchNewsQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Featured Article */}
          {featuredArticle && !searchNewsQuery && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 bg-white p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div 
                className="bg-gray-250 aspect-video overflow-hidden group cursor-pointer"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src={featuredArticle.img} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm uppercase tracking-widest text-gray-500 mb-4 block font-semibold">
                  {featuredArticle.cat} • {featuredArticle.date}
                </span>
                <h2 
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="text-3xl md:text-4xl mb-6 leading-tight hover:text-gray-605 cursor-pointer transition-colors font-serif" 
                  style={{ fontFamily: FONTS.heading, color: COLORS.primary }}
                >
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-550 mb-8 leading-relaxed font-light text-sm">{featuredArticle.summary}</p>
                <div>
                   <button 
                     onClick={() => setSelectedArticle(featuredArticle)}
                     className="uppercase text-sm tracking-widest border-b border-gray-900 pb-1 font-semibold hover:text-gray-650 transition-colors"
                   >
                     Đọc tiếp
                   </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid of matched articles */}
          {filteredNews.length > 0 ? (
            <div>
              {searchNewsQuery && (
                <h3 className="text-xl mb-8 font-light">
                  Kết quả tìm kiếm cho "{searchNewsQuery}" ({filteredNews.length} bài viết):
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(searchNewsQuery ? filteredNews : restArticles).map((news) => (
                  <div 
                    key={news.id} 
                    className="group cursor-pointer bg-white p-4 border border-gray-100 hover:shadow-lg transition-all flex flex-col justify-between"
                    onClick={() => setSelectedArticle(news)}
                  >
                    <div>
                      <div className="overflow-hidden mb-6 bg-gray-100 aspect-video">
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                          src={news.img} 
                          alt={news.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block font-semibold">{news.cat} • {news.date}</span>
                      <h3 className="text-lg group-hover:text-gray-605 transition-colors leading-snug font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
                        {news.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50">
                      <span className="text-sm font-semibold uppercase tracking-wider text-gray-900 group-hover:underline">Đọc bài</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed rounded-sm">
              <Info size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl mb-2 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Không tìm thấy bài viết nào</h3>
              <p className="text-gray-500 font-light">Vui lòng thử lại với từ khóa khác.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    if (contactSubmitted) {
      return (
        <div className="py-24 bg-white min-h-[60vh] flex items-center justify-center animate-in fade-in duration-300">
          <div className="max-w-md w-full text-center px-6 py-12 bg-gray-50 border border-gray-200 rounded-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={36} />
            </div>
            <h2 className="text-3xl mb-4 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>
              Gửi Yêu Cầu Thành Công!
            </h2>
            <p className="text-gray-500 mb-8 font-light text-sm leading-relaxed">
              Cảm ơn <strong>{contactName}</strong>. Chuyên viên tư vấn của Minimal sẽ liên hệ lại với quý khách qua số điện thoại <strong className="text-gray-800">{contactPhone}</strong> hoặc email <strong className="text-gray-800">{contactEmail}</strong> trong vòng 15 phút.
            </p>
            <button 
              onClick={() => {
                setContactSubmitted(false);
                setContactName('');
                setContactPhone('');
                setContactEmail('');
                setContactMessage('');
              }}
              className="px-8 py-3 bg-gray-900 hover:bg-black text-white text-sm uppercase tracking-widest font-semibold transition-colors"
            >
              Gửi tin nhắn mới
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="py-24 bg-white min-h-screen">
        <div className={`mx-auto px-6 ${MAX_W}`}>
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <h1 className="text-5xl mb-8 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Liên hệ</h1>
              <p className="text-gray-500 mb-12 font-light">Đội ngũ chuyên viên của Minimal luôn sẵn sàng hỗ trợ và tư vấn chi tiết về các dự án.</p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Văn phòng chính</h4>
                  <p className="text-gray-800 font-light">Tầng 15, Tòa nhà Minimal, 123 Đường Tôn Đức Thắng, Quận 1, TP.HCM</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Điện thoại</h4>
                  <p className="text-gray-800 font-light">0909 123 456</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Email</h4>
                  <p className="text-gray-800 font-light">contact@minimal.vn</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Giờ làm việc</h4>
                  <p className="text-gray-800 font-light">Thứ 2 - Thứ 7: 8:00 - 18:00<br/>Chủ nhật: Đặt lịch hẹn trước</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 bg-gray-50 p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl mb-8 font-serif" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Gửi tin nhắn cho chúng tôi</h2>
              {contactError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                  {contactError}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-550 mb-2 font-semibold">Họ và tên *</label>
                    <input 
                      type="text" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-550 mb-2 font-semibold">Số điện thoại *</label>
                    <input 
                      type="text" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-550 mb-2 font-semibold">Email *</label>
                  <input 
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-550 mb-2 font-semibold">Nội dung quan tâm</label>
                  <textarea 
                    rows={4} 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-sm font-light"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="uppercase text-sm tracking-widest bg-gray-900 text-white px-10 py-4 hover:bg-black transition-colors w-full md:w-auto font-semibold"
                >
                  Gửi yêu cầu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Project Details Modal overlay
  const renderProjectModal = () => {
    if (!selectedProject) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setSelectedProject(null)}>
        <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm z-10"
          >
            <X size={24} style={{ color: COLORS.primary }} />
          </button>
          
          <div className="aspect-[21/9] w-full bg-gray-100 relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div>
                <span className="px-3 py-1 bg-white/20 text-white backdrop-blur text-xs uppercase tracking-wider font-semibold inline-block mb-3">
                  Phong cách {selectedProject.style}
                </span>
                <h2 className="text-3xl md:text-5xl text-white font-serif" style={{ fontFamily: FONTS.heading }}>
                  {selectedProject.name}
                </h2>
              </div>
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: COLORS.primary }}>Mô tả dự án</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm">{selectedProject.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 font-serif" style={{ color: COLORS.primary }}>Đặc điểm nổi bật</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 font-light">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm space-y-6">
              <h3 className="text-lg font-serif border-b pb-2 text-gray-805" style={{ fontFamily: FONTS.heading, color: COLORS.primary }}>Thông số chi tiết</h3>
              <div className="space-y-3 text-sm font-light">
                <div className="flex justify-between">
                  <span className="text-gray-500">Giá bán</span>
                  <span className="font-bold text-gray-950" style={{ color: COLORS.gold }}>{selectedProject.priceLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vị trí</span>
                  <span className="font-semibold text-gray-800">{selectedProject.loc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Diện tích</span>
                  <span className="font-semibold text-gray-800">{selectedProject.size} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phong cách</span>
                  <span className="font-semibold text-gray-800">{selectedProject.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Thiết kế</span>
                  <span className="font-semibold text-gray-800">{selectedProject.bedrooms} PN / {selectedProject.bathrooms} WC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bàn giao</span>
                  <span className="font-semibold text-gray-800">{selectedProject.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quy mô</span>
                  <span className="font-semibold text-gray-800">{selectedProject.scale}</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setContactSubmitted(false);
                  navigate('contact');
                }}
                className="w-full py-3 bg-gray-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Nhận tư vấn mặt bằng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Gallery Lightbox overlay
  const renderGalleryLightbox = () => {
    if (!selectedGalleryImg) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200" onClick={() => setSelectedGalleryImg(null)}>
        <button 
          onClick={() => setSelectedGalleryImg(null)}
          className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>
        <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Gallery Lightbox" className="max-w-full max-h-[75vh] object-contain shadow-2xl" />
          <p className="text-white/80 mt-4 text-center tracking-wide text-lg font-serif">
            {GALLERY_ITEMS.find(item => item.img === selectedGalleryImg)?.title || 'Minimal Space Design'}
          </p>
        </div>
      </div>
    );
  };

  // Render News Article read modal overlay
  const renderNewsModal = () => {
    if (!selectedArticle) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setSelectedArticle(null)}>
        <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm z-10"
          >
            <X size={24} style={{ color: COLORS.primary }} />
          </button>
          
          <div className="aspect-[16/9] w-full bg-gray-100 relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <span className="px-3 py-1 bg-white/20 text-white backdrop-blur text-xs uppercase tracking-wider font-semibold inline-block mb-3">
                  {selectedArticle.cat}
                </span>
                <h2 className="text-2xl md:text-4xl text-white font-serif leading-tight" style={{ fontFamily: FONTS.heading }}>
                  {selectedArticle.title}
                </h2>
                <p className="text-white/80 text-xs mt-2 font-medium">{selectedArticle.date}</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-lg font-medium text-gray-800 leading-relaxed mb-6 border-l-4 pl-4 font-serif" style={{ borderColor: COLORS.gold }}>
              {selectedArticle.summary}
            </p>
            
            <div className="text-gray-600 leading-relaxed space-y-4 font-light text-sm">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-12 pt-6 border-t flex justify-between items-center" style={{ borderColor: COLORS.border }}>
              <span className="text-sm text-gray-500">Chủ đề: <strong className="text-gray-700">{selectedArticle.cat}</strong></span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-gray-150 hover:bg-gray-200 text-gray-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-900" style={{ backgroundColor: COLORS.bg, fontFamily: FONTS.body }}>
      {renderHeader()}
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'projects' && renderProjects()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'gallery' && renderGallery()}
        {currentPage === 'news' && renderNews()}
        {currentPage === 'contact' && renderContact()}
      </main>
      {renderFooter()}

      {/* Detail Overlays */}
      {selectedProject && renderProjectModal()}
      {selectedGalleryImg && renderGalleryLightbox()}
      {selectedArticle && renderNewsModal()}
    </div>
  );
}
