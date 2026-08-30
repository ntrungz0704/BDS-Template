import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST' | 'SPAM';

interface LeadItem {
  id: string;
  rawId: string;
  kind: 'LEAD' | 'CONSULTATION_ORDER' | 'SUBMISSION';
  fullName: string;
  phone: string;
  email: string;
  message: string;
  status: LeadStatus;
  source: string;
  projectTitle: string;
  templateSlug?: string;
  tenant?: { id: string; name: string; slug: string; domain?: string } | null;
  isMarketplace: boolean;
  createdAt: string;
  notes?: Array<{ id: string; content: string; createdAt: string; createdBy?: string }>;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; badgeBg: string; textCol: string; borderCol: string }> = {
  NEW: { label: 'Mới nhận', badgeBg: 'bg-rose-50', textCol: 'text-rose-700', borderCol: 'border-rose-200' },
  CONTACTED: { label: 'Đã liên hệ', badgeBg: 'bg-amber-50', textCol: 'text-amber-700', borderCol: 'border-amber-200' },
  QUALIFIED: { label: 'Tiềm năng', badgeBg: 'bg-indigo-50', textCol: 'text-indigo-700', borderCol: 'border-indigo-200' },
  WON: { label: 'Đã chốt', badgeBg: 'bg-emerald-50', textCol: 'text-emerald-700', borderCol: 'border-emerald-200' },
  LOST: { label: 'Hủy/Không mua', badgeBg: 'bg-slate-100', textCol: 'text-slate-600', borderCol: 'border-slate-300' },
  SPAM: { label: 'Spam', badgeBg: 'bg-slate-100', textCol: 'text-slate-500', borderCol: 'border-slate-200' },
};

