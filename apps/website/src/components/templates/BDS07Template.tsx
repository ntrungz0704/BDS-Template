'use client';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  Trees, Coffee, Droplets, Sun, Wind, Mountain, Leaf, CheckCircle, Info
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
  category: 'dat-vuon' | 'bungalow' | 'biet-thu' | 'farmstay';
  categoryLabel: string;
  price: string;
  priceNum: number; // in billions
  area: string;
  areaNum: number;
  direction: string;
  location: string;
  zone: string;
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
// REAL DATA FOR BDS-07: PANNAMERA LÀNG SINH THÁI NGHỈ DƯỠNG ĐỒI CHÈ BẢO LỘC
// ─────────────────────────────────────────────────────────────────────────────

const BDS07_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: 'Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông Tuyệt Mỹ',
    slug: 'dat-vuon-san-may-view-doi-thong',
    category: 'dat-vuon',
    categoryLabel: 'Đất Vườn Săn Mây',
    price: '890 Triệu VNĐ',
    priceNum: 0.89,
    area: '250.0 m²',
    areaNum: 250.0,
    direction: 'Đông Nam',
    location: 'Phân Khu Săn Mây Cloud Hill, Làng Sinh Thái Pannamera Bảo Lộc',
    zone: 'Phân Khu Săn Mây A1',
    badge: 'SUẤT NGOẠI GIAO',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80'
    ],
    specs: [
      'Đã có sẵn 100m² thổ cư ODT lên sổ đỏ riêng',
      'Đường nhựa nội khu 8m, hệ thống điện nước âm tới tận đất',
      'Thế đất thoai thoải ngắm trọn biển mây bồng bềnh lúc bình minh',
      'Tặng gói thiết kế nhà vườn Bungalow gỗ sinh thái phong cách Bắc Âu'
    ],
    amenities: ['Săn mây sáng sớm', 'Suối tự nhiên', 'Đường nội khu 8m', 'Vườn hoa cẩm tú cầu'],
    desc: 'Lô đất vườn sở hữu cao độ lý tưởng 900m so với mực nước biển, tầm nhìn panorama 180 độ bao trọn thung lũng đồi chè và rừng thông nguyên sinh bát ngát.',
    highlight: 'Tặng ngay 1 chỉ vàng may mắn & Miễn phí 2 năm chăm sóc cây ăn trái'
  },
  {
    id: 2,
    title: 'Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh Bát Ngát',
    slug: 'lo-goc-2-mat-tien-suoi-tu-nhien-doi-che',
    category: 'dat-vuon',
    categoryLabel: 'Đất Vườn Sinh Thái',
    price: '1.25 Tỷ VNĐ',
    priceNum: 1.25,
    area: '350.0 m²',
    areaNum: 350.0,
    direction: 'Nam - Đông Nam',
    location: 'Trục đường Hoa Đỗ Quyên, Phân khu Riverside Village',
    zone: 'Phân Khu Ven Suối B2',
    badge: 'VIEW SUỐI HIẾM',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'
    ],
    specs: [
      'Lô góc 2 mặt tiền cực thoáng mát, ôm trọn dòng suối tự nhiên trong vắt',
      'Có sẵn 150m² thổ cư lâu dài, công chứng sang tên ngay trong ngày',
      'Vỉa hè lát đá hoa cỏ, hàng rào trà xanh được cắt tỉa định kỳ',
      'Thích hợp làm homestay nghỉ dưỡng hoặc quán cafe ngắm suối chill'
    ],
    amenities: ['Suối đá tự nhiên', 'Vỉa hè cỏ nhung', 'Hồ cá Koi', 'Khu nướng BBQ ngoài trời'],
    desc: 'Âm thanh suối róc rách hòa cùng làn gió cao nguyên mát lành tạo nên bản giao hưởng thư thái tuyệt đối cho tâm hồn sau những ngày làm việc căng thẳng.',
    highlight: 'Hỗ trợ vay ngân hàng 60% — Chiết khấu thanh toán nhanh 5%'
  },
  {
    id: 3,
    title: 'Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn',
    slug: 'bungalow-go-hoan-thien-full-san-vuon',
    category: 'bungalow',
    categoryLabel: 'Bungalow Nghỉ Dưỡng',
    price: '1.45 Tỷ VNĐ',
    priceNum: 1.45,
    area: '300.0 m²',
    areaNum: 300.0,
    direction: 'Đông',
    location: 'Trục đường Cối Xay Gió, Trung tâm Làng Sinh Thái Pannamera',
    zone: 'Phân Khu Trung Tâm C1',
    badge: 'XÂY SẴN CHÌA KHÓA TRAO TAY',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
    ],
    specs: [
      'Nhà gỗ 2 tầng phong cách Nordic: 2 phòng ngủ, 2WC, phòng khách mở',
      'Ban công kính Panorama rộng 25m² ngắm trọn bình minh thung lũng',
      'Sân vườn đã trồng sẵn hoa cẩm tú cầu, cây ăn trái và thảm cỏ xanh mướt',
      'Bàn giao đầy đủ nội thất gỗ cao cấp, bếp từ, máy nước nóng năng lượng'
    ],
    amenities: ['Nội thất cao cấp', 'Ban công Panorama', 'Vườn hoa riêng', 'Bãi đỗ ô tô'],
    desc: 'Căn nhà thứ hai hoàn mỹ để gia đình về nghỉ ngơi mỗi cuối tuần, đồng thời ủy thác cho chủ đầu tư vận hành homestay cho thuê sinh dòng tiền thụ động.',
    highlight: 'Cam kết thuê lại 12 triệu/tháng trong 2 năm — Tặng vườn hoa cẩm tú cầu'
  },
  {
    id: 4,
    title: 'Biệt Thự Vườn Sinh Thái Panorama View 360 Độ Đồi Chè',
    slug: 'biet-thu-vuon-sinh-thai-panorama-doi-che',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Đồi',
    price: '1.85 Tỷ VNĐ',
    priceNum: 1.85,
    area: '500.0 m²',
    areaNum: 500.0,
    direction: 'Đông Bắc',
    location: 'Đỉnh Đồi Hoàng Hôn Sunset Point, Pannamera',
    zone: 'Phân Khu Sunset Villa',
    badge: 'VIEW PANORAMA 360',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'
    ],
    specs: [
      'Khuôn viên đất 500m² vuông vức, mặt tiền 15m đường nhựa lớn',
      '200m² thổ cư sẵn có, quy hoạch đồng bộ làng sinh thái khép kín',
      'Hạ tầng thông minh: Camera an ninh 24/7, hệ thống tưới nước tự động',
      'View trực diện biểu tượng Cối Xay Gió và hồ điều hòa trung tâm'
    ],
    amenities: ['Cối xay gió', 'Camera an ninh', 'Hệ thống tưới tự động', 'Clubhouse trà đạo'],
    desc: 'Vị thế đỉnh đồi cao đón gió ngàn lộng lẫy, không gian riêng tư biệt lập xứng tầm nơi an dưỡng tuổi vàng hoặc chốn trở về của các chủ nhân yêu thiên nhiên.',
    highlight: 'Chiết khấu 8% khi thanh toán sớm — Tặng gói năng lượng mặt trời 50 triệu'
  },
  {
    id: 5,
    title: 'Khu Đất Farmstay Trồng Cây Ăn Trái & Vườn Dược Liệu 1000m²',
    slug: 'dat-farmstay-trong-cay-an-trai-vuon-duoc-lieu',
    category: 'farmstay',
    categoryLabel: 'Farmstay Nghỉ Dưỡng',
    price: '2.60 Tỷ VNĐ',
    priceNum: 2.60,
    area: '1000.0 m²',
    areaNum: 1000.0,
    direction: 'Đông Nam',
    location: 'Thung Lũng Xanh Green Valley, Pannamera',
    zone: 'Phân Khu Farmstay E1',
    badge: 'DIỆN TÍCH LỚN',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80'
    ],
    specs: [
      'Quy mô 1000m² đất vườn màu mỡ phù hợp trồng bơ 034, sầu riêng, chè Oolong',
      'Đã có sẵn nhà chòi gỗ nghỉ chân, ao cá nhỏ và hệ thống tưới tiêu',
      'Pháp lý sổ hồng công chứng ngay, có sẵn 100m² thổ cư',
      'Có đội ngũ kỹ sư nông nghiệp chăm sóc vườn cây định kỳ hàng tháng'
    ],
    amenities: ['Vườn cây ăn trái', 'Ao cá sinh thái', 'Chòi nghỉ chân gỗ', 'Dịch vụ chăm sóc vườn'],
    desc: 'Mô hình nông trại sinh thái kết hợp nghỉ dưỡng lý tưởng, mang đến nguồn thực phẩm hữu cơ sạch cho gia đình và trải nghiệm làm nông dân thực thụ cho con trẻ.',
    highlight: 'Tặng 50 cây ăn trái giống nhập khẩu + Hệ thống tưới nhỏ giọt Israel'
  },
  {
    id: 6,
    title: 'Biệt Thự Đơn Lập View Hồ Cá Koi & Rừng Thông Cổ Thụ',
    slug: 'biet-thu-don-lap-view-ho-ca-koi-rung-thong',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Đồi',
    price: '2.10 Tỷ VNĐ',
    priceNum: 2.10,
    area: '420.0 m²',
    areaNum: 420.0,
    direction: 'Nam',
    location: 'Đồi Thông Reo Pine Hill, Pannamera',
    zone: 'Phân Khu Đồi Thông D2',
    badge: 'KHÔNG GIAN XANH',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Mặt tiền rộng 14m hướng về dải rừng thông cổ thụ mát rượi',
      'Thổ cư 150m², xây dựng tự do không ép tiến độ',
      'Có hồ cá Koi Nhật Bản thiết kế theo chuẩn phong thủy tài lộc',
      'Đường thông tứ phía kết nối thẳng ra trục chính cao tốc'
    ],
    amenities: ['Hồ cá Koi', 'Rừng thông cổ thụ', 'Khu thiền định Yoga', 'Đường chạy bộ 2km'],
    desc: 'Không gian sống thanh tịnh ẩn mình dưới tán thông già, nơi mỗi buổi sớm thức giấc ngắm sương mù giăng kín lối và thưởng thức ly trà ấm thơm nồng.',
    highlight: 'Tặng ngay đàn cá Koi 20 con & Cảnh quan sân vườn trị giá 50 triệu'
  },
  {
    id: 7,
    title: 'Lô Đất VIP Cối Xay Gió Trung Tâm Làng Sinh Thái',
    slug: 'lo-dat-vip-coi-xay-gio-trung-tam',
    category: 'dat-vuon',
    categoryLabel: 'Đất Vườn Săn Mây',
    price: '2.90 Tỷ VNĐ',
    priceNum: 2.90,
    area: '600.0 m²',
    areaNum: 600.0,
    direction: 'Đông Nam',
    location: 'Quảng trường Cối Xay Gió, Trục chính Pannamera',
    zone: 'Phân Khu Trung Tâm C2',
    badge: 'VỊ TRÍ ĐẮC ĐỊA',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'
    ],
    specs: [
      'Vị trí đắc địa ngay cạnh biểu tượng Cối Xay Gió và Vườn hoa Châu Âu',
      'Mặt tiền lớn 18m thuận tiện làm dịch vụ cafe check-in, nhà hàng đặc sản',
      'Sở hữu 250m² đất ở tại nông thôn thổ cư lâu dài',
      'Điện đường chiếu sáng năng lượng mặt trời thông minh'
    ],
    amenities: ['Quảng trường hoa', 'Cối xay gió check-in', 'Nhà hàng đặc sản', 'Bãi đỗ xe 50 chiếc'],
    desc: 'Sở hữu lượng khách du lịch ghé thăm check-in đông đảo, tạo tiền đề kinh doanh dịch vụ ẩm thực và lưu trú nghỉ dưỡng với tỷ suất sinh lời vượt trội.',
    highlight: 'Chiết khấu 10% thanh toán 95% — Hỗ trợ giấy phép kinh doanh homestay'
  },
  {
    id: 8,
    title: 'Dinh Thự Nghỉ Dưỡng Hoàng Gia Hillside Villa Cao Cấp',
    slug: 'dinh-thu-nghi-duong-hoang-gia-hillside-villa',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Đồi',
    price: '3.20 Tỷ VNĐ',
    priceNum: 3.20,
    area: '800.0 m²',
    areaNum: 800.0,
    direction: 'Đông',
    location: 'Bán Đảo Thượng Lưu Royal Hill, Pannamera',
    zone: 'Phân Khu Biệt Thự Hoàng Gia',
    badge: 'ĐỘC BẢN GIỚI THƯỢNG LƯU',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Khuôn viên 800m² biệt lập 4 mặt thoáng ngắm toàn cảnh thung lũng sương mù',
      '300m² thổ cư, có hồ bơi nước ấm vô cực trên cao và sân đỗ trực thăng mini',
      'Được bảo vệ nghiêm ngặt với hệ thống an ninh khép kín',
      'Pháp lý chuẩn chỉnh sổ đỏ trao tay'
    ],
    amenities: ['Hồ bơi nước ấm', 'Sân đỗ trực thăng', 'Bảo vệ riêng', 'Hầm rượu vang'],
    desc: 'Kiệt tác dinh thự trên đồi dành riêng cho các chủ nhân tinh hoa tìm kiếm không gian sống đẳng cấp gắn liền với thiên nhiên thuần khiết.',
    highlight: 'Tặng xe buggy điện tham quan nội khu & Thẻ VIP nghỉ dưỡng 5 năm'
  }
];

