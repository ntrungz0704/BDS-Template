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
const LuxuryTemplate = dynamic(() => import('../components/templates/LuxuryTemplate'), { loading: () => <LoadingSkeleton /> });
const MinimalTemplate = dynamic(() => import('../components/templates/MinimalTemplate'), { loading: () => <LoadingSkeleton /> });
const CorporateTemplate = dynamic(() => import('../components/templates/CorporateTemplate'), { loading: () => <LoadingSkeleton /> });
const ResortTemplate = dynamic(() => import('../components/templates/ResortTemplate'), { loading: () => <LoadingSkeleton /> });
const UrbanTemplate = dynamic(() => import('../components/templates/UrbanTemplate'), { loading: () => <LoadingSkeleton /> });
const ApartmentTemplate = dynamic(() => import('../components/templates/ApartmentTemplate'), { loading: () => <LoadingSkeleton /> });
const IndustrialTemplate = dynamic(() => import('../components/templates/IndustrialTemplate'), { loading: () => <LoadingSkeleton /> });
const VillaTemplate = dynamic(() => import('../components/templates/VillaTemplate'), { loading: () => <LoadingSkeleton /> });
const EcoTemplate = dynamic(() => import('../components/templates/EcoTemplate'), { loading: () => <LoadingSkeleton /> });
const ClassicTemplate = dynamic(() => import('../components/templates/ClassicTemplate'), { loading: () => <LoadingSkeleton /> });
const InvestmentTemplate = dynamic(() => import('../components/templates/InvestmentTemplate'), { loading: () => <LoadingSkeleton /> });
const AgencyTemplate = dynamic(() => import('../components/templates/AgencyTemplate'), { loading: () => <LoadingSkeleton /> });
const RetailTemplate = dynamic(() => import('../components/templates/RetailTemplate'), { loading: () => <LoadingSkeleton /> });
const ListingMarketplace = dynamic(() => import('../components/templates/ListingMarketplace'), { loading: () => <LoadingSkeleton /> });
const PersonalAgentTemplate = dynamic(() => import('../components/templates/PersonalAgentTemplate'), { loading: () => <LoadingSkeleton /> });
const AuctionTemplate = dynamic(() => import('../components/templates/AuctionTemplate'), { loading: () => <LoadingSkeleton /> });
const LandPlotTemplate = dynamic(() => import('../components/templates/LandPlotTemplate'), { loading: () => <LoadingSkeleton /> });
const PortalListingTemplate = dynamic(() => import('../components/templates/PortalListingTemplate'), { loading: () => <LoadingSkeleton /> });
const Bds123PortalTemplate = dynamic(() => import('../components/templates/Bds123PortalTemplate'), { loading: () => <LoadingSkeleton /> });
const NhadatsoDensityTemplate = dynamic(() => import('../components/templates/NhadatsoDensityTemplate'), { loading: () => <LoadingSkeleton /> });
const MinhKhaiApartmentTemplate = dynamic(() => import('../components/templates/MinhKhaiApartmentTemplate'), { loading: () => <LoadingSkeleton /> });
const HanoiRentalPortalTemplate = dynamic(() => import('../components/templates/HanoiRentalPortalTemplate'), { loading: () => <LoadingSkeleton /> });
const HappyLandResortTemplate = dynamic(() => import('../components/templates/HappyLandResortTemplate'), { loading: () => <LoadingSkeleton /> });
const HomeoMultiThumbnailTemplate = dynamic(() => import('../components/templates/HomeoMultiThumbnailTemplate'), { loading: () => <LoadingSkeleton /> });
const RealtyBuildTechTemplate = dynamic(() => import('../components/templates/RealtyBuildTechTemplate'), { loading: () => <LoadingSkeleton /> });

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

// ─── Register Initial 16 Templates ───────────────────────────────────────────

