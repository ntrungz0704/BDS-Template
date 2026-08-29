import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Clock, ChevronDown, ChevronRight, Menu, X, 
  Search, Star, CheckCircle, TrendingUp, Users, ShoppingBag, Store, 
  Coffee, Utensils, Scissors, Car, Shield, Wifi, Zap, Building2,
  ArrowRight, Play, Quote, Instagram, Facebook, Linkedin, Twitter,
  Calendar, Info, ArrowUpRight
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// 1. Elevated Mock Listings (availableSpaces)
const availableSpaces = [
  {
    id: 1,
    title: 'Shophouse Góc 2 Mặt Tiền',
    area: '150m²',
    areaValue: 150,
    price: 'Từ 15 Tỷ',
    priceValue: 15,
    type: 'Shophouse F&B',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    location: 'Phân khu A - Phố đi bộ trung tâm',
    description: 'Căn shophouse góc đắc địa nhất dự án sở hữu 2 mặt tiền cực thoáng, vỉa hè rộng 6m thích hợp kinh doanh cafe, nhà hàng cao cấp đón lưu lượng khách đi bộ sầm uất.',
    specifications: ['Mặt tiền: 10m & 15m', 'Số tầng: 3 tầng', 'Bàn giao: Hoàn thiện mặt ngoài', 'Hướng: Đông Nam & Đông Bắc']
  },
  {
    id: 2,
    title: 'Kiosk Trung Tâm Thương Mại',
    area: '45m²',
    areaValue: 45,
    price: 'Từ 3 Tỷ',
    priceValue: 3,
    type: 'Kiosk Bán Lẻ',
    status: 'Còn lại 2 căn',
    img: 'https://images.unsplash.com/photo-1581452934272-9860b29cecd1?w=800&q=80',
    location: 'Tầng 1 - Khu mua sắm Central Mall',
    description: 'Kiosk nằm ngay sảnh thang cuốn trung tâm, vị trí lý tưởng để trưng bày sản phẩm trang sức, phụ kiện hoặc mỹ phẩm cao cấp. Lưu lượng khách mua sắm nội khu tiếp cận liên tục.',
    specifications: ['Mặt tiền: 5m', 'Chiều cao trần: 4m', 'Hệ thống điều hòa trung tâm', 'Hỗ trợ kệ trưng bày tiêu chuẩn']
  },
  {
    id: 3,
    title: 'Mặt Bằng Siêu Thị Mini',
    area: '300m²',
    areaValue: 300,
    price: 'Từ 25 Tỷ',
    priceValue: 25,
    type: 'Retail Anchor',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1629235882875-101ecf569bd8?w=800&q=80',
    location: 'Phân khu B - Khối đế tòa chung cư Luxury',
    description: 'Diện tích mặt bằng rộng lớn với mặt tiền kéo dài 20m, có hầm nhận hàng riêng biệt. Thích hợp làm siêu thị tiện lợi, phòng gym cao cấp hoặc trung tâm tiếng Anh.',
    specifications: ['Mặt tiền: 20m', 'Số tầng: 1 tầng trệt', 'Hầm để xe và nhận hàng riêng', 'Điện 3 pha công suất cao']
  },
  {
    id: 4,
    title: 'Shophouse Phố Đi Bộ',
    area: '120m²',
    areaValue: 120,
    price: 'Từ 12 Tỷ',
    priceValue: 12,
    type: 'Shophouse F&B',
    status: 'Sắp ra mắt',
    img: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80',
    location: 'Phân khu C - Quảng trường ánh sáng',
    description: 'Vị trí trực diện quảng trường ánh sáng - nơi thường xuyên diễn ra các lễ hội lớn của thành phố. Phù hợp kinh doanh thời trang, showroom hoặc pub/bar sang trọng.',
    specifications: ['Mặt tiền: 6m', 'Số tầng: 4 tầng', 'Có ô chờ thang máy', 'Bàn giao thô tự do decor']
  },
  {
    id: 5,
    title: 'Mặt Bằng Cafe Sân Vườn',
    area: '200m²',
    areaValue: 200,
    price: 'Từ 18 Tỷ',
    priceValue: 18,
    type: 'Shophouse F&B',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    location: 'Phân khu A - Góc bờ hồ cảnh quan',
    description: 'Sở hữu khoảng sân vườn rộng rãi lên tới 80m² (chưa tính vào diện tích sử dụng), view trực diện hồ điều hòa mát mẻ. Nơi lý tưởng cho các mô hình cà phê specialty, trà chiều chill.',
    specifications: ['Mặt tiền: 12m', 'Diện tích sân vườn: 80m² đi kèm', 'Thiết kế kính tràn viền', 'Hướng: Nam đón gió mát']
  },
  {
    id: 6,
    title: 'Kiosk Thời Trang Cao Cấp',
    area: '60m²',
    areaValue: 60,
    price: 'Từ 4.5 Tỷ',
    priceValue: 4.5,
    type: 'Kiosk Bán Lẻ',
    status: 'Đã đặt cọc 50%',
    img: 'https://images.unsplash.com/photo-1582005450386-52cc85822d15?w=800&q=80',
    location: 'Tầng 2 - Thời trang & Làm đẹp',
    description: 'Kiosk góc với hai mặt kính hướng ra hành lang chính của tầng 2. Khu vực tập trung các thương hiệu local brand và quốc tế danh tiếng, tỷ lệ chuyển đổi mua sắm cao.',
    specifications: ['Mặt tiền: 7m', 'Độ cao trần: 3.5m', 'Hệ thống chiếu sáng thông minh', 'Sẵn sàng vận hành ngay']
  },
  {
    id: 7,
    title: 'Shophouse Khối Đế Căn Hộ',
    area: '180m²',
    areaValue: 180,
    price: 'Từ 16.5 Tỷ',
    priceValue: 16.5,
    type: 'Retail Anchor',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    location: 'Phân khu D - Khối đế Tháp Skyview',
    description: 'Nằm ngay lối ra vào chính của tháp căn hộ Skyview với hơn 3000 cư dân sinh sống. Tiềm năng khai thác cực kỳ ổn định phục vụ nhu cầu hàng ngày như nhà thuốc, siêu thị sạch.',
    specifications: ['Mặt tiền: 8m', 'Số tầng: 2 tầng', 'Chỗ đỗ xe tiện lợi phía trước', 'Thời gian sở hữu lâu dài']
  },
  {
    id: 8,
    title: 'Kiosk Ẩm Thực Food Court',
    area: '35m²',
    areaValue: 35,
    price: 'Từ 2.5 Tỷ',
    priceValue: 2.5,
    type: 'Kiosk Bán Lẻ',
    status: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    location: 'Tầng 3 - Thiên đường ẩm thực',
    description: 'Kiosk thiết kế sẵn bếp điện từ công suất lớn, hệ thống hút mùi âm trần chuyên dụng cho nhà hàng F&B. Nằm tại trung tâm khu ẩm thực sầm uất nhất tòa nhà.',
    specifications: ['Hệ thống hút mùi độc lập', 'Đường cấp thoát nước sẵn có', 'Diện tích: 35m²', 'Hợp đồng thuê tối thiểu 5 năm']
  }
];

