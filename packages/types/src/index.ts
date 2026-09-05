export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TENANT_OWNER' | 'EDITOR' | 'STAFF' | 'CUSTOMER' | 'GUEST';
export type BusinessRole = 'SUPER_ADMIN' | 'CUSTOMER_OWNER';
export const CUSTOMER_OWNER: UserRole = 'TENANT_OWNER';

export type OrderStatus =
  | 'PENDING'
  | 'PENDING_SUBDOMAIN_CONFLICT'
  | 'AWAITING_MANUAL_REVIEW'
  | 'WAITING_CONFIRM'
  | 'COMPLETED'
  | 'REJECTED';

export type ProjectStatus = 'COMING_SOON' | 'SELLING' | 'SOLD_OUT';

export type ProjectType = 'APARTMENT' | 'VILLA' | 'TOWNHOUSE' | 'LAND' | 'COMMERCIAL' | 'OFFICE';

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  tenantId: string | null;
}

export interface StandardResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// ─── Universal Template Config Engine Schema ──────────────────────────────────

export interface TenantMenuItem {
  id: string;
  label: string;
  url: string; // e.g. '/', '/building', '/chdv', '/nha-ban', '/nha-cho-thue', '/ban-do', '/lien-he'
  target?: '_self' | '_blank';
  order: number;
  visible: boolean;
}

export interface TenantHeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  price?: string;
  location?: string;
  imageUrl: string;
  actionUrl?: string;
  actionText?: string;
  order: number;
}

export interface TenantHeroSliderConfig {
  enabled: boolean;
  autoplay: boolean;
  intervalSec: number;
  slides: TenantHeroSlide[];
}

export interface TenantLogoConfig {
  url?: string;
  text?: string;
  slogan?: string;
  width?: number;
  height?: number;
}

export interface TenantContactConfig {
  companyName: string;
  brandTitle?: string;
  slogan?: string;
  phone: string;
  hotline?: string;
  zalo: string;
  email: string;
  address: string;
  workingHours?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  googleMapsEmbed?: string;
}

export interface TenantConfigSchema {
  version: number;
  tenantSlug: string;
  templateSlug: string;
  logo: TenantLogoConfig;
  navigation: {
    menuItems: TenantMenuItem[];
  };
  heroSlider: TenantHeroSliderConfig;
  contact: TenantContactConfig;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
  };
}

