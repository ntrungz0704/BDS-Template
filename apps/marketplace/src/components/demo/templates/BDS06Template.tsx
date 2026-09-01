'use client';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  Tv, Wifi, Droplets, Sun, Car, CheckCircle, Info
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
  category: 'can-ho' | 'shophouse' | 'nha-pho' | 'biet-thu';
  categoryLabel: string;
  price: string;
  priceNum: number; // in billions
  area: string;
  areaNum: number;
  bedrooms: number;
  bathrooms: number;
  direction: string;
  location: string;
  zone: string;
  floor: string;
  badge: string;
  image: string;
  specs: string[];
  amenities: string[];
  desc: string;
  highlight: string;
}

export interface AmenityItem {
  id: number;
  title: string;
  desc: string;
  image: string;
  tag: string;
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
// REAL DATA FOR BDS-06: MEGA ECO-TOWNSHIP & RESIDENTIAL RESORT COMPLEX
// ─────────────────────────────────────────────────────────────────────────────

const BDS06_PROPERTIES: PropertyItem[] = [
  // ── APARTMENTS ──
  {
    id: 1,
    title: 'Căn Hộ 1 Phòng Ngủ Smart Modern (1PN + 1) Tháp Sapphire',
    slug: 'can-ho-1pn-plus-thap-sapphire',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '2.35 Tỷ VNĐ',
    priceNum: 2.35,
    area: '48.5 m²',
    areaNum: 48.5,
    bedrooms: 1,
    bathrooms: 1,
    direction: 'Đông Nam',
    location: 'Đại lộ Central Park, Khu Đô Thị Sinh Thái Grand Park',
    zone: 'Tháp Sapphire S1',
    floor: 'Tầng 12A',
    badge: 'BÁN CHẠY',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Thiết kế 1PN + 1 phòng đa năng thông minh',
      'Ban công rộng ngắm trực diện công viên sinh thái 12ha',
      'Cửa kính Low-E cản nhiệt 3 lớp chạm sàn',
      'Thiết bị vệ sinh Hafele / Kohler cao cấp'
    ],
    amenities: ['Hồ bơi tràn', 'Phòng Gym 3D', 'Vườn dạo bộ trên cao', 'Smart Home 4.0'],
    desc: 'Căn hộ 1PN+1 thiết kế tối ưu công năng, không gian cộng thêm linh hoạt biến đổi thành phòng làm việc hoặc phòng ngủ phụ cho gia đình trẻ.',
    highlight: 'Chiết khấu ngay 8% khi thanh toán sớm — Tặng gói Smart Home 50 triệu'
  },
  {
    id: 2,
    title: 'Căn Hộ 2 Phòng Ngủ Góc Park View (2PN + 2WC) Tháp Ruby',
    slug: 'can-ho-2pn-goc-parkview-thap-ruby',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '3.65 Tỷ VNĐ',
    priceNum: 3.65,
    area: '72.8 m²',
    areaNum: 72.8,
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Nam - Đông Nam',
    location: 'Tòa Ruby R2, Grand Park Boulevard',
    zone: 'Tháp Ruby R2',
    floor: 'Tầng 18',
    badge: 'HOT DEAL',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
    ],
    specs: [
      'Căn góc 2 mặt thoáng đón gió mát quanh năm',
      'Bếp riêng khép kín thông thoáng ra logia phơi đồ',
      'Phòng ngủ Master có phòng thay đồ riêng',
      'Trang bị hệ thống lọc không khí khử khuẩn tự động'
    ],
    amenities: ['Sảnh đón 5 sao', 'Bãi đỗ xe thông minh', 'Sân chơi trẻ em liên hoàn', 'Vườn nướng BBQ'],
    desc: 'Căn góc 2 phòng ngủ sở hữu tầm nhìn kép tuyệt mỹ ôm trọn biển hồ cảnh quan cát trắng và dải công viên ánh sáng lung linh về đêm.',
    highlight: 'Hỗ trợ lãi suất 0% trong 24 tháng — Ân hạn nợ gốc đến khi nhận nhà'
  },
  {
    id: 3,
    title: 'Căn Hộ 3 Phòng Ngủ Master Luxury Tháp Diamond',
    slug: 'can-ho-3pn-master-luxury-diamond',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '5.20 Tỷ VNĐ',
    priceNum: 5.20,
    area: '98.6 m²',
    areaNum: 98.6,
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Đông',
    location: 'Tháp Diamond D1, Mặt tiền Hồ Cảnh Quan',
    zone: 'Tháp Diamond D1',
    floor: 'Tầng 22',
    badge: 'VIP LUXURY',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80'
    ],
    specs: [
      '3 Phòng ngủ rộng rãi với ban công Panorama kéo dài',
      'Full nội thất nhập khẩu Châu Âu cao cấp',
      'Khóa cửa vân tay FaceID bảo mật 4 lớp',
      'Hệ thống nước uống tinh khiết tại vòi chuẩn WHO'
    ],
    amenities: ['Hồ bơi vô cực trên cao', 'Clubhouse thượng lưu', 'Sân tập Golf 3D', 'Sky Bar Panorama'],
    desc: 'Không gian sống hoàn mỹ chuẩn nghỉ dưỡng 5 sao dành riêng cho các gia đình đa thế hệ, mang đến chuẩn mực sống thượng lưu khác biệt.',
    highlight: 'Tặng ngay gói hoàn thiện nội thất 150 triệu — Tặng 3 năm phí quản lý'
  },
  {
    id: 4,
    title: 'Penthouse Sky Villa Duplex Sân Vườn Hoàng Gia',
    slug: 'penthouse-sky-villa-duplex-hoang-gia',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '11.8 Tỷ VNĐ',
    priceNum: 11.8,
    area: '215.0 m²',
    areaNum: 215.0,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Đông Nam',
    location: 'Tầng 35 Tháp Diamond D1 (Sky Villa)',
    zone: 'Tháp Diamond Sky',
    floor: 'Tầng 35-36',
    badge: 'SIÊU HIẾM',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Thiết kế Duplex thông tầng trần cao 6.2m cực kỳ bề thế',
      'Hồ bơi chân mây và sân vườn riêng tại ban công',
      'Thang máy riêng biệt tận cửa căn hộ',
      'Tầm view Panorama 360 độ toàn cảnh thành phố'
    ],
    amenities: ['Thang máy riêng', 'Hồ bơi chân mây', 'Đỗ xe 2 vị trí định danh', 'Quản gia 24/7'],
    desc: 'Dinh thự trên không độc bản dành riêng cho 10 vị chủ nhân tinh hoa, khẳng định vị thế đỉnh cao và phong cách sống vương giả.',
    highlight: 'Tặng thẻ VIP đặc quyền Golf Club 10 năm — Chiết khấu thanh toán 12%'
  },

  // ── SHOPHOUSE & TOWNHOUSE & VILLAS ──
  {
    id: 5,
    title: 'Shophouse Khối Đế Mặt Tiền Đại Lộ 30m Sầm Uất',
    slug: 'shophouse-khoi-de-dai-lo-30m',
    category: 'shophouse',
    categoryLabel: 'Shophouse Thương Mại',
    price: '13.5 Tỷ VNĐ',
    priceNum: 13.5,
    area: '135.0 m²',
    areaNum: 135.0,
    bedrooms: 2,
    bathrooms: 3,
    direction: 'Tây Nam',
    location: 'Mặt tiền Đại lộ Grand Boulevard 30m',
    zone: 'Phân Khu Shophouse',
    floor: 'Trệt + Lửng (2 Tầng)',
    badge: 'KINH DOANH ĐẮC ĐỊA',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
    ],
    specs: [
      'Mặt tiền kinh doanh 7.5m cực rộng trên đại lộ 30m',
      'Trần tầng 1 cao 5.8m có lửng thông thoáng',
      'Phù hợp mở showroom, F&B, ngân hàng, spa cao cấp',
      'Sở hữu vỉa hè lát đá hoa cương rộng 8m để xe thoải mái'
    ],
    amenities: ['Vỉa hè 8m', 'Phố đi bộ đêm', 'Bãi đỗ xe trước cửa', 'Hệ thống PCCC tự động'],
    desc: 'Tọa lạc tại tuyến phố giao thương sầm uất bậc nhất đại đô thị với lưu lượng hơn 30.000 cư dân qua lại mỗi ngày, bảo chứng sinh lời bền vững.',
    highlight: 'Cam kết thuê lại 8%/năm trong 3 năm đầu — Tặng gói hoàn thiện mặt tiền 100 triệu'
  },
  {
    id: 6,
    title: 'Nhà Phố Vườn Liền Kề Park View 4 Tầng Sang Trọng',
    slug: 'nha-pho-vuon-lien-ke-park-view-4-tang',
    category: 'nha-pho',
    categoryLabel: 'Nhà Phố Liền Kề',
    price: '9.8 Tỷ VNĐ',
    priceNum: 9.8,
    area: '110.0 m²',
    areaNum: 110.0,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông Bắc',
    location: 'Phân khu Park Residence, Đường Hoa Ban 16m',
    zone: 'Phân Khu Nhà Phố',
    floor: '1 Trệt + 3 Lầu + Sân Thượng',
    badge: 'MỚI MỞ BÁN',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Xây dựng 1 trệt 3 lầu + tum sân thượng phong cách tân cổ điển',
      'Sân trước để ô tô 7 chỗ, sân sau làm tiểu cảnh vườn xanh',
      'Phòng khách trần cao bề thế, 4 phòng ngủ master khép kín',
      'Đường trước nhà 16m cây xanh rợp bóng mát'
    ],
    amenities: ['Sân vườn trước sau', 'Gara ô tô', 'Hệ thống an ninh 24/7', 'Công viên dạo bộ'],
    desc: 'Thiết kế thông minh hài hòa giữa không gian sống xanh thanh bình và tiện nghi đô thị hiện đại, nơi chốn an cư lý tưởng vững bền cho nhiều thế hệ.',
    highlight: 'Ân hạn nợ gốc 36 tháng — Nhận ngay 1 cây vàng SJC may mắn'
  },
  {
    id: 7,
    title: 'Biệt Thự Song Lập Hồ Cảnh Quan (Sân Vườn & Hồ Bơi Riêng)',
    slug: 'biet-thu-song-lap-ho-canh-quan',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Sinh Thái',
    price: '19.5 Tỷ VNĐ',
    priceNum: 19.5,
    area: '210.0 m²',
    areaNum: 210.0,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông Nam',
    location: 'Đảo Ngọc Riverside, Phân khu Biệt thự ven hồ',
    zone: 'Phân Khu Đảo Biệt Thự',
    floor: '1 Trệt + 2 Lầu',
    badge: 'VIEW HỒ 12HA',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    specs: [
      'Mặt tiền 10m x Sâu 21m khuôn viên đất vuông vức',
      '3 Mặt thoáng đón gió tự nhiên từ mặt hồ cảnh quan',
      'Sân vườn rộng thiết kế sẵn hồ cá Koi và bể bơi riêng biệt',
      'Pháp lý sổ hồng sở hữu lâu dài vĩnh viễn'
    ],
    amenities: ['Hồ bơi riêng', 'Bến du thuyền nội khu', 'Clubhouse ven hồ', 'Sân tennis riêng biệt'],
    desc: 'Tọa lạc tại bán đảo sinh thái riêng biệt với an ninh đa lớp 24/7, mang đến không gian nghỉ dưỡng thanh bình biệt lập ngay trong lòng đại đô thị.',
    highlight: 'Chiết khấu 10% thanh toán sớm — Tặng gói cảnh quan sân vườn trị giá 200 triệu'
  },
  {
    id: 8,
    title: 'Biệt Thự Đơn Lập Góc Siêu VIP Bến Du Thuyền Riêng',
    slug: 'biet-thu-don-lap-goc-vip-ben-du-thuyen',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Sinh Thái',
    price: '34.0 Tỷ VNĐ',
    priceNum: 34.0,
    area: '360.0 m²',
    areaNum: 360.0,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Nam',
    location: 'Mũi Bán Đảo Hoàng Gia, View Sông Trực Diện',
    zone: 'Phân Khu Đảo Biệt Thự',
    floor: '1 Trệt + 2 Lầu + Áp Mái',
    badge: 'ĐỘC BẢN GIỚI TINH HOA',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Căn góc 2 mặt tiền sông rộng thoáng cực kỳ hiếm có',
      'Sở hữu bến đỗ du thuyền riêng biệt hợp pháp',
      'Hồ bơi vô cực tràn bờ mặt nước và phòng xông hơi Sauna riêng',
      'Hầm rượu vang và rạp chiếu phim gia đình tiêu chuẩn Dolby'
    ],
    amenities: ['Bến du thuyền', 'Hồ bơi tràn viền', 'Sân đỗ trực thăng', 'Bảo vệ riêng 24/7'],
    desc: 'Tuyệt tác dinh thự dành cho các gia tộc danh giá, nơi khẳng định vị thế tôn quý và giá trị tài sản truyền đời qua nhiều thế hệ.',
    highlight: 'Tặng du thuyền thể thao mini hoặc chiết khấu trực tiếp 1.5 Tỷ vào HĐMB'
  }
];