const BDS07_AMENITIES: AmenityItem[] = [
  {
    id: 1,
    title: 'Biểu Tượng Cối Xay Gió & Vườn Hoa Cẩm Tú Cầu',
    desc: 'Điểm nhấn kiến trúc phong cách Hà Lan rực rỡ giữa thung lũng hoa ngát hương, nơi lưu giữ những bức ảnh check-in tuyệt mỹ.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    tag: 'WINDMILL & FLOWER GARDEN'
  },
  {
    id: 2,
    title: 'Khu Cắm Trại Glamping & Tiệc Nướng BBQ Ven Rừng',
    desc: 'Lều trại sang trọng phong cách Mông Cổ đầy đủ tiện nghi, khu lửa trại ngoài trời và quầy bar thưởng thức rượu vang dưới bầu trời sao.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    tag: 'GLAMPING & CAMPFIRE'
  },
  {
    id: 3,
    title: 'Dòng Suối Tự Nhiên & Hồ Cá Koi Phong Thủy',
    desc: 'Dòng suối nguồn trong vắt róc rách quanh năm cùng hồ cá Koi Nhật Bản tạo nên sinh khí vượng tài và cảm giác thư thái cho gia chủ.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    tag: 'NATURAL STREAM & KOI POND'
  },
  {
    id: 4,
    title: 'Farmstay Hái Chè Hữu Cơ & Cafe Săn Mây Panorama',
    desc: 'Trải nghiệm tự tay hái những búp chè non xanh mướt và thưởng thức ly cafe nguyên chất thơm nồng tại đài quan sát mây 360 độ.',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
    tag: 'ORGANIC TEA FARMSTAY'
  },
  {
    id: 5,
    title: 'Cung Đường Dạo Bộ Thông Reo & Khu Thiền Định Yoga',
    desc: 'Tuyến đường rợp bóng thông cổ thụ, không khí trong lành giàu ion âm giúp tái tạo sức khỏe và thanh lọc tâm trí hiệu quả.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    tag: 'PINE WALKING TRAIL & YOGA'
  },
  {
    id: 6,
    title: 'Nhà Hàng Ẩm Thực Tây Nguyên & Clubhouse Sinh Thái',
    desc: 'Phục vụ các món ăn đặc sản vùng cao nguyên đậm đà hương vị cùng phòng trà đạo truyền thống tiếp đãi bạn bè tri kỷ.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    tag: 'HIGHLAND RESTAURANT'
  }
];

