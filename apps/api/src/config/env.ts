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
  const required = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'] as const;

  for (const name of required) {
    if (!env[name]?.trim()) {
      issues.push(`${name} is required`);
    }
  }

  const accessSecret = env.JWT_ACCESS_SECRET?.trim() || '';
  const refreshSecret = env.JWT_REFRESH_SECRET?.trim() || '';

  if (accessSecret && accessSecret.length < 32) {
    issues.push('JWT_ACCESS_SECRET must contain at least 32 characters');
  }
  if (refreshSecret && refreshSecret.length < 32) {
    issues.push('JWT_REFRESH_SECRET must contain at least 32 characters');
  }
  if (accessSecret && isPlaceholderSecret(accessSecret)) {
    issues.push('JWT_ACCESS_SECRET must not use a documented or placeholder value');
  }
  if (refreshSecret && isPlaceholderSecret(refreshSecret)) {
    issues.push('JWT_REFRESH_SECRET must not use a documented or placeholder value');
  }
  if (accessSecret && refreshSecret && accessSecret === refreshSecret) {
    issues.push('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different');
  }

  if (env.NODE_ENV === 'production') {
    const productionRequired = [
      'CORS_ORIGINS',
      'FRONTEND_URL',
      'CMS_URL',
      'PLATFORM_DOMAIN',
      'COOKIE_DOMAIN',
      'INTERNAL_API_TOKEN',
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASS',
      'SMTP_FROM',
    ] as const;

    for (const name of productionRequired) {
      if (!env[name]?.trim()) {
        issues.push(`${name} is required in production`);
      }
    }

    const corsOrigins = env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) || [];
    if (corsOrigins.some((origin) => origin === '*' || !origin.startsWith('https://'))) {
      issues.push('CORS_ORIGINS must contain only explicit HTTPS origins in production');
    }

    for (const name of ['FRONTEND_URL', 'CMS_URL'] as const) {
      const value = env[name]?.trim();
      if (value && !value.startsWith('https://')) {
        issues.push(`${name} must use HTTPS in production`);
      }
    }
  }

  if (issues.length > 0) {
    throw new EnvironmentValidationError(issues);
  }
}
