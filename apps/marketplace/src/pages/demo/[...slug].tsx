/**
 * /demo/[...slug] — Template Live Demo Page
 *
 * Route patterns:
 *   /demo/luxury-gold            → Full demo page with PreviewToolbar
 *   /demo/luxury-gold/about      → Same, but template starts on /about page
 *   /demo/luxury-gold?embed=true → Embedded view (no toolbar) for iframe viewport isolation
 *
 * Architecture:
 *   - Desktop: DemoRenderer rendered directly in the page (no iframe needed)
 *   - Tablet/Mobile: Rendered inside a native <iframe> so Tailwind media queries
 *     evaluate against the iframe's actual viewport size (NOT the parent window).
 *     This is the only correct way to simulate responsive breakpoints.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { ALL_TEMPLATES, findTemplateBySlugOrId } from '../../data/templatesData';
import DemoRenderer from '../../components/demo/DemoRenderer';
import PreviewToolbar, { ViewportType } from '../../components/demo/PreviewToolbar';
import { useAuth } from '../../context/AuthContext';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

// ─── Viewport configuration ──────────────────────────────────────────────────

const VIEWPORT_CONFIGS: Record<
  ViewportType,
  { width: string | null; height: string; borderRadius: string; label: string }
> = {
  desktop: {
    width: null, // full container
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
    return { width: '100%', height: '100%', position: 'relative' };
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

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DemoLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans text-slate-200">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm font-semibold tracking-wider uppercase text-slate-400">
          Đang khởi tạo template...
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function TemplateLiveDemoPage() {
  const router = useRouter();
  const { addToCart } = useAuth();
  const { slug } = router.query;

  const templateSlug = Array.isArray(slug) ? slug[0] : slug;
  const pageSlug = Array.isArray(slug) && slug.length > 1 ? slug.slice(1).join('/') : 'home';
  const isEmbed = router.query.embed === 'true';
  const embedViewport = (router.query.vp as ViewportType) || 'desktop';

  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [session, setSession] = useState<{
    token: string;
    expiresAt: string;
    saveCount: number;
    expired: boolean;
  } | null>(null);

  // Synchronize parent URL with iframe navigation (same-origin polling)
  useEffect(() => {
    if (viewport === 'desktop' || isEmbed) return;

    const interval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {
          const iframePath = iframe.contentWindow.location.pathname;
          const currentPath = window.location.pathname;
          if (iframePath !== currentPath && iframePath.startsWith('/demo/')) {
            window.history.replaceState(null, '', iframePath + window.location.search);
          }
        }
      } catch {
        // Cross-origin or unavailable — safe to ignore
      }
    }, 300);

    return () => clearInterval(interval);
  }, [viewport, isEmbed]);

  const template = React.useMemo(() => {
    if (!templateSlug) return null;
    return findTemplateBySlugOrId(String(templateSlug)) || ALL_TEMPLATES.find(
      (t) =>
        t.slug === templateSlug ||
        t.id === templateSlug ||
        t.slug.toLowerCase() === String(templateSlug || '').toLowerCase()
    ) || ALL_TEMPLATES[0];
  }, [templateSlug]);

  useEffect(() => {
    if (!router.isReady || !template || isEmbed) return;
    
    const fetchOrInitSession = async () => {
      const templateParam = template.slug || template.id;
      try {
        const savedToken = localStorage.getItem(`demo_session_${templateParam}`) || localStorage.getItem(`demo_session_${template.id}`);
        if (savedToken && savedToken !== 'local-demo-session') {
          try {
            const res = await axios.get(`${API_URL}/api/demo/sessions/${savedToken}`, { withCredentials: true });
            if (res.data?.success) {
              if (res.data.data.expired) {
                // Token expired: remove from localStorage and auto-refresh a new session
                localStorage.removeItem(`demo_session_${templateParam}`);
                localStorage.removeItem(`demo_session_${template.id}`);
              } else {
                setSession({
                  token: res.data.data.sessionToken || savedToken,
                  expiresAt: res.data.data.expiresAt,
                  saveCount: res.data.data.saveCount || 0,
                  expired: false,
                });
                return;
              }
            }
          } catch {
            // Ignore error and proceed to fresh session
          }
        }
        
        // Init fresh session via API
        try {
          const res = await axios.post(`${API_URL}/api/demo/sessions`, { templateId: templateParam }, { withCredentials: true });
          if (res.data?.success) {
            const { sessionToken, expiresAt } = res.data.data;
            localStorage.setItem(`demo_session_${templateParam}`, sessionToken);
            setSession({
              token: sessionToken,
              expiresAt,
              saveCount: 0,
              expired: false,
            });
            return;
          }
        } catch {
          // Fall through to local session
        }

        // Always provide an active local session so the customer is never blocked
        setSession({
          token: 'local-demo-session',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          saveCount: 0,
          expired: false,
        });
      } catch (err) {
        console.warn('Khởi tạo phiên demo:', err);
        setSession({
          token: 'local-demo-session',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          saveCount: 0,
          expired: false,
        });
      }
    };
    
    fetchOrInitSession();
  }, [router.isReady, template, isEmbed]);

  // ── Early returns ────────────────────────────────────────────────────────

  // Wait for router to be ready — prevents flash
  if (!router.isReady || !slug || !template) {
    return <DemoLoadingSkeleton />;
  }

  // ── Embed mode (no toolbar, pure template) ────────────────────────────────
  // Used as iframe src for mobile/tablet viewport simulation
  if (isEmbed) {
    return (
      <>
        <Head>
          <title>{template.name} — Preview</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div className="platformbds-template w-full min-h-screen bg-slate-950 overflow-x-hidden">
          <DemoRenderer template={template} viewport={embedViewport} initialPage={pageSlug} />
        </div>
      </>
    );
  }

  // ── Full demo page with PreviewToolbar ────────────────────────────────────

  const iframeViewportSrc = `/demo/${templateSlug}/${pageSlug}?embed=true&vp=${viewport}`;

  return (
    <>
      <Head>
        <title>{`Demo Trực Tiếp: ${template.name} (${template.collectionName || 'VIP'}) | PLATFORMBDS`}</title>
        <meta
          name="description"
          content={`Trải nghiệm trực tiếp mẫu website ${template.name} - ${template.description || 'Website BĐS chuyên nghiệp'}`}
        />
        <meta name="robots" content="noindex,follow" />
        {/* All fonts are now loaded via next/font/google in _app.tsx */}
      </Head>

      <div
        className={`bg-slate-950 flex flex-col font-sans ${
          isFullscreen ? 'fixed inset-0 z-[99998]' : 'min-h-screen'
        }`}
      >
        {/* Banner session */}
        {!isEmbed && session && !session.expired && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white text-center py-1.5 px-4 text-xs font-medium flex justify-center items-center gap-4 shadow-sm z-50">
            <span>🚀 Phiên dùng thử: còn {Math.max(0, Math.ceil((new Date(session.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} ngày</span>
            <span className="w-1 h-1 rounded-full bg-white/50"></span>
            <span>Đã lưu {session.saveCount}/3 lần</span>
          </div>
        )}



        {/* ── Preview Toolbar ─────────────────────────────────────────────── */}
        <PreviewToolbar
          template={template}
          viewport={viewport}
          onViewportChange={setViewport}
          isFullscreen={isFullscreen}
          onFullscreenToggle={() => setIsFullscreen((f) => !f)}
        />

        {/* ── Viewport Area ───────────────────────────────────────────────── */}
        <div
          className={`flex-1 overflow-y-auto bg-slate-950 flex justify-center ${
            viewport === 'desktop'
              ? 'items-start'
              : 'items-center py-6 px-3 sm:px-8'
          }`}
        >
          {/* Device frame */}
          <div
            className="transition-all duration-300 ease-in-out bg-slate-950 overflow-hidden platformbds-template w-full min-h-full flex flex-col justify-between"
            style={getViewportStyle(viewport)}
          >
            {/* Desktop → direct render (no iframe needed, no responsive quirks) */}
            {viewport === 'desktop' && (
              <DemoRenderer template={template} viewport="desktop" initialPage={pageSlug} />
            )}

            {/* Tablet / Mobile → iframe for correct CSS media query evaluation */}
            {(viewport === 'tablet' || viewport === 'mobile') && (
              <iframe
                ref={iframeRef}
                key={`${templateSlug}-${viewport}`}
                src={iframeViewportSrc}
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title={`${template.name} — ${VIEWPORT_CONFIGS[viewport].label} Preview`}
                loading="eager"
                scrolling="yes"
              />
            )}
          </div>
        </div>

        {/* ── Status bar ─────────────────────────────────────────────────── */}
        <div className="h-7 bg-slate-900/80 border-t border-slate-800/50 flex items-center justify-center gap-4 px-4">
          <span className="text-[10px] text-slate-500 font-medium">
            🔒 Demo trực tiếp — Nội dung mẫu, không phải website thật
          </span>
          {viewport !== 'desktop' && (
            <span className="text-[10px] text-slate-600">
              · Kích thước: {VIEWPORT_CONFIGS[viewport].width}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
