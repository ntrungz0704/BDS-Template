/**
 * CMS Domain & Hosting Settings Page
 *
 * Configure domain and hosting for the tenant website:
 *   - Section 1: Subdomain info (readonly, copy button)
 *   - Section 2: Custom domain with DNS status badge & instructions
 *   - Section 3: SSL certificate status card
 *   - Section 4: Plan features overview
 */

import React, { useState } from 'react';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Globe,
  Copy,
  Check,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Save,
  Loader2,
  Zap,
  Lock,
  Star,
  Info,
  RefreshCw,
  ExternalLink,
  Server,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DnsStatus = 'PENDING' | 'ACTIVE' | 'ERROR';

interface DomainState {
  customDomain: string;
  dnsStatus: DnsStatus;
  sslStatus: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  sslIssueDate: string;
  sslExpiryDate: string;
}

// ─── Mock state ───────────────────────────────────────────────────────────────

const SUBDOMAIN = 'mytenant.platformbds.vn';
const CNAME_TARGET = 'hosting.platformbds.vn';

const INITIAL_STATE: DomainState = {
  customDomain: 'www.mywebsite.vn',
  dnsStatus: 'PENDING',
  sslStatus: 'ACTIVE',
  sslIssueDate: '01/06/2026',
  sslExpiryDate: '01/06/2027',
};

// ─── Helper: DNS Status Badge ─────────────────────────────────────────────────

function DnsStatusBadge({ status }: { status: DnsStatus }) {
  const config = {
    PENDING: {
      icon: <Clock className="w-3.5 h-3.5" />,
      label: 'Đang Xác Minh',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    ACTIVE: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      label: 'Đã Kích Hoạt',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    ERROR: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: 'Lỗi Xác Minh',
      className: 'bg-red-50 text-red-700 border-red-200',
    },
  };

  const { icon, label, className } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}>
      {icon}
      {label}
    </span>
  );
}

// ─── Helper: SSL Status Badge ─────────────────────────────────────────────────

