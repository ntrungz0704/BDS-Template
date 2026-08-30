import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '../../.env') });

process.env.NODE_ENV = 'test';
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET && !process.env.JWT_ACCESS_SECRET.includes('super-secret')
  ? process.env.JWT_ACCESS_SECRET
  : 'test-jwt-access-secret-minimum-32-chars-long-secure-key-01';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET && !process.env.JWT_REFRESH_SECRET.includes('super-secret')
  ? process.env.JWT_REFRESH_SECRET
  : 'test-jwt-refresh-secret-minimum-32-chars-long-secure-key-02';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';



