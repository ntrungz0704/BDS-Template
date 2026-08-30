'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info,
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare, Sparkle, Video,
  ChevronDown, ChevronUp, HelpCircle as FaqIcon, Landmark
} from 'lucide-react';
import { MAX_W } from '../lib/design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../lib/demo';

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
  address: string;
  priceRange: string;
  priceNum: number; // in billion VND
  areaRange: string;
  developer: string;
  status: string;
  image: string;
  hot?: boolean;
  featured?: boolean;
  totalUnits: string;
  description: string;
  highlights: string[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string[];
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
// BDS-23 MOCK DATA: MINH KHAI APARTMENTS & VÀNH ĐAI 2 HÀ NỘI
// ─────────────────────────────────────────────────────────────────────────────

export const BDS23_PROJECTS: ProjectItem[] = [
  {
    id: 'vinhomes-times-city',
    title: 'Vinhomes Times City & Park Hill',
    slug: 'vinhomes-times-city-park-hill',
    address: '458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '3.8 - 14.5 Tỷ VNĐ',
    priceNum: 3.8,
    areaRange: '53 - 178 m²',
    developer: 'Vingroup',
    status: 'Đã Bàn Giao (Sổ Đỏ Lâu Dài)',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    totalUnits: '12.000+ Căn Hộ',
    description: 'Khu đô thị phức hợp kiểu mẫu với hồ nhạc nước, bệnh viện Vinmec, trường học Vinschool và TTTM ngầm Mega Mall quy mô bậc nhất thủ đô.',
    highlights: ['Bệnh viện Vinmec & Vinschool', 'Thủy cung & Mega Mall ngầm', 'Hồ nhạc nước trung tâm', 'Bể bơi 4 mùa 4.000m²']
  },
  {
    id: 'green-pearl-city',
    title: 'Green Pearl City Minh Khai',
    slug: 'green-pearl-city-minh-khai',
    address: '378 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '4.2 - 9.8 Tỷ VNĐ',
    priceNum: 4.2,
    areaRange: '71 - 139 m²',
    developer: 'Phong Phú Corp',
    status: 'Đang Mở Bán Quỹ Căn Đẹp',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    totalUnits: '504 Căn Hộ + 69 Liền Kề',
    description: 'Không gian sống xanh mát chuẩn sinh thái với mật độ xây dựng thấp, liền kề trục đường trên cao Vành Đai 2 thuận tiện di chuyển.',
    highlights: ['Công viên dạo bộ rợp bóng cây', 'Bể bơi vô cực tầng 4', 'Hầm đỗ xe thông minh', 'Sổ hồng từng căn']
  },
  {
    id: 'imperia-sky-garden',
    title: 'Imperia Sky Garden 423 Minh Khai',
    slug: 'imperia-sky-garden-423-minh-khai',
    address: '423 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '4.5 - 11.2 Tỷ VNĐ',
    priceNum: 4.5,
    areaRange: '58 - 106 m²',
    developer: 'MIK Group',
    status: 'Đã Bàn Giao & Có Sổ Đỏ',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    totalUnits: '1.866 Căn Hộ',
    description: 'Vườn chân mây giữa lòng phố thị với 68 tiện ích đỉnh cao trên cao, tầm nhìn trọn vẹn sông Hồng thơ mộng và trung tâm Hoàn Kiếm.',
    highlights: ['Vườn chân mây Sky Garden', 'Bể bơi vô cực chân trời', 'Trường mầm non quốc tế', 'Thiết kế căn hộ chuẩn resort']
  },
  {
    id: 'hoa-binh-green-city',
    title: 'Hòa Bình Green City 505 Minh Khai',
    slug: 'hoa-binh-green-city-505-minh-khai',
    address: '505 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '3.6 - 8.5 Tỷ VNĐ',
    priceNum: 3.6,
    areaRange: '63 - 127 m²',
    developer: 'Hòa Bình Group',
    status: 'Đã Bàn Giao (Full Nội Thất)',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    hot: false,
    featured: true,
    totalUnits: '1.028 Căn Hộ',
    description: 'Chung cư dát vàng 24K thiết bị vệ sinh và thang máy đầu tiên tại Hà Nội, khả năng chống động đất cấp 8 an toàn tuyệt đối.',
    highlights: ['Lan can & thang máy dát vàng 24K', 'Chống động đất cấp 8', 'Sân golf mini sân thượng', 'Kính 3 lớp cách nhiệt']
  },
  {
    id: 'sunshine-garden',
    title: 'Sunshine Garden Liền Kề Times City',
    slug: 'sunshine-garden-lien-ke-times-city',
    address: 'Đường Dương Văn Bé, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '3.5 - 9.0 Tỷ VNĐ',
    priceNum: 3.5,
    areaRange: '47 - 115 m²',
    developer: 'Sunshine Group',
    status: 'Đang Giao Dịch Sôi Động',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: false,
    featured: true,
    totalUnits: '1.278 Căn Hộ',
    description: 'Kiến trúc tân cổ điển châu Âu thanh lịch với khu vườn sinh thái nội khu và hệ thống Smart Home công nghệ 4.0 tiên tiến.',
    highlights: ['Vườn hoa hồng Pháp ban công', 'Thác tràn nghệ thuật', 'Nội thất nhập khẩu Ý', 'Hệ thống Smart Living']
  },
  {
    id: 'udic-riverside',
    title: 'UDIC Riverside 122 Vĩnh Tuy',
    slug: 'udic-riverside-122-vinh-tuy',
    address: '122 Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '3.2 - 7.5 Tỷ VNĐ',
    priceNum: 3.2,
    areaRange: '62 - 134 m²',
    developer: 'UDIC',
    status: 'Đã Bàn Giao',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: true,
    totalUnits: '324 Căn Hộ',
    description: 'Vị trí đắc địa ngay chân cầu Vĩnh Tuy, ngắm trọn dòng sông Hồng lịch sử và di chuyển vào phố cổ chỉ 10 phút.',
    highlights: ['View trực diện sông Hồng', 'Chất lượng xây dựng UDIC uy tín', 'Giao thông thuận tiện', 'Phí dịch vụ hợp lý']
  },
  {
    id: 'hinode-city',
    title: 'Hinode City 201 Minh Khai Phong Cách Nhật',
    slug: 'hinode-city-201-minh-khai',
    address: '201 Minh Khai, P. Minh Khai, Q. Hai Bà Trưng, Hà Nội',
    priceRange: '5.2 - 16.0 Tỷ VNĐ',
    priceNum: 5.2,
    areaRange: '67 - 128 m²',
    developer: 'Vietracimex',
    status: 'Căn Hộ Hạng Sang Đã Hoàn Thiện',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    featured: true,
    totalUnits: '1.099 Căn Hộ',
    description: 'Tổ hợp căn hộ cao cấp mang đậm dấu ấn văn hóa Nhật Bản với vườn sao Kim, vườn sao Mộc, rạp chiếu phim Lotte Cinema và hồ bơi tầng mái.',
    highlights: ['Phong cách kiến trúc Nhật Bản', 'TTTM & Rạp chiếu phim Lotte', 'Quản lý vận hành CBRE', 'Vị trí ngã tư Minh Khai - Kim Ngưu']
  },
  {
    id: 'sunshine-palace',
    title: 'Sunshine Palace Hoàng Mai',
    slug: 'sunshine-palace-hoang-mai',
    address: 'Ngõ 13 Lĩnh Nam, P. Mai Động, Q. Hoàng Mai, Hà Nội',
    priceRange: '3.0 - 6.8 Tỷ VNĐ',
    priceNum: 3.0,
    areaRange: '52 - 110 m²',
    developer: 'Sunshine Group',
    status: 'Đã Bàn Giao',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    hot: false,
    featured: true,
    totalUnits: '402 Căn Hộ',
    description: 'Tòa lâu đài châu Âu tráng lệ liền kề Times City, không gian yên tĩnh và cộng đồng cư dân văn minh tri thức.',
    highlights: ['Thiết kế hoàng gia châu Âu', 'Hưởng trọn tiện ích Times City', 'Giá bán cạnh tranh', 'Sổ hồng vĩnh viễn']
  }
];

export const BDS23_FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'LÀM THẾ NÀO ĐỂ THUÊ ĐƯỢC CĂN HỘ ƯNG Ý VÀ NHANH CHÓNG?',
    answer: [
      '1. Xác định rõ nhu cầu: Ngân sách tối đa, số lượng phòng ngủ, thời gian dọn vào và nội thất cơ bản hay full đồ.',
      '2. Tìm kiếm chuyên viên khu vực uy tín: Làm việc với đơn vị am hiểu sâu trục Minh Khai để nhận danh sách căn hộ chính chủ đang trống thực tế.',
      '3. Đi xem thực tế vào ban ngày để kiểm tra ánh sáng, hướng gió, cách âm và kiểm tra kỹ hợp đồng thuê nhà 2 bên trước khi đặt cọc.'
    ]
  },
  {
    id: 2,
    question: 'CÓ GÌ KHÁC BIỆT KHI LÀM VIỆC CÙNG CHUYÊN VIÊN MINH KHAI LAND?',
    answer: [
      'Chúng tôi cam kết 100% căn hộ đăng tải có thật, hình ảnh thực tế, kết nối trực tiếp với chủ nhà và hỗ trợ làm thủ tục tạm trú, đăng ký thẻ cư dân hoàn toàn miễn phí.'
    ]
  },
  {
    id: 3,
    question: 'CHÚ Ý NHỮNG GÌ KHI TÌM THUÊ MỘT CĂN HỘ CHUNG CƯ?',
    answer: [
      'Quý khách nên kiểm tra kỹ phí quản lý dịch vụ, phí gửi xe máy/ô tô hàng tháng, các đầu mục nội thất bàn giao và điều khoản chấm dứt hợp đồng trước hạn.'
    ]
  },
  {
    id: 4,
    question: 'KHI CHỌN MUA CĂN HỘ CHUNG CƯ, QUY TRÌNH GỒM NHỮNG GÌ?',
    answer: [
      'Quy trình gồm 4 bước: 1. Đặt cọc giữ căn -> 2. Thẩm định pháp lý và công chứng mua bán tại văn phòng công chứng -> 3. Thanh toán và nộp hồ sơ thuế trước bạ -> 4. Bàn giao nhà và nhận sổ hồng.'
    ]
  },
  {
    id: 5,
    question: 'CÁC BƯỚC CẦN LÀM KHI TÔI MUỐN BÁN CĂN HỘ CHUNG CƯ?',
    answer: [
      'Chủ nhà chỉ cần gửi hình ảnh sổ đỏ, hình ảnh thực tế căn hộ và mức giá kỳ vọng. Đội ngũ chuyên viên sẽ thẩm định giá thị trường và kết nối khách hàng trong 7 ngày.'
    ]
  }
];

