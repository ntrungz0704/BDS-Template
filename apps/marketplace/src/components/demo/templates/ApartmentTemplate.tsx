import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Phone, Mail, Search, ChevronRight, Menu, X,
  CheckCircle2, Star, Clock, Home, Users, ArrowRight, Bath, Bed,
  Maximize, Trees, Dumbbell, Shield, Coffee, Car, Quote, Calendar, Plus, Minus,
  Camera, Check
} from 'lucide-react';
import { MAX_W } from '../design-system';
import { FacebookIcon, InstagramIcon, YoutubeIcon, ZaloIcon } from '../../icons/SocialIcons';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
}

// Elevated realistic listings - Expanded to 8 items with complete mock data
const LIST_APARTMENTS = [
  {
    id: 1,
    name: 'S1.12A - View Thành Phố',
    price: '2.5 Tỷ',
    priceNum: 2.5,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    beds: 1,
    baths: 1,
    area: '52m2',
    areaNum: 52,
    tower: 'Tháp S1',
    type: '1 Phòng Ngủ',
    location: 'Tầng 12, Tòa Sapphire (S1)',
    description: 'Căn hộ 1 phòng ngủ lý tưởng cho người độc thân hoặc cặp đôi trẻ. Với thiết kế tối giản, ban công rộng đón trọn ánh bình minh và tầm nhìn bao trọn cảnh quan thành phố hiện đại.',
    specifications: [
      'Hướng ban công: Đông Bắc',
      'Tiêu chuẩn bàn giao: Hoàn thiện cơ bản cao cấp',
      'Hệ thống Smart Home điều khiển qua giọng nói',
      'Pháp lý: Sổ hồng lâu dài'
    ],
    featured: true
  },
  {
    id: 2,
    name: 'R2.05 - Căn Góc View Hồ',
    price: '4.1 Tỷ',
    priceNum: 4.1,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    beds: 2,
    baths: 2,
    area: '78m2',
    areaNum: 78,
    tower: 'Tháp R2',
    type: '2 Phòng Ngủ',
    location: 'Tầng 5, Tòa Ruby (R2)',
    description: 'Sở hữu vị trí góc đắc địa tại tháp R2, căn hộ mang lại không gian sống khoáng đạt với tầm nhìn panorama hướng trực diện ra hồ điều hòa. Cực kỳ thoáng mát và yên tĩnh.',
    specifications: [
      'Hướng ban công: Đông Nam',
      'Kính Low-E cách âm, cách nhiệt 3 lớp',
      'Bàn giao đầy đủ tủ bếp và thiết bị vệ sinh Kohler',
      'Pháp lý: Sổ hồng lâu dài'
    ],
    featured: true
  },
  {
    id: 3,
    name: 'D1.20 - Căn Hộ View Sông',
    price: '6.5 Tỷ',
    priceNum: 6.5,
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    beds: 3,
    baths: 2,
    area: '105m2',
    areaNum: 105,
    tower: 'Tháp D1',
    type: '3 Phòng Ngủ',
    location: 'Tầng 20, Tòa Diamond (D1)',
    description: 'Không gian sống đẳng cấp dành cho gia đình đa thế hệ. Căn hộ có ban công siêu rộng kéo dài từ phòng khách sang phòng ngủ Master, đón trọn gió sông mát lành.',
    specifications: [
      'Hướng ban công: Tây Nam',
      'Nội thất cao cấp nhập khẩu từ Ý',
      'Hệ thống điều hòa trung tâm Daikin',
      'Đặc quyền 1 chỗ đỗ xe định danh'
    ],
    featured: true
  },
  {
    id: 4,
    name: 'S1.08 - Studio Tối Giản',
    price: '1.8 Tỷ',
    priceNum: 1.8,
    img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    beds: 1,
    baths: 1,
    area: '35m2',
    areaNum: 35,
    tower: 'Tháp S1',
    type: 'Studio',
    location: 'Tầng 8, Tòa Sapphire (S1)',
    description: 'Căn hộ Studio được thiết kế thông minh với vách ngăn kính di động, giúp tối ưu hóa diện tích sử dụng. Phù hợp cho mục đích kinh doanh homestay hoặc lưu trú ngắn ngày.',
    specifications: [
      'Hướng ban công: Tây Bắc',
      'Trang bị đầy đủ nội thất thông minh đa năng',
      'Khóa cửa vân tay và mã số thông minh',
      'Hỗ trợ vay 70% nhận nhà ngay'
    ],
    featured: false
  },
  {
    id: 5,
    name: 'R2.15 - 3PN View Nội Khu',
    price: '5.2 Tỷ',
    priceNum: 5.2,
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    beds: 3,
    baths: 3,
    area: '120m2',
    areaNum: 120,
    tower: 'Tháp R2',
    type: '3 Phòng Ngủ',
    location: 'Tầng 15, Tòa Ruby (R2)',
    description: 'Căn hộ 3 phòng ngủ thông thoáng có tầm nhìn ôm trọn công viên nội khu và hồ bơi Resort. Thiết kế các phòng ngủ tách biệt tạo không gian riêng tư tối đa.',
    specifications: [
      'Thiết kế căn hộ vuông vức tối ưu diện tích',
      'Hệ thống kính cách âm tuyệt đối',
      'Thiết bị bếp cao cấp Bosch',
      'Sở hữu 2 ban công cực thoáng'
    ],
    featured: false
  },
  {
    id: 6,
    name: 'D1.PH - Penthouse Thượng Lưu',
    price: '22.0 Tỷ',
    priceNum: 22.0,
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    beds: 4,
    baths: 4,
    area: '320m2',
    areaNum: 320,
    tower: 'Tháp D1',
    type: 'Penthouse',
    location: 'Tầng 40, Tòa Diamond (D1)',
    description: 'Căn hộ Penthouse độc bản tại tầng cao nhất của tháp Diamond. Với tầm nhìn không giới hạn ôm trọn thành phố và sông Sài Gòn, sở hữu sân vườn riêng rộng lớn và bể bơi biệt lập.',
    specifications: [
      'Tầm nhìn panorama 360 độ cực đại',
      'Bể bơi tràn bờ và sân vườn riêng rộng 80m2',
      'Thang máy riêng biệt đi trực tiếp lên căn hộ',
      'Bàn giao thô để chủ nhân tự do thiết kế theo gu cá nhân'
    ],
    featured: true
  },
  {
    id: 7,
    name: 'S1.02 - Căn Hộ 2PN Hướng Nam',
    price: '3.3 Tỷ',
    priceNum: 3.3,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    beds: 2,
    baths: 2,
    area: '72m2',
    areaNum: 72,
    tower: 'Tháp S1',
    type: '2 Phòng Ngủ',
    location: 'Tầng 2, Tòa Sapphire (S1)',
    description: 'Căn hộ 2 phòng ngủ hướng chính Nam mát mẻ quanh năm. Thiết kế thông minh tối ưu hóa ánh sáng tự nhiên cho mọi phòng ngủ, phòng khách rộng rãi liên kết trực tiếp bếp.',
    specifications: [
      'Hướng ban công: Nam',
      'Tiêu chuẩn bàn giao: Hoàn thiện cơ bản',
      'Hỗ trợ lãi suất 0% trong 24 tháng',
      'Chiết khấu lên tới 5% khi thanh toán sớm'
    ],
    featured: false
  },
  {
    id: 8,
    name: 'R1.10 - 2PN Tiện Nghi Ruby',
    price: '3.6 Tỷ',
    priceNum: 3.6,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    beds: 2,
    baths: 2,
    area: '80m2',
    areaNum: 80,
    tower: 'Tháp R2',
    type: '2 Phòng Ngủ',
    location: 'Tầng 10, Tòa Ruby (R2)',
    description: 'Căn hộ 2 phòng ngủ nằm ở phân khu Ruby cao cấp, các phòng được bố trí vuông vức giúp tối ưu hóa diện tích. Thích hợp cho các gia đình trẻ năng động.',
    specifications: [
      'Hướng ban công: Đông',
      'Lót sàn gỗ công nghiệp nhập khẩu Thụy Sĩ',
      'Thiết bị điện thông minh Panasonic',
      'Tặng gói quản lý dịch vụ 2 năm đầu'
    ],
    featured: false
  }
];

