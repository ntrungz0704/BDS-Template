import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, Search, Phone, Mail, ChevronRight, Menu, X, CheckCircle, 
  Leaf, Sun, Compass, Map, Info, Star, ShieldCheck, ArrowRight,
  TrendingUp, TreePine, Trees, Navigation, FileText, ChevronDown, Check, Building,
  Heart, Calendar, User, Clock
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

// 6+ realistic land plot items elevated to component file scope
const LAND_PLOTS = [
  {
    id: 1,
    title: 'Đất Vườn Sinh Thái Bảo Lộc',
    location: 'Xã Lộc Ngãi, Bảo Lộc, Lâm Đồng',
    region: 'Lâm Đồng',
    type: 'Đất vườn sinh thái',
    legal: 'Sổ hồng',
    direction: 'Đông Nam',
    priceVal: 0.85, // in Billion VND
    priceText: '850 Triệu',
    size: '500m²',
    sizeVal: 500,
    img: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=800&q=80',
    status: 'Đang mở bán',
    desc: 'Khu đất vườn sinh thái view đồi cực đẹp tại Bảo Lộc, Lâm Đồng. Khí hậu mát mẻ quanh năm từ 18-22 độ C, thích hợp xây homestay nghỉ dưỡng hoặc làm vườn cây ăn trái.',
    specs: 'Mặt tiền 15m, sâu 34m, có sẵn 100m² đất thổ cư (ONT), đường nhựa hiện hữu 8m, quy hoạch đất ở nông thôn.',
    features: ['View đồi săn mây', 'Đường ô tô tránh nhau', 'Hệ thống tưới tự động', 'Có sẵn cây ăn trái']
  },
  {
    id: 2,
    title: 'KDC Phước Bình Center',
    location: 'Phước Bình, Long Thành, Đồng Nai',
    region: 'Đồng Nai',
    type: 'Đất nền dự án',
    legal: 'Sổ đỏ',
    direction: 'Nam',
    priceVal: 1.8, // in Billion VND
    priceText: '1.8 Tỷ',
    size: '120m²',
    sizeVal: 120,
    img: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800&q=80',
    status: 'Sổ đỏ trao tay',
    desc: 'Đất nền phân lô trung tâm Long Thành, ngay sát khu công nghiệp Phước Bình rộng 640ha. Tiềm năng kinh doanh xây nhà trọ cho công nhân, kỹ sư hoặc đầu tư sinh lời nhanh.',
    specs: 'Diện tích 5x24m, thổ cư 100% (ODT), đường nội bộ trải nhựa 12m có vỉa hè cây xanh, điện âm nước máy.',
    features: ['Sát khu công nghiệp', 'Hạ tầng chuẩn đô thị', 'Sổ đỏ riêng từng nền', 'Xây dựng tự do']
  },
  {
    id: 3,
    title: 'Biệt Thự Đồi Hồ Đak Long',
    location: 'Lạc Dương, Lâm Đồng',
    region: 'Lâm Đồng',
    type: 'Đất vườn sinh thái',
    legal: 'Sổ đỏ',
    direction: 'Tây Bắc',
    priceVal: 4.2, // in Billion VND
    priceText: '4.2 Tỷ',
    size: '1200m²',
    sizeVal: 1200,
    img: 'https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?w=800&q=80',
    status: 'Còn 5 nền cuối',
    desc: 'Lô đất biệt thự đồi view trực diện hồ tự nhiên tuyệt đẹp tại Lạc Dương, giáp ranh thành phố Đà Lạt. Thích hợp cho giới thượng lưu xây dựng biệt thự vườn nghỉ dưỡng cao cấp.',
    specs: 'Mặt tiền 30m, sâu 40m, đường xe hơi 6m tránh nhau thoải mái, cách trung tâm Đà Lạt chỉ 15 phút lái xe.',
    features: ['View hồ trực diện', 'Không khí ôn hòa', 'Pháp lý sạch 100%', 'Gần khu du lịch sinh thái']
  },
  {
    id: 4,
    title: 'Đất Nền Ven Biển Bình Thuận',
    location: 'Mũi Né, Phan Thiết, Bình Thuận',
    region: 'Bình Thuận',
    type: 'Đất nền thổ cư',
    legal: 'Sổ hồng',
    direction: 'Đông',
    priceVal: 2.6, // in Billion VND
    priceText: '2.6 Tỷ',
    size: '150m²',
    sizeVal: 150,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    status: 'Đang mở bán',
    desc: 'Lô đất thổ cư ven biển Mũi Né tuyệt đẹp, cách bãi tắm chỉ 200m. Nằm trong khu vực phát triển du lịch trọng điểm của Phan Thiết, thích hợp kinh doanh nhà hàng, khách sạn.',
    specs: 'Diện tích 6x25m, 100% thổ cư (ODT), mặt tiền đường nhựa lớn 16m kết nối trực tiếp ra trục đường chính Huỳnh Thúc Kháng.',
    features: ['Cách biển 200m', 'Mặt tiền đường lớn', 'Khu vực kinh doanh sầm uất', 'Đã có giấy phép xây dựng']
  },
  {
    id: 5,
    title: 'Đất Nền Phú Mỹ Tân Thành',
    location: 'Hắc Dịch, Phú Mỹ, Bà Rịa - Vũng Tàu',
    region: 'Bà Rịa - Vũng Tàu',
    type: 'Đất nền dự án',
    legal: 'Sổ đỏ',
    direction: 'Tây Nam',
    priceVal: 1.4, // in Billion VND
    priceText: '1.4 Tỷ',
    size: '100m²',
    sizeVal: 100,
    img: 'https://images.unsplash.com/photo-1590242203642-e758e57deee0?w=800&q=80',
    status: 'Đang mở bán',
    desc: 'Nằm ngay trung tâm phường Hắc Dịch, thị xã Phú Mỹ, Bà Rịa - Vũng Tàu. Vị trí đắc địa liền kề cụm công nghiệp cao nghệ cao 450ha. Giao thông thuận lợi kết nối cảng Cái Mép.',
    specs: 'Diện tích 5x20m, thổ cư 80m², đường nhựa nội bộ 12m thông thoáng, hệ thống điện chiếu sáng công cộng đầy đủ.',
    features: ['Kề cụm CN cao', 'Kết nối cảng Cái Mép', 'Hạ tầng hoàn thiện', 'Giá rẻ đầu tư F0']
  },
  {
    id: 6,
    title: 'Khu Dân Cư Long Thành Airport',
    location: 'Bình Sơn, Long Thành, Đồng Nai',
    region: 'Đồng Nai',
    type: 'Đất nền thổ cư',
    legal: 'Sổ hồng',
    direction: 'Đông Bắc',
    priceVal: 2.1, // in Billion VND
    priceText: '2.1 Tỷ',
    size: '110m²',
    sizeVal: 110,
    img: 'https://images.unsplash.com/photo-1582269986345-096dcd37076e?w=800&q=80',
    status: 'Sổ hồng trao tay',
    desc: 'Lô đất đón đầu quy hoạch sân bay quốc tế Long Thành, cách cổng sân bay chỉ 10 phút di chuyển. Nằm trong khu dân cư hiện hữu sầm uất, an ninh đảm bảo.',
    specs: 'Diện tích 5x22m, thổ cư 100% (ODT), đường trước đất rộng 10m thông thoáng, giao dịch công chứng ngay.',
    features: ['Cách sân bay 10 phút', 'Khu dân cư hiện hữu', 'Công chứng sang tên ngay', 'Sổ hồng riêng']
  },
  {
    id: 7,
    title: 'Đất Vườn Trái Cây Long Khánh',
    location: 'Hàng Gòn, Long Khánh, Đồng Nai',
    region: 'Đồng Nai',
    type: 'Đất vườn sinh thái',
    legal: 'Sổ hồng',
    direction: 'Nam',
    priceVal: 5.5, // in Billion VND
    priceText: '5.5 Tỷ',
    size: '2500m²',
    sizeVal: 2500,
    img: 'https://images.unsplash.com/photo-1498675364001-25028592388a?w=800&q=80',
    status: 'Chính chủ gửi bán',
    desc: 'Vườn cây ăn trái sum suê gồm măng cụt, chôm chôm đang cho thu hoạch tại Long Khánh. Không khí trong lành mát mẻ, có sẵn nguồn nước giếng khoan và hệ thống tưới tự động.',
    specs: 'Diện tích 2500m² đất trồng cây lâu năm, có 2 mặt tiền đường đất lớn rộng 6m xe hơi ra vào tận nơi.',
    features: ['Vườn trái cây thu hoạch', '2 mặt tiền đường', 'Hệ thống tưới tự động', 'Có sẵn nhà cấp 4']
  }
];

