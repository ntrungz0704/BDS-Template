'use client';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info,
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare, Sparkle, Video,
  Layers3, Palette, Compass as DraftingCompass, ChevronDown, ChevronUp, Quote
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../../../utils/demo';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug?: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: {
    name?: string;
    slogan?: string;
    phone?: string;
    email?: string;
    address?: string;
    logo?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      tiktok?: string;
      zalo?: string;
    };
    footerColumns?: Array<{
      title: string;
      links: Array<{ label: string; url?: string; page?: string }>;
    }>;
  };
  theme?: Record<string, string>;
  projects?: Array<Record<string, unknown>>;
  posts?: Array<Record<string, unknown>>;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string; // 'Biệt Thự', 'Penthouse', 'Căn Hộ Duplex', 'Kiến Trúc Độc Bản', 'Nội Thất 6 Sao'
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number; // in m2
  location: string;
  district: string;
  city: string;
  image: string;
  featured?: boolean;
  hot?: boolean;
  year: string;
  style: string;
  description: string;
  specs: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  views: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// BDS-18 MOCK DATA: VIXYO ARCHITECTURE & LUXURY REAL ESTATE
// ─────────────────────────────────────────────────────────────────────────────

export const BDS18_PROJECTS: ProjectItem[] = [
  {
    id: 'vixyo-villa-saigon-south',
    title: 'Dinh Thự Sinh Thái Ven Sông The Riviera Nam Sài Gòn',
    slug: 'dinh-thu-sinh-thai-ven-song-the-riviera',
    category: 'Biệt Thự',
    price: '38.5 Tỷ VNĐ',
    priceNum: 38.5,
    area: '450 m²',
    areaNum: 450,
    location: 'Khu Biệt Thự Phú Gia, Tân Phong, Quận 7, TP.HCM',
    district: 'Quận 7',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true,
    hot: true,
    year: '2026',
    style: 'Modern Minimalist Architecture',
    description: 'Kiệt tác dinh thự đương đại với không gian kính tràn đón trọn luồng gió sông và mảng xanh nhiệt đới rộng lớn.',
    specs: ['Hồ bơi vô cực nước tràn', 'Sân vườn nhiệt đới 180m²', 'Nội thất nhập khẩu B&B Italia', 'Hệ thống Smart Home Crestron']
  },
  {
    id: 'vixyo-penthouse-grand-marina',
    title: 'Penthouse Duplex Đỉnh Tháp Grand Marina Saigon Ba Son',
    slug: 'penthouse-duplex-dinh-thap-grand-marina',
    category: 'Penthouse',
    price: '65.0 Tỷ VNĐ',
    priceNum: 65.0,
    area: '380 m²',
    areaNum: 380,
    location: 'Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: true,
    hot: true,
    year: '2026',
    style: 'Bespoke Luxury Interior',
    description: 'Tầm nhìn triệu đô ôm trọn sông Sài Gòn và trung tâm tài chính, hoàn thiện theo tiêu chuẩn khách sạn JW Marriott.',
    specs: ['Thông tầng cao 7.5m', 'Bể sục Jacuzzi ngắm pháo hoa', 'Dịch vụ quản gia cá nhân 24/7', 'Bàn giao full nội thất Minotti']
  },
  {
    id: 'vixyo-hillside-villa-dalat',
    title: 'Biệt Thự Đồi Thông Sương Mù The Cloud Villa Đà Lạt',
    slug: 'biet-thu-doi-thong-suong-mu-the-cloud-villa',
    category: 'Biệt Thự',
    price: '24.5 Tỷ VNĐ',
    priceNum: 24.5,
    area: '520 m²',
    areaNum: 520,
    location: 'Đường Mimosa, Phường 10, TP. Đà Lạt, Lâm Đồng',
    district: 'TP. Đà Lạt',
    city: 'Lâm Đồng',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: true,
    hot: false,
    year: '2025',
    style: 'Eco Modern Architecture',
    description: 'Ẩn mình giữa rừng thông bạt ngàn với kiến trúc gỗ kính mộc mạc mà xa hoa, lò sưởi đá tự nhiên trung tâm.',
    specs: ['Khuôn viên đất 800m²', 'Lò sưởi củi đá tự nhiên', 'Vườn hoa phong lữ thảo', 'Sổ đỏ đất ở đô thị']
  },
  {
    id: 'vixyo-duplex-sky-villa-tay-ho',
    title: 'Sky Villa Duplex View Trọn Mặt Nước Hồ Tây Hà Nội',
    slug: 'sky-villa-duplex-view-tron-ho-tay-ha-noi',
    category: 'Căn Hộ Duplex',
    price: '28.0 Tỷ VNĐ',
    priceNum: 28.0,
    area: '260 m²',
    areaNum: 260,
    location: 'Đường Quảng Khánh, Phường Quảng An, Tây Hồ, Hà Nội',
    district: 'Tây Hồ',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    featured: false,
    hot: false,
    year: '2026',
    style: 'Contemporary Luxury',
    description: 'Không gian sống nghỉ dưỡng thanh bình giữa lòng thủ đô, ban công ngắm trọn hoàng hôn Hồ Tây thơ mộng.',
    specs: ['Thang máy riêng bảo mật', 'Trần cao 6m thoáng đãng', 'Nội thất da bò Poltrona Frau', 'View không giới hạn']
  },
  {
    id: 'vixyo-coastal-mansion-nha-trang',
    title: 'Dinh Thự Đảo Biển Diamond Bay Nhìn Ra Vịnh Nha Trang',
    slug: 'dinh-thu-dao-bien-diamond-bay-nha-trang',
    category: 'Biệt Thự',
    price: '45.0 Tỷ VNĐ',
    priceNum: 45.0,
    area: '600 m²',
    areaNum: 600,
    location: 'Đại lộ Nguyễn Tất Thành, TP. Nha Trang, Khánh Hòa',
    district: 'TP. Nha Trang',
    city: 'Khánh Hòa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    featured: true,
    hot: true,
    year: '2026',
    style: 'Tropical Luxury Villa',
    description: 'Biệt thự biển có bến đỗ du thuyền riêng biệt, hồ bơi nước mặn và bãi tắm cát trắng tự nhiên riêng tư.',
    specs: ['Bến du thuyền riêng', 'Bãi tắm riêng tư', 'Bể bơi tràn bờ nước mặn', 'Sở hữu lâu dài']
  },
  {
    id: 'vixyo-bespoke-residence-hcm',
    title: 'Biệt Thự Phố Nghệ Thuật The Bespoke Residence Thảo Điền',
    slug: 'biet-thu-pho-nghe-thuat-the-bespoke-thao-dien',
    category: 'Kiến Trúc Độc Bản',
    price: '52.0 Tỷ VNĐ',
    priceNum: 52.0,
    area: '350 m²',
    areaNum: 350,
    location: 'Đường Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức (Quận 2)',
    district: 'TP. Thủ Đức',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    featured: false,
    hot: false,
    year: '2026',
    style: 'Art-Deco Contemporary',
    description: 'Công trình kiến trúc độc bản đoạt giải thưởng kiến trúc Châu Á, tích hợp phòng trưng bày nghệ thuật và hầm rượu vang.',
    specs: ['Hầm rượu vang 500 chai', 'Phòng trưng bày Art Gallery', 'Phim trường mini tại gia', 'Khu compound biệt lập']
  }
];