function SslStatusBadge({ status }: { status: DomainState['sslStatus'] }) {
  const config = {
    ACTIVE: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Đang Hoạt Động', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    EXPIRED: { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Đã Hết Hạn', className: 'bg-red-50 text-red-700 border-red-200' },
    PENDING: { icon: <Clock className="w-3.5 h-3.5" />, label: 'Đang Cấp Phát', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  };
  const { icon, label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}>
      {icon}
      {label}
    </span>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  subtitle,
  children,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`px-5 py-4 border-b border-slate-100 flex items-center gap-3 ${accent ?? 'bg-slate-50/50'}`}>
        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DomainSettingsPage() {
  const [state, setState] = useState<DomainState>(INITIAL_STATE);
  const [customDomainInput, setCustomDomainInput] = useState(INITIAL_STATE.customDomain);
  const [subdomainInput, setSubdomainInput] = useState('hoanggialand');
  const [platformDomain, setPlatformDomain] = useState('platformbds.vn');
  const [subdomainSaving, setSubdomainSaving] = useState(false);
  const [subdomainSaved, setSubdomainSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

  // Tải domain settings từ API
  React.useEffect(() => {
    const fetchDomain = async () => {
      try {
        const axios = (await import('axios')).default;
        const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
        if (res.data?.data) {
          const d = res.data.data;
          if (d.subdomain) {
            setSubdomainInput(d.subdomain);
          }
          if (d.platformDomain) {
            setPlatformDomain(d.platformDomain);
          }
          setCustomDomainInput(d.customDomain || '');
          setState(prev => ({
            ...prev,
            customDomain: d.customDomain || '',
            dnsStatus: d.dnsVerified ? 'ACTIVE' : 'PENDING',
            sslStatus: d.sslStatus === 'ACTIVE' ? 'ACTIVE' : d.sslStatus === 'EXPIRED' ? 'EXPIRED' : 'PENDING',
          }));
        }
      } catch (err) {
        // Giữ nguyên mock nếu lỗi
      }
    };
    fetchDomain();
  }, []);

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSaveSubdomain = async () => {
    setSubdomainSaving(true);
    try {
      const axios = (await import('axios')).default;
      await axios.put(
        `${API_URL}/api/cms/builder/domain`,
        { subdomain: subdomainInput.trim() },
        { withCredentials: true }
      );
      setSubdomainSaved(true);
      setTimeout(() => setSubdomainSaved(false), 3000);
    } catch (err: any) {
      alert(err?.response?.data?.error?.message || 'Lỗi lưu subdomain. Vui lòng thử lại.');
    } finally {
      setSubdomainSaving(false);
    }
  };

  const handleSaveDomain = async () => {
    setSaving(true);
    try {
      const axios = (await import('axios')).default;
      await axios.put(
        `${API_URL}/api/cms/builder/domain`,
        { customDomain: customDomainInput || null },
        { withCredentials: true }
      );
      setState((s) => ({ ...s, customDomain: customDomainInput, dnsStatus: 'PENDING' }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err?.response?.data?.error?.message || 'Lỗi lưu tên miền. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyDns = async () => {
    setVerifying(true);
    try {
      const axios = (await import('axios')).default;
      const res = await axios.post(
        `${API_URL}/api/cms/builder/domain/verify-dns`,
        {},
        { withCredentials: true }
      );
      const verified = res.data?.data?.verified;
      setState((s) => ({ ...s, dnsStatus: verified ? 'ACTIVE' : 'ERROR' }));
    } catch {
      setState((s) => ({ ...s, dnsStatus: 'ERROR' }));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <CMSLayout
      title="Domain & Hosting"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Domain & Hosting' },
      ]}
    >
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-slate-900">Domain & Hosting</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Cấu hình tên miền và chứng chỉ SSL cho website của bạn
        </p>
      </div>

      <div className="space-y-5">
        {/* ── Section 1: Subdomain ──────────────────────────────────── */}
        <SectionCard
          icon={<Server className="w-4 h-4 text-blue-500" />}
          title="Tên Miền Phụ Miễn Phí (Subdomain)"
          subtitle="Tùy chỉnh tên miền thương hiệu miễn phí chạy trên hạ tầng PlatformBDS"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 relative">
              <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 overflow-hidden focus-within:border-blue-500 focus-within:bg-white transition-all">
                <div className="pl-3.5 pr-2 py-3 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={subdomainInput}
                  onChange={(e) => {
                    setSubdomainInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                    setSubdomainSaved(false);
                  }}
                  placeholder="ten-thuong-hieu"
                  className="flex-1 py-3 text-sm font-mono font-bold text-blue-600 bg-transparent focus:outline-none placeholder:text-slate-400"
                />
                <span className="pr-4 py-3 text-xs font-mono font-bold text-slate-500 bg-slate-100/80 border-l border-slate-200 pl-3 select-none">
                  .{platformDomain}
                </span>
              </div>
            </div>

            <button
              onClick={handleSaveSubdomain}
              disabled={subdomainSaving || !subdomainInput}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all shrink-0 cursor-pointer ${
                subdomainSaved
                  ? 'bg-emerald-600'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20'
              }`}
            >
              {subdomainSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Đang Lưu...</>
              ) : subdomainSaved ? (
                <><Check className="w-4 h-4" /> Đã Cập Nhật</>
              ) : (
                <><Save className="w-4 h-4" /> Lưu Subdomain</>
              )}
            </button>

            <button
              onClick={() => handleCopy(`https://${subdomainInput}.${platformDomain}`, 'subdomain')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                copied === 'subdomain'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {copied === 'subdomain' ? (
                <><Check className="w-4 h-4" /> Đã Sao Chép</>
              ) : (
                <><Copy className="w-4 h-4" /> Sao Chép Link</>
              )}
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            Bạn có thể đổi tên miền phụ thương hiệu bất kỳ lúc nào hoàn toàn miễn phí. Website sẽ tự động trỏ theo tên mới tức thì.
          </p>
        </SectionCard>

        {/* ── Section 2: Custom Domain ──────────────────────────────── */}
        <SectionCard
          icon={<Globe className="w-4 h-4 text-indigo-500" />}
          title="Tên Miền Riêng"
          subtitle="Kết nối tên miền của bạn với website"
        >
          {/* Input row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={customDomainInput}
                onChange={(e) => {
                  setCustomDomainInput(e.target.value);
                  setSaved(false);
                }}
                placeholder="www.website-cua-ban.vn"
                className="w-full px-4 py-3 pr-32 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <DnsStatusBadge status={state.dnsStatus} />
              </div>
            </div>
            <button
              onClick={handleSaveDomain}
              disabled={saving}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all shrink-0 ${
                saved
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25'
              } disabled:opacity-60`}
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
              ) : saved ? (
                <><Check className="w-4 h-4" /> Đã lưu!</>
              ) : (
                <><Save className="w-4 h-4" /> Lưu</>
              )}
            </button>
          </div>

          {/* DNS Instructions */}
          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide">
                Hướng Dẫn Cài Đặt DNS
              </span>
            </div>
            <p className="text-xs text-indigo-700">
              Đăng nhập vào nhà cung cấp tên miền của bạn và thêm bản ghi CNAME sau:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: 'Loại', value: 'CNAME' },
                { label: 'Tên / Host', value: 'www' },
                { label: 'Giá Trị / Points To', value: CNAME_TARGET },
              ].map((row) => (
                <div key={row.label} className="bg-white rounded-lg border border-indigo-200 p-3">
                  <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono text-slate-800 font-semibold truncate">
                      {row.value}
                    </code>
                    <button
                      onClick={() => handleCopy(row.value, row.label)}
                      className="text-indigo-400 hover:text-indigo-600 shrink-0 transition-colors"
                      title="Sao chép"
                    >
                      {copied === row.label ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-indigo-600">
                DNS thường mất 24–48 giờ để cập nhật toàn cầu.
              </p>
              <button
                onClick={handleVerifyDns}
                disabled={verifying}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors disabled:opacity-60"
              >
                {verifying ? (
                  <><Loader2 className="w-3 h-3 animate-spin" /> Đang kiểm tra...</>
                ) : (
                  <><RefreshCw className="w-3 h-3" /> Kiểm Tra DNS</>
                )}
              </button>
            </div>
          </div>

          {/* Status messages */}
          {state.dnsStatus === 'ACTIVE' && (
            <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-emerald-700">
                Tên miền đã được xác minh thành công! Website đang chạy tại{' '}
                <a href={`https://${state.customDomain}`} target="_blank" rel="noreferrer" className="underline">
                  {state.customDomain}
                </a>
              </p>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-auto" />
            </div>
          )}
          {state.dnsStatus === 'ERROR' && (
            <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs font-semibold text-red-700">
                Không tìm thấy bản ghi CNAME. Vui lòng kiểm tra cài đặt DNS và thử lại.
              </p>
            </div>
          )}
        </SectionCard>

        {/* ── Section 3: SSL Certificate ────────────────────────────── */}
        <SectionCard
          icon={<Shield className="w-4 h-4 text-emerald-500" />}
          title="Chứng Chỉ SSL"
          subtitle="Bảo mật HTTPS tự động cho website"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trạng Thái</span>
              <SslStatusBadge status={state.sslStatus} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ngày Cấp</span>
              <span className="text-sm font-semibold text-slate-800">{state.sslIssueDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hết Hạn</span>
              <span className="text-sm font-semibold text-slate-800">{state.sslExpiryDate}</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-800">Tự Động Gia Hạn</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Chứng chỉ SSL được cấp phát và gia hạn tự động bởi PlatformBDS. Bạn không cần thực hiện bất kỳ thao tác thủ công nào.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── Section 4: Plan Features ──────────────────────────────── */}
        <SectionCard
          icon={<Zap className="w-4 h-4 text-amber-500" />}
          title="Tính Năng Theo Gói"
          subtitle="Những gì đã bao gồm trong gói của bạn"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: <Globe className="w-5 h-5 text-blue-500" />,
                title: 'Subdomain Miễn Phí',
                desc: 'Tên miền .platformbds.vn sẵn sàng ngay khi đăng ký',
                plan: 'Tất cả gói',
                planColor: 'text-blue-600 bg-blue-50 border-blue-200',
                included: true,
              },
              {
                icon: <Star className="w-5 h-5 text-indigo-500" />,
                title: 'Tên Miền Riêng',
                desc: 'Kết nối tên miền .com, .vn, .net tùy chỉnh',
                plan: 'Pro trở lên',
                planColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                included: true,
              },
              {
                icon: <Shield className="w-5 h-5 text-emerald-500" />,
                title: 'SSL Tự Động',
                desc: 'HTTPS an toàn, tự động gia hạn hàng năm',
                plan: 'Tất cả gói',
                planColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                included: true,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  {feature.included && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{feature.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                </div>
                <span className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full border ${feature.planColor}`}>
                  {feature.plan}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </CMSLayout>
  );
}

