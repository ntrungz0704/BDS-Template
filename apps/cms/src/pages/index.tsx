/**
 * CMS Dashboard — Overview / Home Page
 *
 * Shows key metrics, quick actions, and recent activity.
 */

import React from 'react';
import Link from 'next/link';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Building2,
  FileText,
  Image,
  Users,
  TrendingUp,
  Eye,
  ArrowRight,
  Palette,
  Globe,
  Settings,
  Phone,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,

  BarChart3,
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

// ─── Data Types ───────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface QuickAction {
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  badge?: string;
}

// ─── Static Data (replace with API calls in production) ──────────────────────

const STAT_CARDS: StatCard[] = [
  {
    label: 'Tổng Dự Án',
    value: '—',
    change: '',
    icon: <Building2 className="w-5 h-5" />,
    href: '/projects',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    label: 'Bài Viết Đã Đăng',
    value: '—',
    change: '',
    icon: <FileText className="w-5 h-5" />,
    href: '/posts',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'File Media',
    value: '—',
    change: '',
    icon: <Image className="w-5 h-5" />,
    href: '/media',
    color: 'from-violet-500 to-purple-600',
  },
  {
    label: 'Yêu Cầu Liên Hệ',
    value: '—',
    change: '— chưa đọc',
    changeUp: false,
    icon: <Phone className="w-5 h-5" />,
    href: '/forms',
    color: 'from-amber-500 to-orange-600',
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Thiết Kế Giao Diện',
    description: 'Tùy chỉnh màu sắc, phông chữ, bố cục',
    icon: <Palette className="w-5 h-5" />,
    href: '/theme',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    label: 'Thêm Dự Án Mới',
    description: 'Đăng tin dự án bất động sản',
    icon: <Building2 className="w-5 h-5" />,
    href: '/projects/new',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    label: 'Khách Hàng (Leads)',
    description: 'Quản lý yêu cầu tư vấn',
    icon: <Users className="w-5 h-5" />,
    href: '/leads',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    badge: 'Mới',
  },
  {
    label: 'Cài Đặt Domain',
    description: 'Tên miền riêng, SSL',
    icon: <Globe className="w-5 h-5" />,
    href: '/domain',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    label: 'Gói Dịch Vụ',
    description: 'Gia hạn, nâng cấp gói',
    icon: <Zap className="w-5 h-5" />,
    href: '/billing',
    color: 'bg-rose-50 text-rose-600 border-rose-100',
  },
  {
    label: 'Cài Đặt Chung',
    description: 'Thông tin công ty, branding',
    icon: <Settings className="w-5 h-5" />,
    href: '/settings',
    color: 'bg-slate-50 text-slate-600 border-slate-100',
  },
];

// ─── Stat Card Component ──────────────────────────────────────────────────────

