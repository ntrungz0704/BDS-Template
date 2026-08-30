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

  // Tenant must render the exact template that was provisioned. Rendering a
  // different default design would be a cross-product commercial misdelivery.
  const templateDef = slug ? WebsiteTemplateRegistry.get(slug) : undefined;

  if (!templateDef) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-center text-white"><p>Website chưa có cấu hình template hợp lệ. Vui lòng liên hệ quản trị viên.</p></main>;
  }
  const TemplateComponent = templateDef.component;

  const templateMock = {
    name: company?.name || templateDef.name,
    slug: templateDef.slug,
    collectionSlug: templateDef.category,
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

