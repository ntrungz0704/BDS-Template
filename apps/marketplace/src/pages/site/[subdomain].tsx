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
        {/* Unified Sleek Top Control Bar */}
        <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-mono font-bold text-[11px] border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Website: {displayBrandName}</span>
            </span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">
              Mẫu: <strong className="text-blue-400">{template.name}</strong>
            </span>
          </div>

          {/* Viewport Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewport('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewport === 'desktop'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewport === 'tablet'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewport === 'mobile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5m6 6l5 5m0 0l-5 0m5 0l0-5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
            <a
              href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-xs shadow-md shadow-blue-600/20"
            >
              Vào CMS Quản Trị
            </a>
          </div>
        </header>

        {/* Main Viewport Container */}
        <main
          className={`flex-1 bg-slate-950 flex justify-center overflow-y-auto ${
            viewport === 'desktop'
              ? 'p-0 items-start'
              : 'p-4 sm:p-8 items-center'
          }`}
        >
          <div
            className="transition-all duration-300 ease-in-out bg-white overflow-x-hidden platformbds-template w-full shadow-2xl"
            style={getViewportStyle(viewport)}
          >
            <DemoRenderer template={template} viewport={viewport} initialPage={pageSlug} />
          </div>
        </main>
      </div>
    </>
  );
}