export default function AdminLeadsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'MARKETPLACE' | 'TENANT'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Fetch leads list with React Query
  const { data: leadsRes, isLoading, isError } = useQuery({
    queryKey: ['adminLeads', searchTerm, selectedType, selectedStatus, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: '50',
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(selectedType !== 'ALL' ? { type: selectedType } : {}),
        ...(selectedStatus !== 'ALL' ? { status: selectedStatus } : {}),
      });
      const res = await axios.get(`${API_URL}/api/admin/leads?${params.toString()}`, {
        withCredentials: true,
      });
      return res.data;
    },
    refetchInterval: 5000,
  });

  const leads: LeadItem[] = leadsRes?.data?.leads || [];
  const counts = leadsRes?.data?.counts || { total: 0, marketplace: 0, tenant: 0, newCount: 0, todayCount: 0, wonCount: 0 };
  const totalPages = leadsRes?.data?.totalPages || 1;

  // 2. Mutation update status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, note }: { id: string; status: LeadStatus; note?: string }) => {
      await axios.put(
        `${API_URL}/api/admin/leads/${id}/status`,
        { status, note },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminLeads'] });
      queryClient.invalidateQueries({ queryKey: ['adminLayoutLeads'] });
      showToast('✓ Cập nhật trạng thái khách hàng thành công!');
    },
    onError: () => {
      showToast('❌ Lỗi khi cập nhật trạng thái.');
    },
  });

  // 3. Mutation delete lead
  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/api/admin/leads/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminLeads'] });
      queryClient.invalidateQueries({ queryKey: ['adminLayoutLeads'] });
      setSelectedLead(null);
      showToast('✓ Đã xóa khách hàng.');
    },
    onError: () => {
      showToast('❌ Lỗi khi xóa khách hàng.');
    },
  });

  // 4. Mutation add note
  const addNoteMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      await axios.post(
        `${API_URL}/api/admin/leads/${id}/notes`,
        { content },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminLeads'] });
      setNewNoteContent('');
      showToast('✓ Đã thêm ghi chú chăm sóc.');
    },
    onError: () => {
      showToast('❌ Lỗi khi thêm ghi chú.');
    },
  });

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('Không có dữ liệu khách hàng để xuất.');
      return;
    }
    const headers = ['Mã ID', 'Họ và tên', 'Số điện thoại', 'Email', 'Nguồn', 'Dự án / Mẫu', 'Nội dung tin nhắn', 'Trạng thái', 'Ngày gửi'];
    const rows = leads.map(l => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.isMarketplace ? 'Mẫu Demo Marketplace' : (l.tenant?.name || 'Website Thành Viên')}"`,
      `"${l.projectTitle.replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      STATUS_CONFIG[l.status]?.label || l.status,
      new Date(l.createdAt).toLocaleString('vi-VN'),
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_crm_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="Quản Lý Khách Tư Vấn & Leads CRM"
      subtitle="Thu thập và quản trị toàn bộ thông tin khách hàng điền form từ Marketplace, Mẫu Demo & Website Thành viên."
    >
      <Head>
        <title>Khách Tư Vấn & CRM Leads - Super Admin</title>
      </Head>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tổng Khách Tư Vấn</span>
              <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{counts.total}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg">
              👥
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Khách Mới Chưa Xử Lý</span>
              <span className="text-2xl font-extrabold text-rose-600 mt-1 block">{counts.newCount}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg">
              🔥
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Từ Mẫu Demo Marketplace</span>
              <span className="text-2xl font-extrabold text-amber-600 mt-1 block">{counts.marketplace}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">
              📦
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Từ Website Thành Viên</span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">{counts.tenant}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
              🌐
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="text"
                placeholder="Tìm theo tên, SĐT, email, dự án..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value as any); setPage(1); }}
              className="py-2 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="ALL">Mọi Nguồn ({counts.total})</option>
              <option value="MARKETPLACE">Mẫu Demo Marketplace ({counts.marketplace})</option>
              <option value="TENANT">Website Thành Viên ({counts.tenant})</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={e => { setSelectedStatus(e.target.value); setPage(1); }}
              className="py-2 px-3 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="ALL">Mọi Trạng Thái</option>
              <option value="NEW">🔴 Mới Nhận ({counts.newCount})</option>
              <option value="CONTACTED">🟡 Đã Liên Hệ</option>
              <option value="QUALIFIED">🟣 Tiềm Năng</option>
              <option value="WON">🟢 Đã Chốt</option>
              <option value="LOST">⚪ Không Mua / Hủy</option>
              <option value="SPAM">⚫ Spam</option>
            </select>
          </div>

          {/* Export CSV CTA */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>📥 Xuất Excel (CSV)</span>
          </button>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold text-xs flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Đang tải danh sách khách tư vấn...</span>
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-rose-500 font-bold text-xs">
              Lỗi tải dữ liệu. Vui lòng thử lại sau.
            </div>
          ) : leads.length === 0 ? (
            <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <span className="text-4xl">📭</span>
              <p className="text-sm font-bold text-slate-600">Chưa có thông tin khách tư vấn nào</p>
              <p className="text-xs text-slate-400 max-w-sm">Khi người dùng điền form nhận bảng giá hoặc liên hệ trên các mẫu template & website, thông tin sẽ hiển thị tức thì tại đây.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Khách Hàng</th>
                    <th className="py-3.5 px-4">Số Điện Thoại / Zalo</th>
                    <th className="py-3.5 px-4">Nguồn & Mẫu Quan Tâm</th>
                    <th className="py-3.5 px-4">Nội Dung / Yêu Cầu</th>
                    <th className="py-3.5 px-4">Trạng Thái</th>
                    <th className="py-3.5 px-4">Thời Gian Gửi</th>
                    <th className="py-3.5 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => {
                    const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                    const cleanPhone = lead.phone.replace(/\D/g, '');
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors group">
                        {/* Khách Hàng */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {lead.fullName ? lead.fullName.slice(0, 1).toUpperCase() : 'K'}
                            </div>
                            <div className="min-w-0">
                              <span className="font-extrabold text-slate-900 block truncate">{lead.fullName || 'Khách Vãng Lai'}</span>
                              {lead.email && <span className="text-[10px] text-slate-400 block truncate">{lead.email}</span>}
                            </div>
                          </div>
                        </td>

                        {/* Số Điện Thoại / Zalo */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-900">{lead.phone}</span>
                            {cleanPhone && (
                              <>
                                <a
                                  href={`tel:${cleanPhone}`}
                                  title="Gọi điện trực tiếp"
                                  className="p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-bold text-[10px]"
                                >
                                  📞
                                </a>
                                <a
                                  href={`https://zalo.me/${cleanPhone}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Chat Zalo ngay"
                                  className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-bold text-[10px]"
                                >
                                  💬 Zalo
                                </a>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Nguồn & Mẫu Quan Tâm */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full border ${lead.isMarketplace ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                              {lead.isMarketplace ? 'Mẫu Demo Marketplace' : `Website: ${lead.tenant?.name || 'Thành Viên'}`}
                            </span>
                            <p className="font-bold text-slate-700 truncate max-w-[180px]">{lead.projectTitle || lead.templateSlug || 'Tư vấn BĐS'}</p>
                          </div>
                        </td>

                        {/* Nội Dung / Yêu Cầu */}
                        <td className="py-3.5 px-4">
                          <p className="text-slate-600 line-clamp-2 max-w-[220px]" title={lead.message}>
                            {lead.message || <span className="italic text-slate-400">Yêu cầu nhận bảng giá & tài liệu</span>}
                          </p>
                        </td>

                        {/* Trạng Thái */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatusMutation.mutate({ id: lead.id, status: e.target.value as LeadStatus })}
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${statusConf.badgeBg} ${statusConf.textCol} ${statusConf.borderCol}`}
                          >
                            <option value="NEW">🔴 Mới Nhận</option>
                            <option value="CONTACTED">🟡 Đã Liên Hệ</option>
                            <option value="QUALIFIED">🟣 Tiềm Năng</option>
                            <option value="WON">🟢 Đã Chốt</option>
                            <option value="LOST">⚪ Không Mua</option>
                            <option value="SPAM">⚫ Spam</option>
                          </select>
                        </td>

                        {/* Thời Gian Gửi */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {new Date(lead.createdAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        {/* Thao Tác */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-[11px] transition-colors"
                            >
                              Xem & Ghi chú
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn xóa thông tin của ${lead.fullName || lead.phone}?`)) {
                                  deleteLeadMutation.mutate(lead.id);
                                }
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Xóa Lead"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Trang {page} / {totalPages}</span>
              <div className="flex gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  ← Trước
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead Details & Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">HỒ SƠ KHÁCH HÀNG CRM</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{selectedLead.fullName || 'Khách Vãng Lai'}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-semibold block text-[10px]">Số điện thoại</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-mono font-bold text-slate-900 text-sm">{selectedLead.phone}</span>
                  <a
                    href={`tel:${selectedLead.phone.replace(/\D/g, '')}`}
                    className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded-sm text-[10px]"
                  >
                    Gọi
                  </a>
                  <a
                    href={`https://zalo.me/${selectedLead.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-sm text-[10px]"
                  >
                    Zalo
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-semibold block text-[10px]">Email</span>
                <span className="font-bold text-slate-900 mt-1 block truncate">{selectedLead.email || 'Chưa cung cấp'}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-semibold block text-[10px]">Nguồn khách</span>
                <span className="font-bold text-indigo-600 mt-1 block">
                  {selectedLead.isMarketplace ? 'Mẫu Demo Marketplace' : `Website: ${selectedLead.tenant?.name || 'Thành viên'}`}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-semibold block text-[10px]">Mẫu / Dự án</span>
                <span className="font-bold text-slate-900 mt-1 block truncate">{selectedLead.projectTitle || selectedLead.templateSlug || 'Tư vấn BĐS'}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs">
              <span className="text-slate-400 font-semibold block text-[10px]">Nội dung yêu cầu / Lời nhắn</span>
              <p className="font-semibold text-slate-800 mt-1 whitespace-pre-wrap">{selectedLead.message || 'Khách hàng đăng ký nhận bảng giá & thông tin dự án qua Zalo.'}</p>
            </div>

            {/* Notes Section */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Lịch sử ghi chú chăm sóc</span>
              <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                {(selectedLead.notes || []).length === 0 ? (
                  <p className="text-slate-400 text-[11px] italic">Chưa có ghi chú nào.</p>
                ) : (
                  (selectedLead.notes || []).map((n: any, idx: number) => (
                    <div key={idx} className="p-2 bg-indigo-50/60 rounded-lg text-[11px] text-slate-700 border border-indigo-100">
                      <p>{n.content}</p>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{new Date(n.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Thêm ghi chú mới (VD: Đã gọi lúc 10h hẹn gửi bảng giá)..."
                  value={newNoteContent}
                  onChange={e => setNewNoteContent(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newNoteContent.trim()) {
                      addNoteMutation.mutate({ id: selectedLead.id, content: newNoteContent });
                    }
                  }}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs"
                />
                <button
                  disabled={!newNoteContent.trim() || addNoteMutation.isPending}
                  onClick={() => addNoteMutation.mutate({ id: selectedLead.id, content: newNoteContent })}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition disabled:opacity-40"
                >
                  Lưu
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
