'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Building,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  X,
  Share2,
  Heart,
  Eye,
  Clock,
  Home,
  Layers,
  Sparkles,
  Award,
  Users,
  Compass,
  DollarSign,
  TrendingUp,
  HelpCircle,
  Menu,
  Bed,
  Bath,
  Maximize2,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  FileText,
  ShieldCheck,
  Check,
  Tag,
  Building2
} from 'lucide-react';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const MAX_W = 'max-w-7xl';

// ── DATA FOR BDS-01 TEMPLATE ────────────────────────────────────────────────
const SALE_PROPERTIES = [
  {
    id: 1,
    title: 'Biệt thự sân vườn sát sân bay Nội Bài',
    slug: 'biet-thu-san-vuon-sat-san-bay-noi-bai',
    price: '12.500.000.000 đồng',
    priceNum: 12.5,
    location: '275 xã Phú Minh, Sóc Sơn, Hà Nội',
    district: 'Sóc Sơn',
    city: 'Hà Nội',
    bedrooms: '01',
    bathrooms: '01',
    area: 'Trên 100 m²',
    type: 'Biệt thự',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    ],
    desc: 'Biệt thự vườn phong cách nghỉ dưỡng ven hồ, không gian yên tĩnh thoáng mát, sân vườn cây ăn trái, hồ cá Koi và bể bơi riêng biệt.',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Đầy đủ nội thất cao cấp',
  },
  {
    id: 2,
    title: 'Căn hộ Opal Skyview',
    slug: 'can-ho-opal-skyview',
    price: '5.500.000.000 đồng',
    priceNum: 5.5,
    location: 'Phạm Văn Đồng, Quận Bình Thạnh, TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '01',
    bathrooms: '01',
    area: 'Trên 50 m²',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    desc: 'Căn hộ view sông thoáng đãng mặt tiền Phạm Văn Đồng, thuận tiện di chuyển sân bay Tân Sơn Nhất và trung tâm Quận 1 chỉ 10 phút.',
    legal: 'Sổ hồng riêng',
    furniture: 'Nội thất nhập khẩu thông minh',
  },
  {
    id: 3,
    title: 'Căn hộ Star Wish PentHouse',
    slug: 'can-ho-star-wish-penthouse',
    price: '15.450.000.000 đồng',
    priceNum: 15.45,
    location: 'Đường Cổ Linh, Thạch Bàn, Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '01',
    bathrooms: '01',
    area: 'Trên 50 m²',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    desc: 'Căn hộ Penthouse thông tầng đẳng cấp ôm trọn tầm nhìn sân Golf Long Biên và sông Hồng. Sân vườn BBQ rộng rãi trên tầng thượng.',
    legal: 'Sổ đỏ lâu dài',
    furniture: 'Full nội thất hạng sang',
  },
  {
    id: 4,
    title: 'Căn hộ The Art',
    slug: 'can-ho-the-art',
    price: '3.999.000.000 đồng',
    priceNum: 3.99,
    location: 'Số 20, Nguyễn Đình Chiểu, Q.1, TP.HCM',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '01',
    bathrooms: '01',
    area: 'Trên 50 m²',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    desc: 'Căn hộ nghệ thuật trung tâm Quận 1 thiết kế Indochine tinh tế, phù hợp cho chuyên gia nước ngoài và kinh doanh Airbnb sinh lời cao.',
    legal: 'Sổ hồng trao tay',
    furniture: 'Nội thất phong cách Vintage',
  },
  {
    id: 5,
    title: 'Chung cư Lux Luxury Golden Silk Nam Từ Liêm',
    slug: 'chung-cu-lux-luxury-golden-silk-nam-tu-liem',
    price: '6.000.000.000 đồng',
    priceNum: 6.0,
    location: 'Cổ Nhuế 1, Quận Nam Từ Liêm, Hà Nội',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    bedrooms: '03',
    bathrooms: '02',
    area: 'Trên 300 m²',
    type: 'Chung cư',
    category: 'ban',
    discount: '-40%',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    ],
    desc: 'Căn hộ cao cấp Golden Silk thiết kế sang trọng, tầm nhìn panorama công viên xanh, tiện ích đồng bộ hồ bơi bốn mùa và TTTM hiện đại.',
    legal: 'Sổ đỏ sở hữu lâu dài',
    furniture: 'Đầy đủ nội thất nhập khẩu',
  },
  {
    id: 6,
    title: 'Chung cư Platium Luxury Center Park Trần Duy Hưng',
    slug: 'chung-cu-platium-luxury-center-park-tran-duy-hung',
    price: '7.899.000.000 đồng',
    priceNum: 7.899,
    location: 'Trần Duy Hưng, Mỹ Đình, Hà Nội',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    bedrooms: '02',
    bathrooms: '02',
    area: 'Trên 100 m²',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    desc: 'Vị trí kim cương ngã tư Trần Duy Hưng - Hoàng Minh Giám, kết nối trực tiếp Metro và công viên hồ điều hòa Nhân Chính.',
    legal: 'Sổ hồng chính chủ',
    furniture: 'Nội thất Da Bò Ý cao cấp',
  },
  {
    id: 7,
    title: 'Chung cư Vinhomes Green Bay',
    slug: 'chung-cu-vinhomes-green-bay',
    price: '8.900.000.000 đồng',
    priceNum: 8.9,
    location: 'Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '03',
    area: 'Trên 300 m²',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    desc: 'Căn hộ góc 4PN Vinhomes Green Bay view trọn vẹn vịnh xanh 8ha. Môi trường sống xanh lý tưởng bậc nhất phía Tây thủ đô.',
    legal: 'Sổ hồng vĩnh viễn',
    furniture: 'Hoàn thiện cao cấp liền tường',
  },
  {
    id: 8,
    title: 'Chung cư Vinhomes Symphony',
    slug: 'chung-cu-vinhomes-symphony',
    price: '17.999.000.000 đồng',
    priceNum: 17.999,
    location: 'Phúc Lợi, Phúc Đồng, Việt Hưng, Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '03',
    area: 'Trên 100 m²',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    ],
    desc: 'Căn hộ cao cấp Symphony đối diện TTTM Vincom Plaza Long Biên. Tận hưởng toàn bộ tiện ích đại đô thị Vinhomes Riverside.',
    legal: 'Sổ hồng chính chủ',
    furniture: 'Full nội thất nhập khẩu Đức',
  },
];