// Elevated realistic news articles - Expanded to 7 items
const LIST_NEWS = [
  {
    id: 1,
    title: 'Lễ ra mắt phân khu Diamond đẳng cấp nhất dự án SmartUrban',
    date: '20/10/2026',
    category: 'Sự kiện',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    excerpt: 'Sự kiện ra mắt phân khu Diamond thu hút hơn 1,000 khách hàng tham dự với nhiều ưu đãi đặc quyền và cơ hội trúng lớn.',
    content: [
      'Sáng ngày 20/10/2026, chủ đầu tư dự án SmartUrban đã chính thức tổ chức Lễ giới thiệu phân khu căn hộ cao cấp nhất - Diamond (D1). Sự kiện diễn ra ngay tại khuôn viên dự án và thu hút hơn 1,000 khách hàng cùng các đối tác, nhà đầu tư lớn tham gia.',
      'Phân khu Diamond sở hữu vị trí đắt giá nhất dự án với tầm nhìn trực diện ra sông và công viên trung tâm. Các căn hộ tại đây đều được bàn giao theo tiêu chuẩn 5 sao với các thương hiệu nội thất hàng đầu thế giới như Kohler, Bosch, Daikin.',
      'Khách hàng đặt cọc thành công trong sự kiện đã nhận được mức chiết khấu thanh toán lên đến 8% giá trị căn hộ cùng cơ hội bốc thăm trúng thưởng xe sang Mercedes-Benz GLC 300 trị giá 2.5 tỷ đồng.'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Cập nhật tiến độ thi công dự án SmartUrban tháng 10/2026',
    date: '15/10/2026',
    category: 'Tiến độ',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    excerpt: 'Tiến độ xây dựng các tòa tháp Sapphire, Ruby đang diễn ra đúng kế hoạch. Tháp S1 đã cất nóc và bước vào hoàn thiện mặt ngoài.',
    content: [
      'Ban quản lý dự án SmartUrban xin gửi tới Quý cư dân báo cáo tiến độ xây dựng tính đến ngày 15/10/2026. Hiện tại, toàn bộ công trường đang duy trì nhịp độ thi công khẩn trương 3 ca liên tục để đảm bảo bàn giao nhà đúng thời hạn.',
      'Tòa Sapphire (S1) đã hoàn thành cất nóc và đang tiến hành xây tô ngăn phòng, lắp đặt hệ thống cơ điện (MEP). Tòa Ruby (R2) đã đổ bê tông sàn tầng 32. Tòa Diamond (D1) đã hoàn thành phần móng hầm và bắt đầu xây dựng phần thân.',
      'Chủ đầu tư cùng đơn vị tổng thầu Coteccons cam kết sẽ bàn giao những căn hộ đầu tiên đúng tiến độ đề ra vào Quý 4/2026 với tiêu chuẩn chất lượng cao nhất.'
    ],
    featured: true
  },
  {
    id: 3,
    title: 'Chính sách bán hàng ưu đãi đặc biệt nhân dịp cuối năm 2026',
    date: '01/10/2026',
    category: 'Chính sách',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    excerpt: 'Hỗ trợ tài chính cực khủng: hỗ trợ lãi suất 0% lên tới 24 tháng, chiết khấu thanh toán sớm 5%, miễn phí quản lý 2 năm.',
    content: [
      'Nhằm tri ân khách hàng và tạo điều kiện sở hữu nhà dễ dàng dịp cuối năm, chủ đầu tư SmartUrban chính thức công bố chính sách bán hàng siêu ưu đãi áp dụng từ ngày 01/10/2026.',
      'Theo đó, khách hàng chỉ cần thanh toán trước 20% giá trị căn hộ là có thể ký Hợp đồng mua bán. Ngân hàng đối tác Techcombank hỗ trợ cho vay 70% giá trị còn lại với lãi suất 0% và ân hạn nợ gốc trong vòng 24 tháng.',
      'Ngoài ra, tất cả khách hàng giao dịch thành công sẽ được miễn phí dịch vụ quản lý vận hành tòa nhà trong 2 năm đầu tiên kể từ thời điểm nhận bàn giao căn hộ.'
    ],
    featured: true
  },
  {
    id: 4,
    title: 'Khai trương cụm nhà mẫu thực tế phong cách Châu Âu tại SmartUrban',
    date: '25/09/2026',
    category: 'Sự kiện',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    excerpt: 'Hàng trăm khách hàng hào hứng trải nghiệm thực tế căn hộ mẫu 2PN và 3PN được thiết kế tinh tế tinh xảo.',
    content: [
      'Ngày 25/09/2026, cụm nhà mẫu thực tế của dự án SmartUrban đã chính thức mở cửa đón khách tham quan tại địa chỉ số 1 Đại lộ Mới, Quận Trung Tâm.',
      'Cụm nhà mẫu bao gồm căn hộ 2 phòng ngủ (78m2) and 3 phòng ngủ (105m2). Cả hai căn hộ mẫu đều được thiết kế theo phong cách hiện đại châu Âu, tối ưu hóa công năng sử dụng với không gian mở thoáng đãng và ngập tràn ánh sáng.',
      'Khách tham quan được trải nghiệm trực tiếp hệ thống Smart Home tích hợp trí tuệ nhân tạo, cho phép điều khiển chiếu sáng, máy lạnh, rèm cửa bằng giọng nói tiếng Việt rất trực quan.'
    ],
    featured: false
  },
  {
    id: 5,
    title: 'Ký kết hợp tác chiến lược bảo lãnh dự án giữa SmartUrban và Techcombank',
    date: '10/09/2026',
    category: 'Chính sách',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    excerpt: 'Techcombank chính thức trở thành ngân hàng bảo lãnh tiến độ xây dựng và hỗ trợ tài chính cho khách mua căn hộ SmartUrban.',
    content: [
      'Lễ ký kết hợp tác chiến lược giữa chủ đầu tư SmartUrban và Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank) đã diễn ra thành công tốt đẹp.',
      'Sự hợp tác này không chỉ đảm bảo quyền lợi pháp lý tối đa cho người mua nhà thông qua chứng thư bảo lãnh tiến độ, mà còn mang lại gói giải pháp tài chính vượt trội với lãi suất ưu đãi nhất thị trường.',
      'Đại diện Techcombank chia sẻ: "Chúng tôi tin tưởng vào năng lực triển khai dự án của chủ đầu tư và cam kết đồng hành lâu dài cùng dự án SmartUrban."'
    ],
    featured: false
  },
  {
    id: 6,
    title: 'Thiết kế cảnh quan xanh SmartUrban vinh dự nhận giải thưởng Quốc tế',
    date: '05/09/2026',
    category: 'Thị trường',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    excerpt: 'Dự án xuất sắc được vinh danh tại hạng mục "Thiết kế cảnh quan xanh xuất sắc nhất" khu vực Châu Á Thái Bình Dương.',
    content: [
      'Vượt qua nhiều ứng cử viên nặng ký từ các nước trong khu vực, SmartUrban đã xuất sắc nhận giải thưởng danh giá "Dự án có thiết kế cảnh quan xanh xuất sắc nhất" tại giải thưởng Bất động sản Châu Á 2026.',
      'Với mật độ xây dựng chỉ 35%, 65% diện tích còn lại của dự án được dành trọn cho công viên Sky Garden, hồ điều hòa, đường dạo bộ rợp bóng mát và các mảng xanh thẳng đứng độc đáo.',
      'Giải thưởng này khẳng định cam kết của chủ đầu tư trong việc xây dựng một môi trường sống trong lành, gần gũi với thiên nhiên cho cư dân.'
    ],
    featured: false
  },
  {
    id: 7,
    title: 'Phân tích tiềm năng đầu tư bất động sản khu vực phía Nam năm 2026',
    date: '20/08/2026',
    category: 'Thị trường',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    excerpt: 'Chuyên gia nhận định dòng tiền đầu tư trung và dài hạn đang đổ mạnh vào căn hộ xanh, tích hợp công nghệ thông minh.',
    content: [
      'Các chuyên gia kinh tế nhận định, thị trường bất động sản nửa cuối năm 2026 đang ghi nhận sự phục hồi mạnh mẽ. Trong đó, dòng tiền thông minh có xu hướng dịch chuyển vào các dự án căn hộ cao cấp có pháp lý hoàn chỉnh và tiến độ xây dựng ổn định.',
      'Đặc biệt, phân khúc căn hộ xanh tích hợp giải pháp vận hành thông minh (smart-living) như SmartUrban đang nhận được lượng quan tâm vượt trội nhờ đáp ứng đúng nhu cầu thực tế của thế hệ cư dân trẻ thành đạt.',
      'Đây được xem là kênh trú ẩn dòng tiền an toàn và có biên độ tăng giá tốt trong bối cảnh lạm phát và lãi suất tiền gửi ngân hàng duy trì ở mức thấp.'
    ],
    featured: false
  }
];

// Elevated Gallery Images with category and details
const LIST_GALLERY = [
  { img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', category: 'Ngoại khu', title: 'Tòa Sapphire lấp lánh ban đêm' },
  { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', category: 'Nội thất', title: 'Phòng khách căn hộ mẫu 2PN' },
  { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', category: 'Ngoại khu', title: 'Hồ cảnh quan trung tâm rộng lớn' },
  { img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', category: 'Nội thất', title: 'Phòng ăn hiện đại sang trọng' },
  { img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', category: 'Nội thất', title: 'Phòng ngủ ấm cúng ngập nắng' },
  { img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80', category: 'Tiện ích', title: 'Hồ bơi vô cực ngắm hoàng hôn' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', category: 'Tiện ích', title: 'Khu vui chơi trẻ em Kid Zone' },
  { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', category: 'Tiện ích', title: 'Phòng gym chuẩn quốc tế 5 sao' },
  { img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', category: 'Ngoại khu', title: 'Công viên đi bộ ngập sắc xanh' }
];

// Elevated Leadership List
const LIST_LEADERS = [
  {
    id: 1,
    name: 'Nguyễn Minh Triết',
    role: 'Chủ tịch HĐQT & Sáng lập',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Hơn 20 năm kinh nghiệm trong lĩnh vực quản lý và phát triển bất động sản cao cấp tại Việt Nam và Đông Nam Á. Ông là người định hình tầm nhìn chiến lược cho SmartUrban.'
  },
  {
    id: 2,
    name: 'Lê Thị Mai Hoa',
    role: 'Giám đốc Điều hành (CEO)',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Nguyên Giám đốc dự án tại các tập đoàn đa quốc gia. Bà Mai Hoa chịu trách nhiệm vận hành toàn bộ dự án và đưa các giải pháp xanh, thông minh vào thực tế.'
  },
  {
    id: 3,
    name: 'Trần Hoàng Nam',
    role: 'Kiến trúc sư Trưởng',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Tốt nghiệp Thạc sĩ Kiến trúc tại Pháp. Anh là người kiến tạo nên không gian sống tối ưu, kết hợp hài hòa giữa nét thẩm mỹ Châu Âu và lối sống Á Đông.'
  },
  {
    id: 4,
    name: 'Lương Minh Quân',
    role: 'Giám đốc Công nghệ & Smart-Home',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Chuyên gia đi đầu trong phát triển IoT và hệ thống điều khiển thông minh tại Việt Nam, kiến tạo giải pháp an ninh AI 24/7 bảo vệ cư dân.'
  }
];

// Elevated Historical & Project Milestones
const LIST_TIMELINE = [
  {
    id: 1,
    date: 'Tháng 03 / 2023',
    title: 'Phê duyệt Quy hoạch & Thành lập Ban quản lý',
    desc: 'Chính thức nhận phê duyệt quy hoạch chi tiết 1/500 và thành lập ban điều hành dự án SmartUrban.',
    done: true
  },
  {
    id: 2,
    date: 'Tháng 10 / 2023',
    title: 'Động thổ & Thi công Móng Hầm Sapphire',
    desc: 'Tổ chức Lễ động thổ hoành tráng và khởi công thi công phần móng cọc các tháp phân khu Sapphire (S1).',
    done: true
  },
  {
    id: 3,
    date: 'Tháng 06 / 2024',
    title: 'Hoàn thành Hầm & Bắt đầu xây Thân Tòa tháp',
    desc: 'Nghiệm thu phần móng hầm đạt tiêu chuẩn và triển khai lắp đặt hệ thống cơ điện ngầm, xây kết cấu thân.',
    done: true
  },
  {
    id: 4,
    date: 'Tháng 02 / 2025',
    title: 'Cất nóc phân khu Sapphire S1 & R2',
    desc: 'Đạt độ cao tối đa phần thô đối với tháp S1 và R2, triển khai song song công tác hoàn thiện và sơn bả bên ngoài.',
    done: true
  },
  {
    id: 5,
    date: 'Tháng 07 / 2026',
    title: 'Khai trương căn hộ mẫu thực tế tại công trường',
    desc: 'Hoàn thiện khu vực tiếp đón khách hàng và mở cửa căn hộ mẫu tiêu chuẩn hiện đại để khách trực tiếp kiểm chứng.',
    done: true
  },
  {
    id: 6,
    date: 'Tháng 12 / 2026 (Dự kiến)',
    title: 'Nghiệm thu & Bàn giao căn hộ đợt 1',
    desc: 'Chính thức kiểm tra an toàn PCCC, tiến hành bàn giao nhà và cấp giấy chứng nhận quyền sở hữu lâu dài.',
    done: false
  }
];

export default function ApartmentTemplate({ template, viewport = 'desktop', initialPage = 'home' }: TemplateProps) {
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
      window.history.pushState(null, '', `/demo/${templateSlug}/${p}`);
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeFloorPlan, setActiveFloorPlan] = useState<number>(0);
  
  // State variables for interactive features
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [filterPriceRange, setFilterPriceRange] = useState('Tất cả');
  const [filterTower, setFilterTower] = useState('Tất cả');
  const [filterArea, setFilterArea] = useState('Tất cả');
  
  const [selectedApartment, setSelectedApartment] = useState<any>(null);
  
  const [selectedGalleryTab, setSelectedGalleryTab] = useState('Tất cả');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  
  const [searchNewsQuery, setSearchNewsQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactApartment, setContactApartment] = useState('1 Phòng Ngủ');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  const [aboutTab, setAboutTab] = useState('story'); // story | leadership | timeline
  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';
  const isSmall = isMobile || isTablet;

  const fontHeading = { fontFamily: "'Manrope', sans-serif" };
  const fontBody = { fontFamily: "'DM Sans', sans-serif" };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Helper for quick newsletter sign up
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đăng ký nhận tin tức thành công! Chúng tôi sẽ gửi cập nhật sớm nhất tới bạn.');
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const renderHeader = () => (
    <header className="bg-white sticky top-0 z-50 shadow-sm" style={fontBody}>
      <div className={`${MAX_W} px-4 py-3.5 flex justify-between items-center`}>
        <div className="flex items-center gap-2.5 font-bold cursor-pointer text-left" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Building2 size={22} />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black uppercase block leading-tight text-slate-900 tracking-tight">SmartUrban</span>
            <span className="text-[10px] uppercase font-bold tracking-wider block text-violet-600">★ IOT SMART HOME 4.0 METROPOLIS ★</span>
          </div>
        </div>
        {!isSmall ? (
          <nav className="flex gap-6 lg:gap-8 items-center text-sm font-semibold text-slate-600">
            <button onClick={() => navigateTo('home')} className={`transition hover:text-violet-600 cursor-pointer ${currentPage === 'home' ? 'text-violet-700 font-black' : ''}`}>Trang chủ</button>
            <button onClick={() => navigateTo('projects')} className={`transition hover:text-violet-600 cursor-pointer ${currentPage === 'projects' ? 'text-violet-700 font-black' : ''}`}>Căn hộ</button>
            <button onClick={() => navigateTo('about')} className={`transition hover:text-violet-600 cursor-pointer ${currentPage === 'about' ? 'text-violet-700 font-black' : ''}`}>Giới thiệu</button>
            <button onClick={() => navigateTo('gallery')} className={`transition hover:text-violet-600 cursor-pointer ${currentPage === 'gallery' ? 'text-violet-700 font-black' : ''}`}>Thư viện</button>
            <button onClick={() => navigateTo('news')} className={`transition hover:text-violet-600 cursor-pointer ${currentPage === 'news' ? 'text-violet-700 font-black' : ''}`}>Tin tức</button>
            <button onClick={() => navigateTo('contact')} className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-violet-500/20 cursor-pointer">
              Liên Hệ Ngay
            </button>
          </nav>
        ) : (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-violet-700">
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}
      </div>
      {isSmall && mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-4 px-5 flex flex-col gap-3 text-slate-700 font-semibold z-50 border-t border-slate-100 animate-fadeIn">
          <button onClick={() => navigateTo('home')} className="text-left w-full p-2 hover:bg-violet-50 rounded-lg">Trang chủ</button>
          <button onClick={() => navigateTo('projects')} className="text-left w-full p-2 hover:bg-violet-50 rounded-lg">Căn hộ</button>
          <button onClick={() => navigateTo('about')} className="text-left w-full p-2 hover:bg-violet-50 rounded-lg">Giới thiệu</button>
          <button onClick={() => navigateTo('gallery')} className="text-left w-full p-2 hover:bg-violet-50 rounded-lg">Thư viện</button>
          <button onClick={() => navigateTo('news')} className="text-left w-full p-2 hover:bg-violet-50 rounded-lg">Tin tức</button>
          <button onClick={() => navigateTo('contact')} className="text-white px-6 py-3 rounded-xl text-center mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-sm shadow-md">
            Liên Hệ Tư Vấn
          </button>
        </div>
      )}
    </header>
  );

  const renderHero = () => (
    <section className="bg-gradient-to-b from-violet-50/70 via-purple-50/40 to-white relative overflow-hidden" style={fontBody}>
      <div className={`${MAX_W} px-4 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-14`}>
        <div className="flex-1 space-y-5 z-10 text-left">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs border border-violet-100 text-violet-700">
            <Star size={14} className="text-amber-500" fill="currentColor" />
            <span>Dự án căn hộ công nghệ 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.18] tracking-tight" style={fontHeading}>
            Sống Đỉnh Cao <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">
              Giữa Lòng Đô Thị
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            Khám phá không gian sống hiện đại, tiện nghi vượt trội với vị trí đắc địa ngay trung tâm thành phố. SmartUrban mang đến trải nghiệm sống hoàn hảo cho cộng đồng tinh hoa.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => navigateTo('projects')} 
              className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <span>Xem Căn Hộ</span> <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigateTo('contact')} 
              className="px-6 py-3.5 rounded-xl font-bold bg-white hover:bg-violet-50 text-violet-700 border border-violet-200 transition-all text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              <span>Nhận Báo Giá</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-xl">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-400 opacity-15 blur-xl -z-10"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" 
              alt="Hero Apartment" 
              className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wide">Tiêu chuẩn bàn giao</span>
                <p className="text-xs font-bold text-slate-900">100% Căn Hộ Full Smart Home AI</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
                Quý 4/2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderQuickSearch = () => (
    <section className="bg-white py-12" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 -mt-24 relative z-20 border border-violet-50 flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-violet-950 mb-2">Loại căn hộ</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border-b-2 border-violet-100 pb-2 focus:outline-none focus:border-violet-600 bg-transparent text-slate-700 font-medium cursor-pointer"
            >
              <option value="Tất cả">Tất cả loại</option>
              <option value="Studio">Studio</option>
              <option value="1 Phòng Ngủ">1 Phòng ngủ</option>
              <option value="2 Phòng Ngủ">2 Phòng ngủ</option>
              <option value="3 Phòng Ngủ">3 Phòng ngủ</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div className="hidden lg:block w-px h-12 bg-violet-100"></div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-violet-950 mb-2">Mức giá</label>
            <select 
              value={filterPriceRange}
              onChange={(e) => setFilterPriceRange(e.target.value)}
              className="w-full border-b-2 border-violet-100 pb-2 focus:outline-none focus:border-violet-600 bg-transparent text-slate-700 font-medium cursor-pointer"
            >
              <option value="Tất cả">Tất cả mức giá</option>
              <option value="Dưới 2 tỷ">Dưới 2 tỷ</option>
              <option value="2 - 4 tỷ">2 - 4 tỷ</option>
              <option value="4 - 7 tỷ">4 - 7 tỷ</option>
              <option value="Trên 7 tỷ">Trên 7 tỷ</option>
            </select>
          </div>
          <div className="hidden lg:block w-px h-12 bg-violet-100"></div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-violet-950 mb-2">Tòa nhà</label>
            <select 
              value={filterTower}
              onChange={(e) => setFilterTower(e.target.value)}
              className="w-full border-b-2 border-violet-100 pb-2 focus:outline-none focus:border-violet-600 bg-transparent text-slate-700 font-medium cursor-pointer"
            >
              <option value="Tất cả">Tất cả tòa</option>
              <option value="Tháp S1">Sapphire (S1)</option>
              <option value="Tháp R2">Ruby (R2)</option>
              <option value="Tháp D1">Diamond (D1)</option>
            </select>
          </div>
          <button 
            onClick={() => navigateTo('projects')}
            className="w-full lg:w-auto bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-700 transition flex items-center justify-center gap-2 mt-2 lg:mt-0 shadow-lg shadow-violet-200 shrink-0"
          >
            <Search size={20} /> Tìm Kiếm
          </button>
        </div>
      </div>
    </section>
  );

  const renderFeatured = () => {
    const featuredItems = LIST_APARTMENTS.filter(apt => apt.featured);
    return (
      <section className="py-20 bg-white" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Căn Hộ <span className="text-violet-600">Nổi Bật</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Tuyển tập những căn hộ có vị trí đẹp nhất, thiết kế tối ưu và tầm nhìn ngoạn mục dành riêng cho bạn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-violet-50 hover:shadow-2xl transition group cursor-pointer" 
                onClick={() => setSelectedApartment(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-violet-600 font-bold text-sm shadow-md border border-violet-100">
                    {item.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-violet-950 mb-4" style={fontHeading}>{item.name}</h3>
                  <div className="flex justify-between text-slate-500 text-sm mb-6 pb-6 border-b border-violet-50 font-medium">
                    <span className="flex items-center gap-1"><Bed size={18} className="text-violet-400"/> {item.beds} PN</span>
                    <span className="flex items-center gap-1"><Bath size={18} className="text-violet-400"/> {item.baths} WC</span>
                    <span className="flex items-center gap-1"><Maximize size={18} className="text-violet-400"/> {item.area}</span>
                  </div>
                  <button className="w-full text-violet-600 font-bold flex items-center justify-center gap-2 group-hover:text-amber-500 transition">
                    Xem chi tiết <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderCategories = () => (
    <section className="py-12 bg-violet-50" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="flex flex-wrap justify-center gap-4">
          {['Studio', '1 Phòng Ngủ', '2 Phòng Ngủ', '3 Phòng Ngủ', 'Penthouse'].map((cat, i) => (
            <button 
              key={i} 
              onClick={() => {
                setFilterType(cat);
                navigateTo('projects');
              }}
              className={`bg-white border-2 px-6 py-3 rounded-full font-bold transition shadow-sm hover:shadow-md ${filterType === cat ? 'border-violet-600 text-violet-600' : 'border-violet-100 text-violet-950 hover:border-violet-600 hover:text-violet-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="py-24 bg-white" style={fontBody}>
      <div className={`${MAX_W} px-4 flex flex-col lg:flex-row gap-16 items-center`}>
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="About 1" className="w-full h-48 lg:h-64 object-cover rounded-3xl rounded-tr-none shadow-lg" />
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="About 2" className="w-full h-48 lg:h-64 object-cover rounded-3xl mt-8 rounded-bl-none shadow-lg" />
        </div>
        <div className="flex-1 space-y-6 w-full">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-violet-950 leading-tight" style={fontHeading}>Kiến Tạo Chuẩn Mực <br/><span className="text-violet-600">Sống Mới</span></h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            SmartUrban được phát triển bởi tập đoàn bất động sản hàng đầu, mang trong mình sứ mệnh kiến tạo nên một cộng đồng cư dân tinh hoa. Với thiết kế xanh, công nghệ thông minh và hệ sinh thái tiện ích hoàn hảo.
          </p>
          <ul className="space-y-4 pt-4">
            {['Vị trí kim cương ngay trung tâm hành chính mới', 'Bàn giao nội thất cao cấp nhập khẩu 100%', 'Pháp lý minh bạch, sở hữu lâu dài'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-violet-950 font-semibold text-lg">
                <CheckCircle2 className="text-amber-500 shrink-0" size={24} /> {item}
              </li>
            ))}
          </ul>
          <button onClick={() => navigateTo('about')} className="mt-8 bg-violet-50 text-violet-600 font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-violet-100 transition">
            Tìm Hiểu Thêm <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );

  const renderFeatures = () => (
    <section className="py-24 bg-violet-950 text-white" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Home size={40}/>, title: 'Smart Home', desc: 'Điều khiển bằng giọng nói và điện thoại thông minh' },
            { icon: <Shield size={40}/>, title: 'An Ninh 24/7', desc: 'Hệ thống AI nhận diện khuôn mặt an toàn tuyệt đối' },
            { icon: <Trees size={40}/>, title: 'Sống Xanh', desc: '60% diện tích dự án dành riêng cho mảng xanh và mặt nước' },
            { icon: <MapPin size={40}/>, title: 'Vị Trí Vàng', desc: 'Kết nối đa tầng đến các tiện ích trọng điểm thành phố' }
          ].map((f, i) => (
            <div key={i} className="bg-violet-900/50 p-8 rounded-3xl border border-violet-800 hover:bg-violet-800 hover:border-violet-700 transition group cursor-default">
              <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-2xl font-bold mb-4" style={fontHeading}>{f.title}</h3>
              <p className="text-violet-200 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAmenities = () => (
    <section className="py-24 bg-violet-50" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Tiện Ích <span className="text-violet-600">Đặc Quyền</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Hệ sinh thái tiện ích chuẩn resort 5 sao mang đến cuộc sống nghỉ dưỡng mỗi ngày ngay tại nhà.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: <Trees size={32}/>, name: 'Công Viên Sky Garden' },
            { icon: <Dumbbell size={32}/>, name: 'Phòng Gym Hiện Đại' },
            { icon: <Coffee size={32}/>, name: 'Lounge & Cafe' },
            { icon: <Building2 size={32}/>, name: 'Hồ Bơi Vô Cực' },
            { icon: <Car size={32}/>, name: 'Bãi Đỗ Xe Thông Minh' },
            { icon: <Users size={32}/>, name: 'Khu Vui Chơi Trẻ Em' },
          ].map((a, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100 text-center flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="bg-violet-50 p-5 rounded-full text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition duration-300">
                {a.icon}
              </div>
              <h4 className="font-bold text-lg text-violet-950">{a.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFloorPlans = () => {
    const plans = [
      { name: '1 Phòng Ngủ', img: 'https://images.unsplash.com/photo-1598928506311-c55dd1b764b8?w=800&q=80', area: '50m2', price: 'Từ 2.1 Tỷ' },
      { name: '2 Phòng Ngủ', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', area: '75m2', price: 'Từ 3.2 Tỷ' },
      { name: '3 Phòng Ngủ', img: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80', area: '110m2', price: 'Từ 4.8 Tỷ' },
    ];
    return (
      <section className="py-24 bg-white" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Mặt Bằng <span className="text-violet-600">Điển Hình</span></h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Thiết kế tối ưu công năng, đón nắng gió tự nhiên kiến tạo không gian sống hoàn mỹ.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3 space-y-4">
              {plans.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveFloorPlan(i)}
                  className={`w-full text-left p-6 rounded-2xl font-bold transition text-lg border ${activeFloorPlan === i ? 'bg-violet-600 text-white border-violet-600 shadow-xl' : 'bg-white text-violet-950 border-violet-100 hover:border-violet-300 hover:bg-violet-50'}`}
                >
                  {p.name}
                  {activeFloorPlan === i && <span className="block text-sm font-normal opacity-90 mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1"><Maximize size={16}/> {p.area}</span>
                    <span>Giá: {p.price}</span>
                  </span>}
                </button>
              ))}
            </div>
            <div className="w-full lg:w-2/3 bg-violet-50 rounded-3xl p-8 flex items-center justify-center min-h-[400px] border border-violet-100">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={plans[activeFloorPlan].img} alt="Floor plan" className="max-w-full h-auto max-h-[500px] rounded-xl shadow-lg object-contain bg-white p-4" />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderStats = () => (
    <section className="py-20 bg-violet-600 text-white relative overflow-hidden" style={fontBody}>
      <div className="absolute inset-0 bg-violet-950/20"></div>
      <div className={`${MAX_W} px-4 relative z-10`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '3000+', label: 'Căn Hộ' },
            { num: '60%', label: 'Không Gian Xanh' },
            { num: '5', label: 'Tháp Căn Hộ' },
            { num: '2026', label: 'Năm Bàn Giao' }
          ].map((s, i) => (
            <div key={i} className="p-4">
              <div className="text-5xl lg:text-6xl font-extrabold text-amber-500 mb-4 drop-shadow-md" style={fontHeading}>{s.num}</div>
              <div className="font-bold text-violet-100 uppercase tracking-widest text-sm lg:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderGallery = () => {
    // Show first 6 images from LIST_GALLERY on Home Page
    const images = LIST_GALLERY.slice(0, 6);
    return (
      <section className="py-24 bg-white" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Thư Viện <span className="text-violet-600">Hình Ảnh</span></h2>
              <p className="text-slate-600 text-lg">Khám phá vẻ đẹp kiến trúc và không gian sống đỉnh cao.</p>
            </div>
            <button onClick={() => navigateTo('gallery')} className="text-violet-600 font-bold flex items-center gap-2 hover:text-violet-800 transition">
              Xem tất cả <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {images.map((item, i) => (
              <div 
                key={i} 
                className="relative group overflow-hidden rounded-3xl cursor-pointer h-48 lg:h-72 shadow-sm" 
                onClick={() => setSelectedGalleryImg(item.img)}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.title} />
                <div className="absolute inset-0 bg-violet-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white backdrop-blur-sm">
                  <Camera size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTimeline = () => (
    <section className="py-24 bg-violet-50" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Tiến Độ <span className="text-violet-600">Dự Án</span></h2>
          <p className="text-slate-600 text-lg">Cập nhật liên tục tiến độ thi công, đảm bảo cam kết bàn giao đúng hạn.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {LIST_TIMELINE.slice(0, 4).map((t, i) => (
            <div key={t.id} className="flex gap-6 items-start relative group">
              {i !== 3 && <div className={`absolute left-[1.35rem] top-12 bottom-[-2rem] w-1 ${t.done ? 'bg-violet-600' : 'bg-violet-200'}`}></div>}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${t.done ? 'bg-violet-600 text-white' : 'bg-white border-4 border-violet-200 text-violet-300'}`}>
                {t.done ? <Check size={20} /> : <div className="w-3 h-3 rounded-full bg-violet-200"></div>}
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100 flex-1 hover:shadow-xl transition group-hover:-translate-y-1">
                <span className="text-amber-500 font-extrabold text-sm mb-3 block uppercase tracking-wider">{t.date}</span>
                <h4 className="text-2xl font-bold text-violet-950 mb-3" style={fontHeading}>{t.title}</h4>
                <p className="text-slate-600 text-lg">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderTestimonials = () => (
    <section className="py-24 bg-white" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Khách Hàng <span className="text-violet-600">Nói Gì</span></h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Lắng nghe chia sẻ từ những cư dân tương lai đã tin tưởng lựa chọn SmartUrban.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[
            { name: 'Anh Tuấn Anh', role: 'Cư dân tháp S1', text: 'Không gian sống tuyệt vời, thiết kế căn hộ rất thông minh, đặc biệt là hệ thống Smart Home giúp gia đình tôi cực kỳ thoải mái và yên tâm.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
            { name: 'Chị Mai Linh', role: 'Cư dân tháp R2', text: 'Tiện ích nội khu rất đầy đủ, từ siêu thị, hồ bơi đến công viên. Các bé nhà mình có không gian vui chơi an toàn và xanh mát ngay dưới nhà.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
            { name: 'Anh Hoàng Nam', role: 'Nhà Đầu Tư', text: 'Vị trí đắc địa, tiến độ thi công nhanh chóng. Tôi rất hài lòng về tiềm năng tăng giá cũng như khả năng cho thuê của dự án trong tương lai.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' }
          ].map((t, i) => (
            <div key={i} className="bg-violet-50 p-10 rounded-3xl relative mt-8 border border-violet-100 hover:shadow-xl transition">
              <div className="absolute -top-10 left-10">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={t.img} alt={t.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" />
              </div>
              <Quote className="text-amber-500 w-12 h-12 absolute right-8 top-8 opacity-20" />
              <div className="mt-6">
                <p className="text-slate-700 italic mb-8 text-lg leading-relaxed font-medium">"{t.text}"</p>
                <h4 className="font-bold text-violet-950 text-lg">{t.name}</h4>
                <p className="text-sm font-semibold text-violet-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderNews = () => (
    <section className="py-24 bg-violet-50" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Tin Tức & <span className="text-violet-600">Sự Kiện</span></h2>
            <p className="text-slate-600 text-lg">Cập nhật thông tin mới nhất về dự án và thị trường bất động sản.</p>
          </div>
          <button onClick={() => navigateTo('news')} className="text-violet-600 font-bold flex items-center gap-2 hover:text-violet-800 transition">
            Xem tất cả <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LIST_NEWS.slice(0, 3).map((n) => (
            <div 
              key={n.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition border border-violet-100 group cursor-pointer" 
              onClick={() => setSelectedArticle(n)}
            >
              <div className="overflow-hidden h-56">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-amber-500 mb-4 font-bold uppercase tracking-wider">
                  <Calendar size={16} /> {n.date}
                </div>
                <h4 className="text-xl font-bold text-violet-950 mb-4 line-clamp-2 group-hover:text-violet-600 transition leading-snug" style={fontHeading}>{n.title}</h4>
                <div className="text-slate-500 flex items-center gap-2 group-hover:text-violet-600 font-bold">
                  Đọc tiếp <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFaq = () => {
    const faqs = [
      { q: 'Pháp lý dự án bao gồm những gì?', a: 'Dự án đã có đầy đủ giấy phép xây dựng, phê duyệt 1/500 và sổ hồng sở hữu lâu dài cho người Việt Nam.' },
      { q: 'Khi nào dự án bàn giao nhà?', a: 'Dự kiến bàn giao vào Quý 4/2026 với tiêu chuẩn hoàn thiện nội thất cao cấp nhập khẩu.' },
      { q: 'Có hỗ trợ vay ngân hàng không?', a: 'Ngân hàng đối tác hỗ trợ vay lên đến 70% giá trị căn hộ, ân hạn nợ gốc 24 tháng và lãi suất 0%.' },
      { q: 'Tiêu chuẩn bàn giao gồm những gì?', a: 'Bàn giao hoàn thiện cơ bản bao gồm hệ thống tủ bếp, thiết bị vệ sinh cao cấp, máy lạnh âm trần và hệ thống nhà thông minh Smart Home.' },
    ];
    return (
      <section className="py-24 bg-white" style={fontBody}>
        <div className={`${MAX_W} px-4 flex flex-col lg:flex-row gap-16`}>
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-extrabold text-violet-950 mb-6 leading-tight" style={fontHeading}>Câu Hỏi <br/><span className="text-violet-600">Thường Gặp</span></h2>
            <p className="text-slate-600 mb-8 text-lg">Giải đáp nhanh những thắc mắc phổ biến của khách hàng về dự án SmartUrban.</p>
            <button onClick={() => navigateTo('contact')} className="bg-violet-50 text-violet-600 font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-violet-100 transition shadow-sm border border-violet-100">
              Đặt câu hỏi khác <ArrowRight size={20} />
            </button>
          </div>
          <div className="lg:w-2/3 space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-violet-100 rounded-3xl overflow-hidden bg-white hover:border-violet-300 transition shadow-sm">
                <button 
                  className="w-full text-left p-8 flex justify-between items-center font-bold text-xl text-violet-950 hover:bg-violet-50 transition"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={fontHeading}
                >
                  {f.q}
                  {activeFaq === i ? <Minus className="text-violet-600 shrink-0" size={24} /> : <Plus className="text-violet-600 shrink-0" size={24} />}
                </button>
                {activeFaq === i && (
                  <div className="p-8 pt-0 text-slate-600 text-lg leading-relaxed border-t border-violet-50 mt-2">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderCta = () => (
    <section className="py-32 bg-gradient-to-br from-violet-600 to-violet-950 text-white relative overflow-hidden" style={fontBody}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      <div className={`${MAX_W} px-4 relative z-10 text-center`}>
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight" style={fontHeading}>Bạn Đã Sẵn Sàng <br/>Trải Nghiệm?</h2>
        <p className="text-violet-200 text-xl max-w-2xl mx-auto mb-12">Đăng ký ngay hôm nay để nhận thông tin ưu đãi độc quyền và đặt lịch tham quan nhà mẫu thực tế.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button onClick={() => navigateTo('contact')} className="w-full md:w-auto bg-amber-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-amber-600 transition shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-2">
            Đăng Ký Tham Quan <ArrowRight size={20} />
          </button>
          <button onClick={() => alert('Brochure đang được tải xuống...')} className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
            Tải Brochure PDF
          </button>
        </div>
      </div>
    </section>
  );

  const renderNewsletter = () => (
    <section className="py-20 bg-violet-50" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-violet-100 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 text-violet-50 opacity-50 pointer-events-none">
            <Mail size={300} />
          </div>
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-3xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Đăng ký nhận tin tức</h3>
            <p className="text-slate-600 text-lg">Đừng bỏ lỡ các thông tin cập nhật về tiến độ và bảng giá ưu đãi.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex w-full lg:w-auto flex-1 max-w-xl gap-3 relative z-10">
            <input required type="email" placeholder="Nhập địa chỉ email của bạn..." className="w-full bg-violet-50 border-2 border-violet-100 px-8 py-5 rounded-full focus:outline-none focus:border-violet-600 text-lg shadow-inner text-slate-700" />
            <button type="submit" className="bg-violet-950 text-white px-10 py-5 rounded-full font-bold hover:bg-violet-800 transition text-lg shadow-lg">Gửi</button>
          </form>
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-violet-950 text-violet-200 py-20" style={fontBody}>
      <div className={`${MAX_W} px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16`}>
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-3xl mb-6" style={fontHeading}>
            <Building2 size={36} className="text-violet-400" />
            <span>SmartUrban</span>
          </div>
          <p className="mb-8 opacity-80 leading-relaxed">Kiến tạo không gian sống đỉnh cao giữa lòng đô thị. Nơi hội tụ tinh hoa của thiết kế hiện đại và công nghệ thông minh.</p>
          <div className="flex items-center gap-3">
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 rounded-full bg-violet-900 flex items-center justify-center hover:bg-blue-600 text-white transition">
               <FacebookIcon className="w-4 h-4" />
             </a>
             <a href="https://zalo.me/0919006030" target="_blank" rel="noopener noreferrer" title="Zalo" className="w-10 h-10 rounded-full bg-violet-900 flex items-center justify-center hover:bg-[#0068FF] text-white transition p-2">
               <ZaloIcon className="w-full h-full" />
             </a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 rounded-full bg-violet-900 flex items-center justify-center hover:bg-pink-600 text-white transition">
               <InstagramIcon className="w-4 h-4" />
             </a>
             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="Youtube" className="w-10 h-10 rounded-full bg-violet-900 flex items-center justify-center hover:bg-red-600 text-white transition">
               <YoutubeIcon className="w-4 h-4" />
             </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8" style={fontHeading}>Thông Tin Liên Hệ</h4>
          <ul className="space-y-6 opacity-90">
            <li>
              <a href="https://maps.google.com/?q=So+1+Dai+lo+Moi+TPHCM" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:text-white transition">
                <MapPin size={24} className="shrink-0 text-amber-500" /> <span>Số 1 Đại lộ Mới, Quận Trung Tâm, TP.HCM</span>
              </a>
            </li>
            <li>
              <a href="tel:0919006030" className="flex items-center gap-4 hover:text-white transition">
                <Phone size={24} className="shrink-0 text-amber-500" /> <span className="font-bold text-white text-lg">0919 006 030</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@smarturban.vn" className="flex items-center gap-4 hover:text-white transition">
                <Mail size={24} className="shrink-0 text-amber-500" /> <span>info@smarturban.vn</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8" style={fontHeading}>Liên Kết Nhanh</h4>
          <ul className="space-y-4 opacity-90 font-medium">
            <li><button onClick={() => navigateTo('home')} className="hover:text-amber-500 hover:translate-x-2 transition duration-300">Trang Chủ</button></li>
            <li><button onClick={() => navigateTo('projects')} className="hover:text-amber-500 hover:translate-x-2 transition duration-300">Căn Hộ</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-amber-500 hover:translate-x-2 transition duration-300">Về Chúng Tôi</button></li>
            <li><button onClick={() => navigateTo('gallery')} className="hover:text-amber-500 hover:translate-x-2 transition duration-300">Thư Viện</button></li>
            <li><button onClick={() => navigateTo('news')} className="hover:text-amber-500 hover:translate-x-2 transition duration-300">Tin Tức</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-8" style={fontHeading}>Giờ Mở Cửa Nhà Mẫu</h4>
          <ul className="space-y-4 opacity-90">
            <li className="flex justify-between border-b border-violet-800/50 pb-4"><span>Thứ 2 - Thứ 6</span> <span className="font-semibold text-white">08:00 - 20:00</span></li>
            <li className="flex justify-between border-b border-violet-800/50 pb-4"><span>Thứ 7</span> <span className="font-semibold text-white">08:00 - 18:00</span></li>
            <li className="flex justify-between pb-4"><span>Chủ Nhật</span> <span className="font-semibold text-white">09:00 - 17:00</span></li>
          </ul>
        </div>
      </div>
      <div className={`${MAX_W} px-4 border-t border-violet-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-60 font-medium`}>
        <p>&copy; 2026 SmartUrban. Phát triển bởi PlatformBDS.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Điều khoản sử dụng</a>
          <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
        </div>
      </div>
    </footer>
  );

  const renderProjects = () => {
    // Reactive filtering based on search query, type, priceRange, tower, and area
    const filteredApartments = LIST_APARTMENTS.filter(apt => {
      const matchesSearch = searchQuery 
        ? apt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          apt.description.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;
      
      const matchesType = filterType === 'Tất cả' || apt.type === filterType;
      
      const matchesTower = filterTower === 'Tất cả' || apt.tower === filterTower;
      
      let matchesPrice = true;
      if (filterPriceRange !== 'Tất cả') {
        if (filterPriceRange === 'Dưới 2 tỷ') {
          matchesPrice = apt.priceNum < 2.0;
        } else if (filterPriceRange === '2 - 4 tỷ') {
          matchesPrice = apt.priceNum >= 2.0 && apt.priceNum <= 4.0;
        } else if (filterPriceRange === '4 - 7 tỷ') {
          matchesPrice = apt.priceNum >= 4.0 && apt.priceNum <= 7.0;
        } else if (filterPriceRange === 'Trên 7 tỷ') {
          matchesPrice = apt.priceNum > 7.0;
        }
      }

      let matchesArea = true;
      if (filterArea !== 'Tất cả') {
        if (filterArea === 'Dưới 60m2') {
          matchesArea = apt.areaNum < 60;
        } else if (filterArea === '60 - 100m2') {
          matchesArea = apt.areaNum >= 60 && apt.areaNum <= 100;
        } else if (filterArea === 'Trên 100m2') {
          matchesArea = apt.areaNum > 100;
        }
      }

      return matchesSearch && matchesType && matchesTower && matchesPrice && matchesArea;
    });

    return (
      <div className="bg-violet-50 min-h-screen pt-24 pb-24" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-950 mb-6" style={fontHeading}>Danh Sách <span className="text-violet-600">Căn Hộ</span></h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Lựa chọn tổ ấm lý tưởng của bạn từ quỹ căn hộ đa dạng của chúng tôi với thiết kế hiện đại và công năng tối ưu.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100">
                <h3 className="font-bold text-xl text-violet-950 mb-6 border-b border-violet-100 pb-4" style={fontHeading}>Bộ Lọc Tìm Kiếm</h3>
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-2 uppercase tracking-wider">Từ Khóa</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Tìm tên căn hộ..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-violet-50 border-none p-4 pl-10 rounded-xl focus:ring-2 focus:ring-violet-600 text-slate-700 font-medium"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>

                  {/* Unit Type Radio list */}
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-4 uppercase tracking-wider">Loại Căn Hộ</label>
                    <div className="space-y-3">
                      {['Tất cả', 'Studio', '1 Phòng Ngủ', '2 Phòng Ngủ', '3 Phòng Ngủ', 'Penthouse'].map((type, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="unitType"
                            checked={filterType === type}
                            onChange={() => setFilterType(type)}
                            className="w-5 h-5 rounded-full border-violet-200 text-violet-600 focus:ring-violet-600" 
                          />
                          <span className={`${filterType === type ? 'text-violet-600 font-bold' : 'text-slate-700'} font-medium group-hover:text-violet-600 transition`}>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Tower Selector */}
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-2 uppercase tracking-wider">Tòa Tháp</label>
                    <select 
                      value={filterTower}
                      onChange={(e) => setFilterTower(e.target.value)}
                      className="w-full bg-violet-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-violet-600 text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="Tất cả">Tất cả tòa</option>
                      <option value="Tháp S1">Tháp S1 (Sapphire)</option>
                      <option value="Tháp R2">Tháp R2 (Ruby)</option>
                      <option value="Tháp D1">Tháp D1 (Diamond)</option>
                    </select>
                  </div>

                  {/* Price Range Selector */}
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-2 uppercase tracking-wider">Mức Giá</label>
                    <select 
                      value={filterPriceRange}
                      onChange={(e) => setFilterPriceRange(e.target.value)}
                      className="w-full bg-violet-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-violet-600 text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="Tất cả">Tất cả mức giá</option>
                      <option value="Dưới 2 tỷ">Dưới 2 tỷ</option>
                      <option value="2 - 4 tỷ">2 - 4 tỷ</option>
                      <option value="4 - 7 tỷ">4 - 7 tỷ</option>
                      <option value="Trên 7 tỷ">Trên 7 tỷ</option>
                    </select>
                  </div>

                  {/* Size Area Selector */}
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-2 uppercase tracking-wider">Diện Tích (m²)</label>
                    <select 
                      value={filterArea}
                      onChange={(e) => setFilterArea(e.target.value)}
                      className="w-full bg-violet-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-violet-600 text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="Tất cả">Tất cả diện tích</option>
                      <option value="Dưới 60m2">Dưới 60 m²</option>
                      <option value="60 - 100m2">60 - 100 m²</option>
                      <option value="Trên 100m2">Trên 100 m²</option>
                    </select>
                  </div>

                  {/* Reset Button */}
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('Tất cả');
                      setFilterPriceRange('Tất cả');
                      setFilterTower('Tất cả');
                      setFilterArea('Tất cả');
                    }}
                    className="w-full bg-violet-50 hover:bg-violet-100 text-violet-600 font-bold py-4 rounded-xl transition border border-violet-100 mt-4"
                  >
                    Xóa Bộ Lọc
                  </button>
                </div>
              </div>
            </div>
            
            {/* Grid */}
            <div className="w-full lg:w-3/4">
              {filteredApartments.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-violet-100">
                  <Building2 size={64} className="text-violet-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-violet-950 mb-2">Không tìm thấy căn hộ</h3>
                  <p className="text-slate-500 mb-6">Hãy thử thay đổi điều kiện tìm kiếm hoặc xóa các bộ lọc hiện tại.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('Tất cả');
                      setFilterPriceRange('Tất cả');
                      setFilterTower('Tất cả');
                      setFilterArea('Tất cả');
                    }}
                    className="bg-violet-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-violet-700 transition shadow-lg"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredApartments.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition border border-violet-100 group">
                      <div className="relative h-64 overflow-hidden">
                        <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-violet-600 font-extrabold text-sm shadow-lg">
                          {item.price}
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-violet-950 mb-2" style={fontHeading}>{item.name}</h3>
                        <p className="text-slate-500 mb-6 flex items-center gap-2 font-medium"><MapPin size={16} className="text-amber-500" /> {item.location}</p>
                        <div className="flex justify-between text-slate-600 text-sm mb-8 pt-6 border-t border-violet-50 font-semibold">
                          <span className="flex items-center gap-2"><Bed size={20} className="text-violet-400"/> {item.beds} PN</span>
                          <span className="flex items-center gap-2"><Bath size={20} className="text-violet-400"/> {item.baths} WC</span>
                          <span className="flex items-center gap-2"><Maximize size={20} className="text-violet-400"/> {item.area}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedApartment(item)}
                          className="w-full bg-violet-50 text-violet-600 font-bold py-4 rounded-xl hover:bg-violet-600 hover:text-white transition flex justify-center items-center gap-2"
                        >
                          Xem Chi Tiết <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAboutPage = () => {
    return (
      <div className="bg-white min-h-screen pt-24 pb-24" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-violet-950 mb-8 leading-tight" style={fontHeading}>Về <span className="text-violet-600">SmartUrban</span></h1>
            <p className="text-slate-600 text-xl leading-relaxed">Hành trình kiến tạo chuẩn mực sống mới, mang lại giá trị bền vững và môi trường sống lý tưởng cho cư dân đô thị hiện đại, nơi hội tụ của giới tinh hoa.</p>
          </div>
          
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80" alt="Company" className="w-full h-[500px] object-cover rounded-[3rem] mb-16 shadow-2xl" />
          
          {/* Interactive Working Tabs */}
          <div className="flex justify-center border-b border-violet-100 mb-16">
            <div className="flex gap-8">
              {[
                { id: 'story', label: 'Tầm Nhìn & Sứ Mệnh' },
                { id: 'leadership', label: 'Ban Lãnh Đạo' },
                { id: 'timeline', label: 'Cột Mốc Phát Triển' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAboutTab(tab.id)}
                  className={`pb-4 text-lg font-bold border-b-4 transition ${aboutTab === tab.id ? 'border-violet-600 text-violet-600' : 'border-transparent text-slate-500 hover:text-violet-600'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          {aboutTab === 'story' && (
            <div className="space-y-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="bg-violet-50 p-10 rounded-3xl border border-violet-100">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-8 shadow-sm">
                    <Star size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-violet-950 mb-4" style={fontHeading}>Tầm Nhìn</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">Trở thành biểu tượng bất động sản của khu vực, tiên phong trong việc ứng dụng công nghệ xanh và thông minh vào không gian sống đẳng cấp.</p>
                </div>
                <div className="bg-violet-600 p-10 rounded-3xl text-white shadow-xl shadow-violet-200">
                  <div className="w-16 h-16 bg-violet-500 rounded-2xl flex items-center justify-center text-white mb-8">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={fontHeading}>Sứ Mệnh</h3>
                  <p className="text-violet-100 text-lg leading-relaxed">Không chỉ xây nhà, chúng tôi kiến tạo một cộng đồng văn minh, thịnh vượng, nơi mỗi cá nhân được phát triển toàn diện trong môi trường tốt nhất.</p>
                </div>
                <div className="bg-violet-50 p-10 rounded-3xl border border-violet-100">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-8 shadow-sm">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-violet-950 mb-4" style={fontHeading}>Giá Trị Cốt Lõi</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">Chất lượng - Đổi mới - Bền vững - Tận tâm. Chúng tôi luôn đặt sự hài lòng và trải nghiệm của khách hàng làm trung tâm trong mọi hoạt động.</p>
                </div>
              </div>

              {/* Partners list */}
              <div className="bg-violet-50 p-12 rounded-[3rem] border border-violet-100">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Đối Tác Chiến Lược</h3>
                  <p className="text-slate-600 text-lg">SmartUrban đồng hành cùng các thương hiệu uy tín hàng đầu trong và ngoài nước.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: 'Coteccons', desc: 'Tổng thầu xây dựng' },
                    { name: 'Savills', desc: 'Đơn vị quản lý' },
                    { name: 'PTW Architects', desc: 'Thiết kế kiến trúc' },
                    { name: 'Techcombank', desc: 'Ngân hàng bảo lãnh' },
                  ].map((p, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-violet-100 text-center shadow-sm hover:shadow-md transition">
                      <h4 className="font-bold text-violet-950 text-xl mb-2" style={fontHeading}>{p.name}</h4>
                      <p className="text-slate-500">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {aboutTab === 'leadership' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Hội Đồng Quản Trị & Ban Giám Đốc</h3>
                <p className="text-slate-600 text-lg">Những người dẫn đường tận tụy, sở hữu tầm nhìn vĩ mô và kinh nghiệm dày dặn.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {LIST_LEADERS.map((leader) => (
                  <div key={leader.id} className="bg-violet-50 border border-violet-100 p-6 rounded-[2.5rem] text-center shadow-sm hover:shadow-xl transition">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={leader.img} alt={leader.name} className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white shadow-md mb-6" />
                    <span className="text-amber-500 font-extrabold text-xs uppercase tracking-wider mb-2 block">{leader.role}</span>
                    <h4 className="font-bold text-violet-950 text-xl mb-4" style={fontHeading}>{leader.name}</h4>
                    <button 
                      onClick={() => setSelectedLeader(leader)}
                      className="bg-white text-violet-600 font-bold px-5 py-2.5 rounded-full border border-violet-100 shadow-sm hover:bg-violet-600 hover:text-white transition text-sm"
                    >
                      Xem Tiểu Sử
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aboutTab === 'timeline' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-extrabold text-violet-950 mb-4" style={fontHeading}>Lịch Sử Dự Án</h3>
                <p className="text-slate-600 text-lg">Hành trình ghi dấu những nỗ lực thi công bền bỉ ngày đêm.</p>
              </div>
              <div className="space-y-8 relative">
                {LIST_TIMELINE.map((t, i) => (
                  <div key={t.id} className="flex gap-6 items-start relative group">
                    {i !== LIST_TIMELINE.length - 1 && <div className={`absolute left-[1.35rem] top-12 bottom-[-2rem] w-1 ${t.done ? 'bg-violet-600' : 'bg-violet-200'}`}></div>}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${t.done ? 'bg-violet-600 text-white' : 'bg-white border-4 border-violet-200 text-violet-300'}`}>
                      {t.done ? <Check size={20} /> : <div className="w-3 h-3 rounded-full bg-violet-200"></div>}
                    </div>
                    <div className="bg-violet-50 p-8 rounded-3xl border border-violet-100 flex-1 hover:shadow-xl transition group-hover:-translate-y-1">
                      <span className="text-amber-500 font-extrabold text-sm mb-3 block uppercase tracking-wider">{t.date}</span>
                      <h4 className="text-2xl font-bold text-violet-950 mb-3" style={fontHeading}>{t.title}</h4>
                      <p className="text-slate-600 text-lg">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGalleryPage = () => {
    // Filter logic for Gallery tabs
    const filteredGallery = selectedGalleryTab === 'Tất cả' 
      ? LIST_GALLERY 
      : LIST_GALLERY.filter(item => item.category === selectedGalleryTab);

    return (
      <div className="bg-violet-50 min-h-screen pt-24 pb-24" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-950 mb-6" style={fontHeading}>Thư Viện <span className="text-violet-600">Hình Ảnh</span></h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Trải nghiệm không gian sống thực tế qua góc nhìn chân thực nhất từ ngoại khu đến nội thất căn hộ.</p>
          </div>

          {/* Interactive tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Tất cả', 'Ngoại khu', 'Nội thất', 'Tiện ích'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                className={`px-6 py-2.5 rounded-full font-bold transition shadow-sm ${selectedGalleryTab === tab ? 'bg-violet-600 text-white shadow-md' : 'bg-white text-violet-950 hover:bg-violet-50 border border-violet-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((img, i) => (
              <div 
                key={i} 
                className="relative group overflow-hidden rounded-3xl cursor-pointer h-64 md:h-80 shadow-sm border border-violet-100 bg-white" 
                onClick={() => setSelectedGalleryImg(img.img)}
              >
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={img.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={img.title} />
                <div className="absolute inset-0 bg-violet-950/45 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white backdrop-blur-[2px] p-6 text-center">
                  <Maximize size={36} className="mb-2" />
                  <span className="font-bold text-lg">{img.title}</span>
                  <span className="text-xs text-amber-400 mt-1 uppercase tracking-widest">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsPage = () => {
    // News search and category filter logic
    const filteredNews = LIST_NEWS.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchNewsQuery.toLowerCase()) || 
                            news.excerpt.toLowerCase().includes(searchNewsQuery.toLowerCase());
      const matchesCategory = selectedNewsCategory === 'Tất cả' || news.category === selectedNewsCategory;
      return matchesSearch && matchesCategory;
    });

    const featuredArticle = LIST_NEWS.find(news => news.featured);
    const regularNews = filteredNews.filter(news => news.id !== featuredArticle?.id);

    return (
      <div className="bg-white min-h-screen pt-24 pb-32" style={fontBody}>
        <div className={`${MAX_W} px-4`}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-950 mb-6" style={fontHeading}>Tin Tức & <span className="text-violet-600">Sự Kiện</span></h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Tin tức thị trường, tiến độ thi công và các sự kiện nổi bật nhất của SmartUrban.</p>
          </div>
          
          {/* Interactive Search & Category filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-violet-50 pb-8">
            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Sự kiện', 'Tiến độ', 'Chính sách', 'Thị trường'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedNewsCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-bold transition text-sm ${selectedNewsCategory === cat ? 'bg-violet-600 text-white shadow-md' : 'bg-violet-50 text-slate-700 hover:bg-violet-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Tìm tin tức..." 
                value={searchNewsQuery}
                onChange={(e) => setSearchNewsQuery(e.target.value)}
                className="w-full bg-violet-50 border-none p-3.5 pl-10 rounded-xl focus:ring-2 focus:ring-violet-600 text-slate-700 font-medium"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              {searchNewsQuery && (
                <button onClick={() => setSearchNewsQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Xóa</button>
              )}
            </div>
          </div>

          {/* Main featured news displays if no active query filter, otherwise regular grid */}
          {searchNewsQuery === '' && selectedNewsCategory === 'Tất cả' && featuredArticle && (
            <div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 cursor-pointer group" 
              onClick={() => setSelectedArticle(featuredArticle)}
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative h-[500px]">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={featuredArticle.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="News main" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-950/50 to-transparent flex flex-col justify-end p-12 text-white">
                  <span className="bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full w-max mb-6 uppercase tracking-wider">Tin Nổi Bật</span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={fontHeading}>{featuredArticle.title}</h2>
                  <p className="text-violet-200 text-lg line-clamp-2">{featuredArticle.excerpt}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 justify-between">
                {LIST_NEWS.filter(news => !news.featured).slice(0, 3).map((n) => (
                  <div key={n.id} className="flex gap-6 items-center bg-violet-50 p-6 rounded-[2rem] hover:shadow-lg hover:bg-white hover:border hover:border-violet-100 transition border border-transparent h-full">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-2xl shrink-0 group-hover:scale-105 transition duration-500" alt="Thumb" />
                    <div>
                      <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-3 uppercase tracking-wider">
                        <Calendar size={16} /> {n.date}
                      </div>
                      <h3 className="text-xl font-bold text-violet-950 group-hover:text-violet-600 transition leading-snug" style={fontHeading}>{n.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular News Grid */}
          <h3 className="text-3xl font-extrabold text-violet-950 mb-8" style={fontHeading}>
            {searchNewsQuery || selectedNewsCategory !== 'Tất cả' ? 'Kết quả tìm kiếm' : 'Tin Tức Khác'}
          </h3>
          
          {filteredNews.length === 0 ? (
            <div className="bg-violet-50 rounded-3xl p-16 text-center border border-violet-100">
              <Calendar size={64} className="text-violet-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-violet-950 mb-2">Không tìm thấy tin tức</h3>
              <p className="text-slate-500">Thử tìm kiếm với từ khóa khác.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(searchNewsQuery || selectedNewsCategory !== 'Tất cả' ? filteredNews : regularNews).map((n) => (
                <div 
                  key={n.id} 
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition border border-violet-100 group cursor-pointer" 
                  onClick={() => setSelectedArticle(n)}
                >
                  <div className="overflow-hidden h-56">
                    <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-amber-500 mb-4 font-bold uppercase tracking-wider">
                      <Calendar size={16} /> {n.date}
                    </div>
                    <h4 className="text-xl font-bold text-violet-950 mb-4 line-clamp-2 group-hover:text-violet-600 transition leading-snug" style={fontHeading}>{n.title}</h4>
                    <div className="text-slate-500 flex items-center gap-2 group-hover:text-violet-600 font-bold">
                      Đọc tiếp <ChevronRight size={18} />
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

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneClean = contactPhone.replace(/\s/g, '');
    if (!phoneClean || !/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      alert('Số điện thoại phải từ 10-11 số (VD: 0919006030 hoặc +84919006030).');
      return;
    }
    if (typeof (globalThis as any).submitContactForm === 'function') {
      (globalThis as any).submitContactForm({
        fullName: contactName,
        phone: phoneClean,
        email: contactEmail || undefined,
        message: contactMessage || 'Yêu cầu tư vấn căn hộ SmartUrban',
        source: 'website_contact_form',
      }).catch(() => {});
    }
    setContactSubmitted(true);
  };

  const renderContactPage = () => (
    <div className="bg-violet-50 min-h-screen pt-24 pb-24" style={fontBody}>
      <div className={`${MAX_W} px-4`}>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-violet-950 mb-6" style={fontHeading}>Liên Hệ <span className="text-violet-600">Với Chúng Tôi</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Đội ngũ chuyên viên tư vấn cao cấp luôn sẵn sàng hỗ trợ bạn 24/7 để lựa chọn căn hộ ưng ý nhất.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100 flex items-start gap-5 hover:shadow-md transition">
              <div className="bg-violet-100 p-4 rounded-2xl text-violet-600 shrink-0"><MapPin size={28}/></div>
              <div>
                <h4 className="font-bold text-violet-950 text-lg mb-2">Địa chỉ nhà mẫu</h4>
                <p className="text-slate-600 leading-relaxed">Số 1 Đại lộ Mới, Quận Trung Tâm, TP.HCM</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100 flex items-start gap-5 hover:shadow-md transition">
              <div className="bg-violet-100 p-4 rounded-2xl text-violet-600 shrink-0"><Phone size={28}/></div>
              <div>
                <h4 className="font-bold text-violet-950 text-lg mb-2">Hotline tư vấn</h4>
                <p className="text-slate-600 leading-relaxed font-bold text-violet-600">1800 9999 <span className="font-normal text-slate-500">(Miễn phí)</span></p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-violet-100 flex items-start gap-5 hover:shadow-md transition">
              <div className="bg-violet-100 p-4 rounded-2xl text-violet-600 shrink-0"><Mail size={28}/></div>
              <div>
                <h4 className="font-bold text-violet-950 text-lg mb-2">Email liên hệ</h4>
                <p className="text-slate-600 leading-relaxed">info@smarturban.vn</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            {contactSubmitted ? (
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-violet-100 text-center py-16 space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-extrabold text-violet-950" style={fontHeading}>Gửi Yêu Cầu Thành Công!</h3>
                <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
                  Cảm ơn Quý khách <span className="font-bold text-violet-950">{contactName}</span>. Yêu cầu tư vấn của bạn về dòng căn hộ <span className="font-bold text-violet-950">{contactApartment}</span> đã được chuyển tới hệ thống.
                </p>
                <div className="bg-violet-50 p-6 rounded-2xl max-w-md mx-auto text-left space-y-2 border border-violet-100 text-sm">
                  <div><span className="text-slate-500">Mã yêu cầu:</span> <span className="font-bold text-violet-950">SU-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                  <div><span className="text-slate-500">Số điện thoại:</span> <span className="font-bold text-violet-950">{contactPhone}</span></div>
                  {contactEmail && <div><span className="text-slate-500">Email:</span> <span className="font-bold text-violet-950">{contactEmail}</span></div>}
                  {contactMessage && <div><span className="text-slate-500">Ghi chú:</span> <span className="text-slate-700 italic">"{contactMessage}"</span></div>}
                </div>
                <p className="text-slate-500 text-sm">
                  Chuyên viên cao cấp sẽ chủ động liên hệ lại hỗ trợ Quý khách trong vòng 15 phút.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactPhone('');
                      setContactEmail('');
                      setContactMessage('');
                    }}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-xl transition shadow-md"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-violet-100">
                <h3 className="text-3xl font-extrabold text-violet-950 mb-8" style={fontHeading}>Gửi Yêu Cầu Tư Vấn</h3>
                <form onSubmit={handleContactFormSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-sm font-bold text-violet-950 block mb-3 uppercase tracking-wider">Họ và tên</label>
                      <input 
                        required 
                        type="text" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-violet-50 border-2 border-violet-50 p-5 rounded-2xl focus:outline-none focus:border-violet-600 transition text-slate-700 font-medium" 
                        placeholder="Nguyễn Văn A" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-violet-950 block mb-3 uppercase tracking-wider">Số điện thoại</label>
                      <input 
                        required 
                        type="tel" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-violet-50 border-2 border-violet-50 p-5 rounded-2xl focus:outline-none focus:border-violet-600 transition text-slate-700 font-medium" 
                        placeholder="0909..." 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-3 uppercase tracking-wider">Email (Không bắt buộc)</label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-violet-50 border-2 border-violet-50 p-5 rounded-2xl focus:outline-none focus:border-violet-600 transition text-slate-700 font-medium" 
                      placeholder="email@domain.com" 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-3 uppercase tracking-wider">Quan tâm căn hộ</label>
                    <select 
                      value={contactApartment}
                      onChange={(e) => setContactApartment(e.target.value)}
                      className="w-full bg-violet-50 border-2 border-violet-50 p-5 rounded-2xl focus:outline-none focus:border-violet-600 transition text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="Studio">Studio</option>
                      <option value="1 Phòng Ngủ">1 Phòng Ngủ</option>
                      <option value="2 Phòng Ngủ">2 Phòng Ngủ</option>
                      <option value="3 Phòng Ngủ">3 Phòng Ngủ</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-violet-950 block mb-3 uppercase tracking-wider">Nội dung yêu cầu</label>
                    <textarea 
                      rows={5} 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-violet-50 border-2 border-violet-50 p-5 rounded-2xl focus:outline-none focus:border-violet-600 transition text-slate-700 font-medium resize-none" 
                      placeholder="Bạn cần tư vấn thêm về giá, chính sách hay đặt lịch tham quan..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-violet-600 text-white font-bold text-lg py-5 rounded-2xl hover:bg-violet-700 transition shadow-xl shadow-violet-200 flex justify-center items-center gap-2">
                    Gửi Thông Tin Yêu Cầu <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="bg-white">
      {renderHero()}
      {renderQuickSearch()}
      {renderFeatured()}
      {renderCategories()}
      {renderAbout()}
      {renderFeatures()}
      {renderAmenities()}
      {renderFloorPlans()}
      {renderStats()}
      {renderGallery()}
      {renderTimeline()}
      {renderTestimonials()}
      {renderNews()}
      {renderFaq()}
      {renderCta()}
      {renderNewsletter()}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white selection:bg-violet-200 selection:text-violet-900">
      {renderHeader()}
      
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'projects' && renderProjects()}
        {currentPage === 'about' && renderAboutPage()}
        {currentPage === 'gallery' && renderGalleryPage()}
        {currentPage === 'news' && renderNewsPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>

      {renderFooter()}

      {/* APARTMENT DETAIL MODAL */}
      {selectedApartment && (
        <div className="fixed inset-0 z-50 bg-violet-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl relative border border-violet-50 flex flex-col md:flex-row max-h-[90vh]">
            <button 
              onClick={() => setSelectedApartment(null)}
              className="absolute top-4 right-4 z-10 bg-violet-950/60 text-white hover:bg-violet-600 transition p-2.5 rounded-full backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            
            <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
              <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} 
                src={selectedApartment.img} 
                alt={selectedApartment.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-6 left-6 bg-violet-600 text-white font-extrabold px-6 py-2.5 rounded-full text-lg shadow-lg">
                {selectedApartment.price}
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="text-amber-500 font-bold uppercase tracking-wider text-sm flex items-center gap-1.5 mb-2">
                  <Building2 size={16} /> {selectedApartment.tower} - {selectedApartment.type}
                </span>
                <h2 className="text-3xl font-extrabold text-violet-950 mb-3" style={fontHeading}>
                  {selectedApartment.name}
                </h2>
                <p className="text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
                  <MapPin size={18} className="text-amber-500" /> {selectedApartment.location}
                </p>
                
                <div className="grid grid-cols-3 gap-4 p-4 bg-violet-50 rounded-2xl mb-6 text-center">
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Diện tích</div>
                    <div className="text-violet-950 font-bold flex items-center justify-center gap-1"><Maximize size={16} className="text-violet-500"/> {selectedApartment.area}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Phòng ngủ</div>
                    <div className="text-violet-950 font-bold flex items-center justify-center gap-1"><Bed size={16} className="text-violet-500"/> {selectedApartment.beds} PN</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Phòng tắm</div>
                    <div className="text-violet-950 font-bold flex items-center justify-center gap-1"><Bath size={16} className="text-violet-500"/> {selectedApartment.baths} WC</div>
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {selectedApartment.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="font-bold text-violet-950 mb-3">Thông số chi tiết:</h4>
                  <ul className="space-y-2">
                    {selectedApartment.specifications.map((spec: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedApartment(null);
                    setContactApartment(`${selectedApartment.type}`);
                    setContactMessage(`Tôi muốn nhận báo giá và thông tin chi tiết cho căn hộ: ${selectedApartment.name}`);
                    navigateTo('contact');
                  }}
                  className="flex-1 bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-700 transition shadow-lg text-center"
                >
                  Liên Hệ Tư Vấn
                </button>
                <button 
                  onClick={() => setSelectedApartment(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEWS DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-violet-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl relative border border-violet-50 max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 bg-violet-950/60 text-white hover:bg-violet-600 transition p-2.5 rounded-full backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            
            <div className="overflow-y-auto">
              <div className="relative h-64 md:h-80 w-full">
                <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 to-transparent"></div>
                <span className="absolute bottom-6 left-6 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 text-sm text-amber-500 mb-4 font-bold">
                  <Calendar size={16} /> {selectedArticle.date}
                </div>
                <h2 className="text-3xl font-extrabold text-violet-950 mb-6 leading-snug" style={fontHeading}>
                  {selectedArticle.title}
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                  {selectedArticle.content.map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-violet-50 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">SmartUrban Ban biên tập</span>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white transition font-bold px-6 py-3 rounded-xl"
                  >
                    Đóng Bài Viết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEADER DETAIL MODAL */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 bg-violet-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative border border-violet-50 p-8 text-center">
            <button 
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-violet-600 hover:text-white transition p-2 rounded-full text-slate-500"
            >
              <X size={20} />
            </button>
            
            <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedLeader.img} alt={selectedLeader.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-violet-100 shadow-md mb-6" />
            <span className="text-amber-500 font-extrabold text-sm uppercase tracking-wider mb-2 block">{selectedLeader.role}</span>
            <h3 className="text-2xl font-bold text-violet-950 mb-4" style={fontHeading}>{selectedLeader.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{selectedLeader.bio}</p>
            
            <button 
              onClick={() => setSelectedLeader(null)}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition"
            >
              Đóng Profile
            </button>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-[100] bg-violet-950/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedGalleryImg(null)}>
          <img onError={(e) => { e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='800' height='600' fill='%23E2E8F0'/><rect x='20' y='20' width='760' height='560' rx='8' fill='none' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='8 8'/><path d='M360,240 L440,240 L440,360 L360,360 Z M340,360 L460,360 L460,380 L340,380 Z M380,200 L420,200 L420,240 L380,240 Z' fill='%2394A3B8'/><text x='400' y='430' font-family='sans-serif' font-size='22' font-weight='bold' fill='%2364748B' text-anchor='middle'>PLATFORMBDS PREMIUM</text><text x='400' y='465' font-family='sans-serif' font-size='15' fill='%2394A3B8' text-anchor='middle'>PREMIUM PROPERTY TEMPLATE</text></svg>"; }} src={selectedGalleryImg} className="max-w-[95vw] max-h-[95vh] rounded-2xl shadow-2xl object-contain bg-white" alt="Lightbox View" />
          <button className="absolute top-8 right-8 text-white hover:text-amber-500 bg-violet-900/50 p-4 rounded-full backdrop-blur-md transition"><X size={32}/></button>
        </div>
      )}
    </div>
  );
}
