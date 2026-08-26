import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CustomerDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: customerRes, isLoading } = useQuery({
    queryKey: ['adminCustomerDetail', id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/customers/${id}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!id,
  });

  const extendTrialMutation = useMutation({
    mutationFn: async (days: number) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${id}/extend-trial`, { days }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã gia hạn dùng thử thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminCustomerDetail', id] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi gia hạn dùng thử'),
  });

  const activateSubMutation = useMutation({
    mutationFn: async (months: number) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${id}/activate-subscription`, { months }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã kích hoạt gói dịch vụ 1 năm thành công!');
      queryClient.invalidateQueries({ queryKey: ['adminCustomerDetail', id] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi kích hoạt gói dịch vụ'),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async () => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${id}/reset-password`, {}, {
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

  const suspendMutation = useMutation({
    mutationFn: async (suspended: boolean) => {
      const csrfToken = document.cookie.split('; ').find(r => r.startsWith('csrf_token='))?.split('=')[1];
      const res = await axios.post(`${API_URL}/api/admin/customers/${id}/suspend`, { suspended }, {
        headers: { 'X-CSRF-Token': csrfToken || '' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Đã cập nhật trạng thái hoạt động của khách hàng.');
      queryClient.invalidateQueries({ queryKey: ['adminCustomerDetail', id] });
    },
    onError: (err: any) => alert(err.response?.data?.error?.message || 'Lỗi cập nhật trạng thái'),
  });

  if (isLoading) {
    return (
      <AdminLayout title="Hồ Sơ Khách Hàng 360°">
        <div className="py-20 text-center text-slate-400">Đang tải hồ sơ khách hàng...</div>
      </AdminLayout>
    );
  }

  const customer = customerRes?.data?.customer;
  const tenants = customerRes?.data?.tenants || [];
  const orders = customerRes?.data?.orders || [];
  const auditLogs = customerRes?.data?.auditLogs || [];

  if (!customer) {
    return (
      <AdminLayout title="Không tìm thấy khách hàng">
        <div className="py-20 text-center text-slate-400">
          Khách hàng không tồn tại hoặc đã bị xóa.{' '}
          <Link href="/customers" className="text-indigo-600 underline">Quay lại danh sách</Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Hồ Sơ 360°: ${customer.fullName || customer.email}`}
      subtitle={`ID: ${customer.id} | Ngày tham gia: ${new Date(customer.createdAt).toLocaleDateString('vi-VN')}`}
    >
      <div className="space-y-6">
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              customer.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              Trạng thái: {customer.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              Vai trò: {customer.role === 'TENANT_OWNER' ? 'CUSTOMER_OWNER' : customer.role}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => extendTrialMutation.mutate(3)}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              +3 Ngày Dùng Thử
            </button>
            <button
              onClick={() => activateSubMutation.mutate(12)}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Kích Hoạt Thuê Bao 1 Năm
            </button>
            <button
              onClick={() => {
                if (confirm(`Đặt lại mật khẩu cho ${customer.email}?`)) {
                  resetPasswordMutation.mutate();
                }
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              Reset Mật Khẩu
            </button>
            <button
              onClick={() => {
                const isSuspended = customer.status === 'SUSPENDED' || customer.status === 'BANNED';
                suspendMutation.mutate(!isSuspended);
              }}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                customer.status === 'ACTIVE'
                  ? 'bg-red-50 hover:bg-red-100 text-red-600'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
              }`}
            >
              {customer.status === 'ACTIVE' ? 'Tạm Khóa Website' : 'Mở Khóa Website'}
            </button>
          </div>
        </div>

        {/* Customer Information & Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Thông Tin Tài Khoản
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Họ và tên:</span>
                <span className="font-bold text-slate-800 text-sm">{customer.fullName || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="font-bold text-slate-800 text-sm font-mono">{customer.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Số điện thoại:</span>
                <span className="font-bold text-slate-800 text-sm font-mono">{customer.phone || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Đăng nhập lần cuối:</span>
                <span className="font-bold text-slate-800">
                  {customer.lastLoginAt ? new Date(customer.lastLoginAt).toLocaleString('vi-VN') : 'Chưa đăng nhập'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Hồ Sơ Doanh Nghiệp
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Tên công ty:</span>
                <span className="font-bold text-slate-800 text-sm">{customer.customerProfile?.companyName || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Mã số thuế:</span>
                <span className="font-bold text-slate-800 font-mono">{customer.customerProfile?.taxCode || '—'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Địa chỉ:</span>
                <span className="font-bold text-slate-800">{customer.customerProfile?.address || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Websites / Tenants */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Website & Trạng Thái Dùng Thử (Tenants)
          </h3>
          {tenants.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">Khách hàng chưa sở hữu website nào.</p>
          ) : (
            <div className="space-y-4">
              {tenants.map((t: any) => (
                <div key={t.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="font-mono text-indigo-600 font-bold">{t.slug}.platformbds.vn</div>
                    <div className="text-slate-400 mt-1">Template: {t.templateId}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dùng thử (Trial):</span>
                    <span className={`font-bold ${t.trialStatus === 'ACTIVE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {t.trialStatus || 'CHƯA KÍCH HOẠT'}
                    </span>
                    <div className="text-slate-500 mt-0.5">
                      Đã lưu: <strong>{t.trialSaveCount}</strong> / {t.trialSaveLimit} lần
                    </div>
                    {t.trialEndAt && (
                      <div className="text-slate-500">
                        Hết hạn: {new Date(t.trialEndAt).toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block">Thuê bao (Subscription):</span>
                    <span className={`font-bold ${t.subscription?.status === 'ACTIVE' ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {t.subscription?.status || 'Chưa có gói trả phí'}
                    </span>
                    {t.subscription && (
                      <div className="text-slate-500 mt-0.5">
                        Hết hạn: {new Date(t.subscription.endDate).toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end">
                    <a
                      href={`http://${t.slug}.localhost:3003`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-white border border-slate-300 hover:border-indigo-500 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      Xem Website ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders History */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Lịch Sử Đơn Hàng ({orders.length})
          </h3>
          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">Chưa có đơn hàng nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="py-2 px-3">Mã đơn</th>
                    <th className="py-2 px-3">Loại</th>
                    <th className="py-2 px-3">Số tiền</th>
                    <th className="py-2 px-3">Trạng thái</th>
                    <th className="py-2 px-3">Mã GD</th>
                    <th className="py-2 px-3">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map((o: any) => (
                    <tr key={o.id}>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                      <td className="py-2.5 px-3">{o.type}</td>
                      <td className="py-2.5 px-3 font-bold text-indigo-600">{o.amount ? `${o.amount.toLocaleString()} đ` : '—'}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{o.transactionCode || '—'}</td>
                      <td className="py-2.5 px-3">{new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
