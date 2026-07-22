import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Search, MapPin, Calendar, 
  ChevronRight, ChevronLeft, Play, Star, Phone, 
  Mail, Coffee, Droplet, ArrowRight, 
  Instagram, Facebook, Twitter, Linkedin, 
  Quote, Plus, Minus, Umbrella, 
  Navigation, Shield, Compass, Award
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, any> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'Amanoi Resort',
    type: 'bungalow',
    typeName: 'Bungalow',
    location: 'Ninh Thuận',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 15 Tỷ',
    priceVal: 15,
    size: '280 m²',
    beds: 2,
    baths: 2,
    description: 'Khu nghỉ dưỡng biệt lập ẩn mình trong Vườn Quốc gia Núi Chúa, hướng ra Vịnh Vĩnh Hy xanh biếc. Amanoi mang đến không gian thiền định tĩnh lặng, kết hợp hoàn hảo giữa thiên nhiên hoang sơ và nét tinh tế của kiến trúc Việt Nam truyền thống. Đây là chốn dừng chân hoàn hảo để tái tạo thân - tâm - trí.',
    specs: ['Hồ bơi vô cực', 'Spa trị liệu riêng', 'View vịnh biển', 'Sân tập Yoga ngoài trời'],
    rating: 4.9
  },
  {
    id: '2',
    name: 'Regent Phú Quốc',
    type: 'beach-villa',
    typeName: 'Biệt thự biển',
    location: 'Phú Quốc',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 20 Tỷ',
    priceVal: 20,
    size: '450 m²',
    beds: 3,
    baths: 4,
    description: 'Thiên đường nghỉ dưỡng riêng tư cao cấp bậc nhất tại Bãi Trường. Regent Phú Quốc định nghĩa lại sự sang trọng với hồ bơi vô cực riêng trên cao ngắm hoàng hôn, quản gia phục vụ 24/7 và hệ thống tiện ích đẳng cấp quốc tế.',
    specs: ['Hồ bơi sườn đồi', 'View biển trực diện', 'Quản gia 24/7', 'Hệ thống Smart Home'],
    rating: 4.8
  },
  {
    id: '3',
    name: 'InterContinental Peninsula Resort',
    type: 'beach-villa',
    typeName: 'Biệt thự biển',
    location: 'Đà Nẵng',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 25 Tỷ',
    priceVal: 25,
    size: '600 m²',
    beds: 4,
    baths: 5,
    description: 'Tác phẩm nghệ thuật đỉnh cao của kiến trúc sư Bill Bensley tọa lạc tại bán đảo Sơn Trà hoang sơ. Khu nghỉ dưỡng trải dài qua 4 tầng: Thiên đường (Heaven), Bầu trời (Sky), Mặt đất (Earth) và Biển cả (Sea), mang đậm tính biểu tượng.',
    specs: ['Hệ thống cáp treo riêng', 'Bãi biển riêng tư', 'Nhà hàng đạt sao Michelin', 'Nội thất làm thủ công'],
    rating: 5.0
  },
  {
    id: '4',
    name: 'Six Senses Côn Đảo',
    type: 'bungalow',
    typeName: 'Bungalow',
    location: 'Côn Đảo',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 30 Tỷ',
    priceVal: 30,
    size: '350 m²',
    beds: 3,
    baths: 3,
    description: 'Nổi bật với thiết kế gỗ mộc mạc tinh tế, thân thiện với môi trường dọc theo bãi cát trắng mịn Côn Đảo. Six Senses kết hợp hài hòa triết lý sống xanh và sự sang trọng tối giản, tạo ra thiên đường ẩn dật hoàn mỹ.',
    specs: ['Chất liệu sinh thái cao cấp', 'Rạp chiếu phim ngoài trời', 'Hồ bơi riêng', 'Xe điện đưa đón'],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Banyan Tree Lăng Cô',
    type: 'bungalow',
    typeName: 'Bungalow',
    location: 'Lăng Cô',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 18 Tỷ',
    priceVal: 18,
    size: '200 m²',
    beds: 2,
    baths: 2,
    description: 'Căn biệt thự tựa sơn hướng thủy tại vịnh Lăng Cô thơ mộng, lấy cảm hứng từ di sản văn hóa và kiến trúc triều đình Việt Nam xưa. Nơi đây mang đến sự kết hợp hoàn hảo giữa bản sắc truyền thống và tiện nghi hiện đại.',
    specs: ['Hồ bơi sườn đồi', 'Sân golf 18 hố', 'Bể sục jacuzzi ngoài trời', 'Hiên tắm nắng riêng'],
    rating: 4.7
  },
  {
    id: '6',
    name: 'Hyatt Regency Hồ Tràm',
    type: 'condotel',
    typeName: 'Condotel',
    location: 'Hồ Tràm',
    img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 22 Tỷ',
    priceVal: 22,
    size: '85 m²',
    beds: 1,
    baths: 1,
    description: 'Căn condotel đẳng cấp quốc tế tọa lạc giữa rừng tràm tự nhiên và dải bờ biển Hồ Tràm thanh bình. Với thiết kế mở đón ánh sáng tự nhiên và gió biển, dự án mang lại giải pháp nghỉ dưỡng kết hợp đầu tư sinh lời bền vững.',
    specs: ['Công viên nước nội khu', 'Nhà hàng ẩm thực biển', 'Khu spa phục hồi', 'Trung tâm hội nghị cao cấp'],
    rating: 4.6
  },
  {
    id: '7',
    name: 'Premier Village Phú Quốc',
    type: 'beach-villa',
    typeName: 'Biệt thự biển',
    location: 'Phú Quốc',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    price: 'Từ 35 Tỷ',
    priceVal: 35,
    size: '520 m²',
    beds: 4,
    baths: 4,
    description: 'Nằm tại Mũi Ông Đội - dải đất hai mặt biển độc đáo tại Phú Quốc. Đây là dự án duy nhất cho phép du khách ngắm nhìn cả bình minh và hoàng hôn tại cùng một vị trí, mang lại trải nghiệm nghỉ dưỡng độc bản vô song.',
    specs: ['Hồ bơi ghềnh đá', 'Spa trên đồi', 'Cầu cảng neo đậu du thuyền', 'Tầm nhìn 2 mặt biển'],
    rating: 5.0
  }
];

