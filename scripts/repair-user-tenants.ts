/**
 * Script sửa dữ liệu: Gắn TENANT_OWNER role và tenantId cho các user
 * có đơn hàng COMPLETED nhưng vẫn còn role CUSTOMER
 *
 * Chạy: npx ts-node --transpile-only scripts/repair-user-tenants.ts
 */
import { PrismaClient } from '@prisma/client';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Bắt đầu sửa dữ liệu user-tenant...\n');

  // Tìm tất cả đơn hàng COMPLETED có tenantId
  const completedOrders = await prisma.order.findMany({
    where: {
      status: 'COMPLETED',
      tenantId: { not: null },
      type: 'RENT',
    },
    select: { id: true, email: true, tenantId: true, orderNumber: true, fullName: true },
  });

  console.log(`📦 Tìm thấy ${completedOrders.length} đơn hàng COMPLETED\n`);

  let repaired = 0, alreadyOk = 0, notFound = 0;

  for (const order of completedOrders) {
    if (!order.email || !order.tenantId) continue;

    const user = await prisma.user.findUnique({
      where: { email: order.email },
      select: { id: true, email: true, role: true, tenantId: true },
    });

    if (!user) {
      console.log(`⚠️  [${order.orderNumber}] User ${order.email} NOT FOUND`);
      notFound++;
      continue;
    }

    if (user.role === 'TENANT_OWNER' && user.tenantId === order.tenantId) {
      console.log(`✅ [${order.orderNumber}] ${order.email} — Already OK (TENANT_OWNER, tenant: ${user.tenantId?.substring(0,8)}...)`);
      alreadyOk++;
      continue;
    }

    await prisma.user.update({
      where: { email: order.email },
      data: {
        role: 'TENANT_OWNER',
        tenantId: order.tenantId,
        isActive: true,
      },
    });

    console.log(`🔄 [${order.orderNumber}] ${order.email} — REPAIRED!`);
    console.log(`   Role: ${user.role} → TENANT_OWNER`);
    console.log(`   TenantId: ${user.tenantId || 'null'} → ${order.tenantId}`);
    repaired++;
  }

  console.log(`\n📊 KẾT QUẢ:`);
  console.log(`   ✅ Already OK: ${alreadyOk}`);
  console.log(`   🔄 Repaired:   ${repaired}`);
  console.log(`   ⚠️  Not Found:  ${notFound}`);
  console.log('\n✨ Hoàn tất! Khách hàng có thể đăng nhập lại CMS ngay bây giờ.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
