'use client';
import { getCmsHero, getCmsQuickStats, getCmsPolicies, getCmsOverview } from '../../../utils/cmsSectionHelper';
import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Play, Download, Maximize2, Bed, Bath, Clock, Filter, ArrowUpRight,
  TrendingUp, Users, Briefcase, ExternalLink, HelpCircle, CheckCircle, Info,
  Key, Tag, RefreshCw, PhoneCall, PlusCircle, CheckSquare, Sparkle, Video, Globe
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';
import { syncDemoUrl } from '../../../utils/demo';
import { TenantConfigSchema, TenantMenuItem } from '@repo/types';
import { getDefaultTenantConfig } from '@repo/utils';

export interface TemplateProps {
  template: { name: string; slug: string; collectionSlug?: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  config?: TenantConfigSchema;
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
  id: string;
  title: string;
  slug: string;
  type: string;
  category: 'ban' | 'thue';
  price: string;
  priceNum: number; // in billion VND (if ban) or million VND (if thue)
  area: string;
  areaNum: number; // in m2
  beds?: number;
  baths?: number;
  direction?: string;
  location: string;
  district: string;
  city: string;
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
// BDS-16 MOCK DATA: {company?.name || 'TEMPLATESBDS'} (TRAO BẠN CUỘC SỐNG MƠ ƯỚC)
// ─────────────────────────────────────────────────────────────────────────────

export const BDS16_PROPERTIES: PropertyItem[] = [
  // 0. BUILDING & CHDV (TRUNG NGHĨA NHÀ PHỐ / S.HOUSE REFERENCE)
  {
    id: 'building-nguyen-luong-bang-q7',
    title: 'Bán Tòa Nhà Văn Phòng Mặt Tiền Nguyễn Lương Bằng, Quận 7 (1 Hầm 7 Lầu)',
    slug: 'ban-toa-nha-van-phong-nguyen-luong-bang-q7',
    type: 'Building',
    category: 'ban',
    price: '45 Tỷ VNĐ',
    priceNum: 45.0,
    area: '176 m²',
    areaNum: 176,
    direction: 'Hướng Đông Nam',
    location: 'Đường Nguyễn Lương Bằng, P. Tân Phú, Quận 7, TP.HCM',
    district: 'Quận 7',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Tòa nhà văn phòng chuẩn hạng B gồm 1 hầm, lửng và 7 lầu nổi, thang máy tốc độ cao, PCCC thẩm duyệt chuẩn nhà nước. Đang khai thác dòng tiền 180 triệu/tháng.',
    specs: ['Ngang 8m x 22m', '1 Hầm 7 Lầu', 'Dòng tiền 180 tr/tháng', 'Sổ hồng hoàn công đủ']
  },
  {
    id: 'chdv-him-lam-quan-7',
    title: 'Tòa Căn Hộ Dịch Vụ 20 Phòng Full Nội Thất KDC Him Lam, Tân Hưng, Quận 7',
    slug: 'toa-can-ho-dich-vu-20-phong-him-lam-q7',
    type: 'CHDV',
    category: 'ban',
    price: '28.5 Tỷ VNĐ',
    priceNum: 28.5,
    area: '125 m²',
    areaNum: 125,
    direction: 'Hướng Nam',
    location: 'Khu Dân Cư Him Lam, Phường Tân Hưng, Quận 7, TP.HCM',
    district: 'Quận 7',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Tòa nhà CHDV xây dựng kiên cố 6 tầng thang máy với 20 phòng khép kín cao cấp, doanh thu khoán đạt 110 triệu/tháng, tỷ suất sinh lời vượt trội.',
    specs: ['20 Phòng khép kín', 'Thang máy thẻ từ', 'Doanh thu 110 tr/th', 'Gần Lotte Mart Q7']
  },
  // 1. NHÀ ĐẤT BÁN
  {
    id: 'biet-thu-ciputra-tay-ho',
    title: 'Toàn Bộ Danh Sách Biệt Thự Đang Bán Ở Ciputra, Biệt Thự Đẹp Tây Hồ (Tuần 4 Tháng 8)',
    slug: 'toan-bo-danh-sach-biet-thu-ciputra-tay-ho',
    type: 'Biệt Thự',
    category: 'ban',
    price: '20 Tỷ VNĐ',
    priceNum: 20.0,
    area: '200 - 250 m²',
    areaNum: 220,
    direction: 'Không xác định',
    location: 'Khu Đô Thị Nam Thăng Long Ciputra, Tây Hồ, Hà Nội',
    district: 'Tây Hồ',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Biệt thự đơn lập và song lập Ciputra phân khu Q, K, G với không gian sân vườn rộng thoáng, trường quốc tế UNIS liền kề.',
    specs: ['Sổ đỏ chính chủ', 'Sân vườn rộng 80m²', 'An ninh 24/7', 'Gần UNIS Hanoi']
  },
  {
    id: 'nha-mat-tien-phan-dinh-phung-phu-nhuan',
    title: 'Cần bán nhà MT Phan Đình Phùng, P. 1, Phú Nhuận',
    slug: 'can-ban-nha-mt-phan-dinh-phung-phu-nhuan',
    type: 'Nhà Mặt Tiền',
    category: 'ban',
    price: '14 Tỷ VNĐ',
    priceNum: 14.0,
    area: '96 m²',
    areaNum: 96,
    direction: 'Hướng Tây Nam',
    location: 'Mặt tiền Phan Đình Phùng, Phường 1, Phú Nhuận, TP.HCM',
    district: 'Phú Nhuận',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Vị trí đắc địa kinh doanh sầm uất đa ngành nghề, kết nối Quận 1 và sân bay chỉ 5 phút lái xe.',
    specs: ['Mặt tiền 5.5m', '1 trệt 3 lầu', 'Đang cho thuê 45 tr/tháng', 'Sổ hồng vuông vắn']
  },
  {
    id: 'can-ho-ruby-city-long-bien',
    title: 'Bán chung cư Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng HN',
    slug: 'ban-chung-cu-ruby-city-long-bien',
    type: 'Căn Hộ Chung Cư',
    category: 'ban',
    price: '1.1 Tỷ VNĐ',
    priceNum: 1.1,
    area: '96 m²',
    areaNum: 96,
    direction: 'Hướng Tây Nam',
    location: 'Đường Phúc Lợi, Phường Giang Biên, Quận Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Căn hộ view thoáng mát nhìn sang phân khu Vinhomes Riverside, tiện ích hồ bơi, trường mầm non ngay dưới sảnh.',
    specs: ['3 Phòng ngủ', '2 WC', 'Full nội thất cơ bản', 'Hỗ trợ vay 70%']
  },
  {
    id: 'dat-nen-phu-my-hung-3',
    title: 'Đầu Tư Sinh Lời Cao — Thành Phố Sinh Thái Năm Sao — Khu Phú Mỹ Hưng 3, Lh: 0911.728.700',
    slug: 'dau-tu-sinh-loi-cao-thanh-pho-sinh-thai-nam-sao',
    type: 'Đất Nền Dự Án',
    category: 'ban',
    price: '3 Tỷ VNĐ',
    priceNum: 3.0,
    area: '120 m²',
    areaNum: 120,
    direction: 'Không xác định',
    location: 'Khu Đô Thị Sinh Thái Năm Sao Five Star Eco City, Nam Sài Gòn',
    district: 'Bình Chánh',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Khu đô thị sinh thái chuẩn nghỉ dưỡng 5 sao ven sông Cần Giuộc - Bình Chánh với hồ cánh sen trung tâm tuyệt đẹp.',
    specs: ['Sổ đỏ từng nền', 'Xây dựng tự do', 'Hạ tầng điện âm 100%', 'Đường nhựa 16m']
  },
  {
    id: 'can-ho-chung-cu-ruby-city-2',
    title: 'Bán căn hộ chung cư Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng, HN',
    slug: 'ban-can-ho-chung-cu-ruby-city-viet-hung',
    type: 'Căn Hộ Chung Cư',
    category: 'ban',
    price: '1.6 Tỷ VNĐ',
    priceNum: 1.6,
    area: '80 m²',
    areaNum: 80,
    direction: 'Hướng Đông Nam',
    location: 'KĐT Việt Hưng, Quận Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Căn góc 2 mặt thoáng hướng Đông Nam lộng gió, phòng khách rộng rãi đón ánh sáng tự nhiên ngập tràn.',
    specs: ['Căn góc ban công Đông Nam', '2 Phòng ngủ rộng', 'Sổ đỏ trao tay', 'Phí dịch vụ rẻ']
  },
  {
    id: 'ban-chcc-ruby-city-gia-re',
    title: 'Bán CHCC Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng HN',
    slug: 'ban-chcc-ruby-city-gia-re-long-bien',
    type: 'Căn Hộ Chung Cư',
    category: 'ban',
    price: '1.5 Tỷ VNĐ',
    priceNum: 1.5,
    area: '80 m²',
    areaNum: 80,
    direction: 'Hướng Tây Bắc',
    location: 'Đường Chu Huy Mân, Phường Phúc Đồng, Long Biên, Hà Nội',
    district: 'Long Biên',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Giá tốt nhất thị trường cho các gia đình trẻ an cư lập nghiệp, cách TTTM Aeon Mall Long Biên chỉ 5 phút.',
    specs: ['Giá rẻ nhất tòa', 'Ban công thoáng', 'Tặng full điều hòa', 'Nhận nhà ở ngay']
  },

  // 2. NHÀ CHO THUÊ
  {
    id: 'thue-phong-le-duc-tho',
    title: 'Chính Chủ Cho Thuê Phòng Kk Ngõ 89 Lê Đức Thọ, Cổng Làng Phú Mỹ, Giá Từ 2tr/Th, Ở Miễn Phí 15 Ngày',
    slug: 'chinh-chu-cho-thue-phong-kk-le-duc-tho',
    type: 'Nhà Cho Thuê',
    category: 'thue',
    price: '2.3 Triệu / Tháng',
    priceNum: 2.3,
    area: '30 m²',
    areaNum: 30,
    direction: 'Không xác định',
    location: 'Ngõ 89 Lê Đức Thọ, Cổng Làng Phú Mỹ, Nam Từ Liêm, Hà Nội',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Phòng khép kín sạch đẹp có ban công phơi đồ, nóng lạnh, điều hòa, giờ giấc tự do không chung chủ.',
    specs: ['Khép kín 100%', 'Có gác xép cao', 'Điều hòa & Nóng lạnh', 'Camera an ninh 24/7']
  },
  {
    id: 'thue-nha-tro-khap-ca-nuoc',
    title: 'Cho thuê nhà trọ khắp cả nước giá rẻ, diện tích từ 20 - 150 m2. Thích hợp sinh viên, vợ chồng trẻ',
    slug: 'cho-thue-nha-tro-khap-ca-nuoc-gia-re',
    type: 'Nhà Cho Thuê',
    category: 'thue',
    price: '5 Triệu / Tháng',
    priceNum: 5.0,
    area: '20 - 100 m²',
    areaNum: 45,
    direction: 'Hướng Nam',
    location: 'Hệ thống chuỗi nhà trọ dịch vụ EGA Land trên toàn quốc',
    district: 'Cả Nước',
    city: 'Toàn Quốc',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    hot: false,
    featured: true,
    description: 'Hệ thống phòng trọ và căn hộ mini tiêu chuẩn EGA Land Serviced Residences theo phong cách All-in-one.',
    specs: ['Đầy đủ tiện nghi', 'Bảo vệ chuyên nghiệp', 'Wifi tốc độ cao', 'Hỗ trợ hợp đồng']
  },
  {
    id: 'thue-can-ho-sunrise-city',
    title: 'Cho thuê căn hộ Sunrise City từ 1, 2, 3, 4, 5 PN penthouse',
    slug: 'cho-thue-can-ho-sunrise-city-quan-7',
    type: 'Căn Hộ Cho Thuê',
    category: 'thue',
    price: '7 Triệu / Tháng',
    priceNum: 7.0,
    area: '90 m²',
    areaNum: 90,
    direction: 'Hướng Nam',
    location: 'Đại lộ Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP.HCM',
    district: 'Quận 7',
    city: 'Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    hot: true,
    featured: true,
    description: 'Căn hộ đối diện Lotte Mart Quận 7, tiện ích đẳng cấp hồ bơi tràn 50m, phòng gym chuẩn 5 sao.',
    specs: ['Đối diện Lotte Mart', 'Hồ bơi tràn viền', 'Nội thất sang trọng', 'Thẻ từ an ninh']
  },
  {
    id: 'thue-can-ho-mini-ho-tung-mau',
    title: 'Cho thuê căn hộ mini đầy đủ tiện nghi tại 94 Hồ Tùng Mậu',
    slug: 'cho-thue-can-ho-mini-ho-tung-mau',
    type: 'Nhà Cho Thuê',
    category: 'thue',
    price: '5 Triệu / Tháng',
    priceNum: 5.0,
    area: '50 m²',
    areaNum: 50,
    direction: 'Hướng Tây Bắc',
    location: 'Số 94 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội',
    district: 'Cầu Giấy',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Gần các trường đại học Quốc Gia, Sư Phạm, Thương Mại. Phòng có bếp riêng, ban công thoáng gió.',
    specs: ['Thang máy tốc độ cao', 'Full đồ chỉ xách vali vào', 'Bếp tách riêng', 'Gần ga Metro']
  },
  {
    id: 'thue-chung-cu-mini-khuong-ha',
    title: 'Chính chủ cho thuê chung cư mini Khương Hạ, Thanh Xuân, Hà Nội',
    slug: 'chinh-chu-cho-thue-ccmn-khuong-ha',
    type: 'Nhà Cho Thuê',
    category: 'thue',
    price: '15 Triệu / Tháng',
    priceNum: 15.0,
    area: '50 m²',
    areaNum: 50,
    direction: 'Không xác định',
    location: 'Phố Khương Hạ, Phường Khương Đình, Quận Thanh Xuân, Hà Nội',
    district: 'Thanh Xuân',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Căn hộ 2 phòng ngủ cao cấp thiết kế hiện đại, ô tô đỗ chân cầu thang, khu dân trí văn minh.',
    specs: ['2 Phòng ngủ riêng biệt', 'Nội thất nhập khẩu', 'Ngõ ô tô vào tận nơi', 'Sẵn sàng dọn vào']
  },
  {
    id: 'thue-ccmn-khuong-dinh-nga-tu-so',
    title: 'Chính Chủ Cho Thuê Chung Cư Mini Cao Cấp Địa Chỉ 236 Khương Đình Gần Ngã Tư Sở',
    slug: 'cho-thue-ccmn-khuong-dinh-nga-tu-so',
    type: 'Nhà Cho Thuê',
    category: 'thue',
    price: '3 Triệu / Tháng',
    priceNum: 3.0,
    area: '35 m²',
    areaNum: 35,
    direction: 'Hướng Bắc',
    location: 'Số 236 Khương Đình, Ngã Tư Sở, Thanh Xuân, Hà Nội',
    district: 'Thanh Xuân',
    city: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    hot: false,
    featured: false,
    description: 'Cách ngã tư Sở và đại học Y Hà Nội 500m, thuận tiện đi lại tuyến đường sắt trên cao Cát Linh - Hà Đông.',
    specs: ['Gần Ngã Tư Sở', 'Giờ giấc tự do', 'Khóa vân tay cửa chính', 'Giá điện nước bình dân']
  }
];

export const BDS16_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'MUA CĂN HỘ RICHSTAR THANH TOÁN 1% MỖI THÁNG',
    slug: 'mua-can-ho-richstar-thanh-toan-1-moi-thang',
    date: '27/08/2026',
    author: 'EGANY Technology',
    category: 'Tin Tức',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    excerpt: 'Chính sách chi trả linh hoạt từ chủ đầu tư phù hợp với nhiều gia đình trẻ khi muốn sở hữu căn hộ giá 1,49 tỷ đồng tại quận Tân Phú, TP HCM. Đây là dự án đầu tiên của Novaland tại quận Tân Phú có tầm nhìn đẹp về công viên.',
    content: [
      'Chính sách chi trả linh hoạt từ chủ đầu tư phù hợp với nhiều gia đình trẻ khi muốn sở hữu căn hộ giá 1,49 tỷ đồng tại quận Tân Phú, TP HCM.',
      'Dự án RichStar sở hữu hai hồ bơi tràn bờ đẳng cấp quốc tế, phòng gym hiện đại và trung tâm thương mại phục vụ trọn vẹn nhu cầu cư dân.',
      'Khách hàng chỉ cần thanh toán 1% giá trị căn hộ mỗi tháng cho đến khi nhận nhà, ngân hàng liên kết hỗ trợ ân hạn nợ gốc.'
    ],
    views: 4120
  },
  {
    id: 2,
    title: 'THÊM 10 CĂN SHOPHOUSE PARK HILL PREMIUM TRONG NGÀY MỞ BÁN',
    slug: 'them-10-can-shophouse-park-hill-premium',
    date: '27/08/2026',
    author: 'EGANY Technology',
    category: 'Tin Tức',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    excerpt: 'Chủ đầu tư đã bổ sung thêm 10 căn shophouse thay vì 31 căn như kế hoạch tại buổi mở bán vừa diễn ra. Hơn 300 khách hàng đã đặt cọc trước để tham gia lễ bốc thăm quyền mua shophouse Vinhomes Times City - Park Hill Premium. Tuy nhiên do...',
    content: [
      'Sức hút cực lớn từ shophouse chân đế Park Hill Premium khiến chủ đầu tư phải mở thêm giỏ hàng đặc biệt trong đợt mở bán sáng nay.',
      'Với lượng cư dân hiện hữu lên tới hơn 30.000 người, các căn shophouse mang lại dòng tiền khai thác kinh doanh vượt trội.'
    ],
    views: 3890
  },
  {
    id: 3,
    title: 'DỰ ÁN CĂN HỘ 500 TRIỆU USD CÓ BIỂN ĐẢO NHÂN TẠO',
    slug: 'du-an-can-ho-500-trieu-usd-co-bien-dao-nhan-tao',
    date: '27/08/2026',
    author: 'EGANY Technology',
    category: 'Tin Tức',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    excerpt: 'Đây là dự án đầu tiên ở Việt Nam dành hẳn một hecta đất để xây dựng biển đảo nhân tạo ngay trong lòng khu căn hộ. Được phát triển bởi Công ty cổ phần Phát triển Bất động sản Phát Đạt, An Gia Investment và Quỹ đầu tư Creed Group.....',
    content: [
      'Biển hồ nhân tạo tích hợp công nghệ lọc nước thông minh mang lại trải nghiệm nghỉ dưỡng biển nhiệt đới ngay tại trung tâm thành phố.',
      'Dự án đón đầu làn sóng đầu tư bất động sản sức khỏe và wellness resort đang bùng nổ mạnh mẽ.'
    ],
    views: 5240
  },
  {
    id: 4,
    title: 'OFFICE-TEL KHU THỦ THIÊM ƯU ĐÃI THANH TOÁN 1,5% MỖI THÁNG',
    slug: 'office-tel-khu-thu-thiem-uu-dai-1-5',
    date: '27/08/2026',
    author: 'EGANY Technology',
    category: 'Tin Tức',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    excerpt: 'Khách hàng có thể lựa chọn lịch thanh toán linh hoạt 1,5% giá trị căn hộ office-tel The Sun Avenue mỗi tháng. Với giá bán từ 1,3 tỷ đồng một căn hộ văn phòng ngay bán đảo Thủ Thiêm, quận 2, TP HCM, đại diện chủ đầu tư - Tập đoàn.....',
    content: [
      'Mô hình văn phòng lưu trú Office-tel đang trở thành xu thế khởi nghiệp của hàng ngàn doanh nghiệp vừa và nhỏ.',
      'Vị trí chiến lược tại đại lộ Mai Chí Thọ giúp di chuyển vào trung tâm tài chính Quận 1 chỉ qua hầm Thủ Thiêm trong 3 phút.'
    ],
    views: 2980
  },
  {
    id: 5,
    title: 'BẤT ĐỘNG SẢN VÀ XÂY DỰNG VẪN TĂNG TRƯỞNG MẠNH TRONG QUÝ 3/2026',
    slug: 'bat-dong-san-va-xay-dung-tang-truong-manh-2026',
    date: '27/08/2026',
    author: 'EGANY Technology',
    category: 'Báo Chí',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Trong khi các ngành kinh tế khác chững lại trong quý 1/2016, thì ngành xây dựng và bất động sản lại duy trì đà tăng trưởng ấn tượng. Số liệu vừa công bố của Tổng Cục thống kê cho thấy, sự tăng trưởng ấn tượng của ngành xây dựng đi cùng.....',
    content: [
      'Báo cáo từ Tổng cục Thống kê ghi nhận tốc độ giải ngân vốn đầu tư công và hạ tầng giao thông trọng điểm thúc đẩy thị trường nhà đất khởi sắc.',
      'Các dự án có pháp lý hoàn chỉnh, chủ đầu tư uy tín và tiến độ thi công đảm bảo tiếp tục dẫn dắt thanh khoản thị trường.'
    ],
    views: 3410
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
  if (clean === 'nha-ban' || clean === 'for-sale') return { page: 'for-sale', propSlug: '', artSlug: '' };
  if (clean === 'nha-cho-thue' || clean === 'for-rent') return { page: 'for-rent', propSlug: '', artSlug: '' };
  if (clean === 'huong-dan' || clean === 'guide') return { page: 'guide', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS16Template({
  template,
  viewport = 'desktop',
  initialPage = 'home',
  config,
  company,
  theme,
  projects,
  posts, pageContent
}: TemplateProps) {
  // CMS Dynamic Section Data
  const cmsHero = getCmsHero(pageContent);
  const cmsStats = getCmsQuickStats(pageContent, []);
  const cmsPolicies = getCmsPolicies(pageContent, []);

  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  // Universal Tenant Config (Fallback-resilient)
  const resolvedConfig = useMemo<TenantConfigSchema>(() => {
    if (config) return config;
    return getDefaultTenantConfig('bds-16', {
      contact: {
        companyName: company?.name,
        phone: company?.phone,
        email: company?.email,
        address: company?.address,
        zalo: company?.social?.zalo || company?.phone,
        facebook: company?.social?.facebook,
        youtube: company?.social?.youtube,
        tiktok: company?.social?.tiktok,
      } as any,
      logo: {
        url: company?.logo,
        text: (company as any)?.logoText,
        slogan: company?.slogan,
      },
      theme: {
        primaryColor,
        secondaryColor,
        accentColor,
      },
    });
  }, [config, company, primaryColor, secondaryColor, accentColor]);

  // Hero Slider Carousel State
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    if (!resolvedConfig.heroSlider.enabled) return;
    const slidesCount = resolvedConfig.heroSlider.slides?.length || 0;
    if (slidesCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIdx(prev => (prev + 1) % slidesCount);
    }, (resolvedConfig.heroSlider.intervalSec || 5) * 1000);

    return () => clearInterval(timer);
  }, [resolvedConfig.heroSlider]);

