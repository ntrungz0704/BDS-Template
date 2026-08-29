import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Building, ChevronRight, ChevronLeft, 
  Menu, X, Phone, Mail, ArrowRight, Star, Quote, 
  TrendingUp, Shield, Clock, Home, CheckCircle2,
  Filter, PlayCircle, Maximize2, Download, Globe,
  Briefcase, Users, Leaf, ArrowUpRight, BarChart2,
  Calendar, FileText, ChevronDown, Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// 6+ realistic Projects/Listings
const PROJECTS = [
  {
    id: 1,
    name: 'EcoPark Grand The Island',
    location: 'Hưng Yên',
    region: 'Hưng Yên',
    type: 'villa',
    listingType: 'Bán',
    priceVal: 15.5,
    priceDisplay: '15.5 Tỷ',
    bedrooms: 4,
    size: '350 m²',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    desc: 'Khu biệt thự đảo thượng lưu EcoPark Grand được thiết kế bởi các kiến trúc sư hàng đầu thế giới, mang lại không gian sống đẳng cấp giữa hồ nước mênh mông.',
    specs: ['Diện tích đất: 350m²', 'Số phòng ngủ: 4', 'Pháp lý: Sổ hồng lâu dài', 'Bàn giao: Hoàn thiện mặt ngoài']
  },
  {
    id: 2,
    name: 'Vinhomes Central Park',
    location: 'Bình Thạnh, TP.HCM',
    region: 'TP.HCM',
    type: 'apartment',
    listingType: 'Bán',
    priceVal: 4.2,
    priceDisplay: '4.2 Tỷ',
    bedrooms: 2,
    size: '78 m²',
    status: 'Sắp ra mắt',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    desc: 'Tọa lạc tại cảng Tân Cảng, dự án sở hữu công viên ven sông lớn nhất TP.HCM cùng các căn hộ được thiết kế tối ưu tầm nhìn và tiện ích hoàn hảo.',
    specs: ['Diện tích: 78m²', 'Số phòng ngủ: 2', 'Tầng: 25', 'Hướng: Đông Nam']
  },
  {
    id: 3,
    name: 'Sun Marina Town Đà Nẵng',
    location: 'Sơn Trà, Đà Nẵng',
    region: 'Đà Nẵng',
    type: 'shophouse',
    listingType: 'Bán',
    priceVal: 6.8,
    priceDisplay: '6.8 Tỷ',
    bedrooms: 3,
    size: '120 m²',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    desc: 'Shophouse bám biển vịnh Đà Nẵng, nằm ngay bến cảng hành khách quốc tế, mang lại tiềm năng kinh doanh du lịch vô cùng vượt trội.',
    specs: ['Diện tích đất: 120m²', 'Số phòng ngủ: 3', 'Số tầng: 5 tầng', 'Mặt tiền: 6m']
  },
  {
    id: 4,
    name: 'Masteri Centre Point',
    location: 'Quận 9, TP.HCM',
    region: 'TP.HCM',
    type: 'apartment',
    listingType: 'Bán',
    priceVal: 2.9,
    priceDisplay: '2.9 Tỷ',
    bedrooms: 1,
    size: '52 m²',
    status: 'Đã bàn giao',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    desc: 'Khu căn hộ compound cao cấp chuẩn quốc tế ngay trung tâm đại đô thị Grand Park, sở hữu đặc quyền tiện ích resort nghỉ dưỡng.',
    specs: ['Diện tích: 52m²', 'Số phòng ngủ: 1', 'Nội thất: Bàn giao cao cấp', 'Ban công: Kính cường lực']
  },
  {
    id: 5,
    name: 'Aqua City Riverside',
    location: 'Biên Hòa, Đồng Nai',
    region: 'Đồng Nai',
    type: 'villa',
    listingType: 'Bán',
    priceVal: 9.5,
    priceDisplay: '9.5 Tỷ',
    bedrooms: 4,
    size: '220 m²',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    desc: 'Khu biệt thự song lập ven sông thuộc đại đô thị sinh thái Aqua City, quy hoạch đồng bộ với bến du thuyền, quảng trường và trung tâm mua sắm.',
    specs: ['Diện tích đất: 220m²', 'Số phòng ngủ: 4', 'Đường trước nhà: 16m', 'Tiến độ: Đang hoàn thiện']
  },
  {
    id: 6,
    name: 'Novaworld Phan Thiết',
    location: 'Tiến Thành, Phan Thiết',
    region: 'Bình Thuận',
    type: 'shophouse',
    listingType: 'Bán',
    priceVal: 5.5,
    priceDisplay: '5.5 Tỷ',
    bedrooms: 3,
    size: '110 m²',
    status: 'Sắp ra mắt',
    img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    desc: 'Tổ hợp shophouse biển thuộc siêu thành phố biển - du lịch - sức khỏe Novaworld Phan Thiết, sở hữu lượng du khách dồi dào hàng năm.',
    specs: ['Diện tích đất: 110m²', 'Số phòng ngủ: 3', 'Bàn giao: Hoàn thiện mặt ngoài', 'Khoảng cách biển: 200m']
  },
  {
    id: 7,
    name: 'Landmark 81 Luxury Apartment',
    location: 'Bình Thạnh, TP.HCM',
    region: 'TP.HCM',
    type: 'apartment',
    listingType: 'Cho thuê',
    priceVal: 45.0,
    priceDisplay: '45 Triệu/tháng',
    bedrooms: 3,
    size: '140 m²',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    desc: 'Căn hộ dịch vụ cao cấp tầng siêu cao tại tháp Landmark 81. Tận hưởng trọn vẹn đặc quyền thượng lưu và tầm nhìn bao quát toàn bộ thành phố.',
    specs: ['Diện tích: 140m²', 'Số phòng ngủ: 3', 'Tầng: 62', 'View: Sông Sài Gòn & Trung tâm']
  },
  {
    id: 8,
    name: 'Biệt thự Riviera Cove An Phú',
    location: 'Quận 2, TP.HCM',
    region: 'TP.HCM',
    type: 'villa',
    listingType: 'Cho thuê',
    priceVal: 120.0,
    priceDisplay: '120 Triệu/tháng',
    bedrooms: 5,
    size: '450 m²',
    status: 'Đã bàn giao',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    desc: 'Biệt thự đơn lập sân vườn rộng lớn, có hồ bơi riêng, nằm trong khu compound khép kín an ninh 24/7 ven sông thoáng mát.',
    specs: ['Diện tích đất: 450m²', 'Số phòng ngủ: 5', 'Hồ bơi: Có hồ bơi riêng', 'Nội thất: Đầy đủ cao cấp']
  },
  {
    id: 9,
    name: 'Shophouse Vinhomes Ocean Park',
    location: 'Gia Lâm, Hà Nội',
    region: 'Hà Nội',
    type: 'shophouse',
    listingType: 'Cho thuê',
    priceVal: 35.0,
    priceDisplay: '35 Triệu/tháng',
    bedrooms: 4,
    size: '150 m²',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    desc: 'Shophouse chân đế chung cư đông đúc, vị trí đắc địa thuận tiện mở văn phòng, quán cà phê hoặc cửa hàng kinh doanh thời trang.',
    specs: ['Diện tích: 150m²', 'Mặt tiền: 8m', 'Số tầng: 2 tầng kinh doanh', 'Vị trí: Ngay trục đường chính']
  }
];

