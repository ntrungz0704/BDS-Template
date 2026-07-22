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
  console.log('=== STARTING SUBSCRIPTION POLICY TEST ===');

  // 1. Create a Test Tenant & User
  const tenantSlug = 'sub-test-tenant';
  let tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (tenant) {
    // clean up
    await prisma.subscription.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.tenantMembership.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.project.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  }

  tenant = await prisma.tenant.create({
    data: {
      name: 'Subscription Test Tenant',
      slug: tenantSlug,
      status: 'ACTIVE',
      templateId: 'template-1',
    }
  });

  // Create Domain Settings for CMS
  await prisma.tenantDomainSettings.create({
    data: {
      tenantId: tenant.id,
      subdomain: tenantSlug,
    }
  });

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email: 'sub-editor@platformbds.vn' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'sub-editor@platformbds.vn',
        fullName: 'Editor Subscription Test',
        passwordHash: 'fake-hash',
        role: 'EDITOR',
        isActive: true,
      }
    });
  }

  // Create Membership
  await prisma.tenantMembership.create({
    data: {
      tenantId: tenant.id,
      userId: user.id,
      role: 'EDITOR',
      status: 'ACTIVE',
    }
  });

  // Create JWT for this user with this tenantId
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: 'EDITOR', tenantId: tenant.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const getHeaders = (tokenStr: string) => ({
    'Cookie': `access_token=${tokenStr}; csrf_token=test-csrf-token`,
    'X-CSRF-Token': 'test-csrf-token',
    'Content-Type': 'application/json',
  });

  // Helper request runners
  const testGetProjects = () => fetch(`${API_URL}/api/cms/projects`, { headers: getHeaders(token) });
  const testCreateProject = () => fetch(`${API_URL}/api/cms/projects`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ title: 'Test Project', slug: 'test-p', type: 'APARTMENT', status: 'SELLING' })
  });
  const testPublicRead = () => fetch(`${API_URL}/api/website/${tenantSlug}/company-info`);
  const testPublicLead = () => fetch(`${API_URL}/api/website/${tenantSlug}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Guest', phone: '0901234567' })
  });

  // ---------------------------------------------------------------------------
  // CASE 1: Active Subscription
  // ---------------------------------------------------------------------------
  console.log('\n--- Case 1: Active Subscription ---');
  let subscription = await prisma.subscription.create({
    data: {
      tenantId: tenant.id,
      plan: 'BASIC',
      status: 'ACTIVE',
      amount: 1000000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in future
    }
  });

  let resGet = await testGetProjects();
  let resPost = await testCreateProject();
  let resPub = await testPublicRead();
  let resLead = await testPublicLead();

  console.log(`CMS Read: HTTP ${resGet.status} (Expected 200)`);
  console.log(`CMS Write: HTTP ${resPost.status} (Expected 201/200/400)`);
  console.log(`Public Read: HTTP ${resPub.status} (Expected 200)`);
  console.log(`Public Lead: HTTP ${resLead.status} (Expected 200/201)`);

  if (resGet.status === 200 && resPub.status === 200) {
    console.log('[PASS] Active subscription works normally.');
  } else {
    console.error('[FAIL] Active subscription failed check.');
  }

  // ---------------------------------------------------------------------------
  // CASE 2: Grace Period (Expired 3 days ago)
  // ---------------------------------------------------------------------------
  console.log('\n--- Case 2: Grace Period (Expired 3 days ago) ---');
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    }
  });

  resGet = await testGetProjects();
  resPost = await testCreateProject();
  resPub = await testPublicRead();
  resLead = await testPublicLead();

  console.log(`CMS Read: HTTP ${resGet.status} (Expected 200)`);
  console.log(`CMS Write: HTTP ${resPost.status} (Expected 403)`);
  console.log(`Public Read: HTTP ${resPub.status} (Expected 200)`);
  console.log(`Public Lead: HTTP ${resLead.status} (Expected 200/201)`);

  const writeData = await resPost.json().catch(() => ({}));
  console.log('CMS Write response body:', writeData);

  if (resGet.status === 200 && resPost.status === 403 && resPub.status === 200 && writeData?.error?.code === 'SUBSCRIPTION_GRACE_PERIOD_RESTRICTED') {
    console.log('[PASS] Grace period restricts CMS write but allows read and leads.');
  } else {
    console.error('[FAIL] Grace period failed check.');
  }

  // ---------------------------------------------------------------------------
  // CASE 3: Fully Expired (Expired 10 days ago)
  // ---------------------------------------------------------------------------
  console.log('\n--- Case 3: Fully Expired (Expired 10 days ago) ---');
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    }
  });

  resGet = await testGetProjects();
  resPost = await testCreateProject();
  resPub = await testPublicRead();
  resLead = await testPublicLead();

  console.log(`CMS Read: HTTP ${resGet.status} (Expected 403)`);
  console.log(`CMS Write: HTTP ${resPost.status} (Expected 403)`);
  console.log(`Public Read: HTTP ${resPub.status} (Expected 403)`);
  console.log(`Public Lead: HTTP ${resLead.status} (Expected 403)`);

  const pubData = await resPub.json().catch(() => ({}));
  console.log('Public Read response body:', pubData);

  if (resGet.status === 403 && resPub.status === 403 && pubData?.error?.code === 'SUBSCRIPTION_EXPIRED') {
    console.log('[PASS] Fully expired subscription blocks all public and CMS access.');
  } else {
    console.error('[FAIL] Fully expired failed check.');
  }

  // ---------------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------------
  console.log('\n--- Cleaning Up ---');
  await prisma.subscription.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.tenantMembership.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.project.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.tenant.delete({ where: { id: tenant.id } });

  console.log('=== TEST COMPLETED ===');
  await prisma.$disconnect();
}

main();
