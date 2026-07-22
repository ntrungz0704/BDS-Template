const { PrismaClient } = require('./generated/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({ 
    where: { status: 'COMPLETED', tenantId: { not: null }, type: 'RENT' }, 
    select: { email: true, tenantId: true, orderNumber: true } 
  });
  
  console.log('Found ' + orders.length + ' completed orders');
  
  for (const o of orders) {
    if (!o.email || !o.tenantId) continue;
    const u = await prisma.user.findUnique({ 
      where: { email: o.email }, 
      select: { email: true, role: true, tenantId: true } 
    });
    if (!u) { console.log('NOT_FOUND: ' + o.email); continue; }
    if (u.role === 'TENANT_OWNER' && u.tenantId === o.tenantId) { 
      console.log('ALREADY_OK: ' + o.email + ' [' + o.orderNumber + ']'); 
      continue; 
    }
    await prisma.user.update({ 
      where: { email: o.email }, 
      data: { role: 'TENANT_OWNER', tenantId: o.tenantId, isActive: true } 
    });
    console.log('REPAIRED: ' + o.email + ' -> tenantId: ' + o.tenantId + ' [' + o.orderNumber + ']');
  }

  await prisma.$disconnect();
  console.log('Done!');
}

main().catch(function(e) { console.error(e); process.exit(1); });
