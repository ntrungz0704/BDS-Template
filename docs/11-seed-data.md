# 11. Seed Data Specification

> Tài liệu này mô tả chi tiết chiến lược nạp dữ liệu mẫu (Seed Data) cho hệ thống và cung cấp mã nguồn script seed hoàn chỉnh (`seed.ts`) sử dụng Prisma Client để tự động khởi tạo dữ liệu chạy thử chất lượng cao cho cả 3 Tenant mẫu ngay khi cài đặt dự án.

---

## 1. Chiến lược Seed dữ liệu mẫu

Để phục vụ việc chạy thử nghiệm (Demo) và UAT tức thời trên môi trường VPS hoặc local của Developer, script seed sẽ tự động tạo:
1. **1 Super Admin Account:** Dùng để quản lý toàn bộ hệ thống Marketplace.
2. **3 Tenant Records:** Khởi tạo 3 công ty môi giới mẫu với 3 phong cách giao diện và màu sắc khác nhau:
   - `hoanggialand` (Hoàng Gia Land) - Giao diện Gold Luxury.
   - `zenhomes` (Zen Homes) - Giao diện Minimalist.
   - `apexrealty` (Apex Realty) - Giao diện Modern Dark.
3. **10 Banners:** 10 ảnh banner luxury phân chia tương ứng cho 3 tenant.
4. **20 BĐS Projects:** 20 dự án đầy đủ 27 trường dữ liệu phân bố tại TP.HCM và Hà Nội.
5. **20 Blog Posts:** 20 bài viết tin tức chất lượng cao chuẩn SEO chia sẻ kiến thức BĐS.

---

## 2. Mã nguồn Script Seed (`prisma/seed.ts`)

Dưới đây là mã nguồn TypeScript hoàn chỉnh dùng để chạy seed dữ liệu. Script này đọc trực tiếp dữ liệu từ các file JSON trong thư mục `seed/` đã chuẩn bị sẵn ở Việc 2 và Việc 11:

```typescript
import { PrismaClient, UserRole, ProjectStatus, ProjectType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Bắt đầu dọn dẹp cơ sở dữ liệu cũ...');
  // Xóa theo thứ tự ràng buộc khóa ngoại
  await prisma.auditLog.deleteMany();
  await prisma.contactFormSubmission.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.project.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Đã dọn dẹp cơ sở dữ liệu.');

  // 1. Tạo Super Admin mặc định
  console.log('👤 Đang tạo tài khoản Super Admin...');
  const adminPasswordHash = await bcrypt.hash('Admin@2026!secure', 12);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@myplatform.com',
      name: 'Super Admin Nền Tảng',
      password: adminPasswordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log(`✅ Đã tạo Super Admin: ${superAdmin.email}`);

  // 2. Đọc file JSON và seed các Tenant (Companies)
  console.log('🏢 Đang seed danh sách Tenants...');
  const companiesPath = path.join(__dirname, '../seed/companies.json');
  const companiesData = JSON.parse(fs.readFileSync(companiesPath, 'utf-8'));

  const tenantsMap: Record<string, string> = {}; // Ánh xạ tenant_id cũ sang ID tự tạo trong DB

  for (const company of companiesData) {
    // Tạo user đại diện cho Tenant Admin
    const tenantAdminPasswordHash = await bcrypt.hash('Tenant@123', 12);
    const tenantAdminUser = await prisma.user.create({
      data: {
        email: company.email,
        name: `${company.name} Admin`,
        password: tenantAdminPasswordHash,
        role: UserRole.TENANT_ADMIN,
      },
    });

    const newTenant = await prisma.tenant.create({
      data: {
        name: company.name,
        slug: company.slug,
        logo: company.logo,
        phone: company.phone,
        email: company.email,
        address: company.address,
        slogan: company.slogan,
        description: company.description,
        colorTheme: company.color_theme,
        templateId: company.template_id,
        socialLinks: company.social_links,
        ownerId: tenantAdminUser.id,
        status: 'ACTIVE',
        uploadUsedBytes: 15242880, // Giả lập đã dùng 15MB
      },
    });

    // Cập nhật lại tenantId cho user để liên kết ngược lại
    await prisma.user.update({
      where: { id: tenantAdminUser.id },
      data: { tenantId: newTenant.id },
    });

    tenantsMap[company.id] = newTenant.id;
    console.log(`✅ Đã tạo Tenant: ${newTenant.name} (${newTenant.slug})`);
  }

  // 3. Đọc file JSON và seed Banner
  console.log('🖼️ Đang seed danh sách Banners...');
  const bannersPath = path.join(__dirname, '../seed/banners.json');
  const bannersData = JSON.parse(fs.readFileSync(bannersPath, 'utf-8'));

  for (const banner of bannersData) {
    const dbTenantId = tenantsMap[banner.tenant_id];
    if (dbTenantId) {
      await prisma.banner.create({
        data: {
          tenantId: dbTenantId,
          title: banner.title,
          subtitle: banner.subtitle,
          imageUrl: banner.image_url,
          actionUrl: banner.action_url,
          actionText: banner.action_text,
          sortOrder: banner.sort_order,
        },
      });
    }
  }
  console.log('✅ Đã seed Banners.');

  // 4. Đọc file JSON và seed BĐS Projects
  console.log('🏡 Đang seed danh sách Dự án BĐS (Projects)...');
  const projectsPath = path.join(__dirname, '../seed/projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

  for (const project of projectsData) {
    const dbTenantId = tenantsMap[project.tenant_id];
    if (dbTenantId) {
      await prisma.project.create({
        data: {
          tenantId: dbTenantId,
          title: project.title,
          slug: project.slug,
          description: project.description,
          shortDescription: project.short_description,
          price: project.price,
          area: project.area,
          bedrooms: project.bedrooms,
          bathrooms: project.bathrooms,
          direction: project.direction,
          address: project.address,
          city: project.city,
          district: project.district,
          ward: project.ward,
          lat: project.lat,
          lng: project.lng,
          status: project.status as ProjectStatus,
          type: project.type as ProjectType,
          thumbnail: project.thumbnail,
          gallery: project.gallery,
          videoUrl: project.video_url,
          mapEmbed: project.map_embed,
          amenities: project.amenities,
          seoTitle: project.seo_title,
          seoDescription: project.seo_description,
          seoKeywords: project.seo_keywords,
          publishedAt: new Date(project.published_at || Date.now()),
        },
      });
    }
  }
  console.log('✅ Đã seed Dự án BĐS.');

  // 5. Đọc file JSON và seed Blog Posts
  console.log('📰 Đang seed danh sách Bài viết (Posts)...');
  const postsPath = path.join(__dirname, '../seed/posts.json');
  const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

  for (const post of postsData) {
    const dbTenantId = tenantsMap[post.tenant_id];
    if (dbTenantId) {
      await prisma.post.create({
        data: {
          tenantId: dbTenantId,
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          thumbnail: post.thumbnail,
          publishedAt: new Date(post.published_at || Date.now()),
        },
      });
    }
  }
  console.log('✅ Đã seed Bài viết.');
  console.log('🎉 Hoàn tất quá trình Seed dữ liệu mẫu hệ thống thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
