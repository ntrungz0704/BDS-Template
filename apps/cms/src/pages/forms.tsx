/**
 * CMS Contact Forms Manager
 *
 * View and manage contact form submissions from website visitors.
 *   - Stats: total, this week, unread, converted
 *   - Filter tabs: All / Unread / Read / Converted
 *   - Table with avatar initials, full contact info, message preview, status badge
 *   - Click row → right-side slide-over panel with full details + actions
 *   - Export CSV toast notification
 */

import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CMSLayout from '../components/layout/CMSLayout';
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Users,
  Inbox,
  CheckCircle,
  TrendingUp,
  X,
  Download,
  Eye,
  Trash2,
  PhoneCall,
  UserCheck,
  XCircle,
  ExternalLink,
  Clock,
  Search,
  Check,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

// ─── Types ────────────────────────────────────────────────────────────────────

type SubmissionStatus = 'unread' | 'read' | 'lead' | 'called' | 'failed';
type FilterTab = 'all' | 'unread' | 'read' | 'converted';

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string; // ISO date string
  status: SubmissionStatus;
  project?: string;
  source?: string;
}

// ─── (Mock data removed — data is fetched from API) ──────────────────────────

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function isThisWeek(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return d >= startOfWeek;
}

const STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  unread: {
    label: 'Chưa đọc',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  read: {
    label: 'Đã đọc',
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  },
  lead: {
    label: 'Tiềm năng',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  called: {
    label: 'Đã gọi',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  failed: {
    label: 'Không thành công',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    dot: 'bg-red-400',
  },
};

const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
];

function avatarColor(id: string) {
  const idx = parseInt(id, 10) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Detail Side Panel ────────────────────────────────────────────────────────

function DetailPanel({
  submission,
  onClose,
  onStatusChange,
  onDelete,
}: {
  submission: FormSubmission;
  onClose: () => void;
  onStatusChange: (id: string, status: SubmissionStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Xóa liên hệ từ "${submission.name}"?`)) return;
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 400));
    onDelete(submission.id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-[slideIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(submission.id)} flex items-center justify-center text-white text-sm font-black shrink-0`}
            >
              {getInitials(submission.name)}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{submission.name}</h2>
              <p className="text-xs text-slate-500">{formatDateTime(submission.submittedAt)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Status */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Trạng thái
            </p>
            <StatusBadge status={submission.status} />
          </div>

          {/* Contact details */}
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Thông Tin Liên Hệ
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Email</p>
                <p className="text-sm font-semibold text-slate-800">{submission.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Số Điện Thoại</p>
                <p className="text-sm font-semibold text-slate-800">{submission.phone}</p>
              </div>
            </div>
            {submission.project && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 text-violet-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Dự Án Quan Tâm</p>
                  <p className="text-sm font-semibold text-slate-800">{submission.project}</p>
                </div>
              </div>
            )}
            {submission.source && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Nguồn</p>
                  <p className="text-sm font-semibold text-slate-800">{submission.source}</p>
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Nội Dung Tin Nhắn
            </p>
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <p className="text-sm text-slate-700 leading-relaxed">{submission.message}</p>
            </div>
          </div>

          {/* Change status */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cập Nhật Trạng Thái
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => onStatusChange(submission.id, 'lead')}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  submission.status === 'lead'
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Đánh Dấu Đầu Mối (Lead)
                {submission.status === 'lead' && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
              <button
                onClick={() => onStatusChange(submission.id, 'called')}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  submission.status === 'called'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'border-slate-200 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                Đã Gọi Điện
                {submission.status === 'called' && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
              <button
                onClick={() => onStatusChange(submission.id, 'failed')}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  submission.status === 'failed'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Không Thành Công
                {submission.status === 'failed' && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-slate-100 shrink-0 flex items-center gap-2">
          <a
            href={`mailto:${submission.email}?subject=Tư vấn Bất Động Sản&body=Kính gửi ${submission.name},%0D%0A%0D%0ATôi muốn liên hệ về yêu cầu tư vấn của bạn...`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white transition-colors shadow-md shadow-blue-600/25"
          >
            <Mail className="w-4 h-4" />
            Trả Lời Email
          </a>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-40"
          >
            {deleting ? (
              <span className="w-4 h-4 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Xoá
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl shadow-2xl animate-[fadeInUp_0.2s_ease-out]">
      <Check className="w-4 h-4 text-emerald-400" />
      {message}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FormsManagerPage() {
  const { data: domainData } = useQuery<any>({
    queryKey: ['cms_layout_domain'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/builder/domain`, { withCredentials: true });
      return res.data?.data;
    },
    staleTime: Infinity,
  });
  const activeTenantId = domainData?.tenantId;

  const { data: submissionsData, isLoading } = useQuery({
    queryKey: ['leads', activeTenantId], // 'leads' or 'forms'
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/cms/forms`, { withCredentials: true });
      return res.data;
    },
    enabled: !!activeTenantId,
  });

  const [localSubmissions, setLocalSubmissions] = useState<FormSubmission[]>([]);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  React.useEffect(() => {
    if (submissionsData?.data) {
      setLocalSubmissions(submissionsData.data);
    }
  }, [submissionsData]);

  const submissions = localSubmissions;

  const handleStatusChange = useCallback(async (id: string, status: SubmissionStatus) => {
    try {
      await axios.put(`${API_URL}/api/cms/forms/${id}/status`, { status }, { withCredentials: true });
      setLocalSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    } catch (error) {
      alert('Không thể cập nhật trạng thái liên hệ.');
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Xóa liên hệ này?')) return;
    try {
      await axios.delete(`${API_URL}/api/cms/forms/${id}`, { withCredentials: true });
      setLocalSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      alert('Không thể xóa liên hệ.');
    }
  }, []);

  if (isLoading) {
    return (
      <CMSLayout title="Form Submissions" breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Liên Hệ' }]}>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Đang tải dữ liệu...</p>
          </div>
        </div>
      </CMSLayout>
    );
  }




  const selected = submissions.find((s) => s.id === selectedId) ?? null;



  const handleRowClick = (submission: FormSubmission) => {
    setSelectedId(submission.id);
    // Mark as read if unread
    if (submission.status === 'unread') {
      handleStatusChange(submission.id, 'read');
    }
  };

  const handleExportCSV = () => {
    setToast('Đang xuất file CSV... Tải xuống sẽ bắt đầu ngay.');
  };

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    const searchMatch =
      !search ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.message.toLowerCase().includes(q);

    let filterMatch = true;
    if (filter === 'unread') filterMatch = s.status === 'unread';
    if (filter === 'read') filterMatch = s.status === 'read';
    if (filter === 'converted') filterMatch = s.status === 'lead' || s.status === 'called';

    return searchMatch && filterMatch;
  });

  const stats = [
    {
      label: 'Tổng Liên Hệ',
      value: submissions.length,
      icon: <Users className="w-4 h-4 text-blue-500" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Tuần Này',
      value: submissions.filter((s) => isThisWeek(s.submittedAt)).length,
      icon: <Calendar className="w-4 h-4 text-violet-500" />,
      bg: 'bg-violet-50',
    },
    {
      label: 'Chưa Đọc',
      value: submissions.filter((s) => s.status === 'unread').length,
      icon: <Inbox className="w-4 h-4 text-amber-500" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Tiềm Năng',
      value: submissions.filter((s) => s.status === 'lead' || s.status === 'called').length,
      icon: <TrendingUp className="w-4 h-4 text-emerald-500" />,
      bg: 'bg-emerald-50',
    },
  ];

  const FILTER_TABS: Array<{ key: FilterTab; label: string; count: number }> = [
    { key: 'all', label: 'Tất Cả', count: submissions.length },
    { key: 'unread', label: 'Chưa Đọc', count: submissions.filter((s) => s.status === 'unread').length },
    { key: 'read', label: 'Đã Đọc', count: submissions.filter((s) => s.status === 'read').length },
    {
      key: 'converted',
      label: 'Tiềm Năng',
      count: submissions.filter((s) => s.status === 'lead' || s.status === 'called').length,
    },
  ];

  return (
    <CMSLayout
      title="Quản Lý Form Liên Hệ"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Liên Hệ' },
      ]}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Quản Lý Form Liên Hệ</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Xem và xử lý các yêu cầu liên hệ từ khách hàng tiềm năng
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Xuất CSV
        </button>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 flex-wrap">
          {/* Filter tabs */}
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-xl">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-xs font-semibold transition-all ${
                  filter === tab.key
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      filter === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl min-w-[200px] shadow-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm liên hệ..."
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Khách Hàng
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  SĐT
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden xl:table-cell">
                  Thông Điệp
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  Ngày Gửi
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Trạng Thái
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <MessageSquare className="w-10 h-10 opacity-30" />
                      <p className="text-sm font-medium">Không có liên hệ nào</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => handleRowClick(s)}
                    className={`group hover:bg-slate-50/70 transition-colors cursor-pointer ${
                      s.status === 'unread' ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(s.id)} flex items-center justify-center text-white text-[11px] font-black shrink-0`}
                        >
                          {getInitials(s.name)}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-semibold text-slate-800 ${
                              s.status === 'unread' ? 'font-black' : ''
                            }`}
                          >
                            {s.name}
                          </p>
                          {s.project && (
                            <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                              {s.project}
                            </p>
                          )}
                        </div>
                        {s.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-600">{s.email}</span>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-xs font-mono text-slate-600">{s.phone}</span>
                    </td>

                    {/* Message preview */}
                    <td className="px-5 py-3.5 hidden xl:table-cell max-w-[220px]">
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {s.message.slice(0, 80)}{s.message.length > 80 ? '...' : ''}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 hidden sm:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {formatDateTime(s.submittedAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge status={s.status} />
                    </td>

                    {/* Actions */}
                    <td
                      className="px-5 py-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleRowClick(s)}
                          title="Xem chi tiết"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`mailto:${s.email}`}
                          title="Gửi email"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(s.id)}
                          title="Xóa"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30">
            <span className="text-xs text-slate-400">
              {filtered.length} liên hệ · {submissions.filter((s) => s.status === 'unread').length} chưa đọc
            </span>
          </div>
        )}
      </div>

      {/* ── Detail Side Panel ──────────────────────────────────────── */}
      {selected && (
        <DetailPanel
          submission={selected}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      {/* ── Toast ──────────────────────────────────────────────────── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </CMSLayout>
  );
}

