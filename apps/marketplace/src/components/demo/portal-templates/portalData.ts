export interface PortalProperty {
  id: number;
  title: string;
  slug: string;
  price: string;
  priceNum: number; // in billion VND or million VND for rent
  priceUnit: 'tỷ' | 'triệu/tháng' | 'triệu/m²';
  pricePerM2: string;
  area: number; // in m2
  bedrooms: number;
  bathrooms: number;
  direction: 'Đông' | 'Tây' | 'Nam' | 'Bắc' | 'Đông Nam' | 'Đông Bắc' | 'Tây Nam' | 'Tây Bắc';
  legal: 'Sổ hồng riêng' | 'Sổ đỏ chính chủ' | 'HĐMB' | 'Đang chờ sổ' | 'Quy hoạch 1/500';
  furniture: 'Đầy đủ nội thất' | 'Nội thất cơ bản' | 'Nhà thô' | 'Cao cấp nhập khẩu';
  type: 'Căn hộ chung cư' | 'Nhà phố' | 'Biệt thự' | 'Đất nền thổ cư' | 'Văn phòng' | 'Mặt bằng kinh doanh' | 'Kho xưởng';
  category: 'ban' | 'thue' | 'sang-nhuong';
  address: string;
  ward: string;
  district: string;
  city: 'TP. Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng' | 'Bình Dương' | 'Đồng Nai' | 'Hải Phòng' | 'Cần Thơ';
  images: string[];
  date: string;
  isHot?: boolean;
  isVerified?: boolean;
  inStock?: boolean;
  featured?: boolean;
  views: number;
  description: string;
  features: string[];
  author: {
    name: string;
    phone: string;
    zalo: string;
    avatar: string;
    role: string;
    verified: boolean;
    rating: number;
    ratingCount: number;
    joinedDate: string;
  };
}

export interface PortalProject {
  id: number;
  title: string;
  slug: string;
  developer: string;
  location: string;
  district: string;
  city: string;
  priceRange: string;
  priceNum: number;
  scale: string;
  status: 'Đang mở bán' | 'Sắp mở bán' | 'Đã bàn giao' | 'Đang xây dựng';
  type: 'Khu phức hợp Căn hộ & Shophouse' | 'Khu đô thị sinh thái' | 'Biệt thự Đảo siêu sang' | 'Tổ hợp Thương mại & Văn phòng';
  thumbnail: string;
  gallery: string[];
  overview: string;
  amenities: { icon: string; title: string; desc: string }[];
  masterplanImg: string;
  units: {
    type: string;
    area: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    status: string;
  }[];
  handoverDate: string;
  legal: string;
}

export interface PortalNews {
  id: number;
  title: string;
  slug: string;
  category: 'Thị trường BĐS' | 'Pháp lý & Quy hoạch' | 'Phong thủy nhà đất' | 'Cẩm nang mua bán' | 'Kinh nghiệm đầu tư';
  date: string;
  author: string;
  img: string;
  summary: string;
  content: string;
  views: number;
  tags: string[];
}

export interface PortalCity {
  id: number;
  name: string;
  slug: string;
  count: string;
  projectCount: string;
  image: string;
  featuredDistricts: string[];
}

export const PORTAL_CITIES: PortalCity[] = [
  {
    id: 1,
    name: 'TP. Hồ Chí Minh',
    slug: 'ho-chi-minh',
    count: '24,850 tin đăng',
    projectCount: '128 dự án',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Quận 1', 'Quận 2 (TP. Thủ Đức)', 'Quận 7', 'Bình Thạnh', 'Tân Bình', 'Nhà Bè'],
  },
  {
    id: 2,
    name: 'Hà Nội',
    slug: 'ha-noi',
    count: '18,320 tin đăng',
    projectCount: '96 dự án',
    image: 'https://images.unsplash.com/photo-1509030450996-93d0ff585b98?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Cầu Giấy', 'Nam Từ Liêm', 'Tây Hồ', 'Hoàng Mai', 'Hà Đông', 'Gia Lâm'],
  },
  {
    id: 3,
    name: 'Đà Nẵng',
    slug: 'da-nang',
    count: '6,450 tin đăng',
    projectCount: '34 dự án',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn', 'Cẩm Lệ', 'Liên Chiểu'],
  },
  {
    id: 4,
    name: 'Bình Dương',
    slug: 'binh-duong',
    count: '8,900 tin đăng',
    projectCount: '45 dự án',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['TP. Thủ Dầu Một', 'TP. Thuận An', 'TP. Dĩ An', 'Bến Cát', 'Tân Uyên'],
  },
  {
    id: 5,
    name: 'Đồng Nai',
    slug: 'dong-nai',
    count: '5,120 tin đăng',
    projectCount: '28 dự án',
    image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['TP. Biên Hòa', 'Long Thành', 'Nhơn Trạch', 'Trảng Bom'],
  },
  {
    id: 6,
    name: 'Hải Phòng',
    slug: 'hai-phong',
    count: '4,200 tin đăng',
    projectCount: '22 dự án',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Lê Chân', 'Hồng Bàng', 'Ngô Quyền', 'Thủy Nguyên', 'Dương Kinh'],
  },
];