export const BDS18_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Xu Hướng Thiết Kế Kiến Trúc Mở Kết Nối Thiên Nhiên Dẫn Dắt Năm 2026',
    slug: 'xu-huong-thiet-ke-kien-truc-mo-2026',
    date: '28/08/2026',
    author: 'TEMPLATESBDS Design Studio',
    category: 'Kiến Trúc',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Không gian sống xanh, tối giản và xóa nhòa ranh giới giữa nội thất và ngoại thất đang trở thành tiêu chuẩn vàng của giới thượng lưu.',
    content: [
      'Kiến trúc bền vững kết hợp vật liệu tự nhiên như gỗ tái sinh, đá nguyên khối và kính Low-E tràn viền giúp tối ưu hóa ánh sáng mặt trời.',
      'TEMPLATESBDS tự hào là đơn vị tiên phong ứng dụng ngôn ngữ thiết kế biophilic design vào các dự án dinh thự cao cấp.'
    ],
    views: 5420
  },
  {
    id: 2,
    title: 'Bất Động Sản Hàng Hiệu Branded Residences — Kênh Tích Sản Kim Cương Của Giới Tỷ Phú',
    slug: 'bds-hang-hieu-branded-residences-kenh-tich-san',
    date: '26/08/2026',
    author: 'TEMPLATESBDS Investment Insight',
    category: 'Đầu Tư',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Sự bảo chứng từ các thương hiệu khách sạn huyền thoại thế giới mang lại giá trị gia tăng vô hạn và đẳng cấp sống vượt trội.',
    content: [
      'Các dự án Branded Residences ghi nhận mức tăng trưởng giá trị trung bình 25 - 30% cao hơn bất động sản cao cấp thông thường.',
      'Khách hàng không chỉ sở hữu một căn hộ hay biệt thự mà còn sở hữu một phong cách sống đặc quyền được quản lý bởi các tập đoàn 6 sao.'
    ],
    views: 4890
  }
