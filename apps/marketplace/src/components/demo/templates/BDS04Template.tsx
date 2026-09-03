import { PropertyImageGallery } from '../PropertyImageGallery';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, ChevronRight, ChevronLeft, MapPin, Phone, Mail, 
  Building2, Home, Layers, Calendar, User, Eye, CheckCircle2, 
  ArrowRight, UploadCloud, Compass, DollarSign, Calculator, Share2, Heart,
  Shield, Check, MessageSquare, Star, Sparkles, Send, Award, FileText,
  Wifi, Cpu, Smartphone, Key, Car, Coffee, Tv, Droplets, Sun, Activity,
  Maximize2, Bed, Bath, Download, Play
} from 'lucide-react';
import { MAX_W } from '../design-system';
import UniversalTemplateFooter from '../UniversalTemplateFooter';

interface TemplateProps {
  template: { name: string; slug: string; collectionSlug?: string; sectionConfig?: Record<string, unknown> };
  viewport?: 'desktop' | 'tablet' | 'mobile';
  initialPage?: string;
  company?: {
    name?: string;
    slogan?: string;
    phone?: string;
    email?: string;
    address?: string;
    logo?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
      tiktok?: string;
      zalo?: string;
    };
    footerColumns?: Array<{
      title: string;
      links: Array<{ label: string; url?: string; page?: string }>;
    }>;
  };
  theme?: Record<string, string>;
  projects?: Array<Record<string, unknown>>;
  posts?: Array<Record<string, unknown>>;
}

export interface UnitItem {
  gallery?: string[];
  images?: string[];
  id: number;
  title: string;
  slug: string;
  type: string;
  price: string;
  priceNum: number; // in billions
  area: string;
  areaNum: number;
  tower: string;
  floor: string;
  bedrooms: number;
  bathrooms: number;
  view: string;
  badge: string;
  image: string;
  specs: string[];
  desc: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image: string;
  desc: string;
  content: string[];
  views: number;
}

const BDS04_UNITS: UnitItem[] = [
  {
    id: 1,
    title: 'Căn Hộ 2 Phòng Ngủ SmartHome View Trọn Sông Cả Cấm & Phú Mỹ Hưng',
    slug: 'can-ho-2pn-smarthome-view-song-phu-my-hung',
    type: 'Căn hộ 2 Phòng Ngủ',
    price: '4.85 Tỷ VNĐ',
    priceNum: 4.85,
    area: '72.5 m²',
    areaNum: 72.5,
    tower: 'Tòa S1 - Diamond',
    floor: 'Tầng 18',
    bedrooms: 2,
    bathrooms: 2,
    view: 'View Sông Cả Cấm & Công viên ven sông',
    badge: 'Mạ Vàng 24K',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80'
    ],
    specs: [
      'Thiết bị vệ sinh mạ vàng Kohler',
      'Hệ thống kính Low-E 3 lớp chạm sàn',
      'Công nghệ SmartHome điều khiển bằng giọng nói',
      'Khóa cửa nhận diện FaceID thông minh'
    ],
    desc: 'Căn hộ 2 phòng ngủ thiết kế sang trọng, tối ưu ánh sáng tự nhiên với ban công kính tràn viền. Tích hợp trọn bộ hệ thống nhà thông minh 4.0 hiện đại bậc nhất.'
  },
  {
    id: 2,
    title: 'Căn Hộ 3 Phòng Ngủ Panorama Góc 2 Mặt Thoáng Đỉnh Cao',
    slug: 'can-ho-3pn-panorama-goc-2-mat-thoang',
    type: 'Căn hộ 3 Phòng Ngủ',
    price: '7.2 Tỷ VNĐ',
    priceNum: 7.2,
    area: '108 m²',
    areaNum: 108,
    tower: 'Tòa S2 - Sapphire',
    floor: 'Tầng 25',
    bedrooms: 3,
    bathrooms: 2,
    view: 'View Panorama Sông Sài Gòn & Bitexco Q1',
    badge: 'Căn Góc VIP',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Bếp đảo sang trọng mặt đá Thạch Anh',
      'Hệ thống máy lạnh âm trần Daikin VRV',
      'Sàn gỗ công nghiệp cao cấp nhập khẩu Đức',
      'Chuông hình kỹ thuật số liên lạc sảnh lễ tân'
    ],
    desc: 'Căn góc 3 phòng ngủ sở hữu tầm nhìn panorama 270 độ triệu đô. Không gian phòng khách rộng mở kết nối phòng ăn lý tưởng cho các gia đình thượng lưu.'
  },
  {
    id: 3,
    title: 'Sky Villa Penthouse Thông Tầng Dát Vàng Đẳng Cấp Thượng Lưu',
    slug: 'sky-villa-penthouse-thong-tang-dat-vang',
    type: 'Sky Villa / Penthouse',
    price: '21.5 Tỷ VNĐ',
    priceNum: 21.5,
    area: '265 m²',
    areaNum: 265,
    tower: 'Tòa S3 - Crown',
    floor: 'Tầng 36-37',
    bedrooms: 4,
    bathrooms: 5,
    view: 'View 360 Độ Toàn Cảnh Sài Gòn',
    badge: 'Độc Bản Giới Hạn',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Hồ bơi chân mây riêng tại ban công',
      'Thang máy riêng bảo mật 2 lớp bằng FaceID',
      'Nội thất đặt hàng riêng từ thương hiệu Versace Home',
      'Hệ thống lọc nước tại vòi chuẩn khoáng chất tự nhiên'
    ],
    desc: 'Kiệt tác Sky Villa thông tầng đỉnh cao với trần cao 6.5m, hồ bơi riêng trên không và sân vườn Babylon thu nhỏ giữa lưng chừng trời.'
  },
  {
    id: 4,
    title: 'Căn Hộ 1 Phòng Ngủ Studio SmartHome Dành Cho Chuyên Gia',
    slug: 'can-ho-1pn-studio-smarthome-chuyen-gia',
    type: 'Căn hộ 1 Phòng Ngủ',
    price: '3.35 Tỷ VNĐ',
    priceNum: 3.35,
    area: '52 m²',
    areaNum: 52,
    tower: 'Tòa S1 - Diamond',
    floor: 'Tầng 12',
    bedrooms: 1,
    bathrooms: 1,
    view: 'View Hồ bơi vô cực & Vườn nhiệt đới',
    badge: 'Dễ Cho Thuê',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'
    ],
    specs: [
      'Full nội thất SmartHome liền tường cao cấp',
      'Hệ thống rèm tự động đóng mở theo ánh sáng mặt trời',
      'Tủ lạnh và lò nướng âm Bosch',
      'Quản lý căn hộ qua App di động'
    ],
    desc: 'Thiết kế thông minh tối ưu diện tích, lý tưởng cho chuyên gia nước ngoài và gia đình trẻ thành đạt, tỷ suất cho thuê đạt 8.5%/năm.'
  }
];

