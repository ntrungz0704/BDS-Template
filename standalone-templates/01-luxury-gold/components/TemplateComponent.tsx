'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { syncDemoUrl } from '../lib/demo';
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
  Building2,
  Calculator,
  MessageCircle,
  UploadCloud,
  CheckCircle,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Navigation
} from 'lucide-react';
import { MAX_W } from '../lib/design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

export interface PropertyItem {
  id: number;
  title: string;
  slug: string;
  price: string;
  priceNum: number;
  priceUnit: string;
  pricePerM2: string;
  location: string;
  ward: string;
  district: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  areaNum: number;
  direction: string;
  floor?: string;
  type: 'Căn hộ' | 'Nhà phố' | 'Biệt thự' | 'Chung cư' | 'Văn phòng';
  category: 'ban' | 'thue';
  discount?: string;
  image: string;
  gallery: string[];
  desc: string;
  detailedContent: string;
  features: string[];
  legal: string;
  furniture: string;
  handover: string;
  mapEmbedUrl: string;
  author: {
    name: string;
    phone: string;
    zalo: string;
    avatar: string;
    role: string;
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

const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: 'Biệt thự sân vườn sát sân bay Nội Bài view hồ sinh thái',
    slug: 'biet-thu-san-vuon-sat-san-bay-noi-bai',
    price: '12.500.000.000 đồng',
    priceNum: 12.5,
    priceUnit: 'Tỷ',
    pricePerM2: '125 tr/m²',
    location: '275 xã Phú Minh, Huyện Sóc Sơn, Hà Nội',
    ward: 'Phú Minh',
    district: 'Sóc Sơn',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '04',
    area: '100 m²',
    areaNum: 100,
    direction: 'Đông Nam',
    type: 'Biệt thự',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    ],
    desc: 'Biệt thự vườn phong cách nghỉ dưỡng ven hồ, không gian yên tĩnh thoáng mát, sân vườn cây ăn trái, hồ cá Koi và bể bơi riêng biệt.',
    detailedContent: 'Biệt thự được thiết kế theo phong cách Indochine kết hợp hiện đại, toàn bộ nội thất bằng gỗ gõ đỏ và đá marble tự nhiên. Khuôn viên rộng 250m² bao gồm sân đỗ xe 2 ô tô, khu nướng BBQ ngoài trời, và hồ cá Koi nhập khẩu. Vị trí đắc địa cách sân bay quốc tế Nội Bài chỉ 5 phút di chuyển, rất thuận tiện cho doanh nhân và chuyên gia quốc tế.',
    features: ['Hồ bơi riêng', 'Hồ cá Koi', 'Gara 2 ô tô', 'Sân vườn 150m²', 'An ninh 24/7', 'Sát mặt hồ'],
    legal: 'Sổ đỏ chính chủ, sẵn sàng công chứng ngay',
    furniture: 'Đầy đủ nội thất cao cấp nhập khẩu',
    handover: 'Nhận nhà ở ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Soc+Son+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 2,
    title: 'Căn hộ Opal Skyview mặt tiền Phạm Văn Đồng view sông Sài Gòn',
    slug: 'can-ho-opal-skyview',
    price: '5.500.000.000 đồng',
    priceNum: 5.5,
    priceUnit: 'Tỷ',
    pricePerM2: '78 tr/m²',
    location: 'Đại lộ Phạm Văn Đồng, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh',
    ward: 'Phường 13',
    district: 'Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '02',
    bathrooms: '02',
    area: '70.5 m²',
    areaNum: 70.5,
    direction: 'Nam',
    floor: 'Tầng 18',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    desc: 'Căn hộ view sông thoáng đãng mặt tiền Phạm Văn Đồng, thuận tiện di chuyển sân bay Tân Sơn Nhất và trung tâm Quận 1 chỉ 10 phút.',
    detailedContent: 'Căn hộ tầng cao thoáng mát, ban công hướng Nam ngắm trọn sông Sài Gòn và Landmark 81. Dự án tích hợp đầy đủ tiện ích: Hồ bơi tràn bờ, phòng gym tiêu chuẩn quốc tế, khu vui chơi trẻ em và siêu thị mini ngay tầng trệt.',
    features: ['Hồ bơi vô cực', 'View sông Sài Gòn', 'Phòng Gym & Yoga', 'Thẻ từ thang máy', 'Ban công rộng'],
    legal: 'Sổ hồng lâu dài',
    furniture: 'Nội thất nhập khẩu thông minh',
    handover: 'Bàn giao hoàn thiện cơ bản',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Binh+Thanh+Ho+Chi+Minh&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Lê Hoàng Nam',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&q=80',
      role: 'Trưởng Phòng Kinh Doanh',
    },
  },
  {
    id: 3,
    title: 'Căn hộ Star Wish PentHouse sân golf Long Biên',
    slug: 'can-ho-star-wish-penthouse',
    price: '15.450.000.000 đồng',
    priceNum: 15.45,
    priceUnit: 'Tỷ',
    pricePerM2: '96 tr/m²',
    location: 'Đường Cổ Linh, Phường Thạch Bàn, Quận Long Biên, Hà Nội',
    ward: 'Thạch Bàn',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '03',
    bathrooms: '03',
    area: '160 m²',
    areaNum: 160,
    direction: 'Đông Nam',
    floor: 'Tầng 32 (Penthouse)',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    ],
    desc: 'Căn hộ Penthouse thông tầng đẳng cấp ôm trọn tầm nhìn sân Golf Long Biên và sông Hồng. Sân vườn BBQ rộng rãi trên tầng thượng.',
    detailedContent: 'Kiệt tác Penthouse trên cao với thiết kế trần cao 6.5m, cửa kính tràn viền Low-E cách âm cách nhiệt. Sân thượng riêng rộng 45m² thích hợp tổ chức tiệc cocktail và BBQ gia đình cuối tuần.',
    features: ['Penthouse thông tầng', 'View sân Golf 36 lỗ', 'Thang máy thẻ VIP', 'Hầm rượu mini', 'Smart Home 4.0'],
    legal: 'Sổ đỏ lâu dài',
    furniture: 'Full nội thất hạng sang chuẩn châu Âu',
    handover: 'Bàn giao ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Long+Bien+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 4,
    title: 'Căn hộ The Art trung tâm Quận 1 phong cách Indochine',
    slug: 'can-ho-the-art',
    price: '3.999.000.000 đồng',
    priceNum: 3.999,
    priceUnit: 'Tỷ',
    pricePerM2: '80 tr/m²',
    location: 'Số 20 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP.HCM',
    ward: 'Đa Kao',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    bedrooms: '01',
    bathrooms: '01',
    area: '50 m²',
    areaNum: 50,
    direction: 'Đông',
    floor: 'Tầng 08',
    type: 'Căn hộ',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    desc: 'Căn hộ nghệ thuật trung tâm Quận 1 thiết kế Indochine tinh tế, phù hợp cho chuyên gia nước ngoài và kinh doanh Airbnb sinh lời cao.',
    detailedContent: 'Vị trí đắc địa ngay trung tâm Quận 1, thuận tiện di chuyển tới phố đi bộ Nguyễn Huệ, Nhà hát Thành Phố và Thảo Cầm Viên chỉ 5 phút đi bộ. Căn hộ đang có hợp đồng cho chuyên gia Nhật Bản thuê 25 triệu/tháng.',
    features: ['Trung tâm Quận 1', 'Dòng tiền 25tr/tháng', 'Nội thất cổ điển Indochine', 'Bảo vệ 24/7'],
    legal: 'Sổ hồng trao tay',
    furniture: 'Nội thất phong cách Vintage',
    handover: 'Bàn giao ngay kèm hợp đồng thuê',
    mapEmbedUrl: 'https://maps.google.com/maps?q=District+1+Ho+Chi+Minh&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Lê Hoàng Nam',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&q=80',
      role: 'Trưởng Phòng Kinh Doanh',
    },
  },
  {
    id: 5,
    title: 'Chung cư Lux Luxury Golden Silk Nam Từ Liêm',
    slug: 'chung-cu-lux-luxury-golden-silk-nam-tu-liem',
    price: '6.000.000.000 đồng',
    priceNum: 6.0,
    priceUnit: 'Tỷ',
    pricePerM2: '58 tr/m²',
    location: 'KĐT Cổ Nhuế 1, Quận Nam Từ Liêm, Hà Nội',
    ward: 'Cổ Nhuế 1',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    bedrooms: '03',
    bathrooms: '02',
    area: '103 m²',
    areaNum: 103,
    direction: 'Tây Nam',
    floor: 'Tầng 12',
    type: 'Chung cư',
    category: 'ban',
    discount: '-40% Chiết khấu',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    ],
    desc: 'Căn hộ cao cấp Golden Silk thiết kế sang trọng, tầm nhìn panorama công viên xanh, tiện ích đồng bộ hồ bơi bốn mùa và TTTM hiện đại.',
    detailedContent: 'Tọa lạc tại cửa ngõ phía Tây thủ đô, dự án Golden Silk mang tới môi trường sống văn minh, hệ thống trường học quốc tế liên cấp ngay trong khuôn viên đô thị.',
    features: ['Công viên nội khu', 'Hồ bơi 4 mùa', 'TTTM 3 tầng', 'Trường học liên cấp'],
    legal: 'Sổ đỏ sở hữu lâu dài',
    furniture: 'Đầy đủ nội thất nhập khẩu Đức',
    handover: 'Bàn giao Quý 4/2026',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Nam+Tu+Liem+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 6,
    title: 'Chung cư Platium Luxury Center Park Trần Duy Hưng',
    slug: 'chung-cu-platium-luxury-center-park-tran-duy-hung',
    price: '7.899.000.000 đồng',
    priceNum: 7.899,
    priceUnit: 'Tỷ',
    pricePerM2: '85 tr/m²',
    location: '119 Trần Duy Hưng, Phường Trung Hòa, Cầu Giấy, Hà Nội',
    ward: 'Trung Hòa',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    bedrooms: '02',
    bathrooms: '02',
    area: '92.8 m²',
    areaNum: 92.8,
    direction: 'Đông Nam',
    floor: 'Tầng 25',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    desc: 'Vị trí kim cương ngã tư Trần Duy Hưng - Hoàng Minh Giám, kết nối trực tiếp Metro và công viên hồ điều hòa Nhân Chính.',
    detailedContent: 'Tổ hợp chung cư cao cấp Platinum Center Park sở hữu vị trí vàng đắc địa nhất quận Cầu Giấy. Căn hộ tầng 25 hướng Đông Nam gió mát quanh năm, ngắm trọn công viên hồ điều hòa 13ha.',
    features: ['Sát công viên hồ 13ha', 'Kết nối trực tiếp Ga Metro', 'Tầng hầm đỗ xe thông minh', 'Sảnh đón 5 sao'],
    legal: 'Sổ hồng chính chủ',
    furniture: 'Nội thất Da Bò Ý cao cấp',
    handover: 'Nhận nhà ở ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Cau+Giay+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 7,
    title: 'Chung cư Vinhomes Green Bay Mễ Trì',
    slug: 'chung-cu-vinhomes-green-bay',
    price: '8.900.000.000 đồng',
    priceNum: 8.9,
    priceUnit: 'Tỷ',
    pricePerM2: '74 tr/m²',
    location: 'Số 7 Đại lộ Thăng Long, Phường Mễ Trì, Nam Từ Liêm, Hà Nội',
    ward: 'Mễ Trì',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '03',
    area: '120 m²',
    areaNum: 120,
    direction: 'Đông Nam',
    floor: 'Tầng 15 (Căn góc)',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    desc: 'Căn hộ góc 4PN Vinhomes Green Bay view trọn vẹn vịnh xanh 8ha. Môi trường sống xanh lý tưởng bậc nhất phía Tây thủ đô.',
    detailedContent: 'Căn hộ góc 3 mặt thoáng tại tòa G1 Vinhomes Green Bay. Toàn bộ các phòng ngủ đều có cửa sổ đón ánh sáng tự nhiên và ngắm trọn vịnh sinh thái 8ha.',
    features: ['Hồ điều hòa 8ha', 'Đường chạy bộ 3.6km', 'Clubhouse sang trọng', 'Trường Vinschool'],
    legal: 'Sổ hồng vĩnh viễn',
    furniture: 'Hoàn thiện cao cấp liền tường',
    handover: 'Nhận nhà ở ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Green+Bay+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 8,
    title: 'Chung cư Vinhomes Symphony KĐT Vinhomes Riverside',
    slug: 'chung-cu-vinhomes-symphony',
    price: '17.999.000.000 đồng',
    priceNum: 17.999,
    priceUnit: 'Tỷ',
    pricePerM2: '138 tr/m²',
    location: 'Đường Chu Huy Mân, Phường Phúc Đồng, Long Biên, Hà Nội',
    ward: 'Phúc Đồng',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '03',
    area: '130 m²',
    areaNum: 130,
    direction: 'Đông Bắc',
    floor: 'Tầng 10',
    type: 'Chung cư',
    category: 'ban',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    ],
    desc: 'Căn hộ cao cấp Symphony đối diện TTTM Vincom Plaza Long Biên. Tận hưởng toàn bộ tiện ích đại đô thị Vinhomes Riverside.',
    detailedContent: 'Căn hộ 4 phòng ngủ sang trọng bậc nhất tại Symphony. Tầm view khoáng đạt ôm trọn quần thể biệt thự triệu đô Vinhomes Riverside và kênh đào sinh thái.',
    features: ['Đối diện Vincom Plaza', 'Hưởng trọn tiện ích Riverside', 'Bể bơi resort ngoài trời', 'Sân tennis & bóng rổ'],
    legal: 'Sổ hồng chính chủ',
    furniture: 'Full nội thất nhập khẩu Đức',
    handover: 'Bàn giao ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Riverside+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
];

