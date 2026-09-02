/**
 * PreviewToolbar — Demo Preview Mode Toolbar
 *
 * This component ONLY exists in demo/preview mode.
 * It is NEVER rendered on production tenant websites.
 *
 * Routes:
 *   /demo/[template-slug]         → Shows toolbar (demo mode)
 *   /demo/[slug]?embed=true       → NO toolbar (iframe viewport isolation)
 *   [tenant].platformbds.vn       → NO toolbar (production)
 *   www.[custom-domain].vn        → NO toolbar (production)
 */

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Eye,
  EyeOff,
  ChevronRight,
  Zap,
  Check,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type ViewportType = 'desktop' | 'tablet' | 'mobile';

interface TemplateInfo {
  slug: string;
  name: string;
  badge?: string;
  accentColor?: string;
  collectionName?: string;
}

interface PreviewToolbarProps {
  template: TemplateInfo;
  viewport: ViewportType;
  onViewportChange: (vp: ViewportType) => void;
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
  onHide?: () => void;
  className?: string;
}

const VIEWPORT_BUTTONS: Array<{
  key: ViewportType;
  label: string;
  Icon: React.FC<{ className?: string }>;
  tooltip: string;
}> = [
  { key: 'desktop', label: 'Desktop', Icon: Monitor, tooltip: 'Xem Desktop (100%)' },
  { key: 'tablet', label: 'Tablet', Icon: Tablet, tooltip: 'Xem Tablet (768px)' },
  { key: 'mobile', label: 'Mobile', Icon: Smartphone, tooltip: 'Xem Mobile (390px)' },
];

export default function PreviewToolbar({
  template,
  viewport,
  onViewportChange,
  isFullscreen = false,
  onFullscreenToggle,
  onHide,
  className = '',
}: PreviewToolbarProps) {
  const router = useRouter();
  const { addToCart, isPurchased, isPendingApproval } = useAuth();
  const owned = isPurchased(template.slug);
  const isPending = isPendingApproval(template.slug);
  const [copied, setCopied] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const handleShare = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          // Fallback for browsers without clipboard API
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
    }
  }, []);

  const handleHide = useCallback(() => {
    setToolbarVisible(false);
    onHide?.();
  }, [onHide]);

  const handleAddToCart = useCallback(() => {
    addToCart(template, 'BUY');
  }, [addToCart, template]);

  const handleBuyNow = useCallback(() => {
    addToCart(template, 'BUY');
    router.push('/cart');
  }, [addToCart, template, router]);

  const handleTrial = useCallback(() => {
    router.push(`/?trial=${template.slug}`);
  }, [router, template.slug]);

  const handleBackToMarketplace = useCallback(() => {
    router.push('/templates');
  }, [router]);

  // Mini restore button when toolbar is hidden
  if (!toolbarVisible) {
    return (
      <button
        onClick={() => setToolbarVisible(true)}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full text-slate-300 hover:text-white text-xs font-semibold shadow-2xl transition-all hover:bg-slate-800"
        title="Hiện thanh công cụ"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>Hiện Toolbar</span>
      </button>
    );
  }

  return (
    <div
      className={`h-[52px] bg-slate-900/96 backdrop-blur-xl border-b border-slate-800/80 px-3 flex items-center justify-between sticky top-0 z-[99999] text-slate-200 select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* ── LEFT: Back & Template Info ─────────────────────────── */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={handleBackToMarketplace}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-150 shrink-0 border border-slate-700/50 hover:border-slate-600"
          title="Quay lại Kho Mẫu"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kho Mẫu</span>
        </button>

        {/* Breadcrumb divider */}
        <ChevronRight className="w-3 h-3 text-slate-600 hidden sm:block shrink-0" />

        {/* Template badge + name */}
        <div className="flex items-center gap-2 min-w-0">
          {template.badge && (
            <span
              className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest shrink-0 hidden md:inline-block"
              style={{ backgroundColor: template.accentColor || '#2563EB', color: '#000' }}
            >
              {template.badge}
            </span>
          )}
          <span className="text-sm font-bold text-white truncate max-w-[140px] sm:max-w-[200px] lg:max-w-xs">
            {template.name}
          </span>
          {template.collectionName && (
            <span className="text-[11px] text-slate-500 hidden xl:inline shrink-0">
              ({template.collectionName})
            </span>
          )}
        </div>
      </div>

      {/* ── CENTER: Viewport Switcher (hidden on mobile devices) ── */}
      <div className="hidden md:flex items-center bg-slate-950/80 p-0.5 rounded-xl border border-slate-800 shrink-0 gap-0.5">
        {VIEWPORT_BUTTONS.map(({ key, label, Icon, tooltip }) => (
          <button
            key={key}
            onClick={() => onViewportChange(key)}
            title={tooltip}
            aria-label={tooltip}
            aria-pressed={viewport === key}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[9px] text-xs font-bold transition-all duration-150 ${
              viewport === key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── RIGHT: Action Buttons ───────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0 flex-1 justify-end">
        {/* Share */}
        <button
          onClick={handleShare}
          title={copied ? 'Đã sao chép link!' : 'Sao chép link demo'}
          className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all duration-150 ${
            copied
              ? 'bg-emerald-700/30 border-emerald-600/50 text-emerald-400'
              : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span className="hidden xl:inline">{copied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
        </button>

        {/* Fullscreen toggle */}
        {onFullscreenToggle && (
          <button
            onClick={onFullscreenToggle}
            title={isFullscreen ? 'Thoát Fullscreen' : 'Xem Fullscreen'}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-150 hidden md:flex"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        {/* Hide toolbar */}
        <button
          onClick={handleHide}
          title="Ẩn thanh công cụ"
          className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-150 hidden sm:flex"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-700 hidden sm:block" />

        {owned ? (
          <a
            href={process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition-all duration-150 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đã Sở Hữu - Vào CMS</span>
            <span className="sm:hidden">Vào CMS</span>
          </a>
        ) : isPending ? (
          <button
            onClick={() => router.push('/customer/dashboard')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-xs font-extrabold shadow-lg transition-all duration-150 flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đang Chờ Duyệt</span>
            <span className="sm:hidden">Chờ duyệt</span>
          </button>
        ) : (
          <>
            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all duration-150 items-center gap-1.5 flex"
              title="Thêm mẫu này vào giỏ hàng"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Thêm giỏ</span>
            </button>

            {/* Buy CTA — primary action */}
            <button
              onClick={handleBuyNow}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/25 transition-all duration-150 flex items-center gap-1.5 border border-blue-500/30"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">Mua Ngay</span>
              <span className="sm:hidden">Mua</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

