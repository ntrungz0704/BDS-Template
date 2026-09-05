import { TenantConfigSchema, TenantMenuItem, TenantHeroSlide } from '@repo/types';

export const DEFAULT_TEMPLATE_MENUS: Record<string, TenantMenuItem[]> = {
  'bds-16': [
    { id: 'm-home', label: 'Trang Chủ', url: '/', order: 1, visible: true },
    { id: 'm-building', label: 'Building', url: '/building', order: 2, visible: true },
    { id: 'm-chdv', label: 'CHDV', url: '/chdv', order: 3, visible: true },
    { id: 'm-sale', label: 'Nhà Bán', url: '/nha-ban', order: 4, visible: true },
    { id: 'm-rent', label: 'Nhà Cho Thuê', url: '/nha-cho-thue', order: 5, visible: true },
    { id: 'm-map', label: 'Bản Đồ', url: '/ban-do', order: 6, visible: true },
    { id: 'm-contact', label: 'Liên Hệ', url: '/lien-he', order: 7, visible: true },
  ],
  default: [
    { id: 'm-home', label: 'Trang Chủ', url: '/', order: 1, visible: true },
    { id: 'm-about', label: 'Giới Thiệu', url: '/gioi-thieu', order: 2, visible: true },
    { id: 'm-sale', label: 'Nhà Bán', url: '/nha-ban', order: 3, visible: true },
    { id: 'm-rent', label: 'Nhà Cho Thuê', url: '/nha-cho-thue', order: 4, visible: true },
    { id: 'm-news', label: 'Tin Tức', url: '/tin-tuc', order: 5, visible: true },
    { id: 'm-contact', label: 'Liên Hệ', url: '/lien-he', order: 6, visible: true },
  ],
};

export function getDefaultTenantConfig(
  templateSlug: string = 'bds-16',
  overrides?: Partial<TenantConfigSchema>
): TenantConfigSchema {
  const normSlug = templateSlug.toLowerCase().trim();
  const baseMenu = DEFAULT_TEMPLATE_MENUS[normSlug] || DEFAULT_TEMPLATE_MENUS['default'];

  const defaultHeroSlides: TenantHeroSlide[] = [
    {
      id: 'slide-1',
      title: 'Tòa Nhà Văn Phòng Mặt Tiền Nguyễn Lương Bằng, Quận 7',
      subtitle: 'Diện tích 8x22m (176m²), 1 hầm 7 lầu, dòng tiền cho thuê 180 triệu/tháng',
      badge: 'ĐỘC QUYỀN VIP',
      price: '45 Tỷ VNĐ',
      location: 'Nguyễn Lương Bằng, P. Tân Phú, Quận 7, TP.HCM',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85',
      actionUrl: '/building',
      actionText: 'Xem Chi Tiết Tòa Nhà',
      order: 1,
    },
    {
      id: 'slide-2',
      title: 'Căn Hộ Dịch Vụ 20 Phòng Full Nội Thất Cao Cấp KDC Him Lam',
      subtitle: 'Thu nhập khoán 110 triệu/tháng, thang máy tốc độ cao, camera an ninh 24/7',
      badge: 'DÒNG TIỀN CAO',
      price: '28.5 Tỷ VNĐ',
      location: 'KDC Him Lam, P. Tân Hưng, Quận 7, TP.HCM',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85',
      actionUrl: '/chdv',
      actionText: 'Xem CHDV Sinh Lời',
      order: 2,
    },
    {
      id: 'slide-3',
      title: 'Biệt Thự Đơn Lập Khu Đô Thị Phú Mỹ Hưng Nam Sài Gòn',
      subtitle: 'Sân vườn nhiệt đới, gara ô tô rộng rãi, hồ bơi riêng biệt lập, sổ hồng trao tay',
      badge: 'SIÊU PHẨM AN CƯ',
      price: '68 Tỷ VNĐ',
      location: 'Khu Đô Thị Phú Mỹ Hưng, Quận 7, TP.HCM',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85',
      actionUrl: '/nha-ban',
      actionText: 'Khám Phá Biệt Thự',
      order: 3,
    },
  ];

  const isBds16 = normSlug === 'bds-16';

  const defaultConfig: TenantConfigSchema = {
    version: 1,
    tenantSlug: overrides?.tenantSlug || 'demo',
    templateSlug: normSlug,
    logo: {
      url: overrides?.logo?.url || '',
      text: overrides?.logo?.text || (isBds16 ? 'S.HOUSE' : normSlug.startsWith('lp-') ? normSlug.toUpperCase().replace('-', ' ') : ('TL ' + normSlug.toUpperCase().replace('-', ''))),
      slogan: overrides?.logo?.slogan || 'TRAO BẠN CUỘC SỐNG MƠ ƯỚC',
      width: overrides?.logo?.width || 180,
      height: overrides?.logo?.height || 48,
    },
    navigation: {
      menuItems: overrides?.navigation?.menuItems && overrides.navigation.menuItems.length > 0
        ? overrides.navigation.menuItems
        : baseMenu,
    },
    heroSlider: {
      enabled: overrides?.heroSlider?.enabled ?? true,
      autoplay: overrides?.heroSlider?.autoplay ?? true,
      intervalSec: overrides?.heroSlider?.intervalSec ?? 5,
      slides: overrides?.heroSlider?.slides && overrides.heroSlider.slides.length > 0
        ? overrides.heroSlider.slides
        : defaultHeroSlides,
    },
    contact: {
      companyName: overrides?.contact?.companyName || (isBds16 ? 'Trung Nghĩa Nhà Phố' : 'Bất Động Sản Cao Cấp'),
      brandTitle: overrides?.contact?.brandTitle || (isBds16 ? 'Trung Nghĩa Nhà Phố' : 'Chuyên Gia Tư Vấn BĐS'),
      slogan: overrides?.contact?.slogan || (isBds16 ? 'CHUYÊN TÒA NHÀ & CĂN HỘ DỊCH VỤ QUẬN 7' : 'Uy Tín Tạo Niềm Tin - Đồng Hành Cùng Thịnh Vượng'),
      phone: overrides?.contact?.phone || (isBds16 ? '0394678913' : '0909.123.456'),
      hotline: overrides?.contact?.hotline || overrides?.contact?.phone || (isBds16 ? '0394678913' : '0909.123.456'),
      zalo: overrides?.contact?.zalo || overrides?.contact?.phone || (isBds16 ? '0394678913' : '0909.123.456'),
      email: overrides?.contact?.email || (isBds16 ? 'thienanminhcorp@gmail.com' : 'lienhe@platformbds.vn'),
      address: overrides?.contact?.address || (isBds16 ? 'Tòa Nhà Paragon, 3 Nguyễn Lương Bằng, Phường Tân Phú, Quận 7, TP Hồ Chí Minh' : 'Quận 7, TP. Hồ Chí Minh'),
      workingHours: overrides?.contact?.workingHours || '8:00 - 21:00 (Cả Thứ 7 & CN)',
      facebook: overrides?.contact?.facebook || 'https://facebook.com',
      youtube: overrides?.contact?.youtube || 'https://youtube.com',
      tiktok: overrides?.contact?.tiktok || '',
      googleMapsEmbed: overrides?.contact?.googleMapsEmbed || '',
    },
    theme: {
      primaryColor: overrides?.theme?.primaryColor || '#071D2D',
      secondaryColor: overrides?.theme?.secondaryColor || '#0B3556',
      accentColor: overrides?.theme?.accentColor || '#E11D48',
      fontFamily: overrides?.theme?.fontFamily || 'Inter, sans-serif',
    },
  };

  return defaultConfig;
}
