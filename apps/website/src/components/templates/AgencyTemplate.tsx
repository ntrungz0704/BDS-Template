import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  ChevronDown,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Play,
  Send,
  Home,
  Users,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Award,
  Search,
  Key,
  TrendingUp,
  Gift,
  Calendar,
  Maximize,
  Bed,
  Bath,
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Mail
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

const COLORS = {
  bg: '#FDF2F8', 
  primary: '#BE185D', 
  accent: '#F43F5E', 
  text: '#111827',
  textMuted: '#4B5563',
  white: '#FFFFFF',
  lightPink: '#FCE7F3'
};

const FONTS = {
  heading: "'Plus Jakarta Sans', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
};

// ----------------------------------------------------
// MOCK DATA ELEVATED TO FILE SCOPE (6+ Real Items)
// ----------------------------------------------------

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Vinhomes Grand Park',
    location: 'Quận 9, TP.HCM',
    area: 'Quận 9',
    priceText: 'Từ 2.5 Tỷ',
    priceNumeric: 2.5,
    bedrooms: 2,
    size: 65,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    tag: 'Hot Nhất',
    description: 'Căn hộ hiện đại thuộc phân khu The Rainbow, đầy đủ tiện ích chuẩn Vinhomes với công viên 36ha hàng đầu Đông Nam Á. Thích hợp cho gia đình trẻ muốn tìm không gian sống tiện nghi, thoáng đãng.',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      size: '65 m²',
      legal: 'Sổ hồng riêng',
      direction: 'Đông Nam',
      floor: 'Tầng 15'
    }
  },
  {
    id: 2,
    title: 'Masteri Centre Point',
    location: 'Quận 9, TP.HCM',
    area: 'Quận 9',
    priceText: 'Từ 3.2 Tỷ',
    priceNumeric: 3.2,
    bedrooms: 2,
    size: 72,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
    ],
    tag: 'Sắp Bàn Giao',
    description: 'Dự án căn hộ khép kín cao cấp bậc nhất tại trung tâm đại đô thị Vinhomes Grand Park, bàn giao trang thiết bị cao cấp từ các thương hiệu hàng đầu thế giới như Kohler, Hafele.',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      size: '72 m²',
      legal: 'Sổ hồng lâu dài',
      direction: 'Nam',
      floor: 'Tầng 20'
    }
  },
  {
    id: 3,
    title: 'The Global City',
    location: 'Quận 2, TP.HCM',
    area: 'Quận 2',
    priceText: 'Từ 15.5 Tỷ',
    priceNumeric: 15.5,
    bedrooms: 4,
    size: 120,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ],
    tag: 'Siêu Cấp',
    description: 'Khu đô thị biểu tượng Đông Nam Á được thiết kế bởi Foster + Partners. Đầy đủ các tiện ích như kênh đào nhạc nước lớn nhất Đông Nam Á, trung tâm thương mại hạng sang, công viên ven sông tuyệt đẹp.',
    specifications: {
      bedrooms: 4,
      bathrooms: 4,
      size: '120 m²',
      legal: 'Hợp đồng mua bán',
      direction: 'Tây Nam',
      floor: 'Nhà phố thương mại (5 tầng)'
    }
  },
  {
    id: 4,
    title: 'Sunrise City',
    location: 'Quận 7, TP.HCM',
    area: 'Quận 7',
    priceText: 'Từ 4.5 Tỷ',
    priceNumeric: 4.5,
    bedrooms: 3,
    size: 99,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    ],
    tag: 'Giá Tốt',
    description: 'Căn hộ Sunrise City đối diện Lotte Mart Quận 7, giao thông thuận tiện về trung tâm Quận 1. Khu căn hộ an ninh 24/7 với hồ bơi tràn bờ rộng lớn, phòng gym hiện đại và nhiều quán cafe cao cấp.',
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      size: '99 m²',
      legal: 'Sổ hồng sẵn',
      direction: 'Đông',
      floor: 'Tầng 25'
    }
  },
  {
    id: 5,
    title: 'Eco Green Saigon',
    location: 'Quận 7, TP.HCM',
    area: 'Quận 7',
    priceText: 'Từ 3.8 Tỷ',
    priceNumeric: 3.8,
    bedrooms: 2,
    size: 75,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'
    ],
    tag: 'View Đẹp',
    description: 'Căn hộ góc 2 phòng ngủ view trực diện công viên Hương Tràm 22ha và cầu Phú Mỹ lộng lẫy về đêm. Nội thất bàn giao cao cấp liền tường nhập khẩu châu Âu, tủ bếp gỗ chống ẩm, điều hòa multi âm trần.',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      size: '75 m²',
      legal: 'Sổ hồng riêng',
      direction: 'Đông Bắc',
      floor: 'Tầng 12'
    }
  },
  {
    id: 6,
    title: 'Thảo Điền Green',
    location: 'Quận 2, TP.HCM',
    area: 'Quận 2',
    priceText: 'Từ 6.8 Tỷ',
    priceNumeric: 6.8,
    bedrooms: 2,
    size: 83,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    ],
    tag: 'Mới Bàn Giao',
    description: 'Căn hộ cao cấp ven sông Sài Gòn tại bán đảo Thảo Điền, Quận 2. Không gian sống yên bình, trong lành giữa lòng đô thị với cộng đồng cư dân văn minh, dân trí cao, nhiều trường học quốc tế kế bên.',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      size: '83 m²',
      legal: 'Hợp đồng mua bán',
      direction: 'Đông Nam',
      floor: 'Tầng 18'
    }
  },
  {
    id: 7,
    title: 'Empire City Thủ Thiêm',
    location: 'Quận 2, TP.HCM',
    area: 'Quận 2',
    priceText: 'Từ 11.5 Tỷ',
    priceNumeric: 11.5,
    bedrooms: 3,
    size: 127,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    ],
    tag: 'Đẳng Cấp',
    description: 'Nằm tại phân khu lõi của Khu đô thị mới Thủ Thiêm, tầm nhìn panorama ôm trọn sông Sài Gòn và Quận 1 sầm uất. Đầy đủ tiện ích tiêu chuẩn resort 5 sao dành cho giới thượng lưu.',
    specifications: {
      bedrooms: 3,
      bathrooms: 3,
      size: '127 m²',
      legal: 'Sổ hồng lâu dài',
      direction: 'Tây Bắc',
      floor: 'Tầng 28'
    }
  },
  {
    id: 8,
    title: 'Vinhomes Central Park',
    location: 'Bình Thạnh, TP.HCM',
    area: 'Bình Thạnh',
    priceText: 'Từ 5.2 Tỷ',
    priceNumeric: 5.2,
    bedrooms: 2,
    size: 80,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    ],
    tag: 'Ưa Chuộng',
    description: 'Tọa lạc tại khu Tân Cảng, sở hữu công viên ven sông 14ha lớn nhất thành phố. Giao thông thuận tiện qua các quận trung tâm bằng cả đường bộ, đường thủy và hệ thống đường sắt đô thị Metro số 1.',
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      size: '80 m²',
      legal: 'Sổ hồng riêng',
      direction: 'Đông Bắc',
      floor: 'Tầng 35'
    }
  }
];

