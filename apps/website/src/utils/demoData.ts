// 30 Mock Projects for Commercial Real Estate Platform
export const demoProjects = Array.from({ length: 30 }).map((_, idx) => {
  const types = ["Penthouse", "Biệt thự", "Sky Villa", "Đất nền", "Nghỉ dưỡng", "Nhà phố", "Căn hộ cao cấp", "Cho thuê"];
  const districts = ["Quận 1", "Quận 2", "Quận 7", "Cầu Giấy", "Tây Hồ", "Phú Quốc", "Bảo Lộc", "Nha Trang", "Bình Dương", "Đồng Nai"];
  const type = types[idx % types.length];
  const district = districts[idx % districts.length];
  
  return {
    id: `proj-${idx + 1}`,
    title: [
      `Biệt thự vườn Green Oasis Villa ${idx + 1}`,
      `Penthouse Royal Horizon Luxury ${idx + 1}`,
      `Căn hộ Sky Garden Residence ${idx + 1}`,
      `Đất nền phân lô Golden Valley ${idx + 1}`,
      `Resort Ocean Whisper Phú Quốc ${idx + 1}`,
      `Nhà phố thương mại Shophouse Center ${idx + 1}`,
      `Căn hộ thông minh Smart Premium ${idx + 1}`,
      `Căn hộ Studio Cozy Living ${idx + 1}`
    ][idx % 8],
    slug: `du-an-real-estate-${idx + 1}`,
    type: type,
    price: `${(idx + 1) * 3.5 + 4.5} tỷ VNĐ`,
    area: `${80 + idx * 15} m²`,
    bedrooms: (idx % 3) + 2,
    bathrooms: (idx % 2) + 1,
    address: `${district}, Việt Nam`,
    amenities: ["Bể bơi vô cực", "Sân Golf mini", "An ninh 3 lớp", "Phòng Gym/Spa", "Công viên đi bộ", "Khu BBQ ngoài trời"],
    legalStatus: "Sổ hồng sở hữu lâu dài",
    shortDescription: "Cơ hội sở hữu căn hộ nghỉ dưỡng với tầm nhìn panorama triệu đô, đầy đủ tiện ích ngoại khu cao cấp.",
    description: "Dự án sở hữu vị trí vàng đắc địa ngay trung tâm kết nối vùng cực kỳ thuận tiện. Quy hoạch kiến trúc chuẩn xanh Singapore tạo không gian sống trong lành, hài hòa cùng thiên nhiên tươi mát. Nội thất cao cấp nhập khẩu trực tiếp từ Đức, hỗ trợ ngân hàng vay 70% ân hạn nợ gốc.",
    thumbnail: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
    ][idx % 6],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    ]
  };
});

// 15 Mock Blog Posts
export const demoBlogs = Array.from({ length: 15 }).map((_, idx) => {
  const categories = ["Phân tích thị trường", "Cẩm nang đầu tư", "Kiến thức pháp lý", "Phong thủy nhà ở", "Góc nhìn chuyên gia"];
  const cat = categories[idx % categories.length];
  
  return {
    id: `blog-${idx + 1}`,
    title: [
      `Lãi suất ngân hàng giảm mạnh: Cơ hội gom bất động sản giá hời?`,
      `5 bước kiểm tra pháp lý sổ hồng sổ đỏ tránh mất tiền oan`,
      `Phong thủy căn hộ Penthouse: Sắp xếp ban công đón tài lộc`,
      `Phân tích tiềm năng sinh lời của căn hộ Condotel ven biển Phú Quốc`,
      `Dòng tiền đang đổ vào phân khúc đất nền Bảo Lộc - Lâm Đồng`,
      `Có nên xuống tiền mua nhà hình thành trong tương lai lúc này?`
    ][idx % 6] + ` (Kỳ ${Math.floor(idx / 6) + 1})`,
    slug: `tin-tuc-thi-truong-bds-${idx + 1}`,
    category: cat,
    date: `0${(idx % 9) + 1}/07/2026`,
    author: "Trần Quốc Huy - CEO Tập đoàn",
    summary: "Những biến động tài chính mới nhất và lời khuyên quý báu giúp các nhà đầu tư cá nhân bảo toàn dòng tiền và chọn phân khúc sinh lời ổn định.",
    content: `Bất động sản luôn là kênh trú ẩn dòng tiền an toàn và hiệu quả trong mọi thời kỳ kinh tế biến động. Trong bối cảnh hiện nay, việc lựa chọn dự án có pháp lý minh bạch là yếu tố sống còn quyết định thành bại của khoản đầu tư.

Mục lục bài viết:
1. Tổng quan tình hình thị trường bất động sản quý 2.
2. Tại sao nên chú trọng yếu tố pháp lý hơn là giá bán?
3. Cách đối chiếu quy hoạch đất đai tại địa phương.
4. Lời khuyên tối ưu hóa đòn bẩy tài chính ngân hàng.

Đầu tiên, đối với người mua nhà lần đầu, bạn cần xác định rõ mục đích mua để ở hay đầu tư tích lũy. Các căn hộ chung cư cao cấp vùng trung tâm luôn có thanh khoản tốt và lợi nhuận cho thuê ổn định hàng tháng.

Tiếp theo, hãy dành thời gian khảo sát thực tế dự án ít nhất 2 lần vào các khung giờ khác nhau để hiểu rõ mật độ giao thông và môi trường sống xung quanh. Chúc các bạn có những lựa chọn đầu tư thông minh và gặt hái nhiều thành công!`,
    thumbnail: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ][idx % 3]
  };
});

