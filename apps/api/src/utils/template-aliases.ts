export const PORTAL_TEMPLATE_ALIASES: Readonly<Record<string, string>> = {
  'portal-01': 'luxury-gold',
  'portal-02': 'minimal-white',
  'portal-03': 'modern-corporate',
  'portal-04': 'resort-paradise',
  'portal-05': 'urban-city',
  'portal-06': 'industrial-estate',
  'portal-07': 'villa-premium',
  'portal-08': 'eco-green',
  'portal-09': 'classic-elegant',
  'portal-10': 'investment-pro',
  'portal-11': 'agency-onepage',
  'portal-12': 'mega-developer',
  'portal-13': 'auction-template',
  'portal-14': 'landplot-template',
  'portal-15': 'retail-podium',
  'portal-16': 'personal-agent',
  'portal-17': 'portal-listing',
  'portal-18': 'bds123-portal',
  'portal-19': 'nhadatso-density',
  'portal-20': 'minhkhai-apartment',
  'portal-21': 'hanoi-rental',
  'portal-22': 'happyland-resort',
  'portal-23': 'homeo-multithumb',
  'portal-24': 'realtybuild-tech',
};

export function resolveTemplateAlias(identifier: string): string {
  const normalized = identifier.replace(/^template-/, '').trim().toLowerCase();
  const portalKey = normalized.replace(/^bds-(\d{2})$/, 'portal-$1');
  return PORTAL_TEMPLATE_ALIASES[portalKey] || normalized;
}
