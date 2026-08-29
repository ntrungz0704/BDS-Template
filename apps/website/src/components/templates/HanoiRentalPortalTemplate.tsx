import React, { useState, useEffect, useMemo } from 'react';
import { syncDemoUrl } from '../../../utils/demo';
import {
  Search, MapPin, Building, Phone, Mail, ArrowRight, ChevronRight,
  CheckCircle2, X, Eye, Home, Filter, Send, Calendar, Share2, ShieldCheck,
  User, Check, ArrowLeft, Clock, Award, Star, Tag, PlusCircle, FileText, RotateCcw
} from 'lucide-react';

export interface HanoiRentalPortalTemplateProps {
  template?: any;
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  themeConfig?: any;
  company?: any;
  theme?: any;
  projects?: any[];
  posts?: any[];
}

const DISTRICT_CARDS = [
  { id: 'ntl', name: 'Quận Nam Từ Liêm', count: 28, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'cg', name: 'Quận Cầu Giấy', count: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 'tx', name: 'Quận Thanh Xuân', count: 6, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { id: 'btl', name: 'Quận Bắc Từ Liêm', count: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
  { id: 'th', name: 'Quận Tây Hồ', count: 1, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
];

const RENTAL_APARTMENTS = [
  { 
    id: 'r1', 
    slug: 'cho-thue-chung-cu-hd-mon-my-dinh-54m2',
    title: 'CHO THUÊ CHUNG CƯ HD MON - MỸ ĐÌNH 54M2 FULL ĐỒ', 
    price: '9,000,000 đ/tháng', 
    priceNum: 9,
    loc: 'Lê Đức Thọ, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'HD Mon City',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 
    area: '54m²', 
    areaNum: 54,
    beds: '2 PN',
    desc: 'Căn hộ tầng trung view thoáng, đầy đủ nội thất cao cấp chỉ việc xách vali vào ở. Tiện ích tòa nhà hiện đại, gần trường học, bệnh viện.'
  },
  { 
    id: 'r2', 
    slug: 'cho-thue-vinaconex-7-ho-tung-mau-can-goc',
    title: 'CHO THUÊ CHUNG CƯ VINACONEX 7 HỒ TÙNG MẬU - CĂN GÓC', 
    price: '11,000,000 đ/tháng', 
    priceNum: 11,
    loc: '136 Hồ Tùng Mậu, Cầu Diễn, Bắc Từ Liêm', 
    district: 'Bắc Từ Liêm',
    ward: 'Cầu Diễn',
    project: 'Vinaconex 7',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80', 
    area: '77m²', 
    areaNum: 77,
    beds: '2 PN',
    desc: 'Căn góc 2 mặt thoáng mát, ánh sáng tự nhiên ngập tràn. Gần ga Metro Nhổn - Ga Hà Nội, đi lại vô cùng thuận tiện.'
  },
  { 
    id: 'r3', 
    slug: 'cho-thue-can-ho-flc-36-pham-hung-my-dinh',
    title: 'CHO THUÊ CĂN HỘ CHUNG CƯ FLC 36 PHẠM HÙNG - MỸ ĐÌNH', 
    price: '10,000,000 đ/tháng', 
    priceNum: 10,
    loc: '36 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'FLC Complex',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', 
    area: '66m²', 
    areaNum: 66,
    beds: '2 PN',
    desc: 'Căn hộ mới đẹp, nội thất hiện đại, đối diện bến xe Mỹ Đình, view thành phố lung linh về đêm.'
  },
  { 
    id: 'r4', 
    slug: 'cho-thue-flc-36-pham-hung-54m2',
    title: 'CHO THUÊ CHUNG CƯ FLC 36 PHẠM HÙNG - MỸ ĐÌNH 54M2', 
    price: '9,000,000 đ/tháng', 
    priceNum: 9,
    loc: '36 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'FLC Complex',
    propertyType: 'Căn hộ Studio',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 
    area: '54m²', 
    areaNum: 54,
    beds: '1.5 PN',
    desc: 'Căn hộ thiết kế thông minh 1PN + 1 phòng đa năng, phù hợp chuyên gia làm việc hoặc vợ chồng trẻ.'
  },
  { 
    id: 'r5', 
    slug: 'cho-thue-chung-cu-song-da-my-dinh-1',
    title: 'CHO THUÊ CHUNG CƯ SÔNG ĐÀ MỸ ĐÌNH - MỸ ĐÌNH 1', 
    price: '11,000,000 đ/tháng', 
    priceNum: 11,
    loc: 'Phạm Hùng, Mỹ Đình 1, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 1',
    project: 'Sông Đà Mỹ Đình',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1502005229762-ee1b2da97327?w=800&q=80', 
    area: '88m²', 
    areaNum: 88,
    beds: '3 PN',
    desc: 'Khu đô thị Mỹ Đình 1 an ninh dân trí cao, gần trường Marie Curie và trung tâm The Garden.'
  },
  { 
    id: 'r6', 
    slug: 'cho-thue-flc-pham-hung-full-noi-that',
    title: 'CHO THUÊ CĂN HỘ CHUNG CƯ FLC 36 PHẠM HÙNG - MỸ ĐÌNH', 
    price: '10,000,000 đ/tháng', 
    priceNum: 10,
    loc: '36 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'FLC Complex',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 
    area: '70m²', 
    areaNum: 70,
    beds: '2 PN',
    desc: 'Nhà sạch sẽ thoáng mát, ban công rộng view đẹp, tầng trung tiện di chuyển.'
  },
  { 
    id: 'r7', 
    slug: 'cho-thue-flc-pham-hung-can-3pn-vip',
    title: 'CHO THUÊ CHUNG CƯ FLC 36 PHẠM HÙNG - MỸ ĐÌNH', 
    price: '14,000,000 đ/tháng', 
    priceNum: 14,
    loc: '36 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'FLC Complex',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 
    area: '98m²', 
    areaNum: 98,
    beds: '3 PN',
    desc: 'Căn hộ 3 phòng ngủ rộng rãi, trang thiết bị điện tử đầy đủ, nhận nhà ở ngay.'
  },
  { 
    id: 'r8', 
    slug: 'cho-thue-my-dinh-plaza-102m2',
    title: 'CHO THUÊ CHUNG CƯ MỸ ĐÌNH PLAZA - MỸ ĐÌNH, 102M2', 
    price: '9,000,000 đ/tháng', 
    priceNum: 9,
    loc: '138 Trần Bình, Mỹ Đình 2, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mỹ Đình 2',
    project: 'Mỹ Đình Plaza',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 
    area: '102m²', 
    areaNum: 102,
    beds: '3 PN',
    desc: 'Căn hộ diện tích cực rộng 102m2 3PN giá tốt nhất thị trường Mỹ Đình.'
  }
];

const SALE_APARTMENTS = [
  { 
    id: 's1', 
    slug: 'ban-can-ho-the-matrix-one-my-dinh',
    title: 'BÁN CĂN HỘ THE MATRIX ONE MỸ ĐÌNH - TẦNG ĐẸP VIEW CÔNG VIÊN', 
    price: '4.95 Tỷ', 
    priceNum: 4950,
    loc: 'Lê Quang Đạo, Mễ Trì, Nam Từ Liêm', 
    district: 'Nam Từ Liêm',
    ward: 'Mễ Trì',
    project: 'The Matrix One',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 
    area: '86m²', 
    areaNum: 86,
    beds: '2 PN',
    desc: 'Căn hộ hạng sang The Matrix One kính Low-E tràn viền view trọn công viên 14ha.'
  },
  { 
    id: 's2', 
    slug: 'ban-can-ho-goldmark-city-136-ho-tung-mau',
    title: 'BÁN CĂN HỘ GOLDMARK CITY 136 HỒ TÙNG MẬU - SỔ ĐỎ', 
    price: '3.65 Tỷ', 
    priceNum: 3650,
    loc: '136 Hồ Tùng Mậu, Phú Diễn, Bắc Từ Liêm', 
    district: 'Bắc Từ Liêm',
    ward: 'Phú Diễn',
    project: 'Goldmark City',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 
    area: '74m²', 
    areaNum: 74,
    beds: '2 PN',
    desc: 'Tòa Sapphire view quảng trường nước. Sổ đỏ cất két sẵn sàng giao dịch.'
  },
  { 
    id: 's3', 
    slug: 'ban-chung-cu-dcapitale-tran-duy-hung',
    title: 'BÁN CHUNG CƯ D\'CAPITALE TRẦN DUY HƯNG CĂN GÓC 3PN', 
    price: '5.8 Tỷ', 
    priceNum: 5800,
    loc: 'Trần Duy Hưng, Trung Hòa, Cầu Giấy', 
    district: 'Cầu Giấy',
    ward: 'Trung Hòa',
    project: 'D\'Capitale',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 
    area: '95m²', 
    areaNum: 95,
    beds: '3 PN',
    desc: 'Vị trí kim cương ngã tư Trần Duy Hưng - Khuất Duy Tiến, tiện ích Vincom đồng bộ.'
  },
  { 
    id: 's4', 
    slug: 'ban-can-ho-imperia-garden-203-nguyen-huy-tuong',
    title: 'BÁN CĂN HỘ IMPERIA GARDEN 203 NGUYỄN HUY TƯỞNG', 
    price: '4.2 Tỷ', 
    priceNum: 4200,
    loc: '203 Nguyễn Huy Tưởng, Thanh Xuân Trung, Thanh Xuân', 
    district: 'Thanh Xuân',
    ward: 'Nhân Chính',
    project: 'Imperia Garden',
    propertyType: 'Căn hộ chung cư',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 
    area: '80m²', 
    areaNum: 80,
    beds: '2 PN',
    desc: 'Khu căn hộ sinh thái khép kín "Vườn trong phố" quận Thanh Xuân.'
  }
];

const HANOI_PROJECTS = [
  { id: 'p1', title: 'HD Mon City Mỹ Đình', loc: 'Lê Đức Thọ, Nam Từ Liêm', totalUnits: '1.750 Căn', status: 'Đã bàn giao sổ đỏ', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'p2', title: 'FLC Complex Phạm Hùng', loc: '36 Phạm Hùng, Nam Từ Liêm', totalUnits: '480 Căn', status: 'Đang vận hành', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 'p3', title: 'The Matrix One Mễ Trì', loc: 'Lê Quang Đạo, Nam Từ Liêm', totalUnits: '740 Căn', status: 'Hạng sang A+', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 'p4', title: 'Goldmark City 136 Hồ Tùng Mậu', loc: '136 Hồ Tùng Mậu, Bắc Từ Liêm', totalUnits: '5.000 Căn', status: 'Đại đô thị', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 'p5', title: 'D\'Capitale Trần Duy Hưng', loc: 'Trần Duy Hưng, Cầu Giấy', totalUnits: '3.000 Căn', status: 'Tập đoàn Tân Hoàng Minh', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 'p6', title: 'Imperia Garden Nguyễn Huy Tưởng', loc: '203 Nguyễn Huy Tưởng, Thanh Xuân', totalUnits: '1.600 Căn', status: 'Sinh thái xanh', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' }
];

const BUY_RENT_REQUESTS = [
  { id: 'req1', title: 'Cần thuê gấp căn 2PN full đồ tại HD Mon City hoặc FLC Phạm Hùng', user: 'Nguyễn Văn Hải (Chuyên gia IT)', budget: '9 - 11 Tr/tháng', date: 'Vừa xong', district: 'Nam Từ Liêm', tag: 'CẦN THUÊ GẤP' },
  { id: 'req2', title: 'Tìm mua căn hộ 3PN hướng Đông Nam The Matrix One Mễ Trì', user: 'Trần Thị Thu Hương (Doanh nhân)', budget: '5 - 6 Tỷ', date: '15 phút trước', district: 'Nam Từ Liêm', tag: 'CẦN MUA' },
  { id: 'req3', title: 'Cần thuê căn hộ 1PN Studio làm việc tại D\'Capitale Cầu Giấy', user: 'Lê Minh Tuấn', budget: '8 - 10 Tr/tháng', date: '1 giờ trước', district: 'Cầu Giấy', tag: 'CẦN THUÊ' },
  { id: 'req4', title: 'Tìm mua căn 2PN Goldmark City tòa Sapphire sổ đỏ chính chủ', user: 'Vũ Quốc Bảo', budget: '3.5 Tỷ', date: '3 giờ trước', district: 'Bắc Từ Liêm', tag: 'CẦN MUA' }
];

const HANOI_NEWS = [
  {
    id: 'hn1',
    slug: 'thi-truong-cho-thue-chung-cu-ha-noi-2026',
    title: 'Thị trường cho thuê chung cư Hà Nội 2026: Nhu cầu thuê căn hộ 2 phòng ngủ tăng mạnh',
    date: '25/05/2026',
    cat: 'Thị trường thuê nhà',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    summary: 'Khu vực Mỹ Đình, Cầu Giấy ghi nhận tỷ lệ lấp đầy đạt trên 94% nhờ sự dịch chuyển của các công ty công nghệ và chuyên gia nước ngoài.',
    body: [
      'Theo báo cáo mới nhất của Hiệp hội Môi giới Bất động sản, giá thuê căn hộ chung cư tại Hà Nội đã tăng trung bình 8-12% so với cùng kỳ năm trước.',
      'Đặc biệt, trục phía Tây bao gồm Nam Từ Liêm và Cầu Giấy là nơi có tốc độ tăng giá thuê cao nhất nhờ hạ tầng giao thông đồng bộ và tập trung nhiều trường đại học, khu văn phòng cao cấp.',
      'Khách thuê hiện nay ưu tiên các tòa nhà có đầy đủ dịch vụ tiện ích như hầm đỗ xe thông minh, an ninh 24/7 và gần tuyến đường sắt đô thị Metro.'
    ]
  },
  {
    id: 'hn2',
    slug: 'kinh-nghiem-thue-chung-cu-chinh-chu-my-dinh',
    title: 'Kinh nghiệm thuê chung cư chính chủ tại Mỹ Đình không qua trung gian',
    date: '20/05/2026',
    cat: 'Cẩm nang thuê nhà',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    summary: 'Cách nhận biết hợp đồng thuê nhà chuẩn pháp lý, kiểm tra đồng hồ điện nước và phương thức thanh toán tiền cọc an toàn.',
    body: [
      'Khi tìm thuê căn hộ, người thuê nên yêu cầu chủ nhà xuất trình giấy tờ chứng minh quyền sở hữu như Hợp đồng mua bán hoặc Sổ hồng căn hộ.',
      'Biên bản bàn giao hiện trạng trang thiết bị nội thất cần được lập chi tiết kèm hình ảnh chụp để tránh các tranh chấp khi kết thúc hợp đồng thuê.'
    ]
  },
  {
    id: 'hn3',
    slug: 'top-5-chung-cu-cho-thue-gia-re-cau-giay',
    title: 'Top 5 tòa chung cư cho thuê giá tốt nhất quận Cầu Giấy và Nam Từ Liêm',
    date: '15/05/2026',
    cat: 'Đánh giá dự án',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    summary: 'Danh sách các tòa chung cư có mức giá thuê chỉ từ 8 - 12 triệu/tháng nhưng đầy đủ tiện ích và vị trí giao thông thuận tiện.',
    body: [
      'HD Mon City, FLC Complex Phạm Hùng và Vinaconex 7 là những cái tên hàng đầu trong phân khúc căn hộ cho thuê tầm trung tại cửa ngõ phía Tây Hà Nội.'
    ]
  }
];

export const HanoiRentalPortalTemplate: React.FC<HanoiRentalPortalTemplateProps> = ({
  initialPage = 'home',
  company
}) => {
  const resolveRoute = (raw: string) => {
    if (!raw || raw === 'home') return { page: 'home', item: null, article: null };
    const parts = raw.split('/');
    if (parts[0] === 'chi-tiet' || parts[0] === 'detail') {
      const slug = parts.slice(1).join('/');
      const match = [...RENTAL_APARTMENTS, ...SALE_APARTMENTS].find(i => i.slug === slug || i.id === slug) || SALE_APARTMENTS.find(i => slug.includes(i.id) || slug.includes('goldmark')) || RENTAL_APARTMENTS[0];
      return { page: 'detail', item: match, article: null };
    }
    if (parts[0] === 'tin-tuc' || parts[0] === 'news-detail') {
      const slug = parts.slice(1).join('/');
      const match = HANOI_NEWS.find(a => a.slug === slug || a.id === slug) || HANOI_NEWS[0];
      return { page: 'news-detail', item: null, article: match };
    }
    return { page: parts[0], item: null, article: null };
  };

  const initialResolved = resolveRoute(initialPage);
  const [currentPage, setCurrentPage] = useState<string>(initialResolved.page);
  const [selectedItem, setSelectedItem] = useState<any | null>(initialResolved.item || RENTAL_APARTMENTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(initialResolved.article || HANOI_NEWS[0]);
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [postSubmitted, setPostSubmitted] = useState<boolean>(false);

  // ── FILTER STATES ──
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [filterWard, setFilterWard] = useState<string>('all');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (initialPage) {
      const r = resolveRoute(initialPage);
      setCurrentPage(r.page);
      if (r.item) setSelectedItem(r.item);
      if (r.article) setSelectedArticle(r.article);
    }
  }, [initialPage]);

  const navigate = (page: string, slugParam?: string) => {
    setCurrentPage(page);
    const targetSlug = page === 'home' ? '' : (slugParam ? `${page}/${slugParam}` : page);
    syncDemoUrl(targetSlug, 'bds-21');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const sub = parts.length > 2 ? parts.slice(2).join('/') : (parts[1] !== 'bds-21' ? parts[1] : 'home');
      if (sub) {
        const r = resolveRoute(sub);
        setCurrentPage(r.page);
        if (r.item) setSelectedItem(r.item);
        if (r.article) setSelectedArticle(r.article);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    navigate('chi-tiet', item.slug || item.id);
  };

  const handleSelectArticle = (art: any) => {
    setSelectedArticle(art);
    navigate('tin-tuc', art.slug || art.id);
  };

  const handleDistrictTabClick = (distName: string) => {
    setFilterDistrict(distName.replace('Quận ', ''));
    setSearchTriggered(true);
    const resultsEl = document.getElementById('search-results-section');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setFilterType('all');
    setFilterDistrict('all');
    setFilterWard('all');
    setFilterProject('all');
    setFilterArea('all');
    setSearchTriggered(false);
  };

  // Filtered Rental Apartments
  const filteredRentals = useMemo(() => {
    return RENTAL_APARTMENTS.filter(item => {
      if (filterType !== 'all' && item.propertyType !== filterType) return false;
      if (filterDistrict !== 'all' && !item.district.includes(filterDistrict)) return false;
      if (filterWard !== 'all' && item.ward !== filterWard) return false;
      if (filterProject !== 'all' && item.project !== filterProject) return false;
      if (filterArea === '<50' && item.areaNum >= 50) return false;
      if (filterArea === '50-80' && (item.areaNum < 50 || item.areaNum > 80)) return false;
      if (filterArea === '>80' && item.areaNum <= 80) return false;
      return true;
    });
  }, [filterType, filterDistrict, filterWard, filterProject, filterArea]);

  // Filtered Sale Apartments
  const filteredSales = useMemo(() => {
    return SALE_APARTMENTS.filter(item => {
      if (filterDistrict !== 'all' && !item.district.includes(filterDistrict)) return false;
      if (filterWard !== 'all' && item.ward !== filterWard) return false;
      if (filterProject !== 'all' && item.project !== filterProject) return false;
      if (filterArea === '<50' && item.areaNum >= 50) return false;
      if (filterArea === '50-80' && (item.areaNum < 50 || item.areaNum > 80)) return false;
      if (filterArea === '>80' && item.areaNum <= 80) return false;
      return true;
    });
  }, [filterDistrict, filterWard, filterProject, filterArea]);

  const hasActiveFilters = filterType !== 'all' || filterDistrict !== 'all' || filterWard !== 'all' || filterProject !== 'all' || filterArea !== 'all';

  const isDetailPage = currentPage === 'detail' || currentPage === 'chi-tiet' || currentPage.startsWith('chi-tiet');
  const isNewsDetailPage = currentPage === 'news-detail' || currentPage === 'tin-tuc' || currentPage.startsWith('tin-tuc');
  const isHome = currentPage === 'home' || (!['rent', 'sale', 'projects', 'requests', 'news', 'post', 'about', 'gioi-thieu', 'contact', 'lien-he'].includes(currentPage) && !isDetailPage && !isNewsDetailPage);

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER CHOTHUECHUNGCUHANOI.COM */}
      <header className="bg-[#0066B2] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-[1360px] mx-auto px-4 h-18 flex items-center justify-between gap-4">
          <div 
            onClick={() => navigate('home')}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xs bg-white/10 flex items-center justify-center font-black text-white text-base">
              🏢
            </div>
            <span className="font-black text-sm sm:text-base tracking-tight uppercase">
              CHOTHUECHUNGCUHANOI.COM
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            <button onClick={() => navigate('rent')} className={`hover:text-amber-300 transition-colors ${currentPage === 'rent' ? 'text-amber-300 font-black' : ''}`}>CHUNG CƯ CHO THUÊ</button>
            <button onClick={() => navigate('sale')} className={`hover:text-amber-300 transition-colors ${currentPage === 'sale' ? 'text-amber-300 font-black' : ''}`}>CHUNG CƯ BÁN</button>
            <button onClick={() => navigate('projects')} className={`hover:text-amber-300 transition-colors ${currentPage === 'projects' ? 'text-amber-300 font-black' : ''}`}>DỰ ÁN</button>
            <button onClick={() => navigate('requests')} className={`hover:text-amber-300 transition-colors ${currentPage === 'requests' ? 'text-amber-300 font-black' : ''}`}>CẦN MUA - CẦN THUÊ</button>
            <button onClick={() => navigate('news')} className={`hover:text-amber-300 transition-colors ${currentPage === 'news' || isNewsDetailPage ? 'text-amber-300 font-black' : ''}`}>TIN TỨC</button>
          </nav>

          <div className="flex items-center gap-2 text-xs font-bold">
            <button onClick={() => navigate('post')} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 font-bold uppercase rounded-xs">
              Đăng tin
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SEARCH BAR VỚI TÍNH NĂNG LỌC & TÌM KIẾM ĐẦY ĐỦ */}
      {isHome && (
        <section className="relative bg-slate-900 py-16 px-4 sm:px-8 text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
            alt="Hà Nội Sky"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="relative z-10 max-w-[1100px] mx-auto space-y-4">
            {/* 5 DISTRICT BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Quận Nam Từ Liêm', 'Quận Bắc Từ Liêm', 'Quận Cầu Giấy', 'Quận Thanh Xuân', 'Quận Tây Hồ'].map((dist, idx) => {
                const distKey = dist.replace('Quận ', '');
                const isActive = filterDistrict === distKey;
                return (
                  <button
                    key={idx}
                    onClick={() => handleDistrictTabClick(dist)}
                    className={`px-3.5 py-1.5 text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-[#0066B2] text-white border-amber-400 ring-2 ring-amber-400' 
                        : 'bg-slate-950/80 hover:bg-[#0066B2] text-white border-white/20'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{dist}</span>
                  </button>
                );
              })}
            </div>

            {/* INTERACTIVE FILTER DROPDOWNS */}
            <div className="bg-white p-2.5 shadow-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 text-slate-800 text-xs">
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border border-slate-200 font-medium focus:outline-none focus:border-[#0066B2]"
              >
                <option value="all">Loại bất động sản (Tất cả)...</option>
                <option value="Căn hộ chung cư">Căn hộ chung cư</option>
                <option value="Chung cư mini">Chung cư mini</option>
                <option value="Căn hộ Studio">Căn hộ Studio</option>
              </select>

              <select 
                value={filterDistrict} 
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="p-2 border border-slate-200 font-medium focus:outline-none focus:border-[#0066B2]"
              >
                <option value="all">Quận / Huyện (Tất cả)</option>
                <option value="Nam Từ Liêm">Nam Từ Liêm</option>
                <option value="Cầu Giấy">Cầu Giấy</option>
                <option value="Thanh Xuân">Thanh Xuân</option>
                <option value="Bắc Từ Liêm">Bắc Từ Liêm</option>
                <option value="Tây Hồ">Tây Hồ</option>
              </select>

              <select 
                value={filterWard} 
                onChange={(e) => setFilterWard(e.target.value)}
                className="p-2 border border-slate-200 font-medium focus:outline-none focus:border-[#0066B2]"
              >
                <option value="all">Phường / Xã (Tất cả)</option>
                <option value="Mỹ Đình 1">Mỹ Đình 1</option>
                <option value="Mỹ Đình 2">Mỹ Đình 2</option>
                <option value="Mễ Trì">Mễ Trì</option>
                <option value="Cầu Diễn">Cầu Diễn</option>
                <option value="Phú Diễn">Phú Diễn</option>
                <option value="Trung Hòa">Trung Hòa</option>
                <option value="Nhân Chính">Nhân Chính</option>
              </select>

              <select 
                value={filterProject} 
                onChange={(e) => setFilterProject(e.target.value)}
                className="p-2 border border-slate-200 font-medium focus:outline-none focus:border-[#0066B2]"
              >
                <option value="all">Dự án (Tất cả)</option>
                <option value="HD Mon City">HD Mon City</option>
                <option value="FLC Complex">FLC Complex</option>
                <option value="Vinaconex 7">Vinaconex 7</option>
                <option value="The Matrix One">The Matrix One</option>
                <option value="Goldmark City">Goldmark City</option>
                <option value="D'Capitale">D'Capitale</option>
                <option value="Imperia Garden">Imperia Garden</option>
              </select>

              <select 
                value={filterArea} 
                onChange={(e) => setFilterArea(e.target.value)}
                className="p-2 border border-slate-200 font-medium focus:outline-none focus:border-[#0066B2]"
              >
                <option value="all">Diện tích (Tất cả)</option>
                <option value="<50">Dưới 50m²</option>
                <option value="50-80">50m² - 80m²</option>
                <option value=">80">Trên 80m²</option>
              </select>

              <button 
                onClick={() => {
                  setSearchTriggered(true);
                  const el = document.getElementById('search-results-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#0066B2] hover:bg-blue-700 text-white font-black p-2 flex items-center justify-center gap-1.5 uppercase transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>TÌM KIẾM</span>
              </button>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                <span className="bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-xs">
                  Bộ lọc đang áp dụng: {filterDistrict !== 'all' ? `Quận ${filterDistrict}` : ''} {filterProject !== 'all' ? `· Dự án ${filterProject}` : ''} {filterArea !== 'all' ? `· DT: ${filterArea}` : ''}
                </span>
                <button 
                  onClick={handleResetFilters}
                  className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-xs flex items-center gap-1 font-bold"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. HOME VIEW */}
      {isHome && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-12 flex-1">
          {/* SECTION 1: 5 DISTRICT CARDS */}
          <section>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-4 uppercase">
              Cho thuê chung cư tại Hà Nội
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div 
                onClick={() => handleDistrictTabClick('Quận Nam Từ Liêm')}
                className="md:col-span-6 relative overflow-hidden h-[340px] cursor-pointer group shadow-xs border border-slate-200"
              >
                <img
                  src={DISTRICT_CARDS[0].image}
                  alt={DISTRICT_CARDS[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4 text-white">
                  <h3 className="text-base font-black">{DISTRICT_CARDS[0].name}</h3>
                  <span className="text-xs text-amber-300 font-bold block mt-0.5">{DISTRICT_CARDS[0].count} Tin đăng</span>
                </div>
              </div>

              <div className="md:col-span-6 grid grid-cols-2 gap-4 h-[340px]">
                {DISTRICT_CARDS.slice(1).map((dist) => (
                  <div
                    key={dist.id}
                    onClick={() => handleDistrictTabClick(dist.name)}
                    className="relative overflow-hidden h-[162px] cursor-pointer group shadow-xs border border-slate-200"
                  >
                    <img
                      src={dist.image}
                      alt={dist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 text-white">
                      <h3 className="text-xs font-black">{dist.name}</h3>
                      <span className="text-[10px] text-amber-300 font-bold block">{dist.count} Tin đăng</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: CĂN HỘ CHO THUÊ (REAL-TIME FILTERED) */}
          <section id="search-results-section">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                CHO THUÊ CĂN HỘ CHUNG CƯ {hasActiveFilters ? `(${filteredRentals.length} kết quả)` : ''}
              </h2>
              {hasActiveFilters && (
                <button onClick={handleResetFilters} className="text-xs text-[#0066B2] font-bold hover:underline">
                  Xem tất cả ({RENTAL_APARTMENTS.length})
                </button>
              )}
            </div>

            {filteredRentals.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200 text-xs text-slate-500 space-y-2">
                <p>Không có căn hộ nào khớp chính xác với bộ lọc đang chọn.</p>
                <button onClick={handleResetFilters} className="px-4 py-2 bg-[#0066B2] text-white font-bold uppercase rounded-xs">
                  Hiển thị tất cả danh sách
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredRentals.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-[#0066B2] transition-colors leading-snug mb-1">
                          {item.title}
                        </h3>
                        <strong className="text-xs font-black text-[#0066B2] font-mono block mb-1">{item.price}</strong>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{item.loc}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 3: CHUNG CƯ BÁN (REAL-TIME FILTERED) */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                CHUNG CƯ BÁN {hasActiveFilters ? `(${filteredSales.length} kết quả)` : ''}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSales.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-[#0066B2] transition-colors leading-snug mb-1">
                        {item.title}
                      </h3>
                      <strong className="text-xs font-black text-rose-600 font-mono block mb-1">{item.price}</strong>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.loc}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* 4. FULL DETAIL VIEW CHO CĂN HỘ */}
      {isDetailPage && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-6 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#0066B2] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </button>
            <span>/</span>
            <button onClick={() => navigate('rent')} className="hover:text-[#0066B2]">Chung cư</button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-md">{selectedItem?.title || 'Căn hộ chung cư Hà Nội'}</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('rent')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách
            </button>
            <span className="text-xs bg-blue-100 text-[#0066B2] font-bold px-2.5 py-1">Mã tin: #{selectedItem?.id || 'HD-102'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="aspect-[16/9] w-full bg-slate-900">
                  <img src={selectedItem?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'} alt={selectedItem?.title || 'BĐS'} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-black text-slate-900">{selectedItem?.title || 'Căn Hộ Chung Cư Cao Cấp'}</h1>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                      <MapPin className="w-4 h-4 text-[#0066B2] shrink-0" />
                      <span>{selectedItem?.loc || 'Hà Nội'}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Mức giá niêm yết</span>
                    <strong className="text-xl font-black text-rose-600 font-mono">{selectedItem?.price || '9,000,000 đ/tháng'}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 py-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[11px] text-slate-400 block">Diện tích</span><strong>{selectedItem?.area || '75m²'}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[11px] text-slate-400 block">Phòng ngủ</span><strong>{selectedItem?.beds || '2 PN'}</strong></div>
                  <div className="p-3 bg-slate-50 border border-slate-200"><span className="text-[11px] text-slate-400 block">Pháp lý</span><strong>Sổ đỏ chính chủ</strong></div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-900 mb-2">Thông tin chi tiết</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedItem?.desc || 'Căn hộ mới đẹp, nội thất hiện đại cao cấp đầy đủ, sẵn sàng dọn vào ở ngay.'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 p-6 shadow-xs sticky top-20 space-y-4">
                <div className="text-center pb-4 border-b border-slate-100">
                  <strong className="block text-sm font-bold text-slate-900">Ban Quản Lý Chuyên Trách</strong>
                  <span className="text-[11px] text-slate-500">Hỗ trợ tư vấn và xem nhà 24/7</span>
                </div>
                <a href="tel:0919006030" className="w-full py-3 bg-[#0066B2] hover:bg-blue-700 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-xs transition-colors">
                  <Phone className="w-4 h-4" /> Gọi 0919 006 030
                </a>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 5. FULL ARTICLE DETAIL */}
      {isNewsDetailPage && (
        <main className="max-w-[900px] mx-auto px-4 py-8 space-y-6 flex-1 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('home')} className="hover:text-[#0066B2] flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Trang chủ</button>
            <span>/</span>
            <button onClick={() => navigate('news')} className="hover:text-[#0066B2]">Tin tức</button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-sm">{selectedArticle?.title || 'Tin tức'}</span>
          </div>

          <button onClick={() => navigate('news')} className="px-3 py-1.5 bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách tin
          </button>

          <article className="bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066B2] bg-blue-50 px-2.5 py-1 border border-blue-200 inline-block">
              {selectedArticle?.cat || 'Thị trường'}
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">{selectedArticle?.title || 'Thị trường BĐS Hà Nội'}</h1>
            <div className="aspect-[16/9] bg-slate-900 overflow-hidden">
              <img src={selectedArticle?.img || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'} alt={selectedArticle?.title || 'Tin'} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 bg-blue-50/60 border-l-4 border-[#0066B2] text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {selectedArticle?.summary}
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle?.body?.map((para: string, i: number) => <p key={i}>{para}</p>)}
            </div>
          </article>
        </main>
      )}

      {/* 6. SUBPAGES */}
      {currentPage === 'rent' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Danh Sách Căn Hộ Chung Cư Cho Thuê</h1>
              <p className="text-xs text-slate-500 mt-1">Cập nhật liên tục từ chính chủ tại các quận Hà Nội</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RENTAL_APARTMENTS.map((item) => (
              <div key={item.id} onClick={() => handleSelectItem(item)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-[#0066B2] mb-1">{item.title}</h3>
                    <strong className="text-xs font-black text-[#0066B2] font-mono block mb-1">{item.price}</strong>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /><span>{item.loc}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'sale' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Danh Sách Căn Hộ Chung Cư Bán</h1>
              <p className="text-xs text-slate-500 mt-1">Sổ đỏ chính chủ, pháp lý minh bạch 100%</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALE_APARTMENTS.map((item) => (
              <div key={item.id} onClick={() => handleSelectItem(item)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-[#0066B2] mb-1">{item.title}</h3>
                    <strong className="text-xs font-black text-rose-600 font-mono block mb-1">{item.price}</strong>
                    <p className="text-[11px] text-slate-500 truncate flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /><span>{item.loc}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'projects' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Danh Sách Dự Án BĐS Trọng Điểm Hà Nội</h1>
              <p className="text-xs text-slate-500 mt-1">Thông tin quy mô, chủ đầu tư và tiến độ bàn giao</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {HANOI_PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all group">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-[#0066B2] uppercase bg-blue-50 px-2 py-0.5 border border-blue-200">{proj.status}</span>
                  <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span>{proj.loc}</span></p>
                  <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">Quy mô: <strong>{proj.totalUnits}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'requests' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Sàn Khách Cần Mua & Cần Thuê Nhà</h1>
              <p className="text-xs text-slate-500 mt-1">Kết nối trực tiếp nhu cầu khách hàng với chủ nhà và môi giới</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {BUY_RENT_REQUESTS.map((req) => (
                <div key={req.id} className="bg-white p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 ${req.tag.includes('GẤP') ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>{req.tag}</span>
                      <span className="text-[11px] text-slate-400">⏱️ {req.date} · 📍 {req.district}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">{req.title}</h3>
                    <p className="text-xs text-slate-500">Khách hàng: <strong>{req.user}</strong></p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">Tài chính</span>
                    <strong className="text-sm font-black text-rose-600 font-mono">{req.budget}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 bg-white p-5 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase text-slate-900 tracking-wider">ĐĂNG TIN CẦN TÌM NHÀ NHANH</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Đã tiếp nhận yêu cầu tìm nhà! Môi giới phụ trách sẽ gọi lại trong 10 phút.'); }} className="space-y-2.5 text-xs">
                <input type="text" placeholder="Họ và tên..." required className="w-full p-2 border border-slate-300" />
                <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2 border border-slate-300" />
                <select className="w-full p-2 border border-slate-300">
                  <option>Nhu cầu: Cần thuê nhà</option>
                  <option>Nhu cầu: Cần mua nhà</option>
                </select>
                <input type="text" placeholder="Ngân sách dự kiến (Ví dụ: 10 triệu/tháng)..." required className="w-full p-2 border border-slate-300" />
                <textarea rows={3} placeholder="Mô tả cụ thể yêu cầu (khu vực, số phòng ngủ...)" className="w-full p-2 border border-slate-300" />
                <button type="submit" className="w-full py-2.5 bg-[#0066B2] hover:bg-blue-700 text-white font-bold uppercase">GỬI YÊU CẦU</button>
              </form>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'news' && (
        <main className="max-w-[1360px] mx-auto px-4 py-8 space-y-8 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Tin Tức Thị Trường BĐS Hà Nội</h1>
              <p className="text-xs text-slate-500 mt-1">Cập nhật giá thuê, xu hướng thị trường và kinh nghiệm pháp lý</p>
            </div>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HANOI_NEWS.map((art) => (
              <div key={art.id} onClick={() => handleSelectArticle(art)} className="bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#0066B2] uppercase">{art.cat} · {art.date}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0066B2] line-clamp-2 mt-1 mb-2">{art.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#0066B2]">Đọc toàn bộ bài viết →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === 'post' && (
        <main className="max-w-[800px] mx-auto px-4 py-8 space-y-6 flex-1 w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">Đăng Tin Bất Động Sản Hà Nội</h1>
            <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">← Về trang chủ</button>
          </div>

          {postSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-300 p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-base font-bold text-emerald-900">ĐĂNG TIN THÀNH CÔNG!</h2>
              <p className="text-xs text-emerald-700">Tin đăng của bạn đã được kiểm duyệt tự động và đang hiển thị trên trang chủ.</p>
              <button onClick={() => { setPostSubmitted(false); navigate('home'); }} className="px-6 py-2 bg-[#0066B2] text-white text-xs font-bold uppercase">Về Trang Chủ</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setPostSubmitted(true); }} className="bg-white p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Tiêu đề tin đăng (*)</label>
                <input type="text" placeholder="Ví dụ: Cho thuê chung cư HD Mon 54m2 2PN full đồ giá 9 triệu..." required className="w-full p-2.5 border border-slate-300" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Loại tin</label>
                  <select className="w-full p-2.5 border border-slate-300">
                    <option>Chung cư cho thuê</option>
                    <option>Chung cư bán</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Quận / Huyện</label>
                  <select className="w-full p-2.5 border border-slate-300">
                    <option>Nam Từ Liêm</option>
                    <option>Cầu Giấy</option>
                    <option>Thanh Xuân</option>
                    <option>Bắc Từ Liêm</option>
                    <option>Tây Hồ</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Mức giá (VNĐ)</label>
                  <input type="text" placeholder="Ví dụ: 9,000,000 đ/tháng" required className="w-full p-2.5 border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Diện tích (m²)</label>
                  <input type="text" placeholder="Ví dụ: 54m²" required className="w-full p-2.5 border border-slate-300" />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Số điện thoại liên hệ (*)</label>
                <input type="tel" placeholder="0919 006 030..." required className="w-full p-2.5 border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold mb-1">Mô tả chi tiết</label>
                <textarea rows={4} placeholder="Mô tả nội thất, tiện ích, vị trí..." required className="w-full p-2.5 border border-slate-300" />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase">
                XÁC NHẬN ĐĂNG TIN NGAY
              </button>
            </form>
          )}
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: GIỚI THIỆU (ABOUT)
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'about' || currentPage === 'gioi-thieu') && (
        <main className="max-w-[1200px] mx-auto px-4 py-10 space-y-8 flex-1 w-full">
          <div className="bg-white p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-[#0066B2] uppercase tracking-widest block mb-1">VỀ CHÚNG TÔI</span>
              <h1 className="text-2xl font-black text-slate-900 uppercase">Cổng Thông Tin Cho Thuê & Mua Bán Chung Cư Hà Nội</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-xs leading-relaxed text-slate-600">
                <p>
                  <strong>ChoThueChungCuHaNoi.com</strong> là kênh thông tin chuyên sâu hàng đầu tại thủ đô, kết nối trực tiếp chủ nhà cho thuê và khách hàng tìm thuê chung cư từ trung cấp đến cao cấp.
                </p>
                <p>
                  Với dữ liệu cập nhật theo thời gian thực tại các quận trọng điểm như Nam Từ Liêm, Cầu Giấy, Thanh Xuân, Tây Hồ, Bắc Từ Liêm, chúng tôi giúp khách hàng nhanh chóng tìm được căn hộ phù hợp với mức giá tốt nhất.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded">
                    <strong className="text-lg font-black text-[#0066B2] block">12.000+</strong>
                    <span className="text-[10px] text-slate-500">Căn hộ cho thuê</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded">
                    <strong className="text-lg font-black text-emerald-700 block">100%</strong>
                    <span className="text-[10px] text-slate-500">Xác thực chính chủ</span>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded">
                    <strong className="text-lg font-black text-amber-700 block">24/7</strong>
                    <span className="text-[10px] text-slate-500">Hỗ trợ dẫn xem phòng</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="Chung cư Hà Nội" className="w-full h-56 object-cover border border-slate-200 shadow-sm" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button onClick={() => navigate('home')} className="text-xs font-bold text-[#0066B2] hover:underline">
                ← Quay lại trang chủ
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE: LIÊN HỆ & TƯ VẤN (CONTACT)
      ───────────────────────────────────────────────────────────── */}
      {(currentPage === 'contact' || currentPage === 'lien-he') && (
        <main className="max-w-[1200px] mx-auto px-4 py-10 space-y-8 flex-1 w-full">
          <div className="bg-white p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-xl font-black text-slate-900 uppercase">Liên Hệ & Ký Gửi Cho Thuê</h2>
              <p className="text-xs text-slate-600">Bạn là chủ nhà cần gửi cho thuê hoặc người thuê cần tìm căn hộ gấp? Hãy để lại thông tin bên dưới:</p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong ít phút.'); navigate('home'); }} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Họ tên của bạn</label>
                  <input type="text" required placeholder="Họ tên..." className="w-full p-2.5 border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Số điện thoại liên hệ (*)</label>
                  <input type="tel" required placeholder="0919 006 030..." className="w-full p-2.5 border border-slate-300" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Nhu cầu cụ thể</label>
                  <textarea rows={3} placeholder="Cần thuê chung cư 2PN Cầu Giấy, ngân sách 10 triệu..." className="w-full p-2.5 border border-slate-300" />
                </div>
                <button type="submit" className="w-full py-3 bg-[#0066B2] hover:bg-[#00528e] text-white font-black text-xs uppercase">
                  GỬI YÊU CẦU NGAY
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Văn Phòng Điều Hành Hà Nội</h3>
              <p className="text-xs text-slate-600">📍 Địa chỉ: <strong>72 Lê Lợi, P. Lộc Thanh, TP. Bảo Lộc & Chi nhánh Hà Nội</strong></p>
              <p className="text-xs text-slate-600">📞 Hotline 24/7: <strong>0919 006 030</strong></p>
              <p className="text-xs text-slate-600">✉️ Email: <strong>hotro@chothuechungcuhanoi.com</strong></p>
              <div className="h-52 border border-slate-200 overflow-hidden">
                <iframe
                  title="Bản đồ Hà Nội"
                  src="https://maps.google.com/maps?q=Nam+T%E1%BB%AB+Li%C3%AAm,+H%C3%A0+N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 7. FOOTER */}
      <footer className="bg-[#0B3A60] text-slate-300 text-xs mt-auto">
        <div className="max-w-[1360px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">THÔNG TIN LIÊN HỆ</h4>
            <p className="font-bold text-white mb-2">CHO THUÊ CHUNG CƯ</p>
            <p className="mb-1">📍 72 Lê Lợi Xã Lộc Thanh Tp Bảo Lộc</p>
            <p className="mb-1">📞 0919 006 030</p>
            <p className="mb-1">✉️ info@web.com.vn</p>
            <p>🌐 www.web.com.vn</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">DỰ ÁN KHU VỰC HÀ NỘI</h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>• Quận Bắc Từ Liêm</li>
              <li>• Quận Cầu Giấy</li>
              <li>• Quận Nam Từ Liêm</li>
              <li>• Quận Tây Hồ</li>
              <li>• Quận Thanh Xuân</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">MAPS</h4>
            <div className="aspect-[16/11] w-full overflow-hidden border border-slate-700 bg-slate-800">
              <iframe
                title="Bản đồ chân trang"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097652787889!2d105.7701460759695!3d21.028778787777134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3260b1a8b%3A0x64e83ff9d5e305e9!2zTeG7uSDEkMOsbmggMiwgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase mb-3 tracking-wider">ĐĂNG KÝ NHẬN BÁO GIÁ</h4>
            {quoteSubmitted ? (
              <div className="p-3 bg-blue-900/60 border border-blue-400 text-white text-xs">
                ✓ Đã gửi thông tin! Chúng tôi sẽ liên hệ trong 15 phút.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setQuoteSubmitted(true); }} className="space-y-2 text-xs">
                <input type="text" placeholder="Họ và tên..." required className="w-full p-2 bg-[#082E4D] border border-blue-900 text-white placeholder-slate-400 focus:outline-none" />
                <input type="tel" placeholder="Số điện thoại..." required className="w-full p-2 bg-[#082E4D] border border-blue-900 text-white placeholder-slate-400 focus:outline-none" />
                <input type="email" placeholder="Email..." className="w-full p-2 bg-[#082E4D] border border-blue-900 text-white placeholder-slate-400 focus:outline-none" />
                <input type="text" placeholder="Thông tin..." className="w-full p-2 bg-[#082E4D] border border-blue-900 text-white placeholder-slate-400 focus:outline-none" />
                <button type="submit" className="w-full py-2 bg-[#0066B2] hover:bg-blue-600 text-white font-bold uppercase transition-colors">
                  ĐĂNG KÝ
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-[#082E4D] py-3 text-center text-slate-400 text-[11px]">
          Copyright 2026 © . All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default HanoiRentalPortalTemplate;
