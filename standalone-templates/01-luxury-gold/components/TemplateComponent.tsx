'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { syncDemoUrl } from '../lib/demo';
import Link from 'next/link';
import { Crown, Star, Phone, Mail, MapPin, ChevronRight, ChevronLeft, Play, Download, Award, Users, Building2, TrendingUp, Shield, Clock, ArrowRight, CheckCircle, ChevronDown, Menu, X, Search, Facebook, Youtube, Instagram } from 'lucide-react';
import { MAX_W } from '../lib/design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E8C97E';
const DARK = '#0A0A0F';
const DARK2 = '#12121A';
const DARK3 = '#1A1A24';
const WHITE = '#FFFFFF';
const OFFWHITE = '#F8F5EF';
const MUTED = '#9A9AA8';

const FONT_HEADING = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

// ── REAL ESTATE DATA ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    name: 'Penthouse Sky Residences',
    location: 'TP. Hồ Chí Minh',
    price: '85 Tỷ VNĐ',
    priceVal: 85,
    area: '650m²',
    type: 'Penthouse',
    status: 'Còn 3 căn',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    tag: 'HOT',
    desc: 'Penthouse thông tầng đẳng cấp bậc nhất Quận 1 với hồ bơi vô cực riêng và tầm nhìn bao quát toàn bộ sông Sài Gòn và trung tâm thành phố.',
    specs: '5 Phòng ngủ · 6 Phòng vệ sinh · Bể bơi riêng · Hầm rượu mini · Sân vườn trên không',
    amenities: ['Hồ bơi vô cực', 'Thang máy riêng', 'Smart home Crestron', 'Phòng xông hơi riêng']
  },
  {
    id: 2,
    name: 'Grand Villa Riverside',
    location: 'Hà Nội',
    price: '45 Tỷ VNĐ',
    priceVal: 45,
    area: '420m²',
    type: 'Mansion',
    status: 'Mở bán',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
    tag: 'VIP',
    desc: 'Biệt thự đơn lập hướng sông phong cách Tân cổ điển lịch lãm tại Vinhomes Riverside, mang lại không gian sống thanh bình và biệt lập.',
    specs: '4 Phòng ngủ · 5 Phòng vệ sinh · Sân vườn rộng 200m² · Gara 3 xe ô tô',
    amenities: ['Sân vườn lớn', 'Hồ cá Koi', 'Hệ thống an ninh 3 lớp', 'Sát bờ sông']
  },
  {
    id: 3,
    name: 'The Manor Ocean View',
    location: 'Đà Nẵng',
    price: '32 Tỷ VNĐ',
    priceVal: 32,
    area: '380m²',
    type: 'Beach Villa',
    status: 'Sắp ra mắt',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    tag: 'NEW',
    desc: 'Biệt thự nghỉ dưỡng mặt biển với bãi cát trắng riêng, hồ bơi tràn bờ và thiết kế mở đón gió đại dương mát lành.',
    specs: '3 Phòng ngủ · 4 Phòng vệ sinh · Bể bơi riêng · Sân hiên tắm nắng',
    amenities: ['Lối đi biển riêng', 'Bể bơi vô cực sát biển', 'Quầy bar ngoài trời', 'Dịch vụ quản gia 24/7']
  },
  {
    id: 4,
    name: 'Lâu Đài Tây Hồ Tây',
    location: 'Hà Nội',
    price: '120 Tỷ VNĐ',
    priceVal: 120,
    area: '850m²',
    type: 'Mansion',
    status: 'Độc quyền',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'EXCLUSIVE',
    desc: 'Dinh thự lâu đài tráng lệ thiết kế theo kiến trúc lâu đài cổ điển Pháp, tọa lạc tại vị trí đắc địa nhất quận Tây Hồ.',
    specs: '6 Phòng ngủ · 8 Phòng vệ sinh · Hầm rượu 50m² · Sân vườn châu Âu',
    amenities: ['Kiến trúc cổ điển Pháp', 'Hầm rượu kiểm soát nhiệt độ', 'Rạp chiếu phim gia đình', 'Hệ thống lọc nước trung tâm']
  },
  {
    id: 5,
    name: 'Sky Palace Landmark 81',
    location: 'TP. Hồ Chí Minh',
    price: '58 Tỷ VNĐ',
    priceVal: 58,
    area: '520m²',
    type: 'Penthouse',
    status: 'Còn 1 căn',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    tag: 'LAST',
    desc: 'Căn hộ Duplex siêu sang nằm trên tầng cao nhất của Landmark 81, biểu tượng thịnh vượng kiêu hãnh của Sài Gòn.',
    specs: '4 Phòng ngủ · 5 Phòng vệ sinh · Rạp chiếu phim mini · Kính Low-E tràn viền',
    amenities: ['Tầm nhìn 360 độ Sài Gòn', 'Kính hộp cách âm cách nhiệt', 'Dịch vụ sảnh 6 sao', 'Thang máy thẻ từ VIP']
  },
  {
    id: 6,
    name: 'Sunset Beach Mansion',
    location: 'Nha Trang',
    price: '65 Tỷ VNĐ',
    priceVal: 65,
    area: '490m²',
    type: 'Beach Villa',
    status: 'Còn 2 căn',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'VIP',
    desc: 'Dinh thự bên vịnh Nha Trang xanh biếc, thiết kế bởi kiến trúc sư lừng danh người Pháp mang phong cách Địa Trung Hải sang trọng.',
    specs: '4 Phòng ngủ · 5 Phòng vệ sinh · Bến đỗ du thuyền · Sân golf mini',
    amenities: ['Bến du thuyền tư nhân', 'Hồ bơi nước mặn', 'Phòng tập gym cao cấp', 'Hệ thống lọc không khí']
  },
  {
    id: 7,
    name: 'Royal Palace Phú Mỹ Hưng',
    location: 'TP. Hồ Chí Minh',
    price: '110 Tỷ VNĐ',
    priceVal: 110,
    area: '720m²',
    type: 'Mansion',
    status: 'Độc quyền',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    tag: 'EXCLUSIVE',
    desc: 'Siêu biệt thự lâu đài tọa lạc tại khu đô thị Phú Mỹ Hưng xa hoa bậc nhất, khẳng định vị thế hoàng gia của chủ nhân.',
    specs: '5 Phòng ngủ · 7 Phòng vệ sinh · Hồ bơi vô cực lớn · Thang máy kính',
    amenities: ['Hồ bơi vô cực 100m²', 'Thang máy kính quan sát', 'Phòng xông hơi đá muối', 'Hệ thống năng lượng xanh']
  },
  {
    id: 8,
    name: 'Pearl Resort Villa',
    location: 'Phú Quốc',
    price: '28 Tỷ VNĐ',
    priceVal: 28,
    area: '280m²',
    type: 'Beach Villa',
    status: 'Mở bán',
    img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80',
    tag: 'HOT',
    desc: 'Biệt thự ven bờ vịnh hoàng hôn thơ mộng tại Phú Quốc, bàn giao đầy đủ nội thất cao cấp nhập khẩu từ Ý.',
    specs: '3 Phòng ngủ · 4 Phòng vệ sinh · Sân hiên ngắm hoàng hôn · Bể bơi sát biển',
    amenities: ['View hoàng hôn Bãi Trường', 'Full nội thất Minotti Ý', 'Bể bơi tràn bờ', 'Dịch vụ xe đưa đón sân bay VIP']
  }
];

