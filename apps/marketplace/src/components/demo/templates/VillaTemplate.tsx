import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import Link from 'next/link';
import { 
  Menu, X, Search, MapPin, Bed, Bath, Square, Home, 
  ChevronRight, Phone, Mail, ArrowRight, CheckCircle, 
  Calendar, User, Star, Heart, Camera, Trees, Coffee, 
  Dumbbell, Droplets, ShieldCheck, ChevronDown, Award,
  ChevronLeft, Clock, Filter, RefreshCw, Compass
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, YoutubeIcon, LinkedinIcon, ZaloIcon } from '../../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

interface VillaItem {
  id: number;
  name: string;
  price: string;
  priceValue: number; // in billions VND
  area: string;
  areaValue: number; // in m2
  img: string;
  beds: number;
  baths: number;
  type: 'Đơn lập' | 'Song lập';
  direction: string;
  location: string;
  description: string;
  specifications: string[];
}

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  img: string;
  excerpt: string;
  content: string;
}

interface GalleryItem {
  img: string;
  category: 'Kiến trúc' | 'Nội thất' | 'Cảnh quan';
  title: string;
}

// Elevated realistic mock villas list (7 items)
const MOCK_VILLAS: VillaItem[] = [
  {
    id: 1,
    name: "The Crown Villa",
    price: "45 Tỷ",
    priceValue: 45,
    area: "350m²",
    areaValue: 350,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    beds: 4,
    baths: 5,
    type: "Đơn lập",
    direction: "Đông Nam",
    location: "Khu Ven Sông",
    description: "Biệt thự cao cấp view sông trực diện, không gian yên bình và trong lành bậc nhất dự án. Thiết kế theo phong cách Tân cổ điển sang trọng.",
    specifications: [
      "Diện tích đất: 350m2",
      "Diện tích sàn xây dựng: 520m2",
      "Kết cấu: 1 trệt 2 lầu + mái",
      "Bàn giao: Hoàn thiện mặt ngoài, thô bên trong",
      "Pháp lý: Sổ hồng sở hữu lâu dài"
    ]
  },
  {
    id: 2,
    name: "Royal Riverside",
    price: "68 Tỷ",
    priceValue: 68,
    area: "500m²",
    areaValue: 500,
    img: "https://images.unsplash.com/photo-1613490908592-5b0c95098ffb?w=800&q=80",
    beds: 5,
    baths: 6,
    type: "Đơn lập",
    direction: "Nam",
    location: "Khu Ven Sông",
    description: "Biệt thự đơn lập siêu sang, sở hữu bến du thuyền riêng đẳng cấp. Tầm nhìn panorama đắt giá đón gió sông mát rượi quanh năm.",
    specifications: [
      "Diện tích đất: 500m2",
      "Diện tích sàn xây dựng: 750m2",
      "Hồ bơi tràn bờ nước tràn 40m2",
      "Bến du thuyền cá nhân tại gia",
      "Hầm rượu và phòng xông hơi riêng"
    ]
  },
  {
    id: 3,
    name: "Emerald Estate",
    price: "32 Tỷ",
    priceValue: 32,
    area: "280m²",
    areaValue: 280,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    beds: 4,
    baths: 4,
    type: "Song lập",
    direction: "Tây Nam",
    location: "Khu Đồi Xanh",
    description: "Thiết kế đối xứng hoàn hảo, tối ưu không gian xanh mát quanh nhà. Phù hợp cho những gia đình ưa thích sự trẻ trung, hiện đại.",
    specifications: [
      "Diện tích đất: 280m2",
      "Diện tích sàn xây dựng: 410m2",
      "Lối dạo bộ quanh nhà phủ đầy hoa",
      "Hệ kính Low-E cản nhiệt tốt",
      "Chỗ đậu 2 xe ô tô rộng rãi"
    ]
  },
  {
    id: 4,
    name: "Golden Horizon",
    price: "38 Tỷ",
    priceValue: 38,
    area: "300m²",
    areaValue: 300,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    beds: 4,
    baths: 4,
    type: "Song lập",
    direction: "Đông Bắc",
    location: "Khu Premium",
    description: "Đón bình minh rạng rỡ từ ban công rộng lớn. Kiến trúc tân cổ điển kết hợp hài hòa giữa chi tiết phào chỉ và các mảng kính lớn hiện đại.",
    specifications: [
      "Diện tích đất: 300m2",
      "Diện tích sàn xây dựng: 450m2",
      "Sân thượng view toàn cảnh dự án",
      "Hệ thống Smart Home chuẩn Âu",
      "Sân vườn nướng BBQ ngoài trời"
    ]
  },
  {
    id: 5,
    name: "Pearl Mansion",
    price: "85 Tỷ",
    priceValue: 85,
    area: "650m²",
    areaValue: 650,
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    beds: 6,
    baths: 7,
    type: "Đơn lập",
    direction: "Tây Bắc",
    location: "Khu Ven Sông",
    description: "Đỉnh cao dinh thự đơn lập ven sông với thiết kế nguy nga tráng lệ bậc nhất. Khẳng định vị thế độc tôn và đặc quyền thượng lưu của gia chủ.",
    specifications: [
      "Diện tích đất: 650m2",
      "Diện tích sàn xây dựng: 920m2",
      "Thang máy kính nhập khẩu Thụy Sĩ",
      "Hồ bơi vô cực jacuzzi ngoài trời",
      "Hệ thống lọc nước trung tâm cao cấp"
    ]
  },
  {
    id: 6,
    name: "Sapphire Garden",
    price: "28 Tỷ",
    priceValue: 28,
    area: "250m²",
    areaValue: 250,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    beds: 3,
    baths: 4,
    type: "Song lập",
    direction: "Bắc",
    location: "Khu Đồi Xanh",
    description: "Sự kết hợp hoàn hảo giữa cuộc sống tiện nghi hiện đại và mảng xanh thiên nhiên tươi mát. Vị trí vàng kế cận công viên trung tâm.",
    specifications: [
      "Diện tích đất: 250m2",
      "Diện tích sàn xây dựng: 380m2",
      "Hệ thống tưới cây tự động thông minh",
      "Nội thất cơ bản bàn giao cao cấp",
      "Vị trí góc hai mặt tiền đắt giá"
    ]
  },
  {
    id: 7,
    name: "Diamond Crest",
    price: "110 Tỷ",
    priceValue: 110,
    area: "800m²",
    areaValue: 800,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    beds: 7,
    baths: 8,
    type: "Đơn lập",
    direction: "Đông Nam",
    location: "Khu Premium",
    description: "Tuyệt tác biệt thự hoàng gia lớn nhất dự án, sở hữu khuôn viên rộng lớn ôm trọn bờ sông và khu vườn nhiệt đới độc bản.",
    specifications: [
      "Diện tích đất: 800m2",
      "Diện tích sàn xây dựng: 1150m2",
      "Hồ bơi rộng 60m2 lọc muối điện phân",
      "Hầm để xe chứa được 4 ô tô lớn",
      "An ninh camera 3 lớp bảo vệ chuyên nghiệp"
    ]
  }
];

