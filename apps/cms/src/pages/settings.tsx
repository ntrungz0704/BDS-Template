/**
 * CMS Settings Page — General Company Settings & Branding
 *
 * Manages:
 *   - Company info (name, slogan, description, address)
 *   - Contact info (phone, email, zalo, facebook, youtube)
 *   - Working hours
 *   - Logo upload
 *   - Map embed URL
 *   - Danger zone (reset, delete tenant)
 */

import React, { useState, useCallback } from 'react';
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
} from 'lucide-react';

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
  zaloNumber: string;
  mapEmbedUrl: string;
  logo: string;
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
  name: 'Hoàng Gia Land',
  slogan: 'KHÔNG GIAN SỐNG TIỆN NGHI THƯỢNG LƯU',
  description: 'Nơi quy tụ những cơ hội đầu tư bất động sản cao cấp, biệt thự nghỉ dưỡng sang trọng và căn hộ thông minh hàng đầu tại Việt Nam.',
  phone: '0983 312 219',
  email: 'contact@hoanggialand.vn',
  address: 'Tòa nhà Diamond Plaza, 34 Lê Duẩn',
  ward: 'Phường Bến Nghé',
  district: 'Quận 1',
  city: 'TP Hồ Chí Minh',
  workingHours: '8h00 - 18h00',
  facebookUrl: 'https://facebook.com/hoanggialand',
  youtubeUrl: 'https://youtube.com/@hoanggialand',
  zaloNumber: '0983312219',
  mapEmbedUrl: '',
  logo: '',
};

