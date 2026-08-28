'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Leaf, Trees, Droplets, Sun, Wind, ChevronRight, Play, Check, MapPin, 
  ArrowRight, Star, Phone, Mail, ChevronDown, Menu, X, Award, Users, 
  Building2, TrendingUp, Heart, Shield, Zap, Coffee, BookOpen, Bike, Search, Filter, Send 
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, YoutubeIcon, TiktokIcon, ZaloIcon, InstagramIcon } from '../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, any> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const t = {
  bg: '#f0fdf4',
  headerBg: '#ffffff',
  primary: '#15803d',
  secondary: '#166534',
  accent: '#86efac',
  accentDark: '#16a34a',
  text: '#1e3a2f',
  muted: '#4b7a55',
  heading: '#052e16',
  surface: '#ffffff',
  dark: '#052e16',
  gold: '#d4a72c',
};

// Expanded detailed list of 8 realistic projects
const PROJECTS = [
  {
    id: 1,
    name: 'Ecopark Grand The Island',
    loc: 'Hưng Yên',
    price: 32.5, // Billion VND
    area: '270m² - 950m²',
    type: 'Biệt thự sinh thái',
    badge: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    cert: 'LEED Platinum',
    desc: 'Biệt thự đảo thượng lưu được bao quanh bởi 100% diện tích mặt nước tự nhiên và hệ sinh thái cây xanh nhiều tầng. Thiết kế kiến trúc tối giản hiện đại nhập khẩu trực tiếp từ các kiến trúc sư Singapore.',
    specs: ['Tiết kiệm 45% năng lượng sạch', 'Hệ thống lọc nước hồ sinh học', '100% vật liệu không phát thải VOC', 'Pin mặt trời công suất 10kWp'],
    beds: 5,
    baths: 6
  },
  {
    id: 2,
    name: 'Forest Valley Residences',
    loc: 'Bình Dương',
    price: 2.8, // Billion VND
    area: '65m² - 110m²',
    type: 'Căn hộ xanh',
    badge: 'Sắp ra mắt',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    cert: 'EDGE Advanced',
    desc: 'Căn hộ sinh thái thông minh với ban công phủ đầy mảng xanh tự nhiên. Tận dụng tối đa gió trời và ánh sáng tự nhiên giúp tối ưu hoá năng lượng tiêu thụ.',
    specs: ['Tiết kiệm 30% nước sinh hoạt', 'Sơn tường phản nhiệt tự nhiên', 'Hệ thống thông gió thu hồi nhiệt HRV', 'Thiết bị vệ sinh đạt chứng nhận WaterSense'],
    beds: 2,
    baths: 2
  },
  {
    id: 3,
    name: 'Green Horizon Villa',
    loc: 'Đà Lạt',
    price: 8.5, // Billion VND
    area: '180m² - 320m²',
    type: 'Villa vườn',
    badge: 'Hot',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    cert: 'LOTUS Gold',
    desc: 'Biệt thự sườn đồi với tầm nhìn rừng thông bạt ngàn. Tích hợp giải pháp năng lượng sạch tự cấp và hệ thống sưởi sàn địa nhiệt bền vững.',
    specs: ['Hệ thống sưởi địa nhiệt sạch', 'Kính hộp Low-E 3 lớp cách nhiệt', 'Sử dụng gỗ rừng trồng bền vững', 'Bể thu gom nước mưa tưới tiêu tự động'],
    beds: 3,
    baths: 4
  },
  {
    id: 4,
    name: 'EcoCity Riverside',
    loc: 'Cần Thơ',
    price: 4.2, // Billion VND
    area: '90m² - 150m²',
    type: 'Nhà phố xanh',
    badge: 'Mới',
    img: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80',
    cert: 'LEED Gold',
    desc: 'Dãy nhà phố thương mại nằm dọc bờ sông Hậu thơ mộng. Thiết kế mái xanh thích ứng đô thị và hành lang đệm ngăn bức xạ nhiệt.',
    specs: ['Thiết kế mái xanh trồng cây cách nhiệt', 'Đèn chiếu sáng LED thông minh 100%', 'Trạm sạc xe điện tại mỗi phân khu', 'Sử dụng gạch không nung thân thiện'],
    beds: 4,
    baths: 4
  },
  {
    id: 5,
    name: 'Bamboo Hills Farmhouse',
    loc: 'Hòa Bình',
    price: 6.8, // Billion VND
    area: '350m² - 600m²',
    type: 'Farmhouse',
    badge: 'Độc quyền',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
    cert: 'LOTUS Platinum',
    desc: 'Khu trang trại nghỉ dưỡng sinh thái được bao quanh bởi rặng tre và đồi chè hữu cơ. Nơi kết hợp hoàn hảo giữa nông nghiệp sạch và nghỉ dưỡng cao cấp.',
    specs: ['Vật liệu xây dựng bằng tre ép chịu lực', 'Bể tự hoại sinh học không mùi', 'Vườn rau hữu cơ khép kín', 'Năng lượng gió tự nhiên nội khu'],
    beds: 4,
    baths: 3
  },
  {
    id: 6,
    name: 'Lotus Garden Land',
    loc: 'Long An',
    price: 1.9, // Billion VND
    area: '100m² - 200m²',
    type: 'Đất vườn',
    badge: 'Còn ít',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    cert: 'EDGE',
    desc: 'Đất vườn sinh thái đã phân lô hoàn chỉnh với hạ tầng điện nước ngầm hiện đại. Có sẵn thiết kế nhà gỗ bungalow xanh và vườn cây ăn trái sum suê.',
    specs: ['Hệ thống tưới nhỏ giọt tiết kiệm nước', 'Đường nội bộ trải cỏ sinh thái', 'Có sẵn vườn cây ăn trái 3 năm tuổi', 'Hệ thống camera giám sát thông minh'],
    beds: 0,
    baths: 0
  },
  {
    id: 7,
    name: 'Eco Oasis Premium',
    loc: 'Đà Nẵng',
    price: 15.6, // Billion VND
    area: '220m² - 450m²',
    type: 'Biệt thự sinh thái',
    badge: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    cert: 'LEED Platinum',
    desc: 'Dự án nghỉ dưỡng sinh thái mặt biển hiếm hoi sở hữu hồ cảnh quan ngầm giúp giảm nhiệt độ khu vực đến 3 độ C. Kiến trúc xanh nhiệt đới phóng khoáng.',
    specs: ['Tiết kiệm 50% điện năng vận hành', 'Hệ thống kính Low-E tràn viền phản nhiệt', 'Hồ bơi lọc muối không hoá chất', 'Quản lý vận hành thông minh bằng AI'],
    beds: 4,
    baths: 5
  },
  {
    id: 8,
    name: 'Green Pine Hill',
    loc: 'Lâm Đồng',
    price: 3.5, // Billion VND
    area: '110m² - 180m²',
    type: 'Villa vườn',
    badge: 'Đang mở bán',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    cert: 'EDGE Advanced',
    desc: 'Biệt thự thông gỗ ven rừng thông Đà Lạt thơ mộng, không khí mát mẻ quanh năm. Thiết kế sinh thái thích ứng biến đổi khí hậu.',
    specs: ['Sử dụng gỗ thông Chile nhập khẩu bền vững', 'Bếp dùng năng lượng mặt trời', 'Cách âm cách nhiệt tuyệt đối', 'Hệ thống thông gió thụ động tự nhiên'],
    beds: 3,
    baths: 3
  }
];

