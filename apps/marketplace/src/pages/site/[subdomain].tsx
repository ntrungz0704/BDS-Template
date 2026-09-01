import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { ALL_TEMPLATES, findTemplateBySlugOrId, Template } from '../../data/templatesData';
import DemoRenderer from '../../components/demo/DemoRenderer';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

// Smart template matcher from subdomain string (e.g. hoang-lam-lp02-3456 -> lp-02)
function resolveTemplateFromSubdomain(rawSub: string): Template | null {
  if (!rawSub) return null;
  const s = rawSub.toLowerCase();

  // 1. Direct slug or ID match
  const direct = findTemplateBySlugOrId(rawSub);
  if (direct) return direct;

  // 2. Match LP-01 to LP-07 (e.g. lp01, lp-01, lp02, lp-02...)
  for (let i = 1; i <= 7; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    if (s.includes(`lp${num}`) || s.includes(`lp-${num}`) || s.includes(`lp_${num}`)) {
      const match = findTemplateBySlugOrId(`lp-${num}`) || findTemplateBySlugOrId(`lp${num}`);
      if (match) return match;
    }
  }

  // 3. Match BDS-01 to BDS-24 (e.g. bds01, bds-01, bds14, bds-14...)
  for (let i = 1; i <= 24; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    if (s.includes(`bds${num}`) || s.includes(`bds-${num}`) || s.includes(`bds_${num}`)) {
      const match = findTemplateBySlugOrId(`bds-${num}`) || findTemplateBySlugOrId(`bds${num}`);
      if (match) return match;
    }
  }

  // 4. Match common template keywords
  for (const tpl of ALL_TEMPLATES) {
    const cleanTplSlug = tpl.slug.replace(/[^a-z0-9]/g, '');
    if (cleanTplSlug && s.includes(cleanTplSlug)) {
      return tpl;
    }
  }

  return null;
}