// 6+ realistic News/Articles
const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'Bất động sản trung tâm TP.HCM tiếp tục thiết lập mặt bằng giá mới trong quý 4',
    category: 'Thị trường',
    date: '10/10/2026',
    readTime: '5 phút đọc',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    summary: 'Theo báo cáo mới nhất, nguồn cung hạn chế cùng nhu cầu đầu tư an toàn đẩy giá căn hộ cao cấp khu vực lõi trung tâm lên mức kỷ lục.',
    content: 'Thị trường bất động sản TP.HCM đang ghi nhận những diễn biến sôi động vào dịp cuối năm 2026. Các dự án thuộc phân khúc căn hộ hạng sang tại khu vực Quận 1, Quận 3 và Thủ Thiêm liên tục thiết lập các cột mốc giá mới do quỹ đất sạch ngày càng khan hiếm. Nhiều chủ đầu tư lớn đang tập trung hoàn thiện hạ tầng và pháp lý để ra mắt các giỏ hàng độc bản, thu hút dòng tiền lớn từ cả trong và ngoài nước đầu tư vào tài sản trú ẩn an toàn này.'
  },
  {
    id: 2,
    title: 'Quy định mới về cấp sổ hồng cho condotel chính thức có hiệu lực',
    category: 'Chính sách',
    date: '09/10/2026',
    readTime: '4 phút đọc',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80&sig=1',
    summary: 'Nghị định mới tháo gỡ điểm nghẽn pháp lý cho bất động sản nghỉ dưỡng, tạo niềm tin lớn cho các nhà đầu tư cá nhân.',
    content: 'Chính phủ vừa ban hành nghị định sửa đổi, bổ sung một số điều của Luật Đất đai, trong đó quy định rõ ràng về việc cấp Giấy chứng nhận quyền sở hữu (sổ hồng) cho các loại hình bất động sản nghỉ dưỡng như Condotel, Officetel. Đây được đánh giá là bước đi mang tính lịch sử, phá vỡ thế băng giá của phân khúc nghỉ dưỡng suốt nhiều năm qua, giúp nhà đầu tư yên tâm sở hữu và giao dịch.'
  },
  {
    id: 3,
    title: 'Xu hướng dòng tiền dịch chuyển mạnh sang bất động sản xanh ngoại ô',
    category: 'Xu hướng',
    date: '08/10/2026',
    readTime: '6 phút đọc',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80&sig=2',
    summary: 'Sau dịch bệnh và ô nhiễm đô thị, người mua nhà chú trọng nhiều hơn đến môi trường sống trong lành và không gian sinh thái.',
    content: 'Những khu đô thị vệ tinh xung quanh Hà Nội và TP.HCM như Hưng Yên, Đồng Nai, Long An đang trở thành tâm điểm thu hút người mua ở thực. Các dự án có mật độ xây dựng thấp, nhiều hồ điều hòa và tích hợp công nghệ xanh được ưu tiên lựa chọn hàng đầu. Điều này phản ánh sự thay đổi sâu sắc trong tư duy sống và nhu cầu sở hữu nhà của người Việt hiện đại.'
  },
  {
    id: 4,
    title: 'Lãi suất vay mua nhà giảm sâu kỷ lục, kích cầu thị trường cuối năm',
    category: 'Tài chính',
    date: '07/10/2026',
    readTime: '3 phút đọc',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80&sig=3',
    summary: 'Nhiều ngân hàng thương mại tung các gói vay ưu đãi chỉ từ 5%/năm nhằm hỗ trợ khách hàng tiếp cận nguồn vốn mua nhà.',
    content: 'Dưới sự định hướng của Ngân hàng Nhà nước, các tổ chức tín dụng đang tích cực giảm lãi suất cho vay bất động sản tiêu dùng. Các gói vay cố định lãi suất từ 1 đến 2 năm đầu tiên đang tạo điều kiện thuận lợi chưa từng có cho người trẻ mua căn hộ đầu tiên. Dự báo giao dịch phân khúc căn hộ tầm trung sẽ tăng trưởng đột phá trong quý này.'
  },
  {
    id: 5,
    title: 'Đà Nẵng phê duyệt quy hoạch phân khu ven sông Hàn trị giá hàng tỷ USD',
    category: 'Quy hoạch',
    date: '06/10/2026',
    readTime: '5 phút đọc',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=400&q=80&sig=4',
    summary: 'Thành phố Đà Nẵng hướng tới xây dựng trục đô thị dịch vụ, du lịch ven sông Hàn hiện đại bậc nhất miền Trung.',
    content: 'Đồ án quy hoạch phân khu ven sông Hàn vừa được UBND Thành phố Đà Nẵng chính thức phê duyệt. Theo đó, khu vực này sẽ phát triển các tòa nhà cao tầng đa năng, công viên công cộng, phố đi bộ và bến du thuyền tiêu chuẩn quốc tế. Đây sẽ là bệ phóng cho bất động sản trung tâm Đà Nẵng bứt phá mạnh mẽ trong chu kỳ mới.'
  },
  {
    id: 6,
    title: 'Ứng dụng AI và Blockchain trong định giá bất động sản tại Việt Nam',
    category: 'Công nghệ',
    date: '05/10/2026',
    readTime: '4 phút đọc',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80&sig=5',
    summary: 'Các nền tảng công nghệ prop-tech tiên phong đưa trí tuệ nhân tạo vào định giá tự động giúp minh bạch hóa thị trường.',
    content: 'Công nghệ đang tái định hình cách thức giao dịch bất động sản truyền thống. Với dữ liệu lớn và thuật toán học máy, các ứng dụng hiện nay có thể định giá tài sản chính xác tới 95% so với giá thực tế. Việc kết hợp blockchain giúp bảo mật thông tin và rút ngắn thời gian thẩm định hồ sơ pháp lý, tạo điều kiện thuận lợi cho cả người bán và người mua.'
  }
];

