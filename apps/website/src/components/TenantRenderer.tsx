import { WebsiteTemplateRegistry } from '../templates/registry';
import { captureLeadFromForm } from '../utils/leadCapture';
import CmsManagedPage from './CmsManagedPage';

interface TenantRendererProps {
  templateSlug: string;
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
  initialPage?: string;
  pageContent?: any;
  tenantSlug?: string;
}

export default function TenantRenderer({ templateSlug, company, theme, projects, posts, initialPage = 'home', pageContent, tenantSlug = '' }: TenantRendererProps) {
  const slug = templateSlug?.toLowerCase();

  // Tenant must render the exact template that was provisioned. Rendering a
  // different default design would be a cross-product commercial misdelivery.
  const templateDef = slug ? WebsiteTemplateRegistry.get(slug) : undefined;

  if (!templateDef) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-center text-white"><p>Website chưa có cấu hình template hợp lệ. Vui lòng liên hệ quản trị viên.</p></main>;
  }
  const TemplateComponent = templateDef.component;

  const handleSubmitCapture = (event: React.FormEvent<HTMLDivElement>) => {
    const form = event.target instanceof HTMLFormElement ? event.target : null;
    if (!form || form.dataset.crmManaged === 'true') return;

    const payload = captureLeadFromForm(form, templateDef.slug, initialPage);
    const submitContactForm = (globalThis as any).submitContactForm;
    if (!payload || typeof submitContactForm !== 'function') return;

    // Template handlers continue to own their UI state/toast. This capture runs
    // once for every real lead form and persists the same submission to CRM.
    void submitContactForm(payload).catch((error: Error) => {
      console.error('[CRM] Không thể lưu lead từ form template:', error.message);
    });
  };

  const templateMock = {
    name: company?.name || templateDef.name,
    slug: templateDef.slug,
    collectionSlug: templateDef.category,
  };

  return (
    <div onSubmitCapture={handleSubmitCapture}>
      {pageContent?.sections?.length ? (
        <CmsManagedPage page={pageContent} company={company} theme={theme} projects={projects} posts={posts} tenantSlug={tenantSlug} />
      ) : (
        <TemplateComponent
          template={templateMock}
          company={company}
          theme={theme}
          projects={projects}
          posts={posts}
          initialPage={initialPage}
          pageContent={pageContent}
        />
      )}
    </div>
  );
}

