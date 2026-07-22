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
  console.log('=== STARTING MEDIA REGISTRATION SECURITY TEST ===');

  // 1. Create a Test Tenant & User
  const tenantSlug = 'media-test-tenant';
  let tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (tenant) {
    // clean up
    await prisma.media.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.tenantMembership.deleteMany({ where: { tenantId: tenant.id } });
    await prisma.tenant.delete({ where: { id: tenant.id } });
  }

  tenant = await prisma.tenant.create({
    data: {
      name: 'Media Test Tenant',
      slug: tenantSlug,
      status: 'ACTIVE',
      templateId: 'template-1',
    }
  });

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email: 'media-editor@platformbds.vn' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'media-editor@platformbds.vn',
        fullName: 'Editor Media Test',
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

  // Helper request runner
  const testRegisterMedia = (payload: any) => fetch(`${API_URL}/api/cms/media/upload`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(payload)
  });

  // ---------------------------------------------------------------------------
  // TEST 1: Valid upload to own folder
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 1: Valid Upload to Own Folder ---');
  let res = await testRegisterMedia({
    filename: 'villa.jpg',
    url: `https://res.cloudinary.com/cloudname/image/upload/v1/tenant_${tenant.id}/villa.jpg`,
    publicId: `tenant_${tenant.id}/villa`,
    mimeType: 'image/jpeg',
    fileSize: 102400,
  });
  console.log(`Status: HTTP ${res.status} (Expected 201)`);
  if (res.status === 201) {
    console.log('[PASS] Valid upload registered successfully.');
  } else {
    console.error('[FAIL] Valid upload failed registration.');
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Upload targeting other tenant folder prefix
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 2: Upload Targeting Other Tenant Folder (Directory Traversal Bypass Attempt) ---');
  res = await testRegisterMedia({
    filename: 'exploit.jpg',
    url: `https://res.cloudinary.com/cloudname/image/upload/v1/tenant_different-id/exploit.jpg`,
    publicId: `tenant_different-id/exploit`,
    mimeType: 'image/jpeg',
    fileSize: 102400,
  });
  console.log(`Status: HTTP ${res.status} (Expected 400)`);
  let data = await res.json().catch(() => ({}));
  console.log('Response body:', data);
  if (res.status === 400 && data?.error?.code === 'INVALID_MEDIA_URL') {
    console.log('[PASS] Restricting URL prefix mismatch blocks cross-tenant folder writes.');
  } else {
    console.error('[FAIL] Folder prefix restriction check failed.');
  }

  // ---------------------------------------------------------------------------
  // TEST 3: Block unsafe file extensions (SVG/HTML stored XSS risk vectors)
  // ---------------------------------------------------------------------------
  console.log('\n--- Test 3: Upload Unsafe File Types (SVG/HTML) ---');
  res = await testRegisterMedia({
    filename: 'dangerous.svg',
    url: `https://res.cloudinary.com/cloudname/image/upload/v1/tenant_${tenant.id}/dangerous.svg`,
    publicId: `tenant_${tenant.id}/dangerous`,
    mimeType: 'image/svg+xml',
    fileSize: 5000,
  });
  console.log(`Status: HTTP ${res.status} (Expected 400)`);
  data = await res.json().catch(() => ({}));
  console.log('Response body:', data);
  if (res.status === 400 && data?.error?.code === 'UNSUPPORTED_FILE_TYPE') {
    console.log('[PASS] Unsafe SVG file block triggered successfully.');
  } else {
    console.error('[FAIL] Unsafe file block failed check.');
  }

  // ---------------------------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------------------------
  console.log('\n--- Cleaning Up ---');
  await prisma.media.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.tenantMembership.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.tenant.delete({ where: { id: tenant.id } });

  console.log('=== TEST COMPLETED ===');
  await prisma.$disconnect();
}

main();