const RENT_PROPERTIES = [
  {
    id: 101,
    title: 'Cho thuê căn hộ cao cấp Vinhomes Metropolis',
    slug: 'cho-thue-can-ho-vinhomes-metropolis',
    price: '28.000.000 đồng/tháng',
    priceNum: 28,
    location: '29 Liễu Giai, Ba Đình, Hà Nội',
    district: 'Ba Đình',
    city: 'Hà Nội',
    bedrooms: '02',
    bathrooms: '02',
    area: '82 m²',
    type: 'Căn hộ',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    desc: 'Căn hộ tầng trung view trọn hồ Tây, đầy đủ nội thất sang trọng, lễ tân 24/7.',
  },
  {
    id: 102,
    title: 'Cho thuê biệt thự sân vườn Vinhomes Riverside',
    slug: 'cho-thue-biet-thu-vinhomes-riverside',
    price: '65.000.000 đồng/tháng',
    priceNum: 65,
    location: 'Hoa Phượng, Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '05',
    area: '250 m²',
    type: 'Biệt thự',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    desc: 'Biệt thự đơn lập hướng sông có sân vườn rộng và hồ bơi cho chuyên gia.',
  },
  {
    id: 103,
    title: 'Cho thuê căn hộ Masteri Thảo Điền Quận 2',
    slug: 'cho-thue-can-ho-masteri-thao-dien',
    price: '22.000.000 đồng/tháng',
    priceNum: 22,
    location: '159 Xa Lộ Hà Nội, Thảo Điền, TP. Thủ Đức',
    district: 'Quận 2',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '02',
    bathrooms: '02',
    area: '74 m²',
    type: 'Căn hộ',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    desc: 'Căn hộ view sông Sài Gòn và tuyến Metro, kết nối Vincom Mega Mall Thảo Điền.',
  },
  {
    id: 104,
    title: 'Cho thuê nhà phố kinh doanh mặt tiền Trần Duy Hưng',
    slug: 'cho-thue-nha-pho-mat-tien-tran-duy-hung',
    price: '55.000.000 đồng/tháng',
    priceNum: 55,
    location: 'Trần Duy Hưng, Cầu Giấy, Hà Nội',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    bedrooms: '05',
    bathrooms: '04',
    area: '100 m²',
    type: 'Nhà phố',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    desc: 'Nhà phố 5 tầng mặt tiền 6m vỉa hè rộng làm văn phòng, spa hoặc showroom.',
  },
  {
    id: 105,
    title: 'Cho thuê căn hộ Studio Vinhomes Smart City',
    slug: 'cho-thue-studio-vinhomes-smart-city',
    price: '7.500.000 đồng/tháng',
    priceNum: 7.5,
    location: 'Tây Mỗ, Nam Từ Liêm, Hà Nội',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    bedrooms: '01',
    bathrooms: '01',
    area: '32 m²',
    type: 'Căn hộ',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    desc: 'Căn hộ Studio full đồ chỉ việc xách vali vào ở, miễn phí xe bus nội khu.',
  },
  {
    id: 106,
    title: 'Cho thuê văn phòng Bitexco Financial Tower Q.1',
    slug: 'cho-thue-van-phong-bitexco-financial-tower',
    price: '120.000.000 đồng/tháng',
    priceNum: 120,
    location: 'Số 2 Hải Triều, Bến Nghé, Quận 1, TP.HCM',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '00',
    bathrooms: '02',
    area: '180 m²',
    type: 'Văn phòng',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    desc: 'Sàn văn phòng hạng A trung tâm tài chính Quận 1 đã setup bàn ghế cao cấp.',
  },
  {
    id: 107,
    title: 'Cho thuê biệt thự sân golf Ecopark Hưng Yên',
    slug: 'cho-thue-biet-thu-san-golf-ecopark',
    price: '48.000.000 đồng/tháng',
    priceNum: 48,
    location: 'KĐT Ecopark, Văn Giang, Hưng Yên',
    district: 'Văn Giang',
    city: 'Hà Nội',
    bedrooms: '03',
    bathrooms: '04',
    area: '220 m²',
    type: 'Biệt thự',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    desc: 'Biệt thự đảo view hồ thiên nga và sân golf xanh mướt, không khí trong lành.',
  },
  {
    id: 108,
    title: 'Cho thuê Shophouse chân đế Landmark 81',
    slug: 'cho-thue-shophouse-landmark-81',
    price: '85.000.000 đồng/tháng',
    priceNum: 85,
    location: '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM',
    district: 'Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '00',
    bathrooms: '02',
    area: '130 m²',
    type: 'Nhà phố',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    desc: 'Shophouse vị trí vàng dưới chân tháp Landmark 81 cực đông khách qua lại.',
  },
];

