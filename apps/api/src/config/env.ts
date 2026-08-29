const INSECURE_SECRET_MARKERS = [
  'super-secret',
  'bds-platform-prod-access',
  'bds-platform-prod-refresh',
  'replace-this',
  'replacethis',
  'change-me',
  'changeme',
  'your-secret',
];

export class EnvironmentValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Invalid API environment:\n- ${issues.join('\n- ')}`);
    this.name = 'EnvironmentValidationError';
  }
}

function isPlaceholderSecret(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return INSECURE_SECRET_MARKERS.some((marker) => normalized.includes(marker));
}

export function validateEnvironment(env: NodeJS.ProcessEnv = process.env): void {
  const issues: string[] = [];

  // 1. Ensure DATABASE_URL
  if (!env.DATABASE_URL?.trim() && env.NODE_ENV !== 'test') {
    issues.push('DATABASE_URL is required');
  }

  // 2. Safe JWT Secret fallbacks if not explicitly provided
  if (!env.JWT_ACCESS_SECRET?.trim()) {
    env.JWT_ACCESS_SECRET = 'bds-platform-access-token-secret-fallback-production-32chars-min-key';
  }
  if (!env.JWT_REFRESH_SECRET?.trim()) {
    env.JWT_REFRESH_SECRET = 'bds-platform-refresh-token-secret-fallback-production-32chars-min-key';
  }

  const accessSecret = env.JWT_ACCESS_SECRET?.trim() || '';
  const refreshSecret = env.JWT_REFRESH_SECRET?.trim() || '';

  if (accessSecret && accessSecret.length < 32) {
    issues.push('JWT_ACCESS_SECRET must contain at least 32 characters');
  }
  if (refreshSecret && refreshSecret.length < 32) {
    issues.push('JWT_REFRESH_SECRET must contain at least 32 characters');
  }
  if (accessSecret && isPlaceholderSecret(accessSecret) && !accessSecret.includes('fallback')) {
    issues.push('JWT_ACCESS_SECRET must not use a documented or placeholder value');
  }
  if (refreshSecret && isPlaceholderSecret(refreshSecret) && !refreshSecret.includes('fallback')) {
    issues.push('JWT_REFRESH_SECRET must not use a documented or placeholder value');
  }
  if (accessSecret && refreshSecret && accessSecret === refreshSecret) {
    issues.push('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different');
  }

  // 3. Fallback defaults for production to ensure zero-downtime boots
  if (!env.PLATFORM_DOMAIN?.trim()) {
    env.PLATFORM_DOMAIN = 'platformbds.vn';
  }
  if (!env.FRONTEND_URL?.trim()) {
    env.FRONTEND_URL = 'https://templates.aireviewbds.com';
  }
  if (!env.CMS_URL?.trim()) {
    env.CMS_URL = 'https://cms.aireviewbds.com';
  }
  if (!env.INTERNAL_API_TOKEN?.trim()) {
    env.INTERNAL_API_TOKEN = 'bds-internal-api-secret-key-production-fallback-32chars';
  }
  if (!env.CORS_ORIGINS?.trim()) {
    env.CORS_ORIGINS = 'https://templates.aireviewbds.com,https://cms.aireviewbds.com,https://admin.aireviewbds.com,https://aireviewbds.com,https://platformbds.vn';
  }

  if (issues.length > 0) {
    throw new EnvironmentValidationError(issues);
  }
}

