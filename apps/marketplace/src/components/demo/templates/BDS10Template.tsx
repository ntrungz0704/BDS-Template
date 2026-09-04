'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info
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

export interface ProjectCardItem {
  gallery?: string[];
  images?: string[];
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  category: 'can-ho' | 'nghi-duong' | 'do-thi' | 'dat-nen' | 'shophouse';
  categoryLabel: string;
  statusBadge: string;
  price: string;
  priceNum: number;
  area: string;
  areaNum: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  featured: boolean;
  desc: string;
  details: string[];
  investor: string;
  legal: string;
  handover: string;
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
// BDS-10 MOCK DATA: DANH KHÔI REAL ESTATE (DKRP)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS10_PROJECTS: ProjectCardItem[] = [
  {
    id: 1,
    title: 'DỰ ÁN PHỨC HỢP CĂN HỘ ASTRAL CITY BÌNH DƯƠNG',
    slug: 'du-an-phuc-hop-can-ho-astral-city-binh-duong',
    subtitle: 'BIỂU TƯỢNG ĐÔ THỊ ĐỈNH CAO MẶT TIỀN QUỐC LỘ 13',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    statusBadge: 'Đang Mở Bán Đợt 1',
    price: '2.15 Tỷ VNĐ',
    priceNum: 2.15,
    area: '53.5 m² - 112 m²',
    areaNum: 53.5,
    location: 'Mặt tiền Đại lộ Bình Dương (QL13), TP. Thuận An, Bình Dương',
    city: 'Bình Dương',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    featured: true,
    desc: 'Tổ hợp 8 tòa tháp 40 tầng cao nhất Bình Dương với hơn 4.900 căn hộ cao cấp và 300m mặt tiền đại lộ tài chính sầm uất.',
    details: [
      'Quy mô: 3.7 ha với 1.7 ha cảnh quan cây xanh và tiện ích resort.',
      'Tiện ích: 6 hồ bơi chân mây, 2 công viên trung tâm, TTTM 4 tầng.',
      'Chính sách: Hỗ trợ vay ngân hàng VPBank 70% lãi suất 0% đến khi nhận nhà.'
    ],
    investor: 'Tập Đoàn Phát Đạt & Danh Khôi (DKRP)',
    legal: 'Sổ hồng sở hữu lâu dài',
    handover: 'Quý 4/2026'
  },
  {
    id: 2,
    title: 'DỰ ÁN ARIA ĐÀ NẴNG HOTEL & RESORT',
    slug: 'du-an-aria-da-nang-hotel-and-resort',
    subtitle: 'CHẠM TUYỆT TÁC — NƠI THÀNH CÔNG HỘI TỤ',
    category: 'nghi-duong',
    categoryLabel: 'Tổ Hợp Nghỉ Dưỡng Biển',
    statusBadge: 'Dự Án Độc Quyền',
    price: '3.85 Tỷ VNĐ',
    priceNum: 3.85,
    area: '48 m² - 160 m²',
    areaNum: 48,
    location: 'Đường Trường Sa, Phường Hòa Hải, Ngũ Hành Sơn, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    featured: true,
    desc: 'Tuyệt tác condotel và biệt thự nghỉ dưỡng hướng trực diện vịnh biển Non Nước Đà Nẵng với phòng thu âm và phim trường nghệ thuật đầu tiên tại Việt Nam.',
    details: [
      'Quy mô: 7 ha với 2 tháp căn hộ du lịch và 28 căn biệt thự biển.',
      'Vận hành: Đơn vị quản lý vận hành khách sạn quốc tế 5 sao.',
      'Đặc quyền: Chia sẻ doanh thu cho thuê 85/15 và tặng 15 đêm nghỉ dưỡng/năm.'
    ],
    investor: 'Danh Khôi Group (DKRP)',
    legal: 'Sở hữu thương mại dịch vụ 50 năm',
    handover: 'Quý 2/2027'
  },
  {
    id: 3,
    title: 'DỰ ÁN KHU ĐÔ THỊ BARYA CITI BÀ RỊA VŨNG TÀU',
    slug: 'du-an-khu-do-thi-barya-citi-ba-ria-vung-tau',
    subtitle: 'ĐÔ THỊ PHỒN VINH — SỐNG TRỌN VẸN TỪNG KHOẢNH KHẮC',
    category: 'do-thi',
    categoryLabel: 'Nhà Phố Thương Mại',
    statusBadge: 'Đã Bàn Giao Sổ Hồng',
    price: '3.40 Tỷ VNĐ',
    priceNum: 3.40,
    area: '90 m² - 200 m²',
    areaNum: 90,
    location: 'Đường Nguyễn Văn Cừ, Phường Long Toàn, TP. Bà Rịa, Vũng Tàu',
    city: 'Bà Rịa - Vũng Tàu',
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80'
    ],
    featured: true,
    desc: 'Khu đô thị kiểu mẫu đầu tiên tại trung tâm hành chính tỉnh Bà Rịa - Vũng Tàu với quy hoạch đồng bộ, công viên nước và trung tâm thương mại nội khu.',
    details: [
      'Quy mô: 8.7 ha gồm 427 căn nhà phố thương mại và biệt thự phố.',
      'Hạ tầng: Đường nhựa nội bộ 13m - 20.5m, điện âm nước máy, vỉa hè lát đá.',
      'Pháp lý: Sổ hồng riêng từng căn, công chứng sang tên ngay trong ngày.'
    ],
    investor: 'Danh Khôi Holdings (DKRP)',
    legal: 'Sổ hồng riêng sở hữu lâu dài',
    handover: 'Nhận nhà ở ngay'
  }
];

