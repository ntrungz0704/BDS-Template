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
const LP05Template = dynamic(() => import('../components/templates/LP05Template'), { loading: () => <LoadingSkeleton /> });
const LP06Template = dynamic(() => import('../components/templates/LP06Template'), { loading: () => <LoadingSkeleton /> });
const LP07Template = dynamic(() => import('../components/templates/LP07Template'), { loading: () => <LoadingSkeleton /> });

class WebsiteTemplateRegistry {
  private static templates = new Map<string, TemplateDefinition>();

  public static register(def: TemplateDefinition) {
    this.templates.set(def.slug.toLowerCase(), def);
    this.templates.set(def.id.toLowerCase(), def);
  }

  public static get(idOrSlug?: string): TemplateDefinition | undefined {
    if (!idOrSlug) return this.templates.get('bds-01') || this.templates.get('luxury-gold');
    const rawKey = idOrSlug.toLowerCase().trim();
    const cleanKey = rawKey.replace(/^template-/, '');
    
    // Direct map lookup
    const direct = this.templates.get(rawKey) || this.templates.get(cleanKey);
    if (direct) return direct;

    // Normalized lookup (e.g. lp02 -> lp-02, bds05 -> bds-05)
    const normalizedHyphen = cleanKey.replace(/^([a-z]+)(\d+)$/, '$1-$2');
    const normalizedNoHyphen = cleanKey.replace(/^([a-z]+)-(\d+)$/, '$1$2');
    const normalizedPadded = cleanKey.replace(/^([a-z]+)-?(\d)$/, '$1-0$2');

    const mapped = this.templates.get(normalizedHyphen) || 
      this.templates.get(normalizedNoHyphen) || 
      this.templates.get(normalizedPadded);
    if (mapped) return mapped;

    // Substring lookup
    for (const [key, def] of this.templates.entries()) {
      if (cleanKey.includes(key) || key.includes(cleanKey)) {
        return def;
      }
    }

    // Default fallback to prevent blank/crash
    return this.templates.get('bds-01') || this.templates.get('luxury-gold');
  }

  public static list(): TemplateDefinition[] {
    const unique = new Set(this.templates.values());
    return Array.from(unique);
  }
}

// ─── Register Initial 24 Templates ───────────────────────────────────────────