const CITIES = [
  { id: 1, name: 'HÀ NỘI', count: '18 dự án', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 2, name: 'ĐÀ NẴNG', count: '15 dự án', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 3, name: 'TP. HỒ CHÍ MINH', count: '32 dự án', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 4, name: 'NGHỆ AN', count: '12 dự án', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 5, name: 'HẢI PHÒNG', count: '10 dự án', image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80', span: 'col-span-1 md:col-span-2' },
];

const NEWS_ARTICLES = [
  {
    id: 1,
    title: '9 đại kỵ trong phong thủy nhà ở và cách hóa giải đơn giản không phải ai cũng biết',
    slug: '9-dai-ky-trong-phong-thuy-nha-o-va-cach-hoa-giai',
    date: '28/08/2026',
    author: 'Chuyên gia Phong Thủy BĐS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    desc: 'Đây đều là những lỗi sai cơ bản trong phong thủy nhà ở mà hầu như gia chủ nào cũng từng mắc phải khiến tài lộc hao hụt...',
    content: 'Phong thủy nhà ở là một trong những yếu tố quan trọng ảnh hưởng trực tiếp đến vượng khí, tài lộc và sức khỏe của các thành viên trong gia đình. Cùng tìm hiểu 9 đại kỵ phong thủy phổ biến nhất hiện nay.',
  },
  {
    id: 2,
    title: 'Những kiêng kỵ chú ý nên tránh khi chọn mua nhà',
    slug: 'nhung-kieng-ky-chu-y-nen-tranh-khi-chon-mua-nha',
    date: '26/08/2026',
    author: 'PlatformBDS News',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    desc: 'Nếu nhà ở cao hơn mặt đường, có những bậc lên xuống, chúng nên thoải mái thay vì dốc đứng hiểm trở...',
    content: 'Khi chọn mua nhà ở, vị trí địa thế và hình dáng khu đất đóng vai trò quyết định đến sự bình an và phát triển lâu dài.',
  },
  {
    id: 3,
    title: 'Căn hộ chung cư và những điều khách hàng quan tâm nhất',
    slug: 'can-ho-chung-cu-va-nhung-dieu-khach-hang-quan-tam-nhat',
    date: '24/08/2026',
    author: 'Ban Nghiên Cứu Thị Trường',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    desc: 'Khi quyết định mua một căn hộ chung cư khách hàng hiện nay còn quan tâm đến phí dịch vụ, pháp lý và chỗ đỗ ô tô...',
    content: 'Pháp lý dự án, tiến độ bàn giao và tiện ích nội khu là 3 tiêu chí hàng đầu khi người mua nhà đưa ra quyết định.',
  },
  {
    id: 4,
    title: 'Những lưu ý quan trọng trong phong thủy khi mua nhà giúp thu hút tài lộc',
    slug: 'nhung-luu-y-quan-trong-trong-phong-thuy-khi-mua-nha',
    date: '22/08/2026',
    author: 'KTS. Nguyễn Thanh Tùng',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    desc: 'Khi đi mua nhà, bạn cần phải tìm hiểu kỹ lai lịch của ngôi nhà, hướng cửa chính và luồng gió tự nhiên...',
    content: 'Hướng nhà hợp tuổi, phòng khách sáng sủa và bếp ấm cúng là bảo chứng cho một tổ ấm hạnh phúc viên mãn.',
  },
];

export default function LuxuryTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme, projects, posts }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const [currentPage, setCurrentPageState] = useState<string>(() => {
    if (!initialPage || initialPage === 'home') return 'home';
    return initialPage;
  });

  const [selectedProperty, setSelectedProperty] = useState<any | null>(SALE_PROPERTIES[0]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(NEWS_ARTICLES[0]);
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProperty = (prop: any) => {
    setSelectedProperty(prop);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: any) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const allPropertyList = useMemo(() => {
    let list = [...SALE_PROPERTIES, ...RENT_PROPERTIES];
    if (projects && projects.length > 0) {
      const dynamicProjects = projects.map(p => ({
        id: p.id,
        title: p.title || p.name,
        slug: p.slug || 'du-an',
        price: p.price || 'Thương lượng',
        priceNum: parseFloat(p.price) || 5,
        location: p.location || p.address || 'Hà Nội',
        bedrooms: p.bedrooms || '02',
        bathrooms: p.bathrooms || '02',
        area: p.area || '100 m²',
        type: p.type || 'Căn hộ',
        category: 'ban',
        image: p.image || p.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        desc: p.description || 'Dự án bất động sản cao cấp',
      }));
      list = [...dynamicProjects, ...list];
    }

    if (currentPage === 'can-ho') list = list.filter(p => p.type === 'Căn hộ');
    else if (currentPage === 'nha-pho') list = list.filter(p => p.type === 'Nhà phố');
    else if (currentPage === 'biet-thu') list = list.filter(p => p.type === 'Biệt thự');
    else if (currentPage === 'chung-cu') list = list.filter(p => p.type === 'Chung cư');
    else if (currentPage === 'van-phong') list = list.filter(p => p.type === 'Văn phòng');

    if (filterType !== 'all') list = list.filter(p => p.type === filterType);
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);

    return list;
  }, [currentPage, filterType, searchKeyword, sortBy, projects]);

  // ── 1. TOP BAR & MAIN HEADER ───────────────────────────────────────────────
  const renderHeader = () => (
    <header className="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top bar */}
      <div className="bg-slate-50 border-b border-slate-100 text-xs py-1.5 px-4 text-slate-500">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Công ty TNHH Bất động sản {company?.name || 'PlatformBDS'}</span>
            <span className="flex items-center gap-1"><Mail size={12} className="text-blue-600" /> {company?.email || 'hotro@webdemo.com'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-bold text-slate-700">
              <Phone size={12} className="text-blue-600" /> {company?.phone || '0905.56.xxxx'}
            </span>
            <div className="hidden md:flex items-center gap-2 text-slate-400">
              <Facebook size={13} className="hover:text-blue-600 cursor-pointer" />
              <Instagram size={13} className="hover:text-pink-600 cursor-pointer" />
              <Twitter size={13} className="hover:text-sky-500 cursor-pointer" />
              <Youtube size={13} className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`${MAX_W} mx-auto px-4 py-3.5 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md">
            <Building2 size={24} />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900 leading-tight">
              {company?.name || 'REAL ESTATE'}
            </div>
            <div className="text-[9px] tracking-widest text-slate-400 font-extrabold uppercase">Group Platform</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700">
          <button onClick={() => navigate('home')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'home' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Trang Chủ</button>
          <button onClick={() => navigate('about')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'about' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Giới Thiệu</button>
          <button onClick={() => navigate('can-ho')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'can-ho' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Căn Hộ</button>
          <button onClick={() => navigate('nha-pho')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'nha-pho' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Nhà Phố</button>
          <button onClick={() => navigate('biet-thu')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'biet-thu' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Biệt Thự</button>
          <button onClick={() => navigate('chung-cu')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'chung-cu' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Chung Cư</button>
          <button onClick={() => navigate('van-phong')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'van-phong' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Văn Phòng</button>
          <button onClick={() => navigate('news')} className={`px-3 py-2 rounded-lg transition ${['news', 'news-detail'].includes(currentPage) ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Tin Tức</button>
          <button onClick={() => navigate('contact')} className={`px-3 py-2 rounded-lg transition ${currentPage === 'contact' ? 'text-blue-600 font-black' : 'hover:text-blue-600'}`}>Liên Hệ</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate('contact')} className="hidden sm:flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition items-center gap-1.5">
            <Send size={13} /> Ký Gửi Nhà Đất
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-700 shadow-xl">
          <button onClick={() => navigate('home')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Trang Chủ</button>
          <button onClick={() => navigate('about')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Giới Thiệu</button>
          <button onClick={() => navigate('can-ho')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Căn Hộ</button>
          <button onClick={() => navigate('nha-pho')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Nhà Phố</button>
          <button onClick={() => navigate('biet-thu')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Biệt Thự</button>
          <button onClick={() => navigate('chung-cu')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Chung Cư</button>
          <button onClick={() => navigate('van-phong')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Văn Phòng</button>
          <button onClick={() => navigate('news')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Tin Tức</button>
          <button onClick={() => navigate('contact')} className="block w-full text-left py-2 px-3 hover:bg-slate-50 rounded-lg">Liên Hệ</button>
        </div>
      )}
    </header>
  );

  const renderCard = (item: any) => (
    <div
      key={item.id}
      onClick={() => handleOpenProperty(item)}
      className="bg-white rounded-lg border border-slate-200 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="h-44 relative overflow-hidden bg-slate-100">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          {item.discount && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white font-black text-[11px] rounded shadow">
              {item.discount}
            </span>
          )}
        </div>

        <div className="p-3.5 space-y-2">
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
            {item.title}
          </h3>

          <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
            <MapPin size={11} className="text-red-500 shrink-0" /> {item.location}
          </p>

          <div className="text-[11px] text-slate-600 space-y-0.5 pt-1">
            <div className="flex items-center gap-1.5"><Bed size={12} className="text-blue-500" /> Phòng ngủ: {item.bedrooms}</div>
            <div className="flex items-center gap-1.5"><Bath size={12} className="text-blue-500" /> Phòng tắm: {item.bathrooms}</div>
            <div className="flex items-center gap-1.5"><Maximize2 size={12} className="text-blue-500" /> Diện tích: {item.area}</div>
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
        <span className="font-bold text-xs text-blue-700">{item.price}</span>
        <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-400 px-2 py-1 rounded transition">
          Xem ngay &gt;
        </button>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="bg-[#F8FAFC] space-y-12 pb-12">
      {/* HERO BANNER */}
      <section className="relative pt-16 pb-20 px-4 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(rgba(15, 60, 120, 0.85), rgba(30, 96, 184, 0.9)), url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80)' }}>
        <div className={`${MAX_W} mx-auto text-center max-w-3xl mb-8`}>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white mb-6">
            TRANG TIN BẤT ĐỘNG SẢN SỐ 1 VIỆT NAM
          </h1>

          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <select
              value={searchCategory}
              onChange={e => setSearchCategory(e.target.value)}
              className="bg-white text-slate-800 text-xs px-3 py-2.5 rounded-lg font-bold focus:outline-none"
            >
              <option value="all">Tất cả</option>
              <option value="can-ho">Căn hộ</option>
              <option value="biet-thu">Biệt thự</option>
              <option value="chung-cu">Chung cư</option>
              <option value="nha-pho">Nhà phố</option>
            </select>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-lg flex-1 focus:outline-none"
            />
            <button
              onClick={() => navigate('can-ho')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow transition flex items-center justify-center gap-1.5"
            >
              <Search size={14} /> Tìm kiếm
            </button>
          </div>

          <div className="grid grid-cols-5 gap-3 max-w-xl mx-auto mt-8">
            {[
              { label: 'Toàn bộ', icon: Building2, page: 'can-ho' },
              { label: 'Biệt thự', icon: Home, page: 'biet-thu' },
              { label: 'Chung cư', icon: Building, page: 'chung-cu' },
              { label: 'Nhà phố', icon: Layers, page: 'nha-pho' },
              { label: 'Đất trống', icon: MapPin, page: 'can-ho' },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(cat.page)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 group-hover:bg-blue-600 group-hover:scale-110 transition flex items-center justify-center text-white">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-white/90 group-hover:text-white">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 1: BẤT ĐỘNG SẢN ĐANG BÁN */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">
            BẤT ĐỘNG SẢN ĐANG BÁN
          </h2>
          <div className="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {SALE_PROPERTIES.slice(0, 8).map(renderCard)}
        </div>
      </section>

      {/* SECTION 2: DỰ ÁN NỔI BẬT SINGLE PROJECT */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">
            DỰ ÁN NỔI BẬT
          </h2>
          <div className="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-full" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 h-72 md:h-96 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
              alt="Vinhomes Green Bay"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 p-6 md:p-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900">Chung cư Vinhomes Green Bay</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin size={14} className="text-red-500" /> Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội
            </p>
            <div className="text-xs text-slate-600 space-y-1.5 border-t border-b border-slate-100 py-3">
              <div>Phòng ngủ: <strong>04</strong></div>
              <div>Phòng tắm: <strong>03</strong></div>
              <div>Diện tích: <strong>Trên 300 m²</strong></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-blue-700">8.900.000.000 đồng</span>
              <button
                onClick={() => handleOpenProperty(SALE_PROPERTIES[6])}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 border border-slate-300 hover:border-blue-500 px-3 py-1.5 rounded transition"
              >
                Xem ngay &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BẤT ĐỘNG SẢN CHO THUÊ */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">
            BẤT ĐỘNG SẢN CHO THUÊ
          </h2>
          <div className="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RENT_PROPERTIES.slice(0, 8).map(item => (
            <div
              key={item.id}
              onClick={() => handleOpenProperty(item)}
              className="bg-white rounded-lg border border-slate-200 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-md transition p-3 flex gap-4 cursor-pointer group"
            >
              <div className="w-36 h-28 shrink-0 rounded-md overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-red-500" /> {item.location}
                  </p>
                  <div className="text-[10px] text-slate-600 mt-1 flex gap-3">
                    <span>{item.bedrooms} PN</span>
                    <span>•</span>
                    <span>{item.bathrooms} WC</span>
                    <span>•</span>
                    <span>{item.area}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <span className="font-bold text-xs text-blue-700">{item.price}</span>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">Xem ngay &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CÁC DỰ ÁN TẠI CÁC THÀNH PHỐ LỚN */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">
            Các dự án tại các thành phố lớn
          </h2>
          <div className="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {CITIES.map(city => (
            <div
              key={city.id}
              onClick={() => navigate('can-ho')}
              className={`${city.span} h-48 md:h-52 relative rounded-xl overflow-hidden shadow-sm group cursor-pointer`}
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                <div>
                  <h3 className="font-black text-sm md:text-base tracking-wider">{city.name}</h3>
                  <p className="text-[11px] text-slate-300">{city.count}</p>
                </div>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: TIN TỨC & AD BANNER */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
          <h2 className="text-base font-black text-blue-700 uppercase">Tin tức</h2>
          <button onClick={() => navigate('news')} className="text-xs font-bold text-blue-600 hover:underline">
            Xem thêm &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div
            onClick={() => handleOpenArticle(NEWS_ARTICLES[0])}
            className="md:col-span-4 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group"
          >
            <div className="h-48 overflow-hidden">
              <img src={NEWS_ARTICLES[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                {NEWS_ARTICLES[0].title}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-3">
                {NEWS_ARTICLES[0].desc}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3">
            {NEWS_ARTICLES.slice(1, 4).map(art => (
              <div
                key={art.id}
                onClick={() => handleOpenArticle(art)}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden p-2.5 flex gap-3 shadow-xs hover:shadow-md transition cursor-pointer group"
              >
                <div className="w-28 h-20 shrink-0 rounded-md overflow-hidden bg-slate-100">
                  <img src={art.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{art.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 bg-gradient-to-b from-slate-900 to-blue-950 rounded-xl overflow-hidden p-6 text-white text-center flex flex-col justify-between relative shadow-lg">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Ưu Đãi Đặc Biệt
              </span>
              <h4 className="text-xl font-black text-white leading-snug">GÓI VAY 0% LÃI SUẤT</h4>
              <p className="text-xs text-slate-300 font-light">Ân hạn nợ gốc lên tới 24 tháng cho khách hàng mua căn hộ trong tháng này.</p>
            </div>
            <div className="pt-6">
              <button onClick={() => navigate('contact')} className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-lg transition shadow-md">
                Nhận Tư Vấn Ngay
              </button>
              <div className="text-[10px] text-slate-400 mt-2 font-mono">Hotline: {company?.phone || '0905.56.xxxx'}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderRightSidebar = () => (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
          Danh mục
        </h3>
        <div className="space-y-2 text-xs font-bold text-slate-700">
          {[
            { label: 'Biệt thự', page: 'biet-thu' },
            { label: 'Căn hộ', page: 'can-ho' },
            { label: 'Chung cư', page: 'chung-cu' },
            { label: 'Nhà phố', page: 'nha-pho' },
            { label: 'Văn phòng', page: 'van-phong' },
          ].map((c, i) => (
            <div
              key={i}
              onClick={() => navigate(c.page)}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-blue-50 hover:text-blue-600 rounded transition cursor-pointer"
            >
              <span>&gt; {c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
          Các dự án bạn vừa xem
        </h3>
        <div className="space-y-3">
          <div
            onClick={() => handleOpenProperty(SALE_PROPERTIES[5])}
            className="flex gap-2.5 items-center cursor-pointer group"
          >
            <div className="w-14 h-12 rounded overflow-hidden shrink-0 bg-slate-100">
              <img src={SALE_PROPERTIES[5].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div>
              <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                {SALE_PROPERTIES[5].title}
              </h4>
              <span className="text-[11px] font-bold text-blue-700">{SALE_PROPERTIES[5].price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
          Tin tức mới nhất
        </h3>
        <div className="space-y-3">
          {NEWS_ARTICLES.map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="flex gap-2.5 items-center cursor-pointer group"
            >
              <div className="w-14 h-12 rounded overflow-hidden shrink-0 bg-slate-100">
                <img src={art.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                {art.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );

  const renderListingCatalogPage = () => (
    <div className="py-6 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="text-slate-800 font-bold capitalize">{currentPage.replace('-', ' ')}</span>
        </div>

        <h1 className="text-xl font-black text-slate-900 capitalize">{currentPage.replace('-', ' ')}</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <span>Hiển thị tất cả {allPropertyList.length} kết quả</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="default">Thứ tự mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {allPropertyList.map(renderCard)}
            </div>
          </div>
          <div className="lg:col-span-4">
            {renderRightSidebar()}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsPage = () => (
    <div className="py-6 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="text-slate-800 font-bold">Tin tức</span>
        </div>

        <h1 className="text-xl font-black text-slate-900">Tin tức</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {NEWS_ARTICLES.map(art => (
                <div
                  key={art.id}
                  onClick={() => handleOpenArticle(art)}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 overflow-hidden bg-slate-100">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-3.5 space-y-2">
                      <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                        {art.desc}
                      </p>
                    </div>
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

  const renderPropertyDetailPage = () => {
    if (!selectedProperty) return null;
    return (
      <div className="py-6 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-5xl`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span onClick={() => navigate('can-ho')} className="hover:text-blue-600 cursor-pointer">{selectedProperty.type}</span>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate">{selectedProperty.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="lg:col-span-7 space-y-3">
              <div className="h-80 md:h-96 rounded-lg overflow-hidden bg-slate-100">
                <img src={selectedProperty.image} alt="" className="w-full h-full object-cover" />
              </div>
              {selectedProperty.gallery && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedProperty.gallery.map((img: string, i: number) => (
                    <div key={i} className="h-20 rounded overflow-hidden border border-slate-200">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded">
                {selectedProperty.type}
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                {selectedProperty.title}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin size={13} className="text-red-500" /> {selectedProperty.location}
              </p>

              <div className="text-2xl font-black text-blue-700 pt-2 border-t border-slate-100">
                {selectedProperty.price}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg">
                <div>Phòng ngủ: <strong>{selectedProperty.bedrooms}</strong></div>
                <div>Phòng tắm: <strong>{selectedProperty.bathrooms}</strong></div>
                <div>Diện tích: <strong>{selectedProperty.area}</strong></div>
                <div>Pháp lý: <strong>{selectedProperty.legal || 'Sổ hồng riêng'}</strong></div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProperty.desc}
              </p>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg shadow transition"
                >
                  Liên hệ tư vấn ngay
                </button>
                <div className="text-center text-xs font-mono text-slate-500">Hotline: {company?.phone || '0905.56.xxxx'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderArticleDetailPage = () => {
    if (!selectedArticle) return null;
    return (
      <div className="py-6 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span onClick={() => navigate('news')} className="hover:text-blue-600 cursor-pointer">Tin tức</span>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate">{selectedArticle.title}</span>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-3">
              <span>Tác giả: <strong>{selectedArticle.author}</strong></span>
              <span>•</span>
              <span>Ngày đăng: {selectedArticle.date}</span>
            </div>

            <div className="h-80 md:h-96 rounded-lg overflow-hidden">
              <img src={selectedArticle.image} alt="" className="w-full h-full object-cover" />
            </div>

            <p className="text-sm font-semibold text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-lg">
              "{selectedArticle.desc}"
            </p>

            <div className="text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
        <h1 className="text-2xl font-black text-slate-900">Về Chúng Tôi — {company?.name || 'Real Estate Group'}</h1>
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
          <p>
            <strong>{company?.name || 'Real Estate Group'}</strong> là đơn vị phân phối và tiếp thị bất động sản hàng đầu tại Việt Nam, mang đến cho khách hàng hàng ngàn lựa chọn căn hộ, biệt thự, nhà phố và bất động sản thương mại cao cấp với pháp lý minh bạch và giá trị sinh lời bền vững.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center py-6 border-t border-b border-slate-100">
            <div>
              <div className="text-2xl font-black text-blue-600">10+</div>
              <div className="text-xs text-slate-500 mt-1">Năm kinh nghiệm</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-600">15.000+</div>
              <div className="text-xs text-slate-500 mt-1">Khách hàng tin chọn</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-600">100%</div>
              <div className="text-xs text-slate-500 mt-1">Pháp lý minh bạch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-4xl`}>
        <h1 className="text-2xl font-black text-slate-900">Liên Hệ Chúng Tôi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="space-y-4 text-xs text-slate-700">
            <h3 className="font-bold text-sm text-slate-900">Thông Tin Liên Hệ</h3>
            <p className="flex items-start gap-2"><MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" /> {company?.address || '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'}</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-blue-600" /> Hotline: {company?.phone || '0905.56.xxxx'}</p>
            <p className="flex items-center gap-2"><Mail size={14} className="text-blue-600" /> Email: {company?.email || 'webdemo@gmail.com'}</p>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Họ và tên..." className="w-full text-xs p-2.5 border border-slate-200 rounded" />
            <input type="tel" placeholder="Số điện thoại..." className="w-full text-xs p-2.5 border border-slate-200 rounded" />
            <textarea placeholder="Nội dung cần tư vấn..." rows={3} className="w-full text-xs p-2.5 border border-slate-200 rounded" />
            <button
              onClick={() => setContactSubmitted(true)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition"
            >
              {contactSubmitted ? '✓ Đã Gửi Thành Công' : 'Gửi Yêu Cầu Tư Vấn'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer className="w-full">
      <div className="bg-[#1E60B8] py-6 px-4 text-white">
        <div className={`${MAX_W} mx-auto flex flex-col md:flex-row justify-between items-center gap-4`}>
          <div>
            <h3 className="text-sm md:text-base font-black">Đăng ký nhận thông tin từ chúng tôi</h3>
            <p className="text-xs text-blue-100">Chúng tôi sẽ gửi bạn những thông tin bất động sản mới nhất</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Nhập địa chỉ Email của bạn..."
              className="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-lg w-full md:w-72 focus:outline-none"
            />
            <button
              onClick={() => setEmailSubscribed(true)}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap transition flex items-center gap-1"
            >
              <Send size={12} /> {emailSubscribed ? 'Đã đăng ký' : 'Đăng ký ngay'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#0B192C] text-slate-400 text-xs py-10 px-4">
        <div className={`${MAX_W} mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8`}>
          <div className="space-y-3">
            <div className="text-base font-black text-white">Về chúng tôi</div>
            <p className="text-[11px] leading-relaxed">
              📍 Địa chỉ: {company?.address || '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'}
            </p>
            <p className="text-[11px]">📞 Điện thoại: {company?.phone || '0905.56.xxxx'}</p>
            <p className="text-[11px]">✉️ Email: {company?.email || 'webdemo@gmail.com'}</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-white">Về chúng tôi</div>
            <div onClick={() => navigate('home')} className="hover:text-white cursor-pointer">• Trang chủ</div>
            <div onClick={() => navigate('about')} className="hover:text-white cursor-pointer">• Giới thiệu</div>
            <div onClick={() => navigate('news')} className="hover:text-white cursor-pointer">• Tin tức</div>
            <div onClick={() => navigate('contact')} className="hover:text-white cursor-pointer">• Liên hệ</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-white">Dự án mới nhất</div>
            <div onClick={() => navigate('can-ho')} className="hover:text-white cursor-pointer">• Căn hộ</div>
            <div onClick={() => navigate('nha-pho')} className="hover:text-white cursor-pointer">• Nhà phố</div>
            <div onClick={() => navigate('biet-thu')} className="hover:text-white cursor-pointer">• Biệt thự</div>
            <div onClick={() => navigate('chung-cu')} className="hover:text-white cursor-pointer">• Chung cư</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold text-white">Chính sách & Quy định</div>
            <div className="hover:text-white cursor-pointer">• Chính sách bán hàng</div>
            <div className="hover:text-white cursor-pointer">• Điều khoản sử dụng</div>
            <div className="hover:text-white cursor-pointer">• Quy trình mua bán</div>
            <div className="hover:text-white cursor-pointer">• Câu hỏi thường gặp</div>
          </div>
        </div>
      </div>

      <div className="bg-[#07101E] text-slate-500 text-[11px] py-3 px-4 text-center border-t border-slate-800">
        © Thiết kế web bởi PlatformBDS — Template BDS-01
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen bg-slate-50 font-sans antialiased text-slate-800 ${isSmall ? 'text-xs' : ''}`}>
      {renderHeader()}
      <main>
        {currentPage === 'home' && renderHomePage()}
        {['can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong', 'projects'].includes(currentPage) && renderListingCatalogPage()}
        {currentPage === 'news' && renderNewsPage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {currentPage === 'news-detail' && renderArticleDetailPage()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>
      {renderFooter()}
    </div>
  );
}
