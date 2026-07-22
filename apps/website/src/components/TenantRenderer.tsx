import React from 'react';
import dynamic from 'next/dynamic';

const LoadingSkeleton = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-medium">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-4"></div>
    Đang tải không gian trải nghiệm...
  </div>
);

// Import động 16 templates cao cấp
const LuxuryTemplate = dynamic(() => import('./templates/LuxuryTemplate'), { loading: () => <LoadingSkeleton /> });
const MinimalTemplate = dynamic(() => import('./templates/MinimalTemplate'), { loading: () => <LoadingSkeleton /> });
const CorporateTemplate = dynamic(() => import('./templates/CorporateTemplate'), { loading: () => <LoadingSkeleton /> });
const ResortTemplate = dynamic(() => import('./templates/ResortTemplate'), { loading: () => <LoadingSkeleton /> });
const ApartmentTemplate = dynamic(() => import('./templates/ApartmentTemplate'), { loading: () => <LoadingSkeleton /> });
const IndustrialTemplate = dynamic(() => import('./templates/IndustrialTemplate'), { loading: () => <LoadingSkeleton /> });
const VillaTemplate = dynamic(() => import('./templates/VillaTemplate'), { loading: () => <LoadingSkeleton /> });
const EcoTemplate = dynamic(() => import('./templates/EcoTemplate'), { loading: () => <LoadingSkeleton /> });
const ClassicTemplate = dynamic(() => import('./templates/ClassicTemplate'), { loading: () => <LoadingSkeleton /> });
const InvestmentTemplate = dynamic(() => import('./templates/InvestmentTemplate'), { loading: () => <LoadingSkeleton /> });
const AgencyTemplate = dynamic(() => import('./templates/AgencyTemplate'), { loading: () => <LoadingSkeleton /> });
const RetailTemplate = dynamic(() => import('./templates/RetailTemplate'), { loading: () => <LoadingSkeleton /> });
const ListingMarketplace = dynamic(() => import('./templates/ListingMarketplace'), { loading: () => <LoadingSkeleton /> });
const PersonalAgentTemplate = dynamic(() => import('./templates/PersonalAgentTemplate'), { loading: () => <LoadingSkeleton /> });
const AuctionTemplate = dynamic(() => import('./templates/AuctionTemplate'), { loading: () => <LoadingSkeleton /> });
const LandPlotTemplate = dynamic(() => import('./templates/LandPlotTemplate'), { loading: () => <LoadingSkeleton /> });

interface TenantRendererProps {
  templateSlug: string;
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
}

export default function TenantRenderer({ templateSlug, company, theme, projects, posts }: TenantRendererProps) {
  const slug = templateSlug?.toLowerCase() || '';

  // Tạo mock template object để truyền vào component
  const templateMock = {
    name: company?.name || 'PlatformBDS Residence',
    slug: slug,
    collectionSlug: slug.split('-')[0] || 'luxury',
  };

  // Điều phối render chính xác template tương ứng
  switch (slug) {
    case 'luxury-gold':
      return <LuxuryTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'minimal-white':
      return <MinimalTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'modern-corporate':
      return <CorporateTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'resort-paradise':
      return <ResortTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'urban-city':
      return <ApartmentTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'industrial-estate':
      return <IndustrialTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'luxury-villa':
      return <VillaTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'eco-living':
      return <EcoTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'classic-heritage':
      return <ClassicTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'investment-pro':
      return <InvestmentTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'agency-onepage':
      return <AgencyTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'retail-commercial':
      return <RetailTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'listing-portal':
      return <ListingMarketplace template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'personal-agent':
      return <PersonalAgentTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'auction-bds':
      return <AuctionTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    case 'land-plot':
      return <LandPlotTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
    default:
      // Fallback về Luxury Gold nếu slug không tìm thấy
      return <LuxuryTemplate template={templateMock} company={company} theme={theme} projects={projects} posts={posts} />;
  }
}
