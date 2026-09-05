import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { findTemplateBySlugOrId, Template, ALL_TEMPLATES } from '../../data/templatesData';
import DemoRenderer from '../../components/demo/DemoRenderer';
import { getDefaultTenantConfig } from '@repo/utils';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export default function TenantDirectSitePage() {
  const router = useRouter();
  const { subdomain, page } = router.query;
  const rawSubdomain = Array.isArray(subdomain) ? subdomain[0] : (subdomain as string) || '';
  const pageSlug = (page as string) || 'home';

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [tenantProjects, setTenantProjects] = useState<any[]>([]);
  const [tenantPosts, setTenantPosts] = useState<any[]>([]);
  const [tenantTheme, setTenantTheme] = useState<any>(null);
  const [tenantPageContent, setTenantPageContent] = useState<any>(null);
  const [tenantConfig, setTenantConfig] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady || !rawSubdomain) return;

    const fetchTenantData = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        let tenantSlug = rawSubdomain;

        // 1. Try resolving custom domain if needed
        try {
          const domainRes = await axios.get(`${API_URL}/api/website/resolve-domain?domain=${encodeURIComponent(rawSubdomain)}`);
          if (domainRes.data?.data?.tenantSlug) {
            tenantSlug = domainRes.data.data.tenantSlug;
          }
        } catch (_) {
          // Custom domain not found — use rawSubdomain as tenant slug
        }

        // 2. Fetch company info — BẮT BUỘC PHẢI TỒN TẠI VÀ ĐÃ KÍCH HOẠT TRONG DATABASE (kèm timestamp chống stale cache)
        const t = Date.now();
        const noCacheHeaders = {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        };

        const infoRes = await axios.get(`${API_URL}/api/website/${tenantSlug}/company-info?_t=${t}`, {
          headers: noCacheHeaders,
        });
        
        if (!infoRes.data?.success || !infoRes.data?.data) {
          throw new Error('Tenant not found in database');
        }

        const data = infoRes.data.data;
        setTenantInfo(data);

        // 3. Lấy đúng mẫu template đã được mua & lưu trong database
        const assignedTplId = data?.tenant?.template?.slug || data?.tenant?.templateId;
        if (!assignedTplId) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const dbMatched = findTemplateBySlugOrId(assignedTplId);
        if (!dbMatched) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setTemplate(dbMatched);

        // 4. Lấy dữ liệu dự án, bài viết, theme, nội dung trang tùy biến của website khách hàng (kèm timestamp chống stale cache)
        const targetPage = pageSlug && pageSlug !== 'home' ? pageSlug : 'home';
        const [projectsRes, postsRes, themeRes, pageRes, configRes] = await Promise.allSettled([
          axios.get(`${API_URL}/api/website/${tenantSlug}/projects?limit=50&_t=${t}`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/posts?limit=50&_t=${t}`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/theme?_t=${t}`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/pages/${targetPage}?_t=${t}`),
          axios.get(`${API_URL}/api/website/${tenantSlug}/tenant-config?_t=${t}`),
        ]);

        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data?.data)) {
          setTenantProjects(projectsRes.value.data.data);
        }

        if (postsRes.status === 'fulfilled' && Array.isArray(postsRes.value.data?.data)) {
          setTenantPosts(postsRes.value.data.data);
        }

        if (themeRes.status === 'fulfilled' && themeRes.value.data?.data) {
          setTenantTheme(themeRes.value.data.data);
        }

        if (pageRes.status === 'fulfilled' && pageRes.value.data?.data) {
          setTenantPageContent(pageRes.value.data.data);
        }

        if (configRes.status === 'fulfilled' && configRes.value.data?.data) {
          setTenantConfig(configRes.value.data.data);
        }
      } catch (err: any) {
        // Fallback tự động khi chạy demo hoặc khi backend chưa online
        if (['trungnghia', 'trung-nghia', 'bds16', 'bds-16', 'personal-top-broker'].includes(rawSubdomain.toLowerCase())) {
          const bds16Template = findTemplateBySlugOrId('bds-16') || findTemplateBySlugOrId('personal-top-broker') || ALL_TEMPLATES[0];
          setTemplate(bds16Template);
          setTenantInfo({
            companyName: 'Trung Nghĩa Nhà Phố',
            brandTitle: 'Trung Nghĩa Nhà Phố',
            slogan: 'CHUYÊN TÒA NHÀ & CĂN HỘ DỊCH VỤ QUẬN 7',
            phone: '0394678913',
            email: 'thienanminhcorp@gmail.com',
            address: 'Tòa Nhà Paragon, 3 Nguyễn Lương Bằng, Phường Tân Phú, Quận 7, TP Hồ Chí Minh',
            tenant: {
              template: { slug: 'bds-16' },
              templateId: 'bds-16',
            }
          });
          setTenantConfig(getDefaultTenantConfig('bds-16'));
          setNotFound(false);
        } else {
          // Website không tồn tại trong database hoặc chưa được kích hoạt
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTenantData();
  }, [router.isReady, rawSubdomain]);

  // Màn hình loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans text-slate-200">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-semibold tracking-wider uppercase text-slate-400">
            Đang xác thực & tải website: {rawSubdomain}...
          </div>
        </div>
      </div>
    );
  }

  // Màn hình 404: Website chưa được kích hoạt hoặc chưa mua
  if (notFound || !template || !tenantInfo) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <Head>
          <title>Website Chưa Tồn Tại Hoặc Chưa Kích Hoạt | AI Review BĐS</title>
        </Head>
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Website Chưa Kích Hoạt
          </span>
          <h1 className="text-xl font-black text-white mt-4 mb-2">
            Không tìm thấy website: <span className="text-amber-300 font-mono text-base block mt-1 break-all">{rawSubdomain}</span>
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Website này chưa được mua, chưa được ban quản trị phê duyệt hoặc chưa kích hoạt trong hệ thống.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/templates"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Khám Phá 24 Mẫu Website BĐS
            </Link>
            <Link
              href="/customer/dashboard"
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-all"
            >
              Vào Quản Lý Website Của Tôi
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-400 mt-2 font-medium"
            >
              ← Về Trang Chủ Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Display name formatting
  const displayBrandName = tenantInfo?.name || tenantInfo?.companyName || 'Bất Động Sản';

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
          pageContent={tenantPageContent}
          config={tenantConfig}
        />
      </div>
    </>
  );
}
