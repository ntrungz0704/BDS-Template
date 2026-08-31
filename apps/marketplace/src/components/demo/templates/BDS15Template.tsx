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
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare, Sparkle, Video
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
  id: string;
  title: string;
  slug: string;
  type: string;
  category: 'ban' | 'thue' | 'du-an';
  price: string;
  priceNum: number; // in billion VND
  area: string;
  areaNum: number; // in m2
  beds: number;
  baths: number;
  location: string;
  district: string;
  image: string;
  hot?: boolean;
  featured?: boolean;
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
// BDS-15 MOCK DATA: {company?.name || 'TEMPLATESBDS'} REAL ESTATE (CLEAN SHARP & DYNAMIC CMS FILTERS)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS15_PROPERTIES: PropertyItem[] = [
  {
    id: 'flora-avenue-phu-my-hung',
    title: 'The Flora Avenue Sky Living Phú Mỹ Hưng',
    slug: 'the-flora-avenue-sky-living-phu-my-hung',
    type: 'Căn Hộ Cao Cấp',
    category: 'du-an',
    price: '3.85 Tỷ VNĐ',
    priceNum: 3.85,
    area: '85 m²',
    areaNum: 85,
    beds: 2,
    baths: 2,
    location: 'Đại lộ Nguyễn Văn Linh, Tân Phú, Quận 7, TP.HCM',
    district: 'Quận 7',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Căn hộ view sông công viên trung tâm Phú Mỹ Hưng với đầy đủ tiện ích trường quốc tế, bệnh viện FV, TTTM Crescent Mall.',
    specs: ['Sổ hồng vĩnh viễn', 'Hồ bơi tràn viền', 'Tặng gói nội thất 50 Tr', 'Hỗ trợ vay 70%']
  },
  {
    id: 'vung-tau-melody',
    title: 'Căn Hộ Nghỉ Dưỡng Vũng Tàu Melody Bãi Sau',
    slug: 'can-ho-nghi-duong-vung-tau-melody-bai-sau',
    type: 'Căn Hộ Biển',
    category: 'du-an',
    price: '2.15 Tỷ VNĐ',
    priceNum: 2.15,
    area: '60 m²',
    areaNum: 60,
    beds: 2,
    baths: 1,
    location: 'Góc đường Võ Thị Sáu - Hoàng Hoa Thám, TP. Vũng Tàu',
    district: 'TP. Vũng Tàu',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn hộ du lịch ngắm trọn vẹn biển Bãi Sau, cách bờ biển 200m đi bộ, thích hợp khai thác cho thuê Airbnb lợi nhuận cao.',
    specs: ['Đang cho thuê 15 Tr/tháng', 'Full nội thất biển', 'Ban công lộng gió', 'Pháp lý minh bạch']
  },
  {
    id: 'vinhomes-grand-park-origami',
    title: 'Vinhomes Grand Park Quận 9 Phân Khu Origami',
    slug: 'vinhomes-grand-park-quan-9-phan-khu-origami',
    type: 'Căn Hộ Cao Cấp',
    category: 'du-an',
    price: '2.90 Tỷ VNĐ',
    priceNum: 2.9,
    area: '70 m²',
    areaNum: 70,
    beds: 2,
    baths: 2,
    location: 'Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, TP. Thủ Đức (Quận 9)',
    district: 'TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Căn hộ đậm chất văn hóa Nhật Bản liền kề vườn thiền sỏi trắng, hồ cá Koi và đại công viên biển nhân tạo 36ha.',
    specs: ['Vườn Nhật nội khu', 'Gần Vincom Mega Mall', 'Xe buýt điện VinBus miễn phí', 'Sổ hồng trao tay']
  },
  {
    id: 'dragon-village-quan-9',
    title: 'Nhà Phố Thương Mại Dragon Village Quận 9',
    slug: 'nha-pho-thuong-mai-dragon-village-quan-9',
    type: 'Nhà Phố Liền Kề',
    category: 'ban',
    price: '5.60 Tỷ VNĐ',
    priceNum: 5.6,
    area: '100 m²',
    areaNum: 100,
    beds: 4,
    baths: 4,
    location: 'Đường Nguyễn Thị Tư, Phường Phú Hữu, TP. Thủ Đức (Quận 9)',
    district: 'TP. Thủ Đức',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Nhà phố 1 trệt 2 lầu xây dựng hoàn thiện đồng bộ phong cách tân cổ điển, nằm trong khu compound khép kín an ninh 24/7.',
    specs: ['Khuôn viên 100m²', 'Hồ cảnh quan điều hòa', 'Đường rộng 12m', 'Sổ đỏ cá nhân']
  },
  {
    id: 'biet-thu-ecolake-ven-ho',
    title: 'Biệt Thự Đơn Lập EcoLake Ven Hồ Cảnh Quan Sinh Thái',
    slug: 'biet-thu-don-lap-ecolake-ven-ho-canh-quan',
    type: 'Biệt Thự Đơn Lập',
    category: 'ban',
    price: '9.80 Tỷ VNĐ',
    priceNum: 9.8,
    area: '250 m²',
    areaNum: 250,
    beds: 5,
    baths: 5,
    location: 'Khu Đô Thị Sinh Thái EcoLake, Bến Cát, Bình Dương',
    district: 'Bến Cát',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Dinh thự ven hồ với hồ bơi riêng và sân vườn nhiệt đới rộng lớn, mang lại không gian sống xanh thanh bình đẳng cấp.',
    specs: ['Hồ bơi riêng', 'Khuôn viên 250m²', 'Sân vườn nhiệt đới', 'Sổ hồng lâu dài']
  },
  {
    id: 'cho-thue-mat-bang-kinh-doanh-quan-1',
    title: 'Cho Thuê Mặt Bằng Kinh Doanh 2 Mặt Tiền Quận 1',
    slug: 'cho-thue-mat-bang-kinh-doanh-2-mat-tien-quan-1',
    type: 'Mặt Bằng Cho Thuê',
    category: 'thue',
    price: '45 Triệu / Tháng',
    priceNum: 0.045,
    area: '120 m²',
    areaNum: 120,
    beds: 1,
    baths: 2,
    location: 'Góc Hai Bà Trưng - Lê Thánh Tôn, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Vị trí đắc địa lưu lượng giao thông sầm uất cả ngày lẫn đêm, phù hợp mở chuỗi trà sữa, cafe, showroom thời trang cao cấp.',
    specs: ['Mặt tiền 10m', 'Vỉa hè rộng 6m', 'Hợp đồng 5 năm', 'Bàn giao ngay']
  }
];

