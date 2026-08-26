export const SYSTEM_CONFIG = {
  UPLOAD_LIMIT_MB: 500,
  UPLOAD_LIMIT_BYTES: 524288000, // 500MB
  DEMO_SESSION_MAX_SAVE: 3,
  DEMO_SESSION_EXPIRE_DAYS: 3,
  DEFAULT_TEMPLATE_ID: 'template-1',
};

export const BUSINESS_CONFIG = {
  // Trial System
  TRIAL_DURATION_DAYS: 3,
  TRIAL_SAVE_LIMIT: 3,
  TRIAL_WARNING_HOURS: 24,
  
  // Subscription
  RENT_BILLING_PERIOD: 'YEARLY' as const,
  SUBSCRIPTION_GRACE_PERIOD_DAYS: 7,
  
  // Platform
  PLATFORM_DOMAIN: process.env.PLATFORM_DOMAIN || 'platformbds.vn',
  ZALO_CONTACT_URL: process.env.ZALO_CONTACT_URL || 'https://zalo.me/platformbds',
  
  // Trial Status Values
  TRIAL_STATUS: {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    EXPIRING: 'EXPIRING',
    EXPIRED: 'EXPIRED',
    SUSPENDED: 'SUSPENDED',
  } as const,
};

export const THEMES = {
  GOLD: 'gold',
  DARK: 'dark',
  MINIMAL: 'minimal',
};