// 6+ news articles elevated to component file scope
const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'Cao tốc Dầu Giây - Liên Khương tạo cú hích cho BĐS Lâm Đồng',
    category: 'Hạ tầng',
    date: '10/07/2026',
    author: 'Nguyễn Minh',
    img: 'https://images.unsplash.com/photo-1590242203642-e758e57deee0?w=800&q=80',
    summary: 'Tuyến cao tốc Dầu Giây - Liên Khương dự kiến khởi công vào cuối năm nay sẽ giúp thời gian di chuyển từ TP.HCM lên Lâm Đồng rút ngắn chỉ còn 3 tiếng.',
    content: 'Dự án đường cao tốc Dầu Giây - Liên Khương có tổng chiều dài hơn 200km, đi qua hai tỉnh Đồng Nai và Lâm Đồng. Khi hoàn thành, tuyến đường này không chỉ giải quyết bài toán giao thông, nâng cao năng lực liên kết vùng mà còn tạo động lực cực lớn cho ngành du lịch và thị trường bất động sản nghỉ dưỡng Bảo Lộc, Di Linh, Đà Lạt bứt phá trong những năm tới.'
  },
  {
    id: 2,
    title: 'Xu hướng bỏ phố về rừng mua đất làm nhà vườn nghỉ dưỡng',
    category: 'Xu hướng',
    date: '05/07/2026',
    author: 'Trần Hạnh',
    img: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=800&q=80',
    summary: 'Nhiều gia đình khá giả tại các đô thị lớn có xu hướng tìm mua những mảnh đất vườn rộng từ 500m² trở lên để xây dựng "second home".',
    content: 'Trào lưu "second-home" (ngôi nhà thứ hai) đang ngày càng phổ biến đối với tầng lớp trung lưu tại Việt Nam. Các khu vực vùng cao có khí hậu mát mẻ, cảnh quan tự nhiên đẹp đẽ như Bảo Lộc, Măng Đen, hay vùng ven Đà Lạt luôn nằm trong tầm ngắm của các gia đình muốn có không gian xanh, yên tĩnh để nghỉ ngơi cuối tuần.'
  },
  {
    id: 3,
    title: 'Giá đất ven KCN tiếp tục duy trì đà tăng trưởng ổn định',
    category: 'Thị trường',
    date: '01/07/2026',
    author: 'Lê Quốc',
    img: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800&q=80',
    summary: 'Đất nền liền kề các khu công nghiệp tại Đồng Nai, Bình Dương, Bà Rịa - Vũng Tàu thu hút giới đầu tư nhờ nhu cầu ở thực của công nhân, kỹ sư.',
    content: 'Bất động sản công nghiệp tiếp tục là điểm sáng của thị trường 2026. Nhờ dòng vốn đầu tư trực tiếp nước ngoài (FDI) đổ vào mạnh mẽ, các khu dân cư quanh các khu công nghiệp lớn ghi nhận tỷ lệ lấp đầy cao. Giá thuê phòng trọ và giá đất nền phân lô tại các khu vực này duy trì mức tăng trưởng ổn định từ 15-20% mỗi năm.'
  },
  {
    id: 4,
    title: 'Sân bay Long Thành đẩy nhanh tiến độ bàn giao năm 2026',
    category: 'Hạ tầng',
    date: '28/06/2026',
    author: 'Phạm Hoàng',
    img: 'https://images.unsplash.com/photo-1582269986345-096dcd37076e?w=800&q=80',
    summary: 'Tổng công ty Cảng hàng không Việt Nam (ACV) đang dồn toàn lực thi công nhà ga hành khách và đường băng sân bay Long Thành để kịp vận hành thử nghiệm.',
    content: 'Đại công trường sân bay quốc tế Long Thành hoạt động 24/7 để đáp ứng tiến độ bàn giao khắt khe của Chính phủ. Việc sân bay sắp đi vào vận hành đã kích thích các làn sóng đầu tư vào khu vực đô thị vệ tinh Long Thành, Nhơn Trạch và các vùng lân cận, biến đây thành tọa độ nóng của thị trường bất động sản miền Nam.'
  },
  {
    id: 5,
    title: 'Kinh nghiệm kiểm tra pháp lý đất nền trước khi đặt cọc',
    category: 'Cẩm nang',
    date: '20/06/2026',
    author: 'Luật sư Trần Tiến',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80',
    summary: 'Để tránh rủi ro mua phải đất dính quy hoạch hoặc tranh chấp, nhà đầu tư cần trang bị các kiến thức cơ bản về kiểm tra sổ đỏ và thông tin trích lục.',
    content: 'Quy tắc vàng khi mua đất nền là phải có sổ đỏ riêng, đất thổ cư. Người mua cần đến trực tiếp phòng Tài nguyên & Môi trường hoặc Văn phòng đăng ký đất đai địa phương để đối chiếu thông tin quy hoạch mới nhất. Tránh mua đất bằng giấy tay hay sổ chung, vì các hình thức này tiềm ẩn rủi ro mất trắng nếu có tranh chấp xảy ra.'
  },
  {
    id: 6,
    title: 'Bất động sản ven biển Bình Thuận sôi động trở lại',
    category: 'Thị trường',
    date: '15/06/2026',
    author: 'Mai Lâm',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    summary: 'Cao tốc Phan Thiết - Dầu Giây thông xe tạo bước ngoặt lớn cho bất động sản du lịch và đất nền ven biển Phan Thiết, La Gi.',
    content: 'Du lịch Bình Thuận tăng trưởng kỷ lục từ đầu năm 2026 nhờ hạ tầng giao thông kết nối vượt trội. Đất nền ven biển hoặc các trục đường kết nối thẳng ra biển ghi nhận lượng giao dịch tăng đột biến. Phân khúc này thu hút cả nhà đầu tư trung và dài hạn từ TP.HCM nhờ dư địa tăng giá còn rất lớn.'
  }
];

