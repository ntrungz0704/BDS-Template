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
  { id: 'template-luxury-gold', slug: 'luxury-gold', name: 'Luxury Gold', category: 'luxury', version: '1.0.0', component: LuxuryTemplate },
  { id: 'template-minimal-white', slug: 'minimal-white', name: 'Minimal White', category: 'minimal', version: '1.0.0', component: MinimalTemplate },
  { id: 'template-modern-corporate', slug: 'modern-corporate', name: 'Modern Corporate', category: 'corporate', version: '1.0.0', component: CorporateTemplate },
  { id: 'template-resort-paradise', slug: 'resort-paradise', name: 'Resort Paradise', category: 'resort', version: '1.0.0', component: ResortTemplate },
  { id: 'template-urban-city', slug: 'urban-city', name: 'Urban City', category: 'apartment', version: '1.0.0', component: ApartmentTemplate },
  { id: 'template-industrial-estate', slug: 'industrial-estate', name: 'Industrial Estate', category: 'industrial', version: '1.0.0', component: IndustrialTemplate },
  { id: 'template-luxury-villa', slug: 'luxury-villa', name: 'Luxury Villa', category: 'villa', version: '1.0.0', component: VillaTemplate },
  { id: 'template-eco-living', slug: 'eco-living', name: 'Eco Living', category: 'eco', version: '1.0.0', component: EcoTemplate },
  { id: 'template-classic-heritage', slug: 'classic-heritage', name: 'Classic Heritage', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-classic-elegant', slug: 'classic-elegant', name: 'Classic Elegant', category: 'classic', version: '1.0.0', component: ClassicTemplate },
  { id: 'template-investment-pro', slug: 'investment-pro', name: 'Investment Pro', category: 'investment', version: '1.0.0', component: InvestmentTemplate },
  { id: 'template-agency-onepage', slug: 'agency-onepage', name: 'Agency Onepage', category: 'agency', version: '1.0.0', component: AgencyTemplate },
  { id: 'template-retail-commercial', slug: 'retail-commercial', name: 'Retail Commercial', category: 'retail', version: '1.0.0', component: RetailTemplate },
  { id: 'template-listing-portal', slug: 'listing-portal', name: 'Listing Portal', category: 'portal', version: '1.0.0', component: ListingMarketplace },
  { id: 'template-personal-agent', slug: 'personal-agent', name: 'Personal Agent', category: 'agent', version: '1.0.0', component: PersonalAgentTemplate },
  { id: 'template-auction-bds', slug: 'auction-bds', name: 'Auction BĐS', category: 'auction', version: '1.0.0', component: AuctionTemplate },
  { id: 'template-land-plot', slug: 'land-plot', name: 'Land Plot', category: 'land', version: '1.0.0', component: LandPlotTemplate },
];

for (const tpl of INITIAL_TEMPLATES) {
  WebsiteTemplateRegistry.register(tpl);
}

export { WebsiteTemplateRegistry };
