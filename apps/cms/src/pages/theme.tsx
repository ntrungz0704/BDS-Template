/**
 * CMS Theme Designer Page
 *
 * Visual design system editor for tenant websites:
 *   - Color palette picker (primary, secondary, accent, bg, text...)
 *   - Typography selector (heading & body fonts)
 *   - Layout settings (container width, border radius, shadows)
 *   - Live preview panel
 *   - Auto-save with version history
 */

import React, { useState, useCallback, useEffect } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Palette,
  Type,
  LayoutTemplate,
  Sliders,
  Save,
  RotateCcw,
  Eye,
  Check,
  ChevronDown,
  Loader2,
  Sparkles,
  Crown,
  Menu,
} from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
  fontSizeBase: string;
  lineHeight: string;
  containerWidth: string;
  borderRadius: string;
  shadowStyle: 'soft' | 'hard' | 'none';
  darkMode: boolean;
  buttonStyle: 'rounded' | 'square' | 'pill';
  animationsEnabled: boolean;
}

// ─── Default Values ───────────────────────────────────────────────────────────

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#2563EB',
  secondaryColor: '#64748B',
  accentColor: '#F59E0B',
  backgroundColor: '#FFFFFF',
  surfaceColor: '#F8FAFC',
  textColor: '#0F172A',
  textMutedColor: '#64748B',
  borderColor: '#E2E8F0',
  fontHeading: 'Plus Jakarta Sans',
  fontBody: 'Inter',
  fontSizeBase: '16px',
  lineHeight: '1.6',
  containerWidth: '1280px',
  borderRadius: '8px',
  shadowStyle: 'soft',
  darkMode: false,
  buttonStyle: 'rounded',
  animationsEnabled: true,
};

// ─── Preset Palettes ──────────────────────────────────────────────────────────

const PRESET_PALETTES = [
  {
    name: 'Corporate Blue',
    colors: { primaryColor: '#1E40AF', accentColor: '#3B82F6', secondaryColor: '#475569' },
  },
  {
    name: 'Luxury Gold',
    colors: { primaryColor: '#92400E', accentColor: '#D97706', secondaryColor: '#1C1917' },
  },
  {
    name: 'Emerald Nature',
    colors: { primaryColor: '#065F46', accentColor: '#10B981', secondaryColor: '#374151' },
  },
  {
    name: 'Rose Premium',
    colors: { primaryColor: '#9F1239', accentColor: '#F43F5E', secondaryColor: '#44403C' },
  },
  {
    name: 'Violet Modern',
    colors: { primaryColor: '#5B21B6', accentColor: '#8B5CF6', secondaryColor: '#374151' },
  },
  {
    name: 'Dark Slate',
    colors: { primaryColor: '#1E293B', accentColor: '#3B82F6', secondaryColor: '#475569' },
  },
];

const GOOGLE_FONTS = [
  'Plus Jakarta Sans',
  'Inter',
  'Manrope',
  'DM Sans',
  'Outfit',
  'Space Grotesk',
  'Sora',
  'Work Sans',
  'Montserrat',
  'Lato',
  'Raleway',
  'Nunito',
  'Poppins',
  'Playfair Display',
  'Cormorant Garamond',
  'Lora',
  'Merriweather',
  'Source Serif 4',
  'Libre Baskerville',
  'EB Garamond',
];

// ─── Color Swatch Component ───────────────────────────────────────────────────