const BDS07_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Chính Thức Khởi Công Tuyến Cao Tốc Dầu Giây — Tân Phú — Bảo Lộc 2026',
    slug: 'khoi-cong-cao-toc-dau-giay-tan-phu-bao-loc-2026',
    date: '28/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Hạ Tầng Giao Thông',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&q=80',
    excerpt: 'Tuyến cao tốc huyết mạch rút ngắn thời gian di chuyển từ TP.HCM lên Bảo Lộc chỉ còn 1 giờ 45 phút, tạo cú hích tăng trưởng mạnh mẽ cho BĐS nghỉ dưỡng...',
    content: [
      'Dự án cao tốc Tân Phú - Bảo Lộc với quy mô 4 làn xe đã chính thức bước vào giai đoạn thi công đồng loạt trên toàn tuyến.',
      'Khi tuyến cao tốc hoàn thành, khoảng cách di chuyển từ trung tâm TP.HCM về làng sinh thái Pannamera chỉ mất chưa đầy 2 giờ lái xe.',
      'Đây là yếu tố then chốt biến Bảo Lộc trở thành điểm đến Second Home số 1 cho cư dân đô thị muốn tìm kiếm không gian nghỉ dưỡng cuối tuần.'
    ],
    views: 5240
  },
  {
    id: 2,
    title: 'Xu Hướng Sở Hữu "Ngôi Nhà Thứ Hai" Đồi Chè Chữa Lành Tại Bảo Lộc',
    slug: 'xu-huong-so-huu-second-home-doi-che-chua-lanh-bao-loc',
    date: '20/08/2026',
    author: 'Chuyên Gia BĐS Sinh Thái',
    category: 'Thị Trường Nghỉ Dưỡng',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    excerpt: 'Khí hậu mát mẻ 18-22 độ C quanh năm cùng thiên nhiên nguyên sơ khiến đất vườn sinh thái Bảo Lộc trở thành món tài sản vô giá cho sức khỏe...',
    content: [
      'Trào lưu "Rời phố về rừng" đang chuyển đổi mạnh mẽ từ phong trào sang nhu cầu thực tế của các gia đình trung lưu và thượng lưu.',
      'Sở hữu một mảnh đất vườn có sổ đỏ với không gian hoa cỏ, suối nước tự nhiên vừa giúp bảo toàn giá trị dòng tiền vừa mang lại chốn an cư lý tưởng.',
      'Làng sinh thái Pannamera đáp ứng trọn vẹn tiêu chí: Pháp lý hoàn chỉnh, hạ tầng cao cấp và dịch vụ quản lý homestay chuyên nghiệp.'
    ],
    views: 6810
  },
  {
    id: 3,
    title: 'Top 5 Điểm Săn Mây Và Khám Phá Thiên Nhiên Đẹp Như Tranh Tại Bảo Lộc',
    slug: 'top-5-diem-san-may-kham-pha-thien-nhien-bao-loc',
    date: '14/08/2026',
    author: 'Cẩm Nang Du Lịch',
    category: 'Cẩm Nang Khám Phá',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    excerpt: 'Hồ Tảo Hồng B&L, Thác Dambri hùng vĩ, Đồi chè Tâm Châu bát ngát và đỉnh săn mây Pannamera là những tọa độ không thể bỏ lỡ khi ghé thăm...',
    content: [
      'Bảo Lộc được ví như một viên ngọc thô quyến rũ với vẻ đẹp mộc mạc, yên bình hiếm có trên bản đồ du lịch Việt Nam.',
      'Vào lúc 5h30 sáng, đứng từ đỉnh đồi làng sinh thái Pannamera, du khách sẽ được chiêm ngưỡng biển mây cuồn cuộn trôi ngay dưới chân mình.',
      'Khung cảnh bình minh rực rỡ xuyên qua làn sương mỏng mang đến trải nghiệm cảm xúc khó quên cho bất kỳ ai từng một lần đặt chân tới.'
    ],
    views: 4320
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
  if (clean === 'mat-bang' || clean === 'masterplan') return { page: 'masterplan', propSlug: '', artSlug: '' };
  if (clean === 'thu-vien' || clean === 'gallery') return { page: 'gallery', propSlug: '', artSlug: '' };
  if (['dat-vuon', 'bungalow', 'biet-thu', 'farmstay'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS07Template({ 
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
      const found = BDS07_PROPERTIES.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS07_PROPERTIES[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS07_NEWS.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS07_NEWS[0];
  });

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<'all' | 'dat-vuon' | 'bungalow' | 'biet-thu' | 'farmstay'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mortgage Calculator State
  const [loanPercent, setLoanPercent] = useState<number>(60);
  const [loanYears, setLoanYears] = useState<number>(15);
  const [loanRate, setLoanRate] = useState<number>(7.2);
  const [loanPropertyPrice, setLoanPropertyPrice] = useState<number>(1.25); // Tỷ VNĐ

  // Lead & Consign Form States
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', note: '', productType: 'Đất Vườn Săn Mây 250m²' });
  const [consignForm, setConsignForm] = useState({ name: '', phone: '', address: '', type: 'Đất vườn sinh thái', expectedPrice: '', note: '' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS07_PROPERTIES.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS07_NEWS.find(a => a.slug === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      let urlSlug = '';
      if (page === 'home') urlSlug = '';
      else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
      else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
      else urlSlug = page;
      
      const tSlug = template?.slug || 'bds-07';
      syncDemoUrl(tSlug, urlSlug);
    }
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
    showToast(`🌿 Đã tiếp nhận yêu cầu của ${leadForm.name || 'Quý khách'} (${leadForm.phone}). Bảng giá F1 & sổ đỏ đất nền sẽ gửi qua Zalo trong 3 phút!`);
    setLeadForm({ name: '', phone: '', note: '', productType: 'Đất Vườn Săn Mây 250m²' });
  };

  const handleConsignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consignForm.phone || !consignForm.address) {
      alert('Vui lòng điền số điện thoại và địa chỉ BĐS cần ký gửi!');
      return;
    }
    showToast(`✅ Đã tiếp nhận hồ sơ ký gửi đất nền/biệt thự tại ${consignForm.address}. Chuyên viên Bảo Lộc sẽ liên hệ thẩm định ngay!`);
    setConsignForm({ name: '', phone: '', address: '', type: 'Đất vườn sinh thái', expectedPrice: '', note: '' });
  };

  // Calculated Mortgage
  const mortgageCalc = useMemo(() => {
    const loanAmountBillions = (loanPropertyPrice * loanPercent) / 100;
    const loanAmountVND = loanAmountBillions * 1_000_000_000;
    const totalMonths = loanYears * 12;
    const monthlyRate = (loanRate / 100) / 12;
    
    const monthlyPrincipal = loanAmountVND / totalMonths;
    const firstMonthInterest = loanAmountVND * monthlyRate;
    const firstMonthTotal = monthlyPrincipal + firstMonthInterest;
    const totalInterest = ((loanAmountVND * monthlyRate * (totalMonths + 1)) / 2) / 1_000_000_000;

    return {
      loanAmountBillions: loanAmountBillions.toFixed(2),
      firstMonthTotalMillion: (firstMonthTotal / 1_000_000).toFixed(1),
      monthlyPrincipalMillion: (monthlyPrincipal / 1_000_000).toFixed(1),
      totalInterestBillions: totalInterest.toFixed(2)
    };
  }, [loanPropertyPrice, loanPercent, loanYears, loanRate]);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    if (activeTab === 'all') return BDS07_PROPERTIES;
    return BDS07_PROPERTIES.filter(p => p.category === activeTab);
  }, [activeTab]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80';
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP HEADER & STICKY NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#064E3B] text-white shadow-xl border-b border-emerald-800/60">
      {/* Top micro bar */}
      <div className="bg-[#047857] text-white text-[11px] font-bold py-1.5 px-4 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <span>🌿 MỞ BÁN PHÂN KHU SĂN MÂY: TẶNG NGAY 1 CHỈ VÀNG — CHIẾT KHẤU ĐẾN 8%</span>
            <span className="opacity-80">★ SỔ ĐỎ THỔ CƯ CÔNG CHỨNG NGAY ★</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="flex items-center gap-1.5 hover:underline">
              <Phone size={13} className="animate-pulse text-amber-300" /> Hotline CĐT: <strong>0919 006 030</strong>
            </a>
            <span className="opacity-50">|</span>
            <span className="text-amber-300 font-extrabold">MẪU GIAO DIỆN: BDS-07</span>
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
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-400/40 shrink-0">
            <Mountain size={20} className="text-amber-300" />
          </div>
          <div className="min-w-0 truncate">
            <span className="text-sm sm:text-base font-black tracking-tight block leading-tight text-white group-hover:text-emerald-300 transition-colors truncate">
              {company?.name || 'TEMPLATESBDS'}
            </span>
            <span className="text-[7.5px] sm:text-[10px] tracking-widest text-emerald-300 block uppercase font-bold truncate">
              LÀNG SINH THÁI NGHỈ DƯỠNG
            </span>
          </div>
        </div>

        {/* Desktop Menu Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-emerald-100 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'home' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('dat-vuon')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'dat-vuon' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Đất Vườn
          </button>
          <button 
            onClick={() => navigate('bungalow')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'bungalow' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Bungalow
          </button>
          <button 
            onClick={() => navigate('biet-thu')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'biet-thu' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Biệt Thự
          </button>
          <button 
            onClick={() => navigate('tien-ich')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'tien-ich' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Tiện Ích
          </button>
          <button 
            onClick={() => navigate('thu-vien')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'thu-vien' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Thư Viện
          </button>
          <button 
            onClick={() => navigate('tin-tuc')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'tin-tuc' || currentPage === 'news-detail' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('ky-gui')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'ky-gui' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Ký Gửi
          </button>
          <button 
            onClick={() => navigate('lien-he')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-amber-300 ${currentPage === 'lien-he' ? 'text-amber-400 font-extrabold' : ''}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0 ml-auto">
          <a
            href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-sm bg-emerald-900/80 hover:bg-emerald-800 text-xs font-bold text-emerald-200 border border-emerald-700/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Phone size={13} className="text-amber-400 animate-pulse shrink-0" />
            <span>0919 006 030</span>
          </a>
          <button
            onClick={() => {
              const el = document.getElementById('lead-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('lien-he');
            }}
            className="hidden md:inline-block px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black rounded-sm shadow-lg transition-all uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
          >
            Tải Báo Giá VIP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-sm bg-emerald-900 text-white lg:hidden hover:bg-emerald-800 shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#064E3B] border-b border-emerald-800 px-6 py-5 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Trang Chủ</button>
            <button onClick={() => navigate('dat-vuon')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Đất Vườn</button>
            <button onClick={() => navigate('bungalow')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Bungalow</button>
            <button onClick={() => navigate('biet-thu')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Biệt Thự</button>
            <button onClick={() => navigate('tien-ich')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Tiện Ích</button>
            <button onClick={() => navigate('thu-vien')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Thư Viện</button>
            <button onClick={() => navigate('tin-tuc')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Tin Tức</button>
            <button onClick={() => navigate('ky-gui')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Ký Gửi</button>
            <button onClick={() => navigate('lien-he')} className="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Liên Hệ</button>
          </div>
          <div className="pt-2 border-t border-emerald-800 flex items-center justify-between text-xs">
            <span className="text-emerald-300">Hotline tư vấn 24/7:</span>
            <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-amber-400 font-extrabold">0919 006 030</a>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO BANNER SĂN MÂY RỪNG THÔNG (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80"
        alt="Pannamera Cloud Hunting View"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#022C22] via-[#022C22]/60 to-[#022C22]/30" />

      {/* Clouds Mist Fog Layer Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0FDF4] to-transparent z-10 opacity-90" />

      <div className={`relative z-20 ${MAX_W} mx-auto px-4 py-20 text-center space-y-6`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#047857]/90 text-white text-xs font-black tracking-widest uppercase shadow-xl backdrop-blur-md border border-emerald-400/30 whitespace-nowrap">
          <Sparkles size={14} className="text-amber-300 shrink-0" /> THIÊN ĐƯỜNG NGHỈ DƯỠNG SINH THÁI TÂY NGUYÊN
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-2xl">
          PANNAMERA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-lime-300 inline-block">
            NƠI DỪNG CHÂN LÝ TƯỞNG
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Tuyệt tác làng sinh thái đồi chè bên dòng suối tự nhiên tại Bảo Lộc. Độ cao 900m mát lạnh quanh năm 18 - 22°C, nơi an trú trọn vẹn của tâm hồn.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              const el = document.getElementById('masterplan-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigate('dat-vuon');
            }}
            className="px-8 py-4 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
          >
            Khám Phá Mặt Bằng 3D <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-7 py-4 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/80 text-white border border-emerald-400/40 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Play size={16} className="text-amber-400 fill-amber-400" /> Xem Flycam Săn Mây
          </button>
        </div>

        {/* 4 Golden Metrics */}
        <div className="pt-6">
          <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-[#064E3B]/90 backdrop-blur-md border border-emerald-700/60 shadow-2xl text-left">
            <div className="px-3 border-r border-emerald-700/60">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Độ Cao Nghỉ Dưỡng</span>
              <span className="text-base sm:text-lg font-black text-amber-300">900m Biển</span>
            </div>
            <div className="px-3 border-r border-emerald-700/60">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Khí Hậu Quanh Năm</span>
              <span className="text-base sm:text-lg font-black text-emerald-300">18°C - 22°C</span>
            </div>
            <div className="px-3 border-r border-emerald-700/60">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Quy Mô Phân Lô</span>
              <span className="text-base sm:text-lg font-black text-lime-300">250 - 1000m²</span>
            </div>
            <div className="px-3">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Pháp Lý Sở Hữu</span>
              <span className="text-base sm:text-lg font-black text-amber-400">Sổ Đỏ Trao Tay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. SECTION 1: VẺ ĐẸP HOANG SƠ & TỔNG QUAN DỰ ÁN (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderOverviewSection = () => (
    <section id="overview-section" className="py-20 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
            ★ THIÊN NHIÊN NGUYÊN SƠ — VÙNG ĐẤT CHỮA LÀNH ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            VẺ ĐẸP HOANG SƠ & TỔNG QUAN PANNAMERA
          </h2>
          <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Large Tea Hill Photo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-md overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80"
                alt="Đồi chè Bảo Lộc"
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="px-3 py-1 bg-[#047857] text-[10px] font-black uppercase rounded-md inline-block">
                    KHÍ HẬU 18 - 22°C
                  </span>
                  <h4 className="text-base font-black">Bình Minh Săn Mây Trên Đồi Chè Bát Ngát</h4>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-sm bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-3">
              <Leaf size={24} className="text-emerald-700 flex-shrink-0" />
              <div>
                <strong className="block">Không Gian Sống Xanh Thuần Khiết</strong>
                <span className="opacity-80 text-[11px]">Được bao bọc bởi đồi chè Oolong và rừng thông nguyên sinh, cách xa khói bụi đô thị.</span>
              </div>
            </div>
          </div>

          {/* Right Table / Specifications */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-emerald-200/80 rounded-md p-6 sm:p-8 space-y-3.5 shadow-sm">
              {[
                { label: 'Tên Dự Án', val: 'Làng Sinh Thái Nghỉ Dưỡng Pannamera Bảo Lộc' },
                { label: 'Vị Trí Tọa Lạc', val: 'Xã Lộc Tân & Đam B’ri, TP. Bảo Lộc, Tỉnh Lâm Đồng' },
                { label: 'Quy Mô Quy Hoạch', val: 'Giai đoạn 1 gồm 120 nền biệt thự vườn & bungalow' },
                { label: 'Diện Tích Từng Nền', val: '250m² - 350m² - 500m² - 1.000m² (Mặt tiền 10m - 20m)' },
                { label: 'Pháp Lý Dự Án', val: 'Sổ hồng riêng từng nền, sẵn 100m² - 200m² thổ cư ODT' },
                { label: 'Hạ Tầng Hoàn Thiện', val: 'Đường trải nhựa 8m-12m, điện âm, nước máy, đèn NLMT' },
                { label: 'Hệ Thống Tiện Ích', val: 'Cối xay gió, Vườn hoa cẩm tú cầu, Suối đá, Hồ cá Koi, Glamping' },
                { label: 'Dịch Vụ Vận Hành', val: 'Chăm sóc cảnh quan, quản lý & khai thác homestay cho thuê' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    <Check size={12} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                    <span className="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">{item.label}:</span>
                    <span className="font-extrabold text-slate-800 sm:col-span-8">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center sm:text-left pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('lead-form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-emerald-900/30 uppercase tracking-wider transition-all hover:scale-105"
              >
                Tải Bảng Giá F1 & Trích Lục Bản Đồ Địa Chính
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. SECTION 2: VỊ TRÍ & LIÊN KẾT VÙNG + QUICK LEAD BAR (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderLocationSection = () => (
    <section id="location-section" className="py-20 bg-[#064E3B] text-white relative overflow-hidden">
      <div className={`${MAX_W} mx-auto px-4 relative z-10`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest block">
            ★ TÂM ĐIỂM KẾT NỐI CAO TỐC DẦU GIÂY — LIÊN KHƯƠNG ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            VỊ TRÍ KIM CƯƠNG & BẢN ĐỒ LIÊN KẾT
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Distance Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            {[
              { time: '5 Phút', title: 'Nút Giao Cao Tốc Dầu Giây — Tân Phú — Bảo Lộc', desc: 'Kết nối cao tốc thông suốt, di chuyển về TP.HCM chỉ 1h45 phút.' },
              { time: '8 Phút', title: 'Đồi Chè Tâm Châu & Thung Lũng Trà Oolong', desc: 'Thiên đường check-in đồi chè bát ngát nổi tiếng nhất Tây Nguyên.' },
              { time: '10 Phút', title: 'Thác Dambri & Quần Thể Du Lịch Sinh Thái 7 Tầng', desc: 'Khu du lịch danh thắng quốc gia với rừng nguyên sinh và cáp treo.' },
              { time: '12 Phút', title: 'Tu Viện Bát Nhã & Lâu Đài Trắng Tráng Lệ', desc: 'Điểm đến tâm linh thanh tịnh và công trình kiến trúc cổ kính.' },
              { time: '15 Phút', title: 'Trung Tâm Hành Chính TP. Bảo Lộc & Chợ Đêm', desc: 'Tiếp cận đầy đủ siêu thị Co.opmart, bệnh viện đa khoa, trường học.' },
              { time: '45 Phút', title: 'Sân Bay Quốc Tế Liên Khương — Đà Lạt', desc: 'Di chuyển thuận tiện đến sân bay kết nối các chuyến bay trong & ngoài nước.' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1"
              >
                <div className="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                  <Clock size={12} className="text-slate-950 mb-0.5" />
                  <span className="text-xs leading-none font-black">{item.time}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">{item.title}</h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Map Image */}
          <div className="lg:col-span-6 rounded-md overflow-hidden border border-emerald-700 bg-emerald-950 shadow-2xl p-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
                alt="Map Pannamera"
                onError={handleImgError}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-emerald-950/60 flex flex-col justify-between p-6">
                <div className="inline-block self-start px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                  📍 VỊ TRÍ {company?.name || 'TEMPLATESBDS'}
                </div>
                <div className="bg-[#022C22]/90 backdrop-blur-md p-4 rounded-sm border border-emerald-700 text-xs space-y-1">
                  <strong className="text-amber-300 block font-black">TRỤC KẾT NỐI CAO TỐC LIÊN KHƯƠNG</strong>
                  <p className="text-emerald-200 text-[11px]">
                    Nằm ngay cửa ngõ kết nối trục du lịch TP.HCM - Bảo Lộc - Đà Lạt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Lead Bar (Matching Mockup Under Map) */}
        <div className="bg-[#022C22] border border-emerald-600/60 rounded-md p-6 shadow-2xl">
          <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-3">
              <input
                type="text"
                required
                placeholder="Họ và tên của bạn..."
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                className="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="sm:col-span-3">
              <input
                type="tel"
                required
                placeholder="Số điện thoại / Zalo (*)..."
                value={leadForm.phone}
                onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="sm:col-span-3">
              <select
                value={leadForm.productType}
                onChange={e => setLeadForm({ ...leadForm, productType: e.target.value })}
                className="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Đất Vườn Săn Mây 250m²">Đất Vườn Săn Mây 250m² (Từ 890Tr)</option>
                <option value="Đất Vườn Suối 350m²">Đất Vườn View Suối 350m² (Từ 1.25 Tỷ)</option>
                <option value="Bungalow Gỗ Hoàn Thiện">Bungalow Gỗ Xây Sẵn (1.45 Tỷ)</option>
                <option value="Biệt Thự Đồi 500m²">Biệt Thự Đồi 500m² (1.85 Tỷ)</option>
                <option value="Farmstay 1000m²">Farmstay Trồng Cây 1000m²</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-sm shadow-lg transition-all"
              >
                Gửi Yêu Cầu Nhận Báo Giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SECTION 3: TIỆN ÍCH CỐI XAY GIÓ & VƯỜN HOA (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderAmenitiesSection = () => (
    <section id="amenities-section" className="py-20 bg-white text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
            ★ TRẢI NGHIỆM ĐỘC ĐÁO — SỐNG CHẬM GIỮA ĐỒI HOA ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            TIỆN ÍCH NGHỈ DƯỠNG ĐỘC ĐÁO
          </h2>
          <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
        </div>

        {/* Feature Windmill Highlight Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-[#F0FDF4] p-6 sm:p-10 rounded-md border border-emerald-200">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-sm overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80"
                alt="Cối Xay Gió"
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3.5 py-1 bg-[#047857] text-white text-xs font-black uppercase rounded-lg shadow inline-block">
              BIỂU TƯỢNG ĐẶC QUYỀN
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Quảng Trường Cối Xay Gió & Đồi Hoa Cẩm Tú Cầu
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Lấy cảm hứng từ những ngôi làng thần tiên châu Âu, cụm cối xay gió tọa lạc kiêu hãnh giữa thung lũng hoa cẩm tú cầu nở rộ quanh năm, là điểm hẹn săn ảnh và thưởng trà chiều lãng mạn cho cư dân và du khách.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Vườn Hoa</span>
                <strong className="text-xs font-black text-emerald-800">5.000 m²</strong>
              </div>
              <div className="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Độ Cao Check-in</span>
                <strong className="text-xs font-black text-amber-600">Cao 15 Mét</strong>
              </div>
              <div className="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Trà Quán</span>
                <strong className="text-xs font-black text-emerald-800">View 360 Độ</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BDS07_AMENITIES.map(amenity => (
            <div
              key={amenity.id}
              onClick={() => navigate('tien-ich')}
              className="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">
                  {amenity.tag}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {amenity.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed break-words">
                  {amenity.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION 4: MẶT BẰNG PHÂN LÔ MASTERPLAN 3D (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderMasterplanSection = () => (
    <section id="masterplan-section" className="py-20 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
            ★ QUY HOẠCH ĐỒNG BỘ — SỔ ĐỎ RIÊNG TỪNG NỀN ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            MẶT BẰNG QUY HOẠCH & PHÂN LÔ 3D
          </h2>
          <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
        </div>

        {/* Masterplan CAD Graphic */}
        <div className="bg-white rounded-md p-4 sm:p-6 border border-emerald-200 shadow-md mb-12">
          <div className="relative aspect-[21/9] rounded-sm overflow-hidden bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=80"
              alt="Masterplan 3D Pannamera"
              onError={handleImgError}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#022C22]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="px-3 py-1 bg-[#047857] text-[10px] font-black uppercase rounded-md inline-block">
                  SƠ ĐỒ PHÂN KHU ĐỒI SĂN MÂY 1/500
                </span>
                <h3 className="text-base sm:text-xl font-black">
                  Quy Hoạch Làng Sinh Thái Nghỉ Dưỡng Khép Kín Chuẩn Quốc Tế
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'TẤT CẢ SẢN PHẨM' },
            { id: 'dat-vuon', label: 'ĐẤT VƯỜN SĂN MÂY' },
            { id: 'bungalow', label: 'BUNGALOW GỖ' },
            { id: 'biet-thu', label: 'BIỆT THỰ ĐỒI' },
            { id: 'farmstay', label: 'FARMSTAY 1000M²' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-sm text-xs font-extrabold tracking-wider transition-all uppercase ${
                activeTab === tab.id
                  ? 'bg-[#047857] text-white shadow-lg shadow-emerald-900/30 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProperties.map(prop => (
            <div
              key={prop.id}
              onClick={() => handleOpenProperty(prop)}
              className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={prop.image}
                  alt={prop.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">
                  {prop.badge}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#022C22]/90 text-amber-300 text-xs font-black backdrop-blur">
                  {prop.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{prop.categoryLabel} • {prop.zone}</span>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-emerald-700 transition-colors">
                    {prop.title}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Diện tích</span>
                    <strong className="text-slate-800 font-extrabold">{prop.area}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Hướng đất</span>
                    <strong className="text-slate-800 font-extrabold">{prop.direction}</strong>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProperty(prop);
                  }}
                  className="w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center"
                >
                  Xem Sổ Đỏ & Mặt Bằng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SECTION 5: 6 GIÁ TRỊ CỐT LÕI & LỢI THẾ ĐẦU TƯ (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderCoreValuesSection = () => (
    <section id="values-section" className="py-20 bg-[#064E3B] text-white">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest block">
            ★ BẢO CHỨNG SINH LỜI — AN TOÀN TUYỆT ĐỐI ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            6 GIÁ TRỊ CỐT LÕI TẠI PANNAMERA
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Pháp Lý Minh Bạch 100%', desc: 'Sổ đỏ từng nền có sẵn thổ cư ODT, công chứng sang tên ngay trong ngày an toàn tuyệt đối.' },
            { num: '02', title: 'Đón Đầu Hạ Tầng Cao Tốc', desc: 'Cao tốc Tân Phú - Bảo Lộc khởi công giúp rút ngắn thời gian di chuyển từ Sài Gòn chỉ còn 1h45 phút.' },
            { num: '03', title: 'Khí Hậu Đà Lạt Thứ Hai', desc: 'Cao độ 900m quanh năm mát lạnh 18-22°C, bốn mùa hoa nở, không khí trong lành giàu ion âm.' },
            { num: '04', title: 'Suất Đầu Tư Vừa Túi Tiền', desc: 'Mức giá khởi điểm chỉ từ 890 Triệu/nền, tỷ suất sinh lời dự kiến 25-35%/năm khi cao tốc thông xe.' },
            { num: '05', title: 'Quản Lý Homestay Vận Hành', desc: 'Dịch vụ ủy thác quản lý nhà vườn cho thuê, chăm sóc cây cảnh, tạo dòng tiền thụ động đều đặn.' },
            { num: '06', title: 'Nghỉ Dưỡng Chữa Lành Wellness', desc: 'Nơi dừng chân lý tưởng tái tạo năng lượng cho cả gia đình, sở hữu tài sản sinh thái truyền đời.' }
          ].map((val, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">
                {val.num}
              </div>
              <h4 className="text-lg font-black text-white">{val.title}</h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SECTION 6: THƯ VIỆN ẢNH THỰC TẾ & VIDEO 3D (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderGalleryAndVideoSection = () => {
    const galleryImgs = [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1000&q=80',
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1000&q=80',
    ];

    return (
      <section id="gallery-section" className="py-20 bg-white text-slate-900">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
              ★ HÌNH ẢNH THỰC TẾ & KHÔNG GIAN SỐNG ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              THƯ VIỆN HÌNH ẢNH & VIDEO FLYCAM 3D
            </h2>
            <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
          </div>

          {/* 3 Showcase Photos (Day, Night, Bungalow) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div 
              onClick={() => setLightboxImg(galleryImgs[0])}
              className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900"
            >
              <img src={galleryImgs[0]} alt="Toàn cảnh ngày" onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                <span className="text-white text-xs font-black">Toàn Cảnh Bình Minh Săn Mây</span>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImg(galleryImgs[3])}
              className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900"
            >
              <img src={galleryImgs[3]} alt="Lung linh về đêm" onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                <span className="text-white text-xs font-black">Ánh Đèn Lung Linh Về Đêm</span>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImg(galleryImgs[2])}
              className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900"
            >
              <img src={galleryImgs[2]} alt="Bungalow Mẫu" onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                <span className="text-white text-xs font-black">Nhà Vườn Bungalow Gỗ 2 Tầng</span>
              </div>
            </div>
          </div>

          {/* 6 Grid Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
            {galleryImgs.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg(img)}
                className="relative aspect-square rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-slate-100"
              >
                <img src={img} alt={`Gallery ${idx}`} onError={handleImgError} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Video Player Box with YouTube */}
          <div className="bg-[#022C22] rounded-md p-6 sm:p-10 border border-emerald-800 text-white space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">TRẢI NGHIỆM VIDEO FLYCAM</span>
              <h3 className="text-xl sm:text-2xl font-black">TOÀN CẢNH LÀNG SINH THÁI PANNAMERA</h3>
            </div>

            <div 
              onClick={() => setVideoModalOpen(true)}
              className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border-2 border-emerald-500/40 cursor-pointer group bg-slate-900"
            >
              <img src={galleryImgs[0]} alt="Video Flycam Preview" onError={handleImgError} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/10 transition">
                <div className="w-20 h-20 rounded-sm bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/80 group-hover:scale-110 transition">
                  <Play size={36} className="fill-white translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SECTION 7: MẪU THIẾT KẾ NHÀ VƯỜN BUNGALOW GỖ (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderBungalowModelSection = () => (
    <section id="bungalow-model-section" className="py-20 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
            ★ THIẾT KẾ NORDIC — GẮN LIỀN VỚI THIÊN NHIÊN ★
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            MẪU NHÀ VƯỜN BUNGALOW SINH THÁI
          </h2>
          <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 rounded-md border border-emerald-200 shadow-md">
          <div className="lg:col-span-6 rounded-sm overflow-hidden aspect-[4/3] bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80"
              alt="Bungalow Gỗ"
              onError={handleImgError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="px-3.5 py-1 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded-lg shadow inline-block">
              CHI PHÍ XÂY DỰNG TỐI ƯU
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Nhà Vườn Nghỉ Dưỡng Gỗ Bắc Âu (80m² Sàn)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thiết kế thông minh với hệ khung gỗ tự nhiên chống mối mọt và cản nhiệt tuyệt đối. Khung cửa kính lớn đón trọn cảnh sắc đồi chè và sương mây vào tận phòng ngủ.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Số Phòng Ngủ</span>
                <strong className="text-sm font-black text-emerald-800">2 Phòng Master</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ban Công Săn Mây</span>
                <strong className="text-sm font-black text-amber-600">Rộng 25 m²</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Thời Gian Thi Công</span>
                <strong className="text-sm font-black text-emerald-800">Chỉ 45 Ngày</strong>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('lead-form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg uppercase tracking-wider transition-all"
              >
                Nhận File Báo Giá Hoàn Thiện Nhà Gỗ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 10. SECTION 8: TIN TỨC DU LỊCH & BẢNG TÍNH LÃI VAY REALTIME
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsAndMortgageSection = () => (
    <section id="news-mortgage-section" className="py-20 bg-white text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 space-y-16`}>
        {/* Realtime Mortgage Calculator Widget */}
        <div className="bg-[#F0FDF4] rounded-md p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center font-black">
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
                  <span className="text-[#047857] font-black">{loanPropertyPrice} Tỷ VNĐ</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={5.0}
                  step={0.05}
                  value={loanPropertyPrice}
                  onChange={e => setLoanPropertyPrice(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Tỷ lệ vay vốn</label>
                  <select
                    value={loanPercent}
                    onChange={e => setLoanPercent(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500"
                  >
                    <option value={50}>50% Giá trị BĐS</option>
                    <option value={60}>60% Giá trị BĐS (Chuẩn)</option>
                    <option value={70}>70% Giá trị BĐS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Thời hạn vay</label>
                  <select
                    value={loanYears}
                    onChange={e => setLoanYears(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500"
                  >
                    <option value={5}>5 Năm (60 Tháng)</option>
                    <option value={10}>10 Năm (120 Tháng)</option>
                    <option value={15}>15 Năm (180 Tháng)</option>
                    <option value={20}>20 Năm (240 Tháng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Lãi suất (% / Năm)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={loanRate}
                    onChange={e => setLoanRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 bg-[#064E3B] text-white p-6 rounded-sm space-y-4 shadow-xl border border-emerald-800">
              <div className="border-b border-emerald-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Số tiền vay ngân hàng:</span>
                <strong className="text-xl font-black text-amber-300">{mortgageCalc.loanAmountBillions} Tỷ VNĐ</strong>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-emerald-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Gốc + Lãi tháng đầu:</span>
                  <strong className="text-base font-black text-lime-300">{mortgageCalc.firstMonthTotalMillion} Tr/tháng</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Gốc cố định:</span>
                  <strong className="text-base font-black text-slate-200">{mortgageCalc.monthlyPrincipalMillion} Tr/tháng</strong>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Ước tính tổng lãi phải trả:</span>
                <strong className="text-sm font-black text-slate-300">{mortgageCalc.totalInterestBillions} Tỷ VNĐ</strong>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
              ★ CẬP NHẬT TIẾN ĐỘ & CẨM NANG KHÁM PHÁ ★
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              TIN TỨC DU LỊCH & THỊ TRƯỜNG BẢO LỘC
            </h2>
            <div className="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BDS07_NEWS.map(art => (
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
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">
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
                    <h4 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#047857]">
                    <span>Đọc tiếp bài viết</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // SUBPAGE: PROPERTY DETAIL VIEW (`/chi-tiet/:slug`)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyDetailPage = () => (
    <div className="py-12 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700">Trang Chủ</button>
          <span>/</span>
          <button onClick={() => navigate(selectedProperty.category)} className="hover:text-emerald-700">{selectedProperty.categoryLabel}</button>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-xs">{selectedProperty.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-md p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#047857] text-white text-xs font-black uppercase">
                    {selectedProperty.badge}
                  </span>
                  <span className="text-xs font-extrabold text-slate-500 uppercase">{selectedProperty.zone}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedProperty.title}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-600 flex-shrink-0" /> {selectedProperty.location}
                </p>
              </div>

              {/* Gallery Switcher */}
              <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="emerald" />

              {/* Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-sm bg-emerald-50/60 border border-emerald-200 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Diện tích</span>
                  <strong className="text-sm sm:text-base font-extrabold text-slate-800">{selectedProperty.area}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Hướng phong thủy</span>
                  <strong className="text-sm sm:text-base font-extrabold text-emerald-700">{selectedProperty.direction}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pháp lý</span>
                  <strong className="text-sm sm:text-base font-extrabold text-amber-600">Sổ Hồng Riêng</strong>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">MÔ TẢ CHI TIẾT LÔ ĐẤT / BIỆT THỰ</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedProperty.desc}</p>
                <div className="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                  🎁 {selectedProperty.highlight}
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">TIÊU CHUẨN BÀN GIAO HẠ TẦNG</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProperty.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#064E3B] text-white rounded-md p-6 shadow-xl border border-emerald-800 space-y-4 sticky top-24">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">TƯ VẤN TRỰC TIẾP F1</span>
                <h3 className="text-lg font-black">YÊU CẦU BÁO GIÁ LÔ NÀY</h3>
                <p className="text-xs text-emerald-200">Gửi trích lục bản đồ & sổ đỏ qua Zalo.</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Họ và tên..."
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-emerald-950 border border-emerald-700 text-white text-xs focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại / Zalo..."
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-emerald-950 border border-emerald-700 text-white text-xs font-bold text-amber-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black rounded-sm shadow uppercase tracking-wider transition-all"
                >
                  Nhận Báo Giá & Sổ Đỏ
                </button>
              </form>

              <div className="pt-3 border-t border-emerald-800 text-center">
                <a href={`tel:${company?.phone?.replace(/\s+/g, '') || '0919006030'}`} className="text-xs font-bold text-amber-300 hover:underline flex items-center justify-center gap-1.5">
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
    <div className="py-12 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-8`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700">Trang Chủ</button>
          <span>/</span>
          <button onClick={() => navigate('tin-tuc')} className="hover:text-emerald-700">Tin Tức</button>
          <span>/</span>
          <span className="text-slate-800 truncate">{selectedArticle.title}</span>
        </div>

        <article className="bg-white rounded-md p-6 sm:p-10 border border-emerald-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-[#047857] text-white text-xs font-black uppercase rounded-lg inline-block">
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
            <p className="font-bold text-slate-900 text-base sm:text-lg italic border-l-4 border-[#047857] pl-4 py-1">
              {selectedArticle.excerpt}
            </p>
            {selectedArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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
    <div className="py-12 bg-[#F0FDF4] text-slate-900">
      <div className={`${MAX_W} mx-auto px-4 max-w-3xl space-y-8`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">
            ★ KÝ GỬI MUA BÁN ĐẤT VƯỜN & BIỆT THỰ BẢO LỘC ★
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
            DỊCH VỤ MÔI GIỚI & THẨM ĐỊNH GIÁ BĐS TÂY NGUYÊN
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Hỗ trợ đo đạc địa chính, ra sổ hồng nhanh chóng và tiếp cận hơn 20.000 nhà đầu tư toàn quốc.
          </p>
        </div>

        <form onSubmit={handleConsignSubmit} className="bg-white rounded-md p-6 sm:p-10 border border-emerald-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Họ & Tên Gia Chủ (*)</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Lê Hoàng Nam"
                value={consignForm.name}
                onChange={e => setConsignForm({ ...consignForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
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
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold text-emerald-700 focus:outline-none focus:border-emerald-500"
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
                <option value="Đất vườn sinh thái">Đất vườn sinh thái</option>
                <option value="Bungalow nghỉ dưỡng">Bungalow nghỉ dưỡng</option>
                <option value="Biệt thự đồi">Biệt thự đồi</option>
                <option value="Đất farmstay 1000m²">Đất farmstay 1000m²</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mức Giá Kỳ Vọng</label>
              <input
                type="text"
                placeholder="Ví dụ: 1.2 Tỷ hoặc 800 Triệu"
                value={consignForm.expectedPrice}
                onChange={e => setConsignForm({ ...consignForm, expectedPrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Địa Chỉ Thửa Đất (*)</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Lô B2-15 Làng Sinh Thái Pannamera, Xã Lộc Tân, Bảo Lộc..."
              value={consignForm.address}
              onChange={e => setConsignForm({ ...consignForm, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Ghi Chú Thêm</label>
            <textarea
              rows={3}
              placeholder="Tình trạng thổ cư, đường xá, cây cối trên đất..."
              value={consignForm.note}
              onChange={e => setConsignForm({ ...consignForm, note: e.target.value })}
              className="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-black rounded-sm shadow-lg uppercase tracking-wider transition-all hover:scale-105"
          >
            Xác Nhận Ký Gửi Nhà Đất Ngay
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
      case 'dat-vuon':
      case 'bungalow':
      case 'biet-thu':
      case 'farmstay':
        return (
          <div className="py-12 bg-[#F0FDF4] text-slate-900">
            <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">DANH MỤC SẢN PHẨM</span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase">
                  {currentPage === 'dat-vuon' ? 'ĐẤT VƯỜN SĂN MÂY BẢO LỘC' :
                   currentPage === 'bungalow' ? 'BUNGALOW GỖ NGHỈ DƯỠNG' :
                   currentPage === 'biet-thu' ? 'BIỆT THỰ ĐỒI CHÈ PANORAMA' : 'FARMSTAY TRỒNG CÂY ĂN TRÁI'}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(prop => (
                  <div
                    key={prop.id}
                    onClick={() => handleOpenProperty(prop)}
                    className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img src={prop.image} alt={prop.title} onError={handleImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">{prop.badge}</div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#022C22]/90 text-amber-300 text-xs font-black backdrop-blur">{prop.price}</div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">{prop.categoryLabel} • {prop.zone}</span>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-emerald-700 transition-colors">{prop.title}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                        <div><span className="text-[10px] text-slate-400 block">Diện tích</span><strong>{prop.area}</strong></div>
                        <div><span className="text-[10px] text-slate-400 block">Hướng đất</span><strong>{prop.direction}</strong></div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleOpenProperty(prop); }} className="w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-extrabold rounded-sm shadow uppercase tracking-wider text-center">Xem Chi Tiết</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tien-ich':
      case 'amenities':
        return <div>{renderAmenitiesSection()}</div>;

      case 'thu-vien':
      case 'gallery':
        return <div>{renderGalleryAndVideoSection()}</div>;

      case 'tin-tuc':
      case 'news':
        return <div>{renderNewsAndMortgageSection()}</div>;

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
          <div className="py-12 bg-[#F0FDF4] text-slate-900">
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
            {renderAmenitiesSection()}
            {renderMasterplanSection()}
            {renderCoreValuesSection()}
            {renderGalleryAndVideoSection()}
            {renderBungalowModelSection()}
            {renderNewsAndMortgageSection()}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#047857] selection:text-white">
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
                title="Pannamera Bao Loc Video"
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

      {/* Main Dynamic Content Area */}
      <main className="flex-1 w-full">
        {renderMainContent()}
      </main>

      {/* Universal Footer with TEMPLATESBDS Branding & Floating Buttons */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-07 (Làng Sinh Thái Nghỉ Dưỡng PANNAMERA Bảo Lộc)"
        onNavigate={navigate}
        zaloPhone="0919006030"
        hotlinePhone="0919 006 030"
      />
    </div>
  );
}
