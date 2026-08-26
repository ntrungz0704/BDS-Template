import { WebsiteTemplateRegistry } from '../templates/registry';

interface TenantRendererProps {
  templateSlug: string;
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
  initialPage?: string;
}

export default function TenantRenderer({ templateSlug, company, theme, projects, posts, initialPage = 'home' }: TenantRendererProps) {
  const slug = templateSlug?.toLowerCase() || 'luxury-gold';

  // Resolve template component dynamically from Registry (supports 100+ templates)
  const templateDef = WebsiteTemplateRegistry.get(slug);
  const TemplateComponent = templateDef.component;

  const templateMock = {
    name: company?.name || templateDef.name || 'PlatformBDS Residence',
    slug: templateDef.slug,
    collectionSlug: templateDef.category || slug.split('-')[0] || 'luxury',
  };

  return (
    <TemplateComponent 
      template={templateMock} 
      company={company} 
      theme={theme} 
      projects={projects} 
      posts={posts} 
      initialPage={initialPage} 
    />
  );
}