const RENT_PROPERTIES: PropertyItem[] = [
  {
    id: 101,
    title: 'Cho thuê căn hộ 2PN Vinhomes Metropolis Ba Đình view Hồ Tây',
    slug: 'cho-thue-can-ho-vinhomes-metropolis',
    price: '28.000.000 đồng/tháng',
    priceNum: 28,
    priceUnit: 'Triệu/tháng',
    pricePerM2: '340k/m²',
    location: '29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
    ward: 'Ngọc Khánh',
    district: 'Ba Đình',
    city: 'Hà Nội',
    bedrooms: '02',
    bathrooms: '02',
    area: '82 m²',
    areaNum: 82,
    direction: 'Đông Nam',
    type: 'Căn hộ',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    desc: 'Căn hộ tầng trung view trọn hồ Tây, đầy đủ nội thất sang trọng, lễ tân 24/7.',
    detailedContent: 'Căn hộ cho thuê tiêu chuẩn đại sứ quán tại Metropolis Liễu Giai. Đầy đủ trang thiết bị nội thất cao cấp: Tủ lạnh Side-by-Side, máy giặt sấy, đệm lò xo King Koil và TV Sony 65 inch.',
    features: ['View 4 hồ lớn Hà Nội', 'Lễ tân 24/7', 'Bể bơi tầng mái', 'TTTM Vincom Center'],
    legal: 'Hợp đồng thuê linh hoạt từ 6 - 12 tháng',
    furniture: 'Full nội thất cao cấp',
    handover: 'Dọn vào ở ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Metropolis+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
  {
    id: 102,
    title: 'Cho thuê biệt thự sân vườn Vinhomes Riverside có hồ bơi riêng',
    slug: 'cho-thue-biet-thu-vinhomes-riverside',
    price: '65.000.000 đồng/tháng',
    priceNum: 65,
    priceUnit: 'Triệu/tháng',
    pricePerM2: '260k/m²',
    location: 'Đường Hoa Phượng, KĐT Vinhomes Riverside, Long Biên, Hà Nội',
    ward: 'Phúc Lợi',
    district: 'Long Biên',
    city: 'Hà Nội',
    bedrooms: '04',
    bathrooms: '05',
    area: '250 m²',
    areaNum: 250,
    direction: 'Nam',
    type: 'Biệt thự',
    category: 'thue',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
    desc: 'Biệt thự đơn lập hướng sông có sân vườn rộng và hồ bơi cho chuyên gia.',
    detailedContent: 'Biệt thự vườn sát sông sinh thái, bảo vệ an ninh 4 lớp nghiêm ngặt, môi trường sống thanh bình lý tưởng cho gia đình chuyên gia nước ngoài lưu trú dài hạn.',
    features: ['Sát sông sinh thái', 'Hồ bơi riêng', 'Sân vườn 120m²', 'An ninh 4 lớp'],
    legal: 'HĐ thuê dài hạn có xuất hóa đơn VAT',
    furniture: 'Đầy đủ nội thất nhập khẩu',
    handover: 'Dọn vào ở ngay',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Riverside+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
    author: {
      name: 'Nguyễn Thanh Tùng',
      phone: '0905.56.xxxx',
      zalo: '0905560000',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp',
    },
  },
];

const CITIES = [
  { id: 1, name: 'HÀ NỘI', cityCode: 'Hà Nội', count: '18 dự án', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 2, name: 'ĐÀ NẴNG', cityCode: 'Đà Nẵng', count: '15 dự án', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 3, name: 'TP. HỒ CHÍ MINH', cityCode: 'TP. Hồ Chí Minh', count: '32 dự án', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80', span: 'col-span-1 md:col-span-1 md:row-span-2' },
  { id: 4, name: 'NGHỆ AN', cityCode: 'Nghệ An', count: '12 dự án', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', span: 'col-span-1 md:col-span-2' },
  { id: 5, name: 'HẢI PHÒNG', cityCode: 'Hải Phòng', count: '10 dự án', image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80', span: 'col-span-1 md:col-span-2' },
];

const NEWS_ARTICLES: NewsItem[] = [
  {
    id: 1,
    title: '9 đại kỵ trong phong thủy nhà ở và cách hóa giải đơn giản không phải ai cũng biết',
    slug: '9-dai-ky-trong-phong-thuy-nha-o-va-cach-hoa-giai',
    date: '28/08/2026',
    author: 'Chuyên gia Phong Thủy BĐS',
    category: 'Phong thủy nhà đất',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    desc: 'Đây đều là những lỗi sai cơ bản trong phong thủy nhà ở mà hầu như gia chủ nào cũng từng mắc phải khiến tài lộc hao hụt...',
    content: [
      'Phong thủy nhà ở là một trong những yếu tố quan trọng ảnh hưởng trực tiếp đến vượng khí, tài lộc và sức khỏe của các thành viên trong gia đình. Cùng tìm hiểu 9 đại kỵ phong thủy phổ biến nhất hiện nay.',
      '1. Cửa chính đối diện cửa sau hoặc ban công: Luồng khí tốt đi vào nhà sẽ lập tức thoát ra ngoài mà không tụ lại, khiến gia chủ khó tích lũy tài sản.',
      '2. Bếp nấu đặt cạnh bồn rửa: Thủy hỏa tương khắc gây bất hòa trong các mối quan hệ gia đình và ảnh hưởng xấu đến đường tiêu hóa.',
      '3. Gương đối diện giường ngủ: Gây bất an, mất ngủ và suy giảm năng lượng tích cực của gia chủ.',
      'Cách hóa giải: Sử dụng bình phong chắn luồng khí thẳng, bố trí lại cây xanh phong thủy hợp mệnh và sắp xếp lại nội thất hài hòa theo nguyên lý ngũ hành tương sinh.'
    ],
    views: 4520,
    tags: ['Phong thủy', 'Cẩm nang nhà ở', 'Tài lộc', 'Mua nhà'],
  },
  {
    id: 2,
    title: 'Những kiêng kỵ chú ý nên tránh khi chọn mua nhà đất và chung cư',
    slug: 'nhung-kieng-ky-chu-y-nen-tranh-khi-chon-mua-nha',
    date: '26/08/2026',
    author: 'PlatformBDS News',
    category: 'Cẩm nang mua bán',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    desc: 'Nếu nhà ở cao hơn mặt đường, có những bậc lên xuống, chúng nên thoải mái thay vì dốc đứng hiểm trở...',
    content: [
      'Khi chọn mua bất động sản để an cư hoặc đầu tư, người mua cần trang bị kiến thức vững vàng về cả pháp lý và địa thế phong thủy khu đất.',
      'Tránh mua những căn nhà có đường đâm thẳng vào cửa chính (thương sát), nhà nằm dưới chân dốc cao hoặc gần các khu vực nghĩa trang, bãi rác.',
      'Kiểm tra kỹ lưỡng quy hoạch 1/500 và sổ hồng xem có bị tranh chấp hay vướng giải tỏa hành lang an toàn giao thông hay không.'
    ],
    views: 3180,
    tags: ['Kinh nghiệm mua nhà', 'Pháp lý BĐS', 'Kiêng kỵ'],
  },
  {
    id: 3,
    title: 'Căn hộ chung cư và những điều khách hàng quan tâm nhất hiện nay',
    slug: 'can-ho-chung-cu-va-nhung-dieu-khach-hang-quan-tam-nhat',
    date: '24/08/2026',
    author: 'Ban Nghiên Cứu Thị Trường',
    category: 'Thị trường BĐS',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    desc: 'Khi quyết định mua một căn hộ chung cư khách hàng hiện nay còn quan tâm đến phí dịch vụ, pháp lý và chỗ đỗ ô tô...',
    content: [
      'Khảo sát thực tế từ hơn 10.000 khách hàng mua căn hộ cho thấy 3 yếu tố được ưu tiên hàng đầu là: Pháp lý hoàn chỉnh, suất đỗ ô tô định danh và mật độ xây dựng.',
      'Các dự án căn hộ tích hợp đại công viên xanh, trường học và bệnh viện quốc tế luôn duy trì tính thanh khoản cao và tốc độ tăng giá vượt trội.'
    ],
    views: 2940,
    tags: ['Chung cư cao cấp', 'Xu hướng BĐS', 'Thị trường'],
  },
  {
    id: 4,
    title: 'Những lưu ý quan trọng trong phong thủy khi mua nhà giúp thu hút tài lộc',
    slug: 'nhung-luu-y-quan-trong-trong-phong-thuy-khi-mua-nha',
    date: '22/08/2026',
    author: 'KTS. Nguyễn Thanh Tùng',
    category: 'Phong thủy nhà đất',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    desc: 'Khi đi mua nhà, bạn cần phải tìm hiểu kỹ lai lịch của ngôi nhà, hướng cửa chính và luồng gió tự nhiên...',
    content: [
      'Một ngôi nhà có phong thủy tốt thường có ánh sáng tự nhiên chan hòa, gió lưu thông nhẹ nhàng và không gian yên tĩnh.',
      'Việc lựa chọn hướng nhà hợp tuổi (Đông Tứ Mệnh hoặc Tây Tứ Mệnh) kết hợp với bố trí ban thờ trang nghiêm sẽ mang lại sự hanh thông trong công việc làm ăn.'
    ],
    views: 3820,
    tags: ['Phong thủy', 'Tài lộc', 'Hướng nhà'],
  },
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
  if (['can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function LuxuryTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme, projects, posts }: TemplateProps) {
  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const tSlug = template?.slug || 'bds-01';

  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);

  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = INITIAL_PROPERTIES.find(p => p.slug === initialParsed.propSlug) || RENT_PROPERTIES.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return INITIAL_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = NEWS_ARTICLES.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return NEWS_ARTICLES[0];
  });
  
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const [loanPercent, setLoanPercent] = useState<number>(70);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);

  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [consignmentForm, setConsignmentForm] = useState({ name: '', phone: '', propType: 'Căn hộ', address: '', expectedPrice: '', note: '' });

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = INITIAL_PROPERTIES.find(p => p.slug === res.propSlug) || RENT_PROPERTIES.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = NEWS_ARTICLES.find(a => a.slug === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    setActiveImageIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'can-ho') urlSlug = 'can-ho';
    else if (page === 'nha-pho') urlSlug = 'nha-pho';
    else if (page === 'biet-thu') urlSlug = 'biet-thu';
    else if (page === 'chung-cu') urlSlug = 'chung-cu';
    else if (page === 'van-phong') urlSlug = 'van-phong';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'contact') urlSlug = 'lien-he';
    else if (page === 'ky-gui') urlSlug = 'ky-gui';
    else if (page === 'property-detail' && selectedProperty) urlSlug = `chi-tiet/${slug || selectedProperty.slug}`;
    else if (page === 'news-detail' && selectedArticle) urlSlug = `tin-tuc/${slug || selectedArticle.slug}`;
    else urlSlug = slug || page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (prop: PropertyItem) => {
    setSelectedProperty(prop);
    setActiveImageIdx(0);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      const subPage = parts[2] || 'home';
      setCurrentPageState(subPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tSlug]);

  const allPropertyList = useMemo(() => {
    let list = [...INITIAL_PROPERTIES, ...RENT_PROPERTIES];

    if (projects && projects.length > 0) {
      const dynamicList: PropertyItem[] = projects.map(p => ({
        id: p.id,
        title: p.title || p.name,
        slug: p.slug || `du-an-${p.id}`,
        price: p.price || 'Thỏa thuận',
        priceNum: parseFloat(p.price) || 8.5,
        priceUnit: 'Tỷ',
        pricePerM2: '85 tr/m²',
        location: p.location || p.address || 'Hà Nội',
        ward: 'Trung tâm',
        district: p.district || 'Cầu Giấy',
        city: p.city || 'Hà Nội',
        bedrooms: p.bedrooms || '02',
        bathrooms: p.bathrooms || '02',
        area: p.area || '90 m²',
        areaNum: parseFloat(p.area) || 90,
        direction: p.direction || 'Đông Nam',
        type: (p.type as any) || 'Căn hộ',
        category: 'ban',
        image: p.image || p.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        gallery: [p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
        desc: p.description || 'Dự án bất động sản cao cấp vị trí đắc địa.',
        detailedContent: p.description || 'Dự án sở hữu vị trí vàng cùng hệ thống tiện ích đẳng cấp quốc tế.',
        features: ['Pháp lý minh bạch', 'Vị trí đắc địa', 'Tiện ích 5 sao'],
        legal: 'Sổ hồng lâu dài',
        furniture: 'Đầy đủ nội thất',
        handover: 'Nhận nhà ngay',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        author: {
          name: company?.name || 'Nguyễn Thanh Tùng',
          phone: company?.phone || '0905.56.xxxx',
          zalo: '0905560000',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80',
          role: 'Chuyên viên BĐS Cao Cấp',
        }
      }));
      list = [...dynamicList, ...list];
    }

    if (currentPage === 'can-ho') list = list.filter(p => p.type === 'Căn hộ');
    else if (currentPage === 'nha-pho') list = list.filter(p => p.type === 'Nhà phố');
    else if (currentPage === 'biet-thu') list = list.filter(p => p.type === 'Biệt thự');
    else if (currentPage === 'chung-cu') list = list.filter(p => p.type === 'Chung cư');
    else if (currentPage === 'van-phong') list = list.filter(p => p.type === 'Văn phòng');

    if (searchCategory !== 'all') {
      if (searchCategory === 'can-ho') list = list.filter(p => p.type === 'Căn hộ');
      else if (searchCategory === 'nha-pho') list = list.filter(p => p.type === 'Nhà phố');
      else if (searchCategory === 'biet-thu') list = list.filter(p => p.type === 'Biệt thự');
      else if (searchCategory === 'chung-cu') list = list.filter(p => p.type === 'Chung cư');
    }

    if (filterCity !== 'all') {
      list = list.filter(p => p.city === filterCity);
    }

    if (filterPriceRange === 'under-5') list = list.filter(p => p.priceNum < 5);
    else if (filterPriceRange === '5-10') list = list.filter(p => p.priceNum >= 5 && p.priceNum <= 10);
    else if (filterPriceRange === 'above-10') list = list.filter(p => p.priceNum > 10);

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);
    else if (sortBy === 'area-desc') list.sort((a, b) => b.areaNum - a.areaNum);

    return list;
  }, [currentPage, searchCategory, filterCity, filterPriceRange, searchKeyword, sortBy, projects, company]);

  const calculatedLoan = useMemo(() => {
    const propertyPrice = (selectedProperty?.priceNum || 10) * 1_000_000_000;
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

  const activeHotline = company?.phone || '0905.56.xxxx';
  const hotlineTel = activeHotline.replace(/[^0-9]/g, '') || '0905560000';
  const activeEmail = company?.email || 'hotro@webdemo.com';
  const socialLinks = {
    facebook: company?.social?.facebook || 'https://facebook.com',
    instagram: company?.social?.instagram || 'https://instagram.com',
    twitter: company?.social?.twitter || 'https://twitter.com',
    youtube: company?.social?.youtube || 'https://youtube.com',
  };

  const renderHeader = () => (
    <header className="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="bg-slate-50 border-b border-slate-100 text-xs py-1.5 px-4 text-slate-500">
        <div className={`${MAX_W} mx-auto flex justify-between items-center`}>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Công ty TNHH Bất động sản {company?.name || 'PlatformBDS'}</span>
            <a
              href={`mailto:${activeEmail}`}
              title="Gửi Email liên hệ"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <Mail size={12} className="text-blue-600" /> {activeEmail}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${hotlineTel}`}
              title="Gọi Hotline tư vấn"
              className="flex items-center gap-1 font-bold text-slate-700 hover:text-blue-600 transition"
            >
              <Phone size={12} className="text-blue-600" /> {activeHotline}
            </a>
            <div className="hidden md:flex items-center gap-2.5 text-slate-400">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                title="Theo dõi Fanpage Facebook"
                className="hover:text-blue-600 transition cursor-pointer"
              >
                <Facebook size={13} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                title="Theo dõi Instagram"
                className="hover:text-pink-600 transition cursor-pointer"
              >
                <Instagram size={13} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                title="Theo dõi Twitter"
                className="hover:text-sky-500 transition cursor-pointer"
              >
                <Twitter size={13} />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                title="Theo dõi Kênh YouTube"
                className="hover:text-red-600 transition cursor-pointer"
              >
                <Youtube size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${MAX_W} mx-auto px-4 py-3.5 flex items-center justify-between`}>
        <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md group-hover:bg-blue-800 transition">
            <Building2 size={24} />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition leading-tight">
              {company?.name || 'REAL ESTATE'}
            </div>
            <div className="text-[9px] tracking-widest text-slate-400 font-extrabold uppercase">Group Platform</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700">
          {[
            { id: 'home', label: 'Trang Chủ' },
            { id: 'about', label: 'Giới Thiệu' },
            { id: 'can-ho', label: 'Căn Hộ' },
            { id: 'nha-pho', label: 'Nhà Phố' },
            { id: 'biet-thu', label: 'Biệt Thự' },
            { id: 'chung-cu', label: 'Chung Cư' },
            { id: 'van-phong', label: 'Văn Phòng' },
            { id: 'news', label: 'Tin Tức' },
            { id: 'contact', label: 'Liên Hệ' },
          ].map((navItem) => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white font-black shadow-sm ring-2 ring-blue-600/30'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 font-bold'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('ky-gui')}
            className={`hidden sm:flex px-4 py-2 text-white font-bold text-xs rounded-lg shadow-sm transition items-center gap-1.5 cursor-pointer ${
              currentPage === 'ky-gui'
                ? 'bg-amber-500 hover:bg-amber-600 ring-2 ring-amber-400 font-black'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            <UploadCloud size={14} /> Ký Gửi Nhà Đất
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1.5 text-xs font-bold uppercase text-slate-700 shadow-xl">
          {[
            { id: 'home', label: 'Trang Chủ' },
            { id: 'about', label: 'Giới Thiệu' },
            { id: 'can-ho', label: 'Căn Hộ' },
            { id: 'nha-pho', label: 'Nhà Phố' },
            { id: 'biet-thu', label: 'Biệt Thự' },
            { id: 'chung-cu', label: 'Chung Cư' },
            { id: 'van-phong', label: 'Văn Phòng' },
            { id: 'news', label: 'Tin Tức' },
            { id: 'contact', label: 'Liên Hệ' },
          ].map((navItem) => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`block w-full text-left py-2 px-3 rounded-lg cursor-pointer transition ${
                  isActive
                    ? 'bg-blue-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
          <button
            onClick={() => navigate('ky-gui')}
            className={`block w-full text-left py-2 px-3 rounded-lg font-black cursor-pointer ${
              currentPage === 'ky-gui'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Ký Gửi Nhà Đất
          </button>
        </div>
      )}
    </header>
  );

  const renderCard = (item: PropertyItem) => (
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
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white font-bold text-[10px] rounded">
            {item.type}
          </span>
        </div>

        <div className="p-3.5 space-y-2">
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-1 leading-snug">
            {item.title}
          </h3>

          <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
            <MapPin size={11} className="text-red-500 shrink-0" /> {item.location}
          </p>

          <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-50">
            <div className="flex items-center gap-1.5"><Bed size={12} className="text-blue-500" /> Phòng ngủ: {item.bedrooms}</div>
            <div className="flex items-center gap-1.5"><Bath size={12} className="text-blue-500" /> Phòng tắm: {item.bathrooms}</div>
            <div className="flex items-center gap-1.5"><Maximize2 size={12} className="text-blue-500" /> Diện tích: {item.area}</div>
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
        <span className="font-bold text-xs text-blue-700">{item.price}</span>
        <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-400 px-2.5 py-1 rounded transition">
          Xem ngay &gt;
        </button>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="bg-[#F8FAFC] space-y-12 pb-12">
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
              <option value="all">Tất cả danh mục</option>
              <option value="can-ho">Căn hộ</option>
              <option value="biet-thu">Biệt thự</option>
              <option value="chung-cu">Chung cư</option>
              <option value="nha-pho">Nhà phố</option>
            </select>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm (Quận, tên dự án, đường)..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') navigate('can-ho'); }}
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

      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">
            BẤT ĐỘNG SẢN ĐANG BÁN
          </h2>
          <div className="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {allPropertyList.filter(p => p.category === 'ban').slice(0, 8).map(renderCard)}
        </div>
      </section>

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
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-[11px] rounded">
              Dự Án Tâm Điểm Phía Tây
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900">Chung cư Vinhomes Green Bay</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin size={14} className="text-red-500" /> Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội
            </p>
            <div className="text-xs text-slate-600 space-y-1.5 border-t border-b border-slate-100 py-3">
              <div>Phòng ngủ: <strong>04 Phòng ngủ</strong></div>
              <div>Phòng tắm: <strong>03 Phòng tắm</strong></div>
              <div>Diện tích: <strong>Trên 300 m²</strong></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-blue-700">8.900.000.000 đồng</span>
              <button
                onClick={() => handleOpenProperty(INITIAL_PROPERTIES[6])}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 border border-slate-300 hover:border-blue-500 px-3.5 py-1.5 rounded transition"
              >
                Xem ngay &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

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
              onClick={() => {
                setFilterCity(city.cityCode);
                navigate('can-ho');
              }}
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
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {NEWS_ARTICLES[0].category}
              </span>
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

  const CATEGORY_NAMES_VN: Record<string, string> = {
    'can-ho': 'Căn Hộ Cao Cấp',
    'nha-pho': 'Nhà Phố Thương Mại',
    'biet-thu': 'Biệt Thự Nghỉ Dưỡng',
    'chung-cu': 'Chung Cư Hiện Đại',
    'van-phong': 'Văn Phòng Cho Thuê',
    'news': 'Tin Tức & Cẩm Nang BĐS',
    'news-detail': 'Chi Tiết Bài Viết',
    'property-detail': 'Chi Tiết Bất Động Sản',
    'ky-gui': 'Ký Gửi Nhà Đất',
    'about': 'Giới Thiệu Doanh Nghiệp',
    'contact': 'Liên Hệ & Bản Đồ',
  };

  const renderRightSidebar = () => (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
          <span>DANH MỤC SẢN PHẨM</span>
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        </h3>
        <div className="space-y-1.5 text-xs font-bold text-slate-700">
          {[
            { label: 'Căn hộ cao cấp', page: 'can-ho' },
            { label: 'Nhà phố thương mại', page: 'nha-pho' },
            { label: 'Biệt thự nghỉ dưỡng', page: 'biet-thu' },
            { label: 'Chung cư hiện đại', page: 'chung-cu' },
            { label: 'Văn phòng cho thuê', page: 'van-phong' },
          ].map((c, i) => {
            const isCatActive = currentPage === c.page;
            return (
              <div
                key={i}
                onClick={() => navigate(c.page)}
                className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-blue-600 text-white font-black shadow-sm translate-x-1'
                    : 'hover:bg-blue-50 hover:text-blue-600 text-slate-700 hover:translate-x-1'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isCatActive ? 'text-white' : 'text-blue-600'}>›</span>
                  {c.label}
                </span>
                {isCatActive && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">Đang xem</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
          CÁC DỰ ÁN BẠN VỪA XEM
        </h3>
        <div className="space-y-3">
          <div
            onClick={() => handleOpenProperty(INITIAL_PROPERTIES[5])}
            className="flex gap-2.5 items-center cursor-pointer group"
          >
            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
              <img src={INITIAL_PROPERTIES[5].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div>
              <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                {INITIAL_PROPERTIES[5].title}
              </h4>
              <span className="text-[11px] font-black text-blue-700">{INITIAL_PROPERTIES[5].price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
          TIN TỨC MỚI NHẤT
        </h3>
        <div className="space-y-3">
          {NEWS_ARTICLES.slice(0, 3).map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="flex gap-2.5 items-center cursor-pointer group"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
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

  const renderListingCatalogPage = () => {
    const currentTitle = CATEGORY_NAMES_VN[currentPage] || 'Danh Mục Bất Động Sản';
    return (
      <div className="py-6 bg-[#F8FAFC] min-h-screen">
        <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span className="text-blue-600 font-extrabold">{currentTitle}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{currentTitle}</h1>
              <p className="text-xs text-slate-500 mt-1">Danh sách bất động sản được thẩm định pháp lý và có giá tốt nhất</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={filterCity}
                onChange={e => setFilterCity(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
              >
                <option value="all">Toàn bộ Tỉnh / Thành Phố</option>
                <option value="Hà Nội">TP. Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">TP. Đà Nẵng</option>
              </select>

              <select
                value={filterPriceRange}
                onChange={e => setFilterPriceRange(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
              >
                <option value="all">Tất cả khoảng giá</option>
                <option value="under-5">Dưới 5 Tỷ VNĐ</option>
                <option value="5-10">Từ 5 - 10 Tỷ VNĐ</option>
                <option value="above-10">Trên 10 Tỷ VNĐ</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
              >
                <option value="default">Thứ tự mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="area-desc">Diện tích: Lớn đến Nhỏ</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-500 border-b border-slate-200 pb-2 flex justify-between items-center">
            <span>Hiển thị tất cả <strong>{allPropertyList.length}</strong> bất động sản phù hợp</span>
            {(filterCity !== 'all' || filterPriceRange !== 'all') && (
              <button
                onClick={() => { setFilterCity('all'); setFilterPriceRange('all'); setSearchKeyword(''); }}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                ↺ Đặt lại bộ lọc
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-8">
              {allPropertyList.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center border border-slate-200 shadow-xs">
                  <p className="text-sm font-bold text-slate-600">Không tìm thấy bất động sản phù hợp với tiêu chí lọc.</p>
                  <button
                    onClick={() => { setFilterCity('all'); setFilterPriceRange('all'); setSearchKeyword(''); }}
                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Xem tất cả bất động sản
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {allPropertyList.map(renderCard)}
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

  const renderNewsPage = () => (
    <div className="py-6 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-4`}>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span>/</span>
          <span className="text-slate-800 font-bold">Tin tức & Cẩm nang BĐS</span>
        </div>

        <h1 className="text-xl font-black text-slate-900">Tin tức & Cẩm nang BĐS</h1>

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
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                        {art.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 pt-0 text-[10px] text-slate-400 border-t border-slate-50 flex justify-between">
                    <span>{art.date}</span>
                    <span>{art.views} lượt xem</span>
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
        <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-6xl`}>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span onClick={() => navigate('home')} className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span onClick={() => navigate(selectedProperty.type === 'Căn hộ' ? 'can-ho' : 'biet-thu')} className="hover:text-blue-600 cursor-pointer">{selectedProperty.type}</span>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate">{selectedProperty.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="lg:col-span-7 space-y-3">
              <div className="h-80 md:h-[400px] rounded-lg overflow-hidden bg-slate-100 relative">
                <img
                  src={selectedProperty.gallery[activeImageIdx] || selectedProperty.image}
                  alt=""
                  className="w-full h-full object-cover transition duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded shadow">
                    {selectedProperty.type}
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-bold text-xs rounded shadow">
                    {selectedProperty.direction}
                  </span>
                </div>
              </div>
              {selectedProperty.gallery && selectedProperty.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {selectedProperty.gallery.map((img: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`h-20 rounded overflow-hidden border-2 cursor-pointer transition ${activeImageIdx === i ? 'border-blue-600 scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                  {selectedProperty.title}
                </h1>
                
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin size={14} className="text-red-500 shrink-0" /> {selectedProperty.location}
                </p>

                <div className="text-2xl md:text-3xl font-black text-blue-700 pt-2 border-t border-slate-100">
                  {selectedProperty.price}
                  <span className="text-xs font-normal text-slate-400 ml-2">({selectedProperty.pricePerM2})</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg">
                  <div>Phòng ngủ: <strong>{selectedProperty.bedrooms} PN</strong></div>
                  <div>Phòng tắm: <strong>{selectedProperty.bathrooms} WC</strong></div>
                  <div>Diện tích: <strong>{selectedProperty.area}</strong></div>
                  <div>Hướng cửa: <strong>{selectedProperty.direction}</strong></div>
                  <div>Pháp lý: <strong>{selectedProperty.legal}</strong></div>
                  <div>Nội thất: <strong>{selectedProperty.furniture}</strong></div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProperty.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex gap-2">
                  <a
                    href={`tel:${company?.phone || '0905560000'}`}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg shadow transition flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> Gọi Ngay
                  </a>
                  <a
                    href={`https://zalo.me/${selectedProperty.author.zalo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-lg shadow transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} /> Chat Zalo
                  </a>
                </div>
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition"
                >
                  Đặt Lịch Xem Bất Động Sản Này
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-base text-slate-900 border-b border-slate-100 pb-2">
                  Mô tả chi tiết
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed space-y-3">
                  <p>{selectedProperty.detailedContent}</p>
                  <p>Môi trường sống an ninh, dân trí cao, không gian trong lành với hệ thống cây xanh và công viên bao bọc.</p>
                </div>

                <h4 className="font-bold text-xs text-slate-900 pt-2">Đặc điểm nổi bật & Tiện ích đi kèm:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {selectedProperty.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-blue-50/50 p-2 rounded border border-blue-100">
                      <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" /> Vị trí trên bản đồ
                </h3>
                <p className="text-xs text-slate-500">{selectedProperty.location}</p>
                <div className="h-64 rounded-lg overflow-hidden border border-slate-200">
                  <iframe
                    title="Property Map"
                    src={selectedProperty.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <Calculator size={16} className="text-blue-600" /> Bảng tính lãi vay ngân hàng dự kiến
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tỷ lệ vay vốn (%):</label>
                    <select
                      value={loanPercent}
                      onChange={e => setLoanPercent(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-bold text-slate-800"
                    >
                      <option value={50}>50% ({((selectedProperty.priceNum * 0.5)).toFixed(1)} Tỷ)</option>
                      <option value={70}>70% ({((selectedProperty.priceNum * 0.7)).toFixed(1)} Tỷ)</option>
                      <option value={80}>80% ({((selectedProperty.priceNum * 0.8)).toFixed(1)} Tỷ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Thời gian vay (Năm):</label>
                    <select
                      value={loanYears}
                      onChange={e => setLoanYears(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-bold text-slate-800"
                    >
                      <option value={10}>10 Năm (120 Tháng)</option>
                      <option value={15}>15 Năm (180 Tháng)</option>
                      <option value={20}>20 Năm (240 Tháng)</option>
                      <option value={25}>25 Năm (300 Tháng)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Lãi suất (% / Năm):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded p-2 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                    <span className="text-[11px] text-slate-500 font-bold block">Số tiền vay:</span>
                    <span className="text-sm font-black text-blue-700">{(calculatedLoan.loanAmount / 1_000_000_000).toFixed(2)} Tỷ VNĐ</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                    <span className="text-[11px] text-slate-500 font-bold block">Gốc + Lãi tháng đầu:</span>
                    <span className="text-sm font-black text-emerald-700">{(calculatedLoan.monthlyPayment / 1_000_000).toFixed(1)} Triệu/tháng</span>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-center">
                    <span className="text-[11px] text-slate-500 font-bold block">Tổng lãi phải trả:</span>
                    <span className="text-sm font-black text-amber-700">{(calculatedLoan.totalInterest / 1_000_000_000).toFixed(2)} Tỷ VNĐ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProperty.author.avatar}
                    alt={selectedProperty.author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
                  />
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{selectedProperty.author.name}</h4>
                    <p className="text-[11px] text-blue-600 font-bold">{selectedProperty.author.role}</p>
                    <p className="text-[10px] text-slate-400">Đại diện phân phối dự án</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <a
                    href={`tel:${company?.phone || '0905560000'}`}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> {company?.phone || '0905.56.xxxx'}
                  </a>
                  <a
                    href={`https://zalo.me/${selectedProperty.author.zalo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} /> Nhắn Zalo Trực Tiếp
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                  Yêu cầu tư vấn & Nhận bảng giá
                </h4>
                <p className="text-[11px] text-slate-500">Chuyên viên sẽ liên hệ và gửi bảng giá chi tiết trong vòng 5 phút.</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Họ và tên của bạn..."
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại nhận báo giá..."
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
                  />
                  <textarea
                    placeholder="Ghi chú thêm (thời gian muốn xem nhà)..."
                    rows={2}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={() => {
                      if (!contactForm.phone.trim()) {
                        alert('Vui lòng nhập số điện thoại để nhận tư vấn!');
                        return;
                      }
                      alert('✓ Cảm ơn bạn! Chuyên viên tư vấn sẽ liên hệ lại ngay trong 5 phút.');
                      setContactForm({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded transition shadow-sm"
                  >
                    Gửi Yêu Cầu Báo Giá
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                  Bất động sản cùng khu vực
                </h4>
                <div className="space-y-3">
                  {INITIAL_PROPERTIES.filter(p => p.id !== selectedProperty.id).slice(0, 3).map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenProperty(item)}
                      className="flex gap-2.5 items-center cursor-pointer group"
                    >
                      <div className="w-14 h-12 rounded overflow-hidden shrink-0 bg-slate-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                      </div>
                      <div>
                        <h5 className="font-bold text-[11px] text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                          {item.title}
                        </h5>
                        <span className="text-[11px] font-bold text-blue-700">{item.price}</span>
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
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                {selectedArticle.category}
              </span>
              <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-3">
                <span>Tác giả: <strong>{selectedArticle.author}</strong></span>
                <span>•</span>
                <span>Ngày đăng: {selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.views} lượt xem</span>
              </div>
            </div>

            <div className="h-80 md:h-96 rounded-lg overflow-hidden">
              <img src={selectedArticle.image} alt="" className="w-full h-full object-cover" />
            </div>

            <p className="text-sm font-semibold text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
              "{selectedArticle.desc}"
            </p>

            <div className="text-sm text-slate-700 leading-relaxed space-y-4">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-bold">Từ khóa:</span>
              {selectedArticle.tags.map((tag, i) => (
                <span key={i} className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConsignmentPage = () => (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-6 max-w-3xl`}>
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-blue-700 uppercase">
            Ký Gửi Nhà Đất Nhanh Chóng & Bảo Mật
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Tiếp cận hơn 50.000 khách hàng tiềm năng mỗi tháng. Định giá chuẩn xác, thủ tục pháp lý trọn gói và phí môi giới cạnh tranh nhất.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên chủ nhà *</label>
              <input
                type="text"
                placeholder="Nguyễn Văn A..."
                value={consignmentForm.name}
                onChange={e => setConsignmentForm({ ...consignmentForm, name: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Số điện thoại liên hệ *</label>
              <input
                type="tel"
                placeholder="0908xxxxxx..."
                value={consignmentForm.phone}
                onChange={e => setConsignmentForm({ ...consignmentForm, phone: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Loại hình bất động sản *</label>
              <select
                value={consignmentForm.propType}
                onChange={e => setConsignmentForm({ ...consignmentForm, propType: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600 font-bold"
              >
                <option value="Căn hộ">Căn hộ chung cư</option>
                <option value="Nhà phố">Nhà phố / Nhà riêng</option>
                <option value="Biệt thự">Biệt thự</option>
                <option value="Đất nền">Đất nền thổ cư</option>
                <option value="Văn phòng">Mặt bằng / Văn phòng</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Giá bán / Giá cho thuê mong muốn</label>
              <input
                type="text"
                placeholder="VD: 5.5 Tỷ hoặc 20 Triệu/tháng..."
                value={consignmentForm.expectedPrice}
                onChange={e => setConsignmentForm({ ...consignmentForm, expectedPrice: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Địa chỉ chi tiết bất động sản *</label>
            <input
              type="text"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
              value={consignmentForm.address}
              onChange={e => setConsignmentForm({ ...consignmentForm, address: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Thông tin mô tả thêm (Diện tích, số phòng, hiện trạng)</label>
            <textarea
              rows={3}
              placeholder="Mô tả hiện trạng căn nhà, giấy tờ sổ đỏ/sổ hồng..."
              value={consignmentForm.note}
              onChange={e => setConsignmentForm({ ...consignmentForm, note: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            onClick={() => {
              if (!consignmentForm.phone.trim() || !consignmentForm.address.trim()) {
                alert('Vui lòng điền số điện thoại và địa chỉ bất động sản cần ký gửi!');
                return;
              }
              alert('✓ Tiếp nhận thông tin ký gửi thành công! Đội ngũ chuyên viên sẽ liên hệ khảo sát thực tế ngay.');
              setConsignmentForm({ name: '', phone: '', propType: 'Căn hộ', address: '', expectedPrice: '', note: '' });
            }}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg shadow-lg transition"
          >
            Gửi Yêu Cầu Ký Gửi Ngay
          </button>
        </div>
      </div>
    </div>
  );

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
            <p className="flex items-start gap-2"><MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" /> 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-blue-600" /> Hotline: {company?.phone || '0905.56.xxxx'}</p>
            <p className="flex items-center gap-2"><Mail size={14} className="text-blue-600" /> Email: {company?.email || 'webdemo@gmail.com'}</p>
            
            <div className="h-44 rounded-lg overflow-hidden border border-slate-200 mt-2">
              <iframe
                title="Office Map"
                src="https://maps.google.com/maps?q=180+Hoang+Quoc+Viet+Cau+Giay+Hanoi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Họ và tên của bạn..."
              value={contactForm.name}
              onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
            />
            <input
              type="tel"
              placeholder="Số điện thoại liên hệ..."
              value={contactForm.phone}
              onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
            />
            <textarea
              placeholder="Nội dung cần tư vấn..."
              rows={4}
              value={contactForm.message}
              onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={() => {
                if (!contactForm.phone.trim()) {
                  alert('Vui lòng nhập số điện thoại liên hệ!');
                  return;
                }
                alert('✓ Gửi liên hệ thành công! Chúng tôi sẽ phản hồi trong ít phút.');
                setContactForm({ name: '', phone: '', email: '', message: '' });
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition shadow-sm"
            >
              Gửi Tin Nhắn Tư Vấn
            </button>
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
        {['can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong'].includes(currentPage) && renderListingCatalogPage()}
        {currentPage === 'news' && renderNewsPage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {currentPage === 'news-detail' && renderArticleDetailPage()}
        {currentPage === 'ky-gui' && renderConsignmentPage()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'contact' && renderContactPage()}
        {!['home', 'can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong', 'news', 'property-detail', 'news-detail', 'ky-gui', 'about', 'contact'].includes(currentPage) && renderHomePage()}
      </main>
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-01 (Real Estate Group Pro)"
        onNavigate={navigate}
        zaloPhone={selectedProperty?.author?.zalo}
        hotlinePhone={company?.phone}
      />
    </div>
  );
}