export const BDS23_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Hạ Tầng Tuyến Đường Trên Cao Vành Đai 2 Hoàn Thiện Thổi Bùng Giá Trị BĐS Minh Khai',
    slug: 'ha-tang-vanh-dai-2-thoi-bung-gia-tri-minh-khai',
    date: '28/08/2026',
    author: 'Tạp Chí Bất Động Sản',
    category: 'Quy Hoạch',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Tuyến đường trên cao Vĩnh Tuy - Ngã Tư Sở thông xe toàn tuyến giúp rút ngắn thời gian di chuyển từ Minh Khai tới Cầu Giấy chỉ còn 12 phút.',
    content: [
      'Trục đường Minh Khai - Đại La đã trở thành cung đường đô thị kiểu mẫu với mặt cắt ngang rộng hơn 50m.',
      'Giá trị căn hộ chung cư dọc tuyến đường ghi nhận mức tăng trưởng trung bình 25-35% trong 2 năm qua.'
    ],
    views: 6250
  },
  {
    id: 2,
    title: 'Kinh Nghiệm Chọn Tầng & Hướng Căn Hộ Chung Cư Hợp Phong Thủy Gia Chủ',
    slug: 'kinh-nghiem-chon-tang-va-huong-can-ho',
    date: '26/08/2026',
    author: 'Chuyên Gia Phong Thủy',
    category: 'Kiến Thức',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Hướng dẫn lựa chọn tầng trung thoáng mát từ tầng 8 đến tầng 22 và hướng ban công Đông Nam đón vượng khí tài lộc.',
    content: [
      'Khoảng tầng trung từ tầng 8 tới 20 luôn là sự lựa chọn ưu tiên của đại đa số cư dân nhờ tránh bụi và tầm nhìn thoáng đãng.'
    ],
    views: 4890
  },
  {
    id: 3,
    title: 'So Sánh Chi Tiết Các Dự Án Chung Cư Đáng Sống Nhất Trục Minh Khai - Vĩnh Tuy',
    slug: 'so-sanh-cac-du-an-chung-cu-truc-minh-khai',
    date: '24/08/2026',
    author: 'Đội Ngũ Phân Tích',
    category: 'Đánh Giá',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Đánh giá khách quan về chất lượng xây dựng, mật độ cây xanh, phí dịch vụ và tiện ích giữa Times City, Imperia Sky Garden và Hinode City.',
    content: [
      'Mỗi dự án đều sở hữu những thế mạnh riêng biệt phù hợp với từng phân khúc khách hàng mua ở hoặc đầu tư cho thuê.'
    ],
    views: 5410
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
  if (clean === 'thu-vien' || clean === 'gallery') return { page: 'gallery', propSlug: '', artSlug: '' };
  if (clean === 'kien-thuc' || clean === 'knowledge') return { page: 'knowledge', propSlug: '', artSlug: '' };
  if (clean === 'tuyen-dung' || clean === 'careers') return { page: 'careers', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS23Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts
}: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS23_PROJECTS.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS23_PROJECTS[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS23_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS23_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableDevelopers = useMemo(() => {
    const set = new Set(BDS23_PROJECTS.map(p => p.developer).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterDeveloper, setFilterDeveloper] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number>(1);

  // Forms
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', email: '', question: '', projectInterested: 'Vinhomes Times City & Park Hill' });
  const [quickPhone, setQuickPhone] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-23';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS23_PROJECTS.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProject(found);
    }
    if (res.artSlug) {
      const found = BDS23_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'gallery') urlSlug = 'thu-vien';
    else if (page === 'knowledge') urlSlug = 'kien-thuc';
    else if (page === 'careers') urlSlug = 'tuyen-dung';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProject = (p: ProjectItem) => {
    setSelectedProject(p);
    navigate('project-detail', p.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại nhận tư vấn!');
      return;
    }
    showToast(`🎉 Tiếp nhận câu hỏi tư vấn từ ${inquiryForm.name} (${inquiryForm.phone}). Chuyên viên Minh Khai Land sẽ gọi lại ngay!`);
    setInquiryForm({ name: '', phone: '', email: '', question: '', projectInterested: 'Vinhomes Times City & Park Hill' });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone) {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }
    showToast(`🎉 Đã nhận số điện thoại ${quickPhone}. Chúng tôi sẽ liên hệ trong 5 phút!`);
    setQuickPhone('');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProjects = useMemo(() => {
    return BDS23_PROJECTS.filter(p => {
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
      if (filterPrice === 'under-4' && p.priceNum >= 4) return false;
      if (filterPrice === '4-6' && (p.priceNum < 4 || p.priceNum > 6)) return false;
      if (filterPrice === 'above-6' && p.priceNum <= 6) return false;

      return true;
    });
  }, [filterDeveloper, searchKeyword, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'projects') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProjects.length;
    showToast(`🔍 Tìm thấy ${count} dự án chung cư phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-du-an');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (MIDNIGHT NAVY & GOLDEN PHOENIX LOGO)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0B132B] text-white shadow-xl border-b border-amber-500/30">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Left Brand */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-base sm:text-xl shadow border border-amber-200 shrink-0">
            🦅
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-serif font-black tracking-wider text-amber-300 block leading-none truncate">
              MINH KHAI <span className="text-white">APARTMENTS</span>
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-amber-200/80 uppercase tracking-widest block mt-0.5 truncate">
              CỔNG THÔNG TIN CHUNG CƯ CAO CẤP VÀNH ĐAI 2
            </span>
          </div>
        </div>

        {/* Center Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('about')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'about' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('projects')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'projects' || currentPage === 'project-detail' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Dự Án</button>
          <button onClick={() => navigate('gallery')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'gallery' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Thư Viện</button>
          <button onClick={() => navigate('knowledge')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'knowledge' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Kiến Thức</button>
          <button onClick={() => navigate('careers')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'careers' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Tuyển Dụng</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'text-amber-300 font-extrabold bg-[#1C2541]' : 'hover:text-amber-300'}`}>Liên Hệ</button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => {
              const el = document.getElementById('form-tu-van');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Đăng Ký Tư Vấn
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
        <div className="xl:hidden bg-[#0A1128] border-t border-amber-500/30 px-4 sm:px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Giới Thiệu</button>
            <button onClick={() => navigate('projects')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Dự Án</button>
            <button onClick={() => navigate('gallery')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Thư Viện</button>
            <button onClick={() => navigate('knowledge')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Kiến Thức</button>
            <button onClick={() => navigate('careers')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Tuyển Dụng</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#1C2541] hover:text-amber-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER BAN ĐÊM & TYPOGRAPHY HOÀNG GIA
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden border-b border-amber-500/30">
      <img
        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80"
        alt="Đẳng Cấp Thượng Lưu"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-black/40 to-transparent" />

      <div className="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-amber-300 tracking-wider drop-shadow-2xl">
          Đẳng Cấp Thượng Lưu
        </h1>
        <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-medium leading-relaxed">
          Chắt lọc những giá trị đỉnh cao, mang đến cho bạn một môi trường sống xứng tầm giữa thiên nhiên tuyệt đẹp và hệ thống tiện nghi hiện đại bậc nhất trục Vành Đai 2 Hà Nội.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('danh-sach-du-an');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            Khám Phá Các Dự Án ›
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('form-tu-van');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 cursor-pointer"
          >
            Đăng Ký Tham Quan Căn Hộ
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: LƯỚI 8 DỰ ÁN TRỤC MINH KHAI (2 ROWS X 4 COLS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderProjectsGridSection = () => (
    <section id="danh-sach-du-an" className="py-12 sm:py-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-6 sm:space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0B132B]">
            DỰ ÁN CHUNG CƯ MINH KHAI
          </h2>
          <p className="text-xs text-slate-600">
            Những dự án hấp dẫn nhất được chúng tôi phân phối trực tiếp từ chủ đầu tư.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 border border-slate-300 shadow-sm text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-0 border sm:border-0 border-slate-200 px-2.5 py-1.5 sm:p-0">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="Tìm theo tên dự án hoặc địa chỉ..."
              className="w-full py-1 px-1 focus:outline-none text-slate-800 text-xs"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <select
              value={filterDeveloper}
              onChange={e => setFilterDeveloper(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-300 px-3 py-2 text-xs focus:outline-none"
            >
              <option value="all">Chủ Đầu Tư (Tất cả)</option>
              {availableDevelopers.filter(d => d !== 'all').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-[#0B132B] hover:bg-[#1C2541] text-white font-bold uppercase shadow text-center cursor-pointer transition text-xs"
            >
              Lọc
            </button>
          </div>
        </div>

        {/* 2 Rows x 4 Columns = 8 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map(proj => (
            <div 
              key={proj.id}
              onClick={() => handleOpenProject(proj)}
              className="bg-white border border-slate-300 shadow-sm hover:shadow-xl transition group overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                  <span className="text-[9px] font-bold text-amber-300 uppercase block">{proj.developer}</span>
                  <h3 className="text-xs font-serif font-black uppercase text-white truncate drop-shadow">
                    {proj.title}
                  </h3>
                </div>
              </div>

              <div className="p-3 text-xs space-y-1.5 bg-white flex-1 flex flex-col justify-between">
                <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                  <span>📍</span>
                  <span className="truncate">{proj.address}</span>
                </p>
                <div className="flex justify-between items-center text-[11px] font-bold border-t border-slate-100 pt-2 mt-auto">
                  <span className="text-[#E11D48] font-bold">{proj.priceRange}</span>
                  <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px]">{proj.areaRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('projects')}
            className="px-8 py-3 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            XEM TẤT CẢ CÁC DỰ ÁN
          </button>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: CÂU HỎI THƯỜNG GẶP & FORM ĐĂNG KÝ TƯ VẤN (OCHRE FORM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFaqAndFormSection = () => (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion Left */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-black uppercase text-[#0B132B]">
              CÂU HỎI THƯỜNG GẶP
            </h2>

            <div className="space-y-2 text-xs">
              {BDS23_FAQS.map(faq => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="border border-slate-300 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenFaqId(isOpen ? 0 : faq.id)}
                      className={`w-full p-3.5 text-left font-black uppercase flex items-center justify-between transition ${isOpen ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'}`}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white space-y-2 text-slate-700 leading-relaxed border-t">
                        <strong className="block text-slate-900">Trả lời:</strong>
                        {faq.answer.map((ans, idx) => (
                          <p key={idx}>{ans}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Ochre Gold Right */}
          <div id="form-tu-van" className="lg:col-span-5 bg-gradient-to-b from-[#C5A059] to-[#B8860B] text-white p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-lg sm:text-xl font-serif font-black uppercase tracking-wider text-white">
                ĐĂNG KÝ TƯ VẤN
              </h3>
              <p className="text-[11px] text-amber-100">
                Nhận bảng giá và chính sách ưu đãi trực tiếp chủ đầu tư.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
              <div>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="Nhập họ tên *"
                  className="w-full bg-white/20 placeholder-amber-100 border border-white/40 p-2.5 text-white focus:outline-none focus:bg-white/30"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  placeholder="Nhập SĐT *"
                  className="w-full bg-white/20 placeholder-amber-100 border border-white/40 p-2.5 text-white focus:outline-none focus:bg-white/30"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={inquiryForm.email}
                  onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="Nhập Email"
                  className="w-full bg-white/20 placeholder-amber-100 border border-white/40 p-2.5 text-white focus:outline-none focus:bg-white/30"
                />
              </div>

              <div>
                <select
                  value={inquiryForm.projectInterested}
                  onChange={e => setInquiryForm({ ...inquiryForm, projectInterested: e.target.value })}
                  className="w-full bg-slate-900 border border-white/40 p-2.5 text-white focus:outline-none font-bold"
                >
                  {BDS23_PROJECTS.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={inquiryForm.question}
                  onChange={e => setInquiryForm({ ...inquiryForm, question: e.target.value })}
                  placeholder="Câu hỏi cần tư vấn (diện tích, số phòng ngủ, tầm giá)..."
                  className="w-full bg-white/20 placeholder-amber-100 border border-white/40 p-2.5 text-white focus:outline-none focus:bg-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-amber-50 text-[#B8860B] font-black text-xs uppercase tracking-wider shadow cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Send size={14} /> GỬI NGAY
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: ĐỐI TÁC CỦA CHÚNG TÔI (PARTNERS LOGOS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPartnersSection = () => (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-6 text-center`}>
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-widest">
          ĐỐI TÁC CỦA CHÚNG TÔI
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            'VINGROUP',
            'VINHOMES',
            'VINHOMES RIVERSIDE',
            'ROYAL CITY',
            'TIMES CITY',
            'VINHOMES CENTRAL PARK'
          ].map((partner, idx) => (
            <div key={idx} className="bg-white p-4 border border-slate-300 flex items-center justify-center font-serif font-black text-xs text-slate-700 shadow-sm">
              👑 {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: TIN TỨC & QUY HOẠCH
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#0B132B] pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-[#0B132B]">
            TIN TỨC & QUY HOẠCH MINH KHAI
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#D4AF37] hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS23_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#D4AF37] cursor-pointer"
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
  // 7. SECTION 5: FOOTER FORM ĐĂNG KÝ NHẬN BẢNG GIÁ
  // ─────────────────────────────────────────────────────────────────────────
  const renderFooterTopBar = () => (
    <div className="bg-[#0B132B] text-white py-10 border-b border-slate-800">
      <div className={`${MAX_W} mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs`}>
        
        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="font-serif font-black text-sm uppercase text-amber-300">THÔNG TIN LIÊN HỆ</h4>
          <p>📞 Hotline: <strong>0919 006 030</strong></p>
          <p>✉️ Email: <strong>contact@templatebds.com</strong></p>
          <p>📍 Địa chỉ: <strong>458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội</strong></p>
        </div>

        {/* Quick Phone Register */}
        <div className="space-y-3">
          <h4 className="font-serif font-black text-sm uppercase text-amber-300">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</h4>
          <p className="text-slate-300">Nhập số điện thoại để nhận tư vấn và bảng giá nhanh:</p>
          <form onSubmit={handleQuickSubmit} className="flex gap-2">
            <input
              type="tel"
              required
              value={quickPhone}
              onChange={e => setQuickPhone(e.target.value)}
              placeholder="Nhập số điện thoại..."
              className="flex-1 bg-slate-900 border border-slate-700 p-2 text-white text-xs focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-[#D4AF37] text-slate-950 font-black uppercase">
              GỬI ĐI
            </button>
          </form>
        </div>

        {/* Facebook Fanpage Widget */}
        <div className="space-y-3">
          <h4 className="font-serif font-black text-sm uppercase text-amber-300">KẾT NỐI MẠNG XÃ HỘI</h4>
          <div className="bg-slate-900 p-3 border border-slate-800 space-y-2">
            <span className="text-slate-300 block">👍 Fanpage Cộng Đồng Cư Dân Minh Khai</span>
            <span className="text-[10px] text-slate-400">Hơn 236.200 thành viên theo dõi</span>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0B132B] selection:text-amber-300">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B132B] text-white border border-[#D4AF37] px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderProjectsGridSection()}
            {renderFaqAndFormSection()}
            {renderPartnersSection()}
            {renderNewsSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderProjectsGridSection()}
            {renderPartnersSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderProjectsGridSection()}
            {renderFaqAndFormSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'gallery' && (
          <main>
            {renderProjectsGridSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'knowledge' && (
          <main>
            {renderFaqAndFormSection()}
            {renderNewsSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'careers' && (
          <main>
            <div className="py-16 bg-white">
              <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
                <h1 className="text-2xl font-serif font-black text-[#0B132B] uppercase">TUYỂN DỤNG CHUYÊN VIÊN TƯ VẤN BĐS MINH KHAI</h1>
                <p className="text-xs text-slate-600">Gia nhập đội ngũ tư vấn BĐS hàng đầu trục Vành Đai 2 Hà Nội với hoa hồng lên đến 70%!</p>
              </div>
            </div>
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderFaqAndFormSection()}
            {renderFooterTopBar()}
          </main>
        )}

        {currentPage === 'project-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('projects')} className="text-xs font-bold text-[#0B132B] hover:underline">
                ‹ Quay lại danh sách dự án
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B132B] uppercase">
                {selectedProject.title}
              </h1>
              <p className="text-sm font-black text-[#E11D48]">
                Khoảng giá: {selectedProject.priceRange} — Diện tích: {selectedProject.areaRange} — Chủ đầu tư: {selectedProject.developer}
              </p>
              <p className="text-xs text-slate-500">📍 {selectedProject.address}</p>
              <img src={selectedProject.image} alt="" className="w-full h-96 object-cover shadow-lg border" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProject.description}</p>
              <div className="p-4 bg-[#0B132B] text-white space-y-2 border border-amber-500/30">
                <h4 className="font-bold text-xs uppercase text-amber-300">Điểm nổi bật của dự án:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                  {selectedProject.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">👑 {h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#0B132B] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-[#0B132B] uppercase">
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
        templateName="BDS-23 (Minh Khai Apartments — Cổng Thông Tin Chung Cư Cao Cấp Vành Đai 2)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