const MOCK_NEWS = [
  {
    id: 1,
    title: 'Xu hướng đầu tư bất động sản nghỉ dưỡng nửa cuối năm 2026',
    date: '15 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Khám phá những cơ hội và thách thức trong thị trường bất động sản nghỉ dưỡng hiện nay khi dòng vốn ngoại đổ về dồi dào.',
    content: 'Thị trường bất động sản nghỉ dưỡng đang ghi nhận những tín hiệu phục hồi tích cực trong nửa cuối năm 2026. Sự dịch chuyển dòng vốn từ các phân khúc truyền thống sang sản phẩm nghỉ dưỡng cao cấp ven biển đang trở thành xu hướng chủ đạo. Các chuyên gia nhận định, các dự án có tính pháp lý rõ ràng, thương hiệu quản lý vận hành quốc tế danh tiếng sẽ tiếp tục dẫn dắt thị trường.',
    author: 'Nguyễn Văn Nam'
  },
  {
    id: 2,
    title: 'Đặc quyền chăm sóc sức khỏe toàn diện tại Resort Paradise',
    date: '10 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Trải nghiệm những liệu trình wellness cao cấp kết hợp không gian thiên nhiên chữa lành.',
    content: 'Tại Resort Paradise, chúng tôi không chỉ cung cấp không gian lưu trú thượng lưu mà còn mang đến giải pháp chăm sóc sức khỏe toàn diện. Với sự kết hợp của y học cổ truyền Đông phương và công nghệ hiện đại Tây phương, các liệu trình spa trị liệu tại đây được thiết kế cá nhân hóa cho từng khách hàng, giúp tái tạo năng lượng thể chất và tinh thần hiệu quả nhất.',
    author: 'Lê Thu Thảo'
  },
  {
    id: 3,
    title: 'Nghệ thuật ẩm thực tại nhà hàng ven biển độc quyền',
    date: '05 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Hành trình đánh thức vị giác với những món ăn được sáng tạo bởi các đầu bếp hàng đầu.',
    content: 'Nhà hàng The Horizon bên bờ biển mang đến cho thực khách một hành trình ẩm thực tinh tế và đẳng cấp. Thực đơn được xây dựng bởi bếp trưởng đạt sao Michelin, sử dụng nguyên liệu hải sản tươi ngon nhất vùng biển địa phương kết hợp cùng các gia vị thượng hạng nhập khẩu. Tiếng sóng biển rì rào hòa cùng hương vị đậm đà tạo nên trải nghiệm ẩm thực khó quên.',
    author: 'Trần Minh Hải'
  },
  {
    id: 4,
    title: 'Amanoi Resort nhận giải thưởng Khu Nghỉ Dưỡng Hàng Đầu Châu Á 2026',
    date: '01 Th07, 2026',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sự ghi nhận xứng đáng cho những nỗ lực kiến tạo không gian nghỉ dưỡng đỉnh cao.',
    content: 'Vừa qua tại lễ trao giải World Travel Awards 2026, Amanoi Resort đã vinh dự được xướng tên ở hạng mục "Khu nghỉ dưỡng hàng đầu châu Á". Đây là phần thưởng xứng đáng cho chất lượng dịch vụ chuẩn 6 sao cùng định hướng phát triển bảo tồn thiên nhiên hoang sơ của dự án.',
    author: 'Phạm Thanh Sơn'
  },
  {
    id: 5,
    title: 'Bất động sản biển Phú Quốc tăng nhiệt nhờ quy hoạch mới',
    date: '28 Th06, 2026',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Những điều chỉnh trong quy hoạch chung đảo ngọc mở đường cho làn sóng đầu tư lớn.',
    content: 'Chính phủ vừa phê duyệt quy hoạch chung đảo ngọc Phú Quốc đến năm 2040, tập trung phát triển đô thị du lịch sinh thái thông minh. Thông tin này lập tức khiến phân khúc bất động sản nghỉ dưỡng tại đây tăng nhiệt, đặc biệt là các tổ hợp biệt thự biển kết hợp chăm sóc sức khỏe.',
    author: 'Lâm Hoàng Phong'
  },
  {
    id: 6,
    title: 'Kiến trúc xanh và tính bền vững trong thiết kế Resort hiện đại',
    date: '22 Th06, 2026',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Làm thế nào để xây dựng các công trình sang trọng nhưng vẫn bảo tồn sinh thái xung quanh.',
    content: 'Xây dựng xanh không còn là xu hướng nhất thời mà đã trở thành tiêu chuẩn bắt buộc. Tại các dự án mới của Resort Paradise, việc tối ưu hóa năng lượng tự nhiên, sử dụng vật liệu địa phương tái chế và bảo tồn thảm thực vật bản địa được đặt lên hàng đầu, cam kết mang đến những công trình nghỉ dưỡng bền vững lâu dài.',
    author: 'Đỗ Hoàng Anh'
  }
];

const MOCK_GALLERY = [
  {
    id: 'g1',
    category: 'exterior',
    categoryName: 'Ngoại thất',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    title: 'Hồ bơi vô cực ngắm hoàng hôn'
  },
  {
    id: 'g2',
    category: 'exterior',
    categoryName: 'Ngoại thất',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    title: 'Toàn cảnh khu biệt thự từ trên cao'
  },
  {
    id: 'g3',
    category: 'interior',
    categoryName: 'Nội thất',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Phòng khách thiết kế mở sang trọng'
  },
  {
    id: 'g4',
    category: 'interior',
    categoryName: 'Nội thất',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    title: 'Phòng ngủ Master view biển trực diện'
  },
  {
    id: 'g5',
    category: 'amenities',
    categoryName: 'Tiện ích',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    title: 'Spa trị liệu với thảo dược tự nhiên'
  },
  {
    id: 'g6',
    category: 'amenities',
    categoryName: 'Tiện ích',
    img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=1200&q=80',
    title: 'Khu ẩm thực biển cao cấp'
  },
  {
    id: 'g7',
    category: 'exterior',
    categoryName: 'Ngoại thất',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    title: 'Mặt trước biệt thự hướng biển'
  },
  {
    id: 'g8',
    category: 'amenities',
    categoryName: 'Tiện ích',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Bãi biển cát trắng riêng tư'
  },
  {
    id: 'g9',
    category: 'interior',
    categoryName: 'Nội thất',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    title: 'Hầm rượu vang và phòng thử xì-gà'
  }
];