,
  {
    id: 3,
    title: 'Quy Hoạch Đại Lộ Ven Sông Sài Gòn & Cầu Thủ Thiêm 4 — Cú Hích Hạ Tầng Bất Động Sản',
    slug: 'quy-hoach-dai-lo-ven-song-sai-gon-cau-thu-thiem-4',
    date: '24/08/2026',
    author: 'TEMPLATESBDS Insight',
    category: 'Quy Hoạch',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    excerpt: 'Hạ tầng kết nối đồng bộ giữa khu Đông và khu Nam Sài Gòn mở ra chu kỳ phát triển bùng nổ cho các quần thể đô thị sinh thái ven sông.',
    content: [
      'Tuyến đại lộ ven sông kết nối trung tâm Quận 1 tới Củ Chi và Tây Ninh giúp rút ngắn thời gian di chuyển đáng kể.',
      'Các dự án sở hữu mặt tiền sông được săn đón đặc biệt nhờ quỹ đất khan hiếm và giá trị phong thủy đắc địa.'
    ],
    views: 6100
  },
  {
    id: 4,
    title: 'Cẩm Nang Chọn Hướng Nhà & Bố Trí Phong Thủy Tài Lộc Cho Biệt Thự Sân Vườn',
    slug: 'cam-nang-phong-thuy-tai-loc-biet-thu-san-vuon',
    date: '20/08/2026',
    author: 'Chuyên Gia Phong Thủy',
    category: 'Phong Thủy',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Tụ thủy sinh tài lộc — Những nguyên tắc vàng trong kiến tạo không gian sống hòa hợp ngũ hành.',
    content: [
      'Thế đất tả thanh long, hữu bạch hổ, tiền chu tước, hậu huyền vũ luôn là tiêu chí hàng đầu khi chọn lựa dinh thự.',
      'Bố trí hồ cá koi hoặc thác nước tuần hoàn giúp kích hoạt cung tài lộc cho gia chủ.'
    ],
    views: 4570
  }
];

