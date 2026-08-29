'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  Gift, Trophy, Briefcase, Users, ExternalLink, HelpCircle
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

export interface ProjectCardItem {
  id: number;
  title: string;
  slug: string;
  category: 'can-ho' | 'dat-nen' | 'condotel' | 'biet-thu' | 'shophouse';
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
  gallery: string[];
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
// BDS-08 MOCK DATA (MATCHING EXACT REFERENCE SCREENSHOT)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS08_PROJECTS: ProjectCardItem[] = [
  {
    id: 1,
    title: 'DỰ ÁN PHỐ MỸ GOLD CITY BÀ RỊA VŨNG TÀU',
    slug: 'du-an-pho-my-gold-city-ba-ria-vung-tau',
    category: 'dat-nen',
    categoryLabel: 'Đất Nền Phố Thương Mại',
    statusBadge: 'Dự án đang phân phối',
    price: '1.85 Tỷ VNĐ',
    priceNum: 1.85,
    area: '105 m²',
    areaNum: 105,
    location: 'Mặt tiền Quốc lộ 51, TX. Phú Mỹ, Bà Rịa - Vũng Tàu',
    city: 'Bà Rịa - Vũng Tàu',
    bedrooms: 0,
    bathrooms: 0,
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'
    ],
    featured: true,
    desc: 'Khu đô thị thương mại trung tâm thành phố cảng Phú Mỹ, kết nối trực tiếp cụm cảng nước sâu Cái Mép - Thị Vải và cao tốc Biên Hòa - Vũng Tàu.',
    details: [
      'Quy mô: 8.5 ha với hơn 400 nền nhà phố thương mại.',
      'Pháp lý: Sổ đỏ riêng từng nền, công chứng sang tên ngay trong ngày.',
      'Hạ tầng: Đường nhựa nội khu 14-20m, điện âm nước máy, vỉa hè lát đá hoa cương.'
    ],
    investor: 'Hưng Lộc Phát Land',
    legal: 'Sổ đỏ riêng từng lô, sở hữu lâu dài',
    handover: 'Đã hoàn thiện hạ tầng 100%'
  },
  {
    id: 2,
    title: 'DỰ ÁN CĂN HỘ GOLDEN STAR QUẬN 7, TP.HCM',
    slug: 'du-an-can-ho-golden-star-quan-7',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    statusBadge: 'Dự án đang phân phối',
    price: '3.45 Tỷ VNĐ',
    priceNum: 3.45,
    area: '68 m²',
    areaNum: 68,
    location: 'Số 72 Nguyễn Thị Thập, Phường Bình Thuận, Quận 7, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    featured: true,
    desc: 'Tổ hợp căn hộ cao cấp bàn giao full nội thất cao cấp nhập khẩu châu Âu, hồ bơi tràn bờ tự động điều chỉnh nhiệt độ tại tầng 21.',
    details: [
      'Quy mô: 2 block cao 26 tầng, tổng số 478 căn hộ hạng sang.',
      'Tiện ích: Hệ thống nước uống tinh khiết tại vòi tiêu chuẩn WHO, thang máy thẻ từ Otis.',
      'Vị trí: Ngay cạnh trung tâm thương mại Crescent Mall, SC VivoCity và Bệnh viện FV.'
    ],
    investor: 'Hưng Lộc Phát Group',
    legal: 'Sổ hồng sở hữu lâu dài',
    handover: 'Bàn giao nhà ngay, full nội thất'
  },
  {
    id: 3,
    title: 'DỰ ÁN CĂN HỘ GREEN STAR TP. QUẬN 7, TP.HCM',
    slug: 'du-an-can-ho-green-star-quan-7',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Xanh Singapore',
    statusBadge: 'Dự án đang phân phối',
    price: '3.90 Tỷ VNĐ',
    priceNum: 3.90,
    area: '75 m²',
    areaNum: 75,
    location: 'Đường Phạm Hữu Lầu, Phường Phú Mỹ, Quận 7, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    featured: true,
    desc: 'Khu phức hợp căn hộ xanh chăm sóc sức khỏe và sắc đẹp đầu tiên tại khu Nam Sài Gòn với hồ cảnh quan 7.000m² và tổ hợp suối khoáng nóng Onsen.',
    details: [
      'Công nghệ: Sơn kháng khuẩn nano, kính Low-E cản tia cực tím 99%.',
      'Tiện ích: Công viên nhiệt đới Luna Park, đài phun nước nghệ thuật, vườn thảo mộc trị liệu.',
      'Chính sách: Hỗ trợ vay ngân hàng 70% với lãi suất 0% trong 24 tháng.'
    ],
    investor: 'Hưng Lộc Phát Land',
    legal: 'Sổ hồng vĩnh viễn',
    handover: 'Quý 4/2026'
  },
  {
    id: 4,
    title: 'DỰ ÁN CĂN HỘ ECO GREEN QUẬN 7, TP.HCM (MỚI NHẤT)',
    slug: 'du-an-can-ho-eco-green-quan-7',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Công Viên 22ha',
    statusBadge: 'Dự án đang phân phối',
    price: '4.20 Tỷ VNĐ',
    priceNum: 4.20,
    area: '80 m²',
    areaNum: 80,
    location: 'Đại lộ Nguyễn Văn Linh, Phường Tân Thuận Tây, Quận 7, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200&q=80'
    ],
    featured: true,
    desc: 'Đại đô thị sinh thái 14ha tọa lạc ngay cửa ngõ kết nối Quận 7 sang Quận 1 qua cầu Thủ Thiêm 4, liền kề công viên Hương Tràm 22ha.',
    details: [
      'Quy mô: 7 tòa tháp cao 36 tầng + Khách sạn 5 sao Grand Hyatt 69 tầng.',
      'Trang bị nội thất: Thiết bị vệ sinh Duravit, bếp Bosch, máy lạnh âm trần Daikin.',
      'Tầm nhìn: View trực diện sông Sài Gòn và trung tâm tài chính Thủ Thiêm.'
    ],
    investor: 'Xuân Mai Corp & Hưng Lộc Phát F1',
    legal: 'Sổ hồng lâu dài',
    handover: 'Nhận nhà ở ngay'
  },
  {
    id: 5,
    title: 'DỰ ÁN CĂN HỘ HƯNG PHÁT SILVER STAR NHÀ BÈ',
    slug: 'du-an-can-ho-hung-phat-silver-star-nha-be',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Hiện Đại',
    statusBadge: 'Dự án đang phân phối',
    price: '2.85 Tỷ VNĐ',
    priceNum: 2.85,
    area: '72 m²',
    areaNum: 72,
    location: 'Đường Nguyễn Hữu Thọ, Phước Kiển, Huyện Nhà Bè, TP.HCM',
    city: 'TP. Hồ Chí Minh',
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80'
    ],
    featured: true,
    desc: 'Căn hộ chung cư mặt tiền trục giao thông huyết mạch Nguyễn Hữu Thọ, cách Phú Mỹ Hưng chỉ 3 phút di chuyển.',
    details: [
      'Quy mô: 3 block cao 24 tầng với 447 căn hộ tiện nghi.',
      'Tiện ích: Trung tâm thương mại 3 tầng, hồ bơi chân mây, gym & yoga cao cấp.',
      'Cộng đồng: Cư dân văn minh, hệ thống bảo vệ an ninh đa lớp 24/7.'
    ],
    investor: 'Hưng Lộc Phát Group',
    legal: 'Sổ hồng trao tay',
    handover: 'Đã bàn giao & đang đón cư dân'
  },
  {
    id: 6,
    title: 'DỰ ÁN DIAMOND ISLAND CONDOTEL HƯNG LỘC PHÁT',
    slug: 'du-an-diamond-island-condotel-hung-loc-phat',
    category: 'condotel',
    categoryLabel: 'Condotel Biển 5 Sao',
    statusBadge: 'Dự án đang phân phối',
    price: '1.65 Tỷ VNĐ',
    priceNum: 1.65,
    area: '45 m²',
    areaNum: 45,
    location: 'Đường Huỳnh Thúc Kháng, Mũi Né, TP. Phan Thiết, Bình Thuận',
    city: 'Phan Thiết',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'
    ],
    featured: true,
    desc: 'Tổ hợp căn hộ khách sạn condotel view trực diện biển Mũi Né, cam kết lợi nhuận cho thuê 12%/năm trong 5 năm đầu tiên.',
    details: [
      'Đặc quyền: Tặng 15 đêm nghỉ dưỡng miễn phí hàng năm trên toàn hệ thống resort.',
      'Quản lý: Thương hiệu quốc tế Accor Hotels vận hành tiêu chuẩn 5 sao.',
      'Kết nối: Chỉ mất 10 phút đến Sân bay Phan Thiết và Cao tốc Dầu Giây - Phan Thiết.'
    ],
    investor: 'Hưng Lộc Phát Land & NovaWorld',
    legal: 'Sổ hồng thương mại dịch vụ 50 năm',
    handover: 'Quý 1/2027'
  }
];

