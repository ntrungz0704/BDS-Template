import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');

  // 1. Query danh sách đơn hàng chờ duyệt và đã hoàn thành
  const { data: ordersRes, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // 2. Mutation phê duyệt đơn hàng
  const approveMutation = useMutation({
    mutationFn: async ({ id, version }: { id: string; version: number }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/orders/${id}/approve`,
        { version },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      if (res.data?.status === 'PENDING_SUBDOMAIN_CONFLICT' || res.meta?.conflict) {
        alert('Phát hiện trùng lặp subdomain. Đơn hàng chuyển sang hàng chờ xử lý đổi slug.');
      } else {
        const creds = res.data?.credentials;
        if (creds) {
          alert(
            `Đã phê duyệt đơn hàng & tự động khởi tạo Tenant Website thành công!\n\n` +
            `THÔNG TIN BÀN GIAO CHO KHÁCH HÀNG:\n` +
            `-----------------------------------\n` +
            `- Tên miền website: http://${creds.subdomain}.localhost:3003\n` +
            `- Quản trị website (CMS): http://localhost:3001\n` +
            `- Email đăng nhập: ${creds.email}\n` +
            `- Mật khẩu tạm thời: ${creds.password}\n\n` +
            `👉 Hãy COPY thông tin này gửi cho khách hàng qua Zalo!`
          );
        } else {
          alert('Đã phê duyệt đơn hàng & tự động khởi tạo Tenant Website thành công!');
        }
      }
      setSelectedOrder(null);
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi duyệt đơn hàng.');
    },
  });

  // 3. Mutation từ chối đơn hàng
  const rejectMutation = useMutation({
    mutationFn: async ({ id, version, notes }: { id: string; version: number; notes: string }) => {
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const res = await axios.put(
        `${API_URL}/api/admin/orders/${id}/reject`,
        { version, adminNotes: notes },
        {
          headers: { 'X-CSRF-Token': csrfToken || '' },
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      alert('Đã từ chối đơn hàng thành công.');
      setSelectedOrder(null);
      setRejectNotes('');
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi từ chối đơn hàng.');
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-bold text-slate-500">Đang tải danh sách đơn hàng...</span>
        </div>
      </div>
    );
  }

  const orders = ordersRes?.data || [];

  return (
    <AdminLayout title="Duyệt Đơn Hàng & Kích Hoạt" subtitle="Kiểm tra thông tin giao dịch chuyển khoản, ảnh hóa đơn chuyển tiền của khách hàng.">
      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden mb-10">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-50/50 text-xs font-bold text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Mã đơn hàng</th>
              <th className="px-8 py-4">Khách hàng</th>
              <th className="px-8 py-4">Subdomain yêu cầu</th>
              <th className="px-8 py-4">Số tiền</th>
              <th className="px-8 py-4">Trạng thái</th>
              <th className="px-8 py-4">Mã giao dịch</th>
              <th className="px-8 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-slate-400 font-semibold">Không có đơn hàng nào cần duyệt.</td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-mono font-bold text-slate-800">{order.orderNumber}</td>
                  <td className="px-8 py-4">
                    <div>
                      <div className="font-bold text-slate-800">{order.fullName}</div>
                      <div className="text-xs text-slate-400 font-semibold">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-bold text-xs tracking-wide text-slate-500">
                    {order.subdomain ? (
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100/50 px-2.5 py-1 rounded-md text-xs font-mono">
                        {order.subdomain}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-normal italic">Mua Source (Không)</span>
                    )}
                  </td>
                  <td className="px-8 py-4 font-extrabold text-slate-800">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}
                  </td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      order.status === 'WAITING_CONFIRM' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      order.status === 'PENDING' ? 'bg-slate-100 text-slate-600' : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-emerald-500' :
                        order.status === 'WAITING_CONFIRM' ? 'bg-amber-500' :
                        order.status === 'PENDING' ? 'bg-slate-400' : 'bg-rose-500'
                      }`}></span>
                      {order.status === 'COMPLETED' ? 'Hoàn thành' :
                       order.status === 'WAITING_CONFIRM' ? 'Chờ duyệt' :
                       order.status === 'PENDING' ? 'Mới' : 'Từ chối'}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-mono text-xs font-bold text-slate-500">{order.transactionCode || '—'}</td>
                  <td className="px-8 py-4 text-right">
                    {order.status === 'WAITING_CONFIRM' ? (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 px-4 py-2 rounded-xl transition-all shadow-sm"
                      >
                        Xem & Xét Duyệt
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Xét Duyệt Chi Tiết */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200/50 max-h-[90vh] overflow-y-auto relative animate-scale-in">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-lg"
            >
              ✕
            </button>
            <h2 className="text-lg font-extrabold text-slate-855 mb-6 uppercase tracking-wider">Xét Duyệt Đơn Hàng: {selectedOrder.orderNumber}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Minh chứng chuyển khoản</h3>
                {selectedOrder.billImageUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 p-2">
                    <img
                      src={selectedOrder.billImageUrl}
                      alt="Biên lai thanh toán"
                      className="w-full h-auto max-h-[300px] rounded-xl object-contain"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-24 text-center text-xs font-bold text-slate-400">
                    Khách hàng chưa tải ảnh hóa đơn.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Khách hàng</span>
                  <p className="font-extrabold text-slate-800 mt-1">{selectedOrder.fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mã giao dịch ngân hàng</span>
                  <p className="font-mono font-bold text-sm text-slate-800 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg inline-block mt-1">{selectedOrder.transactionCode || 'Không nạp'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Số tiền thanh toán</span>
                  <p className="text-2xl font-extrabold text-slate-855 mt-1">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.amount)}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ghi chú từ chối (nếu có)</label>
                  <textarea
                    value={rejectNotes}
                    onChange={(e) => setRejectNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="Mã giao dịch sai, tiền chưa nổi..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => rejectMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version, notes: rejectNotes })}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/10"
              >
                Từ Chối Giao Dịch
              </button>
              <button
                onClick={() => approveMutation.mutate({ id: selectedOrder.id, version: selectedOrder.version })}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/10"
              >
                Phê Duyệt & Kích Hoạt
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