export const resolvePageAndDetail = (p?: string) => {
  if (!p || p === 'home') return { page: 'home', propSlug: '', artSlug: '' };
  const clean = p.replace(/^\//, '').trim();
  if (clean.startsWith('tin-tuc/') || clean.startsWith('news/')) {
    return { page: 'news-detail', propSlug: '', artSlug: clean.replace(/^(tin-tuc\/|news\/)/, '') };
  }
  if (clean === 'tin-tuc' || clean === 'news') return { page: 'news', propSlug: '', artSlug: '' };
  if (clean.startsWith('chi-tiet/') || clean.startsWith('property/')) {
    return { page: 'property-detail', propSlug: clean.replace(/^(chi-tiet\/|property\/)/, ''), artSlug: '' };
  }
  if (clean === 'gioi-thieu' || clean === 'about') return { page: 'about', propSlug: '', artSlug: '' };
  if (clean === 'dich-vu' || clean === 'services') return { page: 'services', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'portfolio') return { page: 'portfolio', propSlug: '', artSlug: '' };
  if (clean === 'giai-thuong' || clean === 'awards') return { page: 'awards', propSlug: '', artSlug: '' };
  if (clean === 'bao-gia' || clean === 'pricing') return { page: 'pricing', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS18Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
}: TemplateProps) {
  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const activeProjects = useMemo<ProjectItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): ProjectItem => ({
        id: String(p.id || p.slug || `p-${idx + 1}`),
        title: p.title || p.name || 'Dự án bất động sản',
        slug: p.slug || `du-an-${idx + 1}`,
        category: p.category || p.type || 'Biệt Thự',
        location: p.location || p.address || 'TP. Hồ Chí Minh',
        district: p.district || p.location || 'Quận 1',
        city: p.city || 'Hồ Chí Minh',
        price: p.price || (p.priceFrom ? `${p.priceFrom} Tỷ` : 'Liên hệ'),
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 10.0),
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '150 m²'),
        areaNum: typeof p.area === 'number' ? p.area : (parseFloat(p.area) || 150),
        image: p.image || p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        featured: Boolean(p.featured || idx < 3),
        hot: Boolean(p.hot || idx === 0),
        year: p.year || '2026',
        style: p.style || 'Kiến trúc hiện đại',
        description: p.description || 'Dự án bất động sản cao cấp với không gian sống chuẩn nghỉ dưỡng thượng lưu.',
        specs: p.specs || p.features || p.amenities || ['Hồ bơi riêng', 'Sân vườn xanh mát', 'Nội thất nhập khẩu', 'An ninh 24/7']
      }));
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS18_PROJECTS).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS18_PROJECTS;
  }, [projects, company]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức căn hộ & dự án',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Tin Tức',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tin tức dự án mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
      const customSlugs = new Set(customNews.map((cn: any) => cn.slug));
      const remainingDefaults = (BDS18_NEWS).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS18_NEWS;
  }, [posts, company]);

  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProjects.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeProjects[0] || BDS18_PROJECTS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return (activeNews[0] || BDS18_NEWS[0]);
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableCategories = useMemo(() => {
    const set = new Set(activeProjects.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableDistricts = useMemo(() => {
    const set = new Set(activeProjects.map(p => p.district).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Forms
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', service: 'Tư Vấn Đầu Tư BĐS', note: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-18';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeProjects.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProject(found);
    }
    if (res.artSlug) {
      const found = BDS18_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'services') urlSlug = 'dich-vu';
    else if (page === 'portfolio') urlSlug = 'du-an';
    else if (page === 'awards') urlSlug = 'giai-thuong';
    else if (page === 'pricing') urlSlug = 'bao-gia';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProject = (proj: ProjectItem) => {
    setSelectedProject(proj);
    navigate('property-detail', proj.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn từ ${contactForm.name} (${contactForm.phone}). Giám đốc sáng tạo TEMPLATESBDS sẽ liên hệ trong 15 phút!`);
    setContactForm({ name: '', phone: '', email: '', service: 'Tư Vấn Đầu Tư BĐS', note: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProjects = useMemo(() => {
    return activeProjects.filter(p => {
      // Keyword
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const text = (p.title + ' ' + p.location + ' ' + p.style + ' ' + p.description).toLowerCase();
        if (!text.includes(kw)) return false;
      }

      // Category matching: fuzzy match
      if (filterCategory !== 'all') {
        const f = filterCategory.toLowerCase();
        const c = (p.category || '').toLowerCase();
        if (c !== f && !c.includes(f) && !f.includes(c)) return false;
      }

      // District matching: fuzzy match
      if (filterDistrict !== 'all') {
        const d = filterDistrict.toLowerCase();
        const loc = ((p.district || '') + ' ' + (p.location || '')).toLowerCase();
        if (!loc.includes(d) && !d.includes((p.district || '').toLowerCase())) return false;
      }

      // Price matching
      if (filterPrice === 'under-30' && p.priceNum >= 30) return false;
      if (filterPrice === '30-50' && (p.priceNum < 30 || p.priceNum > 50)) return false;
      if (filterPrice === 'above-50' && p.priceNum <= 50) return false;

      return true;
    });
  }, [filterCategory, filterDistrict, filterPrice, searchKeyword]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'portfolio') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProjects.length;
    showToast(`🔍 Tìm thấy ${count} công trình & bất động sản nghệ thuật!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('du-an-pho-bien');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (BLACK MINIMALIST LUXURY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0A0A0A] text-white shadow-xl border-b border-white/10 backdrop-blur-md">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo TEMPLATESBDS */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-sm flex items-center justify-center text-slate-950 font-black text-base sm:text-lg shadow-md shrink-0">
            V
          </div>
          <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white group-hover:text-amber-400 transition truncate">
            TEMPLATESBDS
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-3 text-xs font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'home' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'about' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('services')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'services' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Dịch Vụ
          </button>
          <button 
            onClick={() => navigate('portfolio')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'portfolio' || currentPage === 'property-detail' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Dự Án Tiêu Biểu
          </button>
          <button 
            onClick={() => navigate('awards')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'awards' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Giải Thưởng
          </button>
          <button 
            onClick={() => navigate('pricing')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'pricing' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Báo Giá
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-3 py-1.5 transition-all ${currentPage === 'contact' ? 'text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-white'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA Right Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('form-lien-he');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
          >
            Nhận Báo Giá BĐS
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#111] border-t border-white/10 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Giới Thiệu</button>
            <button onClick={() => navigate('services')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Dịch Vụ</button>
            <button onClick={() => navigate('portfolio')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Dự Án</button>
            <button onClick={() => navigate('awards')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Giải Thưởng</button>
            <button onClick={() => navigate('pricing')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Báo Giá</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SECTION (MODERN DARK ARCHITECTURE MANSION)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-[#0A0A0A] text-white min-h-[480px] sm:min-h-[580px] flex items-center overflow-hidden border-b border-white/10">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        alt="TEMPLATESBDS Luxury Architecture"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className={`${MAX_W} mx-auto px-4 relative z-20 w-full py-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider rounded-sm">
              <Sparkles size={13} />
              <span>Đội ngũ giàu kinh nghiệm & chuyên nghiệp</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight text-white">
              Kiến Tạo Không Gian Sống <span className="text-amber-400">Vượt Thời Gian</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              TEMPLATESBDS tự hào là đơn vị tổng thầu thiết kế kiến trúc, thi công nội thất và phân phối các bộ sưu tập bất động sản nghệ thuật độc bản hàng đầu Việt Nam.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('du-an-pho-bien');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer"
              >
                Khám Phá Dự Án ›
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-white/20 transition cursor-pointer"
              >
                Tư Vấn Miễn Phí
              </button>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-[#18181B]/90 backdrop-blur-md p-6 border border-white/10 rounded-md shadow-2xl max-w-sm w-full space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500 text-slate-950 font-serif font-black text-2xl flex items-center justify-center rounded-sm">
                  24
                </div>
                <div>
                  <span className="text-sm font-black text-white block">NĂM KIẾN TẠO</span>
                  <span className="text-[10px] text-slate-400 uppercase">TIÊN PHONG TRONG NGÀNH KIẾN TRÚC & BĐS</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                Đồng hành cùng hơn 2.500 chủ nhân thượng lưu kiến tạo tổ ấm sang trọng và tích sản an toàn bền vững.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: PHÙ HỢP VỚI NHU CẦU VÀ MONG MUỐN (ABOUT)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAboutSection = () => (
    <section id="gioi-thieu" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-200 shadow-xl rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
              alt="TEMPLATESBDS Architecture"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 p-3 rounded-sm font-serif font-black text-center shadow-lg">
              <span className="text-2xl block leading-none">24+</span>
              <span className="text-[9px] uppercase tracking-wider block mt-0.5">Năm Phát Triển</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              TRIẾT LÝ THIẾT KẾ VIXYO
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 uppercase leading-tight">
              Phù Hợp Với Mọi Nhu Cầu & Khát Vọng An Cư
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mỗi công trình do TEMPLATESBDS kiến tạo là sự kết hợp hoàn hảo giữa công năng tối ưu, tính thẩm mỹ đỉnh cao và dấu ấn cá nhân độc bản của gia chủ.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chúng tôi sở hữu chuỗi cung ứng vật liệu nội thất cao cấp nhập khẩu trực tiếp từ Ý, Đức và Nhật Bản, đảm bảo chất lượng hoàn thiện chuẩn 6 sao.
            </p>

            <div className="pt-3 flex items-center gap-6">
              <button
                onClick={() => navigate('about')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow cursor-pointer"
              >
                Tìm Hiểu Thêm ›
              </button>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Hotline Trực Tiếp</span>
                <strong className="text-sm font-black text-amber-600">0919 006 030</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: DỊCH VỤ CHẤT LƯỢNG CAO ĐƯỢC CUNG CẤP (DARK BOXES)
  // ─────────────────────────────────────────────────────────────────────────
  const renderServicesSection = () => (
    <section id="dich-vu" className="py-16 bg-[#0A0A0A] text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-widest block">
            DỊCH VỤ TOÀN DIỆN
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
            Dịch Vụ Chất Lượng Cao Được Cung Cấp
          </h2>
          <p className="text-xs text-slate-400">
            Hệ sinh thái dịch vụ khép kín từ tư vấn đầu tư bất động sản, thiết kế kiến trúc đến thi công nội thất chìa khóa trao tay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
              <Building2 size={24} />
            </div>
            <h3 className="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">
              Tư Vấn Đầu Tư Bất Động Sản Hạng Sang
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phân phối độc quyền các bộ sưu tập Dinh thự ven sông, Penthouse trung tâm và Biệt thự đồi nghỉ dưỡng sinh thái.
            </p>
          </div>

          <div className="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
              <Palette size={24} />
            </div>
            <h3 className="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">
              Thiết Kế Kiến Trúc & Cảnh Quan Độc Bản
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đội ngũ kiến trúc sư quốc tế sáng tạo nên những tuyệt tác kiến trúc hòa quyện thiên nhiên và phong thủy tài lộc.
            </p>
          </div>

          <div className="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
              <Layers3 size={24} />
            </div>
            <h3 className="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">
              Thi Công Hoàn Thiện Nội Thất Chuẩn 6 Sao
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cam kết tiến độ chính xác từng ngày, vật liệu chế tác thủ công tinh xảo và bảo hành công trình lên tới 10 năm.
            </p>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: CÁC VẤN ĐỀ THẮC MẮC (FAQ & PROCESS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFaqAndProcess = () => (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left FAQ Accordions */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              GIẢI ĐÁP THẮC MẮC
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              Các Câu Hỏi Thường Gặp
            </h2>

            <div className="space-y-3 pt-2 text-xs">
              {[
                { q: 'Quy trình tư vấn và thiết kế kiến trúc tại TEMPLATESBDS diễn ra như thế nào?', a: 'Quy trình gồm 5 bước tiêu chuẩn: Khảo sát thực địa -> Lên mặt bằng 2D -> Diễn họa 3D -> Dự toán chi tiết -> Triển khai thi công và giám sát tác giả.' },
                { q: 'TEMPLATESBDS có chính sách bảo hành công trình và nội thất như thế nào?', a: 'Chúng tôi bảo hành kết cấu công trình 10 năm, bảo hành nội thất 3 năm và bảo trì định kỳ 6 tháng một lần hoàn toàn miễn phí.' },
                { q: 'Pháp lý các sản phẩm bất động sản do TEMPLATESBDS phân phối ra sao?', a: '100% dự án và sản phẩm BĐS trong hệ sinh thái TEMPLATESBDS đều có sổ hồng lâu dài, pháp lý hoàn chỉnh và được ngân hàng lớn bảo lãnh.' },
              ].map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                    className="w-full p-3.5 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-left hover:bg-amber-50"
                  >
                    <span>{item.q}</span>
                    {openFaqIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFaqIdx === idx && (
                    <div className="p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-200">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Process 3 Steps */}
          <div className="lg:col-span-5 space-y-4 bg-slate-50 p-6 border border-slate-200 rounded-sm">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest block">
              QUY TRÌNH 3 BƯỚC
            </span>
            <h3 className="text-xl font-serif font-black text-slate-900 uppercase">
              Hành Trình Kiến Tạo Tổ Ấm
            </h3>

            <div className="space-y-4 text-xs pt-2">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-full shrink-0">1</div>
                <div>
                  <strong className="text-slate-900 block">Khảo Sát & Lập Phương Án Ý Tưởng</strong>
                  <p className="text-slate-600">Lắng nghe thấu đáo phong cách sống và nhu cầu của từng thành viên gia đình.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-slate-900 text-white font-black flex items-center justify-center rounded-full shrink-0">2</div>
                <div>
                  <strong className="text-slate-900 block">Thiết Kế 3D & Lựa Chọn Vật Liệu</strong>
                  <p className="text-slate-600">Trải nghiệm không gian sống thực tế ảo và chọn mẫu vật liệu nhập khẩu trực tiếp.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-full shrink-0">3</div>
                <div>
                  <strong className="text-slate-900 block">Thi Công & Bàn Giao Chìa Khóa</strong>
                  <p className="text-slate-600">Nghiệm thu chuẩn xác từng chi tiết và bàn giao sổ bảo hành VIP dài hạn.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: MỘT SỐ DỰ ÁN PHỔ BIẾN (PORTFOLIO GRID WITH DYNAMIC FILTERS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPortfolioSection = () => (
    <section id="du-an-pho-bien" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-3 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-600 tracking-widest">
              <span>HƠN 2.500+ DỰ ÁN ĐÃ BÀN GIAO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              Một Số Dự Án Phổ Biến ({filteredProjects.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 rounded-sm focus:outline-none font-medium"
            >
              <option value="all" className="text-slate-900 bg-white font-medium">Loại BĐS / Kiến Trúc (Tất cả)</option>
              {availableCategories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c} className="text-slate-900 bg-white font-medium">{c}</option>
              ))}
            </select>

            <select
              value={filterDistrict}
              onChange={e => setFilterDistrict(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 rounded-sm focus:outline-none font-medium"
            >
              <option value="all" className="text-slate-900 bg-white font-medium">Khu Vực (Tất cả)</option>
              {availableDistricts.filter(d => d !== 'all').map(d => (
                <option key={d} value={d} className="text-slate-900 bg-white font-medium">{d}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase rounded-sm shadow cursor-pointer"
            >
              Tìm Kiếm
            </button>
          </div>
        </div>

        {/* Grid 6 Cards (3 Columns) */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-sm space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy dự án nào khớp hoàn toàn với tiêu chí này.</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterDistrict('all');
                setFilterPrice('all');
                setSearchKeyword('');
              }}
              className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-sm shadow"
            >
              Xem Tất Cả Dự Án
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(proj => (
              <div 
                key={proj.id}
                className="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm text-amber-400 text-[9px] font-black uppercase rounded-sm">
                    {proj.category}
                  </span>
                  {proj.hot && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase rounded-sm">
                      HOT
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>{proj.style}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 
                    onClick={() => handleOpenProject(proj)}
                    className="text-sm font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-amber-600 cursor-pointer min-h-[38px]"
                  >
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-500 truncate">
                    📍 {proj.location}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">GIÁ NIÊM YẾT</span>
                      <span className="text-sm font-black text-slate-950">{proj.price}</span>
                    </div>
                    <button
                      onClick={() => handleOpenProject(proj)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] uppercase rounded-sm transition cursor-pointer"
                    >
                      Chi Tiết ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: GIẢI THƯỞNG & ĐÁNH GIÁ TÍCH CỰC (AWARDS & TESTIMONIALS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAwardsSection = () => (
    <section id="giai-thuong" className="py-16 bg-[#0A0A0A] text-white overflow-hidden border-b border-white/10">
      <div className={`${MAX_W} mx-auto px-4 space-y-12`}>
        
        {/* Big Numbers Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-white/10 pb-12">
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">82+</span>
            <p className="text-xs uppercase font-bold text-slate-400">Giải Thưởng Kiến Trúc</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">42+</span>
            <p className="text-xs uppercase font-bold text-slate-400">Dự Án Quốc Tế</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">24+</span>
            <p className="text-xs uppercase font-bold text-slate-400">Năm Kinh Nghiệm</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-serif font-black text-amber-400">37+</span>
            <p className="text-xs uppercase font-bold text-slate-400">Chuyên Gia Cấp Cao</p>
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-black uppercase text-amber-400 tracking-widest block">
              Ý KIẾN KHÁCH HÀNG VIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
              Đánh Giá Tích Cực Từ Khách Hàng
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sự hài lòng và tin tưởng tuyệt đối của các chủ nhân danh giá chính là thước đo thành công cao nhất của TEMPLATESBDS.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#18181B] p-8 border border-white/10 rounded-sm relative shadow-2xl">
            <Quote size={40} className="text-amber-500/20 absolute top-4 right-4" />
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-4">
              &quot;Tôi đã hợp tác cùng TEMPLATESBDS để thiết kế dinh thự Riviera ven sông tại Quận 7. Đội ngũ kiến trúc sư đã mang lại một giải pháp vượt xa kỳ vọng ban đầu của gia đình tôi. Từng chi tiết đá Marble và hệ thống ánh sáng đều hoàn hảo đến kinh ngạc.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-950">
                L
              </div>
              <div>
                <strong className="text-xs font-bold text-white block">Nguyễn Văn Long</strong>
                <span className="text-[10px] text-amber-400 uppercase">Chủ tịch Tập đoàn Xuất Nhập Khẩu</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: BẢNG GIÁ & GÓI DỊCH VỤ (PRICING PLANS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPricingSection = () => (
    <section id="bao-gia" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-amber-600 tracking-widest">
            BẢNG GIÁ DỊCH VỤ & THIẾT KẾ
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
            Gói Dịch Vụ Thiết Kế & Thi Công Trọn Gói
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-50 p-6 border border-slate-200 rounded-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">GÓI TIÊU CHUẨN</span>
              <h3 className="text-xl font-serif font-black text-slate-900">Standard Suite</h3>
              <p className="text-2xl font-black text-slate-950">350.000 đ <span className="text-xs font-normal text-slate-500">/ m²</span></p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t">
                <li>✔ Thiết kế mặt bằng công năng 2D</li>
                <li>✔ Phối cảnh 3D không gian chính</li>
                <li>✔ Bản vẽ kỹ thuật thi công cơ bản</li>
              </ul>
            </div>
            <button onClick={() => navigate('contact')} className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase rounded-sm">
              Đăng Ký Gói
            </button>
          </div>

          <div className="bg-[#18181B] text-white p-6 border-2 border-amber-500 rounded-sm space-y-4 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 right-4 px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase rounded-sm">
              PHỔ BIẾN NHẤT
            </span>
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase">GÓI CAO CẤP</span>
              <h3 className="text-xl font-serif font-black text-white">Premium Suite</h3>
              <p className="text-2xl font-black text-amber-400">550.000 đ <span className="text-xs font-normal text-slate-400">/ m²</span></p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <li>✔ Toàn bộ hồ sơ 3D nội ngoại thất chi tiết</li>
                <li>✔ Dự toán bóc tách vật tư nhập khẩu</li>
                <li>✔ Giám sát tác giả tại hiện trường 10 buổi</li>
                <li>✔ Tặng video 3D walkthrough thực tế ảo</li>
              </ul>
            </div>
            <button onClick={() => navigate('contact')} className="w-full py-2.5 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-sm">
              Đăng Ký Gói VIP
            </button>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 rounded-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">GÓI ĐỘC BẢN</span>
              <h3 className="text-xl font-serif font-black text-slate-900">Bespoke Mansion</h3>
              <p className="text-2xl font-black text-slate-950">850.000 đ <span className="text-xs font-normal text-slate-500">/ m²</span></p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t">
                <li>✔ Thiết kế độc bản bởi Giám đốc sáng tạo</li>
                <li>✔ Đặt hàng nội thất may đo thủ công từ Ý</li>
                <li>✔ Giám sát toàn thời gian 24/7 đến khi bàn giao</li>
              </ul>
            </div>
            <button onClick={() => navigate('contact')} className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase rounded-sm">
              Liên Hệ Độc Bản
            </button>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: TIN TỨC NỔI BẬT (DARK BLOG CARDS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-[#0A0A0A] text-white border-b border-white/10">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-white">
            CÁC TIN TỨC NỔI BẬT
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-amber-400 hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeNews.map(n => (
            <div key={n.id} className="bg-[#18181B] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between group shadow-lg">
              <img src={n.image} alt={n.title} className="w-full h-56 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-base font-serif font-black text-white uppercase hover:text-amber-400 cursor-pointer line-clamp-2"
                >
                  {n.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {n.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 8: FORM LIÊN HỆ TƯ VẤN (CONTACT DARK FORM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderContactFormSection = () => (
    <section id="form-lien-he" className="py-16 bg-[#111111] text-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl text-center space-y-6`}>
        
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-widest block">
            KẾT NỐI VỚI CHUYÊN GIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
            Liên Hệ Tìm Hiểu Dịch Vụ
          </h2>
          <p className="text-xs text-slate-400">
            Hãy để lại thông tin, các kiến trúc sư trưởng và chuyên viên đầu tư TEMPLATESBDS sẽ liên hệ tư vấn chuyên sâu cho bạn.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="bg-[#18181B] p-6 border border-white/10 rounded-sm text-left text-xs space-y-4 shadow-2xl">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Dịch vụ quan tâm</label>
            <div className="grid grid-cols-3 gap-2">
              {['Tư Vấn Đầu Tư BĐS', 'Thiết Kế Kiến Trúc', 'Thi Công Nội Thất'].map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setContactForm({ ...contactForm, service: s })}
                  className={`p-2 rounded-sm text-[11px] font-bold border transition ${contactForm.service === s ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Họ và tên *</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Số điện thoại *</label>
              <input
                type="tel"
                required
                value={contactForm.phone}
                onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="0919 006 030"
                className="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={contactForm.email}
              onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
          >
            Gửi Yêu Cầu Tư Vấn Ngay
          </button>
        </form>

      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-slate-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#18181B] text-white border border-amber-500 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce rounded-sm">
          <CheckCircle2 size={16} className="text-amber-400" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderAboutSection()}
            {renderServicesSection()}
            {renderFaqAndProcess()}
            {renderPortfolioSection()}
            {renderAwardsSection()}
            {renderPricingSection()}
            {renderNewsSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderAboutSection()}
            {renderAwardsSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'services' && (
          <main>
            {renderServicesSection()}
            {renderPricingSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'portfolio' && (
          <main>
            {renderPortfolioSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'awards' && (
          <main>
            {renderAwardsSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'pricing' && (
          <main>
            {renderPricingSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderContactFormSection()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-[#111111] min-h-screen text-white">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('portfolio')} className="text-xs font-bold text-amber-400 hover:underline">
                ‹ Quay lại danh mục dự án
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
                {selectedProject.title}
              </h1>
              <p className="text-sm font-black text-amber-400">
                Giá niêm yết: {selectedProject.price} — Diện tích: {selectedProject.area} — Phong cách: {selectedProject.style}
              </p>
              <PropertyImageGallery images={(selectedProject as any)?.gallery || (selectedProject as any)?.images} image={(selectedProject as any)?.image || (selectedProject as any)?.thumbnail} badge1={(selectedProject as any)?.type || (selectedProject as any)?.badge} badge2={(selectedProject as any)?.direction || (selectedProject as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
              <div className="p-4 bg-[#18181B] border border-white/10 rounded-sm space-y-2">
                <h4 className="font-bold text-xs uppercase text-amber-400">Thông số công trình:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedProject.specs.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">✔ {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-[#111111] min-h-screen text-white">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-amber-400 hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black uppercase text-white">
                {selectedArticle.title}
              </h1>
              <div className="text-[11px] text-slate-400 border-b border-white/10 pb-2">
                🕒 {selectedArticle.date} • Tác giả: {selectedArticle.author} • {selectedArticle.views} lượt xem
              </div>
              <img src={selectedArticle.image} alt="" className="w-full h-80 object-cover rounded-sm border border-white/10" />
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-18 (TEMPLATESBDS Architecture & Luxury Real Estate)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
