'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import {
  MapPin, Phone, Mail, ChevronDown, ChevronUp, Star, Award, Clock,
  ArrowRight, Trees, Shield, Compass,
  Droplets, Wind, Sun, Menu, X, Play, Quote, Instagram,
  Facebook, Youtube, Users, Trophy, Layers, Search, Building2, Check
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

const C = {
  bg: '#FDF6F0',
  primary: '#7C2D12',
  accent: '#DC9D5F',
  text: '#3b1906',
  muted: '#8b6954',
  border: '#e8d5c0',
  white: '#ffffff'
};

const fontHeading: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
const fontBody: React.CSSProperties = { fontFamily: "'Source Serif 4', serif" };

const IMG = {
  hero: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80',
  about: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
};

interface Villa {
  id: string;
  title: string;
  price: number; // in Billion VND
  priceStr: string;
  img: string;
  images: string[];
  area: string;
  areaNum: number;
  tag: string; // Limited, Signature, Premium
  type: string; // Biệt Thự Đơn Lập, Biệt Thự Song Lập, Dinh Thự
  location: string; // Ven Sông, Trung Tâm, Sân Golf
  description: string;
  beds: number;
  baths: number;
  status: string; // Mở Bán, Sắp Ra Mắt
  direction: string;
  year: string;
  amenities: string[];
}

const VILLAS: Villa[] = [
  {
    id: 'v1',
    title: 'The Royal Villa',
    price: 45,
    priceStr: 'Từ 45 Tỷ',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    area: '450m²',
    areaNum: 450,
    tag: 'Limited',
    type: 'Biệt Thự Đơn Lập',
    location: 'Ven Sông',
    description: 'Tuyệt tác biệt thự ven sông mang đậm nét kiến trúc Pháp cổ điển. Sở hữu khoảng sân vườn rộng lớn, hồ bơi riêng biệt và tầm nhìn panorama đắt giá ôm trọn dòng sông thơ mộng. Một không gian sống yên bình, biệt lập nhưng vẫn đẳng cấp.',
    beds: 5,
    baths: 6,
    status: 'Mở Bán',
    direction: 'Đông Nam',
    year: '2026',
    amenities: ['Hồ bơi riêng', 'Sân vườn', 'Hầm rượu', 'Smart Home', 'An ninh 24/7']
  },
  {
    id: 'v2',
    title: 'Heritage Manor',
    price: 120,
    priceStr: 'Từ 120 Tỷ',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=800&q=80'
    ],
    area: '850m²',
    areaNum: 850,
    tag: 'Signature',
    type: 'Dinh Thự',
    location: 'Ven Sông',
    description: 'Dinh thự đế vương siêu sang với diện tích sử dụng lên tới 850m². Thiết kế thông tầng lộng lẫy, nội thất nhập khẩu trực tiếp từ Ý và Pháp. Dinh thự có lối đi riêng, bến du thuyền gia đình và khuôn viên cảnh quan được thiết kế bởi nghệ nhân quốc tế.',
    beds: 6,
    baths: 8,
    status: 'Mở Bán',
    direction: 'Nam',
    year: '2027',
    amenities: ['Bến du thuyền', 'Hồ bơi tràn viền', 'Rạp phim gia đình', 'Phòng xông hơi', 'Hầm để 4 ô tô']
  },
  {
    id: 'v3',
    title: 'Classic Residence',
    price: 38,
    priceStr: 'Từ 38 Tỷ',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1613490908676-e0ce6373e32e?w=800&q=80'
    ],
    area: '380m²',
    areaNum: 380,
    tag: 'Premium',
    type: 'Biệt Thự Song Lập',
    location: 'Trung Tâm',
    description: 'Sự kết hợp hoàn hảo giữa nét cổ điển quý phái và nhịp sống đô thị hiện đại. Nằm tại phân khu trung tâm, liền kề đại lộ Heritage và tổ hợp Clubhouse cao cấp, mang lại sự tiện nghi tối đa cho chủ nhân sở hữu.',
    beds: 4,
    baths: 5,
    status: 'Mở Bán',
    direction: 'Đông',
    year: '2026',
    amenities: ['Gần Clubhouse', 'Sân vườn nhỏ', 'Gara ô tô', 'Hệ thống năng lượng xanh']
  },
  {
    id: 'v4',
    title: 'Grand Golf Mansion',
    price: 85,
    priceStr: 'Từ 85 Tỷ',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    area: '720m²',
    areaNum: 720,
    tag: 'Signature',
    type: 'Dinh Thự',
    location: 'Sân Golf',
    description: 'Dinh thự độc bản tọa lạc ngay bên thảm cỏ xanh mướt của sân golf 18 hố quốc tế. Tầm nhìn mở rộng không giới hạn ra hồ cảnh quan và đồi cỏ nhấp nhô. Thiết kế theo phong cách Indochine sang trọng, thoáng đãng.',
    beds: 5,
    baths: 7,
    status: 'Sắp Ra Mắt',
    direction: 'Tây Nam',
    year: '2027',
    amenities: ['View trực diện Sân Golf', 'Hồ bơi nước khoáng', 'Sân tập golf mini', 'Hệ thống lọc nước trung tâm']
  },
  {
    id: 'v5',
    title: 'Sunset Riverside Villa',
    price: 52,
    priceStr: 'Từ 52 Tỷ',
    img: 'https://images.unsplash.com/photo-1613490908676-e0ce6373e32e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490908676-e0ce6373e32e?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    area: '500m²',
    areaNum: 500,
    tag: 'Limited',
    type: 'Biệt Thự Đơn Lập',
    location: 'Ven Sông',
    description: 'Biệt thự góc đắt giá với hai mặt thoáng đón trọn hướng gió mát lành từ sông và ánh hoàng hôn rực rỡ buổi chiều tà. Khoảng sân vườn rộng bao quanh thích hợp cho những buổi tiệc nướng ngoài trời ấm cúng.',
    beds: 5,
    baths: 6,
    status: 'Mở Bán',
    direction: 'Tây',
    year: '2026',
    amenities: ['Hai mặt tiền sông', 'Sân vườn tiệc nướng', 'Hồ bơi vô cực', 'Phòng tập gym cá nhân']
  },
  {
    id: 'v6',
    title: 'The Imperial Townhouse',
    price: 28,
    priceStr: 'Từ 28 Tỷ',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
    ],
    area: '320m²',
    areaNum: 320,
    tag: 'Premium',
    type: 'Biệt Thự Song Lập',
    location: 'Trung Tâm',
    description: 'Căn biệt thự song lập mang phong cách Tân cổ điển lịch lãm, tọa lạc tại phân khu lõi sầm uất nhưng vẫn giữ được sự yên bình nhờ hàng cây cổ thụ che bóng mát. Thiết kế tối ưu hóa công năng và ánh sáng tự nhiên.',
    beds: 4,
    baths: 4,
    status: 'Mở Bán',
    direction: 'Đông Bắc',
    year: '2026',
    amenities: ['Gần công viên trung tâm', 'Hệ thống Smart Home', 'Chỗ đậu xe rộng rãi', 'Hồ cá koi nhỏ']
  }
];

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  img: string;
  summary: string;
  content: string;
}