  const activeProperties = useMemo<PropertyItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): PropertyItem => ({
        id: p.slug || `prop-${idx + 1}`,
        title: p.title || p.name || 'Bất động sản cao cấp',
        slug: p.slug || `bds-${idx + 1}`,
        type: p.type || 'Căn Hộ Cao Cấp',
        category: (p.category === 'thue' || p.category === 'cho-thue') ? 'thue' : 'ban',
        price: p.price || (p.priceFrom ? `${p.priceFrom} Tỷ` : 'Liên hệ'),
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 3.5),
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '80 m²'),
        areaNum: typeof p.area === 'number' ? p.area : 80,
        beds: p.beds || p.bedrooms || 2,
        baths: p.baths || p.bathrooms || 2,
        direction: p.direction || 'Đông Nam',
        location: p.address || p.location || 'TP. Hồ Chí Minh',
        district: p.district || 'Quận 2',
        city: p.city || 'TP. Hồ Chí Minh',
        image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        hot: Boolean(idx === 0),
        featured: Boolean(idx < 4),
        description: p.description || p.desc || 'Không gian sống hiện đại, tiện ích chuẩn quốc tế.',
        specs: Array.isArray(p.specs) ? p.specs : ['Sổ hồng lâu dài', 'Vị trí đắc địa', 'Giao thông thuận tiện'],
      }));
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS16_PROPERTIES).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS16_PROPERTIES;
  }, [projects]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức thị trường bất động sản',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Biên Tập',
        category: p.category || 'Tin Tức',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        excerpt: p.summary || p.excerpt || 'Cập nhật tin tức thị trường BĐS mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
      const customSlugs = new Set(customNews.map((cn: any) => cn.slug));
      const remainingDefaults = (BDS16_NEWS).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS16_NEWS;
  }, [posts, company]);

  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeProperties.find(p => p.slug === initialParsed.propSlug || p.id === initialParsed.propSlug);
      if (found) return found;
    }
    return activeProperties[0] || BDS16_PROPERTIES[0];
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = activeNews.find(n => n.slug === initialParsed.artSlug || n.id.toString() === initialParsed.artSlug);
      if (found) return found;
    }
    return activeNews[0] || BDS16_NEWS[0];
  });

  // Dynamic Properties from CMS or Default Mock
  const allProperties = useMemo(() => {
    if (projects && projects.length > 0) {
      const dynamicList: PropertyItem[] = projects.map(p => ({
        id: String(p.id || p.slug),
        title: String(p.title || p.name || 'Bất Động Sản EGA Land'),
        slug: String(p.slug || `bds-${p.id}`),
        type: String(p.type || p.category || 'Nhà Đất'),
        category: (p.category === 'thue' || p.category === 'cho-thue') ? 'thue' : 'ban',
        price: String(p.price || 'Thỏa thuận'),
        priceNum: parseFloat(String(p.priceNum || p.price)) || 5.0,
        area: String(p.area || '100 m²'),
        areaNum: parseFloat(String(p.areaNum || p.area)) || 100,
        beds: Number(p.beds || p.bedrooms) || 3,
        baths: Number(p.baths || p.bathrooms) || 2,
        direction: String(p.direction || 'Đông Nam'),
        location: String(p.location || p.address || 'Hà Nội'),
        district: String(p.district || p.city || 'Quận Trung Tâm'),
        city: String(p.city || 'Hà Nội'),
        image: String(p.image || p.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'),
        hot: Boolean(p.hot),
        featured: Boolean(p.featured),
        description: String(p.description || p.excerpt || 'Thông tin bất động sản chi tiết.'),
        specs: Array.isArray(p.specs) ? p.specs : ['Sổ hồng trao tay', 'Vị trí đắc địa', 'Pháp lý minh bạch']
      }));
      return dynamicList;
    }
    return BDS16_PROPERTIES;
  }, [projects]);

  // Dynamic Options derived from Data for 100% CMS Resilience
  const availableTypes = useMemo(() => {
    const set = new Set(allProperties.map(p => p.type).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [allProperties]);

  const availableDistricts = useMemo(() => {
    const set = new Set(allProperties.map(p => p.district).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [allProperties]);

  // Filter States
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loanModalOpen, setLoanModalOpen] = useState(false);

  // Forms
  const [loanForm, setLoanForm] = useState({ name: '', phone: '', income: '20 Triệu/Tháng' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tSlug = template?.slug || 'bds-16';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = allProperties.find(p => p.slug === res.propSlug || p.id === res.propSlug);
      if (found) setSelectedProperty(found);
    }
    if (res.artSlug) {
      const found = BDS16_NEWS.find(n => n.slug === res.artSlug || n.id.toString() === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage, allProperties]);

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
    else if (page === 'for-sale') urlSlug = 'nha-ban';
    else if (page === 'for-rent') urlSlug = 'nha-cho-thue';
    else if (page === 'guide') urlSlug = 'huong-dan';
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    syncDemoUrl(urlSlug, tSlug);
  };

  const handleMenuItemClick = (item: TenantMenuItem) => {
    setMobileMenuOpen(false);
    const target = item.target || '_self';
    const url = (item.url || '').trim();

    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (typeof window !== 'undefined') {
        window.open(url, target);
      }
      return;
    }

    const cleanUrl = url.toLowerCase().replace(/^\/+/, '');
    const labelLower = item.label.toLowerCase();

    if (!cleanUrl || cleanUrl === 'home' || labelLower.includes('trang chủ')) {
      setFilterType('all');
      navigate('home');
    } else if (cleanUrl.includes('gioi-thieu') || labelLower.includes('giới thiệu')) {
      navigate('about');
    } else if (cleanUrl.includes('tin-tuc') || labelLower.includes('tin tức')) {
      navigate('news');
    } else if (cleanUrl.includes('huong-dan') || labelLower.includes('hướng dẫn')) {
      navigate('guide');
    } else if (cleanUrl.includes('lien-he') || labelLower.includes('liên hệ')) {
      navigate('contact');
    } else if (cleanUrl.includes('nha-ban') || labelLower.includes('nhà bán')) {
      setFilterType('all');
      navigate('for-sale');
    } else if (cleanUrl.includes('nha-cho-thue') || labelLower.includes('cho thuê')) {
      setFilterType('all');
      navigate('for-rent');
    } else if (cleanUrl.includes('ban-do') || labelLower.includes('bản đồ')) {
      if (currentPage !== 'home') {
        navigate('home');
        setTimeout(() => {
          document.getElementById('ban-do-bds')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById('ban-do-bds')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (cleanUrl.includes('building') || labelLower.includes('building') || labelLower.includes('tòa nhà')) {
      navigate('home');
      setFilterType('Building');
      setTimeout(() => {
        document.getElementById('danh-sach-san-pham')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else if (cleanUrl.includes('chdv') || labelLower.includes('chdv') || labelLower.includes('căn hộ')) {
      navigate('home');
      setFilterType('CHDV');
      setTimeout(() => {
        document.getElementById('danh-sach-san-pham')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      navigate(cleanUrl);
    }
  };

  const isMenuItemActive = (item: TenantMenuItem) => {
    const cleanUrl = (item.url || '').toLowerCase().replace(/^\/+/, '');
    const labelLower = item.label.toLowerCase();

    if ((!cleanUrl || cleanUrl === 'home' || labelLower.includes('trang chủ')) && currentPage === 'home' && filterType === 'all') {
      return true;
    }
    if ((cleanUrl.includes('gioi-thieu') || labelLower.includes('giới thiệu')) && currentPage === 'about') return true;
    if ((cleanUrl.includes('tin-tuc') || labelLower.includes('tin tức')) && (currentPage === 'news' || currentPage === 'news-detail')) return true;
    if ((cleanUrl.includes('huong-dan') || labelLower.includes('hướng dẫn')) && currentPage === 'guide') return true;
    if ((cleanUrl.includes('lien-he') || labelLower.includes('liên hệ')) && currentPage === 'contact') return true;
    if ((cleanUrl.includes('nha-ban') || labelLower.includes('nhà bán')) && currentPage === 'for-sale') return true;
    if ((cleanUrl.includes('nha-cho-thue') || labelLower.includes('cho thuê')) && currentPage === 'for-rent') return true;
    if ((cleanUrl.includes('building') || labelLower.includes('building')) && filterType.toLowerCase().includes('building')) return true;
    if ((cleanUrl.includes('chdv') || labelLower.includes('chdv')) && filterType.toLowerCase().includes('chdv')) return true;
    return false;
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
      alert('Vui lòng nhập họ tên và số điện thoại đăng ký hỗ trợ vốn!');
      return;
    }
    showToast(`🎉 Tiếp nhận yêu cầu hỗ trợ vốn mua nhà từ ${loanForm.name} (${loanForm.phone}). Chuyên viên EGA Land sẽ liên hệ tư vấn trong 10 phút!`);
    setLoanForm({ name: '', phone: '', income: '20 Triệu/Tháng' });
    setLoanModalOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`🎉 Đã đăng ký nhận bản tin quan trọng của EGA Land thành công: ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';
  };

  // Resilient Fuzzy & Dynamic Filter
  const filteredProperties = useMemo(() => {
    return allProperties.filter(p => {
      // Category match based on currentPage
      if (currentPage === 'for-sale' && p.category !== 'ban') return false;
      if (currentPage === 'for-rent' && p.category !== 'thue') return false;

      // Keyword match
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const text = (p.title + ' ' + p.location + ' ' + p.district + ' ' + p.description).toLowerCase();
        if (!text.includes(kw)) return false;
      }

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
      if (filterPrice === '3-10' && (p.priceNum < 3 || p.priceNum > 10)) return false;
      if (filterPrice === 'above-10' && p.priceNum <= 10) return false;

      return true;
    });
  }, [allProperties, currentPage, searchKeyword, filterType, filterDistrict, filterPrice]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent') {
      setCurrentPageState('home');
      syncDemoUrl('', tSlug);
    }
    const count = filteredProperties.length;
    showToast(`🔍 Tìm thấy ${count} bất động sản phù hợp tiêu chí!`);
    setTimeout(() => {
      const resultsElem = document.getElementById('danh-sach-san-pham');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. TOP MICROBAR & HEADER {company?.name || 'TEMPLATESBDS'} (SHARP CORPORATE DESIGN)
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="sticky top-0 z-40 bg-[#071D2D] text-white shadow-md border-b border-slate-800">
      
      {/* Top Microbar Black/Navy */}
      <div className="bg-[#051420] text-slate-300 text-xs py-1 px-4 border-b border-slate-800 hidden md:block">
        <div className={`${MAX_W} mx-auto flex items-center justify-between text-[11px]`}>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('contact')} className="hover:text-amber-400 transition flex items-center gap-1.5">
              <Mail size={12} className="text-amber-400" />
              <span>{resolvedConfig.contact.email}</span>
            </button>
            <a href={`tel:${resolvedConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-amber-400 transition flex items-center gap-1.5">
              <Phone size={12} className="text-amber-400" />
              <span>Hotline: <strong className="text-amber-300">{resolvedConfig.contact.phone}</strong></span>
            </a>
            {resolvedConfig.contact.address && (
              <span className="text-slate-400 hidden lg:inline-flex items-center gap-1">
                <MapPin size={11} className="text-amber-400" />
                {resolvedConfig.contact.address}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {resolvedConfig.contact.facebook && (
              <a href={resolvedConfig.contact.facebook} target="_blank" rel="noreferrer" className="hover:text-amber-400" title="Facebook">f</a>
            )}
            {resolvedConfig.contact.youtube && (
              <a href={resolvedConfig.contact.youtube} target="_blank" rel="noreferrer" className="hover:text-amber-400" title="YouTube">▶</a>
            )}
            {resolvedConfig.contact.zalo && (
              <a href={`https://zalo.me/${resolvedConfig.contact.zalo.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-amber-400 font-bold" title="Zalo">Zalo</a>
            )}
            {resolvedConfig.contact.tiktok && (
              <a href={resolvedConfig.contact.tiktok} target="_blank" rel="noreferrer" className="hover:text-amber-400 font-bold" title="TikTok">TT</a>
            )}
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Navigation */}
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4`}>
        
        {/* Logo */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0"
        >
          {resolvedConfig.logo.url ? (
            <div className="bg-white p-1 sm:p-1.5 border border-slate-300 shadow-sm flex items-center justify-center shrink-0">
              <img
                src={resolvedConfig.logo.url}
                alt={resolvedConfig.logo.text || resolvedConfig.contact.companyName}
                className="h-8 sm:h-11 w-auto max-w-[180px] object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="bg-white p-1.5 sm:p-2 border border-slate-300 shadow-sm flex flex-col items-center shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-[#E11D48] rotate-45 transform -translate-y-0.5" />
                <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                  {resolvedConfig.logo.text || (company as any)?.logoText || "S.HOUSE"}
                </span>
              </div>
              <span className="text-[6.5px] sm:text-[7.5px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                {resolvedConfig.logo.slogan || "TRAO BẠN CUỘC SỐNG MƠ ƯỚC"}
              </span>
            </div>
          )}

          {/* Brand Name / Title beside Logo */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base font-black text-white tracking-wide uppercase truncate leading-tight">
              {resolvedConfig.contact.brandTitle || resolvedConfig.contact.companyName || "TRUNG NGHĨA NHÀ PHỐ"}
            </span>
            <span className="text-[9px] sm:text-[10.5px] text-amber-300/90 font-medium tracking-normal truncate leading-tight mt-0.5">
              {resolvedConfig.contact.slogan || "CHUYÊN TÒA NHÀ & CĂN HỘ DỊCH VỤ QUẬN 7"}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          {resolvedConfig.navigation.menuItems
            .filter(item => item.visible !== false)
            .map(item => {
              const active = isMenuItemActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item)}
                  className={`whitespace-nowrap px-3.5 py-2 transition-all cursor-pointer ${
                    active ? 'bg-[#0B3556] text-amber-400 font-extrabold border-b-2 border-amber-400' : 'hover:text-amber-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 shrink-0 flex items-center justify-center ml-auto cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#051420] border-t border-slate-800 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
            {resolvedConfig.navigation.menuItems
              .filter(item => item.visible !== false)
              .map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item)}
                  className="p-2.5 text-left bg-slate-900 hover:text-amber-400 text-slate-200"
                >
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Sub-banner Breadcrumb Bar with Tab indicator */}
      <div className="bg-[#0D3B66] text-white py-1.5 px-4 text-center border-t border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
          {currentPage === 'for-rent' ? 'Nhà Cho Thuê' : currentPage === 'for-sale' ? 'Nhà Bán' : currentPage === 'news' || currentPage === 'news-detail' ? 'Tin Tức' : currentPage === 'about' ? 'Giới Thiệu' : currentPage === 'guide' ? 'Hướng Dẫn' : `${company?.name || 'TEMPLATESBDS'}— Bất Động Sản Toàn Quốc`}
        </span>
      </div>
    </header>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 2. LEFT SIDEBAR COMPONENT (MATCHING MOCKUP 100%)
  // ─────────────────────────────────────────────────────────────────────────
  const renderSidebar = () => (
    <div className="space-y-6">
      
      {/* 1. Box Tìm Kiếm Bất Động Sản */}
      <div className="bg-white p-4 border border-slate-300 shadow-sm space-y-3">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b pb-2">
          TÌM KIẾM BẤT ĐỘNG SẢN
        </h3>
        <form onSubmit={handleSearchSubmit} className="space-y-2.5 text-xs">
          <input
            type="text"
            placeholder="Tìm kiếm từ khóa..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-[#D97706]"
          />

          {/* Dynamic Types */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 px-2.5 py-2 text-slate-800 focus:outline-none"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Loại BĐS (Tất cả)</option>
            {availableTypes.filter(t => t !== 'all').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Dynamic Districts */}
          <select
            value={filterDistrict}
            onChange={e => setFilterDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 px-2.5 py-2 text-slate-800 focus:outline-none"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Khu vực (Tất cả)</option>
            {availableDistricts.filter(d => d !== 'all').map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          <select
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 px-2.5 py-2 text-slate-800 focus:outline-none"
          >
            <option className="text-slate-900 bg-white font-medium" value="all">Mức giá (Tất cả)</option>
            <option className="text-slate-900 bg-white font-medium" value="under-3">Dưới 3 Tỷ (hoặc Dưới 5 Triệu)</option>
            <option className="text-slate-900 bg-white font-medium" value="3-10">3 - 10 Tỷ (hoặc 5 - 10 Triệu)</option>
            <option className="text-slate-900 bg-white font-medium" value="above-10">Trên 10 Tỷ (hoặc Trên 10 Triệu)</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase shadow-sm transition cursor-pointer"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* 2. Menu Danh Mục (ở trang tin tức) */}
      {(currentPage === 'news' || currentPage === 'news-detail') && (
        <div className="bg-white p-4 border border-slate-300 shadow-sm space-y-2 text-xs">
          <button 
            onClick={() => navigate('news')}
            className="w-full text-left py-1.5 font-bold text-slate-800 hover:text-[#D97706] flex items-center gap-2 border-b border-slate-100"
          >
            📑 Tin Tức
          </button>
          <button 
            onClick={() => navigate('news')}
            className="w-full text-left py-1.5 font-bold text-slate-800 hover:text-[#D97706] flex items-center gap-2"
          >
            📰 Báo Chí
          </button>
        </div>
      )}

      {/* 3. Banner Quảng Cáo 1: Căn Nhà Mơ Ước Trong Tầm Tay */}
      <div 
        onClick={() => setLoanModalOpen(true)}
        className="relative overflow-hidden border border-slate-300 shadow-md group cursor-pointer"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
          alt="Căn nhà mơ ước trong tầm tay"
          onError={handleImgError}
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
          <div className="bg-[#0B3556]/90 p-2 text-center border border-white/20">
            <span className="text-xs font-black uppercase text-amber-300 block">CĂN NHÀ MƠ ƯỚC TRONG TẦM TAY</span>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[11px] font-bold text-amber-200 uppercase tracking-wider">CHƯƠNG TRÌNH HỖ TRỢ VỐN MUA NHÀ</p>
            <span className="inline-block px-3 py-1 bg-[#D97706] text-white text-[10px] font-black uppercase shadow">ĐĂNG KÝ NGAY ›</span>
          </div>
        </div>
      </div>

      {/* 4. Banner Quảng Cáo 2: Chính Sách Ưu Việt */}
      <div 
        onClick={() => showToast('📞 Đang kết nối tới Hotline tư vấn ưu đãi: 1900.636.099 (hoặc 0919 006 030)...')}
        className="relative overflow-hidden border border-slate-300 shadow-md group cursor-pointer"
      >
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
          alt="Chính sách ưu việt dành riêng cho bạn"
          onError={handleImgError}
          className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-4 text-white">
          <div className="bg-[#0B3556]/90 p-2 text-center border border-white/20">
            <span className="text-xs font-black uppercase text-amber-300 block">CHÍNH SÁCH ƯU VIỆT DÀNH RIÊNG CHO BẠN</span>
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-white uppercase">Hotline: <strong className="text-amber-400">1900.636.099</strong></p>
            <p className="text-[10px] text-slate-300">0919 006 030 — Hỗ Trợ 24/7</p>
          </div>
        </div>
      </div>

    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MAIN CONTENT: HERO SHOWCASE BANNER / INTERACTIVE SLIDER
  // ─────────────────────────────────────────────────────────────────────────
  const renderHeroShowcase = () => {
    const slides = resolvedConfig.heroSlider.slides;
    if (!resolvedConfig.heroSlider.enabled || !slides || slides.length === 0) {
      let title = 'EGAHOMES RIVERSIDE';
      let subtitle = 'Mở Bán Biệt Thự Hoa Sữa 10&11';
      let image = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80';

      if (currentPage === 'for-rent') {
        title = 'OFFICE-TEL KHU THỦ THIÊM';
        subtitle = 'Ưu Đãi Thanh Toán 1,5% Mỗi Tháng';
        image = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';
      }

      return (
        <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden border border-slate-300 shadow-md group">
          <img
            src={image}
            alt={title}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div className="bg-black/60 backdrop-blur-sm p-4 border border-white/20 max-w-xl text-white space-y-1">
              <h2 className="text-lg sm:text-2xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-md">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const currentSlide = slides[currentSlideIdx % slides.length] || slides[0];

    return (
      <div className="relative aspect-[16/8] sm:aspect-[16/7] overflow-hidden border border-slate-300 shadow-md group select-none">
        {/* Slide Image */}
        <img
          key={currentSlide.id}
          src={currentSlide.imageUrl}
          alt={currentSlide.title}
          onError={handleImgError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6">
          <div className="bg-black/65 backdrop-blur-sm p-3.5 sm:p-5 border border-white/20 max-w-2xl text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {currentSlide.badge && (
                <span className="bg-[#E11D48] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                  {currentSlide.badge}
                </span>
              )}
              {currentSlide.price && (
                <span className="bg-[#D97706] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow">
                  {currentSlide.price}
                </span>
              )}
              {currentSlide.location && (
                <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                  <MapPin size={11} className="text-amber-400" /> {currentSlide.location}
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-2xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow leading-tight">
              {currentSlide.title}
            </h2>

            {currentSlide.subtitle && (
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-medium">
                {currentSlide.subtitle}
              </p>
            )}

            {currentSlide.actionUrl && (
              <button
                onClick={() => {
                  if (currentSlide.actionUrl?.startsWith('http')) {
                    window.open(currentSlide.actionUrl, '_blank');
                  } else {
                    handleMenuItemClick({
                      id: 'slide-action',
                      label: currentSlide.actionText || 'Xem Chi Tiết',
                      url: currentSlide.actionUrl || '/',
                      order: 1,
                      visible: true,
                    });
                  }
                }}
                className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase rounded shadow transition cursor-pointer"
              >
                <span>{currentSlide.actionText || 'Xem Chi Tiết'}</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Carousel Prev/Next Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIdx(prev => (prev - 1 + slides.length) % slides.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full backdrop-blur-sm border border-white/20 transition cursor-pointer"
              aria-label="Slide trước"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlideIdx(prev => (prev + 1) % slides.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full backdrop-blur-sm border border-white/20 transition cursor-pointer"
              aria-label="Slide tiếp"
            >
              <ChevronRight size={20} />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-2 right-4 flex items-center gap-1.5 z-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlideIdx(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    (currentSlideIdx % slides.length) === idx
                      ? 'bg-amber-400 w-6'
                      : 'bg-white/50 hover:bg-white/80 w-2.5'
                  }`}
                  aria-label={`Tới slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 3.5. INTERACTIVE MAP SECTION
  // ─────────────────────────────────────────────────────────────────────────
  const renderMapSection = () => {
    const mapAddress = resolvedConfig.contact.address || 'Quận 7, TP. Hồ Chí Minh';
    const embedSrc = resolvedConfig.contact.googleMapsEmbed || `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

    return (
      <div id="ban-do-bds" className="bg-white p-4 sm:p-5 border border-slate-300 shadow-sm space-y-3">
        <div className="border-b-2 border-[#D97706] pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h2 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MapPin size={18} className="text-[#D97706]" />
            Bản Đồ Vị Trí & Khu Vực Hoạt Động
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {mapAddress}
          </span>
        </div>
        <div className="aspect-[16/7] w-full border border-slate-200 overflow-hidden shadow-inner bg-slate-100">
          <iframe
            src={embedSrc}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title="Bản đồ vị trí bất động sản"
          />
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 4. MAIN CONTENT: 6 PROPERTY CARDS (2 COLUMNS x 3 ROWS)
  // ─────────────────────────────────────────────────────────────────────────
  const renderPropertyGrid = () => (
    <div id="danh-sach-san-pham" className="space-y-6">
      
      {/* Title Bar */}
      <div className="border-b-2 border-[#D97706] pb-2 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider">
          {currentPage === 'for-rent' ? 'NHÀ CHO THUÊ' : currentPage === 'for-sale' ? 'NHÀ BÁN' : 'BẤT ĐỘNG SẢN NỔI BẬT'}
        </h2>
        {(filterType !== 'all' || filterDistrict !== 'all' || filterPrice !== 'all' || searchKeyword) && (
          <button
            onClick={() => {
              setFilterType('all');
              setFilterDistrict('all');
              setFilterPrice('all');
              setSearchKeyword('');
              showToast('🔄 Đã đặt lại bộ lọc tìm kiếm!');
            }}
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={12} /> Xem tất cả ({allProperties.length})
          </button>
        )}
      </div>

      {/* Description text under title matching mockup */}
      {currentPage === 'for-rent' && (
        <p className="text-xs text-slate-600 italic">
          Được đầu tư bởi Tập đoàn Egagroup, hệ thống căn hộ và biệt thự cho thuê Egaland Serviced Residences theo phong cách &quot;All-in-one&quot;
        </p>
      )}

      {/* 6 Cards 2 Columns */}
      {filteredProperties.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-300 space-y-3">
          <p className="text-sm font-bold text-slate-600">Không tìm thấy bất động sản nào khớp hoàn toàn với tiêu chí này.</p>
          <button
            onClick={() => {
              setFilterType('all');
              setFilterDistrict('all');
              setFilterPrice('all');
              setSearchKeyword('');
            }}
            className="px-5 py-2 bg-[#D97706] text-white font-bold text-xs uppercase shadow"
          >
            Xem Tất Cả Bất Động Sản
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProperties.map(prop => (
            <div 
              key={prop.id}
              className="bg-white text-slate-900 border border-slate-300 p-3 shadow-sm hover:shadow-md transition flex flex-col justify-between font-medium"
            >
              {/* Title Top */}
              <h3 
                onClick={() => handleOpenProperty(prop)}
                className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-[#D97706] cursor-pointer min-h-[34px] leading-tight mb-2"
              >
                {prop.title}
              </h3>

              {/* Middle: Image Left + Specs Table Right */}
              <div className="grid grid-cols-12 gap-3 items-stretch">
                
                {/* Image Left */}
                <div 
                  onClick={() => handleOpenProperty(prop)}
                  className="col-span-5 relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer"
                >
                  <img
                    src={prop.image}
                    alt={prop.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  {prop.hot && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#E11D48] text-white text-[8px] font-black uppercase">
                      HOT
                    </span>
                  )}
                </div>

                {/* Specs Table Right */}
                <div className="col-span-7 bg-slate-50 p-2 border border-slate-200 flex flex-col justify-between text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <Maximize2 size={12} className="text-[#0D3B66] shrink-0" />
                    <span>{prop.area}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Home size={12} className="text-[#0D3B66] shrink-0" />
                    <span>{prop.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Compass size={12} className="text-[#0D3B66] shrink-0" />
                    <span>{prop.direction || 'Không xác định'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin size={12} className="text-[#0D3B66] shrink-0" />
                    <span>{prop.district}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Price in Bold Red */}
              <div className="pt-2.5 mt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-black text-[#E11D48]">
                  {prop.price}
                </span>
                <button
                  onClick={() => handleOpenProperty(prop)}
                  className="px-2 py-0.5 bg-[#0D3B66] hover:bg-[#D97706] text-white text-[10px] font-bold uppercase transition cursor-pointer"
                >
                  Chi Tiết ›
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 bg-[#D97706] text-white font-bold flex items-center justify-center">1</button>
          <button className="w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center">2</button>
        </div>
        <button 
          onClick={() => showToast('📄 Bạn đang ở trang xem danh sách sản phẩm EGA Land')}
          className="text-slate-500 hover:text-amber-600 font-medium"
        >
          Trang sau &gt;&gt;
        </button>
      </div>

    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 5. MAIN CONTENT: NEWS LIST (MATCHING MOCKUP IMAGE 2)
  // ─────────────────────────────────────────────────────────────────────────
  const renderNewsList = () => (
    <div className="space-y-6">
      
      <div className="border-b-2 border-[#D97706] pb-2">
        <h2 className="text-base sm:text-lg font-serif font-black text-slate-900 uppercase tracking-wider">
          TIN TỨC BẤT ĐỘNG SẢN
        </h2>
      </div>

      <div className="space-y-6 divide-y divide-slate-200">
        {activeNews.map(n => (
          <div key={n.id} className="pt-6 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-5 items-start group">
            
            {/* Image Left */}
            <div 
              onClick={() => handleOpenArticle(n)}
              className="md:col-span-4 relative aspect-[16/10] overflow-hidden bg-slate-100 border border-slate-300 cursor-pointer"
            >
              <img
                src={n.image}
                alt={n.title}
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content Right */}
            <div className="md:col-span-8 space-y-2">
              <h3 
                onClick={() => handleOpenArticle(n)}
                className="text-xs sm:text-sm font-black text-slate-900 uppercase hover:text-[#D97706] cursor-pointer leading-snug"
              >
                {n.title}
              </h3>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span>🕒 {n.date}</span>
                <span>👤 {n.author}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {n.excerpt}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 bg-[#D97706] text-white font-bold flex items-center justify-center">1</button>
          <button className="w-6 h-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center">2</button>
        </div>
        <button 
          onClick={() => showToast('📄 Bạn đang ở trang tin tức EGA Land')}
          className="text-slate-500 hover:text-amber-600 font-medium"
        >
          Trang sau &gt;&gt;
        </button>
      </div>

    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SECTION: FOOTER 3 BLOCKS & PARTNER LOGOS (MATCHING MOCKUP 100%)
  // ─────────────────────────────────────────────────────────────────────────
  const renderEgaFooter = () => (
    <footer className="bg-[#051420] text-slate-300 text-xs border-t border-slate-800">
      
      {/* 3 Main Footer Columns */}
      <div className={`${MAX_W} mx-auto px-4 py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Đăng ký nhận bản tin */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2">
              ĐĂNG KÝ NHẬN BẢN TIN
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Xin vui lòng để lại địa chỉ email, chúng tôi sẽ cập nhật những tin tức quan trọng của EGA Land tới quý khách.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Nhập email vào đây"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 px-3 py-2 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase shadow cursor-pointer"
              >
                Đăng ký
              </button>
            </form>
          </div>

          {/* Col 2: Liên hệ */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2">
              LIÊN HỆ
            </h4>
            
            <div className="space-y-1">
              <span className="font-bold text-amber-300 uppercase block text-[11px]">BẤT ĐỘNG SẢN BÁN</span>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>EGA Land City: 098 765 432</li>
                <li>EGA Land - Sea: 1800 1080</li>
                <li>EGA Land - Riverside: 098 765 432</li>
                <li>EGA Land Hill: 098 765 432</li>
              </ul>
            </div>

            <div className="space-y-1 pt-2">
              <span className="font-bold text-amber-300 uppercase block text-[11px]">BẤT ĐỘNG SẢN CHO THUÊ</span>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>Hà Nội: 098 765 432</li>
                <li>TP.HCM: 098 765 432</li>
              </ul>
            </div>
          </div>

          {/* Col 3: Thông Tin Doanh Nghiệp */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-white uppercase tracking-wider text-sm border-b border-slate-800 pb-2">
              {resolvedConfig.contact.companyName}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {resolvedConfig.contact.slogan || 'Nền tảng phân phối và quản lý bất động sản cao cấp, mang lại giải pháp an cư và đầu tư sinh lời vượt trội cho khách hàng.'}
            </p>
            <p className="text-slate-400 text-xs">
              Trụ sở: {resolvedConfig.contact.address}
            </p>
            <p className="text-slate-400 text-xs">
              Email: {resolvedConfig.contact.email} | Hotline: {resolvedConfig.contact.phone}
            </p>
          </div>

        </div>
      </div>

      {/* Partner Logos Bar */}
      <div className="bg-[#030d15] py-4 border-t border-slate-800 px-4">
        <div className={`${MAX_W} mx-auto flex flex-wrap items-center justify-around gap-6 opacity-75 grayscale hover:grayscale-0 transition`}>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">TIMES CITY</span>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">PARK HILL</span>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">VINPEARL</span>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">VINGROUP</span>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">SUN GROUP</span>
          <span className="font-serif font-black text-sm tracking-widest text-slate-300">MASTERISE</span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-white text-slate-600 text-[11px] py-3 text-center border-t border-slate-200 px-4">
        © {new Date().getFullYear()} {resolvedConfig.contact.companyName}. {resolvedConfig.contact.address} | Hotline: {resolvedConfig.contact.phone} | Email: {resolvedConfig.contact.email}
      </div>

    </footer>
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#D97706] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#071D2D] text-white border border-amber-400 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-amber-400" /> {toastMessage}
        </div>
      )}

      {/* Loan Modal */}
      {loanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-slate-300 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-serif font-black text-sm text-slate-900 uppercase">CHƯƠNG TRÌNH HỖ TRỢ VỐN MUA NHÀ</h3>
              <button onClick={() => setLoanModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleLoanSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={loanForm.name}
                  onChange={e => setLoanForm({ ...loanForm, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-slate-300 p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={loanForm.phone}
                  onChange={e => setLoanForm({ ...loanForm, phone: e.target.value })}
                  placeholder="0912 345 678"
                  className="w-full border border-slate-300 p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Thu nhập hàng tháng</label>
                <select
                  value={loanForm.income}
                  onChange={e => setLoanForm({ ...loanForm, income: e.target.value })}
                  className="w-full border border-slate-300 p-2 focus:outline-none"
                >
                  <option className="text-slate-900 bg-white font-medium" value="15 Triệu/Tháng">Dưới 20 Triệu / Tháng</option>
                  <option className="text-slate-900 bg-white font-medium" value="30 Triệu/Tháng">20 - 50 Triệu / Tháng</option>
                  <option className="text-slate-900 bg-white font-medium" value="Trên 50 Triệu/Tháng">Trên 50 Triệu / Tháng</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold uppercase shadow cursor-pointer"
              >
                Gửi Đăng Ký Tư Vấn Vay
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        {renderHeader()}

        {/* 2 Columns Body Layout */}
        <main className="py-8">
          <div className={`${MAX_W} mx-auto px-4`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Sidebar (3.5 / 12) */}
              <aside className="lg:col-span-4 xl:col-span-3">
                {renderSidebar()}
              </aside>

              {/* Right Column: Main Content (8.5 / 12) */}
              <section className="lg:col-span-8 xl:col-span-9 space-y-8">
                
                {/* 1. Home / For-Sale / For-Rent Page */}
                {(currentPage === 'home' || currentPage === 'for-sale' || currentPage === 'for-rent') && (
                  <>
                    {renderHeroShowcase()}
                    {renderPropertyGrid()}
                    {currentPage === 'home' && renderMapSection()}
                  </>
                )}

                {/* 2. News Page */}
                {currentPage === 'news' && (
                  <>
                    {renderNewsList()}
                  </>
                )}

                {/* 3. About Page */}
                {currentPage === 'about' && (
                  <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <h1 className="text-xl font-serif font-black text-slate-900 uppercase border-b pb-2">
                      GIỚI THIỆU TẬP ĐOÀN BẤT ĐỘNG SẢN {resolvedConfig.contact.companyName || company?.name || 'TEMPLATESBDS'}
                    </h1>
                    <p>
                      {resolvedConfig.contact.companyName} là một trong những thương hiệu tiên phong trong lĩnh vực đầu tư, phát triển và phân phối bất động sản nhà ở, căn hộ dịch vụ cao cấp và biệt thự nghỉ dưỡng sinh thái trên khắp cả nước.
                    </p>
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80" alt="" className="w-full h-80 object-cover border" />
                    <p>
                      Với phương châm &quot;{resolvedConfig.logo.slogan || 'Trao bạn cuộc sống mơ ước'}&quot;, chúng tôi cam kết mang tới cho từng khách hàng những sản phẩm bất động sản có pháp lý minh bạch 100%, tiềm năng sinh lời vượt trội và chất lượng dịch vụ chuyên nghiệp hàng đầu.
                    </p>
                  </div>
                )}

                {/* 4. Guide Page */}
                {currentPage === 'guide' && (
                  <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <h1 className="text-xl font-serif font-black text-slate-900 uppercase border-b pb-2">
                      HƯỚNG DẪN MUA BÁN & THUÊ NHÀ ĐẤT TẠI {resolvedConfig.contact.companyName || company?.name || 'TEMPLATESBDS'}
                    </h1>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-1">Bước 1: Tìm kiếm bất động sản phù hợp</strong>
                        <p className="text-slate-600 text-xs">Sử dụng bộ lọc thông minh theo loại hình, khu vực và khoảng giá.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-1">Bước 2: Xem nhà thực tế & Thẩm định pháp lý</strong>
                        <p className="text-slate-600 text-xs">Chuyên viên hỗ trợ kiểm tra quy hoạch và dẫn xem trực tiếp miễn phí.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block mb-1">Bước 3: Đặt cọc & Công chứng chuyển nhượng</strong>
                        <p className="text-slate-600 text-xs">Thực hiện ký hợp đồng công chứng an toàn, minh bạch tại văn phòng công chứng nhà nước.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Contact Page */}
                {currentPage === 'contact' && (
                  <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-6">
                    <h1 className="text-xl font-serif font-black text-slate-900 uppercase border-b pb-2">
                      LIÊN HỆ VỚI CHÚNG TÔI
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="space-y-3 text-slate-700">
                        <p>📍 <strong>Trụ sở chính:</strong> {resolvedConfig.contact.address}</p>
                        <p>📞 <strong>Hotline:</strong> {resolvedConfig.contact.phone} {resolvedConfig.contact.hotline && resolvedConfig.contact.hotline !== resolvedConfig.contact.phone ? `— ${resolvedConfig.contact.hotline}` : ''}</p>
                        <p>✉ <strong>Email:</strong> {resolvedConfig.contact.email}</p>
                        {resolvedConfig.contact.workingHours && (
                          <p>⏰ <strong>Giờ làm việc:</strong> {resolvedConfig.contact.workingHours}</p>
                        )}
                        {resolvedConfig.contact.zalo && (
                          <p>💬 <strong>Zalo tư vấn 24/7:</strong> {resolvedConfig.contact.zalo}</p>
                        )}
                      </div>
                      <div className="h-64 border border-slate-300">
                        <iframe 
                          src={resolvedConfig.contact.googleMapsEmbed || `https://maps.google.com/maps?q=${encodeURIComponent(resolvedConfig.contact.address || 'Quận 7, TP.HCM')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                          title="Bản đồ liên hệ"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Property Detail Page */}
                {currentPage === 'property-detail' && (
                  <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-6">
                    <button onClick={() => navigate('home')} className="text-xs font-bold text-amber-700 hover:underline">
                      ‹ Quay lại danh sách
                    </button>
                    <h1 className="text-xl font-serif font-black text-slate-900 uppercase">
                      {selectedProperty.title}
                    </h1>
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="text-lg font-black text-[#E11D48]">{selectedProperty.price}</span>
                      <span className="text-xs font-bold text-slate-600">Diện tích: {selectedProperty.area}</span>
                    </div>
                    <PropertyImageGallery images={(selectedProperty as any)?.gallery || (selectedProperty as any)?.images} image={(selectedProperty as any)?.image || (selectedProperty as any)?.thumbnail} badge1={(selectedProperty as any)?.type || (selectedProperty as any)?.badge} badge2={(selectedProperty as any)?.direction || (selectedProperty as any)?.zone} themeColor="blue" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedProperty.description}</p>
                    <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="font-bold text-xs uppercase text-slate-900">Đặc điểm nổi bật:</h4>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        {selectedProperty.specs.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">✔ {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 7. News Detail Page */}
                {currentPage === 'news-detail' && (
                  <div className="bg-white p-6 border border-slate-300 shadow-sm space-y-6">
                    <button onClick={() => navigate('news')} className="text-xs font-bold text-amber-700 hover:underline">
                      ‹ Quay lại trang tin tức
                    </button>
                    <h1 className="text-xl font-serif font-black text-slate-900 uppercase">
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
                )}

              </section>

            </div>
          </div>
        </main>

        {renderEgaFooter()}
      </div>

      {/* Universal Footer & Copyright */}
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-16 (EGA Land — Trao Bạn Cuộc Sống Mơ Ước)"
        onNavigate={page => navigate(page)}
      />

    </div>
  );
}
