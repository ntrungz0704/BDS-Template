// @ts-ignore
import { prisma } from '../packages/database/src/index';
// @ts-ignore
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import * as dotenv from 'dotenv';
import * as path from 'path';

// Nạp file .env từ root
dotenv.config({ path: path.join(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';
const API_URL = 'http://localhost:5000';

async function setupFixtures() {
  console.log('=== SETUP FIXTURES ===');
  
  // 1. Tạo 2 Tenant test
  const tenantA = await prisma.tenant.upsert({
    where: { slug: 'test-tenant-a' },
    update: { name: 'Test Tenant A', status: 'ACTIVE' },
    create: {
      name: 'Test Tenant A',
      slug: 'test-tenant-a',
      status: 'ACTIVE',
      templateId: 'template-1',
    }
  });

  const tenantB = await prisma.tenant.upsert({
    where: { slug: 'test-tenant-b' },
    update: { name: 'Test Tenant B', status: 'ACTIVE' },
    create: {
      name: 'Test Tenant B',
      slug: 'test-tenant-b',
      status: 'ACTIVE',
      templateId: 'template-1',
    }
  });

  console.log(`- Created Tenants: Tenant A (${tenantA.id}), Tenant B (${tenantB.id})`);

  // 2. Tạo 2 User test
  const userA = await prisma.user.upsert({
    where: { email: 'test-user-a@platformbds.vn' },
    update: { tenantId: tenantA.id, role: 'TENANT_OWNER', isActive: true },
    create: {
      email: 'test-user-a@platformbds.vn',
      fullName: 'Test User A',
      passwordHash: 'fake-hash',
      role: 'TENANT_OWNER',
      tenantId: tenantA.id,
      isActive: true,
    }
  });

  const userB = await prisma.user.upsert({
    where: { email: 'test-user-b@platformbds.vn' },
    update: { tenantId: tenantB.id, role: 'TENANT_OWNER', isActive: true },
    create: {
      email: 'test-user-b@platformbds.vn',
      fullName: 'Test User B',
      passwordHash: 'fake-hash',
      role: 'TENANT_OWNER',
      tenantId: tenantB.id,
      isActive: true,
    }
  });

  console.log(`- Created Users: User A (${userA.id}), User B (${userB.id})`);

  // 3. Tạo Membership tương ứng
  await prisma.tenantMembership.upsert({
    where: {
      userId_tenantId: { userId: userA.id, tenantId: tenantA.id }
    },
    update: { role: 'OWNER', status: 'ACTIVE' },
    create: {
      userId: userA.id,
      tenantId: tenantA.id,
      role: 'OWNER',
      status: 'ACTIVE',
    }
  });

  await prisma.tenantMembership.upsert({
    where: {
      userId_tenantId: { userId: userB.id, tenantId: tenantB.id }
    },
    update: { role: 'OWNER', status: 'ACTIVE' },
    create: {
      userId: userB.id,
      tenantId: tenantB.id,
      role: 'OWNER',
      status: 'ACTIVE',
    }
  });

  // Xóa mọi membership chéo để đảm bảo User A tuyệt đối không thuộc Tenant B
  await prisma.tenantMembership.deleteMany({
    where: {
      OR: [
        { userId: userA.id, tenantId: tenantB.id },
        { userId: userB.id, tenantId: tenantA.id }
      ]
    }
  });

  console.log(`- Configured Memberships`);

  // 4. Tạo tài nguyên mẫu cho mỗi bên
  // Xóa sạch project cũ của test tenants
  await prisma.project.deleteMany({
    where: {
      tenantId: { in: [tenantA.id, tenantB.id] }
    }
  });

  const projectA = await prisma.project.create({
    data: {
      tenantId: tenantA.id,
      title: 'Project of Tenant A',
      slug: 'project-a-slug',
      type: 'APARTMENT',
      status: 'SELLING',
      price: '10 Tỷ',
    }
  });

  const projectB = await prisma.project.create({
    data: {
      tenantId: tenantB.id,
      title: 'Project of Tenant B',
      slug: 'project-b-slug',
      type: 'VILLA',
      status: 'SELLING',
      price: '20 Tỷ',
    }
  });

  console.log(`- Created Project A (${projectA.id}) and Project B (${projectB.id})`);

  return { tenantA, tenantB, userA, userB, projectA, projectB };
}

// Helper sinh JWT
function generateTestToken(userId: string, email: string, role: string, tenantId: string): string {
  return jwt.sign({ userId, email, role, tenantId }, JWT_SECRET, { expiresIn: '1h' });
}

async function runTests(fixtures: any) {
  const { tenantA, tenantB, userA, userB, projectA, projectB } = fixtures;

  const tokenA = generateTestToken(userA.id, userA.email, 'TENANT_OWNER', tenantA.id);
  const tokenB = generateTestToken(userB.id, userB.email, 'TENANT_OWNER', tenantB.id);

  console.log('\n=== RUNNING SECURITY TESTS ===');

  let passed = 0;
  let failed = 0;

  async function checkResponse(name: string, url: string, options: any, expectedStatus: number, validateBody?: (body: any) => boolean) {
    try {
      const res = await fetch(url, options);
      const data = await res.json().catch(() => ({}));
      
      const statusMatch = res.status === expectedStatus;
      const bodyMatch = validateBody ? validateBody(data) : true;

      if (statusMatch && bodyMatch) {
        console.log(`[PASS] ${name} (Status: ${res.status})`);
        passed++;
      } else {
        console.error(`[FAIL] ${name}: Expected status ${expectedStatus}, got ${res.status}. Body:`, data);
        failed++;
      }
    } catch (err: any) {
      console.error(`[FAIL] ${name} encountered error:`, err.message);
      failed++;
    }
  }

  // 1. Token A đọc Projects của Tenant A -> Phải được (HTTP 200) và chỉ trả về projectA
  await checkResponse(
    '1. Token A đọc Projects của Tenant A',
    `${API_URL}/api/cms/projects`,
    {
      headers: {
        'Cookie': `access_token=${tokenA}`,
      }
    },
    200,
    (body: any) => body.success === true && body.data.some((p: any) => p.id === projectA.id) && !body.data.some((p: any) => p.id === projectB.id)
  );

  // 2. Token A truy cập chi tiết Project B -> Phải bị 404 (do tenantIsolationExtension filter theo tenantA nên không thấy project B)
  await checkResponse(
    '2. Token A đọc chi tiết Project B',
    `${API_URL}/api/cms/projects/${projectB.id}`,
    {
      headers: {
        'Cookie': `access_token=${tokenA}`,
      }
    },
    404
  );

  // 3. Token A sửa Project B -> Phải bị 404
  await checkResponse(
    '3. Token A cập nhật Project B',
    `${API_URL}/api/cms/projects/${projectB.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `access_token=${tokenA}; csrf_token=test-csrf-value`,
        'X-CSRF-Token': 'test-csrf-value',
      },
      body: JSON.stringify({
        title: 'Hacked Title',
        slug: 'hacked-slug',
        type: 'APARTMENT',
        status: 'COMING_SOON',
        version: 1,
      })
    },
    404
  );

  // 4. Token A xóa Project B -> Phải bị 404
  await checkResponse(
    '4. Token A xóa Project B',
    `${API_URL}/api/cms/projects/${projectB.id}`,
    {
      method: 'DELETE',
      headers: {
        'Cookie': `access_token=${tokenA}; csrf_token=test-csrf-value`,
        'X-CSRF-Token': 'test-csrf-value',
      }
    },
    404
  );

  // 5. Token A gửi tenantId = B trong body khi tạo Project -> Project vẫn thuộc Tenant A (tenantIsolationExtension override)
  try {
    const res = await fetch(`${API_URL}/api/cms/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `access_token=${tokenA}; csrf_token=test-csrf-value`,
        'X-CSRF-Token': 'test-csrf-value',
      },
      body: JSON.stringify({
        title: 'Project from Token A with injection body',
        slug: 'injected-slug',
        type: 'APARTMENT',
        status: 'SELLING',
        tenantId: tenantB.id // Cố tình tiêm nhiễm
      })
    });
    const body: any = await res.json();
    if (res.status === 201 && body.data.tenantId === tenantA.id) {
      console.log('[PASS] 5. Token A gửi tenantId = B khi tạo -> Project vẫn thuộc Tenant A');
      passed++;
    } else {
      console.error('[FAIL] 5. Token A gửi tenantId = B khi tạo: Got', res.status, body);
      failed++;
    }
  } catch (err: any) {
    console.error('[FAIL] 5. Token A gửi tenantId = B khi tạo:', err.message);
    failed++;
  }

  // 6. Token A yêu cầu switch sang Tenant B -> Phải bị 403 (do không có TenantMembership)
  await checkResponse(
    '6. Token A switch sang Tenant B',
    `${API_URL}/api/auth/switch-tenant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `access_token=${tokenA}; csrf_token=test-csrf-value`,
        'X-CSRF-Token': 'test-csrf-value',
      },
      body: JSON.stringify({ tenantId: tenantB.id })
    },
    403
  );

  console.log(`\n=== TESTS SUMMARY ===`);
  console.log(`Passed: ${passed}/${passed + failed}`);
  console.log(`Failed: ${failed}/${passed + failed}`);

  if (failed > 0) {
    throw new Error('Some integration tests failed!');
  }
}

async function main() {
  let fixtures;
  try {
    fixtures = await setupFixtures();
    await runTests(fixtures);
  } catch (err: any) {
    console.error('Test run failed:', err.message);
    process.exit(1);
  } finally {
    if (fixtures) {
      console.log('\n=== CLEANING UP FIXTURES ===');
      // Cleanup
      await prisma.project.deleteMany({
        where: {
          tenantId: { in: [fixtures.tenantA.id, fixtures.tenantB.id] }
        }
      });
      await prisma.tenantMembership.deleteMany({
        where: {
          userId: { in: [fixtures.userA.id, fixtures.userB.id] }
        }
      });
      await prisma.user.deleteMany({
        where: {
          id: { in: [fixtures.userA.id, fixtures.userB.id] }
        }
      });
      await prisma.tenant.deleteMany({
        where: {
          id: { in: [fixtures.tenantA.id, fixtures.tenantB.id] }
        }
      });
      console.log('Cleanup completed successfully.');
    }
    await prisma.$disconnect();
  }
}

main();