export const BDS10_NEWS_ARTICLES: NewsItem[] = [
  {
    id: 1,
    title: 'Thị trường bất động sản quý 3/2026 đón sóng hạ tầng bứt phá',
    slug: 'thi-truong-bat-dong-san-quy-3-2026-don-song-ha-tang',
    date: '28 Tháng Tám, 2026',
    author: 'Ban Nghiên Cứu DKRP',
    category: 'Thị Trường BĐS',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
    excerpt: 'Hạ tầng giao thông liên vùng phát triển mạnh mẽ tạo xung lực mới cho các dự án căn hộ và đô thị vệ tinh...',
    content: [
      'Dòng vốn đầu tư đang quay trở lại mạnh mẽ tại các thị trường trọng điểm như Bình Dương, Bà Rịa - Vũng Tàu và Đà Nẵng.',
      'Tập đoàn Danh Khôi tiếp tục khẳng định vị thế dẫn đầu với giỏ hàng phong phú đáp ứng cả nhu cầu ở thực và đầu tư.'
    ],
    views: 4890
  },
  {
    id: 2,
    title: 'Danh Khôi khai trương nhà mẫu căn hộ Astral City tại Bình Dương',
    slug: 'danh-khoi-khai-truong-nha-mau-can-ho-astral-city',
    date: '22 Tháng Tám, 2026',
    author: 'Khối Truyền Thông',
    category: 'Sự Kiện DKRP',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Sự kiện khai trương thu hút hơn 1.500 khách hàng tham quan và trải nghiệm không gian sống thông minh...',
    content: [
      'Khách hàng đánh giá rất cao thiết kế tối ưu, ban công kính tràn viền và hệ thống tiện ích chuẩn quốc tế của Astral City.',
      'Hơn 85% sản phẩm giới thiệu trong ngày mở bán đã được khách hàng đặt cọc giữ chỗ thành công.'
    ],
    views: 5620
  },
  {
    id: 3,
    title: 'Khởi công tổ hợp nghỉ dưỡng biển Aria Đà Nẵng Hotel & Resort',
    slug: 'khoi-cong-to-hop-nghi-duong-bien-aria-da-nang',
    date: '15 Tháng Tám, 2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiến Độ Xây Dựng',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    excerpt: 'Lễ động thổ diễn ra trang trọng với sự tham gia của các đối tác tổng thầu uy tín và đơn vị vận hành quốc tế...',
    content: [
      'Aria Đà Nẵng hứa hẹn sẽ trở thành điểm check-in nghệ thuật biểu tượng mới trên cung đường biển triệu đô Trường Sa.',
      'Dự án dự kiến cất nóc đúng tiến độ cam kết vào quý 2/2027.'
    ],
    views: 3950
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
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'ky-gui' || clean === 'consignment') return { page: 'consignment', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS10Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  company,
  theme,
  projects,
  posts, pageContent
}: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const activeProjects = useMemo<ProjectCardItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): ProjectCardItem => {
        const cat = (p.type?.toLowerCase().includes('căn') || p.type === 'APARTMENT')
          ? 'can-ho'
          : (p.type?.toLowerCase().includes('đất') || p.type === 'LAND')
          ? 'dat-nen'
          : (p.type?.toLowerCase().includes('nghỉ') || p.type === 'RESORT')
          ? 'nghi-duong'
          : (p.type?.toLowerCase().includes('đô thị') || p.type === 'URBAN')
          ? 'do-thi'
          : 'shophouse';
        const catLabel = cat === 'can-ho' ? 'Căn Hộ' : (cat === 'dat-nen' ? 'Đất Nền' : (cat === 'nghi-duong' ? 'Nghỉ Dưỡng' : (cat === 'do-thi' ? 'Đại Đô Thị' : 'Shophouse')));

        return {
          id: p.id || idx + 1,
          title: p.title || p.name || 'Dự án căn hộ & bất động sản cao cấp',
          slug: p.slug || `du-an-${idx + 1}`,
          subtitle: p.subtitle || p.slogan || 'Biểu tượng phong cách sống thượng lưu',
          category: cat,
          categoryLabel: catLabel,
          statusBadge: p.status || (idx === 0 ? 'ĐANG MỞ BÁN' : 'SẮP RA MẮT'),
          price: p.price || (p.priceFrom ? `Từ ${p.priceFrom} Tỷ` : 'Liên hệ'),
          priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 3.2),
          area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '80 m²'),
          areaNum: typeof p.area === 'number' ? p.area : 80,
          location: p.address || p.location || 'Vị trí đắc địa trung tâm',
          city: p.city || 'TP. Hồ Chí Minh',
          bedrooms: p.bedrooms || 2,
          bathrooms: p.bathrooms || 2,
          image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
          gallery: p.gallery || [p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
          featured: Boolean(p.featured || idx < 4),
          desc: p.description || p.desc || 'Quy mô hiện đại, tiện ích chuẩn quốc tế, cơ hội đầu tư sinh lời vượt trội.',
          details: Array.isArray(p.details) ? p.details : ['Pháp lý hoàn chỉnh', 'Chủ đầu tư uy tín', 'Ngân hàng hỗ trợ 70%'],
          investor: p.investor || company?.name || 'Danh Khôi Real Estate',
          legal: p.legal || 'Sổ hồng lâu dài',
          handover: p.handover || 'Năm 2026',
        };
      });
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS10_PROJECTS).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS10_PROJECTS;
  }, [projects, company]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức thị trường bất động sản',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Thị Trường',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tin tức thị trường BĐS mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
      const customSlugs = new Set(customNews.map((cn: any) => cn.slug));
      const remainingDefaults = (BDS10_NEWS_ARTICLES).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS10_NEWS_ARTICLES;
  }, [posts, company]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<ProjectCardItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProjects.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return activeProjects[0] || BDS10_PROJECTS[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS10_NEWS_ARTICLES[0];
  });

  // UI Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [newsSlideIdx, setNewsSlideIdx] = useState(0);

  // Form States
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', project: 'Dự án Căn hộ Astral City' });
  const [quickContactForm, setQuickContactForm] = useState({ name: '', email: '', phone: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-10';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeProjects.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = activeNews.find(a => a.slug === res.artSlug);
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
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'consignment') urlSlug = 'ky-gui';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (prop: ProjectCardItem) => {
    setSelectedProperty(prop);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone || !leadForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại nhận bảng giá!');
      return;
    }
    showToast(`🎉 Cảm ơn ${leadForm.name} (${leadForm.phone}). Bảng giá chính thức ${leadForm.project} đã được gửi qua Zalo!`);
    setLeadForm({ name: '', email: '', phone: '', project: 'Dự án Căn hộ Astral City' });
    setLeadModalOpen(false);
  };

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickContactForm.phone || !quickContactForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại tư vấn!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn thành công! Chuyên viên DKRP sẽ liên hệ với ${quickContactForm.name} trong 5 phút.`);
    setQuickContactForm({ name: '', email: '', phone: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP MICROBAR & STICKY HEADER
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      {/* Top Micro Bar */}
      <div className="bg-[#0B1A30] text-slate-300 text-xs py-1.5 px-4 hidden md:block font-medium">
        <div className={`${MAX_W} mx-auto flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin size={13} className="text-[#0284C7]" /> 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail size={13} className="text-[#0284C7]" /> info@templatebds.com
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-[#FDE047]">
            <span>Hotline 24/7: <strong>0919 006 030</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between gap-4`}>
        
        {/* Brand Logo DKRP */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#0284C7] group-hover:text-[#0369A1] transition font-sans">
              {(company as any)?.brandShort || "TL"}
            </span>
            <div className="hidden sm:block border-l-2 border-slate-300 pl-2">
              <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider block leading-tight">
                {(company as any)?.logoText || "TL BDS10"}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block leading-tight">
                REAL ESTATE
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'about' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('projects')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Dự Án
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#0284C7] font-extrabold border-b-2 border-[#0284C7]' : 'hover:text-[#0284C7]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* Search & Hotline Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center bg-slate-100 rounded-sm px-3 py-1.5 border border-slate-200">
            <input 
              type="text" 
              placeholder="Tìm kiếm dự án..." 
              className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-32 focus:w-44 transition-all" 
            />
            <Search size={14} className="text-slate-400 cursor-pointer" />
          </div>

          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden sm:flex px-3.5 py-2 rounded-sm bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] text-white text-xs font-black whitespace-nowrap shrink-0 shadow-md transition items-center gap-1.5"
          >
            <Phone size={13} className="animate-pulse" />
            <span>0919 006 030</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-sm bg-slate-100 text-slate-800 lg:hidden hover:bg-slate-200 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Giới Thiệu</button>
            <button onClick={() => navigate('projects')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Dự Án</button>
            <button onClick={() => navigate('news')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 hover:text-blue-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO BANNER: NHÀ MỚI CỦA BẠN (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
      {/* High-rise Sunset City Rendering */}
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
        alt="Hero Skyscraper"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Hero Headline Center */}
      <div className={`relative z-20 ${MAX_W} mx-auto px-4 py-16 text-center space-y-5 max-w-3xl`}>
        <span className="inline-block px-3.5 py-1 rounded-sm bg-[#16A34A] text-white text-[11px] font-black uppercase tracking-widest shadow-md">
          DKRP REALTY
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider leading-tight drop-shadow-2xl">
          NHÀ MỚI CỦA BẠN
        </h1>

        <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-md">
          Danh Khôi (DKRP) đồng hành kiến tạo không gian sống đỉnh cao và thịnh vượng bền vững cho mọi gia đình Việt.
        </p>

        <div className="pt-3 flex justify-center">
          <button
            onClick={() => navigate('projects')}
            className="px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-black text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-2xl transition hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            XEM THÊM <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: VỀ CHÚNG TÔI (ABOUT DKRP + 4 IMAGE COLLAGE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAboutSection = () => (
    <section id="gioi-thieu" className="py-16 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider">
              GIỚI THIỆU
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Về chúng tôi
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Công ty Cổ phần Bất động sản Danh Khôi (DKRP) là một trong những đơn vị phát triển và phân phối bất động sản uy tín hàng đầu tại Việt Nam.
              </p>
              <p>
                Với hơn 15 năm hình thành và phát triển, DKRP không ngừng mở rộng quy mô, kiến tạo hàng loạt dự án đại đô thị, khu phức hợp căn hộ cao cấp và bất động sản nghỉ dưỡng trải dài khắp cả nước.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => navigate('about')}
                className="px-6 py-2.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-black uppercase tracking-wider shadow-md transition hover:scale-105"
              >
                XEM THÊM ›
              </button>
            </div>
          </div>

          {/* Right 4-Image Collage Grid */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-3 items-center">
            <div className="col-span-2 rounded-sm overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="DKRP Project" className="w-full h-44 sm:h-52 object-cover" />
            </div>
            <div className="col-span-1 space-y-3">
              <div className="h-20 bg-[#84CC16] rounded-sm flex items-center justify-center text-white font-black text-xs shadow-sm">
                15+ NĂM
              </div>
              <div className="rounded-sm overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80" alt="Villa" className="w-full h-24 sm:h-28 object-cover" />
              </div>
            </div>
            <div className="col-span-2 rounded-sm overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Apartment" className="w-full h-32 sm:h-36 object-cover" />
            </div>
            <div className="col-span-1 h-32 sm:h-36 bg-[#0284C7] rounded-sm flex items-center justify-center text-white font-black text-center p-3 text-xs shadow-sm">
              UY TÍN HÀNG ĐẦU
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: DỰ ÁN NỔI BẬT (3 FEATURED PROJECTS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedProjects = () => (
    <section id="du-an" className="py-16 bg-[#F8FAFC] text-slate-800 border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider">
            DỰ ÁN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            DỰ ÁN NỔI BẬT
          </h2>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => handleOpenProperty(proj)}
              className="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-[#0284C7] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0284C7] text-white text-[10px] font-bold shadow">
                    {proj.statusBadge}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{proj.subtitle}</p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#E11D48] text-sm">{proj.price}</span>
                <span className="text-[11px] font-bold text-slate-400">{proj.city}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: TẠI SAO CHỌN CHÚNG TÔI & GỬI YÊU CẦU BÁO GIÁ (SPLIT CARD)
  // ─────────────────────────────────────────────────────────────────────────
  const renderWhyChooseUsAndLead = () => (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80"
        alt="Panorama Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className={`relative z-20 ${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left: Tại Sao Chọn Chúng Tôi (Nền đen trong suốt) */}
          <div className="lg:col-span-6 bg-black/70 backdrop-blur-md p-8 sm:p-10 rounded-md border border-white/20 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300 uppercase tracking-wider text-center border-b border-white/20 pb-3 mb-6">
                TẠI SAO CHỌN CHÚNG TÔI
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1.5 p-3 rounded-sm bg-white/5 border border-white/10">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xs font-bold text-white">15+ Năm Kinh Nghiệm</p>
                  <span className="text-[10px] text-slate-400">Uy tín thị trường</span>
                </div>
                <div className="space-y-1.5 p-3 rounded-sm bg-white/5 border border-white/10">
                  <span className="text-2xl">🤝</span>
                  <p className="text-xs font-bold text-white">Đội Ngũ Tận Tâm</p>
                  <span className="text-[10px] text-slate-400">Tư vấn chuyên sâu</span>
                </div>
                <div className="space-y-1.5 p-3 rounded-sm bg-white/5 border border-white/10">
                  <span className="text-2xl">🏢</span>
                  <p className="text-xs font-bold text-white">Hệ Thống Đa Dạng</p>
                  <span className="text-[10px] text-slate-400">Dự án toàn quốc</span>
                </div>
                <div className="space-y-1.5 p-3 rounded-sm bg-white/5 border border-white/10">
                  <span className="text-2xl">⚖️</span>
                  <p className="text-xs font-bold text-white">Pháp Lý Minh Bạch</p>
                  <span className="text-[10px] text-slate-400">Bàn giao chuẩn hẹn</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => navigate('contact')}
                className="px-6 py-2.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-black uppercase tracking-wider transition"
              >
                LIÊN HỆ ›
              </button>
            </div>
          </div>

          {/* Right: Form Nhận Báo Giá (Nền trắng) */}
          <div className="lg:col-span-6 bg-white text-slate-900 p-8 sm:p-10 rounded-md shadow-2xl flex flex-col justify-between space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-[#0284C7] uppercase tracking-wider block">BÁO GIÁ DỰ ÁN</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                GỬI YÊU CẦU NHẬN BÁO GIÁ MỚI NHẤT
              </h3>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border focus:bg-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Địa chỉ Email..."
                value={leadForm.email}
                onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border focus:bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border focus:bg-white focus:outline-none font-bold"
              />
              <select
                value={leadForm.project}
                onChange={e => setLeadForm({ ...leadForm, project: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border focus:bg-white focus:outline-none"
              >
                {activeProjects.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: NHÀ PHÁT TRIỂN DỰ ÁN (DEVELOPER PROFILE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderDeveloperSection = () => (
    <section className="py-12 bg-white text-slate-800 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-6 max-w-2xl`}>
        <span className="inline-block px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider">
          CHUYÊN NGHIỆP
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
          NHÀ PHÁT TRIỂN DỰ ÁN
        </h2>
        
        <div className="p-6 rounded-md bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-3xl font-black tracking-tighter text-[#0284C7]">
            DKRP
          </div>
          <h4 className="text-sm font-black text-slate-900 uppercase">TẬP ĐOÀN BẤT ĐỘNG SẢN DANH KHÔI</h4>
          <p className="text-xs text-slate-500">Trụ sở chính: TP. Hồ Chí Minh & Chi nhánh Hà Nội</p>
          <p className="text-xs font-bold text-[#E11D48]">Hotline tư vấn dự án: 0919 006 030</p>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: ĐỌC NHỮNG TIN TỨC MỚI NHẤT (3 FULL-CARD NEWS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-[#F8FAFC] text-slate-800">
      <div className={`${MAX_W} mx-auto px-4 space-y-10`}>
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider">
            TIN TỨC
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
            ĐỌC NHỮNG TIN TỨC MỚI NHẤT
          </h2>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeNews.map(news => (
            <div
              key={news.id}
              onClick={() => handleOpenArticle(news)}
              className="relative rounded-sm overflow-hidden shadow-lg group cursor-pointer aspect-[4/3] bg-slate-900"
            >
              <img
                src={news.image}
                alt={news.title}
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-5 space-y-2 text-white">
                <span className="text-[10px] font-bold text-[#FDE047] uppercase tracking-wider">{news.category}</span>
                <h3 className="text-xs sm:text-sm font-black group-hover:text-amber-300 transition leading-snug line-clamp-2">
                  {news.title}
                </h3>
                <span className="text-[10px] text-slate-400">{news.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: LIÊN HỆ NGAY ĐỂ ĐƯỢC TƯ VẤN (HORIZONTAL STRIP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderQuickContactStrip = () => (
    <section className="py-10 bg-[#0B1A30] text-white">
      <div className={`${MAX_W} mx-auto px-4 text-center space-y-4`}>
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider">
          Liên hệ ngay để được tư vấn!
        </h3>

        <form onSubmit={handleQuickContactSubmit} className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto text-xs">
          <input
            type="text"
            placeholder="Họ và tên..."
            required
            value={quickContactForm.name}
            onChange={e => setQuickContactForm({ ...quickContactForm, name: e.target.value })}
            className="px-4 py-2.5 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none w-full sm:w-48"
          />
          <input
            type="email"
            placeholder="Email..."
            value={quickContactForm.email}
            onChange={e => setQuickContactForm({ ...quickContactForm, email: e.target.value })}
            className="px-4 py-2.5 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none w-full sm:w-48"
          />
          <input
            type="tel"
            placeholder="Số điện thoại (*)..."
            required
            value={quickContactForm.phone}
            onChange={e => setQuickContactForm({ ...quickContactForm, phone: e.target.value })}
            className="px-4 py-2.5 rounded-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none w-full sm:w-48 font-bold"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white font-black uppercase tracking-wider transition shadow-md cursor-pointer"
          >
            GỬI ĐI
          </button>
        </form>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: ĐỐI TÁC CHIẾN LƯỢC (PARTNERS LOGO STRIP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPartnersSlider = () => (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center text-center">
          <div className="p-4 rounded-sm border border-slate-200 shadow-sm font-black text-slate-800 text-sm">
            AKA FURNITURE
          </div>
          <div className="p-4 rounded-sm border border-slate-200 shadow-sm font-black text-[#0284C7] text-sm">
            CBRE VIETNAM
          </div>
          <div className="p-4 rounded-sm border border-slate-200 shadow-sm font-black text-slate-800 text-sm">
            CENTRAL CONS
          </div>
          <div className="p-4 rounded-sm border border-slate-200 shadow-sm font-black text-[#0284C7] text-sm">
            RITAVO KOHLER
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 8: BẠN MUỐN MUA NHÀ HAY KÝ GỬI? (SPLIT CTA)
  // ─────────────────────────────────────────────────────────────────────────
  const renderSplitCta = () => (
    <section className="py-12 bg-[#F8FAFC]">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-md overflow-hidden shadow-xl">
          
          {/* Trái: Mua nhà */}
          <div className="bg-[#38BDF8] text-slate-900 p-8 sm:p-10 text-center space-y-3 flex flex-col justify-between items-center">
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black uppercase">VỀ MUA NHÀ</h4>
              <p className="text-xs leading-relaxed max-w-sm">
                Bạn đang tìm kiếm ngôi nhà mơ ước? Hãy cùng chúng tôi khám phá những dự án mới nhất với giá gốc CĐT.
              </p>
            </div>
            <button
              onClick={() => navigate('projects')}
              className="px-6 py-2.5 rounded-sm bg-white text-slate-900 font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition shadow"
            >
              MUA NHÀ NGAY
            </button>
          </div>

          {/* Phải: Ký gửi */}
          <div className="bg-[#0284C7] text-white p-8 sm:p-10 text-center space-y-3 flex flex-col justify-between items-center">
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-black uppercase">KÝ GỬI & BÁN NHÀ</h4>
              <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
                Bạn có bất động sản cần bán hoặc cho thuê? Đăng tin ký gửi ngay để tiếp cận hàng triệu khách hàng nét.
              </p>
            </div>
            <button
              onClick={() => navigate('consignment')}
              className="px-6 py-2.5 rounded-sm bg-slate-900 text-white font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition shadow"
            >
              KÝ GỬI NGAY
            </button>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 11. SECTION 9: FOOTER DKRP
  // ─────────────────────────────────────────────────────────────────────────
  const renderDkrpFooter = () => (
    <section className="py-14 bg-[#0B1A30] text-slate-300 text-xs">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          <div className="md:col-span-5 space-y-3">
            <span className="text-2xl font-black text-[#38BDF8] tracking-tight block">DKRP</span>
            <p className="text-slate-400 leading-relaxed">
              Công ty Cổ phần Bất động sản Danh Khôi — Đơn vị phát triển và phân phối bất động sản uy tín hàng đầu tại Việt Nam.
            </p>
            <div className="pt-2 text-slate-400 space-y-1">
              <p>📍 Trụ sở: 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
              <p>📞 Hotline: <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-white font-bold hover:underline">0919 006 030</a></p>
              <p>✉️ Email: info@templatebds.com</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigate('about')} className="hover:text-blue-400">Giới thiệu Danh Khôi</button></li>
              <li><button onClick={() => navigate('projects')} className="hover:text-blue-400">Dự án đang phân phối</button></li>
              <li><button onClick={() => navigate('news')} className="hover:text-blue-400">Tin tức thị trường</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-blue-400">Liên hệ hợp tác</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">ĐĂNG KÝ TƯ VẤN</h4>
            <form onSubmit={handleLeadSubmit} className="space-y-2">
              <input type="text" placeholder="Họ và tên..." required className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-lg text-white focus:outline-none" />
              <input type="tel" placeholder="Số điện thoại (*)..." required className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-lg text-white focus:outline-none" />
              <button type="submit" className="w-full py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold rounded-lg uppercase tracking-wider">
                ĐĂNG KÝ
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 12. SUBPAGES: PROPERTY DETAIL, NEWS DETAIL, CONSIGNMENT
  // ─────────────────────────────────────────────────────────────────────────

  const renderPropertyDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-blue-600">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('projects')} className="hover:text-blue-600">Dự án</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedProperty.title}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#0284C7] text-white text-xs font-bold mb-2">
              {selectedProperty.statusBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">{selectedProperty.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#0284C7]" /> {selectedProperty.location}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold">Giá bán tham khảo:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#E11D48]">{selectedProperty.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
            <div className="bg-slate-50 p-6 rounded-md border space-y-4">
              <h3 className="text-base font-black text-[#0284C7] uppercase">Thông Tin Chi Tiết Dự Án</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.desc}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedProperty.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-md border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase">Tải Báo Giá Dự Án Này</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full p-3 rounded-sm border bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full p-3 rounded-sm border bg-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black rounded-sm uppercase tracking-wider shadow"
              >
                Gửi Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsignmentPage = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl space-y-8`}>
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider">
            KÝ GỬI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">KÝ GỬI NHÀ ĐẤT NHANH CHÓNG</h1>
          <p className="text-xs sm:text-sm text-slate-600">Tiếp cận hơn 50.000 khách hàng tiềm năng qua mạng lưới phân phối của Danh Khôi DKRP</p>
        </div>

        <form onSubmit={e => { e.preventDefault(); showToast('🎉 Tiếp nhận thông tin ký gửi thành công! Chuyên viên sẽ liên hệ thẩm định trong 24h.'); }} className="bg-slate-50 p-8 rounded-md border border-slate-200 space-y-4 text-xs">
          <input type="text" placeholder="Họ và tên chủ sở hữu..." required className="w-full p-3.5 rounded-sm border bg-white focus:outline-none" />
          <input type="tel" placeholder="Số điện thoại liên hệ (*)..." required className="w-full p-3.5 rounded-sm border bg-white focus:outline-none font-bold" />
          <input type="text" placeholder="Địa chỉ bất động sản..." required className="w-full p-3.5 rounded-sm border bg-white focus:outline-none" />
          <input type="text" placeholder="Giá mong muốn bán hoặc cho thuê..." required className="w-full p-3.5 rounded-sm border bg-white focus:outline-none font-bold text-emerald-700" />
          <textarea rows={4} placeholder="Mô tả thông số diện tích, pháp lý..." className="w-full p-3.5 rounded-sm border bg-white focus:outline-none"></textarea>
          <button type="submit" className="w-full py-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black uppercase tracking-wider rounded-sm shadow-lg">
            GỬI THÔNG TIN KÝ GỬI
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0284C7] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B1A30] text-white border border-blue-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" /> {toastMessage}
        </div>
      )}

      {/* LEFT FLOATING ACTION PILLS */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0919006030"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-1.5 rounded-sm bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 hover:scale-105"
        >
          <MessageSquare size={13} /> Chat Zalo
        </a>
        <a
          href="https://www.facebook.com/groups/847532091275214"
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-1.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 hover:scale-105"
        >
          <Share2 size={13} /> Chat Facebook
        </a>
        <a
          href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
          className="px-3.5 py-1.5 rounded-sm bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black shadow-lg transition flex items-center gap-1.5 hover:scale-105"
        >
          <Phone size={13} className="animate-pulse" /> Hotline: 0919 006 030
        </a>
      </div>

      {/* Main Pages Rendering */}
      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHero()}
            {renderAboutSection()}
            {renderFeaturedProjects()}
            {renderWhyChooseUsAndLead()}
            {renderDeveloperSection()}
            {renderNewsSection()}
            {renderQuickContactStrip()}
            {renderPartnersSlider()}
            {renderSplitCta()}
            {renderDkrpFooter()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderAboutSection()}
            {renderDeveloperSection()}
            {renderPartnersSlider()}
            {renderDkrpFooter()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderFeaturedProjects()}
            {renderWhyChooseUsAndLead()}
            {renderDkrpFooter()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderDkrpFooter()}
          </main>
        )}

        {currentPage === 'consignment' && (
          <main>
            {renderConsignmentPage()}
            {renderDkrpFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && renderPropertyDetail()}

        {currentPage === 'contact' && (
          <main>
            {renderWhyChooseUsAndLead()}
            {renderQuickContactStrip()}
            {renderDkrpFooter()}
          </main>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-10 (Danh Khôi Real Estate — DKRP)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
