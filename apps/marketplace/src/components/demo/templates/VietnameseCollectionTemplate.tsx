import React, { useState } from 'react';
import { 
  ArrowRight, Building2, Check, ChevronDown, MapPin, Menu, Phone, Search, X, 
  Star, ShieldCheck, Sparkles, SlidersHorizontal, Eye, FileText, CalendarDays,
  TrendingUp, Award, Clock, DollarSign, Home, CheckCircle2, MessageCircle
} from 'lucide-react';
import { Template } from '../../../data/templatesData';

type Props = { template: Template; viewport?: 'desktop' | 'tablet' | 'mobile'; initialPage?: string };

type StudioConfig = {
  brand: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  accent: string;
  paper: string;
  ink: string;
  hero: string;
  heroMode: 'split' | 'cover' | 'editorial';
  cardMode: 'clean' | 'bordered' | 'numbered';
  searchMode: 'floating' | 'inline' | 'sidebar';
  stats: { value: string; label: string }[];
  projects: { name: string; type: string; price: string; area: string; img: string; desc: string }[];
  areas: string[];
  features: { title: string; desc: string; icon: string }[];
  sectionOrder: Array<'projects' | 'story' | 'location' | 'services'>;
};

const CONFIGS: Record<string, StudioConfig> = {
  'bds-21': {
    brand: 'Vinhomes Riverside Marina',
    eyebrow: 'BIỆT THỰ VEN SÔNG — BẾN DU THUYỀN RIÊNG',
    title: 'Sống Tinh Hoa Bên Dòng Chảy Thượng Lưu',
    subtitle: 'Bộ sưu tập 25 dinh thự ven sông phiên bản giới hạn với bến du thuyền riêng và tầm nhìn hoàng hôn panorama độc bản.',
    primary: '#173b35',
    accent: '#c89858',
    paper: '#f7f2e9',
    ink: '#17201e',
    hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'editorial',
    cardMode: 'bordered',
    searchMode: 'inline',
    stats: [
      { value: '25 Căn', label: 'Dinh thự giới hạn' },
      { value: '30m', label: 'Mặt tiền sông riêng' },
      { value: '100%', label: 'Bến du thuyền tư nhân' },
      { value: 'Vĩnh viễn', label: 'Pháp lý sổ đỏ' },
    ],
    projects: [
      { name: 'Dinh Thự Đơn Lập Vườn Sông', type: 'Dinh Thự VIP', price: '220 Tỷ VNĐ', area: '950 m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', desc: '5 Phòng ngủ Master, hồ bơi vô cực view sông, bến du thuyền riêng.' },
      { name: 'Biệt Thự Song Lập Bến Ngọc', type: 'Song Lập Ven Sông', price: '125 Tỷ VNĐ', area: '480 m²', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', desc: '4 Phòng ngủ, sân vườn 150m², gara 3 ô tô siêu sang.' },
      { name: 'Sky Villa Duplex View Sông', type: 'Penthouse Duplex', price: '68 Tỷ VNĐ', area: '350 m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', desc: 'Hồ bơi sục trên cao ngắm trọn vẹn bình minh và hoàng hôn.' },
    ],
    areas: ['Bán đảo Thảo Điền (Quận 2)', 'Thủ Thiêm Riverfront', 'Đảo Kim Cương', 'Long Phước Riverside'],
    features: [
      { title: 'Bến Du Thuyền Riêng', desc: 'Sở hữu cầu cảng đỗ du thuyền dài 30m ngay hiên nhà.', icon: '🛥️' },
      { title: 'Hồ Bơi Nước Mặn', desc: 'Công nghệ điện phân muối tự nhiên view trực diện sông.', icon: '🏊' },
      { title: 'An Ninh 4 Lớp K9', desc: 'Bảo vệ riêng và camera nhiệt hồng ngoại 24/7.', icon: '🛡️' },
      { title: 'Quản Gia Maybach', desc: 'Dịch vụ xe sang đưa đón và hỗ trợ tiệc VIP tại nhà.', icon: '🤵' },
    ],
    sectionOrder: ['story', 'projects', 'location', 'services'],
  },

  'bds-22': {
    brand: 'Indochine Heritage Residences',
    eyebrow: 'CĂN HỘ PHONG CÁCH VIỆT — INDOCHINE ĐƯƠNG ĐẠI',
    title: 'Căn Hộ Phong Cách Việt — Ấm Cúng, Hiện Đại',
    subtitle: 'Nơi giao thoa giữa nét đẹp truyền thống mộc mạc và chuẩn mực tiện nghi quốc tế cho gia đình 3 thế hệ.',
    primary: '#78350f',
    accent: '#d97706',
    paper: '#fffbeb',
    ink: '#451a03',
    hero: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'split',
    cardMode: 'clean',
    searchMode: 'sidebar',
    stats: [
      { value: '120 Căn', label: 'Căn hộ thiết kế Indochine' },
      { value: '100% Gỗ', label: 'Nội thất gõ đỏ cao cấp' },
      { value: '2 Ban công', label: 'Thông gió tự nhiên' },
      { value: 'Lâu dài', label: 'Sổ hồng từng căn' },
    ],
    projects: [
      { name: 'Căn 2PN Ấm Cúng Ban Mai', type: 'Căn Hộ 2PN', price: '5.4 Tỷ VNĐ', area: '78 m²', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', desc: 'Không gian gạch bông cổ điển kết hợp sàn gỗ xương cá ấm áp.' },
      { name: 'Căn 3PN Gia Đình Tam Đại', type: 'Căn Hộ 3PN', price: '8.2 Tỷ VNĐ', area: '110 m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: '3 Phòng ngủ rộng rãi, bếp mở phong cách Á Đông truyền thống.' },
      { name: 'Penthouse Indochine Terrace', type: 'Sky Mansion', price: '18.5 Tỷ VNĐ', area: '220 m²', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', desc: 'Sân vườn trà đạo trên cao ngắm toàn cảnh trung tâm thành phố.' },
    ],
    areas: ['Quận 1 — Ba Son Heritage', 'Tây Hồ — Hà Nội', 'Hải Châu — Đà Nẵng', 'Phố Cổ Hội An'],
    features: [
      { title: 'Nội Thất Gỗ Gõ Đỏ', desc: 'Chế tác thủ công từ các nghệ nhân lành nghề truyền thống.', icon: '🪵' },
      { title: 'Vườn Trà Đạo Zen', desc: 'Không gian thư thái thưởng trà ngắm cảnh thiên nhiên.', icon: '🍵' },
      { title: 'Bếp Mở Thông Thoáng', desc: 'Hệ thống hút mùi âm trần cao cấp giữ trọn hương vị Việt.', icon: '🥘' },
      { title: 'Sảnh Đón Lễ Tân VIP', desc: 'Trang trí tranh sơn mài và gạch bông gốm Bát Tràng.', icon: '🎨' },
    ],
    sectionOrder: ['projects', 'location', 'services', 'story'],
  },

  'bds-23': {
    brand: 'Central Coast Ocean Retreat',
    eyebrow: 'RESORT BIỂN MIỀN TRUNG — NGHỈ DƯỠNG 6 SAO',
    title: 'Resort Biển Miền Trung — Thiên Đường Nghỉ Dưỡng',
    subtitle: 'Tổ hợp biệt thự nghỉ dưỡng sát biển Đà Nẵng - Nha Trang với cam kết dòng tiền cho thuê 12%/năm và 15 đêm nghỉ VIP.',
    primary: '#0369a1',
    accent: '#38bdf8',
    paper: '#f0f9ff',
    ink: '#0c4a6e',
    hero: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'cover',
    cardMode: 'numbered',
    searchMode: 'floating',
    stats: [
      { value: '12% / Năm', label: 'Cam kết lợi nhuận USD' },
      { value: '15 Đêm', label: 'Nghỉ dưỡng 6★ miễn phí' },
      { value: '100%', label: 'Biệt thự sát mép sóng' },
      { value: 'Accor 6★', label: 'Đơn vị quản lý toàn cầu' },
    ],
    projects: [
      { name: 'Biệt Thự Ghềnh Đá Mũi Né', type: 'Ocean Villa', price: '38.5 Tỷ VNĐ', area: '450 m²', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', desc: 'Hồ bơi vô cực nhô ra vách đá ngắm hoàng hôn vịnh biển.' },
      { name: 'Villa Bãi Biển Mỹ Khê', type: 'Beachfront Villa', price: '28.0 Tỷ VNĐ', area: '320 m²', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', desc: 'Bước chân xuống bãi cát trắng mịn, full nội thất 5 sao.' },
      { name: 'Condotel Sky Suite Nha Trang', type: 'Condotel Cao Cấp', price: '4.2 Tỷ VNĐ', area: '65 m²', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', desc: 'Căn hộ view biển trọn vẹn, khai thác cho thuê tỷ suất 10%.' },
    ],
    areas: ['Bán đảo Sơn Trà — Đà Nẵng', 'Vịnh Nha Trang', 'Mũi Né — Phan Thiết', 'Hồ Tràm — Bà Rịa'],
    features: [
      { title: 'Bãi Biển Riêng 1.5km', desc: 'Bờ biển cát trắng mịn không bóng người ngoài cư dân.', icon: '🏖️' },
      { title: 'Hồ Bơi Vô Cực Đa Tầng', desc: 'Trải dài từ đỉnh đồi xuống sát mép nước biển ngọc bích.', icon: '🏊‍♂️' },
      { title: 'Nhà Hàng Overwater', desc: 'Thưởng thức hải sản tươi ngon ngay trên mặt biển xanh.', icon: '🦞' },
      { title: 'Spa Khoáng Nóng Onsen', desc: 'Liệu trình chăm sóc sức khỏe và phục hồi năng lượng.', icon: '💆‍♀️' },
    ],
    sectionOrder: ['location', 'projects', 'story', 'services'],
  },

  'bds-24': {
    brand: 'Logistics Fleet & Industrial Hub',
    eyebrow: 'KHO XƯỞNG & LOGISTICS — CHUỖI CUNG ỨNG TOÀN CẦU',
    title: 'Kho Xưởng — Logistics — Chuỗi Cung Ứng',
    subtitle: 'Nhà xưởng xây sẵn và trung tâm logistics tiêu chuẩn quốc tế kết nối trực tiếp cao tốc và cụm cảng nước sâu Cái Mép.',
    primary: '#1e293b',
    accent: '#f59e0b',
    paper: '#f8fafc',
    ink: '#0f172a',
    hero: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'split',
    cardMode: 'bordered',
    searchMode: 'inline',
    stats: [
      { value: '5 Tấn/m²', label: 'Tải trọng sàn chịu lực' },
      { value: '14.5m', label: 'Chiều cao trần tối đa' },
      { value: '110/22kV', label: 'Trạm điện biến áp kép' },
      { value: 'Miễn 4 Năm', label: 'Ưu đãi thuế TNDN FDI' },
    ],
    projects: [
      { name: 'Xưởng Tiêu Chuẩn Block A', type: 'Xưởng Xây Sẵn RBF', price: '$4.8 / m² / tháng', area: '3.500 m²', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80', desc: 'Khung thép tiền chế Zamil, văn phòng 2 tầng, PCCC tự động.' },
      { name: 'Kho Cross-Docking Hiện Đại', type: 'Kho Logistics Lớn', price: '$5.5 / m² / tháng', area: '12.000 m²', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80', desc: 'Sàn cao 1.5m, 16 Dock Leveler tự động, bãi đỗ xe container rộng.' },
      { name: 'Lô Đất Công Nghiệp Sạch', type: 'Đất Công Nghiệp', price: '$140 / m² / 50 năm', area: '50.000 m²', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80', desc: 'Đã san lấp mặt bằng, đấu nối sẵn điện nước và xử lý nước thải A.' },
    ],
    areas: ['KCN VSIP Long Thành', 'KCN Sóng Thần 3 — Bình Dương', 'KCN Đình Vũ — Hải Phòng', 'KCN Yên Phong — Bắc Ninh'],
    features: [
      { title: 'Tải Trọng Sàn 5 Tấn/m²', desc: 'Bê tông cốt thép gia cường sẵn sàng máy móc dập nặng.', icon: '🏗️' },
      { title: 'Kết Nối Cảng Nước Sâu', desc: 'Chỉ 15km đến Cảng Cái Mép đón tàu 200.000 DWT.', icon: '🚢' },
      { title: 'Dịch Vụ Một Cửa FDI', desc: 'Hỗ trợ cấp giấy phép đầu tư IRC/ERC trọn gói 15 ngày.', icon: '📑' },
      { title: 'Năng Lượng Xanh Rooftop', desc: 'Lắp đặt sẵn hệ thống điện mặt trời áp mái tiết kiệm 30%.', icon: '⚡' },
    ],
    sectionOrder: ['services', 'projects', 'location', 'story'],
  },

  'bds-25': {
    brand: 'The Secret Enclave Sanctuary',
    eyebrow: 'KHU VILLA KHÉP KÍN — RIÊNG TƯ & ĐẲNG CẤP',
    title: 'Khu Villa Khép Kín — Riêng Tư & Đẳng Cấp',
    subtitle: 'Hệ thống an ninh 4 lớp FaceID và tuần tra 24/7, khuôn viên xanh mát với clubhouse và hồ bơi riêng biệt cho từng căn.',
    primary: '#064e3b',
    accent: '#10b981',
    paper: '#ecfdf5',
    ink: '#022c22',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'editorial',
    cardMode: 'clean',
    searchMode: 'floating',
    stats: [
      { value: '18 Căn', label: 'Biệt lập tuyệt đối' },
      { value: '4 Lớp', label: 'An ninh K9 & FaceID' },
      { value: '80%', label: 'Mảng xanh & mặt nước' },
      { value: 'Sổ đỏ', label: 'Sở hữu lâu dài' },
    ],
    projects: [
      { name: 'Villa Đơn Lập Vườn Xanh', type: 'Đơn Lập Compound', price: '95 Tỷ VNĐ', area: '600 m²', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', desc: '4 Phòng ngủ Master, hồ bơi nước mặn, sân vườn nhiệt đới.' },
      { name: 'Dinh Thự Mansion Tổng Thống', type: 'Mansion Compound', price: '165 Tỷ VNĐ', area: '900 m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', desc: 'Hầm để 4 siêu xe, phòng chiếu phim, hầm rượu Cigar VIP.' },
      { name: 'Biệt Thự Song Lập Park View', type: 'Song Lập Compound', price: '58 Tỷ VNĐ', area: '380 m²', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80', desc: 'View công viên nội khu rợp bóng cây cổ thụ mát mẻ quanh năm.' },
    ],
    areas: ['Thảo Điền Compound — Quận 2', 'Phú Mỹ Hưng Chateau — Quận 7', 'Starlake Compound — Tây Hồ', 'Ciputra Heritage'],
    features: [
      { title: 'An Ninh 4 Lớp Khép Kín', desc: 'Kiểm soát ra vào tuyệt đối với tuần tra cựu quân nhân 24/7.', icon: '🛡️' },
      { title: 'Clubhouse Riêng Tư', desc: 'Phòng gym Technogym, phòng tiệc VIP và sân tennis riêng.', icon: '🎾' },
      { title: 'Hồ Bơi Sục Nước Mặn', desc: 'Công nghệ lọc điện phân muối tự nhiên không hóa chất.', icon: '🏊' },
      { title: 'Dịch Vụ Quản Gia 6★', desc: 'Chăm sóc sân vườn, vệ sinh hồ bơi và dọn dẹp hàng ngày.', icon: '🤵' },
    ],
    sectionOrder: ['story', 'location', 'projects', 'services'],
  },

  'bds-26': {
    brand: 'Nhà Vườn Sinh Thái Đồng Quê',
    eyebrow: 'NHÀ VƯỜN SINH THÁI — VỀ VỚI THIÊN NHIÊN',
    title: 'Nhà Vườn Sinh Thái — Về Với Thiên Nhiên',
    subtitle: 'Không gian nghỉ dưỡng cuối tuần trọn vẹn với vườn cây ăn trái, hồ cá koi và không khí trong lành cách trung tâm chỉ 45 phút.',
    primary: '#14532d',
    accent: '#65a30d',
    paper: '#f7fee7',
    ink: '#052e16',
    hero: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'cover',
    cardMode: 'numbered',
    searchMode: 'inline',
    stats: [
      { value: '1.500m²', label: 'Khuôn viên vườn xanh' },
      { value: '100% Sạch', label: 'Trái cây hữu cơ tự nhiên' },
      { value: '45 Phút', label: 'Di chuyển từ trung tâm' },
      { value: 'Sổ hồng', label: 'Có sẵn thổ cư xây dựng' },
    ],
    projects: [
      { name: 'Nhà Vườn Vườn Bưởi Da Xanh', type: 'Nhà Vườn Nghỉ Dưỡng', price: '6.8 Tỷ VNĐ', area: '1.200 m²', img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80', desc: 'Nhà gỗ 3 gian mái ngói, trồng sẵn 40 gốc bưởi đang thu hoạch.' },
      { name: 'Biệt Thự Vườn Ven Kênh Sinh Thái', type: 'Villa Nhà Vườn', price: '12.5 Tỷ VNĐ', area: '2.500 m²', img: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&w=800&q=80', desc: 'Mặt tiền kênh nước trong xanh, hồ câu cá và chòi nghỉ mát BBQ.' },
      { name: 'Farmstay Đồi Chè Xanh Ngát', type: 'Khu Trang Trại Sinh Thái', price: '18.0 Tỷ VNĐ', area: '5.000 m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', desc: 'Khu nghỉ dưỡng đồi chè thơ mộng tại Bảo Lộc khí hậu mát mẻ 20°C.' },
    ],
    areas: ['Củ Chi — TP.HCM', 'Long Thành — Đồng Nai', 'Bảo Lộc — Lâm Đồng', 'Lương Sơn — Hòa Bình'],
    features: [
      { title: 'Vườn Trái Cây Trĩu Quả', desc: 'Trồng sẵn sầu riêng, bưởi da xanh và xoài cát hữu cơ.', icon: '🍊' },
      { title: 'Hồ Cá Koi & Chòi BBQ', desc: 'Không gian tụ họp gia đình và bạn bè vào mỗi cuối tuần.', icon: '🐟' },
      { title: 'Không Khí Trong Lành', desc: 'Chỉ số AQI luôn dưới 10, nhiệt độ mát mẻ quanh năm.', icon: '🍃' },
      { title: 'Đường Ô Tô Tận Nhà', desc: 'Đường nhựa lộ giới 8m ô tô 7 chỗ di chuyển thuận tiện.', icon: '🚗' },
    ],
    sectionOrder: ['services', 'story', 'projects', 'location'],
  },

  'bds-27': {
    brand: 'Champs-Élysées Townhouse',
    eyebrow: 'NHÀ PHỐ TÂN CỔ ĐIỂN — KIẾN TRÚC PHÁP',
    title: 'Nhà Phố Tân Cổ Điển — Vẻ Đẹp Vượt Thời Gian',
    subtitle: 'Dãy nhà phố thương mại phong cách Tân cổ điển Pháp với mặt tiền đá cẩm thạch, ban công uốn nghệ thuật và chiều cao trần 4.2m.',
    primary: '#671c2d',
    accent: '#d4af37',
    paper: '#faf5ed',
    ink: '#2b1717',
    hero: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'editorial',
    cardMode: 'bordered',
    searchMode: 'floating',
    stats: [
      { value: '8m', label: 'Mặt tiền đại lộ rộng' },
      { value: '1 Trệt 4 Lầu', label: 'Kết cấu kiên cố Châu Âu' },
      { value: 'Đá Marble', label: 'Ốp mặt ngoài nhập khẩu Ý' },
      { value: 'Sổ đỏ', label: 'Trao tay ngay khi nhận nhà' },
    ],
    projects: [
      { name: 'Nhà Phố Liền Kề Hoàng Gia', type: 'Townhouse Tân Cổ Điển', price: '18.5 Tỷ VNĐ', area: '120m² (Sàn 480m²)', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', desc: 'Mặt tiền đường 20m, trần cao 4.2m, phù hợp mở spa, showroom.' },
      { name: 'Shophouse Căn Góc 2 Mặt Tiền', type: 'Shophouse Góc VIP', price: '28.5 Tỷ VNĐ', area: '180m² (Sàn 720m²)', img: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80', desc: 'Vị trí đắc địa ngã tư đại lộ mua sắm sầm uất nhất khu đô thị.' },
      { name: 'Dinh Thự Phố Mansion Indochine', type: 'Dinh Thự Phố', price: '42.0 Tỷ VNĐ', area: '250m² (Sàn 950m²)', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', desc: 'Thang máy kính riêng, hầm để 3 ô tô, nội thất dát vàng tinh tế.' },
    ],
    areas: ['Phố Đông Tăng Long — TP. Thủ Đức', 'Vinhomes Grand Park Rodeo', 'Phố Cổ Ngọc Hà — Hà Nội', 'Khu Đô Thị Ecopark'],
    features: [
      { title: 'Kiến Trúc Pháp Cổ Điển', desc: 'Họa tiết phù điêu đắp nổi tinh xảo bởi nghệ nhân Pháp.', icon: '🏛️' },
      { title: 'Mặt Tiền Đại Lộ 20m', desc: 'Lưu lượng giao thông nhộn nhịp tối ưu hóa kinh doanh.', icon: '🛍️' },
      { title: 'Thang Máy Kính Hiện Đại', desc: 'Kết nối 5 tầng êm ái tải trọng 650kg tiêu chuẩn Đức.', icon: '🛗' },
      { title: 'Vỉa Hè Lát Đá Granite', desc: 'Vỉa hè rộng 6m phủ bóng cây xanh dạo bộ thoáng mát.', icon: '🌳' },
    ],
    sectionOrder: ['story', 'projects', 'services', 'location'],
  },

  'bds-28': {
    brand: 'Alpha Capital Wealth Advisory',
    eyebrow: 'TƯ VẤN ĐẦU TƯ SINH LỜI — QUẢN TRỊ TÀI SẢN',
    title: 'Tư Vấn Đầu Tư Sinh Lời — Tối Ưu Dòng Tiền',
    subtitle: 'Báo cáo phân tích chuyên sâu dữ liệu quy hoạch hạ tầng và danh mục BĐS dòng tiền mang lại lợi suất thực tế trên 15%/năm.',
    primary: '#1e3a8a',
    accent: '#38bdf8',
    paper: '#f1f5f9',
    ink: '#0f172a',
    hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'split',
    cardMode: 'numbered',
    searchMode: 'sidebar',
    stats: [
      { value: '+18.5%', label: 'Tỷ suất lợi nhuận kỳ vọng' },
      { value: '8.5%/Năm', label: 'Dòng tiền cho thuê ổn định' },
      { value: '100%', label: 'Tài sản thẩm định pháp lý' },
      { value: '15 Năm', label: 'Kinh nghiệm cố vấn BĐS' },
    ],
    projects: [
      { name: 'Căn Hộ Cho Thuê Chuyên Gia Hàn', type: 'Dòng Tiền Cao', price: '7.5 Tỷ VNĐ', area: '85 m²', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', desc: 'Đang cho thuê 32 Tr/tháng, hợp đồng 3 năm với Samsung R&D.' },
      { name: 'Shophouse Khối Đế Đại Học', type: 'Khai Thác Kinh Doanh', price: '14.2 Tỷ VNĐ', area: '140 m²', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', desc: 'Khai thác F&B dòng khách 15.000 sinh viên mỗi ngày, ROI 9.5%.' },
      { name: 'Đất Nền Đón Sóng Cao Tốc', type: 'Tăng Trưởng Vốn', price: '3.8 Tỷ VNĐ', area: '150 m²', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', desc: 'Quy hoạch nút giao cao tốc Biên Hòa - Vũng Tàu, biên độ +30%.' },
    ],
    areas: ['Trung tâm Tài chính Thủ Thiêm', 'Khu Công Nghệ Cao TP. Thủ Đức', 'Vùng Phụ Cận Sân Bay Long Thành', 'Khu Đô Thị Sân Bay Nội Bài'],
    features: [
      { title: 'Mô Phỏng ROI Realtime', desc: 'Bảng tính dòng tiền chi tiết trừ chi phí lãi vay và thuế.', icon: '📊' },
      { title: 'Hồ Sơ Quy Hoạch 1/500', desc: 'Tải trọn bộ bản đồ quy hoạch giao thông trực tiếp.', icon: '🗺️' },
      { title: 'Quản Lý Cho Thuê Tự Động', desc: 'Hệ thống tự động tìm khách và quản lý thu tiền thuê.', icon: '🔑' },
      { title: 'Chiến Lược Rút Vốn An Toàn', desc: 'Hoạch định thời điểm thanh khoản đạt đỉnh lợi nhuận.', icon: '📈' },
    ],
    sectionOrder: ['location', 'services', 'projects', 'story'],
  },

  'bds-29': {
    brand: 'Ecovista Riverside Launch',
    eyebrow: 'TRANG MỞ BÁN DỰ ÁN — FLASH SALE ĐỢT 1',
    title: 'Trang Mở Bán Dự Án — Ecovista Riverside',
    subtitle: 'Cơ hội sở hữu căn hộ ven sông đẹp nhất với chính sách chiết khấu trực tiếp 12% và hỗ trợ 0% lãi suất trong 24 tháng cho 30 khách đầu tiên.',
    primary: '#be123c',
    accent: '#fb923c',
    paper: '#fff7ed',
    ink: '#3f1d28',
    hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'cover',
    cardMode: 'clean',
    searchMode: 'floating',
    stats: [
      { value: '50 Triệu', label: 'Đặt chỗ hoàn tiền 100%' },
      { value: 'Giảm 12%', label: 'Chiết khấu thanh toán sớm' },
      { value: '3 Chỉ Vàng', label: 'Quà tặng tân gia may mắn' },
      { value: 'Ân Hạn 2 Năm', label: 'Vay 80% lãi suất 0%' },
    ],
    projects: [
      { name: 'Căn 1PN Sky View Độc Thân', type: 'Studio / 1PN', price: '2.46 Tỷ VNĐ', area: '52 m²', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', desc: 'Đã giảm 12% từ giá gốc 2.8 Tỷ, ban công view sông thoáng đãng.' },
      { name: 'Căn 2PN Góc 2 Ban Công', type: 'Family 2PN', price: '3.69 Tỷ VNĐ', area: '75 m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', desc: 'Đã giảm 12% từ giá gốc 4.2 Tỷ, tặng gói nội thất 150 Triệu.' },
      { name: 'Căn 3PN Panorama Master', type: 'Presidential 3PN', price: '5.28 Tỷ VNĐ', area: '102 m²', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80', desc: 'Đã giảm 12% từ giá gốc 6.0 Tỷ, tặng 1 năm phí quản lý 5 sao.' },
    ],
    areas: ['Mặt tiền Vành Đai 3 — TP. Thủ Đức', 'Đối diện Vincom Mega Mall', 'Liền kề Ga Metro số 1', 'Kết nối Cao tốc Long Thành'],
    features: [
      { title: 'Chiết Khấu Đợt 1 Lên Đến 12%', desc: 'Áp dụng trực tiếp vào giá trị hợp đồng mua bán.', icon: '🔥' },
      { title: 'Vay Không Lãi Suất 24 Tháng', desc: 'Ngân hàng Techcombank và Vietcombank giải ngân 80%.', icon: '🏦' },
      { title: 'Nhận Nhà Đúng Tiến Độ 2026', desc: 'Bảo lãnh tài chính 100% từ ngân hàng đối tác.', icon: '🏗️' },
      { title: 'Bốc Thăm Trúng Siêu Xe Mercedes', desc: 'Dành riêng cho khách hàng chuyển cọc thành công trong sự kiện.', icon: '🚗' },
    ],
    sectionOrder: ['projects', 'services', 'story', 'location'],
  },

  'bds-30': {
    brand: 'Việt Phát Urban Development Group',
    eyebrow: 'TẬP ĐOÀN PHÁT TRIỂN ĐÔ THỊ — NIÊM YẾT HOSE',
    title: 'Tập Đoàn Phát Triển Đô Thị — Kiến Tạo Giá Trị Sống',
    subtitle: 'Tập đoàn phát triển hơn 15 đại đô thị trên cả nước với quỹ đất sạch 8.000 ha, đối tác quốc tế và báo cáo tài chính niêm yết minh bạch.',
    primary: '#4c1d95',
    accent: '#d8b4fe',
    paper: '#f7f3f8',
    ink: '#24153a',
    hero: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'split',
    cardMode: 'bordered',
    searchMode: 'inline',
    stats: [
      { value: '15+ Dự Án', label: 'Đại đô thị quy mô lớn' },
      { value: '8.000 Ha', label: 'Quỹ đất sạch toàn quốc' },
      { value: '45.000+', label: 'Gia đình đã an cư' },
      { value: 'Mã: VPG', label: 'Niêm yết sàn HOSE' },
    ],
    projects: [
      { name: 'Siêu Đại Đô Thị VPG Ocean City', type: 'Đại Đô Thị 1.200 Ha', price: 'Từ 6.5 Tỷ VNĐ', area: '1.200 Ha', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', desc: 'Biển hồ nước mặn nhân tạo, đại học quốc tế, bệnh viện đa khoa.' },
      { name: 'Tổ Hợp Smart Central Tower', type: 'Tổ Hợp Hạng A', price: 'Từ 4.8 Tỷ VNĐ', area: '280 Ha', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', desc: 'Tháp văn phòng 68 tầng, trung tâm tài chính và căn hộ hàng hiệu.' },
      { name: 'Quần Thể Nghỉ Dưỡng VPG Paradise', type: 'Resort Đảo Biển', price: 'Từ 15.0 Tỷ VNĐ', area: '850 Ha', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', desc: 'Sân Golf PGA 36 hố, bến du thuyền quốc tế và casino tiêu chuẩn.' },
    ],
    areas: ['Hà Nội & Vùng Thủ Đô', 'TP. Hồ Chí Minh & Đông Nam Bộ', 'Đà Nẵng & Vùng Duyên Hải', 'Phú Quốc Special Zone'],
    features: [
      { title: 'Quản Trị Chuẩn ESG Quốc Tế', desc: 'Tiên phong phát triển công trình xanh Net-Zero Carbon.', icon: '🌿' },
      { title: 'Hệ Sinh Thái Tiện Ích Trọn Gói', desc: 'Trường học, bệnh viện, trung tâm thương mại nội khu.', icon: '🏫' },
      { title: 'Báo Cáo Tài Chính Minh Bạch', desc: 'Kiểm toán độc lập Big 4 và cập nhật thông tin cổ đông định kỳ.', icon: '📑' },
      { title: 'Mạng Lưới Đối Tác Toàn Cầu', desc: 'Hợp tác cùng Marriott, Foster+Partners, CBRE, Savills.', icon: '🤝' },
    ],
    sectionOrder: ['story', 'services', 'projects', 'location'],
  },

  'bds-31': {
    brand: 'Sàn Đấu Giá Tài Sản Phát Mãi',
    eyebrow: 'TÀI SẢN PHÁT MÃI — NGÂN HÀNG THANH LÝ',
    title: 'Tài Sản Phát Mãi — Cơ Hội Tốt · Giá Tốt',
    subtitle: 'Tất cả tài sản đã được ngân hàng và tòa án thẩm định pháp lý sạch 100%, sẵn sàng công chứng sang tên và hỗ trợ vay bù giá rẻ.',
    primary: '#7f1d1d',
    accent: '#fbbf24',
    paper: '#f8f5f1',
    ink: '#2d1717',
    hero: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'cover',
    cardMode: 'numbered',
    searchMode: 'sidebar',
    stats: [
      { value: 'Giảm 30-50%', label: 'Rẻ hơn giá thị trường' },
      { value: '100% Sạch', label: 'Pháp lý tòa án xác nhận' },
      { value: '7 Ngày', label: 'Công chứng sang tên ngay' },
      { value: 'Vay 70%', label: 'Ngân hàng phát mãi bảo lãnh' },
    ],
    projects: [
      { name: 'Nhà Phố Mặt Tiền Q. Bình Thạnh', type: 'Phát Mãi Ngân Hàng', price: '11.2 Tỷ (Giá TT 18 Tỷ)', area: '115 m²', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80', desc: 'Đấu giá đợt 2, giảm ngay 38% so với giá thị trường, có sổ hồng.' },
      { name: 'Biệt Thự Sân Vườn Khu Tên Lửa', type: 'Thanh Lý Thu Hồi Nợ', price: '15.8 Tỷ (Giá TT 25 Tỷ)', area: '280 m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', desc: 'Biệt thự 3 tầng kiên cố, hoàn tất thủ tục bàn giao tài sản sạch.' },
      { name: 'Lô Đất Biệt Thự Long Thành', type: 'Đất Nền Thanh Lý', price: '4.5 Tỷ (Giá TT 8.0 Tỷ)', area: '320 m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', desc: 'Đất quy hoạch thổ cư 100%, cách cổng sân bay Long Thành 5km.' },
    ],
    areas: ['TP. Hồ Chí Minh (Các Quận Trung Tâm)', 'Hà Nội (Khu Vực Mở Rộng)', 'Bình Dương & Đồng Nai', 'Đà Nẵng & Khánh Hòa'],
    features: [
      { title: 'Thẩm Định Pháp Lý Sạch 100%', desc: 'Được cơ quan thi hành án và ngân hàng bảo chứng pháp lý.', icon: '⚖️' },
      { title: 'Tiết Kiệm Hàng Tỷ Đồng', desc: 'Giá khởi điểm thấp hơn từ 30% đến 50% so với thị trường.', icon: '💰' },
      { title: 'Công Chứng Trong 7 Ngày', desc: 'Quy trình bàn giao sổ hồng nhanh chóng, an toàn tuyệt đối.', icon: '📝' },
      { title: 'Hỗ Trợ Vay Ưu Đãi Lãi Thấp', desc: 'Chính ngân hàng phát mãi tài trợ 70% giá trị trúng đấu giá.', icon: '🏦' },
    ],
    sectionOrder: ['projects', 'location', 'services', 'story'],
  },

  'bds-32': {
    brand: 'Central Retail Promenade',
    eyebrow: 'PHỐ THƯƠNG MẠI TRUNG TÂM — TRUNG TÂM PHỒN HOA',
    title: 'Phố Thương Mại Trung Tâm — Kinh Doanh Sầm Uất',
    subtitle: 'Dãy shophouse và mặt bằng kinh doanh tại trục phố đi bộ trung tâm, tỷ lệ lấp đầy 98% với hàng trăm thương hiệu F&B và thời trang hàng đầu.',
    primary: '#9a3412',
    accent: '#fdba74',
    paper: '#fff7ed',
    ink: '#431407',
    hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85',
    heroMode: 'editorial',
    cardMode: 'clean',
    searchMode: 'inline',
    stats: [
      { value: '25.000+', label: 'Lượt khách mua sắm/ngày' },
      { value: '8 - 12m', label: 'Mặt tiền kinh doanh lớn' },
      { value: '98%', label: 'Tỷ lệ lấp đầy mặt bằng' },
      { value: 'Sổ hồng', label: 'Sở hữu thương mại lâu dài' },
    ],
    projects: [
      { name: 'Shophouse Đại Lộ Đi Bộ Rodeo', type: 'Shophouse 4 Tầng', price: 'Thuê 85 Tr/th · Bán 28 Tỷ', area: '350 m²', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', desc: 'Vỉa hè 6m, thiết kế trệt + 3 lầu thông thoáng cho chuỗi cafe & F&B.' },
      { name: 'Kiosk Cafe Góc 2 Mặt Tiền', type: 'Kiosk Thương Mại', price: 'Thuê 35 Tr/tháng', area: '45 m²', img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80', desc: 'Vị trí đắc địa ngay đài phun nước trung tâm đón trọn dòng khách tham quan.' },
      { name: 'Mặt Bằng Flagship Store Hàng Hiệu', type: 'Showroom Lớn', price: 'Thuê 180 Tr/th · Bán 65 Tỷ', area: '600 m²', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', desc: 'Mặt tiền kính 15m, chiều cao thông tầng 7m tạo điểm nhấn thương hiệu.' },
    ],
    areas: ['Phố Đi Bộ Nguyễn Huệ — Quận 1', 'Đại Lộ Rodeo — Vinhomes Grand Park', 'Phố Cổ Hoàn Kiếm — Hà Nội', 'Phố Đêm Bạch Đằng — Đà Nẵng'],
    features: [
      { title: 'Lưu Lượng Khách 25.000/Ngày', desc: 'Trục đường chính thu hút cư dân và du khách quốc tế.', icon: '🚶‍♂️' },
      { title: 'Vỉa Hè Lớn Rộng 6 Mét', desc: 'Cho phép kinh doanh cà phê ngoài trời và sự kiện pop-up.', icon: '☕' },
      { title: 'Bãi Đỗ Xe Thông Minh 2.000 Chỗ', desc: 'Thuận tiện đón tiếp lượng khách vãng lai mua sắm lớn.', icon: '🅿️' },
      { title: 'Hỗ Trợ Fit-out Mặt Bằng', desc: 'Miễn phí 2 tháng tiền thuê trong thời gian thi công trang trí.', icon: '🛠️' },
    ],
    sectionOrder: ['services', 'projects', 'story', 'location'],
  },
};

export default function VietnameseCollectionTemplate({ template, initialPage = 'home' }: Props) {
  const cfg = CONFIGS[template.slug] || CONFIGS['bds-21'];
  const [menuOpen, setMenuOpen] = useState(false);
  const link = (page = 'home') => page === 'home' ? `/demo/${template.slug}` : `/demo/${template.slug}/${page}`;
  
  if (initialPage !== 'home') return <SubPage cfg={cfg} page={initialPage} link={link} />;
  
  return (
    <div style={{ color: cfg.ink, background: cfg.paper }} className="min-h-screen font-sans transition-colors">
      {/* Header */}
      <header className="relative z-30 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <a href={link()} className="text-xl font-black tracking-tight" style={{ color: cfg.primary }}>
            {cfg.brand}
          </a>
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase md:flex">
            <a href="#hero" className="hover:opacity-75 transition">Trang chủ</a>
            <a href="#du-an-noi-bat" className="hover:opacity-75 transition">Sản phẩm</a>
            <a href="#cau-chuyen" className="hover:opacity-75 transition">Giới thiệu</a>
            <a href="#khu-vuc" className="hover:opacity-75 transition">Vị trí</a>
            <a href="#tien-ich" className="hover:opacity-75 transition">Tiện ích</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0919006030" className="text-xs font-bold flex items-center gap-1.5 opacity-80 hover:opacity-100">
              <Phone className="w-3.5 h-3.5" /> 0919 006 030
            </a>
            <a href="#nhan-tu-van" className="px-5 py-2.5 text-xs font-black text-white rounded-lg shadow-md transition hover:brightness-110" style={{ background: cfg.primary }}>
              Nhận Tư Vấn VIP
            </a>
          </div>
          <button className="p-3 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="grid gap-4 border-t bg-white px-5 py-5 text-sm font-bold md:hidden">
            <a href="#hero">Trang chủ</a>
            <a href="#du-an-noi-bat">Sản phẩm</a>
            <a href="#cau-chuyen">Giới thiệu</a>
            <a href="#khu-vuc">Vị trí</a>
            <a href="#tien-ich">Tiện ích</a>
            <a href="#nhan-tu-van" className="py-2.5 text-center text-white rounded-lg font-bold" style={{ background: cfg.primary }}>
              Nhận Bảng Giá VIP
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <Hero cfg={cfg} />

      {/* Stats Bar */}
      <section className="border-y border-black/10 bg-white/80 backdrop-blur py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
          {cfg.stats.map((st, i) => (
            <div key={i}>
              <strong className="text-2xl sm:text-3xl font-black block" style={{ color: cfg.primary }}>{st.value}</strong>
              <p className="mt-1 text-xs opacity-60 font-bold uppercase tracking-wider">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search Filter Bar */}
      {cfg.searchMode !== 'sidebar' && <SearchBar cfg={cfg} floating={cfg.searchMode === 'floating'} />}

      {/* Main Content Sections */}
      {cfg.searchMode === 'sidebar' ? (
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[280px_1fr]">
          <SearchSidebar cfg={cfg} />
          <ProjectSection cfg={cfg} />
        </section>
      ) : (
        <ProjectSection cfg={cfg} />
      )}

      {/* Story Section */}
      <StorySection cfg={cfg} />

      {/* Features & Amenities Section */}
      <FeatureSection cfg={cfg} />

      {/* Location Section */}
      <LocationSection cfg={cfg} />

      {/* Lead Form Section */}
      <LeadSection cfg={cfg} />

      {/* Footer */}
      <Footer cfg={cfg} />
    </div>
  );
}

function Hero({ cfg }: { cfg: StudioConfig }) {
  const copy = (
    <div className="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16">
      <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black tracking-[.2em] uppercase mb-4" style={{ background: `${cfg.accent}25`, color: cfg.accent }}>
        ★ {cfg.eyebrow}
      </span>
      <h1 className="mt-2 text-4xl font-black leading-[1.08] sm:text-5xl lg:text-6xl tracking-tight">
        {cfg.title}
      </h1>
      <p className="mt-6 max-w-lg text-sm sm:text-base leading-7 opacity-80">
        {cfg.subtitle}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a href="#du-an-noi-bat" className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-black text-white rounded-xl shadow-xl hover:scale-105 transition" style={{ background: cfg.primary }}>
          Khám Phá Dự Án <ArrowRight className="h-4 w-4" />
        </a>
        <a href="#nhan-tu-van" className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold border border-current rounded-xl hover:bg-black/5 transition">
          <Phone className="h-4 w-4" /> Đặt Lịch Xem Nhà
        </a>
      </div>
    </div>
  );

  if (cfg.heroMode === 'cover') {
    return (
      <section id="hero" className="relative min-h-[640px] overflow-hidden text-white flex items-center">
        <img src={cfg.hero} alt={cfg.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="mx-auto grid min-h-[640px] max-w-7xl items-center px-5 relative z-10">{copy}</div>
      </section>
    );
  }

  if (cfg.heroMode === 'split') {
    return (
      <section id="hero" className="grid min-h-[620px] bg-white lg:grid-cols-2 items-center">
        <div className="flex items-center">{copy}</div>
        <div className="h-full min-h-[420px] w-full overflow-hidden">
          <img src={cfg.hero} alt={cfg.title} className="h-full min-h-[420px] w-full object-cover hover:scale-105 transition duration-700" />
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="mx-auto grid max-w-7xl gap-0 bg-white lg:grid-cols-[.85fr_1.15fr] items-center">
      <div className="flex items-center">{copy}</div>
      <div className="h-full min-h-[560px] w-full overflow-hidden">
        <img src={cfg.hero} alt={cfg.title} className="h-full min-h-[560px] w-full object-cover hover:scale-105 transition duration-700" />
      </div>
    </section>
  );
}

function SearchBar({ cfg, floating }: { cfg: StudioConfig; floating: boolean }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={`mx-auto grid max-w-6xl gap-3 bg-white p-6 shadow-2xl rounded-2xl md:grid-cols-[1fr_1fr_1fr_auto] ${floating ? '-mt-10 relative z-20' : 'my-8'}`}>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">Loại BĐS</label>
        <select className="w-full border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500">
          <option>Tất cả loại hình sản phẩm</option>
          <option>Biệt thự đơn lập / Song lập</option>
          <option>Căn hộ cao cấp 1-3PN</option>
          <option>Shophouse thương mại</option>
          <option>Đất nền quy hoạch</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">Khu Vực</label>
        <select className="w-full border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500">
          <option>Tất cả khu vực trọng điểm</option>
          <option>TP. Hồ Chí Minh & TP. Thủ Đức</option>
          <option>Hà Nội & Vùng Thủ Đô</option>
          <option>Đà Nẵng & Nha Trang</option>
          <option>Bình Dương & Đồng Nai</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">Khoảng Giá</label>
        <select className="w-full border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500">
          <option>Tất cả mức ngân sách</option>
          <option>Dưới 5 Tỷ VNĐ</option>
          <option>5 Tỷ - 15 Tỷ VNĐ</option>
          <option>15 Tỷ - 50 Tỷ VNĐ</option>
          <option>Trên 50 Tỷ (Phân khúc VIP)</option>
        </select>
      </div>
      <div className="flex items-end">
        <button 
          type="button"
          onClick={() => {
            const el = document.getElementById('du-an-noi-bat');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full px-7 py-3 text-xs font-black text-white rounded-xl shadow-lg transition hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer" 
          style={{ background: cfg.primary }}
        >
          <Search className="w-4 h-4" /> Tìm Kiếm
        </button>
      </div>
    </form>
  );
}

function SearchSidebar({ cfg }: { cfg: StudioConfig }) {
  return (
    <aside className="h-fit bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <h2 className="text-lg font-black pb-3 border-b border-slate-100 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4" /> Bộ Lọc Chi Tiết
      </h2>
      {['Khu vực', 'Loại hình BĐS', 'Khoảng giá', 'Diện tích sàn', 'Trạng thái mở bán'].map((x) => (
        <label key={x} className="mt-4 block text-xs font-bold opacity-80">
          {x}
          <select className="mt-1.5 w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-blue-500">
            <option>Tất cả lựa chọn</option>
          </select>
        </label>
      ))}
      <button 
        type="button"
        onClick={() => {
          const el = document.getElementById('du-an-noi-bat');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="mt-6 w-full py-3.5 text-xs font-black text-white rounded-xl shadow-md transition hover:brightness-110 cursor-pointer" 
        style={{ background: cfg.primary }}
      >
        Áp Dụng Bộ Lọc
      </button>
    </aside>
  );
}

function ProjectSection({ cfg }: { cfg: StudioConfig }) {
  return (
    <section id="du-an-noi-bat" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: cfg.accent }}>
            ★ BỘ SƯU TẬP SẢN PHẨM NỔI BẬT ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Danh Mục Quỹ Căn Đang Mở Bán</h2>
          <p className="text-sm opacity-70 mt-2">Thông tin minh bạch về diện tích, bố trí phòng và mức giá niêm yết chính thức từ chủ đầu tư.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cfg.projects.map((proj, i) => (
            <article key={proj.name} className="group overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={proj.img} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow" style={{ background: cfg.primary }}>
                    {proj.type}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs opacity-60 font-bold">
                    <span>Mã SP: #0{i + 1}</span>
                    <span>DT: {proj.area}</span>
                  </div>
                  <h3 className="text-xl font-black group-hover:text-amber-600 transition-colors">{proj.name}</h3>
                  <p className="text-xs opacity-70 leading-relaxed">{proj.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase opacity-50 block">Giá niêm yết</span>
                  <strong className="text-lg font-black" style={{ color: cfg.primary }}>{proj.price}</strong>
                </div>
                <a href="#nhan-tu-van" className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors text-xs font-bold">
                  Nhận Báo Giá →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection({ cfg }: { cfg: StudioConfig }) {
  return (
    <section id="cau-chuyen" className="bg-white py-20 sm:py-28 border-y border-slate-200/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: cfg.accent }}>
            ★ CÂU CHUYỆN & GIÁ TRỊ CỐT LÕI ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">
            Kiến Tạo Không Gian Sống Bền Vững & Đẳng Cấp
          </h2>
          <p className="mt-6 text-sm leading-7 opacity-75">
            Dự án <strong>{cfg.brand}</strong> được phát triển bởi đội ngũ kiến trúc sư và chuyên gia bất động sản hàng đầu, hướng tới việc mang lại giá trị gia tăng dài hạn và trải nghiệm an cư hoàn mỹ nhất cho quý khách hàng.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cfg.stats.map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <strong className="text-xl font-black block" style={{ color: cfg.primary }}>{st.value}</strong>
                <p className="text-[10px] opacity-60 font-bold mt-1">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
          <img src={cfg.hero} alt={`Câu chuyện ${cfg.brand}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ cfg }: { cfg: StudioConfig }) {
  return (
    <section id="tien-ich" className="py-20 sm:py-28 max-w-7xl mx-auto px-5">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: cfg.accent }}>
          ★ TIỆN ÍCH & ĐẶC QUYỀN VƯỢT TRỘI ★
        </span>
        <h2 className="text-3xl sm:text-4xl font-black">Hệ Thống Tiện Ích Đỉnh Cao</h2>
        <p className="text-sm opacity-70 mt-2">Đặc quyền dành riêng cho cộng đồng cư dân với tiêu chuẩn phục vụ chuẩn 5 sao.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cfg.features.map((ft, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-3">
            <span className="text-4xl block">{ft.icon}</span>
            <h4 className="text-lg font-black">{ft.title}</h4>
            <p className="text-xs opacity-70 leading-relaxed">{ft.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LocationSection({ cfg }: { cfg: StudioConfig }) {
  return (
    <section id="khu-vuc" className="py-20 text-white sm:py-28" style={{ background: cfg.primary }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 items-center">
        <div>
          <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: cfg.accent }}>
            ★ VỊ TRÍ & HẠ TẦNG KẾT NỐI ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">
            Tâm Điểm Kết Nối Các Trục Giao Thông Huyết Mạch
          </h2>
          <p className="mt-4 text-sm leading-7 opacity-80">
            Sở hữu vị trí vàng đắc địa dễ dàng di chuyển tới các trung tâm hành chính, trường học quốc tế, bệnh viện và sân bay.
          </p>
          <div className="mt-8 space-y-3">
            {cfg.areas.map((x, i) => (
              <div key={x} className="flex justify-between items-center border-b border-white/15 py-3.5 text-sm font-semibold">
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" style={{ color: cfg.accent }} /> {x}
                </span>
                <span className="text-xs font-black opacity-60">Khu vực 0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-h-[380px] place-items-center rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur text-center">
          <div>
            <MapPin className="mx-auto h-12 w-12 animate-bounce" style={{ color: cfg.accent }} />
            <h4 className="mt-4 text-xl font-black">Bản Đồ Chỉ Đường & Kết Nối Vệ Tinh</h4>
            <p className="mt-2 text-xs text-white/70 max-w-sm">
              Tích hợp sẵn bản đồ Google Maps tương tác chi tiết giúp khách hàng dễ dàng định vị dự án.
            </p>
            <button 
              onClick={() => alert('Đang mở bản đồ Google Maps chỉ đường...')}
              className="mt-6 px-6 py-3 text-xs font-black bg-white text-slate-900 rounded-xl shadow hover:scale-105 transition"
            >
              🗺️ Mở Bản Đồ Google Maps 4K
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadSection({ cfg }: { cfg: StudioConfig }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return alert('Vui lòng nhập số điện thoại!');
    setSubmitted(true);
    alert(`🎉 Đã tiếp nhận đăng ký của ${name || 'quý khách'} (${phone}). Chuyên viên sẽ liên hệ gửi bảng giá qua Zalo trong 3 phút!`);
  };

  return (
    <section id="nhan-tu-van" className="bg-white py-20 sm:py-28 border-t border-slate-200/60">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:grid-cols-2 items-center">
        <div>
          <span className="text-xs font-black tracking-[.2em] uppercase block mb-2" style={{ color: cfg.accent }}>
            ★ TƯ VẤN & NHẬN BẢNG GIÁ VIP ★
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Đăng Ký Tham Quan & Nhận Bảng Giá Đợt 1</h2>
          <p className="mt-4 text-sm opacity-70 leading-relaxed">
            Chuyên viên tư vấn senior sẵn sàng hỗ trợ chọn căn đẹp nhất, giải đáp pháp lý và gửi trọn bộ tài liệu PDF qua Zalo.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-bold">
            <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
              <Phone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-60 block">Hotline tư vấn 24/7</span>
              <strong className="text-lg">0919 006 030</strong>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-xl font-bold text-emerald-800">Đã Gửi Thành Công!</h4>
            <p className="text-xs text-emerald-700">Tài liệu và bảng giá chi tiết đang được gửi qua Zalo cho quý khách.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-3.5 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xl">
            <div>
              <label className="block text-xs font-bold uppercase opacity-70 mb-1">Họ và tên (*)</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 bg-white rounded-xl p-3.5 text-xs font-medium focus:outline-none focus:border-blue-500" placeholder="Ví dụ: Nguyễn Văn A..." />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase opacity-70 mb-1">Số điện thoại / Zalo (*)</label>
              <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-slate-200 bg-white rounded-xl p-3.5 text-xs font-bold text-blue-600 focus:outline-none focus:border-blue-500" placeholder="Ví dụ: 0919 006 030..." />
            </div>
            <button type="submit" className="py-4 text-xs font-black text-white rounded-xl shadow-lg transition hover:brightness-110 mt-2 cursor-pointer" style={{ background: cfg.primary }}>
              🚀 GỬI YÊU CẦU NHẬN BẢNG GIÁ VIP
            </button>
            <p className="text-[10px] text-center opacity-50">🔒 Thông tin được bảo mật 100% theo tiêu chuẩn chủ đầu tư.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer({ cfg }: { cfg: StudioConfig }) {
  return (
    <footer className="px-5 py-16 text-white text-xs" style={{ background: cfg.ink }}>
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <strong className="text-xl block mb-2 font-black">{cfg.brand}</strong>
          <p className="opacity-60 leading-6">Website demo bất động sản cao cấp tối ưu chuẩn SEO và CMS quản trị tự động.</p>
        </div>
        <div className="leading-6">
          <strong className="block mb-2 uppercase tracking-wider text-slate-300">Thông Tin Liên Hệ</strong>
          <p>Hotline: 0919 006 030</p>
          <p>Email: contact@templatesbds.vn</p>
          <p>Zalo: 0919 006 030</p>
        </div>
        <div className="leading-6">
          <strong className="block mb-2 uppercase tracking-wider text-slate-300">Văn Phòng Sàn Giao Dịch</strong>
          <p>Tòa nhà Landmark Tower, Quận 1, TP. Hồ Chí Minh</p>
          <p>Văn phòng đại diện: Cầu Giấy, Hà Nội</p>
        </div>
        <div className="leading-6">
          <strong className="block mb-2 uppercase tracking-wider text-slate-300">Bản Quyền Giao Diện</strong>
          <p>© 2026 {cfg.brand}. Bản quyền kho giao diện TEMPLATES BDS.</p>
          <p className="opacity-60 mt-1">Toàn bộ thông tin, logo, hình ảnh được cấu hình qua CMS.</p>
        </div>
      </div>
    </footer>
  );
}

function SubPage({ cfg, page, link }: { cfg: StudioConfig; page: string; link: (page?: string) => string }) {
  const titles: Record<string, string> = {
    'gioi-thieu': 'Câu Chuyện & Năng Lực Phát Triển',
    'about': 'Câu Chuyện & Năng Lực Phát Triển',
    'du-an': 'Danh Mục Dự Án Đang Triển Khai',
    'projects': 'Danh Mục Dự Án Đang Triển Khai',
    'vi-tri': 'Vị Trí Vàng & Kết Nối Hạ Tầng',
    'location': 'Vị Trí Vàng & Kết Nối Hạ Tầng',
    'tin-tuc': 'Tin Tức Thị Trường & Báo Cáo',
    'news': 'Tin Tức Thị Trường & Báo Cáo',
    'lien-he': 'Liên Hệ Ban Kinh Doanh & Đặt Lịch',
    'contact': 'Liên Hệ Ban Kinh Doanh & Đặt Lịch',
    'thu-vien': 'Thư Viện Hình Ảnh Thực Tế',
    'gallery': 'Thư Viện Hình Ảnh Thực Tế',
  };

  return (
    <div style={{ background: cfg.paper, color: cfg.ink }} className="min-h-screen font-sans">
      <section className="px-5 py-20 text-white" style={{ background: cfg.primary }}>
        <div className="mx-auto max-w-6xl">
          <a href={link()} className="text-xs font-bold opacity-80 hover:opacity-100">← Quay lại trang chủ</a>
          <span className="mt-8 block text-xs font-black tracking-[.2em]" style={{ color: cfg.accent }}>{cfg.brand}</span>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">{titles[page] || 'Thông Tin Chi Tiết'}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">Trang con được thiết kế chuyên sâu cho từng mẫu, kết nối nội dung CMS và dữ liệu dự án realtime.</p>
        </div>
      </section>
      <ProjectSection cfg={cfg} />
      <LocationSection cfg={cfg} />
      <FeatureSection cfg={cfg} />
      <LeadSection cfg={cfg} />
      <Footer cfg={cfg} />
    </div>
  );
}