function ColorField({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2 py-1 text-xs font-mono border border-slate-200 rounded-lg text-slate-700 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative w-8 h-8 rounded-lg border border-slate-200 shadow-sm overflow-hidden shrink-0 cursor-pointer">
          <input
            type="color"
            value={value?.startsWith('#') && value.length === 7 ? value : '#C5A572'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-12 h-12 cursor-pointer border-0 p-0"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Toggle Field ─────────────────────────────────────────────────────────────

function ToggleField({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${value ? 'bg-blue-600' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-4.5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}

// ─── Preview Panel ────────────────────────────────────────────────────────────

interface PreviewProject {
  name: string;
  address: string;
  price: string;
  thumbnail: string;
  type: string;
}

function ThemePreviewPanel({
  theme,
  companyName,
  firstProject,
  templateSlug = 'luxury-gold',
}: {
  theme: ThemeSettings;
  companyName: string;
  firstProject: PreviewProject | null;
  templateSlug?: string;
}) {
  if (templateSlug === 'luxury-gold') {
    return (
      <div
        className="overflow-hidden flex flex-col min-h-[500px]"
        style={{
          fontFamily: `'${theme.fontBody}', system-ui, sans-serif`,
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
        }}
      >
        {/* Luxury Gold Header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{
            backgroundColor: theme.backgroundColor,
            borderColor: `${theme.primaryColor}30`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <Crown className="w-5 h-5 shrink-0" style={{ color: theme.primaryColor }} />
            <span className="font-bold uppercase tracking-widest text-[10px] text-white" style={{ fontFamily: `'${theme.fontHeading}', serif` }}>
              {companyName}
            </span>
          </div>
          <Menu className="w-4 h-4 text-white" />
        </div>

        {/* Luxury Gold Hero */}
        <div
          className="relative px-4 py-12 text-center bg-cover bg-center overflow-hidden flex flex-col items-center justify-center border-b"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: `${theme.primaryColor}20`,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=400')`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px" style={{ backgroundColor: theme.primaryColor }} />
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: theme.primaryColor, fontFamily: `'${theme.fontBody}', sans-serif` }}>
              ROYAL RESIDENCE EXCLUSIVE
            </span>
            <span className="w-6 h-px" style={{ backgroundColor: theme.primaryColor }} />
          </div>

          <h1
            className="text-lg md:text-xl font-light text-white leading-tight mb-4"
            style={{ fontFamily: `'${theme.fontHeading}', serif` }}
          >
            Kiệt Tác <span className="italic" style={{ color: theme.primaryColor }}>Đỉnh Cao</span><br />
            Sống Thượng Lưu
          </h1>

          <p className="text-[10px] text-zinc-400 mb-6 max-w-xs leading-relaxed">
            Kiến tạo không gian sống đẳng cấp thượng lưu dành riêng cho chủ nhân tinh hoa.
          </p>

          <div className="flex gap-2.5">
            <button
              className="px-5 py-2.5 text-[9px] font-bold tracking-widest uppercase text-black transition-all"
              style={{
                backgroundColor: theme.primaryColor,
                borderRadius: theme.buttonStyle === 'pill' ? '999px' : theme.buttonStyle === 'square' ? '0px' : theme.borderRadius,
              }}
            >
              Xem Dự Án
            </button>
            <button
              className="px-5 py-2.5 text-[9px] font-medium tracking-widest uppercase border bg-transparent transition-all"
              style={{
                borderColor: theme.primaryColor,
                color: theme.primaryColor,
                borderRadius: theme.buttonStyle === 'pill' ? '999px' : theme.buttonStyle === 'square' ? '0px' : theme.borderRadius,
              }}
            >
              Tư Vấn VIP
            </button>
          </div>
        </div>

        {/* Luxury Gold Featured Project Card */}
        <div className="px-4 py-6">
          <div className="text-center mb-5">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-4 h-px" style={{ backgroundColor: theme.primaryColor }} />
              <span className="text-[8px] tracking-[0.2em] uppercase" style={{ color: theme.primaryColor }}>BỘ SƯU TẬP</span>
              <span className="w-4 h-px" style={{ backgroundColor: theme.primaryColor }} />
            </div>
            <h2 className="text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: `'${theme.fontHeading}', serif`, color: theme.textColor }}>
              Dự Án Nổi Bật
            </h2>
          </div>

          <div
            className="overflow-hidden bg-zinc-950/40 border transition-all"
            style={{
              borderColor: `${theme.primaryColor}30`,
              borderRadius: theme.borderRadius === '0px' ? '0px' : theme.borderRadius,
            }}
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <img
                src={firstProject?.thumbnail || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'}
                alt="Project Thumbnail"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute top-2.5 right-2.5 text-[7px] px-2 py-0.5 font-bold tracking-widest uppercase text-black"
                style={{ backgroundColor: theme.primaryColor }}
              >
                EXCLUSIVE
              </span>
            </div>
            <div className="p-4">
              <div className="text-[8px] uppercase tracking-widest mb-1" style={{ color: theme.primaryColor }}>
                {firstProject?.type || 'BIỆT THỰ'} · {firstProject?.address || 'HỆ THỐNG'}
              </div>
              <h3 className="text-sm font-semibold mb-2 text-white" style={{ fontFamily: `'${theme.fontHeading}', serif` }}>
                {firstProject?.name || 'Grand Villa Riverside'}
              </h3>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-900">
                <span className="text-xs font-bold" style={{ color: theme.primaryColor }}>
                  {firstProject?.price || 'Từ 45 tỷ'}
                </span>
                <span className="text-[9px] text-zinc-400">650m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-auto px-4 py-6 border-t text-center text-[8px] text-zinc-500"
          style={{
            backgroundColor: theme.surfaceColor,
            borderColor: `${theme.primaryColor}15`,
          }}
        >
          <span className="font-semibold uppercase tracking-widest text-zinc-400 block mb-1">
            {companyName}
          </span>
          © 2026 PlatformBDS. Tất cả quyền lợi được bảo lưu.
        </div>
      </div>
    );
  }

  // Fallback default style
  return (
    <div
      className="rounded-2xl overflow-hidden border border-slate-200 shadow-md text-sm"
      style={{
        fontFamily: `'${theme.fontBody}', system-ui, sans-serif`,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {/* Mock Header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <span className="font-bold text-white text-sm">{companyName}</span>
        <div className="flex gap-3 text-white/80 text-xs">
          <span>Dự Án</span>
          <span>Tin Tức</span>
          <span>Liên Hệ</span>
        </div>
      </div>

      {/* Mock Hero */}
      <div
        className="px-5 py-8 text-center"
        style={{ backgroundColor: theme.surfaceColor }}
      >
        <div
          className="inline-block text-xs px-3 py-1 rounded-full mb-3 font-bold"
          style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
        >
          ★ NỀN TẢNG BĐS #1 VIỆT NAM
        </div>
        <h1
          className="text-xl font-black mb-2 leading-tight"
          style={{ fontFamily: `'${theme.fontHeading}', serif`, color: theme.textColor }}
        >
          Website {companyName}
        </h1>
        <p className="text-xs mb-4" style={{ color: theme.textMutedColor }}>
          Giải pháp quản lý và kinh doanh bất động sản toàn diện
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-2 text-xs font-bold text-white shadow-md"
            style={{
              backgroundColor: theme.primaryColor,
              borderRadius: theme.buttonStyle === 'pill' ? '999px' : theme.buttonStyle === 'square' ? '4px' : theme.borderRadius,
            }}
          >
            Xem Dự Án
          </button>
          <button
            className="px-4 py-2 text-xs font-semibold border"
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
              borderRadius: theme.buttonStyle === 'pill' ? '999px' : theme.buttonStyle === 'square' ? '4px' : theme.borderRadius,
            }}
          >
            Liên Hệ
          </button>
        </div>
      </div>

      {/* Mock Card */}
      <div className="px-5 py-4">
        <div
          className="rounded-lg p-3 border"
          style={{ borderColor: theme.borderColor, borderRadius: theme.borderRadius }}
        >
          <div className="flex items-center gap-3">
            {firstProject ? (
              <>
                <img
                  src={firstProject.thumbnail}
                  alt={firstProject.name}
                  className="w-12 h-10 rounded object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: theme.textColor }}>
                    {firstProject.name}
                  </div>
                  <div className="text-[10px] truncate" style={{ color: theme.textMutedColor }}>
                    {firstProject.address} · {firstProject.price}
                  </div>
                </div>
                <div className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold shrink-0">
                  {firstProject.type}
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-10 rounded shrink-0 bg-slate-200 animate-pulse" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: theme.textColor }}>Vinhomes Grand Park</div>
                  <div className="text-[10px] truncate" style={{ color: theme.textMutedColor }}>Quận 9 · Từ 2.5 tỷ</div>
                </div>
                <div className="text-xs font-bold shrink-0 text-amber-500" style={{ color: theme.accentColor }}>HOT</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-700">{title}</h3>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ThemeDesignerPage() {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout'>('colors');
  const [companyName, setCompanyName] = useState('Hoàng Gia Land');
  const [firstProject, setFirstProject] = useState<PreviewProject | null>(null);
  const [templateSlug, setTemplateSlug] = useState('luxury-gold');

  useEffect(() => {
    const fetchThemeAndData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cms/builder/theme`, { withCredentials: true });
        if (res.data?.data) {
          setTheme({ ...DEFAULT_THEME, ...res.data.data });
        }
        if (res.data?.templateSlug) {
          setTemplateSlug(res.data.templateSlug);
        }
      } catch (error) {
        console.error('Lỗi tải cấu hình giao diện', error);
      }

      // Tải thông tin công ty thật
      try {
        const resComp = await axios.get(`${API_URL}/api/cms/builder/company-info`, { withCredentials: true });
        if (resComp.data?.data?.name) {
          setCompanyName(resComp.data.data.name);
        }
      } catch (error) {
        console.error('Lỗi tải thông tin công ty', error);
      }

      // Tải danh sách dự án thật để hiển thị trong Live Preview
      try {
        const resProjects = await axios.get(`${API_URL}/api/cms/projects`, { withCredentials: true });
        if (resProjects.data?.data && resProjects.data.data.length > 0) {
          const first = resProjects.data.data[0];
          const formatPrice = (amount: number) => {
            if (amount >= 1000) return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)} tỷ`;
            return `${amount} triệu`;
          };
          const typeMap: Record<string, string> = {
            APARTMENT: 'Căn hộ',
            VILLA: 'Biệt thự',
            TOWNHOUSE: 'Shophouse',
          };
          setFirstProject({
            name: first.title || first.name,
            address: first.address || 'Quận 9, TP. HCM',
            price: first.priceFrom && first.priceTo
              ? `Từ ${formatPrice(first.priceFrom)}`
              : 'Liên hệ',
            thumbnail: first.thumbnail || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
            type: typeMap[first.type] || 'Căn hộ',
          });
        }
      } catch (error) {
        console.error('Lỗi tải danh sách dự án', error);
      }
    };
    fetchThemeAndData();
  }, []);

  const updateField = useCallback(<K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const applyPreset = useCallback((preset: (typeof PRESET_PALETTES)[0]) => {
    setTheme((prev) => ({ ...prev, ...preset.colors }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      // API nhận trực tiếp các field theme (không bọc trong {config:})
      await axios.put(`${API_URL}/api/cms/builder/theme`, theme, { withCredentials: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: any) {
      console.error('Lỗi lưu giao diện:', error?.response?.data);
      let msg = error?.response?.data?.error?.message || 'Lỗi lưu giao diện. Vui lòng thử lại.';
      const fieldErrors = error?.response?.data?.error?.details?.fieldErrors;
      if (fieldErrors) {
        const detailsStr = Object.entries(fieldErrors)
          .map(([field, errors]: any) => `- ${field}: ${errors.join(', ')}`)
          .join('\n');
        msg += '\n\nChi tiết lỗi:\n' + detailsStr;
      }
      alert(msg);
    } finally {
      setSaving(false);
    }
  }, [theme]);

  const handleReset = useCallback(async () => {
    if (!confirm('Bạn có chắc chắn muốn khôi phục toàn bộ giao diện, thông tin công ty và dự án về bản gốc của Template đã mua? Hành động này sẽ ghi đè toàn bộ các chỉnh sửa hiện tại.')) return;
    setSaving(true);
    try {
      const res = await axios.post(`${API_URL}/api/cms/builder/theme/reset`, {}, { withCredentials: true });
      if (res.data.success) {
        alert('Khôi phục giao diện và dữ liệu mẫu bản gốc thành công! Trang quản trị sẽ tải lại.');
        window.location.reload();
      }
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message || 'Lỗi khôi phục giao diện. Vui lòng thử lại.';
      alert(msg);
    } finally {
      setSaving(false);
    }
  }, []);

  const TABS = [
    { key: 'colors' as const, label: 'Màu Sắc', icon: <Palette className="w-4 h-4" /> },
    { key: 'typography' as const, label: 'Phông Chữ', icon: <Type className="w-4 h-4" /> },
    { key: 'layout' as const, label: 'Bố Cục', icon: <LayoutTemplate className="w-4 h-4" /> },
  ];

  return (
    <CMSLayout
      title="Thiết Kế Giao Diện"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Thiết Kế & Giao Diện' },
      ]}
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Theme Designer</h1>
          <p className="text-sm text-slate-500">Tùy chỉnh giao diện website theo thương hiệu của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            Khôi phục bản gốc
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all ${
              saved
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25'
            } disabled:opacity-60`}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu Giao Diện'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Editor ────────────────────────────────────────── */}
        <div className="xl:col-span-2 space-y-5">
          {/* Preset Palettes */}
          <SectionCard title="✨ Bộ Màu Nhanh">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
              {PRESET_PALETTES.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="flex gap-1">
                    {Object.values(preset.colors).map((color, i) => (
                      <div key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700 truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Tab Navigation */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
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

          {/* Tab: Colors */}
          {activeTab === 'colors' && (
            <SectionCard title="Bảng Màu Thương Hiệu">
              <ColorField label="Màu Chính (Primary)" description="Dùng cho nút CTA, heading, accent chính" value={theme.primaryColor} onChange={(v) => updateField('primaryColor', v)} />
              <ColorField label="Màu Phụ (Secondary)" description="Dùng cho elements bổ trợ, badge" value={theme.secondaryColor} onChange={(v) => updateField('secondaryColor', v)} />
              <ColorField label="Màu Nhấn (Accent)" description="Highlight, tags, pricing badges" value={theme.accentColor} onChange={(v) => updateField('accentColor', v)} />
              <ColorField label="Nền Trang (Background)" value={theme.backgroundColor} onChange={(v) => updateField('backgroundColor', v)} />
              <ColorField label="Nền Bề Mặt (Surface)" description="Card backgrounds, section alternating" value={theme.surfaceColor} onChange={(v) => updateField('surfaceColor', v)} />
              <ColorField label="Văn Bản Chính" value={theme.textColor} onChange={(v) => updateField('textColor', v)} />
              <ColorField label="Văn Bản Phụ (Muted)" description="Mô tả, subtitle, placeholder" value={theme.textMutedColor} onChange={(v) => updateField('textMutedColor', v)} />
              <ColorField label="Đường Viền (Border)" value={theme.borderColor} onChange={(v) => updateField('borderColor', v)} />
            </SectionCard>
          )}

          {/* Tab: Typography */}
          {activeTab === 'typography' && (
            <SectionCard title="Phông Chữ & Cỡ Chữ">
              <SelectField
                label="Font Tiêu Đề (Heading)"
                value={theme.fontHeading}
                options={GOOGLE_FONTS.map((f) => ({ value: f, label: f }))}
                onChange={(v) => updateField('fontHeading', v)}
              />
              <SelectField
                label="Font Nội Dung (Body)"
                value={theme.fontBody}
                options={GOOGLE_FONTS.map((f) => ({ value: f, label: f }))}
                onChange={(v) => updateField('fontBody', v)}
              />
              <SelectField
                label="Cỡ Chữ Cơ Bản"
                value={theme.fontSizeBase}
                options={['14px', '15px', '16px', '17px', '18px'].map((v) => ({ value: v, label: v }))}
                onChange={(v) => updateField('fontSizeBase', v)}
              />
              <SelectField
                label="Line Height"
                value={theme.lineHeight}
                options={['1.4', '1.5', '1.6', '1.7', '1.8'].map((v) => ({ value: v, label: v }))}
                onChange={(v) => updateField('lineHeight', v)}
              />
            </SectionCard>
          )}

          {/* Tab: Layout */}
          {activeTab === 'layout' && (
            <SectionCard title="Cài Đặt Bố Cục">
              <SelectField
                label="Độ Rộng Container"
                value={theme.containerWidth}
                options={['1024px', '1200px', '1280px', '1400px', '1440px', 'full'].map((v) => ({ value: v, label: v }))}
                onChange={(v) => updateField('containerWidth', v)}
              />
              <SelectField
                label="Bo Tròn Góc (Border Radius)"
                value={theme.borderRadius}
                options={['0px', '4px', '6px', '8px', '12px', '16px', '24px'].map((v) => ({ value: v, label: v }))}
                onChange={(v) => updateField('borderRadius', v)}
              />
              <SelectField
                label="Kiểu Đổ Bóng (Shadow)"
                value={theme.shadowStyle}
                options={[
                  { value: 'soft', label: 'Mềm (Soft)' },
                  { value: 'hard', label: 'Cứng (Hard)' },
                  { value: 'none', label: 'Không có' },
                ]}
                onChange={(v) => updateField('shadowStyle', v as ThemeSettings['shadowStyle'])}
              />
              <SelectField
                label="Kiểu Nút (Button Style)"
                value={theme.buttonStyle}
                options={[
                  { value: 'rounded', label: 'Bo Tròn' },
                  { value: 'square', label: 'Vuông' },
                  { value: 'pill', label: 'Viên Thuốc (Pill)' },
                ]}
                onChange={(v) => updateField('buttonStyle', v as ThemeSettings['buttonStyle'])}
              />
              <ToggleField
                label="Dark Mode"
                description="Bật giao diện tối cho website"
                value={theme.darkMode}
                onChange={(v) => updateField('darkMode', v)}
              />
              <ToggleField
                label="Hiệu Ứng Chuyển Động"
                description="Scroll animations, hover effects"
                value={theme.animationsEnabled}
                onChange={(v) => updateField('animationsEnabled', v)}
              />
            </SectionCard>
          )}
        </div>

        {/* ── Right: Live Preview ──────────────────────────────────── */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Xem Trước (Live Preview)</h3>
            </div>
            {/* Device Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg">
               <button className="p-1.5 bg-white text-slate-700 shadow-sm rounded-md"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></button>
               <button className="p-1.5 text-slate-500 hover:text-slate-700 rounded-md"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg></button>
               <button className="p-1.5 text-slate-500 hover:text-slate-700 rounded-md"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg></button>
            </div>
          </div>
          <div className="sticky top-[80px] bg-slate-100 p-4 rounded-3xl border-[8px] border-slate-800 shadow-xl overflow-hidden min-h-[600px] flex flex-col relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-xl z-10"></div>
            {/* Embedded Iframe Mock */}
            <div className="flex-1 bg-white overflow-hidden rounded-xl">
               <ThemePreviewPanel theme={theme} companyName={companyName} firstProject={firstProject} templateSlug={templateSlug} />
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}

