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
  Globe, Bookmark, SearchCheck
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
  category: 'ban' | 'thue' | 'du-an' | 'nghi-duong';
  type: string; // 'Căn Hộ Chung Cư', 'Biệt Thự Đơn Lập', 'Nhà Phố Thương Mại', 'Penthouse', 'Đất Nền'
  location: string;
  city: string; // 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Phú Quốc'
  price: string;
  priceNum: number; // in billion VND (or million/month if rental)
  priceUnit: string;
  area: string;
  areaNum: number;
  beds: number;
  baths: number;
  image: string;
  hot?: boolean;
  statusTag: string; // 'Đang Mở Bán', 'Chính Chủ', 'Giá Tốt', 'Mới Nhất'
  description: string;
  features: string[];
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
// BDS-21 MOCK DATA: {company?.name || 'TEMPLATESBDS'} (CỔNG GIAO DỊCH BẤT ĐỘNG SẢN TOÀN DIỆN)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS21_PROPERTIES: PropertyItem[] = [
  {
    id: 'bds-sale-01',
    title: 'Biệt Thự Vườn Đơn Lập The Manor Central Park Hoàng Mai',
    slug: 'biet-thu-vuon-don-lap-the-manor-central-park',
    category: 'ban',
    type: 'Biệt Thự Đơn Lập',
    location: 'Đường Nguyễn Xiển, Hoàng Mai, Hà Nội',
    city: 'Hà Nội',
    price: '28.5 Tỷ VNĐ',
    priceNum: 28.5,
    priceUnit: 'Tỷ',
    area: '210 m²',
    areaNum: 210,
    beds: 5,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    statusTag: 'Đang Mở Bán',
    description: 'Biệt thự góc 2 mặt tiền view trực diện công viên Chu Văn An, thiết kế tân cổ điển Pháp sang trọng.',
    features: ['Sân vườn rộng 60m²', 'Gara 2 ô tô', 'Sổ đỏ chính chủ', 'Nội thất nhập khẩu']
  },
  {
    id: 'bds-sale-02',
    title: 'Căn Hộ Masteri Centre Point Vinhomes Grand Park Quận 9',
    slug: 'can-ho-masteri-centre-point-quan-9',
    category: 'ban',
    type: 'Căn Hộ Chung Cư',
    location: 'Khu Đô Thị Grand Park, TP. Thủ Đức, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    price: '3.65 Tỷ VNĐ',
    priceNum: 3.65,
    priceUnit: 'Tỷ',
    area: '72 m²',
    areaNum: 72,
    beds: 2,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    statusTag: 'Chính Chủ',
    description: 'Căn hộ view trực diện biển hồ cát trắng và đại công viên ánh sáng 36ha, bàn giao full nội thất cao cấp.',
    features: ['Hồ bơi phi thuyền', 'Bàn giao Hafele & Kohler', 'Hỗ trợ vay 80%', 'Sổ hồng lâu dài']
  },
  {
    id: 'bds-sale-03',
    title: 'Penthouse Duplex Dát Vàng Vinhomes Golden River Ba Son Q1',
    slug: 'penthouse-duplex-vinhomes-golden-river-q1',
    category: 'ban',
    type: 'Penthouse',
    location: 'Số 2 Tôn Đức Thắng, Bến Nghé, Quận 1, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    price: '48.0 Tỷ VNĐ',
    priceNum: 48.0,
    priceUnit: 'Tỷ',
    area: '320 m²',
    areaNum: 320,
    beds: 4,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    statusTag: 'VIP Độc Bản',
    description: 'Tầm nhìn triệu đô 360 độ ngắm trọn sông Sài Gòn và Landmark 81, hồ bơi tràn bờ trên cao độc quyền.',
    features: ['Thang máy riêng bảo mật', 'Kính Low-E 3 lớp', 'Nội thất Bentley Home', 'Bến du thuyền 5 sao']
  },
  {
    id: 'bds-rent-01',
    title: 'Cho Thuê Căn Hộ Vinhomes Metropolis Liễu Giai Ba Đình Full Đồ',
    slug: 'cho-thue-can-ho-vinhomes-metropolis-lieu-giai',
    category: 'thue',
    type: 'Căn Hộ Chung Cư',
    location: '29 Liễu Giai, Ba Đình, Hà Nội',
    city: 'Hà Nội',
    price: '28 Triệu/tháng',
    priceNum: 0.028,
    priceUnit: 'Triệu/tháng',
    area: '82 m²',
    areaNum: 82,
    beds: 2,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    hot: false,
    statusTag: 'Giá Tốt',
    description: 'Căn hộ tầng trung view hồ Tây lộng gió, nội thất decor phong cách Scandinavian hiện đại tinh tế.',
    features: ['View hồ Tây tuyệt đẹp', 'Đầy đủ đồ đạc chỉ việc xách vali về ở', 'Gần đại sứ quán Nhật', 'Hầm đỗ xe thông minh']
  },
  {
    id: 'bds-rent-02',
    title: 'Cho Thuê Biệt Thự Thảo Điền Quận 2 Có Hồ Bơi Riêng Biệt',
    slug: 'cho-thue-biet-thu-thao-dien-quan-2',
    category: 'thue',
    type: 'Biệt Thự Đơn Lập',
    location: 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    price: '85 Triệu/tháng',
    priceNum: 0.085,
    priceUnit: 'Triệu/tháng',
    area: '380 m²',
    areaNum: 380,
    beds: 5,
    baths: 6,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    statusTag: 'Mới Nhất',
    description: 'Biệt thự sân vườn hồ bơi biệt lập, khu vực an ninh 24/7 yên tĩnh thích hợp cho chuyên gia nước ngoài.',
    features: ['Hồ bơi riêng biệt', 'Sân vườn xanh mát', 'Khu chuyên gia quốc tế', 'Gần trường Quốc tế BIS']
  },
  {
    id: 'bds-resort-01',
    title: 'Biệt Thự Biển Sun Premier Village The Eden Bay Mũi Ông Đội',
    slug: 'biet-thu-bien-sun-premier-village-eden-bay',
    category: 'nghi-duong',
    type: 'Biệt Thự Đơn Lập',
    location: 'Mũi Ông Đội, An Thới, TP. Phú Quốc, Kiên Giang',
    city: 'Phú Quốc',
    price: '55.0 Tỷ VNĐ',
    priceNum: 55.0,
    priceUnit: 'Tỷ',
    area: '450 m²',
    areaNum: 450,
    beds: 4,
    baths: 5,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: true,
    statusTag: 'Đang Mở Bán',
    description: 'Tuyệt phẩm biệt thự ghềnh đá ngắm trọn vẹn 2 mặt biển bình minh và hoàng hôn tại cùng một vị trí.',
    features: ['Bãi biển riêng tư', 'Chia sẻ doanh thu cho thuê 85/15', 'Tặng 15 đêm nghỉ/năm', 'Quản lý bởi AccorHotels']
  },
  {
    id: 'bds-project-01',
    title: 'Khu Đô Thị Sinh Thái Đảo Đồng Nơ Ecopark Grand The Island',
    slug: 'khu-do-thi-ecopark-grand-the-island',
    category: 'du-an',
    type: 'Biệt Thự Đơn Lập',
    location: 'Văn Giang, Hưng Yên (Liền kề Hà Nội)',
    city: 'Hà Nội',
    price: '35.0 Tỷ VNĐ',
    priceNum: 35.0,
    priceUnit: 'Tỷ',
    area: '300 m²',
    areaNum: 300,
    beds: 4,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: true,
    statusTag: 'Dự Án Trọng Điểm',
    description: 'Biệt thự đảo thượng lưu vươn mình giữa mặt nước vịnh hồ xanh ngọc bích, chuẩn mực sống xanh thế giới.',
    features: ['100% Biệt thự view mặt nước', 'Du thuyền đưa đón', 'Sân golf 18 lỗ', 'Clubhouse tiêu chuẩn 6 sao']
  },
  {
    id: 'bds-sale-04',
    title: 'Shophouse Phố Đi Bộ Sơn Trà Marina Ngắm Toàn Cảnh Vịnh Đà Nẵng',
    slug: 'shophouse-son-tra-marina-da-nang',
    category: 'ban',
    type: 'Nhà Phố Thương Mại',
    location: 'Bán Đảo Sơn Trà, Q. Sơn Trà, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    price: '16.5 Tỷ VNĐ',
    priceNum: 16.5,
    priceUnit: 'Tỷ',
    area: '140 m²',
    areaNum: 140,
    beds: 3,
    baths: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    statusTag: 'Vị Trí Đắc Địa',
    description: 'Shophouse phong cách Santorini bên vịnh biển Sơn Trà, tiềm năng kinh doanh F&B và dịch vụ du lịch cao.',
    features: ['Mặt tiền đường du lịch', 'Kinh doanh ngay', 'Sở hữu lâu dài', 'Tầm nhìn ôm trọn vịnh Đà Nẵng']
  },
  {
    id: 'bds-sale-05',
    title: 'Căn Hộ Condotel View Biển Trần Phú Nha Trang Đẳng Cấp 5 Sao',
    slug: 'can-ho-condotel-tran-phu-nha-trang',
    category: 'ban',
    type: 'Căn Hộ Chung Cư',
    location: 'Đường Trần Phú, Lộc Thọ, TP. Nha Trang, Khánh Hòa',
    city: 'Nha Trang',
    price: '2.85 Tỷ VNĐ',
    priceNum: 2.85,
    priceUnit: 'Tỷ',
    area: '56 m²',
    areaNum: 56,
    beds: 1,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: false,
    statusTag: 'Sinh Lời Tốt',
    description: 'Căn hộ nghỉ dưỡng trực diện bãi biển Nha Trang, tỷ lệ lấp đầy phòng lưu trú trên 85% quanh năm.',
    features: ['Cách biển 50m', 'Vận hành bởi tập đoàn quốc tế', 'Cam kết lợi nhuận 10%/năm', 'Sổ hồng riêng']
  }
];