const NEWS_ARTICLES: Article[] = [
  {
    id: 'n1',
    title: 'Lễ ra mắt bộ sưu tập biệt thự giới hạn Heritage Riverside',
    date: '15 Th07, 2026',
    category: 'Sự Kiện',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    summary: 'Heritage Real Estate chính thức giới thiệu bộ sưu tập biệt thự ven sông Heritage Riverside giới hạn với các đặc quyền có một không hai.',
    content: 'Ngày 15/07/2026, tại khách sạn Grand Heritage, lễ công bố phân khu ven sông cao cấp nhất của dự án đã diễn ra thành công rực rỡ với sự góp mặt của hơn 200 khách mời VVIP. Bộ sưu tập Heritage Riverside bao gồm các biệt thự đơn lập và dinh thự được thiết kế tinh xảo bởi các kiến trúc sư hàng đầu thế giới. Các sản phẩm này sở hữu đặc quyền bến du thuyền riêng và dịch vụ Concierge đẳng cấp 6 sao, mở ra một chuẩn mực sống mới cho giới thượng lưu Việt Nam.'
  },
  {
    id: 'n2',
    title: 'Nghệ thuật bài trí nội thất tân cổ điển trong dinh thự sang trọng',
    date: '02 Th07, 2026',
    category: 'Thiết Kế',
    img: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80',
    summary: 'Khám phá triết lý đằng sau nghệ thuật bài trí không gian sống cổ điển, nơi những chi tiết thủ công tinh xảo tôn vinh cá tính gia chủ.',
    content: 'Thiết kế tân cổ điển không đơn thuần là sự kết hợp các hoa văn phức tạp, mà là nghệ thuật cân bằng giữa tỷ lệ vàng và công năng hiện đại. Theo giám đốc thiết kế Jean-Louis, mỗi sản phẩm gỗ gõ đỏ chạm khắc thủ công, các chi tiết mạ vàng 24K hay những phiến đá marble Carrara nhập khẩu nguyên tấm từ Ý đều được sắp đặt tỉ mỉ để kể một câu chuyện về địa vị và phong cách nghệ thuật của chủ nhân. Không gian sống không chỉ đẹp mà phải mang lại sự ấm áp và bình yên tối đa.'
  },
  {
    id: 'n3',
    title: 'Đặc quyền thượng lưu tại Heritage Clubhouse và dịch vụ Concierge',
    date: '28 Th06, 2026',
    category: 'Đặc Quyền',
    img: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&q=80',
    summary: 'Khu Clubhouse đặc quyền dành riêng cho cư dân Heritage chính thức đi vào hoạt động với chuỗi tiện ích đẳng cấp quốc tế.',
    content: 'Được thiết kế như một lâu đài cổ điển giữa lòng dự án, Heritage Clubhouse mang đến các tiện ích độc bản: phòng xì-gà (Cigar Lounge) thượng hạng, hầm rượu vang lưu trữ hàng nghìn nhãn hiệu nổi tiếng, phòng họp VIP cách âm tuyệt đối và hồ bơi khoáng nóng ngoài trời. Đi kèm với đó là dịch vụ quản gia cá nhân Concierge phục vụ 24/7, sẵn sàng hỗ trợ cư dân từ việc đặt vé máy bay hạng sang, chuẩn bị tiệc tại gia cho đến các nhu cầu cá nhân hóa khác.'
  },
  {
    id: 'n4',
    title: 'Phong thủy trong thiết kế biệt thự ven sông: Hướng khí và tụ lộc',
    date: '20 Th06, 2026',
    category: 'Phong Thủy',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    summary: 'Chuyên gia phong thủy chia sẻ về tầm quan trọng của yếu tố nước và cách tối ưu hóa vượng khí cho không gian sống ven sông.',
    content: 'Trong phong thủy học, nước đại diện cho tài lộc dồi dào. Tuy nhiên, việc biệt thự đón nhận dòng chảy như thế nào mới quyết định sự hưng thịnh của gia tộc. Các căn biệt thự ven sông tại Heritage được tính toán kỹ lưỡng theo thế đất "tụ thủy sinh tài", đón nhận luồng gió tự nhiên dịu mát từ sông lớn thổi vào qua các hành lang gió được thiết kế khoa học, giúp điều hòa nhiệt độ và mang lại sức khỏe dồi dào, tâm trí minh mẫn cho các thành viên trong gia đình.'
  },
  {
    id: 'n5',
    title: 'Xu hướng sở hữu bất động sản di sản của giới siêu giàu toàn cầu',
    date: '10 Th06, 2026',
    category: 'Xu Hướng',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    summary: 'Bất động sản mang giá trị lịch sử và nghệ thuật đang trở thành kênh tích lũy tài sản an toàn và bền vững của giới triệu phú.',
    content: 'Theo báo cáo thịnh vượng toàn cầu mới nhất, giới siêu giàu đang dịch chuyển dòng tiền sang các tài sản có giá trị bền vững và mang tính biểu tượng văn hóa. Những dinh thự mang phong cách cổ điển, trường tồn với thời gian không chỉ là nơi an cư lý tưởng mà còn được xem như một tác phẩm nghệ thuật có giá trị sưu tầm cao. Khác với các căn hộ chung cư thông thường, giá trị đất đai kết hợp cùng chất lượng xây dựng kiên cố hàng trăm năm của các biệt thự di sản luôn tăng trưởng ổn định bất chấp biến động kinh tế.'
  },
  {
    id: 'n6',
    title: 'Tiến độ thi công phân khu The Royal Villa đạt mốc cất nóc đúng hẹn',
    date: '01 Th06, 2026',
    category: 'Tiến Độ',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    summary: 'Lễ cất nóc đánh dấu cột mốc quan trọng trong quá trình hoàn thiện phần thô dự án Heritage Villa Tây Hồ.',
    content: 'Với tinh thần khẩn trương và sự giám sát chặt chẽ từ các đơn vị kiểm định quốc tế, phân khu The Royal Villa đã chính thức hoàn thiện cất nóc toàn bộ 25 căn biệt thự đơn lập đợt 1. Ban quản lý dự án cho biết, công tác xây tô mặt ngoài và hoàn thiện cảnh quan nội khu đang được đẩy mạnh để đảm bảo bàn giao chìa khóa cho khách hàng vào đúng quý 4 năm 2026, giữ vững cam kết về chất lượng xây dựng đỉnh cao và uy tín của chủ đầu tư.'
  }
];

interface GalleryImage {
  id: string;
  url: string;
  category: string; // Ngoại thất, Nội thất, Cảnh quan
  title: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1613490908676-e0ce6373e32e?w=800&q=80', category: 'Ngoại thất', title: 'Mặt trước Biệt thự Hoàng gia' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?w=800&q=80', category: 'Nội thất', title: 'Phòng khách thông tầng tráng lệ' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', category: 'Nội thất', title: 'Phòng ăn phong cách cổ điển' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=800&q=80', category: 'Cảnh quan', title: 'Lối đi dạo ven sông xanh mát' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', category: 'Ngoại thất', title: 'Bóng chiều tà trên lâu đài Heritage' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', category: 'Cảnh quan', title: 'Khuôn viên hồ bơi nước nóng' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', category: 'Ngoại thất', title: 'Góc nghiêng biệt thự tân cổ điển' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', category: 'Nội thất', title: 'Phòng ngủ Master ấm áp quý phái' }
];

const normalizeClassicPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'dinh-thu'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function ClassicTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const isMobile = viewport === 'mobile';
  const [page, setPageState] = useState(normalizeClassicPage(initialPage));

  useEffect(() => {
    setPageState(normalizeClassicPage(initialPage));
  }, [initialPage]);

  const setPage = (p: string, customSlug?: string) => {
    setPageState(p);
    const tSlug = template?.slug || 'bds-09';
    syncDemoUrl(customSlug || (p === 'home' ? '' : p), tSlug);
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts[2] : (parts[1] !== (template?.slug || 'bds-09') ? parts[1] : 'home');
      if (sub) {
        setPageState(normalizeClassicPage(sub));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [template?.slug]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Search & Filter State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStyle, setFilterStyle] = useState('Tất cả');
  const [filterPrice, setFilterPrice] = useState('Tất cả');
  const [filterLocation, setFilterLocation] = useState('Tất cả');

  // Home Quick Search Select variables
  const [homeType, setHomeType] = useState('Biệt Thự Đơn Lập');
  const [homeLocation, setHomeLocation] = useState('Ven Sông');

  // Modals / Lightbox State variables
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Forms submit states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Contact Form Inputs
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // About interactive section states
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [aboutActiveTab, setAboutActiveTab] = useState('philosophy');

  const navigate = (p: string) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleHomeSearch = () => {
    setFilterStyle(homeType);
    setFilterLocation(homeLocation);
    setFilterPrice('Tất cả');
    setSearchQuery('');
    navigate('projects');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactPhone.trim()) {
      setContactSubmitted(true);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  // Reactively filtered villas for the projects page
  const filteredVillas = VILLAS.filter((villa) => {
    const matchesSearch = 
      villa.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      villa.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = filterStyle === 'Tất cả' || villa.type === filterStyle;
    
    let matchesPrice = true;
    if (filterPrice === '< 50 Tỷ') {
      matchesPrice = villa.price < 50;
    } else if (filterPrice === '50 - 80 Tỷ') {
      matchesPrice = villa.price >= 50 && villa.price <= 80;
    } else if (filterPrice === '> 80 Tỷ') {
      matchesPrice = villa.price > 80;
    }
    
    const matchesLocation = filterLocation === 'Tất cả' || villa.location === filterLocation;
    
    return matchesSearch && matchesStyle && matchesPrice && matchesLocation;
  });

  // Reactively filtered news articles
  const filteredNews = NEWS_ARTICLES.filter((article) => {
    const query = searchNewsQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) || 
      article.summary.toLowerCase().includes(query) || 
      article.content.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  });

  // Reactively filtered gallery images
  const filteredGallery = GALLERY_IMAGES.filter((img) => {
    return selectedGalleryTab === 'Tất cả' || img.category === selectedGalleryTab;
  });

  const navLinks = [
    { label: 'Trang Chủ', page: 'home' },
    { label: 'Dự Án', page: 'projects' },
    { label: 'Di Sản', page: 'about' },
    { label: 'Thư Viện', page: 'gallery' },
    { label: 'Tạp Chí', page: 'news' },
    { label: 'Liên Hệ', page: 'contact' },
  ];

  const renderHeader = () => (
    <header className="sticky top-0 z-40 transition-all shadow-sm" style={{ backgroundColor: C.bg, color: C.primary, borderBottom: `1px solid ${C.border}` }}>
      <div className={`${MAX_W} px-4`}>
        <div className="flex justify-between items-center h-24">
          <div className="text-3xl font-bold cursor-pointer tracking-wider uppercase" style={fontHeading} onClick={() => navigate('home')}>
            Heritage
          </div>
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              {navLinks.map((l) => (
                <button
                  key={l.page}
                  onClick={() => navigate(l.page)}
                  className="tracking-widest uppercase text-xs font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: page === l.page ? C.accent : C.primary, ...fontBody }}
                >
                  {l.label}
                </button>
              ))}
              <button 
                onClick={() => navigate('contact')}
                style={{ backgroundColor: C.primary, color: C.bg, ...fontBody }} 
                className="px-6 py-3 uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
              >
                Nhận Báo Giá
              </button>
            </nav>
          )}
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: C.primary }}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </div>
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full p-4 shadow-lg border-t" style={{ backgroundColor: C.bg, borderColor: C.border }}>
          {navLinks.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              className="block w-full text-left py-4 uppercase tracking-wider text-sm border-b"
              style={{ color: page === l.page ? C.accent : C.primary, borderColor: C.border, ...fontBody }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate('contact')}
            className="block w-full py-4 text-center mt-4 uppercase tracking-wider text-xs font-semibold"
            style={{ backgroundColor: C.primary, color: C.bg, ...fontBody }}
          >
            Nhận Báo Giá
          </button>
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen">
      {/* HERO: Editorial magazine layout */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={IMG.hero} alt="Classic Heritage Villa" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(124, 45, 18, 0.7), rgba(0,0,0,0.3))` }} />
        </div>
        <div className={`relative z-10 ${MAX_W} px-4 flex flex-col md:flex-row items-center w-full`}>
          <div className="md:w-3/5 text-left text-white">
            <p className="tracking-[0.3em] uppercase text-sm mb-4" style={{ color: C.accent }}>BST Giới Hạn 2026</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={fontHeading}>
              Dấu Ấn<br />Thời Gian
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg mb-8 leading-relaxed font-light">
              Tuyệt tác kiến trúc Đông Dương kết hợp với tiện nghi hiện đại bậc nhất, dành riêng cho giới tinh hoa kiệt xuất.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('projects')} 
                style={{ backgroundColor: C.accent, color: C.white }} 
                className="px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
              >
                Khám Phá
              </button>
              <button 
                onClick={() => navigate('about')} 
                style={{ border: `1px solid ${C.white}`, color: C.white }} 
                className="px-8 py-4 uppercase tracking-widest text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Play size={16} /> Phim Tài Liệu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="relative z-20 -mt-12">
        <div className={`${MAX_W} px-4`}>
          <div className="p-8 flex flex-col md:flex-row gap-6 items-center shadow-xl bg-white border" style={{ borderColor: C.border }}>
            <div className="flex-1 w-full">
              <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: C.muted }}>Loại Hình</label>
              <select 
                value={homeType}
                onChange={(e) => setHomeType(e.target.value)}
                className="w-full p-3 bg-transparent border-b outline-none cursor-pointer" 
                style={{ borderColor: C.border, color: C.primary }}
              >
                <option value="Biệt Thự Đơn Lập">Biệt Thự Đơn Lập</option>
                <option value="Biệt Thự Song Lập">Biệt Thự Song Lập</option>
                <option value="Dinh Thự">Dinh Thự</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: C.muted }}>Khu Vực</label>
              <select 
                value={homeLocation}
                onChange={(e) => setHomeLocation(e.target.value)}
                className="w-full p-3 bg-transparent border-b outline-none cursor-pointer" 
                style={{ borderColor: C.border, color: C.primary }}
              >
                <option value="Ven Sông">Ven Sông</option>
                <option value="Trung Tâm">Trung Tâm</option>
                <option value="Sân Golf">Sân Golf</option>
              </select>
            </div>
            <button 
              onClick={handleHomeSearch}
              className="w-full md:w-auto px-10 py-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" 
              style={{ backgroundColor: C.primary, color: C.white }}
            >
              <Search size={18} /> Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO: Quote block */}
      <section className="py-24">
        <div className={`${MAX_W} px-4 text-center max-w-4xl mx-auto`}>
          <Quote size={48} className="mx-auto mb-8 opacity-20" style={{ color: C.primary }} />
          <h2 className="text-3xl md:text-5xl leading-tight mb-8" style={{ ...fontHeading, color: C.primary }}>
            &quot;Mỗi công trình là một bản giao hưởng giữa nghệ thuật kiến trúc kinh điển và hơi thở của tự nhiên.&quot;
          </h2>
          <p className="text-lg tracking-widest uppercase" style={{ color: C.accent }}>— Kiến trúc sư trưởng Jean-Louis</p>
        </div>
      </section>

      {/* FEATURED PROPERTIES: 3 classic properties */}
      <section className="py-24" style={{ backgroundColor: '#f9f1ea' }}>
        <div className={`${MAX_W} px-4`}>
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="tracking-widest uppercase text-sm mb-4" style={{ color: C.accent }}>Bộ Sưu Tập</p>
              <h2 className="text-4xl md:text-5xl" style={{ ...fontHeading, color: C.primary }}>Tuyệt Tác An Cư</h2>
            </div>
            <button onClick={() => navigate('projects')} className="hidden md:flex items-center gap-2 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity" style={{ color: C.primary }}>
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VILLAS.slice(0, 3).map((prop) => (
              <div key={prop.id} onClick={() => setSelectedVilla(prop)} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 px-4 py-1 text-xs uppercase tracking-widest shadow-sm" style={{ backgroundColor: C.primary, color: C.white }}>
                    {prop.tag}
                  </div>
                </div>
                <h3 className="text-2xl mb-2 group-hover:text-amber-800 transition-colors" style={{ ...fontHeading, color: C.primary }}>{prop.title}</h3>
                <p className="text-xs uppercase tracking-widest mb-3 opacity-60">{prop.type} • {prop.location}</p>
                <div className="flex justify-between items-center border-t pt-4 mt-4" style={{ borderColor: C.border }}>
                  <span className="font-semibold" style={{ color: C.accent }}>{prop.priceStr}</span>
                  <span className="text-sm uppercase tracking-wider" style={{ color: C.muted }}>{prop.area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE TIMELINE */}
      <section className="py-24">
        <div className={`${MAX_W} px-4`}>
          <h2 className="text-4xl text-center mb-16" style={{ ...fontHeading, color: C.primary }}>Hành Trình Di Sản</h2>
          <div className="relative border-l md:border-l-0 md:border-t mt-12 pt-8 md:pt-0" style={{ borderColor: C.border }}>
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
              {[
                { year: '1998', title: 'Khởi Nguyên', desc: 'Viên gạch đầu tiên được đặt xuống với khát vọng kiến tạo.' },
                { year: '2008', title: 'Dấu Ấn', desc: 'Ra mắt dự án biểu tượng The Royal Heritage.' },
                { year: '2018', title: 'Vươn Tầm', desc: 'Mở rộng quy mô, nhận giải thưởng Kiến trúc Châu Á.' },
                { year: '2026', title: 'Kế Thừa', desc: 'Tiếp tục hành trình kiến tạo những di sản vượt thời gian.' }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8 md:pl-0 md:pt-12 flex-1">
                  <div className="absolute left-[-5px] md:left-auto md:top-[-5px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full" style={{ backgroundColor: C.accent }} />
                  <h3 className="text-3xl mb-2" style={{ ...fontHeading, color: C.primary }}>{item.year}</h3>
                  <h4 className="text-xl mb-3 font-semibold" style={{ color: C.text }}>{item.title}</h4>
                  <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO: Editorial layout */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className={`${MAX_W} px-4 flex flex-col md:flex-row items-center gap-16`}>
          <div className="md:w-1/2 relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={IMG.about} alt="About Us" className="w-full h-auto object-cover aspect-[4/5]" />
            <div className="absolute -bottom-8 -right-8 p-8 max-w-xs shadow-xl hidden md:block" style={{ backgroundColor: C.primary, color: C.white }}>
              <p className="text-3xl mb-2" style={fontHeading}>25+</p>
              <p className="text-sm uppercase tracking-widest">Năm kiến tạo giá trị trường tồn</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="tracking-widest uppercase text-sm mb-4" style={{ color: C.accent }}>Triết Lý</p>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight" style={{ ...fontHeading, color: C.primary }}>
              Nghệ Thuật Của Sự Tinh Tế
            </h2>
            <p className="mb-6 leading-relaxed text-lg" style={{ color: C.muted }}>
              Chúng tôi không chỉ xây dựng những ngôi nhà, chúng tôi kiến tạo những di sản. Mỗi chi tiết nhỏ nhất đều được chăm chút bởi những nghệ nhân lành nghề nhất, mang trong mình tinh hoa văn hóa truyền thống kết hợp với tiêu chuẩn sống quốc tế.
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: C.muted }}>
              Sự tinh tế không nằm ở sự phô trương, mà ẩn giấu trong những giá trị trường tồn theo thời gian, trong cảm giác bình yên mỗi khi bạn trở về.
            </p>
            <button onClick={() => navigate('about')} className="uppercase tracking-widest text-sm font-semibold hover:opacity-70 transition-opacity border-b-2 pb-1 inline-flex items-center gap-2" style={{ borderColor: C.accent, color: C.primary }}>
              Tìm hiểu thêm <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* PHONG THUY / ARCHITECTURE */}
      <section className="py-24" style={{ backgroundColor: C.primary, color: C.white }}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Compass size={48} className="mx-auto mb-6" style={{ color: C.accent }} />
            <h2 className="text-4xl mb-6" style={fontHeading}>Kiến Trúc & Phong Thủy</h2>
            <p className="opacity-80">Sự hòa hợp hoàn hảo giữa thiên nhiên, con người và nghệ thuật kiến trúc phương Đông.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <Wind size={32} />, title: 'Hơi Thở Tự Nhiên', desc: 'Thiết kế thông gió chéo, tối ưu luồng khí tươi.' },
              { icon: <Sun size={32} />, title: 'Ánh Sáng Tinh Khôi', desc: 'Đón nắng mai ấm áp, tránh nắng gắt buổi chiều.' },
              { icon: <Droplets size={32} />, title: 'Thủy Khí Vượng', desc: 'Cảnh quan hồ điều hòa và suối nhân tạo bao quanh.' }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="inline-block p-4 rounded-full mb-6" style={{ backgroundColor: 'rgba(220,157,95,0.1)', color: C.accent }}>
                  {item.icon}
                </div>
                <h3 className="text-2xl mb-4" style={fontHeading}>{item.title}</h3>
                <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="py-20 border-b" style={{ borderColor: C.border, backgroundColor: C.white }}>
        <div className={`${MAX_W} px-4 flex flex-wrap justify-around items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500`}>
          <div className="flex items-center gap-3 text-black"><Award size={40} /> <span className="font-bold text-xl uppercase tracking-widest" style={fontHeading}>Asia Property</span></div>
          <div className="flex items-center gap-3 text-black"><Trophy size={40} /> <span className="font-bold text-xl uppercase tracking-widest" style={fontHeading}>Best Luxury</span></div>
          <div className="flex items-center gap-3 text-black"><Star size={40} /> <span className="font-bold text-xl uppercase tracking-widest" style={fontHeading}>Green Arch</span></div>
          <div className="flex items-center gap-3 text-black"><Shield size={40} /> <span className="font-bold text-xl uppercase tracking-widest" style={fontHeading}>Trusted Brand</span></div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24">
        <div className={`${MAX_W} px-4`}>
          <h2 className="text-4xl text-center mb-16" style={{ ...fontHeading, color: C.primary }}>Đặc Quyền Thượng Lưu</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Shield />, label: 'An Ninh 24/7' },
              { icon: <Trees />, label: 'Công Viên Hoàng Gia' },
              { icon: <Award />, label: 'Clubhouse Đặc Quyền' },
              { icon: <Users />, label: 'Cộng Đồng Tinh Hoa' },
              { icon: <Clock />, label: 'Dịch Vụ Concierge' },
              { icon: <Building2 />, label: 'Trung Tâm Hội Nghị' },
              { icon: <Droplets />, label: 'Hồ Bơi Vô Cực' },
              { icon: <Layers />, label: 'Khu Spa & Wellness' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 group hover:bg-white transition-all duration-300 cursor-pointer" style={{ border: `1px solid ${C.border}` }}>
                <div className="mb-4 transform group-hover:-translate-y-2 transition-transform duration-300" style={{ color: C.accent }}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 36 })}
                </div>
                <h3 className="uppercase tracking-widest text-xs font-semibold" style={{ color: C.primary }}>{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY: Classic grid */}
      <section className="py-24" style={{ backgroundColor: '#f9f1ea' }}>
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ ...fontHeading, color: C.primary }}>Thư Viện Hình Ảnh</h2>
            <p className="uppercase tracking-widest text-sm" style={{ color: C.accent }}>Góc Nhìn Nghệ Thuật</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.slice(0, 4).map((img, idx) => (
              <div 
                key={img.id} 
                onClick={() => setSelectedGalleryImg(img.url)}
                className={`relative overflow-hidden group cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-2 aspect-video' : 'aspect-square'}`}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white uppercase tracking-widest text-sm border border-white px-6 py-2">Xem Lớn</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
             <button onClick={() => navigate('gallery')} className="px-8 py-3 uppercase tracking-widest text-sm border hover:bg-white transition-colors" style={{ borderColor: C.primary, color: C.primary }}>
               Xem Tất Cả Ảnh
             </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className={`${MAX_W} px-4`}>
          <Quote size={48} className="mx-auto mb-12 opacity-20" style={{ color: C.primary }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { text: "Không gian sống tuyệt vời, mang đậm dấu ấn kiến trúc kinh điển mà vẫn đáp ứng mọi nhu cầu hiện đại.", author: "Mr. Hoàng Trọng", title: "Cư dân The Royal" },
              { text: "Dịch vụ quản lý đẳng cấp, an ninh tuyệt đối và cộng đồng văn minh là điều tôi trân trọng nhất tại đây.", author: "Mrs. Lan Anh", title: "Nhà đầu tư" },
              { text: "Một kiệt tác nghệ thuật thực sự. Mỗi góc nhỏ đều thể hiện tâm huyết và sự tinh tế của chủ đầu tư.", author: "Mr. David Chen", title: "Kiến trúc sư" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="italic text-lg mb-6 leading-relaxed" style={{ color: C.muted }}>&quot;{item.text}&quot;</p>
                <h4 className="font-bold text-lg mb-1" style={{ ...fontHeading, color: C.primary }}>{item.author}</h4>
                <p className="text-xs uppercase tracking-widest" style={{ color: C.accent }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-24">
        <div className={`${MAX_W} px-4`}>
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl" style={{ ...fontHeading, color: C.primary }}>Tạp Chí & Sự Kiện</h2>
            <button onClick={() => navigate('news')} className="hidden md:flex items-center gap-2 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity" style={{ color: C.primary }}>
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.slice(0, 3).map((post) => (
              <div key={post.id} onClick={() => setSelectedArticle(post)} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 aspect-video">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.accent }}>{post.date} • {post.category}</p>
                <h3 className="text-xl mb-4 leading-tight group-hover:underline" style={{ ...fontHeading, color: C.primary }}>{post.title}</h3>
                <p className="text-sm line-clamp-2" style={{ color: C.muted }}>{post.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className={`${MAX_W} px-4 max-w-3xl mx-auto`}>
          <h2 className="text-3xl text-center mb-12" style={{ ...fontHeading, color: C.primary }}>Câu Hỏi Thường Gặp</h2>
          <div className="space-y-4">
            {[
              { q: 'Pháp lý dự án như thế nào?', a: 'Tất cả các sản phẩm đều có sổ hồng lâu dài, pháp lý hoàn thiện 100% trước khi mở bán.' },
              { q: 'Chính sách thanh toán ra sao?', a: 'Chúng tôi cung cấp nhiều gói thanh toán linh hoạt, hỗ trợ lãi suất 0% trong 24 tháng đầu từ ngân hàng đối tác.' },
              { q: 'Phí quản lý hàng tháng bao gồm những gì?', a: 'Phí quản lý bao gồm an ninh 24/7, chăm sóc cảnh quan, bảo trì tiện ích chung, dọn dẹp vệ sinh khu vực công cộng.' },
              { q: 'Quy chuẩn bàn giao biệt thự?', a: 'Bàn giao hoàn thiện mặt ngoài, thô bên trong để khách hàng tự do sáng tạo không gian sống theo sở thích.' }
            ].map((faq, idx) => (
              <div key={idx} className="border-b" style={{ borderColor: C.border }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full py-6 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-semibold pr-4" style={{ color: C.primary, ...fontHeading }}>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp style={{ color: C.accent }} className="shrink-0" /> : <ChevronDown style={{ color: C.accent }} className="shrink-0" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24" style={{ backgroundColor: C.primary, color: C.white }}>
        <div className={`${MAX_W} px-4 text-center max-w-2xl mx-auto`}>
          <h2 className="text-4xl mb-6" style={fontHeading}>Trải Nghiệm Không Gian Mẫu</h2>
          <p className="mb-10 text-lg opacity-80 leading-relaxed font-light">
            Để lại thông tin, chuyên viên tư vấn cấp cao của chúng tôi sẽ liên hệ để sắp xếp chuyến thăm quan dành riêng cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('contact')} className="px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white/90 transition-colors" style={{ backgroundColor: C.white, color: C.primary }}>
              Đặt Lịch Ngay
            </button>
            <a href="tel:18008888" className="px-8 py-4 uppercase tracking-widest text-sm flex justify-center items-center gap-2 border hover:bg-white/10 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.3)', color: C.white }}>
              <Phone size={18} /> Hotline: 1800 8888
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16" style={{ backgroundColor: '#2a0e05', color: C.white }}>
        <div className={`${MAX_W} px-4 flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl mb-2" style={fontHeading}>Đăng ký nhận bản tin</h3>
            <p className="opacity-70 text-sm">Cập nhật tin tức thị trường và các đặc quyền dành riêng cho thành viên.</p>
          </div>
          <div className="md:w-1/2 w-full">
            {newsletterSubscribed ? (
              <div className="p-4 border text-center text-sm font-semibold tracking-wider rounded-sm" style={{ borderColor: C.accent, color: C.accent }}>
                Cảm ơn bạn đã đăng ký nhận bản tin di sản!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex w-full">
                <input 
                  type="email" 
                  required
                  placeholder="Email của bạn..." 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full p-4 bg-white/10 outline-none border border-white/20 text-white placeholder-white/50" 
                />
                <button type="submit" className="px-8 uppercase tracking-widest text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: C.accent, color: C.white }}>Gửi</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen pt-24 pb-24">
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6" style={{ ...fontHeading, color: C.primary }}>Bộ Sưu Tập Dự Án</h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: C.muted }}>Khám phá những di sản kiến trúc độc bản được kiến tạo bởi tâm huyết và sự tinh tế.</p>
        </div>

        {/* Style/Loại hình Quick Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['Tất cả', 'Biệt Thự Đơn Lập', 'Biệt Thự Song Lập', 'Dinh Thự'].map((styleName) => (
            <button 
              key={styleName} 
              onClick={() => setFilterStyle(styleName)}
              className="px-6 py-2 uppercase tracking-widest text-xs border transition-all duration-300 font-bold" 
              style={{ 
                borderColor: filterStyle === styleName ? C.primary : C.border, 
                color: filterStyle === styleName ? C.white : C.primary, 
                backgroundColor: filterStyle === styleName ? C.primary : 'transparent' 
              }}
            >
              {styleName === 'Tất cả' ? 'Tất cả sản phẩm' : styleName}
            </button>
          ))}
        </div>

        {/* Reactive Filter Panel */}
        <div className="bg-white p-6 shadow-sm border mb-12 flex flex-col md:flex-row gap-4 items-center justify-between" style={{ borderColor: C.border }}>
          {/* Search Input */}
          <div className="w-full md:w-1/3 relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm biệt thự..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border-b outline-none focus:border-stone-800 transition-colors text-sm"
              style={{ borderColor: C.border }}
            />
            <Search size={18} className="absolute left-3 top-3.5 opacity-40" />
          </div>

          {/* Select Dropdown Filters */}
          <div className="w-full md:w-2/3 flex flex-col sm:flex-row gap-4">
            {/* Price Select */}
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest mb-1 text-stone-500 font-bold">Mức Giá</label>
              <select 
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full p-2 bg-transparent border-b outline-none cursor-pointer text-sm font-semibold"
                style={{ borderColor: C.border }}
              >
                <option value="Tất cả">Tất cả mức giá</option>
                <option value="< 50 Tỷ">Dưới 50 Tỷ</option>
                <option value="50 - 80 Tỷ">50 - 80 Tỷ</option>
                <option value="> 80 Tỷ">Trên 80 Tỷ</option>
              </select>
            </div>

            {/* Location Select */}
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-widest mb-1 text-stone-500 font-bold">Vị Trí Khu Vực</label>
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full p-2 bg-transparent border-b outline-none cursor-pointer text-sm font-semibold"
                style={{ borderColor: C.border }}
              >
                <option value="Tất cả">Tất cả vị trí</option>
                <option value="Ven Sông">Ven Sông</option>
                <option value="Trung Tâm">Trung Tâm</option>
                <option value="Sân Golf">Sân Golf</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredVillas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredVillas.map((villa) => (
              <div 
                key={villa.id} 
                onClick={() => setSelectedVilla(villa)}
                className="group cursor-pointer bg-white border hover:shadow-lg transition-all duration-300" 
                style={{ borderColor: C.border }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={villa.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={villa.title} />
                  <div className="absolute top-4 right-4 px-4 py-1 text-xs uppercase tracking-widest bg-white text-black shadow-lg">
                    {villa.status}
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-stone-900 text-white font-semibold">{villa.tag}</span>
                    <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-amber-700 text-white font-semibold">{villa.location}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl mb-4 group-hover:text-amber-800 transition-colors" style={{ ...fontHeading, color: C.primary }}>{villa.title}</h3>
                  <p className="text-xs uppercase tracking-widest mb-4 opacity-75 font-semibold text-amber-900">{villa.type}</p>
                  <p className="mb-6 line-clamp-2 leading-relaxed text-sm" style={{ color: C.muted }}>{villa.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t text-center" style={{ borderColor: C.border }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: C.muted }}>Diện Tích</p>
                      <p className="font-semibold text-sm" style={{ color: C.primary }}>{villa.area}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: C.muted }}>Phòng Ngủ</p>
                      <p className="font-semibold text-sm" style={{ color: C.primary }}>{villa.beds} giường</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: C.muted }}>Mức Giá</p>
                      <p className="font-semibold text-sm" style={{ color: C.accent }}>{villa.priceStr}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border" style={{ borderColor: C.border }}>
            <Compass size={48} className="mx-auto mb-4 opacity-30" style={{ color: C.primary }} />
            <h3 className="text-2xl mb-2" style={fontHeading}>Không Tìm Thấy Kết Quả</h3>
            <p className="text-stone-500 mb-6 text-sm">Vui lòng thử xóa bộ lọc hoặc đổi từ khóa tìm kiếm khác.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterStyle('Tất cả');
                setFilterPrice('Tất cả');
                setFilterLocation('Tất cả');
              }}
              className="px-6 py-2 uppercase tracking-widest text-xs font-semibold bg-stone-900 text-white hover:opacity-90 transition-opacity"
            >
              Thiết Lập Lại Bộ Lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => {
    const milestones = [
      { 
        year: '1998', 
        title: 'Khởi Nguyên Di Sản', 
        desc: 'Được thành lập ban đầu với đội ngũ gồm 10 kiến trúc sư và chuyên gia trùng tu di tích kiến trúc cổ.',
        details: 'Heritage bắt đầu bằng khát vọng hồi sinh những công trình mang đậm dấu ấn Indochine và Pháp cổ. Trong những năm đầu, chúng tôi tập trung tìm kiếm các nguồn cung cấp vật liệu tự nhiên cao cấp và xây dựng hệ thống quy chuẩn chế tác thủ công riêng biệt.'
      },
      { 
        year: '2008', 
        title: 'Dấu Ấn Biểu Tượng', 
        desc: 'Khánh thành dự án Royal Heritage Villa gây tiếng vang lớn trên thị trường bất động sản siêu sang.',
        details: 'Việc hoàn thành bàn giao dự án đã chứng minh được tính khả thi của triết lý "kiến trúc trường tồn". Đây là khu biệt thự đầu tiên mạ vàng các chi tiết ngoại thất và ốp đá tự nhiên nguyên phiến cho mặt ngoài toàn bộ công trình.'
      },
      { 
        year: '2018', 
        title: 'Vinh Danh Quốc Tế', 
        desc: 'Được trao tặng danh hiệu "Dự án Biệt thự Cổ điển Xuất sắc nhất Châu Á" tại Singapore.',
        details: 'Cột mốc khẳng định thương hiệu Heritage không chỉ nằm ở quy mô xây dựng mà còn ở đẳng cấp nghệ thuật và sự tôn trọng nghiêm ngặt về phong thủy học phương Đông kết hợp cùng tiêu chuẩn khoa học vật liệu phương Tây.'
      },
      { 
        year: '2026', 
        title: 'Kế Thừa & Khai Phóng', 
        desc: 'Tiếp tục hành trình kiến tạo những dinh thự độc bản, mở ra kỷ nguyên sống wellness di sản.',
        details: 'Năm 2026 đánh dấu bước tiến lớn khi áp dụng hệ sinh thái Smart Home thông minh tích hợp công nghệ xanh vào 100% các dinh thự, đồng thời nâng tầm dịch vụ quản gia Concierge lên quy chuẩn dành riêng cho giới thượng lưu.'
      }
    ];

    const leaders = [
      {
        name: 'Ông Nguyễn Văn Nam',
        role: 'Chủ Tịch Hội Đồng Quản Trị',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        bio: 'Với hơn 25 năm kinh nghiệm dẫn dắt các tập đoàn xây dựng và phát triển bất động sản cao cấp, ông Nam là người đặt nền móng và giữ ngọn lửa cho triết lý "Kiến tạo di sản vượt thời gian".'
      },
      {
        name: 'Bà Lê Thu Trang',
        role: 'Giám Đốc Điều Hành (CEO)',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        bio: 'Tốt nghiệp Thạc sĩ Quản trị Kinh doanh tại Trường Kinh tế Luân Đôn (LSE). Bà Trang chịu trách nhiệm xây dựng chiến lược phát triển bền vững và xúc tiến các mối quan hệ đối tác quốc tế.'
      },
      {
        name: 'KTS. Jean-Louis',
        role: 'Giám Đốc Thiết Kế Kiến Trúc',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        bio: 'Với 15 năm làm việc tại các văn phòng thiết kế danh tiếng tại Paris, Jean-Louis là linh hồn trong việc thổi hồn ngôn ngữ nghệ thuật Pháp cổ và Đông Dương cổ điển vào cấu trúc đương đại.'
      }
    ];

    return (
      <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen pt-24 pb-24">
        <div className={`${MAX_W} px-4`}>
          
          {/* Title & Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl mb-8" style={{ ...fontHeading, color: C.primary }}>Câu Chuyện Di Sản</h1>
            <p className="text-xl leading-relaxed" style={{ color: C.muted }}>
              Hơn hai thập kỷ kiên định với sứ mệnh kiến tạo những giá trị trường tồn, chúng tôi tự hào là đơn vị tiên phong trong việc phát triển các bất động sản hạng sang mang đậm dấu ấn văn hóa và nghệ thuật kiến trúc kinh điển.
            </p>
          </div>

          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={IMG.hero} className="w-full aspect-[21/9] object-cover mb-24 rounded-sm shadow-md" alt="Heritage Headquarters" />

          {/* Interactive Timeline Milestones */}
          <section className="mb-24">
            <h2 className="text-4xl text-center mb-12" style={{ ...fontHeading, color: C.primary }}>Dấu Mốc Quan Trọng</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Year list selector */}
              <div className="w-full lg:w-1/3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                {milestones.map((m, idx) => (
                  <button
                    key={m.year}
                    onClick={() => setActiveMilestone(idx)}
                    className="flex-1 lg:flex-initial text-left px-6 py-4 border-l-4 transition-all duration-300 bg-white shadow-sm flex items-center justify-between gap-4"
                    style={{ 
                      borderColor: activeMilestone === idx ? C.accent : C.border,
                      backgroundColor: activeMilestone === idx ? '#FCFBF9' : '#FFFFFF'
                    }}
                  >
                    <div>
                      <span className="block text-2xl font-bold" style={{ color: activeMilestone === idx ? C.primary : C.muted }}>{m.year}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider block mt-1">{m.title}</span>
                    </div>
                    <ArrowRight size={16} className={`transition-transform duration-300 ${activeMilestone === idx ? 'translate-x-1 opacity-100' : 'opacity-20'}`} />
                  </button>
                ))}
              </div>

              {/* Milestone Details Box */}
              <div className="w-full lg:w-2/3 bg-white p-8 border shadow-sm min-h-[250px]" style={{ borderColor: C.border }}>
                <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 bg-stone-900 text-white">{milestones[activeMilestone].year} Milestone</span>
                <h3 className="text-3xl mt-4 mb-3" style={{ ...fontHeading, color: C.primary }}>{milestones[activeMilestone].title}</h3>
                <p className="font-semibold text-stone-700 text-sm mb-4 leading-relaxed">{milestones[activeMilestone].desc}</p>
                <p className="text-stone-500 leading-relaxed text-sm pt-4 border-t" style={{ borderColor: C.border }}>{milestones[activeMilestone].details}</p>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="mb-24">
            <h2 className="text-4xl text-center mb-16" style={{ ...fontHeading, color: C.primary }}>Giá Trị Cốt Lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: 'Chất lượng nguyên bản', desc: 'Cam kết 100% sử dụng vật liệu tự nhiên tinh tuyển cao cấp nhất, nguồn gốc xuất xứ rõ ràng.' },
                { title: 'Nghệ thuật tinh tế', desc: 'Mọi góc nhỏ trong dinh thự đều được tạo tác tỉ mỉ bởi bàn tay nghệ nhân điêu khắc lành nghề.' },
                { title: 'Bền vững trường tồn', desc: 'Quy chuẩn kết cấu xây dựng vượt thời gian, trường tồn cùng năm tháng như một tác phẩm lịch sử.' },
                { title: 'Tôn trọng tự nhiên', desc: 'Quy hoạch cảnh quan bảo vệ môi trường, tối ưu hóa năng lượng tự nhiên theo phong thủy khí hậu học.' }
              ].map((v, i) => (
                <div key={i} className="text-center p-8 bg-white border hover:shadow-md transition-shadow duration-300" style={{ borderColor: C.border }}>
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#FDF6F0', color: C.accent }}>
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl mb-4 font-bold" style={{ ...fontHeading, color: C.primary }}>{v.title}</h3>
                  <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Working Tabs Section */}
          <section className="mb-24">
            <h2 className="text-4xl text-center mb-12" style={{ ...fontHeading, color: C.primary }}>Quy Trình Hoạt Động</h2>
            <div className="flex border-b justify-center gap-8 mb-8" style={{ borderColor: C.border }}>
              {[
                { id: 'philosophy', label: 'Triết lý Thiết kế' },
                { id: 'materials', label: 'Tiêu chuẩn Vật liệu' },
                { id: 'services', label: 'Dịch vụ Vận hành' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAboutActiveTab(tab.id)}
                  className="pb-4 uppercase tracking-widest text-xs font-bold border-b-2 transition-all duration-300"
                  style={{ 
                    borderColor: aboutActiveTab === tab.id ? C.primary : 'transparent',
                    color: aboutActiveTab === tab.id ? C.primary : C.muted
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 border shadow-sm" style={{ borderColor: C.border }}>
              {aboutActiveTab === 'philosophy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl mb-4" style={{ ...fontHeading, color: C.primary }}>Sự Hòa Quyện Giữa Nghệ Thuật & Thời Gian</h4>
                    <p className="text-sm leading-relaxed text-stone-600 mb-4">
                      Thiết kế của Heritage là cuộc đối thoại văn hóa giữa nét hoài cổ quý phái của châu Âu thế kỷ 19 và sự quyến rũ Á Đông mộc mạc. Chúng tôi không sao chép nguyên bản, mà tinh lọc các chi tiết đắt giá để thổi hồn vào công năng sống hiện đại.
                    </p>
                    <p className="text-sm leading-relaxed text-stone-600">
                      Từng ô cửa sổ, hàng hiên, mái vòm đón gió đều được nghiên cứu tỉ mỉ theo khí hậu nhiệt đới gió mùa của Việt Nam, mang lại sự thông thoáng tối đa và năng lượng phong thủy vượng khí.
                    </p>
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80" className="w-full aspect-[4/3] object-cover rounded-sm" alt="Design Philosophy" />
                </div>
              )}
              {aboutActiveTab === 'materials' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl mb-4" style={{ ...fontHeading, color: C.primary }}>Quy Chuẩn Vật Liệu Thượng Hạng</h4>
                    <p className="text-sm leading-relaxed text-stone-600 mb-4">
                      Chúng tôi cam kết sử dụng đá tự nhiên mài thủ công như đá Marble Carrara nhập khẩu trực tiếp từ Ý, gỗ gõ đỏ nhóm IA độ bền hàng trăm năm và hệ sơn khoáng hữu cơ thân thiện tuyệt đối với sức khỏe cư dân.
                    </p>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Hệ nhôm kính Low-E 3 lớp cách nhiệt cách âm tuyệt đối.</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Thiết bị vệ sinh mạ vàng 24K chế tác giới hạn.</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-emerald-600" /> Hệ thống xử lý nước trung tâm đạt chuẩn uống tại vòi của Mỹ.</li>
                    </ul>
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" className="w-full aspect-[4/3] object-cover rounded-sm" alt="Material standards" />
                </div>
              )}
              {aboutActiveTab === 'services' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl mb-4" style={{ ...fontHeading, color: C.primary }}>Bảo Chứng Chất Lượng Cuộc Sống Thượng Lưu</h4>
                    <p className="text-sm leading-relaxed text-stone-600 mb-4">
                      Đồng hành cùng cư dân sau khi bàn giao là dịch vụ quản lý vận hành chuẩn mực resort 5 sao được phối hợp cùng Savills Việt Nam.
                    </p>
                    <p className="text-sm leading-relaxed text-stone-600 mb-4">
                      Hệ thống an ninh thông minh đa lớp tích hợp AI giám sát 24/7 nhận diện khuôn mặt người lạ, cùng dịch vụ quản gia Concierge luôn túc trực hỗ trợ cư dân sắp đặt mọi dịch vụ cá nhân hóa từ dọn dẹp, mua sắm đến tổ chức sự kiện tại gia.
                    </p>
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600585154526-990dced4e56d?w=600&q=80" className="w-full aspect-[4/3] object-cover rounded-sm" alt="Service Standards" />
                </div>
              )}
            </div>
          </section>

          {/* Leadership Section */}
          <section className="mb-12">
            <h2 className="text-4xl text-center mb-16" style={{ ...fontHeading, color: C.primary }}>Ban Điều Hành Sáng Lập</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white border rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: C.border }}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-1" style={{ ...fontHeading, color: C.primary }}>{leader.name}</h4>
                    <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-4">{leader.role}</p>
                    <p className="text-sm text-stone-500 leading-relaxed border-t pt-4" style={{ borderColor: C.border }}>{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    );
  };

  const renderGallery = () => (
    <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen pt-24 pb-24">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ ...fontHeading, color: C.primary }}>Thư Viện Nghệ Thuật</h1>
          <p className="uppercase tracking-widest text-sm" style={{ color: C.accent }}>Từng góc nhìn là một tuyệt tác</p>
        </div>

        {/* Gallery Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Tất cả', 'Ngoại thất', 'Nội thất', 'Cảnh quan'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedGalleryTab(cat)}
              className="px-6 py-2 uppercase tracking-widest text-xs border transition-all duration-300 font-bold"
              style={{
                borderColor: selectedGalleryTab === cat ? C.primary : C.border,
                color: selectedGalleryTab === cat ? C.white : C.primary,
                backgroundColor: selectedGalleryTab === cat ? C.primary : 'transparent'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {filteredGallery.map((img, idx) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedGalleryImg(img.url)}
              className={`relative overflow-hidden group cursor-pointer ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={img.title} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-white text-xs uppercase tracking-widest mb-1 opacity-70">{img.category}</span>
                <h4 className="text-white text-lg font-semibold" style={fontHeading}>{img.title}</h4>
                <span className="text-white uppercase tracking-widest text-[10px] border border-white/40 px-3 py-1 self-start mt-3 hover:bg-white hover:text-black transition-colors">Xem Lớn</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNews = () => (
    <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen pt-24 pb-24">
      <div className={`${MAX_W} px-4`}>
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-6" style={{ ...fontHeading, color: C.primary }}>Tạp Chí Phong Cách Sống</h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: C.muted }}>Những bài viết chuyên sâu về nghệ thuật sống thượng lưu và xu hướng kiến trúc kinh điển.</p>
        </div>

        {/* Search News Input */}
        <div className="max-w-md mx-auto mb-16 relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết..." 
            value={searchNewsQuery}
            onChange={(e) => setSearchNewsQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 outline-none focus:border-stone-500 shadow-sm transition-colors text-sm"
          />
          <Search size={18} className="absolute left-3 top-3.5 opacity-40 text-stone-500" />
          {searchNewsQuery && (
            <button 
              onClick={() => setSearchNewsQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              Xóa
            </button>
          )}
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((post) => (
              <div 
                key={post.id} 
                onClick={() => setSelectedArticle(post)}
                className="group cursor-pointer bg-white border border-transparent hover:border-orange-900/10 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-xs uppercase tracking-widest mb-3 font-semibold text-amber-700">{post.category} • {post.date}</p>
                  <h3 className="text-xl mb-3 group-hover:underline leading-tight flex-grow" style={{ ...fontHeading, color: C.primary }}>{post.title}</h3>
                  <p className="text-sm line-clamp-3 leading-relaxed mb-4 text-stone-500">{post.summary}</p>
                  <span className="text-xs uppercase tracking-widest font-semibold border-b pb-1 self-start hover:text-amber-800 transition-colors" style={{ color: C.primary, borderColor: C.accent }}>Đọc bài viết</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border" style={{ borderColor: C.border }}>
            <Compass size={48} className="mx-auto mb-4 opacity-30" style={{ color: C.primary }} />
            <h3 className="text-2xl mb-2" style={fontHeading}>Không Tìm Thấy Tin Tức Nào</h3>
            <p className="text-stone-500 mb-6 text-sm">Vui lòng thử đổi từ khóa tìm kiếm khác.</p>
            <button 
              onClick={() => setSearchNewsQuery('')}
              className="px-6 py-2 uppercase tracking-widest text-xs font-semibold bg-stone-900 text-white hover:opacity-90 transition-opacity"
            >
              Hiển Thị Tất Cả Bài Viết
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderContact = () => (
    <div style={{ backgroundColor: C.bg, color: C.text, ...fontBody }} className="min-h-screen pt-24 pb-24">
      <div className={`${MAX_W} px-4`}>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h1 className="text-5xl mb-8" style={{ ...fontHeading, color: C.primary }}>Liên Hệ Ngay</h1>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: C.muted }}>Đội ngũ chuyên viên tư vấn cấp cao của chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của Quý khách về các sản phẩm bất động sản hạng sang.</p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <MapPin className="mt-1 shrink-0" style={{ color: C.accent }} />
                <div>
                  <h4 className="font-semibold text-lg mb-1" style={{ color: C.primary }}>Trụ Sở Chính</h4>
                  <p className="leading-relaxed text-stone-600 text-sm">Tòa nhà Heritage, 123 Đường Nguyễn Huệ,<br />Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="mt-1 shrink-0" style={{ color: C.accent }} />
                <div>
                  <h4 className="font-semibold text-lg mb-1" style={{ color: C.primary }}>Hotline Hỗ Trợ 24/7</h4>
                  <p className="leading-relaxed text-stone-600 text-sm">1800 8888 (Miễn phí cước gọi)</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="mt-1 shrink-0" style={{ color: C.accent }} />
                <div>
                  <h4 className="font-semibold text-lg mb-1" style={{ color: C.primary }}>Email Hỗ Trợ</h4>
                  <p className="leading-relaxed text-stone-600 text-sm">contact@heritage-realestate.vn</p>
                </div>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-stone-200 shadow-md flex flex-col h-60 bg-white">
              <div className="px-4 py-2 bg-stone-900 text-white flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 truncate"><MapPin size={14} className="text-amber-400" /> Tòa nhà Heritage — 123 Nguyễn Huệ, Quận 1, TP.HCM</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Nguy%E1%BB%85n+Hu%E1%BB%87,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+TP.HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-[#9F1239] hover:bg-[#881337] text-white text-[10px] font-bold shrink-0"
                >
                  Mở Google Maps
                </a>
              </div>
              <div className="flex-1 w-full h-full">
                <iframe
                  title="Bản đồ Heritage Nguyễn Huệ"
                  src="https://maps.google.com/maps?q=123+Nguy%E1%BB%85n+Hu%E1%BB%87,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white p-8 md:p-12 border shadow-lg" style={{ borderColor: C.border }}>
            {contactSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-700">
                  <Award size={36} />
                </div>
                <h3 className="text-3xl mb-4" style={{ ...fontHeading, color: C.primary }}>Gửi Yêu Cầu Thành Công</h3>
                <p className="text-stone-600 mb-8 leading-relaxed text-sm">
                  Cảm ơn Quý khách <strong>{contactName}</strong> đã quan tâm đến Heritage.<br />
                  Yêu cầu tư vấn của Quý khách đã được gửi lên hệ thống. Chuyên viên tư vấn cấp cao của chúng tôi sẽ liên hệ lại trực tiếp qua số điện thoại <strong>{contactPhone}</strong> trong vòng 15 phút.
                </p>
                <button 
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactName('');
                    setContactPhone('');
                    setContactEmail('');
                    setContactMessage('');
                  }}
                  className="px-8 py-3 uppercase tracking-widest text-xs font-semibold bg-stone-900 text-white hover:opacity-90 transition-opacity"
                >
                  Gửi Thông Tin Khác
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl mb-8" style={{ ...fontHeading, color: C.primary }}>Gửi Yêu Cầu Tư Vấn</h3>
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: C.muted }}>Họ & Tên *</label>
                    <input 
                      type="text" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-4 border bg-transparent outline-none focus:border-black transition-colors" 
                      style={{ borderColor: C.border }} 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: C.muted }}>Số Điện Thoại *</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full p-4 border bg-transparent outline-none focus:border-black transition-colors" 
                        style={{ borderColor: C.border }} 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: C.muted }}>Email</label>
                      <input 
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-4 border bg-transparent outline-none focus:border-black transition-colors" 
                        style={{ borderColor: C.border }} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: C.muted }}>Nội Dung Quan Tâm</label>
                    <textarea 
                      rows={4} 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full p-4 border bg-transparent outline-none focus:border-black transition-colors resize-none" 
                      style={{ borderColor: C.border }} 
                      placeholder="Tôi muốn nhận thông tin báo giá dự án..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 uppercase tracking-widest text-sm font-semibold hover:opacity-90 transition-opacity mt-4" 
                    style={{ backgroundColor: C.primary, color: C.white }}
                  >
                    Gửi Thông Tin
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col w-full relative" style={{ backgroundColor: C.bg }}>
      {renderHeader()}
      <main className="flex-grow">
        {['home'].includes(page) && renderHome()}
        {['projects', 'du-an', 'san-pham', 'dinh-thu'].includes(page) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(page) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(page) && renderGallery()}
        {['news', 'tin-tuc', 'bai-viet'].includes(page) && renderNews()}
        {['contact', 'lien-he', 'tu-van'].includes(page) && renderContact()}
        {!['home', 'projects', 'du-an', 'san-pham', 'dinh-thu', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(page) && renderHome()}
      </main>
      
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1f0902', color: 'rgba(255,255,255,0.7)', ...fontBody }} className="pt-24 pb-12">
        <div className={`${MAX_W} px-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white uppercase tracking-wider" style={fontHeading}>Heritage</h3>
              <p className="mb-6 leading-relaxed text-sm">
                Đơn vị tiên phong kiến tạo những bất động sản hạng sang mang đậm dấu ấn di sản và nghệ thuật kiến trúc vượt thời gian.
              </p>
              <div className="flex gap-4">
                <button onClick={() => alert('Mở Facebook')} className="hover:text-white transition-colors cursor-pointer" aria-label="Facebook"><Facebook size={20} /></button>
                <button onClick={() => alert('Mở Instagram')} className="hover:text-white transition-colors cursor-pointer" aria-label="Instagram"><Instagram size={20} /></button>
                <button onClick={() => alert('Mở Youtube')} className="hover:text-white transition-colors cursor-pointer" aria-label="Youtube"><Youtube size={20} /></button>
              </div>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-6 uppercase tracking-widest text-sm">Liên Kết</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">Về Chúng Tôi</button></li>
                <li><button onClick={() => navigate('projects')} className="hover:text-white transition-colors">Bộ Sưu Tập</button></li>
                <li><button onClick={() => navigate('news')} className="hover:text-white transition-colors">Tạp Chí</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Liên Hệ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-6 uppercase tracking-widest text-sm">Dự Án Nổi Bật</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => { setFilterStyle('Biệt Thự Đơn Lập'); navigate('projects'); }} className="hover:text-white transition-colors text-left block">The Royal Heritage</button></li>
                <li><button onClick={() => { setFilterStyle('Dinh Thự'); navigate('projects'); }} className="hover:text-white transition-colors text-left block">Classic Manor Tây Hồ</button></li>
                <li><button onClick={() => { setFilterStyle('Biệt Thự Song Lập'); navigate('projects'); }} className="hover:text-white transition-colors text-left block">Indochine Residence</button></li>
                <li><button onClick={() => { setFilterLocation('Ven Sông'); navigate('projects'); }} className="hover:text-white transition-colors text-left block">Heritage Valley</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-6 uppercase tracking-widest text-sm">Trụ Sở</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><MapPin size={18} className="shrink-0" /> <span>Tòa nhà Heritage, 123 Nguyễn Huệ, Quận 1, TP.HCM</span></li>
                <li className="flex gap-3"><Phone size={18} className="shrink-0" /> <span>1800 8888</span></li>
                <li className="flex gap-3"><Mail size={18} className="shrink-0" /> <span>contact@heritage-realestate.vn</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Heritage Real Estate. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <button onClick={() => navigate('about')} className="hover:text-white transition-colors cursor-pointer">Điều khoản dịch vụ</button>
              <button onClick={() => navigate('about')} className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</button>
            </div>
          </div>
        </div>
      </footer>

      {/* SELECTED VILLA DETAILS MODAL */}
      {selectedVilla && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-50 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative rounded-sm shadow-2xl flex flex-col border border-stone-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVilla(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-stone-800 rounded-full transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Modal Hero Banner */}
            <div className="relative h-[40vh] min-h-[300px] w-full">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedVilla.img} alt={selectedVilla.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-3 py-1 bg-amber-700 text-xs font-bold uppercase tracking-widest">{selectedVilla.tag}</span>
                <h2 className="text-4xl mt-3 font-semibold" style={fontHeading}>{selectedVilla.title}</h2>
                <p className="text-sm opacity-90 mt-1">{selectedVilla.type} • {selectedVilla.location}</p>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Description & Gallery */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-2">Mô Tả Sản Phẩm</h4>
                  <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">{selectedVilla.description}</p>
                </div>

                {/* Sub Gallery */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3">Hình Ảnh Chi Tiết</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedVilla.images.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedGalleryImg(imgUrl)}
                        className="aspect-[4/3] overflow-hidden cursor-pointer border border-stone-200 hover:opacity-85 transition-opacity"
                      >
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={imgUrl} className="w-full h-full object-cover" alt={`${selectedVilla.title} ${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Specs & Actions */}
              <div className="space-y-6 bg-white p-6 border border-stone-200/80 rounded-sm">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-4 pb-2 border-b">Thông Số Kỹ Thuật</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Mức giá:</span>
                      <span className="font-bold text-amber-900">{selectedVilla.priceStr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Diện tích:</span>
                      <span className="font-bold text-stone-800">{selectedVilla.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Thiết kế:</span>
                      <span className="font-bold text-stone-800">{selectedVilla.beds} PN / {selectedVilla.baths} WC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Hướng nhà:</span>
                      <span className="font-bold text-stone-800">{selectedVilla.direction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Bàn giao:</span>
                      <span className="font-bold text-stone-800">Năm {selectedVilla.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Trạng thái:</span>
                      <span className="font-bold text-emerald-800">{selectedVilla.status}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities checklist */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3 pb-2 border-b">Tiện Ích Đặc Quyền</h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {selectedVilla.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-amber-700" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <button 
                    onClick={() => {
                      setSelectedVilla(null);
                      setContactMessage(`Tôi muốn đăng ký tư vấn và nhận báo giá chi tiết sản phẩm: ${selectedVilla.title}`);
                      navigate('contact');
                    }}
                    className="w-full py-3 bg-stone-900 text-white uppercase tracking-widest text-[10px] font-semibold text-center hover:bg-stone-850 transition-colors"
                  >
                    Đăng Ký Tham Quan
                  </button>
                  <a 
                    href="tel:18008888"
                    className="w-full py-3 border border-stone-300 text-stone-800 uppercase tracking-widest text-[10px] font-semibold text-center hover:bg-stone-50 transition-colors flex justify-center items-center gap-2"
                  >
                    <Phone size={14} /> Gọi Hotline Tư Vấn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED NEWS ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-50 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative p-8 md:p-12 border shadow-2xl rounded-sm">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 bg-stone-200/80 hover:bg-stone-200 text-stone-800 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">{selectedArticle.category} • {selectedArticle.date}</span>
              <h2 className="text-3xl md:text-4xl mt-3 mb-6" style={{ ...fontHeading, color: C.primary }}>{selectedArticle.title}</h2>
              <div className="aspect-video w-full overflow-hidden mb-8 border shadow-sm">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-stone-700 font-bold mb-6 text-sm md:text-base leading-relaxed border-l-4 pl-4 border-amber-700/60" style={fontBody}>
                {selectedArticle.summary}
              </p>
              <div className="text-stone-600 text-sm md:text-base leading-relaxed space-y-4">
                {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-6 border-t flex justify-end" style={{ borderColor: C.border }}>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 uppercase tracking-widest text-xs font-semibold bg-stone-900 text-white hover:opacity-90"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED GALLERY IMAGE LIGHTBOX */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} className="max-w-full max-h-[90vh] object-contain shadow-2xl" alt="Lightbox" />
        </div>
      )}

    </div>
  );
}

