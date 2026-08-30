import { prisma } from '@repo/database';
import { SingleTenantExporterService } from '../services/single-tenant-exporter.service';
import { ExportJobService } from '../services/export-job.service';
import AdmZip from 'adm-zip';

describe('CloneCraft Export Engine Integration Tests', () => {
  let testOrder: any;
  let testUser: any;

  beforeAll(async () => {
    // Tạo đơn hàng test Mua Đứt
    const tpl = await prisma.template.findFirst({ where: { isActive: true } });
    const orderNumber = `TEST-BUY-${Date.now()}`;
    testUser = await prisma.user.create({
      data: {
        email: `test.export.${Date.now()}@example.com`,
        passwordHash: 'test-password-hash',
        fullName: 'Người mua test',
      },
    });

    testOrder = await prisma.order.create({
      data: {
        orderNumber,
        fullName: 'Nguyễn Văn Test',
        email: 'test.buyer@example.com',
        phone: '0988888888',
        type: 'BUY_SOURCE',
        status: 'COMPLETED',
        templateId: tpl?.id || 'bds-01',
        userId: testUser.id,
        amount: 499000,
      },
      include: {
        template: true,
      },
    });
  });

  afterAll(async () => {
    try {
      if (testOrder) {
        await prisma.exportJob.deleteMany({ where: { orderId: testOrder.id } });
        await prisma.order.deleteMany({ where: { id: testOrder.id } });
      }
      if (testUser) await prisma.user.delete({ where: { id: testUser.id } });
    } catch (e) {
      // Ignore cleanup error
    }
  });

  it('nên sinh thành công gói Single-Tenant Next.js ZIP với đầy đủ cấu trúc và không có tenantId', async () => {
    const result = await SingleTenantExporterService.generateSingleTenantZip({
      orderId: testOrder.id,
      orderNumber: testOrder.orderNumber,
      templateSlug: testOrder.template?.slug || 'bds-01',
      customerName: testOrder.fullName,
      customerPhone: testOrder.phone,
      customerEmail: testOrder.email,
    });

    expect(result.buffer).toBeDefined();
    expect(result.buffer.length).toBeGreaterThan(1000);
    expect(result.fileName).toContain(testOrder.orderNumber);

    // Giải nén kiểm tra nội dung
    const zip = new AdmZip(result.buffer);
    const zipEntries = zip.getEntries().map(e => e.entryName);

    expect(zipEntries).toContain('package.json');
    expect(zipEntries).toContain('tsconfig.json');
    expect(zipEntries).toContain('next.config.js');
    expect(zipEntries).toContain('tailwind.config.js');
    expect(zipEntries).toContain('.env.example');
    expect(zipEntries).toContain('README.md');
    expect(zipEntries).toContain('prisma/schema.prisma');
    expect(zipEntries).toContain('prisma/seed.ts');
    expect(zipEntries).toContain('src/lib/prisma.ts');
    expect(zipEntries).toContain('src/pages/index.tsx');
    expect(zipEntries).toContain('src/pages/admin/index.tsx');

    // Kiểm tra schema.prisma KHÔNG có tenantId
    const schemaContent = zip.readAsText('prisma/schema.prisma');
    expect(schemaContent).not.toContain('tenantId');
    expect(schemaContent).not.toContain('tenant_id');

    // Kiểm tra README.md có hướng dẫn tiếng Việt
    const readmeContent = zip.readAsText('README.md');
    expect(readmeContent).toContain('HƯỚNG DẪN CÀI ĐẶT & TRIỂN KHAI');
    expect(readmeContent).toContain('npm run dev');
  });

  it('ExportJobService nên từ chối mọi đơn hàng không có quyền source', async () => {
    const rentOrder = await prisma.order.create({
      data: {
        orderNumber: `TEST-RENT-${Date.now()}`,
        fullName: 'Khách Thuê',
        email: 'renter@example.com',
        phone: '0977777777',
        type: 'RENT',
        status: 'COMPLETED',
        templateId: testOrder.templateId,
        userId: testUser.id,
        amount: 129000,
      },
    });

    await expect(
      ExportJobService.requestExport(rentOrder.orderNumber, { userId: testUser.id })
    ).rejects.toThrow('SOURCE_TEMPLATE_LICENSE');

    await prisma.order.delete({ where: { id: rentOrder.id } });
  });
});
