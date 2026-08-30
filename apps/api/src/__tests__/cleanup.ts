import { prisma } from '@repo/database';

afterAll(async () => {
  try {
    // Clean test users
    await prisma.auditLog.deleteMany({
      where: {
        user: {
          email: {
            in: [
              'user-b-jest@platformbds.vn',
              'sub-editor-jest@platformbds.vn',
              'customer-concurrency@platformbds.vn',
              'media-editor-jest@platformbds.vn',
              'user-a-jest@platformbds.vn',
              'order-owner-regression@platformbds.vn',
              'admin-test-concurrency@platformbds.vn',
            ]
          }
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        OR: [
          { email: { contains: 'jest' } },
          { email: { contains: 'test-concurrency' } },
          { email: { contains: 'order-owner-regression' } },
          { email: { contains: 'customer-concurrency' } }
        ]
      }
    });

    // Clean test tenants
    const testTenants = await prisma.tenant.findMany({
      where: {
        OR: [
          { slug: { contains: 'test' } },
          { slug: { contains: 'concurrency' } }
        ]
      }
    });

    for (const t of testTenants) {
      await prisma.lead.deleteMany({ where: { tenantId: t.id } });
      await prisma.post.deleteMany({ where: { tenantId: t.id } });
      await prisma.project.deleteMany({ where: { tenantId: t.id } });
      await prisma.subscription.deleteMany({ where: { tenantId: t.id } });
      await prisma.companyInfo.deleteMany({ where: { tenantId: t.id } });
      await prisma.tenantThemeSettings.deleteMany({ where: { tenantId: t.id } });
      await prisma.order.deleteMany({ where: { tenantId: t.id } });
      await prisma.tenant.delete({ where: { id: t.id } });
    }

    // Clean test orders
    await prisma.order.deleteMany({
      where: {
        OR: [
          { orderNumber: { contains: 'TEST' } },
          { email: { contains: 'test' } },
          { email: { contains: 'example.com' } },
          { fullName: { contains: 'Test' } }
        ]
      }
    });
  } catch (err) {
    // Ignore cleanup errors during test teardown
  }
});
