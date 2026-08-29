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

  it('should auto-populate fallback JWT secrets if missing', () => {
    const envWithMissingJwt = {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_ACCESS_SECRET: '',
      JWT_REFRESH_SECRET: '',
    };

    expect(() => validateEnvironment(envWithMissingJwt)).not.toThrow();
    expect(envWithMissingJwt.JWT_ACCESS_SECRET).toBeTruthy();
    expect(envWithMissingJwt.JWT_REFRESH_SECRET).toBeTruthy();
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

  it('should pass in production with safe defaults', () => {
    const prodEnv: NodeJS.ProcessEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
    };

    expect(() => validateEnvironment(prodEnv)).not.toThrow();
    expect(prodEnv.PLATFORM_DOMAIN).toBe('platformbds.vn');
    expect(prodEnv.FRONTEND_URL).toBe('https://templates.aireviewbds.com');
  });
});



