import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bds-template-api.onrender.com';

export default function CustomersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<any>(null);

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

  // 3. Quick Action Mutations
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

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${userId}/reset-password`, {}, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (res) => {
      alert(`Mật khẩu mới của khách hàng: ${res.data?.data?.temporaryPassword || res.data?.temporaryPassword}\n\nHãy copy gửi cho khách qua Zalo.`);
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi đặt lại mật khẩu'),
  });

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
    <AdminLayout title="Quản lý Khách hàng" subtitle="Hồ sơ khách hàng, trạng thái dùng thử và kích hoạt website">
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Liên hệ</th>
                  <th className="py-3.5 px-4">Website / Tenant</th>
                  <th className="py-3.5 px-4">Vai trò</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Ngày tạo</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
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
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{u.fullName || 'Chưa cập nhật'}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">{u.phone || '—'}</td>
                      <td className="py-4 px-4">
                        {u.tenant ? (
                          <div>
                            <div className="font-bold text-slate-800">{u.tenant.name}</div>
                            <div className="text-xs font-mono text-indigo-600">{u.tenant.slug}.{process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Chưa gắn website</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                          u.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : u.role === 'TENANT_OWNER'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.role === 'TENANT_OWNER' ? 'CUSTOMER_OWNER' : u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {u.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500">
                        {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/customers/${u.id}`}
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg transition-colors"
                          >
                            Hồ sơ 360°
                          </Link>
                          {u.tenant?.trialStatus === 'ACTIVE' && (
                            <button
                              onClick={() => extendTrialMutation.mutate({ userId: u.id, days: 7 })}
                              title="Gia hạn dùng thử +7 ngày"
                              className="px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-lg transition-colors"
                            >
                              +7 Ngày Trial
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm(`Đặt lại mật khẩu cho ${u.email}?`)) {
                                resetPasswordMutation.mutate({ userId: u.id });
                              }
                            }}
                            title="Đặt lại mật khẩu"
                            className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                          >
                            Reset MK
                          </button>
                          {u.email !== 'admin@aireviewbds.com' && (
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn XÓA vĩnh viễn tài khoản ${u.email}? Hành động này không thể hoàn tác!`)) {
                                  deleteUserMutation.mutate(u.id);
                                }
                              }}
                              title="Xóa tài khoản"
                              className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg transition-colors"
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

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
                    <div><strong>Website:</strong> {createdCredentials.websiteUrl || `https://${createdCredentials.subdomain}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}</div>
                    <div><strong>Quản trị CMS:</strong> {createdCredentials.cmsUrl || process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}</div>
                    <div><strong>Email:</strong> {createdCredentials.email}</div>
                    <div><strong>Mật khẩu tạm:</strong> {createdCredentials.password}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const info = `THÔNG TIN BÀN GIAO WEBSITE:\n- Website: ${createdCredentials.websiteUrl || `https://${createdCredentials.subdomain}.${process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'templates.aireviewbds.com'}`}\n- Quản trị CMS: ${createdCredentials.cmsUrl || process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.aireviewbds.com'}\n- Email: ${createdCredentials.email}\n- Mật khẩu: ${createdCredentials.password}`;
                        navigator.clipboard.writeText(info);
                        alert('Đã copy thông tin bàn giao vào clipboard!');
                      }}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Copy Gửi Zalo
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
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại *</label>
                      <input
                        required
                        type="tel"
                        placeholder="0983xxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email tài khoản *</label>
                    <input
                      required
                      type="email"
                      placeholder="khachhang@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subdomain mong muốn *</label>
                    <input
                      required
                      type="text"
                      placeholder="batdongsantrongoi"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase())}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Template Mẫu</label>
                      <select
                        value={templateId}
                        onChange={(e) => setTemplateId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                      >
                        <option value="luxury-gold">Luxury Gold (Lumière)</option>
                        <option value="minimal-dark">Minimalist (Dark/Modern)</option>
                        <option value="eco-green">Eco-friendly (Green)</option>
                        <option value="agency-modern">Real Estate Agency</option>
                        <option value="apartment-sky">Apartment / Tower Page</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gói ban đầu</label>
                      <select
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                      >
                        <option value="STARTER">Dùng thử 3 ngày (STARTER)</option>
                        <option value="PRO">Thuê 1 năm (PRO)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={createCustomerMutation.isPending}
                      className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 disabled:opacity-60"
                    >
                      {createCustomerMutation.isPending ? 'Đang khởi tạo...' : 'Khởi Tạo & Kích Hoạt'}
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

