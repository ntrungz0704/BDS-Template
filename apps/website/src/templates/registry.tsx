import React from 'react';
import dynamic from 'next/dynamic';

export interface TemplateProps {
  template: {
    name: string;
    slug: string;
    collectionSlug?: string;
  };
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
  initialPage?: string;
}

export interface TemplateDefinition {
  id: string;
  slug: string;
  name: string;
  category: string;
  version: string;
  component: React.ComponentType<any>;
}

const LoadingSkeleton = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-medium">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
    Đang tải không gian trải nghiệm...
  </div>
);

// Dynamic imports with lazy code-splitting for 100+ templates capability
const BDS01Template = dynamic(() => import('../components/templates/BDS01Template'), { loading: () => <LoadingSkeleton /> });
const BDS02Template = dynamic(() => import('../components/templates/BDS02Template'), { loading: () => <LoadingSkeleton /> });
const BDS03Template = dynamic(() => import('../components/templates/BDS03Template'), { loading: () => <LoadingSkeleton /> });
const BDS04Template = dynamic(() => import('../components/templates/BDS04Template'), { loading: () => <LoadingSkeleton /> });
const BDS05Template = dynamic(() => import('../components/templates/BDS05Template'), { loading: () => <LoadingSkeleton /> });
const BDS06Template = dynamic(() => import('../components/templates/BDS06Template'), { loading: () => <LoadingSkeleton /> });
const BDS07Template = dynamic(() => import('../components/templates/BDS07Template'), { loading: () => <LoadingSkeleton /> });
const BDS08Template = dynamic(() => import('../components/templates/BDS08Template'), { loading: () => <LoadingSkeleton /> });
const BDS09Template = dynamic(() => import('../components/templates/BDS09Template'), { loading: () => <LoadingSkeleton /> });
const BDS10Template = dynamic(() => import('../components/templates/BDS10Template'), { loading: () => <LoadingSkeleton /> });
const BDS11Template = dynamic(() => import('../components/templates/BDS11Template'), { loading: () => <LoadingSkeleton /> });
const BDS12Template = dynamic(() => import('../components/templates/BDS12Template'), { loading: () => <LoadingSkeleton /> });
const BDS13Template = dynamic(() => import('../components/templates/BDS13Template'), { loading: () => <LoadingSkeleton /> });
const BDS14Template = dynamic(() => import('../components/templates/BDS14Template'), { loading: () => <LoadingSkeleton /> });
const BDS15Template = dynamic(() => import('../components/templates/BDS15Template'), { loading: () => <LoadingSkeleton /> });
const BDS16Template = dynamic(() => import('../components/templates/BDS16Template'), { loading: () => <LoadingSkeleton /> });
const BDS17Template = dynamic(() => import('../components/templates/BDS17Template'), { loading: () => <LoadingSkeleton /> });
const BDS18Template = dynamic(() => import('../components/templates/BDS18Template'), { loading: () => <LoadingSkeleton /> });
const BDS19Template = dynamic(() => import('../components/templates/BDS19Template'), { loading: () => <LoadingSkeleton /> });
const BDS20Template = dynamic(() => import('../components/templates/BDS20Template'), { loading: () => <LoadingSkeleton /> });
const BDS21Template = dynamic(() => import('../components/templates/BDS21Template'), { loading: () => <LoadingSkeleton /> });
const BDS22Template = dynamic(() => import('../components/templates/BDS22Template'), { loading: () => <LoadingSkeleton /> });
const BDS23Template = dynamic(() => import('../components/templates/BDS23Template'), { loading: () => <LoadingSkeleton /> });
const BDS24Template = dynamic(() => import('../components/templates/BDS24Template'), { loading: () => <LoadingSkeleton /> });
const LP01Template = dynamic(() => import('../components/templates/LP01Template'), { loading: () => <LoadingSkeleton /> });
const LP02Template = dynamic(() => import('../components/templates/LP02Template'), { loading: () => <LoadingSkeleton /> });
const LP03Template = dynamic(() => import('../components/templates/LP03Template'), { loading: () => <LoadingSkeleton /> });
const LP04Template = dynamic(() => import('../components/templates/LP04Template'), { loading: () => <LoadingSkeleton /> });

class WebsiteTemplateRegistry {
  private static templates = new Map<string, TemplateDefinition>();

  public static register(def: TemplateDefinition) {
    this.templates.set(def.slug.toLowerCase(), def);
    this.templates.set(def.id.toLowerCase(), def);
  }

