import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { KeyRound, Copy, Check, ShieldAlert, Sparkles, RefreshCw, Lock } from 'lucide-react';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
const CMS_APP_URL = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com';
const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com';

export default function CustomersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<any>(null);

  // Restore / Reset Password State
  const [restoreUser, setRestoreUser] = useState<any>(null);
  const [customPassword, setCustomPassword] = useState('');
  const [useDefaultPassword, setUseDefaultPassword] = useState(true);
  const [restoredResult, setRestoredResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [templateId, setTemplateId] = useState('luxury-gold');
  const [plan, setPlan] = useState('STARTER');

  // 1. Fetch Users/Customers
  const { data: usersRes, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/users`, { withCredentials: true });
      return res.data;
    },
  });

  // 2. Mutation Create Customer + Tenant
  const createCustomerMutation = useMutation({
    mutationFn: async (payload: any) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.post(`${API_URL}/api/admin/tenants`, payload, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (res) => {
      setCreatedCredentials(res.data?.credentials);
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminTenants'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi tạo khách hàng.');
    },
  });

  // 3. Quick Action: Direct Reset / Restore Password
  const directResetMutation = useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: string; newPassword?: string }) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${userId}/direct-reset-password`, { newPassword }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (res) => {
      setRestoreUser(null);
      setRestoredResult(res.data);
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi khi khôi phục mật khẩu'),
  });

  // 4. Quick Action: Extend Trial
  const extendTrialMutation = useMutation({
    mutationFn: async ({ userId, days }: { userId: string; days: number }) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${userId}/extend-trial`, { days }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã gia hạn dùng thử thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi gia hạn dùng thử'),
  });

  // 5. Quick Action: Delete User
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã xóa người dùng thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi khi xóa người dùng'),
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !subdomain) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    createCustomerMutation.mutate({
      fullName,
      email,
      phone,
      subdomain,
      templateId,
      plan,
    });
  };

  const handleCopyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const users: any[] = usersRes?.data || [];
  const filteredUsers = users.filter((u) => {
    if (u.role === 'SUPER_ADMIN' || u.email === 'admin@aireviewbds.com') return false;
    const matchSearch =
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search) ||
      u.tenant?.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.tenant?.slug?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout 
      title="Quản Lý Khách Hàng & Khôi Phục Mật Khẩu" 
      subtitle="Hồ sơ khách hàng, khôi phục mật khẩu Marketplace/CMS tức thì, gia hạn và kích hoạt website."
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm tên, email, SĐT, website..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 w-64"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Hoạt động (ACTIVE)</option>
              <option value="BANNED">Đã khóa (BANNED)</option>
            </select>
          </div>

          <button
            onClick={() => {
              setCreatedCredentials(null);
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tạo Khách Hàng & Website Mới
          </button>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 w-[22%]">Khách hàng</th>
                  <th className="py-3 px-3 w-[15%]">Liên hệ</th>
                  <th className="py-3 px-3 w-[22%]">Website / Tenant</th>
                  <th className="py-3 px-2 w-[10%]">Vai trò</th>
                  <th className="py-3 px-2 w-[10%]">Trạng thái</th>
                  <th className="py-3 px-2 w-[8%]">Ngày tạo</th>
                  <th className="py-3 px-3 w-[13%] text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Đang tải danh sách khách hàng...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Chưa có khách hàng nào. Danh sách khách hàng sẽ tự động hiển thị khi có đơn đặt hàng mới.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const defaultPwd = u.email ? u.email.split('@')[0] : '123456';
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900 truncate">{u.fullName || 'Chưa cập nhật'}</div>
                          <div className="text-[11px] text-slate-400 font-mono truncate">{u.email}</div>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px]">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-700 truncate">{u.phone || '—'}</span>
                            {u.phone && (
                              <a
                                href={`https://zalo.me/${u.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-1.5 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[9px] rounded border border-blue-200 shrink-0"
                                title="Mở Zalo"
                              >
                                Zalo
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {u.tenant ? (
                            <div className="min-w-0">
                              <div className="font-bold text-slate-800 truncate">{u.tenant.name}</div>
                              <div className="text-[10px] font-mono text-indigo-600 truncate">{u.tenant.slug}.{PLATFORM_DOMAIN}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Chưa gắn website</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'SUPER_ADMIN'
                              ? 'bg-purple-100 text-purple-700'
                              : u.role === 'TENANT_OWNER'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {u.role === 'TENANT_OWNER' ? 'CUSTOMER' : u.role}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            {u.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[10px] text-slate-500 font-mono">
                          {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setRestoreUser(u);
                                setCustomPassword(defaultPwd);
                                setUseDefaultPassword(true);
                              }}
                              title="Khôi phục mật khẩu"
                              className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold rounded-lg transition-all"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                            </button>

                            <Link
                              href={`/customers/${u.id}`}
                              className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-lg transition-colors"
                            >
                              Hồ sơ
                            </Link>

                            {u.role !== 'SUPER_ADMIN' && (
                              <button
                                onClick={() => {
                                  if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản ${u.fullName || u.email}?`)) {
                                    deleteUserMutation.mutate(u.id);
                                  }
                                }}
                                title="Xóa tài khoản khách hàng"
                                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            MODAL 1: KHÔI PHỤC MẬT KHẨU CHO KHÁCH (DIRECT RESET PASSWORD MODAL)
            ═══════════════════════════════════════════════════════════════════════ */}
        {restoreUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Khôi Phục Mật Khẩu Khách Hàng</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{restoreUser.email}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setRestoreUser(null)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                  ✕
                </button>
              </div>

              <div className="my-5 space-y-4">
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Quyền Super Admin: Ghi đè & Khôi phục tức thì</span>
                  </p>
                  <p className="mt-1 text-amber-700 leading-relaxed">
                    Khách có thể dùng mật khẩu này để đăng nhập ngay vào cả <strong>Sàn Marketplace (Port 3000)</strong> lẫn <strong>CMS Quản Trị Website Riêng (Port 3001)</strong> mà không lo bị kẹt mật khẩu cũ.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Lựa chọn mật khẩu cấp mới:
                  </label>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-slate-50/50">
                      <input
                        type="radio"
                        name="pwdOption"
                        checked={useDefaultPassword}
                        onChange={() => {
                          setUseDefaultPassword(true);
                          setCustomPassword(restoreUser.email ? restoreUser.email.split('@')[0] : '123456');
                        }}
                        className="accent-indigo-600 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800">Khôi phục về mật khẩu chuẩn (Theo đầu Email)</span>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Mật khẩu: <strong className="text-emerald-700">{restoreUser.email ? restoreUser.email.split('@')[0] : '123456'}</strong>
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 cursor-pointer bg-slate-50/50">
                      <input
                        type="radio"
                        name="pwdOption"
                        checked={!useDefaultPassword}
                        onChange={() => setUseDefaultPassword(false)}
                        className="accent-indigo-600 w-4 h-4"
                      />
                      <div className="w-full">
                        <span className="text-xs font-bold text-slate-800">Tùy chỉnh mật khẩu mới theo ý Admin</span>
                        {!useDefaultPassword && (
                          <input
                            type="text"
                            value={customPassword}
                            onChange={(e) => setCustomPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                            className="mt-2 w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRestoreUser(null)}
                  className="px-4 py-2.5 border border-slate-300 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={directResetMutation.isPending || (!useDefaultPassword && customPassword.trim().length < 6)}
                  onClick={() => {
                    const finalPwd = useDefaultPassword 
                      ? (restoreUser.email ? restoreUser.email.split('@')[0] : '123456')
                      : customPassword.trim();
                    directResetMutation.mutate({
                      userId: restoreUser.id,
                      newPassword: finalPwd,
                    });
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  {directResetMutation.isPending ? 'Đang cập nhật...' : 'Xác Nhận Khôi Phục MK'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            MODAL 2: HIỂN THỊ KẾT QUẢ KHÔI PHỤC & SAO CHÉP GỬI ZALO
            ═══════════════════════════════════════════════════════════════════════ */}
        {restoredResult && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-emerald-200 text-center animate-scale-in">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                <Check className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-slate-900">Mật Khẩu Đã Được Khôi Phục!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tài khoản khách hàng đã được cấp lại quyền truy cập thành công.
              </p>

              <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-2 select-all">
                <div><span className="text-slate-400 font-sans">Email:</span> <strong className="text-slate-800">{restoredResult.email}</strong></div>
                <div><span className="text-slate-400 font-sans">Mật khẩu mới:</span> <strong className="text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300 text-sm">{restoredResult.newPassword}</strong></div>
                <div><span className="text-slate-400 font-sans">Đăng nhập Marketplace:</span> <span className="text-blue-600 font-bold">{process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'http://localhost:3000'}</span></div>
                <div><span className="text-slate-400 font-sans">Đăng nhập CMS:</span> <span className="text-indigo-600 font-bold">{CMS_APP_URL}</span></div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const info = `🔐 THÔNG TIN KHÔI PHỤC MẬT KHẨU TÀI KHOẢN:\n\n` +
                      `- Email: ${restoredResult.email}\n` +
                      `- Mật khẩu mới: ${restoredResult.newPassword}\n` +
                      `- Đăng nhập Sàn Mua Bán: ${process.env.NEXT_PUBLIC_MARKETPLACE_URL || 'http://localhost:3000'}/login\n` +
                      `- Đăng nhập Quản Trị Website CMS: ${CMS_APP_URL}/login\n\n` +
                      `👉 Quý khách có thể đăng nhập ngay bằng mật khẩu trên!`;
                    handleCopyText(info);
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? '✓ Đã Sao Chép Toàn Bộ' : 'Sao Chép Gửi Zalo'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRestoredResult(null)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create Customer + Website */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-100 max-h-[90vh] overflow-y-auto">
              {createdCredentials ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Khởi Tạo Khách Hàng Thành Công!</h3>
                    <p className="text-xs text-slate-500 mt-1">Website và thời gian dùng thử (7 ngày, 3 lần lưu) đã được kích hoạt.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2 select-all">
                    <div><strong>Website:</strong> {createdCredentials.websiteUrl || `https://${createdCredentials.subdomain}.${PLATFORM_DOMAIN}`}</div>
                    <div><strong>Quản trị CMS:</strong> {createdCredentials.cmsUrl || CMS_APP_URL}</div>
                    <div><strong>Email:</strong> {createdCredentials.email}</div>
                    <div><strong>Mật khẩu tạm:</strong> {createdCredentials.password}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const info = `THÔNG TIN BÀN GIAO WEBSITE:\n- Website: ${createdCredentials.websiteUrl || `https://${createdCredentials.subdomain}.${PLATFORM_DOMAIN}`}\n- Quản trị CMS: ${createdCredentials.cmsUrl || CMS_APP_URL}\n- Email: ${createdCredentials.email}\n- Mật khẩu: ${createdCredentials.password}`;
                        handleCopyText(info);
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      {copied ? '✓ Đã Copy' : 'Copy Gửi Zalo'}
                    </button>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">Tạo Khách Hàng & Cấp Website Mới</h3>
                    <button type="button" onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0987654321"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email đăng nhập *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="khachhang@gmail.com"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subdomain Website *</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          required
                          value={subdomain}
                          onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="batdongsan-vip"
                          className="w-full px-3 py-2 border border-slate-200 rounded-l-xl text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mẫu giao diện</label>
                      <select
                        value={templateId}
                        onChange={(e) => setTemplateId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                      >
                        <option value="luxury-gold">Luxury Gold (Vinhomes)</option>
                        <option value="modern-green">Modern Green (Ecopark)</option>
                        <option value="minimal-white">Minimal White (Masterise)</option>
                        <option value="ocean-blue">Ocean Blue (Novaland)</option>
                        <option value="urban-dark">Urban Dark (Keppel Land)</option>
                        <option value="estate-pro">Estate Pro (Sun Group)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={createCustomerMutation.isPending}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                    >
                      {createCustomerMutation.isPending ? 'Đang khởi tạo...' : 'Tạo Khách & Cấp Web'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
