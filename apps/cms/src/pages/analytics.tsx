/**
 * CMS Analytics Dashboard
 *
 * Shows website traffic analytics for the tenant.
 * Phase 1: UI-only with mock data. Phase 2: Wire up to real analytics provider.
 *
 * Panels:
 *   - Overview cards (sessions, pageviews, bounce rate, avg duration)
 *   - Mini sparkline trend (CSS-only SVG paths)
 *   - Top pages table
 *   - Traffic sources chart (bar)
 *   - Device breakdown (donut)
 *   - Recent visitors feed
 */

import React, { useState } from 'react';
import Link from 'next/link';
import CMSLayout from '../components/layout/CMSLayout';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointerClick,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  ArrowUpRight,
  Minus,
  Calendar,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DateRange = '7d' | '30d' | '90d';

interface OverviewStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  sub?: string;
}

interface PageStat {
  path: string;
  title: string;
  sessions: number;
  avgTime: string;
  bounce: number;
}

interface TrafficSource {
  source: string;
  sessions: number;
  pct: number;
  color: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PAGE_STATS: PageStat[] = [
  { path: '/', title: 'Trang Chủ', sessions: 3241, avgTime: '2:34', bounce: 42 },
  { path: '/projects', title: 'Dự Án', sessions: 1872, avgTime: '3:12', bounce: 35 },
  { path: '/projects/luxury-villa-1', title: 'Villa Hoàng Gia 1', sessions: 943, avgTime: '4:05', bounce: 28 },
  { path: '/about', title: 'Giới Thiệu', sessions: 621, avgTime: '1:48', bounce: 58 },
  { path: '/contact', title: 'Liên Hệ', sessions: 489, avgTime: '1:22', bounce: 61 },
  { path: '/blog', title: 'Bài Viết', sessions: 334, avgTime: '5:14', bounce: 22 },
];

const TRAFFIC_SOURCES: TrafficSource[] = [
  { source: 'Google Search', sessions: 2841, pct: 47, color: 'bg-blue-500' },
  { source: 'Direct', sessions: 1523, pct: 25, color: 'bg-violet-500' },
  { source: 'Facebook', sessions: 912, pct: 15, color: 'bg-indigo-500' },
  { source: 'Zalo', sessions: 421, pct: 7, color: 'bg-emerald-500' },
  { source: 'Other', sessions: 363, pct: 6, color: 'bg-slate-400' },
];

const SPARKLINE_POINTS = [30, 45, 38, 52, 61, 55, 78, 82, 75, 90, 85, 95, 88, 102];

// ─── Sparkline SVG ────────────────────────────────────────────────────────────

function Sparkline({ points, color = '#3b82f6' }: { points: number[]; color?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const W = 80;
  const H = 28;
  const step = W / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: i * step,
    y: H - ((p - min) / range) * H,
  }));

  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
  const fill = `${d} L ${coords[coords.length - 1].x} ${H} L 0 ${H} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <path d={fill} fill={color} fillOpacity="0.1" />
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Change Badge ─────────────────────────────────────────────────────────────

function ChangeBadge({ change }: { change: number }) {
  if (change === 0) return (
    <span className="flex items-center gap-0.5 text-slate-500 text-[11px] font-semibold">
      <Minus className="w-3 h-3" /> 0%
    </span>
  );
  const up = change > 0;
  return (
    <span className={`flex items-center gap-0.5 text-[11px] font-bold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {Math.abs(change)}%
    </span>
  );
}

// ─── Device Donut ─────────────────────────────────────────────────────────────

