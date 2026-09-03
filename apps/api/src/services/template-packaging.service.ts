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
  'lp-05': { componentName: 'LP05Template', fileName: 'LP05Template.tsx', templateName: 'LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park' },
  'lp-06': { componentName: 'LP06Template', fileName: 'LP06Template.tsx', templateName: 'LP #06 - Khu Đô Thị Công Nghiệp & Dịch Vụ VSIP' },
  'lp-07': { componentName: 'LP07Template', fileName: 'LP07Template.tsx', templateName: 'LP #07 - Dinh Thự Đảo Sinh Thái Nghỉ Dưỡng Ven Sông' },
};

export class TemplatePackagingService {
  /**
   * Tạo gói ZIP mã nguồn độc lập riêng biệt cho đúng template mà khách hàng đã mua
   */
  public static async generateStandalonePackage(options: PackageOptions): Promise<{ buffer: Buffer; fileName: string }> {
    const { slug, orderNumber = 'ORD', customerName = 'Khách Hàng', customerPhone = '', customerEmail = '', tenantId } = options;

    const zip = new AdmZip();

    // 0. Kiểm tra nếu đã có sẵn thư mục standalone-templates (HTML5 + PHP)
    let folderCode: string | undefined;
    const SLUG_TO_FOLDER: Record<string, string> = {
      // 1. Luxury Gold
      'bds-01': 'bds-01', 'portal-01': 'bds-01', 'luxury-gold': 'bds-01',
      // 2. Minimal White
      'bds-02': 'bds-02', 'portal-02': 'bds-02', 'minimal-white': 'bds-02', 'minimal-zen': 'bds-02',
      // 3. Modern Corporate
      'bds-03': 'bds-03', 'portal-03': 'bds-03', 'modern-corporate': 'bds-03',
      // 4. Resort Paradise
      'bds-04': 'bds-04', 'portal-04': 'bds-04', 'resort-paradise': 'bds-04', 'ocean-view': 'bds-04',
      // 5. Urban City
      'bds-05': 'bds-05', 'portal-05': 'bds-05', 'urban-city': 'bds-05', 'smart-urban': 'bds-05', 'high-rise': 'bds-05',
      // 6. Industrial Estate
      'bds-06': 'bds-06', 'portal-06': 'bds-06', 'industrial-estate': 'bds-06', 'industrial-logistics': 'bds-06',
      // 7. Villa Premium
      'bds-07': 'bds-07', 'portal-07': 'bds-07', 'villa-premium': 'bds-07', 'luxury-villa': 'bds-07', 'modern-villa': 'bds-07',
      // 8. Eco Green
      'bds-08': 'bds-08', 'portal-08': 'bds-08', 'eco-green': 'bds-08', 'eco-living': 'bds-08', 'green-eco': 'bds-08',
      // 9. Classic Elegant
      'bds-09': 'bds-09', 'portal-09': 'bds-09', 'classic-elegant': 'bds-09', 'classic-heritage': 'bds-09', 'heritage-classic': 'bds-09',
      // 10. Investment Pro
      'bds-10': 'bds-10', 'portal-10': 'bds-10', 'investment-pro': 'bds-10', 'tech-hub': 'bds-10',
      // 11. Agency Onepage
      'bds-11': 'bds-11', 'portal-11': 'bds-11', 'agency-onepage': 'bds-11', 'suburban-family': 'bds-11',
      // 12. Mega Developer Portal
      'bds-12': 'bds-12', 'portal-12': 'bds-12', 'mega-developer': 'bds-12', 'listing-portal': 'bds-12', 'riverside-mansion': 'bds-12',
      // 13. Sàn Đấu Giá BĐS
      'bds-13': 'bds-13', 'portal-13': 'bds-13', 'auction-template': 'bds-13', 'auction-bds': 'bds-13', 'lake-sanctuary': 'bds-13',
      // 14. Dự Án Đất Nền Phân Lô
      'bds-14': 'bds-14', 'portal-14': 'bds-14', 'landplot-template': 'bds-14', 'land-plot': 'bds-14', 'mountain-retreat': 'bds-14',
      // 15. Retail Podium / Shophouse
      'bds-15': 'bds-15', 'portal-15': 'bds-15', 'retail-podium': 'bds-15', 'retail-commercial': 'bds-15', 'commercial-plaza': 'bds-15',
      // 16. Personal Agent
      'bds-16': 'bds-16', 'portal-16': 'bds-16', 'personal-agent': 'bds-16', 'golf-residences': 'bds-16',
      // 17. Cổng Thông Tin Bất Động Sản Số 1
      'bds-17': 'bds-17', 'portal-17': 'bds-17', 'portal-listing': 'bds-17', 'vietnam-portal': 'bds-17',
      // 18. Sàn Giao Dịch & Đấu Giá Bến Thành
      'bds-18': 'bds-18', 'portal-18': 'bds-18', 'bds123-portal': 'bds-18', 'benthanh-portal': 'bds-18',
      // 19. Sàn Niêm Yết Mật Độ Cao Nhà Đất Số
      'bds-19': 'bds-19', 'portal-19': 'bds-19', 'nhadatso-density': 'bds-19', 'nhadatso-portal': 'bds-19',
      // 20. Chung Cư Minh Khai & Times City
      'bds-20': 'bds-20', 'portal-20': 'bds-20', 'minhkhai-apartment': 'bds-20', 'minhkhai-luxury': 'bds-20',
      // 21. Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội
      'bds-21': 'bds-21', 'portal-21': 'bds-21', 'hanoi-rental': 'bds-21', 'chothue-hanoi': 'bds-21',
      // 22. ZoHotels & Happy Land Nha Trang
      'bds-22': 'bds-22', 'portal-22': 'bds-22', 'happyland-resort': 'bds-22', 'zohotels-resort': 'bds-22',
      // 23. Sàn Giao Dịch Nhà Phố Homeo
      'bds-23': 'bds-23', 'portal-23': 'bds-23', 'homeo-multithumb': 'bds-23', 'homeo-agency': 'bds-23',
      // 24. RealtyBuild Trang Tin BĐS Số 1 Việt Nam
      'bds-24': 'bds-24', 'portal-24': 'bds-24', 'realtybuild-tech': 'bds-24', 'realtybuild-portal': 'bds-24',
      // Landing Pages
      'lp-01': 'lp-01', 'landing-01': 'lp-01', 'lp01': 'lp-01', 'bds-lp-01': 'lp-01',
      'lp-02': 'lp-02', 'landing-02': 'lp-02', 'lp02': 'lp-02', 'bds-lp-02': 'lp-02',
      'lp-03': 'lp-03', 'landing-03': 'lp-03', 'lp03': 'lp-03', 'bds-lp-03': 'lp-03',
      'lp-04': 'lp-04', 'landing-04': 'lp-04', 'lp04': 'lp-04', 'bds-lp-04': 'lp-04',
      'lp-05': 'lp-05', 'landing-05': 'lp-05', 'lp05': 'lp-05', 'bds-lp-05': 'lp-05',
      'lp-06': 'lp-06', 'landing-06': 'lp-06', 'lp06': 'lp-06', 'bds-lp-06': 'lp-06',
      'lp-07': 'lp-07', 'landing-07': 'lp-07', 'lp07': 'lp-07', 'bds-lp-07': 'lp-07',
    };

    const s = slug.toLowerCase().trim();
    if (SLUG_TO_FOLDER[s]) {
      folderCode = SLUG_TO_FOLDER[s];
    } else {
      // Check LP pattern (lp-01 to lp-07)
      for (let i = 1; i <= 7; i++) {
        const numStr = `0${i}`;
        if (s.includes(`lp-${numStr}`) || s.includes(`lp${numStr}`) || s.includes(`landing-${numStr}`) || s === `lp-${i}`) {
          folderCode = `lp-${numStr}`;
          break;
        }
      }

      // Check BDS pattern (bds-01 to bds-24)
      if (!folderCode) {
        for (let i = 1; i <= 24; i++) {
          const numStr = i < 10 ? `0${i}` : `${i}`;
          if (s.includes(`bds-${numStr}`) || s.includes(`portal-${numStr}`) || s === `bds-${i}`) {
            folderCode = `bds-${numStr}`;
            break;
          }
        }
      }
    }

    if (!folderCode) {
      throw new Error(`SOURCE_PACKAGE_UNAVAILABLE:${slug}`);
    }

    const possibleStandaloneDirs = [
      path.resolve(__dirname, '../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../standalone-templates', folderCode),
      path.resolve(__dirname, '../standalone-templates', folderCode),
      path.resolve(__dirname, './standalone-templates', folderCode),
      path.resolve(process.cwd(), 'standalone-templates', folderCode),
      path.resolve(process.cwd(), '../standalone-templates', folderCode),
      path.resolve(process.cwd(), '../../standalone-templates', folderCode),
      `/usr/src/app/standalone-templates/${folderCode}`,
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

      // 1.5. Đồng bộ Cloud CMS Realtime & Lead Capture cho bản HTML & Vercel / GitHub
      let tenantSlug = '';
      if (tenantId) {
        try {
          const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
          tenantSlug = tenant?.subdomain || tenant?.slug || '';
        } catch (tErr) {
          logger.warn(`[PackageService] Lỗi tra cứu tenant: ${tErr}`);
        }
      }
      if (!tenantSlug && customerEmail) {
        try {
          const user = await prisma.user.findUnique({ where: { email: customerEmail } });
          if (user) {
            const tenant = await prisma.tenant.findFirst({ where: { userId: user.id } });
            tenantSlug = tenant?.subdomain || tenant?.slug || '';
          }
        } catch (uErr) {}
      }

      const activeSlug = tenantSlug || folderCode || slug;
      const apiUrl = process.env.API_URL || 'https://bds-template-api.onrender.com';
      const cmsUrl = process.env.CMS_URL || 'https://cms.aireviewbds.com';

      // 1.5.1 Tạo api-config.js
      const apiConfigJs = `/**
 * CẤU HÌNH KẾT NỐI CLOUD CMS (TỰ ĐỘNG ĐỒNG BỘ 100% NỘI DUNG TỪ CMS)
 * Khi Quý khách chỉnh sửa trên ${cmsUrl}, website trên GitHub Pages, Vercel hoặc Hosting sẽ tự động cập nhật ngay lập tức!
 */
window.CMS_CONFIG = {
  apiUrl: ${JSON.stringify(apiUrl)},
  tenantSlug: ${JSON.stringify(activeSlug)},
  cmsUrl: ${JSON.stringify(cmsUrl)},
  orderNumber: ${JSON.stringify(orderNumber)},
  customerName: ${JSON.stringify(customerName)}
};
`;
      zip.addFile('html/js/api-config.js', Buffer.from(apiConfigJs, 'utf-8'));
      zip.addFile('php/api-config.js', Buffer.from(apiConfigJs, 'utf-8'));

      // 1.5.2 Tạo cms-sync.js
      const cmsSyncJs = `/**
 * CLOUD CMS REALTIME SYNCHRONIZER
 * Tự động đồng bộ 100% các mục Thêm / Xóa / Sửa trên CMS:
 * - Tiêu đề & nội dung Hero Banner
 * - Các chỉ số thống kê QuickStats (ví dụ: đâsd: 123213, ádasđa: 123123...)
 * - Chính sách bán hàng & ưu đãi
 * - Thông tin thương hiệu: Hotline, Zalo, Email, Địa chỉ công ty
 * - Tự động chuyển tiếp thông tin khách để lại form (Lead Capture) về CMS
 */
(function() {
  var config = window.CMS_CONFIG || {};
  var API_URL = config.apiUrl || 'https://bds-template-api.onrender.com';
  var TENANT_SLUG = config.tenantSlug;

  if (!TENANT_SLUG) return;

  // 1. TỰ ĐỘNG CHUYỂN TIẾP MỌI FORM LIÊN HỆ VỀ CMS LEADS
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    var formData = new FormData(form);
    var phone = formData.get('phone') || formData.get('telephone') || (form.querySelector('input[type="tel"]') ? form.querySelector('input[type="tel"]').value : '');
    var fullName = formData.get('name') || formData.get('fullName') || formData.get('fullname') || (form.querySelector('input[type="text"]') ? form.querySelector('input[type="text"]').value : '');
    var email = formData.get('email') || (form.querySelector('input[type="email"]') ? form.querySelector('input[type="email"]').value : '');
    var note = formData.get('note') || formData.get('message') || formData.get('product') || '';

    if (phone && phone.trim()) {
      fetch(API_URL + '/api/website/' + encodeURIComponent(TENANT_SLUG) + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: (fullName || 'Khách truy cập Website').trim(),
          phone: phone.trim(),
          email: (email || '').trim(),
          note: (note || '').trim(),
          sourceUrl: window.location.href
        })
      }).then(function(r) { return r.json(); })
        .then(function(data) {
          console.log('[CMS Sync] Lead forwarded to CMS:', data);
        }).catch(function(err) {
          console.warn('[CMS Sync] Lead notice:', err);
        });
    }
  }, true);

  // 2. TỰ ĐỘNG ĐỒNG BỘ DỮ LIỆU TRANG TỪ CMS (HERO, QUICK STATS, CHÍNH SÁCH)
  fetch(API_URL + '/api/website/' + encodeURIComponent(TENANT_SLUG) + '/pages/home?_t=' + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (!res || !res.success || !res.data || !Array.isArray(res.data.sections)) return;
      var sections = res.data.sections;

      // Section Hero
      var heroSec = sections.find(function(s) { return s.sectionKey === 'hero'; });
      if (heroSec && heroSec.content) {
        var c = heroSec.content;
        
        // Cập nhật tiêu đề h1
        if (c.heading) {
          var h1 = document.querySelector('h1');
          if (h1) {
            var html = c.heading;
            if (c.headingAccent) {
              html += ' <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">' + c.headingAccent + '</span>';
            }
            h1.innerHTML = html;
          }
        }

        // Cập nhật subtitle
        if (c.subtitle) {
          var p = document.querySelector('h1 ~ p') || document.querySelector('.hero-subtitle');
          if (p) p.textContent = c.subtitle;
        }

        // Cập nhật badge
        if (c.badge) {
          var badgeEl = document.querySelector('.hero-badge') || document.querySelector('section span.uppercase.tracking-widest');
          if (badgeEl) badgeEl.textContent = c.badge;
        }

        // Cập nhật các chỉ số thống kê QuickStats (đâsd: 123213, ádasđa: 123123...)
        if (Array.isArray(c.quickStats) && c.quickStats.length > 0) {
          var statsSection = document.querySelector('section.bg-\\[\\#FDFBF7\\] .grid') ||
                             document.querySelector('[data-stats-grid]') ||
                             document.querySelector('.stats-grid');
          if (statsSection) {
            statsSection.className = 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 ' + (c.quickStats.length > 4 ? 'lg:grid-cols-' + Math.min(c.quickStats.length, 6) : '') + ' gap-4 sm:gap-6 text-center';
            statsSection.innerHTML = c.quickStats.map(function(st, idx) {
              return '<div class="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-1">' +
                '<span class="text-2xl sm:text-3xl font-black text-[#0F3B38] font-mono block break-words">' + (st.value || '0') + '</span>' +
                '<span class="text-xs font-bold text-amber-700 uppercase tracking-wider block">' + (st.label || ('Chỉ số #' + (idx + 1))) + '</span>' +
                (st.desc ? '<span class="text-[11px] text-slate-500 block">' + st.desc + '</span>' : '') +
              '</div>';
            }).join('');
          }
        }
      }

      // Section Policies (#chinh-sach)
      var polSec = sections.find(function(s) { return s.sectionKey === 'policies'; });
      if (polSec && polSec.content && Array.isArray(polSec.content.items) && polSec.content.items.length > 0) {
        var polContainer = document.querySelector('#chinh-sach .grid') || document.querySelector('.policies-grid');
        if (polContainer) {
          polContainer.innerHTML = polSec.content.items.map(function(pol, idx) {
            return '<div class="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-700/50 space-y-3 shadow-xl flex flex-col justify-between">' +
              '<div>' +
                '<div class="inline-flex min-w-[54px] h-10 px-3.5 rounded-xl bg-amber-500 text-slate-950 items-center justify-center font-black text-sm shadow-md whitespace-nowrap mb-3">' +
                  (pol.badge || pol.value || (idx + 1)) +
                '</div>' +
                '<h4 class="font-bold text-sm text-amber-300 uppercase">' + (pol.title || pol.name || '') + '</h4>' +
                '<p class="text-xs text-slate-300 leading-relaxed mt-2">' + (pol.desc || pol.description || '') + '</p>' +
              '</div>' +
            '</div>';
          }).join('');
        }
      }
    }).catch(function() {});

  // 3. TỰ ĐỘNG ĐỒNG BỘ THÔNG TIN DOANH NGHIỆP TỪ CMS
  fetch(API_URL + '/api/website/' + encodeURIComponent(TENANT_SLUG) + '/company-info?_t=' + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (!res || !res.success || !res.data) return;
      var c = res.data;
      var phone = c.hotline || c.phone;
      if (phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
          a.href = 'tel:' + phone;
        });
        document.querySelectorAll('a[href*="zalo.me"]').forEach(function(a) {
          a.href = 'https://zalo.me/' + (c.zalo || phone);
        });
      }
    }).catch(function() {});
})();
`;
      zip.addFile('html/js/cms-sync.js', Buffer.from(cmsSyncJs, 'utf-8'));
      zip.addFile('php/cms-sync.js', Buffer.from(cmsSyncJs, 'utf-8'));

      // 1.5.3 Chèn script vào html/index.html bên trong ZIP
      const htmlEntry = zip.getEntry('html/index.html');
      if (htmlEntry) {
        let htmlStr = htmlEntry.getData().toString('utf-8');
        if (!htmlStr.includes('cms-sync.js')) {
          htmlStr = htmlStr.replace('</body>', '  <script src="js/api-config.js"></script>\n  <script src="js/cms-sync.js"></script>\n</body>');
          zip.deleteFile('html/index.html');
          zip.addFile('html/index.html', Buffer.from(htmlStr, 'utf-8'));
        }
      }

      // 1.5.4 GitHub Pages Action
      const githubWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'html'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
      zip.addFile('.github/workflows/deploy-pages.yml', Buffer.from(githubWorkflow, 'utf-8'));

      // 1.5.5 Hướng dẫn chi tiết đẩy lên GitHub & Vercel
      const githubGuide = `# HƯỚNG DẪN UP LÊN GITHUB & VERCEL — ĐỒNG BỘ 100% VỚI CMS

## 🌟 TÍNH NĂNG TỰ ĐỘNG ĐỒNG BỘ CLOUD CMS (REALTIME)
Website trong gói này đã được cấu hình sẵn tính năng **kết nối trực tiếp với tài khoản CMS của Quý Khách** (${cmsUrl}):
- Khi Quý khách đăng nhập vào CMS và **thay đổi bất kỳ thông tin nào** (đổi số hotline, đổi tiêu đề, thêm chỉ số thống kê mới, đổi chính sách bán hàng, thêm/sửa/xóa dự án)...
- Website đang chạy trên **GitHub Pages**, **Vercel** hoặc **Tên Miền Riêng** sẽ **TỰ ĐỘNG CẬP NHẬT 100% THEO THỜI GIAN THỰC** mà Quý Khách không cần phải chỉnh sửa code hay deploy lại!
- Mọi khách hàng điền form nhận tư vấn / báo giá trên website sẽ **chuyển thẳng về mục "Khách Hàng (Leads)" trong CMS** của Quý Khách.

---

## 🚀 CÁCH 1: CHẠY MIỄN PHÍ TRÊN GITHUB PAGES (0đ Hosting)
1. Đăng nhập vào [GitHub](https://github.com) và tạo một Repository mới (ví dụ: \`my-bds-website\`).
2. Mở Terminal / Command Prompt tại thư mục vừa giải nén và chạy:
   \`\`\`bash
   git init
   git add .
   git commit -m "Khởi tạo website BĐS đồng bộ CMS"
   git branch -M main
   git remote add origin https://github.com/TEN-TAI-KHOAN/my-bds-website.git
   git push -u origin main
   \`\`\`
3. Vào tab **Settings** của Repository trên GitHub $\\rightarrow$ Chọn **Pages** $\\rightarrow$ Tại mục **Source**, chọn **GitHub Actions**.
4. Website sẽ tự động chạy online trực tiếp tại: \`https://TEN-TAI-KHOAN.github.io/my-bds-website/\`!

---

## ⚡ CÁCH 2: TRIỂN KHAI NHANH TRÊN VERCEL
1. Đăng nhập vào [Vercel](https://vercel.com) bằng tài khoản GitHub.
2. Bấm **"Add New Project"** $\\rightarrow$ Chọn repo \`my-bds-website\`.
3. Tại phần **Root Directory**, chọn thư mục \`html\`.
4. Bấm **Deploy** $\\rightarrow$ Website sẽ chạy online toàn cầu với tốc độ cao và SSL miễn phí!

Mọi thắc mắc kỹ thuật, Quý Khách luôn được hỗ trợ 24/7!
`;
      zip.addFile('HUONG-DAN-UP-LEN-GITHUB-VA-VERCEL.md', Buffer.from(githubGuide, 'utf-8'));

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
    } else {
      throw new Error(`SOURCE_PACKAGE_UNAVAILABLE:${slug}`);
    }

    throw new Error(`Không tìm thấy thư mục template ${folderCode} trên máy chủ.`);
  }
}