export default function TenantDirectSitePage() {
  const router = useRouter();
  const { subdomain, page } = router.query;
  const rawSubdomain = Array.isArray(subdomain) ? subdomain[0] : (subdomain as string) || '';
  const pageSlug = (page as string) || 'home';

  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template | null>(null);
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [tenantProjects, setTenantProjects] = useState<any[]>([]);
  const [tenantPosts, setTenantPosts] = useState<any[]>([]);
  const [tenantTheme, setTenantTheme] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady || !rawSubdomain) return;

    const fetchTenantData = async () => {
      setLoading(true);
      try {
        // Smart template fallback first (from subdomain pattern matching)
        const parsedTpl = resolveTemplateFromSubdomain(rawSubdomain);
        if (parsedTpl) {
          setTemplate(parsedTpl);
        }

        // Determine the actual tenant slug
        // For marketplace subdomains (e.g. "thay-cuong-cmtg4n-9876"), rawSubdomain IS the tenant slug
        // For custom domains, we need to resolve via API first
        let tenantSlug = rawSubdomain;

        // Try resolving custom domain (optional — may fail for marketplace subdomains, that's OK)
        try {
          const domainRes = await axios.get(`${API_URL}/api/website/resolve-domain?domain=${encodeURIComponent(rawSubdomain)}`);
          if (domainRes.data?.data?.tenantSlug) {
            tenantSlug = domainRes.data.data.tenantSlug;
          }
        } catch (_) {
          // Custom domain not found — use rawSubdomain as tenant slug (this is the normal case for marketplace)
        }

        // Concurrently fetch tenant company info, projects, posts, and theme settings from CMS API
        const [infoRes, projectsRes, postsRes, themeRes] = await Promise.allSettled([
          axios.get(`${API_URL}/api/website/${tenantSlug}/company-info`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/projects?limit=50`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/posts?limit=50`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/theme`),
        ]);

        if (infoRes.status === 'fulfilled' && infoRes.value.data?.data) {
          const data = infoRes.value.data.data;
          setTenantInfo(data);

          // CRITICAL: Use the template slug assigned in the database (from purchase/order)
          const assignedTplId = data?.tenant?.template?.slug || data?.tenant?.templateId;
          if (assignedTplId) {
            const dbMatched = findTemplateBySlugOrId(assignedTplId);
            if (dbMatched) {
              setTemplate(dbMatched);
            }
          }
        }

        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data?.data)) {
          setTenantProjects(projectsRes.value.data.data);
        }

        if (postsRes.status === 'fulfilled' && Array.isArray(postsRes.value.data?.data)) {
          setTenantPosts(postsRes.value.data.data);
        }

        if (themeRes.status === 'fulfilled' && themeRes.value.data?.data) {
          setTenantTheme(themeRes.value.data.data);
        }
      } catch (err) {
        // Only use subdomain fallback if ALL API calls failed
        const fallbackTpl = resolveTemplateFromSubdomain(rawSubdomain) || ALL_TEMPLATES[0];
        setTemplate(fallbackTpl);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [router.isReady, rawSubdomain]);

  if (loading || !template) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans text-slate-200">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-semibold tracking-wider uppercase text-slate-400">
            Đang tải website: {rawSubdomain}...
          </div>
        </div>
      </div>
    );
  }

  // Display name formatting
  const displayBrandName =
    tenantInfo?.name ||
    tenantInfo?.companyName ||
    (rawSubdomain
      ? rawSubdomain
          .split('-')
          .filter((part: string) => !part.startsWith('lp') && !part.startsWith('bds') && !/^\d+$/.test(part))
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : '') ||
    rawSubdomain.toUpperCase();

  const companyData = {
    name: tenantInfo?.name || displayBrandName,
    companyName: tenantInfo?.name || displayBrandName,
    slogan: tenantInfo?.slogan || 'Bất Động Sản Cao Cấp & Đầu Tư Sinh Lời',
    phone: tenantInfo?.phone || tenantInfo?.hotline || '0919 006 030',
    hotline: tenantInfo?.phone || tenantInfo?.hotline || '0919 006 030',
    zalo: tenantInfo?.zalo || tenantInfo?.phone || '0919 006 030',
    email: tenantInfo?.email || `${rawSubdomain.replace(/[^a-z0-9]/g, '')}@aireviewbds.com`,
    address: tenantInfo?.address || 'TP. Hồ Chí Minh & Hà Nội',
    logo: tenantInfo?.logo,
    aboutContent: tenantInfo?.aboutContent,
    description: tenantInfo?.description,
    workingHours: tenantInfo?.workingHours || '8h00 - 20h00',
    ...(tenantInfo || {}),
  };

  return (
    <>
      <Head>
        <title>{`${displayBrandName} — Website BĐS`}</title>
        <meta name="description" content={`Website bất động sản của ${displayBrandName}`} />
        {tenantTheme?.fontHeading && (
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(tenantTheme.fontHeading).replace(/%20/g, '+')}:wght@400;600;700;800;900&display=swap`}
          />
        )}
        {tenantTheme?.fontBody && tenantTheme?.fontBody !== tenantTheme?.fontHeading && (
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(tenantTheme.fontBody).replace(/%20/g, '+')}:wght@400;500;600;700&display=swap`}
          />
        )}
      </Head>

      {tenantTheme && (
        <style jsx global>{`
          :root {
            ${tenantTheme.primaryColor ? `--color-primary: ${tenantTheme.primaryColor};` : ''}
            ${tenantTheme.secondaryColor ? `--color-secondary: ${tenantTheme.secondaryColor};` : ''}
            ${tenantTheme.accentColor ? `--color-accent: ${tenantTheme.accentColor};` : ''}
            ${tenantTheme.backgroundColor ? `--color-bg: ${tenantTheme.backgroundColor};` : ''}
            ${tenantTheme.textColor ? `--color-text: ${tenantTheme.textColor};` : ''}
            ${tenantTheme.fontHeading ? `--font-heading: '${tenantTheme.fontHeading}', sans-serif;` : ''}
            ${tenantTheme.fontBody ? `--font-body: '${tenantTheme.fontBody}', sans-serif;` : ''}
          }
          ${tenantTheme.fontBody ? `
          .platformbds-template {
            font-family: var(--font-body) !important;
          }
          ` : ''}
          ${tenantTheme.fontHeading ? `
          .platformbds-template h1,
          .platformbds-template h2,
          .platformbds-template h3,
          .platformbds-template h4,
          .platformbds-template h5,
          .platformbds-template h6 {
            font-family: var(--font-heading) !important;
          }
          ` : ''}
        `}</style>
      )}

      <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white platformbds-template w-full">
        <DemoRenderer 
          template={template} 
          viewport="desktop" 
          initialPage={pageSlug}
          company={companyData}
          theme={tenantTheme}
          projects={tenantProjects.length > 0 ? tenantProjects : undefined}
          posts={tenantPosts.length > 0 ? tenantPosts : undefined}
        />
      </div>
    </>
  );
}
