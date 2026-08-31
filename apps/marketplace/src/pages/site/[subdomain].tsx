import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { ALL_TEMPLATES, findTemplateBySlugOrId, Template } from '../../data/templatesData';
import DemoRenderer from '../../components/demo/DemoRenderer';
import PreviewToolbar, { ViewportType } from '../../components/demo/PreviewToolbar';

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

const VIEWPORT_CONFIGS: Record<
  ViewportType,
  { width: string | null; height: string; borderRadius: string; label: string }
> = {
  desktop: {
    width: null,
    height: '100%',
    borderRadius: '0',
    label: 'Desktop',
  },
  tablet: {
    width: '768px',
    height: '90vh',
    borderRadius: '16px',
    label: 'Tablet (768px)',
  },
  mobile: {
    width: '390px',
    height: '85vh',
    borderRadius: '24px',
    label: 'Mobile (390px)',
  },
};

function getViewportStyle(viewport: ViewportType): React.CSSProperties {
  const config = VIEWPORT_CONFIGS[viewport];
  if (viewport === 'desktop') {
    return { width: '100%', minHeight: '100vh', position: 'relative' };
  }
  return {
    width: config.width!,
    minWidth: config.width!,
    height: config.height,
    minHeight: viewport === 'tablet' ? '800px' : '750px',
    margin: '0 auto',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
    transform: 'translateZ(0)',
  };
}

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
        // Smart template fallback first
        const parsedTpl = resolveTemplateFromSubdomain(rawSubdomain);
        if (parsedTpl) {
          setTemplate(parsedTpl);
        }

        // Try resolving from API
        const res = await axios.get(`${API_URL}/api/website/resolve-domain?domain=${encodeURIComponent(rawSubdomain)}`);
        const foundSlug = res.data?.data?.tenantSlug || rawSubdomain;
        
        const infoRes = await axios.get(`${API_URL}/api/website/${foundSlug}/company-info`);
        const data = infoRes.data?.data;
        if (data) {
          setTenantInfo(data);
          const assignedTplId = data?.tenant?.template?.slug || data?.tenant?.templateId;
          const dbMatched = findTemplateBySlugOrId(assignedTplId);
          if (dbMatched) {
            setTemplate(dbMatched);
          }
        }
      } catch (err) {
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

  // Display name formatting (e.g. hoang-lam-lp02-3456 -> HOÀNG LÂM BĐS)
  const displayBrandName = tenantInfo?.companyName || 
    rawSubdomain
      .split('-')
      .filter((part: string) => !part.startsWith('lp') && !part.startsWith('bds') && !/^\d+$/.test(part))
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || rawSubdomain.toUpperCase();

  return (
    <>
      <Head>
        <title>{`${displayBrandName} — Website BĐS Trực Tuyến`}</title>
        <meta name="description" content={`Website bất động sản trực tuyến của ${displayBrandName}`} />
      </Head>

      <div className={`bg-slate-950 flex flex-col font-sans ${isFullscreen ? 'fixed inset-0 z-[99998]' : 'min-h-screen'}`}>
        {/* Top Info Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-emerald-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Website Khách Hàng: {displayBrandName}</span>
            </span>
            <span className="font-mono text-slate-400 hidden sm:inline">
              Tên miền: <strong className="text-white">{rawSubdomain}</strong>
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400">
              Mẫu: <strong className="text-blue-400">{template.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-xs"
            >
              Vào CMS Quản Trị
            </a>
            <Link
              href="/templates"
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-xs"
            >
              Xem Kho Mẫu
            </Link>
          </div>
        </div>

        {/* Viewport Toolbar */}
        <PreviewToolbar
          template={template}
          viewport={viewport}
          onViewportChange={setViewport}
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        />

        {/* Main Viewport Container */}
        <div
          className={`flex-1 overflow-y-auto bg-slate-950 flex justify-center ${
            viewport === 'desktop'
              ? 'items-start'
              : 'items-center py-6 px-3 sm:px-8'
          }`}
        >
          <div
            className="transition-all duration-300 ease-in-out bg-slate-950 overflow-hidden platformbds-template w-full min-h-screen flex flex-col justify-between"
            style={getViewportStyle(viewport)}
          >
            <DemoRenderer template={template} viewport={viewport} initialPage={pageSlug} />
          </div>
        </div>
      </div>
    </>
  );
}
