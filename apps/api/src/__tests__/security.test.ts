import { validateEnvironment, EnvironmentValidationError } from '../config/env';

describe('Production JWT Security Startup Check & Environment Validation', () => {
  it('should validate successfully with secure, distinct 32+ char secrets', () => {
    const validEnv = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'a-very-long-and-secure-random-access-token-secret-key-32chars',
      JWT_REFRESH_SECRET: 'a-very-long-and-secure-random-refresh-token-secret-key-32chars',
    };

    expect(() => validateEnvironment(validEnv)).not.toThrow();
  });

  it('should reject missing JWT secrets', () => {
    const invalidEnv = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: '',
      JWT_REFRESH_SECRET: '',
    };

    expect(() => validateEnvironment(invalidEnv)).toThrow(EnvironmentValidationError);
  });

  it('should reject placeholder or insecure secret markers', () => {
    const invalidEnv = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'super-secret-access-key-should-be-long-and-random-123456',
      JWT_REFRESH_SECRET: 'super-secret-refresh-key-should-be-long-and-random-123456',
    };

    expect(() => validateEnvironment(invalidEnv)).toThrow(EnvironmentValidationError);
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

  it('should enforce production-only required variables when NODE_ENV is production', () => {
    const partialProdEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'production-strong-access-secret-32-chars-long-example',
      JWT_REFRESH_SECRET: 'production-strong-refresh-secret-32-chars-long-example',
    };

    expect(() => validateEnvironment(partialProdEnv)).toThrow(EnvironmentValidationError);
  });

  it('should pass in production when all production requirements are satisfied', () => {
    const fullProdEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: 'production-strong-access-secret-32-chars-long-example',
      JWT_REFRESH_SECRET: 'production-strong-refresh-secret-32-chars-long-example',
      CORS_ORIGINS: 'https://platformbds.vn,https://admin.platformbds.vn',
      FRONTEND_URL: 'https://platformbds.vn',
      CMS_URL: 'https://cms.platformbds.vn',
      PLATFORM_DOMAIN: 'platformbds.vn',
      COOKIE_DOMAIN: '.platformbds.vn',
      INTERNAL_API_TOKEN: 'internal-secret-token-32-chars-long-example-key',
      SMTP_HOST: 'smtp.gmail.com',
      SMTP_PORT: '587',
      SMTP_USER: 'admin@platformbds.vn',
      SMTP_PASS: 'app-password',
      SMTP_FROM: '"PlatformBDS" <no-reply@platformbds.vn>',
    };

    expect(() => validateEnvironment(fullProdEnv)).not.toThrow();
  });
});


