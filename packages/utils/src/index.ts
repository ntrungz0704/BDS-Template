export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export function formatTemplateDisplayName(ordOrTemplate: any): string {
  if (!ordOrTemplate) return 'Website Bất Động Sản';
  
  const template = ordOrTemplate.template || (ordOrTemplate.name ? ordOrTemplate : null);
  const name = template?.name || ordOrTemplate?.productSnapshot?.name || ordOrTemplate?.name || '';
  const slug = template?.slug || ordOrTemplate?.productSnapshot?.slug || ordOrTemplate?.templateId || ordOrTemplate?.slug || '';

  const lowerStr = (name + ' ' + slug).toLowerCase();

  // 1. Landing Pages (LP 01 -> LP 07)
  const lpMatch = lowerStr.match(/(?:lp|landing)[-_\s#]*0?([1-7])\b/i);
  if (lpMatch) {
    const num = lpMatch[1].padStart(2, '0');
    const cleanTitle = name
      .replace(/^LP\s*#?0?\d+\s*[-—:]*\s*/i, '')
      .replace(/^Landing\s*Page\s*#?0?\d+\s*[-—:]*\s*/i, '')
      .trim();
    return `LP #${num} - ${cleanTitle || 'Landing Page Sale BĐS'}`;
  }

  // 2. BĐS Templates (BĐS 01 -> BĐS 24)
  const bdsMatch = lowerStr.match(/(?:bds|template|portal)[-_\s#]*0?([1-9]|1[0-9]|2[0-4])\b/i);
  if (bdsMatch) {
    const num = bdsMatch[1].padStart(2, '0');
    const cleanTitle = name
      .replace(/^Template\s*#?0?\d+\s*[-—:]*\s*/i, '')
      .replace(/^BĐS\s*0?\d+\s*[-—:]*\s*/i, '')
      .trim();
    return `BĐS ${num} — ${cleanTitle || 'Website Bất Động Sản'}`;
  }

  // 3. Legacy Aliases Mapping
  const legacyAliases: Record<string, string> = {
    'luxury-gold': 'BĐS 01 — Biệt Thự Hoàng Gia',
    'minimal-white': 'BĐS 02 — Căn Hộ Tối Giản',
    'modern-corporate': 'BĐS 03 — Sàn Giao Dịch Chuyên Nghiệp',
    'resort-paradise': 'BĐS 04 — Nghỉ Dưỡng Ven Biển',
    'urban-city': 'BĐS 05 — Đại Đô Thị Thông Minh',
    'industrial-estate': 'BĐS 06 — Khu Công Nghiệp Hiện Đại',
    'villa-premium': 'BĐS 07 — Biệt Thự Compound 3D',
    'eco-green': 'BĐS 08 — Đô Thị Sinh Thái',
    'classic-elegant': 'BĐS 09 — Dinh Thự Di Sản',
    'investment-pro': 'BĐS 10 — Đầu Tư Bất Động Sản',
    'agency-onepage': 'BĐS 11 — Landing Mở Bán',
    'mega-developer': 'BĐS 12 — Cổng Thông Tin Dự Án',
    'auction-template': 'BĐS 13 — Sàn Đấu Giá Bất Động Sản',
    'landplot-template': 'BĐS 14 — Đất Nền Quy Hoạch',
    'retail-podium': 'BĐS 15 — Shophouse Thương Mại',
    'personal-agent': 'BĐS 16 — Môi Giới Nhà Đất',
    'portal-listing': 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1',
    'benthanh-portal': 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành',
    'bds123-portal': 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành',
    'nhadatso-density': 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số',
    'minhkhai-apartment': 'BĐS 20 — Chung Cư Minh Khai & Times City',
    'hanoi-rental': 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội',
    'happyland-resort': 'BĐS 22 — ZoHotels & Happy Land Nha Trang',
    'homeo-multithumb': 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo',
    'homeo-agency': 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo',
    'realtybuild-tech': 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam',
  };

  for (const [key, val] of Object.entries(legacyAliases)) {
    if (slug.includes(key) || lowerStr.includes(key.replace('-', ' '))) {
      return val;
    }
  }

  return name || 'Website Bất Động Sản';
}

export * from './template-configs';
export * from './vietnam-addresses';
