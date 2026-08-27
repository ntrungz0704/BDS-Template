import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Search, ChevronRight, Phone, Mail, MapPin, 
  Clock, Gavel, FileText, CheckCircle2, ShieldCheck, 
  PlayCircle, Users, TrendingUp, HelpCircle, ArrowRight,
  Calendar, Eye, Anchor, Building2, Map, Star, Instagram, Facebook, Twitter, Linkedin,
  Award, Target, ThumbsUp, Heart, ChevronLeft, Send
} from 'lucide-react';
import { MAX_W } from '../design-system';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, any> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

interface Auction {
  id: number;
  title: string;
  image: string;
  location: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  type: 'dat-nen' | 'can-ho' | 'nha-pho' | 'biet-thu';
  startPrice: number;
  currentPrice: number;
  priceStep: number;
  timeLeft: { hours: number; minutes: number; seconds: number };
  viewers: number;
  status: 'live' | 'upcoming';
  startDate?: string;
  description: string;
  size: string;
  specifications: string[];
  history: { time: string; bidder: string; amount: number }[];
}

interface Article {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  content: string;
}

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: 'dat-nen' | 'can-ho' | 'biet-thu' | 'nha-pho';
}

const INITIAL_AUCTIONS: Auction[] = [
  {
    id: 1,
    title: "Biệt thự song lập khu đô thị sinh thái xanh EcoPark",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    location: "Văn Giang, Hưng Yên",
    region: "Miền Bắc",
    type: "biet-thu",
    startPrice: 15000000000,
    currentPrice: 17500000000,
    priceStep: 100000000,
    timeLeft: { hours: 2, minutes: 14, seconds: 45 },
    viewers: 154,
    status: "live",
    description: "Biệt thự song lập nằm tại vị trí đắc địa nhất khu đô thị EcoPark, sở hữu tầm nhìn trực diện ra hồ thiên nga. Thiết kế hiện đại mang phong cách Châu Âu, tối ưu hóa ánh sáng tự nhiên và thông gió đối lưu.",
    size: "250m²",
    specifications: ["Sổ hồng riêng", "Mặt tiền 12.5m", "Hướng Đông Nam", "Bàn giao thô hoàn thiện mặt ngoài"],
    history: [
      { time: "16:40", bidder: "Nguyễn Văn A", amount: 17500000000 },
      { time: "16:30", bidder: "Trần Thị B", amount: 17400000000 },
      { time: "16:15", bidder: "Lê Văn C", amount: 17200000000 }
    ]
  },
  {
    id: 2,
    title: "Căn hộ Penthouse đẳng cấp dự án Landmark 81",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    location: "Bình Thạnh, TP.HCM",
    region: "Miền Nam",
    type: "can-ho",
    startPrice: 25000000000,
    currentPrice: 28200000000,
    priceStep: 200000000,
    timeLeft: { hours: 4, minutes: 30, seconds: 0 },
    viewers: 218,
    status: "live",
    description: "Căn hộ Penthouse đỉnh cao tọa lạc tại tầng cao nhất của tháp Landmark 81, biểu tượng của sự phồn vinh. Tầm nhìn 360 độ ôm trọn sông Sài Gòn và trung tâm thành phố. Thiết bị bàn giao từ các thương hiệu xa xỉ hàng đầu thế giới.",
    size: "320m²",
    specifications: ["Sổ hồng sở hữu lâu dài", "Full nội thất nhập khẩu", "Thang máy kính riêng biệt", "Hồ bơi tràn bờ riêng"],
    history: [
      { time: "16:22", bidder: "Phạm Hồng S", amount: 28200000000 },
      { time: "16:10", bidder: "Trần Minh K", amount: 28000000000 }
    ]
  },
  {
    id: 3,
    title: "Nhà phố thương mại (Shophouse) mặt tiền Nguyễn Huệ",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    location: "Quận 1, TP.HCM",
    region: "Miền Nam",
    type: "nha-pho",
    startPrice: 45000000000,
    currentPrice: 48900000000,
    priceStep: 500000000,
    timeLeft: { hours: 1, minutes: 45, seconds: 20 },
    viewers: 342,
    status: "live",
    description: "Shophouse độc bản tại mặt tiền phố đi bộ Nguyễn Huệ, vị trí kim cương sầm uất bậc nhất Việt Nam. Phù hợp cho mọi loại hình kinh doanh cao cấp, trụ sở ngân hàng, hoặc văn phòng đại diện tập đoàn đa quốc gia.",
    size: "150m²",
    specifications: ["Sổ hồng chính chủ", "Kết cấu 1 trệt 3 lầu", "Mặt tiền 6m", "Khu vực kinh doanh sầm uất 24/7"],
    history: [
      { time: "16:44", bidder: "Hoàng Gia Bảo", amount: 48900000000 },
      { time: "16:30", bidder: "Đoàn Nguyên Đ", amount: 48400000000 }
    ]
  },
  {
    id: 4,
    title: "Lô đất nền ven biển trung tâm TP. Nha Trang",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    location: "Trần Phú, Nha Trang, Khánh Hòa",
    region: "Miền Trung",
    type: "dat-nen",
    startPrice: 8000000000,
    currentPrice: 9100000000,
    priceStep: 100000000,
    timeLeft: { hours: 6, minutes: 10, seconds: 15 },
    viewers: 95,
    status: "live",
    description: "Đất nền sát biển đường Trần Phú, cơ hội cuối cùng sở hữu quỹ đất vàng trung tâm du lịch Nha Trang. Thích hợp xây dựng khách sạn, nhà hàng, căn hộ dịch vụ cao cấp phục vụ khách du lịch trong và ngoài nước.",
    size: "180m²",
    specifications: ["Đất ở đô thị 100%", "Mặt tiền 9m hướng biển", "Độ lộ giới đường 20m", "Xây dựng tự do đến 15 tầng"],
    history: [
      { time: "15:55", bidder: "Vũ Văn T", amount: 9100000000 },
      { time: "15:40", bidder: "Nguyễn Thị M", amount: 9000000000 }
    ]
  },
  {
    id: 5,
    title: "Biệt thự nghỉ dưỡng view biển trọn vẹn tại Đà Nẵng",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    region: "Miền Trung",
    type: "biet-thu",
    startPrice: 32000000000,
    currentPrice: 32000000000,
    priceStep: 300000000,
    timeLeft: { hours: 0, minutes: 0, seconds: 0 },
    viewers: 0,
    status: "upcoming",
    startDate: "15/08/2026",
    description: "Biệt thự nghỉ dưỡng 5 sao nằm trong quần thể resort cao cấp tại biển Mỹ Khê - Đà Nẵng. Thiết kế không gian mở hòa quyện với thiên nhiên, toàn bộ phòng ngủ đều sở hữu tầm nhìn trực diện ra biển khơi.",
    size: "400m²",
    specifications: ["Sổ hồng sở hữu lâu dài", "Full nội thất tiêu chuẩn 5 sao", "Hồ bơi vô cực sát biển", "Hệ thống quản lý vận hành quốc tế"],
    history: []
  },
  {
    id: 6,
    title: "Nhà phố cổ mặt tiền phố Hàng Bông, Hoàn Kiếm",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    location: "Hoàn Kiếm, Hà Nội",
    region: "Miền Bắc",
    type: "nha-pho",
    startPrice: 60000000000,
    currentPrice: 60000000000,
    priceStep: 1000000000,
    timeLeft: { hours: 0, minutes: 0, seconds: 0 },
    viewers: 0,
    status: "upcoming",
    startDate: "20/08/2026",
    description: "Nhà cổ mang đậm dấu ấn kiến trúc Pháp thuộc tại trung tâm phố cổ Hà Nội. Vị trí vàng vô cùng đắc địa, lưu lượng giao thông lớn, thích hợp kinh doanh hàng hiệu, nhà hàng cao cấp hoặc làm khách sạn boutique.",
    size: "120m²",
    specifications: ["Sổ đỏ chính chủ, pháp lý sạch", "Mặt tiền 5.5m hiếm hoi", "Xây dựng 4 tầng vững chãi", "Thuộc khu vực lõi di sản bảo tồn"],
    history: []
  },
  {
    id: 7,
    title: "Căn hộ Dual Key Vinhomes Metropolis Liễu Giai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    location: "Ba Đình, Hà Nội",
    region: "Miền Bắc",
    type: "can-ho",
    startPrice: 7500000000,
    currentPrice: 7500000000,
    priceStep: 100000000,
    timeLeft: { hours: 0, minutes: 0, seconds: 0 },
    viewers: 0,
    status: "upcoming",
    startDate: "12/08/2026",
    description: "Căn hộ Dual Key (chìa khóa đôi) tại Vinhomes Metropolis, vị trí ngoại giao đoàn đắc địa bậc nhất quận Ba Đình. Vừa có thể ở vừa có thể cho thuê độc lập, tối ưu hóa dòng tiền đầu tư với lượng khách thuê là chuyên gia nước ngoài lớn.",
    size: "115m²",
    specifications: ["Sổ đỏ lâu dài", "Thiết kế 2 lối đi riêng biệt", "Bàn giao kèm thiết bị vệ sinh Duravit", "View hồ Tây thoáng đạt"],
    history: []
  },
  {
    id: 8,
    title: "Lô đất nền thổ cư ven sông Cổ Cò, Quảng Nam",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    location: "Điện Bàn, Quảng Nam",
    region: "Miền Trung",
    type: "dat-nen",
    startPrice: 3500000000,
    currentPrice: 3500000000,
    priceStep: 50000000,
    timeLeft: { hours: 0, minutes: 0, seconds: 0 },
    viewers: 0,
    status: "upcoming",
    startDate: "18/08/2026",
    description: "Đất nền ven sông Cổ Cò, nằm trên trục đường thông ra biển Thống Nhất. Quy hoạch đồng bộ, hạ tầng hoàn thiện 100%, kết nối giao thông thuận tiện giữa Đà Nẵng và Hội An. Thích hợp mua để dành hoặc xây biệt thự vườn nghỉ dưỡng.",
    size: "200m²",
    specifications: ["Đã có sổ đỏ từng lô", "Đường quy hoạch 17.5m", "Hệ thống điện âm hiện đại", "Mặt tiền hướng trực diện sông"],
    history: []
  }
];