// 2. Elevated Mock News Articles (newsArticles)
const newsArticles = [
  {
    id: 1,
    title: 'Tiềm năng tăng giá của shophouse khối đế trong chu kỳ mới',
    date: '24.10.2025',
    category: 'Xu Hướng',
    summary: 'Phân tích chi tiết về sự dịch chuyển dòng vốn đầu tư vào các mặt bằng bán lẻ tại những khu đô thị sầm uất.',
    content: `Thị trường bất động sản bán lẻ đang chứng kiến sự trỗi dậy mạnh mẽ sau thời kỳ tái cấu trúc. Đặc biệt, phân khúc shophouse khối đế chung cư đang thu hút lượng lớn dòng tiền nhàn rỗi nhờ tính thanh khoản cao và khả năng khai thác cho thuê ổn định từ 8-12%/năm.\n\nCác chuyên gia nhận định, việc tập trung cư dân cao tại các đô thị tích hợp tạo ra tệp khách hàng tại chỗ khổng lồ. Do đó, các thương hiệu F&B và bán lẻ tiện ích luôn sẵn sàng trả mức giá thuê cao để có được các vị trí đắc địa này. Nhà đầu tư thông thái nên ưu tiên chọn shophouse có mặt tiền thoáng, vỉa hè rộng và chỗ đỗ xe thuận tiện.`,
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'
  },
  {
    id: 2,
    title: 'Chiến lược lựa chọn mặt bằng bán lẻ thành công cho thương hiệu F&B',
    date: '18.11.2025',
    category: 'Kinh Nghiệm',
    summary: 'Làm thế nào để chọn lựa một vị trí đắc địa giúp cửa hàng cafe hoặc nhà hàng của bạn đạt doanh thu tối ưu ngay từ tháng đầu tiên?',
    content: `Đối với ngành F&B, vị trí quyết định đến 50% sự thành bại của một thương hiệu. Một mặt bằng đẹp không chỉ đơn thuần là nằm ở mặt đường lớn, mà phải nằm trên luồng di chuyển tự nhiên của tệp khách hàng mục tiêu.\n\nNghiên cứu cho thấy, vị trí góc với 2 mặt tiền thường tạo ra hiệu ứng nhận diện thương hiệu tốt hơn gấp 1.8 lần so với căn thông thường. Ngoài ra, các yếu tố kỹ thuật như công suất điện 3 pha, hệ thống cấp thoát nước, và hệ thống hút mùi tiêu chuẩn cũng cần được rà soát kỹ lưỡng trước khi đặt bút ký hợp đồng thuê dài hạn.`,
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
  },
  {
    id: 3,
    title: 'Chính sách cam kết thuê lại - Bệ đỡ an toàn cho nhà đầu tư',
    date: '05.12.2025',
    category: 'Thị Trường',
    summary: 'Phân tích chính sách cam kết thuê lại từ chủ đầu tư giúp tối ưu dòng tiền và giảm thiểu rủi ro cho khách mua shophouse.',
    content: `Trong bối cảnh thị trường biến động, dòng sản phẩm bất động sản thương mại có cam kết lợi nhuận cho thuê từ chủ đầu tư đang trở thành hầm trú ẩn an toàn cho dòng vốn.\n\nTại PlatformBDS, chính sách cam kết thuê lại trong 3 năm đầu tiên với lãi suất 8%/năm không chỉ giúp chủ sở hữu có ngay nguồn thu nhập ổn định mà còn bảo đảm thời gian để khu đô thị lấp đầy cư dân, tạo tiền đề cho việc tự khai thác kinh doanh hoặc cho thuê giá cao ở các năm tiếp theo.`,
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'
  },
  {
    id: 4,
    title: 'Xu hướng chuyển dịch từ Kiosk truyền thống sang Trung tâm thương mại hiện đại',
    date: '12.01.2026',
    category: 'Xu Hướng',
    summary: 'Khách hàng ngày càng ưu tiên trải nghiệm mua sắm tích hợp, thúc đẩy các tiểu thương dịch chuyển vào các trung tâm thương mại cao cấp.',
    content: `Sự thay đổi trong hành vi tiêu dùng của giới trẻ đòi hỏi các cửa hàng bán lẻ không chỉ bán sản phẩm mà phải bán cả trải nghiệm mua sắm. Khách hàng thích mua sắm trong không gian mát mẻ, sạch sẽ, kết hợp ăn uống và giải trí dưới một mái nhà.\n\nĐiều này lý giải vì sao các kiosk thời trang, phụ kiện bên trong các trung tâm thương mại lớn có diện tích vừa phải (30-60m2) nhưng tỷ lệ doanh thu trên mét vuông luôn đạt mức cao vượt trội so với nhà mặt phố truyền thống.`,
    img: 'https://images.unsplash.com/photo-1582005450386-52cc85822d15?w=600&q=80'
  },
  {
    id: 5,
    title: 'Khai trương phân khu ẩm thực Food Court lớn nhất khu vực phía Tây',
    date: '20.02.2026',
    category: 'Sự Kiện',
    summary: 'Sự kiện thu hút hàng ngàn lượt khách tham quan mua sắm và thưởng thức ẩm thực đa quốc gia.',
    content: `Hôm nay, PlatformBDS chính thức cắt băng khánh thành tổ hợp ẩm thực Food Court tại tầng 3 của dự án. Với sự quy tụ của hơn 40 thương hiệu F&B nổi tiếng trong nước và quốc tế, đây hứa hẹn sẽ là điểm đến giải trí cuối tuần không thể bỏ qua của giới trẻ.\n\nNhân dịp khai trương, toàn bộ khách thuê tại đây được hỗ trợ 100% phí dịch vụ trong 6 tháng đầu và hỗ trợ truyền thông trên các kênh chính thức của chủ đầu tư, khẳng định cam kết đồng hành lâu dài cùng đối tác.`,
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
  },
  {
    id: 6,
    title: 'Bàn giao sổ hồng đợt 1 cho cư dân và chủ sở hữu Shophouse',
    date: '15.03.2026',
    category: 'Sự Kiện',
    summary: 'Khẳng định uy tín và tính pháp lý minh bạch của chủ đầu tư đối với các sản phẩm bất động sản tại dự án.',
    content: `Lễ trao giấy chứng nhận quyền sở hữu nhà ở và tài sản gắn liền với đất (sổ hồng) đợt 1 đã diễn ra trang trọng tại Sales Gallery dự án. Việc hoàn tất thủ tục pháp lý đúng cam kết giúp gia tăng giá trị tài sản vượt trội và củng cố vững chắc niềm tin của khách hàng đối với thương hiệu PlatformBDS.\n\nĐại diện chủ đầu tư cho biết sẽ tiếp tục phối hợp chặt chẽ với cơ quan chức năng để hoàn thiện hồ sơ cho các đợt bàn giao tiếp theo trong quý tới.`,
    img: 'https://images.unsplash.com/photo-1581452934272-9860b29cecd1?w=800&q=80'
  }
];

