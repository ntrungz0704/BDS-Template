import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

try {
  const possiblePaths = [path.join(process.cwd(), '.env'), path.join(process.cwd(), '../../.env')];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      fs.readFileSync(p, 'utf-8').split('\n').forEach((line) => {
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
          if (key && !key.startsWith('#')) process.env[key] = value;
        }
      });
      console.log('Loaded .env from:', p);
      break;
    }
  }
} catch (e) { console.error('Cannot load .env:', e); }

import { PrismaClient, ProjectType, ProjectStatus } from '../generated/client/index.js';
const prisma = new PrismaClient();

const LUXURY_THEME = {
  primaryColor: '#C5A572', secondaryColor: '#1A1A2E', accentColor: '#D4AF37',
  backgroundColor: '#070C1E', surfaceColor: '#0B132B', textColor: '#F3F4F6',
  textMutedColor: '#9CA3AF', borderColor: '#2D3250',
  fontHeading: 'Playfair Display, serif', fontBody: 'Plus Jakarta Sans, sans-serif',
  fontSizeBase: '16px', lineHeight: '1.6', containerWidth: '1280px',
  borderRadius: '4px', shadowStyle: 'hard', darkMode: true, buttonStyle: 'rounded', animationsEnabled: true,
};
const GREEN_THEME = { ...LUXURY_THEME, primaryColor: '#16A34A', accentColor: '#22C55E', backgroundColor: '#F0FDF4', surfaceColor: '#DCFCE7', textColor: '#14532D', textMutedColor: '#166534', borderColor: '#BBF7D0', darkMode: false };

const DEFAULT_PAGES = [
  { slug: 'home', title: 'Trang chu', isSystem: true, sortOrder: 0, sections: [
    { key: 'hero', label: 'Hero Banner', order: 0, content: { heading: 'Kien Tao Khong Gian Song Thuong Luu', ctaUrl: '/projects' }, settings: { fullHeight: true } },
    { key: 'featured_projects', label: 'Du an noi bat', order: 1, content: { maxItems: 6 }, settings: {} },
    { key: 'about', label: 'Gioi thieu', order: 2, content: { heading: 'Ve Chung Toi' }, settings: {} },
    { key: 'stats', label: 'So lieu', order: 3, content: { items: [{ number: '200+', label: 'Du an' }] }, settings: {} },
    { key: 'cta', label: 'CTA', order: 4, content: { heading: 'Bat Dau Hanh Trinh', ctaUrl: '/contact' }, settings: {} },
    { key: 'contact', label: 'Lien he', order: 5, content: { showForm: true }, settings: {} },
  ]},
  { slug: 'projects', title: 'Du an', isSystem: true, sortOrder: 1, sections: [{ key: 'projects_list', label: 'Danh sach', order: 0, content: { perPage: 12 }, settings: {} }] },
  { slug: 'posts', title: 'Tin tuc', isSystem: true, sortOrder: 2, sections: [{ key: 'posts_list', label: 'Bai viet', order: 0, content: { perPage: 10 }, settings: {} }] },
  { slug: 'contact', title: 'Lien he', isSystem: true, sortOrder: 3, sections: [{ key: 'contact_full', label: 'Lien he', order: 0, content: { showForm: true }, settings: {} }] },
];

