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

export const CANONICAL_BDS_TITLES: Record<string, string> = {
  'bds-01': 'Template #01 - BatDongSan Classic Portal',
  'bds-02': 'Template #02 - Modern Metro Portal',
  'bds-03': 'Template #03 - Luxury Realty Prestige',
  'bds-04': 'Template #04 - Density RaoVat Pro',
  'bds-05': 'Template #05 - Map-Centric Interactive Portal',
  'bds-06': 'Template #06 - Grand Riverside Eco-Township',
  'bds-07': 'Template #07 - Pannamera Eco-Village Bảo Lộc',
  'bds-08': 'Template #08 - Industrial & Logistics Hub',
  'bds-09': 'Template #09 - Heritage & Colonial Portal',
  'bds-10': 'Template #10 - Investment & High Yield Portal',
  'bds-11': 'Template #11 - Modern Villa & Waterfront Estate',
  'bds-12': 'Template #12 - Mega Developer Ecosystem Portal',
  'bds-13': 'Template #13 - Real Estate Auction & Liquidation Portal',
  'bds-14': 'Template #14 - Landplot & Farmland Exchange Portal',
  'bds-15': 'Template #15 - Commercial & Retail Podium Portal',
  'bds-16': 'Template #16 - Elite Personal Broker Portal',
  'bds-17': 'Template #17 - Northern Capital Heritage Portal',
  'bds-18': 'Template #18 - Saigon Dynamic Riverfront Portal',
  'bds-19': 'Template #19 - Central Coast Scenic Portal',
  'bds-20': 'Template #20 - Mountain & Highland Retreat Portal',
  'bds-21': 'Template #21 - Clean Minimal Scandinavian Portal',
  'bds-22': 'Template #22 - Night Life & Commercial Strip Portal',
  'bds-23': 'Template #23 - Luxury Penthouse & Sky Villa Portal',
  'bds-24': 'Template #24 - Smart City & Future Living Portal',
  'lp-01': 'LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel',
  'lp-02': 'LP #02 - Tuyển Dụng 300 Chuyên Viên Kinh Doanh BĐS',
  'lp-03': 'LP #03 - Tổ Hợp Căn Hộ Cao Cấp Simple Page',
  'lp-04': 'LP #04 - Sale Môi Giới BĐS Triệu Đô Authority',
  'lp-05': 'LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park Tower',
  'lp-06': 'LP #06 - Đại Đô Thị Sân Bay Stella Mega City Cần Thơ',
  'lp-07': 'LP #07 - Siêu Thành Phố Biển Du Lịch Sức Khỏe NovaWorld Phan Thiết 1.000ha',
};

export function formatTemplateDisplayName(ordOrTemplate: any): string {
  if (!ordOrTemplate) return 'Website Bất Động Sản';
  
  const code = extractTemplateCode(ordOrTemplate);
  if (CANONICAL_BDS_TITLES[code]) {
    return CANONICAL_BDS_TITLES[code];
  }

  const template = ordOrTemplate.template || (ordOrTemplate.name ? ordOrTemplate : null);
  const name = template?.name || ordOrTemplate?.productSnapshot?.name || ordOrTemplate?.name || '';
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
  const rawSub = (ord.subdomain || ord.tenant?.slug || '')
    .toLowerCase()
    .replace(/\.aireviewbds\.com.*$/i, '')
    .replace(/\.localhost.*$/i, '')
    .trim();
  
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

export function getTemplateTypeLabel(ordOrTemplate: any): string {
  const code = extractTemplateCode(ordOrTemplate);
  return code.startsWith('lp-') ? 'Landing Page' : 'Website Template';
}

export function getPlatformDomain(customEnvDomain?: string): string {
  const domain = customEnvDomain || (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_PLATFORM_DOMAIN : '') || 'templates.aireviewbds.com';
  if (!domain) return 'templates.aireviewbds.com';
  if (domain.includes('localhost') || domain.includes('127.0.0.1')) return domain;
  if (domain.startsWith('templates.')) return domain;
  return `templates.${domain.replace(/^www\./, '')}`;
}

export function getTenantSiteUrl(ordOrSubdomain: any, customEnvDomain?: string): string {
  const domain = getPlatformDomain(customEnvDomain);
  const slug = typeof ordOrSubdomain === 'string' 
    ? ordOrSubdomain.replace(/\.aireviewbds\.com.*$/i, '').replace(/\.localhost.*$/i, '').trim()
    : formatSiteSlug(ordOrSubdomain);
  const protocol = domain.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${domain}/site/${slug}`;
}

export * from './template-configs';
export * from './vietnam-addresses';