// 3. Elevated Gallery Images
const galleryCategories = ['Tất cả', 'Shophouse', 'Kiosk', 'Nội thất', 'Tiện ích'];
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1519711681284-9c4c7c8ec6b5?w=800&q=80', category: 'Shophouse', caption: 'Khu Shophouse phố đi bộ nhộn nhịp ban đêm' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', category: 'Nội thất', caption: 'Không gian nội thất nhà hàng F&B hiện đại' },
  { url: 'https://images.unsplash.com/photo-1629235882875-101ecf569bd8?w=800&q=80', category: 'Tiện ích', caption: 'Siêu thị mini tiện lợi phục vụ cư dân' },
  { url: 'https://images.unsplash.com/photo-1582005450386-52cc85822d15?w=800&q=80', category: 'Kiosk', caption: 'Kiosk trưng bày thời trang cao cấp' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', category: 'Nội thất', caption: 'Quán cafe sân vườn thiết kế không gian xanh' },
  { url: 'https://images.unsplash.com/photo-1581452934272-9860b29cecd1?w=800&q=80', category: 'Kiosk', caption: 'Gian hàng phụ kiện tinh tế' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', category: 'Tiện ích', caption: 'Sảnh đón khách sang trọng Central Mall' },
  { url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80', category: 'Shophouse', caption: 'Mặt tiền Shophouse góc hai mặt lộ lớn' },
];

const normalizeRetailPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham', 'shophouse', 'thuong-mai'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  return clean || 'home';
};

export default function RetailTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const [currentPage, setCurrentPageState] = useState(normalizeRetailPage(initialPage));

  useEffect(() => {
    setCurrentPageState(normalizeRetailPage(initialPage));
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // --- Core States for Interactivity ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [filterPrice, setFilterPrice] = useState('Tất cả');
  const [filterSize, setFilterSize] = useState('Tất cả');
  const [selectedProject, setSelectedProject] = useState<typeof availableSpaces[0] | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState<typeof newsArticles[0] | null>(null);
  
  // Form submission states
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactProduct, setContactProduct] = useState('Shophouse F&B');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const isMobile = viewport === 'mobile';
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const theme = {
    bg: '#FFFBF0',
    primary: '#B45309',
    accent: '#F59E0B',
    text: '#1F2937',
    textLight: '#4B5563',
    fontHeading: '"Syne", sans-serif',
    fontBody: '"DM Sans", sans-serif'
  };

  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'projects', label: 'Mặt Bằng' },
    { id: 'about', label: 'Câu Chuyện' },
    { id: 'gallery', label: 'Thư Viện' },
    { id: 'news', label: 'Tin Tức' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const faqs = [
    { q: 'Pháp lý của shophouse tại PlatformBDS như thế nào?', a: 'Tất cả các sản phẩm shophouse và mặt bằng bán lẻ tại dự án đều sở hữu sổ hồng lâu dài đối với người Việt Nam và 50 năm đối với người nước ngoài theo quy định hiện hành.' },
    { q: 'Tiến độ thanh toán khi mua mặt bằng bán lẻ?', a: 'Chúng tôi cung cấp phương thức thanh toán linh hoạt lên đến 24 tháng, thanh toán đợt 1 chỉ 15%. Ngân hàng đối tác hỗ trợ vay lên đến 70% giá trị tài sản.' },
    { q: 'Cam kết lợi nhuận cho thuê như thế nào?', a: 'Chủ đầu tư cam kết thuê lại trong 3 năm đầu tiên với mức lợi nhuận 8%/năm, hoặc hỗ trợ tìm kiếm khách thuê với mạng lưới đối tác thương hiệu lớn.' },
    { q: 'Hệ thống tiện ích nội khu gồm những gì?', a: 'Khu thương mại được trang bị hệ thống an ninh 24/7, bãi đậu xe thông minh sức chứa 2000 ô tô, hệ thống wifi công cộng, máy lạnh trung tâm cho khu vực mall, và dịch vụ vệ sinh chuyên nghiệp.' },
  ];

  const testimonials = [
    { name: 'Nguyễn Văn A', role: 'CEO Chuỗi Cafe M', content: 'Vị trí mặt bằng tại đây thực sự đắc địa. Lưu lượng khách hàng đi bộ mỗi ngày rất đông, giúp doanh thu của quán chúng tôi luôn vượt chỉ tiêu.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name: 'Trần Thị B', role: 'Founder Thương hiệu Thời Trang X', content: 'Thiết kế shophouse tối ưu không gian trưng bày. Cửa kính full-height giúp mặt tiền cửa hàng luôn nổi bật. Tôi rất hài lòng với quyết định đầu tư này.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Lê Hoàng C', role: 'Nhà Đầu Tư Cá Nhân', content: 'Chính sách cam kết thuê lại từ chủ đầu tư giúp tôi hoàn toàn an tâm về dòng tiền. Thủ tục pháp lý minh bạch và bàn giao đúng tiến độ.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  ];

  // --- Filtering Logic for Available Spaces ---
  const filteredSpaces = availableSpaces.filter(space => {
    const matchesSearch = searchQuery === '' || 
      space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'Tất cả' || space.type === filterType;

    let matchesPrice = true;
    if (filterPrice === 'under-5') {
      matchesPrice = space.priceValue < 5;
    } else if (filterPrice === '5-15') {
      matchesPrice = space.priceValue >= 5 && space.priceValue <= 15;
    } else if (filterPrice === 'over-15') {
      matchesPrice = space.priceValue > 15;
    }

    let matchesSize = true;
    if (filterSize === 'under-50') {
      matchesSize = space.areaValue < 50;
    } else if (filterSize === '50-150') {
      matchesSize = space.areaValue >= 50 && space.areaValue <= 150;
    } else if (filterSize === 'over-150') {
      matchesSize = space.areaValue > 150;
    }

    return matchesSearch && matchesType && matchesPrice && matchesSize;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert('Vui lòng điền đầy đủ họ tên và số điện thoại.');
      return;
    }
    setContactSubmitted(true);
  };

  const renderTopBanner = () => (
    <div style={{ backgroundColor: theme.primary, color: '#fff' }} className="py-2 px-4 text-center text-sm font-medium tracking-wide">
      <span className="inline-flex items-center gap-2">
        <Zap size={16} className="animate-pulse text-amber-300" />
        SỰ KIỆN KHAI TRƯƠNG TỔ HỢP SHOPHOUSE THƯƠNG MẠI - CHIẾT KHẤU LÊN ĐẾN 5%
        <Zap size={16} className="animate-pulse text-amber-300" />
      </span>
    </div>
  );

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm transition-all duration-300">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <h1 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <Store className="w-8 h-8" />
              PlatformBDS<span style={{ color: theme.accent }}>.</span>
            </h1>
          </div>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  style={{ fontFamily: theme.fontBody }}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    currentPage === link.id ? 'text-amber-700 border-b-2 border-amber-500' : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium transition-all transform hover:scale-105"
              style={{ backgroundColor: theme.accent, fontFamily: theme.fontBody }}
            >
              <Phone size={18} />
              <span>0909.888.999</span>
            </button>
            {isMobile && (
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-amber-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
             <button
             key={link.id}
             onClick={() => {
               setCurrentPage(link.id);
               setIsMobileMenuOpen(false);
             }}
             className="text-left py-2 text-lg font-medium text-gray-800"
           >
             {link.label}
           </button>
          ))}
        </div>
      )}
    </header>
  );

  const renderHome = () => (
    <div className="w-full overflow-hidden" style={{ backgroundColor: theme.bg, fontFamily: theme.fontBody }}>
      
      {/* 3. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" 
            alt="Khu thương mại sầm uất" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-black/60 mix-blend-multiply" />
        </div>
        
        <div className={`relative z-10 ${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 text-center text-white`}>
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Tổ Hợp Thương Mại Đẳng Cấp
          </span>
          <h2 style={{ fontFamily: theme.fontHeading }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Kinh Doanh Đắc Lợi <br/> <span className="text-amber-400">Sinh Lời Bền Vững</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Sở hữu mặt bằng kinh doanh tại tọa độ giao thương sầm uất nhất khu vực. Nơi hội tụ các thương hiệu hàng đầu và dòng khách không giới hạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('projects')}
              style={{ backgroundColor: theme.primary }} 
              className="px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-800 transition-colors flex items-center gap-2 shadow-lg"
            >
              Khám Phá Mặt Bằng <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => {
                setSelectedArticle(newsArticles[0]);
              }}
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white/50 hover:bg-white hover:text-amber-900 transition-colors flex items-center gap-2 backdrop-blur-sm"
            >
              <Play size={20} /> Xem Video Thực Tế
            </button>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-20">
          <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full border-r border-gray-100 px-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Loại Bất Động Sản</p>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full font-medium text-gray-800 outline-none bg-transparent appearance-none"
              >
                <option value="Tất cả">Tất cả loại mặt bằng</option>
                <option value="Shophouse F&B">Shophouse F&B</option>
                <option value="Kiosk Bán Lẻ">Kiosk Bán Lẻ</option>
                <option value="Retail Anchor">Retail Anchor</option>
              </select>
            </div>
            <div className="flex-1 w-full border-r border-gray-100 px-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Diện Tích</p>
              <select 
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="w-full font-medium text-gray-800 outline-none bg-transparent appearance-none"
              >
                <option value="Tất cả">Bất kỳ</option>
                <option value="under-50">Dưới 50m²</option>
                <option value="50-150">50 - 150m²</option>
                <option value="over-150">Trên 150m²</option>
              </select>
            </div>
            <div className="flex-1 w-full px-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Mức Giá</p>
              <select 
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full font-medium text-gray-800 outline-none bg-transparent appearance-none"
              >
                <option value="Tất cả">Tất cả mức giá</option>
                <option value="under-5">Dưới 5 Tỷ</option>
                <option value="5-15">5 - 15 Tỷ</option>
                <option value="over-15">Trên 15 Tỷ</option>
              </select>
            </div>
            <button 
              onClick={() => setCurrentPage('projects')}
              style={{ backgroundColor: theme.accent }} 
              className="w-full md:w-auto p-4 rounded-xl text-white hover:scale-105 transition-transform flex items-center justify-center"
            >
              <Search size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Spacer for floating search bar */}
      <div className="h-20" />

      {/* 4. AVAILABLE SPACES */}
      <section className="py-20">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16">
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl md:text-5xl font-bold mb-4">Mặt Bằng Nổi Bật</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Tuyển tập những vị trí đắc địa nhất, sẵn sàng bàn giao cho các thương hiệu khai thác kinh doanh ngay hôm nay.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableSpaces.slice(0, 6).map((space) => (
              <div 
                key={space.id} 
                onClick={() => setSelectedProject(space)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-amber-50 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 uppercase tracking-wide">
                    {space.status}
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={space.img} alt={space.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-amber-400 font-semibold text-lg">{space.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 uppercase font-semibold">
                    <Store size={14} className="text-amber-500" />
                    <span>{space.type}</span>
                  </div>
                  <h4 style={{ fontFamily: theme.fontHeading }} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {space.title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {space.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center gap-1 min-w-0"><MapPin size={16} className="text-amber-500 flex-shrink-0"/> <span className="truncate">{space.location}</span></div>
                    <div className="flex items-center gap-1 flex-shrink-0"><ShoppingBag size={16} className="text-amber-500"/> {space.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('projects')}
              className="px-8 py-3 rounded-full border border-amber-600 text-amber-700 font-semibold hover:bg-amber-50 transition-colors inline-flex items-center gap-2"
            >
              Xem Tất Cả Sản Phẩm <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SPACE TYPES (Categories) */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: <Coffee size={40} className="mb-4 text-amber-600" />, label: 'Shophouse F&B', count: '24 Căn', typeName: 'Shophouse F&B' },
              { icon: <Store size={40} className="mb-4 text-amber-600" />, label: 'Retail Fashion', count: '18 Căn', typeName: 'Kiosk Bán Lẻ' },
              { icon: <Utensils size={40} className="mb-4 text-amber-600" />, label: 'Retail Anchor', count: '12 Căn', typeName: 'Retail Anchor' },
              { icon: <Scissors size={40} className="mb-4 text-amber-600" />, label: 'Dịch Vụ - Spa', count: '15 Căn', typeName: 'Kiosk Bán Lẻ' },
            ].map((type, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setFilterType(type.typeName);
                  setCurrentPage('projects');
                }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="p-6 bg-amber-50 rounded-2xl group-hover:bg-amber-100 group-hover:-translate-y-2 transition-all duration-300 shadow-sm border border-amber-100">
                  {type.icon}
                </div>
                <h4 className="mt-4 font-bold text-gray-800">{type.label}</h4>
                <p className="text-sm text-amber-600">{type.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTFALL STATS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-900 z-0">
           <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1519711681284-9c4c7c8ec6b5?w=1200&q=80" alt="Crowd" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        </div>
        <div className={`relative z-10 ${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-amber-500/30">
            {[
              { num: '50.000+', label: 'Lượt khách mỗi ngày', icon: <Users size={24}/> },
              { num: '300+', label: 'Thương hiệu đối tác', icon: <Building2 size={24}/> },
              { num: '95%', label: 'Tỷ lệ lấp đầy', icon: <TrendingUp size={24}/> },
              { num: '12%', label: 'Lợi nhuận kỳ vọng/năm', icon: <Star size={24}/> },
            ].map((stat, idx) => (
              <div key={idx} className="py-6 md:py-0 px-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 mb-4 backdrop-blur-sm">
                  {stat.icon}
                </div>
                <h4 style={{ fontFamily: theme.fontHeading }} className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.num}</h4>
                <p className="text-amber-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TENANT MIX (Logos) */}
      <section className="py-16 bg-white overflow-hidden">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Cộng Đồng Thương Hiệu Tinh Hoa</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['STARBUCKS', 'HIGHLANDS', 'ZARA', 'UNIQLO', 'KFC', 'CGV CINEMA'].map((brand, i) => (
              <div key={i} className="text-2xl font-black text-gray-800 uppercase tracking-tighter" style={{ fontFamily: theme.fontHeading }}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ABOUT: Developer Story */}
      <section className="py-20">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80" alt="Kiến trúc hiện đại" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                  <p style={{ fontFamily: theme.fontHeading }} className="text-4xl font-bold mb-1">15+</p>
                  <p className="text-sm uppercase font-semibold tracking-wider">Năm Kinh Nghiệm<br/>Phát Triển</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Câu Chuyện Phát Triển</span>
              <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-4xl lg:text-5xl font-bold leading-tight">
                Kiến Tạo Tâm Điểm Giao Thương Mới
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chúng tôi không chỉ xây dựng những khối bê tông, mà tạo ra một hệ sinh thái thương mại sống động. Nơi mỗi mét vuông đều được thiết kế tỉ mỉ để tối ưu hóa trải nghiệm mua sắm và gia tăng giá trị kinh doanh cho nhà đầu tư.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  'Kiến trúc biểu tượng, tối ưu không gian mở',
                  'Đơn vị quản lý vận hành chuẩn quốc tế',
                  'Hỗ trợ toàn diện cho khách thuê và chủ sở hữu'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-amber-500 mt-1" size={20} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="text-amber-700 font-bold hover:text-amber-900 flex items-center gap-2 uppercase tracking-wide text-sm border-b-2 border-amber-700 pb-1"
                >
                  Đọc Thêm Về Chủ Đầu Tư <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LOCATION ADVANTAGES & 10. FLOOR MAP */}
      <section className="py-20 bg-gray-900 text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
        <div className={`relative z-10 ${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm">Vị Trí & Mặt Bằng</span>
            <h3 style={{ fontFamily: theme.fontHeading }} className="text-3xl md:text-5xl font-bold mt-2 mb-6">Tọa Độ Kim Cương</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Vị trí trung tâm kết nối hàng vạn cư dân, với thiết kế mặt bằng thông minh giúp dòng khách lưu thông xuyên suốt.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            <div className="w-full lg:w-1/3 space-y-8">
              {[
                { icon: <MapPin/>, title: 'Trung Tâm Lõi Đô Thị', desc: 'Nằm ngay ngã tư huyết mạch, đón trọn lưu lượng giao thông.' },
                { icon: <Car/>, title: 'Bãi Đậu Xe Thông Minh', desc: 'Sức chứa lớn, đáp ứng nhu cầu đỗ xe của hàng ngàn khách hàng.' },
                { icon: <Shield/>, title: 'An Ninh Tiên Tiến', desc: 'Hệ thống camera giám sát và đội ngũ bảo vệ chuyên nghiệp 24/7.' }
              ].map((adv, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                    {adv.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{adv.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full lg:w-2/3 bg-white/5 p-4 rounded-3xl backdrop-blur-md border border-white/10">
              <div 
                onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80')}
                className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" alt="Sơ đồ mặt bằng" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-amber-900/40 flex items-center justify-center group-hover:bg-amber-900/20 transition-colors">
                  <div className="bg-white/90 backdrop-blur text-amber-900 px-6 py-3 rounded-full font-bold flex items-center gap-2">
                    <Search size={20} /> Xem Sơ Đồ Chi Tiết
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. GALLERY PREVIEW */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl md:text-5xl font-bold">Không Gian Trải Nghiệm</h3>
            </div>
            <button 
              onClick={() => {
                setCurrentPage('gallery');
                setSelectedGalleryTab('Tất cả');
              }}
              className="hidden md:flex text-amber-700 font-bold hover:text-amber-900 items-center gap-2"
            >
              Xem Toàn Bộ Thư Viện <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            <div 
              onClick={() => setSelectedGalleryImg(galleryImages[0].url)}
              className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={galleryImages[0].url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Gallery 1"/>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(galleryImages[1].url)}
              className="md:col-span-2 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={galleryImages[1].url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Gallery 2"/>
            </div>
            <div 
              onClick={() => setSelectedGalleryImg(galleryImages[2].url)}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={galleryImages[2].url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Gallery 3"/>
            </div>
            <div 
              onClick={() => {
                setCurrentPage('gallery');
                setSelectedGalleryTab('Tất cả');
              }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={galleryImages[3].url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Gallery 4"/>
              <div className="absolute inset-0 bg-amber-900/60 flex items-center justify-center hover:bg-amber-900/50 transition-colors">
                <span className="text-white font-bold text-lg">+{galleryImages.length - 3} Ảnh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="py-20 bg-amber-50 relative">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-16">
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl md:text-5xl font-bold mb-4">Góc Nhìn Từ Đối Tác</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 relative mt-8">
                <div className="absolute -top-8 left-8">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={testi.img} alt={testi.name} className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover" />
                </div>
                <Quote className="text-amber-200 w-12 h-12 absolute top-8 right-8" />
                <div className="pt-8">
                  <p className="text-gray-600 mb-6 italic leading-relaxed relative z-10">“{testi.content}”</p>
                  <h5 className="font-bold text-gray-900">{testi.name}</h5>
                  <p className="text-sm text-amber-600">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. NEWS PREVIEW */}
      <section className="py-20">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
           <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Thị Trường Bán Lẻ</span>
              <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl md:text-4xl font-bold mt-2">Tin Tức & Phân Tích</h3>
            </div>
            <button 
              onClick={() => setCurrentPage('news')}
              className="hidden md:flex text-gray-500 hover:text-amber-700 font-medium items-center gap-2"
            >
              Xem Tất Cả <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.slice(0, 3).map((article) => (
              <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-amber-50 shadow-sm hover:shadow-md transition-all p-4"
              >
                <div className="overflow-hidden rounded-xl mb-4 relative h-48">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-amber-600 flex items-center gap-1 shadow-sm">
                    <Calendar size={12} /> {article.date}
                  </div>
                </div>
                <h4 style={{ fontFamily: theme.fontHeading }} className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-600 line-clamp-2 text-sm">
                  {article.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-3xl mx-auto">
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl md:text-4xl font-bold text-center mb-10">Câu Hỏi Thường Gặp</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <button 
                    className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-amber-50 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="font-bold text-left text-gray-800">{faq.q}</span>
                    <ChevronDown size={20} className={`text-amber-600 transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === i && (
                    <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. CONTACT CTA & 16. NEWSLETTER */}
      <section className="py-0">
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 py-20`}>
          <div className="bg-amber-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="Office" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
            </div>
            <div className="relative z-10 p-10 md:p-20 text-center max-w-4xl mx-auto">
              <h3 style={{ fontFamily: theme.fontHeading }} className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bạn Đã Sẵn Sàng Khởi Sự Kinh Doanh?
              </h3>
              <p className="text-amber-100 text-lg mb-10">
                Để lại thông tin để nhận báo giá chi tiết, sơ đồ mặt bằng và thư mời tham quan thực tế dự án.
              </p>
              
              {newsletterSubmitted ? (
                <div className="bg-white/10 p-8 rounded-2xl border border-white/20 text-center max-w-md mx-auto backdrop-blur-md">
                  <CheckCircle size={40} className="text-amber-400 mx-auto mb-3" />
                  <p className="text-white font-bold text-xl">Đăng ký thành công!</p>
                  <p className="text-amber-200 text-sm mt-2">Chúng tôi đã ghi nhận email của bạn và sẽ gửi tài liệu trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNewsletterSubmitted(true);
                  }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="Nhập email của bạn..." 
                    className="px-6 py-4 rounded-full w-full max-w-md bg-white/10 border border-white/20 text-white placeholder-amber-200/60 focus:outline-none focus:border-amber-400 backdrop-blur-md text-sm"
                  />
                  <button type="submit" style={{ backgroundColor: theme.accent }} className="px-8 py-4 rounded-full text-white font-bold hover:bg-amber-400 transition-colors whitespace-nowrap">
                    Nhận Báo Giá Ngay
                  </button>
                </form>
              )}
              <p className="text-amber-200/60 text-xs mt-4">
                *Thông tin của bạn được bảo mật tuyệt đối theo chính sách của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

  const renderProjects = () => (
    <div className="py-20" style={{ backgroundColor: theme.bg, minHeight: '80vh', fontFamily: theme.fontBody }}>
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-4xl font-bold">Mặt Bằng Cho Thuê & Bán</h2>
            <p className="text-gray-600 mt-2">Tìm kiếm vị trí kinh doanh hoàn hảo cho thương hiệu của bạn</p>
          </div>
          
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilterType('Tất cả');
              setFilterPrice('Tất cả');
              setFilterSize('Tất cả');
            }}
            className="text-sm font-semibold text-amber-700 hover:text-amber-900 border-b border-amber-700 pb-0.5"
          >
            Đặt lại bộ lọc
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-amber-50">
          <div>
            <label className="block text-xs text-gray-400 uppercase font-semibold mb-2">Tìm kiếm từ khóa</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên, vị trí, phân khu..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 uppercase font-semibold mb-2">Loại Mặt Bằng</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-sm"
            >
              <option value="Tất cả">Tất cả loại mặt bằng</option>
              <option value="Shophouse F&B">Shophouse F&B</option>
              <option value="Kiosk Bán Lẻ">Kiosk Bán Lẻ</option>
              <option value="Retail Anchor">Retail Anchor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase font-semibold mb-2">Khoảng Diện Tích</label>
            <select 
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-sm"
            >
              <option value="Tất cả">Tất cả diện tích</option>
              <option value="under-50">Dưới 50m²</option>
              <option value="50-150">50 - 150m²</option>
              <option value="over-150">Trên 150m²</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase font-semibold mb-2">Mức Giá Đầu Tư</label>
            <select 
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-sm"
            >
              <option value="Tất cả">Tất cả mức giá</option>
              <option value="under-5">Dưới 5 Tỷ</option>
              <option value="5-15">5 - 15 Tỷ</option>
              <option value="over-15">Trên 15 Tỷ</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredSpaces.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Store size={48} className="mx-auto text-gray-300 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy mặt bằng phù hợp</h3>
            <p className="text-gray-500">Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpaces.map((space) => (
              <div 
                key={space.id} 
                onClick={() => setSelectedProject(space)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-amber-50 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 uppercase tracking-wide">
                    {space.status}
                  </div>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={space.img} alt={space.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-amber-400 font-semibold text-lg">{space.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 uppercase font-semibold">
                    <Store size={14} className="text-amber-500" />
                    <span>{space.type}</span>
                  </div>
                  <h4 style={{ fontFamily: theme.fontHeading }} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {space.title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {space.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center gap-1 min-w-0"><MapPin size={16} className="text-amber-500 flex-shrink-0"/> <span className="truncate">{space.location}</span></div>
                    <div className="flex items-center gap-1 flex-shrink-0"><ShoppingBag size={16} className="text-amber-500"/> {space.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => {
    const milestones = [
      { year: '2021', title: 'Khởi đầu hành trình', desc: 'Động thổ dự án, hoàn thiện cơ sở hạ tầng giao thông và điện nước ngầm toàn khu.' },
      { year: '2023', title: 'Hoàn thiện cất nóc', desc: 'Hoàn thành thi công thô khu shophouse mặt lộ lớn và bàn giao kỹ thuật đợt 1.' },
      { year: '2025', title: 'Khai trương vận hành', desc: 'Khai trương tổ hợp mua sắm Central Mall, lấp đầy 80% gian hàng giai đoạn một.' },
      { year: '2026', title: 'Phát triển bùng nổ', desc: 'Đạt mốc 50,000+ lượt khách trải nghiệm mỗi ngày, hình thành tâm điểm kinh doanh mới.' }
    ];

    const leadership = [
      { name: 'Nguyễn Minh Trí', role: 'Chủ Tịch HĐQT', desc: '15 năm kinh nghiệm quản lý quỹ đầu tư & phát triển bất động sản thương mại cao cấp.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
      { name: 'Trần Thị Hương Giang', role: 'Giám Đốc Vận Hành', desc: 'Cựu giám đốc vận hành chuỗi TTTM Quốc tế lớn tại VN, chuyên gia tối ưu hóa tenant-mix.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
      { name: 'Lê Hữu Đạt', role: 'Giám Đốc Thiết Kế', desc: 'Kiến trúc sư trưởng đứng sau các quy hoạch đô thị bán lẻ thông minh và chuẩn mực.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' }
    ];

    const coreValues = [
      { title: 'Tín nhiệm hàng đầu', desc: 'Chúng tôi bảo chứng cho sự minh bạch tối đa về pháp lý (sổ hồng trao tay) và tiến độ thi công đúng cam kết.' },
      { title: 'Tối ưu hiệu suất', desc: 'Từng centimet vuông thiết kế được tối ưu hóa luồng di chuyển đón đầu dòng khách hàng mua sắm liên tục.' },
      { title: 'Đồng hành đối tác', desc: 'Không dừng lại ở việc bán/cho thuê, chúng tôi đồng hành tiếp thị, tổ chức sự kiện thu hút khách mua sắm cho bạn.' }
    ];

    return (
      <div className="py-20 bg-white" style={{ minHeight: '80vh', fontFamily: theme.fontBody }}>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          {/* Header Story */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <div className="w-full lg:w-1/2">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80" alt="About us" className="rounded-2xl shadow-xl w-full h-auto" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-amber-600 font-bold uppercase tracking-wider text-xs block">Về PlatformBDS</span>
              <h2 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-4xl font-bold leading-tight">
                Kiến Tạo Hệ Sinh Thái Bán Lẻ Đẳng Cấp
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Khởi nguồn từ khao khát kiến tạo những trung tâm giao thương sầm uất, PlatformBDS tự hào mang đến tổ hợp Shophouse và mặt bằng bán lẻ hiện đại bậc nhất. Chúng tôi hiểu rằng, một vị trí kinh doanh đắc địa không chỉ là nơi giao dịch, mà còn là nơi kiến tạo nên giá trị thương hiệu và trải nghiệm mua sắm tuyệt vời.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Với thiết kế quy hoạch thông minh, tối ưu hoá không gian mở và sự phân bổ dòng khách hợp lý, dự án cam kết mang lại hiệu quả sinh lời tối đa cho nhà đầu tư và chủ doanh nghiệp.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20 bg-amber-50/50 rounded-[2rem] p-10 border border-amber-100">
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl font-bold text-center mb-10">Giá Trị Cốt Lõi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((val, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                      {idx + 1}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones / Timeline */}
          <div className="mb-20">
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl font-bold text-center mb-12">Lịch Sử & Cột Mốc Phát Triển</h3>
            <div className="relative border-l-2 border-amber-200 ml-4 md:ml-32">
              {milestones.map((mile, i) => (
                <div key={i} className="mb-10 ml-8 relative">
                  {/* Dot */}
                  <span className="absolute -left-12 top-1.5 bg-amber-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                    ✓
                  </span>
                  
                  {/* Year Box (Left desktop view mockup) */}
                  <div className="absolute -left-44 top-0.5 hidden md:block w-28 text-right">
                    <span className="text-2xl font-black text-amber-700" style={{ fontFamily: theme.fontHeading }}>{mile.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="inline-block md:hidden text-amber-700 font-bold text-lg mb-1">{mile.year}</span>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{mile.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{mile.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h3 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-3xl font-bold text-center mb-12">Ban Lãnh Đạo Sáng Lập</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((member, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="h-64 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-amber-700 text-sm font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderGallery = () => {
    const filteredImages = selectedGalleryTab === 'Tất cả' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedGalleryTab);

    return (
      <div className="py-20" style={{ backgroundColor: theme.bg, minHeight: '80vh', fontFamily: theme.fontBody }}>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-4xl font-bold mb-4">Thư Viện Không Gian & Kiến Trúc</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trực quan hóa thiết kế shophouse, kiosk và các hoạt động thương mại sôi động tại dự án.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                style={{
                  backgroundColor: selectedGalleryTab === tab ? theme.primary : '#fff',
                  color: selectedGalleryTab === tab ? '#fff' : '#4B5563'
                }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all border border-amber-100"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedGalleryImg(img.url)}
                className="aspect-square bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg border border-amber-50 cursor-pointer relative"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">{img.category}</span>
                  <p className="text-white text-sm font-semibold leading-tight">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = newsArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
                            article.summary.toLowerCase().includes(searchNewsQuery.toLowerCase());
      const matchesCategory = selectedNewsCategory === 'Tất cả' || article.category === selectedNewsCategory;
      return matchesSearch && matchesCategory;
    });

    const newsCategories = ['Tất cả', 'Xu Hướng', 'Kinh Nghiệm', 'Thị Trường', 'Sự Kiện'];

    return (
      <div className="py-20 bg-white" style={{ minHeight: '80vh', fontFamily: theme.fontBody }}>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Cập Nhật & Phân Tích</span>
            <h2 style={{ fontFamily: theme.fontHeading, color: theme.primary }} className="text-4xl font-bold mt-2">Tin Tức Thị Trường</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-2">Nơi tổng hợp thông tin pháp lý, cơ hội đầu tư và xu hướng shophouse/bán lẻ hàng đầu.</p>
          </div>

          {/* Search and Category Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-gray-100 pb-8">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {newsCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedNewsCategory(cat)}
                  style={{
                    backgroundColor: selectedNewsCategory === cat ? theme.primary : '#f3f4f6',
                    color: selectedNewsCategory === cat ? '#fff' : '#4b5563'
                  }}
                  className="px-4 py-2 rounded-full text-xs font-semibold hover:shadow-sm transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                placeholder="Tìm tin tức..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>

          {/* News List */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy bài viết</h3>
              <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
                >
                  <div>
                    <div className="overflow-hidden relative h-56">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 flex items-center gap-1 shadow-sm">
                        <Calendar size={12} className="text-amber-500" /> {article.date}
                      </div>
                      <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 style={{ fontFamily: theme.fontHeading }} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-amber-700 font-semibold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:text-amber-900 transition-colors">
                      Đọc Chi Tiết <ChevronRight size={14} />
                    </span>
                    <span className="text-xs text-gray-400">Xem thêm</span>
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
      <div className="py-20" style={{ backgroundColor: theme.bg, minHeight: '80vh', fontFamily: theme.fontBody }}>
        <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-amber-100">
            <div className="w-full lg:w-5/12 bg-amber-900 text-white p-12 flex flex-col justify-between">
              <div>
                <h3 style={{ fontFamily: theme.fontHeading }} className="text-3xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h3>
                <p className="text-amber-100 mb-12">Đội ngũ chuyên viên tư vấn giàu kinh nghiệm luôn sẵn sàng hỗ trợ quý khách.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="text-amber-400" size={24} />
                    <div>
                      <p className="text-sm text-amber-200">Hotline Tư Vấn</p>
                      <p className="font-bold text-xl">0909.888.999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="text-amber-400" size={24} />
                    <div>
                      <p className="text-sm text-amber-200">Email Hỗ Trợ</p>
                      <p className="font-bold text-lg">sales@platformbds.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-amber-400 shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-amber-200">Văn Phòng Sales Gallery</p>
                      <p className="font-medium">123 Đại lộ Thương Mại, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Google Map */}
                <div className="mt-8 rounded-2xl overflow-hidden border border-amber-800 shadow-md flex flex-col h-48 bg-amber-950">
                  <div className="px-3.5 py-2 bg-amber-950 text-white flex items-center justify-between text-xs">
                    <span className="font-bold truncate text-amber-300">Sales Gallery Quận 1, TP.HCM</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%ADn+1,+TP.+H%E1%BB%93+Ch%C3%AD+Minh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-[10px] shrink-0"
                    >
                      Mở Maps
                    </a>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <iframe
                      title="Bản đồ Sales Gallery Quận 1"
                      src="https://maps.google.com/maps?q=Qu%E1%BA%ADn+1,+TP.+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-amber-800/60 text-xs text-amber-200/60">
                Làm việc từ 8:00 đến 21:00 hàng ngày (kể cả Thứ 7 & Chủ Nhật)
              </div>
            </div>
            
            <div className="w-full lg:w-7/12 p-12">
              {contactSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle size={48} />
                  </div>
                  <h3 style={{ fontFamily: theme.fontHeading }} className="text-3xl font-bold text-gray-900 mb-4">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
                    Cảm ơn <strong>{contactName}</strong> đã quan tâm đến dự án. Yêu cầu tư vấn của bạn đã được chuyển đến bộ phận kinh doanh. Chúng tôi sẽ phản hồi qua số điện thoại <strong>{contactPhone}</strong> trong vòng 15 phút.
                  </p>
                  <button 
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactPhone('');
                      setContactMessage('');
                    }}
                    style={{ backgroundColor: theme.primary }}
                    className="px-8 py-3 rounded-full text-white font-semibold hover:bg-amber-800 transition-colors"
                  >
                    Gửi yêu cầu mới
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow text-sm" 
                        placeholder="Nhập họ tên" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số Điện Thoại <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow text-sm" 
                        placeholder="Nhập số điện thoại" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sản Phẩm Quan Tâm</label>
                    <select 
                      value={contactProduct}
                      onChange={(e) => setContactProduct(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-sm"
                    >
                      <option value="Shophouse F&B">Shophouse F&B</option>
                      <option value="Mặt bằng bán lẻ">Mặt bằng bán lẻ (Retail Anchor)</option>
                      <option value="Kiosk thương mại">Kiosk thương mại (Kiosk Bán Lẻ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lời Nhắn</label>
                    <textarea 
                      rows={4} 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow text-sm" 
                      placeholder="Yêu cầu cụ thể của bạn..."
                    />
                  </div>
                  <button 
                    type="submit"
                    style={{ backgroundColor: theme.primary }} 
                    className="w-full py-4 rounded-lg text-white font-bold text-lg hover:bg-amber-800 transition-colors"
                  >
                    Gửi Yêu Cầu Tư Vấn
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-amber-600 font-sans">
      <div className={`${MAX_W} mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 */}
          <div>
            <h2 style={{ fontFamily: theme.fontHeading }} className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <Store className="text-amber-500" />
              PlatformBDS<span className="text-amber-500">.</span>
            </h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Tổ hợp thương mại đỉnh cao, nơi hội tụ các thương hiệu lớn và kiến tạo cơ hội đầu tư sinh lời bền vững tại trung tâm thành phố.
            </p>
            <div className="flex gap-4">
              <button onClick={() => alert('Mở Facebook')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"><Facebook size={18}/></button>
              <button onClick={() => alert('Mở Instagram')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"><Instagram size={18}/></button>
              <button onClick={() => alert('Mở Twitter')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"><Twitter size={18}/></button>
            </div>
          </div>
          
          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Liên Kết Nhanh</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-amber-400 transition-colors">Trang Chủ</button></li>
              <li><button onClick={() => setCurrentPage('projects')} className="hover:text-amber-400 transition-colors">Mặt Bằng Cho Thuê</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors">Chủ Đầu Tư</button></li>
              <li><button onClick={() => setCurrentPage('gallery')} className="hover:text-amber-400 transition-colors">Thư Viện</button></li>
              <li><button onClick={() => setCurrentPage('news')} className="hover:text-amber-400 transition-colors">Tin Tức Thị Trường</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-amber-400 transition-colors">Liên Hệ Đặt Chỗ</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Thông Tin Pháp Lý</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors cursor-pointer">Chính sách bảo mật</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors cursor-pointer">Điều khoản sử dụng</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors cursor-pointer">Quy định giao dịch</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors cursor-pointer">Sổ tay cư dân & khách thuê</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Văn Phòng Giao Dịch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span>123 Đại lộ Thương Mại, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 flex-shrink-0" />
                <span>0909.888.999 (24/7)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 flex-shrink-0" />
                <span>sales@platformbds.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 PlatformBDS. Tất cả quyền được bảo lưu.</p>
          <p className="mt-2 md:mt-0">Thiết kế với <span className="text-amber-500">♥</span> dành cho nhà đầu tư</p>
        </div>
      </div>
    </footer>
  );

  // --- Project Modal ---
  const renderProjectModal = () => {
    if (!selectedProject) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        />
        
        <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-amber-100 flex flex-col md:flex-row">
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-md transition-colors z-20"
          >
            <X size={20} />
          </button>
          
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedProject.status}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-wider text-xs block mb-1">
                {selectedProject.type}
              </span>
              <h3 style={{ fontFamily: theme.fontHeading }} className="text-2xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h3>
              
              <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-6 bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                <div className="flex items-center gap-1"><MapPin size={14} className="text-amber-500"/> {selectedProject.location}</div>
                <div className="flex items-center gap-1"><ShoppingBag size={14} className="text-amber-500"/> {selectedProject.area}</div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              
              <h4 className="font-bold text-sm text-gray-800 mb-2 uppercase tracking-wider">Thông số chi tiết:</h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.specifications.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-amber-500 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">Giá Đầu Tư</p>
                <p className="text-amber-700 font-bold text-xl">{selectedProject.price}</p>
              </div>
              
              <button 
                onClick={() => {
                  setContactProduct(selectedProject.type);
                  setContactMessage(`Tôi muốn nhận thông tin chi tiết và tham quan căn hộ: ${selectedProject.title}`);
                  setSelectedProject(null);
                  setCurrentPage('contact');
                }}
                style={{ backgroundColor: theme.primary }}
                className="px-6 py-3 rounded-full text-white font-bold text-sm hover:bg-amber-800 transition-colors flex items-center gap-2"
              >
                <span>Liên Hệ Ngay</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Gallery Lightbox ---
  const renderGalleryLightbox = () => {
    if (!selectedGalleryImg) return null;
    const currentImgObj = galleryImages.find(img => img.url === selectedGalleryImg);
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <button 
          onClick={() => setSelectedGalleryImg(null)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center gap-4">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Lightbox view" className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10" />
          {currentImgObj && (
            <div className="text-center text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-600 text-xs font-semibold mb-2">{currentImgObj.category}</span>
              <p className="text-lg font-medium">{currentImgObj.caption}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- News Details Modal ---
  const renderNewsModal = () => {
    if (!selectedArticle) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        />
        
        <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 border border-amber-100">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-colors z-20"
          >
            <X size={20} />
          </button>
          
          <div className="h-64 relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex flex-col justify-end p-8">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {selectedArticle.category}
              </span>
              <h3 style={{ fontFamily: theme.fontHeading }} className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {selectedArticle.title}
              </h3>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
              <Calendar size={14} className="text-amber-500" />
              <span>Đăng ngày {selectedArticle.date}</span>
              <span>•</span>
              <span>Tác giả: PlatformBDS Editorial</span>
            </div>
            
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line space-y-4">
              {selectedArticle.content}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{ backgroundColor: theme.primary }}
                className="px-6 py-2.5 rounded-full text-white font-bold text-sm hover:bg-amber-800 transition-colors"
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
    <div className="min-h-screen flex flex-col w-full text-gray-800 selection:bg-amber-200 selection:text-amber-900">
      {renderTopBanner()}
      {renderHeader()}
      
      <main className="flex-grow">
        {['home'].includes(currentPage) && renderHome()}
        {['projects', 'du-an', 'san-pham', 'shophouse', 'thuong-mai'].includes(currentPage) && renderProjects()}
        {['about', 'gioi-thieu', 've-chung-toi'].includes(currentPage) && renderAbout()}
        {['gallery', 'thu-vien', 'hinh-anh'].includes(currentPage) && renderGallery()}
        {['news', 'tin-tuc', 'bai-viet'].includes(currentPage) && renderNews()}
        {['contact', 'lien-he', 'tu-van'].includes(currentPage) && renderContact()}
        {!['home', 'projects', 'du-an', 'san-pham', 'shophouse', 'thuong-mai', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'news', 'tin-tuc', 'bai-viet', 'contact', 'lien-he', 'tu-van'].includes(currentPage) && renderHome()}
      </main>
      
      {renderFooter()}

      {renderProjectModal()}
      {renderGalleryLightbox()}
      {renderNewsModal()}
    </div>
  );
}