const BDS06_AMENITIES: AmenityItem[] = [
  {
    id: 1,
    title: 'Công Viên Sinh Thái & Hồ Điều Hòa 12ha',
    desc: 'Hồ nước ngọt điều hòa khí hậu cùng dải công viên rợp bóng mát, đài phun nước nghệ thuật và chòi ngắm cảnh ven hồ.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: '12 HECTARE LAKE'
  },
  {
    id: 2,
    title: 'Trung Tâm Thương Mại & Phố Đi Bộ Sầm Uất',
    desc: 'Quy tụ hơn 200+ thương hiệu ẩm thực, thời trang, rạp chiếu phim IMAX và khu vui chơi giải trí hàng đầu thế giới.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    tag: 'MEGA MALL & SHOPPING'
  },
  {
    id: 3,
    title: 'Hồ Bơi Vô Cực Tràn Bờ Chuẩn Olympic',
    desc: 'Cụm hồ bơi nước ấm 4 mùa phân tầng hiện đại, quầy pool bar sang trọng và khu tắm nắng phong cách resort nhiệt đới.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
    tag: 'OLYMPIC INFINITY POOL'
  },
  {
    id: 4,
    title: 'Khu Thể Thao Đa Năng & Sân Golf 3D',
    desc: 'Sân tennis, bóng rổ, cụm máy gym công nghệ cao ngoài trời và phòng tập golf 3D mô phỏng các sân golf quốc tế.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    tag: 'SPORTS & 3D GOLF'
  },
  {
    id: 5,
    title: 'Vườn Nướng BBQ Ven Hồ & Clubhouse Thượng Lưu',
    desc: 'Không gian tiệc ngoài trời ấm cúng dành riêng cho cư dân, phòng tiệc VIP và quầy lounge thưởng thức rượu vang.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    tag: 'BBQ GARDEN & CLUBHOUSE'
  },
  {
    id: 6,
    title: 'Trường Học Liên Cấp & Bệnh Viện Quốc Tế',
    desc: 'Hệ thống giáo dục chuẩn Cambridge từ Mầm non đến Cấp 3 cùng bệnh viện đa khoa quốc tế chăm sóc sức khỏe 24/7.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    tag: 'INTERNATIONAL SCHOOL'
  }
];

