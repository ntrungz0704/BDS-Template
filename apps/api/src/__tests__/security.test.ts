import { validateEnvironment, EnvironmentValidationError } from '../config/env';

describe('Production Environment Validation & Startup Check', () => {
  it('should validate successfully with secure, distinct secrets', () => {
    const validEnv = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'a-very-long-and-secure-random-access-token-secret-key-32chars',
      JWT_REFRESH_SECRET: 'a-very-long-and-secure-random-refresh-token-secret-key-32chars',
    };

    expect(() => validateEnvironment(validEnv)).not.toThrow();
  });

  it('should auto-populate defaults when optional variables or JWT secrets are not provided', () => {
    const minimalEnv: Record<string, string> = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
    };

    expect(() => validateEnvironment(minimalEnv as any)).not.toThrow();
    expect(minimalEnv.JWT_ACCESS_SECRET).toBeDefined();
    expect(minimalEnv.JWT_REFRESH_SECRET).toBeDefined();
    expect(minimalEnv.FRONTEND_URL).toBe('https://templates.aireviewbds.com');
    expect(minimalEnv.CMS_URL).toBe('https://cms.aireviewbds.com');
  });

  it('should reject identical access and refresh secrets', () => {
    const secret = 'identical-secret-key-that-is-at-least-32-characters-long!';
    const invalidEnv = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: secret,
      JWT_REFRESH_SECRET: secret,
    };

    expect(() => validateEnvironment(invalidEnv)).toThrow(EnvironmentValidationError);
  });

  it('should pass in production with full custom configuration', () => {
    const fullProdEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'production-strong-access-secret-32-chars-long-example',
      JWT_REFRESH_SECRET: 'production-strong-refresh-secret-32-chars-long-example',
      CORS_ORIGINS: 'https://templates.aireviewbds.com,https://cms.aireviewbds.com',
      FRONTEND_URL: 'https://templates.aireviewbds.com',
      CMS_URL: 'https://cms.aireviewbds.com',
      PLATFORM_DOMAIN: 'templates.aireviewbds.com',
      INTERNAL_API_TOKEN: 'internal-secret-token-32-chars-long-example-key',
      SMTP_HOST: 'smtp.gmail.com',
      SMTP_PORT: '587',
      SMTP_USER: 'admin@aireviewbds.com',
      SMTP_PASS: 'app-password',
      SMTP_FROM: '"PlatformBDS" <no-reply@aireviewbds.com>',
    };

    expect(() => validateEnvironment(fullProdEnv)).not.toThrow();
  });
});



