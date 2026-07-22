import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import CMSLayout from '../components/layout/CMSLayout';

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
  bgColor: string;
  borderColor: string;
  count: number;
}

const COLUMNS: KanbanColumn[] = [
  { status: 'NEW',       label: 'Mới',          color: 'text-blue-700',   bgColor: 'bg-blue-50',   borderColor: 'border-blue-200', count: 0 },
  { status: 'CONTACTED', label: 'Đã liên hệ',   color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', count: 0 },
  { status: 'QUALIFIED', label: 'Tiềm năng',     color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', count: 0 },
  { status: 'WON',       label: 'Thành công',    color: 'text-green-700',  bgColor: 'bg-green-50',  borderColor: 'border-green-200', count: 0 },
  { status: 'LOST',      label: 'Thất bại',      color: 'text-red-700',    bgColor: 'bg-red-50',    borderColor: 'border-red-200', count: 0 },
  { status: 'SPAM',      label: 'Spam',           color: 'text-gray-500',   bgColor: 'bg-gray-50',   borderColor: 'border-gray-200', count: 0 },
];

// ─── API Helper ────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
    FORM: 'bg-blue-100 text-blue-700',
    MANUAL: 'bg-gray-100 text-gray-600',
    API: 'bg-purple-100 text-purple-700',
    WEBHOOK: 'bg-orange-100 text-orange-700',
    IMPORT: 'bg-teal-100 text-teal-700',
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onSelect(lead)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{lead.fullName}</div>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${sourceColors[lead.source] ?? 'bg-gray-100 text-gray-600'}`}>
          {lead.source}
        </span>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-3">
        <div className="flex items-center gap-1">
          <span>📞</span>
          <span>{lead.phone}</span>
        </div>
        {lead.email && (
          <div className="flex items-center gap-1">
            <span>✉️</span>
            <span className="truncate max-w-[160px]">{lead.email}</span>
          </div>
        )}
        {lead.projectTitle && (
          <div className="flex items-center gap-1">
            <span>🏠</span>
            <span className="truncate max-w-[160px]">{lead.projectTitle}</span>
          </div>
        )}
      </div>

      {/* Quick Move Buttons */}
      <div className="flex gap-1 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        {COLUMNS.filter((c) => c.status !== lead.status).slice(0, 3).map((col) => (
          <button
            key={col.status}
            onClick={() => onStatusChange(lead.id, col.status)}
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${col.borderColor} ${col.color} ${col.bgColor} hover:opacity-80 transition`}
          >
            → {col.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <span className="text-[10px] text-gray-400">
          {new Date(lead.createdAt).toLocaleDateString('vi-VN')}
        </span>
        {lead._count && (
          <div className="flex gap-2 text-[10px] text-gray-400">
            {lead._count.notes > 0 && <span>📝 {lead._count.notes}</span>}
            {lead._count.activities > 0 && <span>⚡ {lead._count.activities}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lead Detail Drawer ────────────────────────────────────────────────────

function LeadDrawer({ lead, onClose, onUpdate }: {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: () => void;
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
      setNotes(r.data.notes ?? []);
      setActivities(r.data.activities ?? []);
    });
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
      setNotes(r.data.notes ?? []);
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
      setActivities(r.data.activities ?? []);
    } finally { setSubmitting(false); }
  };

  if (!lead) return null;

  const typeIcons: Record<string, string> = { NOTE: '📝', CALL: '📞', EMAIL: '✉️', MEETING: '🤝', TASK: '✅', STATUS_CHANGE: '🔄' };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{lead.fullName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{lead.phone} {lead.email ? `· ${lead.email}` : ''}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          {(['timeline', 'info'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {tab === 'timeline' ? '⚡ Timeline' : '📋 Thông tin'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'timeline' ? (
            <>
              {/* Add Note */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Thêm ghi chú</p>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Nhập nội dung ghi chú..."
                  rows={3}
                  className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={submitNote} disabled={submitting || !newNote.trim()}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                  Lưu ghi chú
                </button>
              </div>

              {/* Log Activity */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Ghi nhật ký hoạt động</p>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {(['CALL', 'EMAIL', 'MEETING', 'TASK'] as ActivityType[]).map((t) => (
                    <button key={t} onClick={() => setActType(t)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border transition ${actType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>
                      {typeIcons[t]} {t}
                    </button>
                  ))}
                </div>
                <input
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder={`Mô tả hoạt động ${actType.toLowerCase()}...`}
                  className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button onClick={submitActivity} disabled={submitting || !actDesc.trim()}
                  className="mt-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition">
                  Ghi nhật ký
                </button>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                {[...notes.map((n: any) => ({ ...n, _type: 'NOTE' })), ...activities]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="mt-1 text-lg">{typeIcons[item._type ?? item.type] ?? '📌'}</div>
                      <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.content ?? item.description}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{new Date(item.createdAt).toLocaleString('vi-VN')}</p>
                      </div>
                    </div>
                  ))}
                {notes.length === 0 && activities.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">Chưa có hoạt động nào.</p>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Tên', value: lead.fullName },
                { label: 'Điện thoại', value: lead.phone },
                { label: 'Email', value: lead.email },
                { label: 'Nguồn', value: lead.source },
                { label: 'Dự án', value: lead.projectTitle },
                { label: 'Ngân sách', value: lead.budget ? `${Number(lead.budget).toLocaleString('vi-VN')} VNĐ` : undefined },
                { label: 'Ngày tạo', value: new Date(lead.createdAt).toLocaleString('vi-VN') },
              ].filter((r) => r.value).map((row) => (
                <div key={row.label} className="flex justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{row.value}</span>
                </div>
              ))}
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
  const [createForm, setCreateForm] = useState({ fullName: '', phone: '', email: '', note: '', source: 'MANUAL' });
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
    try {
      await apiFetch(`/api/cms/leads/${leadId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      fetchLeads();
    } catch (err) { console.error(err); }
  };

  const handleCreate = async () => {
    if (!createForm.fullName || !createForm.phone) return;
    setCreating(true);
    try {
      await apiFetch('/api/cms/leads', {
        method: 'POST',
        body: JSON.stringify(createForm),
      });
      setShowCreateModal(false);
      setCreateForm({ fullName: '', phone: '', email: '', note: '', source: 'MANUAL' });
      fetchLeads();
    } catch (err) { console.error(err); } finally { setCreating(false); }
  };

  const leadsPerColumn = (status: LeadStatus) =>
    leads.filter((l) => l.status === status);

  return (
    <>
      <Head>
        <title>Lead CRM – PlatformBDS</title>
      </Head>
      <CMSLayout>
        <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-950">
          {/* Header */}
          <div className="px-6 py-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lead CRM</h1>
              <p className="text-sm text-gray-500 mt-0.5">Quản lý khách hàng tiềm năng — Kanban Pipeline</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Tìm tên, SĐT, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-56 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Thêm Lead
              </button>
            </div>
          </div>

          {/* Summary Bar */}
          <div className="px-6 py-3 flex gap-4 overflow-x-auto bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <button onClick={() => setFilterStatus('')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition whitespace-nowrap ${filterStatus === '' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Tất cả ({leads.length})
            </button>
            {COLUMNS.map((col) => (
              <button key={col.status} onClick={() => setFilterStatus(filterStatus === col.status ? '' : col.status)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition whitespace-nowrap ${filterStatus === col.status ? `${col.bgColor} ${col.color} border ${col.borderColor}` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {col.label} ({kanban[col.status] ?? 0})
              </button>
            ))}
          </div>

          {/* Kanban Board */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto px-6 py-6">
              <div className="flex gap-4 min-w-max h-full items-start">
                {COLUMNS.map((col) => {
                  const columnLeads = leadsPerColumn(col.status);
                  return (
                    <div key={col.status} className="w-72 flex flex-col">
                      {/* Column Header */}
                      <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl border ${col.borderColor} ${col.bgColor}`}>
                        <span className={`text-sm font-bold ${col.color}`}>{col.label}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.bgColor} ${col.color} border ${col.borderColor}`}>
                          {columnLeads.length}
                        </span>
                      </div>

                      {/* Cards */}
                      <div className={`flex-1 border-l border-r border-b ${col.borderColor} rounded-b-xl bg-gray-50 dark:bg-gray-900 min-h-[400px] p-2 space-y-2`}>
                        {columnLeads.length === 0 ? (
                          <div className="flex items-center justify-center h-24 text-xs text-gray-400">Không có lead</div>
                        ) : (
                          columnLeads.map((lead) => (
                            <LeadCard key={lead.id} lead={lead} onSelect={setSelectedLead} onStatusChange={handleStatusChange} />
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

        {/* Create Lead Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Thêm Lead mới</h2>
              <div className="space-y-4">
                {[
                  { key: 'fullName', label: 'Họ tên *', placeholder: 'Nguyễn Văn A', type: 'text' },
                  { key: 'phone', label: 'Số điện thoại *', placeholder: '0901234567', type: 'tel' },
                  { key: 'email', label: 'Email', placeholder: 'example@mail.com', type: 'email' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={(createForm as any)[field.key]}
                      onChange={(e) => setCreateForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ghi chú nhanh</label>
                  <textarea
                    value={createForm.note}
                    onChange={(e) => setCreateForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="Nội dung liên hệ ban đầu..."
                    rows={3}
                    className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Hủy
                </button>
                <button onClick={handleCreate} disabled={creating || !createForm.fullName || !createForm.phone}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition">
                  {creating ? 'Đang tạo...' : 'Tạo Lead'}
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
          />
        )}
      </CMSLayout>
    </>
  );
}