// 10 Testimonials
export const demoTestimonials = [
  { id: 1, name: "Nguyễn Hoàng Nam", role: "Nhà đầu tư cá nhân", quote: "Dịch vụ tư vấn pháp lý dự án của công ty cực kỳ chuyên nghiệp. Tôi đã sở hữu được căn biệt thự mơ ước tại Quận 2 hoàn toàn nhanh gọn.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
  { id: 2, name: "Phạm Minh Trang", role: "Khách hàng mua căn hộ", quote: "Căn hộ bàn giao đúng tiến độ, thiết kế nội thất sang trọng chuẩn châu Âu và tầm nhìn thoáng đãng mát mẻ.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
  { id: 3, name: "Trần Anh Đức", role: "Chủ doanh nghiệp", quote: "Đất nền khu công nghiệp phân lô vị trí đắc địa, pháp lý sổ đỏ an toàn tuyệt đối giúp công ty tôi yên tâm xây nhà xưởng.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
  { id: 4, name: "Lê Hoàng Yến", role: "Khách thuê Homestay", quote: "Green Valley homestay ở Bảo Lộc thực sự là thiên đường bình yên, giúp tôi sạc lại năng lượng sau những tuần làm việc căng thẳng.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
  { id: 5, name: "Vũ Quốc Khánh", role: "Khách mua Penthouse", quote: "Landmark Sky Villa view 360 độ sông Sài Gòn mang lại cho tôi những trải nghiệm sống thượng lưu đích thực tại đỉnh cao.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
  { id: 6, name: "Đặng Minh Quân", role: "Nhà đầu tư tự do", quote: "Bất động sản nghỉ dưỡng biển Nha Trang mang lại dòng tiền khai thác cho thuê ổn định 12%/năm, thanh khoản cực kỳ cao.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100" },
  { id: 7, name: "Hoàng Ngọc Ánh", role: "Khách mua chung cư", quote: "Môi giới của công ty tư vấn siêu nhiệt tình, tính toán phương án tài chính ngân hàng chi tiết giúp tôi không bị áp lực nợ nần.", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100" },
  { id: 8, name: "Trần Quốc Bảo", role: "Nhà đầu tư biệt thự", quote: "Được tặng bản thiết kế nội thất vương giả châu Âu khi sở hữu biệt thự lâu đài, thực sự là quà tặng đặc quyền vô cùng ý nghĩa.", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100" },
  { id: 9, name: "Nguyễn Thu Hà", role: "Khách hàng đầu tư shophouse", quote: "Hợp đồng thuê ký kết ngay sau khi bàn giao shophouse giúp tôi thu hồi vốn đầu tư nhanh hơn dự kiến ban đầu.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" },
  { id: 10, name: "Bùi Chí Thanh", role: "Chủ đầu tư chuỗi homestay", quote: "Đất vườn Bảo Lộc trù phú, khí hậu mát mẻ quanh năm là địa điểm tuyệt hảo để phát triển mô hình farmstay chữa lành tự nhiên.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" }
];

// 8 Team Members
export const demoTeam = [
  { id: 1, name: "Trần Quốc Huy", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { id: 2, name: "Lê Thị Thu Thủy", role: "Sales Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" },
  { id: 3, name: "Nguyễn Văn Hùng", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { id: 4, name: "Hoàng Minh Thư", role: "Marketing Manager", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
  { id: 5, name: "Phạm Anh Khoa", role: "Project Manager", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200" },
  { id: 6, name: "Đỗ Thị Kim Oanh", role: "Customer Service Specialist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" },
  { id: 7, name: "Vũ Tiến Dũng", role: "Legal Director", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
  { id: 8, name: "Nguyễn Minh Anh", role: "Financial Advisor", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200" }
];

// 12 Partners
export const demoPartners = [
  "Vietcombank", "Techcombank", "BIDV", "Coteccons", "Hòa Bình Construction",
  "Vingroup", "SunGroup", "Novaland", "Masterise Homes", "Khang Điền",
  "Dragon Capital Fund", "VinaCapital Fund"
];

// 10 Locations
export const demoLocations = [
  { name: "TP. Hồ Chí Minh", count: 124, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" },
  { name: "Hà Nội", count: 98, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
  { name: "Đà Nẵng", count: 54, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" },
  { name: "Bình Dương", count: 42, img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400" },
  { name: "Đồng Nai", count: 29, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" },
  { name: "Long An", count: 35, img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400" },
  { name: "Phú Quốc", count: 47, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" },
  { name: "Lâm Đồng", count: 31, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400" },
  { name: "Nha Trang", count: 22, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" },
  { name: "Bà Rịa Vũng Tàu", count: 19, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" }
];

