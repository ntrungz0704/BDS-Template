import request from 'supertest';
import { app } from '../index';
import { prisma } from '@repo/database';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';

describe('Media Upload Validation & Safety Test', () => {
  let tenant: any;
  let user: any;
  let token: string;
  const tenantSlug = 'media-test-tenant-jest';

  beforeAll(async () => {
    // Clean up if exist
    const oldTenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
    if (oldTenant) {
      await prisma.mediaAsset.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: oldTenant.id } });
      await prisma.tenant.delete({ where: { id: oldTenant.id } });
    }

    // Create fresh test tenant
    tenant = await prisma.tenant.create({
      data: {
        name: 'Media Test Tenant Jest',
        slug: tenantSlug,
        status: 'ACTIVE',
        templateId: 'template-1',
      },
    });

    // Create user
    user = await prisma.user.findUnique({ where: { email: 'media-editor-jest@platformbds.vn' } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'media-editor-jest@platformbds.vn',
          fullName: 'Editor Media Test Jest',
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
      await prisma.mediaAsset.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.tenantMembership.deleteMany({ where: { tenantId: cleanTenant.id } });
      await prisma.tenant.delete({ where: { id: cleanTenant.id } });
    }
    await prisma.$disconnect();
  });

  it('should upload a valid small image successfully', async () => {
    const fileBuffer = Buffer.from('fake image data');

    const res = await request(app)
      .post('/api/cms/media/upload')
      .set('Cookie', `access_token=${token}; csrf_token=media-csrf-token`)
      .set('X-CSRF-Token', 'media-csrf-token')
      .attach('file', fileBuffer, 'test-image.jpg');

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe('test-image.jpg');

    // Clean up created asset
    await prisma.mediaAsset.deleteMany({ where: { tenantId: tenant.id } });
  });

  it('should block unsafe file extensions (SVG/HTML stored XSS risk vectors)', async () => {
    const fileBuffer = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert("XSS")</script></svg>');

    const res = await request(app)
      .post('/api/cms/media/upload')
      .set('Cookie', `access_token=${token}; csrf_token=media-csrf-token`)
      .set('X-CSRF-Token', 'media-csrf-token')
      .attach('file', fileBuffer, 'malicious.svg');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should block files exceeding the category size limit (e.g. image > 5MB)', async () => {
    // Create a 6MB dummy buffer
    const largeBuffer = Buffer.alloc(6 * 1024 * 1024);

    const res = await request(app)
      .post('/api/cms/media/upload')
      .set('Cookie', `access_token=${token}; csrf_token=media-csrf-token`)
      .set('X-CSRF-Token', 'media-csrf-token')
      .attach('file', largeBuffer, 'huge-image.jpg');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Kích thước ảnh vượt quá giới hạn');
  });
});