export const BDS15_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Top 10 Dự Án Bất Động Sản Ven Hồ Đáng Sống Nhất Khu Đông TP.HCM',
    slug: 'top-10-du-an-bds-ven-ho-dang-song-khu-dong',
    date: '28/08/2026',
    author: 'Lupul Research Team',
    category: 'Thị Trường',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Không gian sống xanh mát ven mặt nước đang trở thành tiêu chuẩn vàng được giới thượng lưu săn đón.',
    content: [
      'Xu hướng lựa chọn không gian sống sinh thái ven hồ giúp thanh lọc không khí và mang lại phong thủy thịnh vượng cho gia chủ.',
      'EcoLake và Palm Villa là hai điểm sáng thu hút lượng lớn khách hàng tìm kiếm chốn an cư yên bình gần gũi thiên nhiên.'
    ],
    views: 2150
  },
  {
    id: 2,
    title: 'Bí Quyết Chọn Hướng Nhà Hợp Tuổi Rước Tài Lộc Theo Phong Thủy',
    slug: 'bi-quyet-chon-huong-nha-hop-tuoi-phong-thuy',
    date: '26/08/2026',
    author: 'Chuyên Gia Phong Thủy Lupul',
    category: 'Phong Thủy',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    excerpt: 'Cách tính quái số mệnh cung Đông Tứ Trạch và Tây Tứ Trạch để xác định hướng cửa chính, phòng khách và ban thờ.',
    content: [
      'Gia chủ thuộc Đông Tứ Mệnh nên chọn hướng Đông, Đông Nam, Nam hoặc Bắc để đón luồng sinh khí dồi dào nhất.'
    ],
    views: 3100
  },
  {
    id: 3,
    title: 'Gói Vay Ưu Đãi Mua Nhà Lãi Suất Cố Định 5.99%/Năm Từ Các Ngân Hàng Lớn',
    slug: 'goi-vay-uu-dai-mua-nha-lai-suat-5-99',
    date: '24/08/2026',
    author: 'Ban Tư Vấn Tài Chính',
    category: 'Tài Chính',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    excerpt: 'Lupul Group ký kết hợp tác chiến lược cùng Vietcombank và BIDV tung gói tín dụng nhà ở hấp dẫn nhất quý 3/2026.',
    content: [
      'Khách hàng mua bất động sản tại hệ thống Lupul Group được hỗ trợ ân hạn nợ gốc tới 24 tháng và miễn phí trả nợ trước hạn.'
    ],
    views: 1840
  },
  {
    id: 4,
    title: 'Thực Tế Tiến Độ Thi Công Hạ Tầng Đại Đô Thị EcoLake Tháng 08/2026',
    slug: 'thuc-te-tien-do-thi-cong-ecolake-2026',
    date: '22/08/2026',
    author: 'Ban Quản Lý EcoLake',
    category: 'Tiến Độ',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Khu công viên ven hồ 10ha và các phân khu biệt thự đơn lập đang hoàn thiện những hạng mục cảnh quan cuối cùng.',
    content: [
      'Chủ đầu tư cam kết bàn giao nhà đúng tiến độ vào quý 4/2026 kèm sổ hồng đầy đủ cho từng cư dân.'
    ],
    views: 1560
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
  if (clean === 'bat-dong-san-ban' || clean === 'for-sale') return { page: 'for-sale', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'nha-dat-cho-thue' || clean === 'for-rent') return { page: 'for-rent', propSlug: '', artSlug: '' };
  if (clean === 'phong-thuy' || clean === 'feng-shui') return { page: 'feng-shui', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS15Template({
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
      const found = BDS15_PROPERTIES.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS15_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS15_NEWS.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS15_NEWS[0];
  });

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(BDS15_PROPERTIES.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const availableDistricts = useMemo(() => {
    const set = new Set(BDS15_PROPERTIES.map(p => p.district).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  // Filter States
  const [filterType, setFilterType] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Forms
  const [loanForm, setLoanForm] = useState({ name: '', phone: '', amount: '2 Tỷ VNĐ' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-15';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS15_PROPERTIES.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS15_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'for-sale') urlSlug = 'bat-dong-san-ban';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'for-rent') urlSlug = 'nha-dat-cho-thue';
    else if (page === 'feng-shui') urlSlug = 'phong-thuy';
    else if (page === 'news') urlSlug = 'tin-tuc';
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

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanForm.name || !loanForm.phone) {
      alert('Vui lòng nhập họ tên và số điện thoại tư vấn vay mua nhà!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu tư vấn vay mua nhà từ ${loanForm.name} (${loanForm.phone}). Chuyên viên tài chính Lupul Group sẽ liên hệ trong 5 phút!`);
    setLoanForm({ name: '', phone: '', amount: '2 Tỷ VNĐ' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`🎉 Đã đăng ký nhận bản tin BĐS Lupul Group thành công: ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProperties = useMemo(() => {
    return BDS15_PROPERTIES.filter(p => {
      // Type matching: fuzzy match
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        const isMatch = t === f || t.includes(f) || f.includes(t);
        if (!isMatch) return false;
      }

      // District matching: fuzzy match
      if (filterDistrict !== 'all') {
        const d = filterDistrict.toLowerCase();
        const loc = ((p.district || '') + ' ' + (p.location || '')).toLowerCase();
        const isMatch = loc.includes(d) || d.includes((p.district || '').toLowerCase());
        if (!isMatch) return false;
      }

      // Price matching
      if (filterPrice === 'under-3' && p.priceNum >= 3) return false;
      if (filterPrice === '3-6' && (p.priceNum < 3 || p.priceNum > 6)) return false;
      if (filterPrice === 'above-6' && p.priceNum <= 6) return false;

      return true;
    });
  }, [filterType, filterDistrict, filterPrice]);

  const handleSearchSubmit = () => {
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'projects' && currentPage !== 'for-rent') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(`🔍 Tìm thấy ${count} bất động sản phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('du-an');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & PRIMARY TEAL NAVBAR (CRISP SHARP BORDERS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      
      {/* Top Banner Bar with Loan Promo */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between gap-4 text-xs`}>
          
          {/* Logo Lupul Group */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#0D9488] to-[#0E7490] flex items-center justify-center text-white font-black shadow-sm">
              <Building2 size={20} />
            </div>
            <div>
              <span className="text-xl font-black text-[#0D9488] tracking-tight leading-none block">
                LUPUL <span className="text-slate-800">GROUP</span>
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                REAL ESTATE INVESTMENT
              </span>
            </div>
          </div>

          {/* Loan Banner Center */}
          <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 px-4 py-1.5 border border-teal-200">
            <span className="text-xs font-bold text-slate-700">
              💎 GÓI VAY MUA NHÀ AN CƯ LÃI SUẤT CHỈ TỪ <strong className="text-[#E11D48]">5.99%/NĂM</strong>
            </span>
            <button
              onClick={() => showToast('🎉 Đăng ký nhận bảng tính lãi suất vay mua nhà thành công!')}
              className="px-3 py-1 bg-[#0D9488] hover:bg-[#0F766E] text-white text-[11px] font-bold transition cursor-pointer"
            >
              Đăng Ký Ngay
            </button>
          </div>

          {/* Hotline Right */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E11D48] text-white text-xs font-black shadow-sm"
            >
              <Phone size={13} className="animate-bounce" />
              <span>0982.078.203</span>
            </a>
          </div>

        </div>
      </div>

      {/* Primary Teal Navbar */}
      <div className="bg-[#0D9488] text-white">
        <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2 sm:py-0 flex items-center justify-between gap-4`}>
          
          {/* Mobile Brand Logo */}
          <div 
            onClick={() => navigate('home')}
            className="flex xl:hidden items-center gap-2 cursor-pointer shrink-0 min-w-0 max-w-[calc(100%-50px)]"
          >
            <div className="w-8 h-8 bg-white/20 flex items-center justify-center text-white font-black shrink-0">
              <Building2 size={18} />
            </div>
            <div className="min-w-0 truncate">
              <span className="text-base font-black text-white tracking-tight leading-none block truncate">
                {company?.name || 'TEMPLATESBDS'}
              </span>
              <span className="text-[7.5px] font-bold text-teal-100 uppercase tracking-widest block mt-0.5 truncate">
                REAL ESTATE PLATFORM
              </span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-0 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            <button 
              onClick={() => navigate('home')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'home' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => navigate('for-sale')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'for-sale' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Bất Động Sản Bán
            </button>
            <button 
              onClick={() => navigate('projects')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Dự Án
            </button>
            <button 
              onClick={() => navigate('for-rent')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'for-rent' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Nhà Đất Cho Thuê
            </button>
            <button 
              onClick={() => navigate('about')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'about' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Giới Thiệu
            </button>
            <button 
              onClick={() => navigate('feng-shui')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'feng-shui' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Phong Thủy
            </button>
            <button 
              onClick={() => navigate('news')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Tin Tức
            </button>
            <button 
              onClick={() => navigate('contact')} 
              className={`whitespace-nowrap px-4 py-3 transition-all ${currentPage === 'contact' ? 'bg-[#0F766E] text-white font-extrabold shadow-inner' : 'hover:bg-[#0F766E]'}`}
            >
              Liên Hệ
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-white xl:hidden hover:bg-black/20 rounded-md shrink-0 flex items-center justify-center ml-auto"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Trang Chủ</button>
            <button onClick={() => navigate('for-sale')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">BĐS Bán</button>
            <button onClick={() => navigate('projects')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Dự Án</button>
            <button onClick={() => navigate('for-rent')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Cho Thuê</button>
            <button onClick={() => navigate('about')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Giới Thiệu</button>
            <button onClick={() => navigate('feng-shui')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Phong Thủy</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-slate-50 hover:bg-teal-50 hover:text-teal-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SLIDER ECOLAKE (CRISP SHARP BANNER)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSlider = () => (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        alt="EcoLake Hero"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Crisp Rectangular Box Center matching original mockup */}
      <div className="relative z-20 text-center space-y-4 max-w-2xl mx-auto px-4">
        <div className="inline-block bg-[#0D9488]/95 backdrop-blur-md px-10 py-7 shadow-2xl border border-teal-200/40 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase text-white tracking-wider">
            EcoLake
          </h1>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-100">
            KHU BIỆT THỰ NGHỈ DƯỠNG SINH THÁI BẬC NHẤT
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleOpenProperty(BDS15_PROPERTIES[4])}
              className="px-6 py-2.5 bg-white text-[#0D9488] font-black text-xs uppercase tracking-wider shadow hover:bg-teal-50 transition cursor-pointer"
            >
              XEM DỰ ÁN ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: SEARCH FILTER + HOT LISTINGS TICKER (100% DYNAMIC CMS FILTERS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderSearchAndLiveTicker = () => (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Search Box */}
          <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 space-y-4 shadow-sm">
            <div className="bg-[#0D9488] text-white px-4 py-2 text-xs font-black uppercase tracking-wider text-center">
              TÌM KIẾM BẤT ĐỘNG SẢN
            </div>

            <div className="space-y-3 text-xs">
              {/* Dynamic Type Select */}
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full bg-white p-2.5 border border-slate-300 focus:outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="all">Loại BĐS (Tất cả loại hình)</option>
                {availableTypes.filter(t => t !== 'all').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Dynamic Location/District Select */}
              <select
                value={filterDistrict}
                onChange={e => setFilterDistrict(e.target.value)}
                className="w-full bg-white p-2.5 border border-slate-300 focus:outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="all">Khu Vực (Tất cả địa điểm)</option>
                {availableDistricts.filter(d => d !== 'all').map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>

              <select
                value={filterPrice}
                onChange={e => setFilterPrice(e.target.value)}
                className="w-full bg-white p-2.5 border border-slate-300 focus:outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="all">Mức Giá (Tất cả mức giá)</option>
                <option className="text-slate-900 bg-white font-medium" value="under-3">Dưới 3 Tỷ</option>
                <option className="text-slate-900 bg-white font-medium" value="3-6">3 - 6 Tỷ</option>
                <option className="text-slate-900 bg-white font-medium" value="above-6">Trên 6 Tỷ</option>
              </select>

              <button
                onClick={handleSearchSubmit}
                className="w-full py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white font-black uppercase shadow-sm transition cursor-pointer"
              >
                TÌM KIẾM
              </button>
            </div>

            <div className="pt-3 border-t text-center text-xs text-slate-500">
              Hotline hỗ trợ: <strong className="text-[#E11D48]">0982.078.203</strong>
            </div>
          </div>

          {/* Right Live Listings Ticker */}
          <div className="lg:col-span-8 bg-white p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80" alt="" className="w-16 h-12 object-cover border border-slate-200" />
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase">TIN BẤT ĐỘNG SẢN MỚI CẬP NHẬT TRONG NGÀY</h3>
                <p className="text-[11px] text-slate-500">Tổng hợp danh sách các sản phẩm nhà đất chính chủ cần bán gấp.</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 divide-y divide-slate-100">
              {[
                { title: 'Bán đất thổ cư 120m² view hồ sinh thái EcoLake Bến Cát', price: '1.85 Tỷ', date: 'Vừa đăng' },
                { title: 'Bán căn hộ chung cư 2PN full nội thất cao cấp Phú Mỹ Hưng', price: '2.40 Tỷ', date: '10 phút trước' },
                { title: 'Chính chủ cần bán biệt thự liền kề Dragon Village Thủ Đức', price: '6.50 Tỷ', date: '25 phút trước' },
                { title: 'Bán lô shophouse mặt đường 30m kinh doanh sầm uất', price: '8.90 Tỷ', date: '1 giờ trước' },
                { title: 'Nhà phố 4 tầng mới xây cách chợ 100m sổ hồng trao tay', price: '4.20 Tỷ', date: '2 giờ trước' },
              ].map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between gap-4 hover:text-[#0D9488] cursor-pointer">
                  <span className="truncate">🔹 {item.title}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-black text-[#E11D48]">{item.price}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: DỰ ÁN TIÊU BIỂU (HIỂN THỊ KẾT QUẢ LỌC ĐỘNG)
  // ─────────────────────────────────────────────────────────────────────────
  const renderFeaturedProjects = () => (
    <section id="du-an" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        {/* Header Bar */}
        <div className="border-b-2 border-[#0D9488] pb-2 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0D9488] uppercase tracking-wider">
            {filterType !== 'all' || filterDistrict !== 'all' || filterPrice !== 'all' ? `KẾT QUẢ TÌM KIẾM (${filteredProperties.length})` : 'DỰ ÁN TIÊU BIỂU'}
          </h2>
          {(filterType !== 'all' || filterDistrict !== 'all' || filterPrice !== 'all') && (
            <button
              onClick={() => {
                setFilterType('all');
                setFilterDistrict('all');
                setFilterPrice('all');
                showToast('🔄 Đã đặt lại bộ lọc tìm kiếm!');
              }}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={12} /> Xem tất cả BĐS
            </button>
          )}
        </div>

        {/* 4 Cards Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy bất động sản nào khớp hoàn toàn với tiêu chí này.</p>
            <button
              onClick={() => {
                setFilterType('all');
                setFilterDistrict('all');
                setFilterPrice('all');
              }}
              className="px-5 py-2 bg-[#0D9488] text-white font-bold text-xs uppercase shadow"
            >
              Xem Tất Cả Bất Động Sản
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map(prop => (
              <div key={prop.id} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {prop.hot && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase shadow-sm">
                      HOT
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 
                    onClick={() => handleOpenProperty(prop)}
                    className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0D9488] cursor-pointer min-h-[34px]"
                  >
                    {prop.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">{prop.location}</p>
                  <div className="pt-2 border-t flex justify-between items-center text-xs">
                    <span className="font-black text-[#E11D48]">{prop.price}</span>
                    <button onClick={() => handleOpenProperty(prop)} className="px-2.5 py-1 bg-[#0D9488] text-white font-bold text-[11px]">
                      Xem Ngay ›
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
  // 5. SECTION 3: 3 BANNER DỰ ÁN ĐẶC BIỆT (SHARP)
  // ─────────────────────────────────────────────────────────────────────────
  const render3SpecialBanners = () => (
    <section className="py-8 bg-white px-4">
      <div className={`${MAX_W} mx-auto grid grid-cols-1 md:grid-cols-3 gap-6`}>
        
        <div 
          onClick={() => handleOpenProperty(BDS15_PROPERTIES[4])}
          className="relative aspect-[16/9] overflow-hidden shadow-md group cursor-pointer border border-slate-200"
        >
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="EcoLake City" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="font-serif font-black text-xl text-white uppercase tracking-wider drop-shadow-md">EcoLake City</span>
          </div>
        </div>

        <div 
          onClick={() => handleOpenProperty(BDS15_PROPERTIES[1])}
          className="relative aspect-[16/9] overflow-hidden shadow-md group cursor-pointer border border-slate-200"
        >
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" alt="Palm Villa Resort" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="font-serif font-black text-xl text-white uppercase tracking-wider drop-shadow-md">Palm Villa Resort</span>
          </div>
        </div>

        <div 
          onClick={() => handleOpenProperty(BDS15_PROPERTIES[0])}
          className="relative aspect-[16/9] overflow-hidden shadow-md group cursor-pointer border border-slate-200"
        >
          <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80" alt="Wyndham Gardens" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="font-serif font-black text-xl text-white uppercase tracking-wider drop-shadow-md">Wyndham Gardens</span>
          </div>
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: DỰ ÁN TỐT CHO BẠN (6 HORIZONTAL CARDS SHARP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderGoodProjectsForYou = () => (
    <section className="py-12 bg-slate-50 border-t border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        
        <div className="border-b-2 border-[#0D9488] pb-2">
          <h2 className="text-lg font-black text-[#0D9488] uppercase tracking-wider">
            DỰ ÁN TỐT CHO BẠN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS15_PROPERTIES.map(prop => (
            <div key={prop.id} className="bg-white p-3.5 border border-slate-200 flex gap-3 shadow-sm hover:shadow-md transition">
              <img src={prop.image} alt={prop.title} className="w-24 h-24 object-cover shrink-0 border border-slate-200" />
              <div className="space-y-1 text-xs flex flex-col justify-between">
                <h4 
                  onClick={() => handleOpenProperty(prop)}
                  className="font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0D9488] cursor-pointer"
                >
                  {prop.title}
                </h4>
                <p className="text-[11px] text-slate-500">{prop.district}</p>
                <span className="font-black text-[#E11D48]">{prop.price}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: VIDEO KINH NGHIỆM & 2 CỘT TƯ VẤN (SHARP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderVideoAndAdvisory = () => (
    <section className="py-14 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Video Left */}
          <div 
            onClick={() => setVideoModalOpen(true)}
            className="lg:col-span-4 relative aspect-[4/3] overflow-hidden shadow-lg bg-slate-900 border border-slate-300 group cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition opacity-85" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 bg-[#E11D48] text-white flex items-center justify-center shadow-xl">
                <Play size={22} className="ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2.5 text-xs font-bold text-white text-center">
              ▶ Bí Quyết Đầu Tư Bất Động Sản Dòng Tiền 2026
            </div>
          </div>

          {/* Advisory Col 1 */}
          <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black text-[#0D9488] uppercase tracking-wider border-b pb-2">
              GÓC CHUYÊN GIA BẤT ĐỘNG SẢN
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="hover:text-[#0D9488] cursor-pointer">📌 5 lưu ý vàng khi mua nhà phố xây sẵn trong ngõ hẻm</li>
              <li className="hover:text-[#0D9488] cursor-pointer">📌 Tiềm năng sinh lời từ shophouse khối đế chung cư</li>
              <li className="hover:text-[#0D9488] cursor-pointer">📌 So sánh lợi suất đầu tư giữa căn hộ biển và đất nền</li>
              <li className="hover:text-[#0D9488] cursor-pointer">📌 Dự báo chu kỳ tăng trưởng bất động sản 2026 - 2030</li>
            </ul>
          </div>

          {/* Advisory Col 2 */}
          <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black text-[#0D9488] uppercase tracking-wider border-b pb-2">
              TƯ VẤN PHÁP LÝ & PHONG THỦY
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="hover:text-[#0D9488] cursor-pointer">🧭 Cách tính hướng nhà đón tài lộc theo tuổi gia chủ</li>
              <li className="hover:text-[#0D9488] cursor-pointer">📜 Quy trình sang tên sổ đỏ từ A đến Z không lo rủi ro</li>
              <li className="hover:text-[#0D9488] cursor-pointer">💧 Bố trí hồ cá và cây xanh hợp phong thủy nhà ở</li>
              <li className="hover:text-[#0D9488] cursor-pointer">⚖️ Những điều khoản bắt buộc phải có trong hợp đồng cọc</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: TIN TỨC NHÀ ĐẤT (4 CARDS SHARP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="border-b-2 border-[#0D9488] pb-2">
          <h2 className="text-lg font-black text-[#0D9488] uppercase tracking-wider">
            TIN TỨC NHÀ ĐẤT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BDS15_NEWS.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 flex flex-col justify-between group shadow-sm">
              <img src={n.image} alt={n.title} className="w-full h-36 object-cover group-hover:scale-105 transition" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#0D9488] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0D9488] cursor-pointer"
                >
                  {n.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{n.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: FOOTER 4 CỘT {company?.name || 'TEMPLATESBDS'}
  // ─────────────────────────────────────────────────────────────────────────
  const renderLupulFooter = () => (
    <section id="lien-he" className="py-14 bg-[#0F172A] text-slate-300 text-xs border-t border-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <span className="text-lg font-black text-white block">{company?.name || 'TEMPLATESBDS'} REAL ESTATE</span>
            <p className="text-slate-400 leading-relaxed">
              Tập đoàn đầu tư và phân phối bất động sản nghỉ dưỡng sinh thái, căn hộ và nhà phố uy tín hàng đầu.
            </p>
            <p>Hotline: <strong className="text-[#E11D48]">0982.078.203 — 0919 006 030</strong></p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">DANH MỤC</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => navigate('for-sale')} className="hover:text-[#0D9488]">Bất động sản bán</button></li>
              <li><button onClick={() => navigate('projects')} className="hover:text-[#0D9488]">Dự án tiêu biểu</button></li>
              <li><button onClick={() => navigate('for-rent')} className="hover:text-[#0D9488]">Cho thuê nhà đất</button></li>
              <li><button onClick={() => navigate('feng-shui')} className="hover:text-[#0D9488]">Phong thủy nhà ở</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">HỖ TRỢ</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Quy trình mua bán</li>
              <li>Thủ tục vay vốn ngân hàng</li>
              <li>Tư vấn thiết kế nội thất</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">NHẬN BẢN TIN</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Nhập email..."
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 px-3 py-2 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold shrink-0 cursor-pointer"
              >
                GỬI
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0D9488] selection:text-white">
      
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0F172A] text-white border border-[#0D9488] px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-[#0D9488]" /> {toastMessage}
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black overflow-hidden max-w-3xl w-full aspect-video relative shadow-2xl border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/20 text-white hover:bg-white/40"
            >
              <X size={18} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Lupul Group Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSlider()}
            {renderSearchAndLiveTicker()}
            {renderFeaturedProjects()}
            {render3SpecialBanners()}
            {renderGoodProjectsForYou()}
            {renderVideoAndAdvisory()}
            {renderNewsSection()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderHeroSlider()}
            {renderVideoAndAdvisory()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'for-sale' && (
          <main>
            {renderSearchAndLiveTicker()}
            {renderFeaturedProjects()}
            {renderGoodProjectsForYou()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderFeaturedProjects()}
            {render3SpecialBanners()}
            {renderGoodProjectsForYou()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'for-rent' && (
          <main>
            {renderSearchAndLiveTicker()}
            {renderGoodProjectsForYou()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'feng-shui' && (
          <main>
            {renderVideoAndAdvisory()}
            {renderNewsSection()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderVideoAndAdvisory()}
            {renderLupulFooter()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('home')} className="text-xs font-bold text-teal-700">‹ Quay lại danh sách</button>
              <h1 className="text-2xl font-black text-slate-900 uppercase">{selectedProperty.title}</h1>
              <p className="text-sm font-black text-[#E11D48]">{selectedProperty.price} — Diện tích: {selectedProperty.area}</p>
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-15 (Lupul Group — Real Estate Investment)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
