/**
 * CMS SEO & Analytics Settings Page
 *
 * Three-tab SEO configuration panel:
 *   - Tab 1: SEO Cơ Bản — meta title, meta description (char count), OG image, robots.txt, sitemap
 *   - Tab 2: Google Analytics — GA4 Measurement ID, Search Console verification
 *   - Tab 3: Social Media — OG title, OG description, OG image preview, Twitter card type
 *   - Persistent Save button
 */

import React, { useState } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Search,
  BarChart3,
  Share2,
  Save,
  Check,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  FileText,
  Twitter,
  Globe,
  Eye,
  Info,
  RefreshCw,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SeoTab = 'basic' | 'analytics' | 'social';

interface SeoBasicForm {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
}

interface AnalyticsForm {
  ga4MeasurementId: string;
  searchConsoleCode: string;
}

interface SocialForm {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCardType: 'summary' | 'summary_large_image' | 'app' | 'player';
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_BASIC: SeoBasicForm = {
  metaTitle: 'My Tenant — Bất Động Sản Uy Tín Tại Việt Nam',
  metaDescription: 'Chuyên cung cấp các dự án bất động sản cao cấp, uy tín tại Việt Nam. Tìm nhà đất, căn hộ, biệt thự phù hợp với ngân sách của bạn.',
  ogImage: '',
  robotsTxt: `User-agent: *\nAllow: /\n\nSitemap: https://mytenant.platformbds.vn/sitemap.xml`,
  sitemapEnabled: true,
};

const DEFAULT_ANALYTICS: AnalyticsForm = {
  ga4MeasurementId: '',
  searchConsoleCode: '',
};

const DEFAULT_SOCIAL: SocialForm = {
  ogTitle: 'My Tenant — Bất Động Sản Uy Tín',
  ogDescription: 'Khám phá hàng trăm dự án bất động sản cao cấp trên toàn quốc.',
  ogImage: '',
  twitterCardType: 'summary_large_image',
};

// ─── Helper: Form Field ────────────────────────────────────────────────────────

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label}{' '}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Helper: Toggle ───────────────────────────────────────────────────────────

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-100">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// ─── Helper: Image Upload Placeholder ─────────────────────────────────────────