async function provisionTenant(opts: { userId: string; name: string; slug: string; subdomain: string; templateId: string; companyData: Record<string, any>; theme: Record<string, any>; isPrimary: boolean; }) {
  const { userId, name, slug, subdomain, templateId, companyData, theme, isPrimary } = opts;
  const tenant = await prisma.tenant.create({ data: { name, slug, templateId, status: 'ACTIVE', activatedAt: new Date(), version: 10 } });
  
  await prisma.tenantMembership.create({
    data: {
      userId,
      tenantId: tenant.id,
      role: 'OWNER',
      status: 'ACTIVE',
    }
  });

  if (isPrimary) { await prisma.user.update({ where: { id: userId }, data: { tenantId: tenant.id } }); }
  await prisma.tenantThemeSettings.create({ data: { tenantId: tenant.id, ...theme } });
  for (const pd of DEFAULT_PAGES) {
    const page = await prisma.tenantPage.create({ data: { tenantId: tenant.id, slug: pd.slug, title: pd.title, isSystem: pd.isSystem, published: true, sortOrder: pd.sortOrder } });
    for (const sec of pd.sections) {
      await prisma.tenantSection.create({ data: { tenantId: tenant.id, pageId: page.id, sectionKey: sec.key, label: sec.label, sortOrder: sec.order, isVisible: true, content: sec.content, settings: sec.settings } });
    }
  }
  const menu = await prisma.menu.create({ data: { tenantId: tenant.id, name: 'Menu Chinh', location: 'header', isActive: true } });
  for (const item of [['Trang chu', '/'], ['Du an', '/projects'], ['Tin tuc', '/posts'], ['Lien he', '/contact']]) {
    await prisma.menuItem.create({ data: { menuId: menu.id, label: item[0], url: item[1], sortOrder: 1, isActive: true } });
  }
  await prisma.companyInfo.create({ data: { tenantId: tenant.id, name: companyData.name, description: companyData.description, slogan: companyData.slogan, logo: companyData.logo, phone: companyData.phone, email: companyData.email, address: companyData.address, facebook: companyData.facebook, youtube: companyData.youtube, zalo: companyData.zalo } });
  await prisma.seoConfig.create({ data: { tenantId: tenant.id, metaTitle: companyData.name + ' -- Bat Dong San', metaDescription: companyData.description, enableSitemap: true } });
  const rootFolder = await prisma.mediaFolder.create({ data: { tenantId: tenant.id, name: 'Thu vien anh', slug: 'root', sortOrder: 0 } });
  await prisma.mediaFolder.create({ data: { tenantId: tenant.id, parentId: rootFolder.id, name: 'Du an', slug: 'projects', sortOrder: 1 } });
  const now = new Date(); const end = new Date(now); end.setFullYear(end.getFullYear() + 1);
  await prisma.subscription.create({ data: { tenantId: tenant.id, plan: 'PRO', status: 'ACTIVE', amount: 399000, startDate: now, endDate: end } });
  await prisma.tenantDomainSettings.create({ data: { tenantId: tenant.id, subdomain, platformDomain: 'platformbds.vn', customDomain: null, dnsVerified: true, sslStatus: 'ACTIVE' } });
  await prisma.banner.create({ data: { tenantId: tenant.id, title: companyData.slogan, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80', actionUrl: '/projects', actionText: 'Xem du an', sortOrder: 1, isActive: true } });
  await prisma.lead.create({ data: { tenantId: tenant.id, fullName: 'Nguyen Minh Tu', phone: '0901234567', source: 'FORM', status: 'NEW', note: 'Quan tam can ho 3PN' } });
  await prisma.lead.create({ data: { tenantId: tenant.id, fullName: 'Tran Thi Lan', phone: '0987654321', source: 'FORM', status: 'CONTACTED' } });
  console.log('  [OK] Tenant "' + name + '" (' + subdomain + '.platformbds.vn) ACTIVE');
  return tenant;
}

async function main() {
  console.log('\nPlatformBDS -- Developer Seed\n');
  console.log('Xoa du lieu cu...');
  await prisma.webhookDelivery.deleteMany({});
  await prisma.tenantWebhook.deleteMany({});
  await prisma.tenantApiKey.deleteMany({});
  await prisma.leadActivity.deleteMany({});
  await prisma.leadNote.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.contentVersion.deleteMany({});
  await prisma.tenantSection.deleteMany({});
  await prisma.tenantPage.deleteMany({});
  await prisma.tenantThemeSettings.deleteMany({});
  await prisma.tenantDomainSettings.deleteMany({});
  await prisma.mediaRecycleBin.deleteMany({});
  await prisma.mediaUsage.deleteMany({});
  await prisma.mediaAsset.deleteMany({});
  await prisma.mediaFolder.deleteMany({});
  await prisma.tenantMembership.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.demoSession.deleteMany({});
  await prisma.contactFormSubmission.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.customerProfile.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.companyInfo.deleteMany({});
  await prisma.seoConfig.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.templateDraft.deleteMany({});
  await prisma.templateVersion.deleteMany({});
  await prisma.templateConfig.deleteMany({});
  await prisma.template.deleteMany({});
  console.log('  [OK] Xoa xong\n');

  console.log('Tao Template...');
  const template = await prisma.template.create({ data: { id: 'template-luxury-gold', name: 'Luxury Gold Style', slug: 'luxury-gold', description: 'Giao dien phong cach hoang gia', shortDescription: 'Luxury Gold Style', priceBuy: 3900000, priceRentMonthly: 399000, isActive: true, sortOrder: 1 } });
  await prisma.templateConfig.create({ data: { templateId: template.id, themeConfig: { colorPrimary: '#C5A572', colorSecondary: '#1A1A2E', fontHeading: 'Playfair Display', fontBody: 'Plus Jakarta Sans' }, layoutConfig: { header: 'sticky', homeSections: ['hero','featured_projects','about','stats','cta','contact'] }, featureFlags: { enableBlog: true, enableLeadCRM: true } } });
  await prisma.templateVersion.create({ data: { templateId: template.id, version: 1, updateNotes: 'Luxury Gold Style v1.0', themeConfig: {}, layoutConfig: {}, featureFlags: {} } });
  console.log('  [OK] Template: ' + template.name + '\n');

  console.log('Tao tai khoan...');
  const pw = await bcrypt.hash('123456', 10);
  await prisma.user.create({ data: { email: 'admin@platformbds.vn', passwordHash: pw, fullName: 'Admin PlatformBDS', role: 'SUPER_ADMIN', isActive: true } });
  const customer = await prisma.user.create({ data: { email: 'customer@platformbds.vn', passwordHash: pw, fullName: 'Nguyen Van Khach', phone: '0983312219', role: 'TENANT_OWNER', isActive: true } });
  console.log('  [OK] admin@platformbds.vn (SUPER_ADMIN)');
  console.log('  [OK] customer@platformbds.vn (TENANT_OWNER)\n');

  console.log('Provision Tenant 1: Hoang Gia Land...');
  const hglTenant = await provisionTenant({ userId: customer.id, name: 'Hoang Gia Land', slug: 'hoanggialand', subdomain: 'hoanggialand', templateId: template.id, isPrimary: true, theme: LUXURY_THEME, companyData: { name: 'Hoang Gia Land', slogan: 'Nang Tam Khong Gian Song Thuong Luu', description: 'Don vi moi gioi bat dong san hang sang tai Viet Nam.', logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/hoanggia-logo.png', phone: '0901234567', email: 'info@hoanggialand.vn', address: 'Diamond Plaza, 34 Le Duan, Q1, TP.HCM', facebook: 'https://facebook.com/hoanggialand', youtube: 'https://youtube.com/hoanggialand', zalo: '0901234567' } });

  const seedDir = path.join(process.cwd(), '../../seed');
  if (fs.existsSync(path.join(seedDir, 'projects.json'))) {
    const projectsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'projects.json'), 'utf-8'));
    const hglProjects = projectsData.filter((p: any) => p.companySlug === 'hoanggialand');
    for (const proj of hglProjects) {
      await prisma.project.create({ data: { tenantId: hglTenant.id, title: proj.title, slug: proj.slug, description: proj.description || '', type: (proj.type as ProjectType) || 'APARTMENT', status: (proj.status as ProjectStatus) || 'SELLING', price: proj.price, priceFrom: proj.priceFrom ? BigInt(proj.priceFrom) : null, priceTo: proj.priceTo ? BigInt(proj.priceTo) : null, address: proj.address, district: proj.district, city: proj.city, images: proj.images || [], thumbnail: proj.thumbnail || '', featured: proj.featured || false, published: true, publishedAt: new Date() } });
    }
    const postsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'posts.json'), 'utf-8'));
    const catP = await prisma.category.create({ data: { tenantId: hglTenant.id, name: 'Tin Tuc Du An', slug: 'tin-tuc-du-an', sortOrder: 1 } });
    const catM = await prisma.category.create({ data: { tenantId: hglTenant.id, name: 'Thi Truong BDS', slug: 'thi-truong-bds', sortOrder: 2 } });
    const hglPosts = postsData.filter((p: any) => p.companySlug === 'hoanggialand');
    for (let i = 0; i < hglPosts.length; i++) {
      const post = hglPosts[i];
      await prisma.post.create({ data: { tenantId: hglTenant.id, title: post.title, slug: post.slug, summary: post.summary, content: post.content, thumbnail: post.thumbnail, categoryId: i % 2 === 0 ? catP.id : catM.id, published: true, publishedAt: new Date() } });
    }
    console.log('  [OK] ' + hglProjects.length + ' projects, ' + hglPosts.length + ' posts\n');
  }

  console.log('Provision Tenant 2: Green Home...');
  const ghTenant = await provisionTenant({ userId: customer.id, name: 'Green Home', slug: 'greenhome', subdomain: 'greenhome', templateId: template.id, isPrimary: false, theme: GREEN_THEME, companyData: { name: 'Green Home', slogan: 'Khong Gian Song Xanh', description: 'Green Home mang den khong gian song xanh sach hien dai.', logo: 'https://res.cloudinary.com/demo/image/upload/v1/logos/greenhome-logo.png', phone: '0908888999', email: 'info@greenhome.vn', address: 'SH-05 Vinhomes Grand Park, Q9, TP.HCM', facebook: 'https://facebook.com/greenhome', youtube: 'https://youtube.com/greenhome', zalo: '0908888999' } });
  if (fs.existsSync(path.join(seedDir, 'projects.json'))) {
    const projectsData = JSON.parse(fs.readFileSync(path.join(seedDir, 'projects.json'), 'utf-8'));
    const ghProjects = projectsData.filter((p: any) => p.companySlug === 'greenhome');
    for (const proj of ghProjects) {
      await prisma.project.create({ data: { tenantId: ghTenant.id, title: proj.title, slug: proj.slug, description: proj.description || '', type: (proj.type as ProjectType) || 'APARTMENT', status: (proj.status as ProjectStatus) || 'SELLING', price: proj.price, address: proj.address, images: proj.images || [], thumbnail: proj.thumbnail || '', published: true, publishedAt: new Date() } });
    }
    console.log('  [OK] ' + ghProjects.length + ' projects\n');
  }

  console.log('='.repeat(60));
  console.log('DEVELOPER SEED HOAN THANH');
  console.log('Tai khoan: admin@platformbds.vn / 123456  -> localhost:3002');
  console.log('Tai khoan: customer@platformbds.vn / 123456 -> localhost:3001');
  console.log('Websites: hoanggialand.platformbds.vn + greenhome.platformbds.vn');
  console.log('Database: Theme/Pages/Sections/Menu/SEO/Subscription/MediaFolder/Leads READY');
  console.log('='.repeat(60));
}

main()
  .catch((e) => { console.error('Loi seed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