const GALLERY_ITEMS = [
  { url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80', category: 'Ngoại thất', title: 'Mặt đứng dinh thự Grand Villa' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', category: 'Nội thất', title: 'Phòng khách Penthouse Sky Residences' },
  { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', category: 'Ngoại thất', title: 'Bể bơi tràn bờ The Manor' },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', category: 'Ngoại thất', title: 'Cận cảnh Lâu Đài Tây Hồ Tây' },
  { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', category: 'Nội thất', title: 'Phòng ngủ Master Sky Palace' },
  { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', category: 'Tiện ích', title: 'Wine Lounge đẳng cấp 6 sao' },
  { url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80', category: 'Phối cảnh', title: 'Phối cảnh tổng thể bờ vịnh hoàng hôn' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', category: 'Nội thất', title: 'Nhà bếp cao cấp chuẩn Âu' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', category: 'Tiện ích', title: 'Hồ bơi vô cực tầng 50' }
];

const TIMELINE_DETAILED = [
  {
    year: '2008',
    title: 'Thành lập Lumière Group',
    desc: 'Ra đời với tầm nhìn kiến tạo những không gian sống đỉnh cao dành cho giới tinh hoa Việt Nam.',
    details: 'Được thành lập bởi 3 nhà sáng lập đầy nhiệt huyết, Lumière Group khởi đầu với mục tiêu định hình lại thị trường bất động sản hạng siêu sang.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80'
  },
  {
    year: '2012',
    title: 'Dự án đầu tiên Quận 1',
    desc: 'Bàn giao thành công 24 căn hộ penthouse siêu sang đầu tiên tại trung tâm Quận 1, TP.HCM.',
    details: 'Dự án Lumière Riverside Quận 1 đã đạt tỷ lệ lấp đầy 100% ngay từ ngày bàn giao, thiết lập tiêu chuẩn sống mới tại trung tâm Sài Gòn.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
  },
  {
    year: '2016',
    title: 'Mở rộng thị trường ra Hà Nội',
    desc: 'Khai trương Lumière Westlake — 18 biệt thự ven Hồ Tây dành riêng cho ngoại giao đoàn.',
    details: 'Biệt thự độc bản Westlake mang đậm dấu ấn kiến trúc Đông Dương kết hợp với tiện nghi phương Tây cổ điển.',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&q=80'
  },
  {
    year: '2020',
    title: 'Nhận giải thưởng quốc tế lớn',
    desc: 'Được vinh danh là "Nhà phát triển BĐS hạng sang xuất sắc nhất Việt Nam" tại Asia Property Awards.',
    details: 'Giải thưởng là minh chứng cho sự kiên định trong việc theo đuổi sự hoàn mỹ trên mọi hành trình kiến tạo.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
  },
  {
    year: '2024',
    title: 'Kiệt tác Lumière Grand Palace',
    desc: 'Ra mắt dinh thự đắt giá nhất lịch sử bất động sản Việt Nam tại Vinhomes Riverside.',
    details: 'Mỗi dinh thự tại Grand Palace sở hữu riêng một bến du thuyền, thiết kế 100% đá cẩm thạch nhập khẩu từ Ý.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
  }
];

const AMENITIES = [
  { icon: '🏊', title: 'Hồ bơi vô cực tầng 50', desc: 'Tầm nhìn panorama 360° toàn cảnh thành phố và sông Sài Gòn' },
  { icon: '🍷', title: 'Wine Cellar & Cigar Lounge', desc: 'Hầm rượu kiểm soát nhiệt độ chuẩn Ý, 5000 chai phục vụ 24/7' },
  { icon: '🚁', title: 'Sân đáp trực thăng riêng', desc: 'Kết nối nhanh đến sân bay Tân Sơn Nhất trong 8 phút' },
  { icon: '🧘', title: 'Spa & Wellness Center', desc: '4000m² trung tâm chăm sóc sức khỏe đẳng cấp 6 sao quốc tế' },
  { icon: '🎾', title: 'Tennis & Golf Simulator', desc: 'Sân tennis trong nhà và hệ thống golf mô phỏng 3D hiện đại nhất' },
  { icon: '🚤', title: 'Bến du thuyền riêng', desc: 'Cầu cảng độc quyền, kết nối trực tiếp sông Sài Gòn và vịnh biển' },
];

const STATS = [
  { value: '18+', label: 'Năm kinh nghiệm', icon: Clock },
  { value: '350+', label: 'Dinh thự đã bàn giao', icon: Building2 },
  { value: '2,800+', label: 'Chủ nhân tinh hoa', icon: Users },
  { value: '98%', label: 'Hài lòng tuyệt đối', icon: Star },
];

const TESTIMONIALS = [
  {
    name: 'Ông Nguyễn Minh Tuấn', title: 'CEO — Tập đoàn Sao Bắc Holdings',
    text: 'Đây không đơn thuần là nơi ở, đây là tuyên ngôn về vị thế của tôi. Dịch vụ concierge 24/7 vượt xa mọi kỳ vọng.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Bà Phạm Lan Anh', title: 'Chủ tịch HĐQT — Goldmark City Group',
    text: 'Kiến trúc đỉnh cao, nội thất sang trọng đến từng chi tiết nhỏ nhất. Đây là khoản đầu tư tốt nhất trong đời tôi.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Ông David Chen', title: 'Country Director — CapitaLand Vietnam',
    text: 'As a foreigner who has lived in luxury properties across Asia, this project set a completely new standard. Absolutely world-class.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
    rating: 5,
  },
];

const NEWS = [
  {
    id: 1,
    slug: 'lumiere-top-10-du-an-xa-xi',
    date: '10/07/2026',
    category: 'Tin tức dự án',
    title: 'Lumière Grand Palace lọt top 10 dự án xa xỉ nhất Đông Nam Á 2026',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    excerpt: 'Tổ chức bất động sản quốc tế Knight Frank vừa công bố danh sách 10 dự án bất động sản xa xỉ...',
    content: 'Tổ chức bất động sản quốc tế Knight Frank vừa công bố danh sách 10 dự án bất động sản xa xỉ nhất Đông Nam Á 2026, trong đó Lumière Grand Palace vinh dự được xướng tên ở vị trí thứ 3. Đây là cột mốc khẳng định chất lượng kiến trúc vượt trội và tầm đẳng cấp của các dự án bất động sản hạng sang từ Việt Nam trên bản đồ quốc tế. Hội đồng giám khảo đánh giá cao dự án ở khía cạnh thiết kế kiến trúc bền vững kết hợp các dịch vụ đặc quyền chuẩn 6 sao, sánh ngang với các dinh thự siêu sang tại Singapore và Bali.'
  },
  {
    id: 2,
    slug: 'so-do-lau-dai-cam-ket-phap-ly',
    date: '05/07/2026',
    category: 'Pháp lý',
    title: 'Sổ đỏ lâu dài — Cam kết pháp lý minh bạch từ Lumière',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    excerpt: 'Toàn bộ 18 dinh thự độc bản tại Lumière Grand Palace đều được cấp sổ hồng lâu dài...',
    content: 'Để mang lại sự yên tâm tuyệt đối cho khách hàng thượng lưu, Lumière Group chính thức công bố hoàn tất toàn bộ hồ sơ pháp lý và cam kết cấp sổ hồng lâu dài cho tất cả các căn thuộc dự án. Trong bối cảnh thị trường bất động sản nhiều biến động, tính minh bạch pháp lý là chìa khóa then chốt giúp duy trì và gia tăng giá trị tài sản bền vững theo thời gian. Toàn bộ hồ sơ pháp lý đều được kiểm chứng độc lập bởi 3 hãng luật quốc tế hàng đầu.'
  },
  {
    id: 3,
    slug: 'bds-sieu-sang-tang-truong-35-phan-tram',
    date: '28/06/2026',
    category: 'Thị trường',
    title: 'BĐS hạng siêu sang tại Việt Nam tăng trưởng 35% trong năm 2026',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    excerpt: 'Theo báo cáo mới nhất của CBRE Việt Nam, phân khúc bất động sản siêu sang tiếp tục tăng mạnh...',
    content: 'CBRE Việt Nam vừa công bố báo cáo thị trường quý II năm 2026, chỉ ra xu hướng tăng trưởng vượt bậc 35% của phân khúc bất động sản siêu sang (từ 2 triệu USD trở lên). Giới siêu giàu trong nước và các nhà đầu tư nước ngoài vẫn tiếp tục coi các dinh thự biệt lập, penthouse tầm nhìn triệu đô là kênh trú ẩn tài sản an toàn và thể hiện phong cách sống cá nhân. Việt Nam hiện là một trong những nền kinh tế phát triển nhanh nhất châu Á, trực tiếp thúc đẩy số lượng cá nhân có tài sản ròng cực cao (UHNWI).'
  },
  {
    id: 4,
    slug: 'hop-tac-chien-luoc-ritz-carlton',
    date: '20/06/2026',
    category: 'Sự kiện',
    title: 'Lumière Group ký kết hợp tác chiến lược với chuỗi quản lý Ritz-Carlton',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    excerpt: 'Ký kết mang lại dịch vụ quản gia cá nhân cao cấp chuẩn Ritz-Carlton cho cư dân...',
    content: 'Lumière Group đã tổ chức thành công lễ ký kết hợp tác chiến lược với Ritz-Carlton, mang lại dịch vụ quản gia cao cấp độc quyền toàn thời gian cho cư dân. Theo đó, mọi nhu cầu từ đặt lịch máy bay cá nhân, đặt bàn tại các nhà hàng Michelin thế giới, tổ chức tiệc riêng tại gia đều sẽ được các quản gia chuyên nghiệp phục vụ chu đáo theo tiêu chuẩn khắt khe nhất thế giới.'
  },
  {
    id: 5,
    slug: 'ra-mat-dinh-thu-the-royal-signature',
    date: '15/06/2026',
    category: 'Dự án',
    title: 'Lễ ra mắt phân khu dinh thự hoàng gia "The Royal Signature" tại Đà Nẵng',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    excerpt: 'Sự kiện thu hút hơn 100 khách mời thuộc giới tinh hoa tham dự và đặt cọc thành công...',
    content: 'Đêm ngày 15/06, tại bãi biển Non Nước Đà Nẵng, Lumière đã tổ chức thành công đêm tiệc thượng lưu ra mắt phân khu "The Royal Signature". 80% rổ hàng đợt 1 đã tìm được chủ nhân ngay trong sự kiện. Phân khu này nổi bật với vị trí trực diện biển, hệ sinh thái riêng tư tuyệt đối cùng kiến trúc xanh mặt nước đỉnh cao.'
  },
  {
    id: 6,
    slug: 'xu-huong-thiet-ke-eco-luxury',
    date: '10/06/2026',
    category: 'Xu hướng',
    title: 'Xu hướng thiết kế bền vững (Eco-Luxury) lên ngôi trong giới thượng lưu',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    excerpt: 'Lối sống xanh kết hợp công nghệ thông minh đang là sự ưu tiên hàng đầu của giới thượng lưu...',
    content: 'Eco-Luxury không chỉ là xu hướng mà đã trở thành triết lý sống cốt lõi của giới tinh hoa. Những dinh thự được bao bọc bởi mảng xanh, sử dụng kính lọc tia UV thế hệ mới, hệ thống tưới nước tuần hoàn và điện mặt trời tích hợp đang trở thành sản phẩm được săn đón nhất. Lumière Group tự hào đi đầu trong việc áp dụng chuẩn xanh LEED cho toàn bộ danh mục sản phẩm mới.'
  }
];

const FLOOR_PLANS = [
  { id: 'penthouse', label: 'Penthouse · 650m²', desc: 'Tầng 50-51, Tầm nhìn 360°, Bể bơi riêng', bedrooms: 5, bathrooms: 6, price: '85 Tỷ', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80' },
  { id: 'villa', label: 'Grand Villa · 450m²', desc: 'Biệt thự đơn lập, Hồ bơi, Sân vườn 200m²', bedrooms: 4, bathrooms: 5, price: '65 Tỷ', img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=80' },
  { id: 'duplex', label: 'Duplex Sky · 320m²', desc: 'Thông tầng 2 lớp, Ban công đôi, View sông', bedrooms: 3, bathrooms: 4, price: '42 Tỷ', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80' },
];

const PARTNERS = [
  { name: 'Vinhomes', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Vinhomes_Logo.svg/320px-Vinhomes_Logo.svg.png' },
  { name: 'Masterise', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&q=80' },
  { name: 'Sun Group', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80' },
  { name: 'CapitaLand', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80' },
  { name: 'Knight Frank', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&q=80' },
];

const TIMELINE = [
  { year: '2008', title: 'Thành lập Lumière Group', desc: 'Ra đời với tầm nhìn kiến tạo những không gian sống đỉnh cao dành cho giới tinh hoa Việt Nam.' },
  { year: '2012', title: 'Dự án đầu tiên Quận 1', desc: 'Bàn giao thành công 24 penthouse siêu sang đầu tiên tại trung tâm TP.HCM.' },
  { year: '2016', title: 'Mở rộng ra Hà Nội', desc: 'Khai trương Lumière Westlake — 18 biệt thự ven Hồ Tây dành riêng cho ngoại giao đoàn.' },
  { year: '2020', title: 'Giải thưởng Quốc tế', desc: 'Nhận giải "Best Luxury Developer Vietnam" từ Asia Property Awards tại Singapore.' },
  { year: '2024', title: 'Lumière Grand Palace', desc: 'Ra mắt kiệt tác 850m² — dinh thự đắt giá nhất lịch sử bất động sản Việt Nam.' },
];

const FAQ = [
  { q: 'Chính sách pháp lý của các dự án như thế nào?', a: 'Toàn bộ dự án của Lumière đều được cấp Sổ đỏ / Sổ hồng lâu dài (không thời hạn), đã qua kiểm định pháp lý 3 lớp từ các hãng luật quốc tế uy tín.' },
  { q: 'Có hỗ trợ vay ngân hàng không?', a: 'Chúng tôi hợp tác với 5 ngân hàng hàng đầu (Vietcombank, Techcombank, HSBC, Standard Chartered, UOB) với gói lãi suất ưu đãi từ 0% trong 24 tháng đầu.' },
  { q: 'Quy trình đặt mua diễn ra thế nào?', a: 'Bước 1: Tư vấn 1:1 với quản gia cá nhân. Bước 2: Tham quan thực tế hoặc tour VR 360°. Bước 3: Ký thỏa thuận đặt cọc. Bước 4: Ký hợp đồng mua bán. Toàn bộ quy trình có thể hoàn tất trong 48 giờ.' },
  { q: 'Dịch vụ sau bàn giao bao gồm những gì?', a: 'Concierge 24/7, quản gia riêng, bảo trì định kỳ miễn phí 5 năm, dịch vụ cho thuê sinh lời, quản lý tài sản toàn diện theo chuẩn Ritz-Carlton.' },
];

// ── HELPER COMPONENTS ─────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-8 h-px" style={{ backgroundColor: GOLD }} />
    <span className="text-xs tracking-[0.25em] uppercase" style={{ color: GOLD, fontFamily: FONT_BODY }}>{children}</span>
    <span className="w-8 h-px" style={{ backgroundColor: GOLD }} />
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GoldButton = ({ children, className = '', style = {}, ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center gap-2 px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${className}`}
    style={{ backgroundColor: GOLD, color: DARK, fontFamily: FONT_BODY, ...style }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = GOLD_LIGHT)}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
    {...props}
  >
    {children}
  </button>
);

const OutlineButton = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center gap-2 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium border transition-all duration-300 hover:bg-white/5 ${className}`}
    style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT_BODY }}
    {...props}
  >
    {children}
  </button>
);

// ══ MAIN COMPONENT ════════════════════════════════════════════════════════════
const normalizeLuxuryPage = (p: string) => {
  const clean = (p || '').toLowerCase().trim();
  if (['lien-he', 'contact', 'tu-van'].includes(clean)) return 'contact';
  if (['gioi-thieu', 'about', 've-chung-toi'].includes(clean)) return 'about';
  if (['du-an', 'projects', 'san-pham'].includes(clean)) return 'projects';
  if (['thu-vien', 'gallery', 'hinh-anh'].includes(clean)) return 'gallery';
  if (['tin-tuc', 'news', 'bai-viet'].includes(clean)) return 'news';
  if (['mat-bang', 'floorplans', 'so-do'].includes(clean)) return 'floorplans';
  if (['tien-ich', 'amenities'].includes(clean)) return 'amenities';
  return clean || 'home';
};

export default function LuxuryTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
  const resolveInitialArticle = () => {
    if (initialPage && (initialPage.startsWith('tin-tuc/') || initialPage.startsWith('news/') || initialPage.startsWith('bai-viet/'))) {
      const sub = initialPage.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
      return NEWS.find(n => n.slug === sub || String(n.id) === sub) || NEWS[0];
    }
    return null;
  };

  const initialArticle = resolveInitialArticle();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialArticle);
  const [currentPage, setCurrentPageState] = useState(initialArticle ? 'news-detail' : normalizeLuxuryPage(initialPage));

  useEffect(() => {
    if (initialPage && (initialPage.startsWith('tin-tuc/') || initialPage.startsWith('news/') || initialPage.startsWith('bai-viet/'))) {
      const sub = initialPage.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
      const found = NEWS.find(n => n.slug === sub || String(n.id) === sub) || NEWS[0];
      setSelectedArticle(found);
      setCurrentPageState('news-detail');
    } else {
      setSelectedArticle(null);
      setCurrentPageState(normalizeLuxuryPage(initialPage));
    }
  }, [initialPage]);

  const setCurrentPage = (p: string, customSlug?: string) => {
    if (typeof setSelectedProject === "function") setSelectedProject(null);
    if (p !== 'news-detail') {
      setSelectedArticle(null);
    }

    setCurrentPageState(p);
    const tSlug = template?.slug || 'bds-02';
    syncDemoUrl(customSlug || (p === 'home' ? '' : p), tSlug);
  };

  const handleOpenArticle = (item: any) => {
    setSelectedArticle(item);
    setCurrentPageState('news-detail');
    setMobileMenuOpen(false);
    const tSlug = template?.slug || 'bds-02';
    syncDemoUrl(`tin-tuc/${item.slug || item.id}`, tSlug);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts.slice(2).join('/') : (parts[1] !== (template?.slug || 'bds-02') ? parts[1] : 'home');
      if (sub) {
        if (sub.startsWith('tin-tuc/') || sub.startsWith('news/') || sub.startsWith('bai-viet/')) {
          const artSlug = sub.replace(/^(tin-tuc|news|bai-viet)\/?/, '');
          const found = NEWS.find(n => n.slug === artSlug || String(n.id) === artSlug) || NEWS[0];
          setSelectedArticle(found);
          setCurrentPageState('news-detail');
        } else {
          setSelectedArticle(null);
          setCurrentPageState(normalizeLuxuryPage(sub));
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [template?.slug]);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFloor, setActiveFloor] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  // Modals / Details
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  
  // Gallery Tab
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');

  // News Search
  const [searchNewsQuery, setSearchNewsQuery] = useState('');

  // Contact Submitted State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [homeContactSubmitted, setHomeContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Timeline Year State
  const [activeTimelineYear, setActiveTimelineYear] = useState('2008');

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';
  const isSmall = isMobile || isTablet;

  const getPageHref = (page: string) => `/demo/${template?.slug || 'bds-02'}${page === 'home' ? '' : '/' + page}`;
  const projectName = template?.name || 'LUMIÈRE';

  const handlePageChange = (page: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage(page);
    setSelectedProject(null);
    if (page !== 'news-detail') {
      setSelectedArticle(null);
    }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─ NAV ──────────────────────────────────────────────────────────────────────
  const navItems = [
    { label: 'Trang Chủ', page: 'home' },
    { label: 'Dự Án', page: 'projects' },
    { label: 'Thiết Kế', page: 'floorplans' },
    { label: 'Tiện Ích', page: 'amenities' },
    { label: 'Thư Viện', page: 'gallery' },
    { label: 'Tin Tức', page: 'news' },
    { label: 'Giới Thiệu', page: 'about' },
    { label: 'Liên Hệ', page: 'contact' },
  ];

  const renderNav = () => (
    <nav className="sticky top-0 w-full z-50" style={{ backgroundColor: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8 flex justify-between items-center h-20`}>
        {/* Logo */}
        <Link href={getPageHref('home')} onClick={(e) => handlePageChange('home', e)} className="flex items-center gap-3 group">
          <Crown className="w-7 h-7 group-hover:scale-110 transition-transform" style={{ color: GOLD }} />
          <div>
            <div className="text-lg tracking-[0.25em] uppercase font-light text-white" style={{ fontFamily: FONT_HEADING }}>{projectName}</div>
            <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Luxury Real Estate</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.15em] uppercase font-medium" style={{ color: '#9A9AA8', fontFamily: FONT_BODY }}>
          {navItems.map(item => (
            <Link key={item.page} href={getPageHref(item.page)}
              onClick={(e) => handlePageChange(item.page, e)}
              className={`hover:text-white transition-colors pb-1 ${currentPage === item.page ? 'text-white border-b' : ''}`}
              style={currentPage === item.page ? { borderColor: GOLD } : {}}>
              {item.label}
            </Link>
          ))}
          <GoldButton onClick={(e) => handlePageChange('contact', e)} className="ml-4 py-2.5 px-6 text-[10px]" style={{ color: DARK }}>
            VIP Concierge
          </GoldButton>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2" style={{ color: WHITE }}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-6 pt-2 animate-fadeIn" style={{ backgroundColor: DARK2, borderTop: `1px solid rgba(201,168,76,0.2)` }}>
          {navItems.map(item => (
            <a
              key={item.page}
              href="#"
              onClick={(e) => { setMobileMenuOpen(false); handlePageChange(item.page, e); }}
              className="block py-3 text-sm border-b border-white/5"
              style={{ color: currentPage === item.page ? GOLD : MUTED, fontFamily: FONT_BODY }}
            >
              {item.label}
            </a>
          ))}
          <GoldButton onClick={(e) => { setMobileMenuOpen(false); handlePageChange('contact', e); }} className="mt-4 w-full justify-center" style={{ color: DARK }}>VIP Concierge</GoldButton>
        </div>
      )}
    </nav>
  );

  // ─ FLOATING CTA ──────────────────────────────────────────────────────────────
  const renderFloatingCTA = () => (
    <div className="fixed right-6 bottom-8 z-40 flex flex-col gap-3">
      <button 
        onClick={() => alert('Đang kết nối Zalo / Hotline: 0901 234 567')}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
        style={{ backgroundColor: '#25D366' }} 
        title="Zalo / WhatsApp"
      >
        <Phone className="w-5 h-5 text-white" />
      </button>
      <button 
        onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
        style={{ backgroundColor: GOLD }} 
        title="Tư vấn"
      >
        <Mail className="w-5 h-5" style={{ color: DARK }} />
      </button>
    </div>
  );

  // ─ HOME ────────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex items-end justify-start overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }}             src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=90"
            alt="Luxury Villa"
            className="w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.6) 100%)' }} />
        </div>

        {/* Content */}
        <div className={`${MAX_W} mx-auto px-4 md:px-8 pb-20 md:pb-28 relative z-10 w-full`}>
          <div className="max-w-3xl">
            <SectionLabel>Lumière Grand Palace — Vinhomes Riverside</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-6" style={{ fontFamily: FONT_HEADING }}>
              Kiệt Tác<br />
              <span className="italic" style={{ color: GOLD }}>Đỉnh Cao</span><br />
              Sống Thượng Lưu
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl" style={{ color: '#B0B0C0', fontFamily: FONT_BODY }}>
              18 dinh thự độc bản được kiến trúc sư người Ý thiết kế riêng cho 18 vị chủ nhân tinh hoa. Tọa lạc bên dòng sông ngọc Hà Nội.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <GoldButton onClick={(e) => handlePageChange('projects', e)}><ArrowRight className="w-4 h-4" /> Khám phá dự án</GoldButton>
              <OutlineButton><Play className="w-4 h-4" /> Xem phim ngắn</OutlineButton>
            </div>
            {/* Stats row */}
            <div className="flex flex-wrap gap-8">
              {[
                { label: 'Diện tích', value: 'Từ 280m²' },
                { label: 'Giá từ', value: '28 Tỷ VNĐ' },
                { label: 'Pháp lý', value: 'Sổ đỏ vĩnh viễn' },
                { label: 'Bàn giao', value: 'Q2 / 2027' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ color: MUTED, fontFamily: FONT_BODY }}>{s.label}</div>
                  <div className="text-base font-semibold text-white" style={{ fontFamily: FONT_BODY }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          <span>Cuộn xuống</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
        </div>
      </section>

      {/* ── QUICK SEARCH ── */}
      <section style={{ backgroundColor: DARK2, borderBottom: `1px solid rgba(201,168,76,0.15)` }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 py-8`}>
          <div className={`flex ${isSmall ? 'flex-col' : 'flex-row'} gap-4 items-end`}>
            <div className="flex-1 w-full">
              <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>Loại bất động sản</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-transparent border-b py-3 text-white text-sm focus:outline-none"
                style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: FONT_BODY }}
              >
                <option value="" style={{ backgroundColor: DARK2 }}>Tất cả loại hình</option>
                <option value="Penthouse" style={{ backgroundColor: DARK2 }}>Penthouse</option>
                <option value="Beach Villa" style={{ backgroundColor: DARK2 }}>Beach Villa</option>
                <option value="Mansion" style={{ backgroundColor: DARK2 }}>Mansion</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>Vị trí</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-transparent border-b py-3 text-white text-sm focus:outline-none"
                style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: FONT_BODY }}
              >
                <option value="" style={{ backgroundColor: DARK2 }}>Tất cả khu vực</option>
                <option value="TP. Hồ Chí Minh" style={{ backgroundColor: DARK2 }}>TP. Hồ Chí Minh</option>
                <option value="Hà Nội" style={{ backgroundColor: DARK2 }}>Hà Nội</option>
                <option value="Đà Nẵng" style={{ backgroundColor: DARK2 }}>Đà Nẵng</option>
                <option value="Phú Quốc" style={{ backgroundColor: DARK2 }}>Phú Quốc</option>
                <option value="Nha Trang" style={{ backgroundColor: DARK2 }}>Nha Trang</option>
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>Mức giá</label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full bg-transparent border-b py-3 text-white text-sm focus:outline-none"
                style={{ borderColor: 'rgba(201,168,76,0.4)', fontFamily: FONT_BODY }}
              >
                <option value="" style={{ backgroundColor: DARK2 }}>Tất cả mức giá</option>
                <option value="under-35" style={{ backgroundColor: DARK2 }}>Dưới 35 tỷ</option>
                <option value="35-70" style={{ backgroundColor: DARK2 }}>35 - 70 tỷ</option>
                <option value="70-100" style={{ backgroundColor: DARK2 }}>70 - 100 tỷ</option>
                <option value="over-100" style={{ backgroundColor: DARK2 }}>Trên 100 tỷ</option>
              </select>
            </div>
            <button
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all w-full md:w-auto justify-center"
              style={{ backgroundColor: GOLD, color: DARK, fontFamily: FONT_BODY }}
            >
              <Search className="w-4 h-4" /> Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* ── INTRO STATEMENT ── */}
      <section className="py-28 md:py-36 text-center relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
        <div className="max-w-4xl mx-auto px-4">
          <Crown className="w-10 h-10 mx-auto mb-10 opacity-40" style={{ color: GOLD }} />
          <blockquote className="text-2xl md:text-4xl font-light leading-relaxed mb-8 text-white" style={{ fontFamily: FONT_HEADING }}>
            "Chúng tôi không xây những ngôi nhà. Chúng tôi kiến tạo những <span className="italic" style={{ color: GOLD }}>di sản trường tồn</span> theo năm tháng."
          </blockquote>
          <p className="text-base font-light leading-loose max-w-2xl mx-auto" style={{ color: MUTED, fontFamily: FONT_BODY }}>
            Lumière Group — 18 năm kiến tạo những không gian sống đỉnh cao chỉ dành cho 2.800+ vị chủ nhân tinh hoa nhất Việt Nam và khu vực.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20" style={{ backgroundColor: DARK3, borderTop: `1px solid rgba(201,168,76,0.1)`, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12`}>
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-6 h-6 mx-auto mb-4 opacity-50" style={{ color: GOLD }} />
              <div className="text-3xl md:text-5xl font-light mb-2 text-white" style={{ fontFamily: FONT_HEADING }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="flex justify-between items-end mb-16">
            <div>
              <SectionLabel>Dự án nổi bật</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                Bộ Sưu Tập<br /><span className="italic" style={{ color: GOLD }}>Đỉnh Cao</span>
              </h2>
            </div>
            {!isSmall && (
              <Link href={getPageHref('projects')} onClick={(e) => handlePageChange('projects', e)}>
                <OutlineButton>Xem tất cả <ChevronRight className="w-4 h-4" /></OutlineButton>
              </Link>
            )}
          </div>

          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {PROJECTS.slice(0, 6).map(project => (
              <div key={project.id} onClick={() => setSelectedProject(project)} className="group relative overflow-hidden cursor-pointer" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={project.img} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0) 60%)' }} />
                  <span className="absolute top-4 right-4 text-[10px] px-3 py-1 tracking-widest font-semibold text-black"
                    style={{ backgroundColor: GOLD, fontFamily: FONT_BODY }}>
                    {project.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent">
                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: GOLD, fontFamily: FONT_BODY }}>{project.type} · {project.location}</div>
                  <h3 className="text-lg font-light text-white mb-3" style={{ fontFamily: FONT_HEADING }}>{project.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-semibold" style={{ color: GOLD, fontFamily: FONT_BODY }}>{project.price}</div>
                      <div className="text-xs" style={{ color: MUTED, fontFamily: FONT_BODY }}>{project.area} · {project.status}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isSmall && (
            <div className="mt-8 text-center">
              <OutlineButton onClick={(e) => handlePageChange('projects', e)}>Xem tất cả dự án <ChevronRight className="w-4 h-4" /></OutlineButton>
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT / STORY ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK2 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2'} gap-16 items-center`}>
            <div>
              <SectionLabel>Câu chuyện thương hiệu</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-6" style={{ fontFamily: FONT_HEADING }}>
                18 Năm Viết Nên<br /><span className="italic" style={{ color: GOLD }}>Di Sản Sống</span>
              </h2>
              <p className="text-base font-light leading-loose mb-6" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                Ra đời năm 2008 từ tầm nhìn của những người tiên phong, Lumière Group đã trở thành biểu tượng của sự sang trọng tối thượng trong bất động sản Đông Nam Á.
              </p>
              <p className="text-base font-light leading-loose mb-10" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                Mỗi dự án là một kiệt tác độc bản, được kiến tạo bởi đội ngũ kiến trúc sư hàng đầu từ Ý, Pháp, Nhật Bản — nơi nghệ thuật sống hòa quyện với văn hóa Á Đông tinh tế.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-10">
                {[{ v: '350+', l: 'Dự án' }, { v: '12', l: 'Giải thưởng' }, { v: '6', l: 'Quốc gia' }].map(item => (
                  <div key={item.l} className="text-center">
                    <div className="text-2xl md:text-3xl font-light mb-1" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{item.v}</div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>{item.l}</div>
                  </div>
                ))}
              </div>
              <GoldButton onClick={(e) => handlePageChange('about', e)}>Tìm hiểu thêm <ArrowRight className="w-4 h-4" /></GoldButton>
            </div>
            <div className={`${isSmall ? 'order-first' : ''} relative`}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80" alt="About" className="w-full h-[500px] object-cover" style={{ border: `1px solid rgba(201,168,76,0.2)` }} />
              <div className="absolute -bottom-6 -left-6 p-6 hidden md:block" style={{ backgroundColor: GOLD }}>
                <div className="text-3xl font-light mb-1" style={{ color: DARK, fontFamily: FONT_HEADING }}>18+</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: DARK, fontFamily: FONT_BODY }}>Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS PREVIEW ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Thiết kế không gian</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Bộ Sưu Tập <span className="italic" style={{ color: GOLD }}>Mặt Bằng</span>
            </h2>
          </div>

          {/* Floor tabs */}
          <div className="flex gap-1 mb-10 overflow-x-auto">
            {FLOOR_PLANS.map((fp, i) => (
              <button key={fp.id} onClick={() => setActiveFloor(i)}
                className="px-5 py-3 text-xs uppercase tracking-widest whitespace-nowrap transition-all"
                style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: activeFloor === i ? GOLD : 'transparent',
                  color: activeFloor === i ? DARK : MUTED,
                  border: `1px solid ${activeFloor === i ? GOLD : 'rgba(201,168,76,0.2)'}`,
                }}>
                {fp.label}
              </button>
            ))}
          </div>

          {/* Active floor */}
          {FLOOR_PLANS[activeFloor] && (
            <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2'} gap-12 items-center`}>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={FLOOR_PLANS[activeFloor].img} alt={FLOOR_PLANS[activeFloor].label} className="w-full h-[400px] object-cover" style={{ border: `1px solid rgba(201,168,76,0.2)` }} />
              <div>
                <div className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD, fontFamily: FONT_BODY }}>{FLOOR_PLANS[activeFloor].label}</div>
                <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: FONT_HEADING }}>{FLOOR_PLANS[activeFloor].desc}</h3>
                <div className="grid grid-cols-3 gap-6 mb-8 py-6" style={{ borderTop: `1px solid rgba(201,168,76,0.1)`, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
                  {[
                    { label: 'Phòng ngủ', value: FLOOR_PLANS[activeFloor].bedrooms },
                    { label: 'Phòng tắm', value: FLOOR_PLANS[activeFloor].bathrooms },
                    { label: 'Mức giá', value: FLOOR_PLANS[activeFloor].price },
                  ].map(d => (
                    <div key={d.label} className="text-center">
                      <div className="text-xl font-light mb-1" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{d.value}</div>
                      <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>{d.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <GoldButton className="flex-1 justify-center">Đặt lịch xem mẫu</GoldButton>
                  <OutlineButton><Download className="w-4 h-4" /></OutlineButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK3 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Đặc quyền & tiện ích</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Chuẩn Mực <span className="italic" style={{ color: GOLD }}>6 Sao</span> Quốc Tế
            </h2>
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {AMENITIES.map((a, i) => (
              <div key={i} className="p-8 group hover:border-opacity-50 transition-all" style={{ border: `1px solid rgba(201,168,76,0.15)`, backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div className="text-4xl mb-5">{a.icon}</div>
                <h3 className="text-base font-semibold text-white mb-3" style={{ fontFamily: FONT_BODY }}>{a.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: MUTED, fontFamily: FONT_BODY }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY MASONRY ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Thư viện hình ảnh</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Nghệ Thuật <span className="italic" style={{ color: GOLD }}>Của Sự Hoàn Mỹ</span>
            </h2>
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            <div className="space-y-4">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80')} width={1200} height={800} className="w-full h-64 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
              <Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80')} width={1200} height={800} className="w-full h-44 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
            </div>
            <div className="space-y-4">
              <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80')} width={1200} height={800} className="w-full h-44 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
              <Image src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80')} width={1200} height={800} className="w-full h-56 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
            </div>
            <div className="space-y-4">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')} width={1200} height={800} className="w-full h-52 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
              <Image src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80" alt="" onClick={() => setSelectedGalleryImg('https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80')} width={1200} height={800} className="w-full h-52 object-cover hover:opacity-80 transition-opacity cursor-pointer animate-fade-in" style={{ border: `1px solid rgba(201,168,76,0.1)` }} />
            </div>
          </div>
          <div className="text-center mt-10">
            <OutlineButton onClick={(e) => handlePageChange('gallery', e)}>Xem toàn bộ thư viện <ArrowRight className="w-4 h-4" /></OutlineButton>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK2 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Chủ nhân nói gì</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Tiếng Nói Từ <span className="italic" style={{ color: GOLD }}>Giới Tinh Hoa</span>
            </h2>
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 relative" style={{ border: `1px solid rgba(201,168,76,0.2)`, backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: GOLD }} />)}
                </div>
                <p className="text-base font-light leading-relaxed mb-8 italic" style={{ color: '#D0D0E0', fontFamily: FONT_HEADING }}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" style={{ border: `2px solid ${GOLD}` }} />
                  <div>
                    <div className="text-sm font-semibold text-white" style={{ fontFamily: FONT_BODY }}>{t.name}</div>
                    <div className="text-xs" style={{ color: MUTED, fontFamily: FONT_BODY }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY TIMELINE ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Hành trình phát triển</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              18 Năm <span className="italic" style={{ color: GOLD }}>Kiến Tạo Di Sản</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: 'rgba(201,168,76,0.2)' }} />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`flex ${isSmall ? 'flex-col' : i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center`}>
                  <div className={`${isSmall ? 'w-full' : 'w-1/2'} ${!isSmall && i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-4xl font-light mb-2" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{item.year}</div>
                    <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: FONT_HEADING }}>{item.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: MUTED, fontFamily: FONT_BODY }}>{item.desc}</p>
                  </div>
                  {!isSmall && (
                    <div className="w-4 h-4 rounded-full flex-shrink-0 border-2" style={{ backgroundColor: GOLD, borderColor: DARK, zIndex: 1 }} />
                  )}
                  {!isSmall && <div className="w-1/2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK3 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="flex justify-between items-end mb-16">
            <div>
              <SectionLabel>Tin tức & thị trường</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                Cập Nhật <span className="italic" style={{ color: GOLD }}>Mới Nhất</span>
              </h2>
            </div>
            {!isSmall && <OutlineButton onClick={(e) => handlePageChange('news', e)}>Xem tất cả <ChevronRight className="w-4 h-4" /></OutlineButton>}
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
            {NEWS.slice(0, 3).map((n) => (
              <article key={n.id} onClick={() => handleOpenArticle(n)} className="group cursor-pointer">
                <div className="overflow-hidden mb-5" style={{ border: `1px solid rgba(201,168,76,0.1)` }}>
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD, fontFamily: FONT_BODY }}>{n.category} · {n.date}</div>
                <h3 className="text-base font-light text-white leading-snug mb-3 group-hover:text-[#E8C97E] transition-colors" style={{ fontFamily: FONT_HEADING }}>{n.title}</h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400" style={{ fontFamily: FONT_BODY }}>{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: DARK2 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Giải đáp thắc mắc</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Câu Hỏi <span className="italic" style={{ color: GOLD }}>Thường Gặp</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="overflow-hidden" style={{ border: `1px solid rgba(201,168,76,0.15)` }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="text-base font-medium text-white pr-4" style={{ fontFamily: FONT_BODY }}>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} style={{ color: GOLD }} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-sm font-light leading-relaxed" style={{ color: MUTED, fontFamily: FONT_BODY, borderTop: `1px solid rgba(201,168,76,0.1)` }}>
                    <div className="pt-4">{item.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-20" style={{ backgroundColor: DARK, borderTop: `1px solid rgba(201,168,76,0.1)` }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>Đối tác chiến lược</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['VINHOMES', 'MASTERISE', 'SUN GROUP', 'CAPITALAND', 'KNIGHT FRANK'].map(p => (
              <div key={p} className="text-lg font-light tracking-widest uppercase" style={{ color: WHITE, fontFamily: FONT_BODY }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-28 md:py-36 text-center relative overflow-hidden" style={{ backgroundColor: DARK2 }}>
        <div className="absolute inset-0 opacity-10">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${DARK2}, rgba(18,18,26,0.95))` }} />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <Crown className="w-10 h-10 mx-auto mb-8" style={{ color: GOLD, opacity: 0.6 }} />
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight" style={{ fontFamily: FONT_HEADING }}>
            Bắt Đầu Hành Trình<br /><span className="italic" style={{ color: GOLD }}>Sống Đỉnh Cao</span> Của Bạn
          </h2>
          <p className="text-base font-light mb-10 leading-loose" style={{ color: MUTED, fontFamily: FONT_BODY }}>
            Quản gia cá nhân của chúng tôi sẽ thiết kế riêng một buổi thưởng lãm dành cho quý vị. Tuyệt đối bảo mật.
          </p>
          {homeContactSubmitted ? (
            <div className="p-8 border max-w-lg mx-auto text-center" style={{ borderColor: GOLD, backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: GOLD }} />
              <p className="text-sm font-light text-white mb-2" style={{ fontFamily: FONT_BODY }}>Đã ghi nhận yêu cầu tư vấn VIP thành công!</p>
              <p className="text-xs text-zinc-400" style={{ fontFamily: FONT_BODY }}>Quản gia cá nhân sẽ liên lạc riêng với quý vị trong vòng 2 giờ.</p>
            </div>
          ) : (
            <form 
              onSubmit={async (e) => { 
                e.preventDefault(); 
                const form = e.currentTarget;
                const name = (form.elements[0] as HTMLInputElement).value;
                const phone = (form.elements[1] as HTMLInputElement).value;
                const phoneClean = phone.replace(/\s/g, '');
                if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
                  alert('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
                  return;
                }
                try {
                  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
                  await fetch(`${API_URL}/api/marketplace/contact`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fullName: name.trim() || 'Khách VIP',
                      phone: phoneClean,
                      selectedTemplate: 'luxury-gold',
                      packageInterest: 'Yêu cầu tư vấn VIP Luxury Gold',
                      message: 'Đăng ký nhận tư vấn VIP từ trang chủ Luxury Gold',
                    }),
                  });
                } catch (err) {}
                setHomeContactSubmitted(true); 
              }} 
              className="max-w-lg mx-auto space-y-5 mb-8"
            >
              <input required type="text" placeholder="Danh xưng & Họ Tên" className="w-full bg-transparent border-b py-4 px-2 text-white text-sm placeholder-zinc-600 focus:outline-none transition-colors" style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }} />
              <input required type="tel" placeholder="Số điện thoại" className="w-full bg-transparent border-b py-4 px-2 text-white text-sm placeholder-zinc-600 focus:outline-none transition-colors" style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }} />
              <GoldButton className="w-full justify-center py-5 text-sm" style={{ color: DARK }}>Yêu Cầu Tư Vấn VIP</GoldButton>
            </form>
          )}
          <p className="text-xs mt-4 animate-fade-in" style={{ color: MUTED, fontFamily: FONT_BODY }}>Cam kết bảo mật thông tin · Phản hồi trong vòng 2 giờ</p>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16" style={{ backgroundColor: DARK3, borderTop: `1px solid rgba(201,168,76,0.1)` }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className={`flex ${isSmall ? 'flex-col' : 'flex-row'} items-center justify-between gap-8`}>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontFamily: FONT_BODY }}>Nhận thông tin độc quyền</div>
              <h3 className="text-2xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>Đăng ký nhận bản tin Lumière</h3>
            </div>
            {newsletterSubmitted ? (
              <div className="text-right flex items-center gap-3">
                <CheckCircle className="w-5 h-5" style={{ color: GOLD }} />
                <span className="text-sm text-zinc-300" style={{ fontFamily: FONT_BODY }}>Cảm ơn bạn đã đăng ký nhận bản tin Lumière!</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }} className="flex gap-2 w-full max-w-md">
                <input required type="email" placeholder="Email của bạn" className="flex-1 bg-transparent border-b py-3 px-2 text-white text-sm placeholder-zinc-600 focus:outline-none" style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }} />
                <button type="submit" className="px-6 py-3 text-xs uppercase tracking-widest font-medium" style={{ backgroundColor: GOLD, color: DARK, fontFamily: FONT_BODY }}>
                  Đăng ký
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );

  // ─ PROJECTS PAGE ────────────────────────────────────────────────────────────
  const renderProjects = () => {
    const filteredProjects = PROJECTS.filter((p) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchLocation = p.location.toLowerCase().includes(q);
        const matchDesc = p.desc.toLowerCase().includes(q);
        if (!matchName && !matchLocation && !matchDesc) return false;
      }

      // 2. Filter Type
      if (filterType && p.type !== filterType) {
        return false;
      }

      // 3. Filter Location
      if (filterLocation && p.location !== filterLocation) {
        return false;
      }

      // 4. Filter Price
      if (filterPrice) {
        const price = p.priceVal;
        if (filterPrice === 'under-35' && price >= 35) return false;
        if (filterPrice === '35-70' && (price < 35 || price > 70)) return false;
        if (filterPrice === '70-100' && (price < 70 || price > 100)) return false;
        if (filterPrice === 'over-100' && price <= 100) return false;
      }

      return true;
    });

    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
        <div className="py-20" style={{ backgroundColor: DARK2 }}>
          <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
            <SectionLabel>Danh sách dự án</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Bộ Sưu Tập <span className="italic" style={{ color: GOLD }}>Dinh Thự</span>
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: DARK3, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
          <div className={`${MAX_W} mx-auto px-4 md:px-8 py-6`}>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <input
                  type="text"
                  placeholder="Tìm kiếm dinh thự..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b py-2 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
                />
                <Search className="w-4 h-4 absolute left-2 top-2.5" style={{ color: GOLD }} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2.5 text-xs text-zinc-400 hover:text-white"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <div className="flex-1 min-w-[150px]">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-transparent border-b py-2 text-white text-sm focus:outline-none"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
                  >
                    <option value="" style={{ backgroundColor: DARK2 }}>Tất cả loại hình</option>
                    <option value="Penthouse" style={{ backgroundColor: DARK2 }}>Penthouse</option>
                    <option value="Beach Villa" style={{ backgroundColor: DARK2 }}>Beach Villa</option>
                    <option value="Mansion" style={{ backgroundColor: DARK2 }}>Mansion</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full bg-transparent border-b py-2 text-white text-sm focus:outline-none"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
                  >
                    <option value="" style={{ backgroundColor: DARK2 }}>Tất cả vị trí</option>
                    <option value="TP. Hồ Chí Minh" style={{ backgroundColor: DARK2 }}>TP. Hồ Chí Minh</option>
                    <option value="Hà Nội" style={{ backgroundColor: DARK2 }}>Hà Nội</option>
                    <option value="Đà Nẵng" style={{ backgroundColor: DARK2 }}>Đà Nẵng</option>
                    <option value="Phú Quốc" style={{ backgroundColor: DARK2 }}>Phú Quốc</option>
                    <option value="Nha Trang" style={{ backgroundColor: DARK2 }}>Nha Trang</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full bg-transparent border-b py-2 text-white text-sm focus:outline-none"
                    style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
                  >
                    <option value="" style={{ backgroundColor: DARK2 }}>Tất cả mức giá</option>
                    <option value="under-35" style={{ backgroundColor: DARK2 }}>Dưới 35 Tỷ</option>
                    <option value="35-70" style={{ backgroundColor: DARK2 }}>35 - 70 Tỷ</option>
                    <option value="70-100" style={{ backgroundColor: DARK2 }}>70 - 100 Tỷ</option>
                    <option value="over-100" style={{ backgroundColor: DARK2 }}>Trên 100 Tỷ</option>
                  </select>
                </div>

                {/* Reset Filters */}
                {(searchQuery || filterType || filterLocation || filterPrice) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('');
                      setFilterLocation('');
                      setFilterPrice('');
                    }}
                    className="px-4 py-2 text-xs uppercase tracking-widest hover:text-white transition-all border"
                    style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT_BODY }}
                  >
                    Đặt lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`${MAX_W} mx-auto px-4 md:px-8 py-16`}>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 border border-zinc-800">
              <p className="text-zinc-500 font-light" style={{ fontFamily: FONT_BODY }}>
                Không tìm thấy dinh thự nào phù hợp với bộ lọc đã chọn. Vui lòng đặt lại bộ lọc.
              </p>
            </div>
          ) : (
            <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="group cursor-pointer flex flex-col justify-between"
                  style={{ border: `1px solid rgba(201,168,76,0.12)`, backgroundColor: 'rgba(255,255,255,0.01)' }}
                >
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0) 50%)' }} />
                    <span className="absolute top-3 right-3 px-3 py-1 text-[10px] uppercase tracking-widest text-black" style={{ backgroundColor: GOLD, fontFamily: FONT_BODY }}>{p.tag}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: GOLD, fontFamily: FONT_BODY }}>{p.type} · {p.location}</div>
                      <h3 className="text-base font-light text-white mb-2 group-hover:text-[#E8C97E] transition-colors" style={{ fontFamily: FONT_HEADING }}>{p.name}</h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: FONT_BODY }}>{p.desc}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                      <span className="font-semibold" style={{ color: GOLD, fontFamily: FONT_BODY }}>{p.price}</span>
                      <span className="text-xs text-zinc-400" style={{ fontFamily: FONT_BODY }}>{p.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  };

  // ─ ABOUT PAGE ────────────────────────────────────────────────────────────────
  const renderAbout = () => (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
      <div className="py-28" style={{ backgroundColor: DARK2 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <SectionLabel>Về chúng tôi</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-light text-white max-w-3xl leading-tight" style={{ fontFamily: FONT_HEADING }}>
            Định Hình Chuẩn Mực<br /><span className="italic" style={{ color: GOLD }}>Sống Thượng Lưu</span>
          </h1>
        </div>
      </div>
      {/* Mission/Vision */}
      <section className="py-24" style={{ backgroundColor: DARK }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
          {[
            { icon: Shield, title: 'Sứ Mệnh', desc: 'Kiến tạo những không gian sống vượt thời gian, nơi mỗi chi tiết đều phản ánh nghệ thuật sống đỉnh cao.' },
            { icon: Star, title: 'Tầm Nhìn', desc: 'Trở thành tập đoàn bất động sản hạng sang hàng đầu Đông Nam Á với hiện diện tại 10 quốc gia.' },
            { icon: Award, title: 'Giá Trị Cốt Lõi', desc: 'Chất lượng không khoan nhượng, tính toàn vẹn trong từng cam kết và sự hoàn hảo trong mọi chi tiết.' },
          ].map((v, i) => (
            <div key={i} className="p-10 text-center" style={{ border: `1px solid rgba(201,168,76,0.15)` }}>
              <v.icon className="w-8 h-8 mx-auto mb-6" style={{ color: GOLD }} />
              <h3 className="text-xl font-light text-white mb-4" style={{ fontFamily: FONT_HEADING }}>{v.title}</h3>
              <p className="text-sm font-light leading-relaxed text-zinc-400" style={{ fontFamily: FONT_BODY }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="py-24" style={{ backgroundColor: DARK2, borderTop: `1px solid rgba(201,168,76,0.1)` }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Hành trình lịch sử</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Cột Mốc <span className="italic" style={{ color: GOLD }}>Kiến Tạo Di Sản</span>
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Year Selector */}
            <div className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto gap-4 border-b lg:border-b-0 lg:border-r border-zinc-800 pb-4 lg:pb-0 lg:pr-8">
              {TIMELINE_DETAILED.map(item => (
                <button
                  key={item.year}
                  onClick={() => setActiveTimelineYear(item.year)}
                  className="flex items-center gap-4 text-left px-4 py-3 transition-all whitespace-nowrap lg:whitespace-normal w-full"
                  style={{
                    backgroundColor: activeTimelineYear === item.year ? 'rgba(201,168,76,0.1)' : 'transparent',
                    borderLeft: !isSmall && activeTimelineYear === item.year ? `3px solid ${GOLD}` : '3px solid transparent',
                  }}
                >
                  <span className="text-2xl md:text-3xl font-light" style={{ color: activeTimelineYear === item.year ? GOLD : MUTED, fontFamily: FONT_HEADING }}>
                    {item.year}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white hidden md:inline font-semibold">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Year Info Screen */}
            <div className="w-full lg:w-2/3">
              {TIMELINE_DETAILED.map(item => {
                if (item.year !== activeTimelineYear) return null;
                return (
                  <div key={item.year} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="overflow-hidden aspect-video md:aspect-square border border-zinc-800">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} alt={item.title} className="w-full h-full object-cover animate-fade-in" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest animate-fade-in" style={{ color: GOLD, fontFamily: FONT_BODY }}>Năm {item.year}</span>
                      <h3 className="text-2xl font-light text-white mt-2 mb-4 animate-fade-in" style={{ fontFamily: FONT_HEADING }}>{item.title}</h3>
                      <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4 animate-fade-in" style={{ fontFamily: FONT_BODY }}>
                        {item.desc}
                      </p>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed animate-fade-in" style={{ fontFamily: FONT_BODY }}>
                        {item.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24" style={{ backgroundColor: DARK3 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <SectionLabel>Ban lãnh đạo</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Đội Ngũ <span className="italic" style={{ color: GOLD }}>Dẫn Dắt</span>
            </h2>
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
            {[
              { name: 'Nguyễn Văn Thành', title: 'Chủ tịch HĐQT', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', bio: '30 năm kinh nghiệm BĐS, từng đảm nhiệm vị trí CEO tại CapitaLand Singapore' },
              { name: 'Trần Bảo Ngọc', title: 'Tổng Giám đốc', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', bio: 'Tiến sĩ Kiến trúc tại Harvard, chuyên gia thiết kế hạng sang quốc tế' },
              { name: 'David Thompson', title: 'Giám đốc Quốc tế', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', bio: '20 năm phát triển BĐS cao cấp tại Anh, Singapore, Hồng Kông' },
            ].map((l, i) => (
              <div key={i} className="text-center group p-6 border border-zinc-900 bg-zinc-950/20">
                <div className="relative inline-block mb-6 overflow-hidden rounded-full">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={l.img} alt={l.name} className="w-32 h-32 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-500" style={{ border: `2px solid ${GOLD}` }} />
                </div>
                <h3 className="text-lg font-light text-white mb-1" style={{ fontFamily: FONT_HEADING }}>{l.name}</h3>
                <div className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: GOLD, fontFamily: FONT_BODY }}>{l.title}</div>
                <p className="text-sm font-light leading-relaxed text-zinc-400" style={{ fontFamily: FONT_BODY }}>{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );

  // ─ GALLERY PAGE ─────────────────────────────────────────────────────────────
  const renderGallery = () => {
    const categories = ['Tất cả', 'Ngoại thất', 'Nội thất', 'Tiện ích', 'Phối cảnh'];
    const filteredGallery = selectedGalleryTab === 'Tất cả'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(img => img.category === selectedGalleryTab);

    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
        <div className="py-20" style={{ backgroundColor: DARK2 }}>
          <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
            <SectionLabel>Thư viện hình ảnh</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
              Bộ Sưu Tập <span className="italic" style={{ color: GOLD }}>Hình Ảnh</span>
            </h1>
          </div>
        </div>
        <div className={`${MAX_W} mx-auto px-4 md:px-8 py-16`}>
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedGalleryTab(c)}
                className="px-5 py-2 text-[11px] uppercase tracking-widest transition-all"
                style={{
                  backgroundColor: selectedGalleryTab === c ? GOLD : 'transparent',
                  color: selectedGalleryTab === c ? GOLD : MUTED,
                  border: `1px solid ${selectedGalleryTab === c ? GOLD : 'rgba(201,168,76,0.25)'}`,
                  fontFamily: FONT_BODY
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {filteredGallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedGalleryImg(img.url)}
                className="group overflow-hidden aspect-[4/3] cursor-pointer relative"
                style={{ border: `1px solid rgba(201,168,76,0.1)` }}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }}                   src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[11px] uppercase tracking-widest font-semibold border-b pb-1 text-white animate-fade-in" style={{ borderColor: GOLD }}>
                    Xem hình phóng lớn
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 text-[10px] text-[#C9A84C]" style={{ fontFamily: FONT_BODY }}>
                  {img.category} · {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  };

  // ─ CONTACT PAGE ──────────────────────────────────────────────────────────────
  const renderContact = () => (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
      <div className="py-20" style={{ backgroundColor: DARK2 }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <SectionLabel>Liên hệ</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
            Tư Vấn <span className="italic" style={{ color: GOLD }}>1:1 Riêng Tư</span>
          </h1>
        </div>
      </div>
      <div className={`${MAX_W} mx-auto px-4 md:px-8 py-20`}>
        <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2'} gap-16`}>
          <div>
            <h2 className="text-2xl font-light text-white mb-8" style={{ fontFamily: FONT_HEADING }}>Để lại thông tin</h2>
            {contactSubmitted ? (
              <div className="p-8 border text-center flex flex-col items-center justify-center animate-fade-in" style={{ borderColor: GOLD, backgroundColor: 'rgba(255,255,255,0.01)' }}>
                <CheckCircle className="w-16 h-16 mb-6" style={{ color: GOLD }} />
                <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: FONT_HEADING }}>Gửi Yêu Cầu Thành Công</h3>
                <p className="text-sm font-light leading-relaxed mb-6 text-zinc-400" style={{ fontFamily: FONT_BODY }}>
                  Cảm ơn Quý khách đã tin tưởng chọn Lumière. Quản gia cá nhân của chúng tôi sẽ liên hệ riêng với Quý khách trong vòng tối đa 2 giờ để bắt đầu hành trình thưởng lãm.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-6 py-3 text-xs uppercase tracking-widest border font-semibold transition-colors hover:bg-white/5"
                  style={{ borderColor: GOLD, color: GOLD, fontFamily: FONT_BODY }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (form.elements[0] as HTMLInputElement).value;
                  const phone = (form.elements[1] as HTMLInputElement).value;
                  const email = (form.elements[2] as HTMLInputElement).value;
                  const propType = (form.elements[3] as HTMLInputElement).value;
                  const message = (form.elements[4] as HTMLTextAreaElement).value;
                  
                  const phoneClean = phone.replace(/\s/g, '');
                  if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
                    alert('Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.');
                    return;
                  }
                  try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';
                    await fetch(`${API_URL}/api/marketplace/contact`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fullName: name.trim() || 'Khách VIP',
                        phone: phoneClean,
                        email: email.trim(),
                        selectedTemplate: 'luxury-gold',
                        packageInterest: propType ? `Quan tâm: ${propType}` : 'Tư vấn Luxury Gold',
                        message: message?.trim() || 'Khách gửi từ trang liên hệ Luxury Gold',
                      }),
                    });
                  } catch (err) {}
                  setContactSubmitted(true);
                }}
                className="space-y-6"
              >
                <input required type="text" placeholder="Danh xưng & Họ Tên *" className="w-full bg-transparent border-b py-4 text-white text-sm placeholder-zinc-600 focus:outline-none"
                  style={{ borderColor: 'rgba(201,168,76,0.25)', fontFamily: FONT_BODY }} />
                <input required type="tel" placeholder="Số điện thoại *" className="w-full bg-transparent border-b py-4 text-white text-sm placeholder-zinc-600 focus:outline-none"
                  style={{ borderColor: 'rgba(201,168,76,0.25)', fontFamily: FONT_BODY }} />
                <input required type="email" placeholder="Email *" className="w-full bg-transparent border-b py-4 text-white text-sm placeholder-zinc-600 focus:outline-none"
                  style={{ borderColor: 'rgba(201,168,76,0.25)', fontFamily: FONT_BODY }} />
                <input type="text" placeholder="Loại bất động sản quan tâm (vd: Penthouse)" className="w-full bg-transparent border-b py-4 text-white text-sm placeholder-zinc-600 focus:outline-none"
                  style={{ borderColor: 'rgba(201,168,76,0.25)', fontFamily: FONT_BODY }} />
                <textarea rows={4} placeholder="Nội dung cần tư vấn" className="w-full bg-transparent border-b py-4 text-white text-sm placeholder-zinc-600 focus:outline-none resize-none"
                  style={{ borderColor: 'rgba(201,168,76,0.25)', fontFamily: FONT_BODY }} />
                <GoldButton type="submit" className="w-full justify-center py-5" style={{ color: DARK }}>Gửi yêu cầu tư vấn</GoldButton>
              </form>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-light text-white mb-8" style={{ fontFamily: FONT_HEADING }}>Thông tin liên hệ</h2>
            <div className="space-y-8">
              {[
                { icon: Phone, label: 'Hotline VIP', value: '+84 28 3333 8888' },
                { icon: Mail, label: 'Email Concierge', value: 'concierge@lumiere.vn' },
                { icon: MapPin, label: 'Trụ sở chính', value: '1 Lê Duẩn, Quận 1, TP. Hồ Chí Minh' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: `1px solid rgba(201,168,76,0.3)` }}>
                    <item.icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ color: MUTED, fontFamily: FONT_BODY }}>{item.label}</div>
                    <div className="text-base text-white" style={{ fontFamily: FONT_BODY }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 overflow-hidden rounded flex flex-col" style={{ border: `1px solid rgba(201,168,76,0.25)` }}>
              <div className="px-4 py-2 bg-[#0d0f14] text-white flex items-center justify-between text-xs" style={{ borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <span className="font-light tracking-wide text-[#E8C76A] truncate">1 Lê Duẩn, Quận 1, TP. Hồ Chí Minh</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1+L%C3%AA+Du%E1%BA%A9n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+TP.HCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#0B0D11] shrink-0"
                  style={{ backgroundColor: GOLD }}
                >
                  Mở Google Maps
                </a>
              </div>
              <div className="h-56 w-full">
                <iframe
                  title="Bản đồ 1 Lê Duẩn"
                  src="https://maps.google.com/maps?q=1+L%C3%AA+Du%E1%BA%A9n,+Qu%E1%BA%ADn+1,+TP.HCM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // ─ NEWS PAGE ─────────────────────────────────────────────────────────────────
  const renderNews = () => {
    const filteredNews = NEWS.filter(n => {
      if (searchNewsQuery) {
        const q = searchNewsQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      }
      return true;
    });

    return (
      <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
        <div className="py-20" style={{ backgroundColor: DARK2 }}>
          <div className={`${MAX_W} mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6`}>
            <div>
              <SectionLabel>Tin tức & Thị trường</SectionLabel>
              <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                Cập Nhật <span className="italic" style={{ color: GOLD }}>Mới Nhất</span>
              </h1>
            </div>
            
            {/* Search News Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                className="w-full bg-transparent border-b py-2 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-white transition-colors"
                style={{ borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
              />
              <Search className="w-4 h-4 absolute left-2 top-2.5" style={{ color: GOLD }} />
              {searchNewsQuery && (
                <button
                  onClick={() => setSearchNewsQuery('')}
                  className="absolute right-2 top-2.5 text-xs text-zinc-400 hover:text-white"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className={`${MAX_W} mx-auto px-4 md:px-8 py-20`}>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 border border-zinc-800">
              <p className="text-zinc-500 font-light" style={{ fontFamily: FONT_BODY }}>Không tìm thấy bài viết phù hợp với tìm kiếm của bạn.</p>
            </div>
          ) : (
            <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-3'} gap-8`}>
              {filteredNews.map((n) => (
                <article
                  key={n.id}
                  onClick={() => handleOpenArticle(n)}
                  className="group cursor-pointer flex flex-col justify-between"
                  style={{ border: `1px solid rgba(201,168,76,0.12)`, backgroundColor: 'rgba(255,255,255,0.01)' }}
                >
                  <div>
                    <div className="overflow-hidden aspect-video">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }}                         src={n.img}
                        alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: GOLD, fontFamily: FONT_BODY }}>
                        {n.category} · {n.date}
                      </div>
                      <h3 className="text-base font-light text-white leading-snug mb-3 group-hover:text-[#E8C97E] transition-colors" style={{ fontFamily: FONT_HEADING }}>
                        {n.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-zinc-400 line-clamp-3" style={{ fontFamily: FONT_BODY }}>
                        {n.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold" style={{ color: GOLD, fontFamily: FONT_BODY }}>
                    Đọc tiếp <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderNewsDetailPage = () => {
    if (!selectedArticle) return null;
    return (
      <main className="min-h-screen pt-32 pb-32" style={{ backgroundColor: DARK, color: 'white' }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-12">
            <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-light" style={{ fontFamily: FONT_BODY }}>
              <button onClick={(e) => handlePageChange('home', e)} className="hover:text-white transition">Trang chủ</button>
              <span>/</span>
              <button onClick={(e) => handlePageChange('news', e)} className="hover:text-white transition">Tin tức & Thị trường</button>
              <span>/</span>
              <span style={{ color: GOLD }} className="truncate max-w-xs sm:max-w-md">{selectedArticle.title}</span>
            </nav>
            <button
              onClick={(e) => handlePageChange('news', e)}
              className="text-xs uppercase tracking-widest font-semibold flex items-center gap-1 px-4 py-2 border transition"
              style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', fontFamily: FONT_BODY }}
            >
              <ChevronLeft className="w-4 h-4" /> Quay lại danh sách tin
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <article className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest" style={{ color: GOLD, fontFamily: FONT_BODY }}>
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-light leading-tight text-white" style={{ fontFamily: FONT_HEADING }}>
                {selectedArticle.title}
              </h1>

              <div className="aspect-[16/9] w-full overflow-hidden shadow-2xl border" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 border-l-2 text-lg font-light leading-relaxed text-zinc-200" style={{ borderColor: GOLD, backgroundColor: 'rgba(255,255,255,0.02)', fontFamily: FONT_BODY }}>
                {selectedArticle.excerpt}
              </div>

              <div className="space-y-6 text-base font-light text-zinc-300 leading-relaxed" style={{ fontFamily: FONT_BODY }}>
                <p>{selectedArticle.content}</p>
                <p>
                  Các chuyên gia quốc tế nhận định rằng việc sở hữu một bất động sản tại phân khu này không chỉ là một khoản đầu tư sinh lời bền vững mà còn là một di sản vô giá truyền đời cho các thế hệ tương lai.
                </p>
              </div>

              <div className="p-8 border mt-12 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: 'rgba(201,168,76,0.3)', backgroundColor: DARK2 }}>
                <div>
                  <h4 className="text-xl font-light text-white mb-1" style={{ fontFamily: FONT_HEADING }}>Đăng Ký Tham Quan Căn Hộ Thực Tế</h4>
                  <p className="text-xs font-light text-zinc-400" style={{ fontFamily: FONT_BODY }}>Trải nghiệm không gian sống thượng lưu cùng chuyên viên tư vấn riêng 1-1.</p>
                </div>
                <GoldButton onClick={(e) => handlePageChange('contact', e)}>Đặt Lịch Riêng</GoldButton>
              </div>
            </article>

            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 border space-y-6" style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: DARK2 }}>
                <h3 className="text-lg font-light text-white pb-4 border-b border-zinc-800 uppercase tracking-wider" style={{ fontFamily: FONT_HEADING }}>
                  Tin Tức Liên Quan
                </h3>
                <div className="space-y-6">
                  {NEWS.filter(n => n.id !== selectedArticle.id).slice(0, 4).map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenArticle(item)}
                      className="flex gap-4 items-start group cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-24 h-16 object-cover flex-shrink-0 group-hover:opacity-80 transition"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest block mb-1" style={{ color: GOLD }}>{item.category}</span>
                        <h4 className="text-xs font-light text-white group-hover:text-[#E8C97E] transition line-clamp-2 leading-snug" style={{ fontFamily: FONT_HEADING }}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  };

  // ─ FULL FOOTER ────────────────────────────────────────────────────────────────
  const renderFooter = () => (
    <footer style={{ backgroundColor: DARK, borderTop: `1px solid rgba(201,168,76,0.12)` }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8 py-20`}>
        <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-4'} gap-12 mb-16`}>
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-7 h-7" style={{ color: GOLD }} />
              <span className="text-xl tracking-[0.2em] uppercase font-light text-white" style={{ fontFamily: FONT_HEADING }}>{projectName}</span>
            </div>
            <p className="text-sm font-light leading-relaxed mb-6 text-zinc-400" style={{ fontFamily: FONT_BODY }}>
              18 năm kiến tạo những không gian sống đỉnh cao, nơi nghệ thuật gặp gỡ sự hoàn mỹ.
            </p>
            <div className="flex gap-4">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <button 
                  key={i} 
                  onClick={() => alert('Mở liên kết mạng xã hội')}
                  className="w-9 h-9 flex items-center justify-center transition-all border border-zinc-800 hover:border-[#C9A84C] cursor-pointer" 
                  style={{ backgroundColor: 'transparent' }}
                >
                  <Icon className="w-4 h-4" style={{ color: MUTED }} />
                </button>
              ))}
            </div>
          </div>

          {/* Dự án */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: GOLD, fontFamily: FONT_BODY }}>Dự Án</div>
            {[
              { label: 'Penthouse Sky Residences', id: 1 },
              { label: 'Grand Villa Riverside', id: 2 },
              { label: 'The Manor Ocean View', id: 3 },
              { label: 'Lâu Đài Tây Hồ Tây', id: 4 },
              { label: 'Sky Palace Landmark 81', id: 5 }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => {
                  const prj = PROJECTS.find(p => p.id === item.id);
                  if (prj) {
                    setSelectedProject(prj);
                  }
                }}
                className="block text-sm font-light mb-3 text-left hover:text-white transition-colors"
                style={{ color: MUTED, fontFamily: FONT_BODY }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Liên kết */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: GOLD, fontFamily: FONT_BODY }}>Liên Kết</div>
            {[
              { label: 'Về chúng tôi', page: 'about' },
              { label: 'Danh sách dự án', page: 'projects' },
              { label: 'Tin tức', page: 'news' },
              { label: 'Thư viện', page: 'gallery' },
              { label: 'Thiết kế mặt bằng', page: 'floorplans' },
              { label: 'Liên hệ', page: 'contact' },
            ].map(item => (
              <button
                key={item.label}
                onClick={(e) => handlePageChange(item.page, e)}
                className="block text-sm font-light mb-3 text-left hover:text-white transition-colors"
                style={{ color: MUTED, fontFamily: FONT_BODY }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Liên hệ */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: GOLD, fontFamily: FONT_BODY }}>Liên Hệ</div>
            <div className="space-y-4 text-sm font-light" style={{ color: MUTED, fontFamily: FONT_BODY }}>
              <div className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GOLD }} /><span>+84 28 3333 8888</span></div>
              <div className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GOLD }} /><span>concierge@lumiere.vn</span></div>
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GOLD }} /><span>1 Lê Duẩn, Quận 1, TP.HCM</span></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: `1px solid rgba(201,168,76,0.1)` }}>
          <p className="text-xs" style={{ color: 'rgba(154,154,168,0.5)', fontFamily: FONT_BODY }}>
            © 2026 {projectName} Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: 'rgba(154,154,168,0.5)', fontFamily: FONT_BODY }}>
            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Điều khoản sử dụng</button>
            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</button>
            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Cookie</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // ─ PAGE ROUTER ──────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: DARK, fontFamily: FONT_BODY }}>
      {renderNav()}
      {renderFloatingCTA()}

      {['home'].includes(currentPage) && renderHome()}
      {['projects', 'du-an', 'san-pham'].includes(currentPage) && renderProjects()}
      {['about', 'gioi-thieu', 've-chung-toi'].includes(currentPage) && renderAbout()}
      {['gallery', 'thu-vien', 'hinh-anh'].includes(currentPage) && renderGallery()}
      {['contact', 'lien-he', 'tu-van'].includes(currentPage) && renderContact()}
      {['news', 'tin-tuc', 'bai-viet'].includes(currentPage) && renderNews()}
      {!['home', 'projects', 'du-an', 'san-pham', 'about', 'gioi-thieu', 've-chung-toi', 'gallery', 'thu-vien', 'hinh-anh', 'contact', 'lien-he', 'tu-van', 'news', 'tin-tuc', 'bai-viet', 'floorplans', 'amenities'].includes(currentPage) && renderHome()}
      {currentPage === 'floorplans' && (
        <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
          <div className="py-20" style={{ backgroundColor: DARK2 }}>
            <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
              <SectionLabel>Thiết kế</SectionLabel>
              <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                Bộ Sưu Tập <span className="italic" style={{ color: GOLD }}>Mặt Bằng</span>
              </h1>
            </div>
          </div>
          <div className={`${MAX_W} mx-auto px-4 md:px-8 py-20 space-y-24`}>
            {FLOOR_PLANS.map((fp, idx) => (
              <div key={fp.id} className={`flex flex-col ${!isSmall && idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}>
                <div className="w-full md:w-1/2">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={fp.img} alt={fp.label} className="w-full h-[400px] object-cover" style={{ border: `1px solid rgba(201,168,76,0.15)` }} />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD, fontFamily: FONT_BODY }}>{fp.label}</div>
                  <h3 className="text-3xl font-light text-white mb-4" style={{ fontFamily: FONT_HEADING }}>{fp.desc}</h3>
                  <div className="grid grid-cols-3 gap-6 py-6 mb-8" style={{ borderTop: `1px solid rgba(201,168,76,0.1)`, borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
                    <div className="text-center">
                      <div className="text-2xl font-light mb-1" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{fp.bedrooms}</div>
                      <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>Phòng ngủ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light mb-1" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{fp.bathrooms}</div>
                      <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>Phòng tắm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-light mb-1" style={{ color: GOLD, fontFamily: FONT_HEADING }}>{fp.price}</div>
                      <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, fontFamily: FONT_BODY }}>Mức giá</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <GoldButton>Đặt lịch xem mẫu</GoldButton>
                    <OutlineButton><Download className="w-4 h-4" /> Tải PDF</OutlineButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
      {currentPage === 'amenities' && (
        <main className="pt-24 min-h-screen" style={{ backgroundColor: DARK }}>
          <div className="py-20" style={{ backgroundColor: DARK2 }}>
            <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
              <SectionLabel>Đặc quyền</SectionLabel>
              <h1 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: FONT_HEADING }}>
                Tiện Ích <span className="italic" style={{ color: GOLD }}>6 Sao</span>
              </h1>
            </div>
          </div>
          <div className={`${MAX_W} mx-auto px-4 md:px-8 py-20`}>
            <div className={`grid ${isSmall ? 'grid-cols-1' : 'grid-cols-2'} gap-8`}>
              {AMENITIES.map((a, i) => (
                <div key={i} className="flex gap-6 p-8" style={{ border: `1px solid rgba(201,168,76,0.15)` }}>
                  <div className="text-4xl flex-shrink-0">{a.icon}</div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-3" style={{ fontFamily: FONT_HEADING }}>{a.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: MUTED, fontFamily: FONT_BODY }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
      {currentPage === 'news-detail' && renderNewsDetailPage()}

      {renderFooter()}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-[#C9A84C] overflow-hidden rounded-none shadow-2xl flex flex-col md:flex-row my-8 max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/60 border border-[#C9A84C] text-white hover:bg-[#C9A84C] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }}                 src={selectedProject.img}
                alt={selectedProject.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-black bg-[#C9A84C]">
                  {selectedProject.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-white mt-3" style={{ fontFamily: FONT_HEADING }}>
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontFamily: FONT_BODY }}>
                  {selectedProject.type} · {selectedProject.location}
                </div>
                
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-bold" style={{ color: GOLD, fontFamily: FONT_BODY }}>{selectedProject.price}</span>
                  <span className="text-sm text-zinc-400" style={{ fontFamily: FONT_BODY }}>Diện tích: {selectedProject.area}</span>
                </div>

                <p className="text-sm font-light text-zinc-300 leading-relaxed mb-6" style={{ fontFamily: FONT_BODY }}>
                  {selectedProject.desc}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest font-semibold mb-3 text-white" style={{ fontFamily: FONT_BODY }}>Thông tin chi tiết</h4>
                  <div className="p-4 bg-zinc-900 border border-zinc-800 text-sm font-light text-zinc-400 leading-relaxed rounded-none" style={{ fontFamily: FONT_BODY }}>
                    {selectedProject.specs}
                  </div>
                </div>

                {selectedProject.amenities && (
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-widest font-semibold mb-3 text-white" style={{ fontFamily: FONT_BODY }}>Đặc quyền đi kèm</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 font-light" style={{ fontFamily: FONT_BODY }}>
                      {selectedProject.amenities.map((amenity: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-4 text-xs uppercase tracking-widest font-semibold text-black bg-[#C9A84C] hover:bg-[#E8C97E] transition-colors"
                  style={{ fontFamily: FONT_BODY }}
                >
                  Liên hệ tư vấn VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Gallery Lightbox */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in" onClick={() => setSelectedGalleryImg(null)}>
          <button
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-zinc-700 text-white hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }}               src={selectedGalleryImg}
              alt="Gallery Extended"
              className="max-w-full max-h-[85vh] object-contain border border-[#C9A84C]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

