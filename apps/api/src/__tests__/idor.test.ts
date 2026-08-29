import request from 'supertest';
import { app } from '../index';
import { prisma } from '@repo/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET!;

describe('Multi-Tenant IDOR Isolation Test', () => {
  let tenantA: any;
  let tenantB: any;
  let userA: any;
  let userB: any;
  let tokenA: string;
  let tokenB: string;
  let projectB: any;
  let postB: any;
  let leadB: any;
  let mediaB: any;
  let orderB: any;
  let templateId: string;

  beforeAll(async () => {
    await prisma.order.deleteMany({ where: { orderNumber: 'PHASE2-IDOR-ORDER-B' } });
    // 1. Clean up old test tenants
    const oldA = await prisma.tenant.findUnique({ where: { slug: 'tenant-a-jest' } });
    if (oldA) {
      await prisma.project.deleteMany({ where: { tenantId: oldA.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: oldA.id } });
      await prisma.tenant.delete({ where: { id: oldA.id } });
    }
    const oldB = await prisma.tenant.findUnique({ where: { slug: 'tenant-b-jest' } });
    if (oldB) {
      await prisma.project.deleteMany({ where: { tenantId: oldB.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: oldB.id } });
      await prisma.tenant.delete({ where: { id: oldB.id } });
    }

    // 2. Create an immutable template fixture, then Tenant A & Tenant B.
    // The test must not depend on a separately seeded development database.
    const template = await prisma.template.upsert({
      where: { slug: 'luxury-gold' },
      update: { isActive: true },
      create: { name: 'Luxury Gold', slug: 'luxury-gold', isActive: true },
    });
    templateId = template.id;
    tenantA = await prisma.tenant.create({
      data: { name: 'Tenant A Jest', slug: 'tenant-a-jest', status: 'ACTIVE', templateId }
    });
    tenantB = await prisma.tenant.create({
      data: { name: 'Tenant B Jest', slug: 'tenant-b-jest', status: 'ACTIVE', templateId }
    });

    // 3. Create Users
    userA = await prisma.user.findUnique({ where: { email: 'user-a-jest@platformbds.vn' } });
    if (!userA) {
      userA = await prisma.user.create({
        data: { email: 'user-a-jest@platformbds.vn', fullName: 'User A Jest', passwordHash: 'fake-hash', role: 'TENANT_OWNER', isActive: true }
      });
    }
    userB = await prisma.user.findUnique({ where: { email: 'user-b-jest@platformbds.vn' } });
    if (!userB) {
      userB = await prisma.user.create({
        data: { email: 'user-b-jest@platformbds.vn', fullName: 'User B Jest', passwordHash: 'fake-hash', role: 'TENANT_OWNER', isActive: true }
      });
    }

    // 4. Create Memberships
    await prisma.tenantMembership.create({
      data: { tenantId: tenantA.id, userId: userA.id, role: 'OWNER', status: 'ACTIVE' }
    });
    await prisma.tenantMembership.create({
      data: { tenantId: tenantB.id, userId: userB.id, role: 'OWNER', status: 'ACTIVE' }
    });

    // 5. Generate Tokens
    tokenA = jwt.sign({ userId: userA.id, email: userA.email, role: 'TENANT_OWNER', tenantId: tenantA.id }, JWT_SECRET);
    tokenB = jwt.sign({ userId: userB.id, email: userB.email, role: 'TENANT_OWNER', tenantId: tenantB.id }, JWT_SECRET);

    // 6. Create a Project belonging to Tenant B
    projectB = await prisma.project.create({
      data: {
        tenantId: tenantB.id,
        title: 'Project B Private',
        slug: 'project-b-private',
        type: 'VILLA',
        status: 'SELLING',
      }
    });

    postB = await prisma.post.create({
      data: {
        tenantId: tenantB.id,
        title: 'Post B Private',
        slug: 'post-b-private',
        content: 'Tenant B only',
      },
    });

    leadB = await prisma.lead.create({
      data: {
        tenantId: tenantB.id,
        fullName: 'Lead B Private',
        phone: '0900000000',
        tags: [],
      },
    });

    mediaB = await prisma.mediaAsset.create({
      data: {
        tenantId: tenantB.id,
        url: '/uploads/tenant-b-jest/private.webp',
        type: 'IMAGE',
        size: 128,
        format: 'webp',
        name: 'private.webp',
        tags: [],
      },
    });

    orderB = await prisma.order.create({
      data: {
        orderNumber: 'PHASE2-IDOR-ORDER-B',
        fullName: userB.fullName,
        email: userB.email,
        phone: '0900000001',
        type: 'BUY',
        templateId,
        userId: userB.id,
        tenantId: tenantB.id,
        amount: 1000000,
      },
    });
  });

  afterAll(async () => {
    // Cleanup
    await prisma.order.deleteMany({ where: { orderNumber: 'PHASE2-IDOR-ORDER-B' } });
    const cleanA = await prisma.tenant.findUnique({ where: { slug: 'tenant-a-jest' } });
    if (cleanA) {
      await prisma.project.deleteMany({ where: { tenantId: cleanA.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: cleanA.id } });
      await prisma.tenant.delete({ where: { id: cleanA.id } });
    }
    const cleanB = await prisma.tenant.findUnique({ where: { slug: 'tenant-b-jest' } });
    if (cleanB) {
      await prisma.project.deleteMany({ where: { tenantId: cleanB.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: cleanB.id } });
      await prisma.tenant.delete({ where: { id: cleanB.id } });
    }
    await prisma.$disconnect();
  });

  it('should allow User B to read Project B', async () => {
    const res = await request(app)
      .get(`/api/cms/projects/${projectB.id}`)
      .set('Cookie', `access_token=${tokenB}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(projectB.id);
  });

  it('should block User A from reading Project B (returns 404 due to tenant isolation filtering)', async () => {
    const res = await request(app)
      .get(`/api/cms/projects/${projectB.id}`)
      .set('Cookie', `access_token=${tokenA}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');

    // 404 is correct because the resource is scoped under tenantId, so it is invisible to Tenant A
    expect(res.status).toBe(404);
  });

  it('should block User A from modifying Project B', async () => {
    const res = await request(app)
      .put(`/api/cms/projects/${projectB.id}`)
      .set('Cookie', `access_token=${tokenA}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token')
      .send({
        title: 'Hacked Title',
        slug: 'project-b-private',
        type: 'VILLA',
        status: 'SELLING',
        version: 1
      });

    expect(res.status).toBe(404);

    // Verify it was not modified
    const dbProject = await prisma.project.findUnique({
      where: { id: projectB.id }
    });
    expect(dbProject?.title).toBe('Project B Private');
  });

  it('should block User A from deleting Project B', async () => {
    const res = await request(app)
      .delete(`/api/cms/projects/${projectB.id}`)
      .set('Cookie', `access_token=${tokenA}; csrf_token=test-csrf-token`)
      .set('X-CSRF-Token', 'test-csrf-token');

    expect(res.status).toBe(404);

    // Verify it was not deleted
    const dbProject = await prisma.project.findUnique({
      where: { id: projectB.id }
    });
    expect(dbProject).not.toBeNull();
  });

  it('blocks cross-tenant Post reads', async () => {
    const res = await request(app)
      .get(`/api/cms/posts/${postB.id}`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(404);
  });

  it('blocks cross-tenant Lead reads', async () => {
    const res = await request(app)
      .get(`/api/cms/leads/${leadB.id}`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(404);
  });

  it('blocks cross-tenant Media deletion and preserves the asset', async () => {
    const res = await request(app)
      .delete(`/api/cms/media/${mediaB.id}`)
      .set('Authorization', `Bearer ${tokenA}`);

    expect(res.status).toBe(400);
    expect(await prisma.mediaAsset.findUnique({ where: { id: mediaB.id } })).not.toBeNull();
  });

  it('blocks Order status and Payment access by a different user', async () => {
    const statusRes = await request(app)
      .get(`/api/marketplace/orders/${orderB.orderNumber}/status`)
      .set('Authorization', `Bearer ${tokenA}`);
    expect(statusRes.status).toBe(404);

    const paymentRes = await request(app)
      .post(`/api/marketplace/orders/${orderB.id}/payment`)
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ billImageUrl: 'https://example.test/bill.jpg', transactionCode: 'IDOR-ATTEMPT' });
    expect(paymentRes.status).toBe(403);
  });

  it('ignores spoofed tenant headers and rejects unauthorized tenant switching', async () => {
    const projectRes = await request(app)
      .get(`/api/cms/projects/${projectB.id}`)
      .set('Authorization', `Bearer ${tokenA}`)
      .set('x-tenant-id', tenantB.id);
    expect(projectRes.status).toBe(404);

    const switchRes = await request(app)
      .post('/api/auth/switch-tenant')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ tenantId: tenantB.id });
    expect(switchRes.status).toBe(403);
  });

  it('does not grant tenant CMS access to the platform ADMIN role', async () => {
    const adminToken = jwt.sign(
      { userId: userA.id, email: userA.email, role: 'ADMIN', tenantId: tenantA.id },
      JWT_SECRET,
    );
    const res = await request(app)
      .get('/api/cms/projects')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(403);
  });
});

