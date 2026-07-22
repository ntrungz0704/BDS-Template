jest.mock('../workers/media.worker', () => ({
  initMediaWorker: jest.fn(),
}));

describe('Production JWT Security Startup Check', () => {
  let originalEnv: any;
  let exitMock: jest.SpyInstance;
  let errorMock: jest.SpyInstance;

  beforeAll(() => {
    originalEnv = { ...process.env };
    // Mock process.exit and console.error to avoid crashing the test process
    exitMock = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
      throw new Error(`process.exit called with ${code}`);
    });
    errorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    process.env = originalEnv;
    exitMock.mockRestore();
    errorMock.mockRestore();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  it('should allow startup in non-production environments with default secrets', () => {
    process.env.NODE_ENV = 'development';
    process.env.JWT_ACCESS_SECRET = 'super-secret-access-key-should-be-long-and-random-123456';
    
    // Importing index should not crash
    expect(() => {
      require('../index');
    }).not.toThrow();
  });

  it('should crash (exit 1) on startup in production when JWT_ACCESS_SECRET is empty', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.JWT_ACCESS_SECRET;

    expect(() => {
      require('../index');
    }).toThrow('process.exit called with 1');
    expect(exitMock).toHaveBeenCalledWith(1);
    expect(errorMock).toHaveBeenCalledWith(
      expect.stringContaining('CRITICAL ERROR: JWT_ACCESS_SECRET is not configured')
    );
  });

  it('should crash (exit 1) on startup in production when JWT_ACCESS_SECRET uses the default fallback', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_ACCESS_SECRET = 'super-secret-access-key-should-be-long-and-random-123456';

    expect(() => {
      require('../index');
    }).toThrow('process.exit called with 1');
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});
