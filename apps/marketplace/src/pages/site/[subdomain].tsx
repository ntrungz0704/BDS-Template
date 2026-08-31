import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { ALL_TEMPLATES, findTemplateBySlugOrId, Template } from '../../data/templatesData';
import DemoRenderer from '../../components/demo/DemoRenderer';
import PreviewToolbar, { ViewportType } from '../../components/demo/PreviewToolbar';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

export default function TenantDirectSitePage() {
  const router = useRouter();
  const { subdomain, page } = router.query;
  const rawSubdomain = Array.isArray(subdomain) ? subdomain[0] : (subdomain as string) || '';
  const pageSlug = (page as string) || 'home';

  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template | null>(null);
  const [tenantInfo, setTenantInfo] = useState<any>(null);
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!router.isReady || !rawSubdomain) return;

    const fetchTenantData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/website/resolve-domain?domain=${encodeURIComponent(rawSubdomain)}`);
        const foundSlug = res.data?.data?.tenantSlug || rawSubdomain;
        
        const infoRes = await axios.get(`${API_URL}/api/website/${foundSlug}/company-info`);
        const data = infoRes.data?.data;
        setTenantInfo(data);

        const assignedTplId = data?.tenant?.template?.slug || data?.tenant?.templateId || 'luxury-gold';
        const matched = findTemplateBySlugOrId(assignedTplId) || ALL_TEMPLATES[0];
        setTemplate(matched);
      } catch (err) {
        const directMatch = findTemplateBySlugOrId(rawSubdomain);
        setTemplate(directMatch || ALL_TEMPLATES[0]);
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

  return (
    <>
      <Head>
        <title>{`${tenantInfo?.companyName || rawSubdomain.toUpperCase()} — Website BĐS Trực Tuyến`}</title>
        <meta name="description" content={`Website bất động sản trực tuyến của ${tenantInfo?.companyName || rawSubdomain}`} />
      </Head>

      <div className={`bg-slate-950 flex flex-col font-sans ${isFullscreen ? 'fixed inset-0 z-[99998]' : 'min-h-screen'}`}>
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-emerald-500/30">
              ● Website Trực Tuyến
            </span>
            <span className="font-mono text-slate-400">
              Tên miền phụ: <strong className="text-white">{rawSubdomain}</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">
              Mẫu giao diện: <strong className="text-blue-400">{template.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              Vào CMS Quản Trị
            </a>
            <Link
              href="/templates"
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
            >
              Xem Kho Mẫu
            </Link>
          </div>
        </div>

        <PreviewToolbar
          template={template}
          viewport={viewport}
          onViewportChange={setViewport}
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        />

        <div className="flex-1 overflow-auto bg-slate-900 flex items-center justify-center p-0">
          <div className="w-full h-full">
            <DemoRenderer template={template} viewport={viewport} initialPage={pageSlug} />
          </div>
        </div>
      </div>
    </>
  );
}
