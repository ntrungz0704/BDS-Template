import request from 'supertest';
import { app } from '../index';
import { prisma } from '@repo/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';

describe('Concurrency & Approve Order Integration Test', () => {
  let adminUser: any;
  let adminToken: string;
  let testOrder: any;
  let templateId: string;
  const subdomain = 'luxury-gold-concurrency-test';

  beforeAll(async () => {
    // 1. Ensure Super Admin exists
    adminUser = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'admin-test-concurrency@platformbds.vn',
          fullName: 'Admin Test Concurrency',
          passwordHash: 'fake-hash',
          role: 'SUPER_ADMIN',
          isActive: true,
        },
      });
    }

    // Generate Super Admin Token
    adminToken = jwt.sign(
      { userId: adminUser.id, email: adminUser.email, role: 'SUPER_ADMIN', tenantId: null },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  beforeEach(async () => {
    // The test database may be intentionally empty; provision the immutable
    // template fixture required by the order foreign key.
    const template = await prisma.template.upsert({
      where: { slug: 'luxury-gold' },
      update: { isActive: true },
      create: {
        name: 'Luxury Gold',
        slug: 'luxury-gold',
        isActive: true,
      },
    });
    templateId = template.id;

    // Clean up existing tenant & order if any
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: subdomain },
    });

    if (existingTenant) {
      await prisma.project.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.post.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.companyInfo.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.seoConfig.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.subscription.deleteMany({ where: { tenantId: existingTenant.id } });
      await prisma.tenant.delete({ where: { id: existingTenant.id } });
    }

    const existingOrder = await prisma.order.findFirst({
      where: { orderNumber: 'ORD-CONCURRENCY-TEST' },
    });
    if (existingOrder) {
      await prisma.order.delete({ where: { id: existingOrder.id } });
    }

    // Find or create customer
    let customer = await prisma.user.findUnique({
      where: { email: 'customer-concurrency@platformbds.vn' },
    });
    if (!customer) {
      customer = await prisma.user.create({
        data: {
          email: 'customer-concurrency@platformbds.vn',
          fullName: 'Nguyễn Văn Khách Test',
          passwordHash: 'fake-hash',
          role: 'TENANT_OWNER',
          isActive: true,
        },
      });
    }

    // Create a new WAITING_CONFIRM order
    testOrder = await prisma.order.create({
      data: {
        orderNumber: 'ORD-CONCURRENCY-TEST',
        fullName: 'Nguyễn Văn Khách Test',
        email: 'customer-concurrency@platformbds.vn',
        phone: '0983312219',
        amount: 3000000,
        type: 'RENT',
        status: 'WAITING_CONFIRM',
        templateId,
        subdomain: subdomain,
        version: 1,
      },
    });
  });

  afterAll(async () => {
    // Final database cleanup
    const tenant = await prisma.tenant.findUnique({
      where: { slug: subdomain },
    });
    if (tenant) {
      await prisma.project.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.post.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.companyInfo.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.seoConfig.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.subscription.deleteMany({ where: { tenantId: tenant.id } });
      await prisma.tenant.delete({ where: { id: tenant.id } });
    }

    const order = await prisma.order.findFirst({
      where: { orderNumber: 'ORD-CONCURRENCY-TEST' },
    });
    if (order) {
      await prisma.order.delete({ where: { id: order.id } });
    }

    await prisma.$disconnect();
  });

  it('should only approve the order once and throw conflict on concurrent approval requests', async () => {
    // Trigger two concurrent requests using supertest
    const req1 = request(app)
      .put(`/api/admin/orders/${testOrder.id}/approve`)
      .set('Cookie', `access_token=${adminToken}; csrf_token=concurrency-csrf-token`)
      .set('X-CSRF-Token', 'concurrency-csrf-token')
      .send({});

    const req2 = request(app)
      .put(`/api/admin/orders/${testOrder.id}/approve`)
      .set('Cookie', `access_token=${adminToken}; csrf_token=concurrency-csrf-token`)
      .set('X-CSRF-Token', 'concurrency-csrf-token')
      .send({});

    const [res1, res2] = await Promise.all([req1, req2]);

    // Check status and success response
    const statuses = [res1.status, res2.status];
    const successes = [res1.body.success, res2.body.success];

    // Assert that exactly one succeeded (200) and one failed (either 409 or 500 depending on transactional flow)
    expect(statuses).toContain(200);
    expect(successes).toContain(true);

    // Verify other request failed gracefully
    const failedResponse = res1.status === 200 ? res2 : res1;
    expect(failedResponse.status).not.toBe(200);
    expect(failedResponse.body.success).toBe(false);

    // Verify database counts: exactly 1 tenant created
    const tenants = await prisma.tenant.findMany({
      where: { slug: subdomain },
    });
    expect(tenants.length).toBe(1);

    // Verify exactly 1 OWNER membership and 1 subscription
    const memberships = await prisma.tenantMembership.findMany({
      where: { tenantId: tenants[0].id },
    });
    expect(memberships.length).toBe(1);
    expect(memberships[0].role).toBe('OWNER');

    const subscriptions = await prisma.subscription.findMany({
      where: { tenantId: tenants[0].id },
    });
    expect(subscriptions.length).toBe(1);
  });
});

