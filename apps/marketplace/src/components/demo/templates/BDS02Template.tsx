import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';

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

export interface PropertyItem {
  gallery?: string[];
  images?: string[];
  id: number;
  title: string;
  slug: string;
  category: 'biet-thu' | 'nha-mat-tien' | 'nha-ngo-hem' | 'phong-tro' | 'can-ho';
  type: string;
  price: string;
  priceNum: number; // in billions
  area: string;
  areaNum: number;
  location: string;
  district: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  direction: string;
  legal: string;
  image: string;
  date: string;
  featured?: boolean;
  desc: string;
  author: {
    name: string;
    phone: string;
    zalo: string;
    avatar: string;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
  desc: string;
  content: string[];
  views: number;
  tags: string[];
}

const BDS02_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: 'Bán nhà mặt tiền 3.5 tầng đường Nguyễn Tri Phương, Quận Thanh Khê',
    slug: 'ban-nha-mat-tien-nguyen-tri-phuong-thanh-khe',
    category: 'nha-mat-tien',
    type: 'Nhà mặt tiền',
    price: '7.5 Tỷ VNĐ',
    priceNum: 7.5,
    area: '95 m²',
    areaNum: 95,
    location: 'Đường Nguyễn Tri Phương, Phường Chính Gián, Quận Thanh Khê, Đà Nẵng',
    district: 'Thanh Khê',
    city: 'Đà Nẵng',
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Đông Nam',
    legal: 'Sổ hồng chính chủ, hoàn công đầy đủ',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80'
    ],
    date: '28/08/2026',
    featured: true,
    desc: 'Nhà mặt tiền vị trí đắc địa kinh doanh sầm uất ngay trung tâm Thanh Khê, thiết kế 3.5 tầng hiện đại, vỉa hè 5m rộng rãi, thích hợp mở văn phòng, spa hoặc cho thuê nguyên căn dòng tiền 30 triệu/tháng.',
    author: {
      name: 'Nguyễn Văn Tuấn',
      phone: '0972.939.888',
      zalo: '0972939888',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    }
  },
  {
    id: 2,
    title: 'Biệt thự sân vườn đẳng cấp khu Euro Village 1 ven sông Hàn, Sơn Trà',
    slug: 'biet-thu-san-vuon-euro-village-1-son-tra',
    category: 'biet-thu',
    type: 'Biệt thự',
    price: '28.5 Tỷ VNĐ',
    priceNum: 28.5,
    area: '250 m²',
    areaNum: 250,
    location: 'Khu Đô Thị Euro Village 1, Phường An Hải Tây, Quận Sơn Trà, Đà Nẵng',
    district: 'Sơn Trà',
    city: 'Đà Nẵng',
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Tây Bắc',
    legal: 'Sổ đỏ vĩnh viễn, pháp lý chuẩn',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
    ],
    date: '27/08/2026',
    featured: true,
    desc: 'Biệt thự làng Châu Âu ven sông Hàn đẳng cấp thượng lưu, có hồ bơi riêng, sân vườn tiểu cảnh xanh mát, full nội thất gỗ cao cấp nhập khẩu Ý, an ninh khép kín 24/7.',
    author: {
      name: 'Trần Thị Thu Hà',
      phone: '0905.123.456',
      zalo: '0905123456',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    }
  },
  {
    id: 3,
    title: 'Bán nhà ngõ ô tô tránh đường Phan Chu Trinh, Quận Hải Châu',
    slug: 'ban-nha-ngo-o-to-phan-chu-trinh-hai-chau',
    category: 'nha-ngo-hem',
    type: 'Nhà ngõ, hẻm',
    price: '4.95 Tỷ VNĐ',
    priceNum: 4.95,
    area: '68 m²',
    areaNum: 68,
    location: 'Kiệt Phan Chu Trinh, Phường Phước Ninh, Quận Hải Châu, Đà Nẵng',
    district: 'Hải Châu',
    city: 'Đà Nẵng',
    bedrooms: 3,
    bathrooms: 3,
    direction: 'Chính Nam',
    legal: 'Sổ đỏ trao tay, công chứng ngay',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'
    ],
    date: '26/08/2026',
    featured: true,
    desc: 'Nhà đẹp 3 tầng kiên cố trung tâm Hải Châu, kiệt 5m ô tô thông tứ phía ra đường lớn, dân trí cao, gần trường học các cấp và chợ Hàn chỉ 3 phút đi bộ.',
    author: {
      name: 'Lê Hoàng Long',
      phone: '0935.888.999',
      zalo: '0935888999',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
    }
  },
  {
    id: 4,
    title: 'Tòa nhà căn hộ dịch vụ 5 tầng cho thuê dòng tiền đường Lê Duẩn, Thanh Khê',
    slug: 'toa-nha-can-ho-dich-vu-le-duan-thanh-khe',
    category: 'phong-tro',
    type: 'Phòng trọ / Căn hộ dịch vụ',
    price: '9.2 Tỷ VNĐ',
    priceNum: 9.2,
    area: '110 m²',
    areaNum: 110,
    location: 'Đường Lê Duẩn, Phường Tân Chính, Quận Thanh Khê, Đà Nẵng',
    district: 'Thanh Khê',
    city: 'Đà Nẵng',
    bedrooms: 10,
    bathrooms: 10,
    direction: 'Đông Bắc',
    legal: 'Sổ hồng hoàn công tòa nhà 5 tầng',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'
    ],
    date: '25/08/2026',
    featured: false,
    desc: 'Tòa nhà căn hộ gồm 10 phòng studio full nội thất đang cho khách nước ngoài và nhân viên văn phòng thuê kín 100%, doanh thu đều đặn 45 triệu/tháng.',
    author: {
      name: 'Nguyễn Văn Tuấn',
      phone: '0972.939.888',
      zalo: '0972939888',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    }
  },
  {
    id: 5,
    title: 'Bán nhà mặt tiền đường Võ Văn Kiệt view biển Mỹ Khê, Quận Sơn Trà',
    slug: 'ban-nha-mat-tien-vo-van-kiet-my-khe-son-tra',
    category: 'nha-mat-tien',
    type: 'Nhà mặt tiền',
    price: '22.0 Tỷ VNĐ',
    priceNum: 22.0,
    area: '125 m²',
    areaNum: 125,
    location: 'Đại lộ Võ Văn Kiệt, Phường Phước Mỹ, Quận Sơn Trà, Đà Nẵng',
    district: 'Sơn Trà',
    city: 'Đà Nẵng',
    bedrooms: 6,
    bathrooms: 6,
    direction: 'Chính Đông',
    legal: 'Sổ đỏ chính chủ lâu dài',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    date: '24/08/2026',
    featured: true,
    desc: 'Trục đường du lịch tỷ đô sầm uất bậc nhất Đà Nẵng, cách bãi biển Mỹ Khê chỉ 200m. Thích hợp kinh doanh khách sạn mini, nhà hàng hải sản hoặc showroom.',
    author: {
      name: 'Trần Thị Thu Hà',
      phone: '0905.123.456',
      zalo: '0905123456',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    }
  },
  {
    id: 6,
    title: 'Biệt thự song lập phong cách Tân Cổ Điển KĐT Nam Hòa Xuân, Ngũ Hành Sơn',
    slug: 'biet-thu-song-lap-nam-hoa-xuan-ngu-hanh-son',
    category: 'biet-thu',
    type: 'Biệt thự',
    price: '14.8 Tỷ VNĐ',
    priceNum: 14.8,
    area: '180 m²',
    areaNum: 180,
    location: 'KĐT Sinh Thái Nam Hòa Xuân, Phường Hòa Quý, Quận Ngũ Hành Sơn, Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    city: 'Đà Nẵng',
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông Nam',
    legal: 'Sổ hồng sở hữu lâu dài',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    date: '23/08/2026',
    featured: false,
    desc: 'Biệt thự 3 tầng xây thô hoàn thiện mặt ngoài, view công viên hồ sinh thái, hạ tầng đồng bộ, kết nối thẳng về trung tâm thành phố qua cầu Minh Mạng.',
    author: {
      name: 'Lê Hoàng Long',
      phone: '0935.888.999',
      zalo: '0935888999',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
    }
  }
];