function ImageUploadPlaceholder({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[1200/630] max-h-48 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="OG Preview" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
          >
            Xóa
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-colors cursor-pointer group"
          onClick={() => {
            const url = prompt('Nhập URL hình ảnh (1200×630px):');
            if (url) onChange(url);
          }}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-200 group-hover:bg-blue-100 flex items-center justify-center mx-auto mb-3 transition-colors">
            <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
          </div>
          <p className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
            Tải Lên Hình Ảnh
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Khuyến nghị: 1200 × 630px · PNG/JPG
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Tab: SEO Cơ Bản ─────────────────────────────────────────────────────────

function SeoBasicTab({
  form,
  onChange,
}: {
  form: SeoBasicForm;
  onChange: (updates: Partial<SeoBasicForm>) => void;
}) {
  const descLength = form.metaDescription.length;
  const descWarning = descLength > 160;
  const titleLength = form.metaTitle.length;
  const titleWarning = titleLength > 60;

  return (
    <div className="space-y-5">
      {/* Meta Title */}
      <FormField label="Meta Title" required hint="Tiêu đề hiển thị trên Google">
        <input
          type="text"
          value={form.metaTitle}
          onChange={(e) => onChange({ metaTitle: e.target.value })}
          placeholder="Tên trang | Thương hiệu của bạn"
          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
            titleWarning
              ? 'border-amber-300 focus:ring-amber-200 bg-amber-50'
              : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
          }`}
        />
        <div className="flex items-center justify-between mt-1.5">
          {titleWarning ? (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Nên dưới 60 ký tự
            </p>
          ) : (
            <span />
          )}
          <span className={`text-xs font-mono ${titleWarning ? 'text-amber-600' : 'text-slate-400'}`}>
            {titleLength}/60
          </span>
        </div>
      </FormField>

      {/* Meta Description */}
      <FormField label="Meta Description" hint="Mô tả hiển thị dưới tiêu đề trên Google">
        <textarea
          value={form.metaDescription}
          onChange={(e) => onChange({ metaDescription: e.target.value })}
          rows={4}
          placeholder="Mô tả ngắn gọn về trang web, sản phẩm hoặc dịch vụ..."
          className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 resize-none transition-all ${
            descWarning
              ? 'border-amber-300 focus:ring-amber-200 bg-amber-50'
              : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
          }`}
        />
        <div className="flex items-center justify-between mt-1.5">
          {descWarning ? (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Nên dưới 160 ký tự để hiển thị đầy đủ
            </p>
          ) : (
            <span />
          )}
          <span className={`text-xs font-mono font-semibold ${descWarning ? 'text-amber-600' : descLength > 130 ? 'text-amber-500' : 'text-slate-400'}`}>
            {descLength}/160
          </span>
        </div>
      </FormField>

      {/* OG Image */}
      <ImageUploadPlaceholder
        label="OG Image (Open Graph)"
        value={form.ogImage}
        onChange={(v) => onChange({ ogImage: v })}
      />

      {/* Sitemap toggle */}
      <Toggle
        label="Tự Động Tạo Sitemap"
        description="Sitemap XML giúp Google index trang web nhanh hơn (khuyến nghị: bật)"
        value={form.sitemapEnabled}
        onChange={(v) => onChange({ sitemapEnabled: v })}
      />

      {/* Robots.txt */}
      <FormField label="robots.txt" hint="Điều khiển cách bot tìm kiếm thu thập dữ liệu">
        <textarea
          value={form.robotsTxt}
          onChange={(e) => onChange({ robotsTxt: e.target.value })}
          rows={6}
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-slate-950 text-emerald-400"
        />
      </FormField>

      {/* Google Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Xem Trước Google</span>
        </div>
        <div className="space-y-0.5">
          <div className="text-[13px] text-blue-700 font-medium truncate">
            {form.metaTitle || 'Tiêu đề trang web của bạn'}
          </div>
          <div className="text-[11px] text-emerald-700">
            https://mytenant.platformbds.vn
          </div>
          <div className="text-[12px] text-slate-600 line-clamp-2 leading-relaxed">
            {form.metaDescription || 'Mô tả trang web hiển thị ở đây...'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Google Analytics ────────────────────────────────────────────────────

function AnalyticsTab({
  form,
  onChange,
}: {
  form: AnalyticsForm;
  onChange: (updates: Partial<AnalyticsForm>) => void;
}) {
  const isValidGa4 = /^G-[A-Z0-9]+$/.test(form.ga4MeasurementId) || form.ga4MeasurementId === '';

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-blue-800">Kết Nối Google Analytics</p>
          <p className="text-xs text-blue-700 mt-0.5">
            Sau khi kết nối, dữ liệu lưu lượng truy cập sẽ được ghi nhận tự động trên tài khoản Google Analytics của bạn.
          </p>
        </div>
      </div>

      {/* GA4 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-orange-500" />
          <h3 className="text-sm font-bold text-slate-700">Google Analytics 4</h3>
        </div>
        <div className="p-5 space-y-4">
          <FormField label="Measurement ID (GA4)" hint="Định dạng G-XXXXXXXXXX">
            <div className="relative">
              <input
                type="text"
                value={form.ga4MeasurementId}
                onChange={(e) => onChange({ ga4MeasurementId: e.target.value.toUpperCase() })}
                placeholder="G-XXXXXXXXXX"
                className={`w-full px-4 py-3 rounded-xl border text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  !isValidGa4 && form.ga4MeasurementId
                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                    : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400 bg-white'
                }`}
              />
              {form.ga4MeasurementId && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValidGa4 ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {!isValidGa4 && form.ga4MeasurementId && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Định dạng không hợp lệ. Ví dụ: G-ABCD123456
              </p>
            )}
          </FormField>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            Tìm Measurement ID tại:{' '}
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              analytics.google.com
            </a>{' '}
            → Admin → Data Streams
          </div>
        </div>
      </div>

      {/* Search Console */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-700">Google Search Console</h3>
        </div>
        <div className="p-5 space-y-4">
          <FormField
            label="Mã Xác Minh (Meta Tag)"
            hint="Dán content của thẻ <meta name='google-site-verification'>"
          >
            <textarea
              value={form.searchConsoleCode}
              onChange={(e) => onChange({ searchConsoleCode: e.target.value })}
              rows={3}
              placeholder="Ví dụ: abc123xyz789..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-white"
            />
          </FormField>

          {form.searchConsoleCode && (
            <div className="rounded-xl bg-slate-950 p-3">
              <p className="text-[11px] text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Thẻ sẽ được thêm vào:</p>
              <code className="text-xs text-emerald-400 font-mono break-all">
                {`<meta name="google-site-verification" content="${form.searchConsoleCode}" />`}
              </code>
            </div>
          )}

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            Lấy mã tại:{' '}
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Search Console
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Social Media ────────────────────────────────────────────────────────

function SocialTab({
  form,
  onChange,
}: {
  form: SocialForm;
  onChange: (updates: Partial<SocialForm>) => void;
}) {
  const CARD_TYPES = [
    { value: 'summary', label: 'Summary — Ảnh nhỏ bên trái' },
    { value: 'summary_large_image', label: 'Summary Large Image — Ảnh lớn trên cùng' },
    { value: 'app', label: 'App — Cho ứng dụng mobile' },
    { value: 'player', label: 'Player — Cho video/audio' },
  ];

  return (
    <div className="space-y-5">
      {/* OG Card Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-700">Xem Trước Khi Chia Sẻ</h3>
        </div>
        <div className="p-5">
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm max-w-sm">
            {form.ogImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.ogImage} alt="OG" className="w-full aspect-[1200/630] object-cover" />
            ) : (
              <div className="w-full aspect-[1200/630] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-slate-500" />
              </div>
            )}
            <div className="px-3 py-2.5 bg-white border-t border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                mytenant.platformbds.vn
              </div>
              <div className="text-sm font-bold text-slate-900 leading-tight line-clamp-2">
                {form.ogTitle || 'Tiêu đề OG của bạn'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                {form.ogDescription || 'Mô tả khi chia sẻ lên mạng xã hội...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Graph fields */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-slate-700">Open Graph (Facebook, Zalo, LinkedIn)</h3>
        </div>
        <div className="p-5 space-y-4">
          <FormField label="OG Title">
            <input
              type="text"
              value={form.ogTitle}
              onChange={(e) => onChange({ ogTitle: e.target.value })}
              placeholder="Tiêu đề khi chia sẻ lên Facebook..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
            />
          </FormField>

          <FormField label="OG Description">
            <textarea
              value={form.ogDescription}
              onChange={(e) => onChange({ ogDescription: e.target.value })}
              rows={3}
              placeholder="Mô tả khi chia sẻ lên mạng xã hội..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-white"
            />
          </FormField>

          <ImageUploadPlaceholder
            label="OG Image"
            value={form.ogImage}
            onChange={(v) => onChange({ ogImage: v })}
          />
        </div>
      </div>

      {/* Twitter Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Twitter className="w-4 h-4 text-sky-500" />
          <h3 className="text-sm font-bold text-slate-700">Twitter Card</h3>
        </div>
        <div className="p-5">
          <FormField label="Loại Twitter Card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {CARD_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ twitterCardType: opt.value as SocialForm['twitterCardType'] })}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    form.twitterCardType === opt.value
                      ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors ${
                      form.twitterCardType === opt.value ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}
                  />
                  <span className={`text-xs font-semibold ${form.twitterCardType === opt.value ? 'text-blue-800' : 'text-slate-700'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SeoSettingsPage() {
  const [activeTab, setActiveTab] = useState<SeoTab>('basic');
  const [basicForm, setBasicForm] = useState<SeoBasicForm>(DEFAULT_BASIC);
  const [analyticsForm, setAnalyticsForm] = useState<AnalyticsForm>(DEFAULT_ANALYTICS);
  const [socialForm, setSocialForm] = useState<SocialForm>(DEFAULT_SOCIAL);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: PUT /api/cms/builder/seo
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS = [
    {
      key: 'basic' as const,
      label: 'SEO Cơ Bản',
      icon: <Search className="w-4 h-4" />,
    },
    {
      key: 'analytics' as const,
      label: 'Google Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      key: 'social' as const,
      label: 'Social Media',
      icon: <Share2 className="w-4 h-4" />,
    },
  ];

  return (
    <CMSLayout
      title="SEO & Analytics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'SEO & Analytics' },
      ]}
    >
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">SEO & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Tối ưu hóa website để xuất hiện trên kết quả tìm kiếm Google
          </p>
        </div>

        {/* Persistent Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shrink-0 ${
            saved
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25'
          } disabled:opacity-60`}
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
          ) : saved ? (
            <><Check className="w-4 h-4" /> Đã Lưu!</>
          ) : (
            <><Save className="w-4 h-4" /> Lưu Cài Đặt</>
          )}
        </button>
      </div>

      {/* ── Tab Navigation ─────────────────────────────────────────── */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-5 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ────────────────────────────────────────────── */}
      <div className="max-w-2xl">
        {activeTab === 'basic' && (
          <SeoBasicTab
            form={basicForm}
            onChange={(updates) => setBasicForm((p) => ({ ...p, ...updates }))}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab
            form={analyticsForm}
            onChange={(updates) => setAnalyticsForm((p) => ({ ...p, ...updates }))}
          />
        )}
        {activeTab === 'social' && (
          <SocialTab
            form={socialForm}
            onChange={(updates) => setSocialForm((p) => ({ ...p, ...updates }))}
          />
        )}
      </div>
    </CMSLayout>
  );
}
