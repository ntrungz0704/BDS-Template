import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Bed, Bath, Maximize2, Tag, ThumbsUp, Facebook, Clock, Filter
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';

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
  id: number;
  title: string;
  slug: string;
  category: 'dat-du-an' | 'dat-nen' | 'nha-o' | 'nha-cho-thue';
  categoryLabel: string;
  price: string;
  priceNum: number; // in billions
  area: string;
  areaNum: number;
  bedrooms: number;
  bathrooms: number;
  direction: string;
  location: string;
  city: string;
  badge: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  bestseller?: boolean;
  desc: string;
  date: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  dateTag: string; // e.g. "13 Th2"
  fullDate: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  views: number;
}

const BDS05_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: 'Biệt Thự View Biển Đẹp Khu Đô Thị An Viên',
    slug: 'biet-thu-view-bien-dep-an-vien',
    category: 'nha-o',
    categoryLabel: 'Nhà Ở / Biệt Thự',
    price: '25,000,000,000 đ',
    priceNum: 25.0,
    area: '350 m²',
    areaNum: 350,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Đông Nam',
    location: 'KĐT An Viên, Phường Vĩnh Trường, TP. Nha Trang, Khánh Hòa',
    city: 'Nha Trang',
    badge: 'MỚI',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    featured: true,
    bestseller: false,
    desc: 'Biệt thự nghỉ dưỡng mặt biển cao cấp với hồ bơi vô cực tràn bờ, sân vườn xanh mát và bến đỗ du thuyền riêng biệt.',
    date: '28/08/2026'
  },
  {
    id: 2,
    title: 'Biệt Thự An Viên Nha Trang Có Hồ Bơi Riêng Biệt Lập',
    slug: 'biet-thu-an-vien-nha-trang-ho-boi-rieng',
    category: 'nha-cho-thue',
    categoryLabel: 'Nhà Cho Thuê',
    price: '2,500,000,000 đ / Năm',
    priceNum: 2.5,
    area: '280 m²',
    areaNum: 280,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Nam',
    location: 'Đường Số 1, KĐT An Viên, TP. Nha Trang',
    city: 'Nha Trang',
    badge: 'HOT',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    featured: true,
    bestseller: true,
    desc: 'Căn biệt thự thiết kế hiện đại trang bị đầy đủ tiện nghi tiêu chuẩn 5 sao, phục vụ nghỉ dưỡng gia đình hoặc khai thác cho thuê du lịch cao cấp.',
    date: '27/08/2026'
  },
  {
    id: 3,
    title: 'Biệt Thự Hoa Thiên — Phan Thiết Sát Biển Mũi Né',
    slug: 'biet-thu-hoa-thien-phan-thiet',
    category: 'nha-o',
    categoryLabel: 'Biệt Thự Biển',
    price: '1,500,000,000 đ / Đợt 1',
    priceNum: 1.5,
    area: '320 m²',
    areaNum: 320,
    bedrooms: 3,
    bathrooms: 3,
    direction: 'Đông',
    location: 'Đường Huỳnh Thúc Kháng, TP. Phan Thiết, Bình Thuận',
    city: 'Phan Thiết',
    badge: 'GIÁ TỐT',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    featured: true,
    bestseller: true,
    desc: 'Nằm trong quần thể nghỉ dưỡng biển Hoa Thiên Phan Thiết, liền kề đồi cát bay và bãi biển cát trắng mịn màng.',
    date: '26/08/2026'
  },
  {
    id: 4,
    title: 'Biệt Thự Cô Liên — Đà Lạt Phong Cách Cổ Điển Pháp',
    slug: 'biet-thu-co-lien-da-lat',
    category: 'nha-o',
    categoryLabel: 'Biệt Thự Đồi',
    price: '25,000,000,000 đ',
    priceNum: 25.0,
    area: '450 m²',
    areaNum: 450,
    bedrooms: 5,
    bathrooms: 5,
    direction: 'Tây Nam',
    location: 'Đường Trần Hưng Đạo, Phường 10, TP. Đà Lạt, Lâm Đồng',
    city: 'Đà Lạt',
    badge: 'VIP',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80'
    ],
    featured: true,
    bestseller: true,
    desc: 'Dinh thự mang đậm phong cách kiến trúc Pháp cổ ẩn mình giữa rừng thông bạt ngàn ngắm toàn cảnh thung lũng sương mù.',
    date: '25/08/2026'
  },
  {
    id: 5,
    title: 'Biệt Thự Thành Thành — Đà Nẵng Cạnh Cầu Rồng Sông Hàn',
    slug: 'biet-thu-thanh-thanh-da-nang',
    category: 'nha-o',
    categoryLabel: 'Nhà Phố / Biệt Thự',
    price: '21,000,000,000 đ',
    priceNum: 21.0,
    area: '260 m²',
    areaNum: 260,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Đông Bắc',
    location: 'Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    badge: 'MỚI',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200&q=80'
    ],
    featured: true,
    bestseller: true,
    desc: 'Vị trí đắc địa ngay trung tâm thành phố Đà Nẵng, thiết kế 3 tầng hiện đại sang trọng, thuận tiện kinh doanh hoặc làm văn phòng đại diện.',
    date: '24/08/2026'
  },
  {
    id: 6,
    title: 'Biệt Thự Hướng Biển — Phan Thiết View Hoàng Hôn',
    slug: 'biet-thu-huong-bien-phan-thiet',
    category: 'nha-o',
    categoryLabel: 'Biệt Thự Biển',
    price: '19,500,000,000 đ',
    priceNum: 19.5,
    area: '380 m²',
    areaNum: 380,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Tây',
    location: 'Đường Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết',
    city: 'Phan Thiết',
    badge: 'HOT',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80'
    ],
    featured: true,
    bestseller: true,
    desc: 'Tọa lạc tại thủ phủ resort Mũi Né, ban công lớn đón gió biển trong lành, thích hợp làm villa nghỉ dưỡng gia đình.',
    date: '23/08/2026'
  }
];

