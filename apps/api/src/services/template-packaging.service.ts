import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { logger } from '../index';

export interface PackageOptions {
  slug: string;
  orderNumber?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export const TEMPLATE_SLUG_MAP: Record<string, { componentName: string; fileName: string; templateName: string }> = {
  'luxury-gold': { componentName: 'LuxuryTemplate', fileName: 'LuxuryTemplate.tsx', templateName: 'Luxury Gold Style' },
  'minimal-white': { componentName: 'MinimalTemplate', fileName: 'MinimalTemplate.tsx', templateName: 'Minimal White Style' },
  'minimal-zen': { componentName: 'MinimalTemplate', fileName: 'MinimalTemplate.tsx', templateName: 'Minimalist Zen Style' },
  'modern-corporate': { componentName: 'CorporateTemplate', fileName: 'CorporateTemplate.tsx', templateName: 'Modern Corporate' },
  'resort-paradise': { componentName: 'ResortTemplate', fileName: 'ResortTemplate.tsx', templateName: 'Resort Paradise' },
  'ocean-view': { componentName: 'ResortTemplate', fileName: 'ResortTemplate.tsx', templateName: 'Ocean View Panorama' },
  'urban-city': { componentName: 'ApartmentTemplate', fileName: 'ApartmentTemplate.tsx', templateName: 'Urban City Style' },
  'smart-urban': { componentName: 'ApartmentTemplate', fileName: 'ApartmentTemplate.tsx', templateName: 'Smart Urban City' },
  'high-rise': { componentName: 'ApartmentTemplate', fileName: 'ApartmentTemplate.tsx', templateName: 'High-Rise Skyscraper' },
  'industrial-estate': { componentName: 'IndustrialTemplate', fileName: 'IndustrialTemplate.tsx', templateName: 'Industrial Estate' },
  'industrial-logistics': { componentName: 'IndustrialTemplate', fileName: 'IndustrialTemplate.tsx', templateName: 'Industrial & Logistics' },
  'villa-premium': { componentName: 'VillaTemplate', fileName: 'VillaTemplate.tsx', templateName: 'Villa Premium Style' },
  'luxury-villa': { componentName: 'VillaTemplate', fileName: 'VillaTemplate.tsx', templateName: 'Luxury Villa Compound' },
  'modern-villa': { componentName: 'VillaTemplate', fileName: 'VillaTemplate.tsx', templateName: 'Modern Villa & Resort' },
  'eco-green': { componentName: 'EcoTemplate', fileName: 'EcoTemplate.tsx', templateName: 'Eco Green Living' },
  'eco-living': { componentName: 'EcoTemplate', fileName: 'EcoTemplate.tsx', templateName: 'Eco Living Natural' },
  'green-eco': { componentName: 'EcoTemplate', fileName: 'EcoTemplate.tsx', templateName: 'Green Eco Nature' },
  'classic-elegant': { componentName: 'ClassicTemplate', fileName: 'ClassicTemplate.tsx', templateName: 'Classic Elegant Style' },
  'classic-heritage': { componentName: 'ClassicTemplate', fileName: 'ClassicTemplate.tsx', templateName: 'Classic Heritage' },
  'heritage-classic': { componentName: 'ClassicTemplate', fileName: 'ClassicTemplate.tsx', templateName: 'Heritage Classic Architecture' },
  'investment-pro': { componentName: 'InvestmentTemplate', fileName: 'InvestmentTemplate.tsx', templateName: 'Investment Pro Hub' },
  'tech-hub': { componentName: 'InvestmentTemplate', fileName: 'InvestmentTemplate.tsx', templateName: 'Future Tech City Hub' },
  'agency-onepage': { componentName: 'AgencyTemplate', fileName: 'AgencyTemplate.tsx', templateName: 'Agency Marketing OnePage' },
  'suburban-family': { componentName: 'AgencyTemplate', fileName: 'AgencyTemplate.tsx', templateName: 'Suburban Family Living' },
  'mega-developer': { componentName: 'ListingMarketplace', fileName: 'ListingMarketplace.tsx', templateName: 'Mega Developer Portal' },
  'listing-portal': { componentName: 'ListingMarketplace', fileName: 'ListingMarketplace.tsx', templateName: 'Listing Marketplace Portal' },
  'riverside-mansion': { componentName: 'ListingMarketplace', fileName: 'ListingMarketplace.tsx', templateName: 'Riverside Grand Mansion' },
  'auction-template': { componentName: 'AuctionTemplate', fileName: 'AuctionTemplate.tsx', templateName: 'Sàn Đấu Giá BĐS' },
  'auction-bds': { componentName: 'AuctionTemplate', fileName: 'AuctionTemplate.tsx', templateName: 'Auction BĐS & Bidding' },
  'lake-sanctuary': { componentName: 'AuctionTemplate', fileName: 'AuctionTemplate.tsx', templateName: 'Lake Sanctuary Living' },
  'landplot-template': { componentName: 'LandPlotTemplate', fileName: 'LandPlotTemplate.tsx', templateName: 'Dự Án Đất Nền Phân Lô' },
  'land-plot': { componentName: 'LandPlotTemplate', fileName: 'LandPlotTemplate.tsx', templateName: 'Land Plot Masterplan' },
  'mountain-retreat': { componentName: 'LandPlotTemplate', fileName: 'LandPlotTemplate.tsx', templateName: 'Highland Mountain Retreat' },
  'retail-podium': { componentName: 'RetailTemplate', fileName: 'RetailTemplate.tsx', templateName: 'Retail Podium Shophouse' },
  'retail-commercial': { componentName: 'RetailTemplate', fileName: 'RetailTemplate.tsx', templateName: 'Retail Commercial Plaza' },
  'commercial-plaza': { componentName: 'RetailTemplate', fileName: 'RetailTemplate.tsx', templateName: 'Commercial & Shopping Plaza' },
  'personal-agent': { componentName: 'PersonalAgentTemplate', fileName: 'PersonalAgentTemplate.tsx', templateName: 'Top Personal Broker' },
  'golf-residences': { componentName: 'PersonalAgentTemplate', fileName: 'PersonalAgentTemplate.tsx', templateName: 'Elite Golf Residences' },
  'bds-17': { componentName: 'PortalListingTemplate', fileName: 'PortalListingTemplate.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'portal-listing': { componentName: 'PortalListingTemplate', fileName: 'PortalListingTemplate.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'vietnam-portal': { componentName: 'PortalListingTemplate', fileName: 'PortalListingTemplate.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'bds-18': { componentName: 'Bds123PortalTemplate', fileName: 'Bds123PortalTemplate.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'bds123-portal': { componentName: 'Bds123PortalTemplate', fileName: 'Bds123PortalTemplate.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'benthanh-portal': { componentName: 'Bds123PortalTemplate', fileName: 'Bds123PortalTemplate.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'bds-19': { componentName: 'NhadatsoDensityTemplate', fileName: 'NhadatsoDensityTemplate.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'nhadatso-density': { componentName: 'NhadatsoDensityTemplate', fileName: 'NhadatsoDensityTemplate.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'nhadatso-portal': { componentName: 'NhadatsoDensityTemplate', fileName: 'NhadatsoDensityTemplate.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'bds-20': { componentName: 'MinhKhaiApartmentTemplate', fileName: 'MinhKhaiApartmentTemplate.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'minhkhai-apartment': { componentName: 'MinhKhaiApartmentTemplate', fileName: 'MinhKhaiApartmentTemplate.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'minhkhai-luxury': { componentName: 'MinhKhaiApartmentTemplate', fileName: 'MinhKhaiApartmentTemplate.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'bds-21': { componentName: 'HanoiRentalPortalTemplate', fileName: 'HanoiRentalPortalTemplate.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'hanoi-rental': { componentName: 'HanoiRentalPortalTemplate', fileName: 'HanoiRentalPortalTemplate.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'chothue-hanoi': { componentName: 'HanoiRentalPortalTemplate', fileName: 'HanoiRentalPortalTemplate.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'bds-22': { componentName: 'HappyLandResortTemplate', fileName: 'HappyLandResortTemplate.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'happyland-resort': { componentName: 'HappyLandResortTemplate', fileName: 'HappyLandResortTemplate.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'zohotels-resort': { componentName: 'HappyLandResortTemplate', fileName: 'HappyLandResortTemplate.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'bds-23': { componentName: 'HomeoMultiThumbnailTemplate', fileName: 'HomeoMultiThumbnailTemplate.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'homeo-multithumb': { componentName: 'HomeoMultiThumbnailTemplate', fileName: 'HomeoMultiThumbnailTemplate.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'homeo-agency': { componentName: 'HomeoMultiThumbnailTemplate', fileName: 'HomeoMultiThumbnailTemplate.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'bds-24': { componentName: 'RealtyBuildTechTemplate', fileName: 'RealtyBuildTechTemplate.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
  'realtybuild-tech': { componentName: 'RealtyBuildTechTemplate', fileName: 'RealtyBuildTechTemplate.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
  'realtybuild-portal': { componentName: 'RealtyBuildTechTemplate', fileName: 'RealtyBuildTechTemplate.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
};

export class TemplatePackagingService {
  /**
   * Tạo gói ZIP mã nguồn Next.js độc lập riêng biệt cho đúng template mà khách hàng đã mua
   */
  public static async generateStandalonePackage(options: PackageOptions): Promise<{ buffer: Buffer; fileName: string }> {
    const { slug, orderNumber = 'ORD', customerName = 'Khách Hàng', customerPhone = '', customerEmail = '' } = options;

    const tplInfo = TEMPLATE_SLUG_MAP[slug] || {
      componentName: 'LuxuryTemplate',
      fileName: 'LuxuryTemplate.tsx',
      templateName: slug.toUpperCase(),
    };

    const zip = new AdmZip();

    // 1. Tìm đường dẫn gốc của apps/website
    const possibleWebsiteDirs = [
      path.resolve(__dirname, '../../../website'),
      path.resolve(__dirname, '../../../../apps/website'),
      path.resolve(process.cwd(), 'apps/website'),
      path.resolve(process.cwd(), '../website'),
      path.resolve(process.cwd(), 'website'),
    ];
    const websiteDir = possibleWebsiteDirs.find((d) => fs.existsSync(d));

    if (!websiteDir) {
      throw new Error('Không tìm thấy thư mục mã nguồn website trên máy chủ.');
    }

    // 2. Tạo package.json độc lập (chuẩn NPM, không bị lỗi workspace:*)
    const packageJsonContent = JSON.stringify(
      {
        name: `bds-template-${slug}`,
        version: '1.0.0',
        private: true,
        description: `Website Bất Động Sản mẫu ${tplInfo.templateName} - Bản quyền PlatformBDS`,
        scripts: {
          dev: 'next dev -p 3000',
          build: 'next build',
          start: 'next start -p 3000',
          lint: 'next lint',
        },
        dependencies: {
          next: '^15.0.0',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'lucide-react': '^0.359.0',
          axios: '^1.6.8',
          '@tanstack/react-query': '^5.28.4',
        },
        devDependencies: {
          autoprefixer: '^10.5.2',
          postcss: '^8.4.35',
          tailwindcss: '^3.4.1',
          typescript: '^5.3.3',
          '@types/node': '^20.11.24',
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
        },
      },
      null,
      2
    );
    zip.addFile('package.json', Buffer.from(packageJsonContent, 'utf-8'));

    // 3. Tạo tsconfig.json độc lập
    const tsconfigContent = JSON.stringify(
      {
        compilerOptions: {
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
            '@/*': ['./src/*'],
          },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
        exclude: ['node_modules'],
      },
      null,
      2
    );
    zip.addFile('tsconfig.json', Buffer.from(tsconfigContent, 'utf-8'));

    // 4. Tạo tailwind.config.js & postcss.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    zip.addFile('tailwind.config.js', Buffer.from(tailwindConfig, 'utf-8'));

    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
    zip.addFile('postcss.config.js', Buffer.from(postcssConfig, 'utf-8'));

    // 5. Tạo next.config.js
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
`;
    zip.addFile('next.config.js', Buffer.from(nextConfig, 'utf-8'));

    // 6. Tạo file cấu hình website.config.ts (Khách chỉ cần sửa file này là đổi 100% chữ & hình)
    const websiteConfigContent = `/**
 * ══════════════════════════════════════════════════════════════════════════════
 * FILE CẤU HÌNH WEBSITE BẤT ĐỘNG SẢN - PLATFORMBDS
 * Bạn có thể thay đổi toàn bộ thông tin công ty, số điện thoại, hình ảnh, màu sắc
 * và danh sách dự án bất động sản tại file này mà không cần động vào code giao diện!
 * ══════════════════════════════════════════════════════════════════════════════
 */

export const websiteConfig = {
  // 1. THÔNG TIN DOANH NGHIỆP / CÁ NHÂN MÔI GIỚI
  company: {
    name: "${customerName} Real Estate",
    slogan: "Chuyên Phân Phối Bất Động Sản Cao Cấp & Đỉnh Cao",
    description: "Đơn vị tư vấn và phát triển bất động sản uy tín hàng đầu, đem lại giải pháp an cư và đầu tư sinh lời vượt trội.",
    aboutContent: "Với hơn 10 năm kinh nghiệm trên thị trường bất động sản, chúng tôi cam kết đồng hành cùng quý khách hàng trên hành trình kiến tạo giá trị thịnh vượng.",
    phone: "${customerPhone || '0983 312 219'}",
    hotline: "${customerPhone || '0919 006 030'}",
    email: "${customerEmail || 'contact@yourcompany.vn'}",
    address: "Số 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    workingHours: "Thứ 2 - Thứ 7: 8h00 - 18h00 | Chủ Nhật: Hẹn trước",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4355!2d106.700980!3d10.776889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM2LjgiTiAxMDbCsDQyJzAzLjUiRQ!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    zalo: "${customerPhone?.replace(/[^0-9]/g, '') || '0983312219'}",
  },

  // 2. BẢNG MÀU CHỦ ĐẠO (Tùy chỉnh màu theo sở thích của bạn)
  theme: {
    primaryColor: "", // Để trống sẽ dùng màu mặc định tuyệt đẹp của mẫu
    secondaryColor: "",
    accentColor: "",
    backgroundColor: "",
  },

  // 3. DANH SÁCH DỰ ÁN BẤT ĐỘNG SẢN CỦA BẠN
  // Thêm bớt dự án thoải mái, hệ thống tự động co giãn và căn chỉnh giao diện chuẩn chỉ!
  projects: [
    {
      id: "prj-1",
      title: "Dinh Thự Ven Sông The Grand Villa",
      price: "45 Tỷ VNĐ",
      area: "450m²",
      type: "Biệt Thự Đơn Lập",
      address: "Khu Đô Thị Thảo Điền, TP. Thủ Đức, TP.HCM",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      description: "Biệt thự kiến trúc Tân Cổ Điển đỉnh cao ven sông Sài Gòn, sở hữu hồ bơi vô cực riêng và sân vườn xanh mát.",
      status: "SELLING"
    },
    {
      id: "prj-2",
      title: "Penthouse Sky Palace Landmark",
      price: "85 Tỷ VNĐ",
      area: "650m²",
      type: "Penthouse",
      address: "Quận 1, TP. Hồ Chí Minh",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      description: "Penthouse thông tầng cao cấp bậc nhất trung tâm thành phố với tầm nhìn 360 độ ngắm trọn toàn cảnh sông và phố đêm.",
      status: "SELLING"
    },
    {
      id: "prj-3",
      title: "Căn Hộ Nghỉ Dưỡng Ocean Suite",
      price: "6.8 Tỷ VNĐ",
      area: "120m²",
      type: "Căn Hộ Cao Cấp",
      address: "Đường Trần Phú, TP. Nha Trang",
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      description: "Căn hộ mặt biển sở hữu lâu dài, ban công panorama trực diện biển xanh tuyệt mỹ.",
      status: "SELLING"
    }
  ],

  // 4. DANH SÁCH BÀI VIẾT TIN TỨC / THỊ TRƯỜNG
  posts: [
    {
      id: "post-1",
      title: "Xu hướng đầu tư bất động sản cao cấp nửa cuối năm 2026",
      summary: "Phân tích toàn diện dòng tiền đổ vào phân khúc biệt thự ven sông và shophouse khối đế.",
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      createdAt: new Date().toISOString(),
    }
  ]
};
`;
    zip.addFile('website.config.ts', Buffer.from(websiteConfigContent, 'utf-8'));

    // 7. Thêm file style globals.css
    const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
`;
    zip.addFile('src/styles/globals.css', Buffer.from(globalsCss, 'utf-8'));

    // 8. Tạo file src/pages/_app.tsx
    const appTsx = `import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
`;
    zip.addFile('src/pages/_app.tsx', Buffer.from(appTsx, 'utf-8'));

    // 9. Tạo file src/pages/index.tsx kết nối trực tiếp đến template
    const indexTsx = `import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { websiteConfig } from '../../website.config';

const TemplateComponent = dynamic(() => import('../components/templates/${tplInfo.fileName.replace('.tsx', '')}'), {
  ssr: true,
});

export default function HomePage() {
  const templateDef = {
    name: websiteConfig.company.name,
    slug: '${slug}',
    collectionSlug: '${slug.split('-')[0]}',
  };

  return (
    <>
      <Head>
        <title>{websiteConfig.company.name} | {websiteConfig.company.slogan}</title>
        <meta name="description" content={websiteConfig.company.description} />
      </Head>
      <TemplateComponent
        template={templateDef}
        company={websiteConfig.company}
        theme={websiteConfig.theme}
        projects={websiteConfig.projects}
        posts={websiteConfig.posts}
        initialPage="home"
      />
    </>
  );
}
`;
    zip.addFile('src/pages/index.tsx', Buffer.from(indexTsx, 'utf-8'));

    // 10. Copy đúng component template và design-system.ts
    const templateFilePath = path.join(websiteDir, 'src/components/templates', tplInfo.fileName);
    if (fs.existsSync(templateFilePath)) {
      const templateContent = fs.readFileSync(templateFilePath, 'utf-8');
      zip.addFile(`src/components/templates/${tplInfo.fileName}`, Buffer.from(templateContent, 'utf-8'));
    }

    const designSystemPath = path.join(websiteDir, 'src/components/design-system.ts');
    if (fs.existsSync(designSystemPath)) {
      const designSystemContent = fs.readFileSync(designSystemPath, 'utf-8');
      zip.addFile('src/components/design-system.ts', Buffer.from(designSystemContent, 'utf-8'));
    }

    // 11. Tạo file HƯỚNG DẪN CHI TIẾT HUONG_DAN_SUA_DOI.md
    const guideContent = `# 📖 HƯỚNG DẪN CÀI ĐẶT & CHỈNH SỬA WEBSITE BẤT ĐỘNG SẢN (${tplInfo.templateName.toUpperCase()})

Chúc mừng bạn đã sở hữu bộ mã nguồn website bất động sản **${tplInfo.templateName}** từ **PlatformBDS**!

Mã đơn hàng của bạn: **#${orderNumber}**  
Khách hàng sở hữu: **${customerName}** (${customerPhone || customerEmail})

---

## 🚀 1. HƯỚNG DẪN KHỞI CHẠY TRÊN MÁY TÍNH (LOCAL)

### Bước 1: Mở thư mục mã nguồn
Giải nén file ZIP này vào một thư mục bất kỳ trên máy tính của bạn (VD: \`D:/my-bds-website\`).

### Bước 2: Cài đặt thư viện
Mở phần mềm Terminal (hoặc PowerShell / Command Prompt / VS Code) tại thư mục vừa giải nén, chạy lệnh:
\`\`\`bash
npm install
# hoặc nếu dùng pnpm / yarn:
pnpm install
\`\`\`

### Bước 3: Khởi chạy website
Chạy lệnh khởi động:
\`\`\`bash
npm run dev
\`\`\`
Mở trình duyệt truy cập: **[http://localhost:3000](http://localhost:3000)** để xem website hoạt động!

---

## 📝 2. CÁCH 1: ĐỔI THÔNG TIN SIÊU NHANH (KHÔNG CẦN BIẾT CODE)
Bạn chỉ cần mở duy nhất file **\`website.config.ts\`** ở thư mục gốc:

### A. Đổi thông tin liên hệ & tên công ty:
\`\`\`typescript
company: {
  name: "BẤT ĐỘNG SẢN HOÀNG GIA",         // Đổi tên công ty của bạn
  slogan: "Kiến Tạo Giá Trị Vượt Thời Gian",  // Đổi slogan
  phone: "0983 312 219",                     // Đổi hotline
  email: "contact@hoanggialand.vn",           // Đổi email
  address: "123 Nguyễn Huệ, Quận 1, TP.HCM",  // Đổi địa chỉ trụ sở
  zalo: "0983312219",                        // Đổi số Zalo kết nối
  facebook: "https://facebook.com/trang-cua-ban",
}
\`\`\`

### B. Thêm / Sửa / Xóa Dự Án Bất Động Sản:
Trong mảng \`projects: [...]\`, bạn có thể thêm bao nhiêu dự án tùy thích:
\`\`\`typescript
{
  id: "prj-moi",
  title: "Biệt Thự Vườn Sinh Thái Eco Hill",
  price: "18.5 Tỷ VNĐ",
  area: "300m²",
  type: "Biệt Thự Nghỉ Dưỡng",
  address: "Đà Lạt, Lâm Đồng",
  thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  description: "Không gian sống xanh an lành giữa rừng thông tuyệt đẹp.",
  status: "SELLING" // SELLING: Đang mở bán, SOLD: Đã bán, UPCOMING: Sắp mở bán
}
\`\`\`
> **Lưu ý:** Giao diện đã được lập trình **tự động co giãn (Responsive Grid)**. Dù bạn có 1, 2, 3, 4 hay 10 dự án, hệ thống sẽ tự sắp xếp đều đặn và ngay ngắn!

### C. Đổi màu sắc chủ đạo:
Trong mục \`theme\`, bạn có thể điền mã màu HEX mong muốn:
\`\`\`typescript
theme: {
  primaryColor: "#0F4C81", // Đổi màu chủ đạo (VD: Xanh Navy, Vàng Gold #C9A84C, Đỏ Ruby #DC2626...)
  accentColor: "#E8C547",
}
\`\`\`

---

## 💻 3. CÁCH 2: CHỈNH SỬA NÂNG CAO CHO LẬP TRÌNH VIÊN
Nếu bạn muốn can thiệp sâu vào cấu trúc HTML / React:
- Mở file: **\`src/components/templates/${tplInfo.fileName}\`**
- Toàn bộ component được viết bằng **Next.js 15, React 19, Tailwind CSS và Lucide Icons**.
- Mọi section (Hero banner, Bảng thống kê, Lịch sử, Tiện ích, Mặt bằng, Đánh giá khách hàng, FAQ, Footer) đều nằm trọn vẹn trong file này.

---

## ☁️ 4. HƯỚNG DẪN ĐƯA WEBSITE LÊN MẠNG (DEPLOY MIỄN PHÍ)

### Cách đưa lên Vercel (Khuyên dùng - Miễn phí 100%):
1. Đăng ký tài khoản miễn phí tại **[https://vercel.com](https://vercel.com)**.
2. Đẩy thư mục mã nguồn này lên GitHub (hoặc dùng Vercel CLI: \`npx vercel\`).
3. Bấm **"Import Project"** $\rightarrow$ Bấm **"Deploy"**.
4. Chỉ sau 1 phút, bạn sẽ có ngay đường link website hoạt động toàn cầu và có thể gắn tên miền riêng (\`.vn\`, \`.com\`) dễ dàng!

---

📞 **HỖ TRỢ KỸ THUẬT TỪ PLATFORMBDS:**
- Hotline: **0919 006 030**
- Hỗ trợ Zalo: **0983 312 219**
- Email: **support@platformbds.vn**

Chúc bạn kinh doanh bất động sản bùng nổ và thành công rực rỡ!
`;
    zip.addFile('HUONG_DAN_SUA_DOI.md', Buffer.from(guideContent, 'utf-8'));

    // 12. README.md
    const readmeContent = `# ${tplInfo.templateName.toUpperCase()} - WEBSITE BẤT ĐỘNG SẢN CHUYÊN NGHIỆP

Bộ mã nguồn Next.js 15 độc lập dành riêng cho mẫu **${tplInfo.templateName}**.

## Khởi chạy nhanh:
\`\`\`bash
npm install
npm run dev
\`\`\`
Truy cập: [http://localhost:3000](http://localhost:3000)

👉 **Vui lòng đọc file \`HUONG_DAN_SUA_DOI.md\` để biết cách thay đổi toàn bộ nội dung, số điện thoại và hình ảnh chỉ trong 2 phút!**
`;
    zip.addFile('README.md', Buffer.from(readmeContent, 'utf-8'));

    const zipBuffer = zip.toBuffer();
    const downloadFileName = `PLATFORMBDS-${slug}-${orderNumber}.zip`;

    logger.info(`[PackageService] Đã đóng gói thành công source code template standalone: ${slug} (${downloadFileName}, ${zipBuffer.length} bytes)`);

    return {
      buffer: zipBuffer,
      fileName: downloadFileName,
    };
  }
}

