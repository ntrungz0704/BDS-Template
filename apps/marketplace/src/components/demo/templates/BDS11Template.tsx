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
  Facebook, Tag
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

export interface PropertyItem {
  gallery?: string[];
  images?: string[];
  id: number;
  title: string;
  slug: string;
  category: 'dat-nen' | 'can-ho' | 'nha-pho' | 'biet-thu';
  categoryLabel: string;
  updateDate: string;
  price: string;
  priceNum: number;
  area: string;
  areaNum: number;
  location: string;
  city: string;
  image: string;
  featured: boolean;
  desc: string;
  specs: string[];
  legal: string;
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
// BDS-11 MOCK DATA: NHÀ ĐẤT MIỀN TRUNG — LINKHOUSE MIỀN TRUNG
// ─────────────────────────────────────────────────────────────────────────────

export const BDS11_PROPERTIES: PropertyItem[] = [
  // 6 Tin nổi bật
  {
    id: 1,
    title: 'DỰ ÁN KHU ĐÔ THỊ CẨM LỆ RIVERSIDE ĐÀ NẴNG',
    slug: 'du-an-khu-do-thi-cam-le-riverside-da-nang',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Dự Án',
    updateDate: '25/08/2026',
    price: '1.85 Tỷ / Lô',
    priceNum: 1.85,
    area: '100 m²',
    areaNum: 100,
    location: 'Đường Nguyễn Tri Phương, Quận Cẩm Lệ, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: true,
    desc: 'Đất nền ven sông Cẩm Lệ hạ tầng hoàn thiện 100%, đường nhựa 7.5m, sổ đỏ từng lô công chứng ngay.',
    specs: ['Đường quy hoạch 7.5m vỉa hè 3m', 'Hướng Đông Nam mát mẻ', 'Gần trường học cấp 1, 2, 3 và bệnh viện'],
    legal: 'Sổ đỏ từng nền sở hữu lâu dài'
  },
  {
    id: 2,
    title: 'DỰ ÁN BIỆT THỰ NGHỈ DƯỠNG SƠN TRÀ OCEAN VIEW',
    slug: 'du-an-biet-thu-nghi-duong-son-tra-ocean-view',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Biển',
    updateDate: '22/08/2026',
    price: '5.40 Tỷ / Căn',
    priceNum: 5.40,
    area: '250 m²',
    areaNum: 250,
    location: 'Bán đảo Sơn Trà, Quận Sơn Trà, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    featured: true,
    desc: 'Biệt thự đồi tựa lưng núi Sơn Trà view trọn vẹn vịnh Đà Nẵng, thiết kế hiện đại có hồ bơi riêng.',
    specs: ['3 Phòng ngủ Master', 'Hồ bơi tràn viền view biển', 'Bàn giao full nội thất cao cấp'],
    legal: 'Sổ hồng sở hữu lâu dài'
  },
  {
    id: 3,
    title: 'ĐẤT NỀN BIỂN NHƠN HỘI NEW CITY QUY NHƠN',
    slug: 'dat-nen-bien-nhon-hoi-new-city-quy-nhon',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Biển',
    updateDate: '20/08/2026',
    price: '1.45 Tỷ / Nền',
    priceNum: 1.45,
    area: '90 m²',
    areaNum: 90,
    location: 'Khu kinh tế Nhơn Hội, TP. Quy Nhơn, Bình Định',
    city: 'Quy Nhơn',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: true,
    desc: 'Đại đô thị biển liền kề FLC Quy Nhơn và Kỳ Co - Eo Gió. Cơ hội đầu tư sinh lời đón sóng du lịch.',
    specs: ['Mặt tiền đường 11m', 'Liền kề công viên thung lũng xanh', 'Hạ tầng điện âm nước máy'],
    legal: 'Sổ đỏ trao tay'
  },
  {
    id: 4,
    title: 'BIỆT THỰ ĐỒI HẢI VÂN PANORAMA VIEW BIỂN',
    slug: 'biet-thu-doi-hai-van-panorama-view-bien',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Đồi',
    updateDate: '18/08/2026',
    price: '4.20 Tỷ / Căn',
    priceNum: 4.20,
    area: '180 m²',
    areaNum: 180,
    location: 'Chân đèo Hải Vân, Quận Liên Chiểu, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: true,
    desc: 'Không gian sống nghỉ dưỡng sinh thái biệt lập với khí hậu trong lành quanh năm ngắm vịnh Kim Liên.',
    specs: ['Thiết kế kính mở 360 độ', 'Sân vườn BBQ rộng 60m²', 'An ninh bảo vệ 24/24'],
    legal: 'Sổ hồng riêng'
  },
  {
    id: 5,
    title: 'DỰ ÁN CĂN HỘ CAO CẤP VEN BIỂN MỸ KHÊ ĐÀ NẴNG',
    slug: 'du-an-can-ho-cao-cap-ven-bien-my-khe',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Biển',
    updateDate: '15/08/2026',
    price: '2.10 Tỷ / Căn',
    priceNum: 2.10,
    area: '65 m²',
    areaNum: 65,
    location: 'Đường Võ Nguyên Giáp, Quận Ngũ Hành Sơn, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    featured: true,
    desc: 'Căn hộ khách sạn mặt tiền đường biển đẹp nhất hành tinh, cách bãi tắm Mỹ Khê chỉ 2 phút đi bộ.',
    specs: ['2 Phòng ngủ view biển', 'Hồ bơi vô cực tầng thượng', 'Cam kết thuê lại 18 Triệu/tháng'],
    legal: 'Sổ hồng lâu dài'
  },
  {
    id: 6,
    title: 'KHU ĐÔ THỊ SINH THÁI HÒA XUÂN NAM ĐÀ NẴNG',
    slug: 'khu-do-thi-sinh-thai-hoa-xuan-nam-da-nang',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Sinh Thái',
    updateDate: '12/08/2026',
    price: '2.90 Tỷ / Lô',
    priceNum: 2.90,
    area: '120 m²',
    areaNum: 120,
    location: 'Đảo Vip Hòa Xuân, Quận Cẩm Lệ, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true,
    desc: 'Khu đô thị sinh thái kiểu mẫu ven sông Đô Tỏa, bao quanh bởi 4 bề sông nước trong lành.',
    specs: ['Đường 10.5m thông suốt', 'Gần cụm trường học quốc tế', 'Dân cư văn minh đông đúc'],
    legal: 'Sổ đỏ chính chủ'
  },

  // 3 Căn Hộ Cao Cấp
  {
    id: 7,
    title: 'ĐẤT NỀN BIỂN CONDOTEL NHƠN HỘI',
    slug: 'dat-nen-bien-condotel-nhon-hoi',
    category: 'can-ho',
    categoryLabel: 'Condotel Nghỉ Dưỡng',
    updateDate: '10/08/2026',
    price: '1.35 Tỷ / Căn',
    priceNum: 1.35,
    area: '45 m²',
    areaNum: 45,
    location: 'Khu du lịch biển Nhơn Hội, TP. Quy Nhơn',
    city: 'Quy Nhơn',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: false,
    desc: 'Condotel biển giá tốt nhất khu vực miền Trung, đón đầu làn sóng hạ tầng du lịch.',
    specs: ['Full nội thất chuẩn 4 sao', 'View trực diện biển', 'Quản lý vận hành chuyên nghiệp'],
    legal: 'Sở hữu 50 năm'
  },
  {
    id: 8,
    title: 'DỰ ÁN CĂN HỘ CONDOTEL HẢI CHÂU PLAZA',
    slug: 'du-an-can-ho-condotel-hai-chau-plaza',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Trung Tâm',
    updateDate: '08/08/2026',
    price: '2.45 Tỷ / Căn',
    priceNum: 2.45,
    area: '72 m²',
    areaNum: 72,
    location: 'Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    featured: false,
    desc: 'Tọa lạc bên bờ sông Hàn ngắm cầu Rồng phun lửa, tiện ích TTTM khối đế sầm uất.',
    specs: ['2 Phòng ngủ sang trọng', 'Thang máy thẻ từ cao cấp', 'Khai thác Airbnb hiệu quả cao'],
    legal: 'Sổ hồng lâu dài'
  },
  {
    id: 9,
    title: 'DỰ ÁN CĂN HỘ THE SANG RESIDENCE ĐÀ NẴNG',
    slug: 'du-an-can-ho-the-sang-residence-da-nang',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Hạng Sang',
    updateDate: '05/08/2026',
    price: '3.60 Tỷ / Căn',
    priceNum: 3.60,
    area: '82 m²',
    areaNum: 82,
    location: 'Đường Phạm Kiệt, Quận Ngũ Hành Sơn, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    featured: false,
    desc: 'Dự án căn hộ view biển Mỹ Khê với 100% căn hộ lấy gió và ánh sáng tự nhiên.',
    specs: ['Bàn giao full thiết bị Bosch & Hafele', 'Bãi đỗ xe thông minh', 'Hồ bơi nước ấm 4 mùa'],
    legal: 'Sổ hồng vĩnh viễn'
  },

  // 3 Đất Nền Dự Án
  {
    id: 10,
    title: 'ĐẤT NỀN KHU ĐÔ THỊ FPT CITY ĐÀ NẴNG',
    slug: 'dat-nen-khu-do-thi-fpt-city-da-nang',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Công Nghệ',
    updateDate: '02/08/2026',
    price: '2.65 Tỷ / Lô',
    priceNum: 2.65,
    area: '108 m²',
    areaNum: 108,
    location: 'Đô thị FPT City, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    featured: false,
    desc: 'Đất nền phân khu V1 liền kề Đại học FPT và trường quốc tế Singapore, tiềm năng cho thuê chuyên gia.',
    specs: ['Đường 7.5m vỉa hè 3m', 'Hạ tầng ngầm hóa đồng bộ', 'Gần biển Tân Trà 800m'],
    legal: 'Sổ đỏ chính chủ'
  },
  {
    id: 11,
    title: 'DỰ ÁN ĐẤT NỀN NAM HÒA XUÂN GIAI ĐOẠN 2',
    slug: 'du-an-dat-nen-nam-hoa-xuan-giai-doan-2',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Đô Thị',
    updateDate: '30/07/2026',
    price: '3.15 Tỷ / Nền',
    priceNum: 3.15,
    area: '110 m²',
    areaNum: 110,
    location: 'Nam Hòa Xuân, Quận Cẩm Lệ, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    featured: false,
    desc: 'Vị trí đắc địa gần cầu Bùi Tá Hán kết nối sang quận Ngũ Hành Sơn và bãi tắm Non Nước.',
    specs: ['Mặt tiền đường thông lớn', 'Xây dựng tự do không ép tiến độ', 'Sổ đỏ có sẵn'],
    legal: 'Sổ đỏ trao tay'
  },
  {
    id: 12,
    title: 'ĐẤT NỀN VEN BIỂN QUẢNG NAM - ĐÀ NẴNG',
    slug: 'dat-nen-ven-bien-quang-nam-da-nang',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Nghỉ Dưỡng',
    updateDate: '28/07/2026',
    price: '1.75 Tỷ / Lô',
    priceNum: 1.75,
    area: '100 m²',
    areaNum: 100,
    location: 'Trục đường Dũng Sĩ Điện Ngọc, Điện Bàn, Quảng Nam',
    city: 'Đà Nẵng - Quảng Nam',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    featured: false,
    desc: 'Liền kề vệt resort 5 sao đường biển Đà Nẵng - Hội An, kết nối giao thông liên vùng thuận tiện.',
    specs: ['Quy hoạch đường 15.5m', 'Hạ tầng cây xanh đèn chiếu sáng', 'Giá gốc từ chủ đầu tư'],
    legal: 'Sổ hồng riêng từng nền'
  }
];

export const BDS11_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Thị trường bất động sản Đà Nẵng - Quảng Nam phục hồi mạnh mẽ quý 3/2026',
    slug: 'thi-truong-bat-dong-san-da-nang-quang-nam-phuc-hoi',
    date: '26 Tháng Tám, 2026',
    author: 'Linkhouse Miền Trung',
    category: 'Thị Trường',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    excerpt: 'Dòng vốn kiều hối và khách hàng miền Bắc đang đổ mạnh về phân khúc đất nền và căn hộ ven biển...',
    content: [
      'Hạ tầng giao thông thông suốt kết nối tuyến sông Cổ Cò và nâng cấp sân bay quốc tế Đà Nẵng tạo cú hích lớn.',
      'Linkhouse Miền Trung ghi nhận lượng giao dịch tăng trưởng hơn 45% so với cùng kỳ.'
    ],
    views: 4120
  },
  {
    id: 2,
    title: 'Lễ mở bán phân khu mới dự án Nhơn Hội New City Quy Nhơn',
    slug: 'le-mo-ban-phan-khu-moi-nhon-hoi-new-city',
    date: '20 Tháng Tám, 2026',
    author: 'Khối Kinh Doanh',
    category: 'Sự Kiện',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Hơn 300 giao dịch thành công trong buổi sáng mở bán với nhiều phần quà vàng hấp dẫn...',
    content: [
      'Khách hàng đánh giá rất cao tiềm năng tăng giá vượt trội của đất nền ven biển sở hữu lâu dài.',
      'Chính sách thanh toán linh hoạt chỉ 20% đợt 1 thu hút đông đảo nhà đầu tư.'
    ],
    views: 3850
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
  if (clean === 'dat-nen' || clean === 'dat-nen-mien-trung') return { page: 'dat-nen', propSlug: '', artSlug: '' };
  if (clean === 'can-ho' || clean === 'can-ho-cao-cap') return { page: 'can-ho', propSlug: '', artSlug: '' };
  if (clean === 'nha-pho' || clean === 'nha-pho-biet-thu') return { page: 'nha-pho', propSlug: '', artSlug: '' };
  if (clean === 'thu-vien' || clean === 'gallery') return { page: 'gallery', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS11Template({
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
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS11_PROPERTIES.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS11_PROPERTIES[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS11_NEWS.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS11_NEWS[0];
  });

  // UI Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', project: 'Dự án Cẩm Lệ Riverside Đà Nẵng', note: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-11';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS11_PROPERTIES.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS11_NEWS.find(a => a.slug === res.artSlug);
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
    else if (page === 'dat-nen') urlSlug = 'dat-nen';
    else if (page === 'can-ho') urlSlug = 'can-ho';
    else if (page === 'nha-pho') urlSlug = 'nha-pho';
    else if (page === 'gallery') urlSlug = 'thu-vien';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (prop: PropertyItem) => {
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
      alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn thành công! Chuyên viên Linkhouse Miền Trung sẽ gửi bảng giá ${leadForm.project} qua Zalo ${leadForm.phone}.`);
    setLeadForm({ name: '', phone: '', email: '', project: 'Dự án Cẩm Lệ Riverside Đà Nẵng', note: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80';
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP BAR, MAIN HEADER & NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      
      {/* Top Micro Bar */}
      <div className="bg-[#047857] text-white text-xs py-1 px-4 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Mail size={12} /> info@templatebds.com
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1 font-bold">
              <Phone size={12} /> Hotline: 0919 006 030 - 0981 142 307
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-100">Bất động sản Linkhouse Miền Trung</span>
          </div>
        </div>
      </div>

      {/* Main Logo & Sponsor Banner Row */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo MT NHÀ ĐẤT MIỀN TRUNG */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-[#16A34A] to-[#047857] rounded-sm flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shrink-0">
            MT
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-black text-[#15803D] tracking-tight block leading-none truncate">
              NHÀ ĐẤT <span className="text-slate-800">MIỀN TRUNG.VN</span>
            </span>
            <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5 truncate">
              CÔNG TY BĐS LINKHOUSE MIỀN TRUNG
            </span>
          </div>
        </div>

        {/* Sponsor Banner Right */}
        <div className="hidden lg:flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-sm px-4 py-2 text-xs gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#16A34A] flex items-center justify-center text-white font-black text-sm">
            ★
          </div>
          <div>
            <span className="text-[10px] font-black text-[#15803D] uppercase block">DỰ ÁN TÀI TRỢ HOT</span>
            <span className="font-bold text-slate-800 text-xs">Đất Nền Biển Nhơn Hội New City — Sinh Lời Vượng Phát</span>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 sm:p-2 rounded-sm bg-slate-100 text-slate-800 lg:hidden hover:bg-slate-200 shrink-0 flex items-center justify-center ml-auto"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Main Navbar Dark Green */}
      <nav className="bg-[#0F382A] text-white border-t border-emerald-800 hidden lg:block">
        <div className={`${MAX_W} mx-auto px-4 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap`}>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => navigate('home')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'home' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => navigate('about')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'about' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Giới Thiệu
            </button>
            <button 
              onClick={() => navigate('projects')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Dự Án
            </button>
            <button 
              onClick={() => navigate('dat-nen')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'dat-nen' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Đất Nền Miền Trung
            </button>
            <button 
              onClick={() => navigate('can-ho')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'can-ho' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Căn Hộ
            </button>
            <button 
              onClick={() => navigate('nha-pho')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'nha-pho' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Nhà Phố
            </button>
            <button 
              onClick={() => navigate('gallery')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'gallery' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Thư Viện Ảnh
            </button>
            <button 
              onClick={() => navigate('contact')} 
              className={`whitespace-nowrap px-4 py-2.5 transition-all ${currentPage === 'contact' ? 'bg-[#16A34A] text-white font-black' : 'hover:bg-emerald-800'}`}
            >
              Liên Hệ
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a href="tel:0919006030" className="text-amber-300 font-extrabold text-xs flex items-center gap-1">
              <Phone size={12} className="animate-pulse" /> 0919 006 030
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F382A] text-white px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Giới Thiệu</button>
            <button onClick={() => navigate('projects')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Dự Án</button>
            <button onClick={() => navigate('dat-nen')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Đất Nền</button>
            <button onClick={() => navigate('can-ho')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Căn Hộ</button>
            <button onClick={() => navigate('nha-pho')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Nhà Phố</button>
            <button onClick={() => navigate('gallery')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Thư Viện Ảnh</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO PANORAMA BANNER (LINKHOUSE MIỀN TRUNG)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroBanner = () => (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
        
        {/* Background Image Villa & Marina */}
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
          alt="Linkhouse Hero"
          onError={handleImgError}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F382A]/90 via-[#0F382A]/70 to-transparent" />

        {/* Hero Content Box */}
        <div className={`relative z-20 ${MAX_W} mx-auto px-4 py-12`}>
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-md border border-emerald-500/40 space-y-4 shadow-2xl">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#16A34A] rounded-sm flex items-center justify-center text-white font-black text-2xl shadow-lg">
                MT
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  NHÀ ĐẤT <span className="text-[#4ADE80]">MIỀN TRUNG.VN</span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  CÔNG TY BẤT ĐỘNG SẢN LINKHOUSE MIỀN TRUNG
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200 border-t border-white/20 pt-4">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-[#4ADE80] shrink-0" />
                <span>320 Đường 2/9, Q. Hải Châu, TP. Đà Nẵng</span>
              </p>
              <p className="flex items-center gap-2 font-bold text-[#FDE047]">
                <Phone size={14} className="shrink-0 animate-pulse" />
                <span>0919.006.030 — 0981.142.307</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-[#4ADE80] shrink-0" />
                <span>info@templatebds.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Compass size={14} className="text-[#4ADE80] shrink-0" />
                <span>Website: nhadatmientrung.vn</span>
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => navigate('projects')}
                className="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition"
              >
                Xem Giỏ Hàng BĐS ›
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TIN NỔI BẬT (6 CARDS GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedSection = () => {
    const featuredList = BDS11_PROPERTIES.slice(0, 6);
    return (
      <section className="py-10 bg-[#F8FAFC]">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          
          {/* Header Bar */}
          <div className="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" /> TIN NỔI BẬT
            </h2>
            <button onClick={() => navigate('projects')} className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">
              Xem thêm <ChevronRight size={14} />
            </button>
          </div>

          {/* 6 Cards Grid (3 cols x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredList.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenProperty(item)}
                className="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#16A34A] text-white text-[10px] font-bold">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Cập nhật: {item.updateDate}</span>
                    <span className="font-extrabold text-[#E11D48] text-sm">{item.price}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    DT: {item.area}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: CĂN HỘ CAO CẤP (3 CARDS GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderApartmentsSection = () => {
    const aptList = BDS11_PROPERTIES.slice(6, 9);
    return (
      <section className="py-8 bg-white border-t border-slate-200">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          
          {/* Header Bar */}
          <div className="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <Building2 size={16} className="text-emerald-400" /> CĂN HỘ CAO CẤP
            </h2>
            <button onClick={() => navigate('can-ho')} className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">
              Xem thêm <ChevronRight size={14} />
            </button>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {aptList.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenProperty(item)}
                className="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0284C7] text-white text-[10px] font-bold">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E11D48] text-sm">{item.price}</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    DT: {item.area}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: ĐẤT NỀN DỰ ÁN (3 CARDS GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLandPlotsSection = () => {
    const landList = BDS11_PROPERTIES.slice(9, 12);
    return (
      <section className="py-8 bg-[#F8FAFC] border-t border-slate-200">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          
          {/* Header Bar */}
          <div className="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-emerald-400" /> ĐẤT NỀN DỰ ÁN
            </h2>
            <button onClick={() => navigate('dat-nen')} className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">
              Xem thêm <ChevronRight size={14} />
            </button>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {landList.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenProperty(item)}
                className="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#16A34A] text-white text-[10px] font-bold">
                      {item.categoryLabel}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E11D48] text-sm">{item.price}</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                    DT: {item.area}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: FORM LIÊN HỆ TRỰC TIẾP CHỦ ĐẦU TƯ (EXACT MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderDirectContactBox = () => (
    <section className="py-12 bg-white">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl`}>
        <div className="bg-white rounded-md p-6 sm:p-10 border-2 border-[#16A34A] shadow-xl space-y-6">
          
          <div className="text-center space-y-1 border-b border-emerald-100 pb-4">
            <h3 className="text-lg sm:text-xl font-black text-[#15803D] uppercase tracking-wide">
              LIÊN HỆ TRỰC TIẾP CHỦ ĐẦU TƯ
            </h3>
            <p className="text-xs text-slate-600">
              NHẬN TRỌN BỘ HỒ SƠ PHÁP LÝ & BẢNG GIÁ GỐC — HOTLINE: <strong className="text-[#E11D48]">0919 006 030 - 0981 142 307</strong>
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ và tên..."
                required
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 font-bold"
              />
              <input
                type="email"
                placeholder="Địa chỉ Email..."
                value={leadForm.email}
                onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
              <select
                value={leadForm.project}
                onChange={e => setLeadForm({ ...leadForm, project: e.target.value })}
                className="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                {BDS11_PROPERTIES.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-between space-y-3">
              <textarea
                rows={5}
                placeholder="Nội dung yêu cầu tư vấn chi tiết (diện tích, mức tài chính dự kiến)..."
                value={leadForm.note}
                onChange={e => setLeadForm({ ...leadForm, note: e.target.value })}
                className="w-full bg-slate-50 p-4 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 h-full"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
              >
                GỬI YÊU CẦU NGAY
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: ĐỐI TÁC CỦA CHÚNG TÔI (PARTNERS LOGOS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPartners = () => (
    <section className="py-12 bg-white border-t border-slate-200 text-center space-y-6">
      <div className={`${MAX_W} mx-auto px-4`}>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest text-[#15803D]">
          ĐỐI TÁC CỦA CHÚNG TÔI
        </h3>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          Linkhouse Miền Trung tự hào là đối tác chiến lược của các tập đoàn bất động sản uy tín hàng đầu.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center pt-4">
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">COCOBAY</div>
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">NOVALAND</div>
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">ROYAL JEWELRY</div>
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">SUN GROUP</div>
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">VINHOMES</div>
          <div className="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">PHÚC THỊNH LAND</div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: FOOTER NHÀ ĐẤT MIỀN TRUNG (NAVY BLUE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLinkhouseFooter = () => (
    <section className="py-12 bg-[#0F172A] text-slate-300 text-xs">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center text-white font-black text-sm">
                MT
              </div>
              <span className="text-lg font-black text-white">NHÀ ĐẤT MIỀN TRUNG</span>
            </div>
            <p className="text-slate-400">
              Công ty Cổ phần Bất động sản Linkhouse Miền Trung — Sàn giao dịch và phân phối bất động sản chuyên nghiệp tại Đà Nẵng, Quảng Nam, Quy Nhơn.
            </p>
            <div className="space-y-1 text-slate-400 pt-2">
              <p>📍 Trụ sở: 320 Đường 2/9, Q. Hải Châu, TP. Đà Nẵng</p>
              <p>📞 Hotline: <a href="tel:0919006030" className="text-[#4ADE80] font-bold">0919 006 030 — 0981 142 307</a></p>
              <p>✉️ Email: info@templatebds.com</p>
              <p>🌐 Website: nhadatmientrung.vn</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">DANH MỤC</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigate('home')} className="hover:text-emerald-400">Trang chủ</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-emerald-400">Giới thiệu Linkhouse</button></li>
              <li><button onClick={() => navigate('dat-nen')} className="hover:text-emerald-400">Đất nền Miền Trung</button></li>
              <li><button onClick={() => navigate('can-ho')} className="hover:text-emerald-400">Căn hộ cao cấp</button></li>
              <li><button onClick={() => navigate('nha-pho')} className="hover:text-emerald-400">Nhà phố biệt thự</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-emerald-400">Liên hệ</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">FANPAGE FACEBOOK</h4>
            <div className="p-4 rounded-sm bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#1877F2] flex items-center justify-center text-white">
                  <Facebook size={20} />
                </div>
                <div>
                  <span className="font-bold text-white block">Nhà Đất Miền Trung</span>
                  <span className="text-[10px] text-slate-400">45.000 người theo dõi</span>
                </div>
              </div>
              <a
                href="https://www.facebook.com/groups/847532091275214"
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full py-2 bg-slate-800 hover:bg-slate-700 text-center rounded-lg text-white text-xs font-bold transition"
              >
                + Thích Trang
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SUBPAGE: PROPERTY DETAIL
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-emerald-600">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('projects')} className="hover:text-emerald-600">Dự án</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedProperty.title}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#16A34A] text-white text-xs font-bold mb-2">
              {selectedProperty.categoryLabel}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">{selectedProperty.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#16A34A]" /> {selectedProperty.location}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold">Giá bán:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#E11D48]">{selectedProperty.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
            <div className="bg-slate-50 p-6 rounded-md border space-y-4">
              <h3 className="text-base font-black text-[#15803D] uppercase">Thông Tin Chi Tiết & Pháp Lý</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.desc}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedProperty.specs.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold">
                📜 Pháp lý dự án: {selectedProperty.legal}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-md border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase">Liên Hệ Xem Đất & Nhận Báo Giá</h3>
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
                className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black rounded-sm uppercase tracking-wider shadow"
              >
                Gửi Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#16A34A] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0F382A] text-white border border-emerald-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-[#4ADE80]" /> {toastMessage}
        </div>
      )}

      {/* Main Pages Rendering */}
      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroBanner()}
            {renderFeaturedSection()}
            {renderApartmentsSection()}
            {renderLandPlotsSection()}
            {renderDirectContactBox()}
            {renderPartners()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderHeroBanner()}
            {renderDirectContactBox()}
            {renderPartners()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderFeaturedSection()}
            {renderApartmentsSection()}
            {renderLandPlotsSection()}
            {renderDirectContactBox()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'dat-nen' && (
          <main>
            {renderLandPlotsSection()}
            {renderFeaturedSection()}
            {renderDirectContactBox()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'can-ho' && (
          <main>
            {renderApartmentsSection()}
            {renderFeaturedSection()}
            {renderDirectContactBox()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'nha-pho' && (
          <main>
            {renderFeaturedSection()}
            {renderDirectContactBox()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'gallery' && (
          <main>
            {renderFeaturedSection()}
            {renderApartmentsSection()}
            {renderLinkhouseFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && renderPropertyDetail()}

        {currentPage === 'contact' && (
          <main>
            {renderDirectContactBox()}
            {renderPartners()}
            {renderLinkhouseFooter()}
          </main>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-11 (Nhà Đất Miền Trung — Linkhouse Miền Trung)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