const MOCK_NEWS = [
  {
    id: 1,
    title: 'Dự báo thị trường BĐS cuối năm: Phân khúc nào lên ngôi?',
    category: 'Thị Trường',
    date: '10/07/2026',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    summary: 'Lãi suất hạ nhiệt kéo theo dòng tiền thông minh đổ vào các dự án đáp ứng nhu cầu thực, pháp lý chuẩn.',
    content: 'Trong bối cảnh nền kinh tế đang dần phục hồi ổn định, lãi suất cho vay mua nhà tại các ngân hàng thương mại đã giảm sâu xuống mức kỷ lục trong vòng 10 năm qua. Dòng tiền nhàn rỗi đang có xu hướng dịch chuyển mạnh mẽ từ gửi tiết kiệm sang bất động sản. Tuy nhiên, thay vì đầu cơ lướt sóng như trước, các nhà đầu tư hiện nay tập trung vào những sản phẩm phục vụ nhu cầu thực như căn hộ chung cư trung và cao cấp, nhà phố có pháp lý rõ ràng và tiến độ thi công đảm bảo. Các chuyên gia nhận định phân khúc căn hộ tầm trung tại Quận 9, Quận 7 sẽ dẫn dắt thị trường trong giai đoạn cuối năm 2026.',
    author: 'Nguyễn Văn Trung'
  },
  {
    id: 2,
    title: 'Quy hoạch đường Vành đai 3 TP.HCM: Đòn bẩy cho BĐS khu Đông',
    category: 'Quy Hoạch',
    date: '08/07/2026',
    img: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=800&q=80',
    summary: 'Tiến độ xây dựng Vành đai 3 đang được đẩy mạnh, dự kiến thông xe kỹ thuật vào năm 2027 giúp kết nối liên vùng nhanh chóng.',
    content: 'Đường Vành đai 3 đi qua địa phận TP.HCM, Bình Dương, Đồng Nai, Long An được xem là siêu dự án hạ tầng giao thông trọng điểm quốc gia. Việc đẩy nhanh tiến độ thi công dự án này đang tạo ra lực đẩy vô cùng lớn cho các khu đô thị vệ tinh nằm dọc tuyến đường, đặc biệt là khu Đông TP.HCM (Thủ Đức, Quận 9). Thời gian di chuyển từ các vùng ven về trung tâm thành phố sẽ được rút ngắn đáng kể, kích thích sự hình thành của các cụm dân cư mới chất lượng cao.',
    author: 'Trần Minh Tuấn'
  },
  {
    id: 3,
    title: 'Kinh nghiệm mua căn hộ chung cư lần đầu tránh rủi ro pháp lý',
    category: 'Hướng Dẫn',
    date: '05/07/2026',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    summary: 'Những giấy tờ pháp lý tối quan trọng người mua cần kiểm tra kỹ lưỡng trước khi đặt bút ký hợp đồng mua bán.',
    content: 'Mua căn hộ chung cư là quyết định tài chính lớn của nhiều gia đình trẻ. Để tránh những tranh chấp pháp lý không đáng có sau này, người mua cần trang bị các kiến thức cơ bản về pháp lý dự án. Đầu tiên, hãy yêu cầu chủ đầu tư cung cấp Quyết định giao đất, Giấy chứng nhận quyền sử dụng đất của dự án, Quyết định phê duyệt quy hoạch chi tiết 1/500 và đặc biệt là Giấy phép xây dựng. Tiếp theo, kiểm tra xem căn hộ của bạn đã có thông báo đủ điều kiện bán nhà ở hình thành trong tương lai của Sở Xây dựng chưa, và ngân hàng nào đứng ra bảo lãnh tiến độ cho dự án đó.',
    author: 'Nguyễn Văn Trung'
  },
  {
    id: 4,
    title: 'Xu hướng thiết kế căn hộ xanh - Sống organic giữa lòng phố thị',
    category: 'Kiến Trúc',
    date: '01/07/2026',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    summary: 'Không chỉ là nơi để ở, căn hộ hiện đại cần mang lại không gian thư giãn, gần gũi thiên nhiên và tối ưu năng lượng.',
    content: 'Sau đại dịch, xu hướng lựa chọn không gian sống chú trọng đến sức khỏe thể chất và tinh thần ngày càng lên ngôi. Các thiết kế căn hộ xanh với ban công rộng mở, hệ thống thông gió tự nhiên tốt, ứng dụng vật liệu xây dựng thân thiện môi trường và tiết kiệm năng lượng đang trở thành tiêu chuẩn mới của phân khúc hạng sang. Việc tích hợp mảng xanh vào ban công hay lô gia giúp thanh lọc không khí, giảm stress hiệu quả sau những giờ làm việc căng thẳng.',
    author: 'Lê Hoài Nam'
  },
  {
    id: 5,
    title: 'Cơ hội sở hữu nhà Sài Gòn nhờ chính sách hỗ trợ tài chính tốt',
    category: 'Tài Chỉ',
    date: '28/06/2026',
    img: 'https://images.unsplash.com/photo-1524806346375-23d06e8e85cd?w=800&q=80',
    summary: 'Các chủ đầu tư liên tục tung ra chính sách thanh toán kéo dài, hỗ trợ lãi suất 0% giúp giảm áp lực tài chính cho người mua.',
    content: 'Để kích cầu thị trường, nhiều chủ đầu tư lớn đang liên kết với các tổ chức tín dụng để triển khai các gói giải pháp tài chính vô cùng hấp dẫn. Điển hình như chính sách chỉ cần thanh toán 10% đến 20% giá trị căn hộ là có thể ký ngay hợp đồng mua bán, phần còn lại được ngân hàng giải ngân và chủ đầu tư hỗ trợ lãi suất 0% cùng ân hạn nợ gốc lên đến 2-3 năm. Điều này giúp khách hàng có thêm thời gian chuẩn bị nguồn tài chính mà không lo gánh nặng lãi suất hàng tháng.',
    author: 'Nguyễn Văn Trung'
  },
  {
    id: 6,
    title: 'Phong thủy căn hộ chung cư: Chọn hướng nhà theo tuổi chuẩn nhất',
    category: 'Phong Thủy',
    date: '25/06/2026',
    img: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&q=80',
    summary: 'Cách xác định hướng ban công, hướng cửa chính và bố trí phòng thờ, bếp ăn hợp phong thủy đón tài lộc.',
    content: 'Khác với nhà đất, phong thủy căn hộ chung cư có những đặc thù riêng cần lưu ý. Nhiều người tranh cãi việc lấy hướng cửa chính hay hướng ban công/cửa sổ làm hướng chính của căn hộ. Theo đa số các chuyên gia phong thủy uy tín, hướng căn hộ nên được xác định theo hướng ban công hoặc khu vực đón ánh sáng, gió tự nhiên nhiều nhất, bởi đây chính là nơi nạp khí chủ yếu cho toàn bộ không gian sống. Bên cạnh đó, việc bố trí bếp nấu xa khu vệ sinh và đặt giường ngủ tránh đối diện cửa phòng cũng là những nguyên tắc cơ bản giúp gia đạo bình an.',
    author: 'Phạm Thành Công'
  }
];

const ABOUT_MILESTONES = [
  { year: '2016', title: 'Khởi đầu hành trình', desc: 'Bắt đầu hoạt động với vai trò cộng tác viên tư vấn độc lập tại thị trường TP.HCM, tập trung học hỏi và xây dựng uy tín cá nhân.' },
  { year: '2018', title: 'Thành lập văn phòng', desc: 'Chính thức thành lập văn phòng Real Estate Expert tại Quận 7, quy tụ 5 cộng sự tâm huyết chuyên nghiệp.' },
  { year: '2020', title: 'Mở rộng thị trường', desc: 'Mở rộng phạm vi hoạt động ra toàn bộ khu Đông và khu Nam TP.HCM, ký kết phân phối chính thức cho 5 chủ đầu tư lớn.' },
  { year: '2022', title: 'Vinh danh Top 10', desc: 'Đạt giải thưởng Chuyên viên tư vấn xuất sắc khu vực phía Nam do Hiệp hội Bất Động Sản Việt Nam trao tặng.' },
  { year: '2024', title: 'Chuyển đổi công nghệ', desc: 'Ứng dụng công nghệ 3D Virtual Tour và Live Video định hình phong cách xem nhà thời đại số.' },
  { year: '2026', title: 'Đại lý phân phối F1', desc: 'Trở thành đại lý phân phối chiến lược F1 của Vinhomes, Masterise Homes, Novaland với doanh số dẫn đầu.' }
];

const LEADERSHIP = [
  {
    name: 'Nguyễn Văn Trung',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    bio: '10+ năm kinh nghiệm thực chiến BĐS, chuyên gia định giá và hoạch định chiến lược đầu tư tài chính.'
  },
  {
    name: 'Trần Thị Thu Thảo',
    role: 'Giám Đốc Pháp Lý',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bio: 'Cựu luật sư chuyên ngành luật đất đai, bảo đảm an toàn pháp lý tuyệt đối cho mọi giao dịch.'
  },
  {
    name: 'Phạm Minh Tuấn',
    role: 'Trưởng Phòng Dự Án',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    bio: 'Kết nối sâu rộng với các chủ đầu tư, mang lại giỏ hàng ngoại giao độc quyền tốt nhất cho khách hàng.'
  }
];

const CORE_VALUES = [
  {
    id: 'uy-tin',
    title: 'UY TÍN HÀNG ĐẦU',
    desc: 'Chúng tôi coi chữ Tín là danh dự của chính mình. Cam kết cung cấp thông tin trung thực, chính xác và đầy đủ, không thổi phồng giá trị, không vẽ dự án ảo.',
    icon: 'Shield'
  },
  {
    id: 'tan-tam',
    title: 'TẬN TÂM PHỤC VỤ',
    desc: 'Lấy khách hàng làm trung tâm, lắng nghe và thấu hiểu nhu cầu thực tế của từng gia đình để đưa ra giải pháp an cư và đầu tư tối ưu nhất.',
    icon: 'Users'
  },
  {
    id: 'chuyen-nghiep',
    title: 'CHUYÊN NGHIỆP',
    desc: 'Quy trình tư vấn rõ ràng, tác phong làm việc nhanh gọn, hỗ trợ mọi thủ tục pháp lý, ngân hàng trọn gói từ A-Z giúp tiết kiệm tối đa thời gian.',
    icon: 'Award'
  },
  {
    id: 'hieu-qua',
    title: 'HIỆU QUẢ VƯỢT TRỘI',
    desc: 'Không chỉ giúp an cư, chúng tôi còn đồng hành cùng nhà đầu tư phân tích dòng tiền, dự báo sóng thị trường để tối ưu tỷ suất sinh lời.',
    icon: 'TrendingUp'
  }
];