const BDS04_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Lễ Ký Kết Hợp Tác Chiến Lược Cùng Đơn Vị Vận Hành Quốc Tế Chuẩn 5 Sao',
    slug: 'le-ky-ket-hop-tac-chien-luoc-van-hanh-quoc-te',
    date: '28/08/2026',
    author: 'Ban Truyền Thông Sunshine City',
    category: 'Sự Kiện & Hợp Tác',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    desc: 'Khẳng định đẳng cấp quốc tế với dịch vụ quản lý tòa nhà và đặc quyền Concierge 24/7 theo tiêu chuẩn khách sạn 5 sao...',
    content: [
      'Chủ đầu tư chính thức ký kết thỏa thuận hợp tác quản lý vận hành tòa nhà cùng tập đoàn dịch vụ bất động sản hàng đầu thế giới.',
      'Cư dân tương lai sẽ được tận hưởng hệ thống dịch vụ đặc quyền từ xe đưa đón hạng sang, quản gia riêng, dịch vụ chăm sóc thú cưng đến đặt vé máy bay và du thuyền VIP.',
      'Sự hợp tác này nâng tầm giá trị sống và đảm bảo thanh khoản bền vững cho các chủ nhân sở hữu căn hộ.'
    ],
    views: 4890
  },
  {
    id: 2,
    title: 'Khai Trương Căn Hộ Mẫu Sky Villa Dát Vàng Đón Hơn 1,000 Khách Tham Quan',
    slug: 'khai-truong-can-ho-mau-sky-villa-dat-vang',
    date: '26/08/2026',
    author: 'Ban Kinh Doanh',
    category: 'Trải Nghiệm Căn Hộ',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    desc: 'Khách hàng trực tiếp trải nghiệm hệ sinh thái 4.0 và chiêm ngưỡng nội thất mạ vàng xa hoa ngay tại khuôn viên dự án...',
    content: [
      'Khu nhà mẫu Sunshine City Saigon đã chính thức mở cửa đón khách hàng VIP với sự xuất hiện của các căn hộ mẫu từ 2PN đến Sky Villa Penthouse.',
      'Điểm nhấn ấn tượng là hệ thống điều khiển SmartHome phản hồi giọng nói bằng tiếng Việt và kính Low-E cản nhiệt cách âm hoàn hảo.',
      'Nhiều khách hàng đã quyết định đặt cọc giữ chỗ ngay trong ngày đầu khai trương để chọn được những tầng đẹp view sông.'
    ],
    views: 6120
  },
  {
    id: 3,
    title: 'Tiến Độ Xây Dựng Thực Tế: Thi Công Đồng Loạt 9 Tòa Tháp Vượt Kế Hoạch',
    slug: 'tien-do-xay-dung-thuc-te-9-toa-thap',
    date: '24/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiến Độ Thi Công',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    desc: 'Hàng trăm kỹ sư và công nhân đang ngày đêm thi công hoàn thiện mặt ngoài kính Low-E dát vàng và hệ thống tiện ích nội khu...',
    content: [
      'Giai đoạn 1 của dự án đã cất nóc thành công các tòa S1, S2 và đang tiến hành lắp đặt hệ thống cơ điện thông minh.',
      'Hồ bơi vô cực trên tầng thượng và công viên cảnh quan ven sông Cả Cấm cũng đang được hoàn thiện cảnh quan xanh.',
      'Chủ đầu tư cam kết bàn giao nhà đúng tiến độ vào Quý 4/2026 cùng sổ hồng trao tay cho cư dân.'
    ],
    views: 5430
  }
];