const SETTINGS_TABS = [
  { key: 'company', label: 'Công Ty', icon: <Building2 className="w-4 h-4" /> },
  { key: 'contact', label: 'Liên Hệ', icon: <Phone className="w-4 h-4" /> },
  { key: 'account', label: 'Tài Khoản', icon: <User className="w-4 h-4" /> },
  { key: 'billing', label: 'Thanh Toán', icon: <CreditCard className="w-4 h-4" /> },
  { key: 'danger', label: 'Nguy Hiểm', icon: <Shield className="w-4 h-4" /> },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('company');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

  // Tải dữ liệu công ty từ API
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await import('axios').then(m => m.default.get(
          `${API_URL}/api/cms/builder/company-info`,
          { withCredentials: true }
        ));
        if (res.data?.data) {
          setSettings(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        // Giữ nguyên default nếu API lỗi
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = useCallback((name: keyof CompanySettings, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const axios = (await import('axios')).default;
      await axios.put(
        `${API_URL}/api/cms/builder/company-info`,
        settings,
        { withCredentials: true }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error: any) {
      const msg = error?.response?.data?.error?.message || 'Lỗi lưu cài đặt. Vui lòng thử lại.';
      alert(msg);
    } finally {
      setSaving(false);
    }
  }, [settings]);

  return (
    <CMSLayout
      title="Cài Đặt"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Cài Đặt Chung' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Cài Đặt Chung</h1>
          <p className="text-sm text-slate-500">Thông tin công ty, branding và cấu hình hệ thống</p>
        </div>
        {activeTab !== 'danger' && activeTab !== 'billing' && activeTab !== 'account' && (
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all ${
              saved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25'
            } disabled:opacity-60`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu Thay Đổi'}
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                } ${tab.key === 'danger' ? '!text-red-600 hover:!bg-red-50' : ''}`}
              >
                <span className={activeTab === tab.key ? 'text-blue-500' : 'text-slate-400'}>{tab.icon}</span>
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
                title="Thông Tin Công Ty"
                description="Tên, slogan và mô tả xuất hiện trên website"
                icon={<Building2 className="w-4 h-4" />}
              >
                <div className="sm:col-span-2">
                  <SettingsInput label="Tên Công Ty" name="name" value={settings.name} onChange={handleChange} required placeholder="VD: Hoàng Gia Land" />
                </div>
                <div className="sm:col-span-2">
                  <SettingsInput label="Slogan" name="slogan" value={settings.slogan} onChange={handleChange} placeholder="VD: Không Gian Sống Tiện Nghi Thượng Lưu" />
                </div>
                <div className="sm:col-span-2">
                  <SettingsTextarea
                    label="Mô Tả Công Ty"
                    name="description"
                    value={settings.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Mô tả ngắn gọn về công ty của bạn..."
                  />
                </div>
                <SettingsInput label="Giờ Làm Việc" name="workingHours" value={settings.workingHours} onChange={handleChange} placeholder="VD: 8h00 - 18h00" />
              </SettingsSection>

              <SettingsSection
                title="Logo & Hình Ảnh"
                description="Logo công ty hiển thị trên header và footer"
                icon={<Upload className="w-4 h-4" />}
              >
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 shrink-0">
                      {settings.logo ? (
                        <img src={settings.logo} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <Upload className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <div>
                      <button className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                        Chọn từ Media Library
                      </button>
                      <p className="text-xs text-slate-400 mt-1.5">PNG, SVG hoặc WebP. Khuyến nghị 512×512px</p>
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection
                title="Địa Chỉ"
                description="Địa chỉ văn phòng công ty"
                icon={<MapPin className="w-4 h-4" />}
              >
                <div className="sm:col-span-2">
                  <SettingsInput label="Địa Chỉ (Số nhà, Tên đường)" name="address" value={settings.address} onChange={handleChange} />
                </div>
                <SettingsInput label="Phường / Xã" name="ward" value={settings.ward} onChange={handleChange} />
                <SettingsInput label="Quận / Huyện" name="district" value={settings.district} onChange={handleChange} />
                <SettingsInput label="Tỉnh / Thành Phố" name="city" value={settings.city} onChange={handleChange} />
                <div className="sm:col-span-2">
                  <SettingsInput
                    label="Google Maps Embed URL"
                    name="mapEmbedUrl"
                    value={settings.mapEmbedUrl}
                    onChange={handleChange}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    hint="Lấy từ Google Maps → Share → Embed a map → Copy iframe src"
                  />
                </div>
              </SettingsSection>
            </>
          )}

          {/* ── Contact Tab ──────────────────────────────────────────── */}
          {activeTab === 'contact' && (
            <SettingsSection
              title="Thông Tin Liên Hệ"
              description="Số điện thoại, email và mạng xã hội"
              icon={<Phone className="w-4 h-4" />}
            >
              <SettingsInput label="Số Điện Thoại" name="phone" value={settings.phone} onChange={handleChange} type="tel" placeholder="VD: 0983 312 219" required />
              <SettingsInput label="Email" name="email" value={settings.email} onChange={handleChange} type="email" placeholder="VD: contact@company.vn" required />
              <SettingsInput label="Zalo" name="zaloNumber" value={settings.zaloNumber} onChange={handleChange} placeholder="VD: 0983312219" hint="Số điện thoại đăng ký Zalo" />
              <div className="sm:col-span-2 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mạng Xã Hội</p>
              </div>
              <SettingsInput label="Facebook URL" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} type="url" placeholder="https://facebook.com/..." />
              <SettingsInput label="YouTube URL" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} type="url" placeholder="https://youtube.com/@..." />
            </SettingsSection>
          )}

          {/* ── Account Tab ──────────────────────────────────────────── */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Thông Tin Tài Khoản</h3>
              <div className="space-y-3 max-w-md">
                <div>
                  <label className="cms-label">Email đăng nhập</label>
                  <input type="email" defaultValue="admin@hoanggialand.vn" className="cms-input" readOnly />
                </div>
                <div>
                  <label className="cms-label">Họ và tên</label>
                  <input type="text" defaultValue="Admin" className="cms-input" />
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <label className="cms-label">Đổi Mật Khẩu</label>
                  <input type="password" placeholder="Mật khẩu mới..." className="cms-input mb-2" />
                  <input type="password" placeholder="Xác nhận mật khẩu..." className="cms-input" />
                </div>
                <button className="cms-btn-primary">Cập Nhật Tài Khoản</button>
              </div>
            </div>
          )}

          {/* ── Billing Tab ──────────────────────────────────────────── */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Gói Hiện Tại: STARTER</h3>
                    <p className="text-xs text-slate-500">Hết hạn: 10/08/2026</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">ĐANG HOẠT ĐỘNG</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Dự án', used: '5', total: '10' },
                    { label: 'Media', used: '48MB', total: '500MB' },
                    { label: 'Trang', used: '4', total: '5' },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{item.used} / {item.total}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity">
                  Nâng Cấp Gói PRO Vận Hành — 499,000đ/năm
                </button>
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
                    <p className="text-sm font-semibold text-slate-800">Xóa toàn bộ dữ liệu nội dung</p>
                    <p className="text-xs text-slate-500 mt-0.5">Xóa tất cả dự án, bài viết và media. Giữ lại cài đặt công ty.</p>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">
                    Xóa Nội Dung
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-red-200 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Xóa toàn bộ tài khoản</p>
                    <p className="text-xs text-slate-500 mt-0.5">Xóa hoàn toàn tài khoản và tất cả dữ liệu. Không thể hoàn tác.</p>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                    Xóa Tài Khoản
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