export default function ResortTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
  // Dynamic Posts Override & Shadowing Variable via globalThis reference
  const activePosts = posts && posts.length > 0
    ? posts.map((p, index) => ({
        id: p.id || String(index),
        title: p.title,
        category: p.category?.name || 'Bất Động Sản',
        cat: p.category?.name || 'Bất Động Sản',
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : '12/07/2026',
        author: p.author?.fullName || 'Chuyên viên BĐS',
        excerpt: p.summary || p.description || 'Tóm tắt bài viết...',
        summary: p.summary || p.description || 'Tóm tắt bài viết...',
        description: p.content || p.description || 'Nội dung chi tiết bài viết...',
        content: p.content || p.description || 'Nội dung chi tiết bài viết...',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        readTime: '5 phút đọc'
      }))
    : ((globalThis as any).__mock_news_ref || []);

  // Shadowing variables
  const MOCK_NEWS: any = activePosts;

  // Dynamic Projects Override & Shadowing Variable via globalThis reference
  const activeProjects = projects && projects.length > 0
    ? projects.map((p, index) => ({
        id: p.id || String(index),
        name: p.title,
        title: p.title,
        location: p.address || 'Hệ thống',
        price: p.price,
        priceLabel: p.price,
        area: p.area || '—',
        type: p.type || 'Dự Án',
        status: p.status || 'SELLING',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        tag: index === 0 ? 'EXCLUSIVE' : 'HOT',
        desc: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        description: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        shortDescription: p.shortDescription || '',
        specs: p.shortDescription || `${p.area} · ${p.type}`,
        priceVal: parseFloat(p.price) || 0,
        loc: p.address || 'Hệ thống',
        size: parseFloat(p.area) || 0,
        bedrooms: 3,
        bathrooms: 2,
        features: [p.type],
        style: 'Modern',
        delivery: '2026',
        scale: '1 block'
      }))
    : ((globalThis as any).__resort_villas_ref || []);

  // Shadowing variables
  const RESORT_VILLAS: any = activeProjects;

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

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');

  // Quick search states on Home page
  const [homeLocation, setHomeLocation] = useState('All');
  const [homeType, setHomeType] = useState('All');
  const [homePrice, setHomePrice] = useState('All');

  // Modals selected elements
  const [selectedProject, setSelectedProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof MOCK_NEWS[0] | null>(null);

  // Form states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Amanoi Resort',
    message: ''
  });

  const [quickPhone, setQuickPhone] = useState('');
  const [quickPhoneSubmitted, setQuickPhoneSubmitted] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false);

  // About Page Working Tab
  const [activeAboutTab, setActiveAboutTab] = useState('mission');

  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const colors = {
    bg: '#FAFEFF',
    primary: '#065A82',
    accent: '#F59E0B',
    dark: '#0A2540',
    light: '#FFFFFF'
  };

  const fontHead = { fontFamily: "'Cormorant Garamond', serif" };
  const fontBody = { fontFamily: "'Jost', sans-serif" };

  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'gallery', label: 'Thư Viện' },
    { id: 'news', label: 'Tin Tức' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const navigateTo = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleQuickSearch = () => {
    setFilterLocation(homeLocation);
    setFilterType(homeType);
    setFilterPrice(homePrice);
    navigateTo('projects');
  };

  const handlePrevGalleryImg = () => {
    if (!selectedGalleryImg) return;
    const filteredImgs = MOCK_GALLERY.filter(img => selectedGalleryTab === 'All' || img.category === selectedGalleryTab);
    const currentIndex = filteredImgs.findIndex(img => img.img === selectedGalleryImg);
    if (currentIndex > 0) {
      setSelectedGalleryImg(filteredImgs[currentIndex - 1].img);
    } else {
      setSelectedGalleryImg(filteredImgs[filteredImgs.length - 1].img);
    }
  };

  const handleNextGalleryImg = () => {
    if (!selectedGalleryImg) return;
    const filteredImgs = MOCK_GALLERY.filter(img => selectedGalleryTab === 'All' || img.category === selectedGalleryTab);
    const currentIndex = filteredImgs.findIndex(img => img.img === selectedGalleryImg);
    if (currentIndex < filteredImgs.length - 1) {
      setSelectedGalleryImg(filteredImgs[currentIndex + 1].img);
    } else {
      setSelectedGalleryImg(filteredImgs[0].img);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.email) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setContactSubmitted(true);
  };

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'All' || project.type === filterType;
    const matchesLocation = filterLocation === 'All' || project.location === filterLocation;

    let matchesPrice = true;
    if (filterPrice === 'under-20') {
      matchesPrice = project.priceVal < 20;
    } else if (filterPrice === '20-25') {
      matchesPrice = project.priceVal >= 20 && project.priceVal <= 25;
    } else if (filterPrice === 'over-25') {
      matchesPrice = project.priceVal > 25;
    }

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const FontImports = () => (
    <style dangerouslySetInnerHTML={{__html: `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
      
      .resort-marquee {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        background-color: ${colors.dark};
        color: white;
        padding: 1rem 0;
      }
      .resort-marquee-content {
        display: inline-block;
        animation: marquee 40s linear infinite;
        font-family: 'Jost', sans-serif;
        letter-spacing: 0.1em;
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .resort-btn-primary {
        background-color: ${colors.accent};
        color: white;
        transition: all 0.3s;
      }
      .resort-btn-primary:hover {
        background-color: ${colors.primary};
      }
      .resort-btn-outline {
        border: 1px solid white;
        color: white;
        transition: all 0.3s;
      }
      .resort-btn-outline:hover {
        background-color: white;
        color: ${colors.primary};
      }
    `}} />
  );

  const renderHeader = () => (
    <header className="absolute top-0 w-full z-50 transition-all duration-300 border-b border-white/20" style={{ backgroundColor: currentPage === 'home' ? 'transparent' : colors.primary }}>
      <div className={`${MAX_W} px-6 h-24 flex items-center justify-between`}>
        <div 
          className="text-3xl font-bold text-white cursor-pointer" 
          style={fontHead}
          onClick={() => navigateTo('home')}
        >
          Resort Paradise
        </div>
        
        {!isSmall ? (
          <nav className="flex space-x-8">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => navigateTo(link.id)}
                className={`text-white hover:text-[#F59E0B] transition-colors text-sm font-medium tracking-wider uppercase ${currentPage === link.id ? 'text-[#F59E0B] border-b border-[#F59E0B]' : ''}`}
                style={fontBody}
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isSmall && isMobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-[#0A2540] shadow-2xl py-4 flex flex-col z-50">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`px-6 py-4 text-left text-white hover:bg-white/10 uppercase tracking-widest text-sm ${currentPage === link.id ? 'text-[#F59E0B] bg-white/5' : ''}`}
              style={fontBody}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  const renderFooter = () => (
    <footer style={{ backgroundColor: colors.dark, color: '#e2e8f0' }} className="pt-20 pb-10">
      <div className={`${MAX_W} px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16`}>
        <div>
          <h3 className="text-2xl font-bold text-white mb-6" style={fontHead}>Resort Paradise</h3>
          <p className="mb-6 opacity-80 leading-relaxed text-sm font-light">Tiên phong kiến tạo chuẩn mực sống sang trọng nơi thiên đường nghỉ dưỡng ven biển.</p>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all"><Facebook size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all"><Instagram size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all"><Twitter size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-all"><Linkedin size={18} /></button>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Khám Phá</h4>
          <ul className="space-y-4 opacity-80 text-sm font-light">
            <li><button onClick={() => navigateTo('projects')} className="hover:text-[#F59E0B] transition-colors">Dự án nổi bật</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-[#F59E0B] transition-colors">Về chúng tôi</button></li>
            <li><button onClick={() => navigateTo('news')} className="hover:text-[#F59E0B] transition-colors">Tin tức & Sự kiện</button></li>
            <li><button onClick={() => navigateTo('gallery')} className="hover:text-[#F59E0B] transition-colors">Thư viện ảnh</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Loại Hình</h4>
          <ul className="space-y-4 opacity-80 text-sm font-light">
            <li><button onClick={() => { setFilterType('beach-villa'); navigateTo('projects'); }} className="hover:text-[#F59E0B] transition-colors">Biệt Thự Biển</button></li>
            <li><button onClick={() => { setFilterType('condotel'); navigateTo('projects'); }} className="hover:text-[#F59E0B] transition-colors">Condotel Cao Cấp</button></li>
            <li><button onClick={() => { setFilterType('bungalow'); navigateTo('projects'); }} className="hover:text-[#F59E0B] transition-colors">Bungalow Sinh Thái</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Liên Hệ</h4>
          <ul className="space-y-4 opacity-80 text-sm font-light">
            <li className="flex items-start"><MapPin size={20} className="mr-3 text-[#F59E0B] shrink-0 mt-1" /> 123 Đường Ven Biển, Nha Trang, Việt Nam</li>
            <li className="flex items-center"><Phone size={20} className="mr-3 text-[#F59E0B] shrink-0" /> 1900 8888 9999</li>
            <li className="flex items-center"><Mail size={20} className="mr-3 text-[#F59E0B] shrink-0" /> contact@resortparadise.vn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center opacity-60 text-sm font-light">
        <p>© {new Date().getFullYear()} Resort Paradise. All rights reserved.</p>
      </div>
    </footer>
  );

  const renderHome = () => (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1920&q=80" alt="Resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-[#F59E0B] uppercase tracking-[0.3em] font-semibold mb-4 text-sm md:text-base">Thiên Đường Nghỉ Dưỡng</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={fontHead}>
            Nghỉ Dưỡng Đỉnh Cao
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
            Khám phá những căn biệt thự biển độc bản, hòa mình vào thiên nhiên và trải nghiệm đặc quyền thượng lưu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigateTo('projects')} className="resort-btn-primary px-8 py-4 uppercase tracking-widest text-sm font-semibold w-full sm:w-auto">
              Khám Phá Dự Án
            </button>
            <button onClick={() => navigateTo('contact')} className="resort-btn-outline px-8 py-4 uppercase tracking-widest text-sm font-semibold w-full sm:w-auto">
              Liên Hệ Nhận Báo Giá
            </button>
          </div>
        </div>
      </section>

      {/* INTRO MARQUEE */}
      <section className="resort-marquee">
        <div className="resort-marquee-content uppercase text-sm">
          ĐỐI TÁC CHIẾN LƯỢC: BANYAN TREE • INTERCONTINENTAL • MARRIOTT • REGENT • SIX SENSES • AMAN • KEMPINSKI • BANYAN TREE • INTERCONTINENTAL • MARRIOTT • REGENT • SIX SENSES • AMAN • KEMPINSKI
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="relative -mt-8 z-20 px-4">
        <div className={`${MAX_W} bg-white shadow-2xl p-6 md:p-8 rounded-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Vị trí</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  value={homeLocation}
                  onChange={(e) => setHomeLocation(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-3 pl-10 pr-4 bg-transparent outline-none focus:border-[#065A82] transition-colors appearance-none text-[#0A2540]"
                >
                  <option value="All">Tất cả vị trí</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Phú Quốc">Phú Quốc</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Ninh Thuận">Ninh Thuận</option>
                  <option value="Côn Đảo">Côn Đảo</option>
                  <option value="Hồ Tràm">Hồ Tràm</option>
                  <option value="Lăng Cô">Lăng Cô</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Khoảng giá</label>
              <div className="relative">
                <Compass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-3 pl-10 pr-4 bg-transparent outline-none focus:border-[#065A82] transition-colors appearance-none text-[#0A2540]"
                >
                  <option value="All">Tất cả mức giá</option>
                  <option value="under-20">Dưới 20 Tỷ</option>
                  <option value="20-25">20 - 25 Tỷ</option>
                  <option value="over-25">Trên 25 Tỷ</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Loại hình</label>
              <div className="relative">
                <Umbrella size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-3 pl-10 pr-4 bg-transparent outline-none focus:border-[#065A82] transition-colors appearance-none text-[#0A2540]"
                >
                  <option value="All">Tất cả loại hình</option>
                  <option value="beach-villa">Biệt thự biển</option>
                  <option value="condotel">Condotel</option>
                  <option value="bungalow">Bungalow</option>
                </select>
              </div>
            </div>
            <div>
              <button 
                onClick={handleQuickSearch}
                className="resort-btn-primary w-full py-4 uppercase tracking-widest text-sm font-semibold flex justify-center items-center gap-2"
              >
                <Search size={18} />
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6`}>
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Tuyệt Tác Nghỉ Dưỡng</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Dự Án Nổi Bật</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PROJECTS.slice(0, 3).map((prop) => (
              <div key={prop.id} onClick={() => setSelectedProject(prop)} className="group cursor-pointer bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative overflow-hidden h-80 mb-6 rounded-t-sm">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={prop.img} alt={prop.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#0A2540] text-white px-4 py-2 text-sm font-semibold">{prop.price}</div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest">{prop.typeName}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Star size={12} fill="currentColor" className="text-[#F59E0B]" /> {prop.rating}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-2 group-hover:text-[#065A82] transition-colors" style={fontHead}>{prop.name}</h3>
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <MapPin size={16} className="mr-2 text-[#065A82]" />
                    {prop.location}
                  </div>
                  <div className="flex border-t border-gray-100 pt-4 text-xs text-gray-600 gap-4">
                    <div className="flex items-center"><Droplet size={14} className="mr-1 text-[#065A82]" /> Hồ bơi riêng</div>
                    <div className="flex items-center"><Umbrella size={14} className="mr-1 text-[#065A82]" /> View biển</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigateTo('projects')} className="resort-btn-outline !text-[#065A82] !border-[#065A82] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:!bg-[#065A82] hover:!text-white">
              Xem Tất Cả Dự Án
            </button>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[600px]">
        {[
          { id: 'beach-villa', title: 'Biệt Thự Biển', count: '12 Dự án', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
          { id: 'condotel', title: 'Condotel', count: '25 Dự án', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
          { id: 'bungalow', title: 'Bungalow', count: '8 Dự án', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80' },
        ].map((type, i) => (
          <div 
            key={i} 
            onClick={() => { setFilterType(type.id); navigateTo('projects'); }}
            className="relative group overflow-hidden h-[400px] md:h-full cursor-pointer"
          >
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={type.img} alt={type.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-[#0A2540]/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold mb-2 block">{type.count}</span>
              <h3 className="text-3xl font-bold text-white mb-4" style={fontHead}>{type.title}</h3>
              <div className="w-12 h-1 bg-white transition-all group-hover:w-24"></div>
            </div>
          </div>
        ))}
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">
        <div className={`${MAX_W} px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
          <div>
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Về Chúng Tôi</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6" style={fontHead}>Thiên Đường Của Sự Riêng Tư & Đẳng Cấp</h2>
            <p className="text-gray-600 mb-6 text-lg font-light leading-relaxed">
              Chúng tôi tự hào là đơn vị tiên phong trong việc kiến tạo những không gian nghỉ dưỡng ven biển đẳng cấp nhất. Mỗi dự án không chỉ là một tài sản giá trị mà còn là một tác phẩm nghệ thuật, nơi hòa quyện giữa thiết kế đương đại và cảnh quan thiên nhiên hoang sơ.
            </p>
            <p className="text-gray-600 mb-10 text-lg font-light leading-relaxed">
              Tận hưởng đặc quyền thượng lưu với các tiện ích chuẩn 5 sao quốc tế, mang đến những trải nghiệm cá nhân hóa hoàn hảo nhất cho bạn và gia đình.
            </p>
            <div className="flex items-center gap-6">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="CEO" className="w-16 h-16 rounded-full object-cover shadow-md" />
              <div>
                <p className="font-bold text-[#0A2540]" style={fontHead}>Trần Anh Khoa</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Giám đốc điều hành</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80" alt="Spa" className="w-full h-80 object-cover mt-12 rounded-sm shadow-md" />
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80" alt="Interior" className="w-full h-80 object-cover rounded-sm shadow-md" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-2xl rounded-sm border border-gray-100">
              <div className="text-center border border-[#065A82]/20 p-6 bg-white">
                <span className="block text-4xl font-bold text-[#065A82] mb-1" style={fontHead}>15+</span>
                <span className="text-xs uppercase tracking-wider text-gray-600 font-semibold">Năm Kinh Nghiệm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6`}>
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Đặc Quyền Tiện Ích</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Tiện Ích Chuẩn 5 Sao</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: Umbrella, title: 'Bãi Biển Riêng', desc: 'Sở hữu không gian biển xanh cát trắng độc quyền.' },
              { icon: Coffee, title: 'Ẩm Thực Tinh Hoa', desc: 'Nhà hàng ven biển với thực đơn Michelin.' },
              { icon: Droplet, title: 'Spa & Wellness', desc: 'Liệu trình chăm sóc sức khỏe toàn diện.' },
              { icon: Navigation, title: 'Bến Du Thuyền', desc: 'Đặc quyền neo đậu du thuyền đẳng cấp.' },
              { icon: Shield, title: 'An Ninh 24/7', desc: 'Hệ thống bảo vệ đa lớp riêng tư tuyệt đối.' },
              { icon: Compass, title: 'Dịch Vụ Quản Gia', desc: 'Quản gia cá nhân phục vụ theo tiêu chuẩn quốc tế.' }
            ].map((amenity, i) => (
              <div key={i} className="bg-white p-8 hover:shadow-xl transition-all text-center rounded-sm border border-gray-100">
                <div className="w-16 h-16 mx-auto bg-[#065A82]/5 text-[#065A82] flex items-center justify-center rounded-full mb-6">
                  <amenity.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3" style={fontHead}>{amenity.title}</h3>
                <p className="text-gray-500 font-light text-sm">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-[#0A2540] text-white">
        <div className={`${MAX_W} px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center`}>
          {[
            { number: '15+', label: 'Dự án đẳng cấp' },
            { number: '500+', label: 'Biệt thự biển' },
            { number: '50+', label: 'Giải thưởng' },
            { number: '98%', label: 'Khách hàng hài lòng' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-bold text-[#F59E0B] mb-2" style={fontHead}>{stat.number}</div>
              <div className="uppercase tracking-widest text-xs opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-white">
        <div className={`${MAX_W} px-6`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Thư Viện Ảnh</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Không Gian Tuyệt Mỹ</h2>
            </div>
            <button onClick={() => navigateTo('gallery')} className="hidden md:flex items-center text-[#065A82] font-semibold hover:text-[#F59E0B] transition-colors">
              Xem Toàn Bộ <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
            <div 
              onClick={() => setSelectedGalleryImg(MOCK_GALLERY[0].img)}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[0].img} alt="Resort 1" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <p className="font-bold text-lg">{MOCK_GALLERY[0].title}</p>
              </div>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(MOCK_GALLERY[1].img)}
              className="relative group overflow-hidden h-full cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[1].img} alt="Resort 2" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm">{MOCK_GALLERY[1].title}</p>
              </div>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(MOCK_GALLERY[2].img)}
              className="relative group overflow-hidden h-full cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[2].img} alt="Resort 3" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm">{MOCK_GALLERY[2].title}</p>
              </div>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(MOCK_GALLERY[3].img)}
              className="relative group overflow-hidden h-full cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[3].img} alt="Resort 4" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm">{MOCK_GALLERY[3].title}</p>
              </div>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(MOCK_GALLERY[4].img)}
              className="relative group overflow-hidden h-full cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={MOCK_GALLERY[4].img} alt="Resort 5" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm">{MOCK_GALLERY[4].title}</p>
              </div>
            </div>
          </div>
          <button onClick={() => navigateTo('gallery')} className="md:hidden mt-8 w-full border border-[#065A82] text-[#065A82] py-4 font-semibold">Xem Toàn Bộ Ảnh</button>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="relative h-[500px] flex items-center justify-center cursor-pointer group">
        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
        <div className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/40 shadow-xl">
          <Play size={40} className="text-white ml-2" />
        </div>
        <div className="absolute bottom-10 text-center w-full z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={fontHead}>Trải Nghiệm Cuộc Sống Đích Thực</h2>
          <p className="text-white/80 text-sm tracking-wide uppercase">Xem video giới thiệu về bộ sưu tập nghỉ dưỡng của chúng tôi</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6`}>
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Đánh Giá</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Trải Nghiệm Khách Hàng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: 'Một kỳ nghỉ tuyệt vời! Thiết kế không gian hoàn hảo, dịch vụ chu đáo đến từng chi tiết nhỏ nhất. Nơi tôi thực sự tìm thấy sự bình yên.', author: 'Hoàng Anh', role: 'Doanh nhân' },
              { text: 'Chất lượng quản lý vận hành của resort rất xuất sắc. Đây không chỉ là nơi nghỉ dưỡng mà còn là một khoản đầu tư sinh lời bền vững.', author: 'Minh Tuấn', role: 'Nhà đầu tư' },
              { text: 'Bãi biển riêng tuyệt đẹp, các tiện ích spa và ẩm thực mang đẳng cấp quốc tế. Chắc chắn tôi sẽ quay lại đây vào mùa hè năm sau.', author: 'Thảo Vy', role: 'Giám đốc Sáng tạo' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-md relative border border-gray-100">
                <Quote size={40} className="text-[#065A82]/10 absolute top-6 right-6" />
                <div className="flex mb-4 text-[#F59E0B]">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-650 mb-8 italic text-sm leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-bold text-[#0A2540]">{item.author[0]}</div>
                  <div>
                    <h4 className="font-bold text-[#0A2540]" style={fontHead}>{item.author}</h4>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-24 bg-white">
        <div className={`${MAX_W} px-6`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Tạp Chí Nghỉ Dưỡng</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Tin Tức Mới Nhất</h2>
            </div>
            <button onClick={() => navigateTo('news')} className="hidden md:flex items-center text-[#065A82] font-semibold hover:text-[#F59E0B] transition-colors">
              Xem Tất Cả Bài Viết <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.slice(0, 3).map((news) => (
              <div key={news.id} onClick={() => setSelectedArticle(news)} className="bg-white group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider">{news.date}</div>
                    <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#065A82] transition-colors line-clamp-2" style={fontHead}>{news.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 font-light">{news.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="text-[#F59E0B] font-semibold text-sm uppercase tracking-widest flex items-center group-hover:text-[#065A82] transition-colors">
                    Đọc tiếp <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6 grid grid-cols-1 lg:grid-cols-2 gap-16`}>
          <div>
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Hỗ Trợ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6" style={fontHead}>Câu Hỏi Thường Gặp</h2>
            <p className="text-gray-600 mb-8 font-light leading-relaxed">Tìm hiểu thêm thông tin về các dự án và chính sách đầu tư của chúng tôi.</p>
            <button onClick={() => navigateTo('contact')} className="resort-btn-primary px-8 py-4 uppercase tracking-widest text-sm font-semibold">
              Gửi Câu Hỏi Cho Chúng Tôi
            </button>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Chính sách cam kết lợi nhuận như thế nào?', a: 'Chúng tôi cam kết lợi nhuận tối thiểu 8-10%/năm trong 5 năm đầu tiên, cùng chính sách chia sẻ doanh thu 80/20 từ năm thứ 6 trở đi.' },
              { q: 'Khách hàng có bao nhiêu đêm nghỉ dưỡng mỗi năm?', a: 'Chủ sở hữu sẽ nhận được 15 đêm nghỉ dưỡng miễn phí mỗi năm trên toàn bộ hệ thống resort của chúng tôi.' },
              { q: 'Hình thức sở hữu của dự án là gì?', a: 'Các dự án của chúng tôi cung cấp hình thức sở hữu lâu dài cho người Việt Nam và 50 năm cho người nước ngoài theo luật hiện hành.' },
              { q: 'Ngân hàng nào hỗ trợ vay vốn?', a: 'Chúng tôi hợp tác với các ngân hàng lớn như Vietcombank, Techcombank, MBBank hỗ trợ vay lên đến 70% giá trị tài sản.' }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-sm bg-white shadow-sm">
                <button 
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-bold text-[#0A2540] text-base md:text-lg">{faq.q}</span>
                  {activeFaq === i ? <Minus size={20} className="text-[#F59E0B]" /> : <Plus size={20} className="text-[#065A82]" />}
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 font-light text-sm border-t border-gray-100 pt-4 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 bg-[#0A2540] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#065A82]/20 transform skew-x-12 translate-x-32 hidden md:block"></div>
        <div className={`${MAX_W} px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12`}>
          <div className="text-white md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-head" style={fontHead}>Sẵn Sàng Sở Hữu Không Gian Nghỉ Dưỡng?</h2>
            <p className="text-white/80 text-lg font-light">Để lại số điện thoại, chuyên viên tư vấn của chúng tôi sẽ liên hệ trong thời gian sớm nhất.</p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left">
            {quickPhoneSubmitted ? (
              <div className="bg-white/10 border border-white/20 p-4 text-white text-sm font-semibold rounded-sm text-center">
                ✓ Đã gửi! Chúng tôi sẽ liên hệ lại qua sđt: {quickPhone}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (quickPhone) setQuickPhoneSubmitted(true); }} className="bg-white p-2 flex flex-col sm:flex-row rounded-sm gap-2">
                <input 
                  type="tel" 
                  required
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  placeholder="Số điện thoại của bạn" 
                  className="w-full px-4 py-2 text-[#0A2540] outline-none text-sm" 
                />
                <button type="submit" className="bg-[#F59E0B] text-white px-6 py-3 font-semibold uppercase tracking-widest text-xs hover:bg-[#065A82] transition-colors whitespace-nowrap">
                  Gửi yêu cầu
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-[#F8FAFC] border-b border-gray-200">
        <div className={`${MAX_W} px-6 text-center`}>
          <Mail size={32} className="mx-auto text-[#065A82] mb-4" />
          <h3 className="text-2xl font-bold text-[#0A2540] mb-2" style={fontHead}>Đăng Ký Nhận Bản Tin</h3>
          <p className="text-gray-500 mb-6 font-light">Cập nhật những thông tin dự án và ưu đãi mới nhất.</p>
          
          {subscribeSubmitted ? (
            <div className="max-w-md mx-auto bg-green-50 border border-green-200 text-green-700 p-4 font-semibold rounded-sm">
              ✓ Đăng ký thành công bản tin cho Email: {subscribeEmail}
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if(subscribeEmail) setSubscribeSubmitted(true); }} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                required
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Email của bạn" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-sm outline-none focus:border-[#065A82]" 
              />
              <button type="submit" className="bg-[#0A2540] text-white px-6 py-3 font-semibold uppercase tracking-widest text-sm hover:bg-[#065A82] transition-colors rounded-sm whitespace-nowrap">
                Đăng ký
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );

  const renderProjects = () => (
    <div className="pt-32 pb-24" style={{ backgroundColor: colors.bg }}>
      <div className={`${MAX_W} px-6`}>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0A2540] mb-4" style={fontHead}>Bộ Sưu Tập Dự Án</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">Tuyệt tác kiến trúc nghỉ dưỡng ven biển mang đẳng cấp quốc tế</p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white p-6 shadow-md rounded-sm mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Tìm kiếm</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tên, vị trí, từ khóa..."
                  className="w-full border-b border-gray-200 py-2 pl-10 pr-4 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Vị trí</label>
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors"
              >
                <option value="All">Tất cả vị trí</option>
                <option value="Nha Trang">Nha Trang</option>
                <option value="Phú Quốc">Phú Quốc</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Côn Đảo">Côn Đảo</option>
                <option value="Hồ Tràm">Hồ Tràm</option>
                <option value="Lăng Cô">Lăng Cô</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Loại hình</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors"
              >
                <option value="All">Tất cả loại hình</option>
                <option value="beach-villa">Biệt thự biển</option>
                <option value="condotel">Condotel</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Khoảng giá</label>
              <select 
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full border-b border-gray-200 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors"
              >
                <option value="All">Tất cả mức giá</option>
                <option value="under-20">Dưới 20 Tỷ</option>
                <option value="20-25">20 - 25 Tỷ</option>
                <option value="over-25">Trên 25 Tỷ</option>
              </select>
            </div>
          </div>
          
          {(searchQuery || filterLocation !== 'All' || filterType !== 'All' || filterPrice !== 'All') && (
            <div className="mt-4 flex justify-between items-center text-xs border-t border-gray-100 pt-4">
              <span className="text-gray-500">Đang lọc theo tiêu chí lựa chọn</span>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterLocation('All');
                  setFilterType('All');
                  setFilterPrice('All');
                }}
                className="text-[#065A82] font-semibold hover:underline uppercase"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Results grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((prop) => (
              <div 
                key={prop.id} 
                onClick={() => setSelectedProject(prop)}
                className="group cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all pb-6 rounded-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden h-80 mb-6 rounded-t-sm">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={prop.img} alt={prop.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-[#0A2540] text-white px-4 py-2 text-sm font-semibold shadow">{prop.price}</div>
                  </div>
                  <div className="px-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#F59E0B] text-xs uppercase tracking-widest font-semibold">{prop.typeName}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Star size={12} fill="currentColor" className="text-[#F59E0B]" /> {prop.rating}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A2540] mb-2 group-hover:text-[#065A82] transition-colors" style={fontHead}>{prop.name}</h3>
                    <div className="flex items-center text-gray-500 mb-4 text-sm">
                      <MapPin size={16} className="mr-2 text-[#065A82]" />
                      {prop.location}
                    </div>
                  </div>
                </div>
                <div className="px-6 pt-4 border-t border-gray-100 mt-4">
                  <div className="flex text-xs text-gray-500 gap-4 justify-between">
                    <div>Diện tích: <span className="font-semibold text-gray-700">{prop.size}</span></div>
                    <div>Phòng ngủ: <span className="font-semibold text-gray-700">{prop.beds}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-sm shadow-sm">
            <Umbrella size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-[#0A2540] mb-2">Không tìm thấy dự án phù hợp</h3>
            <p className="text-gray-500 text-sm mb-6">Quý khách vui lòng điều chỉnh lại bộ lọc hoặc nhập từ khóa tìm kiếm khác.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterLocation('All');
                setFilterType('All');
                setFilterPrice('All');
              }}
              className="bg-[#065A82] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#0A2540] transition-colors"
            >
              Reset Bộ Lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => {
    const milestones = [
      { year: '2010', title: 'Khởi Đầu Hành Trình', desc: 'Resort Paradise thành lập với dự án nghỉ dưỡng ven biển đầu tiên tại Nha Trang, quy mô 50 căn biệt thự cao cấp.' },
      { year: '2014', title: 'Hợp Tác Quốc Tế', desc: 'Ký kết hợp tác chiến lược cùng các tập đoàn quản lý hàng đầu thế giới như Accor và Marriott.' },
      { year: '2018', title: 'Mở Rộng Bán Đảo', desc: 'Ra mắt siêu dự án tại bán đảo Sơn Trà (Đà Nẵng) và Mũi Ông Đội (Phú Quốc), đạt doanh thu kỷ lục.' },
      { year: '2022', title: 'Tiên Phong Sống Xanh', desc: 'Chuyển đổi toàn diện sang thiết kế bền vững, đạt chứng chỉ xanh Lotus và LEED quốc tế.' },
      { year: '2026', title: 'Tầm Nhìn Thông Minh', desc: 'Ứng dụng công nghệ AI và Smart Home tích hợp vào vận hành resort, kiến tạo giá trị sống tương lai.' }
    ];

    const leaders = [
      {
        name: 'Trần Anh Khoa',
        role: 'Founder & CEO',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        quote: 'Chúng tôi không chỉ xây dựng những ngôi nhà, chúng tôi kiến tạo những di sản nghỉ dưỡng truyền đời.'
      },
      {
        name: 'Elena Nguyễn',
        role: 'Giám Đốc Thiết Kế',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        quote: 'Mỗi chi tiết kiến trúc là sự giao hòa tinh tế giữa tiện ích thượng lưu và hơi thở tự nhiên hoang sơ.'
      },
      {
        name: 'Lê Hoàng Minh',
        role: 'Giám Đốc Vận Hành',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        quote: 'Dịch vụ cá nhân hóa, chu đáo và tinh tế là chìa khóa mang lại sự hài lòng vượt mong đợi cho khách hàng.'
      }
    ];

    const coreValues = [
      { icon: Shield, title: 'Uy Tín & Cam Kết', desc: 'Đảm bảo pháp lý minh bạch, tiến độ chuẩn xác và chất lượng hoàn mỹ trong từng dự án.' },
      { icon: Compass, title: 'Sáng Tạo Độc Bản', desc: 'Không sao chép, mỗi resort là một kiệt tác kiến trúc riêng biệt phù hợp với cảnh quan vùng miền.' },
      { icon: Droplet, title: 'Bền Vững Sinh Thái', desc: 'Đặt bảo tồn thiên nhiên làm trung tâm, giảm thiểu tối đa dấu chân carbon trong xây dựng và vận hành.' }
    ];

    return (
      <div className="pt-32 pb-24" style={{ backgroundColor: colors.bg }}>
        {/* Intro */}
        <div className={`${MAX_W} px-6 mb-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Về Chúng Tôi</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6 leading-tight" style={fontHead}>
                Kiến Tạo Tuyệt Tác Nghỉ Dưỡng Thượng Lưu
              </h1>
              <p className="text-gray-600 mb-6 text-lg font-light leading-relaxed">
                Hơn 15 năm hình thành và phát triển, Resort Paradise đã khẳng định vị thế là nhà phát triển bất động sản nghỉ dưỡng hàng đầu Việt Nam. Chúng tôi kiến tạo nên những không gian sống đẳng cấp, mang đậm tính nghệ thuật và tôn vinh thiên nhiên tuyệt mỹ.
              </p>
              
              {/* Working Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  onClick={() => setActiveAboutTab('mission')}
                  className={`pb-3 pr-6 text-sm uppercase tracking-wider font-semibold border-b-2 transition-all ${activeAboutTab === 'mission' ? 'border-[#065A82] text-[#065A82]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  Sứ Mệnh
                </button>
                <button 
                  onClick={() => setActiveAboutTab('vision')}
                  className={`pb-3 px-6 text-sm uppercase tracking-wider font-semibold border-b-2 transition-all ${activeAboutTab === 'vision' ? 'border-[#065A82] text-[#065A82]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  Tầm Nhìn
                </button>
                <button 
                  onClick={() => setActiveAboutTab('philosophy')}
                  className={`pb-3 px-6 text-sm uppercase tracking-wider font-semibold border-b-2 transition-all ${activeAboutTab === 'philosophy' ? 'border-[#065A82] text-[#065A82]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  Triết Lý Thiết Kế
                </button>
              </div>

              <div className="min-h-[120px]">
                {activeAboutTab === 'mission' && (
                  <p className="text-gray-600 font-light leading-relaxed">
                    Sứ mệnh của chúng tôi là kiến tạo những không gian sống và nghỉ dưỡng hoàn mỹ, kết hợp dịch vụ đẳng cấp quốc tế, đem lại sự an tâm tuyệt đối và lợi ích lâu dài cho khách hàng cũng như đối tác chiến lược.
                  </p>
                )}
                {activeAboutTab === 'vision' && (
                  <p className="text-gray-600 font-light leading-relaxed">
                    Trở thành biểu tượng tiên phong trong lĩnh vực bất động sản nghỉ dưỡng sinh thái cao cấp tại khu vực Đông Nam Á, dẫn đầu xu hướng sống sang trọng bền vững và ứng dụng công nghệ hiện đại.
                  </p>
                )}
                {activeAboutTab === 'philosophy' && (
                  <p className="text-gray-600 font-light leading-relaxed">
                    &ldquo;Tôn trọng và Hòa quyện cùng Thiên nhiên&rdquo;. Chúng tôi tin rằng kiến trúc xuất sắc nhất là kiến trúc tôn vinh, bảo vệ và hòa mình làm một với cảnh quan tự nhiên hoang sơ của địa phương.
                  </p>
                )}
              </div>
            </div>
            
            <div className="relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80" alt="About us" className="rounded-sm shadow-2xl w-full object-cover h-[450px]" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-sm border border-gray-100 hidden sm:block">
                <span className="block text-5xl font-bold text-[#065A82]" style={fontHead}>15+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Năm phát triển bền vững</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones / Timeline */}
        <div className="bg-white py-24 mb-20 border-y border-gray-100">
          <div className={`${MAX_W} px-6`}>
            <div className="text-center mb-16">
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Hành Trình</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Những Cột Mốc Lịch Sử</h2>
            </div>
            
            <div className="relative border-l-2 border-[#065A82]/20 ml-4 md:ml-1/2 md:-translate-x-[1px] max-w-4xl mx-auto space-y-12">
              {milestones.map((step, i) => (
                <div key={i} className="relative pl-8 md:pl-0">
                  <div className="absolute left-0 md:-left-[9px] w-4 h-4 bg-[#F59E0B] rounded-full border-4 border-white mt-1.5 z-10 shadow"></div>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <span className="text-5xl font-bold text-[#065A82]/20 inline-block mb-2" style={fontHead}>{step.year}</span>
                    <h3 className="text-xl font-bold text-[#0A2540] mb-2">{step.title}</h3>
                    <p className="text-gray-600 font-light text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className={`${MAX_W} px-6 mb-20`}>
          <div className="text-center mb-16">
            <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Giá Trị Cốt Lõi</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540]" style={fontHead}>Giá Trị Làm Nên Thương Hiệu</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-md hover:shadow-xl transition-all border border-gray-100/50">
                <div className="w-14 h-14 bg-[#065A82]/5 text-[#065A82] flex items-center justify-center rounded-full mb-6">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3" style={fontHead}>{val.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-[#0A2540] py-24 text-white">
          <div className={`${MAX_W} px-6`}>
            <div className="text-center mb-16">
              <span className="text-[#F59E0B] uppercase tracking-widest text-sm font-semibold block mb-3">Ban Điều Hành</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white" style={fontHead}>Đội Ngũ Lãnh Đạo</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {leaders.map((leader, i) => (
                <div key={i} className="group">
                  <div className="h-96 overflow-hidden rounded-sm mb-6 relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#0A2540]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                      <p className="text-white italic text-sm">&ldquo;{leader.quote}&rdquo;</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={fontHead}>{leader.name}</h3>
                  <p className="text-[#F59E0B] text-xs uppercase tracking-widest font-semibold">{leader.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGallery = () => {
    const categories = [
      { id: 'All', label: 'Tất cả' },
      { id: 'exterior', label: 'Ngoại thất' },
      { id: 'interior', label: 'Nội thất' },
      { id: 'amenities', label: 'Tiện ích' }
    ];

    const filteredGallery = MOCK_GALLERY.filter(img => selectedGalleryTab === 'All' || img.category === selectedGalleryTab);

    return (
      <div className="pt-32 pb-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6`}>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#0A2540] mb-4" style={fontHead}>Thư Viện Ảnh</h1>
            <p className="text-gray-600 font-light">Chiêm ngưỡng tuyệt tác kiến trúc và không gian sống đỉnh cao.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id)}
                className={`px-6 py-2 uppercase tracking-widest text-xs font-semibold border transition-all rounded-sm ${selectedGalleryTab === tab.id ? 'bg-[#065A82] text-white border-[#065A82]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedGalleryImg(item.img)}
                className="group relative overflow-hidden h-72 rounded-sm cursor-pointer shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[#F59E0B] text-xs uppercase tracking-widest font-semibold mb-1">{item.categoryName}</span>
                  <h4 className="text-white text-lg font-bold" style={fontHead}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = MOCK_NEWS.filter(article => {
      const query = searchNewsQuery.toLowerCase();
      return query === '' ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);
    });

    return (
      <div className="pt-32 pb-24" style={{ backgroundColor: colors.bg }}>
        <div className={`${MAX_W} px-6`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#0A2540] mb-4" style={fontHead}>Tạp Chí Nghỉ Dưỡng</h1>
            <p className="text-gray-600 max-w-xl mx-auto font-light">Cập nhật tin tức mới nhất về các dự án, xu hướng bất động sản và phong cách sống thượng lưu.</p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..."
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-[#065A82] rounded-sm transition-all text-[#0A2540] shadow-sm"
              />
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => setSelectedArticle(news)}
                  className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all rounded-sm overflow-hidden border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider">{news.date}</div>
                      <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#065A82] transition-colors line-clamp-2" style={fontHead}>{news.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed font-light">{news.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <span className="text-[#F59E0B] font-semibold text-sm uppercase tracking-widest flex items-center group-hover:text-[#065A82] transition-colors">
                      Đọc tiếp <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy bài viết phù hợp với tìm kiếm của bạn.</p>
              <button 
                onClick={() => setSearchNewsQuery('')}
                className="mt-4 text-[#065A82] font-semibold uppercase tracking-wider text-sm hover:underline"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    if (contactSubmitted) {
      return (
        <div className="pt-32 pb-24 bg-white flex items-center justify-center min-h-[60vh]">
          <div className={`${MAX_W} px-6 text-center max-w-md`}>
            <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full mx-auto mb-6 shadow-sm">
              <Shield size={44} />
            </div>
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4" style={fontHead}>Gửi Thông Tin Thành Công!</h2>
            <p className="text-gray-600 font-light mb-8 leading-relaxed text-sm md:text-base">
              Cảm ơn Quý khách <strong>{contactForm.name}</strong> đã quan tâm đến các dự án của Resort Paradise. Chuyên viên tư vấn của chúng tôi sẽ liên hệ lại với Quý khách qua số điện thoại <strong>{contactForm.phone}</strong> trong thời gian sớm nhất.
            </p>
            <button 
              onClick={() => {
                setContactSubmitted(false);
                setContactForm({
                  name: '',
                  phone: '',
                  email: '',
                  interest: 'Amanoi Resort',
                  message: ''
                });
              }}
              className="bg-[#065A82] text-white px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-[#0A2540] transition-colors rounded-sm shadow-md"
            >
              Quay Lại Form Liên Hệ
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-32 pb-24 bg-white">
        <div className={`${MAX_W} px-6`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-5xl font-bold text-[#0A2540] mb-6" style={fontHead}>Liên Hệ Với Chúng Tôi</h1>
              <p className="text-gray-600 mb-10 leading-relaxed font-light">
                Đội ngũ chuyên viên tư vấn giàu kinh nghiệm của chúng tôi luôn sẵn sàng hỗ trợ Quý khách 24/7. Hãy để lại thông tin hoặc liên hệ trực tiếp qua hotline để nhận tư vấn giỏ hàng độc quyền.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#065A82]/5 text-[#F59E0B] flex items-center justify-center rounded-full mr-4 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">Địa chỉ trụ sở</h4>
                    <p className="text-gray-600 text-sm font-light">123 Đường Ven Biển, Nha Trang, Việt Nam</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#065A82]/5 text-[#F59E0B] flex items-center justify-center rounded-full mr-4 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">Hotline CSKH</h4>
                    <p className="text-gray-600 text-sm font-light">1900 8888 9999 (Hỗ trợ 24/7)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#065A82]/5 text-[#F59E0B] flex items-center justify-center rounded-full mr-4 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">Email liên hệ</h4>
                    <p className="text-gray-600 text-sm font-light">contact@resortparadise.vn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFEFF] p-8 rounded-sm shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-6" style={fontHead}>Đăng Ký Tư Vấn Trực Tuyến</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#0A2540] mb-2 uppercase tracking-wider">Họ và Tên *</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors" 
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A2540] mb-2 uppercase tracking-wider">Số Điện Thoại *</label>
                    <input 
                      type="tel" 
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors" 
                      placeholder="0901234567"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0A2540] mb-2 uppercase tracking-wider">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors" 
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A2540] mb-2 uppercase tracking-wider">Dự án quan tâm</label>
                  <select 
                    value={contactForm.interest}
                    onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                    className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors bg-transparent"
                  >
                    {MOCK_PROJECTS.map(project => (
                      <option key={project.id} value={project.name}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A2540] mb-2 uppercase tracking-wider">Nội dung tin nhắn</label>
                  <textarea 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[#065A82] text-sm text-[#0A2540] transition-colors resize-none"
                    placeholder="Lời nhắn hoặc yêu cầu chi tiết của bạn..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#065A82] text-white py-4 font-semibold uppercase tracking-widest text-sm hover:bg-[#0A2540] transition-colors rounded-sm flex justify-center items-center gap-2 shadow-md"
                >
                  Gửi Yêu Cầu Tư Vấn
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectModal = () => {
    if (!selectedProject) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow transition-all animate-bounce"
          >
            <X size={24} />
          </button>
          
          <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-[#F59E0B] text-white px-4 py-2 font-bold text-lg rounded-sm shadow-md">
              {selectedProject.price}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#065A82] font-semibold mb-2">
                <span>{selectedProject.typeName}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Star size={12} fill="currentColor" className="text-[#F59E0B]" /> {selectedProject.rating}</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0A2540] mb-3 leading-tight" style={fontHead}>{selectedProject.name}</h2>
              
              <div className="flex items-center text-gray-500 mb-6 text-sm">
                <MapPin size={16} className="mr-2 text-[#065A82]" />
                {selectedProject.location}
              </div>
              
              <p className="text-gray-600 font-light mb-6 text-sm leading-relaxed">{selectedProject.description}</p>
              
              <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-4 mb-6 text-center text-sm">
                <div>
                  <span className="block text-gray-400 text-xs uppercase">Diện tích</span>
                  <span className="font-bold text-[#0A2540]">{selectedProject.size}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs uppercase">Phòng ngủ</span>
                  <span className="font-bold text-[#0A2540]">{selectedProject.beds} phòng</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs uppercase">Phòng tắm</span>
                  <span className="font-bold text-[#0A2540]">{selectedProject.baths} phòng</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Đặc điểm nổi bật</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.specs.map((spec, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <button 
                onClick={() => {
                  setContactForm({
                    ...contactForm,
                    interest: selectedProject.name,
                    message: `Tôi muốn nhận thông tin chi tiết và bảng giá dự án ${selectedProject.name}.`
                  });
                  setSelectedProject(null);
                  navigateTo('contact');
                }}
                className="w-full bg-[#065A82] text-white py-4 font-semibold uppercase tracking-widest hover:bg-[#0A2540] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-md"
              >
                Yêu cầu tư vấn chi tiết
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderArticleModal = () => {
    if (!selectedArticle) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow transition-all"
          >
            <X size={24} />
          </button>
          
          <div className="h-64 sm:h-96 relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-[#F59E0B] text-white text-xs px-3 py-1 uppercase tracking-widest font-semibold rounded-sm mb-3 inline-block">
                Tạp chí nghỉ dưỡng
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight" style={fontHead}>{selectedArticle.title}</h2>
              <div className="flex gap-4 text-xs text-white/80">
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>Tác giả: {selectedArticle.author}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 bg-white">
            <p className="text-gray-800 font-medium text-lg leading-relaxed mb-6 border-l-4 border-[#065A82] pl-4">
              {selectedArticle.excerpt}
            </p>
            <div className="text-gray-600 font-light leading-relaxed space-y-4 text-sm md:text-base">
              <p>{selectedArticle.content}</p>
              <p>Đối với các nhà đầu tư cá nhân, việc tìm kiếm một sản phẩm bất động sản vừa có thể nghỉ dưỡng vừa mang lại dòng tiền thụ động ổn định đang trở thành ưu tiên hàng đầu. Với vị thế đắc địa và các chính sách ưu đãi tài chính hấp dẫn từ chủ đầu tư Resort Paradise, đây chắc chắn là thời điểm vàng để sở hữu các tuyệt tác này.</p>
              <p>Hãy liên hệ ngay với chúng tôi để nhận trọn bộ tài liệu phân tích thị trường và giỏ hàng độc quyền mới nhất.</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => {
                  setSelectedArticle(null);
                  navigateTo('contact');
                }}
                className="bg-[#0A2540] text-white px-6 py-3 font-semibold uppercase tracking-widest text-xs hover:bg-[#065A82] transition-colors rounded-sm"
              >
                Liên hệ nhận thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGalleryLightbox = () => {
    if (!selectedGalleryImg) return null;
    const currentItem = MOCK_GALLERY.find(img => img.img === selectedGalleryImg);
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-10">
          <span className="text-sm font-medium tracking-wider uppercase">{currentItem?.title || 'Thư Viện Ảnh'}</span>
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            className="text-white hover:text-[#F59E0B] p-2 transition-all"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content with arrows */}
        <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center">
          <button 
            onClick={handlePrevGalleryImg}
            className="absolute left-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Lightbox view" className="max-h-[85vh] max-w-[85vw] object-contain rounded shadow-2xl" />
          
          <button 
            onClick={handleNextGalleryImg}
            className="absolute right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.dark, ...fontBody }} className="min-h-screen flex flex-col overflow-x-hidden font-sans">
      <FontImports />
      {renderHeader()}
      <main className="flex-grow">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'projects' && renderProjects()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'gallery' && renderGallery()}
        {currentPage === 'news' && renderNews()}
        {currentPage === 'contact' && renderContact()}
      </main>
      {renderFooter()}

      {/* Modals & Overlays */}
      {renderProjectModal()}
      {renderArticleModal()}
      {renderGalleryLightbox()}
    </div>
  );
}
