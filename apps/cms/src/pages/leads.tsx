import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import CMSLayout from '../components/layout/CMSLayout';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Home, 
  Clock, 
  CheckCircle2, 
  X, 
  MessageSquare, 
  PhoneCall, 
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST' | 'SPAM';
type ActivityType = 'NOTE' | 'CALL' | 'EMAIL' | 'MEETING' | 'TASK' | 'STATUS_CHANGE';

interface Lead {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  source: string;
  status: LeadStatus;
  assignedTo?: string;
  projectTitle?: string;
  budget?: number;
  tags: string[];
  lastActivityAt?: string;
  createdAt: string;
  _count?: { notes: number; activities: number };
}

interface KanbanColumn {
  status: LeadStatus;
  label: string;
  color: string;
  badgeBg: string;
  headerBg: string;
  borderColor: string;
  count: number;
}

const COLUMNS: KanbanColumn[] = [
  { status: 'NEW',       label: 'Mới Nhận',    color: 'text-blue-700',   badgeBg: 'bg-blue-100 text-blue-800',   headerBg: 'bg-blue-50/70',   borderColor: 'border-blue-200',   count: 0 },
  { status: 'CONTACTED', label: 'Đã Liên Hệ', color: 'text-amber-700',  badgeBg: 'bg-amber-100 text-amber-800', headerBg: 'bg-amber-50/70',  borderColor: 'border-amber-200',  count: 0 },
  { status: 'QUALIFIED', label: 'Tiềm Năng',   color: 'text-purple-700', badgeBg: 'bg-purple-100 text-purple-800', headerBg: 'bg-purple-50/70', borderColor: 'border-purple-200', count: 0 },
  { status: 'WON',       label: 'Đã Chốt',     color: 'text-emerald-700',badgeBg: 'bg-emerald-100 text-emerald-800', headerBg: 'bg-emerald-50/70', borderColor: 'border-emerald-200', count: 0 },
  { status: 'LOST',      label: 'Hủy/Không Mua',color: 'text-rose-700',   badgeBg: 'bg-rose-100 text-rose-800',   headerBg: 'bg-rose-50/70',   borderColor: 'border-rose-200',   count: 0 },
  { status: 'SPAM',      label: 'Spam',        color: 'text-slate-600',  badgeBg: 'bg-slate-100 text-slate-700',  headerBg: 'bg-slate-50/70',  borderColor: 'border-slate-200',  count: 0 },
];

export const isTerminalStatus = (status: LeadStatus) => ['WON', 'LOST', 'SPAM'].includes(status);

export const getAllowedStatuses = (current: LeadStatus): LeadStatus[] => {
  switch (current) {
    case 'NEW':
      return ['NEW', 'CONTACTED', 'LOST', 'SPAM'];
    case 'CONTACTED':
      return ['CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM'];
    case 'QUALIFIED':
      return ['QUALIFIED', 'CONTACTED', 'WON', 'LOST', 'SPAM'];
    case 'WON':
      return ['WON'];
    case 'LOST':
      return ['LOST'];
    case 'SPAM':
      return ['SPAM'];
    default:
      return ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM'];
  }
};

// ─── API Helper ────────────────────────────────────────────────────────────

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'API Error');
  return json;
}

// ─── Lead Card ─────────────────────────────────────────────────────────────