// Gallery Images
const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', tab: 'Biệt thự', title: 'EcoPark Grand Island' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', tab: 'Biệt thự', title: 'Aqua City Waterfront' },
  { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', tab: 'Căn hộ', title: 'Masteri Centre Point Exterior' },
  { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', tab: 'Căn hộ', title: 'Vinhomes Central Park Tower' },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', tab: 'Nội thất', title: 'Sun Marina Town Living Room' },
  { url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80', tab: 'Nội thất', title: 'Landmark 81 Master Bedroom' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', tab: 'Biệt thự', title: 'Villa Riviera Private Pool' },
  { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', tab: 'Tiện ích', title: 'Vinhomes Ocean Park Saltwater Lake' },
  { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80', tab: 'Tiện ích', title: 'Novaworld Water Park' }
];

const normalizeListingPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'bat-dong-san'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function ListingMarketplace({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [currentPage, setCurrentPageState] = useState(normalizeListingPage(initialPage));

  useEffect(() => {
    setCurrentPageState(normalizeListingPage(initialPage));
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState(''); // '' (Tất cả), 'Bán', 'Cho thuê'
  const [priceRange, setPriceRange] = useState(''); // '', 'under-3', '3-7', '7-15', 'over-15'
  const [bedrooms, setBedrooms] = useState(''); // '', '1', '2', '3', '4+'
  const [propertyType, setPropertyType] = useState(''); // '', 'apartment', 'villa', 'shophouse'
  const [region, setRegion] = useState(''); // '', 'TP.HCM', 'Hà Nội', etc.

  // Component Modals & tab states
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedStatusTab, setSelectedStatusTab] = useState('Sắp ra mắt');
  
  // Elevated FAQ state to prevent hooks violation
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const isMobile = viewport === 'mobile';
  
  // Navigation Helper
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
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
  const getFilteredProjects = () => {
    return PROJECTS.filter(p => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesDesc = p.desc.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesDesc) return false;
      }
      
      // 2. Listing Type
      if (listingType && p.listingType !== listingType) return false;
      
      // 3. Property Type
      if (propertyType && p.type !== propertyType) return false;
      
      // 4. Region
      if (region && p.region !== region) return false;
      
      // 5. Bedrooms
      if (bedrooms) {
        if (bedrooms === '4+') {
          if (p.bedrooms < 4) return false;
        } else {
          if (p.bedrooms !== parseInt(bedrooms)) return false;
        }
      }
      
      // 6. Price Range
      if (priceRange) {
        if (p.listingType === 'Bán') {
          if (priceRange === 'under-3' && p.priceVal >= 3) return false;
          if (priceRange === '3-7' && (p.priceVal < 3 || p.priceVal > 7)) return false;
          if (priceRange === '7-15' && (p.priceVal < 7 || p.priceVal > 15)) return false;
          if (priceRange === 'over-15' && p.priceVal <= 15) return false;
        } else {
          if (priceRange === 'under-3' && p.priceVal >= 15) return false;
          if (priceRange === '3-7' && (p.priceVal < 15 || p.priceVal > 30)) return false;
          if (priceRange === '7-15' && (p.priceVal < 30 || p.priceVal > 50)) return false;
          if (priceRange === 'over-15' && p.priceVal <= 50) return false;
        }
      }
      return true;
    });
  };

  // Filtering Logic for News
  const getFilteredNews = () => {
    return NEWS_ARTICLES.filter(art => {
      const q = searchNewsQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || 
             art.summary.toLowerCase().includes(q) || 
             art.content.toLowerCase().includes(q);
    });
  };

  // About Page Milestones, Leadership, Core Values
  const milestones = [
    { year: '2011', title: 'Thành lập công ty', desc: 'PlatformBDS khởi đầu với đội ngũ 10 nhân sự chuyên tư vấn phân phối dự án.' },
    { year: '2015', title: 'Chuyển mình mạnh mẽ', desc: 'Trở thành đơn vị đầu tư phát triển bất động sản quy mô trung bình tại khu vực TP.HCM.' },
    { year: '2019', title: 'Tiên phong Prop-Tech', desc: 'Ra mắt cổng thông tin giao dịch số hóa đầu tiên tại Việt Nam tích hợp dữ liệu quy hoạch.' },
    { year: '2023', title: 'Mở rộng quy mô Quốc tế', desc: 'Hợp tác chiến lược với các quỹ đầu tư Nhật Bản và Singapore để phát triển các đại đô thị thông minh.' },
    { year: '2026', title: 'Dẫn đầu thị trường', desc: 'Sở hữu mạng lưới 25+ chi nhánh toàn quốc, hoàn thành bàn giao hơn 50 dự án chất lượng.' }
  ];

  const leadership = [
    { name: 'Nguyễn Đăng Khoa', role: 'Chủ tịch HĐQT', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', quote: 'Tầm nhìn chiến lược và sự cam kết bền bỉ chính là chìa khóa kiến tạo các công trình thế kỷ.' },
    { name: 'Trần Thị Thu Trang', role: 'Tổng Giám đốc (CEO)', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', quote: 'Chúng tôi lấy khách hàng làm trọng tâm để mang lại trải nghiệm sống đẳng cấp vượt trội.' },
    { name: 'Marcus Sterling', role: 'Giám đốc Thiết kế', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', quote: 'Đưa hơi thở kiến trúc đương đại kết hợp tinh hoa bản địa vào mỗi không gian sống.' }
  ];

  const coreValues = [
    { title: 'Tín (Uy tín)', desc: 'Đặt chữ TÍN lên vị trí hàng đầu, bảo vệ uy tín như bảo vệ danh dự của chính mình.' },
    { title: 'Tâm (Tận tâm)', desc: 'Phục vụ khách hàng bằng cả tấm lòng, đặt lợi ích của cư dân lên trên hết.' },
    { title: 'Trí (Trí tuệ)', desc: 'Không ngừng đổi mới sáng tạo, ứng dụng công nghệ để nâng cao chất lượng dịch vụ.' },
    { title: 'Tinh (Tinh hoa)', desc: 'Kiến tạo những sản phẩm đẳng cấp, hội tụ những con người tinh hoa nhất.' }
  ];

  // 1. STOCK TICKER BAR
  const renderTickerBar = () => (
    <div className="bg-[#020617] border-b border-white/10 text-xs font-medium overflow-hidden relative z-50">
      <div className="flex animate-marquee whitespace-nowrap py-2 text-slate-300">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-8 px-4 items-center">
            <span className="flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400"/> VHM: 45.20 (+1.2%)</span>
            <span className="flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400"/> NVL: 16.85 (+0.5%)</span>
            <span className="flex items-center gap-1"><TrendingUp size={14} className="text-red-400 rotate-180"/> DXG: 19.30 (-0.2%)</span>
            <span className="flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400"/> KDH: 31.50 (+2.1%)</span>
            <span className="flex items-center gap-1"><TrendingUp size={14} className="text-emerald-400"/> NLG: 38.90 (+0.8%)</span>
            <span className="text-sky-400 font-bold ml-8">TỔNG GIAO DỊCH Q3: 12,450 TỶ VNĐ</span>
          </div>
        ))}
      </div>
    </div>
  );

  // 2. MEGA MENU HEADER
  const renderHeader = () => (
    <header className="sticky top-0 w-full z-40 bg-[#020617]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className={`${MAX_W} mx-auto px-4 h-20 flex items-center justify-between`}>
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Building className="text-[#020617]" size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white tracking-tight">
              Platform<span className="text-[#38BDF8]">BDS</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentPage === link.id 
                  ? 'bg-white/10 text-[#38BDF8]' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        )}

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {!isMobile && (
            <button className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#020617] px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2">
              <Users size={18} /> Đăng nhập
            </button>
          )}
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 py-4 px-4 flex flex-col gap-2 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`text-left px-4 py-3 rounded-lg font-semibold ${
                currentPage === link.id ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'text-slate-300'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => navigateTo('contact')}
            className="mt-4 bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#020617] px-4 py-3 rounded-lg font-bold text-center cursor-pointer"
          >
            Đăng nhập
          </button>
        </div>
      )}
    </header>
  );

  // 3. HERO SLIDER
  const renderHero = () => {
    const slides = [
      {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
        title: 'Skyline Residences',
        subtitle: 'Biểu tượng mới của giới tinh hoa',
        price: 'Từ 4.5 Tỷ'
      }
    ];

    return (
      <section className="relative h-[80vh] min-h-[600px] w-full bg-[#020617] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={slides[0].image} alt="Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
        </div>

        <div className={`${MAX_W} mx-auto px-4 relative z-10 w-full`}>
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/30 text-[#38BDF8] font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
              Dự án Nổi bật 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-['Plus_Jakarta_Sans'] text-white leading-tight mb-6">
              Tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">tổ ấm</span><br />
              mơ ước của bạn
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Khám phá bộ sưu tập hơn 10,000 bất động sản cao cấp, biệt thự nghỉ dưỡng và căn hộ hạng sang trên toàn quốc.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateTo('projects')}
                className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#020617] px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center gap-2"
              >
                Khám phá ngay <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => alert('Đang tải video giới thiệu dự án...')}
                className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <PlayCircle size={20} className="text-[#38BDF8]" /> Xem Video
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 4. ADVANCED SEARCH
  const renderAdvancedSearch = (isOnProjectsPage = false) => (
    <div className={`relative z-20 ${isOnProjectsPage ? 'mb-8' : '-mt-16 pb-16'}`}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Search Query */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Từ khóa</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tên dự án, khu vực..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] transition-colors" 
                />
              </div>
            </div>

            {/* Listing Type */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Giao dịch</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={listingType}
                  onChange={(e) => {
                    setListingType(e.target.value);
                    setPriceRange(''); // Reset price range since thresholds differ
                  }}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#38BDF8] transition-colors"
                >
                  <option value="">Tất cả GD</option>
                  <option value="Bán">Bán</option>
                  <option value="Cho thuê">Cho thuê</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Property Type */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Loại hình</label>
              <div className="relative">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#38BDF8] transition-colors"
                >
                  <option value="">Tất cả loại</option>
                  <option value="apartment">Căn hộ</option>
                  <option value="villa">Biệt thự</option>
                  <option value="shophouse">Shophouse</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Price Range */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Mức giá</label>
              <div className="relative">
                <BarChart2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#38BDF8] transition-colors"
                >
                  <option value="">Mọi mức giá</option>
                  {listingType !== 'Cho thuê' ? (
                    <>
                      <option value="under-3">Dưới 3 Tỷ</option>
                      <option value="3-7">3 - 7 Tỷ</option>
                      <option value="7-15">7 - 15 Tỷ</option>
                      <option value="over-15">Trên 15 Tỷ</option>
                    </>
                  ) : (
                    <>
                      <option value="under-3">Dưới 15 Tr/th</option>
                      <option value="3-7">15 - 30 Tr/th</option>
                      <option value="7-15">30 - 50 Tr/th</option>
                      <option value="over-15">Trên 50 Tr/th</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phòng ngủ</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#38BDF8] transition-colors"
                >
                  <option value="">Tất cả</option>
                  <option value="1">1 Phòng ngủ</option>
                  <option value="2">2 Phòng ngủ</option>
                  <option value="3">3 Phòng ngủ</option>
                  <option value="4+">4+ Phòng ngủ</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Submit / Navigation */}
            <div className="flex items-end">
              <button 
                onClick={() => {
                  if (!isOnProjectsPage) {
                    navigateTo('projects');
                  }
                }}
                className="w-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] text-[#020617] font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Search size={16} /> Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. CATEGORIES / LOCATIONS
  const renderCategories = () => {
    const locations = [
      { name: 'TP. Hồ Chí Minh', count: '5', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80', filterVal: 'TP.HCM' },
      { name: 'Hà Nội', count: '2', img: 'https://images.unsplash.com/photo-1599708153386-62bf21c499ec?auto=format&fit=crop&w=800&q=80', filterVal: 'Hà Nội' },
      { name: 'Hưng Yên', count: '1', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', filterVal: 'Hưng Yên' },
      { name: 'Đồng Nai', count: '1', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', filterVal: 'Đồng Nai' }
    ];

    return (
      <section className="py-20 bg-[#020617]">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-4">Khám phá theo <span className="text-[#38BDF8]">Khu vực</span></h2>
              <p className="text-slate-400">Các điểm đến đầu tư bất động sản sôi động nhất</p>
            </div>
            <button 
              onClick={() => {
                setRegion('');
                navigateTo('projects');
              }}
              className="flex items-center gap-2 text-[#38BDF8] font-semibold hover:text-white transition-colors"
            >
              Xem tất cả <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {locations.map((loc, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setRegion(loc.filterVal);
                  navigateTo('projects');
                }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 border border-white/5 hover:border-[#38BDF8]/40 transition-colors"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={loc.img} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#38BDF8] transition-colors">{loc.name}</h3>
                  <p className="text-slate-300 text-sm flex items-center gap-2">
                    <Building size={14} className="text-[#818CF8]" /> {loc.count} dự án
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 6. MEGA PROJECTS GRID (Top 6 Featured Items)
  const renderProjectsGrid = () => {
    const featuredProjects = PROJECTS.slice(0, 6);

    return (
      <section className="py-20 bg-[#060B20]">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-6">Dự án <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">Nổi bật</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Khám phá các dự án bất động sản được quan tâm nhất trên thị trường hiện nay.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(p => (
              <div key={p.id} className="group bg-[#020617] border border-white/5 rounded-2xl overflow-hidden hover:border-[#38BDF8]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#020617]/80 backdrop-blur-md text-[#38BDF8] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#38BDF8]/30">
                      {p.status}
                    </span>
                    <span className="bg-[#38BDF8] text-[#020617] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {p.listingType}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <MapPin size={16} className="text-[#818CF8]" /> {p.location}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="text-[#38BDF8] font-bold text-lg">{p.priceDisplay}</div>
                    <button 
                      onClick={() => setSelectedProject(p)}
                      className="text-white hover:text-[#38BDF8] flex items-center gap-1 text-sm font-semibold transition-colors"
                    >
                      Chi tiết <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigateTo('projects')}
              className="border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#020617] px-8 py-3 rounded-full font-bold transition-all duration-300"
            >
              Xem tất cả dự án
            </button>
          </div>
        </div>
      </section>
    );
  };

  // 7. PROJECT STATUS TABS (Interactive tab switcher)
  const renderStatusTabs = () => {
    const statusTabs = ['Sắp ra mắt', 'Đang mở bán', 'Đã bàn giao'];
    const filteredByStatus = PROJECTS.filter(p => p.status === selectedStatusTab).slice(0, 2);

    return (
      <section className="py-20 bg-[#020617] border-y border-white/5">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl font-bold text-white mb-4">Trạng thái <br/><span className="text-[#38BDF8]">Triển khai</span></h2>
              <p className="text-slate-400 mb-6">Theo dõi tiến độ và trạng thái của hàng nghìn dự án trên toàn quốc một cách trực quan và minh bạch.</p>
              <div className="flex flex-col gap-3">
                {statusTabs.map(status => (
                  <button 
                    key={status}
                    onClick={() => setSelectedStatusTab(status)}
                    className={`px-6 py-4 rounded-xl font-bold text-left flex justify-between items-center transition-all border ${
                      selectedStatusTab === status
                        ? 'bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#38BDF8]'
                        : 'bg-white/5 border-white/10 text-white hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/5'
                    }`}
                  >
                    {status} <ChevronRight size={20} />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredByStatus.length > 0 ? (
                filteredByStatus.map(p => (
                   <div 
                      key={p.id} 
                      onClick={() => setSelectedProject(p)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 hover:bg-white/10 transition-colors cursor-pointer"
                   >
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                      <div className="flex flex-col justify-center">
                        <div className="text-xs text-[#38BDF8] font-bold mb-1 uppercase tracking-wider">{p.status}</div>
                        <h4 className="text-lg font-bold text-white leading-tight mb-1">{p.name}</h4>
                        <p className="text-sm text-slate-400">{p.location}</p>
                      </div>
                   </div>
                ))
              ) : (
                <div className="col-span-2 flex items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-slate-500 text-sm">Không có dự án nào thuộc trạng thái này.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 8. ABOUT CORPORATION
  const renderAbout = () => (
    <section className="py-24 bg-[#060B20] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#818CF8]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#38BDF8] text-sm font-bold mb-6">
              <Shield size={16} /> Về PlatformBDS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-6 leading-tight">
              Kiến tạo chuẩn mực <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#818CF8]">sống tinh hoa</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Chúng tôi không chỉ phát triển bất động sản, chúng tôi kiến tạo những cộng đồng tinh hoa, nơi hội tụ những giá trị sống đích thực. Với hơn 15 năm kinh nghiệm, PlatformBDS tự hào là thương hiệu tiên phong trong việc mang đến những sản phẩm vượt thời gian.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#38BDF8] shrink-0" size={24} />
                <span className="text-white font-semibold">Pháp lý minh bạch</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#38BDF8] shrink-0" size={24} />
                <span className="text-white font-semibold">Tiến độ đảm bảo</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#38BDF8] shrink-0" size={24} />
                <span className="text-white font-semibold">Chất lượng quốc tế</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#38BDF8] shrink-0" size={24} />
                <span className="text-white font-semibold">Sinh lời bền vững</span>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('about')}
              className="bg-white text-[#020617] px-8 py-3 rounded-xl font-bold hover:bg-[#38BDF8] hover:text-[#020617] transition-colors"
            >
              Tìm hiểu thêm
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#38BDF8] to-[#818CF8] opacity-30 blur-2xl rounded-3xl"></div>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team" className="relative rounded-3xl object-cover w-full h-[500px] border border-white/10" />
            
            <div className="absolute -bottom-8 -left-8 bg-[#020617] p-6 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] flex items-center justify-center text-white text-2xl font-bold">15+</div>
              <div>
                <div className="text-white font-bold text-lg">Năm Kinh Nghiệm</div>
                <div className="text-slate-400 text-sm">Trong ngành BĐS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 9. KEY METRICS
  const renderMetrics = () => (
    <section className="py-20 bg-[#020617]">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Dự án hoàn thành', value: '50+', icon: Building },
            { label: 'Khách hàng hài lòng', value: '10,000+', icon: Users },
            { label: 'Đối tác chiến lược', value: '100+', icon: Briefcase },
            { label: 'Tỉnh thành phủ sóng', value: '25+', icon: MapPin },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#38BDF8]/10 rounded-full flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
              <div className="text-4xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">{item.value}</div>
              <div className="text-slate-400 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 10. INVESTOR RELATIONS
  const renderInvestors = () => (
    <section className="py-20 bg-[#060B20] border-t border-white/5">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">Quan hệ <span className="text-[#38BDF8]">Nhà đầu tư</span></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Cam kết minh bạch và mang lại giá trị bền vững cho cổ đông. Cập nhật các báo cáo tài chính, thông tin phát hành và tin tức mới nhất dành cho nhà đầu tư.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Báo cáo tài chính Quý 3/2026', date: '15/10/2026', size: '2.4 MB' },
                { title: 'Nghị quyết HĐQT số 124/NQ-HĐQT', date: '01/10/2026', size: '1.1 MB' },
                { title: 'Báo cáo thường niên 2025', date: '30/03/2026', size: '15.8 MB' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#38BDF8]/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <FileText className="text-[#38BDF8] mt-1 shrink-0" size={24} />
                    <div>
                      <h4 className="text-white font-semibold text-sm md:text-base">{doc.title}</h4>
                      <p className="text-slate-500 text-xs mt-1">{doc.date} • PDF • {doc.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Tải xuống tài liệu: ${doc.title}`)}
                    className="text-slate-400 hover:text-[#38BDF8] p-2"
                  >
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => alert('Đang chuyển hướng đến cổng thông tin Nhà đầu tư...')}
              className="mt-8 text-[#38BDF8] font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
              Xem tất cả tài liệu <ArrowRight size={18} />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-[#020617] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-[#38BDF8]">
                <TrendingUp size={120} />
              </div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Hiệu quả Cổ phiếu (Mã: PBDS)</h3>
              <div className="flex items-end gap-4 mb-8 relative z-10">
                <div className="text-5xl font-bold text-[#38BDF8]">84.50</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mb-2">
                  <TrendingUp size={18} /> +2.4%
                </div>
              </div>
              {/* Dummy Chart */}
              <div className="h-40 w-full flex items-end gap-2 relative z-10 border-b border-white/10 pb-2">
                {[40, 45, 42, 50, 65, 55, 70, 85, 75, 90, 84].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#38BDF8]/20 to-[#38BDF8] rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 11. CSR / SUSTAINABILITY
  const renderCSR = () => (
    <section className="py-24 bg-[#020617] relative">
      <div className={`${MAX_W} mx-auto px-4 text-center max-w-4xl relative z-10`}>
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-[#38BDF8] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Leaf className="text-white" size={36} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-['Plus_Jakarta_Sans'] text-white mb-6">Phát triển <span className="text-emerald-400">Bền vững</span></h2>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
          Chúng tôi cam kết xây dựng các dự án xanh, giảm thiểu khí thải carbon, bảo vệ môi trường và đóng góp tích cực vào sự phát triển của cộng đồng địa phương. Mỗi dự án là một hệ sinh thái hài hòa với thiên nhiên.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <span className="text-3xl font-bold text-emerald-400">40%</span>
            <span className="text-sm text-slate-400 font-semibold text-left">Diện tích<br/>mảng xanh</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <span className="text-3xl font-bold text-emerald-400">100%</span>
            <span className="text-sm text-slate-400 font-semibold text-left">Chiếu sáng<br/>Led</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <span className="text-3xl font-bold text-emerald-400">20+</span>
            <span className="text-sm text-slate-400 font-semibold text-left">Dự án đạt<br/>chứng chỉ xanh</span>
          </div>
        </div>
      </div>
    </section>
  );

  // 12. GALLERY
  const renderGallery = () => {
    return (
      <section className="py-20 bg-[#060B20]">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Thư viện <span className="text-[#38BDF8]">Hình ảnh</span></h2>
              <p className="text-slate-400">Không gian sống thực tế từ các dự án tiêu biểu</p>
            </div>
            <button 
              onClick={() => navigateTo('gallery')}
              className="text-white border border-white/20 px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors"
            >
              Xem toàn bộ thư viện
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[500px]">
            <div 
              onClick={() => setSelectedGalleryImg(GALLERY_IMAGES[0].url)}
              className="col-span-2 row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={GALLERY_IMAGES[0].url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white w-12 h-12" />
              </div>
            </div>
            {GALLERY_IMAGES.slice(1, 5).map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedGalleryImg(img.url)}
                className="relative group rounded-2xl overflow-hidden cursor-pointer h-40 md:h-auto"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 13. TESTIMONIALS
  const renderTestimonials = () => (
    <section className="py-24 bg-[#020617] border-y border-white/5 relative overflow-hidden">
      <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tiếng nói <span className="text-[#38BDF8]">Khách hàng</span></h2>
          <p className="text-slate-400">Sự hài lòng của khách hàng là thước đo thành công của chúng tôi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 text-[#38BDF8] opacity-20 w-16 h-16" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#F59E0B" className="text-[#F59E0B]" />)}
              </div>
              <p className="text-slate-300 text-lg mb-8 relative z-10 italic">
                "Một trải nghiệm mua nhà tuyệt vời. Đội ngũ tư vấn chuyên nghiệp, thủ tục nhanh gọn và đặc biệt là chất lượng bàn giao vượt ngoài mong đợi của gia đình tôi."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-[#38BDF8] overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Nguyễn Văn A</h4>
                  <p className="text-slate-500 text-sm">Cư dân Vinhomes Central</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 14. LATEST NEWS
  const renderNews = () => {
    const featuredNews = NEWS_ARTICLES[0];
    const latestNews = NEWS_ARTICLES.slice(1, 4);

    return (
      <section className="py-24 bg-[#060B20]">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Tin tức & <span className="text-[#38BDF8]">Thị trường</span></h2>
              <p className="text-slate-400">Cập nhật nhanh nhất biến động thị trường bất động sản</p>
            </div>
            <button 
              onClick={() => navigateTo('news')}
              className="text-[#38BDF8] font-bold hover:text-white flex items-center gap-2 transition-colors"
            >
              Tất cả tin tức <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div 
              onClick={() => setSelectedArticle(featuredNews)}
              className="lg:col-span-2 relative group rounded-3xl overflow-hidden cursor-pointer h-[500px]"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={featuredNews.img} alt="News" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <span className="bg-[#38BDF8] text-[#020617] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">{featuredNews.category}</span>
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#38BDF8] transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-slate-300 line-clamp-2 mb-4 text-lg">
                  {featuredNews.summary}
                </p>
                <div className="text-slate-400 text-sm flex items-center gap-4">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {featuredNews.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {featuredNews.readTime}</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {latestNews.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => setSelectedArticle(n)}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt="News thumb" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#38BDF8] text-xs font-bold uppercase mb-2">{n.category}</span>
                    <h4 className="text-white font-bold leading-snug group-hover:text-[#38BDF8] transition-colors mb-2 line-clamp-2">
                      {n.title}
                    </h4>
                    <div className="text-slate-500 text-xs flex items-center gap-2">
                      <Calendar size={12}/> {n.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 15. FAQ
  const renderFAQ = () => {
    const faqs = [
      { q: "Thủ tục mua bán căn hộ cần những giấy tờ gì?", a: "Người mua cần chuẩn bị: CMND/CCCD, Sổ hộ khẩu, Giấy xác nhận tình trạng hôn nhân (nếu có). Quá trình ký kết hợp đồng mua bán sẽ được thực hiện trực tiếp tại văn phòng chủ đầu tư hoặc phòng công chứng." },
      { q: "Ngân hàng hỗ trợ vay tối đa bao nhiêu % giá trị tài sản?", a: "Hiện tại, các ngân hàng đối tác hỗ trợ vay lên đến 70% giá trị căn hộ với thời hạn vay tối đa 35 năm. Ân hạn nợ gốc và miễn lãi suất trong 24 tháng đầu tiên." },
      { q: "Tiến độ thanh toán chuẩn như thế nào?", a: "Tiến độ thanh toán được chia thành 10 đợt, mỗi đợt cách nhau từ 2-3 tháng với tỷ lệ thanh toán 5-10% tùy theo tiến độ xây dựng thực tế của dự án." },
      { q: "Thời gian nhận sổ hồng sau khi bàn giao nhà là bao lâu?", a: "Theo quy định, chủ đầu tư sẽ tiến hành làm thủ tục cấp Giấy chứng nhận quyền sở hữu nhà ở (Sổ hồng) cho cư dân trong vòng 3-6 tháng kể từ thời điểm bàn giao nhà và nhận đủ 100% giá trị hợp đồng." }
    ];

    return (
      <section className="py-24 bg-[#020617]">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Câu hỏi <span className="text-[#38BDF8]">Thường gặp</span></h2>
              <p className="text-slate-400">Giải đáp các thắc mắc phổ biến về quy trình mua bán và đầu tư bất động sản.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFAQIndex(openFAQIndex === i ? null : i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-white text-lg pr-8">{faq.q}</span>
                    <ChevronDown className={`text-[#38BDF8] shrink-0 transition-transform duration-300 ${openFAQIndex === i ? 'rotate-180' : ''}`} size={20} />
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${openFAQIndex === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 16. CONTACT CTA
  const renderCTA = () => (
    <section className="py-12 bg-[#020617]">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-gradient-to-br from-[#0C4A6E] to-[#020617] rounded-3xl p-8 md:p-16 border border-[#38BDF8]/20 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Sẵn sàng sở hữu <br />
                <span className="text-[#38BDF8]">Bất động sản mơ ước?</span>
              </h2>
              <p className="text-slate-300 text-lg">
                Đăng ký ngay để nhận tư vấn chi tiết về các dự án tiềm năng và chính sách bán hàng ưu đãi nhất trong tháng này.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button 
                onClick={() => navigateTo('contact')}
                className="w-full md:w-auto bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#020617] px-8 py-5 rounded-2xl font-black text-lg transition-all shadow-[0_0_40px_rgba(56,189,248,0.4)] flex items-center justify-center gap-3"
              >
                <Phone size={24} /> Gọi Ngay: 1800 9999
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 17. FOOTER
  const renderFooter = () => (
    <footer className="bg-[#020617] border-t border-white/10 pt-20 pb-10 text-slate-400">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] rounded-xl flex items-center justify-center">
                <Building className="text-[#020617]" size={24} />
              </div>
              <span className="text-2xl font-bold text-white">
                Platform<span className="text-[#38BDF8]">BDS</span>
              </span>
            </div>
            <p className="mb-6 leading-relaxed">Nền tảng giao dịch bất động sản cao cấp hàng đầu Việt Nam. Nơi hội tụ những dự án tinh hoa và cơ hội đầu tư sinh lời bền vững.</p>
            <div className="flex gap-4">
              <button onClick={() => alert('Mở Facebook')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#38BDF8] hover:text-[#020617] transition-colors cursor-pointer"><Facebook size={18}/></button>
              <button onClick={() => alert('Mở Twitter')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#38BDF8] hover:text-[#020617] transition-colors cursor-pointer"><Twitter size={18}/></button>
              <button onClick={() => alert('Mở LinkedIn')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#38BDF8] hover:text-[#020617] transition-colors cursor-pointer"><Linkedin size={18}/></button>
              <button onClick={() => alert('Mở Instagram')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#38BDF8] hover:text-[#020617] transition-colors cursor-pointer"><Instagram size={18}/></button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {['Về chúng tôi', 'Danh sách dự án', 'Tin tức & Thị trường', 'Tuyển dụng', 'Liên hệ'].map((item, i) => {
                const ids = ['about', 'projects', 'news', 'about', 'contact'];
                return (
                  <li key={i}>
                    <button 
                      onClick={() => navigateTo(ids[i])}
                      className="hover:text-[#38BDF8] transition-colors flex items-center gap-2 text-left"
                    >
                      <ChevronRight size={14}/> {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Dự án Nổi bật</h4>
            <ul className="space-y-3">
              {PROJECTS.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button 
                    onClick={() => {
                      setSelectedProject(p);
                    }}
                    className="hover:text-[#38BDF8] transition-colors flex items-center gap-2 text-left"
                  >
                    <ChevronRight size={14}/> {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-[#38BDF8] shrink-0" size={20}/>
                <span>Tòa nhà Bitexco, 2 Hải Triều, Q.1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-[#38BDF8] shrink-0" size={20}/>
                <span>1800 9999 (Miễn phí cước)</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-[#38BDF8] shrink-0" size={20}/>
                <span>contact@platformbds.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2026 PlatformBDS. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">Điều khoản sử dụng</button>
            <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // Sub-pages renderers
  const renderProjectsPage = () => {
    const filtered = getFilteredProjects();

    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h1 className="text-4xl font-bold text-white">Danh sách <span className="text-[#38BDF8]">Dự án</span></h1>
            <div className="text-slate-400 text-sm">
              Tìm thấy <span className="text-[#38BDF8] font-bold">{filtered.length}</span> dự án phù hợp
            </div>
          </div>
          
          {renderAdvancedSearch(true)}
          
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {filtered.map(p => (
                <div key={p.id} className="group bg-[#060B20] border border-white/5 rounded-2xl overflow-hidden hover:border-[#38BDF8]/50 transition-all hover:shadow-[0_10px_35px_rgba(56,189,248,0.05)]">
                  <div className="relative h-56 overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#020617]/90 text-[#38BDF8] px-2.5 py-0.5 rounded-full text-xs font-bold border border-[#38BDF8]/20">
                        {p.status}
                      </span>
                      <span className="bg-[#38BDF8] text-[#020617] px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {p.listingType}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#818CF8] font-bold uppercase tracking-wider mb-2">
                      {p.type === 'apartment' ? 'Căn hộ' : p.type === 'villa' ? 'Biệt thự' : 'Shophouse'} • {p.bedrooms} PN • {p.size}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">{p.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex items-center gap-1.5"><MapPin size={14} /> {p.location}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="text-[#38BDF8] font-black text-lg">{p.priceDisplay}</div>
                      <button 
                        onClick={() => setSelectedProject(p)}
                        className="bg-white/5 border border-white/10 text-white hover:bg-[#38BDF8] hover:text-[#020617] px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl mt-8">
              <Building className="mx-auto text-slate-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy dự án</h3>
              <p className="text-slate-400">Vui lòng thay đổi từ khóa hoặc bộ lọc để tìm kiếm lại.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setListingType('');
                  setPropertyType('');
                  setPriceRange('');
                  setBedrooms('');
                  setRegion('');
                }}
                className="mt-6 bg-[#38BDF8] text-[#020617] font-bold px-6 py-2.5 rounded-xl hover:bg-[#0EA5E9] transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAboutPage = () => {
    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20">
        {/* Intro */}
        {renderAbout()}

        {/* Core Values Section */}
        <section className="py-20 bg-[#020617] border-t border-white/5">
          <div className={`${MAX_W} mx-auto px-4`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Giá trị <span className="text-[#38BDF8]">Cốt lõi</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">4 trụ cột làm nên sự vững mạnh và uy tín lâu dài của PlatformBDS trên thị trường bất động sản.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {coreValues.map((value, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#38BDF8]/50 transition-all group">
                  <div className="w-12 h-12 bg-[#38BDF8]/10 text-[#38BDF8] rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Milestones */}
        <section className="py-20 bg-[#060B20] border-y border-white/5">
          <div className={`${MAX_W} mx-auto px-4`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Hành trình <span className="text-[#38BDF8]">Phát triển</span></h2>
              <p className="text-slate-400">Những dấu mốc lịch sử khẳng định vị thế dẫn đầu</p>
            </div>
            <div className="relative border-l border-white/10 ml-4 md:ml-32 py-4 space-y-12">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#38BDF8] rounded-full border-4 border-[#020617] group-hover:scale-150 transition-transform"></div>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <span className="text-2xl font-black text-[#38BDF8] font-['Plus_Jakarta_Sans'] tracking-wider leading-none shrink-0 w-20">{m.year}</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">{m.title}</h4>
                      <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-[#020617]">
          <div className={`${MAX_W} mx-auto px-4`}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Ban <span className="text-[#38BDF8]">Lãnh đạo</span></h2>
              <p className="text-slate-400">Đội ngũ dẫn dắt PlatformBDS hướng tới những thành công vượt trội</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#818CF8]/50 transition-all duration-300">
                  <div className="h-80 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.avatar} alt={leader.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-1">{leader.name}</h4>
                    <p className="text-[#38BDF8] text-sm mb-4 font-semibold">{leader.role}</p>
                    <p className="text-slate-400 text-sm italic leading-relaxed border-t border-white/5 pt-4">"{leader.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {renderMetrics()}
        {renderCSR()}
      </div>
    );
  };

  const renderGalleryPage = () => {
    const filteredImages = selectedGalleryTab === 'Tất cả' 
      ? GALLERY_IMAGES 
      : GALLERY_IMAGES.filter(img => img.tab === selectedGalleryTab);

    const tabs = ['Tất cả', 'Căn hộ', 'Biệt thự', 'Nội thất', 'Tiện ích'];

    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Thư viện <span className="text-[#38BDF8]">Hình ảnh</span></h1>
            <p className="text-slate-400">Ngắm nhìn không gian sống tinh tế từ các dự án tiêu biểu của chúng tôi</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedGalleryTab === tab
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#020617] shadow-lg shadow-sky-500/20'
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="columns-1 md:columns-3 gap-4 space-y-4">
            {filteredImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedGalleryImg(img.url)}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#38BDF8]/40 transition-colors"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt={img.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider mb-2 block">{img.tab}</span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {img.title} <Maximize2 size={16} className="text-[#818CF8]" />
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => {
    const filteredNews = getFilteredNews();
    const featuredNews = NEWS_ARTICLES[0];

    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white">Tin tức & <span className="text-[#38BDF8]">Thị trường</span></h1>
              <p className="text-slate-400 mt-2">Cập nhật nhanh nhất biến động thị trường bất động sản</p>
            </div>
            
            {/* Search News Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                placeholder="Tìm tin tức..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#38BDF8] transition-colors text-sm" 
              />
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Highlight main article if no active search and it exists in filtered */}
              {(!searchNewsQuery && filteredNews.some(n => n.id === featuredNews.id)) ? (
                <>
                  <div 
                    onClick={() => setSelectedArticle(featuredNews)}
                    className="lg:col-span-2 relative group rounded-3xl overflow-hidden cursor-pointer h-[500px]"
                  >
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={featuredNews.img} alt={featuredNews.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8">
                      <span className="bg-[#38BDF8] text-[#020617] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">{featuredNews.category}</span>
                      <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#38BDF8] transition-colors">
                        {featuredNews.title}
                      </h3>
                      <p className="text-slate-300 line-clamp-2 mb-4 text-lg">
                        {featuredNews.summary}
                      </p>
                      <div className="text-slate-400 text-sm flex items-center gap-4">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {featuredNews.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {featuredNews.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {filteredNews.filter(n => n.id !== featuredNews.id).map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => setSelectedArticle(n)}
                        className="flex gap-4 group cursor-pointer p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
                      >
                        <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0">
                          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[#38BDF8] text-xs font-bold uppercase mb-1.5">{n.category}</span>
                          <h4 className="text-white font-bold leading-snug group-hover:text-[#38BDF8] transition-colors mb-2 line-clamp-2 text-sm md:text-base">
                            {n.title}
                          </h4>
                          <div className="text-slate-500 text-xs flex items-center gap-2">
                            <Calendar size={12}/> {n.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredNews.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => setSelectedArticle(n)}
                      className="group bg-[#060B20] border border-white/5 rounded-2xl overflow-hidden hover:border-[#38BDF8]/50 transition-all cursor-pointer flex flex-col h-full"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute top-4 left-4 bg-[#38BDF8] text-[#020617] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">{n.category}</span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {n.date}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> {n.readTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-2 mb-3">{n.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-4">{n.summary}</p>
                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[#38BDF8] text-xs font-bold uppercase">
                          <span>Đọc tiếp</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
              <FileText className="mx-auto text-slate-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy tin tức</h3>
              <p className="text-slate-400">Vui lòng thay đổi từ khóa tìm kiếm.</p>
              <button 
                onClick={() => setSearchNewsQuery('')}
                className="mt-6 bg-[#38BDF8] text-[#020617] font-bold px-6 py-2.5 rounded-xl hover:bg-[#0EA5E9] transition-colors"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContactPage = () => {
    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (contactForm.name.trim() && contactForm.email.trim() && contactForm.phone.trim()) {
        setContactSubmitted(true);
      }
    };

    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20">
        <div className={`${MAX_W} mx-auto px-4`}>
          <h1 className="text-4xl font-bold text-white mb-12">Liên hệ <span className="text-[#38BDF8]">Với chúng tôi</span></h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {contactSubmitted ? (
              <div className="bg-[#060B20] p-8 md:p-12 rounded-3xl border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Gửi yêu cầu thành công!</h3>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed mb-8">
                  Cảm ơn bạn đã quan tâm đến dự án của PlatformBDS. Đội ngũ chuyên viên tư vấn của chúng tôi sẽ liên hệ lại trong vòng 15-30 phút qua số điện thoại hoặc email đã cung cấp.
                </p>
                <button 
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactForm({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#020617] font-bold px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
                >
                  Gửi tin nhắn mới
                </button>
              </div>
            ) : (
              <div className="bg-[#060B20] p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Gửi tin nhắn</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Họ và tên *</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Họ và tên của bạn" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#38BDF8] outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Email liên hệ" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#38BDF8] outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Số điện thoại của bạn" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#38BDF8] outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nội dung tư vấn</label>
                    <textarea 
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Bạn đang quan tâm đến dự án nào? Hãy viết yêu cầu tại đây..." 
                      rows={4} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#38BDF8] outline-none transition-colors"
                    ></textarea>
                  </div>
                    <button type="submit" className="w-full bg-[#38BDF8] text-[#020617] font-bold py-4 rounded-xl hover:bg-[#0EA5E9] transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer">Gửi liên hệ</button>
                </form>
              </div>
            )}
            
            <div className="flex flex-col justify-between">
              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Trụ sở chính</h4>
                    <p className="text-slate-400 text-sm">Tòa nhà Bitexco Financial Tower, 2 Hải Triều, Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Hotline & CSKH</h4>
                    <p className="text-slate-400 text-sm">1800 9999 (Miễn phí cước cuộc gọi, hoạt động 24/7)</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Hòm thư điện tử</h4>
                    <p className="text-slate-400 text-sm">contact@platformbds.vn — info@platformbds.vn</p>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map */}
              <div className="w-full h-80 bg-[#060B20] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl flex flex-col">
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs z-10">
                  <div className="flex items-center gap-2 text-white font-bold truncate">
                    <MapPin size={14} className="text-[#38BDF8] shrink-0" />
                    <span className="truncate">Bitexco Financial Tower — Quận 1, TP.HCM</span>
                  </div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold flex items-center gap-1 transition-transform hover:scale-105 shrink-0"
                  >
                    Mở Google Maps <ChevronRight size={12} />
                  </a>
                </div>
                <div className="flex-1 w-full h-full relative">
                  <iframe
                    title="Google Map Bitexco"
                    src="https://maps.google.com/maps?q=Bitexco+Financial+Tower,+2+H%E1%BA%A3i+Tri%E1%BB%81u,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modals & Popups rendering
  const renderProjectDetailModal = () => {
    if (!selectedProject) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-[#060B20] border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all z-10"
          >
            <X size={20} />
          </button>
          
          <div className="h-72 overflow-hidden relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B20] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex gap-2">
              <span className="bg-[#38BDF8] text-[#020617] px-3.5 py-1 rounded-full text-xs font-black uppercase">
                {selectedProject.listingType}
              </span>
              <span className="bg-white/15 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-xs font-bold border border-white/20">
                {selectedProject.status}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="text-xs text-[#818CF8] font-bold uppercase tracking-widest mb-2">
              {selectedProject.type === 'apartment' ? 'Căn hộ' : selectedProject.type === 'villa' ? 'Biệt thự' : 'Shophouse'} • {selectedProject.bedrooms} phòng ngủ • {selectedProject.size}
            </div>
            <h2 className="text-3xl font-black text-white mb-4">{selectedProject.name}</h2>
            
            <div className="flex items-center gap-2 text-slate-300 text-sm mb-6 border-b border-white/5 pb-4">
              <MapPin size={18} className="text-[#38BDF8]" /> {selectedProject.location}
            </div>

            <p className="text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
              {selectedProject.desc}
            </p>

            <div className="mb-6">
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Thông số chi tiết</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.specs?.map((spec: string, idx: number) => (
                  <div key={idx} className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-300 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38BDF8]" /> {spec}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
              <div>
                <span className="text-slate-500 text-xs block uppercase font-bold tracking-wider mb-1">Mức giá giao dịch</span>
                <span className="text-[#38BDF8] text-2xl font-black">{selectedProject.priceDisplay}</span>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setContactForm({
                      ...contactForm,
                      message: `Tôi muốn nhận thông tin tư vấn và báo giá chi tiết cho dự án: ${selectedProject.name}.`
                    });
                    navigateTo('contact');
                  }}
                  className="flex-grow md:flex-grow-0 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#020617] font-bold px-6 py-3 rounded-xl text-center text-sm transition-all"
                >
                  Liên hệ tư vấn
                </button>
                <button 
                  onClick={() => alert(`Đang tải tài liệu giới thiệu (Brochure) cho dự án: ${selectedProject.name}`)}
                  className="flex-grow md:flex-grow-0 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download size={16} /> Tài liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderArticleDetailModal = () => {
    if (!selectedArticle) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-[#060B20] border border-white/10 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all z-10"
          >
            <X size={20} />
          </button>
          
          <div className="h-64 overflow-hidden relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B20] via-transparent to-transparent"></div>
            <span className="absolute bottom-6 left-6 bg-[#38BDF8] text-[#020617] px-3.5 py-1 rounded-full text-xs font-black uppercase">
              {selectedArticle.category}
            </span>
          </div>

          <div className="p-8">
            <div className="text-slate-400 text-xs flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1"><Calendar size={14}/> {selectedArticle.date}</span>
              <span className="flex items-center gap-1"><Clock size={14}/> {selectedArticle.readTime}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-snug">{selectedArticle.title}</h2>
            
            <div className="text-slate-300 leading-relaxed space-y-4 text-sm md:text-base border-t border-white/5 pt-6">
              <p className="font-bold text-white text-lg">
                {selectedArticle.summary}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <p>
                Thực tế cho thấy, dòng tiền nhàn rỗi đang có xu hướng dịch chuyển mạnh mẽ vào những phân khúc đáp ứng được cả hai tiêu chí: an toàn về pháp lý và có biên độ sinh lời ổn định từ việc cho thuê hoặc gia tăng giá trị theo tiến độ cơ sở hạ tầng.
              </p>
            </div>
            
            <div className="flex justify-end pt-8 border-t border-white/5 mt-8">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGalleryLightbox = () => {
    if (!selectedGalleryImg) return null;
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
        onClick={() => setSelectedGalleryImg(null)}
      >
        <button 
          className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <X size={24} />
        </button>
        <div className="relative max-w-5xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Lightbox Preview" className="max-w-full max-h-[80vh] rounded-xl object-contain border border-white/10 shadow-2xl" />
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="font-['Inter'] min-h-screen bg-[#020617] text-white">
      {renderTickerBar()}
      {renderHeader()}
      
      <main>
        {currentPage === 'home' && (
          <>
            {renderHero()}
            {renderAdvancedSearch(false)}
            {renderCategories()}
            {renderProjectsGrid()}
            {renderStatusTabs()}
            {renderAbout()}
            {renderMetrics()}
            {renderInvestors()}
            {renderCSR()}
            {renderGallery()}
            {renderTestimonials()}
            {renderNews()}
            {renderFAQ()}
            {renderCTA()}
          </>
        )}
        {['projects', 'du-an', 'san-pham', 'bat-dong-san'].includes(currentPage) && renderProjectsPage()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(currentPage) && renderAboutPage()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(currentPage) && renderGalleryPage()}
        {['news', 'tin-tuc', 'bai-viet'].includes(currentPage) && renderNewsPage()}
        {['contact', 'lien-he', 'tu-van'].includes(currentPage) && renderContactPage()}
        {!['home', 'projects', 'du-an', 'san-pham', 'bat-dong-san', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(currentPage) && renderHero()}
      </main>

      {renderFooter()}

      {/* Lightboxes and Detail Modals */}
      {renderProjectDetailModal()}
      {renderArticleDetailModal()}
      {renderGalleryLightbox()}
    </div>
  );
}