const MOCK_NEWS: Article[] = [
  {
    id: 1,
    title: "Luật Đấu Giá Tài Sản Sửa Đổi 2026: Những điểm mới quan trọng",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    category: "Pháp Lý",
    date: "10/07/2026",
    author: "Luật sư Trần Quốc Tuấn",
    summary: "Những thay đổi quan trọng trong Luật Đấu giá tài sản mới nhất sẽ tác động trực tiếp đến cách thức tham gia và quyền lợi của người tham gia đấu giá.",
    content: "Luật Đấu giá tài sản sửa đổi 2026 chính thức có hiệu lực với nhiều cải cách lớn nhằm ngăn chặn tình trạng quân xanh quân đỏ, bỏ cọc và thổi giá. Đáng chú ý là việc nâng mức tiền đặt trước đối với đất nền và quy định chặt chẽ hơn về hình thức đấu giá trực tuyến. Người tham gia cần đăng ký tài khoản định danh cấp độ 2 để đảm bảo tính minh bạch."
  },
  {
    id: 2,
    title: "Thị trường bất động sản đấu giá nửa cuối năm 2026: Cơ hội và thách thức",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=800&q=80",
    category: "Thị Trường",
    date: "08/07/2026",
    author: "Chuyên gia Nguyễn Minh Phong",
    summary: "Phân tích xu hướng dòng tiền dịch chuyển vào phân khúc bất động sản đấu giá công khai nhờ tính pháp lý an toàn và giá khởi điểm hợp lý.",
    content: "Trong bối cảnh thị trường bất động sản đang hồi phục, phân khúc đấu giá công khai nổi lên như một điểm sáng. Nguyên nhân chính là do người mua ngày càng đề cao tính an toàn pháp lý của tài sản do cơ quan nhà nước tổ chức. Nhiều lô đất có vị trí đắc địa tại vùng ven Hà Nội và TP.HCM đang thu hút lượng hồ sơ kỷ lục."
  },
  {
    id: 3,
    title: "Hướng dẫn nộp tiền đặt trước đấu giá qua ứng dụng ngân hàng số",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    category: "Hướng Dẫn",
    date: "05/07/2026",
    author: "Phòng Giao Dịch Khách Hàng",
    summary: "Quy trình chuyển khoản tiền cọc đấu giá nhanh chóng, chính xác qua QR Code và hệ thống định danh thông minh mới.",
    content: "Nhằm tạo điều kiện thuận lợi cho khách hàng tham gia đấu giá, chúng tôi đã hợp tác với các ngân hàng lớn triển khai giải pháp nộp tiền cọc qua QR Code định danh. Khách hàng chỉ cần quét mã trên hồ sơ đấu giá, tiền sẽ lập tức được ghi nhận vào hệ thống mà không lo nhầm lẫn thông tin giao dịch hay chậm trễ."
  },
  {
    id: 4,
    title: "Đấu giá thành công 10 lô đất ven sông Cổ Cò với mức chênh lệch ấn tượng",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    category: "Tin Sự Kiện",
    date: "03/07/2026",
    author: "Ban Biên Tập PlatformBDS",
    summary: "Phiên đấu giá trực tuyến thành công tốt đẹp với sự tham gia của hơn 100 nhà đầu tư, giá trúng bình quân cao hơn 25% so với khởi điểm.",
    content: "Phiên đấu giá trực tuyến ngày 3/7 vừa qua đã ghi nhận sự quan tâm đặc biệt đối với 10 lô đất nền ven sông Cổ Cò. Trải qua hơn 30 lượt trả giá kịch tính, toàn bộ các lô đất đã tìm được chủ nhân. Lô đất ký hiệu A5 ghi nhận mức chênh lệch cao nhất, đạt 32% so với giá khởi điểm ban đầu."
  },
  {
    id: 5,
    title: "Làm thế nào để tránh mất tiền đặt trước khi tham gia đấu giá?",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    category: "Pháp Lý",
    date: "01/07/2026",
    author: "Ths. Luật Nguyễn Thị Mai",
    summary: "Các trường hợp phổ biến dẫn đến việc người tham gia bị tịch thu tiền đặt trước và lời khuyên pháp lý hữu ích giúp bạn bảo vệ quyền lợi.",
    content: "Một trong những rủi ro lớn nhất của nhà đầu tư khi tham gia đấu giá là mất tiền đặt trước. Luật quy định rõ các trường hợp mất cọc như: rút lại giá đã trả, trúng đấu giá nhưng từ chối ký biên bản hoặc không nộp đủ tiền đúng hạn. Nhà đầu tư cần nghiên cứu kỹ quy chế và khảo sát thực địa kỹ lưỡng trước khi đặt bút nộp hồ sơ."
  },
  {
    id: 6,
    title: "Xu hướng số hóa toàn diện hoạt động đấu giá bất động sản tại Việt Nam",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: "Công Nghệ",
    date: "28/06/2026",
    author: "Giám Đốc Công Nghệ Lê Anh Đức",
    summary: "Khám phá cách công nghệ Blockchain và AI giúp nâng cao tính bảo mật, ngăn chặn thông đồng dìm giá trong đấu giá trực tuyến.",
    content: "Việc ứng dụng công nghệ hiện đại vào nền tảng đấu giá trực tuyến mang lại sự minh bạch chưa từng có. Mọi lệnh trả giá đều được ghi nhận vĩnh viễn trên blockchain và mã hóa đầu cuối. Hệ thống AI phân tích hành vi giúp phát hiện sớm các dấu hiệu thông đồng hoặc thao túng giá, đảm bảo môi trường cạnh tranh lành mạnh cho mọi thành viên."
  }
];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Khu đất nền biệt thự EcoPark", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", category: "dat-nen" },
  { id: 2, title: "Nội thất căn hộ Landmark 81", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", category: "can-ho" },
  { id: 3, title: "Hồ bơi tràn bờ biệt thự nghỉ dưỡng", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", category: "biet-thu" },
  { id: 4, title: "Phòng khách penthouse đẳng cấp", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", category: "can-ho" },
  { id: 5, title: "Mặt tiền shophouse kinh doanh", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80", category: "nha-pho" },
  { id: 6, title: "Tổng quan dự án từ trên cao", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", category: "dat-nen" },
  { id: 7, title: "Biệt thự view biển Ngũ Hành Sơn", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80", category: "biet-thu" },
  { id: 8, title: "Không gian kiến trúc nhà cổ", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", category: "nha-pho" },
  { id: 9, title: "Đất nền ven sông Cổ Cò", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", category: "dat-nen" },
  { id: 10, title: "Phòng ngủ view hồ Tây Liễu Giai", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", category: "can-ho" }
];

export default function AuctionTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
  const brandPrimary = dynamicTheme?.primaryColor || '#DC2626';
  const brandAccent = dynamicTheme?.accentColor || '#EF4444';
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
    : ((globalThis as any).__mock_news_ref || []);

  // Shadowing variables
  const MOCK_NEWS: any = activePosts;

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
    : ((globalThis as any).__auction_properties_ref || []);

  // Shadowing variables
  const AUCTION_PROPERTIES: any = activeProjects;

  const [currentPage, setCurrentPageState] = useState(initialPage);

  useEffect(() => {
    setCurrentPageState(initialPage);
  }, [initialPage]);
  const setCurrentPage = (p: string) => {
    if (typeof setSelectedArticle === "function") setSelectedArticle(null);

    setCurrentPageState(p);
    if (typeof setSelectedArticle === "function") setSelectedArticle(null);
    if (typeof window !== 'undefined') {
      const templateSlug = template?.slug || '';
      window.history.pushState(null, '', p === 'home' ? window.location.pathname : '?page=' + p);
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // States for filters, searches, modals, forms
  const [auctionsData, setAuctionsData] = useState<Auction[]>(INITIAL_AUCTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [bidInput, setBidInput] = useState('');
  const [bidError, setBidError] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');

  const [selectedGalleryTab, setSelectedGalleryTab] = useState('all');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [aboutTab, setAboutTab] = useState('mission'); // 'mission' | 'vision' | 'values'

  const isMobile = viewport === 'mobile';
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceBid = (auctionId: number) => {
    setBidError('');
    setBidSuccess('');
    const cleanedInput = bidInput.replace(/\./g, '').trim();
    const bidAmount = parseInt(cleanedInput, 10);
    
    if (isNaN(bidAmount) || bidAmount <= 0) {
      setBidError('Vui lòng nhập số tiền hợp lệ.');
      return;
    }
    
    const targetAuction = auctionsData.find(a => a.id === auctionId);
    if (!targetAuction) return;
    
    const minBidRequired = targetAuction.currentPrice + targetAuction.priceStep;
    if (bidAmount < minBidRequired) {
      setBidError(`Số tiền đặt tối thiểu phải là ${minBidRequired.toLocaleString('vi-VN')} VNĐ (Giá hiện tại + Bước giá)`);
      return;
    }
    
    // Success: Update state
    setAuctionsData(prev => prev.map(a => {
      if (a.id === auctionId) {
        return {
          ...a,
          currentPrice: bidAmount,
          history: [
            {
              time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              bidder: "Bạn (Khách thử nghiệm)",
              amount: bidAmount
            },
            ...a.history
          ]
        };
      }
      return a;
    }));
    
    setBidSuccess('Chúc mừng! Bạn đã đặt giá thử nghiệm thành công.');
    setBidInput('');
  };

  const NavLinks = () => (
    <>
      <button onClick={() => navigateTo('home')} style={currentPage === 'home' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'home' ? '' : 'text-gray-850 hover:opacity-80'}`}>Trang Chủ</button>
      <button onClick={() => navigateTo('auctions')} style={currentPage === 'auctions' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'auctions' ? '' : 'text-gray-850 hover:opacity-80'}`}>Đang Đấu Giá</button>
      <button onClick={() => navigateTo('about')} style={currentPage === 'about' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'about' ? '' : 'text-gray-850 hover:opacity-80'}`}>Về Chúng Tôi</button>
      <button onClick={() => navigateTo('gallery')} style={currentPage === 'gallery' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'gallery' ? '' : 'text-gray-850 hover:opacity-80'}`}>Hình Ảnh</button>
      <button onClick={() => navigateTo('news')} style={currentPage === 'news' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'news' ? '' : 'text-gray-850 hover:opacity-80'}`}>Tin Tức</button>
      <button onClick={() => navigateTo('contact')} style={currentPage === 'contact' ? { color: brandPrimary } : undefined} className={`font-['Barlow_Condensed'] font-semibold text-lg uppercase tracking-wider ${currentPage === 'contact' ? '' : 'text-gray-850 hover:opacity-80'}`}>Liên Hệ</button>
    </>
  );

  // Countdown Hook Mockup
  const Countdown = ({ hours = 10, minutes = 20, seconds = 0 }) => {
    const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(prev => {
          if (prev.s > 0) return { ...prev, s: prev.s - 1 };
          if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
          if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex gap-2 text-center text-xs font-bold font-['Barlow']">
        <div style={{ backgroundColor: brandPrimary }} className="text-white rounded p-1 w-10">{time.h.toString().padStart(2, '0')}<span className="block text-[8px] uppercase font-light mt-1">Giờ</span></div>
        <div style={{ backgroundColor: brandPrimary }} className="text-white rounded p-1 w-10">{time.m.toString().padStart(2, '0')}<span className="block text-[8px] uppercase font-light mt-1">Phút</span></div>
        <div style={{ backgroundColor: brandPrimary }} className="text-white rounded p-1 w-10">{time.s.toString().padStart(2, '0')}<span className="block text-[8px] uppercase font-light mt-1">Giây</span></div>
      </div>
    );
  };

  const renderHome = () => (
    <main className="w-full font-['Barlow'] bg-[#FEF2F2]">
      {/* 2. HERO */}
      <section className="relative w-full min-h-[600px] lg:h-[800px] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 to-red-900/60" />
        </div>
        <div className={`relative z-10 w-full ${MAX_W} px-4 flex flex-col items-center text-center`}>
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-full mb-6 font-semibold uppercase tracking-wider text-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Nền tảng đấu giá trực tuyến số 1 Việt Nam
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Barlow_Condensed'] font-bold text-white uppercase leading-tight mb-6 tracking-tight drop-shadow-lg">
            Đấu Giá <span style={{ color: brandAccent }}>Minh Bạch</span><br />
            Giá Trị <span className="text-amber-400">Thực Tế</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light mb-10">
            Khám phá danh mục bất động sản đấu giá được kiểm định chặt chẽ, pháp lý an toàn, cơ hội đầu tư sinh lời vượt trội với nền tảng giao dịch bảo mật.
          </p>
          
          <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Khu vực, Tên dự án..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" 
              />
            </div>
            <div className="flex-1 w-full relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-800 appearance-none font-medium"
              >
                <option value="">Loại tài sản</option>
                <option value="dat-nen">Đất nền dự án</option>
                <option value="can-ho">Căn hộ chung cư</option>
                <option value="nha-pho">Nhà phố thương mại</option>
                <option value="biet-thu">Biệt thự nghỉ dưỡng</option>
              </select>
            </div>
            <button 
              onClick={() => navigateTo('auctions')}
              style={{ backgroundColor: brandPrimary }}
              className="w-full md:w-auto hover:opacity-90 text-white px-8 py-3 rounded-lg font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <Search size={20} /> Tìm Kiếm
            </button>
          </div>
          
          <div className="flex items-center gap-8 mt-12 text-white/80 font-['Barlow_Condensed'] uppercase tracking-wider text-sm font-semibold">
            <div className="flex items-center gap-2"><ShieldCheck className="text-amber-400" size={20} /> Pháp lý rõ ràng</div>
            <div className="flex items-center gap-2"><Gavel className="text-amber-400" size={20} /> Đấu giá công khai</div>
            <div className="flex items-center gap-2"><Clock className="text-amber-400" size={20} /> Giao dịch 24/7</div>
          </div>
        </div>
      </section>

      {/* 3. LIVE AUCTIONS */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-red-100 pb-4">
            <div>
              <div style={{ color: brandPrimary }} className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-2">
                <span className="relative flex h-3 w-3">
                  <span style={{ backgroundColor: brandAccent }} className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                  <span style={{ backgroundColor: brandPrimary }} className="relative inline-flex rounded-full h-3 w-3"></span>
                </span>
                Đang Diễn Ra
              </div>
              <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Phiên Đấu Giá <span style={{ color: brandPrimary }}>Trực Tiếp</span></h2>
            </div>
            <button onClick={() => navigateTo('auctions')} style={{ color: brandPrimary }} className="hidden md:flex items-center gap-2 font-bold hover:opacity-80 transition-colors uppercase tracking-wider">
              Xem tất cả <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctionsData.filter(a => a.status === 'live').slice(0, 3).map((item) => (
              <div key={item.id} onClick={() => { setSelectedAuction(item); setBidError(''); setBidSuccess(''); }} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-50 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div style={{ backgroundColor: brandPrimary }} className="absolute top-4 left-4 text-white px-3 py-1 rounded font-bold text-sm shadow flex items-center gap-2 uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-sm shadow flex items-center gap-1 font-medium">
                    <Eye size={14} /> {item.viewers} người xem
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end">
                    <div className="text-white">
                      <p className="text-xs text-gray-300 uppercase tracking-wider mb-1 font-semibold">Kết thúc sau</p>
                      <Countdown hours={item.timeLeft.hours} minutes={item.timeLeft.minutes} seconds={item.timeLeft.seconds} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MapPin size={14} style={{ color: brandAccent }} /> {item.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:opacity-80 transition-colors font-['Barlow_Condensed'] uppercase tracking-wide">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6 bg-red-50/50 p-4 rounded-xl border border-red-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Giá khởi điểm:</span>
                      <span className="font-bold text-gray-900">{item.startPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Giá hiện tại:</span>
                      <span style={{ color: brandPrimary }} className="font-bold text-lg">{item.currentPrice.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Bước giá:</span>
                      <span className="font-bold text-gray-700">{item.priceStep.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                  
                  <button style={{ backgroundColor: brandPrimary }} className="w-full hover:opacity-90 text-white py-3 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-lg shadow-lg">
                    <Gavel size={20} /> Đặt Giá Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
          {isMobile && (
             <button onClick={() => navigateTo('auctions')} style={{ color: brandPrimary }} className="w-full mt-8 flex items-center justify-center gap-2 bg-gray-100 font-bold py-3 rounded-xl uppercase tracking-wider">
               Xem tất cả <ArrowRight size={20} />
             </button>
          )}
        </div>
      </section>

      {/* 4. UPCOMING AUCTIONS */}
      <section className="py-20 bg-[#FEF2F2]">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Lịch Đấu Giá</span>
            <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Sắp <span style={{ color: brandPrimary }}>Diễn Ra</span></h2>
            <p className="mt-4 text-gray-600 font-medium text-lg">Đăng ký ngay hôm nay để không bỏ lỡ các tài sản vàng sắp được lên sàn đấu giá với mức giá khởi điểm hấp dẫn.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctionsData.filter(a => a.status === 'upcoming').slice(0, 6).map((item) => (
              <div key={item.id} onClick={() => { setSelectedAuction(item); setBidError(''); setBidSuccess(''); }} className="bg-white p-4 rounded-2xl flex flex-row gap-4 items-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar size={12} /> {item.startDate}
                  </div>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-lg text-gray-900 truncate uppercase tracking-wide group-hover:opacity-80 transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1 truncate"><MapPin size={12} /> {item.location}</p>
                  <p style={{ color: brandPrimary }} className="text-sm font-bold mt-1">Khởi điểm: {(item.startPrice / 1000000000).toFixed(1)} Tỷ</p>
                </div>
                <div style={{ backgroundColor: brandPrimary, color: '#FFFFFF' }} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className={`${MAX_W} px-4 mx-auto relative z-10`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span style={{ color: brandAccent }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Quy Trình Chuẩn</span>
            <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold uppercase">5 Bước <span style={{ color: brandAccent }}>Đấu Giá Dễ Dàng</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '01', title: 'Đăng Ký', desc: 'Tạo tài khoản & xác minh danh tính', icon: Users },
              { step: '02', title: 'Nộp Cọc', desc: 'Nộp tiền đặt trước cho tài sản', icon: ShieldCheck },
              { step: '03', title: 'Trả Giá', desc: 'Tham gia đấu giá trực tuyến', icon: Gavel },
              { step: '04', title: 'Trúng Đấu Giá', desc: 'Nhận thông báo trúng đấu giá', icon: CheckCircle2 },
              { step: '05', title: 'Thanh Toán', desc: 'Hoàn tất thủ tục pháp lý', icon: FileText }
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                <div style={{ borderColor: brandAccent }} className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center border-2 group-hover:bg-opacity-80 transition-colors duration-300 relative mb-6 shadow-lg">
                  <span className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                    {item.step}
                  </span>
                  <item.icon size={32} style={{ color: brandAccent }} className="group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CATEGORIES */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4 mx-auto`}>
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-red-100 pb-4">
            <div>
              <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Danh Mục</span>
              <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Loại Hình <span style={{ color: brandPrimary }}>Tài Sản</span></h2>
            </div>
            <p className="text-gray-600 font-medium max-w-md mt-4 md:mt-0 text-right hidden md:block">
              Đa dạng các loại hình bất động sản phù hợp với mọi nhu cầu đầu tư và an cư của bạn.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Đất Nền', count: 120, img: '1500382017468-9049fed747ef', icon: Map, type: 'dat-nen' },
              { name: 'Nhà Phố', count: 85, img: '1512917774080-9991f1c4c750', icon: Building2, type: 'nha-pho' },
              { name: 'Biệt Thự', count: 42, img: '1600596542815-ffad4c1539a9', icon: Anchor, type: 'biet-thu' },
              { name: 'Căn Hộ', count: 210, img: '1522708323590-d24dbb6b0267', icon: Building2, type: 'can-ho' },
            ].map((cat, i) => (
              <div key={i} onClick={() => { setFilterType(cat.type); navigateTo('auctions'); }} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square md:aspect-[3/4]">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={`https://images.unsplash.com/photo-${cat.img}?auto=format&fit=crop&w=600&q=80`} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white text-center">
                  <div style={{ backgroundColor: brandPrimary }} className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:-translate-y-2 transition-transform shadow-lg backdrop-blur-sm">
                    <cat.icon size={24} />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-300 font-medium">{cat.count} Tài sản</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ABOUT & 8. STATS */}
      <section className="py-20 bg-[#FEF2F2]">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative">
              <div style={{ backgroundColor: brandPrimary }} className="absolute -inset-4 rounded-3xl transform rotate-3 opacity-20"></div>
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" alt="About" className="relative rounded-3xl shadow-2xl z-10 w-full h-[500px] object-cover" />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: brandPrimary + '20' }} className="w-16 h-16 rounded-full flex items-center justify-center">
                    <Gavel style={{ color: brandPrimary }} size={32} />
                  </div>
                  <div>
                    <p className="font-['Barlow_Condensed'] text-4xl font-bold text-gray-900">10+</p>
                    <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">Năm Kinh Nghiệm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Về Sàn Đấu Giá</span>
              <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-6 leading-tight">
                Nền Tảng Đấu Giá <br/><span style={{ color: brandPrimary }}>Bất Động Sản Số 1</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg mb-6 leading-relaxed">
                Chúng tôi tự hào là đơn vị tiên phong trong việc ứng dụng công nghệ vào lĩnh vực đấu giá bất động sản, mang lại sự minh bạch, công bằng và hiệu quả tối đa cho cả người bán và người mua.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Bảo mật thông tin khách hàng tuyệt đối',
                  'Hệ thống đấu giá thời gian thực ổn định',
                  'Đội ngũ chuyên gia hỗ trợ pháp lý 24/7',
                  'Quy trình làm việc đạt chuẩn ISO 9001:2015'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-gray-700">
                    <div style={{ backgroundColor: brandPrimary + '20' }} className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} style={{ color: brandPrimary }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <button onClick={() => navigateTo('about')} className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors text-lg shadow-lg">
                Tìm Hiểu Thêm Về Chúng Tôi
              </button>
            </div>
          </div>
          
          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { number: '5,000+', label: 'Tài Sản Đã Đấu' },
              { number: '12,000+', label: 'Thành Viên' },
              { number: '98%', label: 'Đấu Giá Thành Công' },
              { number: '15.5K', label: 'Tỷ VNĐ Giao Dịch' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl text-center shadow-lg border border-red-50 hover:-translate-y-2 transition-transform">
                <div style={{ color: brandPrimary }} className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold mb-2">{stat.number}</div>
                <div className="text-gray-500 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LEGAL & 10. AMENITIES */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-2 block">Bảo Đảm Pháp Lý</span>
              <h2 className="text-3xl md:text-4xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8">
                Chứng Nhận <span className="text-amber-600">Cơ Quan Nhà Nước</span>
              </h2>
              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-amber-500 mb-8">
                <p className="text-gray-700 font-medium italic">
                  &ldquo;Mọi phiên đấu giá trên hệ thống đều được giám sát chặt chẽ và tuân thủ đúng quy định của Luật Đấu giá tài sản 2016.&rdquo;
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <ShieldCheck size={32} className="text-amber-500" />
                  <span className="font-bold text-gray-800">Bộ Tư Pháp cấp phép</span>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <FileText size={32} className="text-amber-500" />
                  <span className="font-bold text-gray-800">Sở Tư Pháp giám sát</span>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle2 size={32} className="text-amber-500" />
                  <span className="font-bold text-gray-800">Ngân hàng bảo lãnh</span>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <ShieldCheck size={32} className="text-amber-500" />
                  <span className="font-bold text-gray-800">Kiểm toán độc lập</span>
                </div>
              </div>
            </div>
            
            <div>
              <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Dịch Vụ Hỗ Trợ</span>
              <h2 className="text-3xl md:text-4xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8">
                Hỗ Trợ <span style={{ color: brandPrimary }}>Toàn Diện</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Tư Vấn Pháp Lý 24/7', desc: 'Đội ngũ luật sư giàu kinh nghiệm tư vấn miễn phí thủ tục sang tên, đóng thuế.', icon: FileText },
                  { title: 'Hỗ Trợ Tài Chính', desc: 'Liên kết ngân hàng cho vay lên đến 70% giá trị tài sản trúng đấu giá.', icon: TrendingUp },
                  { title: 'Thẩm Định Giá Độc Lập', desc: 'Báo cáo thẩm định giá chi tiết từ các đơn vị uy tín hàng đầu.', icon: HelpCircle },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div style={{ backgroundColor: brandPrimary + '15' }} className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                      <s.icon size={24} style={{ color: brandPrimary }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{s.title}</h4>
                      <p className="text-gray-600 font-medium text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. GALLERY */}
      <section className="py-20 bg-gray-900">
        <div className="w-full">
          <div className="text-center max-w-2xl mx-auto mb-12 px-4">
            <span style={{ color: brandAccent }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Thư Viện Ảnh</span>
            <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-white uppercase">Tài Sản <span style={{ color: brandAccent }}>Tiêu Biểu</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {GALLERY_ITEMS.slice(0, 8).map((item, i) => (
              <div key={item.id} onClick={() => setSelectedGalleryImg(item.image)} className={`relative overflow-hidden group ${i === 0 || i === 5 ? 'col-span-2 row-span-2' : ''} aspect-square cursor-pointer`}>
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-red-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <div style={{ color: brandPrimary }} className="w-12 h-12 bg-white rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg mb-2">
                    <Search size={20} />
                  </div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="py-20 bg-[#FEF2F2]">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Khách Hàng Nói Gì</span>
            <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Câu Chuyện <span style={{ color: brandPrimary }}>Thành Công</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ borderTopColor: brandPrimary }} className="bg-white p-8 rounded-2xl shadow-lg relative border-t-4">
                <div className="text-red-200 text-6xl font-serif absolute top-4 right-4 opacity-50">&ldquo;</div>
                <div className="flex gap-1 mb-4 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-gray-600 italic font-medium mb-8 relative z-10">
                  &ldquo;Hệ thống đấu giá chạy rất mượt mà. Tôi đã trúng đấu giá lô đất với mức giá tốt hơn thị trường 15%. Quy trình pháp lý sau đó được đội ngũ hỗ trợ rất nhanh chóng.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={`https://i.pravatar.cc/100?img=${item + 10}`} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-red-100" />
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide">Nguyễn Văn {String.fromCharCode(64+item)}</h4>
                    <p style={{ color: brandPrimary }} className="text-xs font-bold uppercase tracking-wider">Nhà Đầu Tư</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. NEWS */}
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4 mx-auto`}>
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-red-100 pb-4">
            <div>
              <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Tin Tức Mới</span>
              <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Thị Trường <span style={{ color: brandPrimary }}>Đấu Giá</span></h2>
            </div>
            <button onClick={() => navigateTo('news')} style={{ color: brandPrimary }} className="hidden md:flex items-center gap-2 font-bold hover:opacity-80 transition-colors uppercase tracking-wider">
              Xem tất cả tin tức <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedArticle(item)}>
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div style={{ backgroundColor: brandPrimary }} className="absolute top-4 left-4 text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-wider shadow-lg">
                    {item.category}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} style={{ color: brandAccent }} /> {item.date}</span>
                  <span className="flex items-center gap-1"><Users size={14} style={{ color: brandAccent }} /> {item.author}</span>
                </div>
                <h3 className="text-xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase tracking-wide mb-3 group-hover:opacity-80 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium text-sm line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-20 bg-[#FEF2F2]">
        <div className={`${MAX_W} px-4 mx-auto max-w-4xl`}>
          <div className="text-center mb-16">
            <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Giải Đáp Thắc Mắc</span>
            <h2 className="text-4xl md:text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Câu Hỏi <span style={{ color: brandPrimary }}>Thường Gặp</span></h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Làm thế nào để đăng ký tham gia đấu giá?", a: "Bạn cần tạo tài khoản trên hệ thống, xác minh danh tính bằng CCCD/CMND, và nộp tiền đặt trước cho tài sản bạn muốn tham gia đấu giá chậm nhất 2 ngày trước khi phiên đấu giá diễn ra." },
              { q: "Tiền đặt trước (tiền cọc) quy định như thế nào?", a: "Tiền đặt trước thường dao động từ 5% đến 20% giá khởi điểm của tài sản. Nếu bạn không trúng đấu giá, số tiền này sẽ được hoàn trả vào tài khoản của bạn trong vòng 3 ngày làm việc." },
              { q: "Nếu tôi trả giá cao nhất nhưng đổi ý không mua nữa?", a: "Theo luật đấu giá, nếu bạn đã trả giá cao nhất nhưng từ chối mua, bạn sẽ mất toàn bộ số tiền đặt trước. Vui lòng cân nhắc kỹ khả năng tài chính trước khi đặt giá." },
              { q: "Phí tham gia đấu giá là bao nhiêu?", a: "Phí mua hồ sơ tham gia đấu giá từ 100.000 VNĐ đến 500.000 VNĐ tùy thuộc vào giá trị của tài sản, khoản phí này không được hoàn lại." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-red-50 overflow-hidden">
                <button 
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-gray-900 hover:opacity-80 transition-colors uppercase tracking-wide font-['Barlow_Condensed'] text-lg"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronRight size={20} style={activeFaq === i ? { color: brandPrimary } : undefined} className={`transform transition-transform ${activeFaq === i ? 'rotate-90' : 'text-gray-400'}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. CONTACT CTA / NEWSLETTER */}
      <section style={{ backgroundColor: brandPrimary }} className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className={`${MAX_W} px-4 mx-auto relative z-10 text-center`}>
          <Gavel size={64} className="text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-6xl font-['Barlow_Condensed'] font-bold text-white uppercase mb-6 tracking-wide drop-shadow">
            Sẵn Sàng Săn Tài Sản Giá Trị?
          </h2>
          <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
            Đăng ký thành viên ngay hôm nay để nhận thông báo sớm nhất về các phiên đấu giá hấp dẫn và ưu đãi đặc quyền.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Nhập địa chỉ email của bạn..." className="w-full px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-400" />
            <button className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors shadow-xl shrink-0 whitespace-nowrap">
              Đăng Ký Nhận Tin
            </button>
          </div>
        </div>
      </section>
    </main>
  );

  const renderAuctions = () => {
    const filteredAuctions = auctionsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !filterType || item.type === filterType;
      const matchesRegion = !filterRegion || item.region === filterRegion;
      
      let matchesPrice = true;
      if (filterPrice === 'under-10') {
        matchesPrice = item.currentPrice < 10000000000;
      } else if (filterPrice === '10-30') {
        matchesPrice = item.currentPrice >= 10000000000 && item.currentPrice <= 30000000000;
      } else if (filterPrice === 'over-30') {
        matchesPrice = item.currentPrice > 30000000000;
      }

      return matchesSearch && matchesType && matchesRegion && matchesPrice;
    });

    return (
      <div className="w-full font-['Barlow'] bg-[#FEF2F2] pt-24 pb-20">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <h1 style={{ borderLeftColor: brandPrimary }} className="text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8 border-l-8 pl-6">Sàn Đấu Giá</h1>
          
          {/* Reactive Filter Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-red-50 flex flex-col lg:flex-row gap-4 items-center mb-8">
            <div className="w-full lg:flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm khu vực, dự án..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800"
              />
            </div>
            
            <div className="w-full lg:w-48 relative">
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 appearance-none font-medium"
              >
                <option value="">Tất cả loại hình</option>
                <option value="dat-nen">Đất nền dự án</option>
                <option value="can-ho">Căn hộ chung cư</option>
                <option value="nha-pho">Nhà phố thương mại</option>
                <option value="biet-thu">Biệt thự nghỉ dưỡng</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-750">
                <ChevronRight size={16} className="transform rotate-90" />
              </div>
            </div>
            
            <div className="w-full lg:w-48 relative">
              <select 
                value={filterRegion} 
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 appearance-none font-medium"
              >
                <option value="">Tất cả khu vực</option>
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Trung">Miền Trung</option>
                <option value="Miền Nam">Miền Nam</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-750">
                <ChevronRight size={16} className="transform rotate-90" />
              </div>
            </div>
            
            <div className="w-full lg:w-48 relative">
              <select 
                value={filterPrice} 
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 appearance-none font-medium"
              >
                <option value="">Tất cả giá</option>
                <option value="under-10">Dưới 10 tỷ</option>
                <option value="10-30">10 tỷ - 30 tỷ</option>
                <option value="over-30">Trên 30 tỷ</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-750">
                <ChevronRight size={16} className="transform rotate-90" />
              </div>
            </div>
            
            {(searchQuery || filterType || filterRegion || filterPrice) && (
              <button 
                onClick={() => { setSearchQuery(''); setFilterType(''); setFilterRegion(''); setFilterPrice(''); }}
                style={{ color: brandPrimary }}
                className="w-full lg:w-auto hover:opacity-80 font-bold transition-colors font-['Barlow_Condensed'] uppercase tracking-wider text-sm px-4 whitespace-nowrap"
              >
                Xóa lọc
              </button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="text-gray-650 font-medium mb-6">
            Tìm thấy <span style={{ color: brandPrimary }} className="font-bold">{filteredAuctions.length}</span> tài sản phù hợp.
          </div>
          
          {/* Listings Grid */}
          {filteredAuctions.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg border border-red-50 text-center py-20">
              <Gavel size={64} className="text-red-200 mx-auto mb-4" />
              <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Không tìm thấy tài sản phù hợp</h2>
              <p className="text-gray-500 mt-2">Vui lòng thử lại với các tiêu chí tìm kiếm hoặc bộ lọc khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAuctions.map((item) => (
                <div key={item.id} onClick={() => { setSelectedAuction(item); setBidError(''); setBidSuccess(''); }} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-50 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div style={item.status === 'live' ? { backgroundColor: brandPrimary } : undefined} className={`absolute top-4 left-4 text-white px-3 py-1 rounded font-bold text-sm shadow flex items-center gap-2 uppercase tracking-wider ${item.status === 'live' ? '' : 'bg-amber-500'}`}>
                        {item.status === 'live' ? (
                          <>
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                          </>
                        ) : (
                          'SẮP DIỄN RA'
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-sm shadow flex items-center gap-1 font-medium">
                        <Eye size={14} /> {item.status === 'live' ? `${item.viewers} người xem` : 'Đang chờ'}
                      </div>
                      {item.status === 'live' && (
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-1 font-semibold">Kết thúc sau</p>
                          <Countdown hours={item.timeLeft.hours} minutes={item.timeLeft.minutes} seconds={item.timeLeft.seconds} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <MapPin size={14} style={{ color: brandAccent }} /> {item.location}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:opacity-80 transition-colors font-['Barlow_Condensed'] uppercase tracking-wide">
                        {item.title}
                      </h3>
                      
                      <div className="space-y-3 mb-6 bg-red-50/50 p-4 rounded-xl border border-red-100">
                        {item.status === 'live' ? (
                          <>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 font-medium">Giá khởi điểm:</span>
                              <span className="font-bold text-gray-900">{(item.startPrice / 1000000000).toFixed(1)} Tỷ VNĐ</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 font-medium">Giá hiện tại:</span>
                              <span style={{ color: brandPrimary }} className="font-bold text-lg">{(item.currentPrice / 1000000000).toLocaleString('vi-VN')} Tỷ VNĐ</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 font-medium">Giá khởi điểm:</span>
                              <span style={{ color: brandPrimary }} className="font-bold text-lg">{(item.startPrice / 1000000000).toFixed(1)} Tỷ VNĐ</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 font-medium">Ngày bắt đầu:</span>
                              <span className="font-bold text-gray-900">{item.startDate}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Kích thước:</span>
                          <span className="font-bold text-gray-750">{item.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button style={{ backgroundColor: brandPrimary }} className="w-full hover:opacity-90 text-white py-3 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-lg shadow-lg">
                      <Gavel size={20} /> {item.status === 'live' ? 'Đấu Giá / Đặt Cọc' : 'Xem Chi Tiết'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAbout = () => {
    const milestones = [
      { year: "2016", title: "Thành Lập Công Ty", desc: "Được cấp phép hoạt động bởi Bộ Tư Pháp, đặt nền móng với trụ sở chính tại TP.HCM." },
      { year: "2019", title: "Số Hóa Hoạt Động", desc: "Ra mắt phiên bản đầu tiên của nền tảng đấu giá trực tuyến, loại bỏ hoàn toàn thủ tục giấy tờ." },
      { year: "2022", title: "Hệ Thống Real-time", desc: "Nâng cấp hạ tầng công nghệ, ứng dụng AI để nhận diện khách hàng và chống gian lận giá." },
      { year: "2025", title: "Dẫn Đầu Thị Trường", desc: "Đạt mốc giao dịch lũy kế 15.500 tỷ VNĐ với tỷ lệ đấu giá thành công và bàn giao nhà đạt 98%." }
    ];

    const leaders = [
      {
        name: "Ông Nguyễn Thế Anh",
        role: "Tổng Giám Đốc / Đồng Sáng Lập",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        bio: "Hơn 15 năm kinh nghiệm trong quản lý bất động sản và đấu giá tài sản công."
      },
      {
        name: "Bà Lê Minh Trang",
        role: "Giám Đốc Pháp Lý",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        bio: "Nguyên Thẩm phán với chuyên môn sâu về Luật Đất đai và thủ tục chuyển nhượng tài sản đấu giá."
      },
      {
        name: "Ông Trần Hoài Nam",
        role: "Giám Đốc Công Nghệ (CTO)",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        bio: "Chuyên gia công nghệ thông tin từ thung lũng Silicon, kiến trúc sư trưởng hệ thống đấu giá bảo mật."
      }
    ];

    return (
      <div className="w-full font-['Barlow'] bg-[#FEF2F2] pt-24 pb-20">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <h1 style={{ borderLeftColor: brandPrimary }} className="text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8 border-l-8 pl-6">Về Chúng Tôi</h1>
          
          {/* Main Intro */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-red-50 mb-16">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <span style={{ color: brandPrimary }} className="font-bold uppercase tracking-widest text-sm mb-2 block">Thương Hiệu Tiên Phong</span>
                <h2 className="text-3xl md:text-4xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-6">
                  Kiến tạo môi trường giao dịch bất động sản công khai, minh bạch
                </h2>
                <p className="text-gray-600 font-medium text-lg leading-relaxed mb-6">
                  PlatformBDS tự hào là doanh nghiệp tiên phong triển khai giải pháp công nghệ số vào hoạt động đấu giá bất động sản tại Việt Nam. Chúng tôi đồng hành cùng các cơ quan nhà nước, ngân hàng thương mại và các tập đoàn lớn để đưa những tài sản chất lượng tới tay khách hàng một cách công bằng nhất.
                </p>
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: brandPrimary + '15', color: brandPrimary }} className="p-4 rounded-2xl">
                    <ShieldCheck size={36} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg uppercase">Bảo Chứng Pháp Lý</h4>
                    <p className="text-gray-500 font-medium text-sm">Tuân thủ nghiêm ngặt Luật Đấu giá tài sản và quy định nhà nước.</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" alt="Building" className="rounded-2xl shadow-lg w-full h-[350px] object-cover" />
                <div className="absolute -bottom-6 -left-6 bg-amber-500 text-gray-900 p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-5xl font-extrabold font-['Barlow_Condensed']">100%</p>
                  <p className="text-xs uppercase font-bold tracking-wider mt-1 text-gray-950">Pháp lý minh bạch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Working Tabs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-50 mb-16">
            <div className="flex justify-center border-b border-gray-200 mb-8">
              <div className="flex gap-4 md:gap-8 overflow-x-auto">
                {[
                  { id: 'mission', label: 'Sứ Mệnh', icon: Target },
                  { id: 'vision', label: 'Tầm Nhìn', icon: Eye },
                  { id: 'values', label: 'Giá Trị Cốt Lõi', icon: Award }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setAboutTab(tab.id)}
                    style={aboutTab === tab.id ? { borderBottomColor: brandPrimary, color: brandPrimary } : undefined}
                    className={`pb-4 px-2 font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wider flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${aboutTab === tab.id ? '' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                  >
                    <tab.icon size={20} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="py-4">
              {aboutTab === 'mission' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold font-['Barlow_Condensed'] text-gray-900 uppercase mb-4">Sứ Mệnh Của Chúng Tôi</h3>
                    <p className="text-gray-650 font-medium leading-relaxed">
                      Sứ mệnh của chúng tôi là minh bạch hóa thị trường bất động sản thông qua công nghệ. PlatformBDS giúp loại bỏ rào cản địa lý, kết nối người mua thực và người bán thực, mang đến trải nghiệm đấu giá an toàn, tiện lợi nhất, đồng thời tối ưu hóa lợi ích tài chính cho toàn xã hội.
                    </p>
                  </div>
                  <div style={{ backgroundColor: brandPrimary + '15', borderLeftColor: brandPrimary }} className="p-6 rounded-2xl border-l-4">
                    <p style={{ color: brandPrimary }} className="italic font-semibold">
                      &ldquo;Công khai - Công bằng - Minh bạch - Chuyên nghiệp là kim chỉ nam cho mọi hoạt động của sàn đấu giá.&rdquo;
                    </p>
                  </div>
                </div>
              )}
              {aboutTab === 'vision' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold font-['Barlow_Condensed'] text-gray-900 uppercase mb-4">Tầm Nhìn 2030</h3>
                    <p className="text-gray-650 font-medium leading-relaxed">
                      Trở thành nền tảng đấu giá bất động sản số trực tuyến lớn nhất Việt Nam và dẫn đầu khu vực Đông Nam Á về khối lượng giao dịch. Tích hợp các giải pháp Blockchain vào xác thực nguồn gốc đất đai và bảo lãnh đấu giá bằng tiền định danh.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                      <p style={{ color: brandPrimary }} className="text-3xl font-extrabold">50K+</p>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">Thành viên đăng ký</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
                      <p style={{ color: brandPrimary }} className="text-3xl font-extrabold">100%</p>
                      <p className="text-xs text-gray-500 font-bold uppercase mt-1">Số hóa toàn diện</p>
                    </div>
                  </div>
                </div>
              )}
              {aboutTab === 'values' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Minh Bạch Tuyệt Đối", desc: "Mọi giao dịch, phiên đặt giá đều được hệ thống ghi nhận thời gian thực và không thể chỉnh sửa." },
                    { title: "An Toàn Pháp Lý", desc: "Tất cả bất động sản trước khi lên sàn đều được đội ngũ luật sư kiểm định nghiêm ngặt về quy hoạch, tranh chấp." },
                    { title: "Khách Hàng Là Trọng Tâm", desc: "Không ngừng cải tiến trải nghiệm người dùng, hỗ trợ khách hàng trước, trong và sau phiên đấu giá." }
                  ].map((val, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-150 shadow-sm">
                      <div style={{ backgroundColor: brandPrimary }} className="w-10 h-10 text-white rounded-lg flex items-center justify-center font-bold mb-4">{idx + 1}</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{val.title}</h4>
                      <p className="text-gray-650 font-medium text-sm">{val.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="mb-16">
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold text-gray-900 text-center uppercase mb-12">Lịch Sử Phát Triển</h2>
            <div className="relative border-l-2 border-red-200 ml-4 md:ml-32">
              {milestones.map((ms, idx) => (
                <div key={idx} className="mb-10 ml-6 relative">
                  <span style={{ backgroundColor: brandPrimary }} className="absolute -left-[35px] top-1 text-white text-xs font-bold px-3 py-1 rounded-full border-4 border-white shadow-md">
                    {ms.year}
                  </span>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-150 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 text-xl font-['Barlow_Condensed'] uppercase tracking-wide mb-2">{ms.title}</h3>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed">{ms.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div>
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold text-gray-900 text-center uppercase mb-12">Ban Điều Hành</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-red-50 overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="h-72 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="flex gap-3 text-white">
                        <Facebook size={18} className="hover:opacity-80 cursor-pointer transition-colors" />
                        <Twitter size={18} className="hover:opacity-80 cursor-pointer transition-colors" />
                        <Linkedin size={18} className="hover:opacity-80 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wide text-gray-900 mb-1">{leader.name}</h3>
                    <p style={{ color: brandPrimary }} className="font-bold text-sm uppercase mb-3">{leader.role}</p>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderGallery = () => {
    const galleryTabs = [
      { id: 'all', label: 'Tất cả' },
      { id: 'dat-nen', label: 'Đất nền' },
      { id: 'can-ho', label: 'Căn hộ' },
      { id: 'biet-thu', label: 'Biệt thự' },
      { id: 'nha-pho', label: 'Nhà phố' }
    ];

    const filteredGalleryItems = selectedGalleryTab === 'all' 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(item => item.category === selectedGalleryTab);

    return (
      <div className="w-full font-['Barlow'] bg-[#FEF2F2] pt-24 pb-20">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <h1 style={{ borderLeftColor: brandPrimary }} className="text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8 border-l-8 pl-6">Thư Viện Ảnh</h1>
          
          {/* Gallery Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {galleryTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id)}
                style={selectedGalleryTab === tab.id ? { backgroundColor: brandPrimary } : undefined}
                className={`px-6 py-2 rounded-full font-['Barlow_Condensed'] font-bold text-lg uppercase tracking-wider transition-colors ${selectedGalleryTab === tab.id ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-red-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGalleryItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedGalleryImg(item.image)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-red-50 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-60 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search size={28} className="text-white" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <span style={{ color: brandPrimary }} className="text-[10px] bg-red-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider">{item.category === 'dat-nen' ? 'Đất nền' : item.category === 'can-ho' ? 'Căn hộ' : item.category === 'biet-thu' ? 'Biệt thự' : 'Nhà phố'}</span>
                  <h3 className="font-bold text-gray-800 text-base mt-2 line-clamp-1 group-hover:opacity-80 transition-colors uppercase tracking-wide font-['Barlow_Condensed']">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNews = () => {
    const filteredNews = MOCK_NEWS.filter(article => 
      article.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) || 
      article.summary.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchNewsQuery.toLowerCase())
    );

    return (
      <div className="w-full font-['Barlow'] bg-[#FEF2F2] pt-24 pb-20">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <h1 style={{ borderLeftColor: brandPrimary }} className="text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8 border-l-8 pl-6">Tin Tức</h1>
          
          {/* News Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <input 
              type="text" 
              placeholder="Tìm kiếm tin tức, luật đấu giá, dự án..." 
              value={searchNewsQuery}
              onChange={(e) => setSearchNewsQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg border border-red-50 text-center py-20">
              <FileText size={64} className="text-red-200 mx-auto mb-4" />
              <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase">Không tìm thấy tin tức nào</h2>
              <p className="text-gray-500 mt-2">Vui lòng thử từ khóa tìm kiếm khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map(item => (
                <div key={item.id} onClick={() => setSelectedArticle(item)} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-red-50 cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div style={{ backgroundColor: brandPrimary }} className="absolute top-4 left-4 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14} style={{ color: brandAccent }} /> {item.date}</span>
                        <span className="flex items-center gap-1"><Users size={14} style={{ color: brandAccent }} /> {item.author}</span>
                      </div>
                      <h3 className="text-xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase tracking-wide mb-3 group-hover:opacity-80 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-medium text-sm line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <button style={{ color: brandPrimary }} className="hover:opacity-80 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                      Đọc Tiếp <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContact = () => {
    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        alert('Vui lòng điền các trường bắt buộc (Họ tên, Email và Lời nhắn)');
        return;
      }
      setContactSubmitted(true);
    };

    const handleResetContact = () => {
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setContactSubmitted(false);
    };

    return (
      <div className="w-full font-['Barlow'] bg-[#FEF2F2] pt-24 pb-20">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <h1 style={{ borderLeftColor: brandPrimary }} className="text-5xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-8 border-l-8 pl-6">Liên Hệ</h1>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-50 grid grid-cols-1 lg:grid-cols-3">
            {/* Contact Info Panel */}
            <div className="bg-gray-900 p-8 lg:p-12 text-white flex flex-col justify-between">
              <div>
                <h2 style={{ color: brandAccent }} className="text-3xl font-['Barlow_Condensed'] font-bold uppercase mb-6 tracking-wide">Thông Tin Liên Hệ</h2>
                <p className="text-gray-400 font-medium mb-8">
                  Hãy liên hệ với chúng tôi bất cứ khi nào bạn có thắc mắc về hồ sơ, quy trình đặt tiền trước hay thủ tục bàn giao bất động sản.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin style={{ color: brandAccent }} className="shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase tracking-wider text-sm text-gray-300">Địa chỉ</p>
                      <p className="text-gray-400 text-sm font-medium">{company?.address || company?.address || '123 Đường Đấu Giá, Phường Bình An, Quận 2, TP.HCM'}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone style={{ color: brandAccent }} className="shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase tracking-wider text-sm text-gray-300">Tổng đài hỗ trợ</p>
                      <p className="text-gray-400 text-sm font-medium">1900 6868 (Hotline 24/7)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail style={{ color: brandAccent }} className="shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase tracking-wider text-sm text-gray-300">Email nhận hồ sơ</p>
                      <p className="text-gray-400 text-sm font-medium">{company?.email || company?.email || 'contact@auctionbds.vn'}</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12">
                <p style={{ color: brandAccent }} className="font-bold uppercase tracking-wider text-xs mb-3">Kết nối với chúng tôi</p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Facebook size={18}/></div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Twitter size={18}/></div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Instagram size={18}/></div>
                </div>
              </div>
            </div>

            {/* Interactive Form or Success Screen */}
            <div className="p-8 lg:p-12 lg:col-span-2">
              {contactSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(22,163,74,0.2)]">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase mb-4">Gửi tin nhắn thành công!</h2>
                  <p className="text-gray-655 max-w-md mb-8 font-medium">
                    Cảm ơn bạn đã liên hệ với chúng tôi. Đội ngũ chăm sóc khách hàng của PlatformBDS sẽ phản hồi lời nhắn của bạn trong vòng 24 giờ làm việc.
                  </p>
                  <button 
                    onClick={handleResetContact}
                    style={{ backgroundColor: brandPrimary }}
                    className="hover:opacity-90 text-white px-8 py-3 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors text-lg"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <h2 className="text-3xl font-['Barlow_Condensed'] font-bold uppercase text-gray-900 mb-6">Gửi Yêu Cầu Tư Vấn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nguyễn Văn A" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="email@example.com" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
                      <input 
                        type="tel" 
                        placeholder="0901234567" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Chủ đề quan tâm</label>
                      <input 
                        type="text" 
                        placeholder="Hồ sơ đấu giá lô đất A" 
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Lời nhắn của bạn *</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Nội dung cần tư vấn chi tiết..." 
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-gray-800 font-medium resize-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    style={{ backgroundColor: brandPrimary }}
                    className="w-full hover:opacity-90 text-white py-4 rounded-xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-lg shadow-lg"
                  >
                    <Send size={20} /> Gửi Lời Nhắn
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const User = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );

  return (
    <div className="min-h-screen flex flex-col font-['Barlow']">
      {/* 1. HEADER */}
      <header className="sticky w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm transition-all duration-300">
        <div className="bg-gray-900 text-white py-1">
          <div className={`${MAX_W} px-4 mx-auto flex justify-between items-center text-xs font-medium uppercase tracking-wider`}>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Phone size={12} style={{ color: brandAccent }} /> {company?.phone || '1900 6868'}</span>
              <span className="hidden sm:flex items-center gap-1"><Mail size={12} style={{ color: brandAccent }} /> {company?.email || 'contact@auctionbds.vn'}</span>
            </div>
            <div className="flex gap-4">
              <span className="hidden sm:inline-block text-gray-400">{company?.workingHours || 'Giờ làm việc: 08:00 - 17:30'}</span>
              <div className="flex items-center gap-2" style={{ color: brandAccent }}>
                <Facebook size={12} className="hover:text-white cursor-pointer" />
                <Instagram size={12} className="hover:text-white cursor-pointer" />
                <Linkedin size={12} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${MAX_W} px-4 mx-auto h-20 flex items-center justify-between`}>
          <div 
            className="flex items-center gap-2 cursor-pointer group text-left"
            onClick={() => navigateTo('home')}
          >
            <div 
              style={{ backgroundColor: brandPrimary }}
              className="w-10 h-10 text-white rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shrink-0"
            >
              <Gavel size={24} />
            </div>
            <div>
              <div className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-tighter text-gray-900 leading-none">
                {company?.name || template?.name || 'PlatformBDS'}
              </div>
              {company?.slogan && (
                <div style={{ color: brandPrimary }} className="text-[10px] font-semibold tracking-wider uppercase">
                  {company.slogan}
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </nav>

          <div className="hidden lg:flex items-center gap-4">
             <button className="text-gray-900 font-bold font-['Barlow_Condensed'] uppercase tracking-wider hover:opacity-80 transition-colors">
               Đăng Nhập
             </button>
             <button style={{ backgroundColor: brandPrimary }} className="hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors shadow-lg">
               Đăng Ký Ngay
             </button>
          </div>

          <button 
            className="lg:hidden text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 flex flex-col px-4 gap-4 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-4">
              <NavLinks />
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button className="w-full bg-gray-100 text-gray-900 font-bold py-3 rounded-xl font-['Barlow_Condensed'] uppercase tracking-wider">
                Đăng Nhập
              </button>
              <button style={{ backgroundColor: brandPrimary }} className="w-full text-white font-bold py-3 rounded-xl font-['Barlow_Condensed'] uppercase tracking-wider">
                Đăng Ký
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <div className="flex-1 mt-[104px]">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'auctions' && renderAuctions()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'gallery' && renderGallery()}
        {currentPage === 'news' && renderNews()}
        {currentPage === 'contact' && renderContact()}
      </div>

      {/* DETAIL MODAL */}
      {selectedAuction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div style={{ borderTopColor: brandPrimary }} className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border-t-8 flex flex-col md:flex-row text-gray-800">
            <button 
              onClick={() => { setSelectedAuction(null); setBidError(''); setBidSuccess(''); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white/95 rounded-full p-2 shadow-md z-10"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-150">
              <div className="h-64 rounded-xl overflow-hidden mb-6">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedAuction.image} alt={selectedAuction.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wider text-gray-900 mb-4">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-150 text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase">Diện tích</p>
                  <p className="font-bold text-gray-800 mt-0.5">{selectedAuction.size}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-150 text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase">Khu vực</p>
                  <p className="font-bold text-gray-800 mt-0.5">{selectedAuction.region}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {selectedAuction.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span style={auctionsData.find(a => a.id === selectedAuction.id)?.status === 'live' ? { backgroundColor: brandPrimary } : undefined} className={`inline-block text-[10px] text-white px-2.5 py-1 rounded font-bold uppercase tracking-wider mb-3 ${auctionsData.find(a => a.id === selectedAuction.id)?.status === 'live' ? '' : 'bg-amber-500'}`}>
                  {auctionsData.find(a => a.id === selectedAuction.id)?.status === 'live' ? 'Đang đấu giá' : 'Sắp diễn ra'}
                </span>
                <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4">
                  {selectedAuction.title}
                </h2>
                <p className="text-gray-500 font-medium text-sm flex items-center gap-1 mb-6">
                  <MapPin size={16} style={{ color: brandAccent }} /> {selectedAuction.location}
                </p>
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6">
                  {selectedAuction.description}
                </p>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-gray-500 font-medium">Giá khởi điểm:</span>
                    <span className="font-bold text-gray-900">{selectedAuction.startPrice.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-gray-500 font-medium">Giá hiện tại:</span>
                    <span style={{ color: brandPrimary }} className="font-bold text-xl">{(auctionsData.find(a => a.id === selectedAuction.id)?.currentPrice ?? selectedAuction.currentPrice).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Bước giá:</span>
                    <span className="font-bold text-gray-800">{selectedAuction.priceStep.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>

                {auctionsData.find(a => a.id === selectedAuction.id)?.status === 'live' ? (
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Đấu giá thử nghiệm</h4>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          placeholder={`Tối thiểu ${((auctionsData.find(a => a.id === selectedAuction.id)?.currentPrice || 0) + selectedAuction.priceStep).toLocaleString('vi-VN')}`}
                          value={bidInput}
                          onChange={(e) => setBidInput(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 text-gray-800 font-bold"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">VNĐ</span>
                      </div>
                      <button 
                        onClick={() => handlePlaceBid(selectedAuction.id)}
                        style={{ backgroundColor: brandPrimary }}
                        className="hover:opacity-90 text-white px-6 py-2 rounded-lg font-['Barlow_Condensed'] font-bold uppercase tracking-wider transition-colors shadow-lg"
                      >
                        Gửi
                      </button>
                    </div>
                    {bidError && <p className="text-red-600 text-xs font-semibold mt-2">{bidError}</p>}
                    {bidSuccess && <p className="text-green-600 text-xs font-semibold mt-2">{bidSuccess}</p>}
                  </div>
                ) : (
                  <div className="mb-6 bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                    <Clock size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 text-sm mb-1">Phiên chưa mở</h4>
                      <p className="text-amber-700 text-xs font-medium">Bắt đầu ngày {selectedAuction.startDate}.</p>
                    </div>
                  </div>
                )}

                {auctionsData.find(a => a.id === selectedAuction.id) && ((auctionsData.find(a => a.id === selectedAuction.id)?.history.length ?? 0) > 0) && (
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Lịch sử đặt giá</h4>
                    <div className="max-h-36 overflow-y-auto border border-gray-150 rounded-lg text-xs font-semibold">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-150 text-gray-500">
                            <th className="p-2 font-bold">Thời gian</th>
                            <th className="p-2 font-bold">Người đấu</th>
                            <th className="p-2 font-bold text-right">Giá</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {auctionsData.find(a => a.id === selectedAuction.id)?.history.map((hist, idx) => (
                            <tr key={idx} className={idx === 0 ? "bg-red-50 text-red-700" : "text-gray-600"}>
                              <td className="p-2">{hist.time}</td>
                              <td className="p-2 truncate max-w-[100px]">{hist.bidder}</td>
                              <td className="p-2 text-right font-bold">{hist.amount.toLocaleString('vi-VN')} đ</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <button 
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 text-white hover:opacity-80 bg-gray-800 rounded-full p-3 shadow-lg transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-5xl w-full flex items-center justify-between gap-4">
            <button 
              onClick={() => {
                const currentIndex = GALLERY_ITEMS.findIndex(item => item.image === selectedGalleryImg);
                const prevIndex = currentIndex === 0 ? GALLERY_ITEMS.length - 1 : currentIndex - 1;
                setSelectedGalleryImg(GALLERY_ITEMS[prevIndex].image);
              }}
              className="text-white hover:opacity-80 bg-gray-800 rounded-full p-3 shadow-lg transition-colors shrink-0"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex-1 flex justify-center items-center h-[75vh]">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                src={selectedGalleryImg} 
                alt="Lightbox" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
              />
            </div>
            
            <button 
              onClick={() => {
                const currentIndex = GALLERY_ITEMS.findIndex(item => item.image === selectedGalleryImg);
                const nextIndex = currentIndex === GALLERY_ITEMS.length - 1 ? 0 : currentIndex + 1;
                setSelectedGalleryImg(GALLERY_ITEMS[nextIndex].image);
              }}
              className="text-white hover:opacity-80 bg-gray-800 rounded-full p-3 shadow-lg transition-colors shrink-0"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* NEWS ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto text-gray-800">
          <div style={{ borderTopColor: brandPrimary }} className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative border-t-8 p-6 md:p-8">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white/95 rounded-full p-2 shadow-md z-10"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6">
              <span style={{ color: brandPrimary }} className="bg-red-50 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <h2 className="text-3xl font-['Barlow_Condensed'] font-bold text-gray-900 uppercase tracking-wide leading-tight mt-3 mb-4">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider pb-6 border-b border-gray-150">
                <span className="flex items-center gap-1"><Calendar size={14} style={{ color: brandAccent }} /> {selectedArticle.date}</span>
                <span className="flex items-center gap-1"><Users size={14} style={{ color: brandAccent }} /> {selectedArticle.author}</span>
              </div>
            </div>
            
            <div className="h-64 rounded-xl overflow-hidden mb-6">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>
            
            <p className="text-gray-900 font-bold text-base leading-relaxed mb-4">
              {selectedArticle.summary}
            </p>
            
            <div className="text-gray-700 font-medium text-sm leading-relaxed whitespace-pre-line space-y-4">
              {selectedArticle.content}
            </div>
          </div>
        </div>
      )}

      {/* 16. FOOTER */}
      <footer style={{ borderTopColor: brandPrimary }} className="bg-gray-900 pt-20 pb-10 border-t-4 relative z-10">
        <div className={`${MAX_W} px-4 mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div style={{ backgroundColor: brandPrimary }} className="w-10 h-10 text-white rounded-lg flex items-center justify-center">
                  <Gavel size={24} />
                </div>
                <div className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-tighter text-white">
                  Platform<span style={{ color: brandPrimary }}>BDS</span>
                </div>
              </div>
              <p className="text-gray-400 font-medium mb-6">
                Nền tảng đấu giá bất động sản trực tuyến hàng đầu Việt Nam. Mang lại sự minh bạch, an toàn và hiệu quả cho mọi giao dịch.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Facebook size={18}/></div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Twitter size={18}/></div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-80 transition-colors cursor-pointer"><Instagram size={18}/></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase tracking-wider mb-6">Liên Hệ</h3>
              <ul className="space-y-4 text-gray-400 font-medium text-sm">
                <li className="flex items-start gap-3"><MapPin size={18} style={{ color: brandAccent }} className="shrink-0 mt-0.5" /> 123 Đường Đấu Giá, Phường Bình An, Quận 2, TP.HCM</li>
                <li className="flex items-center gap-3"><Phone size={18} style={{ color: brandAccent }} className="shrink-0" /> 1900 6868 (Hotline)</li>
                <li className="flex items-center gap-3"><Mail size={18} style={{ color: brandAccent }} className="shrink-0" /> contact@auctionbds.vn</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase tracking-wider mb-6">Liên Kết Nhanh</h3>
              <ul className="space-y-3 text-gray-400 font-medium text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Trang chủ</button></li>
                <li><button onClick={() => navigateTo('auctions')} className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Sàn đấu giá</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Về chúng tôi</button></li>
                <li><button onClick={() => navigateTo('news')} className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Tin tức & Sự kiện</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase tracking-wider mb-6">Chính Sách</h3>
              <ul className="space-y-3 text-gray-400 font-medium text-sm">
                <li><button className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Quy chế hoạt động</button></li>
                <li><button className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Chính sách bảo mật</button></li>
                <li><button className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Cơ chế giải quyết tranh chấp</button></li>
                <li><button className="hover:opacity-80 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Hướng dẫn thanh toán</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium">© 2026 PlatformBDS. Bản quyền thuộc về Công ty CP Đấu Giá BĐS.</p>
            <div className="flex gap-4 text-sm text-gray-500 font-medium">
              <span>Được chứng nhận bởi Bộ Công Thương</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