function LeadCard({ lead, onSelect, onStatusChange }: {
  lead: Lead;
  onSelect: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}) {
  const sourceColors: Record<string, string> = {
    FORM: 'bg-blue-50 text-blue-700 border-blue-200',
    MANUAL: 'bg-slate-50 text-slate-700 border-slate-200',
    API: 'bg-purple-50 text-purple-700 border-purple-200',
    WEBHOOK: 'bg-orange-50 text-orange-700 border-orange-200',
    IMPORT: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <div
      className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
      onClick={() => onSelect(lead)}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="font-bold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
          {lead.fullName}
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${sourceColors[lead.source] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
          {lead.source}
        </span>
      </div>

      <div className="text-xs text-slate-600 space-y-1.5 mb-3">
        <a 
          href={`tel:${lead.phone}`} 
          onClick={(e) => e.stopPropagation()} 
          className="flex items-center gap-1.5 text-blue-600 font-semibold hover:underline"
        >
          <Phone className="w-3.5 h-3.5 text-blue-500" />
          <span>{lead.phone}</span>
        </a>
        {lead.email && (
          <div className="flex items-center gap-1.5 text-slate-500 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[190px]">{lead.email}</span>
          </div>
        )}
        {lead.projectTitle && (
          <div className="flex items-center gap-1.5 text-amber-700 font-medium bg-amber-50/60 px-2 py-1 rounded-md border border-amber-100 text-[11px]">
            <Home className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate max-w-[180px]">{lead.projectTitle}</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
        </span>

        <div className="flex items-center gap-1.5">
          {lead._count && lead._count.notes > 0 && (
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-0.5">
              <MessageSquare className="w-3 h-3 text-slate-400" /> {lead._count.notes}
            </span>
          )}
          <span className="text-xs text-blue-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Chi tiết <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Lead Detail Drawer ────────────────────────────────────────────────────

function LeadDrawer({ lead, onClose, onUpdate, onStatusChange }: {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: () => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}) {
  const [notes, setNotes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [actType, setActType] = useState<ActivityType>('CALL');
  const [actDesc, setActDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'info'>('timeline');

  useEffect(() => {
    if (!lead) return;
    apiFetch(`/api/cms/leads/${lead.id}`).then((r) => {
      setNotes(r.data?.notes ?? []);
      setActivities(r.data?.activities ?? []);
    }).catch(console.error);
  }, [lead?.id]);

  const submitNote = async () => {
    if (!lead || !newNote.trim()) return;
    setSubmitting(true);
    try {
      await apiFetch(`/api/cms/leads/${lead.id}/notes`, {
        method: 'POST',
        body: JSON.stringify({ content: newNote }),
      });
      setNewNote('');
      const r = await apiFetch(`/api/cms/leads/${lead.id}`);
      setNotes(r.data?.notes ?? []);
      onUpdate();
    } finally { setSubmitting(false); }
  };

  const submitActivity = async () => {
    if (!lead || !actDesc.trim()) return;
    setSubmitting(true);
    try {
      await apiFetch(`/api/cms/leads/${lead.id}/activities`, {
        method: 'POST',
        body: JSON.stringify({ type: actType, description: actDesc }),
      });
      setActDesc('');
      const r = await apiFetch(`/api/cms/leads/${lead.id}`);
      setActivities(r.data?.activities ?? []);
      onUpdate();
    } finally { setSubmitting(false); }
  };

  if (!lead) return null;

  const typeIcons: Record<string, any> = { 
    NOTE: <MessageSquare className="w-3.5 h-3.5 text-blue-500" />, 
    CALL: <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />, 
    EMAIL: <Mail className="w-3.5 h-3.5 text-purple-500" />, 
    MEETING: <Users className="w-3.5 h-3.5 text-amber-500" />, 
    TASK: <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />, 
    STATUS_CHANGE: <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> 
  };

  const isLocked = isTerminalStatus(lead.status);
  const allowed = getAllowedStatuses(lead.status);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in" />
      <div
        className="relative w-full max-w-lg bg-white h-full flex flex-col shadow-2xl border-l border-slate-200 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{lead.fullName}</h2>
              <div className="relative">
                <select
                  value={lead.status}
                  disabled={isLocked}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                    isLocked
                      ? 'bg-slate-100 text-slate-600 border-slate-300 cursor-not-allowed'
                      : 'bg-blue-50 text-blue-800 border-blue-200 cursor-pointer'
                  }`}
                  title={isLocked ? 'Trạng thái đã đóng/khóa vĩnh viễn' : 'Chuyển trạng thái xử lý'}
                >
                  {allowed.includes('NEW') && <option value="NEW">🔴 Mới Nhận</option>}
                  {allowed.includes('CONTACTED') && <option value="CONTACTED">🟡 Đã Liên Hệ</option>}
                  {allowed.includes('QUALIFIED') && <option value="QUALIFIED">🟣 Tiềm Năng</option>}
                  {allowed.includes('WON') && <option value="WON">🟢 Đã Chốt (Khóa)</option>}
                  {allowed.includes('LOST') && <option value="LOST">⚪ Hủy/Không Mua (Khóa)</option>}
                  {allowed.includes('SPAM') && <option value="SPAM">⚫ Thư Rác/Spam (Khóa)</option>}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-blue-600 font-semibold hover:underline">
                <Phone className="w-3.5 h-3.5" /> {lead.phone}
              </a>
              {lead.email && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Mail className="w-3.5 h-3.5" /> {lead.email}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-200 px-6">
          {(['timeline', 'info'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'timeline' ? '⚡ Nhật Ký & Ghi Chú' : '📋 Thông Tin Chi Tiết'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'timeline' ? (
            <>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Thêm ghi chú chăm sóc</p>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Khách cần tư vấn căn hộ 3PN hướng Đông Nam, chuẩn bị tài chính 5 tỷ..."
                  rows={3}
                  className="w-full text-sm bg-white border border-slate-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none placeholder-slate-400"
                />
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={submitNote} 
                    disabled={submitting || !newNote.trim()}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition shadow-xs"
                  >
                    Lưu Ghi Chú
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Ghi nhận hoạt động</p>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {(['CALL', 'EMAIL', 'MEETING', 'TASK'] as ActivityType[]).map((t) => (
                    <button 
                      key={t} 
                      onClick={() => setActType(t)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all flex items-center gap-1.5 ${
                        actType === t 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {typeIcons[t]} {t}
                    </button>
                  ))}
                </div>
                <input
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="Mô tả kết quả cuộc gọi, hẹn gặp..."
                  className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none placeholder-slate-400"
                />
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={submitActivity} 
                    disabled={submitting || !actDesc.trim()}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black disabled:opacity-50 transition shadow-xs"
                  >
                    Ghi Nhận
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Lịch sử tương tác</p>
                {activities.length === 0 && notes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6">Chưa có lịch sử tương tác nào với khách hàng này</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((n, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-800 leading-relaxed">{n.content}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    ))}
                    {activities.map((a, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          {typeIcons[a.type] || <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-slate-900 block">{a.type}</span>
                          <p className="text-xs text-slate-700 mt-0.5">{a.description}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(a.createdAt).toLocaleString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block mb-1">Dự án quan tâm</span>
                <p className="text-sm font-bold text-slate-900">{lead.projectTitle || 'Quan tâm chung'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block mb-1">Nguồn khách</span>
                <p className="text-sm font-bold text-slate-900">{lead.source}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold block mb-1">Ngày tiếp nhận</span>
                <p className="text-sm font-bold text-slate-900">{new Date(lead.createdAt).toLocaleString('vi-VN')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function LeadCRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [kanban, setKanban] = useState<Record<LeadStatus, number>>({} as any);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | ''>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({ fullName: '', phone: '', email: '', projectTitle: '', note: '', source: 'MANUAL' });
  const [creating, setCreating] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200', ...(filterStatus && { status: filterStatus }), ...(search && { search }) });
      const [leadsRes, kanbanRes] = await Promise.all([
        apiFetch(`/api/cms/leads?${params}`),
        apiFetch('/api/cms/leads/kanban'),
      ]);
      setLeads(leadsRes.leads ?? []);
      const kanbanMap: any = {};
      (kanbanRes.data ?? []).forEach((c: any) => { kanbanMap[c.status] = c.count; });
      setKanban(kanbanMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    const currentLead = leads.find((l) => l.id === leadId) || selectedLead;
    if (currentLead && isTerminalStatus(currentLead.status)) {
      alert('Hồ sơ khách hàng này đã ở trạng thái kết thúc (Đã chốt / Hủy / Spam), không thể chỉnh sửa lại.');
      return;
    }
    if (isTerminalStatus(status)) {
      const col = COLUMNS.find((c) => c.status === status);
      const label = col?.label || status;
      if (!confirm(`Xác nhận chuyển trạng thái sang "${label}"?\n\n⚠️ Lưu ý: Sau khi chọn "${label}", hồ sơ sẽ được khóa vĩnh viễn và không thể thay đổi lại trạng thái khác!`)) {
        return;
      }
    }
    try {
      await apiFetch(`/api/cms/leads/${leadId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, status });
      }
      fetchLeads();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật trạng thái.');
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!createForm.fullName.trim() || !createForm.phone.trim()) return;
    setCreating(true);
    try {
      await apiFetch('/api/cms/leads', {
        method: 'POST',
        body: JSON.stringify(createForm),
      });
      setShowCreateModal(false);
      setCreateForm({ fullName: '', phone: '', email: '', projectTitle: '', note: '', source: 'MANUAL' });
      fetchLeads();
    } catch (err) { console.error(err); } finally { setCreating(false); }
  };

  const leadsPerColumn = (status: LeadStatus) =>
    leads.filter((l) => l.status === status);

  return (
    <>
      <Head>
        <title>Khách Hàng (Leads) – PlatformBDS CMS</title>
      </Head>
      <CMSLayout
        title="Quản Lý Khách Hàng (Leads)"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Khách Hàng (Leads)' },
        ]}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-900">Quản Lý Khách Hàng (Leads)</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Theo dõi quy trình tư vấn và chăm sóc khách hàng bất động sản theo Pipeline
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  placeholder="Tìm tên, SĐT, dự án..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 shadow-xs"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                Thêm Khách Hàng
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button 
              onClick={() => setFilterStatus('')}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shadow-xs ${
                filterStatus === '' 
                  ? 'bg-slate-900 text-white ring-2 ring-slate-900' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tất Cả ({leads.length})
            </button>
            {COLUMNS.map((col) => {
              const active = filterStatus === col.status;
              const count = kanban[col.status] ?? 0;
              return (
                <button 
                  key={col.status} 
                  onClick={() => setFilterStatus(active ? '' : col.status)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap border flex items-center gap-2 shadow-xs ${
                    active 
                      ? `${col.badgeBg} ${col.borderColor} ring-2 ring-blue-400` 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{col.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${col.badgeBg}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-80 bg-white rounded-2xl border border-slate-200">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-4 min-w-max items-start">
                {COLUMNS.map((col) => {
                  const columnLeads = leadsPerColumn(col.status);
                  return (
                    <div key={col.status} className="w-80 flex flex-col bg-slate-100/70 rounded-2xl border border-slate-200/80 p-3 shadow-xs">
                      <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${col.borderColor} ${col.headerBg} mb-3`}>
                        <span className={`text-sm font-bold ${col.color}`}>{col.label}</span>
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${col.badgeBg} border ${col.borderColor}`}>
                          {columnLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3 min-h-[450px]">
                        {columnLeads.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-36 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white/50 p-4">
                            <Users className="w-6 h-6 text-slate-300 mb-1" />
                            <p className="text-xs text-slate-400 font-medium">Chưa có khách hàng</p>
                          </div>
                        ) : (
                          columnLeads.map((lead) => (
                            <LeadCard 
                              key={lead.id} 
                              lead={lead} 
                              onSelect={setSelectedLead} 
                              onStatusChange={handleStatusChange} 
                            />
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs animate-fade-in" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-100 animate-scale-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-slate-900">Thêm Khách Hàng Mới</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Họ và Tên Khách Hàng *</label>
                  <input
                    type="text"
                    value={createForm.fullName}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Ví dụ: Anh Nguyễn Văn Hoàng"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Số Điện Thoại *</label>
                  <input
                    type="tel"
                    value={createForm.phone}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="0901 234 567"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email (Nếu có)</label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="khachhang@gmail.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Dự Án Khách Quan Tâm</label>
                  <input
                    type="text"
                    value={createForm.projectTitle}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, projectTitle: e.target.value }))}
                    placeholder="Ví dụ: Penthouse Sky Residences"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ghi Chú Nhu Cầu</label>
                  <textarea
                    value={createForm.note}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="Yêu cầu cụ thể: tầm giá, vị trí, tiện ích..."
                    rows={3}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleCreate} 
                  disabled={creating || !createForm.fullName.trim() || !createForm.phone.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition shadow-xs"
                >
                  {creating ? 'Đang Tạo...' : 'Thêm Khách Hàng'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lead Detail Drawer */}
        {selectedLead && (
          <LeadDrawer
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={fetchLeads}
            onStatusChange={handleStatusChange}
          />
        )}
      </CMSLayout>
    </>
  );
}