export const BDS21_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Thị Trường Bất Động Sản Quý 3/2026: Sức Hút Của Phân Khúc BĐS Nghỉ Dưỡng Sinh Thái',
    slug: 'thi-truong-bds-quy-3-2026-suc-hut-nghi-duong',
    date: '28/08/2026',
    author: 'Hiệp Hội BĐS Việt Nam',
    category: 'Thị Trường',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Dòng tiền đầu tư đang có xu hướng dịch chuyển mạnh mẽ sang các sản phẩm BĐS sở hữu pháp lý minh bạch và giá trị thực.',
    content: [
      'Báo cáo thị trường chỉ ra nhu cầu tìm kiếm nhà ở xanh và căn hộ nghỉ dưỡng ven sông tăng hơn 45% so với cùng kỳ năm trước.',
      'Các chính sách nới lỏng tín dụng và hạ tầng giao thông kết nối liên vùng đang là động lực tăng trưởng chính.'
    ],
    views: 6420
  },
  {
    id: 2,
    title: 'Kinh Nghiệm Thẩm Định Pháp Lý & Quy Hoạch Nhà Đất Dành Cho Nhà Đầu Tư Mới',
    slug: 'kinh-nghiem-tham-dinh-phap-ly-quy-hoach',
    date: '26/08/2026',
    author: 'Luật Sư Bất Động Sản',
    category: 'Kinh Nghiệm',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Hướng dẫn chi tiết quy trình tra cứu thông tin sổ hồng, kiểm tra quy hoạch phân khu và hạn chế tối đa rủi ro mua bán.',
    content: [
      'Người mua cần trực tiếp kiểm tra bản đồ địa chính tại văn phòng đăng ký đất đai và xác minh tình trạng thế chấp ngân hàng.'
    ],
    views: 5120
  },
  {
    id: 3,
    title: 'Top 5 Tuyến Đường Vành Đai Trọng Điểm Tạo Đòn Bẩy Tăng Giá BĐS Phía Nam',
    slug: 'top-5-tuyen-duong-vanh-dai-tang-gia-bds',
    date: '24/08/2026',
    author: 'Chuyên Gia Quy Hoạch',
    category: 'Quy Hoạch',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Tiến độ hoàn thiện Vành đai 3 và các cây cầu kết nối TP.HCM với các tỉnh lân cận đang mở ra cơ hội sinh lời vượt trội.',
    content: [
      'Hạ tầng kết nối là chìa khóa vàng giúp gia tăng giá trị bất động sản đô thị vệ tinh trong dài hạn.'
    ],
    views: 4890
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
  if (clean === 'cho-thue' || clean === 'for-rent') return { page: 'for-rent', propSlug: '', artSlug: '' };
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'khu-vuc' || clean === 'locations') return { page: 'locations', propSlug: '', artSlug: '' };
  if (clean === 'dang-tin' || clean === 'post-property') return { page: 'post-property', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS21Template({
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
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const activeProperties = useMemo<PropertyItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): PropertyItem => {
        const cat = (p.category === 'thue' || p.category === 'cho-thue')
          ? 'thue'
          : (p.category === 'nghi-duong' || p.type?.toLowerCase().includes('nghỉ'))
          ? 'nghi-duong'
          : (p.category === 'du-an' || p.type?.toLowerCase().includes('dự án'))
          ? 'du-an'
          : 'ban';

        return {
          id: p.slug || `prop-${idx + 1}`,
          title: p.title || p.name || 'Bất động sản nghỉ dưỡng & đô thị',
          slug: p.slug || `bds-${idx + 1}`,
          category: cat,
          type: p.type || 'Biệt Thự Đơn Lập',
          location: p.address || p.location || 'Vị trí đắc địa trung tâm',
          city: p.city || 'TP. Hồ Chí Minh',
          price: p.price || (p.priceFrom ? `${p.priceFrom} Tỷ` : 'Liên hệ'),
          priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 4.5),
          priceUnit: 'Tỷ',
          area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '120 m²'),
          areaNum: typeof p.area === 'number' ? p.area : 120,
          beds: p.beds || p.bedrooms || 3,
          baths: p.baths || p.bathrooms || 2,
          image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
          hot: Boolean(idx === 0),
          statusTag: p.statusTag || (idx === 0 ? 'Đang Mở Bán' : 'Giá Tốt'),
          description: p.description || p.desc || 'Không gian sống nghỉ dưỡng thượng lưu kết hợp đầu tư sinh lời vượt trội.',
          features: Array.isArray(p.features) ? p.features : ['Sổ hồng chính chủ', 'Vị trí đắc địa', 'Tiện ích cao cấp'],
        };
      });
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS21_PROPERTIES).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS21_PROPERTIES;
  }, [projects]);

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
      const remainingDefaults = (BDS21_NEWS).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS21_NEWS;
  }, [posts, company]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProperties.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeProperties[0] || BDS21_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS21_NEWS[0];
  });

  // Dynamic Search States
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableCities = useMemo(() => {
    const set = new Set(activeProperties.map(p => p.city).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [activeProperties]);

  const availableTypes = useMemo(() => {
    const set = new Set(activeProperties.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [activeProperties]);

  // Forms
  const [postForm, setPostForm] = useState({ name: '', phone: '', title: '', city: 'Hà Nội', price: '', note: '' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-21';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS21_PROPERTIES.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS21_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
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
    else if (page === 'for-rent') urlSlug = 'cho-thue';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'locations') urlSlug = 'khu-vuc';
    else if (page === 'post-property') urlSlug = 'dang-tin';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (p: PropertyItem) => {
    setSelectedProperty(p);
    navigate('property-detail', p.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.name || !postForm.phone || !postForm.title) {
      alert('Vui lòng điền đầy đủ họ tên, số điện thoại và tiêu đề bất động sản!');
      return;
    }
    showToast(`🎉 Tiếp nhận tin đăng "${postForm.title}" từ ${postForm.name} (${postForm.phone}). Bộ phận kiểm duyệt sẽ liên hệ xác nhận trong 15 phút!`);
    setPostForm({ name: '', phone: '', title: '', city: 'Hà Nội', price: '', note: '' });
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProperties = useMemo(() => {
    return activeProperties.filter(p => {
      // Category
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;

      // City
      if (filterCity !== 'all' && p.city !== filterCity) return false;

      // Type matching: fuzzy
      if (filterType !== 'all') {
        const f = filterType.toLowerCase();
        const t = (p.type || '').toLowerCase();
        if (t !== f && !t.includes(f) && !f.includes(t)) return false;
      }

      // Keyword
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const matchTitle = (p.title || '').toLowerCase().includes(kw);
        const matchLoc = (p.location || '').toLowerCase().includes(kw);
        const matchType = (p.type || '').toLowerCase().includes(kw);
        if (!matchTitle && !matchLoc && !matchType) return false;
      }

      // Price matching
      if (filterPrice === 'under-5' && p.priceNum >= 5) return false;
      if (filterPrice === '5-15' && (p.priceNum < 5 || p.priceNum > 15)) return false;
      if (filterPrice === 'above-15' && p.priceNum <= 15) return false;

      return true;
    });
  }, [filterCategory, filterCity, filterType, searchKeyword, filterPrice]);

  // Global Search View Auto-Switch Rule
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(`🔍 Tìm thấy ${count} bất động sản phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-bds');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & NAVBAR (ROYAL COBALT BLUE & CORAL ACCENTS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#1E40AF] text-white shadow-xl border-b border-blue-400/30">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center text-[#1E40AF] font-black text-base sm:text-xl shadow shrink-0">
            🏠
          </div>
          <div className="min-w-0 truncate">
            <span className="text-base sm:text-2xl font-black tracking-wider text-white block leading-none truncate">
              HOMEO <span className="text-rose-300">REALTY</span>
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-bold text-blue-200 uppercase tracking-widest block mt-0.5 truncate">
              CỔNG GIAO DỊCH BẤT ĐỘNG SẢN TOÀN DIỆN
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap">
          <button onClick={() => navigate('home')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'home' ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Trang Chủ</button>
          <button onClick={() => navigate('about')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'about' ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('for-sale')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'for-sale' || (currentPage === 'property-detail' && selectedProperty.category === 'ban') ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>BĐS Bán</button>
          <button onClick={() => navigate('for-rent')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'for-rent' || (currentPage === 'property-detail' && selectedProperty.category === 'thue') ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Cho Thuê</button>
          <button onClick={() => navigate('projects')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'projects' || (currentPage === 'property-detail' && selectedProperty.category === 'du-an') ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Dự Án</button>
          <button onClick={() => navigate('locations')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'locations' ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Khu Vực</button>
          <button onClick={() => navigate('news')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`whitespace-nowrap px-3 py-2 transition-all ${currentPage === 'contact' ? 'bg-[#1D4ED8] text-rose-300 font-extrabold' : 'hover:text-rose-300'}`}>Liên Hệ</button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={() => navigate('post-property')}
            className="hidden md:inline-block px-4 py-2 bg-[#E11D48] hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            + Đăng Tin Miễn Phí
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
        <div className="xl:hidden bg-[#1E3A8A] border-t border-blue-400/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Giới Thiệu</button>
            <button onClick={() => navigate('for-sale')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">BĐS Bán</button>
            <button onClick={() => navigate('for-rent')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Cho Thuê</button>
            <button onClick={() => navigate('projects')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Dự Án</button>
            <button onClick={() => navigate('locations')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Khu Vực</button>
            <button onClick={() => navigate('news')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Tin Tức</button>
            <button onClick={() => navigate('contact')} className="p-2.5 text-left bg-[#1D4ED8] hover:text-rose-300">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO SECTION & LARGE SEARCH BAR
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroSection = () => (
    <section className="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden border-b border-blue-300">
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
        alt="Homeo Realty Hero"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/40 to-transparent" />

      <div className={`${MAX_W} mx-auto px-4 relative z-20 text-center space-y-6 max-w-4xl`}>
        <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase text-white tracking-wide drop-shadow-lg">
          Tìm Kiếm Ngôi Nhà Bạn Yêu Thích
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-medium">
          Hơn 15.000+ bất động sản chính chủ, căn hộ chung cư, biệt thự nghỉ dưỡng và nhà phố sinh lời cao trên toàn quốc.
        </p>

        {/* Big Search Box */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-2.5 shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto text-slate-800 text-xs">
          <div className="flex-1 flex items-center px-3 gap-2 border md:border-0 border-slate-200">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="Nhập tên dự án, đường, quận hoặc từ khóa cần tìm..."
              className="w-full py-2.5 focus:outline-none text-slate-800 text-xs font-medium"
            />
          </div>

          <select
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
            className="bg-white text-slate-900 border border-slate-200 px-3 py-2.5 focus:outline-none font-bold font-medium"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Khu Vực (Tất cả)</option>
            {availableCities.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-white text-slate-900 border border-slate-200 px-3 py-2.5 focus:outline-none font-bold font-medium"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Hình thức (Tất cả)</option>
            <option className="text-slate-900 bg-white font-medium" value="ban">BĐS Cần Bán</option>
            <option className="text-slate-900 bg-white font-medium" value="thue">Cho Thuê</option>
            <option className="text-slate-900 bg-white font-medium" value="du-an">Dự Án Mới</option>
            <option className="text-slate-900 bg-white font-medium" value="nghi-duong">BĐS Nghỉ Dưỡng</option>
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-[#E11D48] hover:bg-rose-700 text-white font-black uppercase tracking-wider shadow cursor-pointer transition flex items-center justify-center gap-1.5"
          >
            <Search size={16} /> Tìm Kiếm
          </button>
        </form>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: VỀ CHÚNG TÔI (ABOUT US CARD BOX)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAboutSection = () => (
    <section id="gioi-thieu" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-white text-slate-900 border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-medium">
          
          <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border-2 border-[#1E40AF] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Homeo Realty Office"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase text-[#E11D48] tracking-widest block">
              VỀ CHÚNG TÔI
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-[#1E40AF]">
              Homeo Realty — Nền Tảng Giao Dịch Bất Động Sản Uy Tín
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chúng tôi tự hào là đơn vị phân phối BĐS chuyên nghiệp với mạng lưới hơn 5.000 môi giới giàu kinh nghiệm trên khắp 63 tỉnh thành. Mọi bất động sản đều được kiểm duyệt pháp lý nghiêm ngặt trước khi niêm yết.
            </p>

            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">✓ <strong>100% Thông tin chính xác:</strong> Hình ảnh thực tế, pháp lý sổ đỏ/sổ hồng minh bạch</li>
              <li className="flex items-center gap-2">✓ <strong>Hỗ trợ thủ tục trọn gói:</strong> Tư vấn vay vốn ngân hàng lãi suất ưu đãi, công chứng sang tên nhanh</li>
              <li className="flex items-center gap-2">✓ <strong>Kết nối trực tiếp chủ nhà:</strong> Đảm bảo giá gốc không qua trung gian nâng giá</li>
            </ul>

            <div className="pt-2">
              <button onClick={() => navigate('contact')} className="px-5 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase shadow">
                Liên Hệ Tư Vấn Ngay ›
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: DANH SÁCH BĐS NỔI BẬT (3X3 GRID)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyListSection = () => (
    <section id="danh-sach-bds" className="py-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#1E40AF] pb-3 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#E11D48] tracking-widest block">
              DANH SÁCH BẤT ĐỘNG SẢN MỚI NHẤT
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">
              TẤT CẢ BẤT ĐỘNG SẢN ({filteredProperties.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Hình thức (Tất cả)</option>
              <option className="text-slate-900 bg-white font-medium" value="ban">BĐS Bán</option>
              <option className="text-slate-900 bg-white font-medium" value="thue">Cho Thuê</option>
              <option className="text-slate-900 bg-white font-medium" value="du-an">Dự Án</option>
              <option className="text-slate-900 bg-white font-medium" value="nghi-duong">Nghỉ Dưỡng</option>
            </select>

            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Tỉnh/Thành (Tất cả)</option>
              {availableCities.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold uppercase shadow cursor-pointer"
            >
              Lọc
            </button>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-600">Không tìm thấy bất động sản nào khớp với tiêu chí lọc.</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterCity('all');
                setFilterType('all');
                setSearchKeyword('');
              }}
              className="px-5 py-2 bg-[#E11D48] text-white font-bold text-xs uppercase shadow"
            >
              Xem Toàn Bộ BĐS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(p => (
              <div 
                key={p.id}
                className="bg-white text-slate-900 border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden font-medium"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#1E40AF] text-white text-[10px] font-black uppercase">
                    {p.statusTag}
                  </span>
                  {p.hot && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">
                      HOT
                    </span>
                  )}
                  
                  {/* Peach / Red Price Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rose-900/90 to-rose-700/80 text-white px-3 py-1.5 flex justify-between items-center text-xs font-black">
                    <span>{p.price}</span>
                    <span className="text-[11px] font-normal">{p.area}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 
                    onClick={() => handleOpenProperty(p)}
                    className="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#1E40AF] cursor-pointer min-h-[34px]"
                  >
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                    📍 {p.location}
                  </p>

                  <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-600 bg-slate-50 p-2 border border-slate-200 text-center font-medium">
                    <div>🛏 {p.beds} PN</div>
                    <div>🚿 {p.baths} WC</div>
                    <div>📐 {p.area}</div>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1E40AF] uppercase">{p.type}</span>
                    <button
                      onClick={() => handleOpenProperty(p)}
                      className="px-3 py-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase transition cursor-pointer"
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
  // 5. SECTION 3: BANNER ĐẶC BIỆT THÁNG (CORAL GRADIENT BANNER)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHighlightBanner = () => (
    <section className="bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#9F1239] text-white py-12">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 border border-white/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <span className="px-3 py-1 bg-white text-[#E11D48] text-xs font-black uppercase">
              BẤT ĐỘNG SẢN ĐỘC BẢN THÁNG 8
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white leading-tight">
              Penthouse Duplex Dát Vàng Ba Son Quận 1 View Sông Sài Gòn
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              Tuyệt phẩm căn hộ áp mái đỉnh cao với trần cao 7m, bể bơi tràn vô cực và tầm nhìn trọn vẹn trung tâm tài chính Quận 1.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <span className="text-2xl font-black text-amber-300">48.0 Tỷ VNĐ</span>
              <button 
                onClick={() => {
                  const p = BDS21_PROPERTIES.find(x => x.id === 'bds-sale-03');
                  if (p) handleOpenProperty(p);
                }}
                className="px-4 py-2 bg-white text-[#E11D48] font-bold text-xs uppercase shadow hover:bg-slate-100 cursor-pointer"
              >
                Xem Chi Tiết Căn Hộ ›
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden border border-white/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
              alt="Penthouse Ba Son"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: KHÁM PHÁ THEO KHU VỰC (EXPLORE BY CITY)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationsSection = () => (
    <section id="khu-vuc" className="py-16 bg-slate-900 text-white">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase text-rose-400 tracking-widest">
            DANH MỤC KHU VỰC TRỌNG ĐIỂM
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-white">
            Khám Phá Bất Động Sản Theo Tỉnh Thành
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Hà Nội', count: '4.250+ Tin Đăng', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' },
            { name: 'TP. Hồ Chí Minh', count: '6.890+ Tin Đăng', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
            { name: 'Đà Nẵng', count: '1.420+ Tin Đăng', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
            { name: 'Nha Trang', count: '980+ Tin Đăng', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
            { name: 'Phú Quốc', count: '650+ Tin Đăng', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
          ].map((loc, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setFilterCity(loc.name);
                handleSearchSubmit();
              }}
              className="relative aspect-[3/4] overflow-hidden border border-slate-700 shadow-md group cursor-pointer"
            >
              <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-sm font-black text-white uppercase">{loc.name}</h3>
                <span className="text-[10px] text-rose-300 font-medium">{loc.count}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: TIN TỨC & KINH NGHIỆM BĐS
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="tin-tuc" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        
        <div className="flex items-center justify-between border-b-2 border-[#1E40AF] pb-3">
          <h2 className="text-2xl font-serif font-black uppercase text-[#1E40AF]">
            TIN TỨC & KINH NGHIỆM BĐS
          </h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-[#E11D48] hover:underline">
            Xem Tất Cả Tin Tức ›
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeNews.map(n => (
            <div key={n.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
              <img src={n.image} alt={n.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-[#E11D48] uppercase">{n.category} • {n.date}</span>
                <h3 
                  onClick={() => handleOpenArticle(n)}
                  className="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#1E40AF] cursor-pointer"
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
  // 8. SECTION 6: FORM ĐĂNG TIN KÝ GỬI (POST PROPERTY MODAL / FORM)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPostPropertySection = () => (
    <section id="dang-tin" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className={`${MAX_W} mx-auto px-4 max-w-2xl space-y-6 text-center`}>
        
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-[#E11D48] tracking-widest block">
            DỊCH VỤ KÝ GỬI NHANH CHÓNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-[#1E40AF]">
            Đăng Tin Ký Gửi Mua Bán & Cho Thuê
          </h2>
          <p className="text-xs text-slate-600">
            Tiếp cận hơn 500.000 khách hàng tiềm năng mỗi tháng. Đăng tin hoàn toàn miễn phí!
          </p>
        </div>

        <form onSubmit={handlePostSubmit} className="bg-white p-6 sm:p-8 border border-slate-300 shadow-md text-left text-xs space-y-3">
          <div>
            <label className="block font-bold mb-1">Họ và tên chủ nhà / môi giới *</label>
            <input
              type="text"
              required
              value={postForm.name}
              onChange={e => setPostForm({ ...postForm, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Số điện thoại liên hệ *</label>
              <input
                type="tel"
                required
                value={postForm.phone}
                onChange={e => setPostForm({ ...postForm, phone: e.target.value })}
                placeholder="0919 006 030"
                className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Tỉnh / Thành phố</label>
              <select
                value={postForm.city}
                onChange={e => setPostForm({ ...postForm, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none font-bold"
              >
                <option className="text-slate-900 bg-white font-medium" value="Hà Nội">Hà Nội</option>
                <option className="text-slate-900 bg-white font-medium" value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option className="text-slate-900 bg-white font-medium" value="Đà Nẵng">Đà Nẵng</option>
                <option className="text-slate-900 bg-white font-medium" value="Nha Trang">Nha Trang</option>
                <option className="text-slate-900 bg-white font-medium" value="Phú Quốc">Phú Quốc</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Tiêu đề bất động sản cần bán / cho thuê *</label>
            <input
              type="text"
              required
              value={postForm.title}
              onChange={e => setPostForm({ ...postForm, title: e.target.value })}
              placeholder="Ví dụ: Bán căn hộ 2PN The Manor Central Park Hoàng Mai..."
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Mức giá mong muốn</label>
            <input
              type="text"
              value={postForm.price}
              onChange={e => setPostForm({ ...postForm, price: e.target.value })}
              placeholder="Ví dụ: 3.5 Tỷ VNĐ hoặc 15 Triệu/tháng"
              className="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#E11D48] hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow cursor-pointer transition"
          >
            Gửi Yêu Cầu Đăng Tin Ký Gửi
          </button>
        </form>

      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#1E40AF] selection:text-white">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#1E40AF] text-white border border-rose-400 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-rose-300" /> {toastMessage}
        </div>
      )}

      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHeroSection()}
            {renderAboutSection()}
            {renderPropertyListSection()}
            {renderHighlightBanner()}
            {renderLocationsSection()}
            {renderNewsSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'about' && (
          <main>
            {renderAboutSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'for-sale' && (
          <main>
            {renderPropertyListSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'for-rent' && (
          <main>
            {renderPropertyListSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'projects' && (
          <main>
            {renderPropertyListSection()}
            {renderHighlightBanner()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'locations' && (
          <main>
            {renderLocationsSection()}
            {renderPropertyListSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'post-property' && (
          <main>
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'news' && (
          <main>
            {renderNewsSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'contact' && (
          <main>
            {renderAboutSection()}
            {renderPostPropertySection()}
          </main>
        )}

        {currentPage === 'property-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('for-sale')} className="text-xs font-bold text-[#1E40AF] hover:underline">
                ‹ Quay lại danh sách bất động sản
              </button>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#1E40AF] uppercase">
                {selectedProperty.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <span className="text-lg font-black text-[#E11D48]">{selectedProperty.price}</span>
                <span className="text-slate-500">📍 {selectedProperty.location}</span>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 uppercase">{selectedProperty.type}</span>
              </div>
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.description}</p>
              <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
                <h4 className="font-bold text-xs uppercase text-[#1E40AF]">Đặc điểm & tiện ích nổi bật:</h4>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedProperty.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">✓ {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'news-detail' && (
          <div className="py-12 bg-white min-h-screen">
            <div className={`${MAX_W} mx-auto px-4 space-y-6`}>
              <button onClick={() => navigate('news')} className="text-xs font-bold text-[#1E40AF] hover:underline">
                ‹ Quay lại trang tin tức
              </button>
              <h1 className="text-2xl font-serif font-black text-[#1E40AF] uppercase">
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
        templateName="BDS-21 (Homeo Realty — Cổng Giao Dịch Bất Động Sản Toàn Diện)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
