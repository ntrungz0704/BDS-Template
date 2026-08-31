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
        <title>{`${displayBrandName} — Website BĐS`}</title>
        <meta name="description" content={`Website bất động sản của ${displayBrandName}`} />
      </Head>

      <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white platformbds-template w-full">
        <DemoRenderer template={template} viewport="desktop" initialPage={pageSlug} />
      </div>
    </>
  );
}