const INITIAL_TEMPLATES: TemplateDefinition[] = [
  // 1. Luxury Gold
  { id: 'bds-01', slug: 'bds-01', name: 'BĐS 01 — Biệt Thự Hoàng Gia', category: 'luxury', version: '1.0.0', component: LuxuryTemplate },
  { id: 'template-luxury-gold', slug: 'luxury-gold', name: 'Luxury Gold', category: 'luxury', version: '1.0.0', component: LuxuryTemplate },
  { id: 'template-1', slug: 'template-1', name: 'Luxury Gold', category: 'luxury', version: '1.0.0', component: LuxuryTemplate },

  // 2. Minimal White
  { id: 'bds-02', slug: 'bds-02', name: 'BĐS 02 — Căn Hộ Tối Giản', category: 'minimal', version: '1.0.0', component: MinimalTemplate },
  { id: 'template-minimal-white', slug: 'minimal-white', name: 'Minimal White', category: 'minimal', version: '1.0.0', component: MinimalTemplate },
  { id: 'template-minimal-zen', slug: 'minimal-zen', name: 'Minimal Zen', category: 'minimal', version: '1.0.0', component: MinimalTemplate },
  { id: 'template-dark-prestige', slug: 'dark-prestige', name: 'Dark Prestige', category: 'minimal', version: '1.0.0', component: MinimalTemplate },
  { id: 'template-2', slug: 'template-2', name: 'Minimal White', category: 'minimal', version: '1.0.0', component: MinimalTemplate },

  // 3. Modern Corporate
  { id: 'bds-03', slug: 'bds-03', name: 'BĐS 03 — Sàn Giao Dịch Chuyên Nghiệp', category: 'corporate', version: '1.0.0', component: CorporateTemplate },
  { id: 'template-modern-corporate', slug: 'modern-corporate', name: 'Modern Corporate', category: 'corporate', version: '1.0.0', component: CorporateTemplate },
  { id: 'template-3', slug: 'template-3', name: 'Modern Corporate', category: 'corporate', version: '1.0.0', component: CorporateTemplate },

  // 4. Resort Paradise
  { id: 'bds-04', slug: 'bds-04', name: 'BĐS 04 — Nghỉ Dưỡng Ven Biển', category: 'resort', version: '1.0.0', component: ResortTemplate },
  { id: 'template-resort-paradise', slug: 'resort-paradise', name: 'Resort Paradise', category: 'resort', version: '1.0.0', component: ResortTemplate },
  { id: 'template-ocean-view', slug: 'ocean-view', name: 'Ocean View Panorama', category: 'resort', version: '1.0.0', component: ResortTemplate },
  { id: 'template-ocean-blue', slug: 'ocean-blue', name: 'Ocean Blue Style', category: 'resort', version: '1.0.0', component: ResortTemplate },
  { id: 'template-4', slug: 'template-4', name: 'Resort Paradise', category: 'resort', version: '1.0.0', component: ResortTemplate },

  // 5. Urban City (An Viên Nha Trang)
  { id: 'bds-05', slug: 'bds-05', name: 'BĐS 05 — Đại Đô Thị Thông Minh', category: 'apartment', version: '1.0.0', component: UrbanTemplate },
  { id: 'template-urban-city', slug: 'urban-city', name: 'Urban City', category: 'apartment', version: '1.0.0', component: UrbanTemplate },
  { id: 'template-smart-urban', slug: 'smart-urban', name: 'Smart Urban City', category: 'apartment', version: '1.0.0', component: UrbanTemplate },
  { id: 'template-high-rise', slug: 'high-rise', name: 'High-Rise Skyscraper', category: 'apartment', version: '1.0.0', component: UrbanTemplate },
  { id: 'template-5', slug: 'template-5', name: 'Smart Urban', category: 'apartment', version: '1.0.0', component: UrbanTemplate },

  // 6. Industrial Estate
  { id: 'bds-06', slug: 'bds-06', name: 'BĐS 06 — Khu Công Nghiệp Hiện Đại', category: 'industrial', version: '1.0.0', component: IndustrialTemplate },
  { id: 'template-industrial-estate', slug: 'industrial-estate', name: 'Industrial Estate', category: 'industrial', version: '1.0.0', component: IndustrialTemplate },
  { id: 'template-industrial-logistics', slug: 'industrial-logistics', name: 'Industrial & Logistics', category: 'industrial', version: '1.0.0', component: IndustrialTemplate },
  { id: 'template-6', slug: 'template-6', name: 'Industrial Estate', category: 'industrial', version: '1.0.0', component: IndustrialTemplate },

  // 7. Villa Premium
  { id: 'bds-07', slug: 'bds-07', name: 'BĐS 07 — Biệt Thự Compound 3D', category: 'villa', version: '1.0.0', component: VillaTemplate },
  { id: 'template-villa-premium', slug: 'villa-premium', name: 'Villa Premium', category: 'villa', version: '1.0.0', component: VillaTemplate },
  { id: 'template-modern-villa', slug: 'modern-villa', name: 'Modern Villa & Resort', category: 'villa', version: '1.0.0', component: VillaTemplate },
  { id: 'template-luxury-villa', slug: 'luxury-villa', name: 'Luxury Villa', category: 'villa', version: '1.0.0', component: VillaTemplate },
  { id: 'template-7', slug: 'template-7', name: 'Villa Premium', category: 'villa', version: '1.0.0', component: VillaTemplate },

  // 8. Eco Green
  { id: 'bds-08', slug: 'bds-08', name: 'BĐS 08 — Đô Thị Sinh Thái', category: 'eco', version: '1.0.0', component: EcoTemplate },
  { id: 'template-eco-green', slug: 'eco-green', name: 'Eco Green Style', category: 'eco', version: '1.0.0', component: EcoTemplate },
  { id: 'template-eco-living', slug: 'eco-living', name: 'Eco Living', category: 'eco', version: '1.0.0', component: EcoTemplate },
  { id: 'template-green-eco', slug: 'green-eco', name: 'Green Eco Nature', category: 'eco', version: '1.0.0', component: EcoTemplate },
  { id: 'template-8', slug: 'template-8', name: 'Eco Green', category: 'eco', version: '1.0.0', component: EcoTemplate },

  // 9. Classic Elegant
  { id: 'bds-09', slug: 'bds-09', name: 'BĐS 09 — Dinh Thự Di Sản', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-classic-elegant', slug: 'classic-elegant', name: 'Classic Elegant', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-classic-heritage', slug: 'classic-heritage', name: 'Classic Heritage', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-heritage-classic', slug: 'heritage-classic', name: 'Heritage Classic Architecture', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-9', slug: 'template-9', name: 'Classic Elegant', category: 'classic', version: '1.0.0', component: ClassicTemplate },

  // 10. Investment Pro
  { id: 'bds-10', slug: 'bds-10', name: 'BĐS 10 — Đầu Tư Bất Động Sản', category: 'investment', version: '1.0.0', component: InvestmentTemplate },
  { id: 'template-investment-pro', slug: 'investment-pro', name: 'Investment Pro', category: 'investment', version: '1.0.0', component: InvestmentTemplate },
  { id: 'template-tech-hub', slug: 'tech-hub', name: 'Future Tech City Hub', category: 'investment', version: '1.0.0', component: InvestmentTemplate },
  { id: 'template-10', slug: 'template-10', name: 'Investment Pro', category: 'investment', version: '1.0.0', component: InvestmentTemplate },

  // 11. Agency Onepage
  { id: 'bds-11', slug: 'bds-11', name: 'BĐS 11 — Landing Mở Bán', category: 'agency', version: '1.0.0', component: AgencyTemplate },
  { id: 'template-agency-onepage', slug: 'agency-onepage', name: 'Agency Onepage', category: 'agency', version: '1.0.0', component: AgencyTemplate },
  { id: 'template-suburban-family', slug: 'suburban-family', name: 'Suburban Family Living', category: 'agency', version: '1.0.0', component: AgencyTemplate },
  { id: 'template-11', slug: 'template-11', name: 'Agency Onepage', category: 'agency', version: '1.0.0', component: AgencyTemplate },

  // 12. Mega Developer Portal
  { id: 'bds-12', slug: 'bds-12', name: 'BĐS 12 — Cổng Thông Tin Dự Án', category: 'portal', version: '1.0.0', component: ListingMarketplace },
  { id: 'template-mega-developer', slug: 'mega-developer', name: 'Mega Developer', category: 'portal', version: '1.0.0', component: ListingMarketplace },
  { id: 'template-listing-portal', slug: 'listing-portal', name: 'Listing Portal', category: 'portal', version: '1.0.0', component: ListingMarketplace },
  { id: 'template-riverside-mansion', slug: 'riverside-mansion', name: 'Riverside Grand Mansion', category: 'portal', version: '1.0.0', component: ListingMarketplace },
  { id: 'template-12', slug: 'template-12', name: 'Mega Developer', category: 'portal', version: '1.0.0', component: ListingMarketplace },

  // 13. Sàn Đấu Giá BĐS
  { id: 'bds-13', slug: 'bds-13', name: 'BĐS 13 — Sàn Đấu Giá Bất Động Sản', category: 'auction', version: '1.0.0', component: AuctionTemplate },
  { id: 'template-auction-template', slug: 'auction-template', name: 'Auction Template', category: 'auction', version: '1.0.0', component: AuctionTemplate },
  { id: 'template-auction-bds', slug: 'auction-bds', name: 'Auction BĐS', category: 'auction', version: '1.0.0', component: AuctionTemplate },
  { id: 'template-13', slug: 'template-13', name: 'Auction Template', category: 'auction', version: '1.0.0', component: AuctionTemplate },

  // 14. Dự Án Đất Nền Phân Lô
  { id: 'bds-14', slug: 'bds-14', name: 'BĐS 14 — Đất Nền Quy Hoạch', category: 'land', version: '1.0.0', component: LandPlotTemplate },
  { id: 'template-landplot-template', slug: 'landplot-template', name: 'Landplot Template', category: 'land', version: '1.0.0', component: LandPlotTemplate },
  { id: 'template-land-plot', slug: 'land-plot', name: 'Land Plot', category: 'land', version: '1.0.0', component: LandPlotTemplate },
  { id: 'template-14', slug: 'template-14', name: 'Landplot Template', category: 'land', version: '1.0.0', component: LandPlotTemplate },

  // 15. Retail Podium / Shophouse
  { id: 'bds-15', slug: 'bds-15', name: 'BĐS 15 — Shophouse Thương Mại', category: 'retail', version: '1.0.0', component: RetailTemplate },
  { id: 'template-retail-podium', slug: 'retail-podium', name: 'Retail Podium', category: 'retail', version: '1.0.0', component: RetailTemplate },
  { id: 'template-retail-commercial', slug: 'retail-commercial', name: 'Retail Commercial', category: 'retail', version: '1.0.0', component: RetailTemplate },
  { id: 'template-commercial-plaza', slug: 'commercial-plaza', name: 'Commercial Plaza', category: 'retail', version: '1.0.0', component: RetailTemplate },
  { id: 'template-15', slug: 'template-15', name: 'Retail Podium', category: 'retail', version: '1.0.0', component: RetailTemplate },

  // 16. Personal Agent
  { id: 'bds-16', slug: 'bds-16', name: 'BĐS 16 — Môi Giới Nhà Đất', category: 'agent', version: '1.0.0', component: PersonalAgentTemplate },
  { id: 'template-personal-agent', slug: 'personal-agent', name: 'Personal Agent', category: 'agent', version: '1.0.0', component: PersonalAgentTemplate },
  { id: 'template-golf-residences', slug: 'golf-residences', name: 'Golf Residences', category: 'agent', version: '1.0.0', component: PersonalAgentTemplate },
  { id: 'template-16', slug: 'template-16', name: 'Personal Agent', category: 'agent', version: '1.0.0', component: PersonalAgentTemplate },

  // 17. Cổng Thông Tin Bất Động Sản Số 1 (HOT PORTAL)
  { id: 'bds-17', slug: 'bds-17', name: 'BĐS 17 — Cổng Thông Tin Bất Động Sản Số 1', category: 'portal', version: '1.0.0', component: PortalListingTemplate },
  { id: 'template-portal-listing', slug: 'portal-listing', name: 'Portal Listing', category: 'portal', version: '1.0.0', component: PortalListingTemplate },
  { id: 'template-vietnam-portal', slug: 'vietnam-portal', name: 'Vietnam Portal', category: 'portal', version: '1.0.0', component: PortalListingTemplate },
  { id: 'template-17', slug: 'template-17', name: 'Portal Listing', category: 'portal', version: '1.0.0', component: PortalListingTemplate },

  // 18. Sàn Giao Dịch & Đấu Giá Bến Thành
  { id: 'bds-18', slug: 'bds-18', name: 'BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành', category: 'portal', version: '1.0.0', component: Bds123PortalTemplate },
  { id: 'template-bds123-portal', slug: 'bds123-portal', name: 'Bds123 Portal', category: 'portal', version: '1.0.0', component: Bds123PortalTemplate },
  { id: 'template-benthanh-portal', slug: 'benthanh-portal', name: 'Benthanh Portal', category: 'portal', version: '1.0.0', component: Bds123PortalTemplate },
  { id: 'template-18', slug: 'template-18', name: 'Bds123 Portal', category: 'portal', version: '1.0.0', component: Bds123PortalTemplate },

  // 19. Sàn Niêm Yết Mật Độ Cao Nhà Đất Số
  { id: 'bds-19', slug: 'bds-19', name: 'BĐS 19 — Sàn Niêm Yết Mật Độ Cao Nhà Đất Số', category: 'portal', version: '1.0.0', component: NhadatsoDensityTemplate },
  { id: 'template-nhadatso-density', slug: 'nhadatso-density', name: 'Nhadatso Density', category: 'portal', version: '1.0.0', component: NhadatsoDensityTemplate },
  { id: 'template-nhadatso-portal', slug: 'nhadatso-portal', name: 'Nhadatso Portal', category: 'portal', version: '1.0.0', component: NhadatsoDensityTemplate },
  { id: 'template-19', slug: 'template-19', name: 'Nhadatso Density', category: 'portal', version: '1.0.0', component: NhadatsoDensityTemplate },

  // 20. Chung Cư Minh Khai & Times City
  { id: 'bds-20', slug: 'bds-20', name: 'BĐS 20 — Chung Cư Minh Khai & Times City', category: 'luxury', version: '1.0.0', component: MinhKhaiApartmentTemplate },
  { id: 'template-minhkhai-apartment', slug: 'minhkhai-apartment', name: 'Minh Khai Apartment', category: 'luxury', version: '1.0.0', component: MinhKhaiApartmentTemplate },
  { id: 'template-20', slug: 'template-20', name: 'Minh Khai Apartment', category: 'luxury', version: '1.0.0', component: MinhKhaiApartmentTemplate },

  // 21. Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội
  { id: 'bds-21', slug: 'bds-21', name: 'BĐS 21 — Sàn Cho Thuê & Mua Bán Chung Cư Hà Nội', category: 'portal', version: '1.0.0', component: HanoiRentalPortalTemplate },
  { id: 'template-hanoi-rental', slug: 'hanoi-rental', name: 'Hanoi Rental Portal', category: 'portal', version: '1.0.0', component: HanoiRentalPortalTemplate },
  { id: 'template-21', slug: 'template-21', name: 'Hanoi Rental Portal', category: 'portal', version: '1.0.0', component: HanoiRentalPortalTemplate },

  // 22. ZoHotels & Happy Land Nha Trang
  { id: 'bds-22', slug: 'bds-22', name: 'BĐS 22 — ZoHotels & Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: HappyLandResortTemplate },
  { id: 'template-happyland-resort', slug: 'happyland-resort', name: 'Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: HappyLandResortTemplate },
  { id: 'template-22', slug: 'template-22', name: 'Happy Land Nha Trang', category: 'resort', version: '1.0.0', component: HappyLandResortTemplate },

  // 23. Sàn Giao Dịch Nhà Phố Homeo
  { id: 'bds-23', slug: 'bds-23', name: 'BĐS 23 — Sàn Giao Dịch Nhà Phố Homeo', category: 'agency', version: '1.0.0', component: HomeoMultiThumbnailTemplate },
  { id: 'template-homeo-multithumb', slug: 'homeo-multithumb', name: 'Homeo Agency', category: 'agency', version: '1.0.0', component: HomeoMultiThumbnailTemplate },
  { id: 'template-23', slug: 'template-23', name: 'Homeo Agency', category: 'agency', version: '1.0.0', component: HomeoMultiThumbnailTemplate },

  // 24. RealtyBuild Trang Tin BĐS Số 1 Việt Nam
  { id: 'bds-24', slug: 'bds-24', name: 'BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam', category: 'portal', version: '1.0.0', component: RealtyBuildTechTemplate },
  { id: 'template-realtybuild-tech', slug: 'realtybuild-tech', name: 'RealtyBuild Portal', category: 'portal', version: '1.0.0', component: RealtyBuildTechTemplate },
  { id: 'template-24', slug: 'template-24', name: 'RealtyBuild Portal', category: 'portal', version: '1.0.0', component: RealtyBuildTechTemplate },
];

for (const tpl of INITIAL_TEMPLATES) {
  WebsiteTemplateRegistry.register(tpl);
}

export { WebsiteTemplateRegistry };