  public static get(idOrSlug: string): TemplateDefinition | undefined {
    const rawKey = idOrSlug.toLowerCase();
    const cleanKey = rawKey.replace(/^template-/, '');
    return this.templates.get(rawKey) || this.templates.get(cleanKey);
  }

  public static list(): TemplateDefinition[] {
    const unique = new Set(this.templates.values());
    return Array.from(unique);
  }
}

// ─── Register Initial 24 Templates ───────────────────────────────────────────

const INITIAL_TEMPLATES: TemplateDefinition[] = [
  // 1. Luxury Gold
  { id: 'bds-01', slug: 'bds-01', name: 'BĐS 01 — Biệt Thự Hoàng Gia', category: 'luxury', version: '1.0.0', component: BDS01Template },
  { id: 'template-luxury-gold', slug: 'luxury-gold', name: 'Luxury Gold', category: 'luxury', version: '1.0.0', component: BDS01Template },
  { id: 'template-1', slug: 'template-1', name: 'Luxury Gold', category: 'luxury', version: '1.0.0', component: BDS01Template },

  // 2. Minimal White
  { id: 'bds-02', slug: 'bds-02', name: 'BĐS 02 — Căn Hộ Tối Giản', category: 'minimal', version: '1.0.0', component: BDS02Template },
  { id: 'template-minimal-white', slug: 'minimal-white', name: 'Minimal White', category: 'minimal', version: '1.0.0', component: BDS02Template },
  { id: 'template-minimal-zen', slug: 'minimal-zen', name: 'Minimal Zen', category: 'minimal', version: '1.0.0', component: BDS02Template },
  { id: 'template-dark-prestige', slug: 'dark-prestige', name: 'Dark Prestige', category: 'minimal', version: '1.0.0', component: BDS02Template },
  { id: 'template-2', slug: 'template-2', name: 'Minimal White', category: 'minimal', version: '1.0.0', component: BDS02Template },

  // 3. Modern Corporate
  { id: 'bds-03', slug: 'bds-03', name: 'BĐS 03 — Sàn Giao Dịch Chuyên Nghiệp', category: 'corporate', version: '1.0.0', component: BDS03Template },
  { id: 'template-modern-corporate', slug: 'modern-corporate', name: 'Modern Corporate', category: 'corporate', version: '1.0.0', component: BDS03Template },
  { id: 'template-3', slug: 'template-3', name: 'Modern Corporate', category: 'corporate', version: '1.0.0', component: BDS03Template },

  // 4. Resort Paradise
  { id: 'bds-04', slug: 'bds-04', name: 'BĐS 04 — Nghỉ Dưỡng Ven Biển', category: 'resort', version: '1.0.0', component: BDS04Template },
  { id: 'template-resort-paradise', slug: 'resort-paradise', name: 'Resort Paradise', category: 'resort', version: '1.0.0', component: BDS04Template },
  { id: 'template-ocean-view', slug: 'ocean-view', name: 'Ocean View Panorama', category: 'resort', version: '1.0.0', component: BDS04Template },
  { id: 'template-ocean-blue', slug: 'ocean-blue', name: 'Ocean Blue Style', category: 'resort', version: '1.0.0', component: BDS04Template },
  { id: 'template-4', slug: 'template-4', name: 'Resort Paradise', category: 'resort', version: '1.0.0', component: BDS04Template },

  // 5. Urban City (An Viên Nha Trang)
  { id: 'bds-05', slug: 'bds-05', name: 'BĐS 05 — Đại Đô Thị Thông Minh', category: 'apartment', version: '1.0.0', component: BDS05Template },
  { id: 'template-urban-city', slug: 'urban-city', name: 'Urban City', category: 'apartment', version: '1.0.0', component: BDS05Template },
  { id: 'template-smart-urban', slug: 'smart-urban', name: 'Smart Urban City', category: 'apartment', version: '1.0.0', component: BDS05Template },
  { id: 'template-high-rise', slug: 'high-rise', name: 'High-Rise Skyscraper', category: 'apartment', version: '1.0.0', component: BDS05Template },
  { id: 'template-5', slug: 'template-5', name: 'Smart Urban', category: 'apartment', version: '1.0.0', component: BDS05Template },

  // 6. Industrial Estate
  { id: 'bds-06', slug: 'bds-06', name: 'BĐS 06 — Khu Công Nghiệp Hiện Đại', category: 'industrial', version: '1.0.0', component: BDS06Template },
  { id: 'template-industrial-estate', slug: 'industrial-estate', name: 'Industrial Estate', category: 'industrial', version: '1.0.0', component: BDS06Template },
  { id: 'template-industrial-logistics', slug: 'industrial-logistics', name: 'Industrial & Logistics', category: 'industrial', version: '1.0.0', component: BDS06Template },
  { id: 'template-6', slug: 'template-6', name: 'Industrial Estate', category: 'industrial', version: '1.0.0', component: BDS06Template },

  // 7. Villa Premium
  { id: 'bds-07', slug: 'bds-07', name: 'BĐS 07 — Biệt Thự Compound 3D', category: 'villa', version: '1.0.0', component: BDS07Template },
  { id: 'template-villa-premium', slug: 'villa-premium', name: 'Villa Premium', category: 'villa', version: '1.0.0', component: BDS07Template },
  { id: 'template-modern-villa', slug: 'modern-villa', name: 'Modern Villa & Resort', category: 'villa', version: '1.0.0', component: BDS07Template },
  { id: 'template-luxury-villa', slug: 'luxury-villa', name: 'Luxury Villa', category: 'villa', version: '1.0.0', component: BDS07Template },
  { id: 'template-7', slug: 'template-7', name: 'Villa Premium', category: 'villa', version: '1.0.0', component: BDS07Template },

  // 8. Eco Green
  { id: 'bds-08', slug: 'bds-08', name: 'BĐS 08 — Đô Thị Sinh Thái', category: 'eco', version: '1.0.0', component: BDS08Template },
  { id: 'template-eco-green', slug: 'eco-green', name: 'Eco Green Style', category: 'eco', version: '1.0.0', component: BDS08Template },
  { id: 'template-eco-living', slug: 'eco-living', name: 'Eco Living', category: 'eco', version: '1.0.0', component: BDS08Template },
  { id: 'template-green-eco', slug: 'green-eco', name: 'Green Eco Nature', category: 'eco', version: '1.0.0', component: BDS08Template },
  { id: 'template-8', slug: 'template-8', name: 'Eco Green', category: 'eco', version: '1.0.0', component: BDS08Template },

  // 9. Classic Elegant
  { id: 'bds-09', slug: 'bds-09', name: 'BĐS 09 — Dinh Thự Di Sản', category: 'classic', version: '1.0.0', component: BDS09Template },
  { id: 'template-classic-elegant', slug: 'classic-elegant', name: 'Classic Elegant', category: 'classic', version: '1.0.0', component: BDS09Template },
  { id: 'template-classic-heritage', slug: 'classic-heritage', name: 'Classic Heritage', category: 'classic', version: '1.0.0', component: BDS09Template },
  { id: 'template-heritage-classic', slug: 'heritage-classic', name: 'Heritage Classic Architecture', category: 'classic', version: '1.0.0', component: BDS09Template },
  { id: 'template-9', slug: 'template-9', name: 'Classic Elegant', category: 'classic', version: '1.0.0', component: BDS09Template },

  // 10. Investment Pro
  { id: 'bds-10', slug: 'bds-10', name: 'BĐS 10 — Đầu Tư Bất Động Sản', category: 'investment', version: '1.0.0', component: BDS10Template },
  { id: 'template-investment-pro', slug: 'investment-pro', name: 'Investment Pro', category: 'investment', version: '1.0.0', component: BDS10Template },
  { id: 'template-tech-hub', slug: 'tech-hub', name: 'Future Tech City Hub', category: 'investment', version: '1.0.0', component: BDS10Template },
  { id: 'template-10', slug: 'template-10', name: 'Investment Pro', category: 'investment', version: '1.0.0', component: BDS10Template },

  // 11. Agency Onepage
  { id: 'bds-11', slug: 'bds-11', name: 'BĐS 11 — Landing Mở Bán', category: 'agency', version: '1.0.0', component: BDS11Template },
  { id: 'template-agency-onepage', slug: 'agency-onepage', name: 'Agency Onepage', category: 'agency', version: '1.0.0', component: BDS11Template },
  { id: 'template-suburban-family', slug: 'suburban-family', name: 'Suburban Family Living', category: 'agency', version: '1.0.0', component: BDS11Template },
  { id: 'template-11', slug: 'template-11', name: 'Agency Onepage', category: 'agency', version: '1.0.0', component: BDS11Template },

  // 12. Mega Developer Portal
  { id: 'bds-12', slug: 'bds-12', name: 'BĐS 12 — Cổng Thông Tin Dự Án', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-mega-developer', slug: 'mega-developer', name: 'Mega Developer', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-listing-portal', slug: 'listing-portal', name: 'Listing Portal', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-riverside-mansion', slug: 'riverside-mansion', name: 'Riverside Grand Mansion', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-12', slug: 'template-12', name: 'Mega Developer', category: 'portal', version: '1.0.0', component: BDS12Template },

  // 13. Sàn Đấu Giá BĐS
  { id: 'bds-13', slug: 'bds-13', name: 'BĐS 13 — Sàn Đấu Giá Bất Động Sản', category: 'auction', version: '1.0.0', component: BDS13Template },
  { id: 'template-auction-template', slug: 'auction-template', name: 'Auction Template', category: 'auction', version: '1.0.0', component: BDS13Template },
  { id: 'template-auction-bds', slug: 'auction-bds', name: 'Auction BĐS', category: 'auction', version: '1.0.0', component: BDS13Template },
  { id: 'template-13', slug: 'template-13', name: 'Auction Template', category: 'auction', version: '1.0.0', component: BDS13Template },

  // 14. Dự Án Đất Nền Phân Lô
  { id: 'bds-14', slug: 'bds-14', name: 'BĐS 14 — Đất Nền Quy Hoạch', category: 'land', version: '1.0.0', component: BDS14Template },
  { id: 'template-landplot-template', slug: 'landplot-template', name: 'Landplot Template', category: 'land', version: '1.0.0', component: BDS14Template },
  { id: 'template-land-plot', slug: 'land-plot', name: 'Land Plot', category: 'land', version: '1.0.0', component: BDS14Template },
  { id: 'template-14', slug: 'template-14', name: 'Landplot Template', category: 'land', version: '1.0.0', component: BDS14Template },

  // 15. Retail Podium / Shophouse
  { id: 'bds-15', slug: 'bds-15', name: 'BĐS 15 — Shophouse Thương Mại', category: 'retail', version: '1.0.0', component: BDS15Template },
  { id: 'template-retail-podium', slug: 'retail-podium', name: 'Retail Podium', category: 'retail', version: '1.0.0', component: BDS15Template },
  { id: 'template-retail-commercial', slug: 'retail-commercial', name: 'Retail Commercial', category: 'retail', version: '1.0.0', component: BDS15Template },
  { id: 'template-commercial-plaza', slug: 'commercial-plaza', name: 'Commercial Plaza', category: 'retail', version: '1.0.0', component: BDS15Template },
  { id: 'template-15', slug: 'template-15', name: 'Retail Podium', category: 'retail', version: '1.0.0', component: BDS15Template },

  // 16. Personal Agent
  { id: 'bds-16', slug: 'bds-16', name: 'BĐS 16 — Môi Giới Nhà Đất', category: 'agent', version: '1.0.0', component: BDS16Template },
  { id: 'template-personal-agent', slug: 'personal-agent', name: 'Personal Agent', category: 'agent', version: '1.0.0', component: BDS16Template },
  { id: 'template-golf-residences', slug: 'golf-residences', name: 'Golf Residences', category: 'agent', version: '1.0.0', component: BDS16Template },
  { id: 'template-16', slug: 'template-16', name: 'Personal Agent', category: 'agent', version: '1.0.0', component: BDS16Template },

  // 17. Cổng Thông Tin Bất Động Sản Số 1 (HOT PORTAL)
  { id: 'bds-17', slug: 'bds-17', name: 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-portal-listing', slug: 'portal-listing', name: 'Portal Listing', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-vietnam-portal', slug: 'vietnam-portal', name: 'Vietnam Portal', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-17', slug: 'template-17', name: 'Portal Listing', category: 'portal', version: '1.0.0', component: BDS17Template },

  // 18. Sàn Giao Dịch & Đấu Giá Bến Thành
  { id: 'bds-18', slug: 'bds-18', name: 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-bds123-portal', slug: 'bds123-portal', name: 'Bds123 Portal', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-benthanh-portal', slug: 'benthanh-portal', name: 'Benthanh Portal', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-18', slug: 'template-18', name: 'Bds123 Portal', category: 'portal', version: '1.0.0', component: BDS18Template },

  // 19. Sàn Niêm Yết Mật Độ Cao Nhà Đất Số
  { id: 'bds-19', slug: 'bds-19', name: 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-nhadatso-density', slug: 'nhadatso-density', name: 'Nhadatso Density', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-nhadatso-portal', slug: 'nhadatso-portal', name: 'Nhadatso Portal', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-19', slug: 'template-19', name: 'Nhadatso Density', category: 'portal', version: '1.0.0', component: BDS19Template },

  // 20. Chung Cư Minh Khai & Times City
  { id: 'bds-20', slug: 'bds-20', name: 'BĐS 20 — Chung Cư Minh Khai & Times City', category: 'luxury', version: '1.0.0', component: BDS20Template },
  { id: 'template-minhkhai-apartment', slug: 'minhkhai-apartment', name: 'Minh Khai Apartment', category: 'luxury', version: '1.0.0', component: BDS20Template },
  { id: 'template-20', slug: 'template-20', name: 'Minh Khai Apartment', category: 'luxury', version: '1.0.0', component: BDS20Template },

  // 21. Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội
  { id: 'bds-21', slug: 'bds-21', name: 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội', category: 'portal', version: '1.0.0', component: BDS21Template },
  { id: 'template-hanoi-rental', slug: 'hanoi-rental', name: 'Hanoi Rental Portal', category: 'portal', version: '1.0.0', component: BDS21Template },
  { id: 'template-21', slug: 'template-21', name: 'Hanoi Rental Portal', category: 'portal', version: '1.0.0', component: BDS21Template },

  // 22. ZoHotels & Happy Land Nha Trang
  { id: 'bds-22', slug: 'bds-22', name: 'BĐS 22 — ZoHotels & Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: BDS22Template },
  { id: 'template-happyland-resort', slug: 'happyland-resort', name: 'Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: BDS22Template },
  { id: 'template-22', slug: 'template-22', name: 'Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: BDS22Template },

  // 23. Sàn Giao Dịch Nhà Phố Homeo
  { id: 'bds-23', slug: 'bds-23', name: 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo', category: 'agency', version: '1.0.0', component: BDS23Template },
  { id: 'template-homeo-multithumb', slug: 'homeo-multithumb', name: 'Homeo Agency', category: 'agency', version: '1.0.0', component: BDS23Template },
  { id: 'template-23', slug: 'template-23', name: 'Homeo Agency', category: 'agency', version: '1.0.0', component: BDS23Template },

  // 24. RealtyBuild Trang Tin BĐS Số 1 Việt Nam
  { id: 'bds-24', slug: 'bds-24', name: 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam', category: 'portal', version: '1.0.0', component: BDS24Template },
  { id: 'template-realtybuild-tech', slug: 'realtybuild-tech', name: 'RealtyBuild Portal', category: 'portal', version: '1.0.0', component: BDS24Template },
  { id: 'template-24', slug: 'template-24', name: 'RealtyBuild Portal', category: 'portal', version: '1.0.0', component: BDS24Template },

  // ─── SPECIALIZED SALES LANDING PAGES ───
  { id: 'lp-01', slug: 'lp-01', name: 'LP 01 — Căn Hộ Chung Cư Cao Cấp Launch Funnel', category: 'landing', version: '1.0.0', component: LP01Template },
  { id: 'lp-02', slug: 'lp-02', name: 'LP 02 — Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP', category: 'landing', version: '1.0.0', component: LP02Template },
  { id: 'lp-03', slug: 'lp-03', name: 'LP 03 — Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay', category: 'landing', version: '1.0.0', component: LP03Template },
  { id: 'lp-04', slug: 'lp-04', name: 'LP 04 — Sale Môi Giới BĐS Triệu Đô Authority', category: 'landing', version: '1.0.0', component: LP04Template },
];

for (const tpl of INITIAL_TEMPLATES) {
  WebsiteTemplateRegistry.register(tpl);
}

// Marketplace uses portal-01…portal-24 while existing tenants may still store
// bds-XX or legacy slugs. Register the current public slugs without duplicating
// component bundles so every purchased template renders the matching design.
for (let index = 1; index <= 24; index += 1) {
  const number = String(index).padStart(2, '0');
  const legacyDefinition = WebsiteTemplateRegistry.get(`bds-${number}`);
  if (legacyDefinition) {
    WebsiteTemplateRegistry.register({
      ...legacyDefinition,
      id: `portal-${number}`,
      slug: `portal-${number}`,
    });
  }
}

export { WebsiteTemplateRegistry };