const MOCK_GALLERY = [
  { id: 1, category: 'Interior', title: 'Phòng khách Masteri Centre Point', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 2, category: 'Interior', title: 'Phòng ngủ master phong cách tối giản Nhật Bản', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80' },
  { id: 3, category: 'Interior', title: 'Khu vực bếp sang trọng tích hợp quầy bar', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80' },
  { id: 4, category: 'Exterior', title: 'Hồ bơi vô cực ngắm trọn sông Sài Gòn', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 5, category: 'Exterior', title: 'Tổng thể nhà phố thương mại The Global City', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 6, category: 'Luxury', title: 'Biệt thự đơn lập ven sông đắt giá', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { id: 7, category: 'Amenities', title: 'Công viên cây xanh nội khu 36ha Vinhomes', img: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8c5c8?w=800&q=80' },
  { id: 8, category: 'Amenities', title: 'Khu vui chơi vận động ngoài trời cho trẻ em', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80' },
  { id: 9, category: 'Luxury', title: 'Sảnh tiếp khách chuẩn 5 sao sang trọng', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { id: 10, category: 'Interior', title: 'Phòng tắm cao cấp bàn giao Kohler', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' }
];

export default function AgencyTemplate({ template, viewport = 'desktop', initialPage = 'home', company, theme: dynamicTheme, projects, posts }: TemplateProps) {
  const COLORS = {
    bg: dynamicTheme?.backgroundColor || '#FDF2F8', 
    primary: dynamicTheme?.primaryColor || '#BE185D', 
    accent: dynamicTheme?.accentColor || '#F43F5E', 
    text: dynamicTheme?.textColor || '#111827',
    textMuted: dynamicTheme?.textMutedColor || '#4B5563',
    white: '#FFFFFF',
    lightGray: '#F3F4F6',
    lightPink: '#FCE7F3'
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
    : ((globalThis as any).__mock_projects_ref || []);

  // Shadowing variables
  const MOCK_PROJECTS: any = activeProjects;

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = viewport === 'mobile';
  const isSmall = viewport === 'mobile' || viewport === 'tablet';

  // ----------------------------------------------------
  // INTERACTIVE STATES Setup
  // ----------------------------------------------------
  
  // Projects Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterArea, setFilterArea] = useState('All');
  const [filterBedrooms, setFilterBedrooms] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');

  // Project Details Modal states
  const [selectedProject, setSelectedProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);
  const [activeModalImgIndex, setActiveModalImgIndex] = useState(0);
  const [projectInquirySubmitted, setProjectInquirySubmitted] = useState(false);
  const [projectInquiryForm, setProjectInquiryForm] = useState({ name: '', phone: '' });

  // Gallery Tab & Lightbox states
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // News Search & Modal states
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<typeof MOCK_NEWS[0] | null>(null);

  // Contact Page states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    message: ''
  });

  // Hero Lead Form states
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);
  const [heroForm, setHeroForm] = useState({ name: '', phone: '', need: 'Mua để ở' });

  // Mid-page discount subscription state
  const [discountSubmitted, setDiscountSubmitted] = useState(false);
  const [discountPhone, setDiscountPhone] = useState('');

  // Newsletter subscription states
  const [subEmail, setSubEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  // Core Value active tab state
  const [activeValueTab, setActiveValueTab] = useState('uy-tin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'about', label: 'Về Tôi' },
    { id: 'gallery', label: 'Thư Viện' },
    { id: 'news', label: 'Tin Tức' },
    { id: 'contact', label: 'Liên Hệ' }
  ];

  // Helper to open project details modal
  const openProjectDetails = (proj: typeof MOCK_PROJECTS[0]) => {
    setSelectedProject(proj);
    setActiveModalImgIndex(0);
    setProjectInquirySubmitted(false);
    setProjectInquiryForm({ name: '', phone: '' });
  };

  // Helper to open news details modal
  const openArticleDetails = (art: typeof MOCK_NEWS[0]) => {
    setSelectedArticle(art);
  };

  // 1. URGENCY BAR
  const renderUrgencyBar = () => (
    <div style={{ backgroundColor: COLORS.primary, fontFamily: FONTS.body }} className="text-white text-xs sm:text-sm font-bold py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 z-50 relative">
      <span className="text-center">🔥 CƠ HỘI DUY NHẤT: GIẢM NGAY 5% CHO 3 KHÁCH HÀNG CHỐT CỌC TRONG TUẦN NÀY!</span>
      <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">
        <Clock className="w-4 h-4" />
        <span>Còn lại: 03 Ngày 14:25:30</span>
      </div>
    </div>
  );

  // 2. HEADER
  const renderHeader = () => (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-[#FDF2F8] py-4 sm:py-6'}`}
      style={{ fontFamily: FONTS.heading }}
    >
      <div className={`${MAX_W} px-4 flex justify-between items-center`}>
        <div 
          className="flex items-center gap-2 cursor-pointer text-left"
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div style={{ backgroundColor: COLORS.primary }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0">
            {(company?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ color: COLORS.primary }} className="font-extrabold text-xl sm:text-2xl tracking-tight leading-none uppercase">
              {company?.name || template?.name || 'TRUNG NGUYEN'}
            </h1>
            <p style={{ color: COLORS.accent }} className="text-xs font-bold uppercase tracking-widest mt-1">
              {company?.slogan || 'Real Estate Expert'}
            </p>
          </div>
        </div>
        
        {!isSmall && (
          <nav className="flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ 
                  color: currentPage === item.id ? COLORS.primary : COLORS.text,
                  fontWeight: currentPage === item.id ? 800 : 600
                }}
                className="hover:text-[#BE185D] transition-colors text-sm uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isSmall && (
            <a 
              href={`tel:${company?.phone || '0983312219'}`} 
              style={{ backgroundColor: COLORS.accent }}
              className="hidden lg:flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              {company?.phone || '0983 312 219'}
            </a>
          )}
          {isSmall && (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: COLORS.primary }}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isSmall && isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 p-4 flex flex-col gap-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ color: currentPage === item.id ? COLORS.primary : COLORS.text }}
              className="text-left py-2 font-bold uppercase tracking-wide border-b border-gray-50 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <a href="tel:0909123456" style={{ backgroundColor: COLORS.primary }} className="mt-4 flex items-center justify-center gap-2 text-white p-3 rounded-xl font-bold">
            <Phone className="w-5 h-5" /> Gọi Ngay: 0909.123.456
          </a>
        </div>
      )}
    </header>
  );

  // 3. HERO
  const renderHero = () => {
    const handleHeroSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!heroForm.name || !heroForm.phone) return;
      setHeroFormSubmitted(true);
    };

    return (
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current" style={{ color: COLORS.primary }}>
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className={`${MAX_W} px-4 flex flex-col lg:flex-row gap-12 items-center relative z-10`}>
          <div className="lg:w-1/2 text-center lg:text-left">
            <div style={{ color: COLORS.accent }} className="font-extrabold uppercase tracking-widest text-sm mb-4 flex items-center justify-center lg:justify-start gap-2">
              <Star className="w-4 h-4 fill-current" /> Top 1% Chuyên Viên Tư Vấn
            </div>
            <h2 style={{ fontFamily: FONTS.heading, color: COLORS.text }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Sở Hữu Bất Động Sản Mơ Ước <span style={{ color: COLORS.primary }}>Dễ Dàng Hơn Bao Giờ Hết</span>
            </h2>
            <p style={{ fontFamily: FONTS.body, color: COLORS.textMuted }} className="text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Kinh nghiệm 10+ năm thực chiến. Giúp hơn 500+ khách hàng an cư & đầu tư sinh lời vượt trội. Ký gửi, mua bán nhanh chóng, bảo mật.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => { setCurrentPage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ backgroundColor: COLORS.primary }} 
                className="text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-pink-500/30"
              >
                Khám Phá Dự Án <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:border-gray-300 transition-all"
              >
                <MessageSquare className="w-5 h-5" /> Nhận Tư Vấn Ngay
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-bold text-gray-500">
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Pháp lý chuẩn</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Giá gốc CĐT</div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-md mx-auto relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl" style={{ backgroundColor: COLORS.primary }}></div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 relative shadow-xl border border-pink-100">
              {heroFormSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng Ký Thành Công!</h3>
                  <p className="text-gray-600 text-sm max-w-xs mx-auto mb-6">
                    Cảm ơn anh/chị <strong>{heroForm.name}</strong>. Nguyễn Trung sẽ chuẩn bị báo giá phù hợp và gọi điện hỗ trợ trong vòng 5 phút!
                  </p>
                  <button 
                    onClick={() => { setHeroFormSubmitted(false); setHeroForm({ name: '', phone: '', need: 'Mua để ở' }); }}
                    style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                    className="border-2 px-6 py-2 rounded-xl font-bold hover:bg-pink-50 transition-all"
                  >
                    Đăng ký lại
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: FONTS.heading, color: COLORS.primary }} className="text-2xl font-extrabold mb-2 text-center">Đăng Ký Nhận Báo Giá</h3>
                  <p className="text-gray-500 text-sm text-center mb-6">Ưu đãi cực sốc đang chờ bạn!</p>
                  <form onSubmit={handleHeroSubmit} className="flex flex-col gap-4">
                    <input 
                      type="text" 
                      placeholder="Họ và tên của bạn" 
                      required
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-medium text-gray-800" 
                    />
                    <input 
                      type="tel" 
                      placeholder="Số điện thoại" 
                      required
                      value={heroForm.phone}
                      onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-medium text-gray-800" 
                    />
                    <select 
                      value={heroForm.need}
                      onChange={(e) => setHeroForm({ ...heroForm, need: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-gray-700 font-medium appearance-none"
                    >
                      <option>Mua để ở</option>
                      <option>Mua đầu tư</option>
                      <option>Ký gửi bán lại</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: COLORS.accent }} className="w-full text-white font-extrabold py-4 rounded-xl shadow-lg mt-2 hover:bg-opacity-90 transition-all text-lg flex justify-center items-center gap-2">
                      <Send className="w-5 h-5" /> Gửi Yêu Cầu Ngay
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-2">Thông tin của bạn được bảo mật tuyệt đối.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 4. FEATURED PROJECTS
  const renderFeaturedProjects = () => {
    // Show top 3 projects as featured
    const projects = MOCK_PROJECTS.slice(0, 3);

    return (
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 style={{ color: COLORS.primary, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Dự Án Nổi Bật</h2>
            <p className="text-gray-600">Những siêu phẩm được săn đón nhất thị trường. Cơ hội đầu tư sinh lời không thể bỏ lỡ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="group rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative bg-white flex flex-col">
                <div className="absolute top-4 right-4 z-10">
                  <span style={{ backgroundColor: COLORS.accent }} className="text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow-md animate-pulse">
                    {proj.tag}
                  </span>
                </div>
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-1">{proj.title}</h3>
                    <div className="flex items-center text-gray-200 text-sm gap-1">
                      <MapPin className="w-4 h-4" /> {proj.location}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 font-medium">Giá bán:</span>
                    <span style={{ color: COLORS.primary }} className="text-xl font-extrabold">{proj.priceText}</span>
                  </div>
                  <button 
                    onClick={() => openProjectDetails(proj)}
                    style={{ color: COLORS.primary, borderColor: COLORS.primary }} 
                    className="w-full py-3 rounded-xl font-bold border-2 hover:bg-pink-50 transition-colors mt-auto"
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 5. WHY BUY NOW
  const renderWhyBuyNow = () => {
    const reasons = [
      { icon: <TrendingUp className="w-8 h-8 text-white" />, title: 'Đón Sóng Hạ Tầng', desc: 'Cao tốc, Vành đai 3 đang hoàn thiện, giá trị BĐS khu Đông tăng phi mã.' },
      { icon: <Shield className="w-8 h-8 text-white" />, title: 'Lãi Suất Đáy', desc: 'Ngân hàng hỗ trợ vay 70%, ân hạn nợ gốc lên đến 24 tháng.' },
      { icon: <Gift className="w-8 h-8 text-white" />, title: 'Quà Tặng Khủng', desc: 'Chiết khấu tới 15% cho khách thanh toán nhanh trong tháng này.' },
      { icon: <Clock className="w-8 h-8 text-white" />, title: 'Quỹ Căn Hữu Hạn', desc: 'Giỏ hàng những căn góc view đẹp nhất đang cạn kiệt từng ngày.' }
    ];
    
    return (
      <section className="py-20" style={{ backgroundColor: COLORS.bg }}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">
              Tại Sao Nên Xuống Tiền <span style={{ color: COLORS.primary }}>NGAY LÚC NÀY?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all border border-pink-50 group">
                <div style={{ backgroundColor: COLORS.accent }} className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform">
                  {r.icon}
                </div>
                <h3 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-lg font-extrabold mb-3">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 6. DISCOUNTS & POLICIES
  const renderDiscounts = () => {
    const handleDiscountSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!discountPhone) return;
      setDiscountSubmitted(true);
    };

    return (
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="bg-gradient-to-br from-[#BE185D] to-[#F43F5E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: FONTS.heading }}>Chính Sách Bán Hàng SIÊU ƯU ĐÃI</h2>
                <p className="text-white/80 text-lg mb-8">Chỉ áp dụng cho 5 giao dịch đầu tiên trong tuần này. Cơ hội có 1-0-2!</p>
                <ul className="space-y-4 font-bold text-lg">
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-300" /> Tặng Gói Nội Thất Lên Tới 500 Triệu</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-300" /> Miễn Phí Quản Lý Vận Hành 3 Năm</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-green-300" /> Hỗ Trợ Vay Ngân Hàng, Lãi Suất 0% trong 24 Tháng</li>
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl text-center">
                  {discountSubmitted ? (
                    <div className="py-8">
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Đăng Ký Thành Công!</h4>
                      <p className="text-gray-500 text-sm mb-4">Mã chiết khấu ưu đãi đã gửi qua số điện thoại: <strong>{discountPhone}</strong></p>
                      <button 
                        onClick={() => { setDiscountSubmitted(false); setDiscountPhone(''); }}
                        style={{ color: COLORS.primary }}
                        className="text-sm font-bold hover:underline"
                      >
                        Đổi số điện thoại nhận mã
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleDiscountSubmit}>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Đăng ký nhận chính sách</div>
                      <h3 className="text-2xl font-black text-[#BE185D] mb-6">GIỮ CHỖ & NHẬN ƯU ĐÃI</h3>
                      <input 
                        type="tel" 
                        placeholder="Nhập số điện thoại của bạn" 
                        required
                        value={discountPhone}
                        onChange={(e) => setDiscountPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 mb-4 text-center text-lg font-bold focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-gray-800" 
                      />
                      <button type="submit" style={{ backgroundColor: COLORS.accent }} className="w-full text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-opacity-90 transition-all text-lg animate-pulse">
                        NHẬN ƯU ĐÃI NGAY
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 7. ABOUT AGENT
  const renderAboutAgent = () => (
    <section className="py-20" style={{ backgroundColor: COLORS.bg }}>
      <div className={`${MAX_W} px-4 flex flex-col lg:flex-row items-center gap-16`}>
        <div className="lg:w-1/2 relative w-full">
          <div className="absolute inset-0 bg-[#BE185D] rounded-[3rem] rotate-3 scale-105 opacity-20"></div>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" alt="Agent" className="relative z-10 w-full h-[500px] object-cover rounded-[3rem] shadow-2xl" />
          <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl z-20 shadow-xl border border-white/50 text-center">
            <h4 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-xl font-extrabold">Nguyễn Văn Trung</h4>
            <p style={{ color: COLORS.primary }} className="font-bold text-sm">Real Estate Expert / Founder</p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-6">Người Đồng Hành Đáng Tin Cậy Của Bạn</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Với hơn 10 năm kinh nghiệm trong lĩnh vực tư vấn bất động sản cao cấp tại TP.HCM, tôi hiểu rằng mỗi quyết định mua nhà không chỉ là một khoản đầu tư lớn, mà còn là nền tảng cho tổ ấm tương lai và cơ hội bứt phá tài sản lâu dài.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Giải thưởng uy tín</h4>
                <p className="text-gray-500 text-sm">Top 10 Chuyên viên tư vấn xuất sắc khu vực miền Nam</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Khách hàng tin cậy</h4>
                <p className="text-gray-500 text-sm">Hơn 500+ gia đình đã an cư và sinh lời vượt kỳ vọng</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ backgroundColor: COLORS.primary }} className="text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all">
              Tìm Hiểu Thêm
            </button>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#BE185D] hover:shadow-md transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 8. STATS
  const renderStats = () => (
    <section className="py-16 bg-white border-y border-pink-50">
      <div className={`${MAX_W} px-4`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '10+', label: 'Năm Kinh Nghiệm' },
            { num: '500+', label: 'Giao Dịch Thành Công' },
            { num: '98%', label: 'Khách Hàng Hài Lòng' },
            { num: '50+', label: 'Dự Án Độc Quyền' }
          ].map((stat, i) => (
             <div key={i} className="text-center">
               <div style={{ color: COLORS.primary, fontFamily: FONTS.heading }} className="text-4xl sm:text-5xl font-extrabold mb-2">{stat.num}</div>
               <div className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 9. AMENITIES / SERVICES
  const renderServices = () => {
    const services = [
      { icon: <Search />, title: 'Tìm Kiếm BĐS Hợp Nhu Cầu', desc: 'Sàng lọc thông tin giỏ hàng khổng lồ để tìm ra căn nhà có vị trí và ngân sách phù hợp nhất.' },
      { icon: <Key />, title: 'Trọn Gói Thủ Tục Pháp Lý', desc: 'Hỗ trợ kiểm tra quy hoạch, soạn thảo hợp đồng đặt cọc, thực hiện chuyển nhượng, sang tên sổ đỏ an toàn.' },
      { icon: <TrendingUp />, title: 'Đầu Tư Sinh Lời Cao', desc: 'Phân tích tài chính chuyên sâu, đánh giá tiềm năng tăng giá và khả năng thanh khoản của từng dự án.' },
      { icon: <Home />, title: 'Ký Gửi Cho Thuê Nhanh', desc: 'Chăm sóc căn hộ, tìm kiếm khách thuê uy tín và vận hành tài sản sinh lời ổn định hàng tháng.' }
    ];
    return (
      <section className="py-20" style={{ backgroundColor: COLORS.bg }}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Dịch Vụ Chuyên Nghiệp</h2>
            <p className="text-gray-600">Đồng hành cùng bạn trong mọi giao dịch bất động sản với sự minh bạch và tận tâm tối đa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all text-center group border border-pink-50">
                <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(s.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 10. GALLERY
  const renderGallery = () => {
    // Show top 3 for home page preview
    const previewImgs = MOCK_GALLERY.slice(0, 3);
    return (
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Hình Ảnh Thực Tế</h2>
            <p className="text-gray-600">Ngắm nhìn không gian sống đẳng cấp, tiện ích tuyệt vời từ các dự án nổi bật đã bàn giao.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewImgs.map((img) => (
              <div 
                key={img.id} 
                onClick={() => setSelectedGalleryImg(img.img)}
                className="rounded-2xl overflow-hidden relative group h-64 cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold p-4 text-center">
                  <div>
                    <Search className="w-8 h-8 mx-auto mb-2" />
                    <span>Xem phóng to</span>
                    <p className="text-xs font-normal text-gray-200 mt-1">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: COLORS.primary, borderColor: COLORS.primary }} className="px-8 py-3 rounded-full font-bold border-2 hover:bg-pink-50 transition-colors inline-flex items-center gap-2">
              Xem Tất Cả Hình Ảnh <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    );
  };

  // 11. TESTIMONIALS
  const renderTestimonials = () => (
    <section className="py-20" style={{ backgroundColor: COLORS.bg }}>
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Khách Hàng Nói Gì?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Anh Tuấn', role: 'Nhà đầu tư (mua 3 căn Vinhomes)', txt: 'Tôi làm việc với Trung đã 4 năm. Trung có khả năng định giá rất sát, báo cáo thị trường chi tiết và luôn tư vấn thật lòng về ưu nhược điểm. Rất an tâm khi giao dịch.' },
            { name: 'Chị Mai Lan', role: 'Cư dân Masteri Centre Point', txt: 'Lần đầu mua chung cư gia đình tôi rất lo lắng về pháp lý. Nhờ sự hỗ trợ tận tình của Trung và đội ngũ, toàn bộ quy trình vay ngân hàng và làm sổ hồng đều được hướng dẫn chu đáo.' },
            { name: 'Anh Hoàng Nam', role: 'Chủ doanh nghiệp', txt: 'Phong cách làm việc nhanh nhẹn, chuyên nghiệp và lịch thiệp. Các sản phẩm Trung giới thiệu luôn có view đẹp, thiết kế sang trọng đúng gu thượng lưu.' }
          ].map((item, i) => (
             <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 relative flex flex-col justify-between">
               <div>
                 <div className="flex text-yellow-400 mb-4">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                 </div>
                 <p className="text-gray-600 mb-6 italic">&ldquo;{item.txt}&rdquo;</p>
               </div>
               <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                 <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-700">
                   {item.name[0]}
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900">{item.name}</h4>
                   <p className="text-xs text-gray-500">{item.role}</p>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 12. PROCESS
  const renderProcess = () => (
    <section className="py-20 bg-white">
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Quy Trình 5 Bước Đơn Giản</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-pink-100 -translate-y-1/2 z-0"></div>
          {[
            { step: '01', title: 'Tiếp Nhận Nhu Cầu' },
            { step: '02', title: 'Sàng Lọc & Gửi Phương Án' },
            { step: '03', title: 'Khảo Sát Thực Tế' },
            { step: '04', title: 'Đàm Phán & Chốt Cọc' },
            { step: '05', title: 'Bàn Giao & Hậu Mãi' }
          ].map((s, i) => (
            <div key={i} className="relative z-10 text-center flex flex-col items-center mb-8 md:mb-0 md:w-1/5">
              <div style={{ backgroundColor: COLORS.white, borderColor: COLORS.primary, color: COLORS.primary }} className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-extrabold mb-4 shadow-lg">
                {s.step}
              </div>
              <h4 className="font-bold text-gray-900 text-sm px-2">{s.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // 13. NEWS HOME PREVIEW
  const renderNewsHome = () => {
    // Show top 3 news
    const previewNews = MOCK_NEWS.slice(0, 3);
    return (
      <section className="py-20" style={{ backgroundColor: COLORS.bg }}>
        <div className={`${MAX_W} px-4`}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Tin Tức Thị Trường</h2>
              <p className="text-gray-600">Cập nhật nhanh nhất biến động bất động sản và lời khuyên hữu ích.</p>
            </div>
            <button onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hidden sm:block text-[#BE185D] font-bold hover:underline">Xem Tất Cả</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewNews.map((news) => (
              <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-pink-50 group flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span style={{ backgroundColor: COLORS.primary }} className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {news.date}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#BE185D] transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{news.summary}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => openArticleDetails(news)}
                    className="flex items-center text-sm font-bold text-gray-800 gap-2 hover:text-[#BE185D] transition-colors"
                  >
                    Đọc tiếp <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 14. FAQ
  const renderFAQ = () => {
    const faqs = [
      { q: 'Người nước ngoài có được mua nhà tại dự án này không?', a: 'Có, theo quy định người nước ngoài có hộ chiếu hợp lệ được sở hữu tối đa 30% số lượng căn hộ trong một tòa nhà chung cư hoặc tối đa 250 căn nhà phố/biệt thự tại một đơn vị hành chính phường.' },
      { q: 'Quy trình và tiến độ thanh toán thông thường như thế nào?', a: 'Thông thường quy trình gồm: Đặt cọc giữ chỗ (50 - 100 triệu), ký HĐ đặt cọc (sau 7-10 ngày đóng 10-15%), ký HĐ mua bán (đóng lũy kế 20-30% tùy dự án), thanh toán theo tiến độ thi công (đóng 5-10% mỗi đợt cách nhau 2-3 tháng) hoặc nhận hỗ trợ ngân hàng giải ngân.' },
      { q: 'Hạn mức vay tối đa của ngân hàng hỗ trợ dự án là bao nhiêu?', a: 'Các ngân hàng liên kết như Techcombank, Vietcombank, MBBank hỗ trợ vay tối đa lên tới 70-80% giá trị căn hộ. Hỗ trợ lãi suất 0% từ 12 đến 24 tháng hoặc đến khi nhận bàn giao nhà.' },
      { q: 'Thời gian bàn giao sổ hồng là bao lâu sau khi nhận nhà?', a: 'Theo luật định và cam kết của các chủ đầu tư uy tín, sổ hồng sẽ được bàn giao trong vòng 12 - 18 tháng kể từ ngày bàn giao căn hộ và quý khách cung cấp đầy đủ hồ sơ cá nhân để làm thủ tục.' }
    ];
    
    return (
      <section className="py-20 bg-white">
        <div className={`${MAX_W} px-4 max-w-3xl mx-auto`}>
          <div className="text-center mb-16">
            <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl sm:text-4xl font-extrabold mb-4">Câu Hỏi Thường Gặp</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-2xl cursor-pointer">
                <summary className="flex justify-between items-center font-bold p-6 text-gray-900 marker:content-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 15. CONTACT CTA
  const renderContactCTA = () => (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      <div className={`${MAX_W} px-4 relative z-10 text-center`}>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: FONTS.heading }}>Bạn Đã Sẵn Sàng Sở Hữu Tổ Ấm?</h2>
        <p className="text-pink-100 text-lg mb-10 max-w-2xl mx-auto">Đừng bỏ lỡ những căn góc đẹp nhất cùng chính sách chiết khấu tốt nhất. Nhấc máy gọi ngay hoặc nhắn Zalo để được tư vấn tận tâm.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:0909123456" style={{ backgroundColor: COLORS.accent }} className="text-white px-10 py-5 rounded-full font-extrabold text-lg shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
            <Phone className="w-6 h-6" /> GỌI NGAY: 0909.123.456
          </a>
          <button 
            onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-white text-[#BE185D] px-10 py-5 rounded-full font-extrabold text-lg shadow-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-6 h-6" /> ĐĂNG KÝ LIÊN HỆ
          </button>
        </div>
      </div>
    </section>
  );

  // 16. NEWSLETTER
  const renderNewsletter = () => {
    const handleSubSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!subEmail) return;
      setSubbed(true);
    };

    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className={`${MAX_W} px-4 text-center max-w-2xl mx-auto`}>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: FONTS.heading }}>Nhận Bản Tin Thị Trường</h3>
          <p className="text-gray-500 mb-6">Đăng ký email để nhận định kỳ phân tích chuyên sâu hàng tháng và các sản phẩm ngộp thanh lý giá tốt.</p>
          {subbed ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Đăng ký nhận bản tin thành công! Cảm ơn bạn.
            </div>
          ) : (
            <form onSubmit={handleSubSubmit} className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BE185D] text-gray-800" 
              />
              <button type="submit" style={{ backgroundColor: COLORS.primary }} className="text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shrink-0">Đăng Ký</button>
            </form>
          )}
        </div>
      </section>
    );
  };

  // 17. FOOTER
  const renderFooter = () => (
    <footer className="bg-gray-900 text-gray-300 py-16" style={{ fontFamily: FONTS.body }}>
      <div className={`${MAX_W} px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12`}>
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div style={{ backgroundColor: COLORS.primary }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xl">T</div>
            <h2 className="text-white font-extrabold text-2xl tracking-tight">TRUNG NGUYEN</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">Chuyên viên tư vấn bất động sản cao cấp, mang lại giá trị thực và giải pháp an cư hoàn hảo lâu dài cho khách hàng.</p>
          <div className="flex gap-4">
             {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => <Icon key={i} className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />)}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Liên Kết</h4>
          <ul className="space-y-3 text-sm">
            {navItems.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Hỗ Trợ</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Chính Sách Bảo Mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều Khoản Sử Dụng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Câu Hỏi Thường Gặp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Quy hoạch 2026</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Thông Tin Liên Hệ</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F43F5E] shrink-0" />
              <span>123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F43F5E] shrink-0" />
              <span>{company?.phone || company?.hotline || company?.phone || company?.hotline || '0909.123.456'}</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#F43F5E] shrink-0" />
              <span>{company?.email || company?.email || 'trungnguyen.realestate@gmail.com'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${MAX_W} px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500`}>
        © 2026 Trung Nguyen Real Estate. All rights reserved. PlatformBDS.
      </div>
    </footer>
  );

  // ----------------------------------------------------
  // REACTIVE FILTERING & SUB-PAGES RENDERERS
  // ----------------------------------------------------

  // Projects Page with Search & Multiple Dropdowns
  const renderProjectsPage = () => {
    // Reactive project filter logic
    const filteredProjects = MOCK_PROJECTS.filter((proj) => {
      // 1. Text Search query matching title, location, or description
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' || 
        proj.title.toLowerCase().includes(query) || 
        proj.location.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query);

      // 2. Area Dropdown filter
      const matchesArea = filterArea === 'All' || proj.area === filterArea;

      // 3. Bedrooms Dropdown filter
      const matchesBedrooms = filterBedrooms === 'All' || 
        (filterBedrooms === '4+' ? proj.bedrooms >= 4 : proj.bedrooms === parseInt(filterBedrooms, 10));

      // 4. Price range filter (Numeric Price in Billions)
      let matchesPrice = true;
      if (filterPrice === 'under-3') {
        matchesPrice = proj.priceNumeric < 3.0;
      } else if (filterPrice === '3-5') {
        matchesPrice = proj.priceNumeric >= 3.0 && proj.priceNumeric <= 5.0;
      } else if (filterPrice === '5-10') {
        matchesPrice = proj.priceNumeric > 5.0 && proj.priceNumeric <= 10.0;
      } else if (filterPrice === 'over-10') {
        matchesPrice = proj.priceNumeric > 10.0;
      }

      return matchesSearch && matchesArea && matchesBedrooms && matchesPrice;
    });

    const resetFilters = () => {
      setSearchQuery('');
      setFilterArea('All');
      setFilterBedrooms('All');
      setFilterPrice('All');
    };

    return (
      <div className="py-12 bg-gray-50/50 min-h-screen">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: FONTS.heading }}>Giỏ Hàng Dự Án Độc Quyền</h1>
            <p className="text-gray-500">Tìm kiếm các sản phẩm căn hộ, biệt thự cao cấp phù hợp nhất với phong cách sống và dòng tài chính của bạn.</p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Tìm tên dự án, vị trí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-pink-500 text-gray-800 font-medium"
                />
              </div>

              {/* Area Filter */}
              <div>
                <select 
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-pink-500 text-gray-700 font-medium"
                >
                  <option value="All">Tất cả khu vực</option>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 7">Quận 7</option>
                  <option value="Quận 9">Quận 9</option>
                  <option value="Bình Thạnh">Bình Thạnh</option>
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <select 
                  value={filterBedrooms}
                  onChange={(e) => setFilterBedrooms(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-pink-500 text-gray-700 font-medium"
                >
                  <option value="All">Tất cả số phòng ngủ</option>
                  <option value="2">2 phòng ngủ</option>
                  <option value="3">3 phòng ngủ</option>
                  <option value="4+">4+ phòng ngủ</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <select 
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-pink-500 text-gray-700 font-medium"
                >
                  <option value="All">Tất cả mức giá</option>
                  <option value="under-3">Dưới 3 Tỷ</option>
                  <option value="3-5">3 Tỷ - 5 Tỷ</option>
                  <option value="5-10">5 Tỷ - 10 Tỷ</option>
                  <option value="over-10">Trên 10 Tỷ</option>
                </select>
              </div>
            </div>

            {/* Clear button if any filter is active */}
            {(searchQuery || filterArea !== 'All' || filterBedrooms !== 'All' || filterPrice !== 'All') && (
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={resetFilters}
                  className="text-sm font-semibold text-[#BE185D] hover:underline flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" /> Đặt lại tất cả bộ lọc ({filteredProjects.length} kết quả)
                </button>
              </div>
            )}
          </div>

          {/* Project List Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Không Tìm Thấy Dự Án Phù Hợp</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">Vui lòng điều chỉnh hoặc đặt lại bộ lọc tìm kiếm để xem các dự án khác.</p>
              <button 
                onClick={resetFilters}
                style={{ backgroundColor: COLORS.primary }}
                className="text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all"
              >
                Xóa các bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div key={proj.id} className="group rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col justify-between">
                  <div className="relative">
                    <span style={{ backgroundColor: COLORS.accent }} className="absolute top-4 right-4 z-10 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                      {proj.tag}
                    </span>
                    <div className="h-64 overflow-hidden relative">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-[#BE185D] transition-colors">{proj.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm gap-1 mb-4">
                        <MapPin className="w-4 h-4 text-gray-400" /> {proj.location}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-3 rounded-2xl text-xs font-bold text-gray-600">
                        <div className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-pink-700" /> {proj.bedrooms} PN</div>
                        <div className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-pink-700" /> {proj.size} m²</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-semibold text-sm">Giá bán từ:</span>
                        <span style={{ color: COLORS.primary }} className="text-xl font-extrabold">{proj.priceText}</span>
                      </div>
                      <button 
                        onClick={() => openProjectDetails(proj)}
                        style={{ backgroundColor: COLORS.primary }} 
                        className="w-full py-3.5 rounded-xl font-bold text-white hover:opacity-95 transition-all text-center flex items-center justify-center gap-2"
                      >
                        Xem Chi Tiết <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // About Page with Timeline Milestones, Leadership, Core Values
  const renderAboutPage = () => {
    // Find details of active Core Value tab
    const activeValue = CORE_VALUES.find(v => v.id === activeValueTab) || CORE_VALUES[0];

    return (
      <div className="bg-white min-h-screen">
        {/* Banner */}
        <div style={{ backgroundColor: COLORS.bg }} className="py-16 text-center border-b border-pink-50">
          <div className={`${MAX_W} px-4`}>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: FONTS.heading }}>Giới Thiệu Về Chúng Tôi</h1>
            <p className="text-gray-500 max-w-xl mx-auto">10 năm kiến tạo niềm tin, đồng hành cùng khách hàng trên con đường tìm kiếm tổ ấm lý tưởng và gia tăng giá trị tài sản vững bền.</p>
          </div>
        </div>

        {/* Intro */}
        {renderAboutAgent()}

        {/* Stats */}
        {renderStats()}

        {/* Interactive Core Values Tabs */}
        <section className="py-20 bg-gray-50/50 border-b border-gray-100">
          <div className={`${MAX_W} px-4`}>
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 style={{ color: COLORS.text, fontFamily: FONTS.heading }} className="text-3xl font-extrabold mb-4">Giá Trị Cốt Lõi</h2>
              <p className="text-gray-600">Những tôn chỉ giúp chúng tôi xây dựng vị thế vững chắc trong lòng khách hàng.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Tabs list (Left) */}
              <div className="lg:w-1/3 flex flex-col gap-3">
                {CORE_VALUES.map((val) => (
                  <button
                    key={val.id}
                    onClick={() => setActiveValueTab(val.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all font-bold flex items-center justify-between ${activeValueTab === val.id ? 'bg-white shadow-md' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                    style={{ borderColor: activeValueTab === val.id ? COLORS.primary : 'transparent' }}
                  >
                    <span style={{ color: activeValueTab === val.id ? COLORS.primary : COLORS.text }} className="text-lg">
                      {val.title}
                    </span>
                    <ArrowRight className={`w-5 h-5 transition-transform ${activeValueTab === val.id ? 'translate-x-1' : 'opacity-30'}`} style={{ color: COLORS.primary }} />
                  </button>
                ))}
              </div>

              {/* Tab Display Panel (Right) */}
              <div className="lg:w-2/3 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
                <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  {activeValue.icon === 'Shield' && <Shield className="w-8 h-8" />}
                  {activeValue.icon === 'Users' && <Users className="w-8 h-8" />}
                  {activeValue.icon === 'Award' && <Award className="w-8 h-8" />}
                  {activeValue.icon === 'TrendingUp' && <TrendingUp className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{activeValue.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{activeValue.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      Cam kết chất lượng dịch vụ
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      Minh bạch trong pháp lý
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Milestones */}
        <section className="py-20 bg-white">
          <div className={`${MAX_W} px-4`}>
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: FONTS.heading }}>Hành Trình Phát Triển</h2>
              <p className="text-gray-500">Nhìn lại những cột mốc ý nghĩa đánh dấu sự phát triển vượt bậc của chúng tôi.</p>
            </div>

            <div className="relative border-l-2 border-pink-100 max-w-3xl mx-auto pl-8 space-y-12">
              {ABOUT_MILESTONES.map((stone, index) => (
                <div key={index} className="relative">
                  {/* Bubble marker */}
                  <span 
                    style={{ backgroundColor: COLORS.primary }} 
                    className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-white shadow flex items-center justify-center"
                  ></span>
                  
                  <div>
                    <span style={{ color: COLORS.accent }} className="text-xl font-black">{stone.year}</span>
                    <h4 className="text-xl font-bold text-gray-900 mt-1 mb-2">{stone.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{stone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-gray-50/50">
          <div className={`${MAX_W} px-4`}>
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: FONTS.heading }}>Đội Ngũ Lãnh Đạo</h2>
              <p className="text-gray-500">Những người chèo lái tận tụy, giàu năng lực và kinh nghiệm thực chiến dày dạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP.map((leader, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 p-6 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-pink-50">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h4>
                  <p style={{ color: COLORS.primary }} className="text-sm font-bold uppercase tracking-wider mb-4">{leader.role}</p>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{leader.bio}</p>
                  <div className="flex gap-3 justify-center">
                    {[Facebook, Linkedin, Mail].map((Icon, idx) => (
                      <a key={idx} href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#BE185D] hover:bg-pink-50 transition-all">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Gallery Page with Category Tabs & Lightbox trigger
  const renderGalleryPage = () => {
    // Tabs list
    const galleryTabs = [
      { id: 'All', label: 'Tất Cả' },
      { id: 'Interior', label: 'Nội Thất' },
      { id: 'Exterior', label: 'Ngoại Thất' },
      { id: 'Luxury', label: 'Sang Trọng' },
      { id: 'Amenities', label: 'Tiện Ích' }
    ];

    // Filter images
    const filteredImgs = selectedGalleryTab === 'All'
      ? MOCK_GALLERY
      : MOCK_GALLERY.filter((item) => item.category === selectedGalleryTab);

    return (
      <div className="py-12 bg-white min-h-screen">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: FONTS.heading }}>Thư Viện Ảnh Thực Tế</h1>
            <p className="text-gray-500">Mời quý khách xem qua một số hình ảnh thực tế bàn giao căn hộ mẫu và hạ tầng nội khu dự án.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-gray-100 pb-6">
            {galleryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedGalleryTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${selectedGalleryTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-[#BE185D] bg-gray-50'}`}
                style={{ backgroundColor: selectedGalleryTab === tab.id ? COLORS.primary : undefined }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImgs.map((img) => (
              <div 
                key={img.id} 
                onClick={() => setSelectedGalleryImg(img.img)}
                className="group rounded-2xl overflow-hidden relative h-60 cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold p-4 text-center">
                  <div>
                    <Search className="w-8 h-8 mx-auto mb-2 text-white" />
                    <span>Xem phóng to</span>
                    <p className="text-xs font-normal text-gray-200 mt-1.5">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // News Page with Search, Category Filter, and Article modal trigger
  const renderNewsPage = () => {
    const newsCategories = ['All', 'Thị Trường', 'Quy Hoạch', 'Hướng Dẫn', 'Kiến Trúc', 'Tài Chính', 'Phong Thủy'];

    const filteredNews = MOCK_NEWS.filter((news) => {
      const matchesSearch = searchNewsQuery === '' ||
        news.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchNewsQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchNewsQuery.toLowerCase());
      
      const matchesCategory = selectedNewsCategory === 'All' || news.category === selectedNewsCategory;
      
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="py-12 bg-gray-50/50 min-h-screen">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: FONTS.heading }}>Tin Tức & Phân Tích BĐS</h1>
            <p className="text-gray-500">Cung cấp góc nhìn thực chiến, xu hướng quy hoạch, cẩm nang đầu tư và phong thủy nhà ở mới nhất.</p>
          </div>

          {/* Search and Category Filter */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Tìm tin tức, bài viết..."
                  value={searchNewsQuery}
                  onChange={(e) => setSearchNewsQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-pink-500 text-gray-800 font-medium text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-end w-full overflow-x-auto">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedNewsCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all ${selectedNewsCategory === cat ? 'text-white' : 'text-gray-500 hover:text-[#BE185D] bg-gray-50'}`}
                    style={{ backgroundColor: selectedNewsCategory === cat ? COLORS.primary : undefined }}
                  >
                    {cat === 'All' ? 'Tất cả' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* News List */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Không Tìm Thấy Tin Tức</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">Vui lòng thử lại với từ khóa hoặc danh mục khác.</p>
              <button 
                onClick={() => { setSearchNewsQuery(''); setSelectedNewsCategory('All'); }}
                style={{ backgroundColor: COLORS.primary }}
                className="text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90"
              >
                Xóa tìm kiếm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <div key={news.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-pink-50 flex flex-col justify-between group">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span style={{ backgroundColor: COLORS.primary }} className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {news.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {news.date} • <User className="w-3.5 h-3.5" /> {news.author}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#BE185D] transition-colors line-clamp-2">{news.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{news.summary}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => openArticleDetails(news)}
                      className="flex items-center text-sm font-bold text-gray-800 gap-2 hover:text-[#BE185D] transition-colors"
                    >
                      Đọc tiếp <ArrowRight className="w-4 h-4" />
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

  // Contact Page with Forms & Success Message Screen
  const renderContactPage = () => {
    const handleContactSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.phone) return;
      setContactSubmitted(true);
    };

    const resetContact = () => {
      setContactSubmitted(false);
      setContactForm({
        name: '',
        phone: '',
        email: '',
        project: '',
        message: ''
      });
    };

    return (
      <div className="bg-gray-50/30 min-h-screen py-12">
        <div className={`${MAX_W} px-4`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: FONTS.heading }}>Liên Hệ Với Nguyễn Trung</h1>
            <p className="text-gray-500">Mọi câu hỏi, yêu cầu tìm nhà, ký gửi bất động sản xin vui lòng để lại tin nhắn hoặc gọi số Hotline trực tiếp.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact details */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Địa chỉ văn phòng</h4>
                      <p className="text-gray-500 text-sm mt-0.5">123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP.HCM</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Hotline 24/7</h4>
                      <p className="text-gray-500 text-sm mt-0.5">0909.123.456 (Zalo, Viber, Call)</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div style={{ backgroundColor: COLORS.lightPink, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Địa chỉ Email</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{company?.email || company?.email || 'trungnguyen.realestate@gmail.com'}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Styled Mock Map Card */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 relative h-48 bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80')] bg-cover opacity-60"></div>
                <div className="absolute inset-0 bg-pink-900/10"></div>
                <div className="relative z-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg text-center max-w-[250px]">
                  <MapPin className="w-8 h-8 mx-auto mb-1 text-[#BE185D]" />
                  <span className="font-bold text-xs text-gray-900 block">VĂN PHÒNG CHÍNH</span>
                  <span className="text-[10px] text-gray-500 mt-1 block">Quận 7, TP.HCM</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
              {contactSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-md animate-bounce">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                    Cảm ơn anh/chị <strong>{contactForm.name}</strong> đã tin tưởng liên hệ. Nguyễn Trung sẽ kiểm tra thông tin về <strong>{contactForm.project || 'Dự án của bạn'}</strong> và trực tiếp gọi lại tư vấn trong thời gian tối đa 15 phút.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                      onClick={resetContact}
                      style={{ backgroundColor: COLORS.primary }}
                      className="text-white font-bold px-8 py-3 rounded-xl hover:opacity-95 shadow-md transition-all text-sm"
                    >
                      Gửi tin nhắn mới
                    </button>
                    <button 
                      onClick={() => { resetContact(); setCurrentPage('home'); }}
                      className="bg-gray-100 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-200 transition-all text-sm"
                    >
                      Quay lại trang chủ
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-gray-900">Để Lại Lời Nhắn</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Họ & Tên *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nguyễn Văn A"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 text-gray-800 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Số Điện Thoại *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="09xx.xxx.xxx"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 text-gray-800 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="example@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 text-gray-800 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Dự án quan tâm</label>
                      <select 
                        value={contactForm.project}
                        onChange={(e) => setContactForm({ ...contactForm, project: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 text-gray-700 text-sm font-medium"
                      >
                        <option value="">Chọn dự án quan tâm</option>
                        {MOCK_PROJECTS.map(p => (
                          <option key={p.id} value={p.title}>{p.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Ghi chú nhu cầu chi tiết</label>
                    <textarea 
                      rows={4}
                      placeholder="Nhập ghi chú hoặc thời gian thuận tiện để liên hệ..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 text-gray-800 text-sm font-medium"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    style={{ backgroundColor: COLORS.accent }}
                    className="w-full text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-opacity-95 transition-all text-sm uppercase flex justify-center items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Gửi thông tin liên hệ
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <>
      {renderHero()}
      {renderFeaturedProjects()}
      {renderWhyBuyNow()}
      {renderDiscounts()}
      {renderAboutAgent()}
      {renderStats()}
      {renderServices()}
      {renderGallery()}
      {renderTestimonials()}
      {renderProcess()}
      {renderNewsHome()}
      {renderFAQ()}
      {renderContactCTA()}
      {renderNewsletter()}
    </>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'projects': return renderProjectsPage();
      case 'about': return renderAboutPage();
      case 'gallery': return renderGalleryPage();
      case 'news': return renderNewsPage();
      case 'contact': return renderContactPage();
      case 'home':
      default: return renderHome();
    }
  };

  // ----------------------------------------------------
  // GLOBAL MODALS & OVERLAYS
  // ----------------------------------------------------

  // Project Details Modal
  const renderProjectModal = () => {
    if (!selectedProject) return null;

    const handleModalInquirySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!projectInquiryForm.name || !projectInquiryForm.phone) return;
      setProjectInquirySubmitted(true);
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white z-20 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{selectedProject.title}</h3>
            <button 
              onClick={() => setSelectedProject(null)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Images Carousel */}
              <div>
                <div className="rounded-2xl overflow-hidden h-72 sm:h-80 bg-gray-100 relative">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                    src={selectedProject.images[activeModalImgIndex]} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover" 
                  />
                  <span style={{ backgroundColor: COLORS.accent }} className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {selectedProject.tag}
                  </span>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-4">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModalImgIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 bg-gray-50 shrink-0 transition-all ${activeModalImgIndex === idx ? 'scale-95 shadow-md' : 'opacity-65 hover:opacity-100'}`}
                      style={{ borderColor: activeModalImgIndex === idx ? COLORS.primary : 'transparent' }}
                    >
                      <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Spec Table */}
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Thông Số Kỹ Thuật</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bed className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Phòng ngủ:</strong> {selectedProject.specifications.bedrooms} PN</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bath className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Phòng tắm:</strong> {selectedProject.specifications.bathrooms} WC</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Maximize className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Diện tích:</strong> {selectedProject.specifications.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Pháp lý:</strong> {selectedProject.specifications.legal}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Compass className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Hướng nhà:</strong> {selectedProject.specifications.direction}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-pink-700 shrink-0" />
                      <span><strong>Vị trí:</strong> {selectedProject.specifications.floor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Inquiry Form */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#BE185D] font-extrabold text-sm mb-2">
                    <MapPin className="w-4 h-4" /> {selectedProject.location}
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{selectedProject.title}</h2>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-gray-500 font-semibold">Giá bán đề xuất:</span>
                    <span style={{ color: COLORS.primary }} className="text-2xl font-black">{selectedProject.priceText}</span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Mô Tả Dự Án</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 text-justify">{selectedProject.description}</p>
                </div>

                {/* Inquiry box */}
                <div className="border-t border-gray-100 pt-6">
                  {projectInquirySubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 font-bold flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      <div>
                        Đăng ký thành công! Tôi sẽ liên hệ tư vấn giỏ hàng <strong>{selectedProject.title}</strong> ngay.
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleModalInquirySubmit}>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">Nhận tư vấn & bảng hàng dự án này</h4>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input 
                          type="text" 
                          placeholder="Họ tên của bạn"
                          required
                          value={projectInquiryForm.name}
                          onChange={(e) => setProjectInquiryForm({ ...projectInquiryForm, name: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 text-gray-800 font-medium"
                        />
                        <input 
                          type="tel" 
                          placeholder="Số điện thoại"
                          required
                          value={projectInquiryForm.phone}
                          onChange={(e) => setProjectInquiryForm({ ...projectInquiryForm, phone: e.target.value })}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 text-gray-800 font-medium"
                        />
                        <button 
                          type="submit"
                          style={{ backgroundColor: COLORS.primary }}
                          className="text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-all shrink-0"
                        >
                          GỬI YÊU CẦU
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">Cam kết giữ bảo mật thông tin và không làm phiền quý khách.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Gallery Lightbox Modal
  const renderGalleryLightbox = () => {
    if (!selectedGalleryImg) return null;

    // Filter images currently shown
    const activeGalleryList = selectedGalleryTab === 'All'
      ? MOCK_GALLERY
      : MOCK_GALLERY.filter((item) => item.category === selectedGalleryTab);

    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      const currentIdx = activeGalleryList.findIndex(img => img.img === selectedGalleryImg);
      if (currentIdx > 0) {
        setSelectedGalleryImg(activeGalleryList[currentIdx - 1].img);
      } else {
        setSelectedGalleryImg(activeGalleryList[activeGalleryList.length - 1].img);
      }
    };

    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      const currentIdx = activeGalleryList.findIndex(img => img.img === selectedGalleryImg);
      if (currentIdx < activeGalleryList.length - 1) {
        setSelectedGalleryImg(activeGalleryList[currentIdx + 1].img);
      } else {
        setSelectedGalleryImg(activeGalleryList[0].img);
      }
    };

    const currentImgObj = activeGalleryList.find(img => img.img === selectedGalleryImg);

    return (
      <div 
        onClick={() => setSelectedGalleryImg(null)}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <button 
          onClick={() => setSelectedGalleryImg(null)}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-3xl font-light z-50 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50 transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50 transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="relative max-w-[90%] max-h-[85vh] text-center flex flex-col items-center justify-center">
          <Image src={selectedGalleryImg} 
            alt="lightbox" 
            className="object-contain rounded-lg max-h-[75vh]" 
            onClick={(e) => e.stopPropagation()} width={1200} height={800}
          />
          {currentImgObj && (
            <div className="text-white mt-4 max-w-lg bg-black/50 py-2 px-4 rounded-full text-sm inline-block">
              {currentImgObj.title}
            </div>
          )}
        </div>
      </div>
    );
  };

  // News Detail Modal
  const renderNewsModal = () => {
    if (!selectedArticle) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
          
          {/* Cover image header */}
          <div className="h-64 sm:h-80 w-full relative">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span style={{ backgroundColor: COLORS.primary }} className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                {selectedArticle.category}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold leading-tight">{selectedArticle.title}</h2>
            </div>
          </div>

          {/* Article details */}
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-4 text-sm text-gray-400 border-b border-gray-100 pb-4 mb-6 font-medium">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-pink-700" /> {selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-pink-700" /> Tác giả: {selectedArticle.author}</span>
            </div>

            <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 text-justify">
              <p className="font-semibold text-gray-900 border-l-4 border-pink-700 pl-4 py-1 italic mb-6">
                {selectedArticle.summary}
              </p>
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-gray-400">© 2026 Trung Nguyen Real Estate Expert.</div>
              <button 
                onClick={() => {
                  setSelectedArticle(null);
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ backgroundColor: COLORS.primary }}
                className="text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-xs uppercase"
              >
                Nhận tư vấn từ chuyên gia
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50/20" style={{ color: COLORS.text }}>
      {renderUrgencyBar()}
      {renderHeader()}
      {renderContent()}
      {renderFooter()}

      {/* GLOBAL OVERLAYS / MODALS */}
      {renderProjectModal()}
      {renderGalleryLightbox()}
      {renderNewsModal()}
    </div>
  );
}
