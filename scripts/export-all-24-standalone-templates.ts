import fs from 'fs';
import path from 'path';

const TEMPLATES = [
  { num: '01', slug: 'luxury-gold', name: 'Luxury Gold Style (Dinh Thự Hoàng Gia)', compFile: 'LuxuryTemplate.tsx', desc: 'Biệt thự · Penthouse · Dinh thự dát vàng hoàng gia' },
  { num: '02', slug: 'minimal-white', name: 'Minimal White Style (Sàn Novihome)', compFile: 'MinimalTemplate.tsx', desc: 'Apple Minimalist · Căn hộ cao cấp Bắc Âu · Tinh tế' },
  { num: '03', slug: 'modern-corporate', name: 'Modern Corporate Pro (Tuấn Nhân Land)', compFile: 'CorporateTemplate.tsx', desc: 'Tập đoàn BĐS · Tổng công ty · Sàn lớn 100+ nhân sự' },
  { num: '04', slug: 'resort-paradise', name: 'Resort Paradise Style (Sunshine City)', compFile: 'ResortTemplate.tsx', desc: 'BĐS biển · Biệt thự đảo · Condotel · Second Home' },
  { num: '05', slug: 'smart-urban-city', name: 'Smart Urban City (An Viên Nha Trang)', compFile: 'UrbanTemplate.tsx', desc: 'Căn hộ chung cư · Đại đô thị thông minh · Metro' },
  { num: '06', slug: 'industrial-estate', name: 'Industrial & Logistics Park', compFile: 'IndustrialTemplate.tsx', desc: 'Khu công nghiệp · Nhà xưởng xây sẵn · Kho vận B2B' },
  { num: '07', slug: 'villa-royal-garden', name: 'Villa Royal Garden', compFile: 'VillaTemplate.tsx', desc: 'Biệt thự đơn lập sân vườn · Sơ đồ mặt bằng · 3D Tour' },
  { num: '08', slug: 'green-eco-living', name: 'Green Eco Living', compFile: 'EcoTemplate.tsx', desc: 'Đô thị sinh thái xanh · Ecopark · Chuẩn Xanh ESG' },
  { num: '09', slug: 'classic-heritage', name: 'Classic Heritage Architecture', compFile: 'ClassicTemplate.tsx', desc: 'Tân cổ điển Châu Âu · Lâu đài quý phái · Indochine' },
  { num: '10', slug: 'investment-pro-hub', name: 'Investment Pro Hub', compFile: 'InvestmentTemplate.tsx', desc: 'Phân tích tài chính BĐS · Biểu đồ giá · Máy tính ROI' },
  { num: '11', slug: 'agency-marketing-onepage', name: 'Agency Marketing OnePage', compFile: 'AgencyTemplate.tsx', desc: 'Landing page 1 trang · Tối ưu chạy Ads · Chuyển đổi cao' },
  { num: '12', slug: 'mega-developer-portal', name: 'Mega Developer Portal', compFile: 'ListingMarketplace.tsx', desc: 'Cổng thông tin Đa dự án · Quan hệ cổ đông Tập đoàn' },
  { num: '13', slug: 'auction-platform', name: 'Sàn Đấu Giá BĐS', compFile: 'AuctionTemplate.tsx', desc: 'Đấu giá trực tuyến · Countdown · Tài sản phát mãi ngân hàng' },
  { num: '14', slug: 'landplot-masterplan', name: 'Dự Án Đất Nền Phân Lô', compFile: 'LandPlotTemplate.tsx', desc: 'Đất nền phân lô · Sơ đồ quy hoạch 1/500 · Báo giá F1' },
  { num: '15', slug: 'retail-shophouse-podium', name: 'Retail & Shophouse Podium', compFile: 'RetailTemplate.tsx', desc: 'Shophouse khối đế · Mặt bằng kinh doanh · TTTM' },
  { num: '16', slug: 'personal-top-broker', name: 'Top Personal Broker', compFile: 'PersonalAgentTemplate.tsx', desc: 'Profile thương hiệu cá nhân · Môi giới triệu đô · One Page' },
  { num: '17', slug: 'portal-bds-so1', name: 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1', compFile: 'PortalListingTemplate.tsx', desc: 'Cổng tin BĐS số 1 · Mua bán & Cho thuê · Tính lãi vay' },
  { num: '18', slug: 'bds123-benthanh-portal', name: 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành', compFile: 'Bds123PortalTemplate.tsx', desc: 'Sàn Đấu Giá Bến Thành · Phân tầng khu vực · Lưới 4 cột' },
  { num: '19', slug: 'nhadatso-density-portal', name: 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số', compFile: 'NhadatsoDensityTemplate.tsx', desc: 'Mật độ cao · Lọc 6 tiêu chí · Phong thủy nhà đất' },
  { num: '20', slug: 'minhkhai-timescity', name: 'BĐS 20 — Chung Cư Minh Khai & Times City', compFile: 'MinhKhaiApartmentTemplate.tsx', desc: 'Chung cư Minh Khai · Times City · FAQ Accordion' },
  { num: '21', slug: 'hanoi-rental-portal', name: 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội', compFile: 'HanoiRentalPortalTemplate.tsx', desc: 'Cho thuê chung cư Hà Nội · 5 Quận trọng điểm · Giá tốt' },
  { num: '22', slug: 'happyland-zohotels-nhatrang', name: 'BĐS 22 — ZoHotels & Happy Land Nha Trang', compFile: 'HappyLandResortTemplate.tsx', desc: 'Căn hộ nghỉ dưỡng biển · ZoHotels · Ưu đãi 50%' },
  { num: '23', slug: 'homeo-agency-multithumb', name: 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo', compFile: 'HomeoMultiThumbnailTemplate.tsx', desc: 'Sàn nhà phố Homeo · Card đa ảnh · Cẩm nang người mua' },
  { num: '24', slug: 'realtybuild-tech-portal', name: 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam', compFile: 'RealtyBuildTechTemplate.tsx', desc: 'RealtyBuild Tech Portal · Icon Pills · 6 Thành phố lớn' },
];

function findRepoRoot(): string {
  let curr = process.cwd();
  while (curr !== path.dirname(curr)) {
    if (fs.existsSync(path.join(curr, 'pnpm-workspace.yaml'))) {
      return curr;
    }
    curr = path.dirname(curr);
  }
  return process.cwd();
}

const ROOT_DIR = findRepoRoot();
const OUTPUT_BASE = path.join(ROOT_DIR, 'standalone-templates');
const SOURCE_COMP_DIR = path.join(ROOT_DIR, 'apps/marketplace/src/components/demo/templates');
const DESIGN_SYSTEM_PATH = path.join(ROOT_DIR, 'apps/marketplace/src/components/demo/design-system.ts');

async function exportAll() {
  console.log('🚀 Bắt đầu xuất 24 templates thành các gói độc lập: Next.js + React + HTML5/CSS3/JS + PHP & MySQL...');

  fs.mkdirSync(OUTPUT_BASE, { recursive: true });

  const designSystemContent = fs.readFileSync(DESIGN_SYSTEM_PATH, 'utf-8');

  for (const t of TEMPLATES) {
    const folderName = `${t.num}-${t.slug}`;
    const targetFolder = path.join(OUTPUT_BASE, folderName);
    console.log(`📁 Đang xuất [${t.num}/24]: ${folderName} (${t.name})...`);

    // Create subfolders
    fs.mkdirSync(path.join(targetFolder, 'components'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'pages'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'styles'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'public'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'lib'), { recursive: true });
    
    // HTML5 & PHP subfolders
    const htmlDir = path.join(targetFolder, 'html');
    const phpDir = path.join(targetFolder, 'php');
    fs.mkdirSync(path.join(htmlDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(htmlDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(phpDir, 'config'), { recursive: true });
    fs.mkdirSync(path.join(phpDir, 'api'), { recursive: true });

    // 1. package.json độc lập
    const pkgJson = {
      name: `bds-${t.slug}`,
      version: '1.0.0',
      private: true,
      description: `Website Bất Động Sản Cao Cấp - Mẫu ${t.name}`,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        next: '15.1.0',
        react: '19.0.0',
        'react-dom': '19.0.0',
        'lucide-react': '^1.16.0',
        'clsx': '^2.1.1',
        'tailwind-merge': '^3.0.2',
      },
      devDependencies: {
        typescript: '^5.7.2',
        '@types/node': '^22.10.2',
        '@types/react': '^19.0.2',
        '@types/react-dom': '^19.0.2',
        tailwindcss: '^3.4.17',
        postcss: '^8.4.49',
        autoprefixer: '^10.4.20',
      },
    };
    fs.writeFileSync(path.join(targetFolder, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8');

    // 2. tsconfig.json
    const tsconfig = {
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: false,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        paths: {
          '@/*': ['./*'],
        },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
    };
    fs.writeFileSync(path.join(targetFolder, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2), 'utf-8');

    // 3. tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C5A572',
          navy: '#0F172A',
          blue: '#2563EB',
        }
      }
    },
  },
  plugins: [],
};
`;
    fs.writeFileSync(path.join(targetFolder, 'tailwind.config.js'), tailwindConfig, 'utf-8');

    // 4. postcss.config.js
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
    fs.writeFileSync(path.join(targetFolder, 'postcss.config.js'), postcssConfig, 'utf-8');

    // 5. next.config.js
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

module.exports = nextConfig;
`;
    fs.writeFileSync(path.join(targetFolder, 'next.config.js'), nextConfig, 'utf-8');

    // 6. .gitignore
    const gitignore = `node_modules
.next
out
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*.local
`;
    fs.writeFileSync(path.join(targetFolder, '.gitignore'), gitignore, 'utf-8');

    // 7. styles/globals.css
    const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
`;
    fs.writeFileSync(path.join(targetFolder, 'styles/globals.css'), globalsCss, 'utf-8');

    // 8. lib/design-system.ts
    fs.writeFileSync(path.join(targetFolder, 'lib/design-system.ts'), designSystemContent, 'utf-8');

    // 9. lib/demo.ts
    const demoHelper = `export function syncDemoUrl(slug: string, path: string) {
  // Standalone mode
}
`;
    fs.writeFileSync(path.join(targetFolder, 'lib/demo.ts'), demoHelper, 'utf-8');

    // 10. Copy and adjust Template Component
    const sourceCompPath = path.join(SOURCE_COMP_DIR, t.compFile);
    let compCode = fs.readFileSync(sourceCompPath, 'utf-8');
    compCode = compCode.replace(/from\s+['"].*?design-system['"]/g, "from '../lib/design-system'");
    compCode = compCode.replace(/from\s+['"].*?demo['"]/g, "from '../lib/demo'");

    fs.writeFileSync(path.join(targetFolder, 'components/TemplateComponent.tsx'), compCode, 'utf-8');

    // 11. pages/_app.tsx
    const appTsx = `import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
`;
    fs.writeFileSync(path.join(targetFolder, 'pages/_app.tsx'), appTsx, 'utf-8');

    // 12. pages/_document.tsx
    const docTsx = `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
    fs.writeFileSync(path.join(targetFolder, 'pages/_document.tsx'), docTsx, 'utf-8');

    // 13. pages/index.tsx
    const indexTsx = `import Head from 'next/head';
import TemplateComponent from '@/components/TemplateComponent';

export default function HomePage() {
  const templateConfig = {
    name: '${t.name}',
    slug: '${t.slug}',
    collectionSlug: '${t.slug}',
  };

  return (
    <>
      <Head>
        <title>${t.name} — Bất Động Sản Cao Cấp</title>
        <meta name="description" content="${t.desc}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <TemplateComponent template={templateConfig} />
      </main>
    </>
  );
}
`;
    fs.writeFileSync(path.join(targetFolder, 'pages/index.tsx'), indexTsx, 'utf-8');

    // ─────────────────────────────────────────────────────────────
    // 14. TẠO GÓI THUẦN HTML5 + CSS3 + JAVASCRIPT ĐƠN GIẢN
    // ─────────────────────────────────────────────────────────────
    const htmlIndexContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name} — Website Bất Động Sản Chuyên Nghiệp</title>
  <meta name="description" content="${t.desc}">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between">

  <!-- Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2 font-black text-xl text-blue-600">
        <span>BĐS ${t.name}</span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-xs font-bold uppercase text-slate-700">
        <a href="index.html" class="text-blue-600">Trang Chủ</a>
        <a href="#san-pham" class="hover:text-blue-600">Sản Phẩm</a>
        <a href="#du-an" class="hover:text-blue-600">Dự Án</a>
        <a href="#tin-tuc" class="hover:text-blue-600">Tin Tức</a>
        <a href="#lien-he" class="hover:text-blue-600">Liên Hệ</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="tel:0909123456" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow transition">
          📞 0909.123.456
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="flex-1 w-full space-y-12 pb-16">
    <section class="relative py-20 px-4 bg-slate-900 text-white text-center">
      <div class="max-w-4xl mx-auto space-y-4">
        <span class="px-3.5 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/40 text-xs font-bold uppercase tracking-widest inline-block">
          MẪU GIAO DIỆN ${t.name.toUpperCase()}
        </span>
        <h1 class="text-3xl sm:text-5xl font-black uppercase leading-tight font-serif">
          ${t.name}
        </h1>
        <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          ${t.desc} — Giải pháp website bất động sản tối ưu chuẩn SEO, tải nhanh và dễ dàng sử dụng.
        </p>
        <div class="pt-4 flex justify-center gap-3">
          <a href="#san-pham" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-full shadow">
            Xem Sản Phẩm ›
          </a>
          <a href="#lien-he" class="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase rounded-full">
            Đăng Ký Tư Vấn
          </a>
        </div>
      </div>
    </section>

    <!-- Danh Sách BĐS -->
    <section id="san-pham" class="max-w-7xl mx-auto px-4 space-y-6">
      <div class="text-center space-y-1">
        <h2 class="text-2xl font-black text-slate-900 uppercase">SẢN PHẨM BẤT ĐỘNG SẢN NỔI BẬT</h2>
        <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="property-list">
        <!-- Javascript renders cards here or static cards -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition">
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-2">
            <h3 class="font-bold text-sm text-slate-900">Biệt Thự Nghỉ Dưỡng Cao Cấp</h3>
            <p class="text-xs text-slate-500">Vị trí đắc địa, sổ hồng riêng chính chủ</p>
            <div class="flex justify-between items-center pt-2 border-t text-xs">
              <span class="font-black text-blue-600 text-sm">4.5 Tỷ VNĐ</span>
              <span class="text-slate-500">250 m²</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-2">
            <h3 class="font-bold text-sm text-slate-900">Nhà Phố Mặt Tiền Thương Mại</h3>
            <p class="text-xs text-slate-500">Thuận tiện kinh doanh showroom, văn phòng</p>
            <div class="flex justify-between items-center pt-2 border-t text-xs">
              <span class="font-black text-blue-600 text-sm">6.8 Tỷ VNĐ</span>
              <span class="text-slate-500">120 m²</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-2">
            <h3 class="font-bold text-sm text-slate-900">Đất Nền Phân Lô Sổ Đỏ Trao Tay</h3>
            <p class="text-xs text-slate-500">Hạ tầng đồng bộ điện âm nước máy</p>
            <div class="flex justify-between items-center pt-2 border-t text-xs">
              <span class="font-black text-blue-600 text-sm">1.8 Tỷ VNĐ</span>
              <span class="text-slate-500">100 m²</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Liên Hệ -->
    <section id="lien-he" class="max-w-4xl mx-auto px-4">
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
        <h3 class="text-xl font-black text-slate-900 text-center uppercase">LIÊN HỆ & TƯ VẤN BÁO GIÁ</h3>
        <form id="contact-form" class="space-y-3 text-xs">
          <input type="text" id="name" placeholder="Họ và tên của bạn (*)" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl">
          <input type="tel" id="phone" placeholder="Số điện thoại / Zalo (*)" required class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-blue-600">
          <textarea id="message" rows="3" placeholder="Nội dung cần tư vấn..." class="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl"></textarea>
          <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow transition">
            GỬI YÊU CẦU TƯ VẤN
          </button>
        </form>
      </div>
    </section>
  </main>

    <!-- Footer HTML -->
  <footer class="w-full bg-[#07132B] text-slate-300 text-xs pt-12 pb-6 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
      <!-- Cột 1: THÔNG TIN LIÊN HỆ ADMIN -->
      <div class="md:col-span-5 space-y-3">
        <h4 class="font-black text-sm text-white uppercase tracking-wider">
          <span class="text-[#0084FF]">TEMPLATES</span><span class="text-white">BDS</span>
        </h4>
        <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
          Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
        </p>
        <div class="space-y-1.5 text-xs text-slate-300 pt-1">
          <div>📍 Địa chỉ: <strong class="text-white font-medium">180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong></div>
          <div>📞 Hotline 1: <a href="tel:0919006030" class="text-white font-bold font-mono hover:text-blue-400">0919 006 030</a></div>
          <div>📞 Hotline 2: <a href="tel:0983312219" class="text-white font-bold font-mono hover:text-emerald-400">0983 312 219</a> (24/7)</div>
          <div>✉️ Email: <a href="mailto:ntrungz0704@gmail.com" class="text-white hover:text-blue-400">ntrungz0704@gmail.com</a></div>
          <div>⏰ Giờ làm việc: <strong class="text-white font-medium">8:00 - 20:00 (T2 - CN)</strong></div>
        </div>
      </div>

      <!-- Cột 2: VỀ CHÚNG TÔI -->
      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="index.html" class="hover:text-blue-400">Trang chủ</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Sản phẩm BĐS</a></div>
          <div><a href="#du-an" class="hover:text-blue-400">Dự án mới</a></div>
          <div><a href="#tin-tuc" class="hover:text-blue-400">Tin tức & Sự kiện</a></div>
          <div><a href="#lien-he" class="hover:text-blue-400">Liên hệ tư vấn</a></div>
        </div>
      </div>

      <!-- Cột 3: DANH MỤC BĐS -->
      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">DANH MỤC</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="#san-pham" class="hover:text-blue-400">Đất dự án</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Đất nền phân lô</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Biệt thự view biển</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Nhà phố thương mại</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Nhà cho thuê</a></div>
        </div>
      </div>

      <!-- Cột 4: CHÍNH SÁCH -->
      <div class="md:col-span-3 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">CHÍNH SÁCH</h4>
        <div class="space-y-2 text-slate-400 text-xs">
          <div>• Bàn giao 100% mã nguồn sạch</div>
          <div>• Bảo hành & Hỗ trợ kỹ thuật trọn đời</div>
          <div>• Hỗ trợ cài đặt lên Hosting cPanel / XAMPP</div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 pt-6 text-center text-[11px] text-slate-400">
      <p>© 2026 Bản quyền thuộc về <strong class="text-white">TEMPLATEBDS</strong> — Mẫu Giao Diện: ${t.name}.</p>
    </div>
  </footer>

  <script src="js/main.js"></script>
  <script>lucide.createIcons();</script>
</body>
</html>`;
    fs.writeFileSync(path.join(htmlDir, 'index.html'), htmlIndexContent, 'utf-8');

    const htmlCssContent = `/* CSS3 Custom Stylesheet for ${t.name} */
html { scroll-behavior: smooth; }
body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
.card-hover:hover { transform: translateY(-4px); transition: all 0.3s ease; }
`;
    fs.writeFileSync(path.join(htmlDir, 'css/style.css'), htmlCssContent, 'utf-8');

    const htmlJsContent = `// JavaScript logic for ${t.name}
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  alert('🎉 Cảm ơn quý khách ' + name + ' (' + phone + ')! Chuyên viên tư vấn sẽ liên hệ lại trong ít phút.');
  this.reset();
});
`;
    fs.writeFileSync(path.join(htmlDir, 'js/main.js'), htmlJsContent, 'utf-8');

    // ─────────────────────────────────────────────────────────────
    // 15. TẠO GÓI PHP + MYSQL ĐẦY ĐỦ ĐỂ CHẠY XAMPP / CPANEL
    // ─────────────────────────────────────────────────────────────
    const dbConfigPhp = `<?php
// Cấu hình kết nối MySQL Database cho ${t.name}
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds_${t.slug.replace(/-/g, '_')}';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Nếu chưa tạo database MySQL thì chạy dữ liệu demo mẫu
    $pdo = null;
}
`;
    fs.writeFileSync(path.join(phpDir, 'config/db.php'), dbConfigPhp, 'utf-8');

    const sqlSchema = `-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE ${t.name.toUpperCase()} (BDS-${t.num})
-- Tạo database: bds_${t.slug.replace(/-/g, '_')}
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`bds_${t.slug.replace(/-/g, '_')}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`bds_${t.slug.replace(/-/g, '_')}\`;

-- Bảng lưu danh sách Bất Động Sản
CREATE TABLE IF NOT EXISTS \`properties\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`price\` VARCHAR(100) NOT NULL,
  \`area\` VARCHAR(50) NOT NULL,
  \`location\` VARCHAR(255) NOT NULL,
  \`image\` TEXT NOT NULL,
  \`description\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu
INSERT INTO \`properties\` (\`title\`, \`slug\`, \`price\`, \`area\`, \`location\`, \`image\`, \`description\`) VALUES
('Biệt thự sang trọng view thoáng mát', 'biet-thu-view-thoang-mat', '5.5 Tỷ VNĐ', '300 m²', 'Khu Đô Thị Mới', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Biệt thự thiết kế hiện đại sang trọng, đầy đủ tiện nghi.'),
('Nhà phố mặt tiền thương mại kinh doanh', 'nha-pho-mat-tien-kinh-doanh', '8.2 Tỷ VNĐ', '140 m²', 'Trung tâm thành phố', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Thuận tiện mở văn phòng, spa hoặc showroom kinh doanh.'),
('Đất nền phân lô sổ đỏ sẵn sàng công chứng', 'dat-nen-phan-lo-so-do', '1.9 Tỷ VNĐ', '120 m²', 'Khu dân cư hiện hữu', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'Hạ tầng hoàn thiện điện âm nước máy, xây dựng tự do.');

-- Bảng lưu thông tin khách hàng gửi từ Form liên hệ
CREATE TABLE IF NOT EXISTS \`contacts\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(100),
  \`message\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
    fs.writeFileSync(path.join(phpDir, 'database.sql'), sqlSchema, 'utf-8');

    const phpIndex = `<?php
require_once 'config/db.php';

// Lấy danh sách BĐS từ MySQL nếu có kết nối, hoặc dùng mảng demo
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id DESC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['title' => 'Biệt thự sang trọng view thoáng mát', 'slug' => 'biet-thu-view-thoang-mat', 'price' => '5.5 Tỷ VNĐ', 'area' => '300 m²', 'location' => 'Khu Đô Thị Mới', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
        ['title' => 'Nhà phố mặt tiền thương mại kinh doanh', 'slug' => 'nha-pho-mat-tien-kinh-doanh', 'price' => '8.2 Tỷ VNĐ', 'area' => '140 m²', 'location' => 'Trung tâm thành phố', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
        ['title' => 'Đất nền phân lô sổ đỏ sẵn sàng công chứng', 'slug' => 'dat-nen-phan-lo-so-do', 'price' => '1.9 Tỷ VNĐ', 'area' => '120 m²', 'location' => 'Khu dân cư hiện hữu', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name} — Website Bất Động Sản PHP & MySQL</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between">

  <!-- Header PHP -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.php" class="font-black text-xl text-blue-600 uppercase">
        ${t.name}
      </a>
      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full space-y-12 pb-16">
    <section class="py-16 px-4 bg-slate-900 text-white text-center">
      <h1 class="text-3xl sm:text-5xl font-black uppercase mb-4">${t.name}</h1>
      <p class="text-slate-300 max-w-xl mx-auto text-sm">${t.desc}</p>
    </section>

    <!-- Danh sách BĐS từ MySQL -->
    <section class="max-w-7xl mx-auto px-4 space-y-6">
      <h2 class="text-2xl font-black text-slate-900 uppercase text-center">DANH SÁCH BẤT ĐỘNG SẢN</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php foreach ($properties as $item): ?>
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition">
            <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="" class="w-full h-48 object-cover">
            <div class="p-4 space-y-2">
              <h3 class="font-bold text-sm text-slate-900"><?php echo htmlspecialchars($item['title']); ?></h3>
              <p class="text-xs text-slate-500"><?php echo htmlspecialchars($item['location']); ?></p>
              <div class="flex justify-between items-center pt-2 border-t text-xs">
                <span class="font-black text-blue-600 text-sm"><?php echo htmlspecialchars($item['price']); ?></span>
                <span class="text-slate-500"><?php echo htmlspecialchars($item['area']); ?></span>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- Form Liên Hệ PHP -->
    <section class="max-w-3xl mx-auto px-4">
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <h3 class="text-lg font-black text-slate-900 uppercase text-center">GỬI YÊU CẦU TƯ VẤN</h3>
        <form action="api/contact.php" method="POST" class="space-y-3 text-xs">
          <input type="text" name="name" placeholder="Họ và tên (*)" required class="w-full p-3 bg-slate-50 border rounded-xl">
          <input type="tel" name="phone" placeholder="Số điện thoại (*)" required class="w-full p-3 bg-slate-50 border rounded-xl font-bold text-blue-600">
          <textarea name="message" rows="3" placeholder="Nội dung cần tư vấn..." class="w-full p-3 bg-slate-50 border rounded-xl"></textarea>
          <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl">
            GỬI THÔNG TIN
          </button>
        </form>
      </div>
    </section>
  </main>

  <!-- Footer PHP -->
  <footer class="w-full bg-[#07132B] text-slate-300 text-xs pt-12 pb-6 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
      <div class="md:col-span-5 space-y-3">
        <h4 class="font-black text-sm text-white uppercase tracking-wider">
          <span class="text-[#0084FF]">TEMPLATES</span><span class="text-white">BDS</span>
        </h4>
        <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
          Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
        </p>
        <div class="space-y-1.5 text-xs text-slate-300 pt-1">
          <div>📍 Địa chỉ: <strong class="text-white font-medium">180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong></div>
          <div>📞 Hotline 1: <a href="tel:0919006030" class="text-white font-bold font-mono hover:text-blue-400">0919 006 030</a></div>
          <div>📞 Hotline 2: <a href="tel:0983312219" class="text-white font-bold font-mono hover:text-emerald-400">0983 312 219</a> (24/7)</div>
          <div>✉️ Email: <a href="mailto:ntrungz0704@gmail.com" class="text-white hover:text-blue-400">ntrungz0704@gmail.com</a></div>
          <div>⏰ Giờ làm việc: <strong class="text-white font-medium">8:00 - 20:00 (T2 - CN)</strong></div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="index.php" class="hover:text-blue-400">Trang chủ</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Sản phẩm BĐS</a></div>
          <div><a href="#du-an" class="hover:text-blue-400">Dự án mới</a></div>
          <div><a href="#tin-tuc" class="hover:text-blue-400">Tin tức & Sự kiện</a></div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">DANH MỤC</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="#san-pham" class="hover:text-blue-400">Đất dự án</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Đất nền</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Biệt thự biển</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Nhà phố</a></div>
        </div>
      </div>

      <div class="md:col-span-3 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">CHÍNH SÁCH</h4>
        <div class="space-y-2 text-slate-400 text-xs">
          <div>• Bàn giao 100% mã nguồn sạch</div>
          <div>• Bảo hành & Hỗ trợ kỹ thuật trọn đời</div>
          <div>• Hỗ trợ cài đặt lên Hosting cPanel / XAMPP</div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 pt-6 text-center text-[11px] text-slate-400">
      <p>© 2026 Bản quyền thuộc về <strong class="text-white">TEMPLATEBDS</strong> — Mẫu Giao Diện: BDS-${t.num}.</p>
    </div>
  </footer>

</body>
</html>`;
    fs.writeFileSync(path.join(phpDir, 'index.php'), phpIndex, 'utf-8');

    const phpContactApi = `<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!empty($name) && !empty($phone)) {
        if ($pdo) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, message) VALUES (?, ?, ?)");
            $stmt->execute([$name, $phone, $message]);
        }
        echo "<script>
            alert('🎉 Gửi thông tin thành công! Chuyên viên sẽ liên hệ lại với quý khách trong ít phút.');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
`;
    fs.writeFileSync(path.join(phpDir, 'api/contact.php'), phpContactApi, 'utf-8');

    const phpGuide = `# HƯỚNG DẪN CÀI ĐẶT WEBSITE BẤT ĐỘNG SẢN BẰNG PHP & MYSQL

## 1. Cài đặt trên máy tính với XAMPP / Laragon
1. Tải và cài đặt phần mềm **XAMPP** hoặc **Laragon**.
2. Copy toàn bộ thư mục \`php\` này vào thư mục \`htdocs\` của XAMPP (VD: \`C:/xampp/htdocs/bds-${t.num}\`).
3. Mở **phpMyAdmin** (\`http://localhost/phpmyadmin\`).
4. Tạo database mới tên: \`bds_${t.slug.replace(/-/g, '_')}\`.
5. Chọn tab **Import (Nhập)** và chọn file \`database.sql\` nằm trong thư mục này để nạp dữ liệu.
6. Mở trình duyệt và truy cập: \`http://localhost/bds-${t.num}\` để xem website hoạt động!

## 2. Cài đặt trên Hosting (cPanel / DirectAdmin)
1. Đăng nhập vào cPanel Hosting của bạn.
2. Mở **MySQL Database Wizard** để tạo Database và User.
3. Mở **phpMyAdmin** trên cPanel và Import file \`database.sql\`.
4. Upload toàn bộ các file trong thư mục \`php\` lên thư mục \`public_html\`.
5. Sửa thông tin tài khoản Database trong file \`config/db.php\` cho khớp với hosting.
6. Truy cập tên miền của bạn để hoàn tất!
`;
    fs.writeFileSync(path.join(phpDir, 'HUONG_DAN_CAI_DAT_XAMPP_CPANEL.md'), phpGuide, 'utf-8');

    // 16. README.md cập nhật cả 3 gói
    const readmeContent = `# ${t.name} — Trọn Bộ Mã Nguồn Website BĐS Chuyên Nghiệp

> **Mô tả:** ${t.desc}  
> **Mã mẫu (Slug):** \`bds-${t.num}\` (\`${t.slug}\`)  

---

## 📦 BỘ MÃ NGUỒN NÀY BAO GỒM 3 GÓI HOÀN CHỈNH:

1. **Gói 1: HTML5 + CSS3 + Vanilla JavaScript thuần** (Nằm trong thư mục \`html/\`)
   - Mở trực tiếp file \`index.html\` trên bất kỳ trình duyệt nào mà không cần cài đặt gì.
   
2. **Gói 2: PHP + MySQL Database** (Nằm trong thư mục \`php/\`)
   - Chạy trên mọi hosting cPanel, DirectAdmin, XAMPP, Laragon.
   - Có sẵn file \`database.sql\` và form lưu liên hệ khách hàng vào MySQL.

3. **Gói 3: Next.js + React + Tailwind CSS hiện đại** (Nằm tại thư mục gốc)
   - Chạy lệnh \`npm install\` và \`npm run dev\` để khởi chạy.
   - Deploy 1-Click lên Vercel / Netlify.

---
© BĐS Template Engine. Bản quyền thuộc về TEMPLATEBDS.
`;
    fs.writeFileSync(path.join(targetFolder, 'README.md'), readmeContent, 'utf-8');
  }

  console.log('\n🎉 ĐÃ XUẤT THÀNH CÔNG TẤT CẢ 24 TEMPLATES ĐẦY ĐỦ 3 GÓI TẠI:');
  console.log(`👉 ${OUTPUT_BASE}`);
}

exportAll().catch(err => {
  console.error('❌ Lỗi khi xuất templates:', err);
  process.exit(1);
});
