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

export function extractTemplateCode(ordOrTemplate: any): string {
  if (!ordOrTemplate) return 'bds-01';
  
  const template = ordOrTemplate.template || (ordOrTemplate.name ? ordOrTemplate : null);
  const name = template?.name || ordOrTemplate?.productSnapshot?.name || ordOrTemplate?.name || '';
  const slug = template?.slug || ordOrTemplate?.productSnapshot?.slug || ordOrTemplate?.templateId || ordOrTemplate?.slug || '';
  const subdomain = ordOrTemplate?.subdomain || ordOrTemplate?.tenant?.slug || '';

  const combined = (name + ' ' + slug + ' ' + subdomain).toLowerCase();

  // 1. Landing Pages (LP 01 -> LP 07)
  const lpMatch = combined.match(/(?:lp|landing)[-_#\s]*0?([1-7])\b/i);
  if (lpMatch) {
    const num = lpMatch[1].padStart(2, '0');
    return `lp-${num}`;
  }

  // 2. BĐS Templates (BĐS 01 -> BĐS 24)
  const bdsMatch = combined.match(/(?:bds|template|portal)[-_#\s]*0?([1-9]|1[0-9]|2[0-4])\b/i);
  if (bdsMatch) {
    const num = bdsMatch[1].padStart(2, '0');
    return `bds-${num}`;
  }

  // 3. Legacy Aliases Mapping
  const legacyAliases: Record<string, string> = {
    'luxury-gold': 'bds-01',
    'minimal-white': 'bds-02',
    'modern-corporate': 'bds-03',
    'resort-paradise': 'bds-04',
    'urban-city': 'bds-05',
    'industrial-estate': 'bds-06',
    'villa-premium': 'bds-07',
    'eco-green': 'bds-08',
    'classic-elegant': 'bds-09',
    'investment-pro': 'bds-10',
    'agency-onepage': 'bds-11',
    'mega-developer': 'bds-12',
    'auction-template': 'bds-13',
    'landplot-template': 'bds-14',
    'retail-podium': 'bds-15',
    'personal-agent': 'bds-16',
    'portal-listing': 'bds-17',
    'benthanh-portal': 'bds-18',
    'bds123-portal': 'bds-18',
    'nhadatso-density': 'bds-19',
    'minhkhai-apartment': 'bds-20',
    'hanoi-rental': 'bds-21',
    'happyland-resort': 'bds-22',
    'homeo-multithumb': 'bds-23',
    'homeo-agency': 'bds-23',
    'realtybuild-tech': 'bds-24',
  };

  for (const [key, val] of Object.entries(legacyAliases)) {
    if (combined.includes(key) || combined.includes(key.replace('-', ' '))) {
      return val;
    }
  }

  return 'bds-01';
}

export function formatSiteSlug(ord: any): string {
  if (!ord) return 'site-demo';
  const rawSub = (ord.subdomain || ord.tenant?.slug || '').toLowerCase();
  
  const brand = (ord.fullName || 'bds')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'bds';
  const cleanPhone = (ord.phone || '').replace(/\D/g, '');
  const phoneSuffix = cleanPhone.length >= 4 ? cleanPhone.slice(-4) : '9876';

  const tplCode = extractTemplateCode(ord);

  // If rawSub is missing, contains CUID (cmt...), or doesn't match the current order's template code:
  if (!rawSub || /cmt[a-z0-9]+/i.test(rawSub) || !rawSub.includes(tplCode)) {
    return `${brand}-${tplCode}-${phoneSuffix}`.toLowerCase();
  }

  return rawSub;
}

export * from './template-configs';
export * from './vietnam-addresses';
