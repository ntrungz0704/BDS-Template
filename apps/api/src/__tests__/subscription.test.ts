import request from 'supertest';
import { app } from '../index';
import { prisma } from '@repo/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';

describe('Subscription Expiration & Grace Period Middleware Test', () => {
  let tenant: any;
  let user: any;
  let token: string;
  let subscription: any;
  const tenantSlug = 'sub-test-tenant-jest';

  beforeAll(async () => {
    // Clean up if exist
    const oldTenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (oldTenant) {
      await prisma.subscription.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.project.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.tenant.delete({ where: { id: oldTenant.id } });
    }

    // Upsert template fixture
    const template = await prisma.template.upsert({
      where: { slug: 'luxury-gold' },
      update: { isActive: true },
      create: { name: 'Luxury Gold', slug: 'luxury-gold', isActive: true },
    });

    // Create fresh test tenant
    tenant = await prisma.tenant.create({
      data: {
        name: 'Subscription Test Tenant Jest',
        slug: tenantSlug,
        status: 'ACTIVE',
        templateId: template.id,
      },
    });

    // Create domain settings
    await prisma.tenantDomainSettings.create({
      data: {
        tenantId: tenant.id,
        subdomain: tenantSlug,
      },
    });

    // Create user
    user = await prisma.user.findUnique({ where: { email: 'sub-editor-jest@platformbds.vn' } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'sub-editor-jest@platformbds.vn',
          fullName: 'Editor Subscription Test Jest',
          passwordHash: 'fake-hash',
          role: 'EDITOR',
          isActive: true,
        },
      });
    }

    // Create membership
    await prisma.tenantMembership.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        role: 'EDITOR',
        status: 'ACTIVE',
      },
    });

    // Generate JWT token
    token = jwt.sign(
      { userId: user.id, email: user.email, role: 'EDITOR', tenantId: tenant.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Final database cleanup
    const cleanTenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (cleanTenant) {
      await prisma.subscription.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.project.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.tenant.delete({ where: { id: cleanTenant.id } });
    }
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean old subscriptions
    await prisma.subscription.deleteMany({ where: { tenantId: tenant.id } });
  });

  it('should allow normal reads and writes when subscription is ACTIVE', async () => {
    subscription = await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        plan: 'BASIC',
        status: 'ACTIVE',
        amount: 1000000,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in future
      },
    });

    // CMS GET (Read)
    const resGet = await request(app)
      .get('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');
    expect(resGet.status).toBe(200);

    // CMS POST (Write)
    const resPost = await request(app)
      .post('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token')
      .send({ title: 'Test Project Jest', slug: 'test-p-jest', type: 'APARTMENT', status: 'SELLING' });
    expect(resPost.status).toBe(201);

    // Public website Read
    const resPub = await request(app)
      .get(`/api/website/${tenantSlug}/company-info`);
    expect(resPub.status).toBe(200);

    // Public website contact submission (lead)
    const resLead = await request(app)
      .post(`/api/website/${tenantSlug}/contact`)
      .send({
        fullName: 'Guest User',
        email: 'guest-user@example.com',
        phone: '0901234567',
        message: 'Tôi muốn tìm hiểu thêm về dự án.'
      });
    expect([200, 201]).toContain(resLead.status);
  });

  it('should block CMS writes but allow CMS reads, public reads, and leads during the GRACE period', async () => {
    subscription = await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        plan: 'BASIC',
        status: 'ACTIVE',
        amount: 1000000,
        startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // expired 3 days ago (within 7 days grace)
      },
    });

    // CMS GET (Read)
    const resGet = await request(app)
      .get('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');
    expect(resGet.status).toBe(200);

    // CMS POST (Write) - should be BLOCKED (403)
    const resPost = await request(app)
      .post('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token')
      .send({ title: 'Block me', slug: 'block-me', type: 'APARTMENT', status: 'SELLING' });
    expect(resPost.status).toBe(403);
    expect(resPost.body.error.code).toBe('SUBSCRIPTION_GRACE_PERIOD_RESTRICTED');

    // Public website Read
    const resPub = await request(app)
      .get(`/api/website/${tenantSlug}/company-info`);
    expect(resPub.status).toBe(200);

    // Public website contact submission (lead)
    const resLead = await request(app)
      .post(`/api/website/${tenantSlug}/contact`)
      .send({
        fullName: 'Guest Grace',
        email: 'guest-grace@example.com',
        phone: '0901234567',
        message: 'Tôi muốn đăng ký tư vấn trong grace period.'
      });
    expect([200, 201]).toContain(resLead.status);
  });

  it('should block all access (CMS, Public, Leads) when subscription is FULLY EXPIRED', async () => {
    subscription = await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        plan: 'BASIC',
        status: 'ACTIVE',
        amount: 1000000,
        startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // expired 10 days ago (past 7 days grace)
      },
    });

    // CMS GET (Read) - should be blocked
    const resGet = await request(app)
      .get('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');
    expect(resGet.status).toBe(403);
    expect(resGet.body.error.code).toBe('SUBSCRIPTION_EXPIRED');

    // CMS POST (Write) - should be blocked
    const resPost = await request(app)
      .post('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token')
      .send({ title: 'Block me fully', slug: 'block-me-fully', type: 'APARTMENT', status: 'SELLING' });
    expect(resPost.status).toBe(403);
    expect(resPost.body.error.code).toBe('SUBSCRIPTION_EXPIRED');

    // Public website Read - should be blocked
    const resPub = await request(app)
      .get(`/api/website/${tenantSlug}/company-info`);
    expect(resPub.status).toBe(403);
    expect(resPub.body.error.code).toBe('SUBSCRIPTION_EXPIRED');

    // Public website contact submission (lead) - should be blocked
    const resLead = await request(app)
      .post(`/api/website/${tenantSlug}/contact`)
      .send({
        fullName: 'Guest Expired',
        email: 'guest-expired@example.com',
        phone: '0901234567',
        message: 'Tôi muốn tư vấn mặc dù đã hết hạn.'
      });
    expect(resLead.status).toBe(403);
    expect(resLead.body.error.code).toBe('SUBSCRIPTION_EXPIRED');
  });

  it('should block all access when tenant is SUSPENDED', async () => {
    // Temporarily update tenant status to SUSPENDED
    await prisma.tenant.update({
      where: { id: tenant.id },
      data: { status: 'SUSPENDED' },
    });

    // CMS GET
    const resGet = await request(app)
      .get('/api/cms/projects')
      .set('Cookie', `access_token=${token}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');
    expect(resGet.status).toBe(403);
    expect(resGet.body.error.code).toBe('TENANT_SUSPENDED');

    // Restore status
    await prisma.tenant.update({
      where: { id: tenant.id },
      data: { status: 'ACTIVE' },
    });
  });
});
