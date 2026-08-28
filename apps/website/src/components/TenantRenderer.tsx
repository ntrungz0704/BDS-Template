import { WebsiteTemplateRegistry } from '../templates/registry';

interface TenantRendererProps {
  templateSlug: string;
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
  initialPage?: string;
  pageContent?: any;
}

export default function TenantRenderer({ templateSlug, company, theme, projects, posts, initialPage = 'home', pageContent }: TenantRendererProps) {
  const slug = templateSlug?.toLowerCase();

  // Resolve template component dynamically from Registry (supports 100+ templates)
  const templateDef = slug ? WebsiteTemplateRegistry.get(slug) : undefined;
  if (!templateDef) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-center text-white"><p>Website đang được cấu hình. Vui lòng quay lại sau.</p></main>;
  }
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
      pageContent={pageContent}
    />
  );
}

