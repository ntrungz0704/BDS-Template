import crypto from 'crypto';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

jest.mock('../utils/mailer', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  sendVerificationEmailAction: jest.fn().mockResolvedValue(undefined),
}));

import { app } from '../index';
import { prisma } from '@repo/database';
import { sendPasswordResetEmail } from '../utils/mailer';

const EMAIL = 'phase2-auth-security@platformbds.vn';
const CURRENT_PASSWORD = 'CurrentPass123!';
const NEW_PASSWORD = 'ChangedPass456!';

describe('Phase 2 authentication security', () => {
  let user: any;
  let token: string;

  beforeAll(async () => {
    const previous = await prisma.user.findUnique({ where: { email: EMAIL } });
    if (previous) {
      await prisma.auditLog.deleteMany({ where: { userId: previous.id } });
      await prisma.user.delete({ where: { id: previous.id } });
    }

    user = await prisma.user.create({
      data: {
        email: EMAIL,
        fullName: 'Phase 2 Security User',
        passwordHash: await bcrypt.hash(CURRENT_PASSWORD, 12),
        role: 'CUSTOMER',
        isActive: true,
        status: 'ACTIVE',
      },
    });
    token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, tenantId: null },
      process.env.JWT_ACCESS_SECRET!,
    );
  });

  afterAll(async () => {
    await prisma.auditLog.deleteMany({ where: { userId: user.id } });
    await prisma.user.deleteMany({ where: { id: user.id } });
  });

  it('validates public registration and disables direct password reset', async () => {
    const register = await request(app).post('/api/auth/register').send({ email: 'invalid-email' });
    expect(register.status).toBe(400);

    const directReset = await request(app)
      .post('/api/auth/direct-reset-password')
      .send({ email: EMAIL, newPassword: NEW_PASSWORD });
    expect(directReset.status).toBe(410);
    expect(directReset.body.error.code).toBe('DIRECT_PASSWORD_RESET_DISABLED');
  });

  it('rejects legacy magic passwords and accepts only the stored password hash', async () => {
    const bypassAttempt = await request(app)
      .post('/api/auth/login')
      .send({ email: EMAIL, password: 'adminsuper' });
    expect(bypassAttempt.status).toBe(401);

    const validLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: EMAIL, password: CURRENT_PASSWORD });
    expect(validLogin.status).toBe(200);
    expect(String(validLogin.headers['set-cookie'])).toContain('HttpOnly');
    expect(String(validLogin.headers['set-cookie'])).toContain('csrf_token=');
  });

  it('enforces CSRF for cookie auth while allowing bearer-only mutations', async () => {
    const missingCsrf = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', `access_token=${token}`);
    expect(missingCsrf.status).toBe(403);
    expect(missingCsrf.body.error.code).toBe('CSRF_ERROR');

    const mismatchedCsrf = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', `access_token=${token}; csrf_token=one`)
      .set('x-csrf-token', 'two');
    expect(mismatchedCsrf.status).toBe(403);

    const bearerOnly = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(bearerOnly.status).toBe(200);
  });

  it('stores only a hash of a one-time expiring reset token', async () => {
    const requestReset = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: EMAIL });
    expect(requestReset.status).toBe(200);

    const mailMock = sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>;
    expect(mailMock).toHaveBeenCalled();
    const resetLink = mailMock.mock.calls.at(-1)![1];
    const rawToken = new URL(resetLink).searchParams.get('token')!;
    const stored = await prisma.passwordResetToken.findFirst({
      where: { userId: user.id, usedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    expect(rawToken).toHaveLength(64);
    expect(stored?.token).not.toBe(rawToken);
    expect(stored?.token).toBe(crypto.createHash('sha256').update(rawToken).digest('hex'));
    expect(stored!.expiresAt.getTime()).toBeGreaterThan(Date.now());

    const reset = await request(app)
      .post('/api/auth/reset-password')
      .send({ token: rawToken, newPassword: NEW_PASSWORD });
    expect(reset.status).toBe(200);

    const replay = await request(app)
      .post('/api/auth/reset-password')
      .send({ token: rawToken, newPassword: 'AnotherPass789!' });
    expect(replay.status).toBe(400);
    expect(await bcrypt.compare(NEW_PASSWORD, (await prisma.user.findUnique({ where: { id: user.id } }))!.passwordHash)).toBe(true);
  });

  it('keeps source delivery unavailable to customers', async () => {
    const res = await request(app)
      .get('/api/source/arbitrary-order')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });
});