export const PORTAL_PROPERTIES: PortalProperty[] = [
  {
    id: 101,
    title: 'Bán gấp căn hộ 2PN Grand Marina Saigon view trực diện sông Sài Gòn & cầu Ba Son',
    slug: 'can-ho-2pn-grand-marina-saigon-view-song-sai-gon',
    price: '18.5 Tỷ',
    priceNum: 18.5,
    priceUnit: 'tỷ',
    pricePerM2: '210 tr/m²',
    area: 88,
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Đông Nam',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Căn hộ chung cư',
    category: 'ban',
    address: 'Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 1840,
    description: `Cần bán gấp căn hộ hạng sang Grand Marina Saigon, dự án chuẩn Marriott Quốc tế đầu tiên tại trung tâm Quận 1.
- Vị trí đắc địa: Nằm ngay mặt tiền số 2 Tôn Đức Thắng, liền kề ga Ba Son tuyến Metro số 1.
- Căn hộ tầng trung view trực diện sông Sài Gòn và Landmark 81 cực thoáng mát, không bị che chắn.
- Bàn giao đầy đủ nội thất cao cấp: Thiết bị bếp Miele Đức, thiết bị vệ sinh Kohler mạ vàng, điều hòa âm trần Daikin.
- Tiện ích đặc quyền 6 sao: Hồ bơi vô cực trên cao, phòng gym hiện đại, bến du thuyền riêng, sảnh lễ tân phục vụ 24/7.
- Pháp lý chuẩn chỉnh, hợp đồng mua bán sang tên nhanh gọn trong ngày. Hỗ trợ vay ngân hàng Techcombank 70% lãi suất ưu đãi.`,
    features: ['Hồ bơi vô cực', 'View sông Sài Gòn', 'Bến du thuyền', 'Ga Metro Ba Son', 'Smart Home cao cấp', 'An ninh 24/7'],
    author: {
      name: 'Nguyễn Văn Minh',
      phone: '0908 123 456',
      zalo: '0908123456',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp Quận 1',
      verified: true,
      rating: 4.9,
      ratingCount: 58,
      joinedDate: 'Thành viên 4 năm',
    },
  },
  {
    id: 102,
    title: 'Bán nhà phố mặt tiền đường Nguyễn Văn Linh Quận 7, tiện kinh doanh đa ngành nghề',
    slug: 'nha-pho-mat-tien-nguyen-van-linh-quan-7',
    price: '26.8 Tỷ',
    priceNum: 26.8,
    priceUnit: 'tỷ',
    pricePerM2: '178 tr/m²',
    area: 150,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Nam',
    legal: 'Sổ hồng riêng',
    furniture: 'Đầy đủ nội thất',
    type: 'Nhà phố',
    category: 'ban',
    address: 'Đường Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh',
    ward: 'Phường Tân Phong',
    district: 'Quận 7',
    city: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm qua',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 1250,
    description: `Chính chủ xuất cảnh cần bán gấp nhà phố mặt tiền trục xương sống Nguyễn Văn Linh, Phú Mỹ Hưng, Quận 7.
- Diện tích đất: 6m x 25m = 150m², xây dựng 1 trệt 4 lầu + sân thượng, thang máy Mitsubishi nhập khẩu.
- Mặt tiền đường rộng 120m vỉa hè 8m đỗ xe thoải mái, vị trí đắt giá kinh doanh văn phòng, showroom, nha khoa, trung tâm ngoại ngữ.
- Sổ hồng hoàn công đầy đủ, công chứng ngay trong ngày. Hiện đang cho thuê hợp đồng dài hạn 65 triệu/tháng.`,
    features: ['Thang máy cao cấp', 'Mặt tiền đường lớn', 'Vỉa hè 8m', 'Đang cho thuê 65tr/tháng', 'Sổ hồng hoàn công'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Trưởng phòng Kinh Doanh Phú Mỹ Hưng',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    },
  },
  {
    id: 103,
    title: 'Cho thuê căn hộ cao cấp 3PN Vinhomes Smart City Tây Mỗ, full nội thất xịn xò',
    slug: 'cho-thue-can-ho-3pn-vinhomes-smart-city-tay-mo',
    price: '16 Triệu/tháng',
    priceNum: 16,
    priceUnit: 'triệu/tháng',
    pricePerM2: '210k/m²',
    area: 76,
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Đông Bắc',
    legal: 'HĐMB',
    furniture: 'Đầy đủ nội thất',
    type: 'Căn hộ chung cư',
    category: 'thue',
    address: 'Khu đô thị Vinhomes Smart City, Tây Mỗ, Quận Nam Từ Liêm, Hà Nội',
    ward: 'Tây Mỗ',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '2 ngày trước',
    isHot: false,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 890,
    description: `Cho thuê căn hộ 3 phòng ngủ phân khu cao cấp Tonkin Vinhomes Smart City Tây Mỗ.
- Thiết kế 3 phòng ngủ sáng, 2 WC, ban công Đông Bắc thoáng mát view trọn vẹn công viên nội khu phong cách Indochine.
- Đầy đủ nội thất: Tủ lạnh Side-by-side, máy giặt sấy, sofa da Ý, bàn ăn đá Ceramic, giường nệm cao cấp, khách chỉ cần xách vali vào ở.
- Tiện ích toàn khu: Xe bus điện VinBus miễn phí, công viên trung tâm 10.2ha, hồ cát trắng, TTTM Vincom Mega Mall lớn nhất miền Bắc.`,
    features: ['Nội thất cao cấp', 'Phân khu Tonkin', 'Miễn phí VinBus', 'Gần Vincom Mega Mall', 'View công viên'],
    author: {
      name: 'Lê Hoàng Long',
      phone: '0938 456 789',
      zalo: '0938456789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên viên Cho thuê BĐS Hà Nội',
      verified: true,
      rating: 4.8,
      ratingCount: 32,
      joinedDate: 'Thành viên 2 năm',
    },
  },
  {
    id: 104,
    title: 'Bán biệt thự song lập Ocean Park 2 The Empire, đường 20m kinh doanh sầm uất',
    slug: 'ban-biet-thu-song-lap-ocean-park-2-the-empire',
    price: '14.2 Tỷ',
    priceNum: 14.2,
    priceUnit: 'tỷ',
    pricePerM2: '118 tr/m²',
    area: 120,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông',
    legal: 'HĐMB',
    furniture: 'Nhà thô',
    type: 'Biệt thự',
    category: 'ban',
    address: 'Phân khu Sao Biển, Vinhomes Ocean Park 2, Văn Giang, Hưng Yên (giáp Gia Lâm, Hà Nội)',
    ward: 'Văn Giang',
    district: 'Gia Lâm',
    city: 'Hà Nội',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '3 ngày trước',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: false,
    views: 760,
    description: `Bán biệt thự song lập phân khu Sao Biển - phân khu kinh doanh mở sôi động nhất Vinhomes Ocean Park 2.
- Diện tích: 120m² (8x15m), xây dựng 4 tầng 1 tum, diện tích xây dựng lên tới 280m².
- Vị trí đối diện công viên Empire Park, cách biển tạo sóng nhân tạo Royal Wave Park chỉ 300m.
- Hỗ trợ lãi suất 0% trong 24 tháng hoặc chiết khấu thanh toán sớm 10% giá trị hợp đồng.`,
    features: ['Biệt thự kinh doanh', 'Cạnh biển tạo sóng', 'Mặt tiền 8m', 'Ưu đãi lãi suất 0%', 'Công viên nội khu'],
    author: {
      name: 'Vũ Thị Minh Hằng',
      phone: '0977 112 233',
      zalo: '0977112233',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      role: 'Đại sứ BĐS Vinhomes Ocean Park',
      verified: true,
      rating: 4.9,
      ratingCount: 46,
      joinedDate: 'Thành viên 3 năm',
    },
  },
  {
    id: 105,
    title: 'Bán đất nền thổ cư 100% đường xe tải tránh nhau KDC An Phú Tây, Bình Chánh',
    slug: 'ban-dat-nen-tho-cu-kdc-an-phu-tay-binh-chanh',
    price: '3.25 Tỷ',
    priceNum: 3.25,
    priceUnit: 'tỷ',
    pricePerM2: '32.5 tr/m²',
    area: 100,
    bedrooms: 0,
    bathrooms: 0,
    direction: 'Tây Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Nhà thô',
    type: 'Đất nền thổ cư',
    category: 'ban',
    address: 'Đường An Phú Tây - Hưng Long, Xã An Phú Tây, Huyện Bình Chánh, TP. Hồ Chí Minh',
    ward: 'An Phú Tây',
    district: 'Quận 7',
    city: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '4 ngày trước',
    isHot: false,
    isVerified: true,
    inStock: true,
    featured: false,
    views: 640,
    description: `Cần bán lô đất thổ cư đẹp vuông vức 5x20m KDC hiện hữu An Phú Tây, Bình Chánh.
- Đường trước đất trải nhựa 10m có vỉa hè cây xanh, xe hơi xe tải quay đầu thoải mái.
- Hạ tầng điện âm, nước máy Sawaco tận nơi. Khu dân cư đông đúc, cách chợ đầu mối Bình Điền chỉ 5 phút.
- Sổ đỏ riêng công chứng ngay. Xây dựng tự do, không dính quy hoạch mồ mả hay lộ giới.`,
    features: ['Sổ đỏ riêng', 'Xây dựng tự do', 'Đường nhựa 10m', 'Điện âm nước máy', 'Gần chợ Bình Điền'],
    author: {
      name: 'Nguyễn Văn Minh',
      phone: '0908 123 456',
      zalo: '0908123456',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên viên BĐS Cao Cấp Quận 1',
      verified: true,
      rating: 4.9,
      ratingCount: 58,
      joinedDate: 'Thành viên 4 năm',
    },
  },
  {
    id: 106,
    title: 'Sang nhượng quán cafe acoustic mặt tiền đường Võ Thị Sáu Quận 3, lượng khách ổn định',
    slug: 'sang-nhuong-quan-cafe-acoustic-vo-thi-sau-quan-3',
    price: '450 Triệu',
    priceNum: 0.45,
    priceUnit: 'tỷ',
    pricePerM2: '3.7 tr/m²',
    area: 120,
    bedrooms: 1,
    bathrooms: 2,
    direction: 'Đông Nam',
    legal: 'HĐMB',
    furniture: 'Đầy đủ nội thất',
    type: 'Mặt bằng kinh doanh',
    category: 'sang-nhuong',
    address: 'Đường Võ Thị Sáu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    ward: 'Phường Võ Thị Sáu',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '5 ngày trước',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: false,
    views: 1100,
    description: `Bận việc gia đình cần sang gấp quán cafe acoustic vị trí cực đẹp trung tâm Quận 3.
- Giá thuê mặt bằng: 28 triệu/tháng (hợp đồng còn 3.5 năm, chủ nhà siêu dễ thương tạo điều kiện).
- Quán đã đầu tư đầy đủ: Dàn âm thanh JBL xịn, máy pha cafe 2 group Nuova Simonelli, máy xay cafe, hệ thống POS, bàn ghế gỗ me tây nguyên tấm.
- Lượng khách quen ổn định doanh thu trung bình 85 - 110 triệu/tháng, vào nhận quán kinh doanh sinh lời ngay.`,
    features: ['Dàn âm thanh JBL', 'Máy pha Nuova Simonelli', 'Lượng khách ổn định', 'HĐ thuê dài hạn', 'Mặt tiền đắc địa'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Trưởng phòng Kinh Doanh Phú Mỹ Hưng',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    },
  },
  {
    id: 107,
    title: 'Cho thuê văn phòng trọn gói hạng A tòa nhà Bitexco Financial Tower Quận 1',
    slug: 'cho-thue-van-phong-bitexco-financial-tower-quan-1',
    price: '48 Triệu/tháng',
    priceNum: 48,
    priceUnit: 'triệu/tháng',
    pricePerM2: '600k/m²',
    area: 80,
    bedrooms: 0,
    bathrooms: 2,
    direction: 'Đông',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Văn phòng',
    category: 'thue',
    address: 'Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '6 ngày trước',
    isHot: false,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 920,
    description: `Cho thuê diện tích văn phòng 80m² tại biểu tượng Bitexco Financial Tower Quận 1.
- Tiêu chuẩn văn phòng hạng A quốc tế: Chiều cao trần 2.7m, sàn nâng kỹ thuật, hệ thống điều hòa trung tâm Trane thông minh.
- 16 thang máy tốc độ cao 7m/s hai tầng Otis, máy phát điện dự phòng Cummins 100% công suất.
- Đã hoàn thiện nội thất tiêu chuẩn bàn làm việc, phòng họp kính cách âm cao cấp.`,
    features: ['Văn phòng hạng A', 'Sàn nâng kỹ thuật', '16 thang máy tốc độ cao', 'View triệu đô Quận 1', 'Lễ tân chuyên nghiệp'],
    author: {
      name: 'Lê Hoàng Long',
      phone: '0938 456 789',
      zalo: '0938456789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên viên Cho thuê BĐS Hà Nội',
      verified: true,
      rating: 4.8,
      ratingCount: 32,
      joinedDate: 'Thành viên 2 năm',
    },
  },
  {
    id: 108,
    title: 'Bán nhà vườn nghỉ dưỡng ven sông Đồng Nai, cây ăn trái trĩu quả không khí trong lành',
    slug: 'ban-nha-vuon-nghi-duong-ven-song-dong-nai',
    price: '7.8 Tỷ',
    priceNum: 7.8,
    priceUnit: 'tỷ',
    pricePerM2: '7.8 tr/m²',
    area: 1000,
    bedrooms: 3,
    bathrooms: 3,
    direction: 'Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Đầy đủ nội thất',
    type: 'Biệt thự',
    category: 'ban',
    address: 'Xã Long Hưng, TP. Biên Hòa, Tỉnh Đồng Nai',
    ward: 'Long Hưng',
    district: 'Long Thành',
    city: 'Đồng Nai',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    ],
    date: '1 tuần trước',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: false,
    views: 1430,
    description: `Gia chủ chuyển công tác cần nhượng lại khuôn viên nhà vườn sinh thái rộng 1.000m² (trong đó có 200m² thổ cư) mặt tiền sông Đồng Nai.
- Đã xây dựng sẵn căn nhà gỗ mái Thái 3 phòng ngủ đầy đủ tiện nghi, hồ cá Koi 50m², vườn bưởi da xanh và sầu riêng đang cho thu hoạch.
- Vị trí đắc địa: Cách trung tâm TP.HCM chỉ 45 phút chạy xe qua cao tốc Long Thành - Dầu Giây. Sổ đỏ chính chủ trao tay.`,
    features: ['1000m² ven sông', 'Hồ cá Koi', 'Vườn sầu riêng bưởi', 'Nhà gỗ mái Thái', 'Sổ đỏ thổ cư'],
    author: {
      name: 'Vũ Thị Minh Hằng',
      phone: '0977 112 233',
      zalo: '0977112233',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      role: 'Đại sứ BĐS Vinhomes Ocean Park',
      verified: true,
      rating: 4.9,
      ratingCount: 46,
      joinedDate: 'Thành viên 3 năm',
    },
  },
];

export const PORTAL_PROJECTS: PortalProject[] = [
  {
    id: 201,
    title: 'The Global City Thủ Đức',
    slug: 'the-global-city-thu-duc',
    developer: 'Masterise Homes',
    location: 'Đường Đỗ Xuân Hợp, Phường An Phú, TP. Thủ Đức, TP.HCM',
    district: 'Quận 2 (TP. Thủ Đức)',
    city: 'TP. Hồ Chí Minh',
    priceRange: 'Từ 350 - 450 triệu/m²',
    priceNum: 350,
    scale: '117.4 ha - Khu đô thị phức hợp chuẩn quốc tế do Foster + Partners thiết kế',
    status: 'Đang mở bán',
    type: 'Khu phức hợp Căn hộ & Shophouse',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    overview: 'The Global City là đại đô thị biểu tượng mới của toàn Đông Nam Á, tích hợp kênh đào nhạc nước lớn nhất khu vực, TTTM 123.000m² và phân khu nhà phố thương mại Soho sang trọng.',
    amenities: [
      { icon: 'Music', title: 'Kênh Đào Nhạc Nước', desc: 'Quy mô dài 2km lớn nhất Đông Nam Á biểu diễn hàng tuần' },
      { icon: 'ShoppingBag', title: 'TTTM Hạng A 123.000m²', desc: 'Nơi quy tụ hơn 300 thương hiệu xa xỉ toàn cầu' },
      { icon: 'Trees', title: 'Công Viên Xanh 13ha', desc: 'Đường chạy bộ ven sông và quảng trường ánh sáng' },
      { icon: 'Shield', title: 'Hệ Thống An Ninh AI', desc: 'Nhận diện khuôn mặt và camera giám sát 360 độ toàn khu' },
    ],
    masterplanImg: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
    units: [
      { type: 'Nhà phố SOHO 1LK', area: '95 m²', price: '38 Tỷ', bedrooms: '4 PN', bathrooms: '5 WC', status: 'Đang mở bán' },
      { type: 'Căn hộ Masteri Park 2PN', area: '75 m²', price: '8.5 Tỷ', bedrooms: '2 PN', bathrooms: '2 WC', status: 'Sắp ra mắt' },
      { type: 'Căn hộ Masteri Park 3PN', area: '105 m²', price: '12.8 Tỷ', bedrooms: '3 PN', bathrooms: '3 WC', status: 'Sắp ra mắt' },
      { type: 'Shophouse Kênh Đào', area: '140 m²', price: '65 Tỷ', bedrooms: '5 PN', bathrooms: '6 WC', status: 'Giỏ hàng độc quyền' },
    ],
    handoverDate: 'Quý 4/2026',
    legal: 'Sở hữu lâu dài (Người Việt Nam) / 50 năm (Người nước ngoài)',
  },
  {
    id: 202,
    title: 'Vinhomes Grand Park Quận 9',
    slug: 'vinhomes-grand-park-quan-9',
    developer: 'Vingroup',
    location: 'Đường Nguyễn Xiển & Phước Thiện, Phường Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM',
    district: 'Quận 2 (TP. Thủ Đức)',
    city: 'TP. Hồ Chí Minh',
    priceRange: 'Từ 45 - 90 triệu/m²',
    priceNum: 45,
    scale: '271 ha - Đại đô thị thông minh đẳng cấp số 1 miền Nam',
    status: 'Đang mở bán',
    type: 'Khu đô thị sinh thái',
    thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    overview: 'Đại đô thị sinh thái đẳng cấp với đại công viên 36ha quy mô hàng đầu Đông Nam Á, hệ sinh thái Vingroup trọn vẹn: Vinschool, Vinmec, Vincom Mega Mall, VinBus.',
    amenities: [
      { icon: 'Trees', title: 'Đại Công Viên 36ha', desc: '15 công viên chủ đề đa dạng bao gồm biển hồ cát trắng' },
      { icon: 'Building2', title: 'TTTM Vincom Mega Mall', desc: 'TTTM lớn nhất hệ thống miền Nam chuẩn Life-Design Mall' },
      { icon: 'GraduationCap', title: 'Hệ Thống Vinschool', desc: 'Từ mầm non đến THPT chuẩn Cambridge quốc tế' },
      { icon: 'HeartPulse', title: 'Bệnh Viện Vinmec', desc: 'Dịch vụ y tế khám chữa bệnh chất lượng quốc tế 24/7' },
    ],
    masterplanImg: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
    units: [
      { type: 'Căn hộ Studio The Beverly', area: '35 m²', price: '2.1 Tỷ', bedrooms: '1 PN', bathrooms: '1 WC', status: 'Bàn giao ngay' },
      { type: 'Căn hộ 2PN The Origami', area: '68 m²', price: '3.4 Tỷ', bedrooms: '2 PN', bathrooms: '2 WC', status: 'Bàn giao ngay' },
      { type: 'Căn hộ 3PN Glory Heights', area: '92 m²', price: '4.9 Tỷ', bedrooms: '3 PN', bathrooms: '2 WC', status: 'Đang mở bán' },
      { type: 'Dinh thự The Rivus', area: '500 m²', price: '180 Tỷ', bedrooms: '5 PN', bathrooms: '6 WC', status: 'Giới hạn 121 căn' },
    ],
    handoverDate: 'Đã bàn giao từng phần',
    legal: 'Sổ hồng sở hữu lâu dài',
  },
  {
    id: 203,
    title: 'Ecopark Hưng Yên Grand The Island',
    slug: 'ecopark-hung-yen-grand-the-island',
    developer: 'Ecopark Corporation',
    location: 'Khu đô thị Ecopark, Văn Giang, Hưng Yên (Cạnh Hà Nội)',
    district: 'Gia Lâm',
    city: 'Hà Nội',
    priceRange: 'Từ 80 - 160 triệu/m²',
    priceNum: 80,
    scale: '500 ha - Thành phố triệu cây xanh lớn nhất Việt Nam',
    status: 'Đang mở bán',
    type: 'Biệt thự Đảo siêu sang',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    overview: 'Quần thể biệt thự đảo thượng lưu vươn mình giữa mặt nước xanh ngọc bích, sở hữu mật độ 120 cây xanh/người, mang lại chuẩn sống chữa lành tinh khiết.',
    amenities: [
      { icon: 'Trees', title: '1 Triệu Cây Xanh Cổ Thụ', desc: 'Không khí trong lành mát mẻ hơn nội đô từ 2-4 độ C' },
      { icon: 'Shield', title: 'Du Thuyền Đưa Đón Riêng', desc: 'Dịch vụ đưa đón cư dân biệt thự đảo bằng du thuyền cao cấp' },
      { icon: 'Award', title: 'Sân Golf 18 Hố', desc: 'Học viện golf EPGA đẳng cấp thế giới' },
    ],
    masterplanImg: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
    units: [
      { type: 'Biệt thự Đảo Jade', area: '260 m²', price: '32 Tỷ', bedrooms: '4 PN', bathrooms: '5 WC', status: 'Đang mở bán' },
      { type: 'Biệt thự Đảo Sapphire', area: '380 m²', price: '52 Tỷ', bedrooms: '5 PN', bathrooms: '6 WC', status: 'Đang mở bán' },
      { type: 'Biệt thự Đảo Diamond', area: '600 m²', price: '95 Tỷ', bedrooms: '6 PN', bathrooms: '7 WC', status: 'Giới hạn 12 căn' },
    ],
    handoverDate: 'Quý 2/2026',
    legal: 'Sổ đỏ sở hữu lâu dài',
  },
];

export const PORTAL_NEWS: PortalNews[] = [
  {
    id: 301,
    title: 'Luật Đất đai mới có hiệu lực: Tác động gì đến giá bất động sản và quyền lợi người mua?',
    slug: 'luat-dat-dai-moi-tac-dong-gia-bat-dong-san',
    category: 'Pháp lý & Quy hoạch',
    date: '28/08/2026',
    author: 'PlatformBDS Research Team',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    summary: 'Phân tích chi tiết các điểm mới trong việc bỏ khung giá đất, cấp sổ đỏ cho đất không giấy tờ trước 2014 và quy định thanh toán tiền thuê đất một lần.',
    content: `Luật Đất đai (sửa đổi) chính thức có hiệu lực tạo nên bước ngoặt lớn cho toàn bộ thị trường bất động sản Việt Nam. 

1. Bỏ khung giá đất — Định giá theo nguyên tắc thị trường:
Việc xác định giá đất theo bảng giá đất hàng năm sát với giá trị thực tế của thị trường giúp minh bạch hóa chi phí đền bù giải phóng mặt bằng, tuy nhiên cũng sẽ làm tăng chi phí đầu vào của các dự án mới, gián tiếp tác động lên giá bán sơ cấp.

2. Cấp sổ đỏ cho đất không giấy tờ:
Hộ gia đình, cá nhân sử dụng đất trước ngày 1/7/2014 không có giấy tờ nhưng được UBND cấp xã xác nhận không có tranh chấp sẽ được xem xét cấp Giấy chứng nhận quyền sử dụng đất.

3. Bảo vệ tối đa quyền lợi người mua nhà hình thành trong tương lai:
Chủ đầu tư chỉ được thu tối đa 5% tiền cọc và chỉ được thu tiếp sau khi đã đủ điều kiện bán nhà ở hình thành trong tương lai theo đúng quy định.`,
    views: 3420,
    tags: ['Luật đất đai', 'Sổ đỏ', 'Pháp lý BĐS', 'Quy hoạch'],
  },
  {
    id: 302,
    title: 'Top 5 khu vực bất động sản TP.HCM có tỷ suất sinh lời cho thuê cao nhất năm 2026',
    slug: 'top-5-khu-vuc-bds-tphcm-sinh-loi-cho-thue-cao-nhat',
    category: 'Kinh nghiệm đầu tư',
    date: '26/08/2026',
    author: 'Nguyễn Văn Minh - Chuyên gia BĐS',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    summary: 'Báo cáo độc quyền về tỷ suất cho thuê căn hộ và shophouse tại khu Đông TP. Thủ Đức, khu Nam Quận 7 và khu Tây Bình Tân.',
    content: `Khảo sát từ dữ liệu thực tế hơn 25.000 tin đăng tại PlatformBDS cho thấy thị trường cho thuê căn hộ TP.HCM đang hồi phục mạnh mẽ với tỷ suất lợi nhuận trung bình từ 4.8% đến 6.2%/năm.

Top 1: TP. Thủ Đức (Khu vực quanh tuyến Metro số 1 Bến Thành - Suối Tiên)
Tỷ suất cho thuê đạt 5.8% - 6.5%/năm nhờ lượng lớn chuyên gia nước ngoài và sinh viên các trường đại học quốc tế.

Top 2: Quận 7 (Khu đô thị Phú Mỹ Hưng & trục Nguyễn Lương Bằng)
Cộng đồng người Hàn Quốc, Nhật Bản và các gia đình thu nhập cao duy trì mức giá thuê ổn định từ 18 - 35 triệu/tháng cho căn 2-3 phòng ngủ.

Top 3: Quận Bình Thạnh (Khu vực ven sông Thanh Đa & Tân Cảng)
Vị trí sát vách Quận 1 giúp tỷ lệ lấp đầy phòng luôn đạt trên 92%.`,
    views: 2890,
    tags: ['Đầu tư BĐS', 'Thuê nhà', 'Thủ Đức', 'Phú Mỹ Hưng'],
  },
  {
    id: 303,
    title: 'Cách xem hướng nhà hợp phong thủy rước tài lộc cho gia chủ theo từng cung mệnh',
    slug: 'cach-xem-huong-nha-hop-phong-thuy-ruoc-tai-loc',
    category: 'Phong thủy nhà đất',
    date: '22/08/2026',
    author: 'Chuyên gia Phong Thủy Hải Nam',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    summary: 'Hướng dẫn chuẩn xác cách tính quái số, xác định nhóm Đông Tứ Trạch và Tây Tứ Trạch khi chọn mua nhà đất hoặc căn hộ chung cư.',
    content: `Trong phong thủy Bất Động Sản, việc chọn đúng hướng nhà mang lại vượng khí, tài lộc và sức khỏe dồi dào cho gia chủ.

1. Phân biệt Đông Tứ Mệnh và Tây Tứ Mệnh:
- Gia chủ thuộc Đông Tứ Mệnh hợp với các hướng: Đông, Đông Nam, Nam, Bắc (Sinh Khí, Thiên Y, Diên Niên, Phục Vị).
- Gia chủ thuộc Tây Tứ Mệnh hợp với các hướng: Tây, Tây Nam, Tây Bắc, Đông Bắc.

2. Hướng căn hộ chung cư tính theo ban công hay cửa chính?
Theo các bậc thầy phong thủy hiện đại, nơi nạp khí chính của căn hộ là ban công và cửa sổ lớn phòng khách – nơi đón ánh sáng và luồng gió tự nhiên nhiều nhất của ngôi nhà.`,
    views: 4150,
    tags: ['Phong thủy', 'Hướng nhà', 'Đông Tứ Trạch', 'Căn hộ chung cư'],
  },
];
