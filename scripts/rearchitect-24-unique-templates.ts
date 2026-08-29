import fs from 'fs';
import path from 'path';

function findRepoRoot(): string {
  let curr = process.cwd();
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'pnpm-workspace.yaml'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

const ROOT_DIR = findRepoRoot();
const PORTAL_DATA_PATH = path.join(ROOT_DIR, 'apps/marketplace/src/components/demo/portal-templates/portalData.ts');

const comprehensivePortalData = `export interface PortalProperty {
  id: number;
  title: string;
  slug: string;
  price: string;
  priceNum: number;
  priceUnit: 'tỷ' | 'triệu/tháng' | 'triệu/m²';
  pricePerM2: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  direction: 'Đông' | 'Tây' | 'Nam' | 'Bắc' | 'Đông Nam' | 'Đông Bắc' | 'Tây Nam' | 'Tây Bắc';
  legal: 'Sổ hồng riêng' | 'Sổ đỏ chính chủ' | 'HĐMB' | 'Đang chờ sổ' | 'Quy hoạch 1/500';
  furniture: 'Đầy đủ nội thất' | 'Nội thất cơ bản' | 'Nhà thô' | 'Cao cấp nhập khẩu';
  type: 'Căn hộ chung cư' | 'Nhà phố' | 'Biệt thự' | 'Đất nền thổ cư' | 'Văn phòng' | 'Mặt bằng kinh doanh' | 'Kho xưởng' | 'Penthouse' | 'Homestay';
  category: 'ban' | 'thue' | 'sang-nhuong';
  address: string;
  ward: string;
  district: string;
  city: 'TP. Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng' | 'Bình Dương' | 'Đồng Nai' | 'Hải Phòng' | 'Cần Thơ';
  region?: 'hanoi' | 'saigon' | 'danang' | 'dalat' | 'binhduong' | 'dongnai';
  images: string[];
  date: string;
  isHot?: boolean;
  isVerified?: boolean;
  inStock?: boolean;
  featured?: boolean;
  views: number;
  description: string;
  features: string[];
  badgeTag?: string;
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
    slug: 'tp-ho-chi-minh',
    count: '24,580 tin đăng',
    projectCount: '142 dự án',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Quận 1', 'Quận 2 (TP. Thủ Đức)', 'Quận 7', 'Bình Thạnh', 'Thủ Đức'],
  },
  {
    id: 2,
    name: 'Hà Nội',
    slug: 'ha-noi',
    count: '18,920 tin đăng',
    projectCount: '98 dự án',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Tây Hồ', 'Cầu Giấy', 'Hoàn Kiếm', 'Nam Từ Liêm', 'Thanh Xuân', 'Long Biên'],
  },
  {
    id: 3,
    name: 'Đà Nẵng',
    slug: 'da-nang',
    count: '8,450 tin đăng',
    projectCount: '45 dự án',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn', 'Cẩm Lệ', 'Liên Chiểu'],
  },
  {
    id: 4,
    name: 'Bình Dương',
    slug: 'binh-duong',
    count: '7,320 tin đăng',
    projectCount: '36 dự án',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    featuredDistricts: ['TP. Thủ Dầu Một', 'TP. Dĩ An', 'TP. Thuận An', 'Bến Cát', 'Tân Uyên'],
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
  // ============================================================================
  // ── 1. HÀ NỘI BĐS (DÀNH CHO PORTAL 17 & CÁC TEMPLATE MIỀN BẮC) ───────────────
  // ============================================================================
  // --- BÁN HÀ NỘI ---
  {
    id: 101,
    title: 'Bán biệt thự đơn lập Vinhomes Riverside Long Biên, lô góc Hoa Phượng sát sông',
    slug: 'ban-biet-thu-vinhomes-riverside-long-bien-lo-goc',
    price: '68.0 Tỷ',
    priceNum: 68.0,
    priceUnit: 'tỷ',
    pricePerM2: '225 tr/m²',
    area: 300,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Đông Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Biệt thự',
    category: 'ban',
    address: 'Đường Hoa Phượng 8, KĐT Vinhomes Riverside, Long Biên, Hà Nội',
    ward: 'Phúc Lợi',
    district: 'Long Biên',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Cách Hồ Gươm 15 phút',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 3120,
    description: 'Biệt thự đơn lập hướng sông Vinhomes Riverside hoàn thiện toàn bộ gỗ gõ đỏ và đá cẩm thạch Ý. Sân vườn 150m² có hồ cá Koi nhập khẩu.',
    features: ['Sát sông sinh thái', 'Hồ cá Koi', 'Gỗ gõ đỏ cao cấp', 'An ninh 4 lớp'],
    author: {
      name: 'Phạm Hoàng Anh',
      phone: '0912 345 678',
      zalo: '0912345678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Gia BĐS Vinhomes Riverside',
      verified: true,
      rating: 5.0,
      ratingCount: 78,
      joinedDate: 'Thành viên 5 năm',
    }
  },
  {
    id: 102,
    title: 'Bán căn hộ Duplex Heritage West Lake Tây Hồ view trọn Hồ Tây lộng gió',
    slug: 'ban-can-ho-duplex-heritage-west-lake-tay-ho',
    price: '28.0 Tỷ',
    priceNum: 28.0,
    priceUnit: 'tỷ',
    pricePerM2: '160 tr/m²',
    area: 175,
    bedrooms: 3,
    bathrooms: 4,
    direction: 'Tây Bắc',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Căn hộ chung cư',
    category: 'ban',
    address: '677 Lạc Long Quân, Phường Phú Thượng, Quận Tây Hồ, Hà Nội',
    ward: 'Phú Thượng',
    district: 'Tây Hồ',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Cách Hồ Tây 50m',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 2840,
    description: 'Chính chủ chuyển nhượng căn Duplex Heritage West Lake view trực diện Hồ Tây vĩnh viễn. Thang máy riêng tận cửa, bể bơi vô cực nước nóng trên cao.',
    features: ['View toàn cảnh Hồ Tây', 'Thang máy riêng', 'Bể bơi nước nóng', 'Chủ đầu tư CapitaLand'],
    author: {
      name: 'Vũ Thị Minh Hằng',
      phone: '0977 112 233',
      zalo: '0977112233',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      role: 'Đại sứ BĐS Tây Hồ',
      verified: true,
      rating: 4.9,
      ratingCount: 65,
      joinedDate: 'Thành viên 3 năm',
    }
  },
  {
    id: 103,
    title: 'Bán nhà mặt phố cổ Hàng Bạc Hoàn Kiếm, diện tích 85m² x 5 tầng kinh doanh vàng bạc',
    slug: 'ban-nha-mat-pho-hang-bac-hoan-kiem-ha-noi',
    price: '52.0 Tỷ',
    priceNum: 52.0,
    priceUnit: 'tỷ',
    pricePerM2: '610 tr/m²',
    area: 85,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Đầy đủ nội thất',
    type: 'Nhà phố',
    category: 'ban',
    address: 'Phố Hàng Bạc, Phường Hàng Bạc, Quận Hoàn Kiếm, Hà Nội',
    ward: 'Hàng Bạc',
    district: 'Hoàn Kiếm',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Cách Hồ Gươm 200m',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm qua',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 4500,
    description: 'Vị trí kim cương trung tâm phố cổ Hà Nội, cách Hồ Gươm 200m. Mặt tiền rộng 5.2m vỉa hè rộng, kinh doanh sầm uất ngày đêm.',
    features: ['Mặt phố cổ Hoàn Kiếm', 'Mặt tiền 5.2m', 'Sổ đỏ vuông vắn', 'Dòng tiền cho thuê 90tr/tháng'],
    author: {
      name: 'Trần Văn Cường',
      phone: '0903 888 999',
      zalo: '0903888999',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Gia Nhà Phố Cổ Hà Nội',
      verified: true,
      rating: 5.0,
      ratingCount: 94,
      joinedDate: 'Thành viên 7 năm',
    }
  },
  // --- CHO THUÊ HÀ NỘI ---
  {
    id: 104,
    title: 'Cho thuê căn hộ cao cấp 3PN Vinhomes Metropolis Liễu Giai Ba Đình full nội thất Ý',
    slug: 'cho-thue-can-ho-vinhomes-metropolis-lieu-giai-ha-noi',
    price: '38 Triệu/tháng',
    priceNum: 38,
    priceUnit: 'triệu/tháng',
    pricePerM2: '320k/m²',
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Đông Nam',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Căn hộ chung cư',
    category: 'thue',
    address: '29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
    ward: 'Ngọc Khánh',
    district: 'Ba Đình',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Trung tâm Ba Đình',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 1890,
    description: 'Căn hộ 3PN Vinhomes Metropolis tầng cao view trọn 4 hồ lớn. Nội thất sang trọng tiêu chuẩn đại sứ quán các nước.',
    features: ['View 4 hồ Hà Nội', 'Nội thất nhập khẩu Ý', 'Bể bơi tầng mái', 'Lễ tân 24/7'],
    author: {
      name: 'Vũ Thị Minh Hằng',
      phone: '0977 112 233',
      zalo: '0977112233',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Viên Cho Thuê Ba Đình',
      verified: true,
      rating: 4.9,
      ratingCount: 65,
      joinedDate: 'Thành viên 3 năm',
    }
  },
  {
    id: 105,
    title: 'Cho thuê biệt thự sân vườn view Hồ Tây Quảng An, có hồ bơi riêng cho chuyên gia',
    slug: 'cho-thue-biet-thu-ho-tay-quang-an-ha-noi',
    price: '95 Triệu/tháng',
    priceNum: 95,
    priceUnit: 'triệu/tháng',
    pricePerM2: '270k/m²',
    area: 350,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Tây Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Đầy đủ nội thất',
    type: 'Biệt thự',
    category: 'thue',
    address: 'Đường Đặng Thai Mai, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    ward: 'Quảng An',
    district: 'Tây Hồ',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Cách Hồ Tây 50m',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 2450,
    description: 'Biệt thự Pháp cổ điển sát mặt nước Hồ Tây, khuôn viên cây xanh 150m², bể bơi ngoài trời riêng biệt phục vụ chuyên gia quốc tế.',
    features: ['Cách Hồ Tây 50m', 'Hồ bơi riêng', 'Sân vườn nhiệt đới', 'An ninh tuyệt đối'],
    author: {
      name: 'Phạm Hoàng Anh',
      phone: '0912 345 678',
      zalo: '0912345678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Gia Biệt Thự Tây Hồ',
      verified: true,
      rating: 5.0,
      ratingCount: 78,
      joinedDate: 'Thành viên 5 năm',
    }
  },
  // --- SANG NHƯỢNG HÀ NỘI ---
  {
    id: 106,
    title: 'Sang nhượng quán cafe acoustic 2 mặt tiền phố cổ Hàng Buồm Hoàn Kiếm doanh thu tốt',
    slug: 'sang-nhuong-quan-cafe-hang-buom-hoan-kiem-ha-noi',
    price: '450 Triệu',
    priceNum: 0.45,
    priceUnit: 'tỷ',
    pricePerM2: '5.6 tr/m²',
    area: 80,
    bedrooms: 0,
    bathrooms: 2,
    direction: 'Đông Nam',
    legal: 'Sổ đỏ chính chủ',
    furniture: 'Đầy đủ nội thất',
    type: 'Mặt bằng kinh doanh',
    category: 'sang-nhuong',
    address: 'Phố Hàng Buồm, Phường Hàng Buồm, Quận Hoàn Kiếm, Hà Nội',
    ward: 'Hàng Buồm',
    district: 'Hoàn Kiếm',
    city: 'Hà Nội',
    region: 'hanoi',
    badgeTag: 'Phố đi bộ Hoàn Kiếm',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 3200,
    description: 'Chuyển nhượng quán cafe phố cổ đang hoạt động cực đông khách du lịch. Đầy đủ máy pha La Marzocco, âm thanh Bose và hợp đồng thuê nhà dài hạn.',
    features: ['Phố đi bộ Hoàn Kiếm', 'Máy pha La Marzocco', 'Lợi nhuận ổn định', 'Hợp đồng 5 năm'],
    author: {
      name: 'Trần Văn Cường',
      phone: '0903 888 999',
      zalo: '0903888999',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Gia Mặt Bằng Phố Cổ',
      verified: true,
      rating: 5.0,
      ratingCount: 94,
      joinedDate: 'Thành viên 7 năm',
    }
  },

  // ============================================================================
  // ── 2. TP. HỒ CHÍ MINH BĐS (DÀNH CHO PORTAL 18 & TEMPLATE SÀI GÒN) ──────────
  // ============================================================================
  // --- BÁN SÀI GÒN ---
  {
    id: 201,
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
    region: 'saigon',
    badgeTag: 'View Sông Sài Gòn · Metro 200m',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 2980,
    description: 'Căn hộ hạng sang Grand Marina Saigon chuẩn Marriott Quốc tế trung tâm Quận 1. View sông Sài Gòn và Landmark 81 cực thoáng đãng.',
    features: ['Hồ bơi vô cực', 'Bến du thuyền', 'Ga Metro Ba Son', 'Quản lý Marriott'],
    author: {
      name: 'Nguyễn Văn Minh',
      phone: '0908 123 456',
      zalo: '0908123456',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Viên BĐS Thủ Thiêm & Q.1',
      verified: true,
      rating: 4.9,
      ratingCount: 58,
      joinedDate: 'Thành viên 4 năm',
    }
  },
  {
    id: 202,
    title: 'Bán biệt thự Thảo Điền Quận 2 có bến du thuyền cá nhân & hồ bơi sân vườn 500m²',
    slug: 'ban-biet-thu-thao-dien-quan-2-ben-du-thuyen',
    price: '125.0 Tỷ',
    priceNum: 125.0,
    priceUnit: 'tỷ',
    pricePerM2: '250 tr/m²',
    area: 500,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Nam',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Biệt thự',
    category: 'ban',
    address: 'Đường Nguyễn Văn Hưởng, Phường Thảo Điền, Quận 2, TP. Hồ Chí Minh',
    ward: 'Thảo Điền',
    district: 'Quận 2 (TP. Thủ Đức)',
    city: 'TP. Hồ Chí Minh',
    region: 'saigon',
    badgeTag: 'Bán đảo Thảo Điền · Giáp Sông',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 3900,
    description: 'Dinh thự ven sông Thảo Điền đẳng cấp giới thượng lưu Sài Gòn, sở hữu bến đậu du thuyền riêng và hồ bơi nước mặn công nghệ điện phân muối.',
    features: ['Bến du thuyền riêng', 'Hồ bơi nước mặn', 'Sân vườn 250m²', 'An ninh 24/7'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Trưởng Phòng BĐS Cao Cấp Sài Gòn',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    }
  },
  {
    id: 203,
    title: 'Bán nhà phố mặt tiền đường Nguyễn Văn Linh Quận 7 Phú Mỹ Hưng, đang có HĐ thuê',
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
    region: 'saigon',
    badgeTag: 'Phú Mỹ Hưng · Mặt tiền 120m',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm qua',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 1850,
    description: 'Nhà phố 1 trệt 4 lầu có thang máy Mitsubishi, đang cho thuê kinh doanh 65 triệu/tháng. Sổ hồng hoàn công đầy đủ.',
    features: ['Thang máy Mitsubishi', 'HĐ thuê 65tr/tháng', 'Mặt tiền 8m', 'Sổ hồng hoàn công'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Trưởng Phòng BĐS Cao Cấp Sài Gòn',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    }
  },
  // --- CHO THUÊ SÀI GÒN ---
  {
    id: 204,
    title: 'Cho thuê căn hộ 3PN Landmark 81 Vinhomes Central Park nội thất sang trọng tầng cao',
    slug: 'cho-thue-can-ho-3pn-landmark-81-vinhomes-central-park',
    price: '45 Triệu/tháng',
    priceNum: 45,
    priceUnit: 'triệu/tháng',
    pricePerM2: '410k/m²',
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Đông Bắc',
    legal: 'Sổ hồng riêng',
    furniture: 'Cao cấp nhập khẩu',
    type: 'Căn hộ chung cư',
    category: 'thue',
    address: 'Tòa Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    ward: 'Phường 22',
    district: 'Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    region: 'saigon',
    badgeTag: 'Tầng 42 Landmark 81 · View Sông',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 3100,
    description: 'Căn hộ tầng 42 Landmark 81 ngắm trọn công viên ven sông 14ha và sông Sài Gòn. Đầy đủ tiện ích hồ bơi vô cực và sảnh lounge 5 sao.',
    features: ['Tầng 42 Landmark 81', 'Công viên 14ha', 'Thang máy thẻ từ VIP', 'Hồ bơi vô cực'],
    author: {
      name: 'Nguyễn Văn Minh',
      phone: '0908 123 456',
      zalo: '0908123456',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      role: 'Chuyên Viên Cho Thuê Vinhomes',
      verified: true,
      rating: 4.9,
      ratingCount: 58,
      joinedDate: 'Thành viên 4 năm',
    }
  },
  {
    id: 205,
    title: 'Cho thuê văn phòng hạng A tòa nhà Bitexco Financial Tower Quận 1 diện tích 250m²',
    slug: 'cho-thue-van-phong-bitexco-financial-tower-quan-1',
    price: '185 Triệu/tháng',
    priceNum: 185,
    priceUnit: 'triệu/tháng',
    pricePerM2: '740k/m²',
    area: 250,
    bedrooms: 0,
    bathrooms: 4,
    direction: 'Đông Nam',
    legal: 'HĐMB',
    furniture: 'Đầy đủ nội thất',
    type: 'Văn phòng',
    category: 'thue',
    address: 'Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    ward: 'Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    region: 'saigon',
    badgeTag: 'Tháp Tài Chính Bitexco Q1',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm qua',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 1950,
    description: 'Sàn văn phòng hạng A trung tâm tài chính Quận 1 đã setup hoàn chỉnh phòng họp, phòng giám đốc và không gian mở cho 40 nhân sự.',
    features: ['Văn phòng hạng A', 'Sàn nâng kỹ thuật', 'Chiller trung tâm', 'PCCC quốc tế'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Quản Lý BĐS Thương Mại Sài Gòn',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    }
  },
  // --- SANG NHƯỢNG SÀI GÒN ---
  {
    id: 206,
    title: 'Sang nhượng chuỗi nhà hàng Nhật Bản BBQ lẩu nướng tại Phan Xích Long Phú Nhuận',
    slug: 'sang-nhuong-nha-hang-nhat-ban-phan-xich-long-phu-nhuan',
    price: '1.2 Tỷ',
    priceNum: 1.2,
    priceUnit: 'tỷ',
    pricePerM2: '4.8 tr/m²',
    area: 250,
    bedrooms: 0,
    bathrooms: 4,
    direction: 'Đông',
    legal: 'Sổ hồng riêng',
    furniture: 'Đầy đủ nội thất',
    type: 'Mặt bằng kinh doanh',
    category: 'sang-nhuong',
    address: 'Đường Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh',
    ward: 'Phường 2',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    region: 'saigon',
    badgeTag: 'Phố Ẩm Thực Phan Xích Long',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    ],
    date: 'Hôm nay',
    isHot: true,
    isVerified: true,
    inStock: true,
    featured: true,
    views: 3450,
    description: 'Sang nhượng toàn bộ trang thiết bị nhà hàng BBQ hút âm chuẩn Nhật tại con phố ẩm thực sầm uất nhất Sài Gòn. Lợi nhuận ròng 85 triệu/tháng.',
    features: ['Phố ẩm thực sầm uất', 'Bếp Inox 304', '22 bàn hút âm', 'Lợi nhuận ròng 85tr/tháng'],
    author: {
      name: 'Trần Thị Thu Thảo',
      phone: '0919 888 777',
      zalo: '0919888777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      role: 'Quản Lý BĐS Thương Mại Sài Gòn',
      verified: true,
      rating: 5.0,
      ratingCount: 84,
      joinedDate: 'Thành viên 6 năm',
    }
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
    ],
    overview: 'The Global City là đại đô thị biểu tượng mới của toàn Đông Nam Á, tích hợp kênh đào nhạc nước lớn nhất khu vực, TTTM 123.000m² và phân khu nhà phố thương mại Soho sang trọng.',
    amenities: [
      { icon: 'Music', title: 'Kênh Đào Nhạc Nước', desc: 'Quy mô dài 2km lớn nhất Đông Nam Á biểu diễn hàng tuần' },
      { icon: 'ShoppingBag', title: 'TTTM Hạng A 123.000m²', desc: 'Nơi quy tụ hơn 300 thương hiệu xa xỉ toàn cầu' },
      { icon: 'Trees', title: 'Công Viên Xanh 13ha', desc: 'Đường chạy bộ ven sông và quảng trường ánh sáng' },
    ],
    masterplanImg: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
    units: [
      { type: 'Nhà phố SOHO 1LK', area: '95 m²', price: '38 Tỷ', bedrooms: '4 PN', bathrooms: '5 WC', status: 'Đang mở bán' },
      { type: 'Căn hộ Masteri Park 2PN', area: '75 m²', price: '8.5 Tỷ', bedrooms: '2 PN', bathrooms: '2 WC', status: 'Sắp ra mắt' },
    ],
    handoverDate: 'Quý 4/2026',
    legal: 'Sở hữu lâu dài (Người Việt Nam) / 50 năm (Người nước ngoài)',
  },
  {
    id: 202,
    title: 'Heritage West Lake Tây Hồ',
    slug: 'heritage-west-lake-tay-ho',
    developer: 'CapitaLand Development',
    location: '677 Lạc Long Quân, Phường Phú Thượng, Quận Tây Hồ, Hà Nội',
    district: 'Tây Hồ',
    city: 'Hà Nội',
    priceRange: 'Từ 140 - 220 triệu/m²',
    priceNum: 140,
    scale: '173 Căn hộ hạng sang siêu VIP ôm trọn Hồ Tây',
    status: 'Đang mở bán',
    type: 'Khu phức hợp Căn hộ & Shophouse',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    ],
    overview: 'Kiệt tác căn hộ chuẩn 6 sao độc nhất bên bờ Hồ Tây của tập đoàn CapitaLand, trang bị thang máy riêng cho từng căn hộ và bể bơi nước nóng trên tầng mái.',
    amenities: [
      { icon: 'Waves', title: 'Bể Bơi Nước Nóng Tầng Mái', desc: 'Bể bơi nước nóng bốn mùa view ngắm trọn vẹn 500ha mặt nước Hồ Tây' },
      { icon: 'Shield', title: 'Thang Máy Riêng Từng Căn', desc: 'Đảm bảo sự riêng tư và đẳng cấp tối thượng cho chủ nhân' },
    ],
    masterplanImg: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
    units: [
      { type: 'Căn hộ 2 Phòng Ngủ', area: '94 m²', price: '14.5 Tỷ', bedrooms: '2 PN', bathrooms: '2 WC', status: 'Còn 4 căn' },
      { type: 'Căn hộ 3 Phòng Ngủ', area: '145 m²', price: '22.8 Tỷ', bedrooms: '3 PN', bathrooms: '3 WC', status: 'Đang mở bán' },
    ],
    handoverDate: 'Đã cất nóc - Bàn giao 2026',
    legal: 'Sổ hồng sở hữu lâu dài',
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
    content: 'Luật Đất đai (sửa đổi) chính thức có hiệu lực tạo nên bước ngoặt lớn cho toàn bộ thị trường bất động sản Việt Nam.',
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
    content: 'Khảo sát từ dữ liệu thực tế hơn 25.000 tin đăng tại PlatformBDS cho thấy thị trường cho thuê căn hộ TP.HCM đang hồi phục mạnh mẽ với tỷ suất lợi nhuận trung bình từ 4.8% đến 6.2%/năm.',
    views: 2890,
    tags: ['Đầu tư BĐS', 'Thuê nhà', 'Thủ Đức', 'Phú Mỹ Hưng'],
  },
];
`;

fs.writeFileSync(PORTAL_DATA_PATH, comprehensivePortalData, 'utf-8');
console.log('✅ Đã nạp thành công bộ dữ liệu địa lý phân tách riêng biệt cho từng vùng miền!');
