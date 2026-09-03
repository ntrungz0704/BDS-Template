'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../utils/cmsSectionHelper';
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
  Cpu, Radio, Globe, Zap, BarChart3, Wifi
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../../../utils/demo';

export interface TemplateProps {
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
  pageContent?: any;
}

export interface SmartCityProject {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  priceRange: string;
  priceNum: number; // in billion VND
  areaRange: string;
  developer: string;
  status: string;
  techHighlights: string[];
  image: string;
  hot?: boolean;
  featured?: boolean;
  iotScore: number; // e.g. 98/100
  description: string;
  amenities: string[];
}

export interface TechNewsItem {
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
// BDS-24 MOCK DATA: {company?.name || 'TEMPLATESBDS'} — TRANG TIN CÔNG NGHỆ BĐS & ĐÔ THỊ THÔNG MINH
// ─────────────────────────────────────────────────────────────────────────────

export const BDS24_PROJECTS: SmartCityProject[] = [
  {
    id: 'vinhomes-smart-city-tay-mo',
    title: 'Vinhomes Smart City Tây Mỗ — Đại Đô Thị AI 4.0',
    slug: 'vinhomes-smart-city-tay-mo-ai',
    address: 'Đại Lộ Thăng Long, Nam Từ Liêm, Hà Nội',
    city: 'Hà Nội',
    priceRange: '2.5 - 8.5 Tỷ VNĐ',
    priceNum: 2.5,
    areaRange: '32 - 105 m²',
    developer: 'Vingroup',
    status: 'Đang Bàn Giao & Mở Bán Phân Khu Mới',
    techHighlights: ['Face ID nhận diện khuôn mặt', 'Camera AI phân tích an ninh', 'Smart Parking tự động tìm chỗ đỗ', 'Ứng dụng cư dân VinID Smart'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    iotScore: 99,
    description: 'Đại đô thị thông minh chuẩn quốc tế đầu tiên tại Việt Nam với hệ sinh thái 4 trụ cột: An ninh thông minh, Vận hành thông minh, Cộng đồng thông minh, Căn hộ thông minh.',
    amenities: ['Vườn Nhật Zen Park 6.1ha', 'Công viên trung tâm Central Park', 'Bệnh viện Vinmec chuẩn quốc tế', 'Trường liên cấp Vinschool']
  },
  {
    id: 'the-global-city-thu-duc',
    title: 'The Global City — Trung Tâm Đô Thị Mới Chuẩn Foster+Partners',
    slug: 'the-global-city-thu-duc-smart',
    address: 'Đỗ Xuân Hợp, P. An Phú, TP. Thủ Đức, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    priceRange: '18.0 - 45.0 Tỷ VNĐ',
    priceNum: 18.0,
    areaRange: '95 - 350 m²',
    developer: 'Masterise Homes',
    status: 'Đang Xây Dựng & Bàn Giao Shophouse',
    techHighlights: ['Hệ thống nhạc nước lớn nhất Đông Nam Á', 'Mạng lưới IoT năng lượng mặt trời', 'Cảm biến vi khí hậu thông minh', 'Hạ tầng xe điện ngầm 100%'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    iotScore: 98,
    description: 'Downtown thứ 2 của TP.HCM được thiết kế bởi huyền thoại kiến trúc thế giới Foster + Partners, biểu tượng của lối sống thượng lưu hiện đại.',
    amenities: ['Kênh đào nhạc nước 2km', 'TTTM hạng A 123.000m²', 'Sân Golf 18 lỗ quốc tế', 'Bến du thuyền tiêu chuẩn 5 sao']
  },
  {
    id: 'ecopark-smart-green-city',
    title: 'Ecopark Grand The Island — Đô Thị Sinh Thái Thông Minh Ecopark',
    slug: 'ecopark-grand-the-island-smart',
    address: 'Khu Đô Thị Ecopark, Văn Giang, Hưng Yên',
    city: 'Hưng Yên',
    priceRange: '32.0 - 120.0 Tỷ VNĐ',
    priceNum: 32.0,
    areaRange: '270 - 1200 m²',
    developer: 'Ecopark Corporation',
    status: 'Đã Bàn Giao (Sổ Đỏ Vĩnh Viễn)',
    techHighlights: ['Lọc nước sinh thái tự nhiên chuẩn Nhật', 'Biệt thự đảo biệt lập quản lý AI', 'Du thuyền đưa đón nội khu', 'Cảm biến đo chất lượng không khí PM2.5'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    iotScore: 96,
    description: 'Quần thể biệt thự đảo thượng lưu vươn mình ra mặt nước, nơi 100% diện tích tiếp xúc với thiên nhiên sinh thái trong lành bậc nhất miền Bắc.',
    amenities: ['Clubhouse đẳng cấp quốc tế', 'Hồ nước ngọt tuần hoàn sinh học', 'An ninh 3 lớp bảo vệ 24/7', 'Bến đỗ du thuyền riêng từng căn']
  },
  {
    id: 'lotte-eco-smart-city-thu-thiem',
    title: 'Lotte Eco Smart City Thủ Thiêm — Đại Đô Thị Tài Chính & Công Nghệ',
    slug: 'lotte-eco-smart-city-thu-thiem',
    address: 'Khu Chức Năng 2a, Đô Thị Mới Thủ Thiêm, TP. Thủ Đức, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    priceRange: '25.0 - 80.0 Tỷ VNĐ',
    priceNum: 25.0,
    areaRange: '88 - 320 m²',
    developer: 'Lotte Group (Hàn Quốc)',
    status: 'Đang Triển Khai Giai Đoạn 1',
    techHighlights: ['Hệ thống quản lý tòa nhà BMS thông minh', 'Thang máy nhận diện vân tay & Face ID', 'Hệ thống logistics giao hàng robot ngầm', 'Chứng chỉ công trình xanh LEED Platinum'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    hot: true,
    featured: true,
    iotScore: 99,
    description: 'Tổ hợp tài chính, thương mại dịch vụ tổng hợp và dân cư đa chức năng ứng dụng công nghệ thông tin tiên tiến hàng đầu châu Á.',
    amenities: ['Khách sạn 6 sao Lotte Legend', 'Trung tâm thương mại ngầm liên tuyến Metro', 'Đài quan sát Sky Deck 360 độ', 'Hồ bơi chân mây vô cực']
  },
  {
    id: 'sun-grand-city-feria-ha-long',
    title: 'Sun Grand City Feria Hạ Long — Đô Thị Nghỉ Dưỡng Phong Cách Địa Trung Hải',
    slug: 'sun-grand-city-feria-ha-long',
    address: 'Đường Hạ Long, P. Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    city: 'Quảng Ninh',
    priceRange: '15.0 - 38.0 Tỷ VNĐ',
    priceNum: 15.0,
    areaRange: '130 - 350 m²',
    developer: 'Sun Group',
    status: 'Đã Bàn Giao (Sổ Đỏ Lâu Dài)',
    techHighlights: ['Quản lý vận hành khu đô thị thông minh', 'Hệ thống chiếu sáng năng lượng mặt trời', 'Camera 360 AI giám sát bãi biển', 'App tiện ích cư dân Sun Home'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: true,
    iotScore: 94,
    description: 'Biệt thự phong cách Tây Ban Nha & Địa Trung Hải ôm trọn vịnh kỳ quan Hạ Long, sở hữu bãi tắm cát trắng riêng tư tuyệt đẹp.',
    amenities: ['Công viên Sun World Ha Long Complex', 'Bãi tắm riêng Bãi Cháy', 'Phố đi bộ ẩm thực ven biển', 'Bến du thuyền quốc tế Hạ Long']
  },
  {
    id: 'meyhomes-capital-phu-quoc',
    title: 'Meyhomes Capital Phú Quốc — Thành Phố Tinh Khiết Chuẩn Đô Thị Thông Minh',
    slug: 'meyhomes-capital-phu-quoc-smart',
    address: 'Bãi Trường, P. An Thới, TP. Phú Quốc, Kiên Giang',
    city: 'Kiên Giang',
    priceRange: '12.5 - 28.0 Tỷ VNĐ',
    priceNum: 12.5,
    areaRange: '117 - 240 m²',
    developer: 'Tân Á Đại Thành (Meyland)',
    status: 'Đang Bàn Giao Giai Đoạn 1 & 2',
    techHighlights: ['Hệ sinh thái lọc nước sạch tinh khiết uống tại vòi', 'Hạ tầng điện năng lượng mặt trời thông minh', 'Hệ thống quản lý đô thị Smart City Meyhomes', 'Cảm biến tưới cây tự động IoT'],
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: false,
    featured: true,
    iotScore: 97,
    description: 'Thành phố đảo nhiệt đới đa sắc màu tại Bãi Trường Phú Quốc, đất ở đô thị sở hữu lâu dài duy nhất tại nam đảo ngọc.',
    amenities: ['Công viên sông Mey River Park', 'Trung tâm thể thao phức hợp Clubhouse', 'Trường học liên cấp quốc tế', 'Hồ điều hòa ánh sáng nghệ thuật']
  }
];

export const BDS24_NEWS: TechNewsItem[] = [
  {
    id: 1,
    title: 'Xu Hướng BĐS Proptech 4.0: Trí Tuệ Nhân Tạo AI & Bản Đồ Số Định Hình Thị Trường',
    slug: 'xu-huong-bds-proptech-40-ai-va-ban-do-so',
    date: '29/08/2026',
    author: 'RealtyBuild Tech Insights',
    category: 'Công Nghệ BĐS',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Ứng dụng công nghệ thực tế ảo VR360, định giá nhà đất bằng thuật toán học máy và giao dịch số giúp tiết kiệm 70% thời gian cho nhà đầu tư.',
    content: [
      'Công nghệ PropTech đang chuyển dịch từ cổng thông tin rao vặt truyền thống sang các nền tảng thông minh tích hợp dữ liệu lớn Big Data và AI.',
      'Khách hàng có thể trải nghiệm xem nhà 3D, kiểm tra pháp lý trực tuyến và nộp hồ sơ công chứng điện tử chỉ bằng vài thao tác trên điện thoại.'
    ],
    views: 8450
  },
  {
    id: 2,
    title: 'Đô Thị Thông Minh (Smart City) — Tiêu Chuẩn Sống Mới Của Cư Dân Thế Hệ Trẻ Gen Z & Millennials',
    slug: 'do-thi-thong-minh-smart-city-tieu-chuan-song-moi',
    date: '27/08/2026',
    author: 'Hiệp Hội Đô Thị Thông Minh',
    category: 'Smart City',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Hệ thống an ninh nhận diện khuôn mặt, trạm sạc xe điện thông minh và năng lượng sạch trở thành tiêu chí bắt buộc khi chọn mua nhà.',
    content: [
      'Hơn 85% người mua nhà trẻ tuổi sẵn sàng chi trả thêm 10-15% giá trị căn hộ để được sống trong khu đô thị tích hợp giải pháp IoT toàn diện.'
    ],
    views: 6120
  },
  {
    id: 3,
    title: 'Bản Đồ Quy Hoạch Giao Thông & Đường Vành Đai Mới: Cơ Hội Đầu Tư BĐS Bứt Phá',
    slug: 'ban-do-quy-hoach-giao-thong-co-hoi-dau-tu',
    date: '25/08/2026',
    author: 'Chuyên Gia Quy Hoạch Đô Thị',
    category: 'Quy Hoạch Số',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Tra cứu thông tin quy hoạch sử dụng đất trực tuyến 24/7 giúp nhà đầu tư nắm bắt cơ hội trước khi hạ tầng giao thông khởi công.',
    content: [
      'Dữ liệu quy hoạch địa chính số hóa đem lại sự minh bạch tuyệt đối cho thị trường bất động sản Việt Nam.'
    ],
    views: 7390
  }
];

export const resolvePageAndDetail = (p?: string) => {
  if (!p || p === 'home') return { page: 'home', propSlug: '', artSlug: '' };
  const clean = p.replace(/^\//, '').trim();
  if (clean.startsWith('tin-tuc/') || clean.startsWith('news/')) {
    return { page: 'news-detail', propSlug: '', artSlug: clean.replace(/^(tin-tuc\/|news\/)/, '') };
  }
  if (clean === 'tin-tuc' || clean === 'news') return { page: 'news', propSlug: '', artSlug: '' };
  if (clean.startsWith('chi-tiet/') || clean.startsWith('project/')) {
    return { page: 'project-detail', propSlug: clean.replace(/^(chi-tiet\/|project\/)/, ''), artSlug: '' };
  }
  if (clean === 'gioi-thieu' || clean === 'about') return { page: 'about', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'do-thi-thong-minh' || clean === 'smart-cities') return { page: 'smart-cities', propSlug: '', artSlug: '' };
  if (clean === 'proptech-40' || clean === 'proptech') return { page: 'proptech', propSlug: '', artSlug: '' };
  if (clean === 'ban-do-quy-hoach' || clean === 'map') return { page: 'map', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS24Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
, pageContent }: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const activeProjects = useMemo<SmartCityProject[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): SmartCityProject => ({
        id: String(p.id || p.slug || `sc-${idx + 1}`),
        title: p.title || p.name || 'Đại Đô Thị Thông Minh AI 4.0',
        slug: p.slug || `du-an-${idx + 1}`,
        address: p.address || p.location || 'Hà Nội & TP. Hồ Chí Minh',
        city: p.city || 'Hà Nội',
        priceRange: p.price || '2.5 - 8.5 Tỷ VNĐ',
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 2.5),
        areaRange: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '35 - 120 m²'),
        developer: p.developer || company?.name || 'Tập Đoàn BĐS',
        status: p.status || 'Đang Mở Bán',
        techHighlights: p.features || p.techHighlights || ['Face ID thông minh', 'Camera AI an ninh 24/7', 'Smart Parking'],
        image: p.image || p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        hot: Boolean(p.hot || idx === 0),
        featured: Boolean(p.featured || idx < 4),
        iotScore: p.iotScore || 98,
        description: p.description || 'Dự án áp dụng công nghệ số và hệ thống quản trị năng lượng thông minh.',
        amenities: p.amenities || ['Hồ bơi tràn viền', 'Sân thể thao', 'Công viên xanh', 'Bãi đỗ xe AI']
      }));
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS24_PROJECTS).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS24_PROJECTS;
  }, [projects, company]);
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<SmartCityProject>(() => {
    if (initialParsed.propSlug) {
      const found = activeProjects.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return (activeProjects[0] || BDS24_PROJECTS[0]);
  });

  const [selectedArticle, setSelectedArticle] = useState<TechNewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS24_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS24_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableCities = useMemo(() => {
    const set = new Set(activeProjects.map(p => p.city).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableDevelopers = useMemo(() => {
    const set = new Set(activeProjects.map(p => p.developer).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterCity, setFilterCity] = useState('all');
  const [filterDeveloper, setFilterDeveloper] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Forms
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', email: '', projectInterested: 'Vinhomes Smart City Tây Mỗ — Đại Đô Thị AI 4.0' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-24';

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
      const found = BDS24_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'project-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'smart-cities') urlSlug = 'do-thi-thong-minh';
    else if (page === 'proptech') urlSlug = 'proptech-40';
    else if (page === 'map') urlSlug = 'ban-do-quy-hoach';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProject = (p: SmartCityProject) => {
    setSelectedProject(p);
    navigate('project-detail', p.slug);
  };

  const handleOpenArticle = (art: TechNewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name || !consultForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn từ ${consultForm.name} (${consultForm.phone}). Chuyên viên công nghệ RealtyBuild sẽ hỗ trợ quý khách ngay!`);
    setConsultForm({ name: '', phone: '', email: '', projectInterested: 'Vinhomes Smart City Tây Mỗ — Đại Đô Thị AI 4.0' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProjects = useMemo(() => {
    return activeProjects.filter(p => {
      // City
      if (filterCity !== 'all' && p.city !== filterCity) return false;

      // Developer
      if (filterDeveloper !== 'all' && p.developer !== filterDeveloper) return false;

      // Keyword
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const matchTitle = (p.title || '').toLowerCase().includes(kw);
        const matchAddr = (p.address || '').toLowerCase().includes(kw);
        const matchDev = (p.developer || '').toLowerCase().includes(kw);
        if (!matchTitle && !matchAddr && !matchDev) return false;
      }

      // Price matching
      if (filterPrice === 'under-10' && p.priceNum >= 10) return false;
      if (filterPrice === '10-25' && (p.priceNum < 10 || p.priceNum > 25)) return false;
      if (filterPrice === 'above-25' && p.priceNum <= 25) return false;

      return true;
    });
  }, [filterCity, filterDeveloper, searchKeyword, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'projects' && currentPage !== 'smart-cities') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProjects.length;
    showToast(`🔍 Tìm thấy ${count} đại đô thị thông minh phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-smart-cities');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (CYBER INDIGO & NEON CYAN)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white shadow-xl border-b border-cyan-500/30">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Left Brand */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#06B6D4] to-[#2563EB] flex items-center justify-center text-white font-black text-base sm:text-xl shadow shrink-0">
            ⚡
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-black tracking-wider text-cyan-400 block leading-none truncate">
              {company?.name || 'TEMPLATESBDS'}
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5 truncate">
              TRANG TIN CÔNG NGHỆ BĐS & ĐÔ THỊ THÔNG MINH SỐ 1
            </span>
          </div>
        </div>

        {/* Center Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('about')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'about' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('projects')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'projects' || currentPage === 'project-detail' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Dự Án</button>
          <button onClick={() => navigate('smart-cities')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'smart-cities' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Đô Thị Smart</button>
          <button onClick={() => navigate('proptech')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'proptech' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>PropTech 4.0</button>
          <button onClick={() => navigate('map')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'map' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Bản Đồ Số</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'text-cyan-300 font-extrabold bg-[#1E293B]' : 'hover:text-cyan-300'}`}>Liên Hệ</button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('form-tu-van-tech');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-block px-4 py-2 bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Tư Vấn Smart City
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 rounded-md shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F172A] border-t border-cyan-500/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Giới Thiệu</button>
            <button onClick={() => navigate('projects')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Dự Án</button>
            <button onClick={() => navigate('smart-cities')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Đô Thị Smart</button>
            <button onClick={() => navigate('proptech')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">PropTech 4.0</button>
            <button onClick={() => navigate('map')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Bản Đồ Số</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#1E293B] hover:text-cyan-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER CÔNG NGHỆ PROPTECH & SMART CITY
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-[#0F172A] text-white min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden border-b border-cyan-500/30">
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
        alt="RealtyBuild Smart Cities"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/50 to-transparent" />

      <div className="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 bg-[#06B6D4]/20 border border-cyan-400 text-cyan-300 text-xs font-black uppercase tracking-widest">
          NỀN TẢNG THẨM ĐỊNH & DỮ LIỆU ĐÔ THỊ THÔNG MINH SỐ 1
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-wider drop-shadow-2xl">
          ĐÔ THỊ THÔNG MINH <span className="text-cyan-400">& PROPTECH 4.0</span>
        </h1>
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Khám phá mạng lưới hơn 500+ đại đô thị thông minh chuẩn IoT, bản đồ quy hoạch số hóa và nền tảng dữ liệu BĐS thời gian thực hàng đầu Việt Nam.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('danh-sach-smart-cities');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            Khám Phá Các Dự Án Smart City ›
          </button>
          <button
            onClick={() => navigate('map')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 cursor-pointer"
          >
            Xem Bản Đồ Quy Hoạch Số
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: LƯỚI ĐẠI ĐÔ THỊ THÔNG MINH
  // ─────────────────────────────────────────────────────────────────────────
  const renderProjectsSection = () => (
    <section id="danh-sach-smart-cities" className="py-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0F172A] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-cyan-600 tracking-widest block">
              DỮ LIỆU ĐÔ THỊ SỐ HÓA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
              DANH SÁCH ĐẠI ĐÔ THỊ THÔNG MINH ({filteredProjects.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Khu Vực (Tất cả)</option>
              {availableCities.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filterDeveloper}
              onChange={e => setFilterDeveloper(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Chủ Đầu Tư (Tất cả)</option>
              {availableDevelopers.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold uppercase shadow cursor-pointer"
            >
              Lọc
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div 
              key={proj.id}
              className="bg-white text-slate-900 border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden font-medium"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0F172A] text-cyan-300 text-[10px] font-black uppercase">
                  ⚡ IoT Score: {proj.iotScore}/100
                </span>
                {proj.hot && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">
                    HOT
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 
                  onClick={() => handleOpenProject(proj)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-cyan-600 cursor-pointer min-h-[34px]"
                >
                  {proj.title}
                </h3>

                <p className="text-[11px] text-slate-500 truncate">📍 {proj.address}</p>

                <div className="bg-slate-50 p-2.5 border border-slate-200 space-y-1 text-[11px] text-slate-700">
                  <div className="font-bold text-cyan-700">Tính năng Smart City:</div>
                  <ul className="space-y-0.5">
                    {proj.techHighlights.slice(0, 2).map((tech, idx) => (
                      <li key={idx} className="truncate">✔ {tech}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm font-black text-[#E11D48]">{proj.priceRange}</span>
                  <button
                    onClick={() => handleOpenProject(proj)}
                    className="px-3 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-cyan-300 font-bold text-xs uppercase transition cursor-pointer"
                  >
                    Xem Dữ Liệu ›
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: BẢN ĐỒ SỐ & TÍNH NĂNG PROPTECH
  // ─────────────────────────────────────────────────────────────────────────
  const renderMapSection = () => (
    <section id="ban-do-quy-hoach" className="py-16 bg-[#0F172A] text-white">
      <div className={`${MAX_W} mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
        
        <div className="lg:col-span-6 aspect-[4/3] border-2 border-cyan-400/40 shadow-2xl bg-slate-900 overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Vinhomes+Smart+City+Tay+Mo+Ha+Noi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-black uppercase text-cyan-400 tracking-widest block">
            HẠ TẦNG DỮ LIỆU ĐỊA CHÍNH THỜI GIAN THỰC
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
            TRA CỨU BẢN ĐỒ QUY HOẠCH SỐ 4.0
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hệ thống dữ liệu số hóa kết nối trực tiếp với cổng thông tin địa chính 63 tỉnh thành, giúp thẩm định quy hoạch lộ giới, mật độ xây dựng và kiểm tra pháp lý tức thì.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="bg-slate-900 p-3 border border-slate-800">
              <strong className="text-cyan-300 block">500+ Đô Thị</strong>
              <span className="text-[10px] text-slate-400">Được số hóa 3D</span>
            </div>
            <div className="bg-slate-900 p-3 border border-slate-800">
              <strong className="text-cyan-300 block">24/7 Cập Nhật</strong>
              <span className="text-[10px] text-slate-400">Dữ liệu quy hoạch mới</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: TIN TỨC CÔNG NGHỆ PROPTECH
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-3">
          <h2 className="text-2xl font-black uppercase text-[#0F172A]">
            TIN TỨC CÔNG NGHỆ BĐS & PROPTECH
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-cyan-600 hover:underline">
            Xem Tất Cả Bài Viết ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS24_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-cyan-600 uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-cyan-600 cursor-pointer"
                >
                  {n.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: FORM TƯ VẤN CÔNG NGHỆ SMART CITY
  // ─────────────────────────────────────────────────────────────────────────
  const renderConsultSection = () => (
    <section id="form-tu-van-tech" className="py-16 bg-[#0F172A] text-white text-center">
      <div className={`${MAX_W} mx-auto px-4 max-w-xl space-y-6`}>
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-cyan-300">
            ĐĂNG KÝ TƯ VẤN ĐẦU TƯ SMART CITY
          </h2>
          <p className="text-xs text-slate-300">
            Nhận báo cáo phân tích công nghệ, tiềm năng tăng giá và danh mục suất ngoại giao trực tiếp chủ đầu tư.
          </p>
        </div>

        <form onSubmit={handleConsultSubmit} className="bg-slate-900 text-slate-100 p-6 shadow-2xl text-left text-xs space-y-3 border border-cyan-500/30">
          <div>
            <label className="block font-bold mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              value={consultForm.name}
              onChange={e => setConsultForm({ ...consultForm, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full bg-slate-800 border border-slate-700 p-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Số điện thoại *</label>
            <input
              type="tel"
              required
              value={consultForm.phone}
              onChange={e => setConsultForm({ ...consultForm, phone: e.target.value })}
              placeholder="0919 006 030"
              className="w-full bg-slate-800 border border-slate-700 p-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Dự án quan tâm</label>
            <select
              value={consultForm.projectInterested}
              onChange={e => setConsultForm({ ...consultForm, projectInterested: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 p-2.5 text-white focus:outline-none font-bold"
            >
              {activeProjects.map(p => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
          >
            Gửi Yêu Cầu Nhận Báo Cáo Phân Tích
          </button>
        </form>

      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0F172A] selection:text-cyan-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0F172A] text-white border border-cyan-400 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-cyan-300" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderProjectsSection()}
            {renderMapSection()}
            {renderNewsSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderProjectsSection()}
            {renderMapSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderProjectsSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'smart-cities' && (
          <main>
            {renderProjectsSection()}
            {renderMapSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'proptech' && (
          <main>
            {renderMapSection()}
            {renderNewsSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'map' && (
          <main>
            {renderMapSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderMapSection()}
            {renderConsultSection()}
          </main>
        )}

        {currentPage === 'project-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('projects')} className="text-xs font-bold text-[#0F172A] hover:underline">
                ‹ Quay lại danh sách đô thị
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] uppercase">
                {selectedProject.title}
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Khoảng giá: {selectedProject.priceRange} — Diện tích: {selectedProject.areaRange} — IoT Score: {selectedProject.iotScore}/100
              </p>
              <p className="text-xs text-slate-500">📍 {selectedProject.address}</p>
              <PropertyImageGallery images={(selectedProject as any)?.gallery || (selectedProject as any)?.images} image={(selectedProject as any)?.image || (selectedProject as any)?.thumbnail} badge1={(selectedProject as any)?.type || (selectedProject as any)?.badge} badge2={(selectedProject as any)?.direction || (selectedProject as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProject.description}</p>
              <div className="p-4 bg-[#0F172A] text-white space-y-2 border border-cyan-500/30">
                <h4 className="font-bold text-xs uppercase text-cyan-300">Tính năng Smart City & Tiện ích tiêu biểu:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedProject.amenities.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">⚡ {h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0F172A] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-black text-[#0F172A] uppercase">
                {selectedArticle.title}
              </h1>
              <div className="text-[11px] text-slate-400 border-b pb-2">
                🕒 {selectedArticle.date} • Tác giả: {selectedArticle.author} • {selectedArticle.views} lượt xem
              </div>
              <img src={selectedArticle.image} alt="" className="w-full h-80 object-cover border" />
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
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
        templateName="BDS-24 (RealtyBuild Tech — Trang Tin Công Nghệ BĐS & Đô Thị Thông Minh Số 1)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
