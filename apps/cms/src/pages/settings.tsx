/**
 * CMS Settings Page — General Company Settings & Branding & Universal Config
 *
 * Manages:
 *   - Company info (name, slogan, description, address)
 *   - Navigation Menu items (Universal Template Config)
 *   - Hero Slider / Carousel Nhà Hot (Universal Template Config)
 *   - Logo (image URL, logo text, logo slogan)
 *   - Contact info (phone, email, zalo, facebook, youtube, tiktok)
 *   - Danger zone & Account
 */

import React, { useState, useCallback, useEffect } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  MessageCircle,
  Save,
  Check,
  Loader2,
  Upload,
  AlertTriangle,
  Globe,
  Map,
  Info,
  User,
  Shield,
  CreditCard,
  ChevronRight,
  Compass,
  Sliders,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { TenantConfigSchema, TenantMenuItem, TenantHeroSlide } from '@repo/types';
import { getDefaultTenantConfig } from '@repo/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompanySettings {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  workingHours: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  zaloNumber: string;
  mapEmbedUrl: string;
  logo: string;
  logoText?: string;
}

// ─── Input Field Component ────────────────────────────────────────────────────

function SettingsInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  required,
}: {
  label: string;
  name: keyof CompanySettings;
  value: string;
  onChange: (name: keyof CompanySettings, value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function SettingsTextarea({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
  hint,
}: {
  label: string;
  name: keyof CompanySettings;
  value: string;
  onChange: (name: keyof CompanySettings, value: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
      />
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SettingsSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: CompanySettings = {
  name: 'Trung Nghĩa Nhà Phố',
  slogan: 'CHUYÊN TÒA NHÀ & CĂN HỘ DỊCH VỤ QUẬN 7',
  description: 'Chuyên phân phối, ký gửi và tư vấn pháp lý các bất động sản dòng tiền cao, tòa nhà văn phòng mặt tiền và căn hộ dịch vụ cao cấp tại Quận 7 và khu Nam Sài Gòn.',
  phone: '0394678913',
  email: 'thienanminhcorp@gmail.com',
  address: 'Tòa Nhà Paragon, 3 Nguyễn Lương Bằng',
  ward: 'Phường Tân Phú',
  district: 'Quận 7',
  city: 'TP Hồ Chí Minh',
  workingHours: '8h00 - 21h00 (Cả Thứ 7 & CN)',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  tiktokUrl: '',
  zaloNumber: '0394678913',
  mapEmbedUrl: '',
  logo: '',
  logoText: 'S.HOUSE',
};

const SETTINGS_TABS = [
  { key: 'company', label: 'Công Ty & Logo', icon: <Building2 className="w-4 h-4" /> },
  { key: 'navigation', label: 'Menu Điều Hướng', icon: <Compass className="w-4 h-4" /> },
  { key: 'slider', label: 'Slider Nhà Hot', icon: <Sliders className="w-4 h-4" /> },
  { key: 'contact', label: 'Liên Hệ', icon: <Phone className="w-4 h-4" /> },
  { key: 'account', label: 'Tài Khoản', icon: <User className="w-4 h-4" /> },
  { key: 'billing', label: 'Thanh Toán', icon: <CreditCard className="w-4 h-4" /> },
  { key: 'danger', label: 'Nguy Hiểm', icon: <Shield className="w-4 h-4" /> },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [tenantConfig, setTenantConfig] = useState<TenantConfigSchema>(() => getDefaultTenantConfig('bds-16'));
  const [activeTab, setActiveTab] = useState('company');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

  // Tải dữ liệu công ty và cấu hình tenant từ API
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const axios = (await import('axios')).default;
        const [compRes, configRes] = await Promise.all([
          axios.get(`${API_URL}/api/cms/builder/company-info`, { withCredentials: true }).catch(() => null),
          axios.get(`${API_URL}/api/cms/builder/tenant-config`, { withCredentials: true }).catch(() => null),
        ]);
        if (compRes?.data?.data) {
          setSettings(prev => ({ ...prev, ...compRes.data.data }));
        }
        if (configRes?.data?.data) {
          setTenantConfig(configRes.data.data);
        }
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [API_URL]);

  const handleChange = useCallback((name: keyof CompanySettings, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const axios = (await import('axios')).default;
      const fullAddress = [settings.address, settings.ward, settings.district, settings.city].filter(Boolean).join(', ');

      const mergedConfig: TenantConfigSchema = {
        ...tenantConfig,
        logo: {
          ...tenantConfig.logo,
          url: settings.logo || tenantConfig.logo?.url || '',
          text: settings.logoText || tenantConfig.logo?.text || 'TL BDS16',
          slogan: settings.slogan || tenantConfig.logo?.slogan || 'TRAO BẠN CUỘC SỐNG MƠ ƯỚC',
        },
        contact: {
          ...tenantConfig.contact,
          companyName: settings.name || tenantConfig.contact.companyName,
          brandTitle: settings.slogan || tenantConfig.contact.brandTitle,
          slogan: settings.slogan || tenantConfig.contact.slogan,
          phone: settings.phone || tenantConfig.contact.phone,
          hotline: settings.phone || tenantConfig.contact.hotline,
          zalo: settings.zaloNumber || tenantConfig.contact.zalo,
          email: settings.email || tenantConfig.contact.email,
          address: fullAddress || settings.address || tenantConfig.contact.address,
          workingHours: settings.workingHours || tenantConfig.contact.workingHours,
          facebook: settings.facebookUrl || tenantConfig.contact.facebook,
          youtube: settings.youtubeUrl || tenantConfig.contact.youtube,
          tiktok: settings.tiktokUrl || tenantConfig.contact.tiktok,
          googleMapsEmbed: settings.mapEmbedUrl || tenantConfig.contact.googleMapsEmbed,
        },
      };

      await Promise.all([
        axios.put(`${API_URL}/api/cms/builder/company-info`, settings, { withCredentials: true }),
        axios.put(`${API_URL}/api/cms/builder/tenant-config`, mergedConfig, { withCredentials: true }),
      ]);

      setTenantConfig(mergedConfig);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message || 'Lỗi lưu cài đặt. Vui lòng thử lại.';
      alert(msg);
    } finally {
      setSaving(false);
    }
  }, [settings, tenantConfig, API_URL]);

  // ── Navigation Menu Handlers ───────────────────────────────────────────────
  const updateMenuItem = (idx: number, field: keyof TenantMenuItem, val: any) => {
    setTenantConfig(prev => {
      const items = [...prev.navigation.menuItems];
      items[idx] = { ...items[idx], [field]: val };
      return { ...prev, navigation: { ...prev.navigation, menuItems: items } };
    });
    setSaved(false);
  };

  const moveMenuItem = (idx: number, direction: 'up' | 'down') => {
    setTenantConfig(prev => {
      const items = [...prev.navigation.menuItems];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= items.length) return prev;
      const temp = items[idx];
      items[idx] = items[targetIdx];
      items[targetIdx] = temp;
      items.forEach((item, i) => { item.order = i + 1; });
      return { ...prev, navigation: { ...prev.navigation, menuItems: items } };
    });
    setSaved(false);
  };

  const deleteMenuItem = (idx: number) => {
    setTenantConfig(prev => {
      const items = prev.navigation.menuItems.filter((_, i) => i !== idx);
      items.forEach((item, i) => { item.order = i + 1; });
      return { ...prev, navigation: { ...prev.navigation, menuItems: items } };
    });
    setSaved(false);
  };

  const addMenuItem = () => {
    setTenantConfig(prev => {
      const items = [...prev.navigation.menuItems];
      const newId = `m-${Date.now()}`;
      items.push({
        id: newId,
        label: 'Mục Menu Mới',
        url: '/',
        target: '_self',
        order: items.length + 1,
        visible: true,
      });
      return { ...prev, navigation: { ...prev.navigation, menuItems: items } };
    });
    setSaved(false);
  };

  const resetDefaultMenu = () => {
    const def = getDefaultTenantConfig('bds-16');
    setTenantConfig(prev => ({
      ...prev,
      navigation: { menuItems: def.navigation.menuItems }
    }));
    setSaved(false);
  };

  // ── Hero Slider Handlers ───────────────────────────────────────────────────
  const updateSlide = (idx: number, field: keyof TenantHeroSlide, val: any) => {
    setTenantConfig(prev => {
      const slides = [...prev.heroSlider.slides];
      slides[idx] = { ...slides[idx], [field]: val };
      return { ...prev, heroSlider: { ...prev.heroSlider, slides } };
    });
    setSaved(false);
  };

  const moveSlide = (idx: number, direction: 'up' | 'down') => {
    setTenantConfig(prev => {
      const slides = [...prev.heroSlider.slides];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= slides.length) return prev;
      const temp = slides[idx];
      slides[idx] = slides[targetIdx];
      slides[targetIdx] = temp;
      slides.forEach((slide, i) => { slide.order = i + 1; });
      return { ...prev, heroSlider: { ...prev.heroSlider, slides } };
    });
    setSaved(false);
  };

  const deleteSlide = (idx: number) => {
    setTenantConfig(prev => {
      const slides = prev.heroSlider.slides.filter((_, i) => i !== idx);
      slides.forEach((slide, i) => { slide.order = i + 1; });
      return { ...prev, heroSlider: { ...prev.heroSlider, slides } };
    });
    setSaved(false);
  };

  const addSlide = () => {
    setTenantConfig(prev => {
      const slides = [...prev.heroSlider.slides];
      const newId = `slide-${Date.now()}`;
      slides.push({
        id: newId,
        title: 'Siêu Phẩm Nhà Đất Mới Nhất',
        subtitle: 'Vị trí đắc địa, pháp lý minh bạch 100%, sinh lời vượt trội',
        badge: 'VIP HOT',
        price: '35 Tỷ VNĐ',
        location: 'Quận 7, TP. Hồ Chí Minh',
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85',
        actionUrl: '/building',
        actionText: 'Xem Chi Tiết',
        order: slides.length + 1,
      });
      return { ...prev, heroSlider: { ...prev.heroSlider, slides } };
    });
    setSaved(false);
  };

  return (
    <CMSLayout
      title="Cài Đặt"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Cài Đặt Chung' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Cài Đặt Chung & Cấu Hình Giao Diện</h1>
          <p className="text-sm text-slate-500">Quản lý menu điều hướng, logo, slider nhà hot và thương hiệu</p>
        </div>
        {activeTab !== 'danger' && activeTab !== 'billing' && activeTab !== 'account' && (
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer ${
              saved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25'
            } disabled:opacity-60`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Đang lưu...' : saved ? 'Đã lưu thành công!' : 'Lưu Thay Đổi'}
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-56 shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-l-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                } ${tab.key === 'danger' ? '!text-red-600 hover:!bg-red-50' : ''}`}
              >
                <span className={activeTab === tab.key ? 'text-blue-600' : 'text-slate-400'}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {/* ── Company Tab ─────────────────────────────────────────── */}
          {activeTab === 'company' && (
            <>
              <SettingsSection
                title="Thông Tin Công Ty & Thương Hiệu"
                description="Tên thương hiệu, slogan và lời giới thiệu hiển thị trên toàn trang"
                icon={<Building2 className="w-4 h-4" />}
              >
                <div className="sm:col-span-2">
                  <SettingsInput label="Tên Thương Hiệu / Công Ty" name="name" value={settings.name} onChange={handleChange} required placeholder="VD: Trung Nghĩa Nhà Phố" />
                </div>
                <div className="sm:col-span-2">
                  <SettingsInput label="Slogan Doanh Nghiệp" name="slogan" value={settings.slogan} onChange={handleChange} placeholder="VD: Chuyên Tòa Nhà & CHDV Quận 7, TP.HCM" />
                </div>
                <div className="sm:col-span-2">
                  <SettingsTextarea
                    label="Mô Tả Doanh Nghiệp"
                    name="description"
                    value={settings.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Mô tả tóm tắt về năng lực phân phối, phân khúc hoạt động..."
                  />
                </div>
                <SettingsInput label="Giờ Làm Việc" name="workingHours" value={settings.workingHours} onChange={handleChange} placeholder="VD: 8h00 - 21h00 (Cả Thứ 7 & CN)" />
              </SettingsSection>

              <SettingsSection
                title="Logo & Huy Hiệu Nhận Diện"
                description="Hỗ trợ cả Logo Ảnh chuyên nghiệp hoặc Huy Hiệu Chữ sắc nét"
                icon={<Upload className="w-4 h-4" />}
              >
                <div className="sm:col-span-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 shrink-0 overflow-hidden">
                      {settings.logo ? (
                        <img src={settings.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                      ) : (
                        <div className="text-center p-2">
                          <span className="text-xs font-black text-slate-800 block">{settings.logoText || 'S.HOUSE'}</span>
                          <span className="text-[7px] text-slate-500 font-bold block mt-0.5">HUY HIỆU CHỮ</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Đường dẫn ảnh Logo (Image URL)
                        </label>
                        <input
                          type="text"
                          value={settings.logo}
                          onChange={(e) => handleChange('logo', e.target.value)}
                          placeholder="https://domain.com/logo.png"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Dán link ảnh logo trực tiếp (PNG, SVG hoặc WebP nền trong suốt). Nếu có ảnh logo, hệ thống sẽ tự động hiển thị logo ảnh trên header.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Logo Text (Dùng khi chưa có file ảnh)
                      </label>
                      <input
                        type="text"
                        value={settings.logoText || ''}
                        onChange={(e) => handleChange('logoText', e.target.value)}
                        placeholder="VD: S.HOUSE hoặc TL BDS16"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Dòng chữ phụ dưới Logo
                      </label>
                      <input
                        type="text"
                        value={tenantConfig.logo?.slogan || 'TRAO BẠN CUỘC SỐNG MƠ ƯỚC'}
                        onChange={(e) => {
                          setTenantConfig(prev => ({
                            ...prev,
                            logo: { ...prev.logo, slogan: e.target.value }
                          }));
                          setSaved(false);
                        }}
                        placeholder="VD: TRAO BẠN CUỘC SỐNG MƠ ƯỚC"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection
                title="Địa Chỉ & Bản Đồ Văn Phòng"
                description="Vị trí trụ sở xuất hiện trên bản đồ và chân trang"
                icon={<MapPin className="w-4 h-4" />}
              >
                <div className="sm:col-span-2">
                  <SettingsInput label="Địa Chỉ (Số nhà, Tên đường)" name="address" value={settings.address} onChange={handleChange} placeholder="VD: Tòa Nhà Paragon, 3 Nguyễn Lương Bằng" />
                </div>
                <SettingsInput label="Phường / Xã" name="ward" value={settings.ward} onChange={handleChange} placeholder="VD: Phường Tân Phú" />
                <SettingsInput label="Quận / Huyện" name="district" value={settings.district} onChange={handleChange} placeholder="VD: Quận 7" />
                <SettingsInput label="Tỉnh / Thành Phố" name="city" value={settings.city} onChange={handleChange} placeholder="VD: TP Hồ Chí Minh" />
                <div className="sm:col-span-2">
                  <SettingsInput
                    label="Google Maps Embed URL (Tùy chọn)"
                    name="mapEmbedUrl"
                    value={settings.mapEmbedUrl}
                    onChange={handleChange}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    hint="Để trống nếu muốn hệ thống tự động định vị theo địa chỉ trụ sở ở trên."
                  />
                </div>
              </SettingsSection>
            </>
          )}

          {/* ── Navigation Tab (Universal Template Config) ─────────────── */}
          {activeTab === 'navigation' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-600" />
                    Quản Lý Danh Sách Menu & Điều Hướng
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tự do thêm, sửa tên nút, đổi URL, ẩn/hiện hoặc kéo đổi vị trí các nút menu trên thanh Header
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetDefaultMenu}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Menu Mẫu Chuẩn
                  </button>
                  <button
                    onClick={addMenuItem}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm Nút Menu
                  </button>
                </div>
              </div>

              {/* Menu items list */}
              <div className="space-y-3">
                {tenantConfig.navigation.menuItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row items-stretch md:items-center gap-3 ${
                      item.visible !== false ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    {/* Index badge & Order controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <button
                        onClick={() => moveMenuItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveMenuItem(idx, 'down')}
                        disabled={idx === tenantConfig.navigation.menuItems.length - 1}
                        className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Label Input */}
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Tên Nút Bấm</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updateMenuItem(idx, 'label', e.target.value)}
                        placeholder="VD: Building, CHDV, Trang Chủ..."
                        className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* URL Input */}
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Đường Dẫn (URL)</label>
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => updateMenuItem(idx, 'url', e.target.value)}
                        placeholder="VD: /building, /chdv, /ban-do, /"
                        className="w-full px-3 py-1.5 text-xs font-mono border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Toggle Visible */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                      <button
                        onClick={() => updateMenuItem(idx, 'visible', item.visible === false ? true : false)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                          item.visible !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {item.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {item.visible !== false ? 'Hiển thị' : 'Đang ẩn'}
                      </button>

                      <button
                        onClick={() => deleteMenuItem(idx)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Xóa nút này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Mẹo cấu hình:</strong> Khi đặt URL là <code>/building</code> hoặc <code>/chdv</code>, website sẽ tự động lọc ngay danh sách bất động sản theo loại hình tương ứng. Khi đặt là <code>/ban-do</code>, hệ thống sẽ tự động cuộn mượt xuống bản đồ vị trí!
                </p>
              </div>
            </div>
          )}

          {/* ── Slider Tab (Universal Template Config) ────────────────── */}
          {activeTab === 'slider' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-600" />
                    Slider &quot;Nhà Hot&quot; Hero Carousel
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Cấu hình carousel banner trượt ở đầu trang chủ để làm nổi bật các dự án VIP, tòa nhà độc quyền
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addSlide}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm Slide Mới
                  </button>
                </div>
              </div>

              {/* Slider Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Kích hoạt Carousel Nhà Hot</span>
                    <span className="text-[11px] text-slate-400">Bật hoặc tắt banner trượt trên trang chủ</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={tenantConfig.heroSlider.enabled}
                    onChange={(e) => {
                      setTenantConfig(prev => ({
                        ...prev,
                        heroSlider: { ...prev.heroSlider, enabled: e.target.checked }
                      }));
                      setSaved(false);
                    }}
                    className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Thời gian tự động chuyển (Giây)</span>
                    <span className="text-[11px] text-slate-400">Khoảng thời gian tự động trượt slide tiếp theo</span>
                  </div>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={tenantConfig.heroSlider.intervalSec || 5}
                    onChange={(e) => {
                      setTenantConfig(prev => ({
                        ...prev,
                        heroSlider: { ...prev.heroSlider, intervalSec: Number(e.target.value) || 5 }
                      }));
                      setSaved(false);
                    }}
                    className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-center font-bold"
                  />
                </div>
              </div>

              {/* Slides List */}
              <div className="space-y-4">
                {tenantConfig.heroSlider.slides.map((slide, idx) => (
                  <div key={slide.id || idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate max-w-xs">{slide.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSlide(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveSlide(idx, 'down')}
                          disabled={idx === tenantConfig.heroSlider.slides.length - 1}
                          className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSlide(idx)}
                          className="p-1 text-red-400 hover:text-red-600 cursor-pointer ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      {/* Thumbnail Preview */}
                      <div className="sm:col-span-3 aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative">
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Tiêu Đề Slide</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => updateSlide(idx, 'title', e.target.value)}
                            placeholder="VD: Tòa Nhà Văn Phòng Mặt Tiền Nguyễn Lương Bằng, Quận 7"
                            className="w-full px-2.5 py-1.5 text-xs font-bold border border-slate-200 rounded-lg text-slate-900"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Phụ Đề / Đặc Điểm</label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => updateSlide(idx, 'subtitle', e.target.value)}
                            placeholder="VD: Diện tích 8x22m (176m²), 1 hầm 7 lầu, dòng tiền 180 triệu/tháng"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Huy Hiệu (Badge)</label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => updateSlide(idx, 'badge', e.target.value)}
                            placeholder="VD: ĐỘC QUYỀN VIP, DÒNG TIỀN CAO"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Mức Giá</label>
                          <input
                            type="text"
                            value={slide.price || ''}
                            onChange={(e) => updateSlide(idx, 'price', e.target.value)}
                            placeholder="VD: 45 Tỷ VNĐ hoặc 28.5 Tỷ"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Vị Trí / Khu Vực</label>
                          <input
                            type="text"
                            value={slide.location || ''}
                            onChange={(e) => updateSlide(idx, 'location', e.target.value)}
                            placeholder="VD: Nguyễn Lương Bằng, Quận 7, TP.HCM"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Link Nút Bấm (URL)</label>
                          <input
                            type="text"
                            value={slide.actionUrl || ''}
                            onChange={(e) => updateSlide(idx, 'actionUrl', e.target.value)}
                            placeholder="VD: /building hoặc /chdv"
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">URL Hình Ảnh</label>
                          <input
                            type="text"
                            value={slide.imageUrl}
                            onChange={(e) => updateSlide(idx, 'imageUrl', e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Contact Tab ──────────────────────────────────────────── */}
          {activeTab === 'contact' && (
            <SettingsSection
              title="Thông Tin Liên Hệ Trực Tiếp"
              description="Số hotline, số Zalo chốt khách và các kênh mạng xã hội"
              icon={<Phone className="w-4 h-4" />}
            >
              <SettingsInput label="Số Điện Thoại / Hotline" name="phone" value={settings.phone} onChange={handleChange} type="tel" placeholder="VD: 0394678913" required />
              <SettingsInput label="Email Doanh Nghiệp" name="email" value={settings.email} onChange={handleChange} type="email" placeholder="VD: thienanminhcorp@gmail.com" required />
              <SettingsInput label="Số Zalo Tư Vấn" name="zaloNumber" value={settings.zaloNumber} onChange={handleChange} placeholder="VD: 0394678913" hint="Khách bấm nút Zalo trên web sẽ nhắn trực tiếp đến số này" />
              <div className="sm:col-span-2 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mạng Xã Hội</p>
              </div>
              <SettingsInput label="Facebook URL" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} type="url" placeholder="https://facebook.com/..." />
              <SettingsInput label="YouTube URL" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} type="url" placeholder="https://youtube.com/@..." />
              <SettingsInput label="TikTok URL" name="tiktokUrl" value={settings.tiktokUrl} onChange={handleChange} type="url" placeholder="https://tiktok.com/@..." />
            </SettingsSection>
          )}

          {/* ── Account Tab ──────────────────────────────────────────── */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Thông Tin Tài Khoản</h3>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="cms-label">Email đăng nhập</label>
                  <input type="email" defaultValue={settings.email || "thienanminhcorp@gmail.com"} className="cms-input" readOnly />
                </div>
                <div>
                  <label className="cms-label">Họ và tên</label>
                  <input type="text" defaultValue={settings.name || "Trung Nghĩa"} className="cms-input" />
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <label className="cms-label">Đổi Mật Khẩu</label>
                  <input type="password" placeholder="Mật khẩu mới..." className="cms-input mb-2" />
                  <input type="password" placeholder="Xác nhận mật khẩu..." className="cms-input" />
                </div>
                <button className="cms-btn-primary cursor-pointer">Cập Nhật Tài Khoản</button>
              </div>
            </div>
          )}

          {/* ── Billing Tab ──────────────────────────────────────────── */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Gói Hiện Tại: PRO PLATFORM</h3>
                    <p className="text-xs text-slate-500">Hạn sử dụng: Vĩnh viễn (Kèm Cloud Sync Realtime)</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ĐANG HOẠT ĐỘNG</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Dự án / Nhà Đất', used: 'Không giới hạn', total: 'VIP' },
                    { label: 'Menu & Slider', used: 'Tùy chỉnh 100%', total: 'Universal' },
                    { label: 'Cloud CMS API', used: 'Đang kết nối', total: 'Live' },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{item.used}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Danger Zone ──────────────────────────────────────────── */}
          {activeTab === 'danger' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-red-800">Vùng Nguy Hiểm</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-xl border border-red-200 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Khôi phục cấu hình mặc định ban đầu</p>
                    <p className="text-xs text-slate-500 mt-0.5">Đặt lại menu, slider và thông tin về mẫu gốc ban đầu.</p>
                  </div>
                  <button
                    onClick={resetDefaultMenu}
                    className="shrink-0 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    Khôi Phục Gốc
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