function DeviceDonut() {
  const devices = [
    { label: 'Mobile', pct: 58, color: '#3b82f6', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { label: 'Desktop', pct: 34, color: '#8b5cf6', icon: <Monitor className="w-3.5 h-3.5" /> },
    { label: 'Tablet', pct: 8, color: '#10b981', icon: <Tablet className="w-3.5 h-3.5" /> },
  ];
  const R = 38;
  const CX = 48;
  const CY = 48;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {devices.map((d) => {
          const dashLen = (d.pct / 100) * circumference;
          const gap = circumference - dashLen;
          const el = (
            <circle
              key={d.label}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${dashLen} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          );
          offset += dashLen;
          return el;
        })}
      </svg>
      <div className="space-y-2.5">
        {devices.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-slate-500 flex items-center gap-1">{d.icon} {d.label}</span>
            <span className="text-xs font-bold text-slate-800 ml-auto">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [loading, setLoading] = useState(false);

  // Analytics chưa kết nối — số liệu sẽ hiện thị sau khi tích hợp Google Analytics 4 / Plausible
  const stats: OverviewStat[] = [
    { label: 'Phiên Truy Cập', value: '—', change: 0, icon: <Users className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50', sub: 'Chưa có dữ liệu' },
    { label: 'Lượt Xem Trang', value: '—', change: 0, icon: <Eye className="w-5 h-5" />, color: 'text-violet-600 bg-violet-50', sub: 'Chưa có dữ liệu' },
    { label: 'Tỷ Lệ Thoát', value: '—', change: 0, icon: <MousePointerClick className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50', sub: 'Chưa có dữ liệu' },
    { label: 'Thời Gian TB', value: '—', change: 0, icon: <Clock className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50', sub: 'Chưa có dữ liệu' },
  ];

  const handleRefresh = () => {
    // Analytics refresh - requires Google Analytics 4 / Plausible integration
    window.open('https://analytics.google.com', '_blank');
  };

  return (
    <CMSLayout
      title="Analytics"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Analytics' }]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500">Thống kê lưu lượng truy cập website của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date range selector */}
          <div className="flex gap-0.5 bg-slate-100 p-0.5 rounded-xl">
            {(['7d', '30d', '90d'] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${
                  dateRange === r ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r === '7d' ? '7 ngày' : r === '30d' ? '30 ngày' : '3 tháng'}
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
        </div>
      </div>

      {/* Warning: GA not connected */}
      <div className="flex items-center gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl mb-5">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <p className="text-xs text-amber-800">
          Hiện đang hiển thị dữ liệu mẫu. Kết nối{' '}
          <Link href="/seo" className="font-bold underline hover:no-underline">Google Analytics 4</Link>{' '}
          để xem dữ liệu thực tế của website.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <ChangeBadge change={stat.change} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
              <Sparkline points={SPARKLINE_POINTS} color={stat.change >= 0 ? '#10b981' : '#ef4444'} />
            </div>
          </div>
        ))}
      </div>

      {/* Middle row: Traffic sources + Device breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {/* Traffic sources */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-black text-slate-900 mb-4">Nguồn Truy Cập</h3>
          <div className="space-y-3">
            {TRAFFIC_SOURCES.map((src) => (
              <div key={src.source}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${src.color}`} />
                    <span className="text-xs text-slate-700 font-medium">{src.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{src.sessions.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-800 w-8 text-right">{src.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${src.color} rounded-full transition-all duration-700`} style={{ width: `${src.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-black text-slate-900 mb-4">Thiết Bị</h3>
          <DeviceDonut />
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
            {[
              { label: 'Mobile', value: '3,515', icon: <Smartphone className="w-3 h-3" /> },
              { label: 'Desktop', value: '2,060', icon: <Monitor className="w-3 h-3" /> },
              { label: 'Tablet', value: '485', icon: <Tablet className="w-3 h-3" /> },
            ].map((d) => (
              <div key={d.label} className="text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">{d.icon}<span className="text-[10px]">{d.label}</span></div>
                <p className="text-sm font-black text-slate-800">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top pages table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">Trang Xem Nhiều Nhất</h3>
          <Link href="/pages" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Xem tất cả <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                <th className="px-5 py-3 text-left">#</th>
                <th className="px-5 py-3 text-left">Trang</th>
                <th className="px-5 py-3 text-right">Phiên</th>
                <th className="px-5 py-3 text-right hidden sm:table-cell">TG Trung Bình</th>
                <th className="px-5 py-3 text-right hidden md:table-cell">Tỷ Lệ Thoát</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PAGE_STATS.map((page, i) => (
                <tr key={page.path} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{i + 1}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-slate-800">{page.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{page.path}</p>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-bold text-slate-800">{page.sessions.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm text-slate-600 hidden sm:table-cell">{page.avgTime}</td>
                  <td className="px-5 py-3.5 text-right hidden md:table-cell">
                    <span className={`text-xs font-bold ${page.bounce > 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {page.bounce}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CMSLayout>
  );
}

