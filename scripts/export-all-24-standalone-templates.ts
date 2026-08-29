import fs from 'fs';
import path from 'path';

const TEMPLATES = [
  { num: '01', slug: 'luxury-gold', name: 'Luxury Gold Style', compFile: 'LuxuryTemplate.tsx', desc: 'Biệt thự · Penthouse · Dinh thự dát vàng hoàng gia' },
  { num: '02', slug: 'minimal-white', name: 'Minimal White Style', compFile: 'MinimalTemplate.tsx', desc: 'Apple Minimalist · Căn hộ cao cấp Bắc Âu · Tinh tế' },
  { num: '03', slug: 'modern-corporate', name: 'Modern Corporate Pro', compFile: 'CorporateTemplate.tsx', desc: 'Tập đoàn BĐS · Tổng công ty · Sàn lớn 100+ nhân sự' },
  { num: '04', slug: 'resort-paradise', name: 'Resort Paradise Style', compFile: 'ResortTemplate.tsx', desc: 'BĐS biển · Biệt thự đảo · Condotel · Second Home' },
  { num: '05', slug: 'smart-urban-city', name: 'Smart Urban City', compFile: 'ApartmentTemplate.tsx', desc: 'Căn hộ chung cư · Đại đô thị thông minh · Metro' },
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
  console.log('🚀 Bắt đầu tách 24 templates thành 24 folders độc lập hoàn chỉnh...');

  fs.mkdirSync(OUTPUT_BASE, { recursive: true });

  const designSystemContent = fs.readFileSync(DESIGN_SYSTEM_PATH, 'utf-8');

  for (const t of TEMPLATES) {
    const folderName = `${t.num}-${t.slug}`;
    const targetFolder = path.join(OUTPUT_BASE, folderName);
    console.log(`📁 Đang xuất [${t.num}/24]: ${folderName} (${t.name})...`);

    fs.mkdirSync(path.join(targetFolder, 'components'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'pages'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'styles'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'public'), { recursive: true });
    fs.mkdirSync(path.join(targetFolder, 'lib'), { recursive: true });

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

    // 9. lib/demo.ts (mock sync helper)
    const demoHelper = `export function syncDemoUrl(slug: string, path: string) {
  // Standalone mode: no iframe sync needed
}
`;
    fs.writeFileSync(path.join(targetFolder, 'lib/demo.ts'), demoHelper, 'utf-8');

    // 10. Copy and adjust Template Component -> components/TemplateComponent.tsx
    const sourceCompPath = path.join(SOURCE_COMP_DIR, t.compFile);
    let compCode = fs.readFileSync(sourceCompPath, 'utf-8');

    // Adjust relative imports
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

    // 14. README.md với hướng dẫn 1-Click Run & Push GitHub
    const readmeContent = `# ${t.name} — Standalone Real Estate Template

> **Mô tả:** ${t.desc}  
> **Mã mẫu (Slug):** \`${t.slug}\`  
> **Framework:** Next.js 15, React 19, Tailwind CSS, Lucide Icons  

---

## 🚀 1. HƯỚNG DẪN CHẠY TRÊN MÁY TÍNH (LOCAL DEV)

Mở terminal tại thư mục này và gõ các lệnh sau:

\`\`\`bash
# Bước 1: Cài đặt thư viện dependencies
npm install

# Bước 2: Khởi chạy website ở môi trường phát triển
npm run dev
\`\`\`

Truy cập: **[http://localhost:3000](http://localhost:3000)** để xem website!

---

## 🌐 2. HƯỚNG DẪN ĐẨY LÊN GITHUB CHO KHÁCH HÀNG

Khi khách hàng cần bàn giao source code trên GitHub riêng của họ:

\`\`\`bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm tất cả file mã nguồn
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: initial commit for ${t.name} real estate website"

# 4. Đổi tên nhánh sang main
git branch -M main

# 5. Gắn remote URL repository GitHub của khách
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 6. Đẩy toàn bộ source code lên GitHub
git push -u origin main
\`\`\`

---

## ⚡ 3. DEPLOY TRỰC TIẾP LÊN VERCEL / NETLIFY

1. Truy cập [https://vercel.com](https://vercel.com).
2. Chọn **Add New Project** $\\rightarrow$ Import Repository GitHub vừa push ở trên.
3. Bấm **Deploy** $\\rightarrow$ Website sẽ chạy online 24/7 chỉ sau 30 giây!

---
© BĐS Template Engine. Bản quyền thuộc về khách hàng sở hữu.
`;
    fs.writeFileSync(path.join(targetFolder, 'README.md'), readmeContent, 'utf-8');
  }

  console.log('\n🎉 ĐÃ TÁCH THÀNH CÔNG TẤT CẢ 24 TEMPLATES THÀNH 24 FOLDERS ĐỘC LẬP TẠI:');
  console.log(`👉 ${OUTPUT_BASE}`);
}

exportAll().catch(err => {
  console.error('❌ Lỗi khi xuất templates:', err);
  process.exit(1);
});