const BDS05_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'BARIA RESIDENCE DỰ ÁN ĐẤT NỀN BÀ RỊA VŨNG TÀU',
    slug: 'baria-residence-du-an-dat-nen-ba-ria-vung-tau',
    dateTag: '13 Th2',
    fullDate: '13/02/2026',
    category: 'Đất Dự Án',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
    excerpt: 'Dự án Baria Residence được quy hoạch bài bản với diện tích lớn, hạ tầng đồng bộ đón đầu làn sóng cao tốc Biên Hòa - Vũng Tàu...',
    content: [
      'Baria Residence là một trong những dự án đất nền tâm điểm tại khu vực trung tâm TP. Bà Rịa với quy hoạch phân lô đồng bộ.',
      'Dự án sở hữu vị trí chiến lược kết nối trực tiếp với Quốc Lộ 51 và các khu công nghiệp công nghệ cao lân cận.',
      'Pháp lý hoàn chỉnh với sổ đỏ riêng từng nền, hỗ trợ vay ngân hàng lên đến 70% giá trị hợp đồng.'
    ],
    views: 3200
  },
  {
    id: 2,
    title: 'Cải tạo nhà cấp 4 thành không gian sống đẹp hơn cả nhà xây mới',
    slug: 'cai-tao-nha-cap-4-thanh-khong-gian-song-dep',
    dateTag: '04 Th12',
    fullDate: '04/12/2025',
    category: 'Kiến Trúc & Nhà Đẹp',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Ít ai nghĩ rằng căn nhà đẹp như biệt thự nghỉ dưỡng dưới đây từng là một ngôi nhà cấp 4 cũ kỹ đã xuống cấp theo thời gian...',
    content: [
      'Gia chủ đã quyết định giữ lại bộ khung kết cấu chính và cải tạo lại toàn bộ mặt tiền bằng cửa kính kính lớn đón sáng tự nhiên.',
      'Sân vườn trước nhà được trồng cỏ Nhật và tiểu cảnh hoa giấy tạo cảm giác thư thái mỗi khi trở về nhà.',
      'Chi phí cải tạo tiết kiệm hơn 40% so với việc đập đi xây mới hoàn toàn.'
    ],
    views: 4500
  },
  {
    id: 3,
    title: 'Nhà 35m² ngập tràn ánh sáng nhờ vào thiết kế độc lạ',
    slug: 'nha-35m2-ngap-tran-anh-sang-nho-thiet-ke-doc-la',
    dateTag: '04 Th12',
    fullDate: '04/12/2025',
    category: 'Thiết Kế Nội Thất',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Ngôi nhà 3 tầng được giới thiệu dưới đây dù có diện tích hạn chế nhưng không gian lúc nào cũng ngập tràn ánh nắng và gió trời...',
    content: [
      'Giải pháp giếng trời kết hợp cầu thang kính giúp đưa ánh sáng từ mái nhà xuyên suốt xuống tận tầng trệt.',
      'Bếp và phòng ăn liên thông tạo cảm giác rộng rãi và tiện nghi trong sinh hoạt hàng ngày.'
    ],
    views: 2980
  },
  {
    id: 4,
    title: 'Căn hộ gác mái của cặp vợ chồng trẻ đầy đủ và đẹp mắt đến khó tin',
    slug: 'can-ho-gac-mai-cua-cap-vo-chong-tre',
    dateTag: '04 Th12',
    fullDate: '04/12/2025',
    category: 'Không Gian Sống',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Căn hộ nhỏ xinh dưới đây của cặp vợ chồng trẻ nằm ở tầng gác mái nhưng được bố trí nội thất thông minh vô cùng ấm cúng...',
    content: [
      'Không gian áp mái với cửa sổ trần nghiêng mang lại tầm nhìn ngắm sao đêm tuyệt đẹp giữa lòng thành phố.',
      'Nội thất gỗ sáng màu kết hợp cây xanh tạo cảm giác mộc mạc, thư giãn đậm chất Scandinavian.'
    ],
    views: 3840
  },
  {
    id: 5,
    title: 'Nhà đẹp ngập nắng ở Sài Gòn khiến ai cũng mê mẩn',
    slug: 'nha-dep-ngap-nang-o-sai-gon-khien-ai-cung-me-man',
    dateTag: '04 Th12',
    fullDate: '04/12/2025',
    category: 'Nhà Đẹp',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    excerpt: 'Nhìn từ bên ngoài, ngôi nhà không có quá nhiều điểm nổi bật nhưng bên trong là một ốc đảo xanh mát với hồ cá và cây xanh...',
    content: [
      'Thiết kế mở lấy thiên nhiên làm trọng tâm giúp giảm nhiệt độ trong nhà từ 3-4 độ C so với bên ngoài.',
      'Các mảng tường gạch thô và bê tông mài tạo điểm nhấn kiến trúc mộc mạc và cá tính.'
    ],
    views: 4120
  },
  {
    id: 6,
    title: 'Cải tạo phòng khách thành không gian sinh hoạt đẹp như mơ',
    slug: 'cai-tao-phong-khach-thanh-khong-gian-sinh-hoat-dep',
    dateTag: '04 Th12',
    fullDate: '04/12/2025',
    category: 'Ý Tưởng Trang Trí',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    excerpt: 'Không gian sống tươi vui và đẹp mắt luôn tạo cho chúng ta sự hứng khởi sau những giờ làm việc căng thẳng...',
    content: [
      'Sử dụng các gam màu pastel như xanh bạc hà và vàng nhạt giúp không gian phòng khách bừng sáng và tràn đầy năng lượng.',
      'Sofa vải êm ái cùng thảm dệt tay tạo điểm nhấn ấm cúng cho cả gia đình quây quần.'
    ],
    views: 3670
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
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  if (['dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function UrbanTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme, projects, posts }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS05_PROPERTIES.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS05_PROPERTIES[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS05_NEWS.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS05_NEWS[0];
  });

  // Filter State
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterBedrooms, setFilterBedrooms] = useState('all');
  const [filterArea, setFilterArea] = useState('all');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Form State
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', note: '' });

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS05_PROPERTIES.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS05_NEWS.find(a => a.slug === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    setActiveGalleryIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    const tSlug = template?.slug || 'bds-05';
    const finalUrl = urlSlug ? `/demo/${tSlug}/${urlSlug}` : `/demo/${tSlug}`;
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/demo/')) {
      window.history.pushState(null, '', finalUrl + window.location.search);
    }
  };

  const handleOpenProperty = (prop: PropertyItem) => {
    setSelectedProperty(prop);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.phone || !contactForm.name) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    alert(`🎉 Cảm ơn quý khách ${contactForm.name}!\nBộ phận tư vấn Biệt Thự Nghỉ Dưỡng An Viên sẽ liên hệ qua SĐT ${contactForm.phone} trong 15 phút để gửi bảng giá và chính sách ưu đãi.`);
    setContactForm({ name: '', phone: '', email: '', note: '' });
  };

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return BDS05_PROPERTIES.filter(item => {
      if (['dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue'].includes(currentPage)) {
        if (item.category !== currentPage) return false;
      }
      if (filterType !== 'all' && item.category !== filterType) return false;
      if (filterCity !== 'all' && item.city !== filterCity) return false;
      if (filterPrice !== 'all') {
        if (filterPrice === 'under-2' && item.priceNum >= 2) return false;
        if (filterPrice === '2-5' && (item.priceNum < 2 || item.priceNum > 5)) return false;
        if (filterPrice === 'above-5' && item.priceNum <= 5) return false;
      }
      if (filterBedrooms !== 'all') {
        const beds = parseInt(filterBedrooms, 10);
        if (item.bedrooms < beds) return false;
      }
      if (filterArea !== 'all') {
        if (filterArea === 'under-300' && item.areaNum >= 300) return false;
        if (filterArea === 'above-300' && item.areaNum < 300) return false;
      }
      return true;
    });
  }, [currentPage, filterType, filterCity, filterPrice, filterBedrooms, filterArea]);

  const activeHotline = company?.phone || '0919 006 030';
  const hotlineTel = activeHotline.replace(/[^0-9]/g, '') || '0919006030';
  const activeEmail = company?.email || 'ntrungz0704@gmail.com';
  const activeAddress = company?.address || '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội';

  // ── HEADER ──
  const renderHeader = () => (
    <header className="w-full bg-white text-slate-800 sticky top-0 z-40 border-b border-slate-200 shadow-sm">
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between`}>
        {/* Brand Logo: TEMPLATESBDS */}
        <div onClick={() => navigate('home')} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-[#0084FF] text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition">
            TB
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-[#0084FF] leading-none group-hover:text-blue-700 transition">
              {company?.name || 'TEMPLATESBDS'}
            </div>
            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              {company?.slogan || 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam'}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'home', label: 'Trang Chủ' },
            { id: 'dat-du-an', label: 'Đất Dự Án' },
            { id: 'dat-nen', label: 'Đất Nền' },
            { id: 'nha-o', label: 'Nhà Ở' },
            { id: 'nha-cho-thue', label: 'Nhà Cho Thuê' },
            { id: 'news', label: 'Tin Tức' },
          ].map(navItem => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`px-3.5 py-2 rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#0084FF] font-black border-b-2 border-[#0084FF] rounded-none'
                    : 'text-slate-600 hover:text-[#0084FF] hover:bg-slate-50'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => navigate('contact')}
            className="px-4 py-2 bg-[#0084FF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-sm transition active:scale-95 cursor-pointer"
          >
            LIÊN HỆ NGAY
          </button>
          <button
            onClick={() => navigate('contact')}
            className="px-4 py-2 bg-[#D83A3A] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-sm transition active:scale-95 cursor-pointer"
          >
            NHẬN ƯU ĐÃI
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer ml-auto"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-700 shadow-xl">
          {[
            { id: 'home', label: 'Trang Chủ' },
            { id: 'dat-du-an', label: 'Đất Dự Án' },
            { id: 'dat-nen', label: 'Đất Nền' },
            { id: 'nha-o', label: 'Nhà Ở' },
            { id: 'nha-cho-thue', label: 'Nhà Cho Thuê' },
            { id: 'news', label: 'Tin Tức' },
            { id: 'contact', label: 'Liên Hệ' },
          ].map(navItem => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${
                  isActive ? 'bg-blue-50 text-[#0084FF] font-black' : 'hover:bg-slate-50'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${hotlineTel}`}
              className="block w-full text-center py-2.5 bg-[#0084FF] text-white font-black rounded-lg cursor-pointer"
            >
              📞 GỌI HOTLINE: {activeHotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );

  // ── FLOATING PHONE WIDGET (LEFT SCREEN) ──
  const renderFloatingPhone = () => (
    <a
      href={`tel:${hotlineTel}`}
      className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-[#E65100] hover:bg-[#F57C00] text-white px-3.5 py-2.5 rounded-r-full shadow-2xl items-center gap-2 text-xs font-black tracking-wide cursor-pointer transition transform hover:scale-105"
    >
      <div className="w-7 h-7 rounded-full bg-white text-[#E65100] flex items-center justify-center shadow-inner">
        <Phone size={14} />
      </div>
      <div>
        <span className="text-[10px] block opacity-90 font-normal">Tư vấn miễn phí (24/7)</span>
        <span className="text-sm font-black">{activeHotline}</span>
      </div>
    </a>
  );

  // ── HERO PANORAMIC WATERFRONT BANNER ──
  const renderHeroBanner = () => (
    <div
      className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.35)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80)'
      }}
    >
      {/* Floating Filter Bar */}
      <div className={`${MAX_W} mx-auto w-full px-4`}>
        <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-2xl border border-white/40 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 text-xs">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer"
            >
              <option value="all">Chọn loại BĐS</option>
              <option value="dat-du-an">Đất dự án</option>
              <option value="dat-nen">Đất nền</option>
              <option value="nha-o">Nhà ở</option>
              <option value="nha-cho-thue">Nhà cho thuê</option>
            </select>

            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer"
            >
              <option value="all">Vị trí / Thành phố</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Phan Thiết">Phan Thiết</option>
              <option value="Đà Lạt">Đà Lạt</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>

            <select
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer"
            >
              <option value="all">Khoảng giá</option>
              <option value="under-2">Dưới 2 Tỷ</option>
              <option value="2-5">Từ 2 - 5 Tỷ</option>
              <option value="above-5">Trên 5 Tỷ</option>
            </select>

            <select
              value={filterBedrooms}
              onChange={e => setFilterBedrooms(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer"
            >
              <option value="all">Số phòng ngủ</option>
              <option value="3">3+ Phòng ngủ</option>
              <option value="4">4+ Phòng ngủ</option>
              <option value="5">5+ Phòng ngủ</option>
            </select>

            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer"
            >
              <option value="all">Diện tích</option>
              <option value="under-300">Dưới 300 m²</option>
              <option value="above-300">Trên 300 m²</option>
            </select>

            <button
              onClick={() => navigate('dat-du-an')}
              className="bg-[#10B981] hover:bg-emerald-600 text-white font-black px-4 py-2 rounded-lg transition shadow flex items-center justify-center gap-1 cursor-pointer active:scale-95"
            >
              <Search size={14} /> Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PROPERTY CARD RENDERER (WITH RED CORNER RIBBON & BLUE PRICE) ──
  const renderPropertyCard = (item: PropertyItem) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-xl border border-slate-200 hover:border-[#0084FF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between relative"
    >
      <div>
        <div className="h-44 relative overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.title}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Red Corner Ribbon */}
          <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none">
            <div className="bg-[#D83A3A] text-white text-[9px] font-black text-center py-1 uppercase tracking-wider transform rotate-45 translate-x-6 translate-y-2 shadow-md">
              {item.badge}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-xs sm:text-sm text-[#C05621] group-hover:text-[#0084FF] transition line-clamp-1">
            {item.title}
          </h3>

          <div className="grid grid-cols-2 gap-y-1 text-[11px] text-slate-500 pt-1">
            <div className="flex items-center gap-1">
              <Maximize2 size={12} className="text-slate-400" />
              <span>Diện tích: <strong className="text-slate-700">{item.area}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Bed size={12} className="text-slate-400" />
              <span>Phòng ngủ: <strong className="text-slate-700">{item.bedrooms}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={12} className="text-slate-400" />
              <span>Phòng tắm: <strong className="text-slate-700">{item.bathrooms}</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Compass size={12} className="text-slate-400" />
              <span>Hướng: <strong className="text-slate-700">{item.direction}</strong></span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="font-extrabold text-[#0084FF] text-xs sm:text-sm">
              {item.price}
            </span>
            <span className="text-[11px] text-slate-400 group-hover:text-[#0084FF] font-semibold transition">
              Chi tiết ›
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ── HOMEPAGE RENDERER ──
  const renderHomePage = () => (
    <div className="bg-[#F8F9FA] space-y-14 pb-16">
      {renderHeroBanner()}

      {/* 1. DỰ ÁN MỚI (6 CARDS) */}
      <section className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">
            ── DỰ ÁN MỚI ──
          </h2>
          <div className="w-12 h-0.5 bg-[#C05621] mx-auto mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS05_PROPERTIES.slice(0, 6).map(renderPropertyCard)}
        </div>
      </section>

      {/* 2. DỰ ÁN BÁN CHẠY (6 CARDS) */}
      <section className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">
            ── DỰ ÁN BÁN CHẠY ──
          </h2>
          <div className="w-12 h-0.5 bg-[#C05621] mx-auto mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS05_PROPERTIES.slice(0, 6).map(renderPropertyCard)}
        </div>
      </section>

      {/* 3. TIN TỨC CẬP NHẬT (6 CARDS) */}
      <section className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">
            ── TIN TỨC CẬP NHẬT ──
          </h2>
          <div className="w-12 h-0.5 bg-[#C05621] mx-auto mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS05_NEWS.map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#0084FF] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src={art.image}
                  alt={art.title}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0084FF] transition line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{art.fullDate}</span>
                  <span className="text-[#0084FF] font-bold">Xem thêm ›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ── SUBPAGE 2-COLUMN ARCHIVE (MATCHING SCREENSHOT 2) ──
  const renderArchivePage = () => {
    const pageTitleMap: Record<string, string> = {
      'dat-du-an': 'Đất Dự Án Quy Hoạch Đồng Bộ',
      'dat-nen': 'Đất Nền Phân Lô Sổ Đỏ Trao Tay',
      'nha-o': 'Danh Sách Nhà Ở & Biệt Thự An Viên',
      'nha-cho-thue': 'Nhà Cho Thuê & Biệt Thự Nghỉ Dưỡng',
      'news': 'Danh Sách Bài Viết & Cẩm Nang Bất Động Sản',
      'contact': 'Liên Hệ & Đăng Ký Tư Vấn BĐS',
    };

    const currentTitle = pageTitleMap[currentPage] || 'Danh sách bài viết & Dự án';

    return (
      <div className="bg-[#F8F9FA] py-8 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span className="text-[#0084FF] font-bold">{currentTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Left Column (70%) */}
            <div className="lg:col-span-8 space-y-4">
              {BDS05_NEWS.map(art => (
                <div
                  key={art.id}
                  onClick={() => handleOpenArticle(art)}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#0084FF] p-4 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row gap-4 items-start group"
                >
                  {/* Image with Date Badge */}
                  <div className="w-full sm:w-48 h-36 relative shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#0084FF] text-white text-[10px] font-black px-2 py-1 rounded shadow text-center leading-tight">
                      {art.dateTag}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-black text-xs sm:text-sm text-slate-800 group-hover:text-[#0084FF] transition line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                    <div className="pt-2 text-[11px] text-[#0084FF] font-bold">
                      Đọc tiếp [...]
                    </div>
                  </div>
                </div>
              ))}
            </div>

          {/* Right Sidebar (30%) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: DANH MỤC BIỆT THỰ */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-[#0084FF] px-4 py-2.5 text-white font-black text-xs uppercase tracking-wider">
                DANH MỤC BIỆT THỰ
              </div>
              <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {[
                  { id: 'dat-du-an', label: 'Đất dự án' },
                  { id: 'dat-nen', label: 'Đất nền' },
                  { id: 'nha-cho-thue', label: 'Nhà cho thuê' },
                  { id: 'nha-o', label: 'Nhà ở' },
                ].map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => navigate(cat.id)}
                    className="p-3 hover:bg-slate-50 hover:text-[#0084FF] transition cursor-pointer flex items-center justify-between"
                  >
                    <span>{cat.label}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: CÓ THỂ BẠN THÍCH */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-[#0084FF] px-4 py-2.5 text-white font-black text-xs uppercase tracking-wider">
                CÓ THỂ BẠN THÍCH
              </div>
              <div className="divide-y divide-slate-100 p-2 space-y-2">
                {BDS05_PROPERTIES.slice(0, 5).map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenProperty(item)}
                    className="p-2 hover:bg-slate-50 rounded-lg transition cursor-pointer flex gap-3 items-center group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                      className="w-16 h-12 rounded object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 group-hover:text-[#0084FF] transition truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs font-black text-[#0084FF] mt-0.5">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PROPERTY DETAIL PAGE ──
  const renderPropertyDetailPage = () => (
    <div className="bg-[#F8F9FA] py-8 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate('dat-du-an')} className="hover:text-[#0084FF] cursor-pointer">Dự án</span>
          <span>/</span>
          <span className="text-[#0084FF] font-bold truncate">{selectedProperty.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <span className="px-3 py-1 bg-red-100 text-red-700 font-black text-xs rounded-full">
                {selectedProperty.badge}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedProperty.title}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin size={14} className="text-red-500 shrink-0" /> {selectedProperty.location}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Giá bán niêm yết</span>
                  <span className="text-2xl font-black text-[#0084FF]">{selectedProperty.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Tổng diện tích</span>
                  <span className="text-base font-bold text-slate-800">{selectedProperty.area}</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="h-80 sm:h-96 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={selectedProperty.gallery[activeGalleryIdx] || selectedProperty.image}
                  alt=""
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedProperty.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveGalleryIdx(i)}
                    className={`h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                      activeGalleryIdx === i ? 'border-[#0084FF]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specs & Desc */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs sm:text-sm">
              <h3 className="font-black text-sm text-[#C05621] uppercase border-b border-slate-100 pb-2">
                THÔNG TIN CHI TIẾT BẤT ĐỘNG SẢN
              </h3>
              <p className="text-slate-700 leading-relaxed">{selectedProperty.desc}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">Số PN: <strong className="block text-slate-800">{selectedProperty.bedrooms}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Số WC: <strong className="block text-slate-800">{selectedProperty.bathrooms}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Hướng: <strong className="block text-slate-800">{selectedProperty.direction}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Pháp lý: <strong className="block text-emerald-700 font-bold">Sổ hồng riêng</strong></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-black text-base text-slate-900 uppercase">
                Liên Hệ Tư Vấn BĐS Này
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Họ và tên..."
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại..."
                  value={contactForm.phone}
                  onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-[#0084FF]"
                />
                <textarea
                  rows={3}
                  placeholder="Lời nhắn..."
                  value={contactForm.note}
                  onChange={e => setContactForm({ ...contactForm, note: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0084FF] hover:bg-blue-600 text-white font-black text-xs uppercase rounded-lg shadow transition cursor-pointer"
                >
                  GỬI YÊU CẦU NGAY
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── NEWS DETAIL ──
  const renderArticleDetailPage = () => (
    <div className="bg-[#F8F9FA] py-8 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-6`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate('news')} className="hover:text-[#0084FF] cursor-pointer">Tin tức</span>
          <span>/</span>
          <span className="text-[#0084FF] font-bold truncate">{selectedArticle.title}</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <span className="px-3 py-1 bg-blue-100 text-[#0084FF] font-bold text-xs rounded-full">
            {selectedArticle.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {selectedArticle.title}
          </h1>
          <div className="text-xs text-slate-400 flex items-center gap-3 border-b border-slate-100 pb-3">
            <span>Ngày đăng: {selectedArticle.fullDate}</span>
            <span>•</span>
            <span>{selectedArticle.views} lượt xem</span>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xs">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {selectedArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#F8F9FA] font-sans antialiased text-slate-800 relative ${isSmall ? 'text-xs' : ''}`}>
      {renderHeader()}
      {renderFloatingPhone()}
      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHomePage()}
        {['dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue', 'news'].includes(currentPage) && renderArchivePage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {currentPage === 'news-detail' && renderArticleDetailPage()}
        {currentPage === 'contact' && renderArchivePage()}
        {!['home', 'dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue', 'news', 'property-detail', 'news-detail', 'contact'].includes(currentPage) && renderHomePage()}
      </main>
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-05 (Urban City — Biệt Thự An Viên)"
        onNavigate={navigate}
        hotlinePhone={activeHotline}
        zaloPhone="0919006030"
      />
    </div>
  );
}