function DashboardStatCard({ card }: { card: StatCard }) {
  return (
    <Link
      href={card.href}
      className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{card.label}</p>
          <p className="text-3xl font-black text-slate-900">{card.value}</p>
          {card.change && (
            <p className={`text-xs mt-1 font-medium ${card.changeUp ? 'text-emerald-600' : 'text-slate-400'}`}>
              {card.change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md shadow-slate-200 group-hover:scale-105 transition-transform shrink-0`}>
          {card.icon}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
        <span>Quản lý chi tiết</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

// ─── Quick Action Component ───────────────────────────────────────────────────

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <Link
      href={action.href}
      className={`group flex items-center gap-4 p-4 rounded-xl border bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-150 ${action.color.split(' ').slice(2).join(' ')}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${action.color}`}>
        {action.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">{action.label}</p>
          {action.badge && (
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500 text-white">
              {action.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 truncate">{action.description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
}

// ─── Status Badge Component ───────────────────────────────────────────────────

function StatusItem({
  label,
  status,
  detail,
}: {
  label: string;
  status: 'ok' | 'warning' | 'pending';
  detail?: string;
}) {
  const configs = {
    ok: { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, textColor: 'text-emerald-600' },
    warning: { icon: <AlertCircle className="w-4 h-4 text-amber-500" />, textColor: 'text-amber-600' },
    pending: { icon: <Clock className="w-4 h-4 text-blue-500" />, textColor: 'text-blue-600' },
  };
  const config = configs[status];
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-b-0">
      {config.icon}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {detail && <p className={`text-xs ${config.textColor}`}>{detail}</p>}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CMSDashboard() {
  const { data: domainData } = useQuery<any>({
    queryKey: ['cms_layout_domain'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data?.data;
    },
    staleTime: Infinity,
  });
  const activeTenantId = domainData?.tenantId;

  const { data: projectsData } = useQuery({
    queryKey: ['projects', activeTenantId, 'count'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/projects?limit=1`, { withCredentials: true });
      return res.data.meta?.total ?? 0;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: postsData } = useQuery({
    queryKey: ['posts', activeTenantId, 'count'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/posts?limit=1`, { withCredentials: true });
      return res.data.meta?.total ?? 0;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: mediaCount } = useQuery({
    queryKey: ['media', activeTenantId, 'count'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/media/assets?limit=1`, { withCredentials: true });
      return res.data.meta?.total ?? 0;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: formsCount } = useQuery({
    queryKey: ['leads', activeTenantId, 'count'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/forms?limit=1`, { withCredentials: true });
      return res.data.meta?.total ?? 0;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: dashboardStatus } = useQuery({
    queryKey: ['domain', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: subscriptionData } = useQuery({
    queryKey: ['subscription', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/subscription`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const { data: meData } = useQuery({
    queryKey: ['cms_me'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/auth/me`, { withCredentials: true });
      return res.data.data;
    },
    retry: false,
  });

  // Upgrade check query
  const { data: updateData, refetch: refetchUpdate } = useQuery({
    queryKey: ['upgrade_check', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/upgrade/check`, { withCredentials: true });
      return res.data?.data;
    },
    enabled: !!activeTenantId,
    retry: false,
  });

  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const { data: previewData } = useQuery({
    queryKey: ['upgrade_preview', activeTenantId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/upgrade/preview`, { withCredentials: true });
      return res.data?.data;
    },
    enabled: showPreviewModal,
    retry: false,
  });

  const applyUpdateMutation = useMutation({
    mutationFn: async () => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/cms/builder/upgrade/apply`,
        {},
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: (resData) => {
      alert(resData.message || 'Nâng cấp template thành công!');
      refetchUpdate();
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi nâng cấp.');
    }
  });

  const rollbackUpdateMutation = useMutation({
    mutationFn: async () => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(
        `${API_URL}/api/cms/builder/upgrade/rollback`,
        {},
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true
        }
      );
      return res.data;
    },
    onSuccess: (resData) => {
      alert(resData.message || 'Đã rollback thành công!');
      refetchUpdate();
    },
    onError: (err: any) => {
      alert(err.response?.data?.error?.message || 'Có lỗi xảy ra khi rollback.');
    }
  });

  const STAT_CARDS_DYNAMIC = [
    { ...STAT_CARDS[0], value: projectsData !== undefined ? String(projectsData) : '0' },
    { ...STAT_CARDS[1], value: postsData !== undefined ? String(postsData) : '0' },
    { ...STAT_CARDS[2], value: mediaCount !== undefined ? String(mediaCount) : '0' },
    { ...STAT_CARDS[3], value: formsCount !== undefined ? String(formsCount) : '0' },
  ];

  const displayName = meData?.user?.fullName || meData?.fullName || 'Chủ Sở Hữu Website';

  return (
    <CMSLayout
      title="Tổng Quan"
      breadcrumbs={[{ label: 'Dashboard' }]}
    >
      {/* Update Available Banner */}
      {updateData?.updateAvailable && (
        <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-pulse text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Cập nhật thiết kế mới sẵn có! (v{updateData.latestVersion / 10})</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Mẫu website của bạn có bản cập nhật mới. Phiên bản hiện tại: v{updateData.currentVersion / 10}.
                {updateData.updateNotes && ` Ghi chú: "${updateData.updateNotes}"`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors"
            >
              Xem trước
            </button>
            <button
              onClick={() => {
                if (confirm("Xác nhận nâng cấp? Quá trình di cư cấu hình sẽ không gây mất dữ liệu của bạn.")) {
                  applyUpdateMutation.mutate();
                }
              }}
              disabled={applyUpdateMutation.isPending}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              {applyUpdateMutation.isPending ? 'Đang cập nhật...' : 'Nâng cấp ngay'}
            </button>
            <button
              onClick={() => {
                if (confirm("Khôi phục về phiên bản trước?")) {
                  rollbackUpdateMutation.mutate();
                }
              }}
              className="px-2 py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold"
            >
              Phục hồi
            </button>
          </div>
        </div>
      )}
      {/* Welcome Banner */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-6 text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">PlatformBDS CMS Builder</p>
              <h1 className="text-2xl font-black mb-1">Xin chào, {displayName}! 👋</h1>
              <p className="text-sm text-white/60">Quản lý toàn bộ website bất động sản của bạn từ đây.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/theme"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Thiết Kế
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://bds-template-website.aireviewbds.com'}?tenant=${dashboardStatus?.subdomain || 'hoanggialand'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors shadow-md"
              >
                <Eye className="w-4 h-4" />
                Xem Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS_DYNAMIC.map((card) => (
          <DashboardStatCard key={card.href} card={card} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Thao Tác Nhanh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionCard key={action.href} action={action} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Trạng Thái Hệ Thống</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <StatusItem label="Website đang hoạt động" status="ok" detail="online" />
            <StatusItem
              label="SSL Certificate"
              status={dashboardStatus?.sslStatus === 'ACTIVE' ? 'ok' : dashboardStatus?.sslStatus === 'PENDING' ? 'pending' : 'warning'}
              detail={dashboardStatus?.sslStatus === 'ACTIVE' ? 'Đã cài đặt' : dashboardStatus?.sslStatus === 'PENDING' ? 'Đang xác thực...' : 'Chưa cài đặt'}
            />
            <StatusItem
              label="Domain custom"
              status={dashboardStatus?.customDomain ? 'ok' : 'warning'}
              detail={dashboardStatus?.customDomain || 'Chưa thiết lập'}
            />
            <StatusItem label="Database" status="ok" detail="Kết nối ổn định" />
            <StatusItem label="Subdomain" status="ok" detail={dashboardStatus?.subdomain ? `${dashboardStatus.subdomain}.platformbds.vn` : 'Chưa có'} />
          </div>

          {/* Plan Info */}
          <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Gói Hiện Tại</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">
                {subscriptionData?.plan || 'STARTER'}
              </span>
            </div>
            <p className="text-sm text-blue-900 font-medium mb-3">
              {subscriptionData?.endDate
                ? `Còn ${Math.max(0, Math.ceil((new Date(subscriptionData.endDate).getTime() - Date.now()) / 86400000))} ngày trước khi hết hạn`
                : 'Chưa có gói đăng ký'}
            </p>
            <Link
              href="/settings/billing"
              className="block text-center text-xs font-bold py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Nâng Cấp Gói
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 text-left border">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Xem trước Giao diện mới</h3>
            <p className="text-xs text-slate-400">
              Đây là các thông số thiết kế được thay đổi trong phiên bản mới nhất:
            </p>
            {previewData ? (
              <div className="space-y-3 bg-slate-50 p-4 border rounded-xl max-h-[300px] overflow-y-auto">
                <div>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Theme Config</h5>
                  <pre className="text-[10px] font-mono text-slate-600 bg-white border p-2 rounded-lg overflow-x-auto">
                    {JSON.stringify(previewData.themeConfig, null, 2)}
                  </pre>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Feature Flags</h5>
                  <pre className="text-[10px] font-mono text-slate-600 bg-white border p-2 rounded-lg overflow-x-auto">
                    {JSON.stringify(previewData.featureFlags, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Đang tải cấu hình...</p>
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="flex-1 h-10 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition-all"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  if (confirm("Xác nhận nâng cấp? Quá trình di cư cấu hình sẽ không gây mất dữ liệu của bạn.")) {
                    applyUpdateMutation.mutate();
                  }
                }}
                className="flex-1 h-10 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Nâng cấp trực tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}