export const resolvePageAndDetail = (p?: string) => {
  if (!p || p === 'home') return { page: 'home', propSlug: '', artSlug: '' };
  const clean = p.replace(/^\//, '').trim();
  if (clean.startsWith('tin-tuc/') || clean.startsWith('news/')) {
    return { page: 'news-detail', propSlug: '', artSlug: clean.replace(/^(tin-tuc\/|news\/)/, '') };
  }
  if (clean === 'tin-tuc' || clean === 'news') return { page: 'news', propSlug: '', artSlug: '' };
  if (clean.startsWith('chi-tiet/') || clean.startsWith('can-ho/')) {
    return { page: 'property-detail', propSlug: clean.replace(/^(chi-tiet\/|can-ho\/)/, ''), artSlug: '' };
  }
  if (clean === 'gioi-thieu' || clean === 'about') return { page: 'about', propSlug: '', artSlug: '' };
  if (clean === 'lien-he' || clean === 'contact') return { page: 'contact', propSlug: '', artSlug: '' };
  if (['can-ho', 'vi-tri', 'cong-nghe', 'tien-ich', 'mat-bang'].includes(clean)) {
    return { page: clean, propSlug: '', artSlug: '' };
  }
  return { page: 'home', propSlug: '', artSlug: '' };
};

export default function BDS04Template({ template, viewport = 'desktop', initialPage = 'home', company, theme, projects, posts }: TemplateProps) {
  const primaryColor = theme?.primaryColor;
  const secondaryColor = theme?.secondaryColor;
  const accentColor = theme?.accentColor;

  const isSmall = viewport === 'mobile' || viewport === 'tablet';
  const initialParsed = useMemo(() => resolvePageAndDetail(initialPage), [initialPage]);

  const activeUnits = useMemo<UnitItem[]>(() => {
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const customProps = projects.map((p: any, idx: number): UnitItem => ({
        id: p.id || idx + 1,
        title: p.title || p.name || 'Căn hộ Smart Home cao cấp',
        slug: p.slug || `can-ho-${idx + 1}`,
        type: p.type || 'Căn Hộ',
        price: p.price || (p.priceFrom ? `Từ ${p.priceFrom} Tỷ` : 'Liên hệ'),
        priceNum: typeof p.priceNum === 'number' ? p.priceNum : (parseFloat(p.price) || 4.2),
        area: typeof p.area === 'number' ? `${p.area} m²` : (p.area || '78 m²'),
        areaNum: typeof p.area === 'number' ? p.area : 78,
        tower: p.tower || 'Tòa Landmark',
        floor: p.floor || 'Tầng 18',
        bedrooms: p.bedrooms || 2,
        bathrooms: p.bathrooms || 2,
        view: p.view || 'View Công Viên & Hồ Cảnh Quan',
        badge: p.badge || (idx === 0 ? 'MỞ BÁN' : 'HOT'),
        image: p.thumbnail || p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        specs: Array.isArray(p.specs) ? p.specs : ['Smart Home toàn diện', 'Khóa vân tay FaceID', 'Điều hòa âm trần'],
        desc: p.description || p.desc || 'Trải nghiệm phong cách sống công nghệ thông minh đỉnh cao.',
      }));
      const customSlugs = new Set(customProps.map((cp: any) => cp.slug));
      const remainingDefaults = (BDS04_UNITS).filter((dp: any) => !customSlugs.has(dp.slug));
      return [...customProps, ...remainingDefaults];
    }
    return BDS04_UNITS;
  }, [projects]);

  const activeNews = useMemo<NewsItem[]>(() => {
    if (posts && Array.isArray(posts) && posts.length > 0) {
      const customNews = posts.map((p: any, idx: number): NewsItem => ({
        id: p.id || idx + 1,
        title: p.title || 'Tin tức dự án',
        slug: p.slug || `tin-tuc-${idx + 1}`,
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('vi-VN') : 'Hôm nay',
        author: p.author || company?.name || 'Ban Quản Trị',
        category: p.category || 'Tin Tức',
        image: p.thumbnail || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        desc: p.summary || p.excerpt || 'Cập nhật tin tức dự án mới nhất.',
        content: Array.isArray(p.content) ? p.content : [p.content || p.summary || ''],
        views: p.views || 1200,
      }));
      const customSlugs = new Set(customNews.map((cn: any) => cn.slug));
      const remainingDefaults = (BDS04_NEWS).filter((dn: any) => !customSlugs.has(dn.slug));
      return [...customNews, ...remainingDefaults];
    }
    return BDS04_NEWS;
  }, [posts, company]);


  const [currentPage, setCurrentPageState] = useState<string>(() => initialParsed.page);
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(() => {
    if (initialParsed.propSlug) {
      const found = activeUnits.find(u => u.slug === initialParsed.propSlug);
      if (found) return found;
    }
    return activeUnits[0] || BDS04_UNITS[0];
  });
  const [selectedArticle, setSelectedArticle] = useState<NewsItem>(() => {
    if (initialParsed.artSlug) {
      const found = BDS04_NEWS.find(a => a.slug === initialParsed.artSlug);
      if (found) return found;
    }
    return (activeNews[0] || BDS04_NEWS[0]);
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  // VIP Registration Form
  const [vipForm, setVipForm] = useState({ name: '', phone: '', email: '', unitType: 'Căn hộ 2 Phòng Ngủ', note: '' });

  useEffect(() => {
    const res = resolvePageAndDetail(initialPage);
    setCurrentPageState(res.page);
    if (res.propSlug) {
      const found = activeUnits.find(u => u.slug === res.propSlug);
      if (found) setSelectedUnit(found);
    }
    if (res.artSlug) {
      const found = BDS04_NEWS.find(a => a.slug === res.artSlug);
      if (found) setSelectedArticle(found);
    }
  }, [initialPage]);

  const navigate = (page: string, slug?: string) => {
    setCurrentPageState(page);
    setMobileMenuOpen(false);
    setActiveGalleryIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlSlug = '';
    if (page === 'home') urlSlug = '';
    else if (page === 'news-detail' && slug) urlSlug = `tin-tuc/${slug}`;
    else if (page === 'property-detail' && slug) urlSlug = `chi-tiet/${slug}`;
    else if (page === 'news') urlSlug = 'tin-tuc';
    else if (page === 'about') urlSlug = 'gioi-thieu';
    else if (page === 'contact') urlSlug = 'lien-he';
    else urlSlug = page;

    const tSlug = template?.slug || 'bds-04';
    const finalUrl = urlSlug ? `/demo/${tSlug}/${urlSlug}` : `/demo/${tSlug}`;
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/demo/')) {
      window.history.pushState(null, '', finalUrl + window.location.search);
    }
  };

  const handleOpenUnit = (unit: UnitItem) => {
    setSelectedUnit(unit);
    navigate('property-detail', unit.slug);
  };

  const handleOpenArticle = (art: NewsItem) => {
    setSelectedArticle(art);
    navigate('news-detail', art.slug);
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipForm.phone || !vipForm.name) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    alert(`🎉 Đăng ký thành công!\nChuyên viên tư vấn VIP của dự án Sunshine City Saigon sẽ liên hệ với quý khách ${vipForm.name} (${vipForm.phone}) để gửi vé mời tham quan căn hộ mẫu và bảng giá gốc.`);
    setVipForm({ name: '', phone: '', email: '', unitType: 'Căn hộ 2 Phòng Ngủ', note: '' });
  };

  const activeHotline = company?.phone || '0919 006 030';
  const hotlineTel = activeHotline.replace(/[^0-9]/g, '') || '0919006030';
  const activeEmail = company?.email || 'ntrungz0704@gmail.com';

  // ── HEADER ──
  const renderHeader = () => (
    <header className="w-full bg-[#07132B]/95 backdrop-blur-md text-white sticky top-0 z-40 border-b border-[#C5A059]/30 shadow-lg">
      <div className={`${MAX_W} mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4`}>
        {/* Brand Logo with Gold Emblem */}
        <div onClick={() => navigate('home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] flex items-center justify-center text-[#07132B] font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition shrink-0">
            TB
          </div>
          <div className="min-w-0 truncate">
            <div className="text-base sm:text-lg font-black tracking-widest text-[#E6CA65] uppercase leading-none font-serif group-hover:text-white transition truncate">
              {company?.name || 'TEMPLATESBDS'}
            </div>
            <div className="text-[7.5px] sm:text-[9px] text-[#C5A059] font-bold tracking-widest uppercase mt-0.5 truncate">
              {company?.slogan || 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam'}
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          {[
            { id: 'home', label: 'Tổng Quan' },
            { id: 'vi-tri', label: 'Vị Trí' },
            { id: 'cong-nghe', label: 'Công Nghệ' },
            { id: 'tien-ich', label: 'Tiện Ích' },
            { id: 'can-ho', label: 'Mặt Bằng Căn Hộ' },
            { id: 'news', label: 'Tin Tức' },
            { id: 'contact', label: 'Liên Hệ' },
          ].map(navItem => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A059] text-[#07132B] font-black shadow-md'
                    : 'text-slate-200 hover:text-[#E6CA65] hover:bg-white/5'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('contact')}
            className="px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            Đăng Ký Tham Quan
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 sm:p-2 text-[#E6CA65] hover:bg-white/10 rounded-md cursor-pointer ml-auto shrink-0 flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07132B] border-t border-[#C5A059]/30 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-200 shadow-2xl">
          {[
            { id: 'home', label: 'Tổng Quan' },
            { id: 'vi-tri', label: 'Vị Trí Kim Cương' },
            { id: 'cong-nghe', label: 'Công Nghệ 4.0' },
            { id: 'tien-ich', label: 'Tiện Ích Đặc Quyền' },
            { id: 'can-ho', label: 'Mặt Bằng Căn Hộ' },
            { id: 'news', label: 'Tin Tức' },
            { id: 'contact', label: 'Liên Hệ' },
          ].map(navItem => {
            const isActive = currentPage === navItem.id || (navItem.id === 'news' && currentPage === 'news-detail');
            return (
              <button
                key={navItem.id}
                onClick={() => navigate(navItem.id)}
                className={`block w-full text-left py-2.5 px-3 rounded cursor-pointer ${
                  isActive ? 'bg-[#C5A059] text-[#07132B] font-black' : 'hover:bg-white/10'
                }`}
              >
                {navItem.label}
              </button>
            );
          })}
          <a
            href={`tel:${hotlineTel}`}
            className="block w-full text-center py-2.5 px-3 bg-[#C5A059] text-[#07132B] font-black rounded-lg mt-2 cursor-pointer"
          >
            📞 HOTLINE: {activeHotline}
          </a>
        </div>
      )}
    </header>
  );

  // ── HERO PANORAMIC BANNER ──
  const renderHeroBanner = () => (
    <div
      className="relative min-h-[550px] sm:min-h-[650px] flex items-center justify-center px-4 bg-cover bg-center text-white text-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(7, 19, 43, 0.4), rgba(7, 19, 43, 0.85)), url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80)'
      }}
    >
      <div className={`${MAX_W} mx-auto max-w-4xl space-y-6 pt-12`}>
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-sm bg-[#C5A059]/20 text-[#E6CA65] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
          <Sparkles size={14} /> TỔ HỢP CĂN HỘ THÔNG MINH BÊN SÔNG SÀI GÒN
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-white font-serif leading-tight drop-shadow-lg">
          SUNSHINE CITY SAIGON
        </h1>
        <p className="text-sm sm:text-lg text-slate-200 font-light tracking-wide max-w-2xl mx-auto">
          Nghệ thuật sống thượng lưu ven sông — Kiến trúc mạ vàng xa hoa hòa quyện cùng công nghệ 4.0 đỉnh cao.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('can-ho')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Khám Phá Căn Hộ Mẫu ›
          </button>
          <button
            onClick={() => navigate('contact')}
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-sm backdrop-blur-md transition cursor-pointer"
          >
            Tải Bảng Giá & CSBH
          </button>
        </div>
      </div>
    </div>
  );

  // ── HOMEPAGE RENDERER ──
  const renderHomePage = () => (
    <div className="bg-[#07132B] text-slate-100 space-y-20 pb-20">
      {renderHeroBanner()}

      {/* 1. TỔNG QUAN DỰ ÁN (WARM GOLD OCHRE SECTION) */}
      <section className="bg-gradient-to-b from-[#C5A059] to-[#A67C1E] text-slate-900 py-16 px-4 shadow-xl">
        <div className={`${MAX_W} mx-auto space-y-10`}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider font-serif">
              Tổng Quan Dự Án Sunshine City Saigon
            </h2>
            <div className="w-16 h-1 bg-slate-900 mx-auto rounded-sm" />
            <p className="text-xs sm:text-sm font-semibold max-w-xl mx-auto text-slate-900/80">
              Biểu tượng kiến trúc tương lai ven sông Cả Cấm tại trung tâm Nam Sài Gòn
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80"
                alt="Sunshine City Saigon Overview"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm font-medium">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-sm space-y-2 border border-white/30">
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="font-bold">Chủ đầu tư:</span>
                  <span>Tập đoàn Sunshine Group / PlatformBDS</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="font-bold">Vị trí:</span>
                  <span>Đường Phú Thuận, Phường Tân Phú, Quận 7, TP.HCM</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="font-bold">Quy mô:</span>
                  <span>9 Tòa tháp cao 36 - 38 tầng (3,748 căn hộ & Sky Villas)</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="font-bold">Mật độ xây dựng:</span>
                  <span>Chỉ 29.5% (Hơn 70% dành cho cây xanh & mặt nước)</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="font-bold">Pháp lý:</span>
                  <span>Sổ hồng sở hữu lâu dài</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Thời gian bàn giao:</span>
                  <span>Quý 4/2026</span>
                </div>
              </div>

              <p className="leading-relaxed text-slate-900/90 italic">
                &ldquo;Sunshine City Saigon mang đến một chuẩn mực sống thượng lưu mới, nơi sự xa hoa của nội thất mạ vàng hòa quyện hoàn hảo cùng những giải pháp công nghệ thông minh 4.0 tối tân nhất.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VỊ TRÍ KIM CƯƠNG & BẢN ĐỒ LIÊN KẾT VÙNG */}
      <section className={`${MAX_W} mx-auto px-4 space-y-12`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TÂM ĐIỂM NAM SÀI GÒN</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
            Vị Trí Kim Cương Ven Sông
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Tọa lạc tại vị trí độc tôn ven sông Cả Cấm, dự án Sunshine City Saigon liền kề Khu đô thị kiểu mẫu Phú Mỹ Hưng, thừa hưởng trọn vẹn hạ tầng giao thông và tiện ích quốc tế cao cấp nhất khu Nam.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                <span className="text-[#E6CA65] font-black text-base block font-serif">3 PHÚT</span>
                <span className="text-slate-400 text-xs">Crescent Mall & Hồ Bán Nguyệt</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                <span className="text-[#E6CA65] font-black text-base block font-serif">5 PHÚT</span>
                <span className="text-slate-400 text-xs">Bệnh viện Quốc tế FV & Tâm Đức</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                <span className="text-[#E6CA65] font-black text-base block font-serif">7 PHÚT</span>
                <span className="text-slate-400 text-xs">Đại học RMIT & Trường Quốc Tế SSIS</span>
              </div>
              <div className="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                <span className="text-[#E6CA65] font-black text-base block font-serif">10 PHÚT</span>
                <span className="text-slate-400 text-xs">Chợ Bến Thành & Quận 1</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border border-[#C5A059]/40 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
              alt="Bản đồ vị trí kết nối vùng"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CÔNG NGHỆ 4.0 & SMARTHOME THÔNG MINH */}
      <section className="relative py-20 px-4 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(7, 19, 43, 0.85), rgba(7, 19, 43, 0.95)), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80)' }}>
        <div className={`${MAX_W} mx-auto space-y-12`}>
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TIÊN PHONG CÔNG NGHỆ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
              Ứng Dụng Công Nghệ 4.0 Đỉnh Cao
            </h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'FaceID Nhận Diện', icon: Key, desc: 'Hệ thống kiểm soát an ninh nhận diện khuôn mặt tự động mở cửa sảnh và gọi thang máy đón cư dân.' },
              { title: 'SmartHome Bằng Giọng Nói', icon: Cpu, desc: 'Điều khiển toàn bộ ánh sáng, điều hòa, rèm cửa và âm thanh chỉ bằng một câu lệnh tiếng Việt.' },
              { title: 'Bãi Đỗ Xe Thông Minh', icon: Car, desc: 'Hệ thống tự động tìm và dẫn đường đến chỗ đỗ xe còn trống, ghi nhớ vị trí xe qua ứng dụng điện thoại.' },
              { title: 'Ứng Dụng Cư Dân All-In-One', icon: Smartphone, desc: 'Thanh toán hóa đơn, đặt lịch tiện ích, gọi xe sang và yêu cầu dịch vụ dọn phòng 24/7 chỉ với 1 chạm.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3 hover:border-[#E6CA65] hover:bg-white/10 transition group">
                  <div className="w-12 h-12 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] text-[#07132B] flex items-center justify-center font-black group-hover:scale-110 transition">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-black text-base text-[#E6CA65] font-serif">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed break-words">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TIỆN ÍCH ĐẶC QUYỀN (GOLD OCHRE SECTION) */}
      <section className="bg-gradient-to-b from-[#C5A059] to-[#A67C1E] text-slate-900 py-16 px-4 shadow-xl">
        <div className={`${MAX_W} mx-auto space-y-10`}>
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider font-serif">
              Hệ Thống Tiện Ích Đặc Quyền Chuẩn Resort 5 Sao
            </h2>
            <div className="w-16 h-1 bg-slate-900 mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3 text-xs sm:text-sm font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Hồ bơi chân mây vô cực trên tầng thượng',
                  'Sky Bar & Cigar Lounge thượng lưu',
                  'Trung tâm Spa & Onsen khoáng nóng',
                  'Phòng tập Gym & Yoga Technogym',
                  'Đường dạo bộ chân mây Sky Walk',
                  'Rạp chiếu phim 4D gia đình',
                  'Vườn nướng BBQ ven sông thơ mộng',
                  'Trung tâm thương mại & Shophouse cao cấp',
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30">
                    <CheckCircle2 size={16} className="text-slate-950 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80"
                alt="Spa & Onsen thư giãn 5 sao"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CÁC LOẠI HÌNH CĂN HỘ NỔI BẬT */}
      <section className={`${MAX_W} mx-auto px-4 space-y-10`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">MẶT BẰNG & THIẾT KẾ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
            Tuyệt Tác Căn Hộ & Sky Villa Dát Vàng
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeUnits.map(unit => (
            <div
              key={unit.id}
              onClick={() => handleOpenUnit(unit)}
              className="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-slate-900">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-0.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-[10px] rounded-sm shadow">
                    {unit.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/80 backdrop-blur-xs text-white font-bold text-[10px] rounded">
                    {unit.type}
                  </span>
                </div>

                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug font-serif">
                    {unit.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Giá bán</span>
                      <span className="font-black text-[#E6CA65] text-sm">{unit.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Diện tích</span>
                      <span className="font-bold text-slate-200">{unit.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>{unit.bedrooms} PN • {unit.bathrooms} WC</span>
                <span className="text-[#E6CA65] font-bold group-hover:translate-x-0.5 transition">Chi tiết ›</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TIN TỨC & SỰ KIỆN */}
      <section className={`${MAX_W} mx-auto px-4 space-y-10`}>
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TIN TỨC DỰ ÁN</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
            Tin Tức & Tiến Độ Mới Nhất
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeNews.map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden bg-slate-900">
                <img
                  src={art.image}
                  alt={art.title}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#E6CA65] uppercase tracking-wider">{art.category}</span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug mt-1 font-serif">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">{art.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{art.date}</span>
                  <span className="text-[#E6CA65] font-bold">Xem chi tiết ›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. QUICK ACTION BAR (GOLD STRIP) */}
      <section className="bg-gradient-to-r from-[#C5A059] via-[#E6CA65] to-[#C5A059] py-8 text-[#07132B]">
        <div className={`${MAX_W} mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-black text-xs uppercase tracking-wider`}>
          <div onClick={() => navigate('contact')} className="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5">
            <Download size={22} />
            <span>TẢI BROCHURE & BẢNG GIÁ</span>
          </div>
          <div onClick={() => navigate('contact')} className="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5">
            <Calendar size={22} />
            <span>ĐĂNG KÝ XEM NHÀ MẪU</span>
          </div>
          <div onClick={() => navigate('can-ho')} className="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5">
            <Calculator size={22} />
            <span>TÍNH LÃI SUẤT VAY ƯU ĐÃI</span>
          </div>
          <a href={`tel:${hotlineTel}`} className="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5">
            <Phone size={22} />
            <span>HOTLINE TƯ VẤN 24/7</span>
          </a>
        </div>
      </section>

      {/* 8. FORM ĐĂNG KÝ VIP & LIÊN HỆ */}
      <section className={`${MAX_W} mx-auto px-4`}>
        <div className="bg-gradient-to-br from-[#0B1B3D] to-[#07132B] border border-[#C5A059]/40 rounded-md p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">ĐẶC QUYỀN DÀNH CHO KHÁCH HÀNG VIP</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-serif uppercase">
              Đăng Ký Nhận Bảng Giá Gốc & Vé Mời Tham Quan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Chiết khấu thanh toán sớm lên đến 12%, hỗ trợ lãi suất 0% trong 24 tháng và tặng gói nội thất thông minh 200 triệu đồng.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E6CA65]" /> Hotline: <strong className="text-white">{activeHotline}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#E6CA65]" /> Email: <strong className="text-white">{activeEmail}</strong>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E6CA65]" /> Nhà mẫu: <strong className="text-white">Đường Phú Thuận, Phường Tân Phú, Quận 7, TP.HCM</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleVipSubmit} className="lg:col-span-6 bg-white/5 border border-[#C5A059]/30 p-6 sm:p-8 rounded-sm backdrop-blur-md space-y-3 text-xs">
            <input
              type="text"
              placeholder="Họ và tên của bạn (*)..."
              value={vipForm.name}
              onChange={e => setVipForm({ ...vipForm, name: e.target.value })}
              required
              className="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]"
            />
            <input
              type="tel"
              placeholder="Số điện thoại (*)..."
              value={vipForm.phone}
              onChange={e => setVipForm({ ...vipForm, phone: e.target.value })}
              required
              className="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-[#E6CA65] font-black placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]"
            />
            <input
              type="email"
              placeholder="Email nhận thông tin..."
              value={vipForm.email}
              onChange={e => setVipForm({ ...vipForm, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]"
            />
            <select
              value={vipForm.unitType}
              onChange={e => setVipForm({ ...vipForm, unitType: e.target.value })}
              className="w-full bg-[#0B1B3D] border border-white/20 rounded-sm p-3 text-white font-bold focus:outline-none cursor-pointer"
            >
              <option className="text-slate-900 bg-white font-medium" value="Căn hộ 1 Phòng Ngủ">Căn hộ 1 Phòng Ngủ (52 m²)</option>
              <option className="text-slate-900 bg-white font-medium" value="Căn hộ 2 Phòng Ngủ">Căn hộ 2 Phòng Ngủ (72.5 m²)</option>
              <option className="text-slate-900 bg-white font-medium" value="Căn hộ 3 Phòng Ngủ">Căn hộ 3 Phòng Ngủ (108 m²)</option>
              <option className="text-slate-900 bg-white font-medium" value="Sky Villa Penthouse">Sky Villa Penthouse (265 m²)</option>
            </select>
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-xl transition cursor-pointer active:scale-95"
            >
              ĐĂNG KÝ TƯ VẤN VIP NGAY
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  // ── APARTMENTS CATALOG PAGE ──
  const renderApartmentsPage = () => (
    <div className="bg-[#07132B] text-slate-100 py-12 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
          <span>/</span>
          <span className="text-[#E6CA65] font-bold">Mặt bằng căn hộ</span>
        </div>

        <div className="border-b border-[#C5A059]/30 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif uppercase">MẶT BẰNG & DANH SÁCH CĂN HỘ</h1>
          <p className="text-xs text-slate-400 mt-1">Toàn bộ căn hộ được trang bị nội thất mạ vàng Kohler và công nghệ SmartHome 4.0</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeUnits.map(unit => (
            <div
              key={unit.id}
              onClick={() => handleOpenUnit(unit)}
              className="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden bg-slate-900">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-0.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-[10px] rounded-sm shadow">
                    {unit.badge}
                  </span>
                </div>
                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug font-serif">
                    {unit.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Giá bán</span>
                      <span className="font-black text-[#E6CA65] text-sm">{unit.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Diện tích</span>
                      <span className="font-bold text-slate-200">{unit.area}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span>{unit.bedrooms} PN • {unit.bathrooms} WC</span>
                <span className="text-[#E6CA65] font-bold">Chi tiết ›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PROPERTY DETAIL PAGE ──
  const renderPropertyDetailPage = () => (
    <div className="bg-[#07132B] text-slate-100 py-12 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
          <span>/</span>
          <span onClick={() => navigate('can-ho')} className="hover:text-[#E6CA65] cursor-pointer">Căn hộ</span>
          <span>/</span>
          <span className="text-[#E6CA65] font-bold truncate">{selectedUnit.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3">
              <span className="px-3 py-1 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-xs rounded-sm">
                {selectedUnit.badge}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug">
                {selectedUnit.title}
              </h1>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Giá bán dự kiến</span>
                  <span className="text-2xl font-black text-[#E6CA65]">{selectedUnit.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Diện tích thông thủy</span>
                  <span className="text-base font-bold text-white">{selectedUnit.area}</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white/5 border border-[#C5A059]/30 p-4 rounded-sm space-y-3">
              <div className="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-900">
                <img
                  src={selectedUnit.gallery[activeGalleryIdx] || selectedUnit.image}
                  alt=""
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedUnit.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveGalleryIdx(i)}
                    className={`h-24 rounded-sm overflow-hidden cursor-pointer border-2 transition ${
                      activeGalleryIdx === i ? 'border-[#E6CA65]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm space-y-4 text-xs">
              <h3 className="font-black text-sm text-[#E6CA65] uppercase tracking-wider font-serif border-b border-white/10 pb-2">
                TIÊU CHUẨN BÀN GIAO MẠ VÀNG 4.0
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedUnit.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg">
                    <CheckCircle2 size={16} className="text-[#E6CA65] shrink-0" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed pt-2">{selectedUnit.desc}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-b from-[#0B1B3D] to-[#07132B] border border-[#C5A059]/40 p-6 rounded-sm space-y-4">
              <h3 className="font-black text-base text-[#E6CA65] font-serif uppercase">
                Đăng Ký Tham Quan Căn Hộ Này
              </h3>
              <form onSubmit={handleVipSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Họ và tên của bạn..."
                  value={vipForm.name}
                  onChange={e => setVipForm({ ...vipForm, name: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white focus:outline-none focus:border-[#E6CA65]"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại..."
                  value={vipForm.phone}
                  onChange={e => setVipForm({ ...vipForm, phone: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-[#E6CA65] font-bold focus:outline-none focus:border-[#E6CA65]"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer"
                >
                  XÁC NHẬN ĐẶT LỊCH XEM
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── NEWS CATALOG & DETAIL ──
  const renderNewsPage = () => (
    <div className="bg-[#07132B] text-slate-100 py-12 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 space-y-8`}>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
          <span>/</span>
          <span className="text-[#E6CA65] font-bold">Tin tức & Sự kiện</span>
        </div>

        <div className="border-b border-[#C5A059]/30 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif uppercase">TIN TỨC & TIẾN ĐỘ THI CÔNG</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeNews.map(art => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden bg-slate-900">
                <img
                  src={art.image}
                  alt={art.title}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#E6CA65] uppercase tracking-wider">{art.category}</span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug mt-1 font-serif">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">{art.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{art.date}</span>
                  <span className="text-[#E6CA65] font-bold">Xem chi tiết ›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderArticleDetailPage = () => (
    <div className="bg-[#07132B] text-slate-100 py-12 min-h-screen">
      <div className={`${MAX_W} mx-auto px-4 max-w-4xl space-y-6`}>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span onClick={() => navigate('home')} className="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
          <span>/</span>
          <span onClick={() => navigate('news')} className="hover:text-[#E6CA65] cursor-pointer">Tin tức</span>
          <span>/</span>
          <span className="text-[#E6CA65] font-bold truncate">{selectedArticle.title}</span>
        </div>

        <div className="bg-white/5 border border-[#C5A059]/30 p-6 sm:p-8 rounded-md backdrop-blur-md space-y-6">
          <span className="px-3 py-1 bg-[#C5A059] text-[#07132B] font-bold text-xs rounded-sm">
            {selectedArticle.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif leading-tight">
            {selectedArticle.title}
          </h1>
          <div className="text-xs text-slate-400 flex items-center gap-4 border-b border-white/10 pb-3">
            <span>Ngày đăng: {selectedArticle.date}</span>
            <span>•</span>
            <span>Tác giả: {selectedArticle.author}</span>
            <span>•</span>
            <span>{selectedArticle.views} lượt xem</span>
          </div>

          <div className="rounded-sm overflow-hidden shadow-2xl">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'; }}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            {selectedArticle.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#07132B] font-sans antialiased text-slate-100 relative ${isSmall ? 'text-xs' : ''}`}>
      {renderHeader()}
      <main className="flex-1 w-full">
        {currentPage === 'home' && renderHomePage()}
        {['can-ho', 'mat-bang', 'vi-tri', 'cong-nghe', 'tien-ich'].includes(currentPage) && renderApartmentsPage()}
        {currentPage === 'news' && renderNewsPage()}
        {currentPage === 'property-detail' && renderPropertyDetailPage()}
        {currentPage === 'news-detail' && renderArticleDetailPage()}
        {currentPage === 'contact' && renderHomePage()}
        {!['home', 'can-ho', 'mat-bang', 'vi-tri', 'cong-nghe', 'tien-ich', 'news', 'property-detail', 'news-detail', 'contact'].includes(currentPage) && renderHomePage()}
      </main>
      <UniversalTemplateFooter
        company={company}
        templateName="BDS-04 (Sunshine City Saigon Landmark)"
        onNavigate={navigate}
        zaloPhone="0909888666"
        hotlinePhone={company?.phone}
      />
    </div>
  );
}
