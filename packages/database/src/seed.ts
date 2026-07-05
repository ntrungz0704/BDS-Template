import { PrismaClient, ProjectType, ProjectStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu nạp dữ liệu mẫu (Seed)...');

  // 1. Xóa sạch dữ liệu cũ theo đúng thứ tự ràng buộc khóa ngoại (onDelete Cascade xử lý phần con)
  await prisma.auditLog.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.demoSession.deleteMany({});
  await prisma.contactFormSubmission.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.companyInfo.deleteMany({});
  await prisma.seoConfig.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.template.deleteMany({});

  // 2. Tạo Template mẫu trên Marketplace
  console.log('Tạo Templates...');
  const template1 = await prisma.template.create({
    data: {
      id: 'template-1',
      name: 'Luxury Gold Style',
      slug: 'luxury-gold',
      description: 'Giao diện phong cách hoàng gia, quý phái dành cho dự án cao cấp và biệt thự.',
      shortDescription: 'Phong cách Luxury Gold hoàng gia',
      priceBuy: 3900000,
      priceRentMonthly: 399000,
      isActive: true,
      sortOrder: 1,
    },
  });

  // Tạo TemplateConfig mặc định
  await prisma.templateConfig.create({
    data: {
      templateId: template1.id,
      themeConfig: {
        colorPrimary: '#C5A572',
        colorSecondary: '#1A1A2E',
        fontHeading: 'Playfair Display',
        fontBody: 'Inter',
      },
      layoutConfig: {
        header: 'sticky',
        footer: 'simple-4-columns',
        homeSections: ['hero', 'featured-projects', 'about', 'posts', 'contact'],
      },
      featureFlags: {
        enableBlog: true,
        enableMap: true,
        enableVirtualTour: true,
      },
    },
  });

  // 3. Tạo Super Admin hệ thống
  console.log('Tạo tài khoản Super Admin...');
  const adminPasswordHash = await bcrypt.hash('adminpassword123', 10);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@myplatform.com',
      passwordHash: adminPasswordHash,
      fullName: 'Hệ Thống Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // 4. Đọc dữ liệu seed từ thư mục seed/
  console.log('Đọc các file JSON seed...');
  const seedDir = path.join(process.cwd(), '../../seed');
  
  const companies = JSON.parse(fs.readFileSync(path.join(seedDir, 'companies.json'), 'utf-8'));
  const projects = JSON.parse(fs.readFileSync(path.join(seedDir, 'projects.json'), 'utf-8'));
  const posts = JSON.parse(fs.readFileSync(path.join(seedDir, 'posts.json'), 'utf-8'));
  const banners = JSON.parse(fs.readFileSync(path.join(seedDir, 'banners.json'), 'utf-8'));

  // 5. Tạo các Tenants mẫu
  console.log('Tạo các Tenants & Company Infos...');
  const tenantMap = new Map<string, string>(); // map company slug to tenantId

  for (const comp of companies) {
    const tenantPasswordHash = await bcrypt.hash('tenantpassword123', 10);
    
    // Tạo Tenant Admin trước làm owner
    const tenantOwner = await prisma.user.create({
      data: {
        email: comp.email,
        passwordHash: tenantPasswordHash,
        fullName: comp.name + ' Admin',
        role: 'TENANT_ADMIN',
        isActive: true,
      },
    });

    // Tạo Tenant gắn với template
    const tenant = await prisma.tenant.create({
      data: {
        name: comp.name,
        slug: comp.slug,
        templateId: 'template-1',
        status: 'ACTIVE',
        themeOverrides: { colorTheme: comp.colorTheme || 'gold' },
      },
    });

    // Gắn ngược tenantId vào user owner
    await prisma.user.update({
      where: { id: tenantOwner.id },
      data: { tenantId: tenant.id },
    });

    tenantMap.set(comp.slug, tenant.id);

    // Tạo CompanyInfo 1:1
    await prisma.companyInfo.create({
      data: {
        tenantId: tenant.id,
        name: comp.name,
        description: comp.description,
        logo: comp.logo,
        favicon: comp.favicon,
        slogan: comp.slogan,
        phone: comp.phone,
        email: comp.email,
        address: comp.address,
        googleMapsEmbed: comp.googleMapsEmbed,
        facebook: comp.facebook,
        zalo: comp.zalo,
        youtube: comp.youtube,
      },
    });

    // Tạo SeoConfig 1:1
    await prisma.seoConfig.create({
      data: {
        tenantId: tenant.id,
        metaTitle: comp.name + ' - Bất Động Sản Uy Tín',
        metaDescription: comp.description,
        ogImage: comp.logo,
        enableSitemap: true,
      },
    });

    // Tạo Menu mặc định cho Tenant
    const headerMenu = await prisma.menu.create({
      data: {
        tenantId: tenant.id,
        name: 'Main Navigation',
        location: 'header',
        isActive: true,
      },
    });

    // Tạo các MenuItems
    const menuItems = [
      { label: 'Trang chủ', url: '/', sortOrder: 1 },
      { label: 'Dự án', url: '/projects', sortOrder: 2 },
      { label: 'Tin tức', url: '/posts', sortOrder: 3 },
      { label: 'Liên hệ', url: '/contact', sortOrder: 4 },
    ];

    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: {
          menuId: headerMenu.id,
          label: item.label,
          url: item.url,
          sortOrder: item.sortOrder,
          isActive: true,
        },
      });
    }
  }

  // 6. Nạp Banners mẫu
  console.log('Tạo Banners mẫu...');
  for (const banner of banners) {
    const tenantId = tenantMap.get(banner.companySlug);
    if (!tenantId) continue;

    await prisma.banner.create({
      data: {
        tenantId,
        title: banner.title,
        subtitle: banner.subtitle,
        imageUrl: banner.imageUrl,
        actionUrl: banner.actionUrl,
        actionText: banner.actionText,
        sortOrder: banner.sortOrder,
        isActive: true,
      },
    });
  }

  // 7. Nạp Categories & Posts mẫu
  console.log('Tạo tin tức (Blog & Categories)...');
  for (const comp of companies) {
    const tenantId = tenantMap.get(comp.slug);
    if (!tenantId) continue;

    // Tạo 2 category mặc định cho mỗi tenant
    const catProject = await prisma.category.create({
      data: {
        tenantId,
        name: 'Tin Tức Dự Án',
        slug: 'tin-tuc-du-an',
        sortOrder: 1,
      },
    });

    const catMarket = await prisma.category.create({
      data: {
        tenantId,
        name: 'Thị Trường BĐS',
        slug: 'thi-truong-bds',
        sortOrder: 2,
      },
    });

    // Lọc posts của company này
    const compPosts = posts.filter((p: any) => p.companySlug === comp.slug);
    let index = 0;
    for (const post of compPosts) {
      await prisma.post.create({
        data: {
          tenantId,
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          thumbnail: post.thumbnail,
          categoryId: index % 2 === 0 ? catProject.id : catMarket.id,
          published: true,
          publishedAt: new Date(),
        },
      });
      index++;
    }
  }

  // 8. Nạp Projects mẫu
  console.log('Tạo các dự án BĐS mẫu...');
  for (const proj of projects) {
    const tenantId = tenantMap.get(proj.companySlug);
    if (!tenantId) continue;

    await prisma.project.create({
      data: {
        tenantId,
        title: proj.title,
        slug: proj.slug,
        description: proj.description || 'Chi tiết dự án đang được cập nhật...',
        shortDescription: proj.shortDescription || 'Tổng quan dự án ' + proj.title,
        type: proj.type as ProjectType,
        status: proj.status as ProjectStatus,
        price: proj.price,
        priceFrom: proj.priceFrom ? BigInt(proj.priceFrom) : null,
        priceTo: proj.priceTo ? BigInt(proj.priceTo) : null,
        area: proj.area,
        areaFrom: proj.areaFrom || null,
        areaTo: proj.areaTo || null,
        address: proj.address,
        ward: proj.ward,
        district: proj.district,
        city: proj.city,
        latitude: proj.latitude || null,
        longitude: proj.longitude || null,
        investor: proj.investor || null,
        developer: proj.developer || null,
        constructionYear: proj.constructionYear || null,
        handoverDate: proj.handoverDate || null,
        totalUnits: proj.totalUnits || null,
        amenities: proj.amenities || [],
        images: proj.images || [],
        thumbnail: proj.thumbnail || '',
        youtubeUrl: proj.youtubeUrl || null,
        featured: proj.featured || false,
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  console.log('NẠP DỮ LIỆU MẪU HOÀN THÀNH THÀNH CÔNG!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