export const BDS08_SIDEBAR_INTERESTS = [
  { id: 1, title: 'DỰ ÁN PHỐ MỸ GOLD CITY BÀ RỊA VŨNG TÀU', slug: 'du-an-pho-my-gold-city-ba-ria-vung-tau', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=200&q=80' },
  { id: 2, title: 'DỰ ÁN CĂN HỘ GOLDEN STAR QUẬN 7, TP.HCM', slug: 'du-an-can-ho-golden-star-quan-7', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80' },
  { id: 3, title: 'DỰ ÁN CĂN HỘ GREEN STAR TP. QUẬN 7, TP.HCM', slug: 'du-an-can-ho-green-star-quan-7', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80' },
  { id: 4, title: 'DỰ ÁN CĂN HỘ BLUE STAR HƯNG LỘC PHÁT', slug: 'du-an-can-ho-green-star-quan-7', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80' },
  { id: 5, title: 'DỰ ÁN CĂN HỘ HƯNG PHÁT SILVER STAR NHÀ BÈ', slug: 'du-an-can-ho-hung-phat-silver-star-nha-be', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&q=80' },
  { id: 6, title: 'DỰ ÁN DIAMOND LAND MŨI NÉ PHAN THIẾT', slug: 'du-an-diamond-island-condotel-hung-loc-phat', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80' }
];

export const BDS08_NEWS_EVENTS: NewsItem[] = [
  {
    id: 1,
    title: 'Dự án Căn hộ Condotel Oyster Gành Hào Vũng Tàu',
    slug: 'du-an-can-ho-condotel-oyster-ganh-hao-vung-tau',
    date: '28 Tháng Tư, 2026',
    author: 'Ban Quản Lý',
    category: 'Tin Tức - Sự Kiện',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
    excerpt: 'Dự án condotel mặt tiền biển Gành Hào sở hữu thế tựa sơn hướng thủy đón đầu lượng khách du lịch...',
    content: [
      'Oyster Gành Hào là điểm sáng nổi bật trên cung đường biển Trần Phú - Vũng Tàu.',
      'Dự án được trang bị hồ bơi chân mây tầng thượng và sky bar ngắm toàn cảnh biển Đông.'
    ],
    views: 4120
  },
  {
    id: 2,
    title: 'Bảng giá dự án căn hộ Golden Star tháng 08/2026',
    slug: 'bang-gia-du-an-can-ho-golden-star-thang-8-2026',
    date: '25 Tháng Tư, 2026',
    author: 'Phòng Kinh Doanh',
    category: 'Tin Tức - Sự Kiện',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&q=80',
    excerpt: 'Cập nhật bảng giá giỏ hàng ngoại giao đợt mới nhất từ chủ đầu tư Hưng Lộc Phát với chiết khấu đến 8%...',
    content: [
      'Các căn hộ 2 phòng ngủ diện tích 68m2 đang có mức giá hấp dẫn chỉ từ 3.45 tỷ đồng.',
      'Khách hàng thanh toán sớm được tặng gói nội thất cao cấp trị giá 150 triệu đồng.'
    ],
    views: 3890
  },
  {
    id: 3,
    title: 'Có nên mua căn hộ Blue Star từ Hưng Lộc Phát?',
    slug: 'co-nen-mua-can-ho-blue-star-tu-hung-loc-phat',
    date: '20 Tháng Tư, 2026',
    author: 'Chuyên Gia BĐS',
    category: 'Tin Tức - Sự Kiện',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    excerpt: 'Phân tích chi tiết tiềm năng tăng giá và khả năng khai thác cho thuê của tổ hợp Blue Star Quận 7...',
    content: [
      'Vị trí đắc địa tại cửa ngõ khu đô thị Phú Mỹ Hưng đảm bảo tỷ suất sinh lời trên 8%/năm.',
      'Chủ đầu tư uy tín với lịch sử bàn giao sổ hồng đúng hẹn trên hàng loạt dự án trước đó.'
    ],
    views: 5200
  },
  {
    id: 4,
    title: 'Căn hộ mẫu dự án Green Star TP.HCM Quận 7',
    slug: 'can-ho-mau-du-an-green-star-tphcm-quan-7',
    date: '15 Tháng Tư, 2026',
    author: 'Phòng Marketing',
    category: 'Tin Tức - Sự Kiện',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80',
    excerpt: 'Khai trương nhà mẫu Green Star thu hút hơn 1.000 lượt khách tham quan trong tuần lễ đầu tiên...',
    content: [
      'Không gian sống xanh chuẩn resort được tái hiện chân thực với ban công rộng và view sông thoáng đãng.'
    ],
    views: 2980
  },
  {
    id: 5,
    title: 'Summer Land Mũi Né — Điểm đầu tư sáng giá năm 2026',
    slug: 'summer-land-mui-ne-diem-dau-tu-sang-gia-2026',
    date: '10 Tháng Tư, 2026',
    author: 'Nghiên Cứu Thị Trường',
    category: 'Tin Tức - Sự Kiện',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    excerpt: 'Đón sóng cao tốc Dầu Giây - Phan Thiết và sân bay, BĐS nghỉ dưỡng Phan Thiết bứt phá ngoạn mục...',
    content: [
      'Tổ hợp giải trí Summer Land mang đến cơ hội sinh lời kép từ tăng giá vốn và kinh doanh lưu trú.'
    ],
    views: 6140
  }
];

export const BDS08_COMPANY_ACTIVITIES: NewsItem[] = [
  {
    id: 1,
    title: 'Lễ bàn giao sổ hồng đợt 3 cho cư dân Golden Star',
    slug: 'le-ban-giao-so-hong-dot-3-cu-dan-golden-star',
    date: '28 Tháng Tư, 2026',
    author: 'Ban Pháp Lý',
    category: 'Hoạt Động Công Ty',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400&q=80',
    excerpt: 'Hưng Lộc Phát trao tận tay hơn 150 sổ hồng sở hữu lâu dài cho cư dân tòa tháp tháp A...',
    content: [
      'Sự kiện khẳng định cam kết pháp lý vững vàng và trách nhiệm cao nhất của chủ đầu tư đối với khách hàng.'
    ],
    views: 4500
  },
  {
    id: 2,
    title: 'Lễ ký kết hợp tác chiến lược dự án NovaWorld',
    slug: 'le-ky-ket-hop-tac-chien-luoc-du-an-novaworld',
    date: '22 Tháng Tư, 2026',
    author: 'Ban Giám Đốc',
    category: 'Hoạt Động Công Ty',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
    excerpt: 'Hưng Lộc Phát Land chính thức trở thành đại lý phân phối chiến lược F1 dự án NovaWorld Phan Thiết...',
    content: [
      'Thỏa thuận hợp tác mở ra nhiều cơ hội đầu tư hấp dẫn với quỹ sản phẩm đẹp nhất giỏ hàng.'
    ],
    views: 3900
  },
  {
    id: 3,
    title: 'Chương trình thiện nguyện Tiếp Sức Đến Trường 2026',
    slug: 'chuong-trinh-thien-nguyen-tiep-suc-den-truong-2026',
    date: '18 Tháng Tư, 2026',
    author: 'Công Đoàn Công Ty',
    category: 'Hoạt Động Công Ty',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    excerpt: 'Trao tặng 200 suất học bổng cho học sinh nghèo hiếu học tại tỉnh Bình Thuận...',
    content: [
      'Hoạt động an sinh xã hội là một phần không thể thiếu trong triết lý phát triển bền vững của doanh nghiệp.'
    ],
    views: 2800
  },
  {
    id: 4,
    title: 'Hội nghị sơ kết hoạt động kinh doanh Quý 1/2026',
    slug: 'hoi-nghi-so-ket-hoat-dong-kinh-doanh-quy-1-2026',
    date: '12 Tháng Tư, 2026',
    author: 'Khối Kinh Doanh',
    category: 'Hoạt Động Công Ty',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80',
    excerpt: 'Vinh danh các chiến binh sale xuất sắc và trao thưởng 3 xe hơi Mercedes cho Best Seller...',
    content: [
      'Doanh số Quý 1 tăng trưởng 180% so với cùng kỳ năm trước nhờ chiến lược chuyển đổi số hiệu quả.'
    ],
    views: 3100
  },
  {
    id: 5,
    title: 'Chuyến tham quan thực địa dự án Phú Mỹ Gold City',
    slug: 'chuyen-tham-quan-thuc-dia-du-an-phu-my-gold-city',
    date: '05 Tháng Tư, 2026',
    author: 'Ban Tổ Chức',
    category: 'Hoạt Động Công Ty',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    excerpt: 'Đoàn hơn 200 nhà đầu tư TP.HCM tham gia hành trình trải nghiệm thực tế hạ tầng dự án...',
    content: [
      'Hơn 80% sản phẩm mở bán trong ngày đã được khách hàng đặt cọc giữ chỗ thành công.'
    ],
    views: 4300
  }
];

export const BDS08_CAREERS = [
  {
    id: 1,
    title: 'Tuyển Dụng 15 Chuyên Viên Tư Vấn Bất Động Sản Cao Cấp',
    salary: '15 - 50 Triệu + Hoa Hồng Đến 100Tr/Giao Dịch',
    location: 'Quận 7, TP. Hồ Chí Minh & Cầu Giấy, Hà Nội',
    deadline: '30/09/2026',
    requirements: ['Đam mê kinh doanh, nhanh nhẹn, tự tin giao tiếp', 'Không yêu cầu kinh nghiệm, được đào tạo bài bản', 'Được hỗ trợ data khách hàng nét & marketing hàng tuần']
  },
  {
    id: 2,
    title: 'Tuyển Dụng 02 Trưởng Nhóm Kinh Doanh (Team Leader)',
    salary: '25 - 70 Triệu + Thưởng KPI Nhóm',
    location: 'TP. Hồ Chí Minh',
    deadline: '25/09/2026',
    requirements: ['Tối thiểu 1 năm kinh nghiệm quản lý đội ngũ sale BĐS', 'Kỹ năng dẫn dắt, truyền lửa và chốt deal dự án lớn', 'Có sẵn đội nhóm từ 5 nhân sự là một lợi thế']
  },
  {
    id: 3,
    title: 'Tuyển Dụng 01 Chuyên Viên Pháp Lý Dự Án BĐS',
    salary: '18 - 25 Triệu (Thỏa thuận theo năng lực)',
    location: 'Hà Nội & TP.HCM',
    deadline: '20/09/2026',
    requirements: ['Tốt nghiệp Đại học Luật chính quy', 'Hiểu sâu Luật Đất đai, Luật Nhà ở, thủ tục công chứng sang tên', 'Cẩn trọng, trung thực, có khả năng làm việc độc lập']
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
  if (clean === 'du-an' || clean === 'projects') return { page: 'projects', propSlug: '', artSlug: '' };
  if (clean === 'hoat-dong' || clean === 'activities') return { page: 'activities', propSlug: '', artSlug: '' };
  if (clean === 'tuyen-dung' || clean === 'career') return { page: 'career', propSlug: '', artSlug: '' };
  if (['can-ho', 'dat-nen', 'condotel', 'biet-thu', 'shophouse'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS08Template({
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
  const [selectedProperty, setSelectedProperty] = useState<ProjectCardItem>(() => {
    if (initialParsed.propSlug) {
      const found = BDS08_PROJECTS.find(p => p.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return BDS08_PROJECTS[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = [...BDS08_NEWS_EVENTS, ...BDS08_COMPANY_ACTIVITIES].find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return BDS08_NEWS_EVENTS[0];
  });

  // UI Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [partnerSlideIdx, setPartnerSlideIdx] = useState(0);

  // Form States
  const [quickLeadForm, setQuickLeadForm] = useState({ name: '', email: '', phone: '', project: 'Dự án Phố Mỹ Gold City' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-08';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = BDS08_PROJECTS.find(p => p.slug === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = [...BDS08_NEWS_EVENTS, ...BDS08_COMPANY_ACTIVITIES].find(a => a.slug === res.artSlug);
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
    else if (page === 'contact') urlSlug = 'lien-he';
    else if (page === 'projects') urlSlug = 'du-an';
    else if (page === 'activities') urlSlug = 'hoat-dong';
    else if (page === 'career') urlSlug = 'tuyen-dung';
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

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLeadForm.phone || !quickLeadForm.name) {
      alert('Vui lòng điền họ tên và số điện thoại nhận bảng giá!');
      return;
    }
    showToast(`🎉 Đã tiếp nhận đăng ký nhận bảng giá ${quickLeadForm.project} cho quý khách ${quickLeadForm.name} (${quickLeadForm.phone}). Chuyên viên sẽ gửi hồ sơ VIP qua Zalo trong 3 phút!`);
    setQuickLeadForm({ name: '', email: '', phone: '', project: 'Dự án Phố Mỹ Gold City' });
    setLeadModalOpen(false);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP BAR & STICKY HEADER
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      {/* Top Cyan Micro Bar */}
      <div className="bg-[#48C0D8] text-white text-xs py-1.5 px-4 hidden md:block font-medium">
        <div className={`${MAX_W} mx-auto flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <a href="mailto:admin@templatebds.com" className="flex items-center gap-1.5 hover:underline text-white">
              <Mail size={13} /> admin@templatebds.com
            </a>
            <span className="opacity-70">|</span>
            <span>Hotline 24/7: <strong>0919 006 030</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('contact')} className="hover:underline cursor-pointer">Liên hệ</button>
            <span className="opacity-50">|</span>
            <button onClick={() => showToast('Chức năng đăng nhập thành viên đang được tích hợp với hệ sinh thái CMS!')} className="hover:underline cursor-pointer">Đăng nhập</button>
            <Search size={14} className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`${MAX_W} mx-auto px-4 py-3 flex items-center justify-between gap-3`}>
        {/* Brand Logo with 3D Blocks */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-sm bg-gradient-to-br from-[#0284C7] via-[#16A34A] to-[#EAB308] flex items-center justify-center text-white font-black shadow-md group-hover:scale-105 transition-transform p-2 shrink-0">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="whitespace-nowrap">
            <div className="flex items-center gap-1">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0284C7] group-hover:text-[#0369A1] transition">
                THEME
              </span>
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#E11D48]">
                WP
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#15803D] block uppercase font-extrabold">
              SÀN PHÂN PHỐI BẤT ĐỘNG SẢN CAO CẤP
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'home' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Trang Chủ
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'about' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Giới Thiệu
          </button>
          <button 
            onClick={() => navigate('projects')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'projects' || currentPage === 'property-detail' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Dự Án
          </button>
          <button 
            onClick={() => navigate('news')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'news' || currentPage === 'news-detail' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Tin Tức
          </button>
          <button 
            onClick={() => navigate('activities')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'activities' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Hoạt Động Công Ty
          </button>
          <button 
            onClick={() => navigate('career')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'career' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Tuyển Dụng
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all ${currentPage === 'contact' ? 'text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]' : 'hover:text-[#16A34A]'}`}
          >
            Liên Hệ
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="tel:0919006030"
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-black whitespace-nowrap shrink-0 hover:bg-emerald-100 transition"
          >
            <Phone size={13} className="text-[#16A34A] animate-pulse shrink-0" />
            <span>0919 006 030</span>
          </a>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs font-black rounded-sm shadow-md transition uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95"
          >
            Tải Báo Giá VIP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm bg-slate-100 text-slate-800 lg:hidden hover:bg-slate-200 shrink-0"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            <button onClick={() => navigate('home')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Trang Chủ</button>
            <button onClick={() => navigate('about')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Giới Thiệu</button>
            <button onClick={() => navigate('projects')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Dự Án</button>
            <button onClick={() => navigate('news')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Tin Tức</button>
            <button onClick={() => navigate('activities')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Hoạt Động</button>
            <button onClick={() => navigate('career')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Tuyển Dụng</button>
            <button onClick={() => navigate('contact')} className="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700">Liên Hệ</button>
          </div>
        </div>
      )}
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. HERO PANORAMA GOLF RESORT BANNER (EXACT MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHero = () => (
    <section className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-end text-white overflow-hidden bg-slate-900">
      {/* Background Golf Resort Panoramic Image */}
      <img
        src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80"
        alt="Golf Resort Banner"
        onError={handleImgError}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0284C7]/80" />

      {/* Script "Just for you" */}
      <div className="absolute top-8 left-8 sm:left-16 text-white/90 text-2xl sm:text-4xl font-serif italic drop-shadow-md select-none">
        Just for you
      </div>

      {/* Right Content Overlay Box */}
      <div className={`relative z-20 ${MAX_W} mx-auto px-4 py-12 flex justify-end w-full`}>
        <div className="max-w-md lg:max-w-lg text-right space-y-4">
          {/* Cyan Emblem Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0284C7] text-white text-xs font-bold shadow-md">
            <Building2 size={14} /> Đầu Tư Bất Động Sản
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-white font-black leading-tight drop-shadow-lg">
            Thanh toán ban đầu chỉ <span className="text-amber-300 not-italic font-sans font-black">500 triệu</span>
          </h1>

          <div className="inline-block px-5 py-2 rounded-sm bg-[#15803D] text-[#FDE047] text-xs sm:text-sm font-black tracking-wider uppercase shadow-xl border border-emerald-300/40">
            ★ SINH LỜI TỪ 12–15% MỖI NĂM ★
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href="tel:0919006030"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white text-slate-900 hover:bg-slate-100 transition shadow-2xl font-black text-sm sm:text-base border-2 border-emerald-500"
            >
              <Phone size={18} className="text-[#16A34A] animate-pulse" />
              <span>0919.006.030</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MAIN SECTION: 6 PROJECTS GRID + RIGHT SIDEBAR (MATCHING MOCKUP)
  // ─────────────────────────────────────────────────────────────────────────
  const renderProjectsAndSidebar = () => (
    <section className="py-12 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#15803D] uppercase">
            DỰ ÁN BẤT ĐỘNG SẢN ĐANG PHÂN PHỐI
          </h2>
          <div className="w-24 h-1 bg-[#16A34A] mx-auto rounded-sm" />
        </div>

        {/* 2-Column Layout: Left 8 Cols (6 Projects) + Right 4 Cols (Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 6 Project Cards Grid (2 rows x 3 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {BDS08_PROJECTS.map(proj => (
              <div
                key={proj.id}
                onClick={() => handleOpenProperty(proj)}
                className="group bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail with Green Badge */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#15803D] text-white text-[10px] font-bold shadow-md">
                      {proj.statusBadge}
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="p-3.5 space-y-2">
                    <h3 className="text-xs font-black text-slate-800 group-hover:text-[#16A34A] transition-colors leading-snug line-clamp-2 uppercase min-h-[34px]">
                      {proj.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin size={11} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{proj.city}</span>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E11D48] text-sm">{proj.price}</span>
                  <span className="text-[11px] font-bold text-slate-400">{proj.area}</span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR (Col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Button 1: Green Gradient */}
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full py-3.5 px-5 rounded-sm bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Download size={16} /> TẢI BÁO GIÁ DỰ ÁN
            </button>

            {/* Button 2: Sky Blue Gradient */}
            <button
              onClick={() => setLeadModalOpen(true)}
              className="w-full py-3.5 px-5 rounded-sm bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Gift size={16} /> THÔNG TIN ƯU ĐÃI
            </button>

            {/* Banner 3: Orange Hotline Box */}
            <div className="w-full p-4 rounded-sm bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-center shadow-lg space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest block opacity-90">TƯ VẤN 24/7</span>
              <a href="tel:0919006030" className="text-xl sm:text-2xl font-black block tracking-tight hover:underline">
                0919.006.030
              </a>
            </div>

            {/* Box: Có Thể Bạn Quan Tâm */}
            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-3">
              <h4 className="text-xs font-black uppercase text-[#15803D] tracking-wider border-b border-slate-200 pb-2">
                CÓ THỂ BẠN QUAN TÂM
              </h4>
              <div className="space-y-3">
                {BDS08_SIDEBAR_INTERESTS.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const found = BDS08_PROJECTS.find(p => p.slug === item.slug) || BDS08_PROJECTS[0];
                      handleOpenProperty(found);
                    }}
                    className="flex items-center gap-3 cursor-pointer group hover:bg-white p-1.5 rounded-sm transition"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      onError={handleImgError}
                      className="w-12 h-12 rounded-sm object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition"
                    />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#16A34A] leading-snug line-clamp-2 uppercase">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 4. EXPERT CONSULTANT PROFILE STRIP
  // ─────────────────────────────────────────────────────────────────────────
  const renderConsultantProfile = () => (
    <section className="py-8 bg-[#F8FAFC] border-y border-slate-200">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-white rounded-md p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-6 lg:gap-10">
          
          {/* Avatar Profile */}
          <div className="flex items-center gap-4 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
              alt="Trần Thanh Phương"
              className="w-20 h-20 rounded-sm object-cover border-4 border-emerald-100 shadow-md shrink-0"
            />
            <div>
              <h4 className="text-base font-black text-slate-900">Trần Thanh Phương</h4>
              <p className="text-xs text-slate-500 font-medium">Trưởng phòng kinh doanh</p>
              <a href="tel:0919006030" className="text-xs font-black text-[#E11D48] hover:underline block mt-0.5">
                Hotline: 0919 006 030
              </a>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-slate-200 shrink-0" />

          {/* Description Quote */}
          <div className="space-y-1 text-center md:text-left">
            <h5 className="text-xs font-black text-[#15803D] uppercase tracking-wider">
              CHUYÊN VIÊN TƯ VẤN LÂU NĂM KINH NGHIỆM
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Chuyên viên tư vấn của Hưng Lộc Phát Land là những người dày dặn kinh nghiệm, am hiểu sâu sắc trong lĩnh vực bất động sản và luôn tận tâm, nhiệt tình tư vấn giúp mang lại lợi ích và sự thỏa mãn tối đa cho mọi khách hàng.
            </p>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. 3 COLUMNS: TIN TỨC - HOẠT ĐỘNG - GIẢI THƯỞNG VINH DANH
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsAndAwards = () => (
    <section className="py-12 bg-white text-slate-800">
      <div className={`${MAX_W} mx-auto px-4`}>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CỘT 1: Tin tức - sự kiện */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase border-b-2 border-[#16A34A] pb-2">
              Tin tức — sự kiện
            </h3>
            <div className="space-y-3">
              {BDS08_NEWS_EVENTS.map(news => (
                <div
                  key={news.id}
                  onClick={() => handleOpenArticle(news)}
                  className="flex gap-3 cursor-pointer group p-1.5 rounded-sm hover:bg-slate-50 transition"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    onError={handleImgError}
                    className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition"
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-[#16A34A] line-clamp-2 leading-snug">
                      {news.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{news.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CỘT 2: Hoạt động công ty */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase border-b-2 border-[#0284C7] pb-2">
              Hoạt động công ty
            </h3>
            <div className="space-y-3">
              {BDS08_COMPANY_ACTIVITIES.map(act => (
                <div
                  key={act.id}
                  onClick={() => handleOpenArticle(act)}
                  className="flex gap-3 cursor-pointer group p-1.5 rounded-sm hover:bg-slate-50 transition"
                >
                  <img
                    src={act.image}
                    alt={act.title}
                    onError={handleImgError}
                    className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition"
                  />
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-[#0284C7] line-clamp-2 leading-snug">
                      {act.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CỘT 3: Giải thưởng vinh danh TOP 10 thương hiệu */}
          <div className="bg-slate-900 text-white rounded-sm overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-5 space-y-4">
            <div>
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80"
                alt="Award Gala"
                className="w-full h-44 object-cover rounded-sm border border-white/20 mb-3"
              />
              <span className="text-[11px] font-extrabold text-[#FDE047] uppercase tracking-wider block text-center">
                ★ VINH DANH THƯƠNG HIỆU UY TÍN ★
              </span>
              <h4 className="text-sm font-black text-center text-white mt-1">
                "Hưng Lộc Phát vào TOP 10 thương hiệu mạnh uy tín của Việt Nam"
              </h4>
              <p className="text-[11px] text-slate-300 text-center leading-relaxed mt-2">
                Liên hoan các Doanh nghiệp Rồng Vàng & Thương hiệu mạnh Việt Nam 2017-2018 vừa diễn ra tại Hà Nội nhằm tri ân Tập đoàn Hưng Lộc Phát lọt vào Top 10.
              </p>
            </div>
            
            <div className="pt-2 border-t border-slate-800 text-center">
              <span className="text-xs text-slate-400">HOTLINE: </span>
              <a href="tel:0919006030" className="text-xs font-black text-amber-400 hover:underline">
                0919 006 030
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. PARTNERS LOGO CAROUSEL
  // ─────────────────────────────────────────────────────────────────────────
  const renderPartners = () => {
    const partners = [
      { name: 'CCI FRANCE VIETNAM', icon: '🇫🇷', sub: 'CCI France' },
      { name: 'METROPOLIS', icon: '🏙️', sub: 'Metropolis Saigon' },
      { name: 'VINCITY', icon: '🌳', sub: 'VinCity Grand Park' },
      { name: 'VINHOMES', icon: '👑', sub: 'Vinhomes Central Park' },
      { name: 'TẬP ĐOÀN THĂNG LONG', icon: '🐲', sub: 'Thang Long Corp' },
      { name: 'HƯNG LỘC PHÁT', icon: '⭐', sub: 'Hung Loc Phat Land' }
    ];

    return (
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className={`${MAX_W} mx-auto px-4`}>
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setPartnerSlideIdx((partnerSlideIdx - 1 + partners.length) % partners.length)}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full text-center">
              {partners.map((p, i) => (
                <div key={i} className="p-3 bg-white rounded-sm border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-1 hover:border-emerald-400 transition">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{p.name}</span>
                  <span className="text-[9px] text-slate-400">{p.sub}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setPartnerSlideIdx((partnerSlideIdx + 1) % partners.length)}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 7. GREEN FOOTER BANNER: NOVAWORLD & FORM TẢI BÁO GIÁ NHANH
  // ─────────────────────────────────────────────────────────────────────────
  const renderGreenFooterBanner = () => (
    <section className="py-14 bg-[#15803D] text-white">
      <div className={`${MAX_W} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* CỘT 1: NovaWorld & Hưng Lộc Phát Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight block">
                NovaWorld PHAN THIẾT
              </span>
              <span className="text-sm font-extrabold text-emerald-100 block">
                Hưng Lộc Phát Land Phân Phối F1
              </span>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
              Trúng Top Phân Phối TOP 10 thương hiệu mạnh uy tín của Việt Nam! Liên hoan các Doanh nghiệp Rồng Vàng & Thương hiệu mạnh Việt Nam 2017-2018 vừa diễn ra tại Hà Nội nhằm tri ân Tập đoàn Hưng Lộc Phát lọt vào Top 10.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-sm bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center text-xs font-bold transition">FB</a>
              <a href="https://zalo.me/0919006030" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-sm bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center text-xs font-bold transition">ZL</a>
              <a href="tel:0919006030" className="w-8 h-8 rounded-sm bg-white/20 hover:bg-white text-white hover:text-emerald-700 flex items-center justify-center text-xs font-bold transition">📞</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-sm bg-white/20 hover:bg-white text-white hover:text-red-600 flex items-center justify-center text-xs font-bold transition">YT</a>
            </div>
          </div>

          {/* CỘT 2: Thông tin liên hệ */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 border-b border-white/20 pb-2">
              Thông tin liên hệ
            </h4>
            <div className="space-y-2 text-emerald-100">
              <p>📍 VPĐD: 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
              <p>📍 Trụ sở TP.HCM: Số 72 Nguyễn Thị Thập, Quận 7, TP.HCM</p>
              <p>📞 Hotline: <a href="tel:0919006030" className="font-bold text-white hover:underline">0919 006 030</a></p>
              <p>✉️ Email: admin@templatebds.com</p>
            </div>
          </div>

          {/* CỘT 3: Form Tải Báo Giá Nhanh */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 border-b border-white/20 pb-2">
              Tải báo giá nhanh
            </h4>
            <form onSubmit={handleQuickLeadSubmit} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Họ và tên..."
                value={quickLeadForm.name}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, name: e.target.value })}
                required
                className="w-full bg-white text-slate-800 px-3.5 py-2 rounded-lg focus:outline-none placeholder-slate-400"
              />
              <input
                type="email"
                placeholder="Địa chỉ Email..."
                value={quickLeadForm.email}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, email: e.target.value })}
                className="w-full bg-white text-slate-800 px-3.5 py-2 rounded-lg focus:outline-none placeholder-slate-400"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                value={quickLeadForm.phone}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, phone: e.target.value })}
                required
                className="w-full bg-white text-slate-800 px-3.5 py-2 rounded-lg focus:outline-none placeholder-slate-400 font-bold"
              />
              <select
                value={quickLeadForm.project}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, project: e.target.value })}
                className="w-full bg-white text-slate-800 px-3.5 py-2 rounded-lg focus:outline-none"
              >
                {BDS08_PROJECTS.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-black rounded-lg shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                Đăng ký nhận báo giá
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 8. SUBPAGES: ABOUT, PROJECTS, NEWS, PROPERTY DETAIL, NEWS DETAIL, CAREER
  // ─────────────────────────────────────────────────────────────────────────

  const renderPropertyDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('projects')} className="hover:text-emerald-700">Dự án</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedProperty.title}</span>
        </div>

        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#15803D] text-white text-xs font-bold mb-2">
              {selectedProperty.statusBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">{selectedProperty.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-[#16A34A]" /> {selectedProperty.location}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold">Giá bán chính thức:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#E11D48]">{selectedProperty.price}</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-80 sm:h-96 object-cover rounded-sm shadow" />
          <div className="grid grid-cols-2 gap-4">
            {selectedProperty.gallery.map((g, idx) => (
              <img key={idx} src={g} alt="Gallery" className="w-full h-36 sm:h-44 object-cover rounded-sm shadow" />
            ))}
          </div>
        </div>

        {/* Details & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-50 p-6 rounded-sm border space-y-4">
              <h3 className="text-lg font-black text-[#15803D] uppercase">Thông Tin Chi Tiết Dự Án</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.desc}</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedProperty.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-sm border space-y-4">
            <h3 className="text-base font-black text-slate-900 uppercase">Liên Hệ Đặt Lịch Xem Nhà</h3>
            <form onSubmit={handleQuickLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên quý khách..."
                required
                className="w-full p-3 rounded-sm border bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại (*)..."
                required
                className="w-full p-3 rounded-sm border bg-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-black rounded-sm uppercase tracking-wider"
              >
                Gửi Yêu Cầu Tư Vấn Ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsList = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#15803D] uppercase">TIN TỨC & BẤT ĐỘNG SẢN</h1>
          <p className="text-xs text-slate-500">Cập nhật tin tức thị trường và phân tích chuyên sâu</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...BDS08_NEWS_EVENTS, ...BDS08_COMPANY_ACTIVITIES].map(news => (
            <div
              key={news.id}
              onClick={() => handleOpenArticle(news)}
              className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#16A34A] uppercase">{news.category}</span>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2">{news.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{news.excerpt}</p>
                </div>
              </div>
              <div className="px-4 pb-4 text-[10px] text-slate-400 flex justify-between border-t pt-2">
                <span>{news.date}</span>
                <span>{news.views} lượt xem</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsDetail = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-6`}>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate('news')} className="hover:text-emerald-700">Tin tức</button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{selectedArticle.title}</span>
        </div>

        <div className="space-y-2 border-b pb-4">
          <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#15803D] text-[10px] font-bold uppercase">{selectedArticle.category}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{selectedArticle.title}</h1>
          <div className="text-xs text-slate-400 flex items-center gap-4">
            <span>📅 {selectedArticle.date}</span>
            <span>✍️ {selectedArticle.author}</span>
            <span>👁️ {selectedArticle.views} lượt xem</span>
          </div>
        </div>

        <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-80 sm:h-96 object-cover rounded-sm shadow" />

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          <p className="font-bold text-slate-900">{selectedArticle.excerpt}</p>
          {selectedArticle.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCareerPage = () => (
    <div className="py-12 bg-white text-slate-900 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#15803D] uppercase">CƠ HỘI NGHỀ NGHIỆP</h1>
          <p className="text-xs sm:text-sm text-slate-600">Gia nhập đội ngũ tư vấn chuyên nghiệp hàng đầu thị trường bất động sản</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BDS08_CAREERS.map(c => (
            <div key={c.id} className="bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-4 shadow-sm hover:shadow-lg transition">
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#15803D] text-[10px] font-extrabold uppercase">Đang tuyển</span>
              <h3 className="text-sm font-black text-slate-900">{c.title}</h3>
              <p className="text-xs font-bold text-[#E11D48]">💰 Mức lương: {c.salary}</p>
              <p className="text-xs text-slate-500">📍 Địa điểm: {c.location}</p>
              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t">
                {c.requirements.map((r, i) => (
                  <p key={i}>• {r}</p>
                ))}
              </div>
              <button
                onClick={() => {
                  alert('Vui lòng gửi CV về địa chỉ email: tuyendung@templatebds.com hoặc liên hệ hotline: 0919 006 030');
                }}
                className="w-full py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black rounded-sm uppercase tracking-wider transition"
              >
                Ứng Tuyển Ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-emerald-700 text-white px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-300" /> {toastMessage}
        </div>
      )}

      {/* LEFT FLOATING ACTION PILLS (EXACT MATCHING MOCKUP) */}
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
          href="tel:0919006030"
          className="px-3.5 py-1.5 rounded-sm bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black shadow-lg transition flex items-center gap-1.5 hover:scale-105"
        >
          <Phone size={13} className="animate-pulse" /> Hotline: 0919 006 030
        </a>
      </div>

      {/* LEAD MODAL POPUP */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-md p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-slate-200 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm hover:bg-slate-100 text-slate-500"
            >
              <X size={18} />
            </button>
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-[#15803D] uppercase tracking-wider">ĐĂNG KÝ NHẬN BẢNG GIÁ GỐC</span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Báo Giá & Ưu Đãi Đợt 1</h3>
              <p className="text-xs text-slate-500">Chuyên viên tư vấn cấp cao sẽ gửi bảng giá chi tiết qua Zalo trong 3 phút.</p>
            </div>
            <form onSubmit={handleQuickLeadSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Họ và tên của bạn..."
                required
                value={quickLeadForm.name}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, name: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại / Zalo (*)..."
                required
                value={quickLeadForm.phone}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, phone: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none font-bold text-[#0284C7]"
              />
              <select
                value={quickLeadForm.project}
                onChange={e => setQuickLeadForm({ ...quickLeadForm, project: e.target.value })}
                className="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none"
              >
                {BDS08_PROJECTS.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-black rounded-sm uppercase tracking-wider shadow-lg"
              >
                Gửi Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Layout Rendering */}
      <div>
        {renderHeader()}

        {currentPage === 'home' && (
          <main>
            {renderHero()}
            {renderProjectsAndSidebar()}
            {renderConsultantProfile()}
            {renderNewsAndAwards()}
            {renderPartners()}
            {renderGreenFooterBanner()}
          </main>
        )}

        {currentPage === 'property-detail' && renderPropertyDetail()}
        {currentPage === 'news-detail' && renderNewsDetail()}
        {(currentPage === 'news' || currentPage === 'activities') && renderNewsList()}
        {currentPage === 'career' && renderCareerPage()}
        {currentPage === 'projects' && renderProjectsAndSidebar()}
        {currentPage === 'about' && (
          <div className="py-12 bg-white text-slate-900">
            <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
              {renderConsultantProfile()}
              {renderNewsAndAwards()}
              {renderPartners()}
            </div>
          </div>
        )}
        {currentPage === 'contact' && (
          <div className="py-12 bg-white text-slate-900">
            <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
              {renderGreenFooterBanner()}
            </div>
          </div>
        )}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-08 (Hưng Lộc Phát Land & NovaWorld Phan Thiết)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
