const { PrismaClient } = require('./packages/database/generated/client');
const prisma = new PrismaClient();

async function checkUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, fullName: true, role: true, tenantId: true, isActive: true }
  });
  console.log('--- ALL USERS IN DB ---');
  console.table(users);
  
  const tenants = await prisma.tenant.findMany({
    select: { id: true, name: true, slug: true, templateSlug: true, status: true }
  });
  console.log('--- ALL TENANTS IN DB ---');
  console.table(tenants);
  
  await prisma.$disconnect();
}
checkUsers();