const AMENITIES = [
  { icon: Trees, title: 'Công Viên 15ha', desc: 'Hơn 5,000 cây xanh bản địa phủ kín toàn khu' },
  { icon: Droplets, title: 'Hồ Điều Hòa 5ha', desc: 'Hệ thống hồ nước ngọt tự nhiên, thanh lọc không khí' },
  { icon: Sun, title: 'Năng Lượng Mặt Trời', desc: '100% điện năng từ pin mặt trời trên mái nhà' },
  { icon: Wind, title: 'Không Khí Sạch', desc: 'Chỉ số AQI luôn dưới 50 — mức tuyệt vời' },
  { icon: Bike, title: 'Đường Dạo Bộ 15km', desc: 'Hành lang xanh dài 15km xuyên suốt khu đô thị' },
  { icon: Coffee, title: 'Organic Café & Market', desc: 'Nông sản hữu cơ từ vườn sinh thái nội khu' },
  { icon: BookOpen, title: 'Thư Viện Sinh Thái', desc: 'Không gian đọc sách ngoài trời giữa vườn cây' },
  { icon: Heart, title: 'Y Tế Xanh', desc: 'Phòng khám sức khỏe toàn diện 24/7 trong khu' },
];

// Categorized Gallery
const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=900&q=80', category: 'Cảnh quan', title: 'Hồ sinh học lúc bình minh' },
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80', category: 'Kiến trúc', title: 'Biệt thự đảo Ecopark' },
  { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80', category: 'Tiện ích', title: 'Vườn rau hữu cơ nội khu' },
  { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80', category: 'Kiến trúc', title: 'Căn hộ Forest Valley' },
  { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80', category: 'Kiến trúc', title: 'Villa sân vườn Đà Lạt' },
  { url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=80', category: 'Nội thất', title: 'Phòng khách tràn ánh sáng' },
  { url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80', category: 'Nội thất', title: 'Bungalow gỗ thông Hòa Bình' },
  { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=80', category: 'Tiện ích', title: 'Đường xe đạp ven hồ' },
];

// Expanded list of 6 realistic news items
const NEWS = [
  {
    id: 1,
    title: 'Eco Properties được vinh danh "Khu đô thị xanh tốt nhất Việt Nam 2026"',
    date: '05/07/2026',
    cat: 'Giải thưởng',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    summary: 'Tại lễ trao giải Bất động sản Việt Nam 2026, Eco Properties đã xuất sắc giành giải thưởng danh giá nhờ đóng góp trong phát triển bền vững.',
    content: 'Giải thưởng Bất động sản Việt Nam vinh danh những nhà phát triển hàng đầu. Eco Properties đã vượt qua hàng chục đề cử nhờ dự án Ecopark Grand The Island đạt chứng chỉ LEED Platinum. Đây là minh chứng cho định hướng nhất quán của chúng tôi trong việc kiến tạo cuộc sống xanh chuẩn mực toàn cầu.',
    author: 'Nguyễn Văn Nam',
    views: '1,240 lượt xem'
  },
  {
    id: 2,
    title: 'Xu hướng sống xanh: Người Việt ngày càng chuộng bất động sản sinh thái',
    date: '28/06/2026',
    cat: 'Thị trường',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
    summary: 'Báo cáo thị trường BĐS quý II chỉ ra nhu cầu tìm kiếm căn hộ và biệt thự có không gian cây xanh tăng vọt 150% so với cùng kỳ năm trước.',
    content: 'Theo khảo sát của Hiệp hội Bất động sản, sức khỏe và không gian sống trong lành đã trở thành ưu tiên hàng đầu của người mua nhà hiện đại. Xu hướng này thúc đẩy các chủ đầu tư chuyển dịch sang các tiêu chuẩn công trình xanh như LEED, EDGE, LOTUS để tăng tính cạnh tranh và đáp ứng nhu cầu thị trường.',
    author: 'Trần Thị Thuỷ',
    views: '890 lượt xem'
  },
  {
    id: 3,
    title: 'Bamboo Hills Hòa Bình chính thức ra mắt phân khu Bungalow xanh độc bản',
    date: '20/06/2026',
    cat: 'Dự án mới',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80',
    summary: 'Phân khu Bamboo Hills với phong cách nông trang xanh kết hợp tiện nghi cao cấp chính thức nhận đăng ký giữ chỗ từ hôm nay.',
    content: 'Với mong muốn đưa phong cách sống nông trại nghỉ dưỡng đến gần hơn với người dân thủ đô, Bamboo Hills Hòa Bình ra mắt phân khu mới với 50 căn bungalow gỗ thông minh tự cấp năng lượng. Dự án được bao quanh bởi 5ha chè sạch hữu cơ và suối tự nhiên chảy qua.',
    author: 'Lê Minh Hoàng',
    views: '1,560 lượt xem'
  },
  {
    id: 4,
    title: 'Hội thảo Kiến trúc Xanh: Hành trình hướng tới Net Zero của Eco Properties',
    date: '15/06/2026',
    cat: 'Sự kiện',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    summary: 'Eco Properties phối hợp với Bộ Xây dựng tổ chức hội thảo bàn về các giải pháp giảm phát thải khí nhà kính trong ngành xây dựng.',
    content: 'Tại hội thảo, ban lãnh đạo Eco Properties đã cam kết lộ trình Net Zero Carbon vào năm 2035 thông qua việc ứng dụng 100% pin mặt trời, vật liệu tái chế thân thiện và công nghệ tuần hoàn nước trong tất cả các đại đô thị tiếp theo của tập đoàn.',
    author: 'Phạm Đức Anh',
    views: '730 lượt xem'
  },
  {
    id: 5,
    title: 'Công nghệ lọc nước tuần hoàn sinh học: Điểm sáng tại Ecopark Grand',
    date: '10/06/2026',
    cat: 'Công nghệ',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80',
    summary: 'Hệ thống hồ nước nhân tạo tuần hoàn sinh học tại dự án giúp tự làm sạch nước mà không cần sử dụng bất kỳ hoá chất công nghiệp nào.',
    content: 'Sử dụng các loại thủy sinh vật và đá lọc tự nhiên, hệ thống tuần hoàn sinh học khép kín của Ecopark Grand giúp nước hồ luôn trong vắt và an toàn tuyệt đối. Công nghệ này được chuyển giao từ các chuyên gia hàng đầu Thụy Sĩ, khẳng định đẳng cấp sống xanh.',
    author: 'Vũ Minh Đức',
    views: '1,120 lượt xem'
  },
  {
    id: 6,
    title: 'Cư dân Eco Living hưởng lợi ích kép từ phí vận hành tiết kiệm đến 40%',
    date: '02/06/2026',
    cat: 'Cộng đồng',
    img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&q=80',
    summary: 'Nhờ lắp đặt hệ thống pin năng lượng mặt trời trên mái và thiết bị nước thông minh, hoá đơn dịch vụ của cư dân giảm đáng kể.',
    content: 'Theo thống kê vận hành thực tế tại Forest Valley và Green Horizon, chi phí năng lượng và nước sinh hoạt trung bình mỗi hộ gia đình tiết kiệm tới 40% so với các tòa chung cư thông thường. Đây là lợi thế kinh tế rõ rệt bên cạnh giá trị to lớn về sức khỏe.',
    author: 'Nguyễn Lan Hương',
    views: '950 lượt xem'
  }
];

const FAQS = [
  { q: 'Tiêu chí nào để một dự án được gọi là "bất động sản sinh thái"?', a: 'Chúng tôi áp dụng tiêu chuẩn LEED và EDGE: tối thiểu 65% diện tích cây xanh/mặt nước, 30% tiết kiệm năng lượng, 100% vật liệu thân thiện môi trường và hệ thống xử lý nước mưa.' },
  { q: 'Chỉ số không khí AQI tại khu đô thị đạt mức bao nhiêu?', a: 'Theo dữ liệu đo lường tự động 24/7, AQI trung bình trong khu đô thị luôn dưới 50 (mức Tốt), thấp hơn 60-70% so với nội thành TP.HCM.' },
  { q: 'Chi phí điện, nước hàng tháng có tiết kiệm không?', a: 'Nhờ hệ thống pin mặt trời và thiết bị tiết kiệm nước, cư dân tiết kiệm trung bình 35-40% chi phí điện nước so với chung cư thông thường.' },
  { q: 'Pháp lý các dự án có đảm bảo không?', a: 'Tất cả dự án đều có sổ đỏ/sổ hồng, quy hoạch 1/500 được duyệt, được bảo lãnh bởi ngân hàng uy tín. Chúng tôi cam kết công khai 100% hồ sơ pháp lý.' },
  { q: 'Có thể vay ngân hàng để mua không?', a: 'Có. Chúng tôi hợp tác với VietcomBank, BIDV, Techcombank cho vay lên đến 70% giá trị, lãi suất ưu đãi 8.5%/năm trong 2 năm đầu.' },
  { q: 'Tiềm năng tăng giá bất động sản sinh thái như thế nào?', a: 'Theo nghiên cứu của CBRE, BĐS sinh thái có mức tăng giá trung bình 15-22%/năm, cao hơn 40% so với BĐS thông thường tại cùng vị trí.' },
];

const TIMELINE = [
  { year: '2012', title: 'Thành lập Eco Properties', desc: 'Ra đời với sứ mệnh xây dựng đô thị sống xanh cho người Việt' },
  { year: '2015', title: 'Dự án đầu tiên', desc: 'Ecopark Phase 1 với 500 căn hộ tại Hưng Yên, bán hết trong 3 ngày' },
  { year: '2019', title: 'Mở rộng toàn quốc', desc: 'Phát triển 8 dự án tại 6 tỉnh thành, đạt 5,000 cư dân' },
  { year: '2022', title: 'Chứng nhận LEED Platinum', desc: 'Trở thành chủ đầu tư đầu tiên tại Việt Nam đạt LEED Platinum' },
  { year: '2026', title: 'Tầm nhìn 2030', desc: '20 dự án, 50,000 cư dân sống xanh — thay đổi cách người Việt sống' },
];

const LEADERSHIP = [
  { 
    name: 'Nguyễn Thế Phương', 
    role: 'Chủ tịch HĐQT & Sáng lập', 
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 
    bio: 'Hơn 20 năm kinh nghiệm trong ngành quy hoạch đô thị bền vững. Anh là người định hình triết lý sống xanh của tập đoàn.' 
  },
  { 
    name: 'Lê Hoài Nam', 
    role: 'Tổng Giám Đốc (CEO)', 
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', 
    bio: 'Nguyên Giám đốc dự án khu vực Châu Á của tập đoàn kiến trúc Foster + Partners. Chuyên gia hàng đầu về công trình xanh.' 
  },
  { 
    name: 'Trần Minh Thuỷ', 
    role: 'Giám đốc Thiết kế & Quy hoạch', 
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 
    bio: 'Tốt nghiệp xuất sắc chuyên ngành Quy hoạch Cảnh quan tại ĐH Harvard, sở hữu nhiều giải thưởng kiến trúc xanh quốc tế.' 
  },
  { 
    name: 'Michael Harrison', 
    role: 'Giám đốc Công nghệ & Bền vững', 
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 
    bio: 'Hơn 15 năm làm việc tại Hội đồng Công trình Xanh Hoa Kỳ (USGBC), chịu trách nhiệm áp dụng các tiêu chuẩn LEED vào dự án.' 
  },
];

const CORE_VALUES = [
  { icon: Shield, title: 'Bền Vững (Sustainability)', desc: 'Đặt môi trường và tương lai con cháu lên hàng đầu trong mọi quyết định thiết kế và thi công.' },
  { icon: Zap, title: 'Sáng Tạo Xanh (Innovation)', desc: 'Không ngừng cải tiến, ứng dụng các công nghệ tiết kiệm năng lượng và xử lý tuần hoàn rác thải thông minh.' },
  { icon: Heart, title: 'Tôn Trọng Tự Nhiên (Nature First)', desc: 'Quy hoạch hài hoà, hạn chế san lấp, bảo vệ tối đa thảm thực vật bản địa tại các vùng đất dự án.' },
  { icon: Users, title: 'Cộng Đồng Nhân Văn (Community)', desc: 'Kiến tạo những hoạt động gắn kết cư dân, hướng đến lối sống lành mạnh, gắn bó mật thiết với thiên nhiên.' }
];

export default function EcoTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
  const brandPrimary = dynamicTheme?.primaryColor || '#15803D';
  const brandAccent = dynamicTheme?.accentColor || '#22C55E';
  const t = {
    bg: dynamicTheme?.backgroundColor || '#f0fdf4',
    headerBg: '#ffffff',
    primary: brandPrimary,
    secondary: dynamicTheme?.primaryColor || '#166534',
    accent: brandAccent,
    accentDark: brandPrimary,
    text: dynamicTheme?.textColor || '#1e3a2f',
    muted: '#4b7a55',
    heading: '#052e16',
    surface: '#ffffff',
    dark: '#052e16',
    gold: '#d4a72c',
  };
  // Dynamic Posts Override & Shadowing Variable via globalThis reference
  const activePosts = posts && posts.length > 0
    ? posts.map((p, index) => ({
        id: p.id || String(index),
        title: p.title,
        category: p.category?.name || 'Bất Động Sản',
        cat: p.category?.name || 'Bất Động Sản',
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : '12/07/2026',
        author: p.author?.fullName || 'Chuyên viên BĐS',
        excerpt: p.summary || p.description || 'Tóm tắt bài viết...',
        summary: p.summary || p.description || 'Tóm tắt bài viết...',
        description: p.content || p.description || 'Nội dung chi tiết bài viết...',
        content: p.content || p.description || 'Nội dung chi tiết bài viết...',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        readTime: '5 phút đọc'
      }))
    : ((globalThis as any).__news_ref || []);

  // Shadowing variables
  const NEWS: any = activePosts;

  // Dynamic Projects Override & Shadowing Variable via globalThis reference
  const activeProjects = projects && projects.length > 0
    ? projects.map((p, index) => ({
        id: p.id || String(index),
        name: p.title,
        title: p.title,
        location: p.address || 'Hệ thống',
        price: p.price,
        priceLabel: p.price,
        area: p.area || '—',
        type: p.type || 'Dự Án',
        status: p.status || 'SELLING',
        img: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        tag: index === 0 ? 'EXCLUSIVE' : 'HOT',
        desc: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        description: p.description || p.shortDescription || 'Mô tả dự án đang cập nhật...',
        shortDescription: p.shortDescription || '',
        specs: p.shortDescription || `${p.area} · ${p.type}`,
        priceVal: parseFloat(p.price) || 0,
        loc: p.address || 'Hệ thống',
        size: parseFloat(p.area) || 0,
        bedrooms: 3,
        bathrooms: 2,
        features: [p.type],
        style: 'Modern',
        delivery: '2026',
        scale: '1 block'
      }))
    : ((globalThis as any).__eco_properties_ref || []);

  // Shadowing variables
  const ECO_PROPERTIES: any = activeProjects;

  const [currentPage, setCurrentPageState] = useState(initialPage);

  useEffect(() => {
    setCurrentPageState(initialPage);
  }, [initialPage]);
  const setCurrentPage = (p: string) => {
    if (typeof setSelectedProject === "function") setSelectedProject(null);
    if (typeof setSelectedArticle === "function") setSelectedArticle(null);

    setCurrentPageState(p);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', p === 'home' ? window.location.pathname : '?page=' + p);
    }
  };
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Project filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả'); // Standard Type Pills
  const [filterLocation, setFilterLocation] = useState('Tất cả');
  const [filterPrice, setFilterPrice] = useState('Tất cả');
  const [filterCert, setFilterCert] = useState('Tất cả');
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Gallery interactive states
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // News interactive states
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [newsCategory, setNewsCategory] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState<typeof NEWS[0] | null>(null);

  // Contact form submission states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Consultation form state
  const [consultPhone, setConsultPhone] = useState('');
  const [consultName, setConsultName] = useState('');
  const [consultInterest, setConsultInterest] = useState('Dự án quan tâm');
  const [consultMessage, setConsultMessage] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // About page tab
  const [aboutActiveTab, setAboutActiveTab] = useState('values'); // 'values' | 'timeline' | 'leadership'
  
  // Expanded leader bio state
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null);

  const isMobile = viewport === 'mobile';
  const isSmall = isMobile || viewport === 'tablet';

  const getPageHref = (page: string) => page === 'home' ? '/' : '?page=' + page;

  const navLinks = [
    { label: 'Trang chủ', page: 'home' },
    { label: 'Dự án', page: 'projects' },
    { label: 'Về chúng tôi', page: 'about' },
    { label: 'Thư viện', page: 'gallery' },
    { label: 'Tin tức', page: 'news' },
    { label: 'Liên hệ', page: 'contact' },
  ];

  // Helper to reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('Tất cả');
    setFilterLocation('Tất cả');
    setFilterPrice('Tất cả');
    setFilterCert('Tất cả');
  };

  // Reactive Project filtering logic
  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = activeFilter === 'Tất cả' || p.type === activeFilter;
    const matchesLocation = filterLocation === 'Tất cả' || p.loc === filterLocation;
    const matchesCert = filterCert === 'Tất cả' || p.cert === filterCert;
    
    let matchesPrice = true;
    if (filterPrice === 'Dưới 2 tỷ') {
      matchesPrice = p.price < 2.0;
    } else if (filterPrice === '2 - 5 tỷ') {
      matchesPrice = p.price >= 2.0 && p.price <= 5.0;
    } else if (filterPrice === '5 - 10 tỷ') {
      matchesPrice = p.price >= 5.0 && p.price <= 10.0;
    } else if (filterPrice === 'Trên 10 tỷ') {
      matchesPrice = p.price > 10.0;
    }

    return matchesSearch && matchesType && matchesLocation && matchesCert && matchesPrice;
  });

  // Reactive News filtering logic
  const filteredNews = NEWS.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchNewsQuery.toLowerCase());
    
    const matchesCategory = newsCategory === 'Tất cả' || n.cat === newsCategory;
    return matchesSearch && matchesCategory;
  });

  // Reactive Gallery filtering logic
  const filteredGallery = selectedGalleryTab === 'Tất cả'
    ? GALLERY
    : GALLERY.filter(g => g.category === selectedGalleryTab);

  const renderNav = () => (
    <nav className="sticky top-0 z-40 shadow-sm transition-all duration-300" style={{ backgroundColor: t.headerBg }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8 flex justify-between items-center h-20`}>
        <button onClick={() => { setCurrentPage('home'); resetFilters(); }} className="flex items-center gap-2.5 group text-left">
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0" style={{ backgroundColor: t.primary }}>
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block uppercase" style={{ color: t.heading }}>
              {company?.name || template.name || 'ECO LIVING'}
            </span>
            {company?.slogan && (
              <span className="text-[10px] tracking-wider uppercase font-semibold block opacity-75" style={{ color: t.text }}>
                {company.slogan}
              </span>
            )}
          </div>
        </button>

        {!isSmall ? (
          <div className="flex items-center gap-8 text-sm font-semibold">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => setCurrentPage(link.page)}
                className="transition-colors hover:opacity-70"
                style={{ color: currentPage === link.page ? t.primary : t.muted }}>
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="px-6 py-2.5 text-white rounded-full font-bold shadow-md transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: t.primary }}>
              Tư vấn miễn phí
            </button>
          </div>
        ) : (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: t.heading }}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>
      {isSmall && mobileMenuOpen && (
        <div className="border-t py-4 px-4" style={{ borderColor: t.accent, backgroundColor: t.surface }}>
          {navLinks.map(link => (
            <button key={link.page} onClick={() => { setCurrentPage(link.page); setMobileMenuOpen(false); }}
              className="block w-full text-left py-3 font-semibold border-b last:border-0 transition-colors"
              style={{ color: currentPage === link.page ? t.primary : t.text, borderColor: '#e5e7eb' }}>
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} 
            className="mt-4 w-full py-3 text-white rounded-full font-bold" 
            style={{ backgroundColor: t.primary }}>
            Tư vấn miễn phí
          </button>
        </div>
      )}
    </nav>
  );

  const renderHome = () => (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: t.dark }}>
        <div className="absolute inset-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1800&q=85" alt="Eco Living Hero" className="w-full h-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${t.dark}F0 0%, ${t.primary}99 50%, ${t.dark}CC 100%)` }} />
        </div>
        <div className={`relative z-10 w-full ${MAX_W} mx-auto px-4 md:px-8 py-32`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border"
              style={{ backgroundColor: `${t.accentDark}33`, borderColor: t.accentDark, color: t.accent }}>
              <Leaf className="w-4 h-4" /> Khu Đô Thị Sinh Thái Tiêu Chuẩn LEED Platinum
            </div>
            <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: isSmall ? '3rem' : '5.5rem' }}>
              Sống Xanh —<br />Sống Thật
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-xl opacity-90" style={{ color: t.accent }}>
              Không phải chỉ là nhà. Đây là nơi bạn thức giấc mỗi sáng giữa 15ha công viên nguyên sinh, hít thở không khí trong lành AQI &lt;50 và sống chậm lại trong nhịp điệu thiên nhiên.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <button 
                onClick={() => setCurrentPage('projects')} 
                className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 shadow-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: t.primary }}>
                Khám Phá Dự Án <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-6 py-4 rounded-full font-bold border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
                Xem Video Dự Án
              </a>
            </div>
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: '100ha', label: 'Diện tích cây xanh' },
                { num: '70%', label: 'Cảnh quan & mặt nước' },
                { num: '<50', label: 'Chỉ số AQI' },
                { num: '15km', label: 'Đường dạo bộ' },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl border text-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <div className="text-3xl font-black text-white mb-1">{stat.num}</div>
                  <div className="text-xs font-semibold opacity-70 text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.1,188.44,101.4,233.56,90.62,279.7,73.5,321.39,56.44Z" fill={t.bg} />
          </svg>
        </div>
      </section>

      {/* QUICK SEARCH WITH REDIRECT FILTER BINDINGS */}
      <section className="py-6" style={{ backgroundColor: t.bg }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="p-6 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4" style={{ backgroundColor: t.surface }}>
            <select 
              className="border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none bg-transparent text-slate-800" 
              style={{ borderColor: t.accent }}
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="Tất cả">Loại BĐS xanh (Tất cả)</option>
              <option value="Biệt thự sinh thái">Biệt thự sinh thái</option>
              <option value="Căn hộ xanh">Căn hộ xanh</option>
              <option value="Villa vườn">Villa vườn</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Nhà phố xanh">Nhà phố xanh</option>
              <option value="Đất vườn">Đất vườn</option>
            </select>
            <select 
              className="border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none bg-transparent text-slate-800" 
              style={{ borderColor: t.accent }}
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="Tất cả">Khu vực (Tất cả)</option>
              <option value="Hưng Yên">Hưng Yên</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Đà Lạt">Đà Lạt</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Hòa Bình">Hòa Bình</option>
              <option value="Long An">Long An</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
            </select>
            <select 
              className="border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none bg-transparent text-slate-800" 
              style={{ borderColor: t.accent }}
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <option value="Tất cả">Ngân sách (Tất cả)</option>
              <option value="Dưới 2 tỷ">Dưới 2 tỷ</option>
              <option value="2 - 5 tỷ">2 - 5 tỷ</option>
              <option value="5 - 10 tỷ">5 - 10 tỷ</option>
              <option value="Trên 10 tỷ">Trên 10 tỷ</option>
            </select>
            <button 
              onClick={() => setCurrentPage('projects')} 
              className="py-3 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: t.primary }}>
              <MapPin className="w-4 h-4" /> Tìm kiếm ngay
            </button>
          </div>
        </div>
      </section>

      {/* ECO METRICS */}
      <section className="py-20" style={{ backgroundColor: t.bg }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '100ha', label: 'Cây xanh & công viên', icon: Trees, color: t.primary },
              { num: '50+', label: 'Loài cây bản địa', icon: Leaf, color: '#0891b2' },
              { num: '98%', label: 'Cư dân hài lòng', icon: Heart, color: '#dc2626' },
              { num: '12', label: 'Năm kinh nghiệm', icon: Award, color: t.gold },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1" style={{ backgroundColor: t.surface }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <div className="text-4xl font-black mb-2" style={{ color: t.heading }}>{item.num}</div>
                <div className="text-sm font-medium" style={{ color: t.muted }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20" style={{ backgroundColor: t.surface }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>🌿 Dự án nổi bật</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: t.heading }}>Những Không Gian<br />Xanh Tuyệt Vời</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Tất cả', 'Biệt thự sinh thái', 'Căn hộ xanh', 'Villa vườn'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-all"
                  style={{ backgroundColor: activeFilter === f ? t.primary : t.bg, color: activeFilter === f ? 'white' : t.muted }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.filter(p => activeFilter === 'Tất cả' || p.type === activeFilter).slice(0, 6).map((p, i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between" style={{ backgroundColor: t.surface }}>
                <div>
                  <div className="relative overflow-hidden h-56">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-black text-white" style={{ backgroundColor: t.primary }}>{p.badge}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: t.heading }}>{p.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black mb-1" style={{ color: t.heading }}>{p.name}</h3>
                    <div className="flex items-center gap-1 text-sm mb-3" style={{ color: t.muted }}>
                      <MapPin className="w-4 h-4" /> {p.loc}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">{p.desc}</p>
                    <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: t.accent }}>
                      <div>
                        <div className="text-xs font-semibold mb-0.5" style={{ color: t.muted }}>Diện tích</div>
                        <div className="font-bold text-sm" style={{ color: t.text }}>{p.area}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold mb-0.5" style={{ color: t.muted }}>Giá từ</div>
                        <div className="font-black text-lg" style={{ color: t.primary }}>{p.price} tỷ</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button 
                    onClick={() => setSelectedProject(p)} 
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90" 
                    style={{ backgroundColor: `${t.primary}15`, color: t.primary }}>
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => { resetFilters(); setCurrentPage('projects'); }} className="px-10 py-4 rounded-full font-bold border-2 transition-all hover:bg-opacity-10" style={{ borderColor: t.primary, color: t.primary }}>
              Xem tất cả {PROJECTS.length} dự án <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section className="py-24" style={{ backgroundColor: t.bg }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: t.primary }}>🌱 Về chúng tôi</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ color: t.heading }}>Chúng Tôi Tin<br />Vào Cách Sống Khác</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: t.muted }}>
                Eco Properties ra đời năm 2012 từ một niềm tin đơn giản: con người xứng đáng được sống trong môi trường trong lành, không phải đánh đổi thiên nhiên để đổi lấy tiện nghi đô thị.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: t.muted }}>
                14 năm qua, chúng tôi đã xây dựng hơn 15 khu đô thị sinh thái trên toàn quốc, là ngôi nhà cho hơn 30,000 cư dân đang tận hưởng cuộc sống xanh đích thực.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[{ num: '15+', label: 'Dự án' }, { num: '30K+', label: 'Cư dân' }, { num: '12', label: 'Năm KN' }].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black mb-1" style={{ color: t.primary }}>{s.num}</div>
                    <div className="text-sm" style={{ color: t.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('about')} className="px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: t.primary }}>
                Câu chuyện của chúng tôi <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85" alt="Eco Living" className="w-full h-96 object-cover rounded-3xl shadow-2xl" loading="lazy" />
              <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl" style={{ backgroundColor: t.surface }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: t.primary }}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-sm" style={{ color: t.heading }}>LEED Platinum 2026</div>
                    <div className="text-xs" style={{ color: t.muted }}>Chứng nhận quốc tế cao nhất</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-24" style={{ backgroundColor: t.dark }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-center mb-16">
            <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.accent }}>Tiện ích đặc biệt</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Hệ Sinh Thái Tiện Ích<br />Xanh Đỉnh Cao</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${t.accent}CC` }}>
              Không chỉ có cây xanh — đây là cả một hệ sinh thái sống đầy đủ, tiện nghi và bền vững
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES.map((a, i) => (
              <div key={i} className="p-6 rounded-2xl border transition-all hover:bg-white/10 group" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: `${t.primary}40` }}>
                  <a.icon className="w-7 h-7" style={{ color: t.accent }} />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${t.accent}99` }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW WITH LIGHTBOX TRIGGER */}
      <section className="py-24" style={{ backgroundColor: t.bg }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>Thư viện ảnh</div>
              <h2 className="text-4xl md:text-5xl font-black" style={{ color: t.heading }}>Cảm Hứng Thiên Nhiên</h2>
            </div>
            <button onClick={() => setCurrentPage('gallery')} className="text-sm font-bold flex items-center gap-2 transition-colors hover:opacity-70" style={{ color: t.primary }}>
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.slice(0, 4).map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedGalleryImg(img.url)} 
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2' : ''}`} 
                style={{ aspectRatio: i === 0 ? '1' : '1' }}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center" style={{ backgroundColor: 'rgba(5,46,22,0.6)' }}>
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">{img.category}</span>
                  <span className="text-white font-black text-sm">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT/CONSULT CTA WITH SUCCESS SCREEN */}
      <section className="py-24" style={{ backgroundColor: t.dark }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: t.accent }}>Liên hệ ngay</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Bắt Đầu Hành Trình<br />Sống Xanh Cùng Chúng Tôi</h2>
              <p className="text-lg mb-8" style={{ color: `${t.accent}CC` }}>
                Để lại thông tin, chuyên viên tư vấn sẽ liên hệ trong vòng 30 phút và tư vấn miễn phí về dự án phù hợp nhất với bạn.
              </p>
              <div className="flex flex-col gap-4">
                <a href={`tel:${(company?.phone || '0919006030').replace(/\s/g, '')}`} className="flex items-center gap-3 hover:underline transition-colors" style={{ color: t.accent }}>
                  <Phone className="w-5 h-5 shrink-0" /> <span className="whitespace-nowrap">{company?.phone || '0919 006 030 (Hotline CSKH)'}</span>
                </a>
                <a href={`mailto:${company?.email || 'hello@ecoliving.vn'}`} className="flex items-center gap-3 hover:underline transition-colors" style={{ color: t.accent }}>
                  <Mail className="w-5 h-5 shrink-0" /> <span>{company?.email || 'hello@ecoliving.vn'}</span>
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(company?.address || 'Tầng 12, Vinhomes Center, 208 Giảng Võ, Hà Nội')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline transition-colors" style={{ color: t.accent }}>
                  <MapPin className="w-5 h-5 shrink-0" /> <span>{company?.address || 'Tầng 12, Vinhomes Center, 208 Giảng Võ, Hà Nội'}</span>
                </a>
              </div>
            </div>
            
            <div className="p-8 rounded-3xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {consultSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 text-white animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Đăng Ký Thành Công!</h3>
                  <p className="text-emerald-200 text-sm mb-6">Chúng tôi sẽ gọi lại cho bạn qua số điện thoại <strong>{consultPhone}</strong> trong 30 phút nữa.</p>
                  <button 
                    type="button"
                    onClick={() => {
                      setConsultSubmitted(false);
                      setConsultName('');
                      setConsultPhone('');
                      setConsultMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white text-emerald-800 hover:bg-emerald-50 transition-colors"
                  >
                    Gửi yêu cầu mới
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const phoneClean = consultPhone.replace(/\s/g, '');
                  if (!phoneClean || !/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
                    alert('Số điện thoại phải từ 10-11 số (VD: 0919006030 hoặc +84919006030).');
                    return;
                  }
                  if (typeof (globalThis as any).submitContactForm === 'function') {
                    (globalThis as any).submitContactForm({
                      fullName: consultName,
                      phone: phoneClean,
                      message: `${consultInterest ? `Quan tâm: ${consultInterest}. ` : ''}${consultMessage || ''}`.trim(),
                      source: 'website_contact_form',
                    }).catch(() => {});
                  }
                  if (consultName.trim()) {
                    setConsultSubmitted(true);
                  }
                }}>
                  <h3 className="text-xl font-black text-white mb-6">Đăng ký tư vấn miễn phí</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Họ và tên *" 
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                    />
                    <input 
                      type="tel" 
                      placeholder="Số điện thoại *" 
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                    />
                    <select 
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none text-slate-800" 
                      value={consultInterest}
                      onChange={(e) => setConsultInterest(e.target.value)}
                    >
                      <option value="Dự án quan tâm">Chọn dự án quan tâm</option>
                      {PROJECTS.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    <textarea 
                      placeholder="Yêu cầu thêm (VD: mức giá muốn mua, hướng nhà...)" 
                      rows={3} 
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" 
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                    />
                    <button type="submit" className="w-full py-4 rounded-xl font-black text-white transition-all hover:opacity-90 text-lg" style={{ backgroundColor: t.primary }}>
                      Gửi Đăng Ký →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );

  const renderProjects = () => (
    <main className="py-24 min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>Khám phá</div>
          <h1 className="text-5xl font-black mb-4" style={{ color: t.heading }}>Tất Cả Dự Án Xanh</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.muted }}>Từ căn hộ sinh thái giữa lòng đô thị đến biệt thự đảo giữa sông nước</p>
        </div>

        {/* Dynamic Filters Panel */}
        <div className="p-6 rounded-3xl bg-white shadow-md mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên dự án, khu vực..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-green-600 bg-transparent text-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto flex-1 max-w-2xl">
              <select 
                className="border rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold text-slate-700 bg-transparent"
                value={filterLocation} 
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="Tất cả">Tất cả khu vực</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Đà Lạt">Đà Lạt</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Long An">Long An</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
              </select>

              <select 
                className="border rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold text-slate-700 bg-transparent"
                value={filterPrice} 
                onChange={(e) => setFilterPrice(e.target.value)}
              >
                <option value="Tất cả">Tất cả mức giá</option>
                <option value="Dưới 2 tỷ">Dưới 2 tỷ</option>
                <option value="2 - 5 tỷ">2 - 5 tỷ</option>
                <option value="5 - 10 tỷ">5 - 10 tỷ</option>
                <option value="Trên 10 tỷ">Trên 10 tỷ</option>
              </select>

              <select 
                className="border rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold text-slate-700 bg-transparent"
                value={filterCert} 
                onChange={(e) => setFilterCert(e.target.value)}
              >
                <option value="Tất cả">Tất cả chứng nhận</option>
                <option value="LEED Platinum">LEED Platinum</option>
                <option value="LEED Gold">LEED Gold</option>
                <option value="EDGE">EDGE</option>
                <option value="EDGE Advanced">EDGE Advanced</option>
                <option value="LOTUS Platinum">LOTUS Platinum</option>
                <option value="LOTUS Gold">LOTUS Gold</option>
              </select>
            </div>
          </div>

          {/* Type Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 items-center">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Loại BĐS:</span>
            {['Tất cả', 'Biệt thự sinh thái', 'Căn hộ xanh', 'Villa vườn', 'Farmhouse', 'Nhà phố xanh', 'Đất vườn'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ backgroundColor: activeFilter === f ? t.primary : t.bg, color: activeFilter === f ? 'white' : t.muted, border: `1px solid ${activeFilter === f ? t.primary : t.accent}` }}>
                {f}
              </button>
            ))}

            {(searchQuery || activeFilter !== 'Tất cả' || filterLocation !== 'Tất cả' || filterPrice !== 'Tất cả' || filterCert !== 'Tất cả') && (
              <button onClick={resetFilters} className="text-xs text-red-600 hover:text-red-800 font-bold ml-auto flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-sm font-bold text-slate-500 mb-6">
          Tìm thấy {filteredProjects.length} dự án xanh phù hợp.
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white flex flex-col justify-between" style={{ backgroundColor: t.surface }}>
                <div>
                  <div className="relative overflow-hidden h-56">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black text-white" style={{ backgroundColor: t.primary }}>{p.badge}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-slate-900/80 flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-emerald-400" /> {p.cert}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black mb-1" style={{ color: t.heading }}>{p.name}</h3>
                    <div className="flex items-center gap-1 text-sm mb-2" style={{ color: t.muted }}><MapPin className="w-4 h-4" />{p.loc}</div>
                    <div className="text-xs text-slate-500 line-clamp-3 mb-4">{p.desc}</div>
                    <div className="text-xs font-bold text-slate-400 mb-3">{p.type} • {p.area}</div>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 flex justify-between items-center mt-auto">
                  <div className="font-black text-xl" style={{ color: t.primary }}>{p.price} tỷ</div>
                  <button 
                    onClick={() => setSelectedProject(p)} 
                    className="px-5 py-2 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90" 
                    style={{ backgroundColor: t.primary }}
                  >
                    Xem ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <Trees className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-700 mb-2">Không Tìm Thấy Dự Án Phù Hợp</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Vui lòng thử thay đổi từ khoá tìm kiếm hoặc reset lại các dropdown lọc ở trên.</p>
            <button onClick={resetFilters} className="px-6 py-2.5 rounded-full text-white font-bold text-sm" style={{ backgroundColor: t.primary }}>Reset bộ lọc</button>
          </div>
        )}
      </div>
    </main>
  );

  const renderAbout = () => (
    <main className="min-h-screen" style={{ backgroundColor: t.bg }}>
      <section className="py-32 text-center" style={{ backgroundColor: t.dark }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: t.accent }}>Về chúng tôi</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Eco Properties<br />Vietnam</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: `${t.accent}CC` }}>
            14 năm kiến tạo đô thị sinh thái — biến giấc mơ sống xanh thành hiện thực cho 30,000 gia đình Việt
          </p>
        </div>
      </section>

      {/* Sứ Mệnh & Tầm Nhìn Core values layout */}
      <section className="py-16" style={{ backgroundColor: t.surface }}>
        <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
          {/* Interactive tabs navigation */}
          <div className="flex justify-center border-b border-slate-200 mb-16 overflow-x-auto">
            <div className="flex gap-8">
              <button 
                onClick={() => setAboutActiveTab('values')}
                className="pb-4 text-base font-black border-b-2 transition-all whitespace-nowrap"
                style={{ 
                  color: aboutActiveTab === 'values' ? t.primary : t.muted, 
                  borderColor: aboutActiveTab === 'values' ? t.primary : 'transparent' 
                }}
              >
                Sứ mệnh & Giá trị
              </button>
              <button 
                onClick={() => setAboutActiveTab('timeline')}
                className="pb-4 text-base font-black border-b-2 transition-all whitespace-nowrap"
                style={{ 
                  color: aboutActiveTab === 'timeline' ? t.primary : t.muted, 
                  borderColor: aboutActiveTab === 'timeline' ? t.primary : 'transparent' 
                }}
              >
                Lịch sử phát triển
              </button>
              <button 
                onClick={() => setAboutActiveTab('leadership')}
                className="pb-4 text-base font-black border-b-2 transition-all whitespace-nowrap"
                style={{ 
                  color: aboutActiveTab === 'leadership' ? t.primary : t.muted, 
                  borderColor: aboutActiveTab === 'leadership' ? t.primary : 'transparent' 
                }}
              >
                Ban lãnh đạo
              </button>
            </div>
          </div>

          {/* Tab 1: values & Core value list */}
          {aboutActiveTab === 'values' && (
            <div className="space-y-16 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-black mb-6" style={{ color: t.heading }}>Sứ Mệnh & Tầm Nhìn</h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: t.muted }}>
                    Sứ mệnh: Xây dựng những không gian sống xanh, lành mạnh và bền vững để người Việt được sống chất lượng cao mà không phải hy sinh thiên nhiên.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: t.muted }}>
                    Tầm nhìn 2030: Trở thành nhà phát triển BĐS sinh thái hàng đầu Đông Nam Á, với 20 khu đô thị xanh đạt chuẩn quốc tế, phục vụ 100,000 cư dân và đạt Net Zero Carbon vào năm 2035.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '15+', label: 'Dự án', icon: Building2 },
                    { num: '30K', label: 'Cư dân', icon: Users },
                    { num: '14', label: 'Năm hoạt động', icon: Award },
                    { num: '98%', label: 'Hài lòng', icon: Heart },
                  ].map((s, i) => (
                    <div key={i} className="p-6 rounded-2xl text-center shadow-sm" style={{ backgroundColor: t.bg }}>
                      <s.icon className="w-8 h-8 mx-auto mb-3" style={{ color: t.primary }} />
                      <div className="text-3xl font-black mb-1" style={{ color: t.heading }}>{s.num}</div>
                      <div className="text-sm font-semibold" style={{ color: t.muted }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black text-center mb-10" style={{ color: t.heading }}>Giá Trị Cốt Lõi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CORE_VALUES.map((val, i) => (
                    <div key={i} className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: t.surface, borderColor: t.accent }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${t.primary}15` }}>
                        <val.icon className="w-6 h-6" style={{ color: t.primary }} />
                      </div>
                      <h4 className="font-black text-lg mb-2" style={{ color: t.heading }}>{val.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Timeline Milestones */}
          {aboutActiveTab === 'timeline' && (
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <h2 className="text-3xl font-black text-center mb-12" style={{ color: t.heading }}>Hành Trình Kiến Tạo Công Trình Xanh</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: t.accent }} />
                <div className="space-y-12">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-8 group relative">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 font-black text-sm text-white" style={{ backgroundColor: t.primary }}>
                        {item.year}
                      </div>
                      <div className="bg-emerald-50/50 p-6 rounded-2xl border border-slate-100 flex-1 hover:bg-emerald-50 transition-colors">
                        <div className="text-sm font-black mb-1" style={{ color: t.primary }}>Năm {item.year}</div>
                        <h4 className="text-xl font-black mb-2" style={{ color: t.heading }}>{item.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Leadership List */}
          {aboutActiveTab === 'leadership' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-black text-center mb-4" style={{ color: t.heading }}>Đội Ngũ Sáng Lập & Điều Hành</h2>
              <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">Những bộ óc tiên phong mang triết lý kiến trúc bền vững và chuẩn mực quốc tế về Việt Nam.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {LEADERSHIP.map((leader, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-64 overflow-hidden relative">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-lg text-slate-800 mb-1">{leader.name}</h4>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">{leader.role}</p>
                      
                      <div className="text-sm text-slate-500">
                        {expandedLeader === leader.name ? (
                          <div className="space-y-3">
                            <p>{leader.bio}</p>
                            <button onClick={() => setExpandedLeader(null)} className="text-xs font-bold text-red-600 hover:underline">Ẩn bớt</button>
                          </div>
                        ) : (
                          <div>
                            <p className="line-clamp-2">{leader.bio}</p>
                            <button onClick={() => setExpandedLeader(leader.name)} className="text-xs font-bold text-emerald-600 hover:underline mt-2 block">Đọc thêm tiểu sử →</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );

  const renderGallery = () => (
    <main className="py-24 min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>Thư viện ảnh</div>
          <h1 className="text-5xl font-black mb-4" style={{ color: t.heading }}>Cảm Hứng Thiên Nhiên</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.muted }}>Hình ảnh chân thực về cảnh quan và quy hoạch sống xanh tại các dự án.</p>
        </div>

        {/* Gallery Interactive Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {['Tất cả', 'Kiến trúc', 'Cảnh quan', 'Tiện ích', 'Nội thất'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setSelectedGalleryTab(tab)} 
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={{ 
                backgroundColor: selectedGalleryTab === tab ? t.primary : t.surface, 
                color: selectedGalleryTab === tab ? 'white' : t.muted, 
                border: `1px solid ${selectedGalleryTab === tab ? t.primary : t.accent}` 
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedGalleryImg(img.url)} 
              className="group aspect-square overflow-hidden rounded-2xl cursor-pointer relative shadow-sm hover:shadow-lg transition-all"
            >
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-0.5">{img.category}</span>
                <span className="text-white font-bold text-sm">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
  const renderNews = () => (
    <main className="py-24 min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>Blog & Tin tức</div>
          <h1 className="text-5xl font-black mb-4" style={{ color: t.heading }}>Câu Chuyện Xanh</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.muted }}>Cập nhật những giải pháp, tin tức công nghệ xanh và phân tích thị trường mới nhất</p>
        </div>

        {/* Search & Filter News */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 shadow-md mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none bg-transparent text-slate-800"
              style={{ borderColor: t.accent }}
              value={searchNewsQuery}
              onChange={(e) => setSearchNewsQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto">
            {['Tất cả', 'Thị trường', 'Dự án mới', 'Giải thưởng', 'Sự kiện', 'Công nghệ', 'Cộng đồng'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setNewsCategory(cat)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ 
                  backgroundColor: newsCategory === cat ? t.primary : t.bg, 
                  color: newsCategory === cat ? 'white' : t.text 
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((n, i) => (
              <div 
                key={i} 
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-white cursor-pointer flex flex-col justify-between border border-slate-100"
                onClick={() => setSelectedArticle(n)}
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-black text-white bg-slate-900/80">
                        {n.cat}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-slate-400 font-bold mb-2 flex justify-between">
                      <span>{n.date}</span>
                      <span>{n.views}</span>
                    </div>
                    <h3 className="text-base font-black mb-3 leading-snug text-slate-900 line-clamp-2 hover:opacity-80 transition-opacity">{n.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-3">{n.summary}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold" style={{ color: t.primary }}>
                  <span>Tác giả: {n.author}</span>
                  <span>Đọc tiếp →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-700 mb-2">Không Tìm Thấy Tin Tức Phù Hợp</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">Vui lòng thử gõ từ khoá khác hoặc click vào nút &ldquo;Tất cả&rdquo; danh mục ở trên.</p>
            <button onClick={() => { setSearchNewsQuery(''); setNewsCategory('Tất cả'); }} className="px-6 py-2.5 rounded-full text-white font-bold text-sm" style={{ backgroundColor: t.primary }}>Tất cả bài viết</button>
          </div>
        )}
      </div>
    </main>
  );

  const renderContact = () => (
    <main className="py-24 min-h-screen" style={{ backgroundColor: t.bg }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8`}>
        <div className="text-center mb-16">
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: t.primary }}>Liên hệ</div>
          <h1 className="text-5xl font-black mb-4" style={{ color: t.heading }}>Gặp Gỡ Chúng Tôi</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.muted }}>Đội ngũ tư vấn viên am hiểu quy hoạch công trình xanh sẵn sàng giải đáp thắc mắc của bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-6" style={{ color: t.heading }}>Hệ Thống Văn Phòng</h2>
            {[
              { icon: Phone, label: 'Hotline Chăm sóc khách hàng', val: '1800 1234 (Miễn phí 24/7)' },
              { icon: Mail, label: 'Email Hỗ trợ pháp lý & thông tin', val: company?.email || 'hello@ecoliving.vn' },
              { icon: MapPin, label: 'Văn phòng giao dịch Hà Nội', val: 'Tầng 12, Vinhomes Center, 208 Giảng Võ, Ba Đình' },
              { icon: MapPin, label: 'Văn phòng giao dịch TP. Hồ Chí Minh', val: 'Tầng 8, Saigon Center, 65 Lê Lợi, Quận 1' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-slate-50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${t.primary}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: t.primary }} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: t.muted }}>{item.label}</div>
                  <div className="font-bold text-slate-800 text-sm md:text-base">{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form and success box */}
          <div className="p-8 rounded-3xl bg-white shadow-md border border-slate-100">
            {contactSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-md animate-bounce">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Gửi Tin Nhắn Thành Công!</h3>
                <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                  Chào <strong>{contactName}</strong>, chúng tôi đã nhận được thông tin liên hệ của bạn qua email <strong>{contactEmail}</strong>. Chuyên viên sẽ gọi điện tư vấn trực tiếp cho bạn qua số <strong>{contactPhone}</strong> trong vòng 30 phút.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactPhone('');
                      setContactMessage('');
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-sm border hover:bg-slate-50 transition-colors"
                    style={{ borderColor: t.primary, color: t.primary }}
                  >
                    Gửi tin nhắn khác
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setCurrentPage('home');
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity shadow-md"
                    style={{ backgroundColor: t.primary }}
                  >
                    Trở về trang chủ
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (contactName.trim() && contactEmail.trim() && contactPhone.trim()) {
                  setContactSubmitted(true);
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Họ và tên của bạn (*)</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nguyễn Văn A" 
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent text-slate-800" 
                    style={{ borderColor: t.accent }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Email (*)</label>
                    <input 
                      type="email" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@example.com" 
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent text-slate-800" 
                      style={{ borderColor: t.accent }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Số điện thoại (*)</label>
                    <input 
                      type="tel" 
                      required 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="0912 345 678" 
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none border bg-transparent text-slate-800" 
                      style={{ borderColor: t.accent }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">Nội dung tin nhắn</label>
                  <textarea 
                    rows={4} 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Bạn quan tâm đến dự án nào của chúng tôi? Hãy để lại yêu cầu..." 
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none bg-transparent text-slate-800" 
                    style={{ borderColor: t.accent }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
                  style={{ backgroundColor: t.primary }}
                >
                  <Send className="w-4 h-4" /> Gửi Thông Tin Liên Hệ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );

  const renderFooter = () => (
    <footer style={{ backgroundColor: t.dark, color: 'rgba(255,255,255,0.7)' }}>
      <div className={`${MAX_W} mx-auto px-4 md:px-8 py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6" style={{ color: t.accent }} />
              <span className="text-xl font-black text-white">{template.name || 'ECO LIVING'}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tiên phong phát triển bất động sản sinh thái bền vững tại Việt Nam.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={company?.socialLinks?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-600 text-white transition-all shadow-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://zalo.me/${company?.phone || '0919006030'}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Zalo Chat"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#0068FF] text-white transition-all shadow-xs p-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <ZaloIcon className="w-full h-full" />
              </a>
              <a
                href={company?.socialLinks?.youtube || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-600 text-white transition-all shadow-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={company?.socialLinks?.tiktok || "https://tiktok.com"}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-800 text-white transition-all shadow-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a
                href={company?.socialLinks?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-pink-600 text-white transition-all shadow-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          {[
            { title: 'Dự án', links: ['Ecopark Grand', 'Forest Valley', 'Green Horizon', 'Bamboo Hills', 'Lotus Garden'] },
            { title: 'Thông tin', links: ['Về chúng tôi', 'Tin tức', 'Báo cáo', 'Tuyển dụng', 'Đối tác'] },
            { title: 'Pháp lý', links: ['Điều khoản sử dụng', 'Bảo mật', 'Cookie', 'Khiếu nại'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-black text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l, j) => (
                  <li key={j}><button onClick={() => { resetFilters(); setCurrentPage('projects'); }} className="text-sm hover:text-white transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 {template.name || 'Eco Living Vietnam'}. All rights reserved.</div>
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>🌿 Sống xanh — sống thật</div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between" style={{ backgroundColor: t.bg }}>
      <div>
        {renderNav()}
        {currentPage === 'home' && renderHome()}
        {currentPage === 'projects' && renderProjects()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'gallery' && renderGallery()}
        {currentPage === 'news' && renderNews()}
        {currentPage === 'contact' && renderContact()}
      </div>
      {renderFooter()}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedProject.img} alt={selectedProject.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black text-white shadow-md" style={{ backgroundColor: t.primary }}>
                    {selectedProject.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black text-white shadow-md flex items-center gap-1" style={{ backgroundColor: t.secondary }}>
                    <Leaf className="w-3.5 h-3.5" /> {selectedProject.cert}
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-between text-slate-800">
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: t.primary }}>{selectedProject.type}</div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{selectedProject.name}</h2>
                  
                  <div className="flex items-center gap-1 text-sm text-slate-500 mb-6">
                    <MapPin className="w-4 h-4" style={{ color: t.primary }} />
                    <span>{selectedProject.loc}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-slate-100 mb-6">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold mb-0.5">Giá bán</div>
                      <div className="text-lg font-black" style={{ color: t.primary }}>{selectedProject.price} tỷ</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold mb-0.5">Diện tích</div>
                      <div className="text-base font-bold text-slate-800">{selectedProject.area}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold mb-0.5">Thiết kế</div>
                      <div className="text-base font-bold text-slate-800">
                        {selectedProject.beds > 0 ? `${selectedProject.beds} PN` : 'Lô đất'}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {selectedProject.desc}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">Đặc điểm sinh thái & kỹ thuật:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {consultSubmitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                      <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                        <Check className="w-4 h-4" /> Đã gửi yêu cầu tư vấn!
                      </div>
                      <div className="text-xs text-emerald-600">Chúng tôi sẽ liên hệ lại trong vòng 30 phút.</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="tel" 
                          placeholder="Nhập số điện thoại..." 
                          className="flex-1 px-4 py-2 text-sm border rounded-xl focus:outline-none bg-transparent text-slate-800"
                          style={{ borderColor: t.accent }}
                          value={consultPhone}
                          onChange={(e) => setConsultPhone(e.target.value)}
                        />
                        <button 
                          onClick={() => {
                            if (consultPhone.trim()) {
                              setConsultSubmitted(true);
                              setTimeout(() => setConsultSubmitted(false), 5000);
                            }
                          }}
                          className="px-6 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: t.primary }}
                        >
                          Đăng ký tư vấn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <button 
            onClick={() => setSelectedGalleryImg(null)} 
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} alt="Gallery Lightbox" className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl" />
            
            {(() => {
              const imgObj = GALLERY.find(g => g.url === selectedGalleryImg);
              return imgObj ? (
                <div className="text-center mt-6">
                  <span className="px-3 py-1 rounded-full text-xs font-black text-emerald-400 bg-emerald-950 border border-emerald-800 uppercase tracking-widest">
                    {imgObj.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-2">{imgObj.title}</h4>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* NEWS DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8">
            <button 
              onClick={() => setSelectedArticle(null)} 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="px-3 py-1 rounded-full font-bold bg-green-50 border border-green-200" style={{ color: t.primary }}>
                  {selectedArticle.cat}
                </span>
                <span>• {selectedArticle.date}</span>
                <span>• Tác giả: {selectedArticle.author}</span>
                <span>• {selectedArticle.views}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-6">{selectedArticle.title}</h2>
              
              <div className="h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-base text-slate-700 font-bold leading-relaxed mb-6 border-l-4 pl-4 bg-slate-50 py-3 rounded-r-xl" style={{ borderLeftColor: t.primary }}>
                {selectedArticle.summary}
              </p>

              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
                {selectedArticle.content.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-6 mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: t.primary }}
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