const BDS06_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Đại Đô Thị Sinh Thái Đón Đầu Tuyến Metro Và Cao Tốc Trọng Điểm 2026',
    slug: 'dai-do-thi-sinh-thai-don-dau-tuyen-metro-cao-toc-2026',
    date: '28/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiến Độ & Hạ Tầng',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&q=80',
    excerpt: 'Hạ tầng giao thông khu vực phát triển bứt phá với tiến độ thần tốc của tuyến Metro số 1 và tuyến đường Vành Đai huyết mạch kết nối trực tiếp dự án...',
    content: [
      'Dự án sở hữu vị thế tâm điểm giao thương khi nằm ngay cửa ngõ kết nối trực tiếp với tuyến đường Vành Đai và nhà ga Metro trung tâm.',
      'Việc đồng bộ hạ tầng giao thông không chỉ rút ngắn thời gian di chuyển vào trung tâm thành phố xuống còn 15 phút mà còn tạo đòn bẩy gia tăng giá trị bất động sản lên tới 35-45% trong giai đoạn bàn giao.',
      'Hiện tại, toàn bộ các tuyến đường nội khu lộ giới từ 16m đến 30m đã được trải nhựa thảm bê tông đồng bộ, trồng cây xanh và lắp đặt hệ thống chiếu sáng thông minh năng lượng mặt trời.'
    ],
    views: 4820
  },
  {
    id: 2,
    title: 'Lễ Cất Nóc Tháp Sapphire & Khởi Công Cụm Phố Thương Mại Shophouse',
    slug: 'le-cat-noc-thap-sapphire-khoi-cong-shophouse',
    date: '22/08/2026',
    author: 'Chuyên Viên Phân Tích BDS',
    category: 'Sự Kiện Dự Án',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=800&q=80',
    excerpt: 'Chủ đầu tư chính thức tổ chức lễ cất nóc vượt tiến độ 45 ngày đối với 2 tòa tháp Sapphire S1-S2, đồng thời khởi công dãy Shophouse đại lộ...',
    content: [
      'Sự kiện cất nóc vượt tiến độ khẳng định tiềm lực tài chính vững mạnh và năng lực thi công kỷ luật của tổng thầu xây dựng top 1 Việt Nam.',
      'Hơn 800 khách hàng tham dự buổi lễ đã bày tỏ sự hào hứng khi tận mắt chứng kiến công trường sôi động 3 ca liên tục, đảm bảo tiến độ bàn giao nhà chuẩn xác vào Quý IV/2026.',
      'Cũng tại sự kiện, giỏ hàng ưu đãi 50 căn Shophouse đại lộ đầu tiên đã được giao dịch thành công 100% chỉ trong vòng 90 phút mở bán.'
    ],
    views: 6150
  },
  {
    id: 3,
    title: 'Bí Quyết Chọn Mua Căn Hộ Sống Xanh Chuẩn Sinh Thái Cho Gia Đình Trẻ',
    slug: 'bi-quyet-chon-mua-can-ho-song-xanh-cho-gia-dinh-tre',
    date: '15/08/2026',
    author: 'Kiến Trúc Sư Cảnh Quan',
    category: 'Cẩm Nang Mua Nhà',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Không chỉ là nơi để ở, một không gian sống sinh thái trong lành với đầy đủ trường học, bệnh viện và công viên cây xanh chính là khoản đầu tư vô giá cho tương lai con trẻ...',
    content: [
      'Xu hướng sống xanh, cân bằng sức khỏe (Wellness Living) đang trở thành tiêu chí hàng đầu khi người mua nhà đưa ra quyết định an cư.',
      'Với mật độ xây dựng chỉ 26.8%, hơn 73% diện tích dự án được phủ kín bởi mặt nước hồ điều hòa 12ha, công viên sinh thái và hệ thống tiện ích thể thao liên hoàn.',
      'Mỗi ngày trở về nhà là một kỳ nghỉ dưỡng đích thực, giúp tái tạo năng lượng tích cực cho bố mẹ và nuôi dưỡng môi trường phát triển toàn diện cho con cái.'
    ],
    views: 3940
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
  if (clean === 'ky-gui' || clean === 'consign') return { page: 'ky-gui', propSlug: '', artSlug: '' };
  if (clean === 'tien-ich' || clean === 'amenities') return { page: 'amenities', propSlug: '', artSlug: '' };
  if (clean === 'chinh-sach' || clean === 'policies' || clean === 'bang-gia') return { page: 'policies', propSlug: '', artSlug: '' };
  if (clean === 'thu-vien' || clean === 'gallery') return { page: 'gallery', propSlug: '', artSlug: '' };
  if (['can-ho', 'apartments', 'shophouse', 'nha-pho', 'biet-thu', 'villas'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS06Template({ 
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

  const activeProperties = useMemo<PropertyItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      return projects.map((p: any, idx: number): PropertyItem => {
        const cat = (p.type?.toLowerCase().includes('biệt') || p.type === 'VILLA')
          ? 'biet-thu'
          : (p.type?.toLowerCase().includes('shophouse') || p.type === 'SHOPHOUSE')
          ? 'shophouse'
          : (p.type?.toLowerCase().includes('căn') || p.type === 'APARTMENT')
          ? 'can-ho'
          : 'nha-pho';
        const catLabel = cat === 'biet-thu' ? 'Biệt Thự Sinh Thái' : (cat === 'shophouse' ? 'Shophouse Thương Mại' : (cat === 'can-ho' ? 'Căn Hộ Nghỉ Dưỡng' : 'Nhà Phố Liền Kề'));

        return {
          id: p.id || idx + 1,
          title: p.title || p.name || 'Bất động sản sinh thái cao cấp',
          slug: p.slug || `bds-${idx + 1}`,
          category: cat,
          categoryLabel: catLabel,
          price: p.price || (p.priceFrom ? `${p.priceFrom} Tỷ` : 'Liên hệ'),
          priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 5.0),
          area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '100 m²'),
          areaNum: typeof p.area === 'number' ? p.area : 100,
          bedrooms: p.bedrooms || 3,
          bathrooms: p.bathrooms || 2,
          direction: p.direction || 'Đông Nam',
          location: p.address || p.location || 'Vị trí đắc địa, cảnh quan sông nước',
          zone: p.zone || 'Phân Khu Cao Cấp',
          floor: p.floor || '3 Tầng',
          badge: p.badge || (idx === 0 ? 'MỞ BÁN ĐỢT 1' : 'SUẤT NGOẠI GIAO'),
          image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
          gallery: p.gallery || [p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
          specs: Array.isArray(p.specs) ? p.specs : ['Sổ hồng riêng lâu dài', 'Mặt tiền đường lớn', 'Bàn giao hoàn thiện cao cấp'],
          amenities: Array.isArray(p.amenities) ? p.amenities : ['Hồ bơi vô cực', 'Công viên ven sông', 'An ninh 24/7'],
          desc: p.description || p.desc || 'Không gian sống xanh chuẩn resort 5 sao, pháp lý chuẩn chỉnh.',
          highlight: p.highlight || 'Chiết khấu đặc biệt đến 8% cho khách hàng thanh toán sớm',
        };
      });
    }
    return BDS06_PROPERTIES;
  }, [projects]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      return posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức bất động sản sinh thái',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Tin Tức',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tiến độ và thị trường mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
    }
    return BDS06_NEWS;
  }, [posts, company]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProperties.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return activeProperties[0] || BDS06_PROPERTIES[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS06_NEWS[0];
  });

  // UI Interactive States
  const [activeZoneTab, setActiveZoneTab] = useState<'all' | 'can-ho' | 'shophouse' | 'nha-pho' | 'biet-thu'>('all');
  const [activeMasterplanTab, setActiveMasterplanTab] = useState<'tong-the' | 'sapphire' | 'ruby' | 'diamond' | 'thap-tang'>('tong-the');
  const [activeApartmentTab, setActiveApartmentTab] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalTitle, setLeadModalTitle] = useState("TẢI TRỌN BỘ HỒ SƠ PHÁP LÝ & BẢNG GIÁ GỐC");

  // Mortgage Calculator State
  const [loanPercent, setLoanPercent] = useState<number>(70);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [loanRate, setLoanRate] = useState<number>(7.5);
  const [loanPropertyPrice, setLoanPropertyPrice] = useState<number>(3.65); // Tỷ VNĐ

  // Lead & Contact Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', note: '', productType: 'Căn hộ 2 Phòng Ngủ' });
  const [consignForm, setConsignForm] = useState({ name: '', phone: '', email: '', address: '', type: 'Căn hộ cao cấp', expectedPrice: '', note: '' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeProperties.find(p => p.slug === res.propSlug);
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
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else urlSlug = page;

    const tSlug = template?.slug || 'bds-06';
    syncDemoUrl(urlSlug, tSlug);
  };

  const handleOpenProperty = (prop: PropertyItem) => {
    setSelectedProperty(prop);
    setLoanPropertyPrice(prop.priceNum);
    navigate('property-detail', prop.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.phone) {
      alert('Vui lòng nhập số điện thoại để nhận bảng giá qua Zalo!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu của ${leadForm.name || 'Quý khách'} (${leadForm.phone}). Bảng giá & chính sách chiết khấu sẽ gửi qua Zalo trong 3 phút!`);
    setLeadForm({ name: '', phone: '', email: '', note: '', productType: 'Căn hộ 2 Phòng Ngủ' });
  };

  const handleConsignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consignForm.phone || !consignForm.address) {
      alert('Vui lòng điền đầy đủ số điện thoại và địa chỉ BĐS cần ký gửi!');
      return;
    }
    showToast(`✅ Đã tiếp nhận hồ sơ ký gửi BĐS tại ${consignForm.address}. Chuyên viên sẽ liên hệ thẩm định miễn phí trong 15 phút!`);
    setConsignForm({ name: '', phone: '', email: '', address: '', type: 'Căn hộ cao cấp', expectedPrice: '', note: '' });
  };

  // Calculated Mortgage Metrics
  const mortgageCalc = useMemo(() => {
    const loanAmountBillions = (loanPropertyPrice * loanPercent) / 100;
    const loanAmountVND = loanAmountBillions * 1_000_000_000;
    const totalMonths = loanYears * 12;
    const monthlyRate = (loanRate / 100) / 12;
    
    // Principal payment per month
    const monthlyPrincipal = loanAmountVND / totalMonths;
    // First month interest
    const firstMonthInterest = loanAmountVND * monthlyRate;
    const firstMonthTotal = monthlyPrincipal + firstMonthInterest;
    
    // Total interest estimation (reducing balance)
    const totalInterest = ((loanAmountVND * monthlyRate * (totalMonths + 1)) / 2) / 1_000_000_000;

    return {
      loanAmountBillions: loanAmountBillions.toFixed(2),
      firstMonthTotalMillion: (firstMonthTotal / 1_000_000).toFixed(1),
      monthlyPrincipalMillion: (monthlyPrincipal / 1_000_000).toFixed(1),
      totalInterestBillions: totalInterest.toFixed(2)
    };
  }, [loanPropertyPrice, loanPercent, loanYears, loanRate]);

  // Filtered Properties for catalog
  const filteredCatalog = useMemo(() => {
    if (activeZoneTab === 'all') return BDS06_PROPERTIES;
    return activeProperties.filter(p => p.category === activeZoneTab);
  }, [activeZoneTab]);

  // Safe Image Fallback
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & STICKY NAVIGATION (MATCHING MOCKUP & TEMPLATEBDS BRAND)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#0F172A] text-white shadow-xl border-b border-slate-800">
      {/* Top micro bar */}
      <div className="bg-[#D8232A] text-white text-[11px] font-bold py-1.5 px-4 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span>🔥 MỞ BÁN ĐỢT 1: CHIẾT KHẤU ĐẾN 10% — HỖ TRỢ LÃI SUẤT 0% TRONG 24 THÁNG</span>
            <span className="opacity-80">★ TẶNG GÓI NỘI THẤT CAO CẤP 150 TRIỆU ★</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="flex items-center gap-1.5 hover:underline">
              <Phone size={13} className="animate-pulse" /> Hotline CĐT: <strong>0919 006 030</strong>
            </a>
            <span className="opacity-50">|</span>
            <span className="text-amber-300 font-extrabold">MẪU GIAO DIỆN: BDS-06</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3`}>
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#D8232A] to-[#B91C1C] flex items-center justify-center text-white font-black shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform shrink-0">
            <Building2 size={20} />
          </div>
          <div className="min-w-0 truncate">
            <span className="text-sm sm:text-base font-black tracking-tight block leading-tight text-white group-hover:text-red-400 transition-colors truncate">
              {company?.name || 'TEMPLATESBDS'}
            </span>
            <span className="text-[7.5px] sm:text-[10px] tracking-widest text-amber-400 block uppercase font-bold truncate">
              ĐẠI ĐÔ THỊ SINH THÁI 120HA
            </span>
          </div>
        </div>

        {/* Desktop Menu Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'home' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('can-ho')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'can-ho' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Căn Hộ
          </button>
          <button 
            onClick={() => navigate('shophouse')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'shophouse' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Shophouse
          </button>
          <button 
            onClick={() => navigate('biet-thu')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'biet-thu' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Biệt Thự
          </button>
          <button 
            onClick={() => navigate('tien-ich')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'tien-ich' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Tiện Ích
          </button>
          <button 
            onClick={() => navigate('chinh-sach')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'chinh-sach' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Chính Sách
          </button>
          <button 
            onClick={() => navigate('thu-vien')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'thu-vien' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Thư Viện
          </button>
          <button 
            onClick={() => navigate('tin-tuc')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'tin-tuc' || currentPage === 'news-detail' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('ky-gui')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'ky-gui' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Ký Gửi
          </button>
          <button 
            onClick={() => navigate('lien-he')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'lien-he' ? 'text-red-500 font-extrabold' : ''}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0 ml-auto">
          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Phone size={13} className="text-red-400 animate-pulse shrink-0" />
            <span>0919 006 030</span>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('booking-lead-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('lien-he');
            }}
            className="hidden md:inline-block px-3.5 py-2 bg-gradient-to-r from-[#D8232A] to-[#B91C1C] hover:from-red-700 hover:to-red-800 text-white text-xs font-black rounded-sm shadow-lg transition-all uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
          >
            Tải Bảng Giá F1
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-sm bg-slate-800 text-white lg:hidden hover:bg-slate-700 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-5 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Trang Chủ</button>
            <button onClick={() => navigate('can-ho')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Căn Hộ</button>
            <button onClick={() => navigate('shophouse')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Shophouse</button>
            <button onClick={() => navigate('biet-thu')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Biệt Thự</button>
            <button onClick={() => navigate('tien-ich')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Tiện Ích</button>
            <button onClick={() => navigate('chinh-sach')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Chính Sách</button>
            <button onClick={() => navigate('thu-vien')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Thư Viện</button>
            <button onClick={() => navigate('tin-tuc')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Tin Tức</button>
            <button onClick={() => navigate('ky-gui')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Ký Gửi</button>
            <button onClick={() => navigate('lien-he')} className="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Liên Hệ</button>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Hotline tư vấn 24/7:</span>
            <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-red-400 font-extrabold">0919 006 030</a>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO BANNER SECTION (MATCHING MOCKUP WITH FLYCAM VIEW & BADGE)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Hero Aerial Image */}
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
        alt="Grand Riverside Park Aerial View"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 animate-pulse duration-1000"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/40" />

      {/* Hero Content */}
      <div className={`relative z-10 ${MAX_W} mx-auto px-4 py-20 text-center space-y-6`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D8232A]/90 text-white text-xs font-black tracking-widest uppercase shadow-xl backdrop-blur-md">
          <Sparkles size={14} className="text-amber-300" /> TỔ HỢP ĐẠI ĐÔ THỊ SINH THÁI ĐẲNG CẤP 2026
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15] drop-shadow-2xl">
          KHU ĐÔ THỊ SINH THÁI PHỨC HỢP <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-red-500">GRAND RIVERSIDE</span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Tuyệt tác không gian sống xanh chuẩn quốc tế quy mô 120ha bên hồ cảnh quan, tích hợp hơn 100+ tiện ích 5 sao đặc quyền và hệ thống Smart City tiên tiến.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              const el = document.getElementById('masterplan-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('can-ho');
            }}
            className="px-8 py-4 rounded-sm bg-[#D8232A] hover:bg-[#b91c1c] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-2xl shadow-red-900/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Khám Phá Mặt Bằng Dự Án <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-7 py-4 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Play size={16} className="text-red-400 fill-red-400" /> Xem Video Flycam 3D
          </button>
        </div>

        {/* Floating Metrics Pill */}
        <div className="pt-6">
          <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-2xl text-left">
            <div className="px-3 border-r border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Quy Mô Dự Án</span>
              <span className="text-base sm:text-lg font-black text-amber-400">120 Hecta</span>
            </div>
            <div className="px-3 border-r border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Mật Độ Xây Dựng</span>
              <span className="text-base sm:text-lg font-black text-emerald-400">Chỉ 26.8%</span>
            </div>
            <div className="px-3 border-r border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Công Viên & Biển Hồ</span>
              <span className="text-base sm:text-lg font-black text-cyan-400">12 Hecta</span>
            </div>
            <div className="px-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pháp Lý Sở Hữu</span>
              <span className="text-base sm:text-lg font-black text-red-400">Sổ Hồng Lâu Dài</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: TỔNG QUAN DỰ ÁN & HỒ SƠ PHÁP LÝ (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="overview-section" className="py-20 bg-white text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
            ★ THÔNG TIN MINH BẠCH & PHÁP LÝ HOÀN THIỆN ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            TỔNG QUAN QUY HOẠCH DỰ ÁN
          </h2>
          <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Table / Bullets */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white text-slate-900 border border-slate-200 rounded-sm p-6 sm:p-8 space-y-3.5 shadow-sm font-medium">
              {[
                { label: 'Tên Thương Mại', val: 'Khu Đô Thị Sinh Thái Grand Riverside Park' },
                { label: 'Vị Trí Quy Hoạch', val: 'Mặt tiền Đại lộ ven sông & Tuyến Vành Đai huyết mạch' },
                { label: 'Chủ Đầu Tư', val: 'Tập đoàn Bất Động Sản Quốc Tế Hàng Đầu' },
                { label: 'Tổng Quy Mô', val: '120 Hecta (Gồm 6 phân khu cao tầng & thấp tầng)' },
                { label: 'Mật Độ Xây Dựng', val: '26.8% (Dành 73.2% cho cây xanh, hồ nước và tiện ích)' },
                { label: 'Loại Hình Sản Phẩm', val: 'Căn hộ 1-3PN, Penthouse Duplex, Shophouse, Nhà phố, Biệt thự' },
                { label: 'Quy Mô Sản Phẩm', val: '3.500 căn hộ cao cấp + 450 căn nhà phố shophouse & biệt thự' },
                { label: 'Hệ Thống Tiện Ích', val: '100+ Tiện ích đặc quyền 5 sao (Hồ bơi tràn, Golf 3D, Bến du thuyền)' },
                { label: 'Hình Thức Sở Hữu', val: 'Sổ hồng lâu dài (Người Việt Nam) / 50 năm (Người nước ngoài)' },
                { label: 'Thời Gian Bàn Giao', val: 'Dự kiến Quý IV/2026 (Hoàn thiện nội thất cao cấp)' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-200/60 pb-2.5 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    <Check size={12} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                    <span className="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">{item.label}:</span>
                    <span className="font-extrabold text-slate-800 sm:col-span-8">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => { setLeadModalTitle('TẢI TRỌN BỘ HỒ SƠ PHÁP LÝ & BẢNG GIÁ GỐC'); setLeadModalOpen(true); }}
                className="px-8 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-red-900/30 uppercase tracking-wider transition-all hover:scale-105"
              >
                Tải Trọn Bộ Hồ Sơ Pháp Lý & Bảng Giá
              </button>
            </div>
          </div>

          {/* Right Video / Flycam Preview Card */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => setVideoModalOpen(true)}
              className="relative rounded-md overflow-hidden shadow-2xl border-4 border-white group cursor-pointer aspect-video bg-slate-900"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
                alt="Video Preview"
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                <div className="w-16 h-16 rounded-sm bg-[#D8232A] text-white flex items-center justify-center shadow-2xl shadow-red-600/80 group-hover:scale-110 transition-transform">
                  <Play size={28} className="fill-white translate-x-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-sm border border-slate-700 text-white text-xs">
                <span className="font-bold block text-amber-300">FLYCAM TIẾN ĐỘ THỰC TẾ 2026</span>
                <span className="opacity-70 text-[11px]">Bấm vào để xem toàn cảnh quy hoạch 120ha và cảnh quan hồ sinh thái</span>
              </div>
            </div>

            <div className="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
              <Shield size={22} className="text-amber-600 flex-shrink-0" />
              <div>
                <strong className="block">Bảo Lãnh Tiến Độ & Hỗ Trợ Vay Ngân Hàng</strong>
                <span className="opacity-80 text-[11px]">Được bảo lãnh tiến độ bởi Vietcombank & MB Bank. Hỗ trợ vay 70% giá trị hợp đồng.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ KIM CƯƠNG & LIÊN KẾT VÙNG (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="location-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-red-400 uppercase tracking-widest block">
            ★ TÂM ĐIỂM GIAO THƯƠNG KẾT NỐI KHÔNG GIỚI HẠN ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            VỊ TRÍ KIM CƯƠNG & LIÊN KẾT VÙNG
          </h2>
          <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
          <p className="text-xs sm:text-sm text-slate-300 pt-2">
            Tọa lạc tại mặt tiền trục đại lộ ven hồ huyết mạch, kết nối trực tiếp với tuyến Metro và các tuyến cao tốc trọng điểm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Connectivity Diagram */}
          <div className="lg:col-span-6 rounded-md overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl p-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
                alt="Location Map Diagram"
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/50 flex flex-col justify-between p-6">
                <div className="inline-block self-start px-3.5 py-1.5 rounded-lg bg-[#D8232A] text-white text-xs font-black shadow-md">
                  📍 VỊ TRÍ {company?.name || 'TEMPLATESBDS'}
                </div>
                <div className="bg-slate-950/90 backdrop-blur-md p-4 rounded-sm border border-slate-700 text-xs space-y-1">
                  <strong className="text-amber-300 block font-black">MẶT TIỀN ĐẠI LỘ GRAND BOULEVARD</strong>
                  <p className="text-slate-300 text-[11px]">
                    Nằm ngay cửa ngõ kết nối khu đô thị vệ tinh với trung tâm tài chính và các khu công nghệ cao.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Distance Milestones */}
          <div className="lg:col-span-6 space-y-3.5">
            {[
              { time: '3 Phút', title: 'Tuyến Metro Số 1 & Bến Xe Trung Tâm', desc: 'Kết nối trực tiếp ga metro ngầm, di chuyển nhanh chóng vào lõi đô thị.' },
              { time: '5 Phút', title: 'Đại Siêu Thị Aeon Mall & Trung Tâm Hành Chính', desc: 'Thiên đường mua sắm, giải trí và trung tâm dịch vụ công cộng hiện đại.' },
              { time: '10 Phút', title: 'Bệnh Viện Đa Khoa Quốc Tế & Cụm Trường Đại Học', desc: 'Tiếp cận hệ thống chăm sóc sức khỏe 5 sao và các trường đại học quốc tế.' },
              { time: '15 Phút', title: 'Trung Tâm Tài Chính Quận 1 & Sân Bay Quốc Tế', desc: 'Hạ tầng cao tốc thông thoáng giúp di chuyển đến sân bay cực kỳ thuận tiện.' },
              { time: '20 Phút', title: 'Khu Công Nghệ Cao & Các Khu Công Nghiệp Trọng Điểm', desc: 'Điểm đến lý tưởng cho các chuyên gia, kỹ sư và quản lý cấp cao an cư.' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 sm:p-5 rounded-sm bg-slate-800/80 border border-slate-700/80 hover:border-red-500/80 transition-all flex items-start gap-4 hover:translate-x-1"
              >
                <div className="w-16 h-12 rounded-sm bg-gradient-to-br from-[#D8232A] to-[#991B1B] text-white flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg shadow-red-950">
                  <Clock size={12} className="text-amber-300 mb-0.5" />
                  <span className="text-xs leading-none">{item.time}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-2 text-center sm:text-left">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-bold rounded-sm shadow-lg uppercase tracking-wider transition-all"
              >
                <MapPin size={16} /> Xem Vị Trí Trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: MẶT BẰNG TỔNG THỂ & CATALOG CĂN HỘ (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderMasterplanSection = () => {
    const apartmentList = activeProperties.filter(p => p.category === 'can-ho');

    return (
      <section id="masterplan-section" className="py-20 bg-slate-50 text-slate-900">
        <div className={`${MAX_W} mx-auto px-4`}>
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
              ★ QUY HOẠCH ĐỒNG BỘ — THIẾT KẾ ĐỘT PHÁ ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              MẶT BẰNG TỔNG THỂ & THIẾT KẾ CĂN HỘ
            </h2>
            <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
            <p className="text-xs sm:text-sm text-slate-600 pt-2">
              Sơ đồ phân khu 120ha cùng thiết kế căn hộ tối ưu công năng, 100% các phòng đều có cửa sổ và ban công đón sáng tự nhiên.
            </p>
          </div>

          {/* Masterplan Zone Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'tong-the', label: 'TỔNG THỂ 120HA' },
              { id: 'sapphire', label: 'THÁP SAPPHIRE S1-S2' },
              { id: 'ruby', label: 'THÁP RUBY R1-R2' },
              { id: 'diamond', label: 'THÁP DIAMOND VIP' },
              { id: 'thap-tang', label: 'PHÂN KHU THẤP TẦNG' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMasterplanTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-sm text-xs font-extrabold tracking-wider transition-all uppercase ${
                  activeMasterplanTab === tab.id
                    ? 'bg-[#D8232A] text-white shadow-lg shadow-red-900/30 scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Masterplan CAD Graphic */}
          <div className="bg-white rounded-md p-4 sm:p-6 border border-slate-200 shadow-md mb-14">
            <div className="relative aspect-[21/9] rounded-sm overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
                alt="Masterplan CAD Floorplan"
                onError={handleImgError}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="px-3 py-1 bg-[#D8232A] text-[10px] font-black uppercase rounded-md inline-block">
                    {activeMasterplanTab.toUpperCase()}
                  </span>
                  <h3 className="text-base sm:text-xl font-black">
                    Sơ Đồ Phân Khu Quy Hoạch Chi Tiết 1/500 Chuẩn Quốc Tế
                  </h3>
                  <p className="text-xs text-slate-300 hidden sm:block">
                    Khoảng cách giữa các tòa tháp từ 45m - 80m đảm bảo tối đa sự riêng tư và tầm nhìn thoáng đãng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Apartment Catalog (4 Units Grid) */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">CATALOG CĂN HỘ ĐIỂN HÌNH</h3>
                <span className="text-xs text-slate-500 font-medium">Bấm chọn loại căn hộ để xem layout chi tiết và báo giá</span>
              </div>
              <button 
                onClick={() => navigate('can-ho')}
                className="text-xs font-bold text-[#D8232A] hover:underline flex items-center gap-1"
              >
                Xem tất cả {apartmentList.length} căn hộ <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {apartmentList.map((apt, idx) => (
                <div
                  key={apt.id}
                  onClick={() => handleOpenProperty(apt)}
                  className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={apt.image}
                      alt={apt.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">
                      {apt.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">
                      {apt.price}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">{apt.zone} • {apt.floor}</span>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">
                        {apt.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Diện tích</span>
                        <strong className="text-slate-800 font-extrabold">{apt.area}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Phòng ngủ</span>
                        <strong className="text-slate-800 font-extrabold">{apt.bedrooms} PN</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Vệ sinh</span>
                        <strong className="text-slate-800 font-extrabold">{apt.bathrooms} WC</strong>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProperty(apt);
                      }}
                      className="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center"
                    >
                      Xem Chi Tiết Căn Hộ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Virtual 3D VR Interior Tours */}
          <div className="bg-slate-900 text-white rounded-md p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">3D VIRTUAL REALITY EXPERIENCE</span>
              <h3 className="text-xl sm:text-2xl font-black">TRẢI NGHIỆM KHÔNG GIAN NỘI THẤT 3D THỰC TẾ ẢO</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: 'Phòng Khách Panorama Sang Trọng', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', desc: 'Trần cao 3.2m ngập tràn ánh sáng' },
                { title: 'Phòng Ngủ Master Đậm Chất Nghỉ Dưỡng', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', desc: 'Sàn gỗ cao cấp & View hồ thoáng đãng' },
                { title: 'Khu Bếp & Phòng Ăn Tiện Nghi Chuẩn Đức', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', desc: 'Bếp đảo đá tự nhiên & Thiết bị Hafele' },
              ].map((tour, i) => (
                <div 
                  key={i} 
                  onClick={() => setVideoModalOpen(true)}
                  className="rounded-sm overflow-hidden bg-slate-800 border border-slate-700 group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={tour.img} alt={tour.title} onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-sm bg-[#D8232A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={20} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-extrabold text-sm text-slate-100">{tour.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{tour.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: PHÂN KHU NHÀ PHỐ & SHOPHOUSE (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLowRiseSection = () => {
    const lowRiseList = activeProperties.filter(p => ['shophouse', 'nha-pho', 'biet-thu'].includes(p.category));

    return (
      <section id="lowrise-section" className="py-20 bg-white text-slate-900">
        <div className={`${MAX_W} mx-auto px-4`}>
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
              ★ TUYỆT TÁC THẤP TẦNG — KHẲNG ĐỊNH VỊ THẾ ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              PHÂN KHU NHÀ PHỐ & SHOPHOUSE THƯƠNG MẠI
            </h2>
            <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
            <p className="text-xs sm:text-sm text-slate-600 pt-2">
              Dãy Shophouse mặt tiền đại lộ 30m sầm uất và các căn biệt thự ven hồ sinh thái mang lại giá trị gia tăng vô hạn.
            </p>
          </div>

          {/* High-res Boulevard 3D Banner */}
          <div className="relative rounded-md overflow-hidden shadow-xl mb-12 aspect-[21/9] bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1400&q=80"
              alt="Shophouse Boulevard"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white space-y-2">
                <span className="px-3.5 py-1 bg-[#D8232A] text-xs font-black uppercase rounded-lg shadow inline-block">
                  PHỐ ĐI BỘ & ĐẠI LỘ THƯƠNG MẠI 30M
                </span>
                <h3 className="text-lg sm:text-3xl font-black">
                  Tâm Điểm Kinh Doanh Sầm Uất Cho Hơn 30.000 Cư Dân
                </h3>
              </div>
            </div>
          </div>

          {/* 4 Low-rise Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lowRiseList.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenProperty(item)}
                className="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">
                    {item.price}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{item.categoryLabel} • {item.zone}</span>
                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Diện tích</span>
                      <strong className="text-slate-800 font-extrabold">{item.area}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Số phòng</span>
                      <strong className="text-slate-800 font-extrabold">{item.bedrooms} PN</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Số tầng</span>
                      <strong className="text-slate-800 font-extrabold">{item.floor.split(' ')[0]}</strong>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProperty(item);
                    }}
                    className="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center"
                  >
                    Xem Báo Giá & Mặt Bằng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP 5 SAO (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenitiesSection = () => (
    <section id="amenities-section" className="py-20 bg-slate-900 text-white">
      <div className={`${MAX_W} mx-auto px-4`}>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-red-400 uppercase tracking-widest block">
            ★ TRẢI NGHIỆM SỐNG NGHỈ DƯỠNG MỖI NGÀY ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP ĐẶC QUYỀN
          </h2>
          <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
          <p className="text-xs sm:text-sm text-slate-300 pt-2">
            Hơn 100+ tiện ích nội khu được thiết kế khép kín tiêu chuẩn quốc tế, đáp ứng trọn vẹn nhu cầu vui chơi, giải trí, sức khỏe và giáo dục.
          </p>
        </div>

        {/* 6 Grid Amenity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS06_AMENITIES.map(amenity => (
            <div
              key={amenity.id}
              onClick={() => navigate('tien-ich')}
              className="bg-slate-800 rounded-sm overflow-hidden border border-slate-700 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">
                  {amenity.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="font-extrabold text-base text-slate-100 group-hover:text-red-400 transition-colors">
                  {amenity.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed break-words">
                  {amenity.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => navigate('tien-ich')}
            className="px-8 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-red-950 uppercase tracking-wider transition-all hover:scale-105"
          >
            Đăng Ký Trải Nghiệm Hệ Thống Tiện Ích
          </button>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: CHÍNH SÁCH BÁN HÀNG & BẢNG TÍNH LÃI SUẤT VAY (MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPoliciesAndMortgageSection = () => (
    <section id="policy-mortgage-section" className="py-20 bg-slate-50 text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
            ★ ƯU ĐÃI KHỦNG — HỖ TRỢ TÀI CHÍNH TỐI ĐA ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            CHÍNH SÁCH BÁN HÀNG & BẢNG TÍNH VAY
          </h2>
          <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: 6 Policy Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles size={20} className="text-[#D8232A]" /> CHÍNH SÁCH ƯU ĐÃI ĐỢT 1 TỪ CHỦ ĐẦU TƯ
              </h3>

              <div className="space-y-3">
                {[
                  'Chiết khấu thanh toán sớm lên tới 10% trực tiếp vào giá trị hợp đồng mua bán.',
                  'Hỗ trợ vay vốn ngân hàng lên đến 70% giá trị căn hộ với lãi suất 0% trong 24 tháng.',
                  'Ân hạn nợ gốc và miễn phí trả nợ trước hạn trong suốt thời gian hỗ trợ lãi suất.',
                  'Tặng ngay gói hoàn thiện nội thất cao cấp trị giá 120 - 200 triệu đồng cho 50 khách hàng đầu tiên.',
                  'Miễn phí hoàn toàn 3 năm phí quản lý dịch vụ vận hành quốc tế.',
                  'Cam kết thuê lại 8%/năm đối với giỏ hàng Shophouse thương mại đại lộ.'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      <Check size={12} />
                    </div>
                    <p className="text-slate-700 font-semibold leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              {/* 3 Special Gift Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-red-600 block">Quà Tặng Vàng</span>
                  <strong className="text-xs text-red-950 font-black">1 LƯỢNG VÀNG SJC</strong>
                </div>
                <div className="p-3.5 rounded-sm bg-amber-50 border border-amber-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-amber-600 block">Du Lịch 5 Sao</span>
                  <strong className="text-xs text-amber-950 font-black">VOUCHER CHÂU ÂU</strong>
                </div>
                <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Nội Thất An Cường</span>
                  <strong className="text-xs text-emerald-950 font-black">GÓI 150 TRIỆU</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Lead Capture Form */}
          <div id="lead-form-section" className="lg:col-span-5 bg-[#0F172A] text-white rounded-md p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">BOOKING & TƯ VẤN TRỰC TIẾP</span>
              <h3 className="text-xl font-black">ĐĂNG KÝ NHẬN BẢNG GIÁ VIP</h3>
              <p className="text-xs text-slate-400">Chuyên viên CĐT sẽ gửi bảng giá chi tiết & mặt bằng qua Zalo trong 3 phút.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Họ và tên (*)</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Số điện thoại / Zalo (*)</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0919 006 030"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs font-bold text-red-400 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Dòng sản phẩm quan tâm</label>
                <select
                  value={leadForm.productType}
                  onChange={e => setLeadForm({ ...leadForm, productType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-red-500"
                >
                  <option className="text-slate-900 bg-white font-medium" value="Căn hộ 1PN+1">Căn hộ 1 Phòng Ngủ (1PN + 1)</option>
                  <option className="text-slate-900 bg-white font-medium" value="Căn hộ 2PN">Căn hộ 2 Phòng Ngủ Park View</option>
                  <option className="text-slate-900 bg-white font-medium" value="Căn hộ 3PN Master">Căn hộ 3 Phòng Ngủ Master</option>
                  <option className="text-slate-900 bg-white font-medium" value="Penthouse Sky Villa">Penthouse Sky Villa Duplex</option>
                  <option className="text-slate-900 bg-white font-medium" value="Shophouse Đại Lộ">Shophouse Đại Lộ 30m</option>
                  <option className="text-slate-900 bg-white font-medium" value="Biệt thự ven hồ">Biệt Thự Ven Hồ Sinh Thái</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-black rounded-sm shadow-lg shadow-red-950 uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
              >
                Gửi Yêu Cầu Nhận Báo Giá Ngay
              </button>

              <p className="text-[10px] text-center text-slate-400">
                🔒 Cam kết bảo mật thông tin 100% theo tiêu chuẩn chủ đầu tư.
              </p>
            </form>
          </div>
        </div>

        {/* Realtime Mortgage Calculator Widget */}
        <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center font-black">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">BẢNG TÍNH LÃI SUẤT VAY NGÂN HÀNG THỜI GIAN THỰC</h3>
              <span className="text-xs text-slate-500 font-medium">Tự động tính toán số tiền vay, gốc + lãi hàng tháng và tổng lãi phải trả</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders / Inputs */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Giá trị bất động sản:</span>
                  <span className="text-red-600 font-black">{loanPropertyPrice} Tỷ VNĐ</span>
                </div>
                <input
                  type="range"
                  min={1.5}
                  max={35.0}
                  step={0.1}
                  value={loanPropertyPrice}
                  onChange={e => setLoanPropertyPrice(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Tỷ lệ vay vốn</label>
                  <select
                    value={loanPercent}
                    onChange={e => setLoanPercent(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-red-500"
                  >
                    <option className="text-slate-900 bg-white font-medium" value={50}>50% Giá trị BĐS</option>
                    <option className="text-slate-900 bg-white font-medium" value={70}>70% Giá trị BĐS (Chuẩn)</option>
                    <option className="text-slate-900 bg-white font-medium" value={80}>80% Giá trị BĐS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Thời hạn vay</label>
                  <select
                    value={loanYears}
                    onChange={e => setLoanYears(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-red-500"
                  >
                    <option className="text-slate-900 bg-white font-medium" value={10}>10 Năm (120 Tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={15}>15 Năm (180 Tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={20}>20 Năm (240 Tháng)</option>
                    <option className="text-slate-900 bg-white font-medium" value={25}>25 Năm (300 Tháng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Lãi suất (% / Năm)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={loanRate}
                    onChange={e => setLoanRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-sm space-y-4 shadow-xl border border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Số tiền vay ngân hàng:</span>
                <strong className="text-xl font-black text-amber-400">{mortgageCalc.loanAmountBillions} Tỷ VNĐ</strong>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gốc + Lãi tháng đầu:</span>
                  <strong className="text-base font-black text-emerald-400">{mortgageCalc.firstMonthTotalMillion} Tr/tháng</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gốc cố định:</span>
                  <strong className="text-base font-black text-slate-200">{mortgageCalc.monthlyPrincipalMillion} Tr/tháng</strong>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ước tính tổng lãi phải trả:</span>
                <strong className="text-sm font-black text-slate-300">{mortgageCalc.totalInterestBillions} Tỷ VNĐ</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: THƯ VIỆN ẢNH & TIẾN ĐỘ THỰC TẾ (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderGallerySection = () => {
    const galleryImgs = [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
    ];

    return (
      <section id="gallery-section" className="py-20 bg-white text-slate-900">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
              ★ HÌNH ẢNH SỐNG ĐỘNG & TIẾN ĐỘ CHUẨN XÁC ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              THƯ VIỆN HÌNH ẢNH & TIẾN ĐỘ THỰC TẾ
            </h2>
            <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {galleryImgs.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(img)}
                className="relative aspect-square rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-slate-100"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  onError={handleImgError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Construction Progress Highlight Badge */}
          <div className="p-6 rounded-md bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-[#D8232A] text-white flex items-center justify-center font-black flex-shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <strong className="block text-base font-extrabold">Tiến Độ Thi Công Thực Tế: Tháng 08/2026</strong>
                <span className="text-xs text-slate-300">Đã hoàn thành 100% móng hầm & hạ tầng công viên. Tháp Sapphire & Ruby đang thi công lên tầng 18.</span>
              </div>
            </div>
            <button
              onClick={() => navigate('tin-tuc')}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-sm border border-slate-700 whitespace-nowrap"
            >
              Xem Báo Cáo Tiến Độ
            </button>
          </div>
        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 8: TIN TỨC & BÀI VIẾT MỚI NHẤT (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsSection = () => (
    <section id="news-section" className="py-20 bg-slate-50 text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
            ★ CẬP NHẬT THÔNG TIN THỊ TRƯỜNG & DỰ ÁN ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            TIN TỨC & BÀI VIẾT MỚI NHẤT
          </h2>
          <div className="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS06_NEWS.map(art => (
            <article
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={art.image}
                  alt={art.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">
                  {art.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {art.views} lượt xem</span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#D8232A]">
                  <span>Đọc tiếp bài viết</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUBPAGE: PROPERTY DETAIL VIEW (`/chi-tiet/:slug`)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyDetailPage = () => (
    <div className="py-12 bg-slate-50 text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onClick={() => navigate('home')} className="hover:text-red-600">Trang Chủ</button>
          <span>/</span>
          <button onClick={() => navigate(selectedProperty.category)} className="hover:text-red-600">{selectedProperty.categoryLabel}</button>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-xs">{selectedProperty.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details Left */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#D8232A] text-white text-xs font-black uppercase">
                    {selectedProperty.badge}
                  </span>
                  <span className="text-xs font-extrabold text-slate-500 uppercase">{selectedProperty.zone} • {selectedProperty.floor}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedProperty.title}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500 flex-shrink-0" /> {selectedProperty.location}
                </p>
              </div>

              {/* Gallery Switcher */}
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="amber" />

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-sm bg-slate-50 border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Diện tích</span>
                  <strong className="text-sm sm:text-base font-extrabold text-slate-800">{selectedProperty.area}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phòng ngủ</span>
                  <strong className="text-sm sm:text-base font-extrabold text-slate-800">{selectedProperty.bedrooms} PN</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phòng tắm</span>
                  <strong className="text-sm sm:text-base font-extrabold text-slate-800">{selectedProperty.bathrooms} WC</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Hướng ban công</span>
                  <strong className="text-sm sm:text-base font-extrabold text-red-600">{selectedProperty.direction}</strong>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">MÔ TẢ CHI TIẾT SẢN PHẨM</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedProperty.desc}</p>
                <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-900 text-xs font-bold">
                  🎁 {selectedProperty.highlight}
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">THÔNG SỐ TIÊU CHUẨN BÀN GIAO</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProperty.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Form */}
            <div className="bg-[#0F172A] text-white rounded-md p-6 shadow-xl border border-slate-800 space-y-4 sticky top-24">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">CHUYÊN VIÊN TƯ VẤN SENIOR</span>
                <h3 className="text-lg font-black">YÊU CẦU BÁO GIÁ CĂN NÀY</h3>
                <p className="text-xs text-slate-400">Gửi mặt bằng CAD & bảng tính thanh toán chi tiết.</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Họ và tên..."
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại / Zalo..."
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs font-bold text-red-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-black rounded-sm shadow uppercase tracking-wider transition-all"
                >
                  Nhận Báo Giá Chi Tiết
                </button>
              </form>

              <div className="pt-3 border-t border-slate-800 text-center">
                <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-xs font-bold text-emerald-400 hover:underline flex items-center justify-center gap-1.5">
                  <Phone size={14} className="animate-pulse" /> Hotline 24/7: 0919 006 030
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUBPAGE: ARTICLE DETAIL VIEW (`/tin-tuc/:slug`)
  // ─────────────────────────────────────────────────────────────────────────
  const renderArticleDetailPage = () => (
    <div className="py-12 bg-slate-50 text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onClick={() => navigate('home')} className="hover:text-red-600">Trang Chủ</button>
          <span>/</span>
          <button onClick={() => navigate('tin-tuc')} className="hover:text-red-600">Tin Tức</button>
          <span>/</span>
          <span className="text-slate-800 truncate">{selectedArticle.title}</span>
        </div>

        <article className="bg-white rounded-md p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-[#D8232A] text-white text-xs font-black uppercase rounded-lg inline-block">
              {selectedArticle.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-bold border-b border-slate-100 pb-4">
              <span className="flex items-center gap-1"><Calendar size={13} /> {selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User size={13} /> {selectedArticle.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye size={13} /> {selectedArticle.views} lượt xem</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-slate-100">
            <img src={selectedArticle.image} alt={selectedArticle.title} onError={handleImgError} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            <p className="font-bold text-slate-900 text-base sm:text-lg italic border-l-4 border-[#D8232A] pl-4 py-1">
              {selectedArticle.excerpt}
            </p>
            {selectedArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Author info & share */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center font-black">
                <User size={20} />
              </div>
              <div>
                <strong className="block text-xs font-extrabold text-slate-900">{selectedArticle.author}</strong>
                <span className="text-[11px] text-slate-500">Ban Truyền Thông & Quản Lý Dự Án</span>
              </div>
            </div>

            <button
              onClick={() => navigate('tin-tuc')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-sm"
            >
              ← Quay Lại Danh Sách Tin Tức
            </button>
          </div>
        </article>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUBPAGE: CONSIGNMENT FORM (`/ky-gui`)
  // ─────────────────────────────────────────────────────────────────────────
  const renderConsignmentPage = () => (
    <div className="py-12 bg-slate-50 text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl space-y-8`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">
            ★ DỊCH VỤ MÔI GIỚI & CHUYỂN NHƯỢNG UY TÍN ★
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
            KÝ GỬI MUA BÁN & CHO THUÊ BẤT ĐỘNG SẢN
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Hỗ trợ định giá chính xác, thanh khoản nhanh chóng và bảo mật thông tin tuyệt đối.
          </p>
        </div>

        <form onSubmit={handleConsignSubmit} className="bg-white rounded-md p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Họ & Tên Gia Chủ (*)</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Trần Văn B"
                value={consignForm.name}
                onChange={e => setConsignForm({ ...consignForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Số Điện Thoại / Zalo (*)</label>
              <input
                type="tel"
                required
                placeholder="Ví dụ: 0919 006 030"
                value={consignForm.phone}
                onChange={e => setConsignForm({ ...consignForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold text-red-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Loại Bất Động Sản</label>
              <select
                value={consignForm.type}
                onChange={e => setConsignForm({ ...consignForm, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold focus:outline-none"
              >
                <option className="text-slate-900 bg-white font-medium" value="Căn hộ cao cấp">Căn hộ cao cấp</option>
                <option className="text-slate-900 bg-white font-medium" value="Shophouse thương mại">Shophouse thương mại</option>
                <option className="text-slate-900 bg-white font-medium" value="Nhà phố liền kề">Nhà phố liền kề</option>
                <option className="text-slate-900 bg-white font-medium" value="Biệt thự sinh thái">Biệt thự sinh thái</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mức Giá Kỳ Vọng (Tỷ VNĐ)</label>
              <input
                type="text"
                placeholder="Ví dụ: 3.5 Tỷ hoặc Cho thuê 20Tr/th"
                value={consignForm.expectedPrice}
                onChange={e => setConsignForm({ ...consignForm, expectedPrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Địa Chỉ Chi Tiết BĐS (*)</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Căn hộ S1.12A08 Tháp Sapphire, Grand Riverside Park..."
              value={consignForm.address}
              onChange={e => setConsignForm({ ...consignForm, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Ghi Chú Thêm</label>
            <textarea
              rows={3}
              placeholder="Tình trạng nội thất, pháp lý sổ hồng, thời gian có thể xem nhà..."
              value={consignForm.note}
              onChange={e => setConsignForm({ ...consignForm, note: e.target.value })}
              className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-black rounded-sm shadow-lg uppercase tracking-wider transition-all hover:scale-105"
          >
            Xác Nhận Ký Gửi Bất Động Sản Ngay
          </button>
        </form>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 11. MAIN BODY ROUTING CONTROLLER
  // ─────────────────────────────────────────────────────────────────────────
  const renderMainContent = () => {
    switch (currentPage) {
      case 'can-ho':
      case 'apartments':
      case 'shophouse':
      case 'nha-pho':
      case 'biet-thu':
      case 'villas':
        return (
          <div className="py-12 bg-slate-50 text-slate-900">
            <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">DANH MỤC SẢN PHẨM</span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase">
                  {currentPage === 'can-ho' ? 'CĂN HỘ CAO CẤP' :
                   currentPage === 'shophouse' ? 'SHOPHOUSE THƯƠNG MẠI' :
                   currentPage === 'biet-thu' || currentPage === 'villas' ? 'BIỆT THỰ SINH THÁI' : 'NHÀ PHỐ LIỀN KỀ'}
                </h1>
              </div>

              {/* Catalog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCatalog.map(prop => (
                  <div
                    key={prop.id}
                    onClick={() => handleOpenProperty(prop)}
                    className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={prop.image} alt={prop.title} onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">{prop.badge}</div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">{prop.price}</div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">{prop.categoryLabel} • {prop.zone}</span>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">{prop.title}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                        <div><span className="text-[10px] text-slate-400 block">Diện tích</span><strong>{prop.area}</strong></div>
                        <div><span className="text-[10px] text-slate-400 block">Số phòng</span><strong>{prop.bedrooms} PN</strong></div>
                        <div><span className="text-[10px] text-slate-400 block">Vệ sinh</span><strong>{prop.bathrooms} WC</strong></div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleOpenProperty(prop); }} className="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow uppercase tracking-wider text-center">Xem Chi Tiết</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tien-ich':
      case 'amenities':
        return (
          <div>
            {renderAmenitiesSection()}
          </div>
        );

      case 'chinh-sach':
      case 'policies':
        return (
          <div>
            {renderPoliciesAndMortgageSection()}
          </div>
        );

      case 'thu-vien':
      case 'gallery':
        return (
          <div>
            {renderGallerySection()}
          </div>
        );

      case 'tin-tuc':
      case 'news':
        return (
          <div>
            {renderNewsSection()}
          </div>
        );

      case 'property-detail':
        return renderPropertyDetailPage();

      case 'news-detail':
        return renderArticleDetailPage();

      case 'ky-gui':
        return renderConsignmentPage();

      case 'about':
      case 'gioi-thieu':
      case 'lien-he':
      case 'contact':
        return (
          <div className="py-12 bg-slate-50 text-slate-900">
            <div className={`${MAX_W} mx-auto px-4 space-y-12`}>
              {renderOverviewSection()}
              {renderLocationSection()}
            </div>
          </div>
        );

      case 'home':
      default:
        return (
          <>
            {renderHero()}
            {renderOverviewSection()}
            {renderLocationSection()}
            {renderMasterplanSection()}
            {renderLowRiseSection()}
            {renderAmenitiesSection()}
            {renderPoliciesAndMortgageSection()}
            {renderGallerySection()}
            {renderNewsSection()}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-md overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-slate-800 text-white hover:bg-red-600 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Grand Riverside Park Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh] rounded-sm overflow-hidden shadow-2xl border-2 border-white/20">
            <img src={lightboxImg} alt="Lightbox Zoom" onError={handleImgError} className="w-full h-full object-contain" />
          </div>
        </div>
      )}

      {/* Sticky Header */}
      {renderHeader()}

      {/* Main Dynamic Content Area (Zero White Gap Structure) */}
      <main className="flex-1 w-full">
        {renderMainContent()}
      </main>

      
      {/* Lead Form Modal */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-md p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900">
            <button 
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm hover:bg-slate-100 text-slate-500"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-[#D8232A] uppercase tracking-wider">HỆ THỐNG PHÂN PHỐI TRỰC TIẾP</span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{leadModalTitle}</h3>
              <p className="text-xs text-slate-500">Chuyên viên tư vấn sẽ gửi trọn bộ file PDF qua Zalo trong 3 phút.</p>
            </div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!leadForm.phone) {
                  alert('Vui lòng nhập số điện thoại để nhận tài liệu!');
                  return;
                }
                try {
                  const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
                  await fetch(`${API_URL}/api/marketplace/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fullName: leadForm.name.trim() || 'Khách nhận tài liệu BDS-06',
                      phone: leadForm.phone.trim(),
                      email: leadForm.email.trim(),
                      selectedTemplate: 'bds-06',
                      packageInterest: leadModalTitle,
                      message: 'Yêu cầu tải: ' + leadModalTitle,
                    }),
                  });
                } catch {}
                setLeadModalOpen(false);
                showToast(`🎉 Tiếp nhận yêu cầu của ${leadForm.name || 'Quý khách'} (${leadForm.phone}). Bảng giá & tài liệu sẽ gửi qua Zalo trong 3 phút!`);
                setLeadForm({ name: '', phone: '', email: '', note: '', productType: 'Căn hộ 2 Phòng Ngủ' });
              }} 
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên của bạn</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn Nam"
                  value={leadForm.name}
                  onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại / Zalo <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="VD: 0919 006 030"
                  value={leadForm.phone}
                  onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email nhận file PDF</label>
                <input
                  type="email"
                  placeholder="VD: email@gmail.com"
                  value={leadForm.email}
                  onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#D8232A] hover:bg-[#b91c1c] text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition"
              >
                Gửi Yêu Cầu & Tải Tài Liệu Ngay
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Universal Footer with TEMPLATESBDS Branding & Floating Buttons */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-06 (Grand Riverside Eco-Township & Residential Resort)"
        onNavigate={navigate}
        zaloPhone="0919006030"
        hotlinePhone="0919 006 030"
      />
    </div>
  );
}