// Realistic photos with different categories for Gallery sorting
const GALLERY_PHOTOS = [
  { id: 1, type: 'real', title: 'Thực tế hạ tầng đường nhựa nội khu', url: 'https://images.unsplash.com/photo-1590242203642-e758e57deee0?w=800&q=80' },
  { id: 2, type: 'real', title: 'Đất vườn đồi chè Bảo Lộc view cực đẹp', url: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=800&q=80' },
  { id: 3, type: 'map', title: 'Bản vẽ quy hoạch phân lô dự án Phước Bình', url: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80' },
  { id: 4, type: 'amenity', title: 'Đường giao thông kết nối liên huyện 12m', url: 'https://images.unsplash.com/photo-1582269986345-096dcd37076e?w=800&q=80' },
  { id: 5, type: 'real', title: 'Trục đường ven biển Phan Thiết đầy tiềm năng', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { id: 6, type: 'amenity', title: 'Khu công nghiệp kề cận dự án đã đi vào hoạt động', url: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800&q=80' },
  { id: 7, type: 'map', title: 'Sơ đồ phân thửa khu biệt thự đồi Lạc Dương', url: 'https://images.unsplash.com/photo-1620215777134-8c83e15b5e3f?w=800&q=80' },
  { id: 8, type: 'amenity', title: 'Công viên cây xanh trung tâm dự án', url: 'https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?w=800&q=80' }
];

export default function LandPlotTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
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
    : ((globalThis as any).__news_articles_ref || []);

  // Shadowing variables
  const NEWS_ARTICLES: any = activePosts;

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
    : ((globalThis as any).__land_properties_ref || []);

  // Shadowing variables
  const LAND_PROPERTIES: any = activeProjects;

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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả loại đất');
  const [filterRegion, setFilterRegion] = useState('Tất cả khu vực');
  const [filterPrice, setFilterPrice] = useState('Mọi mức giá');
  const [filterLegal, setFilterLegal] = useState('Tất cả pháp lý');
  const [filterDirection, setFilterDirection] = useState('Tất cả hướng');

  // Selected entities for Modals and Lightboxes
  const [selectedProject, setSelectedProject] = useState<typeof LAND_PLOTS[0] | null>(null);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('all');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof NEWS_ARTICLES[0] | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // About working tabs state
  const [activeAboutTab, setActiveAboutTab] = useState('vision');

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';
  
  // Theme configuration
  const theme = {
    bg: '#FAFAF7',
    primary: '#2D6A4F',
    accent: '#D4A373',
    text: '#1F2937',
    textLight: '#4B5563',
    headingFont: "'Raleway', sans-serif",
    bodyFont: "'Nunito Sans', sans-serif",
  };

  // Nav Links
  const navLinks = [
    { name: 'Trang chủ', id: 'home' },
    { name: 'Dự án', id: 'projects' },
    { name: 'Về chúng tôi', id: 'about' },
    { name: 'Thư viện', id: 'gallery' },
    { name: 'Tin tức', id: 'news' },
    { name: 'Liên hệ', id: 'contact' },
  ];
  
  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    // Reset page-specific submission success if user navigates away or to contact
    if (id !== 'contact') {
      setContactSubmitted(false);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  // Reactive state filtering logic for land plots
  const getFilteredPlots = () => {
    return LAND_PLOTS.filter(plot => {
      const matchesSearch = searchQuery === '' || 
        plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.region.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'Tất cả loại đất' || plot.type === filterType;
      const matchesRegion = filterRegion === 'Tất cả khu vực' || plot.region === filterRegion;
      const matchesLegal = filterLegal === 'Tất cả pháp lý' || plot.legal === filterLegal;
      const matchesDirection = filterDirection === 'Tất cả hướng' || plot.direction === filterDirection;
      
      let matchesPrice = true;
      if (filterPrice !== 'Mọi mức giá') {
        if (filterPrice === 'Dưới 1 tỷ') {
          matchesPrice = plot.priceVal < 1.0;
        } else if (filterPrice === '1 - 3 tỷ') {
          matchesPrice = plot.priceVal >= 1.0 && plot.priceVal <= 3.0;
        } else if (filterPrice === '3 - 5 tỷ') {
          matchesPrice = plot.priceVal >= 3.0 && plot.priceVal <= 5.0;
        } else if (filterPrice === 'Trên 5 tỷ') {
          matchesPrice = plot.priceVal > 5.0;
        }
      }
      
      return matchesSearch && matchesType && matchesRegion && matchesLegal && matchesDirection && matchesPrice;
    });
  };

  // 1. HEADER
  const renderHeader = () => (
    <header style={{ backgroundColor: theme.bg, borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50, fontFamily: theme.bodyFont }}>
      <div className={`${MAX_W} mx-auto px-4 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <TreePine size={32} style={{ color: theme.primary }} />
          <span style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: '1.5rem', color: theme.primary, letterSpacing: '-0.5px' }}>
            ĐấtNền<span style={{ color: theme.accent }}>GiaPhát</span>
          </span>
        </div>
        
        {!isMobile && !isTablet && (
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  color: currentPage === link.id ? theme.primary : theme.text,
                  fontWeight: currentPage === link.id ? 700 : 500,
                  fontSize: '1rem',
                  transition: 'color 0.2s',
                  fontFamily: theme.headingFont,
                  borderBottom: currentPage === link.id ? `2px solid ${theme.primary}` : '2px solid transparent',
                  paddingBottom: '4px'
                }}
                className="hover:text-green-800"
              >
                {link.name}
              </button>
            ))}
          </nav>
        )}

        {!isMobile && !isTablet && (
          <button 
            onClick={() => handleNavClick('contact')}
            style={{ backgroundColor: theme.primary, color: 'white', padding: '0.6rem 1.5rem', borderRadius: '4px', fontWeight: 600, transition: 'background 0.3s' }} 
            className="hover:bg-green-800"
          >
            Tư vấn đầu tư
          </button>
        )}

        {(isMobile || isTablet) && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} style={{ color: theme.text }} /> : <Menu size={28} style={{ color: theme.text }} />}
          </button>
        )}
      </div>
      
      {isMobileMenuOpen && (isMobile || isTablet) && (
        <div style={{ backgroundColor: 'white', borderTop: '1px solid #eee', position: 'absolute', width: '100%', left: 0, padding: '1rem 0', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '1rem 2rem',
                color: currentPage === link.id ? theme.primary : theme.text,
                fontWeight: currentPage === link.id ? 700 : 500,
                fontSize: '1.125rem',
                borderBottom: '1px solid #f9fafb'
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );

  // 18. FOOTER
  const renderFooter = () => (
    <footer style={{ backgroundColor: '#111827', color: 'white', fontFamily: theme.bodyFont, paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TreePine size={32} style={{ color: theme.accent }} />
              <span style={{ fontFamily: theme.headingFont, fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>
                ĐấtNền<span style={{ color: theme.accent }}>GiaPhát</span>
              </span>
            </div>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Đơn vị tiên phong cung cấp giải pháp đầu tư đất nền vùng ven, mang lại giá trị sinh lời bền vững và an toàn pháp lý cho mọi khách hàng.
            </p>
            <div className="flex gap-4">
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-white font-bold">f</span>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Liên kết nhanh</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }} 
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Dự án tiêu biểu</h4>
            <ul className="space-y-3">
              {LAND_PLOTS.slice(0, 4).map(plot => (
                <li key={plot.id}>
                  <button 
                    onClick={() => { setSelectedProject(plot); handleNavClick('projects'); }}
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    className="hover:text-white transition-colors"
                  >
                    {plot.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} style={{ color: theme.accent, flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#9CA3AF' }}>123 Đường Số 1, KĐT Nam Sài Gòn, Phường Tân Phú, Quận 7, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} style={{ color: theme.accent, flexShrink: 0 }} />
                <span style={{ color: '#9CA3AF' }}>0909 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} style={{ color: theme.accent, flexShrink: 0 }} />
                <span style={{ color: '#9CA3AF' }}>info@datnengiaphat.com.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
          <p>© {new Date().getFullYear()} Đất Nền Gia Phát. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );

  // -- HOME PAGE SECTIONS --

  // 2. HERO
  const renderHero = () => (
    <section style={{ position: 'relative', height: '85vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 2 }} />
      
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: 'white', padding: '0 20px', maxWidth: '900px' }}>
        <span style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: theme.primary, color: 'white', borderRadius: '30px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Đón đầu xu hướng 2026
        </span>
        <h1 style={{ fontFamily: theme.headingFont, fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          Đầu Tư <span style={{ color: theme.accent }}>Đất Nền</span><br />Sinh Lời Bền Vững
        </h1>
        <p style={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontFamily: theme.bodyFont, marginBottom: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          Khám phá các quỹ đất giàu tiềm năng, pháp lý minh bạch tại các khu vực đang phát triển hạ tầng trọng điểm. Cam kết lợi nhuận tối ưu cho nhà đầu tư.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => handleNavClick('projects')} style={{ backgroundColor: theme.accent, color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Xem Quỹ Đất Đang Mở Bán
            <ArrowRight size={20} />
          </button>
          <button onClick={() => handleNavClick('about')} style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.125rem' }}>
            Tìm Hiểu Về Chúng Tôi
          </button>
        </div>
      </div>
    </section>
  );

  // 3. QUICK SEARCH (INTERACTIVE AND REDIRECTS TO PROJECTS)
  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavClick('projects');
  };

  const renderQuickSearch = () => (
    <section style={{ backgroundColor: theme.bg, marginTop: '-50px', position: 'relative', zIndex: 10 }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <form onSubmit={handleQuickSearchSubmit} style={{ backgroundColor: 'white', padding: isMobile ? '1.5rem' : '2rem', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontFamily: theme.headingFont, fontWeight: 700, fontSize: '1.25rem', color: theme.text, marginBottom: '1.5rem' }}>Tìm Kiếm Cơ Hội Đầu Tư</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Loại đất</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
              >
                <option value="Tất cả loại đất">Tất cả loại đất</option>
                <option value="Đất nền thổ cư">Đất nền thổ cư</option>
                <option value="Đất vườn sinh thái">Đất vườn sinh thái</option>
                <option value="Đất nền dự án">Đất nền dự án</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Khu vực / Tỉnh thành</label>
              <select 
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
              >
                <option value="Tất cả khu vực">Tất cả khu vực</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Mức giá đầu tư</label>
              <select 
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
              >
                <option value="Mọi mức giá">Mọi mức giá</option>
                <option value="Dưới 1 tỷ">Dưới 1 tỷ</option>
                <option value="1 - 3 tỷ">1 - 3 tỷ</option>
                <option value="3 - 5 tỷ">3 - 5 tỷ</option>
                <option value="Trên 5 tỷ">Trên 5 tỷ</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" style={{ backgroundColor: theme.primary, color: 'white', padding: '0.75rem', borderRadius: '4px', width: '100%', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <Search size={20} />
                Tìm Kiếm Ngay
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );

  // 4. FEATURED LAND PLOTS (REACTIVE TO QUICK SEARCH FILTERS AND LINKED TO DETAILS MODAL)
  const renderFeaturedPlots = () => {
    const filtered = getFilteredPlots();
    const plotsToShow = filtered.slice(0, 3);

    return (
      <section style={{ backgroundColor: theme.bg, padding: '5rem 0' }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: theme.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Cơ Hội Đầu Tư</span>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.primary, marginTop: '0.5rem' }}>Quỹ Đất Đang Nổi Bật</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: theme.accent, margin: '1rem auto' }} />
          </div>

          {plotsToShow.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px' }}>
              <p style={{ color: theme.textLight, marginBottom: '1.5rem' }}>Không có lô đất nào phù hợp với bộ lọc hiện tại.</p>
              <button 
                onClick={() => {
                  setFilterType('Tất cả loại đất');
                  setFilterRegion('Tất cả khu vực');
                  setFilterPrice('Mọi mức giá');
                  setSearchQuery('');
                }}
                style={{ backgroundColor: theme.primary, color: 'white', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: 600 }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plotsToShow.map(plot => (
                <div key={plot.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} className="hover:-translate-y-2">
                  <div style={{ position: 'relative', height: '240px' }}>
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={plot.img} alt={plot.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: theme.accent, color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                      {plot.status}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>{plot.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textLight, fontSize: '0.875rem', marginBottom: '1rem' }}>
                      <MapPin size={16} style={{ color: theme.primary }} />
                      {plot.location}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Diện tích</span>
                        <span style={{ fontWeight: 600, color: theme.text }}>{plot.size}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Mức giá</span>
                        <span style={{ fontWeight: 700, color: theme.accent, fontSize: '1.125rem' }}>{plot.priceText}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(plot)}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: 'transparent', border: `1px solid ${theme.primary}`, color: theme.primary, borderRadius: '4px', fontWeight: 600, transition: 'all 0.2s' }} 
                      className="hover:bg-[#2D6A4F] hover:text-white"
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={() => handleNavClick('projects')}
              style={{ backgroundColor: theme.primary, color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Xem Toàn Bộ Quỹ Đất <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    );
  };

  // 5. LAND CATEGORIES
  const renderCategories = () => {
    const cats = [
      { icon: <TreePine size={32} />, name: 'Đất Vườn Sinh Thái', desc: 'Thích hợp xây homestay, nghỉ dưỡng cuối tuần.' },
      { icon: <Building size={32} />, name: 'Đất Nền Dự Án', desc: 'Hạ tầng hoàn thiện, quy hoạch đồng bộ 1/500.' },
      { icon: <Map size={32} />, name: 'Đất Thổ Cư Phân Lô', desc: 'Pháp lý an toàn, sổ đỏ riêng từng nền.' },
      { icon: <TrendingUp size={32} />, name: 'Đất Ven Khu Công Nghiệp', desc: 'Tiềm năng tăng giá cao, dễ thanh khoản.' },
      { icon: <Sun size={32} />, name: 'Đất Biển Nghỉ Dưỡng', desc: 'Tầm nhìn view biển, tiềm năng khai thác du lịch.' },
      { icon: <Trees size={32} />, name: 'Đất Nông Nghiệp Lớn', desc: 'Quỹ đất lớn phù hợp làm trang trại, lập vườn.' },
    ];

    return (
      <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.primary, marginTop: '0.5rem' }}>Phân Khúc Đầu Tư</h2>
            <p style={{ color: theme.textLight, maxWidth: '600px', margin: '1rem auto' }}>
              Đa dạng các loại hình bất động sản đất nền, đáp ứng mọi nhu cầu và khẩu vị rủi ro của nhà đầu tư.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map((cat, idx) => (
              <div key={idx} style={{ padding: '2rem', border: '1px solid #E5E7EB', borderRadius: '12px', transition: 'all 0.3s' }} className="hover:border-[#D4A373] hover:shadow-lg group">
                <div style={{ width: '64px', height: '64px', backgroundColor: `${theme.bg}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, marginBottom: '1.5rem', transition: 'all 0.3s' }} className="group-hover:bg-[#2D6A4F] group-hover:text-white">
                  {cat.icon}
                </div>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>{cat.name}</h3>
                <p style={{ color: theme.textLight, fontSize: '0.95rem', lineHeight: 1.6 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 6. MASTER PLAN / SUBDIVISION MAP
  const renderMasterPlan = () => (
    <section style={{ backgroundColor: theme.bg, padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div style={{ flex: 1 }}>
            <span style={{ color: theme.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Quy Hoạch Bài Bản</span>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.25rem', fontWeight: 800, color: theme.primary, marginTop: '0.5rem', marginBottom: '1.5rem' }}>Sơ Đồ Phân Lô Tối Ưu Diện Tích & Công Năng</h2>
            <p style={{ color: theme.textLight, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Mỗi sản phẩm đất nền của chúng tôi đều được nghiên cứu kỹ lưỡng về phong thủy, tối ưu hóa các mặt thoáng. Đường nội khu rộng rãi từ 8m - 12m, đảm bảo vỉa hè, cây xanh và hệ thống thoát nước chuẩn mực.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Mặt tiền lô đất chuẩn 5m, 10m, 20m dễ dàng thiết kế',
                'Hệ thống điện âm, nước máy chuẩn đô thị',
                'Diện tích đa dạng từ 100m² đến 1000m²',
                'Sổ riêng từng nền, sẵn sàng sang tên ngay'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={24} style={{ color: theme.accent, flexShrink: 0 }} />
                  <span style={{ color: theme.text, fontWeight: 600 }}>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => handleNavClick('gallery')} style={{ backgroundColor: theme.primary, color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 700 }}>
              Xem Sơ Đồ Phân Lô Chi Tiết
            </button>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80" alt="Master Plan" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 7. ABOUT (HOME PAGE MINIFIED VERSION)
  const renderAbout = () => (
    <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
      <div className={`${MAX_W} mx-auto px-4 text-center`}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <TreePine size={48} style={{ color: theme.accent, margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.primary, marginBottom: '1.5rem' }}>Hơn 10 Năm Kiến Tạo Giá Trị</h2>
          <p style={{ color: theme.textLight, fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Khởi nguồn từ một khát vọng mang lại những sản phẩm đất nền an toàn, minh bạch cho nhà đầu tư, Đất Nền Gia Phát đã trải qua hơn một thập kỷ phát triển. Chúng tôi không chỉ bán một mảnh đất, chúng tôi trao gửi một tài sản tích lũy, một cơ hội sinh lời và một di sản cho thế hệ mai sau.
          </p>
          <div style={{ borderTop: `1px solid ${theme.accent}`, borderBottom: `1px solid ${theme.accent}`, padding: '2rem 0', display: 'inline-block', marginBottom: '2rem' }}>
            <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, fontStyle: 'italic' }}>
              &ldquo;Giá trị thực - Sinh lời thực - Pháp lý chuẩn&rdquo;
            </h4>
          </div>
          <div>
            <button onClick={() => handleNavClick('about')} style={{ backgroundColor: theme.primary, color: 'white', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 700 }}>
              Xem thêm về hành trình chúng tôi
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // 8. WHY LAND
  const renderWhyLand = () => (
    <section style={{ backgroundColor: theme.primary, padding: '5rem 0', color: 'white' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Vì Sao Chọn Đầu Tư Đất Nền?</h2>
          <p style={{ color: '#A7F3D0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Kênh trú ẩn dòng tiền an toàn và hiệu quả nhất trong dài hạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <TrendingUp size={40} />, title: 'Biên độ tăng giá cao', desc: 'Lợi nhuận kỳ vọng từ 20-30%/năm tại các khu vực đang hoàn thiện hạ tầng giao thông.' },
            { icon: <ShieldCheck size={40} />, title: 'An toàn tuyệt đối', desc: 'Tài sản hiện hữu, không bị hao mòn theo thời gian. Sổ đỏ sở hữu vĩnh viễn.' },
            { icon: <FileText size={40} />, title: 'Pháp lý minh bạch', desc: '100% sản phẩm đã có trích lục/sổ đỏ riêng, kiểm tra quy hoạch rõ ràng trước khi giao dịch.' },
            { icon: <Building size={40} />, title: 'Đa dạng mục đích', desc: 'Có thể xây dựng nhà ở, homestay nghỉ dưỡng, làm vườn, hoặc đơn giản là tích sản.' },
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: theme.accent, marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 9. LOCATION OVERVIEW
  const renderLocation = () => (
    <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Location Overview" style={{ width: '100%', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Navigation size={32} style={{ color: theme.primary }} />
                <div>
                  <div style={{ fontWeight: 700, color: theme.text }}>Kết nối hạ tầng vàng</div>
                  <div style={{ fontSize: '0.875rem', color: theme.textLight }}>Cao tốc đang thành hình</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '1.5rem' }}>Vị Trí Đón Đầu Quy Hoạch</h2>
            <p style={{ color: theme.textLight, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Chúng tôi lựa chọn khắt khe các quỹ đất tọa lạc tại những vị trí chiến lược, đón đầu các tuyến đường cao tốc, sân bay mới hoặc khu công nghiệp trọng điểm. Đây là yếu tố then chốt quyết định tính thanh khoản và khả năng nhân bản tài sản của nhà đầu tư.
            </p>
            <div className="space-y-4">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: theme.primary, fontWeight: 700 }}>5m</div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>Kết nối tuyến cao tốc Dầu Giây - Liên Khương</h4>
                  <p style={{ color: theme.textLight, fontSize: '0.9rem' }}>Chỉ 5 phút di chuyển tới nút giao cao tốc.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: theme.primary, fontWeight: 700 }}>15m</div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: theme.text }}>Cách trung tâm hành chính mới</h4>
                  <p style={{ color: theme.textLight, fontSize: '0.9rem' }}>Tiếp cận đầy đủ tiện ích: trường học, bệnh viện, siêu thị.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 10. STATS
  const renderStats = () => (
    <section style={{ backgroundColor: theme.bg, padding: '4rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '500+', label: 'Nền đã bàn giao' },
            { num: '100%', label: 'Sổ đỏ trao tay' },
            { num: '10+', label: 'Dự án thành công' },
            { num: '25%', label: 'Lợi nhuận TB/năm' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.primary, marginBottom: '0.5rem' }}>{stat.num}</div>
              <div style={{ color: theme.textLight, fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 11. GALLERY (GRID WITH LIGHTBOX COMPATIBILITY)
  const renderGallery = () => (
    <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.text }}>Hình Ảnh Thực Tế</h2>
          <p style={{ color: theme.textLight, marginTop: '1rem' }}>Góc nhìn trực quan từ trên cao các quỹ đất đang mở bán.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden" style={{ borderRadius: '8px' }} onClick={() => setSelectedGalleryImg(GALLERY_PHOTOS[0].url)}>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={GALLERY_PHOTOS[0].url} alt={GALLERY_PHOTOS[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', transition: 'transform 0.3s' }} className="group-hover:scale-105" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '1rem', color: 'white' }}>
              <p style={{ fontWeight: 600 }}>{GALLERY_PHOTOS[0].title}</p>
            </div>
          </div>
          {GALLERY_PHOTOS.slice(1, 5).map((photo) => (
            <div key={photo.id} className="cursor-pointer group relative overflow-hidden" style={{ height: '200px', borderRadius: '8px' }} onClick={() => setSelectedGalleryImg(photo.url)}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', transition: 'transform 0.3s' }} className="group-hover:scale-105" />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '0.5rem 1rem', color: 'white', fontSize: '0.875rem' }}>
                <p style={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => handleNavClick('gallery')}
            style={{ backgroundColor: theme.primary, color: 'white', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 700 }}
          >
            Xem tất cả hình ảnh
          </button>
        </div>
      </div>
    </section>
  );

  // 12. TESTIMONIALS
  const renderTestimonials = () => (
    <section style={{ backgroundColor: theme.bg, padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.primary }}>Khách Hàng Nói Về Chúng Tôi</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Anh Hoàng Nam', role: 'Nhà Đầu Tư TP.HCM', text: 'Tôi rất an tâm về pháp lý khi mua đất nền tại đây. Sổ đỏ có sẵn, thủ tục sang tên nhanh chóng chỉ trong 1 tuần.' },
            { name: 'Chị Mai Hoa', role: 'Khách hàng mua nghỉ dưỡng', text: 'Khu đất vườn sinh thái Bảo Lộc có khí hậu tuyệt vời, tôi đã xây dựng một căn homestay nhỏ để gia dịch nghỉ dưỡng cuối tuần.' },
            { name: 'Chú Tuấn Anh', role: 'Nhà đầu tư lâu năm', text: 'Biên độ lợi nhuận đạt đúng như cam kết. Tôi đã đầu tư 3 nền cách đây 2 năm và hiện tại giá trị đã tăng hơn 50%.' },
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div className="flex text-yellow-400 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p style={{ color: theme.textLight, fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.7 }}>&ldquo;{item.text}&rdquo;</p>
              <div style={{ fontWeight: 700, color: theme.text }}>{item.name}</div>
              <div style={{ fontSize: '0.875rem', color: theme.textLight }}>{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 13. PROGRESS / INFRASTRUCTURE
  const renderProgress = () => (
    <section style={{ backgroundColor: 'white', padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.text, marginBottom: '1.5rem' }}>Tiến Độ Hạ Tầng</h2>
            <p style={{ color: theme.textLight, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Chúng tôi cam kết hoàn thiện hạ tầng 100% trước khi bàn giao nền. Khách hàng hoàn toàn có thể kiểm tra thực tế tiến độ thi công vào bất kỳ thời điểm nào.
            </p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 700, color: theme.text }}>San lấp mặt bằng</span>
                  <span style={{ fontWeight: 700, color: theme.primary }}>100%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: theme.primary }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 700, color: theme.text }}>Hệ thống đường nội bộ</span>
                  <span style={{ fontWeight: 700, color: theme.primary }}>85%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: theme.primary }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 700, color: theme.text }}>Hệ thống điện & nước máy</span>
                  <span style={{ fontWeight: 700, color: theme.primary }}>90%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '90%', height: '100%', backgroundColor: theme.primary }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 700, color: theme.text }}>Cây xanh cảnh quan</span>
                  <span style={{ fontWeight: 700, color: theme.primary }}>60%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', backgroundColor: theme.primary }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Construction Progress" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>
    </section>
  );

  // 14. NEWS (HOME PAGE MINIFIED VERSION)
  const renderNews = () => (
    <section style={{ backgroundColor: theme.bg, padding: '5rem 0' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.text }}>Tin Tức & Thị Trường</h2>
          </div>
          <button 
            onClick={() => handleNavClick('news')}
            style={{ color: theme.primary, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Xem tất cả <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.slice(0, 3).map((news) => (
            <div key={news.id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.textLight, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <span>{news.date}</span>
                  <span style={{ color: theme.accent, fontWeight: 700 }}>{news.category}</span>
                </div>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.125rem', fontWeight: 700, color: theme.text, marginBottom: '1rem', lineHeight: 1.4, height: '2.8rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {news.title}
                </h3>
                <button 
                  onClick={() => setSelectedArticle(news)}
                  style={{ color: theme.accent, fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Đọc tiếp <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 15. LEGAL NOTICE
  const renderLegal = () => (
    <section style={{ backgroundColor: 'white', padding: '3rem 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
      <div className={`${MAX_W} mx-auto px-4`}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', backgroundColor: theme.bg, padding: '2rem', borderRadius: '12px' }}>
          <ShieldCheck size={48} style={{ color: theme.primary, flexShrink: 0 }} />
          <div>
            <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>Cam Kết Pháp Lý Đanh Thép</h3>
            <p style={{ color: theme.textLight, lineHeight: 1.6 }}>
              Tất cả các sản phẩm đất nền do <strong>Đất Nền Gia Phát</strong> phân phối đều đã được kiểm tra quy hoạch nghiêm ngặt. Chúng tôi cam kết 100% sản phẩm có sổ đỏ riêng, đất sạch không tranh chấp. Sẵn sàng hoàn tiền gấp đôi nếu phát hiện sai phạm về pháp lý.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // 16. FAQ
  const renderFAQ = () => {
    const faqs = [
      { q: 'Thủ tục sang tên sổ đỏ diễn ra trong bao lâu?', a: 'Thông thường sau khi công chứng Hợp đồng chuyển nhượng, thủ tục sang tên sổ đỏ (đăng bộ) sẽ hoàn tất trong vòng 15-21 ngày làm việc tùy thuộc vào cơ quan nhà nước tại địa phương.' },
      { q: 'Tôi có thể xây dựng ngay sau khi mua đất không?', a: 'Đối với đất thổ cư toàn bộ, bạn có thể xin giấy phép và xây dựng ngay. Với đất vườn, bạn có thể làm nhà tạm, nhà lắp ghép theo quy định của địa phương.' },
      { q: 'Công ty có hỗ trợ vay vốn ngân hàng không?', a: 'Có. Chúng tôi liên kết với nhiều ngân hàng lớn (Vietcombank, ACB, VIB...) hỗ trợ vay lên đến 70% giá trị định giá với lãi suất ưu đãi.' },
      { q: 'Làm sao để biết đất có dính quy hoạch hay không?', a: 'Chúng tôi cung cấp bản đồ quy hoạch mới nhất và hỗ trợ khách hàng kiểm tra trực tiếp thông tin quy hoạch tại UBND Quận/Huyện trước khi đặt cọc.' }
    ];

    return (
      <section style={{ backgroundColor: theme.bg, padding: '5rem 0' }}>
        <div className={`${MAX_W} mx-auto px-4`}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: theme.text }}>Câu Hỏi Thường Gặp</h2>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', textAlign: 'left', fontWeight: 700, color: theme.text }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem', color: theme.textLight, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 17. CONTACT CTA (HOME PAGE VERSION)
  const renderContact = () => (
    <section style={{ backgroundColor: theme.primary, padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50%', right: '-10%', opacity: 0.1 }} className="hidden md:block">
        <TreePine size={400} color="white" />
      </div>
      <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Sẵn Sàng Đầu Tư?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Đừng bỏ lỡ cơ hội sở hữu những lô đất vị trí vàng với mức giá ưu đãi nhất giai đoạn 1. Để lại thông tin, chuyên viên của chúng tôi sẽ gửi ngay báo giá và bản đồ phân lô chi tiết.
            </p>
            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-center gap-3"><Check size={20} style={{ color: theme.accent }} /> Tư vấn hoàn toàn miễn phí</li>
              <li className="flex items-center gap-3"><Check size={20} style={{ color: theme.accent }} /> Hỗ trợ xe đưa đón xem đất tận nơi</li>
              <li className="flex items-center gap-3"><Check size={20} style={{ color: theme.accent }} /> Chiết khấu cao cho khách hàng mua sỉ</li>
            </ul>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={60} style={{ color: '#10B981', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 800, color: theme.primary, marginBottom: '0.5rem' }}>Gửi Yêu Cầu Thành Công!</h3>
                <p style={{ color: theme.textLight, fontSize: '0.95rem', marginBottom: '1.5rem' }}>Đội ngũ tư vấn sẽ liên hệ lại với quý khách trong vòng 15 phút.</p>
                <button 
                  onClick={() => setContactSubmitted(false)}
                  style={{ backgroundColor: theme.primary, color: 'white', padding: '0.6rem 1.5rem', borderRadius: '4px', fontWeight: 600 }}
                >
                  Gửi lại thông tin
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 800, color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>Nhận Thông Tin Dự Án</h3>
                <div>
                  <input type="text" required placeholder="Họ và tên *" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }} />
                </div>
                <div>
                  <input type="tel" required placeholder="Số điện thoại *" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }} />
                </div>
                <div>
                  <select style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.textLight }}>
                    <option>Khu vực quan tâm...</option>
                    <option>Đất nền Bảo Lộc</option>
                    <option>Đất nền Long Thành</option>
                    <option>Đất ven biển Bình Thuận</option>
                    <option>Đất nền Phú Mỹ</option>
                  </select>
                </div>
                <button type="submit" style={{ width: '100%', backgroundColor: theme.accent, color: 'white', padding: '1rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.1rem', marginTop: '1rem' }}>
                  Đăng Ký Nhận Báo Giá
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // -- DETAILED INTERACTIVE PAGES --

  // PROJECTS PAGE (WITH SIDEBAR FILTERS, reactive SEARCH & MULTIPLE DROP-DOWN FILTERS)
  const renderProjectsPage = () => {
    const filtered = getFilteredPlots();
    
    return (
      <div style={{ backgroundColor: theme.bg, fontFamily: theme.bodyFont, paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: theme.primary, color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className={`${MAX_W} mx-auto px-4`}>
            <h1 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Quỹ Đất Đang Mở Bán</h1>
            <p style={{ color: '#A7F3D0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Danh sách các quỹ đất nền, đất vườn có pháp lý minh bạch, sổ đỏ riêng từng nền và biên độ tăng giá tốt nhất.
            </p>
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '-2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên lô đất, địa điểm hoặc tỉnh thành..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '1rem' }}
              />
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: theme.textLight }} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: theme.textLight, fontWeight: 700 }}
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Loại đất</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                >
                  <option value="Tất cả loại đất">Tất cả loại đất</option>
                  <option value="Đất nền thổ cư">Đất nền thổ cư</option>
                  <option value="Đất vườn sinh thái">Đất vườn sinh thái</option>
                  <option value="Đất nền dự án">Đất nền dự án</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Khu vực</label>
                <select 
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                >
                  <option value="Tất cả khu vực">Tất cả khu vực</option>
                  <option value="Lâm Đồng">Lâm Đồng</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Bình Thuận">Bình Thuận</option>
                  <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Pháp lý (Sổ đỏ/Sổ hồng)</label>
                <select 
                  value={filterLegal}
                  onChange={(e) => setFilterLegal(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                >
                  <option value="Tất cả pháp lý">Tất cả pháp lý</option>
                  <option value="Sổ đỏ">Sổ đỏ</option>
                  <option value="Sổ hồng">Sổ hồng</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Hướng đất</label>
                <select 
                  value={filterDirection}
                  onChange={(e) => setFilterDirection(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                >
                  <option value="Tất cả hướng">Tất cả hướng</option>
                  <option value="Đông">Đông</option>
                  <option value="Tây">Tây</option>
                  <option value="Nam">Nam</option>
                  <option value="Bắc">Bắc</option>
                  <option value="Đông Nam">Đông Nam</option>
                  <option value="Đông Bắc">Đông Bắc</option>
                  <option value="Tây Nam">Tây Nam</option>
                  <option value="Tây Bắc">Tây Bắc</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Mức giá</label>
                <select 
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                >
                  <option value="Mọi mức giá">Mọi mức giá</option>
                  <option value="Dưới 1 tỷ">Dưới 1 tỷ</option>
                  <option value="1 - 3 tỷ">1 - 3 tỷ</option>
                  <option value="3 - 5 tỷ">3 - 5 tỷ</option>
                  <option value="Trên 5 tỷ">Trên 5 tỷ</option>
                </select>
              </div>
            </div>

            {(searchQuery || filterType !== 'Tất cả loại đất' || filterRegion !== 'Tất cả khu vực' || filterLegal !== 'Tất cả pháp lý' || filterDirection !== 'Tất cả hướng' || filterPrice !== 'Mọi mức giá') && (
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('Tất cả loại đất');
                    setFilterRegion('Tất cả khu vực');
                    setFilterLegal('Tất cả pháp lý');
                    setFilterDirection('Tất cả hướng');
                    setFilterPrice('Mọi mức giá');
                  }}
                  style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.9rem', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 800, color: theme.text }}>
              Hiện có: <span style={{ color: theme.primary }}>{filtered.length} quỹ đất phù hợp</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <Info size={48} style={{ color: theme.accent, margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>Không tìm thấy sản phẩm</h3>
              <p style={{ color: theme.textLight, maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Không tìm thấy quỹ đất nào phù hợp với bộ lọc hiện tại của bạn. Vui lòng thiết lập lại bộ lọc hoặc thay đổi từ khóa tìm kiếm.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('Tất cả loại đất');
                  setFilterRegion('Tất cả khu vực');
                  setFilterLegal('Tất cả pháp lý');
                  setFilterDirection('Tất cả hướng');
                  setFilterPrice('Mọi mức giá');
                }}
                style={{ backgroundColor: theme.primary, color: 'white', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 700 }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map(plot => (
                <div key={plot.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={plot.img} alt={plot.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: theme.accent, color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                      {plot.status}
                    </div>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                      {plot.type}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center' }}>
                      {plot.title}
                    </h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textLight, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                      <MapPin size={16} style={{ color: theme.primary, flexShrink: 0 }} />
                      <span className="truncate">{plot.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Diện tích</span>
                        <span style={{ fontWeight: 600, color: theme.text }}>{plot.size}</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Pháp lý</span>
                        <span style={{ fontWeight: 600, color: theme.text }}>{plot.legal}</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Hướng</span>
                        <span style={{ fontWeight: 600, color: theme.text }}>{plot.direction}</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: theme.textLight }}>Mức giá</span>
                        <span style={{ fontWeight: 700, color: theme.accent, fontSize: '1.1rem' }}>{plot.priceText}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedProject(plot)}
                      style={{ width: '100%', marginTop: 'auto', padding: '0.75rem', backgroundColor: theme.primary, color: 'white', borderRadius: '4px', fontWeight: 700, transition: 'all 0.2s' }}
                      className="hover:bg-green-800"
                    >
                      Xem Chi Tiết
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

  // ABOUT PAGE (WITH TIMELINE, LEADERSHIP, CORE VALUES, INTERACTIVE TABS)
  const renderAboutPage = () => {
    const leadership = [
      { name: 'Nguyễn Gia Phát', role: 'Sáng lập & Tổng Giám Đốc', desc: 'Hơn 15 năm kinh nghiệm trong lĩnh vực quản lý đầu tư và phát triển dự án bất động sản đất nền vùng ven.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
      { name: 'Lê Hữu Nhân', role: 'Giám đốc Chi Nhánh Bảo Lộc', desc: 'Chuyên gia thẩm định quy hoạch và phát triển dòng sản phẩm đất vườn sinh thái nghỉ dưỡng tại Lâm Đồng.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
      { name: 'Trần Thị Tuyết', role: 'Giám đốc Pháp lý & Vận hành', desc: 'Thạc sĩ Luật Kinh tế, chịu trách nhiệm thẩm định pháp lý và hoàn thiện thủ tục cấp sổ đỏ riêng cho khách hàng.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    ];

    const milestones = [
      { year: '2016', title: 'Thành lập & Khởi nghiệp', desc: 'Thành lập Đất Nền Gia Phát tại TP.HCM với đội ngũ ban đầu 10 nhân sự, tập trung phân phối đất thổ cư ven Sài Gòn.' },
      { year: '2018', title: 'Mở rộng thị trường Đồng Nai', desc: 'Đón đầu làn sóng hạ tầng Long Thành, phân phối thành công 3 dự án đất nền phân lô với quy mô hơn 300 sản phẩm đã bàn giao sổ đỏ.' },
      { year: '2020', title: 'Tiên phong Đất vườn Bảo Lộc', desc: 'Thành lập văn phòng chi nhánh Bảo Lộc. Kiến tạo xu hướng bỏ phố về rừng với các sản phẩm đất vườn sinh thái quy hoạch bài bản.' },
      { year: '2023', title: 'Hợp tác chiến lược ngân hàng', desc: 'Ký kết hợp tác chiến lược với Vietcombank và VIB hỗ trợ tài chính lãi suất ưu đãi lên tới 70% giá trị đất nền cho khách hàng.' },
      { year: '2026', title: 'Số hóa giao dịch & Bứt phá', desc: 'Ứng dụng công nghệ kiểm tra quy hoạch trực tuyến và thực tế ảo (VR) giúp khách hàng xem đất từ xa, đạt cột mốc 1000+ giao dịch thành công.' },
    ];

    return (
      <div style={{ backgroundColor: theme.bg, fontFamily: theme.bodyFont, paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: theme.primary, color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className={`${MAX_W} mx-auto px-4`}>
            <h1 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Về Chúng Tôi</h1>
            <p style={{ color: '#A7F3D0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Kiến tạo giá trị thực - mang lại lợi nhuận bền vững và sự an tâm tuyệt đối về pháp lý cho nhà đầu tư.
            </p>
          </div>
        </div>

        {/* Vision & Mission Working Tabs */}
        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '3rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <button 
                onClick={() => setActiveAboutTab('vision')}
                style={{
                  width: '100%', padding: '1rem', textAlign: 'left', fontWeight: 700, borderRadius: '4px',
                  backgroundColor: activeAboutTab === 'vision' ? theme.primary : 'transparent',
                  color: activeAboutTab === 'vision' ? 'white' : theme.text,
                  marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px',
                  border: 'none', cursor: 'pointer'
                }}
              >
                <Sun size={20} /> Tầm Nhìn Chiến Lược
              </button>
              <button 
                onClick={() => setActiveAboutTab('mission')}
                style={{
                  width: '100%', padding: '1rem', textAlign: 'left', fontWeight: 700, borderRadius: '4px',
                  backgroundColor: activeAboutTab === 'mission' ? theme.primary : 'transparent',
                  color: activeAboutTab === 'mission' ? 'white' : theme.text,
                  marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px',
                  border: 'none', cursor: 'pointer'
                }}
              >
                <Compass size={20} /> Sứ Mệnh Lịch Sử
              </button>
              <button 
                onClick={() => setActiveAboutTab('philosophy')}
                style={{
                  width: '100%', padding: '1rem', textAlign: 'left', fontWeight: 700, borderRadius: '4px',
                  backgroundColor: activeAboutTab === 'philosophy' ? theme.primary : 'transparent',
                  color: activeAboutTab === 'philosophy' ? 'white' : theme.text,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  border: 'none', cursor: 'pointer'
                }}
              >
                <Leaf size={20} /> Triết Lý Kinh Doanh
              </button>
            </div>
            
            <div className="lg:col-span-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200 min-h-[250px]">
              {activeAboutTab === 'vision' && (
                <div>
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.75rem', fontWeight: 800, color: theme.primary, marginBottom: '1rem' }}>Tầm Nhìn Đến Năm 2030</h3>
                  <p style={{ color: theme.textLight, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                    Trở thành đơn vị đầu tư và phát triển bất động sản đất nền, đất vườn sinh thái vùng ven hàng đầu Việt Nam. Chúng tôi cam kết tiên phong kiến tạo các quỹ đất chuẩn mực về quy hoạch, kết nối hạ tầng giao thông và đặc biệt là an toàn pháp lý tuyệt đối.
                  </p>
                  <p style={{ color: theme.textLight, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    Gia Phát hướng tới mục tiêu mở rộng hệ sinh thái dịch vụ, ứng dụng công nghệ số vào quy trình giao dịch, giúp khách hàng dễ dàng tiếp cận cơ hội đầu tư an toàn và hiệu quả chỉ bằng một chạm.
                  </p>
                </div>
              )}
              {activeAboutTab === 'mission' && (
                <div>
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.75rem', fontWeight: 800, color: theme.primary, marginBottom: '1rem' }}>Sứ Mệnh Đối Với Khách Hàng & Xã Hội</h3>
                  <p style={{ color: theme.textLight, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                    <strong>Đối với khách hàng:</strong> Mang lại giải pháp tích lũy tài sản an toàn và bền vững nhất thông qua bất động sản thực, giá trị thực. Giúp dòng vốn của khách hàng được bảo vệ và gia tăng giá trị vững chắc.
                  </p>
                  <p style={{ color: theme.textLight, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    <strong>Đối với xã hội:</strong> Thúc đẩy quá trình phát triển đô thị vệ tinh bền vững, hài hòa với thiên nhiên. Kiến tạo hạ tầng khu vực văn minh, đóng góp ngân sách địa phương và tạo công ăn việc làm cho cộng đồng.
                  </p>
                </div>
              )}
              {activeAboutTab === 'philosophy' && (
                <div>
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.75rem', fontWeight: 800, color: theme.primary, marginBottom: '1rem' }}>Triết Lý Kinh Doanh &ldquo;Ba Chân Kiềng&rdquo;</h3>
                  <p style={{ color: theme.textLight, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                    Triết lý của chúng tôi xoay quanh ba giá trị cốt lõi làm nền tảng vững chắc cho mọi hoạt động kinh doanh:
                  </p>
                  <ul className="space-y-3" style={{ color: theme.textLight, fontSize: '1.05rem' }}>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={20} style={{ color: theme.accent, marginTop: '4px', flexShrink: 0 }} />
                      <span><strong>Pháp lý chuẩn chỉ:</strong> 100% sản phẩm có trích lục hoặc sổ đỏ hoàn chỉnh trước khi chào bán.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={20} style={{ color: theme.accent, marginTop: '4px', flexShrink: 0 }} />
                      <span><strong>Khách hàng làm gốc:</strong> Lắng nghe mong muốn và khả năng tài chính của khách hàng để tư vấn sản phẩm tối ưu nhất.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={20} style={{ color: theme.accent, marginTop: '4px', flexShrink: 0 }} />
                      <span><strong>Đồng hành dài lâu:</strong> Hỗ trợ khách hàng từ khi tìm hiểu, hoàn tất thủ tục sang tên, cho đến khi có nhu cầu thanh khoản lại sản phẩm.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.25rem', fontWeight: 800, color: theme.primary }}>Giá Trị Cốt Lõi</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: theme.accent, margin: '1rem auto' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Tâm Huyết', desc: 'Tận tâm phục vụ khách hàng bằng sự chân thành và chuyên nghiệp nhất.', icon: <Heart size={32} /> },
              { title: 'Minh Bạch', desc: 'Công khai 100% thông tin pháp lý, bản vẽ quy hoạch và chính sách bán hàng.', icon: <ShieldCheck size={32} /> },
              { title: 'Bền Vững', desc: 'Kiến tạo giá trị tích lũy lâu dài, không chạy theo lợi nhuận nhất thời.', icon: <Trees size={32} /> },
              { title: 'Đột Phá', desc: 'Đón đầu các xu hướng hạ tầng, mang lại lợi nhuận vượt trội cho nhà đầu tư.', icon: <TrendingUp size={32} /> },
            ].map((value, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                <div style={{ color: theme.accent, display: 'inline-block', marginBottom: '1rem' }}>
                  {value.icon}
                </div>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>{value.title}</h3>
                <p style={{ color: theme.textLight, fontSize: '0.95rem', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Milestones */}
        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.25rem', fontWeight: 800, color: theme.primary }}>Hành Trình Phát Triển</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: theme.accent, margin: '1rem auto' }} />
          </div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: theme.accent, transform: 'translateX(-50%)', opacity: 0.5 }} className="hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div style={{ width: '100%', maxWidth: '360px' }} className="w-full md:w-5/12">
                      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.accent, display: 'block', marginBottom: '0.5rem' }}>{m.year}</span>
                        <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.125rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>{m.title}</h4>
                        <p style={{ color: theme.textLight, fontSize: '0.9rem', lineHeight: 1.6 }}>{m.desc}</p>
                      </div>
                    </div>
                    
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.primary, border: `4px solid ${theme.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, margin: '1rem 0' }} className="mx-auto my-2 md:my-0">
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white' }} />
                    </div>
                    
                    <div style={{ width: '100%', maxWidth: '360px' }} className="hidden md:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: theme.headingFont, fontSize: '2.25rem', fontWeight: 800, color: theme.primary }}>Ban Lãnh Đạo</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: theme.accent, margin: '1rem auto' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E5E7EB', overflow: 'hidden', textAlign: 'center', paddingBottom: '2rem' }}>
                <div style={{ height: '300px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.25rem' }}>{member.name}</h3>
                <span style={{ color: theme.accent, fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>{member.role}</span>
                <p style={{ color: theme.textLight, fontSize: '0.9rem', padding: '0 1.5rem', lineHeight: 1.6 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // GALLERY PAGE (WITH SELECTABLE GALLERY TAB FILTER AND SELECTEDGALLERYIMG LIGHTBOX)
  const renderGalleryPage = () => {
    const tabs = [
      { id: 'all', name: 'Tất cả' },
      { id: 'real', name: 'Thực tế dự án' },
      { id: 'map', name: 'Bản vẽ phân lô' },
      { id: 'amenity', name: 'Tiện ích xung quanh' }
    ];

    const filtered = selectedGalleryTab === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter(photo => photo.type === selectedGalleryTab);

    return (
      <div style={{ backgroundColor: theme.bg, fontFamily: theme.bodyFont, paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: theme.primary, color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className={`${MAX_W} mx-auto px-4`}>
            <h1 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Thư Viện Ảnh Thực Tế</h1>
            <p style={{ color: '#A7F3D0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Hình ảnh thực tế từ các khu đất đang mở bán và tiến độ thi công hạ tầng đường xá, cảnh quan.
            </p>
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '3rem' }}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  backgroundColor: selectedGalleryTab === tab.id ? theme.primary : 'white',
                  color: selectedGalleryTab === tab.id ? 'white' : theme.text,
                  border: selectedGalleryTab === tab.id ? `1px solid ${theme.primary}` : '1px solid #E5E7EB',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map(photo => (
              <div 
                key={photo.id}
                onClick={() => setSelectedGalleryImg(photo.url)}
                style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer' }}
                className="group relative overflow-hidden"
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="group-hover:scale-105" />
                </div>
                <div style={{ padding: '1rem', borderTop: '1px solid #F3F4F6' }}>
                  <span style={{ fontSize: '0.75rem', color: theme.accent, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    {tabs.find(t => t.id === photo.type)?.name}
                  </span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {photo.title}
                  </h4>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }} className="group-hover:opacity-100 transition-opacity">
                  <Search size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // NEWS PAGE (WITH SEARCH AND FULL DETAILED ARTICLES POPUP MODAL)
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('Tất cả');
  
  const renderNewsPage = () => {
    const categories = ['Tất cả', 'Hạ tầng', 'Thị trường', 'Quy hoạch', 'Cẩm nang'];

    const filtered = NEWS_ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchNewsQuery.toLowerCase());
      
      const matchesCategory = selectedNewsCategory === 'Tất cả' || article.category === selectedNewsCategory;
      
      return matchesSearch && matchesCategory;
    });

    return (
      <div style={{ backgroundColor: theme.bg, fontFamily: theme.bodyFont, paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: theme.primary, color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className={`${MAX_W} mx-auto px-4`}>
            <h1 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Tin Tức & Phân Tích Thị Trường</h1>
            <p style={{ color: '#A7F3D0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Cập nhật quy hoạch mới nhất, tiến độ hạ tầng giao thông và kinh nghiệm đầu tư đất nền an toàn.
            </p>
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '3rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {searchNewsQuery && (
                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', border: '1px solid #E5E7EB', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: theme.textLight }}>
                    Kết quả tìm kiếm cho: <strong>&ldquo;{searchNewsQuery}&rdquo;</strong> ({filtered.length} bài viết)
                  </span>
                  <button 
                    onClick={() => setSearchNewsQuery('')}
                    style={{ color: '#EF4444', fontWeight: 600, fontSize: '0.875rem', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Xóa tìm kiếm
                  </button>
                </div>
              )}

              {filtered.length === 0 ? (
                <div style={{ backgroundColor: 'white', padding: '4rem 2rem', borderRadius: '8px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                  <Info size={40} style={{ color: theme.accent, margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.5rem' }}>Không tìm thấy bài viết</h3>
                  <p style={{ color: theme.textLight }}>Hãy thử tìm kiếm với từ khóa khác.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filtered.map(article => (
                    <div key={article.id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: theme.textLight, marginBottom: '0.5rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {article.date}</span>
                          <span style={{ fontWeight: 700, color: theme.accent }}>{article.category}</span>
                        </div>
                        <h3 
                          onClick={() => setSelectedArticle(article)}
                          style={{ fontFamily: theme.headingFont, fontSize: '1.15rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem', lineHeight: 1.4, cursor: 'pointer' }}
                          className="hover:text-green-800"
                        >
                          {article.title}
                        </h3>
                        <p style={{ color: theme.textLight, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {article.summary}
                        </p>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          style={{ color: theme.primary, fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto', border: 'none', background: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}
                        >
                          Đọc tiếp <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.1rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>Tìm Kiếm Bài Viết</h3>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Nhập từ khóa cần tìm..."
                    value={searchNewsQuery}
                    onChange={(e) => setSearchNewsQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 2.25rem 0.75rem 0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }}
                  />
                  <Search size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: theme.textLight }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.1rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>Danh Mục Tin Tức</h3>
                <div className="flex flex-col gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedNewsCategory(cat)}
                      style={{
                        textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.95rem',
                        fontWeight: selectedNewsCategory === cat ? 700 : 500,
                        backgroundColor: selectedNewsCategory === cat ? theme.bg : 'transparent',
                        color: selectedNewsCategory === cat ? theme.primary : theme.text,
                        transition: 'all 0.2s',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer'
                      }}
                    >
                      <span>{cat}</span>
                      {selectedNewsCategory === cat && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: theme.primary, color: 'white', padding: '2rem 1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <TreePine size={40} style={{ color: theme.accent, margin: '0 auto 1rem' }} />
                <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Đầu Tư Đất Nền An Toàn</h4>
                <p style={{ color: '#A7F3D0', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Liên hệ ngay với hotline để kiểm tra thông tin quy hoạch và vị trí chi tiết từng nền hoàn toàn miễn phí.
                </p>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.accent }} className="flex justify-center items-center gap-2">
                  <Phone size={20} /> 0909 123 456
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // CONTACT PAGE (WITH FULL CONTACT INFORMATION AND SUBMIT SUCCESS SCREEN)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Đất nền Bảo Lộc',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
      return;
    }
    setContactSubmitted(true);
  };

  const renderContactPage = () => {
    return (
      <div style={{ backgroundColor: theme.bg, fontFamily: theme.bodyFont, paddingBottom: '5rem' }}>
        <div style={{ backgroundColor: theme.primary, color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className={`${MAX_W} mx-auto px-4`}>
            <h1 style={{ fontFamily: theme.headingFont, fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Liên Hệ Với Chúng Tôi</h1>
            <p style={{ color: '#A7F3D0', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Hãy chia sẻ nhu cầu đầu tư của bạn, đội ngũ chuyên viên của Gia Phát sẽ phản hồi và gửi báo giá chi tiết ngay lập tức.
            </p>
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4`} style={{ marginTop: '3rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-white p-8 rounded-lg shadow-sm flex flex-col justify-between border border-gray-200">
              <div>
                <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 800, color: theme.primary, marginBottom: '1.5rem' }}>
                  Thông Tin Liên Hệ
                </h3>
                <p style={{ color: theme.textLight, lineHeight: 1.7, marginBottom: '2rem' }}>
                  Văn phòng giao dịch chính thức của Đất Nền Gia Phát. Quý khách có thể ghé thăm trực tiếp để xem thực tế bản vẽ quy hoạch 1/500 và sổ gốc các quỹ đất.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: theme.text, fontSize: '1rem' }}>Văn Phòng TP.HCM</h4>
                      <p style={{ color: theme.textLight, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        123 Đường Số 1, KĐT Nam Sài Gòn, Phường Tân Phú, Quận 7, TP.HCM
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: theme.text, fontSize: '1rem' }}>Chi Nhánh Bảo Lộc</h4>
                      <p style={{ color: theme.textLight, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        456 Trần Phú, Phường 2, Thành phố Bảo Lộc, Tỉnh Lâm Đồng
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: theme.text, fontSize: '1rem' }}>Điện thoại / Hotline</h4>
                      <p style={{ color: theme.accent, fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem' }}>
                        0909 123 456
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.primary, flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: theme.text, fontSize: '1rem' }}>Địa chỉ Email</h4>
                      <p style={{ color: theme.textLight, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        info@datnengiaphat.com.vn
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem' }}>
                <span style={{ fontSize: '0.85rem', color: theme.textLight, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Giờ làm việc văn phòng
                </span>
                <p style={{ color: theme.text, fontSize: '0.95rem' }} className="flex items-center gap-2">
                  <Clock size={16} /> Thứ Hai - Chủ Nhật: 08:00 - 19:00 (Kể cả ngày lễ)
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              {contactSubmitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#D1FAE5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={40} />
                  </div>
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.75rem', fontWeight: 800, color: theme.primary, marginBottom: '1rem' }}>
                    Gửi Thông Tin Thành Công!
                  </h3>
                  <p style={{ color: theme.textLight, fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '450px', margin: '0 auto 2rem' }}>
                    Cảm ơn quý khách hàng đã tin tưởng liên hệ. Chuyên viên tư vấn của Đất Nền Gia Phát sẽ kiểm tra và gọi lại hỗ trợ trong vòng 15 phút.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', phone: '', email: '', interest: 'Đất nền Bảo Lộc', message: '' });
                    }}
                    style={{ backgroundColor: theme.primary, color: 'white', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    Gửi Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.5rem', fontWeight: 800, color: theme.text, marginBottom: '1.5rem' }}>
                    Nhận Tư Vấn & Báo Giá Chi Tiết
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Địa chỉ Email (tùy chọn)</label>
                      <input
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Khu vực quan tâm</label>
                      <select
                        value={contactForm.interest}
                        onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text }}
                      >
                        <option value="Đất nền Bảo Lộc">Đất nền Bảo Lộc</option>
                        <option value="Đất nền Long Thành">Đất nền Long Thành</option>
                        <option value="Đất ven biển Bình Thuận">Đất ven biển Bình Thuận</option>
                        <option value="Đất nền Phú Mỹ">Đất nền Phú Mỹ</option>
                        <option value="Khác">Khu vực khác...</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: theme.textLight, marginBottom: '0.5rem', fontWeight: 600 }}>Lời nhắn / Yêu cầu tư vấn chi tiết</label>
                    <textarea
                      rows={4}
                      placeholder="Quý khách có yêu cầu gì đặc biệt về diện tích, hướng đất hoặc cần hỗ trợ xem đất trực tiếp..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', backgroundColor: theme.accent, color: 'white', padding: '1rem', borderRadius: '4px', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}
                    className="hover:opacity-90 animate-pulse"
                  >
                    Gửi Yêu Cầu Ngay
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // MAIN RENDER CONTROLLER
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            {renderHero()}
            {renderQuickSearch()}
            {renderFeaturedPlots()}
            {renderCategories()}
            {renderMasterPlan()}
            {renderAbout()}
            {renderWhyLand()}
            {renderLocation()}
            {renderStats()}
            {renderGallery()}
            {renderTestimonials()}
            {renderProgress()}
            {renderNews()}
            {renderLegal()}
            {renderFAQ()}
            {renderContact()}
          </>
        );
      case 'projects':
        return renderProjectsPage();
      case 'about':
        return renderAboutPage();
      case 'gallery':
        return renderGalleryPage();
      case 'news':
        return renderNewsPage();
      case 'contact':
        return renderContactPage();
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.bodyFont, backgroundColor: theme.bg }}>
      {renderHeader()}
      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>
      {renderFooter()}

      {/* 1. Project Details Modal */}
      {selectedProject && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedProject(null)}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E7EB', zIndex: 10, cursor: 'pointer' }}
            >
              <X size={20} style={{ color: theme.text }} />
            </button>

            {/* Modal Image */}
            <div style={{ height: '350px', position: 'relative' }}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', backgroundColor: theme.primary, color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 700 }}>
                {selectedProject.priceText}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: theme.bg, color: theme.primary, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{selectedProject.type}</span>
                <span style={{ backgroundColor: theme.bg, color: theme.accent, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{selectedProject.status}</span>
                <span style={{ backgroundColor: theme.bg, color: theme.text, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Hướng: {selectedProject.direction}</span>
                <span style={{ backgroundColor: theme.bg, color: theme.text, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Pháp lý: {selectedProject.legal}</span>
              </div>

              <h2 style={{ fontFamily: theme.headingFont, fontSize: '1.75rem', fontWeight: 800, color: theme.primary, marginBottom: '0.5rem' }}>{selectedProject.title}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textLight, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                <MapPin size={18} style={{ color: theme.primary }} />
                {selectedProject.location}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ backgroundColor: theme.bg, padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: theme.textLight }}>Diện tích</span>
                  <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.1rem' }}>{selectedProject.size}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: theme.textLight }}>Đơn giá khoảng</span>
                  <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.1rem' }}>{(selectedProject.priceVal * 1000 / selectedProject.sizeVal).toFixed(1)} Tr/m²</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: theme.textLight }}>Pháp lý</span>
                  <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.1rem' }}>{selectedProject.legal}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: theme.textLight }}>Mức giá tổng</span>
                  <span style={{ fontWeight: 700, color: theme.accent, fontSize: '1.1rem' }}>{selectedProject.priceText}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>Mô Tả Sản Phẩm</h3>
              <p style={{ color: theme.textLight, lineHeight: 1.7, marginBottom: '1.5rem' }}>{selectedProject.desc}</p>

              <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>Thông Số Kỹ Thuật</h3>
              <p style={{ color: theme.textLight, lineHeight: 1.7, marginBottom: '1.5rem' }}>{selectedProject.specs}</p>

              <h3 style={{ fontFamily: theme.headingFont, fontSize: '1.25rem', fontWeight: 700, color: theme.text, marginBottom: '0.75rem' }}>Tiện Ích Nổi Bật</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={18} style={{ color: theme.accent }} />
                    <span style={{ color: theme.text, fontSize: '0.95rem' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2rem' }}>
                <h4 style={{ fontFamily: theme.headingFont, fontSize: '1.1rem', fontWeight: 700, color: theme.text, marginBottom: '1rem' }}>Yêu Cầu Gọi Lại Tư Vấn Lô Đất Này</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    placeholder="Họ và tên của bạn *" 
                    id="modalInquiryName"
                    style={{ padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }} 
                  />
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại *" 
                    id="modalInquiryPhone"
                    style={{ padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', color: theme.text, fontSize: '0.9rem' }} 
                  />
                  <button 
                    onClick={() => {
                      const nameInput = document.getElementById('modalInquiryName') as HTMLInputElement;
                      const phoneInput = document.getElementById('modalInquiryPhone') as HTMLInputElement;
                      if (!nameInput?.value || !phoneInput?.value) {
                        alert('Vui lòng điền đầy đủ họ tên và số điện thoại!');
                        return;
                      }
                      setSelectedProject(null);
                      setContactSubmitted(true);
                      handleNavClick('contact');
                    }}
                    style={{ backgroundColor: theme.accent, color: 'white', padding: '0.75rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
                  >
                    Đăng Ký Tư Vấn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Gallery Lightbox Modal */}
      {selectedGalleryImg && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedGalleryImg(null)}>
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Lightbox View" style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '4px' }} />
        </div>
      )}

      {/* 3. News Article Details Modal */}
      {selectedArticle && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedArticle(null)}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E7EB', zIndex: 10, cursor: 'pointer' }}
            >
              <X size={20} style={{ color: theme.text }} />
            </button>

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.accent, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <span>{selectedArticle.category}</span>
                <span style={{ color: theme.textLight }}>Ngày: {selectedArticle.date} | Tác giả: {selectedArticle.author}</span>
              </div>
              
              <h2 style={{ fontFamily: theme.headingFont, fontSize: '1.8rem', fontWeight: 800, color: theme.primary, marginBottom: '1.5rem', lineHeight: 1.3 }}>
                {selectedArticle.title}
              </h2>

              <div style={{ height: '300px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <blockquote style={{ borderLeft: `4px solid ${theme.accent}`, paddingLeft: '1rem', fontStyle: 'italic', color: theme.textLight, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedArticle.summary}
              </blockquote>

              <div style={{ color: theme.text, lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
