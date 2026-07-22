import request from 'supertest';
import { app } from '../index';
import { prisma } from '@repo/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';

describe('Multi-Tenant IDOR Isolation Test', () => {
  let tenantA: any;
  let tenantB: any;
  let userA: any;
  let userB: any;
  let tokenA: string;
  let tokenB: string;
  let projectB: any;

  beforeAll(async () => {
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

    // 2. Create Tenant A & Tenant B
    tenantA = await prisma.tenant.create({
      data: { name: 'Tenant A Jest', slug: 'tenant-a-jest', status: 'ACTIVE', templateId: 'template-1' }
    });
    tenantB = await prisma.tenant.create({
      data: { name: 'Tenant B Jest', slug: 'tenant-b-jest', status: 'ACTIVE', templateId: 'template-1' }
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
  });

  afterAll(async () => {
    // Cleanup
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
});