const INITIAL_TEMPLATES: TemplateDefinition[] = [
  // 1. BatDongSan Classic Portal
  { id: 'bds-01', slug: 'bds-01', name: 'Template #01 - BatDongSan Classic Portal', category: 'portal', version: '1.0.0', component: BDS01Template },
  { id: 'template-luxury-gold', slug: 'luxury-gold', name: 'Template #01 - BatDongSan Classic Portal', category: 'portal', version: '1.0.0', component: BDS01Template },
  { id: 'template-1', slug: 'template-1', name: 'Template #01 - BatDongSan Classic Portal', category: 'portal', version: '1.0.0', component: BDS01Template },

  // 2. Modern Metro Portal
  { id: 'bds-02', slug: 'bds-02', name: 'Template #02 - Modern Metro Portal', category: 'portal', version: '1.0.0', component: BDS02Template },
  { id: 'template-minimal-white', slug: 'minimal-white', name: 'Template #02 - Modern Metro Portal', category: 'portal', version: '1.0.0', component: BDS02Template },
  { id: 'template-minimal-zen', slug: 'minimal-zen', name: 'Template #02 - Modern Metro Portal', category: 'portal', version: '1.0.0', component: BDS02Template },
  { id: 'template-dark-prestige', slug: 'dark-prestige', name: 'Template #02 - Modern Metro Portal', category: 'portal', version: '1.0.0', component: BDS02Template },
  { id: 'template-2', slug: 'template-2', name: 'Template #02 - Modern Metro Portal', category: 'portal', version: '1.0.0', component: BDS02Template },

  // 3. Luxury Realty Prestige
  { id: 'bds-03', slug: 'bds-03', name: 'Template #03 - Luxury Realty Prestige', category: 'portal', version: '1.0.0', component: BDS03Template },
  { id: 'template-modern-corporate', slug: 'modern-corporate', name: 'Template #03 - Luxury Realty Prestige', category: 'portal', version: '1.0.0', component: BDS03Template },
  { id: 'template-3', slug: 'template-3', name: 'Template #03 - Luxury Realty Prestige', category: 'portal', version: '1.0.0', component: BDS03Template },

  // 4. Density RaoVat Pro
  { id: 'bds-04', slug: 'bds-04', name: 'Template #04 - Density RaoVat Pro', category: 'portal', version: '1.0.0', component: BDS04Template },
  { id: 'template-resort-paradise', slug: 'resort-paradise', name: 'Template #04 - Density RaoVat Pro', category: 'portal', version: '1.0.0', component: BDS04Template },
  { id: 'template-ocean-view', slug: 'ocean-view', name: 'Template #04 - Density RaoVat Pro', category: 'portal', version: '1.0.0', component: BDS04Template },
  { id: 'template-ocean-blue', slug: 'ocean-blue', name: 'Template #04 - Density RaoVat Pro', category: 'portal', version: '1.0.0', component: BDS04Template },
  { id: 'template-4', slug: 'template-4', name: 'Template #04 - Density RaoVat Pro', category: 'portal', version: '1.0.0', component: BDS04Template },

  // 5. Map-Centric Interactive Portal
  { id: 'bds-05', slug: 'bds-05', name: 'Template #05 - Map-Centric Interactive Portal', category: 'portal', version: '1.0.0', component: BDS05Template },
  { id: 'template-urban-city', slug: 'urban-city', name: 'Template #05 - Map-Centric Interactive Portal', category: 'portal', version: '1.0.0', component: BDS05Template },
  { id: 'template-smart-urban', slug: 'smart-urban', name: 'Template #05 - Map-Centric Interactive Portal', category: 'portal', version: '1.0.0', component: BDS05Template },
  { id: 'template-high-rise', slug: 'high-rise', name: 'Template #05 - Map-Centric Interactive Portal', category: 'portal', version: '1.0.0', component: BDS05Template },
  { id: 'template-5', slug: 'template-5', name: 'Template #05 - Map-Centric Interactive Portal', category: 'portal', version: '1.0.0', component: BDS05Template },

  // 6. Grand Riverside Eco-Township
  { id: 'bds-06', slug: 'bds-06', name: 'Template #06 - Grand Riverside Eco-Township', category: 'portal', version: '1.0.0', component: BDS06Template },
  { id: 'template-industrial-estate', slug: 'industrial-estate', name: 'Template #06 - Grand Riverside Eco-Township', category: 'portal', version: '1.0.0', component: BDS06Template },
  { id: 'template-industrial-logistics', slug: 'industrial-logistics', name: 'Template #06 - Grand Riverside Eco-Township', category: 'portal', version: '1.0.0', component: BDS06Template },
  { id: 'template-6', slug: 'template-6', name: 'Template #06 - Grand Riverside Eco-Township', category: 'portal', version: '1.0.0', component: BDS06Template },

  // 7. Pannamera Eco-Village Bảo Lộc
  { id: 'bds-07', slug: 'bds-07', name: 'Template #07 - Pannamera Eco-Village Bảo Lộc', category: 'portal', version: '1.0.0', component: BDS07Template },
  { id: 'template-villa-premium', slug: 'villa-premium', name: 'Template #07 - Pannamera Eco-Village Bảo Lộc', category: 'portal', version: '1.0.0', component: BDS07Template },
  { id: 'template-modern-villa', slug: 'modern-villa', name: 'Template #07 - Pannamera Eco-Village Bảo Lộc', category: 'portal', version: '1.0.0', component: BDS07Template },
  { id: 'template-luxury-villa', slug: 'luxury-villa', name: 'Template #07 - Pannamera Eco-Village Bảo Lộc', category: 'portal', version: '1.0.0', component: BDS07Template },
  { id: 'template-7', slug: 'template-7', name: 'Template #07 - Pannamera Eco-Village Bảo Lộc', category: 'portal', version: '1.0.0', component: BDS07Template },

  // 8. Industrial & Logistics Hub
  { id: 'bds-08', slug: 'bds-08', name: 'Template #08 - Industrial & Logistics Hub', category: 'portal', version: '1.0.0', component: BDS08Template },
  { id: 'template-eco-green', slug: 'eco-green', name: 'Template #08 - Industrial & Logistics Hub', category: 'portal', version: '1.0.0', component: BDS08Template },
  { id: 'template-eco-living', slug: 'eco-living', name: 'Template #08 - Industrial & Logistics Hub', category: 'portal', version: '1.0.0', component: BDS08Template },
  { id: 'template-green-eco', slug: 'green-eco', name: 'Template #08 - Industrial & Logistics Hub', category: 'portal', version: '1.0.0', component: BDS08Template },
  { id: 'template-8', slug: 'template-8', name: 'Template #08 - Industrial & Logistics Hub', category: 'portal', version: '1.0.0', component: BDS08Template },

  // 9. Heritage & Colonial Portal
  { id: 'bds-09', slug: 'bds-09', name: 'Template #09 - Heritage & Colonial Portal', category: 'portal', version: '1.0.0', component: BDS09Template },
  { id: 'template-classic-elegant', slug: 'classic-elegant', name: 'Template #09 - Heritage & Colonial Portal', category: 'portal', version: '1.0.0', component: BDS09Template },
  { id: 'template-classic-heritage', slug: 'classic-heritage', name: 'Template #09 - Heritage & Colonial Portal', category: 'portal', version: '1.0.0', component: BDS09Template },
  { id: 'template-heritage-classic', slug: 'heritage-classic', name: 'Template #09 - Heritage & Colonial Portal', category: 'portal', version: '1.0.0', component: BDS09Template },
  { id: 'template-9', slug: 'template-9', name: 'Template #09 - Heritage & Colonial Portal', category: 'portal', version: '1.0.0', component: BDS09Template },

  // 10. Investment & High Yield Portal
  { id: 'bds-10', slug: 'bds-10', name: 'Template #10 - Investment & High Yield Portal', category: 'portal', version: '1.0.0', component: BDS10Template },
  { id: 'template-investment-pro', slug: 'investment-pro', name: 'Template #10 - Investment & High Yield Portal', category: 'portal', version: '1.0.0', component: BDS10Template },
  { id: 'template-tech-hub', slug: 'tech-hub', name: 'Template #10 - Investment & High Yield Portal', category: 'portal', version: '1.0.0', component: BDS10Template },
  { id: 'template-10', slug: 'template-10', name: 'Template #10 - Investment & High Yield Portal', category: 'portal', version: '1.0.0', component: BDS10Template },

  // 11. Modern Villa & Waterfront Estate
  { id: 'bds-11', slug: 'bds-11', name: 'Template #11 - Modern Villa & Waterfront Estate', category: 'portal', version: '1.0.0', component: BDS11Template },
  { id: 'template-agency-onepage', slug: 'agency-onepage', name: 'Template #11 - Modern Villa & Waterfront Estate', category: 'portal', version: '1.0.0', component: BDS11Template },
  { id: 'template-suburban-family', slug: 'suburban-family', name: 'Template #11 - Modern Villa & Waterfront Estate', category: 'portal', version: '1.0.0', component: BDS11Template },
  { id: 'template-11', slug: 'template-11', name: 'Template #11 - Modern Villa & Waterfront Estate', category: 'portal', version: '1.0.0', component: BDS11Template },

  // 12. Mega Developer Ecosystem Portal
  { id: 'bds-12', slug: 'bds-12', name: 'Template #12 - Mega Developer Ecosystem Portal', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-mega-developer', slug: 'mega-developer', name: 'Template #12 - Mega Developer Ecosystem Portal', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-listing-portal', slug: 'listing-portal', name: 'Template #12 - Mega Developer Ecosystem Portal', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-riverside-mansion', slug: 'riverside-mansion', name: 'Template #12 - Mega Developer Ecosystem Portal', category: 'portal', version: '1.0.0', component: BDS12Template },
  { id: 'template-12', slug: 'template-12', name: 'Template #12 - Mega Developer Ecosystem Portal', category: 'portal', version: '1.0.0', component: BDS12Template },

  // 13. Real Estate Auction & Liquidation Portal
  { id: 'bds-13', slug: 'bds-13', name: 'Template #13 - Real Estate Auction & Liquidation Portal', category: 'portal', version: '1.0.0', component: BDS13Template },
  { id: 'template-auction-template', slug: 'auction-template', name: 'Template #13 - Real Estate Auction & Liquidation Portal', category: 'portal', version: '1.0.0', component: BDS13Template },
  { id: 'template-auction-bds', slug: 'auction-bds', name: 'Template #13 - Real Estate Auction & Liquidation Portal', category: 'portal', version: '1.0.0', component: BDS13Template },
  { id: 'template-13', slug: 'template-13', name: 'Template #13 - Real Estate Auction & Liquidation Portal', category: 'portal', version: '1.0.0', component: BDS13Template },

  // 14. Landplot & Farmland Exchange Portal
  { id: 'bds-14', slug: 'bds-14', name: 'Template #14 - Landplot & Farmland Exchange Portal', category: 'portal', version: '1.0.0', component: BDS14Template },
  { id: 'template-landplot-template', slug: 'landplot-template', name: 'Template #14 - Landplot & Farmland Exchange Portal', category: 'portal', version: '1.0.0', component: BDS14Template },
  { id: 'template-land-plot', slug: 'land-plot', name: 'Template #14 - Landplot & Farmland Exchange Portal', category: 'portal', version: '1.0.0', component: BDS14Template },
  { id: 'template-14', slug: 'template-14', name: 'Template #14 - Landplot & Farmland Exchange Portal', category: 'portal', version: '1.0.0', component: BDS14Template },

  // 15. Commercial & Retail Podium Portal
  { id: 'bds-15', slug: 'bds-15', name: 'Template #15 - Commercial & Retail Podium Portal', category: 'portal', version: '1.0.0', component: BDS15Template },
  { id: 'template-retail-podium', slug: 'retail-podium', name: 'Template #15 - Commercial & Retail Podium Portal', category: 'portal', version: '1.0.0', component: BDS15Template },
  { id: 'template-retail-commercial', slug: 'retail-commercial', name: 'Template #15 - Commercial & Retail Podium Portal', category: 'portal', version: '1.0.0', component: BDS15Template },
  { id: 'template-commercial-plaza', slug: 'commercial-plaza', name: 'Template #15 - Commercial & Retail Podium Portal', category: 'portal', version: '1.0.0', component: BDS15Template },
  { id: 'template-15', slug: 'template-15', name: 'Template #15 - Commercial & Retail Podium Portal', category: 'portal', version: '1.0.0', component: BDS15Template },

  // 16. Elite Personal Broker Portal
  { id: 'bds-16', slug: 'bds-16', name: 'Template #16 - Elite Personal Broker Portal', category: 'portal', version: '1.0.0', component: BDS16Template },
  { id: 'template-personal-agent', slug: 'personal-agent', name: 'Template #16 - Elite Personal Broker Portal', category: 'portal', version: '1.0.0', component: BDS16Template },
  { id: 'template-golf-residences', slug: 'golf-residences', name: 'Template #16 - Elite Personal Broker Portal', category: 'portal', version: '1.0.0', component: BDS16Template },
  { id: 'template-16', slug: 'template-16', name: 'Template #16 - Elite Personal Broker Portal', category: 'portal', version: '1.0.0', component: BDS16Template },

  // 17. Northern Capital Heritage Portal
  { id: 'bds-17', slug: 'bds-17', name: 'Template #17 - Northern Capital Heritage Portal', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-portal-listing', slug: 'portal-listing', name: 'Template #17 - Northern Capital Heritage Portal', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-vietnam-portal', slug: 'vietnam-portal', name: 'Template #17 - Northern Capital Heritage Portal', category: 'portal', version: '1.0.0', component: BDS17Template },
  { id: 'template-17', slug: 'template-17', name: 'Template #17 - Northern Capital Heritage Portal', category: 'portal', version: '1.0.0', component: BDS17Template },

  // 18. Saigon Dynamic Riverfront Portal
  { id: 'bds-18', slug: 'bds-18', name: 'Template #18 - Saigon Dynamic Riverfront Portal', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-bds123-portal', slug: 'bds123-portal', name: 'Template #18 - Saigon Dynamic Riverfront Portal', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-benthanh-portal', slug: 'benthanh-portal', name: 'Template #18 - Saigon Dynamic Riverfront Portal', category: 'portal', version: '1.0.0', component: BDS18Template },
  { id: 'template-18', slug: 'template-18', name: 'Template #18 - Saigon Dynamic Riverfront Portal', category: 'portal', version: '1.0.0', component: BDS18Template },

  // 19. Central Coast Scenic Portal
  { id: 'bds-19', slug: 'bds-19', name: 'Template #19 - Central Coast Scenic Portal', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-nhadatso-density', slug: 'nhadatso-density', name: 'Template #19 - Central Coast Scenic Portal', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-nhadatso-portal', slug: 'nhadatso-portal', name: 'Template #19 - Central Coast Scenic Portal', category: 'portal', version: '1.0.0', component: BDS19Template },
  { id: 'template-19', slug: 'template-19', name: 'Template #19 - Central Coast Scenic Portal', category: 'portal', version: '1.0.0', component: BDS19Template },

  // 20. Mountain & Highland Retreat Portal
  { id: 'bds-20', slug: 'bds-20', name: 'Template #20 - Mountain & Highland Retreat Portal', category: 'portal', version: '1.0.0', component: BDS20Template },
  { id: 'template-minhkhai-apartment', slug: 'minhkhai-apartment', name: 'Template #20 - Mountain & Highland Retreat Portal', category: 'portal', version: '1.0.0', component: BDS20Template },
  { id: 'template-20', slug: 'template-20', name: 'Template #20 - Mountain & Highland Retreat Portal', category: 'portal', version: '1.0.0', component: BDS20Template },

  // 21. Clean Minimal Scandinavian Portal
  { id: 'bds-21', slug: 'bds-21', name: 'Template #21 - Clean Minimal Scandinavian Portal', category: 'portal', version: '1.0.0', component: BDS21Template },
  { id: 'template-hanoi-rental', slug: 'hanoi-rental', name: 'Template #21 - Clean Minimal Scandinavian Portal', category: 'portal', version: '1.0.0', component: BDS21Template },
  { id: 'template-21', slug: 'template-21', name: 'Template #21 - Clean Minimal Scandinavian Portal', category: 'portal', version: '1.0.0', component: BDS21Template },

  // 22. Night Life & Commercial Strip Portal
  { id: 'bds-22', slug: 'bds-22', name: 'Template #22 - Night Life & Commercial Strip Portal', category: 'portal', version: '1.0.0', component: BDS22Template },
  { id: 'template-happyland-resort', slug: 'happyland-resort', name: 'Template #22 - Night Life & Commercial Strip Portal', category: 'portal', version: '1.0.0', component: BDS22Template },
  { id: 'template-22', slug: 'template-22', name: 'Template #22 - Night Life & Commercial Strip Portal', category: 'portal', version: '1.0.0', component: BDS22Template },

  // 23. Luxury Penthouse & Sky Villa Portal
  { id: 'bds-23', slug: 'bds-23', name: 'Template #23 - Luxury Penthouse & Sky Villa Portal', category: 'portal', version: '1.0.0', component: BDS23Template },
  { id: 'template-homeo-multithumb', slug: 'homeo-multithumb', name: 'Template #23 - Luxury Penthouse & Sky Villa Portal', category: 'portal', version: '1.0.0', component: BDS23Template },
  { id: 'template-23', slug: 'template-23', name: 'Template #23 - Luxury Penthouse & Sky Villa Portal', category: 'portal', version: '1.0.0', component: BDS23Template },

  // 24. Smart City & Future Living Portal
  { id: 'bds-24', slug: 'bds-24', name: 'Template #24 - Smart City & Future Living Portal', category: 'portal', version: '1.0.0', component: BDS24Template },
  { id: 'template-realtybuild-tech', slug: 'realtybuild-tech', name: 'Template #24 - Smart City & Future Living Portal', category: 'portal', version: '1.0.0', component: BDS24Template },
  { id: 'template-24', slug: 'template-24', name: 'Template #24 - Smart City & Future Living Portal', category: 'portal', version: '1.0.0', component: BDS24Template },

  // ─── SPECIALIZED SALES LANDING PAGES ───
  { id: 'lp-01', slug: 'lp-01', name: 'LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel', category: 'landing', version: '1.0.0', component: LP01Template },
  { id: 'lp-02', slug: 'lp-02', name: 'LP #02 - Tuyển Dụng 300 Chuyên Viên Kinh Doanh BĐS', category: 'landing', version: '1.0.0', component: LP02Template },
  { id: 'lp-03', slug: 'lp-03', name: 'LP #03 - Tổ Hợp Căn Hộ Cao Cấp Simple Page', category: 'landing', version: '1.0.0', component: LP03Template },
  { id: 'lp-04', slug: 'lp-04', name: 'LP #04 - Sale Môi Giới BĐS Triệu Đô Authority', category: 'landing', version: '1.0.0', component: LP04Template },
  { id: 'lp-05', slug: 'lp-05', name: 'LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park Tower', category: 'landing', version: '1.0.0', component: LP05Template },
  { id: 'lp-06', slug: 'lp-06', name: 'LP #06 - Đại Đô Thị Sân Bay Stella Mega City Cần Thơ', category: 'landing', version: '1.0.0', component: LP06Template },
  { id: 'lp-07', slug: 'lp-07', name: 'LP #07 - Siêu Thành Phố Biển Du Lịch Sức Khỏe NovaWorld Phan Thiết 1.000ha', category: 'landing', version: '1.0.0', component: LP07Template },
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
    WebsiteTemplateRegistry.register({
      ...legacyDefinition,
      id: `bds${number}`,
      slug: `bds${number}`,
    });
    WebsiteTemplateRegistry.register({
      ...legacyDefinition,
      id: `portal${number}`,
      slug: `portal${number}`,
    });
  }
}

for (let index = 1; index <= 7; index += 1) {
  const number = String(index).padStart(2, '0');
  const lpDef = WebsiteTemplateRegistry.get(`lp-${number}`);
  if (lpDef) {
    WebsiteTemplateRegistry.register({
      ...lpDef,
      id: `lp${number}`,
      slug: `lp${number}`,
    });
    WebsiteTemplateRegistry.register({
      ...lpDef,
      id: `landing-${number}`,
      slug: `landing-${number}`,
    });
    WebsiteTemplateRegistry.register({
      ...lpDef,
      id: `landing${number}`,
      slug: `landing${number}`,
    });
  }
}

export { WebsiteTemplateRegistry };