// Elevated realistic mock news articles (6 items)
const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Lễ ký kết đối tác vận hành tiêu chuẩn quốc tế cùng Savills Việt Nam",
    category: "Sự kiện",
    date: "15/05/2026",
    img: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=800&q=80",
    excerpt: "Chủ đầu tư chính thức ký kết hợp tác chiến lược cùng Savills Việt Nam trong việc quản lý và vận hành khu compound biệt thự cao cấp...",
    content: "Lễ ký kết diễn ra thành công tốt đẹp tại khách sạn Park Hyatt Sài Gòn với sự tham gia của ban lãnh đạo hai bên cùng hơn 200 khách mời danh dự. Savills Việt Nam cam kết mang đến dịch vụ quản lý chuẩn 5 sao, đảm bảo môi trường sống an ninh, văn minh và đẳng cấp nhất cho cư dân thượng lưu của dự án. Gói dịch vụ bao gồm quản gia đặc quyền, bảo vệ đa lớp 24/7 và bảo dưỡng chăm sóc cảnh quan định kỳ chuyên nghiệp."
  },
  {
    id: 2,
    title: "Cập nhật tiến độ thi công phân khu ven sông tháng 5/2026",
    category: "Tiến độ",
    date: "10/05/2026",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    excerpt: "Toàn bộ hạ tầng giao thông và mảng xanh công viên ven sông đã hoàn thành 95%. Các căn biệt thự đơn lập đang tiến hành sơn mặt ngoài...",
    content: "Tính đến tháng 5/2026, phân khu ven sông (Riverside Zone) đã hoàn thành đổ bê tông mặt đường chính, lắp đặt hệ thống đèn chiếu sáng thông minh và trồng thảm cỏ dọc kênh sinh thái. Phần thô của các biệt thự đơn lập và dinh thự đã hoàn thiện cất nóc và bắt đầu công đoạn tô trát, sơn phủ chống thấm ngoại thất, lắp đặt hệ thống kính Low-E cản nhiệt. Dự án cam kết bàn giao đúng tiến độ đề ra."
  },
  {
    id: 3,
    title: "Xu hướng thiết kế nội thất biệt thự tân cổ điển tối giản lên ngôi",
    category: "Thiết kế",
    date: "05/05/2026",
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80",
    excerpt: "Sự kết hợp giữa những đường nét phào chỉ tinh tế của phong cách Pháp cổ điển cùng các thiết bị nội thất thông minh hiện đại...",
    content: "Năm 2026 đánh dấu sự lên ngôi của xu hướng tân cổ điển tối giản (Neoclassical Minimalism). Thay vì các chi tiết mạ vàng rườm rà, các kiến trúc sư ưu tiên các tone màu ấm như kem, beige, kết hợp với các mảng đá tự nhiên Calacatta và hệ thống chiếu sáng thông minh ẩn trần, tạo cảm giác sang trọng nhưng vô cùng tinh tế và thư giãn cho chủ nhân biệt thự."
  },
  {
    id: 4,
    title: "Đặc quyền thượng lưu: Bến du thuyền chuẩn quốc tế ngay nội khu dự án",
    category: "Đặc quyền",
    date: "28/04/2026",
    img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    excerpt: "Điểm nhấn đắt giá của dự án là bến du thuyền nội khu, mang đến trải nghiệm du ngoạn sông Sài Gòn sang trọng cho các chủ nhân...",
    content: "Bến du thuyền được thiết kế đạt chuẩn quốc tế với sức chứa lên tới 15 du thuyền cá nhân. Đây là đặc quyền dành riêng cho cư dân dự án, đi kèm dịch vụ hỗ trợ kỹ thuật, vệ sinh và tổ chức tiệc trên thuyền chuyên nghiệp, nâng tầm phong cách sống nghỉ dưỡng tại gia lên một đẳng cấp hoàn toàn mới."
  },
  {
    id: 5,
    title: "Vietcombank bảo lãnh và hỗ trợ tài chính hấp dẫn cho người mua biệt thự",
    category: "Chính sách",
    date: "20/04/2026",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    excerpt: "Chính thức công bố gói giải pháp tài chính đặc biệt hợp tác cùng ngân hàng Vietcombank, hỗ trợ vay đến 70% giá trị biệt thự...",
    content: "Nhằm hỗ trợ khách hàng sở hữu biệt thự dễ dàng hơn, Vietcombank cung cấp gói vay ưu đãi lãi suất 0% trong 24 tháng, ân hạn nợ gốc. Phương thức thanh toán được chia nhỏ linh hoạt theo tiến độ xây dựng, giúp nhà đầu tư tối ưu dòng tiền hiệu quả mà vẫn đảm bảo tính an toàn và minh bạch tuyệt đối của dòng vốn."
  },
  {
    id: 6,
    title: "Khai trương Clubhouse và công viên chủ đề đồi xanh thu hút giới tinh hoa",
    category: "Sự kiện",
    date: "15/04/2026",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    excerpt: "Sự kiện khai trương thu hút hàng trăm cư dân tương lai đến tham quan thực tế hồ bơi vô cực, phòng gym hiện đại và trải nghiệm tiện ích...",
    content: "Clubhouse có tổng diện tích sàn hơn 2,000m2 bao gồm khu vực sảnh đón khách sang trọng, cafe lounge, phòng gym cao cấp và hồ bơi vô cực rộng 500m2. Công viên đồi xanh kế cận cũng chính thức mở cửa với lối đi bộ lát đá tự nhiên và khu vui chơi trẻ em ngoài trời an toàn, đem lại trải nghiệm hoàn hảo cho cả gia đình."
  }
];

// Elevated realistic mock gallery items (9 items)
const MOCK_GALLERY: GalleryItem[] = [
  {
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    category: "Kiến trúc",
    title: "Mặt trước biệt thự The Crown"
  },
  {
    img: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80",
    category: "Kiến trúc",
    title: "Toàn cảnh Royal Riverside chiều hoàng hôn"
  },
  {
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    category: "Cảnh quan",
    title: "Hồ bơi vô cực phong cách resort"
  },
  {
    img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80",
    category: "Nội thất",
    title: "Phòng khách Tân cổ điển sang trọng"
  },
  {
    img: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
    category: "Nội thất",
    title: "Không gian bếp & Phòng ăn hiện đại"
  },
  {
    img: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
    category: "Nội thất",
    title: "Phòng ngủ Master view sông"
  },
  {
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    category: "Kiến trúc",
    title: "Thiết kế ban công và tiểu cảnh xanh"
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Kiến trúc",
    title: "Mặt bên biệt thự Emerald Estate"
  },
  {
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    category: "Cảnh quan",
    title: "Công viên ven sông rợp bóng cây"
  }
];

const normalizeVillaPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'villa', 'biet-thu'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function VillaTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [activePage, setActivePageState] = useState(normalizeVillaPage(initialPage));

  useEffect(() => {
    setActivePageState(normalizeVillaPage(initialPage));
  }, [initialPage]);

  const setActivePage = (p: string, customSlug?: string) => {
    setActivePageState(p);
    const tSlug = template?.slug || 'bds-07';
    syncDemoUrl(customSlug || (p === 'home' ? '' : p), tSlug);
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts[2] : (parts[1] !== (template?.slug || 'bds-07') ? parts[1] : 'home');
      if (sub) {
        setActivePageState(normalizeVillaPage(sub));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [template?.slug]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = viewport === 'mobile';
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  // Search and filter states for Villas
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [filterDirection, setFilterDirection] = useState('Tất cả');
  const [filterPrice, setFilterPrice] = useState('Tất cả');
  const [filterArea, setFilterArea] = useState('Tất cả');

  // Selected details, tab, and lightbox states
  const [selectedProject, setSelectedProject] = useState<VillaItem | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  
  // News states
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [filterNewsCategory, setFilterNewsCategory] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Contact form states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactVilla, setContactVilla] = useState('');

  // Floor plan and FAQ states (elevated to comply with rule-of-hooks)
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('Tất cả');
    setFilterDirection('Tất cả');
    setFilterPrice('Tất cả');
    setFilterArea('Tất cả');
  };

  const handleHomeSearch = () => {
    navigateTo('projects');
  };

  // Reactive villa filtering logic
  const filteredVillas = MOCK_VILLAS.filter(villa => {
    const matchesSearch = searchQuery === '' || 
      villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = filterType === 'Tất cả' || villa.type === filterType;
    const matchesDirection = filterDirection === 'Tất cả' || villa.direction === filterDirection;
    
    let matchesPrice = true;
    if (filterPrice === 'Dưới 40 tỷ') {
      matchesPrice = villa.priceValue < 40;
    } else if (filterPrice === 'Từ 40 - 80 tỷ') {
      matchesPrice = villa.priceValue >= 40 && villa.priceValue <= 80;
    } else if (filterPrice === 'Trên 80 tỷ') {
      matchesPrice = villa.priceValue > 80;
    }
    
    let matchesArea = true;
    if (filterArea === '200m² - 300m²') {
      matchesArea = villa.areaValue >= 200 && villa.areaValue <= 300;
    } else if (filterArea === '300m² - 500m²') {
      matchesArea = villa.areaValue > 300 && villa.areaValue <= 500;
    } else if (filterArea === '> 500m²') {
      matchesArea = villa.areaValue > 500;
    }
    
    return matchesSearch && matchesType && matchesDirection && matchesPrice && matchesArea;
  });

  // Reactive news filtering logic
  const filteredNews = MOCK_NEWS.filter(article => {
    const matchesSearch = searchNewsQuery === '' ||
      article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchNewsQuery.toLowerCase());
      
    const matchesCategory = filterNewsCategory === 'Tất cả' || article.category === filterNewsCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Reactive gallery filtering
  const filteredGallery = MOCK_GALLERY.filter(item => {
    return selectedGalleryTab === 'Tất cả' || item.category === selectedGalleryTab;
  });

  // Contact submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = contactPhone.replace(/\s/g, '');
    if (!phoneClean || !/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      alert('Số điện thoại phải từ 10-11 số (VD: 0919006030 hoặc +84919006030).');
      return;
    }
    if (!contactName.trim()) {
      alert("Vui lòng điền họ tên liên hệ!");
      return;
    }
    if (typeof (globalThis as any).submitContactForm === 'function') {
      (globalThis as any).submitContactForm({
        fullName: contactName,
        phone: phoneClean,
        email: contactEmail || undefined,
        message: contactMessage || 'Yêu cầu tư vấn biệt thự cao cấp',
        source: 'website_contact_form',
      }).catch(() => {});
    }
    setContactSubmitted(true);
  };

  const NavLinks = () => (
    <>
      {['home', 'projects', 'about', 'gallery', 'news', 'contact'].map((page) => (
        <button
          key={page}
          onClick={() => navigateTo(page)}
          className={`capitalize text-sm font-medium transition-colors pb-1 ${
            activePage === page ? 'text-[#92400E] border-b-2 border-[#92400E]' : 'text-gray-600 hover:text-[#92400E]'
          }`}
        >
          {page === 'home' ? 'Trang chủ' : 
           page === 'projects' ? 'Biệt thự' : 
           page === 'about' ? 'Giới thiệu' : 
           page === 'gallery' ? 'Thư viện' : 
           page === 'news' ? 'Tin tức' : 'Liên hệ'}
        </button>
      ))}
    </>
  );

  const Header = () => (
    <header className="sticky top-0 z-50 bg-[#FFFBEB] shadow-sm border-b border-[#F59E0B]/20">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <Home className="h-8 w-8 text-[#92400E] mr-2" />
            <span className="text-2xl font-bold text-[#92400E] font-serif tracking-wide">
              {template.name.split(' ')[0]} <span className="text-[#F59E0B]">Villa</span>
            </span>
          </div>

          {!isSmall ? (
            <nav className="flex space-x-8">
              <NavLinks />
            </nav>
          ) : null}

          <div className="flex items-center">
            {!isSmall ? (
              <button 
                onClick={() => navigateTo('contact')}
                className="bg-[#F59E0B] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#92400E] transition-colors shadow-md text-sm"
              >
                Tư Vấn Ngay
              </button>
            ) : (
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#92400E] p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isSmall && mobileMenuOpen && (
        <div className="bg-[#FFFBEB] border-t border-[#F59E0B]/20 absolute w-full left-0 shadow-lg z-50">
          <div className="flex flex-col space-y-4 p-6">
            <NavLinks />
            <button 
              onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}
              className="bg-[#F59E0B] text-white px-6 py-3 rounded-full font-medium text-center w-full mt-4 text-sm"
            >
              Nhận Tư Vấn
            </button>
          </div>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-[#29170a] text-white pt-20 pb-10">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <Home className="h-8 w-8 text-[#F59E0B] mr-2" />
              <span className="text-2xl font-bold font-serif text-white tracking-wide">
                {template.name.split(' ')[0]} <span className="text-[#F59E0B]">Villa</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Đẳng cấp sống thượng lưu với những kiệt tác biệt thự ven sông, mang đến không gian sống hoàn mỹ và đặc quyền vượt trội cho giới tinh hoa.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] transition-colors cursor-pointer">
                <Mail className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] transition-colors cursor-pointer">
                <Phone className="h-5 w-5 text-[#F59E0B]" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-6 border-b border-white/20 pb-3 font-semibold">Dòng Sản Phẩm</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li onClick={() => { setFilterType('Đơn lập'); navigateTo('projects'); }} className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Biệt thự đơn lập
              </li>
              <li onClick={() => { setFilterType('Song lập'); navigateTo('projects'); }} className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Biệt thự song lập
              </li>
              <li onClick={() => { setFilterType('Đơn lập'); navigateTo('projects'); }} className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Dinh thự ven sông
              </li>
              <li onClick={() => navigateTo('about')} className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Tiện ích nội khu
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-6 border-b border-white/20 pb-3 font-semibold">Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center" onClick={() => navigateTo('about')}>
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Câu chuyện thương hiệu
              </li>
              <li className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center" onClick={() => navigateTo('gallery')}>
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Thư viện hình ảnh
              </li>
              <li className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center" onClick={() => navigateTo('news')}>
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Tin tức & Sự kiện
              </li>
              <li className="hover:text-[#F59E0B] cursor-pointer transition-colors flex items-center" onClick={() => navigateTo('contact')}>
                <ChevronRight className="h-4 w-4 mr-2 text-[#F59E0B]" /> Thông tin liên hệ
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-6 border-b border-white/20 pb-3 font-semibold">Thông Tin Liên Hệ</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#F59E0B] mt-1 shrink-0" />
                <span>123 Đại lộ Thượng Lưu, Quận 2, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#F59E0B] shrink-0" />
                <span>0909 123 456 (24/7)</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#F59E0B] shrink-0" />
                <span>contact@premiumvilla.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <p>© 2026 {template.name} Villa. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-white cursor-pointer">Điều khoản sử dụng</span>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderHome = () => {
    return (
      <div className="bg-[#FAFAFA]">
        {/* HERO: Split layout */}
        <section className="relative bg-[#FFFBEB]">
          <div className={`${MAX_W} mx-auto`}>
            <div className="flex flex-col lg:flex-row min-h-[85vh]">
              <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-0 relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#F59E0B]/10 text-[#92400E] font-medium text-sm mb-6 border border-[#F59E0B]/20 self-start">
                  🌟 Tuyệt tác biệt thự ven sông
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#92400E] font-bold leading-tight mb-6">
                  Chuẩn Mực Sống <br/>
                  <span className="text-[#F59E0B]">Hoàng Gia</span> Mới
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-lg leading-relaxed">
                  Trải nghiệm cuộc sống thượng lưu đích thực với bộ sưu tập biệt thự phiên bản giới hạn, nơi tinh hoa kiến trúc hòa quyện cùng thiên nhiên xanh mát.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigateTo('projects')}
                    className="bg-[#92400E] text-white px-8 py-4 rounded-full font-medium hover:bg-[#78350f] transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    Khám Phá Ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="bg-white text-[#92400E] border-2 border-[#92400E] px-8 py-4 rounded-full font-medium hover:bg-[#FFFBEB] transition-all flex items-center justify-center"
                  >
                    Nhận Tư Vấn
                  </button>
                </div>
                
                <div className="mt-12 flex items-center gap-8 border-t border-[#F59E0B]/20 pt-8">
                  <div>
                    <div className="text-3xl font-bold text-[#92400E] font-serif">150+</div>
                    <div className="text-sm text-gray-600 mt-1">Biệt thự giới hạn</div>
                  </div>
                  <div className="w-px h-12 bg-[#F59E0B]/20"></div>
                  <div>
                    <div className="text-3xl font-bold text-[#92400E] font-serif">45ha</div>
                    <div className="text-sm text-gray-600 mt-1">Tổng diện tích</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
                <div className="absolute inset-0">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" 
                    alt="Luxury Mansion" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBEB] to-transparent lg:w-1/3"></div>
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Bàn giao</p>
                    <p className="text-lg font-bold text-[#92400E] font-serif">Quý 4/2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK SEARCH */}
        <section className="relative z-20 -mt-8 px-4">
          <div className={`${MAX_W} mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Loại hình</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-[#F59E0B] focus:ring-0 pb-2 text-[#92400E] font-medium bg-transparent outline-none cursor-pointer"
                >
                  <option value="Tất cả">Tất cả loại hình</option>
                  <option value="Đơn lập">Biệt thự đơn lập</option>
                  <option value="Song lập">Biệt thự song lập</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Diện tích</label>
                <select 
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-[#F59E0B] focus:ring-0 pb-2 text-[#92400E] font-medium bg-transparent outline-none cursor-pointer"
                >
                  <option value="Tất cả">Tất cả diện tích</option>
                  <option value="200m² - 300m²">200m² - 300m²</option>
                  <option value="300m² - 500m²">300m² - 500m²</option>
                  <option value="> 500m²">&gt; 500m²</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Mức giá</label>
                <select 
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="w-full border-0 border-b-2 border-gray-200 focus:border-[#F59E0B] focus:ring-0 pb-2 text-[#92400E] font-medium bg-transparent outline-none cursor-pointer"
                >
                  <option value="Tất cả">Tất cả mức giá</option>
                  <option value="Dưới 40 tỷ">Dưới 40 Tỷ</option>
                  <option value="Từ 40 - 80 tỷ">40 - 80 Tỷ</option>
                  <option value="Trên 80 tỷ">&gt; 80 Tỷ</option>
                </select>
              </div>
              <button 
                onClick={handleHomeSearch}
                className="bg-[#F59E0B] hover:bg-[#92400E] text-white rounded-xl py-4 transition-colors flex items-center justify-center font-medium h-full mt-auto"
              >
                <Search className="h-5 w-5 mr-2" />
                Tìm Kiếm
              </button>
            </div>
          </div>
        </section>

        {/* FEATURED VILLAS */}
        <section className="py-24 bg-[#FAFAFA]">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Bộ sưu tập giới hạn</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Kiệt Tác Biệt Thự nổi bật</h3>
              <p className="text-gray-600">Những tuyệt tác kiến trúc được chăm chút tỉ mỉ đến từng chi tiết, mang đến không gian sống hoàn hảo và đẳng cấp cho chủ nhân.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_VILLAS.slice(0, 3).map((villa) => (
                <div 
                  key={villa.id} 
                  onClick={() => setSelectedProject(villa)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={villa.img} alt={villa.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-[#92400E] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {villa.type}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-bold text-xl">{villa.price}</p>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-[#92400E] mb-2 font-serif group-hover:text-[#F59E0B] transition-colors">{villa.name}</h4>
                      <p className="text-gray-500 text-sm mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-[#F59E0B]" /> {villa.location}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 mt-4 text-center" style={{ contentVisibility: 'auto' }}>
                      <div className="flex flex-col items-center">
                        <Square className="h-5 w-5 text-[#F59E0B] mb-1" />
                        <span className="text-sm font-medium text-gray-700">{villa.area}</span>
                      </div>
                      <div className="flex flex-col items-center border-l border-r border-gray-100">
                        <Bed className="h-5 w-5 text-[#F59E0B] mb-1" />
                        <span className="text-sm font-medium text-gray-700">{villa.beds} PN</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Bath className="h-5 w-5 text-[#F59E0B] mb-1" />
                        <span className="text-sm font-medium text-gray-700">{villa.baths} WC</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button onClick={() => navigateTo('projects')} className="text-[#92400E] font-medium hover:text-[#F59E0B] inline-flex items-center gap-1">
                Xem tất cả biệt thự <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* VILLA TYPES */}
        <section className="py-24 bg-[#FFFBEB]">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Đa dạng lựa chọn</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Loại Hình Sản Phẩm</h3>
                <p className="text-gray-700 mb-8 leading-relaxed text-sm">
                  Thiết kế theo phong cách Tân cổ điển sang trọng, mỗi căn biệt thự là một tác phẩm nghệ thuật độc bản, khẳng định vị thế của gia chủ.
                </p>
                <div className="space-y-6">
                  {[
                    { typeVal: "Đơn lập", title: "Biệt thự Đơn lập", desc: "Không gian sống biệt lập, riêng tư tuyệt đối với 4 mặt thoáng, sân vườn rộng lớn bao quanh.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" },
                    { typeVal: "Song lập", title: "Biệt thự Song lập", desc: "Sự kết hợp hoàn hảo giữa tính cộng đồng và sự riêng tư, thiết kế đối xứng hài hòa.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
                    { typeVal: "Đơn lập", title: "Dinh thự ven sông", desc: "Phiên bản giới hạn với tầm nhìn panorama ôm trọn khúc sông xanh mát, bến du thuyền riêng.", img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80" },
                  ].map((type, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setFilterType(type.typeVal); navigateTo('projects'); }}
                      className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors cursor-pointer group border border-transparent hover:border-[#F59E0B]/20 hover:shadow-md"
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={type.img} alt={type.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#92400E] mb-1 font-serif">{type.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{type.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl relative">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" alt="Villa exterior" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#92400E]/20"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur p-6 rounded-xl shadow-xl">
                  <h4 className="text-xl font-serif font-bold text-[#92400E] mb-2">Đặc quyền tinh hoa</h4>
                  <p className="text-gray-600 text-sm">Thiết kế thông minh tối ưu ánh sáng tự nhiên, vật liệu bàn giao cao cấp nhập khẩu từ Châu Âu.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLOOR PLANS */}
        <section className="py-24 bg-white">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Mặt bằng chi tiết</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Thiết Kế Hoàn Mỹ</h3>
            </div>

            <div className="flex justify-center space-x-2 md:space-x-8 mb-12 border-b border-gray-200">
              {['Tầng 1', 'Tầng 2', 'Tầng 3', 'Mái'].map((floor, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveFloorPlan(idx)}
                  className={`pb-4 px-4 font-medium transition-colors border-b-2 ${
                    activeFloorPlan === idx ? 'border-[#92400E] text-[#92400E]' : 'border-transparent text-gray-500 hover:text-[#F59E0B]'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ contentVisibility: 'auto' }}>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex justify-center items-center h-[500px]">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" 
                  alt="Floor Plan" 
                  className="max-h-full object-contain rounded opacity-80 mix-blend-multiply filter contrast-125 grayscale"
                />
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold text-[#92400E] mb-4">
                  {['Mặt Bằng Tầng 1 (Trệt)', 'Mặt Bằng Tầng 2', 'Mặt Bằng Tầng 3', 'Mặt Bằng Tầng Mái'][activeFloorPlan]}
                </h4>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  Thiết kế mở tối đa hóa tầm nhìn, không gian sinh hoạt chung rộng rãi, kết nối hài hòa với thiên nhiên sân vườn bên ngoài.
                </p>
                <ul className="space-y-4">
                  {[
                    "Phòng khách sang trọng (45m²)",
                    "Phòng bếp & Bàn ăn (30m²)",
                    "Gara ô tô (Đỗ 2 xe)",
                    "Sân vườn bao quanh"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 bg-[#FFFBEB] p-4 rounded-lg border border-[#F59E0B]/20 text-sm">
                      <CheckCircle className="h-5 w-5 text-[#F59E0B] mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="mt-8 bg-white border border-[#92400E] text-[#92400E] px-8 py-3 rounded-full font-medium hover:bg-[#92400E] hover:text-white transition-colors w-full sm:w-auto text-sm shadow-sm"
                >
                  Đăng Ký Xem Mặt Bằng Thực Tế
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & WHY VILLA */}
        <section className="py-24 bg-[#92400E] text-white" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=1000&q=80" 
                  alt="About Developer" 
                  className="rounded-2xl shadow-2xl border-4 border-white/10"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Chủ đầu tư uy tín</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Dấu Ấn Chạm Thời Gian</h3>
                <p className="text-white/80 mb-6 leading-relaxed text-lg">
                  Với hơn 15 năm kinh nghiệm kiến tạo các khu đô thị cao cấp, chúng tôi không chỉ xây dựng những ngôi nhà, mà còn kiến tạo một biểu tượng sống đích thực cho giới tinh hoa.
                </p>
                <p className="text-white/80 mb-8 leading-relaxed text-sm">
                  Mỗi căn biệt thự là một tác phẩm nghệ thuật, nơi giá trị gia đình được tôn vinh, nơi an tâm tận hưởng cuộc sống trọn vẹn và đẳng cấp nhất.
                </p>
                <div className="flex items-center gap-6">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://ui-avatars.com/api/?name=Tran+Quang+C&background=F59E0B&color=fff" alt="CEO" className="w-16 h-16 rounded-full border-2 border-white" />
                  <div>
                    <h4 className="font-bold text-lg font-serif">Trần Quang C.</h4>
                    <p className="text-[#F59E0B] text-sm">Tổng Giám Đốc</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-24">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Tại Sao Chọn Chúng Tôi?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: ShieldCheck, title: "Pháp Lý Hoàn Chỉnh", desc: "Sổ hồng sở hữu lâu dài, sẵn sàng bàn giao ngay cho khách hàng." },
                  { icon: Trees, title: "Mật Độ Xanh 70%", desc: "Không gian sống trong lành với hệ thống công viên và kênh sinh thái." },
                  { icon: Award, title: "Thiết Kế Độc Bản", desc: "Mỗi căn biệt thự mang một phong cách riêng biệt, không trùng lặp." },
                  { icon: Heart, title: "Cộng Đồng Tinh Hoa", desc: "Hàng xóm đẳng cấp, môi trường sống văn minh và an toàn tuyệt đối." },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 bg-[#F59E0B] rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 font-serif">{feature.title}</h4>
                    <p className="text-white/75 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AMENITIES */}
        <section className="py-24 bg-white" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Đặc quyền sống</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Tiện Ích Nội Khu Đẳng Cấp 5 Sao</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Coffee, title: "Clubhouse Sang Trọng", desc: "Nơi giao lưu của cộng đồng cư dân tinh hoa." },
                { icon: Droplets, title: "Hồ Bơi Vô Cực", desc: "Hồ bơi tiêu chuẩn Olympic tích hợp sục Jacuzzi." },
                { icon: Dumbbell, title: "Gym & Yoga Center", desc: "Trang thiết bị hiện đại nhập khẩu 100%." },
                { icon: Trees, title: "Công Viên Ven Sông", desc: "Đường dạo bộ dọc bờ sông rợp bóng cây." },
                { icon: ShieldCheck, title: "An Ninh Đa Lớp", desc: "Hệ thống camera và bảo vệ tuần tra 24/7." },
                { icon: Heart, title: "Spa & Chăm Sóc Sức Khỏe", desc: "Dịch vụ thư giãn và phục hồi sức khỏe chuyên sâu." },
              ].map((amenity, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-[#FAFAFA] rounded-xl border border-gray-100 hover:border-[#F59E0B]/30 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#FFFBEB] rounded-full flex items-center justify-center shrink-0">
                    <amenity.icon className="h-6 w-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#92400E] mb-2 font-serif">{amenity.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{amenity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 bg-[#F59E0B]">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "45", unit: "ha", label: "Tổng diện tích" },
                { number: "150", unit: "+", label: "Biệt thự giới hạn" },
                { number: "70", unit: "%", label: "Mật độ xanh & nước" },
                { number: "24/7", unit: "", label: "Dịch vụ đặc quyền" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
                    {stat.number}<span className="text-[#92400E]">{stat.unit}</span>
                  </div>
                  <div className="text-white/90 font-medium uppercase tracking-wide text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY MASONRY */}
        <section className="py-24 bg-[#FAFAFA]" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Góc nhìn chân thực</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Thư Viện Hình Ảnh</h3>
              </div>
              <button onClick={() => navigateTo('gallery')} className="hidden sm:flex text-[#92400E] font-medium hover:text-[#F59E0B] items-center gap-1">
                Xem thêm <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              <div 
                onClick={() => setSelectedGalleryImg(MOCK_GALLERY[0].img)}
                className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group cursor-pointer shadow-md"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[0].img} alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white h-10 w-10" />
                </div>
              </div>
              <div 
                onClick={() => setSelectedGalleryImg(MOCK_GALLERY[1].img)}
                className="rounded-xl overflow-hidden relative group cursor-pointer shadow-md"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[1].img} alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div 
                onClick={() => setSelectedGalleryImg(MOCK_GALLERY[2].img)}
                className="rounded-xl overflow-hidden relative group cursor-pointer shadow-md"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[2].img} alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div 
                onClick={() => setSelectedGalleryImg(MOCK_GALLERY[3].img)}
                className="col-span-2 rounded-xl overflow-hidden relative group cursor-pointer shadow-md"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[3].img} alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            
            <button onClick={() => navigateTo('gallery')} className="sm:hidden mt-8 text-[#92400E] font-medium w-full text-center hover:text-[#F59E0B] flex justify-center items-center gap-1">
              Xem tất cả hình ảnh <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#FFFBEB]">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Đánh giá từ cộng đồng</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Tiếng Nói Của Cư Dân</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Anh Minh Hoàng", role: "Doanh nhân", quote: "Không gian sống yên tĩnh, an ninh tuyệt đối. Vị trí ven sông mang lại cảm giác thư thái mỗi khi về nhà sau ngày làm việc căng thẳng." },
                { name: "Chị Lan Ngọc", role: "Cư dân", quote: "Thiết kế biệt thự rất thông minh, đón gió tự nhiên. Các tiện ích nội khu như hồ bơi và công viên cực kỳ được chăm chút." },
                { name: "Anh Quốc Bảo", role: "Nhà đầu tư", quote: "Pháp lý rõ ràng, chủ đầu tư uy tín. Đây không chỉ là nơi an cư lý tưởng mà còn là tài sản tích lũy giá trị vững bền cho thế hệ sau." },
              ].map((testi, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#F59E0B]/20 relative">
                  <div className="absolute top-8 right-8 text-[#F59E0B]/20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.714 4.026-6.59 4.026-6.59l.867 5.215s-2.023-.42-2.023 1.954v1.812h4.113v5h-7.006zm-10.017 0v-7.391c0-5.714 4.026-6.59 4.026-6.59l.867 5.215s-2.023-.42-2.023 1.954v1.812h4.113v5h-7.006z"/></svg>
                  </div>
                  <div className="flex space-x-1 mb-6" style={{ contentVisibility: 'auto' }}>
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-8 italic text-sm">&ldquo;{testi.quote}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#92400E]/10 rounded-full flex items-center justify-center mr-4" style={{ contentVisibility: 'auto' }}>
                      <User className="h-6 w-6 text-[#92400E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#92400E] font-serif">{testi.name}</h4>
                      <p className="text-xs text-gray-500">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE / PROGRESS */}
        <section className="py-24 bg-white" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Tiến Độ Dự Án</h3>
            </div>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-1/2"></div>
              
              <div className="space-y-12">
                {[
                  { date: "Quý 1/2025", title: "Khởi công móng cọc", desc: "Hoàn thiện san lấp mặt bằng và ép cọc đại trà toàn khu.", done: true },
                  { date: "Quý 4/2025", title: "Cất nóc phân khu A", desc: "Hoàn thiện phần thô 50 căn biệt thự đầu tiên.", done: true },
                  { date: "Quý 2/2026", title: "Hoàn thiện cảnh quan", desc: "Trồng cây xanh, hoàn thiện hồ bơi và khu Clubhouse.", done: false },
                  { date: "Quý 4/2026", title: "Bàn giao nhà", desc: "Bàn giao chìa khóa cho cư dân, dự án chính thức đi vào hoạt động.", done: false },
                ].map((item, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-white md:-translate-x-1/2 mt-1 z-10 flex items-center justify-center bg-white shadow">
                      {item.done ? <div className="w-3 h-3 bg-[#92400E] rounded-full"></div> : <div className="w-3 h-3 bg-gray-300 rounded-full"></div>}
                    </div>
                    
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${item.done ? 'bg-[#92400E]/10 text-[#92400E]' : 'bg-gray-100 text-gray-500'}`}>
                        {item.date}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section className="py-24 bg-[#FAFAFA]" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase mb-3">Cập nhật mới nhất</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Tin Tức & Sự Kiện</h3>
              </div>
              <button onClick={() => navigateTo('news')} className="hidden sm:flex text-[#92400E] font-medium hover:text-[#F59E0B] items-center gap-1">
                Xem tất cả <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_NEWS.slice(0, 3).map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => setSelectedArticle(news)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2 text-[#F59E0B]" /> {news.date}
                    </div>
                    <h4 className="text-lg font-bold text-[#92400E] mb-3 group-hover:text-[#F59E0B] transition-colors line-clamp-2 font-serif">{news.title}</h4>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">{news.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="py-24 bg-white" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl`}>
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Câu Hỏi Thường Gặp</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "Pháp lý của dự án hiện tại như thế nào?", a: "Dự án đã có đầy đủ giấy phép xây dựng, phê duyệt 1/500 và sổ hồng từng nền. Khách hàng nhận nhà sẽ được hỗ trợ làm thủ tục cấp Giấy chứng nhận quyền sở hữu nhà ở nhanh chóng." },
                { q: "Ngân hàng nào hỗ trợ vay vốn và chính sách ra sao?", a: "Dự án được tài trợ và bảo lãnh bởi Vietcombank và MBBank. Hỗ trợ vay lên đến 70% giá trị hợp đồng, ân hạn nợ gốc và miễn lãi suất trong 24 tháng đầu." },
                { q: "Tiến độ thanh toán cho biệt thự xây sẵn?", a: "Tiến độ thanh toán vô cùng linh hoạt chia làm 12 đợt. Chỉ cần thanh toán 30% cho đến khi nhận thông báo bàn giao nhà. Chiết khấu lên đến 8% cho khách hàng thanh toán nhanh." },
                { q: "Tiêu chuẩn bàn giao biệt thự gồm những gì?", a: "Bàn giao hoàn thiện mặt ngoài theo thiết kế đồng bộ, thô bên trong. Khu vực cảnh quan, sân vườn, tường rào và cổng được hoàn thiện 100%." },
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm" style={{ contentVisibility: 'auto' }}>
                  <button 
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 bg-gray-50 hover:bg-[#FFFBEB] transition-colors text-left"
                  >
                    <span className="font-bold text-[#92400E] text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#F59E0B] transition-transform shrink-0 ${faqOpen === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {faqOpen === idx && (
                    <div className="p-6 bg-white text-gray-600 border-t border-gray-200 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-0">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="bg-[#92400E] rounded-3xl overflow-hidden shadow-2xl relative -mb-16 z-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
              <div className="relative p-12 md:p-16 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 text-center md:text-left mb-8 md:mb-0">
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4">Trải nghiệm không gian sống thượng lưu</h3>
                  <p className="text-white/80 text-base md:text-lg">Đăng ký tham quan biệt thự mẫu và nhận bảng giá chi tiết ngay hôm nay.</p>
                </div>
                <div className="md:w-1/3 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="bg-[#F59E0B] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#92400E] transition-colors w-full shadow-lg text-sm"
                  >
                    Đăng Ký Tham Quan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="pt-40 pb-24 bg-[#FFFBEB]" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl`}>
            <Mail className="h-12 w-12 mx-auto text-[#F59E0B] mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[#92400E] mb-4">Đăng Ký Nhận Thông Tin Mới Nhất</h3>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">Trở thành những người đầu tiên nhận thông tin về các quỹ căn đẹp và chính sách ưu đãi đặc quyền.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Đăng ký nhận brochure thành công!"); }} className="flex flex-col sm:flex-row gap-3">
              <input type="email" required placeholder="Email của bạn..." className="flex-1 px-6 py-4 rounded-full border border-[#F59E0B]/30 focus:outline-none focus:border-[#92400E] bg-white text-sm" />
              <button type="submit" className="bg-[#92400E] text-white px-8 py-4 rounded-full font-medium hover:bg-[#78350f] transition-colors text-sm font-semibold">
                Đăng Ký
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div className="pt-20 pb-32 min-h-screen bg-[#FAFAFA]">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16 mt-12">
            <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Danh mục dự án</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#92400E] mb-6">Danh Sách Biệt Thự</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">Tuyển tập những kiệt tác biệt thự có vị trí đẹp nhất, kiến trúc tân cổ điển hoàng gia, sẵn sàng chào đón những chủ nhân danh giá.</p>
          </div>
          
          {/* Interactive Filters */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 border border-gray-100 shadow-md">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Box */}
              <div className="relative flex-1 w-full" style={{ contentVisibility: 'auto' }}>
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên biệt thự, vị trí, đặc điểm..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 text-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xs py-1"
                  >
                    Xóa
                  </button>
                )}
              </div>
              
              {/* Filters toggle / Summary */}
              <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-start lg:justify-end">
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 bg-white cursor-pointer"
                >
                  <option value="Tất cả">Tất cả loại hình</option>
                  <option value="Đơn lập">Đơn lập</option>
                  <option value="Song lập">Song lập</option>
                </select>
                
                <select 
                  value={filterDirection} 
                  onChange={(e) => setFilterDirection(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 bg-white cursor-pointer"
                >
                  <option value="Tất cả">Tất cả hướng</option>
                  <option value="Đông Nam">Đông Nam</option>
                  <option value="Tây Nam">Tây Nam</option>
                  <option value="Đông Bắc">Đông Bắc</option>
                  <option value="Tây Bắc">Tây Bắc</option>
                  <option value="Nam">Nam</option>
                  <option value="Bắc">Bắc</option>
                </select>
                
                <select 
                  value={filterPrice} 
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 bg-white cursor-pointer"
                >
                  <option value="Tất cả">Tất cả giá</option>
                  <option value="Dưới 40 tỷ">Dưới 40 tỷ</option>
                  <option value="Từ 40 - 80 tỷ">40 - 80 tỷ</option>
                  <option value="Trên 80 tỷ">Trên 80 tỷ</option>
                </select>

                <select 
                  value={filterArea} 
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 bg-white cursor-pointer"
                >
                  <option value="Tất cả">Tất cả diện tích</option>
                  <option value="200m² - 300m²">200m² - 300m²</option>
                  <option value="300m² - 500m²">300m² - 500m²</option>
                  <option value="> 500m²">&gt; 500m²</option>
                </select>

                <button 
                  onClick={resetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 font-semibold"
                  title="Đặt lại bộ lọc"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Đặt lại
                </button>
              </div>
            </div>
            
            {/* Filter tags display */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-500" style={{ contentVisibility: 'auto' }}>
              {(searchQuery || filterType !== 'Tất cả' || filterDirection !== 'Tất cả' || filterPrice !== 'Tất cả' || filterArea !== 'Tất cả') && (
                <>
                  <span className="font-bold self-center text-gray-700">Đang lọc:</span>
                  {searchQuery && <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full">&ldquo;{searchQuery}&rdquo;</span>}
                  {filterType !== 'Tất cả' && <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full">{filterType}</span>}
                  {filterDirection !== 'Tất cả' && <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full">Hướng: {filterDirection}</span>}
                  {filterPrice !== 'Tất cả' && <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full">{filterPrice}</span>}
                  {filterArea !== 'Tất cả' && <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 px-2.5 py-0.5 rounded-full">DT: {filterArea}</span>}
                  <span className="text-gray-400 self-center ml-2">({filteredVillas.length} kết quả)</span>
                </>
              )}
            </div>
          </div>

          {/* List Grid */}
          {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVillas.map((villa) => (
                <div 
                  key={villa.id} 
                  onClick={() => setSelectedProject(villa)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                  <div className="h-64 overflow-hidden relative shrink-0">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={villa.img} alt={villa.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-[#92400E] shadow-md border border-[#F59E0B]/20">
                      {villa.type}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#92400E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {villa.location}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-[#92400E] mb-2 font-serif group-hover:text-[#F59E0B] transition-colors">{villa.name}</h4>
                      <p className="text-[#F59E0B] font-bold text-xl mb-3">{villa.price}</p>
                      <p className="text-gray-600 text-xs leading-relaxed mb-6 line-clamp-2">{villa.description}</p>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs border-t border-gray-100 pt-4 mt-auto">
                      <span className="flex items-center gap-1 font-semibold"><Square className="h-4 w-4 text-[#F59E0B] shrink-0" /> {villa.area}</span>
                      <span className="flex items-center gap-1 font-semibold"><Bed className="h-4 w-4 text-[#F59E0B] shrink-0" /> {villa.beds} PN</span>
                      <span className="flex items-center gap-1 font-semibold"><Compass className="h-4 w-4 text-[#F59E0B] shrink-0" /> {villa.direction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
              <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">Không Tìm Thấy Biệt Thự Phù Hợp</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Chúng tôi không tìm thấy kết quả nào phù hợp với bộ lọc hiện tại của quý khách. Vui lòng thử đặt lại bộ lọc.</p>
              <button 
                onClick={resetFilters}
                className="bg-[#92400E] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#78350f] transition-colors text-sm shadow-md"
              >
                Đặt Lại Tất Cả Bộ Lọc
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAbout = () => {
    return (
      <div className="pt-20 min-h-screen bg-white">
        {/* Hero banner */}
        <div className="h-[450px] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#92400E]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-multiply"></div>
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-xs mb-4 uppercase tracking-widest border border-white/20">
              Kiệt tác di sản
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">Về Chúng Tôi</h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Kiến tạo những kiệt tác di sản kiến trúc vượt thời gian và đặc quyền sống thượng lưu cho giới tinh hoa Việt Nam.
            </p>
          </div>
        </div>
        
        {/* Tầm nhìn & Sứ mệnh */}
        <section className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 py-24`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Định hướng phát triển</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E] mb-6">Tầm Nhìn & Sứ Mệnh</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Premium Villa Group không ngừng nỗ lực trở thành nhà phát triển bất động sản dòng biệt thự cao cấp hàng đầu Việt Nam. Chúng tôi không chỉ xây dựng những ngôi nhà, mà còn kiến tạo một chuẩn mực sống mới bền vững, an lành và trường tồn cùng thời gian.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                Sứ mệnh của chúng tôi là đem lại sự hài lòng tối đa cho khách hàng bằng các sản phẩm chất lượng cao nhất, pháp lý minh bạch tuyệt đối và dịch vụ chăm sóc tận tâm.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#FFFBEB] p-6 rounded-xl border border-[#F59E0B]/20">
                  <div className="text-4xl font-bold text-[#92400E] mb-1 font-serif">15+</div>
                  <div className="text-sm text-gray-700 font-bold">Năm Kinh Nghiệm</div>
                  <p className="text-xs text-gray-500 mt-1">Kiến tạo các khu compound cao cấp</p>
                </div>
                <div className="bg-[#FFFBEB] p-6 rounded-xl border border-[#F59E0B]/20">
                  <div className="text-4xl font-bold text-[#92400E] mb-1 font-serif">6+</div>
                  <div className="text-sm text-gray-700 font-bold">Đại Dự Án Bàn Giao</div>
                  <p className="text-xs text-gray-500 mt-1">Đạt tỷ lệ lấp đầy cư dân 90%</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-4">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=600&q=80" alt="About construction" className="rounded-2xl shadow-md w-full object-cover h-64" />
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80" alt="About villa exterior" className="rounded-2xl shadow-md w-full object-cover h-48" />
              </div>
              <div className="space-y-4 pt-8">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="About interior" className="rounded-2xl shadow-md w-full object-cover h-48" />
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80" alt="About architecture" className="rounded-2xl shadow-md w-full object-cover h-64" />
              </div>
            </div>
          </div>
        </section>

        {/* Giá trị cốt lõi */}
        <section className="py-24 bg-[#FAFAFA] border-t border-b border-gray-100">
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Kim chỉ nam hoạt động</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Giá Trị Cốt Lõi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Uy Tín Vững Bền", desc: "Luôn đặt pháp lý minh bạch và tiến độ bàn giao chính xác làm cam kết sống còn với mọi khách hàng." },
                { icon: Award, title: "Thiết Kế Độc Bản", desc: "Không sao chép đại trà. Mỗi biệt thự là một tác phẩm nghệ thuật tôn vinh cá tính và đẳng cấp riêng của gia chủ." },
                { icon: Trees, title: "Môi Trường Xanh", desc: "Dành đến 70% diện tích cho cây xanh, mặt nước và không gian cộng đồng để phát triển sức khỏe toàn diện." },
                { icon: Heart, title: "Đặc Quyền Tinh Hoa", desc: "Hệ thống dịch vụ 5 sao khép kín, bảo vệ đa lớp đảm bảo sự an tâm và riêng tư tuyệt đối cho cư dân." },
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#F59E0B]/30 transition-all">
                  <div className="w-12 h-12 bg-[#FFFBEB] rounded-xl flex items-center justify-center mb-6 border border-[#F59E0B]/20">
                    <value.icon className="h-6 w-6 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#92400E] mb-3 font-serif">{value.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones / Cột mốc */}
        <section className="py-24 bg-white" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Chặng đường phát triển</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Cột Mốc Lịch Sử</h2>
            </div>
            
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#F59E0B]/30 md:-translate-x-1/2"></div>
              
              <div className="space-y-16">
                {[
                  { year: "2012", title: "Khởi Đầu Vững Chắc", desc: "Thành lập Premium Villa Group với định hướng phát triển dòng sản phẩm biệt thự compound khép kín cho giới thượng lưu." },
                  { year: "2016", title: "Dấu Ấn Đầu Tiên", desc: "Bàn giao thành công phân khu Riverview Mansion Quận 2, thiết lập chuẩn mực sống ven sông sang trọng." },
                  { year: "2020", title: "Khẳng Định Vị Thế", desc: "Được vinh danh là 'Nhà phát triển phân khúc biệt thự hạng sang tốt nhất' tại Vietnam Property Awards." },
                  { year: "2023", title: "Kiến Tạo Đại Đô Thị", desc: "Khởi công dự án biệt thự sinh thái quy mô 45ha với mật độ xây dựng lý tưởng chỉ 30%." },
                  { year: "2026", title: "Tương Lai Phồn Vinh", desc: "Cất nóc và tiến hành hoàn thiện cảnh quan chuẩn bị bàn giao chìa khóa cho các cư dân hoàng gia đầu tiên." }
                ].map((milestone, idx) => (
                  <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Badge / Year marker */}
                    <div className="absolute left-0 md:left-1/2 w-9 h-9 rounded-full border-4 border-white md:-translate-x-1/2 mt-1 z-10 flex items-center justify-center bg-[#F59E0B] text-white text-xs font-bold shadow-md">
                      {milestone.year.substring(2)}
                    </div>
                    
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/20 mb-3">
                        Năm {milestone.year}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">{milestone.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ban lãnh đạo */}
        <section className="py-24 bg-[#FFFBEB] border-t border-[#F59E0B]/10" style={{ contentVisibility: 'auto' }}>
          <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Người dẫn đường</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#92400E]">Ban Lãnh Đạo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Trần Quang C.", role: "Tổng Giám Đốc", avatar: "https://ui-avatars.com/api/?name=Tran+Quang+C&background=92400E&color=fff&size=128", bio: "Hơn 15 năm kinh nghiệm dẫn dắt các tập đoàn bất động sản lớn, kiến tạo hàng loạt dự án compound biệt thự cao cấp thành công." },
                { name: "Nguyễn Hoàng M.", role: "Giám Đốc Thiết Kế (KTS)", avatar: "https://ui-avatars.com/api/?name=Nguyen+Hoang+M&background=F59E0B&color=fff&size=128", bio: "Tốt nghiệp Thạc sĩ Kiến trúc tại Paris, ông đã mang hơi thở Tân cổ điển Pháp lãng mạn vào từng đường nét thiết kế độc bản." },
                { name: "Phạm Thanh H.", role: "Giám Đốc Vận Hành", avatar: "https://ui-avatars.com/api/?name=Pham+Thanh+H&background=92400E&color=fff&size=128", bio: "Cựu chuyên gia cao cấp tại Savills, chịu trách nhiệm xây dựng hệ thống tiện ích đặc quyền và quản lý vận hành chuẩn 5 sao." }
              ].map((leader, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border border-[#F59E0B]/20 shadow-sm hover:shadow-xl transition-all text-center">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.avatar} alt={leader.name} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-[#FFFBEB] shadow-inner" />
                  <h3 className="text-xl font-bold text-[#92400E] font-serif">{leader.name}</h3>
                  <p className="text-[#F59E0B] text-xs font-bold mb-4">{leader.role}</p>
                  <p className="text-gray-600 text-xs leading-relaxed italic">&ldquo;{leader.bio}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <div className="pt-20 pb-32 min-h-screen bg-[#FAFAFA]">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16 mt-12">
            <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Thư viện truyền thông</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#92400E] mb-6">Thư Viện Hình Ảnh</h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">Khám phá chi tiết kiến trúc tân cổ điển nguy nga, thiết kế nội thất sang trọng cùng không gian cảnh quan ven sông tuyệt mỹ.</p>
          </div>

          {/* Gallery tabs */}
          <div className="flex justify-center space-x-2 md:space-x-4 mb-12 overflow-x-auto pb-2">
            {['Tất cả', 'Kiến trúc', 'Nội thất', 'Cảnh quan'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-colors text-xs shrink-0 ${
                  selectedGalleryTab === tab 
                    ? 'bg-[#92400E] text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-[#FFFBEB] hover:text-[#92400E] border border-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedGalleryImg(item.img)}
                className="h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 relative border border-gray-100"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="bg-[#F59E0B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-max uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-white font-bold text-base font-serif">{item.title}</h4>
                  <p className="text-gray-300 text-[10px] mt-1 flex items-center gap-1">
                    <Camera className="h-3 w-3 text-[#F59E0B]" /> Click để phóng to ảnh
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNews = () => {
    return (
      <div className="pt-20 pb-32 min-h-screen bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16 mt-12">
            <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Bản tin dự án</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#92400E] mb-6">Tin Tức Mới Nhất</h1>
          </div>

          <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
            {/* Search News */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                placeholder="Tìm tin tức, bài viết..." 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 text-sm"
              />
            </div>
            {/* News Categories */}
            <select 
              value={filterNewsCategory}
              onChange={(e) => setFilterNewsCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-gray-700 bg-white cursor-pointer"
            >
              <option value="Tất cả">Tất cả danh mục</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Tiến độ">Tiến độ thi công</option>
              <option value="Thiết kế">Thiết kế & Kiến trúc</option>
              <option value="Đặc quyền">Đặc quyền cư dân</option>
              <option value="Chính sách">Chính sách ưu đãi</option>
            </select>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => setSelectedArticle(news)}
                  className="flex flex-col md:flex-row gap-8 bg-[#FAFAFA] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="md:w-2/5 h-56 md:h-auto overflow-hidden shrink-0">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#F59E0B]/10 text-[#92400E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-[#F59E0B]/20">
                        {news.category}
                      </span>
                      <span className="flex items-center text-[10px] text-gray-400">
                        <Clock className="h-3 w-3 mr-1 text-[#F59E0B]" /> {news.date}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#92400E] mb-3 group-hover:text-[#F59E0B] transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2">{news.excerpt}</p>
                    <button 
                      onClick={() => setSelectedArticle(news)}
                      className="text-[#92400E] font-bold text-xs uppercase tracking-wider flex items-center hover:text-[#F59E0B] transition-colors mt-auto cursor-pointer"
                    >
                      Đọc tiếp bài viết <ArrowRight className="ml-1.5 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center">
                <Search className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif">Không tìm thấy bài viết</h3>
                <p className="text-gray-500 text-sm">Vui lòng thử tìm kiếm với từ khóa khác.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContactSuccess = () => (
    <div className="pt-20 pb-32 min-h-screen bg-[#FFFBEB] flex items-center justify-center animate-fade-in">
      <div className={`${MAX_W} mx-auto px-4 text-center max-w-lg`}>
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-[#F59E0B]/20">
          <div className="w-20 h-20 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[#F59E0B]">
            <CheckCircle className="h-10 w-10 text-[#92400E]" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#92400E] mb-4">Gửi Yêu Cầu Thành Công!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
            Cảm ơn quý khách <strong>{contactName}</strong>. Yêu cầu tư vấn thông tin {contactVilla ? `dự án biệt thự ${contactVilla}` : "dự án"} của quý khách đã được chuyển tới bộ phận kinh doanh.
          </p>
          <div className="bg-[#FFFBEB] p-4 rounded-xl border border-[#F59E0B]/20 text-left text-xs text-[#92400E] mb-8 space-y-2">
            <p className="font-bold">Thông tin liên hệ của quý khách:</p>
            <p>• Họ tên: {contactName}</p>
            <p>• Số điện thoại: {contactPhone}</p>
            {contactEmail && <p>• Email: {contactEmail}</p>}
            {contactVilla && <p>• Biệt thự quan tâm: {contactVilla}</p>}
          </div>
          <p className="text-[10px] text-gray-500 mb-8">Chuyên viên tư vấn cao cấp sẽ liên hệ lại với quý khách trong vòng 15 phút.</p>
          <button 
            onClick={() => {
              setContactSubmitted(false);
              setContactName('');
              setContactPhone('');
              setContactEmail('');
              setContactMessage('');
              setContactVilla('');
              navigateTo('home');
            }}
            className="w-full bg-[#92400E] text-white py-4 rounded-xl font-bold hover:bg-[#78350f] transition-colors text-sm shadow-md"
          >
            Quay Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => {
    if (contactSubmitted) {
      return renderContactSuccess();
    }

    return (
      <div className="pt-20 pb-32 min-h-screen bg-[#FFFBEB]">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="grid lg:grid-cols-2 gap-16 mt-12 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 shadow-lg">
            <div className="p-8 sm:p-12 md:p-16">
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase mb-3 block">Liên hệ với chúng tôi</span>
              <h1 className="text-4xl font-serif font-bold text-[#92400E] mb-6">Liên Hệ Tư Vấn</h1>
              <p className="text-gray-600 mb-10 text-xs leading-relaxed">
                Để lại thông tin dưới đây, đội ngũ chuyên viên tư vấn cao cấp của Premium Villa Group sẽ chủ động liên hệ lại với quý khách trong thời gian sớm nhất.
              </p>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Họ và tên *</label>
                  <input 
                    type="text" 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nguyễn Văn A" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-xs text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Số điện thoại *</label>
                  <input 
                    type="tel" 
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="09xx xxx xxx" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-xs text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Email (Không bắt buộc)</label>
                  <input 
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@example.com" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-xs text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Biệt thự quan tâm</label>
                  <select 
                    value={contactVilla}
                    onChange={(e) => setContactVilla(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-xs text-gray-700 bg-white cursor-pointer"
                  >
                    <option value="">-- Chọn biệt thự hoặc khu vực --</option>
                    {MOCK_VILLAS.map(villa => (
                      <option key={villa.id} value={villa.name}>{villa.name} ({villa.price} - {villa.type})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Lời nhắn (Yêu cầu đặc biệt)</label>
                  <textarea 
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tôi muốn đăng ký tham quan thực tế nhà mẫu vào cuối tuần này..." 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none text-xs text-gray-800 resize-none"
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full bg-[#92400E] text-white py-4 rounded-xl font-bold hover:bg-[#78350f] transition-all hover:shadow-lg flex items-center justify-center gap-2 text-sm shadow-md">
                  Gửi Yêu Cầu Tư Vấn
                </button>
              </form>
            </div>
            
            <div className="bg-[#92400E] p-8 sm:p-12 md:p-16 text-white flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-serif font-bold mb-8 text-white border-b border-white/20 pb-4 font-semibold">Thông Tin Liên Hệ</h3>
                <div className="space-y-8">
                  <a href="https://maps.google.com/?q=123+Dai+lo+Thuong+Luu+Thao+Dien+Quan+2+TPHCM" target="_blank" rel="noopener noreferrer" className="flex items-start hover:opacity-90 transition">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-4 shrink-0 border border-[#F59E0B]/30">
                      <MapPin className="h-5 w-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Văn phòng bán hàng</h4>
                      <p className="text-white/80 text-sm leading-relaxed">123 Đại lộ Thượng Lưu, Phường Thảo Điền, Quận 2, TP. Hồ Chí Minh</p>
                    </div>
                  </a>
                  <a href="tel:0919006030" className="flex items-start hover:opacity-90 transition">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-4 shrink-0 border border-[#F59E0B]/30">
                      <Phone className="h-5 w-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Hotline tư vấn 24/7</h4>
                      <p className="text-white/80 text-sm">0919 006 030</p>
                    </div>
                  </a>
                  <a href="mailto:contact@premiumvilla.vn" className="flex items-start hover:opacity-90 transition">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mr-4 shrink-0 border border-[#F59E0B]/30">
                      <Mail className="h-5 w-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Hòm thư điện tử</h4>
                      <p className="text-white/80 text-sm">contact@premiumvilla.vn</p>
                    </div>
                  </a>
                </div>

                {/* Interactive Google Map */}
                <div className="mt-8 rounded-2xl overflow-hidden border border-white/20 shadow-md flex flex-col h-48 bg-black/40">
                  <div className="px-3.5 py-2 bg-black/60 text-white flex items-center justify-between text-xs">
                    <span className="font-bold truncate text-[#F59E0B]">Thảo Điền, Quận 2, TP.HCM</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Th%E1%BA%A3o+%C4%90i%E1%BB%81n,+Qu%E1%BA%ADn+2,+TP.HCM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-[#F59E0B] text-slate-950 font-bold text-[10px] shrink-0"
                    >
                      Mở Maps
                    </a>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <iframe
                      title="Bản đồ Thảo Điền Quận 2"
                      src="https://maps.google.com/maps?q=Th%E1%BA%A3o+%C4%90i%E1%BB%81n,+Qu%E1%BA%ADn+2,+TP.HCM&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 text-center sm:text-left">
                  <p className="text-[10px] text-white/50 mb-3">Theo dõi chúng tôi trên mạng xã hội</p>
                  <div className="flex justify-center sm:justify-start items-center gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 text-white transition-colors">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0068FF] text-white transition-colors p-2">
                      <ZaloIcon className="w-full h-full" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 text-white transition-colors">
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 text-white transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-[#F59E0B] selection:text-white">
      <Header />
      <main>
        {['home'].includes(activePage) && renderHome()}
        {['projects', 'du-an', 'san-pham', 'villa', 'biet-thu'].includes(activePage) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(activePage) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(activePage) && renderGallery()}
        {['news', 'tin-tuc', 'bai-viet'].includes(activePage) && renderNews()}
        {['contact', 'lien-he', 'tu-van'].includes(activePage) && renderContact()}
        {!['home', 'projects', 'du-an', 'san-pham', 'villa', 'biet-thu', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(activePage) && renderHome()}
      </main>
      <Footer />

      {/* Villa detail modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-10 transition-colors shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="md:w-1/2 h-64 md:h-auto relative shrink-0">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-[#92400E] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                {selectedProject.type}
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-xl text-white">
                <p className="text-[#F59E0B] font-bold text-2xl">{selectedProject.price}</p>
                <p className="text-xs text-gray-300 flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1 text-[#F59E0B]" /> {selectedProject.location}
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#92400E] mb-4">{selectedProject.name}</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Diện tích</p>
                    <p className="font-bold text-[#92400E] text-xs mt-0.5">{selectedProject.area}</p>
                  </div>
                  <div className="border-l border-r border-gray-200">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Phòng ngủ</p>
                    <p className="font-bold text-[#92400E] text-xs mt-0.5">{selectedProject.beds} PN</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Hướng nhà</p>
                    <p className="font-bold text-[#92400E] text-xs mt-0.5">{selectedProject.direction}</p>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 mb-2 text-sm font-serif">Mô Tả Chi Tiết</h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">{selectedProject.description}</p>
                
                <h4 className="font-bold text-gray-800 mb-2 text-sm font-serif">Thông Số Kỹ Thuật</h4>
                <ul className="space-y-2 mb-6">
                  {selectedProject.specifications.map((spec, i) => (
                    <li key={i} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-4 w-4 text-[#F59E0B] mr-2 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mt-auto">
                <button 
                  onClick={() => {
                    setContactVilla(selectedProject.name);
                    setSelectedProject(null);
                    navigateTo('contact');
                  }}
                  className="w-full bg-[#92400E] text-white py-3.5 rounded-xl text-xs font-bold hover:bg-[#78350f] transition-colors text-center shadow-md uppercase tracking-wider"
                >
                  Đăng Ký Tư Vấn Căn Này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News reader modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedArticle(null)} 
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-10 transition-colors shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="h-64 sm:h-80 w-full shrink-0 relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-3xl font-serif font-bold mt-3 leading-tight text-white">{selectedArticle.title}</h3>
                <div className="flex items-center text-[10px] text-gray-300 mt-2">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-[#F59E0B]" /> {selectedArticle.date}
                </div>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 text-gray-600 leading-relaxed text-xs sm:text-sm">
              <p className="font-bold text-gray-900 mb-4 text-sm sm:text-base border-l-4 border-[#F59E0B] pl-3 py-1">{selectedArticle.excerpt}</p>
              <div className="whitespace-pre-wrap">{selectedArticle.content}</div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-fade-in">
          {/* Top controls */}
          <div className="flex justify-between items-center text-white pt-2 px-4">
            <span className="font-semibold text-xs tracking-wider uppercase text-gray-400">Thư viện ảnh biệt thự</span>
            <button 
              onClick={() => setSelectedGalleryImg(null)} 
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="flex-1 flex items-center justify-center relative my-4">
            {/* Prev Button */}
            <button 
              onClick={() => {
                const currentIndex = MOCK_GALLERY.findIndex(item => item.img === selectedGalleryImg);
                const prevIndex = (currentIndex - 1 + MOCK_GALLERY.length) % MOCK_GALLERY.length;
                setSelectedGalleryImg(MOCK_GALLERY[prevIndex].img);
              }}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Current Image */}
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
              src={selectedGalleryImg} 
              alt="Lightbox" 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
            />

            {/* Next Button */}
            <button 
              onClick={() => {
                const currentIndex = MOCK_GALLERY.findIndex(item => item.img === selectedGalleryImg);
                const nextIndex = (currentIndex + 1) % MOCK_GALLERY.length;
                setSelectedGalleryImg(MOCK_GALLERY[nextIndex].img);
              }}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom info */}
          <div className="text-center text-white/80 pb-4 text-xs font-semibold tracking-wide">
            {MOCK_GALLERY.find(item => item.img === selectedGalleryImg)?.title} - {MOCK_GALLERY.find(item => item.img === selectedGalleryImg)?.category}
          </div>
        </div>
      )}
    </div>
  );
}