const BDS02_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Địa ốc Đà Nẵng trong những năm gần đây: Khởi sắc phân khúc nhà phố & căn hộ',
    slug: 'dia-oc-da-nang-trong-nhung-nam-gan-day',
    date: '28/08/2026',
    author: 'PlatformBDS Market Analyst',
    category: 'Thị trường BĐS',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    desc: 'Tại các dự án nhà ở thương mại và đất nền pháp lý chuẩn tại Đà Nẵng, lượng giao dịch đang tăng trưởng ấn tượng nhờ chính sách kích cầu hạ tầng...',
    content: [
      'Thị trường bất động sản Đà Nẵng ghi nhận những tín hiệu phục hồi mạnh mẽ từ đầu năm 2026, đặc biệt là các sản phẩm nhà phố mặt tiền và đất nền có sổ đỏ trao tay.',
      'Sự hoàn thiện của các cây cầu mới bắc qua sông Hàn và việc mở rộng sân bay quốc tế Đà Nẵng đang tạo động lực lớn thu hút dòng vốn đầu tư từ cả miền Bắc và miền Nam.',
      'Các chuyên gia khuyến nghị nhà đầu tư nên tập trung vào các bất động sản trung tâm có khả năng tạo ra dòng tiền khai thác ngay như cho thuê căn hộ dịch vụ hoặc kinh doanh du lịch.'
    ],
    views: 3240,
    tags: ['Đà Nẵng', 'Nhà phố', 'Thị trường BĐS', 'Đầu tư']
  },
  {
    id: 2,
    title: 'Cam kết thuê lại Bất động sản: Giải pháp dòng tiền an toàn hay chiêu bài bán hàng?',
    slug: 'cam-ket-thue-lai-bds-giai-phap-dong-tien',
    date: '26/08/2026',
    author: 'Chuyên gia Tài Chính BĐS',
    category: 'Cẩm nang đầu tư',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    desc: 'Chính sách cam kết lợi nhuận thuê lại từ 8-12%/năm giúp nhà đầu tư yên tâm về bài toán dòng tiền, tuy nhiên cần đọc kỹ điều khoản hợp đồng...',
    content: [
      'Chương trình cam kết thuê lại (Rental Guarantee) là mô hình quen thuộc ở phân khúc shophouse và biệt thự nghỉ dưỡng.',
      'Để đảm bảo tính khả thi, người mua cần thẩm định năng lực vận hành thực tế của đơn vị quản lý, tỷ lệ lấp đầy phòng trung bình và các chi phí khấu hao bảo trì tài sản.',
      'Lựa chọn các chủ đầu tư uy tín có quỹ dự phòng tài chính minh bạch sẽ giúp hạn chế rủi ro đứt gãy dòng tiền trong giai đoạn đầu vận hành.'
    ],
    views: 2890,
    tags: ['Cam kết thuê lại', 'Dòng tiền', 'Cẩm nang', 'Tài chính']
  },
  {
    id: 3,
    title: 'Hoạt động đầu tư và nâng cấp hạ tầng giao thông trọng điểm thúc đẩy giá đất ven biển',
    slug: 'hoat-dong-dau-tu-ha-tang-giao-thong-thuc-day-gia-dat',
    date: '24/08/2026',
    author: 'Ban Biên Tập BDS',
    category: 'Quy hoạch & Hạ tầng',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80',
    desc: 'Tuyến đường vành đai phía Tây và cao tốc La Sơn - Túy Loan thông xe đã tạo cú hích lớn giúp liên kết các vùng kinh tế trọng điểm miền Trung...',
    content: [
      'Hạ tầng đi trước, giá trị bất động sản gia tăng theo sau luôn là quy luật bất biến của thị trường bất động sản toàn cầu.',
      'Việc Đà Nẵng quy hoạch phát triển thành phố thông minh gắn liền với cảng biển nước sâu Liên Chiểu mở ra cơ hội vàng cho bất động sản logistics và nhà ở chuyên gia.',
      'Khu vực ven sông Cổ Cò nối liền Đà Nẵng và Hội An cũng đang hình thành chuỗi đô thị sinh thái cao cấp với tiềm năng tăng giá bền vững.'
    ],
    views: 4120,
    tags: ['Hạ tầng', 'Quy hoạch', 'Cao tốc', 'BĐS ven biển']
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
  if (clean === 'ky-gui') return { page: 'ky-gui', propSlug: '', artSlug: '' };
  if (['biet-thu', 'nha-mat-tien', 'nha-ngo-hem', 'phong-tro', 'can-ho'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS02Template({ template, viewport = 'desktop', initialPage = 'home', company, theme, projects, posts, pageContent }: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const activeProperties = useMemo<PropertyItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): PropertyItem => ({
        id: p.id || (1000 + idx),
        title: p.title || p.name || 'Bất động sản cao cấp',
        slug: p.slug || `bds-${idx + 1}`,
        category: p.category || p.type || 'nha-mat-tien',
        type: p.type || p.category || 'Nhà mặt tiền',
        price: p.price || (p.priceFrom ? `${p.priceFrom} Tỷ` : 'Liên hệ'),
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 5.0),
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '100 m²'),
        areaNum: typeof p.area === 'number' ? p.area : (parseFloat(p.area) || 100),
        location: p.location || p.address || 'Đà Nẵng & Toàn quốc',
        district: p.district || (p.location?.includes('Thanh Khê') ? 'Thanh Khê' : p.location?.includes('Sơn Trà') ? 'Sơn Trà' : p.location?.includes('Ngũ Hành Sơn') ? 'Ngũ Hành Sơn' : 'Hải Châu'),
        city: p.city || 'Đà Nẵng',
        bedrooms: p.bedrooms || 3,
        bathrooms: p.bathrooms || 2,
        direction: p.direction || 'Đông Nam',
        legal: p.legal || 'Sổ hồng riêng',
        image: p.image || p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        date: p.date || 'Hôm nay',
        featured: Boolean(p.featured || idx < 3),
        desc: p.description || p.desc || 'Vị trí đắc địa, giao thông thuận lợi, tiềm năng sinh lời cao.',
        author: {
          name: company?.name || 'Chuyên Viên Tư Vấn',
          phone: company?.phone || '0919 006 030',
          zalo: (company as any)?.zalo || company?.phone || '0919 006 030',
          avatar: company?.logo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        }
      }));
      const customSlugs = new Set(customProps.map(cp => cp.slug));
      const remainingDefaults = BDS02_PROPERTIES.filter(dp => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS02_PROPERTIES;
  }, [projects, company]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || (1000 + idx),
        title: p.title || 'Tin tức thị trường bất động sản',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Thị trường BĐS',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        desc: p.summary || p.excerpt || 'Cập nhật tin tức thị trường BĐS mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
        tags: ['Bất động sản', 'Thị trường', 'Đầu tư']
      }));
      const customSlugs = new Set(customNews.map(cn => cn.slug));
      const remainingDefaults = BDS02_NEWS.filter(dn => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS02_NEWS;
  }, [posts, company]);

  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProperties.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return (activeProperties[0] || BDS02_PROPERTIES[0]);
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return (activeNews[0] || BDS02_NEWS[0]);
  });

  // Filter States
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [filterPropType, setFilterPropType] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // Mortgage Calculator
  const [loanPercent, setLoanPercent] = useState<number>(70);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.0);

  // Form states
  const [feedbackForm, setFeedbackForm] = useState({ name: '', phone: '', address: '', subject: '', content: '' });
  const [consignmentForm, setConsignmentForm] = useState({ name: '', phone: '', propType: 'Nhà mặt tiền', address: '', price: '', note: '' });

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeProperties.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS02_NEWS.find(a => a.slug === res.artSlug);
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
    else if (page === 'ky-gui') urlSlug = 'ky-gui';
    else urlSlug = page;

    const tSlug = template?.slug || 'bds-02';
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

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.phone || !feedbackForm.name) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    alert(`🎉 Cảm ơn quý khách ${feedbackForm.name}!\nThông tin góp ý / liên hệ của quý khách đã được gửi tới ban quản trị. Chúng tôi sẽ phản hồi trong 15 phút!`);
    setFeedbackForm({ name: '', phone: '', address: '', subject: '', content: '' });
  };

  const handleConsignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consignmentForm.phone || !consignmentForm.name) {
      alert('Vui lòng nhập đầy đủ họ tên và số điện thoại ký gửi!');
      return;
    }
    alert(`🎉 Tiếp nhận yêu cầu ký gửi thành công!\nChuyên viên thẩm định của chúng tôi sẽ liên hệ với quý khách ${consignmentForm.name} (${consignmentForm.phone}) để khảo sát và niêm yết nhà đất.`);
    setConsignmentForm({ name: '', phone: '', propType: 'Nhà mặt tiền', address: '', price: '', note: '' });
  };

  // Filtered Properties
  const filteredList = useMemo(() => {
    return activeProperties.filter(item => {
      if (currentPage !== 'home' && ['biet-thu', 'nha-mat-tien', 'nha-ngo-hem', 'phong-tro', 'can-ho'].includes(currentPage)) {
        if (item.category !== currentPage) return false;
      }
      if (filterPropType !== 'all' && item.category !== filterPropType) return false;
      if (filterDistrict !== 'all' && item.district !== filterDistrict) return false;
      if (searchLocation) {
        const q = searchLocation.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc) return false;
      }
      if (filterPrice !== 'all') {
        if (filterPrice === 'under-3' && item.priceNum >= 3) return false;
        if (filterPrice === '3-10' && (item.priceNum < 3 || item.priceNum > 10)) return false;
        if (filterPrice === 'above-10' && item.priceNum <= 10) return false;
      }
      if (filterArea !== 'all') {
        if (filterArea === 'under-50' && item.areaNum >= 50) return false;
        if (filterArea === '50-100' && (item.areaNum < 50 || item.areaNum > 100)) return false;
        if (filterArea === 'above-100' && item.areaNum <= 100) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      if (sortBy === 'area-desc') return b.areaNum - a.areaNum;
      return 0;
    });
  }, [currentPage, filterPropType, filterDistrict, searchLocation, filterPrice, filterArea, sortBy]);

  // Mortgage calculations
  const mortgageCalc = useMemo(() => {
    const propertyPrice = (selectedProperty?.priceNum || 7.5) * 1_000_000_000;
    const loanAmount = propertyPrice * (loanPercent / 100);
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanYears * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    return {
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [selectedProperty, loanPercent, loanYears, interestRate]);

  const activeHotline = company?.phone || '0919 006 030';
  const hotlineTel = activeHotline.replace(/[^0-9]/g, '') || '0919006030';
  const activeEmail = company?.email || 'ntrungz0704@gmail.com';
  const socialLinks = {
    facebook: company?.social?.facebook || 'https://www.facebook.com/groups/847532091275214',
    instagram: company?.social?.instagram || 'https://instagram.com',
    twitter: company?.social?.twitter || 'https://twitter.com',
    youtube: company?.social?.youtube || 'https://www.youtube.com/@tungchuofficial',
  };

  const PAGE_NAMES_VN: Record<string, string> = {
    'home': 'Trang Chủ',
    'biet-thu': 'Biệt Thự Đẳng Cấp',
    'nha-mat-tien': 'Nhà Mặt Tiền Kinh Doanh',
    'nha-ngo-hem': 'Nhà Ngõ, Hẻm Ô Tô',
    'phong-tro': 'Phòng Trọ & Căn Hộ Dịch Vụ',
    'can-ho': 'Căn Hộ Cao Cấp',
    'news': 'Tin Tức & Cẩm Nang Bất Động Sản',
    'news-detail': 'Chi Tiết Bài Viết',
    'property-detail': 'Chi Tiết Bất Động Sản',
    'ky-gui': 'Ký Gửi Nhà Đất',
    'about': 'Giới Thiệu Doanh Nghiệp',
    'contact': 'Liên Hệ & Góp Ý',
  };

  // ── HEADER COMPONENT ──
  const renderHeader = () => (
    <header className="w-full bg-white text-slate-800 sticky top-0 z-40 shadow-sm border-b border-slate-200">
      {/* Top Banner Row */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex flex-col md:flex-row justify-between items-center gap-3`}>
        {/* Left: Brand Logo */}
        <div onClick={() => navigate('home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-full">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition shrink-0">
            MR
          </div>
          <div className="min-w-0 truncate">
            <div className="text-lg sm:text-xl font-black tracking-tight text-[#0369a1] flex items-center gap-1 group-hover:text-cyan-600 transition truncate">
              {company?.name || 'METRO REALTY'}
            </div>
            <div className="text-[9px] sm:text-[10px] text-cyan-700 font-bold uppercase tracking-wider truncate">
              {company?.slogan || 'Sàn Giao Dịch BĐS Đô Thị & Căn Hộ Hiện Đại'}
            </div>
          </div>
        </div>

        {/* Right: Contact strip & Ad Banner */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-600">
            <a href={`tel:${hotlineTel}`} className="flex items-center gap-1.5 font-bold text-red-600 hover:underline">
              <Phone size={14} className="text-red-600 shrink-0" /> {activeHotline}
            </a>
            <a href={`mailto:${activeEmail}`} className="hidden sm:flex items-center gap-1.5 hover:text-blue-700">
              <Mail size={14} className="text-amber-500 shrink-0" /> {activeEmail}
            </a>
          </div>

          <button
            onClick={() => navigate('ky-gui')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <UploadCloud size={13} /> Ký Gửi Nhà Đất
          </button>
        </div>
      </div>

      {/* Main Nav Bar (Dynamic Primary & Accent Colors) */}
      <div className="w-full text-white" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
        <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-1.5 lg:py-0 flex items-center justify-between`}>
          <nav className="hidden lg:flex items-center text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            {[
              { id: 'home', label: 'TRANG CHỦ' },
              { id: 'biet-thu', label: 'BIỆT THỰ' },
              { id: 'nha-mat-tien', label: 'NHÀ MẶT TIỀN' },
              { id: 'nha-ngo-hem', label: 'NHÀ NGÕ, HẺM' },
              { id: 'phong-tro', label: 'PHÒNG TRỌ' },
              { id: 'news', label: 'TIN TỨC' },
              { id: 'contact', label: 'LIÊN HỆ' },
            ].map(navItem => {
              const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
              return (
                <button
                  key={navItem.id}
                  onClick={() => navigate(navItem.id)}
                  style={isActive ? { backgroundColor: accentColor || '#D8232A' } : undefined}
                  className={`whitespace-nowrap px-4 py-3.5 transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-black shadow-inner'
                      : 'text-white/90 hover:bg-black/20 hover:text-white'
                  }`}
                >
                  {navItem.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Search inside Nav */}
          <div className="hidden md:flex items-center relative py-1.5">
            <input
              type="text"
              placeholder="Nhập từ khóa cần tìm..."
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') navigate('nha-mat-tien'); }}
              className="bg-black/25 text-white placeholder-white/70 text-xs px-3.5 py-1.5 rounded-l-md border border-white/20 focus:outline-none focus:bg-black/40 w-48 lg:w-56"
            />
            <button
              onClick={() => navigate('nha-mat-tien')}
              style={{ backgroundColor: accentColor || '#D8232A' }}
              className="hover:brightness-110 text-white px-3 py-1.5 rounded-r-md transition cursor-pointer flex items-center justify-center"
            >
              <Search size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-white hover:bg-black/20 rounded-md cursor-pointer ml-auto shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-1 text-xs font-bold uppercase text-white shadow-xl" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
          {[
            { id: 'home', label: 'TRANG CHỦ' },
            { id: 'biet-thu', label: 'BIỆT THỰ' },
            { id: 'nha-mat-tien', label: 'NHÀ MẶT TIỀN' },
            { id: 'nha-ngo-hem', label: 'NHÀ NGÕ, HẺM' },
            { id: 'phong-tro', label: 'PHÒNG TRỌ' },
            { id: 'news', label: 'TIN TỨC' },
            { id: 'contact', label: 'LIÊN HỆ' },
          ].map(navItem => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                style={isActive ? { backgroundColor: accentColor || '#D8232A' } : undefined}
                className={`block w-full text-left py-2 px-3 rounded cursor-pointer ${
                  isActive ? 'font-black' : 'hover:bg-black/20'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
          <button
            onClick={() => navigate('ky-gui')}
            className="block w-full text-left py-2 px-3 bg-red-600 text-white rounded font-black cursor-pointer mt-2"
          >
            KÝ GỬI NHÀ ĐẤT
          </button>
        </div>
      )}
    </header>
  );

  // ── HERO SEARCH BANNER COMPONENT ──
  const renderHeroSearchBanner = () => (
    <div
      className="relative py-10 px-4 bg-cover bg-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(10, 30, 60, 0.8), rgba(13, 63, 141, 0.85)), url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80)'
      }}
    >
      <div className={`${MAX_W} mx-auto max-w-4xl text-center space-y-4`}>
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-widest border border-cyan-400/30 mb-1">
            DÒNG A #02 — CĂN HỘ & BĐS ĐÔ THỊ HIỆN ĐẠI
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            TÌM KIẾM BẤT ĐỘNG SẢN ĐÔ THỊ
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100/80 font-medium">Hơn 25.000 căn hộ cao cấp, duplex, penthouse và nhà phố đô thị thông minh.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-sm border border-white/20 shadow-2xl space-y-2.5">
          {/* Row 1: Keyword */}
          <input
            type="text"
            placeholder="Nhập địa điểm cần tìm (Quận, tên đường, dự án)..."
            value={searchLocation}
            onChange={e => setSearchLocation(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') navigate('nha-mat-tien'); }}
            className="w-full bg-white text-slate-800 text-xs px-4 py-2.5 rounded-lg font-medium focus:outline-none shadow-xs"
          />

          {/* Row 2: Selectors + Submit Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <select
              value={filterPropType}
              onChange={e => setFilterPropType(e.target.value)}
              className="bg-white text-slate-800 px-3 py-2 rounded-lg font-bold focus:outline-none cursor-pointer"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Loại bất động sản</option>
              <option className="text-slate-900 bg-white font-medium" value="biet-thu">Biệt thự</option>
              <option className="text-slate-900 bg-white font-medium" value="nha-mat-tien">Nhà mặt tiền</option>
              <option className="text-slate-900 bg-white font-medium" value="nha-ngo-hem">Nhà ngõ, hẻm</option>
              <option className="text-slate-900 bg-white font-medium" value="phong-tro">Phòng trọ</option>
            </select>

            <select
              value={filterDistrict}
              onChange={e => setFilterDistrict(e.target.value)}
              className="bg-white text-slate-800 px-3 py-2 rounded-lg font-bold focus:outline-none cursor-pointer"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Quận/ huyện</option>
              <option className="text-slate-900 bg-white font-medium" value="Thanh Khê">Quận Thanh Khê</option>
              <option className="text-slate-900 bg-white font-medium" value="Hải Châu">Quận Hải Châu</option>
              <option className="text-slate-900 bg-white font-medium" value="Sơn Trà">Quận Sơn Trà</option>
              <option className="text-slate-900 bg-white font-medium" value="Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
            </select>

            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="bg-white text-slate-800 px-3 py-2 rounded-lg font-bold focus:outline-none cursor-pointer"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Diện tích</option>
              <option className="text-slate-900 bg-white font-medium" value="under-50">Dưới 50 m²</option>
              <option className="text-slate-900 bg-white font-medium" value="50-100">50 - 100 m²</option>
              <option className="text-slate-900 bg-white font-medium" value="above-100">Trên 100 m²</option>
            </select>

            <select
              value={filterPrice}
              onChange={e => setFilterPrice(e.target.value)}
              className="bg-white text-slate-800 px-3 py-2 rounded-lg font-bold focus:outline-none cursor-pointer"
            >
              <option className="text-slate-900 bg-white font-medium" value="all">Khoảng giá</option>
              <option className="text-slate-900 bg-white font-medium" value="under-3">Dưới 3 Tỷ</option>
              <option className="text-slate-900 bg-white font-medium" value="3-10">Từ 3 - 10 Tỷ</option>
              <option className="text-slate-900 bg-white font-medium" value="above-10">Trên 10 Tỷ</option>
            </select>

            <button
              onClick={() => navigate('nha-mat-tien')}
              className="bg-[#D8232A] hover:bg-red-700 text-white font-black px-4 py-2 rounded-lg transition shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Search size={14} /> Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── RIGHT SIDEBAR COMPONENT ──
  const renderRightSidebar = () => (
    <aside className="space-y-6">
      {/* Box 1: Quick Search Widget */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-2.5 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
          <Search size={14} /> Tìm kiếm bất động sản
        </div>
        <div className="p-3.5 space-y-2 text-xs bg-slate-50 border-t border-slate-100">
          <input
            type="text"
            placeholder="Nhập địa điểm cần tìm..."
            value={searchLocation}
            onChange={e => setSearchLocation(e.target.value)}
            className="w-full bg-white border border-red-500 rounded-md px-3 py-2 text-xs focus:outline-none"
          />
          <select
            value={filterPropType}
            onChange={e => setFilterPropType(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold cursor-pointer"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Loại bất động sản</option>
            <option className="text-slate-900 bg-white font-medium" value="biet-thu">Biệt thự</option>
            <option className="text-slate-900 bg-white font-medium" value="nha-mat-tien">Nhà mặt tiền</option>
            <option className="text-slate-900 bg-white font-medium" value="nha-ngo-hem">Nhà ngõ, hẻm</option>
            <option className="text-slate-900 bg-white font-medium" value="phong-tro">Phòng trọ</option>
          </select>
          <select
            value={filterDistrict}
            onChange={e => setFilterDistrict(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold cursor-pointer"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Quận/ huyện</option>
            <option className="text-slate-900 bg-white font-medium" value="Thanh Khê">Quận Thanh Khê</option>
            <option className="text-slate-900 bg-white font-medium" value="Hải Châu">Quận Hải Châu</option>
            <option className="text-slate-900 bg-white font-medium" value="Sơn Trà">Quận Sơn Trà</option>
            <option className="text-slate-900 bg-white font-medium" value="Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
          </select>
          <select
            value={filterArea}
            onChange={e => setFilterArea(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold cursor-pointer"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Diện tích</option>
            <option className="text-slate-900 bg-white font-medium" value="under-50">Dưới 50 m²</option>
            <option className="text-slate-900 bg-white font-medium" value="50-100">50 - 100 m²</option>
            <option className="text-slate-900 bg-white font-medium" value="above-100">Trên 100 m²</option>
          </select>
          <select
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold cursor-pointer"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Khoảng giá</option>
            <option className="text-slate-900 bg-white font-medium" value="under-3">Dưới 3 Tỷ</option>
            <option className="text-slate-900 bg-white font-medium" value="3-10">Từ 3 - 10 Tỷ</option>
            <option className="text-slate-900 bg-white font-medium" value="above-10">Trên 10 Tỷ</option>
          </select>
          <button
            onClick={() => navigate('nha-mat-tien')}
            className="w-full text-white font-black py-2 rounded-md transition cursor-pointer hover:brightness-110"
            style={{ backgroundColor: primaryColor || '#0D3F8D' }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Box 2: VIP Ad Banner */}
      <div className="rounded-sm overflow-hidden shadow-md relative group cursor-pointer" onClick={() => navigate('biet-thu')}>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
          alt="Biệt thự biển VIP"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col justify-end text-white text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-sm w-fit mx-auto mb-1">
            VINPEARL RESORT
          </span>
          <h4 className="text-sm font-black uppercase">ĐẦU TƯ BIỆT THỰ BIỂN</h4>
          <p className="text-[11px] text-amber-300 font-bold">Cam kết sinh lời 10%/năm</p>
          <span className="mt-2 text-[10px] font-bold bg-red-600 text-white py-1 px-3 rounded w-fit mx-auto">XEM NGAY ›</span>
        </div>
      </div>

      {/* Box 3: Bất Động Sản Bán Theo Quận */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-2 text-white font-black text-xs uppercase tracking-wider" style={{ backgroundColor: accentColor || '#D8232A' }}>
          BẤT ĐỘNG SẢN BÁN THEO QUẬN
        </div>
        <div className="p-3 space-y-1.5 text-xs font-bold text-slate-700">
          {[
            { label: 'Bán nhà Quận Hải Châu', district: 'Hải Châu' },
            { label: 'Bán nhà Quận Thanh Khê', district: 'Thanh Khê' },
            { label: 'Bán nhà Quận Sơn Trà', district: 'Sơn Trà' },
            { label: 'Bán nhà Quận Ngũ Hành Sơn', district: 'Ngũ Hành Sơn' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setFilterDistrict(item.district);
                navigate('nha-mat-tien');
              }}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-red-50 hover:text-red-600 rounded transition cursor-pointer"
            >
              <span>› {item.label}</span>
              <span className="text-[10px] text-slate-400">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Box 4: Bất Động Sản Cho Thuê */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-2 text-white font-black text-xs uppercase tracking-wider" style={{ backgroundColor: accentColor || '#D8232A' }}>
          BẤT ĐỘNG SẢN CHO THUÊ
        </div>
        <div className="p-3 space-y-1.5 text-xs font-bold text-slate-700">
          {[
            { label: 'Cho thuê căn hộ dịch vụ', cat: 'phong-tro' },
            { label: 'Cho thuê nhà mặt tiền', cat: 'nha-mat-tien' },
            { label: 'Cho thuê phòng trọ giá rẻ', cat: 'phong-tro' },
            { label: 'Cho thuê biệt thự nghỉ dưỡng', cat: 'biet-thu' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setFilterPropType(item.cat);
                navigate(item.cat);
              }}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-red-50 hover:text-red-600 rounded transition cursor-pointer"
            >
              <span>› {item.label}</span>
              <span className="text-[10px] text-slate-400">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Box 5: Bất Động Sản Theo Khoảng Giá */}
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-2 text-white font-black text-xs uppercase tracking-wider" style={{ backgroundColor: accentColor || '#D8232A' }}>
          BẤT ĐỘNG SẢN THEO KHOẢNG GIÁ
        </div>
        <div className="p-3 space-y-1.5 text-xs font-bold text-slate-700">
          {[
            { label: 'Nhà đất dưới 3 Tỷ', price: 'under-3' },
            { label: 'Nhà đất từ 3 - 10 Tỷ', price: '3-10' },
            { label: 'Nhà đất trên 10 Tỷ', price: 'above-10' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setFilterPrice(item.price);
                navigate('nha-mat-tien');
              }}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-red-50 hover:text-red-600 rounded transition cursor-pointer"
            >
              <span>› {item.label}</span>
              <span className="text-[10px] text-slate-400">›</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );

  // ── DENSE HORIZONTAL LISTING CARD (NOVIHOME STYLE) ──
  const renderDenseListingRow = (item: PropertyItem) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-sm border border-slate-200 hover:border-red-500 p-3 flex flex-col sm:flex-row gap-3.5 shadow-xs hover:shadow-md transition cursor-pointer group"
    >
      <div className="w-full sm:w-44 h-36 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
        <img
          src={item.image}
          alt={item.title}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-red-600 text-white font-bold text-[10px] rounded">
          {item.type}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition leading-snug line-clamp-2">
            🔥 {item.title}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {item.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] bg-slate-50 p-2 rounded-md border border-slate-100 font-medium">
          <div>Giá: <strong className="text-red-600">{item.price}</strong></div>
          <div>Diện tích: <strong>{item.area}</strong></div>
          <div>Hướng: <strong>{item.direction}</strong></div>
          <div>Phòng ngủ: <strong>{item.bedrooms} PN</strong></div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-1 truncate">
            <MapPin size={11} className="text-red-500 shrink-0" /> <span className="truncate">{item.location}</span>
          </div>
          <span className="text-red-600 font-bold shrink-0">Chi tiết ›</span>
        </div>
      </div>
    </div>
  );

  // ── HOMEPAGE RENDERER ──
  const renderHomePage = () => {
    const rawFeatured = activeProperties.filter(p => p.featured);
    const featuredItems = rawFeatured.length > 0 ? rawFeatured.slice(0, 6) : BDS02_PROPERTIES.filter(p => p.featured);

    const rawThanhKhe = activeProperties.filter(p => (p.district && p.district.includes('Thanh Khê')) || (p.location && p.location.includes('Thanh Khê')));
    const thanhKheItems = rawThanhKhe.length > 0 ? rawThanhKhe : BDS02_PROPERTIES.filter(p => p.district === 'Thanh Khê');

    const rawSonTra = activeProperties.filter(p => (p.district && p.district.includes('Sơn Trà')) || (p.location && p.location.includes('Sơn Trà')));
    const sonTraItems = rawSonTra.length > 0 ? rawSonTra : BDS02_PROPERTIES.filter(p => p.district === 'Sơn Trà');

    return (
      <div className="bg-[#F8FAFC] space-y-8 pb-12">
        {renderHeroSearchBanner()}

        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Content (70%) */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. BẤT ĐỘNG SẢN NỔI BẬT */}
              <section className="space-y-4">
                <div className="px-4 py-2.5 rounded-t-lg text-white font-black text-xs uppercase tracking-wider flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                  <span>BẤT ĐỘNG SẢN NỔI BẬT</span>
                  <span className="text-[10px] text-white/80 font-medium">Cập nhật liên tục</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {featuredItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenProperty(item)}
                      className="bg-white rounded-sm border border-slate-200 hover:border-red-500 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="h-36 relative overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-black/70 text-white font-bold text-[10px] rounded">
                          {item.type}
                        </span>
                      </div>
                      <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="font-black text-xs text-red-600">{item.price}</span>
                          <span className="text-[10px] text-slate-400">{item.area}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. TIN BẤT ĐỘNG SẢN QUẬN THANH KHÊ */}
              <section className="space-y-4">
                <div className="px-4 py-2.5 rounded-t-lg text-white font-black text-xs uppercase tracking-wider flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                  <span>TIN BẤT ĐỘNG SẢN QUẬN THANH KHÊ</span>
                  <button onClick={() => navigate('nha-mat-tien')} className="text-[11px] text-white/80 hover:text-white font-bold">
                    Xem tất cả ›
                  </button>
                </div>
                <div className="space-y-3">
                  {thanhKheItems.map(renderDenseListingRow)}
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => { setFilterDistrict('Thanh Khê'); navigate('nha-mat-tien'); }}
                    className="px-5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-sm font-bold text-xs transition cursor-pointer"
                  >
                    Xem thêm nhà đất Thanh Khê ›
                  </button>
                </div>
              </section>

              {/* 3. TIN BẤT ĐỘNG SẢN QUẬN SƠN TRÀ */}
              <section className="space-y-4">
                <div className="px-4 py-2.5 rounded-t-lg text-white font-black text-xs uppercase tracking-wider flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                  <span>TIN BẤT ĐỘNG SẢN QUẬN SƠN TRÀ</span>
                  <button onClick={() => navigate('biet-thu')} className="text-[11px] text-white/80 hover:text-white font-bold">
                    Xem tất cả ›
                  </button>
                </div>
                <div className="space-y-3">
                  {sonTraItems.map(renderDenseListingRow)}
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => { setFilterDistrict('Sơn Trà'); navigate('biet-thu'); }}
                    className="px-5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-sm font-bold text-xs transition cursor-pointer"
                  >
                    Xem thêm nhà đất Sơn Trà ›
                  </button>
                </div>
              </section>

              {/* 4. CẨM NANG & TIN TỨC BẤT ĐỘNG SẢN */}
              <section className="space-y-4">
                <div className="px-4 py-2.5 rounded-t-lg text-white font-black text-xs uppercase tracking-wider flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                  <span>CẨM NANG - TIN TỨC</span>
                  <button onClick={() => navigate('news')} className="text-[11px] text-white/80 hover:text-white font-bold">
                    Xem tất cả ›
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeNews.map(art => (
                    <div
                      key={art.id}
                      onClick={() => handleOpenArticle(art)}
                      className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="h-32 overflow-hidden bg-slate-100">
                        <img
                          src={art.image}
                          alt={art.title}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                          {art.title}
                        </h4>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{art.date}</span>
                          <span className="text-red-600 font-bold">&lt;&lt; Xem chi tiết &gt;&gt;</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar (30%) */}
            <div className="lg:col-span-4">
              {renderRightSidebar()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── LISTING CATALOG PAGE (BIỆT THỰ, NHÀ MẶT TIỀN, NHÀ NGÕ HẺM, PHÒNG TRỌ) ──
  const renderListingCatalogPage = () => {
    const currentTitle = PAGE_NAMES_VN[currentPage] || 'Danh Sách Nhà Đất';
    return (
      <div className="bg-[#F8FAFC] py-6 min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
          {/* Breadcrumb */}
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span className="text-red-600 font-extrabold">{currentTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="px-4 py-3 rounded-t-lg text-white font-black text-sm uppercase tracking-wider flex items-center justify-between" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                <span>{currentTitle}</span>
                <span className="text-xs font-normal text-white/80">Hiển thị {filteredList.length} kết quả</span>
              </div>

              {filteredList.length === 0 ? (
                <div className="bg-white p-12 rounded-sm text-center border border-slate-200 shadow-xs">
                  <p className="text-sm font-bold text-slate-600">Không tìm thấy bất động sản nào theo tiêu chí đã chọn.</p>
                  <button
                    onClick={() => { setFilterPropType('all'); setFilterDistrict('all'); setFilterPrice('all'); setSearchLocation(''); }}
                    className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Xem tất cả nhà đất
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredList.map(renderDenseListingRow)}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              {renderRightSidebar()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── NEWS CATALOG PAGE ──
  const renderNewsPage = () => (
    <div className="bg-[#F8FAFC] py-6 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="text-red-600 font-extrabold">Tin Tức & Cẩm Nang</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="px-4 py-3 rounded-t-lg text-white font-black text-sm uppercase tracking-wider" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
              TIN BẤT ĐỘNG SẢN TIN TỨC
            </div>
            <div className="space-y-4">
              {activeNews.map(art => (
                <div
                  key={art.id}
                  onClick={() => handleOpenArticle(art)}
                  className="bg-white rounded-sm border border-slate-200 hover:border-red-500 p-4 flex flex-col sm:flex-row gap-4 shadow-xs hover:shadow-md transition cursor-pointer group"
                >
                  <div className="w-full sm:w-48 h-36 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-red-600 group-hover:text-blue-900 transition leading-snug">
                        {art.title}
                      </h3>
                      <div className="text-[10px] text-slate-400 mt-1">{art.date} • Tác giả: {art.author}</div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {art.desc}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-500 group-hover:text-red-600">&lt;&lt; Xem chi tiết tin đăng &gt;&gt;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            {renderRightSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  // ── NEWS DETAIL PAGE ──
  const renderArticleDetailPage = () => (
    <div className="bg-[#F8FAFC] py-6 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate('news')} className="hover:text-red-600 cursor-pointer">Tin tức</span>
          <span>/</span>
          <span className="text-red-600 font-extrabold truncate">{selectedArticle.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-6">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-3">
              <span>Ngày đăng: {selectedArticle.date}</span>
              <span>•</span>
              <span>Tác giả: {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.views} lượt xem</span>
            </div>

            <div className="rounded-sm overflow-hidden shadow-sm">
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

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-500">Từ khóa:</span>
              {selectedArticle.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            {renderRightSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  // ── PROPERTY DETAIL PAGE ──
  const renderPropertyDetailPage = () => (
    <div className="bg-[#F8FAFC] py-6 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-red-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span onClick={() => navigate(selectedProperty.category)} className="hover:text-red-600 cursor-pointer">{selectedProperty.type}</span>
          <span>/</span>
          <span className="text-red-600 font-extrabold truncate">{selectedProperty.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Price Header */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-3">
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedProperty.title}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin size={14} className="text-red-500 shrink-0" /> {selectedProperty.location}
              </p>
              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3">
                <span className="text-xl sm:text-2xl font-black text-red-600">{selectedProperty.price}</span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span>Diện tích: {selectedProperty.area}</span>
                  <span>•</span>
                  <span>Hướng: {selectedProperty.direction}</span>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-xs space-y-3">
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-2" style={{ color: primaryColor || '#0D3F8D' }}>
                THÔNG SỐ CHI TIẾT BẤT ĐỘNG SẢN
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">Mức giá: <strong className="text-red-600">{selectedProperty.price}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Diện tích: <strong>{selectedProperty.area}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Số phòng ngủ: <strong>{selectedProperty.bedrooms} PN</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Số phòng tắm: <strong>{selectedProperty.bathrooms} WC</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Hướng nhà: <strong>{selectedProperty.direction}</strong></div>
                <div className="p-3 bg-slate-50 rounded-lg">Pháp lý: <strong>{selectedProperty.legal}</strong></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-2" style={{ color: primaryColor || '#0D3F8D' }}>
                MÔ TẢ CHI TIẾT
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.desc}</p>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-black text-sm uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5" style={{ color: primaryColor || '#0D3F8D' }}>
                <Calculator size={16} /> BẢNG TÍNH LÃI SUẤT VAY MUA NHÀ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Tỷ lệ vay (%)</label>
                  <select
                    value={loanPercent}
                    onChange={e => setLoanPercent(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded p-2 font-bold cursor-pointer"
                  >
                    <option className="text-slate-900 bg-white font-medium" value={50}>50% giá trị nhà</option>
                    <option className="text-slate-900 bg-white font-medium" value={70}>70% giá trị nhà</option>
                    <option className="text-slate-900 bg-white font-medium" value={80}>80% giá trị nhà</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Thời gian vay</label>
                  <select
                    value={loanYears}
                    onChange={e => setLoanYears(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded p-2 font-bold cursor-pointer"
                  >
                    <option className="text-slate-900 bg-white font-medium" value={10}>10 năm (120 tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={15}>15 năm (180 tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={20}>20 năm (240 tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={25}>25 năm (300 tháng)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Lãi suất (%/năm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded p-2 font-bold"
                  />
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-sm grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-800">
                <div>Số tiền vay: <strong className="text-slate-900 block font-black">{(mortgageCalc.loanAmount / 1_000_000_000).toFixed(2)} Tỷ</strong></div>
                <div>Gốc + Lãi tháng đầu: <strong className="text-red-600 block font-black">{(mortgageCalc.monthlyPayment / 1_000_000).toFixed(1)} Triệu/tháng</strong></div>
                <div>Tổng lãi phải trả: <strong className="text-slate-900 block font-black">{(mortgageCalc.totalInterest / 1_000_000_000).toFixed(2)} Tỷ</strong></div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-4 py-2 text-white font-black text-xs uppercase" style={{ backgroundColor: primaryColor || '#0D3F8D' }}>
                VỊ TRÍ BẤT ĐỘNG SẢN TRÊN BẢN ĐỒ
              </div>
              <iframe
                title="Bản đồ vị trí BĐS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.918908754117!2d108.20455017585577!3d16.069695639433436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218338e55e0a1%3A0x6b30f5b119cb4974!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Agent Contact Card */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4 text-center">
              <div className="w-20 h-20 rounded-sm overflow-hidden mx-auto border-2 border-red-600 shadow-md">
                <img src={selectedProperty.author.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900">{selectedProperty.author.name}</h4>
                <p className="text-xs text-slate-400">Chuyên viên tư vấn khu vực {selectedProperty.district}</p>
              </div>
              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${selectedProperty.author.phone}`}
                  className="block w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-lg shadow transition cursor-pointer"
                >
                  📞 GỌI {selectedProperty.author.phone}
                </a>
                <a
                  href={`https://zalo.me/${selectedProperty.author.zalo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-lg shadow transition cursor-pointer"
                >
                  💬 CHAT ZALO VỚI CHUYÊN VIÊN
                </a>
              </div>
            </div>

            {renderRightSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  // ── CONTACT & FEEDBACK PAGE (AS SHOWN IN MEDIA SCREENSHOT) ──
  const renderContactPage = () => (
    <div className="bg-[#F8FAFC] space-y-8 pb-12 min-h-screen">
      {renderHeroSearchBanner()}

      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base sm:text-lg font-black leading-snug" style={{ color: primaryColor || '#0D3F8D' }}>
              Thông tin góp ý - phản hồi của bạn sẽ giúp chúng tôi phục vụ bạn ngày càng tốt hơn
            </h2>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-slate-700">Họ tên:</label>
                <input
                  type="text"
                  placeholder="Nhập họ tên..."
                  value={feedbackForm.name}
                  onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  required
                  className="sm:col-span-3 border border-slate-300 rounded-md p-2.5 focus:outline-none focus:border-blue-700 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-slate-700">Số điện thoại:</label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại..."
                  value={feedbackForm.phone}
                  onChange={e => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                  required
                  className="sm:col-span-3 border border-slate-300 rounded-md p-2.5 focus:outline-none focus:border-blue-700 bg-white font-bold text-blue-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-slate-700">Địa chỉ:</label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ..."
                  value={feedbackForm.address}
                  onChange={e => setFeedbackForm({ ...feedbackForm, address: e.target.value })}
                  className="sm:col-span-3 border border-slate-300 rounded-md p-2.5 focus:outline-none focus:border-blue-700 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
                <label className="font-bold text-slate-700">Tiêu đề:</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  value={feedbackForm.subject}
                  onChange={e => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                  className="sm:col-span-3 border border-slate-300 rounded-md p-2.5 focus:outline-none focus:border-blue-700 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
                <label className="font-bold text-slate-700 pt-2">Nội dung:</label>
                <textarea
                  rows={5}
                  placeholder="Nội dung liên hệ / góp ý..."
                  value={feedbackForm.content}
                  onChange={e => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                  required
                  className="sm:col-span-3 border border-slate-300 rounded-md p-2.5 focus:outline-none focus:border-blue-700 bg-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-white font-black text-xs rounded-md transition shadow-md cursor-pointer active:scale-95 hover:brightness-110"
                  style={{ backgroundColor: accentColor || primaryColor || '#0D3F8D' }}
                >
                  GỬI THÔNG TIN
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4">
            {renderRightSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  // ── CONSIGNMENT PAGE (KÝ GỬI NHÀ ĐẤT) ──
  const renderConsignmentPage = () => (
    <div className="bg-[#F8FAFC] py-8 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-6`}>
        <div className="bg-white rounded-sm border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 bg-red-100 text-red-600 font-bold text-xs rounded-sm">
              DỊCH VỤ CHUYÊN NGHIỆP
            </span>
            <h1 className="text-2xl font-black text-slate-900">KÝ GỬI BẤT ĐỘNG SẢN CHÍNH CHỦ</h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hệ thống tiếp cận hơn 50,000 khách mua thực mỗi tháng. Cam kết bảo mật thông tin và thẩm định giá chuẩn xác.
            </p>
          </div>

          <form onSubmit={handleConsignmentSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ & Tên (*)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={consignmentForm.name}
                  onChange={e => setConsignmentForm({ ...consignmentForm, name: e.target.value })}
                  required
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Số điện thoại (*)</label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0972.939.xxx..."
                  value={consignmentForm.phone}
                  onChange={e => setConsignmentForm({ ...consignmentForm, phone: e.target.value })}
                  required
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white font-bold text-blue-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại BĐS Ký Gửi</label>
                <select
                  value={consignmentForm.propType}
                  onChange={e => setConsignmentForm({ ...consignmentForm, propType: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white font-bold"
                >
                  <option className="text-slate-900 bg-white font-medium" value="Nhà mặt tiền">Nhà mặt tiền</option>
                  <option className="text-slate-900 bg-white font-medium" value="Biệt thự">Biệt thự</option>
                  <option className="text-slate-900 bg-white font-medium" value="Nhà ngõ hẻm">Nhà ngõ, hẻm</option>
                  <option className="text-slate-900 bg-white font-medium" value="Phòng trọ">Phòng trọ / Căn hộ dịch vụ</option>
                  <option className="text-slate-900 bg-white font-medium" value="Đất nền">Đất nền dự án</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mức giá kỳ vọng (VNĐ)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 5.5 Tỷ..."
                  value={consignmentForm.price}
                  onChange={e => setConsignmentForm({ ...consignmentForm, price: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Địa chỉ chi tiết bất động sản (*)</label>
              <input
                type="text"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                value={consignmentForm.address}
                onChange={e => setConsignmentForm({ ...consignmentForm, address: e.target.value })}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Ghi chú bổ sung (diện tích, số tầng, tình trạng pháp lý...)</label>
              <textarea
                rows={4}
                placeholder="Mô tả thêm về bất động sản của bạn..."
                value={consignmentForm.note}
                onChange={e => setConsignmentForm({ ...consignmentForm, note: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 hover:brightness-110 text-white font-black text-xs rounded-sm shadow-lg transition cursor-pointer"
              style={{ backgroundColor: accentColor || '#D8232A' }}
            >
              GỬI YÊU CẦU KÝ GỬI NGAY
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // ── ABOUT PAGE ──
  const renderAboutPage = () => (
    <div className="bg-[#F8FAFC] py-8 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-6`}>
        <div className="bg-white rounded-sm border border-slate-200 p-8 shadow-sm space-y-6">
          <h1 className="text-2xl font-black" style={{ color: primaryColor || '#0D3F8D' }}>VỀ CHÚNG TÔI — SÀN GIAO DỊCH BẤT ĐỘNG SẢN</h1>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Chúng tôi tự hào là đơn vị phân phối và môi giới bất động sản uy tín hàng đầu, chuyên cung cấp các giải pháp mua bán, cho thuê nhà mặt tiền, biệt thự nghỉ dưỡng, nhà phố và căn hộ dịch vụ cao cấp.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
            <div className="p-4 bg-slate-50 rounded-sm">
              <div className="text-2xl font-black text-red-600">10+ Năm</div>
              <div className="text-xs text-slate-500 mt-1">Kinh nghiệm thị trường</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-sm">
              <div className="text-2xl font-black" style={{ color: primaryColor || '#0D3F8D' }}>5,000+</div>
              <div className="text-xs text-slate-500 mt-1">Giao dịch thành công</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-sm">
              <div className="text-2xl font-black text-amber-500">100%</div>
              <div className="text-xs text-slate-500 mt-1">Pháp lý minh bạch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-sans antialiased text-slate-800 relative ${isSmall ? 'text-xs' : ''}`}>
      {renderHeader()}
      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHomePage()}
        {['biet-thu', 'nha-mat-tien', 'nha-ngo-hem', 'phong-tro', 'can-ho'].includes(currentPage) && renderListingCatalogPage()}
        {currentPage === 'news' && renderNewsPage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {currentPage === 'news-detail' && renderArticleDetailPage()}
        {currentPage === 'ky-gui' && renderConsignmentPage()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'contact' && renderContactPage()}
        {!['home', 'biet-thu', 'nha-mat-tien', 'nha-ngo-hem', 'phong-tro', 'can-ho', 'news', 'property-detail', 'news-detail', 'ky-gui', 'about', 'contact'].includes(currentPage) && renderHomePage()}
      </main>
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-02 (Novihome Portal Pro)"
        onNavigate={navigate}
        zaloPhone={selectedProperty?.author?.zalo}
        hotlinePhone={company?.phone}
      />
    </div>
  );
}
