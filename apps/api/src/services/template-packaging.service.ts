import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import { prisma } from '@repo/database';
import { logger } from '../index';

export interface PackageOptions {
  slug: string;
  orderNumber?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  tenantId?: string;
}

export const TEMPLATE_SLUG_MAP: Record<string, { componentName: string; fileName: string; templateName: string }> = {
  // 1. Luxury Gold
  'bds-01': { componentName: 'BDS01Template', fileName: 'BDS01Template.tsx', templateName: 'Biệt Thự Hoàng Gia Dát Vàng' },
  'portal-01': { componentName: 'BDS01Template', fileName: 'BDS01Template.tsx', templateName: 'Biệt Thự Hoàng Gia Dát Vàng' },
  'luxury-gold': { componentName: 'BDS01Template', fileName: 'BDS01Template.tsx', templateName: 'Luxury Gold Style' },

  // 2. Minimal White
  'bds-02': { componentName: 'BDS02Template', fileName: 'BDS02Template.tsx', templateName: 'Căn Hộ Tối Giản Bắc Âu' },
  'portal-02': { componentName: 'BDS02Template', fileName: 'BDS02Template.tsx', templateName: 'Căn Hộ Tối Giản Bắc Âu' },
  'minimal-white': { componentName: 'BDS02Template', fileName: 'BDS02Template.tsx', templateName: 'Minimal White Style' },
  'minimal-zen': { componentName: 'BDS02Template', fileName: 'BDS02Template.tsx', templateName: 'Minimalist Zen Style' },

  // 3. Modern Corporate
  'bds-03': { componentName: 'BDS03Template', fileName: 'BDS03Template.tsx', templateName: 'Tập Đoàn BĐS & Sàn Lớn' },
  'portal-03': { componentName: 'BDS03Template', fileName: 'BDS03Template.tsx', templateName: 'Tập Đoàn BĐS & Sàn Lớn' },
  'modern-corporate': { componentName: 'BDS03Template', fileName: 'BDS03Template.tsx', templateName: 'Modern Corporate' },

  // 4. Resort Paradise
  'bds-04': { componentName: 'BDS04Template', fileName: 'BDS04Template.tsx', templateName: 'Nghỉ Dưỡng & Biển Đảo' },
  'portal-04': { componentName: 'BDS04Template', fileName: 'BDS04Template.tsx', templateName: 'Nghỉ Dưỡng & Biển Đảo' },
  'resort-paradise': { componentName: 'BDS04Template', fileName: 'BDS04Template.tsx', templateName: 'Resort Paradise' },
  'ocean-view': { componentName: 'BDS04Template', fileName: 'BDS04Template.tsx', templateName: 'Ocean View Panorama' },

  // 5. Urban City
  'bds-05': { componentName: 'BDS05Template', fileName: 'BDS05Template.tsx', templateName: 'Căn Hộ Cao Tầng Smart City' },
  'portal-05': { componentName: 'BDS05Template', fileName: 'BDS05Template.tsx', templateName: 'Căn Hộ Cao Tầng Smart City' },
  'urban-city': { componentName: 'BDS05Template', fileName: 'BDS05Template.tsx', templateName: 'Urban City Style' },
  'smart-urban': { componentName: 'BDS05Template', fileName: 'BDS05Template.tsx', templateName: 'Smart Urban City' },
  'high-rise': { componentName: 'BDS05Template', fileName: 'BDS05Template.tsx', templateName: 'High-Rise Skyscraper' },

  // 6. Industrial Estate
  'bds-06': { componentName: 'BDS06Template', fileName: 'BDS06Template.tsx', templateName: 'Khu Công Nghiệp & Kho Vận' },
  'portal-06': { componentName: 'BDS06Template', fileName: 'BDS06Template.tsx', templateName: 'Khu Công Nghiệp & Kho Vận' },
  'industrial-estate': { componentName: 'BDS06Template', fileName: 'BDS06Template.tsx', templateName: 'Industrial Estate' },
  'industrial-logistics': { componentName: 'BDS06Template', fileName: 'BDS06Template.tsx', templateName: 'Industrial & Logistics' },

  // 7. Villa Premium
  'bds-07': { componentName: 'BDS07Template', fileName: 'BDS07Template.tsx', templateName: 'Biệt Thự Đơn Lập 3D Tour' },
  'portal-07': { componentName: 'BDS07Template', fileName: 'BDS07Template.tsx', templateName: 'Biệt Thự Đơn Lập 3D Tour' },
  'villa-premium': { componentName: 'BDS07Template', fileName: 'BDS07Template.tsx', templateName: 'Villa Premium Style' },
  'luxury-villa': { componentName: 'BDS07Template', fileName: 'BDS07Template.tsx', templateName: 'Luxury Villa Compound' },
  'modern-villa': { componentName: 'BDS07Template', fileName: 'BDS07Template.tsx', templateName: 'Modern Villa & Resort' },

  // 8. Eco Green
  'bds-08': { componentName: 'BDS08Template', fileName: 'BDS08Template.tsx', templateName: 'Đô Thị Sinh Thái Xanh ESG' },
  'portal-08': { componentName: 'BDS08Template', fileName: 'BDS08Template.tsx', templateName: 'Đô Thị Sinh Thái Xanh ESG' },
  'eco-green': { componentName: 'BDS08Template', fileName: 'BDS08Template.tsx', templateName: 'Eco Green Living' },
  'eco-living': { componentName: 'BDS08Template', fileName: 'BDS08Template.tsx', templateName: 'Eco Living Natural' },
  'green-eco': { componentName: 'BDS08Template', fileName: 'BDS08Template.tsx', templateName: 'Green Eco Nature' },

  // 9. Classic Elegant
  'bds-09': { componentName: 'BDS09Template', fileName: 'BDS09Template.tsx', templateName: 'Lâu Đài & Tân Cổ Điển' },
  'portal-09': { componentName: 'BDS09Template', fileName: 'BDS09Template.tsx', templateName: 'Lâu Đài & Tân Cổ Điển' },
  'classic-elegant': { componentName: 'BDS09Template', fileName: 'BDS09Template.tsx', templateName: 'Classic Elegant Style' },
  'classic-heritage': { componentName: 'BDS09Template', fileName: 'BDS09Template.tsx', templateName: 'Classic Heritage' },
  'heritage-classic': { componentName: 'BDS09Template', fileName: 'BDS09Template.tsx', templateName: 'Heritage Classic Architecture' },

  // 10. Investment Pro
  'bds-10': { componentName: 'BDS10Template', fileName: 'BDS10Template.tsx', templateName: 'Tài Chính BĐS & Phân Tích ROI' },
  'portal-10': { componentName: 'BDS10Template', fileName: 'BDS10Template.tsx', templateName: 'Tài Chính BĐS & Phân Tích ROI' },
  'investment-pro': { componentName: 'BDS10Template', fileName: 'BDS10Template.tsx', templateName: 'Investment Pro Hub' },
  'tech-hub': { componentName: 'BDS10Template', fileName: 'BDS10Template.tsx', templateName: 'Future Tech City Hub' },

  // 11. Agency Onepage
  'bds-11': { componentName: 'BDS11Template', fileName: 'BDS11Template.tsx', templateName: 'Landing Page 1 Trang Chạy Ads' },
  'portal-11': { componentName: 'BDS11Template', fileName: 'BDS11Template.tsx', templateName: 'Landing Page 1 Trang Chạy Ads' },
  'agency-onepage': { componentName: 'BDS11Template', fileName: 'BDS11Template.tsx', templateName: 'Agency Marketing OnePage' },
  'suburban-family': { componentName: 'BDS11Template', fileName: 'BDS11Template.tsx', templateName: 'Suburban Family Living' },

  // 12. Mega Developer Portal
  'bds-12': { componentName: 'BDS12Template', fileName: 'BDS12Template.tsx', templateName: 'Cổng Thông Tin Đa Dự Án' },
  'portal-12': { componentName: 'BDS12Template', fileName: 'BDS12Template.tsx', templateName: 'Cổng Thông Tin Đa Dự Án' },
  'mega-developer': { componentName: 'BDS12Template', fileName: 'BDS12Template.tsx', templateName: 'Mega Developer Portal' },
  'listing-portal': { componentName: 'BDS12Template', fileName: 'BDS12Template.tsx', templateName: 'Listing Marketplace Portal' },
  'riverside-mansion': { componentName: 'BDS12Template', fileName: 'BDS12Template.tsx', templateName: 'Riverside Grand Mansion' },

  // 13. Sàn Đấu Giá BĐS
  'bds-13': { componentName: 'BDS13Template', fileName: 'BDS13Template.tsx', templateName: 'Sàn Đấu Giá Bất Động Sản' },
  'portal-13': { componentName: 'BDS13Template', fileName: 'BDS13Template.tsx', templateName: 'Sàn Đấu Giá Bất Động Sản' },
  'auction-template': { componentName: 'BDS13Template', fileName: 'BDS13Template.tsx', templateName: 'Sàn Đấu Giá BĐS' },
  'auction-bds': { componentName: 'BDS13Template', fileName: 'BDS13Template.tsx', templateName: 'Auction BĐS & Bidding' },
  'lake-sanctuary': { componentName: 'BDS13Template', fileName: 'BDS13Template.tsx', templateName: 'Lake Sanctuary Living' },

  // 14. Dự Án Đất Nền Phân Lô
  'bds-14': { componentName: 'BDS14Template', fileName: 'BDS14Template.tsx', templateName: 'Dự Án Đất Nền Phân Lô 1/500' },
  'portal-14': { componentName: 'BDS14Template', fileName: 'BDS14Template.tsx', templateName: 'Dự Án Đất Nền Phân Lô 1/500' },
  'landplot-template': { componentName: 'BDS14Template', fileName: 'BDS14Template.tsx', templateName: 'Dự Án Đất Nền Phân Lô' },
  'land-plot': { componentName: 'BDS14Template', fileName: 'BDS14Template.tsx', templateName: 'Land Plot Masterplan' },
  'mountain-retreat': { componentName: 'BDS14Template', fileName: 'BDS14Template.tsx', templateName: 'Highland Mountain Retreat' },

  // 15. Retail Podium / Shophouse
  'bds-15': { componentName: 'BDS15Template', fileName: 'BDS15Template.tsx', templateName: 'Shophouse Thương Mại Khối Đế' },
  'portal-15': { componentName: 'BDS15Template', fileName: 'BDS15Template.tsx', templateName: 'Shophouse Thương Mại Khối Đế' },
  'retail-podium': { componentName: 'BDS15Template', fileName: 'BDS15Template.tsx', templateName: 'Retail Podium Shophouse' },
  'retail-commercial': { componentName: 'BDS15Template', fileName: 'BDS15Template.tsx', templateName: 'Retail Commercial Plaza' },
  'commercial-plaza': { componentName: 'BDS15Template', fileName: 'BDS15Template.tsx', templateName: 'Commercial & Shopping Plaza' },

  // 16. Personal Agent
  'bds-16': { componentName: 'BDS16Template', fileName: 'BDS16Template.tsx', templateName: 'Môi Giới BĐS Cá Nhân' },
  'portal-16': { componentName: 'BDS16Template', fileName: 'BDS16Template.tsx', templateName: 'Môi Giới BĐS Cá Nhân' },
  'personal-agent': { componentName: 'BDS16Template', fileName: 'BDS16Template.tsx', templateName: 'Top Personal Broker' },
  'golf-residences': { componentName: 'BDS16Template', fileName: 'BDS16Template.tsx', templateName: 'Elite Golf Residences' },

  // 17. Cổng Thông Tin Bất Động Sản Số 1
  'bds-17': { componentName: 'BDS17Template', fileName: 'BDS17Template.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'portal-17': { componentName: 'BDS17Template', fileName: 'BDS17Template.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'portal-listing': { componentName: 'BDS17Template', fileName: 'BDS17Template.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },
  'vietnam-portal': { componentName: 'BDS17Template', fileName: 'BDS17Template.tsx', templateName: 'Cổng Thông Tin Bất Động Sản Số 1' },

  // 18. Sàn Giao Dịch & Đấu Giá Bến Thành
  'bds-18': { componentName: 'BDS18Template', fileName: 'BDS18Template.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'portal-18': { componentName: 'BDS18Template', fileName: 'BDS18Template.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'bds123-portal': { componentName: 'BDS18Template', fileName: 'BDS18Template.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },
  'benthanh-portal': { componentName: 'BDS18Template', fileName: 'BDS18Template.tsx', templateName: 'Sàn Giao Dịch & Đấu Giá Bến Thành' },

  // 19. Sàn Niêm Yết Mật Độ Cao Nhà Đất Số
  'bds-19': { componentName: 'BDS19Template', fileName: 'BDS19Template.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'portal-19': { componentName: 'BDS19Template', fileName: 'BDS19Template.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'nhadatso-density': { componentName: 'BDS19Template', fileName: 'BDS19Template.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },
  'nhadatso-portal': { componentName: 'BDS19Template', fileName: 'BDS19Template.tsx', templateName: 'Sàn Niêm Yết Mật Độ Cao Nhà Đất Số' },

  // 20. Chung Cư Minh Khai & Times City
  'bds-20': { componentName: 'BDS20Template', fileName: 'BDS20Template.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'portal-20': { componentName: 'BDS20Template', fileName: 'BDS20Template.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'minhkhai-apartment': { componentName: 'BDS20Template', fileName: 'BDS20Template.tsx', templateName: 'Chung Cư Minh Khai & Times City' },
  'minhkhai-luxury': { componentName: 'BDS20Template', fileName: 'BDS20Template.tsx', templateName: 'Chung Cư Minh Khai & Times City' },

  // 21. Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội
  'bds-21': { componentName: 'BDS21Template', fileName: 'BDS21Template.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'portal-21': { componentName: 'BDS21Template', fileName: 'BDS21Template.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'hanoi-rental': { componentName: 'BDS21Template', fileName: 'BDS21Template.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },
  'chothue-hanoi': { componentName: 'BDS21Template', fileName: 'BDS21Template.tsx', templateName: 'Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội' },

  // 22. ZoHotels & Happy Land Nha Trang
  'bds-22': { componentName: 'BDS22Template', fileName: 'BDS22Template.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'portal-22': { componentName: 'BDS22Template', fileName: 'BDS22Template.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'happyland-resort': { componentName: 'BDS22Template', fileName: 'BDS22Template.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },
  'zohotels-resort': { componentName: 'BDS22Template', fileName: 'BDS22Template.tsx', templateName: 'ZoHotels & Happy Land Nha Trang' },

  // 23. Sàn Giao Dịch Nhà Phố Homeo
  'bds-23': { componentName: 'BDS23Template', fileName: 'BDS23Template.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'portal-23': { componentName: 'BDS23Template', fileName: 'BDS23Template.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'homeo-multithumb': { componentName: 'BDS23Template', fileName: 'BDS23Template.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },
  'homeo-agency': { componentName: 'BDS23Template', fileName: 'BDS23Template.tsx', templateName: 'Sàn Giao Dịch Nhà Phố Homeo' },

  // 24. RealtyBuild Trang Tin BĐS Số 1 Việt Nam
  'bds-24': { componentName: 'BDS24Template', fileName: 'BDS24Template.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
  'portal-24': { componentName: 'BDS24Template', fileName: 'BDS24Template.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
  'realtybuild-tech': { componentName: 'BDS24Template', fileName: 'BDS24Template.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },
  'realtybuild-portal': { componentName: 'BDS24Template', fileName: 'BDS24Template.tsx', templateName: 'RealtyBuild Trang Tin BĐS Số 1 Việt Nam' },

  // ─── SPECIALIZED SALES LANDING PAGES ───
  'lp-01': { componentName: 'LP01Template', fileName: 'LP01Template.tsx', templateName: 'LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel' },
  'lp-02': { componentName: 'LP02Template', fileName: 'LP02Template.tsx', templateName: 'LP #02 - Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP' },
  'lp-03': { componentName: 'LP03Template', fileName: 'LP03Template.tsx', templateName: 'LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay' },
  'lp-04': { componentName: 'LP04Template', fileName: 'LP04Template.tsx', templateName: 'LP #04 - Sale Môi Giới BĐS Triệu Đô Authority' },
};

export class TemplatePackagingService {
  /**
   * Tạo gói ZIP mã nguồn độc lập riêng biệt cho đúng template mà khách hàng đã mua
   */
  public static async generateStandalonePackage(options: PackageOptions): Promise<{ buffer: Buffer; fileName: string }> {
    const { slug, orderNumber = 'ORD', customerName = 'Khách Hàng', customerPhone = '', customerEmail = '', tenantId } = options;

    const zip = new AdmZip();

    // 0. Kiểm tra nếu đã có sẵn thư mục standalone-templates (HTML5 + PHP)
    let folderCode = 'bds-01';
    const SLUG_TO_FOLDER: Record<string, string> = {
      'luxury-gold': 'bds-01', 'minimal-white': 'bds-02', 'minimal-zen': 'bds-02',
      'modern-corporate': 'bds-03', 'resort-paradise': 'bds-04', 'ocean-view': 'bds-04',
      'urban-city': 'bds-05', 'smart-urban': 'bds-05', 'high-rise': 'bds-05',
      'industrial-estate': 'bds-06', 'industrial-logistics': 'bds-06',
      'villa-premium': 'bds-07', 'luxury-villa': 'bds-07', 'modern-villa': 'bds-07',
      'eco-green': 'bds-08', 'eco-living': 'bds-08', 'green-eco': 'bds-08',
      'classic-elegant': 'bds-09', 'classic-heritage': 'bds-09', 'heritage-classic': 'bds-09',
      'investment-pro': 'bds-10', 'tech-hub': 'bds-10',
      'agency-onepage': 'bds-11', 'suburban-family': 'bds-11',
      'mega-developer': 'bds-12', 'listing-portal': 'bds-12', 'riverside-mansion': 'bds-12',
      'auction-template': 'bds-13', 'auction-bds': 'bds-13', 'lake-sanctuary': 'bds-13',
      'landplot-template': 'bds-14', 'land-plot': 'bds-14', 'mountain-retreat': 'bds-14',
      'retail-podium': 'bds-15', 'retail-commercial': 'bds-15', 'commercial-plaza': 'bds-15',
      'personal-agent': 'bds-16', 'golf-residences': 'bds-16',
      'portal-listing': 'bds-17', 'vietnam-portal': 'bds-17',
      'bds123-portal': 'bds-18', 'benthanh-portal': 'bds-18',
      'nhadatso-density': 'bds-19', 'nhadatso-portal': 'bds-19',
      'minhkhai-apartment': 'bds-20', 'minhkhai-luxury': 'bds-20',
      'hanoi-rental': 'bds-21', 'chothue-hanoi': 'bds-21',
      'happyland-resort': 'bds-22', 'zohotels-resort': 'bds-22',
      'homeo-multithumb': 'bds-23', 'homeo-agency': 'bds-23',
      'realtybuild-tech': 'bds-24', 'realtybuild-portal': 'bds-24',
    };

    if (SLUG_TO_FOLDER[slug]) {
      folderCode = SLUG_TO_FOLDER[slug];
    } else {
      for (let i = 1; i <= 24; i++) {
        const numStr = i < 10 ? `0${i}` : `${i}`;
        if (slug.includes(`bds-${numStr}`) || slug.includes(`portal-${numStr}`) || slug === `bds-${i}`) {
          folderCode = `bds-${numStr}`;
          break;
        }
      }
    }

    const possibleStandaloneDirs = [
      path.resolve(__dirname, '../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../standalone-templates', folderCode),
      path.resolve(process.cwd(), 'standalone-templates', folderCode),
      path.resolve(process.cwd(), '../standalone-templates', folderCode),
      path.resolve(process.cwd(), '../../standalone-templates', folderCode),
    ];
    const standaloneDir = possibleStandaloneDirs.find((d) => fs.existsSync(d));

    if (standaloneDir) {
      zip.addLocalFolder(standaloneDir);

      // Nếu khách đã tùy chỉnh dữ liệu trên CMS (có tenantId), lấy toàn bộ dự án & gallery mới nhất chèn vào
      if (tenantId) {
        try {
          const tenantProjects = await prisma.project.findMany({
            where: { tenantId, deletedAt: null },
            orderBy: { sortOrder: 'asc' },
          });

          const companyInfo = await prisma.companyInfo.findUnique({
            where: { tenantId },
          });

          if (tenantProjects.length > 0 || companyInfo) {
            logger.info(`[PackageService] Đồng bộ ${tenantProjects.length} dự án & thông tin CMS mới nhất vào source ZIP của đơn ${orderNumber}`);
            
            // 1. Tạo file database.sql mới với dữ liệu CMS thực tế của khách
            let sqlContent = `-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN CẬP NHẬT TỪ CMS
-- Đơn hàng: #${orderNumber} | Khách hàng: ${customerName}
-- Ngày xuất bản: ${new Date().toLocaleString('vi-VN')}

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS \`company_info\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`email\` varchar(100) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`slogan\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`price\` varchar(100) DEFAULT NULL,
  \`area\` varchar(100) DEFAULT NULL,
  \`type\` varchar(100) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`image\` varchar(500) DEFAULT NULL,
  \`gallery\` text DEFAULT NULL,
  \`description\` text DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`company_info\` (\`name\`, \`phone\`, \`email\`, \`address\`, \`slogan\`) VALUES
(${JSON.stringify(companyInfo?.companyName || customerName + ' Real Estate')}, ${JSON.stringify(companyInfo?.hotline || customerPhone || '0919 006 030')}, ${JSON.stringify(companyInfo?.email || customerEmail || 'contact@platformbds.vn')}, ${JSON.stringify(companyInfo?.address || 'TP. Hồ Chí Minh')}, ${JSON.stringify(companyInfo?.slogan || 'Chuyên Phân Phối Bất Động Sản Uy Tín')});

`;
            if (tenantProjects.length > 0) {
              const projectValues = tenantProjects.map((p: any) => {
                const galleryArr = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
                return `(${JSON.stringify(p.title)}, ${JSON.stringify(p.price || 'Liên hệ')}, ${JSON.stringify(p.area || '100 m²')}, ${JSON.stringify(p.type)}, ${JSON.stringify(p.address || '')}, ${JSON.stringify(p.thumbnail || (galleryArr[0] as string) || '')}, ${JSON.stringify(JSON.stringify(galleryArr))}, ${JSON.stringify(p.description || p.shortDescription || '')})`;
              }).join(',\n');

              sqlContent += `INSERT INTO \`projects\` (\`title\`, \`price\`, \`area\`, \`type\`, \`address\`, \`image\`, \`gallery\`, \`description\`) VALUES\n${projectValues};\n`;
            }

            zip.addFile('php/database.sql', Buffer.from(sqlContent, 'utf-8'));
          }
        } catch (dbErr) {
          logger.warn(`[PackageService] Không thể tải dữ liệu CMS động, xuất dữ liệu mặc định: ${dbErr}`);
        }
      }

      // 2. Đính kèm tài liệu hướng dẫn lấy Key Google Gemini AI miễn phí
      const possibleGuidePaths = [
        path.resolve(process.cwd(), 'HUONG-DAN-LAY-KEY-GEMINI-AI.md'),
        path.resolve(__dirname, '../../../../HUONG-DAN-LAY-KEY-GEMINI-AI.md'),
        path.resolve(__dirname, '../../../HUONG-DAN-LAY-KEY-GEMINI-AI.md'),
      ];
      const guidePath = possibleGuidePaths.find(p => fs.existsSync(p));
      if (guidePath) {
        zip.addLocalFile(guidePath);
      }

      const zipBuffer = zip.toBuffer();
      const downloadFileName = `PLATFORMBDS-${slug}-${orderNumber}.zip`;
      logger.info(`[PackageService] Đã đóng gói từ standalone package ${folderCode} cho đơn ${orderNumber}`);
      return {
        buffer: zipBuffer,
        fileName: downloadFileName,
      };
    }

    throw new Error(`Không tìm thấy thư mục template ${folderCode} trên máy chủ.`);
  }
}
