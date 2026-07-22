// @ts-ignore
import { prisma } from '../packages/database/src/index';
// @ts-ignore
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';
const API_URL = 'http://localhost:5000';

async function main() {
  console.log('=== STARTING CONCURRENCY & APPROVAL TEST ===');

  // 1. Get or Create Super Admin user to ensure correct relations
  let adminUser = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@platformbds.vn',
        fullName: 'Admin PlatformBDS',
        passwordHash: 'fake-hash',
        role: 'SUPER_ADMIN',
        isActive: true,
      }
    });
  }

  // 2. Look for ORD-TEST-003 or create a new test order
  let order = await prisma.order.findFirst({
    where: { orderNumber: 'ORD-TEST-003' }
  });

  const subdomain = 'luxury-gold-demo03';

  // Ensure the tenant does not exist before testing
  const existingTenant = await prisma.tenant.findUnique({
    where: { slug: subdomain }
  });

  if (existingTenant) {
    console.log(`- Subdomain ${subdomain} already exists. Cleaning it up for a clean runtime test.`);
    await prisma.project.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.post.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.tenantMembership.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.companyInfo.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.seoConfig.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.subscription.deleteMany({ where: { tenantId: existingTenant.id } });
    await prisma.tenant.delete({ where: { id: existingTenant.id } });
  }

  if (!order || order.status !== 'WAITING_CONFIRM') {
    console.log('- ORD-TEST-003 is not in WAITING_CONFIRM. Re-creating/resetting the order for clean test.');
    if (order) {
      await prisma.order.delete({ where: { id: order.id } });
    }
    
    // Find or create customer
    let customer = await prisma.user.findUnique({
      where: { email: 'customer@platformbds.vn' }
    });
    if (!customer) {
      customer = await prisma.user.create({
        data: {
          email: 'customer@platformbds.vn',
          fullName: 'Nguyễn Văn Khách',
          passwordHash: 'fake-hash',
          role: 'TENANT_OWNER',
          isActive: true
        }
      });
    }

    order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-TEST-003',
        fullName: 'Nguyễn Văn Khách',
        email: 'customer@platformbds.vn',
        phone: '0983312219',
        amount: 3000000,
        type: 'RENT',
        status: 'WAITING_CONFIRM',
        templateId: 'template-1',
        subdomain: subdomain,
        version: 1,
      }
    });
  }

  console.log(`- Target Order: ${order.orderNumber} (ID: ${order.id})`);

  // 3. Generate Super Admin Token
  const adminToken = jwt.sign(
    { userId: adminUser.id, email: adminUser.email, role: 'SUPER_ADMIN', tenantId: null },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log('\n=== SPAWNING CONCURRENT APPROVAL REQUESTS ===');

  // Trigger two concurrent PUT calls to the approve endpoint
  const requestBody = {};
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `access_token=${adminToken}; csrf_token=concurrency-csrf-token`,
      'X-CSRF-Token': 'concurrency-csrf-token',
    },
    body: JSON.stringify(requestBody)
  };

  const url = `${API_URL}/api/admin/orders/${order.id}/approve`;

  let successCount = 0;
  let conflictCount = 0;

  const responses = await Promise.all([
    fetch(url, options).then(async (res) => ({ status: res.status, body: await res.json().catch(() => ({})) })),
    fetch(url, options).then(async (res) => ({ status: res.status, body: await res.json().catch(() => ({})) }))
  ]);

  responses.forEach((res, index) => {
    console.log(`Request ${index + 1}: HTTP ${res.status}`, res.body);
    if (res.status === 200 && res.body.success) {
      successCount++;
    } else {
      conflictCount++;
    }
  });

  console.log(`\n=== CONCURRENCY RESULTS ===`);
  console.log(`Successful approvals: ${successCount}`);
  console.log(`Rejected approvals: ${conflictCount}`);

  // Assertions
  if (successCount === 1 && conflictCount === 1) {
    console.log('[PASS] Concurrency check: Exactly one request succeeded and one failed!');
  } else {
    console.error('[FAIL] Concurrency check failed: Expected 1 success and 1 failure.');
  }

  // 4. Verify Database Integrity
  console.log('\n=== VERIFYING DATABASE INTEGRITY ===');
  const tenants = await prisma.tenant.findMany({
    where: { slug: subdomain }
  });

  console.log(`- Created Tenants with slug '${subdomain}': ${tenants.length}`);
  if (tenants.length === 1) {
    console.log('[PASS] DB Integrity: Exactly one tenant created.');
    
    // Check membership and subscription
    const memberships = await prisma.tenantMembership.findMany({
      where: { tenantId: tenants[0].id }
    });
    console.log(`- Created Memberships for this tenant: ${memberships.length}`);
    if (memberships.length === 1 && memberships[0].role === 'OWNER') {
      console.log('[PASS] DB Integrity: Exactly one OWNER membership created.');
    } else {
      console.error('[FAIL] DB Integrity: Incorrect membership count or role.');
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { tenantId: tenants[0].id }
    });
    console.log(`- Created Subscriptions for this tenant: ${subscriptions.length}`);
    if (subscriptions.length === 1) {
      console.log('[PASS] DB Integrity: Exactly one subscription created.');
    } else {
      console.error('[FAIL] DB Integrity: Incorrect subscription count.');
    }
  } else {
    console.error('[FAIL] DB Integrity: Incorrect tenant count.');
  }

  await prisma.$disconnect();
}

main();
